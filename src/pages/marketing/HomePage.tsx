import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { homepageSpec } from '@/content/marketing/homepage'

export function HomePage() {
  return <MarketingPage blocks={homepageSpec.blocks} />
}
