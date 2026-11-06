import test from 'node:test';
import assert from 'node:assert/strict';
import {preloadAppAssets} from '../src/lib/preloadApp.js';
test('preloading fetches only same-origin versioned modules and never executes application code',async()=>{
 const oldFetch=globalThis.fetch,oldDocument=globalThis.document,links=[];
 try{
  globalThis.fetch=async url=>{assert.equal(url,'/content-dist/app-preload.json');return {ok:true,json:async()=>['/content-dist/chunks/App-12345678.js','https://other.example/module.js','/api/data','/content-dist/chunks/App-12345678.js']};};
  globalThis.document={querySelectorAll:()=>[],createElement:()=>({}),head:{append:link=>links.push(link)}};
  await preloadAppAssets();assert.deepEqual(links,[{rel:'modulepreload',href:'/content-dist/chunks/App-12345678.js'}]);
 }finally{globalThis.fetch=oldFetch;globalThis.document=oldDocument;}
});
