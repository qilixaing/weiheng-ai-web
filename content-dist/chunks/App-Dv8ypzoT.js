import { r as P, p as J, E as Ke, w as pe, o as n, c as l, e, F, a as q, l as on, f as ve, b as an, g as E, j as $, s as De, t as o, k as ce, v as X, y as re, h as N, u as b, G as we, n as Ue, d as We, H as Pn, I as Qe, J as qe, z as it, K as Mn, L as rn, M as $t, N as Tn } from "./vue-runtime-Dpt_fuvu.js";
import { v as Oe, t as he, F as ne, c as gt, r as vt, n as zn, m as Rn, a as jt, b as un, d as dn, M as Ne, e as Pt, s as cn, f as rt, g as Gt, N as On, h as xe, _ as Mt, C as _t, G as vn, i as mt, j as Fn, k as Tt, l as Jt, o as Bn, p as Vn, P as At, R as Ln, q as Ct, u as qn, w as Ht, A as Le, x as lt, y as Kt, z as Gn } from "./IntakeAnalysis-D6nWdW9s.js";
import { a as _e, s as Ye, o as Jn, b as ke, v as Xe, A as zt, c as mn, t as bn, d as Hn, e as ot, _ as z, p as Kn, f as Wn, g as Yn, h as pn, i as ut, u as Xn, j as Qn, k as Zn, l as es } from "./main-vn7tPyWz.js";
function ts(t, a) {
  if (!a || !Oe(a.date) || a.date > he() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(a.meal) || !Array.isArray(a.items) || !a.items.length || a.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const s = String(a.confirmationId || "").slice(0, 100);
  if (!s) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(s)) return { draft: t, duplicate: !0 };
  const d = a.items.map((i) => {
    const r = ne[i.foodId], u = Number(i.grams);
    if (!r || !Number.isFinite(u) || u < 0.1 || u > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: s + ":" + r.key, foodId: r.key, name: r.name, grams: u, meal: a.meal, group: r.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: gt(r) };
  });
  if (new Set(d.map((i) => i.foodId)).size !== d.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...d], appliedBatches: [...t.appliedBatches || [], s] }, duplicate: !1 };
}
const He = Ye("weiheng.reset-signal.v1"), gn = (t) => Jn(t);
let Fe = !1;
const Be = () => Fe;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== He || !t.newValue))
    try {
      const { phase: a } = JSON.parse(t.newValue);
      a === "begin" && (Fe = !0), a === "abort" && (Fe = !1), a === "done" && (Fe = !0, window.location.reload());
    } catch {
    }
});
function Wt(t, a) {
  return new Promise((s, d) => {
    const i = t.open(a);
    i.onerror = i.onblocked = () => d(new Error("本地文件存储暂时无法清理，请关闭其他旧页面后重试。")), i.onsuccess = () => {
      const r = i.result, u = Array.from(r.objectStoreNames);
      if (!u.length) {
        r.close(), s();
        return;
      }
      try {
        const v = r.transaction(u, "readwrite");
        for (const m of u) v.objectStore(m).clear();
        v.oncomplete = () => {
          r.close(), s();
        }, v.onerror = v.onabort = () => {
          r.close(), d(new Error("本地文件清理未完成，请重试。"));
        };
      } catch (v) {
        r.close(), d(v);
      }
    };
  });
}
function Yt(t, a = !1) {
  const s = Array.from({ length: t.length }, (d, i) => t.key(i));
  for (const d of s) d && gn(d) && !(a && d === He) && t.removeItem(d);
}
async function ns({
  local: t = globalThis.localStorage,
  session: a = globalThis.sessionStorage,
  databases: s = globalThis.indexedDB,
  caches: d = globalThis.caches
} = {}) {
  if (Fe) throw new Error("正在清理本地数据，请稍候。");
  Fe = !0;
  const i = (r) => t.setItem(He, JSON.stringify({ phase: r, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), _e.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!s) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      Wt(s, Ye("weiheng.media.v1")),
      Wt(s, Ye("weiheng.chat-attachments.v1"))
    ]), d) for (const r of await d.keys()) gn(r) && await d.delete(r);
    a && Yt(a), Yt(t, !0), i("done"), t.removeItem(He);
  } catch (r) {
    try {
      i("abort"), t.removeItem(He);
    } catch {
    }
    throw Fe = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), r;
  }
}
const bt = "weiheng.local.v2", fn = "weiheng.theme.v1", ze = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function Xt(t) {
  if (!t) return null;
  const a = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", s = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), d = zt.some((r) => r.key === t.activity) ? t.activity : s[String(t.activity)] || "";
  if (Xe({ ...t, sex: a, activity: d })) return null;
  const i = { ...t, sex: a, age: ze(t.age), height: ze(t.height), weight: ze(t.weight), activity: d };
  return Xe(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    a
  ), activity: String(d) };
}
function yn() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const a = JSON.parse(ke.getItem(bt) || "null");
    if (a && typeof a == "object") {
      for (const i of [...Array.isArray(a.records) ? a.records : [], ...Object.values(a.drafts || {})]) for (const r of Array.isArray(i?.entries) ? i.entries : []) r.foodId === "cabbage" && r.name === "白菜" && (r.referenceConfirmed = !1);
      return { ...t, ...a, drafts: a.drafts && typeof a.drafts == "object" ? a.drafts : {}, profile: Xt(a.profile), records: Array.isArray(a.records) ? a.records : [] };
    }
    const s = JSON.parse(ke.getItem("vitabalance.v1") || ke.getItem("vitabalance.guest.v1") || "null"), d = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return s ? { ...t, profile: Xt(s.profile), records: Array.isArray(s.records) ? s.records : [], plans: Array.isArray(s.plans) ? s.plans : [], flags: d.filter(([i]) => s.profile?.[i]).map(([, i]) => i), preferences: [s.profile?.avoid, s.profile?.allergies ? "需要核对的过敏或不耐受项：" + s.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const ue = Ke(yn()), Re = P("");
let Dt = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  Dt = !0;
  try {
    Object.assign(ue, yn());
  } finally {
    Dt = !1;
  }
});
const ss = (() => {
  try {
    return ke.getItem(fn);
  } catch {
    return null;
  }
})(), hn = P(ss === "dark" ? "dark" : "light"), dt = J(() => mn(ue.flags.includes("孕期或哺乳期") ? null : ue.profile));
pe(ue, () => {
  if (!(Be() || Dt))
    try {
      ke.setItem(bt, JSON.stringify({ ...ue, calculated: dt.value })), Re.value = "";
    } catch {
      Re.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
pe(hn, (t) => {
  if (!Be())
    try {
      ke.setItem(fn, t);
    } catch {
      Re.value = "主题偏好暂时无法保存。";
    }
});
function Rt() {
  const t = J(() => [...ue.records].sort((v, m) => m.date.localeCompare(v.date)));
  function a(v) {
    const m = Xe(v);
    return m || (ue.profile = { ...ue.profile, sex: v.sex || "", ageMonths: ze(v.ageMonths), physiologicalStage: v.physiologicalStage || "general", age: ze(v.age), height: ze(v.height), weight: ze(v.weight), activity: v.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function s(v) {
    if (Be()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Oe(v.date)) return { ok: !1, error: "请选择有效日期。" };
    const m = ue.records.find((y) => y.date === v.date), c = Array.isArray(v.entries) ? Rn(v, m) : (
      /** @type {DailyRecord} */
      { ...v, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (m && jt(m) === jt(c)) return { ok: !0, record: m, unchanged: !0 };
    const p = [...ue.records.filter((y) => y.date !== c.date), c];
    try {
      ke.setItem(bt, JSON.stringify({ ...ue, records: p, calculated: dt.value }));
    } catch {
      return Re.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: Re.value };
    }
    return ue.records = p, { ok: !0, record: c };
  }
  function d(v) {
    if (!Oe(v)) return null;
    if (!ue.drafts[v]) {
      const m = ue.records.find((c) => c.date === v);
      ue.drafts[v] = { date: v, entries: vt(m), notes: m?.notes || "", photoId: m?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return ue.drafts[v];
  }
  function i(v) {
    const m = d(v.date);
    if (!m) return !1;
    const c = ne[v.foodId || ""];
    return m.entries.push({ id: crypto.randomUUID(), foodId: v.foodId || null, name: c?.name || v.name || "", grams: Number(v.grams), meal: v.meal || "unspecified", group: v.group, source: v.source || "catalogue", estimated: !!v.estimated, referenceConfirmed: !0, nutritionSnapshot: zn(v.nutritionSnapshot, c?.key) || gt(c) }), !Re.value;
  }
  function r(v, m) {
    const c = new Set(ue.habits[v] || []);
    c.has(m) ? c.delete(m) : c.add(m), ue.habits[v] = [...c];
  }
  function u(v) {
    if (Be()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const m = ue.drafts[v.date] || { date: v.date, entries: vt(ue.records.find((y) => y.date === v.date)), appliedBatches: [] }, c = ts(m, v);
      if (c.duplicate) return { ok: !0, duplicate: !0 };
      const p = { ...ue.drafts, [v.date]: c.draft };
      return ke.setItem(bt, JSON.stringify({ ...ue, drafts: p, calculated: dt.value })), ue.drafts = p, { ok: !0, duplicate: !1 };
    } catch (m) {
      return { ok: !1, error: m.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: ue, theme: hn, nutrition: dt, records: t, storageError: Re, updateProfile: a, saveRecord: s, ensureDraft: d, addToDraft: i, addPlanToDraft: u, toggleHabit: r };
}
let It;
function ls() {
  return It || (It = new Promise((t, a) => {
    if (!globalThis.indexedDB) {
      a(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const s = indexedDB.open(Ye("weiheng.media.v1"), 1);
    s.onupgradeneeded = () => {
      const d = s.result;
      for (const i of ["photos", "reports"]) d.objectStoreNames.contains(i) || d.createObjectStore(i, { keyPath: "id" });
    }, s.onsuccess = () => t(s.result), s.onerror = () => a(new Error("无法打开本地存储，请检查浏览器隐私设置。")), s.onblocked = () => a(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), It;
}
async function ft(t, a, s) {
  const d = await ls();
  if (a === "readwrite" && Be()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, r) => {
    const u = d.transaction(t, a);
    let v;
    const m = s(u.objectStore(t));
    m.onsuccess = () => {
      v = m.result;
    }, u.oncomplete = () => i(v), u.onabort = u.onerror = () => r(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const Nt = (t, a) => ft(t, "readwrite", (s) => s.put(JSON.parse(JSON.stringify(a)))), os = (t, a) => ft(t, "readonly", (s) => s.get(a)), as = (t) => ft(t, "readonly", (a) => a.getAll()), is = (t, a) => ft(t, "readwrite", (s) => s.delete(a));
async function yt(t, a) {
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
async function kn(t, a, s, d) {
  const i = bn(9e4), r = d ? Hn([d, i]) : i;
  let u;
  try {
    u = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    a, stream: !0 }), signal: r });
  } catch (h) {
    throw new Error(h?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  if (!u.ok) {
    let h;
    try {
      h = await u.json();
    } catch {
      throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
    }
    const R = new Error(h.error || "AI 服务暂时不可用。");
    throw R.code = h.code, R;
  }
  if (!u.body) throw new Error("浏览器没有提供流式读取能力，请更新浏览器后重试。");
  const v = u.body.getReader(), m = new TextDecoder();
  let c = "", p = !1, y = null;
  const k = (h) => {
    const R = h.split(/\r?\n/).filter((w) => w.startsWith("data:")).map((w) => w.slice(5).trimStart()).join(`
`);
    if (!R) return;
    let T;
    try {
      T = JSON.parse(R);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (T?.type === "error") {
      const w = new Error(T.message || "AI 暂时无法回复，请重试。");
      throw w.code = T.code, w;
    }
    if (T?.type === "progress" && T.step) {
      s(T);
      return;
    }
    if (T?.type === "delta" && typeof T.text == "string") {
      s(T);
      return;
    }
    T?.type === "done" && typeof T.model == "string" && (y = T, p = !0, s(T));
  };
  try {
    for (; !p; ) {
      const { value: h, done: R } = await v.read();
      if (R) break;
      c += m.decode(h, { stream: !0 });
      let T;
      for (; (T = c.search(/\r?\n\r?\n/)) >= 0; ) {
        const w = c.slice(T).match(/^\r?\n\r?\n/)[0];
        if (k(c.slice(0, T)), c = c.slice(T + w.length), p) break;
      }
    }
    if (c += m.decode(), c.trim() && !p && k(c), !p || !y) throw new Error("AI 流式连接提前结束，请重试。");
    return y;
  } finally {
    v.releaseLock();
  }
}
async function rs(t, a) {
  const s = await kn("meal-plan", t, (d) => {
    d.type === "progress" && a(d.step);
  });
  if (!s.result || !["ready", "needs_evidence"].includes(s.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return s.result;
}
const Pe = P([]), pt = P(""), St = /* @__PURE__ */ new Map();
let Et;
function Ot(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function us(t) {
  return t.filter((a) => {
    const s = a.referenceConfirmed === !1 ? void 0 : ne[a.foodId || ""];
    return Ne.some((d) => {
      const i = Pt(a, s, d.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function Qt(t) {
  Pe.value = [t, ...Pe.value.filter((a) => a.id !== t.id)].sort((a, s) => s.requestedAt.localeCompare(a.requestedAt));
}
async function ct(t) {
  try {
    await Nt("reports", t), pt.value = "", Qt(t);
  } catch (a) {
    throw pt.value = Ot(a), Qt({ ...t, persistenceFailed: !0 }), a;
  }
}
function wn() {
  return Et || (Et = (async () => {
    try {
      Pe.value = (await as("reports")).sort((t, a) => a.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Pe.value])
        t.status === "pending" && await ct({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      pt.value = Ot(t);
    }
  })()), Et;
}
function ds(t) {
  return Pe.value.find((a) => a.date === t);
}
function cs(t, a, s) {
  return !a || t.dataVersion !== un(a, s);
}
async function vs(t, a, { force: s = !1 } = {}) {
  const d = ot();
  if (await wn(), ot() !== d) return;
  const i = un(t, a), r = `${d}:${t.date}:${i}`, u = St.get(r);
  if (u) return u;
  const v = Pe.value.find(
    (k) => k.date === t.date && k.dataVersion === i && k.status === "complete" && !k.persistenceFailed
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
  }, c = vt(t), p = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: jt(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: c,
      intake: dn(c),
      profile: m
    },
    result: null,
    error: ""
  }, y = (async () => {
    await ct(p);
    try {
      const k = await yt("analyze-day", {
        date: t.date,
        entries: c,
        profile: m,
        requestId: p.id
      });
      if (ot() !== d) return;
      const h = us(c);
      if (h.length) {
        const R = k.calculation?.estimation, T = R?.foods || [];
        if (!(R?.status === "complete" && R.missingFoodCount === h.length && T.length === h.length && h.every((A) => {
          const j = T.find((S) => S.entryId === String(c.indexOf(A))), O = A.referenceConfirmed === !1 ? void 0 : ne[A.foodId || ""], M = Ne.filter((S) => {
            const B = Pt(A, O, S.id);
            return typeof B.value != "number" && !B.range;
          }).map((S) => S.id);
          return !!(j && M.every((S) => {
            const B = j.values[S];
            return B && Number.isFinite(B.low) && Number.isFinite(B.high) && B.high > B.low;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      await ct({
        ...p,
        status: "complete",
        generatedAt: k.generatedAt,
        model: k.model,
        result: k.analysis,
        calculation: k.calculation
      });
    } catch (k) {
      if (ot() !== d) return;
      await ct({ ...p, status: "failed", error: Ot(k) });
    }
    return Pe.value.find((k) => k.id === p.id);
  })();
  St.set(r, y);
  try {
    return await y;
  } finally {
    St.delete(r);
  }
}
function Ft() {
  return {
    reports: Pe,
    reportStorageError: pt,
    loadReports: wn,
    latestReport: ds,
    isStale: cs,
    generateReport: vs
  };
}
const ms = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], bs = {
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
    const s = t, d = a, i = P(null), r = P(!1), u = J(() => (s.max - s.min) * 0.16), v = J(() => {
      const w = Number(s.modelValue);
      return String(s.modelValue).trim() && Number.isFinite(w) ? Math.min(s.max, Math.max(s.min, w)) : s.fallback;
    }), m = J(() => {
      const w = (v.value - s.min) / u.value, A = w - Math.round(w);
      return Array.from({ length: 31 }, (j, O) => ({
        key: O,
        major: O % 5 === 0,
        left: `${50 + (O - 15 - A) / 30 * 100}%`
      }));
    });
    let c = null;
    function p(w) {
      const A = Math.round((w - s.min) / s.step), j = s.step < 1 ? 1 : 0;
      return Number(Math.min(s.max, Math.max(s.min, s.min + A * s.step)).toFixed(j));
    }
    function y(w) {
      d("update:modelValue", p(w));
    }
    function k(w) {
      w.pointerType === "mouse" && w.button !== 0 || (w.preventDefault(), i.value.setPointerCapture(w.pointerId), r.value = !0, c = { x: w.clientX, value: v.value });
    }
    function h(w) {
      if (!c || !r.value) return;
      const A = i.value.getBoundingClientRect().width || 1;
      y(c.value + (w.clientX - c.x) / A * u.value);
    }
    function R() {
      r.value = !1, c = null;
    }
    function T(w) {
      const A = {
        ArrowRight: s.step,
        ArrowUp: s.step,
        ArrowLeft: -s.step,
        ArrowDown: -s.step,
        PageUp: s.step * 10,
        PageDown: -s.step * 10
      };
      w.key === "Home" ? (w.preventDefault(), y(s.min)) : w.key === "End" ? (w.preventDefault(), y(s.max)) : A[w.key] && (w.preventDefault(), y(v.value + A[w.key]));
    }
    return (w, A) => (n(), l("div", {
      ref_key: "ruler",
      ref: i,
      class: ve(["vb-ruler", { "is-dragging": r.value }]),
      role: "slider",
      tabindex: "0",
      "aria-label": `${t.label}刻度`,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": v.value,
      "aria-valuetext": `${v.value} ${t.unit}`,
      "aria-orientation": "horizontal",
      onPointerdown: k,
      onPointermove: h,
      onPointerup: R,
      onPointercancel: R,
      onLostpointercapture: R,
      onKeydown: T
    }, [
      A[0] || (A[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (n(!0), l(F, null, q(m.value, (j) => (n(), l("i", {
        key: j.key,
        class: ve({ major: j.major }),
        style: on({ left: j.left })
      }, null, 6))), 128)),
      A[1] || (A[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, ms));
  }
}, ps = { class: "vb-dialog-overlay" }, gs = { class: "vb-wizard-top" }, fs = { class: "vb-icon-badge" }, ys = ["aria-valuenow", "aria-label"], hs = { class: "vb-wizard-copy" }, ks = { class: "vb-small-label" }, ws = { id: "vb-wizard-title" }, $s = { id: "vb-step-hint" }, _s = {
  key: 0,
  class: "vb-sex-field"
}, As = { class: "vb-sr-only" }, Cs = ["aria-pressed", "onClick"], Is = { class: "vb-person-symbol" }, Ss = { class: "vb-choice-check" }, Es = {
  key: 1,
  class: "vb-number-step"
}, xs = { for: "vb-step-number" }, Us = { class: "vb-number-control" }, js = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], Ds = {
  key: 0,
  class: "vb-field"
}, Ns = { class: "vb-input-range" }, Ps = {
  key: 2,
  class: "vb-activity-field"
}, Ms = { class: "vb-sr-only" }, Ts = ["aria-pressed", "onClick"], zs = { class: "vb-activity-icon" }, Rs = { class: "vb-radio-mark" }, Os = { key: 0 }, Fs = {
  key: 3,
  class: "vb-field"
}, Bs = {
  key: 4,
  class: "vb-skip-row"
}, Vs = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, Ls = { class: "vb-wizard-actions" }, qs = ["disabled"], Gs = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, Js = { class: "vb-wizard-account-login" }, Hs = { class: "vb-wizard-privacy" }, Ks = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = Ke(s.profile ? { ...s.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), r = P(0), u = P(""), v = P(null), m = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], c = J(() => {
      const w = m[r.value], A = Kn(i.age)[w.key];
      return A ? { ...w, min: A[0], max: A[1] } : w;
    });
    function p() {
      if (r.value === 0 || r.value === 4 || !String(i[c.value.key] ?? "").trim()) return "";
      const w = Number(i[c.value.key]);
      return !Number.isFinite(w) || w < c.value.min || w > c.value.max || r.value === 1 && !Number.isInteger(w) ? `请输入 ${c.value.min}–${c.value.max} ${c.value.unit}${r.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function y(w) {
      i.sex = w, u.value = "";
    }
    function k() {
      i[c.value.key] = "", u.value = "", r.value < 4 && r.value++;
    }
    function h() {
      if (u.value = p(), !u.value) {
        if (r.value < 4) {
          r.value++;
          return;
        }
        u.value = Xe(i), u.value || d("complete", { ...i });
      }
    }
    function R() {
      Ue(() => v.value?.querySelector(".vb-step-input, .vb-choice-button, .vb-activity-choice")?.focus());
    }
    pe(r, () => {
      u.value = "", R();
    }), an(R);
    function T(w) {
      if (w.key === "Escape" && s.profile) {
        d("close");
        return;
      }
      if (w.key !== "Tab") return;
      const A = [...v.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], j = A[0], O = A.at(-1);
      w.shiftKey && document.activeElement === j ? (w.preventDefault(), O.focus()) : !w.shiftKey && document.activeElement === O && (w.preventDefault(), j.focus());
    }
    return (w, A) => (n(), l("div", ps, [
      e("section", {
        ref_key: "dialog",
        ref: v,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: T
      }, [
        e("div", gs, [
          e("span", fs, [
            E(z, { name: "leaf" })
          ]),
          A[10] || (A[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (n(), l("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: A[0] || (A[0] = (j) => w.$emit("close"))
          }, [
            E(z, { name: "close" })
          ])) : $("", !0)
        ]),
        e("div", {
          class: "vb-wizard-progress",
          role: "progressbar",
          "aria-valuenow": r.value + 1,
          "aria-valuemin": "1",
          "aria-valuemax": "5",
          "aria-label": `档案设置，第 ${r.value + 1} 步，共 5 步`
        }, [
          (n(), l(F, null, q(5, (j) => e("span", {
            key: j,
            class: ve({ filled: j <= r.value + 1 })
          }, null, 2)), 64))
        ], 8, ys),
        e("form", {
          onSubmit: De(h, ["prevent"])
        }, [
          e("div", hs, [
            e("span", ks, "第 " + o(r.value + 1) + " 步 / 共 5 步", 1),
            e("h2", ws, o(c.value.title), 1),
            e("p", $s, o(c.value.hint), 1)
          ]),
          r.value === 0 ? (n(), l("fieldset", _s, [
            e("legend", As, o(c.value.question), 1),
            (n(), l(F, null, q([["male", "男性"], ["female", "女性"]], ([j, O]) => e("button", {
              key: j,
              type: "button",
              class: ve(["vb-choice-button", { selected: i.sex === j }]),
              "aria-pressed": i.sex === j,
              onClick: (M) => y(j)
            }, [
              e("span", Is, o(j === "male" ? "♂" : "♀"), 1),
              e("strong", null, o(O), 1),
              e("span", Ss, [
                i.sex === j ? (n(), ce(z, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : $("", !0)
              ])
            ], 10, Cs)), 64))
          ])) : r.value < 4 ? (n(), l("div", Es, [
            e("label", xs, o(c.value.question), 1),
            e("div", Us, [
              X((n(), l("input", {
                id: "vb-step-number",
                key: c.value.key,
                "onUpdate:modelValue": A[1] || (A[1] = (j) => i[c.value.key] = j),
                class: "vb-step-input",
                type: "number",
                inputmode: r.value === 1 ? "numeric" : "decimal",
                min: c.value.min,
                max: c.value.max,
                step: r.value === 1 ? 1 : 0.1,
                placeholder: c.value.placeholder,
                "aria-invalid": !!u.value,
                "aria-describedby": u.value ? "vb-step-error" : "vb-step-hint",
                onInput: A[2] || (A[2] = (j) => u.value = "")
              }, null, 40, js)), [
                [re, i[c.value.key]]
              ]),
              e("span", null, o(c.value.unit), 1)
            ]),
            E(bs, {
              modelValue: i[c.value.key],
              "onUpdate:modelValue": [
                A[3] || (A[3] = (j) => i[c.value.key] = j),
                A[4] || (A[4] = (j) => u.value = "")
              ],
              min: c.value.min,
              max: c.value.max,
              step: r.value === 1 ? 1 : 0.1,
              fallback: Number(c.value.placeholder),
              label: c.value.question,
              unit: c.value.unit
            }, null, 8, ["modelValue", "min", "max", "step", "fallback", "label", "unit"]),
            r.value === 1 && String(i.age) === "0" ? (n(), l("label", Ds, [
              A[11] || (A[11] = N("月龄（可选，0–11个月）", -1)),
              X(e("input", {
                "onUpdate:modelValue": A[5] || (A[5] = (j) => i.ageMonths = j),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [re, i.ageMonths]
              ])
            ])) : $("", !0),
            e("p", Ns, o(c.value.min) + "–" + o(c.value.max) + " " + o(c.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (n(), l("fieldset", Ps, [
            e("legend", Ms, o(c.value.question), 1),
            (n(!0), l(F, null, q(b(zt), (j) => (n(), l("button", {
              key: j.key,
              type: "button",
              class: ve(["vb-activity-choice", { selected: i.activity === j.key }]),
              "aria-pressed": i.activity === j.key,
              onClick: (O) => i.activity = j.key
            }, [
              e("span", zs, [
                E(z, {
                  name: j.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, o(j.label), 1),
                e("small", null, o(j.detail), 1)
              ]),
              e("span", Rs, [
                i.activity === j.key ? (n(), l("i", Os)) : $("", !0)
              ])
            ], 10, Ts))), 128))
          ])),
          r.value === 4 ? (n(), l("label", Fs, [
            A[13] || (A[13] = N("生理阶段（可选）", -1)),
            X(e("select", {
              "onUpdate:modelValue": A[6] || (A[6] = (j) => i.physiologicalStage = j)
            }, [...A[12] || (A[12] = [
              e("option", { value: "general" }, "一般情况", -1),
              e("option", { value: "pregnant" }, "孕期", -1),
              e("option", { value: "lactating" }, "哺乳期", -1),
              e("option", { value: "special" }, "其他需专业评估的情况", -1)
            ])], 512), [
              [we, i.physiologicalStage]
            ]),
            A[14] || (A[14] = e("small", null, "特殊阶段暂停通用营养目标；记录和查询仍可使用。", -1))
          ])) : $("", !0),
          r.value < 4 ? (n(), l("div", Bs, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: k
            }, "跳过此项")
          ])) : $("", !0),
          e("p", Vs, o(u.value), 1),
          e("div", Ls, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: r.value === 0 && !t.profile,
              onClick: A[7] || (A[7] = (j) => r.value > 0 ? r.value-- : w.$emit("close"))
            }, [
              E(z, {
                name: "back",
                size: 17
              }),
              N(o(r.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, qs),
            e("button", Gs, [
              N(o(r.value === 4 ? "保存我的身体档案" : "下一步"), 1),
              E(z, {
                name: "arrow",
                size: 17
              })
            ])
          ])
        ], 32),
        e("button", {
          type: "button",
          class: "vb-button vb-button-quiet vb-skip-all",
          onClick: A[8] || (A[8] = (j) => d("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", Js, [
          A[15] || (A[15] = N("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: A[9] || (A[9] = (j) => d("login"))
          }, "登录")
        ]),
        e("p", Hs, [
          E(z, {
            name: "lock",
            size: 13
          }),
          A[16] || (A[16] = N("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, ht = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function Bt(t) {
  if (!t?.expanded) return t?.state || "";
  const a = String(t.source?.description || ""), s = [];
  return /\bRAW\b/.test(a) ? s.push("生") : /\bRSTD\b|ROASTED/.test(a) ? s.push("烤熟") : /\bBKD\b/.test(a) ? s.push("烘焙") : /FRIED/.test(a) ? s.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(a) && s.push("熟"), /\bDRY MIX\b/.test(a) ? s.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(a) && s.push("干制"), /\bCND\b/.test(a) && s.push("罐装"), /\bFRZ\b|FROZEN/.test(a) && s.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(a) ? s.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(a) && s.push("加盐"), s.length ? s.join(" · ") : "具体品种与配方见数据来源";
}
const $n = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function Ws(t) {
  return ($n.find((s) => s.items.some(([d]) => d === t?.key) || [s.name, ...s.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([s]) => ne[s]?.source).map(([s, d]) => ({ id: s, label: d }));
}
const Ys = Object.fromEntries($n.flatMap((t) => t.items)), _n = (t) => Ys[t] || "";
function Xs(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function An(t) {
  const a = P(null), s = P(!1), d = P(!1);
  let i = 0;
  async function r(u = !1) {
    const v = b(typeof t == "function" ? t() : t), m = ++i;
    if (a.value = null, d.value = !1, s.value = !!v && !v.image, !v) {
      s.value = !1;
      return;
    }
    try {
      a.value = await Xs(v, { force: u }), d.value = !a.value;
    } catch {
      d.value = !0;
    } finally {
      m === i && (s.value = !1);
    }
  }
  return pe(() => b(typeof t == "function" ? t() : t)?.key, () => r(), { immediate: !0 }), { photo: a, loading: s, failed: d, retry: () => r(!0) };
}
const Qs = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, Zs = { key: 0 }, el = { key: 1 }, tl = {
  key: 2,
  role: "status"
}, nl = { key: 3 }, sl = { class: "vb-portion-macros" }, ll = { key: 0 }, ol = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, al = { class: "vb-estimate-adjust" }, il = { class: "vb-field" }, rl = ["disabled"], ul = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = P(!1), r = P(""), u = P(null), v = P("");
    let m = 0;
    function c(k) {
      try {
        const R = JSON.parse(ke.getItem("weiheng.food-estimate." + k?.key) || "null");
        if (R?.estimate)
          return u.value = { ...R, cached: !0 }, v.value = R.recipe || "", d("resolved", u.value), !0;
      } catch {
      }
      const h = cn.estimates?.[k?.key];
      return h ? (u.value = { foodId: k.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: h.model, generatedAt: h.generatedAt, estimate: { entryId: k.key, name: k.name, grams: 100, values: h.values, assumption: h.assumption } }, d("resolved", u.value), !0) : !1;
    }
    async function p() {
      const k = ++m, h = s.food?.key;
      i.value = !0, r.value = "", u.value = null, d("resolved", null);
      try {
        const R = await yt("food-estimate", { foodId: h, recipe: v.value.trim() });
        if (k !== m) return;
        u.value = R;
        try {
          ke.setItem("weiheng.food-estimate." + h, JSON.stringify({ ...R, recipe: v.value }));
        } catch {
          r.value = "估算已返回，但本机缓存保存失败。";
        }
        d("resolved", R);
      } catch (R) {
        k === m && (r.value = R.message);
      } finally {
        k === m && (i.value = !1);
      }
    }
    pe(() => s.food?.key, () => {
      m++, v.value = "", r.value = "", i.value = !1, u.value = null, s.food && c(s.food);
    }, { immediate: !0 }), We(() => {
      m++;
    });
    const y = (k) => k ? `${Math.round(k.low * 10) / 10}–${Math.round(k.high * 10) / 10}` : "未知";
    return (k, h) => (n(), l("section", Qs, [
      e("h3", null, o(u.value ? "AI 估算参考" : "AI 营养估算"), 1),
      u.value?.estimate ? (n(), l("p", Zs, [...h[1] || (h[1] = [
        e("strong", null, "每100克可食部 · AI估算，非数据库值", -1)
      ])])) : (n(), l("p", el, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (n(), l("p", tl, "正在估算…")) : $("", !0),
      u.value?.estimate ? (n(), l("div", nl, [
        e("div", sl, [
          (n(!0), l(F, null, q(b(Ne).filter((R) => u.value.estimate.values[R.id]), (R) => (n(), l("div", {
            key: R.id
          }, [
            e("span", null, o(R.name), 1),
            e("strong", null, [
              N(o(y(u.value.estimate.values[R.id])) + " ", 1),
              e("small", null, o(R.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, o(u.value.estimate.assumption), 1),
        u.value.cached ? (n(), l("small", ll, "已保存的预估 · " + o(u.value.model || u.value.requestedModel) + " · " + o(u.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : $("", !0),
        h[2] || (h[2] = e("small", null, "此范围由 AI 按名称、类别和生熟状态估算；原料比例、用油和做法不同会造成差异。维生素和矿物质仍显示未知，不作为数据库检测值。", -1))
      ])) : $("", !0),
      r.value ? (n(), l("p", ol, o(r.value), 1)) : $("", !0),
      e("details", al, [
        e("summary", null, o(u.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", il, [
          h[3] || (h[3] = N("原料与做法", -1)),
          X(e("textarea", {
            "onUpdate:modelValue": h[0] || (h[0] = (R) => v.value = R),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [re, v.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: p
        }, o(i.value ? "估算中…" : r.value ? "重试估算" : u.value ? "按补充内容重新估算" : "生成估算"), 9, rl)
      ])
    ]));
  }
};
function dl(t) {
  const a = String(t?.name || ""), s = String(t?.state || ""), d = (i, r) => ({ label: `${i} · 估算${r}克`, grams: r });
  return /米饭/.test(a) && !/生|干/.test(s) ? [d("小碗", 100), d("中碗", 150), d("大碗", 200)] : /鸡蛋/.test(a) && !/粉|液|鸭|鹅/.test(a) ? [d("1个去壳", 50)] : /香蕉/.test(a) ? [d("1根去皮", 100)] : /苹果/.test(a) ? [d("小个去核", 150), d("中个去核", 200)] : /牛奶|酸奶/.test(a) && !/粉|干酪|奶油/.test(a) ? [d("小杯（按重量）", 200), d("一份（按重量）", 250)] : [];
}
const cl = {
  key: 0,
  class: "vb-portion-presets"
}, vl = ["onClick"], Cn = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = J(() => dl(s.food));
    return (r, u) => i.value.length ? (n(), l("div", cl, [
      u[0] || (u[0] = e("span", null, "份量参考", -1)),
      (n(!0), l(F, null, q(i.value, (v) => (n(), l("button", {
        key: v.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (m) => d("choose", v.grams)
      }, o(v.label), 9, vl))), 128)),
      u[1] || (u[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : $("", !0);
  }
}, ml = ["src", "alt", "loading"], bl = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, Vt = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = P(!1);
    return pe(() => s.photo?.image, () => i.value = !1), (r, u) => (n(), l("div", {
      class: ve(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (n(), l("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: u[0] || (u[0] = (v) => {
          i.value = !0, d("image-error");
        })
      }, null, 40, ml)) : (n(), l("div", bl, [
        E(z, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, o(b(_n)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, o(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (n(), l("span", {
        key: 2,
        class: ve({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, o(t.photo.imageLabel || "食物照片"), 3)) : $("", !0)
    ], 2));
  }
}), pl = ["aria-label"], gl = ["aria-label"], fl = { class: "vb-feature-dialog-body" }, Ze = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: a }) {
    const s = a, d = P(null), i = document.activeElement;
    an(() => Ue(() => d.value?.focus())), We(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function r(u) {
      if (u.key === "Escape" && (u.preventDefault(), s("close")), u.key !== "Tab") return;
      const v = [...d.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((p) => p.getClientRects().length);
      if (!v.length) {
        u.preventDefault();
        return;
      }
      const m = v[0], c = v.at(-1);
      u.shiftKey && (document.activeElement === m || document.activeElement === d.value) ? (u.preventDefault(), c.focus()) : !u.shiftKey && document.activeElement === c && (u.preventDefault(), m.focus());
    }
    return (u, v) => (n(), l("div", {
      class: "vb-feature-overlay",
      onClick: v[1] || (v[1] = De((m) => u.$emit("close"), ["self"]))
    }, [
      e("section", {
        ref_key: "panel",
        ref: d,
        class: ve(["vb-feature-dialog", { "is-wide": t.wide }]),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t.title,
        tabindex: "-1",
        onKeydown: r
      }, [
        e("header", null, [
          e("h2", null, o(t.title), 1),
          e("button", {
            type: "button",
            class: "vb-icon-button",
            "aria-label": "关闭" + t.title,
            onClick: v[0] || (v[0] = (m) => u.$emit("close"))
          }, [
            E(z, { name: "close" })
          ], 8, gl)
        ]),
        e("div", fl, [
          Pn(u.$slots, "default")
        ])
      ], 42, pl)
    ]));
  }
}, yl = { class: "vb-food-detail-top" }, hl = { class: "vb-eyebrow" }, kl = { class: "vb-food-state" }, wl = { class: "vb-pill" }, $l = {
  key: 0,
  class: "vb-field"
}, _l = ["value"], Al = ["value"], Cl = {
  key: 0,
  class: "vb-intake-more"
}, Il = { class: "vb-portion-controls" }, Sl = ["max"], El = ["value"], xl = { class: "vb-portion-macros" }, Ul = { key: 0 }, jl = { key: 0 }, Dl = ["disabled"], Nl = { class: "vb-food-all-nutrients" }, Pl = { class: "vb-nutrient-table" }, Ml = { class: "vb-nutrient-table-head" }, Tl = { key: 0 }, zl = ["href"], Rl = { key: 1 }, Ol = { key: 2 }, Fl = ["href"], Bl = ["href"], Vl = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = P(s.foodId), r = P(100), u = P(he()), v = P("unspecified"), m = P(null);
    pe(() => s.foodId, (M) => {
      i.value = M;
    }), pe(i, () => {
      m.value = null;
    });
    const c = J(() => ne[i.value]), p = J(() => Ws(ne[s.foodId])), y = J(() => Ne.some((M) => typeof c.value?.nutrients?.[M.id] != "number")), k = J(() => gt(c.value, y.value ? m.value : null)), h = J(() => dn([{ foodId: c.value.key, grams: Number(r.value), nutritionSnapshot: k.value }]).totals), R = J(() => Number(r.value) >= 0.1 && Number(r.value) <= 5e3 && u.value && u.value <= he()), { photo: T, loading: w, failed: A } = An(() => c.value), j = J(() => T.value?.imageCredit || T.value);
    function O() {
      R.value && d("add", { foodId: c.value.key, grams: Number(r.value), date: u.value, meal: v.value, nutritionSnapshot: k.value });
    }
    return (M, S) => c.value ? (n(), ce(Ze, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: S[6] || (S[6] = (B) => M.$emit("close"))
    }, {
      default: Qe(() => [
        e("div", yl, [
          e("figure", null, [
            E(Vt, {
              food: c.value,
              photo: b(T),
              loading: b(w),
              failed: b(A),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", hl, o(c.value.categoryName), 1),
            e("h1", null, o(b(_n)(c.value.key) || b(ht)(c.value)), 1),
            e("p", kl, o(b(Bt)(c.value)), 1),
            e("span", wl, o(c.value.source ? "数据库" : m.value ? "AI估算" : "数据不完整"), 1),
            p.value.length ? (n(), l("label", $l, [
              S[7] || (S[7] = N("选择营养样本", -1)),
              X(e("select", {
                "onUpdate:modelValue": S[0] || (S[0] = (B) => i.value = B),
                "aria-label": "选择营养样本"
              }, [
                p.value.some((B) => B.id === s.foodId) ? $("", !0) : (n(), l("option", {
                  key: 0,
                  value: s.foodId
                }, "当前食物 · " + o(b(ne)[s.foodId]?.source ? "数据库" : "通用估算"), 9, _l)),
                (n(!0), l(F, null, q(p.value, (B) => (n(), l("option", {
                  key: B.id,
                  value: B.id
                }, o(B.label), 9, Al))), 128))
              ], 512), [
                [we, i.value]
              ]),
              S[8] || (S[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : $("", !0)
          ])
        ]),
        y.value ? (n(), l("details", Cl, [
          S[9] || (S[9] = e("summary", null, "查看估算依据与调整", -1)),
          E(ul, {
            food: c.value,
            onResolved: S[1] || (S[1] = (B) => m.value = B)
          }, null, 8, ["food"])
        ])) : $("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: De(O, ["prevent"])
        }, [
          E(Cn, {
            food: c.value,
            onChoose: S[2] || (S[2] = (B) => r.value = B)
          }, null, 8, ["food"]),
          e("div", Il, [
            e("label", null, [
              S[10] || (S[10] = N("可食部重量", -1)),
              X(e("input", {
                "onUpdate:modelValue": S[3] || (S[3] = (B) => r.value = B),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [re, r.value]
              ]),
              S[11] || (S[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              S[12] || (S[12] = N("记录日期", -1)),
              X(e("input", {
                "onUpdate:modelValue": S[4] || (S[4] = (B) => u.value = B),
                type: "date",
                max: b(he)(),
                required: ""
              }, null, 8, Sl), [
                [re, u.value]
              ])
            ]),
            e("label", null, [
              S[13] || (S[13] = N("餐次", -1)),
              X(e("select", {
                "onUpdate:modelValue": S[5] || (S[5] = (B) => v.value = B)
              }, [
                (n(!0), l(F, null, q(b(rt), ([B, se]) => (n(), l("option", {
                  key: B,
                  value: B
                }, o(se), 9, El))), 128))
              ], 512), [
                [we, v.value]
              ])
            ])
          ]),
          e("div", xl, [
            (n(!0), l(F, null, q(b(Ne), (B) => (n(), l("div", {
              key: B.id
            }, [
              e("span", null, o(B.id === "carbs" ? "碳水" : B.name), 1),
              e("strong", null, [
                N(o(b(Gt)(h.value[B.id])) + " ", 1),
                h.value[B.id].value != null || h.value[B.id].range ? (n(), l("small", Ul, o(B.unit), 1)) : $("", !0)
              ]),
              h.value[B.id].range ? (n(), l("small", jl, "AI估算")) : $("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !R.value
          }, [
            E(z, {
              name: "plus",
              size: 16
            }),
            S[14] || (S[14] = N("添加记录", -1))
          ], 8, Dl),
          S[15] || (S[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", Nl, [
          S[20] || (S[20] = e("summary", null, "查看完整营养与依据", -1)),
          S[21] || (S[21] = e("p", null, "每100克可食部；未知值不按0计算。范围为AI估算，非实测值。", -1)),
          e("div", Pl, [
            e("div", Ml, [
              S[16] || (S[16] = e("span", null, "营养指标", -1)),
              S[17] || (S[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + o(r.value) + " 克", 1)
            ]),
            (n(!0), l(F, null, q(b(On), (B) => (n(), l("div", {
              key: B.id
            }, [
              e("span", null, o(B.name), 1),
              e("span", null, o(b(xe)(c.value.nutrients[B.id])) + " " + o(c.value.nutrients[B.id] != null ? B.unit : ""), 1),
              e("span", null, o(b(Gt)(h.value[B.id])) + " " + o(h.value[B.id].value != null || h.value[B.id].range ? B.unit : "") + o(h.value[B.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + o(c.value.name), 1),
          c.value.source ? (n(), l("p", Tl, [
            e("a", {
              href: c.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, o(c.value.source.name), 9, zl),
            N(" · " + o(c.value.source.id) + " · " + o(c.value.source.license), 1),
            S[18] || (S[18] = e("br", null, null, -1)),
            N(o(c.value.source.description), 1)
          ])) : (n(), l("p", Rl, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          S[22] || (S[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          j.value ? (n(), l("p", Ol, [
            S[19] || (S[19] = N("图片：", -1)),
            e("a", {
              href: j.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, o(j.value.title), 9, Fl),
            N(" / " + o(j.value.author) + " · ", 1),
            e("a", {
              href: j.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, o(j.value.license), 9, Bl),
            N(" · " + o(j.value.modifications), 1)
          ])) : $("", !0)
        ])
      ]),
      _: 1
    })) : $("", !0);
  }
}, Ll = { class: "vb-report-heading" }, ql = { class: "vb-small-label" }, Gl = { class: "vb-pill" }, Jl = { key: 0 }, Hl = ["disabled"], Kl = {
  key: 1,
  class: "vb-inline-warning"
}, Wl = {
  key: 2,
  class: "vb-inline-warning"
}, Yl = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, Xl = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, Ql = ["disabled"], Zl = {
  key: 5,
  class: "vb-feature-error"
}, eo = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, to = { class: "vb-report-estimation-heading" }, no = { class: "vb-pill" }, so = { class: "vb-data-note" }, lo = {
  key: 0,
  class: "vb-report-estimation-list"
}, oo = { class: "vb-report-estimation-values" }, ao = {
  key: 1,
  class: "vb-intake-more"
}, io = { class: "vb-report-comparison" }, ro = { key: 0 }, uo = { key: 1 }, co = { key: 2 }, vo = { key: 3 }, mo = { key: 4 }, bo = { key: 5 }, po = { key: 6 }, go = { key: 7 }, fo = {
  key: 7,
  class: "vb-report-content"
}, yo = { class: "vb-report-summary" }, ho = { class: "vb-inline-warning" }, ko = {
  key: 8,
  class: "vb-intake-more"
}, wo = { class: "vb-report-meta" }, $o = { key: 0 }, _o = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const a = t, s = J(() => a.report?.calculation?.targets || mn(a.report?.snapshot?.profile)), d = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], i = (c) => c ? new Date(c).toLocaleString("zh-CN", { hour12: !1 }) : "", r = J(() => (a.report?.snapshot?.entries || []).flatMap((c) => {
      const p = c.referenceConfirmed === !1 ? null : ne[c.foodId], y = Ne.filter((k) => {
        const h = Pt(c, p, k.id);
        return typeof h.value != "number" && !h.range;
      }).map((k) => k.id);
      return y.length ? [{ name: c.name, grams: c.grams, missing: y }] : [];
    })), u = J(() => a.report?.calculation?.estimation?.missingFoodCount ?? r.value.length), v = J(() => a.report?.calculation?.estimation?.foods || []), m = (c) => (c > 0 ? "+" : c < 0 ? "−" : "") + xe(Math.abs(c));
    return (c, p) => (n(), ce(Ze, {
      title: "AI 营养分析",
      wide: "",
      onClose: p[4] || (p[4] = (y) => c.$emit("close"))
    }, {
      default: Qe(() => [
        e("div", Ll, [
          e("div", null, [
            e("span", ql, o(t.report?.date || t.record?.date), 1),
            p[5] || (p[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", Gl, o(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        p[17] || (p[17] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (n(), l("section", Jl, [
          p[6] || (p[6] = e("p", null, "分析时向DeepSeek发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[0] || (p[0] = (y) => c.$emit("retry"))
          }, "开始AI分析", 8, Hl)
        ])) : $("", !0),
        t.stale ? (n(), l("p", Kl, [
          p[7] || (p[7] = N("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (n(), l("button", {
            key: 0,
            class: "vb-text-button",
            onClick: p[1] || (p[1] = (y) => c.$emit("retry"))
          }, "重新分析")) : $("", !0)
        ])) : $("", !0),
        t.record ? $("", !0) : (n(), l("p", Wl, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (n(), l("div", Yl, [
          p[9] || (p[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            p[8] || (p[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, o(u.value ? "同时自动估算 " + u.value + " 项食物的缺失指标。" : "程序已计算营养汇总，DeepSeek 正在生成解释与建议。"), 1)
          ])
        ])) : $("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (n(), l("div", Xl, [
          p[10] || (p[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, o(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[2] || (p[2] = (y) => c.$emit("retry"))
          }, "重新分析", 8, Ql)
        ])) : $("", !0),
        t.report?.persistenceFailed ? (n(), l("p", Zl, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : $("", !0),
        t.report?.snapshot ? (n(), l(F, { key: 6 }, [
          p[13] || (p[13] = e("h3", { class: "vb-report-section-title" }, "程序计算的营养汇总", -1)),
          E(Mt, {
            summary: t.report.snapshot.intake,
            targets: s.value,
            details: ""
          }, null, 8, ["summary", "targets"]),
          u.value ? (n(), l("section", eo, [
            e("div", to, [
              e("div", null, [
                e("h3", null, o(u.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${u.value} 项）`), 1),
                p[11] || (p[11] = e("p", null, "缺失指标已自动交由 AI 估算范围，并用于下方参考差值；不需要额外点击。", -1))
              ]),
              e("span", no, o(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            e("p", so, o(t.report?.calculation?.estimation?.disclaimer || "估算结果基于食物名称和可食部克数，只用于本报告参考，不会写入食物库或原始饮食记录。"), 1),
            v.value.length ? (n(), l("ul", lo, [
              (n(!0), l(F, null, q(v.value, (y) => (n(), l("li", {
                key: y.entryId
              }, [
                e("div", null, [
                  e("strong", null, o(y.name) + " · " + o(b(xe)(y.grams)) + " 克", 1),
                  e("small", null, o(y.assumption), 1)
                ]),
                e("div", oo, [
                  (n(!0), l(F, null, q(b(Ne).filter((k) => y.values[k.id]), (k) => (n(), l("span", {
                    key: k.id
                  }, o(k.id === "carbs" ? "碳水" : k.name) + " " + o(b(xe)(y.values[k.id].low)) + "–" + o(b(xe)(y.values[k.id].high)) + " " + o(k.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : $("", !0)
          ])) : $("", !0),
          t.report.calculation?.comparison ? (n(), l("details", ao, [
            p[12] || (p[12] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", io, [
              (n(!0), l(F, null, q(t.report.calculation.comparison, (y) => (n(), l("div", {
                key: y.id
              }, [
                e("span", null, o(y.id === "carbs" ? "碳水" : y.name), 1),
                y.estimatedRange?.delta ? (n(), l("strong", ro, " AI 估算差值：" + o(m(y.estimatedRange.delta.low)) + " 至 " + o(m(y.estimatedRange.delta.high)) + " " + o(y.unit), 1)) : y.delta !== null ? (n(), l("strong", uo, o(y.delta > 0 ? "+" : "") + o(b(xe)(y.delta)) + " " + o(y.unit), 1)) : (n(), l("strong", co, o(y.estimatedRange || y.complete && y.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                y.estimatedRange?.delta ? (n(), l("small", vo, "根据数据库已知小计与 AI 估算范围计算；记录未必覆盖全天，不代表达标或不足。")) : y.estimatedRange && !y.estimatedRange.delta ? (n(), l("small", mo, "含估算范围，暂无适用个人目标。")) : y.delta !== null ? (n(), l("small", bo, "记录合计减去全天目标，记录未必覆盖全天。")) : y.complete && y.target === null ? (n(), l("small", po, "请完善个人营养档案后再查看与目标的差值。")) : (n(), l("small", go, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : $("", !0)
        ], 64)) : $("", !0),
        t.report?.result ? (n(), l("div", fo, [
          p[14] || (p[14] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", yo, o(t.report.result.summary), 1),
          (n(), l(F, null, q(d, ([y, k]) => e("section", { key: y }, [
            t.report.result[y]?.length ? (n(), l(F, { key: 0 }, [
              e("h3", null, o(k), 1),
              e("ul", null, [
                (n(!0), l(F, null, q(t.report.result[y], (h, R) => (n(), l("li", { key: R }, o(h), 1))), 128))
              ])
            ], 64)) : $("", !0)
          ])), 64)),
          e("p", ho, "分析范围：" + o(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : $("", !0),
        t.report ? (n(), l("details", ko, [
          p[16] || (p[16] = e("summary", null, "查看分析信息", -1)),
          e("div", wo, [
            e("span", null, "生成时间：" + o(i(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (n(), l("span", $o, "模型：" + o(t.report.model), 1)) : $("", !0),
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
function Ao(t, a, s) {
  return t.push({ id: a, role: "assistant", content: "", status: "sending", createdAt: s }), t[t.length - 1];
}
const Co = 24e3, Zt = 220;
function Io(t, a) {
  const s = Date.parse(t || a || "");
  return Number.isFinite(s) ? s : 0;
}
function en(t) {
  const a = String(t || "").trim();
  return a.length > Zt ? `${a.slice(0, Zt)}…` : a;
}
function So(t, a, s = !0) {
  if (!s || !Array.isArray(t)) return "";
  const d = [];
  for (const u of t) {
    if (!u || u.id === a || !Array.isArray(u.messages)) continue;
    const v = u.messages;
    for (let m = 0; m < v.length - 1; m++) {
      const c = v[m], p = v[m + 1];
      if (c?.role !== "user" || p?.role !== "assistant" || c.status !== "complete" || p.status !== "complete" || c.attachments?.length || p.attachments?.length) continue;
      const y = en(c.content), k = en(p.content);
      !y || !k || (d.push({
        date: typeof u.date == "string" ? u.date : "",
        time: Io(c.createdAt, u.createdAt),
        user: y,
        assistant: k
      }), m++);
    }
  }
  const i = d.sort((u, v) => u.time - v.time).slice(-50);
  let r = i.map((u) => `${u.date ? `日期 ${u.date}：` : ""}用户：${u.user}
助手：${u.assistant}`).join(`

`);
  for (; r.length > Co && i.length; )
    i.shift(), r = i.map((u) => `${u.date ? `日期 ${u.date}：` : ""}用户：${u.user}
助手：${u.assistant}`).join(`

`);
  return r;
}
function Eo(t) {
  if (!t || typeof t != "object" || Array.isArray(t) || Xe(t)) return null;
  const a = (r) => r == null || r === "" ? void 0 : Number(r), s = a(t.age), d = a(t.height), i = a(t.weight);
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
const xo = 3, Uo = 24e3, tn = 6e4, jo = 8e5, Do = 6, No = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function In(t) {
  const a = String(t.name || "").split(".").pop().toLowerCase(), s = ["jpg", "jpeg", "png", "webp"].includes(a) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(a) ? "document" : null;
  if (!s) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (s === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(s === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return s;
}
function Po(t) {
  const a = String(t).replace(/\u0000/g, "").trim();
  if (!a) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (a.length > Uo) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return a;
}
let Je;
function Mo() {
  return Je || (Je = new Promise((t, a) => {
    if (!globalThis.indexedDB) {
      a(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const s = indexedDB.open(Ye("weiheng.chat-attachments.v1"), 1);
    s.onupgradeneeded = () => s.result.createObjectStore("attachments", { keyPath: "id" }), s.onsuccess = () => {
      const d = s.result;
      d.onversionchange = () => {
        d.close(), Je = void 0;
      }, t(d);
    }, s.onerror = s.onblocked = () => a(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw Je = void 0, t;
  })), Je;
}
async function Lt(t, a) {
  const s = await Mo();
  if (t === "readwrite" && Be()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((d, i) => {
    const r = s.transaction("attachments", t), u = a(r.objectStore("attachments"));
    r.oncomplete = () => d(u.result), r.onerror = r.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const To = (t) => Lt("readwrite", (a) => a.put(t)), xt = (t) => Lt("readonly", (a) => a.get(t)), at = (t) => Lt("readwrite", (a) => a.delete(t));
function zo(t) {
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
    for (const r of [0.85, 0.68, 0.5]) {
      const u = await new Promise((m, c) => s.toBlob((p) => p ? m(p) : c(new Error("照片压缩失败。")), "image/jpeg", r)), v = await zo(u);
      if (v.length <= jo) return v;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    a.close();
  }
}
async function Oo(t) {
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
    for (let r = 1; r <= d.numPages; r++) {
      const u = await d.getPage(r), v = await u.getTextContent();
      if (i.push(v.items.map((m) => "str" in m ? m.str + (m.hasEOL ? `
` : " ") : "").join("")), i.join(`
`).length > 24e3) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
      u.cleanup();
    }
    return i.join(`

`);
  } catch (d) {
    throw d instanceof Error && d.name === "PasswordException" ? new Error("PDF 已加密，请解锁后再上传。") : d;
  } finally {
    await s.destroy();
  }
}
async function Fo(t) {
  const { unzipSync: a, strFromU8: s } = await import("./browser-DbjUwor9.js"), d = a(new Uint8Array(await t.arrayBuffer()), {
    filter: (r) => r.name === "word/document.xml" && r.originalSize <= 4 * 1024 * 1024
  });
  if (!d["word/document.xml"]) throw new Error("Word 文件无效或内容过大，请另存为 DOCX 或 TXT 后重试。");
  const i = new DOMParser().parseFromString(s(d["word/document.xml"]), "application/xml");
  if (i.querySelector("parsererror")) throw new Error("Word 文件内容无法读取。");
  return Array.from(i.getElementsByTagNameNS("*", "p")).map((r) => Array.from(r.getElementsByTagNameNS("*", "*")).map((u) => u.localName === "t" ? u.textContent || "" : u.localName === "tab" ? "	" : u.localName === "br" ? `
` : "").join("")).join(`
`);
}
async function Bo(t, a) {
  const s = In(t), d = { id: a, kind: s, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (s === "image") return { ...d, mimeType: "image/jpeg", dataUrl: await Ro(t) };
  const i = t.name.split(".").pop()?.toLowerCase();
  let r;
  try {
    if (i === "pdf") r = await Oo(t);
    else if (i === "docx") r = await Fo(t);
    else {
      const u = new Uint8Array(await t.arrayBuffer());
      r = new TextDecoder().decode(u), r.includes("�") && (r = new TextDecoder("gb18030").decode(u));
    }
  } catch (u) {
    throw new Error(u instanceof Error && /[\u4e00-\u9fff]/.test(u.message) ? u.message : "文件无法读取，请确认文件完整，或另存为 TXT 后重试。");
  }
  return { ...d, text: Po(r) };
}
const Vo = {
  class: "vb-chat-page vb-simple-chat",
  "aria-label": "维衡AI助手对话"
}, Lo = { class: "vb-simple-header" }, qo = { class: "vb-simple-actions" }, Go = { class: "vb-simple-date" }, Jo = ["max", "disabled"], Ho = { class: "vb-simple-options" }, Ko = { "aria-label": "对话选项" }, Wo = { class: "vb-simple-options-panel" }, Yo = {
  key: 0,
  class: "vb-simple-history"
}, Xo = ["value"], Qo = { class: "vb-memory-toggle" }, Zo = ["disabled"], ea = {
  key: 0,
  class: "vb-simple-welcome"
}, ta = { class: "vb-simple-starters" }, na = ["onClick"], sa = { class: "vb-simple-context" }, la = {
  key: 1,
  class: "vb-simple-thread"
}, oa = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, aa = { class: "vb-simple-message-body" }, ia = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, ra = ["aria-label", "onClick"], ua = ["src", "alt"], da = {
  key: 1,
  class: "vb-simple-loading"
}, ca = {
  key: 2,
  class: "vb-simple-text"
}, va = {
  key: 0,
  class: "vb-simple-text"
}, ma = {
  class: "vb-simple-error",
  role: "alert"
}, ba = ["onClick"], pa = {
  key: 4,
  class: "vb-simple-text"
}, ga = {
  key: 5,
  class: "vb-simple-message-meta"
}, fa = { class: "vb-simple-composer" }, ya = { class: "vb-simple-composer-inner" }, ha = {
  key: 0,
  class: "vb-simple-tools"
}, ka = { class: "vb-simple-quick" }, wa = { class: "vb-simple-quick-panel" }, $a = ["onClick"], _a = {
  key: 0,
  class: "vb-simple-status",
  role: "status"
}, Aa = ["accept"], Ca = {
  key: 0,
  class: "vb-chat-draft-attachments",
  "aria-label": "待发送附件"
}, Ia = ["disabled", "aria-label", "onClick"], Sa = ["src", "alt"], Ea = {
  key: 0,
  role: "status"
}, xa = {
  key: 1,
  role: "alert"
}, Ua = { key: 2 }, ja = ["aria-label", "onClick"], Da = { class: "vb-simple-editor-bottom" }, Na = { class: "vb-chat-input-tools" }, Pa = ["disabled"], Ma = {
  key: 1,
  class: "vb-simple-notice",
  role: "alert"
}, Ta = ["role"], za = { class: "vb-simple-footnote" }, Ra = { class: "vb-simple-privacy" }, Oa = ["src", "alt"], Fa = {
  key: 1,
  class: "vb-chat-text-preview"
}, Ba = { class: "vb-data-note" }, nn = "weiheng.ai-diet-chat.v1", Va = /* @__PURE__ */ qe({
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
        const C = JSON.parse(ke.getItem(nn) || "null");
        if (!C || typeof C != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0 };
        const _ = C, D = Array.isArray(_.threads) ? _.threads.flatMap((Z) => {
          if (!Z || typeof Z != "object") return [];
          const Y = Z;
          return typeof Y.id != "string" || !Oe(Y.date) || !Array.isArray(Y.messages) ? [] : [{
            id: Y.id,
            date: Y.date,
            createdAt: typeof Y.createdAt == "string" ? Y.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: Y.messages.filter((de) => !!(de && typeof de == "object" && ["user", "assistant"].includes(de.role) && typeof de.content == "string")).map((de) => de.status === "sending" ? { ...de, status: "failed", error: "页面刷新时请求中断。点击重试可继续这条问题。" } : de)
          }];
        }) : [], W = _.activeByDate && typeof _.activeByDate == "object" ? Object.fromEntries(Object.entries(_.activeByDate).filter(([Z, Y]) => Oe(Z) && typeof Y == "string")) : {};
        return { threads: D.slice(-60), activeByDate: W, memoryEnabled: _.memoryEnabled !== !1 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0 };
      }
    }
    const r = i(), u = P(r.threads), v = P(r.activeByDate), m = P(r.memoryEnabled), c = P(he()), p = P(""), y = P(null), k = P([]), h = P({}), R = P(null), T = J(() => k.value.some((C) => C.status === "ready"));
    let w = 0;
    const A = P(""), j = P(""), O = P(null), M = J(() => u.value.some((C) => C.messages.some((_) => _.status === "sending"))), S = J(() => a.records.find((C) => C.date === c.value)), B = J(() => S.value?.entries || []), se = J(() => ({
      energy: typeof a.targets?.tdee == "number" ? a.targets.tdee : null,
      protein: a.targets?.macros?.find((C) => C.id === "protein")?.grams ?? null,
      carbs: a.targets?.macros?.find((C) => C.id === "carbs")?.grams ?? null,
      fat: a.targets?.macros?.find((C) => C.id === "fat")?.grams ?? null
    })), fe = J(() => u.value.find((C) => C.id === v.value[c.value])), G = J(() => fe.value?.messages || []), ge = J(() => u.value.filter((C) => C.date === c.value).sort((C, _) => _.createdAt.localeCompare(C.createdAt)));
    function ie(C) {
      const { id: _, kind: D, name: W, size: Z, mimeType: Y } = C;
      return { id: _, kind: D, name: W, size: Z, mimeType: Y };
    }
    function K(C) {
      return C >= 1024 * 1024 ? `${(C / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(C / 1024))} KB`;
    }
    async function V(C) {
      const _ = w;
      j.value = "";
      for (const D of C) {
        if (_ !== w) break;
        if (k.value.length >= xo) {
          j.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let W;
        try {
          W = In(D);
        } catch (Y) {
          j.value = Y instanceof Error ? Y.message : "这个文件暂不支持。";
          continue;
        }
        const Z = d();
        k.value.push({ id: Z, kind: W, name: D.name.slice(0, 180), size: D.size, mimeType: D.type, status: "reading" });
        try {
          const Y = await Bo(D, Z);
          if (!k.value.some((me) => me.id === Z)) continue;
          if (k.value.reduce((me, Se) => me + (Se.value?.text?.length || 0), Y.text?.length || 0) > tn) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await To(Y);
          const be = k.value.find((me) => me.id === Z);
          if (!be) {
            await at(Z);
            continue;
          }
          h.value[Z] = Y, be.value = Y, be.status = "ready";
        } catch (Y) {
          const de = k.value.find((be) => be.id === Z);
          de && (de.status = "failed", de.error = Y instanceof Error ? Y.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function x(C) {
      const _ = C.target, D = Array.from(_.files || []);
      _.value = "", V(D);
    }
    function ee(C) {
      const _ = Array.from(C.clipboardData?.files || []).filter((D) => D.type.startsWith("image/"));
      _.length && (C.preventDefault(), V(_));
    }
    function te(C) {
      C.dataTransfer?.types.includes("Files") && C.preventDefault();
    }
    function ye(C) {
      const _ = Array.from(C.dataTransfer?.files || []);
      _.length && (C.preventDefault(), V(_));
    }
    function H(C) {
      k.value = k.value.filter((_) => _.id !== C), delete h.value[C], at(C).catch(() => {
        j.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function I() {
      const C = k.value.flatMap((D) => D.status === "ready" && D.value ? [D.value] : []), _ = new Set(C.map((D) => D.id));
      return k.value = k.value.filter((D) => !_.has(D.id)), C;
    }
    async function g(C) {
      try {
        const _ = h.value[C.id] || await xt(C.id);
        if (!_) throw new Error("附件已不在本地存储中，请重新添加。");
        R.value = _;
      } catch (_) {
        j.value = _ instanceof Error ? _.message : "无法预览附件。";
      }
    }
    pe(() => G.value.flatMap((C) => C.attachments || []).map((C) => C.id).join(","), async () => {
      for (const C of G.value.flatMap((_) => _.attachments || []))
        if (!h.value[C.id])
          try {
            const _ = await xt(C.id);
            _ && (h.value[C.id] = _);
          } catch {
          }
    }, { immediate: !0 });
    function f(C) {
      const _ = { id: d(), date: C, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (u.value.push(_), u.value.length > 60) {
        const D = u.value.splice(0, u.value.length - 60);
        U(D.flatMap((W) => W.messages));
      }
      return v.value[C] = _.id, _;
    }
    function U(C) {
      for (const _ of C.flatMap((D) => D.attachments || []))
        delete h.value[_.id], at(_.id).catch(() => {
          A.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function ae(C) {
      const _ = v.value[C];
      if (_ && u.value.some((W) => W.id === _)) return;
      const D = u.value.filter((W) => W.date === C).sort((W, Z) => Z.createdAt.localeCompare(W.createdAt))[0];
      D ? v.value[C] = D.id : f(C);
    }
    ae(c.value), pe(c, (C) => {
      if (!Oe(C) || C > he()) {
        c.value = he();
        return;
      }
      ae(C), j.value = "";
    });
    let oe = !1;
    function et() {
      if (G.value.some((_) => _.status === "sending")) return;
      oe = !0;
      const C = i();
      u.value = C.threads, v.value = { ...C.activeByDate, ...v.value }, m.value = C.memoryEnabled, Ue(() => {
        oe = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", et), We(() => window.removeEventListener("weiheng-chat-synced", et));
    let Ce;
    function Ie() {
      if (Ce && clearTimeout(Ce), Ce = void 0, !Be())
        try {
          ke.setItem(nn, JSON.stringify({ threads: u.value, activeByDate: v.value, memoryEnabled: m.value })), A.value = "";
        } catch {
          A.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function tt() {
      oe || (Ce && clearTimeout(Ce), Ce = setTimeout(Ie, 160));
    }
    pe([u, v, m], tt, { deep: !0 });
    function Ge() {
      Ie();
    }
    typeof window < "u" && window.addEventListener("pagehide", Ge), We(() => {
      Ie(), typeof window < "u" && window.removeEventListener("pagehide", Ge);
    }), pe(G, async () => {
      await Ue(), O.value && (O.value.scrollTop = O.value.scrollHeight);
    }, { deep: !0 });
    let $e;
    function kt() {
      const C = $e;
      C && ($e = void 0, C.controller.abort(), C.assistantMessage.status === "sending" && (C.assistantMessage.status = "failed", C.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), Ie());
    }
    function wt(C) {
      const _ = new Date(C);
      return Number.isNaN(_.getTime()) ? "新对话" : _.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function Q(C) {
      const _ = new Date(C);
      return Number.isNaN(_.getTime()) ? "" : _.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function L() {
      return B.value.map((C) => ({
        foodId: C.foodId,
        name: C.name,
        grams: C.grams,
        meal: C.meal,
        referenceConfirmed: C.referenceConfirmed
      }));
    }
    async function le(C, _) {
      const D = C.slice(0, _).filter((be) => be.status === "complete"), W = [];
      for (const { role: be, content: me, attachments: Se } of D) {
        const Ee = { role: be, content: me.slice(0, 1200), attachments: Se };
        be === "user" ? W.at(-1)?.role === "user" ? W[W.length - 1] = Ee : W.push(Ee) : W.at(-1)?.role === "user" && W.push(Ee);
      }
      for (; W[0]?.role !== "user"; ) W.shift();
      const Z = W.slice(-11);
      for (; Z.reduce((be, me) => be + me.content.length, 0) > 9e3; ) Z.splice(0, 2);
      let Y = 0, de = 0;
      for (let be = Z.length - 1; be >= 0; be--) {
        const me = Z[be], Se = [];
        let Ee = !1;
        for (const st of me.attachments || []) {
          const je = h.value[st.id] || await xt(st.id);
          if (!je) {
            if (be === Z.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Ee = !0;
            continue;
          }
          if (Y + (je.text?.length || 0) > tn || je.kind === "image" && de >= Do) {
            Ee = !0;
            continue;
          }
          Y += je.text?.length || 0, je.kind === "image" && de++, Se.push(je);
        }
        me.attachments = Se.length ? Se : void 0, Ee && (me.content = me.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return Z;
    }
    async function Ae(C, _, D = []) {
      const W = C.trim() || (D.length ? "请帮我分析这些附件。" : "");
      if (!W || W.length > 1200) return !1;
      kt(), ae(c.value);
      const Z = fe.value;
      if (!Z) return !1;
      let Y, de;
      if (_) {
        de = Z.messages.findIndex((Te) => Te.id === _ && Te.role === "assistant");
        const Me = Z.messages[de - 1];
        if (de < 1 || Me?.role !== "user")
          return j.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        Y = Z.messages[de], Y.status = "sending", Y.error = void 0, Y.content = "";
      } else
        Z.messages.push({ id: d(), role: "user", content: W, attachments: D.length ? D.map(ie) : void 0, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), Y = Ao(Z.messages, d(), (/* @__PURE__ */ new Date()).toISOString()), Z.messages.length > 120 && U(Z.messages.splice(0, Z.messages.length - 120)), de = Z.messages.length - 1;
      Ie(), j.value = "";
      const be = new AbortController(), me = { controller: be, assistantMessage: Y };
      $e = me;
      const Se = c.value, Ee = L(), st = se.value, je = Eo(a.profile), Nn = So(u.value, Z.id, m.value);
      try {
        const Me = await le(Z.messages, de);
        if ($e !== me) return !1;
        if (Me.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const Te = await kn("chat", {
          date: Se,
          messages: Me,
          entries: Ee,
          targets: st,
          profile: je,
          memory: Nn
        }, (Ve) => {
          $e === me && (Ve.type === "delta" ? Y.content += Ve.text : Ve.type === "done" && (Y.model = Ve.model, Y.context = Ve.contextSummary, Y.createdAt = Ve.generatedAt || (/* @__PURE__ */ new Date()).toISOString()));
        }, be.signal);
        if ($e !== me) return !1;
        if (!Y.content.trim() || typeof Te.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return Y.model = Te.model, Y.context = Te.contextSummary, Y.createdAt = Te.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Y.status = "complete", Ie(), !0;
      } catch (Me) {
        return $e !== me || (Y.status = "failed", Y.error = Me instanceof Error ? Me.message : "AI 暂时无法回复，请重试。", Ie()), !1;
      } finally {
        $e === me && ($e = void 0);
      }
    }
    function nt() {
      const C = p.value.trim();
      if (!C && !T.value || C.length > 1200) return;
      const _ = I();
      p.value = "", Ae(C, void 0, _);
    }
    function qt(C) {
      p.value = C, Ue(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function xn(C) {
      C.key === "Enter" && !C.shiftKey && !C.isComposing && (C.preventDefault(), nt());
    }
    function Un(C) {
      const _ = G.value.findIndex((W) => W.id === C), D = G.value[_ - 1];
      _ > 0 && D?.role === "user" && Ae(D.content, C);
    }
    function jn() {
      w++, f(c.value);
      for (const C of k.value) H(C.id);
      j.value = "";
    }
    function Dn() {
      if (!window.confirm("清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。")) return;
      const C = u.value.flatMap((_) => _.messages.flatMap((D) => D.attachments || []));
      for (const _ of C)
        delete h.value[_.id], at(_.id).catch(() => {
          A.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      Yn(), u.value = [], v.value = {}, A.value = "", ae(c.value), j.value = "当前空间的聊天记录已清除。";
    }
    return (C, _) => (n(), l("section", Vo, [
      e("header", Lo, [
        _[13] || (_[13] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡AI助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", qo, [
          e("label", Go, [
            E(z, {
              name: "calendar",
              size: 16
            }),
            _[7] || (_[7] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            X(e("input", {
              "onUpdate:modelValue": _[0] || (_[0] = (D) => c.value = D),
              type: "date",
              max: b(he)(),
              disabled: M.value,
              "aria-label": "选择饮食日期"
            }, null, 8, Jo), [
              [re, c.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: jn
          }, [
            E(z, {
              name: "plus",
              size: 16
            }),
            _[8] || (_[8] = N("新对话", -1))
          ]),
          e("details", Ho, [
            e("summary", Ko, [
              _[9] || (_[9] = N("更多", -1)),
              E(z, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", Wo, [
              ge.value.length > 1 ? (n(), l("label", Yo, [
                _[10] || (_[10] = N(" 切换本日对话 ", -1)),
                X(e("select", {
                  "onUpdate:modelValue": _[1] || (_[1] = (D) => v.value[c.value] = D),
                  "aria-label": "切换本日对话"
                }, [
                  (n(!0), l(F, null, q(ge.value, (D) => (n(), l("option", {
                    key: D.id,
                    value: D.id
                  }, o(wt(D.createdAt)) + " · " + o(D.messages.length ? `${D.messages.length} 条消息` : "空对话"), 9, Xo))), 128))
                ], 512), [
                  [we, v.value[c.value]]
                ])
              ])) : $("", !0),
              e("label", Qo, [
                X(e("input", {
                  "onUpdate:modelValue": _[2] || (_[2] = (D) => m.value = D),
                  type: "checkbox"
                }, null, 512), [
                  [it, m.value]
                ]),
                _[11] || (_[11] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              _[12] || (_[12] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: M.value,
                onClick: Dn
              }, "清除本地记录", 8, Zo)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: O,
        class: ve(["vb-simple-scroll", { "is-empty": !G.value.length }]),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        G.value.length ? (n(), l("div", la, [
          (n(!0), l(F, null, q(G.value, (D) => (n(), l("article", {
            key: D.id,
            class: ve(["vb-simple-message", [`is-${D.role}`, `is-${D.status}`]])
          }, [
            D.role === "assistant" ? (n(), l("span", oa, [
              E(z, {
                name: "sparkles",
                size: 18
              })
            ])) : $("", !0),
            e("div", aa, [
              D.attachments?.length ? (n(), l("div", ia, [
                (n(!0), l(F, null, q(D.attachments, (W) => (n(), l("button", {
                  key: W.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + W.name,
                  onClick: (Z) => g(W)
                }, [
                  W.kind === "image" && h.value[W.id]?.dataUrl ? (n(), l("img", {
                    key: 0,
                    src: h.value[W.id].dataUrl,
                    alt: W.name
                  }, null, 8, ua)) : (n(), ce(z, {
                    key: 1,
                    name: W.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, o(W.name), 1),
                    e("small", null, o(W.kind === "image" ? "照片" : "文件文字") + " · " + o(K(W.size)), 1)
                  ])
                ], 8, ra))), 128))
              ])) : $("", !0),
              D.status === "sending" && !D.content ? (n(), l("div", da, [..._[16] || (_[16] = [
                e("span", { class: "vb-loading-ring" }, null, -1),
                e("span", null, "正在回复…", -1)
              ])])) : D.status === "sending" ? (n(), l("p", ca, [
                N(o(D.content), 1),
                _[17] || (_[17] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : D.status === "failed" ? (n(), l(F, { key: 3 }, [
                D.content ? (n(), l("p", va, o(D.content), 1)) : $("", !0),
                e("p", ma, o(D.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (W) => Un(D.id)
                }, [
                  E(z, {
                    name: "activity",
                    size: 14
                  }),
                  _[18] || (_[18] = N("重试这条问题", -1))
                ], 8, ba)
              ], 64)) : (n(), l("p", pa, o(D.content), 1)),
              D.status === "complete" ? (n(), l("small", ga, [
                N(o(Q(D.createdAt)), 1),
                D.role === "assistant" ? (n(), l(F, { key: 0 }, [
                  N(" · " + o(D.model || "DeepSeek"), 1)
                ], 64)) : $("", !0)
              ])) : $("", !0)
            ])
          ], 2))), 128))
        ])) : (n(), l("div", ea, [
          _[14] || (_[14] = e("h2", null, "今天想聊些什么？", -1)),
          _[15] || (_[15] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", ta, [
            (n(), l(F, null, q(s, (D) => e("button", {
              key: D,
              type: "button",
              onClick: (W) => qt(D)
            }, [
              e("span", null, o(D), 1),
              E(z, {
                name: "arrow",
                size: 16
              })
            ], 8, na)), 64))
          ]),
          e("small", sa, "饮食参考日期：" + o(c.value), 1)
        ]))
      ], 2),
      e("footer", fa, [
        e("div", ya, [
          G.value.length ? (n(), l("div", ha, [
            e("details", ka, [
              e("summary", null, [
                _[19] || (_[19] = N("快捷提问", -1)),
                E(z, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", wa, [
                (n(), l(F, null, q(s, (D) => e("button", {
                  key: D,
                  type: "button",
                  onClick: (W) => qt(D)
                }, [
                  N(o(D), 1),
                  E(z, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, $a)), 64))
              ])
            ]),
            M.value ? (n(), l("span", _a, "正在回复，发送新消息可打断")) : $("", !0)
          ])) : $("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: te,
            onDrop: ye
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: y,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: b(No),
              "aria-label": "选择照片或文件",
              onChange: x
            }, null, 40, Aa),
            k.value.length ? (n(), l("div", Ca, [
              (n(!0), l(F, null, q(k.value, (D) => (n(), l("div", {
                key: D.id,
                class: ve(["vb-chat-file", { "is-failed": D.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: D.status !== "ready",
                  "aria-label": "预览附件：" + D.name,
                  onClick: (W) => g(D)
                }, [
                  D.value?.dataUrl ? (n(), l("img", {
                    key: 0,
                    src: D.value.dataUrl,
                    alt: D.name
                  }, null, 8, Sa)) : (n(), ce(z, {
                    key: 1,
                    name: D.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, o(D.name), 1),
                    D.status === "reading" ? (n(), l("small", Ea, "正在读取…")) : D.status === "failed" ? (n(), l("small", xa, o(D.error), 1)) : (n(), l("small", Ua, o(K(D.size)) + " · 待发送", 1))
                  ])
                ], 8, Ia),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + D.name,
                  onClick: (W) => H(D.id)
                }, [
                  E(z, {
                    name: "close",
                    size: 13
                  })
                ], 8, ja)
              ], 2))), 128))
            ])) : $("", !0),
            _[22] || (_[22] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            X(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": _[3] || (_[3] = (D) => p.value = D),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: xn,
              onPaste: ee
            }, null, 544), [
              [re, p.value]
            ]),
            e("div", Da, [
              e("div", Na, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: _[4] || (_[4] = (D) => y.value?.click())
                }, [
                  E(z, {
                    name: "paperclip",
                    size: 18
                  }),
                  _[20] || (_[20] = e("span", null, "附件", -1))
                ]),
                _[21] || (_[21] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !p.value.trim() && !T.value,
                onClick: _[5] || (_[5] = (D) => nt())
              }, [
                E(z, {
                  name: "arrow",
                  size: 16
                }),
                N(o(M.value ? "打断并发送" : "发送"), 1)
              ], 8, Pa)
            ])
          ], 32),
          b(_e) && b(Wn) === "error" ? (n(), l("p", Ma, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : $("", !0),
          A.value || j.value ? (n(), l("p", {
            key: 2,
            class: "vb-simple-notice",
            role: A.value ? "alert" : "status"
          }, o(A.value || j.value), 9, Ta)) : $("", !0),
          e("div", za, [
            e("details", Ra, [
              e("summary", null, [
                E(z, {
                  name: "lock",
                  size: 12
                }),
                _[23] || (_[23] = N("隐私与使用说明", -1))
              ]),
              _[24] || (_[24] = e("div", { class: "vb-simple-privacy-panel" }, [
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
      R.value ? (n(), ce(Ze, {
        key: 0,
        title: R.value.name,
        wide: "",
        onClose: _[6] || (_[6] = (D) => R.value = null)
      }, {
        default: Qe(() => [
          R.value.kind === "image" ? (n(), l("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: R.value.dataUrl,
            alt: R.value.name
          }, null, 8, Oa)) : (n(), l("pre", Fa, o(R.value.text), 1)),
          e("p", Ba, o(R.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : $("", !0)
    ]));
  }
}), La = (t, a) => {
  const s = t.__vccOpts || t;
  for (const [d, i] of a)
    s[d] = i;
  return s;
}, qa = /* @__PURE__ */ La(Va, [["__scopeId", "data-v-9b7cb08e"]]), Ga = {
  key: 0,
  class: "vb-page-title"
}, Ja = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, Ha = ["aria-pressed", "onClick"], Ka = { class: "vb-glass vb-review-hero" }, Wa = { class: "vb-icon-badge vb-large-badge" }, Ya = { class: "vb-small-label" }, Xa = { class: "vb-coverage-score" }, Qa = { class: "vb-assessment-grid" }, Za = { class: "vb-glass vb-coverage-card" }, ei = { class: "vb-section-heading" }, ti = { class: "vb-coverage-list" }, ni = { class: "vb-food-category-icon" }, si = { class: "vb-coverage-name" }, li = { key: 0 }, oi = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, ai = { class: "vb-inline-note" }, ii = { class: "vb-glass vb-suggestion-card" }, ri = ["checked", "onChange"], ui = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, di = { class: "vb-empty-icon" }, ci = { class: "vb-glass vb-supplement-card" }, vi = { class: "vb-icon-badge" }, mi = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const a = t, s = P(a.records[0]?.date || "");
    pe(() => a.records, (y) => {
      y.some((k) => k.date === s.value) || (s.value = y[0]?.date || "");
    });
    const d = J(() => a.records.find((y) => y.date === s.value)), i = (y) => Number(d.value?.foods?.[y]) || 0, r = J(() => _t.filter((y) => i(y.key) <= 0)), u = J(() => _t.length - r.value.length), v = J(() => Math.max(1, ...mt.map((y) => i(y.key)))), m = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, c = J(() => (r.value.length ? r.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map((y) => ({ key: y.key, title: m[y.key]?.[0] || (y.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: m[y.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), p = (y) => (a.habits[s.value] || []).includes(y);
    return (y, k) => (n(), l(F, null, [
      t.embedded ? $("", !0) : (n(), l("div", Ga, [
        k[4] || (k[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: k[0] || (k[0] = (h) => y.$emit("navigate", "diary"))
        }, [
          E(z, {
            name: "plus",
            size: 17
          }),
          k[3] || (k[3] = N("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (n(), l("div", Ja, [
        (n(!0), l(F, null, q(t.records.slice(0, 7), (h) => (n(), l("button", {
          key: h.date,
          class: ve({ selected: s.value === h.date }),
          "aria-pressed": s.value === h.date,
          onClick: (R) => s.value = h.date
        }, o(h.date), 11, Ha))), 128))
      ])) : $("", !0),
      d.value ? (n(), l(F, { key: 2 }, [
        e("section", Ka, [
          e("span", Wa, [
            E(z, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", Ya, o(d.value.date) + " · 饮食回顾", 1),
            e("h2", null, o(r.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, o(r.value.length ? r.value.map((h) => h.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", Xa, [
            e("strong", null, [
              N(o(u.value), 1),
              e("small", null, " / " + o(b(_t).length), 1)
            ]),
            k[5] || (k[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", Qa, [
          e("section", Za, [
            e("div", ei, [
              k[6] || (k[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              E(z, { name: "chart" })
            ]),
            e("div", ti, [
              (n(!0), l(F, null, q(b(mt), (h) => (n(), l("div", {
                key: h.key,
                class: "vb-coverage-row"
              }, [
                e("span", ni, [
                  E(z, {
                    name: b(vn)[h.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", si, [
                  N(o(h.name), 1),
                  h.key === "snacks" ? (n(), l("small", li, "可选记录")) : $("", !0)
                ]),
                e("span", oi, [
                  e("i", {
                    style: on({ width: i(h.key) / v.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: ve(["vb-coverage-value", { "is-missing": !i(h.key) }])
                }, o(i(h.key) ? `${Math.round(i(h.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", ai, [
              E(z, {
                name: "info",
                size: 15
              }),
              k[7] || (k[7] = N("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", ii, [
            k[8] || (k[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (n(!0), l(F, null, q(c.value, (h) => (n(), l("label", {
              key: h.key,
              class: ve(["vb-check-row", { done: p(h.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: p(h.key),
                onChange: (R) => y.$emit("toggle-habit", s.value, h.key)
              }, null, 40, ri),
              e("span", null, [
                e("strong", null, o(h.title), 1),
                e("small", null, o(h.detail), 1)
              ])
            ], 2))), 128)),
            k[9] || (k[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (n(), l("section", ui, [
        e("span", di, [
          E(z, {
            name: "bowl",
            size: 36
          })
        ]),
        k[11] || (k[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        k[12] || (k[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: k[1] || (k[1] = (h) => y.$emit("navigate", "diary"))
        }, [
          k[10] || (k[10] = N("记录今天的饮食", -1)),
          E(z, {
            name: "arrow",
            size: 17
          })
        ])
      ])),
      e("section", ci, [
        e("span", vi, [
          E(z, {
            name: "shield",
            size: 23
          })
        ]),
        e("div", null, [
          k[13] || (k[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, o(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, o(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: k[2] || (k[2] = (h) => y.$emit("navigate", "about"))
        }, [
          k[14] || (k[14] = N("查看注意事项", -1)),
          E(z, {
            name: "arrow",
            size: 17
          })
        ])
      ])
    ], 64));
  }
}, bi = {
  key: 0,
  class: "vb-page-title"
}, pi = { class: "vb-date-input" }, gi = {
  key: 1,
  class: "vb-report-toolbar"
}, fi = { class: "vb-date-input" }, yi = {
  key: 2,
  class: "vb-report-filter"
}, hi = {
  key: 3,
  class: "vb-report-list"
}, ki = { class: "vb-report-card-top" }, wi = { class: "vb-icon-badge" }, $i = {
  key: 0,
  class: "vb-feature-error"
}, _i = {
  key: 1,
  class: "vb-inline-warning"
}, Ai = { class: "vb-report-card-actions" }, Ci = ["onClick"], Ii = ["disabled", "onClick"], Si = {
  key: 4,
  class: "vb-glass vb-report-empty"
}, Ei = { class: "vb-icon-badge" }, xi = /* @__PURE__ */ qe({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: a }) {
    const s = t, d = a, i = P(""), { isStale: r } = Ft(), u = J(() => s.reports.filter((c) => !i.value || c.date === i.value));
    function v(c) {
      return s.records.find((p) => p.date === c.date);
    }
    function m(c) {
      return r(c, v(c), s.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[c.status];
    }
    return (c, p) => (n(), l(F, null, [
      t.embedded ? (n(), l("div", gi, [
        p[5] || (p[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", fi, [
          E(z, {
            name: "calendar",
            size: 18
          }),
          X(e("input", {
            "onUpdate:modelValue": p[1] || (p[1] = (y) => i.value = y),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [re, i.value]
          ])
        ])
      ])) : (n(), l("div", bi, [
        p[4] || (p[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", pi, [
          E(z, {
            name: "calendar",
            size: 18
          }),
          X(e("input", {
            "onUpdate:modelValue": p[0] || (p[0] = (y) => i.value = y),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [re, i.value]
          ])
        ])
      ])),
      p[9] || (p[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给 DeepSeek；照片和备注不随每日分析发送。", -1)),
      i.value ? (n(), l("div", yi, [
        e("span", null, o(u.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: p[2] || (p[2] = (y) => i.value = "")
        }, "清除日期筛选")
      ])) : $("", !0),
      u.value.length ? (n(), l("div", hi, [
        (n(!0), l(F, null, q(u.value, (y) => (n(), l("article", {
          key: y.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", ki, [
            e("span", wi, [
              E(z, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, o(y.date), 1),
              e("small", null, o(new Date(y.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: ve(["vb-pill", { "needs-update": m(y) === "需更新" }])
            }, o(m(y)), 3)
          ]),
          e("p", null, o(y.result?.summary || y.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          v(y) ? b(r)(y, v(y), t.profile) ? (n(), l("small", _i, "记录或个人目标已变化，此报告使用的是旧版本。")) : $("", !0) : (n(), l("small", $i, "对应记录已删除，保留报告快照。")),
          e("div", Ai, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (k) => d("open", y.date, y.id)
            }, [
              p[6] || (p[6] = N("打开报告", -1)),
              E(z, {
                name: "arrow",
                size: 15
              })
            ], 8, Ci),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: y.status === "pending" || !v(y),
              onClick: (k) => d("retry", y.date)
            }, "重新分析", 8, Ii)
          ])
        ]))), 128))
      ])) : (n(), l("section", Si, [
        e("span", Ei, [
          E(z, {
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
          p[7] || (p[7] = N("去记录饮食", -1)),
          E(z, {
            name: "arrow",
            size: 17
          })
        ])
      ]))
    ], 64));
  }
}), Ui = { class: "vb-page-title" }, ji = {
  class: "vb-assessment-block",
  "aria-labelledby": "diet-assessment-heading"
}, Di = {
  class: "vb-assessment-block vb-assessment-reports",
  "aria-labelledby": "ai-report-heading"
}, Ni = /* @__PURE__ */ qe({
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
    function d(i, r) {
      s("openReport", i, r);
    }
    return (i, r) => (n(), l(F, null, [
      e("div", Ui, [
        r[6] || (r[6] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从饮食回顾到 AI 分析"),
          e("h1", null, "营养摄入分析与不足风险提示"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: r[0] || (r[0] = (u) => s("navigate", "diary"))
        }, [
          E(z, {
            name: "plus",
            size: 17
          }),
          r[5] || (r[5] = N("添加饮食记录 ", -1))
        ])
      ]),
      E(Fn, {
        records: t.records,
        profile: t.profile || void 0
      }, null, 8, ["records", "profile"]),
      e("section", ji, [
        r[7] || (r[7] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "饮食结构回顾"),
            e("h2", { id: "diet-assessment-heading" }, "食物类别评估")
          ]),
          e("span", { class: "vb-subtle-label" }, "按已保存记录统计")
        ], -1)),
        E(mi, {
          records: t.records,
          habits: t.habits,
          flags: t.flags,
          embedded: "",
          onNavigate: r[1] || (r[1] = (u) => s("navigate", u)),
          onToggleHabit: r[2] || (r[2] = (u, v) => s("toggleHabit", u, v))
        }, null, 8, ["records", "habits", "flags"])
      ]),
      e("section", Di, [
        r[8] || (r[8] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "每日 AI 分析"),
            e("h2", { id: "ai-report-heading" }, "AI 营养报告")
          ]),
          e("span", { class: "vb-subtle-label" }, "可按日期筛选、查看和重试")
        ], -1)),
        E(xi, {
          reports: t.reports,
          records: t.records,
          profile: t.profile,
          embedded: "",
          onOpen: d,
          onRetry: r[3] || (r[3] = (u) => s("retryReport", u)),
          onNavigate: r[4] || (r[4] = (u) => s("navigate", u))
        }, null, 8, ["reports", "records", "profile"])
      ])
    ], 64));
  }
}), Pi = { class: "vb-photo-picker" }, Mi = {
  key: 0,
  class: "vb-photo-preview"
}, Ti = ["src"], zi = { class: "vb-photo-actions" }, Ri = ["disabled"], Oi = ["disabled"], Fi = {
  key: 1,
  class: "vb-photo-hint",
  role: "status"
}, Bi = {
  key: 2,
  class: "vb-photo-error",
  role: "alert"
}, Vi = ["src"], Li = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: a }) {
    const s = a, d = P(!1), i = P(null), r = P(null), u = P(""), v = P(!1);
    function m(R) {
      return new Promise((T, w) => {
        const A = URL.createObjectURL(R), j = new Image();
        j.onload = () => T({ image: j, url: A }), j.onerror = () => {
          URL.revokeObjectURL(A), w(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, j.src = A;
      });
    }
    function c(R, T) {
      return new Promise((w, A) => R.toBlob((j) => j ? w(j) : A(new Error("图片处理失败，请重新选择。")), "image/jpeg", T));
    }
    function p(R) {
      return new Promise((T, w) => {
        const A = new FileReader();
        A.onload = () => T(A.result), A.onerror = () => w(new Error("图片读取失败，请重新选择。")), A.readAsDataURL(R);
      });
    }
    async function y(R) {
      let T;
      try {
        const w = await createImageBitmap(R);
        T = { image: w, width: w.width, height: w.height, cleanup: () => w.close() };
      } catch {
        const w = await m(R);
        T = { image: w.image, width: w.image.naturalWidth, height: w.image.naturalHeight, cleanup: () => URL.revokeObjectURL(w.url) };
      }
      try {
        const w = Math.min(1, 1200 / Math.max(T.width, T.height)), A = document.createElement("canvas");
        A.width = Math.max(1, Math.round(T.width * w)), A.height = Math.max(1, Math.round(T.height * w));
        const j = A.getContext("2d");
        if (!j) throw new Error("浏览器暂不支持图片预览。");
        j.drawImage(T.image, 0, 0, A.width, A.height);
        let O = await c(A, 0.76);
        if (O.size > 32e4 && (O = await c(A, 0.58)), O.size > 32e4) {
          const M = document.createElement("canvas");
          M.width = Math.round(A.width * 0.75), M.height = Math.round(A.height * 0.75), M.getContext("2d")?.drawImage(A, 0, 0, M.width, M.height), O = await c(M, 0.58);
        }
        return await p(O);
      } finally {
        T.cleanup();
      }
    }
    async function k(R, T) {
      const w = R.target, A = w.files?.[0];
      if (w.value = "", !!A) {
        if (u.value = "", !A.type.startsWith("image/") || A.type === "image/svg+xml") {
          u.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if (A.size > 12 * 1024 * 1024) {
          u.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        v.value = !0;
        try {
          const j = await y(A), O = { name: A.name.slice(0, 100), dataUrl: j, source: T, mime: "image/jpeg" };
          s("update:modelValue", O), s("selected", O);
        } catch (j) {
          u.value = j instanceof Error ? j.message : "无法处理这张图片，请重新选择。";
        } finally {
          v.value = !1;
        }
      }
    }
    function h() {
      u.value = "", s("update:modelValue", null);
    }
    return (R, T) => (n(), l("div", Pi, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: T[0] || (T[0] = (w) => k(w, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: r,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: T[1] || (T[1] = (w) => k(w, "本地图片"))
      }, null, 544),
      t.modelValue ? (n(), l("div", Mi, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: T[2] || (T[2] = (w) => d.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, Ti)
        ]),
        e("span", null, [
          e("strong", null, o(t.modelValue.name), 1),
          e("small", null, o(t.modelValue.source) + " · 点击图片查看大图", 1)
        ]),
        e("button", {
          type: "button",
          class: "vb-icon-button",
          "aria-label": "移除照片",
          onClick: h
        }, [
          E(z, {
            name: "close",
            size: 15
          })
        ])
      ])) : $("", !0),
      e("div", zi, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: v.value,
          onClick: T[3] || (T[3] = (w) => i.value?.click())
        }, [
          E(z, {
            name: "camera",
            size: 17
          }),
          T[6] || (T[6] = N("拍照", -1))
        ], 8, Ri),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: v.value,
          onClick: T[4] || (T[4] = (w) => r.value?.click())
        }, [
          E(z, {
            name: "upload",
            size: 17
          }),
          N(o(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, Oi)
      ]),
      v.value ? (n(), l("p", Fi, "正在准备图片…")) : u.value ? (n(), l("p", Bi, o(u.value), 1)) : $("", !0),
      d.value && t.modelValue ? (n(), ce(Ze, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: T[5] || (T[5] = (w) => d.value = !1)
      }, {
        default: Qe(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, Vi)
        ]),
        _: 1
      })) : $("", !0)
    ]));
  }
}, qi = { class: "vb-glass vb-photo-card" }, Gi = { class: "vb-aside-heading" }, Ji = { class: "vb-photo-badge" }, Hi = {
  key: 0,
  class: "vb-feature-error",
  role: "alert"
}, Ki = {
  key: 1,
  class: "vb-ai-progress",
  role: "status"
}, Wi = {
  key: 2,
  class: "vb-recognition-failed"
}, Yi = {
  class: "vb-feature-error",
  role: "alert"
}, Xi = {
  key: 4,
  class: "vb-recognition-results"
}, Qi = { class: "vb-data-note" }, Zi = {
  key: 0,
  class: "vb-recognition-meta"
}, er = { key: 0 }, tr = { class: "vb-recognized-list" }, nr = ["value", "disabled", "aria-label", "onInput"], sr = ["aria-label", "onClick"], lr = {
  key: 0,
  class: "vb-recognition-matches"
}, or = ["onClick"], ar = { class: "vb-recognition-weight" }, ir = ["onUpdate:modelValue", "disabled", "aria-label"], rr = {
  key: 1,
  class: "vb-data-note"
}, ur = { class: "vb-recognition-actions" }, dr = ["disabled"], cr = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object },
  emits: ["confirm"],
  setup(t, { emit: a }) {
    const s = t, d = a, { state: i } = Rt(), r = P(null), u = P("");
    let v = "";
    const m = J(() => s.draft.recognition), c = J(() => {
      const O = m.value?.generatedAt;
      if (!O) return "";
      const M = new Date(O);
      return Number.isNaN(M.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(M);
    }), p = J(() => m.value?.items?.length && !m.value.confirmed && m.value.items.every((O) => O.name?.trim() && Number.isFinite(Number(O.grams)) && Number(O.grams) >= 0.1 && Number(O.grams) <= 5e3));
    pe(() => [s.draft.date, s.draft.photoId], async ([O, M]) => {
      u.value = "", r.value = null, s.draft.recognition?.status === "pending" && v !== s.draft.recognition.requestId && (s.draft.recognition = { ...s.draft.recognition, status: "failed", error: "上次识别未完成，请重新识别。" });
      try {
        if (M) {
          const S = await os("photos", M);
          s.draft.date === O && s.draft.photoId === M && (r.value = S || null);
        } else if (s.legacyPhoto?.dataUrl) {
          const S = { ...s.legacyPhoto, id: crypto.randomUUID(), date: O };
          await Nt("photos", S), s.draft.date === O && (s.draft.photoId = S.id, r.value = S);
        }
      } catch (S) {
        u.value = S.message, r.value = s.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function y(O) {
      r.value = O, O || k();
    }
    async function k() {
      const O = s.draft.photoId;
      if (s.draft.photoId = null, s.draft.recognition = null, v = "", O && !i.records.some((M) => M.photoId === O) && !Object.values(i.drafts).some((M) => M.photoId === O)) try {
        await is("photos", O);
      } catch (M) {
        u.value = M.message;
      }
    }
    async function h(O) {
      const M = s.draft.date, S = crypto.randomUUID();
      u.value = "";
      try {
        const B = { ...O, id: S, date: M, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await Nt("photos", B), s.draft.date !== M) return;
        r.value = B, s.draft.photoId = S, s.draft.recognition = null, await R(B);
      } catch (B) {
        u.value = B.message;
      }
    }
    async function R(O = r.value) {
      if (!O?.dataUrl || m.value?.status === "pending") return;
      const M = s.draft, S = M.photoId, B = crypto.randomUUID();
      v = B, M.recognition = { requestId: B, photoId: S, status: "pending", items: [], error: "", confirmed: !1 };
      try {
        const se = await yt("recognize", { image: O.dataUrl, requestId: S || B });
        if (M.photoId !== S || M.recognition?.requestId !== B) return;
        M.recognition = { ...se, requestId: B, photoId: S, status: "complete", error: "", confirmed: !1 };
      } catch (se) {
        M.photoId === S && M.recognition?.requestId === B && (M.recognition = { ...M.recognition, status: "failed", error: se.message });
      } finally {
        v === B && (v = "");
      }
    }
    function T(O, M) {
      O.name = M.target.value, O.foodId = null;
    }
    function w(O, M) {
      O.foodId = M.key, O.name = M.name;
    }
    function A() {
      s.draft.recognition = { ...s.draft.recognition, status: "complete", recognitionId: s.draft.recognition?.recognitionId || crypto.randomUUID(), items: s.draft.recognition?.items || [], confirmed: !1, error: "", note: s.draft.recognition?.note || "手动补充，请核对名称与份量。" }, s.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function j() {
      p.value && d("confirm", { batchId: m.value.recognitionId, items: m.value.items.map((O) => ({ ...O, estimated: !0, source: "photo" })) });
    }
    return (O, M) => (n(), l("section", qi, [
      e("div", Gi, [
        M[2] || (M[2] = e("div", null, [
          e("h2", null, "这一餐的照片"),
          e("p", null, "拍一餐，核对后再记入。")
        ], -1)),
        e("span", Ji, [
          E(z, {
            name: "camera",
            size: 16
          })
        ])
      ]),
      M[6] || (M[6] = e("p", { class: "vb-photo-disclosure" }, "选择照片后自动识别：压缩照片会经本地后端发送给 DeepSeek。照片与识别结果保存在当前浏览器。", -1)),
      E(Li, {
        "model-value": r.value,
        "onUpdate:modelValue": y,
        onSelected: h
      }, null, 8, ["model-value"]),
      u.value ? (n(), l("p", Hi, o(u.value), 1)) : $("", !0),
      m.value?.status === "pending" ? (n(), l("div", Ki, [...M[3] || (M[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : $("", !0),
      m.value?.status === "failed" ? (n(), l("div", Wi, [
        e("p", Yi, o(m.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: M[0] || (M[0] = (S) => R())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: A
          }, "手动录入")
        ])
      ])) : $("", !0),
      r.value && !m.value ? (n(), l("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: M[1] || (M[1] = (S) => R())
      }, "开始 AI 识别")) : $("", !0),
      m.value?.status === "complete" ? (n(), l("div", Xi, [
        e("p", Qi, o(m.value.note || "请核对食物名称与份量。") + " 照片重量为估算，营养数值只按确认的数据库条目计算。", 1),
        m.value.model ? (n(), l("small", Zi, [
          N("由 " + o(m.value.model) + " 识别", 1),
          c.value ? (n(), l("span", er, " · " + o(c.value), 1)) : $("", !0)
        ])) : $("", !0),
        e("div", tr, [
          (n(!0), l(F, null, q(m.value.items, (S, B) => (n(), l("div", {
            key: S.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: S.name,
                disabled: m.value.confirmed,
                "aria-label": "识别食物" + (B + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (se) => T(S, se)
              }, null, 40, nr),
              m.value.confirmed ? $("", !0) : (n(), l("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (B + 1),
                onClick: (se) => m.value.items.splice(B, 1)
              }, [
                E(z, {
                  name: "close",
                  size: 14
                })
              ], 8, sr))
            ]),
            !S.foodId && !m.value.confirmed ? (n(), l("div", lr, [
              (n(!0), l(F, null, q(b(Tt)(S.name, 3), (se) => (n(), l("button", {
                key: se.key,
                type: "button",
                onClick: (fe) => w(S, se)
              }, o(se.name), 9, or))), 128))
            ])) : $("", !0),
            e("label", ar, [
              M[4] || (M[4] = N("估算可食部", -1)),
              X(e("input", {
                "onUpdate:modelValue": (se) => S.grams = se,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: m.value.confirmed,
                "aria-label": "识别食物" + (B + 1) + "克数",
                placeholder: "克数"
              }, null, 8, ir), [
                [re, S.grams]
              ]),
              M[5] || (M[5] = N("克", -1))
            ]),
            e("small", {
              class: ve({ "vb-unmatched": !S.foodId })
            }, o(S.foodId ? "数据库：" + b(ne)[S.foodId]?.state : "未匹配数据库，营养指标暂无数据"), 3),
            e("small", null, o(S.uncertainty), 1)
          ]))), 128))
        ]),
        m.value.items.length ? $("", !0) : (n(), l("p", rr, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", ur, [
          m.value.confirmed ? $("", !0) : (n(), l("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: A
          }, "＋补充遗漏食物")),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !p.value,
            onClick: j
          }, o(m.value.confirmed ? "已加入本次选择" : "确认并加入记录"), 9, dr)
        ])
      ])) : $("", !0)
    ]));
  }
}, vr = { class: "vb-diary-page" }, mr = { class: "vb-page-title" }, br = { class: "vb-date-input" }, pr = ["max"], gr = {
  key: 0,
  class: "vb-diary-grid"
}, fr = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, yr = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], hr = { class: "vb-section-heading" }, kr = { class: "vb-pill" }, wr = {
  key: 0,
  class: "vb-selected-list"
}, $r = {
  key: 1,
  class: "vb-muted-empty"
}, _r = { class: "vb-section-heading" }, Ar = {
  key: 0,
  class: "vb-history-list"
}, Cr = ["aria-label", "onClick"], Ir = ["onClick"], Sr = ["aria-label", "onClick"], Er = {
  key: 1,
  class: "vb-muted-empty"
}, xr = { class: "vb-diary-actions" }, Ur = ["disabled"], jr = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, Dr = { class: "vb-section-heading" }, Nr = { class: "vb-diary-search-row" }, Pr = { class: "vb-search-field" }, Mr = { class: "vb-meal-select" }, Tr = ["value"], zr = {
  key: 0,
  class: "vb-search-results"
}, Rr = ["onClick"], Or = {
  key: 0,
  class: "vb-search-empty"
}, Fr = { class: "vb-diary-entry-heading" }, Br = {
  key: 1,
  class: "vb-diary-entries"
}, Vr = { class: "vb-diary-entry-title" }, Lr = ["onClick"], qr = ["onUpdate:modelValue", "aria-label"], Gr = ["aria-label", "onClick"], Jr = { class: "vb-data-note" }, Hr = {
  key: 0,
  class: "vb-pill"
}, Kr = { class: "vb-entry-controls" }, Wr = ["onUpdate:modelValue", "aria-label"], Yr = { class: "vb-entry-meal" }, Xr = ["onUpdate:modelValue"], Qr = ["value"], Zr = { key: 0 }, eu = ["onUpdate:modelValue"], tu = ["value"], nu = {
  key: 0,
  class: "vb-inline-warning"
}, su = ["onClick"], lu = {
  key: 2,
  class: "vb-muted-empty"
}, ou = ["onToggle"], au = { key: 0 }, iu = ["onClick"], ru = ["onClick"], uu = { class: "vb-field vb-notes-field" }, du = { class: "vb-intake-more" }, cu = { key: 0 }, vu = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: a }) {
    const s = t, d = a, { state: i, ensureDraft: r, addToDraft: u } = Rt(), { isStale: v } = Ft(), m = Ke({}), c = Ke({}), p = P(s.initialDate || he()), y = P(""), k = P("unspecified"), h = P("selected"), R = P(null), T = P("");
    pe(() => s.initialDate, (K) => {
      K && (p.value = K);
    }), pe(p, (K) => {
      r(K), T.value = "", y.value = "";
    }, { immediate: !0 });
    const w = J(() => i.drafts[p.value]), A = J(() => Jt(w.value?.entries)), j = J(() => Tt(y.value, 8)), O = J(() => s.records.find((K) => K.date === p.value)), M = (K) => s.reports.find((V) => V.date === K);
    function S(K) {
      u({ date: p.value, foodId: K.key, grams: K.grams || 100, meal: k.value }), y.value = "", h.value = "selected";
    }
    function B() {
      w.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: y.value.trim(), grams: 100, meal: k.value, group: "snacks", source: "manual", referenceConfirmed: !0 }), y.value = "";
    }
    function se({ items: K, batchId: V }) {
      if (w.value.appliedBatches.includes(V)) return;
      const x = Jt(K.map((ee) => ({ ...ee, id: crypto.randomUUID(), meal: k.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: gt(ne[ee.foodId]) })));
      if (x.length !== K.length) {
        T.value = "请核对每项食物名称与克数。";
        return;
      }
      w.value.entries.push(...x), w.value.appliedBatches.push(V), w.value.recognition.confirmed = !0, h.value = "selected";
    }
    function fe() {
      if (!s.saving) {
        if (T.value = "", A.value.length !== w.value.entries.length) {
          T.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
          return;
        }
        d("save", JSON.parse(JSON.stringify(w.value)));
      }
    }
    function G(K) {
      h.value = K, matchMedia("(max-width:950px)").matches && Ue(() => R.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function ge(K) {
      const V = ["ArrowRight", "ArrowDown", "End"].includes(K.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(K.key) ? "selected" : null;
      V && (K.preventDefault(), G(V), Ue(() => document.getElementById("vb-tab-" + V)?.focus()));
    }
    function ie(K) {
      const V = M(K.date);
      return V ? v(V, K, s.profile) ? "报告需更新" : V.status === "pending" ? "分析中" : V.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (K, V) => (n(), l("div", vr, [
      e("div", mr, [
        V[8] || (V[8] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "一餐一记，慢慢更了解自己"),
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", br, [
          E(z, {
            name: "calendar",
            size: 18
          }),
          X(e("input", {
            "onUpdate:modelValue": V[0] || (V[0] = (x) => p.value = x),
            type: "date",
            max: b(he)(),
            "aria-label": "饮食记录日期"
          }, null, 8, pr), [
            [re, p.value]
          ])
        ])
      ]),
      w.value ? (n(), l("div", gr, [
        e("aside", fr, [
          (n(), ce(cr, {
            key: p.value,
            draft: w.value,
            "legacy-photo": O.value?.photo,
            onConfirm: se
          }, null, 8, ["draft", "legacy-photo"])),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: ge
          }, [
            (n(!0), l(F, null, q([["selected", "本次选择", A.value.length], ["history", "最近记录", t.records.length]], ([x, ee, te]) => (n(), l("button", {
              id: "vb-tab-" + x,
              key: x,
              type: "button",
              role: "tab",
              "aria-selected": h.value === x,
              "aria-controls": "vb-panel-" + x,
              tabindex: h.value === x ? 0 : -1,
              class: ve({ selected: h.value === x }),
              onClick: (ye) => G(x)
            }, [
              N(o(ee), 1),
              e("span", null, o(te), 1)
            ], 10, yr))), 128))
          ], 32),
          h.value === "selected" ? (n(), l("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: R,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", hr, [
              e("div", null, [
                V[9] || (V[9] = e("h2", null, "本次选择", -1)),
                e("p", null, o(p.value), 1)
              ]),
              e("span", kr, o(A.value.length) + " 项", 1)
            ]),
            E(Mt, {
              entries: A.value,
              compact: ""
            }, null, 8, ["entries"]),
            A.value.length ? (n(), l("div", wr, [
              (n(!0), l(F, null, q(A.value, (x) => (n(), l("div", {
                key: x.id
              }, [
                e("span", null, [
                  N(o(x.name), 1),
                  e("small", null, o(b(rt).find(([ee]) => ee === x.meal)?.[1]) + o(x.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  N(o(x.grams), 1),
                  V[10] || (V[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (n(), l("p", $r, "选择食物后，会在这里汇总。"))
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
            e("div", _r, [
              V[11] || (V[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              E(z, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (n(), l("div", Ar, [
              (n(!0), l(F, null, q(t.records.slice(0, 12), (x) => (n(), l("div", {
                key: x.date,
                class: "vb-history-item vb-history-with-ai"
              }, [
                e("button", {
                  type: "button",
                  "aria-label": `打开 ${x.date} 的饮食记录`,
                  onClick: (ee) => p.value = x.date
                }, [
                  V[12] || (V[12] = e("span", { class: "vb-status-dot" }, null, -1)),
                  e("span", null, [
                    e("strong", null, o(x.date), 1),
                    e("small", null, o(Object.values(x.foods || {}).filter((ee) => Number(ee) > 0).length) + " 类食物", 1)
                  ])
                ], 8, Cr),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (ee) => K.$emit("analysis", x.date)
                }, o(ie(x)), 9, Ir),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + x.date + "的记录",
                  onClick: (ee) => K.$emit("remove", x.date)
                }, [
                  E(z, {
                    name: "close",
                    size: 14
                  })
                ], 8, Sr)
              ]))), 128))
            ])) : (n(), l("p", Er, "你的第一天记录，从今天开始。"))
          ], 512)),
          e("div", xr, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving
            }, [
              N(o(t.saving ? "正在保存…" : "保存记录"), 1),
              E(z, {
                name: "arrow",
                size: 17
              })
            ], 8, Ur),
            O.value ? (n(), l("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: V[1] || (V[1] = (x) => K.$emit("analysis", p.value))
            }, "查看分析")) : $("", !0),
            T.value ? (n(), l("p", jr, o(T.value), 1)) : $("", !0)
          ])
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: De(fe, ["prevent"])
        }, [
          e("div", Dr, [
            V[13] || (V[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: V[2] || (V[2] = (x) => K.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", Nr, [
            e("label", Pr, [
              E(z, {
                name: "search",
                size: 18
              }),
              X(e("input", {
                "onUpdate:modelValue": V[3] || (V[3] = (x) => y.value = x),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: V[4] || (V[4] = Mn(De((x) => j.value[0] && S(j.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [re, y.value]
              ])
            ]),
            e("label", Mr, [
              V[14] || (V[14] = e("span", null, "添加到", -1)),
              X(e("select", {
                "onUpdate:modelValue": V[5] || (V[5] = (x) => k.value = x),
                "aria-label": "添加食物的餐次"
              }, [
                (n(!0), l(F, null, q(b(rt), ([x, ee]) => (n(), l("option", {
                  key: x,
                  value: x
                }, o(ee), 9, Tr))), 128))
              ], 512), [
                [we, k.value]
              ])
            ])
          ]),
          y.value.trim() ? (n(), l("div", zr, [
            (n(!0), l(F, null, q(j.value, (x) => (n(), l("button", {
              key: x.key,
              type: "button",
              class: "vb-search-result",
              onClick: (ee) => S(x)
            }, [
              e("span", null, [
                e("strong", null, o(x.name), 1),
                e("small", null, o(x.state) + " · " + o(x.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              E(z, {
                name: "plus",
                size: 17
              })
            ], 8, Rr))), 128)),
            j.value.length ? $("", !0) : (n(), l("p", Or, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: B
            }, [
              N("手动添加“" + o(y.value) + "”", 1),
              E(z, {
                name: "plus",
                size: 16
              })
            ])
          ])) : $("", !0),
          e("div", Fr, [
            e("h3", null, [
              V[15] || (V[15] = N("已选食物 ", -1)),
              e("small", null, o(w.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: B
            }, "＋手动添加")
          ]),
          w.value.entries.length ? (n(), l("div", Br, [
            (n(!0), l(F, null, q(w.value.entries, (x, ee) => (n(), l("article", {
              key: x.id,
              class: "vb-diary-entry"
            }, [
              e("div", Vr, [
                x.foodId ? (n(), l("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (te) => K.$emit("detail", x.foodId)
                }, [
                  N(o(b(ht)(b(ne)[x.foodId]) || x.name), 1),
                  E(z, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, Lr)) : X((n(), l("input", {
                  key: 1,
                  "onUpdate:modelValue": (te) => x.name = te,
                  "aria-label": "手动食物" + (ee + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 8, qr)), [
                  [re, x.name]
                ]),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (ee + 1),
                  onClick: (te) => w.value.entries.splice(ee, 1)
                }, [
                  E(z, {
                    name: "close",
                    size: 15
                  })
                ], 8, Gr)
              ]),
              e("p", Jr, [
                N(o(x.foodId ? b(ne)[x.foodId]?.state : "手动条目，暂无营养数据") + o(x.estimated ? " · 份量为估算" : ""), 1),
                x.nutritionSnapshot?.dataType === "ai-estimate" ? (n(), l("span", Hr, "含AI估算")) : $("", !0)
              ]),
              E(Cn, {
                food: b(ne)[x.foodId],
                onChoose: (te) => {
                  x.grams = te, x.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", Kr, [
                e("label", null, [
                  V[16] || (V[16] = N("可食部重量", -1)),
                  X(e("input", {
                    "onUpdate:modelValue": (te) => x.grams = te,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (b(ne)[x.foodId]?.name || x.name || "食物") + "克数"
                  }, null, 8, Wr), [
                    [re, x.grams]
                  ]),
                  V[17] || (V[17] = e("small", null, "克", -1))
                ]),
                e("label", Yr, [
                  V[18] || (V[18] = e("span", null, "餐次", -1)),
                  X(e("select", {
                    "onUpdate:modelValue": (te) => x.meal = te
                  }, [
                    (n(!0), l(F, null, q(b(rt), ([te, ye]) => (n(), l("option", {
                      key: te,
                      value: te
                    }, o(ye), 9, Qr))), 128))
                  ], 8, Xr), [
                    [we, x.meal]
                  ])
                ]),
                x.foodId ? $("", !0) : (n(), l("label", Zr, [
                  V[19] || (V[19] = N("归属类别", -1)),
                  X(e("select", {
                    "onUpdate:modelValue": (te) => x.group = te
                  }, [
                    (n(!0), l(F, null, q(b(mt), (te) => (n(), l("option", {
                      key: te.key,
                      value: te.key
                    }, o(te.name), 9, tu))), 128))
                  ], 8, eu), [
                    [we, x.group]
                  ])
                ]))
              ]),
              x.referenceConfirmed === !1 ? (n(), l("p", nu, [
                V[20] || (V[20] = N("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                b(ne)[x.foodId]?.source ? (n(), l("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (te) => x.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, su)) : (n(), l("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: V[6] || (V[6] = (te) => K.$emit("browse"))
                }, "查找具体食物"))
              ])) : $("", !0)
            ]))), 128))
          ])) : (n(), l("p", lu, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (n(!0), l(F, null, q(b(mt), (x) => (n(), l("details", {
            key: x.key,
            class: "vb-diary-food-group",
            onToggle: (ee) => m[x.key] = ee.target.open
          }, [
            e("summary", null, [
              E(z, {
                name: b(vn)[x.key],
                size: 18
              }, null, 8, ["name"]),
              N(o(x.name), 1),
              e("small", null, o(x.items.length) + " 个条目", 1),
              E(z, {
                name: "chevron",
                size: 14
              })
            ]),
            m[x.key] ? (n(), l("div", au, [
              (n(!0), l(F, null, q(x.items.slice(0, c[x.key] || 24), ([ee, te]) => (n(), l("button", {
                key: ee,
                type: "button",
                onClick: (ye) => S(b(ne)[ee])
              }, o(te) + " ＋", 9, iu))), 128)),
              x.items.length > (c[x.key] || 24) ? (n(), l("button", {
                key: 0,
                type: "button",
                onClick: (ee) => c[x.key] = (c[x.key] || 24) + 24
              }, "再显示24项", 8, ru)) : $("", !0)
            ])) : $("", !0)
          ], 40, ou))), 128)),
          e("label", uu, [
            V[21] || (V[21] = N("补充备注 ", -1)),
            V[22] || (V[22] = e("span", null, "可选，不发送给 AI", -1)),
            X(e("textarea", {
              "onUpdate:modelValue": V[7] || (V[7] = (x) => w.value.notes = x),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [re, w.value.notes]
            ])
          ]),
          e("details", du, [
            V[23] || (V[23] = e("summary", null, "查看记录依据", -1)),
            V[24] || (V[24] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (n(!0), l(F, null, q(A.value, (x) => (n(), l("p", {
              key: x.id
            }, [
              N(o(x.name) + "：" + o(x.nutritionSnapshot?.source?.name || x.nutritionSnapshot?.estimate?.model || "原目录数据"), 1),
              x.nutritionSnapshot?.estimate ? (n(), l("span", cu, " · " + o(x.nutritionSnapshot.estimate.assumption), 1)) : $("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : $("", !0)
    ]));
  }
}, mu = { class: "vb-food-card vb-glass" }, bu = ["aria-label"], pu = { class: "vb-food-card-copy" }, gu = { class: "vb-small-label" }, fu = { key: 0 }, yu = { key: 0 }, hu = {
  key: 1,
  class: "vb-food-composition-note"
}, ku = { class: "vb-food-card-bottom" }, wu = ["aria-pressed"], sn = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const a = t, { photo: s, loading: d, failed: i } = An(() => a.food);
    return (r, u) => (n(), l("article", mu, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: u[0] || (u[0] = (v) => r.$emit("detail", t.food.key))
      }, [
        E(Vt, {
          food: t.food,
          photo: b(s),
          loading: b(d),
          failed: b(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", pu, [
          e("span", gu, o(t.food.categoryName), 1),
          e("h3", null, o(b(ht)(t.food)), 1),
          e("p", null, o(b(Bt)(t.food)), 1),
          t.food.source ? (n(), l("dl", fu, [
            (n(!0), l(F, null, q(b(Ne), (v) => (n(), l("div", {
              key: v.id
            }, [
              e("dt", null, o(v.id === "carbs" ? "碳水" : v.name), 1),
              e("dd", null, [
                N(o(b(xe)(t.food.nutrients[v.id])), 1),
                t.food.nutrients[v.id] != null ? (n(), l("small", yu, o(v.unit), 1)) : $("", !0)
              ])
            ]))), 128))
          ])) : (n(), l("p", hu, [
            u[3] || (u[3] = N("按实际配方记录份量", -1)),
            u[4] || (u[4] = e("br", null, null, -1)),
            N(o(b(cn).estimates?.[t.food.key] ? "已保存AI估算 · 查看范围与假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, bu),
      e("div", ku, [
        e("span", null, o(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (n(), l("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: ve({ selected: t.compared }),
          onClick: u[2] || (u[2] = (v) => r.$emit("compare", t.food.key))
        }, [
          E(z, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          N(o(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, wu)) : (n(), l("button", {
          key: 0,
          type: "button",
          onClick: u[1] || (u[1] = (v) => r.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, $u = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), Sn = [...Bn, ...Vn.map((t) => t.imageCredit)];
Object.fromEntries(Sn.map((t) => [t.foodId, t]));
[...new Map(Sn.map((t) => [t.sourceUrl, t])).values()];
const _u = { class: "vb-food-hub" }, Au = { class: "vb-page-title" }, Cu = ["aria-expanded"], Iu = { class: "vb-glass vb-food-search-hero" }, Su = { class: "vb-icon-badge" }, Eu = { class: "vb-food-search-input" }, xu = {
  key: 1,
  class: "vb-food-suggestions"
}, Uu = ["onClick"], ju = { class: "vb-recommended" }, Du = ["onClick"], Nu = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, Pu = { class: "vb-section-heading" }, Mu = {
  key: 0,
  class: "vb-comparison-chips"
}, Tu = ["onClick"], zu = { class: "vb-field" }, Ru = { class: "vb-ask-bottom" }, Ou = ["disabled"], Fu = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, Bu = {
  key: 2,
  class: "vb-ai-answer"
}, Vu = {
  key: 0,
  class: "vb-data-note"
}, Lu = { class: "vb-answer-foods" }, qu = ["onClick"], Gu = { class: "vb-data-note" }, Ju = { class: "vb-data-note" }, Hu = {
  key: 1,
  class: "vb-compare-bar"
}, Ku = ["onClick"], Wu = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, Yu = { class: "vb-food-results-grid" }, Xu = { class: "vb-section-heading vb-category-heading" }, Qu = { class: "vb-food-category-grid" }, Zu = ["onClick"], ed = ["src", "alt"], td = { class: "vb-food-results-top" }, nd = { class: "vb-food-filter" }, sd = { key: 0 }, ld = ["onClick"], od = { key: 1 }, ad = ["value"], id = { class: "vb-food-results-grid" }, rd = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, ud = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, dd = ["disabled"], cd = ["disabled"], vd = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, md = { class: "vb-reference-sample-list" }, bd = ["onClick"], pd = { key: 0 }, gd = { class: "vb-food-source-note" }, fd = ["href"], yd = ["href"], hd = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const a = P(""), s = P(""), d = P(""), i = P(""), r = P("relevance"), u = P(1), v = P(!1), m = P([]), c = P(""), p = P(!1), y = P(""), k = P(!1), h = P(null), R = P(""), T = At, w = new Set(At.map((H) => H.key)), A = new Set(Ln.map((H) => H.key)), j = J(() => s.value ? Ct(s.value).map((H) => H.food).filter((H) => A.has(H.key) && !w.has(H.key)) : []);
    function O(H, I = Le.length) {
      return Ct(H).map((g) => g.food).filter((g) => w.has(g.key)).slice(0, I);
    }
    const M = J(() => a.value.trim() ? O(a.value, Le.length).slice(0, 5) : []), S = (H) => T.filter((I) => I.category === H).length, B = At.length, se = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((H) => {
      const I = Ct(H).map((g) => g.food).filter((g) => w.has(g.key));
      return I.find((g) => g.source) || I[0];
    }).filter(Boolean).map((H) => [H.key, H])).values()], fe = J(() => {
      let H = s.value ? O(s.value) : [...T].sort((I, g) => +!I.source - +!g.source);
      return d.value && (H = H.filter((I) => I.category === d.value)), H;
    }), G = J(() => [...new Set(fe.value.map((H) => H.subcategory))]), ge = J(() => {
      let H = fe.value.filter((I) => !i.value || I.subcategory === i.value);
      if (r.value !== "relevance") {
        const [I, g] = r.value.split(":");
        H = [...H].sort((f, U) => {
          if (I === "name") return f.name.localeCompare(U.name, "zh");
          const ae = f.nutrients[I], oe = U.nutrients[I];
          return ae == null || oe == null ? +(ae == null) - +(oe == null) : (g === "asc" ? 1 : -1) * (ae - oe);
        });
      }
      return H;
    }), ie = J(() => Math.max(1, Math.ceil(ge.value.length / 12))), K = J(() => ge.value.slice((u.value - 1) * 12, u.value * 12));
    pe([i, r], () => u.value = 1);
    function V(H = a.value) {
      a.value = H.trim(), s.value = a.value, d.value = "", i.value = "", u.value = 1, v.value = !1;
    }
    function x(H) {
      d.value = H, s.value = "", a.value = "", i.value = "", u.value = 1, r.value = "relevance";
    }
    function ee() {
      d.value = "", s.value = "", a.value = "", i.value = "", u.value = 1;
    }
    function te(H) {
      c.value = "", m.value.includes(H) ? m.value = m.value.filter((I) => I !== H) : m.value.length < 2 ? m.value.push(H) : c.value = "每次选择两种食物进行比较。";
    }
    async function ye() {
      if (!(k.value || !y.value.trim())) {
        k.value = !0, R.value = "", h.value = null;
        try {
          h.value = await yt("ask", { question: y.value.trim(), foodIds: m.value });
        } catch (H) {
          R.value = H.message;
        } finally {
          k.value = !1;
        }
      }
    }
    return (H, I) => (n(), l("div", _u, [
      e("div", Au, [
        e("div", null, [
          I[14] || (I[14] = e("p", { class: "vb-eyebrow" }, "从认识食物开始", -1)),
          I[15] || (I[15] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, o(b(B).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": p.value,
          onClick: I[0] || (I[0] = (g) => p.value = !p.value)
        }, [
          E(z, {
            name: "sparkles",
            size: 17
          }),
          I[16] || (I[16] = N("问 AI", -1))
        ], 8, Cu)
      ]),
      e("section", Iu, [
        e("span", Su, [
          E(z, {
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
          onSubmit: I[3] || (I[3] = De((g) => V(), ["prevent"]))
        }, [
          e("div", Eu, [
            E(z, {
              name: "search",
              size: 19
            }),
            X(e("input", {
              "onUpdate:modelValue": I[1] || (I[1] = (g) => a.value = g),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: I[2] || (I[2] = (g) => v.value = !0)
            }, null, 544), [
              [re, a.value]
            ]),
            a.value ? (n(), l("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: ee
            }, [
              E(z, {
                name: "close",
                size: 15
              })
            ])) : $("", !0),
            v.value && M.value.length ? (n(), l("div", xu, [
              (n(!0), l(F, null, q(M.value, (g) => (n(), l("button", {
                key: g.key,
                type: "button",
                onClick: (f) => V(g.name)
              }, [
                N(o(g.name), 1),
                e("small", null, o(g.state), 1)
              ], 8, Uu))), 128))
            ])) : $("", !0)
          ]),
          I[17] || (I[17] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", ju, [
          I[18] || (I[18] = e("span", null, "推荐搜索", -1)),
          (n(), l(F, null, q(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (g) => e("button", {
            key: g,
            type: "button",
            onClick: (f) => V(g)
          }, o(g), 9, Du)), 64))
        ])
      ]),
      p.value ? (n(), l("section", Nu, [
        e("div", Pu, [
          I[20] || (I[20] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          E(z, { name: "sparkles" })
        ]),
        I[24] || (I[24] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给 DeepSeek。数值来自食物库，AI 负责解释。", -1)),
        m.value.length ? (n(), l("div", Mu, [
          (n(!0), l(F, null, q(m.value, (g) => (n(), l("button", {
            key: g,
            type: "button",
            onClick: (f) => te(g)
          }, o(b(ne)[g].name) + " ×", 9, Tu))), 128))
        ])) : $("", !0),
        e("form", {
          onSubmit: De(ye, ["prevent"])
        }, [
          e("label", zu, [
            I[21] || (I[21] = N("你的问题", -1)),
            X(e("textarea", {
              "onUpdate:modelValue": I[4] || (I[4] = (g) => y.value = g),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [re, y.value]
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
              disabled: k.value || !y.value.trim()
            }, o(k.value ? "正在查询与分析…" : "发送问题"), 9, Ou)
          ])
        ], 32),
        R.value ? (n(), l("p", Fu, o(R.value), 1)) : $("", !0),
        h.value ? (n(), l("div", Bu, [
          I[22] || (I[22] = e("h3", null, "数据库数值", -1)),
          h.value.database.length ? $("", !0) : (n(), l("p", Vu, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", Lu, [
            (n(!0), l(F, null, q(h.value.database, (g) => (n(), l("button", {
              key: g.id,
              type: "button",
              onClick: (f) => H.$emit("detail", g.id)
            }, [
              e("strong", null, o(g.name) + " →", 1),
              e("span", null, o(g.grams) + " 克可食部 · 热量 " + o(b(xe)(g.portion.energy)) + o(g.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + o(b(xe)(g.portion.protein)) + o(g.portion.protein != null ? " g" : ""), 1),
              e("small", null, o(g.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, qu))), 128))
          ]),
          I[23] || (I[23] = e("h3", null, "AI 解释", -1)),
          e("p", null, o(h.value.answer.summary), 1),
          e("p", null, o(h.value.answer.explanation), 1),
          e("p", Gu, o(h.value.answer.limitations), 1),
          e("small", Ju, o(h.value.model) + " · " + o(new Date(h.value.generatedAt).toLocaleString()), 1)
        ])) : $("", !0)
      ])) : $("", !0),
      m.value.length ? (n(), l("div", Hu, [
        e("span", null, "已选 " + o(m.value.length) + " 种食物", 1),
        (n(!0), l(F, null, q(m.value, (g) => (n(), l("button", {
          key: g,
          onClick: (f) => te(g)
        }, o(b(ne)[g].name) + " ×", 9, Ku))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: I[6] || (I[6] = (g) => {
            p.value = !0, y.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : $("", !0),
      c.value ? (n(), l("p", Wu, o(c.value), 1)) : $("", !0),
      !d.value && !s.value ? (n(), l(F, { key: 3 }, [
        I[26] || (I[26] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物"),
            e("p", null, "从你熟悉的食材开始。")
          ])
        ], -1)),
        e("div", Yu, [
          (n(), l(F, null, q(se, (g) => E(sn, {
            key: g.key,
            food: g,
            compared: m.value.includes(g.key),
            onDetail: I[7] || (I[7] = (f) => H.$emit("detail", f)),
            onCompare: te
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", Xu, [
          e("div", null, [
            I[25] || (I[25] = e("h2", null, "按类别探索", -1)),
            e("p", null, o(b(T).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", Qu, [
          (n(!0), l(F, null, q(b(qn).filter((g) => S(g.id) > 0), (g) => (n(), l("button", {
            key: g.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: (f) => x(g.id)
          }, [
            e("img", {
              src: g.image,
              alt: g.name + "分类示意图",
              loading: "lazy"
            }, null, 8, ed),
            e("span", null, [
              e("small", null, o(S(g.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, o(g.name), 1),
              e("em", null, [
                N(o(g.description) + " ", 1),
                E(z, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, Zu))), 128))
        ]),
        I[27] || (I[27] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (n(), l(F, { key: 4 }, [
        e("div", td, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: ee
          }, [
            E(z, {
              name: "back",
              size: 15
            }),
            I[28] || (I[28] = N("分类总览", -1))
          ]),
          e("h2", null, o(d.value ? b(Ht)[d.value].name : "“" + s.value + "”的食物照片与营养资料"), 1),
          e("span", null, o(ge.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", nd, [
          G.value.length <= 10 ? (n(), l("div", sd, [
            e("button", {
              class: ve({ selected: !i.value }),
              onClick: I[8] || (I[8] = (g) => i.value = "")
            }, "全部", 2),
            (n(!0), l(F, null, q(G.value, (g) => (n(), l("button", {
              key: g,
              class: ve({ selected: i.value === g }),
              onClick: (f) => i.value = g
            }, o(g), 11, ld))), 128))
          ])) : (n(), l("label", od, [
            I[30] || (I[30] = N("筛选", -1)),
            X(e("select", {
              "onUpdate:modelValue": I[9] || (I[9] = (g) => i.value = g),
              "aria-label": "食物类型筛选"
            }, [
              I[29] || (I[29] = e("option", { value: "" }, "全部类型", -1)),
              (n(!0), l(F, null, q(G.value, (g) => (n(), l("option", {
                key: g,
                value: g
              }, o(g), 9, ad))), 128))
            ], 512), [
              [we, i.value]
            ])
          ])),
          e("label", null, [
            I[32] || (I[32] = N("排序", -1)),
            X(e("select", {
              "onUpdate:modelValue": I[10] || (I[10] = (g) => r.value = g),
              "aria-label": "食物营养指标排序"
            }, [...I[31] || (I[31] = [
              rn('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [we, r.value]
            ])
          ])
        ]),
        e("div", id, [
          (n(!0), l(F, null, q(K.value, (g) => (n(), ce(sn, {
            key: g.key,
            food: g,
            compared: m.value.includes(g.key),
            onDetail: I[11] || (I[11] = (f) => H.$emit("detail", f)),
            onCompare: te
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        ge.value.length ? $("", !0) : (n(), l("div", rd, [
          E(z, {
            name: "search",
            size: 34
          }),
          I[33] || (I[33] = e("h2", null, "没有找到匹配的食物", -1)),
          I[34] || (I[34] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: ee
          }, "返回食物总览")
        ])),
        ie.value > 1 ? (n(), l("nav", ud, [
          e("button", {
            disabled: u.value === 1,
            onClick: I[12] || (I[12] = (g) => u.value--)
          }, "上一页", 8, dd),
          e("span", null, "第 " + o(u.value) + " / " + o(ie.value) + " 页", 1),
          e("button", {
            disabled: u.value === ie.value,
            onClick: I[13] || (I[13] = (g) => u.value++)
          }, "下一页", 8, cd)
        ])) : $("", !0)
      ], 64)),
      s.value && j.value.length ? (n(), l("details", vd, [
        e("summary", null, "其他营养数据样本 · " + o(j.value.length.toLocaleString()) + " 条", 1),
        I[35] || (I[35] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", md, [
          (n(!0), l(F, null, q(j.value.slice(0, 80), (g) => (n(), l("button", {
            key: g.key,
            type: "button",
            onClick: (f) => H.$emit("detail", g.key)
          }, [
            e("strong", null, o(g.name), 1),
            e("span", null, o(g.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, bd))), 128))
        ]),
        j.value.length > 80 ? (n(), l("p", pd, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : $("", !0)
      ])) : $("", !0),
      e("details", gd, [
        I[36] || (I[36] = e("summary", null, "数据口径与图片署名", -1)),
        I[37] || (I[37] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        I[38] || (I[38] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        I[39] || (I[39] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        I[40] || (I[40] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (n(!0), l(F, null, q(b($u), (g) => (n(), l("li", {
            key: g.key
          }, [
            N(o(b(Ht)[g.key]?.name) + "：", 1),
            e("a", {
              href: g.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, o(g.title), 9, fd),
            N(" · " + o(g.author) + " · ", 1),
            e("a", {
              href: g.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, o(g.license), 9, yd),
            N(" · " + o(g.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function kd(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function wd() {
  const t = P(""), a = P((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), s = P("lunch"), d = P(null), i = P(""), r = P(!1), u = P([]);
  async function v(c, p, y = {}) {
    if (r.value) return;
    i.value = "", d.value = null, r.value = !0, u.value = [];
    const k = c ? {
      sex: c.sex,
      age: c.age,
      height: c.height,
      weight: c.weight,
      activity: c.activity,
      ageMonths: c.ageMonths,
      physiologicalStage: c.physiologicalStage
    } : null;
    try {
      d.value = await rs({
        goal: t.value.slice(0, 500),
        date: a.value,
        meal: s.value,
        profile: k,
        conditions: y.conditions,
        recordContext: y.recordContext,
        ...p ? {
          personalization: {
            preferences: p.preferences?.slice(0, 200),
            safetyFlags: p.safetyFlags?.slice(0, 4)
          }
        } : {}
      }, (h) => u.value.push(h));
    } catch (h) {
      i.value = kd(h);
    } finally {
      r.value = !1;
    }
  }
  function m() {
    d.value = null, i.value = "", u.value = [];
  }
  return { goal: t, date: a, meal: s, response: d, error: i, busy: r, progress: u, run: v, clear: m };
}
const $d = [
  ["花生", "peanut", "peanuts", "groundnut"],
  ["奶", "牛奶", "乳", "乳制品", "奶制品", "dairy", "milk", "cheese", "yogurt", "yoghurt", "cream", "butter"],
  ["蛋", "鸡蛋", "egg", "eggs"],
  ["海鲜", "seafood", "鱼虾蟹贝", "鱼", "虾", "蟹", "贝", "fish", "shrimp", "prawn", "crab", "clam", "oyster", "salmon", "tuna", "cod", "squid", "mussel"],
  ["肉类", "肉", "牛肉", "猪肉", "鸡肉", "羊肉", "禽", "beef", "pork", "chicken", "lamb", "turkey", "duck", "meat"],
  ["香菜", "coriander", "cilantro"],
  ["大豆", "豆制品", "soy", "tofu"],
  ["小麦", "wheat"],
  ["坚果", "nuts", "almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut"]
], Ut = (t, a = 300) => typeof t == "string" ? t.trim().slice(0, a) : "";
function ln(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const a = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (a !== null && (!Number.isFinite(a) || a <= 0 || a > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const s = (Array.isArray(t.avoids) ? t.avoids.join("、") : Ut(t.avoids)).split(/[,，、;；\n]+/).map((r) => r.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (s.length > 12 || s.some((r) => r.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const d = t.availableFoods ?? [];
  if (!Array.isArray(d) || d.length > 12) throw new Error("可选食物最多12项。");
  const i = d.map((r) => {
    const u = ne[r?.foodId], v = Number(r?.grams), m = r?.price === null || r?.price === void 0 || r?.price === "" ? null : Number(r.price);
    if (!u || !Number.isFinite(v) || v < 0.1 || v > 5e3 || m !== null && (!Number.isFinite(m) || m < 0 || m > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: u.key, name: u.name, grams: v, price: m };
  });
  if (new Set(i.map((r) => r.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: a, avoids: [...new Set(s)], preferences: Ut(t.preferences, 200), exercise: Ut(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function En(t, a = []) {
  const s = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), d = lt(s);
  return a.filter((i) => {
    const r = /* @__PURE__ */ new Set([i]);
    for (const u of $d) if (u.some((v) => lt(v) === lt(i))) for (const v of u) r.add(v);
    return [...r].some((u) => /^[a-z ]+$/i.test(u) ? new RegExp("\\b" + u.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(s) : d.includes(lt(u)));
  });
}
function _d(t, a) {
  return !!t && !["13", "17"].includes(t.category) && !En(t, a.avoids).length && (!a.onlyAvailable || a.availableFoods.some((s) => s.foodId === t.key));
}
function Ad(t, a) {
  const s = t.map((r) => {
    const u = a.availableFoods.find((m) => m.foodId === r.foodId), v = u?.price != null ? Math.round(u.price * r.grams / u.grams * 100) / 100 : null;
    return { foodId: r.foodId, cost: v, priceBasis: u?.price != null ? { price: u.price, grams: u.grams } : null };
  }), d = s.every((r) => r.cost !== null), i = Math.round(s.reduce((r, u) => r + (u.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: a.budget, complete: d, knownSubtotal: i, total: d ? i : null, status: d ? a.budget === null ? "no_budget" : i > a.budget ? "over_budget" : "within_budget" : "unknown", breakdown: s, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: a.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const Cd = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, Id = { class: "vb-agent-heading" }, Sd = { class: "vb-icon-badge" }, Ed = { class: "vb-campus-fields" }, xd = ["max", "disabled"], Ud = ["disabled"], jd = ["value"], Dd = ["disabled"], Nd = ["disabled"], Pd = { class: "vb-analysis-tabs" }, Md = ["disabled"], Td = ["disabled", "onClick"], zd = { class: "vb-more-conditions" }, Rd = { class: "vb-agent-goal" }, Od = ["disabled"], Fd = { class: "vb-campus-fields" }, Bd = ["disabled"], Vd = ["disabled"], Ld = { class: "vb-campus-candidates" }, qd = { class: "vb-candidate-search" }, Gd = ["disabled"], Jd = ["disabled"], Hd = ["value"], Kd = ["disabled"], Wd = { class: "vb-candidate-list" }, Yd = ["onUpdate:modelValue", "disabled"], Xd = ["onUpdate:modelValue", "disabled"], Qd = ["disabled", "onClick"], Zd = {
  key: 0,
  class: "vb-agent-context-optin"
}, ec = ["disabled"], tc = { class: "vb-agent-context-optin" }, nc = ["disabled"], sc = { class: "vb-agent-context-optin" }, lc = ["disabled"], oc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, ac = ["disabled"], ic = {
  key: 0,
  class: "vb-loading-ring"
}, rc = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, uc = { key: 0 }, dc = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, cc = ["disabled"], vc = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, mc = {
  key: 3,
  class: "vb-agent-plan"
}, bc = { class: "vb-agent-plan-heading" }, pc = { class: "vb-eyebrow" }, gc = { class: "vb-data-note" }, fc = { key: 0 }, yc = { key: 1 }, hc = { class: "vb-agent-items" }, kc = { class: "vb-agent-item-title" }, wc = ["onClick"], $c = ["onClick"], _c = {
  key: 0,
  class: "vb-candidate-search"
}, Ac = ["value"], Cc = ["disabled", "onClick"], Ic = { key: 0 }, Sc = { class: "vb-agent-grams" }, Ec = ["value", "onInput"], xc = { class: "vb-agent-evidence" }, Uc = { class: "vb-agent-source" }, jc = ["href"], Dc = { key: 1 }, Nc = { key: 0 }, Pc = {
  key: 1,
  class: "vb-agent-notes"
}, Mc = {
  key: 2,
  class: "vb-agent-notes is-caution"
}, Tc = { class: "vb-agent-trace" }, zc = { class: "vb-agent-confirm" }, Rc = ["disabled"], Oc = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: a }) {
    const s = t, d = a, { goal: i, date: r, meal: u, response: v, error: m, busy: c, progress: p, run: y, clear: k } = wd();
    i.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const h = Ke({ budget: "", avoids: "", preferences: s.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), R = P(-1), T = P(""), w = P(!1), A = P(!0), j = P(!1), O = P(""), M = P(""), S = P(""), B = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], se = J(() => M.value.trim() ? Tt(M.value, 8) : []), fe = J(() => vt((s.records || []).find((g) => g.date === r.value))), G = J(() => v.value?.status === "ready" ? v.value : null), ge = J(() => (G.value?.plan.items || []).map((g, f) => ({ id: "agent-" + f, foodId: g.foodId, name: g.name, grams: g.grams, meal: g.meal, group: ne[g.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), ie = J(() => G.value ? Ad(G.value.plan.items, G.value.conditions) : null), K = J(() => !G.value || !G.value.plan.items.length || ie.value?.status === "over_budget" || G.value.plan.items.some((g) => !Number.isFinite(g.grams) || g.grams < 0.1 || g.grams > 5e3));
    pe([i, r, u, h, A, j, () => s.profile, () => s.records], () => {
      !c.value && v.value && k(), w.value = !1;
    }, { deep: !0 }), pe(() => s.preferences, (g) => h.preferences = g || "");
    function V() {
      const g = ne[S.value];
      if (O.value = "", !!g) {
        if (h.availableFoods.some((f) => f.foodId === g.key)) {
          O.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (h.availableFoods.length >= 12) {
          O.value = "最多加入12项备选食物。";
          return;
        }
        h.availableFoods.push({ foodId: g.key, name: g.name, grams: 100, price: "" }), S.value = "", M.value = "";
      }
    }
    async function x() {
      O.value = "", w.value = !1;
      let g;
      try {
        g = ln(h);
        const f = g.availableFoods.find((U) => En(ne[U.foodId], g.avoids).length);
        if (f) throw Error("备选食物“" + f.name + "”命中回避项，请先移除或修改条件。");
      } catch (f) {
        O.value = f.message;
        return;
      }
      await y(s.profile, j.value ? { safetyFlags: (s.flags || []).filter((f) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes(f)) } : void 0, { conditions: g, ...A.value ? { recordContext: { date: r.value, entries: fe.value.map((f) => ({ foodId: f.foodId, name: f.name, grams: f.grams, meal: f.meal, referenceConfirmed: f.referenceConfirmed })) } } : {} });
    }
    function ee() {
      K.value || w.value || (w.value = !0, d("confirm", { confirmationId: G.value.confirmationId, date: G.value.date, meal: G.value.meal, items: G.value.plan.items, onResult: (g) => {
        w.value = g.ok, g.ok || (O.value = g.error || "加入草稿失败，请重试。");
      } }));
    }
    function te(g, f) {
      G.value && (G.value.plan.items[g].grams = Number(f), G.value.plan.items[g].portion = Kt(ne[G.value.plan.items[g].foodId], Number(f)), w.value = !1);
    }
    const ye = J(() => {
      let g;
      try {
        g = ln(h);
      } catch {
        return [];
      }
      return (g.availableFoods.length && g.onlyAvailable ? g.availableFoods.map((U) => ne[U.foodId]) : Le).filter((U) => U && U.source && _d(U, g) && !G.value?.plan.items.some((ae) => ae.foodId === U.key)).slice(0, 60);
    });
    function H(g) {
      const f = ne[T.value];
      if (!f || !ye.value.some((ae) => ae.key === f.key)) return;
      const U = G.value.plan.items[g];
      G.value.plan.items[g] = { ...U, foodId: f.key, name: f.name, portion: Kt(f, U.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: f.source?.name || "", source: f.source?.id || "", missing: [] }, w.value = !1, R.value = -1, T.value = "";
    }
    const I = (g) => typeof g == "number" && Number.isFinite(g) ? g.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (g, f) => (n(), l("section", Cd, [
      e("header", Id, [
        e("span", Sd, [
          E(z, {
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
        onSubmit: De(x, ["prevent"])
      }, [
        e("div", Ed, [
          e("label", null, [
            f[16] || (f[16] = N("日期", -1)),
            X(e("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (U) => $t(r) ? r.value = U : null),
              type: "date",
              max: b(he)(),
              disabled: b(c)
            }, null, 8, xd), [
              [re, b(r)]
            ])
          ]),
          e("label", null, [
            f[17] || (f[17] = N("餐次", -1)),
            X(e("select", {
              "onUpdate:modelValue": f[1] || (f[1] = (U) => $t(u) ? u.value = U : null),
              disabled: b(c)
            }, [
              (n(), l(F, null, q(B, ([U, ae]) => e("option", {
                key: U,
                value: U
              }, o(ae), 9, jd)), 64))
            ], 8, Ud), [
              [we, b(u)]
            ])
          ]),
          e("label", null, [
            f[18] || (f[18] = N("预算（元，可选）", -1)),
            X(e("input", {
              "onUpdate:modelValue": f[2] || (f[2] = (U) => h.budget = U),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: b(c)
            }, null, 8, Dd), [
              [re, h.budget]
            ])
          ]),
          e("label", null, [
            f[19] || (f[19] = N("不吃的食物", -1)),
            X(e("input", {
              "onUpdate:modelValue": f[3] || (f[3] = (U) => h.avoids = U),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: b(c)
            }, null, 8, Nd), [
              [re, h.avoids]
            ])
          ])
        ]),
        e("div", Pd, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: b(c),
            onClick: f[4] || (f[4] = (U) => h.budget = "15")
          }, "预算15元", 8, Md),
          (n(), l(F, null, q(["清淡", "素食偏好"], (U) => e("button", {
            key: U,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: b(c),
            onClick: (ae) => h.preferences = U
          }, o(U), 9, Td)), 64)),
          e("span", null, "已选偏好：" + o(h.preferences || "未设置"), 1)
        ]),
        e("details", zd, [
          f[29] || (f[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", Rd, [
            f[20] || (f[20] = e("span", null, "这餐想怎么安排？", -1)),
            X(e("textarea", {
              "onUpdate:modelValue": f[5] || (f[5] = (U) => $t(i) ? i.value = U : null),
              rows: "2",
              maxlength: "500",
              disabled: b(c),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, Od), [
              [re, b(i)]
            ])
          ]),
          e("div", Fd, [
            e("label", null, [
              f[21] || (f[21] = N("口味与饮食偏好", -1)),
              X(e("input", {
                "onUpdate:modelValue": f[6] || (f[6] = (U) => h.preferences = U),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: b(c)
              }, null, 8, Bd), [
                [re, h.preferences]
              ])
            ]),
            e("label", null, [
              f[22] || (f[22] = N("运动情况（可选）", -1)),
              X(e("input", {
                "onUpdate:modelValue": f[7] || (f[7] = (U) => h.exercise = U),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: b(c)
              }, null, 8, Vd), [
                [re, h.exercise]
              ])
            ])
          ]),
          e("details", Ld, [
            f[27] || (f[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            f[28] || (f[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", qd, [
              X(e("input", {
                "onUpdate:modelValue": f[8] || (f[8] = (U) => M.value = U),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: b(c),
                onInput: f[9] || (f[9] = (U) => S.value = "")
              }, null, 40, Gd), [
                [re, M.value]
              ]),
              X(e("select", {
                "onUpdate:modelValue": f[10] || (f[10] = (U) => S.value = U),
                "aria-label": "选择具体食物",
                disabled: b(c) || !se.value.length
              }, [
                f[23] || (f[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (n(!0), l(F, null, q(se.value, (U) => (n(), l("option", {
                  key: U.key,
                  value: U.key
                }, o(U.name), 9, Hd))), 128))
              ], 8, Jd), [
                [we, S.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: b(c) || !S.value,
                onClick: V
              }, "加入备选", 8, Kd)
            ]),
            e("div", Wd, [
              (n(!0), l(F, null, q(h.availableFoods, (U, ae) => (n(), l("article", {
                key: U.foodId
              }, [
                e("strong", null, o(U.name), 1),
                e("label", null, [
                  f[24] || (f[24] = N("这份可食部（克）", -1)),
                  X(e("input", {
                    "onUpdate:modelValue": (oe) => U.grams = oe,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: b(c)
                  }, null, 8, Yd), [
                    [
                      re,
                      U.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  f[25] || (f[25] = N("这份已知价格（元）", -1)),
                  X(e("input", {
                    "onUpdate:modelValue": (oe) => U.price = oe,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: b(c)
                  }, null, 8, Xd), [
                    [re, U.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: b(c),
                  onClick: (oe) => h.availableFoods.splice(ae, 1)
                }, "移除", 8, Qd)
              ]))), 128))
            ]),
            h.availableFoods.length ? (n(), l("label", Zd, [
              X(e("input", {
                "onUpdate:modelValue": f[11] || (f[11] = (U) => h.onlyAvailable = U),
                type: "checkbox",
                disabled: b(c)
              }, null, 8, ec), [
                [it, h.onlyAvailable]
              ]),
              f[26] || (f[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : $("", !0)
          ])
        ]),
        e("label", tc, [
          X(e("input", {
            "onUpdate:modelValue": f[12] || (f[12] = (U) => A.value = U),
            type: "checkbox",
            disabled: b(c)
          }, null, 8, nc), [
            [it, A.value]
          ]),
          e("span", null, [
            N("使用所选日期的 " + o(fe.value.length) + " 项已记录食物", 1),
            f[30] || (f[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", sc, [
          X(e("input", {
            "onUpdate:modelValue": f[13] || (f[13] = (U) => j.value = U),
            type: "checkbox",
            disabled: b(c)
          }, null, 8, lc), [
            [it, j.value]
          ]),
          f[31] || (f[31] = e("span", null, [
            N("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        f[32] || (f[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给 DeepSeek。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        O.value ? (n(), l("p", oc, o(O.value), 1)) : $("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: b(c) || !b(i).trim()
        }, [
          b(c) ? (n(), l("span", ic)) : (n(), ce(z, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          N(o(b(c) ? "正在等待真实检索与计算…" : G.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, ac)
      ], 32),
      b(c) || b(p).length ? (n(), l("div", rc, [
        e("div", null, [
          e("strong", null, o(b(c) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          b(c) ? (n(), l("p", uc, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : $("", !0),
          e("ol", null, [
            (n(!0), l(F, null, q(b(p), (U, ae) => (n(), l("li", { key: ae }, [
              e("strong", null, o(U.label), 1),
              N(" · " + o(U.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : $("", !0),
      b(m) ? (n(), l("div", dc, [
        f[33] || (f[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, o(b(m)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: b(c),
          onClick: x
        }, "保留条件并重试", 8, cc)
      ])) : $("", !0),
      b(v)?.status === "needs_evidence" ? (n(), l("p", vc, o(b(v).message) + " 请修改备选食物或检索描述。", 1)) : $("", !0),
      G.value ? (n(), l("section", mc, [
        e("div", bc, [
          e("div", null, [
            e("p", pc, "待确认 · " + o(G.value.date) + " · " + o(B.find((U) => U[0] === G.value.meal)?.[1]), 1),
            e("h3", null, o(G.value.plan.title), 1)
          ]),
          f[34] || (f[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        e("p", null, o(G.value.plan.summary), 1),
        e("p", gc, "本次使用 " + o(G.value.contextSummary.itemCount) + " 项已记录食物；" + o(G.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        ie.value ? (n(), l("div", {
          key: 0,
          class: ve(["vb-campus-cost", { "is-caution": ie.value.status === "over_budget" }])
        }, [
          e("h4", null, o(ie.value.complete ? "按录入价格估算：约 ¥" + I(ie.value.total) : "价格待确认"), 1),
          ie.value.budget !== null ? (n(), l("p", fc, "本餐预算 ¥" + o(ie.value.budget) + " · " + o(ie.value.status === "within_budget" ? "按已录入价格估算在预算内" : ie.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : $("", !0),
          ie.value.complete ? $("", !0) : (n(), l("p", yc, "已知价格小计约 ¥" + o(I(ie.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, o(ie.value.basis) + "。" + o(ie.value.availability) + "。", 1)
        ], 2)) : $("", !0),
        e("div", hc, [
          (n(!0), l(F, null, q(G.value.plan.items, (U, ae) => (n(), l("article", {
            key: U.foodId,
            class: "vb-agent-item"
          }, [
            e("div", kc, [
              e("div", null, [
                E(Vt, {
                  food: b(ne)[U.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, o(b(ht)(b(ne)[U.foodId])), 1),
                e("small", null, o(b(Bt)(b(ne)[U.foodId])), 1),
                e("p", null, o(U.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (oe) => {
                  G.value.plan.items.splice(ae, 1), w.value = !1;
                }
              }, "移除", 8, wc)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (oe) => {
                R.value = ae, T.value = "";
              }
            }, "换一道", 8, $c),
            R.value === ae ? (n(), l("div", _c, [
              X(e("select", {
                "onUpdate:modelValue": f[14] || (f[14] = (oe) => T.value = oe),
                "aria-label": "替换食物"
              }, [
                f[35] || (f[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (n(!0), l(F, null, q(ye.value, (oe) => (n(), l("option", {
                  key: oe.key,
                  value: oe.key
                }, o(oe.name), 9, Ac))), 128))
              ], 512), [
                [we, T.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !T.value,
                onClick: (oe) => H(ae)
              }, "确认替换", 8, Cc),
              ye.value.length ? $("", !0) : (n(), l("p", Ic, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : $("", !0),
            e("label", Sc, [
              f[36] || (f[36] = N("可食部估算克数", -1)),
              e("input", {
                value: U.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (oe) => te(ae, oe.target.value)
              }, null, 40, Ec),
              f[37] || (f[37] = N("克", -1))
            ]),
            e("div", xc, [
              (n(), l(F, null, q([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (oe) => e("small", {
                key: oe.id
              }, o(oe.name) + " " + o(I(U.portion[oe.id])) + o(U.portion[oe.id] !== null ? " " + oe.unit : ""), 1)), 64))
            ]),
            e("details", Uc, [
              f[39] || (f[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + o(b(ne)[U.foodId]?.state), 1),
              e("p", null, [
                f[38] || (f[38] = N("来源：", -1)),
                b(ne)[U.foodId]?.source ? (n(), l("a", {
                  key: 0,
                  href: b(ne)[U.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, o(U.sourceName) + " · " + o(U.source), 9, jc)) : (n(), l("span", Dc, "暂无可核验成分数据"))
              ]),
              e("p", null, o(b(ne)[U.foodId]?.source?.description), 1),
              f[40] || (f[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              U.missing.length ? (n(), l("p", Nc, "缺失指标：" + o(U.missing.join("、")), 1)) : $("", !0)
            ])
          ]))), 128))
        ]),
        E(Mt, {
          entries: ge.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        f[45] || (f[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        G.value.plan.suggestions.length ? (n(), l("div", Pc, [
          f[41] || (f[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (n(!0), l(F, null, q(G.value.plan.suggestions, (U) => (n(), l("li", { key: U }, o(U), 1))), 128))
          ])
        ])) : $("", !0),
        G.value.plan.cautions.length ? (n(), l("div", Mc, [
          f[42] || (f[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (n(!0), l(F, null, q(G.value.plan.cautions, (U) => (n(), l("li", { key: U }, o(U), 1))), 128))
          ])
        ])) : $("", !0),
        e("details", Tc, [
          f[43] || (f[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (n(!0), l(F, null, q(G.value.trace, (U, ae) => (n(), l("li", { key: ae }, [
              e("strong", null, o(U.label), 1),
              N(" · " + o(U.inputSummary) + " · " + o(U.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, o(G.value.model) + " · " + o(G.value.dataVersion) + " · " + o(new Date(G.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        E(pn),
        e("div", zc, [
          f[44] || (f[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: w.value || K.value,
            onClick: ee
          }, o(w.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, Rc)
        ])
      ])) : $("", !0)
    ]));
  }
}, Fc = { class: "vb-page-title" }, Bc = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, Vc = { class: "vb-glass vb-record-prompt" }, Lc = /* @__PURE__ */ qe({
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
    return (a, s) => (n(), l(F, null, [
      e("div", Fc, [
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
      t.nutrition ? $("", !0) : (n(), l("section", Bc, [...s[5] || (s[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      E(Oc, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: s[1] || (s[1] = (d) => a.$emit("add-plan", d))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", Vc, [
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
}), qc = { class: "vb-page-title" }, Gc = { class: "vb-glass vb-profile-details" }, Jc = { class: "vb-section-heading" }, Hc = { class: "vb-pill" }, Kc = { key: 0 }, Wc = { key: 1 }, Yc = { class: "vb-profile-settings" }, Xc = { class: "vb-glass" }, Qc = { class: "vb-section-heading" }, Zc = { class: "vb-field" }, ev = ["value"], tv = { class: "vb-glass" }, nv = { class: "vb-section-heading" }, sv = ["checked", "onChange"], lv = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String },
  emits: ["edit", "update:flags", "update:preferences"],
  setup(t, { emit: a }) {
    const s = t, d = J(() => zt.find((v) => v.key === s.profile.activity)), i = a, r = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function u(v, m, c) {
      i("update:flags", m ? [...c, v] : c.filter((p) => p !== v));
    }
    return (v, m) => (n(), l(F, null, [
      e("div", qc, [
        m[3] || (m[3] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "随身体与生活变化，随时更新"),
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: m[0] || (m[0] = (c) => v.$emit("edit"))
        }, [
          E(z, {
            name: "edit",
            size: 17
          }),
          m[2] || (m[2] = N("修改基础档案", -1))
        ])
      ]),
      e("section", Gc, [
        e("div", Jc, [
          m[4] || (m[4] = e("h2", null, "基础信息", -1)),
          e("span", Hc, o(b(_e) ? b(ut) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
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
          t.profile.age === 0 ? (n(), l("div", Kc, [
            m[7] || (m[7] = e("dt", null, "月龄", -1)),
            e("dd", null, o(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : $("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (n(), l("div", Wc, [
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
      e("div", Yc, [
        e("section", Xc, [
          e("div", Qc, [
            m[13] || (m[13] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            E(z, { name: "bowl" })
          ]),
          e("label", Zc, [
            m[14] || (m[14] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: m[1] || (m[1] = (c) => v.$emit("update:preferences", c.target.value))
            }, null, 40, ev)
          ]),
          m[15] || (m[15] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", tv, [
          e("div", nv, [
            m[16] || (m[16] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            E(z, { name: "shield" })
          ]),
          (n(), l(F, null, q(r, (c) => e("label", {
            key: c,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(c),
              onChange: (p) => u(c, p.target.checked, t.flags)
            }, null, 40, sv),
            e("span", null, o(c), 1)
          ])), 64)),
          m[17] || (m[17] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1))
        ])
      ])
    ], 64));
  }
}, ov = {
  key: 0,
  class: "vb-page-title"
}, av = { class: "vb-local-chip" }, iv = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, rv = { class: "vb-safety-grid" }, uv = { class: "vb-icon-badge" }, dv = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const a = _e.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", s = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + a + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (d, i) => (n(), l(F, null, [
      t.embedded ? $("", !0) : (n(), l("div", ov, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", av, [
          E(z, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = N("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (n(), l("section", iv, [
        E(z, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + o(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : $("", !0),
      e("div", rv, [
        (n(), l(F, null, q(s, ([r, u, v]) => e("article", {
          key: u,
          class: "vb-glass"
        }, [
          e("span", uv, [
            E(z, {
              name: r,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, o(u), 1),
          e("p", null, o(v), 1)
        ])), 64))
      ]),
      E(pn)
    ], 64));
  }
}, cv = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, vv = { class: "vb-glass vb-submission-hero" }, mv = { class: "vb-submission-hero-copy" }, bv = { class: "vb-icon-badge" }, pv = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, gv = { class: "vb-submission-version" }, fv = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, yv = { class: "vb-submission-step-top" }, hv = { class: "vb-icon-badge" }, kv = ["onClick"], wv = { class: "vb-submission-columns" }, $v = { class: "vb-glass vb-submission-panel" }, _v = { class: "vb-submission-boundary" }, Av = { class: "vb-icon-badge" }, Cv = { class: "vb-icon-badge" }, Iv = { class: "vb-icon-badge" }, Sv = { class: "vb-glass vb-submission-panel" }, Ev = { class: "vb-inline-note" }, xv = { class: "vb-glass vb-submission-evidence" }, Uv = { class: "vb-submission-evidence-actions" }, jv = /* @__PURE__ */ qe({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const a = {
      foodCount: Le.length,
      sourcedCount: Le.filter((d) => !!d.source?.id).length,
      categories: new Set(Le.map((d) => d.category).filter(Boolean)).size,
      sourceName: "USDA Standard Reference 28（2016-05）"
    }, s = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (d, i) => (n(), l(F, null, [
      t.embedded ? $("", !0) : (n(), l("div", cv, [
        i[4] || (i[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "在线评审入口 · 维衡 AI"),
          e("h1", null, "把营养建议放回真实的一餐"),
          e("p", null, "从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: i[0] || (i[0] = (r) => d.$emit("navigate", "mealplan"))
        }, [
          E(z, {
            name: "sparkles",
            size: 17
          }),
          i[3] || (i[3] = N("体验餐食规划 ", -1))
        ])
      ])),
      e("section", vv, [
        e("div", mv, [
          e("span", bv, [
            E(z, {
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
        e("div", pv, [
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
        e("small", gv, "数据版本：" + o(b(Gn)) + " · " + o(a.sourceName), 1)
      ]),
      i[19] || (i[19] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("p", { class: "vb-eyebrow" }, "四步完成一条闭环"),
          e("h2", null, "从检索到回顾")
        ]),
        e("span", null, "每一步都可返回核对")
      ], -1)),
      e("section", fv, [
        (n(), l(F, null, q(s, (r) => e("article", {
          key: r.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", yv, [
            e("span", null, o(r.number), 1),
            e("span", hv, [
              E(z, {
                name: r.icon
              }, null, 8, ["name"])
            ])
          ]),
          e("h3", null, o(r.title), 1),
          e("p", null, o(r.copy), 1),
          e("button", {
            class: "vb-text-button",
            onClick: (u) => d.$emit("navigate", r.page)
          }, [
            N(o(r.action), 1),
            E(z, {
              name: "arrow",
              size: 15
            })
          ], 8, kv)
        ])), 64))
      ]),
      e("div", wv, [
        e("section", $v, [
          i[12] || (i[12] = e("p", { class: "vb-eyebrow" }, "职责边界", -1)),
          i[13] || (i[13] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", _v, [
            e("article", null, [
              e("span", Av, [
                E(z, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Cv, [
                E(z, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Iv, [
                E(z, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", Sv, [
          i[15] || (i[15] = rn('<p class="vb-eyebrow">实现与隐私</p><h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>DeepSeek</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 3)),
          e("p", Ev, [
            E(z, {
              name: "info",
              size: 16
            }),
            i[14] || (i[14] = N("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", xv, [
        i[18] || (i[18] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "可复核材料"),
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口 mock 测试与真实模型冒烟分开记录，真实调用未执行时不会记作通过。")
        ], -1)),
        e("div", Uv, [
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[1] || (i[1] = (r) => d.$emit("navigate", "food"))
          }, [
            E(z, {
              name: "apple",
              size: 16
            }),
            i[16] || (i[16] = N("核对食物来源", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[2] || (i[2] = (r) => d.$emit("navigate", "assessment"))
          }, [
            E(z, {
              name: "report",
              size: 16
            }),
            i[17] || (i[17] = N("查看报告样例", -1))
          ])
        ])
      ])
    ], 64));
  }
}), Dv = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], Nv = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], Pv = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], Mv = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, Tv = { class: "vb-reference-list" }, zv = ["href"], Rv = {
  key: 1,
  class: "vb-data-note"
}, Ov = { class: "vb-reference-terms" }, Fv = {
  __name: "ReferencePanel",
  setup(t) {
    return (a, s) => (n(), l("section", Mv, [
      s[8] || (s[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      s[9] || (s[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      s[10] || (s[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", Tv, [
        (n(!0), l(F, null, q(b(Dv), (d) => (n(), l("details", {
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
          }, "核对公开来源 ↗", 8, zv)) : (n(), l("p", Rv, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", Ov, [
        s[4] || (s[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (n(!0), l(F, null, q(b(Pv), ([d, i, r]) => (n(), l("p", { key: d }, [
          e("strong", null, o(d) + " · " + o(i), 1),
          N("：" + o(r), 1)
        ]))), 128)),
        s[5] || (s[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        s[6] || (s[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (n(!0), l(F, null, q(b(Nv), (d) => (n(), l("li", { key: d }, o(d), 1))), 128))
        ]),
        s[7] || (s[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, Bv = { class: "vb-page-title" }, Vv = { class: "vb-local-chip" }, Lv = { "aria-labelledby": "about-project-heading" }, qv = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, Gv = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, Jv = {
  key: 0,
  role: "alert"
}, Hv = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Kv = { class: "vb-reset-actions" }, Wv = ["disabled"], Yv = ["disabled"], Xv = /* @__PURE__ */ qe({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const a = P(!1), s = P(!1), d = P("");
    function i() {
      try {
        const u = JSON.parse(ke.getItem("weiheng.local.v2") || "{}"), v = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: u.profile || null, records: (Array.isArray(u.records) ? u.records : []).map((p) => ({ date: p.date, entries: p.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, m = URL.createObjectURL(new Blob([JSON.stringify(v, null, 2)], { type: "application/json" })), c = document.createElement("a");
        c.href = m, c.download = "维衡-当前档案与食物记录.json", c.click(), setTimeout(() => URL.revokeObjectURL(m), 1e3);
      } catch {
        d.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function r() {
      if (!s.value) {
        s.value = !0, d.value = "";
        try {
          await ns(), window.location.reload();
        } catch {
          d.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", s.value = !1;
        }
      }
    }
    return (u, v) => (n(), l(F, null, [
      e("div", Bv, [
        v[5] || (v[5] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "项目介绍 · 使用边界 · 隐私说明"),
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", Vv, [
          v[4] || (v[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          N(o(b(_e) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", Lv, [
        v[6] || (v[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "作品说明"),
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ]),
          e("span", null, "功能流程与实现依据")
        ], -1)),
        E(jv, {
          embedded: "",
          onNavigate: v[0] || (v[0] = (m) => u.$emit("navigate", m))
        })
      ]),
      E(Fv),
      e("section", qv, [
        v[7] || (v[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "安全中心"),
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ]),
          e("span", null, "把营养信息作为参考")
        ], -1)),
        E(dv, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", Gv, [
        e("div", null, [
          v[8] || (v[8] = e("p", { class: "vb-eyebrow" }, "当前使用空间的数据管理", -1)),
          v[9] || (v[9] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, o(b(_e) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          v[10] || (v[10] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          d.value ? (n(), l("p", Jv, o(d.value), 1)) : $("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: v[1] || (v[1] = (m) => a.value = !0)
        }, "清空数据并重置")
      ]),
      a.value ? (n(), ce(Ze, {
        key: 0,
        title: b(_e) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: v[3] || (v[3] = (m) => !s.value && (a.value = !1))
      }, {
        default: Qe(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + o(b(_e) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          v[11] || (v[11] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          d.value ? (n(), l("p", Hv, o(d.value), 1)) : $("", !0),
          e("div", Kv, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: s.value,
              onClick: v[2] || (v[2] = (m) => a.value = !1)
            }, "取消", 8, Wv),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: s.value,
              onClick: r
            }, o(s.value ? "正在清理…" : "确认清空并重置"), 9, Yv)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : $("", !0)
    ], 64));
  }
}), Qv = ["data-theme"], Zv = ["inert"], em = { class: "vb-main" }, tm = { class: "vb-topbar" }, nm = { class: "vb-breadcrumb" }, sm = { class: "vb-topbar-actions" }, lm = { class: "vb-local-chip" }, om = ["aria-label"], am = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, im = { class: "vb-footer" }, rm = {
  key: 4,
  class: "vb-toast",
  role: "status"
}, vm = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: a, theme: s, nutrition: d, records: i, storageError: r, updateProfile: u, saveRecord: v, addToDraft: m, addPlanToDraft: c, toggleHabit: p } = Rt(), { toggleTheme: y } = Xn(s), { reports: k, reportStorageError: h, loadReports: R, latestReport: T, isStale: w, generateReport: A } = Ft();
    R();
    const j = t, O = J(() => a.flags.includes("孕期或哺乳期") ? { ...a.profile, physiologicalStage: "special" } : a.profile || {}), M = P(j.initialPage), S = P(j.initialEditor), B = P(!1), se = P(null), fe = P(null), G = P(null), ge = P(he()), ie = P(!1), K = P(""), V = P(""), x = P(""), ee = J(() => k.value.find((Q) => Q.id === V.value) || T(K.value)), te = J(() => a.records.find((Q) => Q.date === K.value)), ye = { overview: "概览", dietAssistant: "维衡AI助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, H = J(() => _e.value ? ut.value === "error" ? "账号同步暂不可用 · 本机副本保留" : ut.value === "syncing" || ut.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let I, g = 0;
    function f(Q, L = null) {
      clearTimeout(I), se.value = { message: Q, undo: L }, I = setTimeout(() => se.value = null, 7e3);
    }
    function U(Q) {
      M.value = Q, window.scrollTo({ top: 0, behavior: "auto" }), Ue(() => fe.value?.focus({ preventScroll: !0 }));
    }
    function ae() {
      S.value = !1, B.value = !0;
    }
    function oe() {
      B.value = !1;
    }
    function et(Q) {
      const L = u(Q);
      if (L) {
        f(L);
        return;
      }
      S.value = !1, U("overview"), f(_e.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function Ce(Q, L = !1) {
      const le = ++g;
      x.value = "", K.value = Q.date, V.value = "";
      try {
        const Ae = A(Q, O.value, { force: L });
        await Ue();
        const nt = await Ae;
        le === g && K.value === Q.date && (V.value = nt?.id || "");
      } catch (Ae) {
        le === g && (x.value = Ae.message || "分析暂时不可用，请重试。");
      }
    }
    function Ie(Q) {
      if (!ie.value) {
        ie.value = !0;
        try {
          const L = v(Q);
          if (!L.ok) {
            f(L.error);
            return;
          }
          f("饮食记录已保存，正在分析"), Ce(L.record);
        } finally {
          ie.value = !1;
        }
      }
    }
    function tt(Q, L) {
      L ? k.value.find((Ae) => Ae.id === L) : T(Q), K.value = Q, V.value = L || "", x.value = "", a.records.find((Ae) => Ae.date === Q);
    }
    function Ge(Q = K.value) {
      const L = a.records.find((le) => le.date === Q);
      L && Ce(L, !0);
    }
    function $e(Q) {
      if (!Oe(Q.date) || Q.date > he() || Number(Q.grams) < 0.1 || Number(Q.grams) > 5e3) {
        f("请核对日期与食用克数。");
        return;
      }
      const L = m(Q);
      ge.value = Q.date, G.value = null, U("diary"), f(L ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    function kt(Q) {
      const L = c(Q);
      if (Q.onResult?.(L), !L.ok) {
        f(L.error);
        return;
      }
      ge.value = Q.date, U("diary"), f(L.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function wt(Q) {
      const L = a.records.find((le) => le.date === Q);
      L && (a.records = a.records.filter((le) => le.date !== Q), f("这条饮食记录已删除，报告快照仍保留。", () => {
        v(L), se.value = null;
      }));
    }
    return We(() => clearTimeout(I)), (Q, L) => (n(), l("div", {
      class: ve(["vb-app", { "is-diary": M.value === "diary", "is-chat": M.value === "dietAssistant" }]),
      "data-theme": b(s)
    }, [
      e("div", {
        inert: S.value || G.value || K.value || void 0
      }, [
        E(Qn, {
          active: M.value,
          onNavigate: U
        }, null, 8, ["active"]),
        e("div", em, [
          e("header", tm, [
            e("span", nm, [
              L[15] || (L[15] = e("span", null, "营养工作台", -1)),
              L[16] || (L[16] = e("i", null, "/", -1)),
              N(o(ye[M.value]), 1)
            ]),
            e("div", sm, [
              e("span", lm, [
                L[17] || (L[17] = e("i", { class: "vb-status-dot" }, null, -1)),
                N(o(H.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                onClick: ae
              }, o(b(_e) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": b(s) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: L[0] || (L[0] = (...le) => b(y) && b(y)(...le))
              }, [
                E(z, {
                  name: b(s) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, om),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: L[1] || (L[1] = (le) => U("profile"))
              }, [
                E(z, {
                  name: "person",
                  size: 18
                })
              ])
            ])
          ]),
          e("main", {
            ref_key: "content",
            ref: fe,
            class: "vb-content",
            tabindex: "-1"
          }, [
            b(r) || b(h) ? (n(), l("p", am, o(b(r) || b(h)), 1)) : $("", !0),
            (n(), l(F, { key: 1 }, [
              X(E(qa, {
                records: b(a).records,
                targets: b(d),
                profile: O.value
              }, null, 8, ["records", "targets", "profile"]), [
                [Tn, M.value === "dietAssistant"]
              ]),
              M.value === "overview" ? (n(), ce(Zn, {
                key: 0,
                profile: O.value,
                nutrition: b(d),
                "record-count": b(i).length,
                records: b(i),
                onEdit: L[2] || (L[2] = (le) => S.value = !0),
                onNavigate: U
              }, null, 8, ["profile", "nutrition", "record-count", "records"])) : $("", !0),
              M.value === "assessment" ? (n(), ce(Ni, {
                key: 1,
                records: b(i),
                habits: b(a).habits,
                flags: b(a).flags,
                reports: b(k),
                profile: O.value,
                onNavigate: U,
                onToggleHabit: b(p),
                onOpenReport: tt,
                onRetryReport: Ge
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : M.value === "diary" ? (n(), ce(vu, {
                key: 2,
                records: b(i),
                reports: b(k),
                profile: O.value,
                nutrition: b(d),
                "initial-date": ge.value,
                saving: ie.value,
                onSave: Ie,
                onRemove: wt,
                onAnalysis: tt,
                onBrowse: L[3] || (L[3] = (le) => U("food")),
                onDetail: L[4] || (L[4] = (le) => G.value = b(ne)[le])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving"])) : M.value === "food" ? (n(), ce(hd, {
                key: 3,
                onDetail: L[5] || (L[5] = (le) => G.value = b(ne)[le])
              })) : M.value === "mealplan" ? (n(), ce(Lc, {
                key: 4,
                nutrition: b(d),
                preferences: b(a).preferences,
                flags: b(a).flags,
                profile: O.value,
                records: b(a).records,
                onNavigate: U,
                onAddPlan: kt
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : M.value === "profile" ? (n(), ce(lv, {
                key: 5,
                profile: O.value,
                nutrition: b(d),
                flags: b(a).flags,
                "onUpdate:flags": L[6] || (L[6] = (le) => b(a).flags = le),
                preferences: b(a).preferences,
                "onUpdate:preferences": L[7] || (L[7] = (le) => b(a).preferences = le),
                onEdit: L[8] || (L[8] = (le) => S.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences"])) : M.value === "about" ? (n(), ce(Xv, {
                key: 6,
                flags: b(a).flags,
                onNavigate: U
              }, null, 8, ["flags"])) : $("", !0)
            ], 64)),
            e("footer", im, [
              E(z, {
                name: "leaf",
                size: 14
              }),
              L[18] || (L[18] = N("维衡 AI · 把健康，放进每一餐", -1)),
              L[19] || (L[19] = e("span", null, "营养信息仅供一般参考", -1))
            ])
          ], 512)
        ])
      ], 8, Zv),
      S.value ? (n(), ce(Ks, {
        key: 0,
        profile: b(a).profile,
        onComplete: et,
        onClose: L[9] || (L[9] = (le) => S.value = !1),
        onLogin: ae
      }, null, 8, ["profile"])) : $("", !0),
      B.value ? (n(), ce(es, {
        key: 1,
        onClose: oe
      })) : $("", !0),
      G.value ? (n(), ce(Vl, {
        key: 2,
        "food-id": G.value.key,
        onClose: L[10] || (L[10] = (le) => G.value = null),
        onAdd: $e
      }, null, 8, ["food-id"])) : $("", !0),
      K.value ? (n(), ce(_o, {
        key: 3,
        report: ee.value,
        record: te.value,
        stale: ee.value ? b(w)(ee.value, te.value, O.value) : !1,
        error: x.value,
        onClose: L[11] || (L[11] = (le) => {
          K.value = "", V.value = "";
        }),
        onRetry: L[12] || (L[12] = (le) => Ge())
      }, null, 8, ["report", "record", "stale", "error"])) : $("", !0),
      se.value ? (n(), l("div", rm, [
        E(z, {
          name: "check",
          size: 17
        }),
        e("span", null, o(se.value.message), 1),
        se.value.undo ? (n(), l("button", {
          key: 0,
          onClick: L[13] || (L[13] = (...le) => se.value.undo && se.value.undo(...le))
        }, "撤销")) : $("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: L[14] || (L[14] = (le) => se.value = null)
        }, [
          E(z, {
            name: "close",
            size: 15
          })
        ])
      ])) : $("", !0)
    ], 10, Qv));
  }
};
export {
  vm as default
};
