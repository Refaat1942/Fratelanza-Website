// Builds the bilingual (EN / AR) company profile PDFs from the website's own content.
import path from 'node:path'
import { content as D, C, LOGO, fileUrl, ROOT, icon, fontCss, esc, info, pub, renderPdf, closeBrowser } from './lib.mjs'

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩'
const build = (lang) => {
  const ar = lang === 'ar'
  const t = (o) => o[lang]
  const n = (s) => (ar ? String(s).replace(/\d/g, (d) => AR_DIGITS[d]) : String(s))
  const L = (en, arb) => (ar ? arb : en)
  const arrow = ar ? '←' : '→'
  const total = 11
  const foot = (i) => `<div class="foot"><img src="${LOGO}"><span>${L('Fratelanza — Company Profile', 'فراتيلانزا — الملف التعريفي')}</span><span class="pn" dir="ltr">${n(i)} / ${n(total)}</span></div>`
  const head = (kicker, title, sub) => `
    <div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2>${sub ? `<p class="lead">${sub}</p>` : ''}<div class="rule"></div></div>`

  const stats = D.company.stats.map((s) => `<div class="stat"><b dir="ltr">${n(s.value)}</b><span>${t(s.label)}</span></div>`).join('')

  const values = D.coreValues.map((v) => `
    <div class="card"><div class="ico">${icon(v.icon, 22, C.cyan)}</div><h4>${t(v.title)}</h4><p>${t(v.description)}</p></div>`).join('')

  const services = D.services.map((s) => `
    <div class="svc"><div class="ico sm">${icon(s.icon, 20, C.cyan)}</div><div><h4>${t(s.name)}</h4><p>${t(s.description)}</p></div></div>`).join('')

  const prods = D.products.map((p) => `
    <div class="prod"><div class="ico sm dark">${icon(p.icon, 20, C.goldLight)}</div><div><h4>${t(p.name)}</h4><p>${t(D.productDetails[p.id].description)}</p></div></div>`).join('')

  const shots = [
    ['erp/branches.png', 'erp'], ['ai/insights.png', 'ai'], ['realestate/property-management.png', 'realestate'],
    ['marketing/analytics.png', 'marketing'], ['pos/terminal.png', 'pos'], ['clinic/appointments.png', 'clinic'],
  ].map(([f, id]) => `<figure><div class="frame"><i></i><i></i><i></i></div><img src="${fileUrl(path.join(ROOT, 'assets/shots/' + f.replace('/', '-').replace('.png', '.jpg')))}"><figcaption>${t(D.products.find((p) => p.id === id).name)}</figcaption></figure>`).join('')

  const inds = D.industries.map((i) => `<div class="chip">${icon(i.icon, 18, C.cyan)}<span>${t(i.name)}</span></div>`).join('')
  const clients = D.home.deliveryExperience.map((c) => `
    <div class="client"><div class="ico dark">${icon(c.icon, 22, C.goldLight)}</div><small>${t(c.sector)}</small><h4>${t(c.name)}</h4><p>${t(c.desc)}</p></div>`).join('')

  const steps = D.deliveryProcess.map((s) => `
    <div class="step"><b>${n(String(s.step).padStart(2, '0'))}</b><div><h4>${t(s.title)}</h4><p>${t(s.description)}</p></div></div>`).join('')

  const why = D.whyFratelanza.slice(0, 8).map((w) => `
    <div class="why">${icon(w.icon, 20, C.gold)}<div><h4>${t(w.title)}</h4><p>${t(w.description)}</p></div></div>`).join('')

  const integ = D.integrations.map((g) => `<div class="chip sm">${icon(g.icon, 16, C.cyan)}<span>${t(g.name)}</span></div>`).join('')
  const ai = D.home.aiCapabilities.map((a) => `<div class="chip sm dark">${icon(a.icon, 16, C.goldLight)}<span>${t(a.title)}</span></div>`).join('')

  const people = D.leadership.map((p) => `
    <div class="person"><div class="avatar">${p.name.replace(/^(Dr\.|Eng\.)\s*/, '').split(' ').map((w) => w[0]).join('')}</div><div>
      <h3>${ar ? (p.isFounder ? 'د. أحمد رفعت' : 'م. أفنان فتحي') : esc(p.name)}</h3><div class="role">${t(p.role)}</div><p>${t(p.bio)}</p></div></div>`).join('')

  const css = `
  ${fontCss()}
  @page{size:210mm 297mm;margin:0}
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{font-family:${ar ? "'Tajawal'" : "'Plus Jakarta Sans'"},'Tajawal','Plus Jakarta Sans',sans-serif;color:${C.ink};font-size:10.2pt;line-height:${ar ? 1.75 : 1.55}}
  .page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:#fff;padding:20mm 18mm 24mm;display:flex;flex-direction:column}
  .page>.head{flex:none}.page>.fill{flex:1;display:flex;flex-direction:column;gap:6mm;margin-top:8mm;min-height:0;padding-bottom:5mm}.fill>.grid2{min-height:0}.fill>.grid2,.fill>.grid3,.fill>.steps,.fill>.shots{flex:1;margin-top:0;grid-auto-rows:1fr}.fill>.spread{flex:1;display:flex;flex-direction:column;justify-content:space-between}
  .page:last-child{page-break-after:auto}
  .dark-page{background:linear-gradient(160deg,${C.navy} 0%,${C.navy2} 60%,#0b3b5c 100%);color:#fff}
  h1,h2,h3,h4{letter-spacing:${ar ? 0 : '-0.01em'};font-weight:800}
  .kicker{font-size:8.5pt;font-weight:700;letter-spacing:${ar ? 0 : '.16em'};text-transform:uppercase;color:${C.cyan}}
  .head h2{font-size:25pt;line-height:1.15;margin-top:2mm;color:${C.navy}}
  .head .lead{margin-top:3mm;color:${C.muted};font-size:11pt;max-width:150mm}
  .rule{width:22mm;height:1.2mm;border-radius:1mm;background:linear-gradient(90deg,${C.gold},${C.cyanLight});margin-top:5mm}
  .dark-page .head h2{color:#fff}.dark-page .head .lead{color:#c5d6e8}.dark-page .kicker{color:${C.goldLight}}
  .foot{position:absolute;bottom:9mm;inset-inline:18mm;display:flex;align-items:center;gap:3mm;font-size:8pt;color:#64748b;border-top:.3mm solid ${C.line};padding-top:3mm}
  .foot img{width:6mm;height:6mm}.foot .pn{margin-inline-start:auto;font-weight:700;color:${C.cyan}}
  .dark-page .foot{color:#9fb6cc;border-color:rgba(255,255,255,.15)}
  .ico{width:11mm;height:11mm;border-radius:3mm;background:${C.surface};display:flex;align-items:center;justify-content:center;flex:none}
  .ico.sm{width:9.5mm;height:9.5mm;border-radius:2.6mm}.ico.dark{background:${C.navy}}
  .card{background:linear-gradient(160deg,#fff,${C.surface});border:.3mm solid ${C.line};border-radius:4mm;padding:7mm}
  .card h4{margin:3mm 0 1.5mm;font-size:11.5pt;color:${C.navy}}.card p,.svc p,.prod p,.step p,.why p,.client p{color:${C.muted};font-size:9.6pt}
  h4{font-size:10.5pt;color:${C.navy}}

  /* cover */
  .cover{padding:0;display:flex;flex-direction:column;justify-content:space-between}
  .cover:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 15%,rgba(34,211,238,.28),transparent 45%),radial-gradient(circle at 10% 90%,rgba(212,160,58,.25),transparent 40%)}
  .cover .grid{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:12mm 12mm}
  .cover .in{position:relative;padding:26mm 22mm 0}
  .cover img.logo{width:78mm;height:78mm;border-radius:50%;box-shadow:0 0 0 1.2mm rgba(242,216,154,.7),0 10mm 30mm rgba(0,0,0,.45)}
  .cover h1{font-size:${ar ? '46pt' : '40pt'};line-height:1.08;margin-top:16mm}
  .cover h1 span{color:${C.goldLight}}
  .cover .sub{margin-top:5mm;font-size:13pt;color:#c5d6e8;max-width:130mm}
  .cover .band{position:relative;margin:0;padding:9mm 22mm 12mm;background:rgba(255,255,255,.06);border-top:.3mm solid rgba(255,255,255,.18);display:flex;justify-content:space-between;align-items:flex-end;font-size:9.5pt;color:#c5d6e8}
  .cover .band b{display:block;color:#fff;font-size:12pt}
  .tag{display:inline-block;margin-top:9mm;padding:2mm 5mm;border:.3mm solid ${C.gold};border-radius:20mm;color:${C.goldLight};font-weight:700;font-size:9pt;letter-spacing:${ar ? 0 : '.14em'};text-transform:uppercase}

  /* about */
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin:9mm 0}
  .stat{background:${C.navy};color:#fff;border-radius:4mm;padding:6mm 4mm;text-align:center}
  .stat b{display:block;font-size:22pt;color:${C.goldLight};line-height:1.1}.stat span{font-size:8.5pt;color:#c5d6e8}
  .two{display:grid;grid-template-columns:1fr 1fr;gap:8mm}
  .about p{margin-bottom:4mm;color:#334155;font-size:10.6pt}
  .quote{border-inline-start:1.2mm solid ${C.gold};padding:3mm 5mm;background:${C.surface};border-radius:0 3mm 3mm 0;margin-top:4mm}
  [dir=rtl] .quote{border-radius:3mm 0 0 3mm}
  .quote small{font-weight:800;color:${C.cyan};font-size:8.5pt;letter-spacing:${ar ? 0 : '.12em'};text-transform:uppercase}
  .vm{display:grid;gap:5mm;margin-top:8mm}
  .vm div{border-radius:4mm;padding:6mm;color:#fff}
  .vm .v{background:linear-gradient(135deg,${C.cyan},#0b5e78)}.vm .m{background:linear-gradient(135deg,${C.navy},${C.navy2})}
  .vm h3{font-size:13pt;color:${C.goldLight};margin-bottom:2mm;display:flex;align-items:center;gap:2mm}.vm p{font-size:10pt;color:#e6f2f8}
  .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin-top:8mm}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:4mm 6mm;margin-top:8mm}
  .svc,.prod,.why{display:flex;gap:3.5mm;align-items:flex-start;padding:4mm;border:.3mm solid ${C.line};border-radius:3.5mm;background:#fff}
  .prod{background:linear-gradient(160deg,#fff,${C.surface});padding:3mm 3.5mm}.prod p{font-size:9pt}.prods{gap:3mm 5mm!important}.prods>.prod:last-child{grid-column:span 2}
  .why{flex:1;align-items:center;border:none;border-bottom:.3mm solid rgba(255,255,255,.15);border-radius:0;background:none;padding:3.2mm 0}
  .dark-page .why h4{color:#fff}.dark-page .why p{color:#b7cbe0}
  /* shots */
  .shots{display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-top:8mm}
  figure{border-radius:3mm;overflow:hidden;box-shadow:0 2mm 8mm rgba(10,31,58,.18);background:${C.navy}}
  figure .frame{display:flex;gap:1.2mm;padding:1.8mm 2.5mm;background:${C.navy}}figure .frame i{width:1.6mm;height:1.6mm;border-radius:50%;background:#64748b}
  figure{display:flex;flex-direction:column}figure img{display:block;width:100%;flex:1;min-height:0;object-fit:cover;object-position:top left}
  figcaption{padding:2.2mm 3mm;background:#fff;font-weight:700;font-size:9pt;color:${C.navy}}
  .chips{display:flex;flex-wrap:wrap;gap:2.5mm;margin-top:6mm}
  .chip{display:flex;align-items:center;gap:2mm;padding:2.2mm 4mm;border-radius:20mm;background:${C.surface};border:.3mm solid ${C.line};font-weight:700;font-size:9pt;color:${C.navy}}
  .chip.sm{font-size:8.5pt;padding:1.8mm 3.4mm}.chip.dark{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2);color:#fff}
  .client{background:#fff;border-radius:4mm;padding:5mm;border-top:1.2mm solid ${C.gold}}
  .client small{display:block;margin-top:3mm;color:${C.cyan};font-weight:800;font-size:7.5pt;text-transform:uppercase;letter-spacing:${ar ? 0 : '.12em'}}.client h4{margin:1mm 0 1.5mm}
  h3.sec{margin-top:8mm;font-size:12pt;color:${C.navy}}.dark-page h3.sec{color:${C.goldLight}}
  .steps{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4mm;margin-top:8mm}
  .step{display:flex;gap:3mm;padding:4mm;border-radius:3.5mm;border:.3mm solid ${C.line};background:linear-gradient(160deg,#fff,${C.surface})}
  .step b{font-size:15pt;color:${C.gold};line-height:1;font-weight:800}
  .band2{margin-top:7mm;padding:6mm;border-radius:4mm;background:linear-gradient(135deg,${C.navy},${C.navy2});color:#fff}
  .band2 h3{color:${C.goldLight};font-size:13pt;margin-bottom:2mm}.band2 p{color:#c5d6e8;font-size:9.6pt}
  .person{display:grid;grid-template-columns:24mm 1fr;gap:7mm;padding:8mm;border-radius:4mm;border:.3mm solid ${C.line};background:linear-gradient(160deg,#fff,${C.surface});flex:1;align-items:start}
  .avatar{width:24mm;height:24mm;border-radius:50%;background:linear-gradient(135deg,${C.navy},${C.cyan});color:${C.goldLight};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17pt;box-shadow:0 0 0 1mm ${C.gold}}
  .person h3{font-size:14pt;color:${C.navy}}.person .role{color:${C.cyan};font-weight:700;font-size:9.5pt;margin:1mm 0 2.5mm}.person p{color:#334155;font-size:10.4pt}
  /* contact */
  .contact{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
  .contact:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(34,211,238,.25),transparent 55%),radial-gradient(circle at 50% 100%,rgba(212,160,58,.22),transparent 45%)}
  .contact>*{position:relative}
  .contact img.logo{width:52mm;height:52mm;border-radius:50%;box-shadow:0 0 0 1mm rgba(242,216,154,.7)}
  .contact h2{font-size:26pt;margin-top:9mm}.contact .s{color:#c5d6e8;margin-top:3mm;font-size:12pt}
  .clist{margin-top:11mm;display:grid;gap:4mm;text-align:start;width:120mm}
  .clist div{display:flex;gap:4mm;align-items:center;padding:4mm 5mm;border-radius:4mm;background:rgba(255,255,255,.08);border:.3mm solid rgba(255,255,255,.16);font-size:11pt}
  .clist small{display:block;color:${C.goldLight};font-weight:700;font-size:7.8pt;letter-spacing:${ar ? 0 : '.1em'};text-transform:uppercase}
  .clist span[dir=ltr]{unicode-bidi:isolate}
  .social{margin-top:9mm;color:#9fb6cc;font-size:9.5pt}
  `

  const html = `<!doctype html><html lang="${lang}" dir="${ar ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><title>${L('Fratelanza Company Profile', 'الملف التعريفي لفراتيلانزا')}</title><style>${css}</style></head><body>

  <section class="page dark-page cover"><div class="grid"></div>
    <div class="in"><img class="logo" src="${LOGO}">
      <h1>${L('Building', 'نبني')}<br><span>${L('Tomorrow Together', 'الغد معاً')}</span></h1>
      <p class="sub">${t(D.company.tagline)}</p>
      <div class="tag">${L('Company Profile 2026', 'الملف التعريفي ٢٠٢٦')}</div></div>
    <div class="band"><div><b>Fratelanza</b>${L('Technology · ERP · AI · Cloud', 'تقنية · ERP · ذكاء اصطناعي · سحابة')}</div><div style="text-align:end"><b dir="ltr">${info.web}</b>${info.email}</div></div>
  </section>

  <section class="page about">${head(L('About Us', 'من نحن'), L('One accountable technology partner', 'شريك تقني واحد مسؤول'), '')}
    <div class="fill"><div class="stats" style="margin:0">${stats}</div>
    <div class="spread">
    <p style="font-size:11.8pt;color:${C.navy};font-weight:500">${t(D.overview.profile)}</p>
    <div class="quote"><small>${L('Our Story', 'قصتنا')}</small><p style="margin:1mm 0 0">${t(D.overview.story)}</p></div>
    <div class="quote"><small>${L('Our Philosophy', 'فلسفتنا')}</small><p style="margin:1mm 0 0">${t(D.overview.philosophy)}</p></div>
    <div class="vm" style="margin:0"><div class="v"><h3>${icon('Eye', 20, C.goldLight)}${L('Vision', 'الرؤية')}</h3><p>${t(D.overview.vision)}</p></div>
    <div class="m"><h3>${icon('Target', 20, C.goldLight)}${L('Mission', 'الرسالة')}</h3><p>${t(D.overview.mission)}</p></div></div></div></div>
    ${foot(2)}</section>

  <section class="page">${head(L('Our Values', 'قيمنا'), L('Built on principles that last', 'مبادئ نبني عليها'), L('Six commitments that shape every platform and every engagement.', 'ست التزامات تصوغ كل منصة وكل مشروع.'))}
    <div class="fill"><div class="grid3" style="grid-template-columns:1fr 1fr">${values}</div>
    <div class="band2" style="margin:0"><h3>${t(D.teamStrength.title)}</h3><p>${t(D.teamStrength.description)}</p></div></div>${foot(3)}</section>

  <section class="page">${head(L('Services', 'خدماتنا'), L('From idea to managed go-live', 'من الفكرة إلى الإطلاق المُدار'), L('Twelve capabilities delivered under one framework and one point of accountability.', 'اثنتا عشرة قدرة تُسلَّم ضمن إطار واحد ونقطة مسؤولية واحدة.'))}
    <div class="fill"><div class="grid2">${services}</div></div>${foot(4)}</section>

  <section class="page">${head(L('Products', 'منتجاتنا'), L('An integrated product ecosystem', 'منظومة منتجات متكاملة'), L('Production-ready platforms with Arabic & English interfaces, built for the Middle East and Africa.', 'منصات جاهزة للإنتاج بواجهات عربية وإنجليزية، مصممة للشرق الأوسط وأفريقيا.'))}
    <div class="fill"><div class="grid2 prods">${prods}</div></div>${foot(5)}</section>

  <section class="page">${head(L('Products in Action', 'المنتجات قيد التشغيل'), L('Real interfaces, real workflows', 'واجهات حقيقية وعمليات حقيقية'), L('Screens from live Fratelanza platforms.', 'لقطات من منصات فراتيلانزا الفعلية.'))}
    <div class="fill"><div class="shots">${shots}</div></div>${foot(6)}</section>

  <section class="page dark-page">${head(L('Clients & Industries', 'العملاء والقطاعات'), L('Organizations we have delivered for', 'جهات سلّمنا لها'), L('Selected partners and institutions — managed delivery by Fratelanza.', 'شركاء ومؤسسات مختارة — تسليم مُدار بواسطة فراتيلانزا.'))}
    <div class="fill"><div class="grid3" style="flex:none">${clients}</div><div class="spread">
    <div><h3 class="sec" style="margin:0">${L('Industries we serve', 'القطاعات التي نخدمها')}</h3><div class="chips">${D.industries.map((i) => `<div class="chip dark">${icon(i.icon, 18, C.goldLight)}<span>${t(i.name)}</span></div>`).join('')}</div></div>
    <div><h3 class="sec" style="margin:0">${L('AI & automation capabilities', 'قدرات الذكاء الاصطناعي والأتمتة')}</h3><div class="chips" style="margin-top:4mm">${ai}</div></div></div></div>${foot(7)}</section>

  <section class="page">${head(L('How We Work', 'كيف نعمل'), L('A clear, managed delivery process', 'عملية تسليم واضحة ومُدارة'), L('Nine stages from discovery to continuous improvement.', 'تسع مراحل من الاكتشاف إلى التحسين المستمر.'))}
    <div class="fill"><div class="steps">${steps}</div>
    <div class="band2" style="margin:0"><h3>${t(D.freelancerModel.title)}</h3><p>${t(D.freelancerModel.subtitle)}</p></div></div>${foot(8)}</section>

  <section class="page dark-page">${head(L('Why Fratelanza', 'لماذا فراتيلانزا'), L('The difference is accountability', 'الفرق هو المسؤولية'), L('Enterprise reliability with the flexibility of a specialist network.', 'موثوقية مؤسسية مع مرونة شبكة متخصصين.'))}
    <div class="fill"><div class="spread">${why}</div>
    <div><h3 class="sec" style="margin:0">${L('Integrations & compliance', 'التكاملات والامتثال')}</h3><div class="chips" style="margin-top:4mm">${integ.replace(/class="chip sm"/g, 'class="chip sm dark"')}</div></div></div>${foot(9)}</section>

  <section class="page">${head(L('Leadership', 'القيادة'), L('The people behind Fratelanza', 'الفريق وراء فراتيلانزا'), '')}
    <div class="fill">${people}
    <div class="band2" style="margin:0"><h3>${L('Our journey', 'رحلتنا')}</h3><p>${D.timeline.map((x) => t(x.title)).join(' · ')}</p></div></div>${foot(10)}</section>

  <section class="page contact dark-page"><img class="logo" src="${LOGO}">
    <h2>${L("Let's build what's next", 'لنبنِ ما هو قادم')}</h2><div class="s">${L('Tell us about your idea or challenge — we will take it from there.', 'أخبرنا بفكرتك أو تحديك — ونتولى الباقي.')}</div>
    <div class="clist">
      <div>${icon('Mail', 22, C.goldLight)}<span><small>${L('Email', 'البريد الإلكتروني')}</small>${info.email}</span></div>
      <div>${icon('MessageCircle', 22, C.goldLight)}<span><small>WhatsApp</small><span dir="ltr">${info.phoneRaw}</span></span></div>
      <div>${icon('Globe', 22, C.goldLight)}<span><small>${L('Website', 'الموقع')}</small><span dir="ltr">${info.web}</span></span></div>
      <div>${icon('MapPin', 22, C.goldLight)}<span><small>${L('Address', 'العنوان')}</small>${t(D.company.address)}</span></div>
      <div>${icon('Clock', 22, C.goldLight)}<span><small>${L('Working hours', 'ساعات العمل')}</small>${t(D.company.workingHours)}</span></div>
    </div>
    <div class="social">LinkedIn · Facebook · Instagram · TikTok — @fratelanza</div>
  </section>
  </body></html>`
  return html
}

for (const lang of ['en', 'ar']) {
  await renderPdf({ html: build(lang), out: path.join(ROOT, `output/Fratelanza-Company-Profile-${lang.toUpperCase()}.pdf`), width: '210mm', height: '297mm' })
}
await closeBrowser()
