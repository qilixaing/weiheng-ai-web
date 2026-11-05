import {randomBytes,randomInt,timingSafeEqual} from 'node:crypto';
import {deflateSync} from 'node:zlib';
const glyphs=['111001111100111','111001111001111','101101111001001','111100111001111','111100111101111','111001010010010','111101111101111','111101111001111','010101111101101','110101110101110','111100100100111','110101101101110','111100110100111','111100110100100','111100101101111','101101111101101'];
// Each glyph is a 3x5 bitmap. Answers are rasterised server-side, never SVG text.
const alphabet='23456789ABCDEFGH';
const crc=b=>{let c=0xffffffff;for(const v of b){c^=v;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;};
const chunk=(name,data)=>{const type=Buffer.from(name),n=Buffer.alloc(4),sum=Buffer.alloc(4);n.writeUInt32BE(data.length);sum.writeUInt32BE(crc(Buffer.concat([type,data])));return Buffer.concat([n,type,data,sum]);};
function png(text){const w=128,h=58,pixels=Buffer.alloc(w*h*3,246);const dot=(x,y,color)=>{if(x>=0&&x<w&&y>=0&&y<h)for(let c=0;c<3;c++)pixels[(y*w+x)*3+c]=color[c];};
 for(let i=0;i<600;i++)dot(randomInt(w),randomInt(h),[randomInt(130,230),randomInt(150,240),randomInt(150,240)]);
 [...text].forEach((ch,i)=>{const g=glyphs[alphabet.indexOf(ch)],ox=12+i*27,oy=randomInt(8,19),color=[randomInt(15,70),randomInt(60,110),randomInt(40,90)];for(let y=0;y<5;y++)for(let x=0;x<3;x++)if(g[y*3+x]==='1')for(let dy=0;dy<6;dy++)for(let dx=0;dx<5;dx++)dot(ox+x*5+dx+Math.round(Math.sin((y*6+dy)/9)*2),oy+y*6+dy,color);});
 const raw=Buffer.alloc((w*3+1)*h);for(let y=0;y<h;y++)pixels.copy(raw,y*(w*3+1)+1,y*w*3,(y+1)*w*3);
 const header=Buffer.alloc(13);header.writeUInt32BE(w);header.writeUInt32BE(h,4);header[8]=8;header[9]=2;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);
}
export class ImageCaptcha {
 constructor(){this.entries=new Map();}
 issue(token){const now=Date.now();for(const [id,c]of this.entries)if(c.expires<now||c.token===token)this.entries.delete(id);if(this.entries.size>=1000)this.entries.delete(this.entries.keys().next().value);
  const answer=Array.from({length:4},()=>alphabet[randomInt(alphabet.length)]).join(''),id=randomBytes(24).toString('hex');this.entries.set(id,{token,answer,expires:now+300000});return {captchaId:id,image:'data:image/png;base64,'+png(answer).toString('base64'),expiresInSeconds:300};
 }
 verify(id,answer,token){const c=this.entries.get(id);if(!c||c.token!==token)return false;this.entries.delete(id);const value=Buffer.from(String(answer||'').trim().toUpperCase());return c.expires>Date.now()&&value.length===c.answer.length&&timingSafeEqual(value,Buffer.from(c.answer));}
}
