import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { caseStudiesSpec } from '@/content/marketing/caseStudies'

export function CaseStudiesPage() {
  return <MarketingPage blocks={caseStudiesSpec.blocks} />
}
