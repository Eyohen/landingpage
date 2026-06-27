import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Document-level smooth scrolling (Lenis), matching the Framer prototype's
 * eased inertia scroll. Disabled when the user prefers reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
