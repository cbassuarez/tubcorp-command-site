import { useEffect, useMemo, useState } from 'react'
import { createTelemetryAdapter } from '@/telemetry/createTelemetryAdapter'
import { computeFreshness } from '@/telemetry/freshness'
import type { StageSnapshot, TelemetryFreshness, TelemetryState } from '@/types/contracts'

export interface TelemetryViewModel {
  state: TelemetryState
  snapshot: StageSnapshot
  logLines: string[]
  sourceLabel: string
}

const DEFAULT_SNAPSHOT: StageSnapshot = {
  scene: 'QUIET WATCH',
  thought: 'NO FEED PACKETS RECEIVED.',
  logLines: ['PIPELINE IDLE.', 'INPUT STACK STANDBY.', 'AWAITING OPERATOR TRAFFIC.'],
  intensity: 0.12,
  ts: Date.now(),
}

export function useTelemetry(): TelemetryViewModel {
  const adapter = useMemo(() => createTelemetryAdapter(), [])
  const [state, setState] = useState<TelemetryState>(adapter.getCurrentState())
  const [snapshot, setSnapshot] = useState<StageSnapshot>(DEFAULT_SNAPSHOT)
  const [logLines, setLogLines] = useState<string[]>(['BOOT SEQUENCE COMPLETE.'])
  const [lastPacketAt, setLastPacketAt] = useState<number>(() => Date.now())

  useEffect(() => {
    const unsubscribe = adapter.subscribe((packet) => {
      const now = packet.receivedAt ?? Date.now()
      setLastPacketAt(now)
      if (packet.state) {
        const nextState = packet.state
        setState((previous) => ({
          ...previous,
          ...nextState,
          source: nextState.source ?? previous.source,
          timestamp: now,
        }))
      }
      if (packet.snapshot) {
        const nextSnapshot = packet.snapshot
        setSnapshot((previous) => ({
          ...previous,
          ...nextSnapshot,
          logLines: nextSnapshot.logLines ?? previous.logLines,
          ts: nextSnapshot.ts ?? now,
        }))
      }
      if (packet.logLine) {
        setLogLines((previous) => [packet.logLine as string, ...previous].slice(0, 24))
      }
    })
    adapter.connect()
    return () => {
      unsubscribe()
      adapter.disconnect()
    }
  }, [adapter])

  useEffect(() => {
    const handle = window.setInterval(() => {
      const freshness = computeFreshness(lastPacketAt)
      setState((previous) => {
        if (previous.freshness === freshness) {
          return previous
        }
        const nextFeed = freshness === 'STANDBY' ? 'STANDBY' : previous.feed
        return {
          ...previous,
          freshness,
          feed: nextFeed,
          timestamp: Date.now(),
        }
      })
    }, 1_000)
    return () => {
      window.clearInterval(handle)
    }
  }, [lastPacketAt])

  const sourceLabel = state.source === 'remote' ? 'REMOTE LINK' : 'SIMULATED LINK'

  return {
    state: applyFreshness(state, computeFreshness(lastPacketAt)),
    snapshot,
    logLines,
    sourceLabel,
  }
}

function applyFreshness(state: TelemetryState, freshness: TelemetryFreshness): TelemetryState {
  if (state.freshness === freshness) return state
  return {
    ...state,
    freshness,
    feed: freshness === 'STANDBY' ? 'STANDBY' : state.feed,
  }
}
