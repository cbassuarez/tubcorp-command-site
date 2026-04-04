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
      <div className="relative overflow-hidden border border-stage-signal/35 bg-[#071626]/80 p-4 sm:p-6">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[48%] bg-gradient-to-l from-stage-signal/15 to-transparent" />
        <FunkyShadow
          width={680}
          height={120}
          radius={0}
          preset="sunset-strip"
          dither="8x8"
          spread={75}
          pixelScale={2}
          opacity={0.5}
          className="w-full"
        >
          <div className="border border-white/10 bg-[#02070f]/90 px-4 py-6 sm:px-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-stage-cyan/90">
              Public Sector Deployment Portal
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[0.02em] text-white sm:text-5xl">
              Download the Tub Companion
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed tracking-[0.01em] text-white/72">
              Provision field operators in minutes. The companion app connects controlled public input to the live stage
              pipeline with policy-aligned telemetry. Source mode: {telemetry.state.source}.
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
