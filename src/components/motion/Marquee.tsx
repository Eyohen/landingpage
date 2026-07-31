import type { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  /** seconds for one full loop (default 30) */
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  /** gap between repeated items in px */
  gap?: number
}

/**
 * Infinite horizontal marquee. Duplicates its children and translates
 * the track by -50% so the loop is seamless. Pauses on hover.
 */
export function Marquee({
  children,
  speed = 30,
  direction = 'left',
  className = '',
  gap = 48,
}: MarqueeProps) {
  return (
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div
        className="flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]"
        style={{
          gap,
          '--marquee-half-gap': `${gap / 2}px`,
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
