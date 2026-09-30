// Print-ready artwork definitions. All dimensions in millimetres.
import { content as D, C, LOGO, icon, esc, info, qrTile } from './lib.mjs'

export const BLEED = 3
const brandGrad = `linear-gradient(150deg,${C.navy} 0%,${C.navy2} 60%,#0b3b5c 100%)`
const dots = (op = 0.1, col = '#ffffff') => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><g fill='none' stroke='${col}' stroke-width='.6' opacity='${op}'><path d='M0 30h18l6 6h12l6-6h18M30 0v18l6 6v12l-6 6v18'/><circle cx='30' cy='30' r='1.6' fill='${col}'/><circle cx='18' cy='30' r='1.2' fill='${col}'/><circle cx='42' cy='30' r='1.2' fill='${col}'/></g></svg>`
  return `background-image:url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}");background-size:14mm 14mm;`
}
const glow = `radial-gradient(circle at 85% 10%,rgba(34,211,238,.30),transparent 45%),radial-gradient(circle at 5% 100%,rgba(212,160,58,.26),transparent 42%)`
const navyBg = `background:${glow},${brandGrad};`
const goldText = `color:${C.goldLight}`
const slogan = { en: 'Building Tomorrow Together', ar: 'نبني الغد معاً' }
const tag = { en: 'Technology • ERP • AI • Cloud • Digital Transformation', ar: 'تقنية • ERP • ذكاء اصطناعي • سحابة • تحول رقمي' }
const lines = (dir = 'ltr', col = '#fff') => `
  <div style="direction:${dir};display:grid;gap:1.6mm;font-size:6.2pt;color:${col}">
    <div style="display:flex;gap:1.8mm;align-items:center">${icon('Mail', 8, C.gold)}<span dir="ltr">${info.email}</span></div>
    <div style="display:flex;gap:1.8mm;align-items:center">${icon('Phone', 8, C.gold)}<span dir="ltr">${info.phoneRaw}</span></div>
    <div style="display:flex;gap:1.8mm;align-items:center">${icon('Globe', 8, C.gold)}<span dir="ltr">${info.web}</span></div>
  </div>`
const abs = 'position:absolute;'
// content box inside trim (bleed offset + safe margin)
const box = (safe, inner, extra = '') => `<div style="${abs}inset:${BLEED + safe}mm;${extra}">${inner}</div>`
const logo = (mm, extra = '') => `<img src="${LOGO}" style="width:${mm}mm;height:${mm}mm;border-radius:50%;${extra}">`
const ring = `box-shadow:0 0 0 .5mm rgba(242,216,154,.75),0 1.5mm 5mm rgba(0,0,0,.35)`

// ---------- individual pieces ----------
const card = {
  id: 'business-card', group: 'stationery', name: { en: 'Business Card', ar: 'كارت شخصي' }, trim: [90, 50],
  spec: { en: '90 × 50 mm · 350 g matt art card · matt lamination + spot gold foil on logo ring', ar: '٩٠ × ٥٠ مم · ورق آرت مط ٣٥٠ جم · سلوفان مط + تذهيب (فويل) ذهبي على إطار الشعار' },
  pages: (W, H) => {
    const back = (nm, role, nmAr, roleAr) => `<div style="${abs}inset:0;background:#fff"></div><div style="${abs}left:0;right:0;top:0;height:${BLEED + 2}mm;background:${brandGrad}"></div><div style="${abs}left:0;right:0;bottom:0;height:${BLEED + 1.6}mm;background:linear-gradient(90deg,${C.gold},${C.cyanLight})"></div>` +
      box(5.5, `<div style="display:flex;flex-direction:column;justify-content:space-between;height:100%">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:.2mm solid ${C.line};padding-bottom:1.6mm"><div><div style="font-weight:800;font-size:9pt;color:${C.navy}">${nm}</div><div style="font-size:5.8pt;color:${C.cyan};font-weight:700">${role}</div></div><div style="font-family:Tajawal;text-align:right;direction:rtl"><div style="font-weight:800;font-size:10pt;color:${C.navy};line-height:1.2">${nmAr}</div><div style="font-size:6.6pt;color:${C.cyan};font-weight:700">${roleAr}</div></div></div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;color:${C.navy}">${lines('ltr', C.ink)}<div style="margin-bottom:-.6mm">${qrTile('card', 15, { border: false })}</div></div></div>`)
    const front = `<div style="${abs}inset:0;${navyBg}"></div><div style="${abs}inset:0;${dots(0.12)}"></div>` +
      box(6, `<div style="display:flex;align-items:center;gap:6mm;height:100%">${logo(30, ring)}<div style="color:#fff"><div style="font-weight:800;font-size:15pt;letter-spacing:.06em">FRATELANZA</div><div style="font-size:6.5pt;${goldText};margin-top:1mm;font-weight:600">${slogan.en}</div><div style="font-family:Tajawal;font-size:8pt;margin-top:.8mm;color:#c5d6e8">فراتيلانزا · ${slogan.ar}</div></div></div>`)
    return [
      { label: 'Front / الوجه', html: front },
      { label: 'Back — CEO', html: back('Dr. Ahmed Refaat', 'Founder &amp; CEO', 'د. أحمد رفعت', 'المؤسس والرئيس التنفيذي') },
      { label: 'Back — COO', html: back('Eng. Afnan Fathy', 'Chief Operating Officer', 'م. أفنان فتحي', 'مدير العمليات') },
      { label: 'Back — Template', html: back('Full Name', 'Job Title', 'الاسم الكامل', 'المسمى الوظيفي') },
    ]
  },
}

