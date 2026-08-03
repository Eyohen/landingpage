import { CalendlyEmbed } from '@/components/CalendlyEmbed'
import { FaqSection } from '@/components/FaqSection'
import {
  FormSidebar,
  SalesHero,
  SalesPageShell,
} from '@/components/inner/SalesShell'
import { Reveal } from '@/components/motion/Reveal'
import { usePageMeta } from '@/lib/usePageMeta'

const CALENDLY_URL =
  'https://calendly.com/d/dv42-hbw-vsk?hide_gdpr_banner=1&primary_color=7042d2'

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4 shrink-0" aria-hidden="true">
      <rect x="4.5" y="8.5" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 8.5V6.8a3 3 0 0 1 6 0v1.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Figma frame 1839:2525 — "Contact us". */
export default function ContactUs() {
  usePageMeta(
    'Contact Us — Stablezact',
    'Send us a message and the right person at Stablezact will get back to you within one to two business days.',
  )

  return (
    <SalesPageShell>
      <SalesHero
        eyebrow="CONTACT US"
        title="We start every partnership with a conversation."
        sub="Send us a message and the right person at Stablezact will get back to you within one to two business days."
      />

      <Reveal delay={0.1} className="container-1200 pb-[110px] pt-14 max-md:pb-[64px]">
        <div className="mx-auto flex max-w-[1080px] gap-12 rounded-[18px] bg-white p-10 shadow-[0_30px_90px_rgba(20,10,40,0.06)] max-lg:flex-col max-md:p-6">
          <FormSidebar
            title="Send us a message"
            body="Book a slot below and the right person at Stablezact will speak with you. Use Book a Demo for a product walkthrough."
            showContactLink={false}
          />

          <div className="min-w-0 flex-1">
            <CalendlyEmbed url={CALENDLY_URL} />
            <div className="mt-4 flex items-center justify-center gap-2 text-center text-[12px] text-[#7b8290]">
              <LockIcon />
              Your information is used only to respond to your enquiry.
            </div>
          </div>
        </div>
      </Reveal>

      <FaqSection />
    </SalesPageShell>
  )
}
