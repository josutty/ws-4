/* global document, getComputedStyle, innerHeight, innerWidth -- functions passed to page.evaluate run in the browser */
// Design fidelity tool (agent-docs/rules/design-fidelity.md). Renders in a real browser (Playwright).
//   node tools/design-spec.mjs extract <design.html[#screen-id]> [--out analysis/design-spec]
//   node tools/design-spec.mjs compare <design.html[#screen-id]> <url | /route> [--start] [--out plan/design-diff]
// `#screen-id`: one screen inside a prototype file that holds several (e.g. dealer.html#login) — only that
// element is shown and measured. Severities: content / rule / layout block; style needs a reason; data = info.
// `--start` runs the dev server in mock mode for the comparison. Browser: `npx playwright install chromium`
// (or set CHROMIUM_PATH). Exit code 1 when compare finds mismatches beyond tolerance.
import { chromium } from '@playwright/test';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const argv = process.argv.slice(2); const [cmd] = argv; const rest = argv.slice(1); // flags may come anywhere
const flag = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const positional = []; for (let i = 1; i < argv.length; i++) { if (argv[i] === '--out') i++; else if (!argv[i].startsWith('--')) positional.push(argv[i]); }
const [a, b] = positional;
const VIEWPORT = { width: 1440, height: 900 };

async function open(browser, target) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  await page.goto(/^https?:/.test(target) ? target : pathToFileURL(resolve(target)).href, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  return page;
}

const splitTarget = (t) => { if (/^https?:/.test(t)) return [t, null]; const i = t.indexOf('#'); return i < 0 ? [t, null] : [t.slice(0, i), `#${t.slice(i + 1)}`]; };
const screenName = (t) => { const [f, sc] = splitTarget(t); return `${basename(f, '.html')}${sc ? `-${sc.slice(1)}` : ''}`; };

// Runs inside the page: show only the scoped screen (its siblings hidden, it and its ancestors forced visible).
function showOnly(sel) {
  const el = document.querySelector(sel);
  if (!el) throw new Error(`screen ${sel} not found in the design file`);
  for (const sib of el.parentElement?.children ?? []) if (sib !== el && !['SCRIPT', 'STYLE', 'TEMPLATE'].includes(sib.tagName)) sib.style.setProperty('display', 'none', 'important');
  for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
    n.hidden = false;
    if (getComputedStyle(n).display === 'none') n.style.setProperty('display', 'block', 'important');
  }
}

