import {ref,watch,nextTick,onMounted,onBeforeUnmount} from 'vue';

// One decorative layer; buttons keep their DOM, hit areas and keyboard behavior.
export function useLiquidNavigation(active){
 const navRoot=ref(null),highlight=ref(null),liquidReady=ref(false);
 let motion=null,resizeObserver=null,frame=0,desktop,reduced,disposed=false;
 function place(animate=false){
  const nav=navRoot.value,layer=highlight.value;
  if(!nav||!layer)return;
  if(!desktop.matches){motion?.cancel();motion=null;liquidReady.value=false;return;}
  const selected=nav.querySelector('.vb-nav-button.is-active');
  if(!selected){liquidReady.value=false;return;}
  const navRect=nav.getBoundingClientRect(),target=selected.getBoundingClientRect();
  const previous=liquidReady.value?layer.getBoundingClientRect():target;
  motion?.cancel();motion=null;
  const y=target.top-navRect.top+nav.scrollTop,x=target.left-navRect.left;
  const from=previous.top-navRect.top+nav.scrollTop,oldHeight=previous.height;
  const height=target.height,distance=y-from;
  layer.style.width=target.width+'px';layer.style.height=height+'px';layer.style.left=x+'px';
  layer.style.borderRadius=getComputedStyle(selected).borderRadius;
  layer.style.transform=`translate3d(0,${y}px,0)`;
  const wasReady=liquidReady.value;liquidReady.value=true;
  if(!animate||!wasReady||reduced.matches||Math.abs(distance)<.5||typeof layer.animate!=='function')return;
  const stretch=1+Math.min(10,Math.abs(distance)*.065)/height;
  const recoil=Math.sign(distance)*Math.min(3,Math.abs(distance)*.018);
  motion=layer.animate([
   {transform:`translate3d(0,${from}px,0) scale(1,${oldHeight/height})`,offset:0},
   {transform:`translate3d(0,${from+distance*.55}px,0) scale(.982,${stretch})`,borderRadius:'17px / 21px',offset:.43},
   {transform:`translate3d(0,${y+recoil}px,0) scale(1.006,.975)`,offset:.82},
   {transform:`translate3d(0,${y}px,0) scale(1,1)`,borderRadius:layer.style.borderRadius,offset:1}
  ],{duration:380,easing:'cubic-bezier(.22,.68,.3,1)',fill:'none'});
  motion.finished.catch(()=>{});
 }
 function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>place(false));}
 watch(active,async()=>{await nextTick();if(!disposed)place(true);},{flush:'post'});
 onMounted(()=>{
  desktop=matchMedia('(min-width:761px)');reduced=matchMedia('(prefers-reduced-motion: reduce)');
  desktop.addEventListener('change',schedule);reduced.addEventListener('change',schedule);
  if(typeof ResizeObserver!=='undefined'){resizeObserver=new ResizeObserver(schedule);resizeObserver.observe(navRoot.value);for(const item of navRoot.value.querySelectorAll('.vb-nav-button'))resizeObserver.observe(item);}
  window.addEventListener('resize',schedule);place(false);
  document.fonts?.ready.then(()=>{if(!disposed)schedule();});
 });
 onBeforeUnmount(()=>{disposed=true;motion?.cancel();cancelAnimationFrame(frame);resizeObserver?.disconnect();desktop?.removeEventListener('change',schedule);reduced?.removeEventListener('change',schedule);window.removeEventListener('resize',schedule);});
 return {navRoot,highlight,liquidReady};
}