const folder = {
  id: 'contract-folder', group: 'folder', name: { en: 'Contract / Presentation Folder (A4, 2 pockets)', ar: 'فولدر العقود والعروض (A4 بجيبين)' },
  // flat: back 225 + spine 8 + front 225 = 458 wide, 310 tall (+ pocket flap on the bottom of inside pages handled by die-cut note)
  trim: [458, 310],
  spec: { en: 'Flat 458 × 310 mm · 350 g art board · gloss/matt lamination + spot UV & gold foil on logo · 2 inner pockets 90 mm high (die-cut, glued) · fits A4 + business card slit',
          ar: 'مفرود ٤٥٨ × ٣١٠ مم · كرتون آرت ٣٥٠ جم · سلوفان مط/لامع + سبوت يو في وفويل ذهبي على الشعار · جيبان داخليان ارتفاع ٩٠ مم (تكسير وتلصيق) · يتسع لـ A4 مع فتحة كارت' },
  folds: [225, 233], // x positions (mm from trim left) of the two spine folds
  pages: (W, H) => {
    const T = BLEED
    const back = `<div style="${abs}left:0;top:0;width:${T + 225}mm;height:100%;${navyBg}"></div><div style="${abs}left:0;top:0;width:${T + 225}mm;height:100%;${dots(0.09)}"></div>` +
      `<div style="${abs}left:${T + 25}mm;bottom:${T + 25}mm;width:175mm;color:#fff;direction:ltr"><div style="height:.6mm;width:24mm;background:${C.gold};margin-bottom:5mm"></div>
        <div style="font-size:9pt;${goldText};font-weight:700;letter-spacing:.16em">${slogan.en.toUpperCase()}</div>
        <div style="font-family:Tajawal;font-size:13pt;margin-top:2mm;color:#c5d6e8">${slogan.ar}</div>
        <div style="display:flex;gap:16mm;margin-top:10mm">${lines('ltr')}<div style="font-size:6.2pt;color:#c5d6e8;max-width:60mm;line-height:1.5">${D.company.address.en}<br><span style="font-family:Tajawal;font-size:7pt">${D.company.address.ar}</span></div></div></div>
      <div style="${abs}left:${T + 25 + 130}mm;bottom:${T + 25}mm;color:#fff;text-align:center;font-size:7pt">${qrTile('folder', 34)}<div style="font-family:Tajawal;font-size:8pt;margin-top:1mm;color:#c5d6e8">امسح للتواصل معنا</div></div>`
    const spine = `<div style="${abs}left:${T + 225}mm;top:0;width:8mm;height:100%;background:linear-gradient(180deg,${C.gold},${C.goldLight} 50%,${C.gold})"></div>` +
      `<div style="${abs}left:${T + 225}mm;top:0;width:8mm;height:100%;display:flex;align-items:center;justify-content:center"><div style="transform:rotate(-90deg);white-space:nowrap;font-weight:800;font-size:8pt;letter-spacing:.3em;color:${C.navy}">FRATELANZA · فراتيلانزا</div></div>`
    const front = `<div style="${abs}left:${T + 233}mm;top:0;right:0;height:100%;${navyBg}"></div><div style="${abs}left:${T + 233}mm;top:0;right:0;height:100%;${dots(0.09)}"></div>` +
      `<div style="${abs}left:${T + 233}mm;top:0;right:0;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center">
        ${logo(98, ring)}
        <div style="font-weight:800;font-size:30pt;letter-spacing:.1em;margin-top:14mm">FRATELANZA</div>
        <div style="font-family:Tajawal;font-weight:800;font-size:24pt;margin-top:1mm;${goldText}">فراتيلانزا</div>
        <div style="height:.6mm;width:34mm;background:${C.gold};margin:8mm 0"></div>
        <div style="font-size:9pt;letter-spacing:.14em;color:#c5d6e8;font-weight:600">${tag.en.toUpperCase()}</div>
        <div style="font-family:Tajawal;font-size:11pt;margin-top:2mm;color:#c5d6e8">${tag.ar}</div></div>`
    const outside = back + spine + front
    // inside: two pockets, contract-friendly
    const pocket = (left, width, cx, title, sub) => `<div style="${abs}left:${left};width:${width};bottom:0;height:${T + 90}mm;background:linear-gradient(180deg,${C.navy2},${C.navy});border-top:.6mm solid ${C.gold}"></div>` +
      `<div style="${abs}left:${cx}mm;bottom:${T + 44}mm;width:225mm;text-align:center;color:#fff"><div style="font-weight:800;font-size:10pt;${goldText}">${title}</div><div style="font-size:7.5pt;color:#c5d6e8;margin-top:1mm">${sub}</div></div>`
    const inside = `<div style="${abs}inset:0;background:#f7fafc"></div>` +
      `<div style="${abs}left:${T + 225}mm;top:0;width:8mm;height:100%;background:${C.navy}"></div>` +
      `<div style="${abs}left:0;top:0;width:${T + 225}mm;height:${T + 40}mm;background:${brandGrad}"></div><div style="${abs}left:${T + 233}mm;top:0;right:0;height:${T + 40}mm;background:${brandGrad}"></div>` +
      `<div style="${abs}left:${T + 20}mm;top:${T + 10}mm;display:flex;align-items:center;gap:5mm;color:#fff">${logo(16)}<div style="font-weight:800;letter-spacing:.1em;font-size:12pt">FRATELANZA</div></div>` +
      `<div style="${abs}right:${T + 20}mm;top:${T + 10}mm;text-align:right;color:#fff;font-family:Tajawal;font-size:10pt;direction:rtl">${slogan.ar}<div style="font-family:'Plus Jakarta Sans';font-size:7pt;${goldText};direction:ltr">${slogan.en}</div></div>` +
      pocket('0', `${T + 225}mm`, T, 'Contracts &amp; Agreements · العقود والاتفاقيات', 'Signed documents · المستندات الموقعة') + pocket(`${T + 233}mm`, 'auto;right:0', T + 233, 'Proposals &amp; Brochures · العروض والمطبوعات', 'Quotations · Company profile · عروض الأسعار · الملف التعريفي') +
      `<div style="${abs}left:${T + 20}mm;top:${T + 70}mm;width:185mm;color:${C.navy}"><div style="font-weight:800;font-size:14pt">Agreement Pack</div><div style="font-family:Tajawal;font-size:12pt;margin-top:1mm">حزمة الاتفاقية</div><div style="height:.5mm;width:20mm;background:${C.gold};margin:4mm 0"></div><div style="font-size:8pt;color:${C.muted};max-width:130mm">Client ______________________ &nbsp; Project ______________________ &nbsp; Ref ________</div></div>` +
      // business card slit marker
      `<div style="${abs}left:${T + 67}mm;bottom:${T + 62}mm;width:90mm;height:0;border-top:.4mm dashed ${C.goldLight}"></div><div style="${abs}left:${T + 67}mm;bottom:${T + 63.5}mm;font-size:5.5pt;color:${C.goldLight}">Business-card slit 90 mm · فتحة الكارت (قص)</div>`
    return [{ label: 'Outside / الخارج', html: outside }, { label: 'Inside / الداخل', html: inside }]
  },
}

