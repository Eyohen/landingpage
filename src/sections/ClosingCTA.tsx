import bgCloud from '@/assets/figma/footer-bg-cloud.svg'
import { Reveal } from '@/components/motion/Reveal'
import { SiteFooter } from '@/components/SiteFooter'

/**
 * Closing CTA / footer section. Figma node 352:25674.
 * Dark section: near-black bg, soft purple glow above the headline,
 * centered 1200px column with headline + CTAs, then a footer with
 * RESOURCES / PRODUCTS / SOLUTIONS columns and a UK disclaimer.
 */

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
              href="/book-a-demo"
              className="group flex items-center justify-center gap-2 bg-[var(--color-purple)] p-4 text-[18px] font-medium tracking-[-0.64px] text-white transition-all duration-300 hover:bg-[var(--color-purple-bright)] hover:-translate-y-0.5 max-sm:w-full"
            >
              Book a Demo
            </a>
            <a
              href="/contact"
              className="group flex items-center justify-center gap-2 border-[0.6px] border-[var(--color-purple)] bg-[rgba(112,66,210,0.1)] p-4 text-[18px] font-medium tracking-[-0.64px] text-[var(--color-purple)] transition-all duration-300 hover:bg-[rgba(112,66,210,0.2)] hover:border-[var(--color-purple-bright)] hover:-translate-y-0.5 max-sm:w-full"
            >
              Contact Sales
            </a>
          </Reveal>
        </div>

        {/* Footer */}
        <SiteFooter />
      </div>
    </section>
  )
}
