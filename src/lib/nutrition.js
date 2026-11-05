// All calculations are browser-local. Values are estimates, never lab results.
// Mifflin–St Jeor (simplified): https://pubmed.ncbi.nlm.nih.gov/2305711/
// Adult DRIs (2023), Chinese Nutrition Society, tables 9–14 and 20–23:
// https://www.cnsoc.org/drpostand/ and /drpostand/page2.html
export const ACTIVITIES = [
  { key: 'sedentary', label: '久坐', factor: 1.2, detail: '大部分时间坐着，很少运动', icon: 'chair' },
  { key: 'light', label: '轻度活动', factor: 1.375, detail: '日常走动，每周轻度运动 1–3 天', icon: 'walk' },
  { key: 'moderate', label: '中度活动', factor: 1.55, detail: '每周中等强度运动 3–5 天', icon: 'activity' },
  { key: 'heavy', label: '重度活动', factor: 1.725, detail: '体力工作或每周高强度运动 6–7 天', icon: 'sun' }
];
export const DRI_SOURCE = 'https://www.cnsoc.org/drpostand/';
export const FORMULA_SOURCE = 'https://pubmed.ncbi.nlm.nih.gov/2305711/';

export function profileBodyLimits(age) {
  if (!numericInput(age)) return { height: [30, 250], weight: [1, 300] };
  return Number(age) < 18 ? { height: [30, 250], weight: [1, 300] } : { height: [100, 250], weight: [25, 300] };
}
const numericInput = value => (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '')) && Number.isFinite(Number(value));
const hasInput = value => value !== undefined && value !== null && !(typeof value === 'string' && value.trim() === '');

export function validateProfile(profile) {
  if (!profile || typeof profile !== 'object') return '档案格式不正确';
  if (profile?.sex !== undefined && profile.sex !== '' && !['male', 'female'].includes(profile.sex)) return '请选择有效的生理性别';
  if (hasInput(profile.age) && (!numericInput(profile.age) || !Number.isInteger(Number(profile.age)) || Number(profile.age) < 0 || Number(profile.age) > 120)) return '请输入 0–120 岁的整数年龄';
  if (hasInput(profile.physiologicalStage) && !['general','pregnant','lactating','special'].includes(profile.physiologicalStage)) return '请选择有效的生理阶段';
  const limits = profileBodyLimits(profile.age);
  if (hasInput(profile.ageMonths) && (!numericInput(profile.ageMonths) || !Number.isInteger(Number(profile.ageMonths)) || Number(profile.ageMonths) < 0 || Number(profile.ageMonths) > 11)) return '请输入 0–11 的整数月龄';
  if (hasInput(profile.height) && (!numericInput(profile.height) || Number(profile.height) < limits.height[0] || Number(profile.height) > limits.height[1])) return `请输入 ${limits.height[0]}–${limits.height[1]} cm 的身高`;
  if (hasInput(profile.weight) && (!numericInput(profile.weight) || Number(profile.weight) < limits.weight[0] || Number(profile.weight) > limits.weight[1])) return `请输入 ${limits.weight[0]}–${limits.weight[1]} kg 的体重`;
  if (hasInput(profile.activity) && !ACTIVITIES.some(item => item.key === profile.activity)) return '请选择有效的每日活动水平';
  return '';
}

export function getAgeBand(age) {
  if (!numericInput(age)) return '年龄未填写';
  const years = Number(age);
  return years < 18 ? '未满 18 岁' : years < 30 ? '18–29 岁' : years < 50 ? '30–49 岁' : years < 65 ? '50–64 岁' : years < 75 ? '65–74 岁' : '75 岁及以上';
}

