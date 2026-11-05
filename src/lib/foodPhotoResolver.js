const photoRequests = new Map();
const failedUntil = new Map();
const rejectedTitle = /\b(logo|map|diagram|chart|stamp|flag|flower|blossom|orchard|tree|leaves|seedling|plantation|harvest|field|statue|sculpture|painting|drawing|illustration|label|mascot|cartoon|molecule|structure|portrait|festival|parade|advertisement|package|packaging|restaurant|shop|supermarket|factory|costume|museum|computer|company|phone|device|brand|event|mayor|councillor|council|speaker|speaks|speech|conference|meeting|gathering|ceremony|inauguration|officials)\b/i;
const blockedLicense = /\b(NC|ND|non.?commercial|no.?derivatives)\b/i;
const goodLicense = /^(CC0|CC BY(?:-SA)?(?:\s|$)|Public domain|PDM|PD[-\s])/i;
const englishTerms = {
  '大蒜':'Garlic', '鸭肉':'Duck', '鹅肉':'Goose', '火鸡肉':'Turkey', '鱼类':'Fish',
  '牛肉':'Beef', '猪肉':'Pork', '蜂蜜':'Honey', '稻米/米饭':'Rice', '黑莓':'Blackberry',
  '椰枣':'Date fruit', '青柠':'Lime fruit', '花生':'Peanut', '小米/黍':'Millet',
  '燕麦':'Oat', '小麦':'Wheat', '黑麦':'Rye', '高粱':'Sorghum', '腰果':'Cashew',
  '栗子':'Chestnut', '椰子':'Coconut', '榛子':'Hazelnut', '开心果':'Pistachio', '腰果':'Cashew nuts',
  '核桃':'Walnut', '碧根果':'Pecan', '夏威夷果':'Macadamia', '鲭鱼':'Mackerel',
  '沙丁鱼':'Sardine', '鳟鱼':'Trout', '金枪鱼':'Tuna', '鳕鱼':'Cod', '鲱鱼':'Herring',
  '羊肉':'Lamb', '小牛肉':'Veal', '冰淇淋':'Ice cream', '披萨':'Pizza', '爆米花':'Popcorn',
  '糖果':'Candy', '曲奇':'Cookie', '蛋糕':'Cake', '黄油':'Butter', '奶油':'Cream',
  '香辛料':'Spice', '酱料':'Sauce', '醋':'Vinegar', '食用油':'Cooking oil',
  '糖浆':'Syrup', '沙拉酱':'Salad dressing', '食用种子':'Edible seeds',
  '鸡胸肉':'Chicken breast', '鸡肉':'Chicken', '鸡蛋':'Egg', '白菜':'Chinese cabbage',
  '燕麦':'Oat', '燕麦片':'Rolled oats', '豆腐':'Tofu', '香菇':'Shiitake mushroom',
  '大米':'Rice', '米饭':'Cooked rice', '土豆':'Potato', '红薯':'Sweet potato',
  '西红柿':'Tomato', '番茄':'Tomato', '黄瓜':'Cucumber', '菠菜':'Spinach',
  '西兰花':'Broccoli', '苹果':'Apple', '香蕉':'Banana', '鸡胸':'Chicken breast',
  '面包':'Bread', '牛奶':'Milk', '酸奶':'Yogurt', '三文鱼':'Salmon', '虾':'Shrimp', '玉米':'Corn', '马铃薯':'Potato', '哈密瓜':'Hami melon', '蓝莓':'Blueberry', '芒果':'Mango', '火龙果':'Dragon fruit', '桃子':'Peach', '柚子':'Pomelo',
  '猪肉':'Pork', '牛肉':'Beef', '鸭肉':'Duck', '洋葱':'Onion', '胡萝卜':'Carrot',
};

const htmlText = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const tokens = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(word => word.length > 2 && !['food', 'fruit', 'the', 'and', 'as'].includes(word));
const metadataValue = (metadata, key) => htmlText(metadata?.[key]?.value);

