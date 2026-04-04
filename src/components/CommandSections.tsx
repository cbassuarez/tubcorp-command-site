import { Link } from 'react-router-dom'
import { CommandButton } from '@/components/CommandButton'
import { resolveActionHref } from '@/lib/actions'
import type { CommandPageSpec, PageCommandAction } from '@/types/contracts'

interface CommandSectionsProps {
  spec: CommandPageSpec
}

export function CommandSections({ spec }: CommandSectionsProps) {
  return (
    <div className="space-y-5">
      {spec.sections.map((section) => (
        <section key={section.id} className="space-y-3 border border-line bg-surface-elevated/78 p-5">
          <h2 className="text-base font-semibold tracking-[0.02em] text-txt">
            {section.title}
          </h2>
          <div className="space-y-2">
            {section.body.map((line) => (
              <p key={line} className="text-sm leading-relaxed tracking-[0.01em] text-txt-secondary/85">
                {line}
              </p>
            ))}
          </div>
          {section.directives && section.directives.length > 0 ? (
            <div className="space-y-2 border-t border-line pt-3">
              {section.directives.map((directive) => (
                <div key={directive.id} className="border border-line bg-surface-secondary p-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-cyan">
                    {directive.code}
                  </p>
                  <p className="mt-1 text-sm font-medium tracking-[0.01em] text-txt">
                    {directive.title}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.02em] text-txt-secondary">
                    {directive.body}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {spec.actions.map((action, index) => (
          <CommandActionButton key={action.id} action={action} emphasize={index === 0} />
        ))}
      </div>
    </div>
  )
}

function CommandActionButton({ action, emphasize }: { action: PageCommandAction; emphasize?: boolean }) {
  if (action.kind === 'route') {
    return (
      <Link to={action.target}>
        <CommandButton label={action.label} className="w-full" solid={emphasize} />
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
        solid={emphasize}
      />
    )
  }

  return <CommandButton label={action.label} className="w-full" warning solid={emphasize} />
}
