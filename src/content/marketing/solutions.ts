import type { MarketingPageSpec } from '@/types/contracts'

export const solutionsSpec: MarketingPageSpec = {
  id: 'solutions',
  route: '/solutions',
  title: 'Solutions',
  description: 'TubCorp deploys governed participation infrastructure to cultural institutions, municipal public spaces, and large-scale events.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Solutions',
      headline: 'Governed Participation for Every Public Environment',
      subheadline: 'TubCorp deploys to any venue where human interaction occurs in public space and institutional accountability is required. The platform adapts to the governance requirements of the environment — not the other way around.',
      actions: [
        { id: 'cases', label: 'View Case Studies', kind: 'route', target: '/case-studies' },
        { id: 'procurement', label: 'Start Procurement', kind: 'route', target: '/procurement' },
      ],
    },
    {
      id: 'cultural',
      type: 'split',
      eyebrow: 'Cultural Institutions',
      title: 'Curated Participation with Institutional Compliance',
      body: 'Museums, galleries, and performance venues operate under dual constraints: audiences expect interaction, institutions require control. TubCorp provides the governance layer between audience intent and artistic output.\n\nThe platform enables curators and system architects to define the boundaries of participation — which signals are ingested, which processing regimes are available, and which safety constraints apply — while giving audiences the freedom to interact within those boundaries. Every session generates a compliance-grade audit trail for institutional review.',
      imagePosition: 'right',
      actions: [
        { id: 'platform', label: 'See the Platform', kind: 'route', target: '/platform' },
      ],
    },
    {
      id: 'divider-1',
      type: 'divider',
      variant: 'line',
    },
    {
      id: 'municipal',
      type: 'split',
      eyebrow: 'Municipal Public Space',
      title: 'Responsive Infrastructure for Parks, Plazas, and Transit',
      body: 'Public parks, plazas, pedestrian corridors, and transit hubs are the most heavily used — and least governed — spaces in any municipality. TubCorp transforms passive public infrastructure into responsive, policy-controlled environments.\n\nMunicipal deployments benefit from the platform\'s continuous observability layer: real-time telemetry, operator doctrine enforcement, and session-level audit logs provide the accountability framework that municipal authorities require. Crowd dynamics are governed, not suppressed.',
      imagePosition: 'left',
      actions: [
        { id: 'observability', label: 'Observability Layer', kind: 'route', target: '/platform/observability' },
      ],
    },
    {
      id: 'divider-2',
      type: 'divider',
      variant: 'line',
    },
    {
      id: 'events',
      type: 'split',
      eyebrow: 'Large-Scale Events',
      title: 'Real-Time Governance at Crowd Density',
      body: 'Festivals, conferences, public gatherings, and institutional events generate participation signals at volumes that exceed the capacity of manual operator oversight. TubCorp provides the safety rails and automated governance that high-density environments demand.\n\nThe Policy Engine\'s four-state regime model is specifically designed for crowd escalation scenarios. Automatic de-escalation, locked preset continuity under peak load, and hardware-enforced safety limits ensure that governed environments remain safe regardless of participant volume or intensity.',
      imagePosition: 'right',
      actions: [
        { id: 'harness', label: 'Safety Architecture', kind: 'route', target: '/platform/harness' },
      ],
    },
    {
      id: 'stats',
      type: 'statBar',
      items: [
        { value: '11', label: 'Processing Regimes', accent: 'signal' },
        { value: '4', label: 'Governance States', accent: 'cyan' },
        { value: '-1 dBFS', label: 'Safety Ceiling', accent: 'amber' },
        { value: '100%', label: 'Audit Coverage', accent: 'signal' },
      ],
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'dark',
      headline: 'Every governed space is different. The infrastructure is the same.',
      body: 'Contact procurement to begin your site assessment.',
      actions: [
        { id: 'procurement', label: 'Start Procurement', kind: 'route', target: '/procurement' },
        { id: 'cases', label: 'Case Studies', kind: 'route', target: '/case-studies' },
      ],
    },
  ],
}
