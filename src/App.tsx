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
import { ClosingCTA } from '@/sections/ClosingCTA'

function App() {
  useSmoothScroll()
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
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
        <ClosingCTA />
      </main>
    </div>
  )
}

export default App
