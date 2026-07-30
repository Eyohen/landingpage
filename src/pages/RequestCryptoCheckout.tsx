import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import {
  SalesForm,
  SalesHero,
  SalesPageShell,
} from '@/components/inner/SalesShell'
import {
  ConsentCheckbox,
  LabeledSelect,
  LabeledTextarea,
  UnderlineInput,
} from '@/components/inner/form'
import { usePageMeta } from '@/lib/usePageMeta'
import tickIcon from '@/assets/figma/inner/icon-tick.svg'
import shoppingBagIcon from '@/assets/figma/inner/icon-shopping-bag.svg'
import auditIcon from '@/assets/figma/inner/icon-audit.svg'
import megaphoneIcon from '@/assets/figma/inner/icon-megaphone.svg'

/**
 * Figma frames 1853:3045 ("Request crypto checkout") and 1108:3059
 * (success state). Consumers tell us which business they want to pay with
 * crypto; enough requests become a demand signal we take to that business.
 */

const HOW_IT_WORKS = [
  {
    icon: shoppingBagIcon,
    title: 'Request a business',
    body: 'Share the business name, website, category and market where you want to pay with crypto.',
  },
  {
    icon: auditIcon,
    title: 'We review demand',
    body: 'We look for repeated requests, strong customer intent and businesses that fit Stablezact.',
  },
  {
    icon: megaphoneIcon,
    title: 'We reach out',
    body: 'When there is a good fit, we approach the business with evidence that customers want crypto checkout.',
  },
]

const SIDEBAR_POINTS = [
  'We check the business and market fit.',
  'We combine similar customer requests.',
  'We approach good-fit businesses with the demand signal.',
]

const CATEGORIES = [
  'Retail & consumer goods',
  'Restaurants & hospitality',
  'Travel',
  'Digital goods & subscriptions',
  'Entertainment & events',
  'Other',
]

const PAY_LOCATIONS = ['Online', 'In store', 'Both']
const FREQUENCIES = ['One-time', 'Monthly', 'Frequently']

