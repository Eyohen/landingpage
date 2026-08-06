import { Navbar } from '@/components/Navbar'
import { ClosingCTA } from '@/sections/ClosingCTA'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { usePageMeta } from '@/lib/usePageMeta'
import banner from '@/assets/figma/about/banner.jpg'
import cornerA from '@/assets/figma/about/corner-a.svg'
import cornerB from '@/assets/figma/about/corner-b.svg'
import iconGlobe from '@/assets/figma/about/icon-globe.svg'
import iconMoneyBag from '@/assets/figma/about/icon-money-bag.svg'
import iconApiGateway from '@/assets/figma/about/icon-api-gateway.svg'
import iconBlockchain from '@/assets/figma/about/icon-blockchain.svg'

/**
 * About page — Figma node 2050:25247 ("About page" section). Light hero with
 * photo banner, bracket-cornered stat cards, dark #1a1a1a company section
 * with four feature rows, then the shared purple CTA + footer.
 */

const STATS = [
  { label: 'Founded', value: 'In 2024' },
  { label: 'Team', value: '7+ experts' },
  { label: 'Based in', value: 'London, United Kingdom.' },
]

const FEATURES = [
  {
    icon: iconGlobe,
    num: '01',
    title: 'Global acceptance',
    body: 'Accept stablecoin payments from customers anywhere in the world, without building wallet infrastructure in-house.',
    highlight: true,
  },
  {
    icon: iconMoneyBag,
    num: '02',
    title: 'Reliable settlement',
    body: 'Fast, dependable settlement that businesses can plan around, built for production.',
  },
  {
    icon: iconApiGateway,
    num: '03',
    title: 'APIs & Plugins',
    body: 'Integrate stablecoin payments through developer-first APIs and ready-made e-commerce plugins.',
  },
  {
    icon: iconBlockchain,
    num: '04',
    title: 'Cross-border simplified',
    body: 'More value across borders on blockchain rails, without the friction of legacy correspondent banking.',
  },
]

