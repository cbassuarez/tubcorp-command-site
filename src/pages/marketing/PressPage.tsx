import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { pressSpec } from '@/content/marketing/press'

export function PressPage() {
  return <MarketingPage blocks={pressSpec.blocks} />
}
