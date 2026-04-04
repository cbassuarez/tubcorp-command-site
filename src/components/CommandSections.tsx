import { Link } from 'react-router-dom'
import { CommandButton } from '@/components/CommandButton'
import { resolveActionHref } from '@/lib/actions'
import type { CommandPageSpec, PageCommandAction } from '@/types/contracts'

interface CommandSectionsProps {
  spec: CommandPageSpec
}

export function CommandSections({ spec }: CommandSectionsProps) {
  return (
    <div className="space-y-4">
      {spec.sections.map((section) => (
        <section key={section.id} className="space-y-3 border border-white/15 bg-black/55 p-4">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-stage-signal">
            {section.title}
          </h2>
          <div className="space-y-2">
            {section.body.map((line) => (
              <p key={line} className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-white/72">
                {line}
              </p>
            ))}
          </div>
          {section.directives && section.directives.length > 0 ? (
            <div className="space-y-2 border-t border-white/10 pt-3">
              {section.directives.map((directive) => (
                <div key={directive.id} className="border border-white/10 bg-black/70 p-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-stage-cyan">
                    {directive.code}
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">
                    {directive.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/56">
                    {directive.body}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {spec.actions.map((action) => (
          <CommandActionButton key={action.id} action={action} />
        ))}
      </div>
    </div>
  )
}

function CommandActionButton({ action }: { action: PageCommandAction }) {
  if (action.kind === 'route') {
    return (
      <Link to={action.target}>
        <CommandButton label={action.label} className="w-full" />
      </Link>
    )
  }

  if (action.kind === 'external') {
    const href = resolveActionHref(action)
    return (
      <CommandButton
        as="a"
        href={href}
        target="_blank"
        rel="noreferrer"
        label={action.label}
        className="w-full"
      />
    )
  }

  return <CommandButton label={action.label} className="w-full" warning />
}
