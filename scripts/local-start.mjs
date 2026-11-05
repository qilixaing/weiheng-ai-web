import { createHash } from 'node:crypto';
import { access, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// npm start always uses this checkout and checks actual bytes, so copying an old
// timestamp or editing from VS Code cannot silently start a stale frontend.
const root = fileURLToPath(new URL('../', import.meta.url));
const stampPath = join(root, 'content-dist', '.local-source.json');
const inputs = ['src', 'foods.js', 'vite.config.js', 'package.json', 'package-lock.json'];
async function files(path) {
  const info = await stat(path);
  if (!info.isDirectory()) return [path];
  const entries = await readdir(path, { withFileTypes: true });
  const result = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isSymbolicLink()) throw new Error('构建输入中不允许符号链接：' + relative(root, join(path, entry.name)));
    result.push(...await files(join(path, entry.name)));
  }
  return result;
}
async function fingerprint() {
  const hash = createHash('sha256');
  for (const input of inputs) for (const path of await files(join(root, input))) {
    hash.update(relative(root, path).replaceAll('\\', '/')).update('\0').update(await readFile(path)).update('\0');
  }
  return hash.digest('hex');
}
async function exists(path) { try { await access(path); return true; } catch { return false; } }
function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { cwd: root, stdio: 'inherit', windowsHide: true });
    child.once('error', reject);
    child.once('exit', (code, signal) => code === 0 ? resolve() : reject(new Error(signal ? `进程收到 ${signal}` : `进程退出码 ${code}`)));
  });
}

try {
  const current = await fingerprint();
  const stamp = JSON.parse(await readFile(stampPath, 'utf8').catch(() => '{}'));
  const needsBuild = stamp.fingerprint !== current || !await exists(join(root, 'content-dist', 'vitabalance.js')) || !await exists(join(root, 'content-dist', 'vitabalance.css'));
  if (process.argv.includes('--check')) {
    console.log(JSON.stringify({ projectRoot: root, needsBuild, sourceFingerprint: current }, null, 2));
    process.exit(0);
  }
  console.log(`维衡 AI 本地主项目：${root}`);
  if (needsBuild) {
    console.log('检测到源码或食物素材清单更新，正在构建最新页面…');
    await run([join(root, 'node_modules', 'vite', 'bin', 'vite.js'), 'build', '--configLoader', 'native']);
    // If someone edited a source file while Vite ran, rebuild on the next start.
    if (await fingerprint() !== current) throw new Error('构建期间源码发生改变，请重新运行 npm start。');
    await writeFile(stampPath, JSON.stringify({ schema: 1, fingerprint: current, builtAt: new Date().toISOString() }, null, 2) + '\n');
  } else console.log('源码与构建一致，使用当前版本。');
  const { ALL_FOODS, FOOD_DATA_VERSION } = await import('../src/data/catalogue.js');
  console.log(`食物数据：${FOOD_DATA_VERSION}；${ALL_FOODS.length} 条；本地配图 ${ALL_FOODS.filter(food => food.image).length} 条。`);
  if (process.argv.includes('--build-only')) process.exit(0);
  console.log('若提示端口被占用，请在原来的启动终端按 Ctrl+C，再从本项目运行 npm start。');
  await run([join(root, 'server.mjs')]);
} catch (error) {
  console.error(`本地启动失败：${error.message}`);
  process.exitCode = 1;
}
