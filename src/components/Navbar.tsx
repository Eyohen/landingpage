import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import logoUrl from '@/assets/figma/stablezact-logo-color.svg'

/**
 * Top navigation bar — Figma inner-page nav (node 1430:6683).
 * Products / Solutions / Developers / Resources / Company; Solutions,
 * Resources and Company open dropdowns. Collapses behind a hamburger on
 * mobile, where dropdown groups render as labelled link lists.
 */

interface NavChild {
  label: string
  href: string
  external?: boolean
}

interface NavItem {
  label: string
  href?: string
  external?: boolean
  children?: NavChild[]
}

const SOLUTION_LINKS: NavChild[] = [
  { label: 'Payment service providers', href: '/solutions/payment-providers' },
  { label: 'Enterprise merchants', href: '/solutions/enterprise-merchants' },
  { label: 'E-commerce platforms', href: '/solutions/e-commerce' },
  { label: 'Travel companies', href: '/solutions/travel' },
  { label: 'Retail & POS', href: '/solutions/retail-pos' },
]

const NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', children: SOLUTION_LINKS },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', href: 'https://docs.stablezact.com', external: true },
      { label: 'FAQs', href: '/#faq' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'Talk to Sales', href: '/talk-to-sales' },
      { label: 'Request Crypto Checkout', href: '/request-crypto-checkout' },
    ],
  },
]

function NavLink({
  item,
  className,
  onNavigate,
}: {
  item: NavChild
  className: string
  onNavigate?: () => void
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {item.label}
      </a>
    )
  }
  if (item.href.startsWith('/#')) {
    return (
      <a href={item.href} onClick={onNavigate} className={className}>
        {item.label}
      </a>
    )
  }
  return (
    <Link to={item.href} onClick={onNavigate} className={className}>
      {item.label}
    </Link>
  )
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // close when the route changes or on outside click / Escape
  useEffect(() => setOpen(false), [location.pathname, location.hash])
  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 whitespace-nowrap py-2 text-[#17131a] transition-opacity hover:opacity-60"
      >
        {item.label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full min-w-[240px] -translate-x-1/2 pt-2">
          <div className="flex flex-col rounded-[14px] border border-[var(--color-border)] bg-white p-2 shadow-[0_24px_60px_rgba(20,10,40,0.14)]">
            {item.children?.map((child) => (
              <NavLink
                key={child.label}
                item={child}
                onNavigate={() => setOpen(false)}
                className="rounded-[8px] px-3 py-2.5 text-[15px] text-[#17131a] transition-colors hover:bg-[var(--color-surface)]"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

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

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-7 text-[17px] font-medium tracking-[-0.01em] md:flex">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <NavLink
                key={item.label}
                item={{ label: item.label, href: item.href!, external: item.external }}
                className="whitespace-nowrap py-2 text-[#17131a] transition-opacity hover:opacity-60"
              />
            ),
          )}
          <Link
            to="/book-a-demo"
            className="ml-2 inline-flex items-center justify-center rounded-[10px] bg-[#7042d2] px-5 py-2 font-[family-name:var(--font-geist)] text-[16px] font-medium tracking-[-0.03em] text-white transition-colors hover:bg-[#5f32c5]"
          >
            Book a Demo
          </Link>
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
        <div className="max-h-[calc(100dvh-74px)] overflow-y-auto border-t border-[var(--color-border)] bg-white md:hidden">
          <nav className="container-1200 flex flex-col gap-1 py-4 text-[18px]">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="py-2">
                  <p className="pb-1 font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-[var(--color-muted)]">
                    {item.label}
                  </p>
                  <div className="flex flex-col">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.label}
                        item={child}
                        onNavigate={close}
                        className="py-2 transition-opacity hover:opacity-60"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  item={{ label: item.label, href: item.href!, external: item.external }}
                  onNavigate={close}
                  className="py-2 transition-opacity hover:opacity-60"
                />
              ),
            )}
            <Link
              to="/book-a-demo"
              onClick={close}
              className="mt-3 inline-flex w-full items-center justify-center rounded-[10px] bg-[#7042d2] px-6 py-2.5 font-[family-name:var(--font-geist)] text-[17px] font-medium tracking-[-0.03em] text-white transition-colors hover:bg-[#5f32c5]"
            >
              Book a Demo
            </Link>
          </nav>
        </div>
      )}
    </motion.header>
  )
}
