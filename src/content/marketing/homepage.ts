import type { MarketingPageSpec } from '@/types/contracts'

export const homepageSpec: MarketingPageSpec = {
  id: 'homepage',
  route: '/',
  title: 'TubCorp // Public Space Governance Platform',
  description: 'End-to-end infrastructure for participatory public-space governance. Signal processing, behavioral inference, and operator deployment.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'full',
      eyebrow: 'Public Space Governance Platform',
      headline: 'Where Participation Meets Governance',
      subheadline: 'TubCorp provides end-to-end infrastructure for governed interaction in public spaces. From signal acquisition to behavioral inference to stage projection, every layer is policy-controlled, operator-supervised, and fully auditable.',
      actions: [
        { id: 'explore', label: 'Explore the Platform', kind: 'route', target: '/platform' },
        { id: 'download', label: 'Download Companion', kind: 'route', target: '/download' },
      ],
    },
    {
      id: 'stats',
      type: 'statBar',
      items: [
        { value: '11', label: 'Signal Processing Regimes', accent: 'signal' },
        { value: '4', label: 'Operational Governance States', accent: 'cyan' },
        { value: '10 Hz', label: 'Policy Decision Frequency', accent: 'signal' },
        { value: '<1 ms', label: 'Inference Response Ceiling', accent: 'amber' },
      ],
    },
    {
      id: 'platform-pillars',
      type: 'featureGrid',
      eyebrow: 'The Platform',
      title: 'Three Layers. One Governed Pipeline.',
      columns: 3,
      items: [
        {
          title: 'Signal Acquisition',
          body: 'Multi-modal ingestion across discrete input channels, ambient acoustic feeds, spatial tracking, and participant contribution lanes. Eleven processing regimes handle everything from transparent passthrough to parametric reconstruction.',
          link: '/platform/harness',
        },
        {
          title: 'Inference Governance',
          body: 'A stateful policy engine ingests feature telemetry and outputs mode selections, parameter envelopes, and visual directives. Four operational regimes govern escalation and de-escalation in real time.',
          link: '/platform/policy-engine',
        },
        {
          title: 'Operator Surfaces',
          body: 'Purpose-built companion surfaces give operators graduated control over the live pipeline. Steer, contribute, learn, and administer — each surface is role-gated and audit-logged.',
          link: '/platform/surfaces',
        },
      ],
    },
    {
      id: 'pipeline',
      type: 'pipeline',
      eyebrow: 'Architecture',
      title: 'From Signal to Stage',
      steps: [
        {
          label: 'Signal Ingestion',
          body: 'Participant input, ambient audio, spatial tracking, and discrete control events are ingested through policy-controlled channels. Each signal source is normalized, timestamped, and tagged for downstream attribution.',
        },
        {
          label: 'Feature Extraction',
          body: 'Continuous extraction of loudness, onset density, spectral centroid, pitch, and harmonic key provides a multidimensional behavioral fingerprint of the acoustic environment at 10 Hz resolution.',
        },
        {
          label: 'Policy Inference',
          body: 'The governance engine evaluates feature vectors against the current operational regime and outputs mode selections, parameter envelopes, preset picks, and visual directives — all within a single inference frame.',
        },
        {
          label: 'Stage Projection',
          body: 'Composite audiovisual output is projected to public-facing surfaces. Synchronized telemetry streams provide continuous observability for operators, ensuring that no state transition goes unrecorded.',
        },
      ],
    },
    {
      id: 'quote',
      type: 'quote',
      text: 'The fundamental challenge of public space is not engagement — it is governance. TubCorp exists because participation without oversight is indistinguishable from noise.',
      attribution: 'TubCorp',
      role: 'Foundational Thesis',
    },
    {
      id: 'solutions-preview',
      type: 'featureGrid',
      eyebrow: 'Deployments',
      title: 'Built for Governed Environments',
      columns: 3,
      items: [
        {
          title: 'Cultural Institutions',
          body: 'Museums, galleries, and performance venues require curated participation with institutional compliance. TubCorp provides the governance layer between audience intent and artistic output.',
          link: '/solutions',
        },
        {
          title: 'Municipal Public Space',
          body: 'Parks, plazas, and transit hubs benefit from structured interaction frameworks. TubCorp transforms passive public infrastructure into responsive, policy-controlled environments.',
          link: '/solutions',
        },
        {
          title: 'Large-Scale Events',
          body: 'Festivals, conferences, and public gatherings demand real-time crowd governance at scale. TubCorp provides the safety rails and operator surfaces to manage high-density participation.',
          link: '/solutions',
        },
      ],
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'dark',
      headline: 'Ready to govern your public space?',
      body: 'TubCorp deploys to any venue with standard audio infrastructure and network connectivity. Contact procurement to begin your assessment.',
      actions: [
        { id: 'procurement', label: 'Start Procurement', kind: 'route', target: '/procurement' },
        { id: 'platform', label: 'Explore Platform', kind: 'route', target: '/platform' },
      ],
    },
  ],
}
