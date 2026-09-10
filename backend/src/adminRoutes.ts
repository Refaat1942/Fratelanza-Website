import { Router, type Request, type Response } from 'express'
import path from 'path'
import fs from 'fs'
import { db } from './db.js'
import { adminLogin, adminLogout, requireAdmin } from './adminAuth.js'
import { getVisitorMetrics, getDailyReport, getVisitorLog, getEventFunnel } from './analytics.js'
import {
  getCrmOverview, getSourceReport, getProjectTypeReport, getBudgetReport,
  getFollowUpLeads, getLeadActivities, logLeadActivity, logStatusChange,
  LEAD_STATUSES,
} from './crm.js'
import { leadUpdateSchema } from './validation.js'

const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'data', 'uploads')

export const adminRouter = Router()

adminRouter.post('/login', adminLogin)
adminRouter.post('/logout', requireAdmin, adminLogout)

adminRouter.get('/stats', requireAdmin, (_req, res) => {
  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get() as { c: number }).c

  const visitors = getVisitorMetrics()
  const crm = getCrmOverview()

  res.json({
    success: true,
    data: {
      leads: count('leads'),
      contacts: count('contacts'),
      careers: count('careers'),
      freelancers: count('freelancers'),
      todayVisitors: visitors.todayVisitors,
      todayPageViews: visitors.todayPageViews,
      totalVisitors: visitors.totalVisitors,
      last7Days: visitors.last7Days,
      crm,
    },
  })
})

adminRouter.get('/crm/overview', requireAdmin, (_req, res) => {
  res.json({ success: true, data: getCrmOverview() })
})

adminRouter.get('/crm/reports/sources', requireAdmin, (_req, res) => {
  res.json({ success: true, data: getSourceReport() })
})

adminRouter.get('/crm/reports/project-types', requireAdmin, (_req, res) => {
  res.json({ success: true, data: getProjectTypeReport() })
})

adminRouter.get('/crm/reports/budgets', requireAdmin, (_req, res) => {
  res.json({ success: true, data: getBudgetReport() })
})

adminRouter.get('/crm/follow-ups/:filter', requireAdmin, (req, res) => {
  const filter = req.params.filter as 'today' | 'overdue' | 'upcoming'
  if (!['today', 'overdue', 'upcoming'].includes(filter)) {
    res.status(400).json({ success: false, message: 'Invalid filter' })
    return
  }
  res.json({ success: true, data: getFollowUpLeads(filter) })
})

adminRouter.get('/analytics/daily', requireAdmin, (req, res) => {
  const from = req.query.from as string | undefined
  const to = req.query.to as string | undefined
  res.json({ success: true, data: getDailyReport(from, to) })
})

adminRouter.get('/analytics/visitors', requireAdmin, (req, res) => {
  const from = req.query.from as string | undefined
  const to = req.query.to as string | undefined
  res.json({ success: true, data: getVisitorLog(from, to) })
})

adminRouter.get('/analytics/funnel', requireAdmin, (_req, res) => {
  res.json({ success: true, data: getEventFunnel() })
})

adminRouter.get('/leads', requireAdmin, (_req, res) => {
  const rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all()
  res.json({ success: true, data: rows })
})

adminRouter.get('/leads/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10)
  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(id)
  if (!lead) {
    res.status(404).json({ success: false, message: 'Lead not found' })
    return
  }
  const activities = getLeadActivities(id)
  const history = db.prepare('SELECT * FROM lead_status_history WHERE lead_id = ? ORDER BY changed_at DESC').all(id)
  res.json({ success: true, data: { lead, activities, history } })
})

