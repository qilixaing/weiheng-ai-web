import {AuthStore} from '../auth-store.mjs';
import {testCaptcha} from './captcha-helper.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

test('localhost registration requires its one-time code while local login remains available', async t => {
  const dataDir = await mkdtemp(join(tmpdir(), 'weiheng-email-flow-'));
  const portProbe = createServer();
  portProbe.listen(0, '127.0.0.1');
  await once(portProbe, 'listening');
  const port = portProbe.address().port;
  await new Promise(resolve => portProbe.close(resolve));

  const child = spawn(process.execPath, [join(root, 'server.mjs')], {
    cwd: root,
    windowsHide: true,
    stdio: 'ignore',
    env: {
      ...process.env,
      PORT: String(port),
      HOST: '127.0.0.1',
      NODE_ENV: 'test',
      VITABALANCE_DATA_DIR: dataDir,
      SMTP_HOST: '', SMTP_PORT: '', SMTP_USER: '', SMTP_PASSWORD: '', SMTP_FROM: '',
      WEIHENG_ENABLE_LOCAL_TEST_ACCOUNT: '0',
      WEIHENG_ENABLE_JUDGE_ACCOUNT: '0',
    },
  });
  t.after(async () => {
    child.kill();
    await new Promise(resolve => child.exitCode !== null ? resolve() : child.once('exit', resolve));
    await rm(dataDir, { recursive: true, force: true });
  });

  const base = `http://localhost:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await fetch(base + '/api/auth/me');
      if (response.ok) { ready = true; break; }
    } catch { /* wait for the local test server */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, 'test server should start');

  const email = `student-${Date.now()}@example.com`;
  const request = (path, body) => fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const withoutCode = await request('/api/auth/register', { email, password: '12345678w-strong', acceptTerms: true });
  assert.equal(withoutCode.status, 400);

  const challenge=await testCaptcha(base);
  const codeResponse = await fetch(base+'/api/auth/request-code',{method:'POST',headers:{'Content-Type':'application/json',cookie:challenge.cookie},body:JSON.stringify({email,...challenge})});
  assert.equal(codeResponse.status, 200);
  const code = (await codeResponse.json()).localDebugCode;
  assert.match(code, /^\d{6}$/);

  const registered = await request('/api/auth/register', { email, password: '12345678w-strong', acceptTerms: true, verificationCode: code });
  assert.equal(registered.status, 201);
  assert.ok((await registered.json()).user.id);
  const cookie=registered.headers.get('set-cookie').split(';')[0];
  const thread=id=>({threads:[{id,date:'2026-11-05',createdAt:new Date().toISOString(),messages:[{id:id+'-message',role:'user',content:'test',createdAt:new Date().toISOString(),updatedAt:Date.now()}]}]});
  const chatPut=body=>fetch(base+'/api/chat',{method:'PUT',headers:{'Content-Type':'application/json',cookie},body:JSON.stringify(body)});
  assert.equal((await chatPut(thread('phone'))).status,200);
  assert.equal((await chatPut(thread('desktop'))).status,200);
  assert.equal((await (await fetch(base+'/api/chat',{headers:{cookie}})).json()).state.threads.length,2);
  assert.equal((await fetch(base+'/api/chat')).status,401);
  const testStore=new AuthStore(root,dataDir),other=testStore.register('other@example.com','strong-password-two');
  const otherResponse=await fetch(base+'/api/chat',{headers:{cookie:'vb_session='+other.token}});
  assert.equal((await otherResponse.json()).state.threads.length,0);
  testStore.db.close();

  const reused = await request('/api/auth/register', { email, password: 'another-strong-pass', acceptTerms: true, verificationCode: code });
  assert.notEqual(reused.status, 201);
});
