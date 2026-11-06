import { r as M, a as G, b as Ze, w as pe, o as n, d as o, e, F as B, f as L, n as mn, g as be, h as Rt, i as U, j as k, k as Ne, t as l, l as me, m as ee, v as de, p as N, u as g, q as Ce, s as Ee, x as Ke, y as Vn, z as st, A as We, B as ut, C as qn, D as pn, E as _t, G as Ln } from "./vue-runtime-wiGxZMXT.js";
import { v as Be, t as ke, F as le, c as ft, r as et, n as Gn, m as Jn, a as Pt, e as qe, b as bn, d as gn, M as Me, f as Tt, s as fn, g as dt, h as Xt, N as Hn, i as xe, _ as zt, C as Ct, G as yn, j as pt, k as Kn, l as Ot, o as Qt, P as At, R as Wn, p as It, q as Yn, u as Zt, A as He, w as it, x as en, y as Xn } from "./IntakeAnalysis-CkP4KLxg.js";
import { s as tt, a as _e, o as Qn, b as we, t as hn, c as Zn, d as $e, e as es, f as ts, g as ns, h as ct } from "./main-ApmGvvW7.js";
import { v as nt, A as Ft, c as kn, _ as O, p as ss, a as wn, u as os, b as ls, d as as, e as is } from "./useThemeTransition-_ZCdKBzk.js";
function rs(t, a) {
  if (!a || !Be(a.date) || a.date > ke() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(a.meal) || !Array.isArray(a.items) || !a.items.length || a.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const s = String(a.confirmationId || "").slice(0, 100);
  if (!s) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(s)) return { draft: t, duplicate: !0 };
  const d = a.items.map((i) => {
    const u = le[i.foodId], r = Number(i.grams);
    if (!u || !Number.isFinite(r) || r < 0.1 || r > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: s + ":" + u.key, foodId: u.key, name: u.name, grams: r, meal: a.meal, group: u.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: ft(u) };
  });
  if (new Set(d.map((i) => i.foodId)).size !== d.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...d], appliedBatches: [...t.appliedBatches || [], s] }, duplicate: !1 };
}
const Qe = tt("weiheng.reset-signal.v1"), $n = (t) => Qn(t);
let Ve = !1;
const Le = () => Ve;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== Qe || !t.newValue))
    try {
      const { phase: a } = JSON.parse(t.newValue);
      a === "begin" && (Ve = !0), a === "abort" && (Ve = !1), a === "done" && (Ve = !0, window.location.reload());
    } catch {
    }
});
function tn(t, a) {
  return new Promise((s, d) => {
    const i = t.open(a);
    i.onerror = i.onblocked = () => d(new Error("本地文件存储暂时无法清理，请关闭其他旧页面后重试。")), i.onsuccess = () => {
      const u = i.result, r = Array.from(u.objectStoreNames);
      if (!r.length) {
        u.close(), s();
        return;
      }
      try {
        const c = u.transaction(r, "readwrite");
        for (const m of r) c.objectStore(m).clear();
        c.oncomplete = () => {
          u.close(), s();
        }, c.onerror = c.onabort = () => {
          u.close(), d(new Error("本地文件清理未完成，请重试。"));
        };
      } catch (c) {
        u.close(), d(c);
      }
    };
  });
}
function nn(t, a = !1) {
  const s = Array.from({ length: t.length }, (d, i) => t.key(i));
  for (const d of s) d && $n(d) && !(a && d === Qe) && t.removeItem(d);
}
async function us({
  local: t = globalThis.localStorage,
  session: a = globalThis.sessionStorage,
  databases: s = globalThis.indexedDB,
  caches: d = globalThis.caches
} = {}) {
  if (Ve) throw new Error("正在清理本地数据，请稍候。");
  Ve = !0;
  const i = (u) => t.setItem(Qe, JSON.stringify({ phase: u, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), _e.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!s) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      tn(s, tt("weiheng.media.v1")),
      tn(s, tt("weiheng.chat-attachments.v1"))
    ]), d) for (const u of await d.keys()) $n(u) && await d.delete(u);
    a && nn(a), nn(t, !0), i("done"), t.removeItem(Qe);
  } catch (u) {
    try {
      i("abort"), t.removeItem(Qe);
    } catch {
    }
    throw Ve = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), u;
  }
}
const bt = "weiheng.local.v2", _n = "weiheng.theme.v1", Oe = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function sn(t) {
  if (!t) return null;
  const a = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", s = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), d = Ft.some((u) => u.key === t.activity) ? t.activity : s[String(t.activity)] || "";
  if (nt({ ...t, sex: a, activity: d })) return null;
  const i = { ...t, sex: a, age: Oe(t.age), height: Oe(t.height), weight: Oe(t.weight), activity: d };
  return nt(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    a
  ), activity: String(d) };
}
function Cn() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const a = JSON.parse(we.getItem(bt) || "null");
    if (a && typeof a == "object") {
      for (const i of [...Array.isArray(a.records) ? a.records : [], ...Object.values(a.drafts || {})]) for (const u of Array.isArray(i?.entries) ? i.entries : []) u.foodId === "cabbage" && u.name === "白菜" && (u.referenceConfirmed = !1);
      return { ...t, ...a, drafts: a.drafts && typeof a.drafts == "object" ? a.drafts : {}, profile: sn(a.profile), records: Array.isArray(a.records) ? a.records : [] };
    }
    const s = JSON.parse(we.getItem("vitabalance.v1") || we.getItem("vitabalance.guest.v1") || "null"), d = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return s ? { ...t, profile: sn(s.profile), records: Array.isArray(s.records) ? s.records : [], plans: Array.isArray(s.plans) ? s.plans : [], flags: d.filter(([i]) => s.profile?.[i]).map(([, i]) => i), preferences: [s.profile?.avoid, s.profile?.allergies ? "需要核对的过敏或不耐受项：" + s.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const ce = Ze(Cn()), Fe = M("");
let Nt = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  Nt = !0;
  try {
    Object.assign(ce, Cn());
  } finally {
    Nt = !1;
  }
});
const ds = (() => {
  try {
    return we.getItem(_n);
  } catch {
    return null;
  }
})(), An = M(ds === "dark" ? "dark" : "light"), vt = G(() => kn(ce.flags.includes("孕期或哺乳期") ? null : ce.profile));
pe(ce, () => {
  if (!(Le() || Nt))
    try {
      we.setItem(bt, JSON.stringify({ ...ce, calculated: vt.value })), Fe.value = "";
    } catch {
      Fe.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
pe(An, (t) => {
  if (!Le())
    try {
      we.setItem(_n, t);
    } catch {
      Fe.value = "主题偏好暂时无法保存。";
    }
});
function Bt() {
  const t = G(() => [...ce.records].sort((c, m) => m.date.localeCompare(c.date)));
  function a(c) {
    const m = nt(c);
    return m || (ce.profile = { ...ce.profile, sex: c.sex || "", ageMonths: Oe(c.ageMonths), physiologicalStage: c.physiologicalStage || "general", age: Oe(c.age), height: Oe(c.height), weight: Oe(c.weight), activity: c.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function s(c) {
    if (Le()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Be(c.date)) return { ok: !1, error: "请选择有效日期。" };
    const m = ce.records.find((b) => b.date === c.date), v = Array.isArray(c.entries) ? Jn(c, m) : (
      /** @type {DailyRecord} */
      { ...c, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (m && Pt(m) === Pt(v)) return { ok: !0, record: m, unchanged: !0 };
    const p = [...ce.records.filter((b) => b.date !== v.date), v];
    try {
      we.setItem(bt, JSON.stringify({ ...ce, records: p, calculated: vt.value }));
    } catch {
      return Fe.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: Fe.value };
    }
    return ce.records = p, { ok: !0, record: v };
  }
  function d(c) {
    if (!Be(c)) return null;
    if (!ce.drafts[c]) {
      const m = ce.records.find((v) => v.date === c);
      ce.drafts[c] = { date: c, entries: et(m), notes: m?.notes || "", photoId: m?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return ce.drafts[c];
  }
  function i(c) {
    const m = d(c.date);
    if (!m) return !1;
    const v = le[c.foodId || ""];
    return m.entries.push({ id: crypto.randomUUID(), foodId: c.foodId || null, name: v?.name || c.name || "", grams: Number(c.grams), meal: c.meal || "unspecified", group: c.group, source: c.source || "catalogue", estimated: !!c.estimated, referenceConfirmed: !0, nutritionSnapshot: Gn(c.nutritionSnapshot, v?.key) || ft(v) }), !Fe.value;
  }
  function u(c, m) {
    const v = new Set(ce.habits[c] || []);
    v.has(m) ? v.delete(m) : v.add(m), ce.habits[c] = [...v];
  }
  function r(c) {
    if (Le()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const m = ce.drafts[c.date] || { date: c.date, entries: et(ce.records.find((b) => b.date === c.date)), appliedBatches: [] }, v = rs(m, c);
      if (v.duplicate) return { ok: !0, duplicate: !0 };
      const p = { ...ce.drafts, [c.date]: v.draft };
      return we.setItem(bt, JSON.stringify({ ...ce, drafts: p, calculated: vt.value })), ce.drafts = p, { ok: !0, duplicate: !1 };
    } catch (m) {
      return { ok: !1, error: m.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: ce, theme: An, nutrition: vt, records: t, storageError: Fe, updateProfile: a, saveRecord: s, ensureDraft: d, addToDraft: i, addPlanToDraft: r, toggleHabit: u };
}
let St;
function cs() {
  return St || (St = new Promise((t, a) => {
    if (!globalThis.indexedDB) {
      a(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const s = indexedDB.open(tt("weiheng.media.v1"), 1);
    s.onupgradeneeded = () => {
      const d = s.result;
      for (const i of ["photos", "reports"]) d.objectStoreNames.contains(i) || d.createObjectStore(i, { keyPath: "id" });
    }, s.onsuccess = () => t(s.result), s.onerror = () => a(new Error("无法打开本地存储，请检查浏览器隐私设置。")), s.onblocked = () => a(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), St;
}
async function yt(t, a, s) {
  const d = await cs();
  if (a === "readwrite" && Le()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, u) => {
    const r = d.transaction(t, a);
    let c;
    const m = s(r.objectStore(t));
    m.onsuccess = () => {
      c = m.result;
    }, r.oncomplete = () => i(c), r.onabort = r.onerror = () => u(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const Mt = (t, a) => yt(t, "readwrite", (s) => s.put(JSON.parse(JSON.stringify(a)))), vs = (t, a) => yt(t, "readonly", (s) => s.get(a)), ms = (t) => yt(t, "readonly", (a) => a.getAll()), ps = (t, a) => yt(t, "readwrite", (s) => s.delete(a));
async function ht(t, a) {
  let s;
  try {
    s = await fetch("/api/ai/" + t, { method: a === void 0 ? "GET" : "POST", headers: a === void 0 ? {} : { "Content-Type": "application/json" }, body: a === void 0 ? void 0 : JSON.stringify(a), signal: hn(9e4) });
  } catch (i) {
    throw new Error(i?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  let d;
  try {
    d = await s.json();
  } catch {
    throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
  }
  if (!s.ok) {
    const i = new Error(d.error || "AI 服务暂时不可用。");
    throw i.code = d.code, i;
  }
  return d;
}
async function In(t, a, s, d) {
  const i = hn(9e4), u = d ? Zn([d, i]) : i;
  let r;
  try {
    r = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    a, stream: !0 }), signal: u });
  } catch (h) {
    throw new Error(h?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  if (!r.ok) {
    let h;
    try {
      h = await r.json();
    } catch {
      throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
    }
    const T = new Error(h.error || "AI 服务暂时不可用。");
    throw T.code = h.code, T;
  }
  if (!r.body) throw new Error("浏览器没有提供流式读取能力，请更新浏览器后重试。");
  const c = r.body.getReader(), m = new TextDecoder();
  let v = "", p = !1, b = null;
  const $ = (h) => {
    const T = h.split(/\r?\n/).filter((w) => w.startsWith("data:")).map((w) => w.slice(5).trimStart()).join(`
`);
    if (!T) return;
    let x;
    try {
      x = JSON.parse(T);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (x?.type === "error") {
      const w = new Error(x.message || "AI 暂时无法回复，请重试。");
      throw w.code = x.code, w;
    }
    if (x?.type === "progress" && x.step) {
      s(x);
      return;
    }
    if (x?.type === "delta" && typeof x.text == "string") {
      s(x);
      return;
    }
    x?.type === "done" && typeof x.model == "string" && (b = x, p = !0, s(x));
  };
  try {
    for (; !p; ) {
      const { value: h, done: T } = await c.read();
      if (T) break;
      v += m.decode(h, { stream: !0 });
      let x;
      for (; (x = v.search(/\r?\n\r?\n/)) >= 0; ) {
        const w = v.slice(x).match(/^\r?\n\r?\n/)[0];
        if ($(v.slice(0, x)), v = v.slice(x + w.length), p) break;
      }
    }
    if (v += m.decode(), v.trim() && !p && $(v), !p || !b) throw new Error("AI 流式连接提前结束，请重试。");
    return b;
  } finally {
    c.releaseLock();
  }
}
async function bs(t, a) {
  const s = await In("meal-plan", t, (d) => {
    d.type === "progress" && a(d.step);
  });
  if (!s.result || !["ready", "needs_evidence"].includes(s.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return s.result;
}
const Re = M([]), gt = M(""), xt = /* @__PURE__ */ new Map();
let Et;
function Vt(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function gs(t) {
  return t.filter((a) => {
    const s = a.referenceConfirmed === !1 ? void 0 : le[a.foodId || ""];
    return Me.some((d) => {
      const i = Tt(a, s, d.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function on(t) {
  Re.value = [t, ...Re.value.filter((a) => a.id !== t.id)].sort((a, s) => s.requestedAt.localeCompare(a.requestedAt));
}
async function mt(t) {
  try {
    await Mt("reports", t), gt.value = "", on(t);
  } catch (a) {
    throw gt.value = Vt(a), on({ ...t, persistenceFailed: !0 }), a;
  }
}
function Sn() {
  return Et || (Et = (async () => {
    try {
      Re.value = (await ms("reports")).sort((t, a) => a.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Re.value])
        t.status === "pending" && await mt({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      gt.value = Vt(t);
    }
  })()), Et;
}
function fs(t) {
  return Re.value.find((a) => a.date === t);
}
function ys(t, a, s) {
  return !a || t.dataVersion !== bn(a, s);
}
async function hs(t, a, { force: s = !1 } = {}) {
  const d = $e();
  if (await qe(et(t).filter(($) => $.foodId && !$.nutritionSnapshot).map(($) => String($.foodId))), $e() !== d || (await Sn(), $e() !== d)) return;
  const i = bn(t, a), u = `${d}:${t.date}:${i}`, r = xt.get(u);
  if (r) return r;
  const c = Re.value.find(
    ($) => $.date === t.date && $.dataVersion === i && $.status === "complete" && !$.persistenceFailed
  );
  if (c && !s) return c;
  const m = {
    sex: a?.sex,
    age: a?.age,
    height: a?.height,
    weight: a?.weight,
    activity: a?.activity,
    ageMonths: a?.ageMonths,
    physiologicalStage: a?.physiologicalStage
  }, v = et(t), p = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: Pt(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: v,
      intake: gn(v),
      profile: m
    },
    result: null,
    error: ""
  }, b = (async () => {
    await mt(p);
    try {
      const $ = await ht("analyze-day", {
        date: t.date,
        entries: v,
        profile: m,
        requestId: p.id
      });
      if ($e() !== d) return;
      const h = gs(v);
      if (h.length) {
        const T = $.calculation?.estimation, x = T?.foods || [];
        if (!(T?.status === "complete" && T.missingFoodCount === h.length && x.length === h.length && h.every((C) => {
          const R = x.find((F) => F.entryId === String(v.indexOf(C))), D = C.referenceConfirmed === !1 ? void 0 : le[C.foodId || ""], P = Me.filter((F) => {
            const K = Tt(C, D, F.id);
            return typeof K.value != "number" && !K.range;
          }).map((F) => F.id);
          return !!(R && P.every((F) => {
            const K = R.values[F];
            return K && Number.isFinite(K.low) && Number.isFinite(K.high) && K.high > K.low;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      await mt({
        ...p,
        status: "complete",
        generatedAt: $.generatedAt,
        model: $.model,
        result: $.analysis,
        calculation: $.calculation
      });
    } catch ($) {
      if ($e() !== d) return;
      await mt({ ...p, status: "failed", error: Vt($) });
    }
    return Re.value.find(($) => $.id === p.id);
  })();
  xt.set(u, b);
  try {
    return await b;
  } finally {
    xt.delete(u);
  }
}
function qt() {
  return {
    reports: Re,
    reportStorageError: gt,
    loadReports: Sn,
    latestReport: fs,
    isStale: ys,
    generateReport: hs
  };
}
const ks = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], ws = {
  __name: "NumberRuler",
  props: {
    modelValue: { type: [Number, String], default: "" },
    min: { type: Number, required: !0 },
    max: { type: Number, required: !0 },
    step: { type: Number, default: 0.1 },
    fallback: { type: Number, required: !0 },
    label: { type: String, required: !0 },
    unit: { type: String, required: !0 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = M(null), u = M(!1), r = G(() => (s.max - s.min) * 0.16), c = G(() => {
      const w = Number(s.modelValue);
      return String(s.modelValue).trim() && Number.isFinite(w) ? Math.min(s.max, Math.max(s.min, w)) : s.fallback;
    }), m = G(() => {
      const w = (c.value - s.min) / r.value, C = w - Math.round(w);
      return Array.from({ length: 31 }, (R, D) => ({
        key: D,
        major: D % 5 === 0,
        left: `${50 + (D - 15 - C) / 30 * 100}%`
      }));
    });
    let v = null;
    function p(w) {
      const C = Math.round((w - s.min) / s.step), R = s.step < 1 ? 1 : 0;
      return Number(Math.min(s.max, Math.max(s.min, s.min + C * s.step)).toFixed(R));
    }
    function b(w) {
      d("update:modelValue", p(w));
    }
    function $(w) {
      w.pointerType === "mouse" && w.button !== 0 || (w.preventDefault(), i.value.setPointerCapture(w.pointerId), u.value = !0, v = { x: w.clientX, value: c.value });
    }
    function h(w) {
      if (!v || !u.value) return;
      const C = i.value.getBoundingClientRect().width || 1;
      b(v.value + (w.clientX - v.x) / C * r.value);
    }
    function T() {
      u.value = !1, v = null;
    }
    function x(w) {
      const C = {
        ArrowRight: s.step,
        ArrowUp: s.step,
        ArrowLeft: -s.step,
        ArrowDown: -s.step,
        PageUp: s.step * 10,
        PageDown: -s.step * 10
      };
      w.key === "Home" ? (w.preventDefault(), b(s.min)) : w.key === "End" ? (w.preventDefault(), b(s.max)) : C[w.key] && (w.preventDefault(), b(c.value + C[w.key]));
    }
    return (w, C) => (n(), o("div", {
      ref_key: "ruler",
      ref: i,
      class: be(["vb-ruler", { "is-dragging": u.value }]),
      role: "slider",
      tabindex: "0",
      "aria-label": `${t.label}刻度`,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": c.value,
      "aria-valuetext": `${c.value} ${t.unit}`,
      "aria-orientation": "horizontal",
      onPointerdown: $,
      onPointermove: h,
      onPointerup: T,
      onPointercancel: T,
      onLostpointercapture: T,
      onKeydown: x
    }, [
      C[0] || (C[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (n(!0), o(B, null, L(m.value, (R) => (n(), o("i", {
        key: R.key,
        class: be({ major: R.major }),
        style: mn({ left: R.left })
      }, null, 6))), 128)),
      C[1] || (C[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, ks));
  }
}, $s = { class: "vb-dialog-overlay" }, _s = { class: "vb-wizard-top" }, Cs = { class: "vb-icon-badge" }, As = ["aria-valuenow", "aria-label"], Is = { class: "vb-wizard-copy" }, Ss = { class: "vb-small-label" }, xs = { id: "vb-wizard-title" }, Es = { id: "vb-step-hint" }, Us = {
  key: 0,
  class: "vb-sex-field"
}, js = { class: "vb-sr-only" }, Ds = ["aria-pressed", "onClick"], Ps = { class: "vb-person-symbol" }, Ns = { class: "vb-choice-check" }, Ms = {
  key: 1,
  class: "vb-number-step"
}, Rs = { for: "vb-step-number" }, Ts = { class: "vb-number-control" }, zs = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], Os = {
  key: 0,
  class: "vb-field"
}, Fs = { class: "vb-input-range" }, Bs = {
  key: 2,
  class: "vb-activity-field"
}, Vs = { class: "vb-sr-only" }, qs = ["aria-pressed", "onClick"], Ls = { class: "vb-activity-icon" }, Gs = { class: "vb-radio-mark" }, Js = { key: 0 }, Hs = {
  key: 3,
  class: "vb-field"
}, Ks = {
  key: 4,
  class: "vb-skip-row"
}, Ws = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, Ys = { class: "vb-wizard-actions" }, Xs = ["disabled"], Qs = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, Zs = { class: "vb-wizard-account-login" }, eo = { class: "vb-wizard-privacy" }, to = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = Ze(s.profile ? { ...s.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), u = M(0), r = M(""), c = M(null), m = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], v = G(() => {
      const w = m[u.value], C = ss(i.age)[w.key];
      return C ? { ...w, min: C[0], max: C[1] } : w;
    });
    function p() {
      if (u.value === 0 || u.value === 4 || !String(i[v.value.key] ?? "").trim()) return "";
      const w = Number(i[v.value.key]);
      return !Number.isFinite(w) || w < v.value.min || w > v.value.max || u.value === 1 && !Number.isInteger(w) ? `请输入 ${v.value.min}–${v.value.max} ${v.value.unit}${u.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function b(w) {
      i.sex = w, r.value = "";
    }
    function $() {
      i[v.value.key] = "", r.value = "", u.value < 4 && u.value++;
    }
    function h() {
      if (r.value = p(), !r.value) {
        if (u.value < 4) {
          u.value++;
          return;
        }
        r.value = nt(i), r.value || d("complete", { ...i });
      }
    }
    function T() {
      Ee(() => c.value?.querySelector(".vb-step-input, .vb-choice-button, .vb-activity-choice")?.focus());
    }
    pe(u, () => {
      r.value = "", T();
    }), Rt(T);
    function x(w) {
      if (w.key === "Escape" && s.profile) {
        d("close");
        return;
      }
      if (w.key !== "Tab") return;
      const C = [...c.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], R = C[0], D = C.at(-1);
      w.shiftKey && document.activeElement === R ? (w.preventDefault(), D.focus()) : !w.shiftKey && document.activeElement === D && (w.preventDefault(), R.focus());
    }
    return (w, C) => (n(), o("div", $s, [
      e("section", {
        ref_key: "dialog",
        ref: c,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: x
      }, [
        e("div", _s, [
          e("span", Cs, [
            U(O, { name: "leaf" })
          ]),
          C[10] || (C[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (n(), o("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: C[0] || (C[0] = (R) => w.$emit("close"))
          }, [
            U(O, { name: "close" })
          ])) : k("", !0)
        ]),
        e("div", {
          class: "vb-wizard-progress",
          role: "progressbar",
          "aria-valuenow": u.value + 1,
          "aria-valuemin": "1",
          "aria-valuemax": "5",
          "aria-label": `档案设置，第 ${u.value + 1} 步，共 5 步`
        }, [
          (n(), o(B, null, L(5, (R) => e("span", {
            key: R,
            class: be({ filled: R <= u.value + 1 })
          }, null, 2)), 64))
        ], 8, As),
        e("form", {
          onSubmit: Ne(h, ["prevent"])
        }, [
          e("div", Is, [
            e("span", Ss, "第 " + l(u.value + 1) + " 步 / 共 5 步", 1),
            e("h2", xs, l(v.value.title), 1),
            e("p", Es, l(v.value.hint), 1)
          ]),
          u.value === 0 ? (n(), o("fieldset", Us, [
            e("legend", js, l(v.value.question), 1),
            (n(), o(B, null, L([["male", "男性"], ["female", "女性"]], ([R, D]) => e("button", {
              key: R,
              type: "button",
              class: be(["vb-choice-button", { selected: i.sex === R }]),
              "aria-pressed": i.sex === R,
              onClick: (P) => b(R)
            }, [
              e("span", Ps, l(R === "male" ? "♂" : "♀"), 1),
              e("strong", null, l(D), 1),
              e("span", Ns, [
                i.sex === R ? (n(), me(O, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : k("", !0)
              ])
            ], 10, Ds)), 64))
          ])) : u.value < 4 ? (n(), o("div", Ms, [
            e("label", Rs, l(v.value.question), 1),
            e("div", Ts, [
              ee((n(), o("input", {
                id: "vb-step-number",
                key: v.value.key,
                "onUpdate:modelValue": C[1] || (C[1] = (R) => i[v.value.key] = R),
                class: "vb-step-input",
                type: "number",
                inputmode: u.value === 1 ? "numeric" : "decimal",
                min: v.value.min,
                max: v.value.max,
                step: u.value === 1 ? 1 : 0.1,
                placeholder: v.value.placeholder,
                "aria-invalid": !!r.value,
                "aria-describedby": r.value ? "vb-step-error" : "vb-step-hint",
                onInput: C[2] || (C[2] = (R) => r.value = "")
              }, null, 40, zs)), [
                [de, i[v.value.key]]
              ]),
              e("span", null, l(v.value.unit), 1)
            ]),
            U(ws, {
              modelValue: i[v.value.key],
              "onUpdate:modelValue": [
                C[3] || (C[3] = (R) => i[v.value.key] = R),
                C[4] || (C[4] = (R) => r.value = "")
              ],
              min: v.value.min,
              max: v.value.max,
              step: u.value === 1 ? 1 : 0.1,
              fallback: Number(v.value.placeholder),
              label: v.value.question,
              unit: v.value.unit
            }, null, 8, ["modelValue", "min", "max", "step", "fallback", "label", "unit"]),
            u.value === 1 && String(i.age) === "0" ? (n(), o("label", Os, [
              C[11] || (C[11] = N("月龄（可选，0–11个月）", -1)),
              ee(e("input", {
                "onUpdate:modelValue": C[5] || (C[5] = (R) => i.ageMonths = R),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [de, i.ageMonths]
              ])
            ])) : k("", !0),
            e("p", Fs, l(v.value.min) + "–" + l(v.value.max) + " " + l(v.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (n(), o("fieldset", Bs, [
            e("legend", Vs, l(v.value.question), 1),
            (n(!0), o(B, null, L(g(Ft), (R) => (n(), o("button", {
              key: R.key,
              type: "button",
              class: be(["vb-activity-choice", { selected: i.activity === R.key }]),
              "aria-pressed": i.activity === R.key,
              onClick: (D) => i.activity = R.key
            }, [
              e("span", Ls, [
                U(O, {
                  name: R.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, l(R.label), 1),
                e("small", null, l(R.detail), 1)
              ]),
              e("span", Gs, [
                i.activity === R.key ? (n(), o("i", Js)) : k("", !0)
              ])
            ], 10, qs))), 128))
          ])),
          u.value === 4 ? (n(), o("label", Hs, [
            C[13] || (C[13] = N("生理阶段（可选）", -1)),
            ee(e("select", {
              "onUpdate:modelValue": C[6] || (C[6] = (R) => i.physiologicalStage = R)
            }, [...C[12] || (C[12] = [
              e("option", { value: "general" }, "一般情况", -1),
              e("option", { value: "pregnant" }, "孕期", -1),
              e("option", { value: "lactating" }, "哺乳期", -1),
              e("option", { value: "special" }, "其他需专业评估的情况", -1)
            ])], 512), [
              [Ce, i.physiologicalStage]
            ]),
            C[14] || (C[14] = e("small", null, "特殊阶段暂停通用营养目标；记录和查询仍可使用。", -1))
          ])) : k("", !0),
          u.value < 4 ? (n(), o("div", Ks, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: $
            }, "跳过此项")
          ])) : k("", !0),
          e("p", Ws, l(r.value), 1),
          e("div", Ys, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: u.value === 0 && !t.profile,
              onClick: C[7] || (C[7] = (R) => u.value > 0 ? u.value-- : w.$emit("close"))
            }, [
              U(O, {
                name: "back",
                size: 17
              }),
              N(l(u.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, Xs),
            e("button", Qs, [
              N(l(u.value === 4 ? "保存我的身体档案" : "下一步"), 1),
              U(O, {
                name: "arrow",
                size: 17
              })
            ])
          ])
        ], 32),
        e("button", {
          type: "button",
          class: "vb-button vb-button-quiet vb-skip-all",
          onClick: C[8] || (C[8] = (R) => d("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", Zs, [
          C[15] || (C[15] = N("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: C[9] || (C[9] = (R) => d("login"))
          }, "登录")
        ]),
        e("p", eo, [
          U(O, {
            name: "lock",
            size: 13
          }),
          C[16] || (C[16] = N("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, kt = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function Lt(t) {
  if (t?.__summary) return t.state || "";
  if (!t?.expanded) return t?.state || "";
  const a = String(t.source?.description || ""), s = [];
  return /\bRAW\b/.test(a) ? s.push("生") : /\bRSTD\b|ROASTED/.test(a) ? s.push("烤熟") : /\bBKD\b/.test(a) ? s.push("烘焙") : /FRIED/.test(a) ? s.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(a) && s.push("熟"), /\bDRY MIX\b/.test(a) ? s.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(a) && s.push("干制"), /\bCND\b/.test(a) && s.push("罐装"), /\bFRZ\b|FROZEN/.test(a) && s.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(a) ? s.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(a) && s.push("加盐"), s.length ? s.join(" · ") : "具体品种与配方见数据来源";
}
const xn = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function no(t) {
  return (xn.find((s) => s.items.some(([d]) => d === t?.key) || [s.name, ...s.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([s]) => le[s]?.source).map(([s, d]) => ({ id: s, label: d }));
}
const so = Object.fromEntries(xn.flatMap((t) => t.items)), En = (t) => so[t] || "";
function oo(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function Un(t) {
  const a = M(null), s = M(!1), d = M(!1);
  let i = 0;
  async function u(r = !1) {
    const c = g(typeof t == "function" ? t() : t), m = ++i;
    if (a.value = null, d.value = !1, s.value = !!c && !c.image, !c) {
      s.value = !1;
      return;
    }
    try {
      a.value = await oo(c, { force: r }), d.value = !a.value;
    } catch {
      d.value = !0;
    } finally {
      m === i && (s.value = !1);
    }
  }
  return pe(() => {
    const r = g(typeof t == "function" ? t() : t);
    return [r?.key, r?.image];
  }, () => u(), { immediate: !0 }), { photo: a, loading: s, failed: d, retry: () => u(!0) };
}
const lo = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, ao = { key: 0 }, io = { key: 1 }, ro = {
  key: 2,
  role: "status"
}, uo = { key: 3 }, co = { class: "vb-portion-macros" }, vo = { key: 0 }, mo = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, po = { class: "vb-estimate-adjust" }, bo = { class: "vb-field" }, go = ["disabled"], fo = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = M(!1), u = M(""), r = M(null), c = M("");
    let m = 0;
    function v($) {
      try {
        const T = JSON.parse(we.getItem("weiheng.food-estimate." + $?.key) || "null");
        if (T?.estimate)
          return r.value = { ...T, cached: !0 }, c.value = T.recipe || "", d("resolved", r.value), !0;
      } catch {
      }
      const h = fn.estimates?.[$?.key];
      return h ? (r.value = { foodId: $.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: h.model, generatedAt: h.generatedAt, estimate: { entryId: $.key, name: $.name, grams: 100, values: h.values, assumption: h.assumption } }, d("resolved", r.value), !0) : !1;
    }
    async function p() {
      const $ = ++m, h = s.food?.key;
      i.value = !0, u.value = "", r.value = null, d("resolved", null);
      try {
        const T = await ht("food-estimate", { foodId: h, recipe: c.value.trim() });
        if ($ !== m) return;
        r.value = T;
        try {
          we.setItem("weiheng.food-estimate." + h, JSON.stringify({ ...T, recipe: c.value }));
        } catch {
          u.value = "估算已返回，但本机缓存保存失败。";
        }
        d("resolved", T);
      } catch (T) {
        $ === m && (u.value = T.message);
      } finally {
        $ === m && (i.value = !1);
      }
    }
    pe(() => s.food?.key, () => {
      m++, c.value = "", u.value = "", i.value = !1, r.value = null, s.food && v(s.food);
    }, { immediate: !0 }), Ke(() => {
      m++;
    });
    const b = ($) => $ ? `${Math.round($.low * 10) / 10}–${Math.round($.high * 10) / 10}` : "未知";
    return ($, h) => (n(), o("section", lo, [
      e("h3", null, l(r.value ? "AI 估算参考" : "AI 营养估算"), 1),
      r.value?.estimate ? (n(), o("p", ao, [...h[1] || (h[1] = [
        e("strong", null, "每100克可食部 · AI估算，非数据库值", -1)
      ])])) : (n(), o("p", io, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (n(), o("p", ro, "正在估算…")) : k("", !0),
      r.value?.estimate ? (n(), o("div", uo, [
        e("div", co, [
          (n(!0), o(B, null, L(g(Me).filter((T) => r.value.estimate.values[T.id]), (T) => (n(), o("div", {
            key: T.id
          }, [
            e("span", null, l(T.name), 1),
            e("strong", null, [
              N(l(b(r.value.estimate.values[T.id])) + " ", 1),
              e("small", null, l(T.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, l(r.value.estimate.assumption), 1),
        r.value.cached ? (n(), o("small", vo, "已保存的预估 · " + l(r.value.model || r.value.requestedModel) + " · " + l(r.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : k("", !0),
        h[2] || (h[2] = e("small", null, "此范围由 AI 按名称、类别和生熟状态估算；原料比例、用油和做法不同会造成差异。维生素和矿物质仍显示未知，不作为数据库检测值。", -1))
      ])) : k("", !0),
      u.value ? (n(), o("p", mo, l(u.value), 1)) : k("", !0),
      e("details", po, [
        e("summary", null, l(r.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", bo, [
          h[3] || (h[3] = N("原料与做法", -1)),
          ee(e("textarea", {
            "onUpdate:modelValue": h[0] || (h[0] = (T) => c.value = T),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [de, c.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: p
        }, l(i.value ? "估算中…" : u.value ? "重试估算" : r.value ? "按补充内容重新估算" : "生成估算"), 9, go)
      ])
    ]));
  }
};
function yo(t) {
  const a = String(t?.name || ""), s = String(t?.state || ""), d = (i, u) => ({ label: `${i} · 估算${u}克`, grams: u });
  return /米饭/.test(a) && !/生|干/.test(s) ? [d("小碗", 100), d("中碗", 150), d("大碗", 200)] : /鸡蛋/.test(a) && !/粉|液|鸭|鹅/.test(a) ? [d("1个去壳", 50)] : /香蕉/.test(a) ? [d("1根去皮", 100)] : /苹果/.test(a) ? [d("小个去核", 150), d("中个去核", 200)] : /牛奶|酸奶/.test(a) && !/粉|干酪|奶油/.test(a) ? [d("小杯（按重量）", 200), d("一份（按重量）", 250)] : [];
}
const ho = {
  key: 0,
  class: "vb-portion-presets"
}, ko = ["onClick"], jn = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = G(() => yo(s.food));
    return (u, r) => i.value.length ? (n(), o("div", ho, [
      r[0] || (r[0] = e("span", null, "份量参考", -1)),
      (n(!0), o(B, null, L(i.value, (c) => (n(), o("button", {
        key: c.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (m) => d("choose", c.grams)
      }, l(c.label), 9, ko))), 128)),
      r[1] || (r[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : k("", !0);
  }
}, wo = ["src", "alt", "loading"], $o = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, Gt = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = M(!1);
    return pe(() => s.photo?.image, () => i.value = !1), (u, r) => (n(), o("div", {
      class: be(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (n(), o("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: r[0] || (r[0] = (c) => {
          i.value = !0, d("image-error");
        })
      }, null, 40, wo)) : (n(), o("div", $o, [
        U(O, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, l(g(En)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, l(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (n(), o("span", {
        key: 2,
        class: be({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, l(t.photo.imageLabel || "食物照片"), 3)) : k("", !0)
    ], 2));
  }
}), _o = ["aria-label"], Co = ["aria-label"], Ao = { class: "vb-feature-dialog-body" }, ot = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: a }) {
    const s = a, d = M(null), i = document.activeElement;
    Rt(() => Ee(() => d.value?.focus())), Ke(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function u(r) {
      if (r.key === "Escape" && (r.preventDefault(), s("close")), r.key !== "Tab") return;
      const c = [...d.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((p) => p.getClientRects().length);
      if (!c.length) {
        r.preventDefault();
        return;
      }
      const m = c[0], v = c.at(-1);
      r.shiftKey && (document.activeElement === m || document.activeElement === d.value) ? (r.preventDefault(), v.focus()) : !r.shiftKey && document.activeElement === v && (r.preventDefault(), m.focus());
    }
    return (r, c) => (n(), o("div", {
      class: "vb-feature-overlay",
      onClick: c[1] || (c[1] = Ne((m) => r.$emit("close"), ["self"]))
    }, [
      e("section", {
        ref_key: "panel",
        ref: d,
        class: be(["vb-feature-dialog", { "is-wide": t.wide }]),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t.title,
        tabindex: "-1",
        onKeydown: u
      }, [
        e("header", null, [
          e("h2", null, l(t.title), 1),
          e("button", {
            type: "button",
            class: "vb-icon-button",
            "aria-label": "关闭" + t.title,
            onClick: c[0] || (c[0] = (m) => r.$emit("close"))
          }, [
            U(O, { name: "close" })
          ], 8, Co)
        ]),
        e("div", Ao, [
          Vn(r.$slots, "default")
        ])
      ], 42, _o)
    ]));
  }
}, Io = { class: "vb-food-detail-top" }, So = { class: "vb-eyebrow" }, xo = { class: "vb-food-state" }, Eo = { class: "vb-pill" }, Uo = {
  key: 0,
  class: "vb-field"
}, jo = ["value"], Do = ["value"], Po = {
  key: 0,
  class: "vb-intake-more"
}, No = {
  key: 1,
  class: "vb-feature-error"
}, Mo = { class: "vb-portion-controls" }, Ro = ["max"], To = ["value"], zo = { class: "vb-portion-macros" }, Oo = { key: 0 }, Fo = { key: 0 }, Bo = ["disabled"], Vo = { class: "vb-food-all-nutrients" }, qo = { class: "vb-nutrient-table" }, Lo = { class: "vb-nutrient-table-head" }, Go = { key: 0 }, Jo = ["href"], Ho = { key: 1 }, Ko = { key: 2 }, Wo = ["href"], Yo = ["href"], Xo = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = M(s.foodId), u = M(100), r = M(ke()), c = M("unspecified"), m = M(null);
    pe(() => s.foodId, (K) => {
      i.value = K;
    }), pe(i, () => {
      m.value = null;
    });
    const v = G(() => le[i.value]), p = M("");
    async function b() {
      const K = i.value;
      p.value = "";
      try {
        await qe(K);
      } catch (z) {
        i.value === K && (p.value = z.message);
      }
    }
    pe(i, b, { immediate: !0 });
    const $ = G(() => no(le[s.foodId])), h = G(() => Me.some((K) => typeof v.value?.nutrients?.[K.id] != "number")), T = G(() => v.value?.__summary ? null : ft(v.value, h.value ? m.value : null)), x = G(() => gn([{ foodId: v.value.key, grams: Number(u.value), nutritionSnapshot: T.value }]).totals), w = G(() => !v.value?.__summary && Number(u.value) >= 0.1 && Number(u.value) <= 5e3 && r.value && r.value <= ke()), { photo: C, loading: R, failed: D } = Un(() => v.value), P = G(() => v.value?.imageCredit || C.value?.imageCredit || C.value);
    function F() {
      w.value && d("add", { foodId: v.value.key, grams: Number(u.value), date: r.value, meal: c.value, nutritionSnapshot: T.value });
    }
    return (K, z) => v.value ? (n(), me(ot, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: z[6] || (z[6] = (W) => K.$emit("close"))
    }, {
      default: st(() => [
        e("div", Io, [
          e("figure", null, [
            U(Gt, {
              food: v.value,
              photo: g(C),
              loading: g(R),
              failed: g(D),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", So, l(v.value.categoryName), 1),
            e("h1", null, l(g(En)(v.value.key) || g(kt)(v.value)), 1),
            e("p", xo, l(g(Lt)(v.value)), 1),
            e("span", Eo, l(v.value.source ? "数据库" : m.value ? "AI估算" : "数据不完整"), 1),
            $.value.length ? (n(), o("label", Uo, [
              z[7] || (z[7] = N("选择营养样本", -1)),
              ee(e("select", {
                "onUpdate:modelValue": z[0] || (z[0] = (W) => i.value = W),
                "aria-label": "选择营养样本"
              }, [
                $.value.some((W) => W.id === s.foodId) ? k("", !0) : (n(), o("option", {
                  key: 0,
                  value: s.foodId
                }, "当前食物 · " + l(g(le)[s.foodId]?.source ? "数据库" : "通用估算"), 9, jo)),
                (n(!0), o(B, null, L($.value, (W) => (n(), o("option", {
                  key: W.id,
                  value: W.id
                }, l(W.label), 9, Do))), 128))
              ], 512), [
                [Ce, i.value]
              ]),
              z[8] || (z[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : k("", !0)
          ])
        ]),
        h.value && !v.value.__summary ? (n(), o("details", Po, [
          z[9] || (z[9] = e("summary", null, "查看估算依据与调整", -1)),
          U(fo, {
            food: v.value,
            onResolved: z[1] || (z[1] = (W) => m.value = W)
          }, null, 8, ["food"])
        ])) : k("", !0),
        p.value ? (n(), o("p", No, [
          N(l(p.value) + " ", 1),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: b
          }, "重试")
        ])) : k("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: Ne(F, ["prevent"])
        }, [
          U(jn, {
            food: v.value,
            onChoose: z[2] || (z[2] = (W) => u.value = W)
          }, null, 8, ["food"]),
          e("div", Mo, [
            e("label", null, [
              z[10] || (z[10] = N("可食部重量", -1)),
              ee(e("input", {
                "onUpdate:modelValue": z[3] || (z[3] = (W) => u.value = W),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [de, u.value]
              ]),
              z[11] || (z[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              z[12] || (z[12] = N("记录日期", -1)),
              ee(e("input", {
                "onUpdate:modelValue": z[4] || (z[4] = (W) => r.value = W),
                type: "date",
                max: g(ke)(),
                required: ""
              }, null, 8, Ro), [
                [de, r.value]
              ])
            ]),
            e("label", null, [
              z[13] || (z[13] = N("餐次", -1)),
              ee(e("select", {
                "onUpdate:modelValue": z[5] || (z[5] = (W) => c.value = W)
              }, [
                (n(!0), o(B, null, L(g(dt), ([W, H]) => (n(), o("option", {
                  key: W,
                  value: W
                }, l(H), 9, To))), 128))
              ], 512), [
                [Ce, c.value]
              ])
            ])
          ]),
          e("div", zo, [
            (n(!0), o(B, null, L(g(Me), (W) => (n(), o("div", {
              key: W.id
            }, [
              e("span", null, l(W.id === "carbs" ? "碳水" : W.name), 1),
              e("strong", null, [
                N(l(g(Xt)(x.value[W.id])) + " ", 1),
                x.value[W.id].value != null || x.value[W.id].range ? (n(), o("small", Oo, l(W.unit), 1)) : k("", !0)
              ]),
              x.value[W.id].range ? (n(), o("small", Fo, "AI估算")) : k("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !w.value
          }, [
            U(O, {
              name: "plus",
              size: 16
            }),
            z[14] || (z[14] = N("添加记录", -1))
          ], 8, Bo),
          z[15] || (z[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", Vo, [
          z[20] || (z[20] = e("summary", null, "查看完整营养与依据", -1)),
          z[21] || (z[21] = e("p", null, "每100克可食部；未知值不按0计算。范围为AI估算，非实测值。", -1)),
          e("div", qo, [
            e("div", Lo, [
              z[16] || (z[16] = e("span", null, "营养指标", -1)),
              z[17] || (z[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + l(u.value) + " 克", 1)
            ]),
            (n(!0), o(B, null, L(g(Hn), (W) => (n(), o("div", {
              key: W.id
            }, [
              e("span", null, l(W.name), 1),
              e("span", null, l(g(xe)(v.value.nutrients[W.id])) + " " + l(v.value.nutrients[W.id] != null ? W.unit : ""), 1),
              e("span", null, l(g(Xt)(x.value[W.id])) + " " + l(x.value[W.id].value != null || x.value[W.id].range ? W.unit : "") + l(x.value[W.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + l(v.value.name), 1),
          v.value.source ? (n(), o("p", Go, [
            e("a", {
              href: v.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, l(v.value.source.name), 9, Jo),
            N(" · " + l(v.value.source.id) + " · " + l(v.value.source.license), 1),
            z[18] || (z[18] = e("br", null, null, -1)),
            N(l(v.value.source.description), 1)
          ])) : (n(), o("p", Ho, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          z[22] || (z[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          P.value ? (n(), o("p", Ko, [
            z[19] || (z[19] = N("图片：", -1)),
            e("a", {
              href: P.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, l(P.value.title), 9, Wo),
            N(" / " + l(P.value.author) + " · ", 1),
            e("a", {
              href: P.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, l(P.value.license), 9, Yo),
            N(" · " + l(P.value.modifications), 1)
          ])) : k("", !0)
        ])
      ]),
      _: 1
    })) : k("", !0);
  }
}, Qo = { class: "vb-report-heading" }, Zo = { class: "vb-small-label" }, el = { class: "vb-pill" }, tl = { key: 0 }, nl = ["disabled"], sl = {
  key: 1,
  class: "vb-inline-warning"
}, ol = {
  key: 2,
  class: "vb-inline-warning"
}, ll = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, al = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, il = ["disabled"], rl = {
  key: 5,
  class: "vb-feature-error"
}, ul = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, dl = { class: "vb-report-estimation-heading" }, cl = { class: "vb-pill" }, vl = { class: "vb-data-note" }, ml = {
  key: 0,
  class: "vb-report-estimation-list"
}, pl = { class: "vb-report-estimation-values" }, bl = {
  key: 1,
  class: "vb-intake-more"
}, gl = { class: "vb-report-comparison" }, fl = { key: 0 }, yl = { key: 1 }, hl = { key: 2 }, kl = { key: 3 }, wl = { key: 4 }, $l = { key: 5 }, _l = { key: 6 }, Cl = { key: 7 }, Al = {
  key: 7,
  class: "vb-report-content"
}, Il = { class: "vb-report-summary" }, Sl = { class: "vb-inline-warning" }, xl = {
  key: 8,
  class: "vb-intake-more"
}, El = { class: "vb-report-meta" }, Ul = { key: 0 }, jl = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const a = t, s = G(() => a.report?.calculation?.targets || kn(a.report?.snapshot?.profile)), d = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], i = (v) => v ? new Date(v).toLocaleString("zh-CN", { hour12: !1 }) : "", u = G(() => (a.report?.snapshot?.entries || []).flatMap((v) => {
      const p = v.referenceConfirmed === !1 ? null : le[v.foodId], b = Me.filter(($) => {
        const h = Tt(v, p, $.id);
        return typeof h.value != "number" && !h.range;
      }).map(($) => $.id);
      return b.length ? [{ name: v.name, grams: v.grams, missing: b }] : [];
    })), r = G(() => a.report?.calculation?.estimation?.missingFoodCount ?? u.value.length), c = G(() => a.report?.calculation?.estimation?.foods || []), m = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + xe(Math.abs(v));
    return (v, p) => (n(), me(ot, {
      title: "AI 营养分析",
      wide: "",
      onClose: p[4] || (p[4] = (b) => v.$emit("close"))
    }, {
      default: st(() => [
        e("div", Qo, [
          e("div", null, [
            e("span", Zo, l(t.report?.date || t.record?.date), 1),
            p[5] || (p[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", el, l(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        p[17] || (p[17] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (n(), o("section", tl, [
          p[6] || (p[6] = e("p", null, "分析时向DeepSeek发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[0] || (p[0] = (b) => v.$emit("retry"))
          }, "开始AI分析", 8, nl)
        ])) : k("", !0),
        t.stale ? (n(), o("p", sl, [
          p[7] || (p[7] = N("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (n(), o("button", {
            key: 0,
            class: "vb-text-button",
            onClick: p[1] || (p[1] = (b) => v.$emit("retry"))
          }, "重新分析")) : k("", !0)
        ])) : k("", !0),
        t.record ? k("", !0) : (n(), o("p", ol, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (n(), o("div", ll, [
          p[9] || (p[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            p[8] || (p[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, l(r.value ? "同时自动估算 " + r.value + " 项食物的缺失指标。" : "程序已计算营养汇总，DeepSeek 正在生成解释与建议。"), 1)
          ])
        ])) : k("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (n(), o("div", al, [
          p[10] || (p[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, l(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[2] || (p[2] = (b) => v.$emit("retry"))
          }, "重新分析", 8, il)
        ])) : k("", !0),
        t.report?.persistenceFailed ? (n(), o("p", rl, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : k("", !0),
        t.report?.snapshot ? (n(), o(B, { key: 6 }, [
          p[13] || (p[13] = e("h3", { class: "vb-report-section-title" }, "程序计算的营养汇总", -1)),
          U(zt, {
            summary: t.report.snapshot.intake,
            targets: s.value,
            details: ""
          }, null, 8, ["summary", "targets"]),
          r.value ? (n(), o("section", ul, [
            e("div", dl, [
              e("div", null, [
                e("h3", null, l(r.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${r.value} 项）`), 1),
                p[11] || (p[11] = e("p", null, "缺失指标已自动交由 AI 估算范围，并用于下方参考差值；不需要额外点击。", -1))
              ]),
              e("span", cl, l(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            e("p", vl, l(t.report?.calculation?.estimation?.disclaimer || "估算结果基于食物名称和可食部克数，只用于本报告参考，不会写入食物库或原始饮食记录。"), 1),
            c.value.length ? (n(), o("ul", ml, [
              (n(!0), o(B, null, L(c.value, (b) => (n(), o("li", {
                key: b.entryId
              }, [
                e("div", null, [
                  e("strong", null, l(b.name) + " · " + l(g(xe)(b.grams)) + " 克", 1),
                  e("small", null, l(b.assumption), 1)
                ]),
                e("div", pl, [
                  (n(!0), o(B, null, L(g(Me).filter(($) => b.values[$.id]), ($) => (n(), o("span", {
                    key: $.id
                  }, l($.id === "carbs" ? "碳水" : $.name) + " " + l(g(xe)(b.values[$.id].low)) + "–" + l(g(xe)(b.values[$.id].high)) + " " + l($.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : k("", !0)
          ])) : k("", !0),
          t.report.calculation?.comparison ? (n(), o("details", bl, [
            p[12] || (p[12] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", gl, [
              (n(!0), o(B, null, L(t.report.calculation.comparison, (b) => (n(), o("div", {
                key: b.id
              }, [
                e("span", null, l(b.id === "carbs" ? "碳水" : b.name), 1),
                b.estimatedRange?.delta ? (n(), o("strong", fl, " AI 估算差值：" + l(m(b.estimatedRange.delta.low)) + " 至 " + l(m(b.estimatedRange.delta.high)) + " " + l(b.unit), 1)) : b.delta !== null ? (n(), o("strong", yl, l(b.delta > 0 ? "+" : "") + l(g(xe)(b.delta)) + " " + l(b.unit), 1)) : (n(), o("strong", hl, l(b.estimatedRange || b.complete && b.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                b.estimatedRange?.delta ? (n(), o("small", kl, "根据数据库已知小计与 AI 估算范围计算；记录未必覆盖全天，不代表达标或不足。")) : b.estimatedRange && !b.estimatedRange.delta ? (n(), o("small", wl, "含估算范围，暂无适用个人目标。")) : b.delta !== null ? (n(), o("small", $l, "记录合计减去全天目标，记录未必覆盖全天。")) : b.complete && b.target === null ? (n(), o("small", _l, "请完善个人营养档案后再查看与目标的差值。")) : (n(), o("small", Cl, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : k("", !0)
        ], 64)) : k("", !0),
        t.report?.result ? (n(), o("div", Al, [
          p[14] || (p[14] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", Il, l(t.report.result.summary), 1),
          (n(), o(B, null, L(d, ([b, $]) => e("section", { key: b }, [
            t.report.result[b]?.length ? (n(), o(B, { key: 0 }, [
              e("h3", null, l($), 1),
              e("ul", null, [
                (n(!0), o(B, null, L(t.report.result[b], (h, T) => (n(), o("li", { key: T }, l(h), 1))), 128))
              ])
            ], 64)) : k("", !0)
          ])), 64)),
          e("p", Sl, "分析范围：" + l(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : k("", !0),
        t.report ? (n(), o("details", xl, [
          p[16] || (p[16] = e("summary", null, "查看分析信息", -1)),
          e("div", El, [
            e("span", null, "生成时间：" + l(i(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (n(), o("span", Ul, "模型：" + l(t.report.model), 1)) : k("", !0),
            e("span", null, "数据版本：" + l(t.report.dataVersion), 1),
            e("span", null, "食物库：" + l(t.report.snapshot?.intake?.dataVersion), 1),
            p[15] || (p[15] = e("small", null, "报告、照片保存在本机浏览器。清理站点数据后无法恢复。", -1))
          ])
        ])) : k("", !0),
        t.report?.status === "complete" && t.record ? (n(), o("button", {
          key: 9,
          type: "button",
          class: "vb-button vb-button-quiet",
          onClick: p[3] || (p[3] = (b) => v.$emit("retry"))
        }, l(t.stale ? "用最新记录重新分析" : "重新分析这一天"), 1)) : k("", !0)
      ]),
      _: 1
    }));
  }
};
function Dn(t) {
  const a = String(t || "");
  return /^(?:好的[，,\s]*)?pdf(?:格式)?[。.!！]?$/i.test(a.trim()) ? "pdf" : /^(?:好的[，,\s]*)?(?:word|docx)(?:格式)?[。.!！]?$/i.test(a.trim()) ? "docx" : !/(生成|导出|下载|保存|制作|整理|做成|转换|转成|给我|发我|用|格式|create|generate|export|download|save|make|convert)/i.test(a) || /^(什么是|如何|怎么|为什么|what\b|how\b|why\b)/i.test(a.trim()) ? null : [["pdf", /pdf/i], ["docx", /word|docx|\.doc\b/i], ["png", /png|长图|图片文档|图片格式|(?:导出|保存).{0,8}图片/i]].map(([d, i]) => ({ format: d, index: a.search(i) })).filter((d) => d.index >= 0).sort((d, i) => d.index - i.index)[0]?.format || null;
}
function Dl(t) {
  const a = String(t || "").trim(), s = /^\s*#{1,6}\s+\S/m.exec(a);
  if (!s || !s.index) return a;
  const d = a.slice(0, s.index), i = d.split(`
`).map((c) => c.trim()).filter((c) => c && !/^[-*_]{3,}$/.test(c)), u = /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i, r = /(身高|体重|年龄|孕期|哺乳|过敏|疾病|营养|能量|热量|kcal|蛋白|用药)/i;
  return u.test(d) && i.every((c) => /(PDF|Word|文件|附件|导出|下载|复制|格式)/i.test(c) && !r.test(c)) ? a.slice(s.index).trim() : a;
}
function Ut(t) {
  const a = String(t || "").trim();
  return a.length < 400 && !/^\s*(?:#{1,6}\s|\|)/m.test(a) && /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i.test(a);
}
const Pn = (t, a) => {
  const s = t.__vccOpts || t;
  for (const [d, i] of a)
    s[d] = i;
  return s;
}, Pl = ["aria-busy"], Nl = { class: "vb-chat-document-body" }, Ml = {
  class: "vb-chat-export-options",
  "aria-label": "下载计划"
}, Rl = ["href", "download", "title"], Tl = ["disabled", "onClick"], zl = {
  key: 0,
  role: "status"
}, Ol = {
  key: 1,
  role: "alert"
}, Fl = { key: 2 }, Bl = {
  key: 1,
  class: "vb-chat-export"
}, Vl = { class: "vb-chat-export-options" }, ql = ["disabled", "onClick"], Ll = {
  key: 0,
  role: "status"
}, Gl = ["href", "download"], Jl = {
  key: 2,
  role: "alert"
}, Hl = { key: 3 }, Kl = {
  __name: "ChatMessageExport",
  props: { content: { type: String, required: !0 }, question: { type: String, default: "" }, auto: Boolean },
  emits: ["retry"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = M({}), u = M(""), r = M(""), c = M("");
    let m = 0, v = !1, p = !1;
    const b = G(() => Dn(s.question)), $ = G(() => u.value || b.value || "pdf"), h = G(() => ({ pdf: "PDF", docx: "Word", png: "图片" })[$.value]), T = G(() => i.value[$.value]), x = G(() => Dl(s.content));
    function w() {
      for (const D of Object.values(i.value)) setTimeout(() => URL.revokeObjectURL(D.url), 3e4);
      i.value = {};
    }
    async function C(D = $.value) {
      if (r.value || i.value[D]) {
        i.value[D] && (u.value = D);
        return;
      }
      const P = m, F = x.value, K = s.question;
      u.value = D, r.value = D, c.value = "";
      try {
        if (b.value && Ut(F)) throw new Error("尚未生成文档正文，请重新生成。");
        const { createChatExport: z, preparedChatDownload: W } = await import("./chatExport-BCM5BWUu.js");
        if (P !== m) return;
        const H = await z(D, F, { question: K });
        if (P !== m) return;
        i.value = { ...i.value, [D]: W(H) };
      } catch (z) {
        P === m && (c.value = z instanceof Error ? z.message : "文件生成失败，请重试。");
      } finally {
        P === m && (r.value = "");
      }
    }
    function R() {
      !v || !s.auto || !b.value || p || r.value || i.value[b.value] || c.value || (p = !0, requestAnimationFrame(() => setTimeout(() => {
        p = !1, v && s.auto && b.value && C(b.value);
      }, 0)));
    }
    return pe(() => [s.content, s.question], () => {
      m++, w(), u.value = "", r.value = "", c.value = "", R();
    }), pe(() => s.auto, R), Rt(() => {
      v = !0, R();
    }), Ke(() => {
      v = !1, m++, w();
    }), (D, P) => b.value ? (n(), o("div", {
      key: 0,
      class: "vb-chat-document",
      "aria-label": "计划正文与下载",
      "aria-busy": !!r.value
    }, [
      e("p", Nl, l(x.value), 1),
      e("div", Ml, [
        (n(), o(B, null, L([["pdf", "PDF"], ["docx", "Word"], ["png", "长图"]], ([F, K]) => (n(), o(B, { key: F }, [
          i.value[F] ? (n(), o("a", {
            key: 0,
            href: i.value[F].url,
            download: i.value[F].filename,
            title: i.value[F].filename
          }, l(F === "png" ? "保存长图" : "下载 " + K), 9, Rl)) : (n(), o("button", {
            key: 1,
            type: "button",
            disabled: !!r.value,
            onClick: (z) => C(F)
          }, l(r.value === F ? "正在生成…" : "生成 " + K), 9, Tl))
        ], 64))), 64))
      ]),
      T.value ? (n(), o("small", zl, l(h.value) + " 文件已生成", 1)) : k("", !0),
      c.value ? (n(), o("div", Ol, [
        e("p", null, l(c.value), 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: P[0] || (P[0] = (F) => g(Ut)(x.value) ? d("retry") : C())
        }, l(g(Ut)(x.value) ? "重新生成正文" : "重试生成文件"), 1)
      ])) : k("", !0),
      T.value?.pageCount ? (n(), o("small", Fl, "内容较长，" + l(T.value.pageCount) + " 张图片已打包为 ZIP。", 1)) : k("", !0)
    ], 8, Pl)) : (n(), o("div", Bl, [
      e("details", null, [
        P[1] || (P[1] = e("summary", null, "导出", -1)),
        e("div", Vl, [
          (n(), o(B, null, L([["pdf", "PDF"], ["docx", "Word"], ["png", "长图"]], ([F, K]) => e("button", {
            key: F,
            type: "button",
            disabled: !!r.value,
            onClick: (z) => C(F)
          }, "生成 " + l(K), 9, ql)), 64))
        ]),
        r.value ? (n(), o("p", Ll, "正在生成 " + l(h.value) + "…", 1)) : k("", !0),
        T.value ? (n(), o("a", {
          key: 1,
          href: T.value.url,
          download: T.value.filename,
          class: "vb-text-button"
        }, "下载 " + l(h.value), 9, Gl)) : k("", !0),
        c.value ? (n(), o("small", Jl, l(c.value), 1)) : k("", !0),
        T.value?.pageCount ? (n(), o("small", Hl, l(T.value.pageCount) + " 张图片已打包为 ZIP。", 1)) : k("", !0)
      ])
    ]));
  }
}, Wl = /* @__PURE__ */ Pn(Kl, [["__scopeId", "data-v-f7827d43"]]);
function Yl(t, a, s) {
  return t.push({ id: a, role: "assistant", content: "", status: "sending", createdAt: s }), t[t.length - 1];
}
function ln(t, a = {}, s = []) {
  const d = new Set(s), i = {};
  for (const u of new Set((t.threads || []).map((r) => r.date))) {
    const r = (t.threads || []).filter((p) => p.date === u).sort((p, b) => String(b.createdAt || "").localeCompare(String(p.createdAt || ""))), c = r.find((p) => p.id === a[u]), m = r.find((p) => p.id === t.activeByDate?.[u]), v = c && (c.messages?.length || d.has(c.id)) ? c : m?.messages?.length ? m : r.find((p) => p.messages?.length) || c || m || r[0];
    v && (i[u] = v.id);
  }
  return i;
}
const Xl = 24e3, an = 220;
function Ql(t, a) {
  const s = Date.parse(t || a || "");
  return Number.isFinite(s) ? s : 0;
}
function rn(t) {
  const a = String(t || "").trim();
  return a.length > an ? `${a.slice(0, an)}…` : a;
}
function Zl(t, a, s = !0) {
  if (!s || !Array.isArray(t)) return "";
  const d = [];
  for (const r of t) {
    if (!r || r.id === a || !Array.isArray(r.messages)) continue;
    const c = r.messages;
    for (let m = 0; m < c.length - 1; m++) {
      const v = c[m], p = c[m + 1];
      if (v?.role !== "user" || p?.role !== "assistant" || v.status !== "complete" || p.status !== "complete" || v.attachments?.length || p.attachments?.length) continue;
      const b = rn(v.content), $ = rn(p.content);
      !b || !$ || (d.push({
        date: typeof r.date == "string" ? r.date : "",
        time: Ql(v.createdAt, r.createdAt),
        user: b,
        assistant: $
      }), m++);
    }
  }
  const i = d.sort((r, c) => r.time - c.time).slice(-50);
  let u = i.map((r) => `${r.date ? `日期 ${r.date}：` : ""}用户：${r.user}
助手：${r.assistant}`).join(`

`);
  for (; u.length > Xl && i.length; )
    i.shift(), u = i.map((r) => `${r.date ? `日期 ${r.date}：` : ""}用户：${r.user}
助手：${r.assistant}`).join(`

`);
  return u;
}
function ea(t) {
  if (!t || typeof t != "object" || Array.isArray(t) || nt(t)) return null;
  const a = (u) => u == null || u === "" ? void 0 : Number(u), s = a(t.age), d = a(t.height), i = a(t.weight);
  return {
    sex: t.sex || "",
    ...s !== void 0 ? { age: s } : {},
    ...d !== void 0 ? { height: d } : {},
    ...i !== void 0 ? { weight: i } : {},
    activity: t.activity,
    ...a(t.ageMonths) !== void 0 ? { ageMonths: a(t.ageMonths) } : {},
    ...t.physiologicalStage ? { physiologicalStage: t.physiologicalStage } : {}
  };
}
const ta = 3, na = 24e3, un = 6e4, sa = 8e5, oa = 6, la = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function Nn(t) {
  const a = String(t.name || "").split(".").pop().toLowerCase(), s = ["jpg", "jpeg", "png", "webp"].includes(a) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(a) ? "document" : null;
  if (!s) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (s === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(s === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return s;
}
function aa(t) {
  const a = String(t).replace(/\u0000/g, "").trim();
  if (!a) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (a.length > na) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return a;
}
let Xe;
function ia() {
  return Xe || (Xe = new Promise((t, a) => {
    if (!globalThis.indexedDB) {
      a(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const s = indexedDB.open(tt("weiheng.chat-attachments.v1"), 1);
    s.onupgradeneeded = () => s.result.createObjectStore("attachments", { keyPath: "id" }), s.onsuccess = () => {
      const d = s.result;
      d.onversionchange = () => {
        d.close(), Xe = void 0;
      }, t(d);
    }, s.onerror = s.onblocked = () => a(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw Xe = void 0, t;
  })), Xe;
}
async function Jt(t, a) {
  const s = await ia();
  if (t === "readwrite" && Le()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((d, i) => {
    const u = s.transaction("attachments", t), r = a(u.objectStore("attachments"));
    u.oncomplete = () => d(r.result), u.onerror = u.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const ra = (t) => Jt("readwrite", (a) => a.put(t)), jt = (t) => Jt("readonly", (a) => a.get(t)), rt = (t) => Jt("readwrite", (a) => a.delete(t));
function ua(t) {
  return new Promise((a, s) => {
    const d = new FileReader();
    d.onload = () => a(String(d.result)), d.onerror = () => s(new Error("照片读取失败，请重新选择。")), d.readAsDataURL(t);
  });
}
async function da(t) {
  const a = await createImageBitmap(t).catch(() => {
    throw new Error("照片无法读取，请换用 JPG、PNG 或 WebP。");
  });
  try {
    if (a.width * a.height > 4e7) throw new Error("照片分辨率过大，请缩小后上传。");
    const s = document.createElement("canvas"), d = Math.min(1, 1600 / Math.max(a.width, a.height));
    s.width = Math.max(1, Math.round(a.width * d)), s.height = Math.max(1, Math.round(a.height * d));
    const i = s.getContext("2d");
    if (!i) throw new Error("浏览器暂不支持照片处理。");
    i.fillStyle = "#fff", i.fillRect(0, 0, s.width, s.height), i.drawImage(a, 0, 0, s.width, s.height);
    for (const u of [0.85, 0.68, 0.5]) {
      const r = await new Promise((m, v) => s.toBlob((p) => p ? m(p) : v(new Error("照片压缩失败。")), "image/jpeg", u)), c = await ua(r);
      if (c.length <= sa) return c;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    a.close();
  }
}
async function ca(t) {
  const a = await import("./pdf-jk_a9_-5.js");
  a.GlobalWorkerOptions.workerSrc = "/content-dist/pdf.worker.min.js";
  const s = a.getDocument({
    data: new Uint8Array(await t.arrayBuffer()),
    useSystemFonts: !0,
    cMapUrl: "/content-dist/pdf-resources/cmaps/",
    cMapPacked: !0,
    standardFontDataUrl: "/content-dist/pdf-resources/standard_fonts/"
  });
  try {
    const d = await s.promise;
    if (d.numPages > 40) throw new Error("PDF 超过 40 页，请截取需要讨论的页面后上传。");
    const i = [];
    for (let u = 1; u <= d.numPages; u++) {
      const r = await d.getPage(u), c = await r.getTextContent();
      if (i.push(c.items.map((m) => "str" in m ? m.str + (m.hasEOL ? `
` : " ") : "").join("")), i.join(`
`).length > 24e3) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
      r.cleanup();
    }
    return i.join(`

`);
  } catch (d) {
    throw d instanceof Error && d.name === "PasswordException" ? new Error("PDF 已加密，请解锁后再上传。") : d;
  } finally {
    await s.destroy();
  }
}
async function va(t) {
  const { unzipSync: a, strFromU8: s } = await import("./browser-CJhYS1h6.js"), d = a(new Uint8Array(await t.arrayBuffer()), {
    filter: (u) => u.name === "word/document.xml" && u.originalSize <= 4 * 1024 * 1024
  });
  if (!d["word/document.xml"]) throw new Error("Word 文件无效或内容过大，请另存为 DOCX 或 TXT 后重试。");
  const i = new DOMParser().parseFromString(s(d["word/document.xml"]), "application/xml");
  if (i.querySelector("parsererror")) throw new Error("Word 文件内容无法读取。");
  return Array.from(i.getElementsByTagNameNS("*", "p")).map((u) => Array.from(u.getElementsByTagNameNS("*", "*")).map((r) => r.localName === "t" ? r.textContent || "" : r.localName === "tab" ? "	" : r.localName === "br" ? `
` : "").join("")).join(`
`);
}
async function ma(t, a) {
  const s = Nn(t), d = { id: a, kind: s, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (s === "image") return { ...d, mimeType: "image/jpeg", dataUrl: await da(t) };
  const i = t.name.split(".").pop()?.toLowerCase();
  let u;
  try {
    if (i === "pdf") u = await ca(t);
    else if (i === "docx") u = await va(t);
    else {
      const r = new Uint8Array(await t.arrayBuffer());
      u = new TextDecoder().decode(r), u.includes("�") && (u = new TextDecoder("gb18030").decode(r));
    }
  } catch (r) {
    throw new Error(r instanceof Error && /[\u4e00-\u9fff]/.test(r.message) ? r.message : "文件无法读取，请确认文件完整，或另存为 TXT 后重试。");
  }
  return { ...d, text: aa(u) };
}
const pa = {
  class: "vb-chat-page vb-simple-chat",
  "aria-label": "维衡AI助手对话"
}, ba = { class: "vb-simple-header" }, ga = { class: "vb-simple-actions" }, fa = { class: "vb-simple-date" }, ya = ["max", "disabled"], ha = { class: "vb-simple-options" }, ka = { "aria-label": "对话选项" }, wa = { class: "vb-simple-options-panel" }, $a = {
  key: 0,
  class: "vb-simple-history"
}, _a = ["value", "disabled"], Ca = ["value"], Aa = ["value"], Ia = { class: "vb-memory-toggle" }, Sa = ["disabled"], xa = {
  key: 0,
  class: "vb-simple-welcome"
}, Ea = { class: "vb-simple-starters" }, Ua = ["onClick"], ja = { class: "vb-simple-context" }, Da = {
  key: 1,
  class: "vb-simple-thread"
}, Pa = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, Na = { class: "vb-simple-message-body" }, Ma = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, Ra = ["aria-label", "onClick"], Ta = ["src", "alt"], za = {
  key: 1,
  class: "vb-simple-loading"
}, Oa = {
  key: 2,
  class: "vb-simple-text"
}, Fa = {
  key: 0,
  class: "vb-simple-text"
}, Ba = {
  class: "vb-simple-error",
  role: "alert"
}, Va = ["onClick"], qa = {
  key: 4,
  class: "vb-simple-text"
}, La = {
  key: 6,
  class: "vb-simple-message-meta"
}, Ga = { class: "vb-simple-composer" }, Ja = { class: "vb-simple-composer-inner" }, Ha = {
  key: 0,
  class: "vb-simple-tools"
}, Ka = { class: "vb-simple-quick" }, Wa = { class: "vb-simple-quick-panel" }, Ya = ["onClick"], Xa = {
  key: 0,
  class: "vb-simple-status",
  role: "status"
}, Qa = ["accept"], Za = {
  key: 0,
  class: "vb-chat-draft-attachments",
  "aria-label": "待发送附件"
}, ei = ["disabled", "aria-label", "onClick"], ti = ["src", "alt"], ni = {
  key: 0,
  role: "status"
}, si = {
  key: 1,
  role: "alert"
}, oi = { key: 2 }, li = ["aria-label", "onClick"], ai = { class: "vb-simple-editor-bottom" }, ii = { class: "vb-chat-input-tools" }, ri = ["disabled"], ui = {
  key: 1,
  class: "vb-simple-notice",
  role: "alert"
}, di = ["role"], ci = { class: "vb-simple-footnote" }, vi = { class: "vb-simple-privacy" }, mi = ["src", "alt"], pi = {
  key: 1,
  class: "vb-chat-text-preview"
}, bi = { class: "vb-data-note" }, dn = "weiheng.ai-diet-chat.v1", gi = /* @__PURE__ */ We({
  __name: "AiDietAssistantPage",
  props: {
    records: { default: () => [] },
    targets: { default: null },
    profile: { default: null }
  },
  setup(t) {
    const a = t, s = [
      "分析今天已记录的营养摄入，并说明数据完整性。",
      "查看已记录食物的维生素和矿物质摄入情况，缺失数据请说明。",
      "解释我的营养参考值及其适用范围。",
      "根据饮食记录安排下一餐，先询问必要的就餐条件。"
    ];
    function d() {
      return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    function i() {
      try {
        const A = JSON.parse(we.getItem(dn) || "null");
        if (!A || typeof A != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0 };
        const _ = A, I = Array.isArray(_.threads) ? _.threads.flatMap((se) => {
          if (!se || typeof se != "object") return [];
          const Q = se;
          return typeof Q.id != "string" || !Be(Q.date) || !Array.isArray(Q.messages) ? [] : [{
            id: Q.id,
            date: Q.date,
            createdAt: typeof Q.createdAt == "string" ? Q.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: Q.messages.filter((ve) => !!(ve && typeof ve == "object" && ["user", "assistant"].includes(ve.role) && typeof ve.content == "string")).map((ve) => ve.status === "sending" ? { ...ve, status: "failed", error: "页面刷新时请求中断。点击重试可继续这条问题。" } : ve)
          }];
        }) : [], Y = _.activeByDate && typeof _.activeByDate == "object" ? Object.fromEntries(Object.entries(_.activeByDate).filter(([se, Q]) => Be(se) && typeof Q == "string")) : {};
        return { threads: I.slice(-60), activeByDate: Y, memoryEnabled: _.memoryEnabled !== !1 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0 };
      }
    }
    const u = i(), r = M(u.threads), c = M(ln(u, u.activeByDate)), m = /* @__PURE__ */ new Set(), v = M(u.memoryEnabled), p = M(ke()), b = M(""), $ = M(null), h = M([]), T = M({}), x = M(null), w = G(() => h.value.some((A) => A.status === "ready"));
    let C = 0;
    const R = M(""), D = M(""), P = M(null), F = G(() => r.value.some((A) => A.messages.some((_) => _.status === "sending"))), K = G(() => a.records.find((A) => A.date === p.value)), z = G(() => K.value?.entries || []), W = G(() => ({
      energy: typeof a.targets?.tdee == "number" ? a.targets.tdee : null,
      protein: a.targets?.macros?.find((A) => A.id === "protein")?.grams ?? null,
      carbs: a.targets?.macros?.find((A) => A.id === "carbs")?.grams ?? null,
      fat: a.targets?.macros?.find((A) => A.id === "fat")?.grams ?? null
    })), H = G(() => r.value.find((A) => A.id === c.value[p.value])), ue = G(() => H.value?.messages || []), re = G(() => r.value.filter((A) => A.messages.length).sort((A, _) => _.createdAt.localeCompare(A.createdAt)));
    function ye(A) {
      const _ = A.target.value, I = r.value.find((Y) => Y.id === _);
      I && (p.value = I.date, c.value[I.date] = I.id);
    }
    function X(A) {
      const _ = ue.value, I = _.findIndex((Y) => Y.id === A);
      return _.slice(0, I).reverse().find((Y) => Y.role === "user")?.content || "";
    }
    function V(A) {
      const { id: _, kind: I, name: Y, size: se, mimeType: Q } = A;
      return { id: _, kind: I, name: Y, size: se, mimeType: Q };
    }
    function E(A) {
      return A >= 1024 * 1024 ? `${(A / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(A / 1024))} KB`;
    }
    async function ne(A) {
      const _ = C;
      D.value = "";
      for (const I of A) {
        if (_ !== C) break;
        if (h.value.length >= ta) {
          D.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let Y;
        try {
          Y = Nn(I);
        } catch (Q) {
          D.value = Q instanceof Error ? Q.message : "这个文件暂不支持。";
          continue;
        }
        const se = d();
        h.value.push({ id: se, kind: Y, name: I.name.slice(0, 180), size: I.size, mimeType: I.type, status: "reading" });
        try {
          const Q = await ma(I, se);
          if (!h.value.some((ge) => ge.id === se)) continue;
          if (h.value.reduce((ge, Ie) => ge + (Ie.value?.text?.length || 0), Q.text?.length || 0) > un) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await ra(Q);
          const fe = h.value.find((ge) => ge.id === se);
          if (!fe) {
            await rt(se);
            continue;
          }
          T.value[se] = Q, fe.value = Q, fe.status = "ready";
        } catch (Q) {
          const ve = h.value.find((fe) => fe.id === se);
          ve && (ve.status = "failed", ve.error = Q instanceof Error ? Q.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function te(A) {
      const _ = A.target, I = Array.from(_.files || []);
      _.value = "", ne(I);
    }
    function J(A) {
      const _ = Array.from(A.clipboardData?.files || []).filter((I) => I.type.startsWith("image/"));
      _.length && (A.preventDefault(), ne(_));
    }
    function S(A) {
      A.dataTransfer?.types.includes("Files") && A.preventDefault();
    }
    function y(A) {
      const _ = Array.from(A.dataTransfer?.files || []);
      _.length && (A.preventDefault(), ne(_));
    }
    function f(A) {
      h.value = h.value.filter((_) => _.id !== A), delete T.value[A], rt(A).catch(() => {
        D.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function j() {
      const A = h.value.flatMap((I) => I.status === "ready" && I.value ? [I.value] : []), _ = new Set(A.map((I) => I.id));
      return h.value = h.value.filter((I) => !_.has(I.id)), A;
    }
    async function ie(A) {
      try {
        const _ = T.value[A.id] || await jt(A.id);
        if (!_) throw new Error("附件已不在本地存储中，请重新添加。");
        x.value = _;
      } catch (_) {
        D.value = _ instanceof Error ? _.message : "无法预览附件。";
      }
    }
    pe(() => ue.value.flatMap((A) => A.attachments || []).map((A) => A.id).join(","), async () => {
      for (const A of ue.value.flatMap((_) => _.attachments || []))
        if (!T.value[A.id])
          try {
            const _ = await jt(A.id);
            _ && (T.value[A.id] = _);
          } catch {
          }
    }, { immediate: !0 });
    function ae(A) {
      const _ = { id: d(), date: A, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (r.value.push(_), r.value.length > 60) {
        const I = r.value.splice(0, r.value.length - 60);
        lt(I.flatMap((Y) => Y.messages));
      }
      return c.value[A] = _.id, _;
    }
    function lt(A) {
      for (const _ of A.flatMap((I) => I.attachments || []))
        delete T.value[_.id], rt(_.id).catch(() => {
          R.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function Ue(A) {
      const _ = c.value[A];
      if (_ && r.value.some((Y) => Y.id === _)) return;
      const I = r.value.filter((Y) => Y.date === A).sort((Y, se) => se.createdAt.localeCompare(Y.createdAt))[0];
      I ? c.value[A] = I.id : ae(A);
    }
    Ue(p.value), pe(p, (A) => {
      if (!Be(A) || A > ke()) {
        p.value = ke();
        return;
      }
      Ue(A), D.value = "";
    });
    let Ye = !1, Ge = !1;
    function Je() {
      if (F.value) {
        Ge = !0;
        return;
      }
      Ge = !1, Ye = !0;
      const A = i();
      r.value = A.threads, c.value = ln(A, c.value, [...m]), v.value = A.memoryEnabled, Ue(p.value), Ee(() => {
        Ye = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", Je), Ke(() => window.removeEventListener("weiheng-chat-synced", Je));
    let je;
    function Ae() {
      if (je && clearTimeout(je), je = void 0, !Le())
        try {
          we.setItem(dn, JSON.stringify({ threads: r.value, activeByDate: c.value, memoryEnabled: v.value })), R.value = "";
        } catch {
          R.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function wt() {
      Ye || (je && clearTimeout(je), je = setTimeout(Ae, 160));
    }
    pe([r, c, v], wt, { deep: !0 });
    function Z() {
      Ae();
    }
    typeof window < "u" && (window.addEventListener("pagehide", Z), window.addEventListener("weiheng-chat-flush", Z)), Ke(() => {
      Ae(), typeof window < "u" && (window.removeEventListener("pagehide", Z), window.removeEventListener("weiheng-chat-flush", Z));
    }), pe(ue, async () => {
      await Ee(), P.value && (P.value.scrollTop = P.value.scrollHeight);
    }, { deep: !0 });
    let q;
    function oe() {
      const A = q;
      A && (q = void 0, A.controller.abort(), A.assistantMessage.status === "sending" && (A.assistantMessage.status = "failed", A.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), Ae());
    }
    function he(A) {
      const _ = new Date(A);
      return Number.isNaN(_.getTime()) ? "新对话" : _.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function $t(A) {
      const _ = new Date(A);
      return Number.isNaN(_.getTime()) ? "" : _.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function Rn() {
      return z.value.map((A) => ({
        foodId: A.foodId,
        name: A.name,
        grams: A.grams,
        meal: A.meal,
        referenceConfirmed: A.referenceConfirmed
      }));
    }
    async function Tn(A, _) {
      const I = A.slice(0, _).filter((fe) => fe.status === "complete"), Y = [];
      for (const { role: fe, content: ge, attachments: Ie } of I) {
        const Se = { role: fe, content: ge.slice(0, 1200), attachments: Ie };
        fe === "user" ? Y.at(-1)?.role === "user" ? Y[Y.length - 1] = Se : Y.push(Se) : Y.at(-1)?.role === "user" && Y.push(Se);
      }
      for (; Y[0]?.role !== "user"; ) Y.shift();
      const se = Y.slice(-11);
      for (; se.reduce((fe, ge) => fe + ge.content.length, 0) > 9e3; ) se.splice(0, 2);
      let Q = 0, ve = 0;
      for (let fe = se.length - 1; fe >= 0; fe--) {
        const ge = se[fe], Ie = [];
        let Se = !1;
        for (const at of ge.attachments || []) {
          const De = T.value[at.id] || await jt(at.id);
          if (!De) {
            if (fe === se.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Se = !0;
            continue;
          }
          if (Q + (De.text?.length || 0) > un || De.kind === "image" && ve >= oa) {
            Se = !0;
            continue;
          }
          Q += De.text?.length || 0, De.kind === "image" && ve++, Ie.push(De);
        }
        ge.attachments = Ie.length ? Ie : void 0, Se && (ge.content = ge.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return se;
    }
    async function Ht(A, _, I = []) {
      const Y = A.trim() || (I.length ? "请帮我分析这些附件。" : "");
      if (!Y || Y.length > 1200) return !1;
      oe(), Ue(p.value);
      const se = H.value;
      if (!se) return !1;
      let Q, ve;
      if (_) {
        ve = se.messages.findIndex((ze) => ze.id === _ && ze.role === "assistant");
        const Te = se.messages[ve - 1];
        if (ve < 1 || Te?.role !== "user")
          return D.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        Q = se.messages[ve], Q.status = "sending", Q.error = void 0, Q.content = "";
      } else
        se.messages.push({ id: d(), role: "user", content: Y, attachments: I.length ? I.map(V) : void 0, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), Q = Yl(se.messages, d(), (/* @__PURE__ */ new Date()).toISOString()), se.messages.length > 120 && lt(se.messages.splice(0, se.messages.length - 120)), ve = se.messages.length - 1;
      Ae(), D.value = "";
      const fe = new AbortController(), ge = { controller: fe, assistantMessage: Q };
      q = ge;
      const Ie = p.value, Se = Rn(), at = W.value, De = ea(a.profile), Bn = Zl(r.value, se.id, v.value);
      try {
        const Te = await Tn(se.messages, ve);
        if (q !== ge) return !1;
        if (Te.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const ze = await In("chat", {
          date: Ie,
          messages: Te,
          entries: Se,
          targets: at,
          profile: De,
          memory: Bn
        }, (Pe) => {
          q === ge && (Pe.type === "delta" ? Q.content += Pe.text : Pe.type === "done" && (typeof Pe.content == "string" && (Q.content = Pe.content), Q.model = Pe.model, Q.context = Pe.contextSummary, Q.createdAt = Pe.generatedAt || (/* @__PURE__ */ new Date()).toISOString()));
        }, fe.signal);
        if (q !== ge) return !1;
        if (!Q.content.trim() || typeof ze.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return Q.model = ze.model, Q.context = ze.contextSummary, Q.createdAt = ze.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Q.status = "complete", Ae(), ns(), !0;
      } catch (Te) {
        return q !== ge || (Q.status = "failed", Q.error = Te instanceof Error ? Te.message : "AI 暂时无法回复，请重试。", Ae()), !1;
      } finally {
        q === ge && (q = void 0), Ge && !F.value && Je();
      }
    }
    function Kt() {
      const A = b.value.trim();
      if (!A && !w.value || A.length > 1200) return;
      const _ = j();
      b.value = "", Ht(A, void 0, _);
    }
    function Wt(A) {
      b.value = A, Ee(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function zn(A) {
      A.key === "Enter" && !A.shiftKey && !A.isComposing && (A.preventDefault(), Kt());
    }
    function Yt(A) {
      const _ = ue.value.findIndex((Y) => Y.id === A), I = ue.value[_ - 1];
      _ > 0 && I?.role === "user" && Ht(I.content, A);
    }
    function On() {
      C++, m.add(ae(p.value).id);
      for (const A of h.value) f(A.id);
      D.value = "";
    }
    function Fn() {
      if (!window.confirm("清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。")) return;
      const A = r.value.flatMap((_) => _.messages.flatMap((I) => I.attachments || []));
      for (const _ of A)
        delete T.value[_.id], rt(_.id).catch(() => {
          R.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      ts(), r.value = [], c.value = {}, R.value = "", Ue(p.value), D.value = "当前空间的聊天记录已清除。";
    }
    return (A, _) => (n(), o("section", pa, [
      e("header", ba, [
        _[12] || (_[12] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡AI助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", ga, [
          e("label", fa, [
            U(O, {
              name: "calendar",
              size: 16
            }),
            _[6] || (_[6] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            ee(e("input", {
              "onUpdate:modelValue": _[0] || (_[0] = (I) => p.value = I),
              type: "date",
              max: g(ke)(),
              disabled: F.value,
              "aria-label": "选择饮食日期"
            }, null, 8, ya), [
              [de, p.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: On
          }, [
            U(O, {
              name: "plus",
              size: 16
            }),
            _[7] || (_[7] = N("新对话", -1))
          ]),
          e("details", ha, [
            e("summary", ka, [
              _[8] || (_[8] = N("更多", -1)),
              U(O, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", wa, [
              re.value.length ? (n(), o("label", $a, [
                _[9] || (_[9] = N(" 历史对话 ", -1)),
                e("select", {
                  value: H.value?.id,
                  disabled: F.value,
                  "aria-label": "切换历史对话",
                  onChange: ye
                }, [
                  ue.value.length ? k("", !0) : (n(), o("option", {
                    key: 0,
                    value: H.value?.id
                  }, "当前新对话", 8, Ca)),
                  (n(!0), o(B, null, L(re.value, (I) => (n(), o("option", {
                    key: I.id,
                    value: I.id
                  }, l(I.date) + " · " + l(he(I.createdAt)) + " · " + l(I.messages.length) + " 条消息", 9, Aa))), 128))
                ], 40, _a)
              ])) : k("", !0),
              e("label", Ia, [
                ee(e("input", {
                  "onUpdate:modelValue": _[1] || (_[1] = (I) => v.value = I),
                  type: "checkbox"
                }, null, 512), [
                  [ut, v.value]
                ]),
                _[10] || (_[10] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              _[11] || (_[11] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: F.value,
                onClick: Fn
              }, "清除本地记录", 8, Sa)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: P,
        class: be(["vb-simple-scroll", { "is-empty": !ue.value.length }]),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        ue.value.length ? (n(), o("div", Da, [
          (n(!0), o(B, null, L(ue.value, (I) => (n(), o("article", {
            key: I.id,
            class: be(["vb-simple-message", [`is-${I.role}`, `is-${I.status}`]])
          }, [
            I.role === "assistant" ? (n(), o("span", Pa, [
              U(O, {
                name: "sparkles",
                size: 18
              })
            ])) : k("", !0),
            e("div", Na, [
              I.attachments?.length ? (n(), o("div", Ma, [
                (n(!0), o(B, null, L(I.attachments, (Y) => (n(), o("button", {
                  key: Y.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + Y.name,
                  onClick: (se) => ie(Y)
                }, [
                  Y.kind === "image" && T.value[Y.id]?.dataUrl ? (n(), o("img", {
                    key: 0,
                    src: T.value[Y.id].dataUrl,
                    alt: Y.name
                  }, null, 8, Ta)) : (n(), me(O, {
                    key: 1,
                    name: Y.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, l(Y.name), 1),
                    e("small", null, l(Y.kind === "image" ? "照片" : "文件文字") + " · " + l(E(Y.size)), 1)
                  ])
                ], 8, Ra))), 128))
              ])) : k("", !0),
              I.status === "sending" && !I.content ? (n(), o("div", za, [..._[15] || (_[15] = [
                e("span", { class: "vb-loading-ring" }, null, -1),
                e("span", null, "正在回复…", -1)
              ])])) : I.status === "sending" ? (n(), o("p", Oa, [
                N(l(I.content), 1),
                _[16] || (_[16] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : I.status === "failed" ? (n(), o(B, { key: 3 }, [
                I.content ? (n(), o("p", Fa, l(I.content), 1)) : k("", !0),
                e("p", Ba, l(I.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (Y) => Yt(I.id)
                }, [
                  U(O, {
                    name: "activity",
                    size: 14
                  }),
                  _[17] || (_[17] = N("重试这条问题", -1))
                ], 8, Va)
              ], 64)) : I.role !== "assistant" || !g(Dn)(X(I.id)) ? (n(), o("p", qa, l(I.content), 1)) : k("", !0),
              I.role === "assistant" && I.status === "complete" && I.content.trim() ? (n(), me(Wl, {
                key: 5,
                content: I.content,
                question: X(I.id),
                auto: ue.value.at(-1)?.id === I.id,
                onRetry: (Y) => Yt(I.id)
              }, null, 8, ["content", "question", "auto", "onRetry"])) : k("", !0),
              I.status === "complete" ? (n(), o("small", La, [
                N(l($t(I.createdAt)), 1),
                I.role === "assistant" ? (n(), o(B, { key: 0 }, [
                  N(" · " + l(I.model || "DeepSeek"), 1)
                ], 64)) : k("", !0)
              ])) : k("", !0)
            ])
          ], 2))), 128))
        ])) : (n(), o("div", xa, [
          _[13] || (_[13] = e("h2", null, "今天想聊些什么？", -1)),
          _[14] || (_[14] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", Ea, [
            (n(), o(B, null, L(s, (I) => e("button", {
              key: I,
              type: "button",
              onClick: (Y) => Wt(I)
            }, [
              e("span", null, l(I), 1),
              U(O, {
                name: "arrow",
                size: 16
              })
            ], 8, Ua)), 64))
          ]),
          e("small", ja, "饮食参考日期：" + l(p.value), 1)
        ]))
      ], 2),
      e("footer", Ga, [
        e("div", Ja, [
          ue.value.length ? (n(), o("div", Ha, [
            e("details", Ka, [
              e("summary", null, [
                _[18] || (_[18] = N("快捷提问", -1)),
                U(O, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", Wa, [
                (n(), o(B, null, L(s, (I) => e("button", {
                  key: I,
                  type: "button",
                  onClick: (Y) => Wt(I)
                }, [
                  N(l(I), 1),
                  U(O, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, Ya)), 64))
              ])
            ]),
            F.value ? (n(), o("span", Xa, "正在回复，发送新消息可打断")) : k("", !0)
          ])) : k("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: S,
            onDrop: y
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: $,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: g(la),
              "aria-label": "选择照片或文件",
              onChange: te
            }, null, 40, Qa),
            h.value.length ? (n(), o("div", Za, [
              (n(!0), o(B, null, L(h.value, (I) => (n(), o("div", {
                key: I.id,
                class: be(["vb-chat-file", { "is-failed": I.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: I.status !== "ready",
                  "aria-label": "预览附件：" + I.name,
                  onClick: (Y) => ie(I)
                }, [
                  I.value?.dataUrl ? (n(), o("img", {
                    key: 0,
                    src: I.value.dataUrl,
                    alt: I.name
                  }, null, 8, ti)) : (n(), me(O, {
                    key: 1,
                    name: I.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, l(I.name), 1),
                    I.status === "reading" ? (n(), o("small", ni, "正在读取…")) : I.status === "failed" ? (n(), o("small", si, l(I.error), 1)) : (n(), o("small", oi, l(E(I.size)) + " · 待发送", 1))
                  ])
                ], 8, ei),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + I.name,
                  onClick: (Y) => f(I.id)
                }, [
                  U(O, {
                    name: "close",
                    size: 13
                  })
                ], 8, li)
              ], 2))), 128))
            ])) : k("", !0),
            _[21] || (_[21] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            ee(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": _[2] || (_[2] = (I) => b.value = I),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: zn,
              onPaste: J
            }, null, 544), [
              [de, b.value]
            ]),
            e("div", ai, [
              e("div", ii, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: _[3] || (_[3] = (I) => $.value?.click())
                }, [
                  U(O, {
                    name: "paperclip",
                    size: 18
                  }),
                  _[19] || (_[19] = e("span", null, "附件", -1))
                ]),
                _[20] || (_[20] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !b.value.trim() && !w.value,
                onClick: _[4] || (_[4] = (I) => Kt())
              }, [
                U(O, {
                  name: "arrow",
                  size: 16
                }),
                N(l(F.value ? "打断并发送" : "发送"), 1)
              ], 8, ri)
            ])
          ], 32),
          g(_e) && g(es) === "error" ? (n(), o("p", ui, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : k("", !0),
          R.value || D.value ? (n(), o("p", {
            key: 2,
            class: "vb-simple-notice",
            role: R.value ? "alert" : "status"
          }, l(R.value || D.value), 9, di)) : k("", !0),
          e("div", ci, [
            e("details", vi, [
              e("summary", null, [
                U(O, {
                  name: "lock",
                  size: 12
                }),
                _[22] || (_[22] = N("隐私与使用说明", -1))
              ]),
              _[23] || (_[23] = e("div", { class: "vb-simple-privacy-panel" }, [
                e("p", null, "附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。"),
                e("p", null, "选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给 DeepSeek，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。"),
                e("p", null, "点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 DeepSeek 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。"),
                e("p", null, "跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。"),
                e("p", null, "饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。")
              ], -1))
            ]),
            e("span", null, l(b.value.length ? `${b.value.length}/1200` : "AI 内容仅供参考"), 1)
          ])
        ])
      ]),
      x.value ? (n(), me(ot, {
        key: 0,
        title: x.value.name,
        wide: "",
        onClose: _[5] || (_[5] = (I) => x.value = null)
      }, {
        default: st(() => [
          x.value.kind === "image" ? (n(), o("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: x.value.dataUrl,
            alt: x.value.name
          }, null, 8, mi)) : (n(), o("pre", pi, l(x.value.text), 1)),
          e("p", bi, l(x.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : k("", !0)
    ]));
  }
}), fi = /* @__PURE__ */ Pn(gi, [["__scopeId", "data-v-1cc04911"]]), yi = {
  key: 0,
  class: "vb-page-title"
}, hi = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, ki = ["aria-pressed", "onClick"], wi = { class: "vb-glass vb-review-hero" }, $i = { class: "vb-icon-badge vb-large-badge" }, _i = { class: "vb-small-label" }, Ci = { class: "vb-coverage-score" }, Ai = { class: "vb-assessment-grid" }, Ii = { class: "vb-glass vb-coverage-card" }, Si = { class: "vb-section-heading" }, xi = { class: "vb-coverage-list" }, Ei = { class: "vb-food-category-icon" }, Ui = { class: "vb-coverage-name" }, ji = { key: 0 }, Di = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, Pi = { class: "vb-inline-note" }, Ni = { class: "vb-glass vb-suggestion-card" }, Mi = ["checked", "onChange"], Ri = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, Ti = { class: "vb-empty-icon" }, zi = { class: "vb-glass vb-supplement-card" }, Oi = { class: "vb-icon-badge" }, Fi = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const a = t, s = M(a.records[0]?.date || "");
    pe(() => a.records, (b) => {
      b.some(($) => $.date === s.value) || (s.value = b[0]?.date || "");
    });
    const d = G(() => a.records.find((b) => b.date === s.value)), i = (b) => Number(d.value?.foods?.[b]) || 0, u = G(() => Ct.filter((b) => i(b.key) <= 0)), r = G(() => Ct.length - u.value.length), c = G(() => Math.max(1, ...pt.map((b) => i(b.key)))), m = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, v = G(() => (u.value.length ? u.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map((b) => ({ key: b.key, title: m[b.key]?.[0] || (b.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: m[b.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), p = (b) => (a.habits[s.value] || []).includes(b);
    return (b, $) => (n(), o(B, null, [
      t.embedded ? k("", !0) : (n(), o("div", yi, [
        $[4] || ($[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: $[0] || ($[0] = (h) => b.$emit("navigate", "diary"))
        }, [
          U(O, {
            name: "plus",
            size: 17
          }),
          $[3] || ($[3] = N("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (n(), o("div", hi, [
        (n(!0), o(B, null, L(t.records.slice(0, 7), (h) => (n(), o("button", {
          key: h.date,
          class: be({ selected: s.value === h.date }),
          "aria-pressed": s.value === h.date,
          onClick: (T) => s.value = h.date
        }, l(h.date), 11, ki))), 128))
      ])) : k("", !0),
      d.value ? (n(), o(B, { key: 2 }, [
        e("section", wi, [
          e("span", $i, [
            U(O, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", _i, l(d.value.date) + " · 饮食回顾", 1),
            e("h2", null, l(u.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, l(u.value.length ? u.value.map((h) => h.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", Ci, [
            e("strong", null, [
              N(l(r.value), 1),
              e("small", null, " / " + l(g(Ct).length), 1)
            ]),
            $[5] || ($[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", Ai, [
          e("section", Ii, [
            e("div", Si, [
              $[6] || ($[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              U(O, { name: "chart" })
            ]),
            e("div", xi, [
              (n(!0), o(B, null, L(g(pt), (h) => (n(), o("div", {
                key: h.key,
                class: "vb-coverage-row"
              }, [
                e("span", Ei, [
                  U(O, {
                    name: g(yn)[h.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", Ui, [
                  N(l(h.name), 1),
                  h.key === "snacks" ? (n(), o("small", ji, "可选记录")) : k("", !0)
                ]),
                e("span", Di, [
                  e("i", {
                    style: mn({ width: i(h.key) / c.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: be(["vb-coverage-value", { "is-missing": !i(h.key) }])
                }, l(i(h.key) ? `${Math.round(i(h.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", Pi, [
              U(O, {
                name: "info",
                size: 15
              }),
              $[7] || ($[7] = N("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", Ni, [
            $[8] || ($[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (n(!0), o(B, null, L(v.value, (h) => (n(), o("label", {
              key: h.key,
              class: be(["vb-check-row", { done: p(h.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: p(h.key),
                onChange: (T) => b.$emit("toggle-habit", s.value, h.key)
              }, null, 40, Mi),
              e("span", null, [
                e("strong", null, l(h.title), 1),
                e("small", null, l(h.detail), 1)
              ])
            ], 2))), 128)),
            $[9] || ($[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (n(), o("section", Ri, [
        e("span", Ti, [
          U(O, {
            name: "bowl",
            size: 36
          })
        ]),
        $[11] || ($[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        $[12] || ($[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: $[1] || ($[1] = (h) => b.$emit("navigate", "diary"))
        }, [
          $[10] || ($[10] = N("记录今天的饮食", -1)),
          U(O, {
            name: "arrow",
            size: 17
          })
        ])
      ])),
      e("section", zi, [
        e("span", Oi, [
          U(O, {
            name: "shield",
            size: 23
          })
        ]),
        e("div", null, [
          $[13] || ($[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, l(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, l(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: $[2] || ($[2] = (h) => b.$emit("navigate", "about"))
        }, [
          $[14] || ($[14] = N("查看注意事项", -1)),
          U(O, {
            name: "arrow",
            size: 17
          })
        ])
      ])
    ], 64));
  }
}, Bi = {
  key: 0,
  class: "vb-page-title"
}, Vi = { class: "vb-date-input" }, qi = {
  key: 1,
  class: "vb-report-toolbar"
}, Li = { class: "vb-date-input" }, Gi = {
  key: 2,
  class: "vb-report-filter"
}, Ji = {
  key: 3,
  class: "vb-report-list"
}, Hi = { class: "vb-report-card-top" }, Ki = { class: "vb-icon-badge" }, Wi = {
  key: 0,
  class: "vb-feature-error"
}, Yi = {
  key: 1,
  class: "vb-inline-warning"
}, Xi = { class: "vb-report-card-actions" }, Qi = ["onClick"], Zi = ["disabled", "onClick"], er = {
  key: 4,
  class: "vb-glass vb-report-empty"
}, tr = { class: "vb-icon-badge" }, nr = /* @__PURE__ */ We({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = M(""), { isStale: u } = qt(), r = G(() => s.reports.filter((v) => !i.value || v.date === i.value));
    function c(v) {
      return s.records.find((p) => p.date === v.date);
    }
    function m(v) {
      return u(v, c(v), s.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[v.status];
    }
    return (v, p) => (n(), o(B, null, [
      t.embedded ? (n(), o("div", qi, [
        p[5] || (p[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", Li, [
          U(O, {
            name: "calendar",
            size: 18
          }),
          ee(e("input", {
            "onUpdate:modelValue": p[1] || (p[1] = (b) => i.value = b),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [de, i.value]
          ])
        ])
      ])) : (n(), o("div", Bi, [
        p[4] || (p[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", Vi, [
          U(O, {
            name: "calendar",
            size: 18
          }),
          ee(e("input", {
            "onUpdate:modelValue": p[0] || (p[0] = (b) => i.value = b),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [de, i.value]
          ])
        ])
      ])),
      p[9] || (p[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给 DeepSeek；照片和备注不随每日分析发送。", -1)),
      i.value ? (n(), o("div", Gi, [
        e("span", null, l(r.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: p[2] || (p[2] = (b) => i.value = "")
        }, "清除日期筛选")
      ])) : k("", !0),
      r.value.length ? (n(), o("div", Ji, [
        (n(!0), o(B, null, L(r.value, (b) => (n(), o("article", {
          key: b.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", Hi, [
            e("span", Ki, [
              U(O, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, l(b.date), 1),
              e("small", null, l(new Date(b.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: be(["vb-pill", { "needs-update": m(b) === "需更新" }])
            }, l(m(b)), 3)
          ]),
          e("p", null, l(b.result?.summary || b.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          c(b) ? g(u)(b, c(b), t.profile) ? (n(), o("small", Yi, "记录或个人目标已变化，此报告使用的是旧版本。")) : k("", !0) : (n(), o("small", Wi, "对应记录已删除，保留报告快照。")),
          e("div", Xi, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: ($) => d("open", b.date, b.id)
            }, [
              p[6] || (p[6] = N("打开报告", -1)),
              U(O, {
                name: "arrow",
                size: 15
              })
            ], 8, Qi),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: b.status === "pending" || !c(b),
              onClick: ($) => d("retry", b.date)
            }, "重新分析", 8, Zi)
          ])
        ]))), 128))
      ])) : (n(), o("section", er, [
        e("span", tr, [
          U(O, {
            name: "report",
            size: 25
          })
        ]),
        e("h2", null, l(i.value ? "这一天还没有报告" : "从记录第一餐开始"), 1),
        p[8] || (p[8] = e("p", null, "保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: p[3] || (p[3] = (b) => d("navigate", "diary"))
        }, [
          p[7] || (p[7] = N("去记录饮食", -1)),
          U(O, {
            name: "arrow",
            size: 17
          })
        ])
      ]))
    ], 64));
  }
}), sr = { class: "vb-page-title" }, or = {
  class: "vb-assessment-block",
  "aria-labelledby": "diet-assessment-heading"
}, lr = {
  class: "vb-assessment-block vb-assessment-reports",
  "aria-labelledby": "ai-report-heading"
}, ar = /* @__PURE__ */ We({
  __name: "AiNutritionAssessmentPage",
  props: {
    records: {},
    habits: {},
    flags: {},
    reports: {},
    profile: {}
  },
  emits: ["navigate", "toggleHabit", "openReport", "retryReport"],
  setup(t, { emit: a }) {
    const s = a;
    function d(i, u) {
      s("openReport", i, u);
    }
    return (i, u) => (n(), o(B, null, [
      e("div", sr, [
        u[6] || (u[6] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从饮食回顾到 AI 分析"),
          e("h1", null, "营养摄入分析与不足风险提示"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: u[0] || (u[0] = (r) => s("navigate", "diary"))
        }, [
          U(O, {
            name: "plus",
            size: 17
          }),
          u[5] || (u[5] = N("添加饮食记录 ", -1))
        ])
      ]),
      U(Kn, {
        records: t.records,
        profile: t.profile || void 0
      }, null, 8, ["records", "profile"]),
      e("section", or, [
        u[7] || (u[7] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "饮食结构回顾"),
            e("h2", { id: "diet-assessment-heading" }, "食物类别评估")
          ]),
          e("span", { class: "vb-subtle-label" }, "按已保存记录统计")
        ], -1)),
        U(Fi, {
          records: t.records,
          habits: t.habits,
          flags: t.flags,
          embedded: "",
          onNavigate: u[1] || (u[1] = (r) => s("navigate", r)),
          onToggleHabit: u[2] || (u[2] = (r, c) => s("toggleHabit", r, c))
        }, null, 8, ["records", "habits", "flags"])
      ]),
      e("section", lr, [
        u[8] || (u[8] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "每日 AI 分析"),
            e("h2", { id: "ai-report-heading" }, "AI 营养报告")
          ]),
          e("span", { class: "vb-subtle-label" }, "可按日期筛选、查看和重试")
        ], -1)),
        U(nr, {
          reports: t.reports,
          records: t.records,
          profile: t.profile,
          embedded: "",
          onOpen: d,
          onRetry: u[3] || (u[3] = (r) => s("retryReport", r)),
          onNavigate: u[4] || (u[4] = (r) => s("navigate", r))
        }, null, 8, ["reports", "records", "profile"])
      ])
    ], 64));
  }
}), ir = { class: "vb-photo-picker" }, rr = {
  key: 0,
  class: "vb-photo-preview"
}, ur = ["src"], dr = { class: "vb-photo-actions" }, cr = ["disabled"], vr = ["disabled"], mr = {
  key: 1,
  class: "vb-photo-hint",
  role: "status"
}, pr = {
  key: 2,
  class: "vb-photo-error",
  role: "alert"
}, br = ["src"], gr = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: a }) {
    const s = a, d = M(!1), i = M(null), u = M(null), r = M(""), c = M(!1);
    function m(T) {
      return new Promise((x, w) => {
        const C = URL.createObjectURL(T), R = new Image();
        R.onload = () => x({ image: R, url: C }), R.onerror = () => {
          URL.revokeObjectURL(C), w(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, R.src = C;
      });
    }
    function v(T, x) {
      return new Promise((w, C) => T.toBlob((R) => R ? w(R) : C(new Error("图片处理失败，请重新选择。")), "image/jpeg", x));
    }
    function p(T) {
      return new Promise((x, w) => {
        const C = new FileReader();
        C.onload = () => x(C.result), C.onerror = () => w(new Error("图片读取失败，请重新选择。")), C.readAsDataURL(T);
      });
    }
    async function b(T) {
      let x;
      try {
        const w = await createImageBitmap(T);
        x = { image: w, width: w.width, height: w.height, cleanup: () => w.close() };
      } catch {
        const w = await m(T);
        x = { image: w.image, width: w.image.naturalWidth, height: w.image.naturalHeight, cleanup: () => URL.revokeObjectURL(w.url) };
      }
      try {
        const w = Math.min(1, 1200 / Math.max(x.width, x.height)), C = document.createElement("canvas");
        C.width = Math.max(1, Math.round(x.width * w)), C.height = Math.max(1, Math.round(x.height * w));
        const R = C.getContext("2d");
        if (!R) throw new Error("浏览器暂不支持图片预览。");
        R.drawImage(x.image, 0, 0, C.width, C.height);
        let D = await v(C, 0.76);
        if (D.size > 32e4 && (D = await v(C, 0.58)), D.size > 32e4) {
          const P = document.createElement("canvas");
          P.width = Math.round(C.width * 0.75), P.height = Math.round(C.height * 0.75), P.getContext("2d")?.drawImage(C, 0, 0, P.width, P.height), D = await v(P, 0.58);
        }
        return await p(D);
      } finally {
        x.cleanup();
      }
    }
    async function $(T, x) {
      const w = T.target, C = w.files?.[0];
      if (w.value = "", !!C) {
        if (r.value = "", !C.type.startsWith("image/") || C.type === "image/svg+xml") {
          r.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if (C.size > 12 * 1024 * 1024) {
          r.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        c.value = !0;
        try {
          const R = await b(C), D = { name: C.name.slice(0, 100), dataUrl: R, source: x, mime: "image/jpeg" };
          s("update:modelValue", D), s("selected", D);
        } catch (R) {
          r.value = R instanceof Error ? R.message : "无法处理这张图片，请重新选择。";
        } finally {
          c.value = !1;
        }
      }
    }
    function h() {
      r.value = "", s("update:modelValue", null);
    }
    return (T, x) => (n(), o("div", ir, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: x[0] || (x[0] = (w) => $(w, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: u,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: x[1] || (x[1] = (w) => $(w, "本地图片"))
      }, null, 544),
      t.modelValue ? (n(), o("div", rr, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: x[2] || (x[2] = (w) => d.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, ur)
        ]),
        e("span", null, [
          e("strong", null, l(t.modelValue.name), 1),
          e("small", null, l(t.modelValue.source) + " · 点击图片查看大图", 1)
        ]),
        e("button", {
          type: "button",
          class: "vb-icon-button",
          "aria-label": "移除照片",
          onClick: h
        }, [
          U(O, {
            name: "close",
            size: 15
          })
        ])
      ])) : k("", !0),
      e("div", dr, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: c.value,
          onClick: x[3] || (x[3] = (w) => i.value?.click())
        }, [
          U(O, {
            name: "camera",
            size: 17
          }),
          x[6] || (x[6] = N("拍照", -1))
        ], 8, cr),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: c.value,
          onClick: x[4] || (x[4] = (w) => u.value?.click())
        }, [
          U(O, {
            name: "upload",
            size: 17
          }),
          N(l(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, vr)
      ]),
      c.value ? (n(), o("p", mr, "正在准备图片…")) : r.value ? (n(), o("p", pr, l(r.value), 1)) : k("", !0),
      d.value && t.modelValue ? (n(), me(ot, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: x[5] || (x[5] = (w) => d.value = !1)
      }, {
        default: st(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, br)
        ]),
        _: 1
      })) : k("", !0)
    ]));
  }
}, fr = { class: "vb-glass vb-photo-card" }, yr = { class: "vb-aside-heading" }, hr = { class: "vb-photo-badge" }, kr = {
  key: 0,
  class: "vb-feature-error",
  role: "alert"
}, wr = {
  key: 1,
  class: "vb-ai-progress",
  role: "status"
}, $r = {
  key: 2,
  class: "vb-recognition-failed"
}, _r = {
  class: "vb-feature-error",
  role: "alert"
}, Cr = {
  key: 4,
  class: "vb-recognition-results"
}, Ar = { class: "vb-data-note" }, Ir = {
  key: 0,
  class: "vb-recognition-meta"
}, Sr = { key: 0 }, xr = { class: "vb-recognized-list" }, Er = ["value", "disabled", "aria-label", "onInput"], Ur = ["aria-label", "onClick"], jr = {
  key: 0,
  class: "vb-recognition-matches"
}, Dr = ["onClick"], Pr = { class: "vb-recognition-weight" }, Nr = ["onUpdate:modelValue", "disabled", "aria-label"], Mr = {
  key: 1,
  class: "vb-data-note"
}, Rr = { class: "vb-recognition-actions" }, Tr = ["disabled"], zr = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object },
  emits: ["confirm"],
  setup(t, { emit: a }) {
    const s = t, d = a, { state: i } = Bt(), u = M(null), r = M("");
    let c = "";
    const m = G(() => s.draft.recognition), v = G(() => {
      const D = m.value?.generatedAt;
      if (!D) return "";
      const P = new Date(D);
      return Number.isNaN(P.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(P);
    }), p = G(() => m.value?.items?.length && !m.value.confirmed && m.value.items.every((D) => D.name?.trim() && Number.isFinite(Number(D.grams)) && Number(D.grams) >= 0.1 && Number(D.grams) <= 5e3));
    pe(() => [s.draft.date, s.draft.photoId], async ([D, P]) => {
      r.value = "", u.value = null, s.draft.recognition?.status === "pending" && c !== s.draft.recognition.requestId && (s.draft.recognition = { ...s.draft.recognition, status: "failed", error: "上次识别未完成，请重新识别。" });
      try {
        if (P) {
          const F = await vs("photos", P);
          s.draft.date === D && s.draft.photoId === P && (u.value = F || null);
        } else if (s.legacyPhoto?.dataUrl) {
          const F = { ...s.legacyPhoto, id: crypto.randomUUID(), date: D };
          await Mt("photos", F), s.draft.date === D && (s.draft.photoId = F.id, u.value = F);
        }
      } catch (F) {
        r.value = F.message, u.value = s.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function b(D) {
      u.value = D, D || $();
    }
    async function $() {
      const D = s.draft.photoId;
      if (s.draft.photoId = null, s.draft.recognition = null, c = "", D && !i.records.some((P) => P.photoId === D) && !Object.values(i.drafts).some((P) => P.photoId === D)) try {
        await ps("photos", D);
      } catch (P) {
        r.value = P.message;
      }
    }
    async function h(D) {
      const P = s.draft.date, F = crypto.randomUUID();
      r.value = "";
      try {
        const K = { ...D, id: F, date: P, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await Mt("photos", K), s.draft.date !== P) return;
        u.value = K, s.draft.photoId = F, s.draft.recognition = null, await T(K);
      } catch (K) {
        r.value = K.message;
      }
    }
    async function T(D = u.value) {
      if (!D?.dataUrl || m.value?.status === "pending") return;
      const P = s.draft, F = P.photoId, K = crypto.randomUUID();
      c = K, P.recognition = { requestId: K, photoId: F, status: "pending", items: [], error: "", confirmed: !1 };
      try {
        const z = await ht("recognize", { image: D.dataUrl, requestId: F || K });
        if (P.photoId !== F || P.recognition?.requestId !== K) return;
        P.recognition = { ...z, requestId: K, photoId: F, status: "complete", error: "", confirmed: !1 };
      } catch (z) {
        P.photoId === F && P.recognition?.requestId === K && (P.recognition = { ...P.recognition, status: "failed", error: z.message });
      } finally {
        c === K && (c = "");
      }
    }
    function x(D, P) {
      D.name = P.target.value, D.foodId = null;
    }
    function w(D, P) {
      D.foodId = P.key, D.name = P.name;
    }
    function C() {
      s.draft.recognition = { ...s.draft.recognition, status: "complete", recognitionId: s.draft.recognition?.recognitionId || crypto.randomUUID(), items: s.draft.recognition?.items || [], confirmed: !1, error: "", note: s.draft.recognition?.note || "手动补充，请核对名称与份量。" }, s.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function R() {
      p.value && d("confirm", { batchId: m.value.recognitionId, items: m.value.items.map((D) => ({ ...D, estimated: !0, source: "photo" })) });
    }
    return (D, P) => (n(), o("section", fr, [
      e("div", yr, [
        P[2] || (P[2] = e("div", null, [
          e("h2", null, "这一餐的照片"),
          e("p", null, "拍一餐，核对后再记入。")
        ], -1)),
        e("span", hr, [
          U(O, {
            name: "camera",
            size: 16
          })
        ])
      ]),
      P[6] || (P[6] = e("p", { class: "vb-photo-disclosure" }, "选择照片后自动识别：压缩照片会经本地后端发送给 DeepSeek。照片与识别结果保存在当前浏览器。", -1)),
      U(gr, {
        "model-value": u.value,
        "onUpdate:modelValue": b,
        onSelected: h
      }, null, 8, ["model-value"]),
      r.value ? (n(), o("p", kr, l(r.value), 1)) : k("", !0),
      m.value?.status === "pending" ? (n(), o("div", wr, [...P[3] || (P[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : k("", !0),
      m.value?.status === "failed" ? (n(), o("div", $r, [
        e("p", _r, l(m.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: P[0] || (P[0] = (F) => T())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: C
          }, "手动录入")
        ])
      ])) : k("", !0),
      u.value && !m.value ? (n(), o("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: P[1] || (P[1] = (F) => T())
      }, "开始 AI 识别")) : k("", !0),
      m.value?.status === "complete" ? (n(), o("div", Cr, [
        e("p", Ar, l(m.value.note || "请核对食物名称与份量。") + " 照片重量为估算，营养数值只按确认的数据库条目计算。", 1),
        m.value.model ? (n(), o("small", Ir, [
          N("由 " + l(m.value.model) + " 识别", 1),
          v.value ? (n(), o("span", Sr, " · " + l(v.value), 1)) : k("", !0)
        ])) : k("", !0),
        e("div", xr, [
          (n(!0), o(B, null, L(m.value.items, (F, K) => (n(), o("div", {
            key: F.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: F.name,
                disabled: m.value.confirmed,
                "aria-label": "识别食物" + (K + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (z) => x(F, z)
              }, null, 40, Er),
              m.value.confirmed ? k("", !0) : (n(), o("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (K + 1),
                onClick: (z) => m.value.items.splice(K, 1)
              }, [
                U(O, {
                  name: "close",
                  size: 14
                })
              ], 8, Ur))
            ]),
            !F.foodId && !m.value.confirmed ? (n(), o("div", jr, [
              (n(!0), o(B, null, L(g(Ot)(F.name, 3), (z) => (n(), o("button", {
                key: z.key,
                type: "button",
                onClick: (W) => w(F, z)
              }, l(z.name), 9, Dr))), 128))
            ])) : k("", !0),
            e("label", Pr, [
              P[4] || (P[4] = N("估算可食部", -1)),
              ee(e("input", {
                "onUpdate:modelValue": (z) => F.grams = z,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: m.value.confirmed,
                "aria-label": "识别食物" + (K + 1) + "克数",
                placeholder: "克数"
              }, null, 8, Nr), [
                [de, F.grams]
              ]),
              P[5] || (P[5] = N("克", -1))
            ]),
            e("small", {
              class: be({ "vb-unmatched": !F.foodId })
            }, l(F.foodId ? "数据库：" + g(le)[F.foodId]?.state : "未匹配数据库，营养指标暂无数据"), 3),
            e("small", null, l(F.uncertainty), 1)
          ]))), 128))
        ]),
        m.value.items.length ? k("", !0) : (n(), o("p", Mr, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", Rr, [
          m.value.confirmed ? k("", !0) : (n(), o("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: C
          }, "＋补充遗漏食物")),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !p.value,
            onClick: R
          }, l(m.value.confirmed ? "已加入本次选择" : "确认并加入记录"), 9, Tr)
        ])
      ])) : k("", !0)
    ]));
  }
}, Or = { class: "vb-diary-page" }, Fr = { class: "vb-page-title" }, Br = { class: "vb-date-input" }, Vr = ["max"], qr = {
  key: 0,
  class: "vb-diary-grid"
}, Lr = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, Gr = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], Jr = { class: "vb-section-heading" }, Hr = { class: "vb-pill" }, Kr = {
  key: 0,
  class: "vb-selected-list"
}, Wr = {
  key: 1,
  class: "vb-muted-empty"
}, Yr = { class: "vb-section-heading" }, Xr = {
  key: 0,
  class: "vb-history-list"
}, Qr = ["aria-label", "onClick"], Zr = ["onClick"], eu = ["aria-label", "onClick"], tu = {
  key: 1,
  class: "vb-muted-empty"
}, nu = { class: "vb-diary-actions" }, su = ["disabled"], ou = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, lu = { class: "vb-section-heading" }, au = { class: "vb-diary-search-row" }, iu = { class: "vb-search-field" }, ru = { class: "vb-meal-select" }, uu = ["value"], du = {
  key: 0,
  class: "vb-search-results"
}, cu = ["onClick"], vu = {
  key: 0,
  class: "vb-search-empty"
}, mu = { class: "vb-diary-entry-heading" }, pu = {
  key: 1,
  class: "vb-diary-entries"
}, bu = { class: "vb-diary-entry-title" }, gu = ["onClick"], fu = ["onUpdate:modelValue", "aria-label"], yu = ["aria-label", "onClick"], hu = { class: "vb-data-note" }, ku = {
  key: 0,
  class: "vb-pill"
}, wu = { class: "vb-entry-controls" }, $u = ["onUpdate:modelValue", "aria-label"], _u = { class: "vb-entry-meal" }, Cu = ["onUpdate:modelValue"], Au = ["value"], Iu = { key: 0 }, Su = ["onUpdate:modelValue"], xu = ["value"], Eu = {
  key: 0,
  class: "vb-inline-warning"
}, Uu = ["onClick"], ju = {
  key: 2,
  class: "vb-muted-empty"
}, Du = ["onToggle"], Pu = { key: 0 }, Nu = ["onClick"], Mu = ["onClick"], Ru = { class: "vb-field vb-notes-field" }, Tu = { class: "vb-intake-more" }, zu = { key: 0 }, Ou = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: a }) {
    const s = t, d = a, { state: i, ensureDraft: u, addToDraft: r } = Bt(), { isStale: c } = qt(), m = Ze({}), v = Ze({}), p = M(s.initialDate || ke()), b = M(""), $ = M("unspecified"), h = M("selected"), T = M(null), x = M("");
    pe(() => s.initialDate, (X) => {
      X && (p.value = X);
    }), pe(p, (X) => {
      u(X), x.value = "", b.value = "";
    }, { immediate: !0 });
    const w = G(() => i.drafts[p.value]), C = G(() => Qt(w.value?.entries)), R = G(() => Ot(b.value, 8)), D = G(() => s.records.find((X) => X.date === p.value)), P = (X) => s.reports.find((V) => V.date === X), F = /* @__PURE__ */ new Set();
    async function K(X) {
      const V = p.value, E = $e(), ne = $.value, te = V + ":" + X.key;
      if (!F.has(te)) {
        F.add(te);
        try {
          if (await qe(X.key), p.value !== V || $e() !== E) return;
          r({ date: V, foodId: X.key, grams: X.grams || 100, meal: ne }), b.value = "", h.value = "selected";
        } catch (J) {
          x.value = J.message;
        } finally {
          F.delete(te);
        }
      }
    }
    function z() {
      w.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: b.value.trim(), grams: 100, meal: $.value, group: "snacks", source: "manual", referenceConfirmed: !0 }), b.value = "";
    }
    async function W({ items: X, batchId: V }) {
      const E = p.value, ne = $e();
      if (w.value.appliedBatches.includes(V)) return;
      try {
        await qe(X.map((J) => J.foodId));
      } catch (J) {
        x.value = J.message;
        return;
      }
      if (p.value !== E || $e() !== ne || w.value.appliedBatches.includes(V)) return;
      const te = Qt(X.map((J) => ({ ...J, id: crypto.randomUUID(), meal: $.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: ft(le[J.foodId]) })));
      if (te.length !== X.length) {
        x.value = "请核对每项食物名称与克数。";
        return;
      }
      w.value.entries.push(...te), w.value.appliedBatches.push(V), w.value.recognition.confirmed = !0, h.value = "selected";
    }
    function H() {
      if (!s.saving) {
        if (x.value = "", C.value.length !== w.value.entries.length) {
          x.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
          return;
        }
        d("save", JSON.parse(JSON.stringify(w.value)));
      }
    }
    function ue(X) {
      h.value = X, matchMedia("(max-width:950px)").matches && Ee(() => T.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function re(X) {
      const V = ["ArrowRight", "ArrowDown", "End"].includes(X.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(X.key) ? "selected" : null;
      V && (X.preventDefault(), ue(V), Ee(() => document.getElementById("vb-tab-" + V)?.focus()));
    }
    function ye(X) {
      const V = P(X.date);
      return V ? c(V, X, s.profile) ? "报告需更新" : V.status === "pending" ? "分析中" : V.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (X, V) => (n(), o("div", Or, [
      e("div", Fr, [
        V[8] || (V[8] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "一餐一记，慢慢更了解自己"),
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", Br, [
          U(O, {
            name: "calendar",
            size: 18
          }),
          ee(e("input", {
            "onUpdate:modelValue": V[0] || (V[0] = (E) => p.value = E),
            type: "date",
            max: g(ke)(),
            "aria-label": "饮食记录日期"
          }, null, 8, Vr), [
            [de, p.value]
          ])
        ])
      ]),
      w.value ? (n(), o("div", qr, [
        e("aside", Lr, [
          (n(), me(zr, {
            key: p.value,
            draft: w.value,
            "legacy-photo": D.value?.photo,
            onConfirm: W
          }, null, 8, ["draft", "legacy-photo"])),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: re
          }, [
            (n(!0), o(B, null, L([["selected", "本次选择", C.value.length], ["history", "最近记录", t.records.length]], ([E, ne, te]) => (n(), o("button", {
              id: "vb-tab-" + E,
              key: E,
              type: "button",
              role: "tab",
              "aria-selected": h.value === E,
              "aria-controls": "vb-panel-" + E,
              tabindex: h.value === E ? 0 : -1,
              class: be({ selected: h.value === E }),
              onClick: (J) => ue(E)
            }, [
              N(l(ne), 1),
              e("span", null, l(te), 1)
            ], 10, Gr))), 128))
          ], 32),
          h.value === "selected" ? (n(), o("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: T,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", Jr, [
              e("div", null, [
                V[9] || (V[9] = e("h2", null, "本次选择", -1)),
                e("p", null, l(p.value), 1)
              ]),
              e("span", Hr, l(C.value.length) + " 项", 1)
            ]),
            U(zt, {
              entries: C.value,
              compact: ""
            }, null, 8, ["entries"]),
            C.value.length ? (n(), o("div", Kr, [
              (n(!0), o(B, null, L(C.value, (E) => (n(), o("div", {
                key: E.id
              }, [
                e("span", null, [
                  N(l(E.name), 1),
                  e("small", null, l(g(dt).find(([ne]) => ne === E.meal)?.[1]) + l(E.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  N(l(E.grams), 1),
                  V[10] || (V[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (n(), o("p", Wr, "选择食物后，会在这里汇总。"))
          ], 512)) : (n(), o("section", {
            key: 1,
            id: "vb-panel-history",
            ref_key: "asidePanel",
            ref: T,
            class: "vb-glass vb-aside-panel vb-history-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-history",
            tabindex: "0"
          }, [
            e("div", Yr, [
              V[11] || (V[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              U(O, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (n(), o("div", Xr, [
              (n(!0), o(B, null, L(t.records.slice(0, 12), (E) => (n(), o("div", {
                key: E.date,
                class: "vb-history-item vb-history-with-ai"
              }, [
                e("button", {
                  type: "button",
                  "aria-label": `打开 ${E.date} 的饮食记录`,
                  onClick: (ne) => p.value = E.date
                }, [
                  V[12] || (V[12] = e("span", { class: "vb-status-dot" }, null, -1)),
                  e("span", null, [
                    e("strong", null, l(E.date), 1),
                    e("small", null, l(Object.values(E.foods || {}).filter((ne) => Number(ne) > 0).length) + " 类食物", 1)
                  ])
                ], 8, Qr),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (ne) => X.$emit("analysis", E.date)
                }, l(ye(E)), 9, Zr),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + E.date + "的记录",
                  onClick: (ne) => X.$emit("remove", E.date)
                }, [
                  U(O, {
                    name: "close",
                    size: 14
                  })
                ], 8, eu)
              ]))), 128))
            ])) : (n(), o("p", tu, "你的第一天记录，从今天开始。"))
          ], 512)),
          e("div", nu, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving
            }, [
              N(l(t.saving ? "正在保存…" : "保存记录"), 1),
              U(O, {
                name: "arrow",
                size: 17
              })
            ], 8, su),
            D.value ? (n(), o("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: V[1] || (V[1] = (E) => X.$emit("analysis", p.value))
            }, "查看分析")) : k("", !0),
            x.value ? (n(), o("p", ou, l(x.value), 1)) : k("", !0)
          ])
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: Ne(H, ["prevent"])
        }, [
          e("div", lu, [
            V[13] || (V[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: V[2] || (V[2] = (E) => X.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", au, [
            e("label", iu, [
              U(O, {
                name: "search",
                size: 18
              }),
              ee(e("input", {
                "onUpdate:modelValue": V[3] || (V[3] = (E) => b.value = E),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: V[4] || (V[4] = qn(Ne((E) => R.value[0] && K(R.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [de, b.value]
              ])
            ]),
            e("label", ru, [
              V[14] || (V[14] = e("span", null, "添加到", -1)),
              ee(e("select", {
                "onUpdate:modelValue": V[5] || (V[5] = (E) => $.value = E),
                "aria-label": "添加食物的餐次"
              }, [
                (n(!0), o(B, null, L(g(dt), ([E, ne]) => (n(), o("option", {
                  key: E,
                  value: E
                }, l(ne), 9, uu))), 128))
              ], 512), [
                [Ce, $.value]
              ])
            ])
          ]),
          b.value.trim() ? (n(), o("div", du, [
            (n(!0), o(B, null, L(R.value, (E) => (n(), o("button", {
              key: E.key,
              type: "button",
              class: "vb-search-result",
              onClick: (ne) => K(E)
            }, [
              e("span", null, [
                e("strong", null, l(E.name), 1),
                e("small", null, l(E.state) + " · " + l(E.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              U(O, {
                name: "plus",
                size: 17
              })
            ], 8, cu))), 128)),
            R.value.length ? k("", !0) : (n(), o("p", vu, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: z
            }, [
              N("手动添加“" + l(b.value) + "”", 1),
              U(O, {
                name: "plus",
                size: 16
              })
            ])
          ])) : k("", !0),
          e("div", mu, [
            e("h3", null, [
              V[15] || (V[15] = N("已选食物 ", -1)),
              e("small", null, l(w.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: z
            }, "＋手动添加")
          ]),
          w.value.entries.length ? (n(), o("div", pu, [
            (n(!0), o(B, null, L(w.value.entries, (E, ne) => (n(), o("article", {
              key: E.id,
              class: "vb-diary-entry"
            }, [
              e("div", bu, [
                E.foodId ? (n(), o("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (te) => X.$emit("detail", E.foodId)
                }, [
                  N(l(g(kt)(g(le)[E.foodId]) || E.name), 1),
                  U(O, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, gu)) : ee((n(), o("input", {
                  key: 1,
                  "onUpdate:modelValue": (te) => E.name = te,
                  "aria-label": "手动食物" + (ne + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 8, fu)), [
                  [de, E.name]
                ]),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (ne + 1),
                  onClick: (te) => w.value.entries.splice(ne, 1)
                }, [
                  U(O, {
                    name: "close",
                    size: 15
                  })
                ], 8, yu)
              ]),
              e("p", hu, [
                N(l(E.foodId ? g(le)[E.foodId]?.state : "手动条目，暂无营养数据") + l(E.estimated ? " · 份量为估算" : ""), 1),
                E.nutritionSnapshot?.dataType === "ai-estimate" ? (n(), o("span", ku, "含AI估算")) : k("", !0)
              ]),
              U(jn, {
                food: g(le)[E.foodId],
                onChoose: (te) => {
                  E.grams = te, E.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", wu, [
                e("label", null, [
                  V[16] || (V[16] = N("可食部重量", -1)),
                  ee(e("input", {
                    "onUpdate:modelValue": (te) => E.grams = te,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (g(le)[E.foodId]?.name || E.name || "食物") + "克数"
                  }, null, 8, $u), [
                    [de, E.grams]
                  ]),
                  V[17] || (V[17] = e("small", null, "克", -1))
                ]),
                e("label", _u, [
                  V[18] || (V[18] = e("span", null, "餐次", -1)),
                  ee(e("select", {
                    "onUpdate:modelValue": (te) => E.meal = te
                  }, [
                    (n(!0), o(B, null, L(g(dt), ([te, J]) => (n(), o("option", {
                      key: te,
                      value: te
                    }, l(J), 9, Au))), 128))
                  ], 8, Cu), [
                    [Ce, E.meal]
                  ])
                ]),
                E.foodId ? k("", !0) : (n(), o("label", Iu, [
                  V[19] || (V[19] = N("归属类别", -1)),
                  ee(e("select", {
                    "onUpdate:modelValue": (te) => E.group = te
                  }, [
                    (n(!0), o(B, null, L(g(pt), (te) => (n(), o("option", {
                      key: te.key,
                      value: te.key
                    }, l(te.name), 9, xu))), 128))
                  ], 8, Su), [
                    [Ce, E.group]
                  ])
                ]))
              ]),
              E.referenceConfirmed === !1 ? (n(), o("p", Eu, [
                V[20] || (V[20] = N("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                g(le)[E.foodId]?.source ? (n(), o("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (te) => E.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, Uu)) : (n(), o("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: V[6] || (V[6] = (te) => X.$emit("browse"))
                }, "查找具体食物"))
              ])) : k("", !0)
            ]))), 128))
          ])) : (n(), o("p", ju, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (n(!0), o(B, null, L(g(pt), (E) => (n(), o("details", {
            key: E.key,
            class: "vb-diary-food-group",
            onToggle: (ne) => m[E.key] = ne.target.open
          }, [
            e("summary", null, [
              U(O, {
                name: g(yn)[E.key],
                size: 18
              }, null, 8, ["name"]),
              N(l(E.name), 1),
              e("small", null, l(E.items.length) + " 个条目", 1),
              U(O, {
                name: "chevron",
                size: 14
              })
            ]),
            m[E.key] ? (n(), o("div", Pu, [
              (n(!0), o(B, null, L(E.items.slice(0, v[E.key] || 24), ([ne, te]) => (n(), o("button", {
                key: ne,
                type: "button",
                onClick: (J) => K(g(le)[ne])
              }, l(te) + " ＋", 9, Nu))), 128)),
              E.items.length > (v[E.key] || 24) ? (n(), o("button", {
                key: 0,
                type: "button",
                onClick: (ne) => v[E.key] = (v[E.key] || 24) + 24
              }, "再显示24项", 8, Mu)) : k("", !0)
            ])) : k("", !0)
          ], 40, Du))), 128)),
          e("label", Ru, [
            V[21] || (V[21] = N("补充备注 ", -1)),
            V[22] || (V[22] = e("span", null, "可选，不发送给 AI", -1)),
            ee(e("textarea", {
              "onUpdate:modelValue": V[7] || (V[7] = (E) => w.value.notes = E),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [de, w.value.notes]
            ])
          ]),
          e("details", Tu, [
            V[23] || (V[23] = e("summary", null, "查看记录依据", -1)),
            V[24] || (V[24] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (n(!0), o(B, null, L(C.value, (E) => (n(), o("p", {
              key: E.id
            }, [
              N(l(E.name) + "：" + l(E.nutritionSnapshot?.source?.name || E.nutritionSnapshot?.estimate?.model || "原目录数据"), 1),
              E.nutritionSnapshot?.estimate ? (n(), o("span", zu, " · " + l(E.nutritionSnapshot.estimate.assumption), 1)) : k("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : k("", !0)
    ]));
  }
}, Fu = { class: "vb-food-card vb-glass" }, Bu = ["aria-label"], Vu = { class: "vb-food-card-copy" }, qu = { class: "vb-small-label" }, Lu = { key: 0 }, Gu = { key: 0 }, Ju = {
  key: 1,
  class: "vb-food-composition-note"
}, Hu = { class: "vb-food-card-bottom" }, Ku = ["aria-pressed"], cn = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const a = t;
    pe(() => a.food.key, (u) => {
      qe(u).catch(() => {
      });
    }, { immediate: !0 });
    const { photo: s, loading: d, failed: i } = Un(() => a.food);
    return (u, r) => (n(), o("article", Fu, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: r[0] || (r[0] = (c) => u.$emit("detail", t.food.key))
      }, [
        U(Gt, {
          food: t.food,
          photo: g(s),
          loading: g(d),
          failed: g(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", Vu, [
          e("span", qu, l(t.food.categoryName), 1),
          e("h3", null, l(g(kt)(t.food)), 1),
          e("p", null, l(g(Lt)(t.food)), 1),
          t.food.source ? (n(), o("dl", Lu, [
            (n(!0), o(B, null, L(g(Me), (c) => (n(), o("div", {
              key: c.id
            }, [
              e("dt", null, l(c.id === "carbs" ? "碳水" : c.name), 1),
              e("dd", null, [
                N(l(g(xe)(t.food.nutrients[c.id])), 1),
                t.food.nutrients[c.id] != null ? (n(), o("small", Gu, l(c.unit), 1)) : k("", !0)
              ])
            ]))), 128))
          ])) : (n(), o("p", Ju, [
            r[3] || (r[3] = N("按实际配方记录份量", -1)),
            r[4] || (r[4] = e("br", null, null, -1)),
            N(l(g(fn).estimates?.[t.food.key] ? "已保存AI估算 · 查看范围与假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, Bu),
      e("div", Hu, [
        e("span", null, l(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (n(), o("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: be({ selected: t.compared }),
          onClick: r[2] || (r[2] = (c) => u.$emit("compare", t.food.key))
        }, [
          U(O, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          N(l(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, Ku)) : (n(), o("button", {
          key: 0,
          type: "button",
          onClick: r[1] || (r[1] = (c) => u.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, Wu = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), Yu = { class: "vb-food-hub" }, Xu = { class: "vb-page-title" }, Qu = ["aria-expanded"], Zu = { class: "vb-glass vb-food-search-hero" }, ed = { class: "vb-icon-badge" }, td = { class: "vb-food-search-input" }, nd = {
  key: 1,
  class: "vb-food-suggestions"
}, sd = ["onClick"], od = { class: "vb-recommended" }, ld = ["onClick"], ad = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, id = { class: "vb-section-heading" }, rd = {
  key: 0,
  class: "vb-comparison-chips"
}, ud = ["onClick"], dd = { class: "vb-field" }, cd = { class: "vb-ask-bottom" }, vd = ["disabled"], md = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, pd = {
  key: 2,
  class: "vb-ai-answer"
}, bd = {
  key: 0,
  class: "vb-data-note"
}, gd = { class: "vb-answer-foods" }, fd = ["onClick"], yd = { class: "vb-data-note" }, hd = { class: "vb-data-note" }, kd = {
  key: 1,
  class: "vb-compare-bar"
}, wd = ["onClick"], $d = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, _d = { class: "vb-food-results-grid" }, Cd = { class: "vb-section-heading vb-category-heading" }, Ad = { class: "vb-food-category-grid" }, Id = ["onClick"], Sd = ["src", "alt"], xd = { class: "vb-food-results-top" }, Ed = { class: "vb-food-filter" }, Ud = { key: 0 }, jd = ["onClick"], Dd = { key: 1 }, Pd = ["value"], Nd = { class: "vb-food-results-grid" }, Md = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, Rd = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, Td = ["disabled"], zd = ["disabled"], Od = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, Fd = { class: "vb-reference-sample-list" }, Bd = ["onClick"], Vd = { key: 0 }, qd = { class: "vb-food-source-note" }, Ld = ["href"], Gd = ["href"], Jd = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const a = M(""), s = M(""), d = M(""), i = M(""), u = M("relevance"), r = M(1), c = M(!1), m = M([]), v = M(""), p = M(!1), b = M(""), $ = M(!1), h = M(null), T = M(""), x = At, w = new Set(At.map((J) => J.key)), C = new Set(Wn.map((J) => J.key)), R = G(() => s.value ? It(s.value).map((J) => J.food).filter((J) => C.has(J.key) && !w.has(J.key)) : []);
    function D(J, S = He.length) {
      return It(J).map((y) => y.food).filter((y) => w.has(y.key)).slice(0, S);
    }
    const P = G(() => a.value.trim() ? D(a.value, He.length).slice(0, 5) : []), F = (J) => x.filter((S) => S.category === J).length, K = At.length, z = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((J) => {
      const S = It(J).map((y) => y.food).filter((y) => w.has(y.key));
      return S.find((y) => y.source) || S[0];
    }).filter(Boolean).map((J) => [J.key, J])).values()], W = G(() => {
      let J = s.value ? D(s.value) : [...x].sort((S, y) => +!S.source - +!y.source);
      return d.value && (J = J.filter((S) => S.category === d.value)), J;
    }), H = G(() => [...new Set(W.value.map((J) => J.subcategory))]), ue = G(() => {
      let J = W.value.filter((S) => !i.value || S.subcategory === i.value);
      if (u.value !== "relevance") {
        const [S, y] = u.value.split(":");
        J = [...J].sort((f, j) => {
          if (S === "name") return f.name.localeCompare(j.name, "zh");
          const ie = f.nutrients[S], ae = j.nutrients[S];
          return ie == null || ae == null ? +(ie == null) - +(ae == null) : (y === "asc" ? 1 : -1) * (ie - ae);
        });
      }
      return J;
    }), re = G(() => Math.max(1, Math.ceil(ue.value.length / 12))), ye = G(() => ue.value.slice((r.value - 1) * 12, r.value * 12));
    pe([i, u], () => r.value = 1);
    function X(J = a.value) {
      a.value = J.trim(), s.value = a.value, d.value = "", i.value = "", r.value = 1, c.value = !1;
    }
    function V(J) {
      d.value = J, s.value = "", a.value = "", i.value = "", r.value = 1, u.value = "relevance";
    }
    function E() {
      d.value = "", s.value = "", a.value = "", i.value = "", r.value = 1;
    }
    function ne(J) {
      v.value = "", m.value.includes(J) ? m.value = m.value.filter((S) => S !== J) : m.value.length < 2 ? m.value.push(J) : v.value = "每次选择两种食物进行比较。";
    }
    async function te() {
      if (!($.value || !b.value.trim())) {
        $.value = !0, T.value = "", h.value = null;
        try {
          h.value = await ht("ask", { question: b.value.trim(), foodIds: m.value });
        } catch (J) {
          T.value = J.message;
        } finally {
          $.value = !1;
        }
      }
    }
    return (J, S) => (n(), o("div", Yu, [
      e("div", Xu, [
        e("div", null, [
          S[14] || (S[14] = e("p", { class: "vb-eyebrow" }, "从认识食物开始", -1)),
          S[15] || (S[15] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, l(g(K).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": p.value,
          onClick: S[0] || (S[0] = (y) => p.value = !p.value)
        }, [
          U(O, {
            name: "sparkles",
            size: 17
          }),
          S[16] || (S[16] = N("问 AI", -1))
        ], 8, Qu)
      ]),
      e("section", Zu, [
        e("span", ed, [
          U(O, {
            name: "search",
            size: 23
          })
        ]),
        S[19] || (S[19] = e("div", null, [
          e("h2", null, "今天想了解哪一种食物？"),
          e("p", null, "名称、别名都能查。营养数据统一按每 100 克可食部展示。")
        ], -1)),
        e("form", {
          class: "vb-food-search-form",
          onSubmit: S[3] || (S[3] = Ne((y) => X(), ["prevent"]))
        }, [
          e("div", td, [
            U(O, {
              name: "search",
              size: 19
            }),
            ee(e("input", {
              "onUpdate:modelValue": S[1] || (S[1] = (y) => a.value = y),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: S[2] || (S[2] = (y) => c.value = !0)
            }, null, 544), [
              [de, a.value]
            ]),
            a.value ? (n(), o("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: E
            }, [
              U(O, {
                name: "close",
                size: 15
              })
            ])) : k("", !0),
            c.value && P.value.length ? (n(), o("div", nd, [
              (n(!0), o(B, null, L(P.value, (y) => (n(), o("button", {
                key: y.key,
                type: "button",
                onClick: (f) => X(y.name)
              }, [
                N(l(y.name), 1),
                e("small", null, l(y.state), 1)
              ], 8, sd))), 128))
            ])) : k("", !0)
          ]),
          S[17] || (S[17] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", od, [
          S[18] || (S[18] = e("span", null, "推荐搜索", -1)),
          (n(), o(B, null, L(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (y) => e("button", {
            key: y,
            type: "button",
            onClick: (f) => X(y)
          }, l(y), 9, ld)), 64))
        ])
      ]),
      p.value ? (n(), o("section", ad, [
        e("div", id, [
          S[20] || (S[20] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          U(O, { name: "sparkles" })
        ]),
        S[24] || (S[24] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给 DeepSeek。数值来自食物库，AI 负责解释。", -1)),
        m.value.length ? (n(), o("div", rd, [
          (n(!0), o(B, null, L(m.value, (y) => (n(), o("button", {
            key: y,
            type: "button",
            onClick: (f) => ne(y)
          }, l(g(le)[y].name) + " ×", 9, ud))), 128))
        ])) : k("", !0),
        e("form", {
          onSubmit: Ne(te, ["prevent"])
        }, [
          e("label", dd, [
            S[21] || (S[21] = N("你的问题", -1)),
            ee(e("textarea", {
              "onUpdate:modelValue": S[4] || (S[4] = (y) => b.value = y),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [de, b.value]
            ])
          ]),
          e("div", cd, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: S[5] || (S[5] = (y) => b.value = m.value.length === 2 ? "这两种食物的蛋白质有什么区别？" : "100 克香蕉大约有多少热量？")
            }, "填入示例问题"),
            e("button", {
              type: "submit",
              class: "vb-button vb-button-primary",
              disabled: $.value || !b.value.trim()
            }, l($.value ? "正在查询与分析…" : "发送问题"), 9, vd)
          ])
        ], 32),
        T.value ? (n(), o("p", md, l(T.value), 1)) : k("", !0),
        h.value ? (n(), o("div", pd, [
          S[22] || (S[22] = e("h3", null, "数据库数值", -1)),
          h.value.database.length ? k("", !0) : (n(), o("p", bd, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", gd, [
            (n(!0), o(B, null, L(h.value.database, (y) => (n(), o("button", {
              key: y.id,
              type: "button",
              onClick: (f) => J.$emit("detail", y.id)
            }, [
              e("strong", null, l(y.name) + " →", 1),
              e("span", null, l(y.grams) + " 克可食部 · 热量 " + l(g(xe)(y.portion.energy)) + l(y.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + l(g(xe)(y.portion.protein)) + l(y.portion.protein != null ? " g" : ""), 1),
              e("small", null, l(y.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, fd))), 128))
          ]),
          S[23] || (S[23] = e("h3", null, "AI 解释", -1)),
          e("p", null, l(h.value.answer.summary), 1),
          e("p", null, l(h.value.answer.explanation), 1),
          e("p", yd, l(h.value.answer.limitations), 1),
          e("small", hd, l(h.value.model) + " · " + l(new Date(h.value.generatedAt).toLocaleString()), 1)
        ])) : k("", !0)
      ])) : k("", !0),
      m.value.length ? (n(), o("div", kd, [
        e("span", null, "已选 " + l(m.value.length) + " 种食物", 1),
        (n(!0), o(B, null, L(m.value, (y) => (n(), o("button", {
          key: y,
          onClick: (f) => ne(y)
        }, l(g(le)[y].name) + " ×", 9, wd))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: S[6] || (S[6] = (y) => {
            p.value = !0, b.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : k("", !0),
      v.value ? (n(), o("p", $d, l(v.value), 1)) : k("", !0),
      !d.value && !s.value ? (n(), o(B, { key: 3 }, [
        S[26] || (S[26] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物"),
            e("p", null, "从你熟悉的食材开始。")
          ])
        ], -1)),
        e("div", _d, [
          (n(), o(B, null, L(z, (y) => U(cn, {
            key: y.key,
            food: y,
            compared: m.value.includes(y.key),
            onDetail: S[7] || (S[7] = (f) => J.$emit("detail", f)),
            onCompare: ne
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", Cd, [
          e("div", null, [
            S[25] || (S[25] = e("h2", null, "按类别探索", -1)),
            e("p", null, l(g(x).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", Ad, [
          (n(!0), o(B, null, L(g(Yn).filter((y) => F(y.id) > 0), (y) => (n(), o("button", {
            key: y.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: (f) => V(y.id)
          }, [
            e("img", {
              src: y.image,
              alt: y.name + "分类示意图",
              loading: "lazy"
            }, null, 8, Sd),
            e("span", null, [
              e("small", null, l(F(y.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, l(y.name), 1),
              e("em", null, [
                N(l(y.description) + " ", 1),
                U(O, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, Id))), 128))
        ]),
        S[27] || (S[27] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (n(), o(B, { key: 4 }, [
        e("div", xd, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: E
          }, [
            U(O, {
              name: "back",
              size: 15
            }),
            S[28] || (S[28] = N("分类总览", -1))
          ]),
          e("h2", null, l(d.value ? g(Zt)[d.value].name : "“" + s.value + "”的食物照片与营养资料"), 1),
          e("span", null, l(ue.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", Ed, [
          H.value.length <= 10 ? (n(), o("div", Ud, [
            e("button", {
              class: be({ selected: !i.value }),
              onClick: S[8] || (S[8] = (y) => i.value = "")
            }, "全部", 2),
            (n(!0), o(B, null, L(H.value, (y) => (n(), o("button", {
              key: y,
              class: be({ selected: i.value === y }),
              onClick: (f) => i.value = y
            }, l(y), 11, jd))), 128))
          ])) : (n(), o("label", Dd, [
            S[30] || (S[30] = N("筛选", -1)),
            ee(e("select", {
              "onUpdate:modelValue": S[9] || (S[9] = (y) => i.value = y),
              "aria-label": "食物类型筛选"
            }, [
              S[29] || (S[29] = e("option", { value: "" }, "全部类型", -1)),
              (n(!0), o(B, null, L(H.value, (y) => (n(), o("option", {
                key: y,
                value: y
              }, l(y), 9, Pd))), 128))
            ], 512), [
              [Ce, i.value]
            ])
          ])),
          e("label", null, [
            S[32] || (S[32] = N("排序", -1)),
            ee(e("select", {
              "onUpdate:modelValue": S[10] || (S[10] = (y) => u.value = y),
              "aria-label": "食物营养指标排序"
            }, [...S[31] || (S[31] = [
              pn('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [Ce, u.value]
            ])
          ])
        ]),
        e("div", Nd, [
          (n(!0), o(B, null, L(ye.value, (y) => (n(), me(cn, {
            key: y.key,
            food: y,
            compared: m.value.includes(y.key),
            onDetail: S[11] || (S[11] = (f) => J.$emit("detail", f)),
            onCompare: ne
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        ue.value.length ? k("", !0) : (n(), o("div", Md, [
          U(O, {
            name: "search",
            size: 34
          }),
          S[33] || (S[33] = e("h2", null, "没有找到匹配的食物", -1)),
          S[34] || (S[34] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: E
          }, "返回食物总览")
        ])),
        re.value > 1 ? (n(), o("nav", Rd, [
          e("button", {
            disabled: r.value === 1,
            onClick: S[12] || (S[12] = (y) => r.value--)
          }, "上一页", 8, Td),
          e("span", null, "第 " + l(r.value) + " / " + l(re.value) + " 页", 1),
          e("button", {
            disabled: r.value === re.value,
            onClick: S[13] || (S[13] = (y) => r.value++)
          }, "下一页", 8, zd)
        ])) : k("", !0)
      ], 64)),
      s.value && R.value.length ? (n(), o("details", Od, [
        e("summary", null, "其他营养数据样本 · " + l(R.value.length.toLocaleString()) + " 条", 1),
        S[35] || (S[35] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", Fd, [
          (n(!0), o(B, null, L(R.value.slice(0, 80), (y) => (n(), o("button", {
            key: y.key,
            type: "button",
            onClick: (f) => J.$emit("detail", y.key)
          }, [
            e("strong", null, l(y.name), 1),
            e("span", null, l(y.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, Bd))), 128))
        ]),
        R.value.length > 80 ? (n(), o("p", Vd, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : k("", !0)
      ])) : k("", !0),
      e("details", qd, [
        S[36] || (S[36] = e("summary", null, "数据口径与图片署名", -1)),
        S[37] || (S[37] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        S[38] || (S[38] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        S[39] || (S[39] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        S[40] || (S[40] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (n(!0), o(B, null, L(g(Wu), (y) => (n(), o("li", {
            key: y.key
          }, [
            N(l(g(Zt)[y.key]?.name) + "：", 1),
            e("a", {
              href: y.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, l(y.title), 9, Ld),
            N(" · " + l(y.author) + " · ", 1),
            e("a", {
              href: y.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, l(y.license), 9, Gd),
            N(" · " + l(y.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function Hd(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function Kd() {
  const t = M(""), a = M((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), s = M("lunch"), d = M(null), i = M(""), u = M(!1), r = M([]);
  async function c(v, p, b = {}) {
    if (u.value) return;
    i.value = "", d.value = null, u.value = !0, r.value = [];
    const $ = v ? {
      sex: v.sex,
      age: v.age,
      height: v.height,
      weight: v.weight,
      activity: v.activity,
      ageMonths: v.ageMonths,
      physiologicalStage: v.physiologicalStage
    } : null;
    try {
      d.value = await bs({
        goal: t.value.slice(0, 500),
        date: a.value,
        meal: s.value,
        profile: $,
        conditions: b.conditions,
        recordContext: b.recordContext,
        ...p ? {
          personalization: {
            preferences: p.preferences?.slice(0, 200),
            safetyFlags: p.safetyFlags?.slice(0, 4)
          }
        } : {}
      }, (h) => r.value.push(h));
    } catch (h) {
      i.value = Hd(h);
    } finally {
      u.value = !1;
    }
  }
  function m() {
    d.value = null, i.value = "", r.value = [];
  }
  return { goal: t, date: a, meal: s, response: d, error: i, busy: u, progress: r, run: c, clear: m };
}
const Wd = [
  ["花生", "peanut", "peanuts", "groundnut"],
  ["奶", "牛奶", "乳", "乳制品", "奶制品", "dairy", "milk", "cheese", "yogurt", "yoghurt", "cream", "butter"],
  ["蛋", "鸡蛋", "egg", "eggs"],
  ["海鲜", "seafood", "鱼虾蟹贝", "鱼", "虾", "蟹", "贝", "fish", "shrimp", "prawn", "crab", "clam", "oyster", "salmon", "tuna", "cod", "squid", "mussel"],
  ["肉类", "肉", "牛肉", "猪肉", "鸡肉", "羊肉", "禽", "beef", "pork", "chicken", "lamb", "turkey", "duck", "meat"],
  ["香菜", "coriander", "cilantro"],
  ["大豆", "豆制品", "soy", "tofu"],
  ["小麦", "wheat"],
  ["坚果", "nuts", "almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut"]
], Dt = (t, a = 300) => typeof t == "string" ? t.trim().slice(0, a) : "";
function vn(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const a = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (a !== null && (!Number.isFinite(a) || a <= 0 || a > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const s = (Array.isArray(t.avoids) ? t.avoids.join("、") : Dt(t.avoids)).split(/[,，、;；\n]+/).map((u) => u.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (s.length > 12 || s.some((u) => u.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const d = t.availableFoods ?? [];
  if (!Array.isArray(d) || d.length > 12) throw new Error("可选食物最多12项。");
  const i = d.map((u) => {
    const r = le[u?.foodId], c = Number(u?.grams), m = u?.price === null || u?.price === void 0 || u?.price === "" ? null : Number(u.price);
    if (!r || !Number.isFinite(c) || c < 0.1 || c > 5e3 || m !== null && (!Number.isFinite(m) || m < 0 || m > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: r.key, name: r.name, grams: c, price: m };
  });
  if (new Set(i.map((u) => u.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: a, avoids: [...new Set(s)], preferences: Dt(t.preferences, 200), exercise: Dt(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function Mn(t, a = []) {
  const s = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), d = it(s);
  return a.filter((i) => {
    const u = /* @__PURE__ */ new Set([i]);
    for (const r of Wd) if (r.some((c) => it(c) === it(i))) for (const c of r) u.add(c);
    return [...u].some((r) => /^[a-z ]+$/i.test(r) ? new RegExp("\\b" + r.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(s) : d.includes(it(r)));
  });
}
function Yd(t, a) {
  return !!t && !["13", "17"].includes(t.category) && !Mn(t, a.avoids).length && (!a.onlyAvailable || a.availableFoods.some((s) => s.foodId === t.key));
}
function Xd(t, a) {
  const s = t.map((u) => {
    const r = a.availableFoods.find((m) => m.foodId === u.foodId), c = r?.price != null ? Math.round(r.price * u.grams / r.grams * 100) / 100 : null;
    return { foodId: u.foodId, cost: c, priceBasis: r?.price != null ? { price: r.price, grams: r.grams } : null };
  }), d = s.every((u) => u.cost !== null), i = Math.round(s.reduce((u, r) => u + (r.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: a.budget, complete: d, knownSubtotal: i, total: d ? i : null, status: d ? a.budget === null ? "no_budget" : i > a.budget ? "over_budget" : "within_budget" : "unknown", breakdown: s, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: a.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const Qd = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, Zd = { class: "vb-agent-heading" }, ec = { class: "vb-icon-badge" }, tc = { class: "vb-campus-fields" }, nc = ["max", "disabled"], sc = ["disabled"], oc = ["value"], lc = ["disabled"], ac = ["disabled"], ic = { class: "vb-analysis-tabs" }, rc = ["disabled"], uc = ["disabled", "onClick"], dc = { class: "vb-more-conditions" }, cc = { class: "vb-agent-goal" }, vc = ["disabled"], mc = { class: "vb-campus-fields" }, pc = ["disabled"], bc = ["disabled"], gc = { class: "vb-campus-candidates" }, fc = { class: "vb-candidate-search" }, yc = ["disabled"], hc = ["disabled"], kc = ["value"], wc = ["disabled"], $c = { class: "vb-candidate-list" }, _c = ["onUpdate:modelValue", "disabled"], Cc = ["onUpdate:modelValue", "disabled"], Ac = ["disabled", "onClick"], Ic = {
  key: 0,
  class: "vb-agent-context-optin"
}, Sc = ["disabled"], xc = { class: "vb-agent-context-optin" }, Ec = ["disabled"], Uc = { class: "vb-agent-context-optin" }, jc = ["disabled"], Dc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Pc = ["disabled"], Nc = {
  key: 0,
  class: "vb-loading-ring"
}, Mc = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, Rc = { key: 0 }, Tc = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, zc = ["disabled"], Oc = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, Fc = {
  key: 3,
  class: "vb-agent-plan"
}, Bc = { class: "vb-agent-plan-heading" }, Vc = { class: "vb-eyebrow" }, qc = { class: "vb-data-note" }, Lc = { key: 0 }, Gc = { key: 1 }, Jc = { class: "vb-agent-items" }, Hc = { class: "vb-agent-item-title" }, Kc = ["onClick"], Wc = ["onClick"], Yc = {
  key: 0,
  class: "vb-candidate-search"
}, Xc = ["value"], Qc = ["disabled", "onClick"], Zc = { key: 0 }, ev = { class: "vb-agent-grams" }, tv = ["value", "onInput"], nv = { class: "vb-agent-evidence" }, sv = { class: "vb-agent-source" }, ov = ["href"], lv = { key: 1 }, av = { key: 0 }, iv = {
  key: 1,
  class: "vb-agent-notes"
}, rv = {
  key: 2,
  class: "vb-agent-notes is-caution"
}, uv = { class: "vb-agent-trace" }, dv = { class: "vb-agent-confirm" }, cv = ["disabled"], vv = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: a }) {
    const s = t, d = a, { goal: i, date: u, meal: r, response: c, error: m, busy: v, progress: p, run: b, clear: $ } = Kd();
    i.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const h = Ze({ budget: "", avoids: "", preferences: s.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), T = M(-1), x = M(""), w = M(!1), C = M(!0), R = M(!1), D = M(""), P = M(""), F = M(""), K = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], z = G(() => P.value.trim() ? Ot(P.value, 8) : []), W = G(() => et((s.records || []).find((y) => y.date === u.value))), H = G(() => c.value?.status === "ready" ? c.value : null), ue = G(() => (H.value?.plan.items || []).map((y, f) => ({ id: "agent-" + f, foodId: y.foodId, name: y.name, grams: y.grams, meal: y.meal, group: le[y.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), re = G(() => H.value ? Xd(H.value.plan.items, H.value.conditions) : null), ye = G(() => !H.value || !H.value.plan.items.length || re.value?.status === "over_budget" || H.value.plan.items.some((y) => !Number.isFinite(y.grams) || y.grams < 0.1 || y.grams > 5e3));
    pe([i, u, r, h, C, R, () => s.profile, () => s.records], () => {
      !v.value && c.value && $(), w.value = !1;
    }, { deep: !0 }), pe(() => s.preferences, (y) => h.preferences = y || "");
    function X() {
      const y = le[F.value];
      if (D.value = "", !!y) {
        if (h.availableFoods.some((f) => f.foodId === y.key)) {
          D.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (h.availableFoods.length >= 12) {
          D.value = "最多加入12项备选食物。";
          return;
        }
        h.availableFoods.push({ foodId: y.key, name: y.name, grams: 100, price: "" }), F.value = "", P.value = "";
      }
    }
    async function V() {
      D.value = "", w.value = !1;
      let y;
      try {
        await qe(h.availableFoods.map((j) => j.foodId)), y = vn(h);
        const f = y.availableFoods.find((j) => Mn(le[j.foodId], y.avoids).length);
        if (f) throw Error("备选食物“" + f.name + "”命中回避项，请先移除或修改条件。");
      } catch (f) {
        D.value = f.message;
        return;
      }
      await b(s.profile, R.value ? { safetyFlags: (s.flags || []).filter((f) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes(f)) } : void 0, { conditions: y, ...C.value ? { recordContext: { date: u.value, entries: W.value.map((f) => ({ foodId: f.foodId, name: f.name, grams: f.grams, meal: f.meal, referenceConfirmed: f.referenceConfirmed })) } } : {} });
    }
    function E() {
      ye.value || w.value || (w.value = !0, d("confirm", { confirmationId: H.value.confirmationId, date: H.value.date, meal: H.value.meal, items: H.value.plan.items, onResult: (y) => {
        w.value = y.ok, y.ok || (D.value = y.error || "加入草稿失败，请重试。");
      } }));
    }
    function ne(y, f) {
      H.value && (H.value.plan.items[y].grams = Number(f), H.value.plan.items[y].portion = en(le[H.value.plan.items[y].foodId], Number(f)), w.value = !1);
    }
    const te = G(() => {
      let y;
      try {
        y = vn(h);
      } catch {
        return [];
      }
      return (y.availableFoods.length && y.onlyAvailable ? y.availableFoods.map((j) => le[j.foodId]) : He).filter((j) => j && !j.__summary && j.source && Yd(j, y) && !H.value?.plan.items.some((ie) => ie.foodId === j.key)).slice(0, 60);
    });
    function J(y) {
      const f = le[x.value];
      if (!f || !te.value.some((ie) => ie.key === f.key)) return;
      const j = H.value.plan.items[y];
      H.value.plan.items[y] = { ...j, foodId: f.key, name: f.name, portion: en(f, j.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: f.source?.name || "", source: f.source?.id || "", missing: [] }, w.value = !1, T.value = -1, x.value = "";
    }
    const S = (y) => typeof y == "number" && Number.isFinite(y) ? y.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (y, f) => (n(), o("section", Qd, [
      e("header", Zd, [
        e("span", ec, [
          U(O, {
            name: "sparkles",
            size: 21
          })
        ]),
        f[15] || (f[15] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "家庭、外食与食堂 · 有依据的营养决策"),
          e("h2", { id: "meal-agent-title" }, "安排我的下一餐"),
          e("p", null, "说清预算和回避项，结合你的备选食物检索与计算。方案先核对，实际吃过后再记录。")
        ], -1))
      ]),
      e("form", {
        class: "vb-agent-form",
        onSubmit: Ne(V, ["prevent"])
      }, [
        e("div", tc, [
          e("label", null, [
            f[16] || (f[16] = N("日期", -1)),
            ee(e("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (j) => _t(u) ? u.value = j : null),
              type: "date",
              max: g(ke)(),
              disabled: g(v)
            }, null, 8, nc), [
              [de, g(u)]
            ])
          ]),
          e("label", null, [
            f[17] || (f[17] = N("餐次", -1)),
            ee(e("select", {
              "onUpdate:modelValue": f[1] || (f[1] = (j) => _t(r) ? r.value = j : null),
              disabled: g(v)
            }, [
              (n(), o(B, null, L(K, ([j, ie]) => e("option", {
                key: j,
                value: j
              }, l(ie), 9, oc)), 64))
            ], 8, sc), [
              [Ce, g(r)]
            ])
          ]),
          e("label", null, [
            f[18] || (f[18] = N("预算（元，可选）", -1)),
            ee(e("input", {
              "onUpdate:modelValue": f[2] || (f[2] = (j) => h.budget = j),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: g(v)
            }, null, 8, lc), [
              [de, h.budget]
            ])
          ]),
          e("label", null, [
            f[19] || (f[19] = N("不吃的食物", -1)),
            ee(e("input", {
              "onUpdate:modelValue": f[3] || (f[3] = (j) => h.avoids = j),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: g(v)
            }, null, 8, ac), [
              [de, h.avoids]
            ])
          ])
        ]),
        e("div", ic, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: g(v),
            onClick: f[4] || (f[4] = (j) => h.budget = "15")
          }, "预算15元", 8, rc),
          (n(), o(B, null, L(["清淡", "素食偏好"], (j) => e("button", {
            key: j,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: g(v),
            onClick: (ie) => h.preferences = j
          }, l(j), 9, uc)), 64)),
          e("span", null, "已选偏好：" + l(h.preferences || "未设置"), 1)
        ]),
        e("details", dc, [
          f[29] || (f[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", cc, [
            f[20] || (f[20] = e("span", null, "这餐想怎么安排？", -1)),
            ee(e("textarea", {
              "onUpdate:modelValue": f[5] || (f[5] = (j) => _t(i) ? i.value = j : null),
              rows: "2",
              maxlength: "500",
              disabled: g(v),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, vc), [
              [de, g(i)]
            ])
          ]),
          e("div", mc, [
            e("label", null, [
              f[21] || (f[21] = N("口味与饮食偏好", -1)),
              ee(e("input", {
                "onUpdate:modelValue": f[6] || (f[6] = (j) => h.preferences = j),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: g(v)
              }, null, 8, pc), [
                [de, h.preferences]
              ])
            ]),
            e("label", null, [
              f[22] || (f[22] = N("运动情况（可选）", -1)),
              ee(e("input", {
                "onUpdate:modelValue": f[7] || (f[7] = (j) => h.exercise = j),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: g(v)
              }, null, 8, bc), [
                [de, h.exercise]
              ])
            ])
          ]),
          e("details", gc, [
            f[27] || (f[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            f[28] || (f[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", fc, [
              ee(e("input", {
                "onUpdate:modelValue": f[8] || (f[8] = (j) => P.value = j),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: g(v),
                onInput: f[9] || (f[9] = (j) => F.value = "")
              }, null, 40, yc), [
                [de, P.value]
              ]),
              ee(e("select", {
                "onUpdate:modelValue": f[10] || (f[10] = (j) => F.value = j),
                "aria-label": "选择具体食物",
                disabled: g(v) || !z.value.length
              }, [
                f[23] || (f[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (n(!0), o(B, null, L(z.value, (j) => (n(), o("option", {
                  key: j.key,
                  value: j.key
                }, l(j.name), 9, kc))), 128))
              ], 8, hc), [
                [Ce, F.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: g(v) || !F.value,
                onClick: X
              }, "加入备选", 8, wc)
            ]),
            e("div", $c, [
              (n(!0), o(B, null, L(h.availableFoods, (j, ie) => (n(), o("article", {
                key: j.foodId
              }, [
                e("strong", null, l(j.name), 1),
                e("label", null, [
                  f[24] || (f[24] = N("这份可食部（克）", -1)),
                  ee(e("input", {
                    "onUpdate:modelValue": (ae) => j.grams = ae,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: g(v)
                  }, null, 8, _c), [
                    [
                      de,
                      j.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  f[25] || (f[25] = N("这份已知价格（元）", -1)),
                  ee(e("input", {
                    "onUpdate:modelValue": (ae) => j.price = ae,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: g(v)
                  }, null, 8, Cc), [
                    [de, j.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: g(v),
                  onClick: (ae) => h.availableFoods.splice(ie, 1)
                }, "移除", 8, Ac)
              ]))), 128))
            ]),
            h.availableFoods.length ? (n(), o("label", Ic, [
              ee(e("input", {
                "onUpdate:modelValue": f[11] || (f[11] = (j) => h.onlyAvailable = j),
                type: "checkbox",
                disabled: g(v)
              }, null, 8, Sc), [
                [ut, h.onlyAvailable]
              ]),
              f[26] || (f[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : k("", !0)
          ])
        ]),
        e("label", xc, [
          ee(e("input", {
            "onUpdate:modelValue": f[12] || (f[12] = (j) => C.value = j),
            type: "checkbox",
            disabled: g(v)
          }, null, 8, Ec), [
            [ut, C.value]
          ]),
          e("span", null, [
            N("使用所选日期的 " + l(W.value.length) + " 项已记录食物", 1),
            f[30] || (f[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", Uc, [
          ee(e("input", {
            "onUpdate:modelValue": f[13] || (f[13] = (j) => R.value = j),
            type: "checkbox",
            disabled: g(v)
          }, null, 8, jc), [
            [ut, R.value]
          ]),
          f[31] || (f[31] = e("span", null, [
            N("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        f[32] || (f[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给 DeepSeek。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        D.value ? (n(), o("p", Dc, l(D.value), 1)) : k("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: g(v) || !g(i).trim()
        }, [
          g(v) ? (n(), o("span", Nc)) : (n(), me(O, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          N(l(g(v) ? "正在等待真实检索与计算…" : H.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, Pc)
      ], 32),
      g(v) || g(p).length ? (n(), o("div", Mc, [
        e("div", null, [
          e("strong", null, l(g(v) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          g(v) ? (n(), o("p", Rc, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : k("", !0),
          e("ol", null, [
            (n(!0), o(B, null, L(g(p), (j, ie) => (n(), o("li", { key: ie }, [
              e("strong", null, l(j.label), 1),
              N(" · " + l(j.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : k("", !0),
      g(m) ? (n(), o("div", Tc, [
        f[33] || (f[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, l(g(m)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: g(v),
          onClick: V
        }, "保留条件并重试", 8, zc)
      ])) : k("", !0),
      g(c)?.status === "needs_evidence" ? (n(), o("p", Oc, l(g(c).message) + " 请修改备选食物或检索描述。", 1)) : k("", !0),
      H.value ? (n(), o("section", Fc, [
        e("div", Bc, [
          e("div", null, [
            e("p", Vc, "待确认 · " + l(H.value.date) + " · " + l(K.find((j) => j[0] === H.value.meal)?.[1]), 1),
            e("h3", null, l(H.value.plan.title), 1)
          ]),
          f[34] || (f[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        e("p", null, l(H.value.plan.summary), 1),
        e("p", qc, "本次使用 " + l(H.value.contextSummary.itemCount) + " 项已记录食物；" + l(H.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        re.value ? (n(), o("div", {
          key: 0,
          class: be(["vb-campus-cost", { "is-caution": re.value.status === "over_budget" }])
        }, [
          e("h4", null, l(re.value.complete ? "按录入价格估算：约 ¥" + S(re.value.total) : "价格待确认"), 1),
          re.value.budget !== null ? (n(), o("p", Lc, "本餐预算 ¥" + l(re.value.budget) + " · " + l(re.value.status === "within_budget" ? "按已录入价格估算在预算内" : re.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : k("", !0),
          re.value.complete ? k("", !0) : (n(), o("p", Gc, "已知价格小计约 ¥" + l(S(re.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, l(re.value.basis) + "。" + l(re.value.availability) + "。", 1)
        ], 2)) : k("", !0),
        e("div", Jc, [
          (n(!0), o(B, null, L(H.value.plan.items, (j, ie) => (n(), o("article", {
            key: j.foodId,
            class: "vb-agent-item"
          }, [
            e("div", Hc, [
              e("div", null, [
                U(Gt, {
                  food: g(le)[j.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, l(g(kt)(g(le)[j.foodId])), 1),
                e("small", null, l(g(Lt)(g(le)[j.foodId])), 1),
                e("p", null, l(j.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (ae) => {
                  H.value.plan.items.splice(ie, 1), w.value = !1;
                }
              }, "移除", 8, Kc)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (ae) => {
                T.value = ie, x.value = "";
              }
            }, "换一道", 8, Wc),
            T.value === ie ? (n(), o("div", Yc, [
              ee(e("select", {
                "onUpdate:modelValue": f[14] || (f[14] = (ae) => x.value = ae),
                "aria-label": "替换食物"
              }, [
                f[35] || (f[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (n(!0), o(B, null, L(te.value, (ae) => (n(), o("option", {
                  key: ae.key,
                  value: ae.key
                }, l(ae.name), 9, Xc))), 128))
              ], 512), [
                [Ce, x.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !x.value,
                onClick: (ae) => J(ie)
              }, "确认替换", 8, Qc),
              te.value.length ? k("", !0) : (n(), o("p", Zc, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : k("", !0),
            e("label", ev, [
              f[36] || (f[36] = N("可食部估算克数", -1)),
              e("input", {
                value: j.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (ae) => ne(ie, ae.target.value)
              }, null, 40, tv),
              f[37] || (f[37] = N("克", -1))
            ]),
            e("div", nv, [
              (n(), o(B, null, L([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (ae) => e("small", {
                key: ae.id
              }, l(ae.name) + " " + l(S(j.portion[ae.id])) + l(j.portion[ae.id] !== null ? " " + ae.unit : ""), 1)), 64))
            ]),
            e("details", sv, [
              f[39] || (f[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + l(g(le)[j.foodId]?.state), 1),
              e("p", null, [
                f[38] || (f[38] = N("来源：", -1)),
                g(le)[j.foodId]?.source ? (n(), o("a", {
                  key: 0,
                  href: g(le)[j.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, l(j.sourceName) + " · " + l(j.source), 9, ov)) : (n(), o("span", lv, "暂无可核验成分数据"))
              ]),
              e("p", null, l(g(le)[j.foodId]?.source?.description), 1),
              f[40] || (f[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              j.missing.length ? (n(), o("p", av, "缺失指标：" + l(j.missing.join("、")), 1)) : k("", !0)
            ])
          ]))), 128))
        ]),
        U(zt, {
          entries: ue.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        f[45] || (f[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        H.value.plan.suggestions.length ? (n(), o("div", iv, [
          f[41] || (f[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (n(!0), o(B, null, L(H.value.plan.suggestions, (j) => (n(), o("li", { key: j }, l(j), 1))), 128))
          ])
        ])) : k("", !0),
        H.value.plan.cautions.length ? (n(), o("div", rv, [
          f[42] || (f[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (n(!0), o(B, null, L(H.value.plan.cautions, (j) => (n(), o("li", { key: j }, l(j), 1))), 128))
          ])
        ])) : k("", !0),
        e("details", uv, [
          f[43] || (f[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (n(!0), o(B, null, L(H.value.trace, (j, ie) => (n(), o("li", { key: ie }, [
              e("strong", null, l(j.label), 1),
              N(" · " + l(j.inputSummary) + " · " + l(j.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, l(H.value.model) + " · " + l(H.value.dataVersion) + " · " + l(new Date(H.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        U(wn),
        e("div", dv, [
          f[44] || (f[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: w.value || ye.value,
            onClick: E
          }, l(w.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, cv)
        ])
      ])) : k("", !0)
    ]));
  }
}, mv = { class: "vb-page-title" }, pv = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, bv = { class: "vb-glass vb-record-prompt" }, gv = /* @__PURE__ */ We({
  __name: "MealplanPage",
  props: {
    nutrition: {},
    preferences: {},
    flags: {},
    profile: {},
    records: {}
  },
  emits: ["navigate", "add-plan"],
  setup(t) {
    return (a, s) => (n(), o(B, null, [
      e("div", mv, [
        s[4] || (s[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "全年龄段的饮食记录与营养分析"),
          e("h1", null, "膳食方案"),
          e("p", null, "结合身体档案、饮食记录与就餐条件，安排更适合自己的下一餐。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-soft",
          onClick: s[0] || (s[0] = (d) => a.$emit("navigate", "profile"))
        }, "调整档案与饮食偏好")
      ]),
      t.nutrition ? k("", !0) : (n(), o("section", pv, [...s[5] || (s[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      U(vv, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: s[1] || (s[1] = (d) => a.$emit("add-plan", d))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", bv, [
        s[6] || (s[6] = e("div", null, [
          e("h3", null, "从下一餐，回到真实记录"),
          e("p", null, "方案不代表已经吃过；食物、配料、价格与实际份量需要你核对。")
        ], -1)),
        e("button", {
          class: "vb-text-button",
          onClick: s[2] || (s[2] = (d) => a.$emit("navigate", "diary"))
        }, "去记录实际饮食 →"),
        e("button", {
          class: "vb-text-button",
          onClick: s[3] || (s[3] = (d) => a.$emit("navigate", "about"))
        }, "查看参考资料 →")
      ])
    ], 64));
  }
}), fv = { class: "vb-page-title" }, yv = { class: "vb-glass vb-profile-details" }, hv = { class: "vb-section-heading" }, kv = { class: "vb-pill" }, wv = { key: 0 }, $v = { key: 1 }, _v = { class: "vb-profile-settings" }, Cv = { class: "vb-glass" }, Av = { class: "vb-section-heading" }, Iv = { class: "vb-field" }, Sv = ["value"], xv = { class: "vb-glass" }, Ev = { class: "vb-section-heading" }, Uv = ["checked", "onChange"], jv = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String },
  emits: ["edit", "update:flags", "update:preferences"],
  setup(t, { emit: a }) {
    const s = t, d = G(() => Ft.find((c) => c.key === s.profile.activity)), i = a, u = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function r(c, m, v) {
      i("update:flags", m ? [...v, c] : v.filter((p) => p !== c));
    }
    return (c, m) => (n(), o(B, null, [
      e("div", fv, [
        m[3] || (m[3] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "随身体与生活变化，随时更新"),
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: m[0] || (m[0] = (v) => c.$emit("edit"))
        }, [
          U(O, {
            name: "edit",
            size: 17
          }),
          m[2] || (m[2] = N("修改基础档案", -1))
        ])
      ]),
      e("section", yv, [
        e("div", hv, [
          m[4] || (m[4] = e("h2", null, "基础信息", -1)),
          e("span", kv, l(g(_e) ? g(ct) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
        ]),
        e("dl", null, [
          e("div", null, [
            m[5] || (m[5] = e("dt", null, "生理性别", -1)),
            e("dd", null, l(t.profile.sex === "male" ? "男性" : t.profile.sex === "female" ? "女性" : "未填写"), 1)
          ]),
          e("div", null, [
            m[6] || (m[6] = e("dt", null, "年龄", -1)),
            e("dd", null, l(t.profile.age == null || t.profile.age === "" ? "未填写" : `${t.profile.age} 岁`), 1)
          ]),
          t.profile.age === 0 ? (n(), o("div", wv, [
            m[7] || (m[7] = e("dt", null, "月龄", -1)),
            e("dd", null, l(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : k("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (n(), o("div", $v, [
            m[8] || (m[8] = e("dt", null, "生理阶段", -1)),
            e("dd", null, l({ pregnant: "孕期", lactating: "哺乳期", special: "需专业评估" }[t.profile.physiologicalStage]), 1)
          ])) : k("", !0),
          e("div", null, [
            m[9] || (m[9] = e("dt", null, "身高", -1)),
            e("dd", null, l(t.profile.height == null || t.profile.height === "" ? "未填写" : `${t.profile.height} cm`), 1)
          ]),
          e("div", null, [
            m[10] || (m[10] = e("dt", null, "体重", -1)),
            e("dd", null, l(t.profile.weight == null || t.profile.weight === "" ? "未填写" : `${t.profile.weight} kg`), 1)
          ]),
          e("div", null, [
            m[11] || (m[11] = e("dt", null, "每日活动", -1)),
            e("dd", null, l(d.value?.label || "未填写"), 1)
          ]),
          e("div", null, [
            m[12] || (m[12] = e("dt", null, "活动系数", -1)),
            e("dd", null, l(d.value ? "× " + d.value.factor : "未填写"), 1)
          ])
        ])
      ]),
      e("div", _v, [
        e("section", Cv, [
          e("div", Av, [
            m[13] || (m[13] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            U(O, { name: "bowl" })
          ]),
          e("label", Iv, [
            m[14] || (m[14] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: m[1] || (m[1] = (v) => c.$emit("update:preferences", v.target.value))
            }, null, 40, Sv)
          ]),
          m[15] || (m[15] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", xv, [
          e("div", Ev, [
            m[16] || (m[16] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            U(O, { name: "shield" })
          ]),
          (n(), o(B, null, L(u, (v) => e("label", {
            key: v,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(v),
              onChange: (p) => r(v, p.target.checked, t.flags)
            }, null, 40, Uv),
            e("span", null, l(v), 1)
          ])), 64)),
          m[17] || (m[17] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1))
        ])
      ])
    ], 64));
  }
}, Dv = {
  key: 0,
  class: "vb-page-title"
}, Pv = { class: "vb-local-chip" }, Nv = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, Mv = { class: "vb-safety-grid" }, Rv = { class: "vb-icon-badge" }, Tv = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const a = _e.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", s = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + a + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (d, i) => (n(), o(B, null, [
      t.embedded ? k("", !0) : (n(), o("div", Dv, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", Pv, [
          U(O, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = N("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (n(), o("section", Nv, [
        U(O, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + l(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : k("", !0),
      e("div", Mv, [
        (n(), o(B, null, L(s, ([u, r, c]) => e("article", {
          key: r,
          class: "vb-glass"
        }, [
          e("span", Rv, [
            U(O, {
              name: u,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, l(r), 1),
          e("p", null, l(c), 1)
        ])), 64))
      ]),
      U(wn)
    ], 64));
  }
}, zv = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, Ov = { class: "vb-glass vb-submission-hero" }, Fv = { class: "vb-submission-hero-copy" }, Bv = { class: "vb-icon-badge" }, Vv = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, qv = { class: "vb-submission-version" }, Lv = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, Gv = { class: "vb-submission-step-top" }, Jv = { class: "vb-icon-badge" }, Hv = ["onClick"], Kv = { class: "vb-submission-columns" }, Wv = { class: "vb-glass vb-submission-panel" }, Yv = { class: "vb-submission-boundary" }, Xv = { class: "vb-icon-badge" }, Qv = { class: "vb-icon-badge" }, Zv = { class: "vb-icon-badge" }, em = { class: "vb-glass vb-submission-panel" }, tm = { class: "vb-inline-note" }, nm = { class: "vb-glass vb-submission-evidence" }, sm = { class: "vb-submission-evidence-actions" }, om = /* @__PURE__ */ We({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const a = {
      foodCount: He.length,
      sourcedCount: He.filter((d) => !!d.source?.id).length,
      categories: new Set(He.map((d) => d.category).filter(Boolean)).size,
      sourceName: "USDA Standard Reference 28（2016-05）"
    }, s = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (d, i) => (n(), o(B, null, [
      t.embedded ? k("", !0) : (n(), o("div", zv, [
        i[4] || (i[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "在线评审入口 · 维衡 AI"),
          e("h1", null, "把营养建议放回真实的一餐"),
          e("p", null, "从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: i[0] || (i[0] = (u) => d.$emit("navigate", "mealplan"))
        }, [
          U(O, {
            name: "sparkles",
            size: 17
          }),
          i[3] || (i[3] = N("体验餐食规划 ", -1))
        ])
      ])),
      e("section", Ov, [
        e("div", Fv, [
          e("span", Bv, [
            U(O, {
              name: "leaf",
              size: 22
            })
          ]),
          i[5] || (i[5] = e("div", null, [
            e("p", { class: "vb-small-label" }, "项目定位"),
            e("h2", null, "让营养计算有依据，让饮食安排更贴近日常。"),
            e("p", null, "面向全年龄段，以饮食记录和营养摄入计算为核心。记录食物与份量，查看能量、维生素和矿物质的已知合计与参考依据，再结合预算、忌口和偏好安排下一餐。不同年龄按适用条件分析，缺失值不补0。")
          ], -1))
        ]),
        e("div", Vv, [
          e("div", null, [
            e("strong", null, l(a.foodCount), 1),
            i[6] || (i[6] = e("span", null, "食物目录条目", -1))
          ]),
          e("div", null, [
            e("strong", null, l(a.sourcedCount), 1),
            i[7] || (i[7] = e("span", null, "有核验来源", -1))
          ]),
          e("div", null, [
            e("strong", null, l(a.categories), 1),
            i[8] || (i[8] = e("span", null, "食物分类", -1))
          ])
        ]),
        e("small", qv, "数据版本：" + l(g(Xn)) + " · " + l(a.sourceName), 1)
      ]),
      i[19] || (i[19] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("p", { class: "vb-eyebrow" }, "四步完成一条闭环"),
          e("h2", null, "从检索到回顾")
        ]),
        e("span", null, "每一步都可返回核对")
      ], -1)),
      e("section", Lv, [
        (n(), o(B, null, L(s, (u) => e("article", {
          key: u.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", Gv, [
            e("span", null, l(u.number), 1),
            e("span", Jv, [
              U(O, {
                name: u.icon
              }, null, 8, ["name"])
            ])
          ]),
          e("h3", null, l(u.title), 1),
          e("p", null, l(u.copy), 1),
          e("button", {
            class: "vb-text-button",
            onClick: (r) => d.$emit("navigate", u.page)
          }, [
            N(l(u.action), 1),
            U(O, {
              name: "arrow",
              size: 15
            })
          ], 8, Hv)
        ])), 64))
      ]),
      e("div", Kv, [
        e("section", Wv, [
          i[12] || (i[12] = e("p", { class: "vb-eyebrow" }, "职责边界", -1)),
          i[13] || (i[13] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", Yv, [
            e("article", null, [
              e("span", Xv, [
                U(O, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Qv, [
                U(O, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Zv, [
                U(O, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", em, [
          i[15] || (i[15] = pn('<p class="vb-eyebrow">实现与隐私</p><h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>DeepSeek</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 3)),
          e("p", tm, [
            U(O, {
              name: "info",
              size: 16
            }),
            i[14] || (i[14] = N("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", nm, [
        i[18] || (i[18] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "可复核材料"),
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口 mock 测试与真实模型冒烟分开记录，真实调用未执行时不会记作通过。")
        ], -1)),
        e("div", sm, [
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[1] || (i[1] = (u) => d.$emit("navigate", "food"))
          }, [
            U(O, {
              name: "apple",
              size: 16
            }),
            i[16] || (i[16] = N("核对食物来源", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[2] || (i[2] = (u) => d.$emit("navigate", "assessment"))
          }, [
            U(O, {
              name: "report",
              size: 16
            }),
            i[17] || (i[17] = N("查看报告样例", -1))
          ])
        ])
      ])
    ], 64));
  }
}), lm = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], am = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], im = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], rm = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, um = { class: "vb-reference-list" }, dm = ["href"], cm = {
  key: 1,
  class: "vb-data-note"
}, vm = { class: "vb-reference-terms" }, mm = {
  __name: "ReferencePanel",
  setup(t) {
    return (a, s) => (n(), o("section", rm, [
      s[8] || (s[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      s[9] || (s[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      s[10] || (s[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", um, [
        (n(!0), o(B, null, L(g(lm), (d) => (n(), o("details", {
          key: d.id
        }, [
          e("summary", null, [
            e("strong", null, l(d.title), 1),
            e("span", null, l(d.status), 1)
          ]),
          e("dl", null, [
            e("div", null, [
              s[0] || (s[0] = e("dt", null, "用途与版本", -1)),
              e("dd", null, l(d.kind) + " · " + l(d.version) + " · " + l(d.volume), 1)
            ]),
            e("div", null, [
              s[1] || (s[1] = e("dt", null, "条目定位", -1)),
              e("dd", null, l(d.locator), 1)
            ]),
            e("div", null, [
              s[2] || (s[2] = e("dt", null, "适用范围", -1)),
              e("dd", null, l(d.scope), 1)
            ]),
            e("div", null, [
              s[3] || (s[3] = e("dt", null, "原始单位", -1)),
              e("dd", null, l(d.units), 1)
            ])
          ]),
          d.url ? (n(), o("a", {
            key: 0,
            href: d.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "核对公开来源 ↗", 8, dm)) : (n(), o("p", cm, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", vm, [
        s[4] || (s[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (n(!0), o(B, null, L(g(im), ([d, i, u]) => (n(), o("p", { key: d }, [
          e("strong", null, l(d) + " · " + l(i), 1),
          N("：" + l(u), 1)
        ]))), 128)),
        s[5] || (s[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        s[6] || (s[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (n(!0), o(B, null, L(g(am), (d) => (n(), o("li", { key: d }, l(d), 1))), 128))
        ]),
        s[7] || (s[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, pm = { class: "vb-page-title" }, bm = { class: "vb-local-chip" }, gm = { "aria-labelledby": "about-project-heading" }, fm = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, ym = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, hm = {
  key: 0,
  role: "alert"
}, km = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, wm = { class: "vb-reset-actions" }, $m = ["disabled"], _m = ["disabled"], Cm = /* @__PURE__ */ We({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const a = M(!1), s = M(!1), d = M("");
    function i() {
      try {
        const r = JSON.parse(we.getItem("weiheng.local.v2") || "{}"), c = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: r.profile || null, records: (Array.isArray(r.records) ? r.records : []).map((p) => ({ date: p.date, entries: p.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, m = URL.createObjectURL(new Blob([JSON.stringify(c, null, 2)], { type: "application/json" })), v = document.createElement("a");
        v.href = m, v.download = "维衡-当前档案与食物记录.json", v.click(), setTimeout(() => URL.revokeObjectURL(m), 1e3);
      } catch {
        d.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function u() {
      if (!s.value) {
        s.value = !0, d.value = "";
        try {
          await us(), window.location.reload();
        } catch {
          d.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", s.value = !1;
        }
      }
    }
    return (r, c) => (n(), o(B, null, [
      e("div", pm, [
        c[5] || (c[5] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "项目介绍 · 使用边界 · 隐私说明"),
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", bm, [
          c[4] || (c[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          N(l(g(_e) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", gm, [
        c[6] || (c[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "作品说明"),
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ]),
          e("span", null, "功能流程与实现依据")
        ], -1)),
        U(om, {
          embedded: "",
          onNavigate: c[0] || (c[0] = (m) => r.$emit("navigate", m))
        })
      ]),
      U(mm),
      e("section", fm, [
        c[7] || (c[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "安全中心"),
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ]),
          e("span", null, "把营养信息作为参考")
        ], -1)),
        U(Tv, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", ym, [
        e("div", null, [
          c[8] || (c[8] = e("p", { class: "vb-eyebrow" }, "当前使用空间的数据管理", -1)),
          c[9] || (c[9] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, l(g(_e) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          c[10] || (c[10] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          d.value ? (n(), o("p", hm, l(d.value), 1)) : k("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: c[1] || (c[1] = (m) => a.value = !0)
        }, "清空数据并重置")
      ]),
      a.value ? (n(), me(ot, {
        key: 0,
        title: g(_e) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: c[3] || (c[3] = (m) => !s.value && (a.value = !1))
      }, {
        default: st(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + l(g(_e) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          c[11] || (c[11] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          d.value ? (n(), o("p", km, l(d.value), 1)) : k("", !0),
          e("div", wm, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: s.value,
              onClick: c[2] || (c[2] = (m) => a.value = !1)
            }, "取消", 8, $m),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: s.value,
              onClick: u
            }, l(s.value ? "正在清理…" : "确认清空并重置"), 9, _m)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : k("", !0)
    ], 64));
  }
}), Am = ["data-theme"], Im = ["inert"], Sm = { class: "vb-main" }, xm = { class: "vb-topbar" }, Em = { class: "vb-breadcrumb" }, Um = { class: "vb-topbar-actions" }, jm = { class: "vb-local-chip" }, Dm = ["aria-label"], Pm = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, Nm = { class: "vb-footer" }, Mm = {
  key: 4,
  class: "vb-toast",
  role: "status"
}, Fm = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: a, theme: s, nutrition: d, records: i, storageError: u, updateProfile: r, saveRecord: c, addToDraft: m, addPlanToDraft: v, toggleHabit: p } = Bt(), { toggleTheme: b } = os(s), { reports: $, reportStorageError: h, loadReports: T, latestReport: x, isStale: w, generateReport: C } = qt();
    T();
    const R = t, D = G(() => a.flags.includes("孕期或哺乳期") ? { ...a.profile, physiologicalStage: "special" } : a.profile || {}), P = M(R.initialPage), F = M(R.initialEditor), K = M(!1), z = M(null), W = M(null), H = M(null), ue = M(ke()), re = M(!1), ye = M(""), X = M(""), V = M(""), E = G(() => $.value.find((Z) => Z.id === X.value) || x(ye.value)), ne = G(() => a.records.find((Z) => Z.date === ye.value)), te = { overview: "概览", dietAssistant: "维衡AI助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, J = G(() => _e.value ? ct.value === "error" ? "账号同步暂不可用 · 本机副本保留" : ct.value === "syncing" || ct.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let S, y = 0;
    function f(Z, q = null) {
      clearTimeout(S), z.value = { message: Z, undo: q }, S = setTimeout(() => z.value = null, 7e3);
    }
    function j(Z) {
      P.value = Z, window.scrollTo({ top: 0, behavior: "auto" }), Ee(() => W.value?.focus({ preventScroll: !0 }));
    }
    function ie() {
      F.value = !1, K.value = !0;
    }
    function ae() {
      K.value = !1;
    }
    function lt(Z) {
      const q = r(Z);
      if (q) {
        f(q);
        return;
      }
      F.value = !1, j("overview"), f(_e.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function Ue(Z, q = !1) {
      const oe = ++y;
      V.value = "", ye.value = Z.date, X.value = "";
      try {
        const he = C(Z, D.value, { force: q });
        await Ee();
        const $t = await he;
        oe === y && ye.value === Z.date && (X.value = $t?.id || "");
      } catch (he) {
        oe === y && (V.value = he.message || "分析暂时不可用，请重试。");
      }
    }
    function Ye(Z) {
      if (!re.value) {
        re.value = !0;
        try {
          const q = c(Z);
          if (!q.ok) {
            f(q.error);
            return;
          }
          f("饮食记录已保存，正在分析"), Ue(q.record);
        } finally {
          re.value = !1;
        }
      }
    }
    function Ge(Z, q) {
      q ? $.value.find((he) => he.id === q) : x(Z), ye.value = Z, X.value = q || "", V.value = "", a.records.find((he) => he.date === Z);
    }
    function Je(Z = ye.value) {
      const q = a.records.find((oe) => oe.date === Z);
      q && Ue(q, !0);
    }
    function je(Z) {
      if (!Be(Z.date) || Z.date > ke() || Number(Z.grams) < 0.1 || Number(Z.grams) > 5e3) {
        f("请核对日期与食用克数。");
        return;
      }
      const q = m(Z);
      ue.value = Z.date, H.value = null, j("diary"), f(q ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    async function Ae(Z) {
      const q = $e();
      try {
        if (await qe(Z.items.map((he) => he.foodId)), q !== $e()) return;
      } catch (he) {
        Z.onResult?.({ ok: !1, error: he.message }), f(he.message);
        return;
      }
      const oe = v(Z);
      if (Z.onResult?.(oe), !oe.ok) {
        f(oe.error);
        return;
      }
      ue.value = Z.date, j("diary"), f(oe.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function wt(Z) {
      const q = a.records.find((oe) => oe.date === Z);
      q && (a.records = a.records.filter((oe) => oe.date !== Z), f("这条饮食记录已删除，报告快照仍保留。", () => {
        c(q), z.value = null;
      }));
    }
    return Ke(() => clearTimeout(S)), (Z, q) => (n(), o("div", {
      class: be(["vb-app", { "is-diary": P.value === "diary", "is-chat": P.value === "dietAssistant" }]),
      "data-theme": g(s)
    }, [
      e("div", {
        inert: F.value || H.value || ye.value || void 0
      }, [
        U(ls, {
          active: P.value,
          onNavigate: j
        }, null, 8, ["active"]),
        e("div", Sm, [
          e("header", xm, [
            e("span", Em, [
              q[15] || (q[15] = e("span", null, "营养工作台", -1)),
              q[16] || (q[16] = e("i", null, "/", -1)),
              N(l(te[P.value]), 1)
            ]),
            e("div", Um, [
              e("span", jm, [
                q[17] || (q[17] = e("i", { class: "vb-status-dot" }, null, -1)),
                N(l(J.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                onClick: ie
              }, l(g(_e) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": g(s) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: q[0] || (q[0] = (...oe) => g(b) && g(b)(...oe))
              }, [
                U(O, {
                  name: g(s) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, Dm),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: q[1] || (q[1] = (oe) => j("profile"))
              }, [
                U(O, {
                  name: "person",
                  size: 18
                })
              ])
            ])
          ]),
          e("main", {
            ref_key: "content",
            ref: W,
            class: "vb-content",
            tabindex: "-1"
          }, [
            g(u) || g(h) ? (n(), o("p", Pm, l(g(u) || g(h)), 1)) : k("", !0),
            (n(), o(B, { key: 1 }, [
              ee(U(fi, {
                records: g(a).records,
                targets: g(d),
                profile: D.value
              }, null, 8, ["records", "targets", "profile"]), [
                [Ln, P.value === "dietAssistant"]
              ]),
              P.value === "overview" ? (n(), me(as, {
                key: 0,
                profile: D.value,
                nutrition: g(d),
                "record-count": g(i).length,
                records: g(i),
                onEdit: q[2] || (q[2] = (oe) => F.value = !0),
                onNavigate: j
              }, null, 8, ["profile", "nutrition", "record-count", "records"])) : k("", !0),
              P.value === "assessment" ? (n(), me(ar, {
                key: 1,
                records: g(i),
                habits: g(a).habits,
                flags: g(a).flags,
                reports: g($),
                profile: D.value,
                onNavigate: j,
                onToggleHabit: g(p),
                onOpenReport: Ge,
                onRetryReport: Je
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : P.value === "diary" ? (n(), me(Ou, {
                key: 2,
                records: g(i),
                reports: g($),
                profile: D.value,
                nutrition: g(d),
                "initial-date": ue.value,
                saving: re.value,
                onSave: Ye,
                onRemove: wt,
                onAnalysis: Ge,
                onBrowse: q[3] || (q[3] = (oe) => j("food")),
                onDetail: q[4] || (q[4] = (oe) => H.value = g(le)[oe])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving"])) : P.value === "food" ? (n(), me(Jd, {
                key: 3,
                onDetail: q[5] || (q[5] = (oe) => H.value = g(le)[oe])
              })) : P.value === "mealplan" ? (n(), me(gv, {
                key: 4,
                nutrition: g(d),
                preferences: g(a).preferences,
                flags: g(a).flags,
                profile: D.value,
                records: g(a).records,
                onNavigate: j,
                onAddPlan: Ae
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : P.value === "profile" ? (n(), me(jv, {
                key: 5,
                profile: D.value,
                nutrition: g(d),
                flags: g(a).flags,
                "onUpdate:flags": q[6] || (q[6] = (oe) => g(a).flags = oe),
                preferences: g(a).preferences,
                "onUpdate:preferences": q[7] || (q[7] = (oe) => g(a).preferences = oe),
                onEdit: q[8] || (q[8] = (oe) => F.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences"])) : P.value === "about" ? (n(), me(Cm, {
                key: 6,
                flags: g(a).flags,
                onNavigate: j
              }, null, 8, ["flags"])) : k("", !0)
            ], 64)),
            e("footer", Nm, [
              U(O, {
                name: "leaf",
                size: 14
              }),
              q[18] || (q[18] = N("维衡 AI · 把健康，放进每一餐", -1)),
              q[19] || (q[19] = e("span", null, "营养信息仅供一般参考", -1))
            ])
          ], 512)
        ])
      ], 8, Im),
      F.value ? (n(), me(to, {
        key: 0,
        profile: g(a).profile,
        onComplete: lt,
        onClose: q[9] || (q[9] = (oe) => F.value = !1),
        onLogin: ie
      }, null, 8, ["profile"])) : k("", !0),
      K.value ? (n(), me(is, {
        key: 1,
        onClose: ae
      })) : k("", !0),
      H.value ? (n(), me(Xo, {
        key: 2,
        "food-id": H.value.key,
        onClose: q[10] || (q[10] = (oe) => H.value = null),
        onAdd: je
      }, null, 8, ["food-id"])) : k("", !0),
      ye.value ? (n(), me(jl, {
        key: 3,
        report: E.value,
        record: ne.value,
        stale: E.value ? g(w)(E.value, ne.value, D.value) : !1,
        error: V.value,
        onClose: q[11] || (q[11] = (oe) => {
          ye.value = "", X.value = "";
        }),
        onRetry: q[12] || (q[12] = (oe) => Je())
      }, null, 8, ["report", "record", "stale", "error"])) : k("", !0),
      z.value ? (n(), o("div", Mm, [
        U(O, {
          name: "check",
          size: 17
        }),
        e("span", null, l(z.value.message), 1),
        z.value.undo ? (n(), o("button", {
          key: 0,
          onClick: q[13] || (q[13] = (...oe) => z.value.undo && z.value.undo(...oe))
        }, "撤销")) : k("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: q[14] || (q[14] = (oe) => z.value = null)
        }, [
          U(O, {
            name: "close",
            size: 15
          })
        ])
      ])) : k("", !0)
    ], 10, Am));
  }
};
export {
  Fm as default
};
