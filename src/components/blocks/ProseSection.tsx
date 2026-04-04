import { motion } from 'framer-motion'
import type { ProseBlock } from '@/types/contracts'

interface ProseSectionProps {
  block: ProseBlock
}

export function ProseSection({ block }: ProseSectionProps) {
  const centered = block.align === 'center'

  return (
    <section className="py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.3 }}
        className={`mx-auto max-w-[1420px] px-4 lg:px-8 ${centered ? 'text-center' : ''}`}
      >
        {block.eyebrow && (
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-cyan">
            {block.eyebrow}
          </p>
        )}

        {block.title && (
          <h2 className={`text-2xl font-semibold tracking-[0.02em] text-txt sm:text-3xl ${
            centered ? 'mx-auto max-w-2xl' : ''
          }`}>
            {block.title}
          </h2>
        )}

        <div className={`mt-4 space-y-4 text-sm leading-relaxed text-txt-secondary sm:text-base ${
          centered ? 'mx-auto max-w-2xl' : 'max-w-3xl'
        }`}>
          {block.body.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
