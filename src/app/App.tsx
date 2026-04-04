import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TelemetryContext } from '@/app/TelemetryContext'
import { useTelemetry } from '@/hooks/useTelemetry'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { EntryLayout } from '@/components/layout/EntryLayout'
import { ShellLayout } from '@/components/ShellLayout'

import { HomePage } from '@/pages/marketing/HomePage'
import { PlatformPage } from '@/pages/marketing/PlatformPage'
import { PlatformHarnessPage } from '@/pages/marketing/PlatformHarnessPage'
import { PlatformPolicyEnginePage } from '@/pages/marketing/PlatformPolicyEnginePage'
import { PlatformSurfacesPage } from '@/pages/marketing/PlatformSurfacesPage'
import { PlatformObservabilityPage } from '@/pages/marketing/PlatformObservabilityPage'
import { SolutionsPage } from '@/pages/marketing/SolutionsPage'
import { CaseStudiesPage } from '@/pages/marketing/CaseStudiesPage'
import { CompanyPage } from '@/pages/marketing/CompanyPage'
import { CareersPage } from '@/pages/marketing/CareersPage'
import { PressPage } from '@/pages/marketing/PressPage'
import { ProcurementPage } from '@/pages/marketing/ProcurementPage'
import { PrivacyPage } from '@/pages/marketing/PrivacyPage'
import { DownloadPage } from '@/pages/marketing/DownloadPage'
import { EntryPage } from '@/pages/marketing/EntryPage'

import { EntryBriefingPage } from '@/pages/EntryBriefingPage'
import { SystemsPage } from '@/pages/SystemsPage'
import { ParticipationPage } from '@/pages/ParticipationPage'
import { SurfacesPage } from '@/pages/SurfacesPage'
import { TelemetryPage } from '@/pages/TelemetryPage'
import { DoctrinePage } from '@/pages/DoctrinePage'
import { AccessPage } from '@/pages/AccessPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function routerBase(): string {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return ''
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export default function App() {
  const telemetry = useTelemetry()

  return (
    <TelemetryContext.Provider value={telemetry}>
      <BrowserRouter basename={routerBase()}>
        <Routes>
          {/* Marketing shell */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/platform/harness" element={<PlatformHarnessPage />} />
            <Route path="/platform/policy-engine" element={<PlatformPolicyEnginePage />} />
            <Route path="/platform/surfaces" element={<PlatformSurfacesPage />} />
            <Route path="/platform/observability" element={<PlatformObservabilityPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/company/careers" element={<CareersPage />} />
            <Route path="/company/press" element={<PressPage />} />
            <Route path="/procurement" element={<ProcurementPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/download" element={<DownloadPage />} />
          </Route>

          {/* Operator portal shell */}
          <Route path="/operators" element={<ShellLayout telemetry={telemetry} />}>
            <Route index element={<EntryBriefingPage />} />
            <Route path="systems" element={<SystemsPage />} />
            <Route path="participation" element={<ParticipationPage />} />
            <Route path="surfaces" element={<SurfacesPage />} />
            <Route path="telemetry" element={<TelemetryPage />} />
            <Route path="doctrine" element={<DoctrinePage />} />
            <Route path="access" element={<AccessPage />} />
          </Route>

          {/* Entry ritual (no shell) */}
          <Route element={<EntryLayout />}>
            <Route path="/entry" element={<EntryPage />} />
          </Route>

          {/* Redirects from old paths */}
          <Route path="/systems" element={<Navigate to="/operators/systems" replace />} />
          <Route path="/participation" element={<Navigate to="/operators/participation" replace />} />
          <Route path="/surfaces" element={<Navigate to="/operators/surfaces" replace />} />
          <Route path="/telemetry" element={<Navigate to="/operators/telemetry" replace />} />
          <Route path="/doctrine" element={<Navigate to="/operators/doctrine" replace />} />
          <Route path="/access" element={<Navigate to="/operators/access" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TelemetryContext.Provider>
  )
}
