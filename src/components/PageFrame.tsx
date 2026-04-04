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
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">TubCorp Network</p>
        <h1 className="font-mono text-3xl font-black uppercase tracking-[0.15em] text-white sm:text-4xl">{title}</h1>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-white/65">{subtitle}</p>
        <p className="border-l-2 border-stage-cyan pl-2 font-mono text-[11px] uppercase tracking-[0.12em] text-stage-cyan">
          {command}
        </p>
      </header>
      {children}
    </motion.section>
  )
}
