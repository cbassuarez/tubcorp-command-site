import { AlertTriangle } from 'lucide-react'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const doctrine = [
  { code: 'D-01', rule: 'Truthful status reporting only', consequence: 'False link claims trigger immediate control lockdown.' },
  { code: 'D-02', rule: 'Signal quality over raw volume', consequence: 'Noisy input streams are deprioritized by policy.' },
  { code: 'D-03', rule: 'Shift to standby when feed is unstable', consequence: 'Output rights are temporarily revoked pending review.' },
]

export function DoctrinePage() {
  const spec = pageSpecs.doctrine

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-2">
        {doctrine.map((item) => (
          <article key={item.code} className="grid gap-2 border border-stage-alert/35 bg-[#f1e8d8] p-4 sm:grid-cols-[100px_1fr]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.1em] text-stage-alert">
              <AlertTriangle size={14} />
              {item.code}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium tracking-[0.01em] text-[#261f1a]">{item.rule}</p>
              <p className="text-xs tracking-[0.02em] text-[#665c4d]">{item.consequence}</p>
            </div>
          </article>
        ))}
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
