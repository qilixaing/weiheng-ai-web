import { GROUPS } from '../../foods.js';
import reference from './food-reference.json' with {type:'json'};
import expanded from './food-expanded.json' with {type:'json'};
import campus from './campus-foods.json' with {type:'json'};
import { CATEGORY_BY_ID } from './foodCategories.js';
import bindings from './foodPhotoBindings.json' with {type:'json'};
import photoFoods from './photo-foods.json' with {type:'json'};
const FOOD_PHOTOS=Object.fromEntries(bindings.map(photo=>[photo.foodId,photo]));
export const FOOD_DATA_VERSION='photo-catalogue-local-20261104-v4';
const PHOTO_STATE_MISMATCHES=new Set(['usda-11365','usda-11510','usda-11519','usda-20027','usda-20032','usda-20115','usda-20117','usda-16002','usda-16109','usda-11446','usda-15237','usda-15015','usda-15151','usda-03099','usda-03194','usda-09236','usda-12061','usda-12087','usda-16070','usda-16427','usda-10061','usda-05098','usda-05142','usda-05220','usda-15159','usda-01001']);
const extraFruit=[['hami-melon','哈密瓜',150,['甜瓜','香瓜','hami melon']],['blueberry','蓝莓',100],['mango','芒果',150],['dragon-fruit','火龙果',150],['peach','桃子',150],['pomelo','柚子',150]];
const legacyGroups=GROUPS.map(group=>({...group,items:[...group.items,...(group.key==='fruit'?extraFruit:[])]}));
const legacy=legacyGroups.flatMap(group=>group.items.map(([key,name,grams=100,aliases=[]])=>({key,name,grams,aliases,group:group.key,groupName:group.name})));
const categoryForGroup={vegetables:'04',fruit:'06',staples:'01',wholegrains:'01',dairy:'10',protein:'08',fish:'12',snacks:'14'};
const overrides={potato:'02','sweet-potato':'02',mushrooms:'05',tofu:'03',soybeans:'03','green-beans':'03','red-beans':'03',nuts:'07',seeds:'07','dried-fruit':'18',candy:'18',chicken:'09',egg:'11','fortified-soy-drink':'16'};
const refs=new Map(reference.map(food=>[food.key,food]));
const combined=legacy.map(food=>{const sample=refs.get(food.key);return sample?{...food,...sample,grams:food.grams,aliases:[food.name,...food.aliases,...sample.aliases]}:{...food,category:overrides[food.key]||categoryForGroup[food.group],subcategory:'原有记录目录',state:'品种 / 生熟待确认',source:null,nutrients:{}};});
combined.push(...reference.filter(food=>!legacy.some(old=>old.key===food.key)));
combined.push(...expanded,...campus);
// Preserve every saved-record ID; photographs are fixed local assets, never live search results.
const decorate=food=>{const photo=FOOD_PHOTOS[food.key]||food.imageCredit;return {...food,groupName:GROUPS.find(group=>group.key===food.group)?.name||'零食',categoryName:CATEGORY_BY_ID[food.category]?.name||'其他',image:photo?.image||null,imageCredit:photo||null,imageAlt:food.name,imageLabel:'食物照片',imageNote:photo?.imageNote||'该营养样本暂无单独配图。',basis:'每 100 克可食部'};};
export const REFERENCE_FOODS=combined.map(decorate);
export const ALL_FOODS=[...REFERENCE_FOODS,...photoFoods.map(decorate)];
// One visual food entry per source photograph. Fine-grained nutrient sample IDs
// remain searchable separately, including IDs already used in real diaries.
const seenPhotos=new Set();
export const PHOTO_FOODS=[...REFERENCE_FOODS.filter(f=>!f.expanded&&f.source&&f.image),...ALL_FOODS.filter(f=>f.photoCatalogue),...REFERENCE_FOODS.filter(f=>f.expanded&&f.source&&f.image),...REFERENCE_FOODS.filter(f=>!f.source&&f.image)].filter(f=>{const identity=decodeURIComponent(f.imageCredit?.sourceUrl||f.image||'').replaceAll('_',' ');if(!identity||seenPhotos.has(identity))return false;seenPhotos.add(identity);return true;});
export const FOOD_BY_ID=Object.fromEntries(ALL_FOODS.map(food=>[food.key,food]));
export const FOOD_GROUPS=legacyGroups.map(group=>({...group,items:ALL_FOODS.filter(food=>food.group===group.key).map(food=>[food.key,food.name,food.grams,food.aliases])}));
export const CORE_GROUPS=FOOD_GROUPS.filter(group=>group.key!=='snacks');
export const GROUP_ICONS={vegetables:'leaf',fruit:'apple',staples:'bowl',wholegrains:'grain',dairy:'milk',protein:'egg',fish:'fish',snacks:'cookie'};
import {createCatalogueSearch} from '../lib/catalogueSearch.js';
export const {normalizeSearch,rankFoods,searchFoods,findMentionedFoods}=createCatalogueSearch(ALL_FOODS);
export async function ensureFoodDetails(ids){return (Array.isArray(ids)?ids:[ids]).map(id=>FOOD_BY_ID[id]).filter(Boolean);}
