import type { MarketingPageSpec } from '@/types/contracts'

export const entrySpec: MarketingPageSpec = {
  id: 'entry',
  route: '/entry',
  title: 'Signal Contact Established',
  description: 'You have been observed. Connect to the governed environment.',
  blocks: [], // Entry page uses custom rendering, not blocks
}
