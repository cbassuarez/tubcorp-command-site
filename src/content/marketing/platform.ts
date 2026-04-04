import type { MarketingPageSpec } from '@/types/contracts'

export const platformSpec: MarketingPageSpec = {
  id: 'platform',
  route: '/platform',
  title: 'The TubCorp Platform',
  description: 'End-to-end infrastructure for participatory public-space governance. Signal acquisition, behavioral inference, and operator deployment.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Platform',
      headline: 'End-to-End Infrastructure for Governed Participation',
      subheadline: 'The TubCorp platform is a vertically integrated stack that connects human signal to governed audiovisual output. Every layer is policy-controlled, every decision is auditable, and every surface is role-gated.',
      actions: [
        { id: 'harness', label: 'Signal Processing', kind: 'route', target: '/platform/harness' },
        { id: 'policy', label: 'Inference Governance', kind: 'route', target: '/platform/policy-engine' },
      ],
    },
    {
      id: 'architecture',
      type: 'pipeline',
      eyebrow: 'Architecture',
      title: 'The Governed Pipeline',
      steps: [
        {
          label: 'Signal Acquisition Layer',
          body: 'Multi-modal signal ingestion across buttons, ambient audio, body tracking, and participant contribution lanes. Eleven processing regimes provide the full spectrum from transparent passthrough to parametric reconstruction, each with hardware-enforced safety limits.',
        },
        {
          label: 'Policy Inference Layer',
          body: 'A stateful governance engine ingests normalized feature vectors at 10 Hz and outputs mode selections, parameter envelopes, preset picks, and visual directives. Four operational regimes — Calm, Engaged, Intense, and Recovering — modulate system behavior based on real-time crowd dynamics.',
        },
        {
          label: 'Operator Surface Layer',
          body: 'Four purpose-built companion surfaces — Steer, Play, Learn, and Settings — give operators graduated control over the live pipeline. Centrally managed manifest files define available banks, instrument mappings, chord vocabularies, and spatial routing patterns.',
        },
        {
          label: 'Stage Projection Layer',
          body: 'Composite audiovisual output is projected to public-facing surfaces in real time. Synchronized telemetry streams, operator reasoning traces, and session-level audit logs ensure that every state transition is recorded and attributable.',
        },
      ],
    },
    {
      id: 'modules',
      type: 'featureGrid',
      eyebrow: 'Modules',
      title: 'Platform Components',
      columns: 2,
      items: [
        {
          title: 'Harness // Signal Processing',
          body: 'The real-time signal processing engine. Eleven processing regimes, continuous feature extraction, hardware-enforced safety rails, and a version-controlled manifest system for deployment-specific configuration.',
          link: '/platform/harness',
        },
        {
          title: 'Policy Engine // Inference Governance',
          body: 'The stateful behavioral inference layer. Feature vector evaluation, operational regime management, thought composition for audit transparency, and anti-churn mode stability governance.',
          link: '/platform/policy-engine',
        },
        {
          title: 'Companion // Operator Surfaces',
          body: 'The field client for real-time operator participation. Four role-gated surfaces for steering, audio contribution, operational briefing, and system administration.',
          link: '/platform/surfaces',
        },
        {
          title: 'Telemetry // Continuous Observability',
          body: 'The observability and compliance layer. Live status chips, feed freshness monitoring, session-level audit logs, and policy-mandated truthful reporting across all operator interfaces.',
          link: '/platform/observability',
        },
      ],
    },
    {
      id: 'integration',
      type: 'prose',
      eyebrow: 'Integration',
      title: 'Deploys to Any Governed Space',
      body: 'The TubCorp platform integrates with existing venue infrastructure via standard audio I/O and network protocols. No proprietary hardware is required beyond the stage projection surface. The companion app distributes to field operators via standard mobile deployment channels, and the policy engine runs on commodity compute with optional GPU acceleration for inference-heavy configurations.\n\nDeployment timelines vary by site complexity, but a standard single-stage configuration can be provisioned and operational within 48 hours of hardware handoff. TubCorp provides on-site commissioning support and remote monitoring for the duration of the deployment.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'signal',
      headline: 'See the platform in deployment',
      actions: [
        { id: 'cases', label: 'View Case Studies', kind: 'route', target: '/case-studies' },
        { id: 'procurement', label: 'Start Procurement', kind: 'route', target: '/procurement' },
      ],
    },
  ],
}
