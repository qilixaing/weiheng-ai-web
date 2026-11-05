import test from 'node:test';
import assert from 'node:assert/strict';
const memory=new Map();let failWrite=false;
globalThis.localStorage={getItem:key=>memory.get(key)||null,setItem:(key,value)=>{if(failWrite)throw new Error('test quota');memory.set(key,value);}};
const {useLocalNutrition}=await import('../src/composables/useLocalNutrition.js');
test('record is committed before exposing success; failed writes preserve prior records and identical saves are no-ops',()=>{
 const store=useLocalNutrition();store.updateProfile({sex:'male',age:30,height:175,weight:65,activity:'light'});
 const draft={date:'2026-10-30',entries:[{foodId:'banana',grams:150,meal:'breakfast'}]};
 const first=store.saveRecord(draft);assert.equal(first.ok,true);assert.equal(JSON.parse(memory.get('weiheng.local.v2')).records.length,1);
 const repeated=store.saveRecord(draft);assert.equal(repeated.unchanged,true);assert.equal(repeated.record.updatedAt,first.record.updatedAt);
 failWrite=true;const failure=store.saveRecord({...draft,entries:[{foodId:'banana',grams:200}]});assert.equal(failure.ok,false);assert.equal(store.state.records[0].entries[0].grams,150);assert.equal(JSON.parse(memory.get('weiheng.local.v2')).records[0].entries[0].grams,150);failWrite=false;
});
test('older generic 白菜 entries need confirmation; new explicit Napa selections retain their name',async()=>{
 memory.set('weiheng.local.v2',JSON.stringify({records:[{date:'2026-10-29',entries:[{foodId:'cabbage',name:'白菜',grams:100,referenceConfirmed:true}]}],drafts:{'2026-10-29':{date:'2026-10-29',entries:[{foodId:'cabbage',name:'白菜',grams:100,referenceConfirmed:true}]}}}));
 const fresh=await import('../src/composables/useLocalNutrition.js?cabbage-sample-v2');const store=fresh.useLocalNutrition();
 assert.equal(store.state.records[0].entries[0].referenceConfirmed,false);assert.equal(store.state.drafts['2026-10-29'].entries[0].referenceConfirmed,false);
 store.addToDraft({date:'2026-10-30',foodId:'cabbage',grams:200});assert.equal(store.state.drafts['2026-10-30'].entries[0].name,'大白菜（生）');assert.equal(store.state.drafts['2026-10-30'].entries[0].referenceConfirmed,true);
});
