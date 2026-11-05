import {mergeAccountState} from './accountMerge.js';
import { ref } from 'vue';
import { mergeChat, stampChat } from './chatSyncMerge.js';

// Guest data keeps its historical keys. Signed-in workspaces use their own
// browser namespace and sync only the main profile/food-plan state to /api/data.
let actor = 'guest';
let syncTimer = 0;
const CHAT_KEY='weiheng.ai-diet-chat.v1';
let chatBusy=false,chatTimer=0,chatStopped=false;
export const chatSyncStatus=ref('guest');
const parseChat=s=>{try{return JSON.parse(s)||{threads:[]};}catch{return {threads:[]};}};
async function syncChat(){
 if(actor==='guest'||chatBusy||chatStopped)return;
 const identity=actor,key=scopedKey(CHAT_KEY),before=globalThis.localStorage.getItem(key);
 chatBusy=true;chatSyncStatus.value='syncing';
 try{
  const response=await fetch('/api/chat',{method:before?'PUT':'GET',cache:'no-store',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/json'},...(before?{body:JSON.stringify({...parseChat(before),expectedUserId:identity})}:{})});
  const result=await response.json();if(!response.ok)throw Error(result.error);
  if(chatStopped||actor!==identity||result.userId!==identity)return;
  const current=globalThis.localStorage.getItem(key),state=mergeChat(result.state,parseChat(current)),serialized=JSON.stringify(state);
  globalThis.localStorage.setItem(key,serialized);chatSyncStatus.value='synced';lastChatSync.value=new Date().toISOString();
  if(current!==serialized)window.dispatchEvent(new CustomEvent('weiheng-chat-synced'));
  if(current!==before){clearTimeout(chatTimer);chatTimer=setTimeout(syncChat,1000);}
 }catch{chatSyncStatus.value='error';}finally{chatBusy=false;}
}
const MAIN_DATA_KEY = 'weiheng.local.v2';
export const accountUser = ref(null);
export const accountSyncStatus = ref('guest');
export const lastAccountSync=ref(''),lastChatSync=ref(''),accountConflict=ref([]);
let accountBusy=false;
const baseKey=()=>scopedKey('__account_sync_base.v1');
const parseState=value=>{try{return JSON.parse(value)||{};}catch{return {};}};
export const currentActor = () => actor;
export function scopedKey(key, identity = actor) {
  return identity === 'guest' ? key : 'weiheng.account.' + encodeURIComponent(identity) + '.' + key;
}
export function ownsStorageKey(key, identity = actor) {
  return identity === 'guest'
    ? /^(weiheng|vitabalance)([.:\-]|$)/.test(key) && !key.startsWith('weiheng.account.')
    : key.startsWith('weiheng.account.' + encodeURIComponent(identity) + '.');
}
const pendingKey = () => scopedKey('__account_sync_pending.v1');

async function requestAccountData(method = 'GET', localState, baseLocalState) {
  const options = { method, cache: 'no-store', signal:AbortSignal.timeout(15000), headers: { 'Content-Type': 'application/json' } };
  if (method === 'PUT') options.body = JSON.stringify({ localState, baseLocalState, expectedUserId:actor==='guest'?undefined:actor });
  const response = await fetch('/api/data', options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || '账号数据同步失败。');
  return payload;
}

export async function flushAccountData(choice) {
  if(actor==='guest'||accountBusy)return;
  const identity=actor,key=scopedKey(MAIN_DATA_KEY),local=globalThis.localStorage.getItem(key);
  if(local===null)return;
  accountBusy=true;accountSyncStatus.value='syncing';
  try{
    const remote=await requestAccountData('GET'),server=remote.data?.localState||null;
    if(actor!==identity||remote.userId!==identity){accountSyncStatus.value='error';return;}
    const base=globalThis.localStorage.getItem(baseKey());
    const merged=mergeAccountState(parseState(base),parseState(local),parseState(server),choice);
    if(merged.conflicts.length){
      // Preserve both originals before a user chooses how overlapping edits resolve.
      const archiveKey=scopedKey('__sync_conflict_backup.v1');
      const previous=globalThis.localStorage.getItem(archiveKey);
      if(!previous||!accountConflict.value.length)globalThis.localStorage.setItem(archiveKey,JSON.stringify({local,server,at:new Date().toISOString()}));
      if(!choice){accountConflict.value=merged.conflicts;accountSyncStatus.value='error';return;}
    }
    const next=JSON.stringify(merged.state);
    await requestAccountData('PUT',next,server);
    if(actor!==identity)return;
    globalThis.localStorage.setItem(baseKey(),next);
    if(globalThis.localStorage.getItem(key)===local){
      globalThis.localStorage.setItem(key,next);globalThis.localStorage.removeItem(pendingKey());
      window.dispatchEvent(new CustomEvent('weiheng-account-synced'));
      accountSyncStatus.value='synced';accountConflict.value=[];
    }else{accountSyncStatus.value='pending';clearTimeout(syncTimer);syncTimer=setTimeout(()=>flushAccountData(),450);}
    lastAccountSync.value=new Date().toISOString();
  }catch{accountSyncStatus.value='error';}
  finally{accountBusy=false;}
}
export async function retryAccountSync(choice){await flushAccountData(choice);await syncChat();}
export function exportSyncBackup(){return globalThis.localStorage.getItem(scopedKey('__sync_conflict_backup.v1'));}

function scheduleAccountSync() {
  if (actor === 'guest') return;
  globalThis.localStorage.setItem(pendingKey(), '1');
  accountSyncStatus.value = 'pending';
  clearTimeout(syncTimer);
  syncTimer = setTimeout(()=>flushAccountData(), 450);
}

export const appStorage = {
  getItem: key => globalThis.localStorage.getItem(scopedKey(key)),
  setItem(key, value) {
    if(key===CHAT_KEY){value=JSON.stringify(stampChat(parseChat(appStorage.getItem(key)),parseChat(value)));}
    globalThis.localStorage.setItem(scopedKey(key), value);
    if(key===CHAT_KEY&&actor!=='guest'){chatSyncStatus.value='pending';clearTimeout(chatTimer);chatTimer=setTimeout(syncChat,900);}
    if (key === MAIN_DATA_KEY) scheduleAccountSync();
  },
  removeItem(key) {
    globalThis.localStorage.removeItem(scopedKey(key));
    if (key === MAIN_DATA_KEY && actor !== 'guest') {
      accountSyncStatus.value = 'error';
      globalThis.localStorage.setItem(pendingKey(), 'deleted');
    }
  },
};

async function hydrateSignedInWorkspace(userId) {
  const accountKey = scopedKey(MAIN_DATA_KEY, userId);
  const queued = globalThis.localStorage.getItem(scopedKey('__account_sync_pending.v1', userId));
  const localState = globalThis.localStorage.getItem(accountKey);
  const remote = await requestAccountData('GET');
  const serverState = typeof remote.data?.localState === 'string' ? remote.data.localState : null;

  if (queued === 'deleted') {
    const response = await fetch('/api/data', { method: 'DELETE', cache: 'no-store' });
    if (!response.ok) throw new Error('账号数据删除状态暂未同步。');
    globalThis.localStorage.removeItem(scopedKey('__account_sync_pending.v1', userId));
  } else if (queued && localState !== null) {
    await flushAccountData();return;
  } else if (serverState !== null && localState!==null && serverState!==localState) {
    await flushAccountData();return;
  } else if (serverState !== null) {
    globalThis.localStorage.setItem(accountKey, serverState);
  } else if (localState !== null) {
    await requestAccountData('PUT', localState, null);
  }
  globalThis.localStorage.setItem(baseKey(),serverState||localState||'{}');
  lastAccountSync.value=new Date().toISOString();accountSyncStatus.value = 'synced';
}

export async function initializeStorageScope() {
  try {
    const response = await fetch('/api/auth/me', { cache: 'no-store', signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw Error('identity');
    const me = await response.json();
    accountUser.value = me.authenticated && typeof me.user?.id === 'string' ? me.user : null;
    actor = accountUser.value?.id || 'guest';
    accountSyncStatus.value = actor === 'guest' ? 'guest' : 'syncing';
    if (actor !== 'guest') { try{await hydrateSignedInWorkspace(actor);}catch{accountSyncStatus.value='error';} await syncChat(); }
  } catch {
    throw new Error('无法确认当前使用空间，暂停读取本地数据。');
  }

  // A cookie/account change in another tab must not carry the old workspace
  // into a newly authenticated identity. Bound storage stays in its old scope.
  let checking = false;
  const check = async () => {
    if (checking || document.hidden) return;
    checking = true;
    try {
      const response = await fetch('/api/auth/me', { cache: 'no-store', signal: AbortSignal.timeout(4000) });
      if (!response.ok) return;
      const me = await response.json();
      const next = me.authenticated && typeof me.user?.id === 'string' ? me.user.id : 'guest';
      if (next !== actor) window.location.reload();
      else if (next !== 'guest') await flushAccountData();
    } catch { /* Retain local data while the server is briefly unavailable. */ }
    finally { checking = false; }
  };
  window.addEventListener('focus', ()=>{void check();void syncChat();});
  window.addEventListener('online',()=>void syncChat());
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)void syncChat();});
  window.addEventListener('pagehide',()=>{if(actor!=='guest'){const body=appStorage.getItem(CHAT_KEY);if(body)void fetch('/api/chat',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...parseChat(body),expectedUserId:actor}),keepalive:true}).catch(()=>{});}});
  const polling=setInterval(()=>{if(!document.hidden)void syncChat();},8000);
  polling.unref?.();
  window.addEventListener('weiheng-reset-begin',()=>{chatStopped=true;clearTimeout(chatTimer);});
  window.addEventListener('weiheng-reset-abort',()=>{chatStopped=false;});
  document.addEventListener('visibilitychange', check);
  window.addEventListener('storage', event => {
    if (event.key === scopedKey(MAIN_DATA_KEY) && actor !== 'guest') scheduleAccountSync();
  });
}

