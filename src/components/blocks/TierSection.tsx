import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CommandButton } from '@/components/CommandButton'
import { resolveActionHref } from '@/lib/actions'
import type { TierBlock, PageCommandAction } from '@/types/contracts'

interface TierSectionProps {
  block: TierBlock
}

export function TierSection({ block }: TierSectionProps) {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-[1420px] px-4 lg:px-8">
        {(block.eyebrow || block.title) && (
          <div className="mb-8 text-center">
            {block.eyebrow && (
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-cyan">
                {block.eyebrow}
              </p>
            )}
            {block.title && (
              <h2 className="text-2xl font-semibold tracking-[0.02em] text-txt sm:text-3xl">
                {block.title}
              </h2>
            )}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.25, delay: i * 0.08 }}
              className={`flex flex-col border p-6 ${
                tier.highlighted
                  ? 'border-accent-signal bg-accent-signal/5'
                  : 'border-line bg-surface-secondary'
              }`}
            >
              <h3 className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-txt">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-txt-secondary">{tier.description}</p>

              <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-txt-secondary">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 bg-accent-signal" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <TierAction action={tier.cta} highlighted={tier.highlighted} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TierAction({ action, highlighted }: { action: PageCommandAction; highlighted?: boolean }) {
  if (action.kind === 'route') {
    return (
      <Link to={action.target}>
        <CommandButton label={action.label} solid={highlighted} className="w-full" />
      </Link>
    )
  }

  return (
    <CommandButton
      as="a"
      href={resolveActionHref(action)}
      label={action.label}
      solid={highlighted}
      className="w-full"
    />
  )
}
