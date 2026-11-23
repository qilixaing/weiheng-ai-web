import test from 'node:test';
import assert from 'node:assert/strict';

test('auth 503 keeps guest data readable without allowing uncertain writes, then recovers on focus', async () => {
  const { initializeStorageScope, appStorage, accountSyncStatus, currentActor } = await import('../src/lib/storageScope.js');
  const data = new Map([['weiheng.local.v2', '{"saved":"guest"}']]);
  const listeners = new Map();
  globalThis.localStorage = {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: key => data.delete(key),
  };
  globalThis.document = { hidden: false, addEventListener() {} };
  globalThis.window = {
    addEventListener: (name, listener) => listeners.set(name, listener),
    dispatchEvent() {},
    location: { reload() { assert.fail('same guest identity must not reload'); } },
  };
  let requests = 0;
  globalThis.fetch = async () => ++requests === 1
    ? new Response(null, { status: 503 })
    : Response.json({ authenticated: false });

  await initializeStorageScope();
  assert.equal(currentActor(), 'guest');
  assert.equal(accountSyncStatus.value, 'guest');
  assert.equal(appStorage.getItem('weiheng.local.v2'), '{"saved":"guest"}');
  assert.throws(() => appStorage.setItem('weiheng.local.v2', '{}'), /账号状态暂不可确认/);
  listeners.get('focus')();
  await new Promise(resolve => setImmediate(resolve));
  appStorage.setItem('weiheng.local.v2', '{"saved":"new guest"}');
  assert.equal(appStorage.getItem('weiheng.local.v2'), '{"saved":"new guest"}');
  assert.equal(requests, 2);
});
