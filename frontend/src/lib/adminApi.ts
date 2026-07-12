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

export type AdminStats = {
  leads: number
  contacts: number
  careers: number
  freelancers: number
}

export async function fetchStats() {
  const result = await adminFetch<{ data: AdminStats }>('/stats')
  return result.data
}

export async function fetchLeads() {
  const result = await adminFetch<{ data: Record<string, unknown>[] }>('/leads')
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

export function getDownloadUrl(type: 'careers' | 'freelancers', id: number) {
  return `${API_BASE}/admin/download?type=${type}&id=${id}`
}

export async function downloadFile(type: 'careers' | 'freelancers', id: number, filename: string) {
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
