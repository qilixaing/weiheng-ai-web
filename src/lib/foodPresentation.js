export const foodTitle = food => String(food?.name || '').split(' · ')[0].replace(/（[^）]*）/g,'').trim();
export function foodState(food) {
  if(food?.__summary)return food.state||'';
  if (!food?.expanded) return food?.state || '';
  const text=String(food.source?.description||'');
  const states=[];
  if (/\bRAW\b/.test(text)) states.push('生');
  else if (/\bRSTD\b|ROASTED/.test(text)) states.push('烤熟');
  else if (/\bBKD\b/.test(text)) states.push('烘焙');
  else if (/FRIED/.test(text)) states.push('煎炸');
  else if (/\bCKD\b|COOKED|\bBLD\b/.test(text)) states.push('熟');
  if (/\bDRY MIX\b/.test(text)) states.push('干混合料');
  else if (/\bDRIED\b|\bDRY\b/.test(text)) states.push('干制');
  if (/\bCND\b/.test(text)) states.push('罐装');
  if (/\bFRZ\b|FROZEN/.test(text)) states.push('冷冻');
  if (/WO\/?\s*SALT|WITHOUT SALT/.test(text)) states.push('无盐');
  else if (/\bW\/SALT\b|\bSALTED\b/.test(text)) states.push('加盐');
  return states.length?states.join(' · '):'具体品种与配方见数据来源';
}
