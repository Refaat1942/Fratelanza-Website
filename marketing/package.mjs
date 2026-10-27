// Assembles the deliverable ZIP: booklet (screen + print), print designs, guide, QR files, README.
import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync, writeFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'
import { ROOT, LINKS_URL, qrSvg, qrUrl, fileUrl } from './lib.mjs'
import { scenes } from './video/scenes.mjs'
import { existsSync } from 'node:fs'

const STAGE = path.join(ROOT, 'build/pack/Fratelanza-Marketing-Pack')
rmSync(path.join(ROOT, 'build/pack'), { recursive: true, force: true })
const dir = (n) => { const p = path.join(STAGE, n); mkdirSync(p, { recursive: true }); return p }
const out = path.join(ROOT, 'output')

cpSync(path.join(out, 'Fratelanza-Company-Profile.pdf'), path.join(dir('01-Company-Profile-Booklet'), 'Fratelanza-Company-Profile-A5-for-email-and-screen.pdf'))
cpSync(path.join(out, 'Fratelanza-Company-Profile-PRINT-A4-booklet.pdf'), path.join(dir('01-Company-Profile-Booklet'), 'Fratelanza-Company-Profile-PRINT-A4-duplex-fold-staple.pdf'))
cpSync(path.join(out, 'print'), dir('02-Print-Designs-with-QR'), { recursive: true })
cpSync(path.join(out, 'Fratelanza-Simple-Profile-AR.pdf'), path.join(dir('05-Simple-Arabic-Profile'), 'Fratelanza-Simple-Profile-AR.pdf'))
cpSync(path.join(out, 'Fratelanza-Print-Design-Guide.pdf'), path.join(dir('03-Design-Guide'), 'Fratelanza-Print-Design-Guide.pdf'))

// Video + voice kit
const vid = path.join(out, 'video')
if (existsSync(path.join(vid, 'Fratelanza-Video.mp4'))) {
  const vd = dir('06-Video')
  cpSync(path.join(vid, 'Fratelanza-Video.mp4'), path.join(vd, 'Fratelanza-Video.mp4'))
  const kit = path.join(vd, 'Add-Egyptian-Voice-Kit')
  cpSync(path.join(ROOT, 'video/voice-kit'), kit, { recursive: true })
  cpSync(path.join(vid, 'Fratelanza-Video-no-audio.mp4'), path.join(kit, 'Fratelanza-Video-no-audio.mp4'))
  cpSync(path.join(vid, 'music.wav'), path.join(kit, 'music.wav'))
  writeFileSync(path.join(kit, 'scenes.json'), JSON.stringify(scenes.map(({ id, start, dur, text }) => ({ id, start, dur, text })), null, 1))
  writeFileSync(path.join(kit, 'voiceover-script.txt'), scenes.map((s, i) => `${i + 1}) [${s.start.toFixed(1)}s]  ${s.text}`).join('\n\n') + '\n')
}

// QR files (SVG + PNG) for the link page itself
const q = dir('04-QR-Code')
const svg = qrSvg(qrUrl('print')).replace('<svg ', '<svg width="1200" height="1200" ')
const n = Number(/viewBox="0 0 (\d+)/.exec(svg)[1])
const framed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 ${n + 8} ${n + 8}" width="1200" height="1200"><rect x="-4" y="-4" width="${n + 8}" height="${n + 8}" fill="#fff"/>${svg.replace(/^<svg[^>]*>/, '').replace('</svg>', '')}</svg>`
writeFileSync(path.join(q, 'Fratelanza-Links-QR.svg'), framed)
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] })
const pg = await b.newPage({ viewport: { width: 1200, height: 1200 } })
await pg.setContent(`<body style="margin:0">${framed}</body>`)
await pg.screenshot({ path: path.join(q, 'Fratelanza-Links-QR.png') })
await b.close()

writeFileSync(path.join(STAGE, 'README.txt'), `FRATELANZA — MARKETING PACK
==========================
Every design carries a QR code that opens the Fratelanza website:
${LINKS_URL}

01-Company-Profile-Booklet
  * ...-A5-for-email-and-screen.pdf  : 24-page bilingual booklet. Send to customers by e-mail / WhatsApp.
      Page 1 cover · 2 welcome & contents · 3-12 English · 13-22 Arabic (العربية) · 23 contact + QR · 24 back cover.
  * ...-PRINT-A4-duplex-fold-staple.pdf : same booklet arranged for printing.
      Print double-sided on A4 (flip on SHORT edge), 100% scale (no "fit to page"), stack the 6 sheets in order,
      fold in half and staple twice on the fold -> A5 booklet. Use borderless printing or ask the print shop to trim.
  * For a print shop: give them the A5 file (or ask them to impose it) and request 3 mm bleed if they need it.

02-Print-Designs-with-QR
  One PDF per item at real size with 3 mm bleed and crop marks (folder with fold ticks). See the design guide.
  Colours are RGB — the printer should convert to CMYK / Pantone and show a physical proof before the full run.

06-Video
  Fratelanza-Video.mp4 : 47-second vertical (9:16) explainer in Egyptian Arabic — animated, with captions and music. Add-Egyptian-Voice-Kit adds a natural voice-over (see README-AR.txt).

05-Simple-Arabic-Profile
  2-page A4 Egyptian-Arabic flyer: custom-built systems, source code delivered, no subscriptions, 3 months free support.

03-Design-Guide
  Overview of all items, brand colours, fonts and printer notes (English + Arabic).

04-QR-Code
  Fratelanza-Links-QR.svg / .png for any extra use (posters, WhatsApp status, screens).

QR tips: keep on white, do not recolour or shrink, and test-scan a printed proof with two phones.
Each item's QR has its own tag (utm_source=qr-<item>) so scans are tracked per item in the site's analytics.

-------------------------------------------------------------------------
فراتيلانزا — الحزمة التسويقية
كل تصميم يحتوي على كود QR يفتح موقع فراتيلانزا:
${LINKS_URL}

01 — كتيّب الملف التعريفي (ثنائي اللغة): نسخة A5 للإرسال بالبريد وواتساب، ونسخة A4 جاهزة للطباعة على الوجهين (اقلب على الحافة القصيرة)،
   بمقياس 100% دون "ملاءمة الصفحة"، ثم رتّب الأوراق الست واطوِها من المنتصف وثبّتها بدبّوس مرتين على خط الطي.
   الصفحات: ١ الغلاف · ٢ الترحيب والمحتويات · ٣–١٢ الإنجليزية · ١٣–٢٢ العربية · ٢٣ التواصل و QR · ٢٤ الغلاف الخلفي.
02 — التصاميم المطبوعة: ملف لكل منتج بالمقاس الحقيقي مع هامش قص ٣ مم وعلامات القص. الألوان RGB وتُحوَّل إلى CMYK في المطبعة مع طلب عينة.
03 — دليل التصميم: نظرة عامة وألوان وخطوط وملاحظات للمطبعة.
04 — QR: ملفات الكود (SVG / PNG) لأي استخدام آخر.
نصيحة: اجعل الكود على خلفية بيضاء، لا تغيّر لونه ولا تصغّره، وجرّب مسحه من نسخة مطبوعة قبل الطباعة الكاملة.
`)

const zip = path.join(ROOT, 'output/Fratelanza-Marketing-Pack.zip')
rmSync(zip, { force: true })
execFileSync('zip', ['-rq', zip, 'Fratelanza-Marketing-Pack'], { cwd: path.join(ROOT, 'build/pack') })
console.log('wrote output/Fratelanza-Marketing-Pack.zip')