const letterhead = {
  id: 'letterhead-a4', group: 'stationery', name: { en: 'Letterhead A4', ar: 'ورق خطابات A4' }, trim: [210, 297],
  spec: { en: '210 × 297 mm · 100 g offset paper · 4-colour · leave body area free for laser printing', ar: '٢١٠ × ٢٩٧ مم · ورق أوفست ١٠٠ جم · ٤ ألوان · اترك منطقة النص فارغة للطباعة الليزر' },
  pages: () => [{ label: 'Letterhead', html: `<div style="${abs}inset:0;background:#fff"></div>
    <div style="${abs}left:0;right:0;top:0;height:${BLEED + 34}mm;${navyBg}"></div><div style="${abs}left:0;right:0;top:0;height:${BLEED + 34}mm;${dots(0.1)}"></div>
    <div style="${abs}left:0;right:0;top:${BLEED + 34}mm;height:1.2mm;background:linear-gradient(90deg,${C.gold},${C.cyanLight})"></div>
    <div style="${abs}left:${BLEED + 15}mm;top:${BLEED + 7}mm;display:flex;align-items:center;gap:5mm;color:#fff">${logo(22, ring)}<div><div style="font-weight:800;font-size:16pt;letter-spacing:.1em">FRATELANZA</div><div style="font-size:6.5pt;${goldText};font-weight:600;letter-spacing:.06em">${slogan.en.toUpperCase()}</div></div></div>
    <div style="${abs}right:${BLEED + 15}mm;top:${BLEED + 12}mm;text-align:right;color:#fff;font-family:Tajawal"><div style="font-weight:800;font-size:18pt">فراتيلانزا</div><div style="font-size:9pt;${goldText}">${slogan.ar}</div></div>
    <div style="${abs}left:${BLEED + 15}mm;right:${BLEED + 15}mm;bottom:${BLEED + 8}mm;border-top:.3mm solid ${C.line};padding-top:3mm;display:flex;justify-content:space-between;font-size:6.6pt;color:${C.muted};align-items:center">
      <span dir="ltr">${info.web} &nbsp;·&nbsp; ${info.email} &nbsp;·&nbsp; ${info.phoneRaw}</span><span style="font-family:Tajawal;font-size:7.4pt" dir="rtl">${D.company.address.ar}</span></div>
    <div style="${abs}left:0;right:0;bottom:0;height:${BLEED + 2}mm;background:linear-gradient(90deg,${C.gold},${C.cyanLight})"></div>
    <div style="${abs}left:${BLEED + 15}mm;bottom:${BLEED + 17}mm;font-size:5.5pt;color:${C.muted}">${D.company.address.en}</div>
    <div style="${abs}right:${BLEED + 15}mm;bottom:${BLEED + 15}mm;color:${C.navy}">${qrTile('letterhead', 14, { border: false })}</div>` }],
}

const envelope = {
  id: 'envelope-dl', group: 'stationery', name: { en: 'Envelope DL', ar: 'ظرف DL' }, trim: [220, 110],
  spec: { en: '220 × 110 mm · 120 g wove · printed front only (flap plain)', ar: '٢٢٠ × ١١٠ مم · ورق ١٢٠ جم · طباعة الوجه فقط' },
  pages: () => [{ label: 'Front', html: `<div style="${abs}inset:0;background:#fff"></div><div style="${abs}left:0;top:0;bottom:0;width:${BLEED + 10}mm;background:${brandGrad}"></div><div style="${abs}left:${BLEED + 10}mm;top:0;bottom:0;width:1.2mm;background:linear-gradient(180deg,${C.gold},${C.cyanLight})"></div>` +
    box(0, `<div style="${abs}left:20mm;top:9mm;display:flex;align-items:center;gap:4mm">${logo(15)}<div><div style="font-weight:800;font-size:10pt;letter-spacing:.1em;color:${C.navy}">FRATELANZA</div><div style="font-size:5.5pt;color:${C.cyan};font-weight:600">${slogan.en} · <span style="font-family:Tajawal">${slogan.ar}</span></div></div></div>
      <div style="${abs}left:20mm;bottom:8mm;font-size:5.6pt;color:${C.muted}" dir="ltr">${info.web} · ${info.email}</div>
      <div style="${abs}right:12mm;bottom:8mm;color:${C.navy}">${qrTile('envelope', 13, { border: false })}</div>`) }],
}

