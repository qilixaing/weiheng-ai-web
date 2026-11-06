import { r as P, a as H, b as Ye, w as pe, o as n, d as l, e, F as O, f as V, n as an, g as me, h as rn, i as x, j as $, k as Ne, t as o, l as ve, m as Z, v as ue, p as j, u as b, q as $e, s as je, x as Xe, y as Pn, z as tt, A as Je, B as ut, C as Mn, D as un, E as _t, G as Tn } from "./vue-runtime-wiGxZMXT.js";
import { v as Fe, t as ke, F as oe, c as ft, r as Qe, n as Rn, m as zn, a as Dt, e as Ve, b as dn, d as cn, M as Pe, f as Mt, s as vn, g as dt, h as Jt, N as On, i as Ue, _ as Tt, C as At, G as mn, j as bt, k as Fn, l as Rt, o as Ht, P as Ct, R as Bn, p as It, q as Vn, u as Kt, A as Ge, w as it, x as Wt, y as Ln } from "./IntakeAnalysis-BA7b6Mgu.js";
import { s as Ze, a as Ce, o as qn, b as we, t as bn, c as Gn, d as Ae, e as Jn, f as Hn, g as ct } from "./main-CJWfh114.js";
import { v as et, A as zt, c as pn, _ as T, p as Kn, a as gn, u as Wn, b as Yn, d as Xn, e as Qn } from "./useThemeTransition-B_aci3Ji.js";
function Zn(t, a) {
  if (!a || !Fe(a.date) || a.date > ke() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(a.meal) || !Array.isArray(a.items) || !a.items.length || a.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const s = String(a.confirmationId || "").slice(0, 100);
  if (!s) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(s)) return { draft: t, duplicate: !0 };
  const d = a.items.map((i) => {
    const u = oe[i.foodId], r = Number(i.grams);
    if (!u || !Number.isFinite(r) || r < 0.1 || r > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: s + ":" + u.key, foodId: u.key, name: u.name, grams: r, meal: a.meal, group: u.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: ft(u) };
  });
  if (new Set(d.map((i) => i.foodId)).size !== d.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...d], appliedBatches: [...t.appliedBatches || [], s] }, duplicate: !1 };
}
const We = Ze("weiheng.reset-signal.v1"), fn = (t) => qn(t);
let Be = !1;
const Le = () => Be;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== We || !t.newValue))
    try {
      const { phase: a } = JSON.parse(t.newValue);
      a === "begin" && (Be = !0), a === "abort" && (Be = !1), a === "done" && (Be = !0, window.location.reload());
    } catch {
    }
});
function Yt(t, a) {
  return new Promise((s, d) => {
    const i = t.open(a);
    i.onerror = i.onblocked = () => d(new Error("本地文件存储暂时无法清理，请关闭其他旧页面后重试。")), i.onsuccess = () => {
      const u = i.result, r = Array.from(u.objectStoreNames);
      if (!r.length) {
        u.close(), s();
        return;
      }
      try {
        const v = u.transaction(r, "readwrite");
        for (const m of r) v.objectStore(m).clear();
        v.oncomplete = () => {
          u.close(), s();
        }, v.onerror = v.onabort = () => {
          u.close(), d(new Error("本地文件清理未完成，请重试。"));
        };
      } catch (v) {
        u.close(), d(v);
      }
    };
  });
}
function Xt(t, a = !1) {
  const s = Array.from({ length: t.length }, (d, i) => t.key(i));
  for (const d of s) d && fn(d) && !(a && d === We) && t.removeItem(d);
}
async function es({
  local: t = globalThis.localStorage,
  session: a = globalThis.sessionStorage,
  databases: s = globalThis.indexedDB,
  caches: d = globalThis.caches
} = {}) {
  if (Be) throw new Error("正在清理本地数据，请稍候。");
  Be = !0;
  const i = (u) => t.setItem(We, JSON.stringify({ phase: u, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), Ce.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!s) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      Yt(s, Ze("weiheng.media.v1")),
      Yt(s, Ze("weiheng.chat-attachments.v1"))
    ]), d) for (const u of await d.keys()) fn(u) && await d.delete(u);
    a && Xt(a), Xt(t, !0), i("done"), t.removeItem(We);
  } catch (u) {
    try {
      i("abort"), t.removeItem(We);
    } catch {
    }
    throw Be = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), u;
  }
}
const pt = "weiheng.local.v2", yn = "weiheng.theme.v1", ze = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function Qt(t) {
  if (!t) return null;
  const a = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", s = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), d = zt.some((u) => u.key === t.activity) ? t.activity : s[String(t.activity)] || "";
  if (et({ ...t, sex: a, activity: d })) return null;
  const i = { ...t, sex: a, age: ze(t.age), height: ze(t.height), weight: ze(t.weight), activity: d };
  return et(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    a
  ), activity: String(d) };
}
function hn() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const a = JSON.parse(we.getItem(pt) || "null");
    if (a && typeof a == "object") {
      for (const i of [...Array.isArray(a.records) ? a.records : [], ...Object.values(a.drafts || {})]) for (const u of Array.isArray(i?.entries) ? i.entries : []) u.foodId === "cabbage" && u.name === "白菜" && (u.referenceConfirmed = !1);
      return { ...t, ...a, drafts: a.drafts && typeof a.drafts == "object" ? a.drafts : {}, profile: Qt(a.profile), records: Array.isArray(a.records) ? a.records : [] };
    }
    const s = JSON.parse(we.getItem("vitabalance.v1") || we.getItem("vitabalance.guest.v1") || "null"), d = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return s ? { ...t, profile: Qt(s.profile), records: Array.isArray(s.records) ? s.records : [], plans: Array.isArray(s.plans) ? s.plans : [], flags: d.filter(([i]) => s.profile?.[i]).map(([, i]) => i), preferences: [s.profile?.avoid, s.profile?.allergies ? "需要核对的过敏或不耐受项：" + s.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const de = Ye(hn()), Oe = P("");
let Nt = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  Nt = !0;
  try {
    Object.assign(de, hn());
  } finally {
    Nt = !1;
  }
});
const ts = (() => {
  try {
    return we.getItem(yn);
  } catch {
    return null;
  }
})(), kn = P(ts === "dark" ? "dark" : "light"), vt = H(() => pn(de.flags.includes("孕期或哺乳期") ? null : de.profile));
pe(de, () => {
  if (!(Le() || Nt))
    try {
      we.setItem(pt, JSON.stringify({ ...de, calculated: vt.value })), Oe.value = "";
    } catch {
      Oe.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
pe(kn, (t) => {
  if (!Le())
    try {
      we.setItem(yn, t);
    } catch {
      Oe.value = "主题偏好暂时无法保存。";
    }
});
function Ot() {
  const t = H(() => [...de.records].sort((v, m) => m.date.localeCompare(v.date)));
  function a(v) {
    const m = et(v);
    return m || (de.profile = { ...de.profile, sex: v.sex || "", ageMonths: ze(v.ageMonths), physiologicalStage: v.physiologicalStage || "general", age: ze(v.age), height: ze(v.height), weight: ze(v.weight), activity: v.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function s(v) {
    if (Le()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Fe(v.date)) return { ok: !1, error: "请选择有效日期。" };
    const m = de.records.find((y) => y.date === v.date), c = Array.isArray(v.entries) ? zn(v, m) : (
      /** @type {DailyRecord} */
      { ...v, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (m && Dt(m) === Dt(c)) return { ok: !0, record: m, unchanged: !0 };
    const p = [...de.records.filter((y) => y.date !== c.date), c];
    try {
      we.setItem(pt, JSON.stringify({ ...de, records: p, calculated: vt.value }));
    } catch {
      return Oe.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: Oe.value };
    }
    return de.records = p, { ok: !0, record: c };
  }
  function d(v) {
    if (!Fe(v)) return null;
    if (!de.drafts[v]) {
      const m = de.records.find((c) => c.date === v);
      de.drafts[v] = { date: v, entries: Qe(m), notes: m?.notes || "", photoId: m?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return de.drafts[v];
  }
  function i(v) {
    const m = d(v.date);
    if (!m) return !1;
    const c = oe[v.foodId || ""];
    return m.entries.push({ id: crypto.randomUUID(), foodId: v.foodId || null, name: c?.name || v.name || "", grams: Number(v.grams), meal: v.meal || "unspecified", group: v.group, source: v.source || "catalogue", estimated: !!v.estimated, referenceConfirmed: !0, nutritionSnapshot: Rn(v.nutritionSnapshot, c?.key) || ft(c) }), !Oe.value;
  }
  function u(v, m) {
    const c = new Set(de.habits[v] || []);
    c.has(m) ? c.delete(m) : c.add(m), de.habits[v] = [...c];
  }
  function r(v) {
    if (Le()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const m = de.drafts[v.date] || { date: v.date, entries: Qe(de.records.find((y) => y.date === v.date)), appliedBatches: [] }, c = Zn(m, v);
      if (c.duplicate) return { ok: !0, duplicate: !0 };
      const p = { ...de.drafts, [v.date]: c.draft };
      return we.setItem(pt, JSON.stringify({ ...de, drafts: p, calculated: vt.value })), de.drafts = p, { ok: !0, duplicate: !1 };
    } catch (m) {
      return { ok: !1, error: m.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: de, theme: kn, nutrition: vt, records: t, storageError: Oe, updateProfile: a, saveRecord: s, ensureDraft: d, addToDraft: i, addPlanToDraft: r, toggleHabit: u };
}
let St;
function ns() {
  return St || (St = new Promise((t, a) => {
    if (!globalThis.indexedDB) {
      a(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const s = indexedDB.open(Ze("weiheng.media.v1"), 1);
    s.onupgradeneeded = () => {
      const d = s.result;
      for (const i of ["photos", "reports"]) d.objectStoreNames.contains(i) || d.createObjectStore(i, { keyPath: "id" });
    }, s.onsuccess = () => t(s.result), s.onerror = () => a(new Error("无法打开本地存储，请检查浏览器隐私设置。")), s.onblocked = () => a(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), St;
}
async function yt(t, a, s) {
  const d = await ns();
  if (a === "readwrite" && Le()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, u) => {
    const r = d.transaction(t, a);
    let v;
    const m = s(r.objectStore(t));
    m.onsuccess = () => {
      v = m.result;
    }, r.oncomplete = () => i(v), r.onabort = r.onerror = () => u(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const Pt = (t, a) => yt(t, "readwrite", (s) => s.put(JSON.parse(JSON.stringify(a)))), ss = (t, a) => yt(t, "readonly", (s) => s.get(a)), ls = (t) => yt(t, "readonly", (a) => a.getAll()), os = (t, a) => yt(t, "readwrite", (s) => s.delete(a));
async function ht(t, a) {
  let s;
  try {
    s = await fetch("/api/ai/" + t, { method: a === void 0 ? "GET" : "POST", headers: a === void 0 ? {} : { "Content-Type": "application/json" }, body: a === void 0 ? void 0 : JSON.stringify(a), signal: bn(9e4) });
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
async function wn(t, a, s, d) {
  const i = bn(9e4), u = d ? Gn([d, i]) : i;
  let r;
  try {
    r = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    a, stream: !0 }), signal: u });
  } catch (k) {
    throw new Error(k?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  if (!r.ok) {
    let k;
    try {
      k = await r.json();
    } catch {
      throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
    }
    const R = new Error(k.error || "AI 服务暂时不可用。");
    throw R.code = k.code, R;
  }
  if (!r.body) throw new Error("浏览器没有提供流式读取能力，请更新浏览器后重试。");
  const v = r.body.getReader(), m = new TextDecoder();
  let c = "", p = !1, y = null;
  const h = (k) => {
    const R = k.split(/\r?\n/).filter((w) => w.startsWith("data:")).map((w) => w.slice(5).trimStart()).join(`
`);
    if (!R) return;
    let N;
    try {
      N = JSON.parse(R);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (N?.type === "error") {
      const w = new Error(N.message || "AI 暂时无法回复，请重试。");
      throw w.code = N.code, w;
    }
    if (N?.type === "progress" && N.step) {
      s(N);
      return;
    }
    if (N?.type === "delta" && typeof N.text == "string") {
      s(N);
      return;
    }
    N?.type === "done" && typeof N.model == "string" && (y = N, p = !0, s(N));
  };
  try {
    for (; !p; ) {
      const { value: k, done: R } = await v.read();
      if (R) break;
      c += m.decode(k, { stream: !0 });
      let N;
      for (; (N = c.search(/\r?\n\r?\n/)) >= 0; ) {
        const w = c.slice(N).match(/^\r?\n\r?\n/)[0];
        if (h(c.slice(0, N)), c = c.slice(N + w.length), p) break;
      }
    }
    if (c += m.decode(), c.trim() && !p && h(c), !p || !y) throw new Error("AI 流式连接提前结束，请重试。");
    return y;
  } finally {
    v.releaseLock();
  }
}
async function as(t, a) {
  const s = await wn("meal-plan", t, (d) => {
    d.type === "progress" && a(d.step);
  });
  if (!s.result || !["ready", "needs_evidence"].includes(s.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return s.result;
}
const Me = P([]), gt = P(""), xt = /* @__PURE__ */ new Map();
let Et;
function Ft(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function is(t) {
  return t.filter((a) => {
    const s = a.referenceConfirmed === !1 ? void 0 : oe[a.foodId || ""];
    return Pe.some((d) => {
      const i = Mt(a, s, d.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function Zt(t) {
  Me.value = [t, ...Me.value.filter((a) => a.id !== t.id)].sort((a, s) => s.requestedAt.localeCompare(a.requestedAt));
}
async function mt(t) {
  try {
    await Pt("reports", t), gt.value = "", Zt(t);
  } catch (a) {
    throw gt.value = Ft(a), Zt({ ...t, persistenceFailed: !0 }), a;
  }
}
function $n() {
  return Et || (Et = (async () => {
    try {
      Me.value = (await ls("reports")).sort((t, a) => a.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Me.value])
        t.status === "pending" && await mt({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      gt.value = Ft(t);
    }
  })()), Et;
}
function rs(t) {
  return Me.value.find((a) => a.date === t);
}
function us(t, a, s) {
  return !a || t.dataVersion !== dn(a, s);
}
async function ds(t, a, { force: s = !1 } = {}) {
  const d = Ae();
  if (await Ve(Qe(t).filter((h) => h.foodId && !h.nutritionSnapshot).map((h) => String(h.foodId))), Ae() !== d || (await $n(), Ae() !== d)) return;
  const i = dn(t, a), u = `${d}:${t.date}:${i}`, r = xt.get(u);
  if (r) return r;
  const v = Me.value.find(
    (h) => h.date === t.date && h.dataVersion === i && h.status === "complete" && !h.persistenceFailed
  );
  if (v && !s) return v;
  const m = {
    sex: a?.sex,
    age: a?.age,
    height: a?.height,
    weight: a?.weight,
    activity: a?.activity,
    ageMonths: a?.ageMonths,
    physiologicalStage: a?.physiologicalStage
  }, c = Qe(t), p = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: Dt(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: c,
      intake: cn(c),
      profile: m
    },
    result: null,
    error: ""
  }, y = (async () => {
    await mt(p);
    try {
      const h = await ht("analyze-day", {
        date: t.date,
        entries: c,
        profile: m,
        requestId: p.id
      });
      if (Ae() !== d) return;
      const k = is(c);
      if (k.length) {
        const R = h.calculation?.estimation, N = R?.foods || [];
        if (!(R?.status === "complete" && R.missingFoodCount === k.length && N.length === k.length && k.every((_) => {
          const D = N.find((q) => q.entryId === String(c.indexOf(_))), z = _.referenceConfirmed === !1 ? void 0 : oe[_.foodId || ""], M = Pe.filter((q) => {
            const W = Mt(_, z, q.id);
            return typeof W.value != "number" && !W.range;
          }).map((q) => q.id);
          return !!(D && M.every((q) => {
            const W = D.values[q];
            return W && Number.isFinite(W.low) && Number.isFinite(W.high) && W.high > W.low;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      await mt({
        ...p,
        status: "complete",
        generatedAt: h.generatedAt,
        model: h.model,
        result: h.analysis,
        calculation: h.calculation
      });
    } catch (h) {
      if (Ae() !== d) return;
      await mt({ ...p, status: "failed", error: Ft(h) });
    }
    return Me.value.find((h) => h.id === p.id);
  })();
  xt.set(u, y);
  try {
    return await y;
  } finally {
    xt.delete(u);
  }
}
function Bt() {
  return {
    reports: Me,
    reportStorageError: gt,
    loadReports: $n,
    latestReport: rs,
    isStale: us,
    generateReport: ds
  };
}
const cs = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], vs = {
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
    const s = t, d = a, i = P(null), u = P(!1), r = H(() => (s.max - s.min) * 0.16), v = H(() => {
      const w = Number(s.modelValue);
      return String(s.modelValue).trim() && Number.isFinite(w) ? Math.min(s.max, Math.max(s.min, w)) : s.fallback;
    }), m = H(() => {
      const w = (v.value - s.min) / r.value, _ = w - Math.round(w);
      return Array.from({ length: 31 }, (D, z) => ({
        key: z,
        major: z % 5 === 0,
        left: `${50 + (z - 15 - _) / 30 * 100}%`
      }));
    });
    let c = null;
    function p(w) {
      const _ = Math.round((w - s.min) / s.step), D = s.step < 1 ? 1 : 0;
      return Number(Math.min(s.max, Math.max(s.min, s.min + _ * s.step)).toFixed(D));
    }
    function y(w) {
      d("update:modelValue", p(w));
    }
    function h(w) {
      w.pointerType === "mouse" && w.button !== 0 || (w.preventDefault(), i.value.setPointerCapture(w.pointerId), u.value = !0, c = { x: w.clientX, value: v.value });
    }
    function k(w) {
      if (!c || !u.value) return;
      const _ = i.value.getBoundingClientRect().width || 1;
      y(c.value + (w.clientX - c.x) / _ * r.value);
    }
    function R() {
      u.value = !1, c = null;
    }
    function N(w) {
      const _ = {
        ArrowRight: s.step,
        ArrowUp: s.step,
        ArrowLeft: -s.step,
        ArrowDown: -s.step,
        PageUp: s.step * 10,
        PageDown: -s.step * 10
      };
      w.key === "Home" ? (w.preventDefault(), y(s.min)) : w.key === "End" ? (w.preventDefault(), y(s.max)) : _[w.key] && (w.preventDefault(), y(v.value + _[w.key]));
    }
    return (w, _) => (n(), l("div", {
      ref_key: "ruler",
      ref: i,
      class: me(["vb-ruler", { "is-dragging": u.value }]),
      role: "slider",
      tabindex: "0",
      "aria-label": `${t.label}刻度`,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": v.value,
      "aria-valuetext": `${v.value} ${t.unit}`,
      "aria-orientation": "horizontal",
      onPointerdown: h,
      onPointermove: k,
      onPointerup: R,
      onPointercancel: R,
      onLostpointercapture: R,
      onKeydown: N
    }, [
      _[0] || (_[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (n(!0), l(O, null, V(m.value, (D) => (n(), l("i", {
        key: D.key,
        class: me({ major: D.major }),
        style: an({ left: D.left })
      }, null, 6))), 128)),
      _[1] || (_[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, cs));
  }
}, ms = { class: "vb-dialog-overlay" }, bs = { class: "vb-wizard-top" }, ps = { class: "vb-icon-badge" }, gs = ["aria-valuenow", "aria-label"], fs = { class: "vb-wizard-copy" }, ys = { class: "vb-small-label" }, hs = { id: "vb-wizard-title" }, ks = { id: "vb-step-hint" }, ws = {
  key: 0,
  class: "vb-sex-field"
}, $s = { class: "vb-sr-only" }, _s = ["aria-pressed", "onClick"], As = { class: "vb-person-symbol" }, Cs = { class: "vb-choice-check" }, Is = {
  key: 1,
  class: "vb-number-step"
}, Ss = { for: "vb-step-number" }, xs = { class: "vb-number-control" }, Es = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], Us = {
  key: 0,
  class: "vb-field"
}, js = { class: "vb-input-range" }, Ds = {
  key: 2,
  class: "vb-activity-field"
}, Ns = { class: "vb-sr-only" }, Ps = ["aria-pressed", "onClick"], Ms = { class: "vb-activity-icon" }, Ts = { class: "vb-radio-mark" }, Rs = { key: 0 }, zs = {
  key: 3,
  class: "vb-field"
}, Os = {
  key: 4,
  class: "vb-skip-row"
}, Fs = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, Bs = { class: "vb-wizard-actions" }, Vs = ["disabled"], Ls = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, qs = { class: "vb-wizard-account-login" }, Gs = { class: "vb-wizard-privacy" }, Js = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = Ye(s.profile ? { ...s.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), u = P(0), r = P(""), v = P(null), m = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], c = H(() => {
      const w = m[u.value], _ = Kn(i.age)[w.key];
      return _ ? { ...w, min: _[0], max: _[1] } : w;
    });
    function p() {
      if (u.value === 0 || u.value === 4 || !String(i[c.value.key] ?? "").trim()) return "";
      const w = Number(i[c.value.key]);
      return !Number.isFinite(w) || w < c.value.min || w > c.value.max || u.value === 1 && !Number.isInteger(w) ? `请输入 ${c.value.min}–${c.value.max} ${c.value.unit}${u.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function y(w) {
      i.sex = w, r.value = "";
    }
    function h() {
      i[c.value.key] = "", r.value = "", u.value < 4 && u.value++;
    }
    function k() {
      if (r.value = p(), !r.value) {
        if (u.value < 4) {
          u.value++;
          return;
        }
        r.value = et(i), r.value || d("complete", { ...i });
      }
    }
    function R() {
      je(() => v.value?.querySelector(".vb-step-input, .vb-choice-button, .vb-activity-choice")?.focus());
    }
    pe(u, () => {
      r.value = "", R();
    }), rn(R);
    function N(w) {
      if (w.key === "Escape" && s.profile) {
        d("close");
        return;
      }
      if (w.key !== "Tab") return;
      const _ = [...v.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], D = _[0], z = _.at(-1);
      w.shiftKey && document.activeElement === D ? (w.preventDefault(), z.focus()) : !w.shiftKey && document.activeElement === z && (w.preventDefault(), D.focus());
    }
    return (w, _) => (n(), l("div", ms, [
      e("section", {
        ref_key: "dialog",
        ref: v,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: N
      }, [
        e("div", bs, [
          e("span", ps, [
            x(T, { name: "leaf" })
          ]),
          _[10] || (_[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (n(), l("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: _[0] || (_[0] = (D) => w.$emit("close"))
          }, [
            x(T, { name: "close" })
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
          (n(), l(O, null, V(5, (D) => e("span", {
            key: D,
            class: me({ filled: D <= u.value + 1 })
          }, null, 2)), 64))
        ], 8, gs),
        e("form", {
          onSubmit: Ne(k, ["prevent"])
        }, [
          e("div", fs, [
            e("span", ys, "第 " + o(u.value + 1) + " 步 / 共 5 步", 1),
            e("h2", hs, o(c.value.title), 1),
            e("p", ks, o(c.value.hint), 1)
          ]),
          u.value === 0 ? (n(), l("fieldset", ws, [
            e("legend", $s, o(c.value.question), 1),
            (n(), l(O, null, V([["male", "男性"], ["female", "女性"]], ([D, z]) => e("button", {
              key: D,
              type: "button",
              class: me(["vb-choice-button", { selected: i.sex === D }]),
              "aria-pressed": i.sex === D,
              onClick: (M) => y(D)
            }, [
              e("span", As, o(D === "male" ? "♂" : "♀"), 1),
              e("strong", null, o(z), 1),
              e("span", Cs, [
                i.sex === D ? (n(), ve(T, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : $("", !0)
              ])
            ], 10, _s)), 64))
          ])) : u.value < 4 ? (n(), l("div", Is, [
            e("label", Ss, o(c.value.question), 1),
            e("div", xs, [
              Z((n(), l("input", {
                id: "vb-step-number",
                key: c.value.key,
                "onUpdate:modelValue": _[1] || (_[1] = (D) => i[c.value.key] = D),
                class: "vb-step-input",
                type: "number",
                inputmode: u.value === 1 ? "numeric" : "decimal",
                min: c.value.min,
                max: c.value.max,
                step: u.value === 1 ? 1 : 0.1,
                placeholder: c.value.placeholder,
                "aria-invalid": !!r.value,
                "aria-describedby": r.value ? "vb-step-error" : "vb-step-hint",
                onInput: _[2] || (_[2] = (D) => r.value = "")
              }, null, 40, Es)), [
                [ue, i[c.value.key]]
              ]),
              e("span", null, o(c.value.unit), 1)
            ]),
            x(vs, {
              modelValue: i[c.value.key],
              "onUpdate:modelValue": [
                _[3] || (_[3] = (D) => i[c.value.key] = D),
                _[4] || (_[4] = (D) => r.value = "")
              ],
              min: c.value.min,
              max: c.value.max,
              step: u.value === 1 ? 1 : 0.1,
              fallback: Number(c.value.placeholder),
              label: c.value.question,
              unit: c.value.unit
            }, null, 8, ["modelValue", "min", "max", "step", "fallback", "label", "unit"]),
            u.value === 1 && String(i.age) === "0" ? (n(), l("label", Us, [
              _[11] || (_[11] = j("月龄（可选，0–11个月）", -1)),
              Z(e("input", {
                "onUpdate:modelValue": _[5] || (_[5] = (D) => i.ageMonths = D),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [ue, i.ageMonths]
              ])
            ])) : $("", !0),
            e("p", js, o(c.value.min) + "–" + o(c.value.max) + " " + o(c.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (n(), l("fieldset", Ds, [
            e("legend", Ns, o(c.value.question), 1),
            (n(!0), l(O, null, V(b(zt), (D) => (n(), l("button", {
              key: D.key,
              type: "button",
              class: me(["vb-activity-choice", { selected: i.activity === D.key }]),
              "aria-pressed": i.activity === D.key,
              onClick: (z) => i.activity = D.key
            }, [
              e("span", Ms, [
                x(T, {
                  name: D.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, o(D.label), 1),
                e("small", null, o(D.detail), 1)
              ]),
              e("span", Ts, [
                i.activity === D.key ? (n(), l("i", Rs)) : $("", !0)
              ])
            ], 10, Ps))), 128))
          ])),
          u.value === 4 ? (n(), l("label", zs, [
            _[13] || (_[13] = j("生理阶段（可选）", -1)),
            Z(e("select", {
              "onUpdate:modelValue": _[6] || (_[6] = (D) => i.physiologicalStage = D)
            }, [..._[12] || (_[12] = [
              e("option", { value: "general" }, "一般情况", -1),
              e("option", { value: "pregnant" }, "孕期", -1),
              e("option", { value: "lactating" }, "哺乳期", -1),
              e("option", { value: "special" }, "其他需专业评估的情况", -1)
            ])], 512), [
              [$e, i.physiologicalStage]
            ]),
            _[14] || (_[14] = e("small", null, "特殊阶段暂停通用营养目标；记录和查询仍可使用。", -1))
          ])) : $("", !0),
          u.value < 4 ? (n(), l("div", Os, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: h
            }, "跳过此项")
          ])) : $("", !0),
          e("p", Fs, o(r.value), 1),
          e("div", Bs, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: u.value === 0 && !t.profile,
              onClick: _[7] || (_[7] = (D) => u.value > 0 ? u.value-- : w.$emit("close"))
            }, [
              x(T, {
                name: "back",
                size: 17
              }),
              j(o(u.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, Vs),
            e("button", Ls, [
              j(o(u.value === 4 ? "保存我的身体档案" : "下一步"), 1),
              x(T, {
                name: "arrow",
                size: 17
              })
            ])
          ])
        ], 32),
        e("button", {
          type: "button",
          class: "vb-button vb-button-quiet vb-skip-all",
          onClick: _[8] || (_[8] = (D) => d("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", qs, [
          _[15] || (_[15] = j("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: _[9] || (_[9] = (D) => d("login"))
          }, "登录")
        ]),
        e("p", Gs, [
          x(T, {
            name: "lock",
            size: 13
          }),
          _[16] || (_[16] = j("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, kt = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function Vt(t) {
  if (t?.__summary) return t.state || "";
  if (!t?.expanded) return t?.state || "";
  const a = String(t.source?.description || ""), s = [];
  return /\bRAW\b/.test(a) ? s.push("生") : /\bRSTD\b|ROASTED/.test(a) ? s.push("烤熟") : /\bBKD\b/.test(a) ? s.push("烘焙") : /FRIED/.test(a) ? s.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(a) && s.push("熟"), /\bDRY MIX\b/.test(a) ? s.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(a) && s.push("干制"), /\bCND\b/.test(a) && s.push("罐装"), /\bFRZ\b|FROZEN/.test(a) && s.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(a) ? s.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(a) && s.push("加盐"), s.length ? s.join(" · ") : "具体品种与配方见数据来源";
}
const _n = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function Hs(t) {
  return (_n.find((s) => s.items.some(([d]) => d === t?.key) || [s.name, ...s.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([s]) => oe[s]?.source).map(([s, d]) => ({ id: s, label: d }));
}
const Ks = Object.fromEntries(_n.flatMap((t) => t.items)), An = (t) => Ks[t] || "";
function Ws(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function Cn(t) {
  const a = P(null), s = P(!1), d = P(!1);
  let i = 0;
  async function u(r = !1) {
    const v = b(typeof t == "function" ? t() : t), m = ++i;
    if (a.value = null, d.value = !1, s.value = !!v && !v.image, !v) {
      s.value = !1;
      return;
    }
    try {
      a.value = await Ws(v, { force: r }), d.value = !a.value;
    } catch {
      d.value = !0;
    } finally {
      m === i && (s.value = !1);
    }
  }
  return pe(() => {
    const r = b(typeof t == "function" ? t() : t);
    return [r?.key, r?.image];
  }, () => u(), { immediate: !0 }), { photo: a, loading: s, failed: d, retry: () => u(!0) };
}
const Ys = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, Xs = { key: 0 }, Qs = { key: 1 }, Zs = {
  key: 2,
  role: "status"
}, el = { key: 3 }, tl = { class: "vb-portion-macros" }, nl = { key: 0 }, sl = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, ll = { class: "vb-estimate-adjust" }, ol = { class: "vb-field" }, al = ["disabled"], il = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = P(!1), u = P(""), r = P(null), v = P("");
    let m = 0;
    function c(h) {
      try {
        const R = JSON.parse(we.getItem("weiheng.food-estimate." + h?.key) || "null");
        if (R?.estimate)
          return r.value = { ...R, cached: !0 }, v.value = R.recipe || "", d("resolved", r.value), !0;
      } catch {
      }
      const k = vn.estimates?.[h?.key];
      return k ? (r.value = { foodId: h.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: k.model, generatedAt: k.generatedAt, estimate: { entryId: h.key, name: h.name, grams: 100, values: k.values, assumption: k.assumption } }, d("resolved", r.value), !0) : !1;
    }
    async function p() {
      const h = ++m, k = s.food?.key;
      i.value = !0, u.value = "", r.value = null, d("resolved", null);
      try {
        const R = await ht("food-estimate", { foodId: k, recipe: v.value.trim() });
        if (h !== m) return;
        r.value = R;
        try {
          we.setItem("weiheng.food-estimate." + k, JSON.stringify({ ...R, recipe: v.value }));
        } catch {
          u.value = "估算已返回，但本机缓存保存失败。";
        }
        d("resolved", R);
      } catch (R) {
        h === m && (u.value = R.message);
      } finally {
        h === m && (i.value = !1);
      }
    }
    pe(() => s.food?.key, () => {
      m++, v.value = "", u.value = "", i.value = !1, r.value = null, s.food && c(s.food);
    }, { immediate: !0 }), Xe(() => {
      m++;
    });
    const y = (h) => h ? `${Math.round(h.low * 10) / 10}–${Math.round(h.high * 10) / 10}` : "未知";
    return (h, k) => (n(), l("section", Ys, [
      e("h3", null, o(r.value ? "AI 估算参考" : "AI 营养估算"), 1),
      r.value?.estimate ? (n(), l("p", Xs, [...k[1] || (k[1] = [
        e("strong", null, "每100克可食部 · AI估算，非数据库值", -1)
      ])])) : (n(), l("p", Qs, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (n(), l("p", Zs, "正在估算…")) : $("", !0),
      r.value?.estimate ? (n(), l("div", el, [
        e("div", tl, [
          (n(!0), l(O, null, V(b(Pe).filter((R) => r.value.estimate.values[R.id]), (R) => (n(), l("div", {
            key: R.id
          }, [
            e("span", null, o(R.name), 1),
            e("strong", null, [
              j(o(y(r.value.estimate.values[R.id])) + " ", 1),
              e("small", null, o(R.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, o(r.value.estimate.assumption), 1),
        r.value.cached ? (n(), l("small", nl, "已保存的预估 · " + o(r.value.model || r.value.requestedModel) + " · " + o(r.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : $("", !0),
        k[2] || (k[2] = e("small", null, "此范围由 AI 按名称、类别和生熟状态估算；原料比例、用油和做法不同会造成差异。维生素和矿物质仍显示未知，不作为数据库检测值。", -1))
      ])) : $("", !0),
      u.value ? (n(), l("p", sl, o(u.value), 1)) : $("", !0),
      e("details", ll, [
        e("summary", null, o(r.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", ol, [
          k[3] || (k[3] = j("原料与做法", -1)),
          Z(e("textarea", {
            "onUpdate:modelValue": k[0] || (k[0] = (R) => v.value = R),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [ue, v.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: p
        }, o(i.value ? "估算中…" : u.value ? "重试估算" : r.value ? "按补充内容重新估算" : "生成估算"), 9, al)
      ])
    ]));
  }
};
function rl(t) {
  const a = String(t?.name || ""), s = String(t?.state || ""), d = (i, u) => ({ label: `${i} · 估算${u}克`, grams: u });
  return /米饭/.test(a) && !/生|干/.test(s) ? [d("小碗", 100), d("中碗", 150), d("大碗", 200)] : /鸡蛋/.test(a) && !/粉|液|鸭|鹅/.test(a) ? [d("1个去壳", 50)] : /香蕉/.test(a) ? [d("1根去皮", 100)] : /苹果/.test(a) ? [d("小个去核", 150), d("中个去核", 200)] : /牛奶|酸奶/.test(a) && !/粉|干酪|奶油/.test(a) ? [d("小杯（按重量）", 200), d("一份（按重量）", 250)] : [];
}
const ul = {
  key: 0,
  class: "vb-portion-presets"
}, dl = ["onClick"], In = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = H(() => rl(s.food));
    return (u, r) => i.value.length ? (n(), l("div", ul, [
      r[0] || (r[0] = e("span", null, "份量参考", -1)),
      (n(!0), l(O, null, V(i.value, (v) => (n(), l("button", {
        key: v.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (m) => d("choose", v.grams)
      }, o(v.label), 9, dl))), 128)),
      r[1] || (r[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : $("", !0);
  }
}, cl = ["src", "alt", "loading"], vl = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, Lt = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = P(!1);
    return pe(() => s.photo?.image, () => i.value = !1), (u, r) => (n(), l("div", {
      class: me(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (n(), l("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: r[0] || (r[0] = (v) => {
          i.value = !0, d("image-error");
        })
      }, null, 40, cl)) : (n(), l("div", vl, [
        x(T, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, o(b(An)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, o(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (n(), l("span", {
        key: 2,
        class: me({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, o(t.photo.imageLabel || "食物照片"), 3)) : $("", !0)
    ], 2));
  }
}), ml = ["aria-label"], bl = ["aria-label"], pl = { class: "vb-feature-dialog-body" }, nt = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: a }) {
    const s = a, d = P(null), i = document.activeElement;
    rn(() => je(() => d.value?.focus())), Xe(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function u(r) {
      if (r.key === "Escape" && (r.preventDefault(), s("close")), r.key !== "Tab") return;
      const v = [...d.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((p) => p.getClientRects().length);
      if (!v.length) {
        r.preventDefault();
        return;
      }
      const m = v[0], c = v.at(-1);
      r.shiftKey && (document.activeElement === m || document.activeElement === d.value) ? (r.preventDefault(), c.focus()) : !r.shiftKey && document.activeElement === c && (r.preventDefault(), m.focus());
    }
    return (r, v) => (n(), l("div", {
      class: "vb-feature-overlay",
      onClick: v[1] || (v[1] = Ne((m) => r.$emit("close"), ["self"]))
    }, [
      e("section", {
        ref_key: "panel",
        ref: d,
        class: me(["vb-feature-dialog", { "is-wide": t.wide }]),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t.title,
        tabindex: "-1",
        onKeydown: u
      }, [
        e("header", null, [
          e("h2", null, o(t.title), 1),
          e("button", {
            type: "button",
            class: "vb-icon-button",
            "aria-label": "关闭" + t.title,
            onClick: v[0] || (v[0] = (m) => r.$emit("close"))
          }, [
            x(T, { name: "close" })
          ], 8, bl)
        ]),
        e("div", pl, [
          Pn(r.$slots, "default")
        ])
      ], 42, ml)
    ]));
  }
}, gl = { class: "vb-food-detail-top" }, fl = { class: "vb-eyebrow" }, yl = { class: "vb-food-state" }, hl = { class: "vb-pill" }, kl = {
  key: 0,
  class: "vb-field"
}, wl = ["value"], $l = ["value"], _l = {
  key: 0,
  class: "vb-intake-more"
}, Al = {
  key: 1,
  class: "vb-feature-error"
}, Cl = { class: "vb-portion-controls" }, Il = ["max"], Sl = ["value"], xl = { class: "vb-portion-macros" }, El = { key: 0 }, Ul = { key: 0 }, jl = ["disabled"], Dl = { class: "vb-food-all-nutrients" }, Nl = { class: "vb-nutrient-table" }, Pl = { class: "vb-nutrient-table-head" }, Ml = { key: 0 }, Tl = ["href"], Rl = { key: 1 }, zl = { key: 2 }, Ol = ["href"], Fl = ["href"], Bl = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = P(s.foodId), u = P(100), r = P(ke()), v = P("unspecified"), m = P(null);
    pe(() => s.foodId, (W) => {
      i.value = W;
    }), pe(i, () => {
      m.value = null;
    });
    const c = H(() => oe[i.value]), p = P("");
    async function y() {
      const W = i.value;
      p.value = "";
      try {
        await Ve(W);
      } catch (F) {
        i.value === W && (p.value = F.message);
      }
    }
    pe(i, y, { immediate: !0 });
    const h = H(() => Hs(oe[s.foodId])), k = H(() => Pe.some((W) => typeof c.value?.nutrients?.[W.id] != "number")), R = H(() => c.value?.__summary ? null : ft(c.value, k.value ? m.value : null)), N = H(() => cn([{ foodId: c.value.key, grams: Number(u.value), nutritionSnapshot: R.value }]).totals), w = H(() => !c.value?.__summary && Number(u.value) >= 0.1 && Number(u.value) <= 5e3 && r.value && r.value <= ke()), { photo: _, loading: D, failed: z } = Cn(() => c.value), M = H(() => c.value?.imageCredit || _.value?.imageCredit || _.value);
    function q() {
      w.value && d("add", { foodId: c.value.key, grams: Number(u.value), date: r.value, meal: v.value, nutritionSnapshot: R.value });
    }
    return (W, F) => c.value ? (n(), ve(nt, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: F[6] || (F[6] = (K) => W.$emit("close"))
    }, {
      default: tt(() => [
        e("div", gl, [
          e("figure", null, [
            x(Lt, {
              food: c.value,
              photo: b(_),
              loading: b(D),
              failed: b(z),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", fl, o(c.value.categoryName), 1),
            e("h1", null, o(b(An)(c.value.key) || b(kt)(c.value)), 1),
            e("p", yl, o(b(Vt)(c.value)), 1),
            e("span", hl, o(c.value.source ? "数据库" : m.value ? "AI估算" : "数据不完整"), 1),
            h.value.length ? (n(), l("label", kl, [
              F[7] || (F[7] = j("选择营养样本", -1)),
              Z(e("select", {
                "onUpdate:modelValue": F[0] || (F[0] = (K) => i.value = K),
                "aria-label": "选择营养样本"
              }, [
                h.value.some((K) => K.id === s.foodId) ? $("", !0) : (n(), l("option", {
                  key: 0,
                  value: s.foodId
                }, "当前食物 · " + o(b(oe)[s.foodId]?.source ? "数据库" : "通用估算"), 9, wl)),
                (n(!0), l(O, null, V(h.value, (K) => (n(), l("option", {
                  key: K.id,
                  value: K.id
                }, o(K.label), 9, $l))), 128))
              ], 512), [
                [$e, i.value]
              ]),
              F[8] || (F[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : $("", !0)
          ])
        ]),
        k.value && !c.value.__summary ? (n(), l("details", _l, [
          F[9] || (F[9] = e("summary", null, "查看估算依据与调整", -1)),
          x(il, {
            food: c.value,
            onResolved: F[1] || (F[1] = (K) => m.value = K)
          }, null, 8, ["food"])
        ])) : $("", !0),
        p.value ? (n(), l("p", Al, [
          j(o(p.value) + " ", 1),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: y
          }, "重试")
        ])) : $("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: Ne(q, ["prevent"])
        }, [
          x(In, {
            food: c.value,
            onChoose: F[2] || (F[2] = (K) => u.value = K)
          }, null, 8, ["food"]),
          e("div", Cl, [
            e("label", null, [
              F[10] || (F[10] = j("可食部重量", -1)),
              Z(e("input", {
                "onUpdate:modelValue": F[3] || (F[3] = (K) => u.value = K),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [ue, u.value]
              ]),
              F[11] || (F[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              F[12] || (F[12] = j("记录日期", -1)),
              Z(e("input", {
                "onUpdate:modelValue": F[4] || (F[4] = (K) => r.value = K),
                type: "date",
                max: b(ke)(),
                required: ""
              }, null, 8, Il), [
                [ue, r.value]
              ])
            ]),
            e("label", null, [
              F[13] || (F[13] = j("餐次", -1)),
              Z(e("select", {
                "onUpdate:modelValue": F[5] || (F[5] = (K) => v.value = K)
              }, [
                (n(!0), l(O, null, V(b(dt), ([K, G]) => (n(), l("option", {
                  key: K,
                  value: K
                }, o(G), 9, Sl))), 128))
              ], 512), [
                [$e, v.value]
              ])
            ])
          ]),
          e("div", xl, [
            (n(!0), l(O, null, V(b(Pe), (K) => (n(), l("div", {
              key: K.id
            }, [
              e("span", null, o(K.id === "carbs" ? "碳水" : K.name), 1),
              e("strong", null, [
                j(o(b(Jt)(N.value[K.id])) + " ", 1),
                N.value[K.id].value != null || N.value[K.id].range ? (n(), l("small", El, o(K.unit), 1)) : $("", !0)
              ]),
              N.value[K.id].range ? (n(), l("small", Ul, "AI估算")) : $("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !w.value
          }, [
            x(T, {
              name: "plus",
              size: 16
            }),
            F[14] || (F[14] = j("添加记录", -1))
          ], 8, jl),
          F[15] || (F[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", Dl, [
          F[20] || (F[20] = e("summary", null, "查看完整营养与依据", -1)),
          F[21] || (F[21] = e("p", null, "每100克可食部；未知值不按0计算。范围为AI估算，非实测值。", -1)),
          e("div", Nl, [
            e("div", Pl, [
              F[16] || (F[16] = e("span", null, "营养指标", -1)),
              F[17] || (F[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + o(u.value) + " 克", 1)
            ]),
            (n(!0), l(O, null, V(b(On), (K) => (n(), l("div", {
              key: K.id
            }, [
              e("span", null, o(K.name), 1),
              e("span", null, o(b(Ue)(c.value.nutrients[K.id])) + " " + o(c.value.nutrients[K.id] != null ? K.unit : ""), 1),
              e("span", null, o(b(Jt)(N.value[K.id])) + " " + o(N.value[K.id].value != null || N.value[K.id].range ? K.unit : "") + o(N.value[K.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + o(c.value.name), 1),
          c.value.source ? (n(), l("p", Ml, [
            e("a", {
              href: c.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, o(c.value.source.name), 9, Tl),
            j(" · " + o(c.value.source.id) + " · " + o(c.value.source.license), 1),
            F[18] || (F[18] = e("br", null, null, -1)),
            j(o(c.value.source.description), 1)
          ])) : (n(), l("p", Rl, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          F[22] || (F[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          M.value ? (n(), l("p", zl, [
            F[19] || (F[19] = j("图片：", -1)),
            e("a", {
              href: M.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, o(M.value.title), 9, Ol),
            j(" / " + o(M.value.author) + " · ", 1),
            e("a", {
              href: M.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, o(M.value.license), 9, Fl),
            j(" · " + o(M.value.modifications), 1)
          ])) : $("", !0)
        ])
      ]),
      _: 1
    })) : $("", !0);
  }
}, Vl = { class: "vb-report-heading" }, Ll = { class: "vb-small-label" }, ql = { class: "vb-pill" }, Gl = { key: 0 }, Jl = ["disabled"], Hl = {
  key: 1,
  class: "vb-inline-warning"
}, Kl = {
  key: 2,
  class: "vb-inline-warning"
}, Wl = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, Yl = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, Xl = ["disabled"], Ql = {
  key: 5,
  class: "vb-feature-error"
}, Zl = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, eo = { class: "vb-report-estimation-heading" }, to = { class: "vb-pill" }, no = { class: "vb-data-note" }, so = {
  key: 0,
  class: "vb-report-estimation-list"
}, lo = { class: "vb-report-estimation-values" }, oo = {
  key: 1,
  class: "vb-intake-more"
}, ao = { class: "vb-report-comparison" }, io = { key: 0 }, ro = { key: 1 }, uo = { key: 2 }, co = { key: 3 }, vo = { key: 4 }, mo = { key: 5 }, bo = { key: 6 }, po = { key: 7 }, go = {
  key: 7,
  class: "vb-report-content"
}, fo = { class: "vb-report-summary" }, yo = { class: "vb-inline-warning" }, ho = {
  key: 8,
  class: "vb-intake-more"
}, ko = { class: "vb-report-meta" }, wo = { key: 0 }, $o = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const a = t, s = H(() => a.report?.calculation?.targets || pn(a.report?.snapshot?.profile)), d = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], i = (c) => c ? new Date(c).toLocaleString("zh-CN", { hour12: !1 }) : "", u = H(() => (a.report?.snapshot?.entries || []).flatMap((c) => {
      const p = c.referenceConfirmed === !1 ? null : oe[c.foodId], y = Pe.filter((h) => {
        const k = Mt(c, p, h.id);
        return typeof k.value != "number" && !k.range;
      }).map((h) => h.id);
      return y.length ? [{ name: c.name, grams: c.grams, missing: y }] : [];
    })), r = H(() => a.report?.calculation?.estimation?.missingFoodCount ?? u.value.length), v = H(() => a.report?.calculation?.estimation?.foods || []), m = (c) => (c > 0 ? "+" : c < 0 ? "−" : "") + Ue(Math.abs(c));
    return (c, p) => (n(), ve(nt, {
      title: "AI 营养分析",
      wide: "",
      onClose: p[4] || (p[4] = (y) => c.$emit("close"))
    }, {
      default: tt(() => [
        e("div", Vl, [
          e("div", null, [
            e("span", Ll, o(t.report?.date || t.record?.date), 1),
            p[5] || (p[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", ql, o(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        p[17] || (p[17] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (n(), l("section", Gl, [
          p[6] || (p[6] = e("p", null, "分析时向DeepSeek发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[0] || (p[0] = (y) => c.$emit("retry"))
          }, "开始AI分析", 8, Jl)
        ])) : $("", !0),
        t.stale ? (n(), l("p", Hl, [
          p[7] || (p[7] = j("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (n(), l("button", {
            key: 0,
            class: "vb-text-button",
            onClick: p[1] || (p[1] = (y) => c.$emit("retry"))
          }, "重新分析")) : $("", !0)
        ])) : $("", !0),
        t.record ? $("", !0) : (n(), l("p", Kl, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (n(), l("div", Wl, [
          p[9] || (p[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            p[8] || (p[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, o(r.value ? "同时自动估算 " + r.value + " 项食物的缺失指标。" : "程序已计算营养汇总，DeepSeek 正在生成解释与建议。"), 1)
          ])
        ])) : $("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (n(), l("div", Yl, [
          p[10] || (p[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, o(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[2] || (p[2] = (y) => c.$emit("retry"))
          }, "重新分析", 8, Xl)
        ])) : $("", !0),
        t.report?.persistenceFailed ? (n(), l("p", Ql, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : $("", !0),
        t.report?.snapshot ? (n(), l(O, { key: 6 }, [
          p[13] || (p[13] = e("h3", { class: "vb-report-section-title" }, "程序计算的营养汇总", -1)),
          x(Tt, {
            summary: t.report.snapshot.intake,
            targets: s.value,
            details: ""
          }, null, 8, ["summary", "targets"]),
          r.value ? (n(), l("section", Zl, [
            e("div", eo, [
              e("div", null, [
                e("h3", null, o(r.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${r.value} 项）`), 1),
                p[11] || (p[11] = e("p", null, "缺失指标已自动交由 AI 估算范围，并用于下方参考差值；不需要额外点击。", -1))
              ]),
              e("span", to, o(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            e("p", no, o(t.report?.calculation?.estimation?.disclaimer || "估算结果基于食物名称和可食部克数，只用于本报告参考，不会写入食物库或原始饮食记录。"), 1),
            v.value.length ? (n(), l("ul", so, [
              (n(!0), l(O, null, V(v.value, (y) => (n(), l("li", {
                key: y.entryId
              }, [
                e("div", null, [
                  e("strong", null, o(y.name) + " · " + o(b(Ue)(y.grams)) + " 克", 1),
                  e("small", null, o(y.assumption), 1)
                ]),
                e("div", lo, [
                  (n(!0), l(O, null, V(b(Pe).filter((h) => y.values[h.id]), (h) => (n(), l("span", {
                    key: h.id
                  }, o(h.id === "carbs" ? "碳水" : h.name) + " " + o(b(Ue)(y.values[h.id].low)) + "–" + o(b(Ue)(y.values[h.id].high)) + " " + o(h.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : $("", !0)
          ])) : $("", !0),
          t.report.calculation?.comparison ? (n(), l("details", oo, [
            p[12] || (p[12] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", ao, [
              (n(!0), l(O, null, V(t.report.calculation.comparison, (y) => (n(), l("div", {
                key: y.id
              }, [
                e("span", null, o(y.id === "carbs" ? "碳水" : y.name), 1),
                y.estimatedRange?.delta ? (n(), l("strong", io, " AI 估算差值：" + o(m(y.estimatedRange.delta.low)) + " 至 " + o(m(y.estimatedRange.delta.high)) + " " + o(y.unit), 1)) : y.delta !== null ? (n(), l("strong", ro, o(y.delta > 0 ? "+" : "") + o(b(Ue)(y.delta)) + " " + o(y.unit), 1)) : (n(), l("strong", uo, o(y.estimatedRange || y.complete && y.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                y.estimatedRange?.delta ? (n(), l("small", co, "根据数据库已知小计与 AI 估算范围计算；记录未必覆盖全天，不代表达标或不足。")) : y.estimatedRange && !y.estimatedRange.delta ? (n(), l("small", vo, "含估算范围，暂无适用个人目标。")) : y.delta !== null ? (n(), l("small", mo, "记录合计减去全天目标，记录未必覆盖全天。")) : y.complete && y.target === null ? (n(), l("small", bo, "请完善个人营养档案后再查看与目标的差值。")) : (n(), l("small", po, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : $("", !0)
        ], 64)) : $("", !0),
        t.report?.result ? (n(), l("div", go, [
          p[14] || (p[14] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", fo, o(t.report.result.summary), 1),
          (n(), l(O, null, V(d, ([y, h]) => e("section", { key: y }, [
            t.report.result[y]?.length ? (n(), l(O, { key: 0 }, [
              e("h3", null, o(h), 1),
              e("ul", null, [
                (n(!0), l(O, null, V(t.report.result[y], (k, R) => (n(), l("li", { key: R }, o(k), 1))), 128))
              ])
            ], 64)) : $("", !0)
          ])), 64)),
          e("p", yo, "分析范围：" + o(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : $("", !0),
        t.report ? (n(), l("details", ho, [
          p[16] || (p[16] = e("summary", null, "查看分析信息", -1)),
          e("div", ko, [
            e("span", null, "生成时间：" + o(i(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (n(), l("span", wo, "模型：" + o(t.report.model), 1)) : $("", !0),
            e("span", null, "数据版本：" + o(t.report.dataVersion), 1),
            e("span", null, "食物库：" + o(t.report.snapshot?.intake?.dataVersion), 1),
            p[15] || (p[15] = e("small", null, "报告、照片保存在本机浏览器。清理站点数据后无法恢复。", -1))
          ])
        ])) : $("", !0),
        t.report?.status === "complete" && t.record ? (n(), l("button", {
          key: 9,
          type: "button",
          class: "vb-button vb-button-quiet",
          onClick: p[3] || (p[3] = (y) => c.$emit("retry"))
        }, o(t.stale ? "用最新记录重新分析" : "重新分析这一天"), 1)) : $("", !0)
      ]),
      _: 1
    }));
  }
};
function _o(t, a, s) {
  return t.push({ id: a, role: "assistant", content: "", status: "sending", createdAt: s }), t[t.length - 1];
}
const Ao = 24e3, en = 220;
function Co(t, a) {
  const s = Date.parse(t || a || "");
  return Number.isFinite(s) ? s : 0;
}
function tn(t) {
  const a = String(t || "").trim();
  return a.length > en ? `${a.slice(0, en)}…` : a;
}
function Io(t, a, s = !0) {
  if (!s || !Array.isArray(t)) return "";
  const d = [];
  for (const r of t) {
    if (!r || r.id === a || !Array.isArray(r.messages)) continue;
    const v = r.messages;
    for (let m = 0; m < v.length - 1; m++) {
      const c = v[m], p = v[m + 1];
      if (c?.role !== "user" || p?.role !== "assistant" || c.status !== "complete" || p.status !== "complete" || c.attachments?.length || p.attachments?.length) continue;
      const y = tn(c.content), h = tn(p.content);
      !y || !h || (d.push({
        date: typeof r.date == "string" ? r.date : "",
        time: Co(c.createdAt, r.createdAt),
        user: y,
        assistant: h
      }), m++);
    }
  }
  const i = d.sort((r, v) => r.time - v.time).slice(-50);
  let u = i.map((r) => `${r.date ? `日期 ${r.date}：` : ""}用户：${r.user}
助手：${r.assistant}`).join(`

`);
  for (; u.length > Ao && i.length; )
    i.shift(), u = i.map((r) => `${r.date ? `日期 ${r.date}：` : ""}用户：${r.user}
助手：${r.assistant}`).join(`

`);
  return u;
}
function So(t) {
  if (!t || typeof t != "object" || Array.isArray(t) || et(t)) return null;
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
const xo = 3, Eo = 24e3, nn = 6e4, Uo = 8e5, jo = 6, Do = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function Sn(t) {
  const a = String(t.name || "").split(".").pop().toLowerCase(), s = ["jpg", "jpeg", "png", "webp"].includes(a) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(a) ? "document" : null;
  if (!s) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (s === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(s === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return s;
}
function No(t) {
  const a = String(t).replace(/\u0000/g, "").trim();
  if (!a) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (a.length > Eo) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return a;
}
let Ke;
function Po() {
  return Ke || (Ke = new Promise((t, a) => {
    if (!globalThis.indexedDB) {
      a(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const s = indexedDB.open(Ze("weiheng.chat-attachments.v1"), 1);
    s.onupgradeneeded = () => s.result.createObjectStore("attachments", { keyPath: "id" }), s.onsuccess = () => {
      const d = s.result;
      d.onversionchange = () => {
        d.close(), Ke = void 0;
      }, t(d);
    }, s.onerror = s.onblocked = () => a(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw Ke = void 0, t;
  })), Ke;
}
async function qt(t, a) {
  const s = await Po();
  if (t === "readwrite" && Le()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((d, i) => {
    const u = s.transaction("attachments", t), r = a(u.objectStore("attachments"));
    u.oncomplete = () => d(r.result), u.onerror = u.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const Mo = (t) => qt("readwrite", (a) => a.put(t)), Ut = (t) => qt("readonly", (a) => a.get(t)), rt = (t) => qt("readwrite", (a) => a.delete(t));
function To(t) {
  return new Promise((a, s) => {
    const d = new FileReader();
    d.onload = () => a(String(d.result)), d.onerror = () => s(new Error("照片读取失败，请重新选择。")), d.readAsDataURL(t);
  });
}
async function Ro(t) {
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
      const r = await new Promise((m, c) => s.toBlob((p) => p ? m(p) : c(new Error("照片压缩失败。")), "image/jpeg", u)), v = await To(r);
      if (v.length <= Uo) return v;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    a.close();
  }
}
async function zo(t) {
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
      const r = await d.getPage(u), v = await r.getTextContent();
      if (i.push(v.items.map((m) => "str" in m ? m.str + (m.hasEOL ? `
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
async function Oo(t) {
  const { unzipSync: a, strFromU8: s } = await import("./browser-DbjUwor9.js"), d = a(new Uint8Array(await t.arrayBuffer()), {
    filter: (u) => u.name === "word/document.xml" && u.originalSize <= 4 * 1024 * 1024
  });
  if (!d["word/document.xml"]) throw new Error("Word 文件无效或内容过大，请另存为 DOCX 或 TXT 后重试。");
  const i = new DOMParser().parseFromString(s(d["word/document.xml"]), "application/xml");
  if (i.querySelector("parsererror")) throw new Error("Word 文件内容无法读取。");
  return Array.from(i.getElementsByTagNameNS("*", "p")).map((u) => Array.from(u.getElementsByTagNameNS("*", "*")).map((r) => r.localName === "t" ? r.textContent || "" : r.localName === "tab" ? "	" : r.localName === "br" ? `
` : "").join("")).join(`
`);
}
async function Fo(t, a) {
  const s = Sn(t), d = { id: a, kind: s, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (s === "image") return { ...d, mimeType: "image/jpeg", dataUrl: await Ro(t) };
  const i = t.name.split(".").pop()?.toLowerCase();
  let u;
  try {
    if (i === "pdf") u = await zo(t);
    else if (i === "docx") u = await Oo(t);
    else {
      const r = new Uint8Array(await t.arrayBuffer());
      u = new TextDecoder().decode(r), u.includes("�") && (u = new TextDecoder("gb18030").decode(r));
    }
  } catch (r) {
    throw new Error(r instanceof Error && /[\u4e00-\u9fff]/.test(r.message) ? r.message : "文件无法读取，请确认文件完整，或另存为 TXT 后重试。");
  }
  return { ...d, text: No(u) };
}
const Bo = {
  class: "vb-chat-page vb-simple-chat",
  "aria-label": "维衡AI助手对话"
}, Vo = { class: "vb-simple-header" }, Lo = { class: "vb-simple-actions" }, qo = { class: "vb-simple-date" }, Go = ["max", "disabled"], Jo = { class: "vb-simple-options" }, Ho = { "aria-label": "对话选项" }, Ko = { class: "vb-simple-options-panel" }, Wo = {
  key: 0,
  class: "vb-simple-history"
}, Yo = ["value"], Xo = { class: "vb-memory-toggle" }, Qo = ["disabled"], Zo = {
  key: 0,
  class: "vb-simple-welcome"
}, ea = { class: "vb-simple-starters" }, ta = ["onClick"], na = { class: "vb-simple-context" }, sa = {
  key: 1,
  class: "vb-simple-thread"
}, la = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, oa = { class: "vb-simple-message-body" }, aa = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, ia = ["aria-label", "onClick"], ra = ["src", "alt"], ua = {
  key: 1,
  class: "vb-simple-loading"
}, da = {
  key: 2,
  class: "vb-simple-text"
}, ca = {
  key: 0,
  class: "vb-simple-text"
}, va = {
  class: "vb-simple-error",
  role: "alert"
}, ma = ["onClick"], ba = {
  key: 4,
  class: "vb-simple-text"
}, pa = {
  key: 5,
  class: "vb-simple-message-meta"
}, ga = { class: "vb-simple-composer" }, fa = { class: "vb-simple-composer-inner" }, ya = {
  key: 0,
  class: "vb-simple-tools"
}, ha = { class: "vb-simple-quick" }, ka = { class: "vb-simple-quick-panel" }, wa = ["onClick"], $a = {
  key: 0,
  class: "vb-simple-status",
  role: "status"
}, _a = ["accept"], Aa = {
  key: 0,
  class: "vb-chat-draft-attachments",
  "aria-label": "待发送附件"
}, Ca = ["disabled", "aria-label", "onClick"], Ia = ["src", "alt"], Sa = {
  key: 0,
  role: "status"
}, xa = {
  key: 1,
  role: "alert"
}, Ea = { key: 2 }, Ua = ["aria-label", "onClick"], ja = { class: "vb-simple-editor-bottom" }, Da = { class: "vb-chat-input-tools" }, Na = ["disabled"], Pa = {
  key: 1,
  class: "vb-simple-notice",
  role: "alert"
}, Ma = ["role"], Ta = { class: "vb-simple-footnote" }, Ra = { class: "vb-simple-privacy" }, za = ["src", "alt"], Oa = {
  key: 1,
  class: "vb-chat-text-preview"
}, Fa = { class: "vb-data-note" }, sn = "weiheng.ai-diet-chat.v1", Ba = /* @__PURE__ */ Je({
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
        const C = JSON.parse(we.getItem(sn) || "null");
        if (!C || typeof C != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0 };
        const A = C, U = Array.isArray(A.threads) ? A.threads.flatMap((ne) => {
          if (!ne || typeof ne != "object") return [];
          const Q = ne;
          return typeof Q.id != "string" || !Fe(Q.date) || !Array.isArray(Q.messages) ? [] : [{
            id: Q.id,
            date: Q.date,
            createdAt: typeof Q.createdAt == "string" ? Q.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: Q.messages.filter((ce) => !!(ce && typeof ce == "object" && ["user", "assistant"].includes(ce.role) && typeof ce.content == "string")).map((ce) => ce.status === "sending" ? { ...ce, status: "failed", error: "页面刷新时请求中断。点击重试可继续这条问题。" } : ce)
          }];
        }) : [], X = A.activeByDate && typeof A.activeByDate == "object" ? Object.fromEntries(Object.entries(A.activeByDate).filter(([ne, Q]) => Fe(ne) && typeof Q == "string")) : {};
        return { threads: U.slice(-60), activeByDate: X, memoryEnabled: A.memoryEnabled !== !1 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0 };
      }
    }
    const u = i(), r = P(u.threads), v = P(u.activeByDate), m = P(u.memoryEnabled), c = P(ke()), p = P(""), y = P(null), h = P([]), k = P({}), R = P(null), N = H(() => h.value.some((C) => C.status === "ready"));
    let w = 0;
    const _ = P(""), D = P(""), z = P(null), M = H(() => r.value.some((C) => C.messages.some((A) => A.status === "sending"))), q = H(() => a.records.find((C) => C.date === c.value)), W = H(() => q.value?.entries || []), F = H(() => ({
      energy: typeof a.targets?.tdee == "number" ? a.targets.tdee : null,
      protein: a.targets?.macros?.find((C) => C.id === "protein")?.grams ?? null,
      carbs: a.targets?.macros?.find((C) => C.id === "carbs")?.grams ?? null,
      fat: a.targets?.macros?.find((C) => C.id === "fat")?.grams ?? null
    })), K = H(() => r.value.find((C) => C.id === v.value[c.value])), G = H(() => K.value?.messages || []), ye = H(() => r.value.filter((C) => C.date === c.value).sort((C, A) => A.createdAt.localeCompare(C.createdAt)));
    function re(C) {
      const { id: A, kind: U, name: X, size: ne, mimeType: Q } = C;
      return { id: A, kind: U, name: X, size: ne, mimeType: Q };
    }
    function fe(C) {
      return C >= 1024 * 1024 ? `${(C / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(C / 1024))} KB`;
    }
    async function Y(C) {
      const A = w;
      D.value = "";
      for (const U of C) {
        if (A !== w) break;
        if (h.value.length >= xo) {
          D.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let X;
        try {
          X = Sn(U);
        } catch (Q) {
          D.value = Q instanceof Error ? Q.message : "这个文件暂不支持。";
          continue;
        }
        const ne = d();
        h.value.push({ id: ne, kind: X, name: U.name.slice(0, 180), size: U.size, mimeType: U.type, status: "reading" });
        try {
          const Q = await Fo(U, ne);
          if (!h.value.some((be) => be.id === ne)) continue;
          if (h.value.reduce((be, xe) => be + (xe.value?.text?.length || 0), Q.text?.length || 0) > nn) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await Mo(Q);
          const ge = h.value.find((be) => be.id === ne);
          if (!ge) {
            await rt(ne);
            continue;
          }
          k.value[ne] = Q, ge.value = Q, ge.status = "ready";
        } catch (Q) {
          const ce = h.value.find((ge) => ge.id === ne);
          ce && (ce.status = "failed", ce.error = Q instanceof Error ? Q.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function B(C) {
      const A = C.target, U = Array.from(A.files || []);
      A.value = "", Y(U);
    }
    function E(C) {
      const A = Array.from(C.clipboardData?.files || []).filter((U) => U.type.startsWith("image/"));
      A.length && (C.preventDefault(), Y(A));
    }
    function se(C) {
      C.dataTransfer?.types.includes("Files") && C.preventDefault();
    }
    function ee(C) {
      const A = Array.from(C.dataTransfer?.files || []);
      A.length && (C.preventDefault(), Y(A));
    }
    function J(C) {
      h.value = h.value.filter((A) => A.id !== C), delete k.value[C], rt(C).catch(() => {
        D.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function I() {
      const C = h.value.flatMap((U) => U.status === "ready" && U.value ? [U.value] : []), A = new Set(C.map((U) => U.id));
      return h.value = h.value.filter((U) => !A.has(U.id)), C;
    }
    async function g(C) {
      try {
        const A = k.value[C.id] || await Ut(C.id);
        if (!A) throw new Error("附件已不在本地存储中，请重新添加。");
        R.value = A;
      } catch (A) {
        D.value = A instanceof Error ? A.message : "无法预览附件。";
      }
    }
    pe(() => G.value.flatMap((C) => C.attachments || []).map((C) => C.id).join(","), async () => {
      for (const C of G.value.flatMap((A) => A.attachments || []))
        if (!k.value[C.id])
          try {
            const A = await Ut(C.id);
            A && (k.value[C.id] = A);
          } catch {
          }
    }, { immediate: !0 });
    function f(C) {
      const A = { id: d(), date: C, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (r.value.push(A), r.value.length > 60) {
        const U = r.value.splice(0, r.value.length - 60);
        S(U.flatMap((X) => X.messages));
      }
      return v.value[C] = A.id, A;
    }
    function S(C) {
      for (const A of C.flatMap((U) => U.attachments || []))
        delete k.value[A.id], rt(A.id).catch(() => {
          _.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function ie(C) {
      const A = v.value[C];
      if (A && r.value.some((X) => X.id === A)) return;
      const U = r.value.filter((X) => X.date === C).sort((X, ne) => ne.createdAt.localeCompare(X.createdAt))[0];
      U ? v.value[C] = U.id : f(C);
    }
    ie(c.value), pe(c, (C) => {
      if (!Fe(C) || C > ke()) {
        c.value = ke();
        return;
      }
      ie(C), D.value = "";
    });
    let ae = !1;
    function st() {
      if (G.value.some((A) => A.status === "sending")) return;
      ae = !0;
      const C = i();
      r.value = C.threads, v.value = { ...C.activeByDate, ...v.value }, m.value = C.memoryEnabled, je(() => {
        ae = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", st), Xe(() => window.removeEventListener("weiheng-chat-synced", st));
    let Ie;
    function Se() {
      if (Ie && clearTimeout(Ie), Ie = void 0, !Le())
        try {
          we.setItem(sn, JSON.stringify({ threads: r.value, activeByDate: v.value, memoryEnabled: m.value })), _.value = "";
        } catch {
          _.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function lt() {
      ae || (Ie && clearTimeout(Ie), Ie = setTimeout(Se, 160));
    }
    pe([r, v, m], lt, { deep: !0 });
    function He() {
      Se();
    }
    typeof window < "u" && window.addEventListener("pagehide", He), Xe(() => {
      Se(), typeof window < "u" && window.removeEventListener("pagehide", He);
    }), pe(G, async () => {
      await je(), z.value && (z.value.scrollTop = z.value.scrollHeight);
    }, { deep: !0 });
    let _e;
    function wt() {
      const C = _e;
      C && (_e = void 0, C.controller.abort(), C.assistantMessage.status === "sending" && (C.assistantMessage.status = "failed", C.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), Se());
    }
    function $t(C) {
      const A = new Date(C);
      return Number.isNaN(A.getTime()) ? "新对话" : A.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function te(C) {
      const A = new Date(C);
      return Number.isNaN(A.getTime()) ? "" : A.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function L() {
      return W.value.map((C) => ({
        foodId: C.foodId,
        name: C.name,
        grams: C.grams,
        meal: C.meal,
        referenceConfirmed: C.referenceConfirmed
      }));
    }
    async function le(C, A) {
      const U = C.slice(0, A).filter((ge) => ge.status === "complete"), X = [];
      for (const { role: ge, content: be, attachments: xe } of U) {
        const Ee = { role: ge, content: be.slice(0, 1200), attachments: xe };
        ge === "user" ? X.at(-1)?.role === "user" ? X[X.length - 1] = Ee : X.push(Ee) : X.at(-1)?.role === "user" && X.push(Ee);
      }
      for (; X[0]?.role !== "user"; ) X.shift();
      const ne = X.slice(-11);
      for (; ne.reduce((ge, be) => ge + be.content.length, 0) > 9e3; ) ne.splice(0, 2);
      let Q = 0, ce = 0;
      for (let ge = ne.length - 1; ge >= 0; ge--) {
        const be = ne[ge], xe = [];
        let Ee = !1;
        for (const at of be.attachments || []) {
          const De = k.value[at.id] || await Ut(at.id);
          if (!De) {
            if (ge === ne.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Ee = !0;
            continue;
          }
          if (Q + (De.text?.length || 0) > nn || De.kind === "image" && ce >= jo) {
            Ee = !0;
            continue;
          }
          Q += De.text?.length || 0, De.kind === "image" && ce++, xe.push(De);
        }
        be.attachments = xe.length ? xe : void 0, Ee && (be.content = be.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return ne;
    }
    async function he(C, A, U = []) {
      const X = C.trim() || (U.length ? "请帮我分析这些附件。" : "");
      if (!X || X.length > 1200) return !1;
      wt(), ie(c.value);
      const ne = K.value;
      if (!ne) return !1;
      let Q, ce;
      if (A) {
        ce = ne.messages.findIndex((Re) => Re.id === A && Re.role === "assistant");
        const Te = ne.messages[ce - 1];
        if (ce < 1 || Te?.role !== "user")
          return D.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        Q = ne.messages[ce], Q.status = "sending", Q.error = void 0, Q.content = "";
      } else
        ne.messages.push({ id: d(), role: "user", content: X, attachments: U.length ? U.map(re) : void 0, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), Q = _o(ne.messages, d(), (/* @__PURE__ */ new Date()).toISOString()), ne.messages.length > 120 && S(ne.messages.splice(0, ne.messages.length - 120)), ce = ne.messages.length - 1;
      Se(), D.value = "";
      const ge = new AbortController(), be = { controller: ge, assistantMessage: Q };
      _e = be;
      const xe = c.value, Ee = L(), at = F.value, De = So(a.profile), Nn = Io(r.value, ne.id, m.value);
      try {
        const Te = await le(ne.messages, ce);
        if (_e !== be) return !1;
        if (Te.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const Re = await wn("chat", {
          date: xe,
          messages: Te,
          entries: Ee,
          targets: at,
          profile: De,
          memory: Nn
        }, (qe) => {
          _e === be && (qe.type === "delta" ? Q.content += qe.text : qe.type === "done" && (Q.model = qe.model, Q.context = qe.contextSummary, Q.createdAt = qe.generatedAt || (/* @__PURE__ */ new Date()).toISOString()));
        }, ge.signal);
        if (_e !== be) return !1;
        if (!Q.content.trim() || typeof Re.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return Q.model = Re.model, Q.context = Re.contextSummary, Q.createdAt = Re.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Q.status = "complete", Se(), !0;
      } catch (Te) {
        return _e !== be || (Q.status = "failed", Q.error = Te instanceof Error ? Te.message : "AI 暂时无法回复，请重试。", Se()), !1;
      } finally {
        _e === be && (_e = void 0);
      }
    }
    function ot() {
      const C = p.value.trim();
      if (!C && !N.value || C.length > 1200) return;
      const A = I();
      p.value = "", he(C, void 0, A);
    }
    function Gt(C) {
      p.value = C, je(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function En(C) {
      C.key === "Enter" && !C.shiftKey && !C.isComposing && (C.preventDefault(), ot());
    }
    function Un(C) {
      const A = G.value.findIndex((X) => X.id === C), U = G.value[A - 1];
      A > 0 && U?.role === "user" && he(U.content, C);
    }
    function jn() {
      w++, f(c.value);
      for (const C of h.value) J(C.id);
      D.value = "";
    }
    function Dn() {
      if (!window.confirm("清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。")) return;
      const C = r.value.flatMap((A) => A.messages.flatMap((U) => U.attachments || []));
      for (const A of C)
        delete k.value[A.id], rt(A.id).catch(() => {
          _.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      Hn(), r.value = [], v.value = {}, _.value = "", ie(c.value), D.value = "当前空间的聊天记录已清除。";
    }
    return (C, A) => (n(), l("section", Bo, [
      e("header", Vo, [
        A[13] || (A[13] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡AI助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", Lo, [
          e("label", qo, [
            x(T, {
              name: "calendar",
              size: 16
            }),
            A[7] || (A[7] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            Z(e("input", {
              "onUpdate:modelValue": A[0] || (A[0] = (U) => c.value = U),
              type: "date",
              max: b(ke)(),
              disabled: M.value,
              "aria-label": "选择饮食日期"
            }, null, 8, Go), [
              [ue, c.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: jn
          }, [
            x(T, {
              name: "plus",
              size: 16
            }),
            A[8] || (A[8] = j("新对话", -1))
          ]),
          e("details", Jo, [
            e("summary", Ho, [
              A[9] || (A[9] = j("更多", -1)),
              x(T, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", Ko, [
              ye.value.length > 1 ? (n(), l("label", Wo, [
                A[10] || (A[10] = j(" 切换本日对话 ", -1)),
                Z(e("select", {
                  "onUpdate:modelValue": A[1] || (A[1] = (U) => v.value[c.value] = U),
                  "aria-label": "切换本日对话"
                }, [
                  (n(!0), l(O, null, V(ye.value, (U) => (n(), l("option", {
                    key: U.id,
                    value: U.id
                  }, o($t(U.createdAt)) + " · " + o(U.messages.length ? `${U.messages.length} 条消息` : "空对话"), 9, Yo))), 128))
                ], 512), [
                  [$e, v.value[c.value]]
                ])
              ])) : $("", !0),
              e("label", Xo, [
                Z(e("input", {
                  "onUpdate:modelValue": A[2] || (A[2] = (U) => m.value = U),
                  type: "checkbox"
                }, null, 512), [
                  [ut, m.value]
                ]),
                A[11] || (A[11] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              A[12] || (A[12] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: M.value,
                onClick: Dn
              }, "清除本地记录", 8, Qo)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: z,
        class: me(["vb-simple-scroll", { "is-empty": !G.value.length }]),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        G.value.length ? (n(), l("div", sa, [
          (n(!0), l(O, null, V(G.value, (U) => (n(), l("article", {
            key: U.id,
            class: me(["vb-simple-message", [`is-${U.role}`, `is-${U.status}`]])
          }, [
            U.role === "assistant" ? (n(), l("span", la, [
              x(T, {
                name: "sparkles",
                size: 18
              })
            ])) : $("", !0),
            e("div", oa, [
              U.attachments?.length ? (n(), l("div", aa, [
                (n(!0), l(O, null, V(U.attachments, (X) => (n(), l("button", {
                  key: X.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + X.name,
                  onClick: (ne) => g(X)
                }, [
                  X.kind === "image" && k.value[X.id]?.dataUrl ? (n(), l("img", {
                    key: 0,
                    src: k.value[X.id].dataUrl,
                    alt: X.name
                  }, null, 8, ra)) : (n(), ve(T, {
                    key: 1,
                    name: X.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, o(X.name), 1),
                    e("small", null, o(X.kind === "image" ? "照片" : "文件文字") + " · " + o(fe(X.size)), 1)
                  ])
                ], 8, ia))), 128))
              ])) : $("", !0),
              U.status === "sending" && !U.content ? (n(), l("div", ua, [...A[16] || (A[16] = [
                e("span", { class: "vb-loading-ring" }, null, -1),
                e("span", null, "正在回复…", -1)
              ])])) : U.status === "sending" ? (n(), l("p", da, [
                j(o(U.content), 1),
                A[17] || (A[17] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : U.status === "failed" ? (n(), l(O, { key: 3 }, [
                U.content ? (n(), l("p", ca, o(U.content), 1)) : $("", !0),
                e("p", va, o(U.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (X) => Un(U.id)
                }, [
                  x(T, {
                    name: "activity",
                    size: 14
                  }),
                  A[18] || (A[18] = j("重试这条问题", -1))
                ], 8, ma)
              ], 64)) : (n(), l("p", ba, o(U.content), 1)),
              U.status === "complete" ? (n(), l("small", pa, [
                j(o(te(U.createdAt)), 1),
                U.role === "assistant" ? (n(), l(O, { key: 0 }, [
                  j(" · " + o(U.model || "DeepSeek"), 1)
                ], 64)) : $("", !0)
              ])) : $("", !0)
            ])
          ], 2))), 128))
        ])) : (n(), l("div", Zo, [
          A[14] || (A[14] = e("h2", null, "今天想聊些什么？", -1)),
          A[15] || (A[15] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", ea, [
            (n(), l(O, null, V(s, (U) => e("button", {
              key: U,
              type: "button",
              onClick: (X) => Gt(U)
            }, [
              e("span", null, o(U), 1),
              x(T, {
                name: "arrow",
                size: 16
              })
            ], 8, ta)), 64))
          ]),
          e("small", na, "饮食参考日期：" + o(c.value), 1)
        ]))
      ], 2),
      e("footer", ga, [
        e("div", fa, [
          G.value.length ? (n(), l("div", ya, [
            e("details", ha, [
              e("summary", null, [
                A[19] || (A[19] = j("快捷提问", -1)),
                x(T, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", ka, [
                (n(), l(O, null, V(s, (U) => e("button", {
                  key: U,
                  type: "button",
                  onClick: (X) => Gt(U)
                }, [
                  j(o(U), 1),
                  x(T, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, wa)), 64))
              ])
            ]),
            M.value ? (n(), l("span", $a, "正在回复，发送新消息可打断")) : $("", !0)
          ])) : $("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: se,
            onDrop: ee
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: y,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: b(Do),
              "aria-label": "选择照片或文件",
              onChange: B
            }, null, 40, _a),
            h.value.length ? (n(), l("div", Aa, [
              (n(!0), l(O, null, V(h.value, (U) => (n(), l("div", {
                key: U.id,
                class: me(["vb-chat-file", { "is-failed": U.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: U.status !== "ready",
                  "aria-label": "预览附件：" + U.name,
                  onClick: (X) => g(U)
                }, [
                  U.value?.dataUrl ? (n(), l("img", {
                    key: 0,
                    src: U.value.dataUrl,
                    alt: U.name
                  }, null, 8, Ia)) : (n(), ve(T, {
                    key: 1,
                    name: U.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, o(U.name), 1),
                    U.status === "reading" ? (n(), l("small", Sa, "正在读取…")) : U.status === "failed" ? (n(), l("small", xa, o(U.error), 1)) : (n(), l("small", Ea, o(fe(U.size)) + " · 待发送", 1))
                  ])
                ], 8, Ca),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + U.name,
                  onClick: (X) => J(U.id)
                }, [
                  x(T, {
                    name: "close",
                    size: 13
                  })
                ], 8, Ua)
              ], 2))), 128))
            ])) : $("", !0),
            A[22] || (A[22] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            Z(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": A[3] || (A[3] = (U) => p.value = U),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: En,
              onPaste: E
            }, null, 544), [
              [ue, p.value]
            ]),
            e("div", ja, [
              e("div", Da, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: A[4] || (A[4] = (U) => y.value?.click())
                }, [
                  x(T, {
                    name: "paperclip",
                    size: 18
                  }),
                  A[20] || (A[20] = e("span", null, "附件", -1))
                ]),
                A[21] || (A[21] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !p.value.trim() && !N.value,
                onClick: A[5] || (A[5] = (U) => ot())
              }, [
                x(T, {
                  name: "arrow",
                  size: 16
                }),
                j(o(M.value ? "打断并发送" : "发送"), 1)
              ], 8, Na)
            ])
          ], 32),
          b(Ce) && b(Jn) === "error" ? (n(), l("p", Pa, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : $("", !0),
          _.value || D.value ? (n(), l("p", {
            key: 2,
            class: "vb-simple-notice",
            role: _.value ? "alert" : "status"
          }, o(_.value || D.value), 9, Ma)) : $("", !0),
          e("div", Ta, [
            e("details", Ra, [
              e("summary", null, [
                x(T, {
                  name: "lock",
                  size: 12
                }),
                A[23] || (A[23] = j("隐私与使用说明", -1))
              ]),
              A[24] || (A[24] = e("div", { class: "vb-simple-privacy-panel" }, [
                e("p", null, "附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。"),
                e("p", null, "选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给 DeepSeek，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。"),
                e("p", null, "点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 DeepSeek 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。"),
                e("p", null, "跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。"),
                e("p", null, "饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。")
              ], -1))
            ]),
            e("span", null, o(p.value.length ? `${p.value.length}/1200` : "AI 内容仅供参考"), 1)
          ])
        ])
      ]),
      R.value ? (n(), ve(nt, {
        key: 0,
        title: R.value.name,
        wide: "",
        onClose: A[6] || (A[6] = (U) => R.value = null)
      }, {
        default: tt(() => [
          R.value.kind === "image" ? (n(), l("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: R.value.dataUrl,
            alt: R.value.name
          }, null, 8, za)) : (n(), l("pre", Oa, o(R.value.text), 1)),
          e("p", Fa, o(R.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : $("", !0)
    ]));
  }
}), Va = (t, a) => {
  const s = t.__vccOpts || t;
  for (const [d, i] of a)
    s[d] = i;
  return s;
}, La = /* @__PURE__ */ Va(Ba, [["__scopeId", "data-v-9b7cb08e"]]), qa = {
  key: 0,
  class: "vb-page-title"
}, Ga = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, Ja = ["aria-pressed", "onClick"], Ha = { class: "vb-glass vb-review-hero" }, Ka = { class: "vb-icon-badge vb-large-badge" }, Wa = { class: "vb-small-label" }, Ya = { class: "vb-coverage-score" }, Xa = { class: "vb-assessment-grid" }, Qa = { class: "vb-glass vb-coverage-card" }, Za = { class: "vb-section-heading" }, ei = { class: "vb-coverage-list" }, ti = { class: "vb-food-category-icon" }, ni = { class: "vb-coverage-name" }, si = { key: 0 }, li = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, oi = { class: "vb-inline-note" }, ai = { class: "vb-glass vb-suggestion-card" }, ii = ["checked", "onChange"], ri = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, ui = { class: "vb-empty-icon" }, di = { class: "vb-glass vb-supplement-card" }, ci = { class: "vb-icon-badge" }, vi = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const a = t, s = P(a.records[0]?.date || "");
    pe(() => a.records, (y) => {
      y.some((h) => h.date === s.value) || (s.value = y[0]?.date || "");
    });
    const d = H(() => a.records.find((y) => y.date === s.value)), i = (y) => Number(d.value?.foods?.[y]) || 0, u = H(() => At.filter((y) => i(y.key) <= 0)), r = H(() => At.length - u.value.length), v = H(() => Math.max(1, ...bt.map((y) => i(y.key)))), m = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, c = H(() => (u.value.length ? u.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map((y) => ({ key: y.key, title: m[y.key]?.[0] || (y.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: m[y.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), p = (y) => (a.habits[s.value] || []).includes(y);
    return (y, h) => (n(), l(O, null, [
      t.embedded ? $("", !0) : (n(), l("div", qa, [
        h[4] || (h[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: h[0] || (h[0] = (k) => y.$emit("navigate", "diary"))
        }, [
          x(T, {
            name: "plus",
            size: 17
          }),
          h[3] || (h[3] = j("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (n(), l("div", Ga, [
        (n(!0), l(O, null, V(t.records.slice(0, 7), (k) => (n(), l("button", {
          key: k.date,
          class: me({ selected: s.value === k.date }),
          "aria-pressed": s.value === k.date,
          onClick: (R) => s.value = k.date
        }, o(k.date), 11, Ja))), 128))
      ])) : $("", !0),
      d.value ? (n(), l(O, { key: 2 }, [
        e("section", Ha, [
          e("span", Ka, [
            x(T, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", Wa, o(d.value.date) + " · 饮食回顾", 1),
            e("h2", null, o(u.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, o(u.value.length ? u.value.map((k) => k.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", Ya, [
            e("strong", null, [
              j(o(r.value), 1),
              e("small", null, " / " + o(b(At).length), 1)
            ]),
            h[5] || (h[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", Xa, [
          e("section", Qa, [
            e("div", Za, [
              h[6] || (h[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              x(T, { name: "chart" })
            ]),
            e("div", ei, [
              (n(!0), l(O, null, V(b(bt), (k) => (n(), l("div", {
                key: k.key,
                class: "vb-coverage-row"
              }, [
                e("span", ti, [
                  x(T, {
                    name: b(mn)[k.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", ni, [
                  j(o(k.name), 1),
                  k.key === "snacks" ? (n(), l("small", si, "可选记录")) : $("", !0)
                ]),
                e("span", li, [
                  e("i", {
                    style: an({ width: i(k.key) / v.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: me(["vb-coverage-value", { "is-missing": !i(k.key) }])
                }, o(i(k.key) ? `${Math.round(i(k.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", oi, [
              x(T, {
                name: "info",
                size: 15
              }),
              h[7] || (h[7] = j("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", ai, [
            h[8] || (h[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (n(!0), l(O, null, V(c.value, (k) => (n(), l("label", {
              key: k.key,
              class: me(["vb-check-row", { done: p(k.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: p(k.key),
                onChange: (R) => y.$emit("toggle-habit", s.value, k.key)
              }, null, 40, ii),
              e("span", null, [
                e("strong", null, o(k.title), 1),
                e("small", null, o(k.detail), 1)
              ])
            ], 2))), 128)),
            h[9] || (h[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (n(), l("section", ri, [
        e("span", ui, [
          x(T, {
            name: "bowl",
            size: 36
          })
        ]),
        h[11] || (h[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        h[12] || (h[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: h[1] || (h[1] = (k) => y.$emit("navigate", "diary"))
        }, [
          h[10] || (h[10] = j("记录今天的饮食", -1)),
          x(T, {
            name: "arrow",
            size: 17
          })
        ])
      ])),
      e("section", di, [
        e("span", ci, [
          x(T, {
            name: "shield",
            size: 23
          })
        ]),
        e("div", null, [
          h[13] || (h[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, o(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, o(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: h[2] || (h[2] = (k) => y.$emit("navigate", "about"))
        }, [
          h[14] || (h[14] = j("查看注意事项", -1)),
          x(T, {
            name: "arrow",
            size: 17
          })
        ])
      ])
    ], 64));
  }
}, mi = {
  key: 0,
  class: "vb-page-title"
}, bi = { class: "vb-date-input" }, pi = {
  key: 1,
  class: "vb-report-toolbar"
}, gi = { class: "vb-date-input" }, fi = {
  key: 2,
  class: "vb-report-filter"
}, yi = {
  key: 3,
  class: "vb-report-list"
}, hi = { class: "vb-report-card-top" }, ki = { class: "vb-icon-badge" }, wi = {
  key: 0,
  class: "vb-feature-error"
}, $i = {
  key: 1,
  class: "vb-inline-warning"
}, _i = { class: "vb-report-card-actions" }, Ai = ["onClick"], Ci = ["disabled", "onClick"], Ii = {
  key: 4,
  class: "vb-glass vb-report-empty"
}, Si = { class: "vb-icon-badge" }, xi = /* @__PURE__ */ Je({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = P(""), { isStale: u } = Bt(), r = H(() => s.reports.filter((c) => !i.value || c.date === i.value));
    function v(c) {
      return s.records.find((p) => p.date === c.date);
    }
    function m(c) {
      return u(c, v(c), s.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[c.status];
    }
    return (c, p) => (n(), l(O, null, [
      t.embedded ? (n(), l("div", pi, [
        p[5] || (p[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", gi, [
          x(T, {
            name: "calendar",
            size: 18
          }),
          Z(e("input", {
            "onUpdate:modelValue": p[1] || (p[1] = (y) => i.value = y),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ue, i.value]
          ])
        ])
      ])) : (n(), l("div", mi, [
        p[4] || (p[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", bi, [
          x(T, {
            name: "calendar",
            size: 18
          }),
          Z(e("input", {
            "onUpdate:modelValue": p[0] || (p[0] = (y) => i.value = y),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ue, i.value]
          ])
        ])
      ])),
      p[9] || (p[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给 DeepSeek；照片和备注不随每日分析发送。", -1)),
      i.value ? (n(), l("div", fi, [
        e("span", null, o(r.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: p[2] || (p[2] = (y) => i.value = "")
        }, "清除日期筛选")
      ])) : $("", !0),
      r.value.length ? (n(), l("div", yi, [
        (n(!0), l(O, null, V(r.value, (y) => (n(), l("article", {
          key: y.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", hi, [
            e("span", ki, [
              x(T, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, o(y.date), 1),
              e("small", null, o(new Date(y.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: me(["vb-pill", { "needs-update": m(y) === "需更新" }])
            }, o(m(y)), 3)
          ]),
          e("p", null, o(y.result?.summary || y.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          v(y) ? b(u)(y, v(y), t.profile) ? (n(), l("small", $i, "记录或个人目标已变化，此报告使用的是旧版本。")) : $("", !0) : (n(), l("small", wi, "对应记录已删除，保留报告快照。")),
          e("div", _i, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (h) => d("open", y.date, y.id)
            }, [
              p[6] || (p[6] = j("打开报告", -1)),
              x(T, {
                name: "arrow",
                size: 15
              })
            ], 8, Ai),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: y.status === "pending" || !v(y),
              onClick: (h) => d("retry", y.date)
            }, "重新分析", 8, Ci)
          ])
        ]))), 128))
      ])) : (n(), l("section", Ii, [
        e("span", Si, [
          x(T, {
            name: "report",
            size: 25
          })
        ]),
        e("h2", null, o(i.value ? "这一天还没有报告" : "从记录第一餐开始"), 1),
        p[8] || (p[8] = e("p", null, "保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: p[3] || (p[3] = (y) => d("navigate", "diary"))
        }, [
          p[7] || (p[7] = j("去记录饮食", -1)),
          x(T, {
            name: "arrow",
            size: 17
          })
        ])
      ]))
    ], 64));
  }
}), Ei = { class: "vb-page-title" }, Ui = {
  class: "vb-assessment-block",
  "aria-labelledby": "diet-assessment-heading"
}, ji = {
  class: "vb-assessment-block vb-assessment-reports",
  "aria-labelledby": "ai-report-heading"
}, Di = /* @__PURE__ */ Je({
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
    return (i, u) => (n(), l(O, null, [
      e("div", Ei, [
        u[6] || (u[6] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从饮食回顾到 AI 分析"),
          e("h1", null, "营养摄入分析与不足风险提示"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: u[0] || (u[0] = (r) => s("navigate", "diary"))
        }, [
          x(T, {
            name: "plus",
            size: 17
          }),
          u[5] || (u[5] = j("添加饮食记录 ", -1))
        ])
      ]),
      x(Fn, {
        records: t.records,
        profile: t.profile || void 0
      }, null, 8, ["records", "profile"]),
      e("section", Ui, [
        u[7] || (u[7] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "饮食结构回顾"),
            e("h2", { id: "diet-assessment-heading" }, "食物类别评估")
          ]),
          e("span", { class: "vb-subtle-label" }, "按已保存记录统计")
        ], -1)),
        x(vi, {
          records: t.records,
          habits: t.habits,
          flags: t.flags,
          embedded: "",
          onNavigate: u[1] || (u[1] = (r) => s("navigate", r)),
          onToggleHabit: u[2] || (u[2] = (r, v) => s("toggleHabit", r, v))
        }, null, 8, ["records", "habits", "flags"])
      ]),
      e("section", ji, [
        u[8] || (u[8] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "每日 AI 分析"),
            e("h2", { id: "ai-report-heading" }, "AI 营养报告")
          ]),
          e("span", { class: "vb-subtle-label" }, "可按日期筛选、查看和重试")
        ], -1)),
        x(xi, {
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
}), Ni = { class: "vb-photo-picker" }, Pi = {
  key: 0,
  class: "vb-photo-preview"
}, Mi = ["src"], Ti = { class: "vb-photo-actions" }, Ri = ["disabled"], zi = ["disabled"], Oi = {
  key: 1,
  class: "vb-photo-hint",
  role: "status"
}, Fi = {
  key: 2,
  class: "vb-photo-error",
  role: "alert"
}, Bi = ["src"], Vi = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: a }) {
    const s = a, d = P(!1), i = P(null), u = P(null), r = P(""), v = P(!1);
    function m(R) {
      return new Promise((N, w) => {
        const _ = URL.createObjectURL(R), D = new Image();
        D.onload = () => N({ image: D, url: _ }), D.onerror = () => {
          URL.revokeObjectURL(_), w(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, D.src = _;
      });
    }
    function c(R, N) {
      return new Promise((w, _) => R.toBlob((D) => D ? w(D) : _(new Error("图片处理失败，请重新选择。")), "image/jpeg", N));
    }
    function p(R) {
      return new Promise((N, w) => {
        const _ = new FileReader();
        _.onload = () => N(_.result), _.onerror = () => w(new Error("图片读取失败，请重新选择。")), _.readAsDataURL(R);
      });
    }
    async function y(R) {
      let N;
      try {
        const w = await createImageBitmap(R);
        N = { image: w, width: w.width, height: w.height, cleanup: () => w.close() };
      } catch {
        const w = await m(R);
        N = { image: w.image, width: w.image.naturalWidth, height: w.image.naturalHeight, cleanup: () => URL.revokeObjectURL(w.url) };
      }
      try {
        const w = Math.min(1, 1200 / Math.max(N.width, N.height)), _ = document.createElement("canvas");
        _.width = Math.max(1, Math.round(N.width * w)), _.height = Math.max(1, Math.round(N.height * w));
        const D = _.getContext("2d");
        if (!D) throw new Error("浏览器暂不支持图片预览。");
        D.drawImage(N.image, 0, 0, _.width, _.height);
        let z = await c(_, 0.76);
        if (z.size > 32e4 && (z = await c(_, 0.58)), z.size > 32e4) {
          const M = document.createElement("canvas");
          M.width = Math.round(_.width * 0.75), M.height = Math.round(_.height * 0.75), M.getContext("2d")?.drawImage(_, 0, 0, M.width, M.height), z = await c(M, 0.58);
        }
        return await p(z);
      } finally {
        N.cleanup();
      }
    }
    async function h(R, N) {
      const w = R.target, _ = w.files?.[0];
      if (w.value = "", !!_) {
        if (r.value = "", !_.type.startsWith("image/") || _.type === "image/svg+xml") {
          r.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if (_.size > 12 * 1024 * 1024) {
          r.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        v.value = !0;
        try {
          const D = await y(_), z = { name: _.name.slice(0, 100), dataUrl: D, source: N, mime: "image/jpeg" };
          s("update:modelValue", z), s("selected", z);
        } catch (D) {
          r.value = D instanceof Error ? D.message : "无法处理这张图片，请重新选择。";
        } finally {
          v.value = !1;
        }
      }
    }
    function k() {
      r.value = "", s("update:modelValue", null);
    }
    return (R, N) => (n(), l("div", Ni, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: N[0] || (N[0] = (w) => h(w, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: u,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: N[1] || (N[1] = (w) => h(w, "本地图片"))
      }, null, 544),
      t.modelValue ? (n(), l("div", Pi, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: N[2] || (N[2] = (w) => d.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, Mi)
        ]),
        e("span", null, [
          e("strong", null, o(t.modelValue.name), 1),
          e("small", null, o(t.modelValue.source) + " · 点击图片查看大图", 1)
        ]),
        e("button", {
          type: "button",
          class: "vb-icon-button",
          "aria-label": "移除照片",
          onClick: k
        }, [
          x(T, {
            name: "close",
            size: 15
          })
        ])
      ])) : $("", !0),
      e("div", Ti, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: v.value,
          onClick: N[3] || (N[3] = (w) => i.value?.click())
        }, [
          x(T, {
            name: "camera",
            size: 17
          }),
          N[6] || (N[6] = j("拍照", -1))
        ], 8, Ri),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: v.value,
          onClick: N[4] || (N[4] = (w) => u.value?.click())
        }, [
          x(T, {
            name: "upload",
            size: 17
          }),
          j(o(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, zi)
      ]),
      v.value ? (n(), l("p", Oi, "正在准备图片…")) : r.value ? (n(), l("p", Fi, o(r.value), 1)) : $("", !0),
      d.value && t.modelValue ? (n(), ve(nt, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: N[5] || (N[5] = (w) => d.value = !1)
      }, {
        default: tt(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, Bi)
        ]),
        _: 1
      })) : $("", !0)
    ]));
  }
}, Li = { class: "vb-glass vb-photo-card" }, qi = { class: "vb-aside-heading" }, Gi = { class: "vb-photo-badge" }, Ji = {
  key: 0,
  class: "vb-feature-error",
  role: "alert"
}, Hi = {
  key: 1,
  class: "vb-ai-progress",
  role: "status"
}, Ki = {
  key: 2,
  class: "vb-recognition-failed"
}, Wi = {
  class: "vb-feature-error",
  role: "alert"
}, Yi = {
  key: 4,
  class: "vb-recognition-results"
}, Xi = { class: "vb-data-note" }, Qi = {
  key: 0,
  class: "vb-recognition-meta"
}, Zi = { key: 0 }, er = { class: "vb-recognized-list" }, tr = ["value", "disabled", "aria-label", "onInput"], nr = ["aria-label", "onClick"], sr = {
  key: 0,
  class: "vb-recognition-matches"
}, lr = ["onClick"], or = { class: "vb-recognition-weight" }, ar = ["onUpdate:modelValue", "disabled", "aria-label"], ir = {
  key: 1,
  class: "vb-data-note"
}, rr = { class: "vb-recognition-actions" }, ur = ["disabled"], dr = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object },
  emits: ["confirm"],
  setup(t, { emit: a }) {
    const s = t, d = a, { state: i } = Ot(), u = P(null), r = P("");
    let v = "";
    const m = H(() => s.draft.recognition), c = H(() => {
      const z = m.value?.generatedAt;
      if (!z) return "";
      const M = new Date(z);
      return Number.isNaN(M.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(M);
    }), p = H(() => m.value?.items?.length && !m.value.confirmed && m.value.items.every((z) => z.name?.trim() && Number.isFinite(Number(z.grams)) && Number(z.grams) >= 0.1 && Number(z.grams) <= 5e3));
    pe(() => [s.draft.date, s.draft.photoId], async ([z, M]) => {
      r.value = "", u.value = null, s.draft.recognition?.status === "pending" && v !== s.draft.recognition.requestId && (s.draft.recognition = { ...s.draft.recognition, status: "failed", error: "上次识别未完成，请重新识别。" });
      try {
        if (M) {
          const q = await ss("photos", M);
          s.draft.date === z && s.draft.photoId === M && (u.value = q || null);
        } else if (s.legacyPhoto?.dataUrl) {
          const q = { ...s.legacyPhoto, id: crypto.randomUUID(), date: z };
          await Pt("photos", q), s.draft.date === z && (s.draft.photoId = q.id, u.value = q);
        }
      } catch (q) {
        r.value = q.message, u.value = s.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function y(z) {
      u.value = z, z || h();
    }
    async function h() {
      const z = s.draft.photoId;
      if (s.draft.photoId = null, s.draft.recognition = null, v = "", z && !i.records.some((M) => M.photoId === z) && !Object.values(i.drafts).some((M) => M.photoId === z)) try {
        await os("photos", z);
      } catch (M) {
        r.value = M.message;
      }
    }
    async function k(z) {
      const M = s.draft.date, q = crypto.randomUUID();
      r.value = "";
      try {
        const W = { ...z, id: q, date: M, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await Pt("photos", W), s.draft.date !== M) return;
        u.value = W, s.draft.photoId = q, s.draft.recognition = null, await R(W);
      } catch (W) {
        r.value = W.message;
      }
    }
    async function R(z = u.value) {
      if (!z?.dataUrl || m.value?.status === "pending") return;
      const M = s.draft, q = M.photoId, W = crypto.randomUUID();
      v = W, M.recognition = { requestId: W, photoId: q, status: "pending", items: [], error: "", confirmed: !1 };
      try {
        const F = await ht("recognize", { image: z.dataUrl, requestId: q || W });
        if (M.photoId !== q || M.recognition?.requestId !== W) return;
        M.recognition = { ...F, requestId: W, photoId: q, status: "complete", error: "", confirmed: !1 };
      } catch (F) {
        M.photoId === q && M.recognition?.requestId === W && (M.recognition = { ...M.recognition, status: "failed", error: F.message });
      } finally {
        v === W && (v = "");
      }
    }
    function N(z, M) {
      z.name = M.target.value, z.foodId = null;
    }
    function w(z, M) {
      z.foodId = M.key, z.name = M.name;
    }
    function _() {
      s.draft.recognition = { ...s.draft.recognition, status: "complete", recognitionId: s.draft.recognition?.recognitionId || crypto.randomUUID(), items: s.draft.recognition?.items || [], confirmed: !1, error: "", note: s.draft.recognition?.note || "手动补充，请核对名称与份量。" }, s.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function D() {
      p.value && d("confirm", { batchId: m.value.recognitionId, items: m.value.items.map((z) => ({ ...z, estimated: !0, source: "photo" })) });
    }
    return (z, M) => (n(), l("section", Li, [
      e("div", qi, [
        M[2] || (M[2] = e("div", null, [
          e("h2", null, "这一餐的照片"),
          e("p", null, "拍一餐，核对后再记入。")
        ], -1)),
        e("span", Gi, [
          x(T, {
            name: "camera",
            size: 16
          })
        ])
      ]),
      M[6] || (M[6] = e("p", { class: "vb-photo-disclosure" }, "选择照片后自动识别：压缩照片会经本地后端发送给 DeepSeek。照片与识别结果保存在当前浏览器。", -1)),
      x(Vi, {
        "model-value": u.value,
        "onUpdate:modelValue": y,
        onSelected: k
      }, null, 8, ["model-value"]),
      r.value ? (n(), l("p", Ji, o(r.value), 1)) : $("", !0),
      m.value?.status === "pending" ? (n(), l("div", Hi, [...M[3] || (M[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : $("", !0),
      m.value?.status === "failed" ? (n(), l("div", Ki, [
        e("p", Wi, o(m.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: M[0] || (M[0] = (q) => R())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: _
          }, "手动录入")
        ])
      ])) : $("", !0),
      u.value && !m.value ? (n(), l("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: M[1] || (M[1] = (q) => R())
      }, "开始 AI 识别")) : $("", !0),
      m.value?.status === "complete" ? (n(), l("div", Yi, [
        e("p", Xi, o(m.value.note || "请核对食物名称与份量。") + " 照片重量为估算，营养数值只按确认的数据库条目计算。", 1),
        m.value.model ? (n(), l("small", Qi, [
          j("由 " + o(m.value.model) + " 识别", 1),
          c.value ? (n(), l("span", Zi, " · " + o(c.value), 1)) : $("", !0)
        ])) : $("", !0),
        e("div", er, [
          (n(!0), l(O, null, V(m.value.items, (q, W) => (n(), l("div", {
            key: q.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: q.name,
                disabled: m.value.confirmed,
                "aria-label": "识别食物" + (W + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (F) => N(q, F)
              }, null, 40, tr),
              m.value.confirmed ? $("", !0) : (n(), l("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (W + 1),
                onClick: (F) => m.value.items.splice(W, 1)
              }, [
                x(T, {
                  name: "close",
                  size: 14
                })
              ], 8, nr))
            ]),
            !q.foodId && !m.value.confirmed ? (n(), l("div", sr, [
              (n(!0), l(O, null, V(b(Rt)(q.name, 3), (F) => (n(), l("button", {
                key: F.key,
                type: "button",
                onClick: (K) => w(q, F)
              }, o(F.name), 9, lr))), 128))
            ])) : $("", !0),
            e("label", or, [
              M[4] || (M[4] = j("估算可食部", -1)),
              Z(e("input", {
                "onUpdate:modelValue": (F) => q.grams = F,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: m.value.confirmed,
                "aria-label": "识别食物" + (W + 1) + "克数",
                placeholder: "克数"
              }, null, 8, ar), [
                [ue, q.grams]
              ]),
              M[5] || (M[5] = j("克", -1))
            ]),
            e("small", {
              class: me({ "vb-unmatched": !q.foodId })
            }, o(q.foodId ? "数据库：" + b(oe)[q.foodId]?.state : "未匹配数据库，营养指标暂无数据"), 3),
            e("small", null, o(q.uncertainty), 1)
          ]))), 128))
        ]),
        m.value.items.length ? $("", !0) : (n(), l("p", ir, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", rr, [
          m.value.confirmed ? $("", !0) : (n(), l("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: _
          }, "＋补充遗漏食物")),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !p.value,
            onClick: D
          }, o(m.value.confirmed ? "已加入本次选择" : "确认并加入记录"), 9, ur)
        ])
      ])) : $("", !0)
    ]));
  }
}, cr = { class: "vb-diary-page" }, vr = { class: "vb-page-title" }, mr = { class: "vb-date-input" }, br = ["max"], pr = {
  key: 0,
  class: "vb-diary-grid"
}, gr = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, fr = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], yr = { class: "vb-section-heading" }, hr = { class: "vb-pill" }, kr = {
  key: 0,
  class: "vb-selected-list"
}, wr = {
  key: 1,
  class: "vb-muted-empty"
}, $r = { class: "vb-section-heading" }, _r = {
  key: 0,
  class: "vb-history-list"
}, Ar = ["aria-label", "onClick"], Cr = ["onClick"], Ir = ["aria-label", "onClick"], Sr = {
  key: 1,
  class: "vb-muted-empty"
}, xr = { class: "vb-diary-actions" }, Er = ["disabled"], Ur = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, jr = { class: "vb-section-heading" }, Dr = { class: "vb-diary-search-row" }, Nr = { class: "vb-search-field" }, Pr = { class: "vb-meal-select" }, Mr = ["value"], Tr = {
  key: 0,
  class: "vb-search-results"
}, Rr = ["onClick"], zr = {
  key: 0,
  class: "vb-search-empty"
}, Or = { class: "vb-diary-entry-heading" }, Fr = {
  key: 1,
  class: "vb-diary-entries"
}, Br = { class: "vb-diary-entry-title" }, Vr = ["onClick"], Lr = ["onUpdate:modelValue", "aria-label"], qr = ["aria-label", "onClick"], Gr = { class: "vb-data-note" }, Jr = {
  key: 0,
  class: "vb-pill"
}, Hr = { class: "vb-entry-controls" }, Kr = ["onUpdate:modelValue", "aria-label"], Wr = { class: "vb-entry-meal" }, Yr = ["onUpdate:modelValue"], Xr = ["value"], Qr = { key: 0 }, Zr = ["onUpdate:modelValue"], eu = ["value"], tu = {
  key: 0,
  class: "vb-inline-warning"
}, nu = ["onClick"], su = {
  key: 2,
  class: "vb-muted-empty"
}, lu = ["onToggle"], ou = { key: 0 }, au = ["onClick"], iu = ["onClick"], ru = { class: "vb-field vb-notes-field" }, uu = { class: "vb-intake-more" }, du = { key: 0 }, cu = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: a }) {
    const s = t, d = a, { state: i, ensureDraft: u, addToDraft: r } = Ot(), { isStale: v } = Bt(), m = Ye({}), c = Ye({}), p = P(s.initialDate || ke()), y = P(""), h = P("unspecified"), k = P("selected"), R = P(null), N = P("");
    pe(() => s.initialDate, (Y) => {
      Y && (p.value = Y);
    }), pe(p, (Y) => {
      u(Y), N.value = "", y.value = "";
    }, { immediate: !0 });
    const w = H(() => i.drafts[p.value]), _ = H(() => Ht(w.value?.entries)), D = H(() => Rt(y.value, 8)), z = H(() => s.records.find((Y) => Y.date === p.value)), M = (Y) => s.reports.find((B) => B.date === Y), q = /* @__PURE__ */ new Set();
    async function W(Y) {
      const B = p.value, E = Ae(), se = h.value, ee = B + ":" + Y.key;
      if (!q.has(ee)) {
        q.add(ee);
        try {
          if (await Ve(Y.key), p.value !== B || Ae() !== E) return;
          r({ date: B, foodId: Y.key, grams: Y.grams || 100, meal: se }), y.value = "", k.value = "selected";
        } catch (J) {
          N.value = J.message;
        } finally {
          q.delete(ee);
        }
      }
    }
    function F() {
      w.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: y.value.trim(), grams: 100, meal: h.value, group: "snacks", source: "manual", referenceConfirmed: !0 }), y.value = "";
    }
    async function K({ items: Y, batchId: B }) {
      const E = p.value, se = Ae();
      if (w.value.appliedBatches.includes(B)) return;
      try {
        await Ve(Y.map((J) => J.foodId));
      } catch (J) {
        N.value = J.message;
        return;
      }
      if (p.value !== E || Ae() !== se || w.value.appliedBatches.includes(B)) return;
      const ee = Ht(Y.map((J) => ({ ...J, id: crypto.randomUUID(), meal: h.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: ft(oe[J.foodId]) })));
      if (ee.length !== Y.length) {
        N.value = "请核对每项食物名称与克数。";
        return;
      }
      w.value.entries.push(...ee), w.value.appliedBatches.push(B), w.value.recognition.confirmed = !0, k.value = "selected";
    }
    function G() {
      if (!s.saving) {
        if (N.value = "", _.value.length !== w.value.entries.length) {
          N.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
          return;
        }
        d("save", JSON.parse(JSON.stringify(w.value)));
      }
    }
    function ye(Y) {
      k.value = Y, matchMedia("(max-width:950px)").matches && je(() => R.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function re(Y) {
      const B = ["ArrowRight", "ArrowDown", "End"].includes(Y.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(Y.key) ? "selected" : null;
      B && (Y.preventDefault(), ye(B), je(() => document.getElementById("vb-tab-" + B)?.focus()));
    }
    function fe(Y) {
      const B = M(Y.date);
      return B ? v(B, Y, s.profile) ? "报告需更新" : B.status === "pending" ? "分析中" : B.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (Y, B) => (n(), l("div", cr, [
      e("div", vr, [
        B[8] || (B[8] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "一餐一记，慢慢更了解自己"),
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", mr, [
          x(T, {
            name: "calendar",
            size: 18
          }),
          Z(e("input", {
            "onUpdate:modelValue": B[0] || (B[0] = (E) => p.value = E),
            type: "date",
            max: b(ke)(),
            "aria-label": "饮食记录日期"
          }, null, 8, br), [
            [ue, p.value]
          ])
        ])
      ]),
      w.value ? (n(), l("div", pr, [
        e("aside", gr, [
          (n(), ve(dr, {
            key: p.value,
            draft: w.value,
            "legacy-photo": z.value?.photo,
            onConfirm: K
          }, null, 8, ["draft", "legacy-photo"])),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: re
          }, [
            (n(!0), l(O, null, V([["selected", "本次选择", _.value.length], ["history", "最近记录", t.records.length]], ([E, se, ee]) => (n(), l("button", {
              id: "vb-tab-" + E,
              key: E,
              type: "button",
              role: "tab",
              "aria-selected": k.value === E,
              "aria-controls": "vb-panel-" + E,
              tabindex: k.value === E ? 0 : -1,
              class: me({ selected: k.value === E }),
              onClick: (J) => ye(E)
            }, [
              j(o(se), 1),
              e("span", null, o(ee), 1)
            ], 10, fr))), 128))
          ], 32),
          k.value === "selected" ? (n(), l("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: R,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", yr, [
              e("div", null, [
                B[9] || (B[9] = e("h2", null, "本次选择", -1)),
                e("p", null, o(p.value), 1)
              ]),
              e("span", hr, o(_.value.length) + " 项", 1)
            ]),
            x(Tt, {
              entries: _.value,
              compact: ""
            }, null, 8, ["entries"]),
            _.value.length ? (n(), l("div", kr, [
              (n(!0), l(O, null, V(_.value, (E) => (n(), l("div", {
                key: E.id
              }, [
                e("span", null, [
                  j(o(E.name), 1),
                  e("small", null, o(b(dt).find(([se]) => se === E.meal)?.[1]) + o(E.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  j(o(E.grams), 1),
                  B[10] || (B[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (n(), l("p", wr, "选择食物后，会在这里汇总。"))
          ], 512)) : (n(), l("section", {
            key: 1,
            id: "vb-panel-history",
            ref_key: "asidePanel",
            ref: R,
            class: "vb-glass vb-aside-panel vb-history-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-history",
            tabindex: "0"
          }, [
            e("div", $r, [
              B[11] || (B[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              x(T, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (n(), l("div", _r, [
              (n(!0), l(O, null, V(t.records.slice(0, 12), (E) => (n(), l("div", {
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
                    e("strong", null, o(E.date), 1),
                    e("small", null, o(Object.values(E.foods || {}).filter((se) => Number(se) > 0).length) + " 类食物", 1)
                  ])
                ], 8, Ar),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (se) => Y.$emit("analysis", E.date)
                }, o(fe(E)), 9, Cr),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + E.date + "的记录",
                  onClick: (se) => Y.$emit("remove", E.date)
                }, [
                  x(T, {
                    name: "close",
                    size: 14
                  })
                ], 8, Ir)
              ]))), 128))
            ])) : (n(), l("p", Sr, "你的第一天记录，从今天开始。"))
          ], 512)),
          e("div", xr, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving
            }, [
              j(o(t.saving ? "正在保存…" : "保存记录"), 1),
              x(T, {
                name: "arrow",
                size: 17
              })
            ], 8, Er),
            z.value ? (n(), l("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: B[1] || (B[1] = (E) => Y.$emit("analysis", p.value))
            }, "查看分析")) : $("", !0),
            N.value ? (n(), l("p", Ur, o(N.value), 1)) : $("", !0)
          ])
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: Ne(G, ["prevent"])
        }, [
          e("div", jr, [
            B[13] || (B[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: B[2] || (B[2] = (E) => Y.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", Dr, [
            e("label", Nr, [
              x(T, {
                name: "search",
                size: 18
              }),
              Z(e("input", {
                "onUpdate:modelValue": B[3] || (B[3] = (E) => y.value = E),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: B[4] || (B[4] = Mn(Ne((E) => D.value[0] && W(D.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [ue, y.value]
              ])
            ]),
            e("label", Pr, [
              B[14] || (B[14] = e("span", null, "添加到", -1)),
              Z(e("select", {
                "onUpdate:modelValue": B[5] || (B[5] = (E) => h.value = E),
                "aria-label": "添加食物的餐次"
              }, [
                (n(!0), l(O, null, V(b(dt), ([E, se]) => (n(), l("option", {
                  key: E,
                  value: E
                }, o(se), 9, Mr))), 128))
              ], 512), [
                [$e, h.value]
              ])
            ])
          ]),
          y.value.trim() ? (n(), l("div", Tr, [
            (n(!0), l(O, null, V(D.value, (E) => (n(), l("button", {
              key: E.key,
              type: "button",
              class: "vb-search-result",
              onClick: (se) => W(E)
            }, [
              e("span", null, [
                e("strong", null, o(E.name), 1),
                e("small", null, o(E.state) + " · " + o(E.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              x(T, {
                name: "plus",
                size: 17
              })
            ], 8, Rr))), 128)),
            D.value.length ? $("", !0) : (n(), l("p", zr, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: F
            }, [
              j("手动添加“" + o(y.value) + "”", 1),
              x(T, {
                name: "plus",
                size: 16
              })
            ])
          ])) : $("", !0),
          e("div", Or, [
            e("h3", null, [
              B[15] || (B[15] = j("已选食物 ", -1)),
              e("small", null, o(w.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: F
            }, "＋手动添加")
          ]),
          w.value.entries.length ? (n(), l("div", Fr, [
            (n(!0), l(O, null, V(w.value.entries, (E, se) => (n(), l("article", {
              key: E.id,
              class: "vb-diary-entry"
            }, [
              e("div", Br, [
                E.foodId ? (n(), l("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (ee) => Y.$emit("detail", E.foodId)
                }, [
                  j(o(b(kt)(b(oe)[E.foodId]) || E.name), 1),
                  x(T, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, Vr)) : Z((n(), l("input", {
                  key: 1,
                  "onUpdate:modelValue": (ee) => E.name = ee,
                  "aria-label": "手动食物" + (se + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 8, Lr)), [
                  [ue, E.name]
                ]),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (se + 1),
                  onClick: (ee) => w.value.entries.splice(se, 1)
                }, [
                  x(T, {
                    name: "close",
                    size: 15
                  })
                ], 8, qr)
              ]),
              e("p", Gr, [
                j(o(E.foodId ? b(oe)[E.foodId]?.state : "手动条目，暂无营养数据") + o(E.estimated ? " · 份量为估算" : ""), 1),
                E.nutritionSnapshot?.dataType === "ai-estimate" ? (n(), l("span", Jr, "含AI估算")) : $("", !0)
              ]),
              x(In, {
                food: b(oe)[E.foodId],
                onChoose: (ee) => {
                  E.grams = ee, E.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", Hr, [
                e("label", null, [
                  B[16] || (B[16] = j("可食部重量", -1)),
                  Z(e("input", {
                    "onUpdate:modelValue": (ee) => E.grams = ee,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (b(oe)[E.foodId]?.name || E.name || "食物") + "克数"
                  }, null, 8, Kr), [
                    [ue, E.grams]
                  ]),
                  B[17] || (B[17] = e("small", null, "克", -1))
                ]),
                e("label", Wr, [
                  B[18] || (B[18] = e("span", null, "餐次", -1)),
                  Z(e("select", {
                    "onUpdate:modelValue": (ee) => E.meal = ee
                  }, [
                    (n(!0), l(O, null, V(b(dt), ([ee, J]) => (n(), l("option", {
                      key: ee,
                      value: ee
                    }, o(J), 9, Xr))), 128))
                  ], 8, Yr), [
                    [$e, E.meal]
                  ])
                ]),
                E.foodId ? $("", !0) : (n(), l("label", Qr, [
                  B[19] || (B[19] = j("归属类别", -1)),
                  Z(e("select", {
                    "onUpdate:modelValue": (ee) => E.group = ee
                  }, [
                    (n(!0), l(O, null, V(b(bt), (ee) => (n(), l("option", {
                      key: ee.key,
                      value: ee.key
                    }, o(ee.name), 9, eu))), 128))
                  ], 8, Zr), [
                    [$e, E.group]
                  ])
                ]))
              ]),
              E.referenceConfirmed === !1 ? (n(), l("p", tu, [
                B[20] || (B[20] = j("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                b(oe)[E.foodId]?.source ? (n(), l("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (ee) => E.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, nu)) : (n(), l("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: B[6] || (B[6] = (ee) => Y.$emit("browse"))
                }, "查找具体食物"))
              ])) : $("", !0)
            ]))), 128))
          ])) : (n(), l("p", su, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (n(!0), l(O, null, V(b(bt), (E) => (n(), l("details", {
            key: E.key,
            class: "vb-diary-food-group",
            onToggle: (se) => m[E.key] = se.target.open
          }, [
            e("summary", null, [
              x(T, {
                name: b(mn)[E.key],
                size: 18
              }, null, 8, ["name"]),
              j(o(E.name), 1),
              e("small", null, o(E.items.length) + " 个条目", 1),
              x(T, {
                name: "chevron",
                size: 14
              })
            ]),
            m[E.key] ? (n(), l("div", ou, [
              (n(!0), l(O, null, V(E.items.slice(0, c[E.key] || 24), ([se, ee]) => (n(), l("button", {
                key: se,
                type: "button",
                onClick: (J) => W(b(oe)[se])
              }, o(ee) + " ＋", 9, au))), 128)),
              E.items.length > (c[E.key] || 24) ? (n(), l("button", {
                key: 0,
                type: "button",
                onClick: (se) => c[E.key] = (c[E.key] || 24) + 24
              }, "再显示24项", 8, iu)) : $("", !0)
            ])) : $("", !0)
          ], 40, lu))), 128)),
          e("label", ru, [
            B[21] || (B[21] = j("补充备注 ", -1)),
            B[22] || (B[22] = e("span", null, "可选，不发送给 AI", -1)),
            Z(e("textarea", {
              "onUpdate:modelValue": B[7] || (B[7] = (E) => w.value.notes = E),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [ue, w.value.notes]
            ])
          ]),
          e("details", uu, [
            B[23] || (B[23] = e("summary", null, "查看记录依据", -1)),
            B[24] || (B[24] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (n(!0), l(O, null, V(_.value, (E) => (n(), l("p", {
              key: E.id
            }, [
              j(o(E.name) + "：" + o(E.nutritionSnapshot?.source?.name || E.nutritionSnapshot?.estimate?.model || "原目录数据"), 1),
              E.nutritionSnapshot?.estimate ? (n(), l("span", du, " · " + o(E.nutritionSnapshot.estimate.assumption), 1)) : $("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : $("", !0)
    ]));
  }
}, vu = { class: "vb-food-card vb-glass" }, mu = ["aria-label"], bu = { class: "vb-food-card-copy" }, pu = { class: "vb-small-label" }, gu = { key: 0 }, fu = { key: 0 }, yu = {
  key: 1,
  class: "vb-food-composition-note"
}, hu = { class: "vb-food-card-bottom" }, ku = ["aria-pressed"], ln = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const a = t;
    pe(() => a.food.key, (u) => {
      Ve(u).catch(() => {
      });
    }, { immediate: !0 });
    const { photo: s, loading: d, failed: i } = Cn(() => a.food);
    return (u, r) => (n(), l("article", vu, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: r[0] || (r[0] = (v) => u.$emit("detail", t.food.key))
      }, [
        x(Lt, {
          food: t.food,
          photo: b(s),
          loading: b(d),
          failed: b(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", bu, [
          e("span", pu, o(t.food.categoryName), 1),
          e("h3", null, o(b(kt)(t.food)), 1),
          e("p", null, o(b(Vt)(t.food)), 1),
          t.food.source ? (n(), l("dl", gu, [
            (n(!0), l(O, null, V(b(Pe), (v) => (n(), l("div", {
              key: v.id
            }, [
              e("dt", null, o(v.id === "carbs" ? "碳水" : v.name), 1),
              e("dd", null, [
                j(o(b(Ue)(t.food.nutrients[v.id])), 1),
                t.food.nutrients[v.id] != null ? (n(), l("small", fu, o(v.unit), 1)) : $("", !0)
              ])
            ]))), 128))
          ])) : (n(), l("p", yu, [
            r[3] || (r[3] = j("按实际配方记录份量", -1)),
            r[4] || (r[4] = e("br", null, null, -1)),
            j(o(b(vn).estimates?.[t.food.key] ? "已保存AI估算 · 查看范围与假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, mu),
      e("div", hu, [
        e("span", null, o(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (n(), l("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: me({ selected: t.compared }),
          onClick: r[2] || (r[2] = (v) => u.$emit("compare", t.food.key))
        }, [
          x(T, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          j(o(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, ku)) : (n(), l("button", {
          key: 0,
          type: "button",
          onClick: r[1] || (r[1] = (v) => u.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, wu = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), $u = { class: "vb-food-hub" }, _u = { class: "vb-page-title" }, Au = ["aria-expanded"], Cu = { class: "vb-glass vb-food-search-hero" }, Iu = { class: "vb-icon-badge" }, Su = { class: "vb-food-search-input" }, xu = {
  key: 1,
  class: "vb-food-suggestions"
}, Eu = ["onClick"], Uu = { class: "vb-recommended" }, ju = ["onClick"], Du = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, Nu = { class: "vb-section-heading" }, Pu = {
  key: 0,
  class: "vb-comparison-chips"
}, Mu = ["onClick"], Tu = { class: "vb-field" }, Ru = { class: "vb-ask-bottom" }, zu = ["disabled"], Ou = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, Fu = {
  key: 2,
  class: "vb-ai-answer"
}, Bu = {
  key: 0,
  class: "vb-data-note"
}, Vu = { class: "vb-answer-foods" }, Lu = ["onClick"], qu = { class: "vb-data-note" }, Gu = { class: "vb-data-note" }, Ju = {
  key: 1,
  class: "vb-compare-bar"
}, Hu = ["onClick"], Ku = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, Wu = { class: "vb-food-results-grid" }, Yu = { class: "vb-section-heading vb-category-heading" }, Xu = { class: "vb-food-category-grid" }, Qu = ["onClick"], Zu = ["src", "alt"], ed = { class: "vb-food-results-top" }, td = { class: "vb-food-filter" }, nd = { key: 0 }, sd = ["onClick"], ld = { key: 1 }, od = ["value"], ad = { class: "vb-food-results-grid" }, id = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, rd = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, ud = ["disabled"], dd = ["disabled"], cd = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, vd = { class: "vb-reference-sample-list" }, md = ["onClick"], bd = { key: 0 }, pd = { class: "vb-food-source-note" }, gd = ["href"], fd = ["href"], yd = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const a = P(""), s = P(""), d = P(""), i = P(""), u = P("relevance"), r = P(1), v = P(!1), m = P([]), c = P(""), p = P(!1), y = P(""), h = P(!1), k = P(null), R = P(""), N = Ct, w = new Set(Ct.map((J) => J.key)), _ = new Set(Bn.map((J) => J.key)), D = H(() => s.value ? It(s.value).map((J) => J.food).filter((J) => _.has(J.key) && !w.has(J.key)) : []);
    function z(J, I = Ge.length) {
      return It(J).map((g) => g.food).filter((g) => w.has(g.key)).slice(0, I);
    }
    const M = H(() => a.value.trim() ? z(a.value, Ge.length).slice(0, 5) : []), q = (J) => N.filter((I) => I.category === J).length, W = Ct.length, F = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((J) => {
      const I = It(J).map((g) => g.food).filter((g) => w.has(g.key));
      return I.find((g) => g.source) || I[0];
    }).filter(Boolean).map((J) => [J.key, J])).values()], K = H(() => {
      let J = s.value ? z(s.value) : [...N].sort((I, g) => +!I.source - +!g.source);
      return d.value && (J = J.filter((I) => I.category === d.value)), J;
    }), G = H(() => [...new Set(K.value.map((J) => J.subcategory))]), ye = H(() => {
      let J = K.value.filter((I) => !i.value || I.subcategory === i.value);
      if (u.value !== "relevance") {
        const [I, g] = u.value.split(":");
        J = [...J].sort((f, S) => {
          if (I === "name") return f.name.localeCompare(S.name, "zh");
          const ie = f.nutrients[I], ae = S.nutrients[I];
          return ie == null || ae == null ? +(ie == null) - +(ae == null) : (g === "asc" ? 1 : -1) * (ie - ae);
        });
      }
      return J;
    }), re = H(() => Math.max(1, Math.ceil(ye.value.length / 12))), fe = H(() => ye.value.slice((r.value - 1) * 12, r.value * 12));
    pe([i, u], () => r.value = 1);
    function Y(J = a.value) {
      a.value = J.trim(), s.value = a.value, d.value = "", i.value = "", r.value = 1, v.value = !1;
    }
    function B(J) {
      d.value = J, s.value = "", a.value = "", i.value = "", r.value = 1, u.value = "relevance";
    }
    function E() {
      d.value = "", s.value = "", a.value = "", i.value = "", r.value = 1;
    }
    function se(J) {
      c.value = "", m.value.includes(J) ? m.value = m.value.filter((I) => I !== J) : m.value.length < 2 ? m.value.push(J) : c.value = "每次选择两种食物进行比较。";
    }
    async function ee() {
      if (!(h.value || !y.value.trim())) {
        h.value = !0, R.value = "", k.value = null;
        try {
          k.value = await ht("ask", { question: y.value.trim(), foodIds: m.value });
        } catch (J) {
          R.value = J.message;
        } finally {
          h.value = !1;
        }
      }
    }
    return (J, I) => (n(), l("div", $u, [
      e("div", _u, [
        e("div", null, [
          I[14] || (I[14] = e("p", { class: "vb-eyebrow" }, "从认识食物开始", -1)),
          I[15] || (I[15] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, o(b(W).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": p.value,
          onClick: I[0] || (I[0] = (g) => p.value = !p.value)
        }, [
          x(T, {
            name: "sparkles",
            size: 17
          }),
          I[16] || (I[16] = j("问 AI", -1))
        ], 8, Au)
      ]),
      e("section", Cu, [
        e("span", Iu, [
          x(T, {
            name: "search",
            size: 23
          })
        ]),
        I[19] || (I[19] = e("div", null, [
          e("h2", null, "今天想了解哪一种食物？"),
          e("p", null, "名称、别名都能查。营养数据统一按每 100 克可食部展示。")
        ], -1)),
        e("form", {
          class: "vb-food-search-form",
          onSubmit: I[3] || (I[3] = Ne((g) => Y(), ["prevent"]))
        }, [
          e("div", Su, [
            x(T, {
              name: "search",
              size: 19
            }),
            Z(e("input", {
              "onUpdate:modelValue": I[1] || (I[1] = (g) => a.value = g),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: I[2] || (I[2] = (g) => v.value = !0)
            }, null, 544), [
              [ue, a.value]
            ]),
            a.value ? (n(), l("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: E
            }, [
              x(T, {
                name: "close",
                size: 15
              })
            ])) : $("", !0),
            v.value && M.value.length ? (n(), l("div", xu, [
              (n(!0), l(O, null, V(M.value, (g) => (n(), l("button", {
                key: g.key,
                type: "button",
                onClick: (f) => Y(g.name)
              }, [
                j(o(g.name), 1),
                e("small", null, o(g.state), 1)
              ], 8, Eu))), 128))
            ])) : $("", !0)
          ]),
          I[17] || (I[17] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", Uu, [
          I[18] || (I[18] = e("span", null, "推荐搜索", -1)),
          (n(), l(O, null, V(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (g) => e("button", {
            key: g,
            type: "button",
            onClick: (f) => Y(g)
          }, o(g), 9, ju)), 64))
        ])
      ]),
      p.value ? (n(), l("section", Du, [
        e("div", Nu, [
          I[20] || (I[20] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          x(T, { name: "sparkles" })
        ]),
        I[24] || (I[24] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给 DeepSeek。数值来自食物库，AI 负责解释。", -1)),
        m.value.length ? (n(), l("div", Pu, [
          (n(!0), l(O, null, V(m.value, (g) => (n(), l("button", {
            key: g,
            type: "button",
            onClick: (f) => se(g)
          }, o(b(oe)[g].name) + " ×", 9, Mu))), 128))
        ])) : $("", !0),
        e("form", {
          onSubmit: Ne(ee, ["prevent"])
        }, [
          e("label", Tu, [
            I[21] || (I[21] = j("你的问题", -1)),
            Z(e("textarea", {
              "onUpdate:modelValue": I[4] || (I[4] = (g) => y.value = g),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [ue, y.value]
            ])
          ]),
          e("div", Ru, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: I[5] || (I[5] = (g) => y.value = m.value.length === 2 ? "这两种食物的蛋白质有什么区别？" : "100 克香蕉大约有多少热量？")
            }, "填入示例问题"),
            e("button", {
              type: "submit",
              class: "vb-button vb-button-primary",
              disabled: h.value || !y.value.trim()
            }, o(h.value ? "正在查询与分析…" : "发送问题"), 9, zu)
          ])
        ], 32),
        R.value ? (n(), l("p", Ou, o(R.value), 1)) : $("", !0),
        k.value ? (n(), l("div", Fu, [
          I[22] || (I[22] = e("h3", null, "数据库数值", -1)),
          k.value.database.length ? $("", !0) : (n(), l("p", Bu, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", Vu, [
            (n(!0), l(O, null, V(k.value.database, (g) => (n(), l("button", {
              key: g.id,
              type: "button",
              onClick: (f) => J.$emit("detail", g.id)
            }, [
              e("strong", null, o(g.name) + " →", 1),
              e("span", null, o(g.grams) + " 克可食部 · 热量 " + o(b(Ue)(g.portion.energy)) + o(g.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + o(b(Ue)(g.portion.protein)) + o(g.portion.protein != null ? " g" : ""), 1),
              e("small", null, o(g.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, Lu))), 128))
          ]),
          I[23] || (I[23] = e("h3", null, "AI 解释", -1)),
          e("p", null, o(k.value.answer.summary), 1),
          e("p", null, o(k.value.answer.explanation), 1),
          e("p", qu, o(k.value.answer.limitations), 1),
          e("small", Gu, o(k.value.model) + " · " + o(new Date(k.value.generatedAt).toLocaleString()), 1)
        ])) : $("", !0)
      ])) : $("", !0),
      m.value.length ? (n(), l("div", Ju, [
        e("span", null, "已选 " + o(m.value.length) + " 种食物", 1),
        (n(!0), l(O, null, V(m.value, (g) => (n(), l("button", {
          key: g,
          onClick: (f) => se(g)
        }, o(b(oe)[g].name) + " ×", 9, Hu))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: I[6] || (I[6] = (g) => {
            p.value = !0, y.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : $("", !0),
      c.value ? (n(), l("p", Ku, o(c.value), 1)) : $("", !0),
      !d.value && !s.value ? (n(), l(O, { key: 3 }, [
        I[26] || (I[26] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物"),
            e("p", null, "从你熟悉的食材开始。")
          ])
        ], -1)),
        e("div", Wu, [
          (n(), l(O, null, V(F, (g) => x(ln, {
            key: g.key,
            food: g,
            compared: m.value.includes(g.key),
            onDetail: I[7] || (I[7] = (f) => J.$emit("detail", f)),
            onCompare: se
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", Yu, [
          e("div", null, [
            I[25] || (I[25] = e("h2", null, "按类别探索", -1)),
            e("p", null, o(b(N).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", Xu, [
          (n(!0), l(O, null, V(b(Vn).filter((g) => q(g.id) > 0), (g) => (n(), l("button", {
            key: g.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: (f) => B(g.id)
          }, [
            e("img", {
              src: g.image,
              alt: g.name + "分类示意图",
              loading: "lazy"
            }, null, 8, Zu),
            e("span", null, [
              e("small", null, o(q(g.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, o(g.name), 1),
              e("em", null, [
                j(o(g.description) + " ", 1),
                x(T, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, Qu))), 128))
        ]),
        I[27] || (I[27] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (n(), l(O, { key: 4 }, [
        e("div", ed, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: E
          }, [
            x(T, {
              name: "back",
              size: 15
            }),
            I[28] || (I[28] = j("分类总览", -1))
          ]),
          e("h2", null, o(d.value ? b(Kt)[d.value].name : "“" + s.value + "”的食物照片与营养资料"), 1),
          e("span", null, o(ye.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", td, [
          G.value.length <= 10 ? (n(), l("div", nd, [
            e("button", {
              class: me({ selected: !i.value }),
              onClick: I[8] || (I[8] = (g) => i.value = "")
            }, "全部", 2),
            (n(!0), l(O, null, V(G.value, (g) => (n(), l("button", {
              key: g,
              class: me({ selected: i.value === g }),
              onClick: (f) => i.value = g
            }, o(g), 11, sd))), 128))
          ])) : (n(), l("label", ld, [
            I[30] || (I[30] = j("筛选", -1)),
            Z(e("select", {
              "onUpdate:modelValue": I[9] || (I[9] = (g) => i.value = g),
              "aria-label": "食物类型筛选"
            }, [
              I[29] || (I[29] = e("option", { value: "" }, "全部类型", -1)),
              (n(!0), l(O, null, V(G.value, (g) => (n(), l("option", {
                key: g,
                value: g
              }, o(g), 9, od))), 128))
            ], 512), [
              [$e, i.value]
            ])
          ])),
          e("label", null, [
            I[32] || (I[32] = j("排序", -1)),
            Z(e("select", {
              "onUpdate:modelValue": I[10] || (I[10] = (g) => u.value = g),
              "aria-label": "食物营养指标排序"
            }, [...I[31] || (I[31] = [
              un('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [$e, u.value]
            ])
          ])
        ]),
        e("div", ad, [
          (n(!0), l(O, null, V(fe.value, (g) => (n(), ve(ln, {
            key: g.key,
            food: g,
            compared: m.value.includes(g.key),
            onDetail: I[11] || (I[11] = (f) => J.$emit("detail", f)),
            onCompare: se
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        ye.value.length ? $("", !0) : (n(), l("div", id, [
          x(T, {
            name: "search",
            size: 34
          }),
          I[33] || (I[33] = e("h2", null, "没有找到匹配的食物", -1)),
          I[34] || (I[34] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: E
          }, "返回食物总览")
        ])),
        re.value > 1 ? (n(), l("nav", rd, [
          e("button", {
            disabled: r.value === 1,
            onClick: I[12] || (I[12] = (g) => r.value--)
          }, "上一页", 8, ud),
          e("span", null, "第 " + o(r.value) + " / " + o(re.value) + " 页", 1),
          e("button", {
            disabled: r.value === re.value,
            onClick: I[13] || (I[13] = (g) => r.value++)
          }, "下一页", 8, dd)
        ])) : $("", !0)
      ], 64)),
      s.value && D.value.length ? (n(), l("details", cd, [
        e("summary", null, "其他营养数据样本 · " + o(D.value.length.toLocaleString()) + " 条", 1),
        I[35] || (I[35] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", vd, [
          (n(!0), l(O, null, V(D.value.slice(0, 80), (g) => (n(), l("button", {
            key: g.key,
            type: "button",
            onClick: (f) => J.$emit("detail", g.key)
          }, [
            e("strong", null, o(g.name), 1),
            e("span", null, o(g.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, md))), 128))
        ]),
        D.value.length > 80 ? (n(), l("p", bd, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : $("", !0)
      ])) : $("", !0),
      e("details", pd, [
        I[36] || (I[36] = e("summary", null, "数据口径与图片署名", -1)),
        I[37] || (I[37] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        I[38] || (I[38] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        I[39] || (I[39] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        I[40] || (I[40] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (n(!0), l(O, null, V(b(wu), (g) => (n(), l("li", {
            key: g.key
          }, [
            j(o(b(Kt)[g.key]?.name) + "：", 1),
            e("a", {
              href: g.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, o(g.title), 9, gd),
            j(" · " + o(g.author) + " · ", 1),
            e("a", {
              href: g.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, o(g.license), 9, fd),
            j(" · " + o(g.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function hd(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function kd() {
  const t = P(""), a = P((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), s = P("lunch"), d = P(null), i = P(""), u = P(!1), r = P([]);
  async function v(c, p, y = {}) {
    if (u.value) return;
    i.value = "", d.value = null, u.value = !0, r.value = [];
    const h = c ? {
      sex: c.sex,
      age: c.age,
      height: c.height,
      weight: c.weight,
      activity: c.activity,
      ageMonths: c.ageMonths,
      physiologicalStage: c.physiologicalStage
    } : null;
    try {
      d.value = await as({
        goal: t.value.slice(0, 500),
        date: a.value,
        meal: s.value,
        profile: h,
        conditions: y.conditions,
        recordContext: y.recordContext,
        ...p ? {
          personalization: {
            preferences: p.preferences?.slice(0, 200),
            safetyFlags: p.safetyFlags?.slice(0, 4)
          }
        } : {}
      }, (k) => r.value.push(k));
    } catch (k) {
      i.value = hd(k);
    } finally {
      u.value = !1;
    }
  }
  function m() {
    d.value = null, i.value = "", r.value = [];
  }
  return { goal: t, date: a, meal: s, response: d, error: i, busy: u, progress: r, run: v, clear: m };
}
const wd = [
  ["花生", "peanut", "peanuts", "groundnut"],
  ["奶", "牛奶", "乳", "乳制品", "奶制品", "dairy", "milk", "cheese", "yogurt", "yoghurt", "cream", "butter"],
  ["蛋", "鸡蛋", "egg", "eggs"],
  ["海鲜", "seafood", "鱼虾蟹贝", "鱼", "虾", "蟹", "贝", "fish", "shrimp", "prawn", "crab", "clam", "oyster", "salmon", "tuna", "cod", "squid", "mussel"],
  ["肉类", "肉", "牛肉", "猪肉", "鸡肉", "羊肉", "禽", "beef", "pork", "chicken", "lamb", "turkey", "duck", "meat"],
  ["香菜", "coriander", "cilantro"],
  ["大豆", "豆制品", "soy", "tofu"],
  ["小麦", "wheat"],
  ["坚果", "nuts", "almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut"]
], jt = (t, a = 300) => typeof t == "string" ? t.trim().slice(0, a) : "";
function on(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const a = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (a !== null && (!Number.isFinite(a) || a <= 0 || a > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const s = (Array.isArray(t.avoids) ? t.avoids.join("、") : jt(t.avoids)).split(/[,，、;；\n]+/).map((u) => u.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (s.length > 12 || s.some((u) => u.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const d = t.availableFoods ?? [];
  if (!Array.isArray(d) || d.length > 12) throw new Error("可选食物最多12项。");
  const i = d.map((u) => {
    const r = oe[u?.foodId], v = Number(u?.grams), m = u?.price === null || u?.price === void 0 || u?.price === "" ? null : Number(u.price);
    if (!r || !Number.isFinite(v) || v < 0.1 || v > 5e3 || m !== null && (!Number.isFinite(m) || m < 0 || m > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: r.key, name: r.name, grams: v, price: m };
  });
  if (new Set(i.map((u) => u.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: a, avoids: [...new Set(s)], preferences: jt(t.preferences, 200), exercise: jt(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function xn(t, a = []) {
  const s = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), d = it(s);
  return a.filter((i) => {
    const u = /* @__PURE__ */ new Set([i]);
    for (const r of wd) if (r.some((v) => it(v) === it(i))) for (const v of r) u.add(v);
    return [...u].some((r) => /^[a-z ]+$/i.test(r) ? new RegExp("\\b" + r.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(s) : d.includes(it(r)));
  });
}
function $d(t, a) {
  return !!t && !["13", "17"].includes(t.category) && !xn(t, a.avoids).length && (!a.onlyAvailable || a.availableFoods.some((s) => s.foodId === t.key));
}
function _d(t, a) {
  const s = t.map((u) => {
    const r = a.availableFoods.find((m) => m.foodId === u.foodId), v = r?.price != null ? Math.round(r.price * u.grams / r.grams * 100) / 100 : null;
    return { foodId: u.foodId, cost: v, priceBasis: r?.price != null ? { price: r.price, grams: r.grams } : null };
  }), d = s.every((u) => u.cost !== null), i = Math.round(s.reduce((u, r) => u + (r.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: a.budget, complete: d, knownSubtotal: i, total: d ? i : null, status: d ? a.budget === null ? "no_budget" : i > a.budget ? "over_budget" : "within_budget" : "unknown", breakdown: s, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: a.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const Ad = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, Cd = { class: "vb-agent-heading" }, Id = { class: "vb-icon-badge" }, Sd = { class: "vb-campus-fields" }, xd = ["max", "disabled"], Ed = ["disabled"], Ud = ["value"], jd = ["disabled"], Dd = ["disabled"], Nd = { class: "vb-analysis-tabs" }, Pd = ["disabled"], Md = ["disabled", "onClick"], Td = { class: "vb-more-conditions" }, Rd = { class: "vb-agent-goal" }, zd = ["disabled"], Od = { class: "vb-campus-fields" }, Fd = ["disabled"], Bd = ["disabled"], Vd = { class: "vb-campus-candidates" }, Ld = { class: "vb-candidate-search" }, qd = ["disabled"], Gd = ["disabled"], Jd = ["value"], Hd = ["disabled"], Kd = { class: "vb-candidate-list" }, Wd = ["onUpdate:modelValue", "disabled"], Yd = ["onUpdate:modelValue", "disabled"], Xd = ["disabled", "onClick"], Qd = {
  key: 0,
  class: "vb-agent-context-optin"
}, Zd = ["disabled"], ec = { class: "vb-agent-context-optin" }, tc = ["disabled"], nc = { class: "vb-agent-context-optin" }, sc = ["disabled"], lc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, oc = ["disabled"], ac = {
  key: 0,
  class: "vb-loading-ring"
}, ic = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, rc = { key: 0 }, uc = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, dc = ["disabled"], cc = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, vc = {
  key: 3,
  class: "vb-agent-plan"
}, mc = { class: "vb-agent-plan-heading" }, bc = { class: "vb-eyebrow" }, pc = { class: "vb-data-note" }, gc = { key: 0 }, fc = { key: 1 }, yc = { class: "vb-agent-items" }, hc = { class: "vb-agent-item-title" }, kc = ["onClick"], wc = ["onClick"], $c = {
  key: 0,
  class: "vb-candidate-search"
}, _c = ["value"], Ac = ["disabled", "onClick"], Cc = { key: 0 }, Ic = { class: "vb-agent-grams" }, Sc = ["value", "onInput"], xc = { class: "vb-agent-evidence" }, Ec = { class: "vb-agent-source" }, Uc = ["href"], jc = { key: 1 }, Dc = { key: 0 }, Nc = {
  key: 1,
  class: "vb-agent-notes"
}, Pc = {
  key: 2,
  class: "vb-agent-notes is-caution"
}, Mc = { class: "vb-agent-trace" }, Tc = { class: "vb-agent-confirm" }, Rc = ["disabled"], zc = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: a }) {
    const s = t, d = a, { goal: i, date: u, meal: r, response: v, error: m, busy: c, progress: p, run: y, clear: h } = kd();
    i.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const k = Ye({ budget: "", avoids: "", preferences: s.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), R = P(-1), N = P(""), w = P(!1), _ = P(!0), D = P(!1), z = P(""), M = P(""), q = P(""), W = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], F = H(() => M.value.trim() ? Rt(M.value, 8) : []), K = H(() => Qe((s.records || []).find((g) => g.date === u.value))), G = H(() => v.value?.status === "ready" ? v.value : null), ye = H(() => (G.value?.plan.items || []).map((g, f) => ({ id: "agent-" + f, foodId: g.foodId, name: g.name, grams: g.grams, meal: g.meal, group: oe[g.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), re = H(() => G.value ? _d(G.value.plan.items, G.value.conditions) : null), fe = H(() => !G.value || !G.value.plan.items.length || re.value?.status === "over_budget" || G.value.plan.items.some((g) => !Number.isFinite(g.grams) || g.grams < 0.1 || g.grams > 5e3));
    pe([i, u, r, k, _, D, () => s.profile, () => s.records], () => {
      !c.value && v.value && h(), w.value = !1;
    }, { deep: !0 }), pe(() => s.preferences, (g) => k.preferences = g || "");
    function Y() {
      const g = oe[q.value];
      if (z.value = "", !!g) {
        if (k.availableFoods.some((f) => f.foodId === g.key)) {
          z.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (k.availableFoods.length >= 12) {
          z.value = "最多加入12项备选食物。";
          return;
        }
        k.availableFoods.push({ foodId: g.key, name: g.name, grams: 100, price: "" }), q.value = "", M.value = "";
      }
    }
    async function B() {
      z.value = "", w.value = !1;
      let g;
      try {
        await Ve(k.availableFoods.map((S) => S.foodId)), g = on(k);
        const f = g.availableFoods.find((S) => xn(oe[S.foodId], g.avoids).length);
        if (f) throw Error("备选食物“" + f.name + "”命中回避项，请先移除或修改条件。");
      } catch (f) {
        z.value = f.message;
        return;
      }
      await y(s.profile, D.value ? { safetyFlags: (s.flags || []).filter((f) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes(f)) } : void 0, { conditions: g, ..._.value ? { recordContext: { date: u.value, entries: K.value.map((f) => ({ foodId: f.foodId, name: f.name, grams: f.grams, meal: f.meal, referenceConfirmed: f.referenceConfirmed })) } } : {} });
    }
    function E() {
      fe.value || w.value || (w.value = !0, d("confirm", { confirmationId: G.value.confirmationId, date: G.value.date, meal: G.value.meal, items: G.value.plan.items, onResult: (g) => {
        w.value = g.ok, g.ok || (z.value = g.error || "加入草稿失败，请重试。");
      } }));
    }
    function se(g, f) {
      G.value && (G.value.plan.items[g].grams = Number(f), G.value.plan.items[g].portion = Wt(oe[G.value.plan.items[g].foodId], Number(f)), w.value = !1);
    }
    const ee = H(() => {
      let g;
      try {
        g = on(k);
      } catch {
        return [];
      }
      return (g.availableFoods.length && g.onlyAvailable ? g.availableFoods.map((S) => oe[S.foodId]) : Ge).filter((S) => S && !S.__summary && S.source && $d(S, g) && !G.value?.plan.items.some((ie) => ie.foodId === S.key)).slice(0, 60);
    });
    function J(g) {
      const f = oe[N.value];
      if (!f || !ee.value.some((ie) => ie.key === f.key)) return;
      const S = G.value.plan.items[g];
      G.value.plan.items[g] = { ...S, foodId: f.key, name: f.name, portion: Wt(f, S.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: f.source?.name || "", source: f.source?.id || "", missing: [] }, w.value = !1, R.value = -1, N.value = "";
    }
    const I = (g) => typeof g == "number" && Number.isFinite(g) ? g.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (g, f) => (n(), l("section", Ad, [
      e("header", Cd, [
        e("span", Id, [
          x(T, {
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
        onSubmit: Ne(B, ["prevent"])
      }, [
        e("div", Sd, [
          e("label", null, [
            f[16] || (f[16] = j("日期", -1)),
            Z(e("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (S) => _t(u) ? u.value = S : null),
              type: "date",
              max: b(ke)(),
              disabled: b(c)
            }, null, 8, xd), [
              [ue, b(u)]
            ])
          ]),
          e("label", null, [
            f[17] || (f[17] = j("餐次", -1)),
            Z(e("select", {
              "onUpdate:modelValue": f[1] || (f[1] = (S) => _t(r) ? r.value = S : null),
              disabled: b(c)
            }, [
              (n(), l(O, null, V(W, ([S, ie]) => e("option", {
                key: S,
                value: S
              }, o(ie), 9, Ud)), 64))
            ], 8, Ed), [
              [$e, b(r)]
            ])
          ]),
          e("label", null, [
            f[18] || (f[18] = j("预算（元，可选）", -1)),
            Z(e("input", {
              "onUpdate:modelValue": f[2] || (f[2] = (S) => k.budget = S),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: b(c)
            }, null, 8, jd), [
              [ue, k.budget]
            ])
          ]),
          e("label", null, [
            f[19] || (f[19] = j("不吃的食物", -1)),
            Z(e("input", {
              "onUpdate:modelValue": f[3] || (f[3] = (S) => k.avoids = S),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: b(c)
            }, null, 8, Dd), [
              [ue, k.avoids]
            ])
          ])
        ]),
        e("div", Nd, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: b(c),
            onClick: f[4] || (f[4] = (S) => k.budget = "15")
          }, "预算15元", 8, Pd),
          (n(), l(O, null, V(["清淡", "素食偏好"], (S) => e("button", {
            key: S,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: b(c),
            onClick: (ie) => k.preferences = S
          }, o(S), 9, Md)), 64)),
          e("span", null, "已选偏好：" + o(k.preferences || "未设置"), 1)
        ]),
        e("details", Td, [
          f[29] || (f[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", Rd, [
            f[20] || (f[20] = e("span", null, "这餐想怎么安排？", -1)),
            Z(e("textarea", {
              "onUpdate:modelValue": f[5] || (f[5] = (S) => _t(i) ? i.value = S : null),
              rows: "2",
              maxlength: "500",
              disabled: b(c),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, zd), [
              [ue, b(i)]
            ])
          ]),
          e("div", Od, [
            e("label", null, [
              f[21] || (f[21] = j("口味与饮食偏好", -1)),
              Z(e("input", {
                "onUpdate:modelValue": f[6] || (f[6] = (S) => k.preferences = S),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: b(c)
              }, null, 8, Fd), [
                [ue, k.preferences]
              ])
            ]),
            e("label", null, [
              f[22] || (f[22] = j("运动情况（可选）", -1)),
              Z(e("input", {
                "onUpdate:modelValue": f[7] || (f[7] = (S) => k.exercise = S),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: b(c)
              }, null, 8, Bd), [
                [ue, k.exercise]
              ])
            ])
          ]),
          e("details", Vd, [
            f[27] || (f[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            f[28] || (f[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", Ld, [
              Z(e("input", {
                "onUpdate:modelValue": f[8] || (f[8] = (S) => M.value = S),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: b(c),
                onInput: f[9] || (f[9] = (S) => q.value = "")
              }, null, 40, qd), [
                [ue, M.value]
              ]),
              Z(e("select", {
                "onUpdate:modelValue": f[10] || (f[10] = (S) => q.value = S),
                "aria-label": "选择具体食物",
                disabled: b(c) || !F.value.length
              }, [
                f[23] || (f[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (n(!0), l(O, null, V(F.value, (S) => (n(), l("option", {
                  key: S.key,
                  value: S.key
                }, o(S.name), 9, Jd))), 128))
              ], 8, Gd), [
                [$e, q.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: b(c) || !q.value,
                onClick: Y
              }, "加入备选", 8, Hd)
            ]),
            e("div", Kd, [
              (n(!0), l(O, null, V(k.availableFoods, (S, ie) => (n(), l("article", {
                key: S.foodId
              }, [
                e("strong", null, o(S.name), 1),
                e("label", null, [
                  f[24] || (f[24] = j("这份可食部（克）", -1)),
                  Z(e("input", {
                    "onUpdate:modelValue": (ae) => S.grams = ae,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: b(c)
                  }, null, 8, Wd), [
                    [
                      ue,
                      S.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  f[25] || (f[25] = j("这份已知价格（元）", -1)),
                  Z(e("input", {
                    "onUpdate:modelValue": (ae) => S.price = ae,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: b(c)
                  }, null, 8, Yd), [
                    [ue, S.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: b(c),
                  onClick: (ae) => k.availableFoods.splice(ie, 1)
                }, "移除", 8, Xd)
              ]))), 128))
            ]),
            k.availableFoods.length ? (n(), l("label", Qd, [
              Z(e("input", {
                "onUpdate:modelValue": f[11] || (f[11] = (S) => k.onlyAvailable = S),
                type: "checkbox",
                disabled: b(c)
              }, null, 8, Zd), [
                [ut, k.onlyAvailable]
              ]),
              f[26] || (f[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : $("", !0)
          ])
        ]),
        e("label", ec, [
          Z(e("input", {
            "onUpdate:modelValue": f[12] || (f[12] = (S) => _.value = S),
            type: "checkbox",
            disabled: b(c)
          }, null, 8, tc), [
            [ut, _.value]
          ]),
          e("span", null, [
            j("使用所选日期的 " + o(K.value.length) + " 项已记录食物", 1),
            f[30] || (f[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", nc, [
          Z(e("input", {
            "onUpdate:modelValue": f[13] || (f[13] = (S) => D.value = S),
            type: "checkbox",
            disabled: b(c)
          }, null, 8, sc), [
            [ut, D.value]
          ]),
          f[31] || (f[31] = e("span", null, [
            j("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        f[32] || (f[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给 DeepSeek。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        z.value ? (n(), l("p", lc, o(z.value), 1)) : $("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: b(c) || !b(i).trim()
        }, [
          b(c) ? (n(), l("span", ac)) : (n(), ve(T, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          j(o(b(c) ? "正在等待真实检索与计算…" : G.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, oc)
      ], 32),
      b(c) || b(p).length ? (n(), l("div", ic, [
        e("div", null, [
          e("strong", null, o(b(c) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          b(c) ? (n(), l("p", rc, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : $("", !0),
          e("ol", null, [
            (n(!0), l(O, null, V(b(p), (S, ie) => (n(), l("li", { key: ie }, [
              e("strong", null, o(S.label), 1),
              j(" · " + o(S.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : $("", !0),
      b(m) ? (n(), l("div", uc, [
        f[33] || (f[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, o(b(m)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: b(c),
          onClick: B
        }, "保留条件并重试", 8, dc)
      ])) : $("", !0),
      b(v)?.status === "needs_evidence" ? (n(), l("p", cc, o(b(v).message) + " 请修改备选食物或检索描述。", 1)) : $("", !0),
      G.value ? (n(), l("section", vc, [
        e("div", mc, [
          e("div", null, [
            e("p", bc, "待确认 · " + o(G.value.date) + " · " + o(W.find((S) => S[0] === G.value.meal)?.[1]), 1),
            e("h3", null, o(G.value.plan.title), 1)
          ]),
          f[34] || (f[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        e("p", null, o(G.value.plan.summary), 1),
        e("p", pc, "本次使用 " + o(G.value.contextSummary.itemCount) + " 项已记录食物；" + o(G.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        re.value ? (n(), l("div", {
          key: 0,
          class: me(["vb-campus-cost", { "is-caution": re.value.status === "over_budget" }])
        }, [
          e("h4", null, o(re.value.complete ? "按录入价格估算：约 ¥" + I(re.value.total) : "价格待确认"), 1),
          re.value.budget !== null ? (n(), l("p", gc, "本餐预算 ¥" + o(re.value.budget) + " · " + o(re.value.status === "within_budget" ? "按已录入价格估算在预算内" : re.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : $("", !0),
          re.value.complete ? $("", !0) : (n(), l("p", fc, "已知价格小计约 ¥" + o(I(re.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, o(re.value.basis) + "。" + o(re.value.availability) + "。", 1)
        ], 2)) : $("", !0),
        e("div", yc, [
          (n(!0), l(O, null, V(G.value.plan.items, (S, ie) => (n(), l("article", {
            key: S.foodId,
            class: "vb-agent-item"
          }, [
            e("div", hc, [
              e("div", null, [
                x(Lt, {
                  food: b(oe)[S.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, o(b(kt)(b(oe)[S.foodId])), 1),
                e("small", null, o(b(Vt)(b(oe)[S.foodId])), 1),
                e("p", null, o(S.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (ae) => {
                  G.value.plan.items.splice(ie, 1), w.value = !1;
                }
              }, "移除", 8, kc)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (ae) => {
                R.value = ie, N.value = "";
              }
            }, "换一道", 8, wc),
            R.value === ie ? (n(), l("div", $c, [
              Z(e("select", {
                "onUpdate:modelValue": f[14] || (f[14] = (ae) => N.value = ae),
                "aria-label": "替换食物"
              }, [
                f[35] || (f[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (n(!0), l(O, null, V(ee.value, (ae) => (n(), l("option", {
                  key: ae.key,
                  value: ae.key
                }, o(ae.name), 9, _c))), 128))
              ], 512), [
                [$e, N.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !N.value,
                onClick: (ae) => J(ie)
              }, "确认替换", 8, Ac),
              ee.value.length ? $("", !0) : (n(), l("p", Cc, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : $("", !0),
            e("label", Ic, [
              f[36] || (f[36] = j("可食部估算克数", -1)),
              e("input", {
                value: S.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (ae) => se(ie, ae.target.value)
              }, null, 40, Sc),
              f[37] || (f[37] = j("克", -1))
            ]),
            e("div", xc, [
              (n(), l(O, null, V([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (ae) => e("small", {
                key: ae.id
              }, o(ae.name) + " " + o(I(S.portion[ae.id])) + o(S.portion[ae.id] !== null ? " " + ae.unit : ""), 1)), 64))
            ]),
            e("details", Ec, [
              f[39] || (f[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + o(b(oe)[S.foodId]?.state), 1),
              e("p", null, [
                f[38] || (f[38] = j("来源：", -1)),
                b(oe)[S.foodId]?.source ? (n(), l("a", {
                  key: 0,
                  href: b(oe)[S.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, o(S.sourceName) + " · " + o(S.source), 9, Uc)) : (n(), l("span", jc, "暂无可核验成分数据"))
              ]),
              e("p", null, o(b(oe)[S.foodId]?.source?.description), 1),
              f[40] || (f[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              S.missing.length ? (n(), l("p", Dc, "缺失指标：" + o(S.missing.join("、")), 1)) : $("", !0)
            ])
          ]))), 128))
        ]),
        x(Tt, {
          entries: ye.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        f[45] || (f[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        G.value.plan.suggestions.length ? (n(), l("div", Nc, [
          f[41] || (f[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (n(!0), l(O, null, V(G.value.plan.suggestions, (S) => (n(), l("li", { key: S }, o(S), 1))), 128))
          ])
        ])) : $("", !0),
        G.value.plan.cautions.length ? (n(), l("div", Pc, [
          f[42] || (f[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (n(!0), l(O, null, V(G.value.plan.cautions, (S) => (n(), l("li", { key: S }, o(S), 1))), 128))
          ])
        ])) : $("", !0),
        e("details", Mc, [
          f[43] || (f[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (n(!0), l(O, null, V(G.value.trace, (S, ie) => (n(), l("li", { key: ie }, [
              e("strong", null, o(S.label), 1),
              j(" · " + o(S.inputSummary) + " · " + o(S.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, o(G.value.model) + " · " + o(G.value.dataVersion) + " · " + o(new Date(G.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        x(gn),
        e("div", Tc, [
          f[44] || (f[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: w.value || fe.value,
            onClick: E
          }, o(w.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, Rc)
        ])
      ])) : $("", !0)
    ]));
  }
}, Oc = { class: "vb-page-title" }, Fc = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, Bc = { class: "vb-glass vb-record-prompt" }, Vc = /* @__PURE__ */ Je({
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
    return (a, s) => (n(), l(O, null, [
      e("div", Oc, [
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
      t.nutrition ? $("", !0) : (n(), l("section", Fc, [...s[5] || (s[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      x(zc, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: s[1] || (s[1] = (d) => a.$emit("add-plan", d))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", Bc, [
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
}), Lc = { class: "vb-page-title" }, qc = { class: "vb-glass vb-profile-details" }, Gc = { class: "vb-section-heading" }, Jc = { class: "vb-pill" }, Hc = { key: 0 }, Kc = { key: 1 }, Wc = { class: "vb-profile-settings" }, Yc = { class: "vb-glass" }, Xc = { class: "vb-section-heading" }, Qc = { class: "vb-field" }, Zc = ["value"], ev = { class: "vb-glass" }, tv = { class: "vb-section-heading" }, nv = ["checked", "onChange"], sv = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String },
  emits: ["edit", "update:flags", "update:preferences"],
  setup(t, { emit: a }) {
    const s = t, d = H(() => zt.find((v) => v.key === s.profile.activity)), i = a, u = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function r(v, m, c) {
      i("update:flags", m ? [...c, v] : c.filter((p) => p !== v));
    }
    return (v, m) => (n(), l(O, null, [
      e("div", Lc, [
        m[3] || (m[3] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "随身体与生活变化，随时更新"),
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: m[0] || (m[0] = (c) => v.$emit("edit"))
        }, [
          x(T, {
            name: "edit",
            size: 17
          }),
          m[2] || (m[2] = j("修改基础档案", -1))
        ])
      ]),
      e("section", qc, [
        e("div", Gc, [
          m[4] || (m[4] = e("h2", null, "基础信息", -1)),
          e("span", Jc, o(b(Ce) ? b(ct) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
        ]),
        e("dl", null, [
          e("div", null, [
            m[5] || (m[5] = e("dt", null, "生理性别", -1)),
            e("dd", null, o(t.profile.sex === "male" ? "男性" : t.profile.sex === "female" ? "女性" : "未填写"), 1)
          ]),
          e("div", null, [
            m[6] || (m[6] = e("dt", null, "年龄", -1)),
            e("dd", null, o(t.profile.age == null || t.profile.age === "" ? "未填写" : `${t.profile.age} 岁`), 1)
          ]),
          t.profile.age === 0 ? (n(), l("div", Hc, [
            m[7] || (m[7] = e("dt", null, "月龄", -1)),
            e("dd", null, o(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : $("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (n(), l("div", Kc, [
            m[8] || (m[8] = e("dt", null, "生理阶段", -1)),
            e("dd", null, o({ pregnant: "孕期", lactating: "哺乳期", special: "需专业评估" }[t.profile.physiologicalStage]), 1)
          ])) : $("", !0),
          e("div", null, [
            m[9] || (m[9] = e("dt", null, "身高", -1)),
            e("dd", null, o(t.profile.height == null || t.profile.height === "" ? "未填写" : `${t.profile.height} cm`), 1)
          ]),
          e("div", null, [
            m[10] || (m[10] = e("dt", null, "体重", -1)),
            e("dd", null, o(t.profile.weight == null || t.profile.weight === "" ? "未填写" : `${t.profile.weight} kg`), 1)
          ]),
          e("div", null, [
            m[11] || (m[11] = e("dt", null, "每日活动", -1)),
            e("dd", null, o(d.value?.label || "未填写"), 1)
          ]),
          e("div", null, [
            m[12] || (m[12] = e("dt", null, "活动系数", -1)),
            e("dd", null, o(d.value ? "× " + d.value.factor : "未填写"), 1)
          ])
        ])
      ]),
      e("div", Wc, [
        e("section", Yc, [
          e("div", Xc, [
            m[13] || (m[13] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            x(T, { name: "bowl" })
          ]),
          e("label", Qc, [
            m[14] || (m[14] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: m[1] || (m[1] = (c) => v.$emit("update:preferences", c.target.value))
            }, null, 40, Zc)
          ]),
          m[15] || (m[15] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", ev, [
          e("div", tv, [
            m[16] || (m[16] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            x(T, { name: "shield" })
          ]),
          (n(), l(O, null, V(u, (c) => e("label", {
            key: c,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(c),
              onChange: (p) => r(c, p.target.checked, t.flags)
            }, null, 40, nv),
            e("span", null, o(c), 1)
          ])), 64)),
          m[17] || (m[17] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1))
        ])
      ])
    ], 64));
  }
}, lv = {
  key: 0,
  class: "vb-page-title"
}, ov = { class: "vb-local-chip" }, av = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, iv = { class: "vb-safety-grid" }, rv = { class: "vb-icon-badge" }, uv = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const a = Ce.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", s = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + a + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (d, i) => (n(), l(O, null, [
      t.embedded ? $("", !0) : (n(), l("div", lv, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", ov, [
          x(T, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = j("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (n(), l("section", av, [
        x(T, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + o(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : $("", !0),
      e("div", iv, [
        (n(), l(O, null, V(s, ([u, r, v]) => e("article", {
          key: r,
          class: "vb-glass"
        }, [
          e("span", rv, [
            x(T, {
              name: u,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, o(r), 1),
          e("p", null, o(v), 1)
        ])), 64))
      ]),
      x(gn)
    ], 64));
  }
}, dv = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, cv = { class: "vb-glass vb-submission-hero" }, vv = { class: "vb-submission-hero-copy" }, mv = { class: "vb-icon-badge" }, bv = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, pv = { class: "vb-submission-version" }, gv = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, fv = { class: "vb-submission-step-top" }, yv = { class: "vb-icon-badge" }, hv = ["onClick"], kv = { class: "vb-submission-columns" }, wv = { class: "vb-glass vb-submission-panel" }, $v = { class: "vb-submission-boundary" }, _v = { class: "vb-icon-badge" }, Av = { class: "vb-icon-badge" }, Cv = { class: "vb-icon-badge" }, Iv = { class: "vb-glass vb-submission-panel" }, Sv = { class: "vb-inline-note" }, xv = { class: "vb-glass vb-submission-evidence" }, Ev = { class: "vb-submission-evidence-actions" }, Uv = /* @__PURE__ */ Je({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const a = {
      foodCount: Ge.length,
      sourcedCount: Ge.filter((d) => !!d.source?.id).length,
      categories: new Set(Ge.map((d) => d.category).filter(Boolean)).size,
      sourceName: "USDA Standard Reference 28（2016-05）"
    }, s = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (d, i) => (n(), l(O, null, [
      t.embedded ? $("", !0) : (n(), l("div", dv, [
        i[4] || (i[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "在线评审入口 · 维衡 AI"),
          e("h1", null, "把营养建议放回真实的一餐"),
          e("p", null, "从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: i[0] || (i[0] = (u) => d.$emit("navigate", "mealplan"))
        }, [
          x(T, {
            name: "sparkles",
            size: 17
          }),
          i[3] || (i[3] = j("体验餐食规划 ", -1))
        ])
      ])),
      e("section", cv, [
        e("div", vv, [
          e("span", mv, [
            x(T, {
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
        e("div", bv, [
          e("div", null, [
            e("strong", null, o(a.foodCount), 1),
            i[6] || (i[6] = e("span", null, "食物目录条目", -1))
          ]),
          e("div", null, [
            e("strong", null, o(a.sourcedCount), 1),
            i[7] || (i[7] = e("span", null, "有核验来源", -1))
          ]),
          e("div", null, [
            e("strong", null, o(a.categories), 1),
            i[8] || (i[8] = e("span", null, "食物分类", -1))
          ])
        ]),
        e("small", pv, "数据版本：" + o(b(Ln)) + " · " + o(a.sourceName), 1)
      ]),
      i[19] || (i[19] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("p", { class: "vb-eyebrow" }, "四步完成一条闭环"),
          e("h2", null, "从检索到回顾")
        ]),
        e("span", null, "每一步都可返回核对")
      ], -1)),
      e("section", gv, [
        (n(), l(O, null, V(s, (u) => e("article", {
          key: u.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", fv, [
            e("span", null, o(u.number), 1),
            e("span", yv, [
              x(T, {
                name: u.icon
              }, null, 8, ["name"])
            ])
          ]),
          e("h3", null, o(u.title), 1),
          e("p", null, o(u.copy), 1),
          e("button", {
            class: "vb-text-button",
            onClick: (r) => d.$emit("navigate", u.page)
          }, [
            j(o(u.action), 1),
            x(T, {
              name: "arrow",
              size: 15
            })
          ], 8, hv)
        ])), 64))
      ]),
      e("div", kv, [
        e("section", wv, [
          i[12] || (i[12] = e("p", { class: "vb-eyebrow" }, "职责边界", -1)),
          i[13] || (i[13] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", $v, [
            e("article", null, [
              e("span", _v, [
                x(T, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Av, [
                x(T, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Cv, [
                x(T, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", Iv, [
          i[15] || (i[15] = un('<p class="vb-eyebrow">实现与隐私</p><h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>DeepSeek</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 3)),
          e("p", Sv, [
            x(T, {
              name: "info",
              size: 16
            }),
            i[14] || (i[14] = j("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", xv, [
        i[18] || (i[18] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "可复核材料"),
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口 mock 测试与真实模型冒烟分开记录，真实调用未执行时不会记作通过。")
        ], -1)),
        e("div", Ev, [
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[1] || (i[1] = (u) => d.$emit("navigate", "food"))
          }, [
            x(T, {
              name: "apple",
              size: 16
            }),
            i[16] || (i[16] = j("核对食物来源", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[2] || (i[2] = (u) => d.$emit("navigate", "assessment"))
          }, [
            x(T, {
              name: "report",
              size: 16
            }),
            i[17] || (i[17] = j("查看报告样例", -1))
          ])
        ])
      ])
    ], 64));
  }
}), jv = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], Dv = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], Nv = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], Pv = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, Mv = { class: "vb-reference-list" }, Tv = ["href"], Rv = {
  key: 1,
  class: "vb-data-note"
}, zv = { class: "vb-reference-terms" }, Ov = {
  __name: "ReferencePanel",
  setup(t) {
    return (a, s) => (n(), l("section", Pv, [
      s[8] || (s[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      s[9] || (s[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      s[10] || (s[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", Mv, [
        (n(!0), l(O, null, V(b(jv), (d) => (n(), l("details", {
          key: d.id
        }, [
          e("summary", null, [
            e("strong", null, o(d.title), 1),
            e("span", null, o(d.status), 1)
          ]),
          e("dl", null, [
            e("div", null, [
              s[0] || (s[0] = e("dt", null, "用途与版本", -1)),
              e("dd", null, o(d.kind) + " · " + o(d.version) + " · " + o(d.volume), 1)
            ]),
            e("div", null, [
              s[1] || (s[1] = e("dt", null, "条目定位", -1)),
              e("dd", null, o(d.locator), 1)
            ]),
            e("div", null, [
              s[2] || (s[2] = e("dt", null, "适用范围", -1)),
              e("dd", null, o(d.scope), 1)
            ]),
            e("div", null, [
              s[3] || (s[3] = e("dt", null, "原始单位", -1)),
              e("dd", null, o(d.units), 1)
            ])
          ]),
          d.url ? (n(), l("a", {
            key: 0,
            href: d.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "核对公开来源 ↗", 8, Tv)) : (n(), l("p", Rv, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", zv, [
        s[4] || (s[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (n(!0), l(O, null, V(b(Nv), ([d, i, u]) => (n(), l("p", { key: d }, [
          e("strong", null, o(d) + " · " + o(i), 1),
          j("：" + o(u), 1)
        ]))), 128)),
        s[5] || (s[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        s[6] || (s[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (n(!0), l(O, null, V(b(Dv), (d) => (n(), l("li", { key: d }, o(d), 1))), 128))
        ]),
        s[7] || (s[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, Fv = { class: "vb-page-title" }, Bv = { class: "vb-local-chip" }, Vv = { "aria-labelledby": "about-project-heading" }, Lv = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, qv = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, Gv = {
  key: 0,
  role: "alert"
}, Jv = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Hv = { class: "vb-reset-actions" }, Kv = ["disabled"], Wv = ["disabled"], Yv = /* @__PURE__ */ Je({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const a = P(!1), s = P(!1), d = P("");
    function i() {
      try {
        const r = JSON.parse(we.getItem("weiheng.local.v2") || "{}"), v = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: r.profile || null, records: (Array.isArray(r.records) ? r.records : []).map((p) => ({ date: p.date, entries: p.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, m = URL.createObjectURL(new Blob([JSON.stringify(v, null, 2)], { type: "application/json" })), c = document.createElement("a");
        c.href = m, c.download = "维衡-当前档案与食物记录.json", c.click(), setTimeout(() => URL.revokeObjectURL(m), 1e3);
      } catch {
        d.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function u() {
      if (!s.value) {
        s.value = !0, d.value = "";
        try {
          await es(), window.location.reload();
        } catch {
          d.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", s.value = !1;
        }
      }
    }
    return (r, v) => (n(), l(O, null, [
      e("div", Fv, [
        v[5] || (v[5] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "项目介绍 · 使用边界 · 隐私说明"),
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", Bv, [
          v[4] || (v[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          j(o(b(Ce) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", Vv, [
        v[6] || (v[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "作品说明"),
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ]),
          e("span", null, "功能流程与实现依据")
        ], -1)),
        x(Uv, {
          embedded: "",
          onNavigate: v[0] || (v[0] = (m) => r.$emit("navigate", m))
        })
      ]),
      x(Ov),
      e("section", Lv, [
        v[7] || (v[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "安全中心"),
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ]),
          e("span", null, "把营养信息作为参考")
        ], -1)),
        x(uv, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", qv, [
        e("div", null, [
          v[8] || (v[8] = e("p", { class: "vb-eyebrow" }, "当前使用空间的数据管理", -1)),
          v[9] || (v[9] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, o(b(Ce) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          v[10] || (v[10] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          d.value ? (n(), l("p", Gv, o(d.value), 1)) : $("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: v[1] || (v[1] = (m) => a.value = !0)
        }, "清空数据并重置")
      ]),
      a.value ? (n(), ve(nt, {
        key: 0,
        title: b(Ce) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: v[3] || (v[3] = (m) => !s.value && (a.value = !1))
      }, {
        default: tt(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + o(b(Ce) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          v[11] || (v[11] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          d.value ? (n(), l("p", Jv, o(d.value), 1)) : $("", !0),
          e("div", Hv, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: s.value,
              onClick: v[2] || (v[2] = (m) => a.value = !1)
            }, "取消", 8, Kv),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: s.value,
              onClick: u
            }, o(s.value ? "正在清理…" : "确认清空并重置"), 9, Wv)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : $("", !0)
    ], 64));
  }
}), Xv = ["data-theme"], Qv = ["inert"], Zv = { class: "vb-main" }, em = { class: "vb-topbar" }, tm = { class: "vb-breadcrumb" }, nm = { class: "vb-topbar-actions" }, sm = { class: "vb-local-chip" }, lm = ["aria-label"], om = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, am = { class: "vb-footer" }, im = {
  key: 4,
  class: "vb-toast",
  role: "status"
}, vm = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: a, theme: s, nutrition: d, records: i, storageError: u, updateProfile: r, saveRecord: v, addToDraft: m, addPlanToDraft: c, toggleHabit: p } = Ot(), { toggleTheme: y } = Wn(s), { reports: h, reportStorageError: k, loadReports: R, latestReport: N, isStale: w, generateReport: _ } = Bt();
    R();
    const D = t, z = H(() => a.flags.includes("孕期或哺乳期") ? { ...a.profile, physiologicalStage: "special" } : a.profile || {}), M = P(D.initialPage), q = P(D.initialEditor), W = P(!1), F = P(null), K = P(null), G = P(null), ye = P(ke()), re = P(!1), fe = P(""), Y = P(""), B = P(""), E = H(() => h.value.find((te) => te.id === Y.value) || N(fe.value)), se = H(() => a.records.find((te) => te.date === fe.value)), ee = { overview: "概览", dietAssistant: "维衡AI助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, J = H(() => Ce.value ? ct.value === "error" ? "账号同步暂不可用 · 本机副本保留" : ct.value === "syncing" || ct.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let I, g = 0;
    function f(te, L = null) {
      clearTimeout(I), F.value = { message: te, undo: L }, I = setTimeout(() => F.value = null, 7e3);
    }
    function S(te) {
      M.value = te, window.scrollTo({ top: 0, behavior: "auto" }), je(() => K.value?.focus({ preventScroll: !0 }));
    }
    function ie() {
      q.value = !1, W.value = !0;
    }
    function ae() {
      W.value = !1;
    }
    function st(te) {
      const L = r(te);
      if (L) {
        f(L);
        return;
      }
      q.value = !1, S("overview"), f(Ce.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function Ie(te, L = !1) {
      const le = ++g;
      B.value = "", fe.value = te.date, Y.value = "";
      try {
        const he = _(te, z.value, { force: L });
        await je();
        const ot = await he;
        le === g && fe.value === te.date && (Y.value = ot?.id || "");
      } catch (he) {
        le === g && (B.value = he.message || "分析暂时不可用，请重试。");
      }
    }
    function Se(te) {
      if (!re.value) {
        re.value = !0;
        try {
          const L = v(te);
          if (!L.ok) {
            f(L.error);
            return;
          }
          f("饮食记录已保存，正在分析"), Ie(L.record);
        } finally {
          re.value = !1;
        }
      }
    }
    function lt(te, L) {
      L ? h.value.find((he) => he.id === L) : N(te), fe.value = te, Y.value = L || "", B.value = "", a.records.find((he) => he.date === te);
    }
    function He(te = fe.value) {
      const L = a.records.find((le) => le.date === te);
      L && Ie(L, !0);
    }
    function _e(te) {
      if (!Fe(te.date) || te.date > ke() || Number(te.grams) < 0.1 || Number(te.grams) > 5e3) {
        f("请核对日期与食用克数。");
        return;
      }
      const L = m(te);
      ye.value = te.date, G.value = null, S("diary"), f(L ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    async function wt(te) {
      const L = Ae();
      try {
        if (await Ve(te.items.map((he) => he.foodId)), L !== Ae()) return;
      } catch (he) {
        te.onResult?.({ ok: !1, error: he.message }), f(he.message);
        return;
      }
      const le = c(te);
      if (te.onResult?.(le), !le.ok) {
        f(le.error);
        return;
      }
      ye.value = te.date, S("diary"), f(le.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function $t(te) {
      const L = a.records.find((le) => le.date === te);
      L && (a.records = a.records.filter((le) => le.date !== te), f("这条饮食记录已删除，报告快照仍保留。", () => {
        v(L), F.value = null;
      }));
    }
    return Xe(() => clearTimeout(I)), (te, L) => (n(), l("div", {
      class: me(["vb-app", { "is-diary": M.value === "diary", "is-chat": M.value === "dietAssistant" }]),
      "data-theme": b(s)
    }, [
      e("div", {
        inert: q.value || G.value || fe.value || void 0
      }, [
        x(Yn, {
          active: M.value,
          onNavigate: S
        }, null, 8, ["active"]),
        e("div", Zv, [
          e("header", em, [
            e("span", tm, [
              L[15] || (L[15] = e("span", null, "营养工作台", -1)),
              L[16] || (L[16] = e("i", null, "/", -1)),
              j(o(ee[M.value]), 1)
            ]),
            e("div", nm, [
              e("span", sm, [
                L[17] || (L[17] = e("i", { class: "vb-status-dot" }, null, -1)),
                j(o(J.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                onClick: ie
              }, o(b(Ce) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": b(s) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: L[0] || (L[0] = (...le) => b(y) && b(y)(...le))
              }, [
                x(T, {
                  name: b(s) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, lm),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: L[1] || (L[1] = (le) => S("profile"))
              }, [
                x(T, {
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
            b(u) || b(k) ? (n(), l("p", om, o(b(u) || b(k)), 1)) : $("", !0),
            (n(), l(O, { key: 1 }, [
              Z(x(La, {
                records: b(a).records,
                targets: b(d),
                profile: z.value
              }, null, 8, ["records", "targets", "profile"]), [
                [Tn, M.value === "dietAssistant"]
              ]),
              M.value === "overview" ? (n(), ve(Xn, {
                key: 0,
                profile: z.value,
                nutrition: b(d),
                "record-count": b(i).length,
                records: b(i),
                onEdit: L[2] || (L[2] = (le) => q.value = !0),
                onNavigate: S
              }, null, 8, ["profile", "nutrition", "record-count", "records"])) : $("", !0),
              M.value === "assessment" ? (n(), ve(Di, {
                key: 1,
                records: b(i),
                habits: b(a).habits,
                flags: b(a).flags,
                reports: b(h),
                profile: z.value,
                onNavigate: S,
                onToggleHabit: b(p),
                onOpenReport: lt,
                onRetryReport: He
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : M.value === "diary" ? (n(), ve(cu, {
                key: 2,
                records: b(i),
                reports: b(h),
                profile: z.value,
                nutrition: b(d),
                "initial-date": ye.value,
                saving: re.value,
                onSave: Se,
                onRemove: $t,
                onAnalysis: lt,
                onBrowse: L[3] || (L[3] = (le) => S("food")),
                onDetail: L[4] || (L[4] = (le) => G.value = b(oe)[le])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving"])) : M.value === "food" ? (n(), ve(yd, {
                key: 3,
                onDetail: L[5] || (L[5] = (le) => G.value = b(oe)[le])
              })) : M.value === "mealplan" ? (n(), ve(Vc, {
                key: 4,
                nutrition: b(d),
                preferences: b(a).preferences,
                flags: b(a).flags,
                profile: z.value,
                records: b(a).records,
                onNavigate: S,
                onAddPlan: wt
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : M.value === "profile" ? (n(), ve(sv, {
                key: 5,
                profile: z.value,
                nutrition: b(d),
                flags: b(a).flags,
                "onUpdate:flags": L[6] || (L[6] = (le) => b(a).flags = le),
                preferences: b(a).preferences,
                "onUpdate:preferences": L[7] || (L[7] = (le) => b(a).preferences = le),
                onEdit: L[8] || (L[8] = (le) => q.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences"])) : M.value === "about" ? (n(), ve(Yv, {
                key: 6,
                flags: b(a).flags,
                onNavigate: S
              }, null, 8, ["flags"])) : $("", !0)
            ], 64)),
            e("footer", am, [
              x(T, {
                name: "leaf",
                size: 14
              }),
              L[18] || (L[18] = j("维衡 AI · 把健康，放进每一餐", -1)),
              L[19] || (L[19] = e("span", null, "营养信息仅供一般参考", -1))
            ])
          ], 512)
        ])
      ], 8, Qv),
      q.value ? (n(), ve(Js, {
        key: 0,
        profile: b(a).profile,
        onComplete: st,
        onClose: L[9] || (L[9] = (le) => q.value = !1),
        onLogin: ie
      }, null, 8, ["profile"])) : $("", !0),
      W.value ? (n(), ve(Qn, {
        key: 1,
        onClose: ae
      })) : $("", !0),
      G.value ? (n(), ve(Bl, {
        key: 2,
        "food-id": G.value.key,
        onClose: L[10] || (L[10] = (le) => G.value = null),
        onAdd: _e
      }, null, 8, ["food-id"])) : $("", !0),
      fe.value ? (n(), ve($o, {
        key: 3,
        report: E.value,
        record: se.value,
        stale: E.value ? b(w)(E.value, se.value, z.value) : !1,
        error: B.value,
        onClose: L[11] || (L[11] = (le) => {
          fe.value = "", Y.value = "";
        }),
        onRetry: L[12] || (L[12] = (le) => He())
      }, null, 8, ["report", "record", "stale", "error"])) : $("", !0),
      F.value ? (n(), l("div", im, [
        x(T, {
          name: "check",
          size: 17
        }),
        e("span", null, o(F.value.message), 1),
        F.value.undo ? (n(), l("button", {
          key: 0,
          onClick: L[13] || (L[13] = (...le) => F.value.undo && F.value.undo(...le))
        }, "撤销")) : $("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: L[14] || (L[14] = (le) => F.value = null)
        }, [
          x(T, {
            name: "close",
            size: 15
          })
        ])
      ])) : $("", !0)
    ], 10, Xv));
  }
};
export {
  vm as default
};
