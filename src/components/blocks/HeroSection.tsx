import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CommandButton } from '@/components/CommandButton'
import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'
import { resolveActionHref } from '@/lib/actions'
import type { HeroBlock, PageCommandAction } from '@/types/contracts'

interface HeroSectionProps {
  block: HeroBlock
}

export function HeroSection({ block }: HeroSectionProps) {
  const isDark = block.variant === 'dark'
  const isCompact = block.variant === 'compact'
  const isFull = block.variant === 'full'

  return (
    <section
      data-theme={isDark ? 'dark' : undefined}
      className={`relative overflow-hidden ${
        isDark
          ? 'bg-surface-primary text-txt'
          : 'text-txt'
      } ${isCompact ? 'py-12 lg:py-16' : 'py-20 lg:py-32'}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative mx-auto max-w-[1420px] px-4 lg:px-8">
        <div className={isFull ? 'grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`${isCompact ? 'max-w-2xl' : isFull ? '' : 'max-w-3xl'}`}
          >
            {block.eyebrow && (
              <p className={`mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${
                isDark ? 'text-accent-signal' : 'text-accent-cyan'
              }`}>
                {block.eyebrow}
              </p>
            )}

            <h1 className={`font-semibold tracking-[0.02em] ${
              isCompact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl lg:text-5xl'
            }`}>
              {block.headline}
            </h1>

            {block.subheadline && (
              <p className="mt-4 text-base leading-relaxed text-txt-secondary sm:text-lg">
                {block.subheadline}
              </p>
            )}

            {block.body && (
              <p className="mt-4 text-sm leading-relaxed text-txt-muted">
                {block.body}
              </p>
            )}

            {block.actions.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {block.actions.map((action, i) => (
                  <HeroAction key={action.id} action={action} primary={i === 0} />
                ))}
              </div>
            )}
          </motion.div>

          {isFull && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedHeerichCanvas
                program="home-hero"
                theme="light"
                className="h-[280px] w-full sm:h-[340px] lg:h-[400px] !border-line/50"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

function HeroAction({
  action,
  primary,
}: {
  action: PageCommandAction
  primary: boolean
}) {
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
