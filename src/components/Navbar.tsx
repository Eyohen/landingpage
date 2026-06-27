import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import logoUrl from '@/assets/figma/stablezact-logo-color.svg'

/**
 * Top navigation bar — Figma node 352:21541.
 * Light header: white background, black text, Stablezact logo + wordmark,
 * four nav links, and a purple-outlined "Book a Demo" CTA with arrow.
 * Collapses behind a hamburger toggle on mobile.
 */

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Problems', href: '#problems' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Documentation', href: '#documentation' },
] as const

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.75 9H14.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 3.75L14.25 9L9 14.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[var(--color-border)] bg-white/85 text-black backdrop-blur-md'
          : 'border-b border-transparent bg-transparent text-white'
      }`}
    >
      <div className="container-1200 flex h-[88px] items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-[5px]" aria-label="Stablezact home">
          <img src={logoUrl} alt="" className="h-[37px] w-8" />
          <span className="text-[25px] font-normal tracking-[-0.01em] whitespace-nowrap">
            Stablezact
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-6 text-[20px] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#book-a-demo"
          className="hidden items-center justify-center gap-2 border-[0.6px] border-solid border-[#7042d2] p-4 text-[18px] font-medium tracking-[-0.03em] whitespace-nowrap text-[#7042d2] transition-colors hover:bg-[#7042d2] hover:text-white md:flex"
        >
          Book a Demo
          <ArrowIcon />
        </a>

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
                onClick={() => setOpen(false)}
                className="py-2 transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book-a-demo"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 border-[0.6px] border-solid border-[#7042d2] p-4 text-[18px] font-medium tracking-[-0.03em] text-[#7042d2]"
            >
              Book a Demo
              <ArrowIcon />
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  )
}
