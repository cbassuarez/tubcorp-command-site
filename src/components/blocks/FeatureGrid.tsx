import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { FeatureGridBlock } from '@/types/contracts'

interface FeatureGridProps {
  block: FeatureGridBlock
}

const colsClass = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export function FeatureGrid({ block }: FeatureGridProps) {
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

        <div className={`grid gap-4 ${colsClass[block.columns]}`}>
          {block.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
            >
              <FeatureCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ title, body, link }: { title: string; body: string; icon?: string; link?: string }) {
  const content = (
    <div className="h-full border border-line bg-surface-secondary/60 p-5 transition-colors hover:bg-surface-secondary">
      <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-txt">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-txt-secondary">{body}</p>
    </div>
  )

  if (link) {
    return <Link to={link}>{content}</Link>
  }

  return content
}
