import fs from 'node:fs/promises';
import { ALL_FOODS } from '../src/data/catalogue.js';

const root = new URL('../', import.meta.url);
const sources = JSON.parse(await fs.readFile(new URL('src/data/foodGallerySources.json', root), 'utf8'));
const families = new Set(ALL_FOODS.map(food => food.family || food.name).filter(Boolean));
const familyAliases = {
  '辣椒/甜椒': ['辣椒', '甜椒'],
  '甘蓝/白菜': ['甘蓝', '白菜'],
  '稻米/米饭': ['稻米', '米饭', '白米饭'],
};
const index = {};
for (const family of families) {
  const subjects = new Set([family, ...(familyAliases[family] || [])]);
  const candidates = sources.filter(photo => subjects.has(photo.subject));
  if (!candidates.length) continue;
  const photo = candidates.find(item => !/蛋糕|派|饼干|浓汤|汁|组合|制作|菜式|配餐/.test(item.subject)) || candidates[0];
  index[family] = {
    image: photo.image,
    subject: photo.subject,
    title: photo.title,
    author: photo.author,
    sourceUrl: photo.sourceUrl,
    license: photo.license,
    licenseUrl: photo.licenseUrl,
    modifications: photo.modifications,
    imageNote: '按食材名称匹配的开放许可实拍参考；不同品种和加工状态以食物条目为准。',
    familyReference: true,
  };
}
await fs.writeFile(new URL('src/data/foodPhotoFamilyIndex.json', root), JSON.stringify(index, null, 2) + '\n');
console.log(JSON.stringify({ families: families.size, indexed: Object.keys(index).length, sizeBytes: (await fs.stat(new URL('src/data/foodPhotoFamilyIndex.json', root))).size }));
