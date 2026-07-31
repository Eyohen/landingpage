import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'

/**
 * Icon-chip grid — Figma "WHERE IT FITS" / "SUITABLE FOR" sections
 * (node 1614:22163 family). Left-aligned eyebrow + heading, then two rows
 * of four white chips, each an icon + label.
 */

export interface Chip {
  icon: string
  label: string
}

export interface ChipGridContent {
  eyebrow: string
  heading: string
  chips: Chip[]
}

export function ChipGrid({ eyebrow, heading, chips }: ChipGridContent) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f5] py-[110px] max-md:py-[64px]">
      <div className="container-1200 flex flex-col gap-9">
        <Reveal className="flex flex-col gap-3">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-[family-name:var(--font-geist)] text-[40px] font-medium leading-[1.15] tracking-[-0.05em] text-[#090909] max-md:text-[28px]">
            {heading}
          </h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-4 gap-[10px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {chips.map((chip) => (
            <RevealItem key={chip.label} className="h-full">
              <div className="flex h-full items-center gap-3 rounded-[18px] border border-[#ececec] bg-white px-5 py-[30px] transition-all duration-300 hover:-translate-y-0.5 max-lg:p-5">
                <img src={chip.icon} alt="" aria-hidden="true" className="size-[20px] shrink-0" />
                <span className="whitespace-nowrap text-[16px] font-medium tracking-[-0.05em] text-[#090909] max-xl:whitespace-normal">
                  {chip.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