const notebook = {
  id: 'notebook-a5', group: 'gifts', name: { en: 'Notebook Cover (A5 hardcover)', ar: 'غلاف نوت بوك (A5 هارد كفر)' },
  trim: [306, 210],
  spec: { en: 'Flat cover 306 × 210 mm (back 148 + spine 10 + front 148) · hardcover board wrapped in art paper / PU leather · gold foil logo · elastic band navy', ar: 'الغلاف مفرود ٣٠٦ × ٢١٠ مم (خلف ١٤٨ + كعب ١٠ + أمام ١٤٨) · كرتون مقوى مغلف ورق آرت / جلد صناعي · فويل ذهبي للشعار · استك كحلي' },
  pages: () => {
    const T = BLEED
    return [{ label: 'Cover (flat)', html: `<div style="${abs}inset:0;${navyBg}"></div><div style="${abs}inset:0;${dots(0.08)}"></div>
      <div style="${abs}left:${T + 148}mm;top:0;width:10mm;height:100%;background:${C.navy}"></div><div style="${abs}left:${T + 148}mm;top:0;width:10mm;height:100%;display:flex;align-items:center;justify-content:center"><div style="transform:rotate(-90deg);white-space:nowrap;font-weight:800;font-size:8pt;letter-spacing:.3em;${goldText}">FRATELANZA</div></div>
      <div style="${abs}left:${T + 158}mm;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center">${logo(60, ring)}<div style="font-weight:800;font-size:17pt;letter-spacing:.14em;margin-top:9mm">FRATELANZA</div><div style="height:.5mm;width:22mm;background:${C.gold};margin:4mm 0"></div><div style="font-size:7pt;${goldText};letter-spacing:.12em;font-weight:600">${slogan.en.toUpperCase()}</div><div style="font-family:Tajawal;font-size:9pt;margin-top:1.5mm;color:#c5d6e8">${slogan.ar}</div></div>
      <div style="${abs}left:0;width:${T + 148}mm;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:${T + 14}mm;color:#c5d6e8;font-size:7pt;gap:1mm"><div style="color:#fff;margin-bottom:5mm">${qrTile('notebook', 26)}</div><div dir="ltr" style="${goldText};font-weight:700">${info.web}</div><div dir="ltr">${info.email}</div></div>` },
    { label: 'First page (inside)', html: `<div style="${abs}inset:0;background:#fff"></div>` + box(0, `<div style="${abs}left:20mm;top:16mm;width:104mm;color:${C.navy}"><div style="display:flex;align-items:center;gap:4mm">${logo(13)}<div style="font-weight:800;font-size:11pt;letter-spacing:.1em">FRATELANZA</div></div><div style="margin-top:10mm;font-size:8pt;color:${C.muted};display:grid;gap:5mm"><div style="border-bottom:.3mm solid ${C.line};padding-bottom:1mm">Name · الاسم</div><div style="border-bottom:.3mm solid ${C.line};padding-bottom:1mm">Phone · الهاتف</div><div style="border-bottom:.3mm solid ${C.line};padding-bottom:1mm">Notes · ملاحظات</div></div></div>`).replace(/inset:[^;]+;/, `left:0;top:0;width:${T + 148 + 5}mm;bottom:0;`) }]
  },
}

const pen = {
  id: 'pen-wrap', group: 'gifts', name: { en: 'Metal Pen — Barrel Print', ar: 'قلم معدني — طباعة الجسم' }, trim: [140, 12],
  spec: { en: 'Print area 140 × 12 mm (laser engraving / UV print) · gold on navy anodised barrel · QR uses the plain website link (no tracking) so it stays scannable at 9 mm — UV/laser-print and test-scan before the run', ar: 'منطقة الطباعة ١٤٠ × ١٢ مم (حفر ليزر / طباعة UV) · لون واحد: ذهبي على جسم كحلي' },
  pages: () => [{ label: 'Barrel artwork', html: `<div style="${abs}inset:0;background:${C.navy}"></div><div style="${abs}inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 ${BLEED + 4}mm;color:${C.goldLight};white-space:nowrap">
    ${logo(9)}<span style="font-weight:800;font-size:8pt;letter-spacing:.2em">FRATELANZA</span><span style="font-size:5pt;letter-spacing:.14em;color:#c5d6e8">${slogan.en.toUpperCase()}</span><span style="font-family:Tajawal;font-weight:800;font-size:8pt">فراتيلانزا</span><span style="display:inline-block;height:9mm;line-height:0">${qrTile(null, 7.2, { caption: false, ecc: 'L', border: false, text: 'https://www.fratelanza.com/' })}</span></div>` }],
}

