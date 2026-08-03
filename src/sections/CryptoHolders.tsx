import { Link } from 'react-router-dom'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import bgTexture from '@/assets/figma/crypto-holders-bg.jpg'
import grid05 from '@/assets/figma/crypto-holders-grid05.svg'
import grid11 from '@/assets/figma/crypto-holders-grid11.svg'

/**
 * "For crypto holders" — Figma node 1159:28946. Dark textured section:
 * heading left, paragraph + "Request crypto checkout" CTA right, then three
 * translucent numbered cards (Request a business / We review demand /
 * We reach out).
 */

const STEPS = [
  {
    num: '01',
    title: 'Request a business',
    body: 'Send us the business name, website and region where you want to pay with crypto.',
    overlay: grid05,
    overlayClass:
      'pointer-events-none absolute left-1/2 top-[-140px] w-[589px] max-w-none -translate-x-1/2 opacity-20',
  },
  {
    num: '02',
    title: 'We review demand',
    body: 'We look for repeated requests, strong customer intent and businesses that fit Stablezact’s sales motion.',
  },
  {
    num: '03',
    title: 'We reach out',
    body: 'When there is a good fit, we contact the business with evidence that customers want crypto checkout.',
    overlay: grid11,
    overlayClass:
      'pointer-events-none absolute left-1/2 top-[-228px] w-[476px] max-w-none -translate-x-1/2 opacity-20',
  },
]

export function CryptoHolders() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080808] py-[120px] text-white max-md:py-[72px]">
      {/* full-bleed stone texture */}
      <img
        src={bgTexture}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 size-full -scale-x-100 rotate-180 object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      <div className="container-1200 relative flex flex-col gap-6">
        {/* Heading + right-aligned intro/CTA */}
        <div className="flex flex-col gap-4">
          <Reveal>
            <SectionEyebrow>FOR CRYPTO HOLDERS</SectionEyebrow>
          </Reveal>
          <div className="flex flex-col items-end gap-4">
            <Reveal
              as="h2"
              className="w-full max-w-[527px] self-start font-[family-name:var(--font-geist)] text-[40px] font-semibold leading-[1.2] tracking-[-0.05em] text-white max-md:text-[28px]"
            >
              Want to pay with crypto somewhere? Tell us where.
            </Reveal>
            <Reveal delay={0.1} className="flex w-full max-w-[712px] flex-col items-start gap-4">
              <p className="font-[family-name:var(--font-geist)] text-[16px] leading-[1.6] tracking-[-0.03em] text-[#fafafa]">
                If there&rsquo;s a business, platform, store, travel company, or
                online service you wish accepted crypto at checkout, send us the
                details. We use these requests to identify where customers
                already want crypto payments and where Stablezact should reach
                out next.
              </p>
              <Link
                to="/request-crypto-checkout"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#7042d2] px-6 py-2.5 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.03em] text-white transition-colors hover:bg-[#5f32c5]"
              >
                Request crypto checkout <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Step cards */}
        <RevealGroup className="grid grid-cols-3 gap-2 max-lg:grid-cols-1">
          {STEPS.map((step) => (
            <RevealItem key={step.num} className="h-full">
              <div className="relative flex h-[250px] flex-col justify-between overflow-hidden rounded-[18px] bg-black/50 p-6 backdrop-blur-[2.5px] max-lg:h-auto max-lg:min-h-[210px] max-lg:gap-10">
                {step.overlay ? (
                  <img src={step.overlay} alt="" aria-hidden="true" className={step.overlayClass} />
                ) : null}
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-end gap-1 font-mono text-[18px] font-medium leading-[15.6px] text-[#7042d2]">
                    <span>[</span>
                    <span>{step.num}</span>
                    <span>]</span>
                  </div>
                  <h3 className="text-[24px] font-medium tracking-[-0.03em] text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="relative font-[family-name:var(--font-geist)] text-[16px] leading-[1.6] tracking-[-0.03em] text-[#808080]">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
