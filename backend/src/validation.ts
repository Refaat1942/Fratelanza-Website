import { z } from 'zod'

export const honeypotSchema = z.object({
  website: z.string().max(0).optional(),
})

export const leadSchema = honeypotSchema.extend({
  companyName: z.string().min(2),
  contactPerson: z.string().optional(),
  businessType: z.string().optional(),
  industry: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email(),
  expectedUsers: z.string().optional(),
  interestedProduct: z.string().optional(),
  currentSystem: z.string().optional(),
  message: z.string().optional(),
  preferredContactTime: z.string().optional(),
  projectType: z.string().optional(),
  projectStage: z.string().optional(),
  estimatedBudget: z.string().optional(),
  desiredTimeline: z.string().optional(),
  existingWebsite: z.string().optional(),
  existingSystem: z.string().optional(),
  source: z.string().optional(),
  firstSource: z.string().optional(),
  lastSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  landingPage: z.string().optional(),
  referrerUrl: z.string().optional(),
  deviceType: z.string().optional(),
  visitorCountry: z.string().optional(),
  firstVisitAt: z.string().optional(),
  conversionPage: z.string().optional(),
})

export const analyticsEventSchema = z.object({
  eventType: z.string().min(1).max(80),
  path: z.string().max(500).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  sessionId: z.string().max(64).optional(),
})

export const leadUpdateSchema = z.object({
  status: z.string().optional(),
  priority: z.string().optional(),
  leadScore: z.number().int().optional(),
  assignedTo: z.string().optional(),
  estimatedValue: z.number().optional(),
  probabilityPct: z.number().int().min(0).max(100).optional(),
  wonRevenue: z.number().optional(),
  lastContactAt: z.string().optional(),
  nextFollowUpAt: z.string().optional(),
  notes: z.string().optional(),
  projectType: z.string().optional(),
  projectStage: z.string().optional(),
  estimatedBudget: z.string().optional(),
  desiredTimeline: z.string().optional(),
})

export const contactSchema = honeypotSchema.extend({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
})

export const careerSchema = honeypotSchema.extend({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().optional(),
  portfolio: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
  expectedSalary: z.string().optional(),
  country: z.string().optional(),
  skills: z.string().optional(),
})

export const freelancerSchema = honeypotSchema.extend({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  specialization: z.string().optional(),
  yearsExperience: z.string().optional(),
  portfolio: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  hourlyRate: z.string().optional(),
  monthlyAvailability: z.string().optional(),
  technologies: z.string().optional(),
  englishLevel: z.string().optional(),
  arabicLevel: z.string().optional(),
  notes: z.string().optional(),
})

export function rejectHoneypot(data: { website?: string }) {
  if (data.website) {
    throw new Error('Spam detected')
  }
}

export function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}
