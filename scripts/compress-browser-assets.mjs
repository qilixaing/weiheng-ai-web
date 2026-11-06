import {readFile,writeFile,readdir} from 'node:fs/promises';
import {gzipSync,brotliCompressSync,constants} from 'node:zlib';
export async function compressBrowserAssets(directory){
 for(const item of await readdir(directory,{withFileTypes:true})){
  const path=new URL(item.name+(item.isDirectory()?'/':''),directory);
  if(item.isDirectory()){if(['chunks','catalogue'].includes(item.name))await compressBrowserAssets(path);continue;}
  if(!/\.(js|json|css)$/.test(item.name))continue;
  const body=await readFile(path);if(body.length<1024)continue;
  await writeFile(new URL(item.name+'.gz',directory),gzipSync(body,{level:9}));
  await writeFile(new URL(item.name+'.br',directory),brotliCompressSync(body,{params:{[constants.BROTLI_PARAM_QUALITY]:6}}));
 }
}
