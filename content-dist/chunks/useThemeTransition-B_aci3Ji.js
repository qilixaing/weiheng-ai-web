import { a as U, l as ee, e as de, h as te, r as X, g as ne, j as se, k as ve, m as me, n as ge } from "./main-CJWfh114.js";
import { o as u, d as c, F as R, f as V, w as be, s as ie, h as he, x as re, r as N, e, g as Z, i as B, t as i, j as S, u as k, p as b, K as pe, l as ae, n as fe, L as ye, a as F, M as ke, k as le, m as P, N as we, v as W, B as Ae } from "./vue-runtime-wiGxZMXT.js";
const O = [
  { key: "sedentary", label: "久坐", factor: 1.2, detail: "大部分时间坐着，很少运动", icon: "chair" },
  { key: "light", label: "轻度活动", factor: 1.375, detail: "日常走动，每周轻度运动 1–3 天", icon: "walk" },
  { key: "moderate", label: "中度活动", factor: 1.55, detail: "每周中等强度运动 3–5 天", icon: "activity" },
  { key: "heavy", label: "重度活动", factor: 1.725, detail: "体力工作或每周高强度运动 6–7 天", icon: "sun" }
], Me = "https://www.cnsoc.org/drpostand/", Ce = "https://pubmed.ncbi.nlm.nih.gov/2305711/";
function Ee(t) {
  return j(t) ? Number(t) < 18 ? { height: [30, 250], weight: [1, 300] } : { height: [100, 250], weight: [25, 300] } : { height: [30, 250], weight: [1, 300] };
}
const j = (t) => (typeof t == "number" || typeof t == "string" && t.trim() !== "") && Number.isFinite(Number(t)), z = (t) => t != null && !(typeof t == "string" && t.trim() === "");
function _(t) {
  if (!t || typeof t != "object") return "档案格式不正确";
  if (t?.sex !== void 0 && t.sex !== "" && !["male", "female"].includes(t.sex)) return "请选择有效的生理性别";
  if (z(t.age) && (!j(t.age) || !Number.isInteger(Number(t.age)) || Number(t.age) < 0 || Number(t.age) > 120)) return "请输入 0–120 岁的整数年龄";
  if (z(t.physiologicalStage) && !["general", "pregnant", "lactating", "special"].includes(t.physiologicalStage)) return "请选择有效的生理阶段";
  const l = Ee(t.age);
  return z(t.ageMonths) && (!j(t.ageMonths) || !Number.isInteger(Number(t.ageMonths)) || Number(t.ageMonths) < 0 || Number(t.ageMonths) > 11) ? "请输入 0–11 的整数月龄" : z(t.height) && (!j(t.height) || Number(t.height) < l.height[0] || Number(t.height) > l.height[1]) ? `请输入 ${l.height[0]}–${l.height[1]} cm 的身高` : z(t.weight) && (!j(t.weight) || Number(t.weight) < l.weight[0] || Number(t.weight) > l.weight[1]) ? `请输入 ${l.weight[0]}–${l.weight[1]} kg 的体重` : z(t.activity) && !O.some((a) => a.key === t.activity) ? "请选择有效的每日活动水平" : "";
}
function $(t) {
  if (!j(t)) return "年龄未填写";
  const l = Number(t);
  return l < 18 ? "未满 18 岁" : l < 30 ? "18–29 岁" : l < 50 ? "30–49 岁" : l < 65 ? "50–64 岁" : l < 75 ? "65–74 岁" : "75 岁及以上";
}
function ue(t) {
  const l = Number(t?.age), a = t?.sex === "male";
  if (!j(t?.age) || l < 18 || !t?.sex) return { vitamins: [], minerals: [] };
  const n = (m, f, y, M, w = "RNI", I = "") => ({ id: m, name: f, value: y, unit: M, kind: w, note: I }), v = l < 50 ? a ? 770 : 660 : l < 65 ? a ? 750 : 660 : l < 75 ? a ? 730 : 640 : a ? 710 : 600, h = [
    n("a", "维生素 A", v, "μg RAE"),
    n("d", "维生素 D", l >= 65 ? 15 : 10, "μg"),
    n("e", "维生素 E", 14, "mg α-TE", "AI"),
    n("k", "维生素 K", 80, "μg", "AI"),
    n("b1", "维生素 B₁", a ? 1.4 : 1.2, "mg"),
    n("b2", "维生素 B₂", a ? 1.4 : 1.2, "mg"),
    n("b6", "维生素 B₆", l >= 50 ? 1.6 : 1.4, "mg"),
    n("b12", "维生素 B₁₂", 2.4, "μg"),
    n("folate", "叶酸", 400, "μg DFE"),
    n("c", "维生素 C", 100, "mg")
  ], g = a ? 12 : l < 50 ? 18 : l < 65 ? "10 / 18" : 10, d = [
    n("calcium", "钙", 800, "mg"),
    n("iron", "铁", g, "mg", "RNI", !a && l >= 50 && l < 65 ? "50–64 岁女性：无月经 10 mg，有月经 18 mg；不只按年龄推定。" : ""),
    n("zinc", "锌", a ? l < 30 ? 12.5 : 12 : 8.5, "mg"),
    n("magnesium", "镁", l < 30 ? 330 : l < 65 ? 320 : l < 75 ? 310 : 300, "mg"),
    n("potassium", "钾", 2e3, "mg", "AI"),
    n("phosphorus", "磷", l < 30 ? 720 : l < 65 ? 710 : 680, "mg"),
    n("selenium", "硒", 60, "μg"),
    n("iodine", "碘", 120, "μg")
  ];
  return { vitamins: h, minerals: d };
}
function Ie(t) {
  if (t?.physiologicalStage && t.physiologicalStage !== "general" || _(t) || !t.sex || !j(t.age) || !j(t.height) || !j(t.weight) || Number(t.age) < 18 || Number(t.age) > 78) return null;
  const l = Number(t.weight), a = Number(t.height), n = Number(t.age), v = O.find((f) => f.key === t.activity);
  if (!v) return null;
  const h = 10 * l + 6.25 * a - 5 * n + (t.sex === "male" ? 5 : -161), g = h * v.factor, d = n >= 65 ? [20, 25, 55] : [15, 25, 60], m = [
    { id: "protein", name: "蛋白质", percent: d[0], kcalPerGram: 4, color: "sage", foods: "鱼、蛋、肉、奶与豆制品" },
    { id: "fat", name: "脂肪", percent: d[1], kcalPerGram: 9, color: "sand", foods: "坚果、植物油与食物中的脂肪" },
    { id: "carbs", name: "碳水化合物", percent: d[2], kcalPerGram: 4, color: "lilac", foods: "谷物、薯类、水果与杂豆" }
  ].map((f) => ({ ...f, grams: g * f.percent / 100 / f.kcalPerGram }));
  return {
    bmr: h,
    tdee: g,
    activity: v,
    macros: m,
    ...ue(t),
    ageBand: $(n),
    proteinRni: t.sex === "male" ? n >= 65 ? 72 : 65 : n >= 65 ? 62 : 55,
    formulaOutsideStudy: n < 19 || n > 78,
    formulaVersion: "Mifflin-St Jeor / DRIs 2023 adults v1"
  };
}
const xe = ["width", "height"], Se = ["d"], L = {
  __name: "AppIcon",
  props: { name: { type: String, default: "leaf" }, size: { type: [Number, String], default: 20 } },
  setup(t) {
    const l = {
      paperclip: ["m8 12 6-6a3 3 0 0 1 4 4l-8 8a5 5 0 0 1-7-7l9-9m-7 12 7-7a1 1 0 0 1 2 2l-7 7"],
      report: ["M5 3h10l4 4v14H5V3ZM14 3v5h5M8 12h8m-8 4h6"],
      sparkles: ["m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"],
      grid: ["M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"],
      chart: ["M4 20V10m8 10V4m8 16v-7M2 20h20"],
      bowl: ["M3 11h18c0 6-4 9-9 9s-9-3-9-9ZM8 4v3m4-5v5m4-3v3"],
      list: ["M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01"],
      person: ["M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2"],
      shield: ["m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z", "m8 12 3 3 5-6"],
      sun: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"],
      moon: ["M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"],
      arrow: ["M4 12h16m-6-6 6 6-6 6"],
      chevron: ["m9 5 7 7-7 7"],
      back: ["M20 12H4m6-6-6 6 6 6"],
      check: ["m5 12 4 4L19 6"],
      plus: ["M12 5v14M5 12h14"],
      close: ["m6 6 12 12M6 18 18 6"],
      edit: ["m15 4 5 5M4 20l5-1L21 7a2.1 2.1 0 0 0-4-4L5 15l-1 5Z"],
      leaf: ["M20 3C8 2 3 7 4 14c1 5 7 6 11 2 4-4 5-13 5-13ZM4 21l12-13"],
      flame: ["M12 2c1 5-6 6-6 12a6 6 0 0 0 12 0c0-3-2-5-3-6 0 3-2 4-3 4 2-5 0-10 0-10Z"],
      activity: ["M2 12h5l3-8 4 16 3-8h5"],
      chair: ["M7 4v8h10V4M5 12v5h14v-5M7 17v4m10-4v4"],
      walk: ["M15 4h.01M12 8l-3 5H5m7-5 4 5h4M12 8l-1 8-5 5m5-5 6 5"],
      drop: ["M12 3s7 8 7 12a7 7 0 0 1-14 0c0-4 7-12 7-12Z"],
      grain: ["M12 22V3M12 8C6 9 4 6 4 3c5-1 8 1 8 5Zm0 7c-6 1-8-2-8-5 5-1 8 1 8 5Zm0-5c6 1 8-2 8-5-5-1-8 1-8 5Zm0 7c6 1 8-2 8-5-5-1-8 1-8 5Z"],
      apple: ["M12 7c-7-4-11 1-8 8 2 6 5 6 8 4 3 2 6 2 8-4 3-7-1-12-8-8ZM12 7c0-4 3-5 5-4"],
      milk: ["M8 3h8v4l3 4v10H5V11l3-4V3Zm0 4h8M5 12h14"],
      egg: ["M12 3c-3 0-7 8-7 12a7 7 0 0 0 14 0c0-4-4-12-7-12Z"],
      fish: ["M18 12c-3-7-11-7-15 0 4 7 12 7 15 0Zm0 0 4-5v10l-4-5ZM7 11h.01"],
      cookie: ["M20 12a5 5 0 0 1-7-8A9 9 0 1 0 20 12ZM8 9h.01M7 15h.01M13 16h.01"],
      search: ["M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1 5 6 6"],
      calendar: ["M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2ZM7 2v6m10-6v6M3 11h18"],
      info: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 11v6m0-10h.01"],
      lock: ["M6 10h12v11H6V10Zm2 0V6a4 4 0 0 1 8 0v4m-4 5v2"],
      camera: ["M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10H2V9a2 2 0 0 1 2-2Zm8 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"],
      upload: ["M12 16V4m-5 5 5-5 5 5M4 15v5h16v-5"],
      image: ["M4 4h16v16H4zM4 15l4-4 4 4 3-3 5 5M15 9h.01"]
    };
    return (a, n) => (u(), c("svg", {
      width: t.size,
      height: t.size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.6",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [
      (u(!0), c(R, null, V(l[t.name] || l.leaf, (v, h) => (u(), c("path", {
        key: h,
        d: v
      }, null, 8, Se))), 128))
    ], 8, xe));
  }
}, Ne = "data:image/png;base64,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";
function Re(t) {
  const l = N(null), a = N(null), n = N(!1);
  let v = null, h = null, g = 0, d, m, f = !1;
  function y(w = !1) {
    const I = l.value, E = a.value;
    if (!I || !E) return;
    if (!d.matches) {
      v?.cancel(), v = null, n.value = !1;
      return;
    }
    const p = I.querySelector(".vb-nav-button.is-active");
    if (!p) {
      n.value = !1;
      return;
    }
    const s = I.getBoundingClientRect(), r = p.getBoundingClientRect(), D = n.value ? E.getBoundingClientRect() : r;
    v?.cancel(), v = null;
    const K = r.top - s.top + I.scrollTop, x = r.left - s.left, H = D.top - s.top + I.scrollTop, q = D.height, Q = r.height, J = K - H;
    E.style.width = r.width + "px", E.style.height = Q + "px", E.style.left = x + "px", E.style.borderRadius = getComputedStyle(p).borderRadius, E.style.transform = `translate3d(0,${K}px,0)`;
    const Y = n.value;
    if (n.value = !0, !w || !Y || m.matches || Math.abs(J) < 0.5 || typeof E.animate != "function") return;
    const A = 1 + Math.min(10, Math.abs(J) * 0.065) / Q, o = Math.sign(J) * Math.min(3, Math.abs(J) * 0.018);
    v = E.animate([
      { transform: `translate3d(0,${H}px,0) scale(1,${q / Q})`, offset: 0 },
      { transform: `translate3d(0,${H + J * 0.55}px,0) scale(.982,${A})`, borderRadius: "17px / 21px", offset: 0.43 },
      { transform: `translate3d(0,${K + o}px,0) scale(1.006,.975)`, offset: 0.82 },
      { transform: `translate3d(0,${K}px,0) scale(1,1)`, borderRadius: E.style.borderRadius, offset: 1 }
    ], { duration: 380, easing: "cubic-bezier(.22,.68,.3,1)", fill: "none" }), v.finished.catch(() => {
    });
  }
  function M() {
    cancelAnimationFrame(g), g = requestAnimationFrame(() => y(!1));
  }
  return be(t, async () => {
    await ie(), f || y(!0);
  }, { flush: "post" }), he(() => {
    if (d = matchMedia("(min-width:761px)"), m = matchMedia("(prefers-reduced-motion: reduce)"), d.addEventListener("change", M), m.addEventListener("change", M), typeof ResizeObserver < "u") {
      h = new ResizeObserver(M), h.observe(l.value);
      for (const w of l.value.querySelectorAll(".vb-nav-button")) h.observe(w);
    }
    window.addEventListener("resize", M), y(!1), document.fonts?.ready.then(() => {
      f || M();
    });
  }), re(() => {
    f = !0, v?.cancel(), cancelAnimationFrame(g), h?.disconnect(), d?.removeEventListener("change", M), m?.removeEventListener("change", M), window.removeEventListener("resize", M);
  }), { navRoot: l, highlight: a, liquidReady: n };
}
const De = { class: "vb-sidebar" }, Be = ["aria-current", "onClick"], Le = {
  key: 0,
  class: "vb-nav-marker"
}, Ke = { class: "vb-sidebar-bottom" }, gn = {
  __name: "AppSidebar",
  props: { active: String },
  emits: ["navigate"],
  setup(t) {
    const l = t, { navRoot: a, highlight: n, liquidReady: v } = Re(pe(l, "active")), h = [
      ["overview", "概览", "grid"],
      ["dietAssistant", "维衡AI助手", "sparkles"],
      ["diary", "饮食记录", "list"],
      ["mealplan", "膳食方案", "bowl"],
      ["assessment", "营养分析", "chart"],
      ["food", "食物浏览", "apple"],
      ["profile", "个人档案", "person"],
      ["about", "关于", "info"]
    ];
    return (g, d) => (u(), c("aside", De, [
      e("button", {
        class: "vb-brand",
        "aria-label": "维衡 AI 概览",
        onClick: d[0] || (d[0] = (m) => g.$emit("navigate", "overview"))
      }, [...d[1] || (d[1] = [
        e("span", { class: "vb-brand-logo" }, [
          e("img", {
            src: Ne,
            alt: ""
          })
        ], -1),
        e("span", null, [
          e("strong", null, "维衡 AI"),
          e("small", null, "让每一餐，更有把握")
        ], -1)
      ])]),
      d[3] || (d[3] = e("p", { class: "vb-nav-caption" }, "我的营养工作台", -1)),
      e("nav", {
        ref_key: "navRoot",
        ref: a,
        class: Z({ "has-liquid-highlight": k(v) }),
        "aria-label": "主导航"
      }, [
        e("span", {
          ref_key: "highlight",
          ref: n,
          class: "vb-nav-liquid",
          "aria-hidden": "true"
        }, null, 512),
        (u(), c(R, null, V(h, ([m, f, y]) => e("button", {
          key: m,
          class: Z(["vb-nav-button", { "is-active": t.active === m }]),
          "aria-current": t.active === m ? "page" : void 0,
          onClick: (M) => g.$emit("navigate", m)
        }, [
          B(L, { name: y }, null, 8, ["name"]),
          e("span", null, i(f), 1),
          t.active === m ? (u(), c("span", Le)) : S("", !0)
        ], 10, Be)), 64))
      ], 2),
      e("div", Ke, [
        B(L, {
          name: "lock",
          size: 17
        }),
        e("span", null, [
          b(i(k(U) ? "账号数据同步" : "游客本地保存"), 1),
          e("small", null, i(k(U) ? "文字聊天、档案与记录按账号保存" : "登录可同步文字聊天、档案与记录"), 1)
        ]),
        d[2] || (d[2] = e("i", null, null, -1))
      ])
    ]));
  }
}, je = [{ band: "0–6 mo", vitamins: [400, 10, 4, 2, 0.2, 0.3, 0.1, 0.4, 65, 40], minerals: [200, 0.27, 2, 30, 400, 100, 15, 110] }, { band: "7–12 mo", vitamins: [500, 10, 5, 2.5, 0.3, 0.4, 0.3, 0.5, 80, 50], minerals: [260, 11, 3, 75, 860, 275, 20, 130] }, { band: "1–3 y", vitamins: [300, 15, 6, 30, 0.5, 0.5, 0.5, 0.9, 150, 15], minerals: [700, 7, 3, 80, 2e3, 460, 20, 90] }, { band: "4–8 y", vitamins: [400, 15, 7, 55, 0.6, 0.6, 0.6, 1.2, 200, 25], minerals: [1e3, 10, 5, 130, 2300, 500, 30, 90] }, { band: "9–13 y", vitamins: [600, 15, 11, 60, 0.9, 0.9, 1, 1.8, 300, 45], minerals: [1300, 8, 8, 240, 2500, 1250, 40, 120] }, { band: "14–18 y", vitamins: [900, 15, 15, 75, 1.2, 1.3, 1.3, 2.4, 400, 75], minerals: [1300, 11, 11, 410, 3e3, 1250, 55, 150] }, { band: "9–13 y", vitamins: [600, 15, 11, 60, 0.9, 0.9, 1, 1.8, 300, 45], minerals: [1300, 8, 8, 240, 2300, 1250, 40, 120] }, { band: "14–18 y", vitamins: [700, 15, 15, 75, 1, 1, 1.2, 2.4, 400, 65], minerals: [1300, 15, 9, 360, 2300, 1250, 55, 150] }], G = {
  rows: je
}, Ve = "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/equations-estimate-energy-requirement.html", Te = "https://www.fao.org/4/y5686e/y5686e07.htm", T = (t) => t !== "" && t != null && Number.isFinite(Number(t)), Je = [["a", "维生素 A", "μg RAE"], ["d", "维生素 D", "μg"], ["e", "维生素 E", "mg α-TE"], ["k", "维生素 K", "μg"], ["b1", "维生素 B₁", "mg"], ["b2", "维生素 B₂", "mg"], ["b6", "维生素 B₆", "mg"], ["b12", "维生素 B₁₂", "μg"], ["folate", "叶酸", "μg DFE"], ["c", "维生素 C", "mg"]], Fe = [["calcium", "钙", "mg"], ["iron", "铁", "mg"], ["zinc", "锌", "mg"], ["magnesium", "镁", "mg"], ["potassium", "钾", "mg"], ["phosphorus", "磷", "mg"], ["selenium", "硒", "μg"], ["iodine", "碘", "μg"]];
function ce(t) {
  if (!T(t?.age) || !["male", "female"].includes(t.sex)) return { vitamins: [], minerals: [] };
  if (_(t) || t.physiologicalStage && t.physiologicalStage !== "general") return { vitamins: [], minerals: [] };
  const l = Number(t.age), a = t.ageMonths;
  if (l === 0 && !T(a)) return { vitamins: [], minerals: [] };
  if (l >= 18) return ue(t);
  const n = l === 0 && !T(a), v = l === 0 ? Number(a) >= 6 ? 1 : 0 : l < 4 ? 2 : l < 9 ? 3 : l < 14 ? t.sex === "male" ? 4 : 6 : t.sex === "male" ? 5 : 7, h = G.rows[v], g = (d, m) => m.map(([f, y, M], w) => ({
    id: f,
    name: y,
    unit: M,
    value: n ? `0–<6月 ${G.rows[0][d][w]}；6–<12月 ${G.rows[1][d][w]}` : h[d][w],
    kind: n ? "AI / RDA" : l === 0 ? v === 0 || d === "vitamins" || ["calcium", "magnesium", "potassium", "phosphorus", "selenium", "iodine"].includes(f) ? "AI" : "RDA" : ["e", "k", "potassium"].includes(f) ? f === "e" ? "RDA" : "AI" : "RDA",
    note: "Health Canada / NASEM 膳食参考量；不是中国 DRIs 表，也不是补充剂剂量。"
  }));
  return { vitamins: g("vitamins", Je), minerals: g("minerals", Fe) };
}
function Ue(t, l, a) {
  const [n, v] = t < 3 ? l ? [59.512, -30.4] : [58.317, -31.1] : t < 10 ? l ? [22.706, 504.3] : [20.315, 485.9] : t < 18 ? l ? [17.686, 658.2] : [13.384, 692.6] : l ? [11.711, 587.7] : [9.082, 658.5];
  return n * a + v;
}
function oe(t, l, a, n, v, h) {
  const g = t === 0 ? h / 12 : t;
  if (t < 3) {
    const y = t === 0 ? h < 3 ? l ? 200 : 180 : h < 6 ? l ? 50 : 60 : 20 : l ? 20 : 15;
    return l ? -716.45 - g + 17.82 * a + 15.06 * n + y : -69.15 + 80 * g + 2.65 * a + 54.15 * n + y;
  }
  const d = O.findIndex((y) => y.key === v), m = (l ? [[-447.51, 3.68, 13.01, 13.15], [19.12, 3.68, 8.62, 20.28], [-388.19, 3.68, 12.66, 20.46], [-671.75, 3.68, 15.38, 23.25]] : [[55.59, -22.25, 8.43, 17.07], [-297.54, -22.25, 12.77, 14.73], [-189.55, -22.25, 11.74, 18.34], [-709.59, -22.25, 18.22, 14.25]])[d], f = t < 4 ? l ? 20 : 15 : t < 9 ? 15 : t < 14 ? l ? 25 : 30 : 20;
  return m[0] + m[1] * g + m[2] * a + m[3] * n + f;
}
function Ze(t) {
  if (!t || t.physiologicalStage && t.physiologicalStage !== "general" || Number(t.age) === 0 && !T(t.ageMonths)) return null;
  const l = Ie(t);
  if (l) return { ...l, bmrLabel: "Mifflin–St Jeor 公式", energyLabel: "TDEE", microSource: "中国 DRIs 2023", macroNote: `供能占比合计 100% · 蛋白质 DRIs RNI ${l.proteinRni} g/天作为独立参考。` };
  if (_(t) || !t?.sex || !T(t.age) || !T(t.height) || !T(t.weight)) return null;
  const a = Number(t.age), n = t.sex === "male", v = Number(t.weight), h = Number(t.height), g = O.find((s) => s.key === t.activity);
  if (!g && a >= 3) return null;
  const d = Ue(a, n, v), m = a === 0, f = m && !T(t.ageMonths), y = f ? Array.from({ length: 12 }, (s, r) => oe(a, n, h, v, t.activity, r)) : null, M = f ? null : a < 18 ? oe(a, n, h, v, t.activity, Number(t.ageMonths)) : d * g.factor;
  if (d <= 0 || M != null && M <= 0 || y && y.some((s) => s <= 0)) return null;
  const w = a < 4 ? [15, 35, 50] : a < 18 ? [15, 30, 55] : [20, 25, 55], I = [["protein", "蛋白质", 4, "sage"], ["fat", "脂肪", 9, "sand"], ["carbs", "碳水化合物", 4, "lilac"]], E = Number(t.ageMonths) >= 6 ? [11, 30, 95] : [9.1, 31, 60], p = I.map(([s, r, D, K], x) => ({ id: s, name: r, kcalPerGram: D, color: K, percent: m ? null : w[x], grams: m ? f ? ["9.1–11", "30–31", "60–95"][x] : E[x] : M * w[x] / 100 / D, foods: m ? "年龄段膳食参考量，包含乳汁与辅食；不用于配奶。" : "按年龄段 AMDR 内示例比例换算，非个体处方。" }));
  return {
    bmr: d,
    tdee: M,
    energyRange: y ? [Math.min(...y), Math.max(...y)] : null,
    activity: g,
    macros: p,
    ...ce(t),
    referenceOnly: !0,
    bmrLabel: "Schofield 年龄分组公式",
    energyLabel: a < 18 ? "EER" : "TDEE",
    microSource: a < 18 ? "Health Canada / NASEM RDA、AI" : "中国 DRIs 2023",
    energyBasis: a < 18 ? "Health Canada 2023 年龄分组能量公式（包含生长需求）" : `Schofield 60岁及以上组 × ${g.factor}；高龄外推估算`,
    macroNote: m ? "婴儿显示各阶段 AI / RDA 表值，不按成人供能比换算；各范围不是同一个月龄的配餐组合。" : `供能示例：蛋白质 ${w[0]}% / 脂肪 ${w[1]}% / 碳水 ${w[2]}%。`,
    notice: m ? f ? "0岁跨越多个生长阶段：显示月龄范围，请补充月龄。婴儿喂养由监护人与儿科专业人员确认，不用于配奶或喂养处方。" : "婴儿估算只用于认识参考范围，不用于配奶、早产儿或疾病喂养处方。" : a < 18 ? "儿童与青少年使用生长阶段公式；活动分组为近似对应。请结合生长曲线由监护人和专业人员确认，不用于限制热量或成人减重。" : "超过78岁使用60岁及以上组作粗略外推，不代表已在百岁人群验证；实际需要应由专业人员结合健康状况评估。"
  };
}
const ze = { class: "vb-sources" }, He = ["href"], Qe = ["href"], Pe = ["href"], Oe = ["href"], qe = {
  __name: "SourcesNote",
  setup(t) {
    return (l, a) => (u(), c("details", ze, [
      a[13] || (a[13] = e("summary", null, [
        b("计算依据与适用范围"),
        e("span", null, "查看来源与说明")
      ], -1)),
      e("div", null, [
        e("p", null, [
          a[0] || (a[0] = b("18–78岁采用 ", -1)),
          e("a", {
            href: k(Ce),
            target: "_blank",
            rel: "noopener noreferrer"
          }, "Mifflin–St Jeor 公式", 8, He),
          a[1] || (a[1] = b("：10 × 体重(kg) + 6.25 × 身高(cm) − 5 × 年龄 + 性别常数（男性 +5，女性 −161）。该公式预测静息能量消耗，页面沿用“BMR”通用称呼；原研究对象为 19–78 岁成人，18岁标注范围外估算。", -1))
        ]),
        e("p", null, [
          a[2] || (a[2] = b("未满18岁及79–120岁的基础代谢卡片使用", -1)),
          e("a", {
            href: k(Te),
            target: "_blank",
            rel: "noopener noreferrer"
          }, "FAO表5.2的Schofield年龄分组公式", 8, Qe),
          a[3] || (a[3] = b("。79岁以上沿用60岁及以上组，属于粗略外推，不能宣称已在百岁人群验证。", -1))
        ]),
        e("p", null, [
          a[4] || (a[4] = b("未满18岁的每日能量使用", -1)),
          e("a", {
            href: k(Ve),
            target: "_blank",
            rel: "noopener noreferrer"
          }, "Health Canada公布的2023年EER分组公式", 8, Pe),
          a[5] || (a[5] = b("，包含生长能量；活动分组为用户选项的近似对应。0岁未填月龄时保持未知，补充0–11个月月龄后再匹配，不选取虚构的默认月龄；这不是配奶或婴幼儿喂养处方。", -1))
        ]),
        a[8] || (a[8] = e("p", null, "TDEE = 未四舍五入的 BMR × 活动系数。系数为常用活动估算模型：久坐 1.2、轻度 1.375、中度 1.55、重度 1.725，不能与 DRIs 能量表中的 PAL 等同。", -1)),
        a[9] || (a[9] = e("p", null, "宏量营养素采用成年 AMDR 范围内的示例方案：18–64 岁 15% / 25% / 60%，65 岁及以上 20% / 25% / 55%（蛋白质 / 脂肪 / 碳水）。按 4 / 9 / 4 kcal/g 换算；它不是 DRIs 蛋白质固定 RNI，也不代表唯一最佳比例。", -1)),
        e("p", null, [
          a[6] || (a[6] = b("微量营养素核对自", -1)),
          e("a", {
            href: k(Me),
            target: "_blank",
            rel: "noopener noreferrer"
          }, "中国营养学会 DRIs 2023 成人表", 8, Oe),
          a[7] || (a[7] = b("（表 9–14、20–23）。RNI 为推荐摄入量，AI 为适宜摄入量；均指膳食参考量，不能直接作为补充剂剂量。未列出的营养素不代表不重要。", -1))
        ]),
        a[10] || (a[10] = e("p", null, "未满18岁的微量营养素另取Health Canada公开的RDA/AI年龄表，来源与中国成人DRIs分开标注。1–3岁采用15/35/50、4–17岁采用15/30/55的AMDR内供能示例。婴儿蛋白质、脂肪、碳水直接显示年龄段AI/RDA表值，不拼成成人100%供能方案；表中的ND不转为0。", -1)),
        a[11] || (a[11] = e("p", null, "所有值用于一般健康人群的饮食认识，不覆盖孕哺期、疾病治疗、早产儿及竞技训练等特殊需求。儿童和高龄参考卡片不作为自动配餐或AI个体营养诊断目标；微量营养素不按体重线性缩放。", -1)),
        a[12] || (a[12] = e("p", null, "食物营养数据与人群参考量是两类来源。现有USDA条目保留原始编号，未声称来自《中国食物成分表》。参考书目、已接入范围及待补资料可在“关于”查看。EAR、RNI、AI不代表诊断阈值，UL不能作为推荐目标。", -1))
      ])
    ]));
  }
}, Ye = { class: "vb-page-title" }, Xe = { class: "vb-eyebrow" }, We = { class: "vb-page-actions" }, Ge = {
  key: 1,
  class: "vb-glass vb-plan-context"
}, $e = {
  class: "vb-glass vb-profile-strip",
  "aria-label": "基础档案"
}, _e = { class: "vb-profile-symbol" }, et = { class: "vb-profile-title" }, tt = { class: "vb-energy-grid" }, nt = { class: "vb-glass vb-energy-card" }, st = { class: "vb-card-label" }, at = { class: "vb-icon-badge" }, lt = { class: "vb-energy-number" }, ot = { class: "vb-card-bottom" }, it = { key: 1 }, rt = { class: "vb-glass vb-energy-card vb-energy-featured" }, ut = { class: "vb-card-label" }, ct = { class: "vb-icon-badge" }, dt = { class: "vb-energy-number" }, vt = { class: "vb-card-bottom" }, mt = { class: "vb-pill" }, gt = { key: 1 }, bt = {
  key: 2,
  class: "vb-inline-note",
  role: "note"
}, ht = {
  key: 3,
  class: "vb-inline-note"
}, pt = { class: "vb-glass vb-macro-section" }, ft = { class: "vb-section-heading" }, yt = { class: "vb-macro-grid" }, kt = { class: "vb-macro-top" }, wt = { class: "vb-macro-percent" }, At = { class: "vb-macro-top" }, Mt = {
  key: 0,
  class: "vb-macro-strip",
  "aria-hidden": "true"
}, Ct = { class: "vb-section-note" }, Et = { class: "vb-section-heading vb-micro-heading" }, It = {
  key: 4,
  class: "vb-micro-grid"
}, xt = { class: "vb-section-heading" }, St = { class: "vb-pill" }, Nt = { class: "vb-sr-only" }, Rt = { scope: "row" }, Dt = { key: 0 }, Bt = { class: "vb-reference-kind" }, Lt = {
  key: 5,
  class: "vb-micro-grid"
}, Kt = { class: "vb-section-heading" }, jt = {
  key: 6,
  class: "vb-glass vb-plan-context"
}, Vt = { class: "vb-glass vb-record-prompt" }, Tt = { class: "vb-icon-badge" }, bn = {
  __name: "OverviewPage",
  props: { profile: Object, nutrition: Object, recordCount: Number, records: Array, deferIntake: Boolean },
  emits: ["edit", "navigate"],
  setup(t) {
    const l = ye(() => import("./IntakeAnalysis-BA7b6Mgu.js").then((p) => p.I)), a = t, n = F(() => Ze(a.profile)), v = F(() => ce(a.profile)), h = F(() => v.value.vitamins.length > 0), g = F(() => O.find((p) => p.key === a.profile.activity)), d = F(() => [
      !a.profile.sex && "性别",
      (a.profile.age == null || a.profile.age === "") && "年龄",
      (a.profile.height == null || a.profile.height === "") && "身高",
      (a.profile.weight == null || a.profile.weight === "") && "体重",
      !g.value && "活动水平"
    ].filter(Boolean).join("、")), m = F(() => a.profile?.physiologicalStage && a.profile.physiologicalStage !== "general" ? "孕期、哺乳期或其他特殊情况需匹配专门参考，暂不套用通用目标。" : Number(a.profile?.age) === 0 && (a.profile?.ageMonths == null || a.profile.ageMonths === "") ? "请补充0–11个月月龄后匹配参考；婴儿不使用成人目标。" : `补充${d.value || "有效的身体档案"}后显示能量估算。未填写的数据保持未知，不按 0 计算。`), f = [
      { id: "protein", name: "蛋白质", color: "sage" },
      { id: "fat", name: "脂肪", color: "sand" },
      { id: "carbohydrate", name: "碳水化合物", color: "lilac" }
    ], y = [["vitamins", "维生素", "leaf"], ["minerals", "矿物质", "drop"]], M = (p) => new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }).format(p), w = (p) => typeof p == "string" ? p : new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 }).format(p), I = (p, s) => p == null || p === "" ? "未填写" : `${p} ${s}`, E = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(/* @__PURE__ */ new Date());
    return (p, s) => (u(), c(R, null, [
      e("div", Ye, [
        e("div", null, [
          e("p", Xe, i(k(E)), 1),
          s[6] || (s[6] = e("h1", null, "你的营养工作台", -1)),
          s[7] || (s[7] = e("p", null, "记录饮食，计算能量与营养素摄入，理解依据，再安排下一餐。面向全年龄段，按适用条件分析。", -1))
        ]),
        e("div", We, [
          e("button", {
            class: "vb-button vb-button-primary",
            onClick: s[0] || (s[0] = (r) => p.$emit("navigate", "diary"))
          }, [
            B(L, {
              name: "plus",
              size: 17
            }),
            s[8] || (s[8] = b("记录饮食", -1))
          ]),
          e("button", {
            class: "vb-button vb-button-soft",
            onClick: s[1] || (s[1] = (r) => p.$emit("navigate", "assessment"))
          }, "查看营养分析"),
          e("button", {
            class: "vb-button vb-button-quiet",
            onClick: s[2] || (s[2] = (r) => p.$emit("navigate", "mealplan"))
          }, "安排下一餐")
        ])
      ]),
      t.deferIntake ? (u(), c("section", Ge, [...s[9] || (s[9] = [
        e("div", null, [
          e("h2", null, "已记录的营养摄入"),
          e("p", null, "摄入明细按需载入；你的档案和饮食记录会保留。")
        ], -1)
      ])])) : (u(), ae(k(l), {
        key: 0,
        records: t.records,
        profile: t.profile,
        compact: ""
      }, null, 8, ["records", "profile"])),
      e("section", $e, [
        e("span", _e, i(t.profile.sex === "male" ? "♂" : t.profile.sex === "female" ? "♀" : "○"), 1),
        e("div", et, [
          s[10] || (s[10] = e("strong", null, "你的身体档案", -1)),
          e("small", null, i(t.profile.sex === "male" ? "男性" : t.profile.sex === "female" ? "女性" : "性别未填写") + " · " + i(k($)(t.profile.age)), 1)
        ]),
        e("dl", null, [
          e("div", null, [
            s[11] || (s[11] = e("dt", null, "年龄", -1)),
            e("dd", null, i(I(t.profile.age, "岁")), 1)
          ]),
          e("div", null, [
            s[12] || (s[12] = e("dt", null, "身高", -1)),
            e("dd", null, i(I(t.profile.height, "cm")), 1)
          ]),
          e("div", null, [
            s[13] || (s[13] = e("dt", null, "体重", -1)),
            e("dd", null, i(I(t.profile.weight, "kg")), 1)
          ]),
          e("div", null, [
            s[14] || (s[14] = e("dt", null, "活动水平", -1)),
            e("dd", null, i(g.value?.label || "未填写"), 1)
          ])
        ]),
        e("button", {
          class: "vb-icon-button",
          "aria-label": "修改基础档案",
          onClick: s[3] || (s[3] = (r) => p.$emit("edit"))
        }, [
          B(L, {
            name: "edit",
            size: 18
          })
        ])
      ]),
      e("div", tt, [
        e("section", nt, [
          e("div", st, [
            s[15] || (s[15] = e("span", null, [
              b("基础代谢 "),
              e("small", null, "BMR")
            ], -1)),
            e("span", at, [
              B(L, { name: "flame" })
            ])
          ]),
          e("div", lt, [
            b(i(n.value ? M(n.value.bmr) : "—"), 1),
            s[16] || (s[16] = e("span", null, "kcal / 天", -1))
          ]),
          e("p", null, i(n.value ? "身体静息时维持基本功能的能量估算" : m.value), 1),
          e("div", ot, [
            n.value ? (u(), c(R, { key: 0 }, [
              s[17] || (s[17] = e("span", { class: "vb-status-dot" }, null, -1)),
              b(i(n.value.bmrLabel), 1)
            ], 64)) : (u(), c("span", it, "身体信息保留；不以 0 代替未知值"))
          ])
        ]),
        e("section", rt, [
          e("div", ut, [
            e("span", null, [
              s[18] || (s[18] = b("每日能量需求 ", -1)),
              e("small", null, i(n.value ? n.value.referenceOnly ? "年龄组参考" : "个人估算" : "TDEE / EER"), 1)
            ]),
            e("span", ct, [
              B(L, { name: "activity" })
            ])
          ]),
          e("div", dt, [
            b(i(n.value?.energyRange ? n.value.energyRange.map(M).join("–") : n.value ? M(n.value.tdee) : "—"), 1),
            s[19] || (s[19] = e("span", null, "kcal / 天", -1))
          ]),
          e("p", null, i(n.value ? n.value.referenceOnly ? "按生长阶段或年龄分组的参考估算" : "维持当前体重的每日总能量消耗估算" : m.value), 1),
          e("div", vt, [
            n.value ? (u(), c(R, { key: 0 }, [
              e("span", null, i(n.value.energyBasis || `基础代谢 × ${n.value.activity.factor}`), 1),
              e("span", mt, i(n.value.activity?.label || "按月龄分组"), 1)
            ], 64)) : (u(), c("span", gt, "活动水平：" + i(g.value?.label || "未填写"), 1))
          ])
        ])
      ]),
      n.value?.notice ? (u(), c("p", bt, [
        B(L, {
          name: "info",
          size: 16
        }),
        b(i(n.value.notice), 1)
      ])) : S("", !0),
      n.value && n.value.formulaOutsideStudy ? (u(), c("p", ht, [
        B(L, {
          name: "info",
          size: 16
        }),
        s[20] || (s[20] = b("你的年龄超出原公式研究的 19–78 岁范围，能量数值仅作粗略参考。", -1))
      ])) : S("", !0),
      e("section", pt, [
        e("div", ft, [
          e("div", null, [
            s[21] || (s[21] = e("h2", null, "三大营养素，合理分配", -1)),
            e("p", null, i(n.value ? "按每日能量需求换算的一种膳食搭配参考" : "完成适用档案后显示计算值；未知数据不当作 0。"), 1)
          ]),
          s[22] || (s[22] = e("span", { class: "vb-subtle-label" }, "每日参考", -1))
        ]),
        e("div", yt, [
          n.value ? (u(!0), c(R, { key: 0 }, V(n.value.macros, (r) => (u(), c("article", {
            key: r.id,
            class: Z(["vb-macro-card", r.color])
          }, [
            e("div", kt, [
              s[23] || (s[23] = e("span", { class: "vb-macro-dot" }, null, -1)),
              b(i(r.name), 1),
              e("span", wt, i(r.percent == null ? "AI / RDA" : r.percent + "%"), 1)
            ]),
            e("strong", null, [
              b(i(w(r.grams)), 1),
              s[24] || (s[24] = e("small", null, " 克", -1))
            ]),
            e("p", null, i(r.foods), 1)
          ], 2))), 128)) : (u(), c(R, { key: 1 }, V(f, (r) => e("article", {
            key: r.id,
            class: Z(["vb-macro-card", r.color])
          }, [
            e("div", At, [
              s[25] || (s[25] = e("span", { class: "vb-macro-dot" }, null, -1)),
              b(i(r.name), 1),
              s[26] || (s[26] = e("span", { class: "vb-macro-percent" }, "待计算", -1))
            ]),
            s[27] || (s[27] = e("strong", null, [
              b("—"),
              e("small", null, " 克")
            ], -1)),
            s[28] || (s[28] = e("p", null, "待身体档案达到适用条件后计算", -1))
          ], 2)), 64))
        ]),
        n.value && !n.value.macros.some((r) => r.percent == null) ? (u(), c("div", Mt, [
          (u(!0), c(R, null, V(n.value.macros, (r) => (u(), c("span", {
            key: r.id,
            class: Z(r.color),
            style: fe({ flex: r.percent })
          }, null, 6))), 128))
        ])) : S("", !0),
        e("p", Ct, i(n.value ? n.value.macroNote : m.value), 1)
      ]),
      e("div", Et, [
        e("div", null, [
          s[29] || (s[29] = e("h2", null, "微量营养素参考", -1)),
          e("p", null, i(k($)(t.profile.age)) + " · " + i(t.profile.sex === "male" ? "男性" : t.profile.sex === "female" ? "女性" : "性别未填写") + " · " + i(n.value?.microSource || (Number(t.profile.age) < 18 ? "Health Canada / NASEM" : "中国 DRIs 2023")), 1)
        ]),
        s[30] || (s[30] = e("span", { class: "vb-subtle-label" }, "膳食参考量，非补充剂剂量", -1))
      ]),
      h.value ? (u(), c("div", It, [
        (u(), c(R, null, V(y, ([r, D, K]) => e("section", {
          key: r,
          class: "vb-glass vb-micro-card"
        }, [
          e("div", xt, [
            e("h3", null, [
              B(L, {
                name: K,
                size: 18
              }, null, 8, ["name"]),
              b(i(D), 1)
            ]),
            e("span", St, i(v.value[r].length) + " 项", 1)
          ]),
          e("table", null, [
            e("caption", Nt, i(D) + "每日膳食参考摄入量", 1),
            s[32] || (s[32] = e("thead", null, [
              e("tr", null, [
                e("th", { scope: "col" }, "营养素"),
                e("th", { scope: "col" }, "类型"),
                e("th", { scope: "col" }, "每日参考")
              ])
            ], -1)),
            e("tbody", null, [
              (u(!0), c(R, null, V(v.value[r], (x) => (u(), c("tr", {
                key: x.id
              }, [
                e("th", Rt, [
                  b(i(x.name), 1),
                  x.note ? (u(), c("small", Dt, i(x.note), 1)) : S("", !0)
                ]),
                e("td", null, [
                  e("span", Bt, i(x.kind), 1)
                ]),
                e("td", null, [
                  e("strong", null, i(x.value), 1),
                  s[31] || (s[31] = b()),
                  e("small", null, i(x.unit), 1)
                ])
              ]))), 128))
            ])
          ])
        ])), 64))
      ])) : (u(), c("div", Lt, [
        (u(), c(R, null, V(y, ([, r, D]) => e("section", {
          key: r,
          class: "vb-glass vb-micro-card vb-micro-placeholder"
        }, [
          e("div", Kt, [
            e("h3", null, [
              B(L, {
                name: D,
                size: 18
              }, null, 8, ["name"]),
              b(i(r), 1)
            ]),
            s[33] || (s[33] = e("span", { class: "vb-pill" }, "待匹配年龄与性别", -1))
          ]),
          s[34] || (s[34] = e("p", null, "适用的参考值会在档案条件满足后显示。填写年龄和性别后匹配对应年龄段，未填写的数据不以 0 填充。", -1))
        ])), 64))
      ])),
      n.value ? S("", !0) : (u(), c("section", jt, [
        e("div", null, [
          s[35] || (s[35] = e("h2", null, "计算状态", -1)),
          e("p", null, i(m.value) + " 你仍可记录饮食、浏览食物和安排下一餐。", 1)
        ]),
        e("button", {
          class: "vb-button vb-button-quiet",
          onClick: s[4] || (s[4] = (r) => p.$emit("edit"))
        }, "补充身体档案")
      ])),
      e("section", Vt, [
        e("span", Tt, [
          B(L, { name: "list" })
        ]),
        e("div", null, [
          s[36] || (s[36] = e("h3", null, "把记录，放进今天的生活", -1)),
          e("p", null, i(t.recordCount ? `已记录 ${t.recordCount} 天饮食，继续发现适合自己的搭配。` : "从记下一顿饭开始，回顾食物的多样性。"), 1)
        ]),
        e("button", {
          class: "vb-text-button",
          onClick: s[5] || (s[5] = (r) => p.$emit("navigate", "assessment"))
        }, [
          s[37] || (s[37] = b("查看饮食回顾", -1)),
          B(L, {
            name: "arrow",
            size: 17
          })
        ])
      ]),
      n.value ? (u(), ae(qe, { key: 7 })) : S("", !0)
    ], 64));
  }
}, Jt = {
  class: "vb-account-dialog",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "vb-account-title"
}, Ft = { class: "vb-account-heading" }, Ut = { id: "vb-account-title" }, Zt = { class: "vb-account-email" }, zt = {
  key: 0,
  class: "vb-account-note"
}, Ht = { class: "vb-account-status" }, Qt = ["disabled"], Pt = {
  key: 1,
  class: "vb-agent-error"
}, Ot = {
  key: 2,
  class: "vb-field-error",
  role: "alert"
}, qt = ["disabled"], Yt = { class: "vb-account-tabs" }, Xt = ["type", "autocomplete", "placeholder"], Wt = ["autocomplete", "minlength", "placeholder"], Gt = { key: 0 }, $t = { class: "vb-code-row" }, _t = ["src"], en = { key: 1 }, tn = { key: 1 }, nn = { class: "vb-code-row" }, sn = ["disabled"], an = {
  key: 2,
  class: "vb-local-code",
  role: "status"
}, ln = {
  key: 3,
  class: "vb-account-consent"
}, on = {
  key: 4,
  class: "vb-account-note"
}, rn = {
  key: 5,
  class: "vb-field-error",
  role: "alert"
}, un = ["disabled"], cn = {
  key: 1,
  class: "vb-account-note"
}, dn = {
  key: 2,
  class: "vb-account-test"
}, hn = {
  __name: "AccountDialog",
  emits: ["close"],
  setup(t, { emit: l }) {
    const a = l, n = N("login"), v = N(""), h = N(""), g = N(""), d = N(""), m = N(""), f = N(""), y = N("");
    async function M() {
      try {
        const A = await fetch("/api/auth/captcha", { cache: "no-store" }), o = await A.json();
        if (!A.ok) throw Error(o.error);
        m.value = o.image, f.value = o.captchaId, y.value = "";
      } catch (A) {
        s.value = A.message || "图形验证码加载失败";
      }
    }
    const w = N(0), I = N(!1);
    let E = 0;
    const p = N(!1), s = N(""), r = N(!1), D = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname), K = F(() => ({ guest: "游客数据只保存在本机", syncing: "正在读取账号数据…", pending: "正在同步账号数据…", synced: "账号数据已同步", error: "同步暂时失败，本机副本仍保留" })[ne.value] || "账号数据");
    function x(A) {
      n.value = A, A !== "login" && M(), s.value = "", g.value = "", d.value = "", w.value = 0, clearInterval(E);
    }
    function H(A = 60) {
      clearInterval(E), w.value = A, E = setInterval(() => {
        w.value = Math.max(0, w.value - 1), w.value || clearInterval(E);
      }, 1e3);
    }
    async function q() {
      if (I.value || w.value) return;
      const A = v.value.trim();
      if (!/^\S+@\S+\.\S+$/.test(A)) {
        s.value = "请先填写有效邮箱地址。";
        return;
      }
      if (s.value = "", d.value = "", !/^[23456789A-H]{4}$/i.test(y.value.trim())) {
        s.value = "请输入图片中的4位验证码。";
        return;
      }
      I.value = !0;
      try {
        const o = await fetch("/api/auth/request-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({ email: A, purpose: n.value === "reset" ? "reset" : "register", captchaId: f.value, captchaAnswer: y.value })
        }), C = await o.json().catch(() => ({}));
        if (!o.ok) throw new Error(C.error || "验证码发送失败，请稍后重试。");
        typeof C.localDebugCode == "string" && (d.value = C.localDebugCode), H(Number(C.resendAfterSeconds) || 60);
      } catch (o) {
        s.value = o instanceof Error ? o.message : "验证码发送失败，请稍后重试。";
      } finally {
        I.value = !1, M();
      }
    }
    async function Q() {
      if (!r.value) {
        s.value = "", r.value = !0;
        try {
          if (n.value === "reset") {
            const A = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: v.value.trim(), password: h.value, verificationCode: g.value.trim() }) }), o = await A.json();
            if (!A.ok) throw Error(o.error);
            x("login"), h.value = "", s.value = "密码已重置，请重新登录。";
            return;
          }
          await ge({ mode: n.value, email: v.value.trim(), password: h.value, acceptTerms: p.value, verificationCode: g.value.trim() });
        } catch (A) {
          s.value = A instanceof Error ? A.message : "操作失败，请重试。";
        } finally {
          r.value = !1;
        }
      }
    }
    function J() {
      const A = ve();
      if (!A) return;
      const o = URL.createObjectURL(new Blob([A], { type: "application/json" })), C = document.createElement("a");
      C.href = o, C.download = "维衡-同步冲突恢复副本.json", C.click(), setTimeout(() => URL.revokeObjectURL(o), 1e3);
    }
    ke(() => clearInterval(E));
    async function Y() {
      if (!r.value) {
        r.value = !0, s.value = "";
        try {
          await me();
        } catch (A) {
          s.value = A instanceof Error ? A.message : "退出登录失败。", r.value = !1;
        }
      }
    }
    return (A, o) => (u(), c("div", {
      class: "vb-dialog-overlay vb-account-overlay",
      onClick: o[12] || (o[12] = le((C) => a("close"), ["self"]))
    }, [
      e("section", Jt, [
        e("header", Ft, [
          e("div", null, [
            o[13] || (o[13] = e("p", { class: "vb-eyebrow" }, "游客可继续直接使用", -1)),
            e("h2", Ut, i(k(U) ? "账号与数据" : n.value === "reset" ? "找回密码" : "登录"), 1)
          ]),
          e("button", {
            class: "vb-icon-button",
            "aria-label": "关闭账号面板",
            onClick: o[0] || (o[0] = (C) => a("close"))
          }, "×")
        ]),
        k(U) ? (u(), c(R, { key: 0 }, [
          e("p", Zt, "当前登录：" + i(k(U).email.endsWith("@demo.local") ? "评委测试账号" : k(U).email), 1),
          k(U).email.endsWith("@demo.local") ? (u(), c("p", zt, "这是多人共用的演示账号。请只输入虚构演示资料，不要填写真实身体、健康或饮食数据。")) : S("", !0),
          e("div", Ht, [
            e("strong", null, i(K.value), 1),
            o[14] || (o[14] = e("p", null, "档案、饮食记录、草稿与膳食方案会同步到当前网站服务器账号。文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。", -1))
          ]),
          e("p", null, [
            b("档案记录上次成功同步：" + i(k(ee) ? new Date(k(ee)).toLocaleString("zh-CN") : "暂无"), 1),
            o[15] || (o[15] = e("br", null, null, -1)),
            b("文字对话：" + i({ guest: "游客", syncing: "同步中", pending: "待同步", synced: "已同步", error: "同步失败，可重试" }[k(de)]) + " · " + i(k(te) ? new Date(k(te)).toLocaleString("zh-CN") : "暂无"), 1)
          ]),
          e("button", {
            class: "vb-button vb-button-soft",
            disabled: k(ne) === "syncing",
            onClick: o[1] || (o[1] = (C) => k(X)())
          }, "重新同步", 8, Qt),
          k(se).length ? (u(), c("div", Pt, [
            e("p", null, "多设备修改有冲突：" + i(k(se).join("、")) + "。双方原始副本已保留，非冲突内容自动合并。", 1),
            e("button", {
              class: "vb-button vb-button-quiet",
              onClick: o[2] || (o[2] = (C) => k(X)("local"))
            }, "冲突项采用本机"),
            e("button", {
              class: "vb-button vb-button-quiet",
              onClick: o[3] || (o[3] = (C) => k(X)("remote"))
            }, "冲突项采用服务器"),
            e("button", {
              class: "vb-button vb-button-quiet",
              onClick: J
            }, "下载双方恢复副本")
          ])) : S("", !0),
          s.value ? (u(), c("p", Ot, i(s.value), 1)) : S("", !0),
          e("button", {
            class: "vb-button vb-button-quiet vb-account-submit",
            disabled: r.value,
            onClick: Y
          }, i(r.value ? "正在退出…" : "退出登录，保留游客空间"), 9, qt)
        ], 64)) : (u(), c(R, { key: 1 }, [
          e("div", Yt, [
            e("button", {
              class: Z({ active: n.value === "login" }),
              onClick: o[4] || (o[4] = (C) => x("login"))
            }, "登录", 2),
            e("button", {
              class: Z({ active: n.value === "register" }),
              onClick: o[5] || (o[5] = (C) => x("register"))
            }, "注册", 2)
          ]),
          e("form", {
            class: "vb-account-form",
            onSubmit: le(Q, ["prevent"])
          }, [
            e("label", null, [
              b(i(n.value === "login" ? "邮箱或测试账号" : "邮箱"), 1),
              P(e("input", {
                "onUpdate:modelValue": o[6] || (o[6] = (C) => v.value = C),
                type: n.value === "login" ? "text" : "email",
                autocomplete: n.value === "login" ? "username" : "email",
                placeholder: (n.value === "login", "name@example.com"),
                required: ""
              }, null, 8, Xt), [
                [we, v.value]
              ])
            ]),
            e("label", null, [
              o[16] || (o[16] = b("密码", -1)),
              P(e("input", {
                "onUpdate:modelValue": o[7] || (o[7] = (C) => h.value = C),
                type: "password",
                autocomplete: n.value === "login" ? "current-password" : "new-password",
                minlength: n.value !== "login" ? 10 : void 0,
                maxlength: "128",
                placeholder: n.value !== "login" ? "至少 10 位" : "请输入密码",
                required: ""
              }, null, 8, Wt), [
                [W, h.value]
              ])
            ]),
            n.value !== "login" ? (u(), c("label", Gt, [
              o[17] || (o[17] = b("图形验证码", -1)),
              e("div", $t, [
                P(e("input", {
                  "onUpdate:modelValue": o[8] || (o[8] = (C) => y.value = C),
                  autocomplete: "off",
                  maxlength: "4",
                  placeholder: "4位图形验证码"
                }, null, 512), [
                  [W, y.value]
                ]),
                e("button", {
                  type: "button",
                  class: "vb-button vb-button-quiet",
                  onClick: M,
                  "aria-label": "刷新图形验证码"
                }, [
                  m.value ? (u(), c("img", {
                    key: 0,
                    src: m.value,
                    alt: "图形验证码，点击刷新",
                    style: { width: "150px", height: "49px", "max-width": "none" }
                  }, null, 8, _t)) : (u(), c("span", en, "点击加载图片"))
                ])
              ]),
              o[18] || (o[18] = e("small", null, "看不清可点击图片刷新。验证通过后才能发送邮箱验证码。", -1))
            ])) : S("", !0),
            n.value !== "login" ? (u(), c("label", tn, [
              o[19] || (o[19] = b("邮箱验证码", -1)),
              e("div", nn, [
                P(e("input", {
                  "onUpdate:modelValue": o[9] || (o[9] = (C) => g.value = C),
                  type: "text",
                  inputmode: "numeric",
                  autocomplete: "one-time-code",
                  maxlength: "6",
                  pattern: "[0-9]{6}",
                  placeholder: "6 位验证码",
                  required: ""
                }, null, 512), [
                  [W, g.value]
                ]),
                e("button", {
                  class: "vb-button vb-button-quiet",
                  type: "button",
                  disabled: I.value || w.value > 0,
                  onClick: q
                }, i(I.value ? "发送中…" : w.value ? `${w.value} 秒后重发` : "获取验证码"), 9, sn)
              ])
            ])) : S("", !0),
            d.value ? (u(), c("p", an, [
              o[20] || (o[20] = b("本地调试验证码：", -1)),
              e("strong", null, i(d.value), 1),
              o[21] || (o[21] = b("（仅 localhost 调试使用，线上不会显示）", -1))
            ])) : S("", !0),
            n.value === "register" ? (u(), c("label", ln, [
              P(e("input", {
                "onUpdate:modelValue": o[10] || (o[10] = (C) => p.value = C),
                type: "checkbox",
                required: ""
              }, null, 512), [
                [Ae, p.value]
              ]),
              o[22] || (o[22] = e("span", null, "我了解账号数据会保存在网站服务器，并同意使用说明。", -1))
            ])) : S("", !0),
            n.value === "register" ? (u(), c("p", on, "注册需要有效邮箱、邮箱验证码和至少 10 位密码。验证码 10 分钟有效。游客仍可直接使用，无需注册。")) : S("", !0),
            s.value ? (u(), c("p", rn, i(s.value), 1)) : S("", !0),
            e("button", {
              class: "vb-button vb-button-primary vb-account-submit",
              disabled: r.value
            }, i(r.value ? "请稍候…" : n.value === "login" ? "登录并打开账号空间" : n.value === "reset" ? "验证并重置密码" : "创建邮箱账号"), 9, un)
          ], 32),
          n.value === "login" ? (u(), c("button", {
            key: 0,
            class: "vb-text-button",
            onClick: o[11] || (o[11] = (C) => x("reset"))
          }, "忘记密码？")) : S("", !0),
          n.value === "reset" ? (u(), c("p", cn, "若邮箱可用于重置，将收到验证码。成功后旧登录会话失效，请重新登录。")) : S("", !0),
          k(D) ? (u(), c("div", dn, [...o[23] || (o[23] = [
            e("strong", null, "本地测试账号", -1),
            e("span", null, "账号：12345678w　密码：12345678w", -1),
            e("small", null, "仅 localhost 可用；游客数据和账号数据相互独立。", -1)
          ])])) : S("", !0),
          o[24] || (o[24] = e("p", { class: "vb-account-note" }, "选择关闭即可继续以游客身份使用。首次登录发现游客档案时，可选择复制到账号；原游客数据会保留。", -1))
        ], 64))
      ])
    ]));
  }
};
function pn(t) {
  let l = null, a = 0, n = t.value;
  function v() {
    const h = ++a;
    n = n === "dark" ? "light" : "dark";
    const g = n;
    l?.skipTransition();
    const d = async () => {
      h === a && (t.value = g, await ie());
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || typeof document.startViewTransition != "function") {
      document.documentElement.classList.remove("vb-theme-crossfade"), d();
      return;
    }
    document.documentElement.classList.add("vb-theme-crossfade");
    try {
      l = document.startViewTransition(d), l.ready.catch(() => {
      }), l.finished.catch(() => {
      }).finally(() => {
        h === a && (l = null, document.documentElement.classList.remove("vb-theme-crossfade"));
      });
    } catch {
      document.documentElement.classList.remove("vb-theme-crossfade"), d();
    }
  }
  return re(() => {
    a++, l?.skipTransition(), document.documentElement.classList.remove("vb-theme-crossfade");
  }), { toggleTheme: v };
}
export {
  O as A,
  L as _,
  qe as a,
  gn as b,
  Ie as c,
  bn as d,
  hn as e,
  ce as l,
  Ze as o,
  Ee as p,
  pn as u,
  _ as v
};
