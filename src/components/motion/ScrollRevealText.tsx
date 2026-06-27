import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

interface ScrollRevealTextProps {
  text: string
  className?: string
}

/**
 * Reveals text word-by-word as the element scrolls through the viewport
 * (scroll-linked / scrubbed). Each word fades from faint to full as the
 * scroll progress passes its position — the "text animates as you scroll"
 * effect. Pairs with Lenis smooth scroll.
 */
export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>
  range: [number, number]
  children: string
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <span className="mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}
