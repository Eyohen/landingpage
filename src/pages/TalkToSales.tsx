import { FaqSection } from '@/components/FaqSection'
import {
  SalesForm,
  SalesHero,
  SalesPageShell,
  FormSidebar,
} from '@/components/inner/SalesShell'
import {
  ConsentCheckbox,
  LabeledSelect,
  LabeledTextarea,
  UnderlineInput,
} from '@/components/inner/form'
import { usePageMeta } from '@/lib/usePageMeta'

/** Figma frame 1805:1819 — "Talk to sales". */

const COMPANY_TYPES = [
  'Payment service provider / PayFac',
  'E-commerce platform',
  'Enterprise merchant',
  'Travel company',
  'Retail / POS business',
  'Other',
]

const VOLUME_RANGES = [
  'Under $10k / month',
  '$10k – $100k / month',
  '$100k – $1M / month',
  'Over $1M / month',
  'Not processing yet',
]

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
      <SalesForm
        formKind="talk-to-sales"
        mailSubject="Sales enquiry — Stablezact"
        submitLabel="Contact Sales"
        footnote="We normally respond within one business day. For a product walkthrough, use Book a Demo."
        sidebar={
          <FormSidebar
            title="Requirements?"
            body="Complete the form and a member of our commercial team will get back to you."
          />
        }
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-sm:grid-cols-1">
          <UnderlineInput name="Full name" label="Full name" required />
          <UnderlineInput name="Work email" label="Work Email address" type="email" required />
          <UnderlineInput name="Company name" label="Company Name" />
          <UnderlineInput name="Company website" label="Company website" />
          <LabeledSelect
            name="Company type"
            label="Which best describes your company?"
            placeholder="Select company type"
            options={COMPANY_TYPES}
          />
          <LabeledSelect
            name="Monthly volume"
            label="Estimated monthly transaction volume"
            placeholder="Select a range"
            options={VOLUME_RANGES}
          />
        </div>
        <LabeledTextarea
          name="Message"
          label="What would you like to discuss?"
          placeholder="Tell us more about what you want to enable, the markets & settlement requirements."
          required
        />
        <ConsentCheckbox />
      </SalesForm>
      <FaqSection />
    </SalesPageShell>
  )
}
