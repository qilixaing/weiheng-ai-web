import { u as J, b as U, _ as C, d as q, e as F } from "./useThemeTransition-Bj2FN4tp.js";
import { b as h, a as z, i as L } from "./main-DmghEwNS.js";
import { w as M, h as Z, x as G, o as d, l as S, H as K, d as N, i as g, e as t, p as _, t as f, u as T, j as B, r as s, I as Q, J as W, a as X } from "./vue-runtime-wiGxZMXT.js";
async function Y() {
  try {
    const w = await fetch("/content-dist/app-preload.json", { cache: "no-cache" });
    if (!w.ok) return;
    const i = await w.json();
    if (!Array.isArray(i)) return;
    const n = new Set([...document.querySelectorAll('link[rel="modulepreload"]')].map((o) => o.getAttribute("href")));
    for (const o of i) {
      if (typeof o != "string" || !/^\/content-dist\/chunks\/[A-Za-z0-9_-]+\.js$/.test(o) || n.has(o)) continue;
      const r = document.createElement("link");
      r.rel = "modulepreload", r.href = o, document.head.append(r), n.add(o);
    }
  } catch {
  }
}
const ee = ["data-theme"], te = { class: "vb-main" }, ae = { class: "vb-topbar" }, se = { class: "vb-breadcrumb" }, oe = { class: "vb-topbar-actions" }, ne = { class: "vb-local-chip" }, le = ["aria-label"], ie = { class: "vb-content" }, re = {
  key: 0,
  class: "vb-inline-note",
  role: "status"
}, ue = {
  key: 2,
  class: "vb-glass vb-plan-context",
  "aria-busy": "true"
}, ce = { role: "status" }, ve = { class: "vb-footer" }, be = {
  __name: "HomeEntry",
  setup(w) {
    const i = W(null), n = s(!1), o = s({}), r = s(0), u = s("overview"), $ = s(!1), m = s(!1), c = s("light"), k = { overview: "概览", dietAssistant: "维衡AI助手", diary: "饮食记录", mealplan: "膳食方案", assessment: "营养分析", food: "食物浏览", profile: "个人档案", about: "关于" }, v = s(""), A = s(!1), I = s(!1), E = s(!1), { toggleTheme: j } = J(c);
    M(c, (a) => {
      if (n.value)
        try {
          h.setItem("weiheng.theme.v1", a);
        } catch {
        }
    });
    const O = X(() => n.value ? z.value ? "账号数据同步" : "游客本地保存 · AI 按需联网" : "正在连接账号");
    let y = !1, p = 0;
    function P() {
      try {
        const a = JSON.parse(h.getItem("weiheng.local.v2") || h.getItem("vitabalance.v1") || h.getItem("vitabalance.guest.v1") || "{}"), e = a.profile || {}, l = e.sex || e.gender;
        o.value = {
          ...e,
          sex: ["male", "男", "男性"].includes(l) ? "male" : ["female", "女", "女性"].includes(l) ? "female" : "",
          activity: { low: "sedentary", high: "heavy", active: "heavy" }[e.activity] || e.activity,
          ...(a.flags || []).includes("孕期或哺乳期") ? { physiologicalStage: "special" } : {}
        }, r.value = Array.isArray(a.records) ? a.records.length : 0, c.value = h.getItem("weiheng.theme.v1") === "dark" ? "dark" : "light";
      } catch {
        v.value = "本机档案暂时无法读取，已有数据会保留。";
      }
    }
    async function V(a, e) {
      let l;
      try {
        return await Promise.race([a, new Promise((de, H) => {
          l = setTimeout(() => H(new Error("timeout")), e);
        })]);
      } finally {
        clearTimeout(l);
      }
    }
    async function b() {
      if (A.value || i.value) return;
      A.value = !0, v.value = "";
      const a = ++p;
      try {
        if (!n.value) {
          if (await L(), y) return;
          n.value = !0, P(), E.value && (m.value = !0);
        }
        const e = await V(import("./App-2-jFC73Z.js"), 3e4);
        !y && a === p && (i.value = Q(e.default));
      } catch {
        !y && a === p && (v.value = n.value ? "部分功能暂未载入，首页仍可查看。" : "账号连接暂未完成，首页仍可查看，已有数据会保留。");
      } finally {
        a === p && (A.value = !1);
      }
    }
    function x(a) {
      Object.hasOwn(k, a) && (u.value = a, I.value = a !== "overview", b(), window.scrollTo({ top: 0, behavior: "auto" }));
    }
    function R() {
      $.value = !0, I.value = !0, b();
    }
    function D() {
      n.value ? m.value = !0 : (E.value = !0, I.value = !0, b());
    }
    return Z(() => {
      Y(), b();
    }), G(() => {
      y = !0, p++;
    }), (a, e) => i.value && !m.value ? (d(), S(K(i.value), {
      key: 0,
      "initial-page": u.value,
      "initial-editor": $.value
    }, null, 8, ["initial-page", "initial-editor"])) : (d(), N("div", {
      key: 1,
      class: "vb-app",
      "data-theme": c.value
    }, [
      g(U, {
        active: u.value,
        onNavigate: x
      }, null, 8, ["active"]),
      t("div", te, [
        t("header", ae, [
          t("span", se, [
            e[3] || (e[3] = t("span", null, "营养工作台", -1)),
            e[4] || (e[4] = t("i", null, "/", -1)),
            _(f(k[u.value]), 1)
          ]),
          t("div", oe, [
            t("span", ne, [
              e[5] || (e[5] = t("i", { class: "vb-status-dot" }, null, -1)),
              _(f(O.value), 1)
            ]),
            t("button", {
              class: "vb-account-trigger",
              onClick: D
            }, f(T(z) ? "账号" : "登录"), 1),
            t("button", {
              class: "vb-theme-button",
              "aria-label": c.value === "light" ? "切换至深色模式" : "切换至浅色模式",
              onClick: e[0] || (e[0] = (...l) => T(j) && T(j)(...l))
            }, [
              g(C, {
                name: c.value === "light" ? "moon" : "sun",
                size: 19
              }, null, 8, ["name"])
            ], 8, le),
            t("button", {
              class: "vb-avatar",
              "aria-label": "查看个人档案",
              onClick: e[1] || (e[1] = (l) => x("profile"))
            }, [
              g(C, {
                name: "person",
                size: 18
              })
            ])
          ])
        ]),
        t("main", ie, [
          v.value ? (d(), N("p", re, [
            _(f(v.value), 1),
            t("button", {
              class: "vb-text-button",
              onClick: b
            }, "重试")
          ])) : B("", !0),
          u.value === "overview" ? (d(), S(q, {
            key: 1,
            profile: o.value,
            records: [],
            "record-count": r.value,
            "defer-intake": "",
            onNavigate: x,
            onEdit: R
          }, null, 8, ["profile", "record-count"])) : (d(), N("section", ue, [
            t("div", null, [
              t("h1", null, f(k[u.value]), 1),
              t("p", ce, f(v.value ? "请重试加载此页面。" : "正在载入…"), 1)
            ])
          ])),
          t("footer", ve, [
            g(C, {
              name: "leaf",
              size: 14
            }),
            e[6] || (e[6] = _("维衡 AI · 把健康，放进每一餐", -1)),
            e[7] || (e[7] = t("span", null, "营养信息仅供一般参考 · © 2026 维衡 AI 版权所有", -1))
          ])
        ])
      ]),
      m.value ? (d(), S(F, {
        key: 0,
        onClose: e[2] || (e[2] = (l) => m.value = !1)
      })) : B("", !0)
    ], 8, ee));
  }
};
export {
  be as default
};
