import { motion } from 'framer-motion'
import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'
import type { HeerichBlock } from '@/types/contracts'

interface HeerichVisualProps {
  block: HeerichBlock
}

export function HeerichVisual({ block }: HeerichVisualProps) {
  return (
    <section className="py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-[1420px] px-4 lg:px-8"
      >
        <AnimatedHeerichCanvas
          program={block.program}
          theme="light"
          className={block.height ? `w-full ${block.height}` : 'h-[240px] w-full lg:h-[320px]'}
        />
        {block.caption && (
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-txt-muted">
            {block.caption}
          </p>
        )}
      </motion.div>
    </section>
  )
}
