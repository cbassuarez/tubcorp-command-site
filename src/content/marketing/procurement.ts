import type { MarketingPageSpec } from '@/types/contracts'

export const procurementSpec: MarketingPageSpec = {
  id: 'procurement',
  route: '/procurement',
  title: 'Procurement',
  description: 'Deployment tiers, procurement process, and engagement options for TubCorp governed environments.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Procurement',
      headline: 'Deployment Tiers and Engagement',
      subheadline: 'TubCorp offers three deployment tiers scaled to site complexity, governance requirements, and operational duration. Every engagement includes platform licensing, configuration, on-site commissioning, and post-deployment audit.',
      actions: [],
    },
    {
      id: 'tiers',
      type: 'tiers',
      eyebrow: 'Deployment Tiers',
      title: 'Select Your Engagement Level',
      items: [
        {
          name: 'Field Pilot',
          description: 'Single-stage evaluation deployment for site assessment and governance feasibility. Recommended for first-time environments.',
          features: [
            'Single stage projection surface',
            'Up to 5 operator seats',
            'Standard processing regime set (Modes 0-4)',
            'Simulated telemetry during commissioning',
            'On-site commissioning support (2 days)',
            'Post-deployment audit report',
            'Session data export',
          ],
          cta: { id: 'pilot-contact', label: 'Request Pilot', kind: 'route', target: '/procurement' },
        },
        {
          name: 'Municipal Deployment',
          description: 'Full-stack governed environment for institutional and municipal spaces. Includes the complete processing regime set and advanced governance features.',
          features: [
            'Multi-surface projection support',
            'Up to 20 operator seats',
            'Full processing regime set (Modes 0-10)',
            'Live remote telemetry',
            'Policy Engine with trained model checkpoint',
            'On-site commissioning support (5 days)',
            'Operator training program',
            'Weekly audit review cycle',
            'Companion app deployment',
          ],
          cta: { id: 'municipal-contact', label: 'Request Deployment', kind: 'route', target: '/procurement' },
          highlighted: true,
        },
        {
          name: 'Enterprise Program',
          description: 'Multi-site deployment orchestration for organizations governing more than one public space. Centralized policy management and cross-venue telemetry.',
          features: [
            'Multi-site deployment orchestration',
            'Unlimited operator seats',
            'Custom processing regime configuration',
            'Centralized policy management console',
            'Cross-venue telemetry aggregation',
            'Dedicated field operations contact',
            'Continuous model improvement pipeline',
            'Custom contract and manifest authoring',
            'SLA-backed uptime guarantees',
          ],
          cta: { id: 'enterprise-contact', label: 'Contact Enterprise', kind: 'route', target: '/procurement' },
        },
      ],
    },
    {
      id: 'process',
      type: 'pipeline',
      eyebrow: 'Process',
      title: 'Procurement Workflow',
      steps: [
        {
          label: 'Initial Contact',
          body: 'Submit a procurement inquiry with site details, governance requirements, and desired deployment timeline. TubCorp responds within 48 hours with an initial assessment.',
        },
        {
          label: 'Site Assessment',
          body: 'TubCorp conducts a remote or on-site evaluation of the deployment environment — acoustic properties, power and network infrastructure, projection surface requirements, and operator staffing.',
        },
        {
          label: 'Configuration & Contract',
          body: 'Manifest files, processing regime sets, and policy configurations are authored for the specific deployment. The contract fingerprint is locked and validated against the platform.',
        },
        {
          label: 'Commissioning',
          body: 'On-site installation, calibration, operator training, and system validation. The governed environment is brought to operational status under supervised conditions.',
        },
        {
          label: 'Deployment & Monitoring',
          body: 'The governed environment operates under live conditions with continuous telemetry, remote monitoring, and on-call field operations support.',
        },
        {
          label: 'Post-Deployment Audit',
          body: 'Comprehensive session review, metric computation, and audit report delivery. Recommendations for configuration refinement or continued deployment.',
        },
      ],
    },
    {
      id: 'included',
      type: 'prose',
      eyebrow: 'What\'s Included',
      title: 'Every Deployment Includes',
      body: 'Platform software licensing for the Harness, Policy Engine, and Companion surfaces. Deployment-specific manifest and policy configuration. On-site commissioning support with operator training. Remote telemetry monitoring for the duration of the deployment. Post-deployment audit report with governance metrics and recommendations.\n\nHardware is provisioned by the deploying organization. TubCorp provides technical specifications for audio I/O, compute, network, and projection surface requirements. Standard configurations use commodity hardware available from any commercial supplier.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'dark',
      headline: 'Begin your procurement assessment.',
      body: 'Contact procurement@tubcorp.systems with your site details and governance requirements.',
      actions: [
        { id: 'cases', label: 'View Case Studies', kind: 'route', target: '/case-studies' },
        { id: 'platform', label: 'See the Platform', kind: 'route', target: '/platform' },
      ],
    },
  ],
}
