import { Navbar } from '@/components/Navbar'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { ClosingCTA } from '@/sections/ClosingCTA'

const CONTACT_OPTIONS = [
  {
    label: 'Sales',
    title: 'Talk to our team',
    body: 'For partnership, merchant onboarding, and product questions.',
    href: '/contact-us',
    action: 'Contact us',
  },
  {
    label: 'Demo',
    title: 'Book a guided demo',
    body: 'See how Stablezact fits into your checkout and settlement flow.',
    href: '/book-a-demo',
    action: 'Book a Demo',
  },
] as const

export function Contact() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="relative isolate overflow-hidden pt-[150px] max-md:pt-[120px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(248,244,255,0.78)_46%,rgba(255,241,247,0.78)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[96px] -z-10 h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(112,66,210,0.16)] blur-[120px]" />

        <section className="container-1200 pb-[120px] max-lg:pb-[80px]">
          <div className="mx-auto max-w-[920px]">
            <div className="max-w-[720px]">
              <SectionEyebrow>CONTACT</SectionEyebrow>
              <h1 className="mt-7 text-[64px] font-medium leading-[0.98] tracking-[-0.06em] text-[#070711] max-lg:text-[48px] max-md:text-[40px]">
                Let&apos;s talk about stablecoin checkout.
              </h1>
              <p className="mt-6 max-w-[620px] text-[20px] leading-[1.5] tracking-[-0.035em] text-[#737373] max-md:text-[17px]">
                Reach out to discuss integrations, partnerships, or product
                questions. We&apos;ll route your message to the right person.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
              {CONTACT_OPTIONS.map((option) => (
                <a
                  key={option.label}
                  href={option.href}
                  className="group flex min-h-[260px] flex-col justify-between rounded-[18px] border border-[#ece8f6] bg-white p-6 shadow-[0_30px_90px_rgba(112,66,210,0.08)] transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="font-mono text-[14px] font-medium uppercase tracking-[0.04em] text-[var(--color-accent)]">
                    [{option.label}]
                  </span>
                  <div>
                    <h2 className="text-[28px] font-medium tracking-[-0.05em] text-black">
                      {option.title}
                    </h2>
                    <p className="mt-3 text-[17px] leading-[1.5] tracking-[-0.035em] text-[#737373]">
                      {option.body}
                    </p>
                    <span className="mt-8 inline-flex rounded-[10px] bg-[var(--color-purple)] px-4 py-3 text-[16px] font-medium text-white transition-colors group-hover:bg-[var(--color-purple-bright)]">
                      {option.action}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ClosingCTA />
    </div>
  )
}
