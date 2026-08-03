import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { CountUp } from '@/components/motion/CountUp'

/**
 * "Customer story" section — Elitesafrica testimonial + stat cards.
 * Light section: #fafafa bg, centered 1200px column.
 * Figma node 352:25508.
 */
export function CustomerStory() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fafafa] py-[128px] max-md:py-[72px]">
      <div className="container-1200">
        <div className="flex flex-col gap-[62px]">
          <Reveal className="flex flex-col gap-5">
            <SectionEyebrow>Customer story</SectionEyebrow>
            <div className="flex items-end gap-9 max-lg:flex-col max-lg:items-start max-lg:gap-4">
              <h2 className="text-[clamp(72px,7.4vw,84px)] font-medium leading-[0.92] tracking-[-0.075em] text-black max-md:text-[46px]">
                Case study
              </h2>
              <p className="mb-2 max-w-[520px] font-[family-name:var(--font-geist)] text-[24px] font-normal leading-[1.2] tracking-[-0.04em] text-[#8f8f8f] max-md:text-[20px]">
                How Elitesafrica started
                <br />
                accepting crypto with stablezact
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-[18px] border border-[rgba(10,10,10,0.07)] bg-white p-[18px] shadow-[0_20px_70px_rgba(10,10,10,0.03)] max-md:p-4"
          >
            <div className="flex min-h-[660px] flex-col justify-between gap-10 max-md:min-h-0">
              <div className="flex items-start justify-between gap-10 px-1 pt-8 max-lg:flex-col max-lg:gap-8 max-md:pt-4">
                <p className="max-w-[780px] font-[family-name:var(--font-geist)] text-[32px] font-medium leading-[1.3] tracking-[-0.04em] text-black max-md:text-[26px]">
                  <span>
                    &ldquo;Elitesafrica integrated stablezact to accept stablecoin
                    payments for everyday services,{' '}
                  </span>
                  <span className="text-[#8f8f8f]">
                    making it easier for customers to pay.&rdquo;
                  </span>
                </p>

                <div className="flex min-h-[108px] w-[380px] shrink-0 items-center justify-between gap-5 rounded-[18px] border border-[rgba(10,10,10,0.07)] bg-[#fafafa] px-6 py-4 max-lg:w-full max-md:min-h-[96px] max-md:px-4">
                  <div className="min-w-0">
                    <p className="text-[26px] font-medium leading-none tracking-[-0.055em] text-black max-md:text-[22px]">
                      Oluwaseun
                    </p>
                    <p className="mt-2 text-[14px] font-medium leading-[1.2] tracking-[-0.035em] text-[#6f6f6f] max-md:text-[12px]">
                      Business Manager - Elitesafrica
                    </p>
                  </div>
                </div>
              </div>

              <div className="mx-1 border-t border-dashed border-[#b99bff]" />

              <RevealGroup className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
                <RevealItem>
                  <div className="flex min-h-[250px] flex-col justify-between rounded-[18px] border border-[rgba(10,10,10,0.07)] bg-[#fafafa] p-8 max-md:min-h-[190px] max-md:p-6">
                    <h3 className="font-[family-name:var(--font-geist)] text-[20px] font-semibold tracking-[-0.04em] text-black">
                      Success rate
                    </h3>
                    <div className="flex items-end justify-between gap-6">
                      <p className="max-w-[210px] text-[16px] font-medium leading-[1.4] tracking-[-0.04em] text-[rgba(10,10,10,0.6)]">
                        The customer completion rate across transactions.
                      </p>
                      <p className="shrink-0 font-[family-name:var(--font-geist)] text-[56px] font-normal leading-none tracking-[-0.07em] text-black max-md:text-[44px]">
                        <CountUp value={99} suffix="%" />
                      </p>
                    </div>
                  </div>
                </RevealItem>

                <RevealItem>
                  <div className="flex min-h-[250px] flex-col justify-between rounded-[18px] border border-[rgba(10,10,10,0.07)] bg-[#fafafa] p-8 max-md:min-h-[190px] max-md:p-6">
                    <h3 className="font-[family-name:var(--font-geist)] text-[20px] font-semibold tracking-[-0.04em] text-black">
                      Instant settlement
                    </h3>
                    <div className="flex items-end justify-between gap-6">
                      <p className="max-w-[230px] text-[16px] font-medium leading-[1.4] tracking-[-0.04em] text-[rgba(10,10,10,0.6)]">
                        Total settlement time after every transaction is less than 5 seconds
                      </p>
                      <p className="shrink-0 font-[family-name:var(--font-geist)] text-[56px] font-normal leading-none tracking-[-0.07em] text-black max-md:text-[44px]">
                        &lt;5s
                      </p>
                    </div>
                  </div>
                </RevealItem>

                <RevealItem>
                  <div className="flex min-h-[250px] flex-col justify-between rounded-[18px] bg-[#7042d2] p-8 text-white max-md:min-h-[190px] max-md:p-6">
                    <h3 className="font-[family-name:var(--font-geist)] text-[20px] font-semibold tracking-[-0.04em]">
                      Transactions
                    </h3>
                    <div className="flex items-end justify-between gap-6">
                      <p className="max-w-[250px] text-[16px] font-medium leading-[1.4] tracking-[-0.04em]">
                        Elitesafrica has processed over 1,000 transactions in days after launch.
                      </p>
                      <p className="shrink-0 font-[family-name:var(--font-geist)] text-[56px] font-normal leading-none tracking-[-0.07em] max-md:text-[44px]">
                        <CountUp value={1} suffix="k+" />
                      </p>
                    </div>
                  </div>
                </RevealItem>
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
