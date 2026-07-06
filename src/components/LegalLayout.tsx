import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type LegalLayoutProps = {
  title: string
  updated: string
  children: ReactNode
}

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-[family-name:var(--font-geist)] text-[var(--color-ink)]">
      <header className="border-b border-[var(--color-border)]">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
          <Link to="/" className="text-[22px] font-normal tracking-[-0.01em]">
            Stablezact
          </Link>
          <Link
            to="/"
            className="text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[760px] px-6 py-16 max-sm:py-10">
        <h1 className="text-[36px] font-medium tracking-[-0.02em] max-sm:text-[28px]">{title}</h1>
        <p className="mt-2 text-[14px] text-[var(--color-muted)]">Last updated: {updated}</p>
        <div className="legal-prose mt-10">{children}</div>
      </main>
    </div>
  )
}
