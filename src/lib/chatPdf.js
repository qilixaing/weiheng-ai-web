const encoder=new TextEncoder(),bytes=text=>encoder.encode(text);
export function createChatPdf(pages){
 if(!pages.length)throw new Error('没有可导出的页面。');
 const objects=[null,null],kids=[];
 for(const page of pages){
  const pageId=objects.length+1,imageId=pageId+1,streamId=pageId+2;kids.push(pageId+' 0 R');
  const command=bytes('q 595.28 0 0 841.89 0 0 cm /Im0 Do Q');
  objects.push(bytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${streamId} 0 R >>`));
  objects.push([bytes(`<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpeg.length} >>\nstream\n`),page.jpeg,bytes('\nendstream')]);
  objects.push([bytes(`<< /Length ${command.length} >>\nstream\n`),command,bytes('\nendstream')]);
 }
 objects[0]=bytes('<< /Type /Catalog /Pages 2 0 R >>');objects[1]=bytes(`<< /Type /Pages /Count ${pages.length} /Kids [${kids.join(' ')}] >>`);
 const chunks=[bytes('%PDF-1.4\n% binary\n')],offsets=[0];let offset=chunks[0].length;
 objects.forEach((object,i)=>{offsets.push(offset);const parts=[bytes(`${i+1} 0 obj\n`),...(Array.isArray(object)?object:[object]),bytes('\nendobj\n')];for(const part of parts){chunks.push(part);offset+=part.length;}});
 chunks.push(bytes(`xref\n0 ${objects.length+1}\n0000000000 65535 f \n${offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')}trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF\n`));
 const out=new Uint8Array(chunks.reduce((n,c)=>n+c.length,0));let position=0;for(const part of chunks){out.set(part,position);position+=part.length;}return out;
}