adminRouter.patch('/leads/:id', requireAdmin, (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const existing = db.prepare('SELECT * FROM leads WHERE id = ?').get(id) as Record<string, unknown> | undefined
    if (!existing) {
      res.status(404).json({ success: false, message: 'Lead not found' })
      return
    }

    const data = leadUpdateSchema.parse(req.body)
    const fields: string[] = []
    const values: unknown[] = []

    const map: Record<string, string> = {
      status: 'status', priority: 'priority', leadScore: 'lead_score',
      assignedTo: 'assigned_to', estimatedValue: 'estimated_value',
      probabilityPct: 'probability_pct', wonRevenue: 'won_revenue',
      lastContactAt: 'last_contact_at', nextFollowUpAt: 'next_follow_up_at',
      notes: 'notes', projectType: 'project_type', projectStage: 'project_stage',
      estimatedBudget: 'estimated_budget', desiredTimeline: 'desired_timeline',
    }

    for (const [key, col] of Object.entries(map)) {
      const val = data[key as keyof typeof data]
      if (val !== undefined) {
        fields.push(`${col} = ?`)
        values.push(val)
      }
    }

    if (fields.length === 0) {
      res.status(400).json({ success: false, message: 'No fields to update' })
      return
    }

    values.push(id)
    db.prepare(`UPDATE leads SET ${fields.join(', ')} WHERE id = ?`).run(...values)

    if (data.status && data.status !== existing.status) {
      logStatusChange(id, String(existing.status || 'NEW'), data.status)
    }
    if (data.notes) {
      logLeadActivity(id, 'note', 'Notes updated')
    }

    const updated = db.prepare('SELECT * FROM leads WHERE id = ?').get(id)
    res.json({ success: true, data: updated })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Update failed'
    res.status(400).json({ success: false, message: msg })
  }
})

adminRouter.post('/leads/:id/activities', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { type, description } = req.body as { type?: string; description?: string }
  if (!type || !description) {
    res.status(400).json({ success: false, message: 'type and description required' })
    return
  }
  logLeadActivity(id, type, description)
  res.json({ success: true })
})

adminRouter.get('/lead-statuses', requireAdmin, (_req, res) => {
  res.json({ success: true, data: LEAD_STATUSES })
})

adminRouter.get('/contacts', requireAdmin, (_req, res) => {
  const rows = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all()
  res.json({ success: true, data: rows })
})

adminRouter.get('/careers', requireAdmin, (_req, res) => {
  const rows = db.prepare('SELECT * FROM careers ORDER BY created_at DESC').all()
  res.json({ success: true, data: rows })
})

adminRouter.get('/freelancers', requireAdmin, (_req, res) => {
  const rows = db.prepare('SELECT * FROM freelancers ORDER BY created_at DESC').all()
  res.json({ success: true, data: rows })
})

function resolveUpload(storedPath: string): string | null {
  if (!storedPath) return null
  const resolved = path.resolve(storedPath)
  const uploadResolved = path.resolve(uploadDir)
  if (!resolved.startsWith(uploadResolved)) return null
  if (!fs.existsSync(resolved)) return null
  return resolved
}

adminRouter.get('/download', requireAdmin, (req: Request, res: Response) => {
  const type = req.query.type as string
  const id = parseInt(req.query.id as string, 10)
  if (!type || !id) {
    res.status(400).json({ success: false, message: 'Missing type or id' })
    return
  }

  const tables: Record<string, string> = {
    careers: 'careers',
    freelancers: 'freelancers',
    leads: 'leads',
  }
  const table = tables[type]
  if (!table) {
    res.status(400).json({ success: false, message: 'Invalid type' })
    return
  }

  const col = type === 'leads' ? 'attachment_path' : 'resume_path'
  const row = db.prepare(`SELECT ${col} as file_path FROM ${table} WHERE id = ?`).get(id) as { file_path: string | null } | undefined
  if (!row?.file_path) {
    res.status(404).json({ success: false, message: 'No file attached' })
    return
  }

  const filePath = resolveUpload(row.file_path)
  if (!filePath) {
    res.status(404).json({ success: false, message: 'File not found' })
    return
  }

  res.download(filePath, path.basename(filePath))
})
