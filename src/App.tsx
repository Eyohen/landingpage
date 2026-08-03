import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CookieConsent } from '@/components/CookieConsent'
import { applyAnalyticsConsent } from '@/lib/analytics'
import { getConsent } from '@/lib/consent'
import { BookDemo } from '@/pages/BookDemo'
import { Contact } from '@/pages/Contact'
import { CookiePolicy } from '@/pages/CookiePolicy'
import { Landing } from '@/pages/Landing'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { TermsOfUse } from '@/pages/TermsOfUse'

// Inner pages are lazy-loaded so the landing bundle stays lean.
const solutions = () => import('@/pages/solutions')
const PaymentProviders = lazy(() =>
  solutions().then((m) => ({ default: m.PaymentProvidersPage })),
)
const EnterpriseMerchants = lazy(() =>
  solutions().then((m) => ({ default: m.EnterpriseMerchantsPage })),
)
const ECommerce = lazy(() => solutions().then((m) => ({ default: m.ECommercePage })))
const Travel = lazy(() => solutions().then((m) => ({ default: m.TravelPage })))
const RetailPos = lazy(() => solutions().then((m) => ({ default: m.RetailPosPage })))
const TalkToSales = lazy(() => import('@/pages/TalkToSales'))
const ContactUs = lazy(() => import('@/pages/ContactUs'))
const RequestCryptoCheckout = lazy(() => import('@/pages/RequestCryptoCheckout'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function ScrollToTop() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ block: 'start' })
      })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [hash, pathname])

  return null
}

function App() {
  useEffect(() => {
    // Returning visitors: honour their stored choice on load.
    applyAnalyticsConsent(getConsent().analytics)
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden">
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-[#f5f5f5]" />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/book-a-demo" element={<BookDemo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/solutions/payment-providers" element={<PaymentProviders />} />
            <Route path="/solutions/enterprise-merchants" element={<EnterpriseMerchants />} />
            <Route path="/solutions/e-commerce" element={<ECommerce />} />
            <Route path="/solutions/travel" element={<Travel />} />
            <Route path="/solutions/retail-pos" element={<RetailPos />} />
            <Route path="/talk-to-sales" element={<TalkToSales />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/request-crypto-checkout" element={<RequestCryptoCheckout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}

export default App
