import { AlertTriangle } from 'lucide-react'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const doctrine = [
  { code: 'D-01', rule: 'TRUTHFUL STATUS ONLY', consequence: 'FALSE LINK CLAIMS TRIGGER LOCKDOWN.' },
  { code: 'D-02', rule: 'SIGNAL QUALITY OVER VOLUME', consequence: 'NOISE SPAM LOWERS OPERATOR PRIORITY.' },
  { code: 'D-03', rule: 'DEGRADE TO STANDBY WHEN FEED UNSTABLE', consequence: 'OUTPUT RIGHTS TEMPORARILY REVOKED.' },
]

export function DoctrinePage() {
  const spec = pageSpecs.doctrine

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-2">
        {doctrine.map((item) => (
          <article key={item.code} className="grid gap-2 border border-stage-alert/30 bg-black/65 p-4 sm:grid-cols-[100px_1fr]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.16em] text-stage-alert">
              <AlertTriangle size={14} />
              {item.code}
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-white/85">{item.rule}</p>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-white/60">
                {item.consequence}
              </p>
            </div>
          </article>
        ))}
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