const mug = {
  id: 'mug-wrap', group: 'gifts', name: { en: 'Ceramic Mug (11 oz wrap)', ar: 'مج سيراميك (تصميم الدوران)' }, trim: [200, 85],
  spec: { en: 'Wrap 200 × 85 mm · sublimation on white ceramic · keep 10 mm clear around handle area (centre-back)', ar: 'مساحة الطباعة ٢٠٠ × ٨٥ مم · طباعة سبلميشن على سيراميك أبيض · اترك ١٠ مم حول منطقة اليد' },
  pages: () => [{ label: 'Wrap', html: `<div style="${abs}inset:0;${navyBg}"></div><div style="${abs}inset:0;${dots(0.09)}"></div>
    <div style="${abs}left:${BLEED + 10}mm;top:0;bottom:0;display:flex;align-items:center;gap:7mm;color:#fff">${logo(56, ring)}<div><div style="font-weight:800;font-size:18pt;letter-spacing:.1em">FRATELANZA</div><div style="font-family:Tajawal;font-weight:800;font-size:17pt;${goldText};line-height:1.2">فراتيلانزا</div><div style="height:.4mm;width:18mm;background:${C.gold};margin:2.5mm 0"></div><div style="font-size:6pt;${goldText};font-weight:600;letter-spacing:.1em">${slogan.en.toUpperCase()}</div><div style="font-family:Tajawal;font-size:8.5pt;color:#c5d6e8">${slogan.ar}</div></div></div>
    <div style="${abs}right:${BLEED + 10}mm;top:0;bottom:0;display:flex;align-items:center;color:#fff;text-align:center">${qrTile('mug', 32)}</div>` }],
}

const badge = {
  id: 'id-badge', group: 'gifts', name: { en: 'ID Badge / Lanyard Card (CR80)', ar: 'بطاقة تعريف موظف (CR80)' }, trim: [54, 86],
  spec: { en: '54 × 86 mm portrait · PVC 0.76 mm · lanyard slot 12 × 3 mm at top centre', ar: '٥٤ × ٨٦ مم عمودي · PVC ٠٫٧٦ مم · فتحة الحبل ١٢ × ٣ مم أعلى المنتصف' },
  pages: () => [
    { label: 'Front', html: `<div style="${abs}inset:0;${navyBg}"></div><div style="${abs}inset:0;${dots(0.1)}"></div><div style="${abs}left:0;right:0;top:${BLEED + 8}mm;display:flex;flex-direction:column;align-items:center;color:#fff">${logo(24, ring)}<div style="font-weight:800;font-size:10pt;letter-spacing:.14em;margin-top:3mm">FRATELANZA</div></div>
      <div style="${abs}left:${BLEED + 9}mm;top:${BLEED + 41}mm;width:26mm;height:26mm;border-radius:50%;border:.5mm solid ${C.gold};background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:#c5d6e8;font-size:5.5pt;text-align:center">PHOTO<br>صورة</div>
      <div style="${abs}left:0;right:0;bottom:${BLEED + 5}mm;text-align:center;color:#fff"><div style="font-weight:800;font-size:8.5pt">Full Name</div><div style="font-family:Tajawal;font-size:8pt;${goldText}">الاسم الكامل · المسمى الوظيفي</div></div>` },
    { label: 'Back', html: `<div style="${abs}inset:0;background:#fff"></div><div style="${abs}left:0;right:0;top:0;height:${BLEED + 6}mm;background:${brandGrad}"></div><div style="${abs}left:0;right:0;bottom:0;height:${BLEED + 2}mm;background:linear-gradient(90deg,${C.gold},${C.cyanLight})"></div>` + box(8, `<div style="display:flex;flex-direction:column;justify-content:center;height:100%;align-items:center;text-align:center;gap:3mm;color:${C.navy}"><div style="font-size:5.6pt;color:${C.muted}">This card is property of Fratelanza. If found, please return.<br><span style="font-family:Tajawal;font-size:6pt">هذه البطاقة ملك لفراتيلانزا، عند العثور عليها يرجى إعادتها.</span></div>${lines('ltr', C.ink).replace('display:grid', 'display:grid;justify-items:start')}<div style="color:${C.navy}">${qrTile('badge', 22, { border: false })}</div></div>`, '') },
  ],
}

const certificate = {
  id: 'certificate-a4', group: 'gifts', name: { en: 'Certificate / Appreciation (A4 landscape)', ar: 'شهادة تقدير (A4 أفقي)' }, trim: [297, 210],
  spec: { en: '297 × 210 mm · 250 g ivory art paper · gold foil border & logo · names printed digitally', ar: '٢٩٧ × ٢١٠ مم · ورق آرت عاجي ٢٥٠ جم · إطار وشعار فويل ذهبي · الأسماء طباعة رقمية' },
  pages: () => [{ label: 'Certificate', html: `<div style="${abs}inset:0;background:#fffdf7"></div><div style="${abs}inset:${BLEED + 5}mm;border:1.2mm solid ${C.navy}"></div><div style="${abs}inset:${BLEED + 8}mm;border:.4mm solid ${C.gold}"></div>
    <div style="${abs}inset:${BLEED + 8}mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:${C.navy}">${logo(24, ring)}<div style="font-weight:800;font-size:24pt;letter-spacing:.12em;margin-top:4mm">CERTIFICATE OF APPRECIATION</div><div style="font-family:Tajawal;font-weight:800;font-size:22pt;color:${C.cyan};margin-top:1mm">شهادة تقدير</div><div style="height:.5mm;width:40mm;background:${C.gold};margin:6mm 0"></div>
      <div style="font-size:9pt;color:${C.muted}">Presented to · تُمنح إلى</div><div style="font-weight:800;font-size:20pt;border-bottom:.3mm solid ${C.gold};padding:1mm 24mm;margin-top:3mm">______________________</div><div style="font-size:8.5pt;color:${C.muted};margin-top:4mm;max-width:190mm">In recognition of outstanding contribution and partnership with Fratelanza.<br><span style="font-family:Tajawal;font-size:9.5pt">تقديراً للمساهمة المتميزة والشراكة مع فراتيلانزا.</span></div>
      <div style="display:flex;gap:26mm;margin-top:8mm;font-size:7.5pt;color:${C.muted};align-items:flex-end"><div style="border-top:.3mm solid ${C.navy};padding-top:1.5mm;width:55mm">Dr. Ahmed Refaat · CEO</div><div style="color:${C.navy}">${qrTile('certificate', 17)}</div><div style="border-top:.3mm solid ${C.navy};padding-top:1.5mm;width:55mm">Date · التاريخ</div></div></div>` }],
}

