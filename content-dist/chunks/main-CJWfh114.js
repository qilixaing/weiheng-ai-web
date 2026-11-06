import { r as v, c as L } from "./vue-runtime-wiGxZMXT.js";
function I(e) {
  if (typeof AbortSignal.timeout == "function") return AbortSignal.timeout(e);
  const t = new AbortController();
  return setTimeout(() => {
    const n = new Error("Request timed out");
    n.name = "TimeoutError", t.abort(n);
  }, e).unref?.(), t.signal;
}
function F(e) {
  if (typeof AbortSignal.any == "function") return AbortSignal.any(e);
  const t = new AbortController(), r = (o) => {
    t.abort(o.target.reason), n();
  }, n = () => e.forEach((o) => o.removeEventListener("abort", r));
  for (const o of e) {
    if (o.aborted) {
      t.abort(o.reason), n();
      break;
    }
    o.addEventListener("abort", r, { once: !0 });
  }
  return t.signal;
}
const N = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function G(e, t, r, n) {
  const o = [];
  function a(s, i, l, d) {
    return N(i, l) ? i : N(i, s) ? l : N(l, s) ? i : (o.push(d), n === "remote" ? l : i);
  }
  const c = {};
  for (const s of /* @__PURE__ */ new Set([...Object.keys(e || {}), ...Object.keys(t || {}), ...Object.keys(r || {})])) {
    if (s === "calculated") continue;
    if (s === "records") {
      const l = [e, t, r].map((d) => Object.fromEntries((d?.records || []).map((h) => [h.date, h])));
      c.records = [...new Set(l.flatMap((d) => Object.keys(d)))].map((d) => a(...l.map((h) => h[d]), "记录 " + d)).filter(Boolean);
      continue;
    }
    if (["drafts", "habits"].includes(s)) {
      const l = [e?.[s] || {}, t?.[s] || {}, r?.[s] || {}];
      c[s] = {};
      for (const d of new Set(l.flatMap((h) => Object.keys(h)))) {
        const h = a(...l.map((x) => x[d]), s + " " + d);
        h !== void 0 && (c[s][d] = h);
      }
      continue;
    }
    const i = a(e?.[s], t?.[s], r?.[s], s);
    i !== void 0 && (c[s] = i);
  }
  return { state: c, conflicts: o };
}
const M = () => ({ threads: [], deleted: {}, activeByDate: {}, memoryEnabled: !0 });
function q(e = M(), t = M()) {
  const r = { ...e.deleted };
  for (const [a, c] of Object.entries(t.deleted || {})) r[a] = Math.max(Number(c) || 0, Number(r[a]) || 0);
  const n = Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), o = /* @__PURE__ */ new Map();
  for (const a of [...e.threads || [], ...t.threads || []]) {
    if (!a || typeof a.id != "string" || a.id.length > 120 || r[a.id] || !/^\d{4}-\d{2}-\d{2}$/.test(a.date) || !Array.isArray(a.messages) || n && Date.parse(a.createdAt) < n) continue;
    const c = o.get(a.id), s = new Map((c?.messages || []).map((i) => [i.id, i]));
    for (const i of a.messages) {
      if (!i || typeof i.id != "string" || i.id.length > 120 || !["user", "assistant"].includes(i.role) || typeof i.content != "string" || i.content.length > 1e5) continue;
      const l = s.get(i.id);
      (!l || Number(i.updatedAt || 0) > Number(l.updatedAt || 0) || Number(i.updatedAt || 0) === Number(l.updatedAt || 0) && (Number(i.updatedAt || 0) > 0 || i.content.length >= l.content.length)) && s.set(i.id, { ...i });
    }
    o.set(a.id, { id: a.id, date: a.date, createdAt: a.createdAt, messages: [...s.values()].sort((i, l) => String(i.createdAt || "").localeCompare(String(l.createdAt || ""))).slice(-1e3) });
  }
  return { threads: [...o.values()].sort((a, c) => String(a.createdAt || "").localeCompare(String(c.createdAt || ""))), deleted: r, clearedAt: n, activeByDate: { ...e.activeByDate, ...t.activeByDate }, memoryEnabled: t.memoryEnabled ?? e.memoryEnabled ?? !0 };
}
function R(e, t, r = Date.now()) {
  const n = new Map((e.threads || []).flatMap((c) => c.messages || []).map((c) => [c.id, c])), o = { ...e.deleted, ...t.deleted };
  new Set((t.threads || []).map((c) => c.id));
  const a = (c) => JSON.stringify({ ...c, updatedAt: void 0 });
  return { ...t, deleted: o, clearedAt: Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), threads: (t.threads || []).map((c) => ({ ...c, messages: c.messages.map((s) => ({ ...s, updatedAt: a(s) === a(n.get(s.id) || {}) && n.get(s.id)?.updatedAt || r })) })) };
}
let u = "guest", A = 0;
const E = "weiheng.ai-diet-chat.v1";
let C = !1, b = 0, O = !1;
const T = v("guest"), y = (e) => {
  try {
    return JSON.parse(e) || { threads: [] };
  } catch {
    return { threads: [] };
  }
};
async function m() {
  if (u === "guest" || C || O) return;
  const e = u, t = g(E), r = globalThis.localStorage.getItem(t);
  C = !0, T.value = "syncing";
  try {
    const n = await fetch("/api/chat", { method: r ? "PUT" : "GET", cache: "no-store", signal: I(15e3), headers: { "Content-Type": "application/json" }, ...r ? { body: JSON.stringify({ ...y(r), expectedUserId: e }) } : {} }), o = await n.json();
    if (!n.ok) throw Error(o.error);
    if (O || u !== e || o.userId !== e) return;
    const a = globalThis.localStorage.getItem(t), c = q(o.state, y(a)), s = JSON.stringify(c);
    globalThis.localStorage.setItem(t, s), T.value = "synced", W.value = (/* @__PURE__ */ new Date()).toISOString(), a !== s && window.dispatchEvent(new CustomEvent("weiheng-chat-synced")), a !== r && (clearTimeout(b), b = setTimeout(m, 1e3));
  } catch {
    T.value = "error";
  } finally {
    C = !1;
  }
}
const p = "weiheng.local.v2", B = v(null), f = v("guest"), K = v(""), W = v(""), k = v([]);
let j = !1;
const J = () => g("__account_sync_base.v1"), D = (e) => {
  try {
    return JSON.parse(e) || {};
  } catch {
    return {};
  }
}, Q = () => u;
function g(e, t = u) {
  return t === "guest" ? e : "weiheng.account." + encodeURIComponent(t) + "." + e;
}
function V(e, t = u) {
  return t === "guest" ? /^(weiheng|vitabalance)([.:\-]|$)/.test(e) && !e.startsWith("weiheng.account.") : e.startsWith("weiheng.account." + encodeURIComponent(t) + ".");
}
const U = () => g("__account_sync_pending.v1");
async function w(e = "GET", t, r) {
  const n = { method: e, cache: "no-store", signal: I(15e3), headers: { "Content-Type": "application/json" } };
  e === "PUT" && (n.body = JSON.stringify({ localState: t, baseLocalState: r, expectedUserId: u === "guest" ? void 0 : u }));
  const o = await fetch("/api/data", n), a = await o.json().catch(() => ({}));
  if (!o.ok) throw new Error(a.error || "账号数据同步失败。");
  return a;
}
async function S(e) {
  if (u === "guest" || j) return;
  const t = u, r = g(p), n = globalThis.localStorage.getItem(r);
  if (n !== null) {
    j = !0, f.value = "syncing";
    try {
      const o = await w("GET"), a = o.data?.localState || null;
      if (u !== t || o.userId !== t) {
        f.value = "error";
        return;
      }
      const c = globalThis.localStorage.getItem(J()), s = G(D(c), D(n), D(a), e);
      if (s.conflicts.length) {
        const l = g("__sync_conflict_backup.v1");
        if ((!globalThis.localStorage.getItem(l) || !k.value.length) && globalThis.localStorage.setItem(l, JSON.stringify({ local: n, server: a, at: (/* @__PURE__ */ new Date()).toISOString() })), !e) {
          k.value = s.conflicts, f.value = "error";
          return;
        }
      }
      const i = JSON.stringify(s.state);
      if (await w("PUT", i, a), u !== t) return;
      globalThis.localStorage.setItem(J(), i), globalThis.localStorage.getItem(r) === n ? (globalThis.localStorage.setItem(r, i), globalThis.localStorage.removeItem(U()), window.dispatchEvent(new CustomEvent("weiheng-account-synced")), f.value = "synced", k.value = []) : (f.value = "pending", clearTimeout(A), A = setTimeout(() => S(), 450)), K.value = (/* @__PURE__ */ new Date()).toISOString();
    } catch {
      f.value = "error";
    } finally {
      j = !1;
    }
  }
}
async function X(e) {
  await S(e), await m();
}
function Z() {
  return globalThis.localStorage.getItem(g("__sync_conflict_backup.v1"));
}
function P() {
  u !== "guest" && (globalThis.localStorage.setItem(U(), "1"), f.value = "pending", clearTimeout(A), A = setTimeout(() => S(), 450));
}
const _ = {
  getItem: (e) => globalThis.localStorage.getItem(g(e)),
  setItem(e, t) {
    e === E && (t = JSON.stringify(R(y(_.getItem(e)), y(t)))), globalThis.localStorage.setItem(g(e), t), e === E && u !== "guest" && (T.value = "pending", clearTimeout(b), b = setTimeout(m, 900)), e === p && P();
  },
  removeItem(e) {
    globalThis.localStorage.removeItem(g(e)), e === p && u !== "guest" && (f.value = "error", globalThis.localStorage.setItem(U(), "deleted"));
  }
};
async function $(e) {
  const t = g(p, e), r = globalThis.localStorage.getItem(g("__account_sync_pending.v1", e)), n = globalThis.localStorage.getItem(t), o = await w("GET"), a = typeof o.data?.localState == "string" ? o.data.localState : null;
  if (r === "deleted") {
    if (!(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok) throw new Error("账号数据删除状态暂未同步。");
    globalThis.localStorage.removeItem(g("__account_sync_pending.v1", e));
  } else if (r && n !== null) {
    await S();
    return;
  } else if (a !== null && n !== null && a !== n) {
    await S();
    return;
  } else a !== null ? globalThis.localStorage.setItem(t, a) : n !== null && await w("PUT", n, null);
  globalThis.localStorage.setItem(J(), a || n || "{}"), K.value = (/* @__PURE__ */ new Date()).toISOString(), f.value = "synced";
}
async function z() {
  try {
    const n = await fetch("/api/auth/me", { cache: "no-store", signal: I(2e4) });
    if (!n.ok) throw Error("identity");
    const o = await n.json();
    if (B.value = o.authenticated && typeof o.user?.id == "string" ? o.user : null, u = B.value?.id || "guest", f.value = u === "guest" ? "guest" : "syncing", u !== "guest") {
      try {
        await $(u);
      } catch {
        f.value = "error";
      }
      m();
    }
  } catch {
    throw new Error("无法确认当前使用空间，暂停读取本地数据。");
  }
  let e = !1;
  const t = async () => {
    if (!(e || document.hidden)) {
      e = !0;
      try {
        const n = await fetch("/api/auth/me", { cache: "no-store", signal: I(4e3) });
        if (!n.ok) return;
        const o = await n.json(), a = o.authenticated && typeof o.user?.id == "string" ? o.user.id : "guest";
        a !== u ? window.location.reload() : a !== "guest" && await S();
      } catch {
      } finally {
        e = !1;
      }
    }
  };
  window.addEventListener("focus", () => {
    t(), m();
  }), window.addEventListener("online", () => {
    m();
  }), document.addEventListener("visibilitychange", () => {
    document.hidden || m();
  }), window.addEventListener("pagehide", () => {
    if (u !== "guest") {
      const n = _.getItem(E);
      n && fetch("/api/chat", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...y(n), expectedUserId: u }), keepalive: !0 }).catch(() => {
      });
    }
  }), setInterval(() => {
    document.hidden || m();
  }, 8e3).unref?.(), window.addEventListener("weiheng-reset-begin", () => {
    O = !0, clearTimeout(b);
  }), window.addEventListener("weiheng-reset-abort", () => {
    O = !1;
  }), document.addEventListener("visibilitychange", t), window.addEventListener("storage", (n) => {
    n.key === g(p) && u !== "guest" && P();
  });
}
async function ee({ mode: e, email: t, password: r, acceptTerms: n = !1, verificationCode: o = "" }) {
  const a = globalThis.localStorage.getItem(p), c = await fetch(`/api/auth/${e === "register" ? "register" : "login"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email: t, password: r, acceptTerms: n, verificationCode: o })
  }), s = await c.json().catch(() => ({}));
  if (!c.ok) throw new Error(s.error || "登录暂时失败，请重试。");
  const i = await w("GET"), l = typeof i.data?.localState == "string" ? i.data.localState : null;
  let d = "账号已登录。";
  return a && l === null ? window.confirm("发现本浏览器已有游客档案和饮食记录。是否复制到这个账号？游客原数据会保留，不会删除。") ? (await w("PUT", a), globalThis.localStorage.setItem(g(p, s.user.id), a), d += "游客数据已复制到账号。") : d += "游客数据仍留在原浏览器空间。" : a && l !== null && (d += "账号已有数据，游客数据仍保留在原浏览器空间，未覆盖账号数据。"), window.location.reload(), { message: d };
}
async function te() {
  if (await m(), !(await fetch("/api/auth/logout", { method: "POST", cache: "no-store" })).ok) throw new Error("退出登录失败，请重试。");
  window.location.reload();
}
function ae() {
  const e = "weiheng.ai-diet-chat.v1", t = y(_.getItem(e)), r = { ...t.deleted };
  for (const n of t.threads || []) r[n.id] = Date.now();
  _.setItem(e, JSON.stringify({ threads: [], deleted: r, clearedAt: Date.now(), activeByDate: {}, memoryEnabled: t.memoryEnabled }));
}
async function H() {
  try {
    await z();
    const { default: e } = await import("./App-DNPbvS8O.js");
    L(e).mount("#app");
  } catch {
    const { default: e } = await import("./HomeEntry-mC-vWuH3.js");
    L(e).mount("#app");
  }
}
H();
export {
  B as a,
  _ as b,
  F as c,
  Q as d,
  T as e,
  ae as f,
  f as g,
  W as h,
  z as i,
  k as j,
  Z as k,
  K as l,
  te as m,
  ee as n,
  V as o,
  X as r,
  g as s,
  I as t
};
