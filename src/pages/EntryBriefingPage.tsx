import { motion } from 'framer-motion'
import { FunkyShadow } from 'funky-shadow'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'
import { useTelemetryContext } from '@/app/TelemetryContext'

export function EntryBriefingPage() {
  const spec = pageSpecs.entry
  const telemetry = useTelemetryContext()

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="relative overflow-hidden border border-stage-signal/30 bg-black/65 p-4 sm:p-6">
        <FunkyShadow
          width={680}
          height={132}
          radius={0}
          preset="sunset-strip"
          dither="8x8"
          spread={110}
          pixelScale={2}
          opacity={0.85}
          className="w-full"
        >
          <div className="border border-white/10 bg-black/90 px-4 py-6 sm:px-6">
            <h2 className="font-mono text-3xl font-black uppercase tracking-[0.17em] text-white sm:text-5xl">
              Download Companion
            </h2>
            <p className="mt-3 max-w-3xl font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/68">
              CLIENT DELIVERY CHANNEL FOR LIVE AUDIENCE OPERATORS. CURRENT SOURCE {telemetry.state.source}.
            </p>
          </div>
        </FunkyShadow>
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-stage-signal/70"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        />
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
