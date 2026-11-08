import { DatabaseSync } from 'node:sqlite';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SESSION_DAYS = 7;
const hashToken = token => createHash('sha256').update(token).digest('hex');

export class AuthStore {
  constructor(root, dataDirectory = join(root, 'data')) {
    const file = join(dataDirectory, 'vitabalance.sqlite');
    mkdirSync(dirname(file), { recursive: true });
    this.db = new DatabaseSync(file);
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE COLLATE NOCASE,
        password_salt TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS sessions (
        token_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS sessions_user_id ON sessions(user_id);
      CREATE TABLE IF NOT EXISTS email_verification_codes (
        email TEXT PRIMARY KEY COLLATE NOCASE,
        code_salt TEXT NOT NULL,
        code_hash TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS app_data (
        user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        payload TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    const userColumns = new Set(this.db.prepare('PRAGMA table_info(users)').all().map(column => column.name));
    if (!userColumns.has('privacy_policy_version')) this.db.exec('ALTER TABLE users ADD COLUMN privacy_policy_version TEXT');
    if (!userColumns.has('privacy_policy_accepted_at')) this.db.exec('ALTER TABLE users ADD COLUMN privacy_policy_accepted_at TEXT');
    this.insertUser = this.db.prepare('INSERT INTO users(id,email,password_salt,password_hash,created_at) VALUES(?,?,?,?,?)');
    this.insertUserWithConsent = this.db.prepare('INSERT INTO users(id,email,password_salt,password_hash,created_at,privacy_policy_version,privacy_policy_accepted_at) VALUES(?,?,?,?,?,?,?)');
    this.updatePrivacyConsent = this.db.prepare('UPDATE users SET privacy_policy_version=?,privacy_policy_accepted_at=? WHERE id=?');
    this.findByEmail = this.db.prepare('SELECT id,email,password_salt,password_hash FROM users WHERE email=? COLLATE NOCASE');
    this.findVerificationCode = this.db.prepare('SELECT code_salt,code_hash,expires_at,attempts,created_at FROM email_verification_codes WHERE email=? COLLATE NOCASE');
    this.insertVerificationCode = this.db.prepare(`INSERT INTO email_verification_codes(email,code_salt,code_hash,expires_at,attempts,created_at) VALUES(?,?,?,?,0,?)
      ON CONFLICT(email) DO UPDATE SET code_salt=excluded.code_salt,code_hash=excluded.code_hash,expires_at=excluded.expires_at,attempts=0,created_at=excluded.created_at`);
    this.incrementVerificationAttempts = this.db.prepare('UPDATE email_verification_codes SET attempts=? WHERE email=? COLLATE NOCASE');
    this.removeVerificationCode = this.db.prepare('DELETE FROM email_verification_codes WHERE email=? COLLATE NOCASE');
    this.findUser = this.db.prepare('SELECT id,email FROM users WHERE id=?');
    this.insertSession = this.db.prepare('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)');
    this.findSession = this.db.prepare('SELECT user_id,expires_at FROM sessions WHERE token_hash=?');
    this.removeSession = this.db.prepare('DELETE FROM sessions WHERE token_hash=?');
    this.readData = this.db.prepare('SELECT payload FROM app_data WHERE user_id=?');
    this.writeData = this.db.prepare(`INSERT INTO app_data(user_id,payload,updated_at) VALUES(?,?,?)
      ON CONFLICT(user_id) DO UPDATE SET payload=excluded.payload,updated_at=excluded.updated_at`);
    this.deleteData = this.db.prepare('DELETE FROM app_data WHERE user_id=?');
  }

  register(email, password, privacyPolicyVersion = null) {
    const salt = randomBytes(16).toString('hex');
    const id = randomBytes(16).toString('hex');
    const acceptedAt = new Date().toISOString();
    try {
      this.insertUserWithConsent.run(id, email, salt, scryptSync(password, salt, 64).toString('hex'), acceptedAt, privacyPolicyVersion || null, privacyPolicyVersion ? acceptedAt : null);
    } catch (error) {
      if (String(error.message).includes('UNIQUE')) return { error: '该邮箱已注册，请直接登录。' };
      throw error;
    }
    return { user: { id, email }, token: this.newSession(id) };
  }

  emailExists(email) { return !!this.findByEmail.get(email); }

  verificationCooldownRemaining(email, now = Date.now(), cooldownMs = 60_000) {
    const row = this.findVerificationCode.get(email);
    return row ? Math.max(0, cooldownMs - (now - row.created_at)) : 0;
  }

  saveVerificationCode(email, code, expiresAt = Date.now() + 10 * 60_000) {
    const salt = randomBytes(16).toString('hex');
    const codeHash = createHash('sha256').update(salt).update(String(code)).digest('hex');
    this.insertVerificationCode.run(email, salt, codeHash, expiresAt, Date.now());
  }

  verifyRegistrationCode(email, code) {
    const row = this.findVerificationCode.get(email);
    if (!row) return 'missing';
    if (row.expires_at <= Date.now()) {
      this.removeVerificationCode.run(email);
      return 'expired';
    }
    if (row.attempts >= 5) return 'attempt_limit';
    const candidate = String(code || '');
    const actual = createHash('sha256').update(row.code_salt).update(candidate).digest();
    const expected = Buffer.from(row.code_hash, 'hex');
    if (!/^\d{6}$/.test(candidate) || actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
      const attempts = row.attempts + 1;
      this.incrementVerificationAttempts.run(attempts, email);
      return attempts >= 5 ? 'attempt_limit' : 'invalid';
    }
    this.removeVerificationCode.run(email);
    return 'valid';
  }

  resetPassword(email, code, password) {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const status=this.verifyRegistrationCode('reset:'+email,code);
      if(status!=='valid'){this.db.exec('COMMIT');return false;}
      const user=this.findByEmail.get(email);if(!user){this.db.exec('COMMIT');return false;}
      const salt=randomBytes(16).toString('hex');
      this.db.prepare('UPDATE users SET password_salt=?, password_hash=? WHERE id=?').run(salt,scryptSync(password,salt,64).toString('hex'),user.id);
      this.db.prepare('DELETE FROM sessions WHERE user_id=?').run(user.id);
      this.db.exec('COMMIT');return true;
    }catch(e){this.db.exec('ROLLBACK');throw e;}
  }

  ensureLocalTestAccount(email, password) {
    if (this.findByEmail.get(email)) return false;
    const salt = randomBytes(16).toString('hex');
    const id = randomBytes(16).toString('hex');
    this.insertUser.run(id, email, salt, scryptSync(password, salt, 64).toString('hex'), new Date().toISOString());
    return true;
  }

  login(email, password, privacyPolicyVersion = null) {
    const row = this.findByEmail.get(email);
    if (!row) return null;
    const actual = scryptSync(password, row.password_salt, 64);
    const expected = Buffer.from(row.password_hash, 'hex');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    if (privacyPolicyVersion) this.updatePrivacyConsent.run(privacyPolicyVersion, new Date().toISOString(), row.id);
    return { user: { id: row.id, email: row.email }, token: this.newSession(row.id) };
  }

  newSession(userId) {
    const token = randomBytes(32).toString('base64url');
    this.insertSession.run(hashToken(token), userId, Date.now() + SESSION_DAYS * 86400000);
    return token;
  }

  userForToken(token) {
    if (!token) return null;
    const hash = hashToken(token);
    const session = this.findSession.get(hash);
    if (!session) return null;
    if (session.expires_at <= Date.now()) { this.removeSession.run(hash); return null; }
    return this.findUser.get(session.user_id) || null;
  }

  logout(token) { if (token) this.removeSession.run(hashToken(token)); }

  dataFor(userId) {
    const row = this.readData.get(userId);
    if (!row) return { localState: null, profile: null, records: [], plans: [], aiAnalysis: {} };
    try {
      const data = JSON.parse(row.payload);
      return { ...data, localState: typeof data.localState === 'string' ? data.localState : null };
    } catch { return { localState: null, profile: null, records: [], plans: [], aiAnalysis: {} }; }
  }

  saveData(userId, data) {
    this.writeData.run(userId, JSON.stringify(data), new Date().toISOString());
  }

  clearData(userId) { this.deleteData.run(userId); }
}

export function tokenFromRequest(req) {
  const raw = String(req.headers.cookie || '');
  const cookie = raw.split(';').map(part => part.trim()).find(part => part.startsWith('vb_session='));
  return cookie ? decodeURIComponent(cookie.slice('vb_session='.length)) : '';
}

export const sessionCookie = token => `vb_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}`;
export const clearSessionCookie = 'vb_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0';

export function validateAppData(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  if (typeof value.localState === 'string') {
    if (Buffer.byteLength(value.localState, 'utf8') > 1_900_000) return null;
    try {
      const state = JSON.parse(value.localState);
      if (!state || typeof state !== 'object' || Array.isArray(state)) return null;
    } catch { return null; }
    return { localState: value.localState };
  }
  const profile = value.profile && typeof value.profile === 'object' && !Array.isArray(value.profile) ? value.profile : null;
  const records = Array.isArray(value.records) ? value.records.slice(0, 500) : [];
  const plans = Array.isArray(value.plans) ? value.plans.slice(0, 100) : [];
  const aiAnalysis = value.aiAnalysis && typeof value.aiAnalysis === 'object' && !Array.isArray(value.aiAnalysis) ? value.aiAnalysis : {};
  const result = { profile, records, plans, aiAnalysis };
  return JSON.stringify(result).length <= 2_000_000 ? result : null;
}
