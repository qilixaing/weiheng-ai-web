import test from 'node:test';
import assert from 'node:assert/strict';
import {DEMO_FEEDBACK,DEMO_LABEL} from '../src/data/demoFeedback.js';
import {saveFeedback,loadFeedback,feedbackStats,feedbackCsv} from '../src/lib/feedback.js';
import {initializeStorageScope,scopedKey,ownsStorageKey,appStorage} from '../src/lib/storageScope.js';
const values=new Map();const storage={getItem:key=>values.get(key)||null,setItem:(key,v)=>values.set(key,v)};
test('synthetic feedback is opt-in and cannot be saved or counted as real evidence',()=>{
 assert.equal(DEMO_FEEDBACK.length,30);assert.ok(DEMO_FEEDBACK.every(x=>x.isSynthetic&&x.isDemo));
 assert.equal(feedbackStats(DEMO_FEEDBACK).count,0);assert.equal(feedbackStats(DEMO_FEEDBACK).completionRate,null);
 assert.equal(feedbackStats(DEMO_FEEDBACK,{demo:true}).count,30);assert.match(feedbackCsv(DEMO_FEEDBACK,{demo:true}),new RegExp(DEMO_LABEL));
 assert.throws(()=>saveFeedback(storage,{...DEMO_FEEDBACK[0],consent:true}),/模拟/);
 assert.equal(loadFeedback(storage).length,0);assert.ok(!feedbackCsv(DEMO_FEEDBACK).includes(DEMO_FEEDBACK[0].content));
});
test('voluntary feedback is whitelisted and formula-safe on CSV export',()=>{
 const input={task:'测试任务',content:'=HYPERLINK("example")',completed:false,rating:2,explanationRating:3,consent:true,profile:{secret:'PRIVATE_BODY'},messages:['PRIVATE_CHAT']};
 const row=saveFeedback(storage,input);assert.ok(!('profile'in row));assert.ok(!('messages'in row));assert.equal(loadFeedback(storage).length,1);assert.equal(row.durationSeconds,null);
 const csv=feedbackCsv(loadFeedback(storage));assert.ok(!csv.includes('PRIVATE'));assert.ok(csv.includes("'=HYPERLINK"));assert.throws(()=>saveFeedback(storage,input),/重复/);
});
test('accounts get distinct local namespaces and guest recovery data is preserved',async()=>{
 globalThis.window={addEventListener(){},location:{reload(){}}};globalThis.document={hidden:false,addEventListener(){}};globalThis.localStorage=storage;
 globalThis.fetch=async()=>new Response(JSON.stringify({authenticated:true,user:{id:'visitor-A'}}));await initializeStorageScope();appStorage.setItem('weiheng.local.v2','profile-A');
 globalThis.fetch=async()=>new Response(JSON.stringify({authenticated:true,user:{id:'visitor-B'}}));await initializeStorageScope();assert.equal(appStorage.getItem('weiheng.local.v2'),null);appStorage.setItem('weiheng.local.v2','profile-B');
 assert.equal(values.get(scopedKey('weiheng.local.v2','visitor-A')),'profile-A');assert.equal(ownsStorageKey(scopedKey('weiheng.local.v2','visitor-A')),false);assert.equal(ownsStorageKey(scopedKey('weiheng.local.v2','visitor-B')),true);
 values.set('weiheng.local.v2','legacy-guest');globalThis.fetch=async()=>new Response(JSON.stringify({authenticated:false}));await initializeStorageScope();assert.equal(appStorage.getItem('weiheng.local.v2'),'legacy-guest');assert.equal(ownsStorageKey(scopedKey('weiheng.local.v2','visitor-B')),false);
});
