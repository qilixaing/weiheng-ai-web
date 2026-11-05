import {readFile, stat} from 'node:fs/promises';
import {gzip} from 'node:zlib';
import {promisify} from 'node:util';
const compress = promisify(gzip);
const cache = new Map();
function acceptsGzip(header = '') {
  return header.split(',').some(part => { const [name, ...parameters] = part.trim().split(';'); return name.toLowerCase() === 'gzip' && !parameters.some(value => /^\s*q\s*=\s*0(?:\.0*)?\s*$/i.test(value)); });
}
// Only static public assets enter this bounded cache. API responses never do.
export async function sendStaticFile(req, res, path, contentType) {
  const info = await stat(path);
  const eligible = /^(text\/|application\/(json|javascript|manifest\+json)|image\/svg)/.test(contentType) && info.size >= 1024;
  const zipped = eligible && acceptsGzip(req.headers['accept-encoding']);
  let body;
  if (zipped) {
    const signature = `${info.mtimeMs}:${info.size}`;
    let item = cache.get(path);
    if (!item || item.signature !== signature) {
      item = {signature, body: compress(await readFile(path))}; cache.set(path, item);
      if (cache.size > 12) cache.delete(cache.keys().next().value);
    }
    try { body = await item.body; } catch(error) { cache.delete(path); throw error; }
  } else body = await readFile(path);
  res.writeHead(200, {'Content-Type':contentType, 'Cache-Control':'no-store', 'Vary':'Accept-Encoding', 'Content-Length':body.length, ...(zipped ? {'Content-Encoding':'gzip'} : {})});
  res.end(req.method === 'HEAD' ? undefined : body);
}
