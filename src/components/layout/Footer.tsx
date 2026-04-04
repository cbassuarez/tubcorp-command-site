import { Link } from 'react-router-dom'
import { TubDitherSprite } from '@/components/TubDitherSprite'
import { footerColumns } from '@/content/navigation'

export function Footer() {
  return (
    <footer className="border-t border-[#d2c8b3] bg-[#eae2d1]/60">
      <div className="mx-auto max-w-[1420px] px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <TubDitherSprite />
            <p className="max-w-[240px] text-xs leading-relaxed text-[#6f6656]">
              End-to-end infrastructure for participatory public-space governance. Signal processing, inference governance, and operator deployment.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#5e5546]">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-xs text-[#6f6656] transition-colors hover:text-stage-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#d2c8b3] pt-6 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8a8174]">
            &copy; {new Date().getFullYear()} TubCorp Systems Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8a8174] transition-colors hover:text-stage-text"
            >
              Privacy & Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
