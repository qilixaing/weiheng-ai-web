#!/usr/bin/env bash
# Deploy the verified, prebuilt navigation fix without npm or server-side builds.
set -euo pipefail
repo=/home/admin/weiheng-source-403dbb7
commit=a2f8f65e3679d3ddda8390985bdb15653c79a651
archive=/home/admin/weiheng-navigation-prebuilt.tar
previous=$(readlink -f /opt/weihengai/current)
release=/opt/weihengai/releases/$(date -u +%Y%m%dT%H%M%SZ)-navigation-fast
switched=0
rollback(){ if [[ "$switched" == 1 ]]; then sudo -n ln -sfn "$previous" /opt/weihengai/current; sudo -n systemctl restart weihengai; echo ROLLED_BACK; fi; }
trap rollback ERR
[[ -d "$repo/.git" ]]
timeout 60 git -C "$repo" -c http.version=HTTP/1.1 fetch --depth 1 origin "$commit"
[[ "$(git -C "$repo" rev-parse FETCH_HEAD)" == "$commit" ]]
git -C "$repo" archive --format=tar --output="$archive" "$commit" content-dist src server/static-files.mjs vite.config.js tests
sudo -n python3 - <<'PY'
from pathlib import Path
import sqlite3,datetime,shutil,os
p=Path('/var/backups/weihengai')/datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ-navigation-fast')
p.mkdir(mode=0o700)
with sqlite3.connect('file:/var/lib/weihengai/vitabalance.sqlite?mode=ro',uri=True) as source,sqlite3.connect(p/'vitabalance.sqlite') as target:source.backup(target)
os.chmod(p/'vitabalance.sqlite',0o600)
shutil.copy2('/etc/weihengai/app.env',p/'app.env');os.chmod(p/'app.env',0o600)
print('BACKUP_OK')
PY
sudo -n mkdir -p "$release"
sudo -n cp -a "$previous/." "$release/"
sudo -n tar -xf "$archive" -C "$release"
cd "$release"
node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const entry=await readFile('content-dist/vitabalance.js','utf8');assert.ok(entry.includes('main-vn7tPyWz.js'));
const app=await readFile('content-dist/chunks/App-Dv8ypzoT.js','utf8');assert.ok(!/\b\w+\("template", null, \[/.test(app));
const manifest=JSON.parse(await readFile('content-dist/app-preload.json','utf8'));assert.ok(manifest.includes('/content-dist/chunks/IntakeAnalysis-D6nWdW9s.js'));
console.log('PREBUILT_FRONTEND_OK');
JS
sudo -n ln -sfn "$release" /opt/weihengai/current
switched=1
sudo -n systemctl restart weihengai
for n in $(seq 1 12); do if curl -fsS http://127.0.0.1:4173/api/auth/me >/dev/null; then break; fi; sleep 1; done
node --input-type=module <<'JS'
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4173';
assert.equal((await fetch(base+'/api/auth/me')).status,200);
const response=await fetch(base+'/content-dist/chunks/main-vn7tPyWz.js',{method:'HEAD'});assert.equal(response.status,200);assert.ok(response.headers.get('cache-control')?.includes('immutable'));
const entry=await fetch(base+'/content-dist/vitabalance.js',{method:'HEAD'});assert.equal(entry.headers.get('cache-control'),'no-store');
console.log('ENTRY_CACHE_AND_ACCOUNT_OK');
JS
sudo -n systemctl is-active weihengai
echo "RELEASE=$release"
echo NAVIGATION_FAST_DEPLOY_OK
