// Open-licence candidate collector. Candidates require contact-sheet review
// before publication; never treat a successful search as visual verification.
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),work=new URL('../photo-expansion/',root);
await fs.mkdir(new URL('downloads/',work),{recursive:true});
const glossary=JSON.parse(await fs.readFile(new URL('docs/food-data/family-glossary.json',root),'utf8'));
const base=JSON.parse(await fs.readFile(new URL('src/data/foodPhotoSources.json',root),'utf8'));
const existing=new Set(base.map(x=>x.sourceUrl.replaceAll('_',' ')));
const skipped=new Set(['Nut (fruit)','Edible seed','Shellfish','Drink','Snack food','Spice','Sauce','Turkey as food','Goose as food','Duck as food','Fish as food','Cucurbita','Collard (plant)']);
const extras=[['饺子','Jiaozi','15'],['包子','Baozi','01'],['馒头','Mantou','01'],['粥','Congee','01'],['粽子','Zongzi','01'],['豆浆','Soy milk','16'],['米粉','Rice noodles','01'],['炒饭','Fried rice','15'],['麻婆豆腐','Mapo tofu','15'],['宫保鸡丁','Kung Pao chicken','15'],['馄饨','Wonton','15'],['春卷','Spring roll','15'],['寿司','Sushi','15'],['虾','Shrimp as food','12'],['蟹','Crab as food','12'],['龙虾','Lobster as food','12'],['蛤蜊','Clam','12'],['牡蛎','Oyster','12'],['鱿鱼','Squid as food','12'],['贻贝','Mussel','12'],['鲤鱼','Carp','12'],['三文鱼','Salmon as food','12'],['燕麦粥','Porridge','01'],['酸奶','Yogurt','10'],['绿茶','Green tea','16'],['红茶','Black tea','16'],['白米饭','Cooked rice','01'],['腰果','Cashew','07'],['葵花籽','Sunflower seed','07'],['南瓜籽','Pumpkin seed','07'],['芝麻','Sesame','07'],['花菜','Cauliflower','04'],['西兰花','Broccoli','04']];
const subjects=[...new Map([...glossary.filter(x=>!skipped.has(x[4])).map(x=>[x[1],x[4],x[2]]),...extras].map(x=>[x[1],{subject:x[0],article:x[1],category:x[2]}])).values()];
const clean=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function json(url){for(let i=0;i<4;i++){try{const r=await fetch(url,{headers:{'User-Agent':'WeihengCampusFood/1.0 (educational open-licence catalogue)'},signal:AbortSignal.timeout(30000)});if(r.status===429||r.status===503){await pause(10000*(i+1));continue;}if(!r.ok)throw Error('HTTP '+r.status);return await r.json();}catch(e){if(i===3)throw e;await pause(1500*(i+1));}}throw Error('rate limit');}
const planPath=new URL('candidates.json',work);let plans=JSON.parse(await fs.readFile(planPath,'utf8').catch(()=>'[]'));
for(const subject of subjects){
 if(plans.some(x=>x.article===subject.article))continue;
 try{
  const words=subject.article.replace(/\s*\([^)]*\)/g,'').replace(/ as food/g,'').toLowerCase().split(/\s+/).filter(x=>x.length>2);
  const search='intitle:"'+words.join(' ')+'" filetype:bitmap -intitle:logo -intitle:flower -intitle:tree -intitle:map -intitle:leaves';
  const q=new URLSearchParams({action:'query',format:'json',generator:'search',gsrsearch:search,gsrnamespace:'6',gsrlimit:'12',prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'640'});
  const data=await json('https://commons.wikimedia.org/w/api.php?'+q);
  const candidates=Object.values(data.query?.pages||{}).flatMap(page=>{
   const info=page.imageinfo?.[0],m=info?.extmetadata||{},title=page.title||'',license=clean(m.LicenseShortName?.value);
   if(!info||!/^CC0|^CC BY(?:-SA)? |^Public domain|^PDM/.test(license)||/\b(NC|ND)\b/.test(license)||!clean(m.Artist?.value)||!clean(m.LicenseUrl?.value)&&!/^Public domain|^PDM/.test(license)||!/\.(jpg|jpeg|png|webp)$/i.test(title)||info.width<400||info.height<300)return[];
   const reject=/\b(logo|map|diagram|chart|stamp|flag|flower|blossom|blossoms|orchard|tree|trees|leaf|leaves|seedling|seedlings|plantation|harvest|harvesting|field|fields|statue|sculpture|painting|drawing|illustration|label|mascot|cartoon|molecule|structure|portrait|festival|parade|advertisement|package|packaging|restaurant|shop|supermarket|market|factory|costume|museum)\b/i;
   if(reject.test(title)||existing.has(info.descriptionurl.replaceAll('_',' ')))return[];
   return[{...subject,title,author:clean(m.Artist.value),description:clean(m.ImageDescription?.value).slice(0,1600),sourceUrl:info.descriptionurl,license,licenseUrl:clean(m.LicenseUrl?.value)||'https://commons.wikimedia.org/wiki/Commons:Public_domain',downloadUrl:info.thumburl||info.url,width:info.width,height:info.height,reviewStatus:'pending'}];
  }).slice(0,7);
  plans.push({...subject,candidates});await fs.writeFile(planPath,JSON.stringify(plans,null,2));console.log('CANDIDATES',subject.subject,candidates.length);
 }catch(e){console.log('SOURCE_FAILED',subject.article,e.message);}
 await pause(250);
}
const manifestPath=new URL('downloaded.json',work);let downloaded=JSON.parse(await fs.readFile(manifestPath,'utf8').catch(()=>'[]'));
const seen=new Set(downloaded.map(x=>x.sourceUrl));
const queue=plans.flatMap(x=>x.candidates).filter(x=>!seen.has(x.sourceUrl));let at=0;
async function worker(){while(at<queue.length&&downloaded.length<650){const item=queue[at++];if(seen.has(item.sourceUrl))continue;seen.add(item.sourceUrl);
 const filename=createHash('sha256').update(item.sourceUrl).digest('hex').slice(0,20)+'.jpg';
 try{const r=await fetch(item.downloadUrl,{headers:{'User-Agent':'WeihengCampusFood/1.0 educational catalogue'},signal:AbortSignal.timeout(30000)});if(r.status===429){seen.delete(item.sourceUrl);await pause(15000);continue;}if(!r.ok)throw Error('HTTP '+r.status);const bytes=new Uint8Array(await r.arrayBuffer());if(bytes.length<1500||bytes.length>7000000)throw Error('size');await fs.writeFile(new URL('downloads/'+filename,work),bytes);downloaded.push({...item,filename,retrievedAt:new Date().toISOString().slice(0,10)});await fs.writeFile(manifestPath,JSON.stringify(downloaded,null,2));if(downloaded.length%20===0)console.log('DOWNLOADED',downloaded.length);}catch(e){console.log('DOWNLOAD_FAILED',item.title,e.message);}await pause(450);
}}
await Promise.all([worker(),worker()]);
console.log('READY_FOR_VISUAL_REVIEW',downloaded.length,'subjects',plans.length);
