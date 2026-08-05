import { CalendlyEmbed } from '@/components/CalendlyEmbed'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { SalesHero, SalesPageShell } from '@/components/inner/SalesShell'
import { usePageMeta } from '@/lib/usePageMeta'
import tickIcon from '@/assets/figma/inner/icon-tick.svg'
import shoppingBagIcon from '@/assets/figma/inner/icon-shopping-bag.svg'
import auditIcon from '@/assets/figma/inner/icon-audit.svg'
import megaphoneIcon from '@/assets/figma/inner/icon-megaphone.svg'

/**
 * Figma frame 1853:3045 — "Request crypto checkout". Consumers tell us which
 * business they want to pay with crypto; enough requests become a demand
 * signal we take to that business.
 */

const CALENDLY_URL =
  'https://calendly.com/d/dtn6-k6s-33p?hide_gdpr_banner=1&primary_color=7042d2'

const HOW_IT_WORKS = [
  {
    icon: shoppingBagIcon,
    title: 'Request a business',
    body: 'Share the business name, website, category and market where you want to pay with crypto.',
  },
  {
    icon: auditIcon,
    title: 'We review demand',
    body: 'We look for repeated requests, strong customer intent and businesses that fit Stablezact.',
  },
  {
    icon: megaphoneIcon,
    title: 'We reach out',
    body: 'When there is a good fit, we approach the business with evidence that customers want crypto checkout.',
  },
]

const SIDEBAR_POINTS = [
  'We check the business and market fit.',
  'We combine similar customer requests.',
  'We approach good-fit businesses with the demand signal.',
]

export default function RequestCryptoCheckout() {
  usePageMeta(
    'Request Crypto Checkout — Stablezact',
    'Tell us where you want to pay with crypto. Each request helps us show businesses that customer demand already exists.',
  )

  return (
    <SalesPageShell>
      <SalesHero
        eyebrow="REQUEST CRYPTO CHECKOUT"
        title="Tell us where you want to pay with crypto."
        compact
        sub="Name the business you wish accepted crypto. Each request helps us show where customer demand already exists."
      />

      <Reveal delay={0.1} className="container-1200 pb-[110px] pt-14 max-md:pb-[64px]">
        <div className="mx-auto flex max-w-[1080px] gap-12 rounded-[18px] bg-white p-10 shadow-[0_30px_90px_rgba(20,10,40,0.06)] max-lg:flex-col max-md:gap-8 max-md:p-3">
          <div className="flex w-[300px] shrink-0 flex-col gap-6 max-lg:w-full">
            <div className="flex flex-col gap-3">
              <h2 className="font-[family-name:var(--font-geist)] text-[36px] font-medium leading-[1.15] tracking-[-0.03em] text-black max-md:text-[28px]">
                Tell us about the business
              </h2>
              <p className="text-[14px] leading-[1.55] tracking-[-0.01em] text-[#6c6c6c]">
                Book a slot and tell us where you want to pay with crypto.
              </p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {SIDEBAR_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <img src={tickIcon} alt="" aria-hidden="true" className="mt-0.5 size-[16px]" />
                  <span className="text-[14px] leading-[1.5] tracking-[-0.01em] text-[#3c3c3c]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 flex-1">
            <CalendlyEmbed url={CALENDLY_URL} />
          </div>
        </div>
      </Reveal>

      {/* How it works */}
      <section className="relative isolate overflow-hidden bg-[#f5f5f5] pb-[110px] max-md:pb-[64px]">
        <div className="container-1200 flex flex-col gap-9">
          <Reveal className="flex flex-col gap-3">
            <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
            <h2 className="max-w-[600px] font-[family-name:var(--font-geist)] text-[40px] font-medium leading-[1.15] tracking-[-0.05em] text-[#090909] max-md:text-[28px]">
              Your request becomes a real demand signal
            </h2>
            <p className="max-w-[560px] text-[16px] leading-[1.5] tracking-[-0.02em] text-[var(--color-muted)]">
              Businesses often need proof that customers want a new payment
              option. Each request helps us show where that demand already
              exists.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-3 gap-[10px] max-lg:grid-cols-1">
            {HOW_IT_WORKS.map((step, i) => (
              <RevealItem key={step.title} className="h-full">
                <div className="flex h-full flex-col justify-between gap-8 rounded-[18px] border border-[#e5e5e5] bg-white p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <img src={step.icon} alt="" aria-hidden="true" className="size-[24px]" />
                      <h3 className="font-[family-name:var(--font-bricolage)] text-[20px] font-semibold leading-[1.2] tracking-[-0.036em] text-[#0a0a0a]">
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-[20px] font-semibold text-[#e5e5e5]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-[16px] leading-[1.5] tracking-[-0.0375em] text-[var(--color-muted)]">
                    {step.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </SalesPageShell>
  )
}
