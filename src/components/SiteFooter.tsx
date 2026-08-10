import { Link } from 'react-router-dom'
import logo from '@/assets/figma/stablezact-logo.svg'
import bgCloud from '@/assets/figma/footer-bg-cloud.svg'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { openCookieSettings } from '@/lib/consent'

/**
 * Shared site footer — Figma node 1660:25323 (inner pages) / 352:25674 (landing).
 * RESOURCES / PRODUCTS / SOLUTIONS columns, UK disclaimer, legal row.
 * Rendered inside ClosingCTA on the landing page and inside InnerFooter on
 * inner pages.
 */

interface FooterLink {
  label: string
  href: string
}

const RESOURCES: FooterLink[] = [
  { label: 'Documentation', href: 'https://docs.stablezact.com' },
  { label: 'SDKs', href: 'https://docs.stablezact.com' },
  { label: 'Newsroom', href: '/newsroom' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Contact', href: '/contact-us' },
]
const PRODUCTS: FooterLink[] = [
  { label: 'Developers', href: 'https://docs.stablezact.com' },
  { label: 'Solutions', href: '/solutions/payment-providers' },
  { label: 'Plugins', href: 'https://docs.stablezact.com' },
]
const SOLUTIONS: FooterLink[] = [
  { label: 'Payment service providers', href: '/solutions/payment-providers' },
  { label: 'E-commerce platforms', href: '/solutions/e-commerce' },
  { label: 'Enterprise merchants', href: '/solutions/enterprise-merchants' },
  { label: 'Travel companies', href: '/solutions/travel' },
  { label: 'Retail Stores', href: '/solutions/retail-pos' },
]

function FooterColumn({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[16px] font-medium tracking-[-0.32px] text-[var(--color-muted)]">
        {title}
      </p>
      {items.map((item) => {
        const external = item.href.startsWith('http')
        const anchor = item.href.startsWith('/#')
        return external || anchor ? (
          <a
            key={item.label}
            href={item.href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-[18px] font-light leading-[1.4] text-white transition-colors hover:text-[var(--color-purple-bright)] max-lg:text-[14px]"
          >
            {item.label}
          </a>
        ) : (
          <Link
            key={item.label}
            to={item.href}
            className="text-[18px] font-light leading-[1.4] text-white transition-colors hover:text-[var(--color-purple-bright)] max-lg:text-[14px]"
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-3 font-[family-name:var(--font-geist)]">
      <RevealGroup className="flex flex-col justify-between gap-12 max-lg:gap-10 lg:flex-row">
        {/* Brand */}
        <RevealItem className="flex max-w-[334px] flex-col gap-4">
          <div className="flex items-center gap-[1.6px]">
            <img src={logo} alt="" className="h-[23px] w-[20px]" aria-hidden="true" />
            <span className="text-[19.44px] font-bold tracking-[-0.78px] text-white">
              Stablezact
            </span>
          </div>
          <p className="text-[18px] leading-[1.4] text-[var(--color-muted)]">
            Crypto wallets usable at checkouts. Settle instantly in stablecoins
            or supported fiat currencies
          </p>
        </RevealItem>

        {/* Link columns */}
        <div className="flex flex-wrap gap-x-16 gap-y-10 max-lg:flex-col max-lg:gap-3 lg:flex-nowrap lg:justify-end">
          <RevealItem>
            <FooterColumn title="RESOURCES" items={RESOURCES} />
          </RevealItem>
          <RevealItem>
            <FooterColumn title="PRODUCTS" items={PRODUCTS} />
          </RevealItem>
          <RevealItem>
            <FooterColumn title="SOLUTIONS" items={SOLUTIONS} />
          </RevealItem>
        </div>
      </RevealGroup>

      {/* Disclaimer */}
      <div className="mt-3 border-t border-[var(--color-border-dark)] pt-6">
        <p className="text-[16px] font-medium tracking-[-0.32px] text-[var(--color-muted)]">
          DISCLAIMER
        </p>
        <p className="mt-4 text-[18px] font-light leading-[1.4] text-[var(--color-muted)] max-lg:text-[14px]">
          Stablezact provides non-custodial software infrastructure for crypto
          wallet payments at checkout. Stablezact does not custody funds,
          control private keys, operate as a crypto exchange, or provide
          financial, investment, legal or tax advice. Clients are responsible
          for ensuring that their use of Stablezact complies with applicable
          laws, including licensing, AML/CTF, sanctions, tax, consumer
          protection and reporting obligations. Stablezact services must not be
          used in sanctioned jurisdictions or for unlawful activity.
        </p>
      </div>

      {/* Legal + copyright */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border-dark)] pt-6 text-[14px] text-[var(--color-muted)]">
        <span>© {new Date().getFullYear()} Stablezact FINTECH LTD</span>
        <nav className="flex flex-wrap items-center gap-6">
          <Link to="/terms" className="transition-colors hover:text-white">
            Terms of Use
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/cookies" className="transition-colors hover:text-white">
            Cookie Policy
          </Link>
          <button
            type="button"
            onClick={openCookieSettings}
            className="transition-colors hover:text-white"
          >
            Cookie settings
          </button>
        </nav>
      </div>
    </footer>
  )
}

/**
 * Standalone dark footer section for inner pages (Figma node 1660:25323):
 * near-black background with the warm ring sweep, holding SiteFooter.
 */
export function InnerFooter() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-bg-dark)] py-[100px] max-lg:py-[64px]">
      <div className="pointer-events-none absolute inset-0 -scale-x-100 overflow-hidden mix-blend-screen">
        <img
          src={bgCloud}
          alt=""
          aria-hidden="true"
          className="absolute left-[-66%] top-1/2 h-[175%] w-[185%] max-w-none -translate-y-1/2 rotate-[90deg] object-cover"
        />
      </div>
      <div className="container-1200 relative">
        <SiteFooter />
      </div>
    </section>
  )
}
