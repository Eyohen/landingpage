import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CookieConsent } from '@/components/CookieConsent'
import { applyAnalyticsConsent } from '@/lib/analytics'
import { getConsent } from '@/lib/consent'
import { BookDemo } from '@/pages/BookDemo'
import { CookiePolicy } from '@/pages/CookiePolicy'
import { Landing } from '@/pages/Landing'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { TermsOfUse } from '@/pages/TermsOfUse'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

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
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/book-a-demo" element={<BookDemo />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
        </Routes>
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}

export default App