const tote = {
  id: 'tote-bag', group: 'gifts', name: { en: 'Tote Bag Print', ar: 'شنطة قماش (تصميم الطباعة)' }, trim: [280, 330],
  spec: { en: 'Print area 280 × 330 mm on natural cotton · silk-screen 2 colours (navy + gold) · artwork centred 70 mm from top seam', ar: 'منطقة الطباعة ٢٨٠ × ٣٣٠ مم على قطن طبيعي · سيلك سكرين لونان (كحلي + ذهبي)' },
  pages: () => [{ label: 'Print', html: `<div style="${abs}inset:0;background:#f4efe4"></div><div style="${abs}inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:${C.navy}">${logo(120, 'box-shadow:0 0 0 1mm ' + C.gold)}<div style="font-weight:800;font-size:34pt;letter-spacing:.14em;margin-top:14mm">FRATELANZA</div><div style="font-family:Tajawal;font-weight:800;font-size:26pt;color:${C.cyan}">فراتيلانزا</div><div style="height:.7mm;width:40mm;background:${C.gold};margin:6mm 0"></div><div style="font-size:9pt;letter-spacing:.16em;font-weight:700">${slogan.en.toUpperCase()}</div><div style="font-family:Tajawal;font-size:12pt;margin-top:2mm">${slogan.ar}</div><div style="margin-top:9mm;color:${C.navy}">${qrTile('tote', 42)}</div></div>` }],
}

const rollup = {
  id: 'rollup-banner', group: 'events', name: { en: 'Roll-up Banner 85 × 200 cm', ar: 'رول أب 85 × 200 سم' }, trim: [850, 2000], bigMarks: true,
  spec: { en: '850 × 2000 mm (+ 100 mm base hidden in cassette: keep key content above 150 mm from bottom) · 440 g PVC blockout', ar: '٨٥٠ × ٢٠٠٠ مم (المتن السفلي ١٠٠ مم يختفي داخل القاعدة: اجعل المحتوى المهم فوق ١٥٠ مم من الأسفل) · PVC بلوك أوت ٤٤٠ جم' },
  pages: () => {
    const cards = D.home.solutionCards.slice(0, 4).map((s) => `<div style="display:flex;gap:26mm;align-items:center;padding:22mm 26mm;border-radius:14mm;background:rgba(255,255,255,.07);border:1mm solid rgba(255,255,255,.16)"><div style="width:42mm;height:42mm;border-radius:11mm;background:${C.navy};display:flex;align-items:center;justify-content:center;flex:none">${icon(s.icon, 96, C.goldLight)}</div><div><div style="font-weight:800;font-size:56pt">${s.title.en}</div><div style="font-family:Tajawal;font-size:48pt;${goldText}">${s.title.ar}</div></div></div>`).join('')
    return [{ label: 'Banner', html: `<div style="${abs}inset:0;${navyBg}"></div><div style="${abs}inset:0;${dots(0.09)};background-size:70mm 70mm"></div>
      <div style="${abs}left:${BLEED + 70}mm;right:${BLEED + 70}mm;top:${BLEED + 90}mm;bottom:${BLEED + 180}mm;color:#fff;display:flex;flex-direction:column;align-items:center;text-align:center">
        ${logo(420, ring)}<div style="font-weight:800;font-size:130pt;letter-spacing:.1em;margin-top:60mm">FRATELANZA</div><div style="font-family:Tajawal;font-weight:800;font-size:100pt;${goldText}">فراتيلانزا</div>
        <div style="height:3mm;width:200mm;background:${C.gold};margin:40mm 0"></div>
        <div style="font-weight:800;font-size:66pt;line-height:1.1">One Technology Partner.<br>One Managed Delivery.</div><div style="font-family:Tajawal;font-weight:800;font-size:56pt;color:#c5d6e8;margin-top:12mm">شريك تقني واحد. تسليم مُدار واحد.</div>
        <div style="display:grid;gap:12mm;width:100%;margin-top:44mm;text-align:start">${cards}</div>
        <div style="margin-top:auto;color:#fff;font-size:44pt">${qrTile('rollup', 230)}</div><div style="margin-top:12mm;font-size:46pt;font-weight:700;${goldText}" dir="ltr">${info.web}</div><div style="font-size:34pt;color:#c5d6e8;margin-top:6mm" dir="ltr">${info.email} · ${info.phoneRaw}</div></div>` }]
  },
}

