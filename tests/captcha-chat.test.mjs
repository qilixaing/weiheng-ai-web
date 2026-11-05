import test from 'node:test';
import assert from 'node:assert/strict';
import {ImageCaptcha} from '../server/image-captcha.mjs';
import {mergeChat,stampChat} from '../src/lib/chatSyncMerge.js';
test('captcha uses PNG, binds cookie, expires and consumes on wrong or correct attempt',()=>{
 const c=new ImageCaptcha(),v=c.issue('browser-one'),answer=c.entries.get(v.captchaId).answer;
 assert.match(answer,/^[23456789A-H]{4}$/);
 assert.ok(v.image.startsWith('data:image/png;base64,iVBOR'));
 assert.equal(c.verify(v.captchaId,answer,'other-browser'),false);
 assert.equal(c.verify(v.captchaId,answer.toLowerCase(),'browser-one'),true);
 assert.equal(c.verify(v.captchaId,answer,'browser-one'),false);
 const b=c.issue('b');c.entries.get(b.captchaId).expires=0;assert.equal(c.verify(b.captchaId,c.entries.get(b.captchaId).answer,'b'),false);
 const d=c.issue('b');assert.equal(c.verify(d.captchaId,'wrong','b'),false);assert.equal(c.entries.has(d.captchaId),false);
});
const state=(id,content='hi',updatedAt=1)=>({threads:[{id,date:'2026-11-05',createdAt:'2026-11-05T00:00:00Z',messages:[{id:id+'-m',role:'user',content,createdAt:'2026-11-05T00:00:00Z',updatedAt}]}]});
test('two devices merge different threads and newer streaming messages without dropping history',()=>{
 let v=mergeChat(state('phone'),state('pc'));assert.equal(v.threads.length,2);
 v=mergeChat(v,state('phone','complete answer',5));v=mergeChat(v,state('phone','stale partial',2));assert.equal(v.threads.find(t=>t.id==='phone').messages[0].content,'complete answer');
 assert.equal(stampChat(v,state('phone')).deleted.pc,undefined);
 assert.equal(mergeChat(v,{threads:[],deleted:{phone:10}}).threads.length,1);
 assert.equal(mergeChat({threads:[],clearedAt:Date.parse('2026-11-06')},state('phone')).threads.length,0);
});
