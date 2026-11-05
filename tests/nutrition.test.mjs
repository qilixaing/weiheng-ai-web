import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateNutrition, getMicronutrients, getAgeBand, validateProfile } from '../src/lib/nutrition.js';

test('Mifflin examples use sex constants and unrounded TDEE', () => {
  const male=calculateNutrition({sex:'male',age:30,height:180,weight:80,activity:'moderate'});
  assert.equal(male.bmr,1780); assert.equal(male.tdee,2759);
  const female=calculateNutrition({sex:'female',age:30,height:165,weight:60,activity:'light'});
  assert.equal(female.bmr,1320.25); assert.equal(female.tdee,1815.34375);
  assert.ok(Math.abs(male.macros.reduce((sum,item)=>sum+item.grams*item.kcalPerGram,0)-male.tdee)<1e-8);
  assert.equal(male.macros.reduce((sum,item)=>sum+item.percent,0),100);
});
test('DRIs age and sex boundaries match adult 2023 tables', () => {
  const value=(age,sex,list,id)=>getMicronutrients({age,sex})[list].find(item=>item.id===id).value;
  assert.equal(value(29,'male','minerals','zinc'),12.5);
  assert.equal(value(30,'male','minerals','zinc'),12);
  assert.equal(value(49,'male','vitamins','a'),770);
  assert.equal(value(50,'male','vitamins','a'),750);
  assert.equal(value(50,'female','minerals','iron'),'10 / 18');
  assert.equal(value(64,'female','vitamins','d'),10);
  assert.equal(value(65,'female','vitamins','d'),15);
  assert.equal(value(74,'female','vitamins','a'),640);
  assert.equal(value(75,'female','vitamins','a'),600);
  assert.equal(value(75,'male','minerals','magnesium'),300);
  assert.equal(value(65,'female','minerals','calcium'),800);
});
test('Unsupported or invalid profile inputs do not produce targets', () => {
  assert.equal(calculateNutrition(null),null);
  const profile={sex:'male',age:30,height:180,weight:80,activity:'light'};
  for(const invalid of [{age:-1},{age:121},{age:30.5},{age:false},{age:[]},{height:NaN},{weight:0},{sex:'other'},{activity:'unknown'}]) assert.ok(validateProfile({...profile,...invalid}));
  for(const skipped of [{sex:''},{age:''},{height:''},{weight:''},{age:null}]) assert.equal(validateProfile({...profile,...skipped}), '');
  assert.equal(calculateNutrition({...profile,weight:''}), null);
  assert.equal(getAgeBand(''), '年龄未填写');
});
test('ages 0–120 can be saved; minors do not receive adult energy or DRI targets', () => {
  const profile={sex:'female',age:0,height:50,weight:3.5,activity:'sedentary'};
  for(const age of [0,'0',10,17]) {
    assert.equal(validateProfile({...profile,age}), '');
    assert.equal(calculateNutrition({...profile,age}), null);
    assert.deepEqual(getMicronutrients({...profile,age}), {vitamins:[],minerals:[]});
    assert.equal(getAgeBand(age), '未满 18 岁');
  }
  const oldest={...profile,age:120,height:160,weight:60};
  assert.equal(validateProfile(oldest), '');
  for(const age of [79,120])assert.equal(calculateNutrition({...oldest,age}),null);
  for(const age of [18,19,78])assert.ok(calculateNutrition({...oldest,age}));
});
