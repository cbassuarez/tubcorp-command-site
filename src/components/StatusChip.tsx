import type { ReactNode } from 'react'

interface StatusChipProps {
  title: string
  value: string
  active?: boolean
  accent?: 'signal' | 'cyan' | 'amber' | 'alert'
  icon?: ReactNode
}

const ACCENT_CLASS: Record<NonNullable<StatusChipProps['accent']>, string> = {
  signal: 'text-stage-signal border-stage-signal/50',
  cyan: 'text-stage-cyan border-stage-cyan/50',
  amber: 'text-stage-amber border-stage-amber/50',
  alert: 'text-stage-alert border-stage-alert/50',
}

export function StatusChip({ title, value, active = false, accent = 'signal', icon }: StatusChipProps) {
  const accentClass = active ? ACCENT_CLASS[accent] : 'text-white/70 border-white/20'
  return (
    <div className={`inline-flex min-w-[120px] items-start justify-between gap-3 border bg-black/40 px-3 py-2 ${accentClass}`}>
      <div className="flex flex-col">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55">
          {title}
        </span>
        <span className="font-mono text-[12px] font-bold uppercase tracking-[0.12em]">{value}</span>
      </div>
      {icon ? <span className="mt-0.5 text-white/65">{icon}</span> : null}
    </div>
  )
}
