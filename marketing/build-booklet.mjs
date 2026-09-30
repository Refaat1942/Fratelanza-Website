// Bilingual (English + Arabic) A5 company-profile booklet, 24 pages, plus a saddle-stitch print imposition.
import path from 'node:path'
import { content as D, C, LOGO, ROOT, icon, fontCss, info, fileUrl, renderPdf, closeBrowser, qrTile, qrUrl } from './lib.mjs'

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩'
const TOTAL = 24
const shotFile = (f) => fileUrl(path.join(ROOT, 'assets/shots/' + f.replace('/', '-').replace('.png', '.jpg')))
const bi = (en, ar) => `<span class="en">${en}</span><span class="ar">${ar}</span>`

const SHORT = {
  erp: ['Unified finance, multi-branch inventory, analytics & reporting.', 'مالية موحّدة ومخزون متعدد الفروع وتحليلات وتقارير.'],
  realestate: ['Projects, units, contracts, collections & finance.', 'مشاريع ووحدات وعقود وتحصيلات ومالية.'],
  ai: ['One AI assistant across all products — insights & automation.', 'مساعد ذكاء اصطناعي عبر كل المنتجات — رؤى وأتمتة.'],
  crm: ['Sales, finance, tasks, support & knowledge base.', 'مبيعات ومالية ومهام ودعم وقاعدة معرفة.'],
  console: ['Central admin for products, users & permissions.', 'إدارة مركزية للمنتجات والمستخدمين والصلاحيات.'],
  laboratory: ['LabMaster — patients, tests, results, billing & accounting.', 'LabMaster — مرضى وفحوصات ونتائج وفوترة ومحاسبة.'],
  pharmacy: ['POS, inventory, insurance, ETA e-receipt & expiry control.', 'نقطة بيع ومخزون وتأمين وإيصال ETA ومراقبة الصلاحية.'],
  clinic: ['Appointments, EMR, billing & pharmacy / lab integration.', 'مواعيد وسجلات طبية وفوترة وتكامل مع الصيدلية والمختبر.'],
  hr: ['Recruitment, payroll, attendance & performance.', 'توظيف ورواتب وحضور وأداء.'],
  marketing: ['Campaigns, WhatsApp, email, analytics & segmentation.', 'حملات وواتساب وبريد وتحليلات وتقسيم العملاء.'],
  pos: ['Barcode POS, multi-payment & real-time inventory sync.', 'نقطة بيع بالباركود وطرق دفع متعددة ومزامنة مخزون لحظية.'],
}
function langPages(lang, startPage) {
  const ar = lang === 'ar'
  const t = (o) => o[lang]
  const n = (s) => (ar ? String(s).replace(/\d/g, (d) => AR_DIGITS[d]) : String(s))
  const L = (en, arb) => (ar ? arb : en)
  const cls = ar ? 'lang-ar' : 'lang-en'
  let pg = startPage
  const foot = () => `<div class="foot"><img src="${LOGO}"><span>${L('Fratelanza — Company Profile', 'فراتيلانزا — الملف التعريفي')}</span><span class="pn" dir="ltr">${n(pg)}</span></div>`
  const head = (kicker, title) => `<div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2><div class="rule"></div></div>`
  const page = (dark, kicker, title, body) => `<section class="page ${cls} ${dark ? 'dark-page' : ''}" dir="${ar ? 'rtl' : 'ltr'}">${head(kicker, title)}<div class="fill">${body}</div>${foot()}</section>`.replace(/^/, () => { pg++; return '' })

  const out = []
  const add = (dark, kicker, title, body) => { out.push(page0(dark, kicker, title, body)); pg++ }
  const page0 = (dark, kicker, title, body) => `<section class="page ${cls} ${dark ? 'dark-page' : ''}" dir="${ar ? 'rtl' : 'ltr'}">${head(kicker, title)}<div class="fill">${body}</div>${foot()}</section>`

  // 1 About
  add(false, L('About Us', 'من نحن'), L('One accountable technology partner', 'شريك تقني واحد مسؤول'), `
    <div class="stats">${D.company.stats.map((s) => `<div class="stat"><b dir="ltr">${n(s.value)}</b><span>${t(s.label)}</span></div>`).join('')}</div>
    <p class="lead-p">${t(D.overview.profile)}</p>
    <div class="quote"><small>${L('Our Story', 'قصتنا')}</small><p>${t(D.overview.story)}</p></div>
    <div class="quote"><small>${L('Our Philosophy', 'فلسفتنا')}</small><p>${t(D.overview.philosophy)}</p></div>`)

  // 2 Vision / Mission / network
  add(true, L('Direction', 'التوجه'), L('Vision, mission & network', 'الرؤية والرسالة والشبكة'), `
    <div class="bigcard v"><h3>${icon('Eye', 20, C.goldLight)}${L('Vision', 'الرؤية')}</h3><p>${t(D.overview.vision)}</p></div>
    <div class="bigcard m"><h3>${icon('Target', 20, C.goldLight)}${L('Mission', 'الرسالة')}</h3><p>${t(D.overview.mission)}</p></div>
    <div class="bigcard n"><h3>${icon('Users', 20, C.goldLight)}${t(D.teamStrength.title)}</h3><p>${t(D.teamStrength.description)}</p></div>`)

  // 3 Values
  add(false, L('Our Values', 'قيمنا'), L('Built on principles that last', 'مبادئ نبني عليها'), `
    <div class="grid2 rows3">${D.coreValues.map((v) => `<div class="card"><div class="ico">${icon(v.icon, 20, C.cyan)}</div><h4>${t(v.title)}</h4><p>${t(v.description)}</p></div>`).join('')}</div>`)

  // 4 Services
  add(false, L('Services', 'خدماتنا'), L('From idea to managed go-live', 'من الفكرة إلى الإطلاق المُدار'), `
    <div class="grid2 rows6">${D.services.map((s) => `<div class="row"><div class="ico sm">${icon(s.icon, 18, C.cyan)}</div><div><h4>${t(s.name)}</h4><p>${t(s.description)}</p></div></div>`).join('')}</div>`)

  // 5 Products
  add(false, L('Products', 'منتجاتنا'), L('An integrated product ecosystem', 'منظومة منتجات متكاملة'), `
    <div class="list">${D.products.map((p) => `<div class="row"><div class="ico sm dark">${icon(p.icon, 18, C.goldLight)}</div><div><h4>${t(p.name)}</h4><p>${SHORT[p.id][ar ? 1 : 0]}</p></div></div>`).join('')}</div>`)

  // 6 Screens
  const shots = [['erp/branches.png', 'erp'], ['ai/insights.png', 'ai'], ['realestate/property-management.png', 'realestate'], ['marketing/analytics.png', 'marketing'], ['pos/terminal.png', 'pos'], ['clinic/appointments.png', 'clinic']]
  add(false, L('Products in Action', 'المنتجات قيد التشغيل'), L('Real interfaces, real workflows', 'واجهات حقيقية وعمليات حقيقية'), `
    <div class="shots">${shots.map(([f, id]) => `<figure><div class="frame"><i></i><i></i><i></i></div><img src="${shotFile(f)}"><figcaption>${t(D.products.find((p) => p.id === id).name)}</figcaption></figure>`).join('')}</div>`)

  // 7 Clients & industries
  add(true, L('Clients & Industries', 'العملاء والقطاعات'), L('Organizations we have delivered for', 'جهات سلّمنا لها'), `
    <div class="clients">${D.home.deliveryExperience.map((c) => `<div class="client"><div class="ico dark">${icon(c.icon, 18, C.goldLight)}</div><div><small>${t(c.sector)}</small><h4>${t(c.name)}</h4><p>${t(c.desc)}</p></div></div>`).join('')}</div>
    <div><h3 class="sec">${L('Industries we serve', 'القطاعات التي نخدمها')}</h3><div class="chips">${D.industries.map((i) => `<div class="chip dark">${icon(i.icon, 14, C.goldLight)}<span>${t(i.name)}</span></div>`).join('')}</div></div>
    <div><h3 class="sec">${L('AI & automation', 'الذكاء الاصطناعي والأتمتة')}</h3><div class="chips">${D.home.aiCapabilities.map((a) => `<div class="chip dark">${icon(a.icon, 14, C.goldLight)}<span>${t(a.title)}</span></div>`).join('')}</div></div>`)

  // 8 Process
  add(false, L('How We Work', 'كيف نعمل'), L('A clear, managed delivery process', 'عملية تسليم واضحة ومُدارة'), `
    <div class="grid2 rows5">${D.deliveryProcess.map((s) => `<div class="step"><b>${n(String(s.step).padStart(2, '0'))}</b><div><h4>${t(s.title)}</h4><p>${t(s.description)}</p></div></div>`).join('')}</div>
    <div class="band2"><h3>${t(D.freelancerModel.title)}</h3><p>${t(D.freelancerModel.subtitle)}</p></div>`)

  // 9 Why + integrations
  add(true, L('Why Fratelanza', 'لماذا فراتيلانزا'), L('The difference is accountability', 'الفرق هو المسؤولية'), `
    <div class="whys">${D.whyFratelanza.slice(0, 8).map((w) => `<div class="why">${icon(w.icon, 18, C.gold)}<div><h4>${t(w.title)}</h4><p>${t(w.description)}</p></div></div>`).join('')}</div>
    <div><h3 class="sec">${L('Integrations & compliance', 'التكاملات والامتثال')}</h3><div class="chips">${D.integrations.map((g) => `<div class="chip dark">${icon(g.icon, 14, C.goldLight)}<span>${t(g.name)}</span></div>`).join('')}</div></div>`)

  // 10 Leadership
  add(false, L('Leadership', 'القيادة'), L('The people behind Fratelanza', 'الفريق وراء فراتيلانزا'), `
    ${D.leadership.map((p) => `<div class="person"><div class="avatar">${p.name.replace(/^(Dr\.|Eng\.)\s*/, '').split(' ').map((w) => w[0]).join('')}</div><div><h3>${ar ? (p.isFounder ? 'د. أحمد رفعت' : 'م. أفنان فتحي') : p.name}</h3><div class="role">${t(p.role)}</div><p>${t(p.bio)}</p></div></div>`).join('')}
    <div class="band2"><h3>${L('Our journey', 'رحلتنا')}</h3><p>${D.timeline.map((x) => t(x.title)).join(' · ')}</p></div>`)
  return out
}

