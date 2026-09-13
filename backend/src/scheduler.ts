import cron from 'node-cron'
import { sendWeeklyVisitorReport } from './email.js'

export function startScheduler() {
  // Every Monday at 9:00 AM Cairo time
  cron.schedule('0 9 * * 1', () => {
    sendWeeklyVisitorReport().catch((err) => console.error('[scheduler] Weekly report failed:', err))
  }, { timezone: 'Africa/Cairo' })

  console.log('[scheduler] Weekly visitor report scheduled — Mondays 9:00 AM (Africa/Cairo)')
}
