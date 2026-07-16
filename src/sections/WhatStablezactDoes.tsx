import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/motion/Reveal'
import woocommerceLogo from '@/assets/figma/woocommerce.png'

const TRUSTED_COMPANIES = [
  {
    number: '01',
    name: 'Algorand',
    logo: null,
    logoClassName: '',
  },
  {
    number: '02',
    name: 'Microsoft Startups',
    logo: null,
    logoClassName: '',
  },
  {
    number: '03',
    name: 'WooCommerce',
    logo: woocommerceLogo,
    logoClassName: 'h-[22px] w-auto object-contain',
  },
] as const

/**
 * Hero / intro section — "What Stablezact does".
 * Light two-column section with a trust-card row.
 */
export function WhatStablezactDoes() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-[150px] pb-[190px] font-[family-name:var(--font-geist)] max-md:pt-[86px] max-md:pb-[120px]">
      {/* purple blur glows */}
      <div className="pointer-events-none absolute left-[12%] top-[120px] h-[159px] w-[171px] rounded-full bg-[var(--color-purple)] opacity-60 blur-[200px]" />
      <div className="pointer-events-none absolute right-[3%] top-[100px] h-[159px] w-[171px] rounded-full bg-[var(--color-purple)] opacity-60 blur-[200px]" />

      <div className="container-1200 relative grid grid-cols-[280px_minmax(0,1fr)] gap-x-[70px] max-lg:grid-cols-[220px_minmax(0,1fr)] max-lg:gap-x-10 max-md:grid-cols-1 max-md:gap-8">
        <div className="pt-[10px]">
          <Reveal delay={0}>
            <SectionEyebrow>What Stablezact does</SectionEyebrow>
          </Reveal>
        </div>

        <div className="max-w-[740px]">
          <Reveal delay={0.08} as="h2" className="max-w-[720px] text-[56px] font-medium leading-[1.05] tracking-normal text-black max-lg:text-[48px] max-md:text-[38px]">
            We make stablecoin wallets <span className="text-[#737373]">usable at product checkout</span>
          </Reveal>

          <Reveal delay={0.16} as="p" className="mt-8 max-w-[650px] text-[17px] font-normal leading-[1.55] tracking-normal text-black max-md:mt-6 max-md:text-[16px]">
            Stablezact abstracts blockchain complexity into simple payment infrastructure.
            Businesses can accept crypto payments while receiving settlement instantly in
            stablecoins or supported fiat currencies. No blockchain expertise required.
          </Reveal>

          <Reveal delay={0.24} className="mt-[92px] max-md:mt-14">
            <p className="text-[16px] leading-none tracking-normal text-[#8b8b8b]">
              Trusted by leading companies in the industry
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {TRUSTED_COMPANIES.map((company) => (
                <div
                  key={company.number}
                  className="relative flex h-[100px] min-w-0 items-center justify-center rounded-[12px] bg-white px-6 shadow-[0_18px_45px_rgba(20,20,20,0.035)]"
                >
                  <span className="absolute left-4 top-3 font-mono text-[14px] font-medium tracking-[0.04em] text-[var(--color-accent)]">
                    [{company.number}]
                  </span>
                  {company.logo ? (
                    <div className="flex flex-col items-center gap-1">
                      <img src={company.logo} alt="" className={company.logoClassName} />
                      <span className="text-[16px] font-medium leading-none tracking-normal text-black">
                        {company.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 leading-none tracking-normal text-black">
                      {company.name === 'Algorand' ? (
                        <span className="text-[26px] font-semibold tracking-[-0.04em]">
                          Algorand
                        </span>
                      ) : (
                        <>
                          <span className="grid grid-cols-2 gap-[3px]" aria-hidden="true">
                            <span className="size-[10px] bg-[#f35325]" />
                            <span className="size-[10px] bg-[#81bc06]" />
                            <span className="size-[10px] bg-[#05a6f0]" />
                            <span className="size-[10px] bg-[#ffba08]" />
                          </span>
                          <span className="text-[16px] font-medium leading-none">
                            Microsoft Startups
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
