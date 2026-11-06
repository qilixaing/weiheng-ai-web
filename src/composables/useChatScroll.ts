import {nextTick,onMounted,onBeforeUnmount,ref,watch,type Ref} from 'vue';
import {createChatScroll} from '../lib/chatScroll.js';

export function useChatScroll({viewport,content,active,thread,messages}:{viewport:Ref<HTMLElement|null>;content:Ref<HTMLElement|null>;active:Readonly<Ref<boolean>>;thread:Readonly<Ref<string|undefined>>;messages:Readonly<Ref<unknown>>}){
 const showJump=ref(false);
 const controller=createChatScroll({viewport:()=>viewport.value,isActive:()=>active.value,onChange:(value:boolean)=>showJump.value=value});
 let mounted=false,queued=false,forcePending=false,frame:number|undefined,observer:ResizeObserver|undefined;
 function schedule(force=false){
  forcePending=forcePending||force;if(!mounted||queued)return;queued=true;
  void nextTick(()=>{if(!mounted){queued=false;return;}frame=requestAnimationFrame(()=>{frame=undefined;queued=false;if(!mounted)return;const force=forcePending;forcePending=false;controller.layout(force);});});
 }
 function observe(){observer?.disconnect();if(viewport.value)observer?.observe(viewport.value);if(content.value)observer?.observe(content.value);schedule();}
 const resized=()=>schedule();
 watch(messages,()=>schedule(),{deep:true,flush:'post'});
 watch([thread,active],()=>schedule(true),{flush:'post'});
 watch([viewport,content],observe,{flush:'post'});
 onMounted(()=>{mounted=true;if(typeof ResizeObserver!=='undefined')observer=new ResizeObserver(resized);observe();window.addEventListener('resize',resized);schedule(true);});
 onBeforeUnmount(()=>{mounted=false;observer?.disconnect();if(frame!==undefined)cancelAnimationFrame(frame);window.removeEventListener('resize',resized);});
 return{showJump,onScroll:controller.onScroll,onContentLoad:resized,jumpToLatest:()=>schedule(true)};
}
