import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { icons } from 'lucide-react'
import { chromium } from 'playwright-core'
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

export const ROOT = path.dirname(fileURLToPath(import.meta.url))
export const PUBLIC = path.join(ROOT, '../frontend/public')
export const content = JSON.parse(readFileSync(path.join(ROOT, 'build/content.json'), 'utf8'))
export const fileUrl = (p) => pathToFileURL(p).href
export const LOGO = fileUrl(path.join(ROOT, 'assets/logo-medallion.png'))
export const pub = (p) => fileUrl(path.join(PUBLIC, p))

// Brand palette (taken from the medallion logo + website theme)
export const C = {
  navy: '#0a1f3a', navy2: '#0f2f55', ink: '#0f172a', muted: '#475569',
  cyan: '#0e7490', cyanLight: '#22d3ee', mint: '#10b981', gold: '#d4a03a', goldLight: '#f2d89a',
  surface: '#f0f9ff', line: '#dbe7f0',
}

export function icon(name, size = 20, color = 'currentColor', stroke = 1.8) {
  const alias = { Building2: 'BuildingComplex', Code2: 'CodeXml' }
  const I = icons[name] || icons[alias[name]] || icons.Circle
  return renderToStaticMarkup(createElement(I, { size, color, strokeWidth: stroke }))
}

export const fontCss = () => {
  const f = (family, w, file) =>
    `@font-face{font-family:'${family}';font-weight:${w};src:url('${fileUrl(path.join(ROOT, 'fonts', file))}') format('truetype')}`
  return [400, 500, 700, 800].map((w) => f('Tajawal', w, `Tajawal-${w}.ttf`)).join('') +
    [400, 500, 600, 700, 800].map((w) => f('Plus Jakarta Sans', w, `PlusJakartaSans-${w}.ttf`)).join('')
}

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const info = {
  web: 'www.fratelanza.com',
  email: content.company.email,
  phone: { en: '+20 109 713 8338', ar: '٠١٠٩٧١٣٨٣٣٨ ٢٠+' },
  phoneRaw: '+20 109 713 8338',
}

let browser
export async function renderPdf({ html, out, width, height, landscape, pages }) {
  browser ||= await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] })
  const tmp = path.join(ROOT, 'build', 'tmp-' + path.basename(out, '.pdf') + '.html')
  mkdirSync(path.dirname(tmp), { recursive: true })
  writeFileSync(tmp, html)
  const p = await browser.newPage()
  await p.goto(fileUrl(tmp), { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready)
  mkdirSync(path.dirname(out), { recursive: true })
  const overflow = await p.evaluate(() => [...document.querySelectorAll('.fill')].map((f, i) => [i + 1, f.scrollHeight - f.clientHeight]).filter((x) => x[1] > 1))
  if (overflow.length) console.warn('OVERFLOW in', path.basename(out), JSON.stringify(overflow))
  await p.pdf({ path: out, width, height, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } })
  await p.close()
  console.log('wrote', path.relative(ROOT, out))
}
export const closeBrowser = () => browser?.close()

// ---------- QR codes (vector, generated offline) ----------
import QRCode from 'qrcode'
export const SITE_URL = 'https://www.fratelanza.com/'
export const LINKS_URL = SITE_URL // QR codes open the website home page
export const qrUrl = (source) => (source ? `${SITE_URL}?utm_source=qr-${source}` : SITE_URL)

/** Returns an inline SVG string (modules only, no quiet zone) sized 100% of its box. */
export function qrSvg(text, { ecc = 'Q', dark = C.navy } = {}) {
  const qr = QRCode.create(text, { errorCorrectionLevel: ecc })
  const n = qr.modules.size, d = qr.modules.data
  let path = ''
  for (let y = 0; y < n; y++) {
    let x = 0
    while (x < n) {
      if (d[y * n + x]) { let w = 1; while (x + w < n && d[y * n + x + w]) w++; path += `M${x} ${y}h${w}v1h-${w}z`; x += w } else x++
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" style="display:block;width:100%;height:100%"><path fill="${dark}" d="${path}"/></svg>`
}

/**
 * White tile with QR + quiet zone. `mm` is the size of the QR modules area; the tile adds a quiet zone of ~4 modules.
 * caption: show "SCAN · امسح" under it.
 */
export function qrTile(source, mm, { caption = true, ecc = 'Q', border = true, text } = {}) {
  const t = text || qrUrl(source)
  const modules = QRCode.create(t, { errorCorrectionLevel: ecc }).modules.size
  const pad = (mm / modules) * 4
  const tile = mm + pad * 2
  const cap = caption
    ? `<div style="margin-top:${Math.max(1, mm * 0.06)}mm;text-align:center;color:inherit;white-space:nowrap;line-height:1.15;font-weight:800;font-size:${Math.max(4.2, mm * 0.26)}pt;letter-spacing:.08em">SCAN · <span style="font-family:Tajawal;letter-spacing:0">امسح</span></div>`
    : ''
  return `<div style="display:inline-flex;flex-direction:column;align-items:center"><div style="width:${tile}mm;height:${tile}mm;padding:${pad}mm;background:#fff;border-radius:${Math.max(1, tile * 0.07)}mm;${border ? `box-shadow:0 0 0 ${Math.max(.25, tile * 0.012)}mm ${C.gold}` : ''}">${qrSvg(t, { ecc })}</div>${cap}</div>`
}

/** Standalone QR files for the ZIP. */
export function writeQrFiles(dir) {
  mkdirSync(dir, { recursive: true })
  const svg = qrSvg(qrUrl('print')).replace('<svg ', '<svg width="1000" height="1000" ')
  const white = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 ${QRCode.create(qrUrl('print'), { errorCorrectionLevel: 'Q' }).modules.size + 8} ${QRCode.create(qrUrl('print'), { errorCorrectionLevel: 'Q' }).modules.size + 8}" width="1000" height="1000"><rect x="-4" y="-4" width="100%" height="100%" fill="#fff"/>${svg.replace(/^<svg[^>]*>/, '').replace('</svg>', '')}</svg>`
  writeFileSync(path.join(dir, 'Fratelanza-Links-QR.svg'), white)
}
