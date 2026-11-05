import { scopedKey } from './storageScope.js';
import { isAppResetting } from './appDataReset.js';
// Photos and reports stay in IndexedDB; a completed transaction is the save boundary.
let connection;
function database(){if(!connection)connection=new Promise((resolve,reject)=>{if(!globalThis.indexedDB){reject(new Error('此浏览器无法使用本地照片和报告存储。'));return;}const request=indexedDB.open(scopedKey('weiheng.media.v1'),1);request.onupgradeneeded=()=>{const db=request.result;for(const name of ['photos','reports'])if(!db.objectStoreNames.contains(name))db.createObjectStore(name,{keyPath:'id'});};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(new Error('无法打开本地存储，请检查浏览器隐私设置。'));request.onblocked=()=>reject(new Error('本地存储被其他页面占用，请关闭旧页面后重试。'));});return connection;}
async function run(store,mode,action){const db=await database();if(mode==='readwrite'&&isAppResetting())throw new Error('正在重置本地数据，已停止保存。');return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);let result;const request=action(tx.objectStore(store));request.onsuccess=()=>{result=request.result;};tx.oncomplete=()=>resolve(result);tx.onabort=tx.onerror=()=>reject(new Error('本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。'));});}
export const localPut=(store,value)=>run(store,'readwrite',s=>s.put(JSON.parse(JSON.stringify(value))));
export const localGet=(store,id)=>run(store,'readonly',s=>s.get(id));
export const localAll=store=>run(store,'readonly',s=>s.getAll());
export const localDelete=(store,id)=>run(store,'readwrite',s=>s.delete(id));
