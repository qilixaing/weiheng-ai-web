import {FOOD_DATA_VERSION} from '../data/catalogue.js';
import storedEstimates from '../data/foodEstimates.js';
import {estimatePoint,pointRange} from './nutritionEstimate.js';

// Snapshots are per 100 g edible portion. AI may only supply missing macros;
// legacy intervals are normalized to one explicitly identified midpoint value.
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
  if(['energy','protein','carbs','fat'].includes(id)&&!Object.hasOwn(values,id)&&r&&number(r.low)&&number(r.high)&&r.low<=r.high&&r.high<=max){const point=pointRange(r,unit);if(point)ranges[id]=point;}
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
 if(compatible)for(const [id,r] of Object.entries(estimate.estimate?.values||{}))if(r?.unit===units[id]){const point=pointRange(r,units[id]);if(point)ranges[id]=point;}
 return normalizeSnapshot({schema:1,foodId:food.key,basisGrams:100,units,values:food.nutrients||{},ranges,dataVersion:FOOD_DATA_VERSION,capturedAt:new Date().toISOString(),source:food.source,
  estimate:{model:estimate?.model||estimate?.requestedModel,generatedAt:estimate?.generatedAt,assumption:estimate?.estimate?.assumption,recipe:estimate?.recipe}},food.key);
}
/**
 * Attach per-serving AI ranges to an analysis-only entry snapshot. The original
 * diary entry is never mutated, and estimates never replace database values.
 * @param {any} entry
 * @param {any} estimate
 * @param {any} [context]
 */
export function applyAiEstimateToEntry(entry,estimate,context={}){
 const grams=Number(entry?.grams),foodId=typeof entry?.foodId==='string'&&entry.foodId?entry.foodId:null;
 if(!Number.isFinite(grams)||grams<=0||!estimate?.values)return entry;
 const food=foodId?FOOD_BY_ID[foodId]:null,current=normalizeSnapshot(entry.nutritionSnapshot,foodId);
 // An unconfirmed historical sample must not contribute database values, but
 // an estimate based on its displayed name and confirmed portion is usable.
 const allowDatabase=entry.referenceConfirmed!==false;
 const values={...(allowDatabase?(current?.values||food?.nutrients||{}):{})};
 const ranges={...(current?.ranges||{})};let added=false;
 for(const id of ['energy','protein','carbs','fat']){
  const incoming=estimate.values[id],raw=estimatePoint(incoming,units[id]);
  if(!incoming||incoming.unit!==units[id]||raw===null||raw<0||Object.hasOwn(values,id)||Object.hasOwn(ranges,id))continue;
  const scale=100/grams,point=raw*scale,max=id==='energy'?950:100;
  if(!Number.isFinite(point)||point>max)continue;
  const normalized=pointRange({value:point},units[id]);if(!normalized)continue;
  ranges[id]=normalized;added=true;
 }
 if(!added)return entry;
 const snapshot=normalizeSnapshot({schema:1,foodId,basisGrams:100,units,values,ranges,
  dataVersion:current?.dataVersion||FOOD_DATA_VERSION,capturedAt:current?.capturedAt||new Date().toISOString(),
  source:allowDatabase?(current?.source||food?.source||null):null,
  estimate:{model:estimate.model||context.model||current?.estimate?.model,generatedAt:estimate.generatedAt||context.generatedAt||current?.estimate?.generatedAt,
   assumption:estimate.assumption||current?.estimate?.assumption,recipe:current?.estimate?.recipe}},foodId);
 return snapshot?{...entry,nutritionSnapshot:snapshot}:entry;
}
/** @param {any[]} entries @param {any[]} estimates @param {any} [context] */
export function applyAiEstimatesToEntries(entries,estimates,context={}){
 const byId=new Map(estimates.map(estimate=>[String(estimate.entryId),estimate]));
 return entries.map((entry,index)=>{const estimate=byId.get(String(index));return estimate?applyAiEstimateToEntry(entry,estimate,context):entry;});
}
export function entryNutrient(entry,food,id){
 const snapshot=normalizeSnapshot(entry.nutritionSnapshot,entry.foodId);
 if(snapshot)return entry.referenceConfirmed===false?{range:snapshot.ranges[id]}:{value:snapshot.values[id],range:snapshot.ranges[id]};
 if(entry.referenceConfirmed===false)return {};
 return {value:food?.nutrients?.[id]};
}
