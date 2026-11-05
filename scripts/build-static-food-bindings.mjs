// Explicit local photo bindings. No network search, family-prefix inference,
// or category-photo fallback participates in this build.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ALL_FOODS} from '../src/data/catalogue.js';

const app=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const direct=JSON.parse(await fs.readFile(path.join(app,'src/data/foodPhotoSources.json'),'utf8'));
const gallery=JSON.parse(await fs.readFile(path.join(app,'src/data/foodGallerySources.json'),'utf8'));
const additions=JSON.parse(await fs.readFile(path.join(app,'src/data/foodPhotoAdditions.json'),'utf8').catch(()=>'[]'));
const rejected=new Set(['brown-rice','usda-16033','usda-16057','usda-11117','usda-11445','usda-11365','usda-11510','usda-11519','usda-20027','usda-20032','usda-20115','usda-20117','usda-16002','usda-16109','usda-11446','usda-15237','usda-15015','usda-15151','usda-03099','usda-03194','usda-09236','usda-12061','usda-12087','usda-16070','usda-16427','usda-10061','usda-05098','usda-05142','usda-05220','usda-15159','usda-01001']);
const sources=new Map(direct.filter(p=>!p.generated&&!rejected.has(p.foodId)).map(p=>[p.foodId,p]));
const photo=id=>sources.get(id);
const galleryPhoto=title=>gallery.find(p=>p.title.replace(/^File:/,'')===title);
const addition=(subjectId,state)=>additions.find(p=>p.subjectId===subjectId&&(!state||p.state===state));
sources.set('kiwi',{...galleryPhoto('Kiwifruit cross section.jpg'),foodId:'kiwi'});
sources.set('usda-09037',{...galleryPhoto('Avocado Hass - single and halved.jpg'),foodId:'usda-09037'});
const rules=[];
const add=(id,test,source)=>{if(!source)throw new Error('Missing explicit photo: '+id);rules.push({id,test,source});};
const raw=s=>/\bRAW\b/.test(s)&&!/\b(?:JUC|JUICE|NECTAR|PUREE|SAUCE|SAU|SEEDS|LEAVES|FLOWERS|POWDER|FLAKES|FLOUR|DEHYD|DRIED|CND|FROZEN|FRZ|CKD|COOKED)\b/.test(s);
const cooked=s=>/\b(?:CKD|COOKED|RSTD|ROASTED|HARD-BOILED)\b/.test(s);
const head=s=>s.split(',')[0].trim();

