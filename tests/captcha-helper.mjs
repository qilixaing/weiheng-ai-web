import {inflateSync} from 'node:zlib';
const glyphs=['111001111100111','111001111001111','101101111001001','111100111001111','111100111101111','111001010010010','111101111101111','111101111001111','010101111101101','110101110101110','111100100100111','110101101101110','111100110100111','111100110100100','111100101101111','101101111101101'];
// Test-only image reader; never included in the production release.
export async function testCaptcha(base){
 const response=await fetch(base+'/api/auth/captcha');const body=await response.json(),b=Buffer.from(body.image.split(',')[1],'base64');let p=8,parts=[];
 while(p<b.length){const len=b.readUInt32BE(p),type=b.toString('ascii',p+4,p+8);if(type==='IDAT')parts.push(b.subarray(p+8,p+8+len));p+=12+len;}
 const raw=inflateSync(Buffer.concat(parts)),width=b.readUInt32BE(16),dark=(x,y)=>raw[y*(width*3+1)+1+x*3]<100;
 let answer='';for(let i=0;i<4;i++){
  const ox=12+i*27;let oy=58;for(let y=0;y<58;y++)for(let x=ox-2;x<ox+18;x++)if(dark(x,y))oy=Math.min(oy,y);
  let glyph='';for(let gy=0;gy<5;gy++)for(let gx=0;gx<3;gx++){const y=oy+gy*6+3,x=ox+gx*5+2+Math.round(Math.sin((gy*6+3)/9)*2);glyph+=dark(x,y)?'1':'0';}
  const index=glyphs.indexOf(glyph);if(index<0)throw Error('Unrecognised test glyph');answer+='23456789ABCDEFGH'[index];
 }
 return {captchaId:body.captchaId,captchaAnswer:answer,cookie:response.headers.get('set-cookie').split(';')[0]};
}
