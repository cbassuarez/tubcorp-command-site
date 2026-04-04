import type { MarketingPageSpec } from '@/types/contracts'

export const downloadSpec: MarketingPageSpec = {
  id: 'download',
  route: '/download',
  title: 'Download the TubCorp Companion',
  description: 'Deploy the TubCorp Companion to connect to a governed public-space environment.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'full',
      eyebrow: 'Companion',
      headline: 'Deploy the TubCorp Companion',
      subheadline: 'The Companion is the field client for governed public-space participation. Four operator surfaces provide real-time access to the live pipeline — preference steering, audio contribution, operational briefing, and system administration.',
      actions: [
        { id: 'ios', label: 'Download for iOS', kind: 'external', target: 'env:ios' },
      ],
    },
    {
      id: 'surfaces',
      type: 'featureGrid',
      eyebrow: 'Operator Surfaces',
      title: 'Four Surfaces. Graduated Control.',
      columns: 2,
      items: [
        {
          title: 'Steer',
          body: 'Inject preference vectors into the live model. Suggest directional bias that the inference layer evaluates against current operational regime and safety constraints.',
        },
        {
          title: 'Play',
          body: 'Submit audio material into the active processing route. Contributions are moderated, normalized, and approved before reaching the live pipeline.',
        },
        {
          title: 'Learn',
          body: 'Access deployment-specific orientation materials, system documentation, and real-time status summaries. Read-only by design.',
        },
        {
          title: 'Settings',
          body: 'Link health monitoring, recovery actions, route diagnostics, and handshake oversight. Requires elevated role credentials.',
        },
      ],
    },
    {
      id: 'requirements',
      type: 'prose',
      eyebrow: 'Requirements',
      title: 'System Requirements',
      body: 'iOS 17.0 or later. iPhone or iPad. Network connectivity to the deployment site. The Companion establishes a direct link to the governed pipeline — no intermediary servers are required for local deployments.\n\nOperator role credentials are provisioned by the deployment administrator. The Companion does not support anonymous access.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'signal',
      headline: 'Ready to connect?',
      actions: [
        { id: 'ios', label: 'Download for iOS', kind: 'external', target: 'env:ios' },
        { id: 'operators', label: 'Operator Portal', kind: 'route', target: '/operators' },
      ],
    },
  ],
}
