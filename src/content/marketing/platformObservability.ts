import type { MarketingPageSpec } from '@/types/contracts'

export const platformObservabilitySpec: MarketingPageSpec = {
  id: 'platform-observability',
  route: '/platform/observability',
  title: 'Telemetry // Continuous Observability',
  description: 'Live status monitoring, feed freshness tracking, session audit logs, and policy-mandated truthful reporting.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Platform // Observability',
      headline: 'Honest Telemetry. No Exceptions.',
      subheadline: 'The TubCorp observability layer provides continuous, policy-mandated truthful reporting across every operator surface. Status chips report true link conditions. Degraded states may not be masked. Every state transition is recorded for oversight.',
      actions: [
        { id: 'operators', label: 'Live Telemetry Board', kind: 'route', target: '/operators/telemetry' },
        { id: 'platform', label: 'Full Platform', kind: 'route', target: '/platform' },
      ],
    },
    {
      id: 'telemetry-live',
      type: 'telemetryWidget',
      title: 'Live System Status',
    },
    {
      id: 'channels',
      type: 'featureGrid',
      eyebrow: 'Observability Channels',
      title: 'Four Dimensions of System Health',
      columns: 4,
      items: [
        {
          title: 'Link State',
          body: 'Continuous monitoring of the connection between companion clients and the governed pipeline. Connected, Missing, and Simulated states are reported without latency or masking.',
        },
        {
          title: 'Feed Freshness',
          body: 'Real-time assessment of telemetry packet currency. Live, Degraded, and Standby classifications trigger at configurable staleness thresholds.',
        },
        {
          title: 'Access State',
          body: 'Current authorization posture of the deployment. Open, Restricted, and Locked states govern which surfaces are available to field operators.',
        },
        {
          title: 'Scene State',
          body: 'Current visual projection state including active scene protocol, density, cohesion, disruption, and wordmark integrity parameters.',
        },
      ],
    },
    {
      id: 'audit',
      type: 'prose',
      eyebrow: 'Compliance',
      title: 'Session-Level Audit Architecture',
      body: 'Every deployment session generates a comprehensive audit trail. Frame-level telemetry (10 Hz), discrete event logs, safety intervention records, operator labels, and human reasoning traces are archived in structured formats suitable for post-session review.\n\nSession metadata — including contract fingerprints, manifest versions, policy configurations, and audio alignment markers — provides the context necessary to reconstruct any moment in a deployment session from the archived data alone.\n\nTubCorp does not offer selective logging. The audit trail is comprehensive or it does not exist.',
    },
    {
      id: 'doctrine',
      type: 'split',
      eyebrow: 'Operator Doctrine',
      title: 'Compliance Controls and Consequence Framework',
      body: 'Operator behavior is governed by a mandatory doctrine that establishes three non-negotiable rules: truthful status reporting, signal quality over input volume, and mandatory standby escalation when telemetry degrades beyond policy thresholds.\n\nDoctrine violations trigger automatic consequences — false link claims produce immediate control lockdown, noisy input streams are deprioritized by policy, and output rights are temporarily revoked pending review when feed stability drops below threshold.',
      imagePosition: 'left',
      actions: [
        { id: 'doctrine', label: 'View Operator Doctrine', kind: 'route', target: '/operators/doctrine' },
      ],
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'light',
      headline: 'Governance requires transparency.',
      body: 'TubCorp provides both — by design, not by policy.',
      actions: [
        { id: 'platform', label: 'Full Platform', kind: 'route', target: '/platform' },
        { id: 'procurement', label: 'Start Procurement', kind: 'route', target: '/procurement' },
      ],
    },
  ],
}
