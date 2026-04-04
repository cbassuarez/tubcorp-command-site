import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const channels = [
  { title: 'BUTTON GRID', description: 'DISCRETE MODE REQUESTS AND INTERRUPT GATES.' },
  { title: 'OFF-SITE MIC', description: 'PERSISTENT ENVIRONMENTAL HEARING CHANNEL.' },
  { title: 'KINECT FIELD', description: 'BODY DENSITY, TRAJECTORY, AND ORIENTATION SCANS.' },
  { title: 'ML MEDIATOR', description: 'CROSS-MODAL RESOLUTION LAYER FOR FINAL OUTPUT.' },
]

export function ParticipationPage() {
  const spec = pageSpecs.participation

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="grid gap-3 sm:grid-cols-2">
        {channels.map((channel) => (
          <article key={channel.title} className="border border-white/15 bg-black/60 p-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-stage-signal">{channel.title}</h2>
            <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">
              {channel.description}
            </p>
          </article>
        ))}
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
