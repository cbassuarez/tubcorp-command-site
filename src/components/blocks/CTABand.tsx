import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CommandButton } from '@/components/CommandButton'
import { resolveActionHref } from '@/lib/actions'
import type { CTABlock, PageCommandAction } from '@/types/contracts'

interface CTABandProps {
  block: CTABlock
}

const variants = {
  light: 'bg-[#eae2d1]/60 text-stage-text border-y border-[#d2c8b3]',
  dark: 'bg-stage-dark text-[#f5f0e4]',
  signal: 'bg-stage-signal/10 text-stage-text border-y border-stage-signal/20',
}

export function CTABand({ block }: CTABandProps) {
  return (
    <section className={`py-12 lg:py-16 ${variants[block.variant]}`}>
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
          <p className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed ${
            block.variant === 'dark' ? 'text-[#9e9888]' : 'text-[#6f6656]'
          }`}>
            {block.body}
          </p>
        )}

        {block.actions.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {block.actions.map((action, i) => (
              <CTAAction key={action.id} action={action} primary={i === 0} isDark={block.variant === 'dark'} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}

function CTAAction({ action, primary, isDark }: { action: PageCommandAction; primary: boolean; isDark: boolean }) {
  const className = `px-6 py-2.5 ${isDark && !primary ? '!border-[#3d382f] !text-[#c4bfb4] hover:!bg-[#2a2620]' : ''}`

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
