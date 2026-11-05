import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {createCanvas,loadImage} from '@napi-rs/canvas';
const app=new URL('../',import.meta.url),work=new URL('../photo-food-expansion/',app);
const rows=JSON.parse(await fs.readFile(new URL('downloaded.json',work),'utf8'));
const reviewed=new Set(),rejected=new Map(),overrides={};
for(const file of await fs.readdir(work))if(/^review-decisions.*\.json$/.test(file)){
 const d=JSON.parse(await fs.readFile(new URL(file,work),'utf8'));for(const [start,end]of d.reviewedRanges||[])for(let i=start;i<=end;i++)reviewed.add(i);
 for(const x of d.rejected||[])rejected.set(x.index,x.reason);Object.assign(overrides,d.overrides||{});
}
const output=new URL('assets/food-catalogue/',app);await fs.mkdir(output,{recursive:true});
const photoFoods=[],seenSources=new Set(),seenNames=new Set();
const simplified=JSON.parse(await fs.readFile(new URL('simplified-labels.json',work),'utf8').catch(()=>'{}'));
const categoryFor=(name,description)=>{
 const text=name+' '+description;
 const alcoholic=/葡萄酒|啤酒|米酒|黄酒|白酒|利口酒|威士忌|伏特加|白兰地|白蘭地|朗姆酒|杜松子酒|龙舌兰酒|雞尾酒|鸡尾酒|清酒|烧酒|拉克酒|发酵酒|alcohol|liqueur|liquor|\bspirits?\b|vodka|\brum\b|whisk[ey]*y|brandy|bourbon|\bgin\b|cognac|pastis|schnapps|aperitif|amaro|vermouth|absinthe|raki|arrack|cider|mead|\bsake\b|wine|beer|cocktail/i.test(text)&&! /non-alcoholic|alcohol-free|无酒精|無酒精/i.test(text);
 if(alcoholic&&! /汤|羹|炖|炖菜|蛋糕|馒头|饅頭|soup|stew|cake|sauce|braised|baked/i.test(text))return '17';
 if(/汤|羹|炖菜|披萨|漢堡|汉堡|三明治|沙拉|拌飯|盖饭|咖喱|咖哩|soup|stew|pizza|hamburger|sandwich|salad|curry/i.test(text))return '15';
 if(/冰淇淋|冰激凌|酸奶|奶酪|起司|乾酪|干酪|乳清|奶粉|炼乳|炼奶|牛奶|cheese|cream|yogurt|milk|kefir|skyr/i.test(text)&&! /黄油|黃油|butter/i.test(text))return '10';
 if(/茶|咖啡|果汁|汽水|苏打水|飲料|饮料|豆浆|豆漿|椰子水|beverage|drink|coffee|juice|tea blend/i.test(text))return '16';
 if(/葡萄酒|啤酒|酒精|鸡尾酒|雞尾酒|wine|beer|cocktail|liqueur/i.test(text))return '17';
 if(/蛋糕|饼干|餅乾|曲奇|甜点|甜點|糕点|糕點|布丁|泡芙|挞|撻|酥|巧克力|爆米花|薯片|糖果|小吃|cake|cookie|biscuit|pastry|dessert|confection|chocolate|pudding|popcorn|snack/i.test(text))return '14';
 if(/麵|面条|面包|麵包|馒头|饅頭|饼|餅|米饭|米飯|糯米|大米|稻米|米粉|燕麦|燕麥|小麦|小麥|大麦|大麥|荞麦|蕎麥|玉米|藜麦|藜麥|bread|noodle|rice|wheat|grain|cereal|pasta|flour|maize|barley|oat/i.test(text))return '01';
 if(/黄油|黃油|酥油|人造奶油|棕榈油|橄榄油|葵花油|butter|ghee|vegetable oil/i.test(text))return '19';
 if(/辣酱|辣醬|醬油|酱油|香料|调味|調味|醋|花椒|胡椒|肉桂|spice|seasoning|condiment|vinegar/i.test(text))return '20';
 if(/糖浆|糖漿|蜂蜜|砂糖|红糖|紅糖|果酱|果醬|蜜饯|蜜餞|honey|syrup|sugar|jam|preserve/i.test(text))return '18';
 if(/坚果|堅果|榛子|杏仁|核桃|腰果|花生|开心果|開心果|瓜子|芝麻|nuts?|seed|peanut/i.test(text))return '07';
 if(/豆腐|豆干|豆皮|豆类|豆類|大豆|毛豆|腐乳|tofu|bean|soy|tempeh|legume/i.test(text))return '03';
 if(/水果|果实|果實|柑橘|柚|橙|苹果|蘋果|梨|桃|李子|樱桃|櫻桃|草莓|蓝莓|藍莓|西瓜|木瓜|芒果|菠萝|菠蘿|葡萄干|葡萄乾|fruit|berry|berries|apricot|peach|pear|plum|grape|melon|apple|banana|citrus/i.test(text))return '06';
 if(/马铃薯|馬鈴薯|土豆|红薯|紅薯|甘薯|芋头|芋頭|木薯|淀粉|澱粉|potato|taro|cassava|starch/i.test(text))return '02';
 if(/蘑菇|香菇|菌菇|海带|海帶|海苔|紫菜|洋菜|mushroom|seaweed|agar/i.test(text))return '05';
 if(/蔬菜|白菜|菠菜|芹菜|黄瓜|黃瓜|南瓜|番茄|茄子|萝卜|蘿蔔|洋葱|洋蔥|葱|韭|蒜|姜|薑|秋葵|vegetable|cabbage|carrot|onion|garlic|ginger|lettuce|pepper|tomato|squash|pumpkin/i.test(text))return '04';
 if(/鸡蛋|雞蛋|鸭蛋|鴨蛋|鹌鹑蛋|鵪鶉蛋|水煮蛋|蛋白|蛋黄|蛋黃|egg/i.test(text))return '11';
 if(/鱼|魚|虾|蝦|蟹|贝|貝|蛤|牡蛎|牡蠣|鱿|魷|seafood|fish|shrimp|prawn|crab|salmon|tuna|squid|clam|oyster/i.test(text))return '12';
 if(/鸡|雞|鸭|鴨|鹅|鵝|火鸡|火雞|chicken|duck|goose|turkey|poultry/i.test(text))return '09';
 if(/肉|肠|腸|牛|猪|豬|羊|meat|pork|beef|lamb|sausage|ham|bacon/i.test(text))return '08';
 return '15';
};
const groups={'01':'staples','02':'staples','03':'protein','04':'vegetables','05':'vegetables','06':'fruit','07':'snacks','08':'protein','09':'protein','10':'dairy','11':'protein','12':'fish'};
function aliasesFor(row,name,category){
 const aliases=[row.name||row.subject||name,row.title.replace(/^File:/,'').replace(/\.[a-z]+$/i,'')];
 const text=[name,row.title,row.description||'',row.imageDescription||''].join(' ');
 if(category==='14'&& /饼干|曲奇|薄脆|威化|\b(?:cookies?|biscuits?|crackers?|wafers?)\b/i.test(text)&&! /蛋糕|酒|\bcake\b/i.test(name+' '+row.title))aliases.push('饼干','cookies','biscuits');
 if(['01','15'].includes(category)&& /面条|麵條|面食|意面|乌冬|烏冬|宽粉|寬粉|\b(?:noodles?|pasta|spaghetti|macaroni|udon|soba)\b/i.test(text))aliases.push('面条','面食','noodles');
 if(['01','15'].includes(category)&& /米饭|米飯|炒饭|炒飯|盖饭|蓋飯|拌饭|拌飯|\brice dish\b|\bfried rice\b|\bcooked rice\b/i.test(text))aliases.push('米饭','米饭类','rice');
 if(category==='09'&& /鸡|雞|\bchicken\b/i.test(text))aliases.push('鸡肉','鸡','chicken');
 if(category==='08'&& /牛肉|牛排|牛肋|\bbeef\b/i.test(text))aliases.push('牛肉','beef');
 if(category==='08'&& /猪|豬|\bpork\b/i.test(text))aliases.push('猪肉','pork');
 if(category==='12')aliases.push('海鲜','水产','seafood');
 if(category==='10'&& /奶酪|芝士|起司|乾酪|干酪|\bcheese\b/i.test(text))aliases.push('奶酪','芝士','起司','cheese');
 if(category==='02'&& /马铃薯|馬鈴薯|土豆|\bpotato(?:es)?\b/i.test(text)&&! /红薯|紅薯|甘薯|\bsweet potato/i.test(text))aliases.push('土豆','马铃薯','洋芋');
 if(category==='02'&& /红薯|紅薯|地瓜|甘薯|\bsweet potato/i.test(text))aliases.push('红薯','甘薯','地瓜');
 return [...new Set(aliases)];
}
async function add(row,path,key,name,category,identitySource){
 const canonical=decodeURIComponent(row.sourceUrl).replaceAll('_',' '),displayName=(simplified[name]||name).trim();if(seenSources.has(canonical)||seenNames.has(displayName))return;
 const im=await loadImage(fileURLToPath(path)),scale=Math.min(1,640/im.width,640/im.height);if(im.width<100||im.height<100)return;
 const canvas=createCanvas(Math.round(im.width*scale),Math.round(im.height*scale)),ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(im,0,0,canvas.width,canvas.height);
 const filename=createHash('sha256').update(canonical).digest('hex').slice(0,20)+'.jpg';await fs.writeFile(new URL(filename,output),await canvas.encode('jpeg',87));
 const image='/assets/food-catalogue/'+filename;
 const imageCredit={image,subject:displayName,title:row.title,author:row.author,attributionUrl:row.attributionUrl,sourceUrl:row.sourceUrl,license:row.license,licenseUrl:row.licenseUrl,retrievedAt:row.retrievedAt,modifications:'等比缩小至最长边640像素并压缩JPEG；保留原图食物主体，未生成或替换内容。',reviewStatus:'source-linked-visually-reviewed',imageNote:'真实食物照片；作者与许可见图片来源。'};
 photoFoods.push({key,name:displayName,aliases:aliasesFor(row,displayName,category),category,subcategory:'食材与菜式',group:groups[category]||'snacks',grams:100,state:({raw:'生食材',cooked:'熟制',spread:'酱状',canned:'罐装',roasted:'烘烤',dried:'干制',powder:'粉末',dish:'菜式'}[row.state]||'食物实拍；营养按具体配方与实际份量记录'),photoCatalogue:true,identitySource,source:null,nutrients:{},valueType:'identity-only',imageCredit});
 seenSources.add(canonical);seenNames.add(displayName);
}
for(let index=0;index<rows.length;index++){if(!reviewed.has(index)||rejected.has(index))continue;const row={...rows[index],...(overrides[index]||{})};const path=row.localExisting?new URL(row.localExisting.slice(1),app):new URL('downloads/'+row.filename,work);
 await add(row,path,'photo-'+row.qid,row.name,categoryFor(row.name,row.description),overrides[index]?.name?{name:'Wikimedia Commons 图片说明',url:row.sourceUrl,title:row.title,relatedWikidata:'https://www.wikidata.org/wiki/'+row.qid}:{name:'Wikidata',url:'https://www.wikidata.org/wiki/'+row.qid,qid:row.qid,title:rows[index].name});}
const additions=JSON.parse(await fs.readFile(new URL('src/data/foodPhotoAdditions.json',app),'utf8'));
for(const row of additions){const name=row.subject;await add(row,new URL(row.image.slice(1),app),'photo-source-'+createHash('sha256').update(row.sourceUrl).digest('hex').slice(0,12),name,row.category||categoryFor(name,''),{name:'Wikimedia Commons 图片说明',url:row.sourceUrl,title:row.title});}
await fs.writeFile(new URL('src/data/photo-foods.json',app),JSON.stringify(photoFoods,null,2)+'\n');
await fs.writeFile(new URL('docs/food-data/photo-catalogue-review.json',app),JSON.stringify({downloaded:rows.length,reviewed:reviewed.size,rejected:[...rejected].map(([index,reason])=>({index,reason})),publishedPhotoFoods:photoFoods.length,distinctSourcePhotos:seenSources.size,nutritionPolicy:'New photograph subjects have no inferred nutrients; original nutrient reference IDs preserved independently.'},null,2));
console.log(JSON.stringify({downloaded:rows.length,reviewed:reviewed.size,rejected:rejected.size,published:photoFoods.length}));
