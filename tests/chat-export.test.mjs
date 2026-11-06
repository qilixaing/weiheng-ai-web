import test from 'node:test';
import assert from 'node:assert/strict';
import {unzipSync,strFromU8} from 'fflate';
import {createCanvas,GlobalFonts} from '@napi-rs/canvas';
import {existsSync} from 'node:fs';
import {chatDocument} from '../src/lib/chatDocument.js';
import {createChatDocx} from '../src/lib/chatDocx.js';
import {createChatPdf} from '../src/lib/chatPdf.js';
import {renderChatDocument,wrapDocumentText} from '../src/lib/chatDocumentCanvas.js';
import {createChatExport,preparedChatDownload} from '../src/lib/chatExport.js';
import {requestedDocumentFormat,documentReplyBody,isFileRefusalOnly} from '../src/lib/chatDocumentIntent.js';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {createAiHandler} from '../server/ai-api.mjs';
if(existsSync('C:/Windows/Fonts/msyh.ttc'))GlobalFonts.registerFromPath('C:/Windows/Fonts/msyh.ttc','Microsoft YaHei');
const fixture='# 一周饮食安排（导出测试）\n\n合成排版样例，不是给真实用户的饮食建议。\n\n| 日期 | 早餐 | 午餐 | 晚餐 |\n| --- | --- | --- | --- |\n'+Array.from({length:7},(_,i)=>`| 周${i+1} | 牛奶、鸡蛋、燕麦 | 米饭、豆腐、蔬菜 | 面条、鱼类、蔬菜 |`).join('\n')+'\n\n## 使用说明\n- 按实际份量记录，营养未知不能算成 0。\n- 示例没有虚构热量、维生素或价格。';
test('DOCX is a real zipped Word document with Chinese tables and safe escaped content',()=>{
 const doc=chatDocument(fixture+'\n<script>alert("x")</script>'),zip=unzipSync(createChatDocx(doc));
 for(const key of ['[Content_Types].xml','_rels/.rels','word/document.xml','word/styles.xml','word/_rels/document.xml.rels'])assert.ok(zip[key]);
 const xml=strFromU8(zip['word/document.xml']);assert.match(xml,/<w:tbl>/);assert.match(xml,/牛奶、鸡蛋、燕麦/);assert.match(xml,/&lt;script&gt;/);assert.ok(!xml.includes('<script>'));assert.equal((xml.match(/<w:tr>/g)||[]).length,8);assert.ok(!Object.keys(zip).some(k=>/vba|macro/i.test(k)));assert.ok(!Object.values(zip).some(b=>strFromU8(b).includes('TargetMode="External"')));
});
test('Chinese PDF is paginated, uses valid cross references, and preserves split-table content layout',async()=>{
 const doc=chatDocument((fixture+'\n\n').repeat(5)),pages=await renderChatDocument(doc,{canvasFactory:createCanvas});assert.ok(pages.length>1);
 const bytes=createChatPdf(pages);assert.equal(new TextDecoder().decode(bytes.slice(0,8)),'%PDF-1.4');
 const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs'),task=pdfjs.getDocument({data:bytes,useSystemFonts:true}),pdf=await task.promise;
 assert.equal(pdf.numPages,pages.length);const page=await pdf.getPage(pdf.numPages);assert.ok((await page.getOperatorList()).fnArray.length>0);await task.destroy();
});
test('image export produces readable PNG bytes and bounded canvases; wrapping never drops Chinese or emoji',async()=>{
 const ctx=createCanvas(100,100).getContext('2d'),text='维衡营养🍎ABC中文份量';ctx.font='22px sans-serif';assert.equal(wrapDocumentText(ctx,text,70).join(''),text);
 const file=await createChatExport('png',fixture,{canvasFactory:createCanvas});assert.equal(file.mime,'image/png');assert.deepEqual([...file.bytes.slice(0,8)],[137,80,78,71,13,10,26,10]);assert.ok(file.bytes.length>2000);
 await assert.rejects(createChatExport('pdf',''),/为空/);await assert.rejects(createChatExport('exe',fixture),/不支持/);
});
test('chat backend tells the model about real export buttons without inventing file links',async(t)=>{
 let sent;const handler=createAiHandler({env:{DEEPSEEK_API_KEY:'synthetic-export-test'},fetchImpl:async(_url,options)=>{sent=JSON.parse(options.body);return new Response(JSON.stringify({model:'synthetic-export-model',choices:[{finish_reason:'stop',message:{content:'合成正文，可从下方导出。'}}]}),{status:200});}});
 const server=createServer((req,res)=>handler(req,res,new URL(req.url,'http://localhost')));server.listen(0,'127.0.0.1');await once(server,'listening');t.after(()=>server.close());
 const response=await fetch(`http://127.0.0.1:${server.address().port}/api/ai/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date:'2026-11-06',entries:[],messages:[{role:'user',content:'请生成一份PDF和Word饮食安排'}]})});
 assert.equal(response.status,200);assert.match(sent.messages[0].content,/Word（DOCX）和 PNG 长图/);assert.match(sent.messages[0].content,/不要说无法生成文件/);assert.match(sent.messages[0].content,/不得编造下载链接/);
});
test('explicit document intent is recognized without treating PDF knowledge questions as file requests',()=>{
 assert.equal(requestedDocumentFormat('根据我的身体数据生成一周的计划用pdf'),'pdf');assert.equal(requestedDocumentFormat('把饮食安排做成Word'),'docx');assert.equal(requestedDocumentFormat('保存长图'),'png');assert.equal(requestedDocumentFormat('pdf'),'pdf');assert.equal(requestedDocumentFormat('什么是PDF'),null);assert.equal(requestedDocumentFormat('你好'),null);
});
test('only obsolete file-capability preambles are omitted; body metrics and safety context stay intact',()=>{
 const prefix='我无法直接生成或发送 PDF 文件，但可以提供正文。你可以使用导出保存。\n\n---\n\n',body='# 一周计划\n\n周一：按实际份量记录。';
 assert.equal(documentReplyBody(prefix+body),body);
 const clinical='你的年龄为18岁，当前营养目标缺少可靠依据。\n我无法直接生成 PDF 文件。\n\n'+body;assert.equal(documentReplyBody(clinical),clinical);
 assert.equal(isFileRefusalOnly('我无法直接生成 PDF 文件。'),true);assert.equal(isFileRefusalOnly(body),false);
});
test('a prepared download URL serves the actual PDF bytes before the user clicks it',async()=>{
 const file=await createChatExport('pdf',fixture,{canvasFactory:createCanvas}),download=preparedChatDownload(file);
 try{assert.match(download.filename,/\.pdf$/);assert.equal(download.size,file.bytes.length);const response=await fetch(download.url);assert.equal(response.headers.get('content-type'),'application/pdf');assert.deepEqual(new Uint8Array(await response.arrayBuffer()),file.bytes);}finally{URL.revokeObjectURL(download.url);}
});
test('document streaming accepts a complete long plan and replaces capability boilerplate in the final event',async(t)=>{
 const body='# 一周计划\n'+('合成排版内容，不提供虚构的营养数值。\n'.repeat(300));let sent;
 const handler=createAiHandler({env:{DEEPSEEK_API_KEY:'synthetic-document-stream'},fetchImpl:async(_url,options)=>{sent=JSON.parse(options.body);return new Response('data: '+JSON.stringify({model:'synthetic-document',choices:[{delta:{content:'我无法直接生成 PDF 文件，可以使用导出。\n\n---\n\n'+body},finish_reason:null}]})+'\n\ndata: '+JSON.stringify({choices:[{delta:{},finish_reason:'stop'}]})+'\n\n',{headers:{'Content-Type':'text/event-stream'}});}});
 const server=createServer((req,res)=>handler(req,res,new URL(req.url,'http://localhost')));server.listen(0,'127.0.0.1');await once(server,'listening');t.after(()=>server.close());
 const response=await fetch(`http://127.0.0.1:${server.address().port}/api/ai/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({stream:true,date:'2026-11-06',entries:[],messages:[{role:'user',content:'根据我的身体数据生成一周的计划用pdf'}]})});
 const events=(await response.text()).split('\n').filter(s=>s.startsWith('data: ')).map(s=>JSON.parse(s.slice(6)));assert.equal(sent.max_tokens,6000);assert.match(sent.messages[0].content,/当前为文件正文输出模式/);assert.equal(events.at(-1).type,'done');assert.equal(events.at(-1).content,body.trim());assert.ok(events.at(-1).content.length>5000);
});
