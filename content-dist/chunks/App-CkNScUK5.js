import { r as T, a as H, b as et, w as re, o as s, d as o, e, F as B, f as J, n as yn, g as me, h as wt, i as U, j as I, k as Pe, t as a, l as ve, m as te, v as ie, p as N, u as b, q as Ce, s as xe, x as Ve, y as Wn, z as ot, A as He, B as vt, C as Yn, D as hn, E as St, G as Xn } from "./vue-runtime-wiGxZMXT.js";
import { v as Fe, t as ke, F as le, c as $t, r as tt, n as Qn, m as Zn, a as Rt, e as qe, b as kn, d as gt, M as Ee, f as Vt, g as yt, h as wn, s as $n, i as mt, j as nn, N as es, k as De, _ as qt, l as ts, C as xt, G as _n, o as zt, p as ns, q as Lt, u as sn, P as Et, R as ss, w as Ut, x as os, y as on, A as Je, z as dt, B as ln, D as ls } from "./IntakeAnalysis-6Q243Dsz.js";
import { s as nt, a as _e, o as as, b as we, t as Cn, c as is, d as $e, e as rs, f as us, g as ds, h as pt } from "./main-DU1dJnTu.js";
import { v as st, A as Gt, c as An, _ as O, p as cs, a as In, u as vs, b as ms, d as ps, e as bs } from "./useThemeTransition-DCCrVJcv.js";
function fs(t, l) {
  if (!l || !Fe(l.date) || l.date > ke() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(l.meal) || !Array.isArray(l.items) || !l.items.length || l.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const n = String(l.confirmationId || "").slice(0, 100);
  if (!n) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(n)) return { draft: t, duplicate: !0 };
  const d = l.items.map((i) => {
    const u = le[i.foodId], r = Number(i.grams);
    if (!u || !Number.isFinite(r) || r < 0.1 || r > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: n + ":" + u.key, foodId: u.key, name: u.name, grams: r, meal: l.meal, group: u.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: $t(u) };
  });
  if (new Set(d.map((i) => i.foodId)).size !== d.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...d], appliedBatches: [...t.appliedBatches || [], n] }, duplicate: !1 };
}
const Ze = nt("weiheng.reset-signal.v1"), Sn = (t) => as(t);
let Be = !1;
const Le = () => Be;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== Ze || !t.newValue))
    try {
      const { phase: l } = JSON.parse(t.newValue);
      l === "begin" && (Be = !0), l === "abort" && (Be = !1), l === "done" && (Be = !0, window.location.reload());
    } catch {
    }
});
function an(t, l) {
  return new Promise((n, d) => {
    const i = t.open(l);
    i.onerror = i.onblocked = () => d(new Error("本地文件存储暂时无法清理，请关闭其他旧页面后重试。")), i.onsuccess = () => {
      const u = i.result, r = Array.from(u.objectStoreNames);
      if (!r.length) {
        u.close(), n();
        return;
      }
      try {
        const m = u.transaction(r, "readwrite");
        for (const c of r) m.objectStore(c).clear();
        m.oncomplete = () => {
          u.close(), n();
        }, m.onerror = m.onabort = () => {
          u.close(), d(new Error("本地文件清理未完成，请重试。"));
        };
      } catch (m) {
        u.close(), d(m);
      }
    };
  });
}
function rn(t, l = !1) {
  const n = Array.from({ length: t.length }, (d, i) => t.key(i));
  for (const d of n) d && Sn(d) && !(l && d === Ze) && t.removeItem(d);
}
async function gs({
  local: t = globalThis.localStorage,
  session: l = globalThis.sessionStorage,
  databases: n = globalThis.indexedDB,
  caches: d = globalThis.caches
} = {}) {
  if (Be) throw new Error("正在清理本地数据，请稍候。");
  Be = !0;
  const i = (u) => t.setItem(Ze, JSON.stringify({ phase: u, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), _e.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!n) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      an(n, nt("weiheng.media.v1")),
      an(n, nt("weiheng.chat-attachments.v1"))
    ]), d) for (const u of await d.keys()) Sn(u) && await d.delete(u);
    l && rn(l), rn(t, !0), i("done"), t.removeItem(Ze);
  } catch (u) {
    try {
      i("abort"), t.removeItem(Ze);
    } catch {
    }
    throw Be = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), u;
  }
}
const ht = "weiheng.local.v2", xn = "weiheng.theme.v1", ze = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function un(t) {
  if (!t) return null;
  const l = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", n = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), d = Gt.some((u) => u.key === t.activity) ? t.activity : n[String(t.activity)] || "";
  if (st({ ...t, sex: l, activity: d })) return null;
  const i = { ...t, sex: l, age: ze(t.age), height: ze(t.height), weight: ze(t.weight), activity: d };
  return st(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    l
  ), activity: String(d) };
}
function En() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const l = JSON.parse(we.getItem(ht) || "null");
    if (l && typeof l == "object") {
      for (const i of [...Array.isArray(l.records) ? l.records : [], ...Object.values(l.drafts || {})]) for (const u of Array.isArray(i?.entries) ? i.entries : []) u.foodId === "cabbage" && u.name === "白菜" && (u.referenceConfirmed = !1);
      return { ...t, ...l, drafts: l.drafts && typeof l.drafts == "object" ? l.drafts : {}, profile: un(l.profile), records: Array.isArray(l.records) ? l.records : [] };
    }
    const n = JSON.parse(we.getItem("vitabalance.v1") || we.getItem("vitabalance.guest.v1") || "null"), d = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return n ? { ...t, profile: un(n.profile), records: Array.isArray(n.records) ? n.records : [], plans: Array.isArray(n.plans) ? n.plans : [], flags: d.filter(([i]) => n.profile?.[i]).map(([, i]) => i), preferences: [n.profile?.avoid, n.profile?.allergies ? "需要核对的过敏或不耐受项：" + n.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const de = et(En()), Oe = T("");
let Ot = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  Ot = !0;
  try {
    Object.assign(de, En());
  } finally {
    Ot = !1;
  }
});
const ys = (() => {
  try {
    return we.getItem(xn);
  } catch {
    return null;
  }
})(), Un = T(ys === "dark" ? "dark" : "light"), bt = H(() => An(de.flags.includes("孕期或哺乳期") ? null : de.profile));
re(de, () => {
  if (!(Le() || Ot))
    try {
      we.setItem(ht, JSON.stringify({ ...de, calculated: bt.value })), Oe.value = "";
    } catch {
      Oe.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
re(Un, (t) => {
  if (!Le())
    try {
      we.setItem(xn, t);
    } catch {
      Oe.value = "主题偏好暂时无法保存。";
    }
});
function Jt() {
  const t = H(() => [...de.records].sort((c, v) => v.date.localeCompare(c.date)));
  function l(c) {
    const v = st(c);
    return v || (de.profile = { ...de.profile, sex: c.sex || "", ageMonths: ze(c.ageMonths), physiologicalStage: c.physiologicalStage || "general", age: ze(c.age), height: ze(c.height), weight: ze(c.weight), activity: c.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function n(c) {
    if (Le()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Fe(c.date)) return { ok: !1, error: "请选择有效日期。" };
    const v = de.records.find((y) => y.date === c.date), g = Array.isArray(c.entries) ? Zn(c, v) : (
      /** @type {DailyRecord} */
      { ...c, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (v && Rt(v) === Rt(g)) return { ok: !0, record: v, unchanged: !0 };
    const $ = [...de.records.filter((y) => y.date !== g.date), g];
    try {
      we.setItem(ht, JSON.stringify({ ...de, records: $, calculated: bt.value }));
    } catch {
      return Oe.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: Oe.value };
    }
    return de.records = $, { ok: !0, record: g };
  }
  function d(c, v) {
    const g = i(c);
    g && (g.savedEntries = JSON.parse(JSON.stringify(Array.isArray(v?.entries) ? v.entries : [])), g.entries = [], g.recognition = null, g.appliedBatches = []);
  }
  function i(c) {
    if (!Fe(c)) return null;
    if (!de.drafts[c]) {
      const v = de.records.find((g) => g.date === c);
      de.drafts[c] = { date: c, entries: tt(v), notes: v?.notes || "", photoId: v?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return de.drafts[c];
  }
  function u(c) {
    const v = i(c.date);
    if (!v) return !1;
    const g = le[c.foodId || ""];
    return v.entries.push({ id: crypto.randomUUID(), foodId: c.foodId || null, name: g?.name || c.name || "", grams: Number(c.grams), meal: c.meal || "unspecified", group: c.group, source: c.source || "catalogue", estimated: !!c.estimated, referenceConfirmed: !0, nutritionSnapshot: Qn(c.nutritionSnapshot, g?.key) || $t(g) }), !Oe.value;
  }
  function r(c, v) {
    const g = new Set(de.habits[c] || []);
    g.has(v) ? g.delete(v) : g.add(v), de.habits[c] = [...g];
  }
  function m(c) {
    if (Le()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const v = de.drafts[c.date] || { date: c.date, entries: tt(de.records.find((y) => y.date === c.date)), appliedBatches: [] }, g = fs(v, c);
      if (g.duplicate) return { ok: !0, duplicate: !0 };
      const $ = { ...de.drafts, [c.date]: g.draft };
      return we.setItem(ht, JSON.stringify({ ...de, drafts: $, calculated: bt.value })), de.drafts = $, { ok: !0, duplicate: !1 };
    } catch (v) {
      return { ok: !1, error: v.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: de, theme: Un, nutrition: bt, records: t, storageError: Oe, updateProfile: l, saveRecord: n, clearDraftAfterSave: d, ensureDraft: i, addToDraft: u, addPlanToDraft: m, toggleHabit: r };
}
let jt;
function hs() {
  return jt || (jt = new Promise((t, l) => {
    if (!globalThis.indexedDB) {
      l(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const n = indexedDB.open(nt("weiheng.media.v1"), 1);
    n.onupgradeneeded = () => {
      const d = n.result;
      for (const i of ["photos", "reports"]) d.objectStoreNames.contains(i) || d.createObjectStore(i, { keyPath: "id" });
    }, n.onsuccess = () => t(n.result), n.onerror = () => l(new Error("无法打开本地存储，请检查浏览器隐私设置。")), n.onblocked = () => l(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), jt;
}
async function _t(t, l, n) {
  const d = await hs();
  if (l === "readwrite" && Le()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, u) => {
    const r = d.transaction(t, l);
    let m;
    const c = n(r.objectStore(t));
    c.onsuccess = () => {
      m = c.result;
    }, r.oncomplete = () => i(m), r.onabort = r.onerror = () => u(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const Ft = (t, l) => _t(t, "readwrite", (n) => n.put(JSON.parse(JSON.stringify(l)))), ks = (t, l) => _t(t, "readonly", (n) => n.get(l)), ws = (t) => _t(t, "readonly", (l) => l.getAll()), $s = (t, l) => _t(t, "readwrite", (n) => n.delete(l));
async function Ct(t, l) {
  let n;
  try {
    n = await fetch("/api/ai/" + t, { method: l === void 0 ? "GET" : "POST", headers: l === void 0 ? {} : { "Content-Type": "application/json" }, body: l === void 0 ? void 0 : JSON.stringify(l), signal: Cn(9e4) });
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
async function jn(t, l, n, d) {
  const i = Cn(9e4), u = d ? is([d, i]) : i;
  let r;
  try {
    r = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    l, stream: !0 }), signal: u });
  } catch (p) {
    throw new Error(p?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  if (!r.ok) {
    let p;
    try {
      p = await r.json();
    } catch {
      throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
    }
    const h = new Error(p.error || "AI 服务暂时不可用。");
    throw h.code = p.code, h;
  }
  if (!r.body) throw new Error("浏览器没有提供流式读取能力，请更新浏览器后重试。");
  const m = r.body.getReader(), c = new TextDecoder();
  let v = "", g = !1, $ = null;
  const y = (p) => {
    const h = p.split(/\r?\n/).filter((_) => _.startsWith("data:")).map((_) => _.slice(5).trimStart()).join(`
`);
    if (!h) return;
    let w;
    try {
      w = JSON.parse(h);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (w?.type === "error") {
      const _ = new Error(w.message || "AI 暂时无法回复，请重试。");
      throw _.code = w.code, _;
    }
    if (w?.type === "progress" && w.step) {
      n(w);
      return;
    }
    if (w?.type === "delta" && typeof w.text == "string") {
      n(w);
      return;
    }
    w?.type === "done" && typeof w.model == "string" && ($ = w, g = !0, n(w));
  };
  try {
    for (; !g; ) {
      const { value: p, done: h } = await m.read();
      if (h) break;
      v += c.decode(p, { stream: !0 });
      let w;
      for (; (w = v.search(/\r?\n\r?\n/)) >= 0; ) {
        const _ = v.slice(w).match(/^\r?\n\r?\n/)[0];
        if (y(v.slice(0, w)), v = v.slice(w + _.length), g) break;
      }
    }
    if (v += c.decode(), v.trim() && !g && y(v), !g || !$) throw new Error("AI 流式连接提前结束，请重试。");
    return $;
  } finally {
    m.releaseLock();
  }
}
async function _s(t, l) {
  const n = await jn("meal-plan", t, (d) => {
    d.type === "progress" && l(d.step);
  });
  if (!n.result || !["ready", "needs_evidence"].includes(n.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return n.result;
}
const Ne = T([]), kt = T(""), Dt = /* @__PURE__ */ new Map();
let Pt;
function Ht(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function Cs(t) {
  return t.filter((l) => {
    const n = l.referenceConfirmed === !1 ? void 0 : le[l.foodId || ""];
    return Ee.some((d) => {
      const i = Vt(l, n, d.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function dn(t) {
  Ne.value = [t, ...Ne.value.filter((l) => l.id !== t.id)].sort((l, n) => n.requestedAt.localeCompare(l.requestedAt));
}
async function ft(t) {
  try {
    await Ft("reports", t), kt.value = "", dn(t);
  } catch (l) {
    throw kt.value = Ht(l), dn({ ...t, persistenceFailed: !0 }), l;
  }
}
function Dn() {
  return Pt || (Pt = (async () => {
    try {
      Ne.value = (await ws("reports")).sort((t, l) => l.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Ne.value])
        t.status === "pending" && await ft({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      kt.value = Ht(t);
    }
  })()), Pt;
}
function As(t) {
  return Ne.value.find((l) => l.date === t);
}
function Is(t, l, n) {
  return !l || t.dataVersion !== kn(l, n);
}
async function Ss(t, l, { force: n = !1 } = {}) {
  const d = $e();
  if (await qe(tt(t).filter((y) => y.foodId && !y.nutritionSnapshot).map((y) => String(y.foodId))), $e() !== d || (await Dn(), $e() !== d)) return;
  const i = kn(t, l), u = `${d}:${t.date}:${i}`, r = Dt.get(u);
  if (r) return r;
  const m = Ne.value.find(
    (y) => y.date === t.date && y.dataVersion === i && y.status === "complete" && !y.persistenceFailed
  );
  if (m && !n) return m;
  const c = {
    sex: l?.sex,
    age: l?.age,
    height: l?.height,
    weight: l?.weight,
    activity: l?.activity,
    ageMonths: l?.ageMonths,
    physiologicalStage: l?.physiologicalStage
  }, v = tt(t), g = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: Rt(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: v,
      intake: gt(v),
      profile: c
    },
    result: null,
    error: ""
  }, $ = (async () => {
    await ft(g);
    try {
      const y = await Ct("analyze-day", {
        date: t.date,
        entries: v,
        profile: c,
        requestId: g.id
      });
      if ($e() !== d) return;
      const p = Cs(v);
      if (p.length) {
        const _ = y.calculation?.estimation, A = _?.foods || [];
        if (!(_?.status === "complete" && _.missingFoodCount === p.length && A.length === p.length && p.every((D) => {
          const M = A.find((z) => z.entryId === String(v.indexOf(D))), V = D.referenceConfirmed === !1 ? void 0 : le[D.foodId || ""], W = Ee.filter((z) => {
            const G = Vt(D, V, z.id);
            return typeof G.value != "number" && !G.range;
          }).map((z) => z.id);
          return !!(M && W.every((z) => {
            const G = M.values[z], Y = Ee.find((ue) => ue.id === z);
            return G && Y && yt(G, Y.unit) !== null;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      const h = wn(v, y.calculation?.estimation?.foods || [], { model: y.model, generatedAt: y.generatedAt }), w = gt(h);
      await ft({
        ...g,
        snapshot: { ...g.snapshot, entries: h, intake: w },
        status: "complete",
        generatedAt: y.generatedAt,
        model: y.model,
        result: y.analysis,
        calculation: y.calculation ? { ...y.calculation, intake: w } : y.calculation
      });
    } catch (y) {
      if ($e() !== d) return;
      await ft({ ...g, status: "failed", error: Ht(y) });
    }
    return Ne.value.find((y) => y.id === g.id);
  })();
  Dt.set(u, $);
  try {
    return await $;
  } finally {
    Dt.delete(u);
  }
}
function Kt() {
  return {
    reports: Ne,
    reportStorageError: kt,
    loadReports: Dn,
    latestReport: As,
    isStale: Is,
    generateReport: Ss
  };
}
const xs = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], Es = {
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
    const n = t, d = l, i = T(null), u = T(!1), r = H(() => (n.max - n.min) * 0.16), m = H(() => {
      const _ = Number(n.modelValue);
      return String(n.modelValue).trim() && Number.isFinite(_) ? Math.min(n.max, Math.max(n.min, _)) : n.fallback;
    }), c = H(() => {
      const _ = (m.value - n.min) / r.value, A = _ - Math.round(_);
      return Array.from({ length: 31 }, (R, D) => ({
        key: D,
        major: D % 5 === 0,
        left: `${50 + (D - 15 - A) / 30 * 100}%`
      }));
    });
    let v = null;
    function g(_) {
      const A = Math.round((_ - n.min) / n.step), R = n.step < 1 ? 1 : 0;
      return Number(Math.min(n.max, Math.max(n.min, n.min + A * n.step)).toFixed(R));
    }
    function $(_) {
      d("update:modelValue", g(_));
    }
    function y(_) {
      _.pointerType === "mouse" && _.button !== 0 || (_.preventDefault(), i.value.setPointerCapture(_.pointerId), u.value = !0, v = { x: _.clientX, value: m.value });
    }
    function p(_) {
      if (!v || !u.value) return;
      const A = i.value.getBoundingClientRect().width || 1;
      $(v.value + (_.clientX - v.x) / A * r.value);
    }
    function h() {
      u.value = !1, v = null;
    }
    function w(_) {
      const A = {
        ArrowRight: n.step,
        ArrowUp: n.step,
        ArrowLeft: -n.step,
        ArrowDown: -n.step,
        PageUp: n.step * 10,
        PageDown: -n.step * 10
      };
      _.key === "Home" ? (_.preventDefault(), $(n.min)) : _.key === "End" ? (_.preventDefault(), $(n.max)) : A[_.key] && (_.preventDefault(), $(m.value + A[_.key]));
    }
    return (_, A) => (s(), o("div", {
      ref_key: "ruler",
      ref: i,
      class: me(["vb-ruler", { "is-dragging": u.value }]),
      role: "slider",
      tabindex: "0",
      "aria-label": `${t.label}刻度`,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": m.value,
      "aria-valuetext": `${m.value} ${t.unit}`,
      "aria-orientation": "horizontal",
      onPointerdown: y,
      onPointermove: p,
      onPointerup: h,
      onPointercancel: h,
      onLostpointercapture: h,
      onKeydown: w
    }, [
      A[0] || (A[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (s(!0), o(B, null, J(c.value, (R) => (s(), o("i", {
        key: R.key,
        class: me({ major: R.major }),
        style: yn({ left: R.left })
      }, null, 6))), 128)),
      A[1] || (A[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, xs));
  }
}, Us = { class: "vb-dialog-overlay" }, js = { class: "vb-wizard-top" }, Ds = { class: "vb-icon-badge" }, Ps = ["aria-valuenow", "aria-label"], Ns = { class: "vb-wizard-copy" }, Ts = { class: "vb-small-label" }, Ms = { id: "vb-wizard-title" }, Rs = { id: "vb-step-hint" }, zs = {
  key: 0,
  class: "vb-sex-field"
}, Os = { class: "vb-sr-only" }, Fs = ["aria-pressed", "onClick"], Bs = { class: "vb-person-symbol" }, Vs = { class: "vb-choice-check" }, qs = {
  key: 1,
  class: "vb-number-step"
}, Ls = { for: "vb-step-number" }, Gs = { class: "vb-number-control" }, Js = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], Hs = {
  key: 0,
  class: "vb-field"
}, Ks = { class: "vb-input-range" }, Ws = {
  key: 2,
  class: "vb-activity-field"
}, Ys = { class: "vb-sr-only" }, Xs = ["aria-pressed", "onClick"], Qs = { class: "vb-activity-icon" }, Zs = { class: "vb-radio-mark" }, eo = { key: 0 }, to = {
  key: 3,
  class: "vb-field"
}, no = {
  key: 4,
  class: "vb-skip-row"
}, so = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, oo = { class: "vb-wizard-actions" }, lo = ["disabled"], ao = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, io = { class: "vb-wizard-account-login" }, ro = { class: "vb-wizard-privacy" }, uo = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = et(n.profile ? { ...n.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), u = T(0), r = T(""), m = T(null), c = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], v = H(() => {
      const _ = c[u.value], A = cs(i.age)[_.key];
      return A ? { ..._, min: A[0], max: A[1] } : _;
    });
    function g() {
      if (u.value === 0 || u.value === 4 || !String(i[v.value.key] ?? "").trim()) return "";
      const _ = Number(i[v.value.key]);
      return !Number.isFinite(_) || _ < v.value.min || _ > v.value.max || u.value === 1 && !Number.isInteger(_) ? `请输入 ${v.value.min}–${v.value.max} ${v.value.unit}${u.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function $(_) {
      i.sex = _, r.value = "";
    }
    function y() {
      i[v.value.key] = "", r.value = "", u.value < 4 && u.value++;
    }
    function p() {
      if (r.value = g(), !r.value) {
        if (u.value < 4) {
          u.value++;
          return;
        }
        r.value = st(i), r.value || d("complete", { ...i });
      }
    }
    function h() {
      xe(() => m.value?.querySelector(".vb-step-input, .vb-choice-button, .vb-activity-choice")?.focus());
    }
    re(u, () => {
      r.value = "", h();
    }), wt(h);
    function w(_) {
      if (_.key === "Escape" && n.profile) {
        d("close");
        return;
      }
      if (_.key !== "Tab") return;
      const A = [...m.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], R = A[0], D = A.at(-1);
      _.shiftKey && document.activeElement === R ? (_.preventDefault(), D.focus()) : !_.shiftKey && document.activeElement === D && (_.preventDefault(), R.focus());
    }
    return (_, A) => (s(), o("div", Us, [
      e("section", {
        ref_key: "dialog",
        ref: m,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: w
      }, [
        e("div", js, [
          e("span", Ds, [
            U(O, { name: "leaf" })
          ]),
          A[10] || (A[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (s(), o("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: A[0] || (A[0] = (R) => _.$emit("close"))
          }, [
            U(O, { name: "close" })
          ])) : I("", !0)
        ]),
        e("div", {
          class: "vb-wizard-progress",
          role: "progressbar",
          "aria-valuenow": u.value + 1,
          "aria-valuemin": "1",
          "aria-valuemax": "5",
          "aria-label": `档案设置，第 ${u.value + 1} 步，共 5 步`
        }, [
          (s(), o(B, null, J(5, (R) => e("span", {
            key: R,
            class: me({ filled: R <= u.value + 1 })
          }, null, 2)), 64))
        ], 8, Ps),
        e("form", {
          onSubmit: Pe(p, ["prevent"])
        }, [
          e("div", Ns, [
            e("span", Ts, "第 " + a(u.value + 1) + " 步 / 共 5 步", 1),
            e("h2", Ms, a(v.value.title), 1),
            e("p", Rs, a(v.value.hint), 1)
          ]),
          u.value === 0 ? (s(), o("fieldset", zs, [
            e("legend", Os, a(v.value.question), 1),
            (s(), o(B, null, J([["male", "男性"], ["female", "女性"]], ([R, D]) => e("button", {
              key: R,
              type: "button",
              class: me(["vb-choice-button", { selected: i.sex === R }]),
              "aria-pressed": i.sex === R,
              onClick: (M) => $(R)
            }, [
              e("span", Bs, a(R === "male" ? "♂" : "♀"), 1),
              e("strong", null, a(D), 1),
              e("span", Vs, [
                i.sex === R ? (s(), ve(O, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : I("", !0)
              ])
            ], 10, Fs)), 64))
          ])) : u.value < 4 ? (s(), o("div", qs, [
            e("label", Ls, a(v.value.question), 1),
            e("div", Gs, [
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
              }, null, 40, Js)), [
                [ie, i[v.value.key]]
              ]),
              e("span", null, a(v.value.unit), 1)
            ]),
            U(Es, {
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
            u.value === 1 && String(i.age) === "0" ? (s(), o("label", Hs, [
              A[11] || (A[11] = N("月龄（可选，0–11个月）", -1)),
              te(e("input", {
                "onUpdate:modelValue": A[5] || (A[5] = (R) => i.ageMonths = R),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [ie, i.ageMonths]
              ])
            ])) : I("", !0),
            e("p", Ks, a(v.value.min) + "–" + a(v.value.max) + " " + a(v.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (s(), o("fieldset", Ws, [
            e("legend", Ys, a(v.value.question), 1),
            (s(!0), o(B, null, J(b(Gt), (R) => (s(), o("button", {
              key: R.key,
              type: "button",
              class: me(["vb-activity-choice", { selected: i.activity === R.key }]),
              "aria-pressed": i.activity === R.key,
              onClick: (D) => i.activity = R.key
            }, [
              e("span", Qs, [
                U(O, {
                  name: R.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, a(R.label), 1),
                e("small", null, a(R.detail), 1)
              ]),
              e("span", Zs, [
                i.activity === R.key ? (s(), o("i", eo)) : I("", !0)
              ])
            ], 10, Xs))), 128))
          ])),
          u.value === 4 ? (s(), o("label", to, [
            A[13] || (A[13] = N("生理阶段（可选）", -1)),
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
          ])) : I("", !0),
          u.value < 4 ? (s(), o("div", no, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: y
            }, "跳过此项")
          ])) : I("", !0),
          e("p", so, a(r.value), 1),
          e("div", oo, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: u.value === 0 && !t.profile,
              onClick: A[7] || (A[7] = (R) => u.value > 0 ? u.value-- : _.$emit("close"))
            }, [
              U(O, {
                name: "back",
                size: 17
              }),
              N(a(u.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, lo),
            e("button", ao, [
              N(a(u.value === 4 ? "保存我的身体档案" : "下一步"), 1),
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
          onClick: A[8] || (A[8] = (R) => d("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", io, [
          A[15] || (A[15] = N("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: A[9] || (A[9] = (R) => d("login"))
          }, "登录")
        ]),
        e("p", ro, [
          U(O, {
            name: "lock",
            size: 13
          }),
          A[16] || (A[16] = N("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, At = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function Wt(t) {
  if (t?.__summary) return t.state || "";
  if (!t?.expanded) return t?.state || "";
  const l = String(t.source?.description || ""), n = [];
  return /\bRAW\b/.test(l) ? n.push("生") : /\bRSTD\b|ROASTED/.test(l) ? n.push("烤熟") : /\bBKD\b/.test(l) ? n.push("烘焙") : /FRIED/.test(l) ? n.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(l) && n.push("熟"), /\bDRY MIX\b/.test(l) ? n.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(l) && n.push("干制"), /\bCND\b/.test(l) && n.push("罐装"), /\bFRZ\b|FROZEN/.test(l) && n.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(l) ? n.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(l) && n.push("加盐"), n.length ? n.join(" · ") : "具体品种与配方见数据来源";
}
const Pn = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function co(t) {
  return (Pn.find((n) => n.items.some(([d]) => d === t?.key) || [n.name, ...n.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([n]) => le[n]?.source).map(([n, d]) => ({ id: n, label: d }));
}
const vo = Object.fromEntries(Pn.flatMap((t) => t.items)), Nn = (t) => vo[t] || "";
function mo(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function Tn(t) {
  const l = T(null), n = T(!1), d = T(!1);
  let i = 0;
  async function u(r = !1) {
    const m = b(typeof t == "function" ? t() : t), c = ++i;
    if (l.value = null, d.value = !1, n.value = !!m && !m.image, !m) {
      n.value = !1;
      return;
    }
    try {
      l.value = await mo(m, { force: r }), d.value = !l.value;
    } catch {
      d.value = !0;
    } finally {
      c === i && (n.value = !1);
    }
  }
  return re(() => {
    const r = b(typeof t == "function" ? t() : t);
    return [r?.key, r?.image];
  }, () => u(), { immediate: !0 }), { photo: l, loading: n, failed: d, retry: () => u(!0) };
}
const po = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, bo = { key: 0 }, fo = { key: 1 }, go = {
  key: 2,
  role: "status"
}, yo = { key: 3 }, ho = { class: "vb-portion-macros" }, ko = { key: 0 }, wo = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, $o = { class: "vb-estimate-adjust" }, _o = { class: "vb-field" }, Co = ["disabled"], Ao = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = T(!1), u = T(""), r = T(null), m = T("");
    let c = 0;
    function v(p) {
      try {
        const w = JSON.parse(we.getItem("weiheng.food-estimate." + p?.key) || "null");
        if (w?.estimate)
          return r.value = { ...w, cached: !0 }, m.value = w.recipe || "", d("resolved", r.value), !0;
      } catch {
      }
      const h = $n.estimates?.[p?.key];
      return h ? (r.value = { foodId: p.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: h.model, generatedAt: h.generatedAt, estimate: { entryId: p.key, name: p.name, grams: 100, values: h.values, assumption: h.assumption } }, d("resolved", r.value), !0) : !1;
    }
    async function g() {
      const p = ++c, h = n.food?.key;
      i.value = !0, u.value = "", r.value = null, d("resolved", null);
      try {
        const w = await Ct("food-estimate", { foodId: h, recipe: m.value.trim() });
        if (p !== c) return;
        r.value = w;
        try {
          we.setItem("weiheng.food-estimate." + h, JSON.stringify({ ...w, recipe: m.value }));
        } catch {
          u.value = "估算已返回，但本机缓存保存失败。";
        }
        d("resolved", w);
      } catch (w) {
        p === c && (u.value = w.message);
      } finally {
        p === c && (i.value = !1);
      }
    }
    re(() => n.food?.key, () => {
      c++, m.value = "", u.value = "", i.value = !1, r.value = null, n.food && v(n.food);
    }, { immediate: !0 }), Ve(() => {
      c++;
    });
    const $ = (p, h) => yt(p, h), y = () => Object.values(r.value?.estimate?.values || {}).some((p) => p && typeof p.value != "number" && typeof p.low == "number" && typeof p.high == "number");
    return (p, h) => (s(), o("section", po, [
      e("h3", null, a(r.value ? "AI 估算参考" : "AI 营养估算"), 1),
      r.value?.estimate ? (s(), o("p", bo, [...h[1] || (h[1] = [
        e("strong", null, "每100克可食部 · AI单值参考，不是数据库值", -1)
      ])])) : (s(), o("p", fo, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (s(), o("p", go, "正在估算…")) : I("", !0),
      r.value?.estimate ? (s(), o("div", yo, [
        e("div", ho, [
          (s(!0), o(B, null, J(b(Ee).filter((w) => $(r.value.estimate.values[w.id], w.unit) !== null), (w) => (s(), o("div", {
            key: w.id
          }, [
            e("span", null, a(w.name), 1),
            e("strong", null, [
              N(a($(r.value.estimate.values[w.id], w.unit)) + " ", 1),
              e("small", null, a(w.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, a(y() ? "旧估算范围按上下限中点换为单值参考；" : "") + a(r.value.estimate.assumption), 1),
        r.value.cached ? (s(), o("small", ko, "已保存的预估 · " + a(r.value.model || r.value.requestedModel) + " · " + a(r.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : I("", !0),
        h[2] || (h[2] = e("small", null, "按常见品种与做法给出单一参考值。实际配方、用油和份量会造成误差；维生素和矿物质仍显示未知。", -1))
      ])) : I("", !0),
      u.value ? (s(), o("p", wo, a(u.value), 1)) : I("", !0),
      e("details", $o, [
        e("summary", null, a(r.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", _o, [
          h[3] || (h[3] = N("原料与做法", -1)),
          te(e("textarea", {
            "onUpdate:modelValue": h[0] || (h[0] = (w) => m.value = w),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [ie, m.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: g
        }, a(i.value ? "估算中…" : u.value ? "重试估算" : r.value ? "按补充内容重新估算" : "生成估算"), 9, Co)
      ])
    ]));
  }
};
function Io(t) {
  const l = String(t?.name || ""), n = String(t?.state || ""), d = (i, u) => ({ label: `${i} · 估算${u}克`, grams: u });
  return /米饭/.test(l) && !/生|干/.test(n) ? [d("小碗", 100), d("中碗", 150), d("大碗", 200)] : /鸡蛋/.test(l) && !/粉|液|鸭|鹅/.test(l) ? [d("1个去壳", 50)] : /香蕉/.test(l) ? [d("1根去皮", 100)] : /苹果/.test(l) ? [d("小个去核", 150), d("中个去核", 200)] : /牛奶|酸奶/.test(l) && !/粉|干酪|奶油/.test(l) ? [d("小杯（按重量）", 200), d("一份（按重量）", 250)] : [];
}
const So = {
  key: 0,
  class: "vb-portion-presets"
}, xo = ["onClick"], Mn = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = H(() => Io(n.food));
    return (u, r) => i.value.length ? (s(), o("div", So, [
      r[0] || (r[0] = e("span", null, "份量参考", -1)),
      (s(!0), o(B, null, J(i.value, (m) => (s(), o("button", {
        key: m.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (c) => d("choose", m.grams)
      }, a(m.label), 9, xo))), 128)),
      r[1] || (r[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : I("", !0);
  }
}, Eo = ["src", "alt", "loading"], Uo = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, Yt = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = T(!1);
    return re(() => n.photo?.image, () => i.value = !1), (u, r) => (s(), o("div", {
      class: me(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (s(), o("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: r[0] || (r[0] = (m) => {
          i.value = !0, d("image-error");
        })
      }, null, 40, Eo)) : (s(), o("div", Uo, [
        U(O, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, a(b(Nn)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, a(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (s(), o("span", {
        key: 2,
        class: me({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, a(t.photo.imageLabel || "食物照片"), 3)) : I("", !0)
    ], 2));
  }
}), jo = ["aria-label"], Do = ["aria-label"], Po = { class: "vb-feature-dialog-body" }, lt = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: l }) {
    const n = l, d = T(null), i = document.activeElement;
    wt(() => xe(() => d.value?.focus())), Ve(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function u(r) {
      if (r.key === "Escape" && (r.preventDefault(), n("close")), r.key !== "Tab") return;
      const m = [...d.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((g) => g.getClientRects().length);
      if (!m.length) {
        r.preventDefault();
        return;
      }
      const c = m[0], v = m.at(-1);
      r.shiftKey && (document.activeElement === c || document.activeElement === d.value) ? (r.preventDefault(), v.focus()) : !r.shiftKey && document.activeElement === v && (r.preventDefault(), c.focus());
    }
    return (r, m) => (s(), o("div", {
      class: "vb-feature-overlay",
      onClick: m[1] || (m[1] = Pe((c) => r.$emit("close"), ["self"]))
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
          e("h2", null, a(t.title), 1),
          e("button", {
            type: "button",
            class: "vb-icon-button",
            "aria-label": "关闭" + t.title,
            onClick: m[0] || (m[0] = (c) => r.$emit("close"))
          }, [
            U(O, { name: "close" })
          ], 8, Do)
        ]),
        e("div", Po, [
          Wn(r.$slots, "default")
        ])
      ], 42, jo)
    ]));
  }
}, No = { class: "vb-food-detail-top" }, To = { class: "vb-eyebrow" }, Mo = { class: "vb-food-state" }, Ro = { class: "vb-pill" }, zo = {
  key: 0,
  class: "vb-field"
}, Oo = ["value"], Fo = ["value"], Bo = {
  key: 0,
  class: "vb-intake-more"
}, Vo = {
  key: 1,
  class: "vb-feature-error"
}, qo = { class: "vb-portion-controls" }, Lo = ["max"], Go = ["value"], Jo = { class: "vb-portion-macros" }, Ho = { key: 0 }, Ko = { key: 0 }, Wo = ["disabled"], Yo = { class: "vb-food-all-nutrients" }, Xo = { class: "vb-nutrient-table" }, Qo = { class: "vb-nutrient-table-head" }, Zo = { key: 0 }, el = ["href"], tl = { key: 1 }, nl = { key: 2 }, sl = ["href"], ol = ["href"], ll = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = T(n.foodId), u = T(100), r = T(ke()), m = T("unspecified"), c = T(null);
    re(() => n.foodId, (W) => {
      i.value = W;
    }), re(i, () => {
      c.value = null;
    });
    const v = H(() => le[i.value]), g = T("");
    async function $() {
      const W = i.value;
      g.value = "";
      try {
        await qe(W);
      } catch (z) {
        i.value === W && (g.value = z.message);
      }
    }
    re(i, $, { immediate: !0 });
    const y = H(() => co(le[n.foodId])), p = H(() => Ee.some((W) => typeof v.value?.nutrients?.[W.id] != "number")), h = H(() => v.value?.__summary ? null : $t(v.value, p.value ? c.value : null)), w = H(() => gt([{ foodId: v.value.key, grams: Number(u.value), nutritionSnapshot: h.value }]).totals), _ = H(() => !v.value?.__summary && Number(u.value) >= 0.1 && Number(u.value) <= 5e3 && r.value && r.value <= ke()), { photo: A, loading: R, failed: D } = Tn(() => v.value), M = H(() => v.value?.imageCredit || A.value?.imageCredit || A.value);
    function V() {
      _.value && d("add", { foodId: v.value.key, grams: Number(u.value), date: r.value, meal: m.value, nutritionSnapshot: h.value });
    }
    return (W, z) => v.value ? (s(), ve(lt, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: z[6] || (z[6] = (G) => W.$emit("close"))
    }, {
      default: ot(() => [
        e("div", No, [
          e("figure", null, [
            U(Yt, {
              food: v.value,
              photo: b(A),
              loading: b(R),
              failed: b(D),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", To, a(v.value.categoryName), 1),
            e("h1", null, a(b(Nn)(v.value.key) || b(At)(v.value)), 1),
            e("p", Mo, a(b(Wt)(v.value)), 1),
            e("span", Ro, a(v.value.source ? "数据库" : c.value ? "AI估算" : "数据不完整"), 1),
            y.value.length ? (s(), o("label", zo, [
              z[7] || (z[7] = N("选择营养样本", -1)),
              te(e("select", {
                "onUpdate:modelValue": z[0] || (z[0] = (G) => i.value = G),
                "aria-label": "选择营养样本"
              }, [
                y.value.some((G) => G.id === n.foodId) ? I("", !0) : (s(), o("option", {
                  key: 0,
                  value: n.foodId
                }, "当前食物 · " + a(b(le)[n.foodId]?.source ? "数据库" : "通用估算"), 9, Oo)),
                (s(!0), o(B, null, J(y.value, (G) => (s(), o("option", {
                  key: G.id,
                  value: G.id
                }, a(G.label), 9, Fo))), 128))
              ], 512), [
                [Ce, i.value]
              ]),
              z[8] || (z[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : I("", !0)
          ])
        ]),
        p.value && !v.value.__summary ? (s(), o("details", Bo, [
          z[9] || (z[9] = e("summary", null, "查看估算依据与调整", -1)),
          U(Ao, {
            food: v.value,
            onResolved: z[1] || (z[1] = (G) => c.value = G)
          }, null, 8, ["food"])
        ])) : I("", !0),
        g.value ? (s(), o("p", Vo, [
          N(a(g.value) + " ", 1),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: $
          }, "重试")
        ])) : I("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: Pe(V, ["prevent"])
        }, [
          U(Mn, {
            food: v.value,
            onChoose: z[2] || (z[2] = (G) => u.value = G)
          }, null, 8, ["food"]),
          e("div", qo, [
            e("label", null, [
              z[10] || (z[10] = N("可食部重量", -1)),
              te(e("input", {
                "onUpdate:modelValue": z[3] || (z[3] = (G) => u.value = G),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [ie, u.value]
              ]),
              z[11] || (z[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              z[12] || (z[12] = N("记录日期", -1)),
              te(e("input", {
                "onUpdate:modelValue": z[4] || (z[4] = (G) => r.value = G),
                type: "date",
                max: b(ke)(),
                required: ""
              }, null, 8, Lo), [
                [ie, r.value]
              ])
            ]),
            e("label", null, [
              z[13] || (z[13] = N("餐次", -1)),
              te(e("select", {
                "onUpdate:modelValue": z[5] || (z[5] = (G) => m.value = G)
              }, [
                (s(!0), o(B, null, J(b(mt), ([G, Y]) => (s(), o("option", {
                  key: G,
                  value: G
                }, a(Y), 9, Go))), 128))
              ], 512), [
                [Ce, m.value]
              ])
            ])
          ]),
          e("div", Jo, [
            (s(!0), o(B, null, J(b(Ee), (G) => (s(), o("div", {
              key: G.id
            }, [
              e("span", null, a(G.id === "carbs" ? "碳水" : G.name), 1),
              e("strong", null, [
                N(a(b(nn)(w.value[G.id])) + " ", 1),
                w.value[G.id].value != null || w.value[G.id].range ? (s(), o("small", Ho, a(G.unit), 1)) : I("", !0)
              ]),
              w.value[G.id].range ? (s(), o("small", Ko, "AI估算")) : I("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !_.value
          }, [
            U(O, {
              name: "plus",
              size: 16
            }),
            z[14] || (z[14] = N("添加记录", -1))
          ], 8, Wo),
          z[15] || (z[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", Yo, [
          z[20] || (z[20] = e("summary", null, "查看完整营养与依据", -1)),
          z[21] || (z[21] = e("p", null, "每100克可食部；未知值不按0计算。AI单值为参考估算，不是实测值；旧估算范围按上下限中点换算。", -1)),
          e("div", Xo, [
            e("div", Qo, [
              z[16] || (z[16] = e("span", null, "营养指标", -1)),
              z[17] || (z[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + a(u.value) + " 克", 1)
            ]),
            (s(!0), o(B, null, J(b(es), (G) => (s(), o("div", {
              key: G.id
            }, [
              e("span", null, a(G.name), 1),
              e("span", null, a(b(De)(v.value.nutrients[G.id])) + " " + a(v.value.nutrients[G.id] != null ? G.unit : ""), 1),
              e("span", null, a(b(nn)(w.value[G.id])) + " " + a(w.value[G.id].value != null || w.value[G.id].range ? G.unit : "") + a(w.value[G.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + a(v.value.name), 1),
          v.value.source ? (s(), o("p", Zo, [
            e("a", {
              href: v.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, a(v.value.source.name), 9, el),
            N(" · " + a(v.value.source.id) + " · " + a(v.value.source.license), 1),
            z[18] || (z[18] = e("br", null, null, -1)),
            N(a(v.value.source.description), 1)
          ])) : (s(), o("p", tl, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          z[22] || (z[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          M.value ? (s(), o("p", nl, [
            z[19] || (z[19] = N("图片：", -1)),
            e("a", {
              href: M.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, a(M.value.title), 9, sl),
            N(" / " + a(M.value.author) + " · ", 1),
            e("a", {
              href: M.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, a(M.value.license), 9, ol),
            N(" · " + a(M.value.modifications), 1)
          ])) : I("", !0)
        ])
      ]),
      _: 1
    })) : I("", !0);
  }
}, al = { class: "vb-report-heading" }, il = { class: "vb-small-label" }, rl = { class: "vb-pill" }, ul = { key: 0 }, dl = ["disabled"], cl = {
  key: 1,
  class: "vb-inline-warning"
}, vl = {
  key: 2,
  class: "vb-inline-warning"
}, ml = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, pl = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, bl = ["disabled"], fl = {
  key: 5,
  class: "vb-feature-error"
}, gl = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, yl = { class: "vb-report-estimation-heading" }, hl = { class: "vb-pill" }, kl = {
  key: 0,
  class: "vb-report-estimation-list"
}, wl = { class: "vb-report-estimation-values" }, $l = {
  key: 1,
  class: "vb-intake-more"
}, _l = { class: "vb-report-comparison" }, Cl = { key: 0 }, Al = { key: 1 }, Il = { key: 2 }, Sl = { key: 3 }, xl = { key: 4 }, El = { key: 5 }, Ul = { key: 6 }, jl = { key: 7 }, Dl = {
  key: 7,
  class: "vb-report-content"
}, Pl = { class: "vb-report-summary" }, Nl = { class: "vb-inline-warning" }, Tl = {
  key: 8,
  class: "vb-intake-more"
}, Ml = { class: "vb-report-meta" }, Rl = { key: 0 }, zl = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const l = t, n = H(() => l.report?.calculation?.targets || An(l.report?.snapshot?.profile)), d = H(() => {
      const y = l.report?.snapshot, p = l.report?.calculation?.estimation?.foods || [];
      if (!y || !p.length) return y?.intake;
      const h = wn(y.entries || [], p, { model: l.report?.model, generatedAt: l.report?.generatedAt });
      return gt(h);
    }), i = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], u = (y) => y ? new Date(y).toLocaleString("zh-CN", { hour12: !1 }) : "", r = H(() => (l.report?.snapshot?.entries || []).flatMap((y) => {
      const p = y.referenceConfirmed === !1 ? null : le[y.foodId], h = Ee.filter((w) => {
        const _ = Vt(y, p, w.id);
        return typeof _.value != "number" && !_.range;
      }).map((w) => w.id);
      return h.length ? [{ name: y.name, grams: y.grams, missing: h }] : [];
    })), m = H(() => l.report?.calculation?.estimation?.missingFoodCount ?? r.value.length), c = H(() => l.report?.calculation?.estimation?.foods || []), v = (y) => (y > 0 ? "+" : y < 0 ? "−" : "") + De(Math.abs(y)), g = (y) => v(ts(y)), $ = (y) => `${Object.values(y?.values || {}).some((h) => h && typeof h.value != "number" && typeof h.low == "number" && typeof h.high == "number") ? "旧估算范围按上下限中点换为单值参考；" : ""}${y?.assumption || ""}`;
    return (y, p) => (s(), ve(lt, {
      title: "AI 营养分析",
      wide: "",
      onClose: p[4] || (p[4] = (h) => y.$emit("close"))
    }, {
      default: ot(() => [
        e("div", al, [
          e("div", null, [
            e("span", il, a(t.report?.date || t.record?.date), 1),
            p[5] || (p[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", rl, a(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        p[18] || (p[18] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (s(), o("section", ul, [
          p[6] || (p[6] = e("p", null, "分析时向DeepSeek发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[0] || (p[0] = (h) => y.$emit("retry"))
          }, "开始AI分析", 8, dl)
        ])) : I("", !0),
        t.stale ? (s(), o("p", cl, [
          p[7] || (p[7] = N("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (s(), o("button", {
            key: 0,
            class: "vb-text-button",
            onClick: p[1] || (p[1] = (h) => y.$emit("retry"))
          }, "重新分析")) : I("", !0)
        ])) : I("", !0),
        t.record ? I("", !0) : (s(), o("p", vl, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (s(), o("div", ml, [
          p[9] || (p[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            p[8] || (p[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, a(m.value ? "同时自动估算 " + m.value + " 项食物的缺失指标。" : "程序已计算营养汇总，DeepSeek 正在生成解释与建议。"), 1)
          ])
        ])) : I("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (s(), o("div", pl, [
          p[10] || (p[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, a(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[2] || (p[2] = (h) => y.$emit("retry"))
          }, "重新分析", 8, bl)
        ])) : I("", !0),
        t.report?.persistenceFailed ? (s(), o("p", fl, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : I("", !0),
        t.report?.snapshot ? (s(), o(B, { key: 6 }, [
          p[14] || (p[14] = e("h3", { class: "vb-report-section-title" }, "本次摄入汇总", -1)),
          U(qt, {
            summary: d.value || t.report.snapshot.intake,
            targets: n.value,
            estimating: t.report.status === "pending",
            details: ""
          }, null, 8, ["summary", "targets", "estimating"]),
          m.value ? (s(), o("section", gl, [
            e("div", yl, [
              e("div", null, [
                e("h3", null, a(m.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${m.value} 项）`), 1),
                p[11] || (p[11] = e("p", null, "缺少数据库数据的食物会按识别名称和确认克数估算，并计入上方合计；维生素和矿物质仍以可靠数据为准。", -1))
              ]),
              e("span", hl, a(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            p[12] || (p[12] = e("p", { class: "vb-data-note" }, "缺失数据按常见品种与做法给出AI单值参考，不是数据库值或检测结果；旧估算范围按上下限中点换算。", -1)),
            c.value.length ? (s(), o("ul", kl, [
              (s(!0), o(B, null, J(c.value, (h) => (s(), o("li", {
                key: h.entryId
              }, [
                e("div", null, [
                  e("strong", null, a(h.name) + " · " + a(b(De)(h.grams)) + " 克", 1),
                  e("small", null, a($(h)), 1)
                ]),
                e("div", wl, [
                  (s(!0), o(B, null, J(b(Ee).filter((w) => b(yt)(h.values[w.id], w.unit) !== null), (w) => (s(), o("span", {
                    key: w.id
                  }, a(w.id === "carbs" ? "碳水" : w.name) + " " + a(b(De)(b(yt)(h.values[w.id], w.unit))) + " " + a(w.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : I("", !0)
          ])) : I("", !0),
          t.report.calculation?.comparison ? (s(), o("details", $l, [
            p[13] || (p[13] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", _l, [
              (s(!0), o(B, null, J(t.report.calculation.comparison, (h) => (s(), o("div", {
                key: h.id
              }, [
                e("span", null, a(h.id === "carbs" ? "碳水" : h.name), 1),
                h.estimatedRange?.delta ? (s(), o("strong", Cl, " AI 估算参考差值：" + a(g(h.estimatedRange.delta)) + " " + a(h.unit), 1)) : h.delta !== null ? (s(), o("strong", Al, a(h.delta > 0 ? "+" : "") + a(b(De)(h.delta)) + " " + a(h.unit), 1)) : (s(), o("strong", Il, a(h.estimatedRange || h.complete && h.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                h.estimatedRange?.delta ? (s(), o("small", Sl, "按数据库已知值与 AI 单值估算计算；旧范围按中点换算。记录未必覆盖全天，不代表达标或不足。")) : h.estimatedRange && !h.estimatedRange.delta ? (s(), o("small", xl, "含AI单值估算，暂无适用个人目标。")) : h.delta !== null ? (s(), o("small", El, "记录合计减去全天目标，记录未必覆盖全天。")) : h.complete && h.target === null ? (s(), o("small", Ul, "请完善个人营养档案后再查看与目标的差值。")) : (s(), o("small", jl, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : I("", !0)
        ], 64)) : I("", !0),
        t.report?.result ? (s(), o("div", Dl, [
          p[15] || (p[15] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", Pl, a(t.report.result.summary), 1),
          (s(), o(B, null, J(i, ([h, w]) => e("section", { key: h }, [
            t.report.result[h]?.length ? (s(), o(B, { key: 0 }, [
              e("h3", null, a(w), 1),
              e("ul", null, [
                (s(!0), o(B, null, J(t.report.result[h], (_, A) => (s(), o("li", { key: A }, a(_), 1))), 128))
              ])
            ], 64)) : I("", !0)
          ])), 64)),
          e("p", Nl, "分析范围：" + a(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : I("", !0),
        t.report ? (s(), o("details", Tl, [
          p[17] || (p[17] = e("summary", null, "查看分析信息", -1)),
          e("div", Ml, [
            e("span", null, "生成时间：" + a(u(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (s(), o("span", Rl, "模型：" + a(t.report.model), 1)) : I("", !0),
            e("span", null, "数据版本：" + a(t.report.dataVersion), 1),
            e("span", null, "食物库：" + a(t.report.snapshot?.intake?.dataVersion), 1),
            p[16] || (p[16] = e("small", null, "报告、照片保存在本机浏览器。清理站点数据后无法恢复。", -1))
          ])
        ])) : I("", !0),
        t.report?.status === "complete" && t.record ? (s(), o("button", {
          key: 9,
          type: "button",
          class: "vb-button vb-button-quiet",
          onClick: p[3] || (p[3] = (h) => y.$emit("retry"))
        }, a(t.stale ? "用最新记录重新分析" : "重新分析这一天"), 1)) : I("", !0)
      ]),
      _: 1
    }));
  }
};
function Bt(t) {
  const l = String(t || "");
  return /^(?:好的[，,\s]*)?pdf(?:格式)?[。.!！]?$/i.test(l.trim()) ? "pdf" : /^(?:好的[，,\s]*)?(?:word|docx)(?:格式)?[。.!！]?$/i.test(l.trim()) ? "docx" : !/(生成|导出|下载|保存|制作|整理|做成|转换|转成|给我|发我|用|格式|create|generate|export|download|save|make|convert)/i.test(l) || /^(什么是|如何|怎么|为什么|what\b|how\b|why\b)/i.test(l.trim()) ? null : [["pdf", /pdf/i], ["docx", /word|docx|\.doc\b/i], ["png", /png|长图|图片文档|图片格式|(?:导出|保存).{0,8}图片/i]].map(([d, i]) => ({ format: d, index: l.search(i) })).filter((d) => d.index >= 0).sort((d, i) => d.index - i.index)[0]?.format || null;
}
function Ol(t) {
  const l = String(t || "").trim(), n = /^\s*#{1,6}\s+\S/m.exec(l);
  if (!n || !n.index) return l;
  const d = l.slice(0, n.index), i = d.split(`
`).map((m) => m.trim()).filter((m) => m && !/^[-*_]{3,}$/.test(m)), u = /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i, r = /(身高|体重|年龄|孕期|哺乳|过敏|疾病|营养|能量|热量|kcal|蛋白|用药)/i;
  return u.test(d) && i.every((m) => /(PDF|Word|文件|附件|导出|下载|复制|格式)/i.test(m) && !r.test(m)) ? l.slice(n.index).trim() : l;
}
function Nt(t) {
  const l = String(t || "").trim();
  return l.length < 400 && !/^\s*(?:#{1,6}\s|\|)/m.test(l) && /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i.test(l);
}
const Rn = (t, l) => {
  const n = t.__vccOpts || t;
  for (const [d, i] of l)
    n[d] = i;
  return n;
}, Fl = ["aria-busy"], Bl = { class: "vb-chat-document-body" }, Vl = {
  class: "vb-chat-export-options",
  "aria-label": "下载计划"
}, ql = ["href", "download", "title"], Ll = ["disabled", "onClick"], Gl = {
  key: 0,
  role: "status"
}, Jl = {
  key: 1,
  role: "alert"
}, Hl = { key: 2 }, Kl = {
  __name: "ChatMessageExport",
  props: { content: { type: String, required: !0 }, question: { type: String, default: "" }, auto: Boolean },
  emits: ["retry"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = T({}), u = T(""), r = T(""), m = T("");
    let c = 0, v = !1, g = !1;
    const $ = H(() => Bt(n.question)), y = H(() => u.value || $.value || "pdf"), p = H(() => ({ pdf: "PDF", docx: "Word", png: "图片" })[y.value]), h = H(() => i.value[y.value]), w = H(() => Ol(n.content));
    function _() {
      for (const D of Object.values(i.value)) setTimeout(() => URL.revokeObjectURL(D.url), 3e4);
      i.value = {};
    }
    async function A(D = y.value) {
      if (r.value || i.value[D]) {
        i.value[D] && (u.value = D);
        return;
      }
      const M = c, V = w.value, W = n.question;
      u.value = D, r.value = D, m.value = "";
      try {
        if ($.value && Nt(V)) throw new Error("尚未生成文档正文，请重新生成。");
        const { createChatExport: z, preparedChatDownload: G } = await import("./chatExport-BCM5BWUu.js");
        if (M !== c) return;
        const Y = await z(D, V, { question: W });
        if (M !== c) return;
        i.value = { ...i.value, [D]: G(Y) };
      } catch (z) {
        M === c && (m.value = z instanceof Error ? z.message : "文件生成失败，请重试。");
      } finally {
        M === c && (r.value = "");
      }
    }
    function R() {
      !v || !n.auto || !$.value || g || r.value || i.value[$.value] || m.value || (g = !0, requestAnimationFrame(() => setTimeout(() => {
        g = !1, v && n.auto && $.value && A($.value);
      }, 0)));
    }
    return re(() => [n.content, n.question], () => {
      c++, _(), u.value = "", r.value = "", m.value = "", R();
    }), re(() => n.auto, R), wt(() => {
      v = !0, R();
    }), Ve(() => {
      v = !1, c++, _();
    }), (D, M) => $.value ? (s(), o("div", {
      key: 0,
      class: "vb-chat-document",
      "aria-label": "计划正文与下载",
      "aria-busy": !!r.value
    }, [
      e("p", Bl, a(w.value), 1),
      e("div", Vl, [
        (s(), o(B, null, J([["pdf", "PDF"], ["docx", "Word"], ["png", "长图"]], ([V, W]) => (s(), o(B, { key: V }, [
          i.value[V] ? (s(), o("a", {
            key: 0,
            href: i.value[V].url,
            download: i.value[V].filename,
            title: i.value[V].filename
          }, a(V === "png" ? "保存长图" : "下载 " + W), 9, ql)) : (s(), o("button", {
            key: 1,
            type: "button",
            disabled: !!r.value,
            onClick: (z) => A(V)
          }, a(r.value === V ? "正在生成…" : "生成 " + W), 9, Ll))
        ], 64))), 64))
      ]),
      h.value ? (s(), o("small", Gl, a(p.value) + " 文件已生成", 1)) : I("", !0),
      m.value ? (s(), o("div", Jl, [
        e("p", null, a(m.value), 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: M[0] || (M[0] = (V) => b(Nt)(w.value) ? d("retry") : A())
        }, a(b(Nt)(w.value) ? "重新生成正文" : "重试生成文件"), 1)
      ])) : I("", !0),
      h.value?.pageCount ? (s(), o("small", Hl, "内容较长，" + a(h.value.pageCount) + " 张图片已打包为 ZIP。", 1)) : I("", !0)
    ], 8, Fl)) : I("", !0);
  }
}, Wl = /* @__PURE__ */ Rn(Kl, [["__scopeId", "data-v-447caabb"]]);
function Yl({ viewport: t, isActive: l = () => !0, onChange: n = () => {
}, threshold: d = 64 }) {
  let i = !0;
  const u = () => l() && t() && t().clientHeight > 0, r = (g) => Math.max(0, g.scrollHeight - g.clientHeight - g.scrollTop);
  function m() {
    const g = t();
    n(!!(u() && r(g) > d));
  }
  function c(g = !1) {
    if (g && (i = !0), !u()) {
      n(!1);
      return;
    }
    const $ = t();
    i && ($.scrollTop = Math.max(0, $.scrollHeight - $.clientHeight)), m();
  }
  function v() {
    u() && (i = r(t()) <= d, m());
  }
  return { layout: c, onScroll: v, jump: () => c(!0) };
}
function Xl({ viewport: t, content: l, active: n, thread: d, messages: i }) {
  const u = T(!1), r = Yl({ viewport: () => t.value, isActive: () => n.value, onChange: (w) => u.value = w });
  let m = !1, c = !1, v = !1, g, $;
  function y(w = !1) {
    v = v || w, !(!m || c) && (c = !0, xe(() => {
      if (!m) {
        c = !1;
        return;
      }
      g = requestAnimationFrame(() => {
        if (g = void 0, c = !1, !m) return;
        const _ = v;
        v = !1, r.layout(_);
      });
    }));
  }
  function p() {
    $?.disconnect(), t.value && $?.observe(t.value), l.value && $?.observe(l.value), y();
  }
  const h = () => y();
  return re(i, () => y(), { deep: !0, flush: "post" }), re([d, n], () => y(!0), { flush: "post" }), re([t, l], p, { flush: "post" }), wt(() => {
    m = !0, typeof ResizeObserver < "u" && ($ = new ResizeObserver(h)), p(), window.addEventListener("resize", h), y(!0);
  }), Ve(() => {
    m = !1, $?.disconnect(), g !== void 0 && cancelAnimationFrame(g), window.removeEventListener("resize", h);
  }), { showJump: u, onScroll: r.onScroll, onContentLoad: h, jumpToLatest: () => y(!0) };
}
function Ql(t, l, n) {
  return t.push({ id: l, role: "assistant", content: "", status: "sending", createdAt: n }), t[t.length - 1];
}
function cn(t, l = {}, n = []) {
  const d = new Set(n), i = {};
  for (const u of new Set((t.threads || []).map((r) => r.date))) {
    const r = (t.threads || []).filter((g) => g.date === u).sort((g, $) => String($.createdAt || "").localeCompare(String(g.createdAt || ""))), m = r.find((g) => g.id === l[u]), c = r.find((g) => g.id === t.activeByDate?.[u]), v = m && (m.messages?.length || d.has(m.id)) ? m : c?.messages?.length ? c : r.find((g) => g.messages?.length) || m || c || r[0];
    v && (i[u] = v.id);
  }
  return i;
}
const Zl = 24e3, vn = 220;
function ea(t, l) {
  const n = Date.parse(t || l || "");
  return Number.isFinite(n) ? n : 0;
}
function mn(t) {
  const l = String(t || "").trim();
  return l.length > vn ? `${l.slice(0, vn)}…` : l;
}
function ta(t, l, n = !0) {
  if (!n || !Array.isArray(t)) return "";
  const d = [];
  for (const r of t) {
    if (!r || r.id === l || !Array.isArray(r.messages)) continue;
    const m = r.messages;
    for (let c = 0; c < m.length - 1; c++) {
      const v = m[c], g = m[c + 1];
      if (v?.role !== "user" || g?.role !== "assistant" || v.status !== "complete" || g.status !== "complete" || v.attachments?.length || g.attachments?.length) continue;
      const $ = mn(v.content), y = mn(g.content);
      !$ || !y || (d.push({
        date: typeof r.date == "string" ? r.date : "",
        time: ea(v.createdAt, r.createdAt),
        user: $,
        assistant: y
      }), c++);
    }
  }
  const i = d.sort((r, m) => r.time - m.time).slice(-50);
  let u = i.map((r) => `${r.date ? `日期 ${r.date}：` : ""}用户：${r.user}
助手：${r.assistant}`).join(`

`);
  for (; u.length > Zl && i.length; )
    i.shift(), u = i.map((r) => `${r.date ? `日期 ${r.date}：` : ""}用户：${r.user}
助手：${r.assistant}`).join(`

`);
  return u;
}
function na(t) {
  if (!t || typeof t != "object" || Array.isArray(t) || st(t)) return null;
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
const sa = 3, oa = 24e3, pn = 6e4, la = 8e5, aa = 6, ia = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function zn(t) {
  const l = String(t.name || "").split(".").pop().toLowerCase(), n = ["jpg", "jpeg", "png", "webp"].includes(l) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(l) ? "document" : null;
  if (!n) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (n === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(n === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return n;
}
function ra(t) {
  const l = String(t).replace(/\u0000/g, "").trim();
  if (!l) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (l.length > oa) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return l;
}
let Qe;
function ua() {
  return Qe || (Qe = new Promise((t, l) => {
    if (!globalThis.indexedDB) {
      l(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const n = indexedDB.open(nt("weiheng.chat-attachments.v1"), 1);
    n.onupgradeneeded = () => n.result.createObjectStore("attachments", { keyPath: "id" }), n.onsuccess = () => {
      const d = n.result;
      d.onversionchange = () => {
        d.close(), Qe = void 0;
      }, t(d);
    }, n.onerror = n.onblocked = () => l(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw Qe = void 0, t;
  })), Qe;
}
async function Xt(t, l) {
  const n = await ua();
  if (t === "readwrite" && Le()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((d, i) => {
    const u = n.transaction("attachments", t), r = l(u.objectStore("attachments"));
    u.oncomplete = () => d(r.result), u.onerror = u.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const da = (t) => Xt("readwrite", (l) => l.put(t)), Tt = (t) => Xt("readonly", (l) => l.get(t)), ct = (t) => Xt("readwrite", (l) => l.delete(t));
function ca(t) {
  return new Promise((l, n) => {
    const d = new FileReader();
    d.onload = () => l(String(d.result)), d.onerror = () => n(new Error("照片读取失败，请重新选择。")), d.readAsDataURL(t);
  });
}
async function va(t) {
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
      const r = await new Promise((c, v) => n.toBlob((g) => g ? c(g) : v(new Error("照片压缩失败。")), "image/jpeg", u)), m = await ca(r);
      if (m.length <= la) return m;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    l.close();
  }
}
async function ma(t) {
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
      const r = await d.getPage(u), m = await r.getTextContent();
      if (i.push(m.items.map((c) => "str" in c ? c.str + (c.hasEOL ? `
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
async function pa(t) {
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
async function ba(t, l) {
  const n = zn(t), d = { id: l, kind: n, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (n === "image") return { ...d, mimeType: "image/jpeg", dataUrl: await va(t) };
  const i = t.name.split(".").pop()?.toLowerCase();
  let u;
  try {
    if (i === "pdf") u = await ma(t);
    else if (i === "docx") u = await pa(t);
    else {
      const r = new Uint8Array(await t.arrayBuffer());
      u = new TextDecoder().decode(r), u.includes("�") && (u = new TextDecoder("gb18030").decode(r));
    }
  } catch (r) {
    throw new Error(r instanceof Error && /[\u4e00-\u9fff]/.test(r.message) ? r.message : "文件无法读取，请确认文件完整，或另存为 TXT 后重试。");
  }
  return { ...d, text: ra(u) };
}
const fa = {
  class: "vb-chat-page vb-simple-chat",
  "aria-label": "维衡AI助手对话"
}, ga = { class: "vb-simple-header" }, ya = { class: "vb-simple-actions" }, ha = { class: "vb-simple-date" }, ka = ["max", "disabled"], wa = { class: "vb-simple-options" }, $a = { "aria-label": "对话选项" }, _a = { class: "vb-simple-options-panel" }, Ca = {
  key: 0,
  class: "vb-simple-history"
}, Aa = ["value", "disabled"], Ia = ["value"], Sa = ["value"], xa = { class: "vb-memory-toggle" }, Ea = ["disabled"], Ua = { class: "vb-simple-starters" }, ja = ["onClick"], Da = { class: "vb-simple-context" }, Pa = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, Na = { class: "vb-simple-message-body" }, Ta = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, Ma = ["aria-label", "onClick"], Ra = ["src", "alt"], za = {
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
}, bi = { class: "vb-data-note" }, bn = "weiheng.ai-diet-chat.v1", fi = /* @__PURE__ */ He({
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
        const E = JSON.parse(we.getItem(bn) || "null");
        if (!E || typeof E != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0 };
        const S = E, x = Array.isArray(S.threads) ? S.threads.flatMap((ne) => {
          if (!ne || typeof ne != "object") return [];
          const Q = ne;
          return typeof Q.id != "string" || !Fe(Q.date) || !Array.isArray(Q.messages) ? [] : [{
            id: Q.id,
            date: Q.date,
            createdAt: typeof Q.createdAt == "string" ? Q.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: Q.messages.filter((ce) => !!(ce && typeof ce == "object" && ["user", "assistant"].includes(ce.role) && typeof ce.content == "string")).map((ce) => ce.status === "sending" ? { ...ce, status: "failed", error: "页面刷新时请求中断。点击重试可继续这条问题。" } : ce)
          }];
        }) : [], X = S.activeByDate && typeof S.activeByDate == "object" ? Object.fromEntries(Object.entries(S.activeByDate).filter(([ne, Q]) => Fe(ne) && typeof Q == "string")) : {};
        return { threads: x.slice(-60), activeByDate: X, memoryEnabled: S.memoryEnabled !== !1 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0 };
      }
    }
    const u = i(), r = T(u.threads), m = T(cn(u, u.activeByDate)), c = /* @__PURE__ */ new Set(), v = T(u.memoryEnabled), g = T(ke()), $ = T(""), y = T(null), p = T([]), h = T({}), w = T(null), _ = H(() => p.value.some((E) => E.status === "ready"));
    let A = 0;
    const R = T(""), D = T(""), M = T(null), V = T(null), W = H(() => r.value.some((E) => E.messages.some((S) => S.status === "sending"))), z = H(() => l.records.find((E) => E.date === g.value)), G = H(() => z.value?.entries || []), Y = H(() => ({
      energy: typeof l.targets?.tdee == "number" ? l.targets.tdee : null,
      protein: l.targets?.macros?.find((E) => E.id === "protein")?.grams ?? null,
      carbs: l.targets?.macros?.find((E) => E.id === "carbs")?.grams ?? null,
      fat: l.targets?.macros?.find((E) => E.id === "fat")?.grams ?? null
    })), ue = H(() => r.value.find((E) => E.id === m.value[g.value])), se = H(() => ue.value?.messages || []), { showJump: ye, onScroll: be, onContentLoad: ge, jumpToLatest: K } = Xl({ viewport: M, content: V, active: H(() => l.active), thread: H(() => ue.value?.id), messages: se }), F = H(() => r.value.filter((E) => E.messages.length).sort((E, S) => S.createdAt.localeCompare(E.createdAt)));
    function P(E) {
      const S = E.target.value, x = r.value.find((X) => X.id === S);
      x && (g.value = x.date, m.value[x.date] = x.id);
    }
    function q(E) {
      const S = se.value, x = S.findIndex((X) => X.id === E);
      return S.slice(0, x).reverse().find((X) => X.role === "user")?.content || "";
    }
    function C(E) {
      const { id: S, kind: x, name: X, size: ne, mimeType: Q } = E;
      return { id: S, kind: x, name: X, size: ne, mimeType: Q };
    }
    function f(E) {
      return E >= 1024 * 1024 ? `${(E / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(E / 1024))} KB`;
    }
    async function k(E) {
      const S = A;
      D.value = "";
      for (const x of E) {
        if (S !== A) break;
        if (p.value.length >= sa) {
          D.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let X;
        try {
          X = zn(x);
        } catch (Q) {
          D.value = Q instanceof Error ? Q.message : "这个文件暂不支持。";
          continue;
        }
        const ne = d();
        p.value.push({ id: ne, kind: X, name: x.name.slice(0, 180), size: x.size, mimeType: x.type, status: "reading" });
        try {
          const Q = await ba(x, ne);
          if (!p.value.some((pe) => pe.id === ne)) continue;
          if (p.value.reduce((pe, Ie) => pe + (Ie.value?.text?.length || 0), Q.text?.length || 0) > pn) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await da(Q);
          const fe = p.value.find((pe) => pe.id === ne);
          if (!fe) {
            await ct(ne);
            continue;
          }
          h.value[ne] = Q, fe.value = Q, fe.status = "ready";
        } catch (Q) {
          const ce = p.value.find((fe) => fe.id === ne);
          ce && (ce.status = "failed", ce.error = Q instanceof Error ? Q.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function j(E) {
      const S = E.target, x = Array.from(S.files || []);
      S.value = "", k(x);
    }
    function oe(E) {
      const S = Array.from(E.clipboardData?.files || []).filter((x) => x.type.startsWith("image/"));
      S.length && (E.preventDefault(), k(S));
    }
    function ae(E) {
      E.dataTransfer?.types.includes("Files") && E.preventDefault();
    }
    function It(E) {
      const S = Array.from(E.dataTransfer?.files || []);
      S.length && (E.preventDefault(), k(S));
    }
    function at(E) {
      p.value = p.value.filter((S) => S.id !== E), delete h.value[E], ct(E).catch(() => {
        D.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function it() {
      const E = p.value.flatMap((x) => x.status === "ready" && x.value ? [x.value] : []), S = new Set(E.map((x) => x.id));
      return p.value = p.value.filter((x) => !S.has(x.id)), E;
    }
    async function rt(E) {
      try {
        const S = h.value[E.id] || await Tt(E.id);
        if (!S) throw new Error("附件已不在本地存储中，请重新添加。");
        w.value = S;
      } catch (S) {
        D.value = S instanceof Error ? S.message : "无法预览附件。";
      }
    }
    re(() => se.value.flatMap((E) => E.attachments || []).map((E) => E.id).join(","), async () => {
      for (const E of se.value.flatMap((S) => S.attachments || []))
        if (!h.value[E.id])
          try {
            const S = await Tt(E.id);
            S && (h.value[E.id] = S);
          } catch {
          }
    }, { immediate: !0 });
    function Ke(E) {
      const S = { id: d(), date: E, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (r.value.push(S), r.value.length > 60) {
        const x = r.value.splice(0, r.value.length - 60);
        We(x.flatMap((X) => X.messages));
      }
      return m.value[E] = S.id, S;
    }
    function We(E) {
      for (const S of E.flatMap((x) => x.attachments || []))
        delete h.value[S.id], ct(S.id).catch(() => {
          R.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function Te(E) {
      const S = m.value[E];
      if (S && r.value.some((X) => X.id === S)) return;
      const x = r.value.filter((X) => X.date === E).sort((X, ne) => ne.createdAt.localeCompare(X.createdAt))[0];
      x ? m.value[E] = x.id : Ke(E);
    }
    Te(g.value), re(g, (E) => {
      if (!Fe(E) || E > ke()) {
        g.value = ke();
        return;
      }
      Te(E), D.value = "";
    });
    let Ye = !1, Xe = !1;
    function ee() {
      if (W.value) {
        Xe = !0;
        return;
      }
      Xe = !1, Ye = !0;
      const E = i();
      r.value = E.threads, m.value = cn(E, m.value, [...c]), v.value = E.memoryEnabled, Te(g.value), xe(() => {
        Ye = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", ee), Ve(() => window.removeEventListener("weiheng-chat-synced", ee));
    let L;
    function Z() {
      if (L && clearTimeout(L), L = void 0, !Le())
        try {
          we.setItem(bn, JSON.stringify({ threads: r.value, activeByDate: m.value, memoryEnabled: v.value })), R.value = "";
        } catch {
          R.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function he() {
      Ye || (L && clearTimeout(L), L = setTimeout(Z, 160));
    }
    re([r, m, v], he, { deep: !0 });
    function Ge() {
      Z();
    }
    typeof window < "u" && (window.addEventListener("pagehide", Ge), window.addEventListener("weiheng-chat-flush", Ge)), Ve(() => {
      Z(), typeof window < "u" && (window.removeEventListener("pagehide", Ge), window.removeEventListener("weiheng-chat-flush", Ge));
    });
    let Ae;
    function Fn() {
      const E = Ae;
      E && (Ae = void 0, E.controller.abort(), E.assistantMessage.status === "sending" && (E.assistantMessage.status = "failed", E.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), Z());
    }
    function Bn(E) {
      const S = new Date(E);
      return Number.isNaN(S.getTime()) ? "新对话" : S.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function Vn(E) {
      const S = new Date(E);
      return Number.isNaN(S.getTime()) ? "" : S.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function qn() {
      return G.value.map((E) => ({
        foodId: E.foodId,
        name: E.name,
        grams: E.grams,
        meal: E.meal,
        referenceConfirmed: E.referenceConfirmed
      }));
    }
    async function Ln(E, S) {
      const x = E.slice(0, S).filter((fe) => fe.status === "complete"), X = [];
      for (const { role: fe, content: pe, attachments: Ie } of x) {
        const Se = { role: fe, content: pe.slice(0, 1200), attachments: Ie };
        fe === "user" ? X.at(-1)?.role === "user" ? X[X.length - 1] = Se : X.push(Se) : X.at(-1)?.role === "user" && X.push(Se);
      }
      for (; X[0]?.role !== "user"; ) X.shift();
      const ne = X.slice(-11);
      for (; ne.reduce((fe, pe) => fe + pe.content.length, 0) > 9e3; ) ne.splice(0, 2);
      let Q = 0, ce = 0;
      for (let fe = ne.length - 1; fe >= 0; fe--) {
        const pe = ne[fe], Ie = [];
        let Se = !1;
        for (const ut of pe.attachments || []) {
          const Ue = h.value[ut.id] || await Tt(ut.id);
          if (!Ue) {
            if (fe === ne.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Se = !0;
            continue;
          }
          if (Q + (Ue.text?.length || 0) > pn || Ue.kind === "image" && ce >= aa) {
            Se = !0;
            continue;
          }
          Q += Ue.text?.length || 0, Ue.kind === "image" && ce++, Ie.push(Ue);
        }
        pe.attachments = Ie.length ? Ie : void 0, Se && (pe.content = pe.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return ne;
    }
    async function Qt(E, S, x = []) {
      const X = E.trim() || (x.length ? "请帮我分析这些附件。" : "");
      if (!X || X.length > 1200) return !1;
      Fn(), Te(g.value);
      const ne = ue.value;
      if (!ne) return !1;
      let Q, ce;
      if (S) {
        ce = ne.messages.findIndex((Re) => Re.id === S && Re.role === "assistant");
        const Me = ne.messages[ce - 1];
        if (ce < 1 || Me?.role !== "user")
          return D.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        Q = ne.messages[ce], Q.status = "sending", Q.error = void 0, Q.content = "";
      } else
        ne.messages.push({ id: d(), role: "user", content: X, attachments: x.length ? x.map(C) : void 0, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), Q = Ql(ne.messages, d(), (/* @__PURE__ */ new Date()).toISOString()), ne.messages.length > 120 && We(ne.messages.splice(0, ne.messages.length - 120)), ce = ne.messages.length - 1;
      K(), Z(), D.value = "";
      const fe = new AbortController(), pe = { controller: fe, assistantMessage: Q };
      Ae = pe;
      const Ie = g.value, Se = qn(), ut = Y.value, Ue = na(l.profile), Kn = ta(r.value, ne.id, v.value);
      try {
        const Me = await Ln(ne.messages, ce);
        if (Ae !== pe) return !1;
        if (Me.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const Re = await jn("chat", {
          date: Ie,
          messages: Me,
          entries: Se,
          targets: ut,
          profile: Ue,
          memory: Kn
        }, (je) => {
          Ae === pe && (je.type === "delta" ? Q.content += je.text : je.type === "done" && (typeof je.content == "string" && (Q.content = je.content), Q.model = je.model, Q.context = je.contextSummary, Q.createdAt = je.generatedAt || (/* @__PURE__ */ new Date()).toISOString()));
        }, fe.signal);
        if (Ae !== pe) return !1;
        if (!Q.content.trim() || typeof Re.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return Q.model = Re.model, Q.context = Re.contextSummary, Q.createdAt = Re.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Q.status = "complete", Z(), ds(), !0;
      } catch (Me) {
        return Ae !== pe || (Q.status = "failed", Q.error = Me instanceof Error ? Me.message : "AI 暂时无法回复，请重试。", Z()), !1;
      } finally {
        Ae === pe && (Ae = void 0), Xe && !W.value && ee();
      }
    }
    function Zt() {
      const E = $.value.trim();
      if (!E && !_.value || E.length > 1200) return;
      const S = it();
      $.value = "", Qt(E, void 0, S);
    }
    function en(E) {
      $.value = E, xe(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function Gn(E) {
      E.key === "Enter" && !E.shiftKey && !E.isComposing && (E.preventDefault(), Zt());
    }
    function tn(E) {
      const S = se.value.findIndex((X) => X.id === E), x = se.value[S - 1];
      S > 0 && x?.role === "user" && Qt(x.content, E);
    }
    function Jn() {
      A++, c.add(Ke(g.value).id);
      for (const E of p.value) at(E.id);
      D.value = "";
    }
    function Hn() {
      if (!window.confirm("清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。")) return;
      const E = r.value.flatMap((S) => S.messages.flatMap((x) => x.attachments || []));
      for (const S of E)
        delete h.value[S.id], ct(S.id).catch(() => {
          R.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      us(), r.value = [], m.value = {}, R.value = "", Te(g.value), D.value = "当前空间的聊天记录已清除。";
    }
    return (E, S) => (s(), o("section", fa, [
      e("header", ga, [
        S[15] || (S[15] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡AI助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", ya, [
          e("label", ha, [
            U(O, {
              name: "calendar",
              size: 16
            }),
            S[9] || (S[9] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            te(e("input", {
              "onUpdate:modelValue": S[0] || (S[0] = (x) => g.value = x),
              type: "date",
              max: b(ke)(),
              disabled: W.value,
              "aria-label": "选择饮食日期"
            }, null, 8, ka), [
              [ie, g.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: Jn
          }, [
            U(O, {
              name: "plus",
              size: 16
            }),
            S[10] || (S[10] = N("新对话", -1))
          ]),
          e("details", wa, [
            e("summary", $a, [
              S[11] || (S[11] = N("更多", -1)),
              U(O, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", _a, [
              F.value.length ? (s(), o("label", Ca, [
                S[12] || (S[12] = N(" 历史对话 ", -1)),
                e("select", {
                  value: ue.value?.id,
                  disabled: W.value,
                  "aria-label": "切换历史对话",
                  onChange: P
                }, [
                  se.value.length ? I("", !0) : (s(), o("option", {
                    key: 0,
                    value: ue.value?.id
                  }, "当前新对话", 8, Ia)),
                  (s(!0), o(B, null, J(F.value, (x) => (s(), o("option", {
                    key: x.id,
                    value: x.id
                  }, a(x.date) + " · " + a(Bn(x.createdAt)) + " · " + a(x.messages.length) + " 条消息", 9, Sa))), 128))
                ], 40, Aa)
              ])) : I("", !0),
              e("label", xa, [
                te(e("input", {
                  "onUpdate:modelValue": S[1] || (S[1] = (x) => v.value = x),
                  type: "checkbox"
                }, null, 512), [
                  [vt, v.value]
                ]),
                S[13] || (S[13] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              S[14] || (S[14] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: W.value,
                onClick: Hn
              }, "清除本地记录", 8, Ea)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: M,
        class: me(["vb-simple-scroll", { "is-empty": !se.value.length }]),
        onScrollPassive: S[2] || (S[2] = //@ts-ignore
        (...x) => b(be) && b(be)(...x)),
        onLoadCapture: S[3] || (S[3] = //@ts-ignore
        (...x) => b(ge) && b(ge)(...x)),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        se.value.length ? (s(), o("div", {
          key: 1,
          ref_key: "conversationContent",
          ref: V,
          class: "vb-simple-thread"
        }, [
          (s(!0), o(B, null, J(se.value, (x) => (s(), o("article", {
            key: x.id,
            class: me(["vb-simple-message", [`is-${x.role}`, `is-${x.status}`]])
          }, [
            x.role === "assistant" ? (s(), o("span", Pa, [
              U(O, {
                name: "sparkles",
                size: 18
              })
            ])) : I("", !0),
            e("div", Na, [
              x.attachments?.length ? (s(), o("div", Ta, [
                (s(!0), o(B, null, J(x.attachments, (X) => (s(), o("button", {
                  key: X.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + X.name,
                  onClick: (ne) => rt(X)
                }, [
                  X.kind === "image" && h.value[X.id]?.dataUrl ? (s(), o("img", {
                    key: 0,
                    src: h.value[X.id].dataUrl,
                    alt: X.name
                  }, null, 8, Ra)) : (s(), ve(O, {
                    key: 1,
                    name: X.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, a(X.name), 1),
                    e("small", null, a(X.kind === "image" ? "照片" : "文件文字") + " · " + a(f(X.size)), 1)
                  ])
                ], 8, Ma))), 128))
              ])) : I("", !0),
              x.status === "sending" && !x.content ? (s(), o("div", za, [...S[18] || (S[18] = [
                e("span", { class: "vb-loading-ring" }, null, -1),
                e("span", null, "正在回复…", -1)
              ])])) : x.status === "sending" ? (s(), o("p", Oa, [
                N(a(x.content), 1),
                S[19] || (S[19] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : x.status === "failed" ? (s(), o(B, { key: 3 }, [
                x.content ? (s(), o("p", Fa, a(x.content), 1)) : I("", !0),
                e("p", Ba, a(x.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (X) => tn(x.id)
                }, [
                  U(O, {
                    name: "activity",
                    size: 14
                  }),
                  S[20] || (S[20] = N("重试这条问题", -1))
                ], 8, Va)
              ], 64)) : x.role !== "assistant" || !b(Bt)(q(x.id)) ? (s(), o("p", qa, a(x.content), 1)) : I("", !0),
              x.role === "assistant" && x.status === "complete" && x.content.trim() && b(Bt)(q(x.id)) ? (s(), ve(Wl, {
                key: 5,
                content: x.content,
                question: q(x.id),
                auto: se.value.at(-1)?.id === x.id,
                onRetry: (X) => tn(x.id)
              }, null, 8, ["content", "question", "auto", "onRetry"])) : I("", !0),
              x.status === "complete" ? (s(), o("small", La, [
                N(a(Vn(x.createdAt)), 1),
                x.role === "assistant" ? (s(), o(B, { key: 0 }, [
                  N(" · " + a(x.model || "DeepSeek"), 1)
                ], 64)) : I("", !0)
              ])) : I("", !0)
            ])
          ], 2))), 128))
        ], 512)) : (s(), o("div", {
          key: 0,
          ref_key: "conversationContent",
          ref: V,
          class: "vb-simple-welcome"
        }, [
          S[16] || (S[16] = e("h2", null, "今天想聊些什么？", -1)),
          S[17] || (S[17] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", Ua, [
            (s(), o(B, null, J(n, (x) => e("button", {
              key: x,
              type: "button",
              onClick: (X) => en(x)
            }, [
              e("span", null, a(x), 1),
              U(O, {
                name: "arrow",
                size: 16
              })
            ], 8, ja)), 64))
          ]),
          e("small", Da, "饮食参考日期：" + a(g.value), 1)
        ], 512))
      ], 34),
      e("footer", Ga, [
        b(ye) ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "vb-chat-jump-bottom",
          "aria-label": "回到最新消息",
          title: "一键到底",
          onClick: S[4] || (S[4] = //@ts-ignore
          (...x) => b(K) && b(K)(...x))
        }, [
          U(O, {
            name: "arrow",
            size: 20
          })
        ])) : I("", !0),
        e("div", Ja, [
          se.value.length ? (s(), o("div", Ha, [
            e("details", Ka, [
              e("summary", null, [
                S[21] || (S[21] = N("快捷提问", -1)),
                U(O, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", Wa, [
                (s(), o(B, null, J(n, (x) => e("button", {
                  key: x,
                  type: "button",
                  onClick: (X) => en(x)
                }, [
                  N(a(x), 1),
                  U(O, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, Ya)), 64))
              ])
            ]),
            W.value ? (s(), o("span", Xa, "正在回复，发送新消息可打断")) : I("", !0)
          ])) : I("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: ae,
            onDrop: It
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: y,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: b(ia),
              "aria-label": "选择照片或文件",
              onChange: j
            }, null, 40, Qa),
            p.value.length ? (s(), o("div", Za, [
              (s(!0), o(B, null, J(p.value, (x) => (s(), o("div", {
                key: x.id,
                class: me(["vb-chat-file", { "is-failed": x.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: x.status !== "ready",
                  "aria-label": "预览附件：" + x.name,
                  onClick: (X) => rt(x)
                }, [
                  x.value?.dataUrl ? (s(), o("img", {
                    key: 0,
                    src: x.value.dataUrl,
                    alt: x.name
                  }, null, 8, ti)) : (s(), ve(O, {
                    key: 1,
                    name: x.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, a(x.name), 1),
                    x.status === "reading" ? (s(), o("small", ni, "正在读取…")) : x.status === "failed" ? (s(), o("small", si, a(x.error), 1)) : (s(), o("small", oi, a(f(x.size)) + " · 待发送", 1))
                  ])
                ], 8, ei),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + x.name,
                  onClick: (X) => at(x.id)
                }, [
                  U(O, {
                    name: "close",
                    size: 13
                  })
                ], 8, li)
              ], 2))), 128))
            ])) : I("", !0),
            S[24] || (S[24] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            te(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": S[5] || (S[5] = (x) => $.value = x),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: Gn,
              onPaste: oe
            }, null, 544), [
              [ie, $.value]
            ]),
            e("div", ai, [
              e("div", ii, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: S[6] || (S[6] = (x) => y.value?.click())
                }, [
                  U(O, {
                    name: "paperclip",
                    size: 18
                  }),
                  S[22] || (S[22] = e("span", null, "附件", -1))
                ]),
                S[23] || (S[23] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !$.value.trim() && !_.value,
                onClick: S[7] || (S[7] = (x) => Zt())
              }, [
                U(O, {
                  name: "arrow",
                  size: 16
                }),
                N(a(W.value ? "打断并发送" : "发送"), 1)
              ], 8, ri)
            ])
          ], 32),
          b(_e) && b(rs) === "error" ? (s(), o("p", ui, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : I("", !0),
          R.value || D.value ? (s(), o("p", {
            key: 2,
            class: "vb-simple-notice",
            role: R.value ? "alert" : "status"
          }, a(R.value || D.value), 9, di)) : I("", !0),
          e("div", ci, [
            e("details", vi, [
              e("summary", null, [
                U(O, {
                  name: "lock",
                  size: 12
                }),
                S[25] || (S[25] = N("隐私与使用说明", -1))
              ]),
              S[26] || (S[26] = e("div", { class: "vb-simple-privacy-panel" }, [
                e("p", null, "附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。"),
                e("p", null, "选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给 DeepSeek，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。"),
                e("p", null, "点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 DeepSeek 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。"),
                e("p", null, "跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。"),
                e("p", null, "饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。")
              ], -1))
            ]),
            e("span", null, a($.value.length ? `${$.value.length}/1200` : "AI 内容仅供参考"), 1)
          ])
        ])
      ]),
      w.value ? (s(), ve(lt, {
        key: 0,
        title: w.value.name,
        wide: "",
        onClose: S[8] || (S[8] = (x) => w.value = null)
      }, {
        default: ot(() => [
          w.value.kind === "image" ? (s(), o("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: w.value.dataUrl,
            alt: w.value.name
          }, null, 8, mi)) : (s(), o("pre", pi, a(w.value.text), 1)),
          e("p", bi, a(w.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : I("", !0)
    ]));
  }
}), gi = /* @__PURE__ */ Rn(fi, [["__scopeId", "data-v-bc1d03ec"]]), yi = {
  key: 0,
  class: "vb-page-title"
}, hi = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, ki = ["aria-pressed", "onClick"], wi = { class: "vb-glass vb-review-hero" }, $i = { class: "vb-icon-badge vb-large-badge" }, _i = { class: "vb-small-label" }, Ci = { class: "vb-coverage-score" }, Ai = { class: "vb-assessment-grid" }, Ii = { class: "vb-glass vb-coverage-card" }, Si = { class: "vb-section-heading" }, xi = { class: "vb-coverage-list" }, Ei = { class: "vb-food-category-icon" }, Ui = { class: "vb-coverage-name" }, ji = { key: 0 }, Di = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, Pi = { class: "vb-inline-note" }, Ni = { class: "vb-glass vb-suggestion-card" }, Ti = ["checked", "onChange"], Mi = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, Ri = { class: "vb-empty-icon" }, zi = { class: "vb-glass vb-supplement-card" }, Oi = { class: "vb-icon-badge" }, Fi = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const l = t, n = T(l.records[0]?.date || "");
    re(() => l.records, ($) => {
      $.some((y) => y.date === n.value) || (n.value = $[0]?.date || "");
    });
    const d = H(() => l.records.find(($) => $.date === n.value)), i = ($) => Number(d.value?.foods?.[$]) || 0, u = H(() => xt.filter(($) => i($.key) <= 0)), r = H(() => xt.length - u.value.length), m = H(() => Math.max(1, ...zt.map(($) => i($.key)))), c = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, v = H(() => (u.value.length ? u.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map(($) => ({ key: $.key, title: c[$.key]?.[0] || ($.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: c[$.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), g = ($) => (l.habits[n.value] || []).includes($);
    return ($, y) => (s(), o(B, null, [
      t.embedded ? I("", !0) : (s(), o("div", yi, [
        y[4] || (y[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: y[0] || (y[0] = (p) => $.$emit("navigate", "diary"))
        }, [
          U(O, {
            name: "plus",
            size: 17
          }),
          y[3] || (y[3] = N("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (s(), o("div", hi, [
        (s(!0), o(B, null, J(t.records.slice(0, 7), (p) => (s(), o("button", {
          key: p.date,
          class: me({ selected: n.value === p.date }),
          "aria-pressed": n.value === p.date,
          onClick: (h) => n.value = p.date
        }, a(p.date), 11, ki))), 128))
      ])) : I("", !0),
      d.value ? (s(), o(B, { key: 2 }, [
        e("section", wi, [
          e("span", $i, [
            U(O, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", _i, a(d.value.date) + " · 饮食回顾", 1),
            e("h2", null, a(u.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, a(u.value.length ? u.value.map((p) => p.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", Ci, [
            e("strong", null, [
              N(a(r.value), 1),
              e("small", null, " / " + a(b(xt).length), 1)
            ]),
            y[5] || (y[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", Ai, [
          e("section", Ii, [
            e("div", Si, [
              y[6] || (y[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              U(O, { name: "chart" })
            ]),
            e("div", xi, [
              (s(!0), o(B, null, J(b(zt), (p) => (s(), o("div", {
                key: p.key,
                class: "vb-coverage-row"
              }, [
                e("span", Ei, [
                  U(O, {
                    name: b(_n)[p.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", Ui, [
                  N(a(p.name), 1),
                  p.key === "snacks" ? (s(), o("small", ji, "可选记录")) : I("", !0)
                ]),
                e("span", Di, [
                  e("i", {
                    style: yn({ width: i(p.key) / m.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: me(["vb-coverage-value", { "is-missing": !i(p.key) }])
                }, a(i(p.key) ? `${Math.round(i(p.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", Pi, [
              U(O, {
                name: "info",
                size: 15
              }),
              y[7] || (y[7] = N("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", Ni, [
            y[8] || (y[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (s(!0), o(B, null, J(v.value, (p) => (s(), o("label", {
              key: p.key,
              class: me(["vb-check-row", { done: g(p.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: g(p.key),
                onChange: (h) => $.$emit("toggle-habit", n.value, p.key)
              }, null, 40, Ti),
              e("span", null, [
                e("strong", null, a(p.title), 1),
                e("small", null, a(p.detail), 1)
              ])
            ], 2))), 128)),
            y[9] || (y[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (s(), o("section", Mi, [
        e("span", Ri, [
          U(O, {
            name: "bowl",
            size: 36
          })
        ]),
        y[11] || (y[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        y[12] || (y[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: y[1] || (y[1] = (p) => $.$emit("navigate", "diary"))
        }, [
          y[10] || (y[10] = N("记录今天的饮食", -1)),
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
          y[13] || (y[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, a(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, a(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: y[2] || (y[2] = (p) => $.$emit("navigate", "about"))
        }, [
          y[14] || (y[14] = N("查看注意事项", -1)),
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
}, tr = { class: "vb-icon-badge" }, nr = /* @__PURE__ */ He({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: l }) {
    const n = t, d = l, i = T(""), { isStale: u } = Kt(), r = H(() => n.reports.filter((v) => !i.value || v.date === i.value));
    function m(v) {
      return n.records.find((g) => g.date === v.date);
    }
    function c(v) {
      return u(v, m(v), n.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[v.status];
    }
    return (v, g) => (s(), o(B, null, [
      t.embedded ? (s(), o("div", qi, [
        g[5] || (g[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", Li, [
          U(O, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": g[1] || (g[1] = ($) => i.value = $),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ie, i.value]
          ])
        ])
      ])) : (s(), o("div", Bi, [
        g[4] || (g[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", Vi, [
          U(O, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": g[0] || (g[0] = ($) => i.value = $),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ie, i.value]
          ])
        ])
      ])),
      g[9] || (g[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给 DeepSeek；照片和备注不随每日分析发送。", -1)),
      i.value ? (s(), o("div", Gi, [
        e("span", null, a(r.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: g[2] || (g[2] = ($) => i.value = "")
        }, "清除日期筛选")
      ])) : I("", !0),
      r.value.length ? (s(), o("div", Ji, [
        (s(!0), o(B, null, J(r.value, ($) => (s(), o("article", {
          key: $.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", Hi, [
            e("span", Ki, [
              U(O, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, a($.date), 1),
              e("small", null, a(new Date($.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: me(["vb-pill", { "needs-update": c($) === "需更新" }])
            }, a(c($)), 3)
          ]),
          e("p", null, a($.result?.summary || $.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          m($) ? b(u)($, m($), t.profile) ? (s(), o("small", Yi, "记录或个人目标已变化，此报告使用的是旧版本。")) : I("", !0) : (s(), o("small", Wi, "对应记录已删除，保留报告快照。")),
          e("div", Xi, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (y) => d("open", $.date, $.id)
            }, [
              g[6] || (g[6] = N("打开报告", -1)),
              U(O, {
                name: "arrow",
                size: 15
              })
            ], 8, Qi),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: $.status === "pending" || !m($),
              onClick: (y) => d("retry", $.date)
            }, "重新分析", 8, Zi)
          ])
        ]))), 128))
      ])) : (s(), o("section", er, [
        e("span", tr, [
          U(O, {
            name: "report",
            size: 25
          })
        ]),
        e("h2", null, a(i.value ? "这一天还没有报告" : "从记录第一餐开始"), 1),
        g[8] || (g[8] = e("p", null, "保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: g[3] || (g[3] = ($) => d("navigate", "diary"))
        }, [
          g[7] || (g[7] = N("去记录饮食", -1)),
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
}, ar = /* @__PURE__ */ He({
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
    return (i, u) => (s(), o(B, null, [
      e("div", sr, [
        u[6] || (u[6] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从饮食回顾到 AI 分析"),
          e("h1", null, "营养摄入分析与不足风险提示"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: u[0] || (u[0] = (r) => n("navigate", "diary"))
        }, [
          U(O, {
            name: "plus",
            size: 17
          }),
          u[5] || (u[5] = N("添加饮食记录 ", -1))
        ])
      ]),
      U(ns, {
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
          onNavigate: u[1] || (u[1] = (r) => n("navigate", r)),
          onToggleHabit: u[2] || (u[2] = (r, m) => n("toggleHabit", r, m))
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
          onRetry: u[3] || (u[3] = (r) => n("retryReport", r)),
          onNavigate: u[4] || (u[4] = (r) => n("navigate", r))
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
}, br = ["src"], fr = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: l }) {
    const n = l, d = T(!1), i = T(null), u = T(null), r = T(""), m = T(!1);
    function c(h) {
      return new Promise((w, _) => {
        const A = URL.createObjectURL(h), R = new Image();
        R.onload = () => w({ image: R, url: A }), R.onerror = () => {
          URL.revokeObjectURL(A), _(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, R.src = A;
      });
    }
    function v(h, w) {
      return new Promise((_, A) => h.toBlob((R) => R ? _(R) : A(new Error("图片处理失败，请重新选择。")), "image/jpeg", w));
    }
    function g(h) {
      return new Promise((w, _) => {
        const A = new FileReader();
        A.onload = () => w(A.result), A.onerror = () => _(new Error("图片读取失败，请重新选择。")), A.readAsDataURL(h);
      });
    }
    async function $(h) {
      let w;
      try {
        const _ = await createImageBitmap(h);
        w = { image: _, width: _.width, height: _.height, cleanup: () => _.close() };
      } catch {
        const _ = await c(h);
        w = { image: _.image, width: _.image.naturalWidth, height: _.image.naturalHeight, cleanup: () => URL.revokeObjectURL(_.url) };
      }
      try {
        const _ = Math.min(1, 1200 / Math.max(w.width, w.height)), A = document.createElement("canvas");
        A.width = Math.max(1, Math.round(w.width * _)), A.height = Math.max(1, Math.round(w.height * _));
        const R = A.getContext("2d");
        if (!R) throw new Error("浏览器暂不支持图片预览。");
        R.drawImage(w.image, 0, 0, A.width, A.height);
        let D = await v(A, 0.76);
        if (D.size > 32e4 && (D = await v(A, 0.58)), D.size > 32e4) {
          const M = document.createElement("canvas");
          M.width = Math.round(A.width * 0.75), M.height = Math.round(A.height * 0.75), M.getContext("2d")?.drawImage(A, 0, 0, M.width, M.height), D = await v(M, 0.58);
        }
        return await g(D);
      } finally {
        w.cleanup();
      }
    }
    async function y(h, w) {
      const _ = h.target, A = _.files?.[0];
      if (_.value = "", !!A) {
        if (r.value = "", !A.type.startsWith("image/") || A.type === "image/svg+xml") {
          r.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if (A.size > 12 * 1024 * 1024) {
          r.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        m.value = !0;
        try {
          const R = await $(A), D = { name: A.name.slice(0, 100), dataUrl: R, source: w, mime: "image/jpeg" };
          n("update:modelValue", D), n("selected", D);
        } catch (R) {
          r.value = R instanceof Error ? R.message : "无法处理这张图片，请重新选择。";
        } finally {
          m.value = !1;
        }
      }
    }
    function p() {
      r.value = "", n("update:modelValue", null);
    }
    return (h, w) => (s(), o("div", ir, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: w[0] || (w[0] = (_) => y(_, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: u,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: w[1] || (w[1] = (_) => y(_, "本地图片"))
      }, null, 544),
      t.modelValue ? (s(), o("div", rr, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: w[2] || (w[2] = (_) => d.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, ur)
        ]),
        e("span", null, [
          e("strong", null, a(t.modelValue.name), 1),
          e("small", null, a(t.modelValue.source) + " · 点击图片查看大图", 1)
        ]),
        e("button", {
          type: "button",
          class: "vb-icon-button",
          "aria-label": "移除照片",
          onClick: p
        }, [
          U(O, {
            name: "close",
            size: 15
          })
        ])
      ])) : I("", !0),
      e("div", dr, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: w[3] || (w[3] = (_) => i.value?.click())
        }, [
          U(O, {
            name: "camera",
            size: 17
          }),
          w[6] || (w[6] = N("拍照", -1))
        ], 8, cr),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: w[4] || (w[4] = (_) => u.value?.click())
        }, [
          U(O, {
            name: "upload",
            size: 17
          }),
          N(a(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, vr)
      ]),
      m.value ? (s(), o("p", mr, "正在准备图片…")) : r.value ? (s(), o("p", pr, a(r.value), 1)) : I("", !0),
      d.value && t.modelValue ? (s(), ve(lt, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: w[5] || (w[5] = (_) => d.value = !1)
      }, {
        default: ot(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, br)
        ]),
        _: 1
      })) : I("", !0)
    ]));
  }
}, gr = { class: "vb-glass vb-photo-card" }, yr = { class: "vb-aside-heading" }, hr = { class: "vb-photo-badge" }, kr = {
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
}, Dr = ["onClick"], Pr = { class: "vb-recognition-weight" }, Nr = ["onUpdate:modelValue", "disabled", "aria-label"], Tr = {
  key: 1,
  class: "vb-data-note"
}, Mr = { class: "vb-recognition-actions" }, Rr = ["disabled"], zr = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object },
  emits: ["confirm"],
  setup(t, { emit: l }) {
    const n = t, d = l, { state: i } = Jt(), u = T(null), r = T("");
    let m = "";
    const c = H(() => n.draft.recognition), v = H(() => {
      const D = c.value?.generatedAt;
      if (!D) return "";
      const M = new Date(D);
      return Number.isNaN(M.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(M);
    }), g = H(() => c.value?.items?.length && !c.value.confirmed && c.value.items.every((D) => D.name?.trim() && Number.isFinite(Number(D.grams)) && Number(D.grams) >= 0.1 && Number(D.grams) <= 5e3));
    re(() => [n.draft.date, n.draft.photoId], async ([D, M]) => {
      r.value = "", u.value = null, n.draft.recognition?.status === "pending" && m !== n.draft.recognition.requestId && (n.draft.recognition = { ...n.draft.recognition, status: "failed", error: "上次识别未完成，请重新识别。" });
      try {
        if (M) {
          const V = await ks("photos", M);
          n.draft.date === D && n.draft.photoId === M && (u.value = V || null);
        } else if (n.legacyPhoto?.dataUrl) {
          const V = { ...n.legacyPhoto, id: crypto.randomUUID(), date: D };
          await Ft("photos", V), n.draft.date === D && (n.draft.photoId = V.id, u.value = V);
        }
      } catch (V) {
        r.value = V.message, u.value = n.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function $(D) {
      u.value = D, D || y();
    }
    async function y() {
      const D = n.draft.photoId;
      if (n.draft.photoId = null, n.draft.recognition = null, m = "", D && !i.records.some((M) => M.photoId === D) && !Object.values(i.drafts).some((M) => M.photoId === D)) try {
        await $s("photos", D);
      } catch (M) {
        r.value = M.message;
      }
    }
    async function p(D) {
      const M = n.draft.date, V = crypto.randomUUID();
      r.value = "";
      try {
        const W = { ...D, id: V, date: M, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await Ft("photos", W), n.draft.date !== M) return;
        u.value = W, n.draft.photoId = V, n.draft.recognition = null, await h(W);
      } catch (W) {
        r.value = W.message;
      }
    }
    async function h(D = u.value) {
      if (!D?.dataUrl || c.value?.status === "pending") return;
      const M = n.draft, V = M.photoId, W = crypto.randomUUID();
      m = W, M.recognition = { requestId: W, photoId: V, status: "pending", items: [], error: "", confirmed: !1 };
      try {
        const z = await Ct("recognize", { image: D.dataUrl, requestId: V || W });
        if (M.photoId !== V || M.recognition?.requestId !== W) return;
        M.recognition = { ...z, requestId: W, photoId: V, status: "complete", error: "", confirmed: !1 };
      } catch (z) {
        M.photoId === V && M.recognition?.requestId === W && (M.recognition = { ...M.recognition, status: "failed", error: z.message });
      } finally {
        m === W && (m = "");
      }
    }
    function w(D, M) {
      D.name = M.target.value, D.foodId = null;
    }
    function _(D, M) {
      D.foodId = M.key, D.name = M.name;
    }
    function A() {
      n.draft.recognition = { ...n.draft.recognition, status: "complete", recognitionId: n.draft.recognition?.recognitionId || crypto.randomUUID(), items: n.draft.recognition?.items || [], confirmed: !1, error: "", note: n.draft.recognition?.note || "手动补充，请核对名称与份量。" }, n.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function R() {
      g.value && d("confirm", { batchId: c.value.recognitionId, items: c.value.items.map((D) => ({ ...D, estimated: !0, source: "photo" })) });
    }
    return (D, M) => (s(), o("section", gr, [
      e("div", yr, [
        M[2] || (M[2] = e("div", null, [
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
      M[6] || (M[6] = e("p", { class: "vb-photo-disclosure" }, "选择照片后自动识别：压缩照片会经本地后端发送给 DeepSeek。照片与识别结果保存在当前浏览器。", -1)),
      U(fr, {
        "model-value": u.value,
        "onUpdate:modelValue": $,
        onSelected: p
      }, null, 8, ["model-value"]),
      r.value ? (s(), o("p", kr, a(r.value), 1)) : I("", !0),
      c.value?.status === "pending" ? (s(), o("div", wr, [...M[3] || (M[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : I("", !0),
      c.value?.status === "failed" ? (s(), o("div", $r, [
        e("p", _r, a(c.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: M[0] || (M[0] = (V) => h())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: A
          }, "手动录入")
        ])
      ])) : I("", !0),
      u.value && !c.value ? (s(), o("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: M[1] || (M[1] = (V) => h())
      }, "开始 AI 识别")) : I("", !0),
      c.value?.status === "complete" ? (s(), o("div", Cr, [
        e("p", Ar, a(c.value.note || "请核对食物名称与份量。") + " 照片重量为估算，营养数值只按确认的数据库条目计算。", 1),
        c.value.model ? (s(), o("small", Ir, [
          N("由 " + a(c.value.model) + " 识别", 1),
          v.value ? (s(), o("span", Sr, " · " + a(v.value), 1)) : I("", !0)
        ])) : I("", !0),
        e("div", xr, [
          (s(!0), o(B, null, J(c.value.items, (V, W) => (s(), o("div", {
            key: V.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: V.name,
                disabled: c.value.confirmed,
                "aria-label": "识别食物" + (W + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (z) => w(V, z)
              }, null, 40, Er),
              c.value.confirmed ? I("", !0) : (s(), o("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (W + 1),
                onClick: (z) => c.value.items.splice(W, 1)
              }, [
                U(O, {
                  name: "close",
                  size: 14
                })
              ], 8, Ur))
            ]),
            !V.foodId && !c.value.confirmed ? (s(), o("div", jr, [
              (s(!0), o(B, null, J(b(Lt)(V.name, 3), (z) => (s(), o("button", {
                key: z.key,
                type: "button",
                onClick: (G) => _(V, z)
              }, a(z.name), 9, Dr))), 128))
            ])) : I("", !0),
            e("label", Pr, [
              M[4] || (M[4] = N("估算可食部", -1)),
              te(e("input", {
                "onUpdate:modelValue": (z) => V.grams = z,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: c.value.confirmed,
                "aria-label": "识别食物" + (W + 1) + "克数",
                placeholder: "克数"
              }, null, 8, Nr), [
                [ie, V.grams]
              ]),
              M[5] || (M[5] = N("克", -1))
            ]),
            e("small", {
              class: me({ "vb-unmatched": !V.foodId })
            }, a(V.foodId ? "数据库：" + b(le)[V.foodId]?.state : "未匹配数据库，营养指标暂无数据"), 3),
            e("small", null, a(V.uncertainty), 1)
          ]))), 128))
        ]),
        c.value.items.length ? I("", !0) : (s(), o("p", Tr, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", Mr, [
          c.value.confirmed ? I("", !0) : (s(), o("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: A
          }, "＋补充遗漏食物")),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !g.value,
            onClick: R
          }, a(c.value.confirmed ? "已加入本次选择" : "确认并加入记录"), 9, Rr)
        ])
      ])) : I("", !0)
    ]));
  }
}, Or = { class: "vb-diary-page" }, Fr = { class: "vb-page-title" }, Br = { class: "vb-date-input" }, Vr = ["max"], qr = {
  key: 0,
  class: "vb-diary-grid"
}, Lr = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, Gr = ["disabled"], Jr = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, Hr = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], Kr = { class: "vb-section-heading" }, Wr = { class: "vb-pill" }, Yr = {
  key: 0,
  class: "vb-selected-list"
}, Xr = {
  key: 1,
  class: "vb-muted-empty"
}, Qr = { class: "vb-section-heading" }, Zr = {
  key: 0,
  class: "vb-history-list"
}, eu = ["aria-label", "onClick"], tu = ["onClick"], nu = ["aria-label", "onClick"], su = {
  key: 1,
  class: "vb-muted-empty"
}, ou = { class: "vb-section-heading" }, lu = { class: "vb-diary-search-row" }, au = { class: "vb-search-field" }, iu = { class: "vb-meal-select" }, ru = ["value"], uu = {
  key: 0,
  class: "vb-search-results"
}, du = ["onClick"], cu = {
  key: 0,
  class: "vb-search-empty"
}, vu = { class: "vb-diary-entry-heading" }, mu = {
  key: 1,
  class: "vb-diary-entries"
}, pu = { class: "vb-diary-entry-title" }, bu = ["onClick"], fu = ["onUpdate:modelValue", "aria-label"], gu = ["aria-label", "onClick"], yu = { class: "vb-data-note" }, hu = {
  key: 0,
  class: "vb-pill"
}, ku = { class: "vb-entry-controls" }, wu = ["onUpdate:modelValue", "aria-label"], $u = { class: "vb-entry-meal" }, _u = ["onUpdate:modelValue"], Cu = ["value"], Au = {
  key: 0,
  class: "vb-inline-warning"
}, Iu = ["onClick"], Su = {
  key: 2,
  class: "vb-muted-empty"
}, xu = ["onToggle"], Eu = { key: 0 }, Uu = ["onClick"], ju = ["onClick"], Du = { class: "vb-field vb-notes-field" }, Pu = { class: "vb-intake-more" }, Nu = { key: 0 }, Tu = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: l }) {
    const n = t, d = l, { state: i, ensureDraft: u, addToDraft: r } = Jt(), { isStale: m } = Kt(), c = et({}), v = et({});
    function g(K = /* @__PURE__ */ new Date()) {
      const F = K.getHours() * 60 + K.getMinutes();
      return F >= 300 && F < 600 ? "breakfast" : F >= 600 && F <= 840 ? "lunch" : F >= 960 && F <= 1260 ? "dinner" : "snack";
    }
    const $ = T(n.initialDate || ke()), y = T(""), p = T(g()), h = T("selected"), w = T(null), _ = T("");
    re(() => n.initialDate, (K) => {
      K && ($.value = K);
    }), re($, (K) => {
      u(K), _.value = "", y.value = "";
    }, { immediate: !0 });
    const A = H(() => i.drafts[$.value]), R = H(() => sn(A.value?.entries)), D = H(() => Lt(y.value, 8)), M = H(() => n.records.find((K) => K.date === $.value)), V = H(() => R.value.length > 0 || !!(M.value && !Array.isArray(A.value?.savedEntries))), W = (K) => n.reports.find((F) => F.date === K), z = /* @__PURE__ */ new Set();
    async function G(K) {
      const F = $.value, P = $e(), q = p.value, C = F + ":" + K.key;
      if (!z.has(C)) {
        z.add(C);
        try {
          if (await qe(K.key), $.value !== F || $e() !== P) return;
          r({ date: F, foodId: K.key, grams: K.grams || 100, meal: q }), y.value = "", h.value = "selected";
        } catch (f) {
          _.value = f.message;
        } finally {
          z.delete(C);
        }
      }
    }
    function Y() {
      A.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: y.value.trim(), grams: 100, meal: p.value, group: "unclassified", source: "manual", referenceConfirmed: !0 }), y.value = "";
    }
    async function ue({ items: K, batchId: F }) {
      const P = $.value, q = $e();
      if (A.value.appliedBatches.includes(F)) return;
      try {
        await qe(K.map((f) => f.foodId));
      } catch (f) {
        _.value = f.message;
        return;
      }
      if ($.value !== P || $e() !== q || A.value.appliedBatches.includes(F)) return;
      const C = sn(K.map((f) => ({ ...f, id: crypto.randomUUID(), meal: p.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: $t(le[f.foodId]) })));
      if (C.length !== K.length) {
        _.value = "请核对每项食物名称与克数。";
        return;
      }
      A.value.entries.push(...C), A.value.appliedBatches.push(F), A.value.recognition.confirmed = !0, h.value = "selected";
    }
    function se() {
      if (n.saving || !V.value) return;
      if (_.value = "", R.value.length !== A.value.entries.length) {
        _.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
        return;
      }
      const K = JSON.parse(JSON.stringify(A.value));
      Array.isArray(K.savedEntries) && (K.entries = [...K.savedEntries, ...K.entries], delete K.savedEntries), d("save", K);
    }
    function ye(K) {
      h.value = K, matchMedia("(max-width:950px)").matches && xe(() => w.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function be(K) {
      const F = ["ArrowRight", "ArrowDown", "End"].includes(K.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(K.key) ? "selected" : null;
      F && (K.preventDefault(), ye(F), xe(() => document.getElementById("vb-tab-" + F)?.focus()));
    }
    function ge(K) {
      const F = W(K.date);
      return F ? m(F, K, n.profile) ? "报告需更新" : F.status === "pending" ? "分析中" : F.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (K, F) => (s(), o("div", Or, [
      e("div", Fr, [
        F[8] || (F[8] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "一餐一记，慢慢更了解自己"),
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", Br, [
          U(O, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": F[0] || (F[0] = (P) => $.value = P),
            type: "date",
            max: b(ke)(),
            "aria-label": "饮食记录日期"
          }, null, 8, Vr), [
            [ie, $.value]
          ])
        ])
      ]),
      A.value ? (s(), o("div", qr, [
        e("aside", Lr, [
          (s(), ve(zr, {
            key: $.value,
            draft: A.value,
            "legacy-photo": M.value?.photo,
            onConfirm: ue
          }, null, 8, ["draft", "legacy-photo"])),
          e("div", {
            class: me(["vb-diary-actions", { "has-analysis": M.value }])
          }, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving || !V.value
            }, [
              N(a(t.saving ? "正在保存…" : "保存记录"), 1),
              U(O, {
                name: "arrow",
                size: 17
              })
            ], 8, Gr),
            M.value ? (s(), o("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: F[1] || (F[1] = (P) => K.$emit("analysis", $.value))
            }, "查看分析")) : I("", !0),
            _.value ? (s(), o("p", Jr, a(_.value), 1)) : I("", !0)
          ], 2),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: be
          }, [
            (s(!0), o(B, null, J([["selected", "本次选择", R.value.length], ["history", "最近记录", t.records.length]], ([P, q, C]) => (s(), o("button", {
              id: "vb-tab-" + P,
              key: P,
              type: "button",
              role: "tab",
              "aria-selected": h.value === P,
              "aria-controls": "vb-panel-" + P,
              tabindex: h.value === P ? 0 : -1,
              class: me({ selected: h.value === P }),
              onClick: (f) => ye(P)
            }, [
              N(a(q), 1),
              e("span", null, a(C), 1)
            ], 10, Hr))), 128))
          ], 32),
          h.value === "selected" ? (s(), o("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: w,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", Kr, [
              e("div", null, [
                F[9] || (F[9] = e("h2", null, "本次选择", -1)),
                e("p", null, a($.value), 1)
              ]),
              e("span", Wr, a(R.value.length) + " 项", 1)
            ]),
            U(qt, {
              entries: R.value,
              compact: ""
            }, null, 8, ["entries"]),
            R.value.length ? (s(), o("div", Yr, [
              (s(!0), o(B, null, J(R.value, (P) => (s(), o("div", {
                key: P.id
              }, [
                e("span", null, [
                  N(a(P.name), 1),
                  e("small", null, a(b(mt).find(([q]) => q === P.meal)?.[1]) + a(P.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  N(a(P.grams), 1),
                  F[10] || (F[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (s(), o("p", Xr, "选择食物后，会在这里汇总。"))
          ], 512)) : (s(), o("section", {
            key: 1,
            id: "vb-panel-history",
            ref_key: "asidePanel",
            ref: w,
            class: "vb-glass vb-aside-panel vb-history-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-history",
            tabindex: "0"
          }, [
            e("div", Qr, [
              F[11] || (F[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              U(O, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (s(), o("div", Zr, [
              (s(!0), o(B, null, J(t.records.slice(0, 12), (P) => (s(), o("div", {
                key: P.date,
                class: "vb-history-item vb-history-with-ai"
              }, [
                e("button", {
                  type: "button",
                  "aria-label": `打开 ${P.date} 的饮食记录`,
                  onClick: (q) => $.value = P.date
                }, [
                  F[12] || (F[12] = e("span", { class: "vb-status-dot" }, null, -1)),
                  e("span", null, [
                    e("strong", null, a(P.date), 1),
                    e("small", null, a(Object.values(P.foods || {}).filter((q) => Number(q) > 0).length) + " 类食物", 1)
                  ])
                ], 8, eu),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (q) => K.$emit("analysis", P.date)
                }, a(ge(P)), 9, tu),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + P.date + "的记录",
                  onClick: (q) => K.$emit("remove", P.date)
                }, [
                  U(O, {
                    name: "close",
                    size: 14
                  })
                ], 8, nu)
              ]))), 128))
            ])) : (s(), o("p", su, "你的第一天记录，从今天开始。"))
          ], 512))
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: Pe(se, ["prevent"])
        }, [
          e("div", ou, [
            F[13] || (F[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: F[2] || (F[2] = (P) => K.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", lu, [
            e("label", au, [
              U(O, {
                name: "search",
                size: 18
              }),
              te(e("input", {
                "onUpdate:modelValue": F[3] || (F[3] = (P) => y.value = P),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: F[4] || (F[4] = Yn(Pe((P) => D.value[0] && G(D.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [ie, y.value]
              ])
            ]),
            e("label", iu, [
              F[14] || (F[14] = e("span", null, "添加到", -1)),
              te(e("select", {
                "onUpdate:modelValue": F[5] || (F[5] = (P) => p.value = P),
                "aria-label": "添加食物的餐次"
              }, [
                (s(!0), o(B, null, J(b(mt), ([P, q]) => (s(), o("option", {
                  key: P,
                  value: P
                }, a(q), 9, ru))), 128))
              ], 512), [
                [Ce, p.value]
              ])
            ])
          ]),
          y.value.trim() ? (s(), o("div", uu, [
            (s(!0), o(B, null, J(D.value, (P) => (s(), o("button", {
              key: P.key,
              type: "button",
              class: "vb-search-result",
              onClick: (q) => G(P)
            }, [
              e("span", null, [
                e("strong", null, a(P.name), 1),
                e("small", null, a(P.state) + " · " + a(P.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              U(O, {
                name: "plus",
                size: 17
              })
            ], 8, du))), 128)),
            D.value.length ? I("", !0) : (s(), o("p", cu, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: Y
            }, [
              N("手动添加“" + a(y.value) + "”", 1),
              U(O, {
                name: "plus",
                size: 16
              })
            ])
          ])) : I("", !0),
          e("div", vu, [
            e("h3", null, [
              F[15] || (F[15] = N("已选食物 ", -1)),
              e("small", null, a(A.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: Y
            }, "＋手动添加")
          ]),
          A.value.entries.length ? (s(), o("div", mu, [
            (s(!0), o(B, null, J(A.value.entries, (P, q) => (s(), o("article", {
              key: P.id,
              class: "vb-diary-entry"
            }, [
              e("div", pu, [
                P.foodId ? (s(), o("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (C) => K.$emit("detail", P.foodId)
                }, [
                  N(a(b(At)(b(le)[P.foodId]) || P.name), 1),
                  U(O, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, bu)) : te((s(), o("input", {
                  key: 1,
                  "onUpdate:modelValue": (C) => P.name = C,
                  "aria-label": "手动食物" + (q + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 8, fu)), [
                  [ie, P.name]
                ]),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (q + 1),
                  onClick: (C) => A.value.entries.splice(q, 1)
                }, [
                  U(O, {
                    name: "close",
                    size: 15
                  })
                ], 8, gu)
              ]),
              e("p", yu, [
                N(a(P.foodId ? b(le)[P.foodId]?.state : "手动条目，暂无营养数据") + a(P.estimated ? " · 份量为估算" : ""), 1),
                P.nutritionSnapshot?.dataType === "ai-estimate" ? (s(), o("span", hu, "含AI估算")) : I("", !0)
              ]),
              U(Mn, {
                food: b(le)[P.foodId],
                onChoose: (C) => {
                  P.grams = C, P.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", ku, [
                e("label", null, [
                  F[16] || (F[16] = N("可食部重量", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (C) => P.grams = C,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (b(le)[P.foodId]?.name || P.name || "食物") + "克数"
                  }, null, 8, wu), [
                    [ie, P.grams]
                  ]),
                  F[17] || (F[17] = e("small", null, "克", -1))
                ]),
                e("label", $u, [
                  F[18] || (F[18] = e("span", null, "餐次", -1)),
                  te(e("select", {
                    "onUpdate:modelValue": (C) => P.meal = C
                  }, [
                    (s(!0), o(B, null, J(b(mt), ([C, f]) => (s(), o("option", {
                      key: C,
                      value: C
                    }, a(f), 9, Cu))), 128))
                  ], 8, _u), [
                    [Ce, P.meal]
                  ])
                ])
              ]),
              P.referenceConfirmed === !1 ? (s(), o("p", Au, [
                F[19] || (F[19] = N("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                b(le)[P.foodId]?.source ? (s(), o("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (C) => P.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, Iu)) : (s(), o("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: F[6] || (F[6] = (C) => K.$emit("browse"))
                }, "查找具体食物"))
              ])) : I("", !0)
            ]))), 128))
          ])) : (s(), o("p", Su, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (s(!0), o(B, null, J(b(zt), (P) => (s(), o("details", {
            key: P.key,
            class: "vb-diary-food-group",
            onToggle: (q) => c[P.key] = q.target.open
          }, [
            e("summary", null, [
              U(O, {
                name: b(_n)[P.key],
                size: 18
              }, null, 8, ["name"]),
              N(a(P.name), 1),
              e("small", null, a(P.items.length) + " 个条目", 1),
              U(O, {
                name: "chevron",
                size: 14
              })
            ]),
            c[P.key] ? (s(), o("div", Eu, [
              (s(!0), o(B, null, J(P.items.slice(0, v[P.key] || 24), ([q, C]) => (s(), o("button", {
                key: q,
                type: "button",
                onClick: (f) => G(b(le)[q])
              }, a(C) + " ＋", 9, Uu))), 128)),
              P.items.length > (v[P.key] || 24) ? (s(), o("button", {
                key: 0,
                type: "button",
                onClick: (q) => v[P.key] = (v[P.key] || 24) + 24
              }, "再显示24项", 8, ju)) : I("", !0)
            ])) : I("", !0)
          ], 40, xu))), 128)),
          e("label", Du, [
            F[20] || (F[20] = N("补充备注 ", -1)),
            F[21] || (F[21] = e("span", null, "可选，不发送给 AI", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": F[7] || (F[7] = (P) => A.value.notes = P),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [ie, A.value.notes]
            ])
          ]),
          e("details", Pu, [
            F[22] || (F[22] = e("summary", null, "查看记录依据", -1)),
            F[23] || (F[23] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (s(!0), o(B, null, J(R.value, (P) => (s(), o("p", {
              key: P.id
            }, [
              N(a(P.name) + "：" + a(P.nutritionSnapshot?.source?.name || P.nutritionSnapshot?.estimate?.model || "原目录数据"), 1),
              P.nutritionSnapshot?.estimate ? (s(), o("span", Nu, " · " + a(P.nutritionSnapshot.estimate.assumption), 1)) : I("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : I("", !0)
    ]));
  }
}, Mu = { class: "vb-food-card vb-glass" }, Ru = ["aria-label"], zu = { class: "vb-food-card-copy" }, Ou = { class: "vb-small-label" }, Fu = { key: 0 }, Bu = { key: 0 }, Vu = {
  key: 1,
  class: "vb-food-composition-note"
}, qu = { class: "vb-food-card-bottom" }, Lu = ["aria-pressed"], fn = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const l = t;
    re(() => l.food.key, (u) => {
      qe(u).catch(() => {
      });
    }, { immediate: !0 });
    const { photo: n, loading: d, failed: i } = Tn(() => l.food);
    return (u, r) => (s(), o("article", Mu, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: r[0] || (r[0] = (m) => u.$emit("detail", t.food.key))
      }, [
        U(Yt, {
          food: t.food,
          photo: b(n),
          loading: b(d),
          failed: b(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", zu, [
          e("span", Ou, a(t.food.categoryName), 1),
          e("h3", null, a(b(At)(t.food)), 1),
          e("p", null, a(b(Wt)(t.food)), 1),
          t.food.source ? (s(), o("dl", Fu, [
            (s(!0), o(B, null, J(b(Ee), (m) => (s(), o("div", {
              key: m.id
            }, [
              e("dt", null, a(m.id === "carbs" ? "碳水" : m.name), 1),
              e("dd", null, [
                N(a(b(De)(t.food.nutrients[m.id])), 1),
                t.food.nutrients[m.id] != null ? (s(), o("small", Bu, a(m.unit), 1)) : I("", !0)
              ])
            ]))), 128))
          ])) : (s(), o("p", Vu, [
            r[3] || (r[3] = N("按实际配方记录份量", -1)),
            r[4] || (r[4] = e("br", null, null, -1)),
            N(a(b($n).estimates?.[t.food.key] ? "已保存AI单值估算 · 查看假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, Ru),
      e("div", qu, [
        e("span", null, a(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (s(), o("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: me({ selected: t.compared }),
          onClick: r[2] || (r[2] = (m) => u.$emit("compare", t.food.key))
        }, [
          U(O, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          N(a(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, Lu)) : (s(), o("button", {
          key: 0,
          type: "button",
          onClick: r[1] || (r[1] = (m) => u.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, Gu = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), Ju = { class: "vb-food-hub" }, Hu = { class: "vb-page-title" }, Ku = ["aria-expanded"], Wu = { class: "vb-glass vb-food-search-hero" }, Yu = { class: "vb-icon-badge" }, Xu = { class: "vb-food-search-input" }, Qu = {
  key: 1,
  class: "vb-food-suggestions"
}, Zu = ["onClick"], ed = { class: "vb-recommended" }, td = ["onClick"], nd = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, sd = { class: "vb-section-heading" }, od = {
  key: 0,
  class: "vb-comparison-chips"
}, ld = ["onClick"], ad = { class: "vb-field" }, id = { class: "vb-ask-bottom" }, rd = ["disabled"], ud = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, dd = {
  key: 2,
  class: "vb-ai-answer"
}, cd = {
  key: 0,
  class: "vb-data-note"
}, vd = { class: "vb-answer-foods" }, md = ["onClick"], pd = { class: "vb-data-note" }, bd = { class: "vb-data-note" }, fd = {
  key: 1,
  class: "vb-compare-bar"
}, gd = ["onClick"], yd = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, hd = { class: "vb-food-results-grid" }, kd = { class: "vb-section-heading vb-category-heading" }, wd = { class: "vb-food-category-grid" }, $d = ["onClick"], _d = ["src", "alt"], Cd = { class: "vb-food-results-top" }, Ad = { class: "vb-food-filter" }, Id = { key: 0 }, Sd = ["onClick"], xd = { key: 1 }, Ed = ["value"], Ud = { class: "vb-food-results-grid" }, jd = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, Dd = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, Pd = ["disabled"], Nd = ["disabled"], Td = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, Md = { class: "vb-reference-sample-list" }, Rd = ["onClick"], zd = { key: 0 }, Od = { class: "vb-food-source-note" }, Fd = ["href"], Bd = ["href"], Vd = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const l = T(""), n = T(""), d = T(""), i = T(""), u = T("relevance"), r = T(1), m = T(!1), c = T([]), v = T(""), g = T(!1), $ = T(""), y = T(!1), p = T(null), h = T(""), w = Et, _ = new Set(Et.map((q) => q.key)), A = new Set(ss.map((q) => q.key)), R = H(() => n.value ? Ut(n.value).map((q) => q.food).filter((q) => A.has(q.key) && !_.has(q.key)) : []);
    function D(q, C = Je.length) {
      return Ut(q).map((f) => f.food).filter((f) => _.has(f.key)).slice(0, C);
    }
    const M = H(() => l.value.trim() ? D(l.value, Je.length).slice(0, 5) : []), V = (q) => w.filter((C) => C.category === q).length, W = Et.length, z = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((q) => {
      const C = Ut(q).map((f) => f.food).filter((f) => _.has(f.key));
      return C.find((f) => f.source) || C[0];
    }).filter(Boolean).map((q) => [q.key, q])).values()], G = H(() => {
      let q = n.value ? D(n.value) : [...w].sort((C, f) => +!C.source - +!f.source);
      return d.value && (q = q.filter((C) => C.category === d.value)), q;
    }), Y = H(() => [...new Set(G.value.map((q) => q.subcategory))]), ue = H(() => {
      let q = G.value.filter((C) => !i.value || C.subcategory === i.value);
      if (u.value !== "relevance") {
        const [C, f] = u.value.split(":");
        q = [...q].sort((k, j) => {
          if (C === "name") return k.name.localeCompare(j.name, "zh");
          const oe = k.nutrients[C], ae = j.nutrients[C];
          return oe == null || ae == null ? +(oe == null) - +(ae == null) : (f === "asc" ? 1 : -1) * (oe - ae);
        });
      }
      return q;
    }), se = H(() => Math.max(1, Math.ceil(ue.value.length / 12))), ye = H(() => ue.value.slice((r.value - 1) * 12, r.value * 12));
    re([i, u], () => r.value = 1);
    function be(q = l.value) {
      l.value = q.trim(), n.value = l.value, d.value = "", i.value = "", r.value = 1, m.value = !1;
    }
    function ge(q) {
      d.value = q, n.value = "", l.value = "", i.value = "", r.value = 1, u.value = "relevance";
    }
    function K() {
      d.value = "", n.value = "", l.value = "", i.value = "", r.value = 1;
    }
    function F(q) {
      v.value = "", c.value.includes(q) ? c.value = c.value.filter((C) => C !== q) : c.value.length < 2 ? c.value.push(q) : v.value = "每次选择两种食物进行比较。";
    }
    async function P() {
      if (!(y.value || !$.value.trim())) {
        y.value = !0, h.value = "", p.value = null;
        try {
          p.value = await Ct("ask", { question: $.value.trim(), foodIds: c.value });
        } catch (q) {
          h.value = q.message;
        } finally {
          y.value = !1;
        }
      }
    }
    return (q, C) => (s(), o("div", Ju, [
      e("div", Hu, [
        e("div", null, [
          C[14] || (C[14] = e("p", { class: "vb-eyebrow" }, "从认识食物开始", -1)),
          C[15] || (C[15] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, a(b(W).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": g.value,
          onClick: C[0] || (C[0] = (f) => g.value = !g.value)
        }, [
          U(O, {
            name: "sparkles",
            size: 17
          }),
          C[16] || (C[16] = N("问 AI", -1))
        ], 8, Ku)
      ]),
      e("section", Wu, [
        e("span", Yu, [
          U(O, {
            name: "search",
            size: 23
          })
        ]),
        C[19] || (C[19] = e("div", null, [
          e("h2", null, "今天想了解哪一种食物？"),
          e("p", null, "名称、别名都能查。营养数据统一按每 100 克可食部展示。")
        ], -1)),
        e("form", {
          class: "vb-food-search-form",
          onSubmit: C[3] || (C[3] = Pe((f) => be(), ["prevent"]))
        }, [
          e("div", Xu, [
            U(O, {
              name: "search",
              size: 19
            }),
            te(e("input", {
              "onUpdate:modelValue": C[1] || (C[1] = (f) => l.value = f),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: C[2] || (C[2] = (f) => m.value = !0)
            }, null, 544), [
              [ie, l.value]
            ]),
            l.value ? (s(), o("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: K
            }, [
              U(O, {
                name: "close",
                size: 15
              })
            ])) : I("", !0),
            m.value && M.value.length ? (s(), o("div", Qu, [
              (s(!0), o(B, null, J(M.value, (f) => (s(), o("button", {
                key: f.key,
                type: "button",
                onClick: (k) => be(f.name)
              }, [
                N(a(f.name), 1),
                e("small", null, a(f.state), 1)
              ], 8, Zu))), 128))
            ])) : I("", !0)
          ]),
          C[17] || (C[17] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", ed, [
          C[18] || (C[18] = e("span", null, "推荐搜索", -1)),
          (s(), o(B, null, J(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (f) => e("button", {
            key: f,
            type: "button",
            onClick: (k) => be(f)
          }, a(f), 9, td)), 64))
        ])
      ]),
      g.value ? (s(), o("section", nd, [
        e("div", sd, [
          C[20] || (C[20] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          U(O, { name: "sparkles" })
        ]),
        C[24] || (C[24] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给 DeepSeek。数值来自食物库，AI 负责解释。", -1)),
        c.value.length ? (s(), o("div", od, [
          (s(!0), o(B, null, J(c.value, (f) => (s(), o("button", {
            key: f,
            type: "button",
            onClick: (k) => F(f)
          }, a(b(le)[f].name) + " ×", 9, ld))), 128))
        ])) : I("", !0),
        e("form", {
          onSubmit: Pe(P, ["prevent"])
        }, [
          e("label", ad, [
            C[21] || (C[21] = N("你的问题", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": C[4] || (C[4] = (f) => $.value = f),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [ie, $.value]
            ])
          ]),
          e("div", id, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: C[5] || (C[5] = (f) => $.value = c.value.length === 2 ? "这两种食物的蛋白质有什么区别？" : "100 克香蕉大约有多少热量？")
            }, "填入示例问题"),
            e("button", {
              type: "submit",
              class: "vb-button vb-button-primary",
              disabled: y.value || !$.value.trim()
            }, a(y.value ? "正在查询与分析…" : "发送问题"), 9, rd)
          ])
        ], 32),
        h.value ? (s(), o("p", ud, a(h.value), 1)) : I("", !0),
        p.value ? (s(), o("div", dd, [
          C[22] || (C[22] = e("h3", null, "数据库数值", -1)),
          p.value.database.length ? I("", !0) : (s(), o("p", cd, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", vd, [
            (s(!0), o(B, null, J(p.value.database, (f) => (s(), o("button", {
              key: f.id,
              type: "button",
              onClick: (k) => q.$emit("detail", f.id)
            }, [
              e("strong", null, a(f.name) + " →", 1),
              e("span", null, a(f.grams) + " 克可食部 · 热量 " + a(b(De)(f.portion.energy)) + a(f.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + a(b(De)(f.portion.protein)) + a(f.portion.protein != null ? " g" : ""), 1),
              e("small", null, a(f.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, md))), 128))
          ]),
          C[23] || (C[23] = e("h3", null, "AI 解释", -1)),
          e("p", null, a(p.value.answer.summary), 1),
          e("p", null, a(p.value.answer.explanation), 1),
          e("p", pd, a(p.value.answer.limitations), 1),
          e("small", bd, a(p.value.model) + " · " + a(new Date(p.value.generatedAt).toLocaleString()), 1)
        ])) : I("", !0)
      ])) : I("", !0),
      c.value.length ? (s(), o("div", fd, [
        e("span", null, "已选 " + a(c.value.length) + " 种食物", 1),
        (s(!0), o(B, null, J(c.value, (f) => (s(), o("button", {
          key: f,
          onClick: (k) => F(f)
        }, a(b(le)[f].name) + " ×", 9, gd))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: C[6] || (C[6] = (f) => {
            g.value = !0, $.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : I("", !0),
      v.value ? (s(), o("p", yd, a(v.value), 1)) : I("", !0),
      !d.value && !n.value ? (s(), o(B, { key: 3 }, [
        C[26] || (C[26] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物"),
            e("p", null, "从你熟悉的食材开始。")
          ])
        ], -1)),
        e("div", hd, [
          (s(), o(B, null, J(z, (f) => U(fn, {
            key: f.key,
            food: f,
            compared: c.value.includes(f.key),
            onDetail: C[7] || (C[7] = (k) => q.$emit("detail", k)),
            onCompare: F
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", kd, [
          e("div", null, [
            C[25] || (C[25] = e("h2", null, "按类别探索", -1)),
            e("p", null, a(b(w).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", wd, [
          (s(!0), o(B, null, J(b(os).filter((f) => V(f.id) > 0), (f) => (s(), o("button", {
            key: f.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: (k) => ge(f.id)
          }, [
            e("img", {
              src: f.image,
              alt: f.name + "分类示意图",
              loading: "lazy"
            }, null, 8, _d),
            e("span", null, [
              e("small", null, a(V(f.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, a(f.name), 1),
              e("em", null, [
                N(a(f.description) + " ", 1),
                U(O, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, $d))), 128))
        ]),
        C[27] || (C[27] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (s(), o(B, { key: 4 }, [
        e("div", Cd, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: K
          }, [
            U(O, {
              name: "back",
              size: 15
            }),
            C[28] || (C[28] = N("分类总览", -1))
          ]),
          e("h2", null, a(d.value ? b(on)[d.value].name : "“" + n.value + "”的食物照片与营养资料"), 1),
          e("span", null, a(ue.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", Ad, [
          Y.value.length <= 10 ? (s(), o("div", Id, [
            e("button", {
              class: me({ selected: !i.value }),
              onClick: C[8] || (C[8] = (f) => i.value = "")
            }, "全部", 2),
            (s(!0), o(B, null, J(Y.value, (f) => (s(), o("button", {
              key: f,
              class: me({ selected: i.value === f }),
              onClick: (k) => i.value = f
            }, a(f), 11, Sd))), 128))
          ])) : (s(), o("label", xd, [
            C[30] || (C[30] = N("筛选", -1)),
            te(e("select", {
              "onUpdate:modelValue": C[9] || (C[9] = (f) => i.value = f),
              "aria-label": "食物类型筛选"
            }, [
              C[29] || (C[29] = e("option", { value: "" }, "全部类型", -1)),
              (s(!0), o(B, null, J(Y.value, (f) => (s(), o("option", {
                key: f,
                value: f
              }, a(f), 9, Ed))), 128))
            ], 512), [
              [Ce, i.value]
            ])
          ])),
          e("label", null, [
            C[32] || (C[32] = N("排序", -1)),
            te(e("select", {
              "onUpdate:modelValue": C[10] || (C[10] = (f) => u.value = f),
              "aria-label": "食物营养指标排序"
            }, [...C[31] || (C[31] = [
              hn('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [Ce, u.value]
            ])
          ])
        ]),
        e("div", Ud, [
          (s(!0), o(B, null, J(ye.value, (f) => (s(), ve(fn, {
            key: f.key,
            food: f,
            compared: c.value.includes(f.key),
            onDetail: C[11] || (C[11] = (k) => q.$emit("detail", k)),
            onCompare: F
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        ue.value.length ? I("", !0) : (s(), o("div", jd, [
          U(O, {
            name: "search",
            size: 34
          }),
          C[33] || (C[33] = e("h2", null, "没有找到匹配的食物", -1)),
          C[34] || (C[34] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: K
          }, "返回食物总览")
        ])),
        se.value > 1 ? (s(), o("nav", Dd, [
          e("button", {
            disabled: r.value === 1,
            onClick: C[12] || (C[12] = (f) => r.value--)
          }, "上一页", 8, Pd),
          e("span", null, "第 " + a(r.value) + " / " + a(se.value) + " 页", 1),
          e("button", {
            disabled: r.value === se.value,
            onClick: C[13] || (C[13] = (f) => r.value++)
          }, "下一页", 8, Nd)
        ])) : I("", !0)
      ], 64)),
      n.value && R.value.length ? (s(), o("details", Td, [
        e("summary", null, "其他营养数据样本 · " + a(R.value.length.toLocaleString()) + " 条", 1),
        C[35] || (C[35] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", Md, [
          (s(!0), o(B, null, J(R.value.slice(0, 80), (f) => (s(), o("button", {
            key: f.key,
            type: "button",
            onClick: (k) => q.$emit("detail", f.key)
          }, [
            e("strong", null, a(f.name), 1),
            e("span", null, a(f.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, Rd))), 128))
        ]),
        R.value.length > 80 ? (s(), o("p", zd, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : I("", !0)
      ])) : I("", !0),
      e("details", Od, [
        C[36] || (C[36] = e("summary", null, "数据口径与图片署名", -1)),
        C[37] || (C[37] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        C[38] || (C[38] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        C[39] || (C[39] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        C[40] || (C[40] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (s(!0), o(B, null, J(b(Gu), (f) => (s(), o("li", {
            key: f.key
          }, [
            N(a(b(on)[f.key]?.name) + "：", 1),
            e("a", {
              href: f.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, a(f.title), 9, Fd),
            N(" · " + a(f.author) + " · ", 1),
            e("a", {
              href: f.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, a(f.license), 9, Bd),
            N(" · " + a(f.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function qd(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function Ld() {
  const t = T(""), l = T((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), n = T("lunch"), d = T(null), i = T(""), u = T(!1), r = T([]);
  async function m(v, g, $ = {}) {
    if (u.value) return;
    i.value = "", d.value = null, u.value = !0, r.value = [];
    const y = v ? {
      sex: v.sex,
      age: v.age,
      height: v.height,
      weight: v.weight,
      activity: v.activity,
      ageMonths: v.ageMonths,
      physiologicalStage: v.physiologicalStage
    } : null;
    try {
      d.value = await _s({
        goal: t.value.slice(0, 500),
        date: l.value,
        meal: n.value,
        profile: y,
        conditions: $.conditions,
        recordContext: $.recordContext,
        ...g ? {
          personalization: {
            preferences: g.preferences?.slice(0, 200),
            safetyFlags: g.safetyFlags?.slice(0, 4)
          }
        } : {}
      }, (p) => r.value.push(p));
    } catch (p) {
      i.value = qd(p);
    } finally {
      u.value = !1;
    }
  }
  function c() {
    d.value = null, i.value = "", r.value = [];
  }
  return { goal: t, date: l, meal: n, response: d, error: i, busy: u, progress: r, run: m, clear: c };
}
const Gd = [
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
function gn(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const l = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (l !== null && (!Number.isFinite(l) || l <= 0 || l > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const n = (Array.isArray(t.avoids) ? t.avoids.join("、") : Mt(t.avoids)).split(/[,，、;；\n]+/).map((u) => u.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (n.length > 12 || n.some((u) => u.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const d = t.availableFoods ?? [];
  if (!Array.isArray(d) || d.length > 12) throw new Error("可选食物最多12项。");
  const i = d.map((u) => {
    const r = le[u?.foodId], m = Number(u?.grams), c = u?.price === null || u?.price === void 0 || u?.price === "" ? null : Number(u.price);
    if (!r || !Number.isFinite(m) || m < 0.1 || m > 5e3 || c !== null && (!Number.isFinite(c) || c < 0 || c > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: r.key, name: r.name, grams: m, price: c };
  });
  if (new Set(i.map((u) => u.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: l, avoids: [...new Set(n)], preferences: Mt(t.preferences, 200), exercise: Mt(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function On(t, l = []) {
  const n = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), d = dt(n);
  return l.filter((i) => {
    const u = /* @__PURE__ */ new Set([i]);
    for (const r of Gd) if (r.some((m) => dt(m) === dt(i))) for (const m of r) u.add(m);
    return [...u].some((r) => /^[a-z ]+$/i.test(r) ? new RegExp("\\b" + r.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(n) : d.includes(dt(r)));
  });
}
function Jd(t, l) {
  return !!t && !["13", "17"].includes(t.category) && !On(t, l.avoids).length && (!l.onlyAvailable || l.availableFoods.some((n) => n.foodId === t.key));
}
function Hd(t, l) {
  const n = t.map((u) => {
    const r = l.availableFoods.find((c) => c.foodId === u.foodId), m = r?.price != null ? Math.round(r.price * u.grams / r.grams * 100) / 100 : null;
    return { foodId: u.foodId, cost: m, priceBasis: r?.price != null ? { price: r.price, grams: r.grams } : null };
  }), d = n.every((u) => u.cost !== null), i = Math.round(n.reduce((u, r) => u + (r.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: l.budget, complete: d, knownSubtotal: i, total: d ? i : null, status: d ? l.budget === null ? "no_budget" : i > l.budget ? "over_budget" : "within_budget" : "unknown", breakdown: n, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: l.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const Kd = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, Wd = { class: "vb-agent-heading" }, Yd = { class: "vb-icon-badge" }, Xd = { class: "vb-campus-fields" }, Qd = ["max", "disabled"], Zd = ["disabled"], ec = ["value"], tc = ["disabled"], nc = ["disabled"], sc = { class: "vb-analysis-tabs" }, oc = ["disabled"], lc = ["disabled", "onClick"], ac = { class: "vb-more-conditions" }, ic = { class: "vb-agent-goal" }, rc = ["disabled"], uc = { class: "vb-campus-fields" }, dc = ["disabled"], cc = ["disabled"], vc = { class: "vb-campus-candidates" }, mc = { class: "vb-candidate-search" }, pc = ["disabled"], bc = ["disabled"], fc = ["value"], gc = ["disabled"], yc = { class: "vb-candidate-list" }, hc = ["onUpdate:modelValue", "disabled"], kc = ["onUpdate:modelValue", "disabled"], wc = ["disabled", "onClick"], $c = {
  key: 0,
  class: "vb-agent-context-optin"
}, _c = ["disabled"], Cc = { class: "vb-agent-context-optin" }, Ac = ["disabled"], Ic = { class: "vb-agent-context-optin" }, Sc = ["disabled"], xc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Ec = ["disabled"], Uc = {
  key: 0,
  class: "vb-loading-ring"
}, jc = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, Dc = { key: 0 }, Pc = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, Nc = ["disabled"], Tc = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, Mc = {
  key: 3,
  class: "vb-agent-plan"
}, Rc = { class: "vb-agent-plan-heading" }, zc = { class: "vb-eyebrow" }, Oc = { class: "vb-data-note" }, Fc = { key: 0 }, Bc = { key: 1 }, Vc = { class: "vb-agent-items" }, qc = { class: "vb-agent-item-title" }, Lc = ["onClick"], Gc = ["onClick"], Jc = {
  key: 0,
  class: "vb-candidate-search"
}, Hc = ["value"], Kc = ["disabled", "onClick"], Wc = { key: 0 }, Yc = { class: "vb-agent-grams" }, Xc = ["value", "onInput"], Qc = { class: "vb-agent-evidence" }, Zc = { class: "vb-agent-source" }, ev = ["href"], tv = { key: 1 }, nv = { key: 0 }, sv = {
  key: 1,
  class: "vb-agent-notes"
}, ov = {
  key: 2,
  class: "vb-agent-notes is-caution"
}, lv = { class: "vb-agent-trace" }, av = { class: "vb-agent-confirm" }, iv = ["disabled"], rv = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: l }) {
    const n = t, d = l, { goal: i, date: u, meal: r, response: m, error: c, busy: v, progress: g, run: $, clear: y } = Ld();
    i.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const p = et({ budget: "", avoids: "", preferences: n.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), h = T(-1), w = T(""), _ = T(!1), A = T(!0), R = T(!1), D = T(""), M = T(""), V = T(""), W = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], z = H(() => M.value.trim() ? Lt(M.value, 8) : []), G = H(() => tt((n.records || []).find((f) => f.date === u.value))), Y = H(() => m.value?.status === "ready" ? m.value : null), ue = H(() => (Y.value?.plan.items || []).map((f, k) => ({ id: "agent-" + k, foodId: f.foodId, name: f.name, grams: f.grams, meal: f.meal, group: le[f.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), se = H(() => Y.value ? Hd(Y.value.plan.items, Y.value.conditions) : null), ye = H(() => !Y.value || !Y.value.plan.items.length || se.value?.status === "over_budget" || Y.value.plan.items.some((f) => !Number.isFinite(f.grams) || f.grams < 0.1 || f.grams > 5e3));
    re([i, u, r, p, A, R, () => n.profile, () => n.records], () => {
      !v.value && m.value && y(), _.value = !1;
    }, { deep: !0 }), re(() => n.preferences, (f) => p.preferences = f || "");
    function be() {
      const f = le[V.value];
      if (D.value = "", !!f) {
        if (p.availableFoods.some((k) => k.foodId === f.key)) {
          D.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (p.availableFoods.length >= 12) {
          D.value = "最多加入12项备选食物。";
          return;
        }
        p.availableFoods.push({ foodId: f.key, name: f.name, grams: 100, price: "" }), V.value = "", M.value = "";
      }
    }
    async function ge() {
      D.value = "", _.value = !1;
      let f;
      try {
        await qe(p.availableFoods.map((j) => j.foodId)), f = gn(p);
        const k = f.availableFoods.find((j) => On(le[j.foodId], f.avoids).length);
        if (k) throw Error("备选食物“" + k.name + "”命中回避项，请先移除或修改条件。");
      } catch (k) {
        D.value = k.message;
        return;
      }
      await $(n.profile, R.value ? { safetyFlags: (n.flags || []).filter((k) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes(k)) } : void 0, { conditions: f, ...A.value ? { recordContext: { date: u.value, entries: G.value.map((k) => ({ foodId: k.foodId, name: k.name, grams: k.grams, meal: k.meal, referenceConfirmed: k.referenceConfirmed })) } } : {} });
    }
    function K() {
      ye.value || _.value || (_.value = !0, d("confirm", { confirmationId: Y.value.confirmationId, date: Y.value.date, meal: Y.value.meal, items: Y.value.plan.items, onResult: (f) => {
        _.value = f.ok, f.ok || (D.value = f.error || "加入草稿失败，请重试。");
      } }));
    }
    function F(f, k) {
      Y.value && (Y.value.plan.items[f].grams = Number(k), Y.value.plan.items[f].portion = ln(le[Y.value.plan.items[f].foodId], Number(k)), _.value = !1);
    }
    const P = H(() => {
      let f;
      try {
        f = gn(p);
      } catch {
        return [];
      }
      return (f.availableFoods.length && f.onlyAvailable ? f.availableFoods.map((j) => le[j.foodId]) : Je).filter((j) => j && !j.__summary && j.source && Jd(j, f) && !Y.value?.plan.items.some((oe) => oe.foodId === j.key)).slice(0, 60);
    });
    function q(f) {
      const k = le[w.value];
      if (!k || !P.value.some((oe) => oe.key === k.key)) return;
      const j = Y.value.plan.items[f];
      Y.value.plan.items[f] = { ...j, foodId: k.key, name: k.name, portion: ln(k, j.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: k.source?.name || "", source: k.source?.id || "", missing: [] }, _.value = !1, h.value = -1, w.value = "";
    }
    const C = (f) => typeof f == "number" && Number.isFinite(f) ? f.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (f, k) => (s(), o("section", Kd, [
      e("header", Wd, [
        e("span", Yd, [
          U(O, {
            name: "sparkles",
            size: 21
          })
        ]),
        k[15] || (k[15] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "家庭、外食与食堂 · 有依据的营养决策"),
          e("h2", { id: "meal-agent-title" }, "安排我的下一餐"),
          e("p", null, "说清预算和回避项，结合你的备选食物检索与计算。方案先核对，实际吃过后再记录。")
        ], -1))
      ]),
      e("form", {
        class: "vb-agent-form",
        onSubmit: Pe(ge, ["prevent"])
      }, [
        e("div", Xd, [
          e("label", null, [
            k[16] || (k[16] = N("日期", -1)),
            te(e("input", {
              "onUpdate:modelValue": k[0] || (k[0] = (j) => St(u) ? u.value = j : null),
              type: "date",
              max: b(ke)(),
              disabled: b(v)
            }, null, 8, Qd), [
              [ie, b(u)]
            ])
          ]),
          e("label", null, [
            k[17] || (k[17] = N("餐次", -1)),
            te(e("select", {
              "onUpdate:modelValue": k[1] || (k[1] = (j) => St(r) ? r.value = j : null),
              disabled: b(v)
            }, [
              (s(), o(B, null, J(W, ([j, oe]) => e("option", {
                key: j,
                value: j
              }, a(oe), 9, ec)), 64))
            ], 8, Zd), [
              [Ce, b(r)]
            ])
          ]),
          e("label", null, [
            k[18] || (k[18] = N("预算（元，可选）", -1)),
            te(e("input", {
              "onUpdate:modelValue": k[2] || (k[2] = (j) => p.budget = j),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: b(v)
            }, null, 8, tc), [
              [ie, p.budget]
            ])
          ]),
          e("label", null, [
            k[19] || (k[19] = N("不吃的食物", -1)),
            te(e("input", {
              "onUpdate:modelValue": k[3] || (k[3] = (j) => p.avoids = j),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: b(v)
            }, null, 8, nc), [
              [ie, p.avoids]
            ])
          ])
        ]),
        e("div", sc, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: b(v),
            onClick: k[4] || (k[4] = (j) => p.budget = "15")
          }, "预算15元", 8, oc),
          (s(), o(B, null, J(["清淡", "素食偏好"], (j) => e("button", {
            key: j,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: b(v),
            onClick: (oe) => p.preferences = j
          }, a(j), 9, lc)), 64)),
          e("span", null, "已选偏好：" + a(p.preferences || "未设置"), 1)
        ]),
        e("details", ac, [
          k[29] || (k[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", ic, [
            k[20] || (k[20] = e("span", null, "这餐想怎么安排？", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": k[5] || (k[5] = (j) => St(i) ? i.value = j : null),
              rows: "2",
              maxlength: "500",
              disabled: b(v),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, rc), [
              [ie, b(i)]
            ])
          ]),
          e("div", uc, [
            e("label", null, [
              k[21] || (k[21] = N("口味与饮食偏好", -1)),
              te(e("input", {
                "onUpdate:modelValue": k[6] || (k[6] = (j) => p.preferences = j),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: b(v)
              }, null, 8, dc), [
                [ie, p.preferences]
              ])
            ]),
            e("label", null, [
              k[22] || (k[22] = N("运动情况（可选）", -1)),
              te(e("input", {
                "onUpdate:modelValue": k[7] || (k[7] = (j) => p.exercise = j),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: b(v)
              }, null, 8, cc), [
                [ie, p.exercise]
              ])
            ])
          ]),
          e("details", vc, [
            k[27] || (k[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            k[28] || (k[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", mc, [
              te(e("input", {
                "onUpdate:modelValue": k[8] || (k[8] = (j) => M.value = j),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: b(v),
                onInput: k[9] || (k[9] = (j) => V.value = "")
              }, null, 40, pc), [
                [ie, M.value]
              ]),
              te(e("select", {
                "onUpdate:modelValue": k[10] || (k[10] = (j) => V.value = j),
                "aria-label": "选择具体食物",
                disabled: b(v) || !z.value.length
              }, [
                k[23] || (k[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (s(!0), o(B, null, J(z.value, (j) => (s(), o("option", {
                  key: j.key,
                  value: j.key
                }, a(j.name), 9, fc))), 128))
              ], 8, bc), [
                [Ce, V.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: b(v) || !V.value,
                onClick: be
              }, "加入备选", 8, gc)
            ]),
            e("div", yc, [
              (s(!0), o(B, null, J(p.availableFoods, (j, oe) => (s(), o("article", {
                key: j.foodId
              }, [
                e("strong", null, a(j.name), 1),
                e("label", null, [
                  k[24] || (k[24] = N("这份可食部（克）", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (ae) => j.grams = ae,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: b(v)
                  }, null, 8, hc), [
                    [
                      ie,
                      j.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  k[25] || (k[25] = N("这份已知价格（元）", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (ae) => j.price = ae,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: b(v)
                  }, null, 8, kc), [
                    [ie, j.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: b(v),
                  onClick: (ae) => p.availableFoods.splice(oe, 1)
                }, "移除", 8, wc)
              ]))), 128))
            ]),
            p.availableFoods.length ? (s(), o("label", $c, [
              te(e("input", {
                "onUpdate:modelValue": k[11] || (k[11] = (j) => p.onlyAvailable = j),
                type: "checkbox",
                disabled: b(v)
              }, null, 8, _c), [
                [vt, p.onlyAvailable]
              ]),
              k[26] || (k[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : I("", !0)
          ])
        ]),
        e("label", Cc, [
          te(e("input", {
            "onUpdate:modelValue": k[12] || (k[12] = (j) => A.value = j),
            type: "checkbox",
            disabled: b(v)
          }, null, 8, Ac), [
            [vt, A.value]
          ]),
          e("span", null, [
            N("使用所选日期的 " + a(G.value.length) + " 项已记录食物", 1),
            k[30] || (k[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", Ic, [
          te(e("input", {
            "onUpdate:modelValue": k[13] || (k[13] = (j) => R.value = j),
            type: "checkbox",
            disabled: b(v)
          }, null, 8, Sc), [
            [vt, R.value]
          ]),
          k[31] || (k[31] = e("span", null, [
            N("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        k[32] || (k[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给 DeepSeek。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        D.value ? (s(), o("p", xc, a(D.value), 1)) : I("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: b(v) || !b(i).trim()
        }, [
          b(v) ? (s(), o("span", Uc)) : (s(), ve(O, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          N(a(b(v) ? "正在等待真实检索与计算…" : Y.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, Ec)
      ], 32),
      b(v) || b(g).length ? (s(), o("div", jc, [
        e("div", null, [
          e("strong", null, a(b(v) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          b(v) ? (s(), o("p", Dc, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : I("", !0),
          e("ol", null, [
            (s(!0), o(B, null, J(b(g), (j, oe) => (s(), o("li", { key: oe }, [
              e("strong", null, a(j.label), 1),
              N(" · " + a(j.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : I("", !0),
      b(c) ? (s(), o("div", Pc, [
        k[33] || (k[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, a(b(c)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: b(v),
          onClick: ge
        }, "保留条件并重试", 8, Nc)
      ])) : I("", !0),
      b(m)?.status === "needs_evidence" ? (s(), o("p", Tc, a(b(m).message) + " 请修改备选食物或检索描述。", 1)) : I("", !0),
      Y.value ? (s(), o("section", Mc, [
        e("div", Rc, [
          e("div", null, [
            e("p", zc, "待确认 · " + a(Y.value.date) + " · " + a(W.find((j) => j[0] === Y.value.meal)?.[1]), 1),
            e("h3", null, a(Y.value.plan.title), 1)
          ]),
          k[34] || (k[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        e("p", null, a(Y.value.plan.summary), 1),
        e("p", Oc, "本次使用 " + a(Y.value.contextSummary.itemCount) + " 项已记录食物；" + a(Y.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        se.value ? (s(), o("div", {
          key: 0,
          class: me(["vb-campus-cost", { "is-caution": se.value.status === "over_budget" }])
        }, [
          e("h4", null, a(se.value.complete ? "按录入价格估算：约 ¥" + C(se.value.total) : "价格待确认"), 1),
          se.value.budget !== null ? (s(), o("p", Fc, "本餐预算 ¥" + a(se.value.budget) + " · " + a(se.value.status === "within_budget" ? "按已录入价格估算在预算内" : se.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : I("", !0),
          se.value.complete ? I("", !0) : (s(), o("p", Bc, "已知价格小计约 ¥" + a(C(se.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, a(se.value.basis) + "。" + a(se.value.availability) + "。", 1)
        ], 2)) : I("", !0),
        e("div", Vc, [
          (s(!0), o(B, null, J(Y.value.plan.items, (j, oe) => (s(), o("article", {
            key: j.foodId,
            class: "vb-agent-item"
          }, [
            e("div", qc, [
              e("div", null, [
                U(Yt, {
                  food: b(le)[j.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, a(b(At)(b(le)[j.foodId])), 1),
                e("small", null, a(b(Wt)(b(le)[j.foodId])), 1),
                e("p", null, a(j.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (ae) => {
                  Y.value.plan.items.splice(oe, 1), _.value = !1;
                }
              }, "移除", 8, Lc)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (ae) => {
                h.value = oe, w.value = "";
              }
            }, "换一道", 8, Gc),
            h.value === oe ? (s(), o("div", Jc, [
              te(e("select", {
                "onUpdate:modelValue": k[14] || (k[14] = (ae) => w.value = ae),
                "aria-label": "替换食物"
              }, [
                k[35] || (k[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (s(!0), o(B, null, J(P.value, (ae) => (s(), o("option", {
                  key: ae.key,
                  value: ae.key
                }, a(ae.name), 9, Hc))), 128))
              ], 512), [
                [Ce, w.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !w.value,
                onClick: (ae) => q(oe)
              }, "确认替换", 8, Kc),
              P.value.length ? I("", !0) : (s(), o("p", Wc, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : I("", !0),
            e("label", Yc, [
              k[36] || (k[36] = N("可食部估算克数", -1)),
              e("input", {
                value: j.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (ae) => F(oe, ae.target.value)
              }, null, 40, Xc),
              k[37] || (k[37] = N("克", -1))
            ]),
            e("div", Qc, [
              (s(), o(B, null, J([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (ae) => e("small", {
                key: ae.id
              }, a(ae.name) + " " + a(C(j.portion[ae.id])) + a(j.portion[ae.id] !== null ? " " + ae.unit : ""), 1)), 64))
            ]),
            e("details", Zc, [
              k[39] || (k[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + a(b(le)[j.foodId]?.state), 1),
              e("p", null, [
                k[38] || (k[38] = N("来源：", -1)),
                b(le)[j.foodId]?.source ? (s(), o("a", {
                  key: 0,
                  href: b(le)[j.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, a(j.sourceName) + " · " + a(j.source), 9, ev)) : (s(), o("span", tv, "暂无可核验成分数据"))
              ]),
              e("p", null, a(b(le)[j.foodId]?.source?.description), 1),
              k[40] || (k[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              j.missing.length ? (s(), o("p", nv, "缺失指标：" + a(j.missing.join("、")), 1)) : I("", !0)
            ])
          ]))), 128))
        ]),
        U(qt, {
          entries: ue.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        k[45] || (k[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        Y.value.plan.suggestions.length ? (s(), o("div", sv, [
          k[41] || (k[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (s(!0), o(B, null, J(Y.value.plan.suggestions, (j) => (s(), o("li", { key: j }, a(j), 1))), 128))
          ])
        ])) : I("", !0),
        Y.value.plan.cautions.length ? (s(), o("div", ov, [
          k[42] || (k[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (s(!0), o(B, null, J(Y.value.plan.cautions, (j) => (s(), o("li", { key: j }, a(j), 1))), 128))
          ])
        ])) : I("", !0),
        e("details", lv, [
          k[43] || (k[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (s(!0), o(B, null, J(Y.value.trace, (j, oe) => (s(), o("li", { key: oe }, [
              e("strong", null, a(j.label), 1),
              N(" · " + a(j.inputSummary) + " · " + a(j.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, a(Y.value.model) + " · " + a(Y.value.dataVersion) + " · " + a(new Date(Y.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        U(In),
        e("div", av, [
          k[44] || (k[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: _.value || ye.value,
            onClick: K
          }, a(_.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, iv)
        ])
      ])) : I("", !0)
    ]));
  }
}, uv = { class: "vb-page-title" }, dv = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, cv = { class: "vb-glass vb-record-prompt" }, vv = /* @__PURE__ */ He({
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
    return (l, n) => (s(), o(B, null, [
      e("div", uv, [
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
      t.nutrition ? I("", !0) : (s(), o("section", dv, [...n[5] || (n[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      U(rv, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: n[1] || (n[1] = (d) => l.$emit("add-plan", d))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", cv, [
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
}), mv = { class: "vb-page-title" }, pv = { class: "vb-glass vb-profile-details" }, bv = { class: "vb-section-heading" }, fv = { class: "vb-pill" }, gv = { key: 0 }, yv = { key: 1 }, hv = { class: "vb-profile-settings" }, kv = { class: "vb-glass" }, wv = { class: "vb-section-heading" }, $v = { class: "vb-field" }, _v = ["value"], Cv = { class: "vb-glass" }, Av = { class: "vb-section-heading" }, Iv = ["checked", "onChange"], Sv = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String },
  emits: ["edit", "update:flags", "update:preferences"],
  setup(t, { emit: l }) {
    const n = t, d = H(() => Gt.find((m) => m.key === n.profile.activity)), i = l, u = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function r(m, c, v) {
      i("update:flags", c ? [...v, m] : v.filter((g) => g !== m));
    }
    return (m, c) => (s(), o(B, null, [
      e("div", mv, [
        c[3] || (c[3] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "随身体与生活变化，随时更新"),
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: c[0] || (c[0] = (v) => m.$emit("edit"))
        }, [
          U(O, {
            name: "edit",
            size: 17
          }),
          c[2] || (c[2] = N("修改基础档案", -1))
        ])
      ]),
      e("section", pv, [
        e("div", bv, [
          c[4] || (c[4] = e("h2", null, "基础信息", -1)),
          e("span", fv, a(b(_e) ? b(pt) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
        ]),
        e("dl", null, [
          e("div", null, [
            c[5] || (c[5] = e("dt", null, "生理性别", -1)),
            e("dd", null, a(t.profile.sex === "male" ? "男性" : t.profile.sex === "female" ? "女性" : "未填写"), 1)
          ]),
          e("div", null, [
            c[6] || (c[6] = e("dt", null, "年龄", -1)),
            e("dd", null, a(t.profile.age == null || t.profile.age === "" ? "未填写" : `${t.profile.age} 岁`), 1)
          ]),
          t.profile.age === 0 ? (s(), o("div", gv, [
            c[7] || (c[7] = e("dt", null, "月龄", -1)),
            e("dd", null, a(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : I("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (s(), o("div", yv, [
            c[8] || (c[8] = e("dt", null, "生理阶段", -1)),
            e("dd", null, a({ pregnant: "孕期", lactating: "哺乳期", special: "需专业评估" }[t.profile.physiologicalStage]), 1)
          ])) : I("", !0),
          e("div", null, [
            c[9] || (c[9] = e("dt", null, "身高", -1)),
            e("dd", null, a(t.profile.height == null || t.profile.height === "" ? "未填写" : `${t.profile.height} cm`), 1)
          ]),
          e("div", null, [
            c[10] || (c[10] = e("dt", null, "体重", -1)),
            e("dd", null, a(t.profile.weight == null || t.profile.weight === "" ? "未填写" : `${t.profile.weight} kg`), 1)
          ]),
          e("div", null, [
            c[11] || (c[11] = e("dt", null, "每日活动", -1)),
            e("dd", null, a(d.value?.label || "未填写"), 1)
          ]),
          e("div", null, [
            c[12] || (c[12] = e("dt", null, "活动系数", -1)),
            e("dd", null, a(d.value ? "× " + d.value.factor : "未填写"), 1)
          ])
        ])
      ]),
      e("div", hv, [
        e("section", kv, [
          e("div", wv, [
            c[13] || (c[13] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            U(O, { name: "bowl" })
          ]),
          e("label", $v, [
            c[14] || (c[14] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: c[1] || (c[1] = (v) => m.$emit("update:preferences", v.target.value))
            }, null, 40, _v)
          ]),
          c[15] || (c[15] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", Cv, [
          e("div", Av, [
            c[16] || (c[16] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            U(O, { name: "shield" })
          ]),
          (s(), o(B, null, J(u, (v) => e("label", {
            key: v,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(v),
              onChange: (g) => r(v, g.target.checked, t.flags)
            }, null, 40, Iv),
            e("span", null, a(v), 1)
          ])), 64)),
          c[17] || (c[17] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1))
        ])
      ])
    ], 64));
  }
}, xv = {
  key: 0,
  class: "vb-page-title"
}, Ev = { class: "vb-local-chip" }, Uv = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, jv = { class: "vb-safety-grid" }, Dv = { class: "vb-icon-badge" }, Pv = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const l = _e.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", n = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + l + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (d, i) => (s(), o(B, null, [
      t.embedded ? I("", !0) : (s(), o("div", xv, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", Ev, [
          U(O, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = N("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (s(), o("section", Uv, [
        U(O, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + a(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : I("", !0),
      e("div", jv, [
        (s(), o(B, null, J(n, ([u, r, m]) => e("article", {
          key: r,
          class: "vb-glass"
        }, [
          e("span", Dv, [
            U(O, {
              name: u,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, a(r), 1),
          e("p", null, a(m), 1)
        ])), 64))
      ]),
      U(In)
    ], 64));
  }
}, Nv = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, Tv = { class: "vb-glass vb-submission-hero" }, Mv = { class: "vb-submission-hero-copy" }, Rv = { class: "vb-icon-badge" }, zv = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, Ov = { class: "vb-submission-version" }, Fv = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, Bv = { class: "vb-submission-step-top" }, Vv = { class: "vb-icon-badge" }, qv = ["onClick"], Lv = { class: "vb-submission-columns" }, Gv = { class: "vb-glass vb-submission-panel" }, Jv = { class: "vb-submission-boundary" }, Hv = { class: "vb-icon-badge" }, Kv = { class: "vb-icon-badge" }, Wv = { class: "vb-icon-badge" }, Yv = { class: "vb-glass vb-submission-panel" }, Xv = { class: "vb-inline-note" }, Qv = { class: "vb-glass vb-submission-evidence" }, Zv = { class: "vb-submission-evidence-actions" }, em = /* @__PURE__ */ He({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const l = {
      foodCount: Je.length,
      sourcedCount: Je.filter((d) => !!d.source?.id).length,
      categories: new Set(Je.map((d) => d.category).filter(Boolean)).size,
      sourceName: "USDA Standard Reference 28（2016-05）"
    }, n = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (d, i) => (s(), o(B, null, [
      t.embedded ? I("", !0) : (s(), o("div", Nv, [
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
      e("section", Tv, [
        e("div", Mv, [
          e("span", Rv, [
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
        e("div", zv, [
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
        e("small", Ov, "数据版本：" + a(b(ls)) + " · " + a(l.sourceName), 1)
      ]),
      i[19] || (i[19] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("p", { class: "vb-eyebrow" }, "四步完成一条闭环"),
          e("h2", null, "从检索到回顾")
        ]),
        e("span", null, "每一步都可返回核对")
      ], -1)),
      e("section", Fv, [
        (s(), o(B, null, J(n, (u) => e("article", {
          key: u.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", Bv, [
            e("span", null, a(u.number), 1),
            e("span", Vv, [
              U(O, {
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
            N(a(u.action), 1),
            U(O, {
              name: "arrow",
              size: 15
            })
          ], 8, qv)
        ])), 64))
      ]),
      e("div", Lv, [
        e("section", Gv, [
          i[12] || (i[12] = e("p", { class: "vb-eyebrow" }, "职责边界", -1)),
          i[13] || (i[13] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", Jv, [
            e("article", null, [
              e("span", Hv, [
                U(O, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Kv, [
                U(O, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Wv, [
                U(O, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", Yv, [
          i[15] || (i[15] = hn('<p class="vb-eyebrow">实现与隐私</p><h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>DeepSeek</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 3)),
          e("p", Xv, [
            U(O, {
              name: "info",
              size: 16
            }),
            i[14] || (i[14] = N("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", Qv, [
        i[18] || (i[18] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "可复核材料"),
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口 mock 测试与真实模型冒烟分开记录，真实调用未执行时不会记作通过。")
        ], -1)),
        e("div", Zv, [
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
}), tm = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], nm = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], sm = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], om = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, lm = { class: "vb-reference-list" }, am = ["href"], im = {
  key: 1,
  class: "vb-data-note"
}, rm = { class: "vb-reference-terms" }, um = {
  __name: "ReferencePanel",
  setup(t) {
    return (l, n) => (s(), o("section", om, [
      n[8] || (n[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      n[9] || (n[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      n[10] || (n[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", lm, [
        (s(!0), o(B, null, J(b(tm), (d) => (s(), o("details", {
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
          }, "核对公开来源 ↗", 8, am)) : (s(), o("p", im, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", rm, [
        n[4] || (n[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (s(!0), o(B, null, J(b(sm), ([d, i, u]) => (s(), o("p", { key: d }, [
          e("strong", null, a(d) + " · " + a(i), 1),
          N("：" + a(u), 1)
        ]))), 128)),
        n[5] || (n[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        n[6] || (n[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (s(!0), o(B, null, J(b(nm), (d) => (s(), o("li", { key: d }, a(d), 1))), 128))
        ]),
        n[7] || (n[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, dm = { class: "vb-page-title" }, cm = { class: "vb-local-chip" }, vm = { "aria-labelledby": "about-project-heading" }, mm = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, pm = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, bm = {
  key: 0,
  role: "alert"
}, fm = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, gm = { class: "vb-reset-actions" }, ym = ["disabled"], hm = ["disabled"], km = /* @__PURE__ */ He({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const l = T(!1), n = T(!1), d = T("");
    function i() {
      try {
        const r = JSON.parse(we.getItem("weiheng.local.v2") || "{}"), m = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: r.profile || null, records: (Array.isArray(r.records) ? r.records : []).map((g) => ({ date: g.date, entries: g.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, c = URL.createObjectURL(new Blob([JSON.stringify(m, null, 2)], { type: "application/json" })), v = document.createElement("a");
        v.href = c, v.download = "维衡-当前档案与食物记录.json", v.click(), setTimeout(() => URL.revokeObjectURL(c), 1e3);
      } catch {
        d.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function u() {
      if (!n.value) {
        n.value = !0, d.value = "";
        try {
          await gs(), window.location.reload();
        } catch {
          d.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", n.value = !1;
        }
      }
    }
    return (r, m) => (s(), o(B, null, [
      e("div", dm, [
        m[5] || (m[5] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "项目介绍 · 使用边界 · 隐私说明"),
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", cm, [
          m[4] || (m[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          N(a(b(_e) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", vm, [
        m[6] || (m[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "作品说明"),
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ]),
          e("span", null, "功能流程与实现依据")
        ], -1)),
        U(em, {
          embedded: "",
          onNavigate: m[0] || (m[0] = (c) => r.$emit("navigate", c))
        })
      ]),
      U(um),
      e("section", mm, [
        m[7] || (m[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "安全中心"),
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ]),
          e("span", null, "把营养信息作为参考")
        ], -1)),
        U(Pv, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", pm, [
        e("div", null, [
          m[8] || (m[8] = e("p", { class: "vb-eyebrow" }, "当前使用空间的数据管理", -1)),
          m[9] || (m[9] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, a(b(_e) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          m[10] || (m[10] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          d.value ? (s(), o("p", bm, a(d.value), 1)) : I("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: m[1] || (m[1] = (c) => l.value = !0)
        }, "清空数据并重置")
      ]),
      l.value ? (s(), ve(lt, {
        key: 0,
        title: b(_e) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: m[3] || (m[3] = (c) => !n.value && (l.value = !1))
      }, {
        default: ot(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + a(b(_e) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          m[11] || (m[11] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          d.value ? (s(), o("p", fm, a(d.value), 1)) : I("", !0),
          e("div", gm, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: n.value,
              onClick: m[2] || (m[2] = (c) => l.value = !1)
            }, "取消", 8, ym),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: n.value,
              onClick: u
            }, a(n.value ? "正在清理…" : "确认清空并重置"), 9, hm)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : I("", !0)
    ], 64));
  }
}), wm = ["data-theme"], $m = ["inert"], _m = { class: "vb-main" }, Cm = { class: "vb-topbar" }, Am = { class: "vb-breadcrumb" }, Im = { class: "vb-topbar-actions" }, Sm = { class: "vb-local-chip" }, xm = ["aria-label"], Em = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, Um = { class: "vb-footer" }, jm = {
  key: 4,
  class: "vb-toast",
  role: "status"
}, Mm = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: l, theme: n, nutrition: d, records: i, storageError: u, updateProfile: r, saveRecord: m, clearDraftAfterSave: c, addToDraft: v, addPlanToDraft: g, toggleHabit: $ } = Jt(), { toggleTheme: y } = vs(n), { reports: p, reportStorageError: h, loadReports: w, latestReport: _, isStale: A, generateReport: R } = Kt();
    w();
    const D = t, M = H(() => l.flags.includes("孕期或哺乳期") ? { ...l.profile, physiologicalStage: "special" } : l.profile || {}), V = T(D.initialPage), W = T(D.initialEditor), z = T(!1), G = T(null), Y = T(null), ue = T(null), se = T(ke()), ye = T(!1), be = T(""), ge = T(""), K = T(""), F = H(() => p.value.find((ee) => ee.id === ge.value) || _(be.value)), P = H(() => l.records.find((ee) => ee.date === be.value)), q = { overview: "概览", dietAssistant: "维衡AI助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, C = H(() => _e.value ? pt.value === "error" ? "账号同步暂不可用 · 本机副本保留" : pt.value === "syncing" || pt.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let f, k = 0;
    function j(ee, L = null) {
      clearTimeout(f), G.value = { message: ee, undo: L }, f = setTimeout(() => G.value = null, 7e3);
    }
    function oe(ee) {
      V.value = ee, window.scrollTo({ top: 0, behavior: "auto" }), xe(() => Y.value?.focus({ preventScroll: !0 }));
    }
    function ae() {
      W.value = !1, z.value = !0;
    }
    function It() {
      z.value = !1;
    }
    function at(ee) {
      const L = r(ee);
      if (L) {
        j(L);
        return;
      }
      W.value = !1, oe("overview"), j(_e.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function it(ee, L = !1) {
      const Z = ++k;
      K.value = "", be.value = ee.date, ge.value = "";
      try {
        const he = R(ee, M.value, { force: L });
        await xe();
        const Ge = await he;
        Z === k && be.value === ee.date && (ge.value = Ge?.id || "");
      } catch (he) {
        Z === k && (K.value = he.message || "分析暂时不可用，请重试。");
      }
    }
    function rt(ee) {
      if (!ye.value) {
        ye.value = !0;
        try {
          const L = m(ee);
          if (!L.ok) {
            j(L.error);
            return;
          }
          c(L.record.date, L.record), j("饮食记录已保存，正在分析"), it(L.record);
        } finally {
          ye.value = !1;
        }
      }
    }
    function Ke(ee, L) {
      L ? p.value.find((he) => he.id === L) : _(ee), be.value = ee, ge.value = L || "", K.value = "", l.records.find((he) => he.date === ee);
    }
    function We(ee = be.value) {
      const L = l.records.find((Z) => Z.date === ee);
      L && it(L, !0);
    }
    function Te(ee) {
      if (!Fe(ee.date) || ee.date > ke() || Number(ee.grams) < 0.1 || Number(ee.grams) > 5e3) {
        j("请核对日期与食用克数。");
        return;
      }
      const L = v(ee);
      se.value = ee.date, ue.value = null, oe("diary"), j(L ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    async function Ye(ee) {
      const L = $e();
      try {
        if (await qe(ee.items.map((he) => he.foodId)), L !== $e()) return;
      } catch (he) {
        ee.onResult?.({ ok: !1, error: he.message }), j(he.message);
        return;
      }
      const Z = g(ee);
      if (ee.onResult?.(Z), !Z.ok) {
        j(Z.error);
        return;
      }
      se.value = ee.date, oe("diary"), j(Z.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function Xe(ee) {
      const L = l.records.find((Z) => Z.date === ee);
      L && (l.records = l.records.filter((Z) => Z.date !== ee), j("这条饮食记录已删除，报告快照仍保留。", () => {
        m(L), G.value = null;
      }));
    }
    return Ve(() => clearTimeout(f)), (ee, L) => (s(), o("div", {
      class: me(["vb-app", { "is-diary": V.value === "diary", "is-chat": V.value === "dietAssistant" }]),
      "data-theme": b(n)
    }, [
      e("div", {
        inert: W.value || ue.value || be.value || void 0
      }, [
        U(ms, {
          active: V.value,
          onNavigate: oe
        }, null, 8, ["active"]),
        e("div", _m, [
          e("header", Cm, [
            e("span", Am, [
              L[15] || (L[15] = e("span", null, "营养工作台", -1)),
              L[16] || (L[16] = e("i", null, "/", -1)),
              N(a(q[V.value]), 1)
            ]),
            e("div", Im, [
              e("span", Sm, [
                L[17] || (L[17] = e("i", { class: "vb-status-dot" }, null, -1)),
                N(a(C.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                onClick: ae
              }, a(b(_e) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": b(n) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: L[0] || (L[0] = (...Z) => b(y) && b(y)(...Z))
              }, [
                U(O, {
                  name: b(n) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, xm),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: L[1] || (L[1] = (Z) => oe("profile"))
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
            ref: Y,
            class: "vb-content",
            tabindex: "-1"
          }, [
            b(u) || b(h) ? (s(), o("p", Em, a(b(u) || b(h)), 1)) : I("", !0),
            (s(), o(B, { key: 1 }, [
              te(U(gi, {
                active: V.value === "dietAssistant",
                records: b(l).records,
                targets: b(d),
                profile: M.value
              }, null, 8, ["active", "records", "targets", "profile"]), [
                [Xn, V.value === "dietAssistant"]
              ]),
              V.value === "overview" ? (s(), ve(ps, {
                key: 0,
                profile: M.value,
                nutrition: b(d),
                "record-count": b(i).length,
                records: b(i),
                onEdit: L[2] || (L[2] = (Z) => W.value = !0),
                onNavigate: oe
              }, null, 8, ["profile", "nutrition", "record-count", "records"])) : I("", !0),
              V.value === "assessment" ? (s(), ve(ar, {
                key: 1,
                records: b(i),
                habits: b(l).habits,
                flags: b(l).flags,
                reports: b(p),
                profile: M.value,
                onNavigate: oe,
                onToggleHabit: b($),
                onOpenReport: Ke,
                onRetryReport: We
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : V.value === "diary" ? (s(), ve(Tu, {
                key: 2,
                records: b(i),
                reports: b(p),
                profile: M.value,
                nutrition: b(d),
                "initial-date": se.value,
                saving: ye.value,
                onSave: rt,
                onRemove: Xe,
                onAnalysis: Ke,
                onBrowse: L[3] || (L[3] = (Z) => oe("food")),
                onDetail: L[4] || (L[4] = (Z) => ue.value = b(le)[Z])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving"])) : V.value === "food" ? (s(), ve(Vd, {
                key: 3,
                onDetail: L[5] || (L[5] = (Z) => ue.value = b(le)[Z])
              })) : V.value === "mealplan" ? (s(), ve(vv, {
                key: 4,
                nutrition: b(d),
                preferences: b(l).preferences,
                flags: b(l).flags,
                profile: M.value,
                records: b(l).records,
                onNavigate: oe,
                onAddPlan: Ye
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : V.value === "profile" ? (s(), ve(Sv, {
                key: 5,
                profile: M.value,
                nutrition: b(d),
                flags: b(l).flags,
                "onUpdate:flags": L[6] || (L[6] = (Z) => b(l).flags = Z),
                preferences: b(l).preferences,
                "onUpdate:preferences": L[7] || (L[7] = (Z) => b(l).preferences = Z),
                onEdit: L[8] || (L[8] = (Z) => W.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences"])) : V.value === "about" ? (s(), ve(km, {
                key: 6,
                flags: b(l).flags,
                onNavigate: oe
              }, null, 8, ["flags"])) : I("", !0)
            ], 64)),
            e("footer", Um, [
              U(O, {
                name: "leaf",
                size: 14
              }),
              L[18] || (L[18] = N("维衡 AI · 把健康，放进每一餐", -1)),
              L[19] || (L[19] = e("span", null, "营养信息仅供一般参考", -1))
            ])
          ], 512)
        ])
      ], 8, $m),
      W.value ? (s(), ve(uo, {
        key: 0,
        profile: b(l).profile,
        onComplete: at,
        onClose: L[9] || (L[9] = (Z) => W.value = !1),
        onLogin: ae
      }, null, 8, ["profile"])) : I("", !0),
      z.value ? (s(), ve(bs, {
        key: 1,
        onClose: It
      })) : I("", !0),
      ue.value ? (s(), ve(ll, {
        key: 2,
        "food-id": ue.value.key,
        onClose: L[10] || (L[10] = (Z) => ue.value = null),
        onAdd: Te
      }, null, 8, ["food-id"])) : I("", !0),
      be.value ? (s(), ve(zl, {
        key: 3,
        report: F.value,
        record: P.value,
        stale: F.value ? b(A)(F.value, P.value, M.value) : !1,
        error: K.value,
        onClose: L[11] || (L[11] = (Z) => {
          be.value = "", ge.value = "";
        }),
        onRetry: L[12] || (L[12] = (Z) => We())
      }, null, 8, ["report", "record", "stale", "error"])) : I("", !0),
      G.value ? (s(), o("div", jm, [
        U(O, {
          name: "check",
          size: 17
        }),
        e("span", null, a(G.value.message), 1),
        G.value.undo ? (s(), o("button", {
          key: 0,
          onClick: L[13] || (L[13] = (...Z) => G.value.undo && G.value.undo(...Z))
        }, "撤销")) : I("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: L[14] || (L[14] = (Z) => G.value = null)
        }, [
          U(O, {
            name: "close",
            size: 15
          })
        ])
      ])) : I("", !0)
    ], 10, wm));
  }
};
export {
  Mm as default
};