function SuccessCard({ onReset }: { onReset: () => void }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Request crypto checkout — Stablezact', url })
        return
      } catch {
        /* fall through to clipboard on cancel/unsupported */
      }
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="container-1200 pb-[110px] pt-14 max-md:pb-[64px]">
      <div className="mx-auto flex max-w-[900px] flex-col gap-6 rounded-[18px] border border-[#e5e5e5] bg-white p-12 text-center max-md:p-6">
        <span aria-hidden="true" className="text-[70px] font-bold leading-none text-[#148c54]">
          ✓
        </span>
        <h2 className="text-[44px] font-bold tracking-[-0.02em] text-[#090909] max-md:text-[30px]">
          Thanks. We&rsquo;ve received your request.
        </h2>
        <p className="mx-auto max-w-[600px] text-[18px] leading-[1.55] text-[#5c5c5c]">
          If enough customers request crypto checkout from this business, we may
          reach out and show that there is demand.
        </p>
        <p className="mx-auto max-w-[600px] text-[15px] leading-[1.55] text-[#5c5c5c]">
          Want to speed things up? Share this page with others who want to pay
          the same business with crypto.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 bg-[#090909] px-4 py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-80"
          >
            {copied ? 'Link copied!' : 'Share this request'} <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 border border-[#090909] bg-white px-4 py-4 text-[16px] font-semibold text-[#090909] transition-colors hover:bg-[#f2f2f2]"
          >
            Request another business <span aria-hidden="true">→</span>
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-[#090909] bg-white px-4 py-4 text-[16px] font-semibold text-[#090909] transition-colors hover:bg-[#f2f2f2]"
          >
            Back to Stablezact <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function RequestCryptoCheckout() {
  usePageMeta(
    'Request Crypto Checkout — Stablezact',
    'Tell us where you want to pay with crypto. Each request helps us show businesses that customer demand already exists.',
  )
  const [formKey, setFormKey] = useState(0)

  return (
    <SalesPageShell>
      <SalesHero
        eyebrow="REQUEST CRYPTO CHECKOUT"
        title="Tell us where you want to pay with crypto."
        compact
        sub="Name the business you wish accepted crypto. Each request helps us show where customer demand already exists."
      />

      <div key={formKey}>
        <SalesForm
          formKind="request-crypto-checkout"
          mailSubject="Crypto checkout request — Stablezact"
          submitLabel="Submit Request"
          footnote="Fields marked * are required."
          successContent={<SuccessCard onReset={() => setFormKey((k) => k + 1)} />}
          sidebar={
            <div className="flex w-[300px] shrink-0 flex-col gap-6 max-lg:w-full">
              <div className="flex flex-col gap-3">
                <h2 className="font-[family-name:var(--font-geist)] text-[36px] font-medium leading-[1.15] tracking-[-0.03em] text-black max-md:text-[28px]">
                  Tell us about the business
                </h2>
                <p className="text-[14px] leading-[1.55] tracking-[-0.01em] text-[#6c6c6c]">
                  Fields marked * are required.
                </p>
              </div>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {SIDEBAR_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <img
                      src={tickIcon}
                      alt=""
                      aria-hidden="true"
                      className="mt-0.5 size-[16px]"
                    />
                    <span className="text-[14px] leading-[1.5] tracking-[-0.01em] text-[#3c3c3c]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-sm:grid-cols-1">
            <UnderlineInput name="Business name" label="Business or merchant name" required />
            <UnderlineInput name="Website or app" label="Website or app" required />
            <LabeledSelect
              name="Business category"
              label="Business category"
              placeholder="Select a category"
              options={CATEGORIES}
              required
            />
            <UnderlineInput name="Country or region" label="Country or region" required />
            <LabeledSelect
              name="Where to pay"
              label="Where do you want to pay?"
              placeholder="Online, in store or both"
              options={PAY_LOCATIONS}
              required
            />
            <UnderlineInput name="Your email" label="Your email" type="email" required />
          </div>
          <LabeledTextarea
            name="Why"
            label="What would you purchase?"
            placeholder="Tell us what you want to purchase and why paying with crypto would help."
          />
          <div className="grid grid-cols-3 gap-x-8 gap-y-7 max-sm:grid-cols-1">
            <LabeledSelect
              name="Frequency"
              label="How often would you pay?"
              placeholder="One-time, monthly or frequently"
              options={FREQUENCIES}
              required
            />
            <UnderlineInput name="Preferred network" label="Preferred network (optional)" />
            <UnderlineInput name="Preferred wallet or token" label="Preferred wallet or token (optional)" />
          </div>
          <ConsentCheckbox />
        </SalesForm>
      </div>

      {/* How it works */}
      <section className="relative isolate overflow-hidden bg-[#f5f5f5] pb-[110px] max-md:pb-[64px]">
        <div className="container-1200 flex flex-col gap-9">
          <Reveal className="flex flex-col gap-3">
            <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
            <h2 className="max-w-[600px] font-[family-name:var(--font-geist)] text-[40px] font-medium leading-[1.15] tracking-[-0.05em] text-[#090909] max-md:text-[28px]">
              Your request becomes a real demand signal
            </h2>
            <p className="max-w-[560px] text-[16px] leading-[1.5] tracking-[-0.02em] text-[var(--color-muted)]">
              Businesses often need proof that customers want a new payment
              option. Each request helps us show where that demand already
              exists.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-3 gap-[10px] max-lg:grid-cols-1">
            {HOW_IT_WORKS.map((step, i) => (
              <RevealItem key={step.title} className="h-full">
                <div className="flex h-full flex-col justify-between gap-8 rounded-[18px] border border-[#e5e5e5] bg-white p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <img src={step.icon} alt="" aria-hidden="true" className="size-[24px]" />
                      <h3 className="font-[family-name:var(--font-bricolage)] text-[20px] font-semibold leading-[1.2] tracking-[-0.036em] text-[#0a0a0a]">
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-[20px] font-semibold text-[#e5e5e5]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-[16px] leading-[1.5] tracking-[-0.0375em] text-[var(--color-muted)]">
                    {step.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </SalesPageShell>
  )
}
