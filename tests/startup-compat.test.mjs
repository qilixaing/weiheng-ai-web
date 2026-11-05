import test from 'node:test';
import assert from 'node:assert/strict';
import {timeoutSignal,anySignal} from '../src/lib/browserSignals.js';
import {sendStaticFile} from '../server/static-files.mjs';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {gunzipSync} from 'node:zlib';

test('older mobile browsers can time out and combine cancellation without static AbortSignal helpers',async()=>{
 const timeout=AbortSignal.timeout,any=AbortSignal.any;
 try{
  AbortSignal.timeout=undefined;AbortSignal.any=undefined;
  const timed=timeoutSignal(5);await new Promise(resolve=>setTimeout(resolve,12));
  assert.equal(timed.aborted,true);assert.equal(timed.reason.name,'TimeoutError');
  const a=new AbortController(),b=new AbortController();const combined=anySignal([a.signal,b.signal]);
  b.abort('cancelled');assert.equal(combined.reason,'cancelled');
  assert.equal(anySignal([b.signal]).aborted,true);
 }finally{AbortSignal.timeout=timeout;AbortSignal.any=any;}
});

test('static compression preserves bytes, HEAD length, q=0, and refreshes changed files',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'weiheng-static-')),path=join(dir,'main.js');
 const request=async(encoding,method='GET')=>{
  let headers,body;await sendStaticFile({headers:{'accept-encoding':encoding},method},{writeHead(code,value){assert.equal(code,200);headers=value;},end(value){body=value;}},path,'text/javascript; charset=utf-8');return {headers,body};
 };
 try{
  const original='const food = "食物";\n'.repeat(1000);await writeFile(path,original);
  const zipped=await request('br, gzip');assert.equal(zipped.headers['Content-Encoding'],'gzip');assert.equal(gunzipSync(zipped.body).toString(),original);assert.ok(zipped.body.length<Buffer.byteLength(original)/4);
  const head=await request('gzip','HEAD');assert.equal(head.body,undefined);assert.equal(head.headers['Content-Length'],zipped.body.length);
  const plain=await request('gzip;q=0');assert.equal(plain.headers['Content-Encoding'],undefined);assert.equal(plain.body.toString(),original);
  await writeFile(path,original+'changed');assert.equal(gunzipSync((await request('gzip')).body).toString(),original+'changed');
 }finally{await rm(dir,{recursive:true,force:true});}
});
