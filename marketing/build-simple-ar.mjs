// Very simple Arabic (Egyptian colloquial) company profile: 2 A4 pages with custom illustrations.
import path from 'node:path'
import { C, LOGO, ROOT, icon, fontCss, renderPdf, closeBrowser, qrTile, content as D } from './lib.mjs'

const AD = '٠١٢٣٤٥٦٧٨٩'
const ar = (s) => String(s).replace(/\d/g, (d) => AD[d])

// ---------- illustrations (flat SVG, brand colours) ----------
const tape = (id, d, w = 14) => `<path d="${d}" stroke="${C.gold}" stroke-width="${w}" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${C.navy}" stroke-width="${w}" stroke-linecap="butt" fill="none" stroke-dasharray="1.6 9" opacity=".55"/>`
const defs = (p) => `<defs><linearGradient id="${p}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cyanLight}"/><stop offset="1" stop-color="${C.mint}"/></linearGradient><linearGradient id="${p}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.goldLight}"/><stop offset="1" stop-color="${C.gold}"/></linearGradient></defs>`

const ill = {
  hero: `<svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg">${defs('h')}
    <circle cx="260" cy="190" r="168" fill="rgba(34,211,238,.10)"/><circle cx="260" cy="190" r="120" fill="rgba(212,160,58,.10)"/>
    <g stroke="rgba(255,255,255,.18)" stroke-width="1"><circle cx="260" cy="190" r="186" fill="none" stroke-dasharray="3 7"/></g>
    ${tape('h', 'M30 318 C 150 372, 380 372, 480 262', 16)}
    <circle cx="482" cy="258" r="30" fill="url(#hg)"/><circle cx="482" cy="258" r="16" fill="${C.navy}"/><circle cx="482" cy="258" r="5" fill="${C.goldLight}"/>
    <rect x="112" y="64" width="300" height="196" rx="16" fill="#12395f" stroke="${C.cyanLight}" stroke-width="2"/>
    <rect x="124" y="76" width="276" height="172" rx="9" fill="${C.navy}"/>
    <rect x="124" y="76" width="54" height="172" rx="9" fill="#0f2f55"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="134" y="${92 + i * 24}" width="34" height="9" rx="4.5" fill="${i === 0 ? C.cyanLight : '#2a577f'}"/>`).join('')}
    <rect x="190" y="88" width="64" height="38" rx="7" fill="#12395f"/><rect x="262" y="88" width="64" height="38" rx="7" fill="#12395f"/><rect x="334" y="88" width="56" height="38" rx="7" fill="#12395f"/>
    <rect x="198" y="98" width="26" height="6" rx="3" fill="${C.goldLight}"/><rect x="198" y="110" width="40" height="8" rx="4" fill="${C.cyanLight}"/>
    <rect x="270" y="98" width="26" height="6" rx="3" fill="${C.goldLight}"/><rect x="270" y="110" width="40" height="8" rx="4" fill="${C.mint}"/>
    <rect x="342" y="98" width="22" height="6" rx="3" fill="${C.goldLight}"/><rect x="342" y="110" width="34" height="8" rx="4" fill="${C.cyanLight}"/>
    <rect x="190" y="136" width="136" height="100" rx="8" fill="#12395f"/>
    ${[34, 58, 44, 78, 64, 88].map((h, i) => `<rect x="${200 + i * 21}" y="${226 - h}" width="13" height="${h}" rx="4" fill="${i % 2 ? 'url(#hg)' : 'url(#hc)'}"/>`).join('')}
    <rect x="334" y="136" width="56" height="100" rx="8" fill="#12395f"/><circle cx="362" cy="176" r="19" fill="none" stroke="#2a577f" stroke-width="9"/><path d="M362 157 a19 19 0 0 1 17 28" fill="none" stroke="${C.goldLight}" stroke-width="9" stroke-linecap="round"/><rect x="346" y="210" width="32" height="6" rx="3" fill="#2a577f"/>
    <path d="M84 262 H440 L424 282 Q420 288 412 288 H112 Q104 288 100 282 Z" fill="#1b4a74"/><rect x="226" y="262" width="68" height="7" rx="3.5" fill="#0f2f55"/>
    <g transform="translate(38 86) rotate(-8)"><rect width="104" height="60" rx="14" fill="#fff"/><text x="52" y="41" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="30" fill="${C.navy}">&lt;/&gt;</text></g>
    <g transform="translate(404 52) rotate(8)"><rect width="78" height="78" rx="20" fill="url(#hc)"/><path d="M39 18 L59 26 V42 C59 54 50 60 39 64 C28 60 19 54 19 42 V26 Z" fill="#fff"/><path d="M30 41 l7 7 l14 -15" stroke="${C.navy}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g transform="translate(46 230)"><circle r="30" fill="url(#hg)"/><circle r="12" fill="${C.navy}"/>${Array.from({ length: 8 }, (_, i) => `<rect x="-5" y="-40" width="10" height="14" rx="3" fill="${C.gold}" transform="rotate(${i * 45})"/>`).join('')}</g>
    <g fill="${C.goldLight}"><path d="M450 170 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 l12 -4z"/><path d="M96 40 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" opacity=".8"/><circle cx="300" cy="34" r="4" fill="${C.cyanLight}"/></g></svg>`,

  tailor: `<svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">${defs('t')}
    <rect x="18" y="12" width="116" height="80" rx="10" fill="#fff" stroke="#cfe3ef" stroke-width="2"/><rect x="18" y="12" width="116" height="16" rx="10" fill="${C.navy}"/><rect x="18" y="22" width="116" height="6" fill="${C.navy}"/>
    <circle cx="30" cy="20" r="3" fill="${C.gold}"/><circle cx="40" cy="20" r="3" fill="${C.cyanLight}"/><circle cx="50" cy="20" r="3" fill="${C.mint}"/>
    <rect x="28" y="38" width="42" height="26" rx="6" fill="url(#tc)"/><rect x="76" y="38" width="48" height="10" rx="5" fill="${C.navy}"/><rect x="76" y="54" width="32" height="10" rx="5" fill="url(#tg)"/><rect x="28" y="70" width="96" height="12" rx="6" fill="#dbe7f0"/>
    ${tape('t', 'M8 112 H146', 15)}<circle cx="146" cy="112" r="11" fill="url(#tg)"/><circle cx="146" cy="112" r="5" fill="${C.navy}"/>
    <g transform="translate(122 52) rotate(35)"><rect width="9" height="44" rx="2" fill="${C.gold}"/><path d="M0 44 h9 l-4.5 11z" fill="#f4d9a8"/><rect width="9" height="7" rx="2" fill="#ef6c6c"/></g></svg>`,

  code: `<svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">${defs('k')}
    <rect x="14" y="16" width="108" height="78" rx="10" fill="${C.navy}"/><rect x="14" y="16" width="108" height="14" rx="10" fill="#12395f"/><rect x="14" y="24" width="108" height="6" fill="#12395f"/>
    <circle cx="26" cy="23" r="3" fill="#ef6c6c"/><circle cx="36" cy="23" r="3" fill="${C.gold}"/><circle cx="46" cy="23" r="3" fill="${C.mint}"/>
    <text x="68" y="70" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="34" fill="${C.goldLight}">&lt;/&gt;</text>
    <rect x="26" y="80" width="46" height="5" rx="2.5" fill="#2a577f"/><rect x="78" y="80" width="30" height="5" rx="2.5" fill="${C.cyanLight}"/>
    <g transform="translate(112 92)"><circle r="17" fill="none" stroke="url(#kg)" stroke-width="8"/><circle r="4.5" fill="url(#kg)"/><path d="M-10 0 H-44" stroke="${C.gold}" stroke-width="8" stroke-linecap="round" transform="scale(-1 1)"/><path d="M-30 0 v13 M-40 0 v10" stroke="${C.gold}" stroke-width="7" stroke-linecap="round" transform="scale(-1 1)"/></g></svg>`,

  nosub: `<svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">${defs('n')}
    <rect x="16" y="26" width="104" height="68" rx="10" fill="${C.navy}"/><rect x="16" y="42" width="104" height="14" fill="#12395f"/><rect x="28" y="66" width="22" height="16" rx="4" fill="url(#ng)"/>
    <rect x="58" y="70" width="40" height="5" rx="2.5" fill="#2a577f"/><rect x="58" y="80" width="26" height="5" rx="2.5" fill="#2a577f"/>
    <g transform="translate(112 84)"><circle r="30" fill="rgba(255,255,255,.94)" stroke="#e5484d" stroke-width="9"/><path d="M-21 -21 L21 21" stroke="#e5484d" stroke-width="9" stroke-linecap="round"/></g>
    <g transform="translate(26 8)"><rect width="46" height="22" rx="11" fill="url(#nc)"/><text x="23" y="16" text-anchor="middle" font-family="Tajawal" font-weight="800" font-size="12" fill="${C.navy}">اشتراك</text></g></svg>`,

  support: `<svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">${defs('s')}
    <rect x="12" y="20" width="78" height="82" rx="10" fill="#fff" stroke="#cfe3ef" stroke-width="2"/><rect x="12" y="20" width="78" height="22" rx="10" fill="${C.navy}"/><rect x="12" y="34" width="78" height="8" fill="${C.navy}"/>
    <rect x="28" y="12" width="6" height="14" rx="3" fill="url(#sg)"/><rect x="68" y="12" width="6" height="14" rx="3" fill="url(#sg)"/>
    <text x="51" y="80" text-anchor="middle" font-family="Tajawal" font-weight="800" font-size="40" fill="${C.navy}">٣</text><text x="51" y="95" text-anchor="middle" font-family="Tajawal" font-weight="800" font-size="12" fill="${C.cyan}">شهور</text>
    <g transform="translate(118 50)"><circle r="19" fill="#f4d9a8"/><path d="M-22 4 a22 22 0 0 1 44 0" fill="none" stroke="${C.navy}" stroke-width="6" stroke-linecap="round"/><rect x="-27" y="-2" width="9" height="17" rx="4.5" fill="${C.navy}"/><rect x="18" y="-2" width="9" height="17" rx="4.5" fill="${C.navy}"/><path d="M22 14 q0 12 -14 12" fill="none" stroke="${C.navy}" stroke-width="4" stroke-linecap="round"/><circle cx="-6" cy="2" r="2.4" fill="${C.navy}"/><circle cx="7" cy="2" r="2.4" fill="${C.navy}"/><path d="M-6 11 q6 5 12 0" fill="none" stroke="${C.navy}" stroke-width="2.4" stroke-linecap="round"/></g>
    <g transform="translate(96 88)"><rect width="52" height="28" rx="14" fill="url(#sc)"/><path d="M15 15 l8 8 l15 -16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 -2)"/></g></svg>`,

  grow: `<svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">${defs('g')}
    <rect x="14" y="92" width="24" height="22" rx="6" fill="url(#gc)" opacity=".55"/><rect x="44" y="72" width="24" height="42" rx="6" fill="url(#gc)" opacity=".7"/><rect x="74" y="50" width="24" height="64" rx="6" fill="url(#gc)" opacity=".85"/><rect x="104" y="26" width="24" height="88" rx="6" fill="url(#gc)"/>
    <path d="M20 70 L56 46 L80 58 L124 14" fill="none" stroke="url(#gg)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M110 12 L126 12 L126 28" fill="none" stroke="url(#gg)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(138 100)"><circle r="14" fill="${C.navy}"/><path d="M-6 0 h12 M0 -6 v12" stroke="${C.goldLight}" stroke-width="4" stroke-linecap="round"/></g></svg>`,
}

const points = [
  { n: '١', ill: 'tailor', t: 'متفصّل على مقاس شغلك', d: 'بنقعد معاك، نفهم شغلك وطريقتك، ونبني لك سيستم على قد احتياجك بالظبط. مش برنامج جاهز بتحاول تظبط نفسك عليه.' },
  { n: '٢', ill: 'code', t: 'الكود المصدري بتاعك', d: 'بنسلّمك الكود المصدري كامل. السيستم يبقى ملكك إنت، وتقدر تعمل بيه اللي تحبه.' },
  { n: '٣', ill: 'nosub', t: 'من غير اشتراكات ولا رخص', d: 'مفيش اشتراك شهري، ولا سنوي، ولا رخصة تجددها. البرنامج معاك وبتاعك.' },
  { n: '٤', ill: 'support', t: '٣ شهور دعم فني مجاني', d: 'بعد التسليم فريقنا معاك ٣ شهور كاملين. أي مشكلة أو سؤال بنحلّه من غير ما تدفع جنيه.' },
  { n: '٥', ill: 'grow', t: 'السيستم بيكبر معاك', d: 'يقبل التطوير في أي وقت: النهارده فرع واحد وبكرة عشرة، وأي ميزة جديدة تتضاف على طول.' },
]
const card = (p) => `<div class="card"><div class="num">${p.n}</div><div class="txt"><h3>${p.t}</h3><p>${p.d}</p></div><div class="art">${ill[p.ill]}</div></div>`

const steps = [
  ['MessageCircle', 'بتكلمنا', 'قولنا فكرتك أو مشكلتك'],
  ['PenTool', 'بنصمم ونبني', 'سيستم على مقاس شغلك'],
  ['Rocket', 'بنسلّم', 'الكود والبرنامج ليك'],
  ['Headphones', 'بنفضل معاك', '٣ شهور دعم مجاني'],
].map(([ic, t, s], i) => `<div class="step"><div class="sico">${icon(ic, 22, C.goldLight)}</div><b>${t}</b><span>${s}</span>${i < 3 ? '<i>‹</i>' : ''}</div>`).join('')

const phone = '٠١٠٩٧١٣٨٣٣٨'
const css = `${fontCss()}
@page{size:210mm 297mm;margin:0}*{box-sizing:border-box;margin:0;padding:0}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Tajawal',sans-serif;color:${C.ink};line-height:1.7;direction:rtl}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;display:flex;flex-direction:column}.page:last-child{page-break-after:auto}
.navybg{background:radial-gradient(circle at 15% 0%,rgba(34,211,238,.28),transparent 45%),radial-gradient(circle at 100% 100%,rgba(212,160,58,.22),transparent 40%),linear-gradient(160deg,${C.navy},${C.navy2} 60%,#0b3b5c);color:#fff}
.grid{position:absolute;inset:0;opacity:.06;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:11mm 11mm}
.hero{flex:none;height:128mm;padding:13mm 16mm 0;position:relative}.hero>*:not(.grid){position:relative}
.brand{display:flex;align-items:center;gap:4mm}.brand img{width:19mm;height:19mm;border-radius:50%;box-shadow:0 0 0 .7mm rgba(242,216,154,.75)}.brand b{font-size:19pt;font-weight:800;letter-spacing:.02em}.brand small{display:block;font-size:9.4pt;color:${C.goldLight};font-weight:700;margin-top:-1.5mm}
.hero h1{font-size:34pt;max-width:108mm;line-height:1.25;font-weight:800;margin-top:9mm;color:#fff}.hero h1 em{font-style:normal;color:${C.goldLight}}
.hero p{font-size:12pt;color:#c5d6e8;max-width:104mm;margin-top:3mm}
.hero>.heroart{position:absolute;left:-5mm;bottom:-4mm;width:92mm}.heroart svg{width:100%;display:block}
.chips{flex:none;display:flex;gap:3mm;padding:0 16mm;margin-top:-5mm;position:relative}.chip{display:flex;align-items:center;gap:2mm;background:#fff;color:${C.navy};border-radius:10mm;padding:2.2mm 5mm;font-weight:800;font-size:10.5pt;box-shadow:0 2mm 6mm rgba(10,31,58,.25)}.chip i{width:2.4mm;height:2.4mm;border-radius:50%;background:${C.gold};display:block}
.body{flex:1;min-height:0;padding:8mm 14mm 12mm;background:linear-gradient(180deg,#f3f9fd,#fff);display:flex;flex-direction:column;gap:5mm}
.sec{font-size:15pt;font-weight:800;color:${C.navy};display:flex;align-items:center;gap:3mm}.sec:after{content:'';flex:1;height:.6mm;border-radius:1mm;background:linear-gradient(270deg,${C.gold},${C.cyanLight},transparent)}
.card{flex:1;display:grid;grid-template-columns:12mm 1fr 44mm;align-items:center;gap:5mm;background:#fff;border:.3mm solid ${C.line};border-radius:5mm;padding:3mm 6mm 3mm 3mm;box-shadow:0 1.5mm 5mm rgba(10,31,58,.07);position:relative;overflow:hidden}
.card:before{content:'';position:absolute;inset-inline-start:0;top:0;bottom:0;width:1.6mm;background:linear-gradient(180deg,${C.gold},${C.cyanLight})}
.num{width:11mm;height:11mm;border-radius:50%;background:${C.navy};color:${C.goldLight};font-weight:800;font-size:15pt;display:flex;align-items:center;justify-content:center;margin-inline-start:3mm}
.card h3{font-size:15pt;color:${C.navy};font-weight:800;line-height:1.3}.card p{font-size:10.6pt;color:#475569;margin-top:1mm;line-height:1.65}
.art{background:linear-gradient(160deg,#eaf6fd,#f8fbff);border-radius:4mm;padding:2mm;height:100%;display:flex;align-items:center}.art svg{width:100%;display:block}
.p2 .body{padding-top:14mm}.p2 .card{flex:none;height:42mm}.p2 .steps{flex:none}
.steps{display:flex;gap:2mm;align-items:stretch}.step{flex:1;position:relative;text-align:center;background:${C.navy};color:#fff;border-radius:4mm;padding:4mm 2mm}.step .sico{width:11mm;height:11mm;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5mm}
.step b{display:block;font-size:11.4pt;color:${C.goldLight};font-weight:800}.step span{font-size:9pt;color:#c5d6e8;display:block;line-height:1.4}.step i{position:absolute;left:-3.4mm;top:50%;transform:translateY(-50%);z-index:2;width:5mm;height:5mm;border-radius:50%;background:${C.gold};color:${C.navy};font-style:normal;font-weight:800;font-size:11pt;line-height:4.6mm}
.contact{margin-top:auto;border-radius:6mm;padding:7mm 9mm;position:relative;overflow:hidden;display:grid;grid-template-columns:1fr auto;gap:8mm;align-items:center}.contact>*:not(.grid){position:relative}
.contact h2{font-size:19pt;font-weight:800;color:#fff;line-height:1.3}.contact h2 em{font-style:normal;color:${C.goldLight}}.contact .sub{color:#c5d6e8;font-size:10.8pt;margin-top:1mm}
.rows{display:grid;gap:2mm;margin-top:3.5mm}.rows div{display:flex;align-items:center;gap:3mm;background:rgba(255,255,255,.09);border:.3mm solid rgba(255,255,255,.18);border-radius:3.4mm;padding:2.2mm 4mm;font-size:11.4pt;font-weight:700}.rows small{display:block;font-size:8.2pt;color:${C.goldLight};font-weight:700;line-height:1.2}.rows .ltr{direction:ltr;unicode-bidi:isolate;display:inline-block}
.qr{text-align:center;color:#fff;font-weight:800}.qr .cap{margin-top:2mm;font-size:11pt;color:${C.goldLight}}.qr .u{font-size:8.6pt;color:#c5d6e8;direction:ltr;margin-top:.6mm}
.logo2{display:flex;align-items:center;gap:3mm;justify-content:center;margin-top:5mm;color:${C.navy};font-weight:800;font-size:10pt}.logo2 img{width:9mm;height:9mm;border-radius:50%}
`

const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>فراتيلانزا — سيستم على مقاس شغلك</title><style>${css}</style></head><body>
<section class="page"><div class="hero navybg"><div class="grid"></div>
  <div class="brand"><img src="${LOGO}"><div><b>فراتيلانزا</b><small>FRATELANZA · نبني الغد معاً</small></div></div>
  <h1>سيستم <em>مخصوص</em><br>على مقاس شغلك</h1>
  <p>بنبني لك البرنامج اللي شغلك محتاجه بالظبط، وبنسلّمهولك بالكود المصدري… ويبقى بتاعك لآخر العمر.</p>
  <div class="heroart">${ill.hero}</div></div>
  <div class="chips"><div class="chip"><i></i>الكود المصدري ليك</div><div class="chip"><i></i>بدون اشتراكات</div><div class="chip"><i></i>٣ شهور دعم مجاني</div></div>
  <div class="body"><div class="sec">ليه فراتيلانزا؟</div>${points.slice(0, 3).map(card).join('')}</div></section>

<section class="page p2"><div class="body"><div class="sec" style="margin-top:-2mm">كمان معاك…</div>${points.slice(3).map(card).join('')}
  <div class="sec" style="margin-top:2mm">بنشتغل إزاي؟</div><div class="steps">${steps}</div>
  <div class="contact navybg"><div class="grid"></div><div><h2>عندك فكرة أو مشكلة في شغلك؟<br><em>كلّمنا وهنظبطهالك</em></h2><div class="sub">اتصل أو ابعت واتساب، ومن غير التزام.</div>
    <div class="rows">
      <div>${icon('Phone', 20, C.goldLight)}<span><small>تليفون / واتساب</small><span class="ltr">${phone}</span></span></div>
      <div>${icon('MapPin', 20, C.goldLight)}<span><small>العنوان</small>${D.company.address.ar}</span></div>
      <div>${icon('Mail', 20, C.goldLight)}<span><small>إيميل</small><span class="ltr">info@fratelanza.com</span></span></div>
    </div></div>
    <div class="qr">${qrTile('simple-ar', 30, { caption: false })}<div class="cap">امسح وادخل على موقعنا</div><div class="u">www.fratelanza.com</div></div></div></div></section>
</body></html>`

await renderPdf({ html, out: path.join(ROOT, 'output/Fratelanza-Simple-Profile-AR.pdf'), width: '210mm', height: '297mm' })
await closeBrowser()
