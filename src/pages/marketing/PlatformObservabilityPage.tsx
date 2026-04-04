import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { platformObservabilitySpec } from '@/content/marketing/platformObservability'

export function PlatformObservabilityPage() {
  return <MarketingPage blocks={platformObservabilitySpec.blocks} />
}
