#!/usr/bin/env bash
# Install the verified prebuilt workspace without npm or a production rebuild.
set -euo pipefail
repo=${WEIHENG_DEPLOY_REPO:-/home/admin/weiheng-source-403dbb7}
commit=${1:?用法: bash scripts/deploy-progressive-prebuilt.sh <git-commit>}
[[ "$commit" =~ ^[0-9a-f]{40}$ ]]
archive=/home/admin/weiheng-progressive-prebuilt.tar
previous=$(readlink -f /opt/weihengai/current)
release=/opt/weihengai/releases/$(date -u +%Y%m%dT%H%M%SZ)-$RANDOM
[[ "$previous" == /opt/weihengai/releases/* && -d "$previous/node_modules" ]]
[[ ! -e "$release" && -d "$repo/.git" ]]
switched=0
rollback(){ if [[ "$switched" == 1 ]]; then sudo -n ln -sfn "$previous" /opt/weihengai/current; sudo -n systemctl restart weihengai; echo ROLLED_BACK; fi; }
trap rollback ERR
timeout 90 git -C "$repo" -c http.version=HTTP/1.1 fetch --depth 1 origin "$commit"
[[ "$(git -C "$repo" rev-parse FETCH_HEAD)" == "$commit" ]]
git -C "$repo" archive --format=tar --output="$archive" "$commit" content-dist src server server.mjs auth-store.mjs package.json .gitattributes
sudo -n python3 - "$previous" "$release" <<'PY'
from pathlib import Path
import sqlite3,datetime,shutil,os,sys
p=Path('/var/backups/weihengai')/datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ-progressive')
p.mkdir(mode=0o700)
with sqlite3.connect('file:/var/lib/weihengai/vitabalance.sqlite?mode=ro',uri=True) as source,sqlite3.connect(p/'vitabalance.sqlite') as target:source.backup(target)
os.chmod(p/'vitabalance.sqlite',0o600)
shutil.copy2('/etc/weihengai/app.env',p/'app.env');os.chmod(p/'app.env',0o600)
previous=Path(sys.argv[1]).resolve();release=Path(sys.argv[2])
assert previous.is_relative_to('/opt/weihengai/releases')
assert release.parent==Path('/opt/weihengai/releases') and not release.exists()
# Keep production dependencies and the existing shell. Never remove old releases.
shutil.copytree(previous,release,symlinks=True,ignore=lambda root,names:{'content-dist'} if Path(root)==previous else set())
print('BACKUP_AND_RELEASE_COPY_OK')
PY
sudo -n tar -xf "$archive" -C "$release"
cd "$release"
node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const entry=await readFile('content-dist/vitabalance.js','utf8');
const entryAssets=[...entry.matchAll(/chunks\/([A-Za-z0-9_-]+\.js)/g)].map(match=>`/content-dist/chunks/${match[1]}`);
assert.ok(entryAssets.some(asset=>asset.includes('/main-')),'loader main asset missing');
for(const asset of entryAssets){await access(asset.slice(1));await access(asset.slice(1)+'.br');await access(asset.slice(1)+'.gz');}
const preload=JSON.parse(await readFile('content-dist/app-preload.json','utf8'));
assert.ok(preload.some(asset=>asset.includes('/App-')),'app preload missing');
for(const asset of preload){await access(asset.slice(1));await access(asset.slice(1)+'.br');await access(asset.slice(1)+'.gz');}
const bootstrap=JSON.parse(await readFile('src/data/catalogue-bootstrap.json','utf8'));assert.equal(bootstrap.rows.length,3395);
for(const url of bootstrap.urls){const body=await readFile('.'+url);assert.ok(url.includes(createHash('sha256').update(body).digest('hex').slice(0,16)));}
console.log('PREBUILT_LOADER_PRELOAD_AND_64_PACKETS_OK');
JS
sudo -n ln -sfn "$release" /opt/weihengai/current
switched=1
sudo -n systemctl restart weihengai
for n in $(seq 1 12); do if curl -fsS --max-time 3 http://127.0.0.1:4173/api/auth/me >/dev/null; then break; fi; sleep 1; done
node --input-type=module <<'JS'
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4173';
assert.equal((await fetch(base+'/api/auth/me')).status,200);
const entryResponse=await fetch(base+'/content-dist/vitabalance.js');assert.equal(entryResponse.status,200);assert.equal(entryResponse.headers.get('cache-control'),'no-store');
const entry=await entryResponse.text(),main=entry.match(/main-[A-Za-z0-9_-]+\.js/)?.[0];assert.ok(main);
const html=await (await fetch(base)).text();assert.ok(html.includes('/content-dist/vitabalance.js'));
const preload=await (await fetch(base+'/content-dist/app-preload.json')).json();assert.ok(preload.some(asset=>asset.includes('/App-')));
const asset=preload.find(path=>path.includes('/IntakeAnalysis-'));assert.ok(asset);
const response=await fetch(base+asset,{method:'HEAD',headers:{'Accept-Encoding':'br,gzip'}});
assert.equal(response.status,200);assert.equal(response.headers.get('content-encoding'),'br');
console.log('LIVE_LOCAL_ENTRY_PRELOAD_AND_COMPRESSION_OK',main);
JS
sudo -n systemctl is-active weihengai
node --input-type=module <<'JS'
import assert from 'node:assert/strict';
const base='https://weihengai.top';
const response=await fetch(base+'/content-dist/vitabalance.js',{signal:AbortSignal.timeout(20000)});
assert.equal(response.status,200);const text=await response.text();const main=text.match(/main-[A-Za-z0-9_-]+\.js/)?.[0];assert.ok(main);
assert.equal((await fetch(base+'/api/auth/me',{signal:AbortSignal.timeout(20000)})).status,200);
console.log('PUBLIC_ENTRY_AND_API_OK',main);
JS
echo "RELEASE=$release"
echo PROGRESSIVE_DEPLOY_OK
