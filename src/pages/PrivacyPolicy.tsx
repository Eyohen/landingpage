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

      <h3>Article readership (no cookies, no opt in)</h3>
      <p>
        On blog articles we count how many times an article was opened, how far down it was read,
        how long it was open and visible, and which website linked to it. This runs on our own
        servers rather than anyone else's, and it sets no cookies and stores nothing at all in your
        browser, which is why it isn't part of the choices in the cookie banner.
      </p>
      <p>
        To tell one reader from another for a single day, we store a one way fingerprint of your IP
        address and browser, scrambled with a secret that changes every day and is then deleted.
        Once that day's secret is gone, the fingerprints can't be traced back to anyone, including
        by us. We don't record your name, your email, where you are, or anything that follows you
        from one day to the next or from one website to another. The detailed records are deleted
        after 90 days; all we keep after that is a daily count per article.
      </p>

      <h2>The basis for all this</h2>
      <p>
        We use Google Analytics and Microsoft Clarity only with your consent, and you can withdraw
        it whenever you like. The basic security logs, and the article readership counts described
        above, rely on our legitimate interest in running a safe website and understanding which of
        our articles people find useful, nothing more.
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
        <li>Article readership: detailed records for 90 days, daily counts per article after that.</li>
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
