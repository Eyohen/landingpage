import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/motion/Reveal'
import tickIcon from '@/assets/figma/inner/icon-tick.svg'
import purpleBg from '@/assets/figma/inner/howit-purple-bg.png'

/**
 * "From merchant activation to settlement" — Figma node 1594:20791.
 * Left: white card with heading, body and a tick list of business gains.
 * Right: purple image panel holding a white "How it works" card with a
 * 2-column grid of icon steps (last step spans both columns).
 */

export interface HowItWorksStep {
  icon: string
  title: string
  body: string
}

export interface GainsHowItWorksContent {
  eyebrow?: string
  heading: string
  gainsTitle: string
  gainsBody: string
  gains: string[]
  steps: HowItWorksStep[]
}

export function GainsHowItWorks({
  eyebrow = 'HOW IT WORKS',
  heading,
  gainsTitle,
  gainsBody,
  gains,
  steps,
}: GainsHowItWorksContent) {
  const lastSpans = steps.length % 2 === 1
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f5] py-[110px] font-[family-name:var(--font-geist)] max-md:py-[64px]">
      <div className="container-1200 flex flex-col gap-[34px]">
        <Reveal className="flex flex-col gap-3">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="text-[40px] font-medium leading-[1.15] tracking-[-0.05em] text-[#090909] max-md:text-[28px]">
            {heading}
          </h2>
        </Reveal>

        <div className="flex items-stretch max-lg:flex-col">
          {/* Left: gains card */}
          <Reveal className="flex flex-1 flex-col justify-between gap-10 rounded-l-[18px] bg-white px-8 py-10 max-lg:rounded-[18px] max-lg:rounded-b-none">
            <div className="flex flex-col gap-3.5">
              <h3 className="text-[28px] font-medium tracking-[-0.03em] text-black">
                {gainsTitle}
              </h3>
              <p className="text-[15px] leading-[1.5] tracking-[-0.04em] text-[#6c6c6c]">
                {gainsBody}
              </p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 py-5">
              {gains.map((gain) => (
                <li key={gain} className="flex items-start gap-2 rounded-[8px] p-2">
                  <img
                    src={tickIcon}
                    alt=""
                    aria-hidden="true"
                    className="mt-px size-[16px]"
                  />
                  <span className="text-[14px] font-medium tracking-[-0.03em] text-black">
                    {gain}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right: purple panel with steps card */}
          <Reveal
            delay={0.12}
            className="relative flex w-[60%] items-center justify-center overflow-hidden rounded-r-[18px] max-lg:w-full max-lg:rounded-[18px] max-lg:rounded-t-none"
          >
            <img
              src={purpleBg}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
            <div className="relative w-full bg-[rgba(112,66,210,0.4)] px-[59px] py-[100px] max-lg:px-6 max-lg:py-12">
              <div className="mx-auto flex w-full max-w-[600px] flex-col gap-6 rounded-[18px] bg-white p-8 max-md:p-5">
                <h3 className="text-[24px] font-semibold tracking-[-0.03em] text-black">
                  How it works
                </h3>
                <div className="grid grid-cols-2 gap-1 max-sm:grid-cols-1">
                  {steps.map((step, i) => (
                    <div
                      key={step.title}
                      className={`flex flex-col gap-3 bg-white px-3 py-4 ${
                        lastSpans && i === steps.length - 1 ? 'col-span-2 max-sm:col-span-1' : ''
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <img
                          src={step.icon}
                          alt=""
                          aria-hidden="true"
                          className="size-[20px]"
                        />
                        <h4 className="text-[13px] font-medium tracking-[-0.045em] text-[#0a0a0a]">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-[12px] leading-[1.3] tracking-[-0.05em] text-[var(--color-muted)]">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
