import { Mic, MousePointerClick, Eye, Brain, Thermometer, Wifi } from 'lucide-react'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const channels = [
  { icon: MousePointerClick, title: 'Button Input', signal: 'DISCRETE', description: 'Discrete participant actions for immediate intent signaling and policy requests. Each event is timestamped, attributed, and queued for inference scoring.' },
  { icon: Mic, title: 'Ambient Audio', signal: 'CONTINUOUS', description: 'Always-on hearing channel for crowd context, tonal analysis, and environmental noise floor measurement. Feeds the spectral analysis pipeline.' },
  { icon: Eye, title: 'Spatial Tracking', signal: 'CONTINUOUS', description: 'Body posture, trajectory vectors, and density mapping from floor participants. Optical flow analysis drives spatial governance parameters.' },
  { icon: Brain, title: 'ML Mediation', signal: 'FUSION', description: 'Cross-modal fusion layer reconciling competing input channels in real time. Weighted signal arbitration under policy constraints.' },
  { icon: Thermometer, title: 'Environmental Sensors', signal: 'AMBIENT', description: 'Temperature, humidity, and air quality monitoring for governed space compliance. Feeds operational posture decisions.' },
  { icon: Wifi, title: 'Network Heartbeat', signal: 'DIAGNOSTIC', description: 'Companion app connectivity, relay latency, and signal bus health metrics. Drives deployment readiness assessments.' },
]

export function ParticipationPage() {
  const spec = pageSpecs.participation

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <article key={channel.title} className="flex flex-col border border-line bg-surface-elevated p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-accent-signal" />
                    <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-txt">
                      {channel.title}
                    </h2>
                  </div>
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-accent-cyan">
                    {channel.signal}
                  </span>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-txt-secondary">{channel.description}</p>
                <div className="mt-3 h-px bg-line" />
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-accent-signal">Active</p>
              </article>
            )
          })}
        </div>

        {/* Signal fusion matrix */}
        <div className="border border-line bg-surface-secondary p-4">
          <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-cyan">
            Signal Fusion Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-[10px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 pr-4 text-left uppercase tracking-[0.1em] text-txt-muted">Channel</th>
                  <th className="py-2 pr-4 text-left uppercase tracking-[0.1em] text-txt-muted">Priority</th>
                  <th className="py-2 pr-4 text-left uppercase tracking-[0.1em] text-txt-muted">Latency</th>
                  <th className="py-2 text-left uppercase tracking-[0.1em] text-txt-muted">Weight</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Button', 'P0 — Critical', '<8ms', '0.35'],
                  ['Audio', 'P1 — High', '<24ms', '0.28'],
                  ['Spatial', 'P1 — High', '<40ms', '0.22'],
                  ['ML Fusion', 'P2 — Standard', '<60ms', '0.15'],
                ].map(([ch, pri, lat, weight]) => (
                  <tr key={ch} className="border-b border-line/50">
                    <td className="py-2 pr-4 font-bold text-txt">{ch}</td>
                    <td className="py-2 pr-4 text-accent-amber">{pri}</td>
                    <td className="py-2 pr-4 text-txt-secondary">{lat}</td>
                    <td className="py-2 text-accent-signal">{weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CommandSections spec={spec} />
    </PageFrame>
  )
}
