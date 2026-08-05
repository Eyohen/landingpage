import { CalendlyEmbed } from '@/components/CalendlyEmbed'
import { FaqSection } from '@/components/FaqSection'
import {
  FormSidebar,
  SalesHero,
  SalesPageShell,
} from '@/components/inner/SalesShell'
import { Reveal } from '@/components/motion/Reveal'
import { usePageMeta } from '@/lib/usePageMeta'

/** Figma frame 1805:1819 — "Talk to sales". */

const CALENDLY_URL =
  'https://calendly.com/d/d3kq-mvj-k36?hide_gdpr_banner=1&primary_color=7042d2'

export default function TalkToSales() {
  usePageMeta(
    'Talk to Sales — Stablezact',
    'Tell us what you are looking to enable and we will connect you with the right person at Stablezact.',
  )

  return (
    <SalesPageShell>
      <SalesHero
        eyebrow="SALE ENQUIRIES"
        title="Talk to our payments team"
        sub="Tell us what you are looking to enable and we will connect you with the right person at Stablezact."
      />

      <Reveal delay={0.1} className="container-1200 pb-[110px] pt-14 max-md:pb-[64px]">
        <div className="mx-auto flex max-w-[1080px] gap-12 rounded-[18px] bg-white p-10 shadow-[0_30px_90px_rgba(20,10,40,0.06)] max-lg:flex-col max-md:gap-8 max-md:p-3">
          <FormSidebar
            title="Requirements?"
            body="Book a slot with our commercial team to discuss technical integration, merchant rollout and commercial structure."
          />
          <div className="min-w-0 flex-1">
            <CalendlyEmbed url={CALENDLY_URL} />
            <p className="mt-4 text-center text-[13px] leading-[1.5] text-[#9b9b9b]">
              We normally respond within one business day. For a product
              walkthrough, use Book a Demo.
            </p>
          </div>
        </div>
      </Reveal>

      <FaqSection />
    </SalesPageShell>
  )
}
