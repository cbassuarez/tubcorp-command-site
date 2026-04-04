import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CommandButton } from '@/components/CommandButton'
import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'
import { resolveActionHref } from '@/lib/actions'
import type { SplitBlock, PageCommandAction } from '@/types/contracts'

interface SplitSectionProps {
  block: SplitBlock
}

export function SplitSection({ block }: SplitSectionProps) {
  const imageLeft = block.imagePosition === 'left'

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-[1420px] px-4 lg:px-8">
        <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${imageLeft ? '' : 'lg:[direction:rtl]'}`}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3 }}
            className="lg:[direction:ltr]"
          >
            <AnimatedHeerichCanvas program="idle-drift" theme="light" className="h-[260px] w-full lg:h-[320px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:[direction:ltr]"
          >
            {block.eyebrow && (
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-cyan">
                {block.eyebrow}
              </p>
            )}

            {block.title && (
              <h2 className="text-2xl font-semibold tracking-[0.02em] text-txt">
                {block.title}
              </h2>
            )}

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-txt-secondary">
              {block.body.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {block.actions && block.actions.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {block.actions.map((action, i) => (
                  <SplitAction key={action.id} action={action} primary={i === 0} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SplitAction({ action, primary }: { action: PageCommandAction; primary: boolean }) {
  if (action.kind === 'route') {
    return (
      <Link to={action.target}>
        <CommandButton label={action.label} solid={primary} />
      </Link>
    )
  }

  if (action.kind === 'external') {
    return (
      <CommandButton
        as="a"
        href={resolveActionHref(action)}
        target="_blank"
        rel="noreferrer"
        label={action.label}
        solid={primary}
      />
    )
  }

  return <CommandButton label={action.label} solid={primary} />
}
