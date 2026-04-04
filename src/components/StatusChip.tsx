import type { ReactNode } from 'react'
import { SignalStatic } from '@/components/effects/SignalStatic'

interface StatusChipProps {
  title: string
  value: string
  active?: boolean
  accent?: 'signal' | 'cyan' | 'amber' | 'alert'
  icon?: ReactNode
}

const ACCENT_CLASS: Record<NonNullable<StatusChipProps['accent']>, string> = {
  signal: 'text-accent-signal border-accent-signal/55',
  cyan: 'text-accent-cyan border-accent-cyan/55',
  amber: 'text-accent-amber border-accent-amber/55',
  alert: 'text-accent-alert border-accent-alert/55',
}

export function StatusChip({ title, value, active = false, accent = 'signal', icon }: StatusChipProps) {
  const accentClass = active ? ACCENT_CLASS[accent] : 'text-txt-secondary border-line'
  return (
    <SignalStatic value={value}>
      <div className={`inline-flex min-w-[120px] items-start justify-between gap-3 border bg-surface-elevated px-3 py-2 ${accentClass}`}>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-txt-muted">
            {title}
          </span>
          <span className="font-mono text-[12px] font-bold uppercase tracking-[0.12em]">{value}</span>
        </div>
        {icon ? <span className="mt-0.5 text-txt-muted">{icon}</span> : null}
      </div>
    </SignalStatic>
  )
}
