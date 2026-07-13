import { useState } from 'react'
import { motion } from 'motion/react'
import logoUrl from '@/assets/figma/stablezact-logo-color.svg'

/**
 * Top navigation bar — Figma node 352:21541.
 * Light header: white background, black text, Stablezact logo + wordmark,
 * four nav links, and a purple-outlined "Book a Demo" CTA with arrow.
 * Collapses behind a hamburger toggle on mobile.
 */

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Problems', href: '/#problems' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Documentation', href: 'https://docs.stablezact.com', external: true },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-transparent bg-[linear-gradient(90deg,rgba(255,255,255,0.78)_0%,rgba(248,244,255,0.58)_46%,rgba(255,241,247,0.58)_100%)] text-black backdrop-blur-[8px]"
    >
      <div className="container-1200 flex h-[74px] items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-[5px]" aria-label="Stablezact home">
          <img src={logoUrl} alt="" className="h-[32px] w-[28px]" />
          <span className="whitespace-nowrap text-[22px] font-medium tracking-[-0.01em]">
            Stablezact
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="ml-auto hidden items-center gap-8 text-[17px] font-medium tracking-[-0.01em] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...('external' in link && link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="whitespace-nowrap text-[#17131a] transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-[var(--color-border)] bg-white md:hidden">
          <nav className="container-1200 flex flex-col gap-1 py-4 text-[18px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...('external' in link && link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                onClick={() => setOpen(false)}
                className="py-2 transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </motion.header>
  )
}
