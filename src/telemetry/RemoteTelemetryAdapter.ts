import type { TelemetryAdapter, TelemetryListener } from '@/telemetry/TelemetryAdapter'
import type { TelemetryPacket, TelemetryState } from '@/types/contracts'

interface RemoteTelemetryOptions {
  endpoint?: string
}

export class RemoteTelemetryAdapter implements TelemetryAdapter {
  private readonly listeners = new Set<TelemetryListener>()
  private pollHandle?: number
  private readonly endpoint?: string

  private state: TelemetryState = {
    link: 'MISSING',
    feed: 'STANDBY',
    access: 'LOCKED',
    mode: 'REMOTE_PENDING',
    freshness: 'STANDBY',
    timestamp: Date.now(),
    source: 'remote',
  }

  constructor(options: RemoteTelemetryOptions) {
    this.endpoint = options.endpoint
  }

  connect(): void {
    if (this.pollHandle) return
    if (!this.endpoint) {
      this.emit({ logLine: 'REMOTE MODE SELECTED, ENDPOINT MISSING.', receivedAt: Date.now() })
      return
    }
    this.emit({ logLine: `REMOTE POLL ONLINE // ${this.endpoint}`, receivedAt: Date.now() })
    void this.poll()
    this.pollHandle = window.setInterval(() => {
      void this.poll()
    }, 2_500)
  }

  disconnect(): void {
    if (!this.pollHandle) return
    window.clearInterval(this.pollHandle)
    this.pollHandle = undefined
  }

  subscribe(listener: TelemetryListener): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  getCurrentState(): TelemetryState {
    return this.state
  }

  private async poll(): Promise<void> {
    if (!this.endpoint) return
    try {
      const response = await fetch(this.endpoint, {
        headers: {
          Accept: 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const packet = (await response.json()) as TelemetryPacket
      const now = Date.now()
      this.state = {
        ...this.state,
        ...packet.state,
        timestamp: now,
        source: 'remote',
      }
      this.emit({
        ...packet,
        state: this.state,
        receivedAt: now,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'UNKNOWN FAILURE'
      this.emit({
        state: {
          ...this.state,
          link: 'MISSING',
          feed: 'STANDBY',
          access: 'LOCKED',
          mode: 'REMOTE_ERROR',
          timestamp: Date.now(),
          source: 'remote',
        },
        logLine: `REMOTE POLL FAILED // ${message}`,
        receivedAt: Date.now(),
      })
    }
  }

  private emit(packet: TelemetryPacket): void {
    this.listeners.forEach((listener) => listener(packet))
  }
}
