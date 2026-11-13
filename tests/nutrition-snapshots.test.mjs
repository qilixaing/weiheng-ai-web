import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {FOOD_BY_ID} from '../src/data/catalogue.js';
import {createNutritionSnapshot,normalizeSnapshot} from '../src/lib/nutritionSnapshot.js';
import {calculateIntake,makeRecord,recordEntries,recordVersion,formatTotal} from '../src/lib/foodNutrition.js';
import {referenceMap,nutrientRows,intakeTrend} from '../src/lib/intakeAnalysis.js';
import {overviewNutrition} from '../src/lib/lifeStageNutrition.js';
import {sampleChoices} from '../src/lib/foodSamples.js';
import {mergeAccountState} from '../src/lib/accountMerge.js';
import {createAiHandler} from '../server/ai-api.mjs';

const estimate={foodId:'tofu',basisGrams:100,model:'synthetic-test',generatedAt:'2026-11-05T00:00:00Z',recipe:'测试配方',estimate:{assumption:'合成范围，仅用于测试',values:{energy:{low:60,high:110,unit:'kcal'},protein:{low:5,high:9,unit:'g'},fat:{low:2,high:6,unit:'g'},carbs:{low:1,high:3,unit:'g'}}}};
const tofu=()=>({id:'t',foodId:'tofu',grams:200,referenceConfirmed:true,nutritionSnapshot:createNutritionSnapshot(FOOD_BY_ID.tofu,estimate)});
test('legacy estimate bounds normalize to one midpoint across save/reload/portion edits; missing micros remain unknown',()=>{
 const entry=tofu(),record=makeRecord({date:'2026-11-05',entries:[entry]});
 const restored=recordEntries(JSON.parse(JSON.stringify(record)));
 assert.deepEqual(calculateIntake(restored).totals.energy.range,{low:170,high:170});
 assert.equal(calculateIntake(restored).totals.energy.value,null);
 assert.equal(formatTotal(calculateIntake(restored).totals.energy),'170');
 assert.equal(calculateIntake(restored).totals.calcium.value,null);
 assert.equal(calculateIntake(restored).totals.calcium.complete,false);
 restored[0].grams=50;assert.deepEqual(calculateIntake(restored).totals.energy.range,{low:42.5,high:42.5});
 assert.equal(calculateIntake(restored).totals.energy.estimatedCount,1);
 assert.equal(restored[0].nutritionSnapshot.estimate.recipe,'测试配方');
 const changed=structuredClone(record);changed.entries[0].nutritionSnapshot.ranges.energy.high=120;
 assert.notEqual(recordVersion(changed),recordVersion(record));
});
test('mixed sums include a database value once, retain zero and expose unknown coverage',()=>{
 const exact=createNutritionSnapshot(FOOD_BY_ID.banana,null);exact.values.energy=10;exact.values.sodium=0;
 const entries=[tofu(),{foodId:'banana',grams:100,nutritionSnapshot:exact}];
 const sum=calculateIntake(entries);assert.deepEqual(sum.totals.energy.range,{low:180,high:180});assert.equal(sum.totals.energy.value,10);assert.equal(sum.totals.energy.complete,true);
 assert.equal(sum.totals.sodium.value,0);assert.equal(sum.totals.sodium.complete,false);
 assert.equal(nutrientRows(entries,{sex:'male',age:25,height:175,weight:70,activity:'light'}).find(n=>n.id==='energy').ratio,null);
 assert.equal(intakeTrend([{date:'2026-11-05',entries}], '2026-11-05',2)[0].totals.energy.value,null);
});
test('snapshot identity, unit and AI metric restrictions are enforced; old records remain old',()=>{
 const s=tofu().nutritionSnapshot;s.ranges.calcium={low:1,high:3};s.ranges.energy={low:10,high:20};s.units.energy='kJ';
 const normalized=normalizeSnapshot(s,'tofu');assert.equal(normalized.ranges.energy,undefined);assert.equal(normalized.ranges.calcium,undefined);
 assert.equal(normalizeSnapshot(s,'banana'),null);
 const old=makeRecord({date:'2026-11-05',entries:[{foodId:'banana',grams:100}]});assert.equal(old.entries[0].nutritionSnapshot,undefined);assert.equal(calculateIntake(old.entries).totals.energy.value,89);
});
test('all age reference maps agree with overview and do not turn group references into precise percentages',()=>{
 for(const age of [0,1,5,17,18,19,78,79,120]){const p={sex:'male',age,ageMonths:3,height:age<1?60:age<5?90:age<18?140:170,weight:age<1?6:age<5?13:age<18?40:65,activity:'light'};const overview=overviewNutrition(p);assert.equal(referenceMap(p).energy?.value,overview?.tdee);if(overview?.referenceOnly)assert.equal(nutrientRows([{foodId:'banana',grams:100}],p)[0].ratio,null);}
 assert.equal(referenceMap({sex:'female',age:30,physiologicalStage:'pregnant'}).energy,undefined);
 assert.equal(referenceMap({sex:'male',age:0}).energy,undefined);
 for(const choice of sampleChoices(FOOD_BY_ID.tofu)){assert.ok(FOOD_BY_ID[choice.id].source);assert.ok(FOOD_BY_ID[choice.id].nutrients.calcium!=null);}
});
test('account three-way merging retains snapshots on independent dates',()=>{
 const a=makeRecord({date:'2026-11-04',entries:[tofu()]}),b=makeRecord({date:'2026-11-05',entries:[{foodId:'banana',grams:100}]});
 const result=mergeAccountState({records:[]},{records:[a]},{records:[b]});assert.equal(result.conflicts.length,0);assert.equal(result.state.records.length,2);assert.deepEqual(result.state.records.find(r=>r.date===a.date).entries[0].nutritionSnapshot,a.entries[0].nutritionSnapshot);
});
test('server explanation uses saved single-point estimate exactly once without calling a second estimator',async t=>{
 let calls=0,calculation;
 const handler=createAiHandler({env:{DEEPSEEK_API_KEY:'synthetic-test-only'},fetchImpl:async(_url,options)=>{calls++;calculation=JSON.parse(JSON.parse(options.body).messages[1].content).calculation;return new Response(JSON.stringify({choices:[{message:{content:JSON.stringify({summary:'模拟解释',overview:[],targetComparison:[],foodMix:[],attention:[],suggestions:[],scope:'模拟测试'})}}]}));}});
 const server=createServer(async(req,res)=>{await handler(req,res,new URL(req.url,'http://localhost'));});server.listen(0,'127.0.0.1');await once(server,'listening');t.after(()=>server.close());
 const response=await fetch(`http://127.0.0.1:${server.address().port}/api/ai/analyze-day`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date:'2026-11-05',entries:[tofu()],profile:null})});
 const body=await response.json();assert.equal(response.status,200,JSON.stringify(body));assert.equal(calls,1);assert.deepEqual(calculation.intake.totals.energy.range,{low:170,high:170});assert.deepEqual(body.calculation.comparison[0].estimatedRange.intake,{low:170,high:170});
});
