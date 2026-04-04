import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { companySpec } from '@/content/marketing/company'

export function CompanyPage() {
  return <MarketingPage blocks={companySpec.blocks} />
}
