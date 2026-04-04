import type { ReactNode } from 'react'

interface StatusChipProps {
  title: string
  value: string
  active?: boolean
  accent?: 'signal' | 'cyan' | 'amber' | 'alert'
  icon?: ReactNode
}

const ACCENT_CLASS: Record<NonNullable<StatusChipProps['accent']>, string> = {
  signal: 'text-stage-signal border-stage-signal/55',
  cyan: 'text-stage-cyan border-stage-cyan/55',
  amber: 'text-stage-amber border-stage-amber/55',
  alert: 'text-stage-alert border-stage-alert/55',
}

export function StatusChip({ title, value, active = false, accent = 'signal', icon }: StatusChipProps) {
  const accentClass = active ? ACCENT_CLASS[accent] : 'text-[#5e5546] border-[#c7bda8]'
  return (
    <div className={`inline-flex min-w-[120px] items-start justify-between gap-3 border bg-[#efe7d5] px-3 py-2 ${accentClass}`}>
      <div className="flex flex-col">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6f6656]">
          {title}
        </span>
        <span className="font-mono text-[12px] font-bold uppercase tracking-[0.12em]">{value}</span>
      </div>
      {icon ? <span className="mt-0.5 text-[#7b6f5b]">{icon}</span> : null}
    </div>
  )
}
