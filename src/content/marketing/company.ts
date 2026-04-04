import type { MarketingPageSpec } from '@/types/contracts'

export const companySpec: MarketingPageSpec = {
  id: 'company',
  route: '/company',
  title: 'About TubCorp',
  description: 'TubCorp builds governance infrastructure for public-space participation. Mission, leadership, values, and history.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'full',
      eyebrow: 'Company',
      headline: 'Public Space Deserves Governance Infrastructure',
      subheadline: 'TubCorp was founded on a single observation: the gap between public engagement and public accountability is a systems failure. Participation happens everywhere. Governance almost nowhere. TubCorp exists to close that gap.',
      actions: [
        { id: 'careers', label: 'Join the Team', kind: 'route', target: '/company/careers' },
        { id: 'platform', label: 'See the Platform', kind: 'route', target: '/platform' },
      ],
    },
    {
      id: 'mission',
      type: 'prose',
      eyebrow: 'Mission',
      title: 'Governed Participation at Scale',
      body: 'TubCorp builds the infrastructure that makes participatory public space accountable. Every governed environment powered by TubCorp operates under the same constraint: participation without oversight is indistinguishable from noise.\n\nThe platform does not suppress participation. It does not filter or censor. It governs — applying policy-controlled processing, transparent inference, and auditable decision-making to every signal that enters the system. The result is public interaction that is responsive, safe, and accountable to the operators who deploy it.\n\nTubCorp does not believe in ungoverned public space. Not because participation is dangerous, but because participation is too important to leave unstructured.',
      align: 'left',
    },
    {
      id: 'values',
      type: 'featureGrid',
      eyebrow: 'Principles',
      title: 'Foundational Commitments',
      columns: 4,
      items: [
        {
          title: 'Transparency',
          body: 'Every policy decision generates a human-readable reasoning trace. Operators see what the system sees. There is no black box.',
        },
        {
          title: 'Safety',
          body: 'Hardware-enforced safety limits are non-negotiable. No inference output, operator input, or configuration change can override participant protection.',
        },
        {
          title: 'Accountability',
          body: 'Session-level audit trails capture every state transition, intervention, and operator action. If it happened in a governed space, there is a record.',
        },
        {
          title: 'Participation',
          body: 'The system exists to amplify human presence, not replace it. Governance is the framework that makes meaningful participation possible at scale.',
        },
      ],
    },
    {
      id: 'timeline',
      type: 'pipeline',
      eyebrow: 'History',
      title: 'Key Milestones',
      steps: [
        {
          label: 'Foundational Research',
          body: 'Initial investigation into the governance gap in public-space interaction. Development of the core thesis: that participatory environments require the same infrastructure rigor as any critical system.',
        },
        {
          label: 'Harness Prototype',
          body: 'First operational prototype of the real-time signal processing engine. Eleven processing regimes validated in controlled deployment environments with safety architecture proven under sustained load.',
        },
        {
          label: 'Policy Engine v1',
          body: 'Deployment of the stateful inference governance layer. Four operational regimes, thought composition, and anti-churn mode stability governance validated in multi-session field trials.',
        },
        {
          label: 'Companion Launch',
          body: 'Release of the field client with four purpose-built operator surfaces. Role-gated access, spatial body claims, and audio contribution moderation deployed to operational teams.',
        },
        {
          label: 'Phase 1 Training Pipeline',
          body: 'Activation of the continuous model improvement pipeline. Live deployment sessions generate structured training data for supervised learning without interrupting governed operations.',
        },
      ],
    },
    {
      id: 'leadership',
      type: 'cardGrid',
      eyebrow: 'Leadership',
      title: 'The Team',
      columns: 3,
      items: [
        {
          cardType: 'team' as const,
          name: 'S. Suarez',
          title: 'Founder // Principal Architect',
          bio: 'Systems architect with deep expertise in real-time audio processing, behavioral inference, and public-space governance infrastructure. Responsible for platform architecture and deployment strategy.',
          heerichSeed: 1,
        },
        {
          cardType: 'team' as const,
          name: 'Office of the CTO',
          title: 'Technical Direction',
          bio: 'Responsible for protocol integrity, contract locking, safety architecture, and continuous improvement of the inference governance stack.',
          heerichSeed: 2,
        },
        {
          cardType: 'team' as const,
          name: 'Field Operations',
          title: 'Deployment & Support',
          bio: 'On-site commissioning, operator training, remote monitoring, and post-deployment audit review. Every governed environment has a field operations contact.',
          heerichSeed: 3,
        },
      ],
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'dark',
      headline: 'TubCorp is hiring.',
      body: 'Signal processing engineers, policy architects, field operations leads, and compliance analysts.',
      actions: [
        { id: 'careers', label: 'Open Positions', kind: 'route', target: '/company/careers' },
        { id: 'press', label: 'Press & News', kind: 'route', target: '/company/press' },
      ],
    },
  ],
}
