import test from 'node:test';
import assert from 'node:assert/strict';
import {createChatScroll} from '../src/lib/chatScroll.js';
import {ref,createRenderer,nextTick} from 'vue';
import {readFile,writeFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';

test('opening chat starts at its end, streaming follows, and scrolling up preserves reading position',()=>{
 const view={clientHeight:400,scrollHeight:2000,scrollTop:0};let arrow=false;
 const scroll=createChatScroll({viewport:()=>view,onChange:value=>arrow=value});
 scroll.layout(true);assert.equal(view.scrollTop,1600);assert.equal(arrow,false);
 view.scrollHeight=2200;scroll.layout();assert.equal(view.scrollTop,1800);
 view.scrollTop=500;scroll.onScroll();assert.equal(arrow,true);
 view.scrollHeight=2500;scroll.layout();assert.equal(view.scrollTop,500);assert.equal(arrow,true);
 scroll.jump();assert.equal(view.scrollTop,2100);assert.equal(arrow,false);
 view.scrollHeight=2600;scroll.layout();assert.equal(view.scrollTop,2200);
});
test('hidden or short chat never shows a jump button; returning to the end resumes following',()=>{
 let active=false,arrow=false;const view={clientHeight:0,scrollHeight:2000,scrollTop:0};
 const scroll=createChatScroll({viewport:()=>view,isActive:()=>active,onChange:value=>arrow=value});scroll.layout(true);assert.equal(view.scrollTop,0);assert.equal(arrow,false);
 active=true;view.clientHeight=400;scroll.layout(true);assert.equal(view.scrollTop,1600);
 view.scrollTop=100;scroll.onScroll();assert.equal(arrow,true);view.scrollTop=1600;scroll.onScroll();assert.equal(arrow,false);
 view.scrollHeight=2100;scroll.layout();assert.equal(view.scrollTop,1700);
 view.scrollHeight=200;scroll.layout();assert.equal(view.scrollTop,0);assert.equal(arrow,false);
});

test('Vue activation after v-show, thread changes and asynchronous content resizing all restore the correct position',async()=>{
 const originals={window:globalThis.window,requestAnimationFrame:globalThis.requestAnimationFrame,cancelAnimationFrame:globalThis.cancelAnimationFrame,ResizeObserver:globalThis.ResizeObserver};
 const dir=await mkdtemp(join(tmpdir(),'weiheng-scroll-')),frames=new Map(),observers=[];let id=0,app;
 try{
  globalThis.window=new EventTarget();globalThis.requestAnimationFrame=cb=>{frames.set(++id,cb);return id;};globalThis.cancelAnimationFrame=key=>frames.delete(key);
  globalThis.ResizeObserver=class{constructor(callback){this.callback=callback;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}};
  const source=await readFile(new URL('../src/composables/useChatScroll.ts',import.meta.url),'utf8');
  let code=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
  code=code.replace(/from (['"])vue\1/,'from '+JSON.stringify(import.meta.resolve('vue')));code=code.replace(/from (['"])\.\.\/lib\/chatScroll\.js\1/,'from '+JSON.stringify(new URL('../src/lib/chatScroll.js',import.meta.url).href));
  const file=join(dir,'useChatScroll.mjs');await writeFile(file,code);const {useChatScroll}=await import(pathToFileURL(file).href);
  const viewport=ref({clientHeight:0,scrollHeight:2000,scrollTop:0}),content=ref({}),active=ref(false),thread=ref('one'),messages=ref([]);let chat;
  const renderer=createRenderer({createComment:()=>({}),createText:()=>({}),createElement:()=>({}),insert(){},remove(){},setText(){},setElementText(){},parentNode(){return null;},nextSibling(){return null;},patchProp(){}});
  app=renderer.createApp({setup(){chat=useChatScroll({viewport,content,active,thread,messages});return()=>null;}});app.mount({});
  async function flush(){for(let n=0;n<5;n++){await nextTick();await Promise.resolve();const callbacks=[...frames.values()];frames.clear();callbacks.forEach(cb=>cb());}}
  await flush();assert.equal(viewport.value.scrollTop,0);
  viewport.value.clientHeight=400;active.value=true;await flush();assert.equal(viewport.value.scrollTop,1600);
  viewport.value.scrollTop=400;chat.onScroll();messages.value=[{text:'new streamed text'}];viewport.value.scrollHeight=2300;observers[0].callback();await flush();assert.equal(viewport.value.scrollTop,400);assert.equal(chat.showJump.value,true);
  chat.jumpToLatest();await flush();assert.equal(viewport.value.scrollTop,1900);assert.equal(chat.showJump.value,false);
  viewport.value.scrollHeight=2400;observers[0].callback();await flush();assert.equal(viewport.value.scrollTop,2000);
  viewport.value.scrollTop=200;chat.onScroll();thread.value='two';await flush();assert.equal(viewport.value.scrollTop,2000);
  active.value=false;viewport.value.clientHeight=0;await flush();active.value=true;viewport.value.clientHeight=500;await flush();assert.equal(viewport.value.scrollTop,1900);
  app.unmount();app=null;assert.equal(observers[0].disconnected,true);assert.equal(frames.size,0);
 }finally{app?.unmount();for(const [key,value]of Object.entries(originals)){if(value===undefined)delete globalThis[key];else globalThis[key]=value;}assert.ok(dir.startsWith(join(tmpdir(),'weiheng-scroll-')));await rm(dir,{recursive:true,force:true});}
});
