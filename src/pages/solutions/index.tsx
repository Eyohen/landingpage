import { SolutionPage } from './SolutionPage'
import { paymentProviders } from '@/content/solutions/payment-providers'
import { enterpriseMerchants } from '@/content/solutions/enterprise-merchants'
import { eCommerce } from '@/content/solutions/e-commerce'
import { travel } from '@/content/solutions/travel'
import { retailPos } from '@/content/solutions/retail-pos'

/** Route components for the five /solutions/* pages (lazy-loaded from App). */

export function PaymentProvidersPage() {
  return <SolutionPage content={paymentProviders} />
}

export function EnterpriseMerchantsPage() {
  return <SolutionPage content={enterpriseMerchants} />
}

export function ECommercePage() {
  return <SolutionPage content={eCommerce} />
}

export function TravelPage() {
  return <SolutionPage content={travel} />
}

export function RetailPosPage() {
  return <SolutionPage content={retailPos} />
}
