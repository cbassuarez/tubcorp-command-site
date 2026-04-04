import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { TopNav } from '@/components/layout/TopNav'
import { Footer } from '@/components/layout/Footer'

export function MarketingLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <div data-theme="light" className="min-h-screen bg-surface-primary text-txt">
      <TopNav />

      <main className="pt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
