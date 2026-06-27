import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  /** delay in seconds */
  delay?: number
  /** travel distance in px (default 24) */
  y?: number
  className?: string
  as?: 'div' | 'section' | 'span' | 'li' | 'h2' | 'p'
}

/**
 * Scroll-reveal: fades + rises into place once when scrolled into view.
 * Matches the Framer prototype's signature entrance.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/**
 * Wrap a set of <RevealItem> children to stagger their entrance.
 */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
