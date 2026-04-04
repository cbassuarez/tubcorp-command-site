import type { ContentBlock } from '@/types/contracts'
import { HeroSection } from '@/components/blocks/HeroSection'
import { ProseSection } from '@/components/blocks/ProseSection'
import { FeatureGrid } from '@/components/blocks/FeatureGrid'
import { StatBar } from '@/components/blocks/StatBar'
import { QuoteSection } from '@/components/blocks/QuoteSection'
import { CTABand } from '@/components/blocks/CTABand'
import { SplitSection } from '@/components/blocks/SplitSection'
import { CardGrid } from '@/components/blocks/CardGrid'
import { PipelineSection } from '@/components/blocks/PipelineSection'
import { TierSection } from '@/components/blocks/TierSection'
import { TelemetryWidget } from '@/components/blocks/TelemetryWidget'
import { SectionDivider } from '@/components/blocks/SectionDivider'
import { HeerichVisual } from '@/components/blocks/HeerichVisual'

interface BlockRendererProps {
  block: ContentBlock
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'hero':
      return <HeroSection block={block} />
    case 'prose':
      return <ProseSection block={block} />
    case 'featureGrid':
      return <FeatureGrid block={block} />
    case 'statBar':
      return <StatBar block={block} />
    case 'quote':
      return <QuoteSection block={block} />
    case 'cta':
      return <CTABand block={block} />
    case 'split':
      return <SplitSection block={block} />
    case 'cardGrid':
      return <CardGrid block={block} />
    case 'pipeline':
      return <PipelineSection block={block} />
    case 'tiers':
      return <TierSection block={block} />
    case 'telemetryWidget':
      return <TelemetryWidget block={block} />
    case 'divider':
      return <SectionDivider block={block} />
    case 'heerich':
      return <HeerichVisual block={block} />
    case 'commandSection':
      return null // rendered by legacy CommandSections in operator pages
  }
}

interface MarketingPageProps {
  blocks: ContentBlock[]
}

export function MarketingPage({ blocks }: MarketingPageProps) {
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  )
}
