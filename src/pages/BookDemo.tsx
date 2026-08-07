import { CalendlyEmbed } from '@/components/CalendlyEmbed'
import { usePageMeta } from '@/lib/usePageMeta'
import { Navbar } from '@/components/Navbar'
import { ClosingCTA } from '@/sections/ClosingCTA'

const CALENDLY_URL =
  'https://calendly.com/d/dv5n-y29-hz2?hide_gdpr_banner=1&primary_color=7042d2'

const BENEFITS = [
  'Accept wallet payments across web, mobile and in-store checkout.',
  'Support 300+ wallets and 60+ blockchain networks through one integration.',
  'Settle in stablecoins or fiat while keeping the payment flow non-custodial.',
] as const

const USE_CASES = [
  'Payment companies',
  'PayFacs',
  'Marketplaces',
  'Enterprise merchants',
] as const

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[15px]" aria-hidden="true">
      <path
        d="m5 10.2 3.1 3.1L15.5 6"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4 shrink-0" aria-hidden="true">
      <rect x="4.5" y="8.5" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 8.5V6.8a3 3 0 0 1 6 0v1.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BookDemo() {
  usePageMeta(
    'Book a demo | Stablezact',
    'Book a product demo and see how Stablezact adds crypto wallet payments to your checkout with settlement in stablecoins or supported local currencies.',
  )
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#16181d]">
      <Navbar />
      <main className="relative isolate overflow-hidden pt-[150px] max-md:pt-[118px]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_11%_14%,rgba(112,66,210,0.12),transparent_29rem),radial-gradient(circle_at_88%_8%,rgba(199,49,84,0.08),transparent_25rem)]" />
        <div className="pointer-events-none absolute right-[-150px] top-[78px] -z-10 h-[510px] w-[510px] opacity-30 [background-image:radial-gradient(#b9c4dc_1.25px,transparent_1.25px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_left,#000,transparent_74%)]" />

        <section className="container-1200 mt-[-28px] pb-[120px] max-lg:mt-0 max-lg:pb-[80px]">
          <div className="grid grid-cols-[minmax(0,0.86fr)_minmax(540px,1.14fr)] items-start gap-[clamp(48px,7vw,92px)] max-lg:grid-cols-1">
            <div className="sticky top-[5px] pt-0 max-lg:static max-lg:max-w-[760px]">
              <div className="mb-6 inline-flex items-center gap-2 font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]">
                <span className="size-2 rounded-full bg-[var(--color-purple)] shadow-[0_0_0_5px_rgba(112,66,210,0.12)]" />
                Book a product demo
              </div>

              <h1 className="max-w-[620px] text-[clamp(43px,5.4vw,70px)] font-semibold leading-[0.99] tracking-[-0.058em] text-[#16181d]">
                Make crypto wallets{' '}
                <span className="text-[#737a87]">usable at checkout.</span>
              </h1>

              <p className="mt-7 max-w-[570px] text-[clamp(17px,1.45vw,20px)] leading-[1.65] tracking-[-0.015em] text-[#5d6370]">
                Tell us about your payment flow. We&apos;ll show you how Stablezact can
                add wallet payments to your checkout without taking control of customer
                or merchant funds.
              </p>

              <ul className="mt-9 grid list-none gap-[18px] p-0" aria-label="What the demo covers">
                {BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="grid grid-cols-[28px_1fr] items-start gap-[13px] text-[15px] leading-[1.55] text-[#343945]"
                  >
                    <span className="mt-px grid size-[27px] place-items-center rounded-[9px] bg-[rgba(112,66,210,0.12)] text-[var(--color-purple)]">
                      <CheckIcon />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-11 border-t border-[#e5e8ef] pt-7">
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#818795]">
                  Built for payment businesses
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {USE_CASES.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#e0e4ec] bg-white/70 px-3 py-2 text-[12px] font-semibold text-[#4a505d]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[24px] border border-[rgba(216,221,232,0.95)] bg-white shadow-[0_24px_70px_rgba(26,39,75,0.12)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,var(--color-purple),var(--color-purple-bright),var(--color-accent))] max-lg:max-w-[760px] max-md:rounded-[19px]">
              <div className="border-b border-[#e5e8ef] px-[34px] pb-6 pt-[30px] max-md:px-5 max-md:pb-5 max-md:pt-6">
                <h2 className="text-[25px] font-semibold leading-[1.25] tracking-[-0.03em]">
                  Pick a time that works for you
                </h2>
                <p className="mt-2 text-[14px] leading-[1.55] text-[#5d6370]">
                  Book a slot and our team will walk you through Stablezact.
                </p>
              </div>

              <div className="bg-white px-2 pb-3 pt-1.5 max-md:px-0 max-md:pt-0">
                <CalendlyEmbed url={CALENDLY_URL} minHeight={760} />
              </div>

              <div className="flex items-center justify-center gap-2 px-6 pb-6 text-center text-[12px] text-[#7b8290]">
                <LockIcon />
                Your information is used only to respond to your enquiry.
              </div>
            </div>
          </div>
        </section>
      </main>
      <ClosingCTA />
    </div>
  )
}
