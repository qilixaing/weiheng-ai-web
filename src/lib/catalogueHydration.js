// Pure loader: callers share requests, failed requests can be retried, and a
// truncated/mismatched response never becomes a persistent nutrition snapshot.
export function createCatalogueHydrator({foods,urls,fetcher,onEstimate=()=>{}}){
 const pending=new Map();
 async function bucket(index){
  if(!pending.has(index)){
   const request=(async()=>{
    const response=await fetcher(urls[index]);
    if(!response.ok)throw new Error('食物资料暂未读取成功，请重试。');
    const rows=await response.json();
    if(!Array.isArray(rows))throw new Error('食物资料格式不正确。');
    const expected=Object.values(foods).filter(f=>f.__bucket===index);
    const byId=new Map(rows.map(row=>[row?.food?.key,row]));
    if(expected.some(f=>!byId.has(f.key))||rows.some(row=>!foods[row?.food?.key]||foods[row.food.key].__bucket!==index||!row.food.nutrients||typeof row.food.nutrients!=='object'))throw new Error('食物资料版本不一致，请刷新重试。');
    for(const {food,estimate} of rows){onEstimate(food.key,estimate);Object.assign(foods[food.key],food,{__summary:false});}
   })();
   pending.set(index,request);request.catch(()=>pending.delete(index));
  }
  return pending.get(index);
 }
 return async function ensure(ids){
  const keys=[...new Set(Array.isArray(ids)?ids:[ids])].filter(Boolean);
  if(keys.some(id=>!foods[id]))throw new Error('没有找到对应食物，请重新选择。');
  await Promise.all([...new Set(keys.filter(id=>foods[id].__summary).map(id=>foods[id].__bucket))].map(bucket));
  return keys.map(id=>foods[id]);
 };
}
