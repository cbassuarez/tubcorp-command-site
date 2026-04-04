import { createContext, useContext } from 'react'
import type { TelemetryViewModel } from '@/hooks/useTelemetry'

export const TelemetryContext = createContext<TelemetryViewModel | null>(null)

export function useTelemetryContext(): TelemetryViewModel {
  const value = useContext(TelemetryContext)
  if (!value) {
    throw new Error('useTelemetryContext must be used within TelemetryContext.Provider')
  }
  return value
}
