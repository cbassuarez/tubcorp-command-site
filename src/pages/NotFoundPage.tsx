import { Link } from 'react-router-dom'
import { CommandButton } from '@/components/CommandButton'
import { PageFrame } from '@/components/PageFrame'

export function NotFoundPage() {
  return (
    <PageFrame
      title="ROUTE NOT FOUND"
      subtitle="THE REQUESTED COMMAND NODE IS NOT REGISTERED."
      command="scli route inspect --path unknown"
    >
      <div className="border border-stage-alert/35 bg-black/65 p-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-white/70">
          REJOIN THE MAIN COMMAND NETWORK TO CONTINUE.
        </p>
      </div>
      <Link to="/">
        <CommandButton label="RETURN TO ENTRY BRIEFING" solid className="w-full sm:w-auto" />
      </Link>
    </PageFrame>
  )
}
