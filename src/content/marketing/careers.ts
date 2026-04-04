import type { MarketingPageSpec } from '@/types/contracts'

export const careersSpec: MarketingPageSpec = {
  id: 'careers',
  route: '/company/careers',
  title: 'Careers at TubCorp',
  description: 'Join the team building governance infrastructure for public-space participation.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Careers',
      headline: 'Build the Infrastructure That Governs Public Space',
      subheadline: 'TubCorp is a small, focused team building systems that operate at the intersection of signal processing, behavioral inference, and public accountability. Every role is critical. Every team member ships to governed environments.',
      actions: [],
    },
    {
      id: 'jobs',
      type: 'cardGrid',
      eyebrow: 'Open Positions',
      title: 'Current Openings',
      columns: 2,
      items: [
        {
          cardType: 'job' as const,
          title: 'Senior Signal Processing Engineer',
          department: 'Harness',
          location: 'Remote // On-Site Deployment',
          description: 'Design and implement real-time audio processing regimes for the Harness engine. Deep expertise in DSP, low-latency audio systems, and safety-critical signal processing required. Experience with granular synthesis, spectral analysis, and spatial audio preferred.',
        },
        {
          cardType: 'job' as const,
          title: 'Policy Inference Architect',
          department: 'Policy Engine',
          location: 'Remote',
          description: 'Own the behavioral inference layer. Design regime transition logic, thought composition systems, and anti-churn governance. Experience with stateful ML systems, reinforcement learning, and real-time inference required.',
        },
        {
          cardType: 'job' as const,
          title: 'Field Operations Lead',
          department: 'Deployment',
          location: 'On-Site // Travel Required',
          description: 'Lead on-site commissioning, operator training, and deployment support for governed environments. Strong operational background with experience in live event production, systems administration, or field engineering.',
        },
        {
          cardType: 'job' as const,
          title: 'Compliance & Audit Analyst',
          department: 'Governance',
          location: 'Remote',
          description: 'Own the compliance framework for governed deployments. Develop audit procedures, review session traces, and ensure doctrine adherence across all active environments. Background in regulatory compliance, institutional governance, or operational risk.',
        },
        {
          cardType: 'job' as const,
          title: 'iOS Engineer // Companion',
          department: 'Surfaces',
          location: 'Remote',
          description: 'Build and maintain the TubCorp Companion iOS client. SwiftUI, real-time networking, audio I/O, and spatial interaction. Experience with UDP protocols, CoreAudio, and CoreLocation.',
        },
        {
          cardType: 'job' as const,
          title: 'Behavioral Signal Analyst',
          department: 'Research',
          location: 'Remote',
          description: 'Analyze deployment session data to inform model training and policy refinement. Develop feature engineering pipelines, evaluate regime transition quality, and author training labels. Background in audio ML, behavioral analytics, or signal processing research.',
        },
      ],
    },
    {
      id: 'culture',
      type: 'prose',
      eyebrow: 'Working at TubCorp',
      title: 'What to Expect',
      body: 'TubCorp is not a traditional technology company. The systems we build operate in physical public spaces with real participants. Every engineering decision has a direct, observable consequence in a governed environment.\n\nThe team is small by design. There are no product managers, no sprints, and no roadmap documents. Engineers own their systems end-to-end, from architecture to deployment to post-session audit. Field operations personnel deploy alongside the systems they support.\n\nTubCorp values precision, accountability, and the discipline to ship systems that operate under safety-critical constraints. If you are interested in building infrastructure that matters, in environments where the consequences are immediate and visible, TubCorp is hiring.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'light',
      headline: 'Interested in a role not listed?',
      body: 'TubCorp accepts general inquiries from experienced practitioners in signal processing, machine learning, and public-space operations.',
      actions: [
        { id: 'company', label: 'About TubCorp', kind: 'route', target: '/company' },
      ],
    },
  ],
}
