// Category-constrained supplement. All downloads remain unpublished until visual review.
import fs from 'node:fs/promises';import{createHash}from'node:crypto';
const root=new URL('../',import.meta.url),work=new URL('../photo-expansion/',root);
const definitions=[['苹果','Apples','06'],['香蕉','Bananas','06'],['梨','Pears','06'],['桃','Peaches','06'],['橘柑','Mandarins','06'],['橙','Oranges','06'],['草莓','Strawberries','06'],['蓝莓','Blueberries','06'],['树莓','Raspberries','06'],['葡萄','Grapes','06'],['西瓜','Watermelons','06'],['芒果','Mangoes','06'],['奇异果','Kiwifruit','06'],['柠檬','Lemons','06'],['李子','Plums','06'],['菠萝','Pineapples','06'],['枣','Dates (fruit)','06'],['无花果','Figs','06'],['樱桃','Cherries','06'],['石榴','Pomegranates','06'],['番茄','Tomatoes','04'],['胡萝卜','Carrots','04'],['土豆','Potatoes','02'],['红薯','Sweet potatoes','02'],['黄瓜','Cucumbers','04'],['茄子','Eggplants','04'],['花椰菜','Cauliflowers','04'],['西兰花','Broccoli','04'],['卷心菜','Cabbages','04'],['菠菜','Spinach','04'],['南瓜','Pumpkins','04'],['洋葱','Onions','04'],['青椒','Bell peppers','04'],['芦笋','Asparagus as food','04'],['蘑菇','Edible mushrooms','05'],['香菇','Shiitake','05'],['豆腐','Tofu','03'],['面包','Bread','01'],['白米饭','Cooked rice','01'],['面条','Noodles','01'],['意大利面','Pasta dishes','01'],['燕麦粥','Porridge','01'],['煎饼','Pancakes','01'],['包子','Baozi','01'],['馒头','Mantou','01'],['饺子','Jiaozi','15'],['粥','Congee','01'],['粽子','Zongzi','01'],['炒饭','Fried rice','15'],['麻婆豆腐','Mapo tofu','15'],['宫保鸡丁','Kung Pao chicken','15'],['馄饨','Wonton','15'],['春卷','Spring rolls','15'],['寿司','Sushi','15'],['蛋类菜式','Egg dishes','09'],['煮鸡蛋','Boiled eggs','09'],['奶酪','Cheese','10'],['酸奶','Yogurt','10'],['牛奶','Milk','10'],['豆浆','Soy milk','16'],['咖啡','Coffee','16'],['茶饮','Tea','16'],['绿茶','Green tea','16'],['果汁','Fruit juices','16'],['三文鱼菜式','Salmon dishes','12'],['虾类菜式','Shrimp dishes','12'],['鸡肉菜式','Chicken dishes','08'],['牛肉菜式','Beef dishes','08'],['猪肉菜式','Pork dishes','08'],['鱼类菜式','Fish dishes','12'],['鸡肉','Chicken as food','08'],['牛肉','Beef as food','08'],['猪肉','Pork as food','08'],['鱼肉','Fish as food','12'],['三明治','Sandwiches','15'],['披萨','Pizza','15'],['汉堡','Hamburgers','15'],['沙拉','Salads','15'],['汤','Soups','15'],['坚果','Nuts as food','07'],['花生','Peanuts','07'],['杏仁','Almonds','07'],['腰果','Cashew nuts','07'],['核桃','Walnuts','07'],['葵花籽','Sunflower seeds','07'],['巧克力','Chocolate','20'],['曲奇','Cookies','20'],['蛋糕','Cakes','20'],['冰淇淋','Ice cream','20'],['爆米花','Popcorn','20']];
const clean=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function json(url){for(let i=0;i<3;i++){try{const r=await fetch(url,{headers:{'User-Agent':'WeihengCampusFood/1.0 open-license educational collection'},signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error('HTTP '+r.status);return await r.json();}catch(e){if(i===2)throw e;await pause(3000*(i+1));}}}
const base=JSON.parse(await fs.readFile(new URL('src/data/foodPhotoSources.json',root),'utf8'));
const prior=JSON.parse(await fs.readFile(new URL('downloaded.json',work),'utf8').catch(()=>'[]'));
const path=new URL('category-downloaded.json',work);let rows=JSON.parse(await fs.readFile(path,'utf8').catch(()=>'[]'));
const seen=new Set([...base,...prior,...rows].map(x=>x.sourceUrl.replaceAll('_',' ')));
await fs.mkdir(new URL('category-downloads/',work),{recursive:true});
for(const[subject,cat,category]of definitions){
 if(rows.some(x=>x.article===cat))continue;
 try{
  const q=new URLSearchParams({action:'query',format:'json',generator:'categorymembers',gcmtitle:'Category:'+cat,gcmtype:'file',gcmlimit:'45',prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'640'});
  const data=await json('https://commons.wikimedia.org/w/api.php?'+q);let count=0;const pending=[];
  for(const page of Object.values(data.query?.pages||{})){
   const info=page.imageinfo?.[0],m=info?.extmetadata||{},title=page.title||'',license=clean(m.LicenseShortName?.value);
   if(!info||seen.has(info.descriptionurl.replaceAll('_',' '))||!/^CC0|^CC BY(?:-SA)? |^Public domain|^PDM/.test(license)||/\b(NC|ND)\b/.test(license)||!clean(m.Artist?.value)||!clean(m.LicenseUrl?.value)&&!/^Public domain|^PDM/.test(license)||!/\.(jpg|jpeg|png|webp)$/i.test(title)||info.width<400||info.height<300||/\b(painting|drawing|illustration|map|chart|diagram|sculpture|poster|logo|portrait)\b/i.test(title))continue;
   if(pending.length>=24)break;
   const item={subject,article:cat,category,title,author:clean(m.Artist.value),description:clean(m.ImageDescription?.value).slice(0,1600),sourceUrl:info.descriptionurl,license,licenseUrl:clean(m.LicenseUrl?.value)||'https://commons.wikimedia.org/wiki/Commons:Public_domain',downloadUrl:info.thumburl||info.url,width:info.width,height:info.height,reviewStatus:'pending',retrievedAt:new Date().toISOString().slice(0,10)};
   item.filename=createHash('sha256').update(item.sourceUrl).digest('hex').slice(0,20)+'.jpg';
   pending.push(item);
  }
  let at=0;async function worker(){while(at<pending.length){const item=pending[at++];try{const r=await fetch(item.downloadUrl,{signal:AbortSignal.timeout(12000)});if(!r.ok)continue;const bytes=new Uint8Array(await r.arrayBuffer());if(bytes.length<1500||bytes.length>7000000)continue;await fs.writeFile(new URL('category-downloads/'+item.filename,work),bytes);rows.push(item);seen.add(item.sourceUrl.replaceAll('_',' '));count++;}catch{}await pause(200);}}
  await Promise.all([worker(),worker(),worker()]);await fs.writeFile(path,JSON.stringify(rows,null,2));
  console.log('CATEGORY',subject,count,'TOTAL',rows.length);
 }catch(e){console.log('CATEGORY_FAILED',cat,e.message);}await pause(300);
}
await fs.writeFile(path,JSON.stringify(rows,null,2));console.log('REVIEW_REQUIRED',rows.length);
