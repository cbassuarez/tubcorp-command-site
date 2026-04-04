import { Sliders, Music, BookOpen, Settings } from 'lucide-react'
import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const surfaces = [
  {
    icon: Sliders,
    code: 'STEER',
    title: 'Preference Vectors',
    program: 'signal-cascade',
    description: 'Preference vectors for live model steering and controlled descriptor bias. Operators submit weighted parameter adjustments that modulate the inference engine in real time.',
    capabilities: ['Real-time parameter modulation', 'Descriptor bias injection', 'Policy-bounded steering range', 'Multi-operator conflict resolution'],
    access: 'Operator L2+',
  },
  {
    icon: Music,
    code: 'PLAY',
    title: 'Audio Contribution',
    program: 'pipeline-flow',
    description: 'Audio contribution lane for participant samples and routed playback. Submitted material enters the processing pipeline where temporal pattern reinforcement and spectral field manipulation produce stage-ready output.',
    capabilities: ['Sample submission queue', 'Spectral analysis preview', 'Processing regime selection', 'Output routing controls'],
    access: 'Operator L1+',
  },
  {
    icon: BookOpen,
    code: 'LEARN',
    title: 'Operational Briefing',
    program: 'idle-drift',
    description: 'Operational briefing surface for curators, operators, and floor technicians. Contains deployment procedures, system architecture documentation, and governance framework reference materials.',
    capabilities: ['Deployment procedure library', 'Architecture diagrams', 'Governance framework docs', 'Incident response playbooks'],
    access: 'All operators',
  },
  {
    icon: Settings,
    code: 'SETTINGS',
    title: 'Administration',
    program: 'idle-drift',
    description: 'Link health monitoring, recovery actions, and privileged administration controls. System diagnostics, credential management, and deployment configuration are managed through this surface.',
    capabilities: ['Link diagnostics', 'Credential rotation', 'Deployment config', 'Recovery actions'],
    access: 'Operator L3 only',
  },
]

export function SurfacesPage() {
  const spec = pageSpecs.surfaces

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-4">
        {surfaces.map((surface) => {
          const Icon = surface.icon
          return (
            <div key={surface.code} className="border border-line bg-surface-elevated">
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <Icon size={16} className="text-accent-cyan" />
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-accent-cyan">{surface.code}</span>
                <span className="text-sm font-medium text-txt">{surface.title}</span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em] text-txt-muted">{surface.access}</span>
              </div>
              <div className="grid gap-4 p-4 lg:grid-cols-[1fr_240px]">
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-txt-secondary">{surface.description}</p>
                  <ul className="grid gap-1 sm:grid-cols-2">
                    {surface.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2 font-mono text-[10px] text-txt-muted">
                        <span className="block h-1 w-1 bg-accent-signal" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                <AnimatedHeerichCanvas
                  program={surface.program}
                  theme="dark"
                  className="h-[140px] w-full"
                />
              </div>
            </div>
          )
        })}
      </div>

      <CommandSections spec={spec} />
    </PageFrame>
  )
}
