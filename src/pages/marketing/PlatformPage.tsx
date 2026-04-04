import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { platformSpec } from '@/content/marketing/platform'

export function PlatformPage() {
  return <MarketingPage blocks={platformSpec.blocks} />
}
