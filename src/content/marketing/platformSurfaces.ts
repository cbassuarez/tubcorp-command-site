import type { MarketingPageSpec } from '@/types/contracts'

export const platformSurfacesSpec: MarketingPageSpec = {
  id: 'platform-surfaces',
  route: '/platform/surfaces',
  title: 'Companion // Operator Surfaces',
  description: 'Four purpose-built operator surfaces for governed participation: Steer, Play, Learn, and Settings.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Platform // Companion',
      headline: 'Four Surfaces. Graduated Control.',
      subheadline: 'The TubCorp Companion is the field client for real-time operator participation. Four purpose-built surfaces provide role-gated access to the live pipeline — from preference steering to audio contribution to operational briefing to system administration.',
      actions: [
        { id: 'download', label: 'Download Companion', kind: 'route', target: '/download' },
        { id: 'operators', label: 'Operator Portal', kind: 'route', target: '/operators' },
      ],
    },
    {
      id: 'surfaces',
      type: 'featureGrid',
      eyebrow: 'Surface Matrix',
      title: 'Purpose-Built for Governed Interaction',
      columns: 2,
      items: [
        {
          title: 'Steer',
          body: 'The preference vector interface. Operators inject directional bias into the live model through controlled descriptor inputs. Steer does not override the policy engine — it provides weighted suggestions that the inference layer may accept, attenuate, or reject based on current operational regime and safety constraints.',
        },
        {
          title: 'Play',
          body: 'The audio contribution lane. Operators submit audio material into the active processing route. Contributions pass through a moderated inbox with configurable cooldown periods, normalization thresholds, and approval workflows before reaching the live pipeline.',
        },
        {
          title: 'Learn',
          body: 'The operational briefing surface. Curators, operators, and floor technicians access deployment-specific orientation materials, system documentation, and real-time status summaries. Learn surfaces are read-only by design — information flows out, not in.',
        },
        {
          title: 'Settings',
          body: 'The privileged administration surface. Link health monitoring, recovery actions, route diagnostics, and handshake oversight. Access to Settings requires elevated role credentials and is fully audit-logged.',
        },
      ],
    },
    {
      id: 'role-gating',
      type: 'prose',
      eyebrow: 'Access Control',
      title: 'Role-Gated Surface Authorization',
      body: 'Every surface operation is governed by a role-based access model. Audience operators receive Steer and Play rights. Floor technicians receive Settings and diagnostic access. Archive reviewers receive read-only session inspection. No role receives blanket access — surface authorization is granted per-deployment and logged per-session.\n\nRole escalation requires explicit operator handoff and is recorded as a structured event in the session trace. There is no silent privilege elevation.',
    },
    {
      id: 'body-claims',
      type: 'prose',
      eyebrow: 'Spatial Participation',
      title: 'Body Claim System',
      body: 'For deployments with spatial tracking, the companion supports a body claim protocol that binds a participant\'s physical presence to their digital operator identity. Body claims enable spatially-aware preference vectors and contribution routing — a participant\'s Steer input can be weighted by their position relative to the stage surface.\n\nBody claims are time-limited, require explicit participant consent, and are automatically released when the companion loses proximity to the deployment zone.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'signal',
      headline: 'Deploy the Companion to your operator team.',
      actions: [
        { id: 'download', label: 'Download Companion', kind: 'route', target: '/download' },
        { id: 'procurement', label: 'Procurement', kind: 'route', target: '/procurement' },
      ],
    },
  ],
}
