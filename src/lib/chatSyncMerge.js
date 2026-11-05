const empty=()=>({threads:[],deleted:{},activeByDate:{},memoryEnabled:true});
export function mergeChat(a=empty(),b=empty()) {
 const deleted={...a.deleted};for(const [id,t]of Object.entries(b.deleted||{}))deleted[id]=Math.max(Number(t)||0,Number(deleted[id])||0);
 const clearedAt=Math.max(Number(a.clearedAt)||0,Number(b.clearedAt)||0),threads=new Map();
 for(const thread of [...(a.threads||[]),...(b.threads||[])]){
  if(!thread||typeof thread.id!=='string'||thread.id.length>120||deleted[thread.id]||!/^\d{4}-\d{2}-\d{2}$/.test(thread.date)||!Array.isArray(thread.messages))continue;
  if(clearedAt&&Date.parse(thread.createdAt)<clearedAt)continue;
  const old=threads.get(thread.id),messages=new Map((old?.messages||[]).map(m=>[m.id,m]));
  for(const m of thread.messages){if(!m||typeof m.id!=='string'||m.id.length>120||!['user','assistant'].includes(m.role)||typeof m.content!=='string'||m.content.length>100000)continue;
   const prior=messages.get(m.id);if(!prior||(Number(m.updatedAt||0)>Number(prior.updatedAt||0)||(Number(m.updatedAt||0)===Number(prior.updatedAt||0)&&(Number(m.updatedAt||0)>0||m.content.length>=prior.content.length))))messages.set(m.id,{...m});
  }
  threads.set(thread.id,{id:thread.id,date:thread.date,createdAt:thread.createdAt,messages:[...messages.values()].sort((x,y)=>String(x.createdAt||'').localeCompare(String(y.createdAt||''))).slice(-1000)});
 }
 return {threads:[...threads.values()].sort((x,y)=>String(x.createdAt||'').localeCompare(String(y.createdAt||''))),deleted,clearedAt,activeByDate:{...a.activeByDate,...b.activeByDate},memoryEnabled:b.memoryEnabled??a.memoryEnabled??true};
}
export function stampChat(old,next,now=Date.now()){
 const previous=new Map((old.threads||[]).flatMap(t=>t.messages||[]).map(m=>[m.id,m]));
 const deleted={...old.deleted,...next.deleted};const ids=new Set((next.threads||[]).map(t=>t.id));
 const stable=m=>JSON.stringify({...m,updatedAt:undefined});
 return {...next,deleted,clearedAt:Math.max(Number(old.clearedAt)||0,Number(next.clearedAt)||0),threads:(next.threads||[]).map(t=>({...t,messages:t.messages.map(m=>({...m,updatedAt:stable(m)===stable(previous.get(m.id)||{})?(previous.get(m.id)?.updatedAt||now):now}))}))};
}
