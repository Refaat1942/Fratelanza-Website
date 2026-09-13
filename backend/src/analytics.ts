import { createHash } from 'crypto'
import type { Request } from 'express'
import { db } from './db.js'

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10)
}

function clientIp(req: Request): string {
  return String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim()
}

function visitorHash(req: Request): string {
  const ip = clientIp(req)
  const ua = String(req.headers['user-agent'] || 'unknown')
  const date = todayUtc()
  return createHash('sha256').update(`${ip}|${ua}|${date}`).digest('hex').slice(0, 32)
}

function clientCountry(req: Request): string {
  const cf = req.headers['cf-ipcountry']
  if (typeof cf === 'string' && cf && cf !== 'XX') return cf
  return ''
}

function clientReferrer(req: Request): string {
  const ref = req.headers['referer'] || req.headers['referrer']
  if (!ref || typeof ref !== 'string') return ''
  try {
    const url = new URL(ref)
    if (url.hostname.includes('fratelanza.com')) return 'Direct / Internal'
    return url.hostname.replace(/^www\./, '')
  } catch {
    return ref.slice(0, 200)
  }
}

function parseDevice(ua: string): string {
  if (/bot|crawl|spider/i.test(ua)) return 'Bot'
  if (/iphone|android.*mobile|mobile.*android/i.test(ua)) return 'Mobile'
  if (/ipad|tablet/i.test(ua)) return 'Tablet'
  if (/windows/i.test(ua)) return 'Windows'
  if (/mac os|macintosh/i.test(ua)) return 'Mac'
  if (/linux/i.test(ua)) return 'Linux'
  return 'Other'
}

function isBot(ua: string): boolean {
  return /bot|crawl|spider|slurp|facebookexternalhit|preview/i.test(ua)
}

function normalizeDateRange(from?: string, to?: string) {
  const today = todayUtc()
  const fromDate = from && /^\d{4}-\d{2}-\d{2}$/.test(from) ? from : today
  const toDate = to && /^\d{4}-\d{2}-\d{2}$/.test(to) ? to : fromDate
  return fromDate <= toDate ? { from: fromDate, to: toDate } : { from: toDate, to: fromDate }
}

export function recordPageView(req: Request, path: string) {
  const ua = String(req.headers['user-agent'] || '')
  if (isBot(ua)) return

  const cleanPath = (path || '/').slice(0, 500)
  const hash = visitorHash(req)
  const visitDate = todayUtc()
  const ip = clientIp(req)
  const country = clientCountry(req)
  const referrer = clientReferrer(req)
  const device = parseDevice(ua)

  db.prepare(`
    INSERT INTO page_views (visitor_hash, path, visit_date, ip_address, country, referrer, device, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(hash, cleanPath, visitDate, ip, country, referrer, device, ua.slice(0, 300))

  try {
    db.prepare(`
      INSERT INTO analytics_events (event_type, path, visitor_hash)
      VALUES ('page_view', ?, ?)
    `).run(cleanPath, hash)
  } catch {
    // non-blocking
  }
}

export function getDailyReport(from?: string, to?: string) {
  const { from: fromDate, to: toDate } = normalizeDateRange(from, to)

  const rows = db.prepare(`
    SELECT visit_date as date,
           COUNT(DISTINCT visitor_hash) as visitors,
           COUNT(*) as page_views
    FROM page_views
    WHERE visit_date BETWEEN ? AND ?
    GROUP BY visit_date
    ORDER BY visit_date DESC
  `).all(fromDate, toDate) as { date: string; visitors: number; page_views: number }[]

  const totals = db.prepare(`
    SELECT COUNT(DISTINCT visitor_hash) as visitors,
           COUNT(*) as page_views
    FROM page_views
    WHERE visit_date BETWEEN ? AND ?
  `).get(fromDate, toDate) as { visitors: number; page_views: number }

  return { from: fromDate, to: toDate, rows, totals }
}

export function getVisitorLog(from?: string, to?: string) {
  const { from: fromDate, to: toDate } = normalizeDateRange(from, to)

  const rows = db.prepare(`
    SELECT visitor_hash,
           MAX(ip_address) as ip_address,
           MAX(country) as country,
           MAX(referrer) as referrer,
           MAX(device) as device,
           MIN(created_at) as first_seen,
           MAX(created_at) as last_seen,
           COUNT(*) as page_views,
           GROUP_CONCAT(DISTINCT path) as pages
    FROM page_views
    WHERE visit_date BETWEEN ? AND ?
    GROUP BY visitor_hash
    ORDER BY last_seen DESC
  `).all(fromDate, toDate) as {
    visitor_hash: string
    ip_address: string | null
    country: string | null
    referrer: string | null
    device: string | null
    first_seen: string
    last_seen: string
    page_views: number
    pages: string
  }[]

  return {
    from: fromDate,
    to: toDate,
    rows: rows.map((r) => ({
      ...r,
      pages: r.pages || '',
      country: r.country || '—',
      referrer: r.referrer || 'Direct',
      device: r.device || '—',
      ip_address: r.ip_address || '—',
    })),
  }
}

export function getVisitorMetrics() {
  const today = todayUtc()
  const report = getDailyReport(today, today)
  const last7 = getDailyReport(
    new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10),
    today,
  )

  const totalVisitors = (db.prepare(`
    SELECT COUNT(DISTINCT visitor_hash) as c FROM page_views
  `).get() as { c: number }).c

  return {
    todayVisitors: report.totals.visitors,
    todayPageViews: report.totals.page_views,
    totalVisitors,
    last7Days: last7.rows,
  }
}

export function recordAnalyticsEvent(
  req: Request,
  eventType: string,
  path?: string,
  metadata?: Record<string, unknown>,
  sessionId?: string,
) {
  const hash = visitorHash(req)
  db.prepare(`
    INSERT INTO analytics_events (event_type, path, metadata_json, visitor_hash, session_id)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    eventType.slice(0, 80),
    (path || '/').slice(0, 500),
    metadata ? JSON.stringify(metadata) : null,
    hash,
    sessionId?.slice(0, 64) || null,
  )
}