// These rules name the actual source head. For example CORNED BEEF, FISH OIL,
// COFFEECAKE, HONEY ROLL SAUSAGE and LAMBSQUARTERS cannot hit another food.
const rawProfiles=[
 ['SPINACH','spinach'],['LOTUS ROOT','lotus-root'],['BROCCOLI','broccoli'],
 ['CUCUMBER','cucumber'],['CARROTS','carrot'],['BANANAS','banana'],['GRAPES','grapes'],
 ['BLUEBERRIES','blueberry'],['MANGOS','mango'],['PUMMELO','pomelo'],['PINEAPPLE','usda-09266'],
 ['CHERRIES','usda-09070'],['AVOCADOS','usda-09037'],['LEMONS','usda-09150'],
 ['RASPBERRIES','usda-09302'],['STRAWBERRIES','usda-09316'],['ONIONS','usda-11282'],
 ['EGGPLANT','usda-11209'],['CAULIFLOWER','usda-11135'],['CELERY','usda-11143'],
 ['CASSAVA','usda-11134'],['PISTACHIO NUTS','usda-12151'],['SWEET POTATO','sweet-potato'],
 ['POTATOES','potato'],['SQUID','usda-15175'],['CARP','usda-15008'],
];
for(const [name,id]of rawProfiles)add('raw:'+name,s=>head(s)===name&&raw(s),photo(id));
add('raw:apple-with-skin',s=>head(s)==='APPLES'&&raw(s)&&!/WITHOUT SKIN|WO.?SKN/.test(s),photo('apple'));
add('raw:orange',s=>head(s)==='ORANGES'&&raw(s),photo('orange'));
add('raw:pear',s=>head(s)==='PEARS'&&raw(s),photo('pear'));
add('raw:red-watermelon',s=>head(s)==='WATERMELON'&&raw(s),photo('watermelon'));
add('raw:green-kiwi',s=>head(s)==='KIWIFRUIT'&&raw(s)&&!/SUNGOLD|GOLD/.test(s),photo('kiwi'));
add('raw:cantaloupe',s=>head(s)==='MELONS'&&raw(s)&&/CANTALOUPE/.test(s),photo('usda-09181'));
add('raw:honeydew',s=>head(s)==='MELONS'&&raw(s)&&/HONEYDEW/.test(s),photo('usda-09184'));
add('raw:grapefruit-pink-red',s=>head(s)==='GRAPEFRUIT'&&raw(s)&&/PINK|RED/.test(s),photo('usda-09112'));
add('raw:red-tomato',s=>head(s)==='TOMATOES'&&raw(s)&&/RED/.test(s),photo('tomato'));
add('raw:green-bell-pepper',s=>head(s)==='PEPPERS'&&raw(s)&&/SWT,GRN/.test(s),photo('usda-11333'));
add('raw:red-bell-pepper',s=>head(s)==='PEPPERS'&&raw(s)&&/SWT,RED/.test(s),photo('usda-11821'));
add('raw:napa-cabbage',s=>head(s)==='CABBAGE'&&raw(s)&&/PE-TSAI/.test(s),photo('cabbage'));
add('raw:bok-choy',s=>head(s)==='CABBAGE'&&raw(s)&&/PAK-CHOI/.test(s),photo('usda-11116'));
add('raw:round-cabbage',s=>head(s)==='CABBAGE'&&raw(s)&&!/CHINESE|RED/.test(s),photo('usda-11109'));
add('raw:romaine',s=>head(s)==='LETTUCE'&&raw(s)&&/ROMAINE|COS/.test(s),photo('usda-11251'));
add('raw:shiitake',s=>head(s)==='MUSHROOMS'&&raw(s)&&/SHIITAKE/.test(s),photo('usda-11238'));
add('raw:white-mushroom',s=>head(s)==='MUSHROOMS'&&raw(s)&&/WHITE/.test(s),photo('usda-11260'));
add('raw:enoki',s=>head(s)==='MUSHROOMS'&&raw(s)&&/ENOKI/.test(s),photo('usda-11950'));
add('raw:oyster-mushroom',s=>head(s)==='MUSHROOMS'&&raw(s)&&/OYSTER/.test(s),photo('usda-11987'));
add('raw:raw-salmon-fillets',s=>head(s)==='SALMON'&&raw(s),photo('usda-15236'));
add('raw:pork-tenderloin',s=>head(s)==='PORK'&&raw(s)&&/TENDERLOIN/.test(s),photo('usda-10218'));
add('raw:chicken-thigh',s=>head(s)==='CHICKEN'&&raw(s)&&/THIGH/.test(s),photo('usda-05096'));
add('raw:ground-beef',s=>head(s)==='BEEF'&&raw(s)&&/GROUND/.test(s),photo('usda-23562'));
add('cooked:beef-patty',s=>head(s)==='BEEF'&&cooked(s)&&/PATTY/.test(s)&&!/BREADED|FRIED/.test(s),photo('usda-23564'));
add('cooked:chicken-breast',s=>head(s)==='CHICKEN'&&cooked(s)&&/BREAST/.test(s)&&!/SKN|SKIN|FRIED|BREADED|BATTER/.test(s),photo('usda-05064'));
add('cooked:boiled-egg',s=>head(s)==='EGG'&&/HARD-BOILED/.test(s),photo('usda-01129'));
add('raw:egg-white',s=>head(s)==='EGG'&&/WHITE,RAW/.test(s)&&!/FRZ|DRIED/.test(s),photo('usda-01124'));
add('raw:egg-yolk',s=>head(s)==='EGG'&&/YOLK,RAW/.test(s)&&!/FRZ|DRIED/.test(s),photo('usda-01125'));
add('raw:whole-egg',s=>head(s)==='EGG'&&/WHL,RAW,FRSH/.test(s),photo('usda-01123'));
add('raw:quail-egg',s=>head(s)==='EGG'&&/QUAIL.*RAW/.test(s),photo('usda-01140'));
add('white-plain-fluid-milk',s=>head(s)==='MILK'&&/FLUID|WHL|NONFAT|SKIM|RED FAT|LOFAT/.test(s)&&!/CHOC|STRAWBERRY|DRY|CND|EVAP|COND|FLAV|FILLED|BUTTERMILK|ACID|CULTURED/.test(s),photo('usda-01174'));
add('plain-yogurt',s=>head(s)==='YOGURT'&&/PLN/.test(s)&&!/FRUIT|CHOC|STRAWBERRY|VANILLA|DRINK/.test(s),photo('usda-01116'));
add('cheddar-cheese',s=>head(s)==='CHEESE'&&/CHEDDAR/.test(s)&&!/SPR[E]?A?D|IMITATION|PROCESSED/.test(s),photo('usda-01009'));
add('soy-sauce',s=>/^SOY SAU MADE FROM SOY/.test(s),photo('usda-16123'));
add('plain-wheat-flour',s=>/^WHEAT FL(?:OU)?R/.test(s)&&/WHITE,ALL.PURPOSE/.test(s),photo('usda-20481'));
add('cooked-white-rice',s=>head(s)==='RICE'&&/WHITE/.test(s)&&cooked(s)&&!/GLUTINOUS|WILD/.test(s),photo('rice'));
add('cooked-glutinous-rice',s=>head(s)==='RICE'&&/GLUTINOUS/.test(s)&&cooked(s),photo('usda-20055'));
add('cooked-barley',s=>head(s)==='BARLEY'&&cooked(s),photo('usda-20006'));
add('cooked-quinoa',s=>head(s)==='QUINOA'&&cooked(s),photo('usda-20137'));
add('cooked-plain-oatmeal',s=>head(s)==='CEREALS'&&/OATS/.test(s)&&cooked(s)&&!/FLAV|FRUIT/.test(s),photo('oats'));
add('dry-plain-oats',s=>head(s)==='OATS',photo('usda-20038'));
add('white-bread',s=>head(s)==='BREAD'&&/^BREAD,WHITE,COMMLY PREP/.test(s),photo('usda-18069'));
add('whole-wheat-bread',s=>head(s)==='BREAD'&&/WHOLE.WHEAT/.test(s)&&!/TOAST|CRUMB|FROZEN|FRZ/.test(s),photo('whole-wheat-bread'));
add('plain-air-popcorn',s=>head(s)==='POPCORN'&&/AIR.POPPED/.test(s),photo('usda-19034'));
add('plain-potato-chips',s=>head(s)==='POTATO CHIPS'&&/PLAIN/.test(s),photo('usda-19411'));
add('butter-cookies',s=>head(s)==='COOKIES'&&/BUTTER,/.test(s)&&!/PEANUT/.test(s),photo('usda-18421'));
add('pound-cake',s=>head(s)==='CAKE'&&/POUND/.test(s)&&!/DRY MIX/.test(s),photo('usda-18120'));
add('vanilla-ice-cream',s=>head(s)==='ICE CREAMS'&&/VANILLA/.test(s)&&!/SANDWICH|BAR|CHOC|STRAWBERRY/.test(s),photo('usda-19095'));
add('milk-chocolate',s=>head(s)==='CANDIES'&&/^CANDIES,MILK CHOC/.test(s)&&!/NUT|CARAMEL|CRISP|HONEY|TOBLERONE/.test(s),photo('usda-19120'));
add('white-sugar',s=>head(s)==='SUGARS'&&/GRANULATED/.test(s),photo('usda-19335'));
add('brown-sugar',s=>head(s)==='SUGARS'&&/BROWN/.test(s),photo('usda-19334'));
add('honey',s=>head(s)==='HONEY',photo('usda-19296'));
add('table-salt',s=>head(s)==='SALT'&&/TABLE/.test(s),photo('usda-02047'));
add('black-pepper',s=>head(s)==='PEPPER'&&/BLACK/.test(s),photo('usda-02030'));
add('olive-oil',s=>head(s)==='OIL'&&/^OIL,OLIVE,/.test(s),photo('usda-04053'));
add('soybean-oil',s=>head(s)==='OIL'&&/^OIL,SOYBN,/.test(s)&&!/HYDROG/.test(s),photo('usda-04044'));
add('sesame-oil',s=>head(s)==='OIL'&&/^OIL,SESAME,/.test(s),photo('usda-04058'));
add('canola-oil',s=>head(s)==='OIL'&&/^OIL,CANOLA/.test(s),photo('usda-04582'));
add('apple-cider-vinegar',s=>head(s)==='VINEGAR'&&/CIDER/.test(s),photo('usda-02048'));
add('plain-black-coffee',s=>head(s)==='BEVERAGES'&&/^BEVERAGES,COFFEE,BREWED/.test(s)&&!/MILK|SUGAR|FLAV|ESPRESSO/.test(s),photo('usda-14209'));
add('brewed-green-tea',s=>head(s)==='BEVERAGES'&&/TEA,GRN,BREWED/.test(s),photo('usda-14278'));
add('brewed-black-tea',s=>head(s)==='BEVERAGES'&&/TEA,BLACK,BREWED/.test(s),photo('usda-14355'));
add('fresh-orange-juice',s=>/^ORANGE (JUICE|JUC),/.test(s)&&/RAW|FRSH/.test(s),photo('usda-09206'));
add('red-wine',s=>head(s)==='ALCOHOLIC BEV'&&/WINE,TABLE,RED/.test(s),photo('usda-14096'));
add('white-wine',s=>head(s)==='ALCOHOLIC BEV'&&/WINE,TABLE,WHITE/.test(s),photo('usda-14106'));

