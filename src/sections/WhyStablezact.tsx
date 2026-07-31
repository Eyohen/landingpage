import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import iconUserMultiple from '@/assets/figma/icon-user-multiple.svg'
import iconBlockchain from '@/assets/figma/icon-blockchain.svg'
import iconTickDouble from '@/assets/figma/icon-tick-double.svg'
import iconMoneyBag from '@/assets/figma/icon-money-bag.svg'
import iconBriefcase from '@/assets/figma/icon-briefcase.svg'
import iconEarth from '@/assets/figma/icon-earth.svg'

interface ValueProp {
  icon: string
  title: string
  description: string
}

const valueProps: ValueProp[] = [
  {
    icon: iconUserMultiple,
    title: 'Accept more customers',
    description: 'Enable crypto holders to pay directly.',
  },
  {
    icon: iconBlockchain,
    title: 'No blockchain headaches',
    description: 'No blockchain knowledge required.',
  },
  {
    icon: iconTickDouble,
    title: 'Instant Settlement',
    description: 'Receive Stablecoins or supported fiat currencies.',
  },
  {
    icon: iconMoneyBag,
    title: 'Non-Custodial',
    description: 'Merchants remain in control of funds.',
  },
  {
    icon: iconBriefcase,
    title: 'Enterprise Ready',
    description: 'Designed for high transaction businesses.',
  },
  {
    icon: iconEarth,
    title: 'Global',
    description: 'Accepts payments from customers worldwide.',
  },
]

/**
 * "Why Stablezact" — dark section presenting the value props in a
 * 3-column / 2-row card grid (stacks down on small screens).
 * Figma node 352:25141.
 */
export function WhyStablezact() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-bg-dark)] py-[120px] text-white max-md:py-[60px]">
      <div className="container-1200 relative flex flex-col gap-10">
        {/* heading block */}
        <Reveal className="flex max-w-[658px] flex-col gap-6">
          <SectionEyebrow>Why Stablezact?</SectionEyebrow>
          <h2 className="max-w-[626px] text-[40px] font-medium leading-[1.05] tracking-[-0.05em] text-white max-md:text-[28px] max-md:leading-[1.2]">
            Why businesses &amp; merchants trust and choose stablezact
          </h2>
        </Reveal>

        {/* value prop cards */}
        <RevealGroup className="grid grid-cols-3 gap-2 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {valueProps.map((prop) => (
            <RevealItem key={prop.title}>
              <div className="flex h-full min-h-[240px] flex-col justify-between rounded-[18px] border border-[var(--color-border-dark)] bg-[var(--color-bg-dark)] px-6 pb-6 pt-[23px] transition-all duration-300 hover:-translate-y-1 max-sm:min-h-[150px]">
                <img
                  src={prop.icon}
                  alt=""
                  className="size-6 shrink-0"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-[24px] font-medium leading-none tracking-[-0.05em] text-white max-sm:text-[16px] max-sm:leading-[1.2]">
                    {prop.title}
                  </h3>
                  <p className="text-[18px] font-normal leading-[1.4] text-[var(--color-muted)] max-sm:text-[14px]">
                    {prop.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