function MonoBadge({ children }: { children: string }) {
  return (
    <div className="flex items-end gap-1 font-mono text-[18px] font-medium leading-[15.6px] text-[rgba(136,136,136,0.7)]">
      <span>[</span>
      <span>{children}</span>
      <span>]</span>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative flex flex-1 flex-col gap-3 bg-[rgba(112,66,210,0.03)] p-[30px] max-md:w-full">
      {/* corner brackets */}
      <img src={cornerA} alt="" aria-hidden="true" className="absolute left-0 top-0 size-[10px]" />
      <img src={cornerB} alt="" aria-hidden="true" className="absolute right-0 top-0 size-[10px] -scale-y-100 rotate-180" />
      <img src={cornerB} alt="" aria-hidden="true" className="absolute bottom-0 right-0 size-[10px] rotate-180" />
      <img src={cornerA} alt="" aria-hidden="true" className="absolute bottom-0 left-0 size-[10px] -scale-y-100" />
      <p className="font-[family-name:var(--font-geist)] text-[12px] font-medium tracking-[-0.2px] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="text-[16px] font-medium leading-[26px] tracking-[-0.05em] text-[#0a0a0a]">
        {value}
      </p>
    </div>
  )
}

export default function About() {
  usePageMeta(
    'About Stablezact | Stablecoin Payment Infrastructure',
    'Stablezact is a fintech infrastructure company making crypto wallets usable at checkout — for payment companies, platforms and merchants across online, mobile and in-store commerce.',
  )

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main>
        {/* Hero: eyebrow + heading + photo banner + stat cards */}
        <section className="relative isolate overflow-hidden bg-white pb-[82px] pt-[150px] max-md:pb-[56px] max-md:pt-[118px]">
          <div className="container-1200 flex flex-col gap-8">
            <Reveal className="flex flex-col gap-3">
              <SectionEyebrow>ABOUT US</SectionEyebrow>
              <h1 className="font-[family-name:var(--font-geist)] text-[40px] font-normal leading-[1.2] tracking-[-0.025em] text-[#101010] max-md:text-[28px]">
                Making Stablecoin Payments Work for Your Business
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="relative flex h-[500px] w-full flex-col justify-end gap-8 overflow-hidden rounded-[18px] p-8 max-md:h-[420px] max-md:p-5">
              <img
                src={banner}
                alt="The Stablezact team at work"
                className="absolute inset-0 size-full rounded-[18px] object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[18px] bg-white mix-blend-saturation"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[18px] bg-black/25" />
              <p className="relative max-w-[714px] font-[family-name:var(--font-geist)] text-[52px] font-medium leading-[1.2] tracking-[-0.03em] text-white max-md:text-[30px]">
                We&rsquo;re a stablecoin merchant payment infrastructure
              </p>
              <p className="relative max-w-[591px] font-[family-name:var(--font-geist)] text-[16px] font-medium leading-[1.4] tracking-[-0.0125em] text-white">
                Stablezact builds an infrastructural layer,{' '}
                <span className="text-white/60">
                  enabling e-commerce to accept stablecoins as easily as any
                  other currency or payment method.
                </span>
              </p>
            </Reveal>

            <RevealGroup className="flex gap-3 max-md:flex-col">
              {STATS.map((stat) => (
                <RevealItem key={stat.label} className="flex flex-1">
                  <StatCard {...stat} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* The company — dark section */}
        <section className="relative isolate overflow-hidden bg-[#1a1a1a] py-[160px] text-white max-md:py-[72px]">
          <div className="container-1200 flex flex-col gap-[120px] max-md:gap-16">
            <div className="flex items-start justify-between gap-10 max-lg:flex-col">
              <Reveal>
                <SectionEyebrow>THE COMPANY</SectionEyebrow>
              </Reveal>
              <Reveal delay={0.1} className="flex w-[780px] max-w-full flex-col gap-8">
                <p className="font-[family-name:var(--font-geist)] text-[30px] font-semibold leading-[40px] tracking-[-0.04em] text-white max-md:text-[22px] max-md:leading-[1.4]">
                  Stablezact is a fintech infrastructure company making
                  crypto wallets usable at checkout. The company helps
                  payment companies, payment facilitators, travel platforms,
                  e-commerce merchants, and other digital businesses accept
                  wallet-based payments across online, mobile, in-store, and
                  emerging agentic checkout experiences.
                </p>
                <p className="text-[18px] font-medium leading-[1.6] tracking-[-0.04em] text-white max-md:text-[16px]">
                  Stablezact was formerly known as Coinley. Our rebrand
                  reflects our focus on building dedicated stablecoin payment
                  infrastructure while continuing our commitment to making
                  digital payments simple, reliable, and accessible for
                  businesses worldwide.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-10">
              <Reveal className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
                <h2 className="max-w-[512px] text-[40px] font-medium leading-[52px] tracking-[-0.054em] text-white max-md:text-[28px] max-md:leading-[1.3]">
                  Infrastructure to accept and settle Stablecoin payments
                </h2>
                <a
                  href="/book-a-demo"
                  className="inline-flex shrink-0 items-center justify-center rounded-[10px] bg-[#7042d2] px-6 py-2.5 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.03em] text-white transition-colors hover:bg-[#5f32c5]"
                >
                  Book a demo
                </a>
              </Reveal>

              <RevealGroup className="flex flex-col gap-5">
                {FEATURES.map((feature) => (
                  <RevealItem key={feature.num}>
                    <div
                      className={`flex items-start gap-[30px] rounded-[20px] border p-[30px] max-md:flex-col max-md:gap-4 ${
                        feature.highlight
                          ? 'border-white/5 bg-white/[0.04]'
                          : 'border-white/10'
                      }`}
                    >
                      <img src={feature.icon} alt="" aria-hidden="true" className="size-[24px] shrink-0" />
                      <div className="flex flex-1 flex-col gap-4">
                        <h3 className="text-[20px] font-medium leading-[1] tracking-[-0.036em] text-white">
                          {feature.title}
                        </h3>
                        <p className="text-[16px] leading-[1.4] tracking-[-0.025em] text-white">
                          {feature.body}
                        </p>
                      </div>
                      <MonoBadge>{feature.num}</MonoBadge>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>
      </main>
      <ClosingCTA />
    </div>
  )
}
