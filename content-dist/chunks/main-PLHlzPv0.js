import { r as b, c as B } from "./vue-runtime-tIIV23yc.js";
function A(e) {
  if (typeof AbortSignal.timeout == "function") return AbortSignal.timeout(e);
  const t = new AbortController();
  return setTimeout(() => {
    const a = new Error("Request timed out");
    a.name = "TimeoutError", t.abort(a);
  }, e).unref?.(), t.signal;
}
function Q(e) {
  if (typeof AbortSignal.any == "function") return AbortSignal.any(e);
  const t = new AbortController(), o = (s) => {
    t.abort(s.target.reason), a();
  }, a = () => e.forEach((s) => s.removeEventListener("abort", o));
  for (const s of e) {
    if (s.aborted) {
      t.abort(s.reason), a();
      break;
    }
    s.addEventListener("abort", o, { once: !0 });
  }
  return t.signal;
}
const C = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function R(e, t, o, a) {
  const s = [];
  function n(r, i, u, d) {
    return C(i, u) ? i : C(i, r) ? u : C(u, r) ? i : (s.push(d), a === "remote" ? u : i);
  }
  const c = {};
  for (const r of /* @__PURE__ */ new Set([...Object.keys(e || {}), ...Object.keys(t || {}), ...Object.keys(o || {})])) {
    if (r === "calculated") continue;
    if (r === "records") {
      const u = [e, t, o].map((d) => Object.fromEntries((d?.records || []).map((f) => [f.date, f])));
      c.records = [...new Set(u.flatMap((d) => Object.keys(d)))].map((d) => n(...u.map((f) => f[d]), "记录 " + d)).filter(Boolean);
      continue;
    }
    if (["drafts", "habits"].includes(r)) {
      const u = [e?.[r] || {}, t?.[r] || {}, o?.[r] || {}];
      c[r] = {};
      for (const d of new Set(u.flatMap((f) => Object.keys(f)))) {
        const f = n(...u.map((q) => q[d]), r + " " + d);
        f !== void 0 && (c[r][d] = f);
      }
      continue;
    }
    const i = n(e?.[r], t?.[r], o?.[r], r);
    i !== void 0 && (c[r] = i);
  }
  return { state: c, conflicts: s };
}
const K = () => ({ threads: [], deleted: {}, activeByDate: {}, memoryEnabled: !0 });
function P(e = K(), t = K()) {
  const o = { ...e.deleted };
  for (const [n, c] of Object.entries(t.deleted || {})) o[n] = Math.max(Number(c) || 0, Number(o[n]) || 0);
  const a = Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), s = /* @__PURE__ */ new Map();
  for (const n of [...e.threads || [], ...t.threads || []]) {
    if (!n || typeof n.id != "string" || n.id.length > 120 || o[n.id] || !/^\d{4}-\d{2}-\d{2}$/.test(n.date) || !Array.isArray(n.messages) || a && Date.parse(n.createdAt) < a) continue;
    const c = s.get(n.id), r = new Map((c?.messages || []).map((i) => [i.id, i]));
    for (const i of n.messages) {
      if (!i || typeof i.id != "string" || i.id.length > 120 || !["user", "assistant"].includes(i.role) || typeof i.content != "string" || i.content.length > 1e5) continue;
      const u = r.get(i.id);
      (!u || Number(i.updatedAt || 0) > Number(u.updatedAt || 0) || Number(i.updatedAt || 0) === Number(u.updatedAt || 0) && (Number(i.updatedAt || 0) > 0 || i.content.length >= u.content.length)) && r.set(i.id, { ...i });
    }
    s.set(n.id, { id: n.id, date: n.date, createdAt: n.createdAt, messages: [...r.values()].sort((i, u) => String(i.createdAt || "").localeCompare(String(u.createdAt || ""))).slice(-1e3) });
  }
  return { threads: [...s.values()].sort((n, c) => String(n.createdAt || "").localeCompare(String(c.createdAt || ""))), deleted: o, clearedAt: a, activeByDate: { ...e.activeByDate, ...t.activeByDate }, memoryEnabled: t.memoryEnabled ?? e.memoryEnabled ?? !0 };
}
function W(e, t, o = Date.now()) {
  const a = new Map((e.threads || []).flatMap((c) => c.messages || []).map((c) => [c.id, c])), s = { ...e.deleted, ...t.deleted };
  new Set((t.threads || []).map((c) => c.id));
  const n = (c) => JSON.stringify({ ...c, updatedAt: void 0 });
  return { ...t, deleted: s, clearedAt: Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), threads: (t.threads || []).map((c) => ({ ...c, messages: c.messages.map((r) => ({ ...r, updatedAt: n(r) === n(a.get(r.id) || {}) && a.get(r.id)?.updatedAt || o })) })) };
}
let l = "guest", T = !1, O = 0;
const y = "weiheng.ai-diet-chat.v1";
let j = !1, E = 0, _ = !1;
const I = b("guest"), w = (e) => {
  try {
    return JSON.parse(e) || { threads: [] };
  } catch {
    return { threads: [] };
  }
};
async function m() {
  if (l === "guest" || j || _) return;
  const e = l, t = g(y), o = globalThis.localStorage.getItem(t);
  j = !0, I.value = "syncing";
  try {
    const a = await fetch("/api/chat", { method: o ? "PUT" : "GET", cache: "no-store", signal: A(15e3), headers: { "Content-Type": "application/json" }, ...o ? { body: JSON.stringify({ ...w(o), expectedUserId: e }) } : {} }), s = await a.json();
    if (!a.ok) throw Error(s.error);
    if (_ || l !== e || s.userId !== e) return;
    const n = globalThis.localStorage.getItem(t), c = P(s.state, w(n)), r = JSON.stringify(c);
    globalThis.localStorage.setItem(t, r), I.value = n !== o ? "pending" : "synced", $.value = (/* @__PURE__ */ new Date()).toISOString(), n !== r && window.dispatchEvent(new CustomEvent("weiheng-chat-synced")), n !== o && (clearTimeout(E), E = setTimeout(m, 1e3));
  } catch {
    I.value = "error";
  } finally {
    j = !1;
  }
}
const p = "weiheng.local.v2", k = b(null), h = b("guest"), x = b(""), $ = b(""), D = b([]);
let J = !1;
const L = () => g("__account_sync_base.v1"), U = (e) => {
  try {
    return JSON.parse(e) || {};
  } catch {
    return {};
  }
}, V = () => l;
function g(e, t = l) {
  return t === "guest" ? e : "weiheng.account." + encodeURIComponent(t) + "." + e;
}
function X(e, t = l) {
  return t === "guest" ? /^(weiheng|vitabalance)([.:\-]|$)/.test(e) && !e.startsWith("weiheng.account.") : e.startsWith("weiheng.account." + encodeURIComponent(t) + ".");
}
const M = () => g("__account_sync_pending.v1");
async function S(e = "GET", t, o) {
  const a = { method: e, cache: "no-store", signal: A(15e3), headers: { "Content-Type": "application/json" } };
  e === "PUT" && (a.body = JSON.stringify({ localState: t, baseLocalState: o, expectedUserId: l === "guest" ? void 0 : l }));
  const s = await fetch("/api/data", a), n = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(n.error || "账号数据同步失败。");
  return n;
}
async function v(e) {
  if (l === "guest" || J) return;
  const t = l, o = g(p), a = globalThis.localStorage.getItem(o);
  if (a !== null) {
    J = !0, h.value = "syncing";
    try {
      const s = await S("GET"), n = s.data?.localState || null;
      if (l !== t || s.userId !== t) {
        h.value = "error";
        return;
      }
      const c = globalThis.localStorage.getItem(L()), r = R(U(c), U(a), U(n), e);
      if (r.conflicts.length) {
        const u = g("__sync_conflict_backup.v1");
        if ((!globalThis.localStorage.getItem(u) || !D.value.length) && globalThis.localStorage.setItem(u, JSON.stringify({ local: a, server: n, at: (/* @__PURE__ */ new Date()).toISOString() })), !e) {
          D.value = r.conflicts, h.value = "error";
          return;
        }
      }
      const i = JSON.stringify(r.state);
      if (await S("PUT", i, n), l !== t) return;
      globalThis.localStorage.setItem(L(), i), globalThis.localStorage.getItem(o) === a ? (globalThis.localStorage.setItem(o, i), globalThis.localStorage.removeItem(M()), window.dispatchEvent(new CustomEvent("weiheng-account-synced")), h.value = "synced", D.value = []) : (h.value = "pending", clearTimeout(O), O = setTimeout(() => v(), 450)), x.value = (/* @__PURE__ */ new Date()).toISOString();
    } catch {
      h.value = "error";
    } finally {
      J = !1;
    }
  }
}
async function Z(e) {
  await v(e), await m();
}
function ee() {
  return globalThis.localStorage.getItem(g("__sync_conflict_backup.v1"));
}
function G() {
  l !== "guest" && (globalThis.localStorage.setItem(M(), "1"), h.value = "pending", clearTimeout(O), O = setTimeout(() => v(), 450));
}
const N = {
  getItem: (e) => globalThis.localStorage.getItem(g(e)),
  setItem(e, t) {
    if (T && (e === p || e === y)) throw new Error("账号状态暂不可确认；请联网后刷新再保存。");
    if (e === y) {
      const o = w(N.getItem(e));
      t = JSON.stringify(P(o, W(o, w(t))));
    }
    globalThis.localStorage.setItem(g(e), t), e === y && l !== "guest" && (I.value = "pending", clearTimeout(E), E = setTimeout(m, 900)), e === p && G();
  },
  removeItem(e) {
    if (T && (e === p || e === y)) throw new Error("账号状态暂不可确认；请联网后刷新再删除。");
    globalThis.localStorage.removeItem(g(e)), e === p && l !== "guest" && (h.value = "error", globalThis.localStorage.setItem(M(), "deleted"));
  }
};
async function z(e) {
  const t = g(p, e), o = globalThis.localStorage.getItem(g("__account_sync_pending.v1", e)), a = globalThis.localStorage.getItem(t), s = await S("GET"), n = typeof s.data?.localState == "string" ? s.data.localState : null;
  if (o === "deleted") {
    if (!(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok) throw new Error("账号数据删除状态暂未同步。");
    globalThis.localStorage.removeItem(g("__account_sync_pending.v1", e));
  } else if (o && a !== null) {
    await v();
    return;
  } else if (n !== null && a !== null && n !== a) {
    await v();
    return;
  } else n !== null ? globalThis.localStorage.setItem(t, n) : a !== null && await S("PUT", a, null);
  globalThis.localStorage.setItem(L(), n || a || "{}"), x.value = (/* @__PURE__ */ new Date()).toISOString(), h.value = "synced";
}
async function H() {
  try {
    const a = await fetch("/api/auth/me", { cache: "no-store", signal: A(4e3) });
    if (!a.ok) throw Error("identity");
    const s = await a.json();
    if (T = !1, k.value = s.authenticated && typeof s.user?.id == "string" ? s.user : null, l = k.value?.id || "guest", h.value = l === "guest" ? "guest" : "syncing", l !== "guest") {
      try {
        await z(l);
      } catch {
        h.value = "error";
      }
      m();
    }
  } catch {
    k.value = null, l = "guest", T = !0, h.value = "guest";
  }
  let e = !1;
  const t = async () => {
    if (!(e || document.hidden)) {
      e = !0;
      try {
        const a = await fetch("/api/auth/me", { cache: "no-store", signal: A(4e3) });
        if (!a.ok) return;
        const s = await a.json(), n = s.authenticated && typeof s.user?.id == "string" ? s.user.id : "guest";
        n !== l ? window.location.reload() : (T = !1, n !== "guest" && await v());
      } catch {
      } finally {
        e = !1;
      }
    }
  };
  window.addEventListener("focus", () => {
    t(), m();
  }), window.addEventListener("online", () => {
    t(), m();
  }), document.addEventListener("visibilitychange", () => {
    document.hidden || m();
  }), window.addEventListener("pagehide", () => {
    if (window.dispatchEvent(new CustomEvent("weiheng-chat-flush")), l !== "guest") {
      const a = N.getItem(y);
      a && fetch("/api/chat", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...w(a), expectedUserId: l }), keepalive: !0 }).catch(() => {
      });
    }
  }), setInterval(() => {
    document.hidden || m();
  }, 8e3).unref?.(), window.addEventListener("weiheng-reset-begin", () => {
    _ = !0, clearTimeout(E);
  }), window.addEventListener("weiheng-reset-abort", () => {
    _ = !1;
  }), document.addEventListener("visibilitychange", t), window.addEventListener("storage", (a) => {
    a.key === g(y) && (window.dispatchEvent(new CustomEvent("weiheng-chat-synced")), m()), a.key === g(p) && l !== "guest" && G();
  });
}
async function te({ mode: e, email: t, password: o, acceptTerms: a = !1, privacyPolicyVersion: s = "", verificationCode: n = "" }) {
  const c = globalThis.localStorage.getItem(p), r = await fetch(`/api/auth/${e === "register" ? "register" : "login"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email: t, password: o, acceptTerms: a, privacyPolicyVersion: s, verificationCode: n })
  }), i = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(i.error || "登录暂时失败，请重试。");
  const u = await S("GET"), d = typeof u.data?.localState == "string" ? u.data.localState : null;
  let f = "账号已登录。";
  return c && d === null ? window.confirm("发现本浏览器已有游客档案和饮食记录。是否复制到这个账号？游客原数据会保留，不会删除。") ? (await S("PUT", c), globalThis.localStorage.setItem(g(p, i.user.id), c), f += "游客数据已复制到账号。") : f += "游客数据仍留在原浏览器空间。" : c && d !== null && (f += "账号已有数据，游客数据仍保留在原浏览器空间，未覆盖账号数据。"), window.location.reload(), { message: f };
}
async function ae() {
  if (await m(), !(await fetch("/api/auth/logout", { method: "POST", cache: "no-store" })).ok) throw new Error("退出登录失败，请重试。");
  window.location.reload();
}
function ne() {
  const e = "weiheng.ai-diet-chat.v1", t = w(N.getItem(e)), o = { ...t.deleted };
  for (const a of t.threads || []) o[a.id] = Date.now();
  N.setItem(e, JSON.stringify({ threads: [], deleted: o, clearedAt: Date.now(), activeByDate: {}, memoryEnabled: t.memoryEnabled }));
}
async function Y() {
  try {
    await H();
    const { default: e } = await import("./App-PO1bbmSx.js");
    B(e).mount("#app");
  } catch {
    const { default: e } = await import("./HomeEntry-Drx7fARE.js");
    B(e).mount("#app");
  }
}
Y();
export {
  k as a,
  N as b,
  Q as c,
  V as d,
  I as e,
  ne as f,
  m as g,
  h,
  H as i,
  $ as j,
  D as k,
  x as l,
  ee as m,
  ae as n,
  X as o,
  te as p,
  Z as r,
  g as s,
  A as t
};
