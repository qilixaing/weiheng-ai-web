import { A as U, o as s, d as i, g as B, e as t, t as a, u as y, F as x, f as D, n as T, p as f, j as h, a as p, D as z, r as E, m as L, v as q, l as P, i as H } from "./vue-runtime-wiGxZMXT.js";
import { o as M, l as S, M as V, N as R, g as w, q as O, t as j, Q, S as W, k as G, a as F, T as J, U as K } from "./useThemeTransition-xONdG_8q.js";
const X = ["aria-label"], Y = {
  class: "vb-intake-chart-axis vb-intake-chart-axis-left",
  "aria-hidden": "true"
}, Z = { class: "vb-intake-chart-plot" }, ee = { class: "vb-intake-chart-stage" }, te = {
  key: 1,
  class: "vb-intake-chart-value vb-intake-chart-empty"
}, ae = { class: "vb-intake-chart-label" }, le = {
  class: "vb-intake-chart-axis vb-intake-chart-axis-right",
  "aria-hidden": "true"
}, ne = { class: "vb-intake-chart-note" }, se = {
  key: 1,
  class: "vb-intake-grid"
}, ie = { key: 0 }, ue = { key: 0 }, oe = { class: "vb-intake-more" }, re = { class: "vb-data-note" }, de = { key: 0 }, ce = { key: 1 }, ve = {
  key: 2,
  class: "vb-intake-more"
}, me = { key: 0 }, pe = /* @__PURE__ */ U({
  __name: "NutrientSummary",
  props: {
    entries: { default: () => [] },
    summary: { default: void 0 },
    targets: { default: null },
    compact: { type: Boolean, default: !1 },
    chart: { type: Boolean, default: !1 },
    details: { type: Boolean, default: !1 },
    estimating: { type: Boolean, default: !1 }
  },
  setup(d) {
    const b = d, u = p(() => b.summary || w(b.entries)), N = (n) => {
      const l = n?.range ? O(n.range) : n?.value;
      return l == null || !Number.isFinite(Number(l)) ? null : Number(l);
    }, g = (n) => n === null ? "暂无数据" : n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), $ = (n) => {
      if (!Number.isFinite(n) || n <= 0) return 1;
      const e = 10 ** Math.floor(Math.log10(n)) / 2, C = Math.ceil(n / e) * e;
      return C > n ? C : C + e;
    }, I = p(() => {
      const n = V.map((l) => {
        const e = u.value.totals[l.id], C = N(e);
        return {
          id: l.id,
          name: l.id === "carbs" ? "碳水" : l.name,
          unit: l.unit,
          value: C,
          total: e,
          axis: l.id === "energy" ? "energy" : "grams",
          tone: l.id === "energy" ? "energy" : l.id
        };
      });
      return [...n.filter((l) => l.axis === "grams"), ...n.filter((l) => l.axis === "energy")];
    }), A = p(() => {
      const n = I.value.find((e) => e.axis === "energy")?.value || 0, l = Math.max(0, ...I.value.filter((e) => e.axis === "grams").map((e) => e.value || 0));
      return { energy: $(n), grams: $(l) };
    }), v = (n, l) => n === null ? 0 : Math.min(82, n / l * 82), k = p(() => I.value.map((n) => `${n.name} ${g(n.value)} ${n.unit}`).join("；")), r = p(() => {
      if (b.estimating) return "AI 正在分析";
      const n = I.value.some((e) => e.total.range), l = I.value.some((e) => !e.total.complete);
      return [n && "含 AI 估算", l && "数据不完整"].filter(Boolean).join(" · ") || "记录内合计";
    }), _ = (n) => n === "energy" ? b.targets?.tdee : b.targets?.macros?.find((l) => l.id === n)?.grams;
    return (n, l) => (s(), i("div", {
      class: B(["vb-nutrition-summary", { "is-compact": d.compact }])
    }, [
      d.chart ? (s(), i("div", {
        key: 0,
        class: "vb-intake-chart-shell",
        role: "img",
        "aria-label": `已记录营养摄入柱状图：${k.value}。热量使用 kcal 刻度，三大营养素使用 g 刻度。`
      }, [
        t("div", Y, [
          t("span", null, a(y(M)(A.value.grams)) + " g", 1),
          t("span", null, a(y(M)(A.value.grams / 2)) + " g", 1),
          l[0] || (l[0] = t("span", null, "0 g", -1))
        ]),
        t("div", Z, [
          (s(!0), i(x, null, D(I.value, (e) => (s(), i("div", {
            key: e.id,
            class: "vb-intake-chart-item"
          }, [
            t("div", ee, [
              e.value !== null ? (s(), i("span", {
                key: 0,
                class: "vb-intake-chart-value",
                style: T({ "--bar-height": `${v(e.value, A.value[e.axis])}%` })
              }, [
                f(a(g(e.value)), 1),
                t("small", null, a(e.unit), 1)
              ], 4)) : (s(), i("span", te, a(d.estimating ? "估算中" : "暂无数据"), 1)),
              e.value !== null ? (s(), i("span", {
                key: 2,
                class: B(["vb-intake-chart-bar", e.tone]),
                style: T({ "--bar-height": `${v(e.value, A.value[e.axis])}%` })
              }, null, 6)) : h("", !0)
            ]),
            t("span", ae, a(e.name), 1)
          ]))), 128))
        ]),
        t("div", le, [
          t("span", null, a(y(M)(A.value.energy)) + " kcal", 1),
          t("span", null, a(y(M)(A.value.energy / 2)) + " kcal", 1),
          l[1] || (l[1] = t("span", null, "0 kcal", -1))
        ]),
        t("p", ne, a(r.value), 1)
      ], 8, X)) : (s(), i("div", se, [
        (s(!0), i(x, null, D(y(V), (e) => (s(), i("div", {
          key: e.id
        }, [
          t("span", null, a(e.id === "carbs" ? "碳水" : e.name), 1),
          t("strong", null, [
            f(a(d.estimating && u.value.totals[e.id].value === null && !u.value.totals[e.id].range ? "正在估算…" : y(S)(u.value.totals[e.id])), 1),
            u.value.totals[e.id].value != null || u.value.totals[e.id].range ? (s(), i("small", ie, a(e.unit), 1)) : h("", !0)
          ]),
          t("small", null, a(d.estimating && u.value.totals[e.id].value === null && !u.value.totals[e.id].range ? "AI正在分析已识别食物" : u.value.totals[e.id].range ? u.value.totals[e.id].complete ? "含AI估算" : "含AI估算 · 数据不完整" : u.value.totals[e.id].value === null ? "数据不完整" : u.value.totals[e.id].complete ? "记录内合计" : "数据不完整"), 1),
          _(e.id) ? (s(), i("small", ue, "目标 " + a(y(M)(_(e.id))) + " " + a(e.unit), 1)) : h("", !0)
        ]))), 128))
      ])),
      t("details", oe, [
        l[2] || (l[2] = t("summary", null, "查看计算依据", -1)),
        t("p", re, "按可食部重量计算 · " + a(d.estimating ? "AI正在估算缺失的能量与三大营养素。" : `${u.value.knownEnergyCount}/${u.value.itemCount} 项有热量数值（含AI估算）。记录可能未覆盖全天。`), 1),
        (s(!0), i(x, null, D(y(V), (e) => (s(), i("p", {
          key: e.id
        }, [
          f(a(e.name) + "：数据库小计 " + a(u.value.totals[e.id].value === null ? "—" : y(M)(u.value.totals[e.id].value)) + " " + a(e.unit), 1),
          u.value.totals[e.id].range ? (s(), i("span", de, "；另含 " + a(u.value.totals[e.id].estimatedCount) + " 项AI单值估算，计入后为 " + a(y(S)(u.value.totals[e.id])) + " " + a(e.unit) + "。旧范围按上下限中点换算。", 1)) : h("", !0),
          u.value.totals[e.id].complete ? h("", !0) : (s(), i("span", ce, "；数据不完整"))
        ]))), 128))
      ]),
      d.details ? (s(), i("details", ve, [
        l[3] || (l[3] = t("summary", null, "查看其他营养指标", -1)),
        t("dl", null, [
          (s(!0), i(x, null, D(y(R).slice(4), (e) => (s(), i(x, {
            key: e.id
          }, [
            t("dt", null, a(e.name), 1),
            t("dd", null, [
              f(a(y(S)(u.value.totals[e.id])) + " ", 1),
              u.value.totals[e.id].value !== null ? (s(), i("small", me, a(e.unit) + a(u.value.totals[e.id].complete ? "" : " · 已知小计"), 1)) : h("", !0)
            ])
          ], 64))), 128))
        ])
      ])) : h("", !0)
    ], 2));
  }
}), ye = (d, b) => {
  const u = d.__vccOpts || d;
  for (const [N, g] of b)
    u[N] = g;
  return u;
}, he = {
  class: "vb-daily-chart",
  "aria-labelledby": "vb-daily-chart-title"
}, be = { class: "vb-daily-chart__heading" }, ge = { class: "vb-daily-chart__summary" }, ke = { key: 0 }, _e = { class: "vb-daily-chart__select" }, fe = ["value"], $e = ["value"], Ie = ["aria-label"], Ae = ["aria-label"], xe = { class: "vb-daily-chart__date" }, Ne = ["datetime"], Me = {
  class: "vb-daily-chart__track",
  "aria-hidden": "true"
}, De = { class: "vb-daily-chart__value" }, Ce = { key: 0 }, Se = {
  key: 1,
  class: "vb-daily-chart__empty"
}, Re = {
  __name: "DailyIntakeChart",
  props: {
    trend: { type: Array, default: () => [] },
    metric: { type: String, default: "energy" },
    endDate: { type: String, default: "" },
    days: { type: Number, default: 0 },
    completeDays: { type: Number, default: 0 },
    mean: { type: Number, default: null }
  },
  emits: ["update:metric"],
  setup(d, { emit: b }) {
    const u = d, N = b, g = p(() => R.find((v) => v.id === u.metric) || R[0]), $ = p(() => {
      const v = u.trend.map((r) => {
        const _ = r.totals?.[u.metric];
        return !r.recorded || !_ ? null : _.range ? O(_.range) : typeof _.value == "number" && Number.isFinite(_.value) ? _.value : null;
      }), k = Math.max(1, ...v.filter((r) => r !== null));
      return u.trend.map((r, _) => {
        const n = r.totals?.[u.metric], l = v[_];
        let e = "未记录";
        return r.recorded && n && (n.range ? e = n.complete ? "含 AI 估算" : "含估算 · 仍有缺失" : l === null ? e = "该指标未知" : n.complete ? e = "数据库完整" : e = "已知小计 · 仍有缺失"), {
          date: r.date,
          recorded: !!r.recorded,
          value: l,
          label: r.recorded ? l === null ? "未知" : S(n) : "—",
          status: e,
          kind: n?.range ? "estimated" : l !== null && !n?.complete ? "partial" : "known",
          percent: l === null ? 0 : Math.max(0, Math.min(100, l / k * 100)),
          accessible: `${r.date}，${g.value.name}：${r.recorded ? l === null ? "未知" : `${S(n)} ${g.value.unit}` : "未记录"}，${e}`
        };
      });
    }), I = p(() => $.value.some((v) => v.value !== null)), A = (v) => N("update:metric", v.target.value);
    return (v, k) => (s(), i("section", he, [
      t("div", be, [
        t("div", null, [
          k[1] || (k[1] = t("p", { class: "vb-eyebrow" }, "按日查看 · 仅汇总已有记录", -1)),
          k[2] || (k[2] = t("h3", { id: "vb-daily-chart-title" }, "近 7 日每日营养摄入", -1)),
          t("p", ge, [
            f(a(d.days) + "/7 天有食物记录；" + a(d.completeDays) + " 天该指标数据完整", 1),
            d.mean !== null ? (s(), i("span", ke, "，完整记录日均 " + a(y(M)(d.mean)) + " " + a(g.value.unit), 1)) : h("", !0),
            k[0] || (k[0] = f("。 ", -1))
          ])
        ]),
        t("label", _e, [
          k[3] || (k[3] = f("查看指标 ", -1)),
          t("select", {
            value: d.metric,
            "aria-label": "每日图表营养指标",
            onChange: A
          }, [
            (s(!0), i(x, null, D(y(R), (r) => (s(), i("option", {
              key: r.id,
              value: r.id
            }, a(r.name), 9, $e))), 128))
          ], 40, fe)
        ])
      ]),
      I.value ? (s(), i("div", {
        key: 0,
        class: "vb-daily-chart__plot",
        role: "list",
        "aria-label": `截至 ${d.endDate} 的近七日${g.value.name}记录图表`
      }, [
        (s(!0), i(x, null, D($.value, (r) => (s(), i("div", {
          key: r.date,
          class: "vb-daily-chart__row",
          role: "listitem",
          "aria-label": r.accessible
        }, [
          t("div", xe, [
            t("time", {
              datetime: r.date
            }, a(r.date.slice(5)), 9, Ne),
            t("small", null, a(r.status), 1)
          ]),
          t("div", Me, [
            r.value !== null ? (s(), i("span", {
              key: 0,
              class: B(["vb-daily-chart__bar", `is-${r.kind}`]),
              style: T({ width: `${r.percent}%` })
            }, null, 6)) : h("", !0)
          ]),
          t("strong", De, [
            f(a(r.label), 1),
            r.value !== null ? (s(), i("small", Ce, a(g.value.unit), 1)) : h("", !0)
          ])
        ], 8, Ae))), 128))
      ], 8, Ie)) : (s(), i("p", Se, "这 7 天没有可展示的 " + a(g.value.name) + "数值；未记录或未知的数据不会按 0 绘制。", 1)),
      k[4] || (k[4] = z('<div class="vb-daily-chart__legend" aria-label="图表数据标记" data-v-34b23d56><span data-v-34b23d56><i class="is-known" data-v-34b23d56></i>数据库完整</span><span data-v-34b23d56><i class="is-estimated" data-v-34b23d56></i>含 AI 估算</span><span data-v-34b23d56><i class="is-partial" data-v-34b23d56></i>已知小计</span></div><p class="vb-daily-chart__note" data-v-34b23d56>条形长度按这 7 天内的最高显示值缩放，不代表达标率；“含 AI 估算”按估算值展示，未知项仍保留未知。单日记录不代表全天或长期摄入。</p>', 2))
    ]));
  }
}, Ee = /* @__PURE__ */ ye(Re, [["__scopeId", "data-v-34b23d56"]]), Ve = { class: "vb-glass vb-intake-analysis" }, Be = { class: "vb-section-heading" }, Te = { class: "vb-date-input" }, je = ["max"], Fe = { class: "vb-data-note" }, we = {
  class: "vb-analysis-tabs",
  "aria-label": "营养指标分组"
}, Oe = ["aria-pressed", "onClick"], Ue = { class: "vb-analysis-table-wrap" }, ze = { class: "vb-analysis-table" }, Le = { key: 0 }, qe = { key: 1 }, Pe = { key: 0 }, He = { key: 0 }, Qe = { key: 1 }, We = {
  key: 2,
  class: "vb-data-note"
}, Ge = {
  __name: "IntakeAnalysis",
  props: { records: { type: Array, default: () => [] }, reports: { type: Array, default: () => [] }, profile: Object, compact: Boolean },
  setup(d) {
    const b = d, u = E(j()), N = E("主要营养"), g = E("energy"), $ = p(() => b.records.find((c) => c.date === u.value)), I = p(() => $.value ? b.reports.find((c) => c.date === u.value && c.status === "complete" && c.recordVersion === F($.value)) : null), A = p(() => $.value && b.reports.some((c) => c.date === u.value && c.status === "pending" && c.recordVersion === F($.value))), v = p(() => W($.value, b.reports)), k = p(() => w(v.value)), r = p(() => [...new Set(v.value.map((c) => c.meal))].map((c) => G.find((m) => m[0] === c)?.[1]).join("、")), _ = p(() => J(v.value, b.profile).filter((c) => c.section === N.value)), n = p(() => K(b.records, u.value, 7, b.reports)), l = p(() => n.value.filter((c) => c.recorded)), e = p(() => l.value.filter((c) => c.totals[g.value].complete && !c.totals[g.value].range)), C = p(() => e.value.length ? e.value.reduce((c, m) => c + m.totals[g.value].value, 0) / e.value.length : null);
    return (c, m) => (s(), i("section", Ve, [
      t("div", Be, [
        t("div", null, [
          m[2] || (m[2] = t("p", { class: "vb-eyebrow" }, "实际摄入 · 与身体需求分别展示", -1)),
          t("h2", null, a(d.compact ? "已记录的营养摄入" : "当日营养摄入"), 1)
        ]),
        t("label", Te, [
          m[3] || (m[3] = f("日期", -1)),
          L(t("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (o) => u.value = o),
            type: "date",
            max: y(j)(),
            "aria-label": "营养摄入日期"
          }, null, 8, je), [
            [q, u.value]
          ])
        ])
      ]),
      t("p", Fe, a(v.value.length ? `${v.value.length}项食物 · ${r.value} · ${k.value.knownEnergyCount}/${v.value.length}项有热量数据${I.value ? "（已合并AI估算）" : ""}` : "尚未记录；未记录不按摄入为0处理。"), 1),
      v.value.length && d.compact ? (s(), P(pe, {
        key: 0,
        entries: v.value,
        estimating: A.value,
        compact: "",
        chart: ""
      }, null, 8, ["entries", "estimating"])) : h("", !0),
      d.compact ? h("", !0) : (s(), i(x, { key: 1 }, [
        t("div", we, [
          (s(), i(x, null, D(["主要营养", "维生素", "矿物质", "其他"], (o) => t("button", {
            key: o,
            class: "vb-button vb-button-quiet",
            "aria-pressed": N.value === o,
            onClick: (Je) => N.value = o
          }, a(o), 9, Oe)), 64))
        ]),
        t("div", Ue, [
          t("table", ze, [
            m[5] || (m[5] = t("caption", null, "已记录摄入与每日参考", -1)),
            m[6] || (m[6] = t("thead", null, [
              t("tr", null, [
                t("th", null, "指标"),
                t("th", null, "已记录摄入"),
                t("th", null, "每日参考"),
                t("th", null, "依据")
              ])
            ], -1)),
            t("tbody", null, [
              (s(!0), i(x, null, D(_.value, (o) => (s(), i("tr", {
                key: o.id
              }, [
                t("th", null, a(o.name), 1),
                t("td", null, [
                  f(a(y(S)(o)) + " " + a(o.value == null && !o.range ? "" : o.unit), 1),
                  o.range ? (s(), i("small", Le, "含AI估算")) : h("", !0),
                  o.complete ? h("", !0) : (s(), i("small", qe, "数据不完整"))
                ]),
                t("td", null, [
                  f(a(o.reference ? `${y(M)(o.reference.value)} ${o.reference.unit} · ${o.reference.kind}` : "暂无适用参考"), 1),
                  o.ratio != null ? (s(), i("small", Pe, "参考量的 " + a(Math.round(o.ratio * 100)) + "%（非健康评分）", 1)) : h("", !0)
                ]),
                t("td", null, [
                  t("details", null, [
                    m[4] || (m[4] = t("summary", null, "查看依据", -1)),
                    t("p", null, a(o.known) + "项数据库值，" + a(o.estimatedCount || 0) + "项AI估算。", 1),
                    t("p", null, a(y(Q)(o)), 1),
                    o.missing.length ? (s(), i("p", He, "缺失：" + a(o.missing.join("、")), 1)) : h("", !0),
                    o.reference ? (s(), i("p", Qe, a(o.reference.source || o.reference.note || o.reference.kind) + "；" + a(o.reference.kind), 1)) : h("", !0)
                  ])
                ])
              ]))), 128))
            ])
          ])
        ]),
        m[7] || (m[7] = t("details", { class: "vb-intake-more" }, [
          t("summary", null, "查看参考依据与适用范围"),
          t("p", null, "成年人使用已登记的中国DRIs 2023公开表；未成年人使用Health Canada / NASEM参考表，不冒充中国DRIs。能量需求是公式估算，宏量比例是搭配示例；特殊生理阶段暂停通用目标。每100克食物成分先按确认的可食部克数换算；缺失宏量营养可显示AI单值估算，并与数据库值区分。"),
          t("p", null, "EAR为平均需要量，RNI/RDA用于规划膳食，AI为适宜摄入量，UL为最高可耐受摄入量，不能当作推荐目标。低于RNI不等于缺乏，低于AI无法据此判断不足。维生素E的α-生育酚与α-TE不直接比较。"),
          t("a", {
            href: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/assessment-summary.html",
            target: "_blank",
            rel: "noopener"
          }, "膳食评估原则"),
          f(" · "),
          t("a", {
            href: "https://www.cnsoc.org/drpostand/",
            target: "_blank",
            rel: "noopener"
          }, "中国DRIs公开参考表")
        ], -1)),
        H(Ee, {
          trend: n.value,
          metric: g.value,
          "end-date": u.value,
          days: l.value.length,
          "complete-days": e.value.length,
          mean: C.value,
          "onUpdate:metric": m[1] || (m[1] = (o) => g.value = o)
        }, null, 8, ["trend", "metric", "end-date", "days", "complete-days", "mean"])
      ], 64)),
      d.compact ? h("", !0) : (s(), i("p", We, "仅分析已记录食物，不作营养缺乏诊断。"))
    ]));
  }
}, Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ye as I,
  pe as _,
  ye as a,
  Ge as b
};
