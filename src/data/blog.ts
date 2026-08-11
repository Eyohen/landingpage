import cryptoSafety from '@/assets/figma/blog/crypto-safety.jpg'

/**
 * Blog content — Figma nodes 2168:70558 (index) and 2168:70798 (post).
 * Posts are static for now: there is no CMS, so a new article is a new entry
 * in POSTS below and nothing else. The index grid and the article renderer
 * both read from this file, so neither needs touching to publish.
 */

export interface TocEntry {
  /** Anchor id of the element this entry scrolls to. */
  id: string
  label: string
}

export interface PostListItem {
  id: string
  /** Bold lead-in, rendered before the body text. */
  lead: string
  body: string
  /** Optional trailing "Note:" paragraph inside the same list item. */
  note?: string
}

export type PostBlock =
  | { kind: 'paragraph'; id?: string; text: string }
  | { kind: 'heading'; id: string; text: string }
  | { kind: 'list'; items: PostListItem[] }

export interface BlogPost {
  slug: string
  title: string
  /** Card excerpt on the index — truncated to one line by the card itself. */
  excerpt: string
  metaDescription: string
  author: string
  /** Display date, e.g. "August 1st, 2026". */
  date: string
  /** Machine date used for <time> and relative "posted x ago" labels. */
  isoDate: string
  readTime: string
  image: string
  imageAlt: string
  toc: TocEntry[]
  blocks: PostBlock[]
}

