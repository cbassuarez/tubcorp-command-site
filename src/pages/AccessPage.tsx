import { Download, ShieldCheck } from 'lucide-react'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const roles = [
  { id: 'audience-op', title: 'AUDIENCE OPERATOR', detail: 'REAL-TIME STEER + PLAY PARTICIPATION RIGHTS.' },
  { id: 'floor-tech', title: 'FLOOR TECH', detail: 'ROUTE DIAGNOSTICS, HANDSHAKE, AND RECOVERY AUTHORITY.' },
  { id: 'archive-review', title: 'ARCHIVE REVIEW', detail: 'SESSION LOG INSPECTION + SNAPSHOT AUDITING.' },
]

export function AccessPage() {
  const spec = pageSpecs.access

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="grid gap-3 md:grid-cols-3">
        {roles.map((role) => (
          <article key={role.id} className="space-y-2 border border-white/15 bg-black/65 p-4">
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.15em] text-stage-signal">{role.title}</p>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-white/63">{role.detail}</p>
            <div className="flex items-center gap-2 border border-white/10 bg-black/70 p-2 font-mono text-[10px] uppercase tracking-[0.12em] text-stage-cyan">
              <ShieldCheck size={13} />
              CHANNEL READY
            </div>
          </article>
        ))}
      </div>
      <div className="flex items-center gap-2 border border-stage-amber/35 bg-black/65 p-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-stage-amber">
        <Download size={13} />
        CLIENT DELIVERY REQUIRED BEFORE LIVE PARTICIPATION.
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
