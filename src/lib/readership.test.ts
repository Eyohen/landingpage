import { describe, expect, it } from 'vitest'
import { createEngagedTimer, MAX_ENGAGED_MS, referrerOrigin, scrollPercent } from '@/lib/readership'

describe('referrerOrigin', () => {
  it('returns the origin of a cross-origin referrer', () => {
    expect(referrerOrigin('https://www.linkedin.com/feed/x', 'https://stablezact.com')).toBe(
      'https://www.linkedin.com',
    )
  })

  it('drops the path and query, so no reading history leaves the browser', () => {
    expect(referrerOrigin('https://x.com/a/b?utm=1#f', 'https://stablezact.com')).toBe(
      'https://x.com',
    )
  })

  it('returns null for same-origin navigation', () => {
    expect(referrerOrigin('https://stablezact.com/blog', 'https://stablezact.com')).toBeNull()
  })

  it('returns null for an empty or unparseable referrer', () => {
    expect(referrerOrigin('', 'https://stablezact.com')).toBeNull()
    expect(referrerOrigin('nonsense', 'https://stablezact.com')).toBeNull()
  })
})

describe('scrollPercent', () => {
  const viewport = 800

  it('is 0 when the article starts below the fold', () => {
    expect(scrollPercent({ top: 900, height: 4000 }, viewport)).toBe(0)
  })

  it('grows as the article scrolls past the viewport bottom', () => {
    // 800 of the 4000px article has passed the viewport bottom.
    expect(scrollPercent({ top: 0, height: 4000 }, viewport)).toBe(20)
  })

  it('is 100 once the end of the article has been reached', () => {
    expect(scrollPercent({ top: -3200, height: 4000 }, viewport)).toBe(100)
  })

  it('never exceeds 100 when scrolled past the article into the footer', () => {
    expect(scrollPercent({ top: -9000, height: 4000 }, viewport)).toBe(100)
  })

  it('returns 0 for an unrendered article rather than falsely reporting a read', () => {
    expect(scrollPercent({ top: 0, height: 0 }, viewport)).toBe(0)
  })
})

describe('createEngagedTimer', () => {
  it('counts time while running', () => {
    const timer = createEngagedTimer(0)
    expect(timer.elapsed(5000)).toBe(5000)
  })

  it('stops counting while paused', () => {
    const timer = createEngagedTimer(0)
    timer.pause(1000)
    expect(timer.elapsed(9000)).toBe(1000)
  })

  it('resumes without losing what it already counted', () => {
    const timer = createEngagedTimer(0)
    timer.pause(1000)
    timer.resume(5000)
    expect(timer.elapsed(6000)).toBe(2000)
  })

  it('ignores a second pause while already paused', () => {
    const timer = createEngagedTimer(0)
    timer.pause(1000)
    timer.pause(4000)
    expect(timer.elapsed(9000)).toBe(1000)
  })

  it('caps at 30 minutes so a tab left open overnight cannot skew the average', () => {
    const timer = createEngagedTimer(0)
    expect(timer.elapsed(24 * 60 * 60 * 1000)).toBe(MAX_ENGAGED_MS)
  })
})
