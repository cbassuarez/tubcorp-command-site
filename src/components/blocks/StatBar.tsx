import { motion } from 'framer-motion'
import type { StatBarBlock } from '@/types/contracts'

interface StatBarProps {
  block: StatBarBlock
}

const accentClass = {
  signal: 'text-stage-signal',
  cyan: 'text-stage-cyan',
  amber: 'text-stage-amber',
}

export function StatBar({ block }: StatBarProps) {
  return (
    <section className="border-y border-[#d2c8b3] bg-[#eae2d1]/40 py-8">
      <div className="mx-auto grid max-w-[1420px] gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {block.items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.08 }}
            className="text-center"
          >
            <p className={`font-mono text-2xl font-bold tracking-tight sm:text-3xl ${
              accentClass[item.accent ?? 'signal']
            }`}>
              {item.value}
            </p>
            <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6f6656]">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
