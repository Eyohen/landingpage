import { Reveal } from '@/components/motion/Reveal'
import { CtaButton, type Cta } from '@/components/inner/CtaButton'

/**
 * Text + image feature section — Figma node 1614 "A new payment capability
 * distributed across your merchants." Left: heading, body, CTA. Right:
 * rounded product image.
 */

export interface FeatureSplitContent {
  heading: string
  body: string
  cta?: Cta
  image: string
  imageAlt?: string
}

export function FeatureSplit({ heading, body, cta, image, imageAlt = '' }: FeatureSplitContent) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f5] py-[110px] max-md:py-[64px]">
      <div className="container-1200 flex items-center gap-12 max-lg:flex-col max-lg:gap-8">
        <Reveal className="flex flex-1 flex-col gap-5">
          <h2 className="max-w-[520px] text-[36px] font-medium leading-[1.2] tracking-[-0.045em] text-[#090909] max-md:text-[26px]">
            {heading}
          </h2>
          <p className="max-w-[540px] text-[17px] leading-[1.55] tracking-[-0.02em] text-[var(--color-muted)]">
            {body}
          </p>
          {cta ? (
            <div className="mt-2">
              <CtaButton {...cta} />
            </div>
          ) : null}
        </Reveal>
        <Reveal delay={0.12} className="flex-1">
          <img
            src={image}
            alt={imageAlt}
            className="w-full rounded-[18px] border border-[#e5e5e5] object-cover"
          />
        </Reveal>
      </div>
    </section>
  )
}
