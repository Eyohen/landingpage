# Inner Pages — Design Spec

Date: 2026-07-30
Branch: `feat/inner-pages`
Figma: `Stablezact--Apps` file (key `DgcFVSnFhP2oJmNoaOFMmw`), sections "Inner pages" (1663:27740) and "Sales pages" (1862:4373)

## Goal

Implement the eight designed inner pages of the Stablezact marketing site so the
footer/nav solution links resolve to real pages and sales enquiries have styled
first-party forms.

## Scope

Eight new pages, added alongside existing pages (nothing removed):

| Route | Figma frame (node) | Type |
|---|---|---|
| `/solutions/payment-providers` | Payment Provider (1430:6679) | Solution |
| `/solutions/enterprise-merchants` | Enterprise merchants (1606:21520) | Solution |
| `/solutions/e-commerce` | E-commerce (1614:22233) | Solution |
| `/solutions/travel` | Payment Provider / "For Travel agencies" (1634:23089) | Solution |
| `/solutions/retail-pos` | Payment Provider / "For retail and POS" (1651:23979) | Solution |
| `/talk-to-sales` | Talk to sales (1805:1819) | Sales form |
| `/request-crypto-checkout` | Request crypto checkout (1853:3045) + success frame (1108:3059) | Sales form |
| `/contact-us` | Contact us (1839:2525) | Sales |

Legacy `/contact` and `/book-a-demo` remain untouched.

## Navigation

Navbar adopts the Figma inner-page nav: **Products / Solutions / Developers /
Resources / Company**.

- Solutions → dropdown listing the five solution pages
- Developers → Documentation (existing external docs link)
- Resources → dropdown: Documentation, FAQs (landing `#faq`), Contact Us
- Products → landing "How it works" section anchor
- Company → dropdown: Contact Us, Talk to Sales

Mobile menu mirrors the same structure. Dropdowns are accessible (keyboard +
`aria-expanded`), closed on route change.

## Footer

Extract the footer from `ClosingCTA.tsx` into a shared `SiteFooter` component
rendered on every page (landing keeps its current visual placement inside the
closing CTA section). Expand to the Figma three-column layout:

- RESOURCES: Documentation, SDKs, FAQs, Contact
- PRODUCTS: Developers, Solutions, Plugins
- SOLUTIONS: the five solution pages (wired to new routes)

Fix the "currenices" → "currencies" typo during extraction. Links without a
real destination yet (SDKs, Plugins) point to Documentation.

## Architecture

Approach: **section kit + data-driven solution pages.**

- `src/components/inner/` — reusable section components: `InnerHero`,
  `CapabilitiesGrid` (6-card), `SplitAccordion` (heading + expandable list),
  `ChipGrid`, `HowItWorksCard` (purple panel), `CTABanner`, plus the shared
  `SiteFooter`. All reuse existing motion primitives (`Reveal`, `RevealGroup`)
  and CSS variables/tokens.
- `src/content/solutions/*.ts` — one typed content file per solution page
  (eyebrow, headline, capability cards, section order, CTA copy).
- `src/pages/solutions/SolutionPage.tsx` — single layout that renders a
  content file's section list.
- `src/pages/TalkToSales.tsx`, `src/pages/RequestCryptoCheckout.tsx`,
  `src/pages/ContactUs.tsx` — bespoke pages using the kit.
- Landing FAQ extracted into a shared component (reused on Talk to Sales);
  fix lowercase "i" in FAQ questions while extracting.
- All new routes lazy-loaded via `React.lazy` (also addresses the current
  500 kB chunk warning).

## Copy & fidelity

- Layout/structure faithful to the 1670px Figma frames.
- Wording adapted crypto → stablecoin to match the landing page direction.
- No mobile Figma frames exist for inner pages: responsive behavior follows
  the landing page's existing `max-lg` / `max-sm` conventions.
- Icons/assets exported from Figma into `src/assets/figma/` following the
  existing naming pattern.

## Forms

- Talk to Sales and Request Crypto Checkout are styled first-party forms per
  Figma, with client-side validation and a honeypot field.
- Submission: `POST` JSON to `import.meta.env.VITE_FORMS_ENDPOINT` when set
  (add to `.env.example`); when unset, fall back to a prefilled
  `mailto:info@stablezact.com`.
- Request Crypto Checkout renders the designed success state after submit.
- No backend work in this round.

## SEO / analytics

Per-page `<title>` and meta description following the existing pages'
pattern; page views tracked through the existing `src/lib/analytics.ts`
route integration.

## Verification

- `npm run lint` and `npm run build` (tsc + vite) clean.
- Dev-server walkthrough of all eight pages with Playwright: screenshot each
  page and compare against its Figma frame; zero console errors.
- 390px-width spot check on every page.
- Nav dropdown keyboard operability check.

## Out of scope

- Replacing `/contact` or `/book-a-demo`
- Backend form endpoint implementation
- Mobile-specific Figma designs (none exist for inner pages)
- Pushing to remote (user pushes after review)
