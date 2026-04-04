import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const surfaceRows = [
  ['STEER', 'VECTOR ATTRACTOR / DESCRIPTOR BIAS CONTROL'],
  ['PLAY', 'LIVE SAMPLE INJECTION / OUTPUT PATH MATERIAL'],
  ['LEARN', 'OPERATOR MANUAL / SYSTEM ORIENTATION'],
  ['SETTINGS', 'LINK DIAGNOSTICS / RECOVERY / PRIVILEGED TOOLS'],
]

export function SurfacesPage() {
  const spec = pageSpecs.surfaces

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="overflow-hidden border border-white/15 bg-black/60">
        {surfaceRows.map(([title, body]) => (
          <div key={title} className="grid grid-cols-[120px_1fr] border-b border-white/10 px-4 py-3 last:border-b-0">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-stage-cyan">{title}</span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">{body}</span>
          </div>
        ))}
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
