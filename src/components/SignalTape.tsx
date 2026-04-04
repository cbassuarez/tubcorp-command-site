import { motion } from 'framer-motion'

interface SignalTapeProps {
  lines: string[]
}

export function SignalTape({ lines }: SignalTapeProps) {
  return (
    <div className="relative overflow-hidden border border-white/15 bg-black/70">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />
      <motion.div
        className="flex w-[200%] animate-tape gap-6 py-2 pl-12 pr-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {lines.concat(lines).map((line, index) => (
          <span
            key={`${line}-${index}`}
            className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65"
          >
            {line}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
