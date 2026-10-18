// Very simple Arabic (Egyptian colloquial) company profile: 2 A4 pages with custom illustrations.
import path from 'node:path'
import { C, LOGO, ROOT, icon, fontCss, renderPdf, closeBrowser, qrTile, content as D } from './lib.mjs'

const AD = '٠١٢٣٤٥٦٧٨٩'
const ar = (s) => String(s).replace(/\d/g, (d) => AD[d])

import { ill } from './illustrations.mjs'

const points = [
  { n: '١', ill: 'apps', t: 'كل اللي شغلك محتاجه', d: 'بنعمل كل البرامج والتطبيقات اللي تقدر تدير بيها شغلك: حسابات ومخازن ومبيعات وموظفين ومواعيد، وتطبيق موبايل كمان.' },
  { n: '٢', ill: 'tailor', t: 'متفصّل على مقاس شغلك', d: 'بنقعد معاك، نفهم شغلك وطريقتك، ونبني لك سيستم على قد احتياجك بالظبط. مش برنامج جاهز بتحاول تظبط نفسك عليه.' },
  { n: '٣', ill: 'code', t: 'الكود المصدري بتاعك', d: 'بنسلّمك الكود المصدري كامل. السيستم يبقى ملكك إنت، وتقدر تعمل بيه اللي تحبه.' },
  { n: '٤', ill: 'nosub', t: 'من غير اشتراكات ولا رخص', d: 'مفيش اشتراك شهري، ولا سنوي، ولا رخصة تجددها. البرنامج معاك وبتاعك.' },
  { n: '٥', ill: 'support', t: '٣ شهور دعم فني مجاني', d: 'بعد التسليم فريقنا معاك ٣ شهور كاملين. أي مشكلة أو سؤال بنحلّه من غير ما تدفع جنيه.' },
  { n: '٦', ill: 'grow', t: 'السيستم بيكبر معاك', d: 'يقبل التطوير في أي وقت: النهارده فرع واحد وبكرة عشرة، وأي ميزة جديدة تتضاف على طول.' },
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
.art{background:linear-gradient(160deg,#eaf6fd,#f8fbff);border-radius:4mm;padding:2mm;height:100%;display:flex;align-items:center;min-height:0}.art svg{width:100%;display:block}
.p2 .body{padding-top:14mm}.p2 .card{flex:none;height:35mm}.p2 .body{gap:4mm}.p2 .step{padding:3mm 2mm}.p2 .steps{flex:none}
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
  <p>بنعمل كل البرامج والتطبيقات اللي تدير بيها شغلك، على مقاس شغلك بالظبط… وبنسلّمهالك بالكود المصدري، ويبقى بتاعك لآخر العمر.</p>
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
