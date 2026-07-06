import { Link } from 'react-router-dom'
import logo from '@/assets/figma/stablezact-logo.svg'
import bgCloud from '@/assets/figma/footer-bg-cloud.svg'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { openCookieSettings } from '@/lib/consent'

/**
 * Closing CTA / footer section. Figma node 352:25674.
 * Dark section: near-black bg, soft purple glow above the headline,
 * centered 1200px column with headline + CTAs, then a footer with
 * RESOURCES / PRODUCTS / SOLUTIONS columns and a UK disclaimer.
 */

type FooterItem = string | { label: string; href: string }

const RESOURCES: FooterItem[] = [
  { label: 'Documentation', href: 'https://docs.stablezact.com' },
  'API Reference',
  'FAQs',
]
const PRODUCTS = ['Developers', 'Solutions', 'Plugins']
const SOLUTIONS = [
  'Payment service providers',
  'E-commerce platforms',
  'Enterprise merchants',
  'Travel companies',
  'Retail Stores',
]

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
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

function FooterColumn({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[16px] font-medium tracking-[-0.32px] text-[var(--color-muted)]">
        {title}
      </p>
      {items.map((item) => {
        const label = typeof item === 'string' ? item : item.label
        const href = typeof item === 'string' ? '#' : item.href
        const external = href.startsWith('http')
        return (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-[18px] font-light leading-[1.4] text-white transition-colors hover:text-[var(--color-purple-bright)] max-lg:text-[14px]"
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}

export function ClosingCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-bg-dark)] py-[160px] max-lg:py-[80px]">
      {/* concentric warm ring sweep (Figma "BG cloud": 3 radial-gradient circles, mix-blend-screen).
          Centre sits off the left edge so the arcs sweep concave-right through the footer, matching the prototype.
          The wrapper is mirrored on X so the rings land on the left like the reference. */}
      <div className="pointer-events-none absolute inset-0 -scale-x-100 overflow-hidden mix-blend-screen">
        <img
          src={bgCloud}
          alt=""
          aria-hidden="true"
          className="absolute left-[-66%] top-1/2 h-[175%] w-[185%] max-w-none -translate-y-1/2 rotate-[90deg] object-cover"
        />
      </div>
      {/* purple glow above the headline */}
      <div className="pointer-events-none absolute left-1/2 top-[60px] h-[200px] w-[460px] -translate-x-1/2 rounded-full bg-[var(--color-purple)] opacity-50 blur-[200px]" />
      {/* thin purple light streak under the glow */}
      <div className="pointer-events-none absolute left-1/2 top-[112px] h-[2px] w-[170px] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--color-purple-bright)] to-transparent opacity-90" />

      <div className="container-1200 relative flex flex-col gap-[210px] max-lg:gap-[96px]">
        {/* Headline + CTA */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Reveal as="h2" className="max-w-[760px] text-[32px] font-medium leading-[1.1] tracking-[-0.05em] sm:text-[40px]">
            <span className="bg-gradient-to-r from-[var(--color-purple-bright)] via-[#b88bff] to-white bg-clip-text text-transparent">
              The future of payments won&rsquo;t replace{' '}
            </span>
            <span className="text-white">
              cards. It will add stablecoin as another option
            </span>
          </Reveal>

          <Reveal as="p" delay={0.1} className="max-w-[708px] text-[18px] leading-[1.5] text-white max-sm:text-[15px] sm:text-[20px]">
            Stablezact makes crypto wallets usable at checkout.
          </Reveal>

          <Reveal delay={0.2} className="mt-2 flex flex-wrap items-center justify-center gap-3 max-sm:w-full max-sm:flex-col">
            <a
              href="#"
              className="group flex items-center justify-center gap-2 bg-[var(--color-purple)] p-4 text-[18px] font-medium tracking-[-0.64px] text-white transition-all duration-300 hover:bg-[var(--color-purple-bright)] hover:-translate-y-0.5 max-sm:w-full"
            >
              Book a Demo
            </a>
            <a
              href="#"
              className="group flex items-center justify-center gap-2 border-[0.6px] border-[var(--color-purple)] bg-[rgba(112,66,210,0.1)] p-4 text-[18px] font-medium tracking-[-0.64px] text-[var(--color-purple)] transition-all duration-300 hover:bg-[rgba(112,66,210,0.2)] hover:border-[var(--color-purple-bright)] hover:-translate-y-0.5 max-sm:w-full"
            >
              Contact Sales
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>
          </Reveal>
        </div>

        {/* Footer */}
        <footer className="flex flex-col gap-3">
          <RevealGroup className="flex flex-col justify-between gap-12 max-lg:gap-10 lg:flex-row">
            {/* Brand */}
            <RevealItem className="flex max-w-[334px] flex-col gap-4">
              <div className="flex items-center gap-[1.6px]">
                <img
                  src={logo}
                  alt=""
                  className="h-[23px] w-[20px]"
                  aria-hidden="true"
                />
                <span className="text-[19.44px] font-bold tracking-[-0.78px] text-white">
                  Stablezact
                </span>
              </div>
              <p className="text-[18px] leading-[1.4] text-[var(--color-muted)]">
                Crypto wallets usable at checkouts. Settle instantly in
                stablecoins or supported fiat currenices
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
              Stablezact provides non-custodial software infrastructure for
              crypto wallet payments at checkout. Stablezact does not custody
              funds, control private keys, operate as a crypto exchange, or
              provide financial, investment, legal or tax advice. Clients are
              responsible for ensuring that their use of Stablezact complies
              with applicable laws, including licensing, AML/CTF, sanctions,
              tax, consumer protection and reporting obligations. Stablezact
              services must not be used in sanctioned jurisdictions or for
              unlawful activity.
            </p>
          </div>

          {/* Legal + copyright */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border-dark)] pt-6 text-[14px] text-[var(--color-muted)]">
            <span>© {new Date().getFullYear()} Stablezact FINTECH LTD</span>
            <nav className="flex flex-wrap items-center gap-6">
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
      </div>
    </section>
  )
}
