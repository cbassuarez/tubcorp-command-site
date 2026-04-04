import { env } from '@/lib/env'
import { RemoteTelemetryAdapter } from '@/telemetry/RemoteTelemetryAdapter'
import { SimulatedTelemetryAdapter } from '@/telemetry/SimulatedTelemetryAdapter'
import type { TelemetryAdapter } from '@/telemetry/TelemetryAdapter'

export function createTelemetryAdapter(): TelemetryAdapter {
  if (env.telemetryMode === 'remote') {
    return new RemoteTelemetryAdapter({ endpoint: env.telemetryUrl })
  }
  return new SimulatedTelemetryAdapter()
}
