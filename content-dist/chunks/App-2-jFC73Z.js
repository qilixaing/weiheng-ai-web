import { r as M, a as W, b as Ze, w as de, o as s, d as o, e, F as V, f as J, n as kn, g as be, h as $t, i as j, j as I, k as Te, t as l, l as me, m as ee, v as re, p as N, u as p, q as Se, s as Ue, x as qe, y as Zn, z as st, A as He, B as Xe, C as es, D as wn, E as Et, G as ts } from "./vue-runtime-wiGxZMXT.js";
import { v as Be, t as we, F as oe, c as _t, r as et, n as ns, m as ss, a as Ot, e as Le, b as $n, d as yt, M as De, f as Lt, g as ht, h as _n, s as An, i as bt, j as on, N as os, k as Me, _ as Gt, l as as, C as jt, G as Cn, o as Ft, p as ls, q as Jt, u as an, P as Ut, R as is, w as Dt, x as rs, y as ln, A as We, z as vt, B as rn } from "./IntakeAnalysis-B99Grf8H.js";
import { s as tt, a as Ce, o as us, b as $e, t as Sn, c as ds, d as Ae, e as cs, f as vs, g as ms, h as pt } from "./main-DmghEwNS.js";
import { v as nt, A as Wt, c as In, _ as F, p as bs, a as xn, u as ps, b as fs, d as gs, e as ys } from "./useThemeTransition-Bj2FN4tp.js";
function hs(t, a) {
  if (!a || !Be(a.date) || a.date > we() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(a.meal) || !Array.isArray(a.items) || !a.items.length || a.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const n = String(a.confirmationId || "").slice(0, 100);
  if (!n) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(n)) return { draft: t, duplicate: !0 };
  const d = a.items.map((i) => {
    const r = oe[i.foodId], u = Number(i.grams);
    if (!r || !Number.isFinite(u) || u < 0.1 || u > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: n + ":" + r.key, foodId: r.key, name: r.name, grams: u, meal: a.meal, group: r.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: _t(r) };
  });
  if (new Set(d.map((i) => i.foodId)).size !== d.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...d], appliedBatches: [...t.appliedBatches || [], n] }, duplicate: !1 };
}
const Qe = tt("weiheng.reset-signal.v1"), En = (t) => us(t);
let Ve = !1;
const Ge = () => Ve;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== Qe || !t.newValue))
    try {
      const { phase: a } = JSON.parse(t.newValue);
      a === "begin" && (Ve = !0), a === "abort" && (Ve = !1), a === "done" && (Ve = !0, window.location.reload());
    } catch {
    }
});
function un(t, a) {
  return new Promise((n, d) => {
    const i = t.open(a);
    i.onerror = i.onblocked = () => d(new Error("本地文件存储暂时无法清理，请关闭其他旧页面后重试。")), i.onsuccess = () => {
      const r = i.result, u = Array.from(r.objectStoreNames);
      if (!u.length) {
        r.close(), n();
        return;
      }
      try {
        const m = r.transaction(u, "readwrite");
        for (const c of u) m.objectStore(c).clear();
        m.oncomplete = () => {
          r.close(), n();
        }, m.onerror = m.onabort = () => {
          r.close(), d(new Error("本地文件清理未完成，请重试。"));
        };
      } catch (m) {
        r.close(), d(m);
      }
    };
  });
}
function dn(t, a = !1) {
  const n = Array.from({ length: t.length }, (d, i) => t.key(i));
  for (const d of n) d && En(d) && !(a && d === Qe) && t.removeItem(d);
}
async function ks({
  local: t = globalThis.localStorage,
  session: a = globalThis.sessionStorage,
  databases: n = globalThis.indexedDB,
  caches: d = globalThis.caches
} = {}) {
  if (Ve) throw new Error("正在清理本地数据，请稍候。");
  Ve = !0;
  const i = (r) => t.setItem(Qe, JSON.stringify({ phase: r, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), Ce.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!n) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      un(n, tt("weiheng.media.v1")),
      un(n, tt("weiheng.chat-attachments.v1"))
    ]), d) for (const r of await d.keys()) En(r) && await d.delete(r);
    a && dn(a), dn(t, !0), i("done"), t.removeItem(Qe);
  } catch (r) {
    try {
      i("abort"), t.removeItem(Qe);
    } catch {
    }
    throw Ve = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), r;
  }
}
const kt = "weiheng.local.v2", jn = "weiheng.theme.v1", Oe = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function cn(t) {
  if (!t) return null;
  const a = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", n = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), d = Wt.some((r) => r.key === t.activity) ? t.activity : n[String(t.activity)] || "";
  if (nt({ ...t, sex: a, activity: d })) return null;
  const i = { ...t, sex: a, age: Oe(t.age), height: Oe(t.height), weight: Oe(t.weight), activity: d };
  return nt(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    a
  ), activity: String(d) };
}
function Un() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const a = JSON.parse($e.getItem(kt) || "null");
    if (a && typeof a == "object") {
      for (const i of [...Array.isArray(a.records) ? a.records : [], ...Object.values(a.drafts || {})]) for (const r of Array.isArray(i?.entries) ? i.entries : []) r.foodId === "cabbage" && r.name === "白菜" && (r.referenceConfirmed = !1);
      return { ...t, ...a, drafts: a.drafts && typeof a.drafts == "object" ? a.drafts : {}, profile: cn(a.profile), records: Array.isArray(a.records) ? a.records : [] };
    }
    const n = JSON.parse($e.getItem("vitabalance.v1") || $e.getItem("vitabalance.guest.v1") || "null"), d = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return n ? { ...t, profile: cn(n.profile), records: Array.isArray(n.records) ? n.records : [], plans: Array.isArray(n.plans) ? n.plans : [], flags: d.filter(([i]) => n.profile?.[i]).map(([, i]) => i), preferences: [n.profile?.avoid, n.profile?.allergies ? "需要核对的过敏或不耐受项：" + n.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const ce = Ze(Un()), Fe = M("");
let Bt = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  Bt = !0;
  try {
    Object.assign(ce, Un());
  } finally {
    Bt = !1;
  }
});
const ws = (() => {
  try {
    return $e.getItem(jn);
  } catch {
    return null;
  }
})(), Dn = M(ws === "dark" ? "dark" : "light"), ft = W(() => In(ce.flags.includes("孕期或哺乳期") ? null : ce.profile));
de(ce, () => {
  if (!(Ge() || Bt))
    try {
      $e.setItem(kt, JSON.stringify({ ...ce, calculated: ft.value })), Fe.value = "";
    } catch {
      Fe.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
de(Dn, (t) => {
  if (!Ge())
    try {
      $e.setItem(jn, t);
    } catch {
      Fe.value = "主题偏好暂时无法保存。";
    }
});
function Ht() {
  const t = W(() => [...ce.records].sort((c, v) => v.date.localeCompare(c.date)));
  function a(c) {
    const v = nt(c);
    return v || (ce.profile = { ...ce.profile, sex: c.sex || "", ageMonths: Oe(c.ageMonths), physiologicalStage: c.physiologicalStage || "general", age: Oe(c.age), height: Oe(c.height), weight: Oe(c.weight), activity: c.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function n(c) {
    if (Ge()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Be(c.date)) return { ok: !1, error: "请选择有效日期。" };
    const v = ce.records.find((g) => g.date === c.date), h = Array.isArray(c.entries) ? ss(c, v) : (
      /** @type {DailyRecord} */
      { ...c, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (v && Ot(v) === Ot(h)) return { ok: !0, record: v, unchanged: !0 };
    const C = [...ce.records.filter((g) => g.date !== h.date), h];
    try {
      $e.setItem(kt, JSON.stringify({ ...ce, records: C, calculated: ft.value }));
    } catch {
      return Fe.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: Fe.value };
    }
    return ce.records = C, { ok: !0, record: h };
  }
  function d(c, v) {
    const h = i(c);
    h && (h.savedEntries = JSON.parse(JSON.stringify(Array.isArray(v?.entries) ? v.entries : [])), h.entries = [], h.recognition = null, h.appliedBatches = []);
  }
  function i(c) {
    if (!Be(c)) return null;
    if (!ce.drafts[c]) {
      const v = ce.records.find((h) => h.date === c);
      ce.drafts[c] = { date: c, entries: et(v), notes: v?.notes || "", photoId: v?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return ce.drafts[c];
  }
  function r(c) {
    const v = i(c.date);
    if (!v) return !1;
    const h = oe[c.foodId || ""];
    return v.entries.push({ id: crypto.randomUUID(), foodId: c.foodId || null, name: h?.name || c.name || "", grams: Number(c.grams), meal: c.meal || "unspecified", group: c.group, source: c.source || "catalogue", estimated: !!c.estimated, referenceConfirmed: !0, nutritionSnapshot: ns(c.nutritionSnapshot, h?.key) || _t(h) }), !Fe.value;
  }
  function u(c, v) {
    const h = new Set(ce.habits[c] || []);
    h.has(v) ? h.delete(v) : h.add(v), ce.habits[c] = [...h];
  }
  function m(c) {
    if (Ge()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const v = ce.drafts[c.date] || { date: c.date, entries: et(ce.records.find((g) => g.date === c.date)), appliedBatches: [] }, h = hs(v, c);
      if (h.duplicate) return { ok: !0, duplicate: !0 };
      const C = { ...ce.drafts, [c.date]: h.draft };
      return $e.setItem(kt, JSON.stringify({ ...ce, drafts: C, calculated: ft.value })), ce.drafts = C, { ok: !0, duplicate: !1 };
    } catch (v) {
      return { ok: !1, error: v.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: ce, theme: Dn, nutrition: ft, records: t, storageError: Fe, updateProfile: a, saveRecord: n, clearDraftAfterSave: d, ensureDraft: i, addToDraft: r, addPlanToDraft: m, toggleHabit: u };
}
let Pt;
function $s() {
  return Pt || (Pt = new Promise((t, a) => {
    if (!globalThis.indexedDB) {
      a(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const n = indexedDB.open(tt("weiheng.media.v1"), 1);
    n.onupgradeneeded = () => {
      const d = n.result;
      for (const i of ["photos", "reports"]) d.objectStoreNames.contains(i) || d.createObjectStore(i, { keyPath: "id" });
    }, n.onsuccess = () => t(n.result), n.onerror = () => a(new Error("无法打开本地存储，请检查浏览器隐私设置。")), n.onblocked = () => a(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), Pt;
}
async function At(t, a, n) {
  const d = await $s();
  if (a === "readwrite" && Ge()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, r) => {
    const u = d.transaction(t, a);
    let m;
    const c = n(u.objectStore(t));
    c.onsuccess = () => {
      m = c.result;
    }, u.oncomplete = () => i(m), u.onabort = u.onerror = () => r(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const Vt = (t, a) => At(t, "readwrite", (n) => n.put(JSON.parse(JSON.stringify(a)))), _s = (t, a) => At(t, "readonly", (n) => n.get(a)), As = (t) => At(t, "readonly", (a) => a.getAll()), Cs = (t, a) => At(t, "readwrite", (n) => n.delete(a));
async function Ct(t, a) {
  let n;
  try {
    n = await fetch("/api/ai/" + t, { method: a === void 0 ? "GET" : "POST", headers: a === void 0 ? {} : { "Content-Type": "application/json" }, body: a === void 0 ? void 0 : JSON.stringify(a), signal: Sn(9e4) });
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
async function Pn(t, a, n, d) {
  const i = Sn(9e4), r = d ? ds([d, i]) : i;
  let u;
  try {
    u = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    a, stream: !0 }), signal: r });
  } catch (b) {
    throw new Error(b?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  if (!u.ok) {
    let b;
    try {
      b = await u.json();
    } catch {
      throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
    }
    const S = new Error(b.error || "AI 服务暂时不可用。");
    throw S.code = b.code, S;
  }
  if (!u.body) throw new Error("浏览器没有提供流式读取能力，请更新浏览器后重试。");
  const m = u.body.getReader(), c = new TextDecoder();
  let v = "", h = !1, C = null;
  const g = (b) => {
    const S = b.split(/\r?\n/).filter((w) => w.startsWith("data:")).map((w) => w.slice(5).trimStart()).join(`
`);
    if (!S) return;
    let y;
    try {
      y = JSON.parse(S);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (y?.type === "error") {
      const w = new Error(y.message || "AI 暂时无法回复，请重试。");
      throw w.code = y.code, w;
    }
    if (y?.type === "progress" && y.step) {
      n(y);
      return;
    }
    if (y?.type === "status" && typeof y.message == "string") {
      n(y);
      return;
    }
    if (y?.type === "delta" && typeof y.text == "string") {
      n(y);
      return;
    }
    y?.type === "done" && typeof y.model == "string" && (C = y, h = !0, n(y));
  };
  try {
    for (; !h; ) {
      const { value: b, done: S } = await m.read();
      if (S) break;
      v += c.decode(b, { stream: !0 });
      let y;
      for (; (y = v.search(/\r?\n\r?\n/)) >= 0; ) {
        const w = v.slice(y).match(/^\r?\n\r?\n/)[0];
        if (g(v.slice(0, y)), v = v.slice(y + w.length), h) break;
      }
    }
    if (v += c.decode(), v.trim() && !h && g(v), !h || !C) throw new Error("AI 流式连接提前结束，请重试。");
    return C;
  } finally {
    m.releaseLock();
  }
}
async function Ss(t, a) {
  const n = await Pn("meal-plan", t, (d) => {
    d.type === "progress" && a(d.step);
  });
  if (!n.result || !["ready", "needs_evidence"].includes(n.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return n.result;
}
const Re = M([]), wt = M(""), Nt = /* @__PURE__ */ new Map();
let Mt;
function Kt(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function Is(t) {
  return t.filter((a) => {
    const n = a.referenceConfirmed === !1 ? void 0 : oe[a.foodId || ""];
    return De.some((d) => {
      const i = Lt(a, n, d.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function vn(t) {
  Re.value = [t, ...Re.value.filter((a) => a.id !== t.id)].sort((a, n) => n.requestedAt.localeCompare(a.requestedAt));
}
async function gt(t) {
  try {
    await Vt("reports", t), wt.value = "", vn(t);
  } catch (a) {
    throw wt.value = Kt(a), vn({ ...t, persistenceFailed: !0 }), a;
  }
}
function Nn() {
  return Mt || (Mt = (async () => {
    try {
      Re.value = (await As("reports")).sort((t, a) => a.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Re.value])
        t.status === "pending" && await gt({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      wt.value = Kt(t);
    }
  })()), Mt;
}
function xs(t) {
  return Re.value.find((a) => a.date === t);
}
function Es(t, a, n) {
  return !a || t.dataVersion !== $n(a, n);
}
async function js(t, a, { force: n = !1 } = {}) {
  const d = Ae();
  if (await Le(et(t).filter((g) => g.foodId && !g.nutritionSnapshot).map((g) => String(g.foodId))), Ae() !== d || (await Nn(), Ae() !== d)) return;
  const i = $n(t, a), r = `${d}:${t.date}:${i}`, u = Nt.get(r);
  if (u) return u;
  const m = Re.value.find(
    (g) => g.date === t.date && g.dataVersion === i && g.status === "complete" && !g.persistenceFailed
  );
  if (m && !n) return m;
  const c = {
    sex: a?.sex,
    age: a?.age,
    height: a?.height,
    weight: a?.weight,
    activity: a?.activity,
    ageMonths: a?.ageMonths,
    physiologicalStage: a?.physiologicalStage
  }, v = et(t), h = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: Ot(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: v,
      intake: yt(v),
      profile: c
    },
    result: null,
    error: ""
  }, C = (async () => {
    await gt(h);
    try {
      const g = await Ct("analyze-day", {
        date: t.date,
        entries: v,
        profile: c,
        requestId: h.id
      });
      if (Ae() !== d) return;
      const b = Is(v);
      if (b.length) {
        const w = g.calculation?.estimation, _ = w?.foods || [];
        if (!(w?.status === "complete" && w.missingFoodCount === b.length && _.length === b.length && b.every((T) => {
          const D = _.find((R) => R.entryId === String(v.indexOf(T))), O = T.referenceConfirmed === !1 ? void 0 : oe[T.foodId || ""], Q = De.filter((R) => {
            const q = Lt(T, O, R.id);
            return typeof q.value != "number" && !q.range;
          }).map((R) => R.id);
          return !!(D && Q.every((R) => {
            const q = D.values[R], X = De.find((pe) => pe.id === R);
            return q && X && ht(q, X.unit) !== null;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      const S = _n(v, g.calculation?.estimation?.foods || [], { model: g.model, generatedAt: g.generatedAt }), y = yt(S);
      await gt({
        ...h,
        snapshot: { ...h.snapshot, entries: S, intake: y },
        status: "complete",
        generatedAt: g.generatedAt,
        model: g.model,
        result: g.analysis,
        calculation: g.calculation ? { ...g.calculation, intake: y } : g.calculation
      });
    } catch (g) {
      if (Ae() !== d) return;
      await gt({ ...h, status: "failed", error: Kt(g) });
    }
    return Re.value.find((g) => g.id === h.id);
  })();
  Nt.set(r, C);
  try {
    return await C;
  } finally {
    Nt.delete(r);
  }
}
function Yt() {
  return {
    reports: Re,
    reportStorageError: wt,
    loadReports: Nn,
    latestReport: xs,
    isStale: Es,
    generateReport: js
  };
}
const Us = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], Ds = {
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
    const n = t, d = a, i = M(null), r = M(!1), u = W(() => (n.max - n.min) * 0.16), m = W(() => {
      const w = Number(n.modelValue);
      return String(n.modelValue).trim() && Number.isFinite(w) ? Math.min(n.max, Math.max(n.min, w)) : n.fallback;
    }), c = W(() => {
      const w = (m.value - n.min) / u.value, _ = w - Math.round(w);
      return Array.from({ length: 31 }, (z, T) => ({
        key: T,
        major: T % 5 === 0,
        left: `${50 + (T - 15 - _) / 30 * 100}%`
      }));
    });
    let v = null;
    function h(w) {
      const _ = Math.round((w - n.min) / n.step), z = n.step < 1 ? 1 : 0;
      return Number(Math.min(n.max, Math.max(n.min, n.min + _ * n.step)).toFixed(z));
    }
    function C(w) {
      d("update:modelValue", h(w));
    }
    function g(w) {
      w.pointerType === "mouse" && w.button !== 0 || (w.preventDefault(), i.value.setPointerCapture(w.pointerId), r.value = !0, v = { x: w.clientX, value: m.value });
    }
    function b(w) {
      if (!v || !r.value) return;
      const _ = i.value.getBoundingClientRect().width || 1;
      C(v.value + (w.clientX - v.x) / _ * u.value);
    }
    function S() {
      r.value = !1, v = null;
    }
    function y(w) {
      const _ = {
        ArrowRight: n.step,
        ArrowUp: n.step,
        ArrowLeft: -n.step,
        ArrowDown: -n.step,
        PageUp: n.step * 10,
        PageDown: -n.step * 10
      };
      w.key === "Home" ? (w.preventDefault(), C(n.min)) : w.key === "End" ? (w.preventDefault(), C(n.max)) : _[w.key] && (w.preventDefault(), C(m.value + _[w.key]));
    }
    return (w, _) => (s(), o("div", {
      ref_key: "ruler",
      ref: i,
      class: be(["vb-ruler", { "is-dragging": r.value }]),
      role: "slider",
      tabindex: "0",
      "aria-label": `${t.label}刻度`,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": m.value,
      "aria-valuetext": `${m.value} ${t.unit}`,
      "aria-orientation": "horizontal",
      onPointerdown: g,
      onPointermove: b,
      onPointerup: S,
      onPointercancel: S,
      onLostpointercapture: S,
      onKeydown: y
    }, [
      _[0] || (_[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (s(!0), o(V, null, J(c.value, (z) => (s(), o("i", {
        key: z.key,
        class: be({ major: z.major }),
        style: kn({ left: z.left })
      }, null, 6))), 128)),
      _[1] || (_[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, Us));
  }
}, Ps = { class: "vb-dialog-overlay" }, Ns = { class: "vb-wizard-top" }, Ms = { class: "vb-icon-badge" }, Ts = ["aria-valuenow", "aria-label"], Rs = { class: "vb-wizard-copy" }, zs = { class: "vb-small-label" }, Os = { id: "vb-wizard-title" }, Fs = { id: "vb-step-hint" }, Bs = {
  key: 0,
  class: "vb-sex-field"
}, Vs = { class: "vb-sr-only" }, qs = ["aria-pressed", "onClick"], Ls = { class: "vb-person-symbol" }, Gs = { class: "vb-choice-check" }, Js = {
  key: 1,
  class: "vb-number-step"
}, Ws = { for: "vb-step-number" }, Hs = { class: "vb-number-control" }, Ks = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], Ys = {
  key: 0,
  class: "vb-field"
}, Xs = { class: "vb-input-range" }, Qs = {
  key: 2,
  class: "vb-activity-field"
}, Zs = { class: "vb-sr-only" }, eo = ["aria-pressed", "onClick"], to = { class: "vb-activity-icon" }, no = { class: "vb-radio-mark" }, so = { key: 0 }, oo = {
  key: 3,
  class: "vb-field"
}, ao = {
  key: 4,
  class: "vb-skip-row"
}, lo = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, io = { class: "vb-wizard-actions" }, ro = ["disabled"], uo = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, co = { class: "vb-wizard-account-login" }, vo = { class: "vb-wizard-privacy" }, mo = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: a }) {
    const n = t, d = a, i = Ze(n.profile ? { ...n.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), r = M(0), u = M(""), m = M(null), c = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], v = W(() => {
      const w = c[r.value], _ = bs(i.age)[w.key];
      return _ ? { ...w, min: _[0], max: _[1] } : w;
    });
    function h() {
      if (r.value === 0 || r.value === 4 || !String(i[v.value.key] ?? "").trim()) return "";
      const w = Number(i[v.value.key]);
      return !Number.isFinite(w) || w < v.value.min || w > v.value.max || r.value === 1 && !Number.isInteger(w) ? `请输入 ${v.value.min}–${v.value.max} ${v.value.unit}${r.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function C(w) {
      i.sex = w, u.value = "";
    }
    function g() {
      i[v.value.key] = "", u.value = "", r.value < 4 && r.value++;
    }
    function b() {
      if (u.value = h(), !u.value) {
        if (r.value < 4) {
          r.value++;
          return;
        }
        u.value = nt(i), u.value || d("complete", { ...i });
      }
    }
    function S() {
      Ue(() => m.value?.querySelector(".vb-step-input, .vb-choice-button, .vb-activity-choice")?.focus());
    }
    de(r, () => {
      u.value = "", S();
    }), $t(S);
    function y(w) {
      if (w.key === "Escape" && n.profile) {
        d("close");
        return;
      }
      if (w.key !== "Tab") return;
      const _ = [...m.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], z = _[0], T = _.at(-1);
      w.shiftKey && document.activeElement === z ? (w.preventDefault(), T.focus()) : !w.shiftKey && document.activeElement === T && (w.preventDefault(), z.focus());
    }
    return (w, _) => (s(), o("div", Ps, [
      e("section", {
        ref_key: "dialog",
        ref: m,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: y
      }, [
        e("div", Ns, [
          e("span", Ms, [
            j(F, { name: "leaf" })
          ]),
          _[10] || (_[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (s(), o("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: _[0] || (_[0] = (z) => w.$emit("close"))
          }, [
            j(F, { name: "close" })
          ])) : I("", !0)
        ]),
        e("div", {
          class: "vb-wizard-progress",
          role: "progressbar",
          "aria-valuenow": r.value + 1,
          "aria-valuemin": "1",
          "aria-valuemax": "5",
          "aria-label": `档案设置，第 ${r.value + 1} 步，共 5 步`
        }, [
          (s(), o(V, null, J(5, (z) => e("span", {
            key: z,
            class: be({ filled: z <= r.value + 1 })
          }, null, 2)), 64))
        ], 8, Ts),
        e("form", {
          onSubmit: Te(b, ["prevent"])
        }, [
          e("div", Rs, [
            e("span", zs, "第 " + l(r.value + 1) + " 步 / 共 5 步", 1),
            e("h2", Os, l(v.value.title), 1),
            e("p", Fs, l(v.value.hint), 1)
          ]),
          r.value === 0 ? (s(), o("fieldset", Bs, [
            e("legend", Vs, l(v.value.question), 1),
            (s(), o(V, null, J([["male", "男性"], ["female", "女性"]], ([z, T]) => e("button", {
              key: z,
              type: "button",
              class: be(["vb-choice-button", { selected: i.sex === z }]),
              "aria-pressed": i.sex === z,
              onClick: (D) => C(z)
            }, [
              e("span", Ls, l(z === "male" ? "♂" : "♀"), 1),
              e("strong", null, l(T), 1),
              e("span", Gs, [
                i.sex === z ? (s(), me(F, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : I("", !0)
              ])
            ], 10, qs)), 64))
          ])) : r.value < 4 ? (s(), o("div", Js, [
            e("label", Ws, l(v.value.question), 1),
            e("div", Hs, [
              ee((s(), o("input", {
                id: "vb-step-number",
                key: v.value.key,
                "onUpdate:modelValue": _[1] || (_[1] = (z) => i[v.value.key] = z),
                class: "vb-step-input",
                type: "number",
                inputmode: r.value === 1 ? "numeric" : "decimal",
                min: v.value.min,
                max: v.value.max,
                step: r.value === 1 ? 1 : 0.1,
                placeholder: v.value.placeholder,
                "aria-invalid": !!u.value,
                "aria-describedby": u.value ? "vb-step-error" : "vb-step-hint",
                onInput: _[2] || (_[2] = (z) => u.value = "")
              }, null, 40, Ks)), [
                [re, i[v.value.key]]
              ]),
              e("span", null, l(v.value.unit), 1)
            ]),
            j(Ds, {
              modelValue: i[v.value.key],
              "onUpdate:modelValue": [
                _[3] || (_[3] = (z) => i[v.value.key] = z),
                _[4] || (_[4] = (z) => u.value = "")
              ],
              min: v.value.min,
              max: v.value.max,
              step: r.value === 1 ? 1 : 0.1,
              fallback: Number(v.value.placeholder),
              label: v.value.question,
              unit: v.value.unit
            }, null, 8, ["modelValue", "min", "max", "step", "fallback", "label", "unit"]),
            r.value === 1 && String(i.age) === "0" ? (s(), o("label", Ys, [
              _[11] || (_[11] = N("月龄（可选，0–11个月）", -1)),
              ee(e("input", {
                "onUpdate:modelValue": _[5] || (_[5] = (z) => i.ageMonths = z),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [re, i.ageMonths]
              ])
            ])) : I("", !0),
            e("p", Xs, l(v.value.min) + "–" + l(v.value.max) + " " + l(v.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (s(), o("fieldset", Qs, [
            e("legend", Zs, l(v.value.question), 1),
            (s(!0), o(V, null, J(p(Wt), (z) => (s(), o("button", {
              key: z.key,
              type: "button",
              class: be(["vb-activity-choice", { selected: i.activity === z.key }]),
              "aria-pressed": i.activity === z.key,
              onClick: (T) => i.activity = z.key
            }, [
              e("span", to, [
                j(F, {
                  name: z.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, l(z.label), 1),
                e("small", null, l(z.detail), 1)
              ]),
              e("span", no, [
                i.activity === z.key ? (s(), o("i", so)) : I("", !0)
              ])
            ], 10, eo))), 128))
          ])),
          r.value === 4 ? (s(), o("label", oo, [
            _[13] || (_[13] = N("生理阶段（可选）", -1)),
            ee(e("select", {
              "onUpdate:modelValue": _[6] || (_[6] = (z) => i.physiologicalStage = z)
            }, [..._[12] || (_[12] = [
              e("option", { value: "general" }, "一般情况", -1),
              e("option", { value: "pregnant" }, "孕期", -1),
              e("option", { value: "lactating" }, "哺乳期", -1),
              e("option", { value: "special" }, "其他需专业评估的情况", -1)
            ])], 512), [
              [Se, i.physiologicalStage]
            ]),
            _[14] || (_[14] = e("small", null, "特殊阶段暂停通用营养目标；记录和查询仍可使用。", -1))
          ])) : I("", !0),
          r.value < 4 ? (s(), o("div", ao, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: g
            }, "跳过此项")
          ])) : I("", !0),
          e("p", lo, l(u.value), 1),
          e("div", io, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: r.value === 0 && !t.profile,
              onClick: _[7] || (_[7] = (z) => r.value > 0 ? r.value-- : w.$emit("close"))
            }, [
              j(F, {
                name: "back",
                size: 17
              }),
              N(l(r.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, ro),
            e("button", uo, [
              N(l(r.value === 4 ? "保存我的身体档案" : "下一步"), 1),
              j(F, {
                name: "arrow",
                size: 17
              })
            ])
          ])
        ], 32),
        e("button", {
          type: "button",
          class: "vb-button vb-button-quiet vb-skip-all",
          onClick: _[8] || (_[8] = (z) => d("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", co, [
          _[15] || (_[15] = N("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: _[9] || (_[9] = (z) => d("login"))
          }, "登录")
        ]),
        e("p", vo, [
          j(F, {
            name: "lock",
            size: 13
          }),
          _[16] || (_[16] = N("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, St = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function Xt(t) {
  if (t?.__summary) return t.state || "";
  if (!t?.expanded) return t?.state || "";
  const a = String(t.source?.description || ""), n = [];
  return /\bRAW\b/.test(a) ? n.push("生") : /\bRSTD\b|ROASTED/.test(a) ? n.push("烤熟") : /\bBKD\b/.test(a) ? n.push("烘焙") : /FRIED/.test(a) ? n.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(a) && n.push("熟"), /\bDRY MIX\b/.test(a) ? n.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(a) && n.push("干制"), /\bCND\b/.test(a) && n.push("罐装"), /\bFRZ\b|FROZEN/.test(a) && n.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(a) ? n.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(a) && n.push("加盐"), n.length ? n.join(" · ") : "具体品种与配方见数据来源";
}
const Mn = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function bo(t) {
  return (Mn.find((n) => n.items.some(([d]) => d === t?.key) || [n.name, ...n.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([n]) => oe[n]?.source).map(([n, d]) => ({ id: n, label: d }));
}
const po = Object.fromEntries(Mn.flatMap((t) => t.items)), Tn = (t) => po[t] || "";
function fo(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function Rn(t) {
  const a = M(null), n = M(!1), d = M(!1);
  let i = 0;
  async function r(u = !1) {
    const m = p(typeof t == "function" ? t() : t), c = ++i;
    if (a.value = null, d.value = !1, n.value = !!m && !m.image, !m) {
      n.value = !1;
      return;
    }
    try {
      a.value = await fo(m, { force: u }), d.value = !a.value;
    } catch {
      d.value = !0;
    } finally {
      c === i && (n.value = !1);
    }
  }
  return de(() => {
    const u = p(typeof t == "function" ? t() : t);
    return [u?.key, u?.image];
  }, () => r(), { immediate: !0 }), { photo: a, loading: n, failed: d, retry: () => r(!0) };
}
function Je(t) {
  const a = typeof t == "string" ? t.trim() : "";
  return !a || /deepseek/i.test(a) ? "维衡 AI" : a;
}
const go = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, yo = { key: 0 }, ho = { key: 1 }, ko = {
  key: 2,
  role: "status"
}, wo = { key: 3 }, $o = { class: "vb-portion-macros" }, _o = { key: 0 }, Ao = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, Co = { class: "vb-estimate-adjust" }, So = { class: "vb-field" }, Io = ["disabled"], xo = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: a }) {
    const n = t, d = a, i = M(!1), r = M(""), u = M(null), m = M("");
    let c = 0;
    function v(b) {
      try {
        const y = JSON.parse($e.getItem("weiheng.food-estimate." + b?.key) || "null");
        if (y?.estimate)
          return u.value = { ...y, cached: !0 }, m.value = y.recipe || "", d("resolved", u.value), !0;
      } catch {
      }
      const S = An.estimates?.[b?.key];
      return S ? (u.value = { foodId: b.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: S.model, generatedAt: S.generatedAt, estimate: { entryId: b.key, name: b.name, grams: 100, values: S.values, assumption: S.assumption } }, d("resolved", u.value), !0) : !1;
    }
    async function h() {
      const b = ++c, S = n.food?.key;
      i.value = !0, r.value = "", u.value = null, d("resolved", null);
      try {
        const y = await Ct("food-estimate", { foodId: S, recipe: m.value.trim() });
        if (b !== c) return;
        u.value = y;
        try {
          $e.setItem("weiheng.food-estimate." + S, JSON.stringify({ ...y, recipe: m.value }));
        } catch {
          r.value = "估算已返回，但本机缓存保存失败。";
        }
        d("resolved", y);
      } catch (y) {
        b === c && (r.value = y.message);
      } finally {
        b === c && (i.value = !1);
      }
    }
    de(() => n.food?.key, () => {
      c++, m.value = "", r.value = "", i.value = !1, u.value = null, n.food && v(n.food);
    }, { immediate: !0 }), qe(() => {
      c++;
    });
    const C = (b, S) => ht(b, S), g = () => Object.values(u.value?.estimate?.values || {}).some((b) => b && typeof b.value != "number" && typeof b.low == "number" && typeof b.high == "number");
    return (b, S) => (s(), o("section", go, [
      e("h3", null, l(u.value ? "AI 估算参考" : "AI 营养估算"), 1),
      u.value?.estimate ? (s(), o("p", yo, [...S[1] || (S[1] = [
        e("strong", null, "每100克可食部 · AI单值参考，不是数据库值", -1)
      ])])) : (s(), o("p", ho, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (s(), o("p", ko, "正在估算…")) : I("", !0),
      u.value?.estimate ? (s(), o("div", wo, [
        e("div", $o, [
          (s(!0), o(V, null, J(p(De).filter((y) => C(u.value.estimate.values[y.id], y.unit) !== null), (y) => (s(), o("div", {
            key: y.id
          }, [
            e("span", null, l(y.name), 1),
            e("strong", null, [
              N(l(C(u.value.estimate.values[y.id], y.unit)) + " ", 1),
              e("small", null, l(y.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, l(g() ? "旧估算范围按上下限中点换为单值参考；" : "") + l(u.value.estimate.assumption), 1),
        u.value.cached ? (s(), o("small", _o, "已保存的预估 · " + l(p(Je)(u.value.model || u.value.requestedModel)) + " · " + l(u.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : I("", !0),
        S[2] || (S[2] = e("small", null, "按常见品种与做法给出单一参考值。实际配方、用油和份量会造成误差；维生素和矿物质仍显示未知。", -1))
      ])) : I("", !0),
      r.value ? (s(), o("p", Ao, l(r.value), 1)) : I("", !0),
      e("details", Co, [
        e("summary", null, l(u.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", So, [
          S[3] || (S[3] = N("原料与做法", -1)),
          ee(e("textarea", {
            "onUpdate:modelValue": S[0] || (S[0] = (y) => m.value = y),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [re, m.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: h
        }, l(i.value ? "估算中…" : r.value ? "重试估算" : u.value ? "按补充内容重新估算" : "生成估算"), 9, Io)
      ])
    ]));
  }
};
function Eo(t) {
  const a = String(t?.name || ""), n = String(t?.state || ""), d = (i, r) => ({ label: `${i} · 估算${r}克`, grams: r });
  return /米饭/.test(a) && !/生|干/.test(n) ? [d("小碗", 100), d("中碗", 150), d("大碗", 200)] : /鸡蛋/.test(a) && !/粉|液|鸭|鹅/.test(a) ? [d("1个去壳", 50)] : /香蕉/.test(a) ? [d("1根去皮", 100)] : /苹果/.test(a) ? [d("小个去核", 150), d("中个去核", 200)] : /牛奶|酸奶/.test(a) && !/粉|干酪|奶油/.test(a) ? [d("小杯（按重量）", 200), d("一份（按重量）", 250)] : [];
}
const jo = {
  key: 0,
  class: "vb-portion-presets"
}, Uo = ["onClick"], zn = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: a }) {
    const n = t, d = a, i = W(() => Eo(n.food));
    return (r, u) => i.value.length ? (s(), o("div", jo, [
      u[0] || (u[0] = e("span", null, "份量参考", -1)),
      (s(!0), o(V, null, J(i.value, (m) => (s(), o("button", {
        key: m.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (c) => d("choose", m.grams)
      }, l(m.label), 9, Uo))), 128)),
      u[1] || (u[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : I("", !0);
  }
}, Do = ["src", "alt", "loading"], Po = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, Qt = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: a }) {
    const n = t, d = a, i = M(!1);
    return de(() => n.photo?.image, () => i.value = !1), (r, u) => (s(), o("div", {
      class: be(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (s(), o("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: u[0] || (u[0] = (m) => {
          i.value = !0, d("image-error");
        })
      }, null, 40, Do)) : (s(), o("div", Po, [
        j(F, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, l(p(Tn)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, l(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (s(), o("span", {
        key: 2,
        class: be({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, l(t.photo.imageLabel || "食物照片"), 3)) : I("", !0)
    ], 2));
  }
}), No = ["aria-label"], Mo = ["aria-label"], To = { class: "vb-feature-dialog-body" }, ot = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: a }) {
    const n = a, d = M(null), i = document.activeElement;
    $t(() => Ue(() => d.value?.focus())), qe(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function r(u) {
      if (u.key === "Escape" && (u.preventDefault(), n("close")), u.key !== "Tab") return;
      const m = [...d.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((h) => h.getClientRects().length);
      if (!m.length) {
        u.preventDefault();
        return;
      }
      const c = m[0], v = m.at(-1);
      u.shiftKey && (document.activeElement === c || document.activeElement === d.value) ? (u.preventDefault(), v.focus()) : !u.shiftKey && document.activeElement === v && (u.preventDefault(), c.focus());
    }
    return (u, m) => (s(), o("div", {
      class: "vb-feature-overlay",
      onClick: m[1] || (m[1] = Te((c) => u.$emit("close"), ["self"]))
    }, [
      e("section", {
        ref_key: "panel",
        ref: d,
        class: be(["vb-feature-dialog", { "is-wide": t.wide }]),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t.title,
        tabindex: "-1",
        onKeydown: r
      }, [
        e("header", null, [
          e("h2", null, l(t.title), 1),
          e("button", {
            type: "button",
            class: "vb-icon-button",
            "aria-label": "关闭" + t.title,
            onClick: m[0] || (m[0] = (c) => u.$emit("close"))
          }, [
            j(F, { name: "close" })
          ], 8, Mo)
        ]),
        e("div", To, [
          Zn(u.$slots, "default")
        ])
      ], 42, No)
    ]));
  }
}, Ro = { class: "vb-food-detail-top" }, zo = { class: "vb-eyebrow" }, Oo = { class: "vb-food-state" }, Fo = { class: "vb-pill" }, Bo = {
  key: 0,
  class: "vb-field"
}, Vo = ["value"], qo = ["value"], Lo = {
  key: 0,
  class: "vb-intake-more"
}, Go = {
  key: 1,
  class: "vb-feature-error"
}, Jo = { class: "vb-portion-controls" }, Wo = ["max"], Ho = ["value"], Ko = { class: "vb-portion-macros" }, Yo = { key: 0 }, Xo = { key: 0 }, Qo = ["disabled"], Zo = { class: "vb-food-all-nutrients" }, ea = { class: "vb-nutrient-table" }, ta = { class: "vb-nutrient-table-head" }, na = { key: 0 }, sa = ["href"], oa = { key: 1 }, aa = { key: 2 }, la = ["href"], ia = ["href"], ra = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: a }) {
    const n = t, d = a, i = M(n.foodId), r = M(100), u = M(we()), m = M("unspecified"), c = M(null);
    de(() => n.foodId, (Q) => {
      i.value = Q;
    }), de(i, () => {
      c.value = null;
    });
    const v = W(() => oe[i.value]), h = M("");
    async function C() {
      const Q = i.value;
      h.value = "";
      try {
        await Le(Q);
      } catch (R) {
        i.value === Q && (h.value = R.message);
      }
    }
    de(i, C, { immediate: !0 });
    const g = W(() => bo(oe[n.foodId])), b = W(() => De.some((Q) => typeof v.value?.nutrients?.[Q.id] != "number")), S = W(() => v.value?.__summary ? null : _t(v.value, b.value ? c.value : null)), y = W(() => yt([{ foodId: v.value.key, grams: Number(r.value), nutritionSnapshot: S.value }]).totals), w = W(() => !v.value?.__summary && Number(r.value) >= 0.1 && Number(r.value) <= 5e3 && u.value && u.value <= we()), { photo: _, loading: z, failed: T } = Rn(() => v.value), D = W(() => v.value?.imageCredit || _.value?.imageCredit || _.value);
    function O() {
      w.value && d("add", { foodId: v.value.key, grams: Number(r.value), date: u.value, meal: m.value, nutritionSnapshot: S.value });
    }
    return (Q, R) => v.value ? (s(), me(ot, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: R[6] || (R[6] = (q) => Q.$emit("close"))
    }, {
      default: st(() => [
        e("div", Ro, [
          e("figure", null, [
            j(Qt, {
              food: v.value,
              photo: p(_),
              loading: p(z),
              failed: p(T),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", zo, l(v.value.categoryName), 1),
            e("h1", null, l(p(Tn)(v.value.key) || p(St)(v.value)), 1),
            e("p", Oo, l(p(Xt)(v.value)), 1),
            e("span", Fo, l(v.value.source ? "数据库" : c.value ? "AI估算" : "数据不完整"), 1),
            g.value.length ? (s(), o("label", Bo, [
              R[7] || (R[7] = N("选择营养样本", -1)),
              ee(e("select", {
                "onUpdate:modelValue": R[0] || (R[0] = (q) => i.value = q),
                "aria-label": "选择营养样本"
              }, [
                g.value.some((q) => q.id === n.foodId) ? I("", !0) : (s(), o("option", {
                  key: 0,
                  value: n.foodId
                }, "当前食物 · " + l(p(oe)[n.foodId]?.source ? "数据库" : "通用估算"), 9, Vo)),
                (s(!0), o(V, null, J(g.value, (q) => (s(), o("option", {
                  key: q.id,
                  value: q.id
                }, l(q.label), 9, qo))), 128))
              ], 512), [
                [Se, i.value]
              ]),
              R[8] || (R[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : I("", !0)
          ])
        ]),
        b.value && !v.value.__summary ? (s(), o("details", Lo, [
          R[9] || (R[9] = e("summary", null, "查看估算依据与调整", -1)),
          j(xo, {
            food: v.value,
            onResolved: R[1] || (R[1] = (q) => c.value = q)
          }, null, 8, ["food"])
        ])) : I("", !0),
        h.value ? (s(), o("p", Go, [
          N(l(h.value) + " ", 1),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: C
          }, "重试")
        ])) : I("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: Te(O, ["prevent"])
        }, [
          j(zn, {
            food: v.value,
            onChoose: R[2] || (R[2] = (q) => r.value = q)
          }, null, 8, ["food"]),
          e("div", Jo, [
            e("label", null, [
              R[10] || (R[10] = N("可食部重量", -1)),
              ee(e("input", {
                "onUpdate:modelValue": R[3] || (R[3] = (q) => r.value = q),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [re, r.value]
              ]),
              R[11] || (R[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              R[12] || (R[12] = N("记录日期", -1)),
              ee(e("input", {
                "onUpdate:modelValue": R[4] || (R[4] = (q) => u.value = q),
                type: "date",
                max: p(we)(),
                required: ""
              }, null, 8, Wo), [
                [re, u.value]
              ])
            ]),
            e("label", null, [
              R[13] || (R[13] = N("餐次", -1)),
              ee(e("select", {
                "onUpdate:modelValue": R[5] || (R[5] = (q) => m.value = q)
              }, [
                (s(!0), o(V, null, J(p(bt), ([q, X]) => (s(), o("option", {
                  key: q,
                  value: q
                }, l(X), 9, Ho))), 128))
              ], 512), [
                [Se, m.value]
              ])
            ])
          ]),
          e("div", Ko, [
            (s(!0), o(V, null, J(p(De), (q) => (s(), o("div", {
              key: q.id
            }, [
              e("span", null, l(q.id === "carbs" ? "碳水" : q.name), 1),
              e("strong", null, [
                N(l(p(on)(y.value[q.id])) + " ", 1),
                y.value[q.id].value != null || y.value[q.id].range ? (s(), o("small", Yo, l(q.unit), 1)) : I("", !0)
              ]),
              y.value[q.id].range ? (s(), o("small", Xo, "AI估算")) : I("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !w.value
          }, [
            j(F, {
              name: "plus",
              size: 16
            }),
            R[14] || (R[14] = N("添加记录", -1))
          ], 8, Qo),
          R[15] || (R[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", Zo, [
          R[20] || (R[20] = e("summary", null, "查看完整营养与依据", -1)),
          R[21] || (R[21] = e("p", null, "每100克可食部；未知值不按0计算。AI单值为参考估算，不是实测值；旧估算范围按上下限中点换算。", -1)),
          e("div", ea, [
            e("div", ta, [
              R[16] || (R[16] = e("span", null, "营养指标", -1)),
              R[17] || (R[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + l(r.value) + " 克", 1)
            ]),
            (s(!0), o(V, null, J(p(os), (q) => (s(), o("div", {
              key: q.id
            }, [
              e("span", null, l(q.name), 1),
              e("span", null, l(p(Me)(v.value.nutrients[q.id])) + " " + l(v.value.nutrients[q.id] != null ? q.unit : ""), 1),
              e("span", null, l(p(on)(y.value[q.id])) + " " + l(y.value[q.id].value != null || y.value[q.id].range ? q.unit : "") + l(y.value[q.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + l(v.value.name), 1),
          v.value.source ? (s(), o("p", na, [
            e("a", {
              href: v.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, l(v.value.source.name), 9, sa),
            N(" · " + l(v.value.source.id) + " · " + l(v.value.source.license), 1),
            R[18] || (R[18] = e("br", null, null, -1)),
            N(l(v.value.source.description), 1)
          ])) : (s(), o("p", oa, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          R[22] || (R[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          D.value ? (s(), o("p", aa, [
            R[19] || (R[19] = N("图片：", -1)),
            e("a", {
              href: D.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, l(D.value.title), 9, la),
            N(" / " + l(D.value.author) + " · ", 1),
            e("a", {
              href: D.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, l(D.value.license), 9, ia),
            N(" · " + l(D.value.modifications), 1)
          ])) : I("", !0)
        ])
      ]),
      _: 1
    })) : I("", !0);
  }
}, ua = { class: "vb-report-heading" }, da = { class: "vb-small-label" }, ca = { class: "vb-pill" }, va = { key: 0 }, ma = ["disabled"], ba = {
  key: 1,
  class: "vb-inline-warning"
}, pa = {
  key: 2,
  class: "vb-inline-warning"
}, fa = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, ga = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, ya = ["disabled"], ha = {
  key: 5,
  class: "vb-feature-error"
}, ka = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, wa = { class: "vb-report-estimation-heading" }, $a = { class: "vb-pill" }, _a = {
  key: 0,
  class: "vb-report-estimation-list"
}, Aa = { class: "vb-report-estimation-values" }, Ca = {
  key: 1,
  class: "vb-intake-more"
}, Sa = { class: "vb-report-comparison" }, Ia = { key: 0 }, xa = { key: 1 }, Ea = { key: 2 }, ja = { key: 3 }, Ua = { key: 4 }, Da = { key: 5 }, Pa = { key: 6 }, Na = { key: 7 }, Ma = {
  key: 7,
  class: "vb-report-content"
}, Ta = { class: "vb-report-summary" }, Ra = { class: "vb-inline-warning" }, za = {
  key: 8,
  class: "vb-intake-more"
}, Oa = { class: "vb-report-meta" }, Fa = { key: 0 }, Ba = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const a = t, n = W(() => a.report?.calculation?.targets || In(a.report?.snapshot?.profile)), d = W(() => {
      const g = a.report?.snapshot, b = a.report?.calculation?.estimation?.foods || [];
      if (!g || !b.length) return g?.intake;
      const S = _n(g.entries || [], b, { model: a.report?.model, generatedAt: a.report?.generatedAt });
      return yt(S);
    }), i = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], r = (g) => g ? new Date(g).toLocaleString("zh-CN", { hour12: !1 }) : "", u = W(() => (a.report?.snapshot?.entries || []).flatMap((g) => {
      const b = g.referenceConfirmed === !1 ? null : oe[g.foodId], S = De.filter((y) => {
        const w = Lt(g, b, y.id);
        return typeof w.value != "number" && !w.range;
      }).map((y) => y.id);
      return S.length ? [{ name: g.name, grams: g.grams, missing: S }] : [];
    })), m = W(() => a.report?.calculation?.estimation?.missingFoodCount ?? u.value.length), c = W(() => a.report?.calculation?.estimation?.foods || []), v = (g) => (g > 0 ? "+" : g < 0 ? "−" : "") + Me(Math.abs(g)), h = (g) => v(as(g)), C = (g) => `${Object.values(g?.values || {}).some((S) => S && typeof S.value != "number" && typeof S.low == "number" && typeof S.high == "number") ? "旧估算范围按上下限中点换为单值参考；" : ""}${g?.assumption || ""}`;
    return (g, b) => (s(), me(ot, {
      title: "AI 营养分析",
      wide: "",
      onClose: b[4] || (b[4] = (S) => g.$emit("close"))
    }, {
      default: st(() => [
        e("div", ua, [
          e("div", null, [
            e("span", da, l(t.report?.date || t.record?.date), 1),
            b[5] || (b[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", ca, l(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        b[18] || (b[18] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (s(), o("section", va, [
          b[6] || (b[6] = e("p", null, "分析时向维衡 AI发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: b[0] || (b[0] = (S) => g.$emit("retry"))
          }, "开始AI分析", 8, ma)
        ])) : I("", !0),
        t.stale ? (s(), o("p", ba, [
          b[7] || (b[7] = N("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (s(), o("button", {
            key: 0,
            class: "vb-text-button",
            onClick: b[1] || (b[1] = (S) => g.$emit("retry"))
          }, "重新分析")) : I("", !0)
        ])) : I("", !0),
        t.record ? I("", !0) : (s(), o("p", pa, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (s(), o("div", fa, [
          b[9] || (b[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            b[8] || (b[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, l(m.value ? "同时自动估算 " + m.value + " 项食物的缺失指标。" : "程序已计算营养汇总，维衡 AI 正在生成解释与建议。"), 1)
          ])
        ])) : I("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (s(), o("div", ga, [
          b[10] || (b[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, l(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: b[2] || (b[2] = (S) => g.$emit("retry"))
          }, "重新分析", 8, ya)
        ])) : I("", !0),
        t.report?.persistenceFailed ? (s(), o("p", ha, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : I("", !0),
        t.report?.snapshot ? (s(), o(V, { key: 6 }, [
          b[14] || (b[14] = e("h3", { class: "vb-report-section-title" }, "本次摄入汇总", -1)),
          j(Gt, {
            summary: d.value || t.report.snapshot.intake,
            targets: n.value,
            estimating: t.report.status === "pending",
            details: ""
          }, null, 8, ["summary", "targets", "estimating"]),
          m.value ? (s(), o("section", ka, [
            e("div", wa, [
              e("div", null, [
                e("h3", null, l(m.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${m.value} 项）`), 1),
                b[11] || (b[11] = e("p", null, "缺少数据库数据的食物会按识别名称和确认克数估算，并计入上方合计；维生素和矿物质仍以可靠数据为准。", -1))
              ]),
              e("span", $a, l(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            b[12] || (b[12] = e("p", { class: "vb-data-note" }, "缺失数据按常见品种与做法给出AI单值参考，不是数据库值或检测结果；旧估算范围按上下限中点换算。", -1)),
            c.value.length ? (s(), o("ul", _a, [
              (s(!0), o(V, null, J(c.value, (S) => (s(), o("li", {
                key: S.entryId
              }, [
                e("div", null, [
                  e("strong", null, l(S.name) + " · " + l(p(Me)(S.grams)) + " 克", 1),
                  e("small", null, l(C(S)), 1)
                ]),
                e("div", Aa, [
                  (s(!0), o(V, null, J(p(De).filter((y) => p(ht)(S.values[y.id], y.unit) !== null), (y) => (s(), o("span", {
                    key: y.id
                  }, l(y.id === "carbs" ? "碳水" : y.name) + " " + l(p(Me)(p(ht)(S.values[y.id], y.unit))) + " " + l(y.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : I("", !0)
          ])) : I("", !0),
          t.report.calculation?.comparison ? (s(), o("details", Ca, [
            b[13] || (b[13] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", Sa, [
              (s(!0), o(V, null, J(t.report.calculation.comparison, (S) => (s(), o("div", {
                key: S.id
              }, [
                e("span", null, l(S.id === "carbs" ? "碳水" : S.name), 1),
                S.estimatedRange?.delta ? (s(), o("strong", Ia, " AI 估算参考差值：" + l(h(S.estimatedRange.delta)) + " " + l(S.unit), 1)) : S.delta !== null ? (s(), o("strong", xa, l(S.delta > 0 ? "+" : "") + l(p(Me)(S.delta)) + " " + l(S.unit), 1)) : (s(), o("strong", Ea, l(S.estimatedRange || S.complete && S.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                S.estimatedRange?.delta ? (s(), o("small", ja, "按数据库已知值与 AI 单值估算计算；旧范围按中点换算。记录未必覆盖全天，不代表达标或不足。")) : S.estimatedRange && !S.estimatedRange.delta ? (s(), o("small", Ua, "含AI单值估算，暂无适用个人目标。")) : S.delta !== null ? (s(), o("small", Da, "记录合计减去全天目标，记录未必覆盖全天。")) : S.complete && S.target === null ? (s(), o("small", Pa, "请完善个人营养档案后再查看与目标的差值。")) : (s(), o("small", Na, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : I("", !0)
        ], 64)) : I("", !0),
        t.report?.result ? (s(), o("div", Ma, [
          b[15] || (b[15] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", Ta, l(t.report.result.summary), 1),
          (s(), o(V, null, J(i, ([S, y]) => e("section", { key: S }, [
            t.report.result[S]?.length ? (s(), o(V, { key: 0 }, [
              e("h3", null, l(y), 1),
              e("ul", null, [
                (s(!0), o(V, null, J(t.report.result[S], (w, _) => (s(), o("li", { key: _ }, l(w), 1))), 128))
              ])
            ], 64)) : I("", !0)
          ])), 64)),
          e("p", Ra, "分析范围：" + l(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : I("", !0),
        t.report ? (s(), o("details", za, [
          b[17] || (b[17] = e("summary", null, "查看分析信息", -1)),
          e("div", Oa, [
            e("span", null, "生成时间：" + l(r(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (s(), o("span", Fa, "由 " + l(p(Je)(t.report.model)) + " 生成", 1)) : I("", !0),
            e("span", null, "数据版本：" + l(t.report.dataVersion), 1),
            e("span", null, "食物库：" + l(t.report.snapshot?.intake?.dataVersion), 1),
            b[16] || (b[16] = e("small", null, "报告、照片保存在本机浏览器。清理站点数据后无法恢复。", -1))
          ])
        ])) : I("", !0),
        t.report?.status === "complete" && t.record ? (s(), o("button", {
          key: 9,
          type: "button",
          class: "vb-button vb-button-quiet",
          onClick: b[3] || (b[3] = (S) => g.$emit("retry"))
        }, l(t.stale ? "用最新记录重新分析" : "重新分析这一天"), 1)) : I("", !0)
      ]),
      _: 1
    }));
  }
};
function qt(t) {
  const a = String(t || "");
  return /^(?:好的[，,\s]*)?pdf(?:格式)?[。.!！]?$/i.test(a.trim()) ? "pdf" : /^(?:好的[，,\s]*)?(?:word|docx)(?:格式)?[。.!！]?$/i.test(a.trim()) ? "docx" : !/(生成|导出|下载|保存|制作|整理|做成|转换|转成|给我|发我|用|格式|create|generate|export|download|save|make|convert)/i.test(a) || /^(什么是|如何|怎么|为什么|what\b|how\b|why\b)/i.test(a.trim()) ? null : [["pdf", /pdf/i], ["docx", /word|docx|\.doc\b/i], ["png", /png|长图|图片文档|图片格式|(?:导出|保存).{0,8}图片/i]].map(([d, i]) => ({ format: d, index: a.search(i) })).filter((d) => d.index >= 0).sort((d, i) => d.index - i.index)[0]?.format || null;
}
function Va(t) {
  const a = String(t || "").trim(), n = /^\s*#{1,6}\s+\S/m.exec(a);
  if (!n || !n.index) return a;
  const d = a.slice(0, n.index), i = d.split(`
`).map((m) => m.trim()).filter((m) => m && !/^[-*_]{3,}$/.test(m)), r = /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i, u = /(身高|体重|年龄|孕期|哺乳|过敏|疾病|营养|能量|热量|kcal|蛋白|用药)/i;
  return r.test(d) && i.every((m) => /(PDF|Word|文件|附件|导出|下载|复制|格式)/i.test(m) && !u.test(m)) ? a.slice(n.index).trim() : a;
}
function Tt(t) {
  const a = String(t || "").trim();
  return a.length < 400 && !/^\s*(?:#{1,6}\s|\|)/m.test(a) && /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i.test(a);
}
const On = (t, a) => {
  const n = t.__vccOpts || t;
  for (const [d, i] of a)
    n[d] = i;
  return n;
}, qa = ["aria-busy"], La = { class: "vb-chat-document-body" }, Ga = {
  class: "vb-chat-export-options",
  "aria-label": "下载计划"
}, Ja = ["href", "download", "title"], Wa = ["disabled", "onClick"], Ha = {
  key: 0,
  role: "status"
}, Ka = {
  key: 1,
  role: "alert"
}, Ya = { key: 2 }, Xa = {
  __name: "ChatMessageExport",
  props: { content: { type: String, required: !0 }, question: { type: String, default: "" }, auto: Boolean },
  emits: ["retry"],
  setup(t, { emit: a }) {
    const n = t, d = a, i = M({}), r = M(""), u = M(""), m = M("");
    let c = 0, v = !1, h = !1;
    const C = W(() => qt(n.question)), g = W(() => r.value || C.value || "pdf"), b = W(() => ({ pdf: "PDF", docx: "Word", png: "图片" })[g.value]), S = W(() => i.value[g.value]), y = W(() => Va(n.content));
    function w() {
      for (const T of Object.values(i.value)) setTimeout(() => URL.revokeObjectURL(T.url), 3e4);
      i.value = {};
    }
    async function _(T = g.value) {
      if (u.value || i.value[T]) {
        i.value[T] && (r.value = T);
        return;
      }
      const D = c, O = y.value, Q = n.question;
      r.value = T, u.value = T, m.value = "";
      try {
        if (C.value && Tt(O)) throw new Error("尚未生成文档正文，请重新生成。");
        const { createChatExport: R, preparedChatDownload: q } = await import("./chatExport-BCM5BWUu.js");
        if (D !== c) return;
        const X = await R(T, O, { question: Q });
        if (D !== c) return;
        i.value = { ...i.value, [T]: q(X) };
      } catch (R) {
        D === c && (m.value = R instanceof Error ? R.message : "文件生成失败，请重试。");
      } finally {
        D === c && (u.value = "");
      }
    }
    function z() {
      !v || !n.auto || !C.value || h || u.value || i.value[C.value] || m.value || (h = !0, requestAnimationFrame(() => setTimeout(() => {
        h = !1, v && n.auto && C.value && _(C.value);
      }, 0)));
    }
    return de(() => [n.content, n.question], () => {
      c++, w(), r.value = "", u.value = "", m.value = "", z();
    }), de(() => n.auto, z), $t(() => {
      v = !0, z();
    }), qe(() => {
      v = !1, c++, w();
    }), (T, D) => C.value ? (s(), o("div", {
      key: 0,
      class: "vb-chat-document",
      "aria-label": "计划正文与下载",
      "aria-busy": !!u.value
    }, [
      e("p", La, l(y.value), 1),
      e("div", Ga, [
        (s(), o(V, null, J([["pdf", "PDF"], ["docx", "Word"], ["png", "长图"]], ([O, Q]) => (s(), o(V, { key: O }, [
          i.value[O] ? (s(), o("a", {
            key: 0,
            href: i.value[O].url,
            download: i.value[O].filename,
            title: i.value[O].filename
          }, l(O === "png" ? "保存长图" : "下载 " + Q), 9, Ja)) : (s(), o("button", {
            key: 1,
            type: "button",
            disabled: !!u.value,
            onClick: (R) => _(O)
          }, l(u.value === O ? "正在生成…" : "生成 " + Q), 9, Wa))
        ], 64))), 64))
      ]),
      S.value ? (s(), o("small", Ha, l(b.value) + " 文件已生成", 1)) : I("", !0),
      m.value ? (s(), o("div", Ka, [
        e("p", null, l(m.value), 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: D[0] || (D[0] = (O) => p(Tt)(y.value) ? d("retry") : _())
        }, l(p(Tt)(y.value) ? "重新生成正文" : "重试生成文件"), 1)
      ])) : I("", !0),
      S.value?.pageCount ? (s(), o("small", Ya, "内容较长，" + l(S.value.pageCount) + " 张图片已打包为 ZIP。", 1)) : I("", !0)
    ], 8, qa)) : I("", !0);
  }
}, Qa = /* @__PURE__ */ On(Xa, [["__scopeId", "data-v-447caabb"]]);
function Za({ viewport: t, isActive: a = () => !0, onChange: n = () => {
}, threshold: d = 64 }) {
  let i = !0;
  const r = () => a() && t() && t().clientHeight > 0, u = (h) => Math.max(0, h.scrollHeight - h.clientHeight - h.scrollTop);
  function m() {
    const h = t();
    n(!!(r() && u(h) > d));
  }
  function c(h = !1) {
    if (h && (i = !0), !r()) {
      n(!1);
      return;
    }
    const C = t();
    i && (C.scrollTop = Math.max(0, C.scrollHeight - C.clientHeight)), m();
  }
  function v() {
    r() && (i = u(t()) <= d, m());
  }
  return { layout: c, onScroll: v, jump: () => c(!0) };
}
function el({ viewport: t, content: a, active: n, thread: d, messages: i }) {
  const r = M(!1), u = Za({ viewport: () => t.value, isActive: () => n.value, onChange: (y) => r.value = y });
  let m = !1, c = !1, v = !1, h, C;
  function g(y = !1) {
    v = v || y, !(!m || c) && (c = !0, Ue(() => {
      if (!m) {
        c = !1;
        return;
      }
      h = requestAnimationFrame(() => {
        if (h = void 0, c = !1, !m) return;
        const w = v;
        v = !1, u.layout(w);
      });
    }));
  }
  function b() {
    C?.disconnect(), t.value && C?.observe(t.value), a.value && C?.observe(a.value), g();
  }
  const S = () => g();
  return de(i, () => g(), { deep: !0, flush: "post" }), de([d, n], () => g(!0), { flush: "post" }), de([t, a], b, { flush: "post" }), $t(() => {
    m = !0, typeof ResizeObserver < "u" && (C = new ResizeObserver(S)), b(), window.addEventListener("resize", S), g(!0);
  }), qe(() => {
    m = !1, C?.disconnect(), h !== void 0 && cancelAnimationFrame(h), window.removeEventListener("resize", S);
  }), { showJump: r, onScroll: u.onScroll, onContentLoad: S, jumpToLatest: () => g(!0) };
}
function tl(t, a, n) {
  return t.push({ id: a, role: "assistant", content: "", status: "sending", createdAt: n }), t[t.length - 1];
}
function mn(t, a = {}, n = []) {
  const d = new Set(n), i = {};
  for (const r of new Set((t.threads || []).map((u) => u.date))) {
    const u = (t.threads || []).filter((h) => h.date === r).sort((h, C) => String(C.createdAt || "").localeCompare(String(h.createdAt || ""))), m = u.find((h) => h.id === a[r]), c = u.find((h) => h.id === t.activeByDate?.[r]), v = m && (m.messages?.length || d.has(m.id)) ? m : c?.messages?.length ? c : u.find((h) => h.messages?.length) || m || c || u[0];
    v && (i[r] = v.id);
  }
  return i;
}
const nl = 24e3, bn = 220;
function sl(t, a) {
  const n = Date.parse(t || a || "");
  return Number.isFinite(n) ? n : 0;
}
function pn(t) {
  const a = String(t || "").trim();
  return a.length > bn ? `${a.slice(0, bn)}…` : a;
}
function ol(t, a, n = !0) {
  if (!n || !Array.isArray(t)) return "";
  const d = [];
  for (const u of t) {
    if (!u || u.id === a || !Array.isArray(u.messages)) continue;
    const m = u.messages;
    for (let c = 0; c < m.length - 1; c++) {
      const v = m[c], h = m[c + 1];
      if (v?.role !== "user" || h?.role !== "assistant" || v.status !== "complete" || h.status !== "complete" || v.attachments?.length || h.attachments?.length) continue;
      const C = pn(v.content), g = pn(h.content);
      !C || !g || (d.push({
        date: typeof u.date == "string" ? u.date : "",
        time: sl(v.createdAt, u.createdAt),
        user: C,
        assistant: g
      }), c++);
    }
  }
  const i = d.sort((u, m) => u.time - m.time).slice(-50);
  let r = i.map((u) => `${u.date ? `日期 ${u.date}：` : ""}用户：${u.user}
助手：${u.assistant}`).join(`

`);
  for (; r.length > nl && i.length; )
    i.shift(), r = i.map((u) => `${u.date ? `日期 ${u.date}：` : ""}用户：${u.user}
助手：${u.assistant}`).join(`

`);
  return r;
}
function al(t) {
  if (!t || typeof t != "object" || Array.isArray(t) || nt(t)) return null;
  const a = (r) => r == null || r === "" ? void 0 : Number(r), n = a(t.age), d = a(t.height), i = a(t.weight);
  return {
    sex: t.sex || "",
    ...n !== void 0 ? { age: n } : {},
    ...d !== void 0 ? { height: d } : {},
    ...i !== void 0 ? { weight: i } : {},
    activity: t.activity,
    ...a(t.ageMonths) !== void 0 ? { ageMonths: a(t.ageMonths) } : {},
    ...t.physiologicalStage ? { physiologicalStage: t.physiologicalStage } : {}
  };
}
const ll = 3, il = 24e3, fn = 6e4, rl = 8e5, ul = 6, dl = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function Fn(t) {
  const a = String(t.name || "").split(".").pop().toLowerCase(), n = ["jpg", "jpeg", "png", "webp"].includes(a) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(a) ? "document" : null;
  if (!n) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (n === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(n === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return n;
}
function cl(t) {
  const a = String(t).replace(/\u0000/g, "").trim();
  if (!a) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (a.length > il) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return a;
}
let Ye;
function vl() {
  return Ye || (Ye = new Promise((t, a) => {
    if (!globalThis.indexedDB) {
      a(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const n = indexedDB.open(tt("weiheng.chat-attachments.v1"), 1);
    n.onupgradeneeded = () => n.result.createObjectStore("attachments", { keyPath: "id" }), n.onsuccess = () => {
      const d = n.result;
      d.onversionchange = () => {
        d.close(), Ye = void 0;
      }, t(d);
    }, n.onerror = n.onblocked = () => a(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw Ye = void 0, t;
  })), Ye;
}
async function Zt(t, a) {
  const n = await vl();
  if (t === "readwrite" && Ge()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((d, i) => {
    const r = n.transaction("attachments", t), u = a(r.objectStore("attachments"));
    r.oncomplete = () => d(u.result), r.onerror = r.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const ml = (t) => Zt("readwrite", (a) => a.put(t)), Rt = (t) => Zt("readonly", (a) => a.get(t)), mt = (t) => Zt("readwrite", (a) => a.delete(t));
function bl(t) {
  return new Promise((a, n) => {
    const d = new FileReader();
    d.onload = () => a(String(d.result)), d.onerror = () => n(new Error("照片读取失败，请重新选择。")), d.readAsDataURL(t);
  });
}
async function pl(t) {
  const a = await createImageBitmap(t).catch(() => {
    throw new Error("照片无法读取，请换用 JPG、PNG 或 WebP。");
  });
  try {
    if (a.width * a.height > 4e7) throw new Error("照片分辨率过大，请缩小后上传。");
    const n = document.createElement("canvas"), d = Math.min(1, 1600 / Math.max(a.width, a.height));
    n.width = Math.max(1, Math.round(a.width * d)), n.height = Math.max(1, Math.round(a.height * d));
    const i = n.getContext("2d");
    if (!i) throw new Error("浏览器暂不支持照片处理。");
    i.fillStyle = "#fff", i.fillRect(0, 0, n.width, n.height), i.drawImage(a, 0, 0, n.width, n.height);
    for (const r of [0.85, 0.68, 0.5]) {
      const u = await new Promise((c, v) => n.toBlob((h) => h ? c(h) : v(new Error("照片压缩失败。")), "image/jpeg", r)), m = await bl(u);
      if (m.length <= rl) return m;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    a.close();
  }
}
async function fl(t) {
  const a = await import("./pdf-jk_a9_-5.js");
  a.GlobalWorkerOptions.workerSrc = "/content-dist/pdf.worker.min.js";
  const n = a.getDocument({
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
    for (let r = 1; r <= d.numPages; r++) {
      const u = await d.getPage(r), m = await u.getTextContent();
      if (i.push(m.items.map((c) => "str" in c ? c.str + (c.hasEOL ? `
` : " ") : "").join("")), i.join(`
`).length > 24e3) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
      u.cleanup();
    }
    return i.join(`

`);
  } catch (d) {
    throw d instanceof Error && d.name === "PasswordException" ? new Error("PDF 已加密，请解锁后再上传。") : d;
  } finally {
    await n.destroy();
  }
}
async function gl(t) {
  const { unzipSync: a, strFromU8: n } = await import("./browser-CJhYS1h6.js"), d = a(new Uint8Array(await t.arrayBuffer()), {
    filter: (r) => r.name === "word/document.xml" && r.originalSize <= 4 * 1024 * 1024
  });
  if (!d["word/document.xml"]) throw new Error("Word 文件无效或内容过大，请另存为 DOCX 或 TXT 后重试。");
  const i = new DOMParser().parseFromString(n(d["word/document.xml"]), "application/xml");
  if (i.querySelector("parsererror")) throw new Error("Word 文件内容无法读取。");
  return Array.from(i.getElementsByTagNameNS("*", "p")).map((r) => Array.from(r.getElementsByTagNameNS("*", "*")).map((u) => u.localName === "t" ? u.textContent || "" : u.localName === "tab" ? "	" : u.localName === "br" ? `
` : "").join("")).join(`
`);
}
async function yl(t, a) {
  const n = Fn(t), d = { id: a, kind: n, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (n === "image") return { ...d, mimeType: "image/jpeg", dataUrl: await pl(t) };
  const i = t.name.split(".").pop()?.toLowerCase();
  let r;
  try {
    if (i === "pdf") r = await fl(t);
    else if (i === "docx") r = await gl(t);
    else {
      const u = new Uint8Array(await t.arrayBuffer());
      r = new TextDecoder().decode(u), r.includes("�") && (r = new TextDecoder("gb18030").decode(u));
    }
  } catch (u) {
    throw new Error(u instanceof Error && /[\u4e00-\u9fff]/.test(u.message) ? u.message : "文件无法读取，请确认文件完整，或另存为 TXT 后重试。");
  }
  return { ...d, text: cl(r) };
}
const hl = {
  class: "vb-chat-page vb-simple-chat",
  "aria-label": "维衡AI助手对话"
}, kl = { class: "vb-simple-header" }, wl = { class: "vb-simple-actions" }, $l = { class: "vb-simple-date" }, _l = ["max", "disabled"], Al = { class: "vb-simple-options" }, Cl = { "aria-label": "对话选项" }, Sl = { class: "vb-simple-options-panel" }, Il = {
  key: 0,
  class: "vb-simple-history"
}, xl = ["value", "disabled"], El = ["value"], jl = ["value"], Ul = { class: "vb-memory-toggle" }, Dl = ["disabled"], Pl = { class: "vb-simple-starters" }, Nl = ["onClick"], Ml = { class: "vb-simple-context" }, Tl = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, Rl = { class: "vb-simple-message-body" }, zl = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, Ol = ["aria-label", "onClick"], Fl = ["src", "alt"], Bl = {
  key: 1,
  class: "vb-simple-loading"
}, Vl = {
  key: 2,
  class: "vb-simple-text"
}, ql = {
  key: 0,
  class: "vb-simple-text"
}, Ll = {
  class: "vb-simple-error",
  role: "alert"
}, Gl = ["onClick"], Jl = {
  key: 4,
  class: "vb-simple-text"
}, Wl = {
  key: 6,
  class: "vb-chat-search-status",
  role: "status"
}, Hl = {
  key: 7,
  class: "vb-chat-search-warning"
}, Kl = {
  key: 8,
  class: "vb-chat-sources"
}, Yl = ["href"], Xl = { key: 0 }, Ql = {
  key: 9,
  class: "vb-simple-message-meta"
}, Zl = { class: "vb-simple-composer" }, ei = { class: "vb-simple-composer-inner" }, ti = {
  key: 0,
  class: "vb-simple-tools"
}, ni = { class: "vb-simple-quick" }, si = { class: "vb-simple-quick-panel" }, oi = ["onClick"], ai = {
  key: 0,
  class: "vb-simple-status",
  role: "status"
}, li = ["accept"], ii = {
  key: 0,
  class: "vb-chat-draft-attachments",
  "aria-label": "待发送附件"
}, ri = ["disabled", "aria-label", "onClick"], ui = ["src", "alt"], di = {
  key: 0,
  role: "status"
}, ci = {
  key: 1,
  role: "alert"
}, vi = { key: 2 }, mi = ["aria-label", "onClick"], bi = { class: "vb-simple-editor-bottom" }, pi = { class: "vb-chat-input-tools" }, fi = {
  class: "vb-chat-search-toggle",
  title: "开启后会用本条问题文字搜索网页；不会把档案、饮食记录或附件发送给搜索接口。"
}, gi = ["disabled"], yi = {
  key: 1,
  class: "vb-simple-notice",
  role: "alert"
}, hi = ["role"], ki = { class: "vb-simple-footnote" }, wi = { class: "vb-simple-privacy" }, $i = ["src", "alt"], _i = {
  key: 1,
  class: "vb-chat-text-preview"
}, Ai = { class: "vb-data-note" }, gn = "weiheng.ai-diet-chat.v1", Ci = /* @__PURE__ */ He({
  __name: "AiDietAssistantPage",
  props: {
    active: { type: Boolean, default: !0 },
    records: { default: () => [] },
    targets: { default: null },
    profile: { default: null }
  },
  setup(t) {
    const a = t, n = [
      "分析今天已记录的营养摄入，并说明数据完整性。",
      "查看已记录食物的维生素和矿物质摄入情况，缺失数据请说明。",
      "解释我的营养参考值及其适用范围。",
      "根据饮食记录安排下一餐，先询问必要的就餐条件。"
    ];
    function d() {
      return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    function i(E) {
      return Array.isArray(E) ? E.flatMap((A) => {
        if (!A || typeof A != "object") return [];
        const k = A;
        try {
          const H = new URL(String(k.url || ""));
          return ["https:", "http:"].includes(H.protocol) ? [{
            title: typeof k.title == "string" ? k.title.slice(0, 180) : "网页来源",
            url: H.href,
            siteName: typeof k.siteName == "string" ? k.siteName.slice(0, 100) : void 0,
            date: typeof k.date == "string" ? k.date.slice(0, 40) : void 0
          }] : [];
        } catch {
          return [];
        }
      }).slice(0, 5) : [];
    }
    function r() {
      try {
        const E = JSON.parse($e.getItem(gn) || "null");
        if (!E || typeof E != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0, webSearchEnabled: !0 };
        const A = E, k = Array.isArray(A.threads) ? A.threads.flatMap((te) => {
          if (!te || typeof te != "object") return [];
          const Y = te;
          return typeof Y.id != "string" || !Be(Y.date) || !Array.isArray(Y.messages) ? [] : [{
            id: Y.id,
            date: Y.date,
            createdAt: typeof Y.createdAt == "string" ? Y.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: Y.messages.filter((ae) => !!(ae && typeof ae == "object" && ["user", "assistant"].includes(ae.role) && typeof ae.content == "string")).map((ae) => ({
              ...ae,
              status: ae.status === "sending" ? "failed" : ae.status,
              error: ae.status === "sending" ? "页面刷新时请求中断。点击重试可继续这条问题。" : ae.error,
              webSearch: typeof ae.webSearch == "boolean" ? ae.webSearch : void 0,
              webSearchStatus: typeof ae.webSearchStatus == "string" ? ae.webSearchStatus.slice(0, 80) : void 0,
              webSearchWarning: typeof ae.webSearchWarning == "string" ? ae.webSearchWarning.slice(0, 160) : void 0,
              webSources: i(ae.webSources)
            }))
          }];
        }) : [], H = A.activeByDate && typeof A.activeByDate == "object" ? Object.fromEntries(Object.entries(A.activeByDate).filter(([te, Y]) => Be(te) && typeof Y == "string")) : {};
        return { threads: k.slice(-60), activeByDate: H, memoryEnabled: A.memoryEnabled !== !1, webSearchEnabled: A.webSearchEnabled !== !1 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0, webSearchEnabled: !0 };
      }
    }
    const u = r(), m = M(u.threads), c = M(mn(u, u.activeByDate)), v = /* @__PURE__ */ new Set(), h = M(u.memoryEnabled), C = M(u.webSearchEnabled), g = M(we()), b = M(""), S = M(null), y = M([]), w = M({}), _ = M(null), z = W(() => y.value.some((E) => E.status === "ready"));
    let T = 0;
    const D = M(""), O = M(""), Q = M(null), R = M(null), q = W(() => m.value.some((E) => E.messages.some((A) => A.status === "sending"))), X = W(() => a.records.find((E) => E.date === g.value)), pe = W(() => X.value?.entries || []), ue = W(() => ({
      energy: typeof a.targets?.tdee == "number" ? a.targets.tdee : null,
      protein: a.targets?.macros?.find((E) => E.id === "protein")?.grams ?? null,
      carbs: a.targets?.macros?.find((E) => E.id === "carbs")?.grams ?? null,
      fat: a.targets?.macros?.find((E) => E.id === "fat")?.grams ?? null
    })), ge = W(() => m.value.find((E) => E.id === c.value[g.value])), le = W(() => ge.value?.messages || []), { showJump: he, onScroll: K, onContentLoad: B, jumpToLatest: P } = el({ viewport: Q, content: R, active: W(() => a.active), thread: W(() => ge.value?.id), messages: le }), L = W(() => m.value.filter((E) => E.messages.length).sort((E, A) => A.createdAt.localeCompare(E.createdAt)));
    function x(E) {
      const A = E.target.value, k = m.value.find((H) => H.id === A);
      k && (g.value = k.date, c.value[k.date] = k.id);
    }
    function f(E) {
      const A = le.value, k = A.findIndex((H) => H.id === E);
      return A.slice(0, k).reverse().find((H) => H.role === "user")?.content || "";
    }
    function $(E) {
      const { id: A, kind: k, name: H, size: te, mimeType: Y } = E;
      return { id: A, kind: k, name: H, size: te, mimeType: Y };
    }
    function U(E) {
      return E >= 1024 * 1024 ? `${(E / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(E / 1024))} KB`;
    }
    async function se(E) {
      const A = T;
      O.value = "";
      for (const k of E) {
        if (A !== T) break;
        if (y.value.length >= ll) {
          O.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let H;
        try {
          H = Fn(k);
        } catch (Y) {
          O.value = Y instanceof Error ? Y.message : "这个文件暂不支持。";
          continue;
        }
        const te = d();
        y.value.push({ id: te, kind: H, name: k.name.slice(0, 180), size: k.size, mimeType: k.type, status: "reading" });
        try {
          const Y = await yl(k, te);
          if (!y.value.some((ye) => ye.id === te)) continue;
          if (y.value.reduce((ye, ke) => ye + (ke.value?.text?.length || 0), Y.text?.length || 0) > fn) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await ml(Y);
          const ve = y.value.find((ye) => ye.id === te);
          if (!ve) {
            await mt(te);
            continue;
          }
          w.value[te] = Y, ve.value = Y, ve.status = "ready";
        } catch (Y) {
          const ae = y.value.find((ve) => ve.id === te);
          ae && (ae.status = "failed", ae.error = Y instanceof Error ? Y.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function ie(E) {
      const A = E.target, k = Array.from(A.files || []);
      A.value = "", se(k);
    }
    function It(E) {
      const A = Array.from(E.clipboardData?.files || []).filter((k) => k.type.startsWith("image/"));
      A.length && (E.preventDefault(), se(A));
    }
    function xt(E) {
      E.dataTransfer?.types.includes("Files") && E.preventDefault();
    }
    function at(E) {
      const A = Array.from(E.dataTransfer?.files || []);
      A.length && (E.preventDefault(), se(A));
    }
    function lt(E) {
      y.value = y.value.filter((A) => A.id !== E), delete w.value[E], mt(E).catch(() => {
        O.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function it() {
      const E = y.value.flatMap((k) => k.status === "ready" && k.value ? [k.value] : []), A = new Set(E.map((k) => k.id));
      return y.value = y.value.filter((k) => !A.has(k.id)), E;
    }
    async function Ke(E) {
      try {
        const A = w.value[E.id] || await Rt(E.id);
        if (!A) throw new Error("附件已不在本地存储中，请重新添加。");
        _.value = A;
      } catch (A) {
        O.value = A instanceof Error ? A.message : "无法预览附件。";
      }
    }
    de(() => le.value.flatMap((E) => E.attachments || []).map((E) => E.id).join(","), async () => {
      for (const E of le.value.flatMap((A) => A.attachments || []))
        if (!w.value[E.id])
          try {
            const A = await Rt(E.id);
            A && (w.value[E.id] = A);
          } catch {
          }
    }, { immediate: !0 });
    function rt(E) {
      const A = { id: d(), date: E, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (m.value.push(A), m.value.length > 60) {
        const k = m.value.splice(0, m.value.length - 60);
        ut(k.flatMap((H) => H.messages));
      }
      return c.value[E] = A.id, A;
    }
    function ut(E) {
      for (const A of E.flatMap((k) => k.attachments || []))
        delete w.value[A.id], mt(A.id).catch(() => {
          D.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function ze(E) {
      const A = c.value[E];
      if (A && m.value.some((H) => H.id === A)) return;
      const k = m.value.filter((H) => H.date === E).sort((H, te) => te.createdAt.localeCompare(H.createdAt))[0];
      k ? c.value[E] = k.id : rt(E);
    }
    ze(g.value), de(g, (E) => {
      if (!Be(E) || E > we()) {
        g.value = we();
        return;
      }
      ze(E), O.value = "";
    });
    let Z = !1, G = !1;
    function ne() {
      if (q.value) {
        G = !0;
        return;
      }
      G = !1, Z = !0;
      const E = r();
      m.value = E.threads, c.value = mn(E, c.value, [...v]), h.value = E.memoryEnabled, C.value = E.webSearchEnabled, ze(g.value), Ue(() => {
        Z = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", ne), qe(() => window.removeEventListener("weiheng-chat-synced", ne));
    let fe;
    function Ie() {
      if (fe && clearTimeout(fe), fe = void 0, !Ge())
        try {
          $e.setItem(gn, JSON.stringify({ threads: m.value, activeByDate: c.value, memoryEnabled: h.value, webSearchEnabled: C.value })), D.value = "";
        } catch {
          D.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function Vn() {
      Z || (fe && clearTimeout(fe), fe = setTimeout(Ie, 160));
    }
    de([m, c, h, C], Vn, { deep: !0 });
    function dt() {
      Ie();
    }
    typeof window < "u" && (window.addEventListener("pagehide", dt), window.addEventListener("weiheng-chat-flush", dt)), qe(() => {
      Ie(), typeof window < "u" && (window.removeEventListener("pagehide", dt), window.removeEventListener("weiheng-chat-flush", dt));
    });
    let xe;
    function qn() {
      const E = xe;
      E && (xe = void 0, E.controller.abort(), E.assistantMessage.status === "sending" && (E.assistantMessage.status = "failed", E.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), Ie());
    }
    function Ln(E) {
      const A = new Date(E);
      return Number.isNaN(A.getTime()) ? "新对话" : A.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function Gn(E) {
      const A = new Date(E);
      return Number.isNaN(A.getTime()) ? "" : A.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function Jn() {
      return pe.value.map((E) => ({
        foodId: E.foodId,
        name: E.name,
        grams: E.grams,
        meal: E.meal,
        referenceConfirmed: E.referenceConfirmed
      }));
    }
    async function Wn(E, A) {
      const k = E.slice(0, A).filter((ve) => ve.status === "complete"), H = [];
      for (const { role: ve, content: ye, attachments: ke } of k) {
        const Ee = { role: ve, content: ye.slice(0, 1200), attachments: ke };
        ve === "user" ? H.at(-1)?.role === "user" ? H[H.length - 1] = Ee : H.push(Ee) : H.at(-1)?.role === "user" && H.push(Ee);
      }
      for (; H[0]?.role !== "user"; ) H.shift();
      const te = H.slice(-11);
      for (; te.reduce((ve, ye) => ve + ye.content.length, 0) > 9e3; ) te.splice(0, 2);
      let Y = 0, ae = 0;
      for (let ve = te.length - 1; ve >= 0; ve--) {
        const ye = te[ve], ke = [];
        let Ee = !1;
        for (const ct of ye.attachments || []) {
          const Pe = w.value[ct.id] || await Rt(ct.id);
          if (!Pe) {
            if (ve === te.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Ee = !0;
            continue;
          }
          if (Y + (Pe.text?.length || 0) > fn || Pe.kind === "image" && ae >= ul) {
            Ee = !0;
            continue;
          }
          Y += Pe.text?.length || 0, Pe.kind === "image" && ae++, ke.push(Pe);
        }
        ye.attachments = ke.length ? ke : void 0, Ee && (ye.content = ye.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return te;
    }
    async function en(E, A, k = []) {
      const H = E.trim() || (k.length ? "请帮我分析这些附件。" : "");
      if (!H || H.length > 1200) return !1;
      qn(), ze(g.value);
      const te = ge.value;
      if (!te) return !1;
      let Y, ae, ve = C.value;
      if (A) {
        ae = te.messages.findIndex((je) => je.id === A && je.role === "assistant");
        const Ne = te.messages[ae - 1];
        if (ae < 1 || Ne?.role !== "user")
          return O.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        ve = Ne.webSearch !== !1, Y = te.messages[ae], Y.status = "sending", Y.error = void 0, Y.content = "", Y.webSearchWarning = void 0, Y.webSources = void 0, Y.webSearchStatus = ve ? "正在联网搜索…" : "正在回复…";
      } else
        te.messages.push({ id: d(), role: "user", content: H, attachments: k.length ? k.map($) : void 0, webSearch: ve, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), Y = tl(te.messages, d(), (/* @__PURE__ */ new Date()).toISOString()), Y.webSearchStatus = ve ? "正在联网搜索…" : "正在回复…", te.messages.length > 120 && ut(te.messages.splice(0, te.messages.length - 120)), ae = te.messages.length - 1;
      P(), Ie(), O.value = "";
      const ye = new AbortController(), ke = { controller: ye, assistantMessage: Y };
      xe = ke;
      const Ee = g.value, ct = Jn(), Pe = ue.value, Xn = al(a.profile), Qn = ol(m.value, te.id, h.value);
      try {
        const Ne = await Wn(te.messages, ae);
        if (xe !== ke) return !1;
        if (Ne.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const je = await Pn("chat", {
          date: Ee,
          messages: Ne,
          entries: ct,
          targets: Pe,
          profile: Xn,
          memory: Qn,
          webSearch: ve
        }, (_e) => {
          xe === ke && (_e.type === "status" ? Y.webSearchStatus = _e.message : _e.type === "delta" ? Y.content += _e.text : _e.type === "done" && (typeof _e.content == "string" && (Y.content = _e.content), Y.model = _e.model, Y.context = _e.contextSummary, Y.createdAt = _e.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Y.webSources = i(_e.webSources), Y.webSearchWarning = _e.webSearchWarning, Y.webSearchStatus = ""));
        }, ye.signal);
        if (xe !== ke) return !1;
        if (!Y.content.trim() || typeof je.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return Y.model = je.model, Y.context = je.contextSummary, Y.createdAt = je.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Y.webSources = i(je.webSources), Y.webSearchWarning = je.webSearchWarning, Y.webSearchStatus = "", Y.status = "complete", Ie(), ms(), !0;
      } catch (Ne) {
        return xe !== ke || (Y.status = "failed", Y.error = Ne instanceof Error ? Ne.message : "AI 暂时无法回复，请重试。", Y.webSearchStatus = "", Ie()), !1;
      } finally {
        xe === ke && (xe = void 0), G && !q.value && ne();
      }
    }
    function tn() {
      const E = b.value.trim();
      if (!E && !z.value || E.length > 1200) return;
      const A = it();
      b.value = "", en(E, void 0, A);
    }
    function nn(E) {
      b.value = E, Ue(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function Hn(E) {
      E.key === "Enter" && !E.shiftKey && !E.isComposing && (E.preventDefault(), tn());
    }
    function sn(E) {
      const A = le.value.findIndex((H) => H.id === E), k = le.value[A - 1];
      A > 0 && k?.role === "user" && en(k.content, E);
    }
    function Kn() {
      T++, v.add(rt(g.value).id);
      for (const E of y.value) lt(E.id);
      O.value = "";
    }
    function Yn() {
      if (!window.confirm("清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。")) return;
      const E = m.value.flatMap((A) => A.messages.flatMap((k) => k.attachments || []));
      for (const A of E)
        delete w.value[A.id], mt(A.id).catch(() => {
          D.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      vs(), m.value = [], c.value = {}, D.value = "", ze(g.value), O.value = "当前空间的聊天记录已清除。";
    }
    return (E, A) => (s(), o("section", hl, [
      e("header", kl, [
        A[16] || (A[16] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡AI助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", wl, [
          e("label", $l, [
            j(F, {
              name: "calendar",
              size: 16
            }),
            A[10] || (A[10] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            ee(e("input", {
              "onUpdate:modelValue": A[0] || (A[0] = (k) => g.value = k),
              type: "date",
              max: p(we)(),
              disabled: q.value,
              "aria-label": "选择饮食日期"
            }, null, 8, _l), [
              [re, g.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: Kn
          }, [
            j(F, {
              name: "plus",
              size: 16
            }),
            A[11] || (A[11] = N("新对话", -1))
          ]),
          e("details", Al, [
            e("summary", Cl, [
              A[12] || (A[12] = N("更多", -1)),
              j(F, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", Sl, [
              L.value.length ? (s(), o("label", Il, [
                A[13] || (A[13] = N(" 历史对话 ", -1)),
                e("select", {
                  value: ge.value?.id,
                  disabled: q.value,
                  "aria-label": "切换历史对话",
                  onChange: x
                }, [
                  le.value.length ? I("", !0) : (s(), o("option", {
                    key: 0,
                    value: ge.value?.id
                  }, "当前新对话", 8, El)),
                  (s(!0), o(V, null, J(L.value, (k) => (s(), o("option", {
                    key: k.id,
                    value: k.id
                  }, l(k.date) + " · " + l(Ln(k.createdAt)) + " · " + l(k.messages.length) + " 条消息", 9, jl))), 128))
                ], 40, xl)
              ])) : I("", !0),
              e("label", Ul, [
                ee(e("input", {
                  "onUpdate:modelValue": A[1] || (A[1] = (k) => h.value = k),
                  type: "checkbox"
                }, null, 512), [
                  [Xe, h.value]
                ]),
                A[14] || (A[14] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              A[15] || (A[15] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: q.value,
                onClick: Yn
              }, "清除本地记录", 8, Dl)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: Q,
        class: be(["vb-simple-scroll", { "is-empty": !le.value.length }]),
        onScrollPassive: A[2] || (A[2] = //@ts-ignore
        (...k) => p(K) && p(K)(...k)),
        onLoadCapture: A[3] || (A[3] = //@ts-ignore
        (...k) => p(B) && p(B)(...k)),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        le.value.length ? (s(), o("div", {
          key: 1,
          ref_key: "conversationContent",
          ref: R,
          class: "vb-simple-thread"
        }, [
          (s(!0), o(V, null, J(le.value, (k) => (s(), o("article", {
            key: k.id,
            class: be(["vb-simple-message", [`is-${k.role}`, `is-${k.status}`]])
          }, [
            k.role === "assistant" ? (s(), o("span", Tl, [
              j(F, {
                name: "sparkles",
                size: 18
              })
            ])) : I("", !0),
            e("div", Rl, [
              k.attachments?.length ? (s(), o("div", zl, [
                (s(!0), o(V, null, J(k.attachments, (H) => (s(), o("button", {
                  key: H.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + H.name,
                  onClick: (te) => Ke(H)
                }, [
                  H.kind === "image" && w.value[H.id]?.dataUrl ? (s(), o("img", {
                    key: 0,
                    src: w.value[H.id].dataUrl,
                    alt: H.name
                  }, null, 8, Fl)) : (s(), me(F, {
                    key: 1,
                    name: H.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, l(H.name), 1),
                    e("small", null, l(H.kind === "image" ? "照片" : "文件文字") + " · " + l(U(H.size)), 1)
                  ])
                ], 8, Ol))), 128))
              ])) : I("", !0),
              k.status === "sending" && !k.content ? (s(), o("div", Bl, [
                A[19] || (A[19] = e("span", { class: "vb-loading-ring" }, null, -1)),
                e("span", null, l(k.webSearchStatus || "正在回复…"), 1)
              ])) : k.status === "sending" ? (s(), o("p", Vl, [
                N(l(k.content), 1),
                A[20] || (A[20] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : k.status === "failed" ? (s(), o(V, { key: 3 }, [
                k.content ? (s(), o("p", ql, l(k.content), 1)) : I("", !0),
                e("p", Ll, l(k.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (H) => sn(k.id)
                }, [
                  j(F, {
                    name: "activity",
                    size: 14
                  }),
                  A[21] || (A[21] = N("重试这条问题", -1))
                ], 8, Gl)
              ], 64)) : k.role !== "assistant" || !p(qt)(f(k.id)) ? (s(), o("p", Jl, l(k.content), 1)) : I("", !0),
              k.role === "assistant" && k.status === "complete" && k.content.trim() && p(qt)(f(k.id)) ? (s(), me(Qa, {
                key: 5,
                content: k.content,
                question: f(k.id),
                auto: le.value.at(-1)?.id === k.id,
                onRetry: (H) => sn(k.id)
              }, null, 8, ["content", "question", "auto", "onRetry"])) : I("", !0),
              k.status === "sending" && k.content && k.webSearchStatus ? (s(), o("small", Wl, l(k.webSearchStatus), 1)) : I("", !0),
              k.role === "assistant" && k.status === "complete" && k.webSearchWarning ? (s(), o("p", Hl, l(k.webSearchWarning), 1)) : I("", !0),
              k.role === "assistant" && k.status === "complete" && k.webSources?.length ? (s(), o("details", Kl, [
                e("summary", null, "联网来源 · " + l(k.webSources.length), 1),
                e("ol", null, [
                  (s(!0), o(V, null, J(k.webSources, (H, te) => (s(), o("li", {
                    key: H.url
                  }, [
                    e("a", {
                      href: H.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }, [
                      e("span", null, "[" + l(te + 1) + "]", 1),
                      N(" " + l(H.title), 1)
                    ], 8, Yl),
                    H.siteName || H.date ? (s(), o("small", Xl, l([H.siteName, H.date].filter(Boolean).join(" · ")), 1)) : I("", !0)
                  ]))), 128))
                ])
              ])) : I("", !0),
              k.status === "complete" ? (s(), o("small", Ql, [
                N(l(Gn(k.createdAt)), 1),
                k.role === "assistant" ? (s(), o(V, { key: 0 }, [
                  N(" · " + l(p(Je)(k.model)), 1)
                ], 64)) : I("", !0)
              ])) : I("", !0)
            ])
          ], 2))), 128))
        ], 512)) : (s(), o("div", {
          key: 0,
          ref_key: "conversationContent",
          ref: R,
          class: "vb-simple-welcome"
        }, [
          A[17] || (A[17] = e("h2", null, "今天想聊些什么？", -1)),
          A[18] || (A[18] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", Pl, [
            (s(), o(V, null, J(n, (k) => e("button", {
              key: k,
              type: "button",
              onClick: (H) => nn(k)
            }, [
              e("span", null, l(k), 1),
              j(F, {
                name: "arrow",
                size: 16
              })
            ], 8, Nl)), 64))
          ]),
          e("small", Ml, "饮食参考日期：" + l(g.value), 1)
        ], 512))
      ], 34),
      e("footer", Zl, [
        p(he) ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "vb-chat-jump-bottom",
          "aria-label": "回到最新消息",
          title: "一键到底",
          onClick: A[4] || (A[4] = //@ts-ignore
          (...k) => p(P) && p(P)(...k))
        }, [
          j(F, {
            name: "arrow",
            size: 20
          })
        ])) : I("", !0),
        e("div", ei, [
          le.value.length ? (s(), o("div", ti, [
            e("details", ni, [
              e("summary", null, [
                A[22] || (A[22] = N("快捷提问", -1)),
                j(F, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", si, [
                (s(), o(V, null, J(n, (k) => e("button", {
                  key: k,
                  type: "button",
                  onClick: (H) => nn(k)
                }, [
                  N(l(k), 1),
                  j(F, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, oi)), 64))
              ])
            ]),
            q.value ? (s(), o("span", ai, "正在回复，发送新消息可打断")) : I("", !0)
          ])) : I("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: xt,
            onDrop: at
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: S,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: p(dl),
              "aria-label": "选择照片或文件",
              onChange: ie
            }, null, 40, li),
            y.value.length ? (s(), o("div", ii, [
              (s(!0), o(V, null, J(y.value, (k) => (s(), o("div", {
                key: k.id,
                class: be(["vb-chat-file", { "is-failed": k.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: k.status !== "ready",
                  "aria-label": "预览附件：" + k.name,
                  onClick: (H) => Ke(k)
                }, [
                  k.value?.dataUrl ? (s(), o("img", {
                    key: 0,
                    src: k.value.dataUrl,
                    alt: k.name
                  }, null, 8, ui)) : (s(), me(F, {
                    key: 1,
                    name: k.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, l(k.name), 1),
                    k.status === "reading" ? (s(), o("small", di, "正在读取…")) : k.status === "failed" ? (s(), o("small", ci, l(k.error), 1)) : (s(), o("small", vi, l(U(k.size)) + " · 待发送", 1))
                  ])
                ], 8, ri),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + k.name,
                  onClick: (H) => lt(k.id)
                }, [
                  j(F, {
                    name: "close",
                    size: 13
                  })
                ], 8, mi)
              ], 2))), 128))
            ])) : I("", !0),
            A[26] || (A[26] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            ee(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": A[5] || (A[5] = (k) => b.value = k),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: Hn,
              onPaste: It
            }, null, 544), [
              [re, b.value]
            ]),
            e("div", bi, [
              e("div", pi, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: A[6] || (A[6] = (k) => S.value?.click())
                }, [
                  j(F, {
                    name: "paperclip",
                    size: 18
                  }),
                  A[23] || (A[23] = e("span", null, "附件", -1))
                ]),
                e("label", fi, [
                  ee(e("input", {
                    "onUpdate:modelValue": A[7] || (A[7] = (k) => C.value = k),
                    type: "checkbox",
                    "aria-label": "联网搜索"
                  }, null, 512), [
                    [Xe, C.value]
                  ]),
                  A[24] || (A[24] = e("span", null, "联网搜索", -1))
                ]),
                A[25] || (A[25] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !b.value.trim() && !z.value,
                onClick: A[8] || (A[8] = (k) => tn())
              }, [
                j(F, {
                  name: "arrow",
                  size: 16
                }),
                N(l(q.value ? "打断并发送" : "发送"), 1)
              ], 8, gi)
            ])
          ], 32),
          p(Ce) && p(cs) === "error" ? (s(), o("p", yi, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : I("", !0),
          D.value || O.value ? (s(), o("p", {
            key: 2,
            class: "vb-simple-notice",
            role: D.value ? "alert" : "status"
          }, l(D.value || O.value), 9, hi)) : I("", !0),
          e("div", ki, [
            e("details", wi, [
              e("summary", null, [
                j(F, {
                  name: "lock",
                  size: 12
                }),
                A[27] || (A[27] = N("隐私与使用说明", -1))
              ]),
              A[28] || (A[28] = e("div", { class: "vb-simple-privacy-panel" }, [
                e("p", null, "附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。"),
                e("p", null, "选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给维衡 AI，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。"),
                e("p", null, "点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 维衡 AI 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。"),
                e("p", null, "开启“联网搜索”后，仅把本条问题文字（最多 128 字）发送给网页搜索接口；身体档案、饮食记录、附件和跨对话记忆不会发送给搜索接口。联网检索由 DeepSeek Search & Fetch 提供，可能产生搜索 API 费用。"),
                e("p", null, "跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。"),
                e("p", null, "饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。")
              ], -1))
            ]),
            e("span", null, l(b.value.length ? `${b.value.length}/1200` : "AI 内容仅供参考"), 1)
          ])
        ])
      ]),
      _.value ? (s(), me(ot, {
        key: 0,
        title: _.value.name,
        wide: "",
        onClose: A[9] || (A[9] = (k) => _.value = null)
      }, {
        default: st(() => [
          _.value.kind === "image" ? (s(), o("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: _.value.dataUrl,
            alt: _.value.name
          }, null, 8, $i)) : (s(), o("pre", _i, l(_.value.text), 1)),
          e("p", Ai, l(_.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : I("", !0)
    ]));
  }
}), Si = /* @__PURE__ */ On(Ci, [["__scopeId", "data-v-1fb73982"]]), Ii = {
  key: 0,
  class: "vb-page-title"
}, xi = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, Ei = ["aria-pressed", "onClick"], ji = { class: "vb-glass vb-review-hero" }, Ui = { class: "vb-icon-badge vb-large-badge" }, Di = { class: "vb-small-label" }, Pi = { class: "vb-coverage-score" }, Ni = { class: "vb-assessment-grid" }, Mi = { class: "vb-glass vb-coverage-card" }, Ti = { class: "vb-section-heading" }, Ri = { class: "vb-coverage-list" }, zi = { class: "vb-food-category-icon" }, Oi = { class: "vb-coverage-name" }, Fi = { key: 0 }, Bi = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, Vi = { class: "vb-inline-note" }, qi = { class: "vb-glass vb-suggestion-card" }, Li = ["checked", "onChange"], Gi = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, Ji = { class: "vb-empty-icon" }, Wi = { class: "vb-glass vb-supplement-card" }, Hi = { class: "vb-icon-badge" }, Ki = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const a = t, n = M(a.records[0]?.date || "");
    de(() => a.records, (C) => {
      C.some((g) => g.date === n.value) || (n.value = C[0]?.date || "");
    });
    const d = W(() => a.records.find((C) => C.date === n.value)), i = (C) => Number(d.value?.foods?.[C]) || 0, r = W(() => jt.filter((C) => i(C.key) <= 0)), u = W(() => jt.length - r.value.length), m = W(() => Math.max(1, ...Ft.map((C) => i(C.key)))), c = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, v = W(() => (r.value.length ? r.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map((C) => ({ key: C.key, title: c[C.key]?.[0] || (C.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: c[C.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), h = (C) => (a.habits[n.value] || []).includes(C);
    return (C, g) => (s(), o(V, null, [
      t.embedded ? I("", !0) : (s(), o("div", Ii, [
        g[4] || (g[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: g[0] || (g[0] = (b) => C.$emit("navigate", "diary"))
        }, [
          j(F, {
            name: "plus",
            size: 17
          }),
          g[3] || (g[3] = N("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (s(), o("div", xi, [
        (s(!0), o(V, null, J(t.records.slice(0, 7), (b) => (s(), o("button", {
          key: b.date,
          class: be({ selected: n.value === b.date }),
          "aria-pressed": n.value === b.date,
          onClick: (S) => n.value = b.date
        }, l(b.date), 11, Ei))), 128))
      ])) : I("", !0),
      d.value ? (s(), o(V, { key: 2 }, [
        e("section", ji, [
          e("span", Ui, [
            j(F, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", Di, l(d.value.date) + " · 饮食回顾", 1),
            e("h2", null, l(r.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, l(r.value.length ? r.value.map((b) => b.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", Pi, [
            e("strong", null, [
              N(l(u.value), 1),
              e("small", null, " / " + l(p(jt).length), 1)
            ]),
            g[5] || (g[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", Ni, [
          e("section", Mi, [
            e("div", Ti, [
              g[6] || (g[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              j(F, { name: "chart" })
            ]),
            e("div", Ri, [
              (s(!0), o(V, null, J(p(Ft), (b) => (s(), o("div", {
                key: b.key,
                class: "vb-coverage-row"
              }, [
                e("span", zi, [
                  j(F, {
                    name: p(Cn)[b.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", Oi, [
                  N(l(b.name), 1),
                  b.key === "snacks" ? (s(), o("small", Fi, "可选记录")) : I("", !0)
                ]),
                e("span", Bi, [
                  e("i", {
                    style: kn({ width: i(b.key) / m.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: be(["vb-coverage-value", { "is-missing": !i(b.key) }])
                }, l(i(b.key) ? `${Math.round(i(b.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", Vi, [
              j(F, {
                name: "info",
                size: 15
              }),
              g[7] || (g[7] = N("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", qi, [
            g[8] || (g[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (s(!0), o(V, null, J(v.value, (b) => (s(), o("label", {
              key: b.key,
              class: be(["vb-check-row", { done: h(b.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: h(b.key),
                onChange: (S) => C.$emit("toggle-habit", n.value, b.key)
              }, null, 40, Li),
              e("span", null, [
                e("strong", null, l(b.title), 1),
                e("small", null, l(b.detail), 1)
              ])
            ], 2))), 128)),
            g[9] || (g[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (s(), o("section", Gi, [
        e("span", Ji, [
          j(F, {
            name: "bowl",
            size: 36
          })
        ]),
        g[11] || (g[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        g[12] || (g[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: g[1] || (g[1] = (b) => C.$emit("navigate", "diary"))
        }, [
          g[10] || (g[10] = N("记录今天的饮食", -1)),
          j(F, {
            name: "arrow",
            size: 17
          })
        ])
      ])),
      e("section", Wi, [
        e("span", Hi, [
          j(F, {
            name: "shield",
            size: 23
          })
        ]),
        e("div", null, [
          g[13] || (g[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, l(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, l(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: g[2] || (g[2] = (b) => C.$emit("navigate", "about"))
        }, [
          g[14] || (g[14] = N("查看注意事项", -1)),
          j(F, {
            name: "arrow",
            size: 17
          })
        ])
      ])
    ], 64));
  }
}, Yi = {
  key: 0,
  class: "vb-page-title"
}, Xi = { class: "vb-date-input" }, Qi = {
  key: 1,
  class: "vb-report-toolbar"
}, Zi = { class: "vb-date-input" }, er = {
  key: 2,
  class: "vb-report-filter"
}, tr = {
  key: 3,
  class: "vb-report-list"
}, nr = { class: "vb-report-card-top" }, sr = { class: "vb-icon-badge" }, or = {
  key: 0,
  class: "vb-feature-error"
}, ar = {
  key: 1,
  class: "vb-inline-warning"
}, lr = { class: "vb-report-card-actions" }, ir = ["onClick"], rr = ["disabled", "onClick"], ur = {
  key: 4,
  class: "vb-glass vb-report-empty"
}, dr = { class: "vb-icon-badge" }, cr = /* @__PURE__ */ He({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: a }) {
    const n = t, d = a, i = M(""), { isStale: r } = Yt(), u = W(() => n.reports.filter((v) => !i.value || v.date === i.value));
    function m(v) {
      return n.records.find((h) => h.date === v.date);
    }
    function c(v) {
      return r(v, m(v), n.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[v.status];
    }
    return (v, h) => (s(), o(V, null, [
      t.embedded ? (s(), o("div", Qi, [
        h[5] || (h[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", Zi, [
          j(F, {
            name: "calendar",
            size: 18
          }),
          ee(e("input", {
            "onUpdate:modelValue": h[1] || (h[1] = (C) => i.value = C),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [re, i.value]
          ])
        ])
      ])) : (s(), o("div", Yi, [
        h[4] || (h[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", Xi, [
          j(F, {
            name: "calendar",
            size: 18
          }),
          ee(e("input", {
            "onUpdate:modelValue": h[0] || (h[0] = (C) => i.value = C),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [re, i.value]
          ])
        ])
      ])),
      h[9] || (h[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给维衡 AI；照片和备注不随每日分析发送。", -1)),
      i.value ? (s(), o("div", er, [
        e("span", null, l(u.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: h[2] || (h[2] = (C) => i.value = "")
        }, "清除日期筛选")
      ])) : I("", !0),
      u.value.length ? (s(), o("div", tr, [
        (s(!0), o(V, null, J(u.value, (C) => (s(), o("article", {
          key: C.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", nr, [
            e("span", sr, [
              j(F, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, l(C.date), 1),
              e("small", null, l(new Date(C.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: be(["vb-pill", { "needs-update": c(C) === "需更新" }])
            }, l(c(C)), 3)
          ]),
          e("p", null, l(C.result?.summary || C.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          m(C) ? p(r)(C, m(C), t.profile) ? (s(), o("small", ar, "记录或个人目标已变化，此报告使用的是旧版本。")) : I("", !0) : (s(), o("small", or, "对应记录已删除，保留报告快照。")),
          e("div", lr, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (g) => d("open", C.date, C.id)
            }, [
              h[6] || (h[6] = N("打开报告", -1)),
              j(F, {
                name: "arrow",
                size: 15
              })
            ], 8, ir),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: C.status === "pending" || !m(C),
              onClick: (g) => d("retry", C.date)
            }, "重新分析", 8, rr)
          ])
        ]))), 128))
      ])) : (s(), o("section", ur, [
        e("span", dr, [
          j(F, {
            name: "report",
            size: 25
          })
        ]),
        e("h2", null, l(i.value ? "这一天还没有报告" : "从记录第一餐开始"), 1),
        h[8] || (h[8] = e("p", null, "保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: h[3] || (h[3] = (C) => d("navigate", "diary"))
        }, [
          h[7] || (h[7] = N("去记录饮食", -1)),
          j(F, {
            name: "arrow",
            size: 17
          })
        ])
      ]))
    ], 64));
  }
}), vr = { class: "vb-page-title" }, mr = {
  class: "vb-assessment-block",
  "aria-labelledby": "diet-assessment-heading"
}, br = {
  class: "vb-assessment-block vb-assessment-reports",
  "aria-labelledby": "ai-report-heading"
}, pr = /* @__PURE__ */ He({
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
    const n = a;
    function d(i, r) {
      n("openReport", i, r);
    }
    return (i, r) => (s(), o(V, null, [
      e("div", vr, [
        r[6] || (r[6] = e("div", null, [
          e("h1", null, "营养摄入分析"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: r[0] || (r[0] = (u) => n("navigate", "diary"))
        }, [
          j(F, {
            name: "plus",
            size: 17
          }),
          r[5] || (r[5] = N("添加饮食记录 ", -1))
        ])
      ]),
      j(ls, {
        records: t.records,
        profile: t.profile || void 0
      }, null, 8, ["records", "profile"]),
      e("section", mr, [
        r[7] || (r[7] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "饮食结构回顾"),
            e("h2", { id: "diet-assessment-heading" }, "食物类别评估")
          ]),
          e("span", { class: "vb-subtle-label" }, "按已保存记录统计")
        ], -1)),
        j(Ki, {
          records: t.records,
          habits: t.habits,
          flags: t.flags,
          embedded: "",
          onNavigate: r[1] || (r[1] = (u) => n("navigate", u)),
          onToggleHabit: r[2] || (r[2] = (u, m) => n("toggleHabit", u, m))
        }, null, 8, ["records", "habits", "flags"])
      ]),
      e("section", br, [
        r[8] || (r[8] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "每日 AI 分析"),
            e("h2", { id: "ai-report-heading" }, "AI 营养报告")
          ]),
          e("span", { class: "vb-subtle-label" }, "可按日期筛选、查看和重试")
        ], -1)),
        j(cr, {
          reports: t.reports,
          records: t.records,
          profile: t.profile,
          embedded: "",
          onOpen: d,
          onRetry: r[3] || (r[3] = (u) => n("retryReport", u)),
          onNavigate: r[4] || (r[4] = (u) => n("navigate", u))
        }, null, 8, ["reports", "records", "profile"])
      ])
    ], 64));
  }
}), fr = { class: "vb-photo-picker" }, gr = {
  key: 0,
  class: "vb-photo-preview"
}, yr = ["src"], hr = { class: "vb-photo-actions" }, kr = ["disabled"], wr = ["disabled"], $r = {
  key: 1,
  class: "vb-photo-hint",
  role: "status"
}, _r = {
  key: 2,
  class: "vb-photo-error",
  role: "alert"
}, Ar = ["src"], Cr = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: a }) {
    const n = a, d = M(!1), i = M(null), r = M(null), u = M(""), m = M(!1);
    function c(S) {
      return new Promise((y, w) => {
        const _ = URL.createObjectURL(S), z = new Image();
        z.onload = () => y({ image: z, url: _ }), z.onerror = () => {
          URL.revokeObjectURL(_), w(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, z.src = _;
      });
    }
    function v(S, y) {
      return new Promise((w, _) => S.toBlob((z) => z ? w(z) : _(new Error("图片处理失败，请重新选择。")), "image/jpeg", y));
    }
    function h(S) {
      return new Promise((y, w) => {
        const _ = new FileReader();
        _.onload = () => y(_.result), _.onerror = () => w(new Error("图片读取失败，请重新选择。")), _.readAsDataURL(S);
      });
    }
    async function C(S) {
      let y;
      try {
        const w = await createImageBitmap(S);
        y = { image: w, width: w.width, height: w.height, cleanup: () => w.close() };
      } catch {
        const w = await c(S);
        y = { image: w.image, width: w.image.naturalWidth, height: w.image.naturalHeight, cleanup: () => URL.revokeObjectURL(w.url) };
      }
      try {
        const w = Math.min(1, 1200 / Math.max(y.width, y.height)), _ = document.createElement("canvas");
        _.width = Math.max(1, Math.round(y.width * w)), _.height = Math.max(1, Math.round(y.height * w));
        const z = _.getContext("2d");
        if (!z) throw new Error("浏览器暂不支持图片预览。");
        z.drawImage(y.image, 0, 0, _.width, _.height);
        let T = await v(_, 0.76);
        if (T.size > 32e4 && (T = await v(_, 0.58)), T.size > 32e4) {
          const D = document.createElement("canvas");
          D.width = Math.round(_.width * 0.75), D.height = Math.round(_.height * 0.75), D.getContext("2d")?.drawImage(_, 0, 0, D.width, D.height), T = await v(D, 0.58);
        }
        return await h(T);
      } finally {
        y.cleanup();
      }
    }
    async function g(S, y) {
      const w = S.target, _ = w.files?.[0];
      if (w.value = "", !!_) {
        if (u.value = "", !_.type.startsWith("image/") || _.type === "image/svg+xml") {
          u.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if (_.size > 12 * 1024 * 1024) {
          u.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        m.value = !0;
        try {
          const z = await C(_), T = { name: _.name.slice(0, 100), dataUrl: z, source: y, mime: "image/jpeg" };
          n("update:modelValue", T), n("selected", T);
        } catch (z) {
          u.value = z instanceof Error ? z.message : "无法处理这张图片，请重新选择。";
        } finally {
          m.value = !1;
        }
      }
    }
    function b() {
      u.value = "", n("update:modelValue", null);
    }
    return (S, y) => (s(), o("div", fr, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: y[0] || (y[0] = (w) => g(w, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: r,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: y[1] || (y[1] = (w) => g(w, "本地图片"))
      }, null, 544),
      t.modelValue ? (s(), o("div", gr, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: y[2] || (y[2] = (w) => d.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, yr)
        ]),
        e("span", null, [
          e("strong", null, l(t.modelValue.name), 1),
          e("small", null, l(t.modelValue.source) + " · 点击图片查看大图", 1)
        ]),
        e("button", {
          type: "button",
          class: "vb-icon-button",
          "aria-label": "移除照片",
          onClick: b
        }, [
          j(F, {
            name: "close",
            size: 15
          })
        ])
      ])) : I("", !0),
      e("div", hr, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: y[3] || (y[3] = (w) => i.value?.click())
        }, [
          j(F, {
            name: "camera",
            size: 17
          }),
          y[6] || (y[6] = N("拍照", -1))
        ], 8, kr),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: y[4] || (y[4] = (w) => r.value?.click())
        }, [
          j(F, {
            name: "upload",
            size: 17
          }),
          N(l(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, wr)
      ]),
      m.value ? (s(), o("p", $r, "正在准备图片…")) : u.value ? (s(), o("p", _r, l(u.value), 1)) : I("", !0),
      d.value && t.modelValue ? (s(), me(ot, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: y[5] || (y[5] = (w) => d.value = !1)
      }, {
        default: st(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, Ar)
        ]),
        _: 1
      })) : I("", !0)
    ]));
  }
}, Sr = { class: "vb-glass vb-photo-card" }, Ir = { class: "vb-aside-heading" }, xr = { class: "vb-photo-badge" }, Er = {
  key: 0,
  class: "vb-feature-error",
  role: "alert"
}, jr = {
  key: 1,
  class: "vb-ai-progress",
  role: "status"
}, Ur = {
  key: 2,
  class: "vb-recognition-failed"
}, Dr = {
  class: "vb-feature-error",
  role: "alert"
}, Pr = {
  key: 4,
  class: "vb-recognition-results"
}, Nr = { class: "vb-data-note" }, Mr = {
  key: 0,
  class: "vb-recognition-meta"
}, Tr = { key: 0 }, Rr = { class: "vb-recognized-list" }, zr = ["value", "disabled", "aria-label", "onInput"], Or = ["aria-label", "onClick"], Fr = {
  key: 0,
  class: "vb-recognition-matches"
}, Br = ["onClick"], Vr = { class: "vb-recognition-weight" }, qr = ["onUpdate:modelValue", "disabled", "aria-label"], Lr = {
  key: 1,
  class: "vb-data-note"
}, Gr = { class: "vb-recognition-actions" }, Jr = ["disabled"], Wr = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object },
  emits: ["confirm"],
  setup(t, { emit: a }) {
    const n = t, d = a, { state: i } = Ht(), r = M(null), u = M("");
    let m = "";
    const c = W(() => n.draft.recognition), v = W(() => {
      const T = c.value?.generatedAt;
      if (!T) return "";
      const D = new Date(T);
      return Number.isNaN(D.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(D);
    }), h = W(() => c.value?.items?.length && !c.value.confirmed && c.value.items.every((T) => T.name?.trim() && Number.isFinite(Number(T.grams)) && Number(T.grams) >= 0.1 && Number(T.grams) <= 5e3));
    de(() => [n.draft.date, n.draft.photoId], async ([T, D]) => {
      u.value = "", r.value = null, n.draft.recognition?.status === "pending" && m !== n.draft.recognition.requestId && (n.draft.recognition = { ...n.draft.recognition, status: "failed", error: "上次识别未完成，请重新识别。" });
      try {
        if (D) {
          const O = await _s("photos", D);
          n.draft.date === T && n.draft.photoId === D && (r.value = O || null);
        } else if (n.legacyPhoto?.dataUrl) {
          const O = { ...n.legacyPhoto, id: crypto.randomUUID(), date: T };
          await Vt("photos", O), n.draft.date === T && (n.draft.photoId = O.id, r.value = O);
        }
      } catch (O) {
        u.value = O.message, r.value = n.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function C(T) {
      r.value = T, T || g();
    }
    async function g() {
      const T = n.draft.photoId;
      if (n.draft.photoId = null, n.draft.recognition = null, m = "", T && !i.records.some((D) => D.photoId === T) && !Object.values(i.drafts).some((D) => D.photoId === T)) try {
        await Cs("photos", T);
      } catch (D) {
        u.value = D.message;
      }
    }
    async function b(T) {
      const D = n.draft.date, O = crypto.randomUUID();
      u.value = "";
      try {
        const Q = { ...T, id: O, date: D, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await Vt("photos", Q), n.draft.date !== D) return;
        r.value = Q, n.draft.photoId = O, n.draft.recognition = null, await S(Q);
      } catch (Q) {
        u.value = Q.message;
      }
    }
    async function S(T = r.value) {
      if (!T?.dataUrl || c.value?.status === "pending") return;
      const D = n.draft, O = D.photoId, Q = crypto.randomUUID();
      m = Q, D.recognition = { requestId: Q, photoId: O, status: "pending", items: [], error: "", confirmed: !1 };
      try {
        const R = await Ct("recognize", { image: T.dataUrl, requestId: O || Q });
        if (D.photoId !== O || D.recognition?.requestId !== Q) return;
        D.recognition = { ...R, requestId: Q, photoId: O, status: "complete", error: "", confirmed: !1 };
      } catch (R) {
        D.photoId === O && D.recognition?.requestId === Q && (D.recognition = { ...D.recognition, status: "failed", error: R.message });
      } finally {
        m === Q && (m = "");
      }
    }
    function y(T, D) {
      T.name = D.target.value, T.foodId = null;
    }
    function w(T, D) {
      T.foodId = D.key, T.name = D.name;
    }
    function _() {
      n.draft.recognition = { ...n.draft.recognition, status: "complete", recognitionId: n.draft.recognition?.recognitionId || crypto.randomUUID(), items: n.draft.recognition?.items || [], confirmed: !1, error: "", note: n.draft.recognition?.note || "手动补充，请核对名称与份量。" }, n.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function z() {
      h.value && d("confirm", { batchId: c.value.recognitionId, items: c.value.items.map((T) => ({ ...T, estimated: !0, source: "photo" })) });
    }
    return (T, D) => (s(), o("section", Sr, [
      e("div", Ir, [
        D[2] || (D[2] = e("div", null, [
          e("h2", null, "这一餐的照片"),
          e("p", null, "拍一餐，核对后再记入。")
        ], -1)),
        e("span", xr, [
          j(F, {
            name: "camera",
            size: 16
          })
        ])
      ]),
      D[6] || (D[6] = e("p", { class: "vb-photo-disclosure" }, "选择照片后自动识别：压缩照片会经本地后端发送给维衡 AI。照片与识别结果保存在当前浏览器。", -1)),
      j(Cr, {
        "model-value": r.value,
        "onUpdate:modelValue": C,
        onSelected: b
      }, null, 8, ["model-value"]),
      u.value ? (s(), o("p", Er, l(u.value), 1)) : I("", !0),
      c.value?.status === "pending" ? (s(), o("div", jr, [...D[3] || (D[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : I("", !0),
      c.value?.status === "failed" ? (s(), o("div", Ur, [
        e("p", Dr, l(c.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: D[0] || (D[0] = (O) => S())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: _
          }, "手动录入")
        ])
      ])) : I("", !0),
      r.value && !c.value ? (s(), o("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: D[1] || (D[1] = (O) => S())
      }, "开始 AI 识别")) : I("", !0),
      c.value?.status === "complete" ? (s(), o("div", Pr, [
        e("p", Nr, l(c.value.note || "请核对食物名称与份量。") + " 照片重量为估算，营养数值只按确认的数据库条目计算。", 1),
        c.value.model ? (s(), o("small", Mr, [
          N("由 " + l(p(Je)(c.value.model)) + " 识别", 1),
          v.value ? (s(), o("span", Tr, " · " + l(v.value), 1)) : I("", !0)
        ])) : I("", !0),
        e("div", Rr, [
          (s(!0), o(V, null, J(c.value.items, (O, Q) => (s(), o("div", {
            key: O.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: O.name,
                disabled: c.value.confirmed,
                "aria-label": "识别食物" + (Q + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (R) => y(O, R)
              }, null, 40, zr),
              c.value.confirmed ? I("", !0) : (s(), o("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (Q + 1),
                onClick: (R) => c.value.items.splice(Q, 1)
              }, [
                j(F, {
                  name: "close",
                  size: 14
                })
              ], 8, Or))
            ]),
            !O.foodId && !c.value.confirmed ? (s(), o("div", Fr, [
              (s(!0), o(V, null, J(p(Jt)(O.name, 3), (R) => (s(), o("button", {
                key: R.key,
                type: "button",
                onClick: (q) => w(O, R)
              }, l(R.name), 9, Br))), 128))
            ])) : I("", !0),
            e("label", Vr, [
              D[4] || (D[4] = N("估算可食部", -1)),
              ee(e("input", {
                "onUpdate:modelValue": (R) => O.grams = R,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: c.value.confirmed,
                "aria-label": "识别食物" + (Q + 1) + "克数",
                placeholder: "克数"
              }, null, 8, qr), [
                [re, O.grams]
              ]),
              D[5] || (D[5] = N("克", -1))
            ]),
            e("small", {
              class: be({ "vb-unmatched": !O.foodId })
            }, l(O.foodId ? "数据库：" + p(oe)[O.foodId]?.state : "未匹配数据库，营养指标暂无数据"), 3),
            e("small", null, l(O.uncertainty), 1)
          ]))), 128))
        ]),
        c.value.items.length ? I("", !0) : (s(), o("p", Lr, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", Gr, [
          c.value.confirmed ? I("", !0) : (s(), o("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: _
          }, "＋补充遗漏食物")),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !h.value,
            onClick: z
          }, l(c.value.confirmed ? "已加入本次选择" : "确认并加入记录"), 9, Jr)
        ])
      ])) : I("", !0)
    ]));
  }
}, Hr = { class: "vb-diary-page" }, Kr = { class: "vb-page-title" }, Yr = { class: "vb-date-input" }, Xr = ["max"], Qr = {
  key: 0,
  class: "vb-diary-grid"
}, Zr = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, eu = ["disabled"], tu = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, nu = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], su = { class: "vb-section-heading" }, ou = { class: "vb-pill" }, au = {
  key: 0,
  class: "vb-selected-list"
}, lu = {
  key: 1,
  class: "vb-muted-empty"
}, iu = { class: "vb-section-heading" }, ru = {
  key: 0,
  class: "vb-history-list"
}, uu = ["aria-label", "onClick"], du = ["onClick"], cu = ["aria-label", "onClick"], vu = {
  key: 1,
  class: "vb-muted-empty"
}, mu = { class: "vb-section-heading" }, bu = { class: "vb-diary-search-row" }, pu = { class: "vb-search-field" }, fu = { class: "vb-meal-select" }, gu = ["value"], yu = {
  key: 0,
  class: "vb-search-results"
}, hu = ["onClick"], ku = {
  key: 0,
  class: "vb-search-empty"
}, wu = { class: "vb-diary-entry-heading" }, $u = {
  key: 1,
  class: "vb-diary-entries"
}, _u = { class: "vb-diary-entry-title" }, Au = ["onClick"], Cu = ["onUpdate:modelValue", "aria-label"], Su = ["aria-label", "onClick"], Iu = { class: "vb-data-note" }, xu = {
  key: 0,
  class: "vb-pill"
}, Eu = { class: "vb-entry-controls" }, ju = ["onUpdate:modelValue", "aria-label"], Uu = { class: "vb-entry-meal" }, Du = ["onUpdate:modelValue"], Pu = ["value"], Nu = {
  key: 0,
  class: "vb-inline-warning"
}, Mu = ["onClick"], Tu = {
  key: 2,
  class: "vb-muted-empty"
}, Ru = ["onToggle"], zu = { key: 0 }, Ou = ["onClick"], Fu = ["onClick"], Bu = { class: "vb-field vb-notes-field" }, Vu = { class: "vb-intake-more" }, qu = { key: 0 }, Lu = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: a }) {
    const n = t, d = a, { state: i, ensureDraft: r, addToDraft: u } = Ht(), { isStale: m } = Yt(), c = Ze({}), v = Ze({});
    function h(K = /* @__PURE__ */ new Date()) {
      const B = K.getHours() * 60 + K.getMinutes();
      return B >= 300 && B < 600 ? "breakfast" : B >= 600 && B <= 840 ? "lunch" : B >= 960 && B <= 1260 ? "dinner" : "snack";
    }
    const C = M(n.initialDate || we()), g = M(""), b = M(h()), S = M("selected"), y = M(null), w = M("");
    de(() => n.initialDate, (K) => {
      K && (C.value = K);
    }), de(C, (K) => {
      r(K), w.value = "", g.value = "";
    }, { immediate: !0 });
    const _ = W(() => i.drafts[C.value]), z = W(() => an(_.value?.entries)), T = W(() => Jt(g.value, 8)), D = W(() => n.records.find((K) => K.date === C.value)), O = W(() => z.value.length > 0 || !!(D.value && !Array.isArray(_.value?.savedEntries))), Q = (K) => n.reports.find((B) => B.date === K), R = /* @__PURE__ */ new Set();
    async function q(K) {
      const B = C.value, P = Ae(), L = b.value, x = B + ":" + K.key;
      if (!R.has(x)) {
        R.add(x);
        try {
          if (await Le(K.key), C.value !== B || Ae() !== P) return;
          u({ date: B, foodId: K.key, grams: K.grams || 100, meal: L }), g.value = "", S.value = "selected";
        } catch (f) {
          w.value = f.message;
        } finally {
          R.delete(x);
        }
      }
    }
    function X() {
      _.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: g.value.trim(), grams: 100, meal: b.value, group: "unclassified", source: "manual", referenceConfirmed: !0 }), g.value = "";
    }
    async function pe({ items: K, batchId: B }) {
      const P = C.value, L = Ae();
      if (_.value.appliedBatches.includes(B)) return;
      try {
        await Le(K.map((f) => f.foodId));
      } catch (f) {
        w.value = f.message;
        return;
      }
      if (C.value !== P || Ae() !== L || _.value.appliedBatches.includes(B)) return;
      const x = an(K.map((f) => ({ ...f, id: crypto.randomUUID(), meal: b.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: _t(oe[f.foodId]) })));
      if (x.length !== K.length) {
        w.value = "请核对每项食物名称与克数。";
        return;
      }
      _.value.entries.push(...x), _.value.appliedBatches.push(B), _.value.recognition.confirmed = !0, S.value = "selected";
    }
    function ue() {
      if (n.saving || !O.value) return;
      if (w.value = "", z.value.length !== _.value.entries.length) {
        w.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
        return;
      }
      const K = JSON.parse(JSON.stringify(_.value));
      Array.isArray(K.savedEntries) && (K.entries = [...K.savedEntries, ...K.entries], delete K.savedEntries), d("save", K);
    }
    function ge(K) {
      S.value = K, matchMedia("(max-width:950px)").matches && Ue(() => y.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function le(K) {
      const B = ["ArrowRight", "ArrowDown", "End"].includes(K.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(K.key) ? "selected" : null;
      B && (K.preventDefault(), ge(B), Ue(() => document.getElementById("vb-tab-" + B)?.focus()));
    }
    function he(K) {
      const B = Q(K.date);
      return B ? m(B, K, n.profile) ? "报告需更新" : B.status === "pending" ? "分析中" : B.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (K, B) => (s(), o("div", Hr, [
      e("div", Kr, [
        B[8] || (B[8] = e("div", null, [
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", Yr, [
          j(F, {
            name: "calendar",
            size: 18
          }),
          ee(e("input", {
            "onUpdate:modelValue": B[0] || (B[0] = (P) => C.value = P),
            type: "date",
            max: p(we)(),
            "aria-label": "饮食记录日期"
          }, null, 8, Xr), [
            [re, C.value]
          ])
        ])
      ]),
      _.value ? (s(), o("div", Qr, [
        e("aside", Zr, [
          (s(), me(Wr, {
            key: C.value,
            draft: _.value,
            "legacy-photo": D.value?.photo,
            onConfirm: pe
          }, null, 8, ["draft", "legacy-photo"])),
          e("div", {
            class: be(["vb-diary-actions", { "has-analysis": D.value }])
          }, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving || !O.value
            }, [
              N(l(t.saving ? "正在保存…" : "保存记录"), 1),
              j(F, {
                name: "arrow",
                size: 17
              })
            ], 8, eu),
            D.value ? (s(), o("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: B[1] || (B[1] = (P) => K.$emit("analysis", C.value))
            }, "查看分析")) : I("", !0),
            w.value ? (s(), o("p", tu, l(w.value), 1)) : I("", !0)
          ], 2),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: le
          }, [
            (s(!0), o(V, null, J([["selected", "本次选择", z.value.length], ["history", "最近记录", t.records.length]], ([P, L, x]) => (s(), o("button", {
              id: "vb-tab-" + P,
              key: P,
              type: "button",
              role: "tab",
              "aria-selected": S.value === P,
              "aria-controls": "vb-panel-" + P,
              tabindex: S.value === P ? 0 : -1,
              class: be({ selected: S.value === P }),
              onClick: (f) => ge(P)
            }, [
              N(l(L), 1),
              e("span", null, l(x), 1)
            ], 10, nu))), 128))
          ], 32),
          S.value === "selected" ? (s(), o("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: y,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", su, [
              e("div", null, [
                B[9] || (B[9] = e("h2", null, "本次选择", -1)),
                e("p", null, l(C.value), 1)
              ]),
              e("span", ou, l(z.value.length) + " 项", 1)
            ]),
            j(Gt, {
              entries: z.value,
              compact: ""
            }, null, 8, ["entries"]),
            z.value.length ? (s(), o("div", au, [
              (s(!0), o(V, null, J(z.value, (P) => (s(), o("div", {
                key: P.id
              }, [
                e("span", null, [
                  N(l(P.name), 1),
                  e("small", null, l(p(bt).find(([L]) => L === P.meal)?.[1]) + l(P.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  N(l(P.grams), 1),
                  B[10] || (B[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (s(), o("p", lu, "选择食物后，会在这里汇总。"))
          ], 512)) : (s(), o("section", {
            key: 1,
            id: "vb-panel-history",
            ref_key: "asidePanel",
            ref: y,
            class: "vb-glass vb-aside-panel vb-history-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-history",
            tabindex: "0"
          }, [
            e("div", iu, [
              B[11] || (B[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              j(F, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (s(), o("div", ru, [
              (s(!0), o(V, null, J(t.records.slice(0, 12), (P) => (s(), o("div", {
                key: P.date,
                class: "vb-history-item vb-history-with-ai"
              }, [
                e("button", {
                  type: "button",
                  "aria-label": `打开 ${P.date} 的饮食记录`,
                  onClick: (L) => C.value = P.date
                }, [
                  B[12] || (B[12] = e("span", { class: "vb-status-dot" }, null, -1)),
                  e("span", null, [
                    e("strong", null, l(P.date), 1),
                    e("small", null, l(Object.values(P.foods || {}).filter((L) => Number(L) > 0).length) + " 类食物", 1)
                  ])
                ], 8, uu),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (L) => K.$emit("analysis", P.date)
                }, l(he(P)), 9, du),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + P.date + "的记录",
                  onClick: (L) => K.$emit("remove", P.date)
                }, [
                  j(F, {
                    name: "close",
                    size: 14
                  })
                ], 8, cu)
              ]))), 128))
            ])) : (s(), o("p", vu, "你的第一天记录，从今天开始。"))
          ], 512))
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: Te(ue, ["prevent"])
        }, [
          e("div", mu, [
            B[13] || (B[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: B[2] || (B[2] = (P) => K.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", bu, [
            e("label", pu, [
              j(F, {
                name: "search",
                size: 18
              }),
              ee(e("input", {
                "onUpdate:modelValue": B[3] || (B[3] = (P) => g.value = P),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: B[4] || (B[4] = es(Te((P) => T.value[0] && q(T.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [re, g.value]
              ])
            ]),
            e("label", fu, [
              B[14] || (B[14] = e("span", null, "添加到", -1)),
              ee(e("select", {
                "onUpdate:modelValue": B[5] || (B[5] = (P) => b.value = P),
                "aria-label": "添加食物的餐次"
              }, [
                (s(!0), o(V, null, J(p(bt), ([P, L]) => (s(), o("option", {
                  key: P,
                  value: P
                }, l(L), 9, gu))), 128))
              ], 512), [
                [Se, b.value]
              ])
            ])
          ]),
          g.value.trim() ? (s(), o("div", yu, [
            (s(!0), o(V, null, J(T.value, (P) => (s(), o("button", {
              key: P.key,
              type: "button",
              class: "vb-search-result",
              onClick: (L) => q(P)
            }, [
              e("span", null, [
                e("strong", null, l(P.name), 1),
                e("small", null, l(P.state) + " · " + l(P.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              j(F, {
                name: "plus",
                size: 17
              })
            ], 8, hu))), 128)),
            T.value.length ? I("", !0) : (s(), o("p", ku, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: X
            }, [
              N("手动添加“" + l(g.value) + "”", 1),
              j(F, {
                name: "plus",
                size: 16
              })
            ])
          ])) : I("", !0),
          e("div", wu, [
            e("h3", null, [
              B[15] || (B[15] = N("已选食物 ", -1)),
              e("small", null, l(_.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: X
            }, "＋手动添加")
          ]),
          _.value.entries.length ? (s(), o("div", $u, [
            (s(!0), o(V, null, J(_.value.entries, (P, L) => (s(), o("article", {
              key: P.id,
              class: "vb-diary-entry"
            }, [
              e("div", _u, [
                P.foodId ? (s(), o("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (x) => K.$emit("detail", P.foodId)
                }, [
                  N(l(p(St)(p(oe)[P.foodId]) || P.name), 1),
                  j(F, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, Au)) : ee((s(), o("input", {
                  key: 1,
                  "onUpdate:modelValue": (x) => P.name = x,
                  "aria-label": "手动食物" + (L + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 8, Cu)), [
                  [re, P.name]
                ]),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (L + 1),
                  onClick: (x) => _.value.entries.splice(L, 1)
                }, [
                  j(F, {
                    name: "close",
                    size: 15
                  })
                ], 8, Su)
              ]),
              e("p", Iu, [
                N(l(P.foodId ? p(oe)[P.foodId]?.state : "手动条目，暂无营养数据") + l(P.estimated ? " · 份量为估算" : ""), 1),
                P.nutritionSnapshot?.dataType === "ai-estimate" ? (s(), o("span", xu, "含AI估算")) : I("", !0)
              ]),
              j(zn, {
                food: p(oe)[P.foodId],
                onChoose: (x) => {
                  P.grams = x, P.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", Eu, [
                e("label", null, [
                  B[16] || (B[16] = N("可食部重量", -1)),
                  ee(e("input", {
                    "onUpdate:modelValue": (x) => P.grams = x,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (p(oe)[P.foodId]?.name || P.name || "食物") + "克数"
                  }, null, 8, ju), [
                    [re, P.grams]
                  ]),
                  B[17] || (B[17] = e("small", null, "克", -1))
                ]),
                e("label", Uu, [
                  B[18] || (B[18] = e("span", null, "餐次", -1)),
                  ee(e("select", {
                    "onUpdate:modelValue": (x) => P.meal = x
                  }, [
                    (s(!0), o(V, null, J(p(bt), ([x, f]) => (s(), o("option", {
                      key: x,
                      value: x
                    }, l(f), 9, Pu))), 128))
                  ], 8, Du), [
                    [Se, P.meal]
                  ])
                ])
              ]),
              P.referenceConfirmed === !1 ? (s(), o("p", Nu, [
                B[19] || (B[19] = N("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                p(oe)[P.foodId]?.source ? (s(), o("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (x) => P.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, Mu)) : (s(), o("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: B[6] || (B[6] = (x) => K.$emit("browse"))
                }, "查找具体食物"))
              ])) : I("", !0)
            ]))), 128))
          ])) : (s(), o("p", Tu, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (s(!0), o(V, null, J(p(Ft), (P) => (s(), o("details", {
            key: P.key,
            class: "vb-diary-food-group",
            onToggle: (L) => c[P.key] = L.target.open
          }, [
            e("summary", null, [
              j(F, {
                name: p(Cn)[P.key],
                size: 18
              }, null, 8, ["name"]),
              N(l(P.name), 1),
              e("small", null, l(P.items.length) + " 个条目", 1),
              j(F, {
                name: "chevron",
                size: 14
              })
            ]),
            c[P.key] ? (s(), o("div", zu, [
              (s(!0), o(V, null, J(P.items.slice(0, v[P.key] || 24), ([L, x]) => (s(), o("button", {
                key: L,
                type: "button",
                onClick: (f) => q(p(oe)[L])
              }, l(x) + " ＋", 9, Ou))), 128)),
              P.items.length > (v[P.key] || 24) ? (s(), o("button", {
                key: 0,
                type: "button",
                onClick: (L) => v[P.key] = (v[P.key] || 24) + 24
              }, "再显示24项", 8, Fu)) : I("", !0)
            ])) : I("", !0)
          ], 40, Ru))), 128)),
          e("label", Bu, [
            B[20] || (B[20] = N("补充备注 ", -1)),
            B[21] || (B[21] = e("span", null, "可选，不发送给 AI", -1)),
            ee(e("textarea", {
              "onUpdate:modelValue": B[7] || (B[7] = (P) => _.value.notes = P),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [re, _.value.notes]
            ])
          ]),
          e("details", Vu, [
            B[22] || (B[22] = e("summary", null, "查看记录依据", -1)),
            B[23] || (B[23] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (s(!0), o(V, null, J(z.value, (P) => (s(), o("p", {
              key: P.id
            }, [
              N(l(P.name) + "：" + l(P.nutritionSnapshot?.source?.name || p(Je)(P.nutritionSnapshot?.estimate?.model) || "原目录数据"), 1),
              P.nutritionSnapshot?.estimate ? (s(), o("span", qu, " · " + l(P.nutritionSnapshot.estimate.assumption), 1)) : I("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : I("", !0)
    ]));
  }
}, Gu = { class: "vb-food-card vb-glass" }, Ju = ["aria-label"], Wu = { class: "vb-food-card-copy" }, Hu = { class: "vb-small-label" }, Ku = { key: 0 }, Yu = { key: 0 }, Xu = {
  key: 1,
  class: "vb-food-composition-note"
}, Qu = { class: "vb-food-card-bottom" }, Zu = ["aria-pressed"], yn = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const a = t;
    de(() => a.food.key, (r) => {
      Le(r).catch(() => {
      });
    }, { immediate: !0 });
    const { photo: n, loading: d, failed: i } = Rn(() => a.food);
    return (r, u) => (s(), o("article", Gu, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: u[0] || (u[0] = (m) => r.$emit("detail", t.food.key))
      }, [
        j(Qt, {
          food: t.food,
          photo: p(n),
          loading: p(d),
          failed: p(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", Wu, [
          e("span", Hu, l(t.food.categoryName), 1),
          e("h3", null, l(p(St)(t.food)), 1),
          e("p", null, l(p(Xt)(t.food)), 1),
          t.food.source ? (s(), o("dl", Ku, [
            (s(!0), o(V, null, J(p(De), (m) => (s(), o("div", {
              key: m.id
            }, [
              e("dt", null, l(m.id === "carbs" ? "碳水" : m.name), 1),
              e("dd", null, [
                N(l(p(Me)(t.food.nutrients[m.id])), 1),
                t.food.nutrients[m.id] != null ? (s(), o("small", Yu, l(m.unit), 1)) : I("", !0)
              ])
            ]))), 128))
          ])) : (s(), o("p", Xu, [
            u[3] || (u[3] = N("按实际配方记录份量", -1)),
            u[4] || (u[4] = e("br", null, null, -1)),
            N(l(p(An).estimates?.[t.food.key] ? "已保存AI单值估算 · 查看假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, Ju),
      e("div", Qu, [
        e("span", null, l(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (s(), o("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: be({ selected: t.compared }),
          onClick: u[2] || (u[2] = (m) => r.$emit("compare", t.food.key))
        }, [
          j(F, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          N(l(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, Zu)) : (s(), o("button", {
          key: 0,
          type: "button",
          onClick: u[1] || (u[1] = (m) => r.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, ed = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), td = { class: "vb-food-hub" }, nd = { class: "vb-page-title" }, sd = ["aria-expanded"], od = { class: "vb-glass vb-food-search-hero" }, ad = { class: "vb-icon-badge" }, ld = { class: "vb-food-search-input" }, id = {
  key: 1,
  class: "vb-food-suggestions"
}, rd = ["onClick"], ud = { class: "vb-recommended" }, dd = ["onClick"], cd = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, vd = { class: "vb-section-heading" }, md = {
  key: 0,
  class: "vb-comparison-chips"
}, bd = ["onClick"], pd = { class: "vb-field" }, fd = { class: "vb-ask-bottom" }, gd = ["disabled"], yd = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, hd = {
  key: 2,
  class: "vb-ai-answer"
}, kd = {
  key: 0,
  class: "vb-data-note"
}, wd = { class: "vb-answer-foods" }, $d = ["onClick"], _d = { class: "vb-data-note" }, Ad = { class: "vb-data-note" }, Cd = {
  key: 1,
  class: "vb-compare-bar"
}, Sd = ["onClick"], Id = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, xd = { class: "vb-food-results-grid" }, Ed = { class: "vb-section-heading vb-category-heading" }, jd = { class: "vb-food-category-grid" }, Ud = ["onClick"], Dd = ["src", "alt"], Pd = { class: "vb-food-results-top" }, Nd = { class: "vb-food-filter" }, Md = { key: 0 }, Td = ["onClick"], Rd = { key: 1 }, zd = ["value"], Od = { class: "vb-food-results-grid" }, Fd = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, Bd = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, Vd = ["disabled"], qd = ["disabled"], Ld = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, Gd = { class: "vb-reference-sample-list" }, Jd = ["onClick"], Wd = { key: 0 }, Hd = { class: "vb-food-source-note" }, Kd = ["href"], Yd = ["href"], Xd = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const a = M(""), n = M(""), d = M(""), i = M(""), r = M("relevance"), u = M(1), m = M(!1), c = M([]), v = M(""), h = M(!1), C = M(""), g = M(!1), b = M(null), S = M(""), y = Ut, w = new Set(Ut.map((L) => L.key)), _ = new Set(is.map((L) => L.key)), z = W(() => n.value ? Dt(n.value).map((L) => L.food).filter((L) => _.has(L.key) && !w.has(L.key)) : []);
    function T(L, x = We.length) {
      return Dt(L).map((f) => f.food).filter((f) => w.has(f.key)).slice(0, x);
    }
    const D = W(() => a.value.trim() ? T(a.value, We.length).slice(0, 5) : []), O = (L) => y.filter((x) => x.category === L).length, Q = Ut.length, R = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((L) => {
      const x = Dt(L).map((f) => f.food).filter((f) => w.has(f.key));
      return x.find((f) => f.source) || x[0];
    }).filter(Boolean).map((L) => [L.key, L])).values()], q = W(() => {
      let L = n.value ? T(n.value) : [...y].sort((x, f) => +!x.source - +!f.source);
      return d.value && (L = L.filter((x) => x.category === d.value)), L;
    }), X = W(() => [...new Set(q.value.map((L) => L.subcategory))]), pe = W(() => {
      let L = q.value.filter((x) => !i.value || x.subcategory === i.value);
      if (r.value !== "relevance") {
        const [x, f] = r.value.split(":");
        L = [...L].sort(($, U) => {
          if (x === "name") return $.name.localeCompare(U.name, "zh");
          const se = $.nutrients[x], ie = U.nutrients[x];
          return se == null || ie == null ? +(se == null) - +(ie == null) : (f === "asc" ? 1 : -1) * (se - ie);
        });
      }
      return L;
    }), ue = W(() => Math.max(1, Math.ceil(pe.value.length / 12))), ge = W(() => pe.value.slice((u.value - 1) * 12, u.value * 12));
    de([i, r], () => u.value = 1);
    function le(L = a.value) {
      a.value = L.trim(), n.value = a.value, d.value = "", i.value = "", u.value = 1, m.value = !1;
    }
    function he(L) {
      d.value = L, n.value = "", a.value = "", i.value = "", u.value = 1, r.value = "relevance";
    }
    function K() {
      d.value = "", n.value = "", a.value = "", i.value = "", u.value = 1;
    }
    function B(L) {
      v.value = "", c.value.includes(L) ? c.value = c.value.filter((x) => x !== L) : c.value.length < 2 ? c.value.push(L) : v.value = "每次选择两种食物进行比较。";
    }
    async function P() {
      if (!(g.value || !C.value.trim())) {
        g.value = !0, S.value = "", b.value = null;
        try {
          b.value = await Ct("ask", { question: C.value.trim(), foodIds: c.value });
        } catch (L) {
          S.value = L.message;
        } finally {
          g.value = !1;
        }
      }
    }
    return (L, x) => (s(), o("div", td, [
      e("div", nd, [
        e("div", null, [
          x[14] || (x[14] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, l(p(Q).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": h.value,
          onClick: x[0] || (x[0] = (f) => h.value = !h.value)
        }, [
          j(F, {
            name: "sparkles",
            size: 17
          }),
          x[15] || (x[15] = N("问 AI", -1))
        ], 8, sd)
      ]),
      e("section", od, [
        e("span", ad, [
          j(F, {
            name: "search",
            size: 23
          })
        ]),
        x[18] || (x[18] = e("div", null, [
          e("h2", null, "今天想了解哪一种食物？")
        ], -1)),
        e("form", {
          class: "vb-food-search-form",
          onSubmit: x[3] || (x[3] = Te((f) => le(), ["prevent"]))
        }, [
          e("div", ld, [
            j(F, {
              name: "search",
              size: 19
            }),
            ee(e("input", {
              "onUpdate:modelValue": x[1] || (x[1] = (f) => a.value = f),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: x[2] || (x[2] = (f) => m.value = !0)
            }, null, 544), [
              [re, a.value]
            ]),
            a.value ? (s(), o("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: K
            }, [
              j(F, {
                name: "close",
                size: 15
              })
            ])) : I("", !0),
            m.value && D.value.length ? (s(), o("div", id, [
              (s(!0), o(V, null, J(D.value, (f) => (s(), o("button", {
                key: f.key,
                type: "button",
                onClick: ($) => le(f.name)
              }, [
                N(l(f.name), 1),
                e("small", null, l(f.state), 1)
              ], 8, rd))), 128))
            ])) : I("", !0)
          ]),
          x[16] || (x[16] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", ud, [
          x[17] || (x[17] = e("span", null, "推荐搜索", -1)),
          (s(), o(V, null, J(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (f) => e("button", {
            key: f,
            type: "button",
            onClick: ($) => le(f)
          }, l(f), 9, dd)), 64))
        ])
      ]),
      h.value ? (s(), o("section", cd, [
        e("div", vd, [
          x[19] || (x[19] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          j(F, { name: "sparkles" })
        ]),
        x[23] || (x[23] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给维衡 AI。数值来自食物库，AI 负责解释。", -1)),
        c.value.length ? (s(), o("div", md, [
          (s(!0), o(V, null, J(c.value, (f) => (s(), o("button", {
            key: f,
            type: "button",
            onClick: ($) => B(f)
          }, l(p(oe)[f].name) + " ×", 9, bd))), 128))
        ])) : I("", !0),
        e("form", {
          onSubmit: Te(P, ["prevent"])
        }, [
          e("label", pd, [
            x[20] || (x[20] = N("你的问题", -1)),
            ee(e("textarea", {
              "onUpdate:modelValue": x[4] || (x[4] = (f) => C.value = f),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [re, C.value]
            ])
          ]),
          e("div", fd, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: x[5] || (x[5] = (f) => C.value = c.value.length === 2 ? "这两种食物的蛋白质有什么区别？" : "100 克香蕉大约有多少热量？")
            }, "填入示例问题"),
            e("button", {
              type: "submit",
              class: "vb-button vb-button-primary",
              disabled: g.value || !C.value.trim()
            }, l(g.value ? "正在查询与分析…" : "发送问题"), 9, gd)
          ])
        ], 32),
        S.value ? (s(), o("p", yd, l(S.value), 1)) : I("", !0),
        b.value ? (s(), o("div", hd, [
          x[21] || (x[21] = e("h3", null, "数据库数值", -1)),
          b.value.database.length ? I("", !0) : (s(), o("p", kd, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", wd, [
            (s(!0), o(V, null, J(b.value.database, (f) => (s(), o("button", {
              key: f.id,
              type: "button",
              onClick: ($) => L.$emit("detail", f.id)
            }, [
              e("strong", null, l(f.name) + " →", 1),
              e("span", null, l(f.grams) + " 克可食部 · 热量 " + l(p(Me)(f.portion.energy)) + l(f.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + l(p(Me)(f.portion.protein)) + l(f.portion.protein != null ? " g" : ""), 1),
              e("small", null, l(f.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, $d))), 128))
          ]),
          x[22] || (x[22] = e("h3", null, "AI 解释", -1)),
          e("p", null, l(b.value.answer.summary), 1),
          e("p", null, l(b.value.answer.explanation), 1),
          e("p", _d, l(b.value.answer.limitations), 1),
          e("small", Ad, l(p(Je)(b.value.model)) + " · " + l(new Date(b.value.generatedAt).toLocaleString()), 1)
        ])) : I("", !0)
      ])) : I("", !0),
      c.value.length ? (s(), o("div", Cd, [
        e("span", null, "已选 " + l(c.value.length) + " 种食物", 1),
        (s(!0), o(V, null, J(c.value, (f) => (s(), o("button", {
          key: f,
          onClick: ($) => B(f)
        }, l(p(oe)[f].name) + " ×", 9, Sd))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: x[6] || (x[6] = (f) => {
            h.value = !0, C.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : I("", !0),
      v.value ? (s(), o("p", Id, l(v.value), 1)) : I("", !0),
      !d.value && !n.value ? (s(), o(V, { key: 3 }, [
        x[25] || (x[25] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物")
          ])
        ], -1)),
        e("div", xd, [
          (s(), o(V, null, J(R, (f) => j(yn, {
            key: f.key,
            food: f,
            compared: c.value.includes(f.key),
            onDetail: x[7] || (x[7] = ($) => L.$emit("detail", $)),
            onCompare: B
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", Ed, [
          e("div", null, [
            x[24] || (x[24] = e("h2", null, "按类别探索", -1)),
            e("p", null, l(p(y).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", jd, [
          (s(!0), o(V, null, J(p(rs).filter((f) => O(f.id) > 0), (f) => (s(), o("button", {
            key: f.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: ($) => he(f.id)
          }, [
            e("img", {
              src: f.image,
              alt: f.name + "分类示意图",
              loading: "lazy"
            }, null, 8, Dd),
            e("span", null, [
              e("small", null, l(O(f.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, l(f.name), 1),
              e("em", null, [
                N(l(f.description) + " ", 1),
                j(F, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, Ud))), 128))
        ]),
        x[26] || (x[26] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (s(), o(V, { key: 4 }, [
        e("div", Pd, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: K
          }, [
            j(F, {
              name: "back",
              size: 15
            }),
            x[27] || (x[27] = N("分类总览", -1))
          ]),
          e("h2", null, l(d.value ? p(ln)[d.value].name : "“" + n.value + "”的食物照片与营养资料"), 1),
          e("span", null, l(pe.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", Nd, [
          X.value.length <= 10 ? (s(), o("div", Md, [
            e("button", {
              class: be({ selected: !i.value }),
              onClick: x[8] || (x[8] = (f) => i.value = "")
            }, "全部", 2),
            (s(!0), o(V, null, J(X.value, (f) => (s(), o("button", {
              key: f,
              class: be({ selected: i.value === f }),
              onClick: ($) => i.value = f
            }, l(f), 11, Td))), 128))
          ])) : (s(), o("label", Rd, [
            x[29] || (x[29] = N("筛选", -1)),
            ee(e("select", {
              "onUpdate:modelValue": x[9] || (x[9] = (f) => i.value = f),
              "aria-label": "食物类型筛选"
            }, [
              x[28] || (x[28] = e("option", { value: "" }, "全部类型", -1)),
              (s(!0), o(V, null, J(X.value, (f) => (s(), o("option", {
                key: f,
                value: f
              }, l(f), 9, zd))), 128))
            ], 512), [
              [Se, i.value]
            ])
          ])),
          e("label", null, [
            x[31] || (x[31] = N("排序", -1)),
            ee(e("select", {
              "onUpdate:modelValue": x[10] || (x[10] = (f) => r.value = f),
              "aria-label": "食物营养指标排序"
            }, [...x[30] || (x[30] = [
              wn('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [Se, r.value]
            ])
          ])
        ]),
        e("div", Od, [
          (s(!0), o(V, null, J(ge.value, (f) => (s(), me(yn, {
            key: f.key,
            food: f,
            compared: c.value.includes(f.key),
            onDetail: x[11] || (x[11] = ($) => L.$emit("detail", $)),
            onCompare: B
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        pe.value.length ? I("", !0) : (s(), o("div", Fd, [
          j(F, {
            name: "search",
            size: 34
          }),
          x[32] || (x[32] = e("h2", null, "没有找到匹配的食物", -1)),
          x[33] || (x[33] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: K
          }, "返回食物总览")
        ])),
        ue.value > 1 ? (s(), o("nav", Bd, [
          e("button", {
            disabled: u.value === 1,
            onClick: x[12] || (x[12] = (f) => u.value--)
          }, "上一页", 8, Vd),
          e("span", null, "第 " + l(u.value) + " / " + l(ue.value) + " 页", 1),
          e("button", {
            disabled: u.value === ue.value,
            onClick: x[13] || (x[13] = (f) => u.value++)
          }, "下一页", 8, qd)
        ])) : I("", !0)
      ], 64)),
      n.value && z.value.length ? (s(), o("details", Ld, [
        e("summary", null, "其他营养数据样本 · " + l(z.value.length.toLocaleString()) + " 条", 1),
        x[34] || (x[34] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", Gd, [
          (s(!0), o(V, null, J(z.value.slice(0, 80), (f) => (s(), o("button", {
            key: f.key,
            type: "button",
            onClick: ($) => L.$emit("detail", f.key)
          }, [
            e("strong", null, l(f.name), 1),
            e("span", null, l(f.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, Jd))), 128))
        ]),
        z.value.length > 80 ? (s(), o("p", Wd, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : I("", !0)
      ])) : I("", !0),
      e("details", Hd, [
        x[35] || (x[35] = e("summary", null, "数据口径与图片署名", -1)),
        x[36] || (x[36] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        x[37] || (x[37] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        x[38] || (x[38] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        x[39] || (x[39] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (s(!0), o(V, null, J(p(ed), (f) => (s(), o("li", {
            key: f.key
          }, [
            N(l(p(ln)[f.key]?.name) + "：", 1),
            e("a", {
              href: f.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, l(f.title), 9, Kd),
            N(" · " + l(f.author) + " · ", 1),
            e("a", {
              href: f.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, l(f.license), 9, Yd),
            N(" · " + l(f.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function Qd(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function Zd() {
  const t = M(""), a = M((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), n = M("lunch"), d = M(null), i = M(""), r = M(!1), u = M([]);
  async function m(v, h, C = {}) {
    if (r.value) return;
    i.value = "", d.value = null, r.value = !0, u.value = [];
    const g = v ? {
      sex: v.sex,
      age: v.age,
      height: v.height,
      weight: v.weight,
      activity: v.activity,
      ageMonths: v.ageMonths,
      physiologicalStage: v.physiologicalStage
    } : null;
    try {
      d.value = await Ss({
        goal: t.value.slice(0, 500),
        date: a.value,
        meal: n.value,
        profile: g,
        conditions: C.conditions,
        recordContext: C.recordContext,
        ...h ? {
          personalization: {
            preferences: h.preferences?.slice(0, 200),
            safetyFlags: h.safetyFlags?.slice(0, 4)
          }
        } : {}
      }, (b) => u.value.push(b));
    } catch (b) {
      i.value = Qd(b);
    } finally {
      r.value = !1;
    }
  }
  function c() {
    d.value = null, i.value = "", u.value = [];
  }
  return { goal: t, date: a, meal: n, response: d, error: i, busy: r, progress: u, run: m, clear: c };
}
const ec = [
  ["花生", "peanut", "peanuts", "groundnut"],
  ["奶", "牛奶", "乳", "乳制品", "奶制品", "dairy", "milk", "cheese", "yogurt", "yoghurt", "cream", "butter"],
  ["蛋", "鸡蛋", "egg", "eggs"],
  ["海鲜", "seafood", "鱼虾蟹贝", "鱼", "虾", "蟹", "贝", "fish", "shrimp", "prawn", "crab", "clam", "oyster", "salmon", "tuna", "cod", "squid", "mussel"],
  ["肉类", "肉", "牛肉", "猪肉", "鸡肉", "羊肉", "禽", "beef", "pork", "chicken", "lamb", "turkey", "duck", "meat"],
  ["香菜", "coriander", "cilantro"],
  ["大豆", "豆制品", "soy", "tofu"],
  ["小麦", "wheat"],
  ["坚果", "nuts", "almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut"]
], zt = (t, a = 300) => typeof t == "string" ? t.trim().slice(0, a) : "";
function hn(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const a = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (a !== null && (!Number.isFinite(a) || a <= 0 || a > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const n = (Array.isArray(t.avoids) ? t.avoids.join("、") : zt(t.avoids)).split(/[,，、;；\n]+/).map((r) => r.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (n.length > 12 || n.some((r) => r.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const d = t.availableFoods ?? [];
  if (!Array.isArray(d) || d.length > 12) throw new Error("可选食物最多12项。");
  const i = d.map((r) => {
    const u = oe[r?.foodId], m = Number(r?.grams), c = r?.price === null || r?.price === void 0 || r?.price === "" ? null : Number(r.price);
    if (!u || !Number.isFinite(m) || m < 0.1 || m > 5e3 || c !== null && (!Number.isFinite(c) || c < 0 || c > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: u.key, name: u.name, grams: m, price: c };
  });
  if (new Set(i.map((r) => r.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: a, avoids: [...new Set(n)], preferences: zt(t.preferences, 200), exercise: zt(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function Bn(t, a = []) {
  const n = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), d = vt(n);
  return a.filter((i) => {
    const r = /* @__PURE__ */ new Set([i]);
    for (const u of ec) if (u.some((m) => vt(m) === vt(i))) for (const m of u) r.add(m);
    return [...r].some((u) => /^[a-z ]+$/i.test(u) ? new RegExp("\\b" + u.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(n) : d.includes(vt(u)));
  });
}
function tc(t, a) {
  return !!t && !["13", "17"].includes(t.category) && !Bn(t, a.avoids).length && (!a.onlyAvailable || a.availableFoods.some((n) => n.foodId === t.key));
}
function nc(t, a) {
  const n = t.map((r) => {
    const u = a.availableFoods.find((c) => c.foodId === r.foodId), m = u?.price != null ? Math.round(u.price * r.grams / u.grams * 100) / 100 : null;
    return { foodId: r.foodId, cost: m, priceBasis: u?.price != null ? { price: u.price, grams: u.grams } : null };
  }), d = n.every((r) => r.cost !== null), i = Math.round(n.reduce((r, u) => r + (u.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: a.budget, complete: d, knownSubtotal: i, total: d ? i : null, status: d ? a.budget === null ? "no_budget" : i > a.budget ? "over_budget" : "within_budget" : "unknown", breakdown: n, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: a.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const sc = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, oc = { class: "vb-agent-heading" }, ac = { class: "vb-icon-badge" }, lc = { class: "vb-campus-fields" }, ic = ["max", "disabled"], rc = ["disabled"], uc = ["value"], dc = ["disabled"], cc = ["disabled"], vc = { class: "vb-analysis-tabs" }, mc = ["disabled"], bc = ["disabled", "onClick"], pc = { class: "vb-more-conditions" }, fc = { class: "vb-agent-goal" }, gc = ["disabled"], yc = { class: "vb-campus-fields" }, hc = ["disabled"], kc = ["disabled"], wc = { class: "vb-campus-candidates" }, $c = { class: "vb-candidate-search" }, _c = ["disabled"], Ac = ["disabled"], Cc = ["value"], Sc = ["disabled"], Ic = { class: "vb-candidate-list" }, xc = ["onUpdate:modelValue", "disabled"], Ec = ["onUpdate:modelValue", "disabled"], jc = ["disabled", "onClick"], Uc = {
  key: 0,
  class: "vb-agent-context-optin"
}, Dc = ["disabled"], Pc = { class: "vb-agent-context-optin" }, Nc = ["disabled"], Mc = { class: "vb-agent-context-optin" }, Tc = ["disabled"], Rc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, zc = ["disabled"], Oc = {
  key: 0,
  class: "vb-loading-ring"
}, Fc = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, Bc = { key: 0 }, Vc = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, qc = ["disabled"], Lc = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, Gc = {
  key: 3,
  class: "vb-agent-plan"
}, Jc = { class: "vb-agent-plan-heading" }, Wc = { class: "vb-eyebrow" }, Hc = { class: "vb-data-note" }, Kc = { key: 0 }, Yc = { key: 1 }, Xc = { class: "vb-agent-items" }, Qc = { class: "vb-agent-item-title" }, Zc = ["onClick"], ev = ["onClick"], tv = {
  key: 0,
  class: "vb-candidate-search"
}, nv = ["value"], sv = ["disabled", "onClick"], ov = { key: 0 }, av = { class: "vb-agent-grams" }, lv = ["value", "onInput"], iv = { class: "vb-agent-evidence" }, rv = { class: "vb-agent-source" }, uv = ["href"], dv = { key: 1 }, cv = { key: 0 }, vv = {
  key: 1,
  class: "vb-agent-notes"
}, mv = {
  key: 2,
  class: "vb-agent-notes is-caution"
}, bv = { class: "vb-agent-trace" }, pv = { class: "vb-agent-confirm" }, fv = ["disabled"], gv = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: a }) {
    const n = t, d = a, { goal: i, date: r, meal: u, response: m, error: c, busy: v, progress: h, run: C, clear: g } = Zd();
    i.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const b = Ze({ budget: "", avoids: "", preferences: n.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), S = M(-1), y = M(""), w = M(!1), _ = M(!0), z = M(!1), T = M(""), D = M(""), O = M(""), Q = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], R = W(() => D.value.trim() ? Jt(D.value, 8) : []), q = W(() => et((n.records || []).find((f) => f.date === r.value))), X = W(() => m.value?.status === "ready" ? m.value : null), pe = W(() => (X.value?.plan.items || []).map((f, $) => ({ id: "agent-" + $, foodId: f.foodId, name: f.name, grams: f.grams, meal: f.meal, group: oe[f.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), ue = W(() => X.value ? nc(X.value.plan.items, X.value.conditions) : null), ge = W(() => !X.value || !X.value.plan.items.length || ue.value?.status === "over_budget" || X.value.plan.items.some((f) => !Number.isFinite(f.grams) || f.grams < 0.1 || f.grams > 5e3));
    de([i, r, u, b, _, z, () => n.profile, () => n.records], () => {
      !v.value && m.value && g(), w.value = !1;
    }, { deep: !0 }), de(() => n.preferences, (f) => b.preferences = f || "");
    function le() {
      const f = oe[O.value];
      if (T.value = "", !!f) {
        if (b.availableFoods.some(($) => $.foodId === f.key)) {
          T.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (b.availableFoods.length >= 12) {
          T.value = "最多加入12项备选食物。";
          return;
        }
        b.availableFoods.push({ foodId: f.key, name: f.name, grams: 100, price: "" }), O.value = "", D.value = "";
      }
    }
    async function he() {
      T.value = "", w.value = !1;
      let f;
      try {
        await Le(b.availableFoods.map((U) => U.foodId)), f = hn(b);
        const $ = f.availableFoods.find((U) => Bn(oe[U.foodId], f.avoids).length);
        if ($) throw Error("备选食物“" + $.name + "”命中回避项，请先移除或修改条件。");
      } catch ($) {
        T.value = $.message;
        return;
      }
      await C(n.profile, z.value ? { safetyFlags: (n.flags || []).filter(($) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes($)) } : void 0, { conditions: f, ..._.value ? { recordContext: { date: r.value, entries: q.value.map(($) => ({ foodId: $.foodId, name: $.name, grams: $.grams, meal: $.meal, referenceConfirmed: $.referenceConfirmed })) } } : {} });
    }
    function K() {
      ge.value || w.value || (w.value = !0, d("confirm", { confirmationId: X.value.confirmationId, date: X.value.date, meal: X.value.meal, items: X.value.plan.items, onResult: (f) => {
        w.value = f.ok, f.ok || (T.value = f.error || "加入草稿失败，请重试。");
      } }));
    }
    function B(f, $) {
      X.value && (X.value.plan.items[f].grams = Number($), X.value.plan.items[f].portion = rn(oe[X.value.plan.items[f].foodId], Number($)), w.value = !1);
    }
    const P = W(() => {
      let f;
      try {
        f = hn(b);
      } catch {
        return [];
      }
      return (f.availableFoods.length && f.onlyAvailable ? f.availableFoods.map((U) => oe[U.foodId]) : We).filter((U) => U && !U.__summary && U.source && tc(U, f) && !X.value?.plan.items.some((se) => se.foodId === U.key)).slice(0, 60);
    });
    function L(f) {
      const $ = oe[y.value];
      if (!$ || !P.value.some((se) => se.key === $.key)) return;
      const U = X.value.plan.items[f];
      X.value.plan.items[f] = { ...U, foodId: $.key, name: $.name, portion: rn($, U.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: $.source?.name || "", source: $.source?.id || "", missing: [] }, w.value = !1, S.value = -1, y.value = "";
    }
    const x = (f) => typeof f == "number" && Number.isFinite(f) ? f.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (f, $) => (s(), o("section", sc, [
      e("header", oc, [
        e("span", ac, [
          j(F, {
            name: "sparkles",
            size: 21
          })
        ]),
        $[15] || ($[15] = e("div", null, [
          e("h2", { id: "meal-agent-title" }, "安排我的下一餐"),
          e("p", null, "说清预算和回避项，结合你的备选食物检索与计算。方案先核对，实际吃过后再记录。")
        ], -1))
      ]),
      e("form", {
        class: "vb-agent-form",
        onSubmit: Te(he, ["prevent"])
      }, [
        e("div", lc, [
          e("label", null, [
            $[16] || ($[16] = N("日期", -1)),
            ee(e("input", {
              "onUpdate:modelValue": $[0] || ($[0] = (U) => Et(r) ? r.value = U : null),
              type: "date",
              max: p(we)(),
              disabled: p(v)
            }, null, 8, ic), [
              [re, p(r)]
            ])
          ]),
          e("label", null, [
            $[17] || ($[17] = N("餐次", -1)),
            ee(e("select", {
              "onUpdate:modelValue": $[1] || ($[1] = (U) => Et(u) ? u.value = U : null),
              disabled: p(v)
            }, [
              (s(), o(V, null, J(Q, ([U, se]) => e("option", {
                key: U,
                value: U
              }, l(se), 9, uc)), 64))
            ], 8, rc), [
              [Se, p(u)]
            ])
          ]),
          e("label", null, [
            $[18] || ($[18] = N("预算（元，可选）", -1)),
            ee(e("input", {
              "onUpdate:modelValue": $[2] || ($[2] = (U) => b.budget = U),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: p(v)
            }, null, 8, dc), [
              [re, b.budget]
            ])
          ]),
          e("label", null, [
            $[19] || ($[19] = N("不吃的食物", -1)),
            ee(e("input", {
              "onUpdate:modelValue": $[3] || ($[3] = (U) => b.avoids = U),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: p(v)
            }, null, 8, cc), [
              [re, b.avoids]
            ])
          ])
        ]),
        e("div", vc, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: p(v),
            onClick: $[4] || ($[4] = (U) => b.budget = "15")
          }, "预算15元", 8, mc),
          (s(), o(V, null, J(["清淡", "素食偏好"], (U) => e("button", {
            key: U,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: p(v),
            onClick: (se) => b.preferences = U
          }, l(U), 9, bc)), 64)),
          e("span", null, "已选偏好：" + l(b.preferences || "未设置"), 1)
        ]),
        e("details", pc, [
          $[29] || ($[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", fc, [
            $[20] || ($[20] = e("span", null, "这餐想怎么安排？", -1)),
            ee(e("textarea", {
              "onUpdate:modelValue": $[5] || ($[5] = (U) => Et(i) ? i.value = U : null),
              rows: "2",
              maxlength: "500",
              disabled: p(v),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, gc), [
              [re, p(i)]
            ])
          ]),
          e("div", yc, [
            e("label", null, [
              $[21] || ($[21] = N("口味与饮食偏好", -1)),
              ee(e("input", {
                "onUpdate:modelValue": $[6] || ($[6] = (U) => b.preferences = U),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: p(v)
              }, null, 8, hc), [
                [re, b.preferences]
              ])
            ]),
            e("label", null, [
              $[22] || ($[22] = N("运动情况（可选）", -1)),
              ee(e("input", {
                "onUpdate:modelValue": $[7] || ($[7] = (U) => b.exercise = U),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: p(v)
              }, null, 8, kc), [
                [re, b.exercise]
              ])
            ])
          ]),
          e("details", wc, [
            $[27] || ($[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            $[28] || ($[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", $c, [
              ee(e("input", {
                "onUpdate:modelValue": $[8] || ($[8] = (U) => D.value = U),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: p(v),
                onInput: $[9] || ($[9] = (U) => O.value = "")
              }, null, 40, _c), [
                [re, D.value]
              ]),
              ee(e("select", {
                "onUpdate:modelValue": $[10] || ($[10] = (U) => O.value = U),
                "aria-label": "选择具体食物",
                disabled: p(v) || !R.value.length
              }, [
                $[23] || ($[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (s(!0), o(V, null, J(R.value, (U) => (s(), o("option", {
                  key: U.key,
                  value: U.key
                }, l(U.name), 9, Cc))), 128))
              ], 8, Ac), [
                [Se, O.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: p(v) || !O.value,
                onClick: le
              }, "加入备选", 8, Sc)
            ]),
            e("div", Ic, [
              (s(!0), o(V, null, J(b.availableFoods, (U, se) => (s(), o("article", {
                key: U.foodId
              }, [
                e("strong", null, l(U.name), 1),
                e("label", null, [
                  $[24] || ($[24] = N("这份可食部（克）", -1)),
                  ee(e("input", {
                    "onUpdate:modelValue": (ie) => U.grams = ie,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: p(v)
                  }, null, 8, xc), [
                    [
                      re,
                      U.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  $[25] || ($[25] = N("这份已知价格（元）", -1)),
                  ee(e("input", {
                    "onUpdate:modelValue": (ie) => U.price = ie,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: p(v)
                  }, null, 8, Ec), [
                    [re, U.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: p(v),
                  onClick: (ie) => b.availableFoods.splice(se, 1)
                }, "移除", 8, jc)
              ]))), 128))
            ]),
            b.availableFoods.length ? (s(), o("label", Uc, [
              ee(e("input", {
                "onUpdate:modelValue": $[11] || ($[11] = (U) => b.onlyAvailable = U),
                type: "checkbox",
                disabled: p(v)
              }, null, 8, Dc), [
                [Xe, b.onlyAvailable]
              ]),
              $[26] || ($[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : I("", !0)
          ])
        ]),
        e("label", Pc, [
          ee(e("input", {
            "onUpdate:modelValue": $[12] || ($[12] = (U) => _.value = U),
            type: "checkbox",
            disabled: p(v)
          }, null, 8, Nc), [
            [Xe, _.value]
          ]),
          e("span", null, [
            N("使用所选日期的 " + l(q.value.length) + " 项已记录食物", 1),
            $[30] || ($[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", Mc, [
          ee(e("input", {
            "onUpdate:modelValue": $[13] || ($[13] = (U) => z.value = U),
            type: "checkbox",
            disabled: p(v)
          }, null, 8, Tc), [
            [Xe, z.value]
          ]),
          $[31] || ($[31] = e("span", null, [
            N("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        $[32] || ($[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给维衡 AI。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        T.value ? (s(), o("p", Rc, l(T.value), 1)) : I("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: p(v) || !p(i).trim()
        }, [
          p(v) ? (s(), o("span", Oc)) : (s(), me(F, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          N(l(p(v) ? "正在等待真实检索与计算…" : X.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, zc)
      ], 32),
      p(v) || p(h).length ? (s(), o("div", Fc, [
        e("div", null, [
          e("strong", null, l(p(v) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          p(v) ? (s(), o("p", Bc, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : I("", !0),
          e("ol", null, [
            (s(!0), o(V, null, J(p(h), (U, se) => (s(), o("li", { key: se }, [
              e("strong", null, l(U.label), 1),
              N(" · " + l(U.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : I("", !0),
      p(c) ? (s(), o("div", Vc, [
        $[33] || ($[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, l(p(c)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: p(v),
          onClick: he
        }, "保留条件并重试", 8, qc)
      ])) : I("", !0),
      p(m)?.status === "needs_evidence" ? (s(), o("p", Lc, l(p(m).message) + " 请修改备选食物或检索描述。", 1)) : I("", !0),
      X.value ? (s(), o("section", Gc, [
        e("div", Jc, [
          e("div", null, [
            e("p", Wc, "待确认 · " + l(X.value.date) + " · " + l(Q.find((U) => U[0] === X.value.meal)?.[1]), 1),
            e("h3", null, l(X.value.plan.title), 1)
          ]),
          $[34] || ($[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        e("p", null, l(X.value.plan.summary), 1),
        e("p", Hc, "本次使用 " + l(X.value.contextSummary.itemCount) + " 项已记录食物；" + l(X.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        ue.value ? (s(), o("div", {
          key: 0,
          class: be(["vb-campus-cost", { "is-caution": ue.value.status === "over_budget" }])
        }, [
          e("h4", null, l(ue.value.complete ? "按录入价格估算：约 ¥" + x(ue.value.total) : "价格待确认"), 1),
          ue.value.budget !== null ? (s(), o("p", Kc, "本餐预算 ¥" + l(ue.value.budget) + " · " + l(ue.value.status === "within_budget" ? "按已录入价格估算在预算内" : ue.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : I("", !0),
          ue.value.complete ? I("", !0) : (s(), o("p", Yc, "已知价格小计约 ¥" + l(x(ue.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, l(ue.value.basis) + "。" + l(ue.value.availability) + "。", 1)
        ], 2)) : I("", !0),
        e("div", Xc, [
          (s(!0), o(V, null, J(X.value.plan.items, (U, se) => (s(), o("article", {
            key: U.foodId,
            class: "vb-agent-item"
          }, [
            e("div", Qc, [
              e("div", null, [
                j(Qt, {
                  food: p(oe)[U.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, l(p(St)(p(oe)[U.foodId])), 1),
                e("small", null, l(p(Xt)(p(oe)[U.foodId])), 1),
                e("p", null, l(U.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (ie) => {
                  X.value.plan.items.splice(se, 1), w.value = !1;
                }
              }, "移除", 8, Zc)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (ie) => {
                S.value = se, y.value = "";
              }
            }, "换一道", 8, ev),
            S.value === se ? (s(), o("div", tv, [
              ee(e("select", {
                "onUpdate:modelValue": $[14] || ($[14] = (ie) => y.value = ie),
                "aria-label": "替换食物"
              }, [
                $[35] || ($[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (s(!0), o(V, null, J(P.value, (ie) => (s(), o("option", {
                  key: ie.key,
                  value: ie.key
                }, l(ie.name), 9, nv))), 128))
              ], 512), [
                [Se, y.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !y.value,
                onClick: (ie) => L(se)
              }, "确认替换", 8, sv),
              P.value.length ? I("", !0) : (s(), o("p", ov, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : I("", !0),
            e("label", av, [
              $[36] || ($[36] = N("可食部估算克数", -1)),
              e("input", {
                value: U.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (ie) => B(se, ie.target.value)
              }, null, 40, lv),
              $[37] || ($[37] = N("克", -1))
            ]),
            e("div", iv, [
              (s(), o(V, null, J([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (ie) => e("small", {
                key: ie.id
              }, l(ie.name) + " " + l(x(U.portion[ie.id])) + l(U.portion[ie.id] !== null ? " " + ie.unit : ""), 1)), 64))
            ]),
            e("details", rv, [
              $[39] || ($[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + l(p(oe)[U.foodId]?.state), 1),
              e("p", null, [
                $[38] || ($[38] = N("来源：", -1)),
                p(oe)[U.foodId]?.source ? (s(), o("a", {
                  key: 0,
                  href: p(oe)[U.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, l(U.sourceName) + " · " + l(U.source), 9, uv)) : (s(), o("span", dv, "暂无可核验成分数据"))
              ]),
              e("p", null, l(p(oe)[U.foodId]?.source?.description), 1),
              $[40] || ($[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              U.missing.length ? (s(), o("p", cv, "缺失指标：" + l(U.missing.join("、")), 1)) : I("", !0)
            ])
          ]))), 128))
        ]),
        j(Gt, {
          entries: pe.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        $[45] || ($[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        X.value.plan.suggestions.length ? (s(), o("div", vv, [
          $[41] || ($[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (s(!0), o(V, null, J(X.value.plan.suggestions, (U) => (s(), o("li", { key: U }, l(U), 1))), 128))
          ])
        ])) : I("", !0),
        X.value.plan.cautions.length ? (s(), o("div", mv, [
          $[42] || ($[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (s(!0), o(V, null, J(X.value.plan.cautions, (U) => (s(), o("li", { key: U }, l(U), 1))), 128))
          ])
        ])) : I("", !0),
        e("details", bv, [
          $[43] || ($[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (s(!0), o(V, null, J(X.value.trace, (U, se) => (s(), o("li", { key: se }, [
              e("strong", null, l(U.label), 1),
              N(" · " + l(U.inputSummary) + " · " + l(U.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, l(p(Je)(X.value.model)) + " · " + l(X.value.dataVersion) + " · " + l(new Date(X.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        j(xn),
        e("div", pv, [
          $[44] || ($[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: w.value || ge.value,
            onClick: K
          }, l(w.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, fv)
        ])
      ])) : I("", !0)
    ]));
  }
}, yv = { class: "vb-page-title" }, hv = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, kv = { class: "vb-glass vb-record-prompt" }, wv = /* @__PURE__ */ He({
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
    return (a, n) => (s(), o(V, null, [
      e("div", yv, [
        n[4] || (n[4] = e("div", null, [
          e("h1", null, "膳食方案"),
          e("p", null, "结合身体档案、饮食记录与就餐条件，安排更适合自己的下一餐。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-soft",
          onClick: n[0] || (n[0] = (d) => a.$emit("navigate", "profile"))
        }, "调整档案与饮食偏好")
      ]),
      t.nutrition ? I("", !0) : (s(), o("section", hv, [...n[5] || (n[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      j(gv, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: n[1] || (n[1] = (d) => a.$emit("add-plan", d))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", kv, [
        n[6] || (n[6] = e("div", null, [
          e("h3", null, "从下一餐，回到真实记录"),
          e("p", null, "方案不代表已经吃过；食物、配料、价格与实际份量需要你核对。")
        ], -1)),
        e("button", {
          class: "vb-text-button",
          onClick: n[2] || (n[2] = (d) => a.$emit("navigate", "diary"))
        }, "去记录实际饮食 →"),
        e("button", {
          class: "vb-text-button",
          onClick: n[3] || (n[3] = (d) => a.$emit("navigate", "about"))
        }, "查看参考资料 →")
      ])
    ], 64));
  }
}), $v = { class: "vb-page-title" }, _v = { class: "vb-glass vb-profile-details" }, Av = { class: "vb-section-heading" }, Cv = { class: "vb-pill" }, Sv = { key: 0 }, Iv = { key: 1 }, xv = { class: "vb-profile-settings" }, Ev = { class: "vb-glass" }, jv = { class: "vb-section-heading" }, Uv = { class: "vb-field" }, Dv = ["value"], Pv = { class: "vb-glass" }, Nv = { class: "vb-section-heading" }, Mv = ["checked", "onChange"], Tv = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String },
  emits: ["edit", "update:flags", "update:preferences"],
  setup(t, { emit: a }) {
    const n = t, d = W(() => Wt.find((m) => m.key === n.profile.activity)), i = a, r = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function u(m, c, v) {
      i("update:flags", c ? [...v, m] : v.filter((h) => h !== m));
    }
    return (m, c) => (s(), o(V, null, [
      e("div", $v, [
        c[3] || (c[3] = e("div", null, [
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: c[0] || (c[0] = (v) => m.$emit("edit"))
        }, [
          j(F, {
            name: "edit",
            size: 17
          }),
          c[2] || (c[2] = N("修改基础档案", -1))
        ])
      ]),
      e("section", _v, [
        e("div", Av, [
          c[4] || (c[4] = e("h2", null, "基础信息", -1)),
          e("span", Cv, l(p(Ce) ? p(pt) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
        ]),
        e("dl", null, [
          e("div", null, [
            c[5] || (c[5] = e("dt", null, "生理性别", -1)),
            e("dd", null, l(t.profile.sex === "male" ? "男性" : t.profile.sex === "female" ? "女性" : "未填写"), 1)
          ]),
          e("div", null, [
            c[6] || (c[6] = e("dt", null, "年龄", -1)),
            e("dd", null, l(t.profile.age == null || t.profile.age === "" ? "未填写" : `${t.profile.age} 岁`), 1)
          ]),
          t.profile.age === 0 ? (s(), o("div", Sv, [
            c[7] || (c[7] = e("dt", null, "月龄", -1)),
            e("dd", null, l(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : I("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (s(), o("div", Iv, [
            c[8] || (c[8] = e("dt", null, "生理阶段", -1)),
            e("dd", null, l({ pregnant: "孕期", lactating: "哺乳期", special: "需专业评估" }[t.profile.physiologicalStage]), 1)
          ])) : I("", !0),
          e("div", null, [
            c[9] || (c[9] = e("dt", null, "身高", -1)),
            e("dd", null, l(t.profile.height == null || t.profile.height === "" ? "未填写" : `${t.profile.height} cm`), 1)
          ]),
          e("div", null, [
            c[10] || (c[10] = e("dt", null, "体重", -1)),
            e("dd", null, l(t.profile.weight == null || t.profile.weight === "" ? "未填写" : `${t.profile.weight} kg`), 1)
          ]),
          e("div", null, [
            c[11] || (c[11] = e("dt", null, "每日活动", -1)),
            e("dd", null, l(d.value?.label || "未填写"), 1)
          ]),
          e("div", null, [
            c[12] || (c[12] = e("dt", null, "活动系数", -1)),
            e("dd", null, l(d.value ? "× " + d.value.factor : "未填写"), 1)
          ])
        ])
      ]),
      e("div", xv, [
        e("section", Ev, [
          e("div", jv, [
            c[13] || (c[13] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            j(F, { name: "bowl" })
          ]),
          e("label", Uv, [
            c[14] || (c[14] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: c[1] || (c[1] = (v) => m.$emit("update:preferences", v.target.value))
            }, null, 40, Dv)
          ]),
          c[15] || (c[15] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", Pv, [
          e("div", Nv, [
            c[16] || (c[16] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            j(F, { name: "shield" })
          ]),
          (s(), o(V, null, J(r, (v) => e("label", {
            key: v,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(v),
              onChange: (h) => u(v, h.target.checked, t.flags)
            }, null, 40, Mv),
            e("span", null, l(v), 1)
          ])), 64)),
          c[17] || (c[17] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1))
        ])
      ])
    ], 64));
  }
}, Rv = {
  key: 0,
  class: "vb-page-title"
}, zv = { class: "vb-local-chip" }, Ov = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, Fv = { class: "vb-safety-grid" }, Bv = { class: "vb-icon-badge" }, Vv = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const a = Ce.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", n = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + a + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (d, i) => (s(), o(V, null, [
      t.embedded ? I("", !0) : (s(), o("div", Rv, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", zv, [
          j(F, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = N("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (s(), o("section", Ov, [
        j(F, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + l(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : I("", !0),
      e("div", Fv, [
        (s(), o(V, null, J(n, ([r, u, m]) => e("article", {
          key: u,
          class: "vb-glass"
        }, [
          e("span", Bv, [
            j(F, {
              name: r,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, l(u), 1),
          e("p", null, l(m), 1)
        ])), 64))
      ]),
      j(xn)
    ], 64));
  }
}, qv = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, Lv = { class: "vb-glass vb-submission-hero" }, Gv = { class: "vb-submission-hero-copy" }, Jv = { class: "vb-icon-badge" }, Wv = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, Hv = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, Kv = { class: "vb-submission-step-top" }, Yv = { class: "vb-icon-badge" }, Xv = ["onClick"], Qv = { class: "vb-submission-columns" }, Zv = { class: "vb-glass vb-submission-panel" }, em = { class: "vb-submission-boundary" }, tm = { class: "vb-icon-badge" }, nm = { class: "vb-icon-badge" }, sm = { class: "vb-icon-badge" }, om = { class: "vb-glass vb-submission-panel" }, am = { class: "vb-inline-note" }, lm = { class: "vb-glass vb-submission-evidence" }, im = { class: "vb-submission-evidence-actions" }, rm = /* @__PURE__ */ He({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const a = {
      foodCount: We.length,
      sourcedCount: We.filter((d) => !!d.source?.id).length,
      categories: new Set(We.map((d) => d.category).filter(Boolean)).size
    }, n = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (d, i) => (s(), o(V, null, [
      t.embedded ? I("", !0) : (s(), o("div", qv, [
        i[4] || (i[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "在线评审入口 · 维衡 AI"),
          e("h1", null, "把营养建议放回真实的一餐"),
          e("p", null, "从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: i[0] || (i[0] = (r) => d.$emit("navigate", "mealplan"))
        }, [
          j(F, {
            name: "sparkles",
            size: 17
          }),
          i[3] || (i[3] = N("体验餐食规划 ", -1))
        ])
      ])),
      e("section", Lv, [
        e("div", Gv, [
          e("span", Jv, [
            j(F, {
              name: "leaf",
              size: 22
            })
          ]),
          i[5] || (i[5] = e("div", null, [
            e("h2", null, "让营养计算有依据，让饮食安排更贴近日常。"),
            e("p", null, "面向全年龄段，以饮食记录和营养摄入计算为核心。记录食物与份量，查看能量、维生素和矿物质的已知合计与参考依据，再结合预算、忌口和偏好安排下一餐。不同年龄按适用条件分析，缺失值不补0。")
          ], -1))
        ]),
        e("div", Wv, [
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
        ])
      ]),
      i[18] || (i[18] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("h2", null, "从检索到回顾")
        ])
      ], -1)),
      e("section", Hv, [
        (s(), o(V, null, J(n, (r) => e("article", {
          key: r.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", Kv, [
            e("span", null, l(r.number), 1),
            e("span", Yv, [
              j(F, {
                name: r.icon
              }, null, 8, ["name"])
            ])
          ]),
          e("h3", null, l(r.title), 1),
          e("p", null, l(r.copy), 1),
          e("button", {
            class: "vb-text-button",
            onClick: (u) => d.$emit("navigate", r.page)
          }, [
            N(l(r.action), 1),
            j(F, {
              name: "arrow",
              size: 15
            })
          ], 8, Xv)
        ])), 64))
      ]),
      e("div", Qv, [
        e("section", Zv, [
          i[12] || (i[12] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", em, [
            e("article", null, [
              e("span", tm, [
                j(F, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", nm, [
                j(F, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", sm, [
                j(F, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", om, [
          i[14] || (i[14] = wn('<h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>维衡 AI</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 2)),
          e("p", am, [
            j(F, {
              name: "info",
              size: 16
            }),
            i[13] || (i[13] = N("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", lm, [
        i[17] || (i[17] = e("div", null, [
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口模拟检查与真实模型调用分开记录，未执行真实调用时不会记作通过。")
        ], -1)),
        e("div", im, [
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[1] || (i[1] = (r) => d.$emit("navigate", "food"))
          }, [
            j(F, {
              name: "apple",
              size: 16
            }),
            i[15] || (i[15] = N("核对食物来源", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[2] || (i[2] = (r) => d.$emit("navigate", "assessment"))
          }, [
            j(F, {
              name: "report",
              size: 16
            }),
            i[16] || (i[16] = N("查看报告样例", -1))
          ])
        ])
      ])
    ], 64));
  }
}), um = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], dm = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], cm = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], vm = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, mm = { class: "vb-reference-list" }, bm = ["href"], pm = {
  key: 1,
  class: "vb-data-note"
}, fm = { class: "vb-reference-terms" }, gm = {
  __name: "ReferencePanel",
  setup(t) {
    return (a, n) => (s(), o("section", vm, [
      n[8] || (n[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      n[9] || (n[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      n[10] || (n[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", mm, [
        (s(!0), o(V, null, J(p(um), (d) => (s(), o("details", {
          key: d.id
        }, [
          e("summary", null, [
            e("strong", null, l(d.title), 1),
            e("span", null, l(d.status), 1)
          ]),
          e("dl", null, [
            e("div", null, [
              n[0] || (n[0] = e("dt", null, "用途与版本", -1)),
              e("dd", null, l(d.kind) + " · " + l(d.version) + " · " + l(d.volume), 1)
            ]),
            e("div", null, [
              n[1] || (n[1] = e("dt", null, "条目定位", -1)),
              e("dd", null, l(d.locator), 1)
            ]),
            e("div", null, [
              n[2] || (n[2] = e("dt", null, "适用范围", -1)),
              e("dd", null, l(d.scope), 1)
            ]),
            e("div", null, [
              n[3] || (n[3] = e("dt", null, "原始单位", -1)),
              e("dd", null, l(d.units), 1)
            ])
          ]),
          d.url ? (s(), o("a", {
            key: 0,
            href: d.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "核对公开来源 ↗", 8, bm)) : (s(), o("p", pm, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", fm, [
        n[4] || (n[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (s(!0), o(V, null, J(p(cm), ([d, i, r]) => (s(), o("p", { key: d }, [
          e("strong", null, l(d) + " · " + l(i), 1),
          N("：" + l(r), 1)
        ]))), 128)),
        n[5] || (n[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        n[6] || (n[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (s(!0), o(V, null, J(p(dm), (d) => (s(), o("li", { key: d }, l(d), 1))), 128))
        ]),
        n[7] || (n[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, ym = { class: "vb-page-title" }, hm = { class: "vb-local-chip" }, km = { "aria-labelledby": "about-project-heading" }, wm = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, $m = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, _m = {
  key: 0,
  role: "alert"
}, Am = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Cm = { class: "vb-reset-actions" }, Sm = ["disabled"], Im = ["disabled"], xm = /* @__PURE__ */ He({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const a = M(!1), n = M(!1), d = M("");
    function i() {
      try {
        const u = JSON.parse($e.getItem("weiheng.local.v2") || "{}"), m = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: u.profile || null, records: (Array.isArray(u.records) ? u.records : []).map((h) => ({ date: h.date, entries: h.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, c = URL.createObjectURL(new Blob([JSON.stringify(m, null, 2)], { type: "application/json" })), v = document.createElement("a");
        v.href = c, v.download = "维衡-当前档案与食物记录.json", v.click(), setTimeout(() => URL.revokeObjectURL(c), 1e3);
      } catch {
        d.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function r() {
      if (!n.value) {
        n.value = !0, d.value = "";
        try {
          await ks(), window.location.reload();
        } catch {
          d.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", n.value = !1;
        }
      }
    }
    return (u, m) => (s(), o(V, null, [
      e("div", ym, [
        m[5] || (m[5] = e("div", null, [
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", hm, [
          m[4] || (m[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          N(l(p(Ce) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", km, [
        m[6] || (m[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ])
        ], -1)),
        j(rm, {
          embedded: "",
          onNavigate: m[0] || (m[0] = (c) => u.$emit("navigate", c))
        })
      ]),
      j(gm),
      e("section", wm, [
        m[7] || (m[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ])
        ], -1)),
        j(Vv, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", $m, [
        e("div", null, [
          m[8] || (m[8] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, l(p(Ce) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          m[9] || (m[9] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          d.value ? (s(), o("p", _m, l(d.value), 1)) : I("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: m[1] || (m[1] = (c) => a.value = !0)
        }, "清空数据并重置")
      ]),
      a.value ? (s(), me(ot, {
        key: 0,
        title: p(Ce) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: m[3] || (m[3] = (c) => !n.value && (a.value = !1))
      }, {
        default: st(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + l(p(Ce) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          m[10] || (m[10] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          d.value ? (s(), o("p", Am, l(d.value), 1)) : I("", !0),
          e("div", Cm, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: n.value,
              onClick: m[2] || (m[2] = (c) => a.value = !1)
            }, "取消", 8, Sm),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: n.value,
              onClick: r
            }, l(n.value ? "正在清理…" : "确认清空并重置"), 9, Im)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : I("", !0)
    ], 64));
  }
}), Em = ["data-theme"], jm = ["inert"], Um = { class: "vb-main" }, Dm = { class: "vb-topbar" }, Pm = { class: "vb-breadcrumb" }, Nm = { class: "vb-topbar-actions" }, Mm = { class: "vb-local-chip" }, Tm = ["aria-label"], Rm = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, zm = { class: "vb-footer" }, Om = {
  key: 4,
  class: "vb-toast",
  role: "status"
}, Lm = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: a, theme: n, nutrition: d, records: i, storageError: r, updateProfile: u, saveRecord: m, clearDraftAfterSave: c, addToDraft: v, addPlanToDraft: h, toggleHabit: C } = Ht(), { toggleTheme: g } = ps(n), { reports: b, reportStorageError: S, loadReports: y, latestReport: w, isStale: _, generateReport: z } = Yt();
    y();
    const T = t, D = W(() => a.flags.includes("孕期或哺乳期") ? { ...a.profile, physiologicalStage: "special" } : a.profile || {}), O = M(T.initialPage), Q = M(T.initialEditor), R = M(!1), q = M(null), X = M(null), pe = M(null), ue = M(we()), ge = M(!1), le = M(""), he = M(""), K = M(""), B = W(() => b.value.find((Z) => Z.id === he.value) || w(le.value)), P = W(() => a.records.find((Z) => Z.date === le.value)), L = { overview: "概览", dietAssistant: "维衡AI助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, x = W(() => Ce.value ? pt.value === "error" ? "账号同步暂不可用 · 本机副本保留" : pt.value === "syncing" || pt.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let f, $ = 0;
    function U(Z, G = null) {
      clearTimeout(f), q.value = { message: Z, undo: G }, f = setTimeout(() => q.value = null, 7e3);
    }
    function se(Z) {
      O.value = Z, window.scrollTo({ top: 0, behavior: "auto" }), Ue(() => X.value?.focus({ preventScroll: !0 }));
    }
    function ie() {
      Q.value = !1, R.value = !0;
    }
    function It() {
      R.value = !1;
    }
    function xt(Z) {
      const G = u(Z);
      if (G) {
        U(G);
        return;
      }
      Q.value = !1, se("overview"), U(Ce.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function at(Z, G = !1) {
      const ne = ++$;
      K.value = "", le.value = Z.date, he.value = "";
      try {
        const fe = z(Z, D.value, { force: G });
        await Ue();
        const Ie = await fe;
        ne === $ && le.value === Z.date && (he.value = Ie?.id || "");
      } catch (fe) {
        ne === $ && (K.value = fe.message || "分析暂时不可用，请重试。");
      }
    }
    function lt(Z) {
      if (!ge.value) {
        ge.value = !0;
        try {
          const G = m(Z);
          if (!G.ok) {
            U(G.error);
            return;
          }
          c(G.record.date, G.record), U("饮食记录已保存，正在分析"), at(G.record);
        } finally {
          ge.value = !1;
        }
      }
    }
    function it(Z, G) {
      G ? b.value.find((fe) => fe.id === G) : w(Z), le.value = Z, he.value = G || "", K.value = "", a.records.find((fe) => fe.date === Z);
    }
    function Ke(Z = le.value) {
      const G = a.records.find((ne) => ne.date === Z);
      G && at(G, !0);
    }
    function rt(Z) {
      if (!Be(Z.date) || Z.date > we() || Number(Z.grams) < 0.1 || Number(Z.grams) > 5e3) {
        U("请核对日期与食用克数。");
        return;
      }
      const G = v(Z);
      ue.value = Z.date, pe.value = null, se("diary"), U(G ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    async function ut(Z) {
      const G = Ae();
      try {
        if (await Le(Z.items.map((fe) => fe.foodId)), G !== Ae()) return;
      } catch (fe) {
        Z.onResult?.({ ok: !1, error: fe.message }), U(fe.message);
        return;
      }
      const ne = h(Z);
      if (Z.onResult?.(ne), !ne.ok) {
        U(ne.error);
        return;
      }
      ue.value = Z.date, se("diary"), U(ne.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function ze(Z) {
      const G = a.records.find((ne) => ne.date === Z);
      G && (a.records = a.records.filter((ne) => ne.date !== Z), U("这条饮食记录已删除，报告快照仍保留。", () => {
        m(G), q.value = null;
      }));
    }
    return qe(() => clearTimeout(f)), (Z, G) => (s(), o("div", {
      class: be(["vb-app", { "is-diary": O.value === "diary", "is-chat": O.value === "dietAssistant" }]),
      "data-theme": p(n)
    }, [
      e("div", {
        inert: Q.value || pe.value || le.value || void 0
      }, [
        j(fs, {
          active: O.value,
          onNavigate: se
        }, null, 8, ["active"]),
        e("div", Um, [
          e("header", Dm, [
            e("span", Pm, [
              G[15] || (G[15] = e("span", null, "营养工作台", -1)),
              G[16] || (G[16] = e("i", null, "/", -1)),
              N(l(L[O.value]), 1)
            ]),
            e("div", Nm, [
              e("span", Mm, [
                G[17] || (G[17] = e("i", { class: "vb-status-dot" }, null, -1)),
                N(l(x.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                onClick: ie
              }, l(p(Ce) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": p(n) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: G[0] || (G[0] = (...ne) => p(g) && p(g)(...ne))
              }, [
                j(F, {
                  name: p(n) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, Tm),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: G[1] || (G[1] = (ne) => se("profile"))
              }, [
                j(F, {
                  name: "person",
                  size: 18
                })
              ])
            ])
          ]),
          e("main", {
            ref_key: "content",
            ref: X,
            class: "vb-content",
            tabindex: "-1"
          }, [
            p(r) || p(S) ? (s(), o("p", Rm, l(p(r) || p(S)), 1)) : I("", !0),
            (s(), o(V, { key: 1 }, [
              ee(j(Si, {
                active: O.value === "dietAssistant",
                records: p(a).records,
                targets: p(d),
                profile: D.value
              }, null, 8, ["active", "records", "targets", "profile"]), [
                [ts, O.value === "dietAssistant"]
              ]),
              O.value === "overview" ? (s(), me(gs, {
                key: 0,
                profile: D.value,
                nutrition: p(d),
                "record-count": p(i).length,
                records: p(i),
                onEdit: G[2] || (G[2] = (ne) => Q.value = !0),
                onNavigate: se
              }, null, 8, ["profile", "nutrition", "record-count", "records"])) : I("", !0),
              O.value === "assessment" ? (s(), me(pr, {
                key: 1,
                records: p(i),
                habits: p(a).habits,
                flags: p(a).flags,
                reports: p(b),
                profile: D.value,
                onNavigate: se,
                onToggleHabit: p(C),
                onOpenReport: it,
                onRetryReport: Ke
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : O.value === "diary" ? (s(), me(Lu, {
                key: 2,
                records: p(i),
                reports: p(b),
                profile: D.value,
                nutrition: p(d),
                "initial-date": ue.value,
                saving: ge.value,
                onSave: lt,
                onRemove: ze,
                onAnalysis: it,
                onBrowse: G[3] || (G[3] = (ne) => se("food")),
                onDetail: G[4] || (G[4] = (ne) => pe.value = p(oe)[ne])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving"])) : O.value === "food" ? (s(), me(Xd, {
                key: 3,
                onDetail: G[5] || (G[5] = (ne) => pe.value = p(oe)[ne])
              })) : O.value === "mealplan" ? (s(), me(wv, {
                key: 4,
                nutrition: p(d),
                preferences: p(a).preferences,
                flags: p(a).flags,
                profile: D.value,
                records: p(a).records,
                onNavigate: se,
                onAddPlan: ut
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : O.value === "profile" ? (s(), me(Tv, {
                key: 5,
                profile: D.value,
                nutrition: p(d),
                flags: p(a).flags,
                "onUpdate:flags": G[6] || (G[6] = (ne) => p(a).flags = ne),
                preferences: p(a).preferences,
                "onUpdate:preferences": G[7] || (G[7] = (ne) => p(a).preferences = ne),
                onEdit: G[8] || (G[8] = (ne) => Q.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences"])) : O.value === "about" ? (s(), me(xm, {
                key: 6,
                flags: p(a).flags,
                onNavigate: se
              }, null, 8, ["flags"])) : I("", !0)
            ], 64)),
            e("footer", zm, [
              j(F, {
                name: "leaf",
                size: 14
              }),
              G[18] || (G[18] = N("维衡 AI · 把健康，放进每一餐", -1)),
              G[19] || (G[19] = e("span", null, "营养信息仅供一般参考 · © 2026 维衡 AI 版权所有", -1))
            ])
          ], 512)
        ])
      ], 8, jm),
      Q.value ? (s(), me(mo, {
        key: 0,
        profile: p(a).profile,
        onComplete: xt,
        onClose: G[9] || (G[9] = (ne) => Q.value = !1),
        onLogin: ie
      }, null, 8, ["profile"])) : I("", !0),
      R.value ? (s(), me(ys, {
        key: 1,
        onClose: It
      })) : I("", !0),
      pe.value ? (s(), me(ra, {
        key: 2,
        "food-id": pe.value.key,
        onClose: G[10] || (G[10] = (ne) => pe.value = null),
        onAdd: rt
      }, null, 8, ["food-id"])) : I("", !0),
      le.value ? (s(), me(Ba, {
        key: 3,
        report: B.value,
        record: P.value,
        stale: B.value ? p(_)(B.value, P.value, D.value) : !1,
        error: K.value,
        onClose: G[11] || (G[11] = (ne) => {
          le.value = "", he.value = "";
        }),
        onRetry: G[12] || (G[12] = (ne) => Ke())
      }, null, 8, ["report", "record", "stale", "error"])) : I("", !0),
      q.value ? (s(), o("div", Om, [
        j(F, {
          name: "check",
          size: 17
        }),
        e("span", null, l(q.value.message), 1),
        q.value.undo ? (s(), o("button", {
          key: 0,
          onClick: G[13] || (G[13] = (...ne) => q.value.undo && q.value.undo(...ne))
        }, "撤销")) : I("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: G[14] || (G[14] = (ne) => q.value = null)
        }, [
          j(F, {
            name: "close",
            size: 15
          })
        ])
      ])) : I("", !0)
    ], 10, Em));
  }
};
export {
  Lm as default
};
