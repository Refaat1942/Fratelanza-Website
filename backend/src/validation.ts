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
