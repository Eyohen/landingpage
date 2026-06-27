import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { CountUp } from '@/components/motion/CountUp'
import headIllustration from '@/assets/figma/customer-story-head.svg'
import avatarImage from '@/assets/figma/customer-story-avatar.jpg'
import tickDouble from '@/assets/figma/customer-story-tick.svg'

/**
 * "Customer story" section — Elitesafrica testimonial + stat cards.
 * Light section: #fafafa bg, centered 1200px column.
 * Figma node 352:25508.
 */
export function CustomerStory() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fafafa] py-[100px] max-md:py-[72px]">
      <div className="container-1200">
        <div className="flex flex-col gap-[40px]">
          <Reveal>
            <SectionEyebrow>Customer story</SectionEyebrow>
          </Reveal>

          <div className="flex flex-col gap-[20px]">
            {/* Testimonial card */}
            <Reveal delay={0.1} className="relative flex flex-col justify-between gap-8 max-md:gap-16 overflow-hidden rounded-[18px] border-[0.4px] border-[var(--color-border)] bg-white p-5 max-md:p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-purple)]/50 md:min-h-[276px]">
              {/* Case study badge */}
              <div className="absolute left-0 top-0 flex items-center justify-center rounded-br-[12px] border border-[rgba(229,229,238,0.33)] bg-[rgba(112,66,210,0.1)] px-3 py-2">
                <span className="text-[18px] leading-[1.4] text-[var(--color-purple)]">
                  Case study
                </span>
              </div>

              <div className="flex flex-col items-start justify-between gap-6 pt-10 md:flex-row md:gap-8">
                <p className="max-w-[802px] text-[28px] max-md:text-[24px] font-medium leading-[1.1] tracking-[-0.05em] md:text-[36px]">
                  <span className="text-black">
                    &ldquo;Elitesafrica integrated stablezact to accept stablecoin
                    payments for everyday services,{' '}
                  </span>
                  <span className="text-[var(--color-muted)]">
                    making it easier for customers to pay.&rdquo;
                  </span>
                </p>
                <img
                  src={headIllustration}
                  alt=""
                  className="size-[90px] shrink-0 max-md:hidden md:size-[120px]"
                />
              </div>

              <div className="flex items-center gap-3 max-md:flex-col-reverse max-md:items-start max-md:gap-[11px]">
                <div className="flex flex-1 flex-col justify-center gap-2 max-md:gap-[4px]">
                  <p className="text-[24px] max-md:text-[16px] font-medium leading-none tracking-[-0.05em] text-black">
                    Blessing Lisafi
                  </p>
                  <p className="text-[18px] max-md:text-[12px] leading-[1.4]">
                    <span className="text-black">Quality Analyst &amp; Sales manager</span>
                    <span className="text-[var(--color-muted)]"> - Elitesafrica</span>
                  </p>
                </div>
                <div className="size-[91px] shrink-0 overflow-hidden rounded-[8px]">
                  <img
                    src={avatarImage}
                    alt="Blessing Lisafi"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {/* Stat cards */}
            <RevealGroup className="flex flex-col gap-2 max-md:gap-4 md:flex-row md:items-stretch">
              {/* Instant settlement */}
              <RevealItem className="md:w-[389px]">
                <div className="flex h-full flex-col justify-between gap-8 rounded-[18px] border-[0.4px] border-[var(--color-border)] bg-white p-5 max-md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-purple)]/50 max-md:min-h-[200px] md:min-h-[358px]">
                  <img
                    src={tickDouble}
                    alt=""
                    className="size-[113px] max-md:size-8"
                  />
                  <div className="flex flex-col gap-2 text-[#0a0a0a]">
                    <p className="text-[20px] max-md:text-[16px] font-medium leading-[26px] tracking-[-0.04em]">
                      Instant Settlement
                    </p>
                    <p className="text-[16px] max-md:text-[14px] leading-[21px] tracking-[-0.04em]">
                      Receive Stablecoins or supported fiat currencies.
                    </p>
                  </div>
                </div>
              </RevealItem>

              {/* Success rate */}
              <RevealItem className="flex-1">
                <div className="flex h-full flex-col justify-between gap-8 rounded-[18px] border-[0.4px] border-[var(--color-border)] bg-white p-5 max-md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-purple)]/50 max-md:min-h-[200px] md:min-h-[358px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[58px] max-md:text-[32px] leading-none tracking-[-0.02em] text-black">
                      <CountUp value={96} suffix="%" />
                    </p>
                    <p className="text-[16px] max-md:text-[14px] leading-[21px] tracking-[-0.04em] text-[#0a0a0a]">
                      Be sure to always complete your transaction with stablezact.
                    </p>
                  </div>
                  <p className="text-[20px] max-md:text-[16px] font-medium leading-[26px] tracking-[-0.04em] text-[#0a0a0a]">
                    Success rate
                  </p>
                </div>
              </RevealItem>

              {/* Transactions */}
              <RevealItem className="flex-1">
                <div className="flex h-full flex-col justify-between gap-8 rounded-[18px] border-[0.4px] border-[var(--color-border)] bg-[var(--color-purple)] p-5 max-md:p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/50 max-md:min-h-[200px] md:min-h-[358px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[58px] max-md:text-[32px] leading-none tracking-[-0.02em]">
                      <CountUp value={700} suffix="+" />
                    </p>
                    <p className="text-[16px] max-md:text-[14px] leading-[21px] tracking-[-0.04em]">
                      Over 700 processed transaction in months.
                    </p>
                  </div>
                  <p className="text-[20px] max-md:text-[16px] font-medium leading-[26px] tracking-[-0.04em]">
                    Transactions
                  </p>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
