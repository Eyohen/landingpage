import { Navbar } from '@/components/Navbar'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { ClosingCTA } from '@/sections/ClosingCTA'

const MICROSOFT_FORM_URL =
  'https://forms.microsoft.com/e/ipiQ2KRF8t'

export function BookDemo() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="relative isolate overflow-hidden pt-[150px] max-md:pt-[120px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(248,244,255,0.78)_46%,rgba(255,241,247,0.78)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[96px] -z-10 h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(112,66,210,0.16)] blur-[120px]" />

        <section className="container-1200 pb-[120px] max-lg:pb-[80px]">
          <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
            <SectionEyebrow>BOOK A DEMO</SectionEyebrow>
            <h1 className="mt-7 max-w-[760px] text-[64px] font-medium leading-[0.98] tracking-[-0.06em] text-[#070711] max-lg:text-[48px] max-md:text-[40px]">
              See how Stablezact fits into your checkout flow.
            </h1>
            <p className="mt-6 max-w-[660px] text-[20px] leading-[1.5] tracking-[-0.035em] text-[#737373] max-md:text-[17px]">
              Share a few details and our team will follow up with the right
              demo for your business.
            </p>

            <div className="mt-14 w-full overflow-hidden rounded-[18px] border border-[#ece8f6] bg-white shadow-[0_30px_90px_rgba(112,66,210,0.12)]">
              <iframe
                title="Book a Stablezact demo"
                width="640px"
                height="480px"
                src={MICROSOFT_FORM_URL}
                frameBorder="0"
                marginWidth={0}
                marginHeight={0}
                style={{ border: 'none', maxWidth: '100%', maxHeight: '100vh' }}
                allowFullScreen
                className="h-[620px] w-full max-md:h-[560px]"
              />
            </div>
          </div>
        </section>
      </main>
      <ClosingCTA />
    </div>
  )
}