const rawGalleryProfiles=[
 ['APRICOTS','Apricot whole444.jpg'],['GUAVAS','Guava.jpg'],['NECTARINES','Nectarine on white.jpg'],
 ['PAPAYAS','Papaya - longitudinal section.jpg'],['PASSION-FRUIT','Passion fruit.jpg'],
 ['PERSIMMONS','Fuyu Persimmon (Diospyros Kaki).jpg'],['TANGERINES','Mandarin orange. Libya.jpg'],
 ['ARTICHOKES','Artichoke stack.JPG'],['ASPARAGUS','Asparagus-Bundle.jpg'],
 ['BRUSSELS SPROUTS','Brussels sprout.png'],['GINGER ROOT','Ginger Root.jpg'],
 ['KOHLRABI','Pink Kohlrabi.jpg'],['RUTABAGAS','Rutabaga.jpg'],['TURNIPS','Nice turnip.jpg'],
];
for(const [name,title]of rawGalleryProfiles)add('raw:'+name,s=>head(s)===name&&raw(s),galleryPhoto(title));
add('raw:pomegranate',s=>head(s)==='POMEGRANATES'&&raw(s),galleryPhoto('An opened pomegranate.JPG'));
add('dry:barley',s=>head(s)==='BARLEY'&&!cooked(s)&&!/FLOUR|MALT/.test(s),galleryPhoto('Barley Seeds.jpg'));
add('dry:bulgur',s=>head(s)==='BULGUR'&&/DRY/.test(s),galleryPhoto('Bulgur.jpg'));
add('dried:raisins',s=>head(s)==='RAISINS',galleryPhoto('Sunmaid-Raisin-Pile.jpg'));
add('raw:black-bean',s=>head(s)==='BEANS'&&/BLACK,|BLACK TURTLE/.test(s)&&raw(s)&&!/SPROUT/.test(s),galleryPhoto('Black Turtle Bean.jpg'));
add('cooked:plain-waffle',s=>/^WAFFLES?,PLN/.test(s)&&!/DRY MIX/.test(s),galleryPhoto('Waffle DSC00575.jpg'));
add('baked:plain-vanilla-muffin',s=>/^MUFFINS?,PLN/.test(s)&&!/DRY MIX/.test(s),galleryPhoto('Plain vanilla muffin in Tuntorp.jpg'));
add('cooked:macaroni-cheese',s=>/^MACARONI (?:&|OR NOODLES W\/) CHS/.test(s)&&/\bPREP\b/.test(s)&&!/DRY|UNPREP/.test(s),galleryPhoto('Boxed Macaroni and Cheese in Two Bowls.jpg'));
add('dry:raw-kidney-bean',s=>head(s)==='BEANS'&&/KIDNEY/.test(s)&&/\bRAW\b/.test(s)&&!/SPROUT/.test(s),direct.find(p=>p.foodId==='usda-16033'));
add('dry:raw-chickpea',s=>/^CHICKPEAS/.test(s)&&/\bRAW\b/.test(s)&&!/SPROUT/.test(s),direct.find(p=>p.foodId==='usda-16057'));
if(additions.length){
 add('spread:cashew-butter',s=>/^(?:NUTS,)?CASHEW BUTTER,/.test(s),addition('cashew-butter','spread'));
 add('roasted:cashew-nuts',s=>/^(?:NUTS,)?CASHEW NUTS,/.test(s)&&/\bRSTD\b/.test(s),addition('roasted-cashew','roasted'));
 add('spread:smooth-peanut-butter',s=>/^PEANUT BUTTER(?: W\/ OMEGA-3)?,/.test(s)&&!/(?:CHUNK|CRUNCH)/.test(s),addition('peanut-butter','spread'));
 add('spread:plain-almond-butter',s=>/^(?:NUTS,)?ALMOND BUTTER,/.test(s),addition('almond-butter','spread'));
 add('powder:garlic',s=>head(s)==='GARLIC POWDER',addition('garlic-powder','powder'));
 add('liquid:canned-coconut-milk',s=>/^(?:NUTS,)?COCONUT MILK,/.test(s)&&/\bCND\b/.test(s)&&!/DRY|POWDER/.test(s),addition('coconut-milk','liquid'));
 add('unspecified:pecan',s=>head(s)==='PECANS'&&!/RSTD|ROAST|CAND|SUGAR/.test(s),addition('pecan-nuts','nuts-unspecified'));
 add('unspecified:hazelnut',s=>head(s)==='HAZELNUTS OR FILBERTS'&&!/RSTD|ROAST|BLANCH/.test(s),addition('hazelnuts','nuts-unspecified'));
}

