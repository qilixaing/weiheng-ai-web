import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const app=new URL('../',import.meta.url),out=new URL('../article-photo-expansion/',app);
await fs.mkdir(new URL('downloads/',out),{recursive:true});
const targets=`
10|全脂牛奶|Milk
10|炼乳|Condensed milk
10|淡炼乳|Evaporated milk
10|奶粉|Powdered milk
10|开菲尔|Kefir
10|酸奶|Yogurt
10|希腊酸奶|Strained yogurt
10|冰岛酸奶|Skyr
10|稀奶油|Cream
10|打发奶油|Whipped cream
10|酸奶油|Sour cream
10|凝脂奶油|Clotted cream
19|黄油|Butter
19|酥油|Ghee
19|人造黄油|Margarine
10|蓝纹奶酪|Blue cheese
10|布里奶酪|Brie
10|卡芒贝尔奶酪|Camembert
10|切达奶酪|Cheddar cheese
10|科尔比奶酪|Colby cheese
10|农家奶酪|Cottage cheese
10|奶油奶酪|Cream cheese
10|伊顿奶酪|Edam cheese
10|菲达奶酪|Feta
10|丰蒂娜奶酪|Fontina
10|高达奶酪|Gouda cheese
10|格鲁耶尔奶酪|Gruyère cheese
10|林堡奶酪|Limburger
10|蒙特雷杰克奶酪|Monterey Jack
10|马苏里拉奶酪|Mozzarella
10|蒙斯特奶酪|Muenster cheese
10|纽沙特尔奶酪|Neufchâtel cheese
10|帕尔马奶酪|Parmesan
10|普罗沃洛内奶酪|Provolone
10|乳清奶酪|Ricotta
10|罗马诺奶酪|Romano cheese
10|洛克福奶酪|Roquefort
10|瑞士奶酪|Swiss cheese (North America)
10|提尔西特奶酪|Tilsit cheese
10|利德尔克兰茨奶酪|Liederkranz cheese
10|美式加工奶酪|American cheese
10|羊奶奶酪|Goat cheese
10|羊乳奶酪|Sheep milk cheese
10|羊奶|Goat milk
14|美式司康饼|Biscuit (bread)
14|曲奇|Cookie
14|巧克力豆曲奇|Chocolate chip cookie
14|布朗尼|Chocolate brownie
14|黄油酥饼|Shortbread
14|糖霜曲奇|Sugar cookie
14|燕麦葡萄干曲奇|Oatmeal raisin cookie
14|威化饼|Wafer
14|姜味脆饼|Ginger snap
14|花生酱曲奇|Peanut butter cookie
14|蛋白霜饼|Meringue
14|椰丝小饼|Macaroon
14|幸运饼干|Fortune cookie
14|手指饼|Ladyfinger (biscuit)
14|全麦消化饼|Graham cracker
14|苏打饼干|Saltine cracker
14|黑麦脆饼|Crispbread
14|碱水脆饼|Pretzel
14|天使蛋糕|Angel food cake
14|磅蛋糕|Pound cake
14|海绵蛋糕|Sponge cake
14|戚风蛋糕|Chiffon cake
14|巧克力蛋糕|Chocolate cake
14|咖啡蛋糕|Coffee cake
14|水果蛋糕|Fruitcake
14|姜饼|Gingerbread
14|芝士蛋糕|Cheesecake
14|胡萝卜蛋糕|Carrot cake
14|杯子蛋糕|Cupcake
14|奶油泡芙|Profiterole
14|蛋挞|Egg tart
14|玛芬|Muffin
14|华夫饼|Waffle
14|薄煎饼|Pancake
01|白面包|White bread
01|全麦面包|Whole wheat bread
01|黑麦面包|Rye bread
01|酸面包|Sourdough
01|皮塔饼|Pita
01|馕饼|Naan
01|玉米薄饼|Corn tortilla
01|小麦薄饼|Flour tortilla
01|贝果|Bagel
01|英式松饼|English muffin
01|玉米面包|Cornbread
01|法棍|Baguette
01|汉堡面包|Hamburger bun
01|蒜香面包|Garlic bread
01|面包糠|Bread crumbs
01|燕麦片|Rolled oats
01|燕麦粥|Porridge
01|干燕麦粒|Oat
01|玉米片早餐谷物|Corn flakes
01|格兰诺拉麦片|Granola
01|混合果仁麦片|Muesli
01|膨化大米|Puffed rice
01|膨化小麦|Puffed grain
14|谷物棒|Cereal bar
14|米饼|Rice cake
14|爆米花|Popcorn
14|薯片|Potato chip
14|玉米片|Corn chip
14|玉米薄饼脆片|Tortilla chip
01|小麦面粉|Wheat flour
01|大米粉|Rice flour
01|玉米粉|Cornmeal
02|玉米淀粉|Corn starch
01|荞麦粉|Buckwheat flour
01|燕麦麸|Oat bran
01|小麦麸|Wheat bran
01|小麦胚芽|Wheat germ
01|大麦|Barley
01|荞麦|Buckwheat
01|布格麦|Bulgur
01|库斯库斯|Couscous
01|小米|Millet
01|藜麦|Quinoa
01|高粱|Sorghum bicolor
01|黑麦|Rye
01|黑米饭|Black rice
01|白米饭|Cooked rice
01|糯米饭|Glutinous rice
01|意大利面|Pasta
01|通心粉|Macaroni
01|细意大利面|Spaghetti
01|蛋面|Egg noodles
01|米粉|Rice noodles
01|粉丝|Cellophane noodles
01|日式荞麦面|Soba
01|日式素面|Sōmen
01|乌冬面|Udon
15|千层面|Lasagne
15|奶酪通心粉|Macaroni and cheese
15|肉酱意面|Spaghetti bolognese
15|意式饺子|Ravioli
15|方便面|Instant noodles
10|香草冰淇淋|Vanilla ice cream
10|巧克力冰淇淋|Chocolate ice cream
10|草莓冰淇淋|Strawberry ice cream
10|冰冻酸奶|Frozen yogurt
14|雪葩|Sorbet
14|牛奶巧克力|Milk chocolate
14|黑巧克力|Dark chocolate
14|白巧克力|White chocolate
14|可可粉|Cocoa solids
16|热可可|Hot chocolate
16|豆浆|Soy milk
16|杏仁奶|Almond milk
16|米乳|Rice milk
16|燕麦奶|Oat milk
16|椰奶|Coconut milk
16|椰子水|Coconut water
16|黑咖啡|Coffee
16|绿茶|Green tea
16|红茶|Black tea
16|抹茶|Matcha
16|可乐|Cola
16|运动饮料|Sports drink
16|能量饮料|Energy drink
16|橙汁|Orange juice
16|苹果汁|Apple juice
16|胡萝卜汁|Carrot juice
16|番茄汁|Tomato juice
16|葡萄汁|Grape juice
16|西柚汁|Grapefruit juice
16|柠檬水|Lemonade
16|酸橙水|Limeade
16|蔓越莓汁|Cranberry juice
16|菠萝汁|Pineapple juice
16|西梅汁|Prune juice
17|啤酒|Beer
17|红葡萄酒|Red wine
17|白葡萄酒|White wine
18|白砂糖|Sugar
18|红糖|Brown sugar
18|糖粉|Powdered sugar
18|枫糖浆|Maple syrup
18|蜂蜜|Honey
18|果酱|Jam
18|蜜饯|Candied fruit
15|饺子|Jiaozi
01|包子|Baozi
01|馒头|Mantou
01|粥|Congee
01|粽子|Zongzi
15|炒饭|Fried rice
15|宫保鸡丁|Kung Pao chicken
15|麻婆豆腐|Mapo tofu
15|馄饨|Wonton
15|春卷|Spring roll
15|寿司|Sushi
15|番茄炒蛋|Stir-fried tomato and scrambled eggs
11|蒸蛋|Chinese steamed eggs
01|肠粉|Rice noodle roll
14|汤圆|Tangyuan (food)
01|油条|Youtiao
01|葱油饼|Cong you bing
15|炒面|Chow mein
15|热干面|Hot dry noodles
15|火锅|Hot pot
15|麻辣烫|Malatang
15|肉夹馍|Roujiamo
15|凉皮|Liangpi
01|煎饼|Jianbing
08|回锅肉|Twice-cooked pork
08|糖醋里脊|Sweet and sour pork
08|红烧肉|Red braised pork belly
15|煲仔饭|Claypot rice
03|毛豆|Edamame
15|担担面|Dandan noodles
15|牛肉面|Beef noodle soup
15|螺蛳粉|Luosifen
15|酸辣粉|Hot and sour noodles
15|汉堡|Hamburger
15|三明治|Sandwich
15|芝士披萨|Pizza Margherita
15|意式辣肠披萨|Pepperoni pizza
15|蛋卷|Egg roll
`;
const rows=targets.trim().split('\n').map(x=>{const[category,subject,article]=x.split('|');return{category,subject,article}});
const clean=x=>String(x||'').replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
async function json(url){const r=await fetch(url,{headers:{'User-Agent':'WeihengFoodPhotos/1.0 (https://weihengai.top; open-license local educational library)'},signal:AbortSignal.timeout(30000)});if(!r.ok)throw new Error('HTTP '+r.status);return r.json();}
const manifestPath=new URL('downloaded.json',out);let saved=JSON.parse(await fs.readFile(manifestPath,'utf8').catch(()=>'[]'));let fails=[];
for(let i=0;i<rows.length;i+=25){
 const batch=rows.slice(i,i+25).filter(x=>!saved.some(y=>y.article===x.article));if(!batch.length)continue;
 try{
 const p=new URLSearchParams({action:'query',format:'json',redirects:'1',prop:'pageimages',piprop:'name|original',titles:batch.map(x=>x.article).join('|')});
 const data=await json('https://en.wikipedia.org/w/api.php?'+p);let pages=Object.values(data.query?.pages||{});
 const redirects=new Map((data.query?.redirects||[]).map(x=>[x.from,x.to]));const normalized=new Map((data.query?.normalized||[]).map(x=>[x.from,x.to]));
 const mapped=batch.flatMap(item=>{const name=redirects.get(normalized.get(item.article)||item.article)||normalized.get(item.article)||item.article;const page=pages.find(x=>x.title===name);return page?.pageimage?[{...item,file:'File:'+page.pageimage}]:[]});
 if(!mapped.length)continue;
 const q=new URLSearchParams({action:'query',format:'json',prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'640',titles:mapped.map(x=>x.file).join('|')});
 const commons=await json('https://commons.wikimedia.org/w/api.php?'+q);const files=Object.values(commons.query?.pages||{});
 for(const item of mapped){try{const page=files.find(x=>x.title===item.file),info=page?.imageinfo?.[0],m=info?.extmetadata||{},license=clean(m.LicenseShortName?.value);if(!info||! /^(CC0|CC BY(?:-SA)? |Public domain|PDM)/.test(license)|| /\b(NC|ND)\b/.test(license))continue;
 const r=await fetch(info.thumburl||info.url,{signal:AbortSignal.timeout(25000)});if(!r.ok)throw new Error('image HTTP '+r.status);const bytes=new Uint8Array(await r.arrayBuffer());if(bytes.length<1500||bytes.length>6000000)continue;
 const filename=createHash('sha256').update(info.descriptionurl).digest('hex').slice(0,20)+'.jpg';await fs.writeFile(new URL('downloads/'+filename,out),bytes);
 saved.push({...item,title:page.title,author:clean(m.Artist?.value),sourceUrl:info.descriptionurl,license,licenseUrl:clean(m.LicenseUrl?.value)||'https://commons.wikimedia.org/wiki/Commons:Public_domain',filename,description:clean(m.ImageDescription?.value),retrievedAt:new Date().toISOString().slice(0,10)});await fs.writeFile(manifestPath,JSON.stringify(saved,null,2));
 }catch(e){fails.push({article:item.article,error:e.message});}}
 console.log(JSON.stringify({batch:i,downloaded:saved.length}));
 }catch(e){console.log(JSON.stringify({batch:i,error:e.message}));fails.push({batch:i,error:e.message});}
}
await fs.writeFile(new URL('failures.json',out),JSON.stringify(fails,null,2));console.log(JSON.stringify({downloaded:saved.length,targets:rows.length}));
