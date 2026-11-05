import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {ALL_FOODS,rankFoods,FOOD_BY_ID} from '../src/data/catalogue.js';
import {NUTRIENTS} from '../src/lib/foodNutrition.js';
import {SAMPLE_GROUPS} from '../src/lib/foodSamples.js';
import columns from '../docs/food-data/expanded-import.json' with {type:'json'};
const bytes=await readFile(new URL('../docs/food-data/raw/ABBREV.txt',import.meta.url));
const raw=new Map(bytes.toString('latin1').split(/\r?\n/).filter(Boolean).map(line=>{const row=line.split('^').map(x=>x.replace(/^~|~$/g,''));return[row[0],row];}));
const micro=NUTRIENTS.filter(n=>['维生素','矿物质'].includes(n.section));
const common=['米饭','面条','鸡蛋','牛奶','豆腐','鸡肉','猪肉','鱼','菠菜','西兰花','胡萝卜','番茄','香蕉','苹果'];
const chosen=common.map(name=>({name,food:rankFoods(name).map(r=>r.food).find(f=>f.source)}));
const selected=[...new Set([...chosen.map(x=>x.food?.key),...SAMPLE_GROUPS.flatMap(g=>g.items.map(([id])=>id))].filter(Boolean))].map(id=>FOOD_BY_ID[id]);
const mismatches=[];
for(const food of selected){const row=raw.get(food.source.id);if(!row){mismatches.push(food.key+': 缺少原始行');continue;}for(const [id,col] of Object.entries(columns.nutrientColumns)){const expected=row[col].trim()===''?null:Number(row[col]);if(food.nutrients[id]!==expected)mismatches.push(`${food.key}/${id}: ${food.nutrients[id]} != ${expected}`);}}
const cell=s=>String(s??'—').replaceAll('|','/');
const report=[
 '# 常见食物微量营养覆盖核对', '',
 `目录 ${ALL_FOODS.length} 项；此次未新增或凭空补齐营养数值。改进是让已有可靠样本可明确选择，并将确认样本保存到记录快照。`,
 `原始来源：USDA SR28 ABBREV.txt（公开数据库，原有来源及许可保留）；SHA256：${createHash('sha256').update(bytes).digest('hex')}。`,
 `逐字段核对 ${selected.length} 个常用/选择器样本；差异 ${mismatches.length} 项。`, '',
 '| 常用名称 | 选定样本ID | 样本名称 | 已知微量字段 | 缺失字段 |',
 '|---|---|---|---|---|',
 ...chosen.map(({name,food})=>`| ${name} | ${food?.key||'未匹配'} | ${cell(food?.name)} | ${micro.filter(n=>typeof food?.nutrients[n.id]==='number').length}/${micro.length} | ${micro.filter(n=>typeof food?.nutrients[n.id]!=='number').map(n=>n.name).join('、')||'无'} |`), '',
 '## 具体样本入口', '',
 ...SAMPLE_GROUPS.map(g=>`- ${g.name}：${g.items.map(([id,label])=>`${label}（${id}）`).join('；')}。选择后切换到真实样本ID，不向通用照片条目复制数值。`), '',
 '## 全库字段覆盖（本次前后数值相同）', '',
 '| 指标 | 数据库已知条目 | 缺失条目 |', '|---|---:|---:|',
 ...micro.map(n=>{const count=ALL_FOODS.filter(f=>typeof f.nutrients[n.id]==='number').length;return `| ${n.name} | ${count} | ${ALL_FOODS.length-count} |`;}), '',
 '## 限制与后续', '',
 '- USDA样本不是中国本地食物实测值，不能改标签冒充中国食物成分表。',
 '- 碘等原始资料未提供的字段保持未知，不能通过AI填充。',
 '- 各豆腐凝固剂、生熟和加工状态独立保留；照片不证明品牌、配方或营养样本身份。部分细分样本无准确照片，保持无照片，不复用相似图。',
 '- 仍需有使用权限的中国成分表、食品标签和明确配方。当前选择器只覆盖已核对的5组常见食物，其他样本可继续检索。',
 ...(mismatches.length?['','## 差异',...mismatches.map(s=>'- '+s)]:[]),''
 ].join('\n');
await writeFile(new URL('../docs/COMMON_MICRONUTRIENT_COVERAGE.md',import.meta.url),report);
console.log(JSON.stringify({selectedSamples:selected.length,rawMismatches:mismatches.length,report:'docs/COMMON_MICRONUTRIENT_COVERAGE.md',mismatches},null,2));
if(mismatches.length)process.exitCode=1;
