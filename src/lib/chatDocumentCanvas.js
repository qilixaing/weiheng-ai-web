const font='"Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif';
export function wrapDocumentText(ctx,text,width){
 const lines=[];for(const raw of String(text).split('\n')){let line='';for(const character of raw){if(line&&ctx.measureText(line+character).width>width){lines.push(line);line='';}line+=character;}lines.push(line);}return lines;
}
export async function canvasFileBytes(canvas,type){
 if(typeof canvas.encode==='function')return new Uint8Array(await canvas.encode(type==='image/jpeg'?'jpeg':'png'));
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('图片生成失败，请重试。')),type,.92));return new Uint8Array(await blob.arrayBuffer());
}
export async function renderChatDocument(doc,{format='pdf',canvasFactory=(width,height)=>{const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;return canvas;}}={}){
 if(typeof document!=='undefined'&&document.fonts)await document.fonts.ready;
 const width=1120,height=format==='png'?7600:1584,margin=76,bottom=height-84,pages=[];let canvas,ctx,y;
 function textStyle(size=24,bold=false,color='#263E33'){ctx.font=`${bold?'600 ':''}${size}px ${font}`;ctx.fillStyle=color;ctx.textBaseline='top';}
 function page(){canvas=canvasFactory(width,height);ctx=canvas.getContext('2d');if(!ctx)throw new Error('浏览器暂不支持文档绘制。');ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);textStyle(19,false,'#667B70');ctx.fillText('维衡 AI 助手',margin,30);ctx.fillText(doc.generatedAt.slice(0,10),width-margin-125,30);y=92;}
 async function finish(){
  if(pages.length>=100)throw new Error('内容过长，请分段导出。');
  let output=canvas,actualHeight=height;
  if(format==='png'){actualHeight=Math.min(height,Math.max(280,Math.ceil(y+82)));output=canvasFactory(width,actualHeight);output.getContext('2d').drawImage(canvas,0,0);}
  const out=output.getContext('2d');out.font=`18px ${font}`;out.fillStyle='#74877C';out.fillText('维衡 AI · 导出内容与当前回复一致',margin,actualHeight-40);out.fillText(String(pages.length+1),width-margin-20,actualHeight-40);
  const bytes=await canvasFileBytes(output,format==='png'?'image/png':'image/jpeg');pages.push(format==='png'?{bytes,width,height:actualHeight}:{jpeg:bytes,width,height:actualHeight});
  canvas.width=1;canvas.height=1;if(output!==canvas){output.width=1;output.height=1;}
  await new Promise(resolve=>setTimeout(resolve,0));
 }
 async function need(space){if(y+space>bottom){await finish();page();}}
 async function paragraph(text,size=24,bold=false,color='#263E33'){
  textStyle(size,bold,color);const lines=wrapDocumentText(ctx,text,width-margin*2),lineHeight=Math.ceil(size*1.5);
  for(const line of lines){await need(lineHeight);textStyle(size,bold,color);ctx.fillText(line,margin,y);y+=lineHeight;}y+=10;
 }
 async function table(rows){
  const columns=Math.max(...rows.map(r=>r.length)),available=width-margin*2;
  const narrowFirst=columns>2&&rows.every(r=>String(r[0]||'').length<=7),first=narrowFirst?120:available/columns;
  const widths=Array.from({length:columns},(_,i)=>i===0?first:(available-first)/(columns-1));
  if(columns===1)widths[0]=available;
  async function drawRow(row,header){
   textStyle(22,header);const lines=widths.map((w,i)=>wrapDocumentText(ctx,row[i]||'',w-22));let offset=0,total=Math.max(...lines.map(l=>l.length));
   while(offset<total){
    await need(58);let count=Math.min(total-offset,Math.max(1,Math.floor((bottom-y-18)/33))),rowHeight=count*33+18;
    let x=margin;for(let i=0;i<columns;i++){
     ctx.fillStyle=header?'#E7F1EB':'#FFFFFF';ctx.fillRect(x,y,widths[i],rowHeight);ctx.strokeStyle='#BBCFC2';ctx.lineWidth=1;ctx.strokeRect(x,y,widths[i],rowHeight);textStyle(22,header);
     for(let j=0;j<count;j++)if(lines[i][offset+j]!==undefined)ctx.fillText(lines[i][offset+j],x+11,y+9+j*33);x+=widths[i];
    }
    y+=rowHeight;offset+=count;if(offset<total){await finish();page();}
   }
  }
  const repeatHeight=Math.max(...rows[0].map((cell,i)=>{textStyle(22,true);return wrapDocumentText(ctx,cell,widths[i]-22).length;}))*33+18;
  for(let i=0;i<rows.length;i++){
   if(i>0&&y+90>bottom){await finish();page();if(repeatHeight<220)await drawRow(rows[0],true);}
   await drawRow(rows[i],i===0);
  }
  y+=20;
 }
 page();await paragraph(doc.title,40,true,'#234A37');
 if(doc.question)await paragraph('提问：'+doc.question,21,false,'#5A7064');
 for(const block of doc.blocks){if(block.type==='table')await table(block.rows);else if(block.type==='space'){if(y<bottom-20)y+=12;}else await paragraph(block.text||'',block.type==='heading'?Math.max(26,35-block.level*2):block.type==='code'?21:24,block.type==='heading');}
 await finish();return pages;
}
