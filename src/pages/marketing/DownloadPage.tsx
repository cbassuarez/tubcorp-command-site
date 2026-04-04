import { MarketingPage } from '@/components/blocks/BlockRenderer'
import { downloadSpec } from '@/content/marketing/download'

export function DownloadPage() {
  return <MarketingPage blocks={downloadSpec.blocks} />
}
