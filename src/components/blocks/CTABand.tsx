import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CommandButton } from '@/components/CommandButton'
import { resolveActionHref } from '@/lib/actions'
import type { CTABlock, PageCommandAction } from '@/types/contracts'

interface CTABandProps {
  block: CTABlock
}

const variants = {
  light: 'bg-surface-secondary/60 text-txt border-y border-line',
  dark: 'bg-[#0a0a0a] text-[#e8e8e8]',
  signal: 'bg-accent-signal/10 text-txt border-y border-accent-signal/20',
}

export function CTABand({ block }: CTABandProps) {
  return (
    <section
      data-theme={block.variant === 'dark' ? 'dark' : undefined}
      className={`py-12 lg:py-16 ${variants[block.variant]}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[1420px] px-4 text-center lg:px-8"
      >
        <h2 className="text-2xl font-semibold tracking-[0.02em] sm:text-3xl">
          {block.headline}
        </h2>

        {block.body && (
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-txt-muted">
            {block.body}
          </p>
        )}

        {block.actions.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {block.actions.map((action, i) => (
              <CTAAction key={action.id} action={action} primary={i === 0} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}

function CTAAction({ action, primary }: { action: PageCommandAction; primary: boolean }) {
  const className = 'px-6 py-2.5'

  if (action.kind === 'route') {
    return (
      <Link to={action.target}>
        <CommandButton label={action.label} solid={primary} className={className} />
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
        className={className}
      />
    )
  }

  return <CommandButton label={action.label} solid={primary} className={className} />
}