// Runs inside the page: returns the spec of the first data table + controls + palette + page layout + texts.
function readSpec(scope) {
  const root = (scope && document.querySelector(scope)) || document.body;
  const px = (v) => Math.round(parseFloat(v) * 10) / 10 || 0;
  const style = (el) => {
    const s = getComputedStyle(el);
    return { fontFamily: s.fontFamily.split(',')[0].replace(/["']/g, '').trim(), fontSize: px(s.fontSize), fontWeight: Number(s.fontWeight),
      color: s.color, background: s.backgroundColor, textAlign: s.textAlign, textTransform: s.textTransform,
      letterSpacing: s.letterSpacing === 'normal' ? 0 : px(s.letterSpacing), whiteSpace: s.whiteSpace,
      paddingX: px(s.paddingLeft), paddingY: px(s.paddingTop), borderRight: px(s.borderRightWidth) ? s.borderRightColor : 'none',
      borderRadius: px(s.borderTopLeftRadius), position: s.position, deco: decoOf(el), bgImage: gradientOf(el)?.raw ?? null };
  };
  const text = (el) => (el.innerText ?? el.textContent ?? '').replace(/\s+/g, ' ').trim();
  const parseRgb = (c) => { const m = (c ?? '').match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[,\s/]+/).filter(Boolean).map(Number); return { r: v[0], g: v[1], b: v[2], a: v[3] ?? 1 }; };
  const where = (el) => (el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}${el.classList[0] ? `.${el.classList[0]}` : ''}`);
  const gradientOf = (el) => {   // gradients and background images live in background-image, NOT background-color
    const bi = getComputedStyle(el).backgroundImage; if (!bi || bi === 'none') return null;
    const g = bi.match(/^(linear|radial|conic)-gradient\(/);
    if (!g) return { type: 'image', stops: [], angle: null, raw: bi.slice(0, 80) };
    const ang = bi.match(/(-?[\d.]+)deg/);
    return { type: g[1], stops: [...bi.matchAll(/rgba?\([^)]*\)/g)].map((m) => m[0]), angle: ang ? Number(ang[1]) : null, raw: bi.slice(0, 200) };
  };
  const blend = (f, bg) => ({ r: f.r * f.a + bg.r * (1 - f.a), g: f.g * f.a + bg.g * (1 - f.a), b: f.b * f.a + bg.b * (1 - f.a), a: 1 });
  const effBg = (el) => {        // the colour really behind an element (gradients → average of their stops)
    for (let n = el; n; n = n.parentElement) {
      const g = gradientOf(n);
      if (g?.stops.length) { const cs = g.stops.map(parseRgb).filter(Boolean); const avg = (k) => cs.reduce((t, c) => t + c[k], 0) / cs.length; return { r: avg('r'), g: avg('g'), b: avg('b'), a: 1 }; }
      const c = parseRgb(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) return c.a >= 1 ? c : blend(c, effBg(n.parentElement));
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };
  const lum = (c) => { const f = (v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const contrastOn = (fgStr, el) => { const fg = parseRgb(fgStr); if (!fg) return 21; const bg = effBg(el); const l1 = lum(blend(fg, bg)), l2 = lum(bg); return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 10) / 10; };
  const decoOf = (el) => { for (let n = el; n && n !== document.documentElement; n = n.parentElement) { const s = getComputedStyle(n); if (/underline|line-through/.test(s.textDecorationLine)) return /line-through/.test(s.textDecorationLine) ? 'line-through' : 'underline'; if (s.display !== 'inline') break; } return 'none'; };
  const ownTextOf = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
  const out = { table: null, controls: [], decor: [], palette: {}, page: null, card: null, texts: [], inputs: [], gradients: [] };
  const table = [...root.querySelectorAll('table')].find((t) => t.getBoundingClientRect().width > 0) ?? null; // visible tables only
  if (table) {
    const headRows = [...table.querySelectorAll('thead tr')];
    const leafRow = headRows[headRows.length - 1];
    const groupRow = headRows.length > 1 ? headRows[0] : null;
    const firstBody = table.querySelector('tbody tr');
    const bodyRows = [...table.querySelectorAll('tbody tr')];
    const leaves = [...leafRow.children].map((th, i) => {
      const cells = bodyRows.map((r) => r.children[i]).filter(Boolean);
      const cell = cells[0];
      const valueEl = cell && (cell.querySelector('input, span, a') && !cell.querySelector('input') ? cell.querySelector('span, a') : cell);
      const colors = [...new Set(cells.map((c) => getComputedStyle(c.querySelector('span:not(.was)') ?? c).color))];
      const input = cell?.querySelector('input');
      const secondary = cell && [...cell.querySelectorAll('span, div, small')].find((e) => e !== valueEl && text(e) && input);
      return {
        label: text(th), width: Math.round(th.getBoundingClientRect().width), header: style(th),
        body: cell ? style(cell) : null, value: valueEl && valueEl !== cell ? style(valueEl) : null,
        conditionalColors: colors.length > 1 ? colors : [],
        emptyShownAs: cells.map((c) => text(c)).find((t) => /^[–—-]$/.test(t)) ?? null,
        input: input ? { ...style(input), width: Math.round(input.getBoundingClientRect().width), backgrounds: [...new Set(cells.map((c) => c.querySelector('input')).filter(Boolean).map((i) => getComputedStyle(i).backgroundColor))] } : null,
        secondary: secondary ? { sample: text(secondary), ...style(secondary) } : null,
        hasButton: cell ? [...cell.querySelectorAll('button')].map((x) => x.getAttribute('aria-label') ?? text(x))[0] ?? null : null,
      };
    });
    let col = 0;
    const groups = groupRow ? [...groupRow.children].map((th) => { const span = Number(th.getAttribute('colspan') ?? 1); const g = { label: text(th), from: col, span, style: style(th) }; col += span; return g; }) : [];
    out.table = { label: table.getAttribute('aria-label') ?? '', groups, leaves, rowHeight: firstBody ? Math.round(firstBody.getBoundingClientRect().height) : 0, headerRows: headRows.length };
  }
  for (const el of root.querySelectorAll('button, [role="button"], a[href], input[type="search"]')) { // links count as controls whether built as <a> or <button>
    if (el.closest('tbody') || !el.getBoundingClientRect().width) continue; // hidden screens' controls don't count
    const name = el.getAttribute('aria-label') ?? text(el) ?? el.getAttribute('placeholder');
    const group = el.closest('[role="group"], [role="radiogroup"], [role="toolbar"]');
    out.controls.push({ name: el.tagName === 'INPUT' ? `search: ${el.getAttribute('placeholder') ?? name}` : name,
      pressed: el.getAttribute('aria-pressed') ?? el.getAttribute('aria-checked') ?? el.getAttribute('data-state'), popup: el.getAttribute('aria-haspopup'), contrast: contrastOn(getComputedStyle(el).color, el), cy: Math.round(el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2),
      inGroup: group?.getAttribute('aria-label') ?? null, height: Math.round(el.getBoundingClientRect().height), ...style(el) });
  }
  // decorated elements outside tables: chips, badges, bars (own background, short text)
  for (const el of root.querySelectorAll('*')) {
    if (el.closest('table, button, input, [role="menu"]') || ['BUTTON', 'INPUT'].includes(el.tagName)) continue;
    const s = getComputedStyle(el); const t = text(el);
    if (/rgba\(0, 0, 0, 0\)/.test(s.backgroundColor) || s.backgroundColor === 'rgb(255, 255, 255)' || !t || t.length > 40) continue;
    out.decor.push({ text: t, background: s.backgroundColor, color: s.color, radius: px(s.borderTopLeftRadius), fontSize: px(s.fontSize) });
  }
  for (const el of root.querySelectorAll('*')) {
    const s = getComputedStyle(el);
    for (const c of [s.color, s.backgroundColor, s.borderTopColor]) if (!/rgba\(0, 0, 0, 0\)/.test(c)) out.palette[c] = (out.palette[c] ?? 0) + 1;
  }
  const seenG = new Set();
  for (let n = root; n; n = n.parentElement) { /* the screen element AND what it sits in */ const g = gradientOf(n); if (g && !seenG.has(where(n))) { seenG.add(where(n)); out.gradients.push({ where: where(n), ...g }); } }
  for (const n of root.querySelectorAll('*')) { const g = gradientOf(n); if (g && !seenG.has(where(n))) { seenG.add(where(n)); out.gradients.push({ where: where(n), ...g }); } }
  for (const g of out.gradients) for (const c of g.stops) out.palette[c] = (out.palette[c] ?? 0) + 1;
  // ── page level: what is behind everything, the main card/panel, where each text sits ──
  const transparent = (c) => !c || /rgba\(0, 0, 0, 0\)|transparent/.test(c);
  const bgOf = (el) => { const c = effBg(el); return `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`; }; // gradient-aware: what is really behind it
  const probe = document.elementFromPoint(3, Math.round(innerHeight / 2)) ?? document.body; let pg = null, pc = null;
  for (let n = probe; n; n = n.parentElement) { if (!pg) { const g = gradientOf(n); if (g) pg = { ...g, on: where(n) }; } if (!pc) { const c = getComputedStyle(n).backgroundColor; if (!transparent(c)) pc = c; } if (pg && pc) break; }
  out.page = { background: pc ?? 'rgb(255, 255, 255)', gradient: pg };
  let card = null;
  for (const el of root.querySelectorAll('div, section, form, main, article')) {
    if (el.closest('table')) continue;
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (transparent(s.backgroundColor) || r.width < 240 || r.height < 120) continue;
    if (bgOf(el.parentElement ?? document.body) === s.backgroundColor) continue; // same as behind it → not a panel
    if (px(s.borderTopLeftRadius) < 4 && s.boxShadow === 'none') continue;
    if (!card || r.width * r.height > card.area) card = { el, area: r.width * r.height, background: s.backgroundColor, radius: px(s.borderTopLeftRadius), width: Math.round(r.width), centered: Math.abs(r.left - (innerWidth - r.right)) <= 16 };
  }
  out.card = card ? { background: card.background, radius: card.radius, width: card.width, centered: card.centered } : null;
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const texts = [];
  for (const el of root.querySelectorAll('*')) {
    if (['SCRIPT', 'STYLE', 'OPTION'].includes(el.tagName) || el.closest('table, button, a[href], select, [role="menu"]') || !ownText(el)) continue;
    const rr = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => { const g = document.createRange(); g.selectNodeContents(n); return g.getBoundingClientRect(); });
    const r = { left: Math.min(...rr.map((x) => x.left)), right: Math.max(...rr.map((x) => x.right)), top: Math.min(...rr.map((x) => x.top)), bottom: Math.max(...rr.map((x) => x.bottom)) }; r.width = r.right - r.left; r.height = r.bottom - r.top;
    if (r.width <= 1 || r.height <= 1) continue; // invisible or screen-reader-only
    let c = el; while (c.parentElement && c.getBoundingClientRect().width < r.width + 16) c = c.parentElement;
    const cr = c.getBoundingClientRect(); const lg = r.left - cr.left, rg = cr.right - r.right; const s = getComputedStyle(el);
    texts.push({ el, mixed: [...el.children].some((ch) => (ch.textContent ?? '').trim()), text: ownTextOf(el).slice(0, 80), deco: decoOf(el), contrast: contrastOn(s.color, el), inCard: !!card && card.el.contains(el), align: [...el.children].some((ch) => (ch.textContent ?? '').trim()) ? 'mixed' : Math.abs(lg - rg) <= 8 ? 'center' : lg < rg ? 'left' : 'right',
      cy: Math.round(r.top + r.height / 2), fontSize: px(s.fontSize), fontWeight: Number(s.fontWeight), color: s.color });
  }
  for (const t of texts) { const p = texts.find((o) => o !== t && Math.abs(o.cy - t.cy) <= 4 && !o.el.contains(t.el) && !t.el.contains(o.el)); t.row = p ? p.text : null; }
  for (const c of out.controls) { const t = texts.find((o) => o.text && Math.abs(o.cy - c.cy) <= 4); c.row = t ? t.text : null; }
  out.texts = texts.map((t) => ({ text: t.text, deco: t.deco, contrast: t.contrast, inCard: t.inCard, align: t.align, cy: t.cy, row: t.row, fontSize: t.fontSize, fontWeight: t.fontWeight, color: t.color }));
  out.inputs = [...root.querySelectorAll('input:not([type="hidden"]):not([type="search"]), select, textarea')].filter((el) => !el.closest('table')).map((el) => {
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { name: (el.labels?.[0] ? ownTextOf(el.labels[0]) : null) ?? el.getAttribute('aria-label') ?? el.getAttribute('placeholder') ?? el.type,
      background: s.backgroundColor, border: px(s.borderTopWidth) ? s.borderTopColor : 'none', radius: px(s.borderTopLeftRadius), height: Math.round(r.height), fontSize: px(s.fontSize) };
  });
  return out;
}

// one browser per page: robust everywhere (and required by some sandboxed Chromium builds)
async function snapshot(target, shot) {
  const browser = await launch();
  const [file, scope] = splitTarget(target);
  try {
    const page = await open(browser, file);
    if (scope) { await page.evaluate(showOnly, scope); await page.waitForTimeout(100); }
    const spec = await page.evaluate(readSpec, scope);
    if (shot) await page.screenshot({ path: shot, fullPage: true });
    return spec;
  }
  finally { await browser.close(); }
}
const launch = () => chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: process.env.CHROMIUM_PATH ? ['--no-sandbox', '--single-process', '--no-zygote'] : [] });

function toMarkdown(name, spec) {
  const t = spec.table; const L = [`# Design spec — ${name}`, '', '_Generated by tools/design-spec.mjs from the rendered design. Copy labels and order EXACTLY._', ''];
  if (t) {
    L.push(`## Table "${t.label}" — ${t.headerRows} header rows, row height ${t.rowHeight}px`, '');
    if (t.groups.length) L.push('Group headers: ' + t.groups.map((g) => `${g.label ? `"${g.label}"` : '(empty)'}×${g.span}`).join(' · ') + `  — style ${g0(t.groups)}`, '');
    L.push('| # | Label | Width | Header | Body align / font | Value colors | Empty shown as | Extra |', '|---|---|---|---|---|---|---|---|');
    t.leaves.forEach((c, i) => L.push(`| ${i + 1} | "${c.label}" | ${c.width}px | ${c.header.fontSize}px/${c.header.fontWeight}${c.header.textTransform !== 'none' ? ' ' + c.header.textTransform : ''} | ${c.body ? `${c.body.textAlign} ${c.body.fontFamily} ${c.body.fontSize}px/${c.body.fontWeight} ${c.body.color}${c.body.position === 'sticky' ? ' **sticky**' : ''} nowrap=${c.body.whiteSpace === 'nowrap'}` : '—'} | ${c.conditionalColors.length ? 'CONDITIONAL: ' + c.conditionalColors.join(', ') : c.value ? c.value.color : '—'} | ${c.emptyShownAs ?? '—'} | ${[c.input && `input ${c.input.width}px ${c.input.fontSize}px r${c.input.borderRadius}`, c.secondary && `secondary "${c.secondary.sample}" ${c.secondary.fontSize}px ${c.secondary.color}`, c.hasButton && `button "${c.hasButton}"`].filter(Boolean).join('; ') || '—'} |`));
    L.push('', `Cell padding ${t.leaves[0]?.body?.paddingY}px × ${t.leaves[0]?.body?.paddingX}px · vertical lines: ${t.leaves[0]?.body?.borderRight}`, '');
  }
  L.push('## Controls (outside the table)', '', '| Name | Group | State | Popup | Font | Colors | Border/radius | Height |', '|---|---|---|---|---|---|---|---|');
  for (const c of spec.controls) L.push(`| "${c.name}" | ${c.inGroup ?? '—'} | ${c.pressed ?? '—'} | ${c.popup ?? '—'} | ${c.fontSize}px/${c.fontWeight}${c.deco !== 'none' ? ` ${c.deco}` : ''} | ${c.color} on ${c.background}${c.bgImage ? ` (${c.bgImage.slice(0, 40)}…)` : ''} | ${c.borderRight} r${c.borderRadius} | ${c.height}px |`);
  L.push('', '## Decorated elements (chips, badges, bars)', '', ...(spec.decor ?? []).map((x) => `- "${x.text}" — ${x.background} text ${x.color} ${x.fontSize}px r${x.radius}`));
  if (spec.page) { const g = spec.page.gradient; L.push('', '## Page', '', `Page background: ${g ? `**${g.type === 'image' ? 'image' : 'gradient'}** on ${g.on} — ${g.type}${g.angle !== null ? ` ${g.angle}deg` : ''} ${g.stops.join(' → ') || g.raw} (flat colour behind it: ${spec.page.background})` : spec.page.background}` + (spec.card ? ` · main card ${spec.card.background}, radius ${spec.card.radius}px, ${spec.card.width}px wide, ${spec.card.centered ? 'centered' : 'not centered'}` : ' · no card/panel')); }
  if (spec.gradients?.length) L.push('', '## Gradients and background images (one token each — never approximate with a flat colour)', '', ...spec.gradients.map((g) => `- ${g.where}: ${g.type}${g.angle !== null ? ` ${g.angle}deg` : ''} ${g.stops.join(' → ') || g.raw}`));
  if (spec.texts?.length) { L.push('', '## Texts (copy exactly; placement matters)', '', '| Text | Where | Align | Same line as | Font | Color | Decoration | Contrast |', '|---|---|---|---|---|---|---|---|');
    for (const t of spec.texts) L.push(`| "${t.text}" | ${spec.card ? (t.inCard ? 'in card' : 'on page') : '—'} | ${t.align} | ${t.row ? `"${t.row.slice(0, 30)}"` : '—'} | ${t.fontSize}px/${t.fontWeight} | ${t.color} | ${t.deco} | ${t.contrast}:1 |`); }
  if (spec.inputs?.length) { L.push('', '## Inputs', '', '| Field | Background | Border | Radius | Height |', '|---|---|---|---|---|');
    for (const i of spec.inputs) L.push(`| "${i.name}" | ${i.background} | ${i.border} | ${i.radius}px | ${i.height}px |`); }
  L.push('', '## Palette (color → uses)', '', Object.entries(spec.palette).sort((x, y) => y[1] - x[1]).map(([c, n]) => `${c} ×${n}`).join(' · '), '');
  return L.join('\n');
}
const g0 = (gs) => { const s = gs.find((g) => g.label)?.style; return s ? `${s.fontSize}px/${s.fontWeight} ${s.textTransform} spacing ${s.letterSpacing}px ${s.color}` : '—'; };

// ── compare: only design properties, never data values ──
const near = (x, y, tol) => Math.abs((x ?? 0) - (y ?? 0)) <= tol;
const rgb = (c) => (c?.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
const colorDist = (x, y) => { const p = rgb(x), q = rgb(y); return p.length === 3 && q.length === 3 ? Math.max(...p.map((v, i) => Math.abs(v - q[i]))) : 0; };
const dsev = (x, y) => { const dist = colorDist(x, y); return dist <= 12 ? null : dist <= 40 ? 'style' : 'look'; }; // small shifts need a reason, big ones are a different look
const sameColor = (x, y) => { const p = rgb(x), q = rgb(y); return p.length === 3 && q.length === 3 && p.every((v, i) => Math.abs(v - q[i]) <= 12); };
function diff(d, b) {
  const m = []; const add = (severity, where, what, design, build) => m.push({ severity, where, what, design, build });
  if (!d.table || !b.table) { if (d.table) add('content', 'table', 'missing', 'present', 'absent'); }
  else {
    const dl = d.table.leaves.map((c) => c.label), bl = b.table.leaves.map((c) => c.label);
    if (dl.join('|') !== bl.join('|')) add('content', 'table', 'columns (order + labels)', dl.join(' · '), bl.join(' · '));
    const dg = d.table.groups.map((g) => `${g.label}×${g.span}`).join(' · '), bg = b.table.groups.map((g) => `${g.label}×${g.span}`).join(' · ');
    if (dg !== bg) add('content', 'table', 'group headers', dg, bg);
    if (!near(d.table.rowHeight, b.table.rowHeight, 4)) add('style', 'table', 'row height', `${d.table.rowHeight}px`, `${b.table.rowHeight}px`);
    for (const dc of d.table.leaves) {
      const bc = b.table.leaves.find((c) => c.label === dc.label); if (!bc) continue;
      const w = `column "${dc.label}"`;
      if (!near(dc.width, bc.width, Math.max(12, dc.width * 0.15))) add('style', w, 'width', `${dc.width}px`, `${bc.width}px`);
      for (const k of ['fontSize', 'fontWeight', 'textTransform']) if (String(dc.header[k]) !== String(bc.header[k])) add('style', w, `header ${k}`, dc.header[k], bc.header[k]);
      if (dc.body && bc.body) {
        for (const k of ['textAlign', 'whiteSpace', 'position', 'fontWeight']) if (String(dc.body[k]) !== String(bc.body[k])) add('style', w, `cell ${k}`, dc.body[k], bc.body[k]);
        if (!near(dc.body.fontSize, bc.body.fontSize, 0.5)) add('style', w, 'cell fontSize', dc.body.fontSize, bc.body.fontSize);
        if (/mono/i.test(dc.body.fontFamily) !== /mono/i.test(bc.body.fontFamily)) add('style', w, 'cell font family', dc.body.fontFamily, bc.body.fontFamily);
        if (!sameColor(dc.body.color, bc.body.color) && !dc.conditionalColors.length) add('style', w, 'cell color', dc.body.color, bc.body.color);
        if ((dc.body.borderRight === 'none') !== (bc.body.borderRight === 'none')) add('style', w, 'vertical line', dc.body.borderRight, bc.body.borderRight);
        if (!near(dc.body.paddingX, bc.body.paddingX, 2) || !near(dc.body.paddingY, bc.body.paddingY, 2)) add('style', w, 'cell padding', `${dc.body.paddingY}×${dc.body.paddingX}`, `${bc.body.paddingY}×${bc.body.paddingX}`);
      }
      if (dc.conditionalColors.length && bc.conditionalColors.length < 2) add('rule', w, 'conditional value colors', dc.conditionalColors.join(', '), bc.conditionalColors.join(', ') || 'none');
      if (dc.emptyShownAs && dc.emptyShownAs !== bc.emptyShownAs) add('rule', w, 'empty value shown as', dc.emptyShownAs, bc.emptyShownAs ?? '(not seen)');
      if (!!dc.input !== !!bc.input) add('content', w, 'editable input', !!dc.input, !!bc.input);
      if (dc.secondary && !bc.secondary) add('content', w, 'secondary text under value', dc.secondary.sample, 'missing');
      if (dc.hasButton && !bc.hasButton) add('content', w, 'button in cell', dc.hasButton, 'missing');
    }
  }
  for (const dd of d.decor ?? []) {
    const bd = (b.decor ?? []).find((x) => x.text.replace(/\d+/g, '#') === dd.text.replace(/\d+/g, '#'));
    if (!bd) { add('content', 'decorated element', `"${dd.text}"`, `${dd.background}`, 'missing'); continue; }
    if (!sameColor(dd.background, bd.background)) add('style', `"${dd.text}"`, 'background', dd.background, bd.background);
    if (!sameColor(dd.color, bd.color)) add('style', `"${dd.text}"`, 'text color', dd.color, bd.color);
  }
  if (d.table && b.table) for (const dc of d.table.leaves) {
    const bc = b.table.leaves.find((c) => c.label === dc.label);
    if (dc.input && bc?.input) { const extra = bc.input.backgrounds.filter((x) => !dc.input.backgrounds.some((y) => sameColor(x, y)));
      if (extra.length) add('rule', `column "${dc.label}"`, 'input background (state styling not in the design?)', dc.input.backgrounds.join(', '), bc.input.backgrounds.join(', ')); }
  }
  if (d.page && b.page) {
    const gd = d.page.gradient, gb = b.page.gradient, gs = (g) => `${g.type}${g.angle !== null ? ` ${g.angle}deg` : ''} ${g.stops.join(' → ') || g.raw}`;
    if (gd && !gb) add('look', 'page', 'background', `gradient ${gs(gd)}`, `flat ${b.page.background}`);
    else if (!gd && gb) add('look', 'page', 'background', `flat ${d.page.background}`, `gradient ${gs(gb)}`);
    else if (gd && gb) { const f = gd.stops.length && gb.stops.length ? dsev(gd.stops[0], gb.stops[0]) : null, l = gd.stops.length && gb.stops.length ? dsev(gd.stops.at(-1), gb.stops.at(-1)) : null; const sv = f === 'look' || l === 'look' ? 'look' : f || l; if (sv) add(sv, 'page', 'gradient colours', gs(gd), gs(gb)); if (gd.angle !== null && gb.angle !== null && Math.abs(gd.angle - gb.angle) > 25) add('style', 'page', 'gradient angle', `${gd.angle}deg`, `${gb.angle}deg`); }
    else { const sv = dsev(d.page.background, b.page.background); if (sv) add(sv, 'page', 'background', d.page.background, b.page.background); }
  }
  if (d.card && !b.card) add('layout', 'page', 'card / panel', `${d.card.background}, radius ${d.card.radius}px, ${d.card.width}px`, 'missing (no distinct panel)');
  if (d.card && b.card) {
    { const sv = dsev(d.card.background, b.card.background); if (sv) add(sv, 'card', 'background', d.card.background, b.card.background); }
    if (!near(d.card.radius, b.card.radius, 4)) add('style', 'card', 'corner radius', `${d.card.radius}px`, `${b.card.radius}px`);
    if (!near(d.card.width, b.card.width, Math.max(16, d.card.width * 0.1))) add('style', 'card', 'width', `${d.card.width}px`, `${b.card.width}px`);
    if (d.card.centered !== b.card.centered) add('layout', 'card', 'centered', d.card.centered, b.card.centered);
  }
  const key = (t) => (t ?? '').replace(/\d+/g, '#').toLowerCase();
  const used = new Set();
  for (const dt of d.texts ?? []) {
    const bt = (b.texts ?? []).find((x) => !used.has(x) && key(x.text) === key(dt.text));
    if (!bt) { add(/\d/.test(dt.text) ? 'data' : 'content', 'text', `"${dt.text}"`, 'present', 'missing'); continue; }
    used.add(bt);
    const w = `text "${dt.text.slice(0, 40)}"`;
    if (d.card && b.card && dt.inCard !== bt.inCard) add('layout', w, 'placement', dt.inCard ? 'inside the card' : 'on the page, outside the card', bt.inCard ? 'inside the card' : 'outside the card');
    if (dt.align !== bt.align && dt.align !== 'mixed' && bt.align !== 'mixed') add('layout', w, 'alignment', dt.align, bt.align);
    if (dt.row) { const bp = (b.texts ?? []).find((x) => key(x.text) === key(dt.row)); if (bp && Math.abs(bp.cy - bt.cy) > 4) add('layout', w, `same line as "${dt.row.slice(0, 30)}"`, 'yes', 'no'); }
    if (!near(dt.fontSize, bt.fontSize, 0.5) || dt.fontWeight !== bt.fontWeight) add('style', w, 'font', `${dt.fontSize}px/${dt.fontWeight}`, `${bt.fontSize}px/${bt.fontWeight}`);
    { const sv = dsev(dt.color, bt.color); if (sv) add(sv, w, 'color', dt.color, bt.color); }
    if ((dt.deco ?? 'none') !== (bt.deco ?? 'none')) add('look', w, 'text decoration', dt.deco, bt.deco);
    if (bt.contrast < 1.6 && !(dt.contrast < 1.6)) add('look', w, 'text visibility (hard to see on its background)', `${dt.contrast}:1`, `${bt.contrast}:1`);
  }
  for (const bt of b.texts ?? []) if (!used.has(bt) && !(d.texts ?? []).some((x) => key(x.text) === key(bt.text))) add(/\d/.test(bt.text) ? 'data' : 'content', 'text', `extra "${bt.text.slice(0, 50)}"`, 'absent', 'present');
  for (const bt of b.texts ?? []) if (!used.has(bt) && bt.contrast < 1.6 && !(d.texts ?? []).some((x) => key(x.text) === key(bt.text))) add('look', `text "${bt.text.slice(0, 40)}"`, 'text visibility (hard to see on its background)', '—', `${bt.contrast}:1`);
  for (const di of d.inputs ?? []) {
    const bi = (b.inputs ?? []).find((x) => key(x.name) === key(di.name)); const w = `input "${di.name}"`;
    if (!bi) { add('content', w, 'field', 'present', 'missing'); continue; }
    { const sv = dsev(di.background, bi.background); if (sv) add(sv, w, 'background', di.background, bi.background); }
    if ((di.border === 'none') !== (bi.border === 'none')) add('style', w, 'border', di.border, bi.border);
    else if (di.border !== 'none') { const sv = dsev(di.border, bi.border); if (sv) add(sv, w, 'border colour', di.border, bi.border); }
    if (!near(di.radius, bi.radius, 2)) add('style', w, 'corner radius', `${di.radius}px`, `${bi.radius}px`);
    if (!near(di.height, bi.height, 4)) add('style', w, 'height', `${di.height}px`, `${bi.height}px`);
  }
  const norm = (n) => n.replace(/\s+/g, ' ').replace(/ for .*$/, '').trim().toLowerCase();
  for (const dc of d.controls) {
    const bc = b.controls.find((c) => norm(c.name) === norm(dc.name));
    if (!bc) { add('content', 'controls', `control "${dc.name}"`, 'present', 'missing'); continue; }
    const w = `control "${dc.name}"`;
    if ((dc.inGroup ?? '') !== (bc.inGroup ?? '') && dc.inGroup) add('content', w, 'grouped as', dc.inGroup, bc.inGroup ?? 'not grouped');
    if (dc.popup && !bc.popup) add('content', w, 'opens a menu', dc.popup, 'no');
    if (!near(dc.fontSize, bc.fontSize, 0.5) || dc.fontWeight !== bc.fontWeight) add('style', w, 'font', `${dc.fontSize}px/${dc.fontWeight}`, `${bc.fontSize}px/${bc.fontWeight}`);
    // rgb(0, 0, 0) on an input = the browser default (the design never set a color) → not a design decision
    { const sv = dsev(dc.color, bc.color); if (sv && !(dc.name.startsWith('search:') && dc.color === 'rgb(0, 0, 0)')) add(sv, w, 'text color', dc.color, bc.color); }
    if ((dc.deco ?? 'none') !== (bc.deco ?? 'none')) add('look', w, 'text decoration', dc.deco, bc.deco);
    if (dc.row) { const bt = (b.texts ?? []).find((x) => key(x.text) === key(dc.row)); if (bt && Math.abs(bt.cy - bc.cy) > 4) add('layout', w, `same line as "${dc.row.slice(0, 30)}"`, 'yes', 'no'); }
    if (bc.contrast < 1.6 && !(dc.contrast < 1.6)) add('look', w, 'text visibility (hard to see on its background)', `${dc.contrast}:1`, `${bc.contrast}:1`);
    { const sv = dsev(dc.background, bc.background); if (sv) add(sv, w, 'background', dc.background, bc.background); }
    if (!!dc.bgImage !== !!bc.bgImage) add('look', w, 'gradient / background image', dc.bgImage ?? 'none', bc.bgImage ?? 'none');
    if (!near(dc.height, bc.height, 4)) add('style', w, 'height', `${dc.height}px`, `${bc.height}px`);
  }
  for (const bc of b.controls) if (!d.controls.some((c) => norm(c.name) === norm(bc.name))) add('content', 'controls', `extra control "${bc.name}"`, 'absent', 'present');
  return m;
}

async function withServer(start, fn) {
  if (!start) return fn();
  const port = 5181;
  const child = spawn('npm', ['run', 'dev', '--', '--port', String(port), '--strictPort'], { env: { ...process.env, VITE_API_MODE: 'mock', VITE_API_BASE_URL: '' }, stdio: 'ignore', shell: process.platform === 'win32' });
  for (let i = 0; i < 60; i++) { try { await fetch(`http://localhost:${port}`); break; } catch { await new Promise((r) => setTimeout(r, 500)); } }
  try { return await fn(port); } finally { child.kill(); }
}

if (cmd === 'extract' && a) {
  const outDir = flag('--out', 'analysis/design-spec'); mkdirSync(outDir, { recursive: true });
  const spec = await snapshot(a);
  const name = screenName(a);
  writeFileSync(`${outDir}/${name}.json`, JSON.stringify(spec, null, 2)); writeFileSync(`${outDir}/${name}.md`, toMarkdown(name, spec));
  console.log(`wrote ${outDir}/${name}.md and .json — ${spec.table ? spec.table.leaves.length + ' columns, ' : ''}${spec.controls.length} controls`);
} else if (cmd === 'compare' && a && b) {
  const outDir = `${flag('--out', 'plan/design-diff')}/${screenName(a)}`; mkdirSync(outDir, { recursive: true });
  const result = await withServer(rest.includes('--start'), async (port) => {
    const url = /^https?:/.test(b) ? b : `http://localhost:${port ?? 5173}${b}`;
    const d = await snapshot(a, `${outDir}/design.png`);
    const bs = await snapshot(url, `${outDir}/build.png`);
    return diff(d, bs);
  });
  // differences the HUMAN accepted on purpose (plan/design-accepted.md: a line naming the place and the thing, e.g. `input "email" · border colour`)
  const accFile = 'plan/design-accepted.md';
  if (existsSync(accFile)) { const acc = readFileSync(accFile, 'utf8').toLowerCase().split('\n'); for (const r of result) if (['content', 'rule', 'layout', 'look'].includes(r.severity) && acc.some((l) => l.includes(r.where.toLowerCase()) && l.includes(r.what.toLowerCase()))) r.severity = 'accepted'; }
  const lines = ['| Severity | Where | What | Design | Build |', '|---|---|---|---|---|', ...result.map((r) => `| ${r.severity} | ${r.where} | ${r.what} | ${r.design} | ${r.build} |`)];
  writeFileSync(`${outDir}/differences.md`, `# Design vs build — ${a}\n\nBlocking: content, rule, layout, look. Style: needs a one-line reason. Data: sample values, information only. Accepted: listed in plan/design-accepted.md (only a human adds lines there).\n\nScreenshots: design.png, build.png\n\n${result.length ? lines.join('\n') : 'No differences beyond tolerance.'}\n`);
  const count = (s) => result.filter((r) => r.severity === s).length;
  const blocking = count('content') + count('rule') + count('layout') + count('look');
  console.log(`${result.length} difference(s): content ${count('content')}, rules ${count('rule')}, layout ${count('layout')}, look ${count('look')} (blocking: ${blocking}) · style ${count('style')} · data ${count('data')} · accepted ${count('accepted')} → ${outDir}/differences.md`);
  process.exit(blocking ? 1 : 0);
} else { console.error('usage: extract <design.html> | compare <design.html> <url|/route> [--start]'); process.exit(2); }
