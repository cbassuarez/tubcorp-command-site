import { Link } from 'react-router-dom'
import { TubCorpWordmark } from '@/components/TubCorpWordmark'
import { footerColumns } from '@/content/navigation'

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-secondary/60">
      <div className="mx-auto max-w-[1420px] px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <TubCorpWordmark />
            <p className="max-w-[240px] text-xs leading-relaxed text-txt-muted">
              End-to-end infrastructure for participatory public-space governance. Signal processing, inference governance, and operator deployment.
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-txt-muted/60">
              A Meridian Compliance Group Company
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-txt-secondary">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-xs text-txt-muted transition-colors hover:text-txt"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-txt-muted">
            &copy; {new Date().getFullYear()} Meridian Compliance Group // TubCorp Systems Division. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-txt-muted transition-colors hover:text-txt"
            >
              Privacy & Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
