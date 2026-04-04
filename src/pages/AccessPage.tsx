import { Download, ShieldCheck } from 'lucide-react'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const roles = [
  { id: 'audience-op', title: 'Audience Operator', detail: 'Real-time STEER and PLAY rights for supervised participant input.' },
  { id: 'floor-tech', title: 'Floor Technician', detail: 'Route diagnostics, handshake oversight, and recovery authority.' },
  { id: 'archive-review', title: 'Archive Review', detail: 'Session log inspection, traceability, and post-show auditing.' },
]

export function AccessPage() {
  const spec = pageSpecs.access

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="grid gap-3 md:grid-cols-3">
        {roles.map((role) => (
          <article key={role.id} className="space-y-2 border border-[#d2c8b3] bg-[#efe7d6]/78 p-4">
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.1em] text-stage-signal">{role.title}</p>
            <p className="text-sm leading-relaxed tracking-[0.01em] text-[#40392f]/84">{role.detail}</p>
            <div className="flex items-center gap-2 border border-[#d2c8b3] bg-[#f5efdf] p-2 font-mono text-[10px] uppercase tracking-[0.1em] text-stage-cyan">
              <ShieldCheck size={13} />
              Channel Ready
            </div>
          </article>
        ))}
      </div>
      <div className="flex items-center gap-2 border border-stage-amber/35 bg-[#f5efdf] p-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-stage-amber">
        <Download size={13} />
        Client deployment is required before live participation can be enabled.
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
