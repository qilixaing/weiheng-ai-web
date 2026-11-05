import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ALL_FOODS, FOOD_BY_ID, PHOTO_FOODS, REFERENCE_FOODS } from '../src/data/catalogue.js';
import { GROUPS } from '../foods.js';
import reference from '../src/data/food-reference.json' with { type: 'json' };
import expanded from '../src/data/food-expanded.json' with { type: 'json' };
import campus from '../src/data/campus-foods.json' with { type: 'json' };
import { resolveFoodPhoto } from '../src/lib/foodPhotoResolver.js';

test('the photo catalogue preserves all original diary IDs and keeps every public food ID unique', () => {
  const legacyIds = GROUPS.flatMap(group => group.items.map(item => item[0]));
  const originalIds = new Set([...legacyIds, 'hami-melon', 'blueberry', 'mango', 'dragon-fruit', 'peach', 'pomelo', ...reference.map(food => food.key), ...expanded.map(food => food.key), ...campus.map(food => food.key)]);
  assert.equal(originalIds.size, 2300, 'The retained baseline consists of 2,300 original record IDs');
  assert.ok(REFERENCE_FOODS.length >= originalIds.size);
  const retainedIds = new Set(REFERENCE_FOODS.map(food => food.key));
  for (const id of originalIds) {
    assert.ok(retainedIds.has(id), 'Original diary ID removed: ' + id);
    assert.equal(FOOD_BY_ID[id]?.key, id, 'Saved diary records must still resolve: ' + id);
  }
  assert.equal(new Set(ALL_FOODS.map(food => food.key)).size, ALL_FOODS.length, 'Food IDs must not collide with new photo entries');
});

test('every primary photo-catalogue entry has a readable fixed local photograph with attribution', async () => {
  assert.ok(PHOTO_FOODS.length > 0, 'The primary photo catalogue must not be empty');
  const paths = new Set(), identities = new Set();
  for (const food of PHOTO_FOODS) {
    const credit = food.imageCredit;
    assert.match(food.image || '', /^\/assets\/[a-z0-9/_-]+\.(?:jpg|jpeg|png|webp)$/i, 'Image must be a fixed local asset: ' + food.key);
    assert.ok(credit && typeof credit === 'object', 'Missing image provenance: ' + food.key);
    assert.equal(credit.image, food.image, 'Photo and attribution must identify the same file: ' + food.key);
    assert.match(credit.sourceUrl || '', /^https?:\/\//, 'Missing source page: ' + food.key);
    assert.ok(String(credit.author || '').trim(), 'Missing author: ' + food.key);
    assert.match(credit.license || '', /CC0|CC BY|Public domain|PDM|PD-/i, 'Missing reuse licence: ' + food.key);
    assert.ok(!/\b(?:NC|ND)\b/i.test(credit.license), 'Incompatible photo licence: ' + food.key);
    assert.match(credit.licenseUrl || '', /^https?:\/\//, 'Missing licence URL: ' + food.key);
    assert.ok(!credit.generated && !food.generated, 'Generated images cannot be counted as photographs: ' + food.key);
    assert.ok(!food.onlineCandidate && !credit.onlineCandidate, 'Runtime candidates cannot enter the fixed catalogue: ' + food.key);
    const identity = credit.sourceUrl.replaceAll('_', ' ');
    assert.ok(!identities.has(identity), 'One source photo must not inflate primary catalogue coverage: ' + food.key);
    identities.add(identity); paths.add(food.image);
  }
  for (const path of paths) {
    const bytes = await readFile(new URL('..' + path, import.meta.url));
    assert.ok(bytes.length > 1000, 'Empty or unreadable photo: ' + path);
    const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const webp = bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP';
    assert.ok(jpeg || png || webp, 'Photo file contains invalid raster bytes: ' + path);
  }
  assert.equal(PHOTO_FOODS.filter(food => food.image).length, PHOTO_FOODS.length, 'Primary browse coverage must remain 100%');
});

test('photo-only identities do not inherit nutrition values from a different food sample', () => {
  const photoOnly = ALL_FOODS.filter(food => food.photoCatalogue && !food.source);
  for (const food of photoOnly) {
    assert.equal(food.source, null, 'An unsourced nutrient record must explicitly have no nutrient source');
    assert.ok(food.nutrients && typeof food.nutrients === 'object' && !Array.isArray(food.nutrients));
    assert.ok(Object.values(food.nutrients).every(value => value === null), 'Unmatched food photo must keep nutrition unknown: ' + food.key);
    const identity = food.identitySource;
    const url = typeof identity === 'string' ? identity : identity?.url || identity?.sourceUrl;
    assert.match(url || '', /^https:\/\//, 'Food identity needs its own traceable HTTPS source: ' + food.key);
    const identityUrl = new URL(url);
    assert.ok(['www.wikidata.org', 'commons.wikimedia.org'].includes(identityUrl.hostname), 'Food identity must trace to a Wikimedia food entity or original photo: ' + food.key);
    const qid = (typeof identity === 'object' && identity?.qid) || food.wikidataId;
    if (identityUrl.hostname === 'www.wikidata.org') {
      const entity = /^\/wiki\/(Q\d+)$/.exec(identityUrl.pathname);
      assert.ok(entity, 'Wikidata source URL must identify an entity: ' + food.key);
      assert.equal(String(qid).toUpperCase(), entity[1], 'Entity identifier must agree with its identity-source URL: ' + food.key);
      if (/^photo-Q\d+$/.test(food.key)) assert.equal(food.key, 'photo-' + entity[1], 'Food ID must identify the same entity as its source');
    } else assert.equal(url.replaceAll('_', ' '), food.imageCredit.sourceUrl.replaceAll('_', ' '), 'Direct photo identities must reference their own source photograph: ' + food.key);
  }
});

test('photo resolution never searches Commons or performs a runtime network request', async () => {
  const source = await readFile(new URL('../src/lib/foodPhotoResolver.js', import.meta.url), 'utf8');
  assert.ok(!/\bfetch\s*\(/.test(source), 'The resolver must not perform runtime photo searches');
  assert.ok(!source.includes('commons.wikimedia.org/w/api.php'), 'The resolver must not depend on a live Commons query');
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('Unexpected network request'); };
  try {
    for (const food of PHOTO_FOODS) {
      const photo = await resolveFoodPhoto(food);
      assert.equal(photo?.image, food.image, 'Resolver must use the directly bound local asset: ' + food.key);
      assert.ok(!photo?.onlineCandidate);
    }
    const noPhoto = REFERENCE_FOODS.find(food => !food.image);
    if (noPhoto) assert.equal(await resolveFoodPhoto(noPhoto), null, 'A missing photo must not trigger a web search');
    assert.equal(calls, 0);
  } finally { globalThis.fetch = original; }
});
