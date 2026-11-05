// Three-way merge. Concurrent edits to the same day/profile require a decision.
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function mergeAccountState(base,local,remote,choice){
 const conflicts=[];
 function pick(b,l,r,path){if(equal(l,r))return l;if(equal(l,b))return r;if(equal(r,b))return l;conflicts.push(path);return choice==='remote'?r:l;}
 const result={};
 for(const key of new Set([...Object.keys(base||{}),...Object.keys(local||{}),...Object.keys(remote||{})])){
  if(key==='calculated')continue;
  if(key==='records'){
   const maps=[base,local,remote].map(s=>Object.fromEntries((s?.records||[]).map(r=>[r.date,r])));
   result.records=[...new Set(maps.flatMap(m=>Object.keys(m)))].map(date=>pick(...maps.map(m=>m[date]),'记录 '+date)).filter(Boolean);continue;
  }
  if(['drafts','habits'].includes(key)){
   const maps=[base?.[key]||{},local?.[key]||{},remote?.[key]||{}];result[key]={};
   for(const id of new Set(maps.flatMap(m=>Object.keys(m)))){const value=pick(...maps.map(m=>m[id]),key+' '+id);if(value!==undefined)result[key][id]=value;}continue;
  }
  const value=pick(base?.[key],local?.[key],remote?.[key],key);if(value!==undefined)result[key]=value;
 }
 return {state:result,conflicts};
}
