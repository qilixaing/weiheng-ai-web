import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';

test('built homepage static dependency graph excludes the food catalogue and stays below its transfer budget',async()=>{
 const root=new URL('../content-dist/',import.meta.url),seen=new Set();let bytes=0,compressed=0;
 async function visit(url){
  if(seen.has(url.href))return;seen.add(url.href);
  const source=await readFile(url,'utf8');bytes+=Buffer.byteLength(source);compressed+=gzipSync(source).length;
  assert.ok(!source.includes('CORNED BEEF LOAF'),'full food catalogue must stay outside the initial graph');
  for(const match of source.matchAll(/^import\s+(?:[^\n]*?\sfrom\s+)?["']([^"']+)["']/gm))if(match[1].startsWith('.'))await visit(new URL(match[1],url));
 }
 await visit(new URL('vitabalance.js',root));
 assert.ok(bytes<260000,`homepage requires ${bytes} JavaScript bytes before render`);
 assert.ok(compressed<80000,`homepage transfer ${compressed} exceeds 80 KB budget`);
 assert.ok(seen.size>=2);
});

test('full application never places page content inside an inert HTML template',async()=>{
 const root=new URL('../content-dist/chunks/',import.meta.url);
 const files=(await readdir(root)).filter(name=>/^App-.*\.js$/.test(name));
 assert.equal(files.length,1);
 const code=await readFile(new URL(files[0],root),'utf8');
 assert.ok(!/\b\w+\("template", null, \[/.test(code),'HTML template would hide every page after handoff');
});
