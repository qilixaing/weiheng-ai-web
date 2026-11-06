import test from 'node:test';
import assert from 'node:assert/strict';
import {AsyncLocalStorage} from 'node:async_hooks';
import {mergeChat} from '../src/lib/chatSyncMerge.js';
import {selectChatThreads} from '../src/lib/chatSelection.js';
import 'vue';

test('two isolated devices sync text, preserve in-flight edits, retry failures and isolate accounts',async()=>{
 const scope=new AsyncLocalStorage(),original={};
 for(const key of ['localStorage','window','document','fetch','setTimeout','clearTimeout','setInterval'])original[key]=Object.getOwnPropertyDescriptor(globalThis,key);
 const device=userId=>({userId,storage:new Map(),window:new EventTarget(),document:Object.assign(new EventTarget(),{hidden:false}),fail:false,hold:null});
 const phone=device('synthetic-account-a'),desktop=device('synthetic-account-a'),other=device('synthetic-account-b'),remote=new Map();
 for(const d of [phone,desktop,other])d.window.location={reload(){throw Error('Unexpected reload');}};
 try{
  Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){const storage=scope.getStore().storage;return{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};}});
  for(const key of ['window','document'])Object.defineProperty(globalThis,key,{configurable:true,get:()=>scope.getStore()[key]});
  globalThis.setTimeout=()=>({unref(){}});globalThis.clearTimeout=()=>{};globalThis.setInterval=()=>({unref(){}});
  globalThis.fetch=async(url,options={})=>{
   const d=scope.getStore();if(d.fail&&url==='/api/chat')throw Error('synthetic offline');
   if(url==='/api/auth/me')return{ok:true,json:async()=>({authenticated:true,user:{id:d.userId,email:d.userId+'@example.test'}})};
   if(url==='/api/data')return{ok:true,json:async()=>({userId:d.userId,data:{localState:null}})};
   assert.equal(url,'/api/chat');
   const before=remote.get(d.userId)||{threads:[]};let state=before;
   if(options.method==='PUT'){const body=JSON.parse(options.body);assert.equal(body.expectedUserId,d.userId);state=mergeChat(before,body);remote.set(d.userId,state);}
   if(d.hold){const held=d.hold;d.hold=null;await held;}
   return{ok:true,json:async()=>({userId:d.userId,state})};
  };
  const load=async(d,name)=>scope.run(d,async()=>{const client=await import('../src/lib/storageScope.js?client='+name);await client.initializeStorageScope();for(let i=0;i<5;i++)await new Promise(r=>setImmediate(r));return client;});
  const a=await load(phone,'phone'),key='weiheng.ai-diet-chat.v1',day='2026-11-06';
  const state={threads:[{id:'phone-thread',date:day,createdAt:day+'T09:55:00Z',messages:[{id:'u',role:'user',status:'complete',content:'合成手机测试',createdAt:day+'T09:55:00Z'}]}],activeByDate:{[day]:'phone-thread'}};
  await scope.run(phone,async()=>{a.appStorage.setItem(key,JSON.stringify(state));await a.syncChat();assert.equal(a.chatSyncStatus.value,'synced');});
  desktop.storage.set('weiheng.account.synthetic-account-a.'+key,JSON.stringify({threads:[{id:'empty-pc',date:day,createdAt:day+'T09:56:00Z',messages:[]}],activeByDate:{[day]:'empty-pc'}}));
  const b=await load(desktop,'desktop');
  await scope.run(desktop,async()=>{const copied=JSON.parse(b.appStorage.getItem(key));assert.equal(copied.threads.find(t=>t.id==='phone-thread').messages[0].content,'合成手机测试');assert.equal(selectChatThreads(copied,copied.activeByDate)[day],'phone-thread');
   b.appStorage.setItem(key,JSON.stringify({threads:[{id:'empty-pc',date:day,createdAt:day+'T09:56:00Z',messages:[]}]}));assert.ok(JSON.parse(b.appStorage.getItem(key)).threads.some(t=>t.id==='phone-thread'));});
  let release;phone.hold=new Promise(r=>release=r);
  await scope.run(phone,async()=>{const inflight=a.syncChat();await Promise.resolve();const changed=structuredClone(state);changed.threads[0].messages.push({id:'reply',role:'assistant',status:'complete',content:'合成的最终回复',createdAt:day+'T09:57:00Z'});a.appStorage.setItem(key,JSON.stringify(changed));release();await inflight;assert.ok(JSON.parse(a.appStorage.getItem(key)).threads[0].messages.some(m=>m.id==='reply'));assert.equal(a.chatSyncStatus.value,'pending');await a.syncChat();});
  await scope.run(desktop,async()=>{desktop.fail=true;await b.syncChat();assert.equal(b.chatSyncStatus.value,'error');desktop.fail=false;await b.syncChat();assert.equal(b.chatSyncStatus.value,'synced');assert.ok(JSON.parse(b.appStorage.getItem(key)).threads.find(t=>t.id==='phone-thread').messages.some(m=>m.id==='reply'));});
  const c=await load(other,'other');await scope.run(other,async()=>{await c.syncChat();assert.equal(JSON.parse(c.appStorage.getItem(key)).threads.length,0);});
  let flushed=false;phone.window.addEventListener('weiheng-chat-flush',()=>{flushed=true;});await scope.run(phone,async()=>{phone.window.dispatchEvent(new Event('pagehide'));assert.equal(flushed,true);});
 }finally{for(const [key,descriptor]of Object.entries(original)){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}}
});
