import { motion } from 'framer-motion'
import type { QuoteBlock } from '@/types/contracts'

interface QuoteSectionProps {
  block: QuoteBlock
}

export function QuoteSection({ block }: QuoteSectionProps) {
  return (
    <section className="py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[1420px] px-4 lg:px-8"
      >
        <div className="mx-auto max-w-3xl border-l-2 border-accent-signal py-2 pl-6">
          <blockquote className="text-lg font-medium leading-relaxed text-txt sm:text-xl">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          <div className="mt-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-txt">
              {block.attribution}
            </p>
            {(block.role || block.organization) && (
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-txt-muted">
                {[block.role, block.organization].filter(Boolean).join(' // ')}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
