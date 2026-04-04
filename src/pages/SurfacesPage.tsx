import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const surfaceRows = [
  ['STEER', 'Preference vectors for live model steering and controlled descriptor bias'],
  ['PLAY', 'Audio contribution lane for participant samples and routed playback'],
  ['LEARN', 'Operational briefing for curators, operators, and floor technicians'],
  ['SETTINGS', 'Link health, recovery actions, and privileged administration controls'],
]

export function SurfacesPage() {
  const spec = pageSpecs.surfaces

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="overflow-hidden border border-[#d2c8b3] bg-[#efe7d6]/78">
        {surfaceRows.map(([title, body]) => (
          <div key={title} className="grid grid-cols-[120px_1fr] border-b border-[#d2c8b3] px-4 py-3 last:border-b-0">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-stage-cyan">{title}</span>
            <span className="text-sm leading-relaxed tracking-[0.01em] text-[#40392f]/84">{body}</span>
          </div>
        ))}
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
