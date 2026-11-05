// Curated per-food image mappings. Each local photograph retains its own licence.
// Never fall back to a category photograph: a potato must not represent a sweet potato.
import bindings from './foodPhotoBindings.json' with {type:'json'};
import photoFoods from './photo-foods.json' with {type:'json'};
const sources=[...bindings,...photoFoods.map(food=>food.imageCredit)];
export const FOOD_PHOTOS=Object.fromEntries(sources.map(item=>[item.foodId,item]));
export const FOOD_PHOTO_CREDITS=[...new Map(sources.map(item=>[item.sourceUrl,item])).values()];
