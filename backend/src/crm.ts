import { db } from './db.js'

export const LEAD_STATUSES = [
  'NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'PROPOSAL',
  'NEGOTIATION', 'WON', 'LOST', 'NOT_QUALIFIED',
] as const

export type LeadStatus = typeof LEAD_STATUSES[number]

export function calculateLeadScore(data: {
  estimatedBudget?: string | null
  projectType?: string | null
  companyName?: string | null
  desiredTimeline?: string | null
  projectStage?: string | null
  message?: string | null
}): number {
  let score = 0
  if (data.estimatedBudget) score += 20
  if (data.projectType) score += 15
  if (data.companyName && data.companyName.length >= 2) score += 10
  if (data.desiredTimeline) score += 10
  const stage = (data.projectStage || '').toLowerCase()
  if (stage.includes('requirement') || stage.includes('design') || stage.includes('developing') || stage.includes('existing')) {
    score += 15
  }
  if ((data.message || '').length > 50) score += 10
  return score
}

export function scoreLabel(score: number): 'HOT' | 'WARM' | 'COLD' {
  if (score >= 60) return 'HOT'
  if (score >= 30) return 'WARM'
  return 'COLD'
}

export function logLeadActivity(
  leadId: number,
  type: string,
  description: string,
  metadata?: Record<string, unknown>,
) {
  db.prepare(`
    INSERT INTO lead_activities (lead_id, type, description, metadata_json)
    VALUES (?, ?, ?, ?)
  `).run(leadId, type, description, metadata ? JSON.stringify(metadata) : null)
}

export function logStatusChange(leadId: number, fromStatus: string | null, toStatus: string) {
  db.prepare(`
    INSERT INTO lead_status_history (lead_id, from_status, to_status)
    VALUES (?, ?, ?)
  `).run(leadId, fromStatus, toStatus)
  logLeadActivity(leadId, 'status_change', `Status changed to ${toStatus}`, { from: fromStatus, to: toStatus })
}

export function getLeadActivities(leadId: number) {
  return db.prepare(`
    SELECT * FROM lead_activities WHERE lead_id = ? ORDER BY created_at DESC
  `).all(leadId)
}

export function getCrmOverview() {
  const statusCounts = db.prepare(`
    SELECT COALESCE(status, 'NEW') as status, COUNT(*) as count
    FROM leads GROUP BY COALESCE(status, 'NEW')
  `).all() as { status: string; count: number }[]

  const byStatus: Record<string, number> = {}
  for (const s of LEAD_STATUSES) byStatus[s] = 0
  for (const row of statusCounts) byStatus[row.status] = row.count

  const pipeline = db.prepare(`
    SELECT COALESCE(SUM(estimated_value), 0) as total,
           COALESCE(SUM(estimated_value * COALESCE(probability_pct, 0) / 100.0), 0) as weighted
    FROM leads
    WHERE COALESCE(status, 'NEW') NOT IN ('WON', 'LOST', 'NOT_QUALIFIED')
  `).get() as { total: number; weighted: number }

  const wonRevenue = (db.prepare(`
    SELECT COALESCE(SUM(won_revenue), 0) as total FROM leads WHERE status = 'WON'
  `).get() as { total: number }).total

  const totalLeads = (db.prepare('SELECT COUNT(*) as c FROM leads').get() as { c: number }).c
  const qualified = byStatus.QUALIFIED + byStatus.DISCOVERY + byStatus.PROPOSAL + byStatus.NEGOTIATION + byStatus.WON
  const proposals = byStatus.PROPOSAL + byStatus.NEGOTIATION + byStatus.WON

  const today = new Date().toISOString().slice(0, 10)
  const followUps = db.prepare(`
    SELECT COUNT(*) as c FROM leads
    WHERE next_follow_up_at IS NOT NULL AND date(next_follow_up_at) = date(?)
      AND COALESCE(status, 'NEW') NOT IN ('WON', 'LOST', 'NOT_QUALIFIED')
  `).get(today) as { c: number }

  const overdue = db.prepare(`
    SELECT COUNT(*) as c FROM leads
    WHERE next_follow_up_at IS NOT NULL AND date(next_follow_up_at) < date(?)
      AND COALESCE(status, 'NEW') NOT IN ('WON', 'LOST', 'NOT_QUALIFIED')
  `).get(today) as { c: number }

  const upcoming = db.prepare(`
    SELECT COUNT(*) as c FROM leads
    WHERE next_follow_up_at IS NOT NULL
      AND date(next_follow_up_at) > date(?)
      AND date(next_follow_up_at) <= date(?, '+7 days')
      AND COALESCE(status, 'NEW') NOT IN ('WON', 'LOST', 'NOT_QUALIFIED')
  `).get(today, today) as { c: number }

  const visitors = (db.prepare('SELECT COUNT(DISTINCT visitor_hash) as c FROM page_views').get() as { c: number }).c

  return {
    totalLeads,
    byStatus,
    qualified,
    proposals,
    won: byStatus.WON,
    lost: byStatus.LOST,
    totalPipeline: pipeline.total || 0,
    weightedPipeline: pipeline.weighted || 0,
    wonRevenue: wonRevenue || 0,
    conversion: {
      visitorToLead: visitors > 0 ? Math.round((totalLeads / visitors) * 1000) / 10 : null,
      leadToQualified: totalLeads > 0 ? Math.round((qualified / totalLeads) * 1000) / 10 : null,
      qualifiedToProposal: qualified > 0 ? Math.round((proposals / qualified) * 1000) / 10 : null,
      proposalToWon: proposals > 0 ? Math.round((byStatus.WON / proposals) * 1000) / 10 : null,
    },
    followUps: { dueToday: followUps.c, overdue: overdue.c, upcoming7d: upcoming.c },
  }
}

