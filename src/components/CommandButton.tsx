import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CommandButtonProps {
  label: string
  active?: boolean
  solid?: boolean
  warning?: boolean
  onClick?: () => void
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  className?: string
  testId?: string
  icon?: ReactNode
}

export function CommandButton({
  label,
  active = false,
  solid = false,
  warning = false,
  onClick,
  as = 'button',
  href,
  target,
  rel,
  className,
  testId,
  icon,
}: CommandButtonProps) {
  const baseClass = [
    'inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-2 text-[11px] font-bold tracking-[0.18em]',
    'font-mono uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stage-cyan/60',
    warning
      ? 'border-stage-amber/60 text-stage-amber hover:bg-stage-amber/10'
      : 'border-white/20 text-white/85 hover:bg-white/5',
    active && !solid ? 'border-stage-signal/70 text-stage-signal' : '',
    solid ? 'border-stage-signal bg-stage-signal text-black hover:bg-stage-signal/90' : '',
    className ?? '',
  ]
    .join(' ')
    .trim()

  if (as === 'a') {
    return (
      <motion.a
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        href={href}
        target={target}
        rel={rel}
        className={baseClass}
        data-testid={testId}
      >
        {icon}
        <span>{label}</span>
      </motion.a>
    )
  }

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      type="button"
      className={baseClass}
      onClick={onClick}
      data-testid={testId}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  )
}
