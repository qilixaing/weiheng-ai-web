import { r as D, a as H, b as ot, w as ve, o, d as a, e, F as L, f as J, n as Sn, g as ge, h as Et, i as U, j as A, k as Be, t as l, l as pe, m as te, v as ce, p as P, u as b, q as Ue, s as Me, x as We, y as as, z as ut, A as Ye, B as ke, C as nt, D as ls, E as In, G as Dt, H as is } from "./vue-runtime-BJOX_u7T.js";
import { v as Oe, t as _e, F as oe, c as xt, r as at, n as rs, m as us, a as Vt, b as lt, A as Wt, d as En, e as Le, f as xn, g as At, M as Te, h as Kt, i as Ct, j as Un, _ as F, p as ds, s as jn, k as yt, l as un, N as cs, o as Fe, q as vs, C as Nt, G as Dn, u as qt, w as Yt, x as dn, P as Pt, R as ms, y as Mt, z as ps, B as cn, D as Qe, E as gt, H as Nn, I as vn, J as bs, K as fs, L as gs, O as hs } from "./useThemeTransition-s6aVG0oE.js";
import { s as it, a as Ee, o as ys, b as Ce, t as Pn, c as ks, d as Ie, e as ws, f as $s, g as _s, h as kt } from "./main-CyTpJLTw.js";
import { _ as Xt, a as Mn, b as As } from "./IntakeAnalysis-soWajjHV.js";
function Cs(t, s) {
  if (!s || !Oe(s.date) || s.date > _e() || !["breakfast", "lunch", "dinner", "snack", "unspecified"].includes(s.meal) || !Array.isArray(s.items) || !s.items.length || s.items.length > 8) throw new Error("请核对方案日期、餐次和食物列表。");
  const n = String(s.confirmationId || "").slice(0, 100);
  if (!n) throw new Error("方案缺少确认编号，请重新生成。");
  if (t.appliedBatches?.includes(n)) return { draft: t, duplicate: !0 };
  const u = s.items.map((i) => {
    const r = oe[i.foodId], d = Number(i.grams);
    if (!r || !Number.isFinite(d) || d < 0.1 || d > 5e3) throw new Error("方案含无效食物或克数，未加入记录。");
    return { id: n + ":" + r.key, foodId: r.key, name: r.name, grams: d, meal: s.meal, group: r.group, source: "catalogue", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: xt(r) };
  });
  if (new Set(u.map((i) => i.foodId)).size !== u.length) throw new Error("方案含重复食物，未加入记录。");
  return { draft: { ...t, entries: [...t.entries || [], ...u], appliedBatches: [...t.appliedBatches || [], n] }, duplicate: !1 };
}
const st = it("weiheng.reset-signal.v1"), Tn = (t) => ys(t);
let He = !1;
const Ke = () => He;
typeof window < "u" && window.addEventListener("storage", (t) => {
  if (!(t.key !== st || !t.newValue))
    try {
      const { phase: s } = JSON.parse(t.newValue);
      s === "begin" && (He = !0), s === "abort" && (He = !1), s === "done" && (He = !0, window.location.reload());
    } catch {
    }
});
function mn(t, s) {
  return new Promise((n, u) => {
    const i = t.open(s);
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
function pn(t, s = !1) {
  const n = Array.from({ length: t.length }, (u, i) => t.key(i));
  for (const u of n) u && Tn(u) && !(s && u === st) && t.removeItem(u);
}
async function Ss({
  local: t = globalThis.localStorage,
  session: s = globalThis.sessionStorage,
  databases: n = globalThis.indexedDB,
  caches: u = globalThis.caches
} = {}) {
  if (He) throw new Error("正在清理本地数据，请稍候。");
  He = !0;
  const i = (r) => t.setItem(st, JSON.stringify({ phase: r, time: Date.now() }));
  try {
    if (i("begin"), globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-begin")), Ee.value && !(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok)
      throw new Error("账号数据暂时无法清理，请检查连接后重试。");
    if (!n) throw new Error("浏览器无法访问本地文件存储，暂时不能完成全部重置。");
    if (await Promise.all([
      mn(n, it("weiheng.media.v1")),
      mn(n, it("weiheng.chat-attachments.v1"))
    ]), u) for (const r of await u.keys()) Tn(r) && await u.delete(r);
    s && pn(s), pn(t, !0), i("done"), t.removeItem(st);
  } catch (r) {
    try {
      i("abort"), t.removeItem(st);
    } catch {
    }
    throw He = !1, globalThis.window?.dispatchEvent?.(new Event("weiheng-reset-abort")), r;
  }
}
const St = "weiheng.local.v2", Rn = "weiheng.theme.v1", Ge = (t) => t == null || typeof t == "string" && t.trim() === "" ? void 0 : Number.isFinite(Number(t)) ? Number(t) : void 0;
function bn(t) {
  if (!t) return null;
  const s = ["male", "男", "男性"].includes(t.sex || t.gender) ? "male" : ["female", "女", "女性"].includes(t.sex || t.gender) ? "female" : "", n = (
    /** @type {Record<string,string>} */
    { low: "sedentary", high: "heavy", active: "heavy" }
  ), u = Wt.some((r) => r.key === t.activity) ? t.activity : n[String(t.activity)] || "";
  if (lt({ ...t, sex: s, activity: u })) return null;
  const i = { ...t, sex: s, age: Ge(t.age), height: Ge(t.height), weight: Ge(t.weight), activity: u };
  return lt(i) ? null : { ...i, sex: (
    /** @type {'male'|'female'} */
    s
  ), activity: String(u) };
}
function zn() {
  const t = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: "" };
  try {
    const s = JSON.parse(Ce.getItem(St) || "null");
    if (s && typeof s == "object") {
      for (const i of [...Array.isArray(s.records) ? s.records : [], ...Object.values(s.drafts || {})]) for (const r of Array.isArray(i?.entries) ? i.entries : []) r.foodId === "cabbage" && r.name === "白菜" && (r.referenceConfirmed = !1);
      return { ...t, ...s, drafts: s.drafts && typeof s.drafts == "object" ? s.drafts : {}, profile: bn(s.profile), records: Array.isArray(s.records) ? s.records : [] };
    }
    const n = JSON.parse(Ce.getItem("vitabalance.v1") || Ce.getItem("vitabalance.guest.v1") || "null"), u = [["medication", "正在使用药物"], ["condition", "有需要管理的健康状况"], ["special", "孕期或哺乳期"], ["supplements", "正在使用营养补充剂"]];
    return n ? { ...t, profile: bn(n.profile), records: Array.isArray(n.records) ? n.records : [], plans: Array.isArray(n.plans) ? n.plans : [], flags: u.filter(([i]) => n.profile?.[i]).map(([, i]) => i), preferences: [n.profile?.avoid, n.profile?.allergies ? "需要核对的过敏或不耐受项：" + n.profile.allergies : ""].filter(Boolean).join("；") } : t;
  } catch {
    return t;
  }
}
const be = ot(zn()), Je = D("");
let Gt = !1;
typeof window < "u" && window.addEventListener("weiheng-account-synced", () => {
  Gt = !0;
  try {
    Object.assign(be, zn());
  } finally {
    Gt = !1;
  }
});
const Is = (() => {
  try {
    return Ce.getItem(Rn);
  } catch {
    return null;
  }
})(), On = D(Is === "dark" ? "dark" : "light"), wt = H(() => En(be.flags.includes("孕期或哺乳期") ? null : be.profile));
ve(be, () => {
  if (!(Ke() || Gt))
    try {
      Ce.setItem(St, JSON.stringify({ ...be, calculated: wt.value })), Je.value = "";
    } catch {
      Je.value = "浏览器未能保存，请检查本地存储空间或隐私设置。";
    }
}, { deep: !0, flush: "sync" });
ve(On, (t) => {
  if (!Ke())
    try {
      Ce.setItem(Rn, t);
    } catch {
      Je.value = "主题偏好暂时无法保存。";
    }
});
function Qt() {
  const t = H(() => [...be.records].sort((c, v) => v.date.localeCompare(c.date)));
  function s(c) {
    const v = lt(c);
    return v || (be.profile = { ...be.profile, sex: c.sex || "", ageMonths: Ge(c.ageMonths), physiologicalStage: c.physiologicalStage || "general", age: Ge(c.age), height: Ge(c.height), weight: Ge(c.weight), activity: c.activity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, "");
  }
  function n(c) {
    if (Ke()) return { ok: !1, error: "正在重置本地数据，已停止保存。" };
    if (!Oe(c.date)) return { ok: !1, error: "请选择有效日期。" };
    const v = be.records.find((f) => f.date === c.date), g = Array.isArray(c.entries) ? us(c, v) : (
      /** @type {DailyRecord} */
      { ...c, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
    );
    if (v && Vt(v) === Vt(g)) return { ok: !0, record: v, unchanged: !0 };
    const k = [...be.records.filter((f) => f.date !== g.date), g];
    try {
      Ce.setItem(St, JSON.stringify({ ...be, records: k, calculated: wt.value }));
    } catch {
      return Je.value = "保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。", { ok: !1, error: Je.value };
    }
    return be.records = k, { ok: !0, record: g };
  }
  function u(c, v) {
    const g = i(c);
    g && (g.savedEntries = JSON.parse(JSON.stringify(Array.isArray(v?.entries) ? v.entries : [])), g.entries = [], g.recognition = null, g.appliedBatches = []);
  }
  function i(c) {
    if (!Oe(c)) return null;
    if (!be.drafts[c]) {
      const v = be.records.find((g) => g.date === c);
      be.drafts[c] = { date: c, entries: at(v), notes: v?.notes || "", photoId: v?.photoId || null, recognition: null, appliedBatches: [] };
    }
    return be.drafts[c];
  }
  function r(c) {
    const v = i(c.date);
    if (!v) return !1;
    const g = oe[c.foodId || ""];
    return v.entries.push({ id: crypto.randomUUID(), foodId: c.foodId || null, name: g?.name || c.name || "", grams: Number(c.grams), meal: c.meal || "unspecified", group: c.group, source: c.source || "catalogue", estimated: !!c.estimated, referenceConfirmed: !0, nutritionSnapshot: rs(c.nutritionSnapshot, g?.key) || xt(g) }), !Je.value;
  }
  function d(c, v) {
    const g = new Set(be.habits[c] || []);
    g.has(v) ? g.delete(v) : g.add(v), be.habits[c] = [...g];
  }
  function m(c) {
    if (Ke()) return { ok: !1, error: "正在重置数据，暂停添加。" };
    try {
      const v = be.drafts[c.date] || { date: c.date, entries: at(be.records.find((f) => f.date === c.date)), appliedBatches: [] }, g = Cs(v, c);
      if (g.duplicate) return { ok: !0, duplicate: !0 };
      const k = { ...be.drafts, [c.date]: g.draft };
      return Ce.setItem(St, JSON.stringify({ ...be, drafts: k, calculated: wt.value })), be.drafts = k, { ok: !0, duplicate: !1 };
    } catch (v) {
      return { ok: !1, error: v.message || "方案保存失败，请保留当前页。" };
    }
  }
  return { state: be, theme: On, nutrition: wt, records: t, storageError: Je, updateProfile: s, saveRecord: n, clearDraftAfterSave: u, ensureDraft: i, addToDraft: r, addPlanToDraft: m, toggleHabit: d };
}
let Tt;
function Es() {
  return Tt || (Tt = new Promise((t, s) => {
    if (!globalThis.indexedDB) {
      s(new Error("此浏览器无法使用本地照片和报告存储。"));
      return;
    }
    const n = indexedDB.open(it("weiheng.media.v1"), 1);
    n.onupgradeneeded = () => {
      const u = n.result;
      for (const i of ["photos", "reports"]) u.objectStoreNames.contains(i) || u.createObjectStore(i, { keyPath: "id" });
    }, n.onsuccess = () => t(n.result), n.onerror = () => s(new Error("无法打开本地存储，请检查浏览器隐私设置。")), n.onblocked = () => s(new Error("本地存储被其他页面占用，请关闭旧页面后重试。"));
  })), Tt;
}
async function Ut(t, s, n) {
  const u = await Es();
  if (s === "readwrite" && Ke()) throw new Error("正在重置本地数据，已停止保存。");
  return new Promise((i, r) => {
    const d = u.transaction(t, s);
    let m;
    const c = n(d.objectStore(t));
    c.onsuccess = () => {
      m = c.result;
    }, d.oncomplete = () => i(m), d.onabort = d.onerror = () => r(new Error("本地存储写入失败，可能空间不足；饮食记录与现有报告不会被删除。"));
  });
}
const Jt = (t, s) => Ut(t, "readwrite", (n) => n.put(JSON.parse(JSON.stringify(s)))), xs = (t, s) => Ut(t, "readonly", (n) => n.get(s)), Us = (t) => Ut(t, "readonly", (s) => s.getAll()), js = (t, s) => Ut(t, "readwrite", (n) => n.delete(s));
async function rt(t, s) {
  const n = t === "recognize" ? 15e4 : 9e4;
  let u;
  try {
    u = await fetch("/api/ai/" + t, { method: s === void 0 ? "GET" : "POST", headers: s === void 0 ? {} : { "Content-Type": "application/json" }, body: s === void 0 ? void 0 : JSON.stringify(s), signal: Pn(n) });
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
async function Fn(t, s, n, u) {
  const i = Pn(9e4), r = u ? ks([u, i]) : i;
  let d;
  try {
    d = await fetch("/api/ai/" + t, { method: "POST", headers: { "Content-Type": "application/json", Accept: "text/event-stream" }, body: JSON.stringify({ .../** @type {Record<string, unknown>} */
    s, stream: !0 }), signal: r });
  } catch (p) {
    throw new Error(p?.name === "TimeoutError" ? "AI 请求等待超时，可以重试；已保存的记录不受影响。" : "无法连接 AI 服务，请检查后端是否启动及网络连接。");
  }
  if (!d.ok) {
    let p;
    try {
      p = await d.json();
    } catch {
      throw new Error("后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。");
    }
    const S = new Error(p.error || "AI 服务暂时不可用。");
    throw S.code = p.code, S;
  }
  if (!d.body) throw new Error("浏览器没有提供流式读取能力，请更新浏览器后重试。");
  const m = d.body.getReader(), c = new TextDecoder();
  let v = "", g = !1, k = null;
  const f = (p) => {
    const S = p.split(/\r?\n/).filter((w) => w.startsWith("data:")).map((w) => w.slice(5).trimStart()).join(`
`);
    if (!S) return;
    let h;
    try {
      h = JSON.parse(S);
    } catch {
      throw new Error("AI 流式响应格式异常，请重试。");
    }
    if (h?.type === "error") {
      const w = new Error(h.message || "AI 暂时无法回复，请重试。");
      throw w.code = h.code, w;
    }
    if (h?.type === "progress" && h.step) {
      n(h);
      return;
    }
    if (h?.type === "status" && typeof h.message == "string") {
      n(h);
      return;
    }
    if (h?.type === "delta" && typeof h.text == "string") {
      n(h);
      return;
    }
    h?.type === "done" && typeof h.model == "string" && (k = h, g = !0, n(h));
  };
  try {
    for (; !g; ) {
      const { value: p, done: S } = await m.read();
      if (S) break;
      v += c.decode(p, { stream: !0 });
      let h;
      for (; (h = v.search(/\r?\n\r?\n/)) >= 0; ) {
        const w = v.slice(h).match(/^\r?\n\r?\n/)[0];
        if (f(v.slice(0, h)), v = v.slice(h + w.length), g) break;
      }
    }
    if (v += c.decode(), v.trim() && !g && f(v), !g || !k) throw new Error("AI 流式连接提前结束，请重试。");
    return k;
  } finally {
    m.releaseLock();
  }
}
async function Ds(t, s) {
  const n = await Fn("meal-plan", t, (u) => {
    u.type === "progress" && s(u.step);
  });
  if (!n.result || !["ready", "needs_evidence"].includes(n.result.status)) throw new Error("方案响应不完整，请保留输入并重试。");
  return n.result;
}
const Ve = D([]), It = D(""), Rt = /* @__PURE__ */ new Map();
let zt;
function Zt(t) {
  return t instanceof Error ? t.message : "报告暂时无法保存，请检查浏览器存储权限。";
}
function Ns(t) {
  return t.filter((s) => {
    const n = s.referenceConfirmed === !1 ? void 0 : oe[s.foodId || ""];
    return Te.some((u) => {
      const i = Kt(s, n, u.id);
      return typeof i.value != "number" && !i.range;
    });
  });
}
function fn(t) {
  Ve.value = [t, ...Ve.value.filter((s) => s.id !== t.id)].sort((s, n) => n.requestedAt.localeCompare(s.requestedAt));
}
async function $t(t) {
  try {
    await Jt("reports", t), It.value = "", fn(t);
  } catch (s) {
    throw It.value = Zt(s), fn({ ...t, persistenceFailed: !0 }), s;
  }
}
function Bn() {
  return zt || (zt = (async () => {
    try {
      Ve.value = (await Us("reports")).sort((t, s) => s.requestedAt.localeCompare(t.requestedAt));
      for (const t of [...Ve.value])
        t.status === "pending" && await $t({
          ...t,
          status: "interrupted",
          error: "上次分析在完成前中断，请重试。"
        });
    } catch (t) {
      It.value = Zt(t);
    }
  })()), zt;
}
function Ps(t) {
  return Ve.value.find((s) => s.date === t);
}
function Ms(t, s, n) {
  return !s || t.dataVersion !== xn(s, n);
}
async function Ts(t, s, { force: n = !1 } = {}) {
  const u = Ie();
  if (await Le(at(t).filter((f) => f.foodId && !f.nutritionSnapshot).map((f) => String(f.foodId))), Ie() !== u || (await Bn(), Ie() !== u)) return;
  const i = xn(t, s), r = `${u}:${t.date}:${i}`, d = Rt.get(r);
  if (d) return d;
  const m = Ve.value.find(
    (f) => f.date === t.date && f.dataVersion === i && f.status === "complete" && !f.persistenceFailed
  );
  if (m && !n) return m;
  const c = {
    sex: s?.sex,
    age: s?.age,
    height: s?.height,
    weight: s?.weight,
    activity: s?.activity,
    ageMonths: s?.ageMonths,
    physiologicalStage: s?.physiologicalStage
  }, v = at(t), g = {
    id: crypto.randomUUID(),
    date: t.date,
    recordVersion: Vt(t),
    dataVersion: i,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    generatedAt: null,
    status: "pending",
    snapshot: {
      entries: v,
      intake: At(v),
      profile: c
    },
    result: null,
    error: ""
  }, k = (async () => {
    await $t(g);
    try {
      const f = await rt("analyze-day", {
        date: t.date,
        entries: v,
        profile: c,
        requestId: g.id
      });
      if (Ie() !== u) return;
      const p = Ns(v);
      if (p.length) {
        const w = f.calculation?.estimation, $ = w?.foods || [];
        if (!(w?.status === "complete" && w.missingFoodCount === p.length && $.length === p.length && p.every((X) => {
          const R = $.find((T) => T.entryId === String(v.indexOf(X))), M = X.referenceConfirmed === !1 ? void 0 : oe[X.foodId || ""], V = Te.filter((T) => {
            const O = Kt(X, M, T.id);
            return typeof O.value != "number" && !O.range;
          }).map((T) => T.id);
          return !!(R && V.every((T) => {
            const O = R.values[T], de = Te.find((K) => K.id === T);
            return O && de && Ct(O, de.unit) !== null;
          }));
        })))
          throw new Error("AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。");
      }
      const S = Un(v, f.calculation?.estimation?.foods || [], { model: f.model, generatedAt: f.generatedAt }), h = At(S);
      await $t({
        ...g,
        snapshot: { ...g.snapshot, entries: S, intake: h },
        status: "complete",
        generatedAt: f.generatedAt,
        model: f.model,
        result: f.analysis,
        calculation: f.calculation ? { ...f.calculation, intake: h } : f.calculation
      });
    } catch (f) {
      if (Ie() !== u) return;
      await $t({ ...g, status: "failed", error: Zt(f) });
    }
    return Ve.value.find((f) => f.id === g.id);
  })();
  Rt.set(r, k);
  try {
    return await k;
  } finally {
    Rt.delete(r);
  }
}
function en() {
  return {
    reports: Ve,
    reportStorageError: It,
    loadReports: Bn,
    latestReport: Ps,
    isStale: Ms,
    generateReport: Ts
  };
}
const Rs = ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"], zs = {
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
  setup(t, { emit: s }) {
    const n = t, u = s, i = D(null), r = D(!1), d = H(() => (n.max - n.min) * 0.16), m = H(() => {
      const w = Number(n.modelValue);
      return String(n.modelValue).trim() && Number.isFinite(w) ? Math.min(n.max, Math.max(n.min, w)) : n.fallback;
    }), c = H(() => {
      const w = (m.value - n.min) / d.value, $ = w - Math.round(w);
      return Array.from({ length: 31 }, (z, X) => ({
        key: X,
        major: X % 5 === 0,
        left: `${50 + (X - 15 - $) / 30 * 100}%`
      }));
    });
    let v = null;
    function g(w) {
      const $ = Math.round((w - n.min) / n.step), z = n.step < 1 ? 1 : 0;
      return Number(Math.min(n.max, Math.max(n.min, n.min + $ * n.step)).toFixed(z));
    }
    function k(w) {
      u("update:modelValue", g(w));
    }
    function f(w) {
      w.pointerType === "mouse" && w.button !== 0 || (w.preventDefault(), i.value.setPointerCapture(w.pointerId), r.value = !0, v = { x: w.clientX, value: m.value });
    }
    function p(w) {
      if (!v || !r.value) return;
      const $ = i.value.getBoundingClientRect().width || 1;
      k(v.value + (w.clientX - v.x) / $ * d.value);
    }
    function S() {
      r.value = !1, v = null;
    }
    function h(w) {
      const $ = {
        ArrowRight: n.step,
        ArrowUp: n.step,
        ArrowLeft: -n.step,
        ArrowDown: -n.step,
        PageUp: n.step * 10,
        PageDown: -n.step * 10
      };
      w.key === "Home" ? (w.preventDefault(), k(n.min)) : w.key === "End" ? (w.preventDefault(), k(n.max)) : $[w.key] && (w.preventDefault(), k(m.value + $[w.key]));
    }
    return (w, $) => (o(), a("div", {
      ref_key: "ruler",
      ref: i,
      class: ge(["vb-ruler", { "is-dragging": r.value }]),
      role: "slider",
      tabindex: "0",
      "aria-label": `${t.label}刻度`,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": m.value,
      "aria-valuetext": `${m.value} ${t.unit}`,
      "aria-orientation": "horizontal",
      onPointerdown: f,
      onPointermove: p,
      onPointerup: S,
      onPointercancel: S,
      onLostpointercapture: S,
      onKeydown: h
    }, [
      $[0] || ($[0] = e("span", { class: "vb-ruler-line" }, null, -1)),
      (o(!0), a(L, null, J(c.value, (z) => (o(), a("i", {
        key: z.key,
        class: ge({ major: z.major }),
        style: Sn({ left: z.left })
      }, null, 6))), 128)),
      $[1] || ($[1] = e("span", { class: "vb-ruler-indicator" }, null, -1))
    ], 42, Rs));
  }
}, Os = { class: "vb-dialog-overlay" }, Fs = { class: "vb-wizard-top" }, Bs = { class: "vb-icon-badge" }, Ls = ["aria-valuenow", "aria-label"], Vs = { class: "vb-wizard-copy" }, qs = { class: "vb-small-label" }, Gs = { id: "vb-wizard-title" }, Js = { id: "vb-step-hint" }, Hs = {
  key: 0,
  class: "vb-sex-field"
}, Ws = { class: "vb-sr-only" }, Ks = ["aria-pressed", "onClick"], Ys = { class: "vb-person-symbol" }, Xs = { class: "vb-choice-check" }, Qs = {
  key: 1,
  class: "vb-number-step"
}, Zs = { for: "vb-step-number" }, eo = { class: "vb-number-control" }, to = ["inputmode", "min", "max", "step", "placeholder", "aria-invalid", "aria-describedby"], no = {
  key: 0,
  class: "vb-field"
}, so = { class: "vb-input-range" }, oo = {
  key: 2,
  class: "vb-activity-field"
}, ao = { class: "vb-sr-only" }, lo = ["aria-pressed", "onClick"], io = { class: "vb-activity-icon" }, ro = { class: "vb-radio-mark" }, uo = { key: 0 }, co = {
  key: 3,
  class: "vb-field"
}, vo = {
  key: 4,
  class: "vb-skip-row"
}, mo = {
  id: "vb-step-error",
  class: "vb-field-error",
  "aria-live": "polite"
}, po = { class: "vb-wizard-actions" }, bo = ["disabled"], fo = {
  class: "vb-button vb-button-primary",
  type: "submit"
}, go = { class: "vb-wizard-account-login" }, ho = { class: "vb-wizard-privacy" }, yo = {
  __name: "ProfileWizard",
  props: { profile: { type: Object, default: null } },
  emits: ["complete", "close", "login"],
  setup(t, { emit: s }) {
    const n = t, u = s, i = ot(n.profile ? { ...n.profile } : { sex: "", age: "", height: "", weight: "", activity: "", physiologicalStage: "general" }), r = D(0), d = D(""), m = D(null), c = [
      { key: "sex", title: "先认识一下你", question: "你的生理性别是？", hint: "用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。" },
      { key: "age", title: "处于哪个人生阶段？", question: "你的年龄", unit: "岁", placeholder: "26", min: 0, max: 120, hint: "支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。" },
      { key: "height", title: "从身体的尺度开始", question: "你的身高", unit: "cm", placeholder: "170", min: 100, max: 250, hint: "脱鞋后的身高，精确到 0.1 cm 即可。" },
      { key: "weight", title: "记录现在的自己", question: "你目前的体重", unit: "kg", placeholder: "65", min: 25, max: 300, hint: "使用近期测量值，不需要填写目标体重。" },
      { key: "activity", title: "最后，看看日常节奏", question: "你的每日活动水平", hint: "综合工作、走动与运动选择最接近的一项。" }
    ], v = H(() => {
      const w = c[r.value], $ = ds(i.age)[w.key];
      return $ ? { ...w, min: $[0], max: $[1] } : w;
    });
    function g() {
      if (r.value === 0 || r.value === 4 || !String(i[v.value.key] ?? "").trim()) return "";
      const w = Number(i[v.value.key]);
      return !Number.isFinite(w) || w < v.value.min || w > v.value.max || r.value === 1 && !Number.isInteger(w) ? `请输入 ${v.value.min}–${v.value.max} ${v.value.unit}${r.value === 1 ? "的整数年龄" : "范围内的数值"}` : "";
    }
    function k(w) {
      i.sex = w, d.value = "";
    }
    function f() {
      i[v.value.key] = "", d.value = "", r.value < 4 && r.value++;
    }
    function p() {
      if (d.value = g(), !d.value) {
        if (r.value < 4) {
          r.value++;
          return;
        }
        d.value = lt(i), d.value || u("complete", { ...i });
      }
    }
    function S() {
      Me(() => m.value?.querySelector(".vb-step-input, .vb-choice-button, .vb-activity-choice")?.focus());
    }
    ve(r, () => {
      d.value = "", S();
    }), Et(S);
    function h(w) {
      if (w.key === "Escape" && n.profile) {
        u("close");
        return;
      }
      if (w.key !== "Tab") return;
      const $ = [...m.value.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]")], z = $[0], X = $.at(-1);
      w.shiftKey && document.activeElement === z ? (w.preventDefault(), X.focus()) : !w.shiftKey && document.activeElement === X && (w.preventDefault(), z.focus());
    }
    return (w, $) => (o(), a("div", Os, [
      e("section", {
        ref_key: "dialog",
        ref: m,
        class: "vb-wizard",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "vb-wizard-title",
        "aria-describedby": "vb-step-hint",
        onKeydown: h
      }, [
        e("div", Fs, [
          e("span", Bs, [
            U(F, { name: "leaf" })
          ]),
          $[10] || ($[10] = e("span", null, "建立你的营养档案", -1)),
          t.profile ? (o(), a("button", {
            key: 0,
            class: "vb-icon-button",
            "aria-label": "关闭档案编辑",
            onClick: $[0] || ($[0] = (z) => w.$emit("close"))
          }, [
            U(F, { name: "close" })
          ])) : A("", !0)
        ]),
        e("div", {
          class: "vb-wizard-progress",
          role: "progressbar",
          "aria-valuenow": r.value + 1,
          "aria-valuemin": "1",
          "aria-valuemax": "5",
          "aria-label": `档案设置，第 ${r.value + 1} 步，共 5 步`
        }, [
          (o(), a(L, null, J(5, (z) => e("span", {
            key: z,
            class: ge({ filled: z <= r.value + 1 })
          }, null, 2)), 64))
        ], 8, Ls),
        e("form", {
          onSubmit: Be(p, ["prevent"])
        }, [
          e("div", Vs, [
            e("span", qs, "第 " + l(r.value + 1) + " 步 / 共 5 步", 1),
            e("h2", Gs, l(v.value.title), 1),
            e("p", Js, l(v.value.hint), 1)
          ]),
          r.value === 0 ? (o(), a("fieldset", Hs, [
            e("legend", Ws, l(v.value.question), 1),
            (o(), a(L, null, J([["male", "男性"], ["female", "女性"]], ([z, X]) => e("button", {
              key: z,
              type: "button",
              class: ge(["vb-choice-button", { selected: i.sex === z }]),
              "aria-pressed": i.sex === z,
              onClick: (R) => k(z)
            }, [
              e("span", Ys, l(z === "male" ? "♂" : "♀"), 1),
              e("strong", null, l(X), 1),
              e("span", Xs, [
                i.sex === z ? (o(), pe(F, {
                  key: 0,
                  name: "check",
                  size: 14
                })) : A("", !0)
              ])
            ], 10, Ks)), 64))
          ])) : r.value < 4 ? (o(), a("div", Qs, [
            e("label", Zs, l(v.value.question), 1),
            e("div", eo, [
              te((o(), a("input", {
                id: "vb-step-number",
                key: v.value.key,
                "onUpdate:modelValue": $[1] || ($[1] = (z) => i[v.value.key] = z),
                class: "vb-step-input",
                type: "number",
                inputmode: r.value === 1 ? "numeric" : "decimal",
                min: v.value.min,
                max: v.value.max,
                step: r.value === 1 ? 1 : 0.1,
                placeholder: v.value.placeholder,
                "aria-invalid": !!d.value,
                "aria-describedby": d.value ? "vb-step-error" : "vb-step-hint",
                onInput: $[2] || ($[2] = (z) => d.value = "")
              }, null, 40, to)), [
                [ce, i[v.value.key]]
              ]),
              e("span", null, l(v.value.unit), 1)
            ]),
            U(zs, {
              modelValue: i[v.value.key],
              "onUpdate:modelValue": [
                $[3] || ($[3] = (z) => i[v.value.key] = z),
                $[4] || ($[4] = (z) => d.value = "")
              ],
              min: v.value.min,
              max: v.value.max,
              step: r.value === 1 ? 1 : 0.1,
              fallback: Number(v.value.placeholder),
              label: v.value.question,
              unit: v.value.unit
            }, null, 8, ["modelValue", "min", "max", "step", "fallback", "label", "unit"]),
            r.value === 1 && String(i.age) === "0" ? (o(), a("label", no, [
              $[11] || ($[11] = P("月龄（可选，0–11个月）", -1)),
              te(e("input", {
                "onUpdate:modelValue": $[5] || ($[5] = (z) => i.ageMonths = z),
                type: "number",
                min: "0",
                max: "11",
                step: "1",
                placeholder: "未填时暂不匹配婴儿参考值"
              }, null, 512), [
                [ce, i.ageMonths]
              ])
            ])) : A("", !0),
            e("p", so, l(v.value.min) + "–" + l(v.value.max) + " " + l(v.value.unit) + " · 可拖动刻度调节", 1)
          ])) : (o(), a("fieldset", oo, [
            e("legend", ao, l(v.value.question), 1),
            (o(!0), a(L, null, J(b(Wt), (z) => (o(), a("button", {
              key: z.key,
              type: "button",
              class: ge(["vb-activity-choice", { selected: i.activity === z.key }]),
              "aria-pressed": i.activity === z.key,
              onClick: (X) => i.activity = z.key
            }, [
              e("span", io, [
                U(F, {
                  name: z.icon
                }, null, 8, ["name"])
              ]),
              e("span", null, [
                e("strong", null, l(z.label), 1),
                e("small", null, l(z.detail), 1)
              ]),
              e("span", ro, [
                i.activity === z.key ? (o(), a("i", uo)) : A("", !0)
              ])
            ], 10, lo))), 128))
          ])),
          r.value === 4 ? (o(), a("label", co, [
            $[13] || ($[13] = P("生理阶段（可选）", -1)),
            te(e("select", {
              "onUpdate:modelValue": $[6] || ($[6] = (z) => i.physiologicalStage = z)
            }, [...$[12] || ($[12] = [
              e("option", { value: "general" }, "一般情况", -1),
              e("option", { value: "pregnant" }, "孕期", -1),
              e("option", { value: "lactating" }, "哺乳期", -1),
              e("option", { value: "special" }, "其他需专业评估的情况", -1)
            ])], 512), [
              [Ue, i.physiologicalStage]
            ]),
            $[14] || ($[14] = e("small", null, "特殊阶段暂停通用营养目标；记录和查询仍可使用。", -1))
          ])) : A("", !0),
          r.value < 4 ? (o(), a("div", vo, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: f
            }, "跳过此项")
          ])) : A("", !0),
          e("p", mo, l(d.value), 1),
          e("div", po, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              disabled: r.value === 0 && !t.profile,
              onClick: $[7] || ($[7] = (z) => r.value > 0 ? r.value-- : w.$emit("close"))
            }, [
              U(F, {
                name: "back",
                size: 17
              }),
              P(l(r.value === 0 && t.profile ? "取消" : "上一步"), 1)
            ], 8, bo),
            e("button", fo, [
              P(l(r.value === 4 ? "保存我的身体档案" : "下一步"), 1),
              U(F, {
                name: "arrow",
                size: 17
              })
            ])
          ])
        ], 32),
        e("button", {
          type: "button",
          class: "vb-button vb-button-quiet vb-skip-all",
          onClick: $[8] || ($[8] = (z) => u("complete", { sex: "", age: "", height: "", weight: "", activity: "" }))
        }, "跳过整个档案，先体验网站"),
        e("p", go, [
          $[15] || ($[15] = P("已有邮箱账号？ ", -1)),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: $[9] || ($[9] = (z) => u("login"))
          }, "登录")
        ]),
        e("p", ho, [
          U(F, {
            name: "lock",
            size: 13
          }),
          $[16] || ($[16] = P("游客档案保存在本机；登录后可同步档案与饮食记录", -1))
        ])
      ], 544)
    ]));
  }
}, jt = (t) => String(t?.name || "").split(" · ")[0].replace(/（[^）]*）/g, "").trim();
function tn(t) {
  if (t?.__summary) return t.state || "";
  if (!t?.expanded) return t?.state || "";
  const s = String(t.source?.description || ""), n = [];
  return /\bRAW\b/.test(s) ? n.push("生") : /\bRSTD\b|ROASTED/.test(s) ? n.push("烤熟") : /\bBKD\b/.test(s) ? n.push("烘焙") : /FRIED/.test(s) ? n.push("煎炸") : /\bCKD\b|COOKED|\bBLD\b/.test(s) && n.push("熟"), /\bDRY MIX\b/.test(s) ? n.push("干混合料") : /\bDRIED\b|\bDRY\b/.test(s) && n.push("干制"), /\bCND\b/.test(s) && n.push("罐装"), /\bFRZ\b|FROZEN/.test(s) && n.push("冷冻"), /WO\/?\s*SALT|WITHOUT SALT/.test(s) ? n.push("无盐") : /\bW\/SALT\b|\bSALTED\b/.test(s) && n.push("加盐"), n.length ? n.join(" · ") : "具体品种与配方见数据来源";
}
const Ln = [
  { name: "豆腐", match: /豆腐|tofu/i, items: [["usda-16427", "普通豆腐 · 硫酸钙凝固"], ["sr28-16126", "硬豆腐 · 硫酸钙与卤水凝固"], ["sr28-16127", "嫩豆腐 · 硫酸钙与卤水凝固"], ["sr28-16159", "特硬豆腐 · 卤水凝固"], ["sr28-16129", "油炸豆腐"]] },
  { name: "西兰花", match: /西兰花|broccoli/i, items: [["broccoli", "西兰花 · 生"], ["sr28-11091", "西兰花 · 水煮沥干，无盐"]] },
  { name: "胡萝卜", match: /胡萝卜|carrot/i, items: [["carrot", "胡萝卜 · 生"], ["sr28-11125", "胡萝卜 · 水煮沥干，无盐"]] },
  { name: "菠菜", match: /菠菜|spinach/i, items: [["spinach", "菠菜 · 生"], ["sr28-11458", "菠菜 · 水煮沥干，无盐"]] },
  { name: "番茄", match: /番茄|西红柿|tomato/i, items: [["tomato", "红番茄 · 生"], ["sr28-11530", "红番茄 · 熟"]] }
];
function ko(t) {
  return (Ln.find((n) => n.items.some(([u]) => u === t?.key) || [n.name, ...n.name === "番茄" ? ["西红柿"] : []].includes(t?.name))?.items || []).filter(([n]) => oe[n]?.source).map(([n, u]) => ({ id: n, label: u }));
}
const wo = Object.fromEntries(Ln.flatMap((t) => t.items)), Vn = (t) => wo[t] || "";
function $o(t) {
  return t?.image ? Promise.resolve({
    ...t.imageCredit,
    image: t.image,
    subject: t.name,
    imageCredit: t.imageCredit,
    imageLabel: "食物照片",
    imageNote: t.imageNote
  }) : Promise.resolve(null);
}
function qn(t) {
  const s = D(null), n = D(!1), u = D(!1);
  let i = 0;
  async function r(d = !1) {
    const m = b(typeof t == "function" ? t() : t), c = ++i;
    if (s.value = null, u.value = !1, n.value = !!m && !m.image, !m) {
      n.value = !1;
      return;
    }
    try {
      s.value = await $o(m, { force: d }), u.value = !s.value;
    } catch {
      u.value = !0;
    } finally {
      c === i && (n.value = !1);
    }
  }
  return ve(() => {
    const d = b(typeof t == "function" ? t() : t);
    return [d?.key, d?.image];
  }, () => r(), { immediate: !0 }), { photo: s, loading: n, failed: u, retry: () => r(!0) };
}
function Xe(t) {
  const s = typeof t == "string" ? t.trim() : "";
  return !s || /deepseek/i.test(s) ? "维衡 AI" : s;
}
const _o = {
  class: "vb-food-estimate vb-glass",
  "aria-live": "polite"
}, Ao = { key: 0 }, Co = { key: 1 }, So = {
  key: 2,
  role: "status"
}, Io = { key: 3 }, Eo = { class: "vb-portion-macros" }, xo = { key: 0 }, Uo = {
  key: 4,
  class: "vb-feature-error",
  role: "alert"
}, jo = { class: "vb-estimate-adjust" }, Do = { class: "vb-field" }, No = ["disabled"], Po = {
  __name: "FoodNutritionEstimate",
  props: { food: Object },
  emits: ["resolved"],
  setup(t, { emit: s }) {
    const n = t, u = s, i = D(!1), r = D(""), d = D(null), m = D("");
    let c = 0;
    function v(p) {
      try {
        const h = JSON.parse(Ce.getItem("weiheng.food-estimate." + p?.key) || "null");
        if (h?.estimate)
          return d.value = { ...h, cached: !0 }, m.value = h.recipe || "", u("resolved", d.value), !0;
      } catch {
      }
      const S = jn.estimates?.[p?.key];
      return S ? (d.value = { foodId: p.key, status: "complete", basisGrams: 100, valueType: "ai-estimate", cached: !0, model: S.model, generatedAt: S.generatedAt, estimate: { entryId: p.key, name: p.name, grams: 100, values: S.values, assumption: S.assumption } }, u("resolved", d.value), !0) : !1;
    }
    async function g() {
      const p = ++c, S = n.food?.key;
      i.value = !0, r.value = "", d.value = null, u("resolved", null);
      try {
        const h = await rt("food-estimate", { foodId: S, recipe: m.value.trim() });
        if (p !== c) return;
        d.value = h;
        try {
          Ce.setItem("weiheng.food-estimate." + S, JSON.stringify({ ...h, recipe: m.value }));
        } catch {
          r.value = "估算已返回，但本机缓存保存失败。";
        }
        u("resolved", h);
      } catch (h) {
        p === c && (r.value = h.message);
      } finally {
        p === c && (i.value = !1);
      }
    }
    ve(() => n.food?.key, () => {
      c++, m.value = "", r.value = "", i.value = !1, d.value = null, n.food && v(n.food);
    }, { immediate: !0 }), We(() => {
      c++;
    });
    const k = (p, S) => Ct(p, S), f = () => Object.values(d.value?.estimate?.values || {}).some((p) => p && typeof p.value != "number" && typeof p.low == "number" && typeof p.high == "number");
    return (p, S) => (o(), a("section", _o, [
      e("h3", null, l(d.value ? "AI 估算参考" : "AI 营养估算"), 1),
      d.value?.estimate ? (o(), a("p", Ao, [...S[1] || (S[1] = [
        e("strong", null, "每100克可食部 · AI单值参考，不是数据库值", -1)
      ])])) : (o(), a("p", Co, "只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。")),
      i.value ? (o(), a("p", So, "正在估算…")) : A("", !0),
      d.value?.estimate ? (o(), a("div", Io, [
        e("div", Eo, [
          (o(!0), a(L, null, J(b(Te).filter((h) => k(d.value.estimate.values[h.id], h.unit) !== null), (h) => (o(), a("div", {
            key: h.id
          }, [
            e("span", null, l(h.name), 1),
            e("strong", null, [
              P(l(k(d.value.estimate.values[h.id], h.unit)) + " ", 1),
              e("small", null, l(h.unit), 1)
            ])
          ]))), 128))
        ]),
        e("p", null, l(f() ? "旧估算范围按上下限中点换为单值参考；" : "") + l(d.value.estimate.assumption), 1),
        d.value.cached ? (o(), a("small", xo, "已保存的预估 · " + l(b(Xe)(d.value.model || d.value.requestedModel)) + " · " + l(d.value.generatedAt) + " · 基准100克；不在查询时重新调用AI。", 1)) : A("", !0),
        S[2] || (S[2] = e("small", null, "按常见品种与做法给出单一参考值。实际配方、用油和份量会造成误差；维生素和矿物质仍显示未知。", -1))
      ])) : A("", !0),
      r.value ? (o(), a("p", Uo, l(r.value), 1)) : A("", !0),
      e("details", jo, [
        e("summary", null, l(d.value ? "按实际做法调整估算" : "补充实际做法（可选）"), 1),
        e("label", Do, [
          S[3] || (S[3] = P("原料与做法", -1)),
          te(e("textarea", {
            "onUpdate:modelValue": S[0] || (S[0] = (h) => m.value = h),
            maxlength: "800",
            rows: "2",
            placeholder: "例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等"
          }, null, 512), [
            [ce, m.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "vb-button vb-button-soft",
          disabled: i.value,
          onClick: g
        }, l(i.value ? "估算中…" : r.value ? "重试估算" : d.value ? "按补充内容重新估算" : "生成估算"), 9, No)
      ])
    ]));
  }
};
function Mo(t) {
  const s = String(t?.name || ""), n = String(t?.state || ""), u = (i, r) => ({ label: `${i} · 估算${r}克`, grams: r });
  return /米饭/.test(s) && !/生|干/.test(n) ? [u("小碗", 100), u("中碗", 150), u("大碗", 200)] : /鸡蛋/.test(s) && !/粉|液|鸭|鹅/.test(s) ? [u("1个去壳", 50)] : /香蕉/.test(s) ? [u("1根去皮", 100)] : /苹果/.test(s) ? [u("小个去核", 150), u("中个去核", 200)] : /牛奶|酸奶/.test(s) && !/粉|干酪|奶油/.test(s) ? [u("小杯（按重量）", 200), u("一份（按重量）", 250)] : [];
}
const To = {
  key: 0,
  class: "vb-portion-presets"
}, Ro = ["onClick"], Gn = {
  __name: "PortionPicker",
  props: { food: Object },
  emits: ["choose"],
  setup(t, { emit: s }) {
    const n = t, u = s, i = H(() => Mo(n.food));
    return (r, d) => i.value.length ? (o(), a("div", To, [
      d[0] || (d[0] = e("span", null, "份量参考", -1)),
      (o(!0), a(L, null, J(i.value, (m) => (o(), a("button", {
        key: m.label,
        class: "vb-button vb-button-quiet",
        type: "button",
        onClick: (c) => u("choose", m.grams)
      }, l(m.label), 9, Ro))), 128)),
      d[1] || (d[1] = e("small", null, "界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。", -1))
    ])) : A("", !0);
  }
}, zo = ["src", "alt", "loading"], Oo = {
  key: 1,
  class: "vb-food-photo-placeholder"
}, nn = /* @__PURE__ */ Object.assign({ inheritAttrs: !0 }, {
  __name: "FoodImage",
  props: { food: Object, photo: Object, loading: Boolean, failed: Boolean, label: { type: Boolean, default: !0 }, lazy: { type: Boolean, default: !0 } },
  emits: ["image-error"],
  setup(t, { emit: s }) {
    const n = t, u = s, i = D(!1);
    return ve(() => n.photo?.image, () => i.value = !1), (r, d) => (o(), a("div", {
      class: ge(["vb-food-visual", { "is-unavailable": !t.photo?.image || i.value, "is-loading": t.loading }])
    }, [
      t.photo?.image && !i.value ? (o(), a("img", {
        key: 0,
        src: t.photo.image,
        alt: t.food?.imageAlt || t.food?.name,
        loading: t.lazy ? "lazy" : "eager",
        decoding: "async",
        onError: d[0] || (d[0] = (m) => {
          i.value = !0, u("image-error");
        })
      }, null, 40, zo)) : (o(), a("div", Oo, [
        U(F, {
          name: "bowl",
          size: 35
        }),
        e("strong", null, l(b(Vn)(t.food?.key) || String(t.food?.name || "").split(" · ")[0]), 1),
        e("small", null, l(t.loading ? "正在加载照片…" : "该营养样本暂无单独照片"), 1)
      ])),
      t.label && t.photo?.image && !i.value ? (o(), a("span", {
        key: 2,
        class: ge({ "is-generated": t.photo.imageCredit?.generated, "is-online": t.photo.onlineCandidate })
      }, l(t.photo.imageLabel || "食物照片"), 3)) : A("", !0)
    ], 2));
  }
}), Fo = ["aria-label"], Bo = ["aria-label"], Lo = { class: "vb-feature-dialog-body" }, dt = {
  __name: "ModalShell",
  props: { title: String, wide: Boolean },
  emits: ["close"],
  setup(t, { emit: s }) {
    const n = s, u = D(null), i = document.activeElement;
    Et(() => Me(() => u.value?.focus())), We(() => queueMicrotask(() => i?.isConnected && i?.focus({ preventScroll: !0 })));
    function r(d) {
      if (d.key === "Escape" && (d.preventDefault(), n("close")), d.key !== "Tab") return;
      const m = [...u.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter((g) => g.getClientRects().length);
      if (!m.length) {
        d.preventDefault();
        return;
      }
      const c = m[0], v = m.at(-1);
      d.shiftKey && (document.activeElement === c || document.activeElement === u.value) ? (d.preventDefault(), v.focus()) : !d.shiftKey && document.activeElement === v && (d.preventDefault(), c.focus());
    }
    return (d, m) => (o(), a("div", {
      class: "vb-feature-overlay",
      onClick: m[1] || (m[1] = Be((c) => d.$emit("close"), ["self"]))
    }, [
      e("section", {
        ref_key: "panel",
        ref: u,
        class: ge(["vb-feature-dialog", { "is-wide": t.wide }]),
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
            U(F, { name: "close" })
          ], 8, Bo)
        ]),
        e("div", Lo, [
          as(d.$slots, "default")
        ])
      ], 42, Fo)
    ]));
  }
}, Vo = { class: "vb-food-detail-top" }, qo = { class: "vb-eyebrow" }, Go = { class: "vb-food-state" }, Jo = { class: "vb-pill" }, Ho = {
  key: 0,
  class: "vb-field"
}, Wo = ["value"], Ko = ["value"], Yo = {
  key: 0,
  class: "vb-intake-more"
}, Xo = {
  key: 1,
  class: "vb-feature-error"
}, Qo = { class: "vb-portion-controls" }, Zo = ["max"], ea = ["value"], ta = { class: "vb-portion-macros" }, na = { key: 0 }, sa = { key: 0 }, oa = ["disabled"], aa = { class: "vb-food-all-nutrients" }, la = { class: "vb-nutrient-table" }, ia = { class: "vb-nutrient-table-head" }, ra = { key: 0 }, ua = ["href"], da = { key: 1 }, ca = { key: 2 }, va = ["href"], ma = ["href"], pa = {
  __name: "FoodDetailModal",
  props: { foodId: String },
  emits: ["close", "add"],
  setup(t, { emit: s }) {
    const n = t, u = s, i = D(n.foodId), r = D(100), d = D(_e()), m = D("unspecified"), c = D(null);
    ve(() => n.foodId, (V) => {
      i.value = V;
    }), ve(i, () => {
      c.value = null;
    });
    const v = H(() => oe[i.value]), g = D("");
    async function k() {
      const V = i.value;
      g.value = "";
      try {
        await Le(V);
      } catch (T) {
        i.value === V && (g.value = T.message);
      }
    }
    ve(i, k, { immediate: !0 });
    const f = H(() => ko(oe[n.foodId])), p = H(() => Te.some((V) => typeof v.value?.nutrients?.[V.id] != "number")), S = H(() => v.value?.__summary ? null : xt(v.value, p.value ? c.value : null)), h = H(() => At([{ foodId: v.value.key, grams: Number(r.value), nutritionSnapshot: S.value }]).totals), w = H(() => !v.value?.__summary && Number(r.value) >= 0.1 && Number(r.value) <= 5e3 && d.value && d.value <= _e()), { photo: $, loading: z, failed: X } = qn(() => v.value), R = H(() => v.value?.imageCredit || $.value?.imageCredit || $.value);
    function M() {
      w.value && u("add", { foodId: v.value.key, grams: Number(r.value), date: d.value, meal: m.value, nutritionSnapshot: S.value });
    }
    return (V, T) => v.value ? (o(), pe(dt, {
      key: 0,
      title: "食物详情",
      wide: "",
      onClose: T[6] || (T[6] = (O) => V.$emit("close"))
    }, {
      default: ut(() => [
        e("div", Vo, [
          e("figure", null, [
            U(nn, {
              food: v.value,
              photo: b($),
              loading: b(z),
              failed: b(X),
              label: !1,
              lazy: !1,
              class: "vb-food-detail-image"
            }, null, 8, ["food", "photo", "loading", "failed"])
          ]),
          e("div", null, [
            e("p", qo, l(v.value.categoryName), 1),
            e("h1", null, l(b(Vn)(v.value.key) || b(jt)(v.value)), 1),
            e("p", Go, l(b(tn)(v.value)), 1),
            e("span", Jo, l(v.value.source ? "数据库" : c.value ? "AI估算" : "数据不完整"), 1),
            f.value.length ? (o(), a("label", Ho, [
              T[7] || (T[7] = P("选择营养样本", -1)),
              te(e("select", {
                "onUpdate:modelValue": T[0] || (T[0] = (O) => i.value = O),
                "aria-label": "选择营养样本"
              }, [
                f.value.some((O) => O.id === n.foodId) ? A("", !0) : (o(), a("option", {
                  key: 0,
                  value: n.foodId
                }, "当前食物 · " + l(b(oe)[n.foodId]?.source ? "数据库" : "通用估算"), 9, Wo)),
                (o(!0), a(L, null, J(f.value, (O) => (o(), a("option", {
                  key: O.id,
                  value: O.id
                }, l(O.label), 9, Ko))), 128))
              ], 512), [
                [Ue, i.value]
              ]),
              T[8] || (T[8] = e("small", null, "按实际品种和做法选择，不同样本分别计算。", -1))
            ])) : A("", !0)
          ])
        ]),
        p.value && !v.value.__summary ? (o(), a("details", Yo, [
          T[9] || (T[9] = e("summary", null, "查看估算依据与调整", -1)),
          U(Po, {
            food: v.value,
            onResolved: T[1] || (T[1] = (O) => c.value = O)
          }, null, 8, ["food"])
        ])) : A("", !0),
        g.value ? (o(), a("p", Xo, [
          P(l(g.value) + " ", 1),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: k
          }, "重试")
        ])) : A("", !0),
        e("form", {
          class: "vb-food-portion-form",
          onSubmit: Be(M, ["prevent"])
        }, [
          U(Gn, {
            food: v.value,
            onChoose: T[2] || (T[2] = (O) => r.value = O)
          }, null, 8, ["food"]),
          e("div", Qo, [
            e("label", null, [
              T[10] || (T[10] = P("可食部重量", -1)),
              te(e("input", {
                "onUpdate:modelValue": T[3] || (T[3] = (O) => r.value = O),
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                "aria-label": "实际食用克数"
              }, null, 512), [
                [ce, r.value]
              ]),
              T[11] || (T[11] = e("small", null, "克", -1))
            ]),
            e("label", null, [
              T[12] || (T[12] = P("记录日期", -1)),
              te(e("input", {
                "onUpdate:modelValue": T[4] || (T[4] = (O) => d.value = O),
                type: "date",
                max: b(_e)(),
                required: ""
              }, null, 8, Zo), [
                [ce, d.value]
              ])
            ]),
            e("label", null, [
              T[13] || (T[13] = P("餐次", -1)),
              te(e("select", {
                "onUpdate:modelValue": T[5] || (T[5] = (O) => m.value = O)
              }, [
                (o(!0), a(L, null, J(b(yt), ([O, de]) => (o(), a("option", {
                  key: O,
                  value: O
                }, l(de), 9, ea))), 128))
              ], 512), [
                [Ue, m.value]
              ])
            ])
          ]),
          e("div", ta, [
            (o(!0), a(L, null, J(b(Te), (O) => (o(), a("div", {
              key: O.id
            }, [
              e("span", null, l(O.id === "carbs" ? "碳水" : O.name), 1),
              e("strong", null, [
                P(l(b(un)(h.value[O.id])) + " ", 1),
                h.value[O.id].value != null || h.value[O.id].range ? (o(), a("small", na, l(O.unit), 1)) : A("", !0)
              ]),
              h.value[O.id].range ? (o(), a("small", sa, "AI估算")) : A("", !0)
            ]))), 128))
          ]),
          e("button", {
            class: "vb-button vb-button-primary",
            type: "submit",
            disabled: !w.value
          }, [
            U(F, {
              name: "plus",
              size: 16
            }),
            T[14] || (T[14] = P("添加记录", -1))
          ], 8, oa),
          T[15] || (T[15] = e("small", { class: "vb-data-note" }, "加入本次选择，实际吃过后保存当天记录。", -1))
        ], 32),
        e("details", aa, [
          T[20] || (T[20] = e("summary", null, "查看完整营养与依据", -1)),
          T[21] || (T[21] = e("p", null, "每100克可食部；未知值不按0计算。AI单值为参考估算，不是实测值；旧估算范围按上下限中点换算。", -1)),
          e("div", la, [
            e("div", ia, [
              T[16] || (T[16] = e("span", null, "营养指标", -1)),
              T[17] || (T[17] = e("span", null, "每100克数据库值", -1)),
              e("span", null, "本份 " + l(r.value) + " 克", 1)
            ]),
            (o(!0), a(L, null, J(b(cs), (O) => (o(), a("div", {
              key: O.id
            }, [
              e("span", null, l(O.name), 1),
              e("span", null, l(b(Fe)(v.value.nutrients[O.id])) + " " + l(v.value.nutrients[O.id] != null ? O.unit : ""), 1),
              e("span", null, l(b(un)(h.value[O.id])) + " " + l(h.value[O.id].value != null || h.value[O.id].range ? O.unit : "") + l(h.value[O.id].range ? " · AI估算" : ""), 1)
            ]))), 128))
          ]),
          e("p", null, "完整样本：" + l(v.value.name), 1),
          v.value.source ? (o(), a("p", ra, [
            e("a", {
              href: v.value.source.url,
              target: "_blank",
              rel: "noopener"
            }, l(v.value.source.name), 9, ua),
            P(" · " + l(v.value.source.id) + " · " + l(v.value.source.license), 1),
            T[18] || (T[18] = e("br", null, null, -1)),
            P(l(v.value.source.description), 1)
          ])) : (o(), a("p", da, "当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。")),
          T[22] || (T[22] = e("p", null, "碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。", -1)),
          R.value ? (o(), a("p", ca, [
            T[19] || (T[19] = P("图片：", -1)),
            e("a", {
              href: R.value.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, l(R.value.title), 9, va),
            P(" / " + l(R.value.author) + " · ", 1),
            e("a", {
              href: R.value.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, l(R.value.license), 9, ma),
            P(" · " + l(R.value.modifications), 1)
          ])) : A("", !0)
        ])
      ]),
      _: 1
    })) : A("", !0);
  }
}, ba = { class: "vb-report-heading" }, fa = { class: "vb-small-label" }, ga = { class: "vb-pill" }, ha = { key: 0 }, ya = ["disabled"], ka = {
  key: 1,
  class: "vb-inline-warning"
}, wa = {
  key: 2,
  class: "vb-inline-warning"
}, $a = {
  key: 3,
  class: "vb-ai-progress vb-report-progress",
  role: "status"
}, _a = {
  key: 4,
  class: "vb-report-error",
  role: "alert"
}, Aa = ["disabled"], Ca = {
  key: 5,
  class: "vb-feature-error"
}, Sa = {
  key: 0,
  class: "vb-report-estimation",
  "aria-live": "polite"
}, Ia = { class: "vb-report-estimation-heading" }, Ea = { class: "vb-pill" }, xa = {
  key: 0,
  class: "vb-report-estimation-list"
}, Ua = { class: "vb-report-estimation-values" }, ja = {
  key: 1,
  class: "vb-intake-more"
}, Da = { class: "vb-report-comparison" }, Na = { key: 0 }, Pa = { key: 1 }, Ma = { key: 2 }, Ta = { key: 3 }, Ra = { key: 4 }, za = { key: 5 }, Oa = { key: 6 }, Fa = { key: 7 }, Ba = {
  key: 7,
  class: "vb-report-content"
}, La = { class: "vb-report-summary" }, Va = { class: "vb-inline-warning" }, qa = {
  key: 8,
  class: "vb-intake-more"
}, Ga = { class: "vb-report-meta" }, Ja = { key: 0 }, Ha = {
  __name: "AiReportModal",
  props: { report: Object, record: Object, stale: Boolean, error: String },
  emits: ["close", "retry"],
  setup(t) {
    const s = t, n = H(() => s.report?.calculation?.targets || En(s.report?.snapshot?.profile)), u = H(() => {
      const f = s.report?.snapshot, p = s.report?.calculation?.estimation?.foods || [];
      if (!f || !p.length) return f?.intake;
      const S = Un(f.entries || [], p, { model: s.report?.model, generatedAt: s.report?.generatedAt });
      return At(S);
    }), i = [
      ["overview", "摄入概况"],
      ["targetComparison", "与目标的关系"],
      ["foodMix", "食物搭配"],
      ["attention", "值得关注"],
      ["suggestions", "下一餐可以这样调整"]
    ], r = (f) => f ? new Date(f).toLocaleString("zh-CN", { hour12: !1 }) : "", d = H(() => (s.report?.snapshot?.entries || []).flatMap((f) => {
      const p = f.referenceConfirmed === !1 ? null : oe[f.foodId], S = Te.filter((h) => {
        const w = Kt(f, p, h.id);
        return typeof w.value != "number" && !w.range;
      }).map((h) => h.id);
      return S.length ? [{ name: f.name, grams: f.grams, missing: S }] : [];
    })), m = H(() => s.report?.calculation?.estimation?.missingFoodCount ?? d.value.length), c = H(() => s.report?.calculation?.estimation?.foods || []), v = (f) => (f > 0 ? "+" : f < 0 ? "−" : "") + Fe(Math.abs(f)), g = (f) => v(vs(f)), k = (f) => `${Object.values(f?.values || {}).some((S) => S && typeof S.value != "number" && typeof S.low == "number" && typeof S.high == "number") ? "旧估算范围按上下限中点换为单值参考；" : ""}${f?.assumption || ""}`;
    return (f, p) => (o(), pe(dt, {
      title: "AI 营养分析",
      wide: "",
      onClose: p[4] || (p[4] = (S) => f.$emit("close"))
    }, {
      default: ut(() => [
        e("div", ba, [
          e("div", null, [
            e("span", fa, l(t.report?.date || t.record?.date), 1),
            p[5] || (p[5] = e("h3", null, "读懂这一天的饮食", -1))
          ]),
          e("span", ga, l(t.report?.status === "complete" ? "分析完成" : t.report?.status === "pending" ? "分析中" : "待完成"), 1)
        ]),
        p[18] || (p[18] = e("p", { class: "vb-data-note" }, "饮食记录已保存；AI分析单独进行，不影响继续记账。", -1)),
        !t.report && !t.error ? (o(), a("section", ha, [
          p[6] || (p[6] = e("p", null, "分析时向维衡 AI发送当天食物、份量、营养汇总和必要的身体档案，不发送备注和照片。", -1)),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[0] || (p[0] = (S) => f.$emit("retry"))
          }, "开始AI分析", 8, ya)
        ])) : A("", !0),
        t.stale ? (o(), a("p", ka, [
          p[7] || (p[7] = P("记录已更新，当前结果对应旧记录。", -1)),
          t.report?.status !== "pending" ? (o(), a("button", {
            key: 0,
            class: "vb-text-button",
            onClick: p[1] || (p[1] = (S) => f.$emit("retry"))
          }, "重新分析")) : A("", !0)
        ])) : A("", !0),
        t.record ? A("", !0) : (o(), a("p", wa, "对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。")),
        t.report?.status === "pending" ? (o(), a("div", $a, [
          p[9] || (p[9] = e("span", { class: "vb-loading-ring" }, null, -1)),
          e("div", null, [
            p[8] || (p[8] = e("strong", null, "正在分析饮食搭配与营养目标…", -1)),
            e("small", null, l(m.value ? "同时自动估算 " + m.value + " 项食物的缺失指标。" : "程序已计算营养汇总，维衡 AI 正在生成解释与建议。"), 1)
          ])
        ])) : A("", !0),
        t.error || ["failed", "interrupted"].includes(t.report?.status) ? (o(), a("div", _a, [
          p[10] || (p[10] = e("h3", null, "记录已保存，AI 分析尚未完成", -1)),
          e("p", null, l(t.error || t.report.error), 1),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !t.record,
            onClick: p[2] || (p[2] = (S) => f.$emit("retry"))
          }, "重新分析", 8, Aa)
        ])) : A("", !0),
        t.report?.persistenceFailed ? (o(), a("p", Ca, "报告暂时未写入浏览器数据库，请保留此页并检查存储权限。")) : A("", !0),
        t.report?.snapshot ? (o(), a(L, { key: 6 }, [
          p[14] || (p[14] = e("h3", { class: "vb-report-section-title" }, "本次摄入汇总", -1)),
          U(Xt, {
            summary: u.value || t.report.snapshot.intake,
            targets: n.value,
            estimating: t.report.status === "pending",
            details: ""
          }, null, 8, ["summary", "targets", "estimating"]),
          m.value ? (o(), a("section", Sa, [
            e("div", Ia, [
              e("div", null, [
                e("h3", null, l(m.value === 1 ? "有 1 项食物缺少部分营养数据" : `有多项食物缺少部分营养数据（${m.value} 项）`), 1),
                p[11] || (p[11] = e("p", null, "缺少数据库数据的食物会按识别名称和确认克数估算，并计入上方合计；维生素和矿物质仍以可靠数据为准。", -1))
              ]),
              e("span", Ea, l(t.report?.status === "pending" ? "正在估算" : "AI 参考估算"), 1)
            ]),
            p[12] || (p[12] = e("p", { class: "vb-data-note" }, "缺失数据按常见品种与做法给出AI单值参考，不是数据库值或检测结果；旧估算范围按上下限中点换算。", -1)),
            c.value.length ? (o(), a("ul", xa, [
              (o(!0), a(L, null, J(c.value, (S) => (o(), a("li", {
                key: S.entryId
              }, [
                e("div", null, [
                  e("strong", null, l(S.name) + " · " + l(b(Fe)(S.grams)) + " 克", 1),
                  e("small", null, l(k(S)), 1)
                ]),
                e("div", Ua, [
                  (o(!0), a(L, null, J(b(Te).filter((h) => b(Ct)(S.values[h.id], h.unit) !== null), (h) => (o(), a("span", {
                    key: h.id
                  }, l(h.id === "carbs" ? "碳水" : h.name) + " " + l(b(Fe)(b(Ct)(S.values[h.id], h.unit))) + " " + l(h.unit), 1))), 128))
                ])
              ]))), 128))
            ])) : A("", !0)
          ])) : A("", !0),
          t.report.calculation?.comparison ? (o(), a("details", ja, [
            p[13] || (p[13] = e("summary", null, "查看与需求参考的比较", -1)),
            e("div", Da, [
              (o(!0), a(L, null, J(t.report.calculation.comparison, (S) => (o(), a("div", {
                key: S.id
              }, [
                e("span", null, l(S.id === "carbs" ? "碳水" : S.name), 1),
                S.estimatedRange?.delta ? (o(), a("strong", Na, " AI 估算参考差值：" + l(g(S.estimatedRange.delta)) + " " + l(S.unit), 1)) : S.delta !== null ? (o(), a("strong", Pa, l(S.delta > 0 ? "+" : "") + l(b(Fe)(S.delta)) + " " + l(S.unit), 1)) : (o(), a("strong", Ma, l(S.estimatedRange || S.complete && S.target === null ? "缺少个人目标，无法计算差值" : "AI 估算尚未完成"), 1)),
                S.estimatedRange?.delta ? (o(), a("small", Ta, "按数据库已知值与 AI 单值估算计算；旧范围按中点换算。记录未必覆盖全天，不代表达标或不足。")) : S.estimatedRange && !S.estimatedRange.delta ? (o(), a("small", Ra, "含AI单值估算，暂无适用个人目标。")) : S.delta !== null ? (o(), a("small", za, "记录合计减去全天目标，记录未必覆盖全天。")) : S.complete && S.target === null ? (o(), a("small", Oa, "请完善个人营养档案后再查看与目标的差值。")) : (o(), a("small", Fa, "数据不完整，暂不比较。"))
              ]))), 128))
            ])
          ])) : A("", !0)
        ], 64)) : A("", !0),
        t.report?.result ? (o(), a("div", Ba, [
          p[15] || (p[15] = e("span", { class: "vb-small-label" }, "AI 解释与建议", -1)),
          e("p", La, l(t.report.result.summary), 1),
          (o(), a(L, null, J(i, ([S, h]) => e("section", { key: S }, [
            t.report.result[S]?.length ? (o(), a(L, { key: 0 }, [
              e("h3", null, l(h), 1),
              e("ul", null, [
                (o(!0), a(L, null, J(t.report.result[S], (w, $) => (o(), a("li", { key: $ }, l(w), 1))), 128))
              ])
            ], 64)) : A("", !0)
          ])), 64)),
          e("p", Va, "分析范围：" + l(t.report.result.scope || "仅针对已记录的食物，不能代替身体检测或专业诊疗。"), 1)
        ])) : A("", !0),
        t.report ? (o(), a("details", qa, [
          p[17] || (p[17] = e("summary", null, "查看分析信息", -1)),
          e("div", Ga, [
            e("span", null, "生成时间：" + l(r(t.report.generatedAt) || "尚未生成"), 1),
            t.report.model ? (o(), a("span", Ja, "由 " + l(b(Xe)(t.report.model)) + " 生成", 1)) : A("", !0),
            e("span", null, "数据版本：" + l(t.report.dataVersion), 1),
            e("span", null, "食物库：" + l(t.report.snapshot?.intake?.dataVersion), 1),
            p[16] || (p[16] = e("small", null, "报告、照片保存在本机浏览器。清理站点数据后无法恢复。", -1))
          ])
        ])) : A("", !0),
        t.report?.status === "complete" && t.record ? (o(), a("button", {
          key: 9,
          type: "button",
          class: "vb-button vb-button-quiet",
          onClick: p[3] || (p[3] = (S) => f.$emit("retry"))
        }, l(t.stale ? "用最新记录重新分析" : "重新分析这一天"), 1)) : A("", !0)
      ]),
      _: 1
    }));
  }
};
function Ht(t) {
  const s = String(t || "");
  return /^(?:好的[，,\s]*)?pdf(?:格式)?[。.!！]?$/i.test(s.trim()) ? "pdf" : /^(?:好的[，,\s]*)?(?:word|docx)(?:格式)?[。.!！]?$/i.test(s.trim()) ? "docx" : !/(生成|导出|下载|保存|制作|整理|做成|转换|转成|给我|发我|用|格式|create|generate|export|download|save|make|convert)/i.test(s) || /^(什么是|如何|怎么|为什么|what\b|how\b|why\b)/i.test(s.trim()) ? null : [["pdf", /pdf/i], ["docx", /word|docx|\.doc\b/i], ["png", /png|长图|图片文档|图片格式|(?:导出|保存).{0,8}图片/i]].map(([u, i]) => ({ format: u, index: s.search(i) })).filter((u) => u.index >= 0).sort((u, i) => u.index - i.index)[0]?.format || null;
}
function Wa(t) {
  const s = String(t || "").trim(), n = /^\s*#{1,6}\s+\S/m.exec(s);
  if (!n || !n.index) return s;
  const u = s.slice(0, n.index), i = u.split(`
`).map((m) => m.trim()).filter((m) => m && !/^[-*_]{3,}$/.test(m)), r = /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i, d = /(身高|体重|年龄|孕期|哺乳|过敏|疾病|营养|能量|热量|kcal|蛋白|用药)/i;
  return r.test(u) && i.every((m) => /(PDF|Word|文件|附件|导出|下载|复制|格式)/i.test(m) && !d.test(m)) ? s.slice(n.index).trim() : s;
}
function Ot(t) {
  const s = String(t || "").trim();
  return s.length < 400 && !/^\s*(?:#{1,6}\s|\|)/m.test(s) && /(?:无法|不能|没法|不支持).{0,35}(?:PDF|Word|文件|附件)/i.test(s);
}
function Ka(t) {
  try {
    const s = new URL(t.trim());
    return ["https:", "http:"].includes(s.protocol) ? s.href : null;
  } catch {
    return null;
  }
}
function et(t) {
  const s = [], n = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let u = 0, i;
  for (; i = n.exec(t); ) {
    if (i.index > u && s.push(t.slice(u, i.index)), i[1] !== void 0) {
      const r = Ka(i[2]);
      s.push(r ? ke("a", { href: r, target: "_blank", rel: "noopener noreferrer" }, i[1]) : i[0]);
    } else i[3] !== void 0 ? s.push(ke("strong", null, i[3])) : s.push(ke("code", null, i[4]));
    u = n.lastIndex;
  }
  return u < t.length && s.push(t.slice(u)), s;
}
function gn(t) {
  return t.trim().replace(/^\||\|$/g, "").split("|").map((s) => s.trim());
}
function hn(t) {
  return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(t);
}
function Ya(t) {
  const s = String(t || "").replace(/\r\n?/g, `
`).split(`
`), n = [];
  for (let u = 0; u < s.length; ) {
    const i = s[u];
    if (!i.trim()) {
      u++;
      continue;
    }
    const r = i.match(/^\s*(```|~~~)([^`]*)$/);
    if (r) {
      const v = [], g = r[2].trim().replace(/[^a-z0-9_-]/gi, "").slice(0, 30);
      for (u++; u < s.length && !s[u].trimStart().startsWith(r[1]); ) v.push(s[u++]);
      u < s.length && u++, n.push(ke("pre", null, ke("code", { class: g ? `language-${g}` : void 0 }, v.join(`
`))));
      continue;
    }
    const d = i.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (d) {
      n.push(ke(`h${d[1].length}`, null, et(d[2]))), u++;
      continue;
    }
    if (u + 1 < s.length && i.includes("|") && hn(s[u + 1])) {
      const v = gn(i), g = [];
      for (u += 2; u < s.length && s[u].trim() && s[u].includes("|"); ) g.push(gn(s[u++]));
      n.push(ke("div", { class: "vb-markdown-table-wrap" }, ke("table", null, [
        ke("thead", null, ke("tr", null, v.map((k) => ke("th", null, et(k))))),
        ke("tbody", null, g.map((k) => ke("tr", null, v.map((f, p) => ke("td", null, et(k[p] || ""))))))
      ])));
      continue;
    }
    const m = i.match(/^\s{0,3}(?:([-*+])|(\d+)\.)\s+(.+)$/);
    if (m) {
      const v = !!m[2], g = [];
      for (; u < s.length; ) {
        const k = s[u].match(/^\s{0,3}(?:([-*+])|(\d+)\.)\s+(.+)$/);
        if (!k || !!k[2] !== v) break;
        g.push(ke("li", null, et(k[3]))), u++;
      }
      n.push(ke(v ? "ol" : "ul", null, g));
      continue;
    }
    const c = [i];
    for (u++; u < s.length && s[u].trim() && !/^\s{0,3}(?:#{1,6}\s|[-*+]\s|\d+\.\s|```|~~~)/.test(s[u]) && !(u + 1 < s.length && s[u].includes("|") && hn(s[u + 1])); ) c.push(s[u++]);
    n.push(ke("p", null, et(c.join(`
`))));
  }
  return n;
}
const _t = Ye({
  name: "SafeMarkdown",
  props: { content: { type: String, default: "" } },
  setup(t) {
    return () => ke("div", { class: "vb-safe-markdown" }, Ya(t.content));
  }
}), Xa = ["aria-busy"], Qa = {
  class: "vb-chat-export-options",
  "aria-label": "下载计划"
}, Za = ["href", "download", "title"], el = ["disabled", "onClick"], tl = {
  key: 0,
  role: "status"
}, nl = {
  key: 1,
  role: "alert"
}, sl = { key: 2 }, ol = {
  __name: "ChatMessageExport",
  props: { content: { type: String, required: !0 }, question: { type: String, default: "" }, auto: Boolean },
  emits: ["retry"],
  setup(t, { emit: s }) {
    const n = t, u = s, i = D({}), r = D(""), d = D(""), m = D("");
    let c = 0, v = !1, g = !1;
    const k = H(() => Ht(n.question)), f = H(() => r.value || k.value || "pdf"), p = H(() => ({ pdf: "PDF", docx: "Word", png: "图片" })[f.value]), S = H(() => i.value[f.value]), h = H(() => Wa(n.content));
    function w() {
      for (const X of Object.values(i.value)) setTimeout(() => URL.revokeObjectURL(X.url), 3e4);
      i.value = {};
    }
    async function $(X = f.value) {
      if (d.value || i.value[X]) {
        i.value[X] && (r.value = X);
        return;
      }
      const R = c, M = h.value, V = n.question;
      r.value = X, d.value = X, m.value = "";
      try {
        if (k.value && Ot(M)) throw new Error("尚未生成文档正文，请重新生成。");
        const { createChatExport: T, preparedChatDownload: O } = await import("./chatExport-BCM5BWUu.js");
        if (R !== c) return;
        const de = await T(X, M, { question: V });
        if (R !== c) return;
        i.value = { ...i.value, [X]: O(de) };
      } catch (T) {
        R === c && (m.value = T instanceof Error ? T.message : "文件生成失败，请重试。");
      } finally {
        R === c && (d.value = "");
      }
    }
    function z() {
      !v || !n.auto || !k.value || g || d.value || i.value[k.value] || m.value || (g = !0, requestAnimationFrame(() => setTimeout(() => {
        g = !1, v && n.auto && k.value && $(k.value);
      }, 0)));
    }
    return ve(() => [n.content, n.question], () => {
      c++, w(), r.value = "", d.value = "", m.value = "", z();
    }), ve(() => n.auto, z), Et(() => {
      v = !0, z();
    }), We(() => {
      v = !1, c++, w();
    }), (X, R) => k.value ? (o(), a("div", {
      key: 0,
      class: "vb-chat-document",
      "aria-label": "计划正文与下载",
      "aria-busy": !!d.value
    }, [
      U(b(_t), {
        class: "vb-chat-document-body",
        content: h.value
      }, null, 8, ["content"]),
      e("div", Qa, [
        (o(), a(L, null, J([["pdf", "PDF"], ["docx", "Word"], ["png", "长图"]], ([M, V]) => (o(), a(L, { key: M }, [
          i.value[M] ? (o(), a("a", {
            key: 0,
            href: i.value[M].url,
            download: i.value[M].filename,
            title: i.value[M].filename
          }, l(M === "png" ? "保存长图" : "下载 " + V), 9, Za)) : (o(), a("button", {
            key: 1,
            type: "button",
            disabled: !!d.value,
            onClick: (T) => $(M)
          }, l(d.value === M ? "正在生成…" : "生成 " + V), 9, el))
        ], 64))), 64))
      ]),
      S.value ? (o(), a("small", tl, l(p.value) + " 文件已生成", 1)) : A("", !0),
      m.value ? (o(), a("div", nl, [
        e("p", null, l(m.value), 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: R[0] || (R[0] = (M) => b(Ot)(h.value) ? u("retry") : $())
        }, l(b(Ot)(h.value) ? "重新生成正文" : "重试生成文件"), 1)
      ])) : A("", !0),
      S.value?.pageCount ? (o(), a("small", sl, "内容较长，" + l(S.value.pageCount) + " 张图片已打包为 ZIP。", 1)) : A("", !0)
    ], 8, Xa)) : A("", !0);
  }
}, al = /* @__PURE__ */ Mn(ol, [["__scopeId", "data-v-3fcab6f8"]]);
function ll({ viewport: t, isActive: s = () => !0, onChange: n = () => {
}, threshold: u = 64 }) {
  let i = !0;
  const r = () => s() && t() && t().clientHeight > 0, d = (g) => Math.max(0, g.scrollHeight - g.clientHeight - g.scrollTop);
  function m() {
    const g = t();
    n(!!(r() && d(g) > u));
  }
  function c(g = !1) {
    if (g && (i = !0), !r()) {
      n(!1);
      return;
    }
    const k = t();
    i && (k.scrollTop = Math.max(0, k.scrollHeight - k.clientHeight)), m();
  }
  function v() {
    r() && (i = d(t()) <= u, m());
  }
  return { layout: c, onScroll: v, jump: () => c(!0) };
}
function il({ viewport: t, content: s, active: n, thread: u, messages: i }) {
  const r = D(!1), d = ll({ viewport: () => t.value, isActive: () => n.value, onChange: (h) => r.value = h });
  let m = !1, c = !1, v = !1, g, k;
  function f(h = !1) {
    v = v || h, !(!m || c) && (c = !0, Me(() => {
      if (!m) {
        c = !1;
        return;
      }
      g = requestAnimationFrame(() => {
        if (g = void 0, c = !1, !m) return;
        const w = v;
        v = !1, d.layout(w);
      });
    }));
  }
  function p() {
    k?.disconnect(), t.value && k?.observe(t.value), s.value && k?.observe(s.value), f();
  }
  const S = () => f();
  return ve(i, () => f(), { deep: !0, flush: "post" }), ve([u, n], () => f(!0), { flush: "post" }), ve([t, s], p, { flush: "post" }), Et(() => {
    m = !0, typeof ResizeObserver < "u" && (k = new ResizeObserver(S)), p(), window.addEventListener("resize", S), f(!0);
  }), We(() => {
    m = !1, k?.disconnect(), g !== void 0 && cancelAnimationFrame(g), window.removeEventListener("resize", S);
  }), { showJump: r, onScroll: d.onScroll, onContentLoad: S, jumpToLatest: () => f(!0) };
}
function rl(t, s, n) {
  return t.push({ id: s, role: "assistant", content: "", status: "sending", createdAt: n }), t[t.length - 1];
}
function yn(t, s = {}, n = []) {
  const u = new Set(n), i = {};
  for (const r of new Set((t.threads || []).map((d) => d.date))) {
    const d = (t.threads || []).filter((g) => g.date === r).sort((g, k) => String(k.createdAt || "").localeCompare(String(g.createdAt || ""))), m = d.find((g) => g.id === s[r]), c = d.find((g) => g.id === t.activeByDate?.[r]), v = m && (m.messages?.length || u.has(m.id)) ? m : c?.messages?.length ? c : d.find((g) => g.messages?.length) || m || c || d[0];
    v && (i[r] = v.id);
  }
  return i;
}
const ul = 24e3, kn = 220;
function dl(t, s) {
  const n = Date.parse(t || s || "");
  return Number.isFinite(n) ? n : 0;
}
function wn(t) {
  const s = String(t || "").trim();
  return s.length > kn ? `${s.slice(0, kn)}…` : s;
}
function cl(t, s, n = !0) {
  if (!n || !Array.isArray(t)) return "";
  const u = [];
  for (const d of t) {
    if (!d || d.id === s || !Array.isArray(d.messages)) continue;
    const m = d.messages;
    for (let c = 0; c < m.length - 1; c++) {
      const v = m[c], g = m[c + 1];
      if (v?.role !== "user" || g?.role !== "assistant" || v.status !== "complete" || g.status !== "complete" || v.attachments?.length || g.attachments?.length) continue;
      const k = wn(v.content), f = wn(g.content);
      !k || !f || (u.push({
        date: typeof d.date == "string" ? d.date : "",
        time: dl(v.createdAt, d.createdAt),
        user: k,
        assistant: f
      }), c++);
    }
  }
  const i = u.sort((d, m) => d.time - m.time).slice(-50);
  let r = i.map((d) => `${d.date ? `日期 ${d.date}：` : ""}用户：${d.user}
助手：${d.assistant}`).join(`

`);
  for (; r.length > ul && i.length; )
    i.shift(), r = i.map((d) => `${d.date ? `日期 ${d.date}：` : ""}用户：${d.user}
助手：${d.assistant}`).join(`

`);
  return r;
}
function vl(t) {
  if (!t || typeof t != "object" || Array.isArray(t) || lt(t)) return null;
  const s = (r) => r == null || r === "" ? void 0 : Number(r), n = s(t.age), u = s(t.height), i = s(t.weight);
  return {
    sex: t.sex || "",
    ...n !== void 0 ? { age: n } : {},
    ...u !== void 0 ? { height: u } : {},
    ...i !== void 0 ? { weight: i } : {},
    activity: t.activity,
    ...s(t.ageMonths) !== void 0 ? { ageMonths: s(t.ageMonths) } : {},
    ...t.physiologicalStage ? { physiologicalStage: t.physiologicalStage } : {}
  };
}
const ml = 3, pl = 24e3, $n = 6e4, bl = 8e5, fl = 6, gl = ".jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log";
function Jn(t) {
  const s = String(t.name || "").split(".").pop().toLowerCase(), n = ["jpg", "jpeg", "png", "webp"].includes(s) ? "image" : ["pdf", "docx", "txt", "md", "csv", "json", "log"].includes(s) ? "document" : null;
  if (!n) throw new Error("支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。");
  if (!t.size) throw new Error("这个文件是空的，请重新选择。");
  if (t.size > (n === "image" ? 8 : 10) * 1024 * 1024)
    throw new Error(n === "image" ? "单张照片不能超过 8 MB。" : "单个文件不能超过 10 MB。");
  return n;
}
function hl(t) {
  const s = String(t).replace(/\u0000/g, "").trim();
  if (!s) throw new Error("没有读取到文字。扫描版 PDF 请改为上传页面截图。");
  if (s.length > pl) throw new Error("文件文字超过 24,000 字，请截取需要讨论的部分后上传。");
  return s;
}
let tt;
function yl() {
  return tt || (tt = new Promise((t, s) => {
    if (!globalThis.indexedDB) {
      s(new Error("浏览器无法保存聊天附件，请检查隐私设置。"));
      return;
    }
    const n = indexedDB.open(it("weiheng.chat-attachments.v1"), 1);
    n.onupgradeneeded = () => n.result.createObjectStore("attachments", { keyPath: "id" }), n.onsuccess = () => {
      const u = n.result;
      u.onversionchange = () => {
        u.close(), tt = void 0;
      }, t(u);
    }, n.onerror = n.onblocked = () => s(new Error("无法打开聊天附件存储，请检查浏览器隐私设置。"));
  }).catch((t) => {
    throw tt = void 0, t;
  })), tt;
}
async function sn(t, s) {
  const n = await yl();
  if (t === "readwrite" && Ke()) throw new Error("正在重置本地数据，已停止保存附件。");
  return new Promise((u, i) => {
    const r = n.transaction("attachments", t), d = s(r.objectStore("attachments"));
    r.oncomplete = () => u(d.result), r.onerror = r.onabort = () => i(new Error("聊天附件保存失败，可能本地存储空间不足。"));
  });
}
const kl = (t) => sn("readwrite", (s) => s.put(t)), Ft = (t) => sn("readonly", (s) => s.get(t)), ht = (t) => sn("readwrite", (s) => s.delete(t));
function wl(t) {
  return new Promise((s, n) => {
    const u = new FileReader();
    u.onload = () => s(String(u.result)), u.onerror = () => n(new Error("照片读取失败，请重新选择。")), u.readAsDataURL(t);
  });
}
async function $l(t) {
  const s = await createImageBitmap(t).catch(() => {
    throw new Error("照片无法读取，请换用 JPG、PNG 或 WebP。");
  });
  try {
    if (s.width * s.height > 4e7) throw new Error("照片分辨率过大，请缩小后上传。");
    const n = document.createElement("canvas"), u = Math.min(1, 1600 / Math.max(s.width, s.height));
    n.width = Math.max(1, Math.round(s.width * u)), n.height = Math.max(1, Math.round(s.height * u));
    const i = n.getContext("2d");
    if (!i) throw new Error("浏览器暂不支持照片处理。");
    i.fillStyle = "#fff", i.fillRect(0, 0, n.width, n.height), i.drawImage(s, 0, 0, n.width, n.height);
    for (const r of [0.85, 0.68, 0.5]) {
      const d = await new Promise((c, v) => n.toBlob((g) => g ? c(g) : v(new Error("照片压缩失败。")), "image/jpeg", r)), m = await wl(d);
      if (m.length <= bl) return m;
    }
    throw new Error("照片压缩后仍然过大，请裁剪后重试。");
  } finally {
    s.close();
  }
}
async function _l(t) {
  const s = await import("./pdf-jk_a9_-5.js");
  s.GlobalWorkerOptions.workerSrc = "/content-dist/pdf.worker.min.js";
  const n = s.getDocument({
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
async function Al(t) {
  const { unzipSync: s, strFromU8: n } = await import("./browser-CJhYS1h6.js"), u = s(new Uint8Array(await t.arrayBuffer()), {
    filter: (r) => r.name === "word/document.xml" && r.originalSize <= 4 * 1024 * 1024
  });
  if (!u["word/document.xml"]) throw new Error("Word 文件无效或内容过大，请另存为 DOCX 或 TXT 后重试。");
  const i = new DOMParser().parseFromString(n(u["word/document.xml"]), "application/xml");
  if (i.querySelector("parsererror")) throw new Error("Word 文件内容无法读取。");
  return Array.from(i.getElementsByTagNameNS("*", "p")).map((r) => Array.from(r.getElementsByTagNameNS("*", "*")).map((d) => d.localName === "t" ? d.textContent || "" : d.localName === "tab" ? "	" : d.localName === "br" ? `
` : "").join("")).join(`
`);
}
async function Cl(t, s) {
  const n = Jn(t), u = { id: s, kind: n, name: t.name.slice(0, 180), size: t.size, mimeType: t.type };
  if (n === "image") return { ...u, mimeType: "image/jpeg", dataUrl: await $l(t) };
  const i = t.name.split(".").pop()?.toLowerCase();
  let r;
  try {
    if (i === "pdf") r = await _l(t);
    else if (i === "docx") r = await Al(t);
    else {
      const d = new Uint8Array(await t.arrayBuffer());
      r = new TextDecoder().decode(d), r.includes("�") && (r = new TextDecoder("gb18030").decode(d));
    }
  } catch (d) {
    throw new Error(d instanceof Error && /[\u4e00-\u9fff]/.test(d.message) ? d.message : "文件无法读取，请确认文件完整，或另存为 TXT 后重试。");
  }
  return { ...u, text: hl(r) };
}
const Sl = {
  class: "vb-chat-page vb-simple-chat",
  "aria-label": "维衡AI助手对话"
}, Il = { class: "vb-simple-header" }, El = { class: "vb-simple-actions" }, xl = { class: "vb-simple-date" }, Ul = ["max", "disabled"], jl = { class: "vb-simple-options" }, Dl = { "aria-label": "对话选项" }, Nl = { class: "vb-simple-options-panel" }, Pl = {
  key: 0,
  class: "vb-simple-history"
}, Ml = ["value", "disabled"], Tl = ["value"], Rl = ["value"], zl = { class: "vb-memory-toggle" }, Ol = ["disabled"], Fl = { class: "vb-simple-starters" }, Bl = ["onClick"], Ll = { class: "vb-simple-context" }, Vl = {
  key: 0,
  class: "vb-simple-avatar",
  "aria-label": "维衡 AI"
}, ql = { class: "vb-simple-message-body" }, Gl = {
  key: 0,
  class: "vb-chat-sent-attachments"
}, Jl = ["aria-label", "onClick"], Hl = ["src", "alt"], Wl = {
  key: 1,
  class: "vb-simple-loading"
}, Kl = {
  key: 2,
  class: "vb-simple-text"
}, Yl = {
  class: "vb-simple-error",
  role: "alert"
}, Xl = ["onClick"], Ql = {
  key: 4,
  class: "vb-simple-text"
}, Zl = {
  key: 7,
  class: "vb-chat-search-status",
  role: "status"
}, ei = {
  key: 8,
  class: "vb-chat-search-warning"
}, ti = {
  key: 9,
  class: "vb-chat-sources"
}, ni = ["href"], si = { key: 0 }, oi = {
  key: 10,
  class: "vb-simple-message-meta"
}, ai = { class: "vb-simple-composer" }, li = { class: "vb-simple-composer-inner" }, ii = {
  key: 0,
  class: "vb-simple-tools"
}, ri = { class: "vb-simple-quick" }, ui = { class: "vb-simple-quick-panel" }, di = ["onClick"], ci = {
  key: 0,
  class: "vb-simple-status",
  role: "status"
}, vi = ["accept"], mi = {
  key: 0,
  class: "vb-chat-draft-attachments",
  "aria-label": "待发送附件"
}, pi = ["disabled", "aria-label", "onClick"], bi = ["src", "alt"], fi = {
  key: 0,
  role: "status"
}, gi = {
  key: 1,
  role: "alert"
}, hi = { key: 2 }, yi = ["aria-label", "onClick"], ki = { class: "vb-simple-editor-bottom" }, wi = { class: "vb-chat-input-tools" }, $i = {
  class: "vb-chat-search-toggle",
  title: "开启后会用本条问题文字搜索网页；不会把档案、饮食记录或附件发送给搜索接口。"
}, _i = ["disabled"], Ai = {
  key: 1,
  class: "vb-simple-notice",
  role: "alert"
}, Ci = ["role"], Si = { class: "vb-simple-footnote" }, Ii = { class: "vb-simple-privacy" }, Ei = ["src", "alt"], xi = {
  key: 1,
  class: "vb-chat-text-preview"
}, Ui = { class: "vb-data-note" }, _n = "weiheng.ai-diet-chat.v1", ji = /* @__PURE__ */ Ye({
  __name: "AiDietAssistantPage",
  props: {
    active: { type: Boolean, default: !0 },
    records: { default: () => [] },
    targets: { default: null },
    profile: { default: null },
    initialDate: { default: "" }
  },
  setup(t) {
    const s = t, n = [
      "分析今天已记录的营养摄入，并说明数据完整性。",
      "查看已记录食物的维生素和矿物质摄入情况，缺失数据请说明。",
      "解释我的营养参考值及其适用范围。",
      "根据饮食记录安排下一餐，先询问必要的就餐条件。"
    ];
    function u() {
      return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    function i(E) {
      return Array.isArray(E) ? E.flatMap((_) => {
        if (!_ || typeof _ != "object") return [];
        const y = _;
        try {
          const W = new URL(String(y.url || ""));
          return ["https:", "http:"].includes(W.protocol) ? [{
            title: typeof y.title == "string" ? y.title.slice(0, 180) : "网页来源",
            url: W.href,
            siteName: typeof y.siteName == "string" ? y.siteName.slice(0, 100) : void 0,
            date: typeof y.date == "string" ? y.date.slice(0, 40) : void 0
          }] : [];
        } catch {
          return [];
        }
      }).slice(0, 5) : [];
    }
    function r() {
      try {
        const E = JSON.parse(Ce.getItem(_n) || "null");
        if (!E || typeof E != "object") return { threads: [], activeByDate: {}, memoryEnabled: !0, webSearchEnabled: !1 };
        const _ = E, y = Array.isArray(_.threads) ? _.threads.flatMap((ne) => {
          if (!ne || typeof ne != "object") return [];
          const Z = ne;
          return typeof Z.id != "string" || !Oe(Z.date) || !Array.isArray(Z.messages) ? [] : [{
            id: Z.id,
            date: Z.date,
            createdAt: typeof Z.createdAt == "string" ? Z.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
            messages: Z.messages.filter((le) => !!(le && typeof le == "object" && ["user", "assistant"].includes(le.role) && typeof le.content == "string")).map((le) => ({
              ...le,
              status: le.status === "sending" ? "failed" : le.status,
              error: le.status === "sending" ? "页面刷新时请求中断。点击重试可继续这条问题。" : le.error,
              webSearch: typeof le.webSearch == "boolean" ? le.webSearch : void 0,
              webSearchStatus: typeof le.webSearchStatus == "string" ? le.webSearchStatus.slice(0, 80) : void 0,
              webSearchWarning: typeof le.webSearchWarning == "string" ? le.webSearchWarning.slice(0, 160) : void 0,
              webSources: i(le.webSources)
            }))
          }];
        }) : [], W = _.activeByDate && typeof _.activeByDate == "object" ? Object.fromEntries(Object.entries(_.activeByDate).filter(([ne, Z]) => Oe(ne) && typeof Z == "string")) : {};
        return { threads: y.slice(-60), activeByDate: W, memoryEnabled: _.memoryEnabled !== !1, webSearchEnabled: _.webSearchEnabled === !0 };
      } catch {
        return { threads: [], activeByDate: {}, memoryEnabled: !0, webSearchEnabled: !1 };
      }
    }
    const d = r(), m = D(d.threads), c = D(yn(d, d.activeByDate)), v = /* @__PURE__ */ new Set(), g = D(d.memoryEnabled), k = D(d.webSearchEnabled), f = D(_e());
    ve(() => s.initialDate, (E) => {
      E && Oe(E) && E <= _e() && (f.value = E);
    });
    const p = D(""), S = D(null), h = D([]), w = D({}), $ = D(null), z = H(() => h.value.some((E) => E.status === "ready"));
    let X = 0;
    const R = D(""), M = D(""), V = D(null), T = D(null), O = H(() => m.value.some((E) => E.messages.some((_) => _.status === "sending"))), de = H(() => s.records.find((E) => E.date === f.value)), K = H(() => de.value?.entries || []), he = H(() => ({
      energy: typeof s.targets?.tdee == "number" ? s.targets.tdee : null,
      protein: s.targets?.macros?.find((E) => E.id === "protein")?.grams ?? null,
      carbs: s.targets?.macros?.find((E) => E.id === "carbs")?.grams ?? null,
      fat: s.targets?.macros?.find((E) => E.id === "fat")?.grams ?? null
    })), ae = H(() => m.value.find((E) => E.id === c.value[f.value])), ie = H(() => ae.value?.messages || []), { showJump: Ae, onScroll: Q, onContentLoad: B, jumpToLatest: j } = il({ viewport: V, content: T, active: H(() => s.active), thread: H(() => ae.value?.id), messages: ie }), q = H(() => m.value.filter((E) => E.messages.length).sort((E, _) => _.createdAt.localeCompare(E.createdAt)));
    function I(E) {
      const _ = E.target.value, y = m.value.find((W) => W.id === _);
      y && (f.value = y.date, c.value[y.date] = y.id);
    }
    function x(E) {
      const _ = ie.value, y = _.findIndex((W) => W.id === E);
      return _.slice(0, y).reverse().find((W) => W.role === "user")?.content || "";
    }
    function me(E) {
      const { id: _, kind: y, name: W, size: ne, mimeType: Z } = E;
      return { id: _, kind: y, name: W, size: ne, mimeType: Z };
    }
    function Y(E) {
      return E >= 1024 * 1024 ? `${(E / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(E / 1024))} KB`;
    }
    async function C(E) {
      const _ = X;
      M.value = "";
      for (const y of E) {
        if (_ !== X) break;
        if (h.value.length >= ml) {
          M.value = "每条消息最多添加 3 个附件。";
          break;
        }
        let W;
        try {
          W = Jn(y);
        } catch (Z) {
          M.value = Z instanceof Error ? Z.message : "这个文件暂不支持。";
          continue;
        }
        const ne = u();
        h.value.push({ id: ne, kind: W, name: y.name.slice(0, 180), size: y.size, mimeType: y.type, status: "reading" });
        try {
          const Z = await Cl(y, ne);
          if (!h.value.some((we) => we.id === ne)) continue;
          if (h.value.reduce((we, $e) => we + ($e.value?.text?.length || 0), Z.text?.length || 0) > $n) throw new Error("本条消息的附件文字总量不能超过 60,000 字。");
          await kl(Z);
          const fe = h.value.find((we) => we.id === ne);
          if (!fe) {
            await ht(ne);
            continue;
          }
          w.value[ne] = Z, fe.value = Z, fe.status = "ready";
        } catch (Z) {
          const le = h.value.find((fe) => fe.id === ne);
          le && (le.status = "failed", le.error = Z instanceof Error ? Z.message : "附件读取失败，请重新选择。");
        }
      }
    }
    function N(E) {
      const _ = E.target, y = Array.from(_.files || []);
      _.value = "", C(y);
    }
    function re(E) {
      const _ = Array.from(E.clipboardData?.files || []).filter((y) => y.type.startsWith("image/"));
      _.length && (E.preventDefault(), C(_));
    }
    function ue(E) {
      E.dataTransfer?.types.includes("Files") && E.preventDefault();
    }
    function xe(E) {
      const _ = Array.from(E.dataTransfer?.files || []);
      _.length && (E.preventDefault(), C(_));
    }
    function ct(E) {
      h.value = h.value.filter((_) => _.id !== E), delete w.value[E], ht(E).catch(() => {
        M.value = "本地附件未能移除，请检查存储设置。";
      });
    }
    function vt() {
      const E = h.value.flatMap((y) => y.status === "ready" && y.value ? [y.value] : []), _ = new Set(E.map((y) => y.id));
      return h.value = h.value.filter((y) => !_.has(y.id)), E;
    }
    async function Ze(E) {
      try {
        const _ = w.value[E.id] || await Ft(E.id);
        if (!_) throw new Error("附件已不在本地存储中，请重新添加。");
        $.value = _;
      } catch (_) {
        M.value = _ instanceof Error ? _.message : "无法预览附件。";
      }
    }
    ve(() => ie.value.flatMap((E) => E.attachments || []).map((E) => E.id).join(","), async () => {
      for (const E of ie.value.flatMap((_) => _.attachments || []))
        if (!w.value[E.id])
          try {
            const _ = await Ft(E.id);
            _ && (w.value[E.id] = _);
          } catch {
          }
    }, { immediate: !0 });
    function mt(E) {
      const _ = { id: u(), date: E, createdAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [] };
      if (m.value.push(_), m.value.length > 60) {
        const y = m.value.splice(0, m.value.length - 60);
        pt(y.flatMap((W) => W.messages));
      }
      return c.value[E] = _.id, _;
    }
    function pt(E) {
      for (const _ of E.flatMap((y) => y.attachments || []))
        delete w.value[_.id], ht(_.id).catch(() => {
          R.value = "部分旧附件未能清理，请检查浏览器存储设置。";
        });
    }
    function qe(E) {
      const _ = c.value[E];
      if (_ && m.value.some((W) => W.id === _)) return;
      const y = m.value.filter((W) => W.date === E).sort((W, ne) => ne.createdAt.localeCompare(W.createdAt))[0];
      y ? c.value[E] = y.id : mt(E);
    }
    qe(f.value), ve(f, (E) => {
      if (!Oe(E) || E > _e()) {
        f.value = _e();
        return;
      }
      qe(E), M.value = "";
    });
    let ee = !1, G = !1;
    function se() {
      if (O.value) {
        G = !0;
        return;
      }
      G = !1, ee = !0;
      const E = r();
      m.value = E.threads, c.value = yn(E, c.value, [...v]), g.value = E.memoryEnabled, k.value = E.webSearchEnabled, qe(f.value), Me(() => {
        ee = !1;
      });
    }
    window.addEventListener("weiheng-chat-synced", se), We(() => window.removeEventListener("weiheng-chat-synced", se));
    let ye;
    function je() {
      if (ye && clearTimeout(ye), ye = void 0, !Ke())
        try {
          Ce.setItem(_n, JSON.stringify({ threads: m.value, activeByDate: c.value, memoryEnabled: g.value, webSearchEnabled: k.value })), R.value = "";
        } catch {
          R.value = "浏览器未能保存对话记录；请检查本地存储空间或隐私设置。";
        }
    }
    function Wn() {
      ee || (ye && clearTimeout(ye), ye = setTimeout(je, 160));
    }
    ve([m, c, g, k], Wn, { deep: !0 });
    function bt() {
      je();
    }
    typeof window < "u" && (window.addEventListener("pagehide", bt), window.addEventListener("weiheng-chat-flush", bt)), We(() => {
      je(), typeof window < "u" && (window.removeEventListener("pagehide", bt), window.removeEventListener("weiheng-chat-flush", bt));
    });
    let De;
    function Kn() {
      const E = De;
      E && (De = void 0, E.controller.abort(), E.assistantMessage.status === "sending" && (E.assistantMessage.status = "failed", E.assistantMessage.error = "这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。"), je());
    }
    function Yn(E) {
      const _ = new Date(E);
      return Number.isNaN(_.getTime()) ? "新对话" : _.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function Xn(E) {
      const _ = new Date(E);
      return Number.isNaN(_.getTime()) ? "" : _.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    function Qn() {
      return K.value.map((E) => ({
        foodId: E.foodId,
        name: E.name,
        grams: E.grams,
        meal: E.meal,
        referenceConfirmed: E.referenceConfirmed,
        source: E.source,
        nutritionSnapshot: E.nutritionSnapshot
      }));
    }
    async function Zn(E, _) {
      const y = E.slice(0, _).filter((fe) => fe.status === "complete"), W = [];
      for (const { role: fe, content: we, attachments: $e } of y) {
        const Ne = { role: fe, content: we.slice(0, 1200), attachments: $e };
        fe === "user" ? W.at(-1)?.role === "user" ? W[W.length - 1] = Ne : W.push(Ne) : W.at(-1)?.role === "user" && W.push(Ne);
      }
      for (; W[0]?.role !== "user"; ) W.shift();
      const ne = W.slice(-11);
      for (; ne.reduce((fe, we) => fe + we.content.length, 0) > 9e3; ) ne.splice(0, 2);
      let Z = 0, le = 0;
      for (let fe = ne.length - 1; fe >= 0; fe--) {
        const we = ne[fe], $e = [];
        let Ne = !1;
        for (const ft of we.attachments || []) {
          const Re = w.value[ft.id] || await Ft(ft.id);
          if (!Re) {
            if (fe === ne.length - 1) throw new Error("找不到这条问题的本地附件，请重新添加后发送。");
            Ne = !0;
            continue;
          }
          if (Z + (Re.text?.length || 0) > $n || Re.kind === "image" && le >= fl) {
            Ne = !0;
            continue;
          }
          Z += Re.text?.length || 0, Re.kind === "image" && le++, $e.push(Re);
        }
        we.attachments = $e.length ? $e : void 0, Ne && (we.content = we.content.slice(0, 1100) + `
（这条较早消息的附件未带入本次请求，请勿推测其内容。）`);
      }
      return ne;
    }
    async function on(E, _, y = []) {
      const W = E.trim() || (y.length ? "请帮我分析这些附件。" : "");
      if (!W || W.length > 1200) return !1;
      Kn(), qe(f.value);
      const ne = ae.value;
      if (!ne) return !1;
      let Z, le, fe = k.value;
      if (_) {
        le = ne.messages.findIndex((Pe) => Pe.id === _ && Pe.role === "assistant");
        const ze = ne.messages[le - 1];
        if (le < 1 || ze?.role !== "user")
          return M.value = "找不到这条问题对应的对话，请开始新对话后重试。", !1;
        fe = ze.webSearch !== !1, Z = ne.messages[le], Z.status = "sending", Z.error = void 0, Z.content = "", Z.webSearchWarning = void 0, Z.webSources = void 0, Z.webSearchStatus = fe ? "正在联网搜索…" : "正在回复…";
      } else
        ne.messages.push({ id: u(), role: "user", content: W, attachments: y.length ? y.map(me) : void 0, webSearch: fe, status: "complete", createdAt: (/* @__PURE__ */ new Date()).toISOString() }), Z = rl(ne.messages, u(), (/* @__PURE__ */ new Date()).toISOString()), Z.webSearchStatus = fe ? "正在联网搜索…" : "正在回复…", ne.messages.length > 120 && pt(ne.messages.splice(0, ne.messages.length - 120)), le = ne.messages.length - 1;
      j(), je(), M.value = "";
      const we = new AbortController(), $e = { controller: we, assistantMessage: Z };
      De = $e;
      const Ne = f.value, ft = Qn(), Re = he.value, ss = vl(s.profile), os = cl(m.value, ne.id, g.value);
      try {
        const ze = await Zn(ne.messages, le);
        if (De !== $e) return !1;
        if (ze.at(-1)?.role !== "user") throw new Error("对话状态不完整，请点击重试或开始新对话。");
        const Pe = await Fn("chat", {
          date: Ne,
          messages: ze,
          entries: ft,
          targets: Re,
          profile: ss,
          memory: os,
          webSearch: fe
        }, (Se) => {
          De === $e && (Se.type === "status" ? Z.webSearchStatus = Se.message : Se.type === "delta" ? Z.content += Se.text : Se.type === "done" && (typeof Se.content == "string" && (Z.content = Se.content), Z.model = Se.model, Z.context = Se.contextSummary, Z.createdAt = Se.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Z.webSources = i(Se.webSources), Z.webSearchWarning = Se.webSearchWarning, Z.webSearchStatus = ""));
        }, we.signal);
        if (De !== $e) return !1;
        if (!Z.content.trim() || typeof Pe.model != "string")
          throw new Error("AI 返回的数据格式不正确，请重试。");
        return Z.model = Pe.model, Z.context = Pe.contextSummary, Z.createdAt = Pe.generatedAt || (/* @__PURE__ */ new Date()).toISOString(), Z.webSources = i(Pe.webSources), Z.webSearchWarning = Pe.webSearchWarning, Z.webSearchStatus = "", Z.status = "complete", je(), _s(), !0;
      } catch (ze) {
        return De !== $e || (Z.status = "failed", Z.error = ze instanceof Error ? ze.message : "AI 暂时无法回复，请重试。", Z.webSearchStatus = "", je()), !1;
      } finally {
        De === $e && (De = void 0), G && !O.value && se();
      }
    }
    function an() {
      const E = p.value.trim();
      if (!E && !z.value || E.length > 1200) return;
      const _ = vt();
      p.value = "", on(E, void 0, _);
    }
    function ln(E) {
      p.value = E, Me(() => document.getElementById("vb-diet-chat-input")?.focus());
    }
    function es(E) {
      E.key === "Enter" && !E.shiftKey && !E.isComposing && (E.preventDefault(), an());
    }
    function rn(E) {
      const _ = ie.value.findIndex((W) => W.id === E), y = ie.value[_ - 1];
      _ > 0 && y?.role === "user" && on(y.content, E);
    }
    function ts() {
      X++, v.add(mt(f.value).id);
      for (const E of h.value) ct(E.id);
      M.value = "";
    }
    function ns() {
      if (!window.confirm("清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。")) return;
      const E = m.value.flatMap((_) => _.messages.flatMap((y) => y.attachments || []));
      for (const _ of E)
        delete w.value[_.id], ht(_.id).catch(() => {
          R.value = "部分本地附件未能清除，请检查浏览器存储设置。";
        });
      $s(), m.value = [], c.value = {}, R.value = "", qe(f.value), M.value = "当前空间的聊天记录已清除。";
    }
    return (E, _) => (o(), a("section", Sl, [
      e("header", Il, [
        _[16] || (_[16] = e("div", { class: "vb-simple-title" }, [
          e("h1", null, "维衡AI助手"),
          e("p", null, "聊聊想法；开启记忆后，也能延续之前的对话。")
        ], -1)),
        e("div", El, [
          e("label", xl, [
            U(F, {
              name: "calendar",
              size: 16
            }),
            _[10] || (_[10] = e("span", { class: "vb-sr-only" }, "选择饮食日期", -1)),
            te(e("input", {
              "onUpdate:modelValue": _[0] || (_[0] = (y) => f.value = y),
              type: "date",
              max: b(_e)(),
              disabled: O.value,
              "aria-label": "选择饮食日期"
            }, null, 8, Ul), [
              [ce, f.value]
            ])
          ]),
          e("button", {
            type: "button",
            class: "vb-simple-new",
            onClick: ts
          }, [
            U(F, {
              name: "plus",
              size: 16
            }),
            _[11] || (_[11] = P("新对话", -1))
          ]),
          e("details", jl, [
            e("summary", Dl, [
              _[12] || (_[12] = P("更多", -1)),
              U(F, {
                name: "chevron",
                size: 14
              })
            ]),
            e("div", Nl, [
              q.value.length ? (o(), a("label", Pl, [
                _[13] || (_[13] = P(" 历史对话 ", -1)),
                e("select", {
                  value: ae.value?.id,
                  disabled: O.value,
                  "aria-label": "切换历史对话",
                  onChange: I
                }, [
                  ie.value.length ? A("", !0) : (o(), a("option", {
                    key: 0,
                    value: ae.value?.id
                  }, "当前新对话", 8, Tl)),
                  (o(!0), a(L, null, J(q.value, (y) => (o(), a("option", {
                    key: y.id,
                    value: y.id
                  }, l(y.date) + " · " + l(Yn(y.createdAt)) + " · " + l(y.messages.length) + " 条消息", 9, Rl))), 128))
                ], 40, Ml)
              ])) : A("", !0),
              e("label", zl, [
                te(e("input", {
                  "onUpdate:modelValue": _[1] || (_[1] = (y) => g.value = y),
                  type: "checkbox"
                }, null, 512), [
                  [nt, g.value]
                ]),
                _[14] || (_[14] = e("span", null, [
                  e("strong", null, "跨对话记忆"),
                  e("small", null, "开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。")
                ], -1))
              ]),
              _[15] || (_[15] = e("p", null, "登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。", -1)),
              e("button", {
                type: "button",
                disabled: O.value,
                onClick: ns
              }, "清除本地记录", 8, Ol)
            ])
          ])
        ])
      ]),
      e("div", {
        ref_key: "conversation",
        ref: V,
        class: ge(["vb-simple-scroll", { "is-empty": !ie.value.length }]),
        onScrollPassive: _[2] || (_[2] = //@ts-ignore
        (...y) => b(Q) && b(Q)(...y)),
        onLoadCapture: _[3] || (_[3] = //@ts-ignore
        (...y) => b(B) && b(B)(...y)),
        role: "log",
        "aria-live": "polite",
        "aria-relevant": "additions text"
      }, [
        ie.value.length ? (o(), a("div", {
          key: 1,
          ref_key: "conversationContent",
          ref: T,
          class: "vb-simple-thread"
        }, [
          (o(!0), a(L, null, J(ie.value, (y) => (o(), a("article", {
            key: y.id,
            class: ge(["vb-simple-message", [`is-${y.role}`, `is-${y.status}`]])
          }, [
            y.role === "assistant" ? (o(), a("span", Vl, [
              U(F, {
                name: "sparkles",
                size: 18
              })
            ])) : A("", !0),
            e("div", ql, [
              y.attachments?.length ? (o(), a("div", Gl, [
                (o(!0), a(L, null, J(y.attachments, (W) => (o(), a("button", {
                  key: W.id,
                  type: "button",
                  class: "vb-chat-file",
                  "aria-label": "查看附件：" + W.name,
                  onClick: (ne) => Ze(W)
                }, [
                  W.kind === "image" && w.value[W.id]?.dataUrl ? (o(), a("img", {
                    key: 0,
                    src: w.value[W.id].dataUrl,
                    alt: W.name
                  }, null, 8, Hl)) : (o(), pe(F, {
                    key: 1,
                    name: W.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, l(W.name), 1),
                    e("small", null, l(W.kind === "image" ? "照片" : "文件文字") + " · " + l(Y(W.size)), 1)
                  ])
                ], 8, Jl))), 128))
              ])) : A("", !0),
              y.status === "sending" && !y.content ? (o(), a("div", Wl, [
                _[19] || (_[19] = e("span", { class: "vb-loading-ring" }, null, -1)),
                e("span", null, l(y.webSearchStatus || "正在回复…"), 1)
              ])) : y.status === "sending" ? (o(), a("div", Kl, [
                U(b(_t), {
                  content: y.content
                }, null, 8, ["content"]),
                _[20] || (_[20] = e("span", {
                  class: "vb-chat-stream-cursor",
                  "aria-label": "正在生成"
                }, "▍", -1))
              ])) : y.status === "failed" ? (o(), a(L, { key: 3 }, [
                y.content ? (o(), pe(b(_t), {
                  key: 0,
                  class: "vb-simple-text",
                  content: y.content
                }, null, 8, ["content"])) : A("", !0),
                e("p", Yl, l(y.error || "AI 回复失败。"), 1),
                e("button", {
                  class: "vb-text-button vb-simple-retry",
                  type: "button",
                  onClick: (W) => rn(y.id)
                }, [
                  U(F, {
                    name: "activity",
                    size: 14
                  }),
                  _[21] || (_[21] = P("重试这条问题", -1))
                ], 8, Xl)
              ], 64)) : y.role !== "assistant" ? (o(), a("p", Ql, l(y.content), 1)) : b(Ht)(x(y.id)) ? A("", !0) : (o(), pe(b(_t), {
                key: 5,
                class: "vb-simple-text",
                content: y.content
              }, null, 8, ["content"])),
              y.role === "assistant" && y.status === "complete" && y.content.trim() && b(Ht)(x(y.id)) ? (o(), pe(al, {
                key: 6,
                content: y.content,
                question: x(y.id),
                auto: ie.value.at(-1)?.id === y.id,
                onRetry: (W) => rn(y.id)
              }, null, 8, ["content", "question", "auto", "onRetry"])) : A("", !0),
              y.status === "sending" && y.content && y.webSearchStatus ? (o(), a("small", Zl, l(y.webSearchStatus), 1)) : A("", !0),
              y.role === "assistant" && y.status === "complete" && y.webSearchWarning ? (o(), a("p", ei, l(y.webSearchWarning), 1)) : A("", !0),
              y.role === "assistant" && y.status === "complete" && y.webSources?.length ? (o(), a("details", ti, [
                e("summary", null, "联网来源 · " + l(y.webSources.length), 1),
                e("ol", null, [
                  (o(!0), a(L, null, J(y.webSources, (W, ne) => (o(), a("li", {
                    key: W.url
                  }, [
                    e("a", {
                      href: W.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }, [
                      e("span", null, "[" + l(ne + 1) + "]", 1),
                      P(" " + l(W.title), 1)
                    ], 8, ni),
                    W.siteName || W.date ? (o(), a("small", si, l([W.siteName, W.date].filter(Boolean).join(" · ")), 1)) : A("", !0)
                  ]))), 128))
                ])
              ])) : A("", !0),
              y.status === "complete" ? (o(), a("small", oi, [
                P(l(Xn(y.createdAt)), 1),
                y.role === "assistant" ? (o(), a(L, { key: 0 }, [
                  P(" · " + l(b(Xe)(y.model)), 1)
                ], 64)) : A("", !0)
              ])) : A("", !0)
            ])
          ], 2))), 128))
        ], 512)) : (o(), a("div", {
          key: 0,
          ref_key: "conversationContent",
          ref: T,
          class: "vb-simple-welcome"
        }, [
          _[17] || (_[17] = e("h2", null, "今天想聊些什么？", -1)),
          _[18] || (_[18] = e("p", null, "从一个问题开始，或试试下面的提问。", -1)),
          e("div", Fl, [
            (o(), a(L, null, J(n, (y) => e("button", {
              key: y,
              type: "button",
              onClick: (W) => ln(y)
            }, [
              e("span", null, l(y), 1),
              U(F, {
                name: "arrow",
                size: 16
              })
            ], 8, Bl)), 64))
          ]),
          e("small", Ll, "饮食参考日期：" + l(f.value), 1)
        ], 512))
      ], 34),
      e("footer", ai, [
        b(Ae) ? (o(), a("button", {
          key: 0,
          type: "button",
          class: "vb-chat-jump-bottom",
          "aria-label": "回到最新消息",
          title: "一键到底",
          onClick: _[4] || (_[4] = //@ts-ignore
          (...y) => b(j) && b(j)(...y))
        }, [
          U(F, {
            name: "arrow",
            size: 20
          })
        ])) : A("", !0),
        e("div", li, [
          ie.value.length ? (o(), a("div", ii, [
            e("details", ri, [
              e("summary", null, [
                _[22] || (_[22] = P("快捷提问", -1)),
                U(F, {
                  name: "chevron",
                  size: 12
                })
              ]),
              e("div", ui, [
                (o(), a(L, null, J(n, (y) => e("button", {
                  key: y,
                  type: "button",
                  onClick: (W) => ln(y)
                }, [
                  P(l(y), 1),
                  U(F, {
                    name: "arrow",
                    size: 14
                  })
                ], 8, di)), 64))
              ])
            ]),
            O.value ? (o(), a("span", ci, "正在回复，发送新消息可打断")) : A("", !0)
          ])) : A("", !0),
          e("div", {
            class: "vb-simple-editor",
            onDragover: ue,
            onDrop: xe
          }, [
            e("input", {
              ref_key: "fileInput",
              ref: S,
              class: "vb-chat-file-input",
              type: "file",
              multiple: "",
              accept: b(gl),
              "aria-label": "选择照片或文件",
              onChange: N
            }, null, 40, vi),
            h.value.length ? (o(), a("div", mi, [
              (o(!0), a(L, null, J(h.value, (y) => (o(), a("div", {
                key: y.id,
                class: ge(["vb-chat-file", { "is-failed": y.status === "failed" }])
              }, [
                e("button", {
                  type: "button",
                  class: "vb-chat-file-preview",
                  disabled: y.status !== "ready",
                  "aria-label": "预览附件：" + y.name,
                  onClick: (W) => Ze(y)
                }, [
                  y.value?.dataUrl ? (o(), a("img", {
                    key: 0,
                    src: y.value.dataUrl,
                    alt: y.name
                  }, null, 8, bi)) : (o(), pe(F, {
                    key: 1,
                    name: y.kind === "image" ? "image" : "report",
                    size: 22
                  }, null, 8, ["name"])),
                  e("span", null, [
                    e("strong", null, l(y.name), 1),
                    y.status === "reading" ? (o(), a("small", fi, "正在读取…")) : y.status === "failed" ? (o(), a("small", gi, l(y.error), 1)) : (o(), a("small", hi, l(Y(y.size)) + " · 待发送", 1))
                  ])
                ], 8, pi),
                e("button", {
                  type: "button",
                  class: "vb-chat-file-remove",
                  "aria-label": "移除附件：" + y.name,
                  onClick: (W) => ct(y.id)
                }, [
                  U(F, {
                    name: "close",
                    size: 13
                  })
                ], 8, yi)
              ], 2))), 128))
            ])) : A("", !0),
            _[26] || (_[26] = e("label", {
              class: "vb-sr-only",
              for: "vb-diet-chat-input"
            }, "输入你想聊的内容", -1)),
            te(e("textarea", {
              id: "vb-diet-chat-input",
              "onUpdate:modelValue": _[5] || (_[5] = (y) => p.value = y),
              rows: "2",
              maxlength: "1200",
              placeholder: "问一个问题，或添加照片、文件…",
              onKeydown: es,
              onPaste: re
            }, null, 544), [
              [ce, p.value]
            ]),
            e("div", ki, [
              e("div", wi, [
                e("button", {
                  type: "button",
                  class: "vb-chat-attach-button",
                  "aria-label": "添加照片或文件",
                  title: "添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB",
                  onClick: _[6] || (_[6] = (y) => S.value?.click())
                }, [
                  U(F, {
                    name: "paperclip",
                    size: 18
                  }),
                  _[23] || (_[23] = e("span", null, "附件", -1))
                ]),
                e("label", $i, [
                  te(e("input", {
                    "onUpdate:modelValue": _[7] || (_[7] = (y) => k.value = y),
                    type: "checkbox",
                    "aria-label": "联网搜索"
                  }, null, 512), [
                    [nt, k.value]
                  ]),
                  _[24] || (_[24] = e("span", null, "联网搜索", -1))
                ]),
                _[25] || (_[25] = e("span", null, "Enter 发送 · Shift+Enter 换行", -1))
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-primary vb-simple-send",
                disabled: !p.value.trim() && !z.value,
                onClick: _[8] || (_[8] = (y) => an())
              }, [
                U(F, {
                  name: "arrow",
                  size: 16
                }),
                P(l(O.value ? "打断并发送" : "发送"), 1)
              ], 8, _i)
            ])
          ], 32),
          b(Ee) && b(ws) === "error" ? (o(), a("p", Ai, "聊天同步暂时失败，本机记录已保留，将自动重试。")) : A("", !0),
          R.value || M.value ? (o(), a("p", {
            key: 2,
            class: "vb-simple-notice",
            role: R.value ? "alert" : "status"
          }, l(R.value || M.value), 9, Ci)) : A("", !0),
          e("div", Si, [
            e("details", Ii, [
              e("summary", null, [
                U(F, {
                  name: "lock",
                  size: 12
                }),
                _[27] || (_[27] = P("隐私与使用说明", -1))
              ]),
              _[28] || (_[28] = e("div", { class: "vb-simple-privacy-panel" }, [
                e("p", null, "附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。"),
                e("p", null, "选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给维衡 AI，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。"),
                e("p", null, "点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 维衡 AI 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。"),
                e("p", null, "开启“联网搜索”后，仅把本条问题文字（最多 128 字）发送给网页搜索接口；身体档案、饮食记录、附件和跨对话记忆不会发送给搜索接口。联网检索由 DeepSeek Search & Fetch 提供，可能产生搜索 API 费用。"),
                e("p", null, "跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。"),
                e("p", null, "饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。")
              ], -1))
            ]),
            e("span", null, l(p.value.length ? `${p.value.length}/1200` : "AI 内容仅供参考"), 1)
          ])
        ])
      ]),
      $.value ? (o(), pe(dt, {
        key: 0,
        title: $.value.name,
        wide: "",
        onClose: _[9] || (_[9] = (y) => $.value = null)
      }, {
        default: ut(() => [
          $.value.kind === "image" ? (o(), a("img", {
            key: 0,
            class: "vb-chat-image-preview",
            src: $.value.dataUrl,
            alt: $.value.name
          }, null, 8, Ei)) : (o(), a("pre", xi, l($.value.text), 1)),
          e("p", Ui, l($.value.kind === "image" ? "照片将压缩后发送。" : "这里只展示提取的文件文字。"), 1)
        ]),
        _: 1
      }, 8, ["title"])) : A("", !0)
    ]));
  }
}), Di = /* @__PURE__ */ Mn(ji, [["__scopeId", "data-v-a14df457"]]), Ni = {
  key: 0,
  class: "vb-page-title"
}, Pi = {
  key: 1,
  class: "vb-date-tabs",
  "aria-label": "选择评估日期"
}, Mi = ["aria-pressed", "onClick"], Ti = { class: "vb-glass vb-review-hero" }, Ri = { class: "vb-icon-badge vb-large-badge" }, zi = { class: "vb-small-label" }, Oi = { class: "vb-coverage-score" }, Fi = { class: "vb-assessment-grid" }, Bi = { class: "vb-glass vb-coverage-card" }, Li = { class: "vb-section-heading" }, Vi = { class: "vb-coverage-list" }, qi = { class: "vb-food-category-icon" }, Gi = { class: "vb-coverage-name" }, Ji = { key: 0 }, Hi = {
  class: "vb-coverage-track",
  "aria-hidden": "true"
}, Wi = { class: "vb-inline-note" }, Ki = { class: "vb-glass vb-suggestion-card" }, Yi = ["checked", "onChange"], Xi = {
  key: 3,
  class: "vb-glass vb-empty-review"
}, Qi = { class: "vb-empty-icon" }, Zi = { class: "vb-glass vb-supplement-card" }, er = { class: "vb-icon-badge" }, tr = {
  __name: "AssessmentPage",
  props: { records: Array, habits: Object, flags: Array, embedded: Boolean },
  emits: ["navigate", "toggle-habit"],
  setup(t) {
    const s = t, n = D(s.records[0]?.date || "");
    ve(() => s.records, (k) => {
      k.some((f) => f.date === n.value) || (n.value = k[0]?.date || "");
    });
    const u = H(() => s.records.find((k) => k.date === n.value)), i = (k) => Number(u.value?.foods?.[k]) || 0, r = H(() => Nt.filter((k) => i(k.key) <= 0)), d = H(() => Nt.length - r.value.length), m = H(() => Math.max(1, ...qt.map((k) => i(k.key)))), c = {
      vegetables: ["下一餐，多一种蔬菜", "按季节与口味，换一种颜色或种类。"],
      fruit: ["给日常留一份水果", "方便的时候，选择一种完整水果。"],
      staples: ["把主食也记下来", "完整记录，才能更清楚地回顾一天。"],
      wholegrains: ["让主食多一点变化", "试着用全谷物或杂豆替换部分精制主食。"],
      dairy: ["补充适合自己的奶类选择", "可选择奶类，或核对强化配方的替代品。"],
      protein: ["正餐配一种蛋白质食物", "肉、蛋、奶或豆制品可以按偏好轮换。"],
      fish: ["在后续餐次换一种搭配", "条件允许时，将鱼或水产加入食物轮换。"]
    }, v = H(() => (r.value.length ? r.value.slice(0, 3) : [{ key: "variety" }, { key: "record" }]).map((k) => ({ key: k.key, title: c[k.key]?.[0] || (k.key === "variety" ? "继续保持食物多样性" : "记下今天的新搭配"), detail: c[k.key]?.[1] || "按自己的作息与口味，维持可持续的小习惯。" }))), g = (k) => (s.habits[n.value] || []).includes(k);
    return (k, f) => (o(), a(L, null, [
      t.embedded ? A("", !0) : (o(), a("div", Ni, [
        f[4] || (f[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "从记录中，了解自己的日常"),
          e("h1", null, "AI 营养评估"),
          e("p", null, "看见食物搭配，找到下一餐可以尝试的小调整。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: f[0] || (f[0] = (p) => k.$emit("navigate", "diary"))
        }, [
          U(F, {
            name: "plus",
            size: 17
          }),
          f[3] || (f[3] = P("添加饮食记录", -1))
        ])
      ])),
      t.records.length > 1 ? (o(), a("div", Pi, [
        (o(!0), a(L, null, J(t.records.slice(0, 7), (p) => (o(), a("button", {
          key: p.date,
          class: ge({ selected: n.value === p.date }),
          "aria-pressed": n.value === p.date,
          onClick: (S) => n.value = p.date
        }, l(p.date), 11, Mi))), 128))
      ])) : A("", !0),
      u.value ? (o(), a(L, { key: 2 }, [
        e("section", Ti, [
          e("span", Ri, [
            U(F, {
              name: "leaf",
              size: 25
            })
          ]),
          e("div", null, [
            e("span", zi, l(u.value.date) + " · 饮食回顾", 1),
            e("h2", null, l(r.value.length ? "这些类别，这次还没有记到" : "这次记录覆盖了多类食物"), 1),
            e("p", null, l(r.value.length ? r.value.map((p) => p.name).join("、") : "保持多样性，也继续留意食物的份量与搭配。"), 1)
          ]),
          e("div", Oi, [
            e("strong", null, [
              P(l(d.value), 1),
              e("small", null, " / " + l(b(Nt).length), 1)
            ]),
            f[5] || (f[5] = e("span", null, "主要类别已记录", -1))
          ])
        ]),
        e("div", Fi, [
          e("section", Bi, [
            e("div", Li, [
              f[6] || (f[6] = e("div", null, [
                e("h2", null, "食物类别覆盖"),
                e("p", null, "按这一日保存的食用克数汇总")
              ], -1)),
              U(F, { name: "chart" })
            ]),
            e("div", Vi, [
              (o(!0), a(L, null, J(b(qt), (p) => (o(), a("div", {
                key: p.key,
                class: "vb-coverage-row"
              }, [
                e("span", qi, [
                  U(F, {
                    name: b(Dn)[p.key],
                    size: 17
                  }, null, 8, ["name"])
                ]),
                e("span", Gi, [
                  P(l(p.name), 1),
                  p.key === "snacks" ? (o(), a("small", Ji, "可选记录")) : A("", !0)
                ]),
                e("span", Hi, [
                  e("i", {
                    style: Sn({ width: i(p.key) / m.value * 100 + "%" })
                  }, null, 4)
                ]),
                e("span", {
                  class: ge(["vb-coverage-value", { "is-missing": !i(p.key) }])
                }, l(i(p.key) ? `${Math.round(i(p.key) * 10) / 10} g` : "未记录"), 3)
              ]))), 128))
            ]),
            e("p", Wi, [
              U(F, {
                name: "info",
                size: 15
              }),
              f[7] || (f[7] = P("未记录不等于没吃，也不能据此判断营养缺乏。", -1))
            ])
          ]),
          e("section", Ki, [
            f[8] || (f[8] = e("div", { class: "vb-section-heading" }, [
              e("div", null, [
                e("h2", null, "下一餐，做一点小调整"),
                e("p", null, "选一件适合自己的事就好")
              ]),
              e("span", { class: "vb-pill" }, "可选建议")
            ], -1)),
            (o(!0), a(L, null, J(v.value, (p) => (o(), a("label", {
              key: p.key,
              class: ge(["vb-check-row", { done: g(p.key) }])
            }, [
              e("input", {
                type: "checkbox",
                checked: g(p.key),
                onChange: (S) => k.$emit("toggle-habit", n.value, p.key)
              }, null, 40, Yi),
              e("span", null, [
                e("strong", null, l(p.title), 1),
                e("small", null, l(p.detail), 1)
              ])
            ], 2))), 128)),
            f[9] || (f[9] = e("p", { class: "vb-section-note" }, "勾选仅记录行动，不会改变上面的食物统计。", -1))
          ])
        ])
      ], 64)) : (o(), a("section", Xi, [
        e("span", Qi, [
          U(F, {
            name: "bowl",
            size: 36
          })
        ]),
        f[11] || (f[11] = e("h2", null, "先从记录一天饮食开始", -1)),
        f[12] || (f[12] = e("p", null, "保存后，这里会回顾食物类别，并提供简洁的搭配建议。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: f[1] || (f[1] = (p) => k.$emit("navigate", "diary"))
        }, [
          f[10] || (f[10] = P("记录今天的饮食", -1)),
          U(F, {
            name: "arrow",
            size: 17
          })
        ])
      ])),
      e("section", Zi, [
        e("span", er, [
          U(F, {
            name: "shield",
            size: 23
          })
        ]),
        e("div", null, [
          f[13] || (f[13] = e("span", { class: "vb-small-label" }, "补充剂安全提示", -1)),
          e("h2", null, l(t.flags.length ? "你标记了需要谨慎核对的情况" : "先看饮食，再考虑补充剂"), 1),
          e("p", null, l(t.flags.length ? "用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。" : "饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: f[2] || (f[2] = (p) => k.$emit("navigate", "about"))
        }, [
          f[14] || (f[14] = P("查看注意事项", -1)),
          U(F, {
            name: "arrow",
            size: 17
          })
        ])
      ])
    ], 64));
  }
}, nr = {
  key: 0,
  class: "vb-page-title"
}, sr = { class: "vb-date-input" }, or = {
  key: 1,
  class: "vb-report-toolbar"
}, ar = { class: "vb-date-input" }, lr = {
  key: 2,
  class: "vb-report-filter"
}, ir = {
  key: 3,
  class: "vb-report-list"
}, rr = { class: "vb-report-card-top" }, ur = { class: "vb-icon-badge" }, dr = {
  key: 0,
  class: "vb-feature-error"
}, cr = {
  key: 1,
  class: "vb-inline-warning"
}, vr = { class: "vb-report-card-actions" }, mr = ["onClick"], pr = ["disabled", "onClick"], br = {
  key: 4,
  class: "vb-glass vb-report-empty"
}, fr = { class: "vb-icon-badge" }, gr = /* @__PURE__ */ Ye({
  __name: "ReportsPage",
  props: {
    reports: {},
    records: {},
    profile: {},
    embedded: { type: Boolean }
  },
  emits: ["open", "retry", "navigate"],
  setup(t, { emit: s }) {
    const n = t, u = s, i = D(""), { isStale: r } = en(), d = H(() => n.reports.filter((v) => !i.value || v.date === i.value));
    function m(v) {
      return n.records.find((g) => g.date === v.date);
    }
    function c(v) {
      return r(v, m(v), n.profile) ? "需更新" : {
        pending: "正在分析",
        complete: "已完成",
        failed: "分析失败",
        interrupted: "已中断"
      }[v.status];
    }
    return (v, g) => (o(), a(L, null, [
      t.embedded ? (o(), a("div", or, [
        g[5] || (g[5] = e("p", null, "按日期筛选已生成的分析报告", -1)),
        e("label", ar, [
          U(F, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": g[1] || (g[1] = (k) => i.value = k),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ce, i.value]
          ])
        ])
      ])) : (o(), a("div", nr, [
        g[4] || (g[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "让每一次记录都有回顾"),
          e("h1", null, "AI 营养报告"),
          e("p", null, "按日期查看饮食分析，记录改变后可随时更新。")
        ], -1)),
        e("label", sr, [
          U(F, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": g[0] || (g[0] = (k) => i.value = k),
            type: "date",
            "aria-label": "筛选报告日期"
          }, null, 512), [
            [ce, i.value]
          ])
        ])
      ])),
      g[9] || (g[9] = e("p", { class: "vb-data-note vb-report-privacy" }, "报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给维衡 AI；照片和备注不随每日分析发送。", -1)),
      i.value ? (o(), a("div", lr, [
        e("span", null, l(d.value.length) + " 份报告", 1),
        e("button", {
          type: "button",
          class: "vb-text-button",
          onClick: g[2] || (g[2] = (k) => i.value = "")
        }, "清除日期筛选")
      ])) : A("", !0),
      d.value.length ? (o(), a("div", ir, [
        (o(!0), a(L, null, J(d.value, (k) => (o(), a("article", {
          key: k.id,
          class: "vb-glass vb-report-card"
        }, [
          e("div", rr, [
            e("span", ur, [
              U(F, { name: "report" })
            ]),
            e("div", null, [
              e("h2", null, l(k.date), 1),
              e("small", null, l(new Date(k.requestedAt).toLocaleString("zh-CN", { hour12: !1 })), 1)
            ]),
            e("span", {
              class: ge(["vb-pill", { "needs-update": c(k) === "需更新" }])
            }, l(c(k)), 3)
          ]),
          e("p", null, l(k.result?.summary || k.error || "AI 正在根据记录生成分析，可以稍后回来查看。"), 1),
          m(k) ? b(r)(k, m(k), t.profile) ? (o(), a("small", cr, "记录或个人目标已变化，此报告使用的是旧版本。")) : A("", !0) : (o(), a("small", dr, "对应记录已删除，保留报告快照。")),
          e("div", vr, [
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (f) => u("open", k.date, k.id)
            }, [
              g[6] || (g[6] = P("打开报告", -1)),
              U(F, {
                name: "arrow",
                size: 15
              })
            ], 8, mr),
            e("button", {
              type: "button",
              class: "vb-text-button",
              disabled: k.status === "pending" || !m(k),
              onClick: (f) => u("retry", k.date)
            }, "重新分析", 8, pr)
          ])
        ]))), 128))
      ])) : (o(), a("section", br, [
        e("span", fr, [
          U(F, {
            name: "report",
            size: 25
          })
        ]),
        e("h2", null, l(i.value ? "这一天还没有报告" : "从记录第一餐开始"), 1),
        g[8] || (g[8] = e("p", null, "保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。", -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: g[3] || (g[3] = (k) => u("navigate", "diary"))
        }, [
          g[7] || (g[7] = P("去记录饮食", -1)),
          U(F, {
            name: "arrow",
            size: 17
          })
        ])
      ]))
    ], 64));
  }
}), hr = { class: "vb-page-title" }, yr = {
  class: "vb-assessment-block",
  "aria-labelledby": "diet-assessment-heading"
}, kr = {
  class: "vb-assessment-block vb-assessment-reports",
  "aria-labelledby": "ai-report-heading"
}, wr = /* @__PURE__ */ Ye({
  __name: "AiNutritionAssessmentPage",
  props: {
    records: {},
    habits: {},
    flags: {},
    reports: {},
    profile: {}
  },
  emits: ["navigate", "toggleHabit", "openReport", "retryReport"],
  setup(t, { emit: s }) {
    const n = s;
    function u(i, r) {
      n("openReport", i, r);
    }
    return (i, r) => (o(), a(L, null, [
      e("div", hr, [
        r[6] || (r[6] = e("div", null, [
          e("h1", null, "营养摄入分析"),
          e("p", null, "先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: r[0] || (r[0] = (d) => n("navigate", "diary"))
        }, [
          U(F, {
            name: "plus",
            size: 17
          }),
          r[5] || (r[5] = P("添加饮食记录 ", -1))
        ])
      ]),
      U(As, {
        records: t.records,
        profile: t.profile || void 0
      }, null, 8, ["records", "profile"]),
      e("section", yr, [
        r[7] || (r[7] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "饮食结构回顾"),
            e("h2", { id: "diet-assessment-heading" }, "食物类别评估")
          ]),
          e("span", { class: "vb-subtle-label" }, "按已保存记录统计")
        ], -1)),
        U(tr, {
          records: t.records,
          habits: t.habits,
          flags: t.flags,
          embedded: "",
          onNavigate: r[1] || (r[1] = (d) => n("navigate", d)),
          onToggleHabit: r[2] || (r[2] = (d, m) => n("toggleHabit", d, m))
        }, null, 8, ["records", "habits", "flags"])
      ]),
      e("section", kr, [
        r[8] || (r[8] = e("div", { class: "vb-section-heading vb-integrated-heading" }, [
          e("div", null, [
            e("p", { class: "vb-eyebrow" }, "每日 AI 分析"),
            e("h2", { id: "ai-report-heading" }, "AI 营养报告")
          ]),
          e("span", { class: "vb-subtle-label" }, "可按日期筛选、查看和重试")
        ], -1)),
        U(gr, {
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
}), $r = { class: "vb-photo-picker" }, _r = {
  key: 0,
  class: "vb-photo-preview"
}, Ar = ["src"], Cr = { class: "vb-photo-actions" }, Sr = ["disabled"], Ir = ["disabled"], Er = {
  key: 1,
  class: "vb-photo-hint",
  role: "status"
}, xr = {
  key: 2,
  class: "vb-photo-error",
  role: "alert"
}, Ur = ["src"], jr = {
  __name: "DiaryPhotoPicker",
  props: { modelValue: { type: Object, default: null } },
  emits: ["update:modelValue", "selected"],
  setup(t, { emit: s }) {
    const n = s, u = D(!1), i = D(null), r = D(null), d = D(""), m = D(!1);
    function c(S) {
      return new Promise((h, w) => {
        const $ = URL.createObjectURL(S), z = new Image();
        z.onload = () => h({ image: z, url: $ }), z.onerror = () => {
          URL.revokeObjectURL($), w(new Error("这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。"));
        }, z.src = $;
      });
    }
    function v(S, h) {
      return new Promise((w, $) => S.toBlob((z) => z ? w(z) : $(new Error("图片处理失败，请重新选择。")), "image/jpeg", h));
    }
    function g(S) {
      return new Promise((h, w) => {
        const $ = new FileReader();
        $.onload = () => h($.result), $.onerror = () => w(new Error("图片读取失败，请重新选择。")), $.readAsDataURL(S);
      });
    }
    async function k(S) {
      let h;
      try {
        const w = await createImageBitmap(S);
        h = { image: w, width: w.width, height: w.height, cleanup: () => w.close() };
      } catch {
        const w = await c(S);
        h = { image: w.image, width: w.image.naturalWidth, height: w.image.naturalHeight, cleanup: () => URL.revokeObjectURL(w.url) };
      }
      try {
        const w = Math.min(1, 1200 / Math.max(h.width, h.height)), $ = document.createElement("canvas");
        $.width = Math.max(1, Math.round(h.width * w)), $.height = Math.max(1, Math.round(h.height * w));
        const z = $.getContext("2d");
        if (!z) throw new Error("浏览器暂不支持图片预览。");
        z.drawImage(h.image, 0, 0, $.width, $.height);
        let X = await v($, 0.76);
        if (X.size > 32e4 && (X = await v($, 0.58)), X.size > 32e4) {
          const R = document.createElement("canvas");
          R.width = Math.round($.width * 0.75), R.height = Math.round($.height * 0.75), R.getContext("2d")?.drawImage($, 0, 0, R.width, R.height), X = await v(R, 0.58);
        }
        return await g(X);
      } finally {
        h.cleanup();
      }
    }
    async function f(S, h) {
      const w = S.target, $ = w.files?.[0];
      if (w.value = "", !!$) {
        if (d.value = "", !$.type.startsWith("image/") || $.type === "image/svg+xml") {
          d.value = "请选择 JPG、PNG 或其他常见照片格式。";
          return;
        }
        if ($.size > 12 * 1024 * 1024) {
          d.value = "图片需小于 12 MB，请先选择较小的图片。";
          return;
        }
        m.value = !0;
        try {
          const z = await k($), X = { name: $.name.slice(0, 100), dataUrl: z, source: h, mime: "image/jpeg" };
          n("update:modelValue", X), n("selected", X);
        } catch (z) {
          d.value = z instanceof Error ? z.message : "无法处理这张图片，请重新选择。";
        } finally {
          m.value = !1;
        }
      }
    }
    function p() {
      d.value = "", n("update:modelValue", null);
    }
    return (S, h) => (o(), a("div", $r, [
      e("input", {
        ref_key: "cameraInput",
        ref: i,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        capture: "environment",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: h[0] || (h[0] = (w) => f(w, "拍照"))
      }, null, 544),
      e("input", {
        ref_key: "localInput",
        ref: r,
        class: "vb-sr-only",
        type: "file",
        accept: "image/*",
        "aria-hidden": "true",
        tabindex: "-1",
        onChange: h[1] || (h[1] = (w) => f(w, "本地图片"))
      }, null, 544),
      t.modelValue ? (o(), a("div", _r, [
        e("button", {
          type: "button",
          class: "vb-photo-zoom",
          "aria-label": "查看照片大图",
          onClick: h[2] || (h[2] = (w) => u.value = !0)
        }, [
          e("img", {
            src: t.modelValue.dataUrl,
            alt: "本次饮食照片预览"
          }, null, 8, Ar)
        ]),
        e("span", null, [
          e("strong", null, l(t.modelValue.name), 1),
          e("small", null, l(t.modelValue.source) + " · 点击图片查看大图", 1)
        ]),
        e("button", {
          type: "button",
          class: "vb-icon-button",
          "aria-label": "移除照片",
          onClick: p
        }, [
          U(F, {
            name: "close",
            size: 15
          })
        ])
      ])) : A("", !0),
      e("div", Cr, [
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: h[3] || (h[3] = (w) => i.value?.click())
        }, [
          U(F, {
            name: "camera",
            size: 17
          }),
          h[6] || (h[6] = P("拍照", -1))
        ], 8, Sr),
        e("button", {
          type: "button",
          class: "vb-photo-button",
          disabled: m.value,
          onClick: h[4] || (h[4] = (w) => r.value?.click())
        }, [
          U(F, {
            name: "upload",
            size: 17
          }),
          P(l(t.modelValue ? "更换照片" : "本地选择"), 1)
        ], 8, Ir)
      ]),
      m.value ? (o(), a("p", Er, "正在准备图片…")) : d.value ? (o(), a("p", xr, l(d.value), 1)) : A("", !0),
      u.value && t.modelValue ? (o(), pe(dt, {
        key: 3,
        title: "饮食照片预览",
        wide: "",
        onClose: h[5] || (h[5] = (w) => u.value = !1)
      }, {
        default: ut(() => [
          e("img", {
            class: "vb-photo-large",
            src: t.modelValue.dataUrl,
            alt: "饮食照片大图"
          }, null, 8, Ur)
        ]),
        _: 1
      })) : A("", !0)
    ]));
  }
}, Dr = { class: "vb-glass vb-photo-card" }, Nr = { class: "vb-aside-heading" }, Pr = { class: "vb-photo-badge" }, Mr = {
  key: 0,
  class: "vb-feature-error",
  role: "alert"
}, Tr = {
  key: 1,
  class: "vb-ai-progress",
  role: "status"
}, Rr = {
  key: 2,
  class: "vb-recognition-failed"
}, zr = {
  class: "vb-feature-error",
  role: "alert"
}, Or = {
  key: 4,
  class: "vb-recognition-results"
}, Fr = { class: "vb-data-note" }, Br = {
  key: 0,
  class: "vb-recognition-meta"
}, Lr = { key: 0 }, Vr = { class: "vb-recognized-list" }, qr = ["value", "disabled", "aria-label", "onInput"], Gr = ["aria-label", "onClick"], Jr = {
  key: 0,
  class: "vb-recognition-matches"
}, Hr = ["onClick"], Wr = { class: "vb-recognition-weight" }, Kr = ["onUpdate:modelValue", "disabled", "aria-label"], Yr = {
  key: 1,
  class: "vb-data-note"
}, Xr = { class: "vb-recognition-actions" }, Qr = ["disabled"], Zr = {
  __name: "PhotoRecognitionPanel",
  props: { draft: Object, legacyPhoto: Object },
  emits: ["confirm"],
  setup(t, { emit: s }) {
    const n = t, u = s, { state: i } = Qt(), r = D(null), d = D(""), m = /* @__PURE__ */ new Map(), c = H(() => n.draft.recognition), v = H(() => {
      const R = c.value?.generatedAt;
      if (!R) return "";
      const M = new Date(R);
      return Number.isNaN(M.getTime()) ? "" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(M);
    }), g = H(() => c.value?.items?.length && !c.value.confirmed && c.value.items.every((R) => R.name?.trim() && Number.isFinite(Number(R.grams)) && Number(R.grams) >= 0.1 && Number(R.grams) <= 5e3));
    ve(() => [n.draft.date, n.draft.photoId], async ([R, M]) => {
      d.value = "", r.value = null;
      try {
        if (M) {
          const V = await xs("photos", M);
          if (n.draft.date !== R || n.draft.photoId !== M) return;
          r.value = V || null, V?.dataUrl && n.draft.recognition?.status === "pending" && n.draft.recognition.photoId === M ? h(V, { resume: !0 }) : !V && n.draft.recognition?.status === "pending" && (n.draft.recognition = { ...n.draft.recognition, status: "failed", error: "照片文件已不可用，请重新选择照片。" });
        } else if (n.legacyPhoto?.dataUrl) {
          const V = { ...n.legacyPhoto, id: crypto.randomUUID(), date: R };
          await Jt("photos", V), n.draft.date === R && (n.draft.photoId = V.id, r.value = V);
        }
      } catch (V) {
        d.value = V.message, r.value = n.legacyPhoto || null;
      }
    }, { immediate: !0 });
    function k(R) {
      r.value = R, R || f();
    }
    async function f() {
      const R = n.draft.photoId;
      if (n.draft.photoId = null, n.draft.recognition = null, R && !i.records.some((M) => M.photoId === R) && !Object.values(i.drafts).some((M) => M.photoId === R)) try {
        await js("photos", R);
      } catch (M) {
        d.value = M.message;
      }
    }
    async function p(R) {
      const M = n.draft.date, V = crypto.randomUUID();
      d.value = "";
      try {
        const T = { ...R, id: V, date: M, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (await Jt("photos", T), n.draft.date !== M) return;
        r.value = T, n.draft.photoId = V, n.draft.recognition = null, await h(T);
      } catch (T) {
        d.value = T.message;
      }
    }
    async function S(R, M) {
      try {
        return await rt("recognize", { image: R, requestId: M });
      } catch (V) {
        if (["NOT_CONFIGURED", "INVALID_CONFIG", "INVALID_IMAGE", "AUTH_FAILED", "INSUFFICIENT_BALANCE", "RATE_LIMITED", "MODEL_REQUEST"].includes(V?.code) || V?.message?.includes("超时")) throw V;
        return await new Promise((T) => setTimeout(T, 700)), rt("recognize", { image: R, requestId: M });
      }
    }
    async function h(R = r.value, { resume: M = !1 } = {}) {
      if (!R?.dataUrl) return;
      const V = n.draft, T = V.photoId, O = V.recognition?.status === "pending" && V.recognition.photoId === T ? V.recognition : null;
      if (O && !M) return;
      const de = M && O?.requestId ? O.requestId : crypto.randomUUID();
      (!M || !O) && (V.recognition = { requestId: de, photoId: T, status: "pending", startedAt: (/* @__PURE__ */ new Date()).toISOString(), items: [], error: "", confirmed: !1 });
      try {
        const K = T || de;
        let he = m.get(K);
        he || (he = S(R.dataUrl, K), m.set(K, he), he.finally(() => {
          m.get(K) === he && m.delete(K);
        }).catch(() => {
        }));
        const ae = await he;
        if (V.photoId !== T || V.recognition?.requestId !== de) return;
        V.recognition = { ...ae, requestId: de, photoId: T, status: "complete", error: "", confirmed: !1 };
      } catch (K) {
        V.photoId === T && V.recognition?.requestId === de && (V.recognition = { ...V.recognition, status: "failed", error: K.message });
      }
    }
    function w(R, M) {
      R.name = M.target.value, R.foodId = null;
    }
    function $(R, M) {
      R.foodId = M.key, R.name = M.name;
    }
    function z() {
      n.draft.recognition = { ...n.draft.recognition, status: "complete", recognitionId: n.draft.recognition?.recognitionId || crypto.randomUUID(), items: n.draft.recognition?.items || [], confirmed: !1, error: "", note: n.draft.recognition?.note || "手动补充，请核对名称与份量。" }, n.draft.recognition.items.push({ id: crypto.randomUUID(), name: "", foodId: null, grams: null, uncertainty: "手动补充，请填写实际可食部重量。" });
    }
    function X() {
      g.value && u("confirm", { batchId: c.value.recognitionId, items: c.value.items.map((R) => ({ ...R, estimated: !0, source: "photo" })) });
    }
    return (R, M) => (o(), a("section", Dr, [
      e("div", Nr, [
        M[2] || (M[2] = e("div", null, [
          e("h2", null, "这一餐的照片"),
          e("p", null, "拍一餐，核对后再记入。")
        ], -1)),
        e("span", Pr, [
          U(F, {
            name: "camera",
            size: 16
          })
        ])
      ]),
      M[6] || (M[6] = e("p", { class: "vb-photo-disclosure" }, "选择照片后自动识别：压缩照片会经本地后端发送给维衡 AI。照片与识别结果保存在当前浏览器。", -1)),
      U(jr, {
        "model-value": r.value,
        "onUpdate:modelValue": k,
        onSelected: p
      }, null, 8, ["model-value"]),
      d.value ? (o(), a("p", Mr, l(d.value), 1)) : A("", !0),
      c.value?.status === "pending" ? (o(), a("div", Tr, [...M[3] || (M[3] = [
        e("span", { class: "vb-loading-ring" }, null, -1),
        e("div", null, [
          e("strong", null, "正在识别这一餐…"),
          e("small", null, "识别食物与份量，结果需要你核对。")
        ], -1)
      ])])) : A("", !0),
      c.value?.status === "failed" ? (o(), a("div", Rr, [
        e("p", zr, l(c.value.error), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: M[0] || (M[0] = (V) => h())
          }, "重新识别"),
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: z
          }, "手动录入")
        ])
      ])) : A("", !0),
      r.value && !c.value ? (o(), a("button", {
        key: 3,
        type: "button",
        class: "vb-button vb-button-quiet",
        onClick: M[1] || (M[1] = (V) => h())
      }, "开始 AI 识别")) : A("", !0),
      c.value?.status === "complete" ? (o(), a("div", Or, [
        e("p", Fr, l(c.value.note || "请核对食物名称与份量。") + " 照片克数为 AI 估重，需你核对；营养分析会汇总数据库值与明确标注的 AI 宏量营养估算，其他缺失项仍保持未知。", 1),
        c.value.model ? (o(), a("small", Br, [
          P("由 " + l(b(Xe)(c.value.model)) + " 识别", 1),
          v.value ? (o(), a("span", Lr, " · " + l(v.value), 1)) : A("", !0)
        ])) : A("", !0),
        e("div", Vr, [
          (o(!0), a(L, null, J(c.value.items, (V, T) => (o(), a("div", {
            key: V.id,
            class: "vb-recognized-item"
          }, [
            e("div", null, [
              e("input", {
                value: V.name,
                disabled: c.value.confirmed,
                "aria-label": "识别食物" + (T + 1) + "名称",
                placeholder: "输入食物名称",
                onInput: (O) => w(V, O)
              }, null, 40, qr),
              c.value.confirmed ? A("", !0) : (o(), a("button", {
                key: 0,
                type: "button",
                class: "vb-icon-button",
                "aria-label": "删除识别项" + (T + 1),
                onClick: (O) => c.value.items.splice(T, 1)
              }, [
                U(F, {
                  name: "close",
                  size: 14
                })
              ], 8, Gr))
            ]),
            !V.foodId && !c.value.confirmed ? (o(), a("div", Jr, [
              (o(!0), a(L, null, J(b(Yt)(V.name, 3), (O) => (o(), a("button", {
                key: O.key,
                type: "button",
                onClick: (de) => $(V, O)
              }, l(O.name), 9, Hr))), 128))
            ])) : A("", !0),
            e("label", Wr, [
              M[4] || (M[4] = P("估算可食部", -1)),
              te(e("input", {
                "onUpdate:modelValue": (O) => V.grams = O,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                disabled: c.value.confirmed,
                "aria-label": "识别食物" + (T + 1) + "克数",
                placeholder: "克数"
              }, null, 8, Kr), [
                [ce, V.grams]
              ]),
              M[5] || (M[5] = P("克", -1))
            ]),
            e("small", {
              class: ge({ "vb-unmatched": !V.foodId })
            }, l(V.foodId ? "数据库：" + b(oe)[V.foodId]?.state : "未匹配数据库，营养指标暂无数据"), 3),
            e("small", null, l(V.uncertainty), 1)
          ]))), 128))
        ]),
        c.value.items.length ? A("", !0) : (o(), a("p", Yr, "没有识别到可靠的食物项目。可更换照片、重试或手动添加。")),
        e("div", Xr, [
          c.value.confirmed ? A("", !0) : (o(), a("button", {
            key: 0,
            type: "button",
            class: "vb-text-button",
            onClick: z
          }, "＋补充遗漏食物")),
          e("button", {
            type: "button",
            class: "vb-button vb-button-primary",
            disabled: !g.value,
            onClick: X
          }, l(c.value.confirmed ? "已加入本次选择" : "确认并加入记录"), 9, Qr)
        ])
      ])) : A("", !0)
    ]));
  }
}, eu = { class: "vb-diary-page" }, tu = { class: "vb-page-title" }, nu = { class: "vb-date-input" }, su = ["max"], ou = {
  key: 0,
  class: "vb-diary-grid"
}, au = {
  class: "vb-diary-aside",
  "aria-label": "记录摘要和最近记录"
}, lu = ["disabled"], iu = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, ru = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"], uu = { class: "vb-section-heading" }, du = { class: "vb-pill" }, cu = {
  key: 0,
  class: "vb-selected-list"
}, vu = {
  key: 1,
  class: "vb-muted-empty"
}, mu = { class: "vb-section-heading" }, pu = {
  key: 0,
  class: "vb-history-list"
}, bu = ["aria-label", "onClick"], fu = ["onClick"], gu = ["aria-label", "onClick"], hu = {
  key: 1,
  class: "vb-muted-empty"
}, yu = { class: "vb-section-heading" }, ku = { class: "vb-diary-search-row" }, wu = { class: "vb-search-field" }, $u = { class: "vb-meal-select" }, _u = ["value"], Au = {
  key: 0,
  class: "vb-search-results"
}, Cu = ["onClick"], Su = {
  key: 0,
  class: "vb-search-empty"
}, Iu = { class: "vb-diary-entry-heading" }, Eu = {
  key: 1,
  class: "vb-diary-entries"
}, xu = { class: "vb-diary-entry-title" }, Uu = ["onClick"], ju = ["onUpdate:modelValue", "aria-label"], Du = ["aria-label", "onClick"], Nu = { class: "vb-data-note" }, Pu = {
  key: 0,
  class: "vb-pill"
}, Mu = { class: "vb-entry-controls" }, Tu = ["onUpdate:modelValue", "aria-label"], Ru = { class: "vb-entry-meal" }, zu = ["onUpdate:modelValue"], Ou = ["value"], Fu = {
  key: 0,
  class: "vb-inline-warning"
}, Bu = ["onClick"], Lu = {
  key: 2,
  class: "vb-muted-empty"
}, Vu = ["onToggle"], qu = { key: 0 }, Gu = ["onClick"], Ju = ["onClick"], Hu = { class: "vb-field vb-notes-field" }, Wu = { class: "vb-intake-more" }, Ku = { key: 0 }, Yu = {
  __name: "DiaryPage",
  props: { records: Array, reports: { type: Array, default: () => [] }, profile: Object, nutrition: Object, initialDate: String, saving: Boolean },
  emits: ["save", "remove", "analysis", "browse", "detail"],
  setup(t, { emit: s }) {
    const n = t, u = s, { state: i, ensureDraft: r, addToDraft: d } = Qt(), { isStale: m } = en(), c = ot({}), v = ot({});
    function g(Q = /* @__PURE__ */ new Date()) {
      const B = Q.getHours() * 60 + Q.getMinutes();
      return B >= 300 && B < 600 ? "breakfast" : B >= 600 && B <= 840 ? "lunch" : B >= 960 && B <= 1260 ? "dinner" : "snack";
    }
    const k = D(n.initialDate || _e()), f = D(""), p = D(g()), S = D("selected"), h = D(null), w = D("");
    ve(() => n.initialDate, (Q) => {
      Q && (k.value = Q);
    }), ve(k, (Q) => {
      r(Q), w.value = "", f.value = "";
    }, { immediate: !0 });
    const $ = H(() => i.drafts[k.value]), z = H(() => dn($.value?.entries)), X = H(() => Yt(f.value, 8)), R = H(() => n.records.find((Q) => Q.date === k.value)), M = H(() => z.value.length > 0 || !!(R.value && !Array.isArray($.value?.savedEntries))), V = (Q) => n.reports.find((B) => B.date === Q), T = /* @__PURE__ */ new Set();
    async function O(Q) {
      const B = k.value, j = Ie(), q = p.value, I = B + ":" + Q.key;
      if (!T.has(I)) {
        T.add(I);
        try {
          if (await Le(Q.key), k.value !== B || Ie() !== j) return;
          d({ date: B, foodId: Q.key, grams: Q.grams || 100, meal: q }), f.value = "", S.value = "selected";
        } catch (x) {
          w.value = x.message;
        } finally {
          T.delete(I);
        }
      }
    }
    function de() {
      $.value.entries.push({ id: crypto.randomUUID(), foodId: null, name: f.value.trim(), grams: 100, meal: p.value, group: "unclassified", source: "manual", referenceConfirmed: !0 }), f.value = "";
    }
    async function K({ items: Q, batchId: B }) {
      const j = k.value, q = Ie();
      if ($.value.appliedBatches.includes(B)) return;
      try {
        await Le(Q.map((x) => x.foodId));
      } catch (x) {
        w.value = x.message;
        return;
      }
      if (k.value !== j || Ie() !== q || $.value.appliedBatches.includes(B)) return;
      const I = dn(Q.map((x) => ({ ...x, id: crypto.randomUUID(), meal: p.value, source: "photo", estimated: !0, referenceConfirmed: !0, nutritionSnapshot: xt(oe[x.foodId]) })));
      if (I.length !== Q.length) {
        w.value = "请核对每项食物名称与克数。";
        return;
      }
      $.value.entries.push(...I), $.value.appliedBatches.push(B), $.value.recognition.confirmed = !0, S.value = "selected";
    }
    function he() {
      if (n.saving || !M.value) return;
      if (w.value = "", z.value.length !== $.value.entries.length) {
        w.value = "请填写每项食物名称，并将克数设为 0.1–5000 克；不需要的项目可删除。";
        return;
      }
      const Q = JSON.parse(JSON.stringify($.value));
      Array.isArray(Q.savedEntries) && (Q.entries = [...Q.savedEntries, ...Q.entries], delete Q.savedEntries), u("save", Q);
    }
    function ae(Q) {
      S.value = Q, matchMedia("(max-width:950px)").matches && Me(() => h.value?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" }));
    }
    function ie(Q) {
      const B = ["ArrowRight", "ArrowDown", "End"].includes(Q.key) ? "history" : ["ArrowLeft", "ArrowUp", "Home"].includes(Q.key) ? "selected" : null;
      B && (Q.preventDefault(), ae(B), Me(() => document.getElementById("vb-tab-" + B)?.focus()));
    }
    function Ae(Q) {
      const B = V(Q.date);
      return B ? m(B, Q, n.profile) ? "报告需更新" : B.status === "pending" ? "分析中" : B.status === "complete" ? "查看 AI 分析" : "分析未完成" : "查看 AI 分析";
    }
    return (Q, B) => (o(), a("div", eu, [
      e("div", tu, [
        B[8] || (B[8] = e("div", null, [
          e("h1", null, "饮食记录"),
          e("p", null, "填写可食部克数，核对食物，再保存这一天。")
        ], -1)),
        e("label", nu, [
          U(F, {
            name: "calendar",
            size: 18
          }),
          te(e("input", {
            "onUpdate:modelValue": B[0] || (B[0] = (j) => k.value = j),
            type: "date",
            max: b(_e)(),
            "aria-label": "饮食记录日期"
          }, null, 8, su), [
            [ce, k.value]
          ])
        ])
      ]),
      $.value ? (o(), a("div", ou, [
        e("aside", au, [
          (o(), pe(Zr, {
            key: k.value,
            draft: $.value,
            "legacy-photo": R.value?.photo,
            onConfirm: K
          }, null, 8, ["draft", "legacy-photo"])),
          e("div", {
            class: ge(["vb-diary-actions", { "has-analysis": R.value }])
          }, [
            e("button", {
              type: "submit",
              form: "vb-diary-form",
              class: "vb-button vb-button-primary vb-save-record",
              disabled: t.saving || !M.value
            }, [
              P(l(t.saving ? "正在保存…" : "保存记录"), 1),
              U(F, {
                name: "arrow",
                size: 17
              })
            ], 8, lu),
            R.value ? (o(), a("button", {
              key: 0,
              type: "button",
              class: "vb-button vb-button-soft",
              onClick: B[1] || (B[1] = (j) => Q.$emit("analysis", k.value))
            }, "查看分析")) : A("", !0),
            w.value ? (o(), a("p", iu, l(w.value), 1)) : A("", !0)
          ], 2),
          e("div", {
            class: "vb-diary-tabs",
            role: "tablist",
            "aria-label": "饮食记录摘要",
            onKeydown: ie
          }, [
            (o(!0), a(L, null, J([["selected", "本次选择", z.value.length], ["history", "最近记录", t.records.length]], ([j, q, I]) => (o(), a("button", {
              id: "vb-tab-" + j,
              key: j,
              type: "button",
              role: "tab",
              "aria-selected": S.value === j,
              "aria-controls": "vb-panel-" + j,
              tabindex: S.value === j ? 0 : -1,
              class: ge({ selected: S.value === j }),
              onClick: (x) => ae(j)
            }, [
              P(l(q), 1),
              e("span", null, l(I), 1)
            ], 10, ru))), 128))
          ], 32),
          S.value === "selected" ? (o(), a("section", {
            key: 0,
            id: "vb-panel-selected",
            ref_key: "asidePanel",
            ref: h,
            class: "vb-glass vb-aside-panel vb-selected-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-selected",
            tabindex: "0"
          }, [
            e("div", uu, [
              e("div", null, [
                B[9] || (B[9] = e("h2", null, "本次选择", -1)),
                e("p", null, l(k.value), 1)
              ]),
              e("span", du, l(z.value.length) + " 项", 1)
            ]),
            U(Xt, {
              entries: z.value,
              compact: ""
            }, null, 8, ["entries"]),
            z.value.length ? (o(), a("div", cu, [
              (o(!0), a(L, null, J(z.value, (j) => (o(), a("div", {
                key: j.id
              }, [
                e("span", null, [
                  P(l(j.name), 1),
                  e("small", null, l(b(yt).find(([q]) => q === j.meal)?.[1]) + l(j.estimated ? " · 估重" : ""), 1)
                ]),
                e("strong", null, [
                  P(l(j.grams), 1),
                  B[10] || (B[10] = e("small", null, " g", -1))
                ])
              ]))), 128))
            ])) : (o(), a("p", vu, "选择食物后，会在这里汇总。"))
          ], 512)) : (o(), a("section", {
            key: 1,
            id: "vb-panel-history",
            ref_key: "asidePanel",
            ref: h,
            class: "vb-glass vb-aside-panel vb-history-panel",
            role: "tabpanel",
            "aria-labelledby": "vb-tab-history",
            tabindex: "0"
          }, [
            e("div", mu, [
              B[11] || (B[11] = e("div", null, [
                e("h2", null, "最近记录"),
                e("p", null, "打开记录或查看历史分析")
              ], -1)),
              U(F, {
                name: "calendar",
                size: 18
              })
            ]),
            t.records.length ? (o(), a("div", pu, [
              (o(!0), a(L, null, J(t.records.slice(0, 12), (j) => (o(), a("div", {
                key: j.date,
                class: "vb-history-item vb-history-with-ai"
              }, [
                e("button", {
                  type: "button",
                  "aria-label": `打开 ${j.date} 的饮食记录`,
                  onClick: (q) => k.value = j.date
                }, [
                  B[12] || (B[12] = e("span", { class: "vb-status-dot" }, null, -1)),
                  e("span", null, [
                    e("strong", null, l(j.date), 1),
                    e("small", null, l(Object.values(j.foods || {}).filter((q) => Number(q) > 0).length) + " 类食物", 1)
                  ])
                ], 8, bu),
                e("button", {
                  type: "button",
                  class: "vb-history-analysis",
                  onClick: (q) => Q.$emit("analysis", j.date)
                }, l(Ae(j)), 9, fu),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "删除" + j.date + "的记录",
                  onClick: (q) => Q.$emit("remove", j.date)
                }, [
                  U(F, {
                    name: "close",
                    size: 14
                  })
                ], 8, gu)
              ]))), 128))
            ])) : (o(), a("p", hu, "你的第一天记录，从今天开始。"))
          ], 512))
        ]),
        e("form", {
          id: "vb-diary-form",
          class: "vb-glass vb-diary-form",
          onSubmit: Be(he, ["prevent"])
        }, [
          e("div", yu, [
            B[13] || (B[13] = e("div", null, [
              e("h2", null, "这一天，吃了什么？"),
              e("p", null, "条目会保留在本地草稿，保存后进入最近记录。")
            ], -1)),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: B[2] || (B[2] = (j) => Q.$emit("browse"))
            }, "食物浏览 →")
          ]),
          e("div", ku, [
            e("label", wu, [
              U(F, {
                name: "search",
                size: 18
              }),
              te(e("input", {
                "onUpdate:modelValue": B[3] || (B[3] = (j) => f.value = j),
                type: "search",
                "aria-label": "搜索记录食物",
                placeholder: "搜索同一食物库，如香蕉、西红柿",
                onKeydown: B[4] || (B[4] = ls(Be((j) => X.value[0] && O(X.value[0]), ["prevent"]), ["enter"]))
              }, null, 544), [
                [ce, f.value]
              ])
            ]),
            e("label", $u, [
              B[14] || (B[14] = e("span", null, "添加到", -1)),
              te(e("select", {
                "onUpdate:modelValue": B[5] || (B[5] = (j) => p.value = j),
                "aria-label": "添加食物的餐次"
              }, [
                (o(!0), a(L, null, J(b(yt), ([j, q]) => (o(), a("option", {
                  key: j,
                  value: j
                }, l(q), 9, _u))), 128))
              ], 512), [
                [Ue, p.value]
              ])
            ])
          ]),
          f.value.trim() ? (o(), a("div", Au, [
            (o(!0), a(L, null, J(X.value, (j) => (o(), a("button", {
              key: j.key,
              type: "button",
              class: "vb-search-result",
              onClick: (q) => O(j)
            }, [
              e("span", null, [
                e("strong", null, l(j.name), 1),
                e("small", null, l(j.state) + " · " + l(j.source ? "数据库样本" : "暂无成分数据"), 1)
              ]),
              U(F, {
                name: "plus",
                size: 17
              })
            ], 8, Cu))), 128)),
            X.value.length ? A("", !0) : (o(), a("p", Su, "没有匹配项，可以手动录入；缺失营养数据不会当作 0。")),
            e("button", {
              class: "vb-add-custom-button",
              type: "button",
              onClick: de
            }, [
              P("手动添加“" + l(f.value) + "”", 1),
              U(F, {
                name: "plus",
                size: 16
              })
            ])
          ])) : A("", !0),
          e("div", Iu, [
            e("h3", null, [
              B[15] || (B[15] = P("已选食物 ", -1)),
              e("small", null, l($.value.entries.length) + " 项", 1)
            ]),
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: de
            }, "＋手动添加")
          ]),
          $.value.entries.length ? (o(), a("div", Eu, [
            (o(!0), a(L, null, J($.value.entries, (j, q) => (o(), a("article", {
              key: j.id,
              class: "vb-diary-entry"
            }, [
              e("div", xu, [
                j.foodId ? (o(), a("button", {
                  key: 0,
                  type: "button",
                  class: "vb-entry-name",
                  onClick: (I) => Q.$emit("detail", j.foodId)
                }, [
                  P(l(b(jt)(b(oe)[j.foodId]) || j.name), 1),
                  U(F, {
                    name: "chevron",
                    size: 13
                  })
                ], 8, Uu)) : te((o(), a("input", {
                  key: 1,
                  "onUpdate:modelValue": (I) => j.name = I,
                  "aria-label": "手动食物" + (q + 1) + "名称",
                  placeholder: "填写食物名称",
                  maxlength: "100",
                  required: ""
                }, null, 8, ju)), [
                  [ce, j.name]
                ]),
                e("button", {
                  type: "button",
                  class: "vb-icon-button",
                  "aria-label": "移除食物" + (q + 1),
                  onClick: (I) => $.value.entries.splice(q, 1)
                }, [
                  U(F, {
                    name: "close",
                    size: 15
                  })
                ], 8, Du)
              ]),
              e("p", Nu, [
                P(l(j.foodId ? b(oe)[j.foodId]?.state : "手动条目，暂无营养数据") + l(j.estimated ? " · 份量为估算" : ""), 1),
                j.nutritionSnapshot?.dataType === "ai-estimate" ? (o(), a("span", Pu, "含AI估算")) : A("", !0)
              ]),
              U(Gn, {
                food: b(oe)[j.foodId],
                onChoose: (I) => {
                  j.grams = I, j.estimated = !0;
                }
              }, null, 8, ["food", "onChoose"]),
              e("div", Mu, [
                e("label", null, [
                  B[16] || (B[16] = P("可食部重量", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (I) => j.grams = I,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    required: "",
                    "aria-label": (b(oe)[j.foodId]?.name || j.name || "食物") + "克数"
                  }, null, 8, Tu), [
                    [ce, j.grams]
                  ]),
                  B[17] || (B[17] = e("small", null, "克", -1))
                ]),
                e("label", Ru, [
                  B[18] || (B[18] = e("span", null, "餐次", -1)),
                  te(e("select", {
                    "onUpdate:modelValue": (I) => j.meal = I
                  }, [
                    (o(!0), a(L, null, J(b(yt), ([I, x]) => (o(), a("option", {
                      key: I,
                      value: I
                    }, l(x), 9, Ou))), 128))
                  ], 8, zu), [
                    [Ue, j.meal]
                  ])
                ])
              ]),
              j.referenceConfirmed === !1 ? (o(), a("p", Fu, [
                B[19] || (B[19] = P("这是历史记录，具体数据库样本尚未确认，不计入营养小计。", -1)),
                b(oe)[j.foodId]?.source ? (o(), a("button", {
                  key: 0,
                  type: "button",
                  class: "vb-text-button",
                  onClick: (I) => j.referenceConfirmed = !0
                }, "核对后使用此参考样本", 8, Bu)) : (o(), a("button", {
                  key: 1,
                  type: "button",
                  class: "vb-text-button",
                  onClick: B[6] || (B[6] = (I) => Q.$emit("browse"))
                }, "查找具体食物"))
              ])) : A("", !0)
            ]))), 128))
          ])) : (o(), a("p", Lu, "从搜索或下方类别中选择食物，也可以拍照后确认添加。")),
          (o(!0), a(L, null, J(b(qt), (j) => (o(), a("details", {
            key: j.key,
            class: "vb-diary-food-group",
            onToggle: (q) => c[j.key] = q.target.open
          }, [
            e("summary", null, [
              U(F, {
                name: b(Dn)[j.key],
                size: 18
              }, null, 8, ["name"]),
              P(l(j.name), 1),
              e("small", null, l(j.items.length) + " 个条目", 1),
              U(F, {
                name: "chevron",
                size: 14
              })
            ]),
            c[j.key] ? (o(), a("div", qu, [
              (o(!0), a(L, null, J(j.items.slice(0, v[j.key] || 24), ([q, I]) => (o(), a("button", {
                key: q,
                type: "button",
                onClick: (x) => O(b(oe)[q])
              }, l(I) + " ＋", 9, Gu))), 128)),
              j.items.length > (v[j.key] || 24) ? (o(), a("button", {
                key: 0,
                type: "button",
                onClick: (q) => v[j.key] = (v[j.key] || 24) + 24
              }, "再显示24项", 8, Ju)) : A("", !0)
            ])) : A("", !0)
          ], 40, Vu))), 128)),
          e("label", Hu, [
            B[20] || (B[20] = P("补充备注 ", -1)),
            B[21] || (B[21] = e("span", null, "可选，不发送给 AI", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": B[7] || (B[7] = (j) => $.value.notes = j),
              rows: "3",
              maxlength: "240",
              placeholder: "记录做法、口味或当天的感受…"
            }, null, 512), [
              [ce, $.value.notes]
            ])
          ]),
          e("details", Wu, [
            B[22] || (B[22] = e("summary", null, "查看记录依据", -1)),
            B[23] || (B[23] = e("p", null, "保存所选样本或AI估算快照，未知值不补0。旧记录未保存快照时仍依据原目录计算。", -1)),
            (o(!0), a(L, null, J(z.value, (j) => (o(), a("p", {
              key: j.id
            }, [
              P(l(j.name) + "：" + l(j.nutritionSnapshot?.source?.name || b(Xe)(j.nutritionSnapshot?.estimate?.model) || "原目录数据"), 1),
              j.nutritionSnapshot?.estimate ? (o(), a("span", Ku, " · " + l(j.nutritionSnapshot.estimate.assumption), 1)) : A("", !0)
            ]))), 128))
          ])
        ], 32)
      ])) : A("", !0)
    ]));
  }
}, Xu = { class: "vb-food-card vb-glass" }, Qu = ["aria-label"], Zu = { class: "vb-food-card-copy" }, ed = { class: "vb-small-label" }, td = { key: 0 }, nd = { key: 0 }, sd = {
  key: 1,
  class: "vb-food-composition-note"
}, od = { class: "vb-food-card-bottom" }, ad = ["aria-pressed"], An = {
  __name: "FoodCard",
  props: { food: Object, compared: Boolean },
  emits: ["detail", "compare"],
  setup(t) {
    const s = t;
    ve(() => s.food.key, (r) => {
      Le(r).catch(() => {
      });
    }, { immediate: !0 });
    const { photo: n, loading: u, failed: i } = qn(() => s.food);
    return (r, d) => (o(), a("article", Xu, [
      e("button", {
        type: "button",
        class: "vb-food-card-open",
        "aria-label": "查看" + t.food.name + "详情",
        onClick: d[0] || (d[0] = (m) => r.$emit("detail", t.food.key))
      }, [
        U(nn, {
          food: t.food,
          photo: b(n),
          loading: b(u),
          failed: b(i),
          class: "vb-food-card-image",
          label: !1
        }, null, 8, ["food", "photo", "loading", "failed"]),
        e("div", Zu, [
          e("span", ed, l(t.food.categoryName), 1),
          e("h3", null, l(b(jt)(t.food)), 1),
          e("p", null, l(b(tn)(t.food)), 1),
          t.food.source ? (o(), a("dl", td, [
            (o(!0), a(L, null, J(b(Te), (m) => (o(), a("div", {
              key: m.id
            }, [
              e("dt", null, l(m.id === "carbs" ? "碳水" : m.name), 1),
              e("dd", null, [
                P(l(b(Fe)(t.food.nutrients[m.id])), 1),
                t.food.nutrients[m.id] != null ? (o(), a("small", nd, l(m.unit), 1)) : A("", !0)
              ])
            ]))), 128))
          ])) : (o(), a("p", sd, [
            d[3] || (d[3] = P("按实际配方记录份量", -1)),
            d[4] || (d[4] = e("br", null, null, -1)),
            P(l(b(jn).estimates?.[t.food.key] ? "已保存AI单值估算 · 查看假设" : "营养数据暂缺 · 可记录份量"), 1)
          ]))
        ])
      ], 8, Qu),
      e("div", od, [
        e("span", null, l(t.food.source ? "每 100 克可食部" : "按实际食用份量记录"), 1),
        t.food.source ? (o(), a("button", {
          key: 1,
          type: "button",
          "aria-pressed": t.compared,
          class: ge({ selected: t.compared }),
          onClick: d[2] || (d[2] = (m) => r.$emit("compare", t.food.key))
        }, [
          U(F, {
            name: t.compared ? "check" : "plus",
            size: 13
          }, null, 8, ["name"]),
          P(l(t.compared ? "已选对比" : "加入对比"), 1)
        ], 10, ad)) : (o(), a("button", {
          key: 0,
          type: "button",
          onClick: d[1] || (d[1] = (m) => r.$emit("detail", t.food.key))
        }, "查看与记录 →"))
      ])
    ]));
  }
}, ld = /* @__PURE__ */ JSON.parse(`[{"key":"01","category":"谷类","filename":"category-01.jpg","title":"Whole wheat grain flour being scooped.jpg","author":"Margaret Hoogstrate","sourceUrl":"https://commons.wikimedia.org/wiki/File:Whole_wheat_grain_flour_being_scooped.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"Whole wheat flour being scooped. Because the whole grain is used, darker colored flakes of bran are visible in the flour. Deutsch: Vollkornweizenmehl wird geschöpft. Da das ganze Korn verwendet wird, sind dunkler gefärbte Kleieschüppchen im Mehl sichtbar. Dieses Mehl wurde in einer Mühle in Schiedam in den Niederlanden gemahlen. Es werden keine Konservierungs- oder Zusatzstoffe verwendet. This flo","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Whole_wheat_grain_flour_being_scooped.jpg/960px-Whole_wheat_grain_flour_being_scooped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"02","category":"薯类","filename":"category-02.jpg","title":"Potato (3780830486).jpg","author":"ben dalton from leeds, uk","sourceUrl":"https://commons.wikimedia.org/wiki/File:Potato_(3780830486).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"these are all experiments with a curved paper background and white bin-liner to diffuse natural light from a window. more to come :) &lt;a href=\\"https://creativecommons.org/publicdomain/zero/1.0/\\" rel=\\"noreferrer nofollow\\"&gt;CC0&lt;/a&gt; To the extent possible under law, &lt;a href=\\"http://bendalton.noii.net/\\" rel=\\"noreferrer nofollow\\"&gt;Ben Dalton&lt;/a&gt; has waived all copyright and related or neighbouring rights to this photo. You can link back to this page if you would like to credit Ben for taking the photo, but you don't have to. However, if you would like to embed the copy of this photo that is hosted on Flickr in outside web sites, you must follow &lt;a href=\\"https://www.flickr.com/guidelines.gne\\"&gt;Flickr's hosting guidelines&lt;/a&gt;.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Potato_%283780830486%29.jpg/1280px-Potato_%283780830486%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"03","category":"豆类","filename":"category-03.jpg","title":"Cooked soybeans on plate.jpg","author":"rawpixel","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cooked_soybeans_on_plate.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Cooked soybeans on plate","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_soybeans_on_plate.jpg/960px-Cooked_soybeans_on_plate.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"04","category":"蔬菜","filename":"category-04.jpg","title":"Basket with vegetables 2017 G1.jpg","author":"George Chernilevsky","sourceUrl":"https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Basket with vegetables. Cucumbers, vegetable marrows and bush pumpkins. Ukraine, Vinnytsia Oblast, Vinnytsia Raion.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Basket_with_vegetables_2017_G1.jpg/960px-Basket_with_vegetables_2017_G1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"05","category":"菌藻","filename":"category-05.jpg","title":"Lentinula edodes 20101113 a.jpg","author":"Batholith (talk)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lentinula_edodes_20101113_a.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Shiitake. Binomial name: Lentinula edodes","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/960px-Lentinula_edodes_20101113_a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"06","category":"水果","filename":"category-06.jpg","title":"Assortment of fruit.jpg","author":"Daniel Sone (Photographer)","sourceUrl":"https://commons.wikimedia.org/wiki/File:Assortment_of_fruit.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Title Assortment of Fruit Description An assortment of fruits, including, strawberries, blueberries, pineapple, raspberries, blackberries, grapes and cantaloupe. Topics/Categories Food and Drink Type Color, Photo Source National Cancer Institute","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Assortment_of_fruit.jpg/960px-Assortment_of_fruit.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"07","category":"坚果种子","filename":"category-07.jpg","title":"Mixed Nuts (Alabama Extension).jpg","author":"Alabama Extension","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mixed_Nuts_(Alabama_Extension).jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"ACES | Janet Guynn","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Mixed_Nuts_%28Alabama_Extension%29.jpg/960px-Mixed_Nuts_%28Alabama_Extension%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"08","category":"畜肉","filename":"category-08.jpg","title":"Raw beef steak, 2011.jpg","author":"Jellaluna","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_beef_steak,_2011.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Rohes Rindersteak.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Raw_beef_steak%2C_2011.jpg/960px-Raw_beef_steak%2C_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"09","category":"禽肉","filename":"category-09.jpg","title":"Raw chicken thighs.jpg","author":"gran","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0","description":"פרגיות עוף","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Raw_chicken_thighs.jpg/960px-Raw_chicken_thighs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"10","category":"乳类","filename":"category-10.jpg","title":"Milk 2.jpg","author":"Daria-Yakovleva","sourceUrl":"https://commons.wikimedia.org/wiki/File:Milk_2.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"picture of milk in jug and glasses","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Milk_2.jpg/1280px-Milk_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"11","category":"蛋类","filename":"category-11.jpg","title":"6-Pack-Chicken-Eggs.jpg","author":"Evan-Amos","sourceUrl":"https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A six pack of organic chicken eggs, from a New York CSA. Included is a mix of white and brown eggs in a standard egg crate.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/6-Pack-Chicken-Eggs.jpg/960px-6-Pack-Chicken-Eggs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"12","category":"水产","filename":"category-12.jpg","title":"Raw salmon fillets.jpg","author":"FULVIO_TOGNON","sourceUrl":"https://commons.wikimedia.org/wiki/File:Raw_salmon_fillets.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Raw salmon fillets","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Raw_salmon_fillets.jpg/1280px-Raw_salmon_fillets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"13","category":"婴幼儿食品","filename":"category-13.jpg","title":"Starting solids - homemade baby food in a bowl.jpg","author":"MAKY.OREL","sourceUrl":"https://commons.wikimedia.org/wiki/File:Starting_solids_-_homemade_baby_food_in_a_bowl.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Homemade baby food, combination of potato puree mixed with mashed salmon and boiled soft pieces of vegetable (parsley) in a plastic bowl with a spoon","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Starting_solids_-_homemade_baby_food_in_a_bowl.jpg/960px-Starting_solids_-_homemade_baby_food_in_a_bowl.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"14","category":"小吃甜饼","filename":"category-14.jpg","title":"Koekjestrommel open.jpg","author":"Pudding4brains","sourceUrl":"https://commons.wikimedia.org/wiki/File:Koekjestrommel_open.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"Biscuits Location: Netherlands Keywords: --- nl: Koekjes in koekjestrommel Locatie: Nederland Trefwoorden:","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/8/8c/Koekjestrommel_open.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"},{"key":"15","category":"速食","filename":"category-15.jpg","title":"Lobster instant noodle.jpg","author":"Ruocaled","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lobster_instant_noodle.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"a bowl of instant noodles with lobster.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Lobster_instant_noodle.jpg/960px-Lobster_instant_noodle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"16","category":"无酒精饮料","filename":"category-16.jpg","title":"Orange juice 1 edit1.jpg","author":"Agency of the United States Department of Agriculture Edited Version by: Arad","sourceUrl":"https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg","license":"Public domain","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain","description":"A glass of Orange juice.","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Orange_juice_1_edit1.jpg/960px-Orange_juice_1_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"17","category":"含酒精饮料","filename":"category-17.jpg","title":"Wine being poured into a glass.jpg","author":"Fabio Ingrosso","sourceUrl":"https://commons.wikimedia.org/wiki/File:Wine_being_poured_into_a_glass.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"A red wine being poured into a wine glass to serve","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Wine_being_poured_into_a_glass.jpg/960px-Wine_being_poured_into_a_glass.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"18","category":"糖蜂蜜蜜饯","filename":"category-18.jpg","title":"Dipper stick and honey in a jar.jpg","author":"Shixart1985","sourceUrl":"https://commons.wikimedia.org/wiki/File:Dipper_stick_and_honey_in_a_jar.jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"Dipper stick and honey in a jar","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Dipper_stick_and_honey_in_a_jar.jpg/960px-Dipper_stick_and_honey_in_a_jar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"19","category":"油脂","filename":"category-19.jpg","title":"Bottle of olive oil.jpg","author":"margenauer from Pixabay","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bottle_of_olive_oil.jpg","license":"CC0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"A glass bottle of olive oil","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Bottle_of_olive_oil.jpg/960px-Bottle_of_olive_oil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail","retrievedAt":"2026-10-30"},{"key":"20","category":"调味","filename":"category-20.jpg","title":"Spices (5466679811).jpg","author":"Jules Morgan from Montreal, Canada","sourceUrl":"https://commons.wikimedia.org/wiki/File:Spices_(5466679811).jpg","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0","description":"spices","imageUse":"分类示意图；不能视为某个具体品种的照片","modifications":"按卡片比例裁剪、缩小并压缩为 JPEG","downloadUrl":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Spices_%285466679811%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled","retrievedAt":"2026-10-30"}]`), id = { class: "vb-food-hub" }, rd = { class: "vb-page-title" }, ud = ["aria-expanded"], dd = { class: "vb-glass vb-food-search-hero" }, cd = { class: "vb-icon-badge" }, vd = { class: "vb-food-search-input" }, md = {
  key: 1,
  class: "vb-food-suggestions"
}, pd = ["onClick"], bd = { class: "vb-recommended" }, fd = ["onClick"], gd = {
  key: 0,
  class: "vb-glass vb-food-ask"
}, hd = { class: "vb-section-heading" }, yd = {
  key: 0,
  class: "vb-comparison-chips"
}, kd = ["onClick"], wd = { class: "vb-field" }, $d = { class: "vb-ask-bottom" }, _d = ["disabled"], Ad = {
  key: 1,
  class: "vb-feature-error",
  role: "alert"
}, Cd = {
  key: 2,
  class: "vb-ai-answer"
}, Sd = {
  key: 0,
  class: "vb-data-note"
}, Id = { class: "vb-answer-foods" }, Ed = ["onClick"], xd = { class: "vb-data-note" }, Ud = { class: "vb-data-note" }, jd = {
  key: 1,
  class: "vb-compare-bar"
}, Dd = ["onClick"], Nd = {
  key: 2,
  class: "vb-data-note",
  role: "status"
}, Pd = { class: "vb-food-results-grid" }, Md = { class: "vb-section-heading vb-category-heading" }, Td = { class: "vb-food-category-grid" }, Rd = ["onClick"], zd = ["src", "alt"], Od = { class: "vb-food-results-top" }, Fd = { class: "vb-food-filter" }, Bd = { key: 0 }, Ld = ["onClick"], Vd = { key: 1 }, qd = ["value"], Gd = { class: "vb-food-results-grid" }, Jd = {
  key: 0,
  class: "vb-glass vb-food-empty"
}, Hd = {
  key: 1,
  class: "vb-food-pagination",
  "aria-label": "食物列表分页"
}, Wd = ["disabled"], Kd = ["disabled"], Yd = {
  key: 5,
  class: "vb-food-source-note vb-reference-samples"
}, Xd = { class: "vb-reference-sample-list" }, Qd = ["onClick"], Zd = { key: 0 }, ec = { class: "vb-food-source-note" }, tc = ["href"], nc = ["href"], sc = {
  __name: "FoodBrowserPage",
  emits: ["detail"],
  setup(t) {
    const s = D(""), n = D(""), u = D(""), i = D(""), r = D("relevance"), d = D(1), m = D(!1), c = D([]), v = D(""), g = D(!1), k = D(""), f = D(!1), p = D(null), S = D(""), h = Pt, w = new Set(Pt.map((q) => q.key)), $ = new Set(ms.map((q) => q.key)), z = H(() => n.value ? Mt(n.value).map((q) => q.food).filter((q) => $.has(q.key) && !w.has(q.key)) : []);
    function X(q, I = Qe.length) {
      return Mt(q).map((x) => x.food).filter((x) => w.has(x.key)).slice(0, I);
    }
    const R = H(() => s.value.trim() ? X(s.value, Qe.length).slice(0, 5) : []), M = (q) => h.filter((I) => I.category === q).length, V = Pt.length, T = [...new Map(["白菜", "西兰花", "西红柿", "胡萝卜", "苹果", "香蕉", "蓝莓", "米饭", "牛奶", "鸡蛋", "豆腐", "鸡胸肉"].map((q) => {
      const I = Mt(q).map((x) => x.food).filter((x) => w.has(x.key));
      return I.find((x) => x.source) || I[0];
    }).filter(Boolean).map((q) => [q.key, q])).values()], O = H(() => {
      let q = n.value ? X(n.value) : [...h].sort((I, x) => +!I.source - +!x.source);
      return u.value && (q = q.filter((I) => I.category === u.value)), q;
    }), de = H(() => [...new Set(O.value.map((q) => q.subcategory))]), K = H(() => {
      let q = O.value.filter((I) => !i.value || I.subcategory === i.value);
      if (r.value !== "relevance") {
        const [I, x] = r.value.split(":");
        q = [...q].sort((me, Y) => {
          if (I === "name") return me.name.localeCompare(Y.name, "zh");
          const C = me.nutrients[I], N = Y.nutrients[I];
          return C == null || N == null ? +(C == null) - +(N == null) : (x === "asc" ? 1 : -1) * (C - N);
        });
      }
      return q;
    }), he = H(() => Math.max(1, Math.ceil(K.value.length / 12))), ae = H(() => K.value.slice((d.value - 1) * 12, d.value * 12));
    ve([i, r], () => d.value = 1);
    function ie(q = s.value) {
      s.value = q.trim(), n.value = s.value, u.value = "", i.value = "", d.value = 1, m.value = !1;
    }
    function Ae(q) {
      u.value = q, n.value = "", s.value = "", i.value = "", d.value = 1, r.value = "relevance";
    }
    function Q() {
      u.value = "", n.value = "", s.value = "", i.value = "", d.value = 1;
    }
    function B(q) {
      v.value = "", c.value.includes(q) ? c.value = c.value.filter((I) => I !== q) : c.value.length < 2 ? c.value.push(q) : v.value = "每次选择两种食物进行比较。";
    }
    async function j() {
      if (!(f.value || !k.value.trim())) {
        f.value = !0, S.value = "", p.value = null;
        try {
          p.value = await rt("ask", { question: k.value.trim(), foodIds: c.value });
        } catch (q) {
          S.value = q.message;
        } finally {
          f.value = !1;
        }
      }
    }
    return (q, I) => (o(), a("div", id, [
      e("div", rd, [
        e("div", null, [
          I[14] || (I[14] = e("h1", null, "食物浏览与查询", -1)),
          e("p", null, l(b(V).toLocaleString()) + " 项有照片的食材与菜式，按名称搜索，打开卡片查看营养与来源。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          "aria-expanded": g.value,
          onClick: I[0] || (I[0] = (x) => g.value = !g.value)
        }, [
          U(F, {
            name: "sparkles",
            size: 17
          }),
          I[15] || (I[15] = P("问 AI", -1))
        ], 8, ud)
      ]),
      e("section", dd, [
        e("span", cd, [
          U(F, {
            name: "search",
            size: 23
          })
        ]),
        I[18] || (I[18] = e("div", null, [
          e("h2", null, "今天想了解哪一种食物？")
        ], -1)),
        e("form", {
          class: "vb-food-search-form",
          onSubmit: I[3] || (I[3] = Be((x) => ie(), ["prevent"]))
        }, [
          e("div", vd, [
            U(F, {
              name: "search",
              size: 19
            }),
            te(e("input", {
              "onUpdate:modelValue": I[1] || (I[1] = (x) => s.value = x),
              type: "search",
              placeholder: "试试香蕉、西红柿、鸡胸肉…",
              "aria-label": "食物查询关键词",
              autocomplete: "off",
              onFocus: I[2] || (I[2] = (x) => m.value = !0)
            }, null, 544), [
              [ce, s.value]
            ]),
            s.value ? (o(), a("button", {
              key: 0,
              type: "button",
              class: "vb-icon-button",
              "aria-label": "清空食物查询",
              onClick: Q
            }, [
              U(F, {
                name: "close",
                size: 15
              })
            ])) : A("", !0),
            m.value && R.value.length ? (o(), a("div", md, [
              (o(!0), a(L, null, J(R.value, (x) => (o(), a("button", {
                key: x.key,
                type: "button",
                onClick: (me) => ie(x.name)
              }, [
                P(l(x.name), 1),
                e("small", null, l(x.state), 1)
              ], 8, pd))), 128))
            ])) : A("", !0)
          ]),
          I[16] || (I[16] = e("button", {
            class: "vb-button vb-button-primary",
            type: "submit"
          }, "搜索", -1))
        ], 32),
        e("div", bd, [
          I[17] || (I[17] = e("span", null, "推荐搜索", -1)),
          (o(), a(L, null, J(["香蕉", "白菜", "燕麦", "鸡胸肉", "鸡蛋"], (x) => e("button", {
            key: x,
            type: "button",
            onClick: (me) => ie(x)
          }, l(x), 9, fd)), 64))
        ])
      ]),
      g.value ? (o(), a("section", gd, [
        e("div", hd, [
          I[19] || (I[19] = e("div", null, [
            e("span", { class: "vb-small-label" }, "以数据库为依据"),
            e("h2", null, "问问 AI，读懂食物数据")
          ], -1)),
          U(F, { name: "sparkles" })
        ]),
        I[23] || (I[23] = e("p", { class: "vb-data-note" }, "问题与相关数据库条目会发送给维衡 AI。数值来自食物库，AI 负责解释。", -1)),
        c.value.length ? (o(), a("div", yd, [
          (o(!0), a(L, null, J(c.value, (x) => (o(), a("button", {
            key: x,
            type: "button",
            onClick: (me) => B(x)
          }, l(b(oe)[x].name) + " ×", 9, kd))), 128))
        ])) : A("", !0),
        e("form", {
          onSubmit: Be(j, ["prevent"])
        }, [
          e("label", wd, [
            I[20] || (I[20] = P("你的问题", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": I[4] || (I[4] = (x) => k.value = x),
              maxlength: "600",
              rows: "2",
              placeholder: "100 克香蕉大约有多少热量？或先选两种食物，问问蛋白质的区别。"
            }, null, 512), [
              [ce, k.value]
            ])
          ]),
          e("div", $d, [
            e("button", {
              type: "button",
              class: "vb-text-button",
              onClick: I[5] || (I[5] = (x) => k.value = c.value.length === 2 ? "这两种食物的蛋白质有什么区别？" : "100 克香蕉大约有多少热量？")
            }, "填入示例问题"),
            e("button", {
              type: "submit",
              class: "vb-button vb-button-primary",
              disabled: f.value || !k.value.trim()
            }, l(f.value ? "正在查询与分析…" : "发送问题"), 9, _d)
          ])
        ], 32),
        S.value ? (o(), a("p", Ad, l(S.value), 1)) : A("", !0),
        p.value ? (o(), a("div", Cd, [
          I[21] || (I[21] = e("h3", null, "数据库数值", -1)),
          p.value.database.length ? A("", !0) : (o(), a("p", Sd, "没有匹配的数据库条目，暂无精确营养数值。")),
          e("div", Id, [
            (o(!0), a(L, null, J(p.value.database, (x) => (o(), a("button", {
              key: x.id,
              type: "button",
              onClick: (me) => q.$emit("detail", x.id)
            }, [
              e("strong", null, l(x.name) + " →", 1),
              e("span", null, l(x.grams) + " 克可食部 · 热量 " + l(b(Fe)(x.portion.energy)) + l(x.portion.energy != null ? " kcal" : "") + " · 蛋白质 " + l(b(Fe)(x.portion.protein)) + l(x.portion.protein != null ? " g" : ""), 1),
              e("small", null, l(x.source?.name || "原有目录，暂无成分数据"), 1)
            ], 8, Ed))), 128))
          ]),
          I[22] || (I[22] = e("h3", null, "AI 解释", -1)),
          e("p", null, l(p.value.answer.summary), 1),
          e("p", null, l(p.value.answer.explanation), 1),
          e("p", xd, l(p.value.answer.limitations), 1),
          e("small", Ud, l(b(Xe)(p.value.model)) + " · " + l(new Date(p.value.generatedAt).toLocaleString()), 1)
        ])) : A("", !0)
      ])) : A("", !0),
      c.value.length ? (o(), a("div", jd, [
        e("span", null, "已选 " + l(c.value.length) + " 种食物", 1),
        (o(!0), a(L, null, J(c.value, (x) => (o(), a("button", {
          key: x,
          onClick: (me) => B(x)
        }, l(b(oe)[x].name) + " ×", 9, Dd))), 128)),
        e("button", {
          class: "vb-text-button",
          onClick: I[6] || (I[6] = (x) => {
            g.value = !0, k.value = "这两种食物的蛋白质有什么区别？";
          })
        }, "问 AI 比较 →")
      ])) : A("", !0),
      v.value ? (o(), a("p", Nd, l(v.value), 1)) : A("", !0),
      !u.value && !n.value ? (o(), a(L, { key: 3 }, [
        I[25] || (I[25] = e("div", { class: "vb-section-heading" }, [
          e("div", null, [
            e("h2", null, "常见食物")
          ])
        ], -1)),
        e("div", Pd, [
          (o(), a(L, null, J(T, (x) => U(An, {
            key: x.key,
            food: x,
            compared: c.value.includes(x.key),
            onDetail: I[7] || (I[7] = (me) => q.$emit("detail", me)),
            onCompare: B
          }, null, 8, ["food", "compared"])), 64))
        ]),
        e("div", Md, [
          e("div", null, [
            I[24] || (I[24] = e("h2", null, "按类别探索", -1)),
            e("p", null, l(b(h).length.toLocaleString()) + " 项食材与菜式，每项都有直接展示的真实照片。", 1)
          ])
        ]),
        e("div", Td, [
          (o(!0), a(L, null, J(b(ps).filter((x) => M(x.id) > 0), (x) => (o(), a("button", {
            key: x.id,
            type: "button",
            class: "vb-food-category-card",
            onClick: (me) => Ae(x.id)
          }, [
            e("img", {
              src: x.image,
              alt: x.name + "分类示意图",
              loading: "lazy"
            }, null, 8, zd),
            e("span", null, [
              e("small", null, l(M(x.id).toLocaleString()) + " 种食物", 1),
              e("strong", null, l(x.name), 1),
              e("em", null, [
                P(l(x.description) + " ", 1),
                U(F, {
                  name: "arrow",
                  size: 16
                })
              ])
            ])
          ], 8, Rd))), 128))
        ]),
        I[26] || (I[26] = e("p", { class: "vb-photo-library-note" }, "照片已随网站保存。图片作者与许可可以在详情中查看；有可靠成分样本的食物显示营养值，其余保持未知。", -1))
      ], 64)) : (o(), a(L, { key: 4 }, [
        e("div", Od, [
          e("button", {
            type: "button",
            class: "vb-text-button",
            onClick: Q
          }, [
            U(F, {
              name: "back",
              size: 15
            }),
            I[27] || (I[27] = P("分类总览", -1))
          ]),
          e("h2", null, l(u.value ? b(cn)[u.value].name : "“" + n.value + "”的食物照片与营养资料"), 1),
          e("span", null, l(K.value.length.toLocaleString()) + " 个结果 · 每 100 克可食部", 1)
        ]),
        e("div", Fd, [
          de.value.length <= 10 ? (o(), a("div", Bd, [
            e("button", {
              class: ge({ selected: !i.value }),
              onClick: I[8] || (I[8] = (x) => i.value = "")
            }, "全部", 2),
            (o(!0), a(L, null, J(de.value, (x) => (o(), a("button", {
              key: x,
              class: ge({ selected: i.value === x }),
              onClick: (me) => i.value = x
            }, l(x), 11, Ld))), 128))
          ])) : (o(), a("label", Vd, [
            I[29] || (I[29] = P("筛选", -1)),
            te(e("select", {
              "onUpdate:modelValue": I[9] || (I[9] = (x) => i.value = x),
              "aria-label": "食物类型筛选"
            }, [
              I[28] || (I[28] = e("option", { value: "" }, "全部类型", -1)),
              (o(!0), a(L, null, J(de.value, (x) => (o(), a("option", {
                key: x,
                value: x
              }, l(x), 9, qd))), 128))
            ], 512), [
              [Ue, i.value]
            ])
          ])),
          e("label", null, [
            I[31] || (I[31] = P("排序", -1)),
            te(e("select", {
              "onUpdate:modelValue": I[10] || (I[10] = (x) => r.value = x),
              "aria-label": "食物营养指标排序"
            }, [...I[30] || (I[30] = [
              In('<option value="relevance">默认顺序</option><option value="energy:asc">热量从低到高</option><option value="energy:desc">热量从高到低</option><option value="protein:desc">蛋白质从高到低</option><option value="fiber:desc">膳食纤维从高到低</option><option value="name:asc">名称</option>', 6)
            ])], 512), [
              [Ue, r.value]
            ])
          ])
        ]),
        e("div", Gd, [
          (o(!0), a(L, null, J(ae.value, (x) => (o(), pe(An, {
            key: x.key,
            food: x,
            compared: c.value.includes(x.key),
            onDetail: I[11] || (I[11] = (me) => q.$emit("detail", me)),
            onCompare: B
          }, null, 8, ["food", "compared"]))), 128))
        ]),
        K.value.length ? A("", !0) : (o(), a("div", Jd, [
          U(F, {
            name: "search",
            size: 34
          }),
          I[32] || (I[32] = e("h2", null, "没有找到匹配的食物", -1)),
          I[33] || (I[33] = e("p", null, "试试常见中文名、英文原名或类别名称。", -1)),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: Q
          }, "返回食物总览")
        ])),
        he.value > 1 ? (o(), a("nav", Hd, [
          e("button", {
            disabled: d.value === 1,
            onClick: I[12] || (I[12] = (x) => d.value--)
          }, "上一页", 8, Wd),
          e("span", null, "第 " + l(d.value) + " / " + l(he.value) + " 页", 1),
          e("button", {
            disabled: d.value === he.value,
            onClick: I[13] || (I[13] = (x) => d.value++)
          }, "下一页", 8, Kd)
        ])) : A("", !0)
      ], 64)),
      n.value && z.value.length ? (o(), a("details", Yd, [
        e("summary", null, "其他营养数据样本 · " + l(z.value.length.toLocaleString()) + " 条", 1),
        I[34] || (I[34] = e("p", null, "细分品种、品牌和加工状态的原始成分样本仍保留。请按你实际食用的食物选择；这些数据样本可能没有单独配图。", -1)),
        e("div", Xd, [
          (o(!0), a(L, null, J(z.value.slice(0, 80), (x) => (o(), a("button", {
            key: x.key,
            type: "button",
            onClick: (me) => q.$emit("detail", x.key)
          }, [
            e("strong", null, l(x.name), 1),
            e("span", null, l(x.source?.name || "食物记录目录") + " · 查看数据 →", 1)
          ], 8, Qd))), 128))
        ]),
        z.value.length > 80 ? (o(), a("p", Zd, "当前显示前80条，请增加名称或加工状态关键词缩小范围。")) : A("", !0)
      ])) : A("", !0),
      e("details", ec, [
        I[35] || (I[35] = e("summary", null, "数据口径与图片署名", -1)),
        I[36] || (I[36] = e("p", null, "营养数据来自 USDA SR28（2016 年 5 月修订，公有领域），展示的是对应品种、生熟和加工状态的数据库样本。原目录中没有准确对应的数据保持缺失，不能视为 0。旧记录需确认具体参考条目后参与营养计算。分类结构参考 HowToEat。食物卡片直接使用固定保存的真实照片，不在用户浏览时自动选择搜索引擎结果。照片与名称关联依据来自具体图片说明、百科食物条目或逐项绑定；作者、来源和许可保留在详情中。食材参考照片不证明营养样本具体品牌或品种；扩展样本保留完整英文描述，中文为食材类别提示；校园混合菜尚无配方时保持营养未知。", -1)),
        I[37] || (I[37] = e("p", null, "碳水采用差减法，含膳食纤维；维 A 为 μg RAE，叶酸为 μg DFE。配方、产地和做法会造成差异。婴幼儿食品类仅为成分查询，不提供婴幼儿膳食推荐。", -1)),
        I[38] || (I[38] = e("p", null, "每项食物照片的作者、原图链接和许可均在食物详情中显示。", -1)),
        I[39] || (I[39] = e("p", null, "分类总览图片：", -1)),
        e("ul", null, [
          (o(!0), a(L, null, J(b(ld), (x) => (o(), a("li", {
            key: x.key
          }, [
            P(l(b(cn)[x.key]?.name) + "：", 1),
            e("a", {
              href: x.sourceUrl,
              target: "_blank",
              rel: "noopener"
            }, l(x.title), 9, tc),
            P(" · " + l(x.author) + " · ", 1),
            e("a", {
              href: x.licenseUrl,
              target: "_blank",
              rel: "noopener"
            }, l(x.license), 9, nc),
            P(" · " + l(x.modifications), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function oc(t) {
  return t instanceof Error ? t.message : "Agent 暂时无法完成，请稍后重试。";
}
function ac() {
  const t = D(""), s = D((/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE")), n = D("lunch"), u = D(null), i = D(""), r = D(!1), d = D([]);
  async function m(v, g, k = {}) {
    if (r.value) return;
    i.value = "", u.value = null, r.value = !0, d.value = [];
    const f = v ? {
      sex: v.sex,
      age: v.age,
      height: v.height,
      weight: v.weight,
      activity: v.activity,
      ageMonths: v.ageMonths,
      physiologicalStage: v.physiologicalStage
    } : null;
    try {
      u.value = await Ds({
        goal: t.value.slice(0, 500),
        date: s.value,
        meal: n.value,
        profile: f,
        conditions: k.conditions,
        recordContext: k.recordContext,
        ...g ? {
          personalization: {
            preferences: g.preferences?.slice(0, 200),
            safetyFlags: g.safetyFlags?.slice(0, 4)
          }
        } : {}
      }, (p) => d.value.push(p));
    } catch (p) {
      i.value = oc(p);
    } finally {
      r.value = !1;
    }
  }
  function c() {
    u.value = null, i.value = "", d.value = [];
  }
  return { goal: t, date: s, meal: n, response: u, error: i, busy: r, progress: d, run: m, clear: c };
}
const lc = [
  ["花生", "peanut", "peanuts", "groundnut"],
  ["奶", "牛奶", "乳", "乳制品", "奶制品", "dairy", "milk", "cheese", "yogurt", "yoghurt", "cream", "butter"],
  ["蛋", "鸡蛋", "egg", "eggs"],
  ["海鲜", "seafood", "鱼虾蟹贝", "鱼", "虾", "蟹", "贝", "fish", "shrimp", "prawn", "crab", "clam", "oyster", "salmon", "tuna", "cod", "squid", "mussel"],
  ["肉类", "肉", "牛肉", "猪肉", "鸡肉", "羊肉", "禽", "beef", "pork", "chicken", "lamb", "turkey", "duck", "meat"],
  ["香菜", "coriander", "cilantro"],
  ["大豆", "豆制品", "soy", "tofu"],
  ["小麦", "wheat"],
  ["坚果", "nuts", "almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut"]
], Bt = (t, s = 300) => typeof t == "string" ? t.trim().slice(0, s) : "";
function Lt(t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("就餐条件格式不正确。");
  const s = t.budget === null || t.budget === void 0 || t.budget === "" ? null : Number(t.budget);
  if (s !== null && (!Number.isFinite(s) || s <= 0 || s > 1e3)) throw new Error("预算需为0以上、1000元以内。");
  const n = (Array.isArray(t.avoids) ? t.avoids.join("、") : Bt(t.avoids)).split(/[,，、;；\n]+/).map((r) => r.trim().replace(/^(不吃|不要|回避|避免|忌口[:：]?)/, "").trim()).filter(Boolean);
  if (n.length > 12 || n.some((r) => r.length > 30)) throw new Error("回避项最多12项，每项不超过30字。");
  const u = t.availableFoods ?? [];
  if (!Array.isArray(u) || u.length > 12) throw new Error("可选食物最多12项。");
  const i = u.map((r) => {
    const d = oe[r?.foodId], m = Number(r?.grams), c = r?.price === null || r?.price === void 0 || r?.price === "" ? null : Number(r.price);
    if (!d || !Number.isFinite(m) || m < 0.1 || m > 5e3 || c !== null && (!Number.isFinite(c) || c < 0 || c > 1e3)) throw new Error("请核对可选食物、份量和价格。");
    return { foodId: d.key, name: d.name, grams: m, price: c };
  });
  if (new Set(i.map((r) => r.foodId)).size !== i.length) throw new Error("可选食物不能重复，请修改已有条目的份量。");
  return { budget: s, avoids: [...new Set(n)], preferences: Bt(t.preferences, 200), exercise: Bt(t.exercise, 200), availableFoods: i, onlyAvailable: i.length > 0 && t.onlyAvailable !== !1 };
}
function Hn(t, s = []) {
  const n = [t?.name, t?.source?.description, ...t?.aliases || []].join(" ").toLowerCase(), u = gt(n);
  return s.filter((i) => {
    const r = /* @__PURE__ */ new Set([i]);
    for (const d of lc) if (d.some((m) => gt(m) === gt(i))) for (const m of d) r.add(m);
    return [...r].some((d) => /^[a-z ]+$/i.test(d) ? new RegExp("\\b" + d.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "i").test(n) : u.includes(gt(d)));
  });
}
function Cn(t, s) {
  return !!t && !["13", "17"].includes(t.category) && !Hn(t, s.avoids).length && (!s.onlyAvailable || s.availableFoods.some((n) => n.foodId === t.key));
}
function ic(t, s) {
  const n = t.map((r) => {
    const d = s.availableFoods.find((c) => c.foodId === r.foodId), m = d?.price != null ? Math.round(d.price * r.grams / d.grams * 100) / 100 : null;
    return { foodId: r.foodId, cost: m, priceBasis: d?.price != null ? { price: d.price, grams: d.grams } : null };
  }), u = n.every((r) => r.cost !== null), i = Math.round(n.reduce((r, d) => r + (d.cost ?? 0), 0) * 100) / 100;
  return { currency: "CNY", budget: s.budget, complete: u, knownSubtotal: i, total: u ? i : null, status: u ? s.budget === null ? "no_budget" : i > s.budget ? "over_budget" : "within_budget" : "unknown", breakdown: n, basis: "按用户录入的份量价格等比例估算；不是食堂报价或实际结算价", availability: s.onlyAvailable ? "仅使用本次用户提供的食物，售卖及配料仍需核对" : "未提供完整食堂菜单，不保证食堂有售" };
}
const rc = {
  class: "vb-glass vb-agent-card",
  "aria-labelledby": "meal-agent-title"
}, uc = { class: "vb-agent-heading" }, dc = { class: "vb-icon-badge" }, cc = { class: "vb-campus-fields" }, vc = ["max", "disabled"], mc = ["disabled"], pc = ["value"], bc = ["disabled"], fc = ["disabled"], gc = { class: "vb-analysis-tabs" }, hc = ["disabled"], yc = ["disabled", "onClick"], kc = { class: "vb-more-conditions" }, wc = { class: "vb-agent-goal" }, $c = ["disabled"], _c = { class: "vb-campus-fields" }, Ac = ["disabled"], Cc = ["disabled"], Sc = { class: "vb-campus-candidates" }, Ic = { class: "vb-candidate-search" }, Ec = ["disabled"], xc = ["disabled"], Uc = ["value"], jc = ["disabled"], Dc = { class: "vb-candidate-list" }, Nc = ["onUpdate:modelValue", "disabled"], Pc = ["onUpdate:modelValue", "disabled"], Mc = ["disabled", "onClick"], Tc = {
  key: 0,
  class: "vb-agent-context-optin"
}, Rc = ["disabled"], zc = { class: "vb-agent-context-optin" }, Oc = ["disabled"], Fc = { class: "vb-agent-context-optin" }, Bc = ["disabled"], Lc = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Vc = ["disabled"], qc = {
  key: 0,
  class: "vb-loading-ring"
}, Gc = {
  key: 0,
  class: "vb-agent-progress",
  role: "status",
  "aria-live": "polite"
}, Jc = { key: 0 }, Hc = {
  key: 1,
  class: "vb-agent-error",
  role: "alert"
}, Wc = ["disabled"], Kc = {
  key: 2,
  class: "vb-agent-error",
  role: "status"
}, Yc = {
  key: 3,
  class: "vb-agent-plan"
}, Xc = {
  key: 0,
  class: "vb-data-note",
  role: "status"
}, Qc = { class: "vb-agent-plan-heading" }, Zc = { class: "vb-eyebrow" }, ev = { key: 1 }, tv = { class: "vb-data-note" }, nv = { key: 0 }, sv = { key: 1 }, ov = { class: "vb-agent-items" }, av = { class: "vb-agent-item-title" }, lv = ["onClick"], iv = ["onClick"], rv = {
  key: 0,
  class: "vb-candidate-search"
}, uv = ["value"], dv = ["disabled", "onClick"], cv = { key: 0 }, vv = { class: "vb-agent-grams" }, mv = ["value", "onInput"], pv = { class: "vb-data-note" }, bv = { class: "vb-agent-evidence" }, fv = { class: "vb-agent-source" }, gv = ["href"], hv = { key: 1 }, yv = { key: 0 }, kv = {
  key: 3,
  class: "vb-agent-notes"
}, wv = {
  key: 4,
  class: "vb-agent-notes is-caution"
}, $v = { class: "vb-agent-trace" }, _v = { class: "vb-agent-confirm" }, Av = ["disabled"], Cv = {
  __name: "MealPlanningAgent",
  props: { profile: Object, nutrition: Object, preferences: String, flags: Array, records: Array },
  emits: ["confirm"],
  setup(t, { emit: s }) {
    const n = t, u = s, { goal: i, date: r, meal: d, response: m, error: c, busy: v, progress: g, run: k, clear: f } = ac();
    i.value = "结合我的就餐条件，安排一份食物多样、方便选择的下一餐";
    const p = ot({ budget: "", avoids: "", preferences: n.preferences || "", exercise: "", availableFoods: [], onlyAvailable: !0 }), S = D(-1), h = D(""), w = D(!1), $ = D(!1), z = D(!0), X = D(!1), R = D(""), M = D(""), V = D(""), T = [["breakfast", "早餐"], ["lunch", "午餐"], ["dinner", "晚餐"], ["snack", "加餐"]], O = H(() => M.value.trim() ? Yt(M.value, 8) : []), de = H(() => at((n.records || []).find((Y) => Y.date === r.value))), K = H(() => m.value?.status === "ready" ? m.value : null), he = H(() => (K.value?.plan.items || []).map((Y, C) => ({ id: "agent-" + C, foodId: Y.foodId, name: Y.name, grams: Y.grams, meal: Y.meal, group: oe[Y.foodId]?.group || "snacks", source: "catalogue", estimated: !0, referenceConfirmed: !0 }))), ae = H(() => K.value ? ic(K.value.plan.items, K.value.conditions) : null), ie = H(() => !K.value || !K.value.plan.items.length || ae.value?.status === "over_budget" || K.value.plan.items.some((Y) => !Number.isFinite(Y.grams) || Y.grams < 0.1 || Y.grams > 5e3));
    ve([i, r, d, p, z, X, () => n.profile, () => n.records], () => {
      !v.value && m.value && f(), w.value = !1;
    }, { deep: !0 }), ve(() => n.preferences, (Y) => p.preferences = Y || "");
    function Ae() {
      const Y = oe[V.value];
      if (R.value = "", !!Y) {
        if (p.availableFoods.some((C) => C.foodId === Y.key)) {
          R.value = "该食物已在备选中，请直接修改份量。";
          return;
        }
        if (p.availableFoods.length >= 12) {
          R.value = "最多加入12项备选食物。";
          return;
        }
        p.availableFoods.push({ foodId: Y.key, name: Y.name, grams: 100, price: "" }), V.value = "", M.value = "";
      }
    }
    async function Q() {
      R.value = "", w.value = !1, $.value = !1;
      let Y;
      try {
        await Le(p.availableFoods.map((N) => N.foodId)), Y = Lt(p);
        const C = Y.availableFoods.find((N) => Hn(oe[N.foodId], Y.avoids).length);
        if (C) throw Error("备选食物“" + C.name + "”命中回避项，请先移除或修改条件。");
      } catch (C) {
        R.value = C.message;
        return;
      }
      await k(n.profile, X.value ? { safetyFlags: (n.flags || []).filter((C) => ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"].includes(C)) } : void 0, { conditions: Y, ...z.value ? { recordContext: { date: r.value, entries: de.value.map((C) => ({ foodId: C.foodId, name: C.name, grams: C.grams, meal: C.meal, referenceConfirmed: C.referenceConfirmed })) } } : {} });
    }
    function B() {
      ie.value || w.value || (w.value = !0, u("confirm", { confirmationId: K.value.confirmationId, date: K.value.date, meal: K.value.meal, items: K.value.plan.items, onResult: (Y) => {
        w.value = Y.ok, Y.ok || (R.value = Y.error || "加入草稿失败，请重试。");
      } }));
    }
    function j(Y, C) {
      K.value && (K.value.plan.items[Y].grams = Number(C), K.value.plan.items[Y].portion = vn(oe[K.value.plan.items[Y].foodId], Number(C)), $.value = !0);
    }
    function q(Y) {
      K.value && (K.value.plan.items.splice(Y, 1), $.value = !0);
    }
    const I = H(() => {
      let Y;
      try {
        Y = Lt(p);
      } catch {
        return [];
      }
      return (Y.availableFoods.length && Y.onlyAvailable ? Y.availableFoods.map((N) => oe[N.foodId]) : Qe).filter((N) => N && !N.__summary && N.source && Cn(N, Y) && !K.value?.plan.items.some((re) => re.foodId === N.key)).slice(0, 60);
    });
    async function x(Y) {
      const C = h.value, N = K.value, re = oe[C];
      if (!N || !re || !I.value.some((xe) => xe.key === C)) return;
      try {
        if (await Le([C]), K.value !== N || !Cn(re, Lt(p))) return;
      } catch (xe) {
        R.value = xe.message || "食物详情读取失败，请重试。";
        return;
      }
      const ue = N.plan.items[Y];
      ue && (N.plan.items[Y] = { ...ue, foodId: re.key, name: re.name, portion: vn(re, ue.grams), reason: "用户从符合当前回避条件的目录中替换；份量沿用，请核对。", sourceName: re.source?.name || "", source: re.source?.id || "", missing: ["energy", "protein", "carbs", "fat"].filter((xe) => typeof re.nutrients?.[xe] != "number") }, $.value = !0, S.value = -1, h.value = "");
    }
    const me = (Y) => typeof Y == "number" && Number.isFinite(Y) ? Y.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "暂无数据";
    return (Y, C) => (o(), a("section", rc, [
      e("header", uc, [
        e("span", dc, [
          U(F, {
            name: "sparkles",
            size: 21
          })
        ]),
        C[15] || (C[15] = e("div", null, [
          e("h2", { id: "meal-agent-title" }, "安排我的下一餐"),
          e("p", null, "说清预算和回避项，结合你的备选食物检索与计算。方案先核对，实际吃过后再记录。")
        ], -1))
      ]),
      e("form", {
        class: "vb-agent-form",
        onSubmit: Be(Q, ["prevent"])
      }, [
        e("div", cc, [
          e("label", null, [
            C[16] || (C[16] = P("日期", -1)),
            te(e("input", {
              "onUpdate:modelValue": C[0] || (C[0] = (N) => Dt(r) ? r.value = N : null),
              type: "date",
              max: b(_e)(),
              disabled: b(v)
            }, null, 8, vc), [
              [ce, b(r)]
            ])
          ]),
          e("label", null, [
            C[17] || (C[17] = P("餐次", -1)),
            te(e("select", {
              "onUpdate:modelValue": C[1] || (C[1] = (N) => Dt(d) ? d.value = N : null),
              disabled: b(v)
            }, [
              (o(), a(L, null, J(T, ([N, re]) => e("option", {
                key: N,
                value: N
              }, l(re), 9, pc)), 64))
            ], 8, mc), [
              [Ue, b(d)]
            ])
          ]),
          e("label", null, [
            C[18] || (C[18] = P("预算（元，可选）", -1)),
            te(e("input", {
              "onUpdate:modelValue": C[2] || (C[2] = (N) => p.budget = N),
              type: "number",
              min: "0.01",
              max: "1000",
              step: "0.01",
              placeholder: "例如20",
              disabled: b(v)
            }, null, 8, bc), [
              [ce, p.budget]
            ])
          ]),
          e("label", null, [
            C[19] || (C[19] = P("不吃的食物", -1)),
            te(e("input", {
              "onUpdate:modelValue": C[3] || (C[3] = (N) => p.avoids = N),
              maxlength: "300",
              placeholder: "例如花生、香菜，用逗号分开",
              disabled: b(v)
            }, null, 8, fc), [
              [ce, p.avoids]
            ])
          ])
        ]),
        e("div", gc, [
          e("button", {
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: b(v),
            onClick: C[4] || (C[4] = (N) => p.budget = "15")
          }, "预算15元", 8, hc),
          (o(), a(L, null, J(["清淡", "素食偏好"], (N) => e("button", {
            key: N,
            type: "button",
            class: "vb-button vb-button-quiet",
            disabled: b(v),
            onClick: (re) => p.preferences = N
          }, l(N), 9, yc)), 64)),
          e("span", null, "已选偏好：" + l(p.preferences || "未设置"), 1)
        ]),
        e("details", kc, [
          C[29] || (C[29] = e("summary", null, "更多条件 · 目标、口味、运动与备选食物", -1)),
          e("label", wc, [
            C[20] || (C[20] = e("span", null, "这餐想怎么安排？", -1)),
            te(e("textarea", {
              "onUpdate:modelValue": C[5] || (C[5] = (N) => Dt(i) ? i.value = N : null),
              rows: "2",
              maxlength: "500",
              disabled: b(v),
              placeholder: "例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐"
            }, null, 8, $c), [
              [ce, b(i)]
            ])
          ]),
          e("div", _c, [
            e("label", null, [
              C[21] || (C[21] = P("口味与饮食偏好", -1)),
              te(e("input", {
                "onUpdate:modelValue": C[6] || (C[6] = (N) => p.preferences = N),
                maxlength: "200",
                placeholder: "例如清淡、喜欢家常菜",
                disabled: b(v)
              }, null, 8, Ac), [
                [ce, p.preferences]
              ])
            ]),
            e("label", null, [
              C[22] || (C[22] = P("运动情况（可选）", -1)),
              te(e("input", {
                "onUpdate:modelValue": C[7] || (C[7] = (N) => p.exercise = N),
                maxlength: "200",
                placeholder: "例如今天散步；仅作背景，不自动开运动营养处方",
                disabled: b(v)
              }, null, 8, Cc), [
                [ce, p.exercise]
              ])
            ])
          ]),
          e("details", Sc, [
            C[27] || (C[27] = e("summary", null, "我能买到的食物与价格（可选）", -1)),
            C[28] || (C[28] = e("p", null, "从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。", -1)),
            e("div", Ic, [
              te(e("input", {
                "onUpdate:modelValue": C[8] || (C[8] = (N) => M.value = N),
                "aria-label": "搜索备选食物",
                placeholder: "搜索米饭、鸡肉、豆腐…",
                disabled: b(v),
                onInput: C[9] || (C[9] = (N) => V.value = "")
              }, null, 40, Ec), [
                [ce, M.value]
              ]),
              te(e("select", {
                "onUpdate:modelValue": C[10] || (C[10] = (N) => V.value = N),
                "aria-label": "选择具体食物",
                disabled: b(v) || !O.value.length
              }, [
                C[23] || (C[23] = e("option", {
                  value: "",
                  disabled: ""
                }, "选择具体品种与状态", -1)),
                (o(!0), a(L, null, J(O.value, (N) => (o(), a("option", {
                  key: N.key,
                  value: N.key
                }, l(N.name), 9, Uc))), 128))
              ], 8, xc), [
                [Ue, V.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: b(v) || !V.value,
                onClick: Ae
              }, "加入备选", 8, jc)
            ]),
            e("div", Dc, [
              (o(!0), a(L, null, J(p.availableFoods, (N, re) => (o(), a("article", {
                key: N.foodId
              }, [
                e("strong", null, l(N.name), 1),
                e("label", null, [
                  C[24] || (C[24] = P("这份可食部（克）", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (ue) => N.grams = ue,
                    type: "number",
                    min: "0.1",
                    max: "5000",
                    step: "0.1",
                    disabled: b(v)
                  }, null, 8, Nc), [
                    [
                      ce,
                      N.grams,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("label", null, [
                  C[25] || (C[25] = P("这份已知价格（元）", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": (ue) => N.price = ue,
                    type: "number",
                    min: "0",
                    max: "1000",
                    step: "0.01",
                    placeholder: "未知则留空",
                    disabled: b(v)
                  }, null, 8, Pc), [
                    [ce, N.price]
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "vb-text-button",
                  disabled: b(v),
                  onClick: (ue) => p.availableFoods.splice(re, 1)
                }, "移除", 8, Mc)
              ]))), 128))
            ]),
            p.availableFoods.length ? (o(), a("label", Tc, [
              te(e("input", {
                "onUpdate:modelValue": C[11] || (C[11] = (N) => p.onlyAvailable = N),
                type: "checkbox",
                disabled: b(v)
              }, null, 8, Rc), [
                [nt, p.onlyAvailable]
              ]),
              C[26] || (C[26] = e("span", null, "仅从这些备选食物中规划", -1))
            ])) : A("", !0)
          ])
        ]),
        e("label", zc, [
          te(e("input", {
            "onUpdate:modelValue": C[12] || (C[12] = (N) => z.value = N),
            type: "checkbox",
            disabled: b(v)
          }, null, 8, Oc), [
            [nt, z.value]
          ]),
          e("span", null, [
            P("使用所选日期的 " + l(de.value.length) + " 项已记录食物", 1),
            C[30] || (C[30] = e("small", null, "只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。", -1))
          ])
        ]),
        e("label", Fc, [
          te(e("input", {
            "onUpdate:modelValue": C[13] || (C[13] = (N) => X.value = N),
            type: "checkbox",
            disabled: b(v)
          }, null, 8, Bc), [
            [nt, X.value]
          ]),
          C[31] || (C[31] = e("span", null, [
            P("本次附带我已选择的安全提醒"),
            e("small", null, "用于提示核对，不生成疾病或特殊生理人群的营养处方。")
          ], -1))
        ]),
        C[32] || (C[32] = e("p", { class: "vb-data-note" }, "点击生成会把本次条件、基础身体档案和勾选的相关记录发送给维衡 AI。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。", -1)),
        R.value ? (o(), a("p", Lc, l(R.value), 1)) : A("", !0),
        e("button", {
          class: "vb-button vb-button-primary",
          disabled: b(v) || !b(i).trim()
        }, [
          b(v) ? (o(), a("span", qc)) : (o(), pe(F, {
            key: 1,
            name: "sparkles",
            size: 16
          })),
          P(l(b(v) ? "正在等待真实检索与计算…" : K.value ? "按当前条件重新规划" : "生成待确认方案"), 1)
        ], 8, Vc)
      ], 32),
      b(v) || b(g).length ? (o(), a("div", Gc, [
        e("div", null, [
          e("strong", null, l(b(v) ? "正在执行；仅展示已完成步骤" : "本次实际执行记录"), 1),
          b(v) ? (o(), a("p", Jc, "模型响应需要一些时间，完成的工具步骤会陆续显示。")) : A("", !0),
          e("ol", null, [
            (o(!0), a(L, null, J(b(g), (N, re) => (o(), a("li", { key: re }, [
              e("strong", null, l(N.label), 1),
              P(" · " + l(N.resultSummary), 1)
            ]))), 128))
          ])
        ])
      ])) : A("", !0),
      b(c) ? (o(), a("div", Hc, [
        C[33] || (C[33] = e("strong", null, "没有生成可确认方案", -1)),
        e("p", null, l(b(c)), 1),
        e("button", {
          class: "vb-button vb-button-quiet",
          disabled: b(v),
          onClick: Q
        }, "保留条件并重试", 8, Wc)
      ])) : A("", !0),
      b(m)?.status === "needs_evidence" ? (o(), a("p", Kc, l(b(m).message) + " 请修改备选食物或检索描述。", 1)) : A("", !0),
      K.value ? (o(), a("section", Yc, [
        $.value ? (o(), a("p", Xc, "方案已修改：下方营养与费用按当前份量重新计算；生成时的文字建议和目标比较已失效。" + l(w.value ? "这批方案已加入草稿，请在饮食记录中继续修改。" : ""), 1)) : A("", !0),
        e("div", Qc, [
          e("div", null, [
            e("p", Zc, "待确认 · " + l(K.value.date) + " · " + l(T.find((N) => N[0] === K.value.meal)?.[1]), 1),
            e("h3", null, l(K.value.plan.title), 1)
          ]),
          C[34] || (C[34] = e("span", { class: "vb-pill" }, "确认后只加入草稿", -1))
        ]),
        $.value ? A("", !0) : (o(), a("p", ev, l(K.value.plan.summary), 1)),
        e("p", tv, "本次使用 " + l(K.value.contextSummary.itemCount) + " 项已记录食物；" + l(K.value.contextSummary.targetsAvailable ? "已结合档案估算目标" : "档案不完整或不适用成人目标，本次不比较成人配额") + "。记录不保证涵盖全天。", 1),
        ae.value ? (o(), a("div", {
          key: 2,
          class: ge(["vb-campus-cost", { "is-caution": ae.value.status === "over_budget" }])
        }, [
          e("h4", null, l(ae.value.complete ? "按录入价格估算：约 ¥" + me(ae.value.total) : "价格待确认"), 1),
          ae.value.budget !== null ? (o(), a("p", nv, "本餐预算 ¥" + l(ae.value.budget) + " · " + l(ae.value.status === "within_budget" ? "按已录入价格估算在预算内" : ae.value.status === "over_budget" ? "当前份量估算超预算，请调整后再确认" : "价格不完整，暂不能判断是否符合预算"), 1)) : A("", !0),
          ae.value.complete ? A("", !0) : (o(), a("p", sv, "已知价格小计约 ¥" + l(me(ae.value.knownSubtotal)) + "，其余食物未计价。", 1)),
          e("small", null, l(ae.value.basis) + "。" + l(ae.value.availability) + "。", 1)
        ], 2)) : A("", !0),
        e("div", ov, [
          (o(!0), a(L, null, J(K.value.plan.items, (N, re) => (o(), a("article", {
            key: N.foodId,
            class: "vb-agent-item"
          }, [
            e("div", av, [
              e("div", null, [
                U(nn, {
                  food: b(oe)[N.foodId],
                  class: "vb-plan-photo",
                  label: !1
                }, null, 8, ["food"]),
                e("h4", null, l(b(jt)(b(oe)[N.foodId])), 1),
                e("small", null, l(b(tn)(b(oe)[N.foodId])), 1),
                e("p", null, l(N.reason), 1)
              ]),
              e("button", {
                type: "button",
                class: "vb-text-button",
                onClick: (ue) => q(re)
              }, "移除", 8, lv)
            ]),
            e("button", {
              type: "button",
              class: "vb-button vb-button-quiet",
              onClick: (ue) => {
                S.value = re, h.value = "";
              }
            }, "换一道", 8, iv),
            S.value === re ? (o(), a("div", rv, [
              te(e("select", {
                "onUpdate:modelValue": C[14] || (C[14] = (ue) => h.value = ue),
                "aria-label": "替换食物"
              }, [
                C[35] || (C[35] = e("option", { value: "" }, "选择符合当前回避条件的食物", -1)),
                (o(!0), a(L, null, J(I.value, (ue) => (o(), a("option", {
                  key: ue.key,
                  value: ue.key
                }, l(ue.name), 9, uv))), 128))
              ], 512), [
                [Ue, h.value]
              ]),
              e("button", {
                type: "button",
                class: "vb-button vb-button-soft",
                disabled: !h.value,
                onClick: (ue) => x(re)
              }, "确认替换", 8, dv),
              I.value.length ? A("", !0) : (o(), a("p", cv, "暂无符合条件的替换项，请修改备选食物后重新规划。"))
            ])) : A("", !0),
            e("label", vv, [
              C[36] || (C[36] = P("可食部估算克数", -1)),
              e("input", {
                value: N.grams,
                type: "number",
                min: "0.1",
                max: "5000",
                step: "0.1",
                onInput: (ue) => j(re, ue.target.value)
              }, null, 40, mv),
              C[37] || (C[37] = P("克", -1))
            ]),
            e("p", pv, "本项费用：" + l(ae.value?.breakdown[re]?.cost == null ? "价格未知" : "约 ¥" + me(ae.value.breakdown[re].cost)), 1),
            e("div", bv, [
              (o(), a(L, null, J([{ id: "energy", name: "热量", unit: "kcal" }, { id: "protein", name: "蛋白质", unit: "g" }, { id: "carbs", name: "碳水", unit: "g" }, { id: "fat", name: "脂肪", unit: "g" }], (ue) => e("small", {
                key: ue.id
              }, l(ue.name) + " " + l(me(N.portion[ue.id])) + l(N.portion[ue.id] !== null ? " " + ue.unit : ""), 1)), 64))
            ]),
            e("details", fv, [
              C[39] || (C[39] = e("summary", null, "查看这份食物的依据", -1)),
              e("p", null, "状态：" + l(b(oe)[N.foodId]?.state), 1),
              e("p", null, [
                C[38] || (C[38] = P("来源：", -1)),
                b(oe)[N.foodId]?.source ? (o(), a("a", {
                  key: 0,
                  href: b(oe)[N.foodId].source.url,
                  target: "_blank",
                  rel: "noopener"
                }, l(N.sourceName) + " · " + l(N.source), 9, gv)) : (o(), a("span", hv, "暂无可核验成分数据"))
              ]),
              e("p", null, l(b(oe)[N.foodId]?.source?.description), 1),
              C[40] || (C[40] = e("p", null, "每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。", -1)),
              N.missing.length ? (o(), a("p", yv, "缺失指标：" + l(N.missing.join("、")), 1)) : A("", !0)
            ])
          ]))), 128))
        ]),
        U(Xt, {
          entries: he.value,
          targets: t.nutrition || {},
          compact: "",
          details: ""
        }, null, 8, ["entries", "targets"]),
        C[45] || (C[45] = e("p", { class: "vb-data-note" }, "上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。", -1)),
        !$.value && K.value.plan.suggestions.length ? (o(), a("div", kv, [
          C[41] || (C[41] = e("h4", null, "执行建议", -1)),
          e("ul", null, [
            (o(!0), a(L, null, J(K.value.plan.suggestions, (N) => (o(), a("li", { key: N }, l(N), 1))), 128))
          ])
        ])) : A("", !0),
        !$.value && K.value.plan.cautions.length ? (o(), a("div", wv, [
          C[42] || (C[42] = e("h4", null, "需要核对", -1)),
          e("ul", null, [
            (o(!0), a(L, null, J(K.value.plan.cautions, (N) => (o(), a("li", { key: N }, l(N), 1))), 128))
          ])
        ])) : A("", !0),
        e("details", $v, [
          C[43] || (C[43] = e("summary", null, "原始工具调用与版本", -1)),
          e("ol", null, [
            (o(!0), a(L, null, J(K.value.trace, (N, re) => (o(), a("li", { key: re }, [
              e("strong", null, l(N.label), 1),
              P(" · " + l(N.inputSummary) + " · " + l(N.resultSummary), 1)
            ]))), 128))
          ]),
          e("small", null, l(b(Xe)(K.value.model)) + " · " + l(K.value.dataVersion) + " · " + l(new Date(K.value.generatedAt).toLocaleString("zh-CN")), 1)
        ]),
        U(Nn),
        e("div", _v, [
          C[44] || (C[44] = e("p", null, "仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。", -1)),
          e("button", {
            class: "vb-button vb-button-primary",
            disabled: w.value || ie.value,
            onClick: B
          }, l(w.value ? "已加入草稿" : "确认并加入饮食草稿"), 9, Av)
        ])
      ])) : A("", !0)
    ]));
  }
}, Sv = { class: "vb-page-title" }, Iv = {
  key: 0,
  class: "vb-glass vb-plan-context"
}, Ev = { class: "vb-glass vb-record-prompt" }, xv = /* @__PURE__ */ Ye({
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
    return (s, n) => (o(), a(L, null, [
      e("div", Sv, [
        n[4] || (n[4] = e("div", null, [
          e("h1", null, "膳食方案"),
          e("p", null, "结合身体档案、饮食记录与就餐条件，安排更适合自己的下一餐。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-soft",
          onClick: n[0] || (n[0] = (u) => s.$emit("navigate", "profile"))
        }, "调整档案与饮食偏好")
      ]),
      t.nutrition ? A("", !0) : (o(), a("section", Iv, [...n[5] || (n[5] = [
        e("div", null, [
          e("h2", null, "可以先选餐，再逐步完善档案"),
          e("p", null, "身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。")
        ], -1)
      ])])),
      U(Cv, {
        profile: t.profile || void 0,
        nutrition: t.nutrition || void 0,
        preferences: t.preferences,
        flags: t.flags,
        records: t.records,
        onConfirm: n[1] || (n[1] = (u) => s.$emit("add-plan", u))
      }, null, 8, ["profile", "nutrition", "preferences", "flags", "records"]),
      e("section", Ev, [
        n[6] || (n[6] = e("div", null, [
          e("h3", null, "从下一餐，回到真实记录"),
          e("p", null, "方案不代表已经吃过；食物、配料、价格与实际份量需要你核对。")
        ], -1)),
        e("button", {
          class: "vb-text-button",
          onClick: n[2] || (n[2] = (u) => s.$emit("navigate", "diary"))
        }, "去记录实际饮食 →"),
        e("button", {
          class: "vb-text-button",
          onClick: n[3] || (n[3] = (u) => s.$emit("navigate", "about"))
        }, "查看参考资料 →")
      ])
    ], 64));
  }
}), Uv = { class: "vb-page-title" }, jv = { class: "vb-glass vb-profile-details" }, Dv = { class: "vb-section-heading" }, Nv = { class: "vb-pill" }, Pv = { key: 0 }, Mv = { key: 1 }, Tv = { class: "vb-profile-settings" }, Rv = { class: "vb-glass" }, zv = { class: "vb-section-heading" }, Ov = { class: "vb-field" }, Fv = ["value"], Bv = { class: "vb-glass" }, Lv = { class: "vb-section-heading" }, Vv = ["checked", "onChange"], qv = {
  __name: "ProfilePage",
  props: { profile: Object, nutrition: Object, flags: Array, preferences: String },
  emits: ["edit", "update:flags", "update:preferences"],
  setup(t, { emit: s }) {
    const n = t, u = H(() => Wt.find((m) => m.key === n.profile.activity)), i = s, r = ["正在使用药物", "孕期或哺乳期", "有需要管理的健康状况", "正在使用营养补充剂"];
    function d(m, c, v) {
      i("update:flags", c ? [...v, m] : v.filter((g) => g !== m));
    }
    return (m, c) => (o(), a(L, null, [
      e("div", Uv, [
        c[3] || (c[3] = e("div", null, [
          e("h1", null, "个人档案"),
          e("p", null, "身体档案支持整体跳过。主页支持0—120岁年龄段参考卡片；婴幼儿、青少年和高龄采用对应分组并注明范围，资料缺失时保持未知。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: c[0] || (c[0] = (v) => m.$emit("edit"))
        }, [
          U(F, {
            name: "edit",
            size: 17
          }),
          c[2] || (c[2] = P("修改基础档案", -1))
        ])
      ]),
      e("section", jv, [
        e("div", Dv, [
          c[4] || (c[4] = e("h2", null, "基础信息", -1)),
          e("span", Nv, l(b(Ee) ? b(kt) === "synced" ? "账号已同步" : "本机保存 · 账号同步状态见账号面板" : "游客本地保存"), 1)
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
          t.profile.age === 0 ? (o(), a("div", Pv, [
            c[7] || (c[7] = e("dt", null, "月龄", -1)),
            e("dd", null, l(t.profile.ageMonths == null || t.profile.ageMonths === "" ? "未填写" : t.profile.ageMonths + " 个月"), 1)
          ])) : A("", !0),
          t.profile.physiologicalStage && t.profile.physiologicalStage !== "general" ? (o(), a("div", Mv, [
            c[8] || (c[8] = e("dt", null, "生理阶段", -1)),
            e("dd", null, l({ pregnant: "孕期", lactating: "哺乳期", special: "需专业评估" }[t.profile.physiologicalStage]), 1)
          ])) : A("", !0),
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
      e("div", Tv, [
        e("section", Rv, [
          e("div", zv, [
            c[13] || (c[13] = e("div", null, [
              e("h2", null, "饮食偏好"),
              e("p", null, "记下喜欢、回避或需要核对的食物")
            ], -1)),
            U(F, { name: "bowl" })
          ]),
          e("label", Ov, [
            c[14] || (c[14] = e("span", { class: "vb-sr-only" }, "饮食偏好备注", -1)),
            e("textarea", {
              value: t.preferences,
              rows: "5",
              maxlength: "200",
              placeholder: "如：偏爱家常菜，不喜欢香菜…",
              onInput: c[1] || (c[1] = (v) => m.$emit("update:preferences", v.target.value))
            }, null, 40, Fv)
          ]),
          c[15] || (c[15] = e("p", { class: "vb-section-note" }, "用于饮食备忘和下一餐默认偏好；显式忌口请在规划中单独填写，不能自动验证过敏原。", -1))
        ]),
        e("section", Bv, [
          e("div", Lv, [
            c[16] || (c[16] = e("div", null, [
              e("h2", null, "需要谨慎核对的情况"),
              e("p", null, "可选，用于显示相应安全提醒")
            ], -1)),
            U(F, { name: "shield" })
          ]),
          (o(), a(L, null, J(r, (v) => e("label", {
            key: v,
            class: "vb-check-row"
          }, [
            e("input", {
              type: "checkbox",
              checked: t.flags.includes(v),
              onChange: (g) => d(v, g.target.checked, t.flags)
            }, null, 40, Vv),
            e("span", null, l(v), 1)
          ])), 64)),
          c[17] || (c[17] = e("p", { class: "vb-section-note" }, "勾选孕期或哺乳期后暂停通用目标，需匹配专门参考；其他标记用于提醒核对，不自动调整处方。", -1))
        ])
      ])
    ], 64));
  }
}, Gv = {
  key: 0,
  class: "vb-page-title"
}, Jv = { class: "vb-local-chip" }, Hv = {
  key: 1,
  class: "vb-glass vb-safety-highlight"
}, Wv = { class: "vb-safety-grid" }, Kv = { class: "vb-icon-badge" }, Yv = {
  __name: "SafetyPage",
  props: { flags: Array, embedded: Boolean },
  setup(t) {
    const s = Ee.value ? "登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。" : "游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。", n = [["leaf", "先从食物搭配开始", "营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。"], ["shield", "补充剂需单独核对", "膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。"], ["activity", "估算不是身体检测", "BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。"], ["lock", "账号保存与隐私", "档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。" + s + " 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。"]];
    return (u, i) => (o(), a(L, null, [
      t.embedded ? A("", !0) : (o(), a("div", Gv, [
        i[1] || (i[1] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "了解边界，安心使用"),
          e("h1", null, "安全中心"),
          e("p", null, "把营养信息作为参考，把自己的实际情况放在前面。")
        ], -1)),
        e("span", Jv, [
          U(F, {
            name: "lock",
            size: 15
          }),
          i[0] || (i[0] = P("本地隐私模式", -1))
        ])
      ])),
      t.flags.length ? (o(), a("section", Hv, [
        U(F, {
          name: "shield",
          size: 25
        }),
        e("div", null, [
          i[2] || (i[2] = e("h2", null, "请让专业人员核对个体需求", -1)),
          e("p", null, "你已标记：" + l(t.flags.join("、")) + "。当前通用目标不覆盖这些特殊情况。", 1)
        ])
      ])) : A("", !0),
      e("div", Wv, [
        (o(), a(L, null, J(n, ([r, d, m]) => e("article", {
          key: d,
          class: "vb-glass"
        }, [
          e("span", Kv, [
            U(F, {
              name: r,
              size: 23
            }, null, 8, ["name"])
          ]),
          e("h2", null, l(d), 1),
          e("p", null, l(m), 1)
        ])), 64))
      ]),
      U(Nn)
    ], 64));
  }
}, Xv = {
  key: 0,
  class: "vb-page-title vb-submission-title"
}, Qv = { class: "vb-glass vb-submission-hero" }, Zv = { class: "vb-submission-hero-copy" }, em = { class: "vb-icon-badge" }, tm = {
  class: "vb-submission-stats",
  "aria-label": "食物数据审计概况"
}, nm = {
  class: "vb-submission-path",
  "aria-label": "产品工作流"
}, sm = { class: "vb-submission-step-top" }, om = { class: "vb-icon-badge" }, am = ["onClick"], lm = { class: "vb-submission-columns" }, im = { class: "vb-glass vb-submission-panel" }, rm = { class: "vb-submission-boundary" }, um = { class: "vb-icon-badge" }, dm = { class: "vb-icon-badge" }, cm = { class: "vb-icon-badge" }, vm = { class: "vb-glass vb-submission-panel" }, mm = { class: "vb-inline-note" }, pm = { class: "vb-glass vb-submission-evidence" }, bm = { class: "vb-submission-evidence-actions" }, fm = /* @__PURE__ */ Ye({
  __name: "SubmissionGuidePage",
  props: {
    embedded: { type: Boolean }
  },
  emits: ["navigate"],
  setup(t) {
    const s = {
      foodCount: Qe.length,
      sourcedCount: Qe.filter((u) => !!u.source?.id).length,
      categories: new Set(Qe.map((u) => u.category).filter(Boolean)).size
    }, n = [
      { number: "01", title: "查证食物", copy: "按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。", icon: "search", page: "food", action: "打开食物浏览" },
      { number: "02", title: "生成待确认方案", copy: "Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。", icon: "sparkles", page: "mealplan", action: "打开膳食方案" },
      { number: "03", title: "用户核对并记录", copy: "用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。", icon: "list", page: "diary", action: "打开饮食记录" },
      { number: "04", title: "回看每日分析", copy: "程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。", icon: "report", page: "assessment", action: "查看营养评估" }
    ];
    return (u, i) => (o(), a(L, null, [
      t.embedded ? A("", !0) : (o(), a("div", Xv, [
        i[4] || (i[4] = e("div", null, [
          e("p", { class: "vb-eyebrow" }, "在线评审入口 · 维衡 AI"),
          e("h1", null, "把营养建议放回真实的一餐"),
          e("p", null, "从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。")
        ], -1)),
        e("button", {
          class: "vb-button vb-button-primary",
          onClick: i[0] || (i[0] = (r) => u.$emit("navigate", "mealplan"))
        }, [
          U(F, {
            name: "sparkles",
            size: 17
          }),
          i[3] || (i[3] = P("体验餐食规划 ", -1))
        ])
      ])),
      e("section", Qv, [
        e("div", Zv, [
          e("span", em, [
            U(F, {
              name: "leaf",
              size: 22
            })
          ]),
          i[5] || (i[5] = e("div", null, [
            e("h2", null, "让营养计算有依据，让饮食安排更贴近日常。"),
            e("p", null, "面向全年龄段，以饮食记录和营养摄入计算为核心。记录食物与份量，查看能量、维生素和矿物质的已知合计与参考依据，再结合预算、忌口和偏好安排下一餐。不同年龄按适用条件分析，缺失值不补0。")
          ], -1))
        ]),
        e("div", tm, [
          e("div", null, [
            e("strong", null, l(s.foodCount), 1),
            i[6] || (i[6] = e("span", null, "食物目录条目", -1))
          ]),
          e("div", null, [
            e("strong", null, l(s.sourcedCount), 1),
            i[7] || (i[7] = e("span", null, "有核验来源", -1))
          ]),
          e("div", null, [
            e("strong", null, l(s.categories), 1),
            i[8] || (i[8] = e("span", null, "食物分类", -1))
          ])
        ])
      ]),
      i[18] || (i[18] = e("div", { class: "vb-submission-section-heading" }, [
        e("div", null, [
          e("h2", null, "从检索到回顾")
        ])
      ], -1)),
      e("section", nm, [
        (o(), a(L, null, J(n, (r) => e("article", {
          key: r.number,
          class: "vb-glass vb-submission-step"
        }, [
          e("div", sm, [
            e("span", null, l(r.number), 1),
            e("span", om, [
              U(F, {
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
            P(l(r.action), 1),
            U(F, {
              name: "arrow",
              size: 15
            })
          ], 8, am)
        ])), 64))
      ]),
      e("div", lm, [
        e("section", im, [
          i[12] || (i[12] = e("h2", null, "哪些由程序决定，哪些由 AI 协助", -1)),
          e("div", rm, [
            e("article", null, [
              e("span", um, [
                U(F, { name: "chart" })
              ]),
              i[9] || (i[9] = e("div", null, [
                e("h3", null, "程序与食物库"),
                e("p", null, "食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。")
              ], -1))
            ]),
            e("article", null, [
              e("span", dm, [
                U(F, { name: "sparkles" })
              ]),
              i[10] || (i[10] = e("div", null, [
                e("h3", null, "AI 的工作"),
                e("p", null, "AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。")
              ], -1))
            ]),
            e("article", null, [
              e("span", cm, [
                U(F, { name: "check" })
              ]),
              i[11] || (i[11] = e("div", null, [
                e("h3", null, "用户确认"),
                e("p", null, "餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。")
              ], -1))
            ])
          ])
        ]),
        e("section", vm, [
          i[14] || (i[14] = In('<h2>AI 请求经过服务端，记录保存在当前浏览器</h2><ol class="vb-submission-flow"><li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li><li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li><li><strong>维衡 AI</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li><li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li></ol>', 2)),
          e("p", mm, [
            U(F, {
              name: "info",
              size: 16
            }),
            i[13] || (i[13] = P("AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。", -1))
          ])
        ])
      ]),
      e("section", pm, [
        i[17] || (i[17] = e("div", null, [
          e("h2", null, "数据依据和验证入口"),
          e("p", null, "覆盖率来自仓库内可重复执行的数据审计；接口模拟检查与真实模型调用分开记录，未执行真实调用时不会记作通过。")
        ], -1)),
        e("div", bm, [
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[1] || (i[1] = (r) => u.$emit("navigate", "food"))
          }, [
            U(F, {
              name: "apple",
              size: 16
            }),
            i[15] || (i[15] = P("核对食物来源", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: i[2] || (i[2] = (r) => u.$emit("navigate", "assessment"))
          }, [
            U(F, {
              name: "report",
              size: 16
            }),
            i[16] || (i[16] = P("查看报告样例", -1))
          ])
        ])
      ])
    ], 64));
  }
}), gm = [
  { id: "health-canada-life-stage", title: "Health Canada / NASEM年龄分组参考", version: "2023能量公式及公开RDA/AI表", volume: "能量、维生素和矿物质公开页面", status: "已接入年龄分组公式和部分参考值", scope: "未成年人按年龄/月龄匹配；活动类别近似对应，不作为治疗或婴儿喂养处方", locator: "按年龄段、性别及指标定位；life-stage-references.json保留原始来源链接", units: "能量kcal/天，身高cm、体重kg；营养素g、mg、μg/天", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html", kind: "人群参考量与公式" },
  { id: "schofield", title: "FAO/WHO/UNU Schofield静息能量公式", version: "Human energy requirements公开附录", volume: "按年龄和性别分组的体重公式", status: "已接入分组公式，明确高龄外推限制", scope: "儿童及高龄仅作参考展示；79岁以上沿用60岁以上组，不宣称已在百岁人群验证", locator: "FAO公开章节中的年龄分组系数", units: "kcal/天，体重kg", url: "https://www.fao.org/4/y5686e/y5686e07.htm", kind: "公式估算" },
  { id: "usda-sr28", title: "USDA National Nutrient Database, SR28", version: "2016年5月修订", volume: "ABBREV 数据文件", status: "已接入营养数据", scope: "对应美国样本，每100克可食部；并非中国食堂配方", locator: "原始NDB ID与英文描述逐条保留", units: "kcal、g、mg、μg；维A RAE、叶酸DFE", url: "https://fdc.nal.usda.gov/download-datasets/", kind: "食物营养数据" },
  { id: "china-food-6", title: "中国食物成分表", version: "标准版第6版", volume: "第一册、第二册，后续录入须确认具体册次", status: "书目已核对，正文及成分数据待授权接入", scope: "具体品种、生熟和加工状态，以实际条目为准", locator: "中国营养学会出版介绍；未录入书中页码或数值", units: "接入时保留原始单位与可食部口径", url: "https://www.cnsoc.org/learnnews/711901200.html", kind: "待接入食物数据" },
  { id: "dri-2023", title: "中国居民膳食营养素参考摄入量", version: "2023版", volume: "中国营养学会公开成人参考表", status: "已接入部分成人公开参考值，未接入整本书", scope: "本产品仅用于一般健康成年人的公开参考分组", locator: "官网表9—14、20—23；各指标以代码映射与来源说明为准", units: "按指标区分g、mg、μg及RAE、DFE", url: "https://www.cnsoc.org/drpostand/", kind: "人群参考量" },
  { id: "guidelines-2022", title: "中国居民膳食指南", version: "2022", volume: "中国营养学会公开八条膳食准则", status: "已接入公开原则摘要，未接入整本书及受限图示", scope: "具体人群需使用对应指南；本产品面向全年龄段，按适用条件匹配参考", locator: "官网公开“2022版平衡膳食八准则”", units: "原则说明；未新增未经核对的定量目标", url: "https://dg.cnsoc.org/newslist_0402_1.htm", kind: "膳食搭配原则" },
  { id: "sport-textbook", title: "运动营养学教材", version: "待确认", volume: "作者、出版社、版次和章节均待提供", status: "待明确具体书目与授权资料，未接入", scope: "暂不提供竞技训练或特殊运动的个体化营养处方", locator: "无已核实章节或页码", units: "未接入定量目标", url: null, kind: "待接入运动营养参考" },
  { id: "mifflin", title: "Mifflin–St Jeor 静息能量预测公式", version: "1990原研究；本产品采用简化表达", volume: "原始论文", status: "已接入公式", scope: "原研究对象19—78岁；18岁显示粗略估算提示，未成年人及高龄采用独立的年龄分组参考并说明限制", locator: "PubMed PMID 2305711", units: "kcal/天；输入kg、cm、岁", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/", kind: "公式估算" }
], hm = ["食物多样、合理搭配", "吃动平衡，关注健康体重", "关注蔬果、奶类、全谷和大豆", "鱼禽蛋瘦肉适量搭配", "关注盐、油、糖和饮酒", "规律进餐、足量饮水", "会烹会选，阅读食品标签", "分餐与减少浪费"], ym = [["EAR", "平均需要量", "不能凭单日记录判断个体缺乏。"], ["RNI", "推荐摄入量", "膳食评价和计划的参考，不是补充剂剂量。"], ["AI", "适宜摄入量", "与RNI的制定依据不同，摄入低于AI不直接证明不足。"], ["UL", "可耐受最高摄入量", "是风险边界，不能作为推荐目标。"]], km = {
  class: "vb-glass vb-evidence-panel",
  "aria-labelledby": "reference-title"
}, wm = { class: "vb-reference-list" }, $m = ["href"], _m = {
  key: 1,
  class: "vb-data-note"
}, Am = { class: "vb-reference-terms" }, Cm = {
  __name: "ReferencePanel",
  setup(t) {
    return (s, n) => (o(), a("section", km, [
      n[8] || (n[8] = e("p", { class: "vb-eyebrow" }, "数据依据与适用范围", -1)),
      n[9] || (n[9] = e("h2", { id: "reference-title" }, "每一种依据，都有明确用途", -1)),
      n[10] || (n[10] = e("p", null, "食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。", -1)),
      e("div", wm, [
        (o(!0), a(L, null, J(b(gm), (u) => (o(), a("details", {
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
          u.url ? (o(), a("a", {
            key: 0,
            href: u.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "核对公开来源 ↗", 8, $m)) : (o(), a("p", _m, "等待明确书名、作者、出版社和版本后再核验。"))
        ]))), 128))
      ]),
      e("details", Am, [
        n[4] || (n[4] = e("summary", null, "理解 EAR、RNI、AI 和 UL", -1)),
        (o(!0), a(L, null, J(b(ym), ([u, i, r]) => (o(), a("p", { key: u }, [
          e("strong", null, l(u) + " · " + l(i), 1),
          P("：" + l(r), 1)
        ]))), 128)),
        n[5] || (n[5] = e("p", null, "这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。", -1))
      ]),
      e("details", null, [
        n[6] || (n[6] = e("summary", null, "膳食指南2022公开原则摘要", -1)),
        e("ul", null, [
          (o(!0), a(L, null, J(b(hm), (u) => (o(), a("li", { key: u }, l(u), 1))), 128))
        ]),
        n[7] || (n[7] = e("p", { class: "vb-data-note" }, "文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。", -1))
      ])
    ]));
  }
}, Sm = { class: "vb-page-title" }, Im = { class: "vb-local-chip" }, Em = { "aria-labelledby": "about-project-heading" }, xm = {
  class: "vb-about-safety",
  "aria-labelledby": "about-safety-heading"
}, Um = {
  class: "vb-glass vb-reset-section",
  "aria-labelledby": "about-reset-heading"
}, jm = {
  key: 0,
  role: "alert"
}, Dm = {
  key: 0,
  class: "vb-field-error",
  role: "alert"
}, Nm = { class: "vb-reset-actions" }, Pm = ["disabled"], Mm = ["disabled"], Tm = /* @__PURE__ */ Ye({
  __name: "AboutPage",
  props: {
    flags: {}
  },
  emits: ["navigate"],
  setup(t) {
    const s = D(!1), n = D(!1), u = D("");
    function i() {
      try {
        const d = JSON.parse(Ce.getItem("weiheng.local.v2") || "{}"), m = { format: "weiheng-profile-food-records-v1", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), profile: d.profile || null, records: (Array.isArray(d.records) ? d.records : []).map((g) => ({ date: g.date, entries: g.entries })), scope: "仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天" }, c = URL.createObjectURL(new Blob([JSON.stringify(m, null, 2)], { type: "application/json" })), v = document.createElement("a");
        v.href = c, v.download = "维衡-当前档案与食物记录.json", v.click(), setTimeout(() => URL.revokeObjectURL(c), 1e3);
      } catch {
        u.value = "导出失败，请检查当前浏览器存储权限。";
      }
    }
    async function r() {
      if (!n.value) {
        n.value = !0, u.value = "";
        try {
          await Ss(), window.location.reload();
        } catch {
          u.value = "清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。", n.value = !1;
        }
      }
    }
    return (d, m) => (o(), a(L, null, [
      e("div", Sm, [
        m[5] || (m[5] = e("div", null, [
          e("h1", null, "关于维衡 AI"),
          e("p", null, "维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。")
        ], -1)),
        e("span", Im, [
          m[4] || (m[4] = e("span", { class: "vb-status-dot" }, null, -1)),
          P(l(b(Ee) ? "账号保存 · AI 按需联网" : "游客本地保存 · AI 按需联网"), 1)
        ])
      ]),
      e("section", Em, [
        m[6] || (m[6] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("h2", { id: "about-project-heading" }, "从食物证据到日常建议")
          ])
        ], -1)),
        U(fm, {
          embedded: "",
          onNavigate: m[0] || (m[0] = (c) => d.$emit("navigate", c))
        })
      ]),
      U(Cm),
      e("section", xm, [
        m[7] || (m[7] = e("div", { class: "vb-submission-section-heading vb-about-section-heading" }, [
          e("div", null, [
            e("h2", { id: "about-safety-heading" }, "使用边界与隐私")
          ])
        ], -1)),
        U(Yv, {
          flags: t.flags,
          embedded: ""
        }, null, 8, ["flags"])
      ]),
      e("section", Um, [
        e("div", null, [
          m[8] || (m[8] = e("h2", { id: "about-reset-heading" }, "导出、清除缓存与数据", -1)),
          e("p", null, l(b(Ee) ? "导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。" : "导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。"), 1),
          e("button", {
            class: "vb-text-button",
            onClick: i
          }, "导出档案与食物记录（JSON）"),
          m[9] || (m[9] = e("p", { class: "vb-section-note" }, "重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。", -1)),
          u.value ? (o(), a("p", jm, l(u.value), 1)) : A("", !0)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet vb-reset-button",
          onClick: m[1] || (m[1] = (c) => s.value = !0)
        }, "清空数据并重置")
      ]),
      s.value ? (o(), pe(dt, {
        key: 0,
        title: b(Ee) ? "确认清空当前账号数据？" : "确认清空当前游客数据？",
        onClose: m[3] || (m[3] = (c) => !n.value && (s.value = !1))
      }, {
        default: ut(() => [
          e("p", null, "身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。" + l(b(Ee) ? "同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。" : "") + "重置后需要重新建立档案。", 1),
          m[10] || (m[10] = e("p", null, "仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。", -1)),
          u.value ? (o(), a("p", Dm, l(u.value), 1)) : A("", !0),
          e("div", Nm, [
            e("button", {
              class: "vb-button vb-button-quiet",
              disabled: n.value,
              onClick: m[2] || (m[2] = (c) => s.value = !1)
            }, "取消", 8, Pm),
            e("button", {
              class: "vb-button vb-button-primary",
              disabled: n.value,
              onClick: r
            }, l(n.value ? "正在清理…" : "确认清空并重置"), 9, Mm)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : A("", !0)
    ], 64));
  }
}), Rm = ["data-theme"], zm = ["inert"], Om = { class: "vb-main" }, Fm = { class: "vb-topbar" }, Bm = { class: "vb-breadcrumb" }, Lm = { class: "vb-topbar-actions" }, Vm = { class: "vb-local-chip" }, qm = ["aria-label"], Gm = {
  key: 0,
  class: "vb-storage-error",
  role: "alert"
}, Jm = { class: "vb-footer" }, Hm = {
  key: 4,
  class: "vb-toast",
  role: "status"
}, Qm = {
  __name: "App",
  props: { initialPage: { type: String, default: "overview" }, initialEditor: Boolean },
  setup(t) {
    const { state: s, theme: n, nutrition: u, records: i, storageError: r, updateProfile: d, saveRecord: m, clearDraftAfterSave: c, addToDraft: v, addPlanToDraft: g, toggleHabit: k } = Qt(), { toggleTheme: f } = bs(n), { reports: p, reportStorageError: S, loadReports: h, latestReport: w, isStale: $, generateReport: z } = en();
    h();
    const X = t, R = H(() => s.flags.includes("孕期或哺乳期") ? { ...s.profile, physiologicalStage: "special" } : s.profile || {}), M = D(X.initialPage), V = D(X.initialEditor), T = D(!1), O = D(null), de = D(null), K = D(null), he = D(_e()), ae = D(!1), ie = D(""), Ae = D(""), Q = D(""), B = H(() => p.value.find((ee) => ee.id === Ae.value) || w(ie.value)), j = H(() => s.records.find((ee) => ee.date === ie.value)), q = { overview: "概览", dietAssistant: "维衡AI助手", assessment: "营养分析", mealplan: "膳食方案", diary: "饮食记录", food: "食物浏览", profile: "个人档案", about: "关于" }, I = H(() => Ee.value ? kt.value === "error" ? "账号同步暂不可用 · 本机副本保留" : kt.value === "syncing" || kt.value === "pending" ? "账号数据同步中…" : "邮箱账号 · 服务器保存" : "游客本地保存 · AI 按需联网");
    let x, me = 0;
    function Y(ee, G = null) {
      clearTimeout(x), O.value = { message: ee, undo: G }, x = setTimeout(() => O.value = null, 7e3);
    }
    function C(ee) {
      M.value = ee, window.scrollTo({ top: 0, behavior: "auto" }), Me(() => de.value?.focus({ preventScroll: !0 }));
    }
    function N() {
      V.value = !1, T.value = !0;
    }
    function re() {
      T.value = !1;
    }
    function ue(ee) {
      const G = d(ee);
      if (G) {
        Y(G);
        return;
      }
      V.value = !1, C("overview"), Y(Ee.value ? "身体档案已保存，账号同步状态可在账号面板查看" : "身体档案已保存到当前浏览器");
    }
    async function xe(ee, G = !1) {
      const se = ++me;
      Q.value = "", ie.value = ee.date, Ae.value = "";
      try {
        const ye = z(ee, R.value, { force: G });
        await Me();
        const je = await ye;
        se === me && ie.value === ee.date && (Ae.value = je?.id || "");
      } catch (ye) {
        se === me && (Q.value = ye.message || "分析暂时不可用，请重试。");
      }
    }
    function ct(ee) {
      if (!ae.value) {
        ae.value = !0;
        try {
          const G = m(ee);
          if (!G.ok) {
            Y(G.error);
            return;
          }
          he.value = G.record.date, c(G.record.date, G.record), Y("饮食记录已保存，正在分析"), xe(G.record);
        } finally {
          ae.value = !1;
        }
      }
    }
    function vt(ee, G) {
      G ? p.value.find((ye) => ye.id === G) : w(ee), ie.value = ee, Ae.value = G || "", Q.value = "", s.records.find((ye) => ye.date === ee);
    }
    function Ze(ee = ie.value) {
      const G = s.records.find((se) => se.date === ee);
      G && xe(G, !0);
    }
    function mt(ee) {
      if (!Oe(ee.date) || ee.date > _e() || Number(ee.grams) < 0.1 || Number(ee.grams) > 5e3) {
        Y("请核对日期与食用克数。");
        return;
      }
      const G = v(ee);
      he.value = ee.date, K.value = null, C("diary"), Y(G ? "已加入“本次选择”，核对后保存这一天。" : "已加入当前页面，但本地存储失败，请保留此页。");
    }
    async function pt(ee) {
      const G = Ie();
      try {
        if (await Le(ee.items.map((ye) => ye.foodId)), G !== Ie()) return;
      } catch (ye) {
        ee.onResult?.({ ok: !1, error: ye.message }), Y(ye.message);
        return;
      }
      const se = g(ee);
      if (ee.onResult?.(se), !se.ok) {
        Y(se.error);
        return;
      }
      he.value = ee.date, C("diary"), Y(se.duplicate ? "该方案已加入草稿，不会重复添加。" : "已加入本次选择；实际吃过后核对份量并保存当天记录。");
    }
    function qe(ee) {
      const G = s.records.find((se) => se.date === ee);
      G && (s.records = s.records.filter((se) => se.date !== ee), Y("这条饮食记录已删除，报告快照仍保留。", () => {
        m(G), O.value = null;
      }));
    }
    return We(() => clearTimeout(x)), (ee, G) => (o(), a("div", {
      class: ge(["vb-app", { "is-diary": M.value === "diary", "is-chat": M.value === "dietAssistant" }]),
      "data-theme": b(n)
    }, [
      e("div", {
        inert: V.value || K.value || ie.value || void 0
      }, [
        U(fs, {
          active: M.value,
          onNavigate: C
        }, null, 8, ["active"]),
        e("div", Om, [
          e("header", Fm, [
            e("span", Bm, [
              G[15] || (G[15] = e("span", null, "营养工作台", -1)),
              G[16] || (G[16] = e("i", null, "/", -1)),
              P(l(q[M.value]), 1)
            ]),
            e("div", Lm, [
              e("span", Vm, [
                G[17] || (G[17] = e("i", { class: "vb-status-dot" }, null, -1)),
                P(l(I.value), 1)
              ]),
              e("button", {
                class: "vb-account-trigger",
                onClick: N
              }, l(b(Ee) ? "账号" : "登录"), 1),
              e("button", {
                class: "vb-theme-button",
                "aria-label": b(n) === "light" ? "切换至深色模式" : "切换至浅色模式",
                onClick: G[0] || (G[0] = (...se) => b(f) && b(f)(...se))
              }, [
                U(F, {
                  name: b(n) === "light" ? "moon" : "sun",
                  size: 19
                }, null, 8, ["name"])
              ], 8, qm),
              e("button", {
                class: "vb-avatar",
                "aria-label": "查看个人档案",
                onClick: G[1] || (G[1] = (se) => C("profile"))
              }, [
                U(F, {
                  name: "person",
                  size: 18
                })
              ])
            ])
          ]),
          e("main", {
            ref_key: "content",
            ref: de,
            class: "vb-content",
            tabindex: "-1"
          }, [
            b(r) || b(S) ? (o(), a("p", Gm, l(b(r) || b(S)), 1)) : A("", !0),
            (o(), a(L, { key: 1 }, [
              te(U(Di, {
                active: M.value === "dietAssistant",
                records: b(s).records,
                targets: b(u),
                profile: R.value,
                "initial-date": he.value
              }, null, 8, ["active", "records", "targets", "profile", "initial-date"]), [
                [is, M.value === "dietAssistant"]
              ]),
              M.value === "overview" ? (o(), pe(gs, {
                key: 0,
                profile: R.value,
                nutrition: b(u),
                "record-count": b(i).length,
                records: b(i),
                reports: b(p),
                onEdit: G[2] || (G[2] = (se) => V.value = !0),
                onNavigate: C
              }, null, 8, ["profile", "nutrition", "record-count", "records", "reports"])) : A("", !0),
              M.value === "assessment" ? (o(), pe(wr, {
                key: 1,
                records: b(i),
                habits: b(s).habits,
                flags: b(s).flags,
                reports: b(p),
                profile: R.value,
                onNavigate: C,
                onToggleHabit: b(k),
                onOpenReport: vt,
                onRetryReport: Ze
              }, null, 8, ["records", "habits", "flags", "reports", "profile", "onToggleHabit"])) : M.value === "diary" ? (o(), pe(Yu, {
                key: 2,
                records: b(i),
                reports: b(p),
                profile: R.value,
                nutrition: b(u),
                "initial-date": he.value,
                saving: ae.value,
                onSave: ct,
                onRemove: qe,
                onAnalysis: vt,
                onBrowse: G[3] || (G[3] = (se) => C("food")),
                onDetail: G[4] || (G[4] = (se) => K.value = b(oe)[se])
              }, null, 8, ["records", "reports", "profile", "nutrition", "initial-date", "saving"])) : M.value === "food" ? (o(), pe(sc, {
                key: 3,
                onDetail: G[5] || (G[5] = (se) => K.value = b(oe)[se])
              })) : M.value === "mealplan" ? (o(), pe(xv, {
                key: 4,
                nutrition: b(u),
                preferences: b(s).preferences,
                flags: b(s).flags,
                profile: R.value,
                records: b(s).records,
                onNavigate: C,
                onAddPlan: pt
              }, null, 8, ["nutrition", "preferences", "flags", "profile", "records"])) : M.value === "profile" ? (o(), pe(qv, {
                key: 5,
                profile: R.value,
                nutrition: b(u),
                flags: b(s).flags,
                "onUpdate:flags": G[6] || (G[6] = (se) => b(s).flags = se),
                preferences: b(s).preferences,
                "onUpdate:preferences": G[7] || (G[7] = (se) => b(s).preferences = se),
                onEdit: G[8] || (G[8] = (se) => V.value = !0)
              }, null, 8, ["profile", "nutrition", "flags", "preferences"])) : M.value === "about" ? (o(), pe(Tm, {
                key: 6,
                flags: b(s).flags,
                onNavigate: C
              }, null, 8, ["flags"])) : A("", !0)
            ], 64)),
            e("footer", Jm, [
              U(F, {
                name: "leaf",
                size: 14
              }),
              G[18] || (G[18] = P("维衡 AI · 把健康，放进每一餐", -1)),
              G[19] || (G[19] = e("span", null, "营养信息仅供一般参考 · © 2026 维衡 AI 版权所有", -1))
            ])
          ], 512)
        ])
      ], 8, zm),
      V.value ? (o(), pe(yo, {
        key: 0,
        profile: b(s).profile,
        onComplete: ue,
        onClose: G[9] || (G[9] = (se) => V.value = !1),
        onLogin: N
      }, null, 8, ["profile"])) : A("", !0),
      T.value ? (o(), pe(hs, {
        key: 1,
        onClose: re
      })) : A("", !0),
      K.value ? (o(), pe(pa, {
        key: 2,
        "food-id": K.value.key,
        onClose: G[10] || (G[10] = (se) => K.value = null),
        onAdd: mt
      }, null, 8, ["food-id"])) : A("", !0),
      ie.value ? (o(), pe(Ha, {
        key: 3,
        report: B.value,
        record: j.value,
        stale: B.value ? b($)(B.value, j.value, R.value) : !1,
        error: Q.value,
        onClose: G[11] || (G[11] = (se) => {
          ie.value = "", Ae.value = "";
        }),
        onRetry: G[12] || (G[12] = (se) => Ze())
      }, null, 8, ["report", "record", "stale", "error"])) : A("", !0),
      O.value ? (o(), a("div", Hm, [
        U(F, {
          name: "check",
          size: 17
        }),
        e("span", null, l(O.value.message), 1),
        O.value.undo ? (o(), a("button", {
          key: 0,
          onClick: G[13] || (G[13] = (...se) => O.value.undo && O.value.undo(...se))
        }, "撤销")) : A("", !0),
        e("button", {
          class: "vb-toast-close",
          "aria-label": "关闭通知",
          onClick: G[14] || (G[14] = (se) => O.value = null)
        }, [
          U(F, {
            name: "close",
            size: 15
          })
        ])
      ])) : A("", !0)
    ], 10, Rm));
  }
};
export {
  Qm as default
};
