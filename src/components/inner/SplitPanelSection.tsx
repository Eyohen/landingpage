import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'

/**
 * Two-column section — Figma node 1594:20927 family. Left column: optional
 * eyebrow, heading, optional body, and a wrap of pill chips (text pills or
 * flag/currency pills) plus a bordered count pill. Right column: a titled
 * stack of numbered bordered cards ("Integration options", "Seven
 * predictable steps").
 */

export interface PillChip {
  label: string
  /** optional small round icon (e.g. a currency flag) */
  icon?: string
  /** optional prefix glyph rendered before the label (e.g. ﹩ or ₦) */
  prefix?: string
}

export interface NumberedCard {
  title: string
  body: string
}

export interface SplitPanelContent {
  eyebrow?: string
  heading: string
  body?: string
  chips?: PillChip[]
  chipCount?: string
  panelTitle?: string
  cards?: NumberedCard[]
}

function Pill({ chip }: { chip: PillChip }) {
  return (
    <div className="flex items-center gap-2 rounded-[50px] bg-white p-4 transition-all duration-300 hover:-translate-y-0.5">
      {chip.icon ? (
        <img src={chip.icon} alt="" aria-hidden="true" className="size-[18px] rounded-full" />
      ) : null}
      {chip.prefix ? (
        <span className="text-[12px] font-medium text-[#090909]">{chip.prefix}</span>
      ) : null}
      <span className="text-[12px] font-medium tracking-[-0.025em] text-[#090909]">
        {chip.label}
      </span>
    </div>
  )
}

export function SplitPanelSection({
  eyebrow,
  heading,
  body,
  chips,
  chipCount,
  panelTitle,
  cards,
}: SplitPanelContent) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f5] py-[110px] max-md:py-[64px]">
      <div className="container-1200 flex items-start gap-8 max-lg:flex-col">
        {/* Left: heading + chips */}
        <Reveal className="flex flex-1 flex-col gap-8 lg:justify-between lg:self-stretch">
          <div className="flex flex-col gap-4">
            {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
            <h2 className="max-w-[447px] text-[30px] font-medium leading-[1.3] tracking-[-0.04em] text-black max-md:text-[24px]">
              {heading}
            </h2>
            {body ? (
              <p className="max-w-[480px] text-[16px] leading-[1.5] tracking-[-0.02em] text-[var(--color-muted)]">
                {body}
              </p>
            ) : null}
          </div>
          {chips && chips.length > 0 ? (
            <div className="flex max-w-[591px] flex-wrap gap-2">
              {chips.map((chip, i) => (
                <Pill key={`${chip.label}-${i}`} chip={chip} />
              ))}
              {chipCount ? (
                <div className="flex items-center justify-center rounded-[50px] border border-[#e5e5e5] bg-[#fafafa] p-4 text-[12px] font-medium tracking-[-0.04em] text-black">
                  {chipCount}
                </div>
              ) : null}
            </div>
          ) : null}
        </Reveal>

        {/* Right: numbered cards */}
        {cards && cards.length > 0 ? (
          <div className="flex flex-1 flex-col gap-4">
            {panelTitle ? (
              <Reveal>
                <h3 className="text-[20px] font-medium tracking-[-0.02em] text-black">
                  {panelTitle}
                </h3>
              </Reveal>
            ) : null}
            <RevealGroup className="flex flex-col gap-3">
              {cards.map((card, i) => (
                <RevealItem key={card.title}>
                  <div className="flex flex-col gap-3 rounded-[14px] border border-[#e5e5e5] bg-white p-6 transition-all duration-300 hover:border-[var(--color-purple)]/50">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-[18px] font-medium leading-[1.2] tracking-[-0.04em] text-[#0a0a0a]">
                        {card.title}
                      </h4>
                      <span className="text-[20px] font-semibold leading-[1.2] text-[#e5e5e5]">
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
        ) : null}
      </div>
    </section>
  )
}
