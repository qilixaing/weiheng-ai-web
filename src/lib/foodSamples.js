import {FOOD_BY_ID} from '../data/catalogue.js';
// Explicitly reviewed USDA SR28 descriptions. Never attach one sample's values
// to a different food ID or infer nutrient identity from its photograph.
export const SAMPLE_GROUPS=[
 {name:'豆腐',match:/豆腐|tofu/i,items:[['usda-16427','普通豆腐 · 硫酸钙凝固'],['sr28-16126','硬豆腐 · 硫酸钙与卤水凝固'],['sr28-16127','嫩豆腐 · 硫酸钙与卤水凝固'],['sr28-16159','特硬豆腐 · 卤水凝固'],['sr28-16129','油炸豆腐']]},
 {name:'西兰花',match:/西兰花|broccoli/i,items:[['broccoli','西兰花 · 生'],['sr28-11091','西兰花 · 水煮沥干，无盐']]},
 {name:'胡萝卜',match:/胡萝卜|carrot/i,items:[['carrot','胡萝卜 · 生'],['sr28-11125','胡萝卜 · 水煮沥干，无盐']]},
 {name:'菠菜',match:/菠菜|spinach/i,items:[['spinach','菠菜 · 生'],['sr28-11458','菠菜 · 水煮沥干，无盐']]},
 {name:'番茄',match:/番茄|西红柿|tomato/i,items:[['tomato','红番茄 · 生'],['sr28-11530','红番茄 · 熟']]},
];
export function sampleChoices(food){const group=SAMPLE_GROUPS.find(g=>g.items.some(([id])=>id===food?.key)||[g.name,...(g.name==='番茄'?['西红柿']:[])].includes(food?.name));return (group?.items||[]).filter(([id])=>FOOD_BY_ID[id]?.source).map(([id,label])=>({id,label}));}
const labels=Object.fromEntries(SAMPLE_GROUPS.flatMap(g=>g.items));
export const sampleLabel=id=>labels[id]||'';
