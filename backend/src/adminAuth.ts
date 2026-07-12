import crypto from 'crypto'
import type { Request, Response, NextFunction } from 'express'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000

type Session = { expiresAt: number }

const sessions = new Map<string, Session>()

function purgeExpired() {
  const now = Date.now()
  for (const [token, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(token)
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!ADMIN_PASSWORD) {
    res.status(503).json({ success: false, message: 'Admin panel is not configured. Set ADMIN_PASSWORD on the server.' })
    return
  }

  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    return
  }

  const token = header.slice(7)
  purgeExpired()
  const session = sessions.get(token)
  if (!session || session.expiresAt <= Date.now()) {
    res.status(401).json({ success: false, message: 'Session expired. Please log in again.' })
    return
  }

  next()
}

export function adminLogin(req: Request, res: Response) {
  if (!ADMIN_PASSWORD) {
    res.status(503).json({ success: false, message: 'Admin panel is not configured. Set ADMIN_PASSWORD on the server.' })
    return
  }

  const { password } = req.body as { password?: string }
  const input = (password || '').trim()
  const expected = ADMIN_PASSWORD.trim()
  if (!input || input !== expected) {
    res.status(401).json({ success: false, message: 'Invalid password' })
    return
  }

  const token = crypto.randomBytes(32).toString('hex')
  sessions.set(token, { expiresAt: Date.now() + TOKEN_TTL_MS })
  res.json({ success: true, token, expiresIn: TOKEN_TTL_MS })
}

export function adminLogout(req: Request, res: Response) {
  const header = req.headers.authorization
  if (header?.startsWith('Bearer ')) {
    sessions.delete(header.slice(7))
  }
  res.json({ success: true })
}
