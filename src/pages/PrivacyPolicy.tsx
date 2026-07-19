import { Link } from 'react-router-dom'
import { LegalLayout } from '@/components/LegalLayout'

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="6 July 2026">
      <p>
        Your privacy matters to us, and we like to keep things simple. In plain English: we collect
        very little, we <strong>don't sell your data</strong>, we only use analytics if you say yes,
        and you can change your mind at any time. Here's the detail.
      </p>

      <h2>Who we are</h2>
      <p>
        We're <strong>Stablezact FINTECH LTD</strong>, a company registered in England and Wales.
        We look after the information described here, and you can always reach us by{' '}
        <Link to="/contact">email</Link>.
      </p>

      <h2>What this covers</h2>
      <p>
        This is about our public website only. It doesn't cover the Stablezact payment product or
        merchant dashboard, which have their own terms.
      </p>

      <h2>What we collect, and why</h2>
      <h3>Basic technical info (always)</h3>
      <p>
        Like every website, our host (Azure) automatically keeps standard technical logs, such as
        your IP address, browser, and the pages you request, so the site loads properly and stays
        secure. We don't use these to identify you or follow you around the web.
      </p>
      <h3>Analytics (only if you agree)</h3>
      <p>
        If you accept analytics, we use Google Analytics and Microsoft Clarity to understand how
        people use the site, which pages are popular and what's confusing, so we can make it better.
        Clarity records anonymised on page activity, with anything you type hidden by default. We're
        not trying to identify you, and none of this runs unless you opt in. You'll find the exact
        cookies in our <Link to="/cookies">Cookie Policy</Link>.
      </p>

      <h2>The basis for all this</h2>
      <p>
        We use analytics only with your consent, and you can withdraw it whenever you like. The basic
        security logs rely on our legitimate interest in running a safe website, nothing more.
      </p>

      <h2>Who sees it</h2>
      <p>
        We never sell your data. The analytics tools are run by Google and Microsoft on our behalf,
        and some of that processing happens in the US, handled under the standard safeguards those
        companies provide (Standard Contractual Clauses and the EU and US Data Privacy Framework).
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Security logs: a short period, for security and troubleshooting.</li>
        <li>Google Analytics: up to 14 months.</li>
        <li>Microsoft Clarity: up to one year.</li>
      </ul>

      <h2>You're in control</h2>
      <p>You can always ask us to:</p>
      <ul>
        <li>show you what we hold about you;</li>
        <li>correct anything that's wrong;</li>
        <li>delete it;</li>
        <li>stop or limit how we use it; and</li>
        <li>withdraw your analytics consent at any time.</li>
      </ul>
      <p>
        Use our <Link to="/contact">email</Link> link and we'll sort it out.
      </p>

      <h2>Updates</h2>
      <p>We may refresh this page now and then; the date at the top shows when we last did.</p>

      <h2>Get in touch</h2>
      <p>
        Stablezact FINTECH LTD · <Link to="/contact">contact page</Link>
      </p>
    </LegalLayout>
  )
}
