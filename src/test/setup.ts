import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

/**
 * jsdom has no IntersectionObserver, and framer-motion's `whileInView` — which
 * `Reveal` uses, and `Reveal` wraps most of the page components — constructs one
 * on mount. Without this stub, rendering any page in a test throws before the
 * test can assert anything.
 *
 * It never fires a callback: tests here assert structure and behaviour, not
 * scroll-triggered animation.
 */
class NoopIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

globalThis.IntersectionObserver =
  NoopIntersectionObserver as unknown as typeof IntersectionObserver

afterEach(() => {
  cleanup()
})