const lanyard = {
  id: 'lanyard', group: 'gifts', name: { en: 'Lanyard (20 mm)', ar: 'حبل تعليق (٢٠ مم)' }, trim: [500, 20],
  spec: { en: '20 mm × 900 mm loop, one repeat shown (500 mm; repeat to fill) · dye-sublimation polyester · navy with gold text', ar: 'عرض ٢٠ مم × ٩٠٠ مم · يظهر جزء ٥٠٠ مم يُكرَّر · بوليستر سبلميشن · كحلي بنص ذهبي' },
  pages: () => [{ label: 'Lanyard', html: `<div style="${abs}inset:0;background:${C.navy}"></div><div style="${abs}inset:0;display:flex;align-items:center;justify-content:space-around;color:${C.goldLight};font-weight:800;font-size:9pt;letter-spacing:.24em;white-space:nowrap;padding:0 ${BLEED}mm">${Array.from({ length: 3 }, () => `<span>FRATELANZA</span>${logo(11)}<span style="font-family:Tajawal;letter-spacing:0;font-size:10pt">فراتيلانزا</span><span style="color:${C.navy}">${qrTile('lanyard', 12, { caption: false, border: false })}</span><span style="opacity:.4">◆</span>`).join('')}</div>` }],
}

const usb = {
  id: 'usb-card', group: 'gifts', name: { en: 'USB Card / Access Card', ar: 'كارت USB' }, trim: [85.6, 54],
  spec: { en: 'CR80 (85.6 × 54 mm) · PVC USB card · full-colour front, mono back', ar: 'مقاس ٨٥٫٦ × ٥٤ مم · كارت USB PVC · الوجه ألوان والخلف لون واحد' },
  pages: () => [{ label: 'Front', html: `<div style="${abs}inset:0;${navyBg}"></div><div style="${abs}inset:0;${dots(0.12)}"></div>` + box(7, `<div style="display:flex;flex-direction:column;justify-content:space-between;height:100%;color:#fff"><div style="display:flex;align-items:center;gap:4mm">${logo(17, ring)}<div style="font-weight:800;letter-spacing:.12em;font-size:11pt">FRATELANZA</div></div><div><div style="font-size:7pt;${goldText};font-weight:700;letter-spacing:.12em">COMPANY PROFILE · الملف التعريفي</div><div dir="ltr" style="font-size:6pt;color:#c5d6e8;margin-top:1mm">${info.web}</div></div></div>`) },
  { label: 'Back', html: `<div style="${abs}inset:0;background:#fff"></div><div style="${abs}left:0;right:0;bottom:0;height:${BLEED + 3}mm;background:linear-gradient(90deg,${C.gold},${C.cyanLight})"></div>` + box(8, `<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:2mm;color:${C.navy};text-align:center">${qrTile('usb', 22, { border: false })}<div style="font-size:6pt;color:${C.muted}">Contains: Company Profile EN / AR, brand assets<br><span style="font-family:Tajawal">يحتوي: الملف التعريفي بالعربية والإنجليزية وهوية العلامة</span></div></div>`) }],
}

const sticker = {
  id: 'sticker-round', group: 'gifts', name: { en: 'QR Sticker / Seal (50 mm)', ar: 'ستيكر QR دائري (٥٠ مم)' }, trim: [50, 50], round: true,
  spec: { en: 'Ø 50 mm · gloss vinyl kiss-cut · for packaging, folders and closing seals', ar: 'قطر ٥٠ مم · فينيل لامع قص دائري · للتغليف والفولدرات' },
  pages: () => [{ label: 'Sticker', html: `<div style="${abs}inset:0;border-radius:50%;background:${C.navy}"></div><div style="${abs}inset:${BLEED + 2}mm;border-radius:50%;border:.5mm solid ${C.gold}"></div>
    <div style="${abs}inset:0;display:flex;align-items:center;justify-content:center;color:${C.goldLight}">${qrTile('sticker', 22, { caption: false, border: false })}</div>
    <div style="${abs}left:0;right:0;top:${BLEED + 5}mm;text-align:center;color:${C.goldLight};font-weight:800;font-size:5.4pt;letter-spacing:.2em">FRATELANZA</div>
    <div style="${abs}left:0;right:0;bottom:${BLEED + 4.6}mm;text-align:center;color:#fff;font-weight:800;font-size:5.4pt;letter-spacing:.14em">SCAN · <span style="font-family:Tajawal;letter-spacing:0;font-size:6.4pt">امسح للتواصل</span></div>` }],
}

