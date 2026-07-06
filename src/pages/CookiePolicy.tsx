import { LegalLayout } from '@/components/LegalLayout'
import { openCookieSettings } from '@/lib/consent'

export function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" updated="6 July 2026">
      <p>
        Nothing scary here. We keep cookies to a minimum. This page explains what we use and how
        you stay in control.
      </p>

      <h2>Your choice comes first</h2>
      <p>
        We don't turn on any tracking until you say yes. The first time you visit, you decide whether
        to allow analytics, and until you do, nothing extra runs. You can change your mind whenever
        you like, using the button below or the <em>Cookie settings</em> link at the bottom of any
        page.
      </p>
      <p>
        <button
          type="button"
          onClick={openCookieSettings}
          className="rounded-[10px] bg-[var(--color-purple)] px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90">
          Manage cookie settings
        </button>
      </p>

      <h2>Remembering your choice</h2>
      <p>
        So we don't have to ask every time, we save your answer in your own browser. It stores only
        your preference, with no name and no tracking, and it never leaves your device or gets shared
        with anyone. This is the one thing we keep either way, because it's how the yes/no actually
        works.
      </p>

      <h2>Analytics, only if you say yes</h2>
      <p>
        If you allow analytics, we use two well known tools, Google Analytics and Microsoft Clarity,
        to see things like which pages are popular and where people get stuck, so we can make the site
        better. Here's exactly what they use:
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Provider</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_ga</td>
            <td>Google Analytics</td>
            <td>Tells returning visitors apart</td>
            <td>2 years</td>
          </tr>
          <tr>
            <td>_ga_&lt;id&gt;</td>
            <td>Google Analytics</td>
            <td>Keeps your visit together</td>
            <td>2 years</td>
          </tr>
          <tr>
            <td>_clck</td>
            <td>Microsoft Clarity</td>
            <td>Remembers a Clarity visitor ID</td>
            <td>1 year</td>
          </tr>
          <tr>
            <td>_clsk</td>
            <td>Microsoft Clarity</td>
            <td>Links your pages into one visit</td>
            <td>1 day</td>
          </tr>
          <tr>
            <td>CLID</td>
            <td>Microsoft Clarity</td>
            <td>Recognises your browser for Clarity</td>
            <td>1 year</td>
          </tr>
          <tr>
            <td>MUID</td>
            <td>Microsoft</td>
            <td>Recognises your browser across Microsoft services</td>
            <td>1 year</td>
          </tr>
        </tbody>
      </table>
      <p className="muted">
        The exact names and timings are set by Google and Microsoft and can change, so this shows how
        they work today.
      </p>

      <h2>Changing your mind</h2>
      <p>
        Chose "Reject all", or switched analytics off? That stops these cookies and clears any that
        were already there. You can also clear cookies yourself anytime in your browser settings.
      </p>

      <h2>Get in touch</h2>
      <p>
        Any questions, just email us at <a href="mailto:info@stablezact.com">info@stablezact.com</a>{' '}
        and we're happy to help.
      </p>
    </LegalLayout>
  )
}
