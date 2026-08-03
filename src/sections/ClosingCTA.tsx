import { Link } from 'react-router-dom'
import { Reveal } from '@/components/motion/Reveal'
import { InnerFooter } from '@/components/SiteFooter'
import agreementIcon from '@/assets/figma/inner/icon-agreement.svg'
import gridBg from '@/assets/figma/inner/cta-grid.svg'

/**
 * Closing CTA + footer — Figma node 1673:461. Solid purple section with a
 * faint grid overlay, "Partnership" badge, centered white headline and two
 * CTAs (white filled + white outlined), followed by the dark site footer.
 */

export function ClosingCTA() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#7042d2] py-[140px] text-white max-md:py-[80px]">
        <img
          src={gridBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[768px] w-[1738px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70"
        />
        <Reveal className="container-1200 relative flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-1.5 rounded-[8px] border-[0.3px] border-white bg-white/10 px-2.5 py-2">
            <img src={agreementIcon} alt="" aria-hidden="true" className="size-[18px]" />
            <span className="text-[14px] font-medium text-white">Partnership</span>
          </div>
          <h2 className="max-w-[898px] text-[60px] font-medium leading-[1.12] tracking-[-0.058em] max-lg:text-[44px] max-md:text-[32px]">
            The future of payments won&rsquo;t replace cards. It will add
            stablecoin as another option
          </h2>
          <p className="max-w-[700px] font-[family-name:var(--font-geist)] text-[20px] leading-[1.5] max-md:text-[16px]">
            Stablezact makes crypto wallets usable at checkout
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/book-a-demo"
              className="inline-flex items-center justify-center rounded-[10px] bg-white px-6 py-2.5 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.03em] text-[#7042d2] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0eafd]"
            >
              Book a Demo
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-[10px] border-[0.3px] border-white px-6 py-2.5 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.03em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Contact sales
            </Link>
          </div>
        </Reveal>
      </section>
      <InnerFooter />
    </>
  )
}
