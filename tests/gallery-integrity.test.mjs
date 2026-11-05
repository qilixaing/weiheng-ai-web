import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
test('reviewed gallery has local readable photographs with unique provenance and open licences',async()=>{
 const rows=JSON.parse(await fs.readFile(new URL('../src/data/foodGallerySources.json',import.meta.url)));
 assert.ok(rows.length>=600);assert.equal(new Set(rows.map(x=>x.sourceUrl.replaceAll('_',' '))).size,rows.length);assert.equal(new Set(rows.map(x=>x.pixelSha256)).size,rows.length);
 for(const row of rows){assert.equal(row.reviewStatus,'visual-reviewed');assert.ok(row.author&&row.licenseUrl&&row.modifications);assert.match(row.sourceUrl,/^https:\/\/commons.wikimedia.org\/wiki\/File:/);assert.match(row.license,/^CC0|^CC BY(?:-SA)? |^Public domain|^PDM/);assert.doesNotMatch(row.license,/\b(NC|ND)\b/);assert.match(row.image,/^\/assets\/food-gallery\/[a-f0-9]+\.jpg$/);const bytes=await fs.readFile(new URL('..'+row.image,import.meta.url));assert.equal(bytes.readUInt16BE(0),0xffd8);assert.ok(bytes.length>1000&&bytes.length<700000);assert.ok(row.width<=640&&row.height<=640);}
});
