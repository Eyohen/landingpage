import { useState } from 'react'
import { FaqSection } from '@/components/FaqSection'
import {
  FormSidebar,
  SalesHero,
  SalesPageShell,
} from '@/components/inner/SalesShell'
import { Reveal } from '@/components/motion/Reveal'
import { usePageMeta } from '@/lib/usePageMeta'

const CONTACT_FORM_URL =
  'https://forms.cloud.microsoft/pages/responsepage.aspx?id=w81GV3jAtku00dFHQ-ZSdzY-OaL7aSVKtDKXkwyjIpdUMElERE44VkRGRlVFQU9ZNkpWOUpFSEwxNC4u&route=shorturl&embed=true'

const REQUIREMENTS_FORM_URL =
  'https://forms.cloud.microsoft/pages/responsepage.aspx?id=w81GV3jAtku00dFHQ-ZSdzY-OaL7aSVKtDKXkwyjIpdURElEUkpUQ0FZQktUSDRJUTZVUFZEWlBZMC4u&route=shorturl&embed=true'

type FormChoice = 'contact' | 'requirements'

const FORM_OPTIONS: Array<{
  id: FormChoice
  label: string
  title: string
  description: string
  url: string
}> = [
  {
    id: 'contact',
    label: 'Contact us',
    title: 'Send us a message',
    description:
      'Complete the form and the right person at Stablezact will follow up with you.',
    url: CONTACT_FORM_URL,
  },
  {
    id: 'requirements',
    label: 'Tell us about your requirements',
    title: 'Tell us about your requirements',
    description:
      'Share your payment, integration and settlement requirements with our team.',
    url: REQUIREMENTS_FORM_URL,
  },
]

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
  const [selectedForm, setSelectedForm] = useState<FormChoice>('contact')
  const activeForm =
    FORM_OPTIONS.find((option) => option.id === selectedForm) ?? FORM_OPTIONS[0]

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
            title={activeForm.title}
            body={activeForm.description}
          />

          <div className="min-w-0 flex-1">
            <div
              className="mb-6 grid grid-cols-2 gap-2 rounded-[14px] bg-[#f3f1f8] p-1.5 max-sm:grid-cols-1"
              role="tablist"
              aria-label="Choose a contact form"
            >
              {FORM_OPTIONS.map((option) => {
                const isSelected = option.id === selectedForm
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedForm(option.id)}
                    className={`rounded-[10px] px-4 py-3 text-[14px] font-medium transition ${
                      isSelected
                        ? 'bg-white text-[#7042d2] shadow-sm'
                        : 'text-[#6c6c6c] hover:text-black'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            <div className="overflow-hidden rounded-[14px] border border-[#e5e8ef] bg-white">
              <iframe
                key={activeForm.id}
                title={`Stablezact — ${activeForm.title}`}
                src={activeForm.url}
                width="640"
                height="760"
                frameBorder="0"
                marginWidth={0}
                marginHeight={0}
                loading="eager"
                allowFullScreen
                className="block min-h-[760px] w-full border-0 bg-white max-md:min-h-[810px]"
              />
            </div>

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
