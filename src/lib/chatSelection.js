// A startup-created empty thread must not hide conversations from another device.
export function selectChatThreads(state,localActive={},protectedEmptyIds=[]){
 const protectedIds=new Set(protectedEmptyIds),selected={};
 for(const date of new Set((state.threads||[]).map(t=>t.date))){
  const threads=(state.threads||[]).filter(t=>t.date===date).sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  const local=threads.find(t=>t.id===localActive[date]),remote=threads.find(t=>t.id===state.activeByDate?.[date]);
  const chosen=local&&(local.messages?.length||protectedIds.has(local.id))?local:remote?.messages?.length?remote:threads.find(t=>t.messages?.length)||local||remote||threads[0];
  if(chosen)selected[date]=chosen.id;
 }
 return selected;
}
