import type { MarketingPageSpec } from '@/types/contracts'

export const privacySpec: MarketingPageSpec = {
  id: 'privacy',
  route: '/privacy',
  title: 'Privacy & Compliance',
  description: 'TubCorp data governance, participant privacy, and compliance framework.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Privacy & Compliance',
      headline: 'Data Governance Framework',
      subheadline: 'TubCorp operates governed environments that process participant signals in real time. This document describes how signal data is collected, processed, retained, and made available for compliance review.',
      actions: [],
    },
    {
      id: 'collection',
      type: 'prose',
      eyebrow: 'Section 1',
      title: 'Signal Collection',
      body: 'TubCorp governed environments collect the following signal types during active deployment sessions: ambient acoustic data from on-site microphones, discrete participant input events from buttons and touch interfaces, spatial tracking data from body sensors where deployed, audio contributions submitted through the Companion Play surface, and preference vectors submitted through the Companion Steer surface.\n\nAll collected signals are processed in real time by the Harness signal processing engine and the Policy Engine inference layer. Raw audio input may optionally be recorded as session-level archive data when configured by the deployment administrator. Signal collection begins when the governed environment is activated and ceases when the session is terminated.',
    },
    {
      id: 'processing',
      type: 'prose',
      eyebrow: 'Section 2',
      title: 'Signal Processing and Retention',
      body: 'Collected signals are processed exclusively for the purpose of generating governed audiovisual output and maintaining the operational telemetry stream. Feature extraction produces normalized metadata (loudness, spectral content, onset density, pitch, key) that is retained as part of the session audit trail.\n\nRaw audio recordings, when enabled, are retained for the duration specified in the deployment contract and are accessible only to authorized audit reviewers. Session telemetry — frame-level state records, event logs, safety intervention records, and operator labels — is retained for the compliance review period specified in the deployment agreement.\n\nTubCorp does not sell, license, or transfer participant signal data to third parties. Signal data is not used for advertising, profiling, or any purpose outside of governed environment operation and compliance review.',
    },
    {
      id: 'participants',
      type: 'prose',
      eyebrow: 'Section 3',
      title: 'Participant Rights',
      body: 'Participants in governed environments have the following rights: the right to be informed that they are in a governed environment (signage and notification requirements are specified in the deployment contract), the right to exit the governed environment at any time, and the right to request deletion of any personally identifiable signal data associated with their participation.\n\nParticipants who connect to the governed environment via the Companion app authenticate with operator credentials and are subject to the role-gated access model. Body claims — which bind a participant\'s physical presence to their digital identity — require explicit consent and are automatically released upon proximity loss.',
    },
    {
      id: 'compliance',
      type: 'prose',
      eyebrow: 'Section 4',
      title: 'Compliance Framework',
      body: 'TubCorp governed environments generate comprehensive audit trails that meet institutional compliance requirements. Every state transition, safety intervention, operator action, and policy decision is recorded with timestamps, attribution, and reasoning traces.\n\nThe Operator Doctrine enforces three mandatory compliance rules: truthful status reporting (no masking of degraded or standby states), signal quality over input volume (noisy inputs are deprioritized by policy), and mandatory standby escalation when telemetry degrades beyond threshold. Doctrine violations trigger automatic consequences including control lockdown and output right revocation.\n\nDeployment contracts specify the compliance review period, data retention schedule, and audit access procedures for each governed environment.',
    },
    {
      id: 'contact',
      type: 'prose',
      eyebrow: 'Section 5',
      title: 'Contact',
      body: 'For questions about TubCorp\'s data governance practices, participant rights, or compliance procedures, contact privacy@tubcorp.systems.\n\nFor deployment-specific privacy inquiries, contact the field operations lead assigned to your governed environment.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'light',
      headline: 'TubCorp treats governance as infrastructure, not policy.',
      actions: [
        { id: 'platform', label: 'See the Platform', kind: 'route', target: '/platform' },
        { id: 'company', label: 'About TubCorp', kind: 'route', target: '/company' },
      ],
    },
  ],
}
