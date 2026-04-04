import { useState, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { TubCorpWordmark } from '@/components/TubCorpWordmark'
import { topNavigation, type NavItem } from '@/content/navigation'
import { MobileMenu } from '@/components/layout/MobileMenu'

export function TopNav() {
  const location = useLocation()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface-overlay backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1420px] items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <TubCorpWordmark />
          </Link>

          <NavBar key={location.pathname} />

          <div className="flex items-center gap-3">
            <Link
              to="/download"
              className="hidden rounded border border-accent-signal bg-accent-signal/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent-signal transition-colors hover:bg-accent-signal/20 sm:block"
            >
              Download
            </Link>
            <MobileToggle key={`mobile-${location.pathname}`} />
          </div>
        </div>
      </header>
    </>
  )
}

function NavBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  function handleEnter(label: string) {
    clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {topNavigation.map((item) => (
        <NavItemDesktop
          key={item.label}
          item={item}
          isOpen={openDropdown === item.label}
          onEnter={() => handleEnter(item.label)}
          onLeave={handleLeave}
        />
      ))}
    </nav>
  )
}

function MobileToggle() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function NavItemDesktop({
  item,
  isOpen,
  onEnter,
  onLeave,
}: {
  item: NavItem
  isOpen: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const hasChildren = item.children && item.children.length > 0

  const linkClass = item.highlighted
    ? 'rounded border border-accent-signal/40 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent-signal transition-colors hover:bg-accent-signal/10'
    : 'px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-txt-secondary transition-colors hover:text-txt'

  if (!hasChildren) {
    return (
      <NavLink to={item.path!} className={linkClass}>
        {item.label}
      </NavLink>
    )
  }

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <NavLink to={item.path!} className={linkClass}>
        {item.label}
      </NavLink>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-1 min-w-[220px] border border-line bg-surface-primary p-2 shadow-md"
          >
            {item.children!.map((child) => (
              <NavLink
                key={child.path}
                to={child.path!}
                className={({ isActive }) =>
                  `block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors ${
                    isActive
                      ? 'bg-accent-signal/10 text-accent-signal'
                      : 'text-txt-secondary hover:bg-surface-secondary hover:text-txt'
                  }`
                }
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
