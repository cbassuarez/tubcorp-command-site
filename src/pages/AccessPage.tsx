import { Download, ShieldCheck, User, Wrench, Archive } from 'lucide-react'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const roles = [
  {
    icon: User,
    id: 'audience-op',
    title: 'Audience Operator',
    clearance: 'L1',
    detail: 'Real-time STEER and PLAY rights for supervised participant input. Operators at this level can submit preference vectors and audio contributions within policy-bounded parameters.',
    capabilities: ['STEER surface access', 'PLAY surface access', 'LEARN surface access', 'Basic telemetry view'],
    requirements: ['Companion app deployed', 'Active session link', 'Briefing acknowledgment'],
  },
  {
    icon: Wrench,
    id: 'floor-tech',
    title: 'Floor Technician',
    clearance: 'L2',
    detail: 'Route diagnostics, handshake oversight, and recovery authority. Floor technicians can monitor signal health, initiate recovery procedures, and override channel routing under governance constraints.',
    capabilities: ['All L1 capabilities', 'Route diagnostics', 'Recovery actions', 'Channel override (governed)'],
    requirements: ['L2 credential provisioned', 'On-site verification', 'Doctrine attestation'],
  },
  {
    icon: Archive,
    id: 'archive-review',
    title: 'Archive Reviewer',
    clearance: 'L3',
    detail: 'Session log inspection, traceability, and post-deployment auditing. Full access to telemetry archives, reasoning traces, and governance compliance records for review and audit purposes.',
    capabilities: ['All L2 capabilities', 'Session log access', 'Reasoning trace review', 'Compliance audit tools'],
    requirements: ['L3 credential provisioned', 'Background verification', 'Governance board approval'],
  },
]

const checklist = [
  'TubCorp Companion app installed and updated',
  'Active network connection to governed space relay',
  'Operator credential provisioned at appropriate clearance level',
  'Doctrine attestation completed for current deployment epoch',
  'Session link established and verified',
]

export function AccessPage() {
  const spec = pageSpecs.access

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-4">
        {/* Role cards */}
        <div className="grid gap-3 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <div key={role.id} className="flex flex-col border border-line bg-surface-elevated">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-accent-signal" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-txt">{role.title}</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-accent-cyan">{role.clearance}</span>
                </div>
                <div className="flex-1 space-y-3 p-4">
                  <p className="text-sm leading-relaxed text-txt-secondary">{role.detail}</p>

                  <div>
                    <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-txt-muted">Capabilities</p>
                    <ul className="space-y-1">
                      {role.capabilities.map((cap) => (
                        <li key={cap} className="flex items-center gap-2 font-mono text-[10px] text-accent-signal">
                          <span className="block h-1 w-1 bg-accent-signal" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-txt-muted">Requirements</p>
                    <ul className="space-y-1">
                      {role.requirements.map((req) => (
                        <li key={req} className="flex items-center gap-2 font-mono text-[10px] text-txt-muted">
                          <ShieldCheck size={10} className="text-accent-cyan" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Deployment checklist */}
        <div className="border border-line bg-surface-secondary p-4">
          <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-cyan">
            Deployment Checklist
          </h3>
          <ul className="space-y-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 font-mono text-[10px] text-txt-secondary">
                <span className="flex h-4 w-4 items-center justify-center border border-line bg-surface-elevated text-[8px] text-txt-muted">
                  &mdash;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Warning banner */}
        <div className="flex items-center gap-3 border border-accent-amber/35 bg-accent-amber/5 p-3">
          <Download size={14} className="shrink-0 text-accent-amber" />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-accent-amber">
            Client deployment is required before live participation can be enabled. Contact your deployment
            administrator if credentials have not been provisioned.
          </p>
        </div>
      </div>

      <CommandSections spec={spec} />
    </PageFrame>
  )
}
