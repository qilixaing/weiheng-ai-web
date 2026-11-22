import { r as P, a as J, b as it, w as ce, o as s, d as a, e, F as B, f as G, n as En, g as he, h as xt, i as N, j as S, k as qe, t as l, l as me, m as ne, v as pe, p as T, u as f, q as De, s as Te, x as Ye, y as ls, z as ct, A as Qe, B as ye, C as at, D as is, E as xn, G as Nt, H as rs } from "./vue-runtime-BJOX_u7T.js";
import { v as Be, t as Se, F as ae, c as Ut, r as rt, n as us, m as ds, a as Vt, b as ut, A as Kt, d as Un, e as Ve, f as jn, g as St, M as Me, h as Yt, i as Ct, j as Xt, _ as F, p as cs, s as Dn, k as kt, l as cn, N as vs, o as Le, q as ms, C as Pt, G as Nn, u as Gt, w as Qt, x as vn, P as Tt, R as ps, y as Mt, z as bs, B as mn, D as tt, E as ht, H as Pn, I as pn, J as fs, K as gs, L as hs, O as ys } from "./useThemeTransition-DIyUK0bV.js";
import { s as dt, a as Ue, o as ks, b as Ee, t as Tn, c as ws, d as xe, e as $s, f as _s, g as As, h as wt } from "./main-Df5QjV63.js";
import { _ as Zt, a as Mn, b as Ss } from "./IntakeAnalysis-CyYiEpBa.js";
function Cs(t, o) {
  if (!o || !Be(o.date) || o.date > Se() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(o.meal) || !Array.isArray(o.items) || !o.items.length || o.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const n = String(o.confirmationId || "").slice(0, 100);
  if (!n) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(n)) return { draft: t, duplicate: !0 };
  const u = o.items.map((i) => {
    const r = ae[i.foodId], d = Number(i.grams);
    if (!r || !Number.isFinite(d) || d < 0.1 || d > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: n + ":" + r.key, foodId: r.key, name: r.name, grams: d, meal: o.meal, group: r.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: Ut(r) };
  });
  if (new Set(u.map((i) => i.foodId)).size !== u.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...u], appliedBatches: [...t.appliedBatches || [], n] }, duplicate: !1 };
}
const lt = dt("weiheng.reset-signal.v1"), Rn = (t) => ks(t);
let Ke = !1;
const Xe = () => Ke;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== lt || !t.newValue))
    try {
      const { phase: o } = JSON.parse(t.newValue);
      o === "begin" && (Ke = !0), o === "abort" && (Ke = !1), o === "done" && (Ke = !0, window.location.reload());
    } catch {
    }
});
function bn(t, o) {
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
function fn(t, o = !1) {
  const n = Array.from({ length: t.length }, (u, i) => t.key(i));
  for (const u of n) u && Rn(u) && !(o && u === lt) && t.removeItem(u);
}
async function Is({
  local: t = globalThis.localStorage,
  session: o = globalThis.sessionStorage,
  databases: n = globalThis.indexedDB,
  caches: u = globalThis.caches
} = {}) {
  if (Ke) throw new Error("正在清理本地数据，请稍候。");
  Ke = !0;
  const i = (r) => t.setItem(lt, JSON.stringify({ phase: r, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), Ue.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!n) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      bn(n, dt("weiheng.media.v1")),
      bn(n, dt("weiheng.chat-attachments.v1"))
    ]), u) for (const r of await u.keys()) Rn(r) && await u.delete(r);
    o && fn(o), fn(t, !0), i("done"), t.removeItem(lt);
  } catch (r) {
    try {
      i("abort"), t.removeItem(lt);
    } catch {
    }
    throw Ke = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), r;
  }
}
const It = "weiheng.local.v2", zn = "weiheng.theme.v1", He = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function gn(t) {
  if (!t) return null;
  const o = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", n = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), u = Kt.some((r) => r.key === t.activity) ? t.activity : n[String(t.activity)] || "";
  if (ut({ ...t, sex: o, activity: u })) return null;
  const i = { ...t, sex: o, age: He(t.age), height: He(t.height), weight: He(t.weight), activity: u };
  return ut(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    o
  ), activity: String(u) };
}
function On() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const o = JSON.parse(Ee.getItem(It) || "null");
    if (o && typeof o == "object") {
      for (const i of [...Array.isArray(o.records) ? o.records : [], ...Object.values(o.drafts || {})]) for (const r of Array.isArray(i?.entries) ? i.entries : []) r.foodId === "cabbage" && r.name === "白菜" && (r.referenceConfirmed = !1);
      return { ...t, ...o, drafts: o.drafts && typeof o.drafts == "object" ? o.drafts : {}, profile: gn(o.profile), records: Array.isArray(o.records) ? o.records : [] };
    }
    const n = JSON.parse(Ee.getItem("vitabalance.v1") || Ee.getItem("vitabalance.guest.v1") || "null"), u = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return n ? { ...t, profile: gn(n.profile), records: Array.isArray(n.records) ? n.records : [], plans: Array.isArray(n.plans) ? n.plans : [], flags: u.filter(([i]) => n.profile?.[i]).map(([, i]) => i), preferences: [n.profile?.avoid, n.profile?.allergies ? "需要核对的过敏或不耐受项：" + n.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const be = it(On()), We = P("");
let Jt = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  Jt = !0;
  try {
    Object.assign(be, On());
  } finally {
    Jt = !1;
  }
});
const Es = (() => {
  try {
    return Ee.getItem(zn);
  } catch {
    return null;
  }
})(), Fn = P(Es === "dark" ? "dark" : "light"), $t = J(() => Un(be.flags.includes("孕期或哺乳期") ? null : be.profile));
ce(be, () => {
  if (!(Xe() || Jt))
    try {
      Ee.setItem(It, JSON.stringify({ ...be, calculated: $t.value })), We.value = "";
    } catch {
      We.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
ce(Fn, (t) => {
  if (!Xe())
    try {
      Ee.setItem(zn, t);
    } catch {
      We.value = "主题偏好暂时无法保存。";
    }
});
function en() {
  const t = J(() => [...be.records].sort((c, v) => v.date.localeCompare(c.date)));
  function o(c) {
    const v = ut(c);
    return v || (be.profile = { ...be.profile, sex: c.sex || "", ageMonths: He(c.ageMonths), physiologicalStage: c.physiologicalStage || "general", age: He(c.age), height: He(c.height), weight: He(c.weight), activity: c.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function n(c) {
    if (Xe()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Be(c.date)) return { ok: !1, error: "请选择有效日期。" };
    const v = be.records.find((h) => h.date === c.date), y = Array.isArray(c.entries) ? ds(c, v) : (
      /** @type {DailyRecord} */
      { ...c, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (v && Vt(v) === Vt(y)) return { ok: !0, record: v, unchanged: !0 };
    const w = [...be.records.filter((h) => h.date !== y.date), y];
    try {
      Ee.setItem(It, JSON.stringify({ ...be, records: w, calculated: $t.value }));
    } catch {
      return We.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: We.value };
    }
    return be.records = w, { ok: !0, record: y };
  }
  function u(c, v) {
    const y = i(c);
    y && (y.savedEntries = JSON.parse(JSON.stringify(Array.isArray(v?.entries) ? v.entries : [])), y.entries = [], y.recognition = null, y.appliedBatches = []);
  }
  function i(c) {
    if (!Be(c)) return null;
    if (!be.drafts[c]) {
      const v = be.records.find((y) => y.date === c);
      be.drafts[c] = { date: c, entries: rt(v), notes: v?.notes || "", photoId: v?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return be.drafts[c];
  }
  function r(c) {
    const v = i(c.date);
    if (!v) return !1;
    const y = ae[c.foodId || ""];
    return v.entries.push({ id: crypto.randomUUID(), foodId: c.foodId || null, name: y?.name || c.name || "", grams: Number(c.grams), meal: c.meal || "unspecified", group: c.group, source: c.source || "catalogue", estimated: !!c.estimated, referenceConfirmed: !0, nutritionSnapshot: us(c.nutritionSnapshot, y?.key) || Ut(y) }), !We.value;
  }
  function d(c, v) {
    const y = new Set(be.habits[c] || []);
    y.has(v) ? y.delete(v) : y.add(v), be.habits[c] = [...y];
  }
  function m(c) {
    if (Xe()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const v = be.drafts[c.date] || { date: c.date, entries: rt(be.records.find((h) => h.date === c.date)), appliedBatches: [] }, y = Cs(v, c);
      if (y.duplicate) return { ok: !0, duplicate: !0 };
      const w = { ...be.drafts, [c.date]: y.draft };
      return Ee.setItem(It, JSON.stringify({ ...be, drafts: w, calculated: $t.value })), be.drafts = w, { ok: !0, duplicate: !1 };
    } catch (v) {
      return { ok: !1, error: v.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: be, theme: Fn, nutrition: $t, records: t, storageError: We, updateProfile: o, saveRecord: n, clearDraftAfterSave: u, ensureDraft: i, addToDraft: r, addPlanToDraft: m, toggleHabit: d };
}
let Rt;
function xs() {
  return Rt || (Rt = new Promise((t, o) => {
    if (!globalThis.indexedDB) {
      o(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const n = indexedDB.open(dt("weiheng.media.v1"), 1);
    n.onupgradeneeded = () => {
      const u = n.result;
      for (const i of ["photos", "reports"]) u.objectStoreNames.contains(i) || u.createObjectStore(i, { keyPath: "id" });
    }, n.onsuccess = () => t(n.result), n.onerror = () => o(new Error("无法打开本地存储，请检查浏览器隐私设置。")), n.onblocked = () => o(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), Rt;
}
async function jt(t, o, n) {
  const u = await xs();
  if (o === "readwrite" && Xe()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, r) => {
    const d = u.transaction(t, o);
    let m;
    const c = n(d.objectStore(t));
    c.onsuccess = () => {
      m = c.result;
    }, d.oncomplete = () => i(m), d.onabort = d.onerror = () => r(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const Ht = (t, o) => jt(t, "readwrite", (n) => n.put(JSON.parse(JSON.stringify(o)))), Us = (t, o) => jt(t, "readonly", (n) => n.get(o)), js = (t) => jt(t, "readonly", (o) => o.getAll()), Ds = (t, o) => jt(t, "readwrite", (n) => n.delete(o));
async function nt(t, o) {
  const n = t === "recognize" ? 15e4 : 9e4;
  let u;
  try {
    u = await fetch("/api/ai/" + t, { method: o === void 0 ? "GET" : "POST", headers: o === void 0 ? {} : { "Content-Type": "application/json" }, body: o === void 0 ? void 0 : JSON.stringify(o), signal: Tn(n) });
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
async function Bn(t, o, n, u) {
  const i = Tn(t === "chat" ? 4e5 : 9e4), r = u ? ws([u, i]) : i;
  let d;
  try {
    d = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    o, stream: !0 }), signal: r });
  } catch (b) {
    throw new Error(b?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  if (!d.ok) {
    let b;
    try {
      b = await d.json();
    } catch {
      throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
    }
    const A = new Error(b.error || "AI 服务暂时不可用。");
    throw A.code = b.code, A;
  }
  if (!d.body) throw new Error("浏览器没有提供流式读取能力，请更新浏览器后重试。");
  const m = d.body.getReader(), c = new TextDecoder();
  let v = "", y = !1, w = null;
  const h = (b) => {
    const A = b.split(/\r?\n/).filter((k) => k.startsWith("data:")).map((k) => k.slice(5).trimStart()).join(`
`);
    if (!A) return;
    let _;
    try {
      _ = JSON.parse(A);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (_?.type === "error") {
      const k = new Error(_.message || "AI 暂时无法回复，请重试。");
      throw k.code = _.code, k;
    }
    if (_?.type === "progress" && _.step) {
      n(_);
      return;
    }
    if (_?.type === "status" && typeof _.message == "string") {
      n(_);
      return;
    }
    if (_?.type === "delta" && typeof _.text == "string") {
      n(_);
      return;
    }
    _?.type === "done" && typeof _.model == "string" && (w = _, y = !0, n(_));
  };
  try {
    for (; !y; ) {
      const { value: b, done: A } = await m.read();
      if (A) break;
      v += c.decode(b, { stream: !0 });
      let _;
      for (; (_ = v.search(/\r?\n\r?\n/)) >= 0; ) {
        const k = v.slice(_).match(/^\r?\n\r?\n/)[0];
        if (h(v.slice(0, _)), v = v.slice(_ + k.length), y) break;
      }
    }
    if (v += c.decode(), v.trim() && !y && h(v), !y || !w) throw new Error("AI 流式连接提前结束，请重试。");
    return w;
  } finally {
    m.releaseLock();
  }
}
async function Ns(t, o) {
  const n = await Bn("meal-plan", t, (u) => {
    u.type === "progress" && o(u.step);
  });
  if (!n.result || !["ready", "needs_evidence"].includes(n.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return n.result;
}
const Ge = P([]), Et = P(""), zt = /* @__PURE__ */ new Map();
let Ot;
function tn(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function Ps(t) {
  return t.filter((o) => {
    const n = o.referenceConfirmed === !1 ? void 0 : ae[o.foodId || ""];
    return Me.some((u) => {
      const i = Yt(o, n, u.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function hn(t) {
  Ge.value = [t, ...Ge.value.filter((o) => o.id !== t.id)].sort((o, n) => n.requestedAt.localeCompare(o.requestedAt));
}
async function _t(t) {
  try {
    await Ht("reports", t), Et.value = "", hn(t);
  } catch (o) {
    throw Et.value = tn(o), hn({ ...t, persistenceFailed: !0 }), o;
  }
}
function Ln() {
  return Ot || (Ot = (async () => {
    try {
      Ge.value = (await js("reports")).sort((t, o) => o.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Ge.value])
        t.status === "pending" && await _t({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      Et.value = tn(t);
    }
  })()), Ot;
}
function Ts(t) {
  return Ge.value.find((o) => o.date === t);
}
function Ms(t, o, n) {
  return !o || t.dataVersion !== jn(o, n);
}
async function Rs(t, o, { force: n = !1 } = {}) {
  const u = xe();
  if (await Ve(rt(t).filter((h) => h.foodId && !h.nutritionSnapshot).map((h) => String(h.foodId))), xe() !== u || (await Ln(), xe() !== u)) return;
  const i = jn(t, o), r = `${u}:${t.date}:${i}`, d = zt.get(r);
  if (d) return d;
  const m = Ge.value.find(
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
  }, v = rt(t), y = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: Vt(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: v,
      intake: St(v),
      profile: c
    },
    result: null,
    error: ""
  }, w = (async () => {
    await _t(y);
    try {
      const h = await nt("analyze-day", {
        date: t.date,
        entries: v,
        profile: c,
        requestId: y.id
      });
      if (xe() !== u) return;
      const b = Ps(v);
      if (b.length) {
        const k = h.calculation?.estimation, C = k?.foods || [];
        if (!(k?.status === "complete" && k.missingFoodCount === b.length && C.length === b.length && b.every((X) => {
          const Y = C.find((E) => E.entryId === String(v.indexOf(X))), O = X.referenceConfirmed === !1 ? void 0 : ae[X.foodId || ""], z = Me.filter((E) => {
            const R = Yt(X, O, E.id);
            return typeof R.value != "number" && !R.range;
          }).map((E) => E.id);
          return !!(Y && z.every((E) => {
            const R = Y.values[E], ee = Me.find((H) => H.id === E);
            return R && ee && Ct(R, ee.unit) !== null;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      const A = Xt(v, h.calculation?.estimation?.foods || [], { model: h.model, generatedAt: h.generatedAt }), _ = St(A);
      await _t({
        ...y,
        snapshot: { ...y.snapshot, entries: A, intake: _ },
        status: "complete",
        generatedAt: h.generatedAt,
        model: h.model,
        result: h.analysis,
        calculation: h.calculation ? { ...h.calculation, intake: _ } : h.calculation
      });
    } catch (h) {
      if (xe() !== u) return;
      await _t({ ...y, status: "failed", error: tn(h) });
    }
    return Ge.value.find((h) => h.id === y.id);
  })();
  zt.set(r, w);
  try {
    return await w;
  } finally {
    zt.delete(r);
  }
}
function nn() {
  return {
    reports: Ge,
    reportStorageError: Et,
    loadReports: Ln,
    latestReport: Ts,
    isStale: Ms,
    generateReport: Rs
  };
}
const zs = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], Os = {
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
    const n = t, u = o, i = P(null), r = P(!1), d = J(() => (n.max - n.min) * 0.16), m = J(() => {
      const k = Number(n.modelValue);
      return String(n.modelValue).trim() && Number.isFinite(k) ? Math.min(n.max, Math.max(n.min, k)) : n.fallback;
    }), c = J(() => {
      const k = (m.value - n.min) / d.value, C = k - Math.round(k);
      return Array.from({ length: 31 }, (M, X) => ({
        key: X,
        major: X % 5 === 0,
        left: `${50 + (X - 15 - C) / 30 * 100}%`
      }));
    });
    let v = null;
    function y(k) {
      const C = Math.round((k - n.min) / n.step), M = n.step < 1 ? 1 : 0;
      return Number(Math.min(n.max, Math.max(n.min, n.min + C * n.step)).toFixed(M));
    }
    function w(k) {
      u("update:modelValue", y(k));
    }
    function h(k) {
      k.pointerType === "mouse" && k.button !== 0 || (k.preventDefault(), i.value.setPointerCapture(k.pointerId), r.value = !0, v = { x: k.clientX, value: m.value });
    }
    function b(k) {
      if (!v || !r.value) return;
      const C = i.value.getBoundingClientRect().width || 1;
      w(v.value + (k.clientX - v.x) / C * d.value);
    }
    function A() {
      r.value = !1, v = null;
    }
    function _(k) {
      const C = {
        ArrowRight: n.step,
        ArrowUp: n.step,
        ArrowLeft: -n.step,
        ArrowDown: -n.step,
        PageUp: n.step * 10,
        PageDown: -n.step * 10
      };
      k.key === "Home" ? (k.preventDefault(), w(n.min)) : k.key === "End" ? (k.preventDefault(), w(n.max)) : C[k.key] && (k.preventDefault(), w(m.value + C[k.key]));
    }
    return (k, C) => (s(), a("div", {
      ref_key: "ruler",
      ref: i,
      class: he(["vb-ruler", { "is-dragging": r.value }]),
      role: "slider",
      tabindex: "0",
      "aria-label": `${t.label}刻度`,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": m.value,
      "aria-valuetext": `${m.value} ${t.unit}`,
      "aria-orientation": "horizontal",
      onPointerdown: h,
      onPointermove: b,
      onPointerup: A,
      onPointercancel: A,
      onLostpointercapture: A,
      onKeydown: _
    }, [
      C[0] || (C[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (s(!0), a(B, null, G(c.value, (M) => (s(), a("i", {
        key: M.key,
        class: he({ major: M.major }),
        style: En({ left: M.left })
      }, null, 6))), 128)),
      C[1] || (C[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, zs));
  }
}, Fs = { class: "vb-dialog-overlay" }, Bs = { class: "vb-wizard-top" }, Ls = { class: "vb-icon-badge" }, qs = ["aria-valuenow", "aria-label"], Vs = { class: "vb-wizard-copy" }, Gs = { class: "vb-small-label" }, Js = { id: "vb-wizard-title" }, Hs = { id: "vb-step-hint" }, Ws = {
  key: 0,
  class: "vb-sex-field"
}, Ks = { class: "vb-sr-only" }, Ys = ["aria-pressed", "onClick"], Xs = { class: "vb-person-symbol" }, Qs = { class: "vb-choice-check" }, Zs = {
  key: 1,
  class: "vb-number-step"
}, eo = { for: "vb-step-number" }, to = { class: "vb-number-control" }, no = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], so = {
  key: 0,
  class: "vb-field"
}, oo = { class: "vb-input-range" }, ao = {
  key: 2,
  class: "vb-activity-field"
}, lo = { class: "vb-sr-only" }, io = ["aria-pressed", "onClick"], ro = { class: "vb-activity-icon" }, uo = { class: "vb-radio-mark" }, co = { key: 0 }, vo = {
  key: 3,
  class: "vb-field"
}, mo = {
  key: 4,
  class: "vb-skip-row"
}, po = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, bo = { class: "vb-wizard-actions" }, fo = ["disabled"], go = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, ho = { class: "vb-wizard-account-login" }, yo = { class: "vb-wizard-privacy" }, ko = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = it(n.profile ? { ...n.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), r = P(0), d = P(""), m = P(null), c = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], v = J(() => {
      const k = c[r.value], C = cs(i.age)[k.key];
      return C ? { ...k, min: C[0], max: C[1] } : k;
    });
    function y() {
      if (r.value === 0 || r.value === 4 || !String(i[v.value.key] ?? "").trim()) return "";
      const k = Number(i[v.value.key]);
      return !Number.isFinite(k) || k < v.value.min || k > v.value.max || r.value === 1 && !Number.isInteger(k) ? `请输入 ${v.value.min}–${v.value.max} ${v.value.unit}${r.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function w(k) {
      i.sex = k, d.value = "";
    }
    function h() {
      i[v.value.key] = "", d.value = "", r.value < 4 && r.value++;
    }
    function b() {
      if (d.value = y(), !d.value) {
        if (r.value < 4) {
          r.value++;
          return;
        }
        d.value = ut(i), d.value || u("complete", { ...i });
      }
    }
    function A() {
      Te(() => m.value?.querySelector(".vb-step-input, .vb-choice-button, .vb-activity-choice")?.focus());
    }
    ce(r, () => {
      d.value = "", A();
    }), xt(A);
    function _(k) {
      if (k.key === "Escape" && n.profile) {
        u("close");
        return;
      }
      if (k.key !== "Tab") return;
      const C = [...m.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], M = C[0], X = C.at(-1);
      k.shiftKey && document.activeElement === M ? (k.preventDefault(), X.focus()) : !k.shiftKey && document.activeElement === X && (k.preventDefault(), M.focus());
    }
    return (k, C) => (s(), a("div", Fs, [
      e("section", {
        ref_key: "dialog",
        ref: m,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: _
      }, [
        e("div", Bs, [
          e("span", Ls, [
            N(F, { name: "leaf" })
          ]),
          C[10] || (C[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (s(), a("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: C[0] || (C[0] = (M) => k.$emit("close"))
          }, [
            N(F, { name: "close" })
          ])) : S("", !0)
        ]),
        e("div", {
          class: "vb-wizard-progress",
          role: "progressbar",
          "aria-valuenow": r.value + 1,
          "aria-valuemin": "1",
          "aria-valuemax": "5",
          "aria-label": `档案设置，第 ${r.value + 1} 步，共 5 步`
        }, [
          (s(), a(B, null, G(5, (M) => e("span", {
            key: M,
            class: he({ filled: M <= r.value + 1 })
          }, null, 2)), 64))
        ], 8, qs),
        e("form", {
          onSubmit: qe(b, ["prevent"])
        }, [
          e("div", Vs, [
            e("span", Gs, "第 " + l(r.value + 1) + " 步 / 共 5 步", 1),
            e("h2", Js, l(v.value.title), 1),
            e("p", Hs, l(v.value.hint), 1)
          ]),
          r.value === 0 ? (s(), a("fieldset", Ws, [
            e("legend", Ks, l(v.value.question), 1),
            (s(), a(B, null, G([["male", "男性"], ["female", "女性"]], ([M, X]) => e("button", {
              key: M,
              type: "button",
              class: he(["vb-choice-button", { selected: i.sex === M }]),
              "aria-pressed": i.sex === M,
              onClick: (Y) => w(M)
            }, [
              e("span", Xs, l(M === "male" ? "♂" : "♀"), 1),
              e("strong", null, l(X), 1),
              e("span", Qs, [
                i.sex === M ? (s(), me(F, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : S("", !0)
              ])
            ], 10, Ys)), 64))
          ])) : r.value < 4 ? (s(), a("div", Zs, [
            e("label", eo, l(v.value.question), 1),
            e("div", to, [
              ne((s(), a("input", {
                id: "vb-step-number",
                key: v.value.key,
                "onUpdate:modelValue": C[1] || (C[1] = (M) => i[v.value.key] = M),
                class: "vb-step-input",
                type: "number",
                inputmode: r.value === 1 ? "numeric" : "decimal",
                min: v.value.min,
                max: v.value.max,
                step: r.value === 1 ? 1 : 0.1,
                placeholder: v.value.placeholder,
                "aria-invalid": !!d.value,
                "aria-describedby": d.value ? "vb-step-error" : "vb-step-hint",
                onInput: C[2] || (C[2] = (M) => d.value = "")
              }, null, 40, no)), [
                [pe, i[v.value.key]]
              ]),
              e("span", null, l(v.value.unit), 1)
            ]),
            N(Os, {
              modelValue: i[v.value.key],
              "onUpdate:modelValue": [
                C[3] || (C[3] = (M) => i[v.value.key] = M),
                C[4] || (C[4] = (M) => d.value = "")
              ],
              min: v.value.min,
              max: v.value.max,
              step: r.value === 1 ? 1 : 0.1,
              fallback: Number(v.value.placeholder),
              label: v.value.question,
              unit: v.value.unit
            }, null, 8, ["modelValue", "min", "max", "step", "fallback", "label", "unit"]),
            r.value === 1 && String(i.age) === "0" ? (s(), a("label", so, [
              C[11] || (C[11] = T("月龄（可选，0–11个月）", -1)),
              ne(e("input", {
                "onUpdate:modelValue": C[5] || (C[5] = (M) => i.ageMonths = M),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [pe, i.ageMonths]
              ])
            ])) : S("", !0),
            e("p", oo, l(v.value.min) + "–" + l(v.value.max) + " " + l(v.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (s(), a("fieldset", ao, [
            e("legend", lo, l(v.value.question), 1),
            (s(!0), a(B, null, G(f(Kt), (M) => (s(), a("button", {
              key: M.key,
              type: "button",
              class: he(["vb-activity-choice", { selected: i.activity === M.key }]),
              "aria-pressed": i.activity === M.key,
              onClick: (X) => i.activity = M.key
            }, [
              e("span", ro, [
                N(F, {
                  name: M.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, l(M.label), 1),
                e("small", null, l(M.detail), 1)
              ]),
              e("span", uo, [
                i.activity === M.key ? (s(), a("i", co)) : S("", !0)
              ])
            ], 10, io))), 128))
          ])),
          r.value === 4 ? (s(), a("label", vo, [
            C[13] || (C[13] = T("生理阶段（可选）", -1)),
            ne(e("select", {
              "onUpdate:modelValue": C[6] || (C[6] = (M) => i.physiologicalStage = M)
            }, [...C[12] || (C[12] = [
              e("option", { value: "general" }, "一般情况", -1),
              e("option", { value: "pregnant" }, "孕期", -1),
              e("option", { value: "lactating" }, "哺乳期", -1),
              e("option", { value: "special" }, "其他需专业评估的情况", -1)
            ])], 512), [
              [De, i.physiologicalStage]
            ]),
            C[14] || (C[14] = e("small", null, "特殊阶段暂停通用营养目标；记录和查询仍可使用。", -1))
          ])) : S("", !0),
          r.value < 4 ? (s(), a("div", mo, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: h
            }, "跳过此项")
          ])) : S("", !0),
          e("p", po, l(d.value), 1),
          e("div", bo, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: r.value === 0 && !t.profile,
              onClick: C[7] || (C[7] = (M) => r.value > 0 ? r.value-- : k.$emit("close"))
            }, [
              N(F, {
                name: "back",
                size: 17
              }),
              T(l(r.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, fo),
            e("button", go, [
              T(l(r.value === 4 ? "保存我的身体档案" : "下一步"), 1),
              N(F, {
                name: "arrow",
                size: 17
              })
            ])
          ])
        ], 32),
        e("button", {
          type: "button",
          class: "vb-button vb-button-quiet vb-skip-all",
          onClick: C[8] || (C[8] = (M) => u("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", ho, [
          C[15] || (C[15] = T("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: C[9] || (C[9] = (M) => u("login"))
          }, "登录")
        ]),
        e("p", yo, [
          N(F, {
            name: "lock",
            size: 13
          }),
          C[16] || (C[16] = T("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, Dt = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function sn(t) {
  if (t?.__summary) return t.state || "";
  if (!t?.expanded) return t?.state || "";
  const o = String(t.source?.description || ""), n = [];
  return /\bRAW\b/.test(o) ? n.push("生") : /\bRSTD\b|ROASTED/.test(o) ? n.push("烤熟") : /\bBKD\b/.test(o) ? n.push("烘焙") : /FRIED/.test(o) ? n.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(o) && n.push("熟"), /\bDRY MIX\b/.test(o) ? n.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(o) && n.push("干制"), /\bCND\b/.test(o) && n.push("罐装"), /\bFRZ\b|FROZEN/.test(o) && n.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(o) ? n.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(o) && n.push("加盐"), n.length ? n.join(" · ") : "具体品种与配方见数据来源";
}
const qn = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function wo(t) {
  return (qn.find((n) => n.items.some(([u]) => u === t?.key) || [n.name, ...n.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([n]) => ae[n]?.source).map(([n, u]) => ({ id: n, label: u }));
}
const $o = Object.fromEntries(qn.flatMap((t) => t.items)), Vn = (t) => $o[t] || "";
function _o(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function Gn(t) {
  const o = P(null), n = P(!1), u = P(!1);
  let i = 0;
  async function r(d = !1) {
    const m = f(typeof t == "function" ? t() : t), c = ++i;
    if (o.value = null, u.value = !1, n.value = !!m && !m.image, !m) {
      n.value = !1;
      return;
    }
    try {
      o.value = await _o(m, { force: d }), u.value = !o.value;
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
function Ze(t) {
  const o = typeof t == "string" ? t.trim() : "";
  return !o || /deepseek/i.test(o) ? "维衡 AI" : o;
}
const Ao = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, So = { key: 0 }, Co = { key: 1 }, Io = {
  key: 2,
  role: "status"
}, Eo = { key: 3 }, xo = { class: "vb-portion-macros" }, Uo = { key: 0 }, jo = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, Do = { class: "vb-estimate-adjust" }, No = { class: "vb-field" }, Po = ["disabled"], To = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(!1), r = P(""), d = P(null), m = P("");
    let c = 0;
    function v(b) {
      try {
        const _ = JSON.parse(Ee.getItem("weiheng.food-estimate." + b?.key) || "null");
        if (_?.estimate)
          return d.value = { ..._, cached: !0 }, m.value = _.recipe || "", u("resolved", d.value), !0;
      } catch {
      }
      const A = Dn.estimates?.[b?.key];
      return A ? (d.value = { foodId: b.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: A.model, generatedAt: A.generatedAt, estimate: { entryId: b.key, name: b.name, grams: 100, values: A.values, assumption: A.assumption } }, u("resolved", d.value), !0) : !1;
    }
    async function y() {
      const b = ++c, A = n.food?.key;
      i.value = !0, r.value = "", d.value = null, u("resolved", null);
      try {
        const _ = await nt("food-estimate", { foodId: A, recipe: m.value.trim() });
        if (b !== c) return;
        d.value = _;
        try {
          Ee.setItem("weiheng.food-estimate." + A, JSON.stringify({ ..._, recipe: m.value }));
        } catch {
          r.value = "估算已返回，但本机缓存保存失败。";
        }
        u("resolved", _);
      } catch (_) {
        b === c && (r.value = _.message);
      } finally {
        b === c && (i.value = !1);
      }
    }
    ce(() => n.food?.key, () => {
      c++, m.value = "", r.value = "", i.value = !1, d.value = null, n.food && v(n.food);
    }, { immediate: !0 }), Ye(() => {
      c++;
    });
    const w = (b, A) => Ct(b, A), h = () => Object.values(d.value?.estimate?.values || {}).some((b) => b && typeof b.value != "number" && typeof b.low == "number" && typeof b.high == "number");
    return (b, A) => (s(), a("section", Ao, [
      e("h3", null, l(d.value ? "AI 估算参考" : "AI 营养估算"), 1),
      d.value?.estimate ? (s(), a("p", So, [...A[1] || (A[1] = [
        e("strong", null, "每100克可食部 · AI单值参考，不是数据库值", -1)
      ])])) : (s(), a("p", Co, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (s(), a("p", Io, "正在估算…")) : S("", !0),
      d.value?.estimate ? (s(), a("div", Eo, [
        e("div", xo, [
          (s(!0), a(B, null, G(f(Me).filter((_) => w(d.value.estimate.values[_.id], _.unit) !== null), (_) => (s(), a("div", {
            key: _.id
          }, [
            e("span", null, l(_.name), 1),
            e("strong", null, [
              T(l(w(d.value.estimate.values[_.id], _.unit)) + " ", 1),
              e("small", null, l(_.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, l(h() ? "旧估算范围按上下限中点换为单值参考；" : "") + l(d.value.estimate.assumption), 1),
        d.value.cached ? (s(), a("small", Uo, "已保存的预估 · " + l(f(Ze)(d.value.model || d.value.requestedModel)) + " · " + l(d.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : S("", !0),
        A[2] || (A[2] = e("small", null, "按常见品种与做法给出单一参考值。实际配方、用油和份量会造成误差；维生素和矿物质仍显示未知。", -1))
      ])) : S("", !0),
      r.value ? (s(), a("p", jo, l(r.value), 1)) : S("", !0),
      e("details", Do, [
        e("summary", null, l(d.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", No, [
          A[3] || (A[3] = T("原料与做法", -1)),
          ne(e("textarea", {
            "onUpdate:modelValue": A[0] || (A[0] = (_) => m.value = _),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [pe, m.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: y
        }, l(i.value ? "估算中…" : r.value ? "重试估算" : d.value ? "按补充内容重新估算" : "生成估算"), 9, Po)
      ])
    ]));
  }
};
function Mo(t) {
  const o = String(t?.name || ""), n = String(t?.state || ""), u = (i, r) => ({ label: `${i} · 估算${r}克`, grams: r });
  return /米饭/.test(o) && !/生|干/.test(n) ? [u("小碗", 100), u("中碗", 150), u("大碗", 200)] : /鸡蛋/.test(o) && !/粉|液|鸭|鹅/.test(o) ? [u("1个去壳", 50)] : /香蕉/.test(o) ? [u("1根去皮", 100)] : /苹果/.test(o) ? [u("小个去核", 150), u("中个去核", 200)] : /牛奶|酸奶/.test(o) && !/粉|干酪|奶油/.test(o) ? [u("小杯（按重量）", 200), u("一份（按重量）", 250)] : [];
}
const Ro = {
  key: 0,
  class: "vb-portion-presets"
}, zo = ["onClick"], Jn = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = J(() => Mo(n.food));
    return (r, d) => i.value.length ? (s(), a("div", Ro, [
      d[0] || (d[0] = e("span", null, "份量参考", -1)),
      (s(!0), a(B, null, G(i.value, (m) => (s(), a("button", {
        key: m.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (c) => u("choose", m.grams)
      }, l(m.label), 9, zo))), 128)),
      d[1] || (d[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : S("", !0);
  }
}, Oo = ["src", "alt", "loading"], Fo = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, on = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(!1);
    return ce(() => n.photo?.image, () => i.value = !1), (r, d) => (s(), a("div", {
      class: he(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (s(), a("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: d[0] || (d[0] = (m) => {
          i.value = !0, u("image-error");
        })
      }, null, 40, Oo)) : (s(), a("div", Fo, [
        N(F, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, l(f(Vn)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, l(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (s(), a("span", {
        key: 2,
        class: he({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, l(t.photo.imageLabel || "食物照片"), 3)) : S("", !0)
    ], 2));
  }
}), Bo = ["aria-label"], Lo = ["aria-label"], qo = { class: "vb-feature-dialog-body" }, vt = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: o }) {
    const n = o, u = P(null), i = document.activeElement;
    xt(() => Te(() => u.value?.focus())), Ye(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function r(d) {
      if (d.key === "Escape" && (d.preventDefault(), n("close")), d.key !== "Tab") return;
      const m = [...u.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((y) => y.getClientRects().length);
      if (!m.length) {
        d.preventDefault();
        return;
      }
      const c = m[0], v = m.at(-1);
      d.shiftKey && (document.activeElement === c || document.activeElement === u.value) ? (d.preventDefault(), v.focus()) : !d.shiftKey && document.activeElement === v && (d.preventDefault(), c.focus());
    }
    return (d, m) => (s(), a("div", {
      class: "vb-feature-overlay",
      onClick: m[1] || (m[1] = qe((c) => d.$emit("close"), ["self"]))
    }, [
      e("section", {
        ref_key: "panel",
        ref: u,
        class: he(["vb-feature-dialog", { "is-wide": t.wide }]),
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
            onClick: m[0] || (m[0] = (c) => d.$emit("close"))
          }, [
            N(F, { name: "close" })
          ], 8, Lo)
        ]),
        e("div", qo, [
          ls(d.$slots, "default")
        ])
      ], 42, Bo)
    ]));
  }
}, Vo = { class: "vb-food-detail-top" }, Go = { class: "vb-eyebrow" }, Jo = { class: "vb-food-state" }, Ho = { class: "vb-pill" }, Wo = {
  key: 0,
  class: "vb-field"
}, Ko = ["value"], Yo = ["value"], Xo = {
  key: 0,
  class: "vb-intake-more"
}, Qo = {
  key: 1,
  class: "vb-feature-error"
}, Zo = { class: "vb-portion-controls" }, ea = ["max"], ta = ["value"], na = { class: "vb-portion-macros" }, sa = { key: 0 }, oa = { key: 0 }, aa = ["disabled"], la = { class: "vb-food-all-nutrients" }, ia = { class: "vb-nutrient-table" }, ra = { class: "vb-nutrient-table-head" }, ua = { key: 0 }, da = ["href"], ca = { key: 1 }, va = { key: 2 }, ma = ["href"], pa = ["href"], ba = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(n.foodId), r = P(100), d = P(Se()), m = P("unspecified"), c = P(null);
    ce(() => n.foodId, (z) => {
      i.value = z;
    }), ce(i, () => {
      c.value = null;
    });
    const v = J(() => ae[i.value]), y = P("");
    async function w() {
      const z = i.value;
      y.value = "";
      try {
        await Ve(z);
      } catch (E) {
        i.value === z && (y.value = E.message);
      }
    }
    ce(i, w, { immediate: !0 });
    const h = J(() => wo(ae[n.foodId])), b = J(() => Me.some((z) => typeof v.value?.nutrients?.[z.id] != "number")), A = J(() => v.value?.__summary ? null : Ut(v.value, b.value ? c.value : null)), _ = J(() => St([{ foodId: v.value.key, grams: Number(r.value), nutritionSnapshot: A.value }]).totals), k = J(() => !v.value?.__summary && Number(r.value) >= 0.1 && Number(r.value) <= 5e3 && d.value && d.value <= Se()), { photo: C, loading: M, failed: X } = Gn(() => v.value), Y = J(() => v.value?.imageCredit || C.value?.imageCredit || C.value);
    function O() {
      k.value && u("add", { foodId: v.value.key, grams: Number(r.value), date: d.value, meal: m.value, nutritionSnapshot: A.value });
    }
    return (z, E) => v.value ? (s(), me(vt, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: E[6] || (E[6] = (R) => z.$emit("close"))
    }, {
      default: ct(() => [
        e("div", Vo, [
          e("figure", null, [
            N(on, {
              food: v.value,
              photo: f(C),
              loading: f(M),
              failed: f(X),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", Go, l(v.value.categoryName), 1),
            e("h1", null, l(f(Vn)(v.value.key) || f(Dt)(v.value)), 1),
            e("p", Jo, l(f(sn)(v.value)), 1),
            e("span", Ho, l(v.value.source ? "数据库" : c.value ? "AI估算" : "数据不完整"), 1),
            h.value.length ? (s(), a("label", Wo, [
              E[7] || (E[7] = T("选择营养样本", -1)),
              ne(e("select", {
                "onUpdate:modelValue": E[0] || (E[0] = (R) => i.value = R),
                "aria-label": "选择营养样本"
              }, [
                h.value.some((R) => R.id === n.foodId) ? S("", !0) : (s(), a("option", {
                  key: 0,
                  value: n.foodId
                }, "当前食物 · " + l(f(ae)[n.foodId]?.source ? "数据库" : "通用估算"), 9, Ko)),
                (s(!0), a(B, null, G(h.value, (R) => (s(), a("option", {
                  key: R.id,
                  value: R.id
                }, l(R.label), 9, Yo))), 128))
              ], 512), [
                [De, i.value]
              ]),
              E[8] || (E[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : S("", !0)
          ])
        ]),
        b.value && !v.value.__summary ? (s(), a("details", Xo, [
          E[9] || (E[9] = e("summary", null, "查看估算依据与调整", -1)),
          N(To, {
            food: v.value,
            onResolved: E[1] || (E[1] = (R) => c.value = R)
          }, null, 8, ["food"])
        ])) : S("", !0),
        y.value ? (s(), a("p", Qo, [
          T(l(y.value) + " ", 1),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: w
          }, "重试")
        ])) : S("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: qe(O, ["prevent"])
        }, [
          N(Jn, {
            food: v.value,
            onChoose: E[2] || (E[2] = (R) => r.value = R)
          }, null, 8, ["food"]),
          e("div", Zo, [
            e("label", null, [
              E[10] || (E[10] = T("可食部重量", -1)),
              ne(e("input", {
                "onUpdate:modelValue": E[3] || (E[3] = (R) => r.value = R),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [pe, r.value]
              ]),
              E[11] || (E[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              E[12] || (E[12] = T("记录日期", -1)),
              ne(e("input", {
                "onUpdate:modelValue": E[4] || (E[4] = (R) => d.value = R),
                type: "date",
                max: f(Se)(),
                required: ""
              }, null, 8, ea), [
                [pe, d.value]
              ])
            ]),
            e("label", null, [
              E[13] || (E[13] = T("餐次", -1)),
              ne(e("select", {
                "onUpdate:modelValue": E[5] || (E[5] = (R) => m.value = R)
              }, [
                (s(!0), a(B, null, G(f(kt), ([R, ee]) => (s(), a("option", {
                  key: R,
                  value: R
                }, l(ee), 9, ta))), 128))
              ], 512), [
                [De, m.value]
              ])
            ])
          ]),
          e("div", na, [
            (s(!0), a(B, null, G(f(Me), (R) => (s(), a("div", {
              key: R.id
            }, [
              e("span", null, l(R.id === "carbs" ? "碳水" : R.name), 1),
              e("strong", null, [
                T(l(f(cn)(_.value[R.id])) + " ", 1),
                _.value[R.id].value != null || _.value[R.id].range ? (s(), a("small", sa, l(R.unit), 1)) : S("", !0)
              ]),
              _.value[R.id].range ? (s(), a("small", oa, "AI估算")) : S("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !k.value
          }, [
            N(F, {
              name: "plus",
              size: 16
            }),
            E[14] || (E[14] = T("添加记录", -1))
          ], 8, aa),
          E[15] || (E[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", la, [
          E[20] || (E[20] = e("summary", null, "查看完整营养与依据", -1)),
          E[21] || (E[21] = e("p", null, "每100克可食部；未知值不按0计算。AI单值为参考估算，不是实测值；旧估算范围按上下限中点换算。", -1)),
          e("div", ia, [
            e("div", ra, [
              E[16] || (E[16] = e("span", null, "营养指标", -1)),
              E[17] || (E[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + l(r.value) + " 克", 1)
            ]),
            (s(!0), a(B, null, G(f(vs), (R) => (s(), a("div", {
              key: R.id
            }, [
              e("span", null, l(R.name), 1),
              e("span", null, l(f(Le)(v.value.nutrients[R.id])) + " " + l(v.value.nutrients[R.id] != null ? R.unit : ""), 1),
              e("span", null, l(f(cn)(_.value[R.id])) + " " + l(_.value[R.id].value != null || _.value[R.id].range ? R.unit : "") + l(_.value[R.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + l(v.value.name), 1),
          v.value.source ? (s(), a("p", ua, [
            e("a", {
              href: v.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, l(v.value.source.name), 9, da),
            T(" · " + l(v.value.source.id) + " · " + l(v.value.source.license), 1),
            E[18] || (E[18] = e("br", null, null, -1)),
            T(l(v.value.source.description), 1)
          ])) : (s(), a("p", ca, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          E[22] || (E[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          Y.value ? (s(), a("p", va, [
            E[19] || (E[19] = T("图片：", -1)),
            e("a", {
              href: Y.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, l(Y.value.title), 9, ma),
            T(" / " + l(Y.value.author) + " · ", 1),
            e("a", {
              href: Y.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, l(Y.value.license), 9, pa),
            T(" · " + l(Y.value.modifications), 1)
          ])) : S("", !0)
        ])
      ]),
      _: 1
    })) : S("", !0);
  }
}, fa = { class: "vb-report-heading" }, ga = { class: "vb-small-label" }, ha = { class: "vb-pill" }, ya = { key: 0 }, ka = ["disabled"], wa = {
  key: 1,
  class: "vb-inline-warning"
}, $a = {
  key: 2,
  class: "vb-inline-warning"
}, _a = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, Aa = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, Sa = ["disabled"], Ca = {
  key: 5,
  class: "vb-feature-error"
}, Ia = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, Ea = { class: "vb-report-estimation-heading" }, xa = { class: "vb-pill" }, Ua = {
  key: 0,
  class: "vb-report-estimation-list"
}, ja = { class: "vb-report-estimation-values" }, Da = {
  key: 1,
  class: "vb-intake-more"
}, Na = { class: "vb-report-comparison" }, Pa = { key: 0 }, Ta = { key: 1 }, Ma = { key: 2 }, Ra = { key: 3 }, za = { key: 4 }, Oa = { key: 5 }, Fa = { key: 6 }, Ba = { key: 7 }, La = {
  key: 7,
  class: "vb-report-content"
}, qa = { class: "vb-report-summary" }, Va = { class: "vb-inline-warning" }, Ga = {
  key: 8,
  class: "vb-intake-more"
}, Ja = { class: "vb-report-meta" }, Ha = { key: 0 }, Wa = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const o = t, n = J(() => o.report?.calculation?.targets || Un(o.report?.snapshot?.profile)), u = J(() => {
      const h = o.report?.snapshot, b = o.report?.calculation?.estimation?.foods || [];
      if (!h || !b.length) return h?.intake;
      const A = Xt(h.entries || [], b, { model: o.report?.model, generatedAt: o.report?.generatedAt });
      return St(A);
    }), i = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], r = (h) => h ? new Date(h).toLocaleString("zh-CN", { hour12: !1 }) : "", d = J(() => (o.report?.snapshot?.entries || []).flatMap((h) => {
      const b = h.referenceConfirmed === !1 ? null : ae[h.foodId], A = Me.filter((_) => {
        const k = Yt(h, b, _.id);
        return typeof k.value != "number" && !k.range;
      }).map((_) => _.id);
      return A.length ? [{ name: h.name, grams: h.grams, missing: A }] : [];
    })), m = J(() => o.report?.calculation?.estimation?.missingFoodCount ?? d.value.length), c = J(() => o.report?.calculation?.estimation?.foods || []), v = (h) => (h > 0 ? "+" : h < 0 ? "−" : "") + Le(Math.abs(h)), y = (h) => v(ms(h)), w = (h) => `${Object.values(h?.values || {}).some((A) => A && typeof A.value != "number" && typeof A.low == "number" && typeof A.high == "number") ? "旧估算范围按上下限中点换为单值参考；" : ""}${h?.assumption || ""}`;
    return (h, b) => (s(), me(vt, {
      title: "AI 营养分析",
      wide: "",
      onClose: b[4] || (b[4] = (A) => h.$emit("close"))
    }, {
      default: ct(() => [
        e("div", fa, [
          e("div", null, [
            e("span", ga, l(t.report?.date || t.record?.date), 1),
            b[5] || (b[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", ha, l(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        b[18] || (b[18] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (s(), a("section", ya, [
          b[6] || (b[6] = e("p", null, "分析时向维衡 AI发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: b[0] || (b[0] = (A) => h.$emit("retry"))
          }, "开始AI分析", 8, ka)
        ])) : S("", !0),
        t.stale ? (s(), a("p", wa, [
          b[7] || (b[7] = T("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (s(), a("button", {
            key: 0,
            class: "vb-text-button",
            onClick: b[1] || (b[1] = (A) => h.$emit("retry"))
          }, "重新分析")) : S("", !0)
        ])) : S("", !0),
        t.record ? S("", !0) : (s(), a("p", $a, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (s(), a("div", _a, [
          b[9] || (b[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            b[8] || (b[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, l(m.value ? "同时自动估算 " + m.value + " 项食物的缺失指标。" : "程序已计算营养汇总，维衡 AI 正在生成解释与建议。"), 1)
          ])
        ])) : S("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (s(), a("div", Aa, [
          b[10] || (b[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, l(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: b[2] || (b[2] = (A) => h.$emit("retry"))
          }, "重新分析", 8, Sa)
        ])) : S("", !0),
        t.report?.persistenceFailed ? (s(), a("p", Ca, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : S("", !0),
        t.report?.snapshot ? (s(), a(B, { key: 6 }, [
          b[14] || (b[14] = e("h3", { class: "vb-report-section-title" }, "本次摄入汇总", -1)),
          N(Zt, {
            summary: u.value || t.report.snapshot.intake,
            targets: n.value,
            estimating: t.report.status === "pending",
            details: ""
          }, null, 8, ["summary", "targets", "estimating"]),
          m.value ? (s(), a("section", Ia, [
            e("div", Ea, [
              e("div", null, [
                e("h3", null, l(m.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${m.value} 项）`), 1),
                b[11] || (b[11] = e("p", null, "缺少数据库数据的食物会按识别名称和确认克数估算，并计入上方合计；维生素和矿物质仍以可靠数据为准。", -1))
              ]),
              e("span", xa, l(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            b[12] || (b[12] = e("p", { class: "vb-data-note" }, "缺失数据按常见品种与做法给出AI单值参考，不是数据库值或检测结果；旧估算范围按上下限中点换算。", -1)),
            c.value.length ? (s(), a("ul", Ua, [
              (s(!0), a(B, null, G(c.value, (A) => (s(), a("li", {
                key: A.entryId
              }, [
                e("div", null, [
                  e("strong", null, l(A.name) + " · " + l(f(Le)(A.grams)) + " 克", 1),
                  e("small", null, l(w(A)), 1)
                ]),
                e("div", ja, [
                  (s(!0), a(B, null, G(f(Me).filter((_) => f(Ct)(A.values[_.id], _.unit) !== null), (_) => (s(), a("span", {
                    key: _.id
                  }, l(_.id === "carbs" ? "碳水" : _.name) + " " + l(f(Le)(f(Ct)(A.values[_.id], _.unit))) + " " + l(_.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : S("", !0)
          ])) : S("", !0),
          t.report.calculation?.comparison ? (s(), a("details", Da, [
            b[13] || (b[13] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", Na, [
              (s(!0), a(B, null, G(t.report.calculation.comparison, (A) => (s(), a("div", {
                key: A.id
              }, [
                e("span", null, l(A.id === "carbs" ? "碳水" : A.name), 1),
                A.estimatedRange?.delta ? (s(), a("strong", Pa, " AI 估算参考差值：" + l(y(A.estimatedRange.delta)) + " " + l(A.unit), 1)) : A.delta !== null ? (s(), a("strong", Ta, l(A.delta > 0 ? "+" : "") + l(f(Le)(A.delta)) + " " + l(A.unit), 1)) : (s(), a("strong", Ma, l(A.estimatedRange || A.complete && A.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                A.estimatedRange?.delta ? (s(), a("small", Ra, "按数据库已知值与 AI 单值估算计算；旧范围按中点换算。记录未必覆盖全天，不代表达标或不足。")) : A.estimatedRange && !A.estimatedRange.delta ? (s(), a("small", za, "含AI单值估算，暂无适用个人目标。")) : A.delta !== null ? (s(), a("small", Oa, "记录合计减去全天目标，记录未必覆盖全天。")) : A.complete && A.target === null ? (s(), a("small", Fa, "请完善个人营养档案后再查看与目标的差值。")) : (s(), a("small", Ba, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : S("", !0)
        ], 64)) : S("", !0),
        t.report?.result ? (s(), a("div", La, [
          b[15] || (b[15] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", qa, l(t.report.result.summary), 1),
          (s(), a(B, null, G(i, ([A, _]) => e("section", { key: A }, [
            t.report.result[A]?.length ? (s(), a(B, { key: 0 }, [
              e("h3", null, l(_), 1),
              e("ul", null, [
                (s(!0), a(B, null, G(t.report.result[A], (k, C) => (s(), a("li", { key: C }, l(k), 1))), 128))
              ])
            ], 64)) : S("", !0)
          ])), 64)),
          e("p", Va, "分析范围：" + l(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : S("", !0),
        t.report ? (s(), a("details", Ga, [
          b[17] || (b[17] = e("summary", null, "查看分析信息", -1)),
          e("div", Ja, [
            e("span", null, "生成时间：" + l(r(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (s(), a("span", Ha, "由 " + l(f(Ze)(t.report.model)) + " 生成", 1)) : S("", !0),
            e("span", null, "数据版本：" + l(t.report.dataVersion), 1),
            e("span", null, "食物库：" + l(t.report.snapshot?.intake?.dataVersion), 1),
            b[16] || (b[16] = e("small", null, "报告、照片保存在本机浏览器。清理站点数据后无法恢复。", -1))
          ])
        ])) : S("", !0),
        t.report?.status === "complete" && t.record ? (s(), a("button", {
          key: 9,
          type: "button",
          class: "vb-button vb-button-quiet",
          onClick: b[3] || (b[3] = (A) => h.$emit("retry"))
        }, l(t.stale ? "用最新记录重新分析" : "重新分析这一天"), 1)) : S("", !0)
      ]),
      _: 1
    }));
  }
};
function Wt(t) {
  const o = String(t || "");
  return /^(?:好的[，,\s]*)?pdf(?:格式)?[。.!！]?$/i.test(o.trim()) ? "pdf" : /^(?:好的[，,\s]*)?(?:word|docx)(?:格式)?[。.!！]?$/i.test(o.trim()) ? "docx" : !/(生成|导出|下载|保存|制作|整理|做成|转换|转成|给我|发我|用|格式|create|generate|export|download|save|make|convert)/i.test(o) || /^(什么是|如何|怎么|为什么|what\b|how\b|why\b)/i.test(o.trim()) ? null : [["pdf", /pdf/i], ["docx", /word|docx|\.doc\b/i], ["png", /png|长图|图片文档|图片格式|(?:导出|保存).{0,8}图片/i]].map(([u, i]) => ({ format: u, index: o.search(i) })).filter((u) => u.index >= 0).sort((u, i) => u.index - i.index)[0]?.format || null;
}
function Ka(t) {
  const o = String(t || "").trim(), n = /^\s*#{1,6}\s+\S/m.exec(o);
  if (!n || !n.index) return o;
  const u = o.slice(0, n.index), i = u.split(`
`).map((m) => m.trim()).filter((m) => m && !/^[-*_]{3,}$/.test(m)), r = /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i, d = /(身高|体重|年龄|孕期|哺乳|过敏|疾病|营养|能量|热量|kcal|蛋白|用药)/i;
  return r.test(u) && i.every((m) => /(PDF|Word|文件|附件|导出|下载|复制|格式)/i.test(m) && !d.test(m)) ? o.slice(n.index).trim() : o;
}
function Ft(t) {
  const o = String(t || "").trim();
  return o.length < 400 && !/^\s*(?:#{1,6}\s|\|)/m.test(o) && /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i.test(o);
}
function Ya(t) {
  try {
    const o = new URL(t.trim());
    return ["https:", "http:"].includes(o.protocol) ? o.href : null;
  } catch {
    return null;
  }
}
function st(t) {
  const o = [], n = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let u = 0, i;
  for (; i = n.exec(t); ) {
    if (i.index > u && o.push(t.slice(u, i.index)), i[1] !== void 0) {
      const r = Ya(i[2]);
      o.push(r ? ye("a", { href: r, target: "_blank", rel: "noopener noreferrer" }, i[1]) : i[0]);
    } else i[3] !== void 0 ? o.push(ye("strong", null, i[3])) : o.push(ye("code", null, i[4]));
    u = n.lastIndex;
  }
  return u < t.length && o.push(t.slice(u)), o;
}
function yn(t) {
  return t.trim().replace(/^\||\|$/g, "").split("|").map((o) => o.trim());
}
function kn(t) {
  return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(t);
}
function Xa(t) {
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
      const v = [], y = r[2].trim().replace(/[^a-z0-9_-]/gi, "").slice(0, 30);
      for (u++; u < o.length && !o[u].trimStart().startsWith(r[1]); ) v.push(o[u++]);
      u < o.length && u++, n.push(ye("pre", null, ye("code", { class: y ? `language-${y}` : void 0 }, v.join(`
`))));
      continue;
    }
    const d = i.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (d) {
      n.push(ye(`h${d[1].length}`, null, st(d[2]))), u++;
      continue;
    }
    if (u + 1 < o.length && i.includes("|") && kn(o[u + 1])) {
      const v = yn(i), y = [];
      for (u += 2; u < o.length && o[u].trim() && o[u].includes("|"); ) y.push(yn(o[u++]));
      n.push(ye("div", { class: "vb-markdown-table-wrap" }, ye("table", null, [
        ye("thead", null, ye("tr", null, v.map((w) => ye("th", null, st(w))))),
        ye("tbody", null, y.map((w) => ye("tr", null, v.map((h, b) => ye("td", null, st(w[b] || ""))))))
      ])));
      continue;
    }
    const m = i.match(/^\s{0,3}(?:([-*+])|(\d+)\.)\s+(.+)$/);
    if (m) {
      const v = !!m[2], y = [];
      for (; u < o.length; ) {
        const w = o[u].match(/^\s{0,3}(?:([-*+])|(\d+)\.)\s+(.+)$/);
        if (!w || !!w[2] !== v) break;
        y.push(ye("li", null, st(w[3]))), u++;
      }
      n.push(ye(v ? "ol" : "ul", null, y));
      continue;
    }
    const c = [i];
    for (u++; u < o.length && o[u].trim() && !/^\s{0,3}(?:#{1,6}\s|[-*+]\s|\d+\.\s|```|~~~)/.test(o[u]) && !(u + 1 < o.length && o[u].includes("|") && kn(o[u + 1])); ) c.push(o[u++]);
    n.push(ye("p", null, st(c.join(`
`))));
  }
  return n;
}
const At = Qe({
  name: "SafeMarkdown",
  props: { content: { type: String, default: "" } },
  setup(t) {
    return () => ye("div", { class: "vb-safe-markdown" }, Xa(t.content));
  }
}), Qa = ["aria-busy"], Za = {
  class: "vb-chat-export-options",
  "aria-label": "下载计划"
}, el = ["href", "download", "title"], tl = ["disabled", "onClick"], nl = {
  key: 0,
  role: "status"
}, sl = {
  key: 1,
  role: "alert"
}, ol = { key: 2 }, al = {
  __name: "ChatMessageExport",
  props: { content: { type: String, required: !0 }, question: { type: String, default: "" }, auto: Boolean },
  emits: ["retry"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P({}), r = P(""), d = P(""), m = P("");
    let c = 0, v = !1, y = !1;
    const w = J(() => Wt(n.question)), h = J(() => r.value || w.value || "pdf"), b = J(() => ({ pdf: "PDF", docx: "Word", png: "图片" })[h.value]), A = J(() => i.value[h.value]), _ = J(() => Ka(n.content));
    function k() {
      for (const X of Object.values(i.value)) setTimeout(() => URL.revokeObjectURL(X.url), 3e4);
      i.value = {};
    }
    async function C(X = h.value) {
      if (d.value || i.value[X]) {
        i.value[X] && (r.value = X);
        return;
      }
      const Y = c, O = _.value, z = n.question;
      r.value = X, d.value = X, m.value = "";
      try {
        if (w.value && Ft(O)) throw new Error("尚未生成文档正文，请重新生成。");
        const { createChatExport: E, preparedChatDownload: R } = await import("./chatExport-BCM5BWUu.js");
        if (Y !== c) return;
        const ee = await E(X, O, { question: z });
        if (Y !== c) return;
        i.value = { ...i.value, [X]: R(ee) };
      } catch (E) {
        Y === c && (m.value = E instanceof Error ? E.message : "文件生成失败，请重试。");
      } finally {
        Y === c && (d.value = "");
      }
    }
    function M() {
      !v || !n.auto || !w.value || y || d.value || i.value[w.value] || m.value || (y = !0, requestAnimationFrame(() => setTimeout(() => {
        y = !1, v && n.auto && w.value && C(w.value);
      }, 0)));
    }
    return ce(() => [n.content, n.question], () => {
      c++, k(), r.value = "", d.value = "", m.value = "", M();
    }), ce(() => n.auto, M), xt(() => {
      v = !0, M();
    }), Ye(() => {
      v = !1, c++, k();
    }), (X, Y) => w.value ? (s(), a("div", {
      key: 0,
      class: "vb-chat-document",
      "aria-label": "计划正文与下载",
      "aria-busy": !!d.value
    }, [
      N(f(At), {
        class: "vb-chat-document-body",
        content: _.value
      }, null, 8, ["content"]),
      e("div", Za, [
        (s(), a(B, null, G([["pdf", "PDF"], ["docx", "Word"], ["png", "长图"]], ([O, z]) => (s(), a(B, { key: O }, [
          i.value[O] ? (s(), a("a", {
            key: 0,
            href: i.value[O].url,
            download: i.value[O].filename,
            title: i.value[O].filename
          }, l(O === "png" ? "保存长图" : "下载 " + z), 9, el)) : (s(), a("button", {
            key: 1,
            type: "button",
            disabled: !!d.value,
            onClick: (E) => C(O)
          }, l(d.value === O ? "正在生成…" : "生成 " + z), 9, tl))
        ], 64))), 64))
      ]),
      A.value ? (s(), a("small", nl, l(b.value) + " 文件已生成", 1)) : S("", !0),
      m.value ? (s(), a("div", sl, [
        e("p", null, l(m.value), 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: Y[0] || (Y[0] = (O) => f(Ft)(_.value) ? u("retry") : C())
        }, l(f(Ft)(_.value) ? "重新生成正文" : "重试生成文件"), 1)
      ])) : S("", !0),
      A.value?.pageCount ? (s(), a("small", ol, "内容较长，" + l(A.value.pageCount) + " 张图片已打包为 ZIP。", 1)) : S("", !0)
    ], 8, Qa)) : S("", !0);
  }
}, ll = /* @__PURE__ */ Mn(al, [["__scopeId", "data-v-3fcab6f8"]]);
function il({ viewport: t, isActive: o = () => !0, onChange: n = () => {
}, threshold: u = 64 }) {
  let i = !0;
  const r = () => o() && t() && t().clientHeight > 0, d = (y) => Math.max(0, y.scrollHeight - y.clientHeight - y.scrollTop);
  function m() {
    const y = t();
    n(!!(r() && d(y) > u));
  }
  function c(y = !1) {
    if (y && (i = !0), !r()) {
      n(!1);
      return;
    }
    const w = t();
    i && (w.scrollTop = Math.max(0, w.scrollHeight - w.clientHeight)), m();
  }
  function v() {
    r() && (i = d(t()) <= u, m());
  }
  return { layout: c, onScroll: v, jump: () => c(!0) };
}
function rl({ viewport: t, content: o, active: n, thread: u, messages: i }) {
  const r = P(!1), d = il({ viewport: () => t.value, isActive: () => n.value, onChange: (_) => r.value = _ });
  let m = !1, c = !1, v = !1, y, w;
  function h(_ = !1) {
    v = v || _, !(!m || c) && (c = !0, Te(() => {
      if (!m) {
        c = !1;
        return;
      }
      y = requestAnimationFrame(() => {
        if (y = void 0, c = !1, !m) return;
        const k = v;
        v = !1, d.layout(k);
      });
    }));
  }
  function b() {
    w?.disconnect(), t.value && w?.observe(t.value), o.value && w?.observe(o.value), h();
  }
  const A = () => h();
  return ce(i, () => h(), { deep: !0, flush: "post" }), ce([u, n], () => h(!0), { flush: "post" }), ce([t, o], b, { flush: "post" }), xt(() => {
    m = !0, typeof ResizeObserver < "u" && (w = new ResizeObserver(A)), b(), window.addEventListener("resize", A), h(!0);
  }), Ye(() => {
    m = !1, w?.disconnect(), y !== void 0 && cancelAnimationFrame(y), window.removeEventListener("resize", A);
  }), { showJump: r, onScroll: d.onScroll, onContentLoad: A, jumpToLatest: () => h(!0) };
}
function ul(t, o, n) {
  return t.push({ id: o, role: "assistant", content: "", status: "sending", createdAt: n }), t[t.length - 1];
}
function wn(t, o = {}, n = []) {
  const u = new Set(n), i = {};
  for (const r of new Set((t.threads || []).map((d) => d.date))) {
    const d = (t.threads || []).filter((y) => y.date === r).sort((y, w) => String(w.createdAt || "").localeCompare(String(y.createdAt || ""))), m = d.find((y) => y.id === o[r]), c = d.find((y) => y.id === t.activeByDate?.[r]), v = m && (m.messages?.length || u.has(m.id)) ? m : c?.messages?.length ? c : d.find((y) => y.messages?.length) || m || c || d[0];
    v && (i[r] = v.id);
  }
  return i;
}
const dl = 24e3, $n = 220;
function cl(t, o) {
  const n = Date.parse(t || o || "");
  return Number.isFinite(n) ? n : 0;
}
function _n(t) {
  const o = String(t || "").trim();
  return o.length > $n ? `${o.slice(0, $n)}…` : o;
}
function vl(t, o, n = !0) {
  if (!n || !Array.isArray(t)) return "";
  const u = [];
  for (const d of t) {
    if (!d || d.id === o || !Array.isArray(d.messages)) continue;
    const m = d.messages;
    for (let c = 0; c < m.length - 1; c++) {
      const v = m[c], y = m[c + 1];
      if (v?.role !== "user" || y?.role !== "assistant" || v.status !== "complete" || y.status !== "complete" || v.attachments?.length || y.attachments?.length) continue;
      const w = _n(v.content), h = _n(y.content);
      !w || !h || (u.push({
        date: typeof d.date == "string" ? d.date : "",
        time: cl(v.createdAt, d.createdAt),
        user: w,
        assistant: h
      }), c++);
    }
  }
  const i = u.sort((d, m) => d.time - m.time).slice(-50);
  let r = i.map((d) => `${d.date ? `日期 ${d.date}：` : ""}用户：${d.user}
助手：${d.assistant}`).join(`

`);
  for (; r.length > dl && i.length; )
    i.shift(), r = i.map((d) => `${d.date ? `日期 ${d.date}：` : ""}用户：${d.user}
助手：${d.assistant}`).join(`

`);
  return r;
}
function ml(t) {
  if (!t || typeof t != "object" || Array.isArray(t) || ut(t)) return null;
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
const pl = 3, bl = 24e3, An = 6e4, fl = 8e5, gl = 6, hl = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function Hn(t) {
  const o = String(t.name || "").split(".").pop().toLowerCase(), n = ["jpg", "jpeg", "png", "webp"].includes(o) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(o) ? "document" : null;
  if (!n) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (n === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(n === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return n;
}
function yl(t) {
  const o = String(t).replace(/\u0000/g, "").trim();
  if (!o) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (o.length > bl) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return o;
}
let ot;
function kl() {
  return ot || (ot = new Promise((t, o) => {
    if (!globalThis.indexedDB) {
      o(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const n = indexedDB.open(dt("weiheng.chat-attachments.v1"), 1);
    n.onupgradeneeded = () => n.result.createObjectStore("attachments", { keyPath: "id" }), n.onsuccess = () => {
      const u = n.result;
      u.onversionchange = () => {
        u.close(), ot = void 0;
      }, t(u);
    }, n.onerror = n.onblocked = () => o(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw ot = void 0, t;
  })), ot;
}
async function an(t, o) {
  const n = await kl();
  if (t === "readwrite" && Xe()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((u, i) => {
    const r = n.transaction("attachments", t), d = o(r.objectStore("attachments"));
    r.oncomplete = () => u(d.result), r.onerror = r.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const wl = (t) => an("readwrite", (o) => o.put(t)), Bt = (t) => an("readonly", (o) => o.get(t)), yt = (t) => an("readwrite", (o) => o.delete(t));
function $l(t) {
  return new Promise((o, n) => {
    const u = new FileReader();
    u.onload = () => o(String(u.result)), u.onerror = () => n(new Error("照片读取失败，请重新选择。")), u.readAsDataURL(t);
  });
}
async function _l(t) {
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
      const d = await new Promise((c, v) => n.toBlob((y) => y ? c(y) : v(new Error("照片压缩失败。")), "image/jpeg", r)), m = await $l(d);
      if (m.length <= fl) return m;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    o.close();
  }
}
async function Al(t) {
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
async function Sl(t) {
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
async function Cl(t, o) {
  const n = Hn(t), u = { id: o, kind: n, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (n === "image") return { ...u, mimeType: "image/jpeg", dataUrl: await _l(t) };
  const i = t.name.split(".").pop()?.toLowerCase();
  let r;
  try {
    if (i === "pdf") r = await Al(t);
    else if (i === "docx") r = await Sl(t);
    else {
      const d = new Uint8Array(await t.arrayBuffer());
      r = new TextDecoder().decode(d), r.includes("�") && (r = new TextDecoder("gb18030").decode(d));
    }
  } catch (d) {
    throw new Error(d instanceof Error && /[\u4e00-\u9fff]/.test(d.message) ? d.message : "文件无法读取，请确认文件完整，或另存为 TXT 后重试。");
  }
  return { ...u, text: yl(r) };
}
const Il = {
  class: "vb-chat-page vb-simple-chat",
  "aria-label": "维衡AI助手对话"
}, El = { class: "vb-simple-header" }, xl = { class: "vb-simple-actions" }, Ul = { class: "vb-simple-date" }, jl = ["max", "disabled"], Dl = { class: "vb-simple-options" }, Nl = { "aria-label": "对话选项" }, Pl = { class: "vb-simple-options-panel" }, Tl = {
  key: 0,
  class: "vb-simple-history"
}, Ml = ["value", "disabled"], Rl = ["value"], zl = ["value"], Ol = { class: "vb-memory-toggle" }, Fl = ["disabled"], Bl = { class: "vb-simple-starters" }, Ll = ["onClick"], ql = { class: "vb-simple-context" }, Vl = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, Gl = { class: "vb-simple-message-body" }, Jl = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, Hl = ["aria-label", "onClick"], Wl = ["src", "alt"], Kl = {
  key: 1,
  class: "vb-simple-loading"
}, Yl = {
  key: 2,
  class: "vb-simple-text"
}, Xl = {
  class: "vb-simple-error",
  role: "alert"
}, Ql = ["onClick"], Zl = {
  key: 4,
  class: "vb-simple-text"
}, ei = {
  key: 7,
  class: "vb-chat-search-status",
  role: "status"
}, ti = {
  key: 8,
  class: "vb-chat-search-warning"
}, ni = {
  key: 9,
  class: "vb-chat-sources"
}, si = ["href"], oi = {
  key: 10,
  class: "vb-chat-sources"
}, ai = ["href"], li = { key: 0 }, ii = {
  key: 11,
  class: "vb-simple-message-meta"
}, ri = { class: "vb-simple-composer" }, ui = { class: "vb-simple-composer-inner" }, di = {
  key: 0,
  class: "vb-simple-tools"
}, ci = { class: "vb-simple-quick" }, vi = { class: "vb-simple-quick-panel" }, mi = ["onClick"], pi = {
  key: 0,
  class: "vb-simple-status",
  role: "status"
}, bi = ["accept"], fi = {
  key: 0,
  class: "vb-chat-draft-attachments",
  "aria-label": "待发送附件"
}, gi = ["disabled", "aria-label", "onClick"], hi = ["src", "alt"], yi = {
  key: 0,
  role: "status"
}, ki = {
  key: 1,
  role: "alert"
}, wi = { key: 2 }, $i = ["aria-label", "onClick"], _i = { class: "vb-simple-editor-bottom" }, Ai = { class: "vb-chat-input-tools" }, Si = {
  class: "vb-chat-search-toggle",
  title: "开启后会用本条问题文字搜索网页；不会把档案、饮食记录或附件发送给搜索接口。"
}, Ci = ["disabled"], Ii = {
  key: 1,
  class: "vb-simple-notice",
  role: "alert"
}, Ei = ["role"], xi = { class: "vb-simple-footnote" }, Ui = { class: "vb-simple-privacy" }, ji = ["src", "alt"], Di = {
  key: 1,
  class: "vb-chat-text-preview"
}, Ni = { class: "vb-data-note" }, Sn = "weiheng.ai-diet-chat.v1", Pi = /* @__PURE__ */ Qe({
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
    function i(x) {
      return Array.isArray(x) ? x.flatMap(($) => {
        if (!$ || typeof $ != "object") return [];
        const g = $;
        try {
          const L = new URL(String(g.url || ""));
          return ["https:", "http:"].includes(L.protocol) ? [{
            title: typeof g.title == "string" ? g.title.slice(0, 180) : "网页来源",
            url: L.href,
            siteName: typeof g.siteName == "string" ? g.siteName.slice(0, 100) : void 0,
            date: typeof g.date == "string" ? g.date.slice(0, 40) : void 0
          }] : [];
        } catch {
          return [];
        }
      }).slice(0, 5) : [];
    }
    function r(x) {
      return Array.isArray(x) ? x.flatMap(($) => {
        if (!$ || typeof $ != "object") return [];
        const g = $;
        try {
          const L = new URL(String(g.url || ""));
          return L.protocol !== "https:" || typeof g.id != "string" || typeof g.title != "string" ? [] : [{
            id: g.id.slice(0, 80),
            title: g.title.slice(0, 180),
            version: typeof g.version == "string" ? g.version.slice(0, 100) : "",
            url: L.href,
            summary: typeof g.summary == "string" ? g.summary.slice(0, 1200) : "",
            kind: typeof g.kind == "string" ? g.kind.slice(0, 40) : "本地整理摘要"
          }];
        } catch {
          return [];
        }
      }).slice(0, 3) : [];
    }
    function d() {
      try {
        const x = JSON.parse(Ee.getItem(Sn) || "null");
        if (!x || typeof x != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0, webSearchEnabled: !1 };
        const $ = x, g = Array.isArray($.threads) ? $.threads.flatMap((te) => {
          if (!te || typeof te != "object") return [];
          const K = te;
          return typeof K.id != "string" || !Be(K.date) || !Array.isArray(K.messages) ? [] : [{
            id: K.id,
            date: K.date,
            createdAt: typeof K.createdAt == "string" ? K.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: K.messages.filter((ie) => !!(ie && typeof ie == "object" && ["user", "assistant"].includes(ie.role) && typeof ie.content == "string")).map((ie) => ({
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
        }) : [], L = $.activeByDate && typeof $.activeByDate == "object" ? Object.fromEntries(Object.entries($.activeByDate).filter(([te, K]) => Be(te) && typeof K == "string")) : {};
        return { threads: g.slice(-60), activeByDate: L, memoryEnabled: $.memoryEnabled !== !1, webSearchEnabled: $.webSearchEnabled === !0 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0, webSearchEnabled: !1 };
      }
    }
    const m = d(), c = P(m.threads), v = P(wn(m, m.activeByDate)), y = /* @__PURE__ */ new Set(), w = P(m.memoryEnabled), h = P(m.webSearchEnabled), b = P(Se());
    ce(() => o.initialDate, (x) => {
      x && Be(x) && x <= Se() && (b.value = x);
    });
    const A = P(""), _ = P(null), k = P([]), C = P({}), M = P(null), X = J(() => k.value.some((x) => x.status === "ready"));
    let Y = 0;
    const O = P(""), z = P(""), E = P(null), R = P(null), ee = J(() => c.value.some((x) => x.messages.some(($) => $.status === "sending"))), H = J(() => o.records.find((x) => x.date === b.value)), fe = J(() => H.value?.entries || []), le = J(() => ({
      energy: typeof o.targets?.tdee == "number" ? o.targets.tdee : null,
      protein: o.targets?.macros?.find((x) => x.id === "protein")?.grams ?? null,
      carbs: o.targets?.macros?.find((x) => x.id === "carbs")?.grams ?? null,
      fat: o.targets?.macros?.find((x) => x.id === "fat")?.grams ?? null
    })), ue = J(() => c.value.find((x) => x.id === v.value[b.value])), ve = J(() => ue.value?.messages || []), { showJump: $e, onScroll: _e, onContentLoad: Q, jumpToLatest: j } = rl({ viewport: E, content: R, active: J(() => o.active), thread: J(() => ue.value?.id), messages: ve }), p = J(() => c.value.filter((x) => x.messages.length).sort((x, $) => $.createdAt.localeCompare(x.createdAt)));
    function U(x) {
      const $ = x.target.value, g = c.value.find((L) => L.id === $);
      g && (b.value = g.date, v.value[g.date] = g.id);
    }
    function W(x) {
      const $ = ve.value, g = $.findIndex((L) => L.id === x);
      return $.slice(0, g).reverse().find((L) => L.role === "user")?.content || "";
    }
    function V(x) {
      const { id: $, kind: g, name: L, size: te, mimeType: K } = x;
      return { id: $, kind: g, name: L, size: te, mimeType: K };
    }
    function I(x) {
      return x >= 1024 * 1024 ? `${(x / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(x / 1024))} KB`;
    }
    async function D(x) {
      const $ = Y;
      z.value = "";
      for (const g of x) {
        if ($ !== Y) break;
        if (k.value.length >= pl) {
          z.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let L;
        try {
          L = Hn(g);
        } catch (K) {
          z.value = K instanceof Error ? K.message : "这个文件暂不支持。";
          continue;
        }
        const te = u();
        k.value.push({ id: te, kind: L, name: g.name.slice(0, 180), size: g.size, mimeType: g.type, status: "reading" });
        try {
          const K = await Cl(g, te);
          if (!k.value.some((ke) => ke.id === te)) continue;
          if (k.value.reduce((ke, Ae) => ke + (Ae.value?.text?.length || 0), K.text?.length || 0) > An) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await wl(K);
          const ge = k.value.find((ke) => ke.id === te);
          if (!ge) {
            await yt(te);
            continue;
          }
          C.value[te] = K, ge.value = K, ge.status = "ready";
        } catch (K) {
          const ie = k.value.find((ge) => ge.id === te);
          ie && (ie.status = "failed", ie.error = K instanceof Error ? K.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function oe(x) {
      const $ = x.target, g = Array.from($.files || []);
      $.value = "", D(g);
    }
    function re(x) {
      const $ = Array.from(x.clipboardData?.files || []).filter((g) => g.type.startsWith("image/"));
      $.length && (x.preventDefault(), D($));
    }
    function de(x) {
      x.dataTransfer?.types.includes("Files") && x.preventDefault();
    }
    function Re(x) {
      const $ = Array.from(x.dataTransfer?.files || []);
      $.length && (x.preventDefault(), D($));
    }
    function Ce(x) {
      k.value = k.value.filter(($) => $.id !== x), delete C.value[x], yt(x).catch(() => {
        z.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function et() {
      const x = k.value.flatMap((g) => g.status === "ready" && g.value ? [g.value] : []), $ = new Set(x.map((g) => g.id));
      return k.value = k.value.filter((g) => !$.has(g.id)), x;
    }
    async function mt(x) {
      try {
        const $ = C.value[x.id] || await Bt(x.id);
        if (!$) throw new Error("附件已不在本地存储中，请重新添加。");
        M.value = $;
      } catch ($) {
        z.value = $ instanceof Error ? $.message : "无法预览附件。";
      }
    }
    ce(() => ve.value.flatMap((x) => x.attachments || []).map((x) => x.id).join(","), async () => {
      for (const x of ve.value.flatMap(($) => $.attachments || []))
        if (!C.value[x.id])
          try {
            const $ = await Bt(x.id);
            $ && (C.value[x.id] = $);
          } catch {
          }
    }, { immediate: !0 });
    function pt(x) {
      const $ = { id: u(), date: x, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (c.value.push($), c.value.length > 60) {
        const g = c.value.splice(0, c.value.length - 60);
        bt(g.flatMap((L) => L.messages));
      }
      return v.value[x] = $.id, $;
    }
    function bt(x) {
      for (const $ of x.flatMap((g) => g.attachments || []))
        delete C.value[$.id], yt($.id).catch(() => {
          O.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function Z(x) {
      const $ = v.value[x];
      if ($ && c.value.some((L) => L.id === $)) return;
      const g = c.value.filter((L) => L.date === x).sort((L, te) => te.createdAt.localeCompare(L.createdAt))[0];
      g ? v.value[x] = g.id : pt(x);
    }
    Z(b.value), ce(b, (x) => {
      if (!Be(x) || x > Se()) {
        b.value = Se();
        return;
      }
      Z(x), z.value = "";
    });
    let q = !1, se = !1;
    function we() {
      if (ee.value) {
        se = !0;
        return;
      }
      se = !1, q = !0;
      const x = d();
      c.value = x.threads, v.value = wn(x, v.value, [...y]), w.value = x.memoryEnabled, h.value = x.webSearchEnabled, Z(b.value), Te(() => {
        q = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", we), Ye(() => window.removeEventListener("weiheng-chat-synced", we));
    let ze;
    function Je() {
      if (ze && clearTimeout(ze), ze = void 0, !Xe())
        try {
          Ee.setItem(Sn, JSON.stringify({ threads: c.value, activeByDate: v.value, memoryEnabled: w.value, webSearchEnabled: h.value })), O.value = "";
        } catch {
          O.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function Kn() {
      q || (ze && clearTimeout(ze), ze = setTimeout(Je, 160));
    }
    ce([c, v, w, h], Kn, { deep: !0 });
    function ft() {
      Je();
    }
    typeof window < "u" && (window.addEventListener("pagehide", ft), window.addEventListener("weiheng-chat-flush", ft)), Ye(() => {
      Je(), typeof window < "u" && (window.removeEventListener("pagehide", ft), window.removeEventListener("weiheng-chat-flush", ft));
    });
    let Ne;
    function Yn() {
      const x = Ne;
      x && (Ne = void 0, x.controller.abort(), x.assistantMessage.status === "sending" && (x.assistantMessage.status = "failed", x.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), Je());
    }
    function Xn(x) {
      const $ = new Date(x);
      return Number.isNaN($.getTime()) ? "新对话" : $.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function Qn(x) {
      const $ = new Date(x);
      return Number.isNaN($.getTime()) ? "" : $.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function Zn() {
      return fe.value.map((x) => ({
        foodId: x.foodId,
        name: x.name,
        grams: x.grams,
        meal: x.meal,
        referenceConfirmed: x.referenceConfirmed,
        source: x.source,
        nutritionSnapshot: x.nutritionSnapshot
      }));
    }
    async function es(x, $) {
      const g = x.slice(0, $).filter((ge) => ge.status === "complete"), L = [];
      for (const { role: ge, content: ke, attachments: Ae } of g) {
        const Pe = { role: ge, content: ke.slice(0, 1200), attachments: Ae };
        ge === "user" ? L.at(-1)?.role === "user" ? L[L.length - 1] = Pe : L.push(Pe) : L.at(-1)?.role === "user" && L.push(Pe);
      }
      for (; L[0]?.role !== "user"; ) L.shift();
      const te = L.slice(-11);
      for (; te.reduce((ge, ke) => ge + ke.content.length, 0) > 9e3; ) te.splice(0, 2);
      let K = 0, ie = 0;
      for (let ge = te.length - 1; ge >= 0; ge--) {
        const ke = te[ge], Ae = [];
        let Pe = !1;
        for (const gt of ke.attachments || []) {
          const Oe = C.value[gt.id] || await Bt(gt.id);
          if (!Oe) {
            if (ge === te.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Pe = !0;
            continue;
          }
          if (K + (Oe.text?.length || 0) > An || Oe.kind === "image" && ie >= gl) {
            Pe = !0;
            continue;
          }
          K += Oe.text?.length || 0, Oe.kind === "image" && ie++, Ae.push(Oe);
        }
        ke.attachments = Ae.length ? Ae : void 0, Pe && (ke.content = ke.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return te;
    }
    async function ln(x, $, g = []) {
      const L = x.trim() || (g.length ? "请帮我分析这些附件。" : "");
      if (!L || L.length > 1200) return !1;
      Yn(), Z(b.value);
      const te = ue.value;
      if (!te) return !1;
      let K, ie, ge = h.value;
      if ($) {
        ie = te.messages.findIndex((je) => je.id === $ && je.role === "assistant");
        const Fe = te.messages[ie - 1];
        if (ie < 1 || Fe?.role !== "user")
          return z.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        ge = Fe.webSearch !== !1, K = te.messages[ie], K.status = "sending", K.error = void 0, K.content = "", K.webSearchWarning = void 0, K.webSources = void 0, K.localSources = void 0, K.webSearchStatus = ge ? "正在联网搜索…" : "正在回复…";
      } else
        te.messages.push({ id: u(), role: "user", content: L, attachments: g.length ? g.map(V) : void 0, webSearch: ge, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), K = ul(te.messages, u(), (/* @__PURE__ */ new Date()).toISOString()), K.webSearchStatus = ge ? "正在联网搜索…" : "正在回复…", te.messages.length > 120 && bt(te.messages.splice(0, te.messages.length - 120)), ie = te.messages.length - 1;
      j(), Je(), z.value = "";
      const ke = new AbortController(), Ae = { controller: ke, assistantMessage: K };
      Ne = Ae;
      const Pe = b.value, gt = Zn(), Oe = le.value, os = ml(o.profile), as = vl(c.value, te.id, w.value);
      try {
        const Fe = await es(te.messages, ie);
        if (Ne !== Ae) return !1;
        if (Fe.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const je = await Bn("chat", {
          date: Pe,
          messages: Fe,
          entries: gt,
          targets: Oe,
          profile: os,
          memory: as,
          webSearch: ge
        }, (Ie) => {
          Ne === Ae && (Ie.type === "status" ? K.webSearchStatus = Ie.message : Ie.type === "delta" ? K.content += Ie.text : Ie.type === "done" && (typeof Ie.content == "string" && (K.content = Ie.content), K.model = Ie.model, K.context = Ie.contextSummary, K.createdAt = Ie.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), K.webSources = i(Ie.webSources), K.localSources = r(Ie.localSources), K.webSearchWarning = Ie.webSearchWarning, K.webSearchStatus = ""));
        }, ke.signal);
        if (Ne !== Ae) return !1;
        if (!K.content.trim() || typeof je.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return K.model = je.model, K.context = je.contextSummary, K.createdAt = je.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), K.webSources = i(je.webSources), K.localSources = r(je.localSources), K.webSearchWarning = je.webSearchWarning, K.webSearchStatus = "", K.status = "complete", Je(), As(), !0;
      } catch (Fe) {
        return Ne !== Ae || (K.status = "failed", K.error = Fe instanceof Error ? Fe.message : "AI 暂时无法回复，请重试。", K.webSearchStatus = "", Je()), !1;
      } finally {
        Ne === Ae && (Ne = void 0), se && !ee.value && we();
      }
    }
    function rn() {
      const x = A.value.trim();
      if (!x && !X.value || x.length > 1200) return;
      const $ = et();
      A.value = "", ln(x, void 0, $);
    }
    function un(x) {
      A.value = x, Te(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function ts(x) {
      x.key === "Enter" && !x.shiftKey && !x.isComposing && (x.preventDefault(), rn());
    }
    function dn(x) {
      const $ = ve.value.findIndex((L) => L.id === x), g = ve.value[$ - 1];
      $ > 0 && g?.role === "user" && ln(g.content, x);
    }
    function ns() {
      Y++, y.add(pt(b.value).id);
      for (const x of k.value) Ce(x.id);
      z.value = "";
    }
    function ss() {
      if (!window.confirm("清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。")) return;
      const x = c.value.flatMap(($) => $.messages.flatMap((g) => g.attachments || []));
      for (const $ of x)
        delete C.value[$.id], yt($.id).catch(() => {
          O.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      _s(), c.value = [], v.value = {}, O.value = "", Z(b.value), z.value = "当前空间的聊天记录已清除。";
    }
    return (x, $) => (s(), a("section", Il, [
      e("header", El, [
        $[16] || ($[16] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡AI助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", xl, [
          e("label", Ul, [
            N(F, {
              name: "calendar",
              size: 16
            }),
            $[10] || ($[10] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            ne(e("input", {
              "onUpdate:modelValue": $[0] || ($[0] = (g) => b.value = g),
              type: "date",
              max: f(Se)(),
              disabled: ee.value,
              "aria-label": "选择饮食日期"
            }, null, 8, jl), [
              [pe, b.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: ns
          }, [
            N(F, {
              name: "plus",
              size: 16
            }),
            $[11] || ($[11] = T("新对话", -1))
          ]),
          e("details", Dl, [
            e("summary", Nl, [
              $[12] || ($[12] = T("更多", -1)),
              N(F, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", Pl, [
              p.value.length ? (s(), a("label", Tl, [
                $[13] || ($[13] = T(" 历史对话 ", -1)),
                e("select", {
                  value: ue.value?.id,
                  disabled: ee.value,
                  "aria-label": "切换历史对话",
                  onChange: U
                }, [
                  ve.value.length ? S("", !0) : (s(), a("option", {
                    key: 0,
                    value: ue.value?.id
                  }, "当前新对话", 8, Rl)),
                  (s(!0), a(B, null, G(p.value, (g) => (s(), a("option", {
                    key: g.id,
                    value: g.id
                  }, l(g.date) + " · " + l(Xn(g.createdAt)) + " · " + l(g.messages.length) + " 条消息", 9, zl))), 128))
                ], 40, Ml)
              ])) : S("", !0),
              e("label", Ol, [
                ne(e("input", {
                  "onUpdate:modelValue": $[1] || ($[1] = (g) => w.value = g),
                  type: "checkbox"
                }, null, 512), [
                  [at, w.value]
                ]),
                $[14] || ($[14] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              $[15] || ($[15] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: ee.value,
                onClick: ss
              }, "清除本地记录", 8, Fl)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: E,
        class: he(["vb-simple-scroll", { "is-empty": !ve.value.length }]),
        onScrollPassive: $[2] || ($[2] = //@ts-ignore
        (...g) => f(_e) && f(_e)(...g)),
        onLoadCapture: $[3] || ($[3] = //@ts-ignore
        (...g) => f(Q) && f(Q)(...g)),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        ve.value.length ? (s(), a("div", {
          key: 1,
          ref_key: "conversationContent",
          ref: R,
          class: "vb-simple-thread"
        }, [
          (s(!0), a(B, null, G(ve.value, (g) => (s(), a("article", {
            key: g.id,
            class: he(["vb-simple-message", [`is-${g.role}`, `is-${g.status}`]])
          }, [
            g.role === "assistant" ? (s(), a("span", Vl, [
              N(F, {
                name: "sparkles",
                size: 18
              })
            ])) : S("", !0),
            e("div", Gl, [
              g.attachments?.length ? (s(), a("div", Jl, [
                (s(!0), a(B, null, G(g.attachments, (L) => (s(), a("button", {
                  key: L.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + L.name,
                  onClick: (te) => mt(L)
                }, [
                  L.kind === "image" && C.value[L.id]?.dataUrl ? (s(), a("img", {
                    key: 0,
                    src: C.value[L.id].dataUrl,
                    alt: L.name
                  }, null, 8, Wl)) : (s(), me(F, {
                    key: 1,
                    name: L.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, l(L.name), 1),
                    e("small", null, l(L.kind === "image" ? "照片" : "文件文字") + " · " + l(I(L.size)), 1)
                  ])
                ], 8, Hl))), 128))
              ])) : S("", !0),
              g.status === "sending" && !g.content ? (s(), a("div", Kl, [
                $[19] || ($[19] = e("span", { class: "vb-loading-ring" }, null, -1)),
                e("span", null, l(g.webSearchStatus || "正在回复…"), 1)
              ])) : g.status === "sending" ? (s(), a("div", Yl, [
                N(f(At), {
                  content: g.content
                }, null, 8, ["content"]),
                $[20] || ($[20] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : g.status === "failed" ? (s(), a(B, { key: 3 }, [
                g.content ? (s(), me(f(At), {
                  key: 0,
                  class: "vb-simple-text",
                  content: g.content
                }, null, 8, ["content"])) : S("", !0),
                e("p", Xl, l(g.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (L) => dn(g.id)
                }, [
                  N(F, {
                    name: "activity",
                    size: 14
                  }),
                  $[21] || ($[21] = T("重试这条问题", -1))
                ], 8, Ql)
              ], 64)) : g.role !== "assistant" ? (s(), a("p", Zl, l(g.content), 1)) : f(Wt)(W(g.id)) ? S("", !0) : (s(), me(f(At), {
                key: 5,
                class: "vb-simple-text",
                content: g.content
              }, null, 8, ["content"])),
              g.role === "assistant" && g.status === "complete" && g.content.trim() && f(Wt)(W(g.id)) ? (s(), me(ll, {
                key: 6,
                content: g.content,
                question: W(g.id),
                auto: ve.value.at(-1)?.id === g.id,
                onRetry: (L) => dn(g.id)
              }, null, 8, ["content", "question", "auto", "onRetry"])) : S("", !0),
              g.status === "sending" && g.content && g.webSearchStatus ? (s(), a("small", ei, l(g.webSearchStatus), 1)) : S("", !0),
              g.role === "assistant" && g.status === "complete" && g.webSearchWarning ? (s(), a("p", ti, l(g.webSearchWarning), 1)) : S("", !0),
              g.role === "assistant" && g.status === "complete" && g.localSources?.length ? (s(), a("details", ni, [
                e("summary", null, "本地参考依据 · " + l(g.localSources.length), 1),
                e("ol", null, [
                  (s(!0), a(B, null, G(g.localSources, (L, te) => (s(), a("li", {
                    key: L.id
                  }, [
                    e("a", {
                      href: L.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }, [
                      e("span", null, "[本地" + l(te + 1) + "]", 1),
                      T(" " + l(L.title), 1)
                    ], 8, si),
                    e("small", null, l(L.version) + " · " + l(L.kind) + "：" + l(L.summary), 1)
                  ]))), 128))
                ])
              ])) : S("", !0),
              g.role === "assistant" && g.status === "complete" && g.webSources?.length ? (s(), a("details", oi, [
                e("summary", null, "联网来源 · " + l(g.webSources.length), 1),
                e("ol", null, [
                  (s(!0), a(B, null, G(g.webSources, (L, te) => (s(), a("li", {
                    key: L.url
                  }, [
                    e("a", {
                      href: L.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }, [
                      e("span", null, "[" + l(te + 1) + "]", 1),
                      T(" " + l(L.title), 1)
                    ], 8, ai),
                    L.siteName || L.date ? (s(), a("small", li, l([L.siteName, L.date].filter(Boolean).join(" · ")), 1)) : S("", !0)
                  ]))), 128))
                ])
              ])) : S("", !0),
              g.status === "complete" ? (s(), a("small", ii, [
                T(l(Qn(g.createdAt)), 1),
                g.role === "assistant" ? (s(), a(B, { key: 0 }, [
                  T(" · " + l(f(Ze)(g.model)), 1)
                ], 64)) : S("", !0)
              ])) : S("", !0)
            ])
          ], 2))), 128))
        ], 512)) : (s(), a("div", {
          key: 0,
          ref_key: "conversationContent",
          ref: R,
          class: "vb-simple-welcome"
        }, [
          $[17] || ($[17] = e("h2", null, "今天想聊些什么？", -1)),
          $[18] || ($[18] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", Bl, [
            (s(), a(B, null, G(n, (g) => e("button", {
              key: g,
              type: "button",
              onClick: (L) => un(g)
            }, [
              e("span", null, l(g), 1),
              N(F, {
                name: "arrow",
                size: 16
              })
            ], 8, Ll)), 64))
          ]),
          e("small", ql, "饮食参考日期：" + l(b.value), 1)
        ], 512))
      ], 34),
      e("footer", ri, [
        f($e) ? (s(), a("button", {
          key: 0,
          type: "button",
          class: "vb-chat-jump-bottom",
          "aria-label": "回到最新消息",
          title: "一键到底",
          onClick: $[4] || ($[4] = //@ts-ignore
          (...g) => f(j) && f(j)(...g))
        }, [
          N(F, {
            name: "arrow",
            size: 20
          })
        ])) : S("", !0),
        e("div", ui, [
          ve.value.length ? (s(), a("div", di, [
            e("details", ci, [
              e("summary", null, [
                $[22] || ($[22] = T("快捷提问", -1)),
                N(F, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", vi, [
                (s(), a(B, null, G(n, (g) => e("button", {
                  key: g,
                  type: "button",
                  onClick: (L) => un(g)
                }, [
                  T(l(g), 1),
                  N(F, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, mi)), 64))
              ])
            ]),
            ee.value ? (s(), a("span", pi, "正在回复，发送新消息可打断")) : S("", !0)
          ])) : S("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: de,
            onDrop: Re
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: _,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: f(hl),
              "aria-label": "选择照片或文件",
              onChange: oe
            }, null, 40, bi),
            k.value.length ? (s(), a("div", fi, [
              (s(!0), a(B, null, G(k.value, (g) => (s(), a("div", {
                key: g.id,
                class: he(["vb-chat-file", { "is-failed": g.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: g.status !== "ready",
                  "aria-label": "预览附件：" + g.name,
                  onClick: (L) => mt(g)
                }, [
                  g.value?.dataUrl ? (s(), a("img", {
                    key: 0,
                    src: g.value.dataUrl,
                    alt: g.name
                  }, null, 8, hi)) : (s(), me(F, {
                    key: 1,
                    name: g.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, l(g.name), 1),
                    g.status === "reading" ? (s(), a("small", yi, "正在读取…")) : g.status === "failed" ? (s(), a("small", ki, l(g.error), 1)) : (s(), a("small", wi, l(I(g.size)) + " · 待发送", 1))
                  ])
                ], 8, gi),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + g.name,
                  onClick: (L) => Ce(g.id)
                }, [
                  N(F, {
                    name: "close",
                    size: 13
                  })
                ], 8, $i)
              ], 2))), 128))
            ])) : S("", !0),
            $[26] || ($[26] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            ne(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": $[5] || ($[5] = (g) => A.value = g),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: ts,
              onPaste: re
            }, null, 544), [
              [pe, A.value]
            ]),
            e("div", _i, [
              e("div", Ai, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: $[6] || ($[6] = (g) => _.value?.click())
                }, [
                  N(F, {
                    name: "paperclip",
                    size: 18
                  }),
                  $[23] || ($[23] = e("span", null, "附件", -1))
                ]),
                e("label", Si, [
                  ne(e("input", {
                    "onUpdate:modelValue": $[7] || ($[7] = (g) => h.value = g),
                    type: "checkbox",
                    "aria-label": "联网搜索"
                  }, null, 512), [
                    [at, h.value]
                  ]),
                  $[24] || ($[24] = e("span", null, "联网搜索", -1))
                ]),
                $[25] || ($[25] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !A.value.trim() && !X.value,
                onClick: $[8] || ($[8] = (g) => rn())
              }, [
                N(F, {
                  name: "arrow",
                  size: 16
                }),
                T(l(ee.value ? "打断并发送" : "发送"), 1)
              ], 8, Ci)
            ])
          ], 32),
          f(Ue) && f($s) === "error" ? (s(), a("p", Ii, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : S("", !0),
          O.value || z.value ? (s(), a("p", {
            key: 2,
            class: "vb-simple-notice",
            role: O.value ? "alert" : "status"
          }, l(O.value || z.value), 9, Ei)) : S("", !0),
          e("div", xi, [
            e("details", Ui, [
              e("summary", null, [
                N(F, {
                  name: "lock",
                  size: 12
                }),
                $[27] || ($[27] = T("隐私与使用说明", -1))
              ]),
              $[28] || ($[28] = e("div", { class: "vb-simple-privacy-panel" }, [
                e("p", null, "附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。"),
                e("p", null, "选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给维衡 AI，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。"),
                e("p", null, "点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 维衡 AI 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。"),
                e("p", null, "开启“联网搜索”后，仅把本条问题文字（最多 128 字）发送给网页搜索接口；身体档案、饮食记录、附件和跨对话记忆不会发送给搜索接口。联网检索由 DeepSeek Search & Fetch 提供，可能产生搜索 API 费用。"),
                e("p", null, "跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。"),
                e("p", null, "饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。")
              ], -1))
            ]),
            e("span", null, l(A.value.length ? `${A.value.length}/1200` : "AI 内容仅供参考"), 1)
          ])
        ])
      ]),
      M.value ? (s(), me(vt, {
        key: 0,
        title: M.value.name,
        wide: "",
        onClose: $[9] || ($[9] = (g) => M.value = null)
      }, {
        default: ct(() => [
          M.value.kind === "image" ? (s(), a("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: M.value.dataUrl,
            alt: M.value.name
          }, null, 8, ji)) : (s(), a("pre", Di, l(M.value.text), 1)),
          e("p", Ni, l(M.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : S("", !0)
    ]));
  }
}), Ti = /* @__PURE__ */ Mn(Pi, [["__scopeId", "data-v-16a7ee81"]]), Mi = {
  key: 0,
  class: "vb-page-title"
}, Ri = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, zi = ["aria-pressed", "onClick"], Oi = { class: "vb-glass vb-review-hero" }, Fi = { class: "vb-icon-badge vb-large-badge" }, Bi = { class: "vb-small-label" }, Li = { class: "vb-coverage-score" }, qi = { class: "vb-assessment-grid" }, Vi = { class: "vb-glass vb-coverage-card" }, Gi = { class: "vb-section-heading" }, Ji = { class: "vb-coverage-list" }, Hi = { class: "vb-food-category-icon" }, Wi = { class: "vb-coverage-name" }, Ki = { key: 0 }, Yi = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, Xi = { class: "vb-inline-note" }, Qi = { class: "vb-glass vb-suggestion-card" }, Zi = ["checked", "onChange"], er = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, tr = { class: "vb-empty-icon" }, nr = { class: "vb-glass vb-supplement-card" }, sr = { class: "vb-icon-badge" }, or = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const o = t, n = P(o.records[0]?.date || "");
    ce(() => o.records, (w) => {
      w.some((h) => h.date === n.value) || (n.value = w[0]?.date || "");
    });
    const u = J(() => o.records.find((w) => w.date === n.value)), i = (w) => Number(u.value?.foods?.[w]) || 0, r = J(() => Pt.filter((w) => i(w.key) <= 0)), d = J(() => Pt.length - r.value.length), m = J(() => Math.max(1, ...Gt.map((w) => i(w.key)))), c = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, v = J(() => (r.value.length ? r.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map((w) => ({ key: w.key, title: c[w.key]?.[0] || (w.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: c[w.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), y = (w) => (o.habits[n.value] || []).includes(w);
    return (w, h) => (s(), a(B, null, [
      t.embedded ? S("", !0) : (s(), a("div", Mi, [
        h[4] || (h[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: h[0] || (h[0] = (b) => w.$emit("navigate", "diary"))
        }, [
          N(F, {
            name: "plus",
            size: 17
          }),
          h[3] || (h[3] = T("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (s(), a("div", Ri, [
        (s(!0), a(B, null, G(t.records.slice(0, 7), (b) => (s(), a("button", {
          key: b.date,
          class: he({ selected: n.value === b.date }),
          "aria-pressed": n.value === b.date,
          onClick: (A) => n.value = b.date
        }, l(b.date), 11, zi))), 128))
      ])) : S("", !0),
      u.value ? (s(), a(B, { key: 2 }, [
        e("section", Oi, [
          e("span", Fi, [
            N(F, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", Bi, l(u.value.date) + " · 饮食回顾", 1),
            e("h2", null, l(r.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, l(r.value.length ? r.value.map((b) => b.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", Li, [
            e("strong", null, [
              T(l(d.value), 1),
              e("small", null, " / " + l(f(Pt).length), 1)
            ]),
            h[5] || (h[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", qi, [
          e("section", Vi, [
            e("div", Gi, [
              h[6] || (h[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              N(F, { name: "chart" })
            ]),
            e("div", Ji, [
              (s(!0), a(B, null, G(f(Gt), (b) => (s(), a("div", {
                key: b.key,
                class: "vb-coverage-row"
              }, [
                e("span", Hi, [
                  N(F, {
                    name: f(Nn)[b.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", Wi, [
                  T(l(b.name), 1),
                  b.key === "snacks" ? (s(), a("small", Ki, "可选记录")) : S("", !0)
                ]),
                e("span", Yi, [
                  e("i", {
                    style: En({ width: i(b.key) / m.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: he(["vb-coverage-value", { "is-missing": !i(b.key) }])
                }, l(i(b.key) ? `${Math.round(i(b.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", Xi, [
              N(F, {
                name: "info",
                size: 15
              }),
              h[7] || (h[7] = T("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", Qi, [
            h[8] || (h[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (s(!0), a(B, null, G(v.value, (b) => (s(), a("label", {
              key: b.key,
              class: he(["vb-check-row", { done: y(b.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: y(b.key),
                onChange: (A) => w.$emit("toggle-habit", n.value, b.key)
              }, null, 40, Zi),
              e("span", null, [
                e("strong", null, l(b.title), 1),
                e("small", null, l(b.detail), 1)
              ])
            ], 2))), 128)),
            h[9] || (h[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (s(), a("section", er, [
        e("span", tr, [
          N(F, {
            name: "bowl",
            size: 36
          })
        ]),
        h[11] || (h[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        h[12] || (h[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: h[1] || (h[1] = (b) => w.$emit("navigate", "diary"))
        }, [
          h[10] || (h[10] = T("记录今天的饮食", -1)),
          N(F, {
            name: "arrow",
            size: 17
          })
        ])
      ])),
      e("section", nr, [
        e("span", sr, [
          N(F, {
            name: "shield",
            size: 23
          })
        ]),
        e("div", null, [
          h[13] || (h[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, l(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, l(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: h[2] || (h[2] = (b) => w.$emit("navigate", "about"))
        }, [
          h[14] || (h[14] = T("查看注意事项", -1)),
          N(F, {
            name: "arrow",
            size: 17
          })
        ])
      ])
    ], 64));
  }
}, ar = {
  key: 0,
  class: "vb-page-title"
}, lr = { class: "vb-date-input" }, ir = {
  key: 1,
  class: "vb-report-toolbar"
}, rr = { class: "vb-date-input" }, ur = {
  key: 2,
  class: "vb-report-filter"
}, dr = {
  key: 3,
  class: "vb-report-list"
}, cr = { class: "vb-report-card-top" }, vr = { class: "vb-icon-badge" }, mr = {
  key: 0,
  class: "vb-feature-error"
}, pr = {
  key: 1,
  class: "vb-inline-warning"
}, br = { class: "vb-report-card-actions" }, fr = ["onClick"], gr = ["disabled", "onClick"], hr = {
  key: 4,
  class: "vb-glass vb-report-empty"
}, yr = { class: "vb-icon-badge" }, kr = /* @__PURE__ */ Qe({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: o }) {
    const n = t, u = o, i = P(""), { isStale: r } = nn(), d = J(() => n.reports.filter((v) => !i.value || v.date === i.value));
    function m(v) {
      return n.records.find((y) => y.date === v.date);
    }
    function c(v) {
      return r(v, m(v), n.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[v.status];
    }
    return (v, y) => (s(), a(B, null, [
      t.embedded ? (s(), a("div", ir, [
        y[5] || (y[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", rr, [
          N(F, {
            name: "calendar",
            size: 18
          }),
          ne(e("input", {
            "onUpdate:modelValue": y[1] || (y[1] = (w) => i.value = w),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [pe, i.value]
          ])
        ])
      ])) : (s(), a("div", ar, [
        y[4] || (y[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", lr, [
          N(F, {
            name: "calendar",
            size: 18
          }),
          ne(e("input", {
            "onUpdate:modelValue": y[0] || (y[0] = (w) => i.value = w),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [pe, i.value]
          ])
        ])
      ])),
      y[9] || (y[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给维衡 AI；照片和备注不随每日分析发送。", -1)),
      i.value ? (s(), a("div", ur, [
        e("span", null, l(d.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: y[2] || (y[2] = (w) => i.value = "")
        }, "清除日期筛选")
      ])) : S("", !0),
      d.value.length ? (s(), a("div", dr, [
        (s(!0), a(B, null, G(d.value, (w) => (s(), a("article", {
          key: w.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", cr, [
            e("span", vr, [
              N(F, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, l(w.date), 1),
              e("small", null, l(new Date(w.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: he(["vb-pill", { "needs-update": c(w) === "需更新" }])
            }, l(c(w)), 3)
          ]),
          e("p", null, l(w.result?.summary || w.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          m(w) ? f(r)(w, m(w), t.profile) ? (s(), a("small", pr, "记录或个人目标已变化，此报告使用的是旧版本。")) : S("", !0) : (s(), a("small", mr, "对应记录已删除，保留报告快照。")),
          e("div", br, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (h) => u("open", w.date, w.id)
            }, [
              y[6] || (y[6] = T("打开报告", -1)),
              N(F, {
                name: "arrow",
                size: 15
              })
            ], 8, fr),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: w.status === "pending" || !m(w),
              onClick: (h) => u("retry", w.date)
            }, "重新分析", 8, gr)
          ])
        ]))), 128))
      ])) : (s(), a("section", hr, [
        e("span", yr, [
          N(F, {
            name: "report",
            size: 25
          })
        ]),
        e("h2", null, l(i.value ? "这一天还没有报告" : "从记录第一餐开始"), 1),
        y[8] || (y[8] = e("p", null, "保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: y[3] || (y[3] = (w) => u("navigate", "diary"))
        }, [
          y[7] || (y[7] = T("去记录饮食", -1)),
          N(F, {
            name: "arrow",
            size: 17
          })
        ])
      ]))
    ], 64));
  }
}), wr = { class: "vb-page-title" }, $r = {
  class: "vb-assessment-block",
  "aria-labelledby": "diet-assessment-heading"
}, _r = {
  class: "vb-assessment-block vb-assessment-reports",
  "aria-labelledby": "ai-report-heading"
}, Ar = /* @__PURE__ */ Qe({
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
    return (i, r) => (s(), a(B, null, [
      e("div", wr, [
        r[6] || (r[6] = e("div", null, [
          e("h1", null, "营养摄入分析"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: r[0] || (r[0] = (d) => n("navigate", "diary"))
        }, [
          N(F, {
            name: "plus",
            size: 17
          }),
          r[5] || (r[5] = T("添加饮食记录 ", -1))
        ])
      ]),
      N(Ss, {
        records: t.records,
        profile: t.profile || void 0
      }, null, 8, ["records", "profile"]),
      e("section", $r, [
        r[7] || (r[7] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "饮食结构回顾"),
            e("h2", { id: "diet-assessment-heading" }, "食物类别评估")
          ]),
          e("span", { class: "vb-subtle-label" }, "按已保存记录统计")
        ], -1)),
        N(or, {
          records: t.records,
          habits: t.habits,
          flags: t.flags,
          embedded: "",
          onNavigate: r[1] || (r[1] = (d) => n("navigate", d)),
          onToggleHabit: r[2] || (r[2] = (d, m) => n("toggleHabit", d, m))
        }, null, 8, ["records", "habits", "flags"])
      ]),
      e("section", _r, [
        r[8] || (r[8] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "每日 AI 分析"),
            e("h2", { id: "ai-report-heading" }, "AI 营养报告")
          ]),
          e("span", { class: "vb-subtle-label" }, "可按日期筛选、查看和重试")
        ], -1)),
        N(kr, {
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
}), Sr = { class: "vb-photo-picker" }, Cr = {
  key: 0,
  class: "vb-photo-preview"
}, Ir = ["src"], Er = { class: "vb-photo-actions" }, xr = ["disabled"], Ur = ["disabled"], jr = {
  key: 1,
  class: "vb-photo-hint",
  role: "status"
}, Dr = {
  key: 2,
  class: "vb-photo-error",
  role: "alert"
}, Nr = ["src"], Pr = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: o }) {
    const n = o, u = P(!1), i = P(null), r = P(null), d = P(""), m = P(!1);
    function c(A) {
      return new Promise((_, k) => {
        const C = URL.createObjectURL(A), M = new Image();
        M.onload = () => _({ image: M, url: C }), M.onerror = () => {
          URL.revokeObjectURL(C), k(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, M.src = C;
      });
    }
    function v(A, _) {
      return new Promise((k, C) => A.toBlob((M) => M ? k(M) : C(new Error("图片处理失败，请重新选择。")), "image/jpeg", _));
    }
    function y(A) {
      return new Promise((_, k) => {
        const C = new FileReader();
        C.onload = () => _(C.result), C.onerror = () => k(new Error("图片读取失败，请重新选择。")), C.readAsDataURL(A);
      });
    }
    async function w(A) {
      let _;
      try {
        const k = await createImageBitmap(A);
        _ = { image: k, width: k.width, height: k.height, cleanup: () => k.close() };
      } catch {
        const k = await c(A);
        _ = { image: k.image, width: k.image.naturalWidth, height: k.image.naturalHeight, cleanup: () => URL.revokeObjectURL(k.url) };
      }
      try {
        const k = Math.min(1, 1200 / Math.max(_.width, _.height)), C = document.createElement("canvas");
        C.width = Math.max(1, Math.round(_.width * k)), C.height = Math.max(1, Math.round(_.height * k));
        const M = C.getContext("2d");
        if (!M) throw new Error("浏览器暂不支持图片预览。");
        M.drawImage(_.image, 0, 0, C.width, C.height);
        let X = await v(C, 0.76);
        if (X.size > 32e4 && (X = await v(C, 0.58)), X.size > 32e4) {
          const Y = document.createElement("canvas");
          Y.width = Math.round(C.width * 0.75), Y.height = Math.round(C.height * 0.75), Y.getContext("2d")?.drawImage(C, 0, 0, Y.width, Y.height), X = await v(Y, 0.58);
        }
        return await y(X);
      } finally {
        _.cleanup();
      }
    }
    async function h(A, _) {
      const k = A.target, C = k.files?.[0];
      if (k.value = "", !!C) {
        if (d.value = "", !C.type.startsWith("image/") || C.type === "image/svg+xml") {
          d.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if (C.size > 12 * 1024 * 1024) {
          d.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        m.value = !0;
        try {
          const M = await w(C), X = { name: C.name.slice(0, 100), dataUrl: M, source: _, mime: "image/jpeg" };
          n("update:modelValue", X), n("selected", X);
        } catch (M) {
          d.value = M instanceof Error ? M.message : "无法处理这张图片，请重新选择。";
        } finally {
          m.value = !1;
        }
      }
    }
    function b() {
      d.value = "", n("update:modelValue", null);
    }
    return (A, _) => (s(), a("div", Sr, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: _[0] || (_[0] = (k) => h(k, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: r,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: _[1] || (_[1] = (k) => h(k, "本地图片"))
      }, null, 544),
      t.modelValue ? (s(), a("div", Cr, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: _[2] || (_[2] = (k) => u.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, Ir)
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
          N(F, {
            name: "close",
            size: 15
          })
        ])
      ])) : S("", !0),
      e("div", Er, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: _[3] || (_[3] = (k) => i.value?.click())
        }, [
          N(F, {
            name: "camera",
            size: 17
          }),
          _[6] || (_[6] = T("拍照", -1))
        ], 8, xr),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: _[4] || (_[4] = (k) => r.value?.click())
        }, [
          N(F, {
            name: "upload",
            size: 17
          }),
          T(l(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, Ur)
      ]),
      m.value ? (s(), a("p", jr, "正在准备图片…")) : d.value ? (s(), a("p", Dr, l(d.value), 1)) : S("", !0),
      u.value && t.modelValue ? (s(), me(vt, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: _[5] || (_[5] = (k) => u.value = !1)
      }, {
        default: ct(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, Nr)
        ]),
        _: 1
      })) : S("", !0)
    ]));
  }
}, Tr = { class: "vb-glass vb-photo-card" }, Mr = { class: "vb-aside-heading" }, Rr = { class: "vb-photo-badge" }, zr = {
  key: 0,
  class: "vb-feature-error",
  role: "alert"
}, Or = {
  key: 1,
  class: "vb-ai-progress",
  role: "status"
}, Fr = {
  key: 2,
  class: "vb-recognition-failed"
}, Br = {
  class: "vb-feature-error",
  role: "alert"
}, Lr = {
  key: 4,
  class: "vb-recognition-results"
}, qr = { class: "vb-data-note" }, Vr = {
  key: 0,
  class: "vb-recognition-meta"
}, Gr = { key: 0 }, Jr = { class: "vb-recognized-list" }, Hr = ["value", "disabled", "aria-label", "onInput"], Wr = ["aria-label", "onClick"], Kr = {
  key: 0,
  class: "vb-recognition-matches"
}, Yr = ["onClick"], Xr = { class: "vb-recognition-weight" }, Qr = ["onUpdate:modelValue", "disabled", "aria-label"], Zr = { key: 1 }, eu = {
  key: 1,
  class: "vb-data-note"
}, tu = { class: "vb-recognition-actions" }, nu = ["disabled"], su = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object, confirming: Boolean },
  emits: ["confirm"],
  setup(t, { emit: o }) {
    const n = t, u = o, { state: i } = en(), r = P(null), d = P(""), m = /* @__PURE__ */ new Map(), c = J(() => n.draft.recognition), v = J(() => {
      const O = c.value?.generatedAt;
      if (!O) return "";
      const z = new Date(O);
      return Number.isNaN(z.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(z);
    }), y = J(() => !n.confirming && c.value?.items?.length && !c.value.confirmed && c.value.items.every((O) => O.name?.trim() && Number.isFinite(Number(O.grams)) && Number(O.grams) >= 0.1 && Number(O.grams) <= 5e3));
    ce(() => [n.draft.date, n.draft.photoId], async ([O, z]) => {
      d.value = "", r.value = null;
      try {
        if (z) {
          const E = await Us("photos", z);
          if (n.draft.date !== O || n.draft.photoId !== z) return;
          r.value = E || null, E?.dataUrl && n.draft.recognition?.status === "pending" && n.draft.recognition.photoId === z ? _(E, { resume: !0 }) : !E && n.draft.recognition?.status === "pending" && (n.draft.recognition = { ...n.draft.recognition, status: "failed", error: "照片文件已不可用，请重新选择照片。" });
        } else if (n.legacyPhoto?.dataUrl) {
          const E = { ...n.legacyPhoto, id: crypto.randomUUID(), date: O };
          await Ht("photos", E), n.draft.date === O && (n.draft.photoId = E.id, r.value = E);
        }
      } catch (E) {
        d.value = E.message, r.value = n.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function w(O) {
      r.value = O, O || h();
    }
    async function h() {
      const O = n.draft.photoId;
      if (n.draft.photoId = null, n.draft.recognition = null, O && !i.records.some((z) => z.photoId === O) && !Object.values(i.drafts).some((z) => z.photoId === O)) try {
        await Ds("photos", O);
      } catch (z) {
        d.value = z.message;
      }
    }
    async function b(O) {
      const z = n.draft.date, E = crypto.randomUUID();
      d.value = "";
      try {
        const R = { ...O, id: E, date: z, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await Ht("photos", R), n.draft.date !== z) return;
        r.value = R, n.draft.photoId = E, n.draft.recognition = null, await _(R);
      } catch (R) {
        d.value = R.message;
      }
    }
    async function A(O, z) {
      try {
        return await nt("recognize", { image: O, requestId: z });
      } catch (E) {
        if (["NOT_CONFIGURED", "INVALID_CONFIG", "INVALID_IMAGE", "AUTH_FAILED", "INSUFFICIENT_BALANCE", "RATE_LIMITED", "MODEL_REQUEST"].includes(E?.code) || E?.message?.includes("超时")) throw E;
        return await new Promise((R) => setTimeout(R, 700)), nt("recognize", { image: O, requestId: z });
      }
    }
    async function _(O = r.value, { resume: z = !1 } = {}) {
      if (!O?.dataUrl) return;
      const E = n.draft, R = E.photoId, ee = E.recognition?.status === "pending" && E.recognition.photoId === R ? E.recognition : null;
      if (ee && !z) return;
      const H = z && ee?.requestId ? ee.requestId : crypto.randomUUID();
      (!z || !ee) && (E.recognition = { requestId: H, photoId: R, status: "pending", startedAt: (/* @__PURE__ */ new Date()).toISOString(), items: [], error: "", confirmed: !1 });
      try {
        const fe = R || H;
        let le = m.get(fe);
        le || (le = A(O.dataUrl, fe), m.set(fe, le), le.finally(() => {
          m.get(fe) === le && m.delete(fe);
        }).catch(() => {
        }));
        const ue = await le;
        if (E.photoId !== R || E.recognition?.requestId !== H) return;
        E.recognition = { ...ue, requestId: H, photoId: R, status: "complete", error: "", confirmed: !1 };
      } catch (fe) {
        E.photoId === R && E.recognition?.requestId === H && (E.recognition = { ...E.recognition, status: "failed", error: fe.message });
      }
    }
    function k(O, z) {
      O.name = z.target.value, O.foodId = null;
    }
    function C(O, z) {
      O.foodId = z.key, O.name = z.name;
    }
    function M() {
      n.draft.recognition = { ...n.draft.recognition, status: "complete", recognitionId: n.draft.recognition?.recognitionId || crypto.randomUUID(), items: n.draft.recognition?.items || [], confirmed: !1, error: "", note: n.draft.recognition?.note || "手动补充，请核对名称与份量。" }, n.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function X() {
      y.value && u("confirm", { batchId: c.value.recognitionId, items: c.value.items.map((O) => ({ ...O, estimated: !0, source: "photo" })) });
    }
    function Y(O) {
      const z = O.aiEstimate?.values;
      if (!z) return "";
      const E = (R) => Number(z[R]?.value).toLocaleString("zh-CN", { maximumFractionDigits: 2 });
      return `AI 估算本份：${E("energy")} kcal · 蛋白质 ${E("protein")} g · 碳水 ${E("carbs")} g · 脂肪 ${E("fat")} g`;
    }
    return (O, z) => (s(), a("section", Tr, [
      e("div", Mr, [
        z[2] || (z[2] = e("div", null, [
          e("h2", null, "这一餐的照片"),
          e("p", null, "拍一餐，核对后再记入。")
        ], -1)),
        e("span", Rr, [
          N(F, {
            name: "camera",
            size: 16
          })
        ])
      ]),
      z[6] || (z[6] = e("p", { class: "vb-photo-disclosure" }, "选择照片后自动识别：压缩照片会经本地后端发送给维衡 AI。照片与识别结果保存在当前浏览器。", -1)),
      N(Pr, {
        "model-value": r.value,
        "onUpdate:modelValue": w,
        onSelected: b
      }, null, 8, ["model-value"]),
      d.value ? (s(), a("p", zr, l(d.value), 1)) : S("", !0),
      c.value?.status === "pending" ? (s(), a("div", Or, [...z[3] || (z[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : S("", !0),
      c.value?.status === "failed" ? (s(), a("div", Fr, [
        e("p", Br, l(c.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: z[0] || (z[0] = (E) => _())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: M
          }, "手动录入")
        ])
      ])) : S("", !0),
      r.value && !c.value ? (s(), a("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: z[1] || (z[1] = (E) => _())
      }, "开始 AI 识别")) : S("", !0),
      c.value?.status === "complete" ? (s(), a("div", Lr, [
        e("p", qr, l(c.value.note || "请核对食物名称与份量。") + " 照片克数为 AI 估重，需你核对；营养分析会汇总数据库值与明确标注的 AI 宏量营养估算，其他缺失项仍保持未知。", 1),
        c.value.model ? (s(), a("small", Vr, [
          T("由 " + l(f(Ze)(c.value.model)) + " 识别", 1),
          v.value ? (s(), a("span", Gr, " · " + l(v.value), 1)) : S("", !0)
        ])) : S("", !0),
        e("div", Jr, [
          (s(!0), a(B, null, G(c.value.items, (E, R) => (s(), a("div", {
            key: E.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: E.name,
                disabled: c.value.confirmed || t.confirming,
                "aria-label": "识别食物" + (R + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (ee) => k(E, ee)
              }, null, 40, Hr),
              !c.value.confirmed && !t.confirming ? (s(), a("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (R + 1),
                onClick: (ee) => c.value.items.splice(R, 1)
              }, [
                N(F, {
                  name: "close",
                  size: 14
                })
              ], 8, Wr)) : S("", !0)
            ]),
            !E.foodId && !c.value.confirmed && !t.confirming ? (s(), a("div", Kr, [
              (s(!0), a(B, null, G(f(Qt)(E.name, 3), (ee) => (s(), a("button", {
                key: ee.key,
                type: "button",
                onClick: (H) => C(E, ee)
              }, l(ee.name), 9, Yr))), 128))
            ])) : S("", !0),
            e("label", Xr, [
              z[4] || (z[4] = T("估算可食部", -1)),
              ne(e("input", {
                "onUpdate:modelValue": (ee) => E.grams = ee,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: c.value.confirmed || t.confirming,
                "aria-label": "识别食物" + (R + 1) + "克数",
                placeholder: "克数"
              }, null, 8, Qr), [
                [pe, E.grams]
              ]),
              z[5] || (z[5] = T("克", -1))
            ]),
            e("small", {
              class: he({ "vb-unmatched": !E.foodId })
            }, l(E.foodId ? "数据库：" + f(ae)[E.foodId]?.state : E.aiEstimate ? Y(E) : "未匹配数据库；核对后由 AI 估算热量及三大营养素"), 3),
            E.aiEstimate?.assumption ? (s(), a("small", Zr, "AI 估算假设：" + l(E.aiEstimate.assumption), 1)) : S("", !0),
            e("small", null, l(E.uncertainty), 1)
          ]))), 128))
        ]),
        c.value.items.length ? S("", !0) : (s(), a("p", eu, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", tu, [
          !c.value.confirmed && !t.confirming ? (s(), a("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: M
          }, "＋补充遗漏食物")) : S("", !0),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !y.value,
            onClick: X
          }, l(c.value.confirmed ? "已加入本次选择" : t.confirming ? "正在估算并加入…" : "确认并加入记录"), 9, nu)
        ])
      ])) : S("", !0)
    ]));
  }
}, ou = { class: "vb-diary-page" }, au = { class: "vb-page-title" }, lu = { class: "vb-date-input" }, iu = ["max"], ru = {
  key: 0,
  class: "vb-diary-grid"
}, uu = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, du = ["disabled"], cu = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, vu = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], mu = { class: "vb-section-heading" }, pu = { class: "vb-pill" }, bu = {
  key: 0,
  class: "vb-selected-list"
}, fu = {
  key: 1,
  class: "vb-muted-empty"
}, gu = { class: "vb-section-heading" }, hu = {
  key: 0,
  class: "vb-history-list"
}, yu = ["aria-label", "onClick"], ku = ["onClick"], wu = ["aria-label", "onClick"], $u = {
  key: 1,
  class: "vb-muted-empty"
}, _u = { class: "vb-section-heading" }, Au = { class: "vb-diary-search-row" }, Su = { class: "vb-search-field" }, Cu = { class: "vb-meal-select" }, Iu = ["value"], Eu = {
  key: 0,
  class: "vb-search-results"
}, xu = ["onClick"], Uu = {
  key: 0,
  class: "vb-search-empty"
}, ju = { class: "vb-diary-entry-heading" }, Du = {
  key: 1,
  class: "vb-diary-entries"
}, Nu = { class: "vb-diary-entry-title" }, Pu = ["onClick"], Tu = ["value", "onInput", "aria-label"], Mu = ["aria-label", "onClick"], Ru = { class: "vb-data-note" }, zu = {
  key: 0,
  class: "vb-pill"
}, Ou = { class: "vb-entry-controls" }, Fu = ["onUpdate:modelValue", "aria-label"], Bu = { class: "vb-entry-meal" }, Lu = ["onUpdate:modelValue"], qu = ["value"], Vu = {
  key: 0,
  class: "vb-inline-warning"
}, Gu = ["onClick"], Ju = {
  key: 2,
  class: "vb-muted-empty"
}, Hu = ["onToggle"], Wu = { key: 0 }, Ku = ["onClick"], Yu = ["onClick"], Xu = { class: "vb-field vb-notes-field" }, Qu = { class: "vb-intake-more" }, Zu = { key: 0 }, ed = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: o }) {
    const n = t, u = o, { state: i, ensureDraft: r, addToDraft: d } = en(), { isStale: m } = nn(), c = it({}), v = it({});
    function y(Q = /* @__PURE__ */ new Date()) {
      const j = Q.getHours() * 60 + Q.getMinutes();
      return j >= 300 && j < 600 ? "breakfast" : j >= 600 && j <= 840 ? "lunch" : j >= 960 && j <= 1260 ? "dinner" : "snack";
    }
    const w = P(n.initialDate || Se()), h = P(""), b = P(y()), A = P("selected"), _ = P(null), k = P("");
    ce(() => n.initialDate, (Q) => {
      Q && (w.value = Q);
    }), ce(w, (Q) => {
      r(Q), k.value = "", h.value = "";
    }, { immediate: !0 });
    const C = J(() => i.drafts[w.value]), M = J(() => vn(C.value?.entries)), X = J(() => Qt(h.value, 8)), Y = J(() => n.records.find((Q) => Q.date === w.value)), O = J(() => M.value.length > 0 || !!(Y.value && !Array.isArray(C.value?.savedEntries))), z = (Q) => n.reports.find((j) => j.date === Q), E = /* @__PURE__ */ new Set(), R = P(!1);
    async function ee(Q) {
      const j = w.value, p = xe(), U = b.value, W = j + ":" + Q.key;
      if (!E.has(W)) {
        E.add(W);
        try {
          if (await Ve(Q.key), w.value !== j || xe() !== p) return;
          d({ date: j, foodId: Q.key, grams: Q.grams || 100, meal: U }), h.value = "", A.value = "selected";
        } catch (V) {
          k.value = V.message;
        } finally {
          E.delete(W);
        }
      }
    }
    function H() {
      C.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: h.value.trim(), grams: 100, meal: b.value, group: "unclassified", source: "manual", referenceConfirmed: !0 }), h.value = "";
    }
    function fe(Q, j) {
      const p = j.target.value;
      p.trim() !== Q.name.trim() && delete Q.nutritionSnapshot, Q.name = p;
    }
    async function le({ items: Q, batchId: j }) {
      const p = w.value, U = xe(), W = C.value, V = W.photoId, I = W.recognition?.requestId;
      if (!(R.value || W.appliedBatches.includes(j))) {
        R.value = !0, k.value = "";
        try {
          await Ve(Q.map((de) => de.foodId));
          let D = vn(Q.map((de) => ({ ...de, id: crypto.randomUUID(), meal: b.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: Ut(ae[de.foodId]) })));
          if (D.length !== Q.length) throw new Error("请核对每项食物名称与克数。");
          const oe = D.map((de, Re) => ({ entry: de, index: Re })).filter(({ entry: de }) => !de.foodId);
          let re = [];
          if (oe.length) {
            const de = await nt("photo-food-estimate", { items: oe.map(({ entry: Ce }) => ({ name: Ce.name, grams: Ce.grams })) });
            if (!Array.isArray(de.estimates) || de.estimates.length !== oe.length) throw new Error("AI 估算结果不完整，请重试。");
            const Re = de.estimates.map((Ce) => ({ ...Ce, entryId: String(oe[Number(Ce.entryId)]?.index ?? -1) }));
            if (re = Re, D = Xt(D, Re), oe.some(({ index: Ce }) => ["energy", "protein", "carbs", "fat"].some((et) => !D[Ce].nutritionSnapshot?.ranges?.[et]))) throw new Error("AI 估算结果不完整，请重试。");
          }
          if (w.value !== p || xe() !== U || C.value !== W || W.photoId !== V || W.recognition?.requestId !== I || W.appliedBatches.includes(j)) return;
          for (const de of re) W.recognition.items[Number(de.entryId)].aiEstimate = de;
          W.entries.push(...D), W.appliedBatches.push(j), W.recognition.confirmed = !0, A.value = "selected";
        } catch (D) {
          k.value = `未收录食物的 AI 营养估算失败：${D.message}。请核对食物后重试，尚未加入记录。`;
        } finally {
          R.value = !1;
        }
      }
    }
    function ue() {
      if (n.saving || !O.value) return;
      if (k.value = "", M.value.length !== C.value.entries.length) {
        k.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
        return;
      }
      const Q = JSON.parse(JSON.stringify(C.value));
      Array.isArray(Q.savedEntries) && (Q.entries = [...Q.savedEntries, ...Q.entries], delete Q.savedEntries), u("save", Q);
    }
    function ve(Q) {
      A.value = Q, matchMedia("(max-width:950px)").matches && Te(() => _.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function $e(Q) {
      const j = ["ArrowRight", "ArrowDown", "End"].includes(Q.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(Q.key) ? "selected" : null;
      j && (Q.preventDefault(), ve(j), Te(() => document.getElementById("vb-tab-" + j)?.focus()));
    }
    function _e(Q) {
      const j = z(Q.date);
      return j ? m(j, Q, n.profile) ? "报告需更新" : j.status === "pending" ? "分析中" : j.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (Q, j) => (s(), a("div", ou, [
      e("div", au, [
        j[8] || (j[8] = e("div", null, [
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", lu, [
          N(F, {
            name: "calendar",
            size: 18
          }),
          ne(e("input", {
            "onUpdate:modelValue": j[0] || (j[0] = (p) => w.value = p),
            type: "date",
            max: f(Se)(),
            "aria-label": "饮食记录日期"
          }, null, 8, iu), [
            [pe, w.value]
          ])
        ])
      ]),
      C.value ? (s(), a("div", ru, [
        e("aside", uu, [
          (s(), me(su, {
            key: w.value,
            draft: C.value,
            "legacy-photo": Y.value?.photo,
            confirming: R.value,
            onConfirm: le
          }, null, 8, ["draft", "legacy-photo", "confirming"])),
          e("div", {
            class: he(["vb-diary-actions", { "has-analysis": Y.value }])
          }, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving || !O.value
            }, [
              T(l(t.saving ? "正在保存…" : "保存记录"), 1),
              N(F, {
                name: "arrow",
                size: 17
              })
            ], 8, du),
            Y.value ? (s(), a("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: j[1] || (j[1] = (p) => Q.$emit("analysis", w.value))
            }, "查看分析")) : S("", !0),
            k.value ? (s(), a("p", cu, l(k.value), 1)) : S("", !0)
          ], 2),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: $e
          }, [
            (s(!0), a(B, null, G([["selected", "本次选择", M.value.length], ["history", "最近记录", t.records.length]], ([p, U, W]) => (s(), a("button", {
              id: "vb-tab-" + p,
              key: p,
              type: "button",
              role: "tab",
              "aria-selected": A.value === p,
              "aria-controls": "vb-panel-" + p,
              tabindex: A.value === p ? 0 : -1,
              class: he({ selected: A.value === p }),
              onClick: (V) => ve(p)
            }, [
              T(l(U), 1),
              e("span", null, l(W), 1)
            ], 10, vu))), 128))
          ], 32),
          A.value === "selected" ? (s(), a("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: _,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", mu, [
              e("div", null, [
                j[9] || (j[9] = e("h2", null, "本次选择", -1)),
                e("p", null, l(w.value), 1)
              ]),
              e("span", pu, l(M.value.length) + " 项", 1)
            ]),
            N(Zt, {
              entries: M.value,
              compact: ""
            }, null, 8, ["entries"]),
            M.value.length ? (s(), a("div", bu, [
              (s(!0), a(B, null, G(M.value, (p) => (s(), a("div", {
                key: p.id
              }, [
                e("span", null, [
                  T(l(p.name), 1),
                  e("small", null, l(f(kt).find(([U]) => U === p.meal)?.[1]) + l(p.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  T(l(p.grams), 1),
                  j[10] || (j[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (s(), a("p", fu, "选择食物后，会在这里汇总。"))
          ], 512)) : (s(), a("section", {
            key: 1,
            id: "vb-panel-history",
            ref_key: "asidePanel",
            ref: _,
            class: "vb-glass vb-aside-panel vb-history-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-history",
            tabindex: "0"
          }, [
            e("div", gu, [
              j[11] || (j[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              N(F, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (s(), a("div", hu, [
              (s(!0), a(B, null, G(t.records.slice(0, 12), (p) => (s(), a("div", {
                key: p.date,
                class: "vb-history-item vb-history-with-ai"
              }, [
                e("button", {
                  type: "button",
                  "aria-label": `打开 ${p.date} 的饮食记录`,
                  onClick: (U) => w.value = p.date
                }, [
                  j[12] || (j[12] = e("span", { class: "vb-status-dot" }, null, -1)),
                  e("span", null, [
                    e("strong", null, l(p.date), 1),
                    e("small", null, l(Object.values(p.foods || {}).filter((U) => Number(U) > 0).length) + " 类食物", 1)
                  ])
                ], 8, yu),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (U) => Q.$emit("analysis", p.date)
                }, l(_e(p)), 9, ku),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + p.date + "的记录",
                  onClick: (U) => Q.$emit("remove", p.date)
                }, [
                  N(F, {
                    name: "close",
                    size: 14
                  })
                ], 8, wu)
              ]))), 128))
            ])) : (s(), a("p", $u, "你的第一天记录，从今天开始。"))
          ], 512))
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: qe(ue, ["prevent"])
        }, [
          e("div", _u, [
            j[13] || (j[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: j[2] || (j[2] = (p) => Q.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", Au, [
            e("label", Su, [
              N(F, {
                name: "search",
                size: 18
              }),
              ne(e("input", {
                "onUpdate:modelValue": j[3] || (j[3] = (p) => h.value = p),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: j[4] || (j[4] = is(qe((p) => X.value[0] && ee(X.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [pe, h.value]
              ])
            ]),
            e("label", Cu, [
              j[14] || (j[14] = e("span", null, "添加到", -1)),
              ne(e("select", {
                "onUpdate:modelValue": j[5] || (j[5] = (p) => b.value = p),
                "aria-label": "添加食物的餐次"
              }, [
                (s(!0), a(B, null, G(f(kt), ([p, U]) => (s(), a("option", {
                  key: p,
                  value: p
                }, l(U), 9, Iu))), 128))
              ], 512), [
                [De, b.value]
              ])
            ])
          ]),
          h.value.trim() ? (s(), a("div", Eu, [
            (s(!0), a(B, null, G(X.value, (p) => (s(), a("button", {
              key: p.key,
              type: "button",
              class: "vb-search-result",
              onClick: (U) => ee(p)
            }, [
              e("span", null, [
                e("strong", null, l(p.name), 1),
                e("small", null, l(p.state) + " · " + l(p.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              N(F, {
                name: "plus",
                size: 17
              })
            ], 8, xu))), 128)),
            X.value.length ? S("", !0) : (s(), a("p", Uu, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: H
            }, [
              T("手动添加“" + l(h.value) + "”", 1),
              N(F, {
                name: "plus",
                size: 16
              })
            ])
          ])) : S("", !0),
          e("div", ju, [
            e("h3", null, [
              j[15] || (j[15] = T("已选食物 ", -1)),
              e("small", null, l(C.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: H
            }, "＋手动添加")
          ]),
          C.value.entries.length ? (s(), a("div", Du, [
            (s(!0), a(B, null, G(C.value.entries, (p, U) => (s(), a("article", {
              key: p.id,
              class: "vb-diary-entry"
            }, [
              e("div", Nu, [
                p.foodId ? (s(), a("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (W) => Q.$emit("detail", p.foodId)
                }, [
                  T(l(f(Dt)(f(ae)[p.foodId]) || p.name), 1),
                  N(F, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, Pu)) : (s(), a("input", {
                  key: 1,
                  value: p.name,
                  onInput: (W) => fe(p, W),
                  "aria-label": "手动食物" + (U + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 40, Tu)),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (U + 1),
                  onClick: (W) => C.value.entries.splice(U, 1)
                }, [
                  N(F, {
                    name: "close",
                    size: 15
                  })
                ], 8, Mu)
              ]),
              e("p", Ru, [
                T(l(p.foodId ? f(ae)[p.foodId]?.state : p.nutritionSnapshot?.dataType === "ai-estimate" ? "未匹配食物目录" : "未匹配食物目录，尚无成分值") + l(p.estimated ? " · 份量为估算" : ""), 1),
                p.nutritionSnapshot?.dataType === "ai-estimate" ? (s(), a("span", zu, "含AI估算")) : S("", !0)
              ]),
              N(Jn, {
                food: f(ae)[p.foodId],
                onChoose: (W) => {
                  p.grams = W, p.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", Ou, [
                e("label", null, [
                  j[16] || (j[16] = T("可食部重量", -1)),
                  ne(e("input", {
                    "onUpdate:modelValue": (W) => p.grams = W,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (f(ae)[p.foodId]?.name || p.name || "食物") + "克数"
                  }, null, 8, Fu), [
                    [pe, p.grams]
                  ]),
                  j[17] || (j[17] = e("small", null, "克", -1))
                ]),
                e("label", Bu, [
                  j[18] || (j[18] = e("span", null, "餐次", -1)),
                  ne(e("select", {
                    "onUpdate:modelValue": (W) => p.meal = W
                  }, [
                    (s(!0), a(B, null, G(f(kt), ([W, V]) => (s(), a("option", {
                      key: W,
                      value: W
                    }, l(V), 9, qu))), 128))
                  ], 8, Lu), [
                    [De, p.meal]
                  ])
                ])
              ]),
              p.referenceConfirmed === !1 ? (s(), a("p", Vu, [
                j[19] || (j[19] = T("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                f(ae)[p.foodId]?.source ? (s(), a("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (W) => p.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, Gu)) : (s(), a("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: j[6] || (j[6] = (W) => Q.$emit("browse"))
                }, "查找具体食物"))
              ])) : S("", !0)
            ]))), 128))
          ])) : (s(), a("p", Ju, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (s(!0), a(B, null, G(f(Gt), (p) => (s(), a("details", {
            key: p.key,
            class: "vb-diary-food-group",
            onToggle: (U) => c[p.key] = U.target.open
          }, [
            e("summary", null, [
              N(F, {
                name: f(Nn)[p.key],
                size: 18
              }, null, 8, ["name"]),
              T(l(p.name), 1),
              e("small", null, l(p.items.length) + " 个条目", 1),
              N(F, {
                name: "chevron",
                size: 14
              })
            ]),
            c[p.key] ? (s(), a("div", Wu, [
              (s(!0), a(B, null, G(p.items.slice(0, v[p.key] || 24), ([U, W]) => (s(), a("button", {
                key: U,
                type: "button",
                onClick: (V) => ee(f(ae)[U])
              }, l(W) + " ＋", 9, Ku))), 128)),
              p.items.length > (v[p.key] || 24) ? (s(), a("button", {
                key: 0,
                type: "button",
                onClick: (U) => v[p.key] = (v[p.key] || 24) + 24
              }, "再显示24项", 8, Yu)) : S("", !0)
            ])) : S("", !0)
          ], 40, Hu))), 128)),
          e("label", Xu, [
            j[20] || (j[20] = T("补充备注 ", -1)),
            j[21] || (j[21] = e("span", null, "可选，不发送给 AI", -1)),
            ne(e("textarea", {
              "onUpdate:modelValue": j[7] || (j[7] = (p) => C.value.notes = p),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [pe, C.value.notes]
            ])
          ]),
          e("details", Qu, [
            j[22] || (j[22] = e("summary", null, "查看记录依据", -1)),
            j[23] || (j[23] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (s(!0), a(B, null, G(M.value, (p) => (s(), a("p", {
              key: p.id
            }, [
              T(l(p.name) + "：" + l(p.nutritionSnapshot?.source?.name || f(Ze)(p.nutritionSnapshot?.estimate?.model) || "原目录数据"), 1),
              p.nutritionSnapshot?.estimate ? (s(), a("span", Zu, " · " + l(p.nutritionSnapshot.estimate.assumption), 1)) : S("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : S("", !0)
    ]));
  }
}, td = { class: "vb-food-card vb-glass" }, nd = ["aria-label"], sd = { class: "vb-food-card-copy" }, od = { class: "vb-small-label" }, ad = { key: 0 }, ld = { key: 0 }, id = {
  key: 1,
  class: "vb-food-composition-note"
}, rd = { class: "vb-food-card-bottom" }, ud = ["aria-pressed"], Cn = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const o = t;
    ce(() => o.food.key, (r) => {
      Ve(r).catch(() => {
      });
    }, { immediate: !0 });
    const { photo: n, loading: u, failed: i } = Gn(() => o.food);
    return (r, d) => (s(), a("article", td, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: d[0] || (d[0] = (m) => r.$emit("detail", t.food.key))
      }, [
        N(on, {
          food: t.food,
          photo: f(n),
          loading: f(u),
          failed: f(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", sd, [
          e("span", od, l(t.food.categoryName), 1),
          e("h3", null, l(f(Dt)(t.food)), 1),
          e("p", null, l(f(sn)(t.food)), 1),
          t.food.source ? (s(), a("dl", ad, [
            (s(!0), a(B, null, G(f(Me), (m) => (s(), a("div", {
              key: m.id
            }, [
              e("dt", null, l(m.id === "carbs" ? "碳水" : m.name), 1),
              e("dd", null, [
                T(l(f(Le)(t.food.nutrients[m.id])), 1),
                t.food.nutrients[m.id] != null ? (s(), a("small", ld, l(m.unit), 1)) : S("", !0)
              ])
            ]))), 128))
          ])) : (s(), a("p", id, [
            d[3] || (d[3] = T("按实际配方记录份量", -1)),
            d[4] || (d[4] = e("br", null, null, -1)),
            T(l(f(Dn).estimates?.[t.food.key] ? "已保存AI单值估算 · 查看假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, nd),
      e("div", rd, [
        e("span", null, l(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (s(), a("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: he({ selected: t.compared }),
          onClick: d[2] || (d[2] = (m) => r.$emit("compare", t.food.key))
        }, [
          N(F, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          T(l(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, ud)) : (s(), a("button", {
          key: 0,
          type: "button",
          onClick: d[1] || (d[1] = (m) => r.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, dd = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), cd = { class: "vb-food-hub" }, vd = { class: "vb-page-title" }, md = ["aria-expanded"], pd = { class: "vb-glass vb-food-search-hero" }, bd = { class: "vb-icon-badge" }, fd = { class: "vb-food-search-input" }, gd = {
  key: 1,
  class: "vb-food-suggestions"
}, hd = ["onClick"], yd = { class: "vb-recommended" }, kd = ["onClick"], wd = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, $d = { class: "vb-section-heading" }, _d = {
  key: 0,
  class: "vb-comparison-chips"
}, Ad = ["onClick"], Sd = { class: "vb-field" }, Cd = { class: "vb-ask-bottom" }, Id = ["disabled"], Ed = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, xd = {
  key: 2,
  class: "vb-ai-answer"
}, Ud = {
  key: 0,
  class: "vb-data-note"
}, jd = { class: "vb-answer-foods" }, Dd = ["onClick"], Nd = { class: "vb-data-note" }, Pd = { class: "vb-data-note" }, Td = {
  key: 1,
  class: "vb-compare-bar"
}, Md = ["onClick"], Rd = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, zd = { class: "vb-food-results-grid" }, Od = { class: "vb-section-heading vb-category-heading" }, Fd = { class: "vb-food-category-grid" }, Bd = ["onClick"], Ld = ["src", "alt"], qd = { class: "vb-food-results-top" }, Vd = { class: "vb-food-filter" }, Gd = { key: 0 }, Jd = ["onClick"], Hd = { key: 1 }, Wd = ["value"], Kd = { class: "vb-food-results-grid" }, Yd = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, Xd = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, Qd = ["disabled"], Zd = ["disabled"], ec = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, tc = { class: "vb-reference-sample-list" }, nc = ["onClick"], sc = { key: 0 }, oc = { class: "vb-food-source-note" }, ac = ["href"], lc = ["href"], ic = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const o = P(""), n = P(""), u = P(""), i = P(""), r = P("relevance"), d = P(1), m = P(!1), c = P([]), v = P(""), y = P(!1), w = P(""), h = P(!1), b = P(null), A = P(""), _ = Tt, k = new Set(Tt.map((j) => j.key)), C = new Set(ps.map((j) => j.key)), M = J(() => n.value ? Mt(n.value).map((j) => j.food).filter((j) => C.has(j.key) && !k.has(j.key)) : []);
    function X(j, p = tt.length) {
      return Mt(j).map((U) => U.food).filter((U) => k.has(U.key)).slice(0, p);
    }
    const Y = J(() => o.value.trim() ? X(o.value, tt.length).slice(0, 5) : []), O = (j) => _.filter((p) => p.category === j).length, z = Tt.length, E = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((j) => {
      const p = Mt(j).map((U) => U.food).filter((U) => k.has(U.key));
      return p.find((U) => U.source) || p[0];
    }).filter(Boolean).map((j) => [j.key, j])).values()], R = J(() => {
      let j = n.value ? X(n.value) : [..._].sort((p, U) => +!p.source - +!U.source);
      return u.value && (j = j.filter((p) => p.category === u.value)), j;
    }), ee = J(() => [...new Set(R.value.map((j) => j.subcategory))]), H = J(() => {
      let j = R.value.filter((p) => !i.value || p.subcategory === i.value);
      if (r.value !== "relevance") {
        const [p, U] = r.value.split(":");
        j = [...j].sort((W, V) => {
          if (p === "name") return W.name.localeCompare(V.name, "zh");
          const I = W.nutrients[p], D = V.nutrients[p];
          return I == null || D == null ? +(I == null) - +(D == null) : (U === "asc" ? 1 : -1) * (I - D);
        });
      }
      return j;
    }), fe = J(() => Math.max(1, Math.ceil(H.value.length / 12))), le = J(() => H.value.slice((d.value - 1) * 12, d.value * 12));
    ce([i, r], () => d.value = 1);
    function ue(j = o.value) {
      o.value = j.trim(), n.value = o.value, u.value = "", i.value = "", d.value = 1, m.value = !1;
    }
    function ve(j) {
      u.value = j, n.value = "", o.value = "", i.value = "", d.value = 1, r.value = "relevance";
    }
    function $e() {
      u.value = "", n.value = "", o.value = "", i.value = "", d.value = 1;
    }
    function _e(j) {
      v.value = "", c.value.includes(j) ? c.value = c.value.filter((p) => p !== j) : c.value.length < 2 ? c.value.push(j) : v.value = "每次选择两种食物进行比较。";
    }
    async function Q() {
      if (!(h.value || !w.value.trim())) {
        h.value = !0, A.value = "", b.value = null;
        try {
          b.value = await nt("ask", { question: w.value.trim(), foodIds: c.value });
        } catch (j) {
          A.value = j.message;
        } finally {
          h.value = !1;
        }
      }
    }
    return (j, p) => (s(), a("div", cd, [
      e("div", vd, [
        e("div", null, [
          p[14] || (p[14] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, l(f(z).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": y.value,
          onClick: p[0] || (p[0] = (U) => y.value = !y.value)
        }, [
          N(F, {
            name: "sparkles",
            size: 17
          }),
          p[15] || (p[15] = T("问 AI", -1))
        ], 8, md)
      ]),
      e("section", pd, [
        e("span", bd, [
          N(F, {
            name: "search",
            size: 23
          })
        ]),
        p[18] || (p[18] = e("div", null, [
          e("h2", null, "今天想了解哪一种食物？")
        ], -1)),
        e("form", {
          class: "vb-food-search-form",
          onSubmit: p[3] || (p[3] = qe((U) => ue(), ["prevent"]))
        }, [
          e("div", fd, [
            N(F, {
              name: "search",
              size: 19
            }),
            ne(e("input", {
              "onUpdate:modelValue": p[1] || (p[1] = (U) => o.value = U),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: p[2] || (p[2] = (U) => m.value = !0)
            }, null, 544), [
              [pe, o.value]
            ]),
            o.value ? (s(), a("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: $e
            }, [
              N(F, {
                name: "close",
                size: 15
              })
            ])) : S("", !0),
            m.value && Y.value.length ? (s(), a("div", gd, [
              (s(!0), a(B, null, G(Y.value, (U) => (s(), a("button", {
                key: U.key,
                type: "button",
                onClick: (W) => ue(U.name)
              }, [
                T(l(U.name), 1),
                e("small", null, l(U.state), 1)
              ], 8, hd))), 128))
            ])) : S("", !0)
          ]),
          p[16] || (p[16] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", yd, [
          p[17] || (p[17] = e("span", null, "推荐搜索", -1)),
          (s(), a(B, null, G(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (U) => e("button", {
            key: U,
            type: "button",
            onClick: (W) => ue(U)
          }, l(U), 9, kd)), 64))
        ])
      ]),
      y.value ? (s(), a("section", wd, [
        e("div", $d, [
          p[19] || (p[19] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          N(F, { name: "sparkles" })
        ]),
        p[23] || (p[23] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给维衡 AI。数值来自食物库，AI 负责解释。", -1)),
        c.value.length ? (s(), a("div", _d, [
          (s(!0), a(B, null, G(c.value, (U) => (s(), a("button", {
            key: U,
            type: "button",
            onClick: (W) => _e(U)
          }, l(f(ae)[U].name) + " ×", 9, Ad))), 128))
        ])) : S("", !0),
        e("form", {
          onSubmit: qe(Q, ["prevent"])
        }, [
          e("label", Sd, [
            p[20] || (p[20] = T("你的问题", -1)),
            ne(e("textarea", {
              "onUpdate:modelValue": p[4] || (p[4] = (U) => w.value = U),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [pe, w.value]
            ])
          ]),
          e("div", Cd, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: p[5] || (p[5] = (U) => w.value = c.value.length === 2 ? "这两种食物的蛋白质有什么区别？" : "100 克香蕉大约有多少热量？")
            }, "填入示例问题"),
            e("button", {
              type: "submit",
              class: "vb-button vb-button-primary",
              disabled: h.value || !w.value.trim()
            }, l(h.value ? "正在查询与分析…" : "发送问题"), 9, Id)
          ])
        ], 32),
        A.value ? (s(), a("p", Ed, l(A.value), 1)) : S("", !0),
        b.value ? (s(), a("div", xd, [
          p[21] || (p[21] = e("h3", null, "数据库数值", -1)),
          b.value.database.length ? S("", !0) : (s(), a("p", Ud, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", jd, [
            (s(!0), a(B, null, G(b.value.database, (U) => (s(), a("button", {
              key: U.id,
              type: "button",
              onClick: (W) => j.$emit("detail", U.id)
            }, [
              e("strong", null, l(U.name) + " →", 1),
              e("span", null, l(U.grams) + " 克可食部 · 热量 " + l(f(Le)(U.portion.energy)) + l(U.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + l(f(Le)(U.portion.protein)) + l(U.portion.protein != null ? " g" : ""), 1),
              e("small", null, l(U.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, Dd))), 128))
          ]),
          p[22] || (p[22] = e("h3", null, "AI 解释", -1)),
          e("p", null, l(b.value.answer.summary), 1),
          e("p", null, l(b.value.answer.explanation), 1),
          e("p", Nd, l(b.value.answer.limitations), 1),
          e("small", Pd, l(f(Ze)(b.value.model)) + " · " + l(new Date(b.value.generatedAt).toLocaleString()), 1)
        ])) : S("", !0)
      ])) : S("", !0),
      c.value.length ? (s(), a("div", Td, [
        e("span", null, "已选 " + l(c.value.length) + " 种食物", 1),
        (s(!0), a(B, null, G(c.value, (U) => (s(), a("button", {
          key: U,
          onClick: (W) => _e(U)
        }, l(f(ae)[U].name) + " ×", 9, Md))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: p[6] || (p[6] = (U) => {
            y.value = !0, w.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : S("", !0),
      v.value ? (s(), a("p", Rd, l(v.value), 1)) : S("", !0),
      !u.value && !n.value ? (s(), a(B, { key: 3 }, [
        p[25] || (p[25] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物")
          ])
        ], -1)),
        e("div", zd, [
          (s(), a(B, null, G(E, (U) => N(Cn, {
            key: U.key,
            food: U,
            compared: c.value.includes(U.key),
            onDetail: p[7] || (p[7] = (W) => j.$emit("detail", W)),
            onCompare: _e
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", Od, [
          e("div", null, [
            p[24] || (p[24] = e("h2", null, "按类别探索", -1)),
            e("p", null, l(f(_).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", Fd, [
          (s(!0), a(B, null, G(f(bs).filter((U) => O(U.id) > 0), (U) => (s(), a("button", {
            key: U.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: (W) => ve(U.id)
          }, [
            e("img", {
              src: U.image,
              alt: U.name + "分类示意图",
              loading: "lazy"
            }, null, 8, Ld),
            e("span", null, [
              e("small", null, l(O(U.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, l(U.name), 1),
              e("em", null, [
                T(l(U.description) + " ", 1),
                N(F, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, Bd))), 128))
        ]),
        p[26] || (p[26] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (s(), a(B, { key: 4 }, [
        e("div", qd, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: $e
          }, [
            N(F, {
              name: "back",
              size: 15
            }),
            p[27] || (p[27] = T("分类总览", -1))
          ]),
          e("h2", null, l(u.value ? f(mn)[u.value].name : "“" + n.value + "”的食物照片与营养资料"), 1),
          e("span", null, l(H.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", Vd, [
          ee.value.length <= 10 ? (s(), a("div", Gd, [
            e("button", {
              class: he({ selected: !i.value }),
              onClick: p[8] || (p[8] = (U) => i.value = "")
            }, "全部", 2),
            (s(!0), a(B, null, G(ee.value, (U) => (s(), a("button", {
              key: U,
              class: he({ selected: i.value === U }),
              onClick: (W) => i.value = U
            }, l(U), 11, Jd))), 128))
          ])) : (s(), a("label", Hd, [
            p[29] || (p[29] = T("筛选", -1)),
            ne(e("select", {
              "onUpdate:modelValue": p[9] || (p[9] = (U) => i.value = U),
              "aria-label": "食物类型筛选"
            }, [
              p[28] || (p[28] = e("option", { value: "" }, "全部类型", -1)),
              (s(!0), a(B, null, G(ee.value, (U) => (s(), a("option", {
                key: U,
                value: U
              }, l(U), 9, Wd))), 128))
            ], 512), [
              [De, i.value]
            ])
          ])),
          e("label", null, [
            p[31] || (p[31] = T("排序", -1)),
            ne(e("select", {
              "onUpdate:modelValue": p[10] || (p[10] = (U) => r.value = U),
              "aria-label": "食物营养指标排序"
            }, [...p[30] || (p[30] = [
              xn('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [De, r.value]
            ])
          ])
        ]),
        e("div", Kd, [
          (s(!0), a(B, null, G(le.value, (U) => (s(), me(Cn, {
            key: U.key,
            food: U,
            compared: c.value.includes(U.key),
            onDetail: p[11] || (p[11] = (W) => j.$emit("detail", W)),
            onCompare: _e
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        H.value.length ? S("", !0) : (s(), a("div", Yd, [
          N(F, {
            name: "search",
            size: 34
          }),
          p[32] || (p[32] = e("h2", null, "没有找到匹配的食物", -1)),
          p[33] || (p[33] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: $e
          }, "返回食物总览")
        ])),
        fe.value > 1 ? (s(), a("nav", Xd, [
          e("button", {
            disabled: d.value === 1,
            onClick: p[12] || (p[12] = (U) => d.value--)
          }, "上一页", 8, Qd),
          e("span", null, "第 " + l(d.value) + " / " + l(fe.value) + " 页", 1),
          e("button", {
            disabled: d.value === fe.value,
            onClick: p[13] || (p[13] = (U) => d.value++)
          }, "下一页", 8, Zd)
        ])) : S("", !0)
      ], 64)),
      n.value && M.value.length ? (s(), a("details", ec, [
        e("summary", null, "其他营养数据样本 · " + l(M.value.length.toLocaleString()) + " 条", 1),
        p[34] || (p[34] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", tc, [
          (s(!0), a(B, null, G(M.value.slice(0, 80), (U) => (s(), a("button", {
            key: U.key,
            type: "button",
            onClick: (W) => j.$emit("detail", U.key)
          }, [
            e("strong", null, l(U.name), 1),
            e("span", null, l(U.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, nc))), 128))
        ]),
        M.value.length > 80 ? (s(), a("p", sc, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : S("", !0)
      ])) : S("", !0),
      e("details", oc, [
        p[35] || (p[35] = e("summary", null, "数据口径与图片署名", -1)),
        p[36] || (p[36] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        p[37] || (p[37] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        p[38] || (p[38] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        p[39] || (p[39] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (s(!0), a(B, null, G(f(dd), (U) => (s(), a("li", {
            key: U.key
          }, [
            T(l(f(mn)[U.key]?.name) + "：", 1),
            e("a", {
              href: U.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, l(U.title), 9, ac),
            T(" · " + l(U.author) + " · ", 1),
            e("a", {
              href: U.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, l(U.license), 9, lc),
            T(" · " + l(U.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function rc(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function uc() {
  const t = P(""), o = P((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), n = P("lunch"), u = P(null), i = P(""), r = P(!1), d = P([]);
  async function m(v, y, w = {}) {
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
      u.value = await Ns({
        goal: t.value.slice(0, 500),
        date: o.value,
        meal: n.value,
        profile: h,
        conditions: w.conditions,
        recordContext: w.recordContext,
        ...y ? {
          personalization: {
            preferences: y.preferences?.slice(0, 200),
            safetyFlags: y.safetyFlags?.slice(0, 4)
          }
        } : {}
      }, (b) => d.value.push(b));
    } catch (b) {
      i.value = rc(b);
    } finally {
      r.value = !1;
    }
  }
  function c() {
    u.value = null, i.value = "", d.value = [];
  }
  return { goal: t, date: o, meal: n, response: u, error: i, busy: r, progress: d, run: m, clear: c };
}
const dc = [
  ["花生", "peanut", "peanuts", "groundnut"],
  ["奶", "牛奶", "乳", "乳制品", "奶制品", "dairy", "milk", "cheese", "yogurt", "yoghurt", "cream", "butter"],
  ["蛋", "鸡蛋", "egg", "eggs"],
  ["海鲜", "seafood", "鱼虾蟹贝", "鱼", "虾", "蟹", "贝", "fish", "shrimp", "prawn", "crab", "clam", "oyster", "salmon", "tuna", "cod", "squid", "mussel"],
  ["肉类", "肉", "牛肉", "猪肉", "鸡肉", "羊肉", "禽", "beef", "pork", "chicken", "lamb", "turkey", "duck", "meat"],
  ["香菜", "coriander", "cilantro"],
  ["大豆", "豆制品", "soy", "tofu"],
  ["小麦", "wheat"],
  ["坚果", "nuts", "almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut"]
], Lt = (t, o = 300) => typeof t == "string" ? t.trim().slice(0, o) : "";
function qt(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const o = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (o !== null && (!Number.isFinite(o) || o <= 0 || o > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const n = (Array.isArray(t.avoids) ? t.avoids.join("、") : Lt(t.avoids)).split(/[,，、;；\n]+/).map((r) => r.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (n.length > 12 || n.some((r) => r.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const u = t.availableFoods ?? [];
  if (!Array.isArray(u) || u.length > 12) throw new Error("可选食物最多12项。");
  const i = u.map((r) => {
    const d = ae[r?.foodId], m = Number(r?.grams), c = r?.price === null || r?.price === void 0 || r?.price === "" ? null : Number(r.price);
    if (!d || !Number.isFinite(m) || m < 0.1 || m > 5e3 || c !== null && (!Number.isFinite(c) || c < 0 || c > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: d.key, name: d.name, grams: m, price: c };
  });
  if (new Set(i.map((r) => r.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: o, avoids: [...new Set(n)], preferences: Lt(t.preferences, 200), exercise: Lt(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function Wn(t, o = []) {
  const n = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), u = ht(n);
  return o.filter((i) => {
    const r = /* @__PURE__ */ new Set([i]);
    for (const d of dc) if (d.some((m) => ht(m) === ht(i))) for (const m of d) r.add(m);
    return [...r].some((d) => /^[a-z ]+$/i.test(d) ? new RegExp("\\b" + d.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(n) : u.includes(ht(d)));
  });
}
function In(t, o) {
  return !!t && !["13", "17"].includes(t.category) && !Wn(t, o.avoids).length && (!o.onlyAvailable || o.availableFoods.some((n) => n.foodId === t.key));
}
function cc(t, o) {
  const n = t.map((r) => {
    const d = o.availableFoods.find((c) => c.foodId === r.foodId), m = d?.price != null ? Math.round(d.price * r.grams / d.grams * 100) / 100 : null;
    return { foodId: r.foodId, cost: m, priceBasis: d?.price != null ? { price: d.price, grams: d.grams } : null };
  }), u = n.every((r) => r.cost !== null), i = Math.round(n.reduce((r, d) => r + (d.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: o.budget, complete: u, knownSubtotal: i, total: u ? i : null, status: u ? o.budget === null ? "no_budget" : i > o.budget ? "over_budget" : "within_budget" : "unknown", breakdown: n, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: o.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const vc = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, mc = { class: "vb-agent-heading" }, pc = { class: "vb-icon-badge" }, bc = { class: "vb-campus-fields" }, fc = ["max", "disabled"], gc = ["disabled"], hc = ["value"], yc = ["disabled"], kc = ["disabled"], wc = { class: "vb-analysis-tabs" }, $c = ["disabled"], _c = ["disabled", "onClick"], Ac = { class: "vb-more-conditions" }, Sc = { class: "vb-agent-goal" }, Cc = ["disabled"], Ic = { class: "vb-campus-fields" }, Ec = ["disabled"], xc = ["disabled"], Uc = { class: "vb-campus-candidates" }, jc = { class: "vb-candidate-search" }, Dc = ["disabled"], Nc = ["disabled"], Pc = ["value"], Tc = ["disabled"], Mc = { class: "vb-candidate-list" }, Rc = ["onUpdate:modelValue", "disabled"], zc = ["onUpdate:modelValue", "disabled"], Oc = ["disabled", "onClick"], Fc = {
  key: 0,
  class: "vb-agent-context-optin"
}, Bc = ["disabled"], Lc = { class: "vb-agent-context-optin" }, qc = ["disabled"], Vc = { class: "vb-agent-context-optin" }, Gc = ["disabled"], Jc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Hc = ["disabled"], Wc = {
  key: 0,
  class: "vb-loading-ring"
}, Kc = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, Yc = { key: 0 }, Xc = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, Qc = ["disabled"], Zc = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, ev = {
  key: 3,
  class: "vb-agent-plan"
}, tv = {
  key: 0,
  class: "vb-data-note",
  role: "status"
}, nv = { class: "vb-agent-plan-heading" }, sv = { class: "vb-eyebrow" }, ov = { key: 1 }, av = { class: "vb-data-note" }, lv = { key: 0 }, iv = { key: 1 }, rv = { class: "vb-agent-items" }, uv = { class: "vb-agent-item-title" }, dv = ["onClick"], cv = ["onClick"], vv = {
  key: 0,
  class: "vb-candidate-search"
}, mv = ["value"], pv = ["disabled", "onClick"], bv = { key: 0 }, fv = { class: "vb-agent-grams" }, gv = ["value", "onInput"], hv = { class: "vb-data-note" }, yv = { class: "vb-agent-evidence" }, kv = { class: "vb-agent-source" }, wv = ["href"], $v = { key: 1 }, _v = { key: 0 }, Av = {
  key: 3,
  class: "vb-agent-notes"
}, Sv = {
  key: 4,
  class: "vb-agent-notes is-caution"
}, Cv = { class: "vb-agent-trace" }, Iv = { class: "vb-agent-confirm" }, Ev = ["disabled"], xv = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: o }) {
    const n = t, u = o, { goal: i, date: r, meal: d, response: m, error: c, busy: v, progress: y, run: w, clear: h } = uc();
    i.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const b = it({ budget: "", avoids: "", preferences: n.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), A = P(-1), _ = P(""), k = P(!1), C = P(!1), M = P(!0), X = P(!1), Y = P(""), O = P(""), z = P(""), E = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], R = J(() => O.value.trim() ? Qt(O.value, 8) : []), ee = J(() => rt((n.records || []).find((V) => V.date === r.value))), H = J(() => m.value?.status === "ready" ? m.value : null), fe = J(() => (H.value?.plan.items || []).map((V, I) => ({ id: "agent-" + I, foodId: V.foodId, name: V.name, grams: V.grams, meal: V.meal, group: ae[V.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), le = J(() => H.value ? cc(H.value.plan.items, H.value.conditions) : null), ue = J(() => !H.value || !H.value.plan.items.length || le.value?.status === "over_budget" || H.value.plan.items.some((V) => !Number.isFinite(V.grams) || V.grams < 0.1 || V.grams > 5e3));
    ce([i, r, d, b, M, X, () => n.profile, () => n.records], () => {
      !v.value && m.value && h(), k.value = !1;
    }, { deep: !0 }), ce(() => n.preferences, (V) => b.preferences = V || "");
    function ve() {
      const V = ae[z.value];
      if (Y.value = "", !!V) {
        if (b.availableFoods.some((I) => I.foodId === V.key)) {
          Y.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (b.availableFoods.length >= 12) {
          Y.value = "最多加入12项备选食物。";
          return;
        }
        b.availableFoods.push({ foodId: V.key, name: V.name, grams: 100, price: "" }), z.value = "", O.value = "";
      }
    }
    async function $e() {
      Y.value = "", k.value = !1, C.value = !1;
      let V;
      try {
        await Ve(b.availableFoods.map((D) => D.foodId)), V = qt(b);
        const I = V.availableFoods.find((D) => Wn(ae[D.foodId], V.avoids).length);
        if (I) throw Error("备选食物“" + I.name + "”命中回避项，请先移除或修改条件。");
      } catch (I) {
        Y.value = I.message;
        return;
      }
      await w(n.profile, X.value ? { safetyFlags: (n.flags || []).filter((I) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes(I)) } : void 0, { conditions: V, ...M.value ? { recordContext: { date: r.value, entries: ee.value.map((I) => ({ foodId: I.foodId, name: I.name, grams: I.grams, meal: I.meal, referenceConfirmed: I.referenceConfirmed })) } } : {} });
    }
    function _e() {
      ue.value || k.value || (k.value = !0, u("confirm", { confirmationId: H.value.confirmationId, date: H.value.date, meal: H.value.meal, items: H.value.plan.items, onResult: (V) => {
        k.value = V.ok, V.ok || (Y.value = V.error || "加入草稿失败，请重试。");
      } }));
    }
    function Q(V, I) {
      H.value && (H.value.plan.items[V].grams = Number(I), H.value.plan.items[V].portion = pn(ae[H.value.plan.items[V].foodId], Number(I)), C.value = !0);
    }
    function j(V) {
      H.value && (H.value.plan.items.splice(V, 1), C.value = !0);
    }
    const p = J(() => {
      let V;
      try {
        V = qt(b);
      } catch {
        return [];
      }
      return (V.availableFoods.length && V.onlyAvailable ? V.availableFoods.map((D) => ae[D.foodId]) : tt).filter((D) => D && !D.__summary && D.source && In(D, V) && !H.value?.plan.items.some((oe) => oe.foodId === D.key)).slice(0, 60);
    });
    async function U(V) {
      const I = _.value, D = H.value, oe = ae[I];
      if (!D || !oe || !p.value.some((de) => de.key === I)) return;
      try {
        if (await Ve([I]), H.value !== D || !In(oe, qt(b))) return;
      } catch (de) {
        Y.value = de.message || "食物详情读取失败，请重试。";
        return;
      }
      const re = D.plan.items[V];
      re && (D.plan.items[V] = { ...re, foodId: oe.key, name: oe.name, portion: pn(oe, re.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: oe.source?.name || "", source: oe.source?.id || "", missing: ["energy", "protein", "carbs", "fat"].filter((de) => typeof oe.nutrients?.[de] != "number") }, C.value = !0, A.value = -1, _.value = "");
    }
    const W = (V) => typeof V == "number" && Number.isFinite(V) ? V.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (V, I) => (s(), a("section", vc, [
      e("header", mc, [
        e("span", pc, [
          N(F, {
            name: "sparkles",
            size: 21
          })
        ]),
        I[15] || (I[15] = e("div", null, [
          e("h2", { id: "meal-agent-title" }, "安排我的下一餐"),
          e("p", null, "说清预算和回避项，结合你的备选食物检索与计算。方案先核对，实际吃过后再记录。")
        ], -1))
      ]),
      e("form", {
        class: "vb-agent-form",
        onSubmit: qe($e, ["prevent"])
      }, [
        e("div", bc, [
          e("label", null, [
            I[16] || (I[16] = T("日期", -1)),
            ne(e("input", {
              "onUpdate:modelValue": I[0] || (I[0] = (D) => Nt(r) ? r.value = D : null),
              type: "date",
              max: f(Se)(),
              disabled: f(v)
            }, null, 8, fc), [
              [pe, f(r)]
            ])
          ]),
          e("label", null, [
            I[17] || (I[17] = T("餐次", -1)),
            ne(e("select", {
              "onUpdate:modelValue": I[1] || (I[1] = (D) => Nt(d) ? d.value = D : null),
              disabled: f(v)
            }, [
              (s(), a(B, null, G(E, ([D, oe]) => e("option", {
                key: D,
                value: D
              }, l(oe), 9, hc)), 64))
            ], 8, gc), [
              [De, f(d)]
            ])
          ]),
          e("label", null, [
            I[18] || (I[18] = T("预算（元，可选）", -1)),
            ne(e("input", {
              "onUpdate:modelValue": I[2] || (I[2] = (D) => b.budget = D),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: f(v)
            }, null, 8, yc), [
              [pe, b.budget]
            ])
          ]),
          e("label", null, [
            I[19] || (I[19] = T("不吃的食物", -1)),
            ne(e("input", {
              "onUpdate:modelValue": I[3] || (I[3] = (D) => b.avoids = D),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: f(v)
            }, null, 8, kc), [
              [pe, b.avoids]
            ])
          ])
        ]),
        e("div", wc, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: f(v),
            onClick: I[4] || (I[4] = (D) => b.budget = "15")
          }, "预算15元", 8, $c),
          (s(), a(B, null, G(["清淡", "素食偏好"], (D) => e("button", {
            key: D,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: f(v),
            onClick: (oe) => b.preferences = D
          }, l(D), 9, _c)), 64)),
          e("span", null, "已选偏好：" + l(b.preferences || "未设置"), 1)
        ]),
        e("details", Ac, [
          I[29] || (I[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", Sc, [
            I[20] || (I[20] = e("span", null, "这餐想怎么安排？", -1)),
            ne(e("textarea", {
              "onUpdate:modelValue": I[5] || (I[5] = (D) => Nt(i) ? i.value = D : null),
              rows: "2",
              maxlength: "500",
              disabled: f(v),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, Cc), [
              [pe, f(i)]
            ])
          ]),
          e("div", Ic, [
            e("label", null, [
              I[21] || (I[21] = T("口味与饮食偏好", -1)),
              ne(e("input", {
                "onUpdate:modelValue": I[6] || (I[6] = (D) => b.preferences = D),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: f(v)
              }, null, 8, Ec), [
                [pe, b.preferences]
              ])
            ]),
            e("label", null, [
              I[22] || (I[22] = T("运动情况（可选）", -1)),
              ne(e("input", {
                "onUpdate:modelValue": I[7] || (I[7] = (D) => b.exercise = D),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: f(v)
              }, null, 8, xc), [
                [pe, b.exercise]
              ])
            ])
          ]),
          e("details", Uc, [
            I[27] || (I[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            I[28] || (I[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", jc, [
              ne(e("input", {
                "onUpdate:modelValue": I[8] || (I[8] = (D) => O.value = D),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: f(v),
                onInput: I[9] || (I[9] = (D) => z.value = "")
              }, null, 40, Dc), [
                [pe, O.value]
              ]),
              ne(e("select", {
                "onUpdate:modelValue": I[10] || (I[10] = (D) => z.value = D),
                "aria-label": "选择具体食物",
                disabled: f(v) || !R.value.length
              }, [
                I[23] || (I[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (s(!0), a(B, null, G(R.value, (D) => (s(), a("option", {
                  key: D.key,
                  value: D.key
                }, l(D.name), 9, Pc))), 128))
              ], 8, Nc), [
                [De, z.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: f(v) || !z.value,
                onClick: ve
              }, "加入备选", 8, Tc)
            ]),
            e("div", Mc, [
              (s(!0), a(B, null, G(b.availableFoods, (D, oe) => (s(), a("article", {
                key: D.foodId
              }, [
                e("strong", null, l(D.name), 1),
                e("label", null, [
                  I[24] || (I[24] = T("这份可食部（克）", -1)),
                  ne(e("input", {
                    "onUpdate:modelValue": (re) => D.grams = re,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: f(v)
                  }, null, 8, Rc), [
                    [
                      pe,
                      D.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  I[25] || (I[25] = T("这份已知价格（元）", -1)),
                  ne(e("input", {
                    "onUpdate:modelValue": (re) => D.price = re,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: f(v)
                  }, null, 8, zc), [
                    [pe, D.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: f(v),
                  onClick: (re) => b.availableFoods.splice(oe, 1)
                }, "移除", 8, Oc)
              ]))), 128))
            ]),
            b.availableFoods.length ? (s(), a("label", Fc, [
              ne(e("input", {
                "onUpdate:modelValue": I[11] || (I[11] = (D) => b.onlyAvailable = D),
                type: "checkbox",
                disabled: f(v)
              }, null, 8, Bc), [
                [at, b.onlyAvailable]
              ]),
              I[26] || (I[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : S("", !0)
          ])
        ]),
        e("label", Lc, [
          ne(e("input", {
            "onUpdate:modelValue": I[12] || (I[12] = (D) => M.value = D),
            type: "checkbox",
            disabled: f(v)
          }, null, 8, qc), [
            [at, M.value]
          ]),
          e("span", null, [
            T("使用所选日期的 " + l(ee.value.length) + " 项已记录食物", 1),
            I[30] || (I[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", Vc, [
          ne(e("input", {
            "onUpdate:modelValue": I[13] || (I[13] = (D) => X.value = D),
            type: "checkbox",
            disabled: f(v)
          }, null, 8, Gc), [
            [at, X.value]
          ]),
          I[31] || (I[31] = e("span", null, [
            T("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        I[32] || (I[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给维衡 AI。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        Y.value ? (s(), a("p", Jc, l(Y.value), 1)) : S("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: f(v) || !f(i).trim()
        }, [
          f(v) ? (s(), a("span", Wc)) : (s(), me(F, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          T(l(f(v) ? "正在等待真实检索与计算…" : H.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, Hc)
      ], 32),
      f(v) || f(y).length ? (s(), a("div", Kc, [
        e("div", null, [
          e("strong", null, l(f(v) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          f(v) ? (s(), a("p", Yc, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : S("", !0),
          e("ol", null, [
            (s(!0), a(B, null, G(f(y), (D, oe) => (s(), a("li", { key: oe }, [
              e("strong", null, l(D.label), 1),
              T(" · " + l(D.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : S("", !0),
      f(c) ? (s(), a("div", Xc, [
        I[33] || (I[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, l(f(c)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: f(v),
          onClick: $e
        }, "保留条件并重试", 8, Qc)
      ])) : S("", !0),
      f(m)?.status === "needs_evidence" ? (s(), a("p", Zc, l(f(m).message) + " 请修改备选食物或检索描述。", 1)) : S("", !0),
      H.value ? (s(), a("section", ev, [
        C.value ? (s(), a("p", tv, "方案已修改：下方营养与费用按当前份量重新计算；生成时的文字建议和目标比较已失效。" + l(k.value ? "这批方案已加入草稿，请在饮食记录中继续修改。" : ""), 1)) : S("", !0),
        e("div", nv, [
          e("div", null, [
            e("p", sv, "待确认 · " + l(H.value.date) + " · " + l(E.find((D) => D[0] === H.value.meal)?.[1]), 1),
            e("h3", null, l(H.value.plan.title), 1)
          ]),
          I[34] || (I[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        C.value ? S("", !0) : (s(), a("p", ov, l(H.value.plan.summary), 1)),
        e("p", av, "本次使用 " + l(H.value.contextSummary.itemCount) + " 项已记录食物；" + l(H.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        le.value ? (s(), a("div", {
          key: 2,
          class: he(["vb-campus-cost", { "is-caution": le.value.status === "over_budget" }])
        }, [
          e("h4", null, l(le.value.complete ? "按录入价格估算：约 ¥" + W(le.value.total) : "价格待确认"), 1),
          le.value.budget !== null ? (s(), a("p", lv, "本餐预算 ¥" + l(le.value.budget) + " · " + l(le.value.status === "within_budget" ? "按已录入价格估算在预算内" : le.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : S("", !0),
          le.value.complete ? S("", !0) : (s(), a("p", iv, "已知价格小计约 ¥" + l(W(le.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, l(le.value.basis) + "。" + l(le.value.availability) + "。", 1)
        ], 2)) : S("", !0),
        e("div", rv, [
          (s(!0), a(B, null, G(H.value.plan.items, (D, oe) => (s(), a("article", {
            key: D.foodId,
            class: "vb-agent-item"
          }, [
            e("div", uv, [
              e("div", null, [
                N(on, {
                  food: f(ae)[D.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, l(f(Dt)(f(ae)[D.foodId])), 1),
                e("small", null, l(f(sn)(f(ae)[D.foodId])), 1),
                e("p", null, l(D.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (re) => j(oe)
              }, "移除", 8, dv)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (re) => {
                A.value = oe, _.value = "";
              }
            }, "换一道", 8, cv),
            A.value === oe ? (s(), a("div", vv, [
              ne(e("select", {
                "onUpdate:modelValue": I[14] || (I[14] = (re) => _.value = re),
                "aria-label": "替换食物"
              }, [
                I[35] || (I[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (s(!0), a(B, null, G(p.value, (re) => (s(), a("option", {
                  key: re.key,
                  value: re.key
                }, l(re.name), 9, mv))), 128))
              ], 512), [
                [De, _.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !_.value,
                onClick: (re) => U(oe)
              }, "确认替换", 8, pv),
              p.value.length ? S("", !0) : (s(), a("p", bv, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : S("", !0),
            e("label", fv, [
              I[36] || (I[36] = T("可食部估算克数", -1)),
              e("input", {
                value: D.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (re) => Q(oe, re.target.value)
              }, null, 40, gv),
              I[37] || (I[37] = T("克", -1))
            ]),
            e("p", hv, "本项费用：" + l(le.value?.breakdown[oe]?.cost == null ? "价格未知" : "约 ¥" + W(le.value.breakdown[oe].cost)), 1),
            e("div", yv, [
              (s(), a(B, null, G([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (re) => e("small", {
                key: re.id
              }, l(re.name) + " " + l(W(D.portion[re.id])) + l(D.portion[re.id] !== null ? " " + re.unit : ""), 1)), 64))
            ]),
            e("details", kv, [
              I[39] || (I[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + l(f(ae)[D.foodId]?.state), 1),
              e("p", null, [
                I[38] || (I[38] = T("来源：", -1)),
                f(ae)[D.foodId]?.source ? (s(), a("a", {
                  key: 0,
                  href: f(ae)[D.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, l(D.sourceName) + " · " + l(D.source), 9, wv)) : (s(), a("span", $v, "暂无可核验成分数据"))
              ]),
              e("p", null, l(f(ae)[D.foodId]?.source?.description), 1),
              I[40] || (I[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              D.missing.length ? (s(), a("p", _v, "缺失指标：" + l(D.missing.join("、")), 1)) : S("", !0)
            ])
          ]))), 128))
        ]),
        N(Zt, {
          entries: fe.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        I[45] || (I[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        !C.value && H.value.plan.suggestions.length ? (s(), a("div", Av, [
          I[41] || (I[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (s(!0), a(B, null, G(H.value.plan.suggestions, (D) => (s(), a("li", { key: D }, l(D), 1))), 128))
          ])
        ])) : S("", !0),
        !C.value && H.value.plan.cautions.length ? (s(), a("div", Sv, [
          I[42] || (I[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (s(!0), a(B, null, G(H.value.plan.cautions, (D) => (s(), a("li", { key: D }, l(D), 1))), 128))
          ])
        ])) : S("", !0),
        e("details", Cv, [
          I[43] || (I[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (s(!0), a(B, null, G(H.value.trace, (D, oe) => (s(), a("li", { key: oe }, [
              e("strong", null, l(D.label), 1),
              T(" · " + l(D.inputSummary) + " · " + l(D.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, l(f(Ze)(H.value.model)) + " · " + l(H.value.dataVersion) + " · " + l(new Date(H.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        N(Pn),
        e("div", Iv, [
          I[44] || (I[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: k.value || ue.value,
            onClick: _e
          }, l(k.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, Ev)
        ])
      ])) : S("", !0)
    ]));
  }
}, Uv = { class: "vb-page-title" }, jv = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, Dv = { class: "vb-glass vb-record-prompt" }, Nv = /* @__PURE__ */ Qe({
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
    return (o, n) => (s(), a(B, null, [
      e("div", Uv, [
        n[4] || (n[4] = e("div", null, [
          e("h1", null, "膳食方案"),
          e("p", null, "结合身体档案、饮食记录与就餐条件，安排更适合自己的下一餐。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-soft",
          onClick: n[0] || (n[0] = (u) => o.$emit("navigate", "profile"))
        }, "调整档案与饮食偏好")
      ]),
      t.nutrition ? S("", !0) : (s(), a("section", jv, [...n[5] || (n[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      N(xv, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: n[1] || (n[1] = (u) => o.$emit("add-plan", u))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", Dv, [
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
}), Pv = { class: "vb-page-title" }, Tv = { class: "vb-glass vb-profile-details" }, Mv = { class: "vb-section-heading" }, Rv = { class: "vb-pill" }, zv = { key: 0 }, Ov = { key: 1 }, Fv = { class: "vb-profile-settings" }, Bv = { class: "vb-glass" }, Lv = { class: "vb-section-heading" }, qv = { class: "vb-field" }, Vv = ["value"], Gv = { class: "vb-glass" }, Jv = { class: "vb-section-heading" }, Hv = ["checked", "onChange"], Wv = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String },
  emits: ["edit", "update:flags", "update:preferences"],
  setup(t, { emit: o }) {
    const n = t, u = J(() => Kt.find((m) => m.key === n.profile.activity)), i = o, r = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function d(m, c, v) {
      i("update:flags", c ? [...v, m] : v.filter((y) => y !== m));
    }
    return (m, c) => (s(), a(B, null, [
      e("div", Pv, [
        c[3] || (c[3] = e("div", null, [
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: c[0] || (c[0] = (v) => m.$emit("edit"))
        }, [
          N(F, {
            name: "edit",
            size: 17
          }),
          c[2] || (c[2] = T("修改基础档案", -1))
        ])
      ]),
      e("section", Tv, [
        e("div", Mv, [
          c[4] || (c[4] = e("h2", null, "基础信息", -1)),
          e("span", Rv, l(f(Ue) ? f(wt) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
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
          t.profile.age === 0 ? (s(), a("div", zv, [
            c[7] || (c[7] = e("dt", null, "月龄", -1)),
            e("dd", null, l(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : S("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (s(), a("div", Ov, [
            c[8] || (c[8] = e("dt", null, "生理阶段", -1)),
            e("dd", null, l({ pregnant: "孕期", lactating: "哺乳期", special: "需专业评估" }[t.profile.physiologicalStage]), 1)
          ])) : S("", !0),
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
            e("dd", null, l(u.value?.label || "未填写"), 1)
          ]),
          e("div", null, [
            c[12] || (c[12] = e("dt", null, "活动系数", -1)),
            e("dd", null, l(u.value ? "× " + u.value.factor : "未填写"), 1)
          ])
        ])
      ]),
      e("div", Fv, [
        e("section", Bv, [
          e("div", Lv, [
            c[13] || (c[13] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            N(F, { name: "bowl" })
          ]),
          e("label", qv, [
            c[14] || (c[14] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: c[1] || (c[1] = (v) => m.$emit("update:preferences", v.target.value))
            }, null, 40, Vv)
          ]),
          c[15] || (c[15] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", Gv, [
          e("div", Jv, [
            c[16] || (c[16] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            N(F, { name: "shield" })
          ]),
          (s(), a(B, null, G(r, (v) => e("label", {
            key: v,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(v),
              onChange: (y) => d(v, y.target.checked, t.flags)
            }, null, 40, Hv),
            e("span", null, l(v), 1)
          ])), 64)),
          c[17] || (c[17] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1))
        ])
      ])
    ], 64));
  }
}, Kv = {
  key: 0,
  class: "vb-page-title"
}, Yv = { class: "vb-local-chip" }, Xv = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, Qv = { class: "vb-safety-grid" }, Zv = { class: "vb-icon-badge" }, em = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const o = Ue.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", n = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + o + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (u, i) => (s(), a(B, null, [
      t.embedded ? S("", !0) : (s(), a("div", Kv, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", Yv, [
          N(F, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = T("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (s(), a("section", Xv, [
        N(F, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + l(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : S("", !0),
      e("div", Qv, [
        (s(), a(B, null, G(n, ([r, d, m]) => e("article", {
          key: d,
          class: "vb-glass"
        }, [
          e("span", Zv, [
            N(F, {
              name: r,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, l(d), 1),
          e("p", null, l(m), 1)
        ])), 64))
      ]),
      N(Pn)
    ], 64));
  }
}, tm = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, nm = { class: "vb-glass vb-submission-hero" }, sm = { class: "vb-submission-hero-copy" }, om = { class: "vb-icon-badge" }, am = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, lm = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, im = { class: "vb-submission-step-top" }, rm = { class: "vb-icon-badge" }, um = ["onClick"], dm = { class: "vb-submission-columns" }, cm = { class: "vb-glass vb-submission-panel" }, vm = { class: "vb-submission-boundary" }, mm = { class: "vb-icon-badge" }, pm = { class: "vb-icon-badge" }, bm = { class: "vb-icon-badge" }, fm = { class: "vb-glass vb-submission-panel" }, gm = { class: "vb-inline-note" }, hm = { class: "vb-glass vb-submission-evidence" }, ym = { class: "vb-submission-evidence-actions" }, km = /* @__PURE__ */ Qe({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const o = {
      foodCount: tt.length,
      sourcedCount: tt.filter((u) => !!u.source?.id).length,
      categories: new Set(tt.map((u) => u.category).filter(Boolean)).size
    }, n = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (u, i) => (s(), a(B, null, [
      t.embedded ? S("", !0) : (s(), a("div", tm, [
        i[4] || (i[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "在线评审入口 · 维衡 AI"),
          e("h1", null, "把营养建议放回真实的一餐"),
          e("p", null, "从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: i[0] || (i[0] = (r) => u.$emit("navigate", "mealplan"))
        }, [
          N(F, {
            name: "sparkles",
            size: 17
          }),
          i[3] || (i[3] = T("体验餐食规划 ", -1))
        ])
      ])),
      e("section", nm, [
        e("div", sm, [
          e("span", om, [
            N(F, {
              name: "leaf",
              size: 22
            })
          ]),
          i[5] || (i[5] = e("div", null, [
            e("h2", null, "让营养计算有依据，让饮食安排更贴近日常。"),
            e("p", null, "面向全年龄段，以饮食记录和营养摄入计算为核心。记录食物与份量，查看能量、维生素和矿物质的已知合计与参考依据，再结合预算、忌口和偏好安排下一餐。不同年龄按适用条件分析，缺失值不补0。")
          ], -1))
        ]),
        e("div", am, [
          e("div", null, [
            e("strong", null, l(o.foodCount), 1),
            i[6] || (i[6] = e("span", null, "食物目录条目", -1))
          ]),
          e("div", null, [
            e("strong", null, l(o.sourcedCount), 1),
            i[7] || (i[7] = e("span", null, "有核验来源", -1))
          ]),
          e("div", null, [
            e("strong", null, l(o.categories), 1),
            i[8] || (i[8] = e("span", null, "食物分类", -1))
          ])
        ])
      ]),
      i[18] || (i[18] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("h2", null, "从检索到回顾")
        ])
      ], -1)),
      e("section", lm, [
        (s(), a(B, null, G(n, (r) => e("article", {
          key: r.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", im, [
            e("span", null, l(r.number), 1),
            e("span", rm, [
              N(F, {
                name: r.icon
              }, null, 8, ["name"])
            ])
          ]),
          e("h3", null, l(r.title), 1),
          e("p", null, l(r.copy), 1),
          e("button", {
            class: "vb-text-button",
            onClick: (d) => u.$emit("navigate", r.page)
          }, [
            T(l(r.action), 1),
            N(F, {
              name: "arrow",
              size: 15
            })
          ], 8, um)
        ])), 64))
      ]),
      e("div", dm, [
        e("section", cm, [
          i[12] || (i[12] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", vm, [
            e("article", null, [
              e("span", mm, [
                N(F, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", pm, [
                N(F, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", bm, [
                N(F, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", fm, [
          i[14] || (i[14] = xn('<h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>维衡 AI</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 2)),
          e("p", gm, [
            N(F, {
              name: "info",
              size: 16
            }),
            i[13] || (i[13] = T("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", hm, [
        i[17] || (i[17] = e("div", null, [
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口模拟检查与真实模型调用分开记录，未执行真实调用时不会记作通过。")
        ], -1)),
        e("div", ym, [
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[1] || (i[1] = (r) => u.$emit("navigate", "food"))
          }, [
            N(F, {
              name: "apple",
              size: 16
            }),
            i[15] || (i[15] = T("核对食物来源", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[2] || (i[2] = (r) => u.$emit("navigate", "assessment"))
          }, [
            N(F, {
              name: "report",
              size: 16
            }),
            i[16] || (i[16] = T("查看报告样例", -1))
          ])
        ])
      ])
    ], 64));
  }
}), wm = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], $m = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], _m = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], Am = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, Sm = { class: "vb-reference-list" }, Cm = ["href"], Im = {
  key: 1,
  class: "vb-data-note"
}, Em = { class: "vb-reference-terms" }, xm = {
  __name: "ReferencePanel",
  setup(t) {
    return (o, n) => (s(), a("section", Am, [
      n[8] || (n[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      n[9] || (n[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      n[10] || (n[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", Sm, [
        (s(!0), a(B, null, G(f(wm), (u) => (s(), a("details", {
          key: u.id
        }, [
          e("summary", null, [
            e("strong", null, l(u.title), 1),
            e("span", null, l(u.status), 1)
          ]),
          e("dl", null, [
            e("div", null, [
              n[0] || (n[0] = e("dt", null, "用途与版本", -1)),
              e("dd", null, l(u.kind) + " · " + l(u.version) + " · " + l(u.volume), 1)
            ]),
            e("div", null, [
              n[1] || (n[1] = e("dt", null, "条目定位", -1)),
              e("dd", null, l(u.locator), 1)
            ]),
            e("div", null, [
              n[2] || (n[2] = e("dt", null, "适用范围", -1)),
              e("dd", null, l(u.scope), 1)
            ]),
            e("div", null, [
              n[3] || (n[3] = e("dt", null, "原始单位", -1)),
              e("dd", null, l(u.units), 1)
            ])
          ]),
          u.url ? (s(), a("a", {
            key: 0,
            href: u.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "核对公开来源 ↗", 8, Cm)) : (s(), a("p", Im, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", Em, [
        n[4] || (n[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (s(!0), a(B, null, G(f(_m), ([u, i, r]) => (s(), a("p", { key: u }, [
          e("strong", null, l(u) + " · " + l(i), 1),
          T("：" + l(r), 1)
        ]))), 128)),
        n[5] || (n[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        n[6] || (n[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (s(!0), a(B, null, G(f($m), (u) => (s(), a("li", { key: u }, l(u), 1))), 128))
        ]),
        n[7] || (n[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, Um = { class: "vb-page-title" }, jm = { class: "vb-local-chip" }, Dm = { "aria-labelledby": "about-project-heading" }, Nm = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, Pm = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, Tm = {
  key: 0,
  role: "alert"
}, Mm = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Rm = { class: "vb-reset-actions" }, zm = ["disabled"], Om = ["disabled"], Fm = /* @__PURE__ */ Qe({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const o = P(!1), n = P(!1), u = P("");
    function i() {
      try {
        const d = JSON.parse(Ee.getItem("weiheng.local.v2") || "{}"), m = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: d.profile || null, records: (Array.isArray(d.records) ? d.records : []).map((y) => ({ date: y.date, entries: y.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, c = URL.createObjectURL(new Blob([JSON.stringify(m, null, 2)], { type: "application/json" })), v = document.createElement("a");
        v.href = c, v.download = "维衡-当前档案与食物记录.json", v.click(), setTimeout(() => URL.revokeObjectURL(c), 1e3);
      } catch {
        u.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function r() {
      if (!n.value) {
        n.value = !0, u.value = "";
        try {
          await Is(), window.location.reload();
        } catch {
          u.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", n.value = !1;
        }
      }
    }
    return (d, m) => (s(), a(B, null, [
      e("div", Um, [
        m[5] || (m[5] = e("div", null, [
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", jm, [
          m[4] || (m[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          T(l(f(Ue) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", Dm, [
        m[6] || (m[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ])
        ], -1)),
        N(km, {
          embedded: "",
          onNavigate: m[0] || (m[0] = (c) => d.$emit("navigate", c))
        })
      ]),
      N(xm),
      e("section", Nm, [
        m[7] || (m[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ])
        ], -1)),
        N(em, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", Pm, [
        e("div", null, [
          m[8] || (m[8] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, l(f(Ue) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          m[9] || (m[9] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          u.value ? (s(), a("p", Tm, l(u.value), 1)) : S("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: m[1] || (m[1] = (c) => o.value = !0)
        }, "清空数据并重置")
      ]),
      o.value ? (s(), me(vt, {
        key: 0,
        title: f(Ue) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: m[3] || (m[3] = (c) => !n.value && (o.value = !1))
      }, {
        default: ct(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + l(f(Ue) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          m[10] || (m[10] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          u.value ? (s(), a("p", Mm, l(u.value), 1)) : S("", !0),
          e("div", Rm, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: n.value,
              onClick: m[2] || (m[2] = (c) => o.value = !1)
            }, "取消", 8, zm),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: n.value,
              onClick: r
            }, l(n.value ? "正在清理…" : "确认清空并重置"), 9, Om)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : S("", !0)
    ], 64));
  }
}), Bm = ["data-theme"], Lm = ["inert"], qm = { class: "vb-main" }, Vm = { class: "vb-topbar" }, Gm = { class: "vb-breadcrumb" }, Jm = { class: "vb-topbar-actions" }, Hm = { class: "vb-local-chip" }, Wm = ["aria-label"], Km = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, Ym = { class: "vb-footer" }, Xm = {
  key: 4,
  class: "vb-toast",
  role: "status"
}, np = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: o, theme: n, nutrition: u, records: i, storageError: r, updateProfile: d, saveRecord: m, clearDraftAfterSave: c, addToDraft: v, addPlanToDraft: y, toggleHabit: w } = en(), { toggleTheme: h } = fs(n), { reports: b, reportStorageError: A, loadReports: _, latestReport: k, isStale: C, generateReport: M } = nn();
    _();
    const X = t, Y = J(() => o.flags.includes("孕期或哺乳期") ? { ...o.profile, physiologicalStage: "special" } : o.profile || {}), O = P(X.initialPage), z = P(X.initialEditor), E = P(!1), R = P(null), ee = P(null), H = P(null), fe = P(Se()), le = P(!1), ue = P(""), ve = P(""), $e = P(""), _e = J(() => b.value.find((Z) => Z.id === ve.value) || k(ue.value)), Q = J(() => o.records.find((Z) => Z.date === ue.value)), j = { overview: "概览", dietAssistant: "维衡AI助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, p = J(() => Ue.value ? wt.value === "error" ? "账号同步暂不可用 · 本机副本保留" : wt.value === "syncing" || wt.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let U, W = 0;
    function V(Z, q = null) {
      clearTimeout(U), R.value = { message: Z, undo: q }, U = setTimeout(() => R.value = null, 7e3);
    }
    function I(Z) {
      O.value = Z, window.scrollTo({ top: 0, behavior: "auto" }), Te(() => ee.value?.focus({ preventScroll: !0 }));
    }
    function D() {
      z.value = !1, E.value = !0;
    }
    function oe() {
      E.value = !1;
    }
    function re(Z) {
      const q = d(Z);
      if (q) {
        V(q);
        return;
      }
      z.value = !1, I("overview"), V(Ue.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function de(Z, q = !1) {
      const se = ++W;
      $e.value = "", ue.value = Z.date, ve.value = "";
      try {
        const we = M(Z, Y.value, { force: q });
        await Te();
        const ze = await we;
        se === W && ue.value === Z.date && (ve.value = ze?.id || "");
      } catch (we) {
        se === W && ($e.value = we.message || "分析暂时不可用，请重试。");
      }
    }
    function Re(Z) {
      if (!le.value) {
        le.value = !0;
        try {
          const q = m(Z);
          if (!q.ok) {
            V(q.error);
            return;
          }
          fe.value = q.record.date, c(q.record.date, q.record), V("饮食记录已保存，正在分析"), de(q.record);
        } finally {
          le.value = !1;
        }
      }
    }
    function Ce(Z, q) {
      q ? b.value.find((we) => we.id === q) : k(Z), ue.value = Z, ve.value = q || "", $e.value = "", o.records.find((we) => we.date === Z);
    }
    function et(Z = ue.value) {
      const q = o.records.find((se) => se.date === Z);
      q && de(q, !0);
    }
    function mt(Z) {
      if (!Be(Z.date) || Z.date > Se() || Number(Z.grams) < 0.1 || Number(Z.grams) > 5e3) {
        V("请核对日期与食用克数。");
        return;
      }
      const q = v(Z);
      fe.value = Z.date, H.value = null, I("diary"), V(q ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    async function pt(Z) {
      const q = xe();
      try {
        if (await Ve(Z.items.map((we) => we.foodId)), q !== xe()) return;
      } catch (we) {
        Z.onResult?.({ ok: !1, error: we.message }), V(we.message);
        return;
      }
      const se = y(Z);
      if (Z.onResult?.(se), !se.ok) {
        V(se.error);
        return;
      }
      fe.value = Z.date, I("diary"), V(se.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function bt(Z) {
      const q = o.records.find((se) => se.date === Z);
      q && (o.records = o.records.filter((se) => se.date !== Z), V("这条饮食记录已删除，报告快照仍保留。", () => {
        m(q), R.value = null;
      }));
    }
    return Ye(() => clearTimeout(U)), (Z, q) => (s(), a("div", {
      class: he(["vb-app", { "is-diary": O.value === "diary", "is-chat": O.value === "dietAssistant" }]),
      "data-theme": f(n)
    }, [
      e("div", {
        inert: z.value || H.value || ue.value || void 0
      }, [
        N(gs, {
          active: O.value,
          onNavigate: I
        }, null, 8, ["active"]),
        e("div", qm, [
          e("header", Vm, [
            e("span", Gm, [
              q[15] || (q[15] = e("span", null, "营养工作台", -1)),
              q[16] || (q[16] = e("i", null, "/", -1)),
              T(l(j[O.value]), 1)
            ]),
            e("div", Jm, [
              e("span", Hm, [
                q[17] || (q[17] = e("i", { class: "vb-status-dot" }, null, -1)),
                T(l(p.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                onClick: D
              }, l(f(Ue) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": f(n) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: q[0] || (q[0] = (...se) => f(h) && f(h)(...se))
              }, [
                N(F, {
                  name: f(n) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, Wm),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: q[1] || (q[1] = (se) => I("profile"))
              }, [
                N(F, {
                  name: "person",
                  size: 18
                })
              ])
            ])
          ]),
          e("main", {
            ref_key: "content",
            ref: ee,
            class: "vb-content",
            tabindex: "-1"
          }, [
            f(r) || f(A) ? (s(), a("p", Km, l(f(r) || f(A)), 1)) : S("", !0),
            (s(), a(B, { key: 1 }, [
              ne(N(Ti, {
                active: O.value === "dietAssistant",
                records: f(o).records,
                targets: f(u),
                profile: Y.value,
                "initial-date": fe.value
              }, null, 8, ["active", "records", "targets", "profile", "initial-date"]), [
                [rs, O.value === "dietAssistant"]
              ]),
              O.value === "overview" ? (s(), me(hs, {
                key: 0,
                profile: Y.value,
                nutrition: f(u),
                "record-count": f(i).length,
                records: f(i),
                reports: f(b),
                onEdit: q[2] || (q[2] = (se) => z.value = !0),
                onNavigate: I
              }, null, 8, ["profile", "nutrition", "record-count", "records", "reports"])) : S("", !0),
              O.value === "assessment" ? (s(), me(Ar, {
                key: 1,
                records: f(i),
                habits: f(o).habits,
                flags: f(o).flags,
                reports: f(b),
                profile: Y.value,
                onNavigate: I,
                onToggleHabit: f(w),
                onOpenReport: Ce,
                onRetryReport: et
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : O.value === "diary" ? (s(), me(ed, {
                key: 2,
                records: f(i),
                reports: f(b),
                profile: Y.value,
                nutrition: f(u),
                "initial-date": fe.value,
                saving: le.value,
                onSave: Re,
                onRemove: bt,
                onAnalysis: Ce,
                onBrowse: q[3] || (q[3] = (se) => I("food")),
                onDetail: q[4] || (q[4] = (se) => H.value = f(ae)[se])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving"])) : O.value === "food" ? (s(), me(ic, {
                key: 3,
                onDetail: q[5] || (q[5] = (se) => H.value = f(ae)[se])
              })) : O.value === "mealplan" ? (s(), me(Nv, {
                key: 4,
                nutrition: f(u),
                preferences: f(o).preferences,
                flags: f(o).flags,
                profile: Y.value,
                records: f(o).records,
                onNavigate: I,
                onAddPlan: pt
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : O.value === "profile" ? (s(), me(Wv, {
                key: 5,
                profile: Y.value,
                nutrition: f(u),
                flags: f(o).flags,
                "onUpdate:flags": q[6] || (q[6] = (se) => f(o).flags = se),
                preferences: f(o).preferences,
                "onUpdate:preferences": q[7] || (q[7] = (se) => f(o).preferences = se),
                onEdit: q[8] || (q[8] = (se) => z.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences"])) : O.value === "about" ? (s(), me(Fm, {
                key: 6,
                flags: f(o).flags,
                onNavigate: I
              }, null, 8, ["flags"])) : S("", !0)
            ], 64)),
            e("footer", Ym, [
              N(F, {
                name: "leaf",
                size: 14
              }),
              q[18] || (q[18] = T("维衡 AI · 把健康，放进每一餐", -1)),
              q[19] || (q[19] = e("span", null, "营养信息仅供一般参考 · © 2026 维衡 AI 版权所有", -1))
            ])
          ], 512)
        ])
      ], 8, Lm),
      z.value ? (s(), me(ko, {
        key: 0,
        profile: f(o).profile,
        onComplete: re,
        onClose: q[9] || (q[9] = (se) => z.value = !1),
        onLogin: D
      }, null, 8, ["profile"])) : S("", !0),
      E.value ? (s(), me(ys, {
        key: 1,
        onClose: oe
      })) : S("", !0),
      H.value ? (s(), me(ba, {
        key: 2,
        "food-id": H.value.key,
        onClose: q[10] || (q[10] = (se) => H.value = null),
        onAdd: mt
      }, null, 8, ["food-id"])) : S("", !0),
      ue.value ? (s(), me(Wa, {
        key: 3,
        report: _e.value,
        record: Q.value,
        stale: _e.value ? f(C)(_e.value, Q.value, Y.value) : !1,
        error: $e.value,
        onClose: q[11] || (q[11] = (se) => {
          ue.value = "", ve.value = "";
        }),
        onRetry: q[12] || (q[12] = (se) => et())
      }, null, 8, ["report", "record", "stale", "error"])) : S("", !0),
      R.value ? (s(), a("div", Xm, [
        N(F, {
          name: "check",
          size: 17
        }),
        e("span", null, l(R.value.message), 1),
        R.value.undo ? (s(), a("button", {
          key: 0,
          onClick: q[13] || (q[13] = (...se) => R.value.undo && R.value.undo(...se))
        }, "撤销")) : S("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: q[14] || (q[14] = (se) => R.value = null)
        }, [
          N(F, {
            name: "close",
            size: 15
          })
        ])
      ])) : S("", !0)
    ], 10, Bm));
  }
};
export {
  np as default
};
