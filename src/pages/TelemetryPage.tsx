import { CommandSections } from '@/components/CommandSections'
import { HeerichStageCanvas } from '@/components/HeerichStageCanvas'
import { PageFrame } from '@/components/PageFrame'
import { StatusChip } from '@/components/StatusChip'
import { useTelemetryContext } from '@/app/TelemetryContext'
import { pageSpecs } from '@/content/siteContent'

export function TelemetryPage() {
  const spec = pageSpecs.telemetry
  const telemetry = useTelemetryContext()

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-3 border border-white/15 bg-black/60 p-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.17em] text-stage-signal">Live Status</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <StatusChip title="LINK" value={telemetry.state.link} active={telemetry.state.link !== 'MISSING'} />
            <StatusChip title="FEED" value={telemetry.state.feed} active={telemetry.state.feed !== 'STANDBY'} accent="cyan" />
            <StatusChip title="FRESHNESS" value={telemetry.state.freshness} active={telemetry.state.freshness === 'LIVE'} accent="amber" />
            <StatusChip title="MODE" value={telemetry.state.mode} active />
          </div>
          <div className="border border-white/10 bg-black/70 p-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-stage-cyan">
              THOUGHT {telemetry.snapshot.thought}
            </p>
            <div className="mt-2 space-y-1">
              {telemetry.snapshot.logLines.map((line) => (
                <p key={line} className="font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-white/65">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border border-white/15 bg-black/60 p-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.17em] text-stage-cyan">Stage Snapshot</h2>
          <HeerichStageCanvas className="mt-3 h-[280px]" intensity={telemetry.snapshot.intensity} />
        </section>
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
