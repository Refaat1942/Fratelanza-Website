// Builds print-ready PDFs (trim + 3 mm bleed + crop marks) for every marketing item, plus a presentation guide.
import path from 'node:path'
import { C, LOGO, ROOT, fontCss, renderPdf, closeBrowser, icon, info } from './lib.mjs'
import { designs, BLEED } from './designs.mjs'

const OUT = path.join(ROOT, 'output/print')
const base = `${fontCss()}*{box-sizing:border-box;margin:0;padding:0}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:'Plus Jakarta Sans','Tajawal',sans-serif}`
const artEl = (d, page, W, H, extra = '') =>
  `<div class="art" style="position:absolute;width:${W + 2 * BLEED}mm;height:${H + 2 * BLEED}mm;overflow:hidden;${d.round ? 'border-radius:50%;' : ''}${extra}">${page.html}</div>`

function marks(d, M, W, H) {
  const k = d.bigMarks ? 10 : 1 // marks scale for huge formats
  const len = 5 * k, gap = (BLEED + 1.5) * k
  const x0 = M, x1 = M + W, y0 = M, y1 = M + H
  const L = []
  const line = (a, b, c, e) => L.push(`<line x1="${a}" y1="${b}" x2="${c}" y2="${e}"/>`)
  if (d.round) {
    const cx = M + W / 2, cy = M + H / 2
    line(cx, y0 - gap - len, cx, y0 - gap); line(cx, y1 + gap, cx, y1 + gap + len)
    line(x0 - gap - len, cy, x0 - gap, cy); line(x1 + gap, cy, x1 + gap + len, cy)
  } else {
    for (const [x, sx] of [[x0, -1], [x1, 1]]) for (const [y, sy] of [[y0, -1], [y1, 1]]) {
      line(x, y + sy * gap, x, y + sy * (gap + len)); line(x + sx * gap, y, x + sx * (gap + len), y)
    }
    for (const fx of d.folds || []) { line(M + fx, y0 - gap - len, M + fx, y0 - gap); line(M + fx, y1 + gap, M + fx, y1 + gap + len) }
  }
  return `<svg style="position:absolute;inset:0;width:100%;height:100%;overflow:visible" viewBox="0 0 ${W + 2 * M} ${H + 2 * M}" preserveAspectRatio="none"><g stroke="#000" stroke-width="${0.25 * k}" fill="none">${L.join('')}</g></svg>`
}

