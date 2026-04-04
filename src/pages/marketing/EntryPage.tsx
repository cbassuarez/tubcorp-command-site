import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'
import { CommandButton } from '@/components/CommandButton'

export function EntryPage() {
  const [phase, setPhase] = useState<'induction' | 'briefing'>('induction')

  useEffect(() => {
    const timer = setTimeout(() => setPhase('briefing'), 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {phase === 'induction' && (
          <motion.div
            key="induction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8"
            onClick={() => setPhase('briefing')}
          >
            <AnimatedHeerichCanvas
              program="entry-induction"
              theme="dark"
              className="h-[240px] w-[240px] !border-accent-signal/30 sm:h-[320px] sm:w-[320px]"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-signal"
            >
              Signal Contact Established
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.3, 0.6, 0.4] }}
              transition={{ delay: 2, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              className="font-mono text-[9px] uppercase tracking-[0.14em] text-txt-muted"
            >
              Tap to continue
            </motion.p>
          </motion.div>
        )}

        {phase === 'briefing' && (
          <motion.div
            key="briefing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto max-w-lg space-y-8 text-center"
          >
            <div className="space-y-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-signal">
                TubCorp // Governed Environment
              </p>
              <h1 className="text-2xl font-semibold tracking-[0.02em] text-txt sm:text-3xl">
                You have connected to a governed public space.
              </h1>
              <p className="text-sm leading-relaxed text-txt-muted">
                This environment is operated by TubCorp. Participant signals — including audio,
                spatial presence, and discrete input events — are processed in real time by a
                policy-controlled governance infrastructure. All interactions are logged and auditable.
              </p>
            </div>

            <div className="space-y-3 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-txt-muted">
                To participate, deploy the TubCorp Companion.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link to="/download">
                  <CommandButton label="Download Companion" solid className="w-full sm:w-auto px-6 py-2.5" />
                </Link>
                <Link to="/">
                  <CommandButton label="Learn More" className="w-full sm:w-auto px-6 py-2.5" />
                </Link>
              </div>
            </div>

            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-txt-secondary">
              By continuing, you acknowledge that you are in a governed environment subject to the
              TubCorp{' '}
              <Link to="/privacy" className="text-accent-cyan underline">
                Privacy & Compliance
              </Link>{' '}
              framework.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
