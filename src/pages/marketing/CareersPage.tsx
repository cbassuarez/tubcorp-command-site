import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { careersSpec } from '@/content/marketing/careers'

export function CareersPage() {
  return <MarketingPage blocks={careersSpec.blocks} />
}
