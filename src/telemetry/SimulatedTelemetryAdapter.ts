import type { TelemetryAdapter, TelemetryListener } from '@/telemetry/TelemetryAdapter'
import type { StageSnapshot, TelemetryPacket, TelemetryState } from '@/types/contracts'

const MODES = ['QUIET_WATCH', 'STRIKE_VECTOR', 'DRIFT_FIELD', 'CLAIM_TRACE']
const SCENES = ['SYNAPTIC BATH', 'CONTAINMENT GRID', 'ECHO LATTICE', 'PROCESS CHAMBER']
const THOUGHTS = [
  'PARTICIPATION DELTA ACCEPTED',
  'BODY CLUSTER REWEIGHTED',
  'SPECTRAL PRESSURE HOLDING',
  'MOTION VECTOR RECONCILED',
]

function randomItem<T>(items: T[], index: number): T {
  return items[index % items.length]
}

export class SimulatedTelemetryAdapter implements TelemetryAdapter {
  private readonly listeners = new Set<TelemetryListener>()
  private tickHandle?: number
  private tick = 0

  private state: TelemetryState = {
    link: 'SIMULATED',
    feed: 'SIMULATED',
    access: 'RESTRICTED',
    mode: MODES[0],
    freshness: 'LIVE',
    timestamp: Date.now(),
    source: 'simulated',
  }

  connect(): void {
    if (this.tickHandle) return
    this.emit({
      logLine: 'SIMULATION BUS ONLINE. SOURCE=LOCAL.',
      receivedAt: Date.now(),
    })
    this.tickHandle = window.setInterval(() => {
      this.tick += 1
      const now = Date.now()
      this.state = {
        ...this.state,
        timestamp: now,
        mode: randomItem(MODES, this.tick),
        access: this.tick % 5 === 0 ? 'LOCKED' : 'RESTRICTED',
      }
      const snapshot: StageSnapshot = {
        scene: randomItem(SCENES, this.tick),
        thought: randomItem(THOUGHTS, this.tick + 2),
        logLines: [
          `PIPELINE/INPUT  BODY:${(12 + (this.tick % 8)).toString().padStart(2, '0')}`,
          `PIPELINE/VOICE  ENERGY ${(0.32 + (this.tick % 4) * 0.08).toFixed(2)}`,
          `PIPELINE/QUEUE  CLAIMS ${(3 + (this.tick % 6)).toString().padStart(2, '0')}`,
        ],
        intensity: 0.22 + ((this.tick % 9) / 12),
        ts: now,
      }
      this.emit({
        state: this.state,
        snapshot,
        logLine: `SIM TICK ${this.tick.toString().padStart(3, '0')} // MODE ${this.state.mode}`,
        receivedAt: now,
      })
    }, 1_150)
  }

  disconnect(): void {
    if (!this.tickHandle) return
    window.clearInterval(this.tickHandle)
    this.tickHandle = undefined
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

  private emit(packet: TelemetryPacket): void {
    this.listeners.forEach((listener) => listener(packet))
  }
}
