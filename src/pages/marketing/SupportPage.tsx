import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { supportSpec } from '@/content/marketing/support'

export function SupportPage() {
  return <MarketingPage blocks={supportSpec.blocks} />
}
