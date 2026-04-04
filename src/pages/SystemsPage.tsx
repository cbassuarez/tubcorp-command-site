import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { useTelemetryContext } from '@/app/TelemetryContext'
import { pageSpecs } from '@/content/siteContent'

const stages = [
  { num: '01', label: 'CAPTURE', desc: 'Ingest participant and environment signals from active input channels. Button events, microphone feeds, spatial tracking, and ML mediation streams are multiplexed into a unified signal bus.', status: 'NOMINAL' },
  { num: '02', label: 'INFER', desc: 'Score intent, safety policy alignment, and participation quality in the inference layer. The policy engine applies governance rules in real time, blocking non-compliant signals before they reach downstream processors.', status: 'NOMINAL' },
  { num: '03', label: 'STAGE', desc: 'Synthesize audiovisual state proposals for scene orchestration. Processing regimes — including temporal pattern reinforcement, micro-temporal decomposition, and spectral field manipulation — generate the output state.', status: 'NOMINAL' },
  { num: '04', label: 'EMIT', desc: 'Publish stage output and synchronized telemetry to operator surfaces. All output is logged, auditable, and subject to the governance framework. Companion apps receive state updates via the signal relay.', status: 'NOMINAL' },
]

export function SystemsPage() {
  const spec = pageSpecs.systems
  const telemetry = useTelemetryContext()

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-4">
        {/* Full-width pipeline visualization */}
        <div className="border border-line bg-surface-elevated p-4">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-cyan">
            System Topology // Live Pipeline View
          </p>
          <AnimatedHeerichCanvas
            program="pipeline-flow"
            theme="dark"
            className="h-[200px] w-full sm:h-[240px]"
          />
        </div>

        {/* Pipeline stages */}
        <div className="grid gap-3 md:grid-cols-2">
          {stages.map((stage) => (
            <div key={stage.num} className="border border-line bg-surface-elevated p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg font-bold text-accent-signal">{stage.num}</span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-txt">{stage.label}</span>
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent-signal">{stage.status}</span>
              </div>
              <p className="text-sm leading-relaxed text-txt-secondary">{stage.desc}</p>
            </div>
          ))}
        </div>

        {/* Protocol metadata */}
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-line bg-surface-secondary p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-txt-muted">Protocol</p>
            <p className="mt-1 font-mono text-[12px] font-bold text-txt">TUB-SIG v3.1</p>
          </div>
          <div className="border border-line bg-surface-secondary p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-txt-muted">Inference Model</p>
            <p className="mt-1 font-mono text-[12px] font-bold text-txt">PE-{telemetry.state.mode}</p>
          </div>
          <div className="border border-line bg-surface-secondary p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-txt-muted">Deployment Epoch</p>
            <p className="mt-1 font-mono text-[12px] font-bold text-txt">2026.04</p>
          </div>
        </div>
      </div>

      <CommandSections spec={spec} />
    </PageFrame>
  )
}
