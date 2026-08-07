// Consent plumbing for the analytics tags that are loaded statically in
// index.html (Google tag with Consent Mode v2 defaults set to "denied", and
// Microsoft Clarity started with consent withheld). Nothing here injects
// scripts — it only flips the consent signals once the visitor chooses, and
// cleans up cookies on decline.

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
  }
}

function gtag(...args: unknown[]): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

function grantConsent(): void {
  gtag('consent', 'update', { analytics_storage: 'granted' })
  window.clarity?.('consent', true)
}

function denyConsent(): void {
  gtag('consent', 'update', { analytics_storage: 'denied' })
  window.clarity?.('consent', false)
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
 * Apply the current consent choice:
 * - granted -> upgrade Consent Mode + Clarity to full tracking
 * - denied  -> keep trackers cookieless and clear any stale cookies
 */
export function applyAnalyticsConsent(analytics: boolean): void {
  if (analytics) {
    grantConsent()
  } else {
    denyConsent()
    clearAnalyticsCookies()
  }
}
