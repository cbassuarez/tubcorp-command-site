import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { platformSurfacesSpec } from '@/content/marketing/platformSurfaces'

export function PlatformSurfacesPage() {
  return <MarketingPage blocks={platformSurfacesSpec.blocks} />
}
