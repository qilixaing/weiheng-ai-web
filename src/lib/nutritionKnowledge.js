import {DIET_PRINCIPLES, REFERENCE_TERMS, REFERENCES} from '../data/referenceRegistry.js';

const byId=Object.fromEntries(REFERENCES.map(reference=>[reference.id,reference]));

// These are short, locally reviewed summaries of the linked public references,
// not copied pages or model-generated facts. Food composition stays in catalogue.js.
const passages=[
  {
    id:'diet-principles',referenceId:'guidelines-2022',
    terms:['膳食指南','膳食搭配','营养搭配','合理搭配','均衡饮食','健康饮食','饮食建议','下一餐','一周食谱','食物多样','蔬果','全谷'],
    summary:'公开八条膳食准则的本地整理：'+DIET_PRINCIPLES.join('；')+'。这些是一般搭配原则，不是个体治疗处方。',
  },
  {
    id:'reference-terms',referenceId:'dri-2023',
    terms:['营养参考值','参考摄入量','参考值','膳食营养素','推荐摄入量','平均需要量','适宜摄入量','可耐受最高摄入量','ear','rni','ul'],
    summary:'参考量术语的本地整理：'+REFERENCE_TERMS.map(([code,name,note])=>`${code}（${name}）：${note}`).join('；'),
  },
  {
    id:'resting-energy',referenceId:'mifflin',
    terms:['基础代谢','静息能量','mifflin','bmr','能量需求','热量需求','活动系数'],
    summary:'Mifflin–St Jeor 用于预测静息能量，结果是公式估算，不是身体检测；原研究对象为19—78岁。每日能量需求还涉及活动水平，不能将该论文说成直接测得个人需求。',
  },
];

export function retrieveNutritionKnowledge(question,{limit=3}={}){
  const query=String(question||'').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'').slice(0,600);
  if(!query)return[];
  return passages.map(passage=>{
    const hits=passage.terms.filter(term=>query.includes(term.toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'')));
    return{passage,hits,score:hits.reduce((sum,term)=>sum+Math.min(term.length,6),0)};
  }).filter(row=>row.hits.length).sort((a,b)=>b.score-a.score||a.passage.id.localeCompare(b.passage.id)).slice(0,Math.max(0,Math.min(3,limit))).map(({passage})=>{
    const source=byId[passage.referenceId];
    return{id:passage.id,title:source.title,version:source.version,url:source.url,summary:passage.summary,kind:'本地整理摘要'};
  });
}
