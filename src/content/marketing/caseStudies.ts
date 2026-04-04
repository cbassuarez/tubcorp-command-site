import type { MarketingPageSpec } from '@/types/contracts'

export const caseStudiesSpec: MarketingPageSpec = {
  id: 'case-studies',
  route: '/case-studies',
  title: 'Case Studies',
  description: 'Deployment reports from governed public-space environments.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Case Studies',
      headline: 'Governance in the Field',
      subheadline: 'Deployment reports from governed environments. Each case study documents the challenge, the TubCorp configuration, and the measurable outcomes.',
      actions: [],
    },
    {
      id: 'cases',
      type: 'cardGrid',
      columns: 2,
      items: [
        {
          cardType: 'caseStudy' as const,
          slug: 'civic-plaza-pilot',
          title: 'Civic Plaza Pilot Program',
          summary: 'A municipal government deployed TubCorp to a 2,400 sq ft public plaza to evaluate governed participation as an alternative to passive surveillance. The deployment ran for 12 consecutive days with rotating operator teams.',
          metric: '94%',
          metricLabel: 'Session uptime across all deployment days',
        },
        {
          cardType: 'caseStudy' as const,
          slug: 'contemporary-arts-residency',
          title: 'Contemporary Arts Center Residency',
          summary: 'A contemporary arts institution integrated TubCorp into a gallery installation exploring the relationship between algorithmic governance and public expression. Three processing regime configurations were rotated across the exhibition period.',
          metric: '2,100+',
          metricLabel: 'Unique participant interactions logged',
        },
        {
          cardType: 'caseStudy' as const,
          slug: 'transit-concourse-trial',
          title: 'Transit Concourse Acoustic Trial',
          summary: 'A metropolitan transit authority commissioned a trial deployment in a high-traffic concourse to evaluate acoustic governance as a crowd management tool. The Harness operated in Modes 0, 1, and 8 across peak and off-peak traffic periods.',
          metric: '34%',
          metricLabel: 'Reduction in unstructured acoustic incidents',
        },
        {
          cardType: 'caseStudy' as const,
          slug: 'festival-deployment',
          title: 'Multi-Stage Festival Deployment',
          summary: 'TubCorp provided governed participation infrastructure across three concurrent stages at an urban cultural festival. The Policy Engine\'s regime model handled crowd escalation and de-escalation across 18 hours of continuous operation.',
          metric: '0',
          metricLabel: 'Safety interventions bypassed during peak density',
        },
      ],
    },
    {
      id: 'quote',
      type: 'quote',
      text: 'The governance layer changed the conversation entirely. It was no longer about whether to allow participation, but about how to structure it. The audit trail gave our board the confidence to approve a permanent installation.',
      attribution: 'Institutional Stakeholder',
      role: 'Deputy Director',
      organization: 'Contemporary Arts Center',
    },
    {
      id: 'methodology',
      type: 'prose',
      eyebrow: 'Methodology',
      title: 'How TubCorp Measures Deployment Success',
      body: 'TubCorp evaluates governed environments against four metrics: session uptime (percentage of deployment hours where the platform operated within policy), safety compliance (number of interventions that were properly enforced versus bypassed), audit completeness (percentage of state transitions captured in the session trace), and governance coherence (ratio of intentional to unintentional mode transitions as assessed by operator labels).\n\nThese metrics are computed from session data after each deployment and included in the post-deployment report provided to the commissioning organization. TubCorp does not report engagement metrics, satisfaction scores, or any other measure that conflates participation volume with governance quality.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'signal',
      headline: 'Deploy TubCorp to your environment.',
      actions: [
        { id: 'procurement', label: 'Start Procurement', kind: 'route', target: '/procurement' },
        { id: 'solutions', label: 'View Solutions', kind: 'route', target: '/solutions' },
      ],
    },
  ],
}
