import { Link } from 'react-router-dom'

/**
 * CTA button used across the inner pages — Figma "Link - Primary_md".
 * Variants: purple (primary), soft (lavender), crimson (partnership CTAs on
 * the purple banner).
 */

export interface Cta {
  label: string
  href: string
  variant?: 'purple' | 'soft' | 'crimson'
}

const VARIANTS = {
  purple: 'bg-[#7042d2] text-white hover:bg-[#5f32c5]',
  soft: 'bg-[#e7dcff] text-[#7042d2] hover:bg-[#dccbff]',
  crimson: 'bg-[var(--color-accent)] text-white hover:bg-[#a82545]',
} as const

export function CtaButton({ label, href, variant = 'purple' }: Cta) {
  const className = `inline-flex items-center justify-center rounded-[10px] px-6 py-2.5 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.03em] transition-all duration-300 hover:-translate-y-0.5 max-sm:w-full ${VARIANTS[variant]}`
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    )
  }
  if (href.startsWith('/#') || href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link to={href} className={className}>
      {label}
    </Link>
  )
}