const bindings=[],gaps=[];
for(const food of ALL_FOODS){
 const description=String(food.source?.description||'').toUpperCase();
 let source=sources.get(food.key),rule=source?'existing-reviewed-food-id':null;
 if(!source){const hit=rules.find(r=>r.test(description));if(hit){source=hit.source;rule=hit.id;}}
 if(!source){gaps.push({foodId:food.key,name:food.name,description:food.source?.description||'',family:food.family||null,state:food.state});continue;}
 const local=path.resolve(app,'.'+source.image);if(!local.startsWith(app+path.sep))throw new Error('Photo outside project');
 await fs.access(local);
 bindings.push({...source,foodId:food.key,reviewStatus:'bound-local-photo',bindingRule:rule,imageNote:'食物外观照片；营养数值以本条目对应的成分样本和食用重量为准。'});
}
await fs.writeFile(path.join(app,'src/data/foodPhotoBindings.json'),JSON.stringify(bindings,null,2)+'\n');
const byHead={};for(const g of gaps){const key=g.description.split(',')[0]||g.name;(byHead[key]??=[]).push(g);}
const report={createdAt:new Date().toISOString(),totalFoods:ALL_FOODS.length,boundFoods:bindings.length,unboundFoods:gaps.length,uniqueImages:new Set(bindings.map(p=>p.image)).size,uniqueSources:new Set(bindings.map(p=>p.sourceUrl)).size,matchingPolicy:'Explicit source-head, preparation-state and form rules; shared appearance does not mean the photo documents the USDA nutrient specimen, brand, salt or portion.',visualReview:{method:'Viewed eight numbered contact sheets of 155 unique first-pass images and one sheet of 12 replacements/additions; removed mismatched cooked/dry/raw images and mixed-rice substitution.',sheets:['sheet-000.jpg','sheet-020.jpg','sheet-040.jpg','sheet-060.jpg','sheet-080.jpg','sheet-100.jpg','sheet-120.jpg','sheet-140.jpg','new-sheet.jpg'],excludedExistingFoodIds:[...rejected]},gapsByActualSourceHead:byHead};
await fs.writeFile(path.resolve(app,'../../static-photo-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({totalFoods:report.totalFoods,boundFoods:report.boundFoods,unboundFoods:report.unboundFoods,uniqueImages:report.uniqueImages}));
