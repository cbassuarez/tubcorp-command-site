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
        <div className="border border-white/15 bg-[#07111d]/75 p-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-stage-cyan">System Topology</h2>
          <HeerichStageCanvas className="mt-3 h-[280px] w-full" intensity={telemetry.snapshot.intensity} />
        </div>
        <div className="border border-white/15 bg-[#07111d]/75 p-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-stage-signal">Processing Stages</h2>
          <ol className="mt-3 space-y-3 text-sm leading-relaxed tracking-[0.01em] text-white/76">
            <li>01 Ingest participant and environment signals from active channels</li>
            <li>02 Score intent and safety policy alignment in the inference layer</li>
            <li>03 Synthesize audiovisual state proposals for scene orchestration</li>
            <li>04 Publish stage output and synchronized telemetry to operator surfaces</li>
          </ol>
        </div>
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
