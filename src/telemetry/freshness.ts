import type { TelemetryFreshness } from '@/types/contracts'

const LIVE_MAX_AGE_MS = 5_000
const DEGRADED_MAX_AGE_MS = 12_000

export function computeFreshness(lastUpdateMs: number, nowMs = Date.now()): TelemetryFreshness {
  const age = Math.max(0, nowMs - lastUpdateMs)
  if (age <= LIVE_MAX_AGE_MS) return 'LIVE'
  if (age <= DEGRADED_MAX_AGE_MS) return 'DEGRADED'
  return 'STANDBY'
}
