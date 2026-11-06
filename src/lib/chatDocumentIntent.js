export function requestedDocumentFormat(question){
 const text=String(question||'');
 if(/^(?:好的[，,\s]*)?pdf(?:格式)?[。.!！]?$/i.test(text.trim()))return 'pdf';
 if(/^(?:好的[，,\s]*)?(?:word|docx)(?:格式)?[。.!！]?$/i.test(text.trim()))return 'docx';
 if(!/(生成|导出|下载|保存|制作|整理|做成|转换|转成|给我|发我|用|格式|create|generate|export|download|save|make|convert)/i.test(text))return null;
 if(/^(什么是|如何|怎么|为什么|what\b|how\b|why\b)/i.test(text.trim()))return null;
 const matches=[['pdf',/pdf/i],['docx',/word|docx|\.doc\b/i],['png',/png|长图|图片文档|图片格式|(?:导出|保存).{0,8}图片/i]].map(([format,pattern])=>({format,index:text.search(pattern)})).filter(x=>x.index>=0).sort((a,b)=>a.index-b.index);
 return matches[0]?.format||null;
}
export function documentReplyBody(answer){
 const text=String(answer||'').trim(),heading=/^\s*#{1,6}\s+\S/m.exec(text);
 if(!heading||!heading.index)return text;
 const preamble=text.slice(0,heading.index),lines=preamble.split('\n').map(s=>s.trim()).filter(s=>s&&!/^[-*_]{3,}$/.test(s));
 const capability=/(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i;
 const sensitive=/(身高|体重|年龄|孕期|哺乳|过敏|疾病|营养|能量|热量|kcal|蛋白|用药)/i;
 if(capability.test(preamble)&&lines.every(line=>/(PDF|Word|文件|附件|导出|下载|复制|格式)/i.test(line)&&!sensitive.test(line)))return text.slice(heading.index).trim();
 return text;
}
export function isFileRefusalOnly(answer){
 const text=String(answer||'').trim();return text.length<400&&!/^\s*(?:#{1,6}\s|\|)/m.test(text)&&/(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i.test(text);
}
