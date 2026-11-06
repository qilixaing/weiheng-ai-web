// Preload downloads JavaScript without evaluating account-scoped application code.
export async function preloadAppAssets(){
 try{
  const response=await fetch('/content-dist/app-preload.json',{cache:'no-cache'});
  if(!response.ok)return;
  const assets=await response.json();
  if(!Array.isArray(assets))return;
  const seen=new Set([...document.querySelectorAll('link[rel="modulepreload"]')].map(link=>link.getAttribute('href')));
  for(const href of assets){
   if(typeof href!=='string'||!/^\/content-dist\/chunks\/[A-Za-z0-9_-]+\.js$/.test(href)||seen.has(href))continue;
   const link=document.createElement('link');link.rel='modulepreload';link.href=href;document.head.append(link);seen.add(href);
  }
 }catch{/* Navigation can still import its module normally when preloading is unavailable. */}
}
