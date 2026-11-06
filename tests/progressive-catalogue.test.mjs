import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat,mkdir,writeFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {brotliDecompressSync} from 'node:zlib';
import {ALL_FOODS,PHOTO_FOODS,REFERENCE_FOODS} from '../src/data/catalogue.js';
import {createCatalogueHydrator} from '../src/lib/catalogueHydration.js';
import {createNutritionSnapshot} from '../src/lib/nutritionSnapshot.js';
import {sendStaticFile} from '../server/static-files.mjs';

const root=new URL('../',import.meta.url);
const bootstrap=JSON.parse(await readFile(new URL('src/data/catalogue-bootstrap.json',root)));
test('progressive catalogue preserves every food ID, full nutrient field, source, photo licence and saved estimate',async()=>{
 const estimates=JSON.parse(await readFile(new URL('src/data/aiFoodEstimates.json',root)));
 assert.deepEqual(bootstrap.rows.map(r=>r[0]),ALL_FOODS.map(f=>f.key));
 assert.deepEqual(bootstrap.photoIds,PHOTO_FOODS.map(f=>f.key));
 assert.deepEqual(bootstrap.referenceIds,REFERENCE_FOODS.map(f=>f.key));
 for(const row of bootstrap.rows){const food=ALL_FOODS.find(f=>f.key===row[0]);assert.deepEqual(row[11],['energy','protein','carbs','fat','fiber'].map(id=>typeof food.nutrients[id]==='number'?food.nutrients[id]:null));}
 const restored=new Map();
 for(const url of bootstrap.urls){const rows=JSON.parse(await readFile(new URL('.'+url,root)));for(const row of rows){assert.ok(!restored.has(row.food.key));restored.set(row.food.key,row);}}
 assert.equal(restored.size,ALL_FOODS.length);
 for(const food of ALL_FOODS){const row=restored.get(food.key);assert.deepEqual(row.food,food);assert.deepEqual(row.estimate,estimates.estimates?.[food.key]||null);}
});

test('hydration shares concurrent requests, keeps object identities, and retries failures without saving partial snapshots',async()=>{
 const foods={a:{key:'a',__summary:true,__bucket:0,nutrients:{}},b:{key:'b',__summary:true,__bucket:0,nutrients:{}}},original=foods.a;
 let calls=0,fail=true;
 const full=[{food:{key:'a',nutrients:{energy:0,vitaminC:7},source:{id:'real-sample'}},estimate:null},{food:{key:'b',nutrients:{energy:42}},estimate:null}];
 const ensure=createCatalogueHydrator({foods,urls:['/part.json'],fetcher:async()=>{calls++;if(fail)throw Error('offline');return{ok:true,json:async()=>full};}});
 assert.throws(()=>createNutritionSnapshot(foods.a),/完整食物资料/);
 await assert.rejects(ensure('a'),/offline/);assert.equal(foods.a.__summary,true);
 fail=false;await Promise.all([ensure('a'),ensure('b')]);assert.equal(calls,2);assert.equal(foods.a,original);
 const snapshot=createNutritionSnapshot(foods.a);assert.equal(snapshot.values.energy,0);assert.equal(snapshot.values.vitaminC,7);assert.equal(snapshot.values.iron,undefined);
 await ensure('a');assert.equal(calls,2);
});

test('incomplete catalogue packets are rejected atomically',async()=>{
 const foods={a:{key:'a',__summary:true,__bucket:0},b:{key:'b',__summary:true,__bucket:0}};
 const ensure=createCatalogueHydrator({foods,urls:['/part.json'],fetcher:async()=>({ok:true,json:async()=>[{food:{key:'a',nutrients:{energy:99}}}]})});
 await assert.rejects(ensure('a'),/版本不一致/);assert.equal(foods.a.__summary,true);assert.equal(foods.a.nutrients,undefined);
});

test('real workspace mounts directly and no longer waits for the original full food JSON',async()=>{
 const source=await readFile(new URL('src/main.js',root),'utf8');
 assert.ok(source.indexOf('await initializeStorageScope()')<source.indexOf("import('./App.vue')"));
 assert.ok(source.indexOf("import('./App.vue')")<source.indexOf("import('./HomeEntry.vue')"));
 const chunks=await readdir(new URL('content-dist/chunks/',root));
 const shared=chunks.find(f=>/^IntakeAnalysis-.*\.js$/.test(f));
 const br=await readFile(new URL('content-dist/chunks/'+shared+'.br',root));
 assert.ok(br.length<160000,`shared startup data is ${br.length} compressed bytes`);
 assert.equal(brotliDecompressSync(br).length,(await stat(new URL('content-dist/chunks/'+shared,root))).size);
 for(const url of bootstrap.urls){const size=(await stat(new URL('.'+url+'.br',root))).size;assert.ok(size<25000,`on-demand packet too large: ${size}`);}
});

test('HTML starts workspace preloading before JavaScript and compressed catalogue packets retain correct headers',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'weiheng-preload-'));
 try{
  await mkdir(join(directory,'content-dist'));
  await writeFile(join(directory,'index.html'),'<html><head></head><body></body></html>');
  await writeFile(join(directory,'content-dist/app-preload.json'),JSON.stringify(['/content-dist/chunks/App-abcdefgh.js','https://other.test/evil.js','/api/data']));
  let status,headers,body;
  const res={writeHead:(s,h)=>{status=s;headers=h;},end:value=>body=value};
  await sendStaticFile({headers:{},method:'GET'},res,join(directory,'index.html'),'text/html');
  assert.equal(status,200);assert.match(body.toString(),/<link rel="modulepreload" href="\/content-dist\/chunks\/App-abcdefgh.js">/);assert.ok(!body.toString().includes('evil'));assert.equal(headers['Cache-Control'],'no-store');
  const file=new URL('.'+bootstrap.urls[0],root);
  await sendStaticFile({headers:{'accept-encoding':'br, gzip'},method:'GET'},res,file.pathname.replace(/^\/([A-Za-z]:)/,'$1'),'application/json');
  assert.equal(headers['Content-Encoding'],'br');assert.match(headers['Cache-Control'],/immutable/);assert.ok(Array.isArray(JSON.parse(brotliDecompressSync(body))));
 }finally{await rm(directory,{recursive:true,force:true});}
});
