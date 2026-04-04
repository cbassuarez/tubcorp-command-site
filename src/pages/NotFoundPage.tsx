import { Link } from 'react-router-dom'
import { CommandButton } from '@/components/CommandButton'

export function NotFoundPage() {
  return (
    <div data-theme="light" className="flex min-h-screen items-center justify-center bg-surface-primary px-4 text-txt">
      <div className="max-w-md space-y-6 text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-cyan">
          Route Not Found
        </p>
        <h1 className="text-2xl font-semibold tracking-[0.02em] sm:text-3xl">
          The requested path is not registered.
        </h1>
        <p className="text-sm text-txt-muted">
          This node does not exist in the TubCorp command network.
        </p>
        <Link to="/">
          <CommandButton label="Return to TubCorp" solid className="mx-auto px-6 py-2.5" />
        </Link>
      </div>
    </div>
  )
}
