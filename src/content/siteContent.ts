import type { CommandPageSpec, PageCommandAction } from '@/types/contracts'

export const shellNavigation = [
  { path: '/', label: 'OVERVIEW' },
  { path: '/systems', label: 'SYSTEMS' },
  { path: '/participation', label: 'PARTICIPATION' },
  { path: '/surfaces', label: 'SURFACES' },
  { path: '/telemetry', label: 'TELEMETRY' },
  { path: '/doctrine', label: 'DOCTRINE' },
  { path: '/access', label: 'ACCESS' },
] as const

export const globalActions: PageCommandAction[] = [
  { id: 'jump-surfaces', label: 'Explore Operator Surfaces', kind: 'route', target: '/surfaces' },
  { id: 'jump-telemetry', label: 'View Live Telemetry', kind: 'route', target: '/telemetry' },
  { id: 'jump-access', label: 'Open Access Portal', kind: 'route', target: '/access' },
]

export const pageSpecs: Record<string, CommandPageSpec> = {
  entry: {
    id: 'entry',
    route: '/',
    title: 'TubCorp Audience Governance Platform',
    subtitle: 'Procurement and operator onboarding portal',
    command: 'briefing.open(channel: public-sector)',
    sections: [
      {
        id: 'mission',
        title: 'Executive Summary',
        body: [
          'THE TUB IS A LIVE AUDIO-VISUAL INFRASTRUCTURE FOR PUBLIC SPACES.',
          'TUBCORP PROVIDES POLICY-CONTROLLED AUDIENCE PARTICIPATION AND OPERATOR OVERSIGHT.',
          'THIS PORTAL IS DESIGNED FOR RAPID APP DEPLOYMENT AND ENTERPRISE PROCUREMENT REVIEW.',
        ],
      },
      {
        id: 'buyer-value',
        title: 'Why Agencies Buy TubCorp',
        body: [
          'CONTROLS: ROLE-GATED ACCESS, HONEST TELEMETRY, AND AUDITABLE SESSION TRACES.',
          'OUTCOMES: HIGH-ENGAGEMENT PUBLIC INTERACTION WITH CENTRALIZED GOVERNANCE.',
          'DEPLOYMENT: COMPANION APP DISTRIBUTION, LIVE MONITORING, AND SITE OPERATIONS SUPPORT.',
        ],
      },
    ],
    actions: [
      { id: 'download-ios', label: 'Download Companion iOS App', kind: 'external', target: 'env:ios' },
      {
        id: 'download-testflight',
        label: 'Open TestFlight Distribution',
        kind: 'external',
        target: 'env:testflight',
      },
      { id: 'enter-network', label: 'Start Access Workflow', kind: 'route', target: '/access' },
    ],
  },
  systems: {
    id: 'systems',
    route: '/systems',
    title: 'Tub Systems',
    subtitle: 'Input to inference to stage projection',
    command: 'systems.map(resolve: live)',
    sections: [
      {
        id: 'pipeline',
        title: 'Pipeline Overview',
        body: [
          'INPUT LAYER INGESTS BUTTONS, TOUCH, AMBIENT AUDIO, AND BODY TRACKING.',
          'INFERENCE LAYER SCORES INTENT INTO MODE, THOUGHT, AND SCENE PRESSURE.',
          'STAGE LAYER PROJECTS COMPOSITE OUTPUT TO PUBLIC-FACING SURFACES.',
        ],
      },
    ],
    actions: globalActions,
  },
  participation: {
    id: 'participation',
    route: '/participation',
    title: 'Participation Protocol',
    subtitle: 'Human signal policy and governance model',
    command: 'participation.inspect(scope: live)',
    sections: [
      {
        id: 'stack',
        title: 'Signal Sources',
        body: [
          'BUTTON CHANNELS: DISCRETE OVERRIDES AND MODE REQUESTS.',
          'OFF-SITE MIC: ALWAYS-ON AMBIENT CONTEXT.',
          'BODY TRACKING: MOTION, ORIENTATION, AND CROWD PRESSURE.',
          'ML MEDIATION: CROSS-MODAL DECISION STACK.',
        ],
      },
    ],
    actions: globalActions,
  },
  surfaces: {
    id: 'surfaces',
    route: '/surfaces',
    title: 'Companion Surfaces',
    subtitle: 'Steer, Play, Learn, and Settings',
    command: 'surfaces.list()',
    sections: [
      {
        id: 'surface-brief',
        title: 'Surface Matrix',
        body: [
          'STEER SENDS PREFERENCE VECTORS INTO THE LIVE MODEL.',
          'PLAY INJECTS USER AUDIO MATERIAL INTO THE ACTIVE ROUTE.',
          'LEARN PROVIDES ORIENTATION FOR OPERATORS AND PROCUREMENT TEAMS.',
          'SETTINGS COVERS LINK HEALTH, RECOVERY, AND PRIVILEGED CONTROLS.',
        ],
      },
    ],
    actions: globalActions,
  },
  telemetry: {
    id: 'telemetry',
    route: '/telemetry',
    title: 'Live Signal Board',
    subtitle: 'Link, feed, and freshness observability',
    command: 'telemetry.watch(stream: all)',
    sections: [
      {
        id: 'telemetry-brief',
        title: 'Observation Policy',
        body: [
          'STATUS CHIPS MUST ALWAYS REPORT TRUE LINK CONDITIONS.',
          'DEGRADED AND STANDBY STATES MAY NOT BE MASKED.',
          'TELEMETRY LOGS RECORD STATE TRANSITIONS FOR OVERSIGHT.',
        ],
      },
    ],
    actions: globalActions,
  },
  doctrine: {
    id: 'doctrine',
    route: '/doctrine',
    title: 'Operator Doctrine',
    subtitle: 'Compliance controls and consequence framework',
    command: 'doctrine.print(profile: operator)',
    sections: [
      {
        id: 'rules',
        title: 'Mandatory Rules',
        body: [
          'DO NOT CLAIM CONTROL WHEN LINK STATE IS UNKNOWN.',
          'PREFER SIGNAL QUALITY OVER INPUT VOLUME.',
          'ESCALATE TO STANDBY WHEN TELEMETRY DEGRADES BEYOND POLICY.',
        ],
      },
    ],
    actions: globalActions,
  },
  access: {
    id: 'access',
    route: '/access',
    title: 'Access Portal',
    subtitle: 'Role selection and deployment handoff',
    command: 'access.portal(open: true)',
    sections: [
      {
        id: 'roles',
        title: 'Role Channels',
        body: [
          'AUDIENCE OPERATOR: REAL-TIME VECTOR AND AUDIO PARTICIPATION.',
          'FLOOR TECH: LINK MONITORING AND ROUTE RECOVERY.',
          'ARCHIVE REVIEW: POST-SHOW LOG AND SNAPSHOT INSPECTION.',
        ],
      },
    ],
    actions: [
      { id: 'ios', label: 'Download Companion iOS App', kind: 'external', target: 'env:ios' },
      { id: 'testflight', label: 'Open TestFlight Distribution', kind: 'external', target: 'env:testflight' },
      { id: 'back-entry', label: 'Return to Overview', kind: 'route', target: '/' },
    ],
  },
}
