import { Router, type Request, type Response } from 'express'
import path from 'path'
import fs from 'fs'
import { db } from './db.js'
import { adminLogin, adminLogout, requireAdmin } from './adminAuth.js'

const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'data', 'uploads')

export const adminRouter = Router()

adminRouter.post('/login', adminLogin)
adminRouter.post('/logout', requireAdmin, adminLogout)

adminRouter.get('/stats', requireAdmin, (_req, res) => {
  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get() as { c: number }).c

  res.json({
    success: true,
    data: {
      leads: count('leads'),
      contacts: count('contacts'),
      careers: count('careers'),
      freelancers: count('freelancers'),
    },
  })
})

adminRouter.get('/leads', requireAdmin, (_req, res) => {
  const rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all()
  res.json({ success: true, data: rows })
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
  }
  const table = tables[type]
  if (!table) {
    res.status(400).json({ success: false, message: 'Invalid type' })
    return
  }

  const row = db.prepare(`SELECT resume_path FROM ${table} WHERE id = ?`).get(id) as { resume_path: string | null } | undefined
  if (!row?.resume_path) {
    res.status(404).json({ success: false, message: 'No file attached' })
    return
  }

  const filePath = resolveUpload(row.resume_path)
  if (!filePath) {
    res.status(404).json({ success: false, message: 'File not found' })
    return
  }

  res.download(filePath, path.basename(filePath))
})
