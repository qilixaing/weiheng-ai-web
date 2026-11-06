#!/usr/bin/env bash
# Install the verified prebuilt workspace without npm or a production rebuild.
set -euo pipefail
repo=/home/admin/weiheng-source-403dbb7
commit=b3e7bfe37d540835dbe87ec05246bce0d2327392
archive=/home/admin/weiheng-chat-scroll.tar
previous=$(readlink -f /opt/weihengai/current)
release=/opt/weihengai/releases/$(date -u +%Y%m%dT%H%M%SZ)-chat-scroll
[[ "$previous" == /opt/weihengai/releases/* && -d "$previous/node_modules" ]]
[[ ! -e "$release" && -d "$repo/.git" ]]
switched=0
rollback(){ if [[ "$switched" == 1 ]]; then sudo -n ln -sfn "$previous" /opt/weihengai/current; sudo -n systemctl restart weihengai; echo ROLLED_BACK; fi; }
trap rollback ERR
timeout 90 git -C "$repo" -c http.version=HTTP/1.1 fetch --depth 1 origin "$commit"
[[ "$(git -C "$repo" rev-parse FETCH_HEAD)" == "$commit" ]]
git -C "$repo" archive --format=tar --output="$archive" "$commit" content-dist src server vite.config.js tests scripts/build-browser-catalogue.mjs scripts/compress-browser-assets.mjs .gitattributes docs/STARTUP_PERFORMANCE.md docs/CHAT_SYNC_AND_EXPORT.md
sudo -n python3 - "$previous" "$release" <<'PY'
from pathlib import Path
import sqlite3,datetime,shutil,os,sys
p=Path('/var/backups/weihengai')/datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ-chat-scroll')
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
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
assert.ok((await readFile('content-dist/vitabalance.js','utf8')).includes('main-D0cQsrir.js'));
const app=await readFile('content-dist/chunks/App-clCLiTpo.js','utf8');assert.ok(!/\b\w+\("template", null, \[/.test(app));
const bootstrap=JSON.parse(await readFile('src/data/catalogue-bootstrap.json','utf8'));assert.equal(bootstrap.rows.length,3395);
for(const url of bootstrap.urls){const body=await readFile('.'+url);assert.ok(url.includes(createHash('sha256').update(body).digest('hex').slice(0,16)));}
const card=await readFile('src/components/ChatMessageExport.vue','utf8');assert.ok(card.indexOf('{{body}}')<card.indexOf('aria-label="下载计划"'));assert.ok(!card.includes('<summary>查看正文'));
const api=await readFile('server/ai-api.mjs','utf8');assert.ok(api.includes('当前为文件正文输出模式'));assert.ok(api.includes('maxTokens:prepared.documentFormat?6000'));
const exporter=await readFile('content-dist/chunks/chatExport-BCM5BWUu.js');assert.ok(exporter.length>1000);
assert.ok(!card.includes('v-else class="vb-chat-export"'));
const chatPage=await readFile('src/pages/AiDietAssistantPage.vue','utf8');assert.ok(chatPage.includes('&&requestedDocumentFormat(exportQuestion(message.id))'));assert.ok(app.includes('回到最新消息'));assert.ok(app.includes('vb-chat-jump-bottom'));
const {createChatScroll}=await import('./src/lib/chatScroll.js');const view={clientHeight:400,scrollHeight:2000,scrollTop:0};let arrow=false;const scroll=createChatScroll({viewport:()=>view,onChange:v=>arrow=v});scroll.layout(true);assert.equal(view.scrollTop,1600);view.scrollTop=200;scroll.onScroll();assert.equal(arrow,true);view.scrollHeight=2200;scroll.layout();assert.equal(view.scrollTop,200);scroll.jump();assert.equal(view.scrollTop,1800);assert.equal(arrow,false);
console.log('CHAT_SCROLL_AND_REQUEST_ONLY_EXPORT_OK');
JS
node --check server/ai-api.mjs
node --test tests/progressive-catalogue.test.mjs tests/startup-compat.test.mjs tests/home-entry.test.mjs tests/chat-selection.test.mjs tests/chat-sync-client.test.mjs
switched=1
sudo -n ln -sfn "$release" /opt/weihengai/current
sudo -n systemctl restart weihengai
for n in $(seq 1 12); do if curl -fsS --max-time 3 http://127.0.0.1:4173/api/auth/me >/dev/null 2>&1; then break; fi; sleep 1; done
node --input-type=module <<'JS'
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4173';
assert.equal((await fetch(base+'/api/auth/me')).status,200);
const html=await (await fetch(base)).text();assert.ok(html.includes('App-clCLiTpo.js'));assert.ok(html.includes('useThemeTransition-CkarilED.js'));
const response=await fetch(base+'/content-dist/chunks/IntakeAnalysis-m4e3acVu.js',{method:'HEAD',headers:{'Accept-Encoding':'br,gzip'}});
assert.equal(response.status,200);assert.equal(response.headers.get('content-encoding'),'br');assert.ok(Number(response.headers.get('content-length'))<160000);
assert.equal((await fetch(base+'/content-dist/chunks/chatExport-BCM5BWUu.js')).status,200);
const entry=await fetch(base+'/content-dist/vitabalance.js');assert.equal(entry.headers.get('cache-control'),'no-store');assert.ok((await entry.text()).includes('main-D0cQsrir.js'));
console.log('LIVE_LOCAL_ENTRY_PRELOAD_AND_COMPRESSION_OK');
JS
sudo -n systemctl is-active weihengai
curl -fsS --max-time 15 https://weihengai.top/content-dist/vitabalance.js | grep -q 'main-D0cQsrir.js'
echo "RELEASE=$release"
echo CHAT_SCROLL_DEPLOY_OK