const both = (en, ar) => `<span class="en">${en}</span><span class="ar">${ar}</span>`

function build() {
  const css = `${fontCss()}
  @page{size:148mm 210mm;margin:0}
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{font-family:'Plus Jakarta Sans','Tajawal',sans-serif;color:${C.ink};font-size:8.4pt;line-height:1.5}
  .lang-ar,.ar-font{font-family:'Tajawal','Plus Jakarta Sans',sans-serif;line-height:1.7;font-size:9pt}
  .page{width:148mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;background:#fff;padding:12mm 11mm 17mm;display:flex;flex-direction:column}
  .page:last-child{page-break-after:auto}
  .dark-page,.dark{background:${`radial-gradient(circle at 85% 0%,rgba(34,211,238,.22),transparent 45%),radial-gradient(circle at 0% 100%,rgba(212,160,58,.2),transparent 40%),linear-gradient(160deg,${C.navy},${C.navy2} 60%,#0b3b5c)`};color:#fff}
  h1,h2,h3,h4{font-weight:800;color:${C.navy}}
  .lang-en h1,.lang-en h2,.lang-en h3,.lang-en h4{letter-spacing:-.01em}
  .kicker{font-size:7pt;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:${C.cyan}}
  .lang-ar .kicker{letter-spacing:0;font-size:8pt}
  .head{flex:none}.head h2{font-size:18pt;line-height:1.15;margin-top:1.5mm}.lang-ar .head h2{font-size:19pt}
  .rule{width:18mm;height:1mm;border-radius:1mm;background:linear-gradient(90deg,${C.gold},${C.cyanLight});margin-top:3.5mm}
  .dark-page .head h2,.dark-page h3,.dark-page h4{color:#fff}.dark-page .kicker{color:${C.goldLight}}
  .fill{flex:1;min-height:0;margin-top:6mm;display:flex;flex-direction:column;gap:3.6mm}
  .foot{position:absolute;bottom:6.5mm;inset-inline:11mm;display:flex;align-items:center;gap:2mm;font-size:6.4pt;color:#64748b;border-top:.25mm solid ${C.line};padding-top:2mm}
  .dark-page .foot{color:#9fb6cc;border-color:rgba(255,255,255,.16)}
  .foot img{width:4.6mm;height:4.6mm;border-radius:50%}.foot .pn{margin-inline-start:auto;font-weight:800;color:${C.cyan};font-size:7pt}.dark-page .foot .pn{color:${C.goldLight}}
  p{color:${C.muted};font-size:8.2pt}.lang-ar p{font-size:8.8pt}.dark-page p{color:#c5d6e8}
  h4{font-size:9pt}.lang-ar h4{font-size:9.6pt}
  .ico{width:9mm;height:9mm;border-radius:2.4mm;background:${C.surface};display:flex;align-items:center;justify-content:center;flex:none}.ico.sm{width:8mm;height:8mm;border-radius:2.2mm}.ico.dark{background:${C.navy};border:.25mm solid rgba(255,255,255,.14)}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:2.5mm}.stat{background:${C.navy};color:#fff;border-radius:3mm;padding:4mm 1.5mm;text-align:center}
  .stat b{display:block;font-size:14pt;color:${C.goldLight};line-height:1.1}.stat span{font-size:6.4pt;color:#c5d6e8;line-height:1.2;display:block;margin-top:.8mm}
  .lead-p{font-size:9.6pt;color:${C.navy};font-weight:500}.lang-ar .lead-p{font-size:10pt}
  .quote{border-inline-start:1mm solid ${C.gold};padding:2.6mm 3.8mm;background:${C.surface};border-radius:0 2.4mm 2.4mm 0}[dir=rtl] .quote{border-radius:2.4mm 0 0 2.4mm}
  .quote small{font-weight:800;color:${C.cyan};font-size:6.6pt;letter-spacing:.12em;text-transform:uppercase}.lang-ar .quote small{letter-spacing:0;font-size:7.6pt}.quote p{margin-top:.6mm;color:#334155}
  .bigcard{flex:1;border-radius:3.6mm;padding:6mm;display:flex;flex-direction:column;justify-content:center;background:rgba(255,255,255,.07);border:.25mm solid rgba(255,255,255,.16)}
  .bigcard.v{background:linear-gradient(135deg,${C.cyan},#0b5e78);border:none}
  .bigcard h3{font-size:12pt;display:flex;align-items:center;gap:2mm;margin-bottom:2mm;color:${C.goldLight}}.bigcard p{font-size:9.2pt;color:#e6f2f8}.lang-ar .bigcard p{font-size:9.8pt}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:3mm;flex:1;min-height:0}.rows3{grid-template-rows:repeat(3,1fr)}.rows6{grid-template-rows:repeat(6,1fr)}.rows5{grid-template-rows:repeat(5,1fr);flex:none;height:auto}
  .card{background:linear-gradient(160deg,#fff,${C.surface});border:.25mm solid ${C.line};border-radius:3.4mm;padding:4.4mm}.card h4{margin:2mm 0 1mm;font-size:10pt}
  .row{display:flex;gap:2.8mm;align-items:flex-start;padding:2.6mm 3mm;border:.25mm solid ${C.line};border-radius:2.8mm;background:linear-gradient(160deg,#fff,${C.surface})}.row p{font-size:7.4pt;line-height:1.4}.lang-ar .row p{font-size:8pt;line-height:1.55}
  .list{display:flex;flex-direction:column;gap:2mm;flex:1;min-height:0}.list .row{flex:1;align-items:center;padding:1.6mm 3mm}.list .row p{font-size:7.8pt;line-height:1.35}.lang-ar .list .row p{font-size:7.9pt;line-height:1.4}.lang-ar .list{gap:1.4mm}.lang-ar .list .row{padding:1mm 3mm}.lang-ar .list .row h4{font-size:9pt}
  .shots{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);gap:3.4mm;flex:1;min-height:0}
  figure{display:flex;flex-direction:column;border-radius:2.4mm;overflow:hidden;box-shadow:0 1.4mm 4.5mm rgba(10,31,58,.2);background:${C.navy};min-height:0}
  figure .frame{display:flex;gap:1mm;padding:1.3mm 2mm;background:${C.navy}}figure .frame i{width:1.3mm;height:1.3mm;border-radius:50%;background:#64748b}
  figure img{display:block;width:100%;flex:1;min-height:0;object-fit:cover;object-position:top left}figcaption{padding:1.6mm 2.4mm;background:#fff;font-weight:800;font-size:7.4pt;color:${C.navy}}
  .clients{display:grid;gap:2.6mm}.client{display:flex;gap:3mm;background:#fff;border-radius:3mm;padding:3.2mm;border-top:.9mm solid ${C.gold}}.client h4{color:${C.navy}!important}.client p{color:${C.muted}!important;font-size:7.4pt;line-height:1.4}
  .client small{display:block;color:${C.cyan};font-weight:800;font-size:6pt;text-transform:uppercase;letter-spacing:.1em}.lang-ar .client small{letter-spacing:0;font-size:7pt}
  h3.sec{font-size:9.6pt;color:${C.goldLight}!important;margin-bottom:2mm}.chips{display:flex;flex-wrap:wrap;gap:1.6mm}
  .chip{display:flex;align-items:center;gap:1.4mm;padding:1.4mm 2.6mm;border-radius:10mm;font-weight:700;font-size:6.8pt;background:rgba(255,255,255,.08);border:.25mm solid rgba(255,255,255,.2);color:#fff}.lang-ar .chip{font-size:7.6pt}
  .step{display:flex;gap:2.4mm;padding:2.6mm 3mm;border-radius:2.8mm;border:.25mm solid ${C.line};background:linear-gradient(160deg,#fff,${C.surface})}.step b{font-size:12pt;color:${C.gold};line-height:1;font-weight:800}.step p{font-size:7.2pt;line-height:1.4}.lang-ar .step p{font-size:7.8pt;line-height:1.5}
  .band2{padding:4.4mm;border-radius:3.2mm;background:linear-gradient(135deg,${C.navy},${C.navy2})}.band2 h3{color:${C.goldLight};font-size:10pt;margin-bottom:1mm}.band2 p{color:#c5d6e8;font-size:8pt}.lang-ar .band2 p{font-size:8.6pt}
  .whys{display:flex;flex-direction:column;flex:1;min-height:0}.why{flex:1;display:flex;gap:3mm;align-items:center;border-bottom:.25mm solid rgba(255,255,255,.14)}.why p{font-size:7.4pt;line-height:1.4}.lang-ar .why p{font-size:8pt}
  .person{display:grid;grid-template-columns:20mm 1fr;gap:5mm;padding:5mm;border-radius:3.4mm;border:.25mm solid ${C.line};background:linear-gradient(160deg,#fff,${C.surface});flex:1;align-items:start}
  .avatar{width:20mm;height:20mm;border-radius:50%;background:linear-gradient(135deg,${C.navy},${C.cyan});color:${C.goldLight};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14pt;box-shadow:0 0 0 .8mm ${C.gold}}
  .person h3{font-size:12pt}.person .role{color:${C.cyan};font-weight:800;font-size:7.6pt;margin:.6mm 0 2mm}.person p{font-size:8pt;color:#334155}.lang-ar .person p{font-size:8.6pt}

  /* cover / bilingual pages */
  .cover{padding:0;justify-content:space-between;align-items:center;text-align:center;color:#fff}
  .cover .grid{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:9mm 9mm}
  .cover>*{position:relative}.cover .top{margin-top:22mm}.cover img.logo{width:66mm;height:66mm;border-radius:50%;box-shadow:0 0 0 1mm rgba(242,216,154,.7),0 8mm 22mm rgba(0,0,0,.45)}
  .cover h1{color:#fff;font-size:28pt;letter-spacing:.14em;margin-top:9mm}.cover .arn{font-family:Tajawal;font-weight:800;font-size:24pt;color:${C.goldLight};line-height:1.2}
  .cover .rule{margin:6mm auto}.cover .sl{font-size:9pt;letter-spacing:.14em;font-weight:700;text-transform:uppercase;color:#c5d6e8}.cover .sla{font-family:Tajawal;font-size:12pt;color:#c5d6e8;margin-top:1mm}
  .cover .bot{width:100%;padding:6mm 10mm 8mm;background:rgba(255,255,255,.07);border-top:.25mm solid rgba(255,255,255,.18);display:flex;justify-content:space-between;align-items:center;font-size:7.4pt;color:#c5d6e8}
  .cover .bot b{color:${C.goldLight};font-size:8.4pt;letter-spacing:.14em}
  .tag{display:inline-block;padding:1.6mm 4mm;border:.25mm solid ${C.gold};border-radius:10mm;color:${C.goldLight};font-weight:800;font-size:7.4pt;letter-spacing:.12em;text-transform:uppercase;margin-top:6mm}.tag .ar{font-family:Tajawal;letter-spacing:0;margin-inline-start:2mm;font-size:8.4pt}
  .welcome{padding:12mm 11mm 17mm}.welcome h2{font-size:18pt}.welcome .fill{gap:3mm}.welcome .cols{display:grid;grid-template-columns:1fr 1fr;gap:6mm;flex:1;min-height:0}
  .toc{list-style:none;display:flex;flex-direction:column;gap:1.6mm}.toc li{display:flex;justify-content:space-between;gap:2mm;padding:1.2mm 0;border-bottom:.25mm dashed ${C.line};font-size:8pt;font-weight:600;color:${C.navy}}.toc li b{color:${C.cyan}}
  .welcome .ar-col{direction:rtl;font-family:Tajawal;font-size:9pt}.welcome .ar-col .toc li{font-size:9pt}.welcome h4.cap{font-size:9pt;color:${C.cyan};margin-bottom:2mm;letter-spacing:.12em;text-transform:uppercase}.welcome .ar-col h4.cap{letter-spacing:0;font-size:10pt}
  .contact{padding:0;justify-content:center;align-items:center;text-align:center;color:#fff}.contact>*{position:relative}
  .contact h2{color:#fff;font-size:20pt}.contact .ar-h{font-family:Tajawal;font-weight:800;font-size:19pt;color:${C.goldLight}}
  .clist{margin-top:5mm;display:grid;gap:2.2mm;width:112mm;text-align:start}.clist div{display:flex;gap:3mm;align-items:center;padding:2.6mm 3.6mm;border-radius:3mm;background:rgba(255,255,255,.08);border:.25mm solid rgba(255,255,255,.16);font-size:8.4pt}
  .clist small{display:block;color:${C.goldLight};font-weight:800;font-size:6pt;letter-spacing:.1em;text-transform:uppercase}.clist .ar{font-family:Tajawal}
  .qrrow{display:flex;align-items:center;gap:6mm;margin-top:7mm;color:#fff}.qrrow .t{text-align:start;font-size:8pt;max-width:56mm;color:#c5d6e8}.qrrow .t b{display:block;color:${C.goldLight};font-size:9.4pt;margin-bottom:1mm}
  .back{padding:0;justify-content:center;align-items:center;text-align:center;color:#fff}.back img.logo{width:48mm;height:48mm;border-radius:50%;box-shadow:0 0 0 .9mm rgba(242,216,154,.7)}
  .back .a{font-family:Tajawal;font-weight:800;font-size:18pt;color:${C.goldLight};margin-top:6mm}.back .e{font-weight:800;letter-spacing:.14em;font-size:13pt;margin-top:2mm}.back .s{margin-top:4mm;color:#c5d6e8;font-size:8pt;letter-spacing:.1em;text-transform:uppercase}.back .w{margin-top:8mm}
  `

  const cover = `<section class="page dark cover"><div class="grid"></div><div class="top"><img class="logo" src="${LOGO}"><h1>FRATELANZA</h1><div class="arn">فراتيلانزا</div><div class="rule"></div><div class="sl">Building Tomorrow Together</div><div class="sla">نبني الغد معاً</div><div class="tag">Company Profile<span class="ar">الملف التعريفي ٢٠٢٦</span></div></div>
    <div class="bot"><div><b>ENGLISH · العربية</b></div><div dir="ltr">${info.web}</div></div></section>`

  const en = langPages('en', 3), ar = langPages('ar', 13)
  const enToc = ['About us', 'Vision, mission & network', 'Values', 'Services', 'Products', 'Products in action', 'Clients & industries', 'How we work', 'Why Fratelanza', 'Leadership']
  const arToc = ['من نحن', 'الرؤية والرسالة والشبكة', 'قيمنا', 'خدماتنا', 'منتجاتنا', 'المنتجات قيد التشغيل', 'العملاء والقطاعات', 'كيف نعمل', 'لماذا فراتيلانزا', 'القيادة']
  const arN = (x) => String(x).replace(/\d/g, (d) => AR_DIGITS[d])
  const welcome = `<section class="page welcome" dir="ltr"><div class="head"><div class="kicker">Fratelanza Company Profile · الملف التعريفي</div><h2>Welcome <span style="font-family:Tajawal;color:${C.cyan}">· أهلاً بكم</span></h2><div class="rule"></div></div>
    <div class="fill"><p style="font-size:8.8pt;color:#334155">Fratelanza is one accountable technology partner for ERP, AI and cloud platforms — from idea to managed go-live. This booklet is bilingual: <b>English starts on page 3</b>, and <b dir="rtl" style="font-family:Tajawal;unicode-bidi:isolate">العربية تبدأ من صفحة ${arN(13)}</b>.</p>
    <div class="stats">${D.company.stats.map((s) => `<div class="stat"><b dir="ltr">${s.value}</b><span>${s.label.en}<br><span style="font-family:Tajawal">${s.label.ar}</span></span></div>`).join('')}</div>
    <div class="cols"><div><h4 class="cap">Contents</h4><ul class="toc">${enToc.map((x, i) => `<li><span>${x}</span><b>${3 + i}</b></li>`).join('')}</ul></div>
    <div class="ar-col"><h4 class="cap">المحتويات</h4><ul class="toc">${arToc.map((x, i) => `<li><span>${x}</span><b>${arN(13 + i)}</b></li>`).join('')}</ul></div></div></div>
    <div class="foot"><img src="${LOGO}"><span>Fratelanza — Company Profile · الملف التعريفي</span><span class="pn">2</span></div></section>`

  const contact = `<section class="page dark contact"><div class="grid" style="position:absolute;inset:0;opacity:.06;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:9mm 9mm"></div>
    <h2>Let's build what's next</h2><div class="ar-h">لنبنِ ما هو قادم</div>
    <div class="clist">
      <div>${icon('Mail', 18, C.goldLight)}<span><small>Email · البريد</small>${info.email}</span></div>
      <div>${icon('MessageCircle', 18, C.goldLight)}<span><small>WhatsApp · واتساب</small><span dir="ltr">${info.phoneRaw}</span></span></div>
      <div>${icon('Globe', 18, C.goldLight)}<span><small>Website · الموقع</small><span dir="ltr">${info.web}</span></span></div>
      <div>${icon('MapPin', 18, C.goldLight)}<span><small>Address · العنوان</small>${D.company.address.en}<br><span class="ar">${D.company.address.ar}</span></span></div>
    </div>
    <div class="qrrow">${qrTile('booklet', 30, { caption: false })}<div class="t"><b>Scan to visit our website · امسح لزيارة موقعنا</b>www.fratelanza.com<br><span style="font-family:Tajawal">تعرّف على منتجاتنا وخدماتنا وتواصل معنا.</span></div></div>
</section>`

  const back = `<section class="page dark back"><img class="logo" src="${LOGO}"><div class="a">فراتيلانزا</div><div class="e">FRATELANZA</div><div class="s">Building Tomorrow Together · نبني الغد معاً</div><div class="w" dir="ltr" style="color:${C.goldLight};font-weight:700;font-size:9pt">${info.web}</div></section>`

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Fratelanza — Company Profile · الملف التعريفي</title><style>${css}</style></head><body>${cover}${welcome}${en.join('')}${ar.join('')}${contact}${back}</body></html>`
}

await renderPdf({ html: build(), out: path.join(ROOT, 'output/Fratelanza-Company-Profile.pdf'), width: '148mm', height: '210mm' })
await closeBrowser()
