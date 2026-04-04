import { Link } from 'react-router-dom'
import { CommandButton } from '@/components/CommandButton'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stage-black px-4 text-stage-text">
      <div className="max-w-md space-y-6 text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-stage-cyan">
          Route Not Found
        </p>
        <h1 className="text-2xl font-semibold tracking-[0.02em] sm:text-3xl">
          The requested path is not registered.
        </h1>
        <p className="text-sm text-[#6f6656]">
          This node does not exist in the TubCorp command network.
        </p>
        <Link to="/">
          <CommandButton label="Return to TubCorp" solid className="mx-auto px-6 py-2.5" />
        </Link>
      </div>
    </div>
  )
}
