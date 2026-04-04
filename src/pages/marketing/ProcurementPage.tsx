import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { procurementSpec } from '@/content/marketing/procurement'

export function ProcurementPage() {
  return <MarketingPage blocks={procurementSpec.blocks} />
}
