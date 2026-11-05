// Shared, deterministic boundaries for untrusted campus-meal inputs.
import { FOOD_BY_ID, normalizeSearch } from '../data/catalogue.js';

const families = [
 ['花生','peanut','peanuts','groundnut'], ['奶','牛奶','乳','乳制品','奶制品','dairy','milk','cheese','yogurt','yoghurt','cream','butter'],
 ['蛋','鸡蛋','egg','eggs'], ['海鲜','seafood','鱼虾蟹贝','鱼','虾','蟹','贝','fish','shrimp','prawn','crab','clam','oyster','salmon','tuna','cod','squid','mussel'],
 ['肉类','肉','牛肉','猪肉','鸡肉','羊肉','禽','beef','pork','chicken','lamb','turkey','duck','meat'],
 ['香菜','coriander','cilantro'], ['大豆','豆制品','soy','tofu'], ['小麦','wheat'], ['坚果','nuts','almond','walnut','cashew','pecan','pistachio','hazelnut'],
];
const text = (v, max=300) => typeof v === 'string' ? v.trim().slice(0,max) : '';
export function normalizeMealConditions(input={}) {
 if(!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('就餐条件格式不正确。');
 const budget=input.budget===null||input.budget===undefined||input.budget===''?null:Number(input.budget);
 if(budget!==null&&(!Number.isFinite(budget)||budget<=0||budget>1000))throw new Error('预算需为0以上、1000元以内。');
 const avoids=(Array.isArray(input.avoids)?input.avoids.join('、'):text(input.avoids)).split(/[,，、;；\n]+/).map(x=>x.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/,'').trim()).filter(Boolean);
 if(avoids.length>12||avoids.some(x=>x.length>30))throw new Error('回避项最多12项，每项不超过30字。');
 const values=input.availableFoods??[];
 if(!Array.isArray(values)||values.length>12)throw new Error('可选食物最多12项。');
 const availableFoods=values.map(item=>{
  const food=FOOD_BY_ID[item?.foodId],grams=Number(item?.grams),price=item?.price===null||item?.price===undefined||item?.price===''?null:Number(item.price);
  if(!food||!Number.isFinite(grams)||grams<0.1||grams>5000||price!==null&&(!Number.isFinite(price)||price<0||price>1000))throw new Error('请核对可选食物、份量和价格。');
  return{foodId:food.key,name:food.name,grams,price};
 });
 if(new Set(availableFoods.map(x=>x.foodId)).size!==availableFoods.length)throw new Error('可选食物不能重复，请修改已有条目的份量。');
 return {budget,avoids:[...new Set(avoids)],preferences:text(input.preferences,200),exercise:text(input.exercise,200),availableFoods,onlyAvailable:availableFoods.length>0&&input.onlyAvailable!==false};
}
export function foodConflicts(food,avoids=[]) {
 const original=[food?.name,food?.source?.description,...(food?.aliases||[])].join(' ').toLowerCase(),haystack=normalizeSearch(original);
 return avoids.filter(avoid=>{
  const terms=new Set([avoid]);
  for(const family of families)if(family.some(term=>normalizeSearch(term)===normalizeSearch(avoid)))for(const term of family)terms.add(term);
  return [...terms].some(term=>/^[a-z ]+$/i.test(term)?new RegExp('\\b'+term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'s?\\b','i').test(original):haystack.includes(normalizeSearch(term)));
 });
}
export function allowedMealFood(food,conditions) {
 return !!food&&!['13','17'].includes(food.category)&&!foodConflicts(food,conditions.avoids).length&&(!conditions.onlyAvailable||conditions.availableFoods.some(x=>x.foodId===food.key));
}
export function calculateMealCost(items,conditions) {
 const breakdown=items.map(item=>{
  const entry=conditions.availableFoods.find(x=>x.foodId===item.foodId);
  const cost=entry?.price!=null?Math.round(entry.price*item.grams/entry.grams*100)/100:null;
  return{foodId:item.foodId,cost,priceBasis:entry?.price!=null?{price:entry.price,grams:entry.grams}:null};
 });
 const complete=breakdown.every(x=>x.cost!==null),knownSubtotal=Math.round(breakdown.reduce((n,x)=>n+(x.cost??0),0)*100)/100;
 return {currency:'CNY',budget:conditions.budget,complete,knownSubtotal,total:complete?knownSubtotal:null,status:!complete?'unknown':conditions.budget===null?'no_budget':knownSubtotal>conditions.budget?'over_budget':'within_budget',breakdown,basis:'按用户录入的份量价格等比例估算；不是食堂报价或实际结算价',availability:conditions.onlyAvailable?'仅使用本次用户提供的食物，售卖及配料仍需核对':'未提供完整食堂菜单，不保证食堂有售'};
}
