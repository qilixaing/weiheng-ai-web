import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
import {parse,compileScript} from '@vue/compiler-sfc';
import {createRenderer,nextTick} from 'vue';
import {createCanvas,GlobalFonts} from '@napi-rs/canvas';
import {existsSync} from 'node:fs';
if(existsSync('C:/Windows/Fonts/msyh.ttc'))GlobalFonts.registerFromPath('C:/Windows/Fonts/msyh.ttc','Microsoft YaHei');

test('actual Vue file card automatically prepares a real downloadable PDF for the reported request',async()=>{
 const original={document:globalThis.document,requestAnimationFrame:globalThis.requestAnimationFrame,setTimeout:globalThis.setTimeout};
 const directory=await mkdtemp(join(tmpdir(),'weiheng-card-ui-')),require=createRequire(import.meta.url);
 let app;
 try{
  globalThis.document={fonts:{ready:Promise.resolve()},createElement(tag){assert.equal(tag,'canvas');return createCanvas(1,1);}};
  globalThis.requestAnimationFrame=callback=>queueMicrotask(()=>callback(0));
  globalThis.setTimeout=(callback,delay,...args)=>original.setTimeout(callback,delay===30000?0:delay,...args);
  const source=await readFile(new URL('../src/components/ChatMessageExport.vue',import.meta.url),'utf8'),{descriptor}=parse(source);
  let code=compileScript(descriptor,{id:'chat-card-ui',inlineTemplate:true}).content;
  code=code.replaceAll("from 'vue'",'from '+JSON.stringify(pathToFileURL(require.resolve('vue')).href));
  code=code.replaceAll('from "vue"','from '+JSON.stringify(pathToFileURL(require.resolve('vue')).href));
  code=code.replaceAll("'../lib/chatDocumentIntent.js'",JSON.stringify(new URL('../src/lib/chatDocumentIntent.js',import.meta.url).href));
  code=code.replaceAll("'../lib/chatExport.js'",JSON.stringify(new URL('../src/lib/chatExport.js',import.meta.url).href));
  const modulePath=join(directory,'component.mjs');await writeFile(modulePath,code);const {default:Card}=await import(pathToFileURL(modulePath).href);
  const node=(tag,text='')=>({tag,text,props:{},children:[],parent:null});
  const renderer=createRenderer({createElement:tag=>node(tag),createText:text=>node('#text',text),createComment:text=>node('#comment',text),setText:(el,text)=>el.text=text,setElementText:(el,text)=>{el.text=text;el.children=[];},parentNode:el=>el.parent,nextSibling:el=>el.parent?.children[el.parent.children.indexOf(el)+1]||null,patchProp:(el,key,_old,value)=>el.props[key]=value,insert(el,parent,anchor){if(el.parent){const old=el.parent.children.indexOf(el);if(old>=0)el.parent.children.splice(old,1);}el.parent=parent;const index=parent.children.indexOf(anchor);if(index<0)parent.children.push(el);else parent.children.splice(index,0,el);},remove(el){if(el.parent){const index=el.parent.children.indexOf(el);if(index>=0)el.parent.children.splice(index,1);}}});
  const root=node('root');app=renderer.createApp(Card,{question:'根据我的身体数据生成一周的计划用pdf',content:'我无法直接生成 PDF 文件，你可以使用导出。\n\n# 一周计划\n\n这是合成排版测试内容，不是给真实用户的营养建议。',auto:true});app.mount(root);
  const all=element=>[element,...element.children.flatMap(all)];
  const initial=all(root),body=initial.find(n=>n.tag==='p'&&n.text.includes('这是合成排版测试内容'));
  assert.ok(body,'plan body must be visible immediately');
  const controls=initial.filter(n=>['a','button'].includes(n.tag));assert.equal(controls.length,3);assert.ok(initial.indexOf(body)<initial.indexOf(controls[0]));
  assert.ok(!initial.some(n=>n.tag==='summary'&&['查看正文','其他格式'].includes(n.text)));
  let link;for(let i=0;i<100;i++){await new Promise(r=>original.setTimeout(r,20));await nextTick();link=all(root).find(n=>n.tag==='a'&&String(n.props.download||'').endsWith('.pdf'));if(link)break;}
  assert.ok(link,'requested PDF must appear as a direct download link, not a collapsed export menu');assert.match(link.props.href,/^blob:/);assert.ok(all(root).some(n=>n.text==='PDF 文件已生成'));
  const response=await fetch(link.props.href),bytes=new Uint8Array(await response.arrayBuffer());assert.equal(response.headers.get('content-type'),'application/pdf');assert.equal(new TextDecoder().decode(bytes.slice(0,8)),'%PDF-1.4');assert.ok(bytes.length>1000);
 }finally{
  app?.unmount();globalThis.document=original.document;globalThis.requestAnimationFrame=original.requestAnimationFrame;globalThis.setTimeout=original.setTimeout;
  assert.ok(directory.startsWith(join(tmpdir(),'weiheng-card-ui-')));await rm(directory,{recursive:true,force:true});
 }
});
