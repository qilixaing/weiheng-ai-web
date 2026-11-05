import test from 'node:test';
import assert from 'node:assert/strict';
import { resetLocalAppData, isAppResetting } from '../src/lib/appDataReset.js';

function storage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return { values, get length() { return values.size; }, key: index => [...values.keys()][index], setItem: (key,value) => values.set(key,value), removeItem: key => values.delete(key) };
}
function databaseFixture() {
  const contents = new Map([
    ['weiheng.media.v1', { photos: ['synthetic-photo'], reports: ['synthetic-report'] }],
    ['weiheng.chat-attachments.v1', { attachments: ['synthetic-file'] }],
    ['another-app', { records: ['keep'] }],
  ]);
  let closed = 0;
  return { contents, get closed() { return closed; }, open(name) {
    const request = {};
    queueMicrotask(() => {
      const stores = contents.get(name);
      request.result = { objectStoreNames: Object.keys(stores), close() { closed++; }, transaction(names) {
        const tx = { objectStore: store => ({ clear() { stores[store] = []; } }) };
        setImmediate(() => tx.oncomplete());
        return tx;
      } };
      request.onsuccess();
    });
    return request;
  } };
}
test('failure is reported and releases save guards so the user can retry', async () => {
  const local = storage({ 'weiheng.local.v2': 'keep-until-retry' });
  await assert.rejects(resetLocalAppData({ local, session: storage(), databases: null, caches: null }), /无法访问/);
  assert.equal(isAppResetting(), false);
  assert.equal(local.values.get('weiheng.local.v2'), 'keep-until-retry');
  assert.equal(local.values.has('weiheng.reset-signal.v1'), false);
});
test('reset clears all app namespaces and binary stores while preserving unrelated data and blocking pagehide saves', async () => {
  const local = storage({ 'weiheng.local.v2':'profile-records', 'weiheng.ai-diet-chat.v1':'chat', 'weiheng.theme.v1':'dark', 'vitabalance.v1':'legacy', 'vitabalance.guest.v1':'legacy-guest', 'unrelated':'keep' });
  const session = storage({ 'weiheng.test':'draft', 'other':'keep' });
  const databases = databaseFixture(), deleted = [];
  await resetLocalAppData({ local, session, databases, caches: { keys: async () => ['weiheng.assets','vitabalance-old','other-cache'], delete: async name => deleted.push(name) } });
  assert.deepEqual([...local.values.entries()], [['unrelated','keep']]);
  assert.deepEqual([...session.values.entries()], [['other','keep']]);
  assert.deepEqual(databases.contents.get('weiheng.media.v1'), {photos:[], reports:[]});
  assert.deepEqual(databases.contents.get('weiheng.chat-attachments.v1'), {attachments:[]});
  assert.deepEqual(databases.contents.get('another-app'), {records:['keep']});
  assert.equal(databases.closed, 2);
  assert.deepEqual(deleted, ['weiheng.assets','vitabalance-old']);
  assert.equal(isAppResetting(), true, 'delayed chat/pagehide writes remain suppressed until reload');
});
