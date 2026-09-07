/**
 * Measurement primitives for blog readership. Deliberately free of DOM and
 * network access so the arithmetic can be tested directly — see
 * docs/superpowers/specs/2026-09-07-blog-analytics-design.md.
 */

/** A tab left open overnight must not drag the average up. */
export const MAX_ENGAGED_MS = 30 * 60 * 1000

/**
 * The origin of the referring page, or null when there is none or it is our
 * own. Only the origin ever leaves the browser: the path would describe what
 * else the reader was looking at.
 */
export function referrerOrigin(referrer: string, currentOrigin: string): string | null {
  if (!referrer) return null
  try {
    const { origin } = new URL(referrer)
    return origin === currentOrigin ? null : origin
  } catch {
    return null
  }
}

/**
 * How far through the article body the reader has scrolled, 0–100.
 *
 * Measured against the article's own box rather than the document, because the
 * footer and CTA card sit below it — scrolling to the bottom of the page is not
 * the same as finishing the article, and counting it as such would inflate
 * every read rate on the site.
 *
 * `box` is a viewport-relative rect (`getBoundingClientRect()`), so `top` goes
 * negative as the article scrolls up past the top of the screen.
 */
export function scrollPercent(
  box: { top: number; height: number },
  viewportHeight: number,
): number {
  if (box.height <= 0) return 0
  const passed = viewportHeight - box.top
  return Math.max(0, Math.min(100, Math.round((passed / box.height) * 100)))
}

export interface EngagedTimer {
  resume(now: number): void
  pause(now: number): void
  elapsed(now: number): number
}

/**
 * Accumulates time the reader was actually present — the tab visible and
 * focused — rather than wall-clock time on the page. Starts running.
 */
export function createEngagedTimer(now: number): EngagedTimer {
  let accumulated = 0
  let startedAt: number | null = now

  return {
    resume(at) {
      if (startedAt === null) startedAt = at
    },
    pause(at) {
      if (startedAt === null) return
      accumulated += Math.max(0, at - startedAt)
      startedAt = null
    },
    elapsed(at) {
      const live = startedAt === null ? 0 : Math.max(0, at - startedAt)
      return Math.min(MAX_ENGAGED_MS, accumulated + live)
    },
  }
}
