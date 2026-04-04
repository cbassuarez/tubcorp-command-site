import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { platformPolicyEngineSpec } from '@/content/marketing/platformPolicyEngine'

export function PlatformPolicyEnginePage() {
  return <MarketingPage blocks={platformPolicyEngineSpec.blocks} />
}
