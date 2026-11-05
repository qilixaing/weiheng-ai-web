import { r as v, c as G } from "./vue-runtime-k8gGiiDs.js";
function A(e) {
  if (typeof AbortSignal.timeout == "function") return AbortSignal.timeout(e);
  const t = new AbortController();
  return setTimeout(() => {
    const n = new Error("Request timed out");
    n.name = "TimeoutError", t.abort(n);
  }, e).unref?.(), t.signal;
}
function V(e) {
  if (typeof AbortSignal.any == "function") return AbortSignal.any(e);
  const t = new AbortController(), o = (r) => {
    t.abort(r.target.reason), n();
  }, n = () => e.forEach((r) => r.removeEventListener("abort", o));
  for (const r of e) {
    if (r.aborted) {
      t.abort(r.reason), n();
      break;
    }
    r.addEventListener("abort", o, { once: !0 });
  }
  return t.signal;
}
const _ = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function R(e, t, o, n) {
  const r = [];
  function a(s, c, l, d) {
    return _(c, l) ? c : _(c, s) ? l : _(l, s) ? c : (r.push(d), n === "remote" ? l : c);
  }
  const i = {};
  for (const s of /* @__PURE__ */ new Set([...Object.keys(e || {}), ...Object.keys(t || {}), ...Object.keys(o || {})])) {
    if (s === "calculated") continue;
    if (s === "records") {
      const l = [e, t, o].map((d) => Object.fromEntries((d?.records || []).map((h) => [h.date, h])));
      i.records = [...new Set(l.flatMap((d) => Object.keys(d)))].map((d) => a(...l.map((h) => h[d]), "记录 " + d)).filter(Boolean);
      continue;
    }
    if (["drafts", "habits"].includes(s)) {
      const l = [e?.[s] || {}, t?.[s] || {}, o?.[s] || {}];
      i[s] = {};
      for (const d of new Set(l.flatMap((h) => Object.keys(h)))) {
        const h = a(...l.map((q) => q[d]), s + " " + d);
        h !== void 0 && (i[s][d] = h);
      }
      continue;
    }
    const c = a(e?.[s], t?.[s], o?.[s], s);
    c !== void 0 && (i[s] = c);
  }
  return { state: i, conflicts: r };
}
const M = () => ({ threads: [], deleted: {}, activeByDate: {}, memoryEnabled: !0 });
function W(e = M(), t = M()) {
  const o = { ...e.deleted };
  for (const [a, i] of Object.entries(t.deleted || {})) o[a] = Math.max(Number(i) || 0, Number(o[a]) || 0);
  const n = Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), r = /* @__PURE__ */ new Map();
  for (const a of [...e.threads || [], ...t.threads || []]) {
    if (!a || typeof a.id != "string" || a.id.length > 120 || o[a.id] || !/^\d{4}-\d{2}-\d{2}$/.test(a.date) || !Array.isArray(a.messages) || n && Date.parse(a.createdAt) < n) continue;
    const i = r.get(a.id), s = new Map((i?.messages || []).map((c) => [c.id, c]));
    for (const c of a.messages) {
      if (!c || typeof c.id != "string" || c.id.length > 120 || !["user", "assistant"].includes(c.role) || typeof c.content != "string" || c.content.length > 1e5) continue;
      const l = s.get(c.id);
      (!l || Number(c.updatedAt || 0) > Number(l.updatedAt || 0) || Number(c.updatedAt || 0) === Number(l.updatedAt || 0) && (Number(c.updatedAt || 0) > 0 || c.content.length >= l.content.length)) && s.set(c.id, { ...c });
    }
    r.set(a.id, { id: a.id, date: a.date, createdAt: a.createdAt, messages: [...s.values()].sort((c, l) => String(c.createdAt || "").localeCompare(String(l.createdAt || ""))).slice(-1e3) });
  }
  return { threads: [...r.values()].sort((a, i) => String(a.createdAt || "").localeCompare(String(i.createdAt || ""))), deleted: o, clearedAt: n, activeByDate: { ...e.activeByDate, ...t.activeByDate }, memoryEnabled: t.memoryEnabled ?? e.memoryEnabled ?? !0 };
}
function $(e, t, o = Date.now()) {
  const n = new Map((e.threads || []).flatMap((i) => i.messages || []).map((i) => [i.id, i])), r = { ...e.deleted, ...t.deleted };
  new Set((t.threads || []).map((i) => i.id));
  const a = (i) => JSON.stringify({ ...i, updatedAt: void 0 });
  return { ...t, deleted: r, clearedAt: Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), threads: (t.threads || []).map((i) => ({ ...i, messages: i.messages.map((s) => ({ ...s, updatedAt: a(s) === a(n.get(s.id) || {}) && n.get(s.id)?.updatedAt || o })) })) };
}
let u = "guest", E = 0;
const I = "weiheng.ai-diet-chat.v1";
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
  const e = u, t = g(I), o = globalThis.localStorage.getItem(t);
  C = !0, T.value = "syncing";
  try {
    const n = await fetch("/api/chat", { method: o ? "PUT" : "GET", cache: "no-store", signal: A(15e3), headers: { "Content-Type": "application/json" }, ...o ? { body: JSON.stringify({ ...y(o), expectedUserId: e }) } : {} }), r = await n.json();
    if (!n.ok) throw Error(r.error);
    if (O || u !== e || r.userId !== e) return;
    const a = globalThis.localStorage.getItem(t), i = W(r.state, y(a)), s = JSON.stringify(i);
    globalThis.localStorage.setItem(t, s), T.value = "synced", z.value = (/* @__PURE__ */ new Date()).toISOString(), a !== s && window.dispatchEvent(new CustomEvent("weiheng-chat-synced")), a !== o && (clearTimeout(b), b = setTimeout(m, 1e3));
  } catch {
    T.value = "error";
  } finally {
    C = !1;
  }
}
const p = "weiheng.local.v2", B = v(null), f = v("guest"), K = v(""), z = v(""), k = v([]);
let j = !1;
const L = () => g("__account_sync_base.v1"), D = (e) => {
  try {
    return JSON.parse(e) || {};
  } catch {
    return {};
  }
}, X = () => u;
function g(e, t = u) {
  return t === "guest" ? e : "weiheng.account." + encodeURIComponent(t) + "." + e;
}
function Z(e, t = u) {
  return t === "guest" ? /^(weiheng|vitabalance)([.:\-]|$)/.test(e) && !e.startsWith("weiheng.account.") : e.startsWith("weiheng.account." + encodeURIComponent(t) + ".");
}
const x = () => g("__account_sync_pending.v1");
async function w(e = "GET", t, o) {
  const n = { method: e, cache: "no-store", signal: A(15e3), headers: { "Content-Type": "application/json" } };
  e === "PUT" && (n.body = JSON.stringify({ localState: t, baseLocalState: o, expectedUserId: u === "guest" ? void 0 : u }));
  const r = await fetch("/api/data", n), a = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(a.error || "账号数据同步失败。");
  return a;
}
async function S(e) {
  if (u === "guest" || j) return;
  const t = u, o = g(p), n = globalThis.localStorage.getItem(o);
  if (n !== null) {
    j = !0, f.value = "syncing";
    try {
      const r = await w("GET"), a = r.data?.localState || null;
      if (u !== t || r.userId !== t) {
        f.value = "error";
        return;
      }
      const i = globalThis.localStorage.getItem(L()), s = R(D(i), D(n), D(a), e);
      if (s.conflicts.length) {
        const l = g("__sync_conflict_backup.v1");
        if ((!globalThis.localStorage.getItem(l) || !k.value.length) && globalThis.localStorage.setItem(l, JSON.stringify({ local: n, server: a, at: (/* @__PURE__ */ new Date()).toISOString() })), !e) {
          k.value = s.conflicts, f.value = "error";
          return;
        }
      }
      const c = JSON.stringify(s.state);
      if (await w("PUT", c, a), u !== t) return;
      globalThis.localStorage.setItem(L(), c), globalThis.localStorage.getItem(o) === n ? (globalThis.localStorage.setItem(o, c), globalThis.localStorage.removeItem(x()), window.dispatchEvent(new CustomEvent("weiheng-account-synced")), f.value = "synced", k.value = []) : (f.value = "pending", clearTimeout(E), E = setTimeout(() => S(), 450)), K.value = (/* @__PURE__ */ new Date()).toISOString();
    } catch {
      f.value = "error";
    } finally {
      j = !1;
    }
  }
}
async function ee(e) {
  await S(e), await m();
}
function te() {
  return globalThis.localStorage.getItem(g("__sync_conflict_backup.v1"));
}
function P() {
  u !== "guest" && (globalThis.localStorage.setItem(x(), "1"), f.value = "pending", clearTimeout(E), E = setTimeout(() => S(), 450));
}
const N = {
  getItem: (e) => globalThis.localStorage.getItem(g(e)),
  setItem(e, t) {
    e === I && (t = JSON.stringify($(y(N.getItem(e)), y(t)))), globalThis.localStorage.setItem(g(e), t), e === I && u !== "guest" && (T.value = "pending", clearTimeout(b), b = setTimeout(m, 900)), e === p && P();
  },
  removeItem(e) {
    globalThis.localStorage.removeItem(g(e)), e === p && u !== "guest" && (f.value = "error", globalThis.localStorage.setItem(x(), "deleted"));
  }
};
async function Y(e) {
  const t = g(p, e), o = globalThis.localStorage.getItem(g("__account_sync_pending.v1", e)), n = globalThis.localStorage.getItem(t), r = await w("GET"), a = typeof r.data?.localState == "string" ? r.data.localState : null;
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
  globalThis.localStorage.setItem(L(), a || n || "{}"), K.value = (/* @__PURE__ */ new Date()).toISOString(), f.value = "synced";
}
async function H() {
  try {
    const n = await fetch("/api/auth/me", { cache: "no-store", signal: A(2e4) });
    if (!n.ok) throw Error("identity");
    const r = await n.json();
    if (B.value = r.authenticated && typeof r.user?.id == "string" ? r.user : null, u = B.value?.id || "guest", f.value = u === "guest" ? "guest" : "syncing", u !== "guest") {
      try {
        await Y(u);
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
        const n = await fetch("/api/auth/me", { cache: "no-store", signal: A(4e3) });
        if (!n.ok) return;
        const r = await n.json(), a = r.authenticated && typeof r.user?.id == "string" ? r.user.id : "guest";
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
      const n = N.getItem(I);
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
async function ae({ mode: e, email: t, password: o, acceptTerms: n = !1, verificationCode: r = "" }) {
  const a = globalThis.localStorage.getItem(p), i = await fetch(`/api/auth/${e === "register" ? "register" : "login"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email: t, password: o, acceptTerms: n, verificationCode: r })
  }), s = await i.json().catch(() => ({}));
  if (!i.ok) throw new Error(s.error || "登录暂时失败，请重试。");
  const c = await w("GET"), l = typeof c.data?.localState == "string" ? c.data.localState : null;
  let d = "账号已登录。";
  return a && l === null ? window.confirm("发现本浏览器已有游客档案和饮食记录。是否复制到这个账号？游客原数据会保留，不会删除。") ? (await w("PUT", a), globalThis.localStorage.setItem(g(p, s.user.id), a), d += "游客数据已复制到账号。") : d += "游客数据仍留在原浏览器空间。" : a && l !== null && (d += "账号已有数据，游客数据仍保留在原浏览器空间，未覆盖账号数据。"), window.location.reload(), { message: d };
}
async function ne() {
  if (await m(), !(await fetch("/api/auth/logout", { method: "POST", cache: "no-store" })).ok) throw new Error("退出登录失败，请重试。");
  window.location.reload();
}
function oe() {
  const e = "weiheng.ai-diet-chat.v1", t = y(N.getItem(e)), o = { ...t.deleted };
  for (const n of t.threads || []) o[n.id] = Date.now();
  N.setItem(e, JSON.stringify({ threads: [], deleted: o, clearedAt: Date.now(), activeByDate: {}, memoryEnabled: t.memoryEnabled }));
}
const J = document.querySelector("#app");
function U(e, t = !1) {
  if (!J) return;
  J.replaceChildren();
  const o = document.createElement("section");
  o.className = "vb-startup", o.setAttribute("role", t ? "alert" : "status");
  const n = document.createElement("h1");
  n.textContent = "维衡 AI";
  const r = document.createElement("p");
  if (r.textContent = e, o.append(n, r), t) {
    const a = document.createElement("button");
    a.textContent = "重新打开", a.onclick = () => location.reload(), o.append(a);
  }
  J.append(o);
}
async function F() {
  U("正在打开，请稍候…");
  const e = import("./App-DyyWaR9s.js");
  e.catch(() => {
  });
  try {
    await H();
  } catch {
    U("暂时无法连接账号服务，请检查网络后重试。已有数据会保留。", !0);
    return;
  }
  try {
    const { default: t } = await e;
    G(t).mount("#app");
  } catch {
    U("页面加载未完成，请检查网络后重新打开。已有数据会保留。", !0);
  }
}
F();
export {
  B as a,
  N as b,
  V as c,
  X as d,
  T as e,
  oe as f,
  f as g,
  z as h,
  k as i,
  te as j,
  ne as k,
  K as l,
  ae as m,
  Z as o,
  ee as r,
  g as s,
  A as t
};
