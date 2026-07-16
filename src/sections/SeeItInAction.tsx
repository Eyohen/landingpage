import { useState } from 'react'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'

/**
 * "See it in action" / FAQs section. Figma node 352:25576.
 * Light section: two-column layout — left column holds the bracketed eyebrow,
 * heading and a "Book a Demo" CTA card; right column is an interactive FAQ
 * accordion (first item open by default).
 */

interface Faq {
  question: string
  answer: string
}

const FAQS: Faq[] = [
  {
    question: 'Can i receive fiat instead of  crypto?',
    answer:
      'Yes. Stablezact can settle payments in supported fiat currencies or stablecoins, allowing you to receive funds in the format that best suits your business.',
  },
  {
    question: 'Which wallets are supported?',
    answer:
      'Stablezact works with all major self-custody and exchange wallets, so your customers can pay with whatever wallet they already use.',
  },
  {
    question: 'How long does settlement take?',
    answer:
      'Settlement is near-instant. Funds are confirmed on-chain and made available to you within minutes of a successful payment.',
  },
  {
    question: 'Which tokens are supported?',
    answer:
      'We support leading stablecoins and major tokens across the networks we operate on, with new assets added regularly.',
  },
  {
    question: 'Do i need blockchain expertise?',
    answer:
      'No. Stablezact abstracts away the blockchain complexity so you can accept crypto payments without any specialist knowledge.',
  },
  {
    question: 'How difficult is integration?',
    answer:
      'Integration is straightforward — drop in our SDK or call the REST API and you can be live in a single afternoon.',
  },
  {
    question: 'Can i integrate with my existing payment stack?',
    answer:
      'Absolutely. Stablezact is designed to sit alongside your current providers and plug into your existing checkout flow.',
  },
]

function PlusIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M12.001 20.0088C12.8289 20.0088 13.5 19.3377 13.5 18.5098V13.5068H18.502C19.3295 13.5068 20.0004 12.8363 20.001 12.0088C20.0015 11.1805 19.3302 10.5088 18.502 10.5088H13.5V5.50684C13.5 4.67933 12.8295 4.00835 12.002 4.00781C11.1737 4.00727 10.502 4.67857 10.502 5.50684V10.5088H5.49902C4.67114 10.5088 4 11.1799 4 12.0078C4 12.8357 4.67114 13.5068 5.49902 13.5068H10.502V18.5098C10.502 19.3377 11.1731 20.0088 12.001 20.0088Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SeeItInAction() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative isolate overflow-hidden bg-white py-[120px] max-md:py-[72px]">
      <div className="container-1200">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch">
          {/* Left column: eyebrow + heading + CTA card */}
          <div className="flex flex-col justify-between gap-12 lg:w-[475px] lg:shrink-0">
            <Reveal className="flex flex-col gap-4">
              <SectionEyebrow>FAQs</SectionEyebrow>
              <h2 className="text-[40px] font-medium leading-[44px] tracking-[-0.055em] text-black max-md:text-[28px] max-md:leading-[33.6px] max-md:tracking-[-0.05em]">
                Things you need to know,
                <br className="hidden sm:block" /> before you integrate.
              </h2>
            </Reveal>

            <Reveal
              delay={0.1}
              className="flex w-full flex-col gap-4 rounded-[18px] border-[0.4px] border-[var(--color-border)] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-purple)]/50 max-lg:hidden"
            >
              <h3 className="text-[20px] font-medium leading-[26px] tracking-[-0.04em] text-[#0a0a0a]">
                You have questions still?
              </h3>
              <p className="text-[16px] font-medium leading-[21px] tracking-[-0.0375em] text-[rgba(10,10,10,0.6)]">
                Contact us and we&apos;ll respond within a day.
              </p>
              <a
                href="/book-a-demo"
                className="group inline-flex w-fit items-center justify-center gap-2 rounded-[12px] bg-[#7041d2] px-4 py-3.5 text-[18px] font-medium tracking-[-0.035em] text-white transition-colors hover:bg-[#5f35bb]"
              >
                Book a demo
              </a>
            </Reveal>
          </div>

          {/* Right column: FAQ accordion */}
          <RevealGroup className="flex flex-1 flex-col gap-4">
            {FAQS.map((faq, i) => {
              const open = openIndex === i
              return (
                <RevealItem key={faq.question} className="w-full">
                <div
                  className="rounded-[18px] border-[0.4px] border-[var(--color-border)] bg-white px-3 py-6 transition-all duration-300 hover:border-[var(--color-purple)]/50"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span
                      className={`text-[20px] font-medium leading-[23.4px] tracking-[-0.036em] ${
                        open ? 'text-[#7042d2]' : 'text-[#0a0a0a]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <PlusIcon open={open} color={open ? '#7042d2' : '#141B34'} />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      open ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <p className="min-h-0 max-w-[590px] text-[16px] font-medium leading-[24px] tracking-[-0.0375em] text-[rgba(10,10,10,0.6)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
