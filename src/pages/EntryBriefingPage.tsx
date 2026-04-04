import { motion } from 'framer-motion'
import { Activity, Radio, Shield } from 'lucide-react'
import { CommandSections } from '@/components/CommandSections'
import { DitheredShadow } from '@/components/DitheredShadow'
import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'
import { PageFrame } from '@/components/PageFrame'
import { StatusChip } from '@/components/StatusChip'
import { pageSpecs } from '@/content/siteContent'
import { useTelemetryContext } from '@/app/TelemetryContext'

export function EntryBriefingPage() {
  const spec = pageSpecs.entry
  const telemetry = useTelemetryContext()

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-4">
        {/* Hero heerich with classification banner */}
        <DitheredShadow preset="terminal" offsetY={16} blur={32} opacity={0.5} pixelScale={3}>
          <div className="relative overflow-hidden border border-accent-signal/30 bg-surface-elevated p-4 sm:p-6">
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-signal/60"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            />
            <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-accent-signal">
              Classified // Operator Briefing // {telemetry.state.source} Source
            </p>
            <AnimatedHeerichCanvas
              program="hero-pulse"
              theme="dark"
              className="h-[240px] w-full sm:h-[280px]"
              noShadow
            />
          </div>
        </DitheredShadow>

        {/* Three-column status panels */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-3 border border-line bg-surface-elevated p-4">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-accent-signal" />
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-txt-muted">Mission Status</h3>
            </div>
            <StatusChip title="LINK" value={telemetry.state.link} active={telemetry.state.link !== 'MISSING'} accent="signal" />
            <StatusChip title="FEED" value={telemetry.state.freshness} active={telemetry.state.freshness !== 'STANDBY'} accent="cyan" />
          </div>

          <div className="space-y-3 border border-line bg-surface-elevated p-4">
            <div className="flex items-center gap-2">
              <Radio size={14} className="text-accent-cyan" />
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-txt-muted">Operational Posture</h3>
            </div>
            <StatusChip title="MODE" value={telemetry.state.mode} active accent="cyan" />
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-txt-muted">
              Scene: {telemetry.snapshot.scene} // Intensity: {(telemetry.snapshot.intensity * 100).toFixed(0)}%
            </p>
          </div>

          <div className="space-y-3 border border-line bg-surface-elevated p-4">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-accent-amber" />
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-txt-muted">Deployment Readiness</h3>
            </div>
            <StatusChip title="ACCESS" value={telemetry.state.access} active={telemetry.state.access === 'OPEN'} accent={telemetry.state.access === 'OPEN' ? 'signal' : 'amber'} />
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-txt-muted">
              Companion deployment required for field participation.
            </p>
          </div>
        </div>

        {/* Scrolling signal log */}
        <div className="border border-line bg-surface-secondary p-3">
          <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-accent-cyan">
            Signal Log
          </p>
          <div className="max-h-[120px] space-y-1 overflow-y-auto">
            {telemetry.logLines.slice(0, 12).map((line) => (
              <p key={line} className="font-mono text-[10px] tracking-[0.06em] text-txt-muted">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <CommandSections spec={spec} />
    </PageFrame>
  )
}
