// Analytics loaders, gated on consent. Nothing here touches the network until
// `enableAnalytics()` is called, which only happens once the visitor has opted
// into the analytics category. The production GA4/Clarity IDs are the defaults;
// env vars can override them per environment.

const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined) || 'G-CHV550VCGD'
const CLARITY_ID = (import.meta.env.VITE_CLARITY_ID as string | undefined) || 'xybku39tvu'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
  }
}

let injected = false

function loadGA4(id: string): void {
  window.dataLayer = window.dataLayer || []
  const gtag: Window['gtag'] = (...args) => {
    window.dataLayer!.push(args)
  }
  window.gtag = gtag
  gtag('js', new Date())
  // Consent Mode v2. We only load GA after opt-in, so analytics is granted;
  // ad signals stay denied (this is analytics, not advertising).
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  gtag('config', id, { anonymize_ip: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)
}

function loadClarity(id: string): void {
  window.clarity =
    window.clarity ||
    function (...args: unknown[]) {
      ;(window.clarity!.q = window.clarity!.q || []).push(args)
    }
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${id}`
  document.head.appendChild(script)
}

/** Inject the analytics trackers. Idempotent. */
export function enableAnalytics(): void {
  if (injected) return
  if (GA4_ID) loadGA4(GA4_ID)
  if (CLARITY_ID) loadClarity(CLARITY_ID)
  injected = true
}

/** Expire any analytics cookies already set (GA `_ga*`, Clarity `_cl*`, MS ids). */
export function clearAnalyticsCookies(): void {
  const prefixes = ['_ga', '_gid', '_gat', '_clck', '_clsk', 'CLID', 'ANONCHK', 'MUID', 'SM']
  const host = window.location.hostname
  const parts = host.split('.')
  const domains = new Set<string>([host, `.${host}`])
  if (parts.length > 1) domains.add(`.${parts.slice(-2).join('.')}`)

  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim()
    if (!name) continue
    if (!prefixes.some((p) => name === p || name.startsWith(p))) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`
    }
    document.cookie = `${name}=; Max-Age=0; path=/`
  }
}

/**
 * Apply the current consent choice on page load:
 * - granted  -> inject trackers
 * - denied   -> ensure no stale analytics cookies linger
 */
export function applyAnalyticsConsent(analytics: boolean): void {
  if (analytics) {
    enableAnalytics()
  } else {
    clearAnalyticsCookies()
  }
}
