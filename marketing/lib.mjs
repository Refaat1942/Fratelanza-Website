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
  await p.pdf({ path: out, width, height, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } })
  await p.close()
  console.log('wrote', path.relative(ROOT, out))
}
export const closeBrowser = () => browser?.close()
