import {readFile, stat} from 'node:fs/promises';
import {gzip} from 'node:zlib';
import {promisify} from 'node:util';
import {basename,dirname,join} from 'node:path';
const compress = promisify(gzip);
const cache = new Map();
function acceptsEncoding(header = '',encoding) {
  return header.split(',').some(part => { const [name, ...parameters] = part.trim().split(';'); return name.toLowerCase() === encoding && !parameters.some(value => /^\s*q\s*=\s*0(?:\.0*)?\s*$/i.test(value)); });
}
// Only static public assets enter this bounded cache. API responses never do.
export async function sendStaticFile(req, res, path, contentType) {
  const info = await stat(path);
  const eligible = /^(text\/|application\/(json|javascript|manifest\+json)|image\/svg)/.test(contentType) && info.size >= 1024;
  let body,encoding;
  // Start downloading the real workspaces with the HTML, before the homepage
  // code runs. Modulepreload does not evaluate account-scoped application code.
  if(basename(path)==='index.html'&&contentType.startsWith('text/html')){
    body=await readFile(path);
    try{
      const assets=JSON.parse(await readFile(join(dirname(path),'content-dist','app-preload.json'),'utf8'));
      const links=assets.filter(href=>typeof href==='string'&&/^\/content-dist\/chunks\/[A-Za-z0-9_-]+\.js$/.test(href)).map(href=>`<link rel="modulepreload" href="${href}">`).join('');
      body=Buffer.from(body.toString().replace('</head>',links+'</head>'));
    }catch{/* Builds without a manifest retain their normal entry point. */}
    if(acceptsEncoding(req.headers['accept-encoding'],'gzip')){body=await compress(body);encoding='gzip';}
  }
  if(!body&&eligible)for(const candidate of ['br','gzip']){
    if(!acceptsEncoding(req.headers['accept-encoding'],candidate))continue;
    const compressedPath=path+(candidate==='br'?'.br':'.gz');
    try{const ready=await stat(compressedPath);if(ready.mtimeMs>=info.mtimeMs){body=await readFile(compressedPath);encoding=candidate;break;}}catch{/* Uncompressed development assets use the normal path. */}
  }
  if (!body&&eligible&&acceptsEncoding(req.headers['accept-encoding'],'gzip')) {
    const signature = `${info.mtimeMs}:${info.size}`;
    let item = cache.get(path);
    if (!item || item.signature !== signature) {
      item = {signature, body: compress(await readFile(path))}; cache.set(path, item);
      if (cache.size > 12) cache.delete(cache.keys().next().value);
    }
    try { body = await item.body; } catch(error) { cache.delete(path); throw error; }
    encoding='gzip';
  }
  if(!body)body=await readFile(path);
  const immutable=(/[\\/]content-dist[\\/]chunks[\\/]/.test(path)&&/-[A-Za-z0-9_-]{8}\.js$/.test(basename(path)))||(/[\\/]content-dist[\\/]catalogue[\\/]/.test(path)&&/-[a-f0-9]{16}\.json$/.test(basename(path)));
  res.writeHead(200, {'Content-Type':contentType, 'Cache-Control':immutable?'public, max-age=31536000, immutable':'no-store', 'Vary':'Accept-Encoding', 'Content-Length':body.length, ...(encoding ? {'Content-Encoding':encoding} : {})});
  res.end(req.method === 'HEAD' ? undefined : body);
}
