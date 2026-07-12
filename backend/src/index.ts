import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import './db.js'
import { apiRouter } from './routes.js'
import { adminRouter } from './adminRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = parseInt(process.env.PORT || '11001', 10)
const frontendDist = path.join(__dirname, '../frontend/dist')

const app = express()

app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
}))
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'fratelanza-website',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.use('/api/admin', adminRouter)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many requests. Please try again later.' },
})
app.use('/api', limiter)
app.use('/api', apiRouter)

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist, {
    setHeaders(res, filePath) {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
    },
  }))

  app.get(/^(?!\/api).*/, (req, res) => {
    if (req.path.startsWith('/assets/') || path.extname(req.path)) {
      res.status(404).end()
      return
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.sendFile(path.join(frontendDist, 'index.html'))
  })
} else {
  console.warn(`Frontend dist not found at ${frontendDist}`)
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fratelanza API running on port ${PORT}`)
  console.log(`Frontend dist: ${frontendDist}`)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err)
  process.exit(1)
})
