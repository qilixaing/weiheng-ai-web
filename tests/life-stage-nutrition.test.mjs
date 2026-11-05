import test from 'node:test';
import assert from 'node:assert/strict';
import {overviewNutrition,lifeStageMicronutrients} from '../src/lib/lifeStageNutrition.js';
import {calculateNutrition,validateProfile} from '../src/lib/nutrition.js';
test('all integer ages 0–120 display age-group values without becoming adult AI targets',()=>{
 for(const sex of ['male','female'])for(let age=0;age<=120;age++){
  const profile={sex,age,ageMonths:0,height:age===0?50:age<3?85:age<10?120:165,weight:age===0?3.5:age<3?12:age<10?24:60,activity:'moderate'};
  const result=overviewNutrition(profile);
  assert.ok(result,`${sex} ${age}`);
  assert.ok(result.bmr>0);
  assert.ok(result.tdee>0||result.energyRange?.every(x=>x>0));
  assert.equal(result.macros.length,3);
  assert.equal(result.vitamins.length,10);assert.equal(result.minerals.length,8);
  assert.ok(result.macros.every(m=>typeof m.grams==='string'||m.grams>0));
  if(age<18||age>78){assert.equal(calculateNutrition(profile),null);assert.equal(result.referenceOnly,true);}
 }
});
test('infant months select growth equations; missing months remain unknown',()=>{
 const p={sex:'male',age:0,height:50,weight:3.5,activity:''};
 assert.equal(overviewNutrition(p),null);
 assert.deepEqual(lifeStageMicronutrients(p),{vitamins:[],minerals:[]});
 assert.ok(Math.abs(overviewNutrition({...p,ageMonths:0}).tdee-427.26)<1e-8);
 assert.ok(Math.abs(overviewNutrition({...p,ageMonths:6}).tdee-246.76)<1e-8);
 assert.equal(overviewNutrition({...p,ageMonths:6}).macros[0].grams,11);
 assert.equal(lifeStageMicronutrients({...p,ageMonths:6}).minerals.find(m=>m.id==='iron').value,11);
 assert.ok(validateProfile({...p,ageMonths:12}));
});
test('missing profile stays unknown; micronutrients only need age and sex',()=>{
 assert.equal(overviewNutrition({sex:'male',age:8,height:'',weight:'',activity:''}),null);
 assert.equal(lifeStageMicronutrients({sex:'male',age:8}).minerals.find(m=>m.id==='calcium').value,1000);
 assert.equal(lifeStageMicronutrients({sex:'female',age:17}).vitamins.find(v=>v.id==='a').value,700);
});
