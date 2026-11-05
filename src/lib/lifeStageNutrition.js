// Display references only. These pediatric / older-age estimates are deliberately
// not passed as personalized targets to meal planning or AI clinical assessment.
import reference from '../data/life-stage-references.json' with { type: 'json' };
import { ACTIVITIES, calculateNutrition, getMicronutrients, validateProfile } from './nutrition.js';
export const LIFE_STAGE_SOURCE = 'https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/equations-estimate-energy-requirement.html';
export const SCHOFIELD_SOURCE = 'https://www.fao.org/4/y5686e/y5686e07.htm';
const supplied = n => n !== '' && n != null && Number.isFinite(Number(n));
const vitaminInfo=[['a','维生素 A','μg RAE'],['d','维生素 D','μg'],['e','维生素 E','mg α-TE'],['k','维生素 K','μg'],['b1','维生素 B₁','mg'],['b2','维生素 B₂','mg'],['b6','维生素 B₆','mg'],['b12','维生素 B₁₂','μg'],['folate','叶酸','μg DFE'],['c','维生素 C','mg']];
const mineralInfo=[['calcium','钙','mg'],['iron','铁','mg'],['zinc','锌','mg'],['magnesium','镁','mg'],['potassium','钾','mg'],['phosphorus','磷','mg'],['selenium','硒','μg'],['iodine','碘','μg']];
export function lifeStageMicronutrients(profile) {
 if(!supplied(profile?.age)||!['male','female'].includes(profile.sex))return {vitamins:[],minerals:[]};
 if(validateProfile(profile)||(profile.physiologicalStage&&profile.physiologicalStage!=='general'))return {vitamins:[],minerals:[]};
 const age=Number(profile.age), month=profile.ageMonths;
 if(age===0&&!supplied(month))return {vitamins:[],minerals:[]};
 if(age>=18)return getMicronutrients(profile);
 const unknownMonth=age===0&&!supplied(month);
 const index=age===0?(Number(month)>=6?1:0):age<4?2:age<9?3:age<14?(profile.sex==='male'?4:6):(profile.sex==='male'?5:7);
 const data=reference.rows[index];
 const group=(key,info)=>info.map(([id,name,unit],i)=>({id,name,unit,
  value:unknownMonth?`0–<6月 ${reference.rows[0][key][i]}；6–<12月 ${reference.rows[1][key][i]}`:data[key][i],
  kind:unknownMonth?'AI / RDA':age===0?(index===0||key==='vitamins'||['calcium','magnesium','potassium','phosphorus','selenium','iodine'].includes(id)?'AI':'RDA'):['e','k','potassium'].includes(id)?(id==='e'?'RDA':'AI'):'RDA',
  note:'Health Canada / NASEM 膳食参考量；不是中国 DRIs 表，也不是补充剂剂量。'}));
 return {vitamins:group('vitamins',vitaminInfo),minerals:group('minerals',mineralInfo)};
}
function resting(age,male,w) {
 const [a,b]=age<3?(male?[59.512,-30.4]:[58.317,-31.1]):age<10?(male?[22.706,504.3]:[20.315,485.9]):age<18?(male?[17.686,658.2]:[13.384,692.6]):(male?[11.711,587.7]:[9.082,658.5]);
 return a*w+b;
}
function pediatricEnergy(age,male,h,w,activity,month) {
 const y=age===0?month/12:age;
 if(age<3){
  const growth=age===0?(month<3?(male?200:180):month<6?(male?50:60):20):(male?20:15);
  return male?-716.45-y+17.82*h+15.06*w+growth:-69.15+80*y+2.65*h+54.15*w+growth;
 }
 const i=ACTIVITIES.findIndex(a=>a.key===activity);
 const row=(male?[[-447.51,3.68,13.01,13.15],[19.12,3.68,8.62,20.28],[-388.19,3.68,12.66,20.46],[-671.75,3.68,15.38,23.25]]:[[55.59,-22.25,8.43,17.07],[-297.54,-22.25,12.77,14.73],[-189.55,-22.25,11.74,18.34],[-709.59,-22.25,18.22,14.25]])[i];
 const growth=age<4?(male?20:15):age<9?15:age<14?(male?25:30):20;
 return row[0]+row[1]*y+row[2]*h+row[3]*w+growth;
}
export function overviewNutrition(profile) {
 if(!profile||(profile.physiologicalStage&&profile.physiologicalStage!=='general')||(Number(profile.age)===0&&!supplied(profile.ageMonths)))return null;
 const adult=calculateNutrition(profile);
 if(adult)return {...adult,bmrLabel:'Mifflin–St Jeor 公式',energyLabel:'TDEE',microSource:'中国 DRIs 2023',macroNote:`供能占比合计 100% · 蛋白质 DRIs RNI ${adult.proteinRni} g/天作为独立参考。`};
 if(validateProfile(profile)||!profile?.sex||!supplied(profile.age)||!supplied(profile.height)||!supplied(profile.weight))return null;
 const age=Number(profile.age), male=profile.sex==='male',w=Number(profile.weight),h=Number(profile.height);
 const activity=ACTIVITIES.find(a=>a.key===profile.activity);
 if(!activity&&age>=3)return null;
 const bmr=resting(age,male,w), infant=age===0, unknownMonth=infant&&!supplied(profile.ageMonths);
 const range=unknownMonth?Array.from({length:12},(_,m)=>pediatricEnergy(age,male,h,w,profile.activity,m)):null;
 const tdee=unknownMonth?null:age<18?pediatricEnergy(age,male,h,w,profile.activity,Number(profile.ageMonths)):bmr*activity.factor;
 if(bmr<=0||(tdee!=null&&tdee<=0)||(range&&range.some(x=>x<=0)))return null;
 const ratios=age<4?[15,35,50]:age<18?[15,30,55]:[20,25,55];
 const specs=[['protein','蛋白质',4,'sage'],['fat','脂肪',9,'sand'],['carbs','碳水化合物',4,'lilac']];
 const infantValues=Number(profile.ageMonths)>=6?[11,30,95]:[9.1,31,60];
 const macros=specs.map(([id,name,kcalPerGram,color],i)=>({id,name,kcalPerGram,color,percent:infant?null:ratios[i],grams:infant?(unknownMonth?['9.1–11','30–31','60–95'][i]:infantValues[i]):tdee*ratios[i]/100/kcalPerGram,foods:infant?'年龄段膳食参考量，包含乳汁与辅食；不用于配奶。':'按年龄段 AMDR 内示例比例换算，非个体处方。'}));
 return {bmr,tdee,energyRange:range?[Math.min(...range),Math.max(...range)]:null,activity,macros,...lifeStageMicronutrients(profile),referenceOnly:true,
  bmrLabel:'Schofield 年龄分组公式',energyLabel:age<18?'EER':'TDEE',microSource:age<18?'Health Canada / NASEM RDA、AI':'中国 DRIs 2023',
  energyBasis:age<18?'Health Canada 2023 年龄分组能量公式（包含生长需求）':`Schofield 60岁及以上组 × ${activity.factor}；高龄外推估算`,
  macroNote:infant?'婴儿显示各阶段 AI / RDA 表值，不按成人供能比换算；各范围不是同一个月龄的配餐组合。':`供能示例：蛋白质 ${ratios[0]}% / 脂肪 ${ratios[1]}% / 碳水 ${ratios[2]}%。`,
  notice:infant?(unknownMonth?'0岁跨越多个生长阶段：显示月龄范围，请补充月龄。婴儿喂养由监护人与儿科专业人员确认，不用于配奶或喂养处方。':'婴儿估算只用于认识参考范围，不用于配奶、早产儿或疾病喂养处方。'):age<18?'儿童与青少年使用生长阶段公式；活动分组为近似对应。请结合生长曲线由监护人和专业人员确认，不用于限制热量或成人减重。':'超过78岁使用60岁及以上组作粗略外推，不代表已在百岁人群验证；实际需要应由专业人员结合健康状况评估。',
 };
}
