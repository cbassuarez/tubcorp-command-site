import { motion } from 'framer-motion'

interface SignalTapeProps {
  lines: string[]
}

export function SignalTape({ lines }: SignalTapeProps) {
  return (
    <div className="relative overflow-hidden border border-[#d2c8b3] bg-[#ece3d1]/84">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#ece3d1] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#ece3d1] to-transparent" />
      <motion.div
        className="flex w-[200%] animate-tape gap-6 py-2 pl-12 pr-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {lines.concat(lines).map((line, index) => (
          <span
            key={`${line}-${index}`}
            className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3f382d]/80"
          >
            {line}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
