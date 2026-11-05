import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, mkdir, copyFile, readFile, writeFile, stat, utimes, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const exec = promisify(execFile);
test('local start detects changed source bytes and cannot reuse a stale or missing build', async t => {
  const prefix = join(tmpdir(), 'weiheng-local-start-test-');
  const fixture = await mkdtemp(prefix);
  t.after(async () => {
    const target = resolve(fixture);
    assert.ok(target.startsWith(resolve(prefix)) && target !== resolve(tmpdir()), 'Only the generated test fixture may be removed');
    await rm(target, { recursive: true, force: true });
  });
  for (const name of ['scripts', 'src', 'content-dist']) await mkdir(join(fixture, name));
  await copyFile(new URL('../scripts/local-start.mjs', import.meta.url), join(fixture, 'scripts', 'local-start.mjs'));
  for (const name of ['foods.js', 'vite.config.js', 'package-lock.json']) await writeFile(join(fixture, name), '{}');
  await writeFile(join(fixture, 'package.json'), '{"type":"module"}');
  await writeFile(join(fixture, '.env'), 'DEEPSEEK_API_KEY=TEST_ONLY_NOT_A_SECRET');
  const input = join(fixture, 'src', 'main.js');
  await writeFile(input, 'original source');
  for (const name of ['vitabalance.js', 'vitabalance.css']) await writeFile(join(fixture, 'content-dist', name), 'built output');
  const check = async () => {
    const { stdout } = await exec(process.execPath, [join(fixture, 'scripts', 'local-start.mjs'), '--check'], { cwd: tmpdir() });
    assert.ok(!stdout.includes('TEST_ONLY_NOT_A_SECRET'), 'Build checks must never expose environment values');
    return JSON.parse(stdout);
  };
  const initial = await check();
  assert.equal(resolve(initial.projectRoot), resolve(fixture), 'Start must use its own checkout, regardless of the terminal cwd');
  assert.equal(initial.needsBuild, true, 'Unstamped builds must not be treated as current');
  await writeFile(join(fixture, 'content-dist', '.local-source.json'), JSON.stringify({ fingerprint: initial.sourceFingerprint }));
  assert.equal((await check()).needsBuild, false, 'A matching source/build stamp may be reused');
  const times = await stat(input);
  await writeFile(input, 'modified source');
  await utimes(input, times.atime, times.mtime);
  const changed = await check();
  assert.equal(changed.needsBuild, true, 'A source edit must invalidate the build even with a preserved timestamp');
  assert.notEqual(changed.sourceFingerprint, initial.sourceFingerprint);
  await writeFile(join(fixture, 'content-dist', '.local-source.json'), JSON.stringify({ fingerprint: changed.sourceFingerprint }));
  await rm(join(fixture, 'content-dist', 'vitabalance.css'));
  assert.equal((await check()).needsBuild, true, 'Missing build assets must force a rebuild');
  assert.equal(await readFile(join(fixture, '.env'), 'utf8'), 'DEEPSEEK_API_KEY=TEST_ONLY_NOT_A_SECRET');
});
