#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ALL_FOODS, FOOD_DATA_VERSION, rankFoods } from '../src/data/catalogue.js';
import { FOOD_CATEGORIES } from '../src/data/foodCategories.js';

const coreMetrics = [
  ['energy', '热量', 'kcal'],
  ['protein', '蛋白质', 'g'],
  ['carbs', '碳水化合物', 'g'],
  ['fat', '脂肪', 'g'],
  ['fiber', '膳食纤维', 'g'],
];
const commonNames = ['白菜', '菠菜', '西兰花', '番茄', '香蕉', '鸡蛋', '鸡肉', '牛奶', '猪肉', '豆腐', '虾', '米饭'];
const pct = (count, total) => total ? `${(count / total * 100).toFixed(1)}%` : '0.0%';
const cell = value => String(value ?? '').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ');
const sourced = ALL_FOODS.filter(food => food.source && food.source.id && food.source.version && food.source.url);
const rowsByCategory = FOOD_CATEGORIES.map(category => ({
  ...category,
  all: ALL_FOODS.filter(food => food.category === category.id).length,
  sourced: sourced.filter(food => food.category === category.id).length,
}));
const missingRows = coreMetrics.map(([id, name, unit]) => {
  const missing = ALL_FOODS.filter(food => typeof food.nutrients?.[id] !== 'number').length;
  const sourcedMissing = sourced.filter(food => typeof food.nutrients?.[id] !== 'number').length;
  return { id, name, unit, missing, total: ALL_FOODS.length, sourcedMissing, sourcedTotal: sourced.length };
});
const aliasCount = ALL_FOODS.filter(food => Array.isArray(food.aliases) && food.aliases.some(alias => String(alias).trim())).length;
const stateCount = ALL_FOODS.filter(food => typeof food.state === 'string' && food.state.trim()).length;
const sourceCount = ALL_FOODS.filter(food => food.source && food.source.id && food.source.version && food.source.url).length;
const commonRows = commonNames.map(query => {
  const found = rankFoods(query).map(result => result.food);
  const best = found.find(food => food.source && coreMetrics.every(([id]) => typeof food.nutrients?.[id] === 'number'))
    || found.find(food => food.source) || found[0];
  return {
    query,
    count: found.length,
    key: best?.key || '未收录',
    name: best?.name || '—',
    state: best?.state || '—',
    source: best?.source ? `${best.source.name} / ${best.source.id} / ${best.source.version}` : '无可核验来源',
    macros: best ? coreMetrics.map(([id]) => typeof best.nutrients?.[id] === 'number' ? '有' : '缺').join('/') : '—',
  };
});

const lines = [
  '# 食物数据覆盖与来源审计',
  '',
  `食物库版本：\`${FOOD_DATA_VERSION}\`。本报告由 \`npm run food:audit\` 从项目合并目录自动生成；营养口径为每 100 克可食部。` ,
  '',
  '## 总体覆盖',
  '',
  '| 项目 | 数量 | 占比 |',
  '| --- | ---: | ---: |',
  `| 合并目录食物条目 | ${ALL_FOODS.length} | 100.0% |`,
  `| 有来源 ID、版本和链接的条目 | ${sourceCount} | ${pct(sourceCount, ALL_FOODS.length)} |`,
  `| 有至少一个别名的条目 | ${aliasCount} | ${pct(aliasCount, ALL_FOODS.length)} |`,
  `| 有生熟/状态说明的条目 | ${stateCount} | ${pct(stateCount, ALL_FOODS.length)} |`,
  '',
  '## 分类数量',
  '',
  '| 分类 | 合并条目数 | 有可核验来源 |',
  '| --- | ---: | ---: |',
  ...rowsByCategory.map(row => `| ${cell(row.name)} | ${row.all} | ${row.sourced} |`),
  '',
  '## 核心营养指标缺失情况',
  '',
  '“缺失”指该指标不是数值（包括 `null` 或未提供）；真实数值 0 按已知数据处理。',
  '',
  '| 指标 | 合并目录缺失 | 合并目录缺失率 | 有来源条目缺失 | 有来源条目缺失率 |',
  '| --- | ---: | ---: | ---: | ---: |',
  ...missingRows.map(row => `| ${row.name}（${row.unit}） | ${row.missing}/${row.total} | ${pct(row.missing, row.total)} | ${row.sourcedMissing}/${row.sourcedTotal} | ${pct(row.sourcedMissing, row.sourcedTotal)} |`),
  '',
  '## 常用名称、品种/生熟、来源核对',
  '',
  '宏量指标顺序为热量 / 蛋白质 / 碳水 / 脂肪 / 纤维；“有/缺”是逐项状态。多个候选条目时优先展示有来源且核心指标更完整的条目。',
  '',
  '| 搜索名称 | 候选数 | 展示条目 | 名称与状态 | 来源 | 核心指标 |',
  '| --- | ---: | --- | --- | --- | --- |',
  ...commonRows.map(row => `| ${row.query} | ${row.count} | ${row.key} | ${row.name}；${row.state} | ${cell(row.source)} | ${row.macros} |`),
  '',
  '候选数按项目实际 `rankFoods` 搜索排序计算，可能包含别名、相似名称或分类命中；展示样本优先选择有来源且核心指标完整的条目。查看食物时仍需核对名称和生熟状态，不能把某一烹饪状态代表成所有泛称。',
  '',
  '## 解释与待补项',
  '',
  `- 有来源的 ${sourced.length} 条精选样本来自本项目随附的 USDA SR28 数据与选择清单；项目版本、原始文件校验和、转换规则及许可说明见 \`docs/food-data/README.md\`。`,
  '- 无来源的旧记录目录条目保留供搜索和记账，但缺失营养值仍为空；它们不会因相似名称自动继承其他样本的营养值。',
  '- USDA 样本不能代表所有中国本地品种、品牌、配方或熟制方式。若没有精确匹配的可核验样本，应继续显示“暂无数据”，不以 AI 估算冒充数据库值。',
  '- 可优先补充“无来源且仍常见”的泛称条目；只有在逐条确认样本 ID、描述、可食部和版本后才能加入精确营养数值。',
  '',
];

const report = `${lines.join('\n')}\n`;
const writeArgIndex = process.argv.indexOf('--write');
if (writeArgIndex >= 0) {
  const target = process.argv[writeArgIndex + 1];
  if (!target || target.startsWith('--')) throw new Error('请为 --write 提供报告文件路径。');
  const output = resolve(target);
  await writeFile(output, report, 'utf8');
  process.stdout.write(`已写入 ${output}\n`);
} else {
  process.stdout.write(report);
}
