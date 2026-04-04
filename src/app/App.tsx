import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { ShellLayout } from '@/components/ShellLayout'
import { TelemetryContext } from '@/app/TelemetryContext'
import { useTelemetry } from '@/hooks/useTelemetry'
import { AccessPage } from '@/pages/AccessPage'
import { DoctrinePage } from '@/pages/DoctrinePage'
import { EntryBriefingPage } from '@/pages/EntryBriefingPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ParticipationPage } from '@/pages/ParticipationPage'
import { SurfacesPage } from '@/pages/SurfacesPage'
import { SystemsPage } from '@/pages/SystemsPage'
import { TelemetryPage } from '@/pages/TelemetryPage'

function routerBase(): string {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return ''
  return base.endsWith('/') ? base.slice(0, -1) : base
}

function shouldUseHashRouter(): boolean {
  const routerMode = String(import.meta.env.VITE_ROUTER_MODE ?? '').toLowerCase()
  if (routerMode === 'hash') return true
  if (routerMode === 'browser') return false
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    return true
  }
  return import.meta.env.PROD
}

export default function App() {
  const telemetry = useTelemetry()
  const routes = (
    <Routes>
      <Route element={<ShellLayout telemetry={telemetry} />}>
        <Route path="/" element={<EntryBriefingPage />} />
        <Route path="/systems" element={<SystemsPage />} />
        <Route path="/participation" element={<ParticipationPage />} />
        <Route path="/surfaces" element={<SurfacesPage />} />
        <Route path="/telemetry" element={<TelemetryPage />} />
        <Route path="/doctrine" element={<DoctrinePage />} />
        <Route path="/access" element={<AccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
  const useHashRouter = shouldUseHashRouter()

  return (
    <TelemetryContext.Provider value={telemetry}>
      {useHashRouter ? <HashRouter>{routes}</HashRouter> : <BrowserRouter basename={routerBase()}>{routes}</BrowserRouter>}
    </TelemetryContext.Provider>
  )
}
