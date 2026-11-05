import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {selection} from './selection.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const rawPath=process.argv[2] ? path.resolve(process.argv[2]) : path.join(root,'raw','ABBREV.txt');
const outputPath=process.argv[3] ? path.resolve(process.argv[3]) : path.join(root,'food-reference.json');
const data=await fs.readFile(rawPath);
const rows=new Map(data.toString('latin1').split(/\r?\n/).filter(Boolean).map(line=>{
  const columns=line.split('^').map(s=>s.replace(/^~|~$/g,''));
  if(columns.length!==53) throw new Error(`Invalid ABBREV column count: ${columns[0]} ${columns.length}`);
  return [columns[0],columns];
}));

// 0-based columns from Table 16, sr28_doc.pdf, printed pp39–41 / PDF pp45–47.
// Leave numeric zeros intact; USDA empty fields are unknown, never zero-filled.
const fields={energy:3,protein:4,carbs:7,fat:5,fiber:8,water:2,calcium:10,iron:11,magnesium:12,phosphorus:13,potassium:14,sodium:15,zinc:16,copper:17,manganese:18,selenium:19,vitaminA:33,vitaminC:20,vitaminD:41,vitaminE:40,vitaminK:43,b1:21,b2:22,b6:25,b12:31,folate:29,cholesterol:47};
const seen=new Set();
const records=selection.map(item=>{
  if(seen.has(item.key)) throw new Error(`Duplicate key ${item.key}`);
  seen.add(item.key);
  const row=rows.get(item.id);
  if(!row) throw new Error(`NDB ID not found: ${item.id}`);
  const nutrients=Object.fromEntries(Object.entries(fields).map(([key,col])=>{
    const value=row[col].trim();
    const n=value==='' ? null : Number(value);
    if(n!==null && !Number.isFinite(n)) throw new Error(`Invalid nutrient ${item.id} ${key}: ${value}`);
    return [key,n];
  }));
  return {
    key:item.key,name:item.name,aliases:[...new Set([...item.aliases,row[1].toLowerCase()])],category:item.category,subcategory:item.subcategory,group:item.group,state:item.state,grams:100,
    source:{id:item.id,name:'USDA SR28（2016年5月修订）',url:'https://fdc.nal.usda.gov/download-datasets/',description:row[1],license:'Public domain / CC0 1.0',version:'SR28-2016-05',licenseUrl:'https://fdc.nal.usda.gov/api-guide/#licensing'},
    nutrients,
  };
});
await fs.writeFile(outputPath,JSON.stringify(records,null,2)+'\n','utf8');
const categories=Object.fromEntries(Array.from({length:20},(_,i)=>String(i+1).padStart(2,'0')).map(c=>[c,records.filter(r=>r.category===c).length]));
const statistics={total:records.length,originalRows:rows.size,categories,abbrevSha256:createHash('sha256').update(data).digest('hex'),unknownFields:records.reduce((n,r)=>n+Object.values(r.nutrients).filter(v=>v===null).length,0),reusedKeys:selection.filter(r=>!r.key.startsWith('usda-')).map(r=>r.key)};
await fs.writeFile(path.join(root,'import-summary.json'),JSON.stringify(statistics,null,2)+'\n','utf8');
console.log(JSON.stringify(statistics,null,2));
