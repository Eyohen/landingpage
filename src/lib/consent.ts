// GDPR opt-in cookie consent state.
//
// Two categories: `necessary` (always on, no cookies are actually set for it —
// only the consent choice itself is stored) and `analytics` (GA4 + Microsoft
// Clarity). Nothing non-essential runs until the visitor opts in.

export type ConsentCategories = {
  necessary: true
  analytics: boolean
}

type ConsentRecord = {
  version: number
  analytics: boolean
  updatedAt: string
}

const STORAGE_KEY = 'stablezact_consent'

// Bump when the set of trackers/categories changes so returning visitors are
// asked to confirm again against the new disclosure.
export const CONSENT_VERSION = 1

type Listener = (consent: ConsentCategories) => void
const listeners = new Set<Listener>()

function read(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

/** Whether the visitor has made a choice under the current consent version. */
export function hasDecided(): boolean {
  return read() !== null
}

export function getConsent(): ConsentCategories {
  const record = read()
  return { necessary: true, analytics: record?.analytics ?? false }
}

export function setConsent(analytics: boolean): void {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    analytics,
    updatedAt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Private mode / storage disabled: consent just won't persist across visits.
  }
  const consent: ConsentCategories = { necessary: true, analytics }
  listeners.forEach((listener) => listener(consent))
}

/** Subscribe to consent changes. Returns an unsubscribe function. */
export function onConsentChange(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Event other components dispatch to reopen the preferences panel. */
export const OPEN_SETTINGS_EVENT = 'stablezact:open-cookie-settings'

export function openCookieSettings(): void {
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT))
}
