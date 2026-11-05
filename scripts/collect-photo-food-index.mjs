import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const app=new URL('../',import.meta.url),work=new URL('../photo-food-expansion/',app);
await fs.mkdir(new URL('downloads/',work),{recursive:true});
const raw=JSON.parse(await fs.readFile(new URL('../wikidata-chinese-food-photos.json',app),'utf8')).results.bindings;
const byItem=[...new Map(raw.map(x=>[x.item.value,x])).values()];
const noSubject=/物种|的一属|的一科|的一种鱼类|菌科|鲑科|鲤科|鳕科|胡椒科|姜科|棕榈科|禾本科|桄榔|大麻|蓝梦|草食性|食病毒|鱼素者|食谱\/|战国时代|生物|细胞|微生物|species|genus|diet that|strain|feeding behavior|consumption of viruses|fossil|microscop/i;
const noTitle=/logo|map\.|diagram|chart|stamp|flag|portrait|Köhler|Koehler|microscop|Paramecium|S_cerevisiae|under DIC|botanical|illustration|advertisement|festival|parade|Lord Mayor|Council|museum|collector|harvest|Warring States|Stir frying Xi|Food Court of Costco/i;
const seenNames=new Set(),seenImages=new Set();
const candidates=byItem.flatMap(x=>{const name=x.itemLabel.value,description=x.itemDescription?.value||'',file=decodeURIComponent(x.image.value.split('/').at(-1));if(!/[\u4e00-\u9fff]/.test(name)||noSubject.test(name+' '+description)||noTitle.test(file)||! /\.(jpe?g|png|webp)$/i.test(file)||seenNames.has(name)||seenImages.has(file))return[];seenNames.add(name);seenImages.add(file);return[{qid:x.item.value.split('/').at(-1),name,description,file:'File:'+file,identityUrl:x.item.value}]});
const clean=x=>String(x||'').replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const norm=x=>x.replaceAll('_',' ').normalize('NFC');
const metadataPath=new URL('metadata.json',work);let metadata=JSON.parse(await fs.readFile(metadataPath,'utf8').catch(()=>'[]'));
for(let i=0;!process.argv.includes('--download-only')&&i<candidates.length;i+=40){const batch=candidates.slice(i,i+40).filter(x=>!metadata.some(y=>y.qid===x.qid));if(!batch.length)continue;
 const q=new URLSearchParams({action:'query',format:'json',redirects:'1',prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'500',titles:batch.map(x=>x.file).join('|')});
 const r=await fetch('https://commons.wikimedia.org/w/api.php?'+q,{headers:{'User-Agent':'WeihengFoodLibrary/1.0 (https://weihengai.top; open licensed local food library)'},signal:AbortSignal.timeout(30000)});if(r.status===429){console.log('COMMONS_RATE_LIMIT_STOP');break;}if(!r.ok){console.log('METADATA_ERROR',i,r.status);continue;}const data=await r.json(),pages=Object.values(data.query?.pages||{}),redirects=new Map((data.query?.redirects||[]).map(x=>[norm(x.from),norm(x.to)]));
 for(const item of batch){const file=redirects.get(norm(item.file))||norm(item.file),p=pages.find(x=>norm(x.title)===file),info=p?.imageinfo?.[0],m=info?.extmetadata||{},license=clean(m.LicenseShortName?.value);if(!info||! /^(CC0|CC BY(?:-SA)?(?: |$)|Public domain|PDM)/.test(license)||/\b(NC|ND)\b/.test(license)||!clean(m.Artist?.value)||info.width<250||info.height<180)continue;
 metadata.push({...item,title:p.title,author:clean(m.Artist?.value),sourceUrl:info.descriptionurl,license,licenseUrl:clean(m.LicenseUrl?.value)||'https://commons.wikimedia.org/wiki/Commons:Public_domain',imageDescription:clean(m.ImageDescription?.value).slice(0,2000),downloadUrl:info.thumburl||info.url,width:info.width,height:info.height});}
 await fs.writeFile(metadataPath,JSON.stringify(metadata,null,2));console.log(JSON.stringify({metadata:metadata.length,total:candidates.length}));
}
let downloaded=JSON.parse(await fs.readFile(new URL('downloaded.json',work),'utf8').catch(()=>'[]')),at=0;const existing=new Map();
for(const path of ['src/data/foodPhotoSources.json','src/data/foodGallerySources.json'])for(const x of JSON.parse(await fs.readFile(new URL(path,app),'utf8')))if(x.sourceUrl)existing.set(norm(decodeURIComponent(x.sourceUrl.split('/wiki/')[1]||'')),x.image);
const queue=metadata.filter(x=>!downloaded.some(y=>y.qid===x.qid)).sort((a,b)=>Number(!existing.has(norm(a.title)))-Number(!existing.has(norm(b.title))));let stop=false;
async function worker(){while(at<queue.length&&!stop){const item=queue[at++];try{const image=existing.get(norm(item.title));let filename,localExisting;if(image){localExisting=image;}else{const r=await fetch(item.downloadUrl,{headers:{'User-Agent':'WeihengFoodLibrary/1.0'},signal:AbortSignal.timeout(30000)});if(r.status===429){console.log('IMAGE_RATE_LIMIT_BACKOFF',r.headers.get('retry-after')||'60');await new Promise(done=>setTimeout(done,Math.min(60000,Math.max(10000,(Number(r.headers.get('retry-after'))||60)*1000))));at--;continue;}if(!r.ok)throw Error('HTTP '+r.status);const bytes=new Uint8Array(await r.arrayBuffer());if(bytes.length<2000||bytes.length>6000000)continue;filename=createHash('sha256').update(item.sourceUrl).digest('hex').slice(0,20)+'.jpg';await fs.writeFile(new URL('downloads/'+filename,work),bytes);}
 downloaded.push({...item,filename,localExisting,retrievedAt:new Date().toISOString().slice(0,10)});if(downloaded.length%25===0){await fs.writeFile(new URL('downloaded.json',work),JSON.stringify(downloaded,null,2));console.log(JSON.stringify({downloaded:downloaded.length,queue:queue.length}));}
 }catch(e){console.log('DOWNLOAD_ERROR',item.qid,e.message);}await new Promise(done=>setTimeout(done,1000));}
}
await worker();await fs.writeFile(new URL('downloaded.json',work),JSON.stringify(downloaded,null,2));console.log(JSON.stringify({downloaded:downloaded.length,targets:candidates.length,metadata:metadata.length}));
