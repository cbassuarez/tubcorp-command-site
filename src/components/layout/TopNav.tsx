import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { TubDitherSprite } from '@/components/TubDitherSprite'
import { topNavigation, type NavItem } from '@/content/navigation'
import { MobileMenu } from '@/components/layout/MobileMenu'

export function TopNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpen(false)
  }, [location.pathname])

  function handleEnter(label: string) {
    clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d2c8b3] bg-[#f5efdf]/96 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1420px] items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <TubDitherSprite />
          </Link>

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

          <div className="flex items-center gap-3">
            <Link
              to="/download"
              className="hidden rounded border border-stage-signal bg-stage-signal/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-stage-signal transition-colors hover:bg-stage-signal/20 sm:block"
            >
              Download
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

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
    ? 'rounded border border-stage-signal/40 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-stage-signal transition-colors hover:bg-stage-signal/10'
    : 'px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5e5546] transition-colors hover:text-stage-text'

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
            className="absolute left-0 top-full z-50 mt-1 min-w-[220px] border border-[#d2c8b3] bg-[#f5efdf] p-2 shadow-md"
          >
            {item.children!.map((child) => (
              <NavLink
                key={child.path}
                to={child.path!}
                className={({ isActive }) =>
                  `block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors ${
                    isActive
                      ? 'bg-stage-signal/10 text-stage-signal'
                      : 'text-[#5e5546] hover:bg-[#eae2d1] hover:text-stage-text'
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
