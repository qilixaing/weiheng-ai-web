import test from 'node:test';
import assert from 'node:assert/strict';
import {ALL_FOODS,FOOD_BY_ID,rankFoods,searchFoods,findMentionedFoods} from '../src/data/catalogue.js';
import {FOOD_CATEGORIES} from '../src/data/foodCategories.js';
import {portion,calculateIntake,makeRecord,recordEntries,recordVersion,analysisVersion,normalizeEntries,formatNutrient,validDate} from '../src/lib/foodNutrition.js';
test('sourced catalogue spans all 20 categories with unique IDs, aliases and genuine nulls',()=>{
 assert.equal(new Set(ALL_FOODS.map(f=>f.key)).size,ALL_FOODS.length);
 const sourced=ALL_FOODS.filter(f=>f.source);assert.ok(sourced.length>=1000);assert.equal(sourced.filter(f=>!f.expanded).length,146);
 for(const category of FOOD_CATEGORIES)assert.ok(sourced.some(f=>f.category===category.id));
 assert.ok(searchFoods('西红柿').some(f=>f.key==='tomato'));
 assert.ok(searchFoods('banan').some(f=>f.key==='banana'));
 assert.equal(searchFoods('香蕉')[0].key,'banana');assert.ok(searchFoods('香蕉').length>1);
 assert.ok(findMentionedFoods('100克香蕉热量是多少').some(f=>f.key==='banana'));
 assert.equal(FOOD_BY_ID['hami-melon'].source,null);
 assert.ok(sourced.some(f=>Object.values(f.nutrients).some(n=>n===null)));
});
test('common-food records preserve sample state, source provenance and unknown nutrient values',()=>{
 const napa=FOOD_BY_ID.cabbage,boiled=FOOD_BY_ID['usda-11120'],egg=FOOD_BY_ID['usda-01129'];
 for(const food of [napa,boiled,egg]){
  assert.equal(typeof food.state,'string');assert.ok(food.state.length>0);
  assert.equal(typeof food.source.id,'string');assert.equal(typeof food.source.version,'string');
  assert.equal(typeof food.source.url,'string');assert.equal(food.basis,'每 100 克可食部');
 }
 assert.match(napa.state,/生/);assert.match(boiled.state,/水煮/);assert.match(egg.state,/水煮/);
 assert.ok(napa.aliases.includes('白菜'));
 assert.ok(ALL_FOODS.some(food=>Object.values(food.nutrients).some(value=>value===null)));
});
test('白菜 matches Chinese pe-tsai, separately from pak-choi and round cabbage',()=>{
 const raw=FOOD_BY_ID.cabbage,cooked=FOOD_BY_ID['usda-11120'],bok=FOOD_BY_ID['usda-11116'];
 assert.equal(raw.source.id,'11119');assert.equal(raw.nutrients.energy,16);assert.equal(raw.nutrients.protein,1.2);assert.equal(raw.nutrients.carbs,3.23);assert.equal(raw.nutrients.fat,.2);
 assert.equal(cooked.nutrients.energy,14);assert.equal(bok.nutrients.energy,13);
 assert.equal(FOOD_BY_ID['usda-11109'].nutrients.energy,25);
 assert.equal(searchFoods('白菜')[0].key,'cabbage');assert.equal(portion(raw,200).energy,32);
});
test('RAG ranking marks exact aliases, broad matches, misspellings, similar foods and empty results',()=>{
 const cabbage=rankFoods('白菜');
 assert.equal(cabbage[0].food.key,'cabbage');assert.equal(cabbage[0].match,'exact_alias');
 assert.deepEqual(rankFoods('面条').filter(item=>!item.food.photoCatalogue).slice(0,2).map(item=>[item.food.key,item.match]),[['noodles','exact_name'],['usda-20117','exact_alias']]);
 assert.ok(cabbage.some(item=>item.food.key==='usda-11120'&&item.match==='name_contains'));
 assert.equal(rankFoods('bananaa')[0].food.key,'banana');assert.equal(rankFoods('bananaa')[0].match,'fuzzy');
 assert.ok(searchFoods('苹果').length>1);
 assert.equal(rankFoods('完全不存在的食物').length,0);
});
test('edible grams scale source values once; unknowns stay unknown and genuine zero stays zero',()=>{
 const banana=FOOD_BY_ID.banana;assert.equal(banana.nutrients.energy,89);
 assert.equal(portion(banana,150).energy,133.5);
 const intake=calculateIntake([{foodId:'banana',grams:150},{name:'未知菜式',grams:200}]);
 assert.equal(intake.totals.energy.value,133.5);assert.equal(intake.totals.energy.complete,false);assert.deepEqual(intake.totals.energy.missing,['未知菜式']);
 assert.equal(calculateIntake([{name:'未知菜式',grams:200}]).totals.energy.value,null);
 assert.equal(portion({nutrients:{energy:0}},50).energy,0);
 assert.equal(formatNutrient(null),'暂无数据');assert.equal(formatNutrient(0),'0');
});
test('entries are canonical and legacy ambiguous samples never silently contribute nutrients',()=>{
 assert.equal(normalizeEntries([{foodId:'banana',grams:.01}]).length,0);
 const old=recordEntries({grams:{banana:150},customFoods:[{name:'自制菜',grams:200}]});assert.equal(old.length,2);assert.equal(old[0].referenceConfirmed,false);assert.equal(calculateIntake(old).totals.energy.value,null);
 const record=makeRecord({date:'2026-10-30',entries:[{foodId:'banana',grams:150,meal:'breakfast'}],notes:'原备注'});
 assert.equal(record.grams.banana,150);assert.equal(recordEntries(record).length,1);assert.equal(calculateIntake(recordEntries(record)).totals.energy.value,133.5);
 assert.equal(recordVersion({...record,updatedAt:'different'}),recordVersion(record));
 assert.notEqual(recordVersion({...record,entries:[{...record.entries[0],grams:160}]}),recordVersion(record));
 const profile={sex:'male',age:30,height:175,weight:65,activity:'light'};
 assert.notEqual(analysisVersion(record,profile),analysisVersion(record,{...profile,weight:66}));
 assert.equal(validDate('2026-02-30'),false);assert.equal(validDate('2026-10-30'),true);
});
