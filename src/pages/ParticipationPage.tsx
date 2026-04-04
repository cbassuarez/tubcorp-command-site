import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const channels = [
  { title: 'Button Input', description: 'Discrete participant actions for immediate intent and policy requests.' },
  { title: 'Off-Site Microphone', description: 'Always-on ambient hearing channel for crowd context and tone.' },
  { title: 'Body Tracking', description: 'Spatial posture, trajectory, and density signals from floor participants.' },
  { title: 'ML Mediation', description: 'Cross-modal fusion layer that reconciles competing input in real time.' },
]

export function ParticipationPage() {
  const spec = pageSpecs.participation

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="grid gap-3 sm:grid-cols-2">
        {channels.map((channel) => (
          <article key={channel.title} className="border border-white/15 bg-[#07111d]/75 p-4">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-stage-signal">
              {channel.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed tracking-[0.01em] text-white/74">{channel.description}</p>
          </article>
        ))}
      </div>
      <CommandSections spec={spec} />
    </PageFrame>
  )
}
