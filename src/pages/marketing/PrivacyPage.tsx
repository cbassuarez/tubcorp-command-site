import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { privacySpec } from '@/content/marketing/privacy'

export function PrivacyPage() {
  return <MarketingPage blocks={privacySpec.blocks} />
}
