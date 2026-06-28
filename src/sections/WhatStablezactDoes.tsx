import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollRevealText } from '@/components/motion/ScrollRevealText'

/**
 * Hero / intro section — "What Stablezact does".
 * Light section: white bg, noise overlay, two purple blur glows,
 * centered 550px content column. Figma node 555:55335.
 */
export function WhatStablezactDoes() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-[180px] max-md:py-[110px]">
      {/* purple blur glows */}
      <div className="pointer-events-none absolute left-[12%] top-[120px] h-[159px] w-[171px] rounded-full bg-[var(--color-purple)] opacity-60 blur-[200px]" />
      <div className="pointer-events-none absolute right-[3%] top-[100px] h-[159px] w-[171px] rounded-full bg-[var(--color-purple)] opacity-60 blur-[200px]" />

      <div className="container-1200 relative flex justify-center">
        <div className="flex max-w-[550px] flex-col gap-6 max-md:gap-[11px]">
          <Reveal delay={0}>
            <SectionEyebrow>What Stablezact does</SectionEyebrow>
          </Reveal>

          <Reveal delay={0.1} as="h2" className="text-[30px] font-medium leading-[36px] tracking-[-0.04em] max-md:text-[32px] max-md:leading-[38.4px] max-md:tracking-[-0.05em]">
            <span className="text-black">We make crypto wallets </span>
            <span className="text-[var(--color-muted)]">usable at checkout.</span>
          </Reveal>

          <ScrollRevealText
            className="text-[24px] font-normal leading-[1.5] text-[var(--color-muted)] max-md:leading-[1.4] max-md:tracking-[-0.04em]"
            text="Stablezact abstracts blockchain complexity into simple payment infrastructure. Businesses can accept crypto payments while receiving settlement instantly in stablecoins or supported fiat currencies. No blockchain expertise required."
          />
        </div>
      </div>
    </section>
  )
}