function eventDateFilter(from?: string, to?: string): { clause: string; params: string[] } {
  if (from && to) {
    return {
      clause: `WHERE date(created_at) BETWEEN ? AND ?`,
      params: [from, to],
    }
  }
  return { clause: '', params: [] }
}

export function getEventFunnel(from?: string, to?: string) {
  const { clause, params } = eventDateFilter(from, to)
  const counts = db.prepare(`
    SELECT event_type, COUNT(*) as count FROM analytics_events
    ${clause}
    GROUP BY event_type ORDER BY count DESC
  `).all(...params) as { event_type: string; count: number }[]

  const byType: Record<string, number> = {}
  for (const row of counts) byType[row.event_type] = row.count

  return {
    pageViews: byType.page_view || 0,
    startProjectClick: byType.start_project_click || 0,
    formStarted: byType.form_started || 0,
    formCompleted: byType.form_completed || 0,
    ctaClick: byType.cta_click || 0,
    events: counts,
  }
}

export function getTopPages(from: string, to: string, limit = 10) {
  return db.prepare(`
    SELECT path, COUNT(*) as views
    FROM page_views
    WHERE visit_date BETWEEN ? AND ?
    GROUP BY path
    ORDER BY views DESC
    LIMIT ?
  `).all(from, to, limit) as { path: string; views: number }[]
}

export function getTopReferrers(from: string, to: string, limit = 10) {
  return db.prepare(`
    SELECT COALESCE(NULLIF(referrer, ''), 'Direct') as referrer,
           COUNT(DISTINCT visitor_hash) as visitors
    FROM page_views
    WHERE visit_date BETWEEN ? AND ?
    GROUP BY referrer
    ORDER BY visitors DESC
    LIMIT ?
  `).all(from, to, limit) as { referrer: string; visitors: number }[]
}

export function getDeviceBreakdown(from: string, to: string) {
  return db.prepare(`
    SELECT COALESCE(device, 'Unknown') as device,
           COUNT(DISTINCT visitor_hash) as visitors,
           COUNT(*) as page_views
    FROM page_views
    WHERE visit_date BETWEEN ? AND ?
    GROUP BY device
    ORDER BY visitors DESC
  `).all(from, to) as { device: string; visitors: number; page_views: number }[]
}

export function getSubmissionCounts(from: string, to: string) {
  const countTable = (table: string) =>
    (db.prepare(`
      SELECT COUNT(*) as c FROM ${table}
      WHERE date(created_at) BETWEEN ? AND ?
    `).get(from, to) as { c: number }).c

  const leads = countTable('leads')
  const contacts = countTable('contacts')
  const careers = countTable('careers')
  const freelancers = countTable('freelancers')

  return { leads, contacts, careers, freelancers, total: leads + contacts + careers + freelancers }
}