export const POSTS: BlogPost[] = [
  {
    slug: 'how-to-stay-safe-with-crypto',
    title: 'How to Stay Safe with Crypto: A Simple Guide for Merchants',
    excerpt:
      'Crypto payments cannot be reversed, so the scams matter. Here are the ones merchants run into most, and the habits that keep your wallet secure.',
    metaDescription:
      'Common crypto scams merchants run into, and the security practices that keep your wallet, your business, and your customers safe.',
    author: 'Abisoye Falabi',
    date: 'August 1st, 2026',
    isoDate: '2026-08-01',
    readTime: '12 mins read',
    image: cryptoSafety,
    imageAlt: 'Hands typing on a laptop at a sunlit desk',
    toc: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'common-scam-methods', label: 'Why Crypto Security Matters' },
      { id: 'phishing-emails', label: 'Phishing Emails' },
      { id: 'imitation-platforms', label: 'Imitation Platforms' },
      { id: 'social-media-impersonation', label: 'Social Media Impersonation' },
      { id: 'fake-payment-confirmations', label: 'Fake Customer Payment Confirmations' },
      { id: 'best-practices', label: 'Best Practices for Securing Your Cryptocurrency' },
      { id: 'keep-backups', label: 'Keep Backups of Your Wallet' },
      { id: 'conclusion', label: 'Conclusion: Accept Crypto with Confidence' },
    ],
    blocks: [
      {
        kind: 'paragraph',
        id: 'introduction',
        text: 'As a merchant, accepting cryptocurrency opens your business to customers across borders and allows fast, secure payments. However, crypto transactions are permanent. This means that if your crypto assets are stolen or sent to the wrong wallet address, they cannot be reversed. That’s why securing your crypto assets is important for protecting both your business and your customers’ trust.',
      },
      {
        kind: 'paragraph',
        text: 'In this guide, we have highlighted some of the common scams out there and have provided best safety practices to help you keep your crypto assets safe without running into the hands of bad actors or scammers.',
      },
      { kind: 'heading', id: 'common-scam-methods', text: 'Common scam methods' },
      {
        kind: 'list',
        items: [
          {
            id: 'phishing-emails',
            lead: 'Phishing emails:',
            body: 'Scammers usually send emails pretending to be from your wallet provider or exchange, urging you to click a link to “verify” your account. The link leads to a fake site that steals your login details. As a Stablezact merchant you should always type the official website address directly into your browser instead of clicking links in messages.',
          },
          {
            id: 'imitation-platforms',
            lead: 'Imitation platforms:',
            body: 'Fraudulent websites or apps are designed to look identical to real exchanges so you will trust them with your credentials. Only download apps from official app stores and bookmark the correct site so you never risk clicking on a counterfeit one.',
          },
          {
            id: 'social-media-impersonation',
            lead: 'Social media impersonation:',
            body: 'Fake accounts pose as influencers, business partners, or even customer support agents, sending private messages with offers or urgent requests. Always confirm identities through a separate, trusted communication channel before responding.',
          },
          {
            id: 'fake-payment-confirmations',
            lead: 'Fake customer payment confirmations:',
            body: 'Scammers send altered screenshots showing proof of payment to get merchants to release goods before the crypto actually arrive in your wallet. Always check your Stablezact merchant dashboard to confirm a transaction before delivering goods or services. You can also double check transactions on blockchain explorers like Etherscan, Bscscan etc.',
          },
        ],
      },
      {
        kind: 'heading',
        id: 'best-practices',
        text: 'Best Practices for Securing Your Cryptocurrency',
      },
      {
        kind: 'list',
        items: [
          {
            id: 'never-share-private-key',
            lead: 'Never share your private key:',
            body: 'Your private wallet is like the key to your business vault. Anyone with it can empty your wallet, and there’s no way to reverse it. It is important that this private key isn’t shared at any time with anyone in your organization.',
            note: 'Your wallet private key is not the same as your wallet password. Once your private key is accessed, it is irreversible.',
          },
          {
            id: 'enable-2fa',
            lead: 'Enable two-factor authentication (2FA):',
            body: 'With 2FA, even if a password is stolen, a scammer would still need a second form of verification—like a code from your device or your fingerprint before logging in.',
          },
          {
            id: 'password-management',
            lead: 'Use strong password management:',
            body: 'Weak or reused passwords are an open door for hackers. Use a password manager to generate strong, unique passwords and store them securely.',
          },
          {
            id: 'beware-phishing',
            lead: 'Beware of phishing emails and fake apps:',
            body: 'Phishing emails pretend to be from trusted services but send you to fake login pages while fake crypto apps may appear in app stores or be sent directly to you, designed to capture your login details and private keys. Always check the official sources before clicking links or downloading a crypto wallet.',
          },
          {
            id: 'keep-backups',
            lead: 'Keep backups of your wallet:',
            body: 'Store your crypto assets using an offline backup wallet so you can recover your crypto if your device is damaged, lost, or hacked. With offline backups like your hardware wallet, you can securely store your crypto private keys offline, protecting them from online threats. Remember to test your backup regularly.',
          },
        ],
      },
      { kind: 'heading', id: 'conclusion', text: 'Conclusion' },
      {
        kind: 'paragraph',
        text: 'Accepting cryptocurrency is one of the easiest, fastest and borderless ways to grow your business, but it comes with the responsibility to protect your assets. Scammers are creative, fast-moving, and often hard to detect so, prevention is your best defense.',
      },
      {
        kind: 'paragraph',
        text: 'By practicing strong digital security and staying alert to suspicious activity, you can confidently accept crypto while keeping your earnings safe.',
      },
    ],
  },
]

export function getPost(slug: string | undefined): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug)
}

/**
 * "Posted 4 days ago" in the design is static mock data. Deriving it from the
 * publish date keeps the label honest as a post ages.
 */
export function postedAgo(isoDate: string, now: Date = new Date()): string {
  const published = new Date(`${isoDate}T00:00:00Z`)
  const minutes = Math.floor((now.getTime() - published.getTime()) / 60000)

  if (minutes < 1) return 'Posted just now'
  if (minutes < 60) return `Posted ${minutes} min${minutes === 1 ? '' : 's'} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Posted ${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `Posted ${days} day${days === 1 ? '' : 's'} ago`

  const months = Math.floor(days / 30)
  if (months < 12) return `Posted ${months} month${months === 1 ? '' : 's'} ago`

  const years = Math.floor(months / 12)
  return `Posted ${years} year${years === 1 ? '' : 's'} ago`
}
