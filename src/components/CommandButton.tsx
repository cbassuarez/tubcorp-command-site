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
    'inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-2 text-[11px] font-semibold tracking-[0.08em]',
    'font-mono uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60',
    warning
      ? 'border-accent-amber/65 text-accent-amber hover:border-accent-amber/85 hover:bg-accent-amber/12'
      : 'border-line text-txt hover:border-txt-muted hover:bg-surface-secondary/60',
    active && !solid ? 'border-accent-signal/80 bg-accent-signal/15 text-accent-signal' : '',
    solid ? 'border-accent-signal bg-accent-signal text-surface-primary hover:bg-accent-signal/88' : '',
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