function baseFoodPhotoSearchTerm(food) {
  const source = String(food.source?.description || '').trim();
  const localized = String(food.name || '').split(/[·•]/)[0].replace(/[（(].*?[）)]/g, '').trim();
  const mapped = englishTerms[localized] || Object.keys(englishTerms).sort((a,b)=>b.length-a.length).find(key=>localized.includes(key));
  const upper = source.toUpperCase();
  // A broad Chinese family label can be wrong for an individual source row;
  // the original description takes precedence (for example CORNED BEEF).
  if (/^CORNED\s+BEEF\b/.test(upper)) return 'corned beef';
  const specifics = [
    ['CASHEW','Cashew nuts'],['ALMOND','Almonds'],['PEANUT','Peanuts'],['PISTACHIO','Pistachios'],['WALNUT','Walnuts'],['HAZELNUT','Hazelnuts'],['PECAN','Pecans'],['MACADAMIA','Macadamia nuts'],
    ['SALMON','Salmon'],['TUNA','Tuna'],['COD','Cod'],['TROUT','Trout'],['SARDINE','Sardine'],['MACKEREL','Mackerel'],['HERRING','Herring'],
    ['CHICKEN','Chicken'],['TURKEY','Turkey'],['BEEF','Beef'],['PORK','Pork'],['LAMB','Lamb'],['DUCK','Duck'],['GOOSE','Goose'],
    ['BROCCOLI','Broccoli'],['SPINACH','Spinach'],['CARROT','Carrot'],['ONION','Onion'],['POTATO','Potato'],['TOMATO','Tomato'],['CORN','Corn'],['RICE','Rice'],['OAT','Oats'],['WHEAT','Wheat'],
  ];
  const specific = specifics.find(([token]) => new RegExp(`\\b${token}\\b`).test(upper));
  if (specific) return specific[1];
  const shortAlias = (food.aliases || []).find(alias => /^[a-z][a-z -]{1,35}$/i.test(String(alias).trim()));
  if (shortAlias) return String(shortAlias).trim();
  const sourceHead = source.split(/[;,]/)[0].trim().toLowerCase();
  if (sourceHead) return sourceHead.split(/\s+/).slice(0, 3).join(' ');
  return mapped || String(food.wikipediaArticle || food.key || food.name || '').replaceAll('-', ' ').trim();
}

export function foodPhotoSearchTerms(food) {
  const base=baseFoodPhotoSearchTerm(food), source=String(food.source?.description||'').toUpperCase();
  if(!base)return [];
  if(/^CORNED\s+BEEF\b/.test(source))return ['corned beef'];
  // A nut photo is not a valid substitute for butter made from nuts. Keep
  // this query exact and show the no-match state if Commons has no real image.
  if(/\bCASHEW BUTTER\b/.test(source))return ['cashew butter'];
  const state=/\bRAW\b/.test(source)?'raw':/\b(?:DRY RSTD|OIL RSTD|RSTD)\b/.test(source)?'roasted':/\b(?:CKD|COOKED|BOL|BKD|GRLD)\b/.test(source)?'cooked':/\b(?:DRIED|DRY)\b/.test(source)?'dried':/\bCND\b/.test(source)?'canned':'';
  const salted=/\b(?:W\/SALT|SALT(?:ED| ADD))\b/.test(source)&&! /\bWO\/SALT\b/.test(source);
  const specific=[state,base,salted?'salted':''].filter(Boolean).join(' ').replace(/\s+/g,' ').trim();
  // When the source identifies a preparation state, do not silently fall back
  // to a generic picture of another state (e.g. baked biscuits -> any biscuit).
  return [...new Set([specific, ...(state ? [] : [base])].filter(Boolean))];
}

export function foodPhotoSearchTerm(food) {
  return foodPhotoSearchTerms(food)[0] || '';
}

function isReusableLicense(license) {
  return goodLicense.test(license) && !blockedLicense.test(license);
}

const normalizePhotoToken = token => token.toLowerCase().replace(/ies$/, 'y').replace(/s$/, '');

export function scorePage(page, query) {
  const title = String(page.title || '').replace(/^File:/, '');
  if (rejectedTitle.test(title)) return -1;
  const queryText=query.toLowerCase(), titleText=title.toLowerCase();
  if(queryText.includes('cashew')&&/\bapple(s)?\b/.test(titleText)&&!/\b(nuts?|kernels?)\b/.test(titleText))return -1;
  if(queryText.includes('cashew')&&!/\b(nuts?|kernels?)\b/.test(`${titleText} ${htmlText(page.imageinfo?.[0]?.extmetadata?.ImageDescription?.value).toLowerCase()}`))return -1;
  const terms = tokens(query).map(normalizePhotoToken);
  const titleTerms = new Set(tokens(title).map(normalizePhotoToken));
  const description = htmlText(page.imageinfo?.[0]?.extmetadata?.ImageDescription?.value).toLowerCase();
  // Search-result descriptions often mention a food in an unrelated event or
  // caption. Require every query word in the file title itself; substring hits
  // such as “Cook” in “cooked” are deliberately not treated as matches.
  if (!terms.length || !terms.every(term => titleTerms.has(term))) return -1;
  const descriptionHits = terms.filter(term => tokens(description).map(normalizePhotoToken).includes(term)).length;
  return terms.length * 10 + descriptionHits + (titleTerms.size === terms.length ? 20 : 0);
}

// Runtime photographs are always fixed local files. Network retrieval is a
// separate preparation/review step and never chooses what a visitor sees.
export function resolveFoodPhoto(food) {
  if (!food?.image) return Promise.resolve(null);
  return Promise.resolve({ ...food.imageCredit, image:food.image, subject:food.name,
    imageCredit:food.imageCredit, imageLabel:'食物照片', imageNote:food.imageNote });
}
