interface SectionEyebrowProps {
  children: React.ReactNode
  /** crimson by default; some dark sections use the same accent */
  className?: string
}

/**
 * The `[ LABEL ]` eyebrow used above every section heading.
 * JetBrains Mono, crimson accent, bracketed.
 */
export function SectionEyebrow({ children, className = '' }: SectionEyebrowProps) {
  return (
    <div
      className={`flex items-center gap-1 font-mono text-[16px] font-medium tracking-[0.04em] text-[var(--color-accent)] ${className}`}
    >
      <span className="text-[18px]">[</span>
      <span className="uppercase">{children}</span>
      <span className="text-[18px]">]</span>
    </div>
  )
}
