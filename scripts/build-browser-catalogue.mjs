import {createHash} from 'node:crypto';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {ALL_FOODS,PHOTO_FOODS,REFERENCE_FOODS,FOOD_GROUPS,FOOD_DATA_VERSION} from '../src/data/catalogue.js';
import {foodState} from '../src/lib/foodPresentation.js';

// All original identities remain in the small index. Full nutrients, original
// descriptions, photo licences and saved AI estimates travel together on demand.
export async function buildBrowserCatalogue(){
 const estimates=JSON.parse(await readFile(new URL('../src/data/aiFoodEstimates.json',import.meta.url),'utf8'));
 const buckets=Array.from({length:64},()=>[]),core={},aliases={};
 const rows=ALL_FOODS.map((food,index)=>{
  const bucket=index%64;
  buckets[bucket].push({food,estimate:estimates.estimates?.[food.key]||null});
  if(!food.expanded&&!food.photoCatalogue&&food.source&&Object.keys(core).length<48)core[food.key]={food,estimate:estimates.estimates?.[food.key]||null};
  aliases[food.key]=food.aliases||[];
  return [food.key,food.name,food.group,food.grams,food.category,food.subcategory,foodState(food),food.image,!!food.expanded,!!food.photoCatalogue,food.source?.id||null,
   ['energy','protein','carbs','fat','fiber'].map(id=>typeof food.nutrients?.[id]==='number'?food.nutrients[id]:null),bucket,
   [...new Set((food.aliases||[]).filter(a=>a!==food.name&&/[\u3400-\u9fff]/u.test(a)&&a.length<24))]];
 });
 const directory=new URL('../content-dist/catalogue/',import.meta.url);await mkdir(directory,{recursive:true});
 async function asset(label,value){const body=JSON.stringify(value),hash=createHash('sha256').update(body).digest('hex').slice(0,16),name=`${label}-${hash}.json`;await writeFile(new URL(name,directory),body);return '/content-dist/catalogue/'+name;}
 const urls=await Promise.all(buckets.map((value,index)=>asset('part-'+index,value)));
 const searchUrl=await asset('search',aliases);
 const bootstrap={version:FOOD_DATA_VERSION,rows,core,urls,searchUrl,photoIds:PHOTO_FOODS.map(f=>f.key),referenceIds:REFERENCE_FOODS.map(f=>f.key),groups:FOOD_GROUPS.map(({items,...group})=>group)};
 await writeFile(new URL('../src/data/catalogue-bootstrap.json',import.meta.url),JSON.stringify(bootstrap));
 return bootstrap;
}
