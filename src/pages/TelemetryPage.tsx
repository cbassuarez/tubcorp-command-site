import { Activity, Radar, Lock, BarChart3 } from 'lucide-react'
import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { StatusChip } from '@/components/StatusChip'
import { useTelemetryContext } from '@/app/TelemetryContext'
import { pageSpecs } from '@/content/siteContent'

export function TelemetryPage() {
  const spec = pageSpecs.telemetry
  const telemetry = useTelemetryContext()

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-4">
        {/* Status panel grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 border border-line bg-surface-elevated p-3">
            <StatusChip title="LINK" value={telemetry.state.link} active={telemetry.state.link !== 'MISSING'} accent="signal" icon={<Activity size={12} />} />
            <IntensityBar label="Signal Strength" value={telemetry.state.link === 'CONNECTED' ? 0.92 : 0.45} />
          </div>
          <div className="space-y-2 border border-line bg-surface-elevated p-3">
            <StatusChip title="FEED" value={telemetry.state.freshness} active={telemetry.state.freshness !== 'STANDBY'} accent="cyan" icon={<Radar size={12} />} />
            <IntensityBar label="Feed Quality" value={telemetry.state.freshness === 'LIVE' ? 0.88 : 0.3} />
          </div>
          <div className="space-y-2 border border-line bg-surface-elevated p-3">
            <StatusChip title="MODE" value={telemetry.state.mode} active accent="amber" icon={<BarChart3 size={12} />} />
            <IntensityBar label="Processing Load" value={telemetry.snapshot.intensity} />
          </div>
          <div className="space-y-2 border border-line bg-surface-elevated p-3">
            <StatusChip title="ACCESS" value={telemetry.state.access} active={telemetry.state.access === 'OPEN'} accent={telemetry.state.access === 'OPEN' ? 'signal' : 'alert'} icon={<Lock size={12} />} />
            <IntensityBar label="Gate Status" value={telemetry.state.access === 'OPEN' ? 1 : 0.15} />
          </div>
        </div>

        {/* Central visualization + log stream */}
        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border border-line bg-surface-elevated p-4">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-cyan">
              Signal Cascade // Live Visualization
            </p>
            <AnimatedHeerichCanvas
              program="signal-cascade"
              theme="dark"
              className="h-[260px] w-full"
            />
          </div>

          <div className="flex flex-col border border-line bg-surface-secondary p-4">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-cyan">
              Reasoning Trace
            </p>
            <p className="mb-3 font-mono text-[11px] text-accent-signal">
              {telemetry.snapshot.thought}
            </p>
            <div className="flex-1 space-y-1 overflow-y-auto border-t border-line pt-2">
              <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-txt-muted">Event Log</p>
              {telemetry.logLines.slice(0, 16).map((line) => (
                <p key={line} className="font-mono text-[10px] tracking-[0.04em] text-txt-muted">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CommandSections spec={spec} />
    </PageFrame>
  )
}

function IntensityBar({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, value * 100))
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-txt-muted">{label}</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-txt-muted">{pct.toFixed(0)}%</span>
      </div>
      <div className="h-1 w-full bg-surface-secondary">
        <div className="h-full bg-accent-signal transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
