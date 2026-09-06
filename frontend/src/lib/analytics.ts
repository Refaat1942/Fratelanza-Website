const API_BASE = import.meta.env.VITE_API_URL || '/api'

let lastTrackedPath = ''

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
