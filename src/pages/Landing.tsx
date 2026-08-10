import { useSmoothScroll } from '@/components/motion/useSmoothScroll'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/sections/Hero'
import { WhatStablezactDoes } from '@/sections/WhatStablezactDoes'
import { HowItWorks } from '@/sections/HowItWorks'
import { Solutions } from '@/sections/Solutions'
import { WhyStablezact } from '@/sections/WhyStablezact'
import { Ecosystem } from '@/sections/Ecosystem'
import { Integration } from '@/sections/Integration'
import { CustomerStory } from '@/sections/CustomerStory'
import { SeeItInAction } from '@/sections/SeeItInAction'
import { CryptoHolders } from '@/sections/CryptoHolders'
import { ClosingCTA } from '@/sections/ClosingCTA'
import { usePageMeta } from '@/lib/usePageMeta'

export function Landing() {
  useSmoothScroll()
  // Mirrors the defaults in index.html — restores them (and reports the page
  // view) when navigating back to "/" from an inner page.
  usePageMeta(
    'Stablecoin Payment Infrastructure for Merchants | Stablezact',
    'Stablezact enables crypto wallet payments across web, mobile and in-store checkout, with merchant settlement in stablecoins or supported local currencies.',
  )
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatStablezactDoes />
        <HowItWorks />
        <Solutions />
        <WhyStablezact />
        <Ecosystem />
        <Integration />
        <CustomerStory />
        <SeeItInAction />
        <CryptoHolders />
        <ClosingCTA />
      </main>
    </>
  )
}
