import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import expanded from '../src/data/food-expanded.json' with {type:'json'};
import summary from '../docs/food-data/expanded-import.json' with {type:'json'};
import {ALL_FOODS,FOOD_BY_ID,rankFoods} from '../src/data/catalogue.js';
test('all expanded nutrients reproduce original SR28 fields exactly, including missing values',async()=>{
 const bytes=await readFile(new URL('../docs/food-data/raw/ABBREV.txt',import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),summary.sha256);
 const raw=new Map(bytes.toString('latin1').split(/\r?\n/).filter(Boolean).map(line=>{const row=line.split('^').map(x=>x.replace(/^~|~$/g,''));return[row[0],row];}));
 assert.ok(expanded.length>=1000);const ids=new Set();
 for(const item of expanded){assert.ok(!ids.has(item.source.id));ids.add(item.source.id);const row=raw.get(item.source.id);assert.ok(row);assert.equal(item.source.description,row[1]);assert.ok(item.name.includes(row[1]));for(const[key,col]of Object.entries(summary.nutrientColumns))assert.equal(item.nutrients[key],row[col].trim()===''?null:Number(row[col]));}
 assert.equal(new Set(ALL_FOODS.filter(x=>x.source).map(x=>x.source.id)).size,ALL_FOODS.filter(x=>x.source).length);
});
test('expanded processed variants never displace known raw aliases and recipe-only foods stay unknown',()=>{
 assert.equal(rankFoods('香蕉')[0].food.key,'banana');assert.equal(FOOD_BY_ID.banana.nutrients.energy,89);
 assert.equal(rankFoods('苹果')[0].food.key,'apple');
 for(const item of ALL_FOODS.filter(x=>x.key.startsWith('campus-'))){assert.equal(item.source,null);assert.deepEqual(item.nutrients,{});assert.match(item.state,/配方/);}
});
