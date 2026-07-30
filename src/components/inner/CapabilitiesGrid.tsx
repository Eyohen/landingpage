import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'

/**
 * Six-card capabilities grid — Figma node 1525:13929. Light section with a
 * centered bracketed eyebrow + two-tone heading, then two rows of three
 * numbered white cards (icon, title, oversized ghost number, body).
 */

export interface CapabilityCard {
  icon: string
  title: string
  body: string
}

export interface CapabilitiesContent {
  eyebrow?: string
  headingDark: string
  headingGray?: string
  cards: CapabilityCard[]
}

export function CapabilitiesGrid({
  eyebrow = 'CAPABILITIES',
  headingDark,
  headingGray,
  cards,
}: CapabilitiesContent) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f5] py-[110px] max-md:py-[64px]">
      <div className="container-1200 flex flex-col gap-8">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="max-w-[640px] text-[40px] font-medium leading-[1.15] tracking-[-0.04em] text-black max-md:text-[28px]">
            {headingDark}
            {headingGray ? (
              <>
                {' '}
                <span className="text-[var(--color-muted)]">{headingGray}</span>
              </>
            ) : null}
          </h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-3 gap-[10px] max-lg:grid-cols-2 max-md:grid-cols-1">
          {cards.map((card, i) => (
            <RevealItem key={card.title} className="h-full">
              <div className="flex h-full min-h-[300px] flex-col justify-between rounded-[18px] border border-[#e5e5e5] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-purple)]/50 max-md:min-h-0 max-md:gap-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex max-w-[217px] flex-col gap-2">
                    <img src={card.icon} alt="" aria-hidden="true" className="size-[24px]" />
                    <h3 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.036em] text-[#0a0a0a]">
                      {card.title}
                    </h3>
                  </div>
                  <span className="text-[20px] font-semibold leading-[1.2] tracking-[-0.036em] text-[#e5e5e5]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-[16px] leading-[1.5] tracking-[-0.0375em] text-[var(--color-muted)]">
                  {card.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
