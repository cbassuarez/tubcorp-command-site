import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { platformHarnessSpec } from '@/content/marketing/platformHarness'

export function PlatformHarnessPage() {
  return <MarketingPage blocks={platformHarnessSpec.blocks} />
}
