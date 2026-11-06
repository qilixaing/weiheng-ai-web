import {chatDocument} from './chatDocument.js';
import {createChatDocx} from './chatDocx.js';
import {createChatPdf} from './chatPdf.js';
import {renderChatDocument} from './chatDocumentCanvas.js';
import {zipSync} from 'fflate';
export async function createChatExport(format,content,options={}){
 const doc=chatDocument(content,options),base='维衡AI-'+doc.generatedAt.slice(0,10);
 if(format==='docx')return{bytes:createChatDocx(doc),mime:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',filename:base+'.docx'};
 if(!['pdf','png'].includes(format))throw new Error('暂不支持这个导出格式。');
 const pages=await renderChatDocument(doc,{format,...options});
 if(format==='pdf')return{bytes:createChatPdf(pages),mime:'application/pdf',filename:base+'.pdf'};
 if(pages.length===1)return{bytes:pages[0].bytes,mime:'image/png',filename:base+'.png'};
 return{bytes:zipSync(Object.fromEntries(pages.map((p,i)=>[`${base}-${i+1}.png`,p.bytes])),{level:0}),mime:'application/zip',filename:base+'-图片.zip',pageCount:pages.length};
}
export function downloadChatExport(file){
 const blob=new Blob([file.bytes],{type:file.mime}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=file.filename;link.rel='noopener';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
export function preparedChatDownload(file){
 const blob=new Blob([file.bytes],{type:file.mime});return{url:URL.createObjectURL(blob),filename:file.filename,size:blob.size,mime:file.mime,pageCount:file.pageCount};
}
