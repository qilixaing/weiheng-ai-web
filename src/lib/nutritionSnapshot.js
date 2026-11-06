import {FOOD_DATA_VERSION} from '../data/catalogue.js';
import storedEstimates from '../data/foodEstimates.js';

// Snapshots are per 100 g edible portion. AI may only supply missing macros.
const units={energy:'kcal',protein:'g',carbs:'g',fat:'g',fiber:'g',water:'g',cholesterol:'mg',vitaminA:'μg RAE',vitaminC:'mg',vitaminD:'μg',vitaminE:'mg',vitaminK:'μg',b1:'mg',b2:'mg',b6:'mg',b12:'μg',folate:'μg DFE',calcium:'mg',iron:'mg',magnesium:'mg',phosphorus:'mg',potassium:'mg',sodium:'mg',zinc:'mg',copper:'mg',manganese:'mg',selenium:'μg',iodine:'μg'};
const text=(s,n=800)=>typeof s==='string'?s.slice(0,n):'';
const number=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=100000;
export function normalizeSnapshot(input,foodId){
 if(!input||input.schema!==1||input.foodId!==foodId||input.basisGrams!==100)return null;
 const values={},ranges={};
 for(const [id,unit] of Object.entries(units)){
  if(input.units?.[id]!==unit)continue;
  if(number(input.values?.[id]))values[id]=input.values[id];
  const r=input.ranges?.[id],max=id==='energy'?950:100;
  if(['energy','protein','carbs','fat'].includes(id)&&!Object.hasOwn(values,id)&&r&&number(r.low)&&number(r.high)&&r.low<r.high&&r.high<=max)ranges[id]={low:r.low,high:r.high};
 }
 return {schema:1,foodId,basisGrams:100,units:{...units},values,ranges,
  dataType:Object.keys(ranges).length?'ai-estimate':'database',dataVersion:text(input.dataVersion,100),capturedAt:text(input.capturedAt,60),
  source:input.source?{id:text(input.source.id,100),name:text(input.source.name,200),url:text(input.source.url,500),version:text(input.source.version,100),description:text(input.source.description),license:text(input.source.license,150)}:null,
  estimate:Object.keys(ranges).length?{model:text(input.estimate?.model,100),generatedAt:text(input.estimate?.generatedAt,60),assumption:text(input.estimate?.assumption),recipe:text(input.estimate?.recipe)}:null};
}
export function createNutritionSnapshot(food,estimate){
 if(!food?.key)return null;
 if(food.__summary)throw new Error('请先读取完整食物资料，再添加记录。');
 if(estimate===undefined){const row=storedEstimates.estimates?.[food.key];if(row)estimate={foodId:food.key,basisGrams:100,model:row.model,generatedAt:row.generatedAt,estimate:row};}
 const compatible=estimate?.foodId===food.key&&estimate.basisGrams===100;
 const ranges={};
 if(compatible)for(const [id,r] of Object.entries(estimate.estimate?.values||{}))if(r?.unit===units[id])ranges[id]=r;
 return normalizeSnapshot({schema:1,foodId:food.key,basisGrams:100,units,values:food.nutrients||{},ranges,dataVersion:FOOD_DATA_VERSION,capturedAt:new Date().toISOString(),source:food.source,
  estimate:{model:estimate?.model||estimate?.requestedModel,generatedAt:estimate?.generatedAt,assumption:estimate?.estimate?.assumption,recipe:estimate?.recipe}},food.key);
}
export function entryNutrient(entry,food,id){
 if(entry.referenceConfirmed===false)return {};
 const snapshot=normalizeSnapshot(entry.nutritionSnapshot,entry.foodId);
 if(snapshot)return {value:snapshot.values[id],range:snapshot.ranges[id]};
 return {value:food?.nutrients?.[id]};
}
