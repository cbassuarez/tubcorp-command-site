import { motion } from 'framer-motion'
import { Activity, Lock, Radar } from 'lucide-react'
import { StatusChip } from '@/components/StatusChip'
import { TubDitherSprite } from '@/components/TubDitherSprite'
import type { TelemetryViewModel } from '@/hooks/useTelemetry'

interface StatusStripProps {
  telemetry: TelemetryViewModel
}

export function StatusStrip({ telemetry }: StatusStripProps) {
  const { state, sourceLabel } = telemetry

  return (
    <div className="fixed left-0 right-0 top-0 z-40 border-b border-[#d2c8b3] bg-[#f6f1e5]/95 backdrop-blur-sm">
      <motion.div
        className="mx-auto flex max-w-[1400px] items-center gap-2 px-3 py-2 sm:px-5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <StatusChip
          title="LINK"
          value={state.link}
          active={state.link !== 'MISSING'}
          accent={state.link === 'MISSING' ? 'alert' : state.link === 'SIMULATED' ? 'amber' : 'signal'}
          icon={<Activity size={13} />}
        />
        <StatusChip
          title="FEED"
          value={state.freshness}
          active={state.freshness !== 'STANDBY'}
          accent={state.freshness === 'LIVE' ? 'cyan' : state.freshness === 'DEGRADED' ? 'amber' : 'alert'}
          icon={<Radar size={13} />}
        />
        <StatusChip
          title="ACCESS"
          value={state.access}
          active={state.access === 'OPEN'}
          accent={state.access === 'OPEN' ? 'signal' : state.access === 'RESTRICTED' ? 'amber' : 'alert'}
          icon={<Lock size={13} />}
        />
        <TubDitherSprite />
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6f6656]">SOURCE</span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2f2a21]">{sourceLabel}</span>
        </div>
      </motion.div>
    </div>
  )
}
