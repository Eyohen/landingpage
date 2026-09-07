import { useEffect, type RefObject } from 'react'
import { createEngagedTimer, referrerOrigin, scrollPercent } from '@/lib/readership'

/**
 * Reports one blog post view to the CMS: a view beacon on mount and an
 * engagement beacon on leaving.
 *
 * Nothing here is persisted in the browser. `viewId` lives for the life of the
 * effect and is gone when the tab closes — no cookie, no localStorage, and so
 * no consent gate. See the spec for why measurement is split across two
 * beacons rather than sent once at the end.
 */
export function useReadership(
  slug: string | undefined,
  bodyRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const cmsUrl = import.meta.env.VITE_CMS_URL
    if (!cmsUrl || !slug) return

    const endpoint = `${cmsUrl.replace(/\/$/, '')}/api/readership/ping`
    const viewId = crypto.randomUUID()
    const timer = createEngagedTimer(Date.now())
    let maxScroll = 0
    let lastSent: string | null = null

    /**
     * text/plain is the point: it is CORS-safelisted, so neither beacon
     * triggers a preflight — which `sendBeacon` cannot answer.
     */
    function send(payload: Record<string, unknown>, useBeacon: boolean): void {
      const body = JSON.stringify(payload)
      try {
        if (useBeacon && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon(endpoint, new Blob([body], { type: 'text/plain;charset=UTF-8' }))
          return
        }
        void fetch(endpoint, {
          method: 'POST',
          body,
          keepalive: true,
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          // Analytics must never surface as an error to the reader.
        }).catch(() => {})
      } catch {
        // A blocked or failed beacon is a missing data point, nothing more.
      }
    }

    send(
      { viewId, slug, referrer: referrerOrigin(document.referrer, window.location.origin) },
      false,
    )

    function measure(): void {
      const element = bodyRef.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      maxScroll = Math.max(
        maxScroll,
        scrollPercent({ top: rect.top, height: rect.height }, window.innerHeight),
      )
    }

    function flush(useBeacon: boolean): void {
      measure()
      const payload = { viewId, maxScroll, engagedMs: timer.elapsed(Date.now()) }
      // A reader who leaves, returns and leaves again should not cost two
      // identical writes; the server takes the maximum anyway.
      const fingerprint = `${payload.maxScroll}:${payload.engagedMs}`
      if (fingerprint === lastSent) return
      lastSent = fingerprint
      send(payload, useBeacon)
    }

    function onVisibilityChange(): void {
      if (document.visibilityState === 'hidden') {
        timer.pause(Date.now())
        flush(true)
      } else {
        timer.resume(Date.now())
      }
    }

    function onBlur(): void {
      timer.pause(Date.now())
    }

    function onFocus(): void {
      timer.resume(Date.now())
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      timer.pause(Date.now())
      // Route change away from the post: same report, but the page is not
      // going away, so a normal keepalive request is fine.
      flush(false)
    }
  }, [slug, bodyRef])
}
