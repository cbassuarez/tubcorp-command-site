import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Activity, Radar, Lock } from 'lucide-react'
import { TelemetryContext } from '@/app/TelemetryContext'
import { StatusChip } from '@/components/StatusChip'
import type { TelemetryWidgetBlock } from '@/types/contracts'

interface TelemetryWidgetProps {
  block: TelemetryWidgetBlock
}

export function TelemetryWidget({ block }: TelemetryWidgetProps) {
  const telemetry = useContext(TelemetryContext)

  if (!telemetry) return null

  const { state } = telemetry

  return (
    <section className="py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[1420px] px-4 lg:px-8"
      >
        {block.title && (
          <h2 className="mb-6 text-2xl font-semibold tracking-[0.02em] text-txt">
            {block.title}
          </h2>
        )}

        <div className="inline-flex gap-3 border border-line bg-surface-secondary/60 p-4">
          <StatusChip
            title="LINK"
            value={state.link}
            active
            accent={state.link === 'MISSING' ? 'alert' : state.link === 'SIMULATED' ? 'amber' : 'signal'}
            icon={<Activity size={12} />}
          />
          <StatusChip
            title="FEED"
            value={state.freshness}
            active
            accent={state.freshness === 'LIVE' ? 'cyan' : state.freshness === 'DEGRADED' ? 'amber' : 'alert'}
            icon={<Radar size={12} />}
          />
          <StatusChip
            title="ACCESS"
            value={state.access}
            active
            accent={state.access === 'OPEN' ? 'signal' : state.access === 'RESTRICTED' ? 'amber' : 'alert'}
            icon={<Lock size={12} />}
          />
        </div>
      </motion.div>
    </section>
  )
}
