const STORAGE_KEY = 'fratelanza_attribution'

export type AttributionData = {
  firstSource: string
  lastSource: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  landingPage: string
  referrerUrl: string
  deviceType: string
  visitorCountry?: string
  firstVisitAt: string
}

function detectDevice(): string {
  const ua = navigator.userAgent
  if (/iphone|android.*mobile/i.test(ua)) return 'mobile'
  if (/ipad|tablet/i.test(ua)) return 'tablet'
  return 'desktop'
}

function detectSource(params: URLSearchParams, referrer: string): string {
  const utm = params.get('utm_source')
  if (utm) return utm.toLowerCase()
  if (!referrer) return 'direct'
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '')
    if (host.includes('google')) return 'google'
    if (host.includes('facebook') || host.includes('fb.')) return 'facebook'
    if (host.includes('instagram')) return 'instagram'
    if (host.includes('linkedin')) return 'linkedin'
    if (host.includes('fratelanza.com')) return 'direct'
    return host
  } catch {
    return 'referral'
  }
}

export function initAttribution() {
  if (typeof window === 'undefined') return
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY)
    const params = new URLSearchParams(window.location.search)
    const referrer = document.referrer || ''
    const now = new Date().toISOString()
    const source = detectSource(params, referrer)

    if (existing) {
      const data = JSON.parse(existing) as AttributionData
      data.lastSource = source
      if (params.get('utm_source')) data.utmSource = params.get('utm_source') || undefined
      if (params.get('utm_medium')) data.utmMedium = params.get('utm_medium') || undefined
      if (params.get('utm_campaign')) data.utmCampaign = params.get('utm_campaign') || undefined
      if (params.get('utm_content')) data.utmContent = params.get('utm_content') || undefined
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      return
    }

    const data: AttributionData = {
      firstSource: source,
      lastSource: source,
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
      utmContent: params.get('utm_content') || undefined,
      landingPage: window.location.pathname,
      referrerUrl: referrer,
      deviceType: detectDevice(),
      firstVisitAt: now,
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // silent
  }
}

export function getAttribution(): Partial<AttributionData> & { conversionPage?: string } {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { conversionPage: window.location.pathname }
    const data = JSON.parse(raw) as AttributionData
    return { ...data, conversionPage: window.location.pathname }
  } catch {
    return { conversionPage: typeof window !== 'undefined' ? window.location.pathname : '/' }
  }
}

export function attributionPayload() {
  const a = getAttribution()
  return {
    source: a.lastSource || a.firstSource || 'website',
    firstSource: a.firstSource || 'website',
    lastSource: a.lastSource || a.firstSource || 'website',
    utmSource: a.utmSource,
    utmMedium: a.utmMedium,
    utmCampaign: a.utmCampaign,
    utmContent: a.utmContent,
    landingPage: a.landingPage,
    referrerUrl: a.referrerUrl,
    deviceType: a.deviceType,
    visitorCountry: a.visitorCountry,
    firstVisitAt: a.firstVisitAt,
    conversionPage: a.conversionPage,
  }
}
