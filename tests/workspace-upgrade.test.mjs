import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {AuthStore} from '../auth-store.mjs';
import {mergeAccountState} from '../src/lib/accountMerge.js';
import {nutrientRows,intakeTrend,interpretation} from '../src/lib/intakeAnalysis.js';
import {overviewNutrition,lifeStageMicronutrients} from '../src/lib/lifeStageNutrition.js';
import {FOOD_BY_ID} from '../src/data/catalogue.js';
import {portionPresets} from '../src/lib/portionPresets.js';
const profile={sex:'male',age:25,height:175,weight:65,activity:'moderate'};
test('intake separates missing, partial and zero; trend does not zero-fill absent days',()=>{
 const known=Object.values(FOOD_BY_ID).find(f=>f.nutrients.energy>0),entries=[{foodId:known.key,grams:100},{name:'未知菜式',grams:100}];
 const r=nutrientRows(entries,profile).find(r=>r.id==='energy');assert.equal(r.complete,false);assert.equal(r.ratio,null);assert.match(interpretation(r),/小计/);
 const t=intakeTrend([{date:'2026-11-04',entries}], '2026-11-05');assert.equal(t.length,7);assert.equal(t.filter(d=>d.recorded).length,1);assert.equal(t.at(-1).totals.energy.value,null);
 const empty=nutrientRows([],profile);assert.ok(empty.every(r=>r.value===null));
 const ai={value:5,complete:true,reference:{kind:'AI'},ratio:.5};assert.match(interpretation(ai),/不能/);
});
test('special stages and missing infant months have no generic targets',()=>{
 assert.equal(overviewNutrition({...profile,physiologicalStage:'pregnant'}),null);
 assert.deepEqual(lifeStageMicronutrients({...profile,physiologicalStage:'lactating'}),{vitamins:[],minerals:[]});
 assert.equal(overviewNutrition({...profile,age:0,ageMonths:undefined}),null);
 assert.equal(portionPresets({name:'生米',state:'生'}).length,0);
 assert.equal(portionPresets({name:'白米饭',state:'煮熟'})[1].grams,150);
 assert.equal(portionPresets({name:'牛奶粉',state:'干粉'}).length,0);
});
test('account merge retains disjoint dates and requires explicit choice for overlapping edits',()=>{
 const b={profile:{age:20},records:[{date:'2026-11-01',entries:[]}]};
 const l={...b,records:[...b.records,{date:'2026-11-02',entries:[]}]},r={...b,records:[...b.records,{date:'2026-11-03',entries:[]}]};
 assert.equal(mergeAccountState(b,l,r).state.records.length,3);assert.equal(mergeAccountState(b,l,r).conflicts.length,0);
 const conflict=mergeAccountState(b,{...b,profile:{age:21}},{...b,profile:{age:22}});assert.deepEqual(conflict.conflicts,['profile']);
 assert.equal(mergeAccountState(b,{...b,profile:{age:21}},{...b,profile:{age:22}},'remote').state.profile.age,22);
 assert.equal(mergeAccountState(b,{...b,records:[]},b).state.records.length,0);
});
test('reset codes are separate, hashed, one-use, expire, limit guesses and revoke sessions',()=>{
 const directory=mkdtempSync(join(tmpdir(),'weiheng-reset-')),store=new AuthStore(directory,directory);
 try{
 const user=store.register('reset@example.com','original-strong-password');store.saveVerificationCode('reset:reset@example.com','234567');
 assert.equal(store.verifyRegistrationCode('reset@example.com','234567'),'missing');
 assert.equal(store.resetPassword('reset@example.com','234567','changed-strong-password'),true);
 assert.equal(store.userForToken(user.token),null);assert.equal(store.login('reset@example.com','original-strong-password'),null);assert.ok(store.login('reset@example.com','changed-strong-password'));
 assert.equal(store.resetPassword('reset@example.com','234567','another-password'),false);
 store.saveVerificationCode('reset:reset@example.com','234567',Date.now()-1);assert.equal(store.resetPassword('reset@example.com','234567','another-password'),false);
 store.saveVerificationCode('reset:reset@example.com','234567');for(let i=0;i<5;i++)assert.equal(store.resetPassword('reset@example.com','111111','another-password'),false);assert.equal(store.resetPassword('reset@example.com','234567','another-password'),false);
 }finally{store.db.close();rmSync(directory,{recursive:true,force:true});}
});
