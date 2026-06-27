import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface CountUpProps {
  /** numeric target, e.g. 5, 1000, 99.9 */
  value: number
  /** text rendered before the number */
  prefix?: string
  /** text rendered after the number, e.g. "M+", "+", "%" */
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

/**
 * Animates a number from 0 → value once when scrolled into view.
 * Used for the stat figures (5M+, 1000+, 99.9%, 1k+).
 */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    let start = 0
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      if (!start) start = now
      const p = Math.min((now - start) / (duration * 1000), 1)
      setDisplay(value * ease(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}
