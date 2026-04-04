import { AlertTriangle, ShieldCheck } from 'lucide-react'
import { CommandSections } from '@/components/CommandSections'
import { PageFrame } from '@/components/PageFrame'
import { pageSpecs } from '@/content/siteContent'

const doctrine = [
  { code: 'D-01', rule: 'Truthful status reporting only', consequence: 'False link claims trigger immediate control lockdown and operator credential revocation.', compliance: 'ENFORCED', lastAudit: '2026-04-01' },
  { code: 'D-02', rule: 'Signal quality over raw volume', consequence: 'Noisy input streams are deprioritized by policy. Persistent low-quality submissions result in channel throttling.', compliance: 'ENFORCED', lastAudit: '2026-04-01' },
  { code: 'D-03', rule: 'Shift to standby when feed is unstable', consequence: 'Output rights are temporarily revoked pending automatic review. Manual override requires L3 authorization.', compliance: 'ENFORCED', lastAudit: '2026-03-28' },
  { code: 'D-04', rule: 'No unauthorized parameter escalation', consequence: 'Attempts to exceed policy-bounded steering ranges are logged and flagged. Repeated violations trigger access downgrade.', compliance: 'ENFORCED', lastAudit: '2026-04-01' },
  { code: 'D-05', rule: 'Session logs are immutable and auditable', consequence: 'Tampering with telemetry records constitutes a governance violation. All sessions are cryptographically signed at source.', compliance: 'ENFORCED', lastAudit: '2026-03-15' },
]

export function DoctrinePage() {
  const spec = pageSpecs.doctrine

  return (
    <PageFrame title={spec.title} subtitle={spec.subtitle} command={spec.command}>
      <div className="space-y-3">
        {doctrine.map((item) => (
          <article key={item.code} className="border-l-2 border-accent-alert bg-surface-elevated">
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <div className="flex items-center gap-3">
                <AlertTriangle size={14} className="text-accent-alert" />
                <span className="font-mono text-[12px] font-black uppercase tracking-[0.12em] text-accent-alert">{item.code}</span>
                <span className="text-sm font-medium text-txt">{item.rule}</span>
              </div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent-signal">{item.compliance}</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm leading-relaxed text-txt-secondary">{item.consequence}</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-txt-muted">
                Last audit: {item.lastAudit}
              </p>
            </div>
          </article>
        ))}

        {/* Compliance attestation */}
        <div className="border border-accent-signal/30 bg-surface-secondary p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-accent-signal" />
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent-signal">
              Compliance Attestation
            </h3>
          </div>
          <p className="mt-2 text-sm text-txt-secondary">
            By operating within this governed environment, all personnel acknowledge adherence to the above
            doctrinal requirements. Non-compliance is automatically detected and escalated through the
            governance framework. Attestation is renewed at the start of each deployment session.
          </p>
          <div className="mt-3 inline-block border border-line bg-surface-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-txt-muted">
            Operator attestation: Active
          </div>
        </div>
      </div>

      <CommandSections spec={spec} />
    </PageFrame>
  )
}
