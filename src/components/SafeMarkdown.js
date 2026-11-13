import {defineComponent, h} from 'vue';

// Render model text as Vue text nodes. Raw HTML is never interpreted.
export function safeLink(raw) {
  try {
    const url = new URL(raw.trim());
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function inline(text) {
  const nodes = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let start = 0, match;
  while ((match = pattern.exec(text))) {
    if (match.index > start) nodes.push(text.slice(start, match.index));
    if (match[1] !== undefined) {
      const href = safeLink(match[2]);
      nodes.push(href ? h('a', {href, target:'_blank', rel:'noopener noreferrer'}, match[1]) : match[0]);
    } else if (match[3] !== undefined) nodes.push(h('strong', null, match[3]));
    else nodes.push(h('code', null, match[4]));
    start = pattern.lastIndex;
  }
  if (start < text.length) nodes.push(text.slice(start));
  return nodes;
}

function tableCells(line) { return line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim()); }
function isDivider(line) { return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line); }

export function markdownNodes(source) {
  const lines = String(source || '').replace(/\r\n?/g, '\n').split('\n'), result = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const fence = line.match(/^\s*(```|~~~)([^`]*)$/);
    if (fence) {
      const code = [], language = fence[2].trim().replace(/[^a-z0-9_-]/gi, '').slice(0, 30);
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith(fence[1])) code.push(lines[i++]);
      if (i < lines.length) i++;
      result.push(h('pre', null, h('code', {class: language ? `language-${language}` : undefined}, code.join('\n'))));
      continue;
    }
    const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (heading) { result.push(h(`h${heading[1].length}`, null, inline(heading[2]))); i++; continue; }
    if (i + 1 < lines.length && line.includes('|') && isDivider(lines[i + 1])) {
      const headers = tableCells(line), rows = []; i += 2;
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) rows.push(tableCells(lines[i++]));
      result.push(h('div', {class:'vb-markdown-table-wrap'}, h('table', null, [
        h('thead', null, h('tr', null, headers.map(cell => h('th', null, inline(cell))))),
        h('tbody', null, rows.map(row => h('tr', null, headers.map((_, index) => h('td', null, inline(row[index] || ''))))))
      ])));
      continue;
    }
    const list = line.match(/^\s{0,3}(?:([-*+])|(\d+)\.)\s+(.+)$/);
    if (list) {
      const ordered = !!list[2], items = [];
      while (i < lines.length) {
        const item = lines[i].match(/^\s{0,3}(?:([-*+])|(\d+)\.)\s+(.+)$/);
        if (!item || !!item[2] !== ordered) break;
        items.push(h('li', null, inline(item[3]))); i++;
      }
      result.push(h(ordered ? 'ol' : 'ul', null, items)); continue;
    }
    const paragraph = [line]; i++;
    while (i < lines.length && lines[i].trim() && !/^\s{0,3}(?:#{1,6}\s|[-*+]\s|\d+\.\s|```|~~~)/.test(lines[i]) && !(i + 1 < lines.length && lines[i].includes('|') && isDivider(lines[i + 1]))) paragraph.push(lines[i++]);
    result.push(h('p', null, inline(paragraph.join('\n'))));
  }
  return result;
}

export default defineComponent({
  name:'SafeMarkdown',
  props:{content:{type:String,default:''}},
  setup(props) { return () => h('div', {class:'vb-safe-markdown'}, markdownNodes(props.content)); }
});