// These are RNI / AI dietary reference values, not supplement doses or ULs.
// Some values differ from DRIs 2013: e.g. adult calcium remains 800 mg in these 2023 tables.
export function getMicronutrients(profile) {
  const age = Number(profile?.age), male = profile?.sex === 'male';
  if (!numericInput(profile?.age) || age < 18 || !profile?.sex) return { vitamins: [], minerals: [] };
  const row = (id, name, value, unit, kind = 'RNI', note = '') => ({ id, name, value, unit, kind, note });
  const vitaminA = age < 50 ? (male ? 770 : 660) : age < 65 ? (male ? 750 : 660) : age < 75 ? (male ? 730 : 640) : (male ? 710 : 600);
  const vitamins = [
    row('a', '维生素 A', vitaminA, 'μg RAE'),
    row('d', '维生素 D', age >= 65 ? 15 : 10, 'μg'),
    row('e', '维生素 E', 14, 'mg α-TE', 'AI'),
    row('k', '维生素 K', 80, 'μg', 'AI'),
    row('b1', '维生素 B₁', male ? 1.4 : 1.2, 'mg'),
    row('b2', '维生素 B₂', male ? 1.4 : 1.2, 'mg'),
    row('b6', '维生素 B₆', age >= 50 ? 1.6 : 1.4, 'mg'),
    row('b12', '维生素 B₁₂', 2.4, 'μg'),
    row('folate', '叶酸', 400, 'μg DFE'),
    row('c', '维生素 C', 100, 'mg')
  ];
  const iron = male ? 12 : age < 50 ? 18 : age < 65 ? '10 / 18' : 10;
  const minerals = [
    row('calcium', '钙', 800, 'mg'),
    row('iron', '铁', iron, 'mg', 'RNI', !male && age >= 50 && age < 65 ? '50–64 岁女性：无月经 10 mg，有月经 18 mg；不只按年龄推定。' : ''),
    row('zinc', '锌', male ? (age < 30 ? 12.5 : 12) : 8.5, 'mg'),
    row('magnesium', '镁', age < 30 ? 330 : age < 65 ? 320 : age < 75 ? 310 : 300, 'mg'),
    row('potassium', '钾', 2000, 'mg', 'AI'),
    row('phosphorus', '磷', age < 30 ? 720 : age < 65 ? 710 : 680, 'mg'),
    row('selenium', '硒', 60, 'μg'),
    row('iodine', '碘', 120, 'μg')
  ];
  return { vitamins, minerals };
}

export function calculateNutrition(profile) {
  if (profile?.physiologicalStage && profile.physiologicalStage !== 'general') return null;
  if (validateProfile(profile) || !profile.sex || !numericInput(profile.age) || !numericInput(profile.height) || !numericInput(profile.weight) || Number(profile.age) < 18 || Number(profile.age) > 78) return null;
  const weight = Number(profile.weight), height = Number(profile.height), age = Number(profile.age);
  const activity = ACTIVITIES.find(item => item.key === profile.activity);
  if (!activity) return null;
  const bmr = 10 * weight + 6.25 * height - 5 * age + (profile.sex === 'male' ? 5 : -161);
  const tdee = bmr * activity.factor;
  // Example energy distribution within adult 2023 AMDR ranges.
  // Adults <65: protein 10–20%, fat 20–30%, carbohydrate 50–65%.
  // Adults >=65: protein 15–20%. Select 20/25/55 for this group.
  const ratios = age >= 65 ? [20, 25, 55] : [15, 25, 60];
  const macros = [
    { id: 'protein', name: '蛋白质', percent: ratios[0], kcalPerGram: 4, color: 'sage', foods: '鱼、蛋、肉、奶与豆制品' },
    { id: 'fat', name: '脂肪', percent: ratios[1], kcalPerGram: 9, color: 'sand', foods: '坚果、植物油与食物中的脂肪' },
    { id: 'carbs', name: '碳水化合物', percent: ratios[2], kcalPerGram: 4, color: 'lilac', foods: '谷物、薯类、水果与杂豆' }
  ].map(item => ({ ...item, grams: tdee * item.percent / 100 / item.kcalPerGram }));
  return {
    bmr, tdee, activity, macros, ...getMicronutrients(profile), ageBand: getAgeBand(age),
    proteinRni: profile.sex === 'male' ? (age >= 65 ? 72 : 65) : (age >= 65 ? 62 : 55),
    formulaOutsideStudy: age < 19 || age > 78,
    formulaVersion: 'Mifflin-St Jeor / DRIs 2023 adults v1'
  };
}
