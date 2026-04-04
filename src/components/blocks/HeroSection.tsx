import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CommandButton } from '@/components/CommandButton'
import { resolveActionHref } from '@/lib/actions'
import type { HeroBlock, PageCommandAction } from '@/types/contracts'

interface HeroSectionProps {
  block: HeroBlock
}

export function HeroSection({ block }: HeroSectionProps) {
  const isDark = block.variant === 'dark'
  const isCompact = block.variant === 'compact'

  return (
    <section
      className={`relative overflow-hidden ${
        isDark
          ? 'bg-stage-dark text-[#f5f0e4]'
          : 'bg-stage-black text-stage-text'
      } ${isCompact ? 'py-12 lg:py-16' : 'py-20 lg:py-32'}`}
    >
      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative mx-auto max-w-[1420px] px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`${isCompact ? 'max-w-2xl' : 'max-w-3xl'}`}
        >
          {block.eyebrow && (
            <p className={`mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${
              isDark ? 'text-stage-signal' : 'text-stage-cyan'
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
            <p className={`mt-4 text-base leading-relaxed sm:text-lg ${
              isDark ? 'text-[#c4bfb4]' : 'text-[#534b3f]'
            }`}>
              {block.subheadline}
            </p>
          )}

          {block.body && (
            <p className={`mt-4 text-sm leading-relaxed ${
              isDark ? 'text-[#9e9888]' : 'text-[#6f6656]'
            }`}>
              {block.body}
            </p>
          )}

          {block.actions.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {block.actions.map((action, i) => (
                <HeroAction key={action.id} action={action} primary={i === 0} isDark={isDark} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function HeroAction({
  action,
  primary,
  isDark,
}: {
  action: PageCommandAction
  primary: boolean
  isDark: boolean
}) {
  const className = primary
    ? 'px-6 py-2.5'
    : `px-6 py-2.5 ${isDark ? '!border-[#3d382f] !text-[#c4bfb4] hover:!bg-[#2a2620]' : ''}`

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
