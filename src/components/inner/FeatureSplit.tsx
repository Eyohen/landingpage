import { Reveal } from '@/components/motion/Reveal'
import { CtaButton, type Cta } from '@/components/inner/CtaButton'

/**
 * Feature card — Figma "A new payment capability distributed across your
 * merchants." One white rounded card: text column (heading, body, CTA
 * bottom-left) on the left, photo filling the right half.
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
      <div className="container-1200">
        <Reveal className="flex overflow-hidden rounded-[18px] border border-[#e5e5e5] bg-white max-lg:flex-col">
          <div className="flex flex-1 flex-col justify-between gap-10 p-10 max-md:p-6">
            <div className="flex flex-col gap-4">
              <h2 className="max-w-[400px] font-[family-name:var(--font-geist)] text-[28px] font-semibold leading-[1.25] tracking-[-0.0225em] text-[#090909] max-md:text-[24px]">
                {heading}
              </h2>
              <p className="max-w-[420px] text-[15px] leading-[1.6] tracking-[-0.02em] text-[var(--color-muted)]">
                {body}
              </p>
            </div>
            {cta ? (
              <div>
                <CtaButton {...cta} variant={cta.variant ?? 'soft'} />
              </div>
            ) : null}
          </div>
          <div className="min-h-[420px] flex-[1.2] max-lg:min-h-[280px]">
            <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="size-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