export function getSourceReport() {
  return db.prepare(`
    SELECT COALESCE(first_source, source, 'website') as source,
           COUNT(*) as leads,
           SUM(CASE WHEN COALESCE(status, 'NEW') IN ('QUALIFIED','DISCOVERY','PROPOSAL','NEGOTIATION','WON') THEN 1 ELSE 0 END) as qualified,
           SUM(CASE WHEN COALESCE(status, 'NEW') IN ('PROPOSAL','NEGOTIATION','WON') THEN 1 ELSE 0 END) as proposals,
           SUM(CASE WHEN status = 'WON' THEN 1 ELSE 0 END) as won,
           COALESCE(SUM(CASE WHEN status = 'WON' THEN won_revenue ELSE 0 END), 0) as revenue
    FROM leads GROUP BY COALESCE(first_source, source, 'website')
    ORDER BY leads DESC
  `).all()
}

export function getProjectTypeReport() {
  return db.prepare(`
    SELECT COALESCE(project_type, interested_product, 'other') as project_type,
           COUNT(*) as leads,
           SUM(CASE WHEN COALESCE(status, 'NEW') IN ('QUALIFIED','DISCOVERY','PROPOSAL','NEGOTIATION','WON') THEN 1 ELSE 0 END) as qualified,
           SUM(CASE WHEN COALESCE(status, 'NEW') IN ('PROPOSAL','NEGOTIATION','WON') THEN 1 ELSE 0 END) as proposals,
           SUM(CASE WHEN status = 'WON' THEN 1 ELSE 0 END) as won,
           COALESCE(SUM(CASE WHEN status = 'WON' THEN won_revenue ELSE 0 END), 0) as revenue
    FROM leads GROUP BY COALESCE(project_type, interested_product, 'other')
    ORDER BY leads DESC
  `).all()
}

export function getBudgetReport() {
  return db.prepare(`
    SELECT COALESCE(estimated_budget, 'not_specified') as budget_range,
           COUNT(*) as leads,
           SUM(CASE WHEN COALESCE(status, 'NEW') IN ('QUALIFIED','DISCOVERY','PROPOSAL','NEGOTIATION','WON') THEN 1 ELSE 0 END) as qualified,
           SUM(CASE WHEN COALESCE(status, 'NEW') IN ('PROPOSAL','NEGOTIATION','WON') THEN 1 ELSE 0 END) as proposals,
           SUM(CASE WHEN status = 'WON' THEN 1 ELSE 0 END) as won,
           COALESCE(SUM(CASE WHEN status = 'WON' THEN won_revenue ELSE 0 END), 0) as revenue
    FROM leads GROUP BY COALESCE(estimated_budget, 'not_specified')
    ORDER BY leads DESC
  `).all()
}

export function getFollowUpLeads(filter: 'today' | 'overdue' | 'upcoming') {
  const today = new Date().toISOString().slice(0, 10)
  if (filter === 'today') {
    return db.prepare(`
      SELECT * FROM leads WHERE next_follow_up_at IS NOT NULL AND date(next_follow_up_at) = date(?)
        AND COALESCE(status, 'NEW') NOT IN ('WON', 'LOST', 'NOT_QUALIFIED')
      ORDER BY next_follow_up_at ASC
    `).all(today)
  }
  if (filter === 'overdue') {
    return db.prepare(`
      SELECT * FROM leads WHERE next_follow_up_at IS NOT NULL AND date(next_follow_up_at) < date(?)
        AND COALESCE(status, 'NEW') NOT IN ('WON', 'LOST', 'NOT_QUALIFIED')
      ORDER BY next_follow_up_at ASC
    `).all(today)
  }
  return db.prepare(`
    SELECT * FROM leads WHERE next_follow_up_at IS NOT NULL
      AND date(next_follow_up_at) > date(?)
      AND date(next_follow_up_at) <= date(?, '+7 days')
      AND COALESCE(status, 'NEW') NOT IN ('WON', 'LOST', 'NOT_QUALIFIED')
    ORDER BY next_follow_up_at ASC
  `).all(today, today)
}
