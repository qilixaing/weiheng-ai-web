import {calculateIntake,recordEntries,NUTRIENTS} from './foodNutrition.js';
import {overviewNutrition,lifeStageMicronutrients} from './lifeStageNutrition.js';
const ids={a:'vitaminA',c:'vitaminC',d:'vitaminD',e:'vitaminE',k:'vitaminK'};
export function referenceMap(profile){
 const energy=overviewNutrition(profile),micro=lifeStageMicronutrients(profile),result={};
 if(energy){result.energy={value:energy.tdee,unit:'kcal',kind:energy.referenceOnly?'年龄组参考':'个人估算',source:energy.energyBasis||energy.bmrLabel};for(const m of energy.macros)if(typeof m.grams==='number')result[m.id]={value:m.grams,unit:'g',kind:energy.referenceOnly?'年龄组搭配参考':'搭配示例'};}
 for(const item of [...micro.vitamins,...micro.minerals])if(typeof item.value==='number')result[ids[item.id]||item.id]={...item};
 return result;
}
export function nutrientRows(entries,profile){
 const intake=calculateIntake(entries),refs=referenceMap(profile);
 return NUTRIENTS.map(metric=>{const total=intake.totals[metric.id],ref=refs[metric.id];
 // Vitamin E database α-tocopherol is not interchangeable with α-TE.
 const comparable=!!ref&&ref.unit===metric.unit&&metric.id!=='vitaminE'&&!ref.kind?.startsWith('年龄组');
 return {...metric,...total,reference:ref,ratio:comparable&&total.complete&&!total.range&&typeof total.value==='number'?total.value/ref.value:null};});
}
export function intakeTrend(records,endDate,days=7){
 const end=new Date(endDate+'T12:00:00Z');if(!Number.isFinite(+end))return [];
 return Array.from({length:days},(_,i)=>{const d=new Date(end);d.setUTCDate(d.getUTCDate()-days+1+i);const date=d.toISOString().slice(0,10),record=records.find(r=>r.date===date),entries=recordEntries(record);return {date,recorded:entries.length>0,...calculateIntake(entries)};});
}
export function interpretation(row){
 if(row.range)return row.complete?'含AI估算范围；不作精确比例比较':'含AI估算，仍有未知项';
 if(row.value==null)return '暂无可计算数据';
 if(!row.complete)return `仅已知小计；${row.missing.length}项缺少该指标，无法比较`;
 if(!row.reference)return '暂无匹配参考；不判断不足';
 if(row.ratio==null)return '数据口径不可直接比较';
 if(row.reference.kind==='AI'&&row.ratio<1)return '低于AI不能据此判断不足';
 return '记录内摄入对照，不代表营养状态或缺乏诊断';
}
