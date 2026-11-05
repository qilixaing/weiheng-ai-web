import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createCanvas,loadImage,GlobalFonts} from '@napi-rs/canvas';
GlobalFonts.registerFromPath('C:/Windows/Fonts/msyh.ttc','Microsoft YaHei');
const app=new URL('../',import.meta.url),work=new URL('../photo-food-expansion/',app),out=new URL('review/',work);
await fs.mkdir(out,{recursive:true});
const rows=JSON.parse(await fs.readFile(new URL('downloaded.json',work),'utf8'));
const start=Number(process.argv[2]||0),end=Math.min(rows.length,Number(process.argv[3]||rows.length));
for(let base=start;base<end;base+=60){
 const canvas=createCanvas(1500,2000),ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,1500,2000);
 for(let index=base;index<Math.min(base+60,end);index++){const row=rows[index],n=index-base,x=n%6*250,y=Math.floor(n/6)*200;
  try{const path=row.localExisting?new URL(row.localExisting.slice(1),app):new URL('downloads/'+row.filename,work),im=await loadImage(fileURLToPath(path)),scale=Math.min(244/im.width,148/im.height);ctx.drawImage(im,x+(244-im.width*scale)/2,y,im.width*scale,im.height*scale);}catch{ctx.fillStyle='red';ctx.fillText('BAD IMAGE',x+10,y+60);}
  ctx.fillStyle='#111';ctx.font='16px "Microsoft YaHei"';ctx.fillText(String(index).padStart(4,'0')+' '+row.name.slice(0,13),x+3,y+168);ctx.font='12px sans-serif';ctx.fillText(row.title.replace(/^File:/,'').slice(0,35),x+3,y+190);
 }
 await fs.writeFile(new URL('sheet-'+String(base).padStart(4,'0')+'.jpg',out),await canvas.encode('jpeg',92));
}
console.log(JSON.stringify({rows:rows.length,start,end}));
