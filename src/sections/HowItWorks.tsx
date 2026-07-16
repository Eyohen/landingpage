import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/motion/Reveal'
import step1 from '@/assets/figma/hiw-step-1.png'
import step2 from '@/assets/figma/hiw-step-2.png'
import step3 from '@/assets/figma/hiw-step-3.png'
import step4 from '@/assets/figma/hiw-step-4.png'

/**
 * "How it works" section — dark.
 * Four step tabs that AUTO-ADVANCE (~2.6s each) with a red progress loader
 * filling under the active tab. Each step swaps the right-hand mockup image
 * and the copy. Hovering pauses the auto-advance; clicking jumps to a step.
 * Figma node 352:20146 / prototype "How it works".
 */

const EASE = [0.22, 1, 0.36, 1] as const
const STEP_MS = 2600
const MOCKUP_GRADIENT =
  'radial-gradient(circle at 6% 82%, rgba(112, 66, 210, 0.42) 0%, rgba(112, 66, 210, 0.16) 27%, transparent 52%), radial-gradient(circle at 56% 5%, rgba(199, 49, 84, 0.26) 0%, rgba(199, 49, 84, 0.12) 26%, transparent 52%), linear-gradient(135deg, #020202 0%, #080507 48%, #000000 100%)'

const STEPS = [
  {
    tab: '01. Select Crypto',
    heading: '01. User selects crypto',
    body: 'Select crypto as your payment option at checkout when you’re ready to complete your purchase. Just like selecting a card or bank transfer. Then you proceed to select a network & token.',
    image: step1,
  },
  {
    tab: '02. Preferred Wallet',
    heading: '02. Preferred Wallet',
    body: 'Choose your preferred blockchain network and complete the payment using a wallet you trust.',
    image: step2,
  },
  {
    tab: '03. Payment Validation',
    heading: '03. Payment Validation',
    body: 'Payment is automatically confirmed. We verify your payment in real time on the blockchain before settlement.',
    image: step3,
  },
  {
    tab: '04. Instant Settlement',
    heading: '04. Instant Settlement',
    body: 'Once the payment is confirmed, funds are settled immediately to the merchant in stablecoins or supported fiat.',
    image: step4,
  },
]

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  // Auto-advance continuously; hovering does NOT pause it.
  useEffect(() => {
    const t = setTimeout(() => setActive((i) => (i + 1) % STEPS.length), STEP_MS)
    return () => clearTimeout(t)
  }, [active])

  return (
    <section
      className="relative isolate overflow-hidden bg-[#080808] py-[120px] text-white max-md:py-[60px]"
    >
      {/* faint noise texture (approximated) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:3px_3px]" />

      <div className="container-1200 relative flex flex-col gap-[40px]">
        {/* heading */}
        <Reveal className="flex max-w-[658px] flex-col gap-6">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="text-[32px] font-medium leading-[1.1] tracking-[-2px] text-white max-sm:text-[24px] max-sm:tracking-[-1.2px] sm:text-[40px]">
            The complete stablecoin payment experience, simplified.
          </h2>
        </Reveal>

        {/* panel — desktop only (tabbed auto-advance carousel) */}
        <Reveal delay={0.1} className="flex w-full flex-col rounded-[18px] border border-[#1a1a1a] max-lg:hidden">
          {/* step tabs with red progress loader */}
          <div className="flex flex-col border-b border-[#1a1a1a] bg-black sm:flex-row sm:items-stretch">
            {STEPS.map((tab, i) => {
              const isActive = i === active
              return (
                <button
                  key={tab.tab}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative flex flex-1 items-center justify-center overflow-hidden px-6 py-8 text-center text-[18px] font-medium transition-colors duration-300 max-sm:px-4 max-sm:py-4 max-sm:text-[15px] ${
                    isActive
                      ? 'bg-[var(--color-purple)] text-white'
                      : 'text-[var(--color-muted)] hover:text-white'
                  }`}
                >
                  {tab.tab}
                  {/* red progress loader under the active tab */}
                  {isActive && (
                    <motion.span
                      key={active}
                      className="absolute bottom-0 left-0 h-[4px] bg-[var(--color-accent)]"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* content: mockup + copy */}
          <div className="flex flex-col items-stretch lg:flex-row">
            {/* left: step mockup (swaps per step) */}
            <div
              className="relative flex min-h-[460px] flex-1 items-center justify-center overflow-hidden rounded-bl-[18px] bg-black px-6 py-12 max-sm:min-h-[320px] max-sm:py-8 sm:px-[70px] sm:py-[78px]"
              style={{ backgroundImage: MOCKUP_GRADIENT }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_72%,rgba(255,255,255,0.08),transparent_30%)] opacity-60" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={step.image}
                  alt={step.heading}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative z-10 block max-h-[400px] w-auto max-w-full object-contain max-sm:max-h-[260px]"
                />
              </AnimatePresence>
            </div>

            {/* right: active step copy */}
            <div className="flex flex-1 flex-col justify-between gap-10 overflow-hidden border-t border-[#1a1a1a] p-8 max-sm:gap-6 max-sm:p-3 lg:border-l lg:border-t-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-5 max-sm:gap-3"
                >
                  <h3 className="text-[24px] font-medium leading-[normal] text-white max-sm:text-[16px] max-sm:leading-[1.2]">
                    {step.heading}
                  </h3>
                  <p className="text-[16px] font-normal leading-[1.5] text-[var(--color-muted)] max-sm:text-[14px]">
                    {step.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              <a
                href="/book-a-demo"
                className="group inline-flex w-fit items-center justify-center gap-2 border-[0.6px] border-[#7042d2] p-4 text-[18px] font-medium tracking-[-0.64px] text-[#7042d2] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7042d2]/10 max-sm:p-3 max-sm:text-[15px]"
              >
                Book A Demo
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M3.75 9H14.25" stroke="#7042D2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 3.75L14.25 9L9 14.25" stroke="#7042D2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        {/* mobile — stacked cards (matches Figma mobile + prototype: image + heading + body per step) */}
        <div className="flex flex-col gap-4 lg:hidden">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.tab}
              delay={i * 0.05}
              className="flex flex-col overflow-hidden rounded-[18px] border border-[#1a1a1a] bg-black"
            >
              <div
                className="relative flex min-h-[260px] items-center justify-center overflow-hidden px-6 py-9"
                style={{ backgroundImage: MOCKUP_GRADIENT }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_72%,rgba(255,255,255,0.08),transparent_30%)] opacity-60" />
                <img
                  src={s.image}
                  alt={s.heading}
                  className="relative z-10 block max-h-[230px] w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-3 border-t border-[#1a1a1a] p-6">
                <h3 className="text-[18px] font-medium leading-[1.2] text-white">
                  {s.heading}
                </h3>
                <p className="text-[14px] font-normal leading-[1.5] text-[var(--color-muted)]">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}

          <a
            href="/book-a-demo"
            className="group mt-2 inline-flex w-fit items-center justify-center gap-2 border-[0.6px] border-[#7042d2] p-4 text-[15px] font-medium tracking-[-0.64px] text-[#7042d2] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7042d2]/10"
          >
            Book A Demo
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M3.75 9H14.25" stroke="#7042D2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 3.75L14.25 9L9 14.25" stroke="#7042D2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
