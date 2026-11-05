import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ALL_FOODS,REFERENCE_FOODS,FOOD_BY_ID} from '../src/data/catalogue.js';
import {FOOD_PHOTO_CREDITS} from '../src/data/foodPhotos.js';
import {foodPhotoSearchTerm,foodPhotoSearchTerms,scorePage} from '../src/lib/foodPhotoResolver.js';

test('only food-ID-reviewed photographs are bound directly to food cards',async()=>{
 const pictured=ALL_FOODS.filter(food=>food.image);
 assert.equal(REFERENCE_FOODS.length,2300);
 assert.ok(pictured.length>=294,'The verified source/state bindings must be preserved');
 for(const food of pictured){assert.ok(food.image.startsWith('/assets/food-'));assert.ok(food.photoCatalogue||food.imageCredit.foodId===food.key);assert.ok(!food.imageCredit.familyReference);assert.ok(food.imageCredit.sourceUrl.startsWith('https://commons.wikimedia.org/'));assert.ok(food.imageCredit.author);assert.ok(/CC0|CC BY|Public domain|PDM/i.test(food.imageCredit.license));assert.ok(!/\bNC\b|\bND\b/.test(food.imageCredit.license));assert.ok(food.imageNote);}
 const paths=[...new Set(pictured.map(food=>food.image))];assert.ok(paths.length>100);
 for(const path of paths){const bytes=await readFile(new URL('..'+path,import.meta.url));assert.ok(bytes.length>1000);assert.ok(bytes[0]===255&&bytes[1]===216||bytes.subarray(1,4).toString()==='PNG'||bytes.subarray(0,4).toString()==='RIFF','Invalid image file: '+path);}
 assert.ok(FOOD_PHOTO_CREDITS.length>100);
});

test('online photo lookup follows the source food, not a broad or mistaken family label',()=>{
 assert.equal(foodPhotoSearchTerm(FOOD_BY_ID['usda-12087']),'raw Cashew nuts');
 assert.deepEqual(foodPhotoSearchTerms(FOOD_BY_ID['usda-12087']),['raw Cashew nuts'],'Raw foods must not fall back to a generic state');
 assert.equal(foodPhotoSearchTerm(FOOD_BY_ID['sr28-11167']),'raw Corn');
 assert.deepEqual(foodPhotoSearchTerms(FOOD_BY_ID['sr28-11167']),['raw Corn'],'Raw foods must not fall back to a generic state');
 assert.deepEqual(foodPhotoSearchTerms(FOOD_BY_ID['sr28-12088']),['cashew butter'],'A nut image must not be used for a cashew-butter entry');
 assert.equal(foodPhotoSearchTerm(FOOD_BY_ID['sr28-07020']),'corned beef');
 assert.match(FOOD_BY_ID['sr28-07020'].name,/牛肉/);
 assert.equal(FOOD_BY_ID['sr28-07020'].categoryName,'畜肉类及制品');
 assert.equal(FOOD_BY_ID['usda-12087'].image,null,'A generic nut-family picture must not masquerade as a cashew photo');
});

test('Commons candidate matching rejects the unrelated Lord Mayor event photo',()=>{
 const unrelated={title:'File:The Lord Mayor of Oxford, Councillor Colin Cook, speaks at "Biscuits means Biscuits" event.jpg'};
 assert.equal(scorePage(unrelated,'cooked biscuits'),-1);
 assert.equal(scorePage(unrelated,'biscuits'),-1);
 assert.ok(scorePage({title:'File:Cooked biscuits on a plate.jpg'},'cooked biscuits')>=0);
 assert.equal(scorePage({title:'File:Biscuits at a meeting.jpg'},'biscuits'),-1);
});

test('foods with a stated processing state do not fall back to generic photos',()=>{
 const biscuits={name:'饼干/司康类',source:{description:'BISCUITS,PLN OR BTTRMLK,FRZ,BKD'}};
 assert.deepEqual(foodPhotoSearchTerms(biscuits),['cooked biscuits']);
});
