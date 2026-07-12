import { Router, type Request, type Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { db } from './db.js'
import {
  leadSchema, contactSchema, careerSchema, freelancerSchema,
  rejectHoneypot, sanitize,
} from './validation.js'

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

apiRouter.post('/leads', (req: Request, res: Response) => {
  try {
    const data = leadSchema.parse(req.body)
    rejectHoneypot(data)

    db.prepare(`
      INSERT INTO leads (company_name, contact_person, business_type, industry, country, city, phone, whatsapp, email, expected_users, interested_product, current_system, message, preferred_contact_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sanitize(data.companyName),
      sanitize(data.contactPerson || data.companyName),
      data.businessType || null,
      data.industry || null,
      data.country || null,
      data.city || null,
      data.phone || null,
      data.whatsapp || null,
      data.email,
      data.expectedUsers || null,
      data.interestedProduct || null,
      data.currentSystem || null,
      data.message ? sanitize(data.message) : null,
      data.preferredContactTime || null,
    )

    res.json({ success: true, message: 'Demo request received successfully.' })
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
