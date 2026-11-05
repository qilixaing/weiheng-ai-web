import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { AuthStore } from '../auth-store.mjs';

function storeFor(t) {
  const root = mkdtempSync(join(tmpdir(), 'weiheng-auth-verification-'));
  const store = new AuthStore(root);
  t.after(() => { store.db.close(); rmSync(root, { recursive: true, force: true }); });
  return store;
}

test('verification code is salted, expires, has a resend cooldown, and is single use', t => {
  const store = storeFor(t), now = Date.now();
  store.saveVerificationCode('student@example.com', '246810', now + 60_000);
  assert.ok(Math.abs(store.verificationCooldownRemaining('student@example.com', now) - 60_000) <= 2);
  assert.ok(Math.abs(store.verificationCooldownRemaining('STUDENT@example.com', now + 20_000) - 40_000) <= 2);
  assert.equal(store.verifyRegistrationCode('STUDENT@example.com', '246810'), 'valid');
  assert.equal(store.verifyRegistrationCode('student@example.com', '246810'), 'missing');

  store.saveVerificationCode('expired@example.com', '135790', now - 1);
  assert.equal(store.verifyRegistrationCode('expired@example.com', '135790'), 'expired');
});

test('verification code rejects wrong values and locks after five attempts', t => {
  const store = storeFor(t);
  store.saveVerificationCode('attempts@example.com', '987654');
  for (let attempt = 0; attempt < 4; attempt++) assert.equal(store.verifyRegistrationCode('attempts@example.com', '000000'), 'invalid');
  assert.equal(store.verifyRegistrationCode('attempts@example.com', '000000'), 'attempt_limit');
  assert.equal(store.verifyRegistrationCode('attempts@example.com', '987654'), 'attempt_limit');
});
