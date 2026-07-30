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

/** Figma frame 1839:2525 — "Contact us". */

const ENQUIRY_TOPICS = [
  'General question',
  'Sales & partnerships',
  'Technical support',
  'Press & media',
  'Something else',
]

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
      <SalesForm
        formKind="contact-us"
        mailSubject="General enquiry — Stablezact"
        submitLabel="Send message"
        footnote="This form is for general enquiries. Product and integration discussions should use Book a Demo."
        sidebar={
          <FormSidebar
            title="Send us a message"
            body="Complete the form and the right team will respond. Use Book a Demo to discuss payment flows, settlement and integrations."
          />
        }
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-sm:grid-cols-1">
          <UnderlineInput name="Full name" label="Full name" required />
          <UnderlineInput name="Email" label="Email address" type="email" required />
          <UnderlineInput name="Company name" label="Company Name" />
          <LabeledSelect
            name="Enquiry topic"
            label="What is your enquiry about?"
            placeholder="Select a topic"
            options={ENQUIRY_TOPICS}
          />
        </div>
        <UnderlineInput name="Subject" label="Message subject" />
        <LabeledTextarea
          name="Message"
          label="Message"
          placeholder="Tell us how we can help you"
          required
        />
        <ConsentCheckbox />
      </SalesForm>
      <FaqSection />
    </SalesPageShell>
  )
}
