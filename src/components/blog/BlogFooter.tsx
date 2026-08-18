import { Link } from 'react-router-dom'
import { Reveal } from '@/components/motion/Reveal'
import logo from '@/assets/figma/stablezact-logo-color.svg'
import bgCloud from '@/assets/figma/footer-bg-cloud.svg'
import gridBg from '@/assets/figma/inner/cta-grid.svg'
import agreementIcon from '@/assets/figma/inner/icon-agreement.svg'
import arrowTwitter from '@/assets/figma/blog/arrow-twitter.svg'
import arrowLinkedin from '@/assets/figma/blog/arrow-linkedin.svg'
import coinSolana from '@/assets/figma/blog/cta/coin-solana.png'
import coinUsdc from '@/assets/figma/blog/cta/coin-usdc.png'
import coinUsdt from '@/assets/figma/blog/cta/coin-usdt.png'
import coinPolygon from '@/assets/figma/blog/cta/coin-polygon.png'

/**
 * Closing CTA and footer for the blog section — Figma nodes 2193:71627 (CTA)
 * and 2193:71588 / 2193:71654 (footer).
 *
 * Deliberately not the site-wide ClosingCTA/SiteFooter: the blog design uses
 * different footer columns (Solutions / Developers / Company), a social row,
 * no disclaimer block, and a CTA framed by token coins. That divergence is
 * intentional per the design, so this lives as its own component rather than
 * bending the shared one.
 */

interface FooterLink {
  label: string
  href: string
}

const SOLUTIONS: FooterLink[] = [
  { label: 'Payfacs', href: '/solutions/payment-providers' },
  { label: 'Enterprise', href: '/solutions/enterprise-merchants' },
  { label: 'E-commerce', href: '/solutions/e-commerce' },
  { label: 'Travel', href: '/solutions/travel' },
  { label: 'Retails', href: '/solutions/retail-pos' },
]

const DEVELOPERS: FooterLink[] = [
  { label: 'Documentation', href: 'https://docs.stablezact.com' },
  { label: 'API', href: 'https://docs.stablezact.com' },
  { label: 'SDKs', href: 'https://docs.stablezact.com' },
  { label: 'Plugins', href: 'https://docs.stablezact.com' },
]

