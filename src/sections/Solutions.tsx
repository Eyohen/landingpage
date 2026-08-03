import { useState } from 'react'
import { motion } from 'motion/react'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import providersImg from '@/assets/figma/sol-providers-illustration.svg'
import facilitatorsImg from '@/assets/figma/sol-facilitators-illustration.svg'
import merchantsImg from '@/assets/figma/sol-merchants-illustration.svg'

/**
 * "Solutions" / WHO WE BUILT IT FOR section — dark.
 * Intro column (left) + a horizontal hover-accordion of 3 panels (right).
 * Hovering a panel expands it (spring with slight overshoot) to reveal its
 * image; the rotated number+label stays pinned left, the image sits to the
 * right with an x-axis gap. Bottom: three more audience cards.
 * Figma node 352:24629 / prototype "Who we built it for".
 */

const PANELS = [
  {
    num: '01',
    label: 'Providers',
    title: 'Payment Service Providers',
    image: providersImg,
  },
  {
    num: '02',
    label: 'Facilitators',
    title: 'Payment Facilitators',
    image: facilitatorsImg,
  },
  {
    num: '03',
    label: 'Merchants',
    title: 'Enterprise Merchants',
    image: merchantsImg,
  },
]

const PANEL_SUBTITLE = 'Offer crypto acceptance without blockchain infrastructure.'

const bottomCards = [
  {
    num: '04',
    title: 'E-commerce Platforms',
    body: 'Enable merchants to accept crypto with minimal integration effort.',
  },
  {
    num: '05',
    title: 'Travel Companies',
    body: 'Accept global payments without card limitations for all users & clients',
  },
  {
    num: '06',
    title: 'Retail Store & Marketplace',
    body: 'Enable QR-powered crypto checkout in stores to enable buyers pay using digital assets.',
  },
]

const SPRING = { type: 'spring', stiffness: 280, damping: 26 } as const

export function Solutions() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative isolate overflow-hidden bg-[#080808] py-[120px] text-white">
      {/* noise overlay (approximated) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22154%22%20height%3D%22154%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')] [background-size:154px_154px]" />

      {/* purple blur glow */}
      <div className="pointer-events-none absolute left-1/2 top-[20%] h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--color-purple)] opacity-25 blur-[200px]" />

      <div className="container-1200 relative flex flex-col gap-[68px]">
        {/* ---- Top row: intro + hover accordion ---- */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-[60px]">
          {/* Intro column */}
          <div className="flex w-full max-w-[360px] flex-col justify-between gap-12 lg:w-[306px] lg:shrink-0">
            <div className="flex flex-col gap-[31px]">
              <Reveal>
                <SectionEyebrow>WHO WE BUILT IT FOR</SectionEyebrow>
              </Reveal>

              <Reveal as="h2" delay={0.1} className="text-[40px] font-medium leading-[48px] tracking-[-0.05em]">
                <span className="text-[#888]">Built for modern </span>
                <span className="text-[var(--color-purple)]">payment businesses</span>
                <span className="text-white"> and merchants.</span>
              </Reveal>

              <Reveal delay={0.2}>
                <a
                  href="/book-a-demo"
                  className="group inline-flex w-fit items-center justify-center gap-2 rounded-[10px] bg-[#7042d2] px-6 py-2.5 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.03em] text-white transition-colors hover:bg-[#5f32c5]"
                >
                  Book a Demo
                </a>
              </Reveal>
            </div>

            <Reveal as="p" delay={0.3} className="text-[16px] leading-[24px] text-[#888]">
              Stablezact is designed for organizations that want to add crypto
              acceptance without rebuilding how payments already work.
            </Reveal>
          </div>

          {/* Panels: hover-accordion on desktop, stacked cards on mobile */}
          <Reveal delay={0.1} className="w-full min-w-0 lg:flex lg:flex-1">
            {/* Desktop: horizontal hover accordion */}
            <div
              className="hidden h-[700px] min-w-0 flex-1 gap-1 lg:flex"
              onMouseLeave={() => setActive(0)}
            >
              {PANELS.map((panel, i) => {
                const isActive = i === active
                return (
                  <motion.div
                    key={panel.num}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(0)}
                    onClick={() => setActive(i)}
                    animate={{ flexGrow: isActive ? 1 : 0 }}
                    transition={SPRING}
                    style={{ flexBasis: 100 }}
                    className="group relative flex min-w-[88px] cursor-pointer overflow-hidden rounded-[18px] border border-[#1a1a1a] bg-[#080808] transition-colors duration-300"
                  >
                    {/* pinned left rail: number + rotated label */}
                    <div className="flex w-[88px] shrink-0 flex-col items-center gap-3 px-5 py-6">
                      <span className="text-[32px] font-medium leading-none text-white" 
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(0deg)' }}
                      >
                        {panel.num}
                      </span>
                      <span
                        className={`mt-auto text-[32px] font-medium tracking-[-0.96px] transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-white/40'
                        }`}
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(0deg)' }}
                      >
                        {panel.label}
                      </span>
                    </div>

                    {/* expanded content: image (right, with x-gap) + title/subtitle */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex min-w-[480px] flex-1 flex-col justify-end gap-12 py-10 pl-1 pr-[29px]"
                    >
                      <div className="flex w-full items-end justify-center overflow-hidden">
                        <img
                          src={panel.image}
                          alt={panel.title}
                          className="h-[428px] w-full object-contain max-xl:h-[360px]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[30px] font-medium leading-[44px] tracking-[-0.02em] text-white">
                          {panel.title}
                        </h3>
                        <p className="text-[18px] leading-[27px] text-[#888]">
                          {PANEL_SUBTITLE}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile: stacked full-width cards (all expanded, no hover) */}
            <div className="flex w-full flex-col gap-4 lg:hidden">
              {PANELS.map((panel) => (
                <div
                  key={panel.num}
                  className="flex flex-col rounded-[18px] border border-[#1a1a1a] bg-[#080808] px-6 pb-7 pt-5"
                >
                  {/* header row: number + name */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[24px] font-medium leading-none text-white">
                      {panel.num}.
                    </span>
                    <span className="text-[18px] font-medium tracking-[-0.04em] text-white">
                      {panel.title}
                    </span>
                  </div>

                  {/* illustration */}
                  <div className="my-7 flex justify-center overflow-hidden">
                    <img
                      src={panel.image}
                      alt={panel.title}
                      className="h-[260px] w-full object-contain"
                    />
                  </div>

                  {/* title + subtitle */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[14px] font-medium leading-[22px] text-white">
                      {panel.title}
                    </h3>
                    <p className="text-[16px] leading-[24px] text-[#888]">
                      {PANEL_SUBTITLE}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---- Bottom row: three cards ---- */}
        <RevealGroup className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {bottomCards.map((card) => (
            <RevealItem key={card.num} className="h-full">
              <div className="flex h-full flex-col justify-between gap-[100px] rounded-[18px] border border-[#1a1a1a] bg-[#080808] px-6 pb-6 pt-[23px] transition-all duration-300 hover:-translate-y-1">
                <span className="text-[16px] font-medium leading-[15.6px] text-white">
                  {card.num}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[24px] font-medium leading-[28.8px] tracking-[-1.2px] text-white">
                    {card.title}
                  </h3>
                  <p className="text-[16px] leading-[24px] text-[#888]">{card.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
