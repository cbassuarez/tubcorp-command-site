import { describe, expect, it } from 'vitest'
import { resolveActionHref } from '@/lib/actions'

describe('resolveActionHref', () => {
  it('returns route targets unchanged', () => {
    expect(
      resolveActionHref({
        id: 'x',
        label: 'X',
        kind: 'route',
        target: '/telemetry',
      }),
    ).toBe('/telemetry')
  })

  it('returns fallback for env external targets when not configured', () => {
    expect(
      resolveActionHref({
        id: 'ios',
        label: 'IOS',
        kind: 'external',
        target: 'env:ios',
      }),
    ).toBe('#')
  })
})