const COMPANY: FooterLink[] = [
  { label: 'Newsroom', href: '/newsroom' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Blog', href: '/blog' },
]

interface Social extends FooterLink {
  /** Each platform has its own arrow colour in the design. */
  arrow: string
}

const SOCIALS: Social[] = [
  { label: 'Twitter', href: 'https://x.com/stablezact', arrow: arrowTwitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/stablezact', arrow: arrowLinkedin },
]

function FooterLinkItem({ item }: { item: FooterLink }) {
  const external = item.href.startsWith('http')
  const anchor = item.href.startsWith('/#')
  const className =
    'text-[20px] font-medium leading-[26.4px] tracking-[-0.88px] text-white transition-colors hover:text-[var(--color-purple-bright)] max-lg:text-[17px]'

  return external || anchor ? (
    <a
      href={item.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={className}
    >
      {item.label}
    </a>
  ) : (
    <Link to={item.href} className={className}>
      {item.label}
    </Link>
  )
}

function Column({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div className="flex w-[228px] flex-col gap-4 max-lg:w-auto">
      <p className="text-[14px] font-medium leading-[18.2px] text-white/80">{title}</p>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <FooterLinkItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  )
}

/** Divider between social links, matching the thin rule in the design. */
function Divider() {
  return <span aria-hidden="true" className="h-[18px] w-px bg-white/25" />
}

export function BlogFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-bg-dark)] pt-[124px] max-lg:pt-[72px]">
      <div className="pointer-events-none absolute inset-0 -scale-x-100 overflow-hidden mix-blend-screen">
        <img
          src={bgCloud}
          alt=""
          aria-hidden="true"
          className="absolute left-[-66%] top-1/2 h-[175%] w-[185%] max-w-none -translate-y-1/2 rotate-[90deg] object-cover"
        />
      </div>

      <div className="container-1200 relative flex flex-col gap-[95px] max-lg:gap-12">
        {/* The CTA sits inside the footer as an inset card, so the dark
            background shows above it and down both sides. */}
        <Reveal className="relative isolate flex aspect-[1200/400] items-center justify-center overflow-hidden rounded-[16px] bg-[#7042d2] text-white max-lg:aspect-auto max-lg:py-16">
          <img
            src={gridBg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[768px] w-[1738px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70"
          />

          {/* Token coins, positioned as in the design. Hidden on small screens
              where they would crowd the message. */}
          <img
            src={coinSolana}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[5.75%] top-[-2.5%] w-[17.5%] max-lg:hidden"
          />
          <img
            src={coinUsdc}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[66.75%] top-[4.5%] w-[11.2%] max-lg:hidden"
          />
          <img
            src={coinUsdt}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[23.25%] top-[59.5%] w-[14.5%] max-lg:hidden"
          />
          <img
            src={coinPolygon}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[74.8%] top-[58.75%] w-[15.7%] max-lg:hidden"
          />

          <div className="relative flex flex-col items-center gap-3 px-6 text-center">
            <div className="flex items-center gap-1.5 rounded-[8px] border-[0.3px] border-white bg-white/10 px-2.5 py-2">
              <img src={agreementIcon} alt="" aria-hidden="true" className="size-[18px]" />
              <span className="text-[14px] font-medium text-white">Partnership</span>
            </div>
            <h2 className="max-w-[595px] text-[30px] font-medium leading-[36px] tracking-[-1.2px] max-md:text-[22px] max-md:leading-[28px]">
              This future of payments won&rsquo;t replace cards. It will add crypto as an
              another option
            </h2>
            <p className="max-w-[700px] font-geist text-[18px] leading-[1.5] text-white/80 max-md:text-[15px]">
              Stablezact makes crypto wallets usable at checkout
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Link
                to="/book-a-demo"
                className="inline-flex items-center justify-center rounded-[9px] border-[0.1px] border-black bg-white px-3 py-3 font-geist text-[13px] font-medium tracking-[-0.46px] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0eafd]"
              >
                Book a demo
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-[9px] border-[0.5px] border-white bg-white/5 px-3 py-3 font-geist text-[13px] font-medium tracking-[-0.46px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Contact sales
              </Link>
            </div>
          </div>
        </Reveal>

          <div className="flex justify-between gap-[100px] max-lg:flex-col max-lg:gap-12">
            <div className="flex max-w-[292px] flex-col gap-4">
              <div className="flex items-center gap-[4.3px]">
                <img src={logo} alt="" aria-hidden="true" className="h-[36px] w-[32px]" />
                <span className="font-geist text-[26px] tracking-[-1.04px] text-white">
                  Stablezact
                </span>
              </div>
              <p className="text-[18px] font-medium leading-[1.5] tracking-[-0.56px] text-[#888]">
                Crypto wallets usable at checkouts. settle instantly in stablecoins or
                supported fiat currencies
              </p>
            </div>

            <div className="flex gap-5 max-lg:flex-wrap max-lg:gap-x-12 max-lg:gap-y-10">
              <Column title="Solutions" items={SOLUTIONS} />
              <Column title="Developers" items={DEVELOPERS} />
              <Column title="Company" items={COMPANY} />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-9 max-md:gap-5">
              {SOCIALS.map((social, index) => (
                <div key={social.label} className="flex items-center gap-9 max-md:gap-5">
                  {index > 0 ? <Divider /> : null}
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[20px] font-medium leading-[1.5] tracking-[-0.56px] text-white transition-colors hover:text-[var(--color-purple-bright)] max-md:text-[16px]"
                  >
                    {social.label}
                    <img
                      src={social.arrow}
                      alt=""
                      aria-hidden="true"
                      className="size-[16px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-9 max-md:gap-5">
              <Link
                to="/terms"
                className="text-[20px] font-medium leading-[1.5] tracking-[-0.56px] text-[#888] transition-colors hover:text-white max-md:text-[16px]"
              >
                Terms of use
              </Link>
              <Divider />
              <Link
                to="/privacy"
                className="text-[20px] font-medium leading-[1.5] tracking-[-0.56px] text-[#888] transition-colors hover:text-white max-md:text-[16px]"
              >
                Privacy policy
              </Link>
            </div>
          </div>

          {/* Oversized wordmark anchoring the foot of the page, clipped by the
              section as in the design. */}
          <div className="relative flex items-end gap-4 overflow-hidden">
            <span
              aria-hidden="true"
              className="translate-y-[18%] select-none whitespace-nowrap font-geist text-[176px] font-medium leading-none tracking-[-6px] text-white/[0.06] max-lg:text-[104px] max-md:text-[64px]"
            >
              Stablezact
            </span>
          </div>
      </div>
    </footer>
  )
}
