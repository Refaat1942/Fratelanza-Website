import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import {
  getDailyReport, getVisitorLog, getEventFunnel, getTopPages,
  getTopReferrers, getDeviceBreakdown, getSubmissionCounts,
} from './analytics.js'

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'info@fratelanza.com'
const SITE_URL = 'https://www.fratelanza.com'

function isEmailConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function esc(s: unknown): string {
  return String(s ?? '—')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function sendEmail(subject: string, html: string) {
  if (!isEmailConfigured()) {
    console.warn(`[email] SMTP not configured — skipped: ${subject}`)
    return
  }
  try {
    await getTransport().sendMail({
      from: process.env.SMTP_FROM || `"Fratelanza Website" <${process.env.SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject,
      html,
    })
    console.log(`[email] Sent: ${subject}`)
  } catch (err) {
    console.error('[email] Send failed:', err)
  }
}

function row(label: string, value: unknown) {
  return `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">${esc(label)}</td><td style="padding:6px 12px;font-weight:600;font-size:13px;">${esc(value)}</td></tr>`
}

function wrap(title: string, body: string) {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
      <div style="background:linear-gradient(135deg,#0e7490,#059669);padding:20px 24px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;color:#fff;font-size:18px;">${esc(title)}</h1>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;padding:20px 24px;border-radius:0 0 12px 12px;background:#fff;">
        ${body}
        <p style="margin-top:20px;font-size:12px;color:#94a3b8;">
          <a href="${SITE_URL}/admin" style="color:#0e7490;">Open Admin Dashboard</a> · Fratelanza Website
        </p>
      </div>
    </div>`
}

export async function notifyLeadSubmission(data: Record<string, unknown>, leadId: number) {
  const body = `
    <p style="margin:0 0 12px;">New project / demo request received.</p>
    <table style="width:100%;border-collapse:collapse;">${[
      row('Lead ID', leadId),
      row('Company', data.companyName),
      row('Contact', data.contactPerson),
      row('Email', data.email),
      row('WhatsApp', data.whatsapp || data.phone),
      row('Country', data.country),
      row('Project Type', data.projectType || data.interestedProduct),
      row('Stage', data.projectStage),
      row('Budget', data.estimatedBudget),
      row('Timeline', data.desiredTimeline),
      row('Source', data.source || data.firstSource),
      row('Message', data.message),
    ].join('')}</table>`
  await sendEmail(`[Fratelanza] New Lead #${leadId} — ${esc(data.companyName)}`, wrap('New Lead / Project Request', body))
}

export async function notifyContactSubmission(data: Record<string, unknown>) {
  const body = `
    <table style="width:100%;border-collapse:collapse;">${[
      row('Name', data.name),
      row('Email', data.email),
      row('Phone', data.phone),
      row('Subject', data.subject),
      row('Message', data.message),
    ].join('')}</table>`
  await sendEmail(`[Fratelanza] Contact — ${esc(data.name)}`, wrap('New Contact Message', body))
}

export async function notifyCareerSubmission(data: Record<string, unknown>, hasResume: boolean) {
  const body = `
    <table style="width:100%;border-collapse:collapse;">${[
      row('Name', data.fullName),
      row('Email', data.email),
      row('Phone', data.phone),
      row('Position', data.position),
      row('Country', data.country),
      row('Experience', data.experience),
      row('Skills', data.skills),
      row('CV Attached', hasResume ? 'Yes' : 'No'),
    ].join('')}</table>`
  await sendEmail(`[Fratelanza] Career — ${esc(data.fullName)}`, wrap('New Career Application', body))
}

export async function notifyFreelancerSubmission(data: Record<string, unknown>, hasResume: boolean) {
  const body = `
    <table style="width:100%;border-collapse:collapse;">${[
      row('Name', data.fullName),
      row('Email', data.email),
      row('Phone', data.phone),
      row('Country', data.country),
      row('Specialization', data.specialization),
      row('Technologies', data.technologies),
      row('Rate', data.hourlyRate),
      row('CV Attached', hasResume ? 'Yes' : 'No'),
    ].join('')}</table>`
  await sendEmail(`[Fratelanza] Freelancer — ${esc(data.fullName)}`, wrap('New Freelancer Application', body))
}

function getPreviousWeekRange(): { from: string; to: string } {
  const now = new Date()
  const day = now.getDay()
  const lastSunday = new Date(now)
  lastSunday.setDate(now.getDate() - (day === 0 ? 7 : day))
  const lastMonday = new Date(lastSunday)
  lastMonday.setDate(lastSunday.getDate() - 6)
  return {
    from: lastMonday.toISOString().slice(0, 10),
    to: lastSunday.toISOString().slice(0, 10),
  }
}

function lastReportPath(): string {
  const dataDir = process.env.DATA_DIR || path.join(process.cwd(), 'data')
  return path.join(dataDir, 'last-weekly-report.json')
}

function wasReportSent(weekKey: string): boolean {
  try {
    const raw = fs.readFileSync(lastReportPath(), 'utf8')
    const data = JSON.parse(raw) as { weekKey?: string }
    return data.weekKey === weekKey
  } catch {
    return false
  }
}

function markReportSent(weekKey: string) {
  const dataDir = path.dirname(lastReportPath())
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(lastReportPath(), JSON.stringify({ weekKey, sentAt: new Date().toISOString() }))
}

function tableRows(headers: string[], rows: string[][]): string {
  const th = headers.map((h) => `<th style="padding:8px 10px;text-align:left;background:#f1f5f9;font-size:12px;">${esc(h)}</th>`).join('')
  const tr = rows.map((r) =>
    `<tr>${r.map((c) => `<td style="padding:8px 10px;border-top:1px solid #e2e8f0;font-size:12px;">${esc(c)}</td>`).join('')}</tr>`,
  ).join('')
  return `<table style="width:100%;border-collapse:collapse;margin:12px 0;">${`<tr>${th}</tr>`}${tr}</table>`
}

export async function sendWeeklyVisitorReport(force = false) {
  const { from, to } = getPreviousWeekRange()
  const weekKey = `${from}_${to}`
  if (!force && wasReportSent(weekKey)) {
    console.log(`[email] Weekly report for ${weekKey} already sent`)
    return
  }

  const report = getDailyReport(from, to)
  const visitors = getVisitorLog(from, to)
  const funnel = getEventFunnel(from, to)
  const topPages = getTopPages(from, to, 10)
  const topReferrers = getTopReferrers(from, to, 8)
  const devices = getDeviceBreakdown(from, to)
  const submissions = getSubmissionCounts(from, to)

  const dailyRows = report.rows.map((r) => [r.date, String(r.visitors), String(r.page_views)])
  const pageRows = topPages.map((r) => [r.path, String(r.views)])
  const refRows = topReferrers.map((r) => [r.referrer, String(r.visitors)])
  const deviceRows = devices.map((r) => [r.device, String(r.visitors), String(r.page_views)])
  const visitorSample = visitors.rows.slice(0, 15).map((v) => [
    v.country, v.device, v.referrer, String(v.page_views), (v.pages || '').slice(0, 80),
  ])

  const body = `
    <p style="margin:0 0 16px;">Weekly visitor report for <strong>${from}</strong> to <strong>${to}</strong></p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">
      <div style="flex:1;min-width:120px;background:#f0fdfa;padding:12px;border-radius:8px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:#0e7490;">${report.totals.visitors}</div>
        <div style="font-size:11px;color:#64748b;">Unique Visitors</div>
      </div>
      <div style="flex:1;min-width:120px;background:#f0fdfa;padding:12px;border-radius:8px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:#0e7490;">${report.totals.page_views}</div>
        <div style="font-size:11px;color:#64748b;">Page Views</div>
      </div>
      <div style="flex:1;min-width:120px;background:#fef3c7;padding:12px;border-radius:8px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:#b45309;">${submissions.total}</div>
        <div style="font-size:11px;color:#64748b;">Form Submissions</div>
      </div>
    </div>

    <h3 style="font-size:14px;margin:16px 0 8px;">Form Submissions</h3>
    ${tableRows(['Type', 'Count'], [
      ['Leads / Projects', String(submissions.leads)],
      ['Contact', String(submissions.contacts)],
      ['Careers', String(submissions.careers)],
      ['Freelancers', String(submissions.freelancers)],
    ])}

    <h3 style="font-size:14px;margin:16px 0 8px;">Event Funnel</h3>
    ${tableRows(['Event', 'Count'], [
      ['Page Views', String(funnel.pageViews)],
      ['Start Project Clicks', String(funnel.startProjectClick)],
      ['Forms Started', String(funnel.formStarted)],
      ['Forms Completed', String(funnel.formCompleted)],
      ['CTA Clicks', String(funnel.ctaClick)],
    ])}

    <h3 style="font-size:14px;margin:16px 0 8px;">Daily Breakdown</h3>
    ${tableRows(['Date', 'Visitors', 'Page Views'], dailyRows)}

    <h3 style="font-size:14px;margin:16px 0 8px;">Top Pages</h3>
    ${tableRows(['Page', 'Views'], pageRows)}

    <h3 style="font-size:14px;margin:16px 0 8px;">Top Referrers</h3>
    ${tableRows(['Source', 'Visitors'], refRows)}

    <h3 style="font-size:14px;margin:16px 0 8px;">Devices</h3>
    ${tableRows(['Device', 'Visitors', 'Page Views'], deviceRows)}

    <h3 style="font-size:14px;margin:16px 0 8px;">Recent Visitors (sample)</h3>
    ${tableRows(['Country', 'Device', 'Referrer', 'Views', 'Pages'], visitorSample)}
  `

  await sendEmail(`[Fratelanza] Weekly Report ${from} — ${to}`, wrap('Weekly Website Report', body))
  markReportSent(weekKey)
}
