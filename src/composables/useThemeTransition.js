import {nextTick,onBeforeUnmount} from 'vue';

// Snapshot crossfade includes gradients and translucent glass without animating
// layout or permanently slowing down the existing hover/focus interactions.
export function useThemeTransition(theme){
 let active=null,sequence=0,desired=theme.value;
 function toggleTheme(){
  const id=++sequence;
  desired=desired==='dark'?'light':'dark';
  const target=desired;
  active?.skipTransition();
  const apply=async()=>{if(id!==sequence)return;theme.value=target;await nextTick();};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||typeof document.startViewTransition!=='function'){
   document.documentElement.classList.remove('vb-theme-crossfade');
   void apply();return;
  }
  document.documentElement.classList.add('vb-theme-crossfade');
  try{
   active=document.startViewTransition(apply);
   active.ready.catch(()=>{});
   active.finished.catch(()=>{}).finally(()=>{if(id===sequence){active=null;document.documentElement.classList.remove('vb-theme-crossfade');}});
  }catch{
   document.documentElement.classList.remove('vb-theme-crossfade');void apply();
  }
 }
 onBeforeUnmount(()=>{sequence++;active?.skipTransition();document.documentElement.classList.remove('vb-theme-crossfade');});
 return {toggleTheme};
}
