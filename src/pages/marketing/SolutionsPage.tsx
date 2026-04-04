import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { solutionsSpec } from '@/content/marketing/solutions'

export function SolutionsPage() {
  return <MarketingPage blocks={solutionsSpec.blocks} />
}
