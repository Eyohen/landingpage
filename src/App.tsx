import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CookieConsent } from '@/components/CookieConsent'
import { applyAnalyticsConsent } from '@/lib/analytics'
import { getConsent } from '@/lib/consent'
import { CookiePolicy } from '@/pages/CookiePolicy'
import { Landing } from '@/pages/Landing'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'

function App() {
  useEffect(() => {
    // Returning visitors: honour their stored choice on load.
    applyAnalyticsConsent(getConsent().analytics)
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}

export default App
