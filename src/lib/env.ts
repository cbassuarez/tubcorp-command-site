import type { TelemetrySource } from '@/types/contracts'

export interface SiteEnv {
  telemetryMode: TelemetrySource
  telemetryUrl?: string
  companionIosUrl?: string
  companionTestflightUrl?: string
}

export const env: SiteEnv = {
  telemetryMode: import.meta.env.VITE_TELEMETRY_MODE === 'remote' ? 'remote' : 'simulated',
  telemetryUrl: import.meta.env.VITE_TELEMETRY_URL,
  companionIosUrl: import.meta.env.VITE_COMPANION_IOS_URL,
  companionTestflightUrl: import.meta.env.VITE_COMPANION_TESTFLIGHT_URL,
}
