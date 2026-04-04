import { CommandSections } from '@/components/CommandSections'
import { HeerichStageCanvas } from '@/components/HeerichStageCanvas'
import { PageFrame } from '@/components/PageFrame'
import { useTelemetryContext } from '@/app/TelemetryContext'
import { pageSpecs } from '@/content/siteContent'

export function SystemsPage() {
  const spec = pageSpecs.systems
  const telemetry = useTelemetryContext()

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <div className="border border-white/15 bg-black/60 p-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-stage-cyan">Topology Mirror</h2>
          <HeerichStageCanvas className="mt-3 h-[280px] w-full" intensity={telemetry.snapshot.intensity} />
        </div>
        <div className="border border-white/15 bg-black/60 p-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-stage-signal">Pipeline Phases</h2>
          <ol className="mt-3 space-y-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/76">
            <li>01 INGEST SIGNALS FROM HUMAN + ENVIRONMENT SOURCES</li>
            <li>02 SCORE INTENT USING ML INFERENCE STACK</li>
            <li>03 SYNTHESIZE AUDIO-VISUAL STATE CANDIDATES</li>
            <li>04 PROJECT PUBLIC STAGE FEED + TELEMETRY SNAPSHOTS</li>
          </ol>
        </div>
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