// medal (round, metal + enamel) — drawn as SVG so the printer/engraver gets vectors
const medalSvg = (side) => {
  const R = 50
  const ringTxt = `<defs><path id="arcTop" d="M ${50 - 38},50 A 38,38 0 0 1 ${50 + 38},50"/><path id="arcBot" d="M ${50 - 40.5},50 A 40.5,40.5 0 0 0 ${50 + 40.5},50"/>
    <radialGradient id="gold" cx="35%" cy="30%"><stop offset="0" stop-color="#fff2c4"/><stop offset=".55" stop-color="${C.gold}"/><stop offset="1" stop-color="#9c6f1c"/></radialGradient></defs>`
  const rims = `<circle cx="50" cy="50" r="50" fill="url(#gold)"/><circle cx="50" cy="50" r="46.5" fill="none" stroke="#7a5512" stroke-width=".5"/><circle cx="50" cy="50" r="44.5" fill="${C.navy}"/><circle cx="50" cy="50" r="43" fill="none" stroke="url(#gold)" stroke-width=".7"/>`
  if (side === 'front') {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">${ringTxt}${rims}
      <image href="${LOGO}" x="20" y="20" width="60" height="60" clip-path="circle(30px at 30px 30px)" style="clip-path:circle(50%)"/>
      <circle cx="50" cy="50" r="30.4" fill="none" stroke="url(#gold)" stroke-width="1.1"/>
      <text font-family="Plus Jakarta Sans" font-weight="800" font-size="5.2" letter-spacing="1.3" fill="${C.goldLight}"><textPath href="#arcTop" startOffset="50%" text-anchor="middle">FRATELANZA · EXCELLENCE</textPath></text>
      <text font-family="Plus Jakarta Sans" font-weight="700" font-size="3.6" letter-spacing=".9" fill="${C.goldLight}" dy="-.5"><textPath href="#arcBot" startOffset="50%" text-anchor="middle" side="left">★ BUILDING TOMORROW TOGETHER ★</textPath></text></svg>`
  }
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">${ringTxt}${rims}
    <text x="50" y="21.5" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="6.2" letter-spacing="1.3" fill="${C.goldLight}">FRATELANZA</text>
    <text x="50" y="84.5" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="3.6" letter-spacing="1" fill="${C.goldLight}">SCAN · <tspan font-family="Tajawal" letter-spacing="0">امسح</tspan></text>
    <text x="50" y="90" text-anchor="middle" font-family="Tajawal" font-size="3.4" fill="#c5d6e8">فراتيلانزا · نبني الغد معاً</text></svg>`
}
const medal = {
  id: 'medal', group: 'gifts', name: { en: 'Award Medal (50 mm) + Ribbon', ar: 'ميدالية تقدير (٥٠ مم) مع الشريط' }, trim: [50, 50], round: true,
  spec: { en: 'Ø 50 mm zinc-alloy, 3 mm thick · 3D relief gold plating + navy soft enamel · ribbon 25 × 800 mm (artwork on next page) · vector artwork', ar: 'قطر ٥٠ مم سبيكة زنك سماكة ٣ مم · نقش بارز مطلي ذهب + مينا كحلي · شريط ٢٥ × ٨٠٠ مم (تصميمه في الصفحة التالية) · ملف فيكتور' },
  pages: () => [
    { label: 'Front', html: `<div style="${abs}left:${BLEED}mm;top:${BLEED}mm;width:50mm;height:50mm">${medalSvg('front')}</div>` },
    { label: 'Back', html: `<div style="${abs}left:${BLEED}mm;top:${BLEED}mm;width:50mm;height:50mm">${medalSvg('back')}</div><div style="${abs}left:${BLEED + 25 - 12.2}mm;top:${BLEED + 25 - 12.2}mm">${qrTile('medal', 19, { caption: false, border: false })}</div>` },
  ],
}
const ribbon = {
  id: 'medal-ribbon', group: 'gifts', name: { en: 'Medal Ribbon (25 mm)', ar: 'شريط الميدالية (٢٥ مم)' }, trim: [400, 25],
  spec: { en: '25 mm × 800 mm folded loop (400 mm shown, mirrored) · dye-sublimation satin', ar: 'عرض ٢٥ مم × ٨٠٠ مم مطوي (يظهر ٤٠٠ مم ويُعكس) · ساتان سبلميشن' },
  pages: () => {
    const txt = `<span>FRATELANZA</span><span style="opacity:.6">◆</span><span style="font-family:Tajawal;letter-spacing:0;font-size:9pt">فراتيلانزا</span><span style="opacity:.6">◆</span>`
    return [{ label: 'Ribbon', html: `<div style="${abs}inset:0;background:${C.navy}"></div><div style="${abs}left:0;right:0;top:${BLEED + 1.6}mm;height:1.4mm;background:${C.gold}"></div><div style="${abs}left:0;right:0;bottom:${BLEED + 1.6}mm;height:1.4mm;background:${C.gold}"></div>
    <div style="${abs}inset:0;display:flex;align-items:center;justify-content:space-around;color:${C.goldLight};font-weight:800;font-size:8pt;letter-spacing:.24em;white-space:nowrap;padding:0 4mm"><span style="display:flex;gap:6mm;align-items:center">${txt}${txt}</span><span style="color:${C.navy}">${qrTile('ribbon', 14.5, { caption: false })}</span><span style="display:flex;gap:6mm;align-items:center">${txt}${txt}</span></div>` }]
  },
}

const mousepad = {
  id: 'mouse-pad', group: 'gifts', name: { en: 'Mouse Pad (230 × 190 mm)', ar: 'ماوس باد (٢٣٠ × ١٩٠ مم)' }, trim: [230, 190],
  spec: { en: '230 × 190 mm · 3 mm rubber base, sublimation-printed fabric top · rounded corners r = 5 mm', ar: '٢٣٠ × ١٩٠ مم · قاعدة مطاط ٣ مم وسطح قماش سبلميشن · حواف دائرية نصف قطر ٥ مم' },
  pages: () => [{ label: 'Mouse pad', html: `<div style="${abs}inset:0;${navyBg}"></div><div style="${abs}inset:0;${dots(0.1)};background-size:18mm 18mm"></div>
    <div style="${abs}inset:${BLEED + 12}mm;display:flex;align-items:center;justify-content:space-between;color:#fff"><div style="display:flex;align-items:center;gap:10mm">${logo(70, ring)}<div><div style="font-weight:800;font-size:22pt;letter-spacing:.1em">FRATELANZA</div><div style="font-family:Tajawal;font-weight:800;font-size:20pt;${goldText};line-height:1.2">فراتيلانزا</div><div style="height:.5mm;width:24mm;background:${C.gold};margin:4mm 0"></div><div style="font-size:7pt;${goldText};font-weight:700;letter-spacing:.12em">${slogan.en.toUpperCase()}</div><div style="font-family:Tajawal;font-size:10pt;color:#c5d6e8">${slogan.ar}</div></div></div>${qrTile('mousepad', 34)}</div>` }],
}

export const designs = [folder, card, letterhead, envelope, notebook, pen, medal, ribbon, mug, mousepad, badge, lanyard, usb, sticker, certificate, tote, rollup]
