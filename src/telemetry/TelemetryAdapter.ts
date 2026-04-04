import type { TelemetryPacket, TelemetryState } from '@/types/contracts'

export type TelemetryListener = (packet: TelemetryPacket) => void

export interface TelemetryAdapter {
  connect(): void
  disconnect(): void
  subscribe(listener: TelemetryListener): () => void
  getCurrentState(): TelemetryState
}
