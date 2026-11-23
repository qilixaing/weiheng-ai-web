import { r as P, a as G, b as yt, w as ce, o as s, d as l, e, F as q, f as J, n as Tn, g as be, h as $t, i as N, j as C, k as We, t as a, l as de, m as oe, v as ve, p as M, u as f, q as Fe, s as Te, x as nt, y as us, z as st, A as at, B as ke, C as ft, D as Mn, E as ds, G as zn, H as Lt, I as cs, J as vs } from "./vue-runtime-tIIV23yc.js";
import { v as Ge, t as xe, F as ae, c as zt, r as ht, n as ms, m as ps, a as Zt, b as kt, A as on, d as On, e as Ke, f as Fn, g as Pt, M as Le, h as ln, i as Rt, j as an, _ as L, p as bs, s as Bn, k as xt, l as yn, N as fs, o as He, q as gs, C as qt, G as Ln, u as en, w as rn, x as hn, P as Vt, R as ys, y as Jt, z as hs, B as kn, D as dt, E as It, H as qn, I as wn, J as ks, K as ws, L as $s, O as _s } from "./useThemeTransition-B3bygmGG.js";
import { s as wt, a as Me, o as As, b as Se, t as Vn, c as Cs, d as Re, e as Ss, f as Is, g as Es, h as Ut } from "./main-PLHlzPv0.js";
import { _ as un, a as Jn, b as xs } from "./IntakeAnalysis-DyTdVsxe.js";
function Us(t, o) {
  if (!o || !Ge(o.date) || o.date > xe() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(o.meal) || !Array.isArray(o.items) || !o.items.length || o.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const n = String(o.confirmationId || "").slice(0, 100);
  if (!n) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(n)) return { draft: t, duplicate: !0 };
  const u = o.items.map((i) => {
    const r = ae[i.foodId], d = Number(i.grams);
    if (!r || !Number.isFinite(d) || d < 0.1 || d > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: n + ":" + r.key, foodId: r.key, name: r.name, grams: d, meal: o.meal, group: r.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: zt(r) };
  });
  if (new Set(u.map((i) => i.foodId)).size !== u.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...u], appliedBatches: [...t.appliedBatches || [], n] }, duplicate: !1 };
}
const gt = wt("weiheng.reset-signal.v1"), Gn = (t) => As(t);
let tt = !1;
const ot = () => tt;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== gt || !t.newValue))
    try {
      const { phase: o } = JSON.parse(t.newValue);
      o === "begin" && (tt = !0), o === "abort" && (tt = !1), o === "done" && (tt = !0, window.location.reload());
    } catch {
    }
});
function $n(t, o) {
  return new Promise((n, u) => {
    const i = t.open(o);
    i.onerror = i.onblocked = () => u(new Error("本地文件存储暂时无法清理，请关闭其他旧页面后重试。")), i.onsuccess = () => {
      const r = i.result, d = Array.from(r.objectStoreNames);
      if (!d.length) {
        r.close(), n();
        return;
      }
      try {
        const m = r.transaction(d, "readwrite");
        for (const c of d) m.objectStore(c).clear();
        m.oncomplete = () => {
          r.close(), n();
        }, m.onerror = m.onabort = () => {
          r.close(), u(new Error("本地文件清理未完成，请重试。"));
        };
      } catch (m) {
        r.close(), u(m);
      }
    };
  });
}
function _n(t, o = !1) {
  const n = Array.from({ length: t.length }, (u, i) => t.key(i));
  for (const u of n) u && Gn(u) && !(o && u === gt) && t.removeItem(u);
}
async function js({
  local: t = globalThis.localStorage,
  session: o = globalThis.sessionStorage,
  databases: n = globalThis.indexedDB,
  caches: u = globalThis.caches
} = {}) {
  if (tt) throw new Error("正在清理本地数据，请稍候。");
  tt = !0;
  const i = (r) => t.setItem(gt, JSON.stringify({ phase: r, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), Me.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!n) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      $n(n, wt("weiheng.media.v1")),
      $n(n, wt("weiheng.chat-attachments.v1"))
    ]), u) for (const r of await u.keys()) Gn(r) && await u.delete(r);
    o && _n(o), _n(t, !0), i("done"), t.removeItem(gt);
  } catch (r) {
    try {
      i("abort"), t.removeItem(gt);
    } catch {
    }
    throw tt = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), r;
  }
}
const Tt = "weiheng.local.v2", Hn = "weiheng.theme.v1", Ze = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function An(t) {
  if (!t) return null;
  const o = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", n = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), u = on.some((r) => r.key === t.activity) ? t.activity : n[String(t.activity)] || "";
  if (kt({ ...t, sex: o, activity: u })) return null;
  const i = { ...t, sex: o, age: Ze(t.age), height: Ze(t.height), weight: Ze(t.weight), activity: u };
  return kt(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    o
  ), activity: String(u) };
}
function Wn() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const o = JSON.parse(Se.getItem(Tt) || "null");
    if (o && typeof o == "object") {
      for (const i of [...Array.isArray(o.records) ? o.records : [], ...Object.values(o.drafts || {})]) for (const r of Array.isArray(i?.entries) ? i.entries : []) r.foodId === "cabbage" && r.name === "白菜" && (r.referenceConfirmed = !1);
      return { ...t, ...o, drafts: o.drafts && typeof o.drafts == "object" ? o.drafts : {}, profile: An(o.profile), records: Array.isArray(o.records) ? o.records : [] };
    }
    const n = JSON.parse(Se.getItem("vitabalance.v1") || Se.getItem("vitabalance.guest.v1") || "null"), u = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return n ? { ...t, profile: An(n.profile), records: Array.isArray(n.records) ? n.records : [], plans: Array.isArray(n.plans) ? n.plans : [], flags: u.filter(([i]) => n.profile?.[i]).map(([, i]) => i), preferences: [n.profile?.avoid, n.profile?.allergies ? "需要核对的过敏或不耐受项：" + n.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const me = yt(Wn()), et = P("");
let tn = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  tn = !0;
  try {
    Object.assign(me, Wn());
  } finally {
    tn = !1;
  }
});
const Ds = (() => {
  try {
    return Se.getItem(Hn);
  } catch {
    return null;
  }
})(), Kn = P(Ds === "dark" ? "dark" : "light"), jt = G(() => On(me.flags.includes("孕期或哺乳期") ? null : me.profile));
ce(me, () => {
  if (!(ot() || tn))
    try {
      Se.setItem(Tt, JSON.stringify({ ...me, calculated: jt.value })), et.value = "";
    } catch {
      et.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
ce(Kn, (t) => {
  if (!ot())
    try {
      Se.setItem(Hn, t);
    } catch {
      et.value = "主题偏好暂时无法保存。";
    }
});
function dn() {
  const t = G(() => [...me.records].sort((c, v) => v.date.localeCompare(c.date)));
  function o(c) {
    const v = kt(c);
    return v || (me.profile = { ...me.profile, sex: c.sex || "", ageMonths: Ze(c.ageMonths), physiologicalStage: c.physiologicalStage || "general", age: Ze(c.age), height: Ze(c.height), weight: Ze(c.weight), activity: c.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function n(c) {
    if (ot()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Ge(c.date)) return { ok: !1, error: "请选择有效日期。" };
    const v = me.records.find((h) => h.date === c.date), b = Array.isArray(c.entries) ? ps(c, v) : (
      /** @type {DailyRecord} */
      { ...c, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (v && Zt(v) === Zt(b)) return { ok: !0, record: v, unchanged: !0 };
    const x = [...me.records.filter((h) => h.date !== b.date), b];
    try {
      Se.setItem(Tt, JSON.stringify({ ...me, records: x, calculated: jt.value }));
    } catch {
      return et.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: et.value };
    }
    return me.records = x, { ok: !0, record: b };
  }
  function u(c, v) {
    const b = i(c);
    b && (b.savedEntries = JSON.parse(JSON.stringify(Array.isArray(v?.entries) ? v.entries : [])), b.entries = [], b.recognition = null, b.appliedBatches = []);
  }
  function i(c) {
    if (!Ge(c)) return null;
    if (!me.drafts[c]) {
      const v = me.records.find((b) => b.date === c);
      me.drafts[c] = { date: c, entries: ht(v), notes: v?.notes || "", photoId: v?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return me.drafts[c];
  }
  function r(c) {
    const v = i(c.date);
    if (!v) return !1;
    const b = ae[c.foodId || ""];
    return v.entries.push({ id: crypto.randomUUID(), foodId: c.foodId || null, name: b?.name || c.name || "", grams: Number(c.grams), meal: c.meal || "unspecified", group: c.group, source: c.source || "catalogue", estimated: !!c.estimated, referenceConfirmed: !0, nutritionSnapshot: ms(c.nutritionSnapshot, b?.key) || zt(b) }), !et.value;
  }
  function d(c, v) {
    const b = new Set(me.habits[c] || []);
    b.has(v) ? b.delete(v) : b.add(v), me.habits[c] = [...b];
  }
  function m(c) {
    if (ot()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const v = me.drafts[c.date] || { date: c.date, entries: ht(me.records.find((h) => h.date === c.date)), appliedBatches: [] }, b = Us(v, c);
      if (b.duplicate) return { ok: !0, duplicate: !0 };
      const x = { ...me.drafts, [c.date]: b.draft };
      return Se.setItem(Tt, JSON.stringify({ ...me, drafts: x, calculated: jt.value })), me.drafts = x, { ok: !0, duplicate: !1 };
    } catch (v) {
      return { ok: !1, error: v.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: me, theme: Kn, nutrition: jt, records: t, storageError: et, updateProfile: o, saveRecord: n, clearDraftAfterSave: u, ensureDraft: i, addToDraft: r, addPlanToDraft: m, toggleHabit: d };
}
let Gt;
function Ns() {
  return Gt || (Gt = new Promise((t, o) => {
    if (!globalThis.indexedDB) {
      o(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const n = indexedDB.open(wt("weiheng.media.v1"), 1);
    n.onupgradeneeded = () => {
      const u = n.result;
      for (const i of ["photos", "reports"]) u.objectStoreNames.contains(i) || u.createObjectStore(i, { keyPath: "id" });
    }, n.onsuccess = () => t(n.result), n.onerror = () => o(new Error("无法打开本地存储，请检查浏览器隐私设置。")), n.onblocked = () => o(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), Gt;
}
async function Ot(t, o, n) {
  const u = await Ns();
  if (o === "readwrite" && ot()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, r) => {
    const d = u.transaction(t, o);
    let m;
    const c = n(d.objectStore(t));
    c.onsuccess = () => {
      m = c.result;
    }, d.oncomplete = () => i(m), d.onabort = d.onerror = () => r(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const nn = (t, o) => Ot(t, "readwrite", (n) => n.put(JSON.parse(JSON.stringify(o)))), Ps = (t, o) => Ot(t, "readonly", (n) => n.get(o)), Rs = (t) => Ot(t, "readonly", (o) => o.getAll()), Ts = (t, o) => Ot(t, "readwrite", (n) => n.delete(o));
async function ct(t, o) {
  const n = t === "recognize" ? 15e4 : 9e4;
  let u;
  try {
    u = await fetch("/api/ai/" + t, { method: o === void 0 ? "GET" : "POST", headers: o === void 0 ? {} : { "Content-Type": "application/json" }, body: o === void 0 ? void 0 : JSON.stringify(o), signal: Vn(n) });
  } catch (r) {
    throw new Error(r?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  let i;
  try {
    i = await u.json();
  } catch {
    throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
  }
  if (!u.ok) {
    const r = new Error(i.error || "AI 服务暂时不可用。");
    throw r.code = i.code, r;
  }
  return i;
}
async function Yn(t, o, n, u) {
  const i = Vn(t === "chat" ? 4e5 : 9e4), r = u ? Cs([u, i]) : i;
  let d;
  try {
    d = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    o, stream: !0 }), signal: r });
  } catch (g) {
    throw new Error(g?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  if (!d.ok) {
    let g;
    try {
      g = await d.json();
    } catch {
      throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
    }
    const k = new Error(g.error || "AI 服务暂时不可用。");
    throw k.code = g.code, k;
  }
  if (!d.body) throw new Error("浏览器没有提供流式读取能力，请更新浏览器后重试。");
  const m = d.body.getReader(), c = new TextDecoder();
  let v = "", b = !1, x = null;
  const h = (g) => {
    const k = g.split(/\r?\n/).filter((S) => S.startsWith("data:")).map((S) => S.slice(5).trimStart()).join(`
`);
    if (!k) return;
    let A;
    try {
      A = JSON.parse(k);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (A?.type === "error") {
      const S = new Error(A.message || "AI 暂时无法回复，请重试。");
      throw S.code = A.code, S;
    }
    if (A?.type === "progress" && A.step) {
      n(A);
      return;
    }
    if (A?.type === "status" && typeof A.message == "string") {
      n(A);
      return;
    }
    if (A?.type === "delta" && typeof A.text == "string") {
      n(A);
      return;
    }
    A?.type === "done" && typeof A.model == "string" && (x = A, b = !0, n(A));
  };
  try {
    for (; !b; ) {
      const { value: g, done: k } = await m.read();
      if (k) break;
      v += c.decode(g, { stream: !0 });
      let A;
      for (; (A = v.search(/\r?\n\r?\n/)) >= 0; ) {
        const S = v.slice(A).match(/^\r?\n\r?\n/)[0];
        if (h(v.slice(0, A)), v = v.slice(A + S.length), b) break;
      }
    }
    if (v += c.decode(), v.trim() && !b && h(v), !b || !x) throw new Error("AI 流式连接提前结束，请重试。");
    return x;
  } finally {
    m.releaseLock();
  }
}
async function Ms(t, o) {
  const n = await Yn("meal-plan", t, (u) => {
    u.type === "progress" && o(u.step);
  });
  if (!n.result || !["ready", "needs_evidence"].includes(n.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return n.result;
}
const Ye = P([]), Mt = P(""), Ht = /* @__PURE__ */ new Map();
let Wt;
function cn(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function zs(t) {
  return t.filter((o) => {
    const n = o.referenceConfirmed === !1 ? void 0 : ae[o.foodId || ""];
    return Le.some((u) => {
      const i = ln(o, n, u.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function Cn(t) {
  Ye.value = [t, ...Ye.value.filter((o) => o.id !== t.id)].sort((o, n) => n.requestedAt.localeCompare(o.requestedAt));
}
async function Dt(t) {
  try {
    await nn("reports", t), Mt.value = "", Cn(t);
  } catch (o) {
    throw Mt.value = cn(o), Cn({ ...t, persistenceFailed: !0 }), o;
  }
}
function Xn() {
  return Wt || (Wt = (async () => {
    try {
      Ye.value = (await Rs("reports")).sort((t, o) => o.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Ye.value])
        t.status === "pending" && await Dt({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      Mt.value = cn(t);
    }
  })()), Wt;
}
function Os(t) {
  return Ye.value.find((o) => o.date === t);
}
function Fs(t, o, n) {
  return !o || t.dataVersion !== Fn(o, n);
}
async function Bs(t, o, { force: n = !1 } = {}) {
  const u = Re();
  if (await Ke(ht(t).filter((h) => h.foodId && !h.nutritionSnapshot).map((h) => String(h.foodId))), Re() !== u || (await Xn(), Re() !== u)) return;
  const i = Fn(t, o), r = `${u}:${t.date}:${i}`, d = Ht.get(r);
  if (d) return d;
  const m = Ye.value.find(
    (h) => h.date === t.date && h.dataVersion === i && h.status === "complete" && !h.persistenceFailed
  );
  if (m && !n) return m;
  const c = {
    sex: o?.sex,
    age: o?.age,
    height: o?.height,
    weight: o?.weight,
    activity: o?.activity,
    ageMonths: o?.ageMonths,
    physiologicalStage: o?.physiologicalStage
  }, v = ht(t), b = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: Zt(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: v,
      intake: Pt(v),
      profile: c
    },
    result: null,
    error: ""
  }, x = (async () => {
    await Dt(b);
    try {
      const h = await ct("analyze-day", {
        date: t.date,
        entries: v,
        profile: c,
        requestId: b.id
      });
      if (Re() !== u) return;
      const g = zs(v);
      if (g.length) {
        const S = h.calculation?.estimation, U = S?.foods || [];
        if (!(S?.status === "complete" && S.missingFoodCount === g.length && U.length === g.length && g.every((K) => {
          const X = U.find((I) => I.entryId === String(v.indexOf(K))), z = K.referenceConfirmed === !1 ? void 0 : ae[K.foodId || ""], F = Le.filter((I) => {
            const B = ln(K, z, I.id);
            return typeof B.value != "number" && !B.range;
          }).map((I) => I.id);
          return !!(X && F.every((I) => {
            const B = X.values[I], ee = Le.find((re) => re.id === I);
            return B && ee && Rt(B, ee.unit) !== null;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      const k = an(v, h.calculation?.estimation?.foods || [], { model: h.model, generatedAt: h.generatedAt }), A = Pt(k);
      await Dt({
        ...b,
        snapshot: { ...b.snapshot, entries: k, intake: A },
        status: "complete",
        generatedAt: h.generatedAt,
        model: h.model,
        result: h.analysis,
        calculation: h.calculation ? { ...h.calculation, intake: A } : h.calculation
      });
    } catch (h) {
      if (Re() !== u) return;
      await Dt({ ...b, status: "failed", error: cn(h) });
    }
    return Ye.value.find((h) => h.id === b.id);
  })();
  Ht.set(r, x);
  try {
    return await x;
  } finally {
    Ht.delete(r);
  }
}
function vn() {
  return {
    reports: Ye,
    reportStorageError: Mt,
    loadReports: Xn,
    latestReport: Os,
    isStale: Fs,
    generateReport: Bs
  };
}
const Ls = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], qs = {
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
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(null), r = P(!1), d = G(() => (n.max - n.min) * 0.16), m = G(() => {
      const S = Number(n.modelValue);
      return String(n.modelValue).trim() && Number.isFinite(S) ? Math.min(n.max, Math.max(n.min, S)) : n.fallback;
    }), c = G(() => {
      const S = (m.value - n.min) / d.value, U = S - Math.round(S);
      return Array.from({ length: 31 }, (D, K) => ({
        key: K,
        major: K % 5 === 0,
        left: `${50 + (K - 15 - U) / 30 * 100}%`
      }));
    });
    let v = null;
    function b(S) {
      const U = Math.round((S - n.min) / n.step), D = n.step < 1 ? 1 : 0;
      return Number(Math.min(n.max, Math.max(n.min, n.min + U * n.step)).toFixed(D));
    }
    function x(S) {
      u("update:modelValue", b(S));
    }
    function h(S) {
      S.pointerType === "mouse" && S.button !== 0 || (S.preventDefault(), i.value.setPointerCapture(S.pointerId), r.value = !0, v = { x: S.clientX, value: m.value });
    }
    function g(S) {
      if (!v || !r.value) return;
      const U = i.value.getBoundingClientRect().width || 1;
      x(v.value + (S.clientX - v.x) / U * d.value);
    }
    function k() {
      r.value = !1, v = null;
    }
    function A(S) {
      const U = {
        ArrowRight: n.step,
        ArrowUp: n.step,
        ArrowLeft: -n.step,
        ArrowDown: -n.step,
        PageUp: n.step * 10,
        PageDown: -n.step * 10
      };
      S.key === "Home" ? (S.preventDefault(), x(n.min)) : S.key === "End" ? (S.preventDefault(), x(n.max)) : U[S.key] && (S.preventDefault(), x(m.value + U[S.key]));
    }
    return (S, U) => (s(), l("div", {
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
      onPointerdown: h,
      onPointermove: g,
      onPointerup: k,
      onPointercancel: k,
      onLostpointercapture: k,
      onKeydown: A
    }, [
      U[0] || (U[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (s(!0), l(q, null, J(c.value, (D) => (s(), l("i", {
        key: D.key,
        class: be({ major: D.major }),
        style: Tn({ left: D.left })
      }, null, 6))), 128)),
      U[1] || (U[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, Ls));
  }
}, Vs = { class: "vb-dialog-overlay" }, Js = { class: "vb-wizard-top" }, Gs = { class: "vb-icon-badge" }, Hs = ["aria-valuenow", "aria-label"], Ws = { class: "vb-wizard-copy" }, Ks = { class: "vb-small-label" }, Ys = { id: "vb-wizard-title" }, Xs = { id: "vb-step-hint" }, Qs = {
  key: 0,
  class: "vb-sex-field"
}, Zs = { class: "vb-sr-only" }, eo = ["aria-pressed", "onClick"], to = { class: "vb-person-symbol" }, no = { class: "vb-choice-check" }, so = {
  key: 1,
  class: "vb-number-step"
}, oo = { for: "vb-step-number" }, lo = { class: "vb-number-control" }, ao = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], io = {
  key: 0,
  class: "vb-field"
}, ro = { class: "vb-input-range" }, uo = {
  key: 2,
  class: "vb-activity-field"
}, co = { class: "vb-sr-only" }, vo = ["aria-pressed", "onClick"], mo = { class: "vb-activity-icon" }, po = { class: "vb-radio-mark" }, bo = { key: 0 }, fo = {
  key: 3,
  class: "vb-field"
}, go = {
  key: 4,
  class: "vb-skip-row"
}, yo = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, ho = { class: "vb-wizard-actions" }, ko = ["disabled"], wo = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, $o = { class: "vb-wizard-account-login" }, _o = { class: "vb-wizard-privacy" }, Ao = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = yt(n.profile ? { ...n.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), r = P(0), d = P(""), m = P(null), c = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], v = G(() => {
      const S = c[r.value], U = bs(i.age)[S.key];
      return U ? { ...S, min: U[0], max: U[1] } : S;
    });
    function b() {
      if (r.value === 0 || r.value === 4 || !String(i[v.value.key] ?? "").trim()) return "";
      const S = Number(i[v.value.key]);
      return !Number.isFinite(S) || S < v.value.min || S > v.value.max || r.value === 1 && !Number.isInteger(S) ? `请输入 ${v.value.min}–${v.value.max} ${v.value.unit}${r.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function x(S) {
      i.sex = S, d.value = "";
    }
    function h() {
      i[v.value.key] = "", d.value = "", r.value < 4 && r.value++;
    }
    function g() {
      if (d.value = b(), !d.value) {
        if (r.value < 4) {
          r.value++;
          return;
        }
        d.value = kt(i), d.value || u("complete", { ...i });
      }
    }
    function k() {
      Te(() => m.value?.querySelector(".vb-step-input, .vb-choice-button, .vb-activity-choice")?.focus());
    }
    ce(r, () => {
      d.value = "", k();
    }), $t(k);
    function A(S) {
      if (S.key === "Escape" && n.profile) {
        u("close");
        return;
      }
      if (S.key !== "Tab") return;
      const U = [...m.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], D = U[0], K = U.at(-1);
      S.shiftKey && document.activeElement === D ? (S.preventDefault(), K.focus()) : !S.shiftKey && document.activeElement === K && (S.preventDefault(), D.focus());
    }
    return (S, U) => (s(), l("div", Vs, [
      e("section", {
        ref_key: "dialog",
        ref: m,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: A
      }, [
        e("div", Js, [
          e("span", Gs, [
            N(L, { name: "leaf" })
          ]),
          U[10] || (U[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (s(), l("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: U[0] || (U[0] = (D) => S.$emit("close"))
          }, [
            N(L, { name: "close" })
          ])) : C("", !0)
        ]),
        e("div", {
          class: "vb-wizard-progress",
          role: "progressbar",
          "aria-valuenow": r.value + 1,
          "aria-valuemin": "1",
          "aria-valuemax": "5",
          "aria-label": `档案设置，第 ${r.value + 1} 步，共 5 步`
        }, [
          (s(), l(q, null, J(5, (D) => e("span", {
            key: D,
            class: be({ filled: D <= r.value + 1 })
          }, null, 2)), 64))
        ], 8, Hs),
        e("form", {
          onSubmit: We(g, ["prevent"])
        }, [
          e("div", Ws, [
            e("span", Ks, "第 " + a(r.value + 1) + " 步 / 共 5 步", 1),
            e("h2", Ys, a(v.value.title), 1),
            e("p", Xs, a(v.value.hint), 1)
          ]),
          r.value === 0 ? (s(), l("fieldset", Qs, [
            e("legend", Zs, a(v.value.question), 1),
            (s(), l(q, null, J([["male", "男性"], ["female", "女性"]], ([D, K]) => e("button", {
              key: D,
              type: "button",
              class: be(["vb-choice-button", { selected: i.sex === D }]),
              "aria-pressed": i.sex === D,
              onClick: (X) => x(D)
            }, [
              e("span", to, a(D === "male" ? "♂" : "♀"), 1),
              e("strong", null, a(K), 1),
              e("span", no, [
                i.sex === D ? (s(), de(L, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : C("", !0)
              ])
            ], 10, eo)), 64))
          ])) : r.value < 4 ? (s(), l("div", so, [
            e("label", oo, a(v.value.question), 1),
            e("div", lo, [
              oe((s(), l("input", {
                id: "vb-step-number",
                key: v.value.key,
                "onUpdate:modelValue": U[1] || (U[1] = (D) => i[v.value.key] = D),
                class: "vb-step-input",
                type: "number",
                inputmode: r.value === 1 ? "numeric" : "decimal",
                min: v.value.min,
                max: v.value.max,
                step: r.value === 1 ? 1 : 0.1,
                placeholder: v.value.placeholder,
                "aria-invalid": !!d.value,
                "aria-describedby": d.value ? "vb-step-error" : "vb-step-hint",
                onInput: U[2] || (U[2] = (D) => d.value = "")
              }, null, 40, ao)), [
                [ve, i[v.value.key]]
              ]),
              e("span", null, a(v.value.unit), 1)
            ]),
            N(qs, {
              modelValue: i[v.value.key],
              "onUpdate:modelValue": [
                U[3] || (U[3] = (D) => i[v.value.key] = D),
                U[4] || (U[4] = (D) => d.value = "")
              ],
              min: v.value.min,
              max: v.value.max,
              step: r.value === 1 ? 1 : 0.1,
              fallback: Number(v.value.placeholder),
              label: v.value.question,
              unit: v.value.unit
            }, null, 8, ["modelValue", "min", "max", "step", "fallback", "label", "unit"]),
            r.value === 1 && String(i.age) === "0" ? (s(), l("label", io, [
              U[11] || (U[11] = M("月龄（可选，0–11个月）", -1)),
              oe(e("input", {
                "onUpdate:modelValue": U[5] || (U[5] = (D) => i.ageMonths = D),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [ve, i.ageMonths]
              ])
            ])) : C("", !0),
            e("p", ro, a(v.value.min) + "–" + a(v.value.max) + " " + a(v.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (s(), l("fieldset", uo, [
            e("legend", co, a(v.value.question), 1),
            (s(!0), l(q, null, J(f(on), (D) => (s(), l("button", {
              key: D.key,
              type: "button",
              class: be(["vb-activity-choice", { selected: i.activity === D.key }]),
              "aria-pressed": i.activity === D.key,
              onClick: (K) => i.activity = D.key
            }, [
              e("span", mo, [
                N(L, {
                  name: D.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, a(D.label), 1),
                e("small", null, a(D.detail), 1)
              ]),
              e("span", po, [
                i.activity === D.key ? (s(), l("i", bo)) : C("", !0)
              ])
            ], 10, vo))), 128))
          ])),
          r.value === 4 ? (s(), l("label", fo, [
            U[13] || (U[13] = M("生理阶段（可选）", -1)),
            oe(e("select", {
              "onUpdate:modelValue": U[6] || (U[6] = (D) => i.physiologicalStage = D)
            }, [...U[12] || (U[12] = [
              e("option", { value: "general" }, "一般情况", -1),
              e("option", { value: "pregnant" }, "孕期", -1),
              e("option", { value: "lactating" }, "哺乳期", -1),
              e("option", { value: "special" }, "其他需专业评估的情况", -1)
            ])], 512), [
              [Fe, i.physiologicalStage]
            ]),
            U[14] || (U[14] = e("small", null, "特殊阶段暂停通用营养目标；记录和查询仍可使用。", -1))
          ])) : C("", !0),
          r.value < 4 ? (s(), l("div", go, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: h
            }, "跳过此项")
          ])) : C("", !0),
          e("p", yo, a(d.value), 1),
          e("div", ho, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: r.value === 0 && !t.profile,
              onClick: U[7] || (U[7] = (D) => r.value > 0 ? r.value-- : S.$emit("close"))
            }, [
              N(L, {
                name: "back",
                size: 17
              }),
              M(a(r.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, ko),
            e("button", wo, [
              M(a(r.value === 4 ? "保存我的身体档案" : "下一步"), 1),
              N(L, {
                name: "arrow",
                size: 17
              })
            ])
          ])
        ], 32),
        e("button", {
          type: "button",
          class: "vb-button vb-button-quiet vb-skip-all",
          onClick: U[8] || (U[8] = (D) => u("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", $o, [
          U[15] || (U[15] = M("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: U[9] || (U[9] = (D) => u("login"))
          }, "登录")
        ]),
        e("p", _o, [
          N(L, {
            name: "lock",
            size: 13
          }),
          U[16] || (U[16] = M("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, Ft = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function mn(t) {
  if (t?.__summary) return t.state || "";
  if (!t?.expanded) return t?.state || "";
  const o = String(t.source?.description || ""), n = [];
  return /\bRAW\b/.test(o) ? n.push("生") : /\bRSTD\b|ROASTED/.test(o) ? n.push("烤熟") : /\bBKD\b/.test(o) ? n.push("烘焙") : /FRIED/.test(o) ? n.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(o) && n.push("熟"), /\bDRY MIX\b/.test(o) ? n.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(o) && n.push("干制"), /\bCND\b/.test(o) && n.push("罐装"), /\bFRZ\b|FROZEN/.test(o) && n.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(o) ? n.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(o) && n.push("加盐"), n.length ? n.join(" · ") : "具体品种与配方见数据来源";
}
const Qn = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function Co(t) {
  return (Qn.find((n) => n.items.some(([u]) => u === t?.key) || [n.name, ...n.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([n]) => ae[n]?.source).map(([n, u]) => ({ id: n, label: u }));
}
const So = Object.fromEntries(Qn.flatMap((t) => t.items)), Zn = (t) => So[t] || "";
function Io(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function es(t) {
  const o = P(null), n = P(!1), u = P(!1);
  let i = 0;
  async function r(d = !1) {
    const m = f(typeof t == "function" ? t() : t), c = ++i;
    if (o.value = null, u.value = !1, n.value = !!m && !m.image, !m) {
      n.value = !1;
      return;
    }
    try {
      o.value = await Io(m, { force: d }), u.value = !o.value;
    } catch {
      u.value = !0;
    } finally {
      c === i && (n.value = !1);
    }
  }
  return ce(() => {
    const d = f(typeof t == "function" ? t() : t);
    return [d?.key, d?.image];
  }, () => r(), { immediate: !0 }), { photo: o, loading: n, failed: u, retry: () => r(!0) };
}
function it(t) {
  const o = typeof t == "string" ? t.trim() : "";
  return !o || /deepseek/i.test(o) ? "维衡 AI" : o;
}
const Eo = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, xo = { key: 0 }, Uo = { key: 1 }, jo = {
  key: 2,
  role: "status"
}, Do = { key: 3 }, No = { class: "vb-portion-macros" }, Po = { key: 0 }, Ro = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, To = { class: "vb-estimate-adjust" }, Mo = { class: "vb-field" }, zo = ["disabled"], Oo = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(!1), r = P(""), d = P(null), m = P("");
    let c = 0;
    function v(g) {
      try {
        const A = JSON.parse(Se.getItem("weiheng.food-estimate." + g?.key) || "null");
        if (A?.estimate)
          return d.value = { ...A, cached: !0 }, m.value = A.recipe || "", u("resolved", d.value), !0;
      } catch {
      }
      const k = Bn.estimates?.[g?.key];
      return k ? (d.value = { foodId: g.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: k.model, generatedAt: k.generatedAt, estimate: { entryId: g.key, name: g.name, grams: 100, values: k.values, assumption: k.assumption } }, u("resolved", d.value), !0) : !1;
    }
    async function b() {
      const g = ++c, k = n.food?.key;
      i.value = !0, r.value = "", d.value = null, u("resolved", null);
      try {
        const A = await ct("food-estimate", { foodId: k, recipe: m.value.trim() });
        if (g !== c) return;
        d.value = A;
        try {
          Se.setItem("weiheng.food-estimate." + k, JSON.stringify({ ...A, recipe: m.value }));
        } catch {
          r.value = "估算已返回，但本机缓存保存失败。";
        }
        u("resolved", A);
      } catch (A) {
        g === c && (r.value = A.message);
      } finally {
        g === c && (i.value = !1);
      }
    }
    ce(() => n.food?.key, () => {
      c++, m.value = "", r.value = "", i.value = !1, d.value = null, n.food && v(n.food);
    }, { immediate: !0 }), nt(() => {
      c++;
    });
    const x = (g, k) => Rt(g, k), h = () => Object.values(d.value?.estimate?.values || {}).some((g) => g && typeof g.value != "number" && typeof g.low == "number" && typeof g.high == "number");
    return (g, k) => (s(), l("section", Eo, [
      e("h3", null, a(d.value ? "AI 估算参考" : "AI 营养估算"), 1),
      d.value?.estimate ? (s(), l("p", xo, [...k[1] || (k[1] = [
        e("strong", null, "每100克可食部 · AI单值参考，不是数据库值", -1)
      ])])) : (s(), l("p", Uo, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (s(), l("p", jo, "正在估算…")) : C("", !0),
      d.value?.estimate ? (s(), l("div", Do, [
        e("div", No, [
          (s(!0), l(q, null, J(f(Le).filter((A) => x(d.value.estimate.values[A.id], A.unit) !== null), (A) => (s(), l("div", {
            key: A.id
          }, [
            e("span", null, a(A.name), 1),
            e("strong", null, [
              M(a(x(d.value.estimate.values[A.id], A.unit)) + " ", 1),
              e("small", null, a(A.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, a(h() ? "旧估算范围按上下限中点换为单值参考；" : "") + a(d.value.estimate.assumption), 1),
        d.value.cached ? (s(), l("small", Po, "已保存的预估 · " + a(f(it)(d.value.model || d.value.requestedModel)) + " · " + a(d.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : C("", !0),
        k[2] || (k[2] = e("small", null, "按常见品种与做法给出单一参考值。实际配方、用油和份量会造成误差；维生素和矿物质仍显示未知。", -1))
      ])) : C("", !0),
      r.value ? (s(), l("p", Ro, a(r.value), 1)) : C("", !0),
      e("details", To, [
        e("summary", null, a(d.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", Mo, [
          k[3] || (k[3] = M("原料与做法", -1)),
          oe(e("textarea", {
            "onUpdate:modelValue": k[0] || (k[0] = (A) => m.value = A),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [ve, m.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: b
        }, a(i.value ? "估算中…" : r.value ? "重试估算" : d.value ? "按补充内容重新估算" : "生成估算"), 9, zo)
      ])
    ]));
  }
};
function Fo(t) {
  const o = String(t?.name || ""), n = String(t?.state || ""), u = (i, r) => ({ label: `${i} · 估算${r}克`, grams: r });
  return /米饭/.test(o) && !/生|干/.test(n) ? [u("小碗", 100), u("中碗", 150), u("大碗", 200)] : /鸡蛋/.test(o) && !/粉|液|鸭|鹅/.test(o) ? [u("1个去壳", 50)] : /香蕉/.test(o) ? [u("1根去皮", 100)] : /苹果/.test(o) ? [u("小个去核", 150), u("中个去核", 200)] : /牛奶|酸奶/.test(o) && !/粉|干酪|奶油/.test(o) ? [u("小杯（按重量）", 200), u("一份（按重量）", 250)] : [];
}
const Bo = {
  key: 0,
  class: "vb-portion-presets"
}, Lo = ["onClick"], ts = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = G(() => Fo(n.food));
    return (r, d) => i.value.length ? (s(), l("div", Bo, [
      d[0] || (d[0] = e("span", null, "份量参考", -1)),
      (s(!0), l(q, null, J(i.value, (m) => (s(), l("button", {
        key: m.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (c) => u("choose", m.grams)
      }, a(m.label), 9, Lo))), 128)),
      d[1] || (d[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : C("", !0);
  }
}, qo = ["src", "alt", "loading"], Vo = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, pn = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(!1);
    return ce(() => n.photo?.image, () => i.value = !1), (r, d) => (s(), l("div", {
      class: be(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (s(), l("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: d[0] || (d[0] = (m) => {
          i.value = !0, u("image-error");
        })
      }, null, 40, qo)) : (s(), l("div", Vo, [
        N(L, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, a(f(Zn)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, a(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (s(), l("span", {
        key: 2,
        class: be({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, a(t.photo.imageLabel || "食物照片"), 3)) : C("", !0)
    ], 2));
  }
}), Jo = ["aria-label"], Go = ["aria-label"], Ho = { class: "vb-feature-dialog-body" }, lt = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: o }) {
    const n = o, u = P(null), i = document.activeElement;
    $t(() => Te(() => u.value?.focus())), nt(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function r(d) {
      if (d.key === "Escape" && (d.preventDefault(), n("close")), d.key !== "Tab") return;
      const m = [...u.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((b) => b.getClientRects().length);
      if (!m.length) {
        d.preventDefault();
        return;
      }
      const c = m[0], v = m.at(-1);
      d.shiftKey && (document.activeElement === c || document.activeElement === u.value) ? (d.preventDefault(), v.focus()) : !d.shiftKey && document.activeElement === v && (d.preventDefault(), c.focus());
    }
    return (d, m) => (s(), l("div", {
      class: "vb-feature-overlay",
      onClick: m[1] || (m[1] = We((c) => d.$emit("close"), ["self"]))
    }, [
      e("section", {
        ref_key: "panel",
        ref: u,
        class: be(["vb-feature-dialog", { "is-wide": t.wide }]),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t.title,
        tabindex: "-1",
        onKeydown: r
      }, [
        e("header", null, [
          e("h2", null, a(t.title), 1),
          e("button", {
            type: "button",
            class: "vb-icon-button",
            "aria-label": "关闭" + t.title,
            onClick: m[0] || (m[0] = (c) => d.$emit("close"))
          }, [
            N(L, { name: "close" })
          ], 8, Go)
        ]),
        e("div", Ho, [
          us(d.$slots, "default")
        ])
      ], 42, Jo)
    ]));
  }
}, Wo = { class: "vb-food-detail-top" }, Ko = { class: "vb-eyebrow" }, Yo = { class: "vb-food-state" }, Xo = { class: "vb-pill" }, Qo = {
  key: 0,
  class: "vb-field"
}, Zo = ["value"], el = ["value"], tl = {
  key: 0,
  class: "vb-intake-more"
}, nl = {
  key: 1,
  class: "vb-feature-error"
}, sl = { class: "vb-portion-controls" }, ol = ["max"], ll = ["value"], al = { class: "vb-portion-macros" }, il = { key: 0 }, rl = { key: 0 }, ul = ["disabled"], dl = { class: "vb-food-all-nutrients" }, cl = { class: "vb-nutrient-table" }, vl = { class: "vb-nutrient-table-head" }, ml = { key: 0 }, pl = ["href"], bl = { key: 1 }, fl = { key: 2 }, gl = ["href"], yl = ["href"], hl = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(n.foodId), r = P(100), d = P(xe()), m = P("unspecified"), c = P(null);
    ce(() => n.foodId, (F) => {
      i.value = F;
    }), ce(i, () => {
      c.value = null;
    });
    const v = G(() => ae[i.value]), b = P("");
    async function x() {
      const F = i.value;
      b.value = "";
      try {
        await Ke(F);
      } catch (I) {
        i.value === F && (b.value = I.message);
      }
    }
    ce(i, x, { immediate: !0 });
    const h = G(() => Co(ae[n.foodId])), g = G(() => Le.some((F) => typeof v.value?.nutrients?.[F.id] != "number")), k = G(() => v.value?.__summary ? null : zt(v.value, g.value ? c.value : null)), A = G(() => Pt([{ foodId: v.value.key, grams: Number(r.value), nutritionSnapshot: k.value }]).totals), S = G(() => !v.value?.__summary && Number(r.value) >= 0.1 && Number(r.value) <= 5e3 && d.value && d.value <= xe()), { photo: U, loading: D, failed: K } = es(() => v.value), X = G(() => v.value?.imageCredit || U.value?.imageCredit || U.value);
    function z() {
      S.value && u("add", { foodId: v.value.key, grams: Number(r.value), date: d.value, meal: m.value, nutritionSnapshot: k.value });
    }
    return (F, I) => v.value ? (s(), de(lt, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: I[6] || (I[6] = (B) => F.$emit("close"))
    }, {
      default: st(() => [
        e("div", Wo, [
          e("figure", null, [
            N(pn, {
              food: v.value,
              photo: f(U),
              loading: f(D),
              failed: f(K),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", Ko, a(v.value.categoryName), 1),
            e("h1", null, a(f(Zn)(v.value.key) || f(Ft)(v.value)), 1),
            e("p", Yo, a(f(mn)(v.value)), 1),
            e("span", Xo, a(v.value.source ? "数据库" : c.value ? "AI估算" : "数据不完整"), 1),
            h.value.length ? (s(), l("label", Qo, [
              I[7] || (I[7] = M("选择营养样本", -1)),
              oe(e("select", {
                "onUpdate:modelValue": I[0] || (I[0] = (B) => i.value = B),
                "aria-label": "选择营养样本"
              }, [
                h.value.some((B) => B.id === n.foodId) ? C("", !0) : (s(), l("option", {
                  key: 0,
                  value: n.foodId
                }, "当前食物 · " + a(f(ae)[n.foodId]?.source ? "数据库" : "通用估算"), 9, Zo)),
                (s(!0), l(q, null, J(h.value, (B) => (s(), l("option", {
                  key: B.id,
                  value: B.id
                }, a(B.label), 9, el))), 128))
              ], 512), [
                [Fe, i.value]
              ]),
              I[8] || (I[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : C("", !0)
          ])
        ]),
        g.value && !v.value.__summary ? (s(), l("details", tl, [
          I[9] || (I[9] = e("summary", null, "查看估算依据与调整", -1)),
          N(Oo, {
            food: v.value,
            onResolved: I[1] || (I[1] = (B) => c.value = B)
          }, null, 8, ["food"])
        ])) : C("", !0),
        b.value ? (s(), l("p", nl, [
          M(a(b.value) + " ", 1),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: x
          }, "重试")
        ])) : C("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: We(z, ["prevent"])
        }, [
          N(ts, {
            food: v.value,
            onChoose: I[2] || (I[2] = (B) => r.value = B)
          }, null, 8, ["food"]),
          e("div", sl, [
            e("label", null, [
              I[10] || (I[10] = M("可食部重量", -1)),
              oe(e("input", {
                "onUpdate:modelValue": I[3] || (I[3] = (B) => r.value = B),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [ve, r.value]
              ]),
              I[11] || (I[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              I[12] || (I[12] = M("记录日期", -1)),
              oe(e("input", {
                "onUpdate:modelValue": I[4] || (I[4] = (B) => d.value = B),
                type: "date",
                max: f(xe)(),
                required: ""
              }, null, 8, ol), [
                [ve, d.value]
              ])
            ]),
            e("label", null, [
              I[13] || (I[13] = M("餐次", -1)),
              oe(e("select", {
                "onUpdate:modelValue": I[5] || (I[5] = (B) => m.value = B)
              }, [
                (s(!0), l(q, null, J(f(xt), ([B, ee]) => (s(), l("option", {
                  key: B,
                  value: B
                }, a(ee), 9, ll))), 128))
              ], 512), [
                [Fe, m.value]
              ])
            ])
          ]),
          e("div", al, [
            (s(!0), l(q, null, J(f(Le), (B) => (s(), l("div", {
              key: B.id
            }, [
              e("span", null, a(B.id === "carbs" ? "碳水" : B.name), 1),
              e("strong", null, [
                M(a(f(yn)(A.value[B.id])) + " ", 1),
                A.value[B.id].value != null || A.value[B.id].range ? (s(), l("small", il, a(B.unit), 1)) : C("", !0)
              ]),
              A.value[B.id].range ? (s(), l("small", rl, "AI估算")) : C("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !S.value
          }, [
            N(L, {
              name: "plus",
              size: 16
            }),
            I[14] || (I[14] = M("添加记录", -1))
          ], 8, ul),
          I[15] || (I[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", dl, [
          I[20] || (I[20] = e("summary", null, "查看完整营养与依据", -1)),
          I[21] || (I[21] = e("p", null, "每100克可食部；未知值不按0计算。AI单值为参考估算，不是实测值；旧估算范围按上下限中点换算。", -1)),
          e("div", cl, [
            e("div", vl, [
              I[16] || (I[16] = e("span", null, "营养指标", -1)),
              I[17] || (I[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + a(r.value) + " 克", 1)
            ]),
            (s(!0), l(q, null, J(f(fs), (B) => (s(), l("div", {
              key: B.id
            }, [
              e("span", null, a(B.name), 1),
              e("span", null, a(f(He)(v.value.nutrients[B.id])) + " " + a(v.value.nutrients[B.id] != null ? B.unit : ""), 1),
              e("span", null, a(f(yn)(A.value[B.id])) + " " + a(A.value[B.id].value != null || A.value[B.id].range ? B.unit : "") + a(A.value[B.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + a(v.value.name), 1),
          v.value.source ? (s(), l("p", ml, [
            e("a", {
              href: v.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, a(v.value.source.name), 9, pl),
            M(" · " + a(v.value.source.id) + " · " + a(v.value.source.license), 1),
            I[18] || (I[18] = e("br", null, null, -1)),
            M(a(v.value.source.description), 1)
          ])) : (s(), l("p", bl, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          I[22] || (I[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          X.value ? (s(), l("p", fl, [
            I[19] || (I[19] = M("图片：", -1)),
            e("a", {
              href: X.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, a(X.value.title), 9, gl),
            M(" / " + a(X.value.author) + " · ", 1),
            e("a", {
              href: X.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, a(X.value.license), 9, yl),
            M(" · " + a(X.value.modifications), 1)
          ])) : C("", !0)
        ])
      ]),
      _: 1
    })) : C("", !0);
  }
}, kl = { class: "vb-report-heading" }, wl = { class: "vb-small-label" }, $l = { class: "vb-pill" }, _l = { key: 0 }, Al = ["disabled"], Cl = {
  key: 1,
  class: "vb-inline-warning"
}, Sl = {
  key: 2,
  class: "vb-inline-warning"
}, Il = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, El = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, xl = ["disabled"], Ul = {
  key: 5,
  class: "vb-feature-error"
}, jl = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, Dl = { class: "vb-report-estimation-heading" }, Nl = { class: "vb-pill" }, Pl = {
  key: 0,
  class: "vb-report-estimation-list"
}, Rl = { class: "vb-report-estimation-values" }, Tl = {
  key: 1,
  class: "vb-intake-more"
}, Ml = { class: "vb-report-comparison" }, zl = { key: 0 }, Ol = { key: 1 }, Fl = { key: 2 }, Bl = { key: 3 }, Ll = { key: 4 }, ql = { key: 5 }, Vl = { key: 6 }, Jl = { key: 7 }, Gl = {
  key: 7,
  class: "vb-report-content"
}, Hl = { class: "vb-report-summary" }, Wl = { class: "vb-inline-warning" }, Kl = {
  key: 8,
  class: "vb-intake-more"
}, Yl = { class: "vb-report-meta" }, Xl = { key: 0 }, Ql = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const o = t, n = G(() => o.report?.calculation?.targets || On(o.report?.snapshot?.profile)), u = G(() => {
      const h = o.report?.snapshot, g = o.report?.calculation?.estimation?.foods || [];
      if (!h || !g.length) return h?.intake;
      const k = an(h.entries || [], g, { model: o.report?.model, generatedAt: o.report?.generatedAt });
      return Pt(k);
    }), i = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], r = (h) => h ? new Date(h).toLocaleString("zh-CN", { hour12: !1 }) : "", d = G(() => (o.report?.snapshot?.entries || []).flatMap((h) => {
      const g = h.referenceConfirmed === !1 ? null : ae[h.foodId], k = Le.filter((A) => {
        const S = ln(h, g, A.id);
        return typeof S.value != "number" && !S.range;
      }).map((A) => A.id);
      return k.length ? [{ name: h.name, grams: h.grams, missing: k }] : [];
    })), m = G(() => o.report?.calculation?.estimation?.missingFoodCount ?? d.value.length), c = G(() => o.report?.calculation?.estimation?.foods || []), v = (h) => (h > 0 ? "+" : h < 0 ? "−" : "") + He(Math.abs(h)), b = (h) => v(gs(h)), x = (h) => `${Object.values(h?.values || {}).some((k) => k && typeof k.value != "number" && typeof k.low == "number" && typeof k.high == "number") ? "旧估算范围按上下限中点换为单值参考；" : ""}${h?.assumption || ""}`;
    return (h, g) => (s(), de(lt, {
      title: "AI 营养分析",
      wide: "",
      onClose: g[4] || (g[4] = (k) => h.$emit("close"))
    }, {
      default: st(() => [
        e("div", kl, [
          e("div", null, [
            e("span", wl, a(t.report?.date || t.record?.date), 1),
            g[5] || (g[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", $l, a(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        g[18] || (g[18] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (s(), l("section", _l, [
          g[6] || (g[6] = e("p", null, "分析时向维衡 AI发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: g[0] || (g[0] = (k) => h.$emit("retry"))
          }, "开始AI分析", 8, Al)
        ])) : C("", !0),
        t.stale ? (s(), l("p", Cl, [
          g[7] || (g[7] = M("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (s(), l("button", {
            key: 0,
            class: "vb-text-button",
            onClick: g[1] || (g[1] = (k) => h.$emit("retry"))
          }, "重新分析")) : C("", !0)
        ])) : C("", !0),
        t.record ? C("", !0) : (s(), l("p", Sl, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (s(), l("div", Il, [
          g[9] || (g[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            g[8] || (g[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, a(m.value ? "同时自动估算 " + m.value + " 项食物的缺失指标。" : "程序已计算营养汇总，维衡 AI 正在生成解释与建议。"), 1)
          ])
        ])) : C("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (s(), l("div", El, [
          g[10] || (g[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, a(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: g[2] || (g[2] = (k) => h.$emit("retry"))
          }, "重新分析", 8, xl)
        ])) : C("", !0),
        t.report?.persistenceFailed ? (s(), l("p", Ul, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : C("", !0),
        t.report?.snapshot ? (s(), l(q, { key: 6 }, [
          g[14] || (g[14] = e("h3", { class: "vb-report-section-title" }, "本次摄入汇总", -1)),
          N(un, {
            summary: u.value || t.report.snapshot.intake,
            targets: n.value,
            estimating: t.report.status === "pending",
            details: ""
          }, null, 8, ["summary", "targets", "estimating"]),
          m.value ? (s(), l("section", jl, [
            e("div", Dl, [
              e("div", null, [
                e("h3", null, a(m.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${m.value} 项）`), 1),
                g[11] || (g[11] = e("p", null, "缺少数据库数据的食物会按识别名称和确认克数估算，并计入上方合计；维生素和矿物质仍以可靠数据为准。", -1))
              ]),
              e("span", Nl, a(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            g[12] || (g[12] = e("p", { class: "vb-data-note" }, "缺失数据按常见品种与做法给出AI单值参考，不是数据库值或检测结果；旧估算范围按上下限中点换算。", -1)),
            c.value.length ? (s(), l("ul", Pl, [
              (s(!0), l(q, null, J(c.value, (k) => (s(), l("li", {
                key: k.entryId
              }, [
                e("div", null, [
                  e("strong", null, a(k.name) + " · " + a(f(He)(k.grams)) + " 克", 1),
                  e("small", null, a(x(k)), 1)
                ]),
                e("div", Rl, [
                  (s(!0), l(q, null, J(f(Le).filter((A) => f(Rt)(k.values[A.id], A.unit) !== null), (A) => (s(), l("span", {
                    key: A.id
                  }, a(A.id === "carbs" ? "碳水" : A.name) + " " + a(f(He)(f(Rt)(k.values[A.id], A.unit))) + " " + a(A.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : C("", !0)
          ])) : C("", !0),
          t.report.calculation?.comparison ? (s(), l("details", Tl, [
            g[13] || (g[13] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", Ml, [
              (s(!0), l(q, null, J(t.report.calculation.comparison, (k) => (s(), l("div", {
                key: k.id
              }, [
                e("span", null, a(k.id === "carbs" ? "碳水" : k.name), 1),
                k.estimatedRange?.delta ? (s(), l("strong", zl, " AI 估算参考差值：" + a(b(k.estimatedRange.delta)) + " " + a(k.unit), 1)) : k.delta !== null ? (s(), l("strong", Ol, a(k.delta > 0 ? "+" : "") + a(f(He)(k.delta)) + " " + a(k.unit), 1)) : (s(), l("strong", Fl, a(k.estimatedRange || k.complete && k.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                k.estimatedRange?.delta ? (s(), l("small", Bl, "按数据库已知值与 AI 单值估算计算；旧范围按中点换算。记录未必覆盖全天，不代表达标或不足。")) : k.estimatedRange && !k.estimatedRange.delta ? (s(), l("small", Ll, "含AI单值估算，暂无适用个人目标。")) : k.delta !== null ? (s(), l("small", ql, "记录合计减去全天目标，记录未必覆盖全天。")) : k.complete && k.target === null ? (s(), l("small", Vl, "请完善个人营养档案后再查看与目标的差值。")) : (s(), l("small", Jl, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : C("", !0)
        ], 64)) : C("", !0),
        t.report?.result ? (s(), l("div", Gl, [
          g[15] || (g[15] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", Hl, a(t.report.result.summary), 1),
          (s(), l(q, null, J(i, ([k, A]) => e("section", { key: k }, [
            t.report.result[k]?.length ? (s(), l(q, { key: 0 }, [
              e("h3", null, a(A), 1),
              e("ul", null, [
                (s(!0), l(q, null, J(t.report.result[k], (S, U) => (s(), l("li", { key: U }, a(S), 1))), 128))
              ])
            ], 64)) : C("", !0)
          ])), 64)),
          e("p", Wl, "分析范围：" + a(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : C("", !0),
        t.report ? (s(), l("details", Kl, [
          g[17] || (g[17] = e("summary", null, "查看分析信息", -1)),
          e("div", Yl, [
            e("span", null, "生成时间：" + a(r(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (s(), l("span", Xl, "由 " + a(f(it)(t.report.model)) + " 生成", 1)) : C("", !0),
            e("span", null, "数据版本：" + a(t.report.dataVersion), 1),
            e("span", null, "食物库：" + a(t.report.snapshot?.intake?.dataVersion), 1),
            g[16] || (g[16] = e("small", null, "报告、照片保存在本机浏览器。清理站点数据后无法恢复。", -1))
          ])
        ])) : C("", !0),
        t.report?.status === "complete" && t.record ? (s(), l("button", {
          key: 9,
          type: "button",
          class: "vb-button vb-button-quiet",
          onClick: g[3] || (g[3] = (k) => h.$emit("retry"))
        }, a(t.stale ? "用最新记录重新分析" : "重新分析这一天"), 1)) : C("", !0)
      ]),
      _: 1
    }));
  }
};
function sn(t) {
  const o = String(t || "");
  return /^(?:好的[，,\s]*)?pdf(?:格式)?[。.!！]?$/i.test(o.trim()) ? "pdf" : /^(?:好的[，,\s]*)?(?:word|docx)(?:格式)?[。.!！]?$/i.test(o.trim()) ? "docx" : !/(生成|导出|下载|保存|制作|整理|做成|转换|转成|给我|发我|用|格式|create|generate|export|download|save|make|convert)/i.test(o) || /^(什么是|如何|怎么|为什么|what\b|how\b|why\b)/i.test(o.trim()) ? null : [["pdf", /pdf/i], ["docx", /word|docx|\.doc\b/i], ["png", /png|长图|图片文档|图片格式|(?:导出|保存).{0,8}图片/i]].map(([u, i]) => ({ format: u, index: o.search(i) })).filter((u) => u.index >= 0).sort((u, i) => u.index - i.index)[0]?.format || null;
}
function Zl(t) {
  const o = String(t || "").trim(), n = /^\s*#{1,6}\s+\S/m.exec(o);
  if (!n || !n.index) return o;
  const u = o.slice(0, n.index), i = u.split(`
`).map((m) => m.trim()).filter((m) => m && !/^[-*_]{3,}$/.test(m)), r = /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i, d = /(身高|体重|年龄|孕期|哺乳|过敏|疾病|营养|能量|热量|kcal|蛋白|用药)/i;
  return r.test(u) && i.every((m) => /(PDF|Word|文件|附件|导出|下载|复制|格式)/i.test(m) && !d.test(m)) ? o.slice(n.index).trim() : o;
}
function Kt(t) {
  const o = String(t || "").trim();
  return o.length < 400 && !/^\s*(?:#{1,6}\s|\|)/m.test(o) && /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i.test(o);
}
function ea(t) {
  try {
    const o = new URL(t.trim());
    return ["https:", "http:"].includes(o.protocol) ? o.href : null;
  } catch {
    return null;
  }
}
function pt(t) {
  const o = [], n = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let u = 0, i;
  for (; i = n.exec(t); ) {
    if (i.index > u && o.push(t.slice(u, i.index)), i[1] !== void 0) {
      const r = ea(i[2]);
      o.push(r ? ke("a", { href: r, target: "_blank", rel: "noopener noreferrer" }, i[1]) : i[0]);
    } else i[3] !== void 0 ? o.push(ke("strong", null, i[3])) : o.push(ke("code", null, i[4]));
    u = n.lastIndex;
  }
  return u < t.length && o.push(t.slice(u)), o;
}
function Sn(t) {
  return t.trim().replace(/^\||\|$/g, "").split("|").map((o) => o.trim());
}
function In(t) {
  return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(t);
}
function ta(t) {
  const o = String(t || "").replace(/\r\n?/g, `
`).split(`
`), n = [];
  for (let u = 0; u < o.length; ) {
    const i = o[u];
    if (!i.trim()) {
      u++;
      continue;
    }
    const r = i.match(/^\s*(```|~~~)([^`]*)$/);
    if (r) {
      const v = [], b = r[2].trim().replace(/[^a-z0-9_-]/gi, "").slice(0, 30);
      for (u++; u < o.length && !o[u].trimStart().startsWith(r[1]); ) v.push(o[u++]);
      u < o.length && u++, n.push(ke("pre", null, ke("code", { class: b ? `language-${b}` : void 0 }, v.join(`
`))));
      continue;
    }
    const d = i.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (d) {
      n.push(ke(`h${d[1].length}`, null, pt(d[2]))), u++;
      continue;
    }
    if (u + 1 < o.length && i.includes("|") && In(o[u + 1])) {
      const v = Sn(i), b = [];
      for (u += 2; u < o.length && o[u].trim() && o[u].includes("|"); ) b.push(Sn(o[u++]));
      n.push(ke("div", { class: "vb-markdown-table-wrap" }, ke("table", null, [
        ke("thead", null, ke("tr", null, v.map((x) => ke("th", null, pt(x))))),
        ke("tbody", null, b.map((x) => ke("tr", null, v.map((h, g) => ke("td", null, pt(x[g] || ""))))))
      ])));
      continue;
    }
    const m = i.match(/^\s{0,3}(?:([-*+])|(\d+)\.)\s+(.+)$/);
    if (m) {
      const v = !!m[2], b = [];
      for (; u < o.length; ) {
        const x = o[u].match(/^\s{0,3}(?:([-*+])|(\d+)\.)\s+(.+)$/);
        if (!x || !!x[2] !== v) break;
        b.push(ke("li", null, pt(x[3]))), u++;
      }
      n.push(ke(v ? "ol" : "ul", null, b));
      continue;
    }
    const c = [i];
    for (u++; u < o.length && o[u].trim() && !/^\s{0,3}(?:#{1,6}\s|[-*+]\s|\d+\.\s|```|~~~)/.test(o[u]) && !(u + 1 < o.length && o[u].includes("|") && In(o[u + 1])); ) c.push(o[u++]);
    n.push(ke("p", null, pt(c.join(`
`))));
  }
  return n;
}
const Nt = at({
  name: "SafeMarkdown",
  props: { content: { type: String, default: "" } },
  setup(t) {
    return () => ke("div", { class: "vb-safe-markdown" }, ta(t.content));
  }
}), na = ["aria-busy"], sa = {
  class: "vb-chat-export-options",
  "aria-label": "下载计划"
}, oa = ["href", "download", "title"], la = ["disabled", "onClick"], aa = {
  key: 0,
  role: "status"
}, ia = {
  key: 1,
  role: "alert"
}, ra = { key: 2 }, ua = {
  __name: "ChatMessageExport",
  props: { content: { type: String, required: !0 }, question: { type: String, default: "" }, auto: Boolean },
  emits: ["retry"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P({}), r = P(""), d = P(""), m = P("");
    let c = 0, v = !1, b = !1;
    const x = G(() => sn(n.question)), h = G(() => r.value || x.value || "pdf"), g = G(() => ({ pdf: "PDF", docx: "Word", png: "图片" })[h.value]), k = G(() => i.value[h.value]), A = G(() => Zl(n.content));
    function S() {
      for (const K of Object.values(i.value)) setTimeout(() => URL.revokeObjectURL(K.url), 3e4);
      i.value = {};
    }
    async function U(K = h.value) {
      if (d.value || i.value[K]) {
        i.value[K] && (r.value = K);
        return;
      }
      const X = c, z = A.value, F = n.question;
      r.value = K, d.value = K, m.value = "";
      try {
        if (x.value && Kt(z)) throw new Error("尚未生成文档正文，请重新生成。");
        const { createChatExport: I, preparedChatDownload: B } = await import("./chatExport-BCM5BWUu.js");
        if (X !== c) return;
        const ee = await I(K, z, { question: F });
        if (X !== c) return;
        i.value = { ...i.value, [K]: B(ee) };
      } catch (I) {
        X === c && (m.value = I instanceof Error ? I.message : "文件生成失败，请重试。");
      } finally {
        X === c && (d.value = "");
      }
    }
    function D() {
      !v || !n.auto || !x.value || b || d.value || i.value[x.value] || m.value || (b = !0, requestAnimationFrame(() => setTimeout(() => {
        b = !1, v && n.auto && x.value && U(x.value);
      }, 0)));
    }
    return ce(() => [n.content, n.question], () => {
      c++, S(), r.value = "", d.value = "", m.value = "", D();
    }), ce(() => n.auto, D), $t(() => {
      v = !0, D();
    }), nt(() => {
      v = !1, c++, S();
    }), (K, X) => x.value ? (s(), l("div", {
      key: 0,
      class: "vb-chat-document",
      "aria-label": "计划正文与下载",
      "aria-busy": !!d.value
    }, [
      N(f(Nt), {
        class: "vb-chat-document-body",
        content: A.value
      }, null, 8, ["content"]),
      e("div", sa, [
        (s(), l(q, null, J([["pdf", "PDF"], ["docx", "Word"], ["png", "长图"]], ([z, F]) => (s(), l(q, { key: z }, [
          i.value[z] ? (s(), l("a", {
            key: 0,
            href: i.value[z].url,
            download: i.value[z].filename,
            title: i.value[z].filename
          }, a(z === "png" ? "保存长图" : "下载 " + F), 9, oa)) : (s(), l("button", {
            key: 1,
            type: "button",
            disabled: !!d.value,
            onClick: (I) => U(z)
          }, a(d.value === z ? "正在生成…" : "生成 " + F), 9, la))
        ], 64))), 64))
      ]),
      k.value ? (s(), l("small", aa, a(g.value) + " 文件已生成", 1)) : C("", !0),
      m.value ? (s(), l("div", ia, [
        e("p", null, a(m.value), 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: X[0] || (X[0] = (z) => f(Kt)(A.value) ? u("retry") : U())
        }, a(f(Kt)(A.value) ? "重新生成正文" : "重试生成文件"), 1)
      ])) : C("", !0),
      k.value?.pageCount ? (s(), l("small", ra, "内容较长，" + a(k.value.pageCount) + " 张图片已打包为 ZIP。", 1)) : C("", !0)
    ], 8, na)) : C("", !0);
  }
}, da = /* @__PURE__ */ Jn(ua, [["__scopeId", "data-v-3fcab6f8"]]);
function ca({ viewport: t, isActive: o = () => !0, onChange: n = () => {
}, threshold: u = 64 }) {
  let i = !0;
  const r = () => o() && t() && t().clientHeight > 0, d = (b) => Math.max(0, b.scrollHeight - b.clientHeight - b.scrollTop);
  function m() {
    const b = t();
    n(!!(r() && d(b) > u));
  }
  function c(b = !1) {
    if (b && (i = !0), !r()) {
      n(!1);
      return;
    }
    const x = t();
    i && (x.scrollTop = Math.max(0, x.scrollHeight - x.clientHeight)), m();
  }
  function v() {
    r() && (i = d(t()) <= u, m());
  }
  return { layout: c, onScroll: v, jump: () => c(!0) };
}
function va({ viewport: t, content: o, active: n, thread: u, messages: i }) {
  const r = P(!1), d = ca({ viewport: () => t.value, isActive: () => n.value, onChange: (A) => r.value = A });
  let m = !1, c = !1, v = !1, b, x;
  function h(A = !1) {
    v = v || A, !(!m || c) && (c = !0, Te(() => {
      if (!m) {
        c = !1;
        return;
      }
      b = requestAnimationFrame(() => {
        if (b = void 0, c = !1, !m) return;
        const S = v;
        v = !1, d.layout(S);
      });
    }));
  }
  function g() {
    x?.disconnect(), t.value && x?.observe(t.value), o.value && x?.observe(o.value), h();
  }
  const k = () => h();
  return ce(i, () => h(), { deep: !0, flush: "post" }), ce([u, n], () => h(!0), { flush: "post" }), ce([t, o], g, { flush: "post" }), $t(() => {
    m = !0, typeof ResizeObserver < "u" && (x = new ResizeObserver(k)), g(), window.addEventListener("resize", k), h(!0);
  }), nt(() => {
    m = !1, x?.disconnect(), b !== void 0 && cancelAnimationFrame(b), window.removeEventListener("resize", k);
  }), { showJump: r, onScroll: d.onScroll, onContentLoad: k, jumpToLatest: () => h(!0) };
}
function ma(t, o, n) {
  return t.push({ id: o, role: "assistant", content: "", status: "sending", createdAt: n }), t[t.length - 1];
}
function En(t, o = {}, n = []) {
  const u = new Set(n), i = {};
  for (const r of new Set((t.threads || []).map((d) => d.date))) {
    const d = (t.threads || []).filter((b) => b.date === r).sort((b, x) => String(x.createdAt || "").localeCompare(String(b.createdAt || ""))), m = d.find((b) => b.id === o[r]), c = d.find((b) => b.id === t.activeByDate?.[r]), v = m && (m.messages?.length || u.has(m.id)) ? m : c?.messages?.length ? c : d.find((b) => b.messages?.length) || m || c || d[0];
    v && (i[r] = v.id);
  }
  return i;
}
const pa = 24e3, xn = 220;
function ba(t, o) {
  const n = Date.parse(t || o || "");
  return Number.isFinite(n) ? n : 0;
}
function Un(t) {
  const o = String(t || "").trim();
  return o.length > xn ? `${o.slice(0, xn)}…` : o;
}
function fa(t, o, n = !0) {
  if (!n || !Array.isArray(t)) return "";
  const u = [];
  for (const d of t) {
    if (!d || d.id === o || !Array.isArray(d.messages)) continue;
    const m = d.messages;
    for (let c = 0; c < m.length - 1; c++) {
      const v = m[c], b = m[c + 1];
      if (v?.role !== "user" || b?.role !== "assistant" || v.status !== "complete" || b.status !== "complete" || v.attachments?.length || b.attachments?.length) continue;
      const x = Un(v.content), h = Un(b.content);
      !x || !h || (u.push({
        date: typeof d.date == "string" ? d.date : "",
        time: ba(v.createdAt, d.createdAt),
        user: x,
        assistant: h
      }), c++);
    }
  }
  const i = u.sort((d, m) => d.time - m.time).slice(-50);
  let r = i.map((d) => `${d.date ? `日期 ${d.date}：` : ""}用户：${d.user}
助手：${d.assistant}`).join(`

`);
  for (; r.length > pa && i.length; )
    i.shift(), r = i.map((d) => `${d.date ? `日期 ${d.date}：` : ""}用户：${d.user}
助手：${d.assistant}`).join(`

`);
  return r;
}
function ga(t) {
  if (!t || typeof t != "object" || Array.isArray(t) || kt(t)) return null;
  const o = (r) => r == null || r === "" ? void 0 : Number(r), n = o(t.age), u = o(t.height), i = o(t.weight);
  return {
    sex: t.sex || "",
    ...n !== void 0 ? { age: n } : {},
    ...u !== void 0 ? { height: u } : {},
    ...i !== void 0 ? { weight: i } : {},
    activity: t.activity,
    ...o(t.ageMonths) !== void 0 ? { ageMonths: o(t.ageMonths) } : {},
    ...t.physiologicalStage ? { physiologicalStage: t.physiologicalStage } : {}
  };
}
const ya = 3, ha = 24e3, jn = 6e4, ka = 8e5, wa = 6, $a = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function ns(t) {
  const o = String(t.name || "").split(".").pop().toLowerCase(), n = ["jpg", "jpeg", "png", "webp"].includes(o) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(o) ? "document" : null;
  if (!n) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (n === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(n === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return n;
}
function _a(t) {
  const o = String(t).replace(/\u0000/g, "").trim();
  if (!o) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (o.length > ha) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return o;
}
let bt;
function Aa() {
  return bt || (bt = new Promise((t, o) => {
    if (!globalThis.indexedDB) {
      o(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const n = indexedDB.open(wt("weiheng.chat-attachments.v1"), 1);
    n.onupgradeneeded = () => n.result.createObjectStore("attachments", { keyPath: "id" }), n.onsuccess = () => {
      const u = n.result;
      u.onversionchange = () => {
        u.close(), bt = void 0;
      }, t(u);
    }, n.onerror = n.onblocked = () => o(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw bt = void 0, t;
  })), bt;
}
async function bn(t, o) {
  const n = await Aa();
  if (t === "readwrite" && ot()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((u, i) => {
    const r = n.transaction("attachments", t), d = o(r.objectStore("attachments"));
    r.oncomplete = () => u(d.result), r.onerror = r.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const Ca = (t) => bn("readwrite", (o) => o.put(t)), Yt = (t) => bn("readonly", (o) => o.get(t)), Et = (t) => bn("readwrite", (o) => o.delete(t));
function Sa(t) {
  return new Promise((o, n) => {
    const u = new FileReader();
    u.onload = () => o(String(u.result)), u.onerror = () => n(new Error("照片读取失败，请重新选择。")), u.readAsDataURL(t);
  });
}
async function Ia(t) {
  const o = await createImageBitmap(t).catch(() => {
    throw new Error("照片无法读取，请换用 JPG、PNG 或 WebP。");
  });
  try {
    if (o.width * o.height > 4e7) throw new Error("照片分辨率过大，请缩小后上传。");
    const n = document.createElement("canvas"), u = Math.min(1, 1600 / Math.max(o.width, o.height));
    n.width = Math.max(1, Math.round(o.width * u)), n.height = Math.max(1, Math.round(o.height * u));
    const i = n.getContext("2d");
    if (!i) throw new Error("浏览器暂不支持照片处理。");
    i.fillStyle = "#fff", i.fillRect(0, 0, n.width, n.height), i.drawImage(o, 0, 0, n.width, n.height);
    for (const r of [0.85, 0.68, 0.5]) {
      const d = await new Promise((c, v) => n.toBlob((b) => b ? c(b) : v(new Error("照片压缩失败。")), "image/jpeg", r)), m = await Sa(d);
      if (m.length <= ka) return m;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    o.close();
  }
}
async function Ea(t) {
  const o = await import("./pdf-jk_a9_-5.js");
  o.GlobalWorkerOptions.workerSrc = "/content-dist/pdf.worker.min.js";
  const n = o.getDocument({
    data: new Uint8Array(await t.arrayBuffer()),
    useSystemFonts: !0,
    cMapUrl: "/content-dist/pdf-resources/cmaps/",
    cMapPacked: !0,
    standardFontDataUrl: "/content-dist/pdf-resources/standard_fonts/"
  });
  try {
    const u = await n.promise;
    if (u.numPages > 40) throw new Error("PDF 超过 40 页，请截取需要讨论的页面后上传。");
    const i = [];
    for (let r = 1; r <= u.numPages; r++) {
      const d = await u.getPage(r), m = await d.getTextContent();
      if (i.push(m.items.map((c) => "str" in c ? c.str + (c.hasEOL ? `
` : " ") : "").join("")), i.join(`
`).length > 24e3) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
      d.cleanup();
    }
    return i.join(`

`);
  } catch (u) {
    throw u instanceof Error && u.name === "PasswordException" ? new Error("PDF 已加密，请解锁后再上传。") : u;
  } finally {
    await n.destroy();
  }
}
async function xa(t) {
  const { unzipSync: o, strFromU8: n } = await import("./browser-CJhYS1h6.js"), u = o(new Uint8Array(await t.arrayBuffer()), {
    filter: (r) => r.name === "word/document.xml" && r.originalSize <= 4 * 1024 * 1024
  });
  if (!u["word/document.xml"]) throw new Error("Word 文件无效或内容过大，请另存为 DOCX 或 TXT 后重试。");
  const i = new DOMParser().parseFromString(n(u["word/document.xml"]), "application/xml");
  if (i.querySelector("parsererror")) throw new Error("Word 文件内容无法读取。");
  return Array.from(i.getElementsByTagNameNS("*", "p")).map((r) => Array.from(r.getElementsByTagNameNS("*", "*")).map((d) => d.localName === "t" ? d.textContent || "" : d.localName === "tab" ? "	" : d.localName === "br" ? `
` : "").join("")).join(`
`);
}
async function Ua(t, o) {
  const n = ns(t), u = { id: o, kind: n, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (n === "image") return { ...u, mimeType: "image/jpeg", dataUrl: await Ia(t) };
  const i = t.name.split(".").pop()?.toLowerCase();
  let r;
  try {
    if (i === "pdf") r = await Ea(t);
    else if (i === "docx") r = await xa(t);
    else {
      const d = new Uint8Array(await t.arrayBuffer());
      r = new TextDecoder().decode(d), r.includes("�") && (r = new TextDecoder("gb18030").decode(d));
    }
  } catch (d) {
    throw new Error(d instanceof Error && /[\u4e00-\u9fff]/.test(d.message) ? d.message : "文件无法读取，请确认文件完整，或另存为 TXT 后重试。");
  }
  return { ...u, text: _a(r) };
}
const ja = {
  class: "vb-chat-page vb-simple-chat",
  "aria-label": "维衡 AI 助手对话"
}, Da = { class: "vb-simple-header" }, Na = { class: "vb-simple-actions" }, Pa = { class: "vb-simple-date" }, Ra = ["max", "disabled"], Ta = { class: "vb-simple-options" }, Ma = { "aria-label": "对话选项" }, za = { class: "vb-simple-options-panel" }, Oa = {
  key: 0,
  class: "vb-simple-history"
}, Fa = ["value", "disabled"], Ba = ["value"], La = ["value"], qa = { class: "vb-memory-toggle" }, Va = ["disabled"], Ja = { class: "vb-simple-starters" }, Ga = ["onClick"], Ha = { class: "vb-simple-context" }, Wa = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, Ka = { class: "vb-simple-message-body" }, Ya = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, Xa = ["aria-label", "onClick"], Qa = ["src", "alt"], Za = {
  key: 1,
  class: "vb-simple-loading"
}, ei = {
  key: 2,
  class: "vb-simple-text"
}, ti = {
  class: "vb-simple-error",
  role: "alert"
}, ni = ["onClick"], si = {
  key: 4,
  class: "vb-simple-text"
}, oi = {
  key: 7,
  class: "vb-chat-search-status",
  role: "status"
}, li = {
  key: 8,
  class: "vb-chat-search-warning"
}, ai = {
  key: 9,
  class: "vb-chat-sources"
}, ii = ["href"], ri = {
  key: 10,
  class: "vb-chat-sources"
}, ui = ["href"], di = { key: 0 }, ci = {
  key: 11,
  class: "vb-simple-message-meta"
}, vi = { class: "vb-simple-composer" }, mi = { class: "vb-simple-composer-inner" }, pi = {
  key: 0,
  class: "vb-simple-tools"
}, bi = { class: "vb-simple-quick" }, fi = { class: "vb-simple-quick-panel" }, gi = ["onClick"], yi = {
  key: 0,
  class: "vb-simple-status",
  role: "status"
}, hi = ["accept"], ki = {
  key: 0,
  class: "vb-chat-draft-attachments",
  "aria-label": "待发送附件"
}, wi = ["disabled", "aria-label", "onClick"], $i = ["src", "alt"], _i = {
  key: 0,
  role: "status"
}, Ai = {
  key: 1,
  role: "alert"
}, Ci = { key: 2 }, Si = ["aria-label", "onClick"], Ii = { class: "vb-simple-editor-bottom" }, Ei = { class: "vb-chat-input-tools" }, xi = {
  class: "vb-chat-search-toggle",
  title: "开启后会用本条问题文字搜索网页；不会把档案、饮食记录或附件发送给搜索接口。"
}, Ui = ["disabled"], ji = {
  key: 1,
  class: "vb-simple-notice",
  role: "alert"
}, Di = ["role"], Ni = { class: "vb-simple-footnote" }, Pi = { class: "vb-simple-privacy" }, Ri = { class: "vb-reset-actions" }, Ti = ["src", "alt"], Mi = {
  key: 1,
  class: "vb-chat-text-preview"
}, zi = { class: "vb-data-note" }, Dn = "weiheng.ai-diet-chat.v1", Oi = /* @__PURE__ */ at({
  __name: "AiDietAssistantPage",
  props: {
    active: { type: Boolean, default: !0 },
    records: { default: () => [] },
    targets: { default: null },
    profile: { default: null },
    initialDate: { default: "" }
  },
  setup(t) {
    const o = t, n = [
      "分析今天已记录的营养摄入，并说明数据完整性。",
      "查看已记录食物的维生素和矿物质摄入情况，缺失数据请说明。",
      "解释我的营养参考值及其适用范围。",
      "根据饮食记录安排下一餐，先询问必要的就餐条件。"
    ];
    function u() {
      return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    function i(E) {
      return Array.isArray(E) ? E.flatMap(($) => {
        if (!$ || typeof $ != "object") return [];
        const y = $;
        try {
          const V = new URL(String(y.url || ""));
          return ["https:", "http:"].includes(V.protocol) ? [{
            title: typeof y.title == "string" ? y.title.slice(0, 180) : "网页来源",
            url: V.href,
            siteName: typeof y.siteName == "string" ? y.siteName.slice(0, 100) : void 0,
            date: typeof y.date == "string" ? y.date.slice(0, 40) : void 0
          }] : [];
        } catch {
          return [];
        }
      }).slice(0, 5) : [];
    }
    function r(E) {
      return Array.isArray(E) ? E.flatMap(($) => {
        if (!$ || typeof $ != "object") return [];
        const y = $;
        try {
          const V = new URL(String(y.url || ""));
          return V.protocol !== "https:" || typeof y.id != "string" || typeof y.title != "string" ? [] : [{
            id: y.id.slice(0, 80),
            title: y.title.slice(0, 180),
            version: typeof y.version == "string" ? y.version.slice(0, 100) : "",
            url: V.href,
            summary: typeof y.summary == "string" ? y.summary.slice(0, 1200) : "",
            kind: typeof y.kind == "string" ? y.kind.slice(0, 40) : "本地整理摘要"
          }];
        } catch {
          return [];
        }
      }).slice(0, 3) : [];
    }
    function d() {
      try {
        const E = JSON.parse(Se.getItem(Dn) || "null");
        if (!E || typeof E != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0, webSearchEnabled: !1 };
        const $ = E, y = Array.isArray($.threads) ? $.threads.flatMap((ne) => {
          if (!ne || typeof ne != "object") return [];
          const Y = ne;
          return typeof Y.id != "string" || !Ge(Y.date) || !Array.isArray(Y.messages) ? [] : [{
            id: Y.id,
            date: Y.date,
            createdAt: typeof Y.createdAt == "string" ? Y.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: Y.messages.filter((ie) => !!(ie && typeof ie == "object" && ["user", "assistant"].includes(ie.role) && typeof ie.content == "string")).map((ie) => ({
              ...ie,
              status: ie.status === "sending" ? "failed" : ie.status,
              error: ie.status === "sending" ? "页面刷新时请求中断。点击重试可继续这条问题。" : ie.error,
              webSearch: typeof ie.webSearch == "boolean" ? ie.webSearch : void 0,
              webSearchStatus: typeof ie.webSearchStatus == "string" ? ie.webSearchStatus.slice(0, 80) : void 0,
              webSearchWarning: typeof ie.webSearchWarning == "string" ? ie.webSearchWarning.slice(0, 160) : void 0,
              webSources: i(ie.webSources),
              localSources: r(ie.localSources)
            }))
          }];
        }) : [], V = $.activeByDate && typeof $.activeByDate == "object" ? Object.fromEntries(Object.entries($.activeByDate).filter(([ne, Y]) => Ge(ne) && typeof Y == "string")) : {};
        return { threads: y.slice(-60), activeByDate: V, memoryEnabled: $.memoryEnabled !== !1, webSearchEnabled: $.webSearchEnabled === !0 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0, webSearchEnabled: !1 };
      }
    }
    const m = d(), c = P(m.threads), v = P(En(m, m.activeByDate)), b = /* @__PURE__ */ new Set(), x = P(m.memoryEnabled), h = P(m.webSearchEnabled), g = P(xe());
    ce(() => o.initialDate, (E) => {
      E && Ge(E) && E <= xe() && (g.value = E);
    });
    const k = P(""), A = P(null), S = P([]), U = P({}), D = P(null), K = G(() => S.value.some((E) => E.status === "ready"));
    let X = 0;
    const z = P(""), F = P(""), I = P(!1), B = P(null), ee = P(null), re = G(() => c.value.some((E) => E.messages.some(($) => $.status === "sending"))), W = G(() => o.records.find((E) => E.date === g.value)), ge = G(() => W.value?.entries || []), ue = G(() => ({
      energy: typeof o.targets?.tdee == "number" ? o.targets.tdee : null,
      protein: o.targets?.macros?.find((E) => E.id === "protein")?.grams ?? null,
      carbs: o.targets?.macros?.find((E) => E.id === "carbs")?.grams ?? null,
      fat: o.targets?.macros?.find((E) => E.id === "fat")?.grams ?? null
    })), ye = G(() => c.value.find((E) => E.id === v.value[g.value])), fe = G(() => ye.value?.messages || []), { showJump: $e, onScroll: Ie, onContentLoad: Q, jumpToLatest: w } = va({ viewport: B, content: ee, active: G(() => o.active), thread: G(() => ye.value?.id), messages: fe }), p = G(() => c.value.filter((E) => E.messages.length).sort((E, $) => $.createdAt.localeCompare(E.createdAt)));
    function j(E) {
      const $ = E.target.value, y = c.value.find((V) => V.id === $);
      y && (g.value = y.date, v.value[y.date] = y.id);
    }
    function se(E) {
      const $ = fe.value, y = $.findIndex((V) => V.id === E);
      return $.slice(0, y).reverse().find((V) => V.role === "user")?.content || "";
    }
    function O(E) {
      const { id: $, kind: y, name: V, size: ne, mimeType: Y } = E;
      return { id: $, kind: y, name: V, size: ne, mimeType: Y };
    }
    function _(E) {
      return E >= 1024 * 1024 ? `${(E / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(E / 1024))} KB`;
    }
    async function R(E) {
      const $ = X;
      F.value = "";
      for (const y of E) {
        if ($ !== X) break;
        if (S.value.length >= ya) {
          F.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let V;
        try {
          V = ns(y);
        } catch (Y) {
          F.value = Y instanceof Error ? Y.message : "这个文件暂不支持。";
          continue;
        }
        const ne = u();
        S.value.push({ id: ne, kind: V, name: y.name.slice(0, 180), size: y.size, mimeType: y.type, status: "reading" });
        try {
          const Y = await Ua(y, ne);
          if (!S.value.some((we) => we.id === ne)) continue;
          if (S.value.reduce((we, Ee) => we + (Ee.value?.text?.length || 0), Y.text?.length || 0) > jn) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await Ca(Y);
          const pe = S.value.find((we) => we.id === ne);
          if (!pe) {
            await Et(ne);
            continue;
          }
          U.value[ne] = Y, pe.value = Y, pe.status = "ready";
        } catch (Y) {
          const ie = S.value.find((pe) => pe.id === ne);
          ie && (ie.status = "failed", ie.error = Y instanceof Error ? Y.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function te(E) {
      const $ = E.target, y = Array.from($.files || []);
      $.value = "", R(y);
    }
    function le(E) {
      const $ = Array.from(E.clipboardData?.files || []).filter((y) => y.type.startsWith("image/"));
      $.length && (E.preventDefault(), R($));
    }
    function Ue(E) {
      E.dataTransfer?.types.includes("Files") && E.preventDefault();
    }
    function he(E) {
      const $ = Array.from(E.dataTransfer?.files || []);
      $.length && (E.preventDefault(), R($));
    }
    function je(E) {
      S.value = S.value.filter(($) => $.id !== E), delete U.value[E], Et(E).catch(() => {
        F.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function De() {
      const E = S.value.flatMap((y) => y.status === "ready" && y.value ? [y.value] : []), $ = new Set(E.map((y) => y.id));
      return S.value = S.value.filter((y) => !$.has(y.id)), E;
    }
    async function _e(E) {
      try {
        const $ = U.value[E.id] || await Yt(E.id);
        if (!$) throw new Error("附件已不在本地存储中，请重新添加。");
        D.value = $;
      } catch ($) {
        F.value = $ instanceof Error ? $.message : "无法预览附件。";
      }
    }
    ce(() => fe.value.flatMap((E) => E.attachments || []).map((E) => E.id).join(","), async () => {
      for (const E of fe.value.flatMap(($) => $.attachments || []))
        if (!U.value[E.id])
          try {
            const $ = await Yt(E.id);
            $ && (U.value[E.id] = $);
          } catch {
          }
    }, { immediate: !0 });
    function Ae(E) {
      const $ = { id: u(), date: E, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (c.value.push($), c.value.length > 60) {
        const y = c.value.splice(0, c.value.length - 60);
        vt(y.flatMap((V) => V.messages));
      }
      return v.value[E] = $.id, $;
    }
    function vt(E) {
      for (const $ of E.flatMap((y) => y.attachments || []))
        delete U.value[$.id], Et($.id).catch(() => {
          z.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function Xe(E) {
      const $ = v.value[E];
      if ($ && c.value.some((V) => V.id === $)) return;
      const y = c.value.filter((V) => V.date === E).sort((V, ne) => ne.createdAt.localeCompare(V.createdAt))[0];
      y ? v.value[E] = y.id : Ae(E);
    }
    Xe(g.value), ce(g, (E) => {
      if (!Ge(E) || E > xe()) {
        g.value = xe();
        return;
      }
      Xe(E), F.value = "";
    });
    let Qe = !1, mt = !1;
    function rt() {
      if (re.value) {
        mt = !0;
        return;
      }
      mt = !1, Qe = !0;
      const E = d();
      c.value = E.threads, v.value = En(E, v.value, [...b]), x.value = E.memoryEnabled, h.value = E.webSearchEnabled, Xe(g.value), Te(() => {
        Qe = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", rt), nt(() => window.removeEventListener("weiheng-chat-synced", rt));
    let qe;
    function ze() {
      if (qe && clearTimeout(qe), qe = void 0, !ot())
        try {
          Se.setItem(Dn, JSON.stringify({ threads: c.value, activeByDate: v.value, memoryEnabled: x.value, webSearchEnabled: h.value })), z.value = "";
        } catch {
          z.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function _t() {
      Qe || (qe && clearTimeout(qe), qe = setTimeout(ze, 160));
    }
    ce([c, v, x, h], _t, { deep: !0 });
    function ut() {
      ze();
    }
    typeof window < "u" && (window.addEventListener("pagehide", ut), window.addEventListener("weiheng-chat-flush", ut)), nt(() => {
      ze(), typeof window < "u" && (window.removeEventListener("pagehide", ut), window.removeEventListener("weiheng-chat-flush", ut));
    });
    let Pe;
    function Bt() {
      const E = Pe;
      E && (Pe = void 0, E.controller.abort(), E.assistantMessage.status === "sending" && (E.assistantMessage.status = "failed", E.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), ze());
    }
    function At(E) {
      const $ = new Date(E);
      return Number.isNaN($.getTime()) ? "新对话" : $.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function H(E) {
      const $ = new Date(E);
      return Number.isNaN($.getTime()) ? "" : $.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function T() {
      return ge.value.map((E) => ({
        foodId: E.foodId,
        name: E.name,
        grams: E.grams,
        meal: E.meal,
        referenceConfirmed: E.referenceConfirmed,
        source: E.source,
        nutritionSnapshot: E.nutritionSnapshot
      }));
    }
    async function Z(E, $) {
      const y = E.slice(0, $).filter((pe) => pe.status === "complete"), V = [];
      for (const { role: pe, content: we, attachments: Ee } of y) {
        const Be = { role: pe, content: we.slice(0, 1200), attachments: Ee };
        pe === "user" ? V.at(-1)?.role === "user" ? V[V.length - 1] = Be : V.push(Be) : V.at(-1)?.role === "user" && V.push(Be);
      }
      for (; V[0]?.role !== "user"; ) V.shift();
      const ne = V.slice(-11);
      for (; ne.reduce((pe, we) => pe + we.content.length, 0) > 9e3; ) ne.splice(0, 2);
      let Y = 0, ie = 0;
      for (let pe = ne.length - 1; pe >= 0; pe--) {
        const we = ne[pe], Ee = [];
        let Be = !1;
        for (const St of we.attachments || []) {
          const Ve = U.value[St.id] || await Yt(St.id);
          if (!Ve) {
            if (pe === ne.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Be = !0;
            continue;
          }
          if (Y + (Ve.text?.length || 0) > jn || Ve.kind === "image" && ie >= wa) {
            Be = !0;
            continue;
          }
          Y += Ve.text?.length || 0, Ve.kind === "image" && ie++, Ee.push(Ve);
        }
        we.attachments = Ee.length ? Ee : void 0, Be && (we.content = we.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return ne;
    }
    async function Ce(E, $, y = []) {
      const V = E.trim() || (y.length ? "请帮我分析这些附件。" : "");
      if (!V || V.length > 1200) return !1;
      Bt(), Xe(g.value);
      const ne = ye.value;
      if (!ne) return !1;
      let Y, ie, pe = h.value;
      if ($) {
        ie = ne.messages.findIndex((Oe) => Oe.id === $ && Oe.role === "assistant");
        const Je = ne.messages[ie - 1];
        if (ie < 1 || Je?.role !== "user")
          return F.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        pe = Je.webSearch !== !1, Y = ne.messages[ie], Y.status = "sending", Y.error = void 0, Y.content = "", Y.webSearchWarning = void 0, Y.webSources = void 0, Y.localSources = void 0, Y.webSearchStatus = pe ? "正在联网搜索…" : "正在回复…";
      } else
        ne.messages.push({ id: u(), role: "user", content: V, attachments: y.length ? y.map(O) : void 0, webSearch: pe, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), Y = ma(ne.messages, u(), (/* @__PURE__ */ new Date()).toISOString()), Y.webSearchStatus = pe ? "正在联网搜索…" : "正在回复…", ne.messages.length > 120 && vt(ne.messages.splice(0, ne.messages.length - 120)), ie = ne.messages.length - 1;
      w(), ze(), F.value = "";
      const we = new AbortController(), Ee = { controller: we, assistantMessage: Y };
      Pe = Ee;
      const Be = g.value, St = T(), Ve = ue.value, is = ga(o.profile), rs = fa(c.value, ne.id, x.value);
      try {
        const Je = await Z(ne.messages, ie);
        if (Pe !== Ee) return !1;
        if (Je.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const Oe = await Yn("chat", {
          date: Be,
          messages: Je,
          entries: St,
          targets: Ve,
          profile: is,
          memory: rs,
          webSearch: pe
        }, (Ne) => {
          Pe === Ee && (Ne.type === "status" ? Y.webSearchStatus = Ne.message : Ne.type === "delta" ? Y.content += Ne.text : Ne.type === "done" && (typeof Ne.content == "string" && (Y.content = Ne.content), Y.model = Ne.model, Y.context = Ne.contextSummary, Y.createdAt = Ne.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Y.webSources = i(Ne.webSources), Y.localSources = r(Ne.localSources), Y.webSearchWarning = Ne.webSearchWarning, Y.webSearchStatus = ""));
        }, we.signal);
        if (Pe !== Ee) return !1;
        if (!Y.content.trim() || typeof Oe.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return Y.model = Oe.model, Y.context = Oe.contextSummary, Y.createdAt = Oe.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Y.webSources = i(Oe.webSources), Y.localSources = r(Oe.localSources), Y.webSearchWarning = Oe.webSearchWarning, Y.webSearchStatus = "", Y.status = "complete", ze(), Es(), !0;
      } catch (Je) {
        return Pe !== Ee || (Y.status = "failed", Y.error = Je instanceof Error ? Je.message : "AI 暂时无法回复，请重试。", Y.webSearchStatus = "", ze()), !1;
      } finally {
        Pe === Ee && (Pe = void 0), mt && !re.value && rt();
      }
    }
    function Ct() {
      const E = k.value.trim();
      if (!E && !K.value || E.length > 1200) return;
      const $ = De();
      k.value = "", Ce(E, void 0, $);
    }
    function fn(E) {
      k.value = E, Te(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function os(E) {
      E.key === "Enter" && !E.shiftKey && !E.isComposing && (E.preventDefault(), Ct());
    }
    function gn(E) {
      const $ = fe.value.findIndex((V) => V.id === E), y = fe.value[$ - 1];
      $ > 0 && y?.role === "user" && Ce(y.content, E);
    }
    function ls() {
      X++, b.add(Ae(g.value).id);
      for (const E of S.value) je(E.id);
      F.value = "";
    }
    function as() {
      I.value = !1;
      const E = c.value.flatMap(($) => $.messages.flatMap((y) => y.attachments || []));
      for (const $ of E)
        delete U.value[$.id], Et($.id).catch(() => {
          z.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      Is(), c.value = [], v.value = {}, z.value = "", Xe(g.value), F.value = "当前空间的聊天记录已清除。";
    }
    return (E, $) => (s(), l("section", ja, [
      e("header", Da, [
        $[19] || ($[19] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡 AI 助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", Na, [
          e("label", Pa, [
            N(L, {
              name: "calendar",
              size: 16
            }),
            $[13] || ($[13] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            oe(e("input", {
              "onUpdate:modelValue": $[0] || ($[0] = (y) => g.value = y),
              type: "date",
              max: f(xe)(),
              disabled: re.value,
              "aria-label": "选择饮食日期"
            }, null, 8, Ra), [
              [ve, g.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: ls
          }, [
            N(L, {
              name: "plus",
              size: 16
            }),
            $[14] || ($[14] = M("新对话", -1))
          ]),
          e("details", Ta, [
            e("summary", Ma, [
              $[15] || ($[15] = M("更多", -1)),
              N(L, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", za, [
              p.value.length ? (s(), l("label", Oa, [
                $[16] || ($[16] = M(" 历史对话 ", -1)),
                e("select", {
                  value: ye.value?.id,
                  disabled: re.value,
                  "aria-label": "切换历史对话",
                  onChange: j
                }, [
                  fe.value.length ? C("", !0) : (s(), l("option", {
                    key: 0,
                    value: ye.value?.id
                  }, "当前新对话", 8, Ba)),
                  (s(!0), l(q, null, J(p.value, (y) => (s(), l("option", {
                    key: y.id,
                    value: y.id
                  }, a(y.date) + " · " + a(At(y.createdAt)) + " · " + a(y.messages.length) + " 条消息", 9, La))), 128))
                ], 40, Fa)
              ])) : C("", !0),
              e("label", qa, [
                oe(e("input", {
                  "onUpdate:modelValue": $[1] || ($[1] = (y) => x.value = y),
                  type: "checkbox"
                }, null, 512), [
                  [ft, x.value]
                ]),
                $[17] || ($[17] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              $[18] || ($[18] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: re.value,
                onClick: $[2] || ($[2] = (y) => I.value = !0)
              }, "清除本地记录", 8, Va)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: B,
        class: be(["vb-simple-scroll", { "is-empty": !fe.value.length }]),
        onScrollPassive: $[3] || ($[3] = //@ts-ignore
        (...y) => f(Ie) && f(Ie)(...y)),
        onLoadCapture: $[4] || ($[4] = //@ts-ignore
        (...y) => f(Q) && f(Q)(...y)),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        fe.value.length ? (s(), l("div", {
          key: 1,
          ref_key: "conversationContent",
          ref: ee,
          class: "vb-simple-thread"
        }, [
          (s(!0), l(q, null, J(fe.value, (y) => (s(), l("article", {
            key: y.id,
            class: be(["vb-simple-message", [`is-${y.role}`, `is-${y.status}`]])
          }, [
            y.role === "assistant" ? (s(), l("span", Wa, [
              N(L, {
                name: "sparkles",
                size: 18
              })
            ])) : C("", !0),
            e("div", Ka, [
              y.attachments?.length ? (s(), l("div", Ya, [
                (s(!0), l(q, null, J(y.attachments, (V) => (s(), l("button", {
                  key: V.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + V.name,
                  onClick: (ne) => _e(V)
                }, [
                  V.kind === "image" && U.value[V.id]?.dataUrl ? (s(), l("img", {
                    key: 0,
                    src: U.value[V.id].dataUrl,
                    alt: V.name
                  }, null, 8, Qa)) : (s(), de(L, {
                    key: 1,
                    name: V.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, a(V.name), 1),
                    e("small", null, a(V.kind === "image" ? "照片" : "文件文字") + " · " + a(_(V.size)), 1)
                  ])
                ], 8, Xa))), 128))
              ])) : C("", !0),
              y.status === "sending" && !y.content ? (s(), l("div", Za, [
                $[22] || ($[22] = e("span", { class: "vb-loading-ring" }, null, -1)),
                e("span", null, a(y.webSearchStatus || "正在回复…"), 1)
              ])) : y.status === "sending" ? (s(), l("div", ei, [
                N(f(Nt), {
                  content: y.content
                }, null, 8, ["content"]),
                $[23] || ($[23] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : y.status === "failed" ? (s(), l(q, { key: 3 }, [
                y.content ? (s(), de(f(Nt), {
                  key: 0,
                  class: "vb-simple-text",
                  content: y.content
                }, null, 8, ["content"])) : C("", !0),
                e("p", ti, a(y.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (V) => gn(y.id)
                }, [
                  N(L, {
                    name: "activity",
                    size: 14
                  }),
                  $[24] || ($[24] = M("重试这条问题", -1))
                ], 8, ni)
              ], 64)) : y.role !== "assistant" ? (s(), l("p", si, a(y.content), 1)) : f(sn)(se(y.id)) ? C("", !0) : (s(), de(f(Nt), {
                key: 5,
                class: "vb-simple-text",
                content: y.content
              }, null, 8, ["content"])),
              y.role === "assistant" && y.status === "complete" && y.content.trim() && f(sn)(se(y.id)) ? (s(), de(da, {
                key: 6,
                content: y.content,
                question: se(y.id),
                auto: fe.value.at(-1)?.id === y.id,
                onRetry: (V) => gn(y.id)
              }, null, 8, ["content", "question", "auto", "onRetry"])) : C("", !0),
              y.status === "sending" && y.content && y.webSearchStatus ? (s(), l("small", oi, a(y.webSearchStatus), 1)) : C("", !0),
              y.role === "assistant" && y.status === "complete" && y.webSearchWarning ? (s(), l("p", li, a(y.webSearchWarning), 1)) : C("", !0),
              y.role === "assistant" && y.status === "complete" && y.localSources?.length ? (s(), l("details", ai, [
                e("summary", null, "本地参考依据 · " + a(y.localSources.length), 1),
                e("ol", null, [
                  (s(!0), l(q, null, J(y.localSources, (V, ne) => (s(), l("li", {
                    key: V.id
                  }, [
                    e("a", {
                      href: V.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }, [
                      e("span", null, "[本地" + a(ne + 1) + "]", 1),
                      M(" " + a(V.title), 1)
                    ], 8, ii),
                    e("small", null, a(V.version) + " · " + a(V.kind) + "：" + a(V.summary), 1)
                  ]))), 128))
                ])
              ])) : C("", !0),
              y.role === "assistant" && y.status === "complete" && y.webSources?.length ? (s(), l("details", ri, [
                e("summary", null, "联网来源 · " + a(y.webSources.length), 1),
                e("ol", null, [
                  (s(!0), l(q, null, J(y.webSources, (V, ne) => (s(), l("li", {
                    key: V.url
                  }, [
                    e("a", {
                      href: V.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }, [
                      e("span", null, "[" + a(ne + 1) + "]", 1),
                      M(" " + a(V.title), 1)
                    ], 8, ui),
                    V.siteName || V.date ? (s(), l("small", di, a([V.siteName, V.date].filter(Boolean).join(" · ")), 1)) : C("", !0)
                  ]))), 128))
                ])
              ])) : C("", !0),
              y.status === "complete" ? (s(), l("small", ci, [
                M(a(H(y.createdAt)), 1),
                y.role === "assistant" ? (s(), l(q, { key: 0 }, [
                  M(" · " + a(f(it)(y.model)), 1)
                ], 64)) : C("", !0)
              ])) : C("", !0)
            ])
          ], 2))), 128))
        ], 512)) : (s(), l("div", {
          key: 0,
          ref_key: "conversationContent",
          ref: ee,
          class: "vb-simple-welcome"
        }, [
          $[20] || ($[20] = e("h2", null, "今天想聊些什么？", -1)),
          $[21] || ($[21] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", Ja, [
            (s(), l(q, null, J(n, (y) => e("button", {
              key: y,
              type: "button",
              onClick: (V) => fn(y)
            }, [
              e("span", null, a(y), 1),
              N(L, {
                name: "arrow",
                size: 16
              })
            ], 8, Ga)), 64))
          ]),
          e("small", Ha, "饮食参考日期：" + a(g.value), 1)
        ], 512))
      ], 34),
      e("footer", vi, [
        f($e) ? (s(), l("button", {
          key: 0,
          type: "button",
          class: "vb-chat-jump-bottom",
          "aria-label": "回到最新消息",
          title: "一键到底",
          onClick: $[5] || ($[5] = //@ts-ignore
          (...y) => f(w) && f(w)(...y))
        }, [
          N(L, {
            name: "arrow",
            size: 20
          })
        ])) : C("", !0),
        e("div", mi, [
          fe.value.length ? (s(), l("div", pi, [
            e("details", bi, [
              e("summary", null, [
                $[25] || ($[25] = M("快捷提问", -1)),
                N(L, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", fi, [
                (s(), l(q, null, J(n, (y) => e("button", {
                  key: y,
                  type: "button",
                  onClick: (V) => fn(y)
                }, [
                  M(a(y), 1),
                  N(L, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, gi)), 64))
              ])
            ]),
            re.value ? (s(), l("span", yi, "正在回复，发送新消息可打断")) : C("", !0)
          ])) : C("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: Ue,
            onDrop: he
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: A,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: f($a),
              "aria-label": "选择照片或文件",
              onChange: te
            }, null, 40, hi),
            S.value.length ? (s(), l("div", ki, [
              (s(!0), l(q, null, J(S.value, (y) => (s(), l("div", {
                key: y.id,
                class: be(["vb-chat-file", { "is-failed": y.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: y.status !== "ready",
                  "aria-label": "预览附件：" + y.name,
                  onClick: (V) => _e(y)
                }, [
                  y.value?.dataUrl ? (s(), l("img", {
                    key: 0,
                    src: y.value.dataUrl,
                    alt: y.name
                  }, null, 8, $i)) : (s(), de(L, {
                    key: 1,
                    name: y.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, a(y.name), 1),
                    y.status === "reading" ? (s(), l("small", _i, "正在读取…")) : y.status === "failed" ? (s(), l("small", Ai, a(y.error), 1)) : (s(), l("small", Ci, a(_(y.size)) + " · 待发送", 1))
                  ])
                ], 8, wi),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + y.name,
                  onClick: (V) => je(y.id)
                }, [
                  N(L, {
                    name: "close",
                    size: 13
                  })
                ], 8, Si)
              ], 2))), 128))
            ])) : C("", !0),
            $[29] || ($[29] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            oe(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": $[6] || ($[6] = (y) => k.value = y),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: os,
              onPaste: le
            }, null, 544), [
              [ve, k.value]
            ]),
            e("div", Ii, [
              e("div", Ei, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: $[7] || ($[7] = (y) => A.value?.click())
                }, [
                  N(L, {
                    name: "paperclip",
                    size: 18
                  }),
                  $[26] || ($[26] = e("span", null, "附件", -1))
                ]),
                e("label", xi, [
                  oe(e("input", {
                    "onUpdate:modelValue": $[8] || ($[8] = (y) => h.value = y),
                    type: "checkbox",
                    "aria-label": "联网搜索"
                  }, null, 512), [
                    [ft, h.value]
                  ]),
                  $[27] || ($[27] = e("span", null, "联网搜索", -1))
                ]),
                $[28] || ($[28] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !k.value.trim() && !K.value,
                onClick: $[9] || ($[9] = (y) => Ct())
              }, [
                N(L, {
                  name: "arrow",
                  size: 16
                }),
                M(a(re.value ? "打断并发送" : "发送"), 1)
              ], 8, Ui)
            ])
          ], 32),
          f(Me) && f(Ss) === "error" ? (s(), l("p", ji, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : C("", !0),
          z.value || F.value ? (s(), l("p", {
            key: 2,
            class: "vb-simple-notice",
            role: z.value ? "alert" : "status"
          }, a(z.value || F.value), 9, Di)) : C("", !0),
          e("div", Ni, [
            e("details", Pi, [
              e("summary", null, [
                N(L, {
                  name: "lock",
                  size: 12
                }),
                $[30] || ($[30] = M("隐私与使用说明", -1))
              ]),
              $[31] || ($[31] = e("div", { class: "vb-simple-privacy-panel" }, [
                e("p", null, "附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。"),
                e("p", null, "选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给维衡 AI，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。"),
                e("p", null, "点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 维衡 AI 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。"),
                e("p", null, "开启“联网搜索”后，仅把本条问题文字（最多 128 字）发送给网页搜索接口；身体档案、饮食记录、附件和跨对话记忆不会发送给搜索接口。联网检索由 DeepSeek Search & Fetch 提供，可能产生搜索 API 费用。"),
                e("p", null, "跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。"),
                e("p", null, "饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。")
              ], -1))
            ]),
            e("span", null, a(k.value.length ? `${k.value.length}/1200` : "AI 内容仅供参考"), 1)
          ])
        ])
      ]),
      I.value ? (s(), de(lt, {
        key: 0,
        title: "确认清空 AI 对话？",
        onClose: $[11] || ($[11] = (y) => I.value = !1)
      }, {
        default: st(() => [
          $[32] || ($[32] = e("p", null, "将清除当前使用空间的全部 AI 对话。登录账号的删除会同步到其他设备，且无法撤销。", -1)),
          e("div", Ri, [
            e("button", {
              class: "vb-button vb-button-quiet",
              onClick: $[10] || ($[10] = (y) => I.value = !1)
            }, "取消"),
            e("button", {
              class: "vb-button vb-button-primary",
              onClick: as
            }, "确认清空")
          ])
        ]),
        _: 1
      })) : C("", !0),
      D.value ? (s(), de(lt, {
        key: 1,
        title: D.value.name,
        wide: "",
        onClose: $[12] || ($[12] = (y) => D.value = null)
      }, {
        default: st(() => [
          D.value.kind === "image" ? (s(), l("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: D.value.dataUrl,
            alt: D.value.name
          }, null, 8, Ti)) : (s(), l("pre", Mi, a(D.value.text), 1)),
          e("p", zi, a(D.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : C("", !0)
    ]));
  }
}), Fi = /* @__PURE__ */ Jn(Oi, [["__scopeId", "data-v-9e6f839c"]]), Bi = {
  key: 0,
  class: "vb-page-title"
}, Li = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, qi = ["aria-pressed", "onClick"], Vi = { class: "vb-glass vb-review-hero" }, Ji = { class: "vb-icon-badge vb-large-badge" }, Gi = { class: "vb-small-label" }, Hi = { class: "vb-coverage-score" }, Wi = { class: "vb-assessment-grid" }, Ki = { class: "vb-glass vb-coverage-card" }, Yi = { class: "vb-section-heading" }, Xi = { class: "vb-coverage-list" }, Qi = { class: "vb-food-category-icon" }, Zi = { class: "vb-coverage-name" }, er = { key: 0 }, tr = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, nr = { class: "vb-inline-note" }, sr = { class: "vb-glass vb-suggestion-card" }, or = ["checked", "onChange"], lr = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, ar = { class: "vb-empty-icon" }, ir = { class: "vb-glass vb-supplement-card" }, rr = { class: "vb-icon-badge" }, ur = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const o = t, n = P(o.records[0]?.date || "");
    ce(() => o.records, (x) => {
      x.some((h) => h.date === n.value) || (n.value = x[0]?.date || "");
    });
    const u = G(() => o.records.find((x) => x.date === n.value)), i = (x) => Number(u.value?.foods?.[x]) || 0, r = G(() => qt.filter((x) => i(x.key) <= 0)), d = G(() => qt.length - r.value.length), m = G(() => Math.max(1, ...en.map((x) => i(x.key)))), c = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, v = G(() => (r.value.length ? r.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map((x) => ({ key: x.key, title: c[x.key]?.[0] || (x.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: c[x.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), b = (x) => (o.habits[n.value] || []).includes(x);
    return (x, h) => (s(), l(q, null, [
      t.embedded ? C("", !0) : (s(), l("div", Bi, [
        h[4] || (h[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: h[0] || (h[0] = (g) => x.$emit("navigate", "diary"))
        }, [
          N(L, {
            name: "plus",
            size: 17
          }),
          h[3] || (h[3] = M("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (s(), l("div", Li, [
        (s(!0), l(q, null, J(t.records.slice(0, 7), (g) => (s(), l("button", {
          key: g.date,
          class: be({ selected: n.value === g.date }),
          "aria-pressed": n.value === g.date,
          onClick: (k) => n.value = g.date
        }, a(g.date), 11, qi))), 128))
      ])) : C("", !0),
      u.value ? (s(), l(q, { key: 2 }, [
        e("section", Vi, [
          e("span", Ji, [
            N(L, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", Gi, a(u.value.date) + " · 饮食回顾", 1),
            e("h2", null, a(r.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, a(r.value.length ? r.value.map((g) => g.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", Hi, [
            e("strong", null, [
              M(a(d.value), 1),
              e("small", null, " / " + a(f(qt).length), 1)
            ]),
            h[5] || (h[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", Wi, [
          e("section", Ki, [
            e("div", Yi, [
              h[6] || (h[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              N(L, { name: "chart" })
            ]),
            e("div", Xi, [
              (s(!0), l(q, null, J(f(en), (g) => (s(), l("div", {
                key: g.key,
                class: "vb-coverage-row"
              }, [
                e("span", Qi, [
                  N(L, {
                    name: f(Ln)[g.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", Zi, [
                  M(a(g.name), 1),
                  g.key === "snacks" ? (s(), l("small", er, "可选记录")) : C("", !0)
                ]),
                e("span", tr, [
                  e("i", {
                    style: Tn({ width: i(g.key) / m.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: be(["vb-coverage-value", { "is-missing": !i(g.key) }])
                }, a(i(g.key) ? `${Math.round(i(g.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", nr, [
              N(L, {
                name: "info",
                size: 15
              }),
              h[7] || (h[7] = M("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", sr, [
            h[8] || (h[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (s(!0), l(q, null, J(v.value, (g) => (s(), l("label", {
              key: g.key,
              class: be(["vb-check-row", { done: b(g.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: b(g.key),
                onChange: (k) => x.$emit("toggle-habit", n.value, g.key)
              }, null, 40, or),
              e("span", null, [
                e("strong", null, a(g.title), 1),
                e("small", null, a(g.detail), 1)
              ])
            ], 2))), 128)),
            h[9] || (h[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (s(), l("section", lr, [
        e("span", ar, [
          N(L, {
            name: "bowl",
            size: 36
          })
        ]),
        h[11] || (h[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        h[12] || (h[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: h[1] || (h[1] = (g) => x.$emit("navigate", "diary"))
        }, [
          h[10] || (h[10] = M("记录今天的饮食", -1)),
          N(L, {
            name: "arrow",
            size: 17
          })
        ])
      ])),
      e("section", ir, [
        e("span", rr, [
          N(L, {
            name: "shield",
            size: 23
          })
        ]),
        e("div", null, [
          h[13] || (h[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, a(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, a(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: h[2] || (h[2] = (g) => x.$emit("navigate", "about"))
        }, [
          h[14] || (h[14] = M("查看注意事项", -1)),
          N(L, {
            name: "arrow",
            size: 17
          })
        ])
      ])
    ], 64));
  }
}, dr = {
  key: 0,
  class: "vb-page-title"
}, cr = { class: "vb-date-input" }, vr = {
  key: 1,
  class: "vb-report-toolbar"
}, mr = { class: "vb-date-input" }, pr = {
  key: 2,
  class: "vb-report-filter"
}, br = {
  key: 3,
  class: "vb-report-list"
}, fr = { class: "vb-report-card-top" }, gr = { class: "vb-icon-badge" }, yr = {
  key: 0,
  class: "vb-feature-error"
}, hr = {
  key: 1,
  class: "vb-inline-warning"
}, kr = { class: "vb-report-card-actions" }, wr = ["onClick"], $r = ["disabled", "onClick"], _r = {
  key: 4,
  class: "vb-glass vb-report-empty"
}, Ar = { class: "vb-icon-badge" }, Cr = /* @__PURE__ */ at({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(""), { isStale: r } = vn(), d = G(() => n.reports.filter((v) => !i.value || v.date === i.value));
    function m(v) {
      return n.records.find((b) => b.date === v.date);
    }
    function c(v) {
      return r(v, m(v), n.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[v.status];
    }
    return (v, b) => (s(), l(q, null, [
      t.embedded ? (s(), l("div", vr, [
        b[5] || (b[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", mr, [
          N(L, {
            name: "calendar",
            size: 18
          }),
          oe(e("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (x) => i.value = x),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ve, i.value]
          ])
        ])
      ])) : (s(), l("div", dr, [
        b[4] || (b[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", cr, [
          N(L, {
            name: "calendar",
            size: 18
          }),
          oe(e("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (x) => i.value = x),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ve, i.value]
          ])
        ])
      ])),
      b[9] || (b[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给维衡 AI；照片和备注不随每日分析发送。", -1)),
      i.value ? (s(), l("div", pr, [
        e("span", null, a(d.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: b[2] || (b[2] = (x) => i.value = "")
        }, "清除日期筛选")
      ])) : C("", !0),
      d.value.length ? (s(), l("div", br, [
        (s(!0), l(q, null, J(d.value, (x) => (s(), l("article", {
          key: x.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", fr, [
            e("span", gr, [
              N(L, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, a(x.date), 1),
              e("small", null, a(new Date(x.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: be(["vb-pill", { "needs-update": c(x) === "需更新" }])
            }, a(c(x)), 3)
          ]),
          e("p", null, a(x.result?.summary || x.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          m(x) ? f(r)(x, m(x), t.profile) ? (s(), l("small", hr, "记录或个人目标已变化，此报告使用的是旧版本。")) : C("", !0) : (s(), l("small", yr, "对应记录已删除，保留报告快照。")),
          e("div", kr, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (h) => u("open", x.date, x.id)
            }, [
              b[6] || (b[6] = M("打开报告", -1)),
              N(L, {
                name: "arrow",
                size: 15
              })
            ], 8, wr),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: x.status === "pending" || !m(x),
              onClick: (h) => u("retry", x.date)
            }, "重新分析", 8, $r)
          ])
        ]))), 128))
      ])) : (s(), l("section", _r, [
        e("span", Ar, [
          N(L, {
            name: "report",
            size: 25
          })
        ]),
        e("h2", null, a(i.value ? "这一天还没有报告" : "从记录第一餐开始"), 1),
        b[8] || (b[8] = e("p", null, "保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: b[3] || (b[3] = (x) => u("navigate", "diary"))
        }, [
          b[7] || (b[7] = M("去记录饮食", -1)),
          N(L, {
            name: "arrow",
            size: 17
          })
        ])
      ]))
    ], 64));
  }
}), Sr = { class: "vb-page-title" }, Ir = {
  class: "vb-assessment-block",
  "aria-labelledby": "diet-assessment-heading"
}, Er = {
  class: "vb-assessment-block vb-assessment-reports",
  "aria-labelledby": "ai-report-heading"
}, xr = /* @__PURE__ */ at({
  __name: "AiNutritionAssessmentPage",
  props: {
    records: {},
    habits: {},
    flags: {},
    reports: {},
    profile: {}
  },
  emits: ["navigate", "toggleHabit", "openReport", "retryReport"],
  setup(t, { emit: o }) {
    const n = o;
    function u(i, r) {
      n("openReport", i, r);
    }
    return (i, r) => (s(), l(q, null, [
      e("div", Sr, [
        r[6] || (r[6] = e("div", null, [
          e("h1", null, "营养摄入分析"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: r[0] || (r[0] = (d) => n("navigate", "diary"))
        }, [
          N(L, {
            name: "plus",
            size: 17
          }),
          r[5] || (r[5] = M("添加饮食记录 ", -1))
        ])
      ]),
      N(xs, {
        records: t.records,
        profile: t.profile || void 0
      }, null, 8, ["records", "profile"]),
      e("section", Ir, [
        r[7] || (r[7] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "饮食结构回顾"),
            e("h2", { id: "diet-assessment-heading" }, "食物类别评估")
          ]),
          e("span", { class: "vb-subtle-label" }, "按已保存记录统计")
        ], -1)),
        N(ur, {
          records: t.records,
          habits: t.habits,
          flags: t.flags,
          embedded: "",
          onNavigate: r[1] || (r[1] = (d) => n("navigate", d)),
          onToggleHabit: r[2] || (r[2] = (d, m) => n("toggleHabit", d, m))
        }, null, 8, ["records", "habits", "flags"])
      ]),
      e("section", Er, [
        r[8] || (r[8] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "每日 AI 分析"),
            e("h2", { id: "ai-report-heading" }, "AI 营养报告")
          ]),
          e("span", { class: "vb-subtle-label" }, "可按日期筛选、查看和重试")
        ], -1)),
        N(Cr, {
          reports: t.reports,
          records: t.records,
          profile: t.profile,
          embedded: "",
          onOpen: u,
          onRetry: r[3] || (r[3] = (d) => n("retryReport", d)),
          onNavigate: r[4] || (r[4] = (d) => n("navigate", d))
        }, null, 8, ["reports", "records", "profile"])
      ])
    ], 64));
  }
}), Ur = { class: "vb-photo-picker" }, jr = {
  key: 0,
  class: "vb-photo-preview"
}, Dr = ["src"], Nr = { class: "vb-photo-actions" }, Pr = ["disabled"], Rr = ["disabled"], Tr = {
  key: 1,
  class: "vb-photo-hint",
  role: "status"
}, Mr = {
  key: 2,
  class: "vb-photo-error",
  role: "alert"
}, zr = ["src"], Or = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: o }) {
    const n = o, u = P(!1), i = P(null), r = P(null), d = P(""), m = P(!1);
    function c(k) {
      return new Promise((A, S) => {
        const U = URL.createObjectURL(k), D = new Image();
        D.onload = () => A({ image: D, url: U }), D.onerror = () => {
          URL.revokeObjectURL(U), S(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, D.src = U;
      });
    }
    function v(k, A) {
      return new Promise((S, U) => k.toBlob((D) => D ? S(D) : U(new Error("图片处理失败，请重新选择。")), "image/jpeg", A));
    }
    function b(k) {
      return new Promise((A, S) => {
        const U = new FileReader();
        U.onload = () => A(U.result), U.onerror = () => S(new Error("图片读取失败，请重新选择。")), U.readAsDataURL(k);
      });
    }
    async function x(k) {
      let A;
      try {
        const S = await createImageBitmap(k);
        A = { image: S, width: S.width, height: S.height, cleanup: () => S.close() };
      } catch {
        const S = await c(k);
        A = { image: S.image, width: S.image.naturalWidth, height: S.image.naturalHeight, cleanup: () => URL.revokeObjectURL(S.url) };
      }
      try {
        const S = Math.min(1, 1200 / Math.max(A.width, A.height)), U = document.createElement("canvas");
        U.width = Math.max(1, Math.round(A.width * S)), U.height = Math.max(1, Math.round(A.height * S));
        const D = U.getContext("2d");
        if (!D) throw new Error("浏览器暂不支持图片预览。");
        D.drawImage(A.image, 0, 0, U.width, U.height);
        let K = await v(U, 0.76);
        if (K.size > 32e4 && (K = await v(U, 0.58)), K.size > 32e4) {
          const X = document.createElement("canvas");
          X.width = Math.round(U.width * 0.75), X.height = Math.round(U.height * 0.75), X.getContext("2d")?.drawImage(U, 0, 0, X.width, X.height), K = await v(X, 0.58);
        }
        return await b(K);
      } finally {
        A.cleanup();
      }
    }
    async function h(k, A) {
      const S = k.target, U = S.files?.[0];
      if (S.value = "", !!U) {
        if (d.value = "", !U.type.startsWith("image/") || U.type === "image/svg+xml") {
          d.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if (U.size > 12 * 1024 * 1024) {
          d.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        m.value = !0;
        try {
          const D = await x(U), K = { name: U.name.slice(0, 100), dataUrl: D, source: A, mime: "image/jpeg" };
          n("update:modelValue", K), n("selected", K);
        } catch (D) {
          d.value = D instanceof Error ? D.message : "无法处理这张图片，请重新选择。";
        } finally {
          m.value = !1;
        }
      }
    }
    function g() {
      d.value = "", n("update:modelValue", null);
    }
    return (k, A) => (s(), l("div", Ur, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: A[0] || (A[0] = (S) => h(S, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: r,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: A[1] || (A[1] = (S) => h(S, "本地图片"))
      }, null, 544),
      t.modelValue ? (s(), l("div", jr, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: A[2] || (A[2] = (S) => u.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, Dr)
        ]),
        e("span", null, [
          e("strong", null, a(t.modelValue.name), 1),
          e("small", null, a(t.modelValue.source) + " · 点击图片查看大图", 1)
        ]),
        e("button", {
          type: "button",
          class: "vb-icon-button",
          "aria-label": "移除照片",
          onClick: g
        }, [
          N(L, {
            name: "close",
            size: 15
          })
        ])
      ])) : C("", !0),
      e("div", Nr, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: A[3] || (A[3] = (S) => i.value?.click())
        }, [
          N(L, {
            name: "camera",
            size: 17
          }),
          A[6] || (A[6] = M("拍照", -1))
        ], 8, Pr),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: A[4] || (A[4] = (S) => r.value?.click())
        }, [
          N(L, {
            name: "upload",
            size: 17
          }),
          M(a(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, Rr)
      ]),
      m.value ? (s(), l("p", Tr, "正在准备图片…")) : d.value ? (s(), l("p", Mr, a(d.value), 1)) : C("", !0),
      u.value && t.modelValue ? (s(), de(lt, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: A[5] || (A[5] = (S) => u.value = !1)
      }, {
        default: st(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, zr)
        ]),
        _: 1
      })) : C("", !0)
    ]));
  }
}, Fr = { class: "vb-glass vb-photo-card" }, Br = { class: "vb-aside-heading" }, Lr = { class: "vb-photo-badge" }, qr = { class: "vb-photo-disclosure" }, Vr = {
  key: 0,
  class: "vb-feature-error",
  role: "alert"
}, Jr = {
  key: 1,
  class: "vb-ai-progress",
  role: "status"
}, Gr = {
  key: 2,
  class: "vb-recognition-failed"
}, Hr = {
  class: "vb-feature-error",
  role: "alert"
}, Wr = {
  key: 4,
  class: "vb-recognition-results"
}, Kr = { class: "vb-data-note" }, Yr = {
  key: 0,
  class: "vb-recognition-meta"
}, Xr = { key: 0 }, Qr = { class: "vb-recognized-list" }, Zr = ["value", "disabled", "aria-label", "onInput"], eu = ["aria-label", "onClick"], tu = {
  key: 0,
  class: "vb-recognition-matches"
}, nu = ["onClick"], su = { class: "vb-recognition-weight" }, ou = ["onUpdate:modelValue", "disabled", "aria-label"], lu = { key: 1 }, au = {
  key: 1,
  class: "vb-data-note"
}, iu = { class: "vb-recognition-actions" }, ru = ["disabled"], uu = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object, confirming: Boolean, autoRecognition: { type: Boolean, default: !0 } },
  emits: ["confirm"],
  setup(t, { emit: o }) {
    const n = t, u = o, { state: i } = dn(), r = P(null), d = P(""), m = /* @__PURE__ */ new Map(), c = G(() => n.draft.recognition), v = G(() => {
      const z = c.value?.generatedAt;
      if (!z) return "";
      const F = new Date(z);
      return Number.isNaN(F.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(F);
    }), b = G(() => !n.confirming && c.value?.items?.length && !c.value.confirmed && c.value.items.every((z) => z.name?.trim() && Number.isFinite(Number(z.grams)) && Number(z.grams) >= 0.1 && Number(z.grams) <= 5e3));
    ce(() => [n.draft.date, n.draft.photoId], async ([z, F]) => {
      d.value = "", r.value = null;
      try {
        if (F) {
          const I = await Ps("photos", F);
          if (n.draft.date !== z || n.draft.photoId !== F) return;
          r.value = I || null, I?.dataUrl && n.draft.recognition?.status === "pending" && n.draft.recognition.photoId === F ? A(I, { resume: !0 }) : !I && n.draft.recognition?.status === "pending" && (n.draft.recognition = { ...n.draft.recognition, status: "failed", error: "照片文件已不可用，请重新选择照片。" });
        } else if (n.legacyPhoto?.dataUrl) {
          const I = { ...n.legacyPhoto, id: crypto.randomUUID(), date: z };
          await nn("photos", I), n.draft.date === z && (n.draft.photoId = I.id, r.value = I);
        }
      } catch (I) {
        d.value = I.message, r.value = n.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function x(z) {
      r.value = z, z || h();
    }
    async function h() {
      const z = n.draft.photoId;
      if (n.draft.photoId = null, n.draft.recognition = null, z && !i.records.some((F) => F.photoId === z) && !Object.values(i.drafts).some((F) => F.photoId === z)) try {
        await Ts("photos", z);
      } catch (F) {
        d.value = F.message;
      }
    }
    async function g(z) {
      const F = n.draft.date, I = crypto.randomUUID();
      d.value = "";
      try {
        const B = { ...z, id: I, date: F, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await nn("photos", B), n.draft.date !== F) return;
        r.value = B, n.draft.photoId = I, n.draft.recognition = null, n.autoRecognition && await A(B);
      } catch (B) {
        d.value = B.message;
      }
    }
    async function k(z, F) {
      try {
        return await ct("recognize", { image: z, requestId: F });
      } catch (I) {
        if (["NOT_CONFIGURED", "INVALID_CONFIG", "INVALID_IMAGE", "AUTH_FAILED", "INSUFFICIENT_BALANCE", "RATE_LIMITED", "MODEL_REQUEST"].includes(I?.code) || I?.message?.includes("超时")) throw I;
        return await new Promise((B) => setTimeout(B, 700)), ct("recognize", { image: z, requestId: F });
      }
    }
    async function A(z = r.value, { resume: F = !1 } = {}) {
      if (!z?.dataUrl) return;
      const I = n.draft, B = I.photoId, ee = I.recognition?.status === "pending" && I.recognition.photoId === B ? I.recognition : null;
      if (ee && !F) return;
      const re = F && ee?.requestId ? ee.requestId : crypto.randomUUID();
      (!F || !ee) && (I.recognition = { requestId: re, photoId: B, status: "pending", startedAt: (/* @__PURE__ */ new Date()).toISOString(), items: [], error: "", confirmed: !1 });
      try {
        const W = B || re;
        let ge = m.get(W);
        ge || (ge = k(z.dataUrl, W), m.set(W, ge), ge.finally(() => {
          m.get(W) === ge && m.delete(W);
        }).catch(() => {
        }));
        const ue = await ge;
        if (I.photoId !== B || I.recognition?.requestId !== re) return;
        I.recognition = { ...ue, requestId: re, photoId: B, status: "complete", error: "", confirmed: !1 };
      } catch (W) {
        I.photoId === B && I.recognition?.requestId === re && (I.recognition = { ...I.recognition, status: "failed", error: W.message });
      }
    }
    function S(z, F) {
      z.name = F.target.value, z.foodId = null;
    }
    function U(z, F) {
      z.foodId = F.key, z.name = F.name;
    }
    function D() {
      n.draft.recognition = { ...n.draft.recognition, status: "complete", recognitionId: n.draft.recognition?.recognitionId || crypto.randomUUID(), items: n.draft.recognition?.items || [], confirmed: !1, error: "", note: n.draft.recognition?.note || "手动补充，请核对名称与份量。" }, n.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function K() {
      b.value && u("confirm", { batchId: c.value.recognitionId, items: c.value.items.map((z) => ({ ...z, estimated: !0, source: "photo" })) });
    }
    function X(z) {
      const F = z.aiEstimate?.values;
      if (!F) return "";
      const I = (B) => Number(F[B]?.value).toLocaleString("zh-CN", { maximumFractionDigits: 2 });
      return `AI 估算本份：${I("energy")} kcal · 蛋白质 ${I("protein")} g · 碳水 ${I("carbs")} g · 脂肪 ${I("fat")} g`;
    }
    return (z, F) => (s(), l("section", Fr, [
      e("div", Br, [
        F[2] || (F[2] = e("div", null, [
          e("h2", null, "这一餐的照片"),
          e("p", null, "拍一餐，核对后再记入。")
        ], -1)),
        e("span", Lr, [
          N(L, {
            name: "camera",
            size: 16
          })
        ])
      ]),
      e("p", qr, a(t.autoRecognition ? "选择照片后自动识别" : "选择照片后请点“开始 AI 识别”") + "：压缩照片会经本地后端发送给维衡 AI。照片与识别结果保存在当前浏览器。", 1),
      N(Or, {
        "model-value": r.value,
        "onUpdate:modelValue": x,
        onSelected: g
      }, null, 8, ["model-value"]),
      d.value ? (s(), l("p", Vr, a(d.value), 1)) : C("", !0),
      c.value?.status === "pending" ? (s(), l("div", Jr, [...F[3] || (F[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : C("", !0),
      c.value?.status === "failed" ? (s(), l("div", Gr, [
        e("p", Hr, a(c.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: F[0] || (F[0] = (I) => A())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: D
          }, "手动录入")
        ])
      ])) : C("", !0),
      r.value && !c.value ? (s(), l("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: F[1] || (F[1] = (I) => A())
      }, "开始 AI 识别")) : C("", !0),
      c.value?.status === "complete" ? (s(), l("div", Wr, [
        e("p", Kr, a(c.value.note || "请核对食物名称与份量。") + " 照片克数为 AI 估重，需你核对；营养分析会汇总数据库值与明确标注的 AI 宏量营养估算，其他缺失项仍保持未知。", 1),
        c.value.model ? (s(), l("small", Yr, [
          M("由 " + a(f(it)(c.value.model)) + " 识别", 1),
          v.value ? (s(), l("span", Xr, " · " + a(v.value), 1)) : C("", !0)
        ])) : C("", !0),
        e("div", Qr, [
          (s(!0), l(q, null, J(c.value.items, (I, B) => (s(), l("div", {
            key: I.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: I.name,
                disabled: c.value.confirmed || t.confirming,
                "aria-label": "识别食物" + (B + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (ee) => S(I, ee)
              }, null, 40, Zr),
              !c.value.confirmed && !t.confirming ? (s(), l("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (B + 1),
                onClick: (ee) => c.value.items.splice(B, 1)
              }, [
                N(L, {
                  name: "close",
                  size: 14
                })
              ], 8, eu)) : C("", !0)
            ]),
            !I.foodId && !c.value.confirmed && !t.confirming ? (s(), l("div", tu, [
              (s(!0), l(q, null, J(f(rn)(I.name, 3), (ee) => (s(), l("button", {
                key: ee.key,
                type: "button",
                onClick: (re) => U(I, ee)
              }, a(ee.name), 9, nu))), 128))
            ])) : C("", !0),
            e("label", su, [
              F[4] || (F[4] = M("估算可食部", -1)),
              oe(e("input", {
                "onUpdate:modelValue": (ee) => I.grams = ee,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: c.value.confirmed || t.confirming,
                "aria-label": "识别食物" + (B + 1) + "克数",
                placeholder: "克数"
              }, null, 8, ou), [
                [ve, I.grams]
              ]),
              F[5] || (F[5] = M("克", -1))
            ]),
            e("small", {
              class: be({ "vb-unmatched": !I.foodId })
            }, a(I.foodId ? "数据库：" + f(ae)[I.foodId]?.state : I.aiEstimate ? X(I) : "未匹配数据库；核对后由 AI 估算热量及三大营养素"), 3),
            I.aiEstimate?.assumption ? (s(), l("small", lu, "AI 估算假设：" + a(I.aiEstimate.assumption), 1)) : C("", !0),
            e("small", null, a(I.uncertainty), 1)
          ]))), 128))
        ]),
        c.value.items.length ? C("", !0) : (s(), l("p", au, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", iu, [
          !c.value.confirmed && !t.confirming ? (s(), l("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: D
          }, "＋补充遗漏食物")) : C("", !0),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !b.value,
            onClick: K
          }, a(c.value.confirmed ? "已加入本次选择" : t.confirming ? "正在估算并加入…" : "确认并加入记录"), 9, ru)
        ])
      ])) : C("", !0)
    ]));
  }
}, du = { class: "vb-diary-page" }, cu = { class: "vb-page-title" }, vu = { class: "vb-date-input" }, mu = ["max"], pu = {
  key: 0,
  class: "vb-diary-grid"
}, bu = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, fu = ["disabled"], gu = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, yu = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], hu = { class: "vb-section-heading" }, ku = { class: "vb-pill" }, wu = {
  key: 0,
  class: "vb-selected-list"
}, $u = {
  key: 1,
  class: "vb-muted-empty"
}, _u = { class: "vb-section-heading" }, Au = {
  key: 0,
  class: "vb-history-list"
}, Cu = ["aria-label", "onClick"], Su = ["onClick"], Iu = ["aria-label", "onClick"], Eu = {
  key: 1,
  class: "vb-muted-empty"
}, xu = { class: "vb-section-heading" }, Uu = { class: "vb-diary-search-row" }, ju = { class: "vb-search-field" }, Du = { class: "vb-meal-select" }, Nu = ["value"], Pu = {
  key: 0,
  class: "vb-search-results"
}, Ru = ["onClick"], Tu = {
  key: 0,
  class: "vb-search-empty"
}, Mu = { class: "vb-diary-entry-heading" }, zu = {
  key: 1,
  class: "vb-diary-entries"
}, Ou = { class: "vb-diary-entry-title" }, Fu = ["onClick"], Bu = ["value", "onInput", "aria-label"], Lu = ["aria-label", "onClick"], qu = { class: "vb-data-note" }, Vu = {
  key: 0,
  class: "vb-pill"
}, Ju = { class: "vb-entry-controls" }, Gu = ["onUpdate:modelValue", "aria-label"], Hu = { class: "vb-entry-meal" }, Wu = ["onUpdate:modelValue"], Ku = ["value"], Yu = {
  key: 0,
  class: "vb-inline-warning"
}, Xu = ["onClick"], Qu = {
  key: 2,
  class: "vb-muted-empty"
}, Zu = ["onToggle"], ed = { key: 0 }, td = ["onClick"], nd = ["onClick"], sd = { class: "vb-field vb-notes-field" }, od = { class: "vb-intake-more" }, ld = { key: 0 }, ad = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean, autoRecognition: { type: Boolean, default: !0 } },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: o }) {
    const n = t, u = Mn("pushUndo", () => {
    }), i = o, { state: r, ensureDraft: d, addToDraft: m } = dn(), { isStale: c } = vn(), v = yt({}), b = yt({});
    function x(w = /* @__PURE__ */ new Date()) {
      const p = w.getHours() * 60 + w.getMinutes();
      return p >= 300 && p < 600 ? "breakfast" : p >= 600 && p <= 840 ? "lunch" : p >= 960 && p <= 1260 ? "dinner" : "snack";
    }
    const h = P(n.initialDate || xe()), g = P(""), k = P(x()), A = P("selected"), S = P(null), U = P("");
    ce(() => n.initialDate, (w) => {
      w && (h.value = w);
    }), ce(h, (w) => {
      d(w), U.value = "", g.value = "";
    }, { immediate: !0 });
    const D = G(() => r.drafts[h.value]), K = G(() => hn(D.value?.entries)), X = G(() => rn(g.value, 8)), z = G(() => n.records.find((w) => w.date === h.value)), F = G(() => K.value.length > 0 || !!(z.value && !Array.isArray(D.value?.savedEntries))), I = (w) => n.reports.find((p) => p.date === w), B = /* @__PURE__ */ new Set(), ee = P(!1);
    async function re(w) {
      const p = h.value, j = Re(), se = k.value, O = p + ":" + w.key;
      if (!B.has(O)) {
        B.add(O);
        try {
          if (await Ke(w.key), h.value !== p || Re() !== j) return;
          m({ date: p, foodId: w.key, grams: w.grams || 100, meal: se }), g.value = "", A.value = "selected";
        } catch (_) {
          U.value = _.message;
        } finally {
          B.delete(O);
        }
      }
    }
    function W() {
      D.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: g.value.trim(), grams: 100, meal: k.value, group: "unclassified", source: "manual", referenceConfirmed: !0 }), g.value = "";
    }
    function ge(w) {
      const p = D.value, [j] = p.entries.splice(w, 1);
      j && u({ label: "移除草稿食物", restore: () => p.entries.splice(w, 0, j) });
    }
    function ue(w, p) {
      const j = p.target.value;
      j.trim() !== w.name.trim() && delete w.nutritionSnapshot, w.name = j;
    }
    async function ye({ items: w, batchId: p }) {
      const j = h.value, se = Re(), O = D.value, _ = O.photoId, R = O.recognition?.requestId;
      if (!(ee.value || O.appliedBatches.includes(p))) {
        ee.value = !0, U.value = "";
        try {
          await Ke(w.map((he) => he.foodId));
          let te = hn(w.map((he) => ({ ...he, id: crypto.randomUUID(), meal: k.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: zt(ae[he.foodId]) })));
          if (te.length !== w.length) throw new Error("请核对每项食物名称与克数。");
          const le = te.map((he, je) => ({ entry: he, index: je })).filter(({ entry: he }) => !he.foodId);
          let Ue = [];
          if (le.length) {
            const he = await ct("photo-food-estimate", { items: le.map(({ entry: De }) => ({ name: De.name, grams: De.grams })) });
            if (!Array.isArray(he.estimates) || he.estimates.length !== le.length) throw new Error("AI 估算结果不完整，请重试。");
            const je = he.estimates.map((De) => ({ ...De, entryId: String(le[Number(De.entryId)]?.index ?? -1) }));
            if (Ue = je, te = an(te, je), le.some(({ index: De }) => ["energy", "protein", "carbs", "fat"].some((_e) => !te[De].nutritionSnapshot?.ranges?.[_e]))) throw new Error("AI 估算结果不完整，请重试。");
          }
          if (h.value !== j || Re() !== se || D.value !== O || O.photoId !== _ || O.recognition?.requestId !== R || O.appliedBatches.includes(p)) return;
          for (const he of Ue) O.recognition.items[Number(he.entryId)].aiEstimate = he;
          O.entries.push(...te), O.appliedBatches.push(p), O.recognition.confirmed = !0, A.value = "selected";
        } catch (te) {
          U.value = `未收录食物的 AI 营养估算失败：${te.message}。请核对食物后重试，尚未加入记录。`;
        } finally {
          ee.value = !1;
        }
      }
    }
    function fe() {
      if (n.saving || !F.value) return;
      if (U.value = "", K.value.length !== D.value.entries.length) {
        U.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
        return;
      }
      const w = JSON.parse(JSON.stringify(D.value));
      Array.isArray(w.savedEntries) && (w.entries = [...w.savedEntries, ...w.entries], delete w.savedEntries), i("save", w);
    }
    function $e(w) {
      A.value = w, matchMedia("(max-width:950px)").matches && Te(() => S.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function Ie(w) {
      const p = ["ArrowRight", "ArrowDown", "End"].includes(w.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(w.key) ? "selected" : null;
      p && (w.preventDefault(), $e(p), Te(() => document.getElementById("vb-tab-" + p)?.focus()));
    }
    function Q(w) {
      const p = I(w.date);
      return p ? c(p, w, n.profile) ? "报告需更新" : p.status === "pending" ? "分析中" : p.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (w, p) => (s(), l("div", du, [
      e("div", cu, [
        p[8] || (p[8] = e("div", null, [
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", vu, [
          N(L, {
            name: "calendar",
            size: 18
          }),
          oe(e("input", {
            "onUpdate:modelValue": p[0] || (p[0] = (j) => h.value = j),
            type: "date",
            max: f(xe)(),
            "aria-label": "饮食记录日期"
          }, null, 8, mu), [
            [ve, h.value]
          ])
        ])
      ]),
      D.value ? (s(), l("div", pu, [
        e("aside", bu, [
          (s(), de(uu, {
            key: h.value,
            "auto-recognition": t.autoRecognition,
            draft: D.value,
            "legacy-photo": z.value?.photo,
            confirming: ee.value,
            onConfirm: ye
          }, null, 8, ["auto-recognition", "draft", "legacy-photo", "confirming"])),
          e("div", {
            class: be(["vb-diary-actions", { "has-analysis": z.value }])
          }, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving || !F.value
            }, [
              M(a(t.saving ? "正在保存…" : "保存记录"), 1),
              N(L, {
                name: "arrow",
                size: 17
              })
            ], 8, fu),
            z.value ? (s(), l("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: p[1] || (p[1] = (j) => w.$emit("analysis", h.value))
            }, "查看分析")) : C("", !0),
            U.value ? (s(), l("p", gu, a(U.value), 1)) : C("", !0)
          ], 2),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: Ie
          }, [
            (s(!0), l(q, null, J([["selected", "本次选择", K.value.length], ["history", "最近记录", t.records.length]], ([j, se, O]) => (s(), l("button", {
              id: "vb-tab-" + j,
              key: j,
              type: "button",
              role: "tab",
              "aria-selected": A.value === j,
              "aria-controls": "vb-panel-" + j,
              tabindex: A.value === j ? 0 : -1,
              class: be({ selected: A.value === j }),
              onClick: (_) => $e(j)
            }, [
              M(a(se), 1),
              e("span", null, a(O), 1)
            ], 10, yu))), 128))
          ], 32),
          A.value === "selected" ? (s(), l("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: S,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", hu, [
              e("div", null, [
                p[9] || (p[9] = e("h2", null, "本次选择", -1)),
                e("p", null, a(h.value), 1)
              ]),
              e("span", ku, a(K.value.length) + " 项", 1)
            ]),
            N(un, {
              entries: K.value,
              compact: ""
            }, null, 8, ["entries"]),
            K.value.length ? (s(), l("div", wu, [
              (s(!0), l(q, null, J(K.value, (j) => (s(), l("div", {
                key: j.id
              }, [
                e("span", null, [
                  M(a(j.name), 1),
                  e("small", null, a(f(xt).find(([se]) => se === j.meal)?.[1]) + a(j.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  M(a(j.grams), 1),
                  p[10] || (p[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (s(), l("p", $u, "选择食物后，会在这里汇总。"))
          ], 512)) : (s(), l("section", {
            key: 1,
            id: "vb-panel-history",
            ref_key: "asidePanel",
            ref: S,
            class: "vb-glass vb-aside-panel vb-history-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-history",
            tabindex: "0"
          }, [
            e("div", _u, [
              p[11] || (p[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              N(L, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (s(), l("div", Au, [
              (s(!0), l(q, null, J(t.records.slice(0, 12), (j) => (s(), l("div", {
                key: j.date,
                class: "vb-history-item vb-history-with-ai"
              }, [
                e("button", {
                  type: "button",
                  "aria-label": `打开 ${j.date} 的饮食记录`,
                  onClick: (se) => h.value = j.date
                }, [
                  p[12] || (p[12] = e("span", { class: "vb-status-dot" }, null, -1)),
                  e("span", null, [
                    e("strong", null, a(j.date), 1),
                    e("small", null, a(Object.values(j.foods || {}).filter((se) => Number(se) > 0).length) + " 类食物", 1)
                  ])
                ], 8, Cu),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (se) => w.$emit("analysis", j.date)
                }, a(Q(j)), 9, Su),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + j.date + "的记录",
                  onClick: (se) => w.$emit("remove", j.date)
                }, [
                  N(L, {
                    name: "close",
                    size: 14
                  })
                ], 8, Iu)
              ]))), 128))
            ])) : (s(), l("p", Eu, "你的第一天记录，从今天开始。"))
          ], 512))
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: We(fe, ["prevent"])
        }, [
          e("div", xu, [
            p[13] || (p[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: p[2] || (p[2] = (j) => w.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", Uu, [
            e("label", ju, [
              N(L, {
                name: "search",
                size: 18
              }),
              oe(e("input", {
                "onUpdate:modelValue": p[3] || (p[3] = (j) => g.value = j),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: p[4] || (p[4] = ds(We((j) => X.value[0] && re(X.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [ve, g.value]
              ])
            ]),
            e("label", Du, [
              p[14] || (p[14] = e("span", null, "添加到", -1)),
              oe(e("select", {
                "onUpdate:modelValue": p[5] || (p[5] = (j) => k.value = j),
                "aria-label": "添加食物的餐次"
              }, [
                (s(!0), l(q, null, J(f(xt), ([j, se]) => (s(), l("option", {
                  key: j,
                  value: j
                }, a(se), 9, Nu))), 128))
              ], 512), [
                [Fe, k.value]
              ])
            ])
          ]),
          g.value.trim() ? (s(), l("div", Pu, [
            (s(!0), l(q, null, J(X.value, (j) => (s(), l("button", {
              key: j.key,
              type: "button",
              class: "vb-search-result",
              onClick: (se) => re(j)
            }, [
              e("span", null, [
                e("strong", null, a(j.name), 1),
                e("small", null, a(j.state) + " · " + a(j.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              N(L, {
                name: "plus",
                size: 17
              })
            ], 8, Ru))), 128)),
            X.value.length ? C("", !0) : (s(), l("p", Tu, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: W
            }, [
              M("手动添加“" + a(g.value) + "”", 1),
              N(L, {
                name: "plus",
                size: 16
              })
            ])
          ])) : C("", !0),
          e("div", Mu, [
            e("h3", null, [
              p[15] || (p[15] = M("已选食物 ", -1)),
              e("small", null, a(D.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: W
            }, "＋手动添加")
          ]),
          D.value.entries.length ? (s(), l("div", zu, [
            (s(!0), l(q, null, J(D.value.entries, (j, se) => (s(), l("article", {
              key: j.id,
              class: "vb-diary-entry"
            }, [
              e("div", Ou, [
                j.foodId ? (s(), l("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (O) => w.$emit("detail", j.foodId)
                }, [
                  M(a(f(Ft)(f(ae)[j.foodId]) || j.name), 1),
                  N(L, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, Fu)) : (s(), l("input", {
                  key: 1,
                  value: j.name,
                  onInput: (O) => ue(j, O),
                  "aria-label": "手动食物" + (se + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 40, Bu)),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (se + 1),
                  onClick: (O) => ge(se)
                }, [
                  N(L, {
                    name: "close",
                    size: 15
                  })
                ], 8, Lu)
              ]),
              e("p", qu, [
                M(a(j.foodId ? f(ae)[j.foodId]?.state : j.nutritionSnapshot?.dataType === "ai-estimate" ? "未匹配食物目录" : "未匹配食物目录，尚无成分值") + a(j.estimated ? " · 份量为估算" : ""), 1),
                j.nutritionSnapshot?.dataType === "ai-estimate" ? (s(), l("span", Vu, "含AI估算")) : C("", !0)
              ]),
              N(ts, {
                food: f(ae)[j.foodId],
                onChoose: (O) => {
                  j.grams = O, j.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", Ju, [
                e("label", null, [
                  p[16] || (p[16] = M("可食部重量", -1)),
                  oe(e("input", {
                    "onUpdate:modelValue": (O) => j.grams = O,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (f(ae)[j.foodId]?.name || j.name || "食物") + "克数"
                  }, null, 8, Gu), [
                    [ve, j.grams]
                  ]),
                  p[17] || (p[17] = e("small", null, "克", -1))
                ]),
                e("label", Hu, [
                  p[18] || (p[18] = e("span", null, "餐次", -1)),
                  oe(e("select", {
                    "onUpdate:modelValue": (O) => j.meal = O
                  }, [
                    (s(!0), l(q, null, J(f(xt), ([O, _]) => (s(), l("option", {
                      key: O,
                      value: O
                    }, a(_), 9, Ku))), 128))
                  ], 8, Wu), [
                    [Fe, j.meal]
                  ])
                ])
              ]),
              j.referenceConfirmed === !1 ? (s(), l("p", Yu, [
                p[19] || (p[19] = M("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                f(ae)[j.foodId]?.source ? (s(), l("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (O) => j.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, Xu)) : (s(), l("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: p[6] || (p[6] = (O) => w.$emit("browse"))
                }, "查找具体食物"))
              ])) : C("", !0)
            ]))), 128))
          ])) : (s(), l("p", Qu, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (s(!0), l(q, null, J(f(en), (j) => (s(), l("details", {
            key: j.key,
            class: "vb-diary-food-group",
            onToggle: (se) => v[j.key] = se.target.open
          }, [
            e("summary", null, [
              N(L, {
                name: f(Ln)[j.key],
                size: 18
              }, null, 8, ["name"]),
              M(a(j.name), 1),
              e("small", null, a(j.items.length) + " 个条目", 1),
              N(L, {
                name: "chevron",
                size: 14
              })
            ]),
            v[j.key] ? (s(), l("div", ed, [
              (s(!0), l(q, null, J(j.items.slice(0, b[j.key] || 24), ([se, O]) => (s(), l("button", {
                key: se,
                type: "button",
                onClick: (_) => re(f(ae)[se])
              }, a(O) + " ＋", 9, td))), 128)),
              j.items.length > (b[j.key] || 24) ? (s(), l("button", {
                key: 0,
                type: "button",
                onClick: (se) => b[j.key] = (b[j.key] || 24) + 24
              }, "再显示24项", 8, nd)) : C("", !0)
            ])) : C("", !0)
          ], 40, Zu))), 128)),
          e("label", sd, [
            p[20] || (p[20] = M("补充备注 ", -1)),
            p[21] || (p[21] = e("span", null, "可选，不发送给 AI", -1)),
            oe(e("textarea", {
              "onUpdate:modelValue": p[7] || (p[7] = (j) => D.value.notes = j),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [ve, D.value.notes]
            ])
          ]),
          e("details", od, [
            p[22] || (p[22] = e("summary", null, "查看记录依据", -1)),
            p[23] || (p[23] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (s(!0), l(q, null, J(K.value, (j) => (s(), l("p", {
              key: j.id
            }, [
              M(a(j.name) + "：" + a(j.nutritionSnapshot?.source?.name || f(it)(j.nutritionSnapshot?.estimate?.model) || "原目录数据"), 1),
              j.nutritionSnapshot?.estimate ? (s(), l("span", ld, " · " + a(j.nutritionSnapshot.estimate.assumption), 1)) : C("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : C("", !0)
    ]));
  }
}, id = { class: "vb-food-card vb-glass" }, rd = ["aria-label"], ud = { class: "vb-food-card-copy" }, dd = { class: "vb-small-label" }, cd = { key: 0 }, vd = { key: 0 }, md = {
  key: 1,
  class: "vb-food-composition-note"
}, pd = { class: "vb-food-card-bottom" }, bd = ["aria-pressed"], Nn = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const o = t;
    ce(() => o.food.key, (r) => {
      Ke(r).catch(() => {
      });
    }, { immediate: !0 });
    const { photo: n, loading: u, failed: i } = es(() => o.food);
    return (r, d) => (s(), l("article", id, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: d[0] || (d[0] = (m) => r.$emit("detail", t.food.key))
      }, [
        N(pn, {
          food: t.food,
          photo: f(n),
          loading: f(u),
          failed: f(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", ud, [
          e("span", dd, a(t.food.categoryName), 1),
          e("h3", null, a(f(Ft)(t.food)), 1),
          e("p", null, a(f(mn)(t.food)), 1),
          t.food.source ? (s(), l("dl", cd, [
            (s(!0), l(q, null, J(f(Le), (m) => (s(), l("div", {
              key: m.id
            }, [
              e("dt", null, a(m.id === "carbs" ? "碳水" : m.name), 1),
              e("dd", null, [
                M(a(f(He)(t.food.nutrients[m.id])), 1),
                t.food.nutrients[m.id] != null ? (s(), l("small", vd, a(m.unit), 1)) : C("", !0)
              ])
            ]))), 128))
          ])) : (s(), l("p", md, [
            d[3] || (d[3] = M("按实际配方记录份量", -1)),
            d[4] || (d[4] = e("br", null, null, -1)),
            M(a(f(Bn).estimates?.[t.food.key] ? "已保存AI单值估算 · 查看假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, rd),
      e("div", pd, [
        e("span", null, a(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (s(), l("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: be({ selected: t.compared }),
          onClick: d[2] || (d[2] = (m) => r.$emit("compare", t.food.key))
        }, [
          N(L, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          M(a(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, bd)) : (s(), l("button", {
          key: 0,
          type: "button",
          onClick: d[1] || (d[1] = (m) => r.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, fd = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), gd = { class: "vb-food-hub" }, yd = { class: "vb-page-title" }, hd = ["aria-expanded"], kd = { class: "vb-glass vb-food-search-hero" }, wd = { class: "vb-icon-badge" }, $d = { class: "vb-food-search-input" }, _d = {
  key: 1,
  class: "vb-food-suggestions"
}, Ad = ["onClick"], Cd = { class: "vb-recommended" }, Sd = ["onClick"], Id = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, Ed = { class: "vb-section-heading" }, xd = {
  key: 0,
  class: "vb-comparison-chips"
}, Ud = ["onClick"], jd = { class: "vb-field" }, Dd = { class: "vb-ask-bottom" }, Nd = ["disabled"], Pd = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, Rd = {
  key: 2,
  class: "vb-ai-answer"
}, Td = {
  key: 0,
  class: "vb-data-note"
}, Md = { class: "vb-answer-foods" }, zd = ["onClick"], Od = { class: "vb-data-note" }, Fd = { class: "vb-data-note" }, Bd = {
  key: 1,
  class: "vb-compare-bar"
}, Ld = ["onClick"], qd = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, Vd = { class: "vb-food-results-grid" }, Jd = { class: "vb-section-heading vb-category-heading" }, Gd = { class: "vb-food-category-grid" }, Hd = ["onClick"], Wd = ["src", "alt"], Kd = { class: "vb-food-results-top" }, Yd = { class: "vb-food-filter" }, Xd = { key: 0 }, Qd = ["onClick"], Zd = { key: 1 }, ec = ["value"], tc = { class: "vb-food-results-grid" }, nc = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, sc = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, oc = ["disabled"], lc = ["disabled"], ac = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, ic = { class: "vb-reference-sample-list" }, rc = ["onClick"], uc = { key: 0 }, dc = { class: "vb-food-source-note" }, cc = ["href"], vc = ["href"], mc = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const o = P(""), n = P(""), u = P(""), i = P(""), r = P("relevance"), d = P(1), m = P(!1), c = P([]), v = P(""), b = P(!1), x = P(""), h = P(!1), g = P(null), k = P(""), A = Vt, S = new Set(Vt.map((Q) => Q.key)), U = new Set(ys.map((Q) => Q.key)), D = G(() => n.value ? Jt(n.value).map((Q) => Q.food).filter((Q) => U.has(Q.key) && !S.has(Q.key)) : []);
    function K(Q, w = dt.length) {
      return Jt(Q).map((p) => p.food).filter((p) => S.has(p.key)).slice(0, w);
    }
    const X = G(() => o.value.trim() ? K(o.value, dt.length).slice(0, 5) : []), z = (Q) => A.filter((w) => w.category === Q).length, F = Vt.length, I = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((Q) => {
      const w = Jt(Q).map((p) => p.food).filter((p) => S.has(p.key));
      return w.find((p) => p.source) || w[0];
    }).filter(Boolean).map((Q) => [Q.key, Q])).values()], B = G(() => {
      let Q = n.value ? K(n.value) : [...A].sort((w, p) => +!w.source - +!p.source);
      return u.value && (Q = Q.filter((w) => w.category === u.value)), Q;
    }), ee = G(() => [...new Set(B.value.map((Q) => Q.subcategory))]), re = G(() => {
      let Q = B.value.filter((w) => !i.value || w.subcategory === i.value);
      if (r.value !== "relevance") {
        const [w, p] = r.value.split(":");
        Q = [...Q].sort((j, se) => {
          if (w === "name") return j.name.localeCompare(se.name, "zh");
          const O = j.nutrients[w], _ = se.nutrients[w];
          return O == null || _ == null ? +(O == null) - +(_ == null) : (p === "asc" ? 1 : -1) * (O - _);
        });
      }
      return Q;
    }), W = G(() => Math.max(1, Math.ceil(re.value.length / 12))), ge = G(() => re.value.slice((d.value - 1) * 12, d.value * 12));
    ce([i, r], () => d.value = 1);
    function ue(Q = o.value) {
      o.value = Q.trim(), n.value = o.value, u.value = "", i.value = "", d.value = 1, m.value = !1;
    }
    function ye(Q) {
      u.value = Q, n.value = "", o.value = "", i.value = "", d.value = 1, r.value = "relevance";
    }
    function fe() {
      u.value = "", n.value = "", o.value = "", i.value = "", d.value = 1;
    }
    function $e(Q) {
      v.value = "", c.value.includes(Q) ? c.value = c.value.filter((w) => w !== Q) : c.value.length < 2 ? c.value.push(Q) : v.value = "每次选择两种食物进行比较。";
    }
    async function Ie() {
      if (!(h.value || !x.value.trim())) {
        h.value = !0, k.value = "", g.value = null;
        try {
          g.value = await ct("ask", { question: x.value.trim(), foodIds: c.value });
        } catch (Q) {
          k.value = Q.message;
        } finally {
          h.value = !1;
        }
      }
    }
    return (Q, w) => (s(), l("div", gd, [
      e("div", yd, [
        e("div", null, [
          w[14] || (w[14] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, a(f(F).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": b.value,
          onClick: w[0] || (w[0] = (p) => b.value = !b.value)
        }, [
          N(L, {
            name: "sparkles",
            size: 17
          }),
          w[15] || (w[15] = M("问 AI", -1))
        ], 8, hd)
      ]),
      e("section", kd, [
        e("span", wd, [
          N(L, {
            name: "search",
            size: 23
          })
        ]),
        w[18] || (w[18] = e("div", null, [
          e("h2", null, "今天想了解哪一种食物？")
        ], -1)),
        e("form", {
          class: "vb-food-search-form",
          onSubmit: w[3] || (w[3] = We((p) => ue(), ["prevent"]))
        }, [
          e("div", $d, [
            N(L, {
              name: "search",
              size: 19
            }),
            oe(e("input", {
              "onUpdate:modelValue": w[1] || (w[1] = (p) => o.value = p),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: w[2] || (w[2] = (p) => m.value = !0)
            }, null, 544), [
              [ve, o.value]
            ]),
            o.value ? (s(), l("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: fe
            }, [
              N(L, {
                name: "close",
                size: 15
              })
            ])) : C("", !0),
            m.value && X.value.length ? (s(), l("div", _d, [
              (s(!0), l(q, null, J(X.value, (p) => (s(), l("button", {
                key: p.key,
                type: "button",
                onClick: (j) => ue(p.name)
              }, [
                M(a(p.name), 1),
                e("small", null, a(p.state), 1)
              ], 8, Ad))), 128))
            ])) : C("", !0)
          ]),
          w[16] || (w[16] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", Cd, [
          w[17] || (w[17] = e("span", null, "推荐搜索", -1)),
          (s(), l(q, null, J(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (p) => e("button", {
            key: p,
            type: "button",
            onClick: (j) => ue(p)
          }, a(p), 9, Sd)), 64))
        ])
      ]),
      b.value ? (s(), l("section", Id, [
        e("div", Ed, [
          w[19] || (w[19] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          N(L, { name: "sparkles" })
        ]),
        w[23] || (w[23] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给维衡 AI。数值来自食物库，AI 负责解释。", -1)),
        c.value.length ? (s(), l("div", xd, [
          (s(!0), l(q, null, J(c.value, (p) => (s(), l("button", {
            key: p,
            type: "button",
            onClick: (j) => $e(p)
          }, a(f(ae)[p].name) + " ×", 9, Ud))), 128))
        ])) : C("", !0),
        e("form", {
          onSubmit: We(Ie, ["prevent"])
        }, [
          e("label", jd, [
            w[20] || (w[20] = M("你的问题", -1)),
            oe(e("textarea", {
              "onUpdate:modelValue": w[4] || (w[4] = (p) => x.value = p),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [ve, x.value]
            ])
          ]),
          e("div", Dd, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: w[5] || (w[5] = (p) => x.value = c.value.length === 2 ? "这两种食物的蛋白质有什么区别？" : "100 克香蕉大约有多少热量？")
            }, "填入示例问题"),
            e("button", {
              type: "submit",
              class: "vb-button vb-button-primary",
              disabled: h.value || !x.value.trim()
            }, a(h.value ? "正在查询与分析…" : "发送问题"), 9, Nd)
          ])
        ], 32),
        k.value ? (s(), l("p", Pd, a(k.value), 1)) : C("", !0),
        g.value ? (s(), l("div", Rd, [
          w[21] || (w[21] = e("h3", null, "数据库数值", -1)),
          g.value.database.length ? C("", !0) : (s(), l("p", Td, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", Md, [
            (s(!0), l(q, null, J(g.value.database, (p) => (s(), l("button", {
              key: p.id,
              type: "button",
              onClick: (j) => Q.$emit("detail", p.id)
            }, [
              e("strong", null, a(p.name) + " →", 1),
              e("span", null, a(p.grams) + " 克可食部 · 热量 " + a(f(He)(p.portion.energy)) + a(p.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + a(f(He)(p.portion.protein)) + a(p.portion.protein != null ? " g" : ""), 1),
              e("small", null, a(p.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, zd))), 128))
          ]),
          w[22] || (w[22] = e("h3", null, "AI 解释", -1)),
          e("p", null, a(g.value.answer.summary), 1),
          e("p", null, a(g.value.answer.explanation), 1),
          e("p", Od, a(g.value.answer.limitations), 1),
          e("small", Fd, a(f(it)(g.value.model)) + " · " + a(new Date(g.value.generatedAt).toLocaleString()), 1)
        ])) : C("", !0)
      ])) : C("", !0),
      c.value.length ? (s(), l("div", Bd, [
        e("span", null, "已选 " + a(c.value.length) + " 种食物", 1),
        (s(!0), l(q, null, J(c.value, (p) => (s(), l("button", {
          key: p,
          onClick: (j) => $e(p)
        }, a(f(ae)[p].name) + " ×", 9, Ld))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: w[6] || (w[6] = (p) => {
            b.value = !0, x.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : C("", !0),
      v.value ? (s(), l("p", qd, a(v.value), 1)) : C("", !0),
      !u.value && !n.value ? (s(), l(q, { key: 3 }, [
        w[25] || (w[25] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物")
          ])
        ], -1)),
        e("div", Vd, [
          (s(), l(q, null, J(I, (p) => N(Nn, {
            key: p.key,
            food: p,
            compared: c.value.includes(p.key),
            onDetail: w[7] || (w[7] = (j) => Q.$emit("detail", j)),
            onCompare: $e
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", Jd, [
          e("div", null, [
            w[24] || (w[24] = e("h2", null, "按类别探索", -1)),
            e("p", null, a(f(A).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", Gd, [
          (s(!0), l(q, null, J(f(hs).filter((p) => z(p.id) > 0), (p) => (s(), l("button", {
            key: p.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: (j) => ye(p.id)
          }, [
            e("img", {
              src: p.image,
              alt: p.name + "分类示意图",
              loading: "lazy"
            }, null, 8, Wd),
            e("span", null, [
              e("small", null, a(z(p.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, a(p.name), 1),
              e("em", null, [
                M(a(p.description) + " ", 1),
                N(L, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, Hd))), 128))
        ]),
        w[26] || (w[26] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (s(), l(q, { key: 4 }, [
        e("div", Kd, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: fe
          }, [
            N(L, {
              name: "back",
              size: 15
            }),
            w[27] || (w[27] = M("分类总览", -1))
          ]),
          e("h2", null, a(u.value ? f(kn)[u.value].name : "“" + n.value + "”的食物照片与营养资料"), 1),
          e("span", null, a(re.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", Yd, [
          ee.value.length <= 10 ? (s(), l("div", Xd, [
            e("button", {
              class: be({ selected: !i.value }),
              onClick: w[8] || (w[8] = (p) => i.value = "")
            }, "全部", 2),
            (s(!0), l(q, null, J(ee.value, (p) => (s(), l("button", {
              key: p,
              class: be({ selected: i.value === p }),
              onClick: (j) => i.value = p
            }, a(p), 11, Qd))), 128))
          ])) : (s(), l("label", Zd, [
            w[29] || (w[29] = M("筛选", -1)),
            oe(e("select", {
              "onUpdate:modelValue": w[9] || (w[9] = (p) => i.value = p),
              "aria-label": "食物类型筛选"
            }, [
              w[28] || (w[28] = e("option", { value: "" }, "全部类型", -1)),
              (s(!0), l(q, null, J(ee.value, (p) => (s(), l("option", {
                key: p,
                value: p
              }, a(p), 9, ec))), 128))
            ], 512), [
              [Fe, i.value]
            ])
          ])),
          e("label", null, [
            w[31] || (w[31] = M("排序", -1)),
            oe(e("select", {
              "onUpdate:modelValue": w[10] || (w[10] = (p) => r.value = p),
              "aria-label": "食物营养指标排序"
            }, [...w[30] || (w[30] = [
              zn('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [Fe, r.value]
            ])
          ])
        ]),
        e("div", tc, [
          (s(!0), l(q, null, J(ge.value, (p) => (s(), de(Nn, {
            key: p.key,
            food: p,
            compared: c.value.includes(p.key),
            onDetail: w[11] || (w[11] = (j) => Q.$emit("detail", j)),
            onCompare: $e
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        re.value.length ? C("", !0) : (s(), l("div", nc, [
          N(L, {
            name: "search",
            size: 34
          }),
          w[32] || (w[32] = e("h2", null, "没有找到匹配的食物", -1)),
          w[33] || (w[33] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: fe
          }, "返回食物总览")
        ])),
        W.value > 1 ? (s(), l("nav", sc, [
          e("button", {
            disabled: d.value === 1,
            onClick: w[12] || (w[12] = (p) => d.value--)
          }, "上一页", 8, oc),
          e("span", null, "第 " + a(d.value) + " / " + a(W.value) + " 页", 1),
          e("button", {
            disabled: d.value === W.value,
            onClick: w[13] || (w[13] = (p) => d.value++)
          }, "下一页", 8, lc)
        ])) : C("", !0)
      ], 64)),
      n.value && D.value.length ? (s(), l("details", ac, [
        e("summary", null, "其他营养数据样本 · " + a(D.value.length.toLocaleString()) + " 条", 1),
        w[34] || (w[34] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", ic, [
          (s(!0), l(q, null, J(D.value.slice(0, 80), (p) => (s(), l("button", {
            key: p.key,
            type: "button",
            onClick: (j) => Q.$emit("detail", p.key)
          }, [
            e("strong", null, a(p.name), 1),
            e("span", null, a(p.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, rc))), 128))
        ]),
        D.value.length > 80 ? (s(), l("p", uc, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : C("", !0)
      ])) : C("", !0),
      e("details", dc, [
        w[35] || (w[35] = e("summary", null, "数据口径与图片署名", -1)),
        w[36] || (w[36] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        w[37] || (w[37] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        w[38] || (w[38] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        w[39] || (w[39] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (s(!0), l(q, null, J(f(fd), (p) => (s(), l("li", {
            key: p.key
          }, [
            M(a(f(kn)[p.key]?.name) + "：", 1),
            e("a", {
              href: p.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, a(p.title), 9, cc),
            M(" · " + a(p.author) + " · ", 1),
            e("a", {
              href: p.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, a(p.license), 9, vc),
            M(" · " + a(p.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function pc(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function bc() {
  const t = P(""), o = P((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), n = P("lunch"), u = P(null), i = P(""), r = P(!1), d = P([]);
  async function m(v, b, x = {}) {
    if (r.value) return;
    i.value = "", u.value = null, r.value = !0, d.value = [];
    const h = v ? {
      sex: v.sex,
      age: v.age,
      height: v.height,
      weight: v.weight,
      activity: v.activity,
      ageMonths: v.ageMonths,
      physiologicalStage: v.physiologicalStage
    } : null;
    try {
      u.value = await Ms({
        goal: t.value.slice(0, 500),
        date: o.value,
        meal: n.value,
        profile: h,
        conditions: x.conditions,
        recordContext: x.recordContext,
        ...b ? {
          personalization: {
            preferences: b.preferences?.slice(0, 200),
            safetyFlags: b.safetyFlags?.slice(0, 4)
          }
        } : {}
      }, (g) => d.value.push(g));
    } catch (g) {
      i.value = pc(g);
    } finally {
      r.value = !1;
    }
  }
  function c() {
    u.value = null, i.value = "", d.value = [];
  }
  return { goal: t, date: o, meal: n, response: u, error: i, busy: r, progress: d, run: m, clear: c };
}
const fc = [
  ["花生", "peanut", "peanuts", "groundnut"],
  ["奶", "牛奶", "乳", "乳制品", "奶制品", "dairy", "milk", "cheese", "yogurt", "yoghurt", "cream", "butter"],
  ["蛋", "鸡蛋", "egg", "eggs"],
  ["海鲜", "seafood", "鱼虾蟹贝", "鱼", "虾", "蟹", "贝", "fish", "shrimp", "prawn", "crab", "clam", "oyster", "salmon", "tuna", "cod", "squid", "mussel"],
  ["肉类", "肉", "牛肉", "猪肉", "鸡肉", "羊肉", "禽", "beef", "pork", "chicken", "lamb", "turkey", "duck", "meat"],
  ["香菜", "coriander", "cilantro"],
  ["大豆", "豆制品", "soy", "tofu"],
  ["小麦", "wheat"],
  ["坚果", "nuts", "almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut"]
], Xt = (t, o = 300) => typeof t == "string" ? t.trim().slice(0, o) : "";
function Qt(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const o = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (o !== null && (!Number.isFinite(o) || o <= 0 || o > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const n = (Array.isArray(t.avoids) ? t.avoids.join("、") : Xt(t.avoids)).split(/[,，、;；\n]+/).map((r) => r.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (n.length > 12 || n.some((r) => r.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const u = t.availableFoods ?? [];
  if (!Array.isArray(u) || u.length > 12) throw new Error("可选食物最多12项。");
  const i = u.map((r) => {
    const d = ae[r?.foodId], m = Number(r?.grams), c = r?.price === null || r?.price === void 0 || r?.price === "" ? null : Number(r.price);
    if (!d || !Number.isFinite(m) || m < 0.1 || m > 5e3 || c !== null && (!Number.isFinite(c) || c < 0 || c > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: d.key, name: d.name, grams: m, price: c };
  });
  if (new Set(i.map((r) => r.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: o, avoids: [...new Set(n)], preferences: Xt(t.preferences, 200), exercise: Xt(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function ss(t, o = []) {
  const n = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), u = It(n);
  return o.filter((i) => {
    const r = /* @__PURE__ */ new Set([i]);
    for (const d of fc) if (d.some((m) => It(m) === It(i))) for (const m of d) r.add(m);
    return [...r].some((d) => /^[a-z ]+$/i.test(d) ? new RegExp("\\b" + d.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(n) : u.includes(It(d)));
  });
}
function Pn(t, o) {
  return !!t && !["13", "17"].includes(t.category) && !ss(t, o.avoids).length && (!o.onlyAvailable || o.availableFoods.some((n) => n.foodId === t.key));
}
function gc(t, o) {
  const n = t.map((r) => {
    const d = o.availableFoods.find((c) => c.foodId === r.foodId), m = d?.price != null ? Math.round(d.price * r.grams / d.grams * 100) / 100 : null;
    return { foodId: r.foodId, cost: m, priceBasis: d?.price != null ? { price: d.price, grams: d.grams } : null };
  }), u = n.every((r) => r.cost !== null), i = Math.round(n.reduce((r, d) => r + (d.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: o.budget, complete: u, knownSubtotal: i, total: u ? i : null, status: u ? o.budget === null ? "no_budget" : i > o.budget ? "over_budget" : "within_budget" : "unknown", breakdown: n, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: o.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const yc = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, hc = { class: "vb-agent-heading" }, kc = { class: "vb-icon-badge" }, wc = { class: "vb-campus-fields" }, $c = ["max", "disabled"], _c = ["disabled"], Ac = ["value"], Cc = ["disabled"], Sc = ["disabled"], Ic = { class: "vb-analysis-tabs" }, Ec = ["disabled"], xc = ["disabled", "onClick"], Uc = { class: "vb-more-conditions" }, jc = { class: "vb-agent-goal" }, Dc = ["disabled"], Nc = { class: "vb-campus-fields" }, Pc = ["disabled"], Rc = ["disabled"], Tc = { class: "vb-campus-candidates" }, Mc = { class: "vb-candidate-search" }, zc = ["disabled"], Oc = ["disabled"], Fc = ["value"], Bc = ["disabled"], Lc = { class: "vb-candidate-list" }, qc = ["onUpdate:modelValue", "disabled"], Vc = ["onUpdate:modelValue", "disabled"], Jc = ["disabled", "onClick"], Gc = {
  key: 0,
  class: "vb-agent-context-optin"
}, Hc = ["disabled"], Wc = { class: "vb-agent-context-optin" }, Kc = ["disabled"], Yc = { class: "vb-agent-context-optin" }, Xc = ["disabled"], Qc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Zc = ["disabled"], ev = {
  key: 0,
  class: "vb-loading-ring"
}, tv = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, nv = { key: 0 }, sv = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, ov = ["disabled"], lv = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, av = {
  key: 3,
  class: "vb-agent-plan"
}, iv = {
  key: 0,
  class: "vb-data-note",
  role: "status"
}, rv = { class: "vb-agent-plan-heading" }, uv = { class: "vb-eyebrow" }, dv = { key: 1 }, cv = { class: "vb-data-note" }, vv = { key: 0 }, mv = { key: 1 }, pv = { class: "vb-agent-items" }, bv = { class: "vb-agent-item-title" }, fv = ["onClick"], gv = ["onClick"], yv = {
  key: 0,
  class: "vb-candidate-search"
}, hv = ["value"], kv = ["disabled", "onClick"], wv = { key: 0 }, $v = { class: "vb-agent-grams" }, _v = ["value", "onInput"], Av = { class: "vb-data-note" }, Cv = { class: "vb-agent-evidence" }, Sv = { class: "vb-agent-source" }, Iv = ["href"], Ev = { key: 1 }, xv = { key: 0 }, Uv = {
  key: 3,
  class: "vb-agent-notes"
}, jv = {
  key: 4,
  class: "vb-agent-notes is-caution"
}, Dv = { class: "vb-agent-trace" }, Nv = { class: "vb-agent-confirm" }, Pv = ["disabled"], Rv = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = Mn("pushUndo", () => {
    }), { goal: r, date: d, meal: m, response: c, error: v, busy: b, progress: x, run: h, clear: g } = bc();
    r.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const k = yt({ budget: "", avoids: "", preferences: n.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), A = P(-1), S = P(""), U = P(!1), D = P(!1), K = P(!0), X = P(!1), z = P(""), F = P(""), I = P(""), B = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], ee = G(() => F.value.trim() ? rn(F.value, 8) : []), re = G(() => ht((n.records || []).find((O) => O.date === d.value))), W = G(() => c.value?.status === "ready" ? c.value : null), ge = G(() => (W.value?.plan.items || []).map((O, _) => ({ id: "agent-" + _, foodId: O.foodId, name: O.name, grams: O.grams, meal: O.meal, group: ae[O.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), ue = G(() => W.value ? gc(W.value.plan.items, W.value.conditions) : null), ye = G(() => !W.value || !W.value.plan.items.length || ue.value?.status === "over_budget" || W.value.plan.items.some((O) => !Number.isFinite(O.grams) || O.grams < 0.1 || O.grams > 5e3));
    ce([r, d, m, k, K, X, () => n.profile, () => n.records], () => {
      !b.value && c.value && g(), U.value = !1;
    }, { deep: !0 }), ce(() => n.preferences, (O) => k.preferences = O || "");
    function fe() {
      const O = ae[I.value];
      if (z.value = "", !!O) {
        if (k.availableFoods.some((_) => _.foodId === O.key)) {
          z.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (k.availableFoods.length >= 12) {
          z.value = "最多加入12项备选食物。";
          return;
        }
        k.availableFoods.push({ foodId: O.key, name: O.name, grams: 100, price: "" }), I.value = "", F.value = "";
      }
    }
    async function $e() {
      z.value = "", U.value = !1, D.value = !1;
      let O;
      try {
        await Ke(k.availableFoods.map((R) => R.foodId)), O = Qt(k);
        const _ = O.availableFoods.find((R) => ss(ae[R.foodId], O.avoids).length);
        if (_) throw Error("备选食物“" + _.name + "”命中回避项，请先移除或修改条件。");
      } catch (_) {
        z.value = _.message;
        return;
      }
      await h(n.profile, X.value ? { safetyFlags: (n.flags || []).filter((_) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes(_)) } : void 0, { conditions: O, ...K.value ? { recordContext: { date: d.value, entries: re.value.map((_) => ({ foodId: _.foodId, name: _.name, grams: _.grams, meal: _.meal, referenceConfirmed: _.referenceConfirmed })) } } : {} });
    }
    function Ie() {
      ye.value || U.value || (U.value = !0, u("confirm", { confirmationId: W.value.confirmationId, date: W.value.date, meal: W.value.meal, items: W.value.plan.items, onResult: (O) => {
        U.value = O.ok, O.ok || (z.value = O.error || "加入草稿失败，请重试。");
      } }));
    }
    function Q(O, _) {
      W.value && (W.value.plan.items[O].grams = Number(_), W.value.plan.items[O].portion = wn(ae[W.value.plan.items[O].foodId], Number(_)), D.value = !0);
    }
    function w(O) {
      const _ = W.value;
      if (!_) return;
      const [R] = _.plan.items.splice(O, 1);
      R && (D.value = !0, i({ label: "移除方案食物", restore: () => {
        W.value === _ && (_.plan.items.splice(O, 0, R), D.value = !0);
      } }));
    }
    const p = G(() => {
      let O;
      try {
        O = Qt(k);
      } catch {
        return [];
      }
      return (O.availableFoods.length && O.onlyAvailable ? O.availableFoods.map((R) => ae[R.foodId]) : dt).filter((R) => R && !R.__summary && R.source && Pn(R, O) && !W.value?.plan.items.some((te) => te.foodId === R.key)).slice(0, 60);
    });
    async function j(O) {
      const _ = S.value, R = W.value, te = ae[_];
      if (!R || !te || !p.value.some((Ue) => Ue.key === _)) return;
      try {
        if (await Ke([_]), W.value !== R || !Pn(te, Qt(k))) return;
      } catch (Ue) {
        z.value = Ue.message || "食物详情读取失败，请重试。";
        return;
      }
      const le = R.plan.items[O];
      le && (R.plan.items[O] = { ...le, foodId: te.key, name: te.name, portion: wn(te, le.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: te.source?.name || "", source: te.source?.id || "", missing: ["energy", "protein", "carbs", "fat"].filter((Ue) => typeof te.nutrients?.[Ue] != "number") }, D.value = !0, A.value = -1, S.value = "");
    }
    const se = (O) => typeof O == "number" && Number.isFinite(O) ? O.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (O, _) => (s(), l("section", yc, [
      e("header", hc, [
        e("span", kc, [
          N(L, {
            name: "sparkles",
            size: 21
          })
        ]),
        _[15] || (_[15] = e("div", null, [
          e("h2", { id: "meal-agent-title" }, "安排我的下一餐"),
          e("p", null, "说清预算和回避项，结合你的备选食物检索与计算。方案先核对，实际吃过后再记录。")
        ], -1))
      ]),
      e("form", {
        class: "vb-agent-form",
        onSubmit: We($e, ["prevent"])
      }, [
        e("div", wc, [
          e("label", null, [
            _[16] || (_[16] = M("日期", -1)),
            oe(e("input", {
              "onUpdate:modelValue": _[0] || (_[0] = (R) => Lt(d) ? d.value = R : null),
              type: "date",
              max: f(xe)(),
              disabled: f(b)
            }, null, 8, $c), [
              [ve, f(d)]
            ])
          ]),
          e("label", null, [
            _[17] || (_[17] = M("餐次", -1)),
            oe(e("select", {
              "onUpdate:modelValue": _[1] || (_[1] = (R) => Lt(m) ? m.value = R : null),
              disabled: f(b)
            }, [
              (s(), l(q, null, J(B, ([R, te]) => e("option", {
                key: R,
                value: R
              }, a(te), 9, Ac)), 64))
            ], 8, _c), [
              [Fe, f(m)]
            ])
          ]),
          e("label", null, [
            _[18] || (_[18] = M("预算（元，可选）", -1)),
            oe(e("input", {
              "onUpdate:modelValue": _[2] || (_[2] = (R) => k.budget = R),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: f(b)
            }, null, 8, Cc), [
              [ve, k.budget]
            ])
          ]),
          e("label", null, [
            _[19] || (_[19] = M("不吃的食物", -1)),
            oe(e("input", {
              "onUpdate:modelValue": _[3] || (_[3] = (R) => k.avoids = R),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: f(b)
            }, null, 8, Sc), [
              [ve, k.avoids]
            ])
          ])
        ]),
        e("div", Ic, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: f(b),
            onClick: _[4] || (_[4] = (R) => k.budget = "15")
          }, "预算15元", 8, Ec),
          (s(), l(q, null, J(["清淡", "素食偏好"], (R) => e("button", {
            key: R,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: f(b),
            onClick: (te) => k.preferences = R
          }, a(R), 9, xc)), 64)),
          e("span", null, "已选偏好：" + a(k.preferences || "未设置"), 1)
        ]),
        e("details", Uc, [
          _[29] || (_[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", jc, [
            _[20] || (_[20] = e("span", null, "这餐想怎么安排？", -1)),
            oe(e("textarea", {
              "onUpdate:modelValue": _[5] || (_[5] = (R) => Lt(r) ? r.value = R : null),
              rows: "2",
              maxlength: "500",
              disabled: f(b),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, Dc), [
              [ve, f(r)]
            ])
          ]),
          e("div", Nc, [
            e("label", null, [
              _[21] || (_[21] = M("口味与饮食偏好", -1)),
              oe(e("input", {
                "onUpdate:modelValue": _[6] || (_[6] = (R) => k.preferences = R),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: f(b)
              }, null, 8, Pc), [
                [ve, k.preferences]
              ])
            ]),
            e("label", null, [
              _[22] || (_[22] = M("运动情况（可选）", -1)),
              oe(e("input", {
                "onUpdate:modelValue": _[7] || (_[7] = (R) => k.exercise = R),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: f(b)
              }, null, 8, Rc), [
                [ve, k.exercise]
              ])
            ])
          ]),
          e("details", Tc, [
            _[27] || (_[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            _[28] || (_[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", Mc, [
              oe(e("input", {
                "onUpdate:modelValue": _[8] || (_[8] = (R) => F.value = R),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: f(b),
                onInput: _[9] || (_[9] = (R) => I.value = "")
              }, null, 40, zc), [
                [ve, F.value]
              ]),
              oe(e("select", {
                "onUpdate:modelValue": _[10] || (_[10] = (R) => I.value = R),
                "aria-label": "选择具体食物",
                disabled: f(b) || !ee.value.length
              }, [
                _[23] || (_[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (s(!0), l(q, null, J(ee.value, (R) => (s(), l("option", {
                  key: R.key,
                  value: R.key
                }, a(R.name), 9, Fc))), 128))
              ], 8, Oc), [
                [Fe, I.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: f(b) || !I.value,
                onClick: fe
              }, "加入备选", 8, Bc)
            ]),
            e("div", Lc, [
              (s(!0), l(q, null, J(k.availableFoods, (R, te) => (s(), l("article", {
                key: R.foodId
              }, [
                e("strong", null, a(R.name), 1),
                e("label", null, [
                  _[24] || (_[24] = M("这份可食部（克）", -1)),
                  oe(e("input", {
                    "onUpdate:modelValue": (le) => R.grams = le,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: f(b)
                  }, null, 8, qc), [
                    [
                      ve,
                      R.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  _[25] || (_[25] = M("这份已知价格（元）", -1)),
                  oe(e("input", {
                    "onUpdate:modelValue": (le) => R.price = le,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: f(b)
                  }, null, 8, Vc), [
                    [ve, R.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: f(b),
                  onClick: (le) => k.availableFoods.splice(te, 1)
                }, "移除", 8, Jc)
              ]))), 128))
            ]),
            k.availableFoods.length ? (s(), l("label", Gc, [
              oe(e("input", {
                "onUpdate:modelValue": _[11] || (_[11] = (R) => k.onlyAvailable = R),
                type: "checkbox",
                disabled: f(b)
              }, null, 8, Hc), [
                [ft, k.onlyAvailable]
              ]),
              _[26] || (_[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : C("", !0)
          ])
        ]),
        e("label", Wc, [
          oe(e("input", {
            "onUpdate:modelValue": _[12] || (_[12] = (R) => K.value = R),
            type: "checkbox",
            disabled: f(b)
          }, null, 8, Kc), [
            [ft, K.value]
          ]),
          e("span", null, [
            M("使用所选日期的 " + a(re.value.length) + " 项已记录食物", 1),
            _[30] || (_[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", Yc, [
          oe(e("input", {
            "onUpdate:modelValue": _[13] || (_[13] = (R) => X.value = R),
            type: "checkbox",
            disabled: f(b)
          }, null, 8, Xc), [
            [ft, X.value]
          ]),
          _[31] || (_[31] = e("span", null, [
            M("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        _[32] || (_[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给维衡 AI。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        z.value ? (s(), l("p", Qc, a(z.value), 1)) : C("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: f(b) || !f(r).trim()
        }, [
          f(b) ? (s(), l("span", ev)) : (s(), de(L, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          M(a(f(b) ? "正在等待真实检索与计算…" : W.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, Zc)
      ], 32),
      f(b) || f(x).length ? (s(), l("div", tv, [
        e("div", null, [
          e("strong", null, a(f(b) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          f(b) ? (s(), l("p", nv, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : C("", !0),
          e("ol", null, [
            (s(!0), l(q, null, J(f(x), (R, te) => (s(), l("li", { key: te }, [
              e("strong", null, a(R.label), 1),
              M(" · " + a(R.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : C("", !0),
      f(v) ? (s(), l("div", sv, [
        _[33] || (_[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, a(f(v)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: f(b),
          onClick: $e
        }, "保留条件并重试", 8, ov)
      ])) : C("", !0),
      f(c)?.status === "needs_evidence" ? (s(), l("p", lv, a(f(c).message) + " 可展开“我能买到的食物”换一种具体食材；没有备选时系统会从整个目录检索。", 1)) : C("", !0),
      W.value ? (s(), l("section", av, [
        D.value ? (s(), l("p", iv, "方案已修改：下方营养与费用按当前份量重新计算；生成时的文字建议和目标比较已失效。" + a(U.value ? "这批方案已加入草稿，请在饮食记录中继续修改。" : ""), 1)) : C("", !0),
        e("div", rv, [
          e("div", null, [
            e("p", uv, "待确认 · " + a(W.value.date) + " · " + a(B.find((R) => R[0] === W.value.meal)?.[1]), 1),
            e("h3", null, a(W.value.plan.title), 1)
          ]),
          _[34] || (_[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        D.value ? C("", !0) : (s(), l("p", dv, a(W.value.plan.summary), 1)),
        e("p", cv, "本次使用 " + a(W.value.contextSummary.itemCount) + " 项已记录食物；" + a(W.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        ue.value ? (s(), l("div", {
          key: 2,
          class: be(["vb-campus-cost", { "is-caution": ue.value.status === "over_budget" }])
        }, [
          e("h4", null, a(ue.value.complete ? "按录入价格估算：约 ¥" + se(ue.value.total) : "价格待确认"), 1),
          ue.value.budget !== null ? (s(), l("p", vv, "本餐预算 ¥" + a(ue.value.budget) + " · " + a(ue.value.status === "within_budget" ? "按已录入价格估算在预算内" : ue.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : C("", !0),
          ue.value.complete ? C("", !0) : (s(), l("p", mv, "已知价格小计约 ¥" + a(se(ue.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, a(ue.value.basis) + "。" + a(ue.value.availability) + "。", 1)
        ], 2)) : C("", !0),
        e("div", pv, [
          (s(!0), l(q, null, J(W.value.plan.items, (R, te) => (s(), l("article", {
            key: R.foodId,
            class: "vb-agent-item"
          }, [
            e("div", bv, [
              e("div", null, [
                N(pn, {
                  food: f(ae)[R.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, a(f(Ft)(f(ae)[R.foodId])), 1),
                e("small", null, a(f(mn)(f(ae)[R.foodId])), 1),
                e("p", null, a(R.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (le) => w(te)
              }, "移除", 8, fv)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (le) => {
                A.value = te, S.value = "";
              }
            }, "换一道", 8, gv),
            A.value === te ? (s(), l("div", yv, [
              oe(e("select", {
                "onUpdate:modelValue": _[14] || (_[14] = (le) => S.value = le),
                "aria-label": "替换食物"
              }, [
                _[35] || (_[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (s(!0), l(q, null, J(p.value, (le) => (s(), l("option", {
                  key: le.key,
                  value: le.key
                }, a(le.name), 9, hv))), 128))
              ], 512), [
                [Fe, S.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !S.value,
                onClick: (le) => j(te)
              }, "确认替换", 8, kv),
              p.value.length ? C("", !0) : (s(), l("p", wv, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : C("", !0),
            e("label", $v, [
              _[36] || (_[36] = M("可食部估算克数", -1)),
              e("input", {
                value: R.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (le) => Q(te, le.target.value)
              }, null, 40, _v),
              _[37] || (_[37] = M("克", -1))
            ]),
            e("p", Av, "本项费用：" + a(ue.value?.breakdown[te]?.cost == null ? "价格未知" : "约 ¥" + se(ue.value.breakdown[te].cost)), 1),
            e("div", Cv, [
              (s(), l(q, null, J([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (le) => e("small", {
                key: le.id
              }, a(le.name) + " " + a(se(R.portion[le.id])) + a(R.portion[le.id] !== null ? " " + le.unit : ""), 1)), 64))
            ]),
            e("details", Sv, [
              _[39] || (_[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + a(f(ae)[R.foodId]?.state), 1),
              e("p", null, [
                _[38] || (_[38] = M("来源：", -1)),
                f(ae)[R.foodId]?.source ? (s(), l("a", {
                  key: 0,
                  href: f(ae)[R.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, a(R.sourceName) + " · " + a(R.source), 9, Iv)) : (s(), l("span", Ev, "暂无可核验成分数据"))
              ]),
              e("p", null, a(f(ae)[R.foodId]?.source?.description), 1),
              _[40] || (_[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              R.missing.length ? (s(), l("p", xv, "缺失指标：" + a(R.missing.join("、")), 1)) : C("", !0)
            ])
          ]))), 128))
        ]),
        N(un, {
          entries: ge.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        _[45] || (_[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        !D.value && W.value.plan.suggestions.length ? (s(), l("div", Uv, [
          _[41] || (_[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (s(!0), l(q, null, J(W.value.plan.suggestions, (R) => (s(), l("li", { key: R }, a(R), 1))), 128))
          ])
        ])) : C("", !0),
        !D.value && W.value.plan.cautions.length ? (s(), l("div", jv, [
          _[42] || (_[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (s(!0), l(q, null, J(W.value.plan.cautions, (R) => (s(), l("li", { key: R }, a(R), 1))), 128))
          ])
        ])) : C("", !0),
        e("details", Dv, [
          _[43] || (_[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (s(!0), l(q, null, J(W.value.trace, (R, te) => (s(), l("li", { key: te }, [
              e("strong", null, a(R.label), 1),
              M(" · " + a(R.inputSummary) + " · " + a(R.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, a(f(it)(W.value.model)) + " · " + a(W.value.dataVersion) + " · " + a(new Date(W.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        N(qn),
        e("div", Nv, [
          _[44] || (_[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: U.value || ye.value,
            onClick: Ie
          }, a(U.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, Pv)
        ])
      ])) : C("", !0)
    ]));
  }
}, Tv = { class: "vb-page-title" }, Mv = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, zv = { class: "vb-glass vb-record-prompt" }, Ov = /* @__PURE__ */ at({
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
    return (o, n) => (s(), l(q, null, [
      e("div", Tv, [
        n[4] || (n[4] = e("div", null, [
          e("h1", null, "膳食方案"),
          e("p", null, "结合身体档案、饮食记录与就餐条件，安排更适合自己的下一餐。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-soft",
          onClick: n[0] || (n[0] = (u) => o.$emit("navigate", "profile"))
        }, "调整档案与饮食偏好")
      ]),
      t.nutrition ? C("", !0) : (s(), l("section", Mv, [...n[5] || (n[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      N(Rv, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: n[1] || (n[1] = (u) => o.$emit("add-plan", u))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", zv, [
        n[6] || (n[6] = e("div", null, [
          e("h3", null, "从下一餐，回到真实记录"),
          e("p", null, "方案不代表已经吃过；食物、配料、价格与实际份量需要你核对。")
        ], -1)),
        e("button", {
          class: "vb-text-button",
          onClick: n[2] || (n[2] = (u) => o.$emit("navigate", "diary"))
        }, "去记录实际饮食 →"),
        e("button", {
          class: "vb-text-button",
          onClick: n[3] || (n[3] = (u) => o.$emit("navigate", "about"))
        }, "查看参考资料 →")
      ])
    ], 64));
  }
}), Fv = { class: "vb-page-title" }, Bv = { class: "vb-glass vb-profile-details" }, Lv = { class: "vb-section-heading" }, qv = { class: "vb-pill" }, Vv = { key: 0 }, Jv = { key: 1 }, Gv = { class: "vb-profile-settings" }, Hv = { class: "vb-glass" }, Wv = { class: "vb-section-heading" }, Kv = { class: "vb-field" }, Yv = ["value"], Xv = { class: "vb-glass" }, Qv = { class: "vb-section-heading" }, Zv = ["checked", "onChange"], em = { class: "vb-check-row" }, tm = ["checked"], nm = { class: "vb-check-row" }, sm = ["checked"], om = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String, autoAnalysis: Boolean, autoRecognition: Boolean },
  emits: ["edit", "update:flags", "update:preferences", "update:autoAnalysis", "update:autoRecognition"],
  setup(t, { emit: o }) {
    const n = t, u = G(() => on.find((m) => m.key === n.profile.activity)), i = o, r = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function d(m, c, v) {
      i("update:flags", c ? [...v, m] : v.filter((b) => b !== m));
    }
    return (m, c) => (s(), l(q, null, [
      e("div", Fv, [
        c[5] || (c[5] = e("div", null, [
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: c[0] || (c[0] = (v) => m.$emit("edit"))
        }, [
          N(L, {
            name: "edit",
            size: 17
          }),
          c[4] || (c[4] = M("修改基础档案", -1))
        ])
      ]),
      e("section", Bv, [
        e("div", Lv, [
          c[6] || (c[6] = e("h2", null, "基础信息", -1)),
          e("span", qv, a(f(Me) ? f(Ut) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
        ]),
        e("dl", null, [
          e("div", null, [
            c[7] || (c[7] = e("dt", null, "生理性别", -1)),
            e("dd", null, a(t.profile.sex === "male" ? "男性" : t.profile.sex === "female" ? "女性" : "未填写"), 1)
          ]),
          e("div", null, [
            c[8] || (c[8] = e("dt", null, "年龄", -1)),
            e("dd", null, a(t.profile.age == null || t.profile.age === "" ? "未填写" : `${t.profile.age} 岁`), 1)
          ]),
          t.profile.age === 0 ? (s(), l("div", Vv, [
            c[9] || (c[9] = e("dt", null, "月龄", -1)),
            e("dd", null, a(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : C("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (s(), l("div", Jv, [
            c[10] || (c[10] = e("dt", null, "生理阶段", -1)),
            e("dd", null, a({ pregnant: "孕期", lactating: "哺乳期", special: "需专业评估" }[t.profile.physiologicalStage]), 1)
          ])) : C("", !0),
          e("div", null, [
            c[11] || (c[11] = e("dt", null, "身高", -1)),
            e("dd", null, a(t.profile.height == null || t.profile.height === "" ? "未填写" : `${t.profile.height} cm`), 1)
          ]),
          e("div", null, [
            c[12] || (c[12] = e("dt", null, "体重", -1)),
            e("dd", null, a(t.profile.weight == null || t.profile.weight === "" ? "未填写" : `${t.profile.weight} kg`), 1)
          ]),
          e("div", null, [
            c[13] || (c[13] = e("dt", null, "每日活动", -1)),
            e("dd", null, a(u.value?.label || "未填写"), 1)
          ]),
          e("div", null, [
            c[14] || (c[14] = e("dt", null, "活动系数", -1)),
            e("dd", null, a(u.value ? "× " + u.value.factor : "未填写"), 1)
          ])
        ])
      ]),
      e("div", Gv, [
        e("section", Hv, [
          e("div", Wv, [
            c[15] || (c[15] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            N(L, { name: "bowl" })
          ]),
          e("label", Kv, [
            c[16] || (c[16] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: c[1] || (c[1] = (v) => m.$emit("update:preferences", v.target.value))
            }, null, 40, Yv)
          ]),
          c[17] || (c[17] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", Xv, [
          e("div", Qv, [
            c[18] || (c[18] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            N(L, { name: "shield" })
          ]),
          (s(), l(q, null, J(r, (v) => e("label", {
            key: v,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(v),
              onChange: (b) => d(v, b.target.checked, t.flags)
            }, null, 40, Zv),
            e("span", null, a(v), 1)
          ])), 64)),
          c[21] || (c[21] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1)),
          e("label", em, [
            e("input", {
              type: "checkbox",
              checked: t.autoAnalysis,
              onChange: c[2] || (c[2] = (v) => m.$emit("update:autoAnalysis", v.target.checked))
            }, null, 40, tm),
            c[19] || (c[19] = e("span", null, "保存记录后自动生成 AI 分析", -1))
          ]),
          e("label", nm, [
            e("input", {
              type: "checkbox",
              checked: t.autoRecognition,
              onChange: c[3] || (c[3] = (v) => m.$emit("update:autoRecognition", v.target.checked))
            }, null, 40, sm),
            c[20] || (c[20] = e("span", null, "选择照片后自动开始识别", -1))
          ])
        ])
      ])
    ], 64));
  }
}, lm = {
  key: 0,
  class: "vb-page-title"
}, am = { class: "vb-local-chip" }, im = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, rm = { class: "vb-safety-grid" }, um = { class: "vb-icon-badge" }, dm = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const o = Me.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", n = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + o + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (u, i) => (s(), l(q, null, [
      t.embedded ? C("", !0) : (s(), l("div", lm, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", am, [
          N(L, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = M("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (s(), l("section", im, [
        N(L, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + a(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : C("", !0),
      e("div", rm, [
        (s(), l(q, null, J(n, ([r, d, m]) => e("article", {
          key: d,
          class: "vb-glass"
        }, [
          e("span", um, [
            N(L, {
              name: r,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, a(d), 1),
          e("p", null, a(m), 1)
        ])), 64))
      ]),
      N(qn)
    ], 64));
  }
}, cm = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, vm = { class: "vb-glass vb-submission-hero" }, mm = { class: "vb-submission-hero-copy" }, pm = { class: "vb-icon-badge" }, bm = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, fm = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, gm = { class: "vb-submission-step-top" }, ym = { class: "vb-icon-badge" }, hm = ["onClick"], km = { class: "vb-submission-columns" }, wm = { class: "vb-glass vb-submission-panel" }, $m = { class: "vb-submission-boundary" }, _m = { class: "vb-icon-badge" }, Am = { class: "vb-icon-badge" }, Cm = { class: "vb-icon-badge" }, Sm = { class: "vb-glass vb-submission-panel" }, Im = { class: "vb-inline-note" }, Em = { class: "vb-glass vb-submission-evidence" }, xm = { class: "vb-submission-evidence-actions" }, Um = /* @__PURE__ */ at({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const o = {
      foodCount: dt.length,
      sourcedCount: dt.filter((u) => !!u.source?.id).length,
      categories: new Set(dt.map((u) => u.category).filter(Boolean)).size
    }, n = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (u, i) => (s(), l(q, null, [
      t.embedded ? C("", !0) : (s(), l("div", cm, [
        i[4] || (i[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "在线评审入口 · 维衡 AI"),
          e("h1", null, "把营养建议放回真实的一餐"),
          e("p", null, "从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: i[0] || (i[0] = (r) => u.$emit("navigate", "mealplan"))
        }, [
          N(L, {
            name: "sparkles",
            size: 17
          }),
          i[3] || (i[3] = M("体验餐食规划 ", -1))
        ])
      ])),
      e("section", vm, [
        e("div", mm, [
          e("span", pm, [
            N(L, {
              name: "leaf",
              size: 22
            })
          ]),
          i[5] || (i[5] = e("div", null, [
            e("h2", null, "让营养计算有依据，让饮食安排更贴近日常。"),
            e("p", null, "面向全年龄段，以饮食记录和营养摄入计算为核心。记录食物与份量，查看能量、维生素和矿物质的已知合计与参考依据，再结合预算、忌口和偏好安排下一餐。不同年龄按适用条件分析，缺失值不补0。")
          ], -1))
        ]),
        e("div", bm, [
          e("div", null, [
            e("strong", null, a(o.foodCount), 1),
            i[6] || (i[6] = e("span", null, "食物目录条目", -1))
          ]),
          e("div", null, [
            e("strong", null, a(o.sourcedCount), 1),
            i[7] || (i[7] = e("span", null, "有核验来源", -1))
          ]),
          e("div", null, [
            e("strong", null, a(o.categories), 1),
            i[8] || (i[8] = e("span", null, "食物分类", -1))
          ])
        ])
      ]),
      i[18] || (i[18] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("h2", null, "从检索到回顾")
        ])
      ], -1)),
      e("section", fm, [
        (s(), l(q, null, J(n, (r) => e("article", {
          key: r.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", gm, [
            e("span", null, a(r.number), 1),
            e("span", ym, [
              N(L, {
                name: r.icon
              }, null, 8, ["name"])
            ])
          ]),
          e("h3", null, a(r.title), 1),
          e("p", null, a(r.copy), 1),
          e("button", {
            class: "vb-text-button",
            onClick: (d) => u.$emit("navigate", r.page)
          }, [
            M(a(r.action), 1),
            N(L, {
              name: "arrow",
              size: 15
            })
          ], 8, hm)
        ])), 64))
      ]),
      e("div", km, [
        e("section", wm, [
          i[12] || (i[12] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", $m, [
            e("article", null, [
              e("span", _m, [
                N(L, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Am, [
                N(L, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", Cm, [
                N(L, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", Sm, [
          i[14] || (i[14] = zn('<h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>维衡 AI</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 2)),
          e("p", Im, [
            N(L, {
              name: "info",
              size: 16
            }),
            i[13] || (i[13] = M("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", Em, [
        i[17] || (i[17] = e("div", null, [
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口模拟检查与真实模型调用分开记录，未执行真实调用时不会记作通过。")
        ], -1)),
        e("div", xm, [
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[1] || (i[1] = (r) => u.$emit("navigate", "food"))
          }, [
            N(L, {
              name: "apple",
              size: 16
            }),
            i[15] || (i[15] = M("核对食物来源", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[2] || (i[2] = (r) => u.$emit("navigate", "assessment"))
          }, [
            N(L, {
              name: "report",
              size: 16
            }),
            i[16] || (i[16] = M("查看报告样例", -1))
          ])
        ])
      ])
    ], 64));
  }
}), jm = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], Dm = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], Nm = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], Pm = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, Rm = { class: "vb-reference-list" }, Tm = ["href"], Mm = {
  key: 1,
  class: "vb-data-note"
}, zm = { class: "vb-reference-terms" }, Om = {
  __name: "ReferencePanel",
  setup(t) {
    return (o, n) => (s(), l("section", Pm, [
      n[8] || (n[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      n[9] || (n[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      n[10] || (n[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", Rm, [
        (s(!0), l(q, null, J(f(jm), (u) => (s(), l("details", {
          key: u.id
        }, [
          e("summary", null, [
            e("strong", null, a(u.title), 1),
            e("span", null, a(u.status), 1)
          ]),
          e("dl", null, [
            e("div", null, [
              n[0] || (n[0] = e("dt", null, "用途与版本", -1)),
              e("dd", null, a(u.kind) + " · " + a(u.version) + " · " + a(u.volume), 1)
            ]),
            e("div", null, [
              n[1] || (n[1] = e("dt", null, "条目定位", -1)),
              e("dd", null, a(u.locator), 1)
            ]),
            e("div", null, [
              n[2] || (n[2] = e("dt", null, "适用范围", -1)),
              e("dd", null, a(u.scope), 1)
            ]),
            e("div", null, [
              n[3] || (n[3] = e("dt", null, "原始单位", -1)),
              e("dd", null, a(u.units), 1)
            ])
          ]),
          u.url ? (s(), l("a", {
            key: 0,
            href: u.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "核对公开来源 ↗", 8, Tm)) : (s(), l("p", Mm, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", zm, [
        n[4] || (n[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (s(!0), l(q, null, J(f(Nm), ([u, i, r]) => (s(), l("p", { key: u }, [
          e("strong", null, a(u) + " · " + a(i), 1),
          M("：" + a(r), 1)
        ]))), 128)),
        n[5] || (n[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        n[6] || (n[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (s(!0), l(q, null, J(f(Dm), (u) => (s(), l("li", { key: u }, a(u), 1))), 128))
        ]),
        n[7] || (n[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, Fm = { class: "vb-page-title" }, Bm = { class: "vb-local-chip" }, Lm = { "aria-labelledby": "about-project-heading" }, qm = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, Vm = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, Jm = {
  key: 0,
  role: "alert"
}, Gm = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Hm = { class: "vb-reset-actions" }, Wm = ["disabled"], Km = ["disabled"], Ym = /* @__PURE__ */ at({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const o = P(!1), n = P(!1), u = P("");
    function i() {
      try {
        const d = JSON.parse(Se.getItem("weiheng.local.v2") || "{}"), m = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: d.profile || null, records: (Array.isArray(d.records) ? d.records : []).map((b) => ({ date: b.date, entries: b.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, c = URL.createObjectURL(new Blob([JSON.stringify(m, null, 2)], { type: "application/json" })), v = document.createElement("a");
        v.href = c, v.download = "维衡-当前档案与食物记录.json", v.click(), setTimeout(() => URL.revokeObjectURL(c), 1e3);
      } catch {
        u.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function r() {
      if (!n.value) {
        n.value = !0, u.value = "";
        try {
          await js(), window.location.reload();
        } catch {
          u.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", n.value = !1;
        }
      }
    }
    return (d, m) => (s(), l(q, null, [
      e("div", Fm, [
        m[5] || (m[5] = e("div", null, [
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", Bm, [
          m[4] || (m[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          M(a(f(Me) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", Lm, [
        m[6] || (m[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ])
        ], -1)),
        N(Um, {
          embedded: "",
          onNavigate: m[0] || (m[0] = (c) => d.$emit("navigate", c))
        })
      ]),
      N(Om),
      e("section", qm, [
        m[7] || (m[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ])
        ], -1)),
        N(dm, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", Vm, [
        e("div", null, [
          m[8] || (m[8] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, a(f(Me) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          m[9] || (m[9] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          u.value ? (s(), l("p", Jm, a(u.value), 1)) : C("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: m[1] || (m[1] = (c) => o.value = !0)
        }, "清空数据并重置")
      ]),
      o.value ? (s(), de(lt, {
        key: 0,
        title: f(Me) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: m[3] || (m[3] = (c) => !n.value && (o.value = !1))
      }, {
        default: st(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + a(f(Me) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          m[10] || (m[10] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          u.value ? (s(), l("p", Gm, a(u.value), 1)) : C("", !0),
          e("div", Hm, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: n.value,
              onClick: m[2] || (m[2] = (c) => o.value = !1)
            }, "取消", 8, Wm),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: n.value,
              onClick: r
            }, a(n.value ? "正在清理…" : "确认清空并重置"), 9, Km)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : C("", !0)
    ], 64));
  }
}), Xm = ["data-theme"], Qm = ["inert"], Zm = { class: "vb-main" }, ep = { class: "vb-topbar" }, tp = { class: "vb-breadcrumb" }, np = { class: "vb-topbar-actions" }, sp = { class: "vb-local-chip" }, op = ["aria-label"], lp = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, ap = { class: "vb-footer" }, ip = { class: "vb-reset-actions" }, rp = {
  key: 5,
  class: "vb-toast",
  role: "status"
}, Rn = "weiheng.automatic-behavior.v1", mp = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: o, theme: n, nutrition: u, records: i, storageError: r, updateProfile: d, saveRecord: m, clearDraftAfterSave: c, addToDraft: v, addPlanToDraft: b, toggleHabit: x } = dn(), { toggleTheme: h } = ks(n), { reports: g, reportStorageError: k, loadReports: A, latestReport: S, isStale: U, generateReport: D } = vn();
    A();
    const K = t, X = G(() => o.flags.includes("孕期或哺乳期") ? { ...o.profile, physiologicalStage: "special" } : o.profile || {}), z = P(K.initialPage), F = P(K.initialEditor), I = P(!1), B = P(!1), ee = P(null), re = P(null), W = P(null), ge = P(xe()), ue = P(!1), ye = P([]), fe = G(() => ye.value.length > 0);
    let $e = {};
    try {
      $e = JSON.parse(Se.getItem(Rn) || "{}");
    } catch {
    }
    const Ie = P($e.analysis !== !1), Q = P($e.recognition !== !1);
    function w(H, T) {
      H === "analysis" ? Ie.value = T : Q.value = T;
      try {
        Se.setItem(Rn, JSON.stringify({ analysis: Ie.value, recognition: Q.value }));
      } catch {
        _e("设置暂时无法保存到当前浏览器。");
      }
    }
    const p = G(() => ({ overview: ["查看已记录摄入与能量需求。", "未记录日期不会按零摄入计算。"], diary: ["选择照片后核对食物与克数。", "保存记录后才会计入当天汇总。"], food: ["搜索具体品种并核对生熟状态。", "营养数据按每100克可食部展示。"], mealplan: ["方案只是待确认建议。", "核对份量与价格后再加入草稿。"], dietAssistant: ["提问前可选择是否联网。", "照片识别与 AI 估算都需要核对。"], assessment: ["比较前先确认记录覆盖范围。"], profile: ["在这里调整自动分析和照片识别。"], about: ["查看数据依据、安全与隐私说明。"] })[z.value] || []);
    function j({ label: H, restore: T }) {
      ye.value = [...ye.value.slice(-9), { label: H, restore: T }], clearTimeout(je), ee.value = { message: H + "，可撤销", undo: se }, je = setTimeout(() => ee.value = null, 7e3);
    }
    function se() {
      const H = ye.value.at(-1);
      H && (ye.value = ye.value.slice(0, -1), H.restore(), ee.value = null);
    }
    vs("pushUndo", j);
    const O = P(""), _ = P(""), R = P(""), te = G(() => g.value.find((H) => H.id === _.value) || S(O.value)), le = G(() => o.records.find((H) => H.date === O.value)), Ue = { overview: "概览", dietAssistant: "维衡 AI 助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, he = G(() => Me.value ? Ut.value === "error" ? "账号同步暂不可用 · 本机副本保留" : Ut.value === "syncing" || Ut.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let je, De = 0;
    function _e(H, T = null) {
      T && j({ label: H, restore: T }), clearTimeout(je), ee.value = { message: H, undo: T ? se : null }, je = setTimeout(() => ee.value = null, 7e3);
    }
    function Ae(H) {
      z.value = H, window.scrollTo({ top: 0, behavior: "auto" }), Te(() => re.value?.focus({ preventScroll: !0 }));
    }
    function vt() {
      F.value = !1, I.value = !0;
    }
    function Xe() {
      I.value = !1;
    }
    function Qe(H) {
      B.value = !1, Ae("about"), Te(() => document.getElementById(H)?.scrollIntoView({ block: "start" }));
    }
    function mt(H) {
      const T = d(H);
      if (T) {
        _e(T);
        return;
      }
      F.value = !1, Ae("overview"), _e(Me.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function rt(H, T = !1) {
      const Z = ++De;
      R.value = "", O.value = H.date, _.value = "";
      try {
        const Ce = D(H, X.value, { force: T });
        await Te();
        const Ct = await Ce;
        Z === De && O.value === H.date && (_.value = Ct?.id || "");
      } catch (Ce) {
        Z === De && (R.value = Ce.message || "分析暂时不可用，请重试。");
      }
    }
    function qe(H) {
      if (!ue.value) {
        ue.value = !0;
        try {
          const T = m(H);
          if (!T.ok) {
            _e(T.error);
            return;
          }
          ge.value = T.record.date, c(T.record.date, T.record), _e(Ie.value ? "饮食记录已保存，正在分析" : "饮食记录已保存，可手动打开分析"), Ie.value && rt(T.record);
        } finally {
          ue.value = !1;
        }
      }
    }
    function ze(H, T) {
      T ? g.value.find((Ce) => Ce.id === T) : S(H), O.value = H, _.value = T || "", R.value = "", o.records.find((Ce) => Ce.date === H);
    }
    function _t(H = O.value) {
      const T = o.records.find((Z) => Z.date === H);
      T && rt(T, !0);
    }
    function ut(H) {
      if (!Ge(H.date) || H.date > xe() || Number(H.grams) < 0.1 || Number(H.grams) > 5e3) {
        _e("请核对日期与食用克数。");
        return;
      }
      const T = v(H);
      ge.value = H.date, W.value = null, Ae("diary"), _e(T ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    async function Pe(H) {
      const T = Re();
      try {
        if (await Ke(H.items.map((Ce) => Ce.foodId)), T !== Re()) return;
      } catch (Ce) {
        H.onResult?.({ ok: !1, error: Ce.message }), _e(Ce.message);
        return;
      }
      const Z = b(H);
      if (H.onResult?.(Z), !Z.ok) {
        _e(Z.error);
        return;
      }
      ge.value = H.date, Ae("diary"), _e(Z.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function Bt(H) {
      const T = o.records.find((Z) => Z.date === H);
      T && (o.records = o.records.filter((Z) => Z.date !== H), _e("这条饮食记录已删除，报告快照仍保留。", () => {
        m(T), ee.value = null;
      }));
    }
    function At(H) {
      const T = H.target?.closest?.("input,textarea,[contenteditable]"), Z = H.ctrlKey || H.metaKey;
      Z && H.key.toLowerCase() === "k" ? (H.preventDefault(), Ae("food"), Te(() => document.querySelector('[aria-label="食物查询关键词"]')?.focus())) : Z && H.key.toLowerCase() === "s" && z.value === "diary" ? (H.preventDefault(), document.querySelector(".vb-save-record:not(:disabled)")?.click()) : Z && H.key.toLowerCase() === "z" && !T && fe.value ? (H.preventDefault(), se()) : H.key === "?" && !Z && !T && (H.preventDefault(), B.value = !0);
    }
    return $t(() => window.addEventListener("keydown", At)), nt(() => {
      clearTimeout(je), window.removeEventListener("keydown", At);
    }), (H, T) => (s(), l("div", {
      class: be(["vb-app", { "is-diary": z.value === "diary", "is-chat": z.value === "dietAssistant" }]),
      "data-theme": f(n)
    }, [
      e("div", {
        inert: F.value || W.value || O.value || B.value || void 0
      }, [
        N(ws, {
          active: z.value,
          onNavigate: Ae
        }, null, 8, ["active"]),
        e("div", Zm, [
          e("header", ep, [
            e("span", tp, [
              T[22] || (T[22] = e("span", null, "营养工作台", -1)),
              T[23] || (T[23] = e("i", null, "/", -1)),
              M(a(Ue[z.value]), 1)
            ]),
            e("div", np, [
              e("span", sp, [
                T[24] || (T[24] = e("i", { class: "vb-status-dot" }, null, -1)),
                M(a(he.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                "aria-label": "使用帮助",
                onClick: T[0] || (T[0] = (Z) => B.value = !0)
              }, "帮助"),
              e("button", {
                class: "vb-account-trigger",
                onClick: vt
              }, a(f(Me) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": f(n) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: T[1] || (T[1] = (...Z) => f(h) && f(h)(...Z))
              }, [
                N(L, {
                  name: f(n) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, op),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: T[2] || (T[2] = (Z) => Ae("profile"))
              }, [
                N(L, {
                  name: "person",
                  size: 18
                })
              ])
            ])
          ]),
          e("main", {
            ref_key: "content",
            ref: re,
            class: "vb-content",
            tabindex: "-1"
          }, [
            f(r) || f(k) ? (s(), l("p", lp, a(f(r) || f(k)), 1)) : C("", !0),
            (s(), l(q, { key: 1 }, [
              oe(N(Fi, {
                active: z.value === "dietAssistant",
                records: f(o).records,
                targets: f(u),
                profile: X.value,
                "initial-date": ge.value
              }, null, 8, ["active", "records", "targets", "profile", "initial-date"]), [
                [cs, z.value === "dietAssistant"]
              ]),
              z.value === "overview" ? (s(), de($s, {
                key: 0,
                profile: X.value,
                nutrition: f(u),
                "record-count": f(i).length,
                records: f(i),
                reports: f(g),
                onEdit: T[3] || (T[3] = (Z) => F.value = !0),
                onNavigate: Ae
              }, null, 8, ["profile", "nutrition", "record-count", "records", "reports"])) : C("", !0),
              z.value === "assessment" ? (s(), de(xr, {
                key: 1,
                records: f(i),
                habits: f(o).habits,
                flags: f(o).flags,
                reports: f(g),
                profile: X.value,
                onNavigate: Ae,
                onToggleHabit: f(x),
                onOpenReport: ze,
                onRetryReport: _t
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : z.value === "diary" ? (s(), de(ad, {
                key: 2,
                records: f(i),
                reports: f(g),
                profile: X.value,
                nutrition: f(u),
                "initial-date": ge.value,
                saving: ue.value,
                "auto-recognition": Q.value,
                onSave: qe,
                onRemove: Bt,
                onAnalysis: ze,
                onBrowse: T[4] || (T[4] = (Z) => Ae("food")),
                onDetail: T[5] || (T[5] = (Z) => W.value = f(ae)[Z])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving", "auto-recognition"])) : z.value === "food" ? (s(), de(mc, {
                key: 3,
                onDetail: T[6] || (T[6] = (Z) => W.value = f(ae)[Z])
              })) : z.value === "mealplan" ? (s(), de(Ov, {
                key: 4,
                nutrition: f(u),
                preferences: f(o).preferences,
                flags: f(o).flags,
                profile: X.value,
                records: f(o).records,
                onNavigate: Ae,
                onAddPlan: Pe
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : z.value === "profile" ? (s(), de(om, {
                key: 5,
                profile: X.value,
                nutrition: f(u),
                flags: f(o).flags,
                "onUpdate:flags": T[7] || (T[7] = (Z) => f(o).flags = Z),
                preferences: f(o).preferences,
                "onUpdate:preferences": T[8] || (T[8] = (Z) => f(o).preferences = Z),
                "auto-analysis": Ie.value,
                "auto-recognition": Q.value,
                "onUpdate:autoAnalysis": T[9] || (T[9] = (Z) => w("analysis", Z)),
                "onUpdate:autoRecognition": T[10] || (T[10] = (Z) => w("recognition", Z)),
                onEdit: T[11] || (T[11] = (Z) => F.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences", "auto-analysis", "auto-recognition"])) : z.value === "about" ? (s(), de(Ym, {
                key: 6,
                flags: f(o).flags,
                onNavigate: Ae
              }, null, 8, ["flags"])) : C("", !0)
            ], 64)),
            e("footer", ap, [
              N(L, {
                name: "leaf",
                size: 14
              }),
              T[25] || (T[25] = M("维衡 AI · 把健康，放进每一餐", -1)),
              T[26] || (T[26] = e("span", null, "营养信息仅供一般参考 · © 2026 维衡 AI 版权所有", -1))
            ])
          ], 512)
        ])
      ], 8, Qm),
      F.value ? (s(), de(Ao, {
        key: 0,
        profile: f(o).profile,
        onComplete: mt,
        onClose: T[12] || (T[12] = (Z) => F.value = !1),
        onLogin: vt
      }, null, 8, ["profile"])) : C("", !0),
      I.value ? (s(), de(_s, {
        key: 1,
        onClose: Xe
      })) : C("", !0),
      W.value ? (s(), de(hl, {
        key: 2,
        "food-id": W.value.key,
        onClose: T[13] || (T[13] = (Z) => W.value = null),
        onAdd: ut
      }, null, 8, ["food-id"])) : C("", !0),
      O.value ? (s(), de(Ql, {
        key: 3,
        report: te.value,
        record: le.value,
        stale: te.value ? f(U)(te.value, le.value, X.value) : !1,
        error: R.value,
        onClose: T[14] || (T[14] = (Z) => {
          O.value = "", _.value = "";
        }),
        onRetry: T[15] || (T[15] = (Z) => _t())
      }, null, 8, ["report", "record", "stale", "error"])) : C("", !0),
      B.value ? (s(), de(lt, {
        key: 4,
        title: "使用帮助",
        onClose: T[19] || (T[19] = (Z) => B.value = !1)
      }, {
        default: st(() => [
          e("p", null, "当前页面：" + a(Ue[z.value]), 1),
          e("ul", null, [
            (s(!0), l(q, null, J(p.value, (Z) => (s(), l("li", { key: Z }, a(Z), 1))), 128))
          ]),
          T[27] || (T[27] = e("h3", null, "快捷键", -1)),
          T[28] || (T[28] = e("ul", null, [
            e("li", null, "Ctrl/Cmd+K：搜索食物"),
            e("li", null, "Ctrl/Cmd+S：保存饮食记录"),
            e("li", null, "Ctrl/Cmd+Z：撤销最近一次移除或删除"),
            e("li", null, "?：打开帮助；Esc：关闭弹窗")
          ], -1)),
          T[29] || (T[29] = e("h3", null, "常见问题", -1)),
          T[30] || (T[30] = e("ul", null, [
            e("li", null, "未知值不会按零计算。"),
            e("li", null, "AI 估算与数据库值分开标记。"),
            e("li", null, "照片识别结果请核对食物与克数。"),
            e("li", null, "导出前确认记录和日期。")
          ], -1)),
          e("div", ip, [
            e("button", {
              class: "vb-button vb-button-soft",
              onClick: T[16] || (T[16] = (Z) => Qe("reference-title"))
            }, "数据依据"),
            e("button", {
              class: "vb-button vb-button-soft",
              onClick: T[17] || (T[17] = (Z) => Qe("about-safety-heading"))
            }, "安全中心"),
            e("button", {
              class: "vb-button vb-button-soft",
              onClick: T[18] || (T[18] = (Z) => Qe("about-reset-heading"))
            }, "隐私与使用说明")
          ])
        ]),
        _: 1
      })) : C("", !0),
      ee.value ? (s(), l("div", rp, [
        N(L, {
          name: "check",
          size: 17
        }),
        e("span", null, a(ee.value.message), 1),
        ee.value.undo ? (s(), l("button", {
          key: 0,
          onClick: T[20] || (T[20] = (...Z) => ee.value.undo && ee.value.undo(...Z))
        }, "撤销")) : C("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: T[21] || (T[21] = (Z) => ee.value = null)
        }, [
          N(L, {
            name: "close",
            size: 15
          })
        ])
      ])) : C("", !0)
    ], 10, Xm));
  }
};
export {
  mp as default
};
