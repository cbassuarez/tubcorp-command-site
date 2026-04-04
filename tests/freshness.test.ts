import { describe, expect, it } from 'vitest'
import { computeFreshness } from '@/telemetry/freshness'

describe('computeFreshness', () => {
  it('returns LIVE for recent updates', () => {
    expect(computeFreshness(1_000, 5_500)).toBe('LIVE')
  })

  it('returns DEGRADED for medium stale updates', () => {
    expect(computeFreshness(1_000, 7_000)).toBe('DEGRADED')
  })

  it('returns STANDBY for stale updates', () => {
    expect(computeFreshness(1_000, 15_000)).toBe('STANDBY')
  })
})
