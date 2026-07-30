import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/motion/Reveal'
import { CtaButton, type Cta } from '@/components/inner/CtaButton'

/**
 * Inner-page hero — Figma node 1606:21483. Light band under the navbar:
 * left column holds the bracketed eyebrow + two-tone headline, right column
 * the supporting copy and CTA buttons.
 */

export interface InnerHeroContent {
  eyebrow: string
  titleDark: string
  titleGray: string
  body: string[]
  ctas: Cta[]
}

export function InnerHero({ eyebrow, titleDark, titleGray, body, ctas }: InnerHeroContent) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f5] pb-[96px] pt-[170px] max-md:pb-[64px] max-md:pt-[128px]">
      <div className="container-1200 flex items-start gap-6 max-lg:flex-col">
        <Reveal className="flex w-[57%] flex-col gap-4 max-lg:w-full">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1 className="text-[48px] font-medium leading-[1.375] tracking-[-0.0625em] text-[#090909] max-lg:text-[40px] max-md:text-[32px]">
            {titleDark}{' '}
            <span className="text-[rgba(10,10,10,0.6)]">{titleGray}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12} className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col font-[family-name:var(--font-geist)] text-[20px] leading-[1.5] tracking-[-0.5px] text-[var(--color-muted)] max-md:text-[17px]">
            {body.map((p) => (
              <p key={p} className="m-0">
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <CtaButton key={cta.label} {...cta} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
