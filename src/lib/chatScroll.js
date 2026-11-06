export function createChatScroll({viewport,isActive=()=>true,onChange=()=>{},threshold=64}){
 let following=true;
 const visible=()=>isActive()&&viewport()&&viewport().clientHeight>0;
 const distance=el=>Math.max(0,el.scrollHeight-el.clientHeight-el.scrollTop);
 function update(){const el=viewport();onChange(!!(visible()&&distance(el)>threshold));}
 function layout(force=false){
  if(force)following=true;
  if(!visible()){onChange(false);return;}
  const el=viewport();if(following)el.scrollTop=Math.max(0,el.scrollHeight-el.clientHeight);update();
 }
 function onScroll(){if(!visible())return;following=distance(viewport())<=threshold;update();}
 return{layout,onScroll,jump:()=>layout(true)};
}
