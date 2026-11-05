import {FOOD_BY_ID} from '../data/catalogue.js';
import {validDate,todayDate} from './foodNutrition.js';
export function appendPlanToDraft(draft,payload){
 if(!payload||!validDate(payload.date)||payload.date>todayDate()||!['breakfast','lunch','dinner','snack','unspecified'].includes(payload.meal)||!Array.isArray(payload.items)||!payload.items.length||payload.items.length>8)throw new Error('请核对方案日期、餐次和食物列表。');
 const batch=String(payload.confirmationId||'').slice(0,100);if(!batch)throw new Error('方案缺少确认编号，请重新生成。');
 if(draft.appliedBatches?.includes(batch))return{draft,duplicate:true};
 const items=payload.items.map(item=>{const food=FOOD_BY_ID[item.foodId],grams=Number(item.grams);if(!food||!Number.isFinite(grams)||grams<0.1||grams>5000)throw new Error('方案含无效食物或克数，未加入记录。');return{id:batch+':'+food.key,foodId:food.key,name:food.name,grams,meal:payload.meal,group:food.group,source:'catalogue',estimated:true,referenceConfirmed:true};});
 if(new Set(items.map(x=>x.foodId)).size!==items.length)throw new Error('方案含重复食物，未加入记录。');
 return{draft:{...draft,entries:[...(draft.entries||[]),...items],appliedBatches:[...(draft.appliedBatches||[]),batch]},duplicate:false};
}
