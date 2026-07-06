import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { applyAnalyticsConsent } from '@/lib/analytics'
import {
  getConsent,
  hasDecided,
  OPEN_SETTINGS_EVENT,
  setConsent,
} from '@/lib/consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    // First visit (no decision under the current version) shows the banner.
    if (!hasDecided()) setVisible(true)
    setAnalytics(getConsent().analytics)

    const reopen = () => {
      setAnalytics(getConsent().analytics)
      setShowPrefs(true)
      setVisible(true)
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen)
  }, [])

  function save(nextAnalytics: boolean) {
    const wasEnabled = getConsent().analytics
    setConsent(nextAnalytics)
    applyAnalyticsConsent(nextAnalytics)
    setVisible(false)
    setShowPrefs(false)
    // If trackers were loaded this session and consent is being withdrawn,
    // reload to fully unload them.
    if (wasEnabled && !nextAnalytics) window.location.reload()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 font-[family-name:var(--font-geist)]"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent">
          <div className="mx-auto w-full max-w-[640px] rounded-[16px] border border-[var(--color-border)] bg-white/95 p-6 shadow-[0_16px_48px_rgba(10,10,11,0.16)] backdrop-blur-[8px] max-sm:p-5">
            <h2 className="text-[18px] font-medium tracking-[-0.01em] text-[var(--color-ink)]">
              We use cookies
            </h2>
            <p className="mt-2 text-[14px] leading-[1.55] text-[var(--color-muted)]">
              We use essential cookies to make this site work. With your permission we also use
              analytics cookies (Google Analytics and Microsoft Clarity) to understand how the site
              is used. Nothing non-essential runs until you agree. See our{' '}
              <Link to="/cookies" className="text-[var(--color-purple)] underline underline-offset-2">
                Cookie Policy
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[var(--color-purple)] underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>

            {showPrefs && (
              <div className="mt-5 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-[14px] font-medium text-[var(--color-ink)]">
                      Necessary
                    </span>
                    <span className="block text-[13px] text-[var(--color-muted)]">
                      Required for the site to function. Always on.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked
                    disabled
                    aria-label="Necessary cookies (always on)"
                    className="mt-1 h-[18px] w-[18px] accent-[var(--color-purple)]"
                  />
                </label>
                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-[14px] font-medium text-[var(--color-ink)]">
                      Analytics
                    </span>
                    <span className="block text-[13px] text-[var(--color-muted)]">
                      Google Analytics &amp; Microsoft Clarity. Helps us improve the site.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    aria-label="Analytics cookies"
                    className="mt-1 h-[18px] w-[18px] accent-[var(--color-purple)]"
                  />
                </label>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => save(true)}
                className="rounded-[10px] bg-[var(--color-purple)] px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90">
                Accept all
              </button>
              <button
                type="button"
                onClick={() => save(false)}
                className="rounded-[10px] border border-[var(--color-border)] px-5 py-2.5 text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)]">
                Reject all
              </button>
              {showPrefs ? (
                <button
                  type="button"
                  onClick={() => save(analytics)}
                  className="ml-auto text-[14px] font-medium text-[var(--color-purple)] hover:opacity-80">
                  Save choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPrefs(true)}
                  className="ml-auto text-[14px] font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                  Preferences
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
