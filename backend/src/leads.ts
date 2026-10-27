import { db } from './db.js'
import { calculateLeadScore, logLeadActivity, logStatusChange, scoreLabel } from './crm.js'
import type { z } from 'zod'
import type { leadSchema } from './validation.js'
import { sanitize } from './validation.js'

type LeadInput = z.infer<typeof leadSchema>

export function insertLead(data: LeadInput, attachmentPath?: string | null) {
  const score = calculateLeadScore({
    estimatedBudget: data.estimatedBudget,
    projectType: data.projectType,
    companyName: data.companyName,
    desiredTimeline: data.desiredTimeline,
    projectStage: data.projectStage,
    message: data.message,
  })
  const priority = scoreLabel(score)
  const source = data.source || data.firstSource || 'website'

  const result = db.prepare(`
    INSERT INTO leads (
      company_name, contact_person, business_type, industry, country, city,
      phone, whatsapp, email, expected_users, interested_product, current_system,
      message, preferred_contact_time,
      project_type, project_stage, estimated_budget, desired_timeline,
      existing_website, existing_system, attachment_path,
      source, first_source, last_source,
      utm_source, utm_medium, utm_campaign, utm_content,
      landing_page, referrer_url, device_type, visitor_country,
      first_visit_at, conversion_page,
      status, priority, lead_score
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?,
      'NEW', ?, ?
    )
  `).run(
    sanitize(data.companyName),
    sanitize(data.contactPerson || data.companyName),
    data.businessType || null,
    data.industry || null,
    data.country || null,
    data.city || null,
    data.phone || null,
    data.whatsapp || null,
    data.email || '',
    data.expectedUsers || null,
    data.interestedProduct || data.projectType || null,
    data.currentSystem || data.existingSystem || null,
    data.message ? sanitize(data.message) : null,
    data.preferredContactTime || null,
    data.projectType || null,
    data.projectStage || null,
    data.estimatedBudget || null,
    data.desiredTimeline || null,
    data.existingWebsite || null,
    data.existingSystem || null,
    attachmentPath || null,
    source,
    data.firstSource || source,
    data.lastSource || source,
    data.utmSource || null,
    data.utmMedium || null,
    data.utmCampaign || null,
    data.utmContent || null,
    data.landingPage || null,
    data.referrerUrl || null,
    data.deviceType || null,
    data.visitorCountry || null,
    data.firstVisitAt || null,
    data.conversionPage || null,
    priority,
    score,
  )

  const leadId = Number(result.lastInsertRowid)
  logLeadActivity(leadId, 'lead_created', 'Lead created via website')
  logStatusChange(leadId, null, 'NEW')
  return leadId
}