async function buildDesign(d, idx) {
  const [W, H] = d.trim
  const M = d.bigMarks ? 120 : 15
  const pages = d.pages(W + 2 * BLEED, H + 2 * BLEED)
  const slugSize = d.bigMarks ? 44 : 5.2
  const body = pages.map((p) => `<section class="sheet" style="width:${W + 2 * M}mm;height:${H + 2 * M}mm">
      ${artEl(d, p, W, H, `left:${M - BLEED}mm;top:${M - BLEED}mm;`)}
      ${marks(d, M, W, H)}
      <div style="position:absolute;left:${d.bigMarks ? 30 : 2}mm;right:${d.bigMarks ? 30 : 2}mm;bottom:${d.bigMarks ? 20 : 1.2}mm;font:600 ${W < 100 ? 3.6 : slugSize}pt 'Plus Jakarta Sans';line-height:1.25;color:#444">Fratelanza · ${d.name.en} — ${p.label} · Trim ${W}×${H} mm · Bleed ${BLEED} mm</div>
    </section>`).join('')
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
    @page{size:${W + 2 * M}mm ${H + 2 * M}mm;margin:0}
    .sheet{position:relative;overflow:hidden;background:#fff;page-break-after:always}.sheet:last-child{page-break-after:auto}
    </style></head><body>${body}</body></html>`
  const file = `${String(idx + 1).padStart(2, '0')}-${d.id}.pdf`
  await renderPdf({ html, out: path.join(OUT, file), width: `${W + 2 * M}mm`, height: `${H + 2 * M}mm` })
}

// ---------- overview guide (A4 landscape) ----------
function guide() {
  const swatches = [
    ['Deep Navy', 'كحلي عميق', C.navy, '100 · 80 · 40 · 60'], ['Navy Light', 'كحلي فاتح', C.navy2, '95 · 70 · 30 · 30'],
    ['Brand Gold', 'ذهبي', C.gold, '15 · 40 · 90 · 5'], ['Soft Gold', 'ذهبي فاتح', C.goldLight, '5 · 12 · 50 · 0'],
    ['Teal', 'أخضر مزرق', C.cyan, '90 · 30 · 30 · 25'], ['Cyan', 'سماوي', C.cyanLight, '60 · 0 · 10 · 0'],
  ].map(([en, ar, hex, cmyk]) => `<div class="sw"><div style="background:${hex}"></div><b>${en} · ${ar}</b><span>${hex.toUpperCase()}</span><span>CMYK ≈ ${cmyk}</span></div>`).join('')
  const scaleFor = (d) => {
    const [W, H] = d.trim
    const n = Math.min(d.pages(1, 1).length, 2)
    const bw = (d.group === 'folder' ? 250 : 112) / n - (n - 1) * 3, bh = d.bigMarks ? 128 : d.group === 'folder' ? 110 : 46
    return Math.min(bw / (W + 2 * BLEED), bh / (H + 2 * BLEED))
  }
  const preview = (d) => {
    const [W, H] = d.trim, s = scaleFor(d)
    const pages = d.pages(W + 2 * BLEED, H + 2 * BLEED).slice(0, 2)
    const one = (p) => `<div class="pv"><div style="width:${(W + 2 * BLEED) * s}mm;height:${(H + 2 * BLEED) * s}mm;box-shadow:0 1.4mm 5mm rgba(10,31,58,.28);${d.round ? 'border-radius:50%;' : 'border-radius:.6mm;'}overflow:hidden"><div style="transform:scale(${s});transform-origin:0 0;width:${W + 2 * BLEED}mm;height:${H + 2 * BLEED}mm;position:relative;overflow:hidden">${p.html}</div></div><small>${p.label}</small></div>`
    return `<div class="pvs">${pages.map(one).join('')}</div>`
  }
  const cards = designs.map((d) => [d, `<article class="item ${d.group === 'folder' ? 'wide' : ''} ${d.bigMarks ? 'tall' : ''}"><header><h3>${d.name.en}</h3><h3 class="ar">${d.name.ar}</h3></header>${preview(d)}<p>${d.spec.en}</p><p class="ar">${d.spec.ar}</p></article>`])
  // paginate: folder alone, rollup alone, others 3 per page
  const chunks = []
  let buf = []
  for (const [d, c] of cards) {
    if (d.group === 'folder' || d.bigMarks) { if (buf.length) chunks.push(buf), (buf = []); chunks.push([c]) }
    else { buf.push(c); if (buf.length === 4) chunks.push(buf), (buf = []) }
  }
  if (buf.length) chunks.push(buf)
  const pages = chunks.map((ch, i) => `<section class="page"><div class="top"><img src="${LOGO}"><span>FRATELANZA · Print &amp; Marketing Design Pack · حزمة تصاميم المطبوعات والهدايا</span><b>${i + 3}</b></div><div class="grid ${ch.length === 1 ? 'one' : ''}">${ch.join('')}</div></section>`).join('')

  return `<!doctype html><html><head><meta charset="utf-8"><title>Fratelanza Print Design Pack</title><style>${base}
  @page{size:297mm 210mm;margin:0}
  .page{width:297mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;padding:14mm 14mm 10mm;background:#f5f8fb;display:flex;flex-direction:column}
  .dark{background:linear-gradient(150deg,${C.navy},${C.navy2} 60%,#0b3b5c);color:#fff}
  .top{display:flex;align-items:center;gap:3mm;font-size:8pt;color:${C.muted};font-weight:600;margin-bottom:5mm}.top img{width:8mm;height:8mm;border-radius:50%}.top b{margin-inline-start:auto;color:${C.cyan}}
  .grid{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:6mm;min-height:0}.grid.one{grid-template-columns:1fr;grid-template-rows:1fr}
  .item{background:#fff;border-radius:3mm;padding:4mm 5mm;border:.3mm solid ${C.line};display:flex;flex-direction:column;min-height:0;overflow:hidden}
  .item header{display:flex;justify-content:space-between;gap:4mm;align-items:baseline;margin-bottom:2.5mm}.item h3{font-size:9.5pt;color:${C.navy};font-weight:800}.item h3.ar,.ar{font-family:Tajawal;direction:rtl}
  .item p{font-size:6.6pt;color:${C.muted};line-height:1.45;margin-top:1mm}.item p.ar{font-size:7.4pt;text-align:right}
  .pvs{flex:1;display:flex;flex-wrap:wrap;gap:4mm;align-items:center;justify-content:center;background:linear-gradient(160deg,#eef4f9,#e4edf5);border-radius:2mm;padding:3mm;min-height:0;overflow:hidden}
  .pv{display:flex;flex-direction:column;align-items:center;gap:1.2mm}.pv small{font-size:5.6pt;color:${C.muted};font-weight:700}
  .cover{justify-content:center;align-items:center;text-align:center;padding:0}.cover img{width:70mm;height:70mm;border-radius:50%;box-shadow:0 0 0 1mm rgba(242,216,154,.7),0 8mm 24mm rgba(0,0,0,.4)}
  .cover h1{font-size:34pt;margin-top:10mm;font-weight:800}.cover h1 span{color:${C.goldLight}}.cover .ar{font-family:Tajawal;font-size:22pt;font-weight:800;margin-top:2mm;color:#c5d6e8}
  .cover p{margin-top:8mm;font-size:10pt;color:#c5d6e8;max-width:200mm}
  .brand{display:grid;grid-template-columns:1fr 1fr;gap:10mm}h2{font-size:20pt;color:${C.navy};font-weight:800}h2 small{font-family:Tajawal;font-size:16pt;margin-inline-start:4mm;color:${C.cyan}}
  .sws{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin-top:5mm}.sw div{height:20mm;border-radius:2mm;border:.3mm solid ${C.line}}.sw b{display:block;font-size:7.6pt;color:${C.navy};margin-top:1.5mm}.sw span{display:block;font-size:6.8pt;color:${C.muted}}
  .box{background:#fff;border:.3mm solid ${C.line};border-radius:3mm;padding:5mm;margin-top:5mm;font-size:8pt;color:#334155;line-height:1.55}.box b{color:${C.navy}}.box ul{margin:1.5mm 0 0 4mm}
  .box.ar{font-family:Tajawal;direction:rtl;font-size:9pt}.box.ar ul{margin:1.5mm 4mm 0 0}
  </style></head><body>
  <section class="page dark cover"><img src="${LOGO}"><h1>Print &amp; Marketing <span>Design Pack</span></h1><div class="ar">حزمة تصاميم المطبوعات والمواد التسويقية</div>
    <p>Print-ready artwork for folders, stationery, gifts and event materials — trim size, 3 mm bleed and crop marks included. · ملفات جاهزة للطباعة للفولدرات والأوراق الرسمية والهدايا ومواد الفعاليات بمقاس القص وهامش ٣ مم وعلامات القص.</p></section>
  <section class="page"><div class="top"><img src="${LOGO}"><span>FRATELANZA · Print &amp; Marketing Design Pack · حزمة تصاميم المطبوعات والهدايا</span><b>2</b></div>
    <div class="brand"><div><h2>Brand basics <small>أساسيات الهوية</small></h2><div class="sws">${swatches}</div>
      <div class="box"><b>Typography</b> — Plus Jakarta Sans (English) · Tajawal (Arabic). Titles ExtraBold, body Regular/Medium.<br><b>Slogan</b> — “Building Tomorrow Together” · «نبني الغد معاً».<br><b>Logo</b> — circular medallion; keep clear space equal to 10 % of its diameter, never stretch or recolour, place on navy or white only.</div></div>
    <div><h2>Printer notes <small>ملاحظات للمطبعة</small></h2>
      <div class="box"><b>Files</b><ul><li>Each PDF contains the item at real size: trim + 3 mm bleed on every side, crop marks and (for the folder) fold ticks in the margin.</li><li>Text and icons are vector; the logo medallion is a high-resolution raster (1152 px) — supply the original artwork file for large formats (roll-up, tote) to keep edges sharp.</li><li>Colours are RGB in the PDF. Convert to CMYK / Pantone at prepress — the CMYK values here are approximations; approve a physical proof before the run.</li><li>Gold areas: use gold foil or Pantone 7562 / 871 metallic where the spec says foil.</li></ul></div>
      <div class="box ar"><b>الملفات</b><ul><li>كل ملف PDF بالمقاس الحقيقي مع هامش قص ٣ مم وعلامات القص، وعلامات الطي للفولدر.</li><li>الألوان RGB داخل الملف، ويلزم تحويلها إلى CMYK أو بانتون في المطبعة؛ قيم CMYK هنا تقريبية، ويُنصح بطلب عينة (بروفة) قبل الطباعة.</li><li>المناطق الذهبية: فويل ذهبي أو بانتون ميتاليك حسب المواصفات.</li></ul></div></div></div></section>
  ${pages}
  </body></html>`
}

for (const [i, d] of designs.entries()) await buildDesign(d, i)
await renderPdf({ html: guide(), out: path.join(ROOT, 'output/Fratelanza-Print-Design-Guide.pdf'), width: '297mm', height: '210mm' })
await closeBrowser()
