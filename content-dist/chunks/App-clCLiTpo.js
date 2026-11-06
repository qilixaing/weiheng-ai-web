import { r as M, a as G, b as Ze, w as de, o as s, d as o, e, F, f as L, n as gn, g as pe, h as yt, i as U, j as $, k as De, t as a, l as me, m as te, v as ue, p as P, u as g, q as Ce, s as Ee, x as Ve, y as Hn, z as st, A as Je, B as dt, C as Kn, D as fn, E as It, G as Wn } from "./vue-runtime-wiGxZMXT.js";
import { v as Fe, t as ke, F as ae, c as ht, r as et, n as Yn, m as Xn, a as Rt, e as qe, b as yn, d as hn, M as Pe, f as Ft, s as kn, g as ct, h as en, N as Qn, i as xe, _ as Bt, C as St, G as wn, j as bt, k as Zn, l as Vt, o as tn, P as xt, R as es, p as Et, q as ts, u as nn, A as Ge, w as rt, x as sn, y as ns } from "./IntakeAnalysis-m4e3acVu.js";
import { s as tt, a as _e, o as ss, b as we, t as $n, c as os, d as $e, e as ls, f as as, g as is, h as vt } from "./main-D0cQsrir.js";
import { v as nt, A as qt, c as _n, _ as z, p as rs, a as Cn, u as us, b as ds, d as cs, e as vs } from "./useThemeTransition-CkarilED.js";
function ms(t, l) {
  if (!l || !Fe(l.date) || l.date > ke() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(l.meal) || !Array.isArray(l.items) || !l.items.length || l.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const n = String(l.confirmationId || "").slice(0, 100);
  if (!n) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(n)) return { draft: t, duplicate: !0 };
  const d = l.items.map((i) => {
    const u = ae[i.foodId], r = Number(i.grams);
    if (!u || !Number.isFinite(r) || r < 0.1 || r > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: n + ":" + u.key, foodId: u.key, name: u.name, grams: r, meal: l.meal, group: u.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: ht(u) };
  });
  if (new Set(d.map((i) => i.foodId)).size !== d.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...d], appliedBatches: [...t.appliedBatches || [], n] }, duplicate: !1 };
}
const Qe = tt("weiheng.reset-signal.v1"), An = (t) => ss(t);
let Be = !1;
const Le = () => Be;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== Qe || !t.newValue))
    try {
      const { phase: l } = JSON.parse(t.newValue);
      l === "begin" && (Be = !0), l === "abort" && (Be = !1), l === "done" && (Be = !0, window.location.reload());
    } catch {
    }
});
function on(t, l) {
  return new Promise((n, d) => {
    const i = t.open(l);
    i.onerror = i.onblocked = () => d(new Error("本地文件存储暂时无法清理，请关闭其他旧页面后重试。")), i.onsuccess = () => {
      const u = i.result, r = Array.from(u.objectStoreNames);
      if (!r.length) {
        u.close(), n();
        return;
      }
      try {
        const c = u.transaction(r, "readwrite");
        for (const m of r) c.objectStore(m).clear();
        c.oncomplete = () => {
          u.close(), n();
        }, c.onerror = c.onabort = () => {
          u.close(), d(new Error("本地文件清理未完成，请重试。"));
        };
      } catch (c) {
        u.close(), d(c);
      }
    };
  });
}
function ln(t, l = !1) {
  const n = Array.from({ length: t.length }, (d, i) => t.key(i));
  for (const d of n) d && An(d) && !(l && d === Qe) && t.removeItem(d);
}
async function ps({
  local: t = globalThis.localStorage,
  session: l = globalThis.sessionStorage,
  databases: n = globalThis.indexedDB,
  caches: d = globalThis.caches
} = {}) {
  if (Be) throw new Error("正在清理本地数据，请稍候。");
  Be = !0;
  const i = (u) => t.setItem(Qe, JSON.stringify({ phase: u, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), _e.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!n) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      on(n, tt("weiheng.media.v1")),
      on(n, tt("weiheng.chat-attachments.v1"))
    ]), d) for (const u of await d.keys()) An(u) && await d.delete(u);
    l && ln(l), ln(t, !0), i("done"), t.removeItem(Qe);
  } catch (u) {
    try {
      i("abort"), t.removeItem(Qe);
    } catch {
    }
    throw Be = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), u;
  }
}
const gt = "weiheng.local.v2", In = "weiheng.theme.v1", ze = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function an(t) {
  if (!t) return null;
  const l = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", n = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), d = qt.some((u) => u.key === t.activity) ? t.activity : n[String(t.activity)] || "";
  if (nt({ ...t, sex: l, activity: d })) return null;
  const i = { ...t, sex: l, age: ze(t.age), height: ze(t.height), weight: ze(t.weight), activity: d };
  return nt(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    l
  ), activity: String(d) };
}
function Sn() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const l = JSON.parse(we.getItem(gt) || "null");
    if (l && typeof l == "object") {
      for (const i of [...Array.isArray(l.records) ? l.records : [], ...Object.values(l.drafts || {})]) for (const u of Array.isArray(i?.entries) ? i.entries : []) u.foodId === "cabbage" && u.name === "白菜" && (u.referenceConfirmed = !1);
      return { ...t, ...l, drafts: l.drafts && typeof l.drafts == "object" ? l.drafts : {}, profile: an(l.profile), records: Array.isArray(l.records) ? l.records : [] };
    }
    const n = JSON.parse(we.getItem("vitabalance.v1") || we.getItem("vitabalance.guest.v1") || "null"), d = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return n ? { ...t, profile: an(n.profile), records: Array.isArray(n.records) ? n.records : [], plans: Array.isArray(n.plans) ? n.plans : [], flags: d.filter(([i]) => n.profile?.[i]).map(([, i]) => i), preferences: [n.profile?.avoid, n.profile?.allergies ? "需要核对的过敏或不耐受项：" + n.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const ce = Ze(Sn()), Oe = M("");
let Tt = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  Tt = !0;
  try {
    Object.assign(ce, Sn());
  } finally {
    Tt = !1;
  }
});
const bs = (() => {
  try {
    return we.getItem(In);
  } catch {
    return null;
  }
})(), xn = M(bs === "dark" ? "dark" : "light"), mt = G(() => _n(ce.flags.includes("孕期或哺乳期") ? null : ce.profile));
de(ce, () => {
  if (!(Le() || Tt))
    try {
      we.setItem(gt, JSON.stringify({ ...ce, calculated: mt.value })), Oe.value = "";
    } catch {
      Oe.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
de(xn, (t) => {
  if (!Le())
    try {
      we.setItem(In, t);
    } catch {
      Oe.value = "主题偏好暂时无法保存。";
    }
});
function Lt() {
  const t = G(() => [...ce.records].sort((c, m) => m.date.localeCompare(c.date)));
  function l(c) {
    const m = nt(c);
    return m || (ce.profile = { ...ce.profile, sex: c.sex || "", ageMonths: ze(c.ageMonths), physiologicalStage: c.physiologicalStage || "general", age: ze(c.age), height: ze(c.height), weight: ze(c.weight), activity: c.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function n(c) {
    if (Le()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Fe(c.date)) return { ok: !1, error: "请选择有效日期。" };
    const m = ce.records.find((b) => b.date === c.date), v = Array.isArray(c.entries) ? Xn(c, m) : (
      /** @type {DailyRecord} */
      { ...c, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (m && Rt(m) === Rt(v)) return { ok: !0, record: m, unchanged: !0 };
    const p = [...ce.records.filter((b) => b.date !== v.date), v];
    try {
      we.setItem(gt, JSON.stringify({ ...ce, records: p, calculated: mt.value }));
    } catch {
      return Oe.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: Oe.value };
    }
    return ce.records = p, { ok: !0, record: v };
  }
  function d(c) {
    if (!Fe(c)) return null;
    if (!ce.drafts[c]) {
      const m = ce.records.find((v) => v.date === c);
      ce.drafts[c] = { date: c, entries: et(m), notes: m?.notes || "", photoId: m?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return ce.drafts[c];
  }
  function i(c) {
    const m = d(c.date);
    if (!m) return !1;
    const v = ae[c.foodId || ""];
    return m.entries.push({ id: crypto.randomUUID(), foodId: c.foodId || null, name: v?.name || c.name || "", grams: Number(c.grams), meal: c.meal || "unspecified", group: c.group, source: c.source || "catalogue", estimated: !!c.estimated, referenceConfirmed: !0, nutritionSnapshot: Yn(c.nutritionSnapshot, v?.key) || ht(v) }), !Oe.value;
  }
  function u(c, m) {
    const v = new Set(ce.habits[c] || []);
    v.has(m) ? v.delete(m) : v.add(m), ce.habits[c] = [...v];
  }
  function r(c) {
    if (Le()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const m = ce.drafts[c.date] || { date: c.date, entries: et(ce.records.find((b) => b.date === c.date)), appliedBatches: [] }, v = ms(m, c);
      if (v.duplicate) return { ok: !0, duplicate: !0 };
      const p = { ...ce.drafts, [c.date]: v.draft };
      return we.setItem(gt, JSON.stringify({ ...ce, drafts: p, calculated: mt.value })), ce.drafts = p, { ok: !0, duplicate: !1 };
    } catch (m) {
      return { ok: !1, error: m.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: ce, theme: xn, nutrition: mt, records: t, storageError: Oe, updateProfile: l, saveRecord: n, ensureDraft: d, addToDraft: i, addPlanToDraft: r, toggleHabit: u };
}
let Ut;
function gs() {
  return Ut || (Ut = new Promise((t, l) => {
    if (!globalThis.indexedDB) {
      l(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const n = indexedDB.open(tt("weiheng.media.v1"), 1);
    n.onupgradeneeded = () => {
      const d = n.result;
      for (const i of ["photos", "reports"]) d.objectStoreNames.contains(i) || d.createObjectStore(i, { keyPath: "id" });
    }, n.onsuccess = () => t(n.result), n.onerror = () => l(new Error("无法打开本地存储，请检查浏览器隐私设置。")), n.onblocked = () => l(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), Ut;
}
async function kt(t, l, n) {
  const d = await gs();
  if (l === "readwrite" && Le()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, u) => {
    const r = d.transaction(t, l);
    let c;
    const m = n(r.objectStore(t));
    m.onsuccess = () => {
      c = m.result;
    }, r.oncomplete = () => i(c), r.onabort = r.onerror = () => u(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const zt = (t, l) => kt(t, "readwrite", (n) => n.put(JSON.parse(JSON.stringify(l)))), fs = (t, l) => kt(t, "readonly", (n) => n.get(l)), ys = (t) => kt(t, "readonly", (l) => l.getAll()), hs = (t, l) => kt(t, "readwrite", (n) => n.delete(l));
async function wt(t, l) {
  let n;
  try {
    n = await fetch("/api/ai/" + t, { method: l === void 0 ? "GET" : "POST", headers: l === void 0 ? {} : { "Content-Type": "application/json" }, body: l === void 0 ? void 0 : JSON.stringify(l), signal: $n(9e4) });
  } catch (i) {
    throw new Error(i?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  let d;
  try {
    d = await n.json();
  } catch {
    throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
  }
  if (!n.ok) {
    const i = new Error(d.error || "AI 服务暂时不可用。");
    throw i.code = d.code, i;
  }
  return d;
}
async function En(t, l, n, d) {
  const i = $n(9e4), u = d ? os([d, i]) : i;
  let r;
  try {
    r = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    l, stream: !0 }), signal: u });
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
  const k = (h) => {
    const T = h.split(/\r?\n/).filter((w) => w.startsWith("data:")).map((w) => w.slice(5).trimStart()).join(`
`);
    if (!T) return;
    let S;
    try {
      S = JSON.parse(T);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (S?.type === "error") {
      const w = new Error(S.message || "AI 暂时无法回复，请重试。");
      throw w.code = S.code, w;
    }
    if (S?.type === "progress" && S.step) {
      n(S);
      return;
    }
    if (S?.type === "delta" && typeof S.text == "string") {
      n(S);
      return;
    }
    S?.type === "done" && typeof S.model == "string" && (b = S, p = !0, n(S));
  };
  try {
    for (; !p; ) {
      const { value: h, done: T } = await c.read();
      if (T) break;
      v += m.decode(h, { stream: !0 });
      let S;
      for (; (S = v.search(/\r?\n\r?\n/)) >= 0; ) {
        const w = v.slice(S).match(/^\r?\n\r?\n/)[0];
        if (k(v.slice(0, S)), v = v.slice(S + w.length), p) break;
      }
    }
    if (v += m.decode(), v.trim() && !p && k(v), !p || !b) throw new Error("AI 流式连接提前结束，请重试。");
    return b;
  } finally {
    c.releaseLock();
  }
}
async function ks(t, l) {
  const n = await En("meal-plan", t, (d) => {
    d.type === "progress" && l(d.step);
  });
  if (!n.result || !["ready", "needs_evidence"].includes(n.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return n.result;
}
const Ne = M([]), ft = M(""), jt = /* @__PURE__ */ new Map();
let Dt;
function Gt(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function ws(t) {
  return t.filter((l) => {
    const n = l.referenceConfirmed === !1 ? void 0 : ae[l.foodId || ""];
    return Pe.some((d) => {
      const i = Ft(l, n, d.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function rn(t) {
  Ne.value = [t, ...Ne.value.filter((l) => l.id !== t.id)].sort((l, n) => n.requestedAt.localeCompare(l.requestedAt));
}
async function pt(t) {
  try {
    await zt("reports", t), ft.value = "", rn(t);
  } catch (l) {
    throw ft.value = Gt(l), rn({ ...t, persistenceFailed: !0 }), l;
  }
}
function Un() {
  return Dt || (Dt = (async () => {
    try {
      Ne.value = (await ys("reports")).sort((t, l) => l.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Ne.value])
        t.status === "pending" && await pt({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      ft.value = Gt(t);
    }
  })()), Dt;
}
function $s(t) {
  return Ne.value.find((l) => l.date === t);
}
function _s(t, l, n) {
  return !l || t.dataVersion !== yn(l, n);
}
async function Cs(t, l, { force: n = !1 } = {}) {
  const d = $e();
  if (await qe(et(t).filter((k) => k.foodId && !k.nutritionSnapshot).map((k) => String(k.foodId))), $e() !== d || (await Un(), $e() !== d)) return;
  const i = yn(t, l), u = `${d}:${t.date}:${i}`, r = jt.get(u);
  if (r) return r;
  const c = Ne.value.find(
    (k) => k.date === t.date && k.dataVersion === i && k.status === "complete" && !k.persistenceFailed
  );
  if (c && !n) return c;
  const m = {
    sex: l?.sex,
    age: l?.age,
    height: l?.height,
    weight: l?.weight,
    activity: l?.activity,
    ageMonths: l?.ageMonths,
    physiologicalStage: l?.physiologicalStage
  }, v = et(t), p = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: Rt(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: v,
      intake: hn(v),
      profile: m
    },
    result: null,
    error: ""
  }, b = (async () => {
    await pt(p);
    try {
      const k = await wt("analyze-day", {
        date: t.date,
        entries: v,
        profile: m,
        requestId: p.id
      });
      if ($e() !== d) return;
      const h = ws(v);
      if (h.length) {
        const T = k.calculation?.estimation, S = T?.foods || [];
        if (!(T?.status === "complete" && T.missingFoodCount === h.length && S.length === h.length && h.every((A) => {
          const R = S.find((V) => V.entryId === String(v.indexOf(A))), D = A.referenceConfirmed === !1 ? void 0 : ae[A.foodId || ""], N = Pe.filter((V) => {
            const H = Ft(A, D, V.id);
            return typeof H.value != "number" && !H.range;
          }).map((V) => V.id);
          return !!(R && N.every((V) => {
            const H = R.values[V];
            return H && Number.isFinite(H.low) && Number.isFinite(H.high) && H.high > H.low;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      await pt({
        ...p,
        status: "complete",
        generatedAt: k.generatedAt,
        model: k.model,
        result: k.analysis,
        calculation: k.calculation
      });
    } catch (k) {
      if ($e() !== d) return;
      await pt({ ...p, status: "failed", error: Gt(k) });
    }
    return Ne.value.find((k) => k.id === p.id);
  })();
  jt.set(u, b);
  try {
    return await b;
  } finally {
    jt.delete(u);
  }
}
function Jt() {
  return {
    reports: Ne,
    reportStorageError: ft,
    loadReports: Un,
    latestReport: $s,
    isStale: _s,
    generateReport: Cs
  };
}
const As = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], Is = {
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
  setup(t, { emit: l }) {
    const n = t, d = l, i = M(null), u = M(!1), r = G(() => (n.max - n.min) * 0.16), c = G(() => {
      const w = Number(n.modelValue);
      return String(n.modelValue).trim() && Number.isFinite(w) ? Math.min(n.max, Math.max(n.min, w)) : n.fallback;
    }), m = G(() => {
      const w = (c.value - n.min) / r.value, A = w - Math.round(w);
      return Array.from({ length: 31 }, (R, D) => ({
        key: D,
        major: D % 5 === 0,
        left: `${50 + (D - 15 - A) / 30 * 100}%`
      }));
    });
    let v = null;
    function p(w) {
      const A = Math.round((w - n.min) / n.step), R = n.step < 1 ? 1 : 0;
      return Number(Math.min(n.max, Math.max(n.min, n.min + A * n.step)).toFixed(R));
    }
    function b(w) {
      d("update:modelValue", p(w));
    }
    function k(w) {
      w.pointerType === "mouse" && w.button !== 0 || (w.preventDefault(), i.value.setPointerCapture(w.pointerId), u.value = !0, v = { x: w.clientX, value: c.value });
    }
    function h(w) {
      if (!v || !u.value) return;
      const A = i.value.getBoundingClientRect().width || 1;
      b(v.value + (w.clientX - v.x) / A * r.value);
    }
    function T() {
      u.value = !1, v = null;
    }
    function S(w) {
      const A = {
        ArrowRight: n.step,
        ArrowUp: n.step,
        ArrowLeft: -n.step,
        ArrowDown: -n.step,
        PageUp: n.step * 10,
        PageDown: -n.step * 10
      };
      w.key === "Home" ? (w.preventDefault(), b(n.min)) : w.key === "End" ? (w.preventDefault(), b(n.max)) : A[w.key] && (w.preventDefault(), b(c.value + A[w.key]));
    }
    return (w, A) => (s(), o("div", {
      ref_key: "ruler",
      ref: i,
      class: pe(["vb-ruler", { "is-dragging": u.value }]),
      role: "slider",
      tabindex: "0",
      "aria-label": `${t.label}刻度`,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": c.value,
      "aria-valuetext": `${c.value} ${t.unit}`,
      "aria-orientation": "horizontal",
      onPointerdown: k,
      onPointermove: h,
      onPointerup: T,
      onPointercancel: T,
      onLostpointercapture: T,
      onKeydown: S
    }, [
      A[0] || (A[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (s(!0), o(F, null, L(m.value, (R) => (s(), o("i", {
        key: R.key,
        class: pe({ major: R.major }),
        style: gn({ left: R.left })
      }, null, 6))), 128)),
      A[1] || (A[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, As));
  }
}, Ss = { class: "vb-dialog-overlay" }, xs = { class: "vb-wizard-top" }, Es = { class: "vb-icon-badge" }, Us = ["aria-valuenow", "aria-label"], js = { class: "vb-wizard-copy" }, Ds = { class: "vb-small-label" }, Ps = { id: "vb-wizard-title" }, Ns = { id: "vb-step-hint" }, Ms = {
  key: 0,
  class: "vb-sex-field"
}, Rs = { class: "vb-sr-only" }, Ts = ["aria-pressed", "onClick"], zs = { class: "vb-person-symbol" }, Os = { class: "vb-choice-check" }, Fs = {
  key: 1,
  class: "vb-number-step"
}, Bs = { for: "vb-step-number" }, Vs = { class: "vb-number-control" }, qs = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], Ls = {
  key: 0,
  class: "vb-field"
}, Gs = { class: "vb-input-range" }, Js = {
  key: 2,
  class: "vb-activity-field"
}, Hs = { class: "vb-sr-only" }, Ks = ["aria-pressed", "onClick"], Ws = { class: "vb-activity-icon" }, Ys = { class: "vb-radio-mark" }, Xs = { key: 0 }, Qs = {
  key: 3,
  class: "vb-field"
}, Zs = {
  key: 4,
  class: "vb-skip-row"
}, eo = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, to = { class: "vb-wizard-actions" }, no = ["disabled"], so = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, oo = { class: "vb-wizard-account-login" }, lo = { class: "vb-wizard-privacy" }, ao = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = Ze(n.profile ? { ...n.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), u = M(0), r = M(""), c = M(null), m = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], v = G(() => {
      const w = m[u.value], A = rs(i.age)[w.key];
      return A ? { ...w, min: A[0], max: A[1] } : w;
    });
    function p() {
      if (u.value === 0 || u.value === 4 || !String(i[v.value.key] ?? "").trim()) return "";
      const w = Number(i[v.value.key]);
      return !Number.isFinite(w) || w < v.value.min || w > v.value.max || u.value === 1 && !Number.isInteger(w) ? `请输入 ${v.value.min}–${v.value.max} ${v.value.unit}${u.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function b(w) {
      i.sex = w, r.value = "";
    }
    function k() {
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
    de(u, () => {
      r.value = "", T();
    }), yt(T);
    function S(w) {
      if (w.key === "Escape" && n.profile) {
        d("close");
        return;
      }
      if (w.key !== "Tab") return;
      const A = [...c.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], R = A[0], D = A.at(-1);
      w.shiftKey && document.activeElement === R ? (w.preventDefault(), D.focus()) : !w.shiftKey && document.activeElement === D && (w.preventDefault(), R.focus());
    }
    return (w, A) => (s(), o("div", Ss, [
      e("section", {
        ref_key: "dialog",
        ref: c,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: S
      }, [
        e("div", xs, [
          e("span", Es, [
            U(z, { name: "leaf" })
          ]),
          A[10] || (A[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (s(), o("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: A[0] || (A[0] = (R) => w.$emit("close"))
          }, [
            U(z, { name: "close" })
          ])) : $("", !0)
        ]),
        e("div", {
          class: "vb-wizard-progress",
          role: "progressbar",
          "aria-valuenow": u.value + 1,
          "aria-valuemin": "1",
          "aria-valuemax": "5",
          "aria-label": `档案设置，第 ${u.value + 1} 步，共 5 步`
        }, [
          (s(), o(F, null, L(5, (R) => e("span", {
            key: R,
            class: pe({ filled: R <= u.value + 1 })
          }, null, 2)), 64))
        ], 8, Us),
        e("form", {
          onSubmit: De(h, ["prevent"])
        }, [
          e("div", js, [
            e("span", Ds, "第 " + a(u.value + 1) + " 步 / 共 5 步", 1),
            e("h2", Ps, a(v.value.title), 1),
            e("p", Ns, a(v.value.hint), 1)
          ]),
          u.value === 0 ? (s(), o("fieldset", Ms, [
            e("legend", Rs, a(v.value.question), 1),
            (s(), o(F, null, L([["male", "男性"], ["female", "女性"]], ([R, D]) => e("button", {
              key: R,
              type: "button",
              class: pe(["vb-choice-button", { selected: i.sex === R }]),
              "aria-pressed": i.sex === R,
              onClick: (N) => b(R)
            }, [
              e("span", zs, a(R === "male" ? "♂" : "♀"), 1),
              e("strong", null, a(D), 1),
              e("span", Os, [
                i.sex === R ? (s(), me(z, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : $("", !0)
              ])
            ], 10, Ts)), 64))
          ])) : u.value < 4 ? (s(), o("div", Fs, [
            e("label", Bs, a(v.value.question), 1),
            e("div", Vs, [
              te((s(), o("input", {
                id: "vb-step-number",
                key: v.value.key,
                "onUpdate:modelValue": A[1] || (A[1] = (R) => i[v.value.key] = R),
                class: "vb-step-input",
                type: "number",
                inputmode: u.value === 1 ? "numeric" : "decimal",
                min: v.value.min,
                max: v.value.max,
                step: u.value === 1 ? 1 : 0.1,
                placeholder: v.value.placeholder,
                "aria-invalid": !!r.value,
                "aria-describedby": r.value ? "vb-step-error" : "vb-step-hint",
                onInput: A[2] || (A[2] = (R) => r.value = "")
              }, null, 40, qs)), [
                [ue, i[v.value.key]]
              ]),
              e("span", null, a(v.value.unit), 1)
            ]),
            U(Is, {
              modelValue: i[v.value.key],
              "onUpdate:modelValue": [
                A[3] || (A[3] = (R) => i[v.value.key] = R),
                A[4] || (A[4] = (R) => r.value = "")
              ],
              min: v.value.min,
              max: v.value.max,
              step: u.value === 1 ? 1 : 0.1,
              fallback: Number(v.value.placeholder),
              label: v.value.question,
              unit: v.value.unit
            }, null, 8, ["modelValue", "min", "max", "step", "fallback", "label", "unit"]),
            u.value === 1 && String(i.age) === "0" ? (s(), o("label", Ls, [
              A[11] || (A[11] = P("月龄（可选，0–11个月）", -1)),
              te(e("input", {
                "onUpdate:modelValue": A[5] || (A[5] = (R) => i.ageMonths = R),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [ue, i.ageMonths]
              ])
            ])) : $("", !0),
            e("p", Gs, a(v.value.min) + "–" + a(v.value.max) + " " + a(v.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (s(), o("fieldset", Js, [
            e("legend", Hs, a(v.value.question), 1),
            (s(!0), o(F, null, L(g(qt), (R) => (s(), o("button", {
              key: R.key,
              type: "button",
              class: pe(["vb-activity-choice", { selected: i.activity === R.key }]),
              "aria-pressed": i.activity === R.key,
              onClick: (D) => i.activity = R.key
            }, [
              e("span", Ws, [
                U(z, {
                  name: R.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, a(R.label), 1),
                e("small", null, a(R.detail), 1)
              ]),
              e("span", Ys, [
                i.activity === R.key ? (s(), o("i", Xs)) : $("", !0)
              ])
            ], 10, Ks))), 128))
          ])),
          u.value === 4 ? (s(), o("label", Qs, [
            A[13] || (A[13] = P("生理阶段（可选）", -1)),
            te(e("select", {
              "onUpdate:modelValue": A[6] || (A[6] = (R) => i.physiologicalStage = R)
            }, [...A[12] || (A[12] = [
              e("option", { value: "general" }, "一般情况", -1),
              e("option", { value: "pregnant" }, "孕期", -1),
              e("option", { value: "lactating" }, "哺乳期", -1),
              e("option", { value: "special" }, "其他需专业评估的情况", -1)
            ])], 512), [
              [Ce, i.physiologicalStage]
            ]),
            A[14] || (A[14] = e("small", null, "特殊阶段暂停通用营养目标；记录和查询仍可使用。", -1))
          ])) : $("", !0),
          u.value < 4 ? (s(), o("div", Zs, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: k
            }, "跳过此项")
          ])) : $("", !0),
          e("p", eo, a(r.value), 1),
          e("div", to, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: u.value === 0 && !t.profile,
              onClick: A[7] || (A[7] = (R) => u.value > 0 ? u.value-- : w.$emit("close"))
            }, [
              U(z, {
                name: "back",
                size: 17
              }),
              P(a(u.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, no),
            e("button", so, [
              P(a(u.value === 4 ? "保存我的身体档案" : "下一步"), 1),
              U(z, {
                name: "arrow",
                size: 17
              })
            ])
          ])
        ], 32),
        e("button", {
          type: "button",
          class: "vb-button vb-button-quiet vb-skip-all",
          onClick: A[8] || (A[8] = (R) => d("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", oo, [
          A[15] || (A[15] = P("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: A[9] || (A[9] = (R) => d("login"))
          }, "登录")
        ]),
        e("p", lo, [
          U(z, {
            name: "lock",
            size: 13
          }),
          A[16] || (A[16] = P("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, $t = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function Ht(t) {
  if (t?.__summary) return t.state || "";
  if (!t?.expanded) return t?.state || "";
  const l = String(t.source?.description || ""), n = [];
  return /\bRAW\b/.test(l) ? n.push("生") : /\bRSTD\b|ROASTED/.test(l) ? n.push("烤熟") : /\bBKD\b/.test(l) ? n.push("烘焙") : /FRIED/.test(l) ? n.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(l) && n.push("熟"), /\bDRY MIX\b/.test(l) ? n.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(l) && n.push("干制"), /\bCND\b/.test(l) && n.push("罐装"), /\bFRZ\b|FROZEN/.test(l) && n.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(l) ? n.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(l) && n.push("加盐"), n.length ? n.join(" · ") : "具体品种与配方见数据来源";
}
const jn = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function io(t) {
  return (jn.find((n) => n.items.some(([d]) => d === t?.key) || [n.name, ...n.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([n]) => ae[n]?.source).map(([n, d]) => ({ id: n, label: d }));
}
const ro = Object.fromEntries(jn.flatMap((t) => t.items)), Dn = (t) => ro[t] || "";
function uo(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function Pn(t) {
  const l = M(null), n = M(!1), d = M(!1);
  let i = 0;
  async function u(r = !1) {
    const c = g(typeof t == "function" ? t() : t), m = ++i;
    if (l.value = null, d.value = !1, n.value = !!c && !c.image, !c) {
      n.value = !1;
      return;
    }
    try {
      l.value = await uo(c, { force: r }), d.value = !l.value;
    } catch {
      d.value = !0;
    } finally {
      m === i && (n.value = !1);
    }
  }
  return de(() => {
    const r = g(typeof t == "function" ? t() : t);
    return [r?.key, r?.image];
  }, () => u(), { immediate: !0 }), { photo: l, loading: n, failed: d, retry: () => u(!0) };
}
const co = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, vo = { key: 0 }, mo = { key: 1 }, po = {
  key: 2,
  role: "status"
}, bo = { key: 3 }, go = { class: "vb-portion-macros" }, fo = { key: 0 }, yo = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, ho = { class: "vb-estimate-adjust" }, ko = { class: "vb-field" }, wo = ["disabled"], $o = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = M(!1), u = M(""), r = M(null), c = M("");
    let m = 0;
    function v(k) {
      try {
        const T = JSON.parse(we.getItem("weiheng.food-estimate." + k?.key) || "null");
        if (T?.estimate)
          return r.value = { ...T, cached: !0 }, c.value = T.recipe || "", d("resolved", r.value), !0;
      } catch {
      }
      const h = kn.estimates?.[k?.key];
      return h ? (r.value = { foodId: k.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: h.model, generatedAt: h.generatedAt, estimate: { entryId: k.key, name: k.name, grams: 100, values: h.values, assumption: h.assumption } }, d("resolved", r.value), !0) : !1;
    }
    async function p() {
      const k = ++m, h = n.food?.key;
      i.value = !0, u.value = "", r.value = null, d("resolved", null);
      try {
        const T = await wt("food-estimate", { foodId: h, recipe: c.value.trim() });
        if (k !== m) return;
        r.value = T;
        try {
          we.setItem("weiheng.food-estimate." + h, JSON.stringify({ ...T, recipe: c.value }));
        } catch {
          u.value = "估算已返回，但本机缓存保存失败。";
        }
        d("resolved", T);
      } catch (T) {
        k === m && (u.value = T.message);
      } finally {
        k === m && (i.value = !1);
      }
    }
    de(() => n.food?.key, () => {
      m++, c.value = "", u.value = "", i.value = !1, r.value = null, n.food && v(n.food);
    }, { immediate: !0 }), Ve(() => {
      m++;
    });
    const b = (k) => k ? `${Math.round(k.low * 10) / 10}–${Math.round(k.high * 10) / 10}` : "未知";
    return (k, h) => (s(), o("section", co, [
      e("h3", null, a(r.value ? "AI 估算参考" : "AI 营养估算"), 1),
      r.value?.estimate ? (s(), o("p", vo, [...h[1] || (h[1] = [
        e("strong", null, "每100克可食部 · AI估算，非数据库值", -1)
      ])])) : (s(), o("p", mo, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (s(), o("p", po, "正在估算…")) : $("", !0),
      r.value?.estimate ? (s(), o("div", bo, [
        e("div", go, [
          (s(!0), o(F, null, L(g(Pe).filter((T) => r.value.estimate.values[T.id]), (T) => (s(), o("div", {
            key: T.id
          }, [
            e("span", null, a(T.name), 1),
            e("strong", null, [
              P(a(b(r.value.estimate.values[T.id])) + " ", 1),
              e("small", null, a(T.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, a(r.value.estimate.assumption), 1),
        r.value.cached ? (s(), o("small", fo, "已保存的预估 · " + a(r.value.model || r.value.requestedModel) + " · " + a(r.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : $("", !0),
        h[2] || (h[2] = e("small", null, "此范围由 AI 按名称、类别和生熟状态估算；原料比例、用油和做法不同会造成差异。维生素和矿物质仍显示未知，不作为数据库检测值。", -1))
      ])) : $("", !0),
      u.value ? (s(), o("p", yo, a(u.value), 1)) : $("", !0),
      e("details", ho, [
        e("summary", null, a(r.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", ko, [
          h[3] || (h[3] = P("原料与做法", -1)),
          te(e("textarea", {
            "onUpdate:modelValue": h[0] || (h[0] = (T) => c.value = T),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [ue, c.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: p
        }, a(i.value ? "估算中…" : u.value ? "重试估算" : r.value ? "按补充内容重新估算" : "生成估算"), 9, wo)
      ])
    ]));
  }
};
function _o(t) {
  const l = String(t?.name || ""), n = String(t?.state || ""), d = (i, u) => ({ label: `${i} · 估算${u}克`, grams: u });
  return /米饭/.test(l) && !/生|干/.test(n) ? [d("小碗", 100), d("中碗", 150), d("大碗", 200)] : /鸡蛋/.test(l) && !/粉|液|鸭|鹅/.test(l) ? [d("1个去壳", 50)] : /香蕉/.test(l) ? [d("1根去皮", 100)] : /苹果/.test(l) ? [d("小个去核", 150), d("中个去核", 200)] : /牛奶|酸奶/.test(l) && !/粉|干酪|奶油/.test(l) ? [d("小杯（按重量）", 200), d("一份（按重量）", 250)] : [];
}
const Co = {
  key: 0,
  class: "vb-portion-presets"
}, Ao = ["onClick"], Nn = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = G(() => _o(n.food));
    return (u, r) => i.value.length ? (s(), o("div", Co, [
      r[0] || (r[0] = e("span", null, "份量参考", -1)),
      (s(!0), o(F, null, L(i.value, (c) => (s(), o("button", {
        key: c.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (m) => d("choose", c.grams)
      }, a(c.label), 9, Ao))), 128)),
      r[1] || (r[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : $("", !0);
  }
}, Io = ["src", "alt", "loading"], So = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, Kt = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = M(!1);
    return de(() => n.photo?.image, () => i.value = !1), (u, r) => (s(), o("div", {
      class: pe(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (s(), o("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: r[0] || (r[0] = (c) => {
          i.value = !0, d("image-error");
        })
      }, null, 40, Io)) : (s(), o("div", So, [
        U(z, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, a(g(Dn)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, a(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (s(), o("span", {
        key: 2,
        class: pe({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, a(t.photo.imageLabel || "食物照片"), 3)) : $("", !0)
    ], 2));
  }
}), xo = ["aria-label"], Eo = ["aria-label"], Uo = { class: "vb-feature-dialog-body" }, ot = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: l }) {
    const n = l, d = M(null), i = document.activeElement;
    yt(() => Ee(() => d.value?.focus())), Ve(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function u(r) {
      if (r.key === "Escape" && (r.preventDefault(), n("close")), r.key !== "Tab") return;
      const c = [...d.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((p) => p.getClientRects().length);
      if (!c.length) {
        r.preventDefault();
        return;
      }
      const m = c[0], v = c.at(-1);
      r.shiftKey && (document.activeElement === m || document.activeElement === d.value) ? (r.preventDefault(), v.focus()) : !r.shiftKey && document.activeElement === v && (r.preventDefault(), m.focus());
    }
    return (r, c) => (s(), o("div", {
      class: "vb-feature-overlay",
      onClick: c[1] || (c[1] = De((m) => r.$emit("close"), ["self"]))
    }, [
      e("section", {
        ref_key: "panel",
        ref: d,
        class: pe(["vb-feature-dialog", { "is-wide": t.wide }]),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t.title,
        tabindex: "-1",
        onKeydown: u
      }, [
        e("header", null, [
          e("h2", null, a(t.title), 1),
          e("button", {
            type: "button",
            class: "vb-icon-button",
            "aria-label": "关闭" + t.title,
            onClick: c[0] || (c[0] = (m) => r.$emit("close"))
          }, [
            U(z, { name: "close" })
          ], 8, Eo)
        ]),
        e("div", Uo, [
          Hn(r.$slots, "default")
        ])
      ], 42, xo)
    ]));
  }
}, jo = { class: "vb-food-detail-top" }, Do = { class: "vb-eyebrow" }, Po = { class: "vb-food-state" }, No = { class: "vb-pill" }, Mo = {
  key: 0,
  class: "vb-field"
}, Ro = ["value"], To = ["value"], zo = {
  key: 0,
  class: "vb-intake-more"
}, Oo = {
  key: 1,
  class: "vb-feature-error"
}, Fo = { class: "vb-portion-controls" }, Bo = ["max"], Vo = ["value"], qo = { class: "vb-portion-macros" }, Lo = { key: 0 }, Go = { key: 0 }, Jo = ["disabled"], Ho = { class: "vb-food-all-nutrients" }, Ko = { class: "vb-nutrient-table" }, Wo = { class: "vb-nutrient-table-head" }, Yo = { key: 0 }, Xo = ["href"], Qo = { key: 1 }, Zo = { key: 2 }, el = ["href"], tl = ["href"], nl = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = M(n.foodId), u = M(100), r = M(ke()), c = M("unspecified"), m = M(null);
    de(() => n.foodId, (H) => {
      i.value = H;
    }), de(i, () => {
      m.value = null;
    });
    const v = G(() => ae[i.value]), p = M("");
    async function b() {
      const H = i.value;
      p.value = "";
      try {
        await qe(H);
      } catch (O) {
        i.value === H && (p.value = O.message);
      }
    }
    de(i, b, { immediate: !0 });
    const k = G(() => io(ae[n.foodId])), h = G(() => Pe.some((H) => typeof v.value?.nutrients?.[H.id] != "number")), T = G(() => v.value?.__summary ? null : ht(v.value, h.value ? m.value : null)), S = G(() => hn([{ foodId: v.value.key, grams: Number(u.value), nutritionSnapshot: T.value }]).totals), w = G(() => !v.value?.__summary && Number(u.value) >= 0.1 && Number(u.value) <= 5e3 && r.value && r.value <= ke()), { photo: A, loading: R, failed: D } = Pn(() => v.value), N = G(() => v.value?.imageCredit || A.value?.imageCredit || A.value);
    function V() {
      w.value && d("add", { foodId: v.value.key, grams: Number(u.value), date: r.value, meal: c.value, nutritionSnapshot: T.value });
    }
    return (H, O) => v.value ? (s(), me(ot, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: O[6] || (O[6] = (K) => H.$emit("close"))
    }, {
      default: st(() => [
        e("div", jo, [
          e("figure", null, [
            U(Kt, {
              food: v.value,
              photo: g(A),
              loading: g(R),
              failed: g(D),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", Do, a(v.value.categoryName), 1),
            e("h1", null, a(g(Dn)(v.value.key) || g($t)(v.value)), 1),
            e("p", Po, a(g(Ht)(v.value)), 1),
            e("span", No, a(v.value.source ? "数据库" : m.value ? "AI估算" : "数据不完整"), 1),
            k.value.length ? (s(), o("label", Mo, [
              O[7] || (O[7] = P("选择营养样本", -1)),
              te(e("select", {
                "onUpdate:modelValue": O[0] || (O[0] = (K) => i.value = K),
                "aria-label": "选择营养样本"
              }, [
                k.value.some((K) => K.id === n.foodId) ? $("", !0) : (s(), o("option", {
                  key: 0,
                  value: n.foodId
                }, "当前食物 · " + a(g(ae)[n.foodId]?.source ? "数据库" : "通用估算"), 9, Ro)),
                (s(!0), o(F, null, L(k.value, (K) => (s(), o("option", {
                  key: K.id,
                  value: K.id
                }, a(K.label), 9, To))), 128))
              ], 512), [
                [Ce, i.value]
              ]),
              O[8] || (O[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : $("", !0)
          ])
        ]),
        h.value && !v.value.__summary ? (s(), o("details", zo, [
          O[9] || (O[9] = e("summary", null, "查看估算依据与调整", -1)),
          U($o, {
            food: v.value,
            onResolved: O[1] || (O[1] = (K) => m.value = K)
          }, null, 8, ["food"])
        ])) : $("", !0),
        p.value ? (s(), o("p", Oo, [
          P(a(p.value) + " ", 1),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: b
          }, "重试")
        ])) : $("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: De(V, ["prevent"])
        }, [
          U(Nn, {
            food: v.value,
            onChoose: O[2] || (O[2] = (K) => u.value = K)
          }, null, 8, ["food"]),
          e("div", Fo, [
            e("label", null, [
              O[10] || (O[10] = P("可食部重量", -1)),
              te(e("input", {
                "onUpdate:modelValue": O[3] || (O[3] = (K) => u.value = K),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [ue, u.value]
              ]),
              O[11] || (O[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              O[12] || (O[12] = P("记录日期", -1)),
              te(e("input", {
                "onUpdate:modelValue": O[4] || (O[4] = (K) => r.value = K),
                type: "date",
                max: g(ke)(),
                required: ""
              }, null, 8, Bo), [
                [ue, r.value]
              ])
            ]),
            e("label", null, [
              O[13] || (O[13] = P("餐次", -1)),
              te(e("select", {
                "onUpdate:modelValue": O[5] || (O[5] = (K) => c.value = K)
              }, [
                (s(!0), o(F, null, L(g(ct), ([K, W]) => (s(), o("option", {
                  key: K,
                  value: K
                }, a(W), 9, Vo))), 128))
              ], 512), [
                [Ce, c.value]
              ])
            ])
          ]),
          e("div", qo, [
            (s(!0), o(F, null, L(g(Pe), (K) => (s(), o("div", {
              key: K.id
            }, [
              e("span", null, a(K.id === "carbs" ? "碳水" : K.name), 1),
              e("strong", null, [
                P(a(g(en)(S.value[K.id])) + " ", 1),
                S.value[K.id].value != null || S.value[K.id].range ? (s(), o("small", Lo, a(K.unit), 1)) : $("", !0)
              ]),
              S.value[K.id].range ? (s(), o("small", Go, "AI估算")) : $("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !w.value
          }, [
            U(z, {
              name: "plus",
              size: 16
            }),
            O[14] || (O[14] = P("添加记录", -1))
          ], 8, Jo),
          O[15] || (O[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", Ho, [
          O[20] || (O[20] = e("summary", null, "查看完整营养与依据", -1)),
          O[21] || (O[21] = e("p", null, "每100克可食部；未知值不按0计算。范围为AI估算，非实测值。", -1)),
          e("div", Ko, [
            e("div", Wo, [
              O[16] || (O[16] = e("span", null, "营养指标", -1)),
              O[17] || (O[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + a(u.value) + " 克", 1)
            ]),
            (s(!0), o(F, null, L(g(Qn), (K) => (s(), o("div", {
              key: K.id
            }, [
              e("span", null, a(K.name), 1),
              e("span", null, a(g(xe)(v.value.nutrients[K.id])) + " " + a(v.value.nutrients[K.id] != null ? K.unit : ""), 1),
              e("span", null, a(g(en)(S.value[K.id])) + " " + a(S.value[K.id].value != null || S.value[K.id].range ? K.unit : "") + a(S.value[K.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + a(v.value.name), 1),
          v.value.source ? (s(), o("p", Yo, [
            e("a", {
              href: v.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, a(v.value.source.name), 9, Xo),
            P(" · " + a(v.value.source.id) + " · " + a(v.value.source.license), 1),
            O[18] || (O[18] = e("br", null, null, -1)),
            P(a(v.value.source.description), 1)
          ])) : (s(), o("p", Qo, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          O[22] || (O[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          N.value ? (s(), o("p", Zo, [
            O[19] || (O[19] = P("图片：", -1)),
            e("a", {
              href: N.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, a(N.value.title), 9, el),
            P(" / " + a(N.value.author) + " · ", 1),
            e("a", {
              href: N.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, a(N.value.license), 9, tl),
            P(" · " + a(N.value.modifications), 1)
          ])) : $("", !0)
        ])
      ]),
      _: 1
    })) : $("", !0);
  }
}, sl = { class: "vb-report-heading" }, ol = { class: "vb-small-label" }, ll = { class: "vb-pill" }, al = { key: 0 }, il = ["disabled"], rl = {
  key: 1,
  class: "vb-inline-warning"
}, ul = {
  key: 2,
  class: "vb-inline-warning"
}, dl = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, cl = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, vl = ["disabled"], ml = {
  key: 5,
  class: "vb-feature-error"
}, pl = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, bl = { class: "vb-report-estimation-heading" }, gl = { class: "vb-pill" }, fl = { class: "vb-data-note" }, yl = {
  key: 0,
  class: "vb-report-estimation-list"
}, hl = { class: "vb-report-estimation-values" }, kl = {
  key: 1,
  class: "vb-intake-more"
}, wl = { class: "vb-report-comparison" }, $l = { key: 0 }, _l = { key: 1 }, Cl = { key: 2 }, Al = { key: 3 }, Il = { key: 4 }, Sl = { key: 5 }, xl = { key: 6 }, El = { key: 7 }, Ul = {
  key: 7,
  class: "vb-report-content"
}, jl = { class: "vb-report-summary" }, Dl = { class: "vb-inline-warning" }, Pl = {
  key: 8,
  class: "vb-intake-more"
}, Nl = { class: "vb-report-meta" }, Ml = { key: 0 }, Rl = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const l = t, n = G(() => l.report?.calculation?.targets || _n(l.report?.snapshot?.profile)), d = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], i = (v) => v ? new Date(v).toLocaleString("zh-CN", { hour12: !1 }) : "", u = G(() => (l.report?.snapshot?.entries || []).flatMap((v) => {
      const p = v.referenceConfirmed === !1 ? null : ae[v.foodId], b = Pe.filter((k) => {
        const h = Ft(v, p, k.id);
        return typeof h.value != "number" && !h.range;
      }).map((k) => k.id);
      return b.length ? [{ name: v.name, grams: v.grams, missing: b }] : [];
    })), r = G(() => l.report?.calculation?.estimation?.missingFoodCount ?? u.value.length), c = G(() => l.report?.calculation?.estimation?.foods || []), m = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + xe(Math.abs(v));
    return (v, p) => (s(), me(ot, {
      title: "AI 营养分析",
      wide: "",
      onClose: p[4] || (p[4] = (b) => v.$emit("close"))
    }, {
      default: st(() => [
        e("div", sl, [
          e("div", null, [
            e("span", ol, a(t.report?.date || t.record?.date), 1),
            p[5] || (p[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", ll, a(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        p[17] || (p[17] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (s(), o("section", al, [
          p[6] || (p[6] = e("p", null, "分析时向DeepSeek发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[0] || (p[0] = (b) => v.$emit("retry"))
          }, "开始AI分析", 8, il)
        ])) : $("", !0),
        t.stale ? (s(), o("p", rl, [
          p[7] || (p[7] = P("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (s(), o("button", {
            key: 0,
            class: "vb-text-button",
            onClick: p[1] || (p[1] = (b) => v.$emit("retry"))
          }, "重新分析")) : $("", !0)
        ])) : $("", !0),
        t.record ? $("", !0) : (s(), o("p", ul, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (s(), o("div", dl, [
          p[9] || (p[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            p[8] || (p[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, a(r.value ? "同时自动估算 " + r.value + " 项食物的缺失指标。" : "程序已计算营养汇总，DeepSeek 正在生成解释与建议。"), 1)
          ])
        ])) : $("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (s(), o("div", cl, [
          p[10] || (p[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, a(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[2] || (p[2] = (b) => v.$emit("retry"))
          }, "重新分析", 8, vl)
        ])) : $("", !0),
        t.report?.persistenceFailed ? (s(), o("p", ml, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : $("", !0),
        t.report?.snapshot ? (s(), o(F, { key: 6 }, [
          p[13] || (p[13] = e("h3", { class: "vb-report-section-title" }, "程序计算的营养汇总", -1)),
          U(Bt, {
            summary: t.report.snapshot.intake,
            targets: n.value,
            details: ""
          }, null, 8, ["summary", "targets"]),
          r.value ? (s(), o("section", pl, [
            e("div", bl, [
              e("div", null, [
                e("h3", null, a(r.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${r.value} 项）`), 1),
                p[11] || (p[11] = e("p", null, "缺失指标已自动交由 AI 估算范围，并用于下方参考差值；不需要额外点击。", -1))
              ]),
              e("span", gl, a(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            e("p", fl, a(t.report?.calculation?.estimation?.disclaimer || "估算结果基于食物名称和可食部克数，只用于本报告参考，不会写入食物库或原始饮食记录。"), 1),
            c.value.length ? (s(), o("ul", yl, [
              (s(!0), o(F, null, L(c.value, (b) => (s(), o("li", {
                key: b.entryId
              }, [
                e("div", null, [
                  e("strong", null, a(b.name) + " · " + a(g(xe)(b.grams)) + " 克", 1),
                  e("small", null, a(b.assumption), 1)
                ]),
                e("div", hl, [
                  (s(!0), o(F, null, L(g(Pe).filter((k) => b.values[k.id]), (k) => (s(), o("span", {
                    key: k.id
                  }, a(k.id === "carbs" ? "碳水" : k.name) + " " + a(g(xe)(b.values[k.id].low)) + "–" + a(g(xe)(b.values[k.id].high)) + " " + a(k.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : $("", !0)
          ])) : $("", !0),
          t.report.calculation?.comparison ? (s(), o("details", kl, [
            p[12] || (p[12] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", wl, [
              (s(!0), o(F, null, L(t.report.calculation.comparison, (b) => (s(), o("div", {
                key: b.id
              }, [
                e("span", null, a(b.id === "carbs" ? "碳水" : b.name), 1),
                b.estimatedRange?.delta ? (s(), o("strong", $l, " AI 估算差值：" + a(m(b.estimatedRange.delta.low)) + " 至 " + a(m(b.estimatedRange.delta.high)) + " " + a(b.unit), 1)) : b.delta !== null ? (s(), o("strong", _l, a(b.delta > 0 ? "+" : "") + a(g(xe)(b.delta)) + " " + a(b.unit), 1)) : (s(), o("strong", Cl, a(b.estimatedRange || b.complete && b.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                b.estimatedRange?.delta ? (s(), o("small", Al, "根据数据库已知小计与 AI 估算范围计算；记录未必覆盖全天，不代表达标或不足。")) : b.estimatedRange && !b.estimatedRange.delta ? (s(), o("small", Il, "含估算范围，暂无适用个人目标。")) : b.delta !== null ? (s(), o("small", Sl, "记录合计减去全天目标，记录未必覆盖全天。")) : b.complete && b.target === null ? (s(), o("small", xl, "请完善个人营养档案后再查看与目标的差值。")) : (s(), o("small", El, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : $("", !0)
        ], 64)) : $("", !0),
        t.report?.result ? (s(), o("div", Ul, [
          p[14] || (p[14] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", jl, a(t.report.result.summary), 1),
          (s(), o(F, null, L(d, ([b, k]) => e("section", { key: b }, [
            t.report.result[b]?.length ? (s(), o(F, { key: 0 }, [
              e("h3", null, a(k), 1),
              e("ul", null, [
                (s(!0), o(F, null, L(t.report.result[b], (h, T) => (s(), o("li", { key: T }, a(h), 1))), 128))
              ])
            ], 64)) : $("", !0)
          ])), 64)),
          e("p", Dl, "分析范围：" + a(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : $("", !0),
        t.report ? (s(), o("details", Pl, [
          p[16] || (p[16] = e("summary", null, "查看分析信息", -1)),
          e("div", Nl, [
            e("span", null, "生成时间：" + a(i(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (s(), o("span", Ml, "模型：" + a(t.report.model), 1)) : $("", !0),
            e("span", null, "数据版本：" + a(t.report.dataVersion), 1),
            e("span", null, "食物库：" + a(t.report.snapshot?.intake?.dataVersion), 1),
            p[15] || (p[15] = e("small", null, "报告、照片保存在本机浏览器。清理站点数据后无法恢复。", -1))
          ])
        ])) : $("", !0),
        t.report?.status === "complete" && t.record ? (s(), o("button", {
          key: 9,
          type: "button",
          class: "vb-button vb-button-quiet",
          onClick: p[3] || (p[3] = (b) => v.$emit("retry"))
        }, a(t.stale ? "用最新记录重新分析" : "重新分析这一天"), 1)) : $("", !0)
      ]),
      _: 1
    }));
  }
};
function Ot(t) {
  const l = String(t || "");
  return /^(?:好的[，,\s]*)?pdf(?:格式)?[。.!！]?$/i.test(l.trim()) ? "pdf" : /^(?:好的[，,\s]*)?(?:word|docx)(?:格式)?[。.!！]?$/i.test(l.trim()) ? "docx" : !/(生成|导出|下载|保存|制作|整理|做成|转换|转成|给我|发我|用|格式|create|generate|export|download|save|make|convert)/i.test(l) || /^(什么是|如何|怎么|为什么|what\b|how\b|why\b)/i.test(l.trim()) ? null : [["pdf", /pdf/i], ["docx", /word|docx|\.doc\b/i], ["png", /png|长图|图片文档|图片格式|(?:导出|保存).{0,8}图片/i]].map(([d, i]) => ({ format: d, index: l.search(i) })).filter((d) => d.index >= 0).sort((d, i) => d.index - i.index)[0]?.format || null;
}
function Tl(t) {
  const l = String(t || "").trim(), n = /^\s*#{1,6}\s+\S/m.exec(l);
  if (!n || !n.index) return l;
  const d = l.slice(0, n.index), i = d.split(`
`).map((c) => c.trim()).filter((c) => c && !/^[-*_]{3,}$/.test(c)), u = /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i, r = /(身高|体重|年龄|孕期|哺乳|过敏|疾病|营养|能量|热量|kcal|蛋白|用药)/i;
  return u.test(d) && i.every((c) => /(PDF|Word|文件|附件|导出|下载|复制|格式)/i.test(c) && !r.test(c)) ? l.slice(n.index).trim() : l;
}
function Pt(t) {
  const l = String(t || "").trim();
  return l.length < 400 && !/^\s*(?:#{1,6}\s|\|)/m.test(l) && /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i.test(l);
}
const Mn = (t, l) => {
  const n = t.__vccOpts || t;
  for (const [d, i] of l)
    n[d] = i;
  return n;
}, zl = ["aria-busy"], Ol = { class: "vb-chat-document-body" }, Fl = {
  class: "vb-chat-export-options",
  "aria-label": "下载计划"
}, Bl = ["href", "download", "title"], Vl = ["disabled", "onClick"], ql = {
  key: 0,
  role: "status"
}, Ll = {
  key: 1,
  role: "alert"
}, Gl = { key: 2 }, Jl = {
  __name: "ChatMessageExport",
  props: { content: { type: String, required: !0 }, question: { type: String, default: "" }, auto: Boolean },
  emits: ["retry"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = M({}), u = M(""), r = M(""), c = M("");
    let m = 0, v = !1, p = !1;
    const b = G(() => Ot(n.question)), k = G(() => u.value || b.value || "pdf"), h = G(() => ({ pdf: "PDF", docx: "Word", png: "图片" })[k.value]), T = G(() => i.value[k.value]), S = G(() => Tl(n.content));
    function w() {
      for (const D of Object.values(i.value)) setTimeout(() => URL.revokeObjectURL(D.url), 3e4);
      i.value = {};
    }
    async function A(D = k.value) {
      if (r.value || i.value[D]) {
        i.value[D] && (u.value = D);
        return;
      }
      const N = m, V = S.value, H = n.question;
      u.value = D, r.value = D, c.value = "";
      try {
        if (b.value && Pt(V)) throw new Error("尚未生成文档正文，请重新生成。");
        const { createChatExport: O, preparedChatDownload: K } = await import("./chatExport-BCM5BWUu.js");
        if (N !== m) return;
        const W = await O(D, V, { question: H });
        if (N !== m) return;
        i.value = { ...i.value, [D]: K(W) };
      } catch (O) {
        N === m && (c.value = O instanceof Error ? O.message : "文件生成失败，请重试。");
      } finally {
        N === m && (r.value = "");
      }
    }
    function R() {
      !v || !n.auto || !b.value || p || r.value || i.value[b.value] || c.value || (p = !0, requestAnimationFrame(() => setTimeout(() => {
        p = !1, v && n.auto && b.value && A(b.value);
      }, 0)));
    }
    return de(() => [n.content, n.question], () => {
      m++, w(), u.value = "", r.value = "", c.value = "", R();
    }), de(() => n.auto, R), yt(() => {
      v = !0, R();
    }), Ve(() => {
      v = !1, m++, w();
    }), (D, N) => b.value ? (s(), o("div", {
      key: 0,
      class: "vb-chat-document",
      "aria-label": "计划正文与下载",
      "aria-busy": !!r.value
    }, [
      e("p", Ol, a(S.value), 1),
      e("div", Fl, [
        (s(), o(F, null, L([["pdf", "PDF"], ["docx", "Word"], ["png", "长图"]], ([V, H]) => (s(), o(F, { key: V }, [
          i.value[V] ? (s(), o("a", {
            key: 0,
            href: i.value[V].url,
            download: i.value[V].filename,
            title: i.value[V].filename
          }, a(V === "png" ? "保存长图" : "下载 " + H), 9, Bl)) : (s(), o("button", {
            key: 1,
            type: "button",
            disabled: !!r.value,
            onClick: (O) => A(V)
          }, a(r.value === V ? "正在生成…" : "生成 " + H), 9, Vl))
        ], 64))), 64))
      ]),
      T.value ? (s(), o("small", ql, a(h.value) + " 文件已生成", 1)) : $("", !0),
      c.value ? (s(), o("div", Ll, [
        e("p", null, a(c.value), 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: N[0] || (N[0] = (V) => g(Pt)(S.value) ? d("retry") : A())
        }, a(g(Pt)(S.value) ? "重新生成正文" : "重试生成文件"), 1)
      ])) : $("", !0),
      T.value?.pageCount ? (s(), o("small", Gl, "内容较长，" + a(T.value.pageCount) + " 张图片已打包为 ZIP。", 1)) : $("", !0)
    ], 8, zl)) : $("", !0);
  }
}, Hl = /* @__PURE__ */ Mn(Jl, [["__scopeId", "data-v-447caabb"]]);
function Kl({ viewport: t, isActive: l = () => !0, onChange: n = () => {
}, threshold: d = 64 }) {
  let i = !0;
  const u = () => l() && t() && t().clientHeight > 0, r = (p) => Math.max(0, p.scrollHeight - p.clientHeight - p.scrollTop);
  function c() {
    const p = t();
    n(!!(u() && r(p) > d));
  }
  function m(p = !1) {
    if (p && (i = !0), !u()) {
      n(!1);
      return;
    }
    const b = t();
    i && (b.scrollTop = Math.max(0, b.scrollHeight - b.clientHeight)), c();
  }
  function v() {
    u() && (i = r(t()) <= d, c());
  }
  return { layout: m, onScroll: v, jump: () => m(!0) };
}
function Wl({ viewport: t, content: l, active: n, thread: d, messages: i }) {
  const u = M(!1), r = Kl({ viewport: () => t.value, isActive: () => n.value, onChange: (S) => u.value = S });
  let c = !1, m = !1, v = !1, p, b;
  function k(S = !1) {
    v = v || S, !(!c || m) && (m = !0, Ee(() => {
      if (!c) {
        m = !1;
        return;
      }
      p = requestAnimationFrame(() => {
        if (p = void 0, m = !1, !c) return;
        const w = v;
        v = !1, r.layout(w);
      });
    }));
  }
  function h() {
    b?.disconnect(), t.value && b?.observe(t.value), l.value && b?.observe(l.value), k();
  }
  const T = () => k();
  return de(i, () => k(), { deep: !0, flush: "post" }), de([d, n], () => k(!0), { flush: "post" }), de([t, l], h, { flush: "post" }), yt(() => {
    c = !0, typeof ResizeObserver < "u" && (b = new ResizeObserver(T)), h(), window.addEventListener("resize", T), k(!0);
  }), Ve(() => {
    c = !1, b?.disconnect(), p !== void 0 && cancelAnimationFrame(p), window.removeEventListener("resize", T);
  }), { showJump: u, onScroll: r.onScroll, onContentLoad: T, jumpToLatest: () => k(!0) };
}
function Yl(t, l, n) {
  return t.push({ id: l, role: "assistant", content: "", status: "sending", createdAt: n }), t[t.length - 1];
}
function un(t, l = {}, n = []) {
  const d = new Set(n), i = {};
  for (const u of new Set((t.threads || []).map((r) => r.date))) {
    const r = (t.threads || []).filter((p) => p.date === u).sort((p, b) => String(b.createdAt || "").localeCompare(String(p.createdAt || ""))), c = r.find((p) => p.id === l[u]), m = r.find((p) => p.id === t.activeByDate?.[u]), v = c && (c.messages?.length || d.has(c.id)) ? c : m?.messages?.length ? m : r.find((p) => p.messages?.length) || c || m || r[0];
    v && (i[u] = v.id);
  }
  return i;
}
const Xl = 24e3, dn = 220;
function Ql(t, l) {
  const n = Date.parse(t || l || "");
  return Number.isFinite(n) ? n : 0;
}
function cn(t) {
  const l = String(t || "").trim();
  return l.length > dn ? `${l.slice(0, dn)}…` : l;
}
function Zl(t, l, n = !0) {
  if (!n || !Array.isArray(t)) return "";
  const d = [];
  for (const r of t) {
    if (!r || r.id === l || !Array.isArray(r.messages)) continue;
    const c = r.messages;
    for (let m = 0; m < c.length - 1; m++) {
      const v = c[m], p = c[m + 1];
      if (v?.role !== "user" || p?.role !== "assistant" || v.status !== "complete" || p.status !== "complete" || v.attachments?.length || p.attachments?.length) continue;
      const b = cn(v.content), k = cn(p.content);
      !b || !k || (d.push({
        date: typeof r.date == "string" ? r.date : "",
        time: Ql(v.createdAt, r.createdAt),
        user: b,
        assistant: k
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
  const l = (u) => u == null || u === "" ? void 0 : Number(u), n = l(t.age), d = l(t.height), i = l(t.weight);
  return {
    sex: t.sex || "",
    ...n !== void 0 ? { age: n } : {},
    ...d !== void 0 ? { height: d } : {},
    ...i !== void 0 ? { weight: i } : {},
    activity: t.activity,
    ...l(t.ageMonths) !== void 0 ? { ageMonths: l(t.ageMonths) } : {},
    ...t.physiologicalStage ? { physiologicalStage: t.physiologicalStage } : {}
  };
}
const ta = 3, na = 24e3, vn = 6e4, sa = 8e5, oa = 6, la = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function Rn(t) {
  const l = String(t.name || "").split(".").pop().toLowerCase(), n = ["jpg", "jpeg", "png", "webp"].includes(l) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(l) ? "document" : null;
  if (!n) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (n === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(n === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return n;
}
function aa(t) {
  const l = String(t).replace(/\u0000/g, "").trim();
  if (!l) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (l.length > na) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return l;
}
let Xe;
function ia() {
  return Xe || (Xe = new Promise((t, l) => {
    if (!globalThis.indexedDB) {
      l(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const n = indexedDB.open(tt("weiheng.chat-attachments.v1"), 1);
    n.onupgradeneeded = () => n.result.createObjectStore("attachments", { keyPath: "id" }), n.onsuccess = () => {
      const d = n.result;
      d.onversionchange = () => {
        d.close(), Xe = void 0;
      }, t(d);
    }, n.onerror = n.onblocked = () => l(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw Xe = void 0, t;
  })), Xe;
}
async function Wt(t, l) {
  const n = await ia();
  if (t === "readwrite" && Le()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((d, i) => {
    const u = n.transaction("attachments", t), r = l(u.objectStore("attachments"));
    u.oncomplete = () => d(r.result), u.onerror = u.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const ra = (t) => Wt("readwrite", (l) => l.put(t)), Nt = (t) => Wt("readonly", (l) => l.get(t)), ut = (t) => Wt("readwrite", (l) => l.delete(t));
function ua(t) {
  return new Promise((l, n) => {
    const d = new FileReader();
    d.onload = () => l(String(d.result)), d.onerror = () => n(new Error("照片读取失败，请重新选择。")), d.readAsDataURL(t);
  });
}
async function da(t) {
  const l = await createImageBitmap(t).catch(() => {
    throw new Error("照片无法读取，请换用 JPG、PNG 或 WebP。");
  });
  try {
    if (l.width * l.height > 4e7) throw new Error("照片分辨率过大，请缩小后上传。");
    const n = document.createElement("canvas"), d = Math.min(1, 1600 / Math.max(l.width, l.height));
    n.width = Math.max(1, Math.round(l.width * d)), n.height = Math.max(1, Math.round(l.height * d));
    const i = n.getContext("2d");
    if (!i) throw new Error("浏览器暂不支持照片处理。");
    i.fillStyle = "#fff", i.fillRect(0, 0, n.width, n.height), i.drawImage(l, 0, 0, n.width, n.height);
    for (const u of [0.85, 0.68, 0.5]) {
      const r = await new Promise((m, v) => n.toBlob((p) => p ? m(p) : v(new Error("照片压缩失败。")), "image/jpeg", u)), c = await ua(r);
      if (c.length <= sa) return c;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    l.close();
  }
}
async function ca(t) {
  const l = await import("./pdf-jk_a9_-5.js");
  l.GlobalWorkerOptions.workerSrc = "/content-dist/pdf.worker.min.js";
  const n = l.getDocument({
    data: new Uint8Array(await t.arrayBuffer()),
    useSystemFonts: !0,
    cMapUrl: "/content-dist/pdf-resources/cmaps/",
    cMapPacked: !0,
    standardFontDataUrl: "/content-dist/pdf-resources/standard_fonts/"
  });
  try {
    const d = await n.promise;
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
    await n.destroy();
  }
}
async function va(t) {
  const { unzipSync: l, strFromU8: n } = await import("./browser-CJhYS1h6.js"), d = l(new Uint8Array(await t.arrayBuffer()), {
    filter: (u) => u.name === "word/document.xml" && u.originalSize <= 4 * 1024 * 1024
  });
  if (!d["word/document.xml"]) throw new Error("Word 文件无效或内容过大，请另存为 DOCX 或 TXT 后重试。");
  const i = new DOMParser().parseFromString(n(d["word/document.xml"]), "application/xml");
  if (i.querySelector("parsererror")) throw new Error("Word 文件内容无法读取。");
  return Array.from(i.getElementsByTagNameNS("*", "p")).map((u) => Array.from(u.getElementsByTagNameNS("*", "*")).map((r) => r.localName === "t" ? r.textContent || "" : r.localName === "tab" ? "	" : r.localName === "br" ? `
` : "").join("")).join(`
`);
}
async function ma(t, l) {
  const n = Rn(t), d = { id: l, kind: n, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (n === "image") return { ...d, mimeType: "image/jpeg", dataUrl: await da(t) };
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
}, _a = ["value", "disabled"], Ca = ["value"], Aa = ["value"], Ia = { class: "vb-memory-toggle" }, Sa = ["disabled"], xa = { class: "vb-simple-starters" }, Ea = ["onClick"], Ua = { class: "vb-simple-context" }, ja = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, Da = { class: "vb-simple-message-body" }, Pa = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, Na = ["aria-label", "onClick"], Ma = ["src", "alt"], Ra = {
  key: 1,
  class: "vb-simple-loading"
}, Ta = {
  key: 2,
  class: "vb-simple-text"
}, za = {
  key: 0,
  class: "vb-simple-text"
}, Oa = {
  class: "vb-simple-error",
  role: "alert"
}, Fa = ["onClick"], Ba = {
  key: 4,
  class: "vb-simple-text"
}, Va = {
  key: 6,
  class: "vb-simple-message-meta"
}, qa = { class: "vb-simple-composer" }, La = { class: "vb-simple-composer-inner" }, Ga = {
  key: 0,
  class: "vb-simple-tools"
}, Ja = { class: "vb-simple-quick" }, Ha = { class: "vb-simple-quick-panel" }, Ka = ["onClick"], Wa = {
  key: 0,
  class: "vb-simple-status",
  role: "status"
}, Ya = ["accept"], Xa = {
  key: 0,
  class: "vb-chat-draft-attachments",
  "aria-label": "待发送附件"
}, Qa = ["disabled", "aria-label", "onClick"], Za = ["src", "alt"], ei = {
  key: 0,
  role: "status"
}, ti = {
  key: 1,
  role: "alert"
}, ni = { key: 2 }, si = ["aria-label", "onClick"], oi = { class: "vb-simple-editor-bottom" }, li = { class: "vb-chat-input-tools" }, ai = ["disabled"], ii = {
  key: 1,
  class: "vb-simple-notice",
  role: "alert"
}, ri = ["role"], ui = { class: "vb-simple-footnote" }, di = { class: "vb-simple-privacy" }, ci = ["src", "alt"], vi = {
  key: 1,
  class: "vb-chat-text-preview"
}, mi = { class: "vb-data-note" }, mn = "weiheng.ai-diet-chat.v1", pi = /* @__PURE__ */ Je({
  __name: "AiDietAssistantPage",
  props: {
    active: { type: Boolean, default: !0 },
    records: { default: () => [] },
    targets: { default: null },
    profile: { default: null }
  },
  setup(t) {
    const l = t, n = [
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
        const I = JSON.parse(we.getItem(mn) || "null");
        if (!I || typeof I != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0 };
        const _ = I, C = Array.isArray(_.threads) ? _.threads.flatMap((oe) => {
          if (!oe || typeof oe != "object") return [];
          const Q = oe;
          return typeof Q.id != "string" || !Fe(Q.date) || !Array.isArray(Q.messages) ? [] : [{
            id: Q.id,
            date: Q.date,
            createdAt: typeof Q.createdAt == "string" ? Q.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: Q.messages.filter((ve) => !!(ve && typeof ve == "object" && ["user", "assistant"].includes(ve.role) && typeof ve.content == "string")).map((ve) => ve.status === "sending" ? { ...ve, status: "failed", error: "页面刷新时请求中断。点击重试可继续这条问题。" } : ve)
          }];
        }) : [], Y = _.activeByDate && typeof _.activeByDate == "object" ? Object.fromEntries(Object.entries(_.activeByDate).filter(([oe, Q]) => Fe(oe) && typeof Q == "string")) : {};
        return { threads: C.slice(-60), activeByDate: Y, memoryEnabled: _.memoryEnabled !== !1 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0 };
      }
    }
    const u = i(), r = M(u.threads), c = M(un(u, u.activeByDate)), m = /* @__PURE__ */ new Set(), v = M(u.memoryEnabled), p = M(ke()), b = M(""), k = M(null), h = M([]), T = M({}), S = M(null), w = G(() => h.value.some((I) => I.status === "ready"));
    let A = 0;
    const R = M(""), D = M(""), N = M(null), V = M(null), H = G(() => r.value.some((I) => I.messages.some((_) => _.status === "sending"))), O = G(() => l.records.find((I) => I.date === p.value)), K = G(() => O.value?.entries || []), W = G(() => ({
      energy: typeof l.targets?.tdee == "number" ? l.targets.tdee : null,
      protein: l.targets?.macros?.find((I) => I.id === "protein")?.grams ?? null,
      carbs: l.targets?.macros?.find((I) => I.id === "carbs")?.grams ?? null,
      fat: l.targets?.macros?.find((I) => I.id === "fat")?.grams ?? null
    })), ye = G(() => r.value.find((I) => I.id === c.value[p.value])), le = G(() => ye.value?.messages || []), { showJump: he, onScroll: X, onContentLoad: B, jumpToLatest: E } = Wl({ viewport: N, content: V, active: G(() => l.active), thread: G(() => ye.value?.id), messages: le }), se = G(() => r.value.filter((I) => I.messages.length).sort((I, _) => _.createdAt.localeCompare(I.createdAt)));
    function ne(I) {
      const _ = I.target.value, C = r.value.find((Y) => Y.id === _);
      C && (p.value = C.date, c.value[C.date] = C.id);
    }
    function J(I) {
      const _ = le.value, C = _.findIndex((Y) => Y.id === I);
      return _.slice(0, C).reverse().find((Y) => Y.role === "user")?.content || "";
    }
    function x(I) {
      const { id: _, kind: C, name: Y, size: oe, mimeType: Q } = I;
      return { id: _, kind: C, name: Y, size: oe, mimeType: Q };
    }
    function y(I) {
      return I >= 1024 * 1024 ? `${(I / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(I / 1024))} KB`;
    }
    async function f(I) {
      const _ = A;
      D.value = "";
      for (const C of I) {
        if (_ !== A) break;
        if (h.value.length >= ta) {
          D.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let Y;
        try {
          Y = Rn(C);
        } catch (Q) {
          D.value = Q instanceof Error ? Q.message : "这个文件暂不支持。";
          continue;
        }
        const oe = d();
        h.value.push({ id: oe, kind: Y, name: C.name.slice(0, 180), size: C.size, mimeType: C.type, status: "reading" });
        try {
          const Q = await ma(C, oe);
          if (!h.value.some((be) => be.id === oe)) continue;
          if (h.value.reduce((be, Ie) => be + (Ie.value?.text?.length || 0), Q.text?.length || 0) > vn) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await ra(Q);
          const fe = h.value.find((be) => be.id === oe);
          if (!fe) {
            await ut(oe);
            continue;
          }
          T.value[oe] = Q, fe.value = Q, fe.status = "ready";
        } catch (Q) {
          const ve = h.value.find((fe) => fe.id === oe);
          ve && (ve.status = "failed", ve.error = Q instanceof Error ? Q.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function j(I) {
      const _ = I.target, C = Array.from(_.files || []);
      _.value = "", f(C);
    }
    function re(I) {
      const _ = Array.from(I.clipboardData?.files || []).filter((C) => C.type.startsWith("image/"));
      _.length && (I.preventDefault(), f(_));
    }
    function ie(I) {
      I.dataTransfer?.types.includes("Files") && I.preventDefault();
    }
    function _t(I) {
      const _ = Array.from(I.dataTransfer?.files || []);
      _.length && (I.preventDefault(), f(_));
    }
    function He(I) {
      h.value = h.value.filter((_) => _.id !== I), delete T.value[I], ut(I).catch(() => {
        D.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function Ct() {
      const I = h.value.flatMap((C) => C.status === "ready" && C.value ? [C.value] : []), _ = new Set(I.map((C) => C.id));
      return h.value = h.value.filter((C) => !_.has(C.id)), I;
    }
    async function Ke(I) {
      try {
        const _ = T.value[I.id] || await Nt(I.id);
        if (!_) throw new Error("附件已不在本地存储中，请重新添加。");
        S.value = _;
      } catch (_) {
        D.value = _ instanceof Error ? _.message : "无法预览附件。";
      }
    }
    de(() => le.value.flatMap((I) => I.attachments || []).map((I) => I.id).join(","), async () => {
      for (const I of le.value.flatMap((_) => _.attachments || []))
        if (!T.value[I.id])
          try {
            const _ = await Nt(I.id);
            _ && (T.value[I.id] = _);
          } catch {
          }
    }, { immediate: !0 });
    function We(I) {
      const _ = { id: d(), date: I, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (r.value.push(_), r.value.length > 60) {
        const C = r.value.splice(0, r.value.length - 60);
        lt(C.flatMap((Y) => Y.messages));
      }
      return c.value[I] = _.id, _;
    }
    function lt(I) {
      for (const _ of I.flatMap((C) => C.attachments || []))
        delete T.value[_.id], ut(_.id).catch(() => {
          R.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function Me(I) {
      const _ = c.value[I];
      if (_ && r.value.some((Y) => Y.id === _)) return;
      const C = r.value.filter((Y) => Y.date === I).sort((Y, oe) => oe.createdAt.localeCompare(Y.createdAt))[0];
      C ? c.value[I] = C.id : We(I);
    }
    Me(p.value), de(p, (I) => {
      if (!Fe(I) || I > ke()) {
        p.value = ke();
        return;
      }
      Me(I), D.value = "";
    });
    let Ye = !1, Z = !1;
    function q() {
      if (H.value) {
        Z = !0;
        return;
      }
      Z = !1, Ye = !0;
      const I = i();
      r.value = I.threads, c.value = un(I, c.value, [...m]), v.value = I.memoryEnabled, Me(p.value), Ee(() => {
        Ye = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", q), Ve(() => window.removeEventListener("weiheng-chat-synced", q));
    let ee;
    function ge() {
      if (ee && clearTimeout(ee), ee = void 0, !Le())
        try {
          we.setItem(mn, JSON.stringify({ threads: r.value, activeByDate: c.value, memoryEnabled: v.value })), R.value = "";
        } catch {
          R.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function At() {
      Ye || (ee && clearTimeout(ee), ee = setTimeout(ge, 160));
    }
    de([r, c, v], At, { deep: !0 });
    function at() {
      ge();
    }
    typeof window < "u" && (window.addEventListener("pagehide", at), window.addEventListener("weiheng-chat-flush", at)), Ve(() => {
      ge(), typeof window < "u" && (window.removeEventListener("pagehide", at), window.removeEventListener("weiheng-chat-flush", at));
    });
    let Ae;
    function zn() {
      const I = Ae;
      I && (Ae = void 0, I.controller.abort(), I.assistantMessage.status === "sending" && (I.assistantMessage.status = "failed", I.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), ge());
    }
    function On(I) {
      const _ = new Date(I);
      return Number.isNaN(_.getTime()) ? "新对话" : _.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function Fn(I) {
      const _ = new Date(I);
      return Number.isNaN(_.getTime()) ? "" : _.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function Bn() {
      return K.value.map((I) => ({
        foodId: I.foodId,
        name: I.name,
        grams: I.grams,
        meal: I.meal,
        referenceConfirmed: I.referenceConfirmed
      }));
    }
    async function Vn(I, _) {
      const C = I.slice(0, _).filter((fe) => fe.status === "complete"), Y = [];
      for (const { role: fe, content: be, attachments: Ie } of C) {
        const Se = { role: fe, content: be.slice(0, 1200), attachments: Ie };
        fe === "user" ? Y.at(-1)?.role === "user" ? Y[Y.length - 1] = Se : Y.push(Se) : Y.at(-1)?.role === "user" && Y.push(Se);
      }
      for (; Y[0]?.role !== "user"; ) Y.shift();
      const oe = Y.slice(-11);
      for (; oe.reduce((fe, be) => fe + be.content.length, 0) > 9e3; ) oe.splice(0, 2);
      let Q = 0, ve = 0;
      for (let fe = oe.length - 1; fe >= 0; fe--) {
        const be = oe[fe], Ie = [];
        let Se = !1;
        for (const it of be.attachments || []) {
          const Ue = T.value[it.id] || await Nt(it.id);
          if (!Ue) {
            if (fe === oe.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Se = !0;
            continue;
          }
          if (Q + (Ue.text?.length || 0) > vn || Ue.kind === "image" && ve >= oa) {
            Se = !0;
            continue;
          }
          Q += Ue.text?.length || 0, Ue.kind === "image" && ve++, Ie.push(Ue);
        }
        be.attachments = Ie.length ? Ie : void 0, Se && (be.content = be.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return oe;
    }
    async function Yt(I, _, C = []) {
      const Y = I.trim() || (C.length ? "请帮我分析这些附件。" : "");
      if (!Y || Y.length > 1200) return !1;
      zn(), Me(p.value);
      const oe = ye.value;
      if (!oe) return !1;
      let Q, ve;
      if (_) {
        ve = oe.messages.findIndex((Te) => Te.id === _ && Te.role === "assistant");
        const Re = oe.messages[ve - 1];
        if (ve < 1 || Re?.role !== "user")
          return D.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        Q = oe.messages[ve], Q.status = "sending", Q.error = void 0, Q.content = "";
      } else
        oe.messages.push({ id: d(), role: "user", content: Y, attachments: C.length ? C.map(x) : void 0, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), Q = Yl(oe.messages, d(), (/* @__PURE__ */ new Date()).toISOString()), oe.messages.length > 120 && lt(oe.messages.splice(0, oe.messages.length - 120)), ve = oe.messages.length - 1;
      E(), ge(), D.value = "";
      const fe = new AbortController(), be = { controller: fe, assistantMessage: Q };
      Ae = be;
      const Ie = p.value, Se = Bn(), it = W.value, Ue = ea(l.profile), Jn = Zl(r.value, oe.id, v.value);
      try {
        const Re = await Vn(oe.messages, ve);
        if (Ae !== be) return !1;
        if (Re.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const Te = await En("chat", {
          date: Ie,
          messages: Re,
          entries: Se,
          targets: it,
          profile: Ue,
          memory: Jn
        }, (je) => {
          Ae === be && (je.type === "delta" ? Q.content += je.text : je.type === "done" && (typeof je.content == "string" && (Q.content = je.content), Q.model = je.model, Q.context = je.contextSummary, Q.createdAt = je.generatedAt || (/* @__PURE__ */ new Date()).toISOString()));
        }, fe.signal);
        if (Ae !== be) return !1;
        if (!Q.content.trim() || typeof Te.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return Q.model = Te.model, Q.context = Te.contextSummary, Q.createdAt = Te.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Q.status = "complete", ge(), is(), !0;
      } catch (Re) {
        return Ae !== be || (Q.status = "failed", Q.error = Re instanceof Error ? Re.message : "AI 暂时无法回复，请重试。", ge()), !1;
      } finally {
        Ae === be && (Ae = void 0), Z && !H.value && q();
      }
    }
    function Xt() {
      const I = b.value.trim();
      if (!I && !w.value || I.length > 1200) return;
      const _ = Ct();
      b.value = "", Yt(I, void 0, _);
    }
    function Qt(I) {
      b.value = I, Ee(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function qn(I) {
      I.key === "Enter" && !I.shiftKey && !I.isComposing && (I.preventDefault(), Xt());
    }
    function Zt(I) {
      const _ = le.value.findIndex((Y) => Y.id === I), C = le.value[_ - 1];
      _ > 0 && C?.role === "user" && Yt(C.content, I);
    }
    function Ln() {
      A++, m.add(We(p.value).id);
      for (const I of h.value) He(I.id);
      D.value = "";
    }
    function Gn() {
      if (!window.confirm("清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。")) return;
      const I = r.value.flatMap((_) => _.messages.flatMap((C) => C.attachments || []));
      for (const _ of I)
        delete T.value[_.id], ut(_.id).catch(() => {
          R.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      as(), r.value = [], c.value = {}, R.value = "", Me(p.value), D.value = "当前空间的聊天记录已清除。";
    }
    return (I, _) => (s(), o("section", pa, [
      e("header", ba, [
        _[15] || (_[15] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡AI助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", ga, [
          e("label", fa, [
            U(z, {
              name: "calendar",
              size: 16
            }),
            _[9] || (_[9] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            te(e("input", {
              "onUpdate:modelValue": _[0] || (_[0] = (C) => p.value = C),
              type: "date",
              max: g(ke)(),
              disabled: H.value,
              "aria-label": "选择饮食日期"
            }, null, 8, ya), [
              [ue, p.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: Ln
          }, [
            U(z, {
              name: "plus",
              size: 16
            }),
            _[10] || (_[10] = P("新对话", -1))
          ]),
          e("details", ha, [
            e("summary", ka, [
              _[11] || (_[11] = P("更多", -1)),
              U(z, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", wa, [
              se.value.length ? (s(), o("label", $a, [
                _[12] || (_[12] = P(" 历史对话 ", -1)),
                e("select", {
                  value: ye.value?.id,
                  disabled: H.value,
                  "aria-label": "切换历史对话",
                  onChange: ne
                }, [
                  le.value.length ? $("", !0) : (s(), o("option", {
                    key: 0,
                    value: ye.value?.id
                  }, "当前新对话", 8, Ca)),
                  (s(!0), o(F, null, L(se.value, (C) => (s(), o("option", {
                    key: C.id,
                    value: C.id
                  }, a(C.date) + " · " + a(On(C.createdAt)) + " · " + a(C.messages.length) + " 条消息", 9, Aa))), 128))
                ], 40, _a)
              ])) : $("", !0),
              e("label", Ia, [
                te(e("input", {
                  "onUpdate:modelValue": _[1] || (_[1] = (C) => v.value = C),
                  type: "checkbox"
                }, null, 512), [
                  [dt, v.value]
                ]),
                _[13] || (_[13] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              _[14] || (_[14] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: H.value,
                onClick: Gn
              }, "清除本地记录", 8, Sa)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: N,
        class: pe(["vb-simple-scroll", { "is-empty": !le.value.length }]),
        onScrollPassive: _[2] || (_[2] = //@ts-ignore
        (...C) => g(X) && g(X)(...C)),
        onLoadCapture: _[3] || (_[3] = //@ts-ignore
        (...C) => g(B) && g(B)(...C)),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        le.value.length ? (s(), o("div", {
          key: 1,
          ref_key: "conversationContent",
          ref: V,
          class: "vb-simple-thread"
        }, [
          (s(!0), o(F, null, L(le.value, (C) => (s(), o("article", {
            key: C.id,
            class: pe(["vb-simple-message", [`is-${C.role}`, `is-${C.status}`]])
          }, [
            C.role === "assistant" ? (s(), o("span", ja, [
              U(z, {
                name: "sparkles",
                size: 18
              })
            ])) : $("", !0),
            e("div", Da, [
              C.attachments?.length ? (s(), o("div", Pa, [
                (s(!0), o(F, null, L(C.attachments, (Y) => (s(), o("button", {
                  key: Y.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + Y.name,
                  onClick: (oe) => Ke(Y)
                }, [
                  Y.kind === "image" && T.value[Y.id]?.dataUrl ? (s(), o("img", {
                    key: 0,
                    src: T.value[Y.id].dataUrl,
                    alt: Y.name
                  }, null, 8, Ma)) : (s(), me(z, {
                    key: 1,
                    name: Y.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, a(Y.name), 1),
                    e("small", null, a(Y.kind === "image" ? "照片" : "文件文字") + " · " + a(y(Y.size)), 1)
                  ])
                ], 8, Na))), 128))
              ])) : $("", !0),
              C.status === "sending" && !C.content ? (s(), o("div", Ra, [..._[18] || (_[18] = [
                e("span", { class: "vb-loading-ring" }, null, -1),
                e("span", null, "正在回复…", -1)
              ])])) : C.status === "sending" ? (s(), o("p", Ta, [
                P(a(C.content), 1),
                _[19] || (_[19] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : C.status === "failed" ? (s(), o(F, { key: 3 }, [
                C.content ? (s(), o("p", za, a(C.content), 1)) : $("", !0),
                e("p", Oa, a(C.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (Y) => Zt(C.id)
                }, [
                  U(z, {
                    name: "activity",
                    size: 14
                  }),
                  _[20] || (_[20] = P("重试这条问题", -1))
                ], 8, Fa)
              ], 64)) : C.role !== "assistant" || !g(Ot)(J(C.id)) ? (s(), o("p", Ba, a(C.content), 1)) : $("", !0),
              C.role === "assistant" && C.status === "complete" && C.content.trim() && g(Ot)(J(C.id)) ? (s(), me(Hl, {
                key: 5,
                content: C.content,
                question: J(C.id),
                auto: le.value.at(-1)?.id === C.id,
                onRetry: (Y) => Zt(C.id)
              }, null, 8, ["content", "question", "auto", "onRetry"])) : $("", !0),
              C.status === "complete" ? (s(), o("small", Va, [
                P(a(Fn(C.createdAt)), 1),
                C.role === "assistant" ? (s(), o(F, { key: 0 }, [
                  P(" · " + a(C.model || "DeepSeek"), 1)
                ], 64)) : $("", !0)
              ])) : $("", !0)
            ])
          ], 2))), 128))
        ], 512)) : (s(), o("div", {
          key: 0,
          ref_key: "conversationContent",
          ref: V,
          class: "vb-simple-welcome"
        }, [
          _[16] || (_[16] = e("h2", null, "今天想聊些什么？", -1)),
          _[17] || (_[17] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", xa, [
            (s(), o(F, null, L(n, (C) => e("button", {
              key: C,
              type: "button",
              onClick: (Y) => Qt(C)
            }, [
              e("span", null, a(C), 1),
              U(z, {
                name: "arrow",
                size: 16
              })
            ], 8, Ea)), 64))
          ]),
          e("small", Ua, "饮食参考日期：" + a(p.value), 1)
        ], 512))
      ], 34),
      e("footer", qa, [
        g(he) ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "vb-chat-jump-bottom",
          "aria-label": "回到最新消息",
          title: "一键到底",
          onClick: _[4] || (_[4] = //@ts-ignore
          (...C) => g(E) && g(E)(...C))
        }, [
          U(z, {
            name: "arrow",
            size: 20
          })
        ])) : $("", !0),
        e("div", La, [
          le.value.length ? (s(), o("div", Ga, [
            e("details", Ja, [
              e("summary", null, [
                _[21] || (_[21] = P("快捷提问", -1)),
                U(z, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", Ha, [
                (s(), o(F, null, L(n, (C) => e("button", {
                  key: C,
                  type: "button",
                  onClick: (Y) => Qt(C)
                }, [
                  P(a(C), 1),
                  U(z, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, Ka)), 64))
              ])
            ]),
            H.value ? (s(), o("span", Wa, "正在回复，发送新消息可打断")) : $("", !0)
          ])) : $("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: ie,
            onDrop: _t
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: k,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: g(la),
              "aria-label": "选择照片或文件",
              onChange: j
            }, null, 40, Ya),
            h.value.length ? (s(), o("div", Xa, [
              (s(!0), o(F, null, L(h.value, (C) => (s(), o("div", {
                key: C.id,
                class: pe(["vb-chat-file", { "is-failed": C.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: C.status !== "ready",
                  "aria-label": "预览附件：" + C.name,
                  onClick: (Y) => Ke(C)
                }, [
                  C.value?.dataUrl ? (s(), o("img", {
                    key: 0,
                    src: C.value.dataUrl,
                    alt: C.name
                  }, null, 8, Za)) : (s(), me(z, {
                    key: 1,
                    name: C.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, a(C.name), 1),
                    C.status === "reading" ? (s(), o("small", ei, "正在读取…")) : C.status === "failed" ? (s(), o("small", ti, a(C.error), 1)) : (s(), o("small", ni, a(y(C.size)) + " · 待发送", 1))
                  ])
                ], 8, Qa),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + C.name,
                  onClick: (Y) => He(C.id)
                }, [
                  U(z, {
                    name: "close",
                    size: 13
                  })
                ], 8, si)
              ], 2))), 128))
            ])) : $("", !0),
            _[24] || (_[24] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            te(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": _[5] || (_[5] = (C) => b.value = C),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: qn,
              onPaste: re
            }, null, 544), [
              [ue, b.value]
            ]),
            e("div", oi, [
              e("div", li, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: _[6] || (_[6] = (C) => k.value?.click())
                }, [
                  U(z, {
                    name: "paperclip",
                    size: 18
                  }),
                  _[22] || (_[22] = e("span", null, "附件", -1))
                ]),
                _[23] || (_[23] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !b.value.trim() && !w.value,
                onClick: _[7] || (_[7] = (C) => Xt())
              }, [
                U(z, {
                  name: "arrow",
                  size: 16
                }),
                P(a(H.value ? "打断并发送" : "发送"), 1)
              ], 8, ai)
            ])
          ], 32),
          g(_e) && g(ls) === "error" ? (s(), o("p", ii, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : $("", !0),
          R.value || D.value ? (s(), o("p", {
            key: 2,
            class: "vb-simple-notice",
            role: R.value ? "alert" : "status"
          }, a(R.value || D.value), 9, ri)) : $("", !0),
          e("div", ui, [
            e("details", di, [
              e("summary", null, [
                U(z, {
                  name: "lock",
                  size: 12
                }),
                _[25] || (_[25] = P("隐私与使用说明", -1))
              ]),
              _[26] || (_[26] = e("div", { class: "vb-simple-privacy-panel" }, [
                e("p", null, "附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。"),
                e("p", null, "选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给 DeepSeek，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。"),
                e("p", null, "点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 DeepSeek 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。"),
                e("p", null, "跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。"),
                e("p", null, "饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。")
              ], -1))
            ]),
            e("span", null, a(b.value.length ? `${b.value.length}/1200` : "AI 内容仅供参考"), 1)
          ])
        ])
      ]),
      S.value ? (s(), me(ot, {
        key: 0,
        title: S.value.name,
        wide: "",
        onClose: _[8] || (_[8] = (C) => S.value = null)
      }, {
        default: st(() => [
          S.value.kind === "image" ? (s(), o("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: S.value.dataUrl,
            alt: S.value.name
          }, null, 8, ci)) : (s(), o("pre", vi, a(S.value.text), 1)),
          e("p", mi, a(S.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : $("", !0)
    ]));
  }
}), bi = /* @__PURE__ */ Mn(pi, [["__scopeId", "data-v-bc1d03ec"]]), gi = {
  key: 0,
  class: "vb-page-title"
}, fi = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, yi = ["aria-pressed", "onClick"], hi = { class: "vb-glass vb-review-hero" }, ki = { class: "vb-icon-badge vb-large-badge" }, wi = { class: "vb-small-label" }, $i = { class: "vb-coverage-score" }, _i = { class: "vb-assessment-grid" }, Ci = { class: "vb-glass vb-coverage-card" }, Ai = { class: "vb-section-heading" }, Ii = { class: "vb-coverage-list" }, Si = { class: "vb-food-category-icon" }, xi = { class: "vb-coverage-name" }, Ei = { key: 0 }, Ui = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, ji = { class: "vb-inline-note" }, Di = { class: "vb-glass vb-suggestion-card" }, Pi = ["checked", "onChange"], Ni = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, Mi = { class: "vb-empty-icon" }, Ri = { class: "vb-glass vb-supplement-card" }, Ti = { class: "vb-icon-badge" }, zi = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const l = t, n = M(l.records[0]?.date || "");
    de(() => l.records, (b) => {
      b.some((k) => k.date === n.value) || (n.value = b[0]?.date || "");
    });
    const d = G(() => l.records.find((b) => b.date === n.value)), i = (b) => Number(d.value?.foods?.[b]) || 0, u = G(() => St.filter((b) => i(b.key) <= 0)), r = G(() => St.length - u.value.length), c = G(() => Math.max(1, ...bt.map((b) => i(b.key)))), m = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, v = G(() => (u.value.length ? u.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map((b) => ({ key: b.key, title: m[b.key]?.[0] || (b.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: m[b.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), p = (b) => (l.habits[n.value] || []).includes(b);
    return (b, k) => (s(), o(F, null, [
      t.embedded ? $("", !0) : (s(), o("div", gi, [
        k[4] || (k[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: k[0] || (k[0] = (h) => b.$emit("navigate", "diary"))
        }, [
          U(z, {
            name: "plus",
            size: 17
          }),
          k[3] || (k[3] = P("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (s(), o("div", fi, [
        (s(!0), o(F, null, L(t.records.slice(0, 7), (h) => (s(), o("button", {
          key: h.date,
          class: pe({ selected: n.value === h.date }),
          "aria-pressed": n.value === h.date,
          onClick: (T) => n.value = h.date
        }, a(h.date), 11, yi))), 128))
      ])) : $("", !0),
      d.value ? (s(), o(F, { key: 2 }, [
        e("section", hi, [
          e("span", ki, [
            U(z, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", wi, a(d.value.date) + " · 饮食回顾", 1),
            e("h2", null, a(u.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, a(u.value.length ? u.value.map((h) => h.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", $i, [
            e("strong", null, [
              P(a(r.value), 1),
              e("small", null, " / " + a(g(St).length), 1)
            ]),
            k[5] || (k[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", _i, [
          e("section", Ci, [
            e("div", Ai, [
              k[6] || (k[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              U(z, { name: "chart" })
            ]),
            e("div", Ii, [
              (s(!0), o(F, null, L(g(bt), (h) => (s(), o("div", {
                key: h.key,
                class: "vb-coverage-row"
              }, [
                e("span", Si, [
                  U(z, {
                    name: g(wn)[h.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", xi, [
                  P(a(h.name), 1),
                  h.key === "snacks" ? (s(), o("small", Ei, "可选记录")) : $("", !0)
                ]),
                e("span", Ui, [
                  e("i", {
                    style: gn({ width: i(h.key) / c.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: pe(["vb-coverage-value", { "is-missing": !i(h.key) }])
                }, a(i(h.key) ? `${Math.round(i(h.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", ji, [
              U(z, {
                name: "info",
                size: 15
              }),
              k[7] || (k[7] = P("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", Di, [
            k[8] || (k[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (s(!0), o(F, null, L(v.value, (h) => (s(), o("label", {
              key: h.key,
              class: pe(["vb-check-row", { done: p(h.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: p(h.key),
                onChange: (T) => b.$emit("toggle-habit", n.value, h.key)
              }, null, 40, Pi),
              e("span", null, [
                e("strong", null, a(h.title), 1),
                e("small", null, a(h.detail), 1)
              ])
            ], 2))), 128)),
            k[9] || (k[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (s(), o("section", Ni, [
        e("span", Mi, [
          U(z, {
            name: "bowl",
            size: 36
          })
        ]),
        k[11] || (k[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        k[12] || (k[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: k[1] || (k[1] = (h) => b.$emit("navigate", "diary"))
        }, [
          k[10] || (k[10] = P("记录今天的饮食", -1)),
          U(z, {
            name: "arrow",
            size: 17
          })
        ])
      ])),
      e("section", Ri, [
        e("span", Ti, [
          U(z, {
            name: "shield",
            size: 23
          })
        ]),
        e("div", null, [
          k[13] || (k[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, a(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, a(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: k[2] || (k[2] = (h) => b.$emit("navigate", "about"))
        }, [
          k[14] || (k[14] = P("查看注意事项", -1)),
          U(z, {
            name: "arrow",
            size: 17
          })
        ])
      ])
    ], 64));
  }
}, Oi = {
  key: 0,
  class: "vb-page-title"
}, Fi = { class: "vb-date-input" }, Bi = {
  key: 1,
  class: "vb-report-toolbar"
}, Vi = { class: "vb-date-input" }, qi = {
  key: 2,
  class: "vb-report-filter"
}, Li = {
  key: 3,
  class: "vb-report-list"
}, Gi = { class: "vb-report-card-top" }, Ji = { class: "vb-icon-badge" }, Hi = {
  key: 0,
  class: "vb-feature-error"
}, Ki = {
  key: 1,
  class: "vb-inline-warning"
}, Wi = { class: "vb-report-card-actions" }, Yi = ["onClick"], Xi = ["disabled", "onClick"], Qi = {
  key: 4,
  class: "vb-glass vb-report-empty"
}, Zi = { class: "vb-icon-badge" }, er = /* @__PURE__ */ Je({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = M(""), { isStale: u } = Jt(), r = G(() => n.reports.filter((v) => !i.value || v.date === i.value));
    function c(v) {
      return n.records.find((p) => p.date === v.date);
    }
    function m(v) {
      return u(v, c(v), n.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[v.status];
    }
    return (v, p) => (s(), o(F, null, [
      t.embedded ? (s(), o("div", Bi, [
        p[5] || (p[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", Vi, [
          U(z, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": p[1] || (p[1] = (b) => i.value = b),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ue, i.value]
          ])
        ])
      ])) : (s(), o("div", Oi, [
        p[4] || (p[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", Fi, [
          U(z, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": p[0] || (p[0] = (b) => i.value = b),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ue, i.value]
          ])
        ])
      ])),
      p[9] || (p[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给 DeepSeek；照片和备注不随每日分析发送。", -1)),
      i.value ? (s(), o("div", qi, [
        e("span", null, a(r.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: p[2] || (p[2] = (b) => i.value = "")
        }, "清除日期筛选")
      ])) : $("", !0),
      r.value.length ? (s(), o("div", Li, [
        (s(!0), o(F, null, L(r.value, (b) => (s(), o("article", {
          key: b.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", Gi, [
            e("span", Ji, [
              U(z, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, a(b.date), 1),
              e("small", null, a(new Date(b.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: pe(["vb-pill", { "needs-update": m(b) === "需更新" }])
            }, a(m(b)), 3)
          ]),
          e("p", null, a(b.result?.summary || b.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          c(b) ? g(u)(b, c(b), t.profile) ? (s(), o("small", Ki, "记录或个人目标已变化，此报告使用的是旧版本。")) : $("", !0) : (s(), o("small", Hi, "对应记录已删除，保留报告快照。")),
          e("div", Wi, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (k) => d("open", b.date, b.id)
            }, [
              p[6] || (p[6] = P("打开报告", -1)),
              U(z, {
                name: "arrow",
                size: 15
              })
            ], 8, Yi),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: b.status === "pending" || !c(b),
              onClick: (k) => d("retry", b.date)
            }, "重新分析", 8, Xi)
          ])
        ]))), 128))
      ])) : (s(), o("section", Qi, [
        e("span", Zi, [
          U(z, {
            name: "report",
            size: 25
          })
        ]),
        e("h2", null, a(i.value ? "这一天还没有报告" : "从记录第一餐开始"), 1),
        p[8] || (p[8] = e("p", null, "保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: p[3] || (p[3] = (b) => d("navigate", "diary"))
        }, [
          p[7] || (p[7] = P("去记录饮食", -1)),
          U(z, {
            name: "arrow",
            size: 17
          })
        ])
      ]))
    ], 64));
  }
}), tr = { class: "vb-page-title" }, nr = {
  class: "vb-assessment-block",
  "aria-labelledby": "diet-assessment-heading"
}, sr = {
  class: "vb-assessment-block vb-assessment-reports",
  "aria-labelledby": "ai-report-heading"
}, or = /* @__PURE__ */ Je({
  __name: "AiNutritionAssessmentPage",
  props: {
    records: {},
    habits: {},
    flags: {},
    reports: {},
    profile: {}
  },
  emits: ["navigate", "toggleHabit", "openReport", "retryReport"],
  setup(t, { emit: l }) {
    const n = l;
    function d(i, u) {
      n("openReport", i, u);
    }
    return (i, u) => (s(), o(F, null, [
      e("div", tr, [
        u[6] || (u[6] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从饮食回顾到 AI 分析"),
          e("h1", null, "营养摄入分析与不足风险提示"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: u[0] || (u[0] = (r) => n("navigate", "diary"))
        }, [
          U(z, {
            name: "plus",
            size: 17
          }),
          u[5] || (u[5] = P("添加饮食记录 ", -1))
        ])
      ]),
      U(Zn, {
        records: t.records,
        profile: t.profile || void 0
      }, null, 8, ["records", "profile"]),
      e("section", nr, [
        u[7] || (u[7] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "饮食结构回顾"),
            e("h2", { id: "diet-assessment-heading" }, "食物类别评估")
          ]),
          e("span", { class: "vb-subtle-label" }, "按已保存记录统计")
        ], -1)),
        U(zi, {
          records: t.records,
          habits: t.habits,
          flags: t.flags,
          embedded: "",
          onNavigate: u[1] || (u[1] = (r) => n("navigate", r)),
          onToggleHabit: u[2] || (u[2] = (r, c) => n("toggleHabit", r, c))
        }, null, 8, ["records", "habits", "flags"])
      ]),
      e("section", sr, [
        u[8] || (u[8] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "每日 AI 分析"),
            e("h2", { id: "ai-report-heading" }, "AI 营养报告")
          ]),
          e("span", { class: "vb-subtle-label" }, "可按日期筛选、查看和重试")
        ], -1)),
        U(er, {
          reports: t.reports,
          records: t.records,
          profile: t.profile,
          embedded: "",
          onOpen: d,
          onRetry: u[3] || (u[3] = (r) => n("retryReport", r)),
          onNavigate: u[4] || (u[4] = (r) => n("navigate", r))
        }, null, 8, ["reports", "records", "profile"])
      ])
    ], 64));
  }
}), lr = { class: "vb-photo-picker" }, ar = {
  key: 0,
  class: "vb-photo-preview"
}, ir = ["src"], rr = { class: "vb-photo-actions" }, ur = ["disabled"], dr = ["disabled"], cr = {
  key: 1,
  class: "vb-photo-hint",
  role: "status"
}, vr = {
  key: 2,
  class: "vb-photo-error",
  role: "alert"
}, mr = ["src"], pr = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: l }) {
    const n = l, d = M(!1), i = M(null), u = M(null), r = M(""), c = M(!1);
    function m(T) {
      return new Promise((S, w) => {
        const A = URL.createObjectURL(T), R = new Image();
        R.onload = () => S({ image: R, url: A }), R.onerror = () => {
          URL.revokeObjectURL(A), w(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, R.src = A;
      });
    }
    function v(T, S) {
      return new Promise((w, A) => T.toBlob((R) => R ? w(R) : A(new Error("图片处理失败，请重新选择。")), "image/jpeg", S));
    }
    function p(T) {
      return new Promise((S, w) => {
        const A = new FileReader();
        A.onload = () => S(A.result), A.onerror = () => w(new Error("图片读取失败，请重新选择。")), A.readAsDataURL(T);
      });
    }
    async function b(T) {
      let S;
      try {
        const w = await createImageBitmap(T);
        S = { image: w, width: w.width, height: w.height, cleanup: () => w.close() };
      } catch {
        const w = await m(T);
        S = { image: w.image, width: w.image.naturalWidth, height: w.image.naturalHeight, cleanup: () => URL.revokeObjectURL(w.url) };
      }
      try {
        const w = Math.min(1, 1200 / Math.max(S.width, S.height)), A = document.createElement("canvas");
        A.width = Math.max(1, Math.round(S.width * w)), A.height = Math.max(1, Math.round(S.height * w));
        const R = A.getContext("2d");
        if (!R) throw new Error("浏览器暂不支持图片预览。");
        R.drawImage(S.image, 0, 0, A.width, A.height);
        let D = await v(A, 0.76);
        if (D.size > 32e4 && (D = await v(A, 0.58)), D.size > 32e4) {
          const N = document.createElement("canvas");
          N.width = Math.round(A.width * 0.75), N.height = Math.round(A.height * 0.75), N.getContext("2d")?.drawImage(A, 0, 0, N.width, N.height), D = await v(N, 0.58);
        }
        return await p(D);
      } finally {
        S.cleanup();
      }
    }
    async function k(T, S) {
      const w = T.target, A = w.files?.[0];
      if (w.value = "", !!A) {
        if (r.value = "", !A.type.startsWith("image/") || A.type === "image/svg+xml") {
          r.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if (A.size > 12 * 1024 * 1024) {
          r.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        c.value = !0;
        try {
          const R = await b(A), D = { name: A.name.slice(0, 100), dataUrl: R, source: S, mime: "image/jpeg" };
          n("update:modelValue", D), n("selected", D);
        } catch (R) {
          r.value = R instanceof Error ? R.message : "无法处理这张图片，请重新选择。";
        } finally {
          c.value = !1;
        }
      }
    }
    function h() {
      r.value = "", n("update:modelValue", null);
    }
    return (T, S) => (s(), o("div", lr, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: S[0] || (S[0] = (w) => k(w, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: u,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: S[1] || (S[1] = (w) => k(w, "本地图片"))
      }, null, 544),
      t.modelValue ? (s(), o("div", ar, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: S[2] || (S[2] = (w) => d.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, ir)
        ]),
        e("span", null, [
          e("strong", null, a(t.modelValue.name), 1),
          e("small", null, a(t.modelValue.source) + " · 点击图片查看大图", 1)
        ]),
        e("button", {
          type: "button",
          class: "vb-icon-button",
          "aria-label": "移除照片",
          onClick: h
        }, [
          U(z, {
            name: "close",
            size: 15
          })
        ])
      ])) : $("", !0),
      e("div", rr, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: c.value,
          onClick: S[3] || (S[3] = (w) => i.value?.click())
        }, [
          U(z, {
            name: "camera",
            size: 17
          }),
          S[6] || (S[6] = P("拍照", -1))
        ], 8, ur),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: c.value,
          onClick: S[4] || (S[4] = (w) => u.value?.click())
        }, [
          U(z, {
            name: "upload",
            size: 17
          }),
          P(a(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, dr)
      ]),
      c.value ? (s(), o("p", cr, "正在准备图片…")) : r.value ? (s(), o("p", vr, a(r.value), 1)) : $("", !0),
      d.value && t.modelValue ? (s(), me(ot, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: S[5] || (S[5] = (w) => d.value = !1)
      }, {
        default: st(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, mr)
        ]),
        _: 1
      })) : $("", !0)
    ]));
  }
}, br = { class: "vb-glass vb-photo-card" }, gr = { class: "vb-aside-heading" }, fr = { class: "vb-photo-badge" }, yr = {
  key: 0,
  class: "vb-feature-error",
  role: "alert"
}, hr = {
  key: 1,
  class: "vb-ai-progress",
  role: "status"
}, kr = {
  key: 2,
  class: "vb-recognition-failed"
}, wr = {
  class: "vb-feature-error",
  role: "alert"
}, $r = {
  key: 4,
  class: "vb-recognition-results"
}, _r = { class: "vb-data-note" }, Cr = {
  key: 0,
  class: "vb-recognition-meta"
}, Ar = { key: 0 }, Ir = { class: "vb-recognized-list" }, Sr = ["value", "disabled", "aria-label", "onInput"], xr = ["aria-label", "onClick"], Er = {
  key: 0,
  class: "vb-recognition-matches"
}, Ur = ["onClick"], jr = { class: "vb-recognition-weight" }, Dr = ["onUpdate:modelValue", "disabled", "aria-label"], Pr = {
  key: 1,
  class: "vb-data-note"
}, Nr = { class: "vb-recognition-actions" }, Mr = ["disabled"], Rr = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object },
  emits: ["confirm"],
  setup(t, { emit: l }) {
    const n = t, d = l, { state: i } = Lt(), u = M(null), r = M("");
    let c = "";
    const m = G(() => n.draft.recognition), v = G(() => {
      const D = m.value?.generatedAt;
      if (!D) return "";
      const N = new Date(D);
      return Number.isNaN(N.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(N);
    }), p = G(() => m.value?.items?.length && !m.value.confirmed && m.value.items.every((D) => D.name?.trim() && Number.isFinite(Number(D.grams)) && Number(D.grams) >= 0.1 && Number(D.grams) <= 5e3));
    de(() => [n.draft.date, n.draft.photoId], async ([D, N]) => {
      r.value = "", u.value = null, n.draft.recognition?.status === "pending" && c !== n.draft.recognition.requestId && (n.draft.recognition = { ...n.draft.recognition, status: "failed", error: "上次识别未完成，请重新识别。" });
      try {
        if (N) {
          const V = await fs("photos", N);
          n.draft.date === D && n.draft.photoId === N && (u.value = V || null);
        } else if (n.legacyPhoto?.dataUrl) {
          const V = { ...n.legacyPhoto, id: crypto.randomUUID(), date: D };
          await zt("photos", V), n.draft.date === D && (n.draft.photoId = V.id, u.value = V);
        }
      } catch (V) {
        r.value = V.message, u.value = n.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function b(D) {
      u.value = D, D || k();
    }
    async function k() {
      const D = n.draft.photoId;
      if (n.draft.photoId = null, n.draft.recognition = null, c = "", D && !i.records.some((N) => N.photoId === D) && !Object.values(i.drafts).some((N) => N.photoId === D)) try {
        await hs("photos", D);
      } catch (N) {
        r.value = N.message;
      }
    }
    async function h(D) {
      const N = n.draft.date, V = crypto.randomUUID();
      r.value = "";
      try {
        const H = { ...D, id: V, date: N, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await zt("photos", H), n.draft.date !== N) return;
        u.value = H, n.draft.photoId = V, n.draft.recognition = null, await T(H);
      } catch (H) {
        r.value = H.message;
      }
    }
    async function T(D = u.value) {
      if (!D?.dataUrl || m.value?.status === "pending") return;
      const N = n.draft, V = N.photoId, H = crypto.randomUUID();
      c = H, N.recognition = { requestId: H, photoId: V, status: "pending", items: [], error: "", confirmed: !1 };
      try {
        const O = await wt("recognize", { image: D.dataUrl, requestId: V || H });
        if (N.photoId !== V || N.recognition?.requestId !== H) return;
        N.recognition = { ...O, requestId: H, photoId: V, status: "complete", error: "", confirmed: !1 };
      } catch (O) {
        N.photoId === V && N.recognition?.requestId === H && (N.recognition = { ...N.recognition, status: "failed", error: O.message });
      } finally {
        c === H && (c = "");
      }
    }
    function S(D, N) {
      D.name = N.target.value, D.foodId = null;
    }
    function w(D, N) {
      D.foodId = N.key, D.name = N.name;
    }
    function A() {
      n.draft.recognition = { ...n.draft.recognition, status: "complete", recognitionId: n.draft.recognition?.recognitionId || crypto.randomUUID(), items: n.draft.recognition?.items || [], confirmed: !1, error: "", note: n.draft.recognition?.note || "手动补充，请核对名称与份量。" }, n.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function R() {
      p.value && d("confirm", { batchId: m.value.recognitionId, items: m.value.items.map((D) => ({ ...D, estimated: !0, source: "photo" })) });
    }
    return (D, N) => (s(), o("section", br, [
      e("div", gr, [
        N[2] || (N[2] = e("div", null, [
          e("h2", null, "这一餐的照片"),
          e("p", null, "拍一餐，核对后再记入。")
        ], -1)),
        e("span", fr, [
          U(z, {
            name: "camera",
            size: 16
          })
        ])
      ]),
      N[6] || (N[6] = e("p", { class: "vb-photo-disclosure" }, "选择照片后自动识别：压缩照片会经本地后端发送给 DeepSeek。照片与识别结果保存在当前浏览器。", -1)),
      U(pr, {
        "model-value": u.value,
        "onUpdate:modelValue": b,
        onSelected: h
      }, null, 8, ["model-value"]),
      r.value ? (s(), o("p", yr, a(r.value), 1)) : $("", !0),
      m.value?.status === "pending" ? (s(), o("div", hr, [...N[3] || (N[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : $("", !0),
      m.value?.status === "failed" ? (s(), o("div", kr, [
        e("p", wr, a(m.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: N[0] || (N[0] = (V) => T())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: A
          }, "手动录入")
        ])
      ])) : $("", !0),
      u.value && !m.value ? (s(), o("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: N[1] || (N[1] = (V) => T())
      }, "开始 AI 识别")) : $("", !0),
      m.value?.status === "complete" ? (s(), o("div", $r, [
        e("p", _r, a(m.value.note || "请核对食物名称与份量。") + " 照片重量为估算，营养数值只按确认的数据库条目计算。", 1),
        m.value.model ? (s(), o("small", Cr, [
          P("由 " + a(m.value.model) + " 识别", 1),
          v.value ? (s(), o("span", Ar, " · " + a(v.value), 1)) : $("", !0)
        ])) : $("", !0),
        e("div", Ir, [
          (s(!0), o(F, null, L(m.value.items, (V, H) => (s(), o("div", {
            key: V.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: V.name,
                disabled: m.value.confirmed,
                "aria-label": "识别食物" + (H + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (O) => S(V, O)
              }, null, 40, Sr),
              m.value.confirmed ? $("", !0) : (s(), o("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (H + 1),
                onClick: (O) => m.value.items.splice(H, 1)
              }, [
                U(z, {
                  name: "close",
                  size: 14
                })
              ], 8, xr))
            ]),
            !V.foodId && !m.value.confirmed ? (s(), o("div", Er, [
              (s(!0), o(F, null, L(g(Vt)(V.name, 3), (O) => (s(), o("button", {
                key: O.key,
                type: "button",
                onClick: (K) => w(V, O)
              }, a(O.name), 9, Ur))), 128))
            ])) : $("", !0),
            e("label", jr, [
              N[4] || (N[4] = P("估算可食部", -1)),
              te(e("input", {
                "onUpdate:modelValue": (O) => V.grams = O,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: m.value.confirmed,
                "aria-label": "识别食物" + (H + 1) + "克数",
                placeholder: "克数"
              }, null, 8, Dr), [
                [ue, V.grams]
              ]),
              N[5] || (N[5] = P("克", -1))
            ]),
            e("small", {
              class: pe({ "vb-unmatched": !V.foodId })
            }, a(V.foodId ? "数据库：" + g(ae)[V.foodId]?.state : "未匹配数据库，营养指标暂无数据"), 3),
            e("small", null, a(V.uncertainty), 1)
          ]))), 128))
        ]),
        m.value.items.length ? $("", !0) : (s(), o("p", Pr, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", Nr, [
          m.value.confirmed ? $("", !0) : (s(), o("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: A
          }, "＋补充遗漏食物")),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !p.value,
            onClick: R
          }, a(m.value.confirmed ? "已加入本次选择" : "确认并加入记录"), 9, Mr)
        ])
      ])) : $("", !0)
    ]));
  }
}, Tr = { class: "vb-diary-page" }, zr = { class: "vb-page-title" }, Or = { class: "vb-date-input" }, Fr = ["max"], Br = {
  key: 0,
  class: "vb-diary-grid"
}, Vr = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, qr = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], Lr = { class: "vb-section-heading" }, Gr = { class: "vb-pill" }, Jr = {
  key: 0,
  class: "vb-selected-list"
}, Hr = {
  key: 1,
  class: "vb-muted-empty"
}, Kr = { class: "vb-section-heading" }, Wr = {
  key: 0,
  class: "vb-history-list"
}, Yr = ["aria-label", "onClick"], Xr = ["onClick"], Qr = ["aria-label", "onClick"], Zr = {
  key: 1,
  class: "vb-muted-empty"
}, eu = { class: "vb-diary-actions" }, tu = ["disabled"], nu = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, su = { class: "vb-section-heading" }, ou = { class: "vb-diary-search-row" }, lu = { class: "vb-search-field" }, au = { class: "vb-meal-select" }, iu = ["value"], ru = {
  key: 0,
  class: "vb-search-results"
}, uu = ["onClick"], du = {
  key: 0,
  class: "vb-search-empty"
}, cu = { class: "vb-diary-entry-heading" }, vu = {
  key: 1,
  class: "vb-diary-entries"
}, mu = { class: "vb-diary-entry-title" }, pu = ["onClick"], bu = ["onUpdate:modelValue", "aria-label"], gu = ["aria-label", "onClick"], fu = { class: "vb-data-note" }, yu = {
  key: 0,
  class: "vb-pill"
}, hu = { class: "vb-entry-controls" }, ku = ["onUpdate:modelValue", "aria-label"], wu = { class: "vb-entry-meal" }, $u = ["onUpdate:modelValue"], _u = ["value"], Cu = { key: 0 }, Au = ["onUpdate:modelValue"], Iu = ["value"], Su = {
  key: 0,
  class: "vb-inline-warning"
}, xu = ["onClick"], Eu = {
  key: 2,
  class: "vb-muted-empty"
}, Uu = ["onToggle"], ju = { key: 0 }, Du = ["onClick"], Pu = ["onClick"], Nu = { class: "vb-field vb-notes-field" }, Mu = { class: "vb-intake-more" }, Ru = { key: 0 }, Tu = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: l }) {
    const n = t, d = l, { state: i, ensureDraft: u, addToDraft: r } = Lt(), { isStale: c } = Jt(), m = Ze({}), v = Ze({}), p = M(n.initialDate || ke()), b = M(""), k = M("unspecified"), h = M("selected"), T = M(null), S = M("");
    de(() => n.initialDate, (X) => {
      X && (p.value = X);
    }), de(p, (X) => {
      u(X), S.value = "", b.value = "";
    }, { immediate: !0 });
    const w = G(() => i.drafts[p.value]), A = G(() => tn(w.value?.entries)), R = G(() => Vt(b.value, 8)), D = G(() => n.records.find((X) => X.date === p.value)), N = (X) => n.reports.find((B) => B.date === X), V = /* @__PURE__ */ new Set();
    async function H(X) {
      const B = p.value, E = $e(), se = k.value, ne = B + ":" + X.key;
      if (!V.has(ne)) {
        V.add(ne);
        try {
          if (await qe(X.key), p.value !== B || $e() !== E) return;
          r({ date: B, foodId: X.key, grams: X.grams || 100, meal: se }), b.value = "", h.value = "selected";
        } catch (J) {
          S.value = J.message;
        } finally {
          V.delete(ne);
        }
      }
    }
    function O() {
      w.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: b.value.trim(), grams: 100, meal: k.value, group: "snacks", source: "manual", referenceConfirmed: !0 }), b.value = "";
    }
    async function K({ items: X, batchId: B }) {
      const E = p.value, se = $e();
      if (w.value.appliedBatches.includes(B)) return;
      try {
        await qe(X.map((J) => J.foodId));
      } catch (J) {
        S.value = J.message;
        return;
      }
      if (p.value !== E || $e() !== se || w.value.appliedBatches.includes(B)) return;
      const ne = tn(X.map((J) => ({ ...J, id: crypto.randomUUID(), meal: k.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: ht(ae[J.foodId]) })));
      if (ne.length !== X.length) {
        S.value = "请核对每项食物名称与克数。";
        return;
      }
      w.value.entries.push(...ne), w.value.appliedBatches.push(B), w.value.recognition.confirmed = !0, h.value = "selected";
    }
    function W() {
      if (!n.saving) {
        if (S.value = "", A.value.length !== w.value.entries.length) {
          S.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
          return;
        }
        d("save", JSON.parse(JSON.stringify(w.value)));
      }
    }
    function ye(X) {
      h.value = X, matchMedia("(max-width:950px)").matches && Ee(() => T.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function le(X) {
      const B = ["ArrowRight", "ArrowDown", "End"].includes(X.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(X.key) ? "selected" : null;
      B && (X.preventDefault(), ye(B), Ee(() => document.getElementById("vb-tab-" + B)?.focus()));
    }
    function he(X) {
      const B = N(X.date);
      return B ? c(B, X, n.profile) ? "报告需更新" : B.status === "pending" ? "分析中" : B.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (X, B) => (s(), o("div", Tr, [
      e("div", zr, [
        B[8] || (B[8] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "一餐一记，慢慢更了解自己"),
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", Or, [
          U(z, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": B[0] || (B[0] = (E) => p.value = E),
            type: "date",
            max: g(ke)(),
            "aria-label": "饮食记录日期"
          }, null, 8, Fr), [
            [ue, p.value]
          ])
        ])
      ]),
      w.value ? (s(), o("div", Br, [
        e("aside", Vr, [
          (s(), me(Rr, {
            key: p.value,
            draft: w.value,
            "legacy-photo": D.value?.photo,
            onConfirm: K
          }, null, 8, ["draft", "legacy-photo"])),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: le
          }, [
            (s(!0), o(F, null, L([["selected", "本次选择", A.value.length], ["history", "最近记录", t.records.length]], ([E, se, ne]) => (s(), o("button", {
              id: "vb-tab-" + E,
              key: E,
              type: "button",
              role: "tab",
              "aria-selected": h.value === E,
              "aria-controls": "vb-panel-" + E,
              tabindex: h.value === E ? 0 : -1,
              class: pe({ selected: h.value === E }),
              onClick: (J) => ye(E)
            }, [
              P(a(se), 1),
              e("span", null, a(ne), 1)
            ], 10, qr))), 128))
          ], 32),
          h.value === "selected" ? (s(), o("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: T,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", Lr, [
              e("div", null, [
                B[9] || (B[9] = e("h2", null, "本次选择", -1)),
                e("p", null, a(p.value), 1)
              ]),
              e("span", Gr, a(A.value.length) + " 项", 1)
            ]),
            U(Bt, {
              entries: A.value,
              compact: ""
            }, null, 8, ["entries"]),
            A.value.length ? (s(), o("div", Jr, [
              (s(!0), o(F, null, L(A.value, (E) => (s(), o("div", {
                key: E.id
              }, [
                e("span", null, [
                  P(a(E.name), 1),
                  e("small", null, a(g(ct).find(([se]) => se === E.meal)?.[1]) + a(E.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  P(a(E.grams), 1),
                  B[10] || (B[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (s(), o("p", Hr, "选择食物后，会在这里汇总。"))
          ], 512)) : (s(), o("section", {
            key: 1,
            id: "vb-panel-history",
            ref_key: "asidePanel",
            ref: T,
            class: "vb-glass vb-aside-panel vb-history-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-history",
            tabindex: "0"
          }, [
            e("div", Kr, [
              B[11] || (B[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              U(z, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (s(), o("div", Wr, [
              (s(!0), o(F, null, L(t.records.slice(0, 12), (E) => (s(), o("div", {
                key: E.date,
                class: "vb-history-item vb-history-with-ai"
              }, [
                e("button", {
                  type: "button",
                  "aria-label": `打开 ${E.date} 的饮食记录`,
                  onClick: (se) => p.value = E.date
                }, [
                  B[12] || (B[12] = e("span", { class: "vb-status-dot" }, null, -1)),
                  e("span", null, [
                    e("strong", null, a(E.date), 1),
                    e("small", null, a(Object.values(E.foods || {}).filter((se) => Number(se) > 0).length) + " 类食物", 1)
                  ])
                ], 8, Yr),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (se) => X.$emit("analysis", E.date)
                }, a(he(E)), 9, Xr),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + E.date + "的记录",
                  onClick: (se) => X.$emit("remove", E.date)
                }, [
                  U(z, {
                    name: "close",
                    size: 14
                  })
                ], 8, Qr)
              ]))), 128))
            ])) : (s(), o("p", Zr, "你的第一天记录，从今天开始。"))
          ], 512)),
          e("div", eu, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving
            }, [
              P(a(t.saving ? "正在保存…" : "保存记录"), 1),
              U(z, {
                name: "arrow",
                size: 17
              })
            ], 8, tu),
            D.value ? (s(), o("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: B[1] || (B[1] = (E) => X.$emit("analysis", p.value))
            }, "查看分析")) : $("", !0),
            S.value ? (s(), o("p", nu, a(S.value), 1)) : $("", !0)
          ])
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: De(W, ["prevent"])
        }, [
          e("div", su, [
            B[13] || (B[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: B[2] || (B[2] = (E) => X.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", ou, [
            e("label", lu, [
              U(z, {
                name: "search",
                size: 18
              }),
              te(e("input", {
                "onUpdate:modelValue": B[3] || (B[3] = (E) => b.value = E),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: B[4] || (B[4] = Kn(De((E) => R.value[0] && H(R.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [ue, b.value]
              ])
            ]),
            e("label", au, [
              B[14] || (B[14] = e("span", null, "添加到", -1)),
              te(e("select", {
                "onUpdate:modelValue": B[5] || (B[5] = (E) => k.value = E),
                "aria-label": "添加食物的餐次"
              }, [
                (s(!0), o(F, null, L(g(ct), ([E, se]) => (s(), o("option", {
                  key: E,
                  value: E
                }, a(se), 9, iu))), 128))
              ], 512), [
                [Ce, k.value]
              ])
            ])
          ]),
          b.value.trim() ? (s(), o("div", ru, [
            (s(!0), o(F, null, L(R.value, (E) => (s(), o("button", {
              key: E.key,
              type: "button",
              class: "vb-search-result",
              onClick: (se) => H(E)
            }, [
              e("span", null, [
                e("strong", null, a(E.name), 1),
                e("small", null, a(E.state) + " · " + a(E.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              U(z, {
                name: "plus",
                size: 17
              })
            ], 8, uu))), 128)),
            R.value.length ? $("", !0) : (s(), o("p", du, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: O
            }, [
              P("手动添加“" + a(b.value) + "”", 1),
              U(z, {
                name: "plus",
                size: 16
              })
            ])
          ])) : $("", !0),
          e("div", cu, [
            e("h3", null, [
              B[15] || (B[15] = P("已选食物 ", -1)),
              e("small", null, a(w.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: O
            }, "＋手动添加")
          ]),
          w.value.entries.length ? (s(), o("div", vu, [
            (s(!0), o(F, null, L(w.value.entries, (E, se) => (s(), o("article", {
              key: E.id,
              class: "vb-diary-entry"
            }, [
              e("div", mu, [
                E.foodId ? (s(), o("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (ne) => X.$emit("detail", E.foodId)
                }, [
                  P(a(g($t)(g(ae)[E.foodId]) || E.name), 1),
                  U(z, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, pu)) : te((s(), o("input", {
                  key: 1,
                  "onUpdate:modelValue": (ne) => E.name = ne,
                  "aria-label": "手动食物" + (se + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 8, bu)), [
                  [ue, E.name]
                ]),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (se + 1),
                  onClick: (ne) => w.value.entries.splice(se, 1)
                }, [
                  U(z, {
                    name: "close",
                    size: 15
                  })
                ], 8, gu)
              ]),
              e("p", fu, [
                P(a(E.foodId ? g(ae)[E.foodId]?.state : "手动条目，暂无营养数据") + a(E.estimated ? " · 份量为估算" : ""), 1),
                E.nutritionSnapshot?.dataType === "ai-estimate" ? (s(), o("span", yu, "含AI估算")) : $("", !0)
              ]),
              U(Nn, {
                food: g(ae)[E.foodId],
                onChoose: (ne) => {
                  E.grams = ne, E.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", hu, [
                e("label", null, [
                  B[16] || (B[16] = P("可食部重量", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (ne) => E.grams = ne,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (g(ae)[E.foodId]?.name || E.name || "食物") + "克数"
                  }, null, 8, ku), [
                    [ue, E.grams]
                  ]),
                  B[17] || (B[17] = e("small", null, "克", -1))
                ]),
                e("label", wu, [
                  B[18] || (B[18] = e("span", null, "餐次", -1)),
                  te(e("select", {
                    "onUpdate:modelValue": (ne) => E.meal = ne
                  }, [
                    (s(!0), o(F, null, L(g(ct), ([ne, J]) => (s(), o("option", {
                      key: ne,
                      value: ne
                    }, a(J), 9, _u))), 128))
                  ], 8, $u), [
                    [Ce, E.meal]
                  ])
                ]),
                E.foodId ? $("", !0) : (s(), o("label", Cu, [
                  B[19] || (B[19] = P("归属类别", -1)),
                  te(e("select", {
                    "onUpdate:modelValue": (ne) => E.group = ne
                  }, [
                    (s(!0), o(F, null, L(g(bt), (ne) => (s(), o("option", {
                      key: ne.key,
                      value: ne.key
                    }, a(ne.name), 9, Iu))), 128))
                  ], 8, Au), [
                    [Ce, E.group]
                  ])
                ]))
              ]),
              E.referenceConfirmed === !1 ? (s(), o("p", Su, [
                B[20] || (B[20] = P("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                g(ae)[E.foodId]?.source ? (s(), o("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (ne) => E.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, xu)) : (s(), o("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: B[6] || (B[6] = (ne) => X.$emit("browse"))
                }, "查找具体食物"))
              ])) : $("", !0)
            ]))), 128))
          ])) : (s(), o("p", Eu, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (s(!0), o(F, null, L(g(bt), (E) => (s(), o("details", {
            key: E.key,
            class: "vb-diary-food-group",
            onToggle: (se) => m[E.key] = se.target.open
          }, [
            e("summary", null, [
              U(z, {
                name: g(wn)[E.key],
                size: 18
              }, null, 8, ["name"]),
              P(a(E.name), 1),
              e("small", null, a(E.items.length) + " 个条目", 1),
              U(z, {
                name: "chevron",
                size: 14
              })
            ]),
            m[E.key] ? (s(), o("div", ju, [
              (s(!0), o(F, null, L(E.items.slice(0, v[E.key] || 24), ([se, ne]) => (s(), o("button", {
                key: se,
                type: "button",
                onClick: (J) => H(g(ae)[se])
              }, a(ne) + " ＋", 9, Du))), 128)),
              E.items.length > (v[E.key] || 24) ? (s(), o("button", {
                key: 0,
                type: "button",
                onClick: (se) => v[E.key] = (v[E.key] || 24) + 24
              }, "再显示24项", 8, Pu)) : $("", !0)
            ])) : $("", !0)
          ], 40, Uu))), 128)),
          e("label", Nu, [
            B[21] || (B[21] = P("补充备注 ", -1)),
            B[22] || (B[22] = e("span", null, "可选，不发送给 AI", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": B[7] || (B[7] = (E) => w.value.notes = E),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [ue, w.value.notes]
            ])
          ]),
          e("details", Mu, [
            B[23] || (B[23] = e("summary", null, "查看记录依据", -1)),
            B[24] || (B[24] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (s(!0), o(F, null, L(A.value, (E) => (s(), o("p", {
              key: E.id
            }, [
              P(a(E.name) + "：" + a(E.nutritionSnapshot?.source?.name || E.nutritionSnapshot?.estimate?.model || "原目录数据"), 1),
              E.nutritionSnapshot?.estimate ? (s(), o("span", Ru, " · " + a(E.nutritionSnapshot.estimate.assumption), 1)) : $("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : $("", !0)
    ]));
  }
}, zu = { class: "vb-food-card vb-glass" }, Ou = ["aria-label"], Fu = { class: "vb-food-card-copy" }, Bu = { class: "vb-small-label" }, Vu = { key: 0 }, qu = { key: 0 }, Lu = {
  key: 1,
  class: "vb-food-composition-note"
}, Gu = { class: "vb-food-card-bottom" }, Ju = ["aria-pressed"], pn = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const l = t;
    de(() => l.food.key, (u) => {
      qe(u).catch(() => {
      });
    }, { immediate: !0 });
    const { photo: n, loading: d, failed: i } = Pn(() => l.food);
    return (u, r) => (s(), o("article", zu, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: r[0] || (r[0] = (c) => u.$emit("detail", t.food.key))
      }, [
        U(Kt, {
          food: t.food,
          photo: g(n),
          loading: g(d),
          failed: g(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", Fu, [
          e("span", Bu, a(t.food.categoryName), 1),
          e("h3", null, a(g($t)(t.food)), 1),
          e("p", null, a(g(Ht)(t.food)), 1),
          t.food.source ? (s(), o("dl", Vu, [
            (s(!0), o(F, null, L(g(Pe), (c) => (s(), o("div", {
              key: c.id
            }, [
              e("dt", null, a(c.id === "carbs" ? "碳水" : c.name), 1),
              e("dd", null, [
                P(a(g(xe)(t.food.nutrients[c.id])), 1),
                t.food.nutrients[c.id] != null ? (s(), o("small", qu, a(c.unit), 1)) : $("", !0)
              ])
            ]))), 128))
          ])) : (s(), o("p", Lu, [
            r[3] || (r[3] = P("按实际配方记录份量", -1)),
            r[4] || (r[4] = e("br", null, null, -1)),
            P(a(g(kn).estimates?.[t.food.key] ? "已保存AI估算 · 查看范围与假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, Ou),
      e("div", Gu, [
        e("span", null, a(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (s(), o("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: pe({ selected: t.compared }),
          onClick: r[2] || (r[2] = (c) => u.$emit("compare", t.food.key))
        }, [
          U(z, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          P(a(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, Ju)) : (s(), o("button", {
          key: 0,
          type: "button",
          onClick: r[1] || (r[1] = (c) => u.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, Hu = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), Ku = { class: "vb-food-hub" }, Wu = { class: "vb-page-title" }, Yu = ["aria-expanded"], Xu = { class: "vb-glass vb-food-search-hero" }, Qu = { class: "vb-icon-badge" }, Zu = { class: "vb-food-search-input" }, ed = {
  key: 1,
  class: "vb-food-suggestions"
}, td = ["onClick"], nd = { class: "vb-recommended" }, sd = ["onClick"], od = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, ld = { class: "vb-section-heading" }, ad = {
  key: 0,
  class: "vb-comparison-chips"
}, id = ["onClick"], rd = { class: "vb-field" }, ud = { class: "vb-ask-bottom" }, dd = ["disabled"], cd = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, vd = {
  key: 2,
  class: "vb-ai-answer"
}, md = {
  key: 0,
  class: "vb-data-note"
}, pd = { class: "vb-answer-foods" }, bd = ["onClick"], gd = { class: "vb-data-note" }, fd = { class: "vb-data-note" }, yd = {
  key: 1,
  class: "vb-compare-bar"
}, hd = ["onClick"], kd = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, wd = { class: "vb-food-results-grid" }, $d = { class: "vb-section-heading vb-category-heading" }, _d = { class: "vb-food-category-grid" }, Cd = ["onClick"], Ad = ["src", "alt"], Id = { class: "vb-food-results-top" }, Sd = { class: "vb-food-filter" }, xd = { key: 0 }, Ed = ["onClick"], Ud = { key: 1 }, jd = ["value"], Dd = { class: "vb-food-results-grid" }, Pd = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, Nd = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, Md = ["disabled"], Rd = ["disabled"], Td = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, zd = { class: "vb-reference-sample-list" }, Od = ["onClick"], Fd = { key: 0 }, Bd = { class: "vb-food-source-note" }, Vd = ["href"], qd = ["href"], Ld = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const l = M(""), n = M(""), d = M(""), i = M(""), u = M("relevance"), r = M(1), c = M(!1), m = M([]), v = M(""), p = M(!1), b = M(""), k = M(!1), h = M(null), T = M(""), S = xt, w = new Set(xt.map((J) => J.key)), A = new Set(es.map((J) => J.key)), R = G(() => n.value ? Et(n.value).map((J) => J.food).filter((J) => A.has(J.key) && !w.has(J.key)) : []);
    function D(J, x = Ge.length) {
      return Et(J).map((y) => y.food).filter((y) => w.has(y.key)).slice(0, x);
    }
    const N = G(() => l.value.trim() ? D(l.value, Ge.length).slice(0, 5) : []), V = (J) => S.filter((x) => x.category === J).length, H = xt.length, O = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((J) => {
      const x = Et(J).map((y) => y.food).filter((y) => w.has(y.key));
      return x.find((y) => y.source) || x[0];
    }).filter(Boolean).map((J) => [J.key, J])).values()], K = G(() => {
      let J = n.value ? D(n.value) : [...S].sort((x, y) => +!x.source - +!y.source);
      return d.value && (J = J.filter((x) => x.category === d.value)), J;
    }), W = G(() => [...new Set(K.value.map((J) => J.subcategory))]), ye = G(() => {
      let J = K.value.filter((x) => !i.value || x.subcategory === i.value);
      if (u.value !== "relevance") {
        const [x, y] = u.value.split(":");
        J = [...J].sort((f, j) => {
          if (x === "name") return f.name.localeCompare(j.name, "zh");
          const re = f.nutrients[x], ie = j.nutrients[x];
          return re == null || ie == null ? +(re == null) - +(ie == null) : (y === "asc" ? 1 : -1) * (re - ie);
        });
      }
      return J;
    }), le = G(() => Math.max(1, Math.ceil(ye.value.length / 12))), he = G(() => ye.value.slice((r.value - 1) * 12, r.value * 12));
    de([i, u], () => r.value = 1);
    function X(J = l.value) {
      l.value = J.trim(), n.value = l.value, d.value = "", i.value = "", r.value = 1, c.value = !1;
    }
    function B(J) {
      d.value = J, n.value = "", l.value = "", i.value = "", r.value = 1, u.value = "relevance";
    }
    function E() {
      d.value = "", n.value = "", l.value = "", i.value = "", r.value = 1;
    }
    function se(J) {
      v.value = "", m.value.includes(J) ? m.value = m.value.filter((x) => x !== J) : m.value.length < 2 ? m.value.push(J) : v.value = "每次选择两种食物进行比较。";
    }
    async function ne() {
      if (!(k.value || !b.value.trim())) {
        k.value = !0, T.value = "", h.value = null;
        try {
          h.value = await wt("ask", { question: b.value.trim(), foodIds: m.value });
        } catch (J) {
          T.value = J.message;
        } finally {
          k.value = !1;
        }
      }
    }
    return (J, x) => (s(), o("div", Ku, [
      e("div", Wu, [
        e("div", null, [
          x[14] || (x[14] = e("p", { class: "vb-eyebrow" }, "从认识食物开始", -1)),
          x[15] || (x[15] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, a(g(H).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": p.value,
          onClick: x[0] || (x[0] = (y) => p.value = !p.value)
        }, [
          U(z, {
            name: "sparkles",
            size: 17
          }),
          x[16] || (x[16] = P("问 AI", -1))
        ], 8, Yu)
      ]),
      e("section", Xu, [
        e("span", Qu, [
          U(z, {
            name: "search",
            size: 23
          })
        ]),
        x[19] || (x[19] = e("div", null, [
          e("h2", null, "今天想了解哪一种食物？"),
          e("p", null, "名称、别名都能查。营养数据统一按每 100 克可食部展示。")
        ], -1)),
        e("form", {
          class: "vb-food-search-form",
          onSubmit: x[3] || (x[3] = De((y) => X(), ["prevent"]))
        }, [
          e("div", Zu, [
            U(z, {
              name: "search",
              size: 19
            }),
            te(e("input", {
              "onUpdate:modelValue": x[1] || (x[1] = (y) => l.value = y),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: x[2] || (x[2] = (y) => c.value = !0)
            }, null, 544), [
              [ue, l.value]
            ]),
            l.value ? (s(), o("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: E
            }, [
              U(z, {
                name: "close",
                size: 15
              })
            ])) : $("", !0),
            c.value && N.value.length ? (s(), o("div", ed, [
              (s(!0), o(F, null, L(N.value, (y) => (s(), o("button", {
                key: y.key,
                type: "button",
                onClick: (f) => X(y.name)
              }, [
                P(a(y.name), 1),
                e("small", null, a(y.state), 1)
              ], 8, td))), 128))
            ])) : $("", !0)
          ]),
          x[17] || (x[17] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", nd, [
          x[18] || (x[18] = e("span", null, "推荐搜索", -1)),
          (s(), o(F, null, L(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (y) => e("button", {
            key: y,
            type: "button",
            onClick: (f) => X(y)
          }, a(y), 9, sd)), 64))
        ])
      ]),
      p.value ? (s(), o("section", od, [
        e("div", ld, [
          x[20] || (x[20] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          U(z, { name: "sparkles" })
        ]),
        x[24] || (x[24] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给 DeepSeek。数值来自食物库，AI 负责解释。", -1)),
        m.value.length ? (s(), o("div", ad, [
          (s(!0), o(F, null, L(m.value, (y) => (s(), o("button", {
            key: y,
            type: "button",
            onClick: (f) => se(y)
          }, a(g(ae)[y].name) + " ×", 9, id))), 128))
        ])) : $("", !0),
        e("form", {
          onSubmit: De(ne, ["prevent"])
        }, [
          e("label", rd, [
            x[21] || (x[21] = P("你的问题", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": x[4] || (x[4] = (y) => b.value = y),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [ue, b.value]
            ])
          ]),
          e("div", ud, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: x[5] || (x[5] = (y) => b.value = m.value.length === 2 ? "这两种食物的蛋白质有什么区别？" : "100 克香蕉大约有多少热量？")
            }, "填入示例问题"),
            e("button", {
              type: "submit",
              class: "vb-button vb-button-primary",
              disabled: k.value || !b.value.trim()
            }, a(k.value ? "正在查询与分析…" : "发送问题"), 9, dd)
          ])
        ], 32),
        T.value ? (s(), o("p", cd, a(T.value), 1)) : $("", !0),
        h.value ? (s(), o("div", vd, [
          x[22] || (x[22] = e("h3", null, "数据库数值", -1)),
          h.value.database.length ? $("", !0) : (s(), o("p", md, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", pd, [
            (s(!0), o(F, null, L(h.value.database, (y) => (s(), o("button", {
              key: y.id,
              type: "button",
              onClick: (f) => J.$emit("detail", y.id)
            }, [
              e("strong", null, a(y.name) + " →", 1),
              e("span", null, a(y.grams) + " 克可食部 · 热量 " + a(g(xe)(y.portion.energy)) + a(y.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + a(g(xe)(y.portion.protein)) + a(y.portion.protein != null ? " g" : ""), 1),
              e("small", null, a(y.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, bd))), 128))
          ]),
          x[23] || (x[23] = e("h3", null, "AI 解释", -1)),
          e("p", null, a(h.value.answer.summary), 1),
          e("p", null, a(h.value.answer.explanation), 1),
          e("p", gd, a(h.value.answer.limitations), 1),
          e("small", fd, a(h.value.model) + " · " + a(new Date(h.value.generatedAt).toLocaleString()), 1)
        ])) : $("", !0)
      ])) : $("", !0),
      m.value.length ? (s(), o("div", yd, [
        e("span", null, "已选 " + a(m.value.length) + " 种食物", 1),
        (s(!0), o(F, null, L(m.value, (y) => (s(), o("button", {
          key: y,
          onClick: (f) => se(y)
        }, a(g(ae)[y].name) + " ×", 9, hd))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: x[6] || (x[6] = (y) => {
            p.value = !0, b.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : $("", !0),
      v.value ? (s(), o("p", kd, a(v.value), 1)) : $("", !0),
      !d.value && !n.value ? (s(), o(F, { key: 3 }, [
        x[26] || (x[26] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物"),
            e("p", null, "从你熟悉的食材开始。")
          ])
        ], -1)),
        e("div", wd, [
          (s(), o(F, null, L(O, (y) => U(pn, {
            key: y.key,
            food: y,
            compared: m.value.includes(y.key),
            onDetail: x[7] || (x[7] = (f) => J.$emit("detail", f)),
            onCompare: se
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", $d, [
          e("div", null, [
            x[25] || (x[25] = e("h2", null, "按类别探索", -1)),
            e("p", null, a(g(S).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", _d, [
          (s(!0), o(F, null, L(g(ts).filter((y) => V(y.id) > 0), (y) => (s(), o("button", {
            key: y.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: (f) => B(y.id)
          }, [
            e("img", {
              src: y.image,
              alt: y.name + "分类示意图",
              loading: "lazy"
            }, null, 8, Ad),
            e("span", null, [
              e("small", null, a(V(y.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, a(y.name), 1),
              e("em", null, [
                P(a(y.description) + " ", 1),
                U(z, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, Cd))), 128))
        ]),
        x[27] || (x[27] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (s(), o(F, { key: 4 }, [
        e("div", Id, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: E
          }, [
            U(z, {
              name: "back",
              size: 15
            }),
            x[28] || (x[28] = P("分类总览", -1))
          ]),
          e("h2", null, a(d.value ? g(nn)[d.value].name : "“" + n.value + "”的食物照片与营养资料"), 1),
          e("span", null, a(ye.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", Sd, [
          W.value.length <= 10 ? (s(), o("div", xd, [
            e("button", {
              class: pe({ selected: !i.value }),
              onClick: x[8] || (x[8] = (y) => i.value = "")
            }, "全部", 2),
            (s(!0), o(F, null, L(W.value, (y) => (s(), o("button", {
              key: y,
              class: pe({ selected: i.value === y }),
              onClick: (f) => i.value = y
            }, a(y), 11, Ed))), 128))
          ])) : (s(), o("label", Ud, [
            x[30] || (x[30] = P("筛选", -1)),
            te(e("select", {
              "onUpdate:modelValue": x[9] || (x[9] = (y) => i.value = y),
              "aria-label": "食物类型筛选"
            }, [
              x[29] || (x[29] = e("option", { value: "" }, "全部类型", -1)),
              (s(!0), o(F, null, L(W.value, (y) => (s(), o("option", {
                key: y,
                value: y
              }, a(y), 9, jd))), 128))
            ], 512), [
              [Ce, i.value]
            ])
          ])),
          e("label", null, [
            x[32] || (x[32] = P("排序", -1)),
            te(e("select", {
              "onUpdate:modelValue": x[10] || (x[10] = (y) => u.value = y),
              "aria-label": "食物营养指标排序"
            }, [...x[31] || (x[31] = [
              fn('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [Ce, u.value]
            ])
          ])
        ]),
        e("div", Dd, [
          (s(!0), o(F, null, L(he.value, (y) => (s(), me(pn, {
            key: y.key,
            food: y,
            compared: m.value.includes(y.key),
            onDetail: x[11] || (x[11] = (f) => J.$emit("detail", f)),
            onCompare: se
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        ye.value.length ? $("", !0) : (s(), o("div", Pd, [
          U(z, {
            name: "search",
            size: 34
          }),
          x[33] || (x[33] = e("h2", null, "没有找到匹配的食物", -1)),
          x[34] || (x[34] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: E
          }, "返回食物总览")
        ])),
        le.value > 1 ? (s(), o("nav", Nd, [
          e("button", {
            disabled: r.value === 1,
            onClick: x[12] || (x[12] = (y) => r.value--)
          }, "上一页", 8, Md),
          e("span", null, "第 " + a(r.value) + " / " + a(le.value) + " 页", 1),
          e("button", {
            disabled: r.value === le.value,
            onClick: x[13] || (x[13] = (y) => r.value++)
          }, "下一页", 8, Rd)
        ])) : $("", !0)
      ], 64)),
      n.value && R.value.length ? (s(), o("details", Td, [
        e("summary", null, "其他营养数据样本 · " + a(R.value.length.toLocaleString()) + " 条", 1),
        x[35] || (x[35] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", zd, [
          (s(!0), o(F, null, L(R.value.slice(0, 80), (y) => (s(), o("button", {
            key: y.key,
            type: "button",
            onClick: (f) => J.$emit("detail", y.key)
          }, [
            e("strong", null, a(y.name), 1),
            e("span", null, a(y.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, Od))), 128))
        ]),
        R.value.length > 80 ? (s(), o("p", Fd, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : $("", !0)
      ])) : $("", !0),
      e("details", Bd, [
        x[36] || (x[36] = e("summary", null, "数据口径与图片署名", -1)),
        x[37] || (x[37] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        x[38] || (x[38] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        x[39] || (x[39] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        x[40] || (x[40] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (s(!0), o(F, null, L(g(Hu), (y) => (s(), o("li", {
            key: y.key
          }, [
            P(a(g(nn)[y.key]?.name) + "：", 1),
            e("a", {
              href: y.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, a(y.title), 9, Vd),
            P(" · " + a(y.author) + " · ", 1),
            e("a", {
              href: y.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, a(y.license), 9, qd),
            P(" · " + a(y.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function Gd(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function Jd() {
  const t = M(""), l = M((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), n = M("lunch"), d = M(null), i = M(""), u = M(!1), r = M([]);
  async function c(v, p, b = {}) {
    if (u.value) return;
    i.value = "", d.value = null, u.value = !0, r.value = [];
    const k = v ? {
      sex: v.sex,
      age: v.age,
      height: v.height,
      weight: v.weight,
      activity: v.activity,
      ageMonths: v.ageMonths,
      physiologicalStage: v.physiologicalStage
    } : null;
    try {
      d.value = await ks({
        goal: t.value.slice(0, 500),
        date: l.value,
        meal: n.value,
        profile: k,
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
      i.value = Gd(h);
    } finally {
      u.value = !1;
    }
  }
  function m() {
    d.value = null, i.value = "", r.value = [];
  }
  return { goal: t, date: l, meal: n, response: d, error: i, busy: u, progress: r, run: c, clear: m };
}
const Hd = [
  ["花生", "peanut", "peanuts", "groundnut"],
  ["奶", "牛奶", "乳", "乳制品", "奶制品", "dairy", "milk", "cheese", "yogurt", "yoghurt", "cream", "butter"],
  ["蛋", "鸡蛋", "egg", "eggs"],
  ["海鲜", "seafood", "鱼虾蟹贝", "鱼", "虾", "蟹", "贝", "fish", "shrimp", "prawn", "crab", "clam", "oyster", "salmon", "tuna", "cod", "squid", "mussel"],
  ["肉类", "肉", "牛肉", "猪肉", "鸡肉", "羊肉", "禽", "beef", "pork", "chicken", "lamb", "turkey", "duck", "meat"],
  ["香菜", "coriander", "cilantro"],
  ["大豆", "豆制品", "soy", "tofu"],
  ["小麦", "wheat"],
  ["坚果", "nuts", "almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut"]
], Mt = (t, l = 300) => typeof t == "string" ? t.trim().slice(0, l) : "";
function bn(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const l = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (l !== null && (!Number.isFinite(l) || l <= 0 || l > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const n = (Array.isArray(t.avoids) ? t.avoids.join("、") : Mt(t.avoids)).split(/[,，、;；\n]+/).map((u) => u.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (n.length > 12 || n.some((u) => u.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const d = t.availableFoods ?? [];
  if (!Array.isArray(d) || d.length > 12) throw new Error("可选食物最多12项。");
  const i = d.map((u) => {
    const r = ae[u?.foodId], c = Number(u?.grams), m = u?.price === null || u?.price === void 0 || u?.price === "" ? null : Number(u.price);
    if (!r || !Number.isFinite(c) || c < 0.1 || c > 5e3 || m !== null && (!Number.isFinite(m) || m < 0 || m > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: r.key, name: r.name, grams: c, price: m };
  });
  if (new Set(i.map((u) => u.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: l, avoids: [...new Set(n)], preferences: Mt(t.preferences, 200), exercise: Mt(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function Tn(t, l = []) {
  const n = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), d = rt(n);
  return l.filter((i) => {
    const u = /* @__PURE__ */ new Set([i]);
    for (const r of Hd) if (r.some((c) => rt(c) === rt(i))) for (const c of r) u.add(c);
    return [...u].some((r) => /^[a-z ]+$/i.test(r) ? new RegExp("\\b" + r.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(n) : d.includes(rt(r)));
  });
}
function Kd(t, l) {
  return !!t && !["13", "17"].includes(t.category) && !Tn(t, l.avoids).length && (!l.onlyAvailable || l.availableFoods.some((n) => n.foodId === t.key));
}
function Wd(t, l) {
  const n = t.map((u) => {
    const r = l.availableFoods.find((m) => m.foodId === u.foodId), c = r?.price != null ? Math.round(r.price * u.grams / r.grams * 100) / 100 : null;
    return { foodId: u.foodId, cost: c, priceBasis: r?.price != null ? { price: r.price, grams: r.grams } : null };
  }), d = n.every((u) => u.cost !== null), i = Math.round(n.reduce((u, r) => u + (r.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: l.budget, complete: d, knownSubtotal: i, total: d ? i : null, status: d ? l.budget === null ? "no_budget" : i > l.budget ? "over_budget" : "within_budget" : "unknown", breakdown: n, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: l.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const Yd = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, Xd = { class: "vb-agent-heading" }, Qd = { class: "vb-icon-badge" }, Zd = { class: "vb-campus-fields" }, ec = ["max", "disabled"], tc = ["disabled"], nc = ["value"], sc = ["disabled"], oc = ["disabled"], lc = { class: "vb-analysis-tabs" }, ac = ["disabled"], ic = ["disabled", "onClick"], rc = { class: "vb-more-conditions" }, uc = { class: "vb-agent-goal" }, dc = ["disabled"], cc = { class: "vb-campus-fields" }, vc = ["disabled"], mc = ["disabled"], pc = { class: "vb-campus-candidates" }, bc = { class: "vb-candidate-search" }, gc = ["disabled"], fc = ["disabled"], yc = ["value"], hc = ["disabled"], kc = { class: "vb-candidate-list" }, wc = ["onUpdate:modelValue", "disabled"], $c = ["onUpdate:modelValue", "disabled"], _c = ["disabled", "onClick"], Cc = {
  key: 0,
  class: "vb-agent-context-optin"
}, Ac = ["disabled"], Ic = { class: "vb-agent-context-optin" }, Sc = ["disabled"], xc = { class: "vb-agent-context-optin" }, Ec = ["disabled"], Uc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, jc = ["disabled"], Dc = {
  key: 0,
  class: "vb-loading-ring"
}, Pc = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, Nc = { key: 0 }, Mc = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, Rc = ["disabled"], Tc = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, zc = {
  key: 3,
  class: "vb-agent-plan"
}, Oc = { class: "vb-agent-plan-heading" }, Fc = { class: "vb-eyebrow" }, Bc = { class: "vb-data-note" }, Vc = { key: 0 }, qc = { key: 1 }, Lc = { class: "vb-agent-items" }, Gc = { class: "vb-agent-item-title" }, Jc = ["onClick"], Hc = ["onClick"], Kc = {
  key: 0,
  class: "vb-candidate-search"
}, Wc = ["value"], Yc = ["disabled", "onClick"], Xc = { key: 0 }, Qc = { class: "vb-agent-grams" }, Zc = ["value", "onInput"], ev = { class: "vb-agent-evidence" }, tv = { class: "vb-agent-source" }, nv = ["href"], sv = { key: 1 }, ov = { key: 0 }, lv = {
  key: 1,
  class: "vb-agent-notes"
}, av = {
  key: 2,
  class: "vb-agent-notes is-caution"
}, iv = { class: "vb-agent-trace" }, rv = { class: "vb-agent-confirm" }, uv = ["disabled"], dv = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: l }) {
    const n = t, d = l, { goal: i, date: u, meal: r, response: c, error: m, busy: v, progress: p, run: b, clear: k } = Jd();
    i.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const h = Ze({ budget: "", avoids: "", preferences: n.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), T = M(-1), S = M(""), w = M(!1), A = M(!0), R = M(!1), D = M(""), N = M(""), V = M(""), H = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], O = G(() => N.value.trim() ? Vt(N.value, 8) : []), K = G(() => et((n.records || []).find((y) => y.date === u.value))), W = G(() => c.value?.status === "ready" ? c.value : null), ye = G(() => (W.value?.plan.items || []).map((y, f) => ({ id: "agent-" + f, foodId: y.foodId, name: y.name, grams: y.grams, meal: y.meal, group: ae[y.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), le = G(() => W.value ? Wd(W.value.plan.items, W.value.conditions) : null), he = G(() => !W.value || !W.value.plan.items.length || le.value?.status === "over_budget" || W.value.plan.items.some((y) => !Number.isFinite(y.grams) || y.grams < 0.1 || y.grams > 5e3));
    de([i, u, r, h, A, R, () => n.profile, () => n.records], () => {
      !v.value && c.value && k(), w.value = !1;
    }, { deep: !0 }), de(() => n.preferences, (y) => h.preferences = y || "");
    function X() {
      const y = ae[V.value];
      if (D.value = "", !!y) {
        if (h.availableFoods.some((f) => f.foodId === y.key)) {
          D.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (h.availableFoods.length >= 12) {
          D.value = "最多加入12项备选食物。";
          return;
        }
        h.availableFoods.push({ foodId: y.key, name: y.name, grams: 100, price: "" }), V.value = "", N.value = "";
      }
    }
    async function B() {
      D.value = "", w.value = !1;
      let y;
      try {
        await qe(h.availableFoods.map((j) => j.foodId)), y = bn(h);
        const f = y.availableFoods.find((j) => Tn(ae[j.foodId], y.avoids).length);
        if (f) throw Error("备选食物“" + f.name + "”命中回避项，请先移除或修改条件。");
      } catch (f) {
        D.value = f.message;
        return;
      }
      await b(n.profile, R.value ? { safetyFlags: (n.flags || []).filter((f) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes(f)) } : void 0, { conditions: y, ...A.value ? { recordContext: { date: u.value, entries: K.value.map((f) => ({ foodId: f.foodId, name: f.name, grams: f.grams, meal: f.meal, referenceConfirmed: f.referenceConfirmed })) } } : {} });
    }
    function E() {
      he.value || w.value || (w.value = !0, d("confirm", { confirmationId: W.value.confirmationId, date: W.value.date, meal: W.value.meal, items: W.value.plan.items, onResult: (y) => {
        w.value = y.ok, y.ok || (D.value = y.error || "加入草稿失败，请重试。");
      } }));
    }
    function se(y, f) {
      W.value && (W.value.plan.items[y].grams = Number(f), W.value.plan.items[y].portion = sn(ae[W.value.plan.items[y].foodId], Number(f)), w.value = !1);
    }
    const ne = G(() => {
      let y;
      try {
        y = bn(h);
      } catch {
        return [];
      }
      return (y.availableFoods.length && y.onlyAvailable ? y.availableFoods.map((j) => ae[j.foodId]) : Ge).filter((j) => j && !j.__summary && j.source && Kd(j, y) && !W.value?.plan.items.some((re) => re.foodId === j.key)).slice(0, 60);
    });
    function J(y) {
      const f = ae[S.value];
      if (!f || !ne.value.some((re) => re.key === f.key)) return;
      const j = W.value.plan.items[y];
      W.value.plan.items[y] = { ...j, foodId: f.key, name: f.name, portion: sn(f, j.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: f.source?.name || "", source: f.source?.id || "", missing: [] }, w.value = !1, T.value = -1, S.value = "";
    }
    const x = (y) => typeof y == "number" && Number.isFinite(y) ? y.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (y, f) => (s(), o("section", Yd, [
      e("header", Xd, [
        e("span", Qd, [
          U(z, {
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
        onSubmit: De(B, ["prevent"])
      }, [
        e("div", Zd, [
          e("label", null, [
            f[16] || (f[16] = P("日期", -1)),
            te(e("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (j) => It(u) ? u.value = j : null),
              type: "date",
              max: g(ke)(),
              disabled: g(v)
            }, null, 8, ec), [
              [ue, g(u)]
            ])
          ]),
          e("label", null, [
            f[17] || (f[17] = P("餐次", -1)),
            te(e("select", {
              "onUpdate:modelValue": f[1] || (f[1] = (j) => It(r) ? r.value = j : null),
              disabled: g(v)
            }, [
              (s(), o(F, null, L(H, ([j, re]) => e("option", {
                key: j,
                value: j
              }, a(re), 9, nc)), 64))
            ], 8, tc), [
              [Ce, g(r)]
            ])
          ]),
          e("label", null, [
            f[18] || (f[18] = P("预算（元，可选）", -1)),
            te(e("input", {
              "onUpdate:modelValue": f[2] || (f[2] = (j) => h.budget = j),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: g(v)
            }, null, 8, sc), [
              [ue, h.budget]
            ])
          ]),
          e("label", null, [
            f[19] || (f[19] = P("不吃的食物", -1)),
            te(e("input", {
              "onUpdate:modelValue": f[3] || (f[3] = (j) => h.avoids = j),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: g(v)
            }, null, 8, oc), [
              [ue, h.avoids]
            ])
          ])
        ]),
        e("div", lc, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: g(v),
            onClick: f[4] || (f[4] = (j) => h.budget = "15")
          }, "预算15元", 8, ac),
          (s(), o(F, null, L(["清淡", "素食偏好"], (j) => e("button", {
            key: j,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: g(v),
            onClick: (re) => h.preferences = j
          }, a(j), 9, ic)), 64)),
          e("span", null, "已选偏好：" + a(h.preferences || "未设置"), 1)
        ]),
        e("details", rc, [
          f[29] || (f[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", uc, [
            f[20] || (f[20] = e("span", null, "这餐想怎么安排？", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": f[5] || (f[5] = (j) => It(i) ? i.value = j : null),
              rows: "2",
              maxlength: "500",
              disabled: g(v),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, dc), [
              [ue, g(i)]
            ])
          ]),
          e("div", cc, [
            e("label", null, [
              f[21] || (f[21] = P("口味与饮食偏好", -1)),
              te(e("input", {
                "onUpdate:modelValue": f[6] || (f[6] = (j) => h.preferences = j),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: g(v)
              }, null, 8, vc), [
                [ue, h.preferences]
              ])
            ]),
            e("label", null, [
              f[22] || (f[22] = P("运动情况（可选）", -1)),
              te(e("input", {
                "onUpdate:modelValue": f[7] || (f[7] = (j) => h.exercise = j),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: g(v)
              }, null, 8, mc), [
                [ue, h.exercise]
              ])
            ])
          ]),
          e("details", pc, [
            f[27] || (f[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            f[28] || (f[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", bc, [
              te(e("input", {
                "onUpdate:modelValue": f[8] || (f[8] = (j) => N.value = j),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: g(v),
                onInput: f[9] || (f[9] = (j) => V.value = "")
              }, null, 40, gc), [
                [ue, N.value]
              ]),
              te(e("select", {
                "onUpdate:modelValue": f[10] || (f[10] = (j) => V.value = j),
                "aria-label": "选择具体食物",
                disabled: g(v) || !O.value.length
              }, [
                f[23] || (f[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (s(!0), o(F, null, L(O.value, (j) => (s(), o("option", {
                  key: j.key,
                  value: j.key
                }, a(j.name), 9, yc))), 128))
              ], 8, fc), [
                [Ce, V.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: g(v) || !V.value,
                onClick: X
              }, "加入备选", 8, hc)
            ]),
            e("div", kc, [
              (s(!0), o(F, null, L(h.availableFoods, (j, re) => (s(), o("article", {
                key: j.foodId
              }, [
                e("strong", null, a(j.name), 1),
                e("label", null, [
                  f[24] || (f[24] = P("这份可食部（克）", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (ie) => j.grams = ie,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: g(v)
                  }, null, 8, wc), [
                    [
                      ue,
                      j.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  f[25] || (f[25] = P("这份已知价格（元）", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (ie) => j.price = ie,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: g(v)
                  }, null, 8, $c), [
                    [ue, j.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: g(v),
                  onClick: (ie) => h.availableFoods.splice(re, 1)
                }, "移除", 8, _c)
              ]))), 128))
            ]),
            h.availableFoods.length ? (s(), o("label", Cc, [
              te(e("input", {
                "onUpdate:modelValue": f[11] || (f[11] = (j) => h.onlyAvailable = j),
                type: "checkbox",
                disabled: g(v)
              }, null, 8, Ac), [
                [dt, h.onlyAvailable]
              ]),
              f[26] || (f[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : $("", !0)
          ])
        ]),
        e("label", Ic, [
          te(e("input", {
            "onUpdate:modelValue": f[12] || (f[12] = (j) => A.value = j),
            type: "checkbox",
            disabled: g(v)
          }, null, 8, Sc), [
            [dt, A.value]
          ]),
          e("span", null, [
            P("使用所选日期的 " + a(K.value.length) + " 项已记录食物", 1),
            f[30] || (f[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", xc, [
          te(e("input", {
            "onUpdate:modelValue": f[13] || (f[13] = (j) => R.value = j),
            type: "checkbox",
            disabled: g(v)
          }, null, 8, Ec), [
            [dt, R.value]
          ]),
          f[31] || (f[31] = e("span", null, [
            P("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        f[32] || (f[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给 DeepSeek。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        D.value ? (s(), o("p", Uc, a(D.value), 1)) : $("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: g(v) || !g(i).trim()
        }, [
          g(v) ? (s(), o("span", Dc)) : (s(), me(z, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          P(a(g(v) ? "正在等待真实检索与计算…" : W.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, jc)
      ], 32),
      g(v) || g(p).length ? (s(), o("div", Pc, [
        e("div", null, [
          e("strong", null, a(g(v) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          g(v) ? (s(), o("p", Nc, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : $("", !0),
          e("ol", null, [
            (s(!0), o(F, null, L(g(p), (j, re) => (s(), o("li", { key: re }, [
              e("strong", null, a(j.label), 1),
              P(" · " + a(j.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : $("", !0),
      g(m) ? (s(), o("div", Mc, [
        f[33] || (f[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, a(g(m)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: g(v),
          onClick: B
        }, "保留条件并重试", 8, Rc)
      ])) : $("", !0),
      g(c)?.status === "needs_evidence" ? (s(), o("p", Tc, a(g(c).message) + " 请修改备选食物或检索描述。", 1)) : $("", !0),
      W.value ? (s(), o("section", zc, [
        e("div", Oc, [
          e("div", null, [
            e("p", Fc, "待确认 · " + a(W.value.date) + " · " + a(H.find((j) => j[0] === W.value.meal)?.[1]), 1),
            e("h3", null, a(W.value.plan.title), 1)
          ]),
          f[34] || (f[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        e("p", null, a(W.value.plan.summary), 1),
        e("p", Bc, "本次使用 " + a(W.value.contextSummary.itemCount) + " 项已记录食物；" + a(W.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        le.value ? (s(), o("div", {
          key: 0,
          class: pe(["vb-campus-cost", { "is-caution": le.value.status === "over_budget" }])
        }, [
          e("h4", null, a(le.value.complete ? "按录入价格估算：约 ¥" + x(le.value.total) : "价格待确认"), 1),
          le.value.budget !== null ? (s(), o("p", Vc, "本餐预算 ¥" + a(le.value.budget) + " · " + a(le.value.status === "within_budget" ? "按已录入价格估算在预算内" : le.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : $("", !0),
          le.value.complete ? $("", !0) : (s(), o("p", qc, "已知价格小计约 ¥" + a(x(le.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, a(le.value.basis) + "。" + a(le.value.availability) + "。", 1)
        ], 2)) : $("", !0),
        e("div", Lc, [
          (s(!0), o(F, null, L(W.value.plan.items, (j, re) => (s(), o("article", {
            key: j.foodId,
            class: "vb-agent-item"
          }, [
            e("div", Gc, [
              e("div", null, [
                U(Kt, {
                  food: g(ae)[j.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, a(g($t)(g(ae)[j.foodId])), 1),
                e("small", null, a(g(Ht)(g(ae)[j.foodId])), 1),
                e("p", null, a(j.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (ie) => {
                  W.value.plan.items.splice(re, 1), w.value = !1;
                }
              }, "移除", 8, Jc)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (ie) => {
                T.value = re, S.value = "";
              }
            }, "换一道", 8, Hc),
            T.value === re ? (s(), o("div", Kc, [
              te(e("select", {
                "onUpdate:modelValue": f[14] || (f[14] = (ie) => S.value = ie),
                "aria-label": "替换食物"
              }, [
                f[35] || (f[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (s(!0), o(F, null, L(ne.value, (ie) => (s(), o("option", {
                  key: ie.key,
                  value: ie.key
                }, a(ie.name), 9, Wc))), 128))
              ], 512), [
                [Ce, S.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !S.value,
                onClick: (ie) => J(re)
              }, "确认替换", 8, Yc),
              ne.value.length ? $("", !0) : (s(), o("p", Xc, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : $("", !0),
            e("label", Qc, [
              f[36] || (f[36] = P("可食部估算克数", -1)),
              e("input", {
                value: j.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (ie) => se(re, ie.target.value)
              }, null, 40, Zc),
              f[37] || (f[37] = P("克", -1))
            ]),
            e("div", ev, [
              (s(), o(F, null, L([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (ie) => e("small", {
                key: ie.id
              }, a(ie.name) + " " + a(x(j.portion[ie.id])) + a(j.portion[ie.id] !== null ? " " + ie.unit : ""), 1)), 64))
            ]),
            e("details", tv, [
              f[39] || (f[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + a(g(ae)[j.foodId]?.state), 1),
              e("p", null, [
                f[38] || (f[38] = P("来源：", -1)),
                g(ae)[j.foodId]?.source ? (s(), o("a", {
                  key: 0,
                  href: g(ae)[j.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, a(j.sourceName) + " · " + a(j.source), 9, nv)) : (s(), o("span", sv, "暂无可核验成分数据"))
              ]),
              e("p", null, a(g(ae)[j.foodId]?.source?.description), 1),
              f[40] || (f[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              j.missing.length ? (s(), o("p", ov, "缺失指标：" + a(j.missing.join("、")), 1)) : $("", !0)
            ])
          ]))), 128))
        ]),
        U(Bt, {
          entries: ye.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        f[45] || (f[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        W.value.plan.suggestions.length ? (s(), o("div", lv, [
          f[41] || (f[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (s(!0), o(F, null, L(W.value.plan.suggestions, (j) => (s(), o("li", { key: j }, a(j), 1))), 128))
          ])
        ])) : $("", !0),
        W.value.plan.cautions.length ? (s(), o("div", av, [
          f[42] || (f[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (s(!0), o(F, null, L(W.value.plan.cautions, (j) => (s(), o("li", { key: j }, a(j), 1))), 128))
          ])
        ])) : $("", !0),
        e("details", iv, [
          f[43] || (f[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (s(!0), o(F, null, L(W.value.trace, (j, re) => (s(), o("li", { key: re }, [
              e("strong", null, a(j.label), 1),
              P(" · " + a(j.inputSummary) + " · " + a(j.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, a(W.value.model) + " · " + a(W.value.dataVersion) + " · " + a(new Date(W.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        U(Cn),
        e("div", rv, [
          f[44] || (f[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: w.value || he.value,
            onClick: E
          }, a(w.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, uv)
        ])
      ])) : $("", !0)
    ]));
  }
}, cv = { class: "vb-page-title" }, vv = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, mv = { class: "vb-glass vb-record-prompt" }, pv = /* @__PURE__ */ Je({
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
    return (l, n) => (s(), o(F, null, [
      e("div", cv, [
        n[4] || (n[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "全年龄段的饮食记录与营养分析"),
          e("h1", null, "膳食方案"),
          e("p", null, "结合身体档案、饮食记录与就餐条件，安排更适合自己的下一餐。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-soft",
          onClick: n[0] || (n[0] = (d) => l.$emit("navigate", "profile"))
        }, "调整档案与饮食偏好")
      ]),
      t.nutrition ? $("", !0) : (s(), o("section", vv, [...n[5] || (n[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      U(dv, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: n[1] || (n[1] = (d) => l.$emit("add-plan", d))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", mv, [
        n[6] || (n[6] = e("div", null, [
          e("h3", null, "从下一餐，回到真实记录"),
          e("p", null, "方案不代表已经吃过；食物、配料、价格与实际份量需要你核对。")
        ], -1)),
        e("button", {
          class: "vb-text-button",
          onClick: n[2] || (n[2] = (d) => l.$emit("navigate", "diary"))
        }, "去记录实际饮食 →"),
        e("button", {
          class: "vb-text-button",
          onClick: n[3] || (n[3] = (d) => l.$emit("navigate", "about"))
        }, "查看参考资料 →")
      ])
    ], 64));
  }
}), bv = { class: "vb-page-title" }, gv = { class: "vb-glass vb-profile-details" }, fv = { class: "vb-section-heading" }, yv = { class: "vb-pill" }, hv = { key: 0 }, kv = { key: 1 }, wv = { class: "vb-profile-settings" }, $v = { class: "vb-glass" }, _v = { class: "vb-section-heading" }, Cv = { class: "vb-field" }, Av = ["value"], Iv = { class: "vb-glass" }, Sv = { class: "vb-section-heading" }, xv = ["checked", "onChange"], Ev = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String },
  emits: ["edit", "update:flags", "update:preferences"],
  setup(t, { emit: l }) {
    const n = t, d = G(() => qt.find((c) => c.key === n.profile.activity)), i = l, u = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function r(c, m, v) {
      i("update:flags", m ? [...v, c] : v.filter((p) => p !== c));
    }
    return (c, m) => (s(), o(F, null, [
      e("div", bv, [
        m[3] || (m[3] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "随身体与生活变化，随时更新"),
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: m[0] || (m[0] = (v) => c.$emit("edit"))
        }, [
          U(z, {
            name: "edit",
            size: 17
          }),
          m[2] || (m[2] = P("修改基础档案", -1))
        ])
      ]),
      e("section", gv, [
        e("div", fv, [
          m[4] || (m[4] = e("h2", null, "基础信息", -1)),
          e("span", yv, a(g(_e) ? g(vt) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
        ]),
        e("dl", null, [
          e("div", null, [
            m[5] || (m[5] = e("dt", null, "生理性别", -1)),
            e("dd", null, a(t.profile.sex === "male" ? "男性" : t.profile.sex === "female" ? "女性" : "未填写"), 1)
          ]),
          e("div", null, [
            m[6] || (m[6] = e("dt", null, "年龄", -1)),
            e("dd", null, a(t.profile.age == null || t.profile.age === "" ? "未填写" : `${t.profile.age} 岁`), 1)
          ]),
          t.profile.age === 0 ? (s(), o("div", hv, [
            m[7] || (m[7] = e("dt", null, "月龄", -1)),
            e("dd", null, a(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : $("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (s(), o("div", kv, [
            m[8] || (m[8] = e("dt", null, "生理阶段", -1)),
            e("dd", null, a({ pregnant: "孕期", lactating: "哺乳期", special: "需专业评估" }[t.profile.physiologicalStage]), 1)
          ])) : $("", !0),
          e("div", null, [
            m[9] || (m[9] = e("dt", null, "身高", -1)),
            e("dd", null, a(t.profile.height == null || t.profile.height === "" ? "未填写" : `${t.profile.height} cm`), 1)
          ]),
          e("div", null, [
            m[10] || (m[10] = e("dt", null, "体重", -1)),
            e("dd", null, a(t.profile.weight == null || t.profile.weight === "" ? "未填写" : `${t.profile.weight} kg`), 1)
          ]),
          e("div", null, [
            m[11] || (m[11] = e("dt", null, "每日活动", -1)),
            e("dd", null, a(d.value?.label || "未填写"), 1)
          ]),
          e("div", null, [
            m[12] || (m[12] = e("dt", null, "活动系数", -1)),
            e("dd", null, a(d.value ? "× " + d.value.factor : "未填写"), 1)
          ])
        ])
      ]),
      e("div", wv, [
        e("section", $v, [
          e("div", _v, [
            m[13] || (m[13] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            U(z, { name: "bowl" })
          ]),
          e("label", Cv, [
            m[14] || (m[14] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: m[1] || (m[1] = (v) => c.$emit("update:preferences", v.target.value))
            }, null, 40, Av)
          ]),
          m[15] || (m[15] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", Iv, [
          e("div", Sv, [
            m[16] || (m[16] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            U(z, { name: "shield" })
          ]),
          (s(), o(F, null, L(u, (v) => e("label", {
            key: v,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(v),
              onChange: (p) => r(v, p.target.checked, t.flags)
            }, null, 40, xv),
            e("span", null, a(v), 1)
          ])), 64)),
          m[17] || (m[17] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1))
        ])
      ])
    ], 64));
  }
}, Uv = {
  key: 0,
  class: "vb-page-title"
}, jv = { class: "vb-local-chip" }, Dv = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, Pv = { class: "vb-safety-grid" }, Nv = { class: "vb-icon-badge" }, Mv = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const l = _e.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", n = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + l + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (d, i) => (s(), o(F, null, [
      t.embedded ? $("", !0) : (s(), o("div", Uv, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", jv, [
          U(z, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = P("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (s(), o("section", Dv, [
        U(z, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + a(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : $("", !0),
      e("div", Pv, [
        (s(), o(F, null, L(n, ([u, r, c]) => e("article", {
          key: r,
          class: "vb-glass"
        }, [
          e("span", Nv, [
            U(z, {
              name: u,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, a(r), 1),
          e("p", null, a(c), 1)
        ])), 64))
      ]),
      U(Cn)
    ], 64));
  }
}, Rv = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, Tv = { class: "vb-glass vb-submission-hero" }, zv = { class: "vb-submission-hero-copy" }, Ov = { class: "vb-icon-badge" }, Fv = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, Bv = { class: "vb-submission-version" }, Vv = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, qv = { class: "vb-submission-step-top" }, Lv = { class: "vb-icon-badge" }, Gv = ["onClick"], Jv = { class: "vb-submission-columns" }, Hv = { class: "vb-glass vb-submission-panel" }, Kv = { class: "vb-submission-boundary" }, Wv = { class: "vb-icon-badge" }, Yv = { class: "vb-icon-badge" }, Xv = { class: "vb-icon-badge" }, Qv = { class: "vb-glass vb-submission-panel" }, Zv = { class: "vb-inline-note" }, em = { class: "vb-glass vb-submission-evidence" }, tm = { class: "vb-submission-evidence-actions" }, nm = /* @__PURE__ */ Je({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const l = {
      foodCount: Ge.length,
      sourcedCount: Ge.filter((d) => !!d.source?.id).length,
      categories: new Set(Ge.map((d) => d.category).filter(Boolean)).size,
      sourceName: "USDA Standard Reference 28（2016-05）"
    }, n = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (d, i) => (s(), o(F, null, [
      t.embedded ? $("", !0) : (s(), o("div", Rv, [
        i[4] || (i[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "在线评审入口 · 维衡 AI"),
          e("h1", null, "把营养建议放回真实的一餐"),
          e("p", null, "从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: i[0] || (i[0] = (u) => d.$emit("navigate", "mealplan"))
        }, [
          U(z, {
            name: "sparkles",
            size: 17
          }),
          i[3] || (i[3] = P("体验餐食规划 ", -1))
        ])
      ])),
      e("section", Tv, [
        e("div", zv, [
          e("span", Ov, [
            U(z, {
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
        e("div", Fv, [
          e("div", null, [
            e("strong", null, a(l.foodCount), 1),
            i[6] || (i[6] = e("span", null, "食物目录条目", -1))
          ]),
          e("div", null, [
            e("strong", null, a(l.sourcedCount), 1),
            i[7] || (i[7] = e("span", null, "有核验来源", -1))
          ]),
          e("div", null, [
            e("strong", null, a(l.categories), 1),
            i[8] || (i[8] = e("span", null, "食物分类", -1))
          ])
        ]),
        e("small", Bv, "数据版本：" + a(g(ns)) + " · " + a(l.sourceName), 1)
      ]),
      i[19] || (i[19] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("p", { class: "vb-eyebrow" }, "四步完成一条闭环"),
          e("h2", null, "从检索到回顾")
        ]),
        e("span", null, "每一步都可返回核对")
      ], -1)),
      e("section", Vv, [
        (s(), o(F, null, L(n, (u) => e("article", {
          key: u.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", qv, [
            e("span", null, a(u.number), 1),
            e("span", Lv, [
              U(z, {
                name: u.icon
              }, null, 8, ["name"])
            ])
          ]),
          e("h3", null, a(u.title), 1),
          e("p", null, a(u.copy), 1),
          e("button", {
            class: "vb-text-button",
            onClick: (r) => d.$emit("navigate", u.page)
          }, [
            P(a(u.action), 1),
            U(z, {
              name: "arrow",
              size: 15
            })
          ], 8, Gv)
        ])), 64))
      ]),
      e("div", Jv, [
        e("section", Hv, [
          i[12] || (i[12] = e("p", { class: "vb-eyebrow" }, "职责边界", -1)),
          i[13] || (i[13] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", Kv, [
            e("article", null, [
              e("span", Wv, [
                U(z, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Yv, [
                U(z, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Xv, [
                U(z, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", Qv, [
          i[15] || (i[15] = fn('<p class="vb-eyebrow">实现与隐私</p><h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>DeepSeek</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 3)),
          e("p", Zv, [
            U(z, {
              name: "info",
              size: 16
            }),
            i[14] || (i[14] = P("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", em, [
        i[18] || (i[18] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "可复核材料"),
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口 mock 测试与真实模型冒烟分开记录，真实调用未执行时不会记作通过。")
        ], -1)),
        e("div", tm, [
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[1] || (i[1] = (u) => d.$emit("navigate", "food"))
          }, [
            U(z, {
              name: "apple",
              size: 16
            }),
            i[16] || (i[16] = P("核对食物来源", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[2] || (i[2] = (u) => d.$emit("navigate", "assessment"))
          }, [
            U(z, {
              name: "report",
              size: 16
            }),
            i[17] || (i[17] = P("查看报告样例", -1))
          ])
        ])
      ])
    ], 64));
  }
}), sm = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], om = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], lm = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], am = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, im = { class: "vb-reference-list" }, rm = ["href"], um = {
  key: 1,
  class: "vb-data-note"
}, dm = { class: "vb-reference-terms" }, cm = {
  __name: "ReferencePanel",
  setup(t) {
    return (l, n) => (s(), o("section", am, [
      n[8] || (n[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      n[9] || (n[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      n[10] || (n[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", im, [
        (s(!0), o(F, null, L(g(sm), (d) => (s(), o("details", {
          key: d.id
        }, [
          e("summary", null, [
            e("strong", null, a(d.title), 1),
            e("span", null, a(d.status), 1)
          ]),
          e("dl", null, [
            e("div", null, [
              n[0] || (n[0] = e("dt", null, "用途与版本", -1)),
              e("dd", null, a(d.kind) + " · " + a(d.version) + " · " + a(d.volume), 1)
            ]),
            e("div", null, [
              n[1] || (n[1] = e("dt", null, "条目定位", -1)),
              e("dd", null, a(d.locator), 1)
            ]),
            e("div", null, [
              n[2] || (n[2] = e("dt", null, "适用范围", -1)),
              e("dd", null, a(d.scope), 1)
            ]),
            e("div", null, [
              n[3] || (n[3] = e("dt", null, "原始单位", -1)),
              e("dd", null, a(d.units), 1)
            ])
          ]),
          d.url ? (s(), o("a", {
            key: 0,
            href: d.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "核对公开来源 ↗", 8, rm)) : (s(), o("p", um, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", dm, [
        n[4] || (n[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (s(!0), o(F, null, L(g(lm), ([d, i, u]) => (s(), o("p", { key: d }, [
          e("strong", null, a(d) + " · " + a(i), 1),
          P("：" + a(u), 1)
        ]))), 128)),
        n[5] || (n[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        n[6] || (n[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (s(!0), o(F, null, L(g(om), (d) => (s(), o("li", { key: d }, a(d), 1))), 128))
        ]),
        n[7] || (n[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, vm = { class: "vb-page-title" }, mm = { class: "vb-local-chip" }, pm = { "aria-labelledby": "about-project-heading" }, bm = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, gm = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, fm = {
  key: 0,
  role: "alert"
}, ym = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, hm = { class: "vb-reset-actions" }, km = ["disabled"], wm = ["disabled"], $m = /* @__PURE__ */ Je({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const l = M(!1), n = M(!1), d = M("");
    function i() {
      try {
        const r = JSON.parse(we.getItem("weiheng.local.v2") || "{}"), c = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: r.profile || null, records: (Array.isArray(r.records) ? r.records : []).map((p) => ({ date: p.date, entries: p.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, m = URL.createObjectURL(new Blob([JSON.stringify(c, null, 2)], { type: "application/json" })), v = document.createElement("a");
        v.href = m, v.download = "维衡-当前档案与食物记录.json", v.click(), setTimeout(() => URL.revokeObjectURL(m), 1e3);
      } catch {
        d.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function u() {
      if (!n.value) {
        n.value = !0, d.value = "";
        try {
          await ps(), window.location.reload();
        } catch {
          d.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", n.value = !1;
        }
      }
    }
    return (r, c) => (s(), o(F, null, [
      e("div", vm, [
        c[5] || (c[5] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "项目介绍 · 使用边界 · 隐私说明"),
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", mm, [
          c[4] || (c[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          P(a(g(_e) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", pm, [
        c[6] || (c[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "作品说明"),
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ]),
          e("span", null, "功能流程与实现依据")
        ], -1)),
        U(nm, {
          embedded: "",
          onNavigate: c[0] || (c[0] = (m) => r.$emit("navigate", m))
        })
      ]),
      U(cm),
      e("section", bm, [
        c[7] || (c[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "安全中心"),
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ]),
          e("span", null, "把营养信息作为参考")
        ], -1)),
        U(Mv, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", gm, [
        e("div", null, [
          c[8] || (c[8] = e("p", { class: "vb-eyebrow" }, "当前使用空间的数据管理", -1)),
          c[9] || (c[9] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, a(g(_e) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          c[10] || (c[10] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          d.value ? (s(), o("p", fm, a(d.value), 1)) : $("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: c[1] || (c[1] = (m) => l.value = !0)
        }, "清空数据并重置")
      ]),
      l.value ? (s(), me(ot, {
        key: 0,
        title: g(_e) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: c[3] || (c[3] = (m) => !n.value && (l.value = !1))
      }, {
        default: st(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + a(g(_e) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          c[11] || (c[11] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          d.value ? (s(), o("p", ym, a(d.value), 1)) : $("", !0),
          e("div", hm, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: n.value,
              onClick: c[2] || (c[2] = (m) => l.value = !1)
            }, "取消", 8, km),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: n.value,
              onClick: u
            }, a(n.value ? "正在清理…" : "确认清空并重置"), 9, wm)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : $("", !0)
    ], 64));
  }
}), _m = ["data-theme"], Cm = ["inert"], Am = { class: "vb-main" }, Im = { class: "vb-topbar" }, Sm = { class: "vb-breadcrumb" }, xm = { class: "vb-topbar-actions" }, Em = { class: "vb-local-chip" }, Um = ["aria-label"], jm = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, Dm = { class: "vb-footer" }, Pm = {
  key: 4,
  class: "vb-toast",
  role: "status"
}, zm = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: l, theme: n, nutrition: d, records: i, storageError: u, updateProfile: r, saveRecord: c, addToDraft: m, addPlanToDraft: v, toggleHabit: p } = Lt(), { toggleTheme: b } = us(n), { reports: k, reportStorageError: h, loadReports: T, latestReport: S, isStale: w, generateReport: A } = Jt();
    T();
    const R = t, D = G(() => l.flags.includes("孕期或哺乳期") ? { ...l.profile, physiologicalStage: "special" } : l.profile || {}), N = M(R.initialPage), V = M(R.initialEditor), H = M(!1), O = M(null), K = M(null), W = M(null), ye = M(ke()), le = M(!1), he = M(""), X = M(""), B = M(""), E = G(() => k.value.find((Z) => Z.id === X.value) || S(he.value)), se = G(() => l.records.find((Z) => Z.date === he.value)), ne = { overview: "概览", dietAssistant: "维衡AI助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, J = G(() => _e.value ? vt.value === "error" ? "账号同步暂不可用 · 本机副本保留" : vt.value === "syncing" || vt.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let x, y = 0;
    function f(Z, q = null) {
      clearTimeout(x), O.value = { message: Z, undo: q }, x = setTimeout(() => O.value = null, 7e3);
    }
    function j(Z) {
      N.value = Z, window.scrollTo({ top: 0, behavior: "auto" }), Ee(() => K.value?.focus({ preventScroll: !0 }));
    }
    function re() {
      V.value = !1, H.value = !0;
    }
    function ie() {
      H.value = !1;
    }
    function _t(Z) {
      const q = r(Z);
      if (q) {
        f(q);
        return;
      }
      V.value = !1, j("overview"), f(_e.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function He(Z, q = !1) {
      const ee = ++y;
      B.value = "", he.value = Z.date, X.value = "";
      try {
        const ge = A(Z, D.value, { force: q });
        await Ee();
        const At = await ge;
        ee === y && he.value === Z.date && (X.value = At?.id || "");
      } catch (ge) {
        ee === y && (B.value = ge.message || "分析暂时不可用，请重试。");
      }
    }
    function Ct(Z) {
      if (!le.value) {
        le.value = !0;
        try {
          const q = c(Z);
          if (!q.ok) {
            f(q.error);
            return;
          }
          f("饮食记录已保存，正在分析"), He(q.record);
        } finally {
          le.value = !1;
        }
      }
    }
    function Ke(Z, q) {
      q ? k.value.find((ge) => ge.id === q) : S(Z), he.value = Z, X.value = q || "", B.value = "", l.records.find((ge) => ge.date === Z);
    }
    function We(Z = he.value) {
      const q = l.records.find((ee) => ee.date === Z);
      q && He(q, !0);
    }
    function lt(Z) {
      if (!Fe(Z.date) || Z.date > ke() || Number(Z.grams) < 0.1 || Number(Z.grams) > 5e3) {
        f("请核对日期与食用克数。");
        return;
      }
      const q = m(Z);
      ye.value = Z.date, W.value = null, j("diary"), f(q ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    async function Me(Z) {
      const q = $e();
      try {
        if (await qe(Z.items.map((ge) => ge.foodId)), q !== $e()) return;
      } catch (ge) {
        Z.onResult?.({ ok: !1, error: ge.message }), f(ge.message);
        return;
      }
      const ee = v(Z);
      if (Z.onResult?.(ee), !ee.ok) {
        f(ee.error);
        return;
      }
      ye.value = Z.date, j("diary"), f(ee.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function Ye(Z) {
      const q = l.records.find((ee) => ee.date === Z);
      q && (l.records = l.records.filter((ee) => ee.date !== Z), f("这条饮食记录已删除，报告快照仍保留。", () => {
        c(q), O.value = null;
      }));
    }
    return Ve(() => clearTimeout(x)), (Z, q) => (s(), o("div", {
      class: pe(["vb-app", { "is-diary": N.value === "diary", "is-chat": N.value === "dietAssistant" }]),
      "data-theme": g(n)
    }, [
      e("div", {
        inert: V.value || W.value || he.value || void 0
      }, [
        U(ds, {
          active: N.value,
          onNavigate: j
        }, null, 8, ["active"]),
        e("div", Am, [
          e("header", Im, [
            e("span", Sm, [
              q[15] || (q[15] = e("span", null, "营养工作台", -1)),
              q[16] || (q[16] = e("i", null, "/", -1)),
              P(a(ne[N.value]), 1)
            ]),
            e("div", xm, [
              e("span", Em, [
                q[17] || (q[17] = e("i", { class: "vb-status-dot" }, null, -1)),
                P(a(J.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                onClick: re
              }, a(g(_e) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": g(n) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: q[0] || (q[0] = (...ee) => g(b) && g(b)(...ee))
              }, [
                U(z, {
                  name: g(n) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, Um),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: q[1] || (q[1] = (ee) => j("profile"))
              }, [
                U(z, {
                  name: "person",
                  size: 18
                })
              ])
            ])
          ]),
          e("main", {
            ref_key: "content",
            ref: K,
            class: "vb-content",
            tabindex: "-1"
          }, [
            g(u) || g(h) ? (s(), o("p", jm, a(g(u) || g(h)), 1)) : $("", !0),
            (s(), o(F, { key: 1 }, [
              te(U(bi, {
                active: N.value === "dietAssistant",
                records: g(l).records,
                targets: g(d),
                profile: D.value
              }, null, 8, ["active", "records", "targets", "profile"]), [
                [Wn, N.value === "dietAssistant"]
              ]),
              N.value === "overview" ? (s(), me(cs, {
                key: 0,
                profile: D.value,
                nutrition: g(d),
                "record-count": g(i).length,
                records: g(i),
                onEdit: q[2] || (q[2] = (ee) => V.value = !0),
                onNavigate: j
              }, null, 8, ["profile", "nutrition", "record-count", "records"])) : $("", !0),
              N.value === "assessment" ? (s(), me(or, {
                key: 1,
                records: g(i),
                habits: g(l).habits,
                flags: g(l).flags,
                reports: g(k),
                profile: D.value,
                onNavigate: j,
                onToggleHabit: g(p),
                onOpenReport: Ke,
                onRetryReport: We
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : N.value === "diary" ? (s(), me(Tu, {
                key: 2,
                records: g(i),
                reports: g(k),
                profile: D.value,
                nutrition: g(d),
                "initial-date": ye.value,
                saving: le.value,
                onSave: Ct,
                onRemove: Ye,
                onAnalysis: Ke,
                onBrowse: q[3] || (q[3] = (ee) => j("food")),
                onDetail: q[4] || (q[4] = (ee) => W.value = g(ae)[ee])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving"])) : N.value === "food" ? (s(), me(Ld, {
                key: 3,
                onDetail: q[5] || (q[5] = (ee) => W.value = g(ae)[ee])
              })) : N.value === "mealplan" ? (s(), me(pv, {
                key: 4,
                nutrition: g(d),
                preferences: g(l).preferences,
                flags: g(l).flags,
                profile: D.value,
                records: g(l).records,
                onNavigate: j,
                onAddPlan: Me
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : N.value === "profile" ? (s(), me(Ev, {
                key: 5,
                profile: D.value,
                nutrition: g(d),
                flags: g(l).flags,
                "onUpdate:flags": q[6] || (q[6] = (ee) => g(l).flags = ee),
                preferences: g(l).preferences,
                "onUpdate:preferences": q[7] || (q[7] = (ee) => g(l).preferences = ee),
                onEdit: q[8] || (q[8] = (ee) => V.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences"])) : N.value === "about" ? (s(), me($m, {
                key: 6,
                flags: g(l).flags,
                onNavigate: j
              }, null, 8, ["flags"])) : $("", !0)
            ], 64)),
            e("footer", Dm, [
              U(z, {
                name: "leaf",
                size: 14
              }),
              q[18] || (q[18] = P("维衡 AI · 把健康，放进每一餐", -1)),
              q[19] || (q[19] = e("span", null, "营养信息仅供一般参考", -1))
            ])
          ], 512)
        ])
      ], 8, Cm),
      V.value ? (s(), me(ao, {
        key: 0,
        profile: g(l).profile,
        onComplete: _t,
        onClose: q[9] || (q[9] = (ee) => V.value = !1),
        onLogin: re
      }, null, 8, ["profile"])) : $("", !0),
      H.value ? (s(), me(vs, {
        key: 1,
        onClose: ie
      })) : $("", !0),
      W.value ? (s(), me(nl, {
        key: 2,
        "food-id": W.value.key,
        onClose: q[10] || (q[10] = (ee) => W.value = null),
        onAdd: lt
      }, null, 8, ["food-id"])) : $("", !0),
      he.value ? (s(), me(Rl, {
        key: 3,
        report: E.value,
        record: se.value,
        stale: E.value ? g(w)(E.value, se.value, D.value) : !1,
        error: B.value,
        onClose: q[11] || (q[11] = (ee) => {
          he.value = "", X.value = "";
        }),
        onRetry: q[12] || (q[12] = (ee) => We())
      }, null, 8, ["report", "record", "stale", "error"])) : $("", !0),
      O.value ? (s(), o("div", Pm, [
        U(z, {
          name: "check",
          size: 17
        }),
        e("span", null, a(O.value.message), 1),
        O.value.undo ? (s(), o("button", {
          key: 0,
          onClick: q[13] || (q[13] = (...ee) => O.value.undo && O.value.undo(...ee))
        }, "撤销")) : $("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: q[14] || (q[14] = (ee) => O.value = null)
        }, [
          U(z, {
            name: "close",
            size: 15
          })
        ])
      ])) : $("", !0)
    ], 10, _m));
  }
};
export {
  zm as default
};
