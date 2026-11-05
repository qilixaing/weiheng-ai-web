import {scopedKey,ownsStorageKey,accountUser} from './storageScope.js';
// Block delayed saves while clearing data, including saves in other open tabs.
const SIGNAL = scopedKey('weiheng.reset-signal.v1');
const ownedKey = key => ownsStorageKey(key);
let resetting = false;
export const isAppResetting = () => resetting;

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key !== SIGNAL || !event.newValue) return;
    try {
      const { phase } = JSON.parse(event.newValue);
      if (phase === 'begin') resetting = true;
      if (phase === 'abort') resetting = false;
      if (phase === 'done') { resetting = true; window.location.reload(); }
    } catch { /* Ignore malformed notifications. */ }
  });
}

function clearDatabase(factory, name) {
  return new Promise((resolve, reject) => {
    const request = factory.open(name);
    request.onerror = request.onblocked = () => reject(new Error('本地文件存储暂时无法清理，请关闭其他旧页面后重试。'));
    request.onsuccess = () => {
      const db = request.result;
      const stores = Array.from(db.objectStoreNames);
      if (!stores.length) { db.close(); resolve(); return; }
      try {
        // Clearing stores also works when another tab holds a database connection.
        const transaction = db.transaction(stores, 'readwrite');
        for (const store of stores) transaction.objectStore(store).clear();
        transaction.oncomplete = () => { db.close(); resolve(); };
        transaction.onerror = transaction.onabort = () => { db.close(); reject(new Error('本地文件清理未完成，请重试。')); };
      } catch (error) { db.close(); reject(error); }
    };
  });
}

function clearOwnedStorage(storage, keepSignal = false) {
  const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index));
  for (const key of keys) if (key && ownedKey(key) && !(keepSignal && key === SIGNAL)) storage.removeItem(key);
}

export async function resetLocalAppData({
  local = globalThis.localStorage,
  session = globalThis.sessionStorage,
  databases = globalThis.indexedDB,
  caches = globalThis.caches,
} = {}) {
  if (resetting) throw new Error('正在清理本地数据，请稍候。');
  resetting = true;
  const signal = phase => local.setItem(SIGNAL, JSON.stringify({ phase, time: Date.now() }));
  try {
    signal('begin');
    globalThis.window?.dispatchEvent?.(new Event('weiheng-reset-begin'));
    if (accountUser.value) {
      const response = await fetch('/api/data', { method: 'DELETE', cache: 'no-store' });
      if (!response.ok) throw new Error('账号数据暂时无法清理，请检查连接后重试。');
    }
    if (!databases) throw new Error('浏览器无法访问本地文件存储，暂时不能完成全部重置。');
    await Promise.all([
      clearDatabase(databases, scopedKey('weiheng.media.v1')),
      clearDatabase(databases, scopedKey('weiheng.chat-attachments.v1')),
    ]);
    if (caches) for (const name of await caches.keys()) if (ownedKey(name)) await caches.delete(name);
    if (session) clearOwnedStorage(session);
    clearOwnedStorage(local, true);
    signal('done');
    local.removeItem(SIGNAL);
    // Remain blocked until the caller reloads, so pagehide cannot restore chat.
  } catch (error) {
    try { signal('abort'); local.removeItem(SIGNAL); } catch { /* Preserve original failure. */ }
    resetting = false;
    globalThis.window?.dispatchEvent?.(new Event('weiheng-reset-abort'));
    throw error;
  }
}
