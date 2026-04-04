export type TelemetrySource = 'simulated' | 'remote'

export type LinkState = 'CONNECTED' | 'MISSING' | 'SIMULATED'
export type FeedState = 'LIVE' | 'DEGRADED' | 'STANDBY' | 'SIMULATED'
export type AccessState = 'OPEN' | 'RESTRICTED' | 'LOCKED'
export type TelemetryFreshness = 'LIVE' | 'DEGRADED' | 'STANDBY'

export interface TelemetryState {
  link: LinkState
  feed: FeedState
  access: AccessState
  mode: string
  freshness: TelemetryFreshness
  timestamp: number
  source: TelemetrySource
}

export interface StageSnapshot {
  scene: string
  thought: string
  logLines: string[]
  intensity: number
  ts: number
}

export type PageActionKind = 'route' | 'external' | 'command'

export interface PageCommandAction {
  id: string
  label: string
  kind: PageActionKind
  target: string
  requiresAccess?: boolean
}

export interface Directive {
  id: string
  code: string
  title: string
  body: string
}

export interface SectionBlock {
  id: string
  title: string
  body: string[]
  directives?: Directive[]
}

export interface CommandPageSpec {
  id: string
  route: string
  title: string
  subtitle: string
  command: string
  sections: SectionBlock[]
  actions: PageCommandAction[]
}

export interface TelemetryPacket {
  state?: Partial<TelemetryState>
  snapshot?: Partial<StageSnapshot>
  logLine?: string
  receivedAt?: number
}
