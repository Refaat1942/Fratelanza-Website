import { createHash } from 'crypto'
import type { Request } from 'express'
import { db } from './db.js'

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10)
}

function visitorHash(req: Request): string {
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim()
  const ua = String(req.headers['user-agent'] || 'unknown')
  const date = todayUtc()
  return createHash('sha256').update(`${ip}|${ua}|${date}`).digest('hex').slice(0, 32)
}

function isBot(ua: string): boolean {
  return /bot|crawl|spider|slurp|facebookexternalhit|preview/i.test(ua)
}

export function recordPageView(req: Request, path: string) {
  const ua = String(req.headers['user-agent'] || '')
  if (isBot(ua)) return

  const cleanPath = (path || '/').slice(0, 500)
  const hash = visitorHash(req)
  const visitDate = todayUtc()

  db.prepare(`
    INSERT INTO page_views (visitor_hash, path, visit_date)
    VALUES (?, ?, ?)
  `).run(hash, cleanPath, visitDate)
}

export function getVisitorMetrics() {
  const today = todayUtc()

  const todayVisitors = (db.prepare(`
    SELECT COUNT(DISTINCT visitor_hash) as c FROM page_views WHERE visit_date = ?
  `).get(today) as { c: number }).c

  const todayPageViews = (db.prepare(`
    SELECT COUNT(*) as c FROM page_views WHERE visit_date = ?
  `).get(today) as { c: number }).c

  const last7Days = db.prepare(`
    SELECT visit_date as date,
           COUNT(DISTINCT visitor_hash) as visitors,
           COUNT(*) as page_views
    FROM page_views
    WHERE visit_date >= date('now', '-6 days')
    GROUP BY visit_date
    ORDER BY visit_date DESC
  `).all() as { date: string; visitors: number; page_views: number }[]

  const totalVisitors = (db.prepare(`
    SELECT COUNT(DISTINCT visitor_hash) as c FROM page_views
  `).get() as { c: number }).c

  return {
    todayVisitors,
    todayPageViews,
    totalVisitors,
    last7Days,
  }
}
