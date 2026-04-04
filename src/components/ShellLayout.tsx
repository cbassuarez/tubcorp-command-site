import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { CommandButton } from '@/components/CommandButton'
import { SignalTape } from '@/components/SignalTape'
import { StatusStrip } from '@/components/StatusStrip'
import { shellNavigation } from '@/content/siteContent'
import type { TelemetryViewModel } from '@/hooks/useTelemetry'

interface ShellLayoutProps {
  telemetry: TelemetryViewModel
}

export function ShellLayout({ telemetry }: ShellLayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-stage-black text-stage-text">
      <StatusStrip telemetry={telemetry} />

      <aside className="fixed bottom-0 left-0 top-14 z-30 hidden w-[260px] border-r border-white/10 bg-black/82 p-4 md:block">
        <h2 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">Command Rail</h2>
        <nav className="space-y-2">
          {shellNavigation.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <CommandButton label={item.label} active={isActive} className="w-full justify-start px-3" />
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="mx-auto w-full max-w-[1420px] px-4 pb-24 pt-20 md:pl-[290px] md:pr-8">
        <SignalTape lines={telemetry.logLines.slice(0, 8)} />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="mt-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 p-2 md:hidden">
        <div className="grid grid-cols-4 gap-2">
          {shellNavigation.slice(0, 4).map((item) => (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <CommandButton
                  label={item.label}
                  active={isActive}
                  className="w-full px-2 py-1 text-[9px] tracking-[0.14em]"
                  testId={`mobile-nav-${item.label.toLowerCase()}`}
                />
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
