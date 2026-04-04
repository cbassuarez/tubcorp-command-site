import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageFrameProps {
  title: string
  subtitle: string
  command: string
  children: ReactNode
}

export function PageFrame({ title, subtitle, command, children }: PageFrameProps) {
  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <header className="space-y-3 border-b border-white/15 pb-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
          TubCorp Systems Platform
        </p>
        <h1 className="text-3xl font-semibold tracking-[0.03em] text-white sm:text-4xl">{title}</h1>
        <p className="text-sm font-medium tracking-[0.02em] text-white/66">{subtitle}</p>
        <p className="border-l-2 border-stage-cyan pl-2 font-mono text-[11px] uppercase tracking-[0.1em] text-stage-cyan/90">
          {command}
        </p>
      </header>
      {children}
    </motion.section>
  )
}
