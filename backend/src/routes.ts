import { Router, type Request, type Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { db } from './db.js'
import {
  leadSchema, contactSchema, careerSchema, freelancerSchema,
  analyticsEventSchema, rejectHoneypot, sanitize,
} from './validation.js'
import { recordPageView, recordAnalyticsEvent } from './analytics.js'
import { insertLead } from './leads.js'

const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'data', 'uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx']
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, allowed.includes(ext))
  },
})

export const apiRouter = Router()

apiRouter.post('/analytics/visit', (req: Request, res: Response) => {
  try {
    const path = typeof req.body?.path === 'string' ? req.body.path : '/'
    if (path.startsWith('/admin')) {
      res.json({ success: true })
      return
    }
    recordPageView(req, path)
    res.json({ success: true })
  } catch {
    res.json({ success: true })
  }
})

apiRouter.post('/analytics/event', (req: Request, res: Response) => {
  try {
    const data = analyticsEventSchema.parse(req.body)
    if (data.path?.startsWith('/admin')) {
      res.json({ success: true })
      return
    }
    recordAnalyticsEvent(req, data.eventType, data.path, data.metadata, data.sessionId)
    res.json({ success: true })
  } catch {
    res.json({ success: true })
  }
})

function leadsUpload(req: Request, res: Response, next: () => void) {
  if (req.is('multipart/form-data')) {
    upload.single('attachment')(req, res, next)
  } else {
    next()
  }
}

apiRouter.post('/leads', leadsUpload, (req: Request, res: Response) => {
  try {
    const body = req.body || {}
    const data = leadSchema.parse(body)
    rejectHoneypot(data)
    insertLead(data, req.file?.path || null)
    res.json({ success: true, message: 'Project request received successfully.' })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Validation failed'
    res.status(400).json({ success: false, message: msg })
  }
})

apiRouter.post('/contact', (req: Request, res: Response) => {
  try {
    const data = contactSchema.parse(req.body)
    rejectHoneypot(data)

    db.prepare(`
      INSERT INTO contacts (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(sanitize(data.name), data.email, data.phone, data.subject ? sanitize(data.subject) : null, sanitize(data.message))

    res.json({ success: true, message: 'Message sent successfully.' })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Validation failed'
    res.status(400).json({ success: false, message: msg })
  }
})

apiRouter.post('/careers', upload.single('resume'), (req: Request, res: Response) => {
  try {
    const data = careerSchema.parse(req.body)
    rejectHoneypot(data)

    db.prepare(`
      INSERT INTO careers (full_name, email, phone, position, portfolio, github, linkedin, experience, availability, expected_salary, country, skills, resume_path)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sanitize(data.fullName), data.email, data.phone, data.position,
      data.portfolio, data.github, data.linkedin, data.experience,
      data.availability, data.expectedSalary, data.country,
      data.skills ? sanitize(data.skills) : null,
      req.file?.path || null,
    )

    res.json({ success: true, message: 'Application received successfully.' })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Validation failed'
    res.status(400).json({ success: false, message: msg })
  }
})

apiRouter.post('/freelancers', upload.single('resume'), (req: Request, res: Response) => {
  try {
    const data = freelancerSchema.parse(req.body)
    rejectHoneypot(data)

    db.prepare(`
      INSERT INTO freelancers (full_name, email, phone, country, specialization, years_experience, portfolio, linkedin, github, hourly_rate, monthly_availability, technologies, english_level, arabic_level, notes, resume_path)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sanitize(data.fullName), data.email, data.phone, data.country,
      data.specialization, data.yearsExperience, data.portfolio,
      data.linkedin, data.github, data.hourlyRate, data.monthlyAvailability,
      data.technologies ? sanitize(data.technologies) : null,
      data.englishLevel, data.arabicLevel,
      data.notes ? sanitize(data.notes) : null,
      req.file?.path || null,
    )

    res.json({ success: true, message: 'Freelancer application received successfully.' })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Validation failed'
    res.status(400).json({ success: false, message: msg })
  }
})
