import type { ReactNode } from 'react'
import { Navbar } from '@/components/Navbar'
import { ClosingCTA } from '@/sections/ClosingCTA'

type LegalLayoutProps = {
  title: string
  updated: string
  children: ReactNode
}

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-[family-name:var(--font-geist)] text-[var(--color-ink)]">
      <Navbar />
      <main className="mx-auto max-w-[760px] px-6 pb-28 pt-[150px] max-sm:pt-[120px]">
        <h1 className="text-[36px] font-medium tracking-[-0.02em] max-sm:text-[28px]">{title}</h1>
        <p className="mt-2 text-[14px] text-[var(--color-muted)]">Last updated: {updated}</p>
        <div className="legal-prose mt-10">{children}</div>
      </main>
      <ClosingCTA />
    </div>
  )
}
