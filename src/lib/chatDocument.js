const clean=value=>String(value||'').replace(/\r\n?/g,'\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'');
const inline=value=>clean(value).replace(/!\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'$1 ($2)').replace(/\*\*([^*]+)\*\*/g,'$1').replace(/__([^_]+)__/g,'$1').replace(/`([^`]+)`/g,'$1');
const cells=line=>line.trim().replace(/^\|/,'').replace(/\|$/,'').split(/(?<!\\)\|/).map(s=>inline(s.trim().replace(/\\\|/g,'|')));
export function chatDocument(content,{title='维衡 AI · 助手回复',question='',generatedAt=new Date().toISOString()}={}){
 const text=clean(content).trim();if(!text)throw new Error('回复为空，暂时无法导出。');if(text.length>100000)throw new Error('内容过长，请分段导出。');
 const lines=text.split('\n'),blocks=[];let code=false;
 for(let i=0;i<lines.length;i++){
  const line=lines[i];if(/^\s*```/.test(line)){code=!code;continue;}
  if(code){blocks.push({type:'code',text:line});continue;}
  if(!line.trim()){blocks.push({type:'space'});continue;}
  if(line.includes('|')&&/^\s*\|?\s*:?-{3,}/.test(lines[i+1]||'')){
   const rows=[cells(line)];i++;while(i+1<lines.length&&lines[i+1].includes('|')&&lines[i+1].trim())rows.push(cells(lines[++i]));
   if(Math.max(...rows.map(r=>r.length))<=8)blocks.push({type:'table',rows});else for(const row of rows)blocks.push({type:'paragraph',text:row.join(' | ')});
   continue;
  }
  const heading=line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
  if(heading){blocks.push({type:'heading',level:heading[1].length,text:inline(heading[2])});continue;}
  if(/^\s*([-*_])\1{2,}\s*$/.test(line)){blocks.push({type:'space'});continue;}
  blocks.push({type:'paragraph',text:inline(line.replace(/^\s*[-*+]\s+/,'• ').replace(/^>\s?/,''))});
 }
 return{title:clean(title).slice(0,100),question:clean(question).slice(0,1200),generatedAt,blocks};
}
export const xmlText=value=>clean(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
