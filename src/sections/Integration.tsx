import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import shopifyIcon from '@/assets/figma/shopify.png'
import woocommerceIcon from '@/assets/figma/woocommerce.png'
import restApisIcon from '@/assets/figma/rest-apis.svg'
import sdksIcon from '@/assets/figma/sdks.svg'
import documentationIcon from '@/assets/figma/documentation.svg'

/**
 * Integration section — "Connect with your existing stack seamlessly".
 * Developer-focused: 6 integration cards (Shopify, Woocommerce, REST APIs,
 * SDKs, Documentation, Cal.com). Light section on #fafafa surface.
 * Figma node 564:81969.
 */

type IntegrationCard = {
  index: string
  title: string
  description: string
  cta: string
  href?: string
  icon?: string
  iconClassName?: string
}

const cards: IntegrationCard[] = [
  {
    index: '01',
    title: 'Shopify',
    description:
      'Install in minutes with our free plugin & start accepting crypto at checkout',
    cta: 'Open plugin',
    icon: shopifyIcon,
    iconClassName: 'h-10 w-10 object-contain',
  },
  {
    index: '02',
    title: 'Woocommerce',
    description:
      'Developers love us! Use our APIs & SDKs to add Stablecoins payments to digital products.',
    cta: 'Open plugin',
    icon: woocommerceIcon,
    iconClassName: 'h-[31px] w-[50px] object-contain',
  },
  {
    index: '03',
    title: 'RESTAPIs',
    description:
      'Install in minutes with our free plugin & start accepting crypto at checkout',
    cta: 'Open plugin',
    icon: restApisIcon,
    iconClassName: 'h-[57px] w-[60px] object-contain',
  },
  {
    index: '04',
    title: 'SDKs',
    description:
      'Integrate Stablezact into existing SDKs and enjoy seamless payment experience',
    cta: 'Open plugin',
    icon: sdksIcon,
    iconClassName: 'h-[46px] w-[50px] object-contain',
  },
  {
    index: '05',
    title: 'Documentation',
    description:
      'Explore our documentation and guides to start building your first integration.',
    cta: 'Open Docs',
    href: 'https://docs.stablezact.com',
    icon: documentationIcon,
    iconClassName: 'h-[44px] w-[50px] object-contain',
  },
  {
    index: '06',
    title: 'Cal.com',
    description:
      'Let clients book sessions & pay Stablecoins, directly from your calender.',
    cta: 'Open plugin',
  },
]

function ArrowUpRight() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M7.5 16.5L16.5 7.5M16.5 7.5H9M16.5 7.5V15"
        stroke="#0a0a0a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IndexBadge({ index }: { index: string }) {
  return (
    <div className="flex items-end gap-1 font-mono text-[18px] font-medium leading-[15.6px] text-[var(--color-purple)]">
      <span>[</span>
      <span>{index}</span>
      <span>]</span>
    </div>
  )
}

function Card({ card }: { card: IntegrationCard }) {
  return (
    <div className="group flex h-full min-h-[380px] max-md:min-h-[330px] flex-col justify-between rounded-[18px] border-[0.4px] border-[var(--color-border)] bg-white p-[10px] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-purple)]/50 hover:shadow-[0_12px_30px_-12px_rgba(10,10,10,0.18)]">
      {/* Top: numbered badge */}
      <div className="flex w-full flex-1 flex-col items-start px-5 pt-5">
        <IndexBadge index={card.index} />
      </div>

      {/* Bottom: icon, text, CTA */}
      <div className="flex w-full flex-col gap-[25px]">
        {card.icon ? (
          <img src={card.icon} alt="" className={card.iconClassName} />
        ) : null}

        <div className="flex w-full flex-col gap-4">
          <h3 className="text-[20px] font-medium leading-[26px] tracking-[-0.8px] text-[#0a0a0a]">
            {card.title}
          </h3>
          <p className="text-[15px] font-normal leading-[21px] tracking-[-0.6px] text-[#0a0a0a] opacity-60">
            {card.description}
          </p>
        </div>

        <a
          href={card.href ?? '#'}
          {...(card.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="flex w-full items-center justify-between rounded-[10px] border-[0.4px] border-[var(--color-border)] bg-[var(--color-surface)] p-2 transition-colors hover:bg-[var(--color-border)]/40"
        >
          <span className="truncate text-[15px] font-medium leading-[21px] tracking-[-0.6px] text-[#0a0a0a]">
            {card.cta}
          </span>
          <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowUpRight />
          </span>
        </a>
      </div>
    </div>
  )
}

export function Integration() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)] py-[120px] max-md:py-[60px]">
      <div className="container-1200">
        <div className="flex flex-col gap-[60px] max-md:gap-20">
          {/* Header */}
          <div className="flex flex-col items-start gap-x-[60px] gap-y-8 lg:flex-row">
            <div className="shrink-0 pt-1">
              <SectionEyebrow>INTEGRATION</SectionEyebrow>
            </div>

            <div className="flex flex-col gap-[30px] max-md:gap-6">
              <Reveal as="h2" className="max-w-[510px] text-[40px] font-medium leading-[44px] tracking-[-0.055em] max-md:text-[28px] max-md:leading-[33.6px] max-md:tracking-[-0.05em]">
                <span className="text-[var(--color-muted)]">
                  Connect with your{' '}
                </span>
                <span className="text-[#090909]">
                  existing stack seamlessly
                </span>
              </Reveal>

              <Reveal as="p" delay={0.1} className="max-w-[492px] text-[16px] font-medium leading-[22.4px] tracking-[-0.04em] text-[#0a0a0a] opacity-60 max-md:font-normal max-md:leading-6">
                Integrate Stablezact into your existing payment infrastructure
                without rebuilding your workflows or changing how your business
                operates.
              </Reveal>
            </div>
          </div>

          {/* Cards grid */}
          <RevealGroup className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <RevealItem key={card.index} className="h-full">
                <Card card={card} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
