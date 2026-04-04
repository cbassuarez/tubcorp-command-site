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
    'font-mono uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stage-cyan/60',
    warning
      ? 'border-stage-amber/65 text-stage-amber hover:border-stage-amber/85 hover:bg-stage-amber/12'
      : 'border-[#c6bca6] text-[#2d281f] hover:border-[#9e947d] hover:bg-[#e9deca]/60',
    active && !solid ? 'border-stage-signal/80 bg-stage-signal/15 text-stage-signal' : '',
    solid ? 'border-stage-signal bg-stage-signal text-[#102213] hover:bg-stage-signal/88' : '',
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
