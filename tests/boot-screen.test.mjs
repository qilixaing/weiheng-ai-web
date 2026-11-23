import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = html.match(/<script>\s*([\s\S]*?)<\/script>\s*<\/body>/)?.[1];

function boot(reducedMotion = false) {
  let now = 0;
  let nextId = 0;
  let removed = false;
  const tasks = new Map();
  const listeners = new Map();
  const ring = {style: {}};
  const dot = {style: {}};
  const logo = {style: {}};
  const retry = {
    visible: false,
    classList: {add() { retry.visible = true; }},
    removeAttribute() {},
  };
  const screen = {
    style: {},
    querySelector(selector) {
      return {'.boot-ring-progress': ring, '.boot-dot': dot, '.boot-logo': logo, '.boot-retry': retry}[selector];
    },
    remove() { removed = true; },
  };
  function schedule(callback, delay, animation = false) {
    const id = ++nextId;
    tasks.set(id, {at: now + delay, callback, animation});
    return id;
  }
  const scope = {
    document: {getElementById: () => screen},
    window: {addEventListener: (event, callback) => listeners.set(event, callback)},
    matchMedia: () => ({matches: reducedMotion}),
    performance: {now: () => now},
    requestAnimationFrame: callback => schedule(callback, 16, true),
    cancelAnimationFrame: id => tasks.delete(id),
    setTimeout: (callback, delay) => schedule(callback, delay),
    clearTimeout: id => tasks.delete(id),
  };
  runInNewContext(script, scope);
  return {
    advanceTo(time) {
      while (true) {
        const next = [...tasks].sort((a, b) => a[1].at - b[1].at)[0];
        if (!next || next[1].at > time) break;
        tasks.delete(next[0]);
        now = next[1].at;
        next[1].callback(next[1].animation ? now : undefined);
      }
      now = time;
    },
    ready() { listeners.get('app-ready')(); },
    get progress() { return 1 - Number(ring.style.strokeDashoffset) / 289; },
    get dotProgress() { return Number.parseFloat(dot.style.offsetDistance) / 100; },
    get removed() { return removed; },
    get retryVisible() { return retry.visible; },
    get pointerEvents() { return screen.style.pointerEvents; },
    get logoAnimation() { return logo.style.animation; },
  };
}

test('boot layer stays outside the Vue mount target', () => {
  assert.match(html, /<div id="app"><\/div>\s*<div id="boot-screen"/);
  assert.ok(script);
  assert.doesNotMatch(script, /window\.load|addEventListener\(['"]load['"]/);
});

for (const [readyAt, expectedProgress] of [[500, 0.23], [1500, 0.68]]) {
  test(`app-ready at ${readyAt}ms accelerates the current progress`, () => {
    const state = boot();
    state.advanceTo(readyAt);
    assert.ok(Math.abs(state.progress - expectedProgress) < 0.02);
    state.ready();
    assert.equal(state.pointerEvents, 'none');
    assert.equal(state.logoAnimation, 'none');
    state.advanceTo(readyAt + 120);
    assert.ok(state.progress > expectedProgress);
    assert.ok(Math.abs(state.progress - state.dotProgress) < 0.001);
    state.advanceTo(readyAt + 240);
    assert.equal(state.progress, 1);
    assert.equal(state.removed, false);
    state.advanceTo(readyAt + 380);
    assert.equal(state.removed, true);
  });
}

test('full ring waits for readiness and retry appears only after five seconds', () => {
  const state = boot();
  state.advanceTo(3000);
  assert.equal(state.progress, 1);
  assert.equal(state.removed, false);
  assert.equal(state.retryVisible, false);
  state.advanceTo(5000);
  assert.equal(state.retryVisible, true);
  state.ready();
  state.advanceTo(5140);
  assert.equal(state.removed, true);
});

test('app-ready after the 2.2 second fill fades without replaying the ring', () => {
  const state = boot();
  state.advanceTo(3000);
  assert.equal(state.progress, 1);
  state.ready();
  assert.equal(state.progress, 1);
  assert.equal(state.retryVisible, false);
  state.advanceTo(3140);
  assert.equal(state.removed, true);
});

test('reduced motion starts at a full ring and fades on readiness', () => {
  const state = boot(true);
  assert.equal(state.progress, 1);
  state.advanceTo(500);
  state.ready();
  state.advanceTo(640);
  assert.equal(state.removed, true);
});
