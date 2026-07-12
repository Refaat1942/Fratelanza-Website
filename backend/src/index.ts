import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'
import './db.js'
import { apiRouter } from './routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = parseInt(process.env.PORT || '11001', 10)

const app = express()

app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
}))
app.use(express.json({ limit: '1mb' }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many requests. Please try again later.' },
})
app.use('/api', limiter)

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'fratelanza-website',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.use('/api', apiRouter)

const frontendDist = path.join(__dirname, '../../frontend/dist')
app.use(express.static(frontendDist))
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fratelanza API running on port ${PORT}`)
})
