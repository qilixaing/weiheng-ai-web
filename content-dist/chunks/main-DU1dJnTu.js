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
  const t = new AbortController(), o = (s) => {
    t.abort(s.target.reason), n();
  }, n = () => e.forEach((s) => s.removeEventListener("abort", o));
  for (const s of e) {
    if (s.aborted) {
      t.abort(s.reason), n();
      break;
    }
    s.addEventListener("abort", o, { once: !0 });
  }
  return t.signal;
}
const N = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function q(e, t, o, n) {
  const s = [];
  function a(r, i, l, d) {
    return N(i, l) ? i : N(i, r) ? l : N(l, r) ? i : (s.push(d), n === "remote" ? l : i);
  }
  const c = {};
  for (const r of /* @__PURE__ */ new Set([...Object.keys(e || {}), ...Object.keys(t || {}), ...Object.keys(o || {})])) {
    if (r === "calculated") continue;
    if (r === "records") {
      const l = [e, t, o].map((d) => Object.fromEntries((d?.records || []).map((m) => [m.date, m])));
      c.records = [...new Set(l.flatMap((d) => Object.keys(d)))].map((d) => a(...l.map((m) => m[d]), "记录 " + d)).filter(Boolean);
      continue;
    }
    if (["drafts", "habits"].includes(r)) {
      const l = [e?.[r] || {}, t?.[r] || {}, o?.[r] || {}];
      c[r] = {};
      for (const d of new Set(l.flatMap((m) => Object.keys(m)))) {
        const m = a(...l.map((G) => G[d]), r + " " + d);
        m !== void 0 && (c[r][d] = m);
      }
      continue;
    }
    const i = a(e?.[r], t?.[r], o?.[r], r);
    i !== void 0 && (c[r] = i);
  }
  return { state: c, conflicts: s };
}
const M = () => ({ threads: [], deleted: {}, activeByDate: {}, memoryEnabled: !0 });
function K(e = M(), t = M()) {
  const o = { ...e.deleted };
  for (const [a, c] of Object.entries(t.deleted || {})) o[a] = Math.max(Number(c) || 0, Number(o[a]) || 0);
  const n = Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), s = /* @__PURE__ */ new Map();
  for (const a of [...e.threads || [], ...t.threads || []]) {
    if (!a || typeof a.id != "string" || a.id.length > 120 || o[a.id] || !/^\d{4}-\d{2}-\d{2}$/.test(a.date) || !Array.isArray(a.messages) || n && Date.parse(a.createdAt) < n) continue;
    const c = s.get(a.id), r = new Map((c?.messages || []).map((i) => [i.id, i]));
    for (const i of a.messages) {
      if (!i || typeof i.id != "string" || i.id.length > 120 || !["user", "assistant"].includes(i.role) || typeof i.content != "string" || i.content.length > 1e5) continue;
      const l = r.get(i.id);
      (!l || Number(i.updatedAt || 0) > Number(l.updatedAt || 0) || Number(i.updatedAt || 0) === Number(l.updatedAt || 0) && (Number(i.updatedAt || 0) > 0 || i.content.length >= l.content.length)) && r.set(i.id, { ...i });
    }
    s.set(a.id, { id: a.id, date: a.date, createdAt: a.createdAt, messages: [...r.values()].sort((i, l) => String(i.createdAt || "").localeCompare(String(l.createdAt || ""))).slice(-1e3) });
  }
  return { threads: [...s.values()].sort((a, c) => String(a.createdAt || "").localeCompare(String(c.createdAt || ""))), deleted: o, clearedAt: n, activeByDate: { ...e.activeByDate, ...t.activeByDate }, memoryEnabled: t.memoryEnabled ?? e.memoryEnabled ?? !0 };
}
function R(e, t, o = Date.now()) {
  const n = new Map((e.threads || []).flatMap((c) => c.messages || []).map((c) => [c.id, c])), s = { ...e.deleted, ...t.deleted };
  new Set((t.threads || []).map((c) => c.id));
  const a = (c) => JSON.stringify({ ...c, updatedAt: void 0 });
  return { ...t, deleted: s, clearedAt: Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), threads: (t.threads || []).map((c) => ({ ...c, messages: c.messages.map((r) => ({ ...r, updatedAt: a(r) === a(n.get(r.id) || {}) && n.get(r.id)?.updatedAt || o })) })) };
}
let u = "guest", A = 0;
const b = "weiheng.ai-diet-chat.v1";
let C = !1, T = 0, O = !1;
const E = v("guest"), y = (e) => {
  try {
    return JSON.parse(e) || { threads: [] };
  } catch {
    return { threads: [] };
  }
};
async function h() {
  if (u === "guest" || C || O) return;
  const e = u, t = g(b), o = globalThis.localStorage.getItem(t);
  C = !0, E.value = "syncing";
  try {
    const n = await fetch("/api/chat", { method: o ? "PUT" : "GET", cache: "no-store", signal: I(15e3), headers: { "Content-Type": "application/json" }, ...o ? { body: JSON.stringify({ ...y(o), expectedUserId: e }) } : {} }), s = await n.json();
    if (!n.ok) throw Error(s.error);
    if (O || u !== e || s.userId !== e) return;
    const a = globalThis.localStorage.getItem(t), c = K(s.state, y(a)), r = JSON.stringify(c);
    globalThis.localStorage.setItem(t, r), E.value = a !== o ? "pending" : "synced", W.value = (/* @__PURE__ */ new Date()).toISOString(), a !== r && window.dispatchEvent(new CustomEvent("weiheng-chat-synced")), a !== o && (clearTimeout(T), T = setTimeout(h, 1e3));
  } catch {
    E.value = "error";
  } finally {
    C = !1;
  }
}
const p = "weiheng.local.v2", B = v(null), f = v("guest"), P = v(""), W = v(""), k = v([]);
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
async function w(e = "GET", t, o) {
  const n = { method: e, cache: "no-store", signal: I(15e3), headers: { "Content-Type": "application/json" } };
  e === "PUT" && (n.body = JSON.stringify({ localState: t, baseLocalState: o, expectedUserId: u === "guest" ? void 0 : u }));
  const s = await fetch("/api/data", n), a = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(a.error || "账号数据同步失败。");
  return a;
}
async function S(e) {
  if (u === "guest" || j) return;
  const t = u, o = g(p), n = globalThis.localStorage.getItem(o);
  if (n !== null) {
    j = !0, f.value = "syncing";
    try {
      const s = await w("GET"), a = s.data?.localState || null;
      if (u !== t || s.userId !== t) {
        f.value = "error";
        return;
      }
      const c = globalThis.localStorage.getItem(J()), r = q(D(c), D(n), D(a), e);
      if (r.conflicts.length) {
        const l = g("__sync_conflict_backup.v1");
        if ((!globalThis.localStorage.getItem(l) || !k.value.length) && globalThis.localStorage.setItem(l, JSON.stringify({ local: n, server: a, at: (/* @__PURE__ */ new Date()).toISOString() })), !e) {
          k.value = r.conflicts, f.value = "error";
          return;
        }
      }
      const i = JSON.stringify(r.state);
      if (await w("PUT", i, a), u !== t) return;
      globalThis.localStorage.setItem(J(), i), globalThis.localStorage.getItem(o) === n ? (globalThis.localStorage.setItem(o, i), globalThis.localStorage.removeItem(U()), window.dispatchEvent(new CustomEvent("weiheng-account-synced")), f.value = "synced", k.value = []) : (f.value = "pending", clearTimeout(A), A = setTimeout(() => S(), 450)), P.value = (/* @__PURE__ */ new Date()).toISOString();
    } catch {
      f.value = "error";
    } finally {
      j = !1;
    }
  }
}
async function X(e) {
  await S(e), await h();
}
function Z() {
  return globalThis.localStorage.getItem(g("__sync_conflict_backup.v1"));
}
function x() {
  u !== "guest" && (globalThis.localStorage.setItem(U(), "1"), f.value = "pending", clearTimeout(A), A = setTimeout(() => S(), 450));
}
const _ = {
  getItem: (e) => globalThis.localStorage.getItem(g(e)),
  setItem(e, t) {
    if (e === b) {
      const o = y(_.getItem(e));
      t = JSON.stringify(K(o, R(o, y(t))));
    }
    globalThis.localStorage.setItem(g(e), t), e === b && u !== "guest" && (E.value = "pending", clearTimeout(T), T = setTimeout(h, 900)), e === p && x();
  },
  removeItem(e) {
    globalThis.localStorage.removeItem(g(e)), e === p && u !== "guest" && (f.value = "error", globalThis.localStorage.setItem(U(), "deleted"));
  }
};
async function $(e) {
  const t = g(p, e), o = globalThis.localStorage.getItem(g("__account_sync_pending.v1", e)), n = globalThis.localStorage.getItem(t), s = await w("GET"), a = typeof s.data?.localState == "string" ? s.data.localState : null;
  if (o === "deleted") {
    if (!(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok) throw new Error("账号数据删除状态暂未同步。");
    globalThis.localStorage.removeItem(g("__account_sync_pending.v1", e));
  } else if (o && n !== null) {
    await S();
    return;
  } else if (a !== null && n !== null && a !== n) {
    await S();
    return;
  } else a !== null ? globalThis.localStorage.setItem(t, a) : n !== null && await w("PUT", n, null);
  globalThis.localStorage.setItem(J(), a || n || "{}"), P.value = (/* @__PURE__ */ new Date()).toISOString(), f.value = "synced";
}
async function z() {
  try {
    const n = await fetch("/api/auth/me", { cache: "no-store", signal: I(2e4) });
    if (!n.ok) throw Error("identity");
    const s = await n.json();
    if (B.value = s.authenticated && typeof s.user?.id == "string" ? s.user : null, u = B.value?.id || "guest", f.value = u === "guest" ? "guest" : "syncing", u !== "guest") {
      try {
        await $(u);
      } catch {
        f.value = "error";
      }
      h();
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
        const s = await n.json(), a = s.authenticated && typeof s.user?.id == "string" ? s.user.id : "guest";
        a !== u ? window.location.reload() : a !== "guest" && await S();
      } catch {
      } finally {
        e = !1;
      }
    }
  };
  window.addEventListener("focus", () => {
    t(), h();
  }), window.addEventListener("online", () => {
    h();
  }), document.addEventListener("visibilitychange", () => {
    document.hidden || h();
  }), window.addEventListener("pagehide", () => {
    if (window.dispatchEvent(new CustomEvent("weiheng-chat-flush")), u !== "guest") {
      const n = _.getItem(b);
      n && fetch("/api/chat", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...y(n), expectedUserId: u }), keepalive: !0 }).catch(() => {
      });
    }
  }), setInterval(() => {
    document.hidden || h();
  }, 8e3).unref?.(), window.addEventListener("weiheng-reset-begin", () => {
    O = !0, clearTimeout(T);
  }), window.addEventListener("weiheng-reset-abort", () => {
    O = !1;
  }), document.addEventListener("visibilitychange", t), window.addEventListener("storage", (n) => {
    n.key === g(b) && (window.dispatchEvent(new CustomEvent("weiheng-chat-synced")), h()), n.key === g(p) && u !== "guest" && x();
  });
}
async function ee({ mode: e, email: t, password: o, acceptTerms: n = !1, verificationCode: s = "" }) {
  const a = globalThis.localStorage.getItem(p), c = await fetch(`/api/auth/${e === "register" ? "register" : "login"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email: t, password: o, acceptTerms: n, verificationCode: s })
  }), r = await c.json().catch(() => ({}));
  if (!c.ok) throw new Error(r.error || "登录暂时失败，请重试。");
  const i = await w("GET"), l = typeof i.data?.localState == "string" ? i.data.localState : null;
  let d = "账号已登录。";
  return a && l === null ? window.confirm("发现本浏览器已有游客档案和饮食记录。是否复制到这个账号？游客原数据会保留，不会删除。") ? (await w("PUT", a), globalThis.localStorage.setItem(g(p, r.user.id), a), d += "游客数据已复制到账号。") : d += "游客数据仍留在原浏览器空间。" : a && l !== null && (d += "账号已有数据，游客数据仍保留在原浏览器空间，未覆盖账号数据。"), window.location.reload(), { message: d };
}
async function te() {
  if (await h(), !(await fetch("/api/auth/logout", { method: "POST", cache: "no-store" })).ok) throw new Error("退出登录失败，请重试。");
  window.location.reload();
}
function ae() {
  const e = "weiheng.ai-diet-chat.v1", t = y(_.getItem(e)), o = { ...t.deleted };
  for (const n of t.threads || []) o[n.id] = Date.now();
  _.setItem(e, JSON.stringify({ threads: [], deleted: o, clearedAt: Date.now(), activeByDate: {}, memoryEnabled: t.memoryEnabled }));
}
async function H() {
  try {
    await z();
    const { default: e } = await import("./App-CkNScUK5.js");
    L(e).mount("#app");
  } catch {
    const { default: e } = await import("./HomeEntry-DgOMD-Vy.js");
    L(e).mount("#app");
  }
}
H();
export {
  B as a,
  _ as b,
  F as c,
  Q as d,
  E as e,
  ae as f,
  h as g,
  f as h,
  z as i,
  W as j,
  k,
  P as l,
  Z as m,
  te as n,
  V as o,
  ee as p,
  X as r,
  g as s,
  I as t
};
