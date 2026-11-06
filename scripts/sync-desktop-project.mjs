import { createHash } from 'node:crypto';
import { copyFile, lstat, mkdir, readFile, readdir, realpath, rename, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Deliberately no delete operation. Secrets, dependencies and runtime data are
// outside the copy allowlist and are checked separately before/after an apply.
const defaultSource = fileURLToPath(new URL('../', import.meta.url));
const argv = process.argv.slice(2);
function option(name, fallback) { const i = argv.indexOf(name); return i < 0 ? fallback : argv[i + 1]; }
const source = await realpath(resolve(option('--source', defaultSource)));
const target = await realpath(resolve(option('--target', 'C:/Users/z/Desktop/weiheng/vs')));
const apply = argv.includes('--apply');
const inside = (root, path) => { const rel = relative(root, path); return rel !== '' && !isAbsolute(rel) && !rel.startsWith('..' + sep) && rel !== '..'; };
if (source === target || inside(source, target) || inside(target, source)) throw new Error('源项目和目标项目必须是独立目录。');
for (const path of [source, target]) {
  const pkg = JSON.parse(await readFile(join(path, 'package.json'), 'utf8'));
  if (pkg.name !== 'vitabalance-web') throw new Error('目标不是维衡 AI 项目：' + path);
}
const directories = ['.vscode', 'src', 'server', 'scripts', 'tests', 'docs', 'assets', 'content-dist'];
const topFiles = ['package.json', 'package-lock.json', 'vite.config.js', 'tsconfig.json', 'foods.js', 'server.mjs', 'auth-store.mjs', 'agent-demo.js', 'README.md', 'VUE_CONTENT.md', 'site.webmanifest', '.gitignore', '.gitattributes'];
const protectedCode = ['index.html', 'app.js', 'styles.css', 'ambient-background.js'];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
async function maybeRead(path) { try { return await readFile(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } }
async function files(root) {
  let entries; try { entries = await readdir(root, { withFileTypes: true }); } catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const result = [];
  for (const entry of entries) {
    const path = join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error('同步范围中不允许符号链接：' + path);
    result.push(...(entry.isDirectory() ? await files(path) : [path]));
  }
  return result;
}
async function privateSnapshot() {
  const paths = [...await files(join(target, 'data')), ...(await readdir(target)).filter(name => name === '.env' || name.startsWith('.env.')).map(name => join(target, name))];
  const hashes = {};
  for (const path of paths.sort()) hashes[relative(target, path)] = digest(await readFile(path));
  return JSON.stringify(hashes);
}
async function safeDestination(path) {
  if (!inside(target, path)) throw new Error('目标路径越界。');
  let parent = dirname(path);
  while (parent !== target) {
    try { if ((await lstat(parent)).isSymbolicLink()) throw new Error('目标父目录为符号链接：' + parent); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    parent = dirname(parent);
  }
  try { if ((await lstat(path)).isSymbolicLink()) throw new Error('目标文件为符号链接：' + path); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
for (const name of protectedCode) {
  const old = await maybeRead(join(target, name)), current = await readFile(join(source, name));
  if (!old || digest(old) !== digest(current)) throw new Error(`背景/外壳文件不同，停止自动同步并保留目标文件：${name}`);
}
const selected = [];
for (const name of directories) selected.push(...await files(join(source, name)));
for (const name of topFiles) if (await maybeRead(join(source, name))) selected.push(join(source, name));
const changes = [];
// This module was migrated to TypeScript. Keeping the old same-name .js file
// would make Vite prefer it over the updated .ts source after a VS Code rebuild.
const retired = [];
for (const name of ['src/composables/useAiReports.js']) {
  if (!await maybeRead(join(source,name)) && await maybeRead(join(source,name.replace(/\.js$/,'.ts'))) && await maybeRead(join(target,name))) retired.push(name);
}
for (const path of selected) {
  const name = relative(source, path), destination = resolve(target, name);
  await safeDestination(destination);
  const bytes = await readFile(path), previous = await maybeRead(destination);
  if (!previous || digest(previous) !== digest(bytes)) changes.push({ name, source: path, destination, previous: !!previous, sha256: digest(bytes) });
}
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backup = resolve(source, '..', 'local-sync-backups', stamp);
if (apply) {
  const privateBefore = await privateSnapshot();
  await mkdir(backup, { recursive: true });
  // First snapshot all old code; never include .env or runtime data in backups.
  for (const item of changes.filter(item => item.previous)) {
    const path = resolve(backup, item.name);
    if (!inside(backup, path)) throw new Error('备份路径越界。');
    await mkdir(dirname(path), { recursive: true });
    await copyFile(item.destination, path);
  }
  await writeFile(join(backup, 'manifest.json'), JSON.stringify({ source, target, createdAt: new Date().toISOString(), files: changes.map(({ name, previous, sha256 }) => ({ name, previous, sha256 })), retiredFiles:retired }, null, 2));
  for (const name of retired) {
    const oldPath=resolve(target,name), savedPath=resolve(backup,'retired',name);
    await safeDestination(oldPath);
    if(!inside(backup,savedPath)) throw new Error('旧模块备份路径越界。');
    await mkdir(dirname(savedPath),{recursive:true});
    await rename(oldPath,savedPath);
  }
  for (const item of changes) {
    await mkdir(dirname(item.destination), { recursive: true });
    await copyFile(item.source, item.destination);
    if (digest(await readFile(item.destination)) !== item.sha256) throw new Error('文件校验失败：' + item.name);
  }
  if (privateBefore !== await privateSnapshot()) throw new Error('同步期间用户数据或环境配置被其他进程修改，请复核；本脚本不写这些路径。');
  for (const name of protectedCode) if (digest(await readFile(join(target, name))) !== digest(await readFile(join(source, name)))) throw new Error('背景文件校验失败：' + name);
}
console.log(JSON.stringify({ applied: apply, source, target, changedFiles: changes.length, changedAssets: changes.filter(item => item.name.startsWith('assets' + sep)).length, retiredFiles:retired, codeBackup: apply ? backup : null, privateDataUntouched: true, protectedCodeUnchanged: true, files: changes.filter(item => !item.name.startsWith('assets' + sep) && !item.name.startsWith('content-dist' + sep)).map(item => item.name) }, null, 2));
