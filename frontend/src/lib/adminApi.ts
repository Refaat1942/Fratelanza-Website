const API_BASE = import.meta.env.VITE_API_URL || '/api'

const TOKEN_KEY = 'fratelanza_admin_token'

export function getAdminToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY)
}

async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken()
  const response = await fetch(`${API_BASE}/admin${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || 'Request failed')
  }
  return result
}

export async function adminLogin(password: string) {
  const result = await adminFetch<{ success: boolean; token: string }>('/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
  setAdminToken(result.token)
  return result
}

export async function adminLogout() {
  try {
    await adminFetch('/logout', { method: 'POST' })
  } finally {
    clearAdminToken()
  }
}

export type CrmOverview = {
  totalLeads: number
  byStatus: Record<string, number>
  qualified: number
  proposals: number
  won: number
  lost: number
  totalPipeline: number
  weightedPipeline: number
  wonRevenue: number
  conversion: {
    visitorToLead: number | null
    leadToQualified: number | null
    qualifiedToProposal: number | null
    proposalToWon: number | null
  }
  followUps: { dueToday: number; overdue: number; upcoming7d: number }
}

export type AdminStats = {
  leads: number
  contacts: number
  careers: number
  freelancers: number
  todayVisitors: number
  todayPageViews: number
  totalVisitors: number
  last7Days: { date: string; visitors: number; page_views: number }[]
  crm?: CrmOverview
}

export type LeadRow = Record<string, unknown>

export type LeadDetail = {
  lead: LeadRow
  activities: { id: number; type: string; description: string; created_at: string }[]
  history: { id: number; from_status: string; to_status: string; changed_at: string }[]
}

export type DailyAnalytics = {
  from: string
  to: string
  rows: { date: string; visitors: number; page_views: number }[]
  totals: { visitors: number; page_views: number }
}

export type VisitorLogRow = {
  visitor_hash: string
  ip_address: string
  country: string
  referrer: string
  device: string
  first_seen: string
  last_seen: string
  page_views: number
  pages: string
}

export type VisitorLog = {
  from: string
  to: string
  rows: VisitorLogRow[]
}

export async function fetchDailyAnalytics(from: string, to: string) {
  const params = new URLSearchParams({ from, to })
  const result = await adminFetch<{ data: DailyAnalytics }>(`/analytics/daily?${params}`)
  return result.data
}

export async function fetchVisitorLog(from: string, to: string) {
  const params = new URLSearchParams({ from, to })
  const result = await adminFetch<{ data: VisitorLog }>(`/analytics/visitors?${params}`)
  return result.data
}

export async function fetchStats() {
  const result = await adminFetch<{ data: AdminStats }>('/stats')
  return result.data
}

export async function fetchLeads() {
  const result = await adminFetch<{ data: LeadRow[] }>('/leads')
  return result.data
}

export async function fetchCrmOverview() {
  const result = await adminFetch<{ data: CrmOverview }>('/crm/overview')
  return result.data
}

export async function fetchSourceReport() {
  const result = await adminFetch<{ data: Record<string, unknown>[] }>('/crm/reports/sources')
  return result.data
}

export async function fetchProjectTypeReport() {
  const result = await adminFetch<{ data: Record<string, unknown>[] }>('/crm/reports/project-types')
  return result.data
}

export async function fetchBudgetReport() {
  const result = await adminFetch<{ data: Record<string, unknown>[] }>('/crm/reports/budgets')
  return result.data
}

export async function fetchFollowUps(filter: 'today' | 'overdue' | 'upcoming') {
  const result = await adminFetch<{ data: LeadRow[] }>(`/crm/follow-ups/${filter}`)
  return result.data
}

export async function fetchEventFunnel() {
  const result = await adminFetch<{ data: Record<string, unknown> }>('/analytics/funnel')
  return result.data
}

export async function fetchLeadDetail(id: number) {
  const result = await adminFetch<{ data: LeadDetail }>(`/leads/${id}`)
  return result.data
}

export async function updateLead(id: number, data: Record<string, unknown>) {
  const result = await adminFetch<{ data: LeadRow }>(`/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return result.data
}

export async function addLeadActivity(id: number, type: string, description: string) {
  await adminFetch(`/leads/${id}/activities`, {
    method: 'POST',
    body: JSON.stringify({ type, description }),
  })
}

export async function fetchLeadStatuses() {
  const result = await adminFetch<{ data: string[] }>('/lead-statuses')
  return result.data
}

export async function fetchContacts() {
  const result = await adminFetch<{ data: Record<string, unknown>[] }>('/contacts')
  return result.data
}

export async function fetchCareers() {
  const result = await adminFetch<{ data: Record<string, unknown>[] }>('/careers')
  return result.data
}

export async function fetchFreelancers() {
  const result = await adminFetch<{ data: Record<string, unknown>[] }>('/freelancers')
  return result.data
}

export function getDownloadUrl(type: 'careers' | 'freelancers' | 'leads', id: number) {
  return `${API_BASE}/admin/download?type=${type}&id=${id}`
}

export async function downloadFile(type: 'careers' | 'freelancers' | 'leads', id: number, filename: string) {
  const token = getAdminToken()
  const response = await fetch(getDownloadUrl(type, id), {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!response.ok) throw new Error('Download failed')
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
