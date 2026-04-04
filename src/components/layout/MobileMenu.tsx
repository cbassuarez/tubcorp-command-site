import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { topNavigation } from '@/content/navigation'

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 overflow-y-auto bg-[#f5efdf]/98 pt-14 backdrop-blur-sm"
    >
      <nav className="mx-auto max-w-lg space-y-1 p-6">
        {topNavigation.map((item) => (
          <div key={item.label}>
            <NavLink
              to={item.path!}
              onClick={onClose}
              className={({ isActive }) =>
                `block border-b border-[#d2c8b3]/50 px-2 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.1em] transition-colors ${
                  isActive ? 'text-stage-signal' : 'text-stage-text'
                }`
              }
            >
              {item.label}
            </NavLink>
            {item.children?.map((child) => (
              <NavLink
                key={child.path}
                to={child.path!}
                onClick={onClose}
                className={({ isActive }) =>
                  `block py-2.5 pl-6 pr-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                    isActive ? 'text-stage-signal' : 'text-[#6f6656]'
                  }`
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        ))}

        <div className="pt-4">
          <Link
            to="/download"
            onClick={onClose}
            className="block w-full border border-stage-signal bg-stage-signal/10 px-4 py-3 text-center font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-stage-signal"
          >
            Download Companion
          </Link>
        </div>
      </nav>
    </motion.div>
  )
}