export async function signInOrRegister({ mode, email, password, acceptTerms = false, verificationCode = '' }) {
  const guestState = globalThis.localStorage.getItem(MAIN_DATA_KEY);
  const response = await fetch(`/api/auth/${mode === 'register' ? 'register' : 'login'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({ email, password, acceptTerms, verificationCode }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || '登录暂时失败，请重试。');

  const remote = await requestAccountData('GET');
  const serverState = typeof remote.data?.localState === 'string' ? remote.data.localState : null;
  let message = '账号已登录。';
  if (guestState && serverState === null) {
    if (window.confirm('发现本浏览器已有游客档案和饮食记录。是否复制到这个账号？游客原数据会保留，不会删除。')) {
      await requestAccountData('PUT', guestState);
      globalThis.localStorage.setItem(scopedKey(MAIN_DATA_KEY, result.user.id), guestState);
      message += '游客数据已复制到账号。';
    } else {
      message += '游客数据仍留在原浏览器空间。';
    }
  } else if (guestState && serverState !== null) {
    message += '账号已有数据，游客数据仍保留在原浏览器空间，未覆盖账号数据。';
  }
  window.location.reload();
  return { message };
}

export async function signOut() {
  await syncChat();
  const response = await fetch('/api/auth/logout', { method: 'POST', cache: 'no-store' });
  if (!response.ok) throw new Error('退出登录失败，请重试。');
  window.location.reload();
}

export function clearSyncedChat(){const key='weiheng.ai-diet-chat.v1',old=parseChat(appStorage.getItem(key)),deleted={...old.deleted};for(const t of old.threads||[])deleted[t.id]=Date.now();appStorage.setItem(key,JSON.stringify({threads:[],deleted,clearedAt:Date.now(),activeByDate:{},memoryEnabled:old.memoryEnabled}));}
