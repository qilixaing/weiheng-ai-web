import {reactive} from 'vue';
import bootstrap from './catalogue-bootstrap.json' with {type:'json'};
import estimates from './aiFoodEstimates.browser.js';
import {CATEGORY_BY_ID} from './foodCategories.js';
import {createCatalogueHydrator} from '../lib/catalogueHydration.js';
import {createCatalogueSearch} from '../lib/catalogueSearch.js';
export const FOOD_DATA_VERSION=bootstrap.version;
const groupNames=Object.fromEntries(bootstrap.groups.map(g=>[g.key,g.name]));
export const ALL_FOODS=bootstrap.rows.map(([key,name,group,grams,category,subcategory,state,image,expanded,photoCatalogue,sourceId,macros,bucket,aliases])=>reactive({
 key,name,group,grams,category,subcategory,state,image,expanded,photoCatalogue,aliases,
 groupName:groupNames[group]||'零食',categoryName:CATEGORY_BY_ID[category]?.name||'其他',imageAlt:name,imageLabel:'食物照片',basis:'每 100 克可食部',
 source:sourceId?{id:sourceId,name:'USDA SR28'}:null,
 nutrients:Object.fromEntries(['energy','protein','carbs','fat','fiber'].flatMap((id,i)=>macros[i]===null?[]:[[id,macros[i]]])),__summary:true,__bucket:bucket
}));
export const FOOD_BY_ID=Object.fromEntries(ALL_FOODS.map(f=>[f.key,f]));
for(const [key,{food,estimate}] of Object.entries(bootstrap.core)){Object.assign(FOOD_BY_ID[key],food,{__summary:false});if(estimate)estimates.estimates[key]=estimate;}
export const PHOTO_FOODS=bootstrap.photoIds.map(id=>FOOD_BY_ID[id]);
export const REFERENCE_FOODS=bootstrap.referenceIds.map(id=>FOOD_BY_ID[id]);
export const FOOD_GROUPS=bootstrap.groups.map(group=>({...group,items:ALL_FOODS.filter(f=>f.group===group.key).map(f=>[f.key,f.name,f.grams,f.aliases])}));
export const CORE_GROUPS=FOOD_GROUPS.filter(g=>g.key!=='snacks');
export const GROUP_ICONS={vegetables:'leaf',fruit:'apple',staples:'bowl',wholegrains:'grain',dairy:'milk',protein:'egg',fish:'fish',snacks:'cookie'};
export const ensureFoodDetails=createCatalogueHydrator({foods:FOOD_BY_ID,urls:bootstrap.urls,fetcher:url=>fetch(url),onEstimate:(id,value)=>{if(value)estimates.estimates[id]=value;}});
let searchRequest;
function loadSearch(){
 if(!searchRequest)searchRequest=fetch(bootstrap.searchUrl).then(r=>{if(!r.ok)throw Error('search');return r.json();}).then(rows=>{for(const [id,aliases] of Object.entries(rows))if(FOOD_BY_ID[id]&&Array.isArray(aliases))FOOD_BY_ID[id].aliases=aliases;}).catch(()=>{searchRequest=null;});
}
const search=createCatalogueSearch(ALL_FOODS);
export const normalizeSearch=search.normalizeSearch;
export function rankFoods(query,limit){if(query)loadSearch();return search.rankFoods(query,limit);}
export function searchFoods(query,limit){return rankFoods(query,limit).map(row=>row.food);}
export function findMentionedFoods(query,limit){if(query)loadSearch();return search.findMentionedFoods(query,limit);}
