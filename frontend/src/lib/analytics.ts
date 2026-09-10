const API_BASE = import.meta.env.VITE_API_URL || '/api'

let lastTrackedPath = ''
const SESSION_KEY = 'fratelanza_session_id'

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return 'anonymous'
  }
}

export function trackPageView(path: string) {
  if (!path || path.startsWith('/admin') || path === lastTrackedPath) return
  lastTrackedPath = path

  fetch(`${API_BASE}/analytics/visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
    keepalive: true,
  }).catch(() => {})
}

export function trackEvent(
  eventType: string,
  metadata?: Record<string, unknown>,
  path?: string,
) {
  const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '/')
  if (currentPath.startsWith('/admin')) return

  fetch(`${API_BASE}/analytics/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType,
      path: currentPath,
      metadata,
      sessionId: getSessionId(),
    }),
    keepalive: true,
  }).catch(() => {})
}

export function trackCtaClick(label: string, href?: string) {
  trackEvent('cta_click', { label, href })
}

export function trackStartProjectClick(location: string) {
  trackEvent('start_project_click', { location })
}
