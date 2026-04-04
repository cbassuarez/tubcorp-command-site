import { motion } from 'framer-motion'
import { FunkyShadow } from 'funky-shadow'
import { CommandSections } from '@/components/CommandSections'
import { HeerichStageCanvas } from '@/components/HeerichStageCanvas'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'
import { useTelemetryContext } from '@/app/TelemetryContext'

export function EntryBriefingPage() {
  const spec = pageSpecs.entry
  const telemetry = useTelemetryContext()

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="relative space-y-4 overflow-hidden border border-stage-signal/35 bg-[#efe7d6]/85 p-4 sm:p-6">
        <div className="border border-[#d2c8b3] bg-[#f5efdf]/92 p-3">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-stage-cyan/90">
            Live Volumetric Briefing Feed
          </p>
          <HeerichStageCanvas className="h-[220px] w-full" intensity={telemetry.snapshot.intensity} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[48%] bg-gradient-to-l from-stage-signal/15 to-transparent" />
        <FunkyShadow
          width={680}
          height={120}
          radius={0}
          preset="sunset-strip"
          dither="8x8"
          spread={75}
          pixelScale={2}
          opacity={0.35}
          className="w-full"
        >
          <div className="relative border border-[#d2c8b3] bg-[#f5efdf]/95 px-4 py-6 sm:px-6">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-gradient-to-l from-[#dbcfae]/35 to-transparent" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-stage-cyan/90">
              Public Sector Deployment Portal
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[0.02em] text-[#1f1b15] sm:text-5xl">
              Download the Tub Companion
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed tracking-[0.01em] text-[#4a4336]">
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
