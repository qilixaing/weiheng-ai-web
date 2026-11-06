import { zipSync as _, strToU8 as z } from "./browser-CJhYS1h6.js";
const j = (t) => String(t || "").replace(/\r\n?/g, `
`).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, ""), k = (t) => j(t).replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/__([^_]+)__/g, "$1").replace(/`([^`]+)`/g, "$1"), O = (t) => t.trim().replace(/^\|/, "").replace(/\|$/, "").split(new RegExp("(?<!\\\\)\\|")).map((o) => k(o.trim().replace(/\\\|/g, "|")));
function q(t, { title: o = "维衡 AI · 助手回复", question: p = "", generatedAt: n = (/* @__PURE__ */ new Date()).toISOString() } = {}) {
  const l = j(t).trim();
  if (!l) throw new Error("回复为空，暂时无法导出。");
  if (l.length > 1e5) throw new Error("内容过长，请分段导出。");
  const e = l.split(`
`), s = [];
  let f = !1;
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    if (/^\s*```/.test(a)) {
      f = !f;
      continue;
    }
    if (f) {
      s.push({ type: "code", text: a });
      continue;
    }
    if (!a.trim()) {
      s.push({ type: "space" });
      continue;
    }
    if (a.includes("|") && /^\s*\|?\s*:?-{3,}/.test(e[i + 1] || "")) {
      const w = [O(a)];
      for (i++; i + 1 < e.length && e[i + 1].includes("|") && e[i + 1].trim(); ) w.push(O(e[++i]));
      if (Math.max(...w.map((d) => d.length)) <= 8) s.push({ type: "table", rows: w });
      else for (const d of w) s.push({ type: "paragraph", text: d.join(" | ") });
      continue;
    }
    const c = a.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (c) {
      s.push({ type: "heading", level: c[1].length, text: k(c[2]) });
      continue;
    }
    if (/^\s*([-*_])\1{2,}\s*$/.test(a)) {
      s.push({ type: "space" });
      continue;
    }
    s.push({ type: "paragraph", text: k(a.replace(/^\s*[-*+]\s+/, "• ").replace(/^>\s?/, "")) });
  }
  return { title: j(o).slice(0, 100), question: j(p).slice(0, 1200), generatedAt: n, blocks: s };
}
const W = (t) => j(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"), R = (t, o = "Normal") => `<w:p><w:pPr><w:pStyle w:val="${o}"/></w:pPr><w:r><w:t xml:space="preserve">${W(t)}</w:t></w:r></w:p>`;
function G(t) {
  const o = Math.max(...t.map((n) => n.length)), p = Math.floor(9360 / o);
  return `<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders>${["top", "left", "bottom", "right", "insideH", "insideV"].map((n) => `<w:${n} w:val="single" w:sz="4" w:color="B9CFC3"/>`).join("")}</w:tblBorders></w:tblPr><w:tblGrid>${Array.from({ length: o }, () => `<w:gridCol w:w="${p}"/>`).join("")}</w:tblGrid>${t.map((n, l) => `<w:tr>${l === 0 ? "<w:trPr><w:tblHeader/></w:trPr>" : ""}${Array.from({ length: o }, (e, s) => `<w:tc><w:tcPr><w:tcW w:w="${p}" w:type="dxa"/>${l === 0 ? '<w:shd w:fill="E5F0E9"/>' : ""}</w:tcPr>${R(n[s] || "")}</w:tc>`).join("")}</w:tr>`).join("")}</w:tbl>`;
}
function Q(t) {
  const p = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${R(t.title, "Title") + R("导出日期：" + t.generatedAt.slice(0, 10), "Subtitle") + (t.question ? R("提问：" + t.question, "Question") : "") + t.blocks.map((e) => e.type === "table" ? G(e.rows) : R(e.text || "", e.type === "heading" ? "Heading" + Math.min(e.level, 3) : e.type === "code" ? "Code" : "Normal")).join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1080" w:bottom="1080" w:left="1273" w:right="1273"/></w:sectPr></w:body></w:document>`, n = `<?xml version="1.0" encoding="UTF-8"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Microsoft YaHei"/><w:sz w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="320" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>${[["Normal", 22, "253D33"], ["Title", 36, "234A37"], ["Subtitle", 19, "61766C"], ["Question", 21, "526A5E"], ["Heading1", 30, "234A37"], ["Heading2", 26, "234A37"], ["Heading3", 23, "234A37"], ["Code", 20, "35433B"]].map(([e, s, f]) => `<w:style w:type="paragraph" w:styleId="${e}"><w:name w:val="${e}"/>${e === "Normal" ? "" : '<w:basedOn w:val="Normal"/>'}${String(e).startsWith("Heading") ? '<w:pPr><w:keepNext/><w:spacing w:before="240" w:after="120"/></w:pPr>' : ""}<w:rPr><w:sz w:val="${s}"/><w:color w:val="${f}"/>${e === "Title" || String(e).startsWith("Heading") ? "<w:b/>" : ""}</w:rPr></w:style>`).join("")}</w:styles>`;
  return _(Object.fromEntries(Object.entries({
    "[Content_Types].xml": '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>',
    "_rels/.rels": '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    "word/_rels/document.xml.rels": '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
    "word/document.xml": p,
    "word/styles.xml": n
  }).map(([e, s]) => [e, z(s)])), { level: 6 });
}
const K = new TextEncoder(), u = (t) => K.encode(t);
function X(t) {
  if (!t.length) throw new Error("没有可导出的页面。");
  const o = [null, null], p = [];
  for (const i of t) {
    const a = o.length + 1, c = a + 1, w = a + 2;
    p.push(a + " 0 R");
    const d = u("q 595.28 0 0 841.89 0 0 cm /Im0 Do Q");
    o.push(u(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ${c} 0 R >> >> /Contents ${w} 0 R >>`)), o.push([u(`<< /Type /XObject /Subtype /Image /Width ${i.width} /Height ${i.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${i.jpeg.length} >>
stream
`), i.jpeg, u(`
endstream`)]), o.push([u(`<< /Length ${d.length} >>
stream
`), d, u(`
endstream`)]);
  }
  o[0] = u("<< /Type /Catalog /Pages 2 0 R >>"), o[1] = u(`<< /Type /Pages /Count ${t.length} /Kids [${p.join(" ")}] >>`);
  const n = [u(`%PDF-1.4
% binary
`)], l = [0];
  let e = n[0].length;
  o.forEach((i, a) => {
    l.push(e);
    const c = [u(`${a + 1} 0 obj
`), ...Array.isArray(i) ? i : [i], u(`
endobj
`)];
    for (const w of c)
      n.push(w), e += w.length;
  }), n.push(u(`xref
0 ${o.length + 1}
0000000000 65535 f 
${l.slice(1).map((i) => String(i).padStart(10, "0") + ` 00000 n 
`).join("")}trailer
<< /Size ${o.length + 1} /Root 1 0 R >>
startxref
${e}
%%EOF
`));
  const s = new Uint8Array(n.reduce((i, a) => i + a.length, 0));
  let f = 0;
  for (const i of n)
    s.set(i, f), f += i.length;
  return s;
}
const U = '"Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif';
function I(t, o, p) {
  const n = [];
  for (const l of String(o).split(`
`)) {
    let e = "";
    for (const s of l)
      e && t.measureText(e + s).width > p && (n.push(e), e = ""), e += s;
    n.push(e);
  }
  return n;
}
async function Y(t, o) {
  if (typeof t.encode == "function") return new Uint8Array(await t.encode(o === "image/jpeg" ? "jpeg" : "png"));
  const p = await new Promise((n, l) => t.toBlob((e) => e ? n(e) : l(new Error("图片生成失败，请重试。")), o, 0.92));
  return new Uint8Array(await p.arrayBuffer());
}
async function J(t, { format: o = "pdf", canvasFactory: p = (n, l) => {
  const e = document.createElement("canvas");
  return e.width = n, e.height = l, e;
} } = {}) {
  typeof document < "u" && document.fonts && await document.fonts.ready;
  const n = 1120, l = o === "png" ? 7600 : 1584, e = 76, s = l - 84, f = [];
  let i, a, c;
  function w(r = 24, m = !1, g = "#263E33") {
    a.font = `${m ? "600 " : ""}${r}px ${U}`, a.fillStyle = g, a.textBaseline = "top";
  }
  function d() {
    if (i = p(n, l), a = i.getContext("2d"), !a) throw new Error("浏览器暂不支持文档绘制。");
    a.fillStyle = "#fff", a.fillRect(0, 0, n, l), w(19, !1, "#667B70"), a.fillText("维衡 AI 助手", e, 30), a.fillText(t.generatedAt.slice(0, 10), n - e - 125, 30), c = 92;
  }
  async function E() {
    if (f.length >= 100) throw new Error("内容过长，请分段导出。");
    let r = i, m = l;
    o === "png" && (m = Math.min(l, Math.max(280, Math.ceil(c + 82))), r = p(n, m), r.getContext("2d").drawImage(i, 0, 0));
    const g = r.getContext("2d");
    g.font = `18px ${U}`, g.fillStyle = "#74877C", g.fillText("维衡 AI · 导出内容与当前回复一致", e, m - 40), g.fillText(String(f.length + 1), n - e - 20, m - 40);
    const x = await Y(r, o === "png" ? "image/png" : "image/jpeg");
    f.push(o === "png" ? { bytes: x, width: n, height: m } : { jpeg: x, width: n, height: m }), i.width = 1, i.height = 1, r !== i && (r.width = 1, r.height = 1), await new Promise((P) => setTimeout(P, 0));
  }
  async function H(r) {
    c + r > s && (await E(), d());
  }
  async function M(r, m = 24, g = !1, x = "#263E33") {
    w(m, g, x);
    const P = I(a, r, n - e * 2), y = Math.ceil(m * 1.5);
    for (const A of P)
      await H(y), w(m, g, x), a.fillText(A, e, c), c += y;
    c += 10;
  }
  async function L(r) {
    const m = Math.max(...r.map((h) => h.length)), g = n - e * 2, x = m > 2 && r.every((h) => String(h[0] || "").length <= 7), P = x ? 120 : g / m, y = Array.from({ length: m }, (h, b) => b === 0 ? P : (g - P) / (m - 1));
    m === 1 && (y[0] = g);
    async function A(h, b) {
      w(22, b);
      const F = y.map(($, v) => I(a, h[v] || "", $ - 22));
      let T = 0, B = Math.max(...F.map(($) => $.length));
      for (; T < B; ) {
        await H(58);
        let $ = Math.min(B - T, Math.max(1, Math.floor((s - c - 18) / 33))), v = $ * 33 + 18, D = e;
        for (let C = 0; C < m; C++) {
          a.fillStyle = b ? "#E7F1EB" : "#FFFFFF", a.fillRect(D, c, y[C], v), a.strokeStyle = "#BBCFC2", a.lineWidth = 1, a.strokeRect(D, c, y[C], v), w(22, b);
          for (let S = 0; S < $; S++) F[C][T + S] !== void 0 && a.fillText(F[C][T + S], D + 11, c + 9 + S * 33);
          D += y[C];
        }
        c += v, T += $, T < B && (await E(), d());
      }
    }
    const N = Math.max(...r[0].map((h, b) => (w(22, !0), I(a, h, y[b] - 22).length))) * 33 + 18;
    for (let h = 0; h < r.length; h++)
      h > 0 && c + 90 > s && (await E(), d(), N < 220 && await A(r[0], !0)), await A(r[h], h === 0);
    c += 20;
  }
  d(), await M(t.title, 40, !0, "#234A37"), t.question && await M("提问：" + t.question, 21, !1, "#5A7064");
  for (const r of t.blocks)
    r.type === "table" ? await L(r.rows) : r.type === "space" ? c < s - 20 && (c += 12) : await M(r.text || "", r.type === "heading" ? Math.max(26, 35 - r.level * 2) : r.type === "code" ? 21 : 24, r.type === "heading");
  return await E(), f;
}
async function Z(t, o, p = {}) {
  const n = q(o, p), l = "维衡AI-" + n.generatedAt.slice(0, 10);
  if (t === "docx") return { bytes: Q(n), mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename: l + ".docx" };
  if (!["pdf", "png"].includes(t)) throw new Error("暂不支持这个导出格式。");
  const e = await J(n, { format: t, ...p });
  return t === "pdf" ? { bytes: X(e), mime: "application/pdf", filename: l + ".pdf" } : e.length === 1 ? { bytes: e[0].bytes, mime: "image/png", filename: l + ".png" } : { bytes: _(Object.fromEntries(e.map((s, f) => [`${l}-${f + 1}.png`, s.bytes])), { level: 0 }), mime: "application/zip", filename: l + "-图片.zip", pageCount: e.length };
}
function ee(t) {
  const o = new Blob([t.bytes], { type: t.mime }), p = URL.createObjectURL(o), n = document.createElement("a");
  n.href = p, n.download = t.filename, n.rel = "noopener", document.body.append(n), n.click(), n.remove(), setTimeout(() => URL.revokeObjectURL(p), 6e4);
}
function te(t) {
  const o = new Blob([t.bytes], { type: t.mime });
  return { url: URL.createObjectURL(o), filename: t.filename, size: o.size, mime: t.mime, pageCount: t.pageCount };
}
export {
  Z as createChatExport,
  ee as downloadChatExport,
  te as preparedChatDownload
};
