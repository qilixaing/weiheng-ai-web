import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {createAiHandler} from '../server/ai-api.mjs';
import {normalizeMealConditions,allowedMealFood,foodConflicts,calculateMealCost} from '../src/lib/mealConditions.js';
import {appendPlanToDraft} from '../src/lib/planDraft.js';
import {FOOD_BY_ID,ALL_FOODS} from '../src/data/catalogue.js';
import {validateProfile,calculateNutrition} from '../src/lib/nutrition.js';

const conditions=overrides=>normalizeMealConditions({budget:20,avoids:'花生、香菜',availableFoods:[{foodId:'banana',grams:100,price:3}],...overrides});
test('meal costing uses portion prices, preserves unknowns and rejects invalid inputs',()=>{
 const base=conditions({});assert.equal(calculateMealCost([{foodId:'banana',grams:150}],base).total,4.5);
 assert.equal(calculateMealCost([{foodId:'banana',grams:800}],base).status,'over_budget');
 const incomplete=calculateMealCost([{foodId:'banana',grams:100},{foodId:'rice',grams:100}],base);assert.equal(incomplete.total,null);assert.equal(incomplete.status,'unknown');assert.equal(incomplete.knownSubtotal,3);
 const free=conditions({availableFoods:[{foodId:'banana',grams:100,price:0}]});assert.equal(calculateMealCost([{foodId:'banana',grams:100}],free).total,0);
 for(const invalid of [{budget:-1},{budget:Infinity},{availableFoods:[{foodId:'banana',grams:0,price:1}]},{availableFoods:[{foodId:'does-not-exist',grams:100}]}])assert.throws(()=>conditions(invalid));
});
test('explicit avoids and available-only conditions constrain actual catalogue candidates',()=>{
 const peanut=ALL_FOODS.find(x=>/PEANUT/.test(x.source?.description||''));assert.ok(peanut);
 const c=conditions({avoids:'不吃花生'});assert.equal(allowedMealFood(peanut,c),false);assert.equal(allowedMealFood(FOOD_BY_ID.banana,c),true);assert.equal(allowedMealFood(FOOD_BY_ID.rice,c),false);
 const eggplant=ALL_FOODS.find(x=>x.source?.description.startsWith('EGGPLANT'));assert.ok(eggplant);assert.deepEqual(foodConflicts(eggplant,['egg']),[]);
 assert.ok(foodConflicts(FOOD_BY_ID['usda-01123'],['蛋']).length);
});
test('confirmation creates a complete draft batch once and does not mutate the prior draft',()=>{
 const draft={date:'2026-11-03',entries:[],appliedBatches:[]},plan={date:draft.date,meal:'lunch',confirmationId:'protocol-test-id',items:[{foodId:'banana',grams:100},{foodId:'rice',grams:80}]};
 const first=appendPlanToDraft(draft,plan);assert.equal(first.draft.entries.length,2);assert.equal(draft.entries.length,0);
 const duplicate=appendPlanToDraft(first.draft,plan);assert.equal(duplicate.duplicate,true);assert.equal(duplicate.draft.entries.length,2);
 assert.throws(()=>appendPlanToDraft(draft,{...plan,items:[...plan.items,{foodId:'invalid',grams:100}]}));assert.equal(draft.entries.length,0);
});
test('whole-profile skip and missing activity never create adult targets',()=>{
 assert.equal(validateProfile({sex:'',age:'',height:'',weight:'',activity:''}),'');
 assert.equal(calculateNutrition({sex:'male',age:20,height:175,weight:65,activity:''}),null);
 for(const age of [0,17])assert.equal(calculateNutrition({sex:'male',age,height:160,weight:50,activity:'light'}),null);
});

async function fixture(t){
 let count=0;const requests=[];
 const scripted=[['search_foods',{query:'香蕉',limit:1}],['get_food_detail',{foodId:'banana'}],['calculate_nutrition',{items:[{foodId:'banana',grams:100}]}],['compare_with_targets',{items:[{foodId:'banana',grams:100}]}]];
 const handler=createAiHandler({env:{DEEPSEEK_API_KEY:'test-only-synthetic-token'},fetchImpl:async(_url,options)=>{const body=JSON.parse(options.body);requests.push(body);const index=count++;
 if(index<4){const[name,args]=scripted[index];return new Response(JSON.stringify({model:'SIMULATED-PROTOCOL',choices:[{message:{role:'assistant',content:null,tool_calls:[{id:'call-'+index,type:'function',function:{name,arguments:JSON.stringify(args)}}]}}]}));}
 return new Response(JSON.stringify({model:'SIMULATED-PROTOCOL',choices:[{message:{content:JSON.stringify({title:'协议验证方案',summary:'仅用于接口测试。',items:[{foodId:'banana',grams:100,reason:'协议样本'}],suggestions:[],cautions:['不是实际推荐']})}}]}));
 }});
 const server=createServer(async(req,res)=>{if(!await handler(req,res,new URL(req.url,'http://localhost')))res.end();});server.listen(0,'127.0.0.1');await once(server,'listening');t.after(()=>server.close());
 return{requests,url:'http://127.0.0.1:'+server.address().port+'/api/ai/meal-plan'};
}
test('streaming meal trace reports completed real tools and drops private record fields',async t=>{
 const f=await fixture(t),response=await fetch(f.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({stream:true,goal:'协议测试',date:'2026-11-03',meal:'lunch',profile:{sex:'',activity:''},conditions:conditions({}),recordContext:{date:'2026-11-03',entries:[{foodId:'rice',grams:100,notes:'PRIVATE_RECORD',photo:'PRIVATE_PHOTO'}],notes:'PRIVATE_CONTEXT'}})});
 const text=await response.text(),events=text.split(/\n\n/).flatMap(x=>x.startsWith('data: ')?[JSON.parse(x.slice(6))]:[]);
 assert.equal(events.filter(x=>x.type==='progress').length,5);assert.deepEqual(events.filter(x=>x.type==='progress').map(x=>x.step.tool),['read_context','search_foods','get_food_detail','calculate_nutrition','compare_with_targets']);
 assert.equal(events.at(-1).type,'done');const result=events.at(-1).result;assert.equal(result.cost.total,3);assert.equal(result.contextSummary.itemCount,1);assert.equal(result.contextSummary.targetsAvailable,false);assert.ok(result.confirmationId);
 assert.ok(!JSON.stringify(f.requests).includes('PRIVATE_'));assert.equal(JSON.parse(f.requests[0].messages[1].content).recordContext.itemCount,1);
});
test('server rejects over-budget calculations and records from a different date',async t=>{
 const f=await fixture(t);const request=body=>fetch(f.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 const base={goal:'协议测试',date:'2026-11-03',meal:'lunch',conditions:conditions({budget:1})};
 const response=await request(base);assert.equal(response.status,422);assert.equal((await response.json()).code,'BUDGET_EXCEEDED');assert.equal(f.requests.length,3);
 const bad=await request({...base,recordContext:{date:'2026-11-02',entries:[]}});assert.equal(bad.status,400);assert.equal((await bad.json()).code,'INVALID_MEAL_CONTEXT');
});
