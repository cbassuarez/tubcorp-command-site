import { motion } from 'framer-motion'
import { HoverCanvas } from '@/components/effects/HoverCanvas'
import type { PipelineBlock } from '@/types/contracts'

interface PipelineSectionProps {
  block: PipelineBlock
}

export function PipelineSection({ block }: PipelineSectionProps) {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-[1420px] px-4 lg:px-8">
        {(block.eyebrow || block.title) && (
          <div className="mb-8">
            {block.eyebrow && (
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-cyan">
                {block.eyebrow}
              </p>
            )}
            {block.title && (
              <h2 className="text-2xl font-semibold tracking-[0.02em] text-txt sm:text-3xl">
                {block.title}
              </h2>
            )}
          </div>
        )}

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-line lg:block" />

          <div className="space-y-6 lg:space-y-8">
            {block.steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.25, delay: i * 0.1 }}
                className="flex gap-4 lg:gap-6"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center border border-line bg-surface-elevated font-mono text-sm font-bold text-accent-signal">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <HoverCanvas className="flex-1">
                  <div className="border border-line bg-surface-secondary p-5">
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-txt">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-txt-secondary">{step.body}</p>
                  </div>
                </HoverCanvas>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
