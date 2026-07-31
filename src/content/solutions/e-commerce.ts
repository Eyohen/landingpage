import type { SolutionContent } from './types'
import ecommerceFeature from '@/assets/figma/inner/ecommerce-feature.jpg'
import {
  iconUserCheck,
  iconSecurityCheck,
  iconStore,
  iconCardValidation,
  iconRoute,
  iconDistribute,
} from './icons'

/** Figma frame 1614:22233 — "For e-commerce". */
export const eCommerce: SolutionContent = {
  metaTitle: 'Stablezact for E-commerce Platforms — let merchants enable stablecoin checkout',
  metaDescription:
    'Add stablecoin payment capabilities to your commerce platform without requiring every merchant to build a separate wallet integration.',
  hero: {
    eyebrow: 'E-COMMERCE',
    titleDark: 'Let merchants enable stablecoins',
    titleGray: 'at checkout.',
    body: [
      'Add stablecoin payment capabilities to your commerce platform without requiring every merchant to build a separate wallet integration.',
    ],
    ctas: [
      { label: 'Discuss a PSP partnership', href: '/talk-to-sales', variant: 'purple' },
      { label: 'View Developer Docs', href: 'https://docs.stablezact.com', variant: 'soft' },
    ],
  },
  capabilities: {
    headingDark: 'Everything you need',
    headingGray: 'to ship it.',
    cards: [
      {
        icon: iconUserCheck,
        title: 'Merchant activation',
        body: 'Allow eligible merchants to enable stablecoin payments from their existing settings or application marketplace.',
      },
      {
        icon: iconSecurityCheck,
        title: 'Connected merchant settlement',
        body: 'Configure settlement details for each merchant without requiring Stablezact to hold their private keys.',
      },
      {
        icon: iconStore,
        title: 'Embedded checkout',
        body: 'Present stablecoins as another payment option inside the merchant’s existing checkout.',
      },
      {
        icon: iconCardValidation,
        title: 'Payment & order sync',
        body: 'Use webhooks and payment references to update order status after transaction validation.',
      },
      {
        icon: iconRoute,
        title: 'Multiple integration routes',
        body: 'Support direct APIs, SDKs, plugins, payment links and hosted components.',
      },
      {
        icon: iconDistribute,
        title: 'Scalable distribution',
        body: 'Make a single integration available to many merchants rather than managing individual technical projects.',
      },
    ],
  },
  sections: [
    {
      merged: true,
      kind: 'split-panel',
      eyebrow: 'CAPABILITIES',
      heading: 'The payment companies powering modern commerce',
      chips: [
        { label: 'Payment service providers' },
        { label: 'Payment facilitators' },
        { label: 'Merchant acquirers' },
        { label: 'Payment gateways' },
        { label: 'Payment orchestration platforms' },
      ],
      chipCount: '3+',
    },
    {
      kind: 'feature-split',
      heading: 'A new payment capability distributed across your merchants.',
      body: 'Commerce platforms compete on the tools and payment options they provide to merchants. Stablezact gives your merchants another way to accept payments from customers globally. Offer stablecoin checkout as a native platform feature, an application, a plugin or an embedded payment integration.',
      cta: { label: 'View Developer Docs', href: 'https://docs.stablezact.com' },
      image: ecommerceFeature,
      imageAlt: 'Stablezact checkout embedded in a commerce platform',
    },
  ],
  cta: {
    heading: 'Give every eligible merchant access to stablecoin checkout.',
    sub: 'Speak with Stablezact about platform integration, merchant onboarding and distribution.',
    cta: { label: 'Discuss a platform partnership', href: '/talk-to-sales' },
  },
}
