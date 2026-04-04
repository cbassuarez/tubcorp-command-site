import type { MarketingPageSpec } from '@/types/contracts'

export const pressSpec: MarketingPageSpec = {
  id: 'press',
  route: '/company/press',
  title: 'Press & News',
  description: 'TubCorp announcements, deployment updates, and press coverage.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Press & News',
      headline: 'Updates from TubCorp',
      subheadline: 'Deployment announcements, platform updates, and coverage of TubCorp\'s work in public-space governance.',
      actions: [],
    },
    {
      id: 'items',
      type: 'cardGrid',
      columns: 2,
      items: [
        {
          cardType: 'press' as const,
          date: '2026-Q2',
          title: 'TubCorp Announces Phase 2 Deployment Framework',
          source: 'TubCorp Systems',
          summary: 'The Phase 2 framework introduces multi-site deployment orchestration, cross-venue telemetry aggregation, and centralized policy management for operators governing more than one public space simultaneously.',
        },
        {
          cardType: 'press' as const,
          date: '2026-Q1',
          title: 'Companion App Reaches General Availability',
          source: 'TubCorp Systems',
          summary: 'The TubCorp Companion iOS client is now available for field deployment. Four operator surfaces — Steer, Play, Learn, and Settings — provide graduated access to the governed pipeline.',
        },
        {
          cardType: 'press' as const,
          date: '2025-Q4',
          title: 'Phase 1 Training Pipeline Activated',
          source: 'TubCorp Systems',
          summary: 'Live deployment sessions now generate structured training data for the supervised learning pipeline. Model refinement proceeds without interrupting governed operations.',
        },
        {
          cardType: 'press' as const,
          date: '2025-Q3',
          title: 'Policy Engine v1 Validated in Field Trials',
          source: 'TubCorp Systems',
          summary: 'Multi-session field trials confirm reliable regime transition governance, thought composition latency under 1ms, and zero safety interventions bypassed across all trial deployments.',
        },
        {
          cardType: 'press' as const,
          date: '2025-Q2',
          title: 'Harness Safety Architecture Certified',
          source: 'TubCorp Systems',
          summary: 'Independent verification confirms hardware-enforced safety limits maintain participant protection under all tested processing conditions, including sustained high-intensity crowd engagement scenarios.',
        },
        {
          cardType: 'press' as const,
          date: '2025-Q1',
          title: 'TubCorp Founded',
          source: 'TubCorp Systems',
          summary: 'TubCorp Systems Inc. established to commercialize participatory public-space governance infrastructure. Core team assembled from backgrounds in real-time audio systems, behavioral inference, and institutional operations.',
        },
      ],
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'light',
      headline: 'Press inquiries',
      body: 'For press and media inquiries regarding TubCorp deployments, technology, or company information, contact press@tubcorp.systems.',
      actions: [
        { id: 'company', label: 'About TubCorp', kind: 'route', target: '/company' },
      ],
    },
  ],
}
