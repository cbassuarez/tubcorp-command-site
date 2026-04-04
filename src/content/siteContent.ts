import type { CommandPageSpec, PageCommandAction } from '@/types/contracts'

export const shellNavigation = [
  { path: '/', label: 'ENTRY' },
  { path: '/systems', label: 'SYSTEMS' },
  { path: '/participation', label: 'PARTICIPATION' },
  { path: '/surfaces', label: 'SURFACES' },
  { path: '/telemetry', label: 'TELEMETRY' },
  { path: '/doctrine', label: 'DOCTRINE' },
  { path: '/access', label: 'ACCESS' },
] as const

export const globalActions: PageCommandAction[] = [
  { id: 'jump-surfaces', label: 'OPEN SURFACES', kind: 'route', target: '/surfaces' },
  { id: 'jump-telemetry', label: 'WATCH TELEMETRY', kind: 'route', target: '/telemetry' },
  { id: 'jump-access', label: 'ENTER RITUAL', kind: 'route', target: '/access' },
]

export const pageSpecs: Record<string, CommandPageSpec> = {
  entry: {
    id: 'entry',
    route: '/',
    title: 'ENTRY BRIEFING',
    subtitle: 'TUBCORP PUBLIC INTERFACE // COMMAND NETWORK',
    command: 'scli briefing open --channel public',
    sections: [
      {
        id: 'mission',
        title: 'MISSION STATEMENT',
        body: [
          'THE TUB IS A LIVE AUDIO-VISUAL SYSTEM OPERATING IN PUBLIC.',
          'TUBCORP PROVIDES GOVERNANCE LAYERS FOR AUDIENCE PARTICIPATION.',
          'THIS TERMINAL AUTHORIZES OPERATOR ROUTES INTO THE SYSTEM.',
        ],
      },
    ],
    actions: [
      { id: 'download-ios', label: 'DOWNLOAD IOS CLIENT', kind: 'external', target: 'env:ios' },
      {
        id: 'download-testflight',
        label: 'OPEN TESTFLIGHT',
        kind: 'external',
        target: 'env:testflight',
      },
      { id: 'enter-network', label: 'ENTER NETWORK', kind: 'route', target: '/access' },
    ],
  },
  systems: {
    id: 'systems',
    route: '/systems',
    title: 'TUB SYSTEMS',
    subtitle: 'INPUT -> INFERENCE -> STAGE -> FEED',
    command: 'scli system map --resolve live',
    sections: [
      {
        id: 'pipeline',
        title: 'PIPELINE OVERVIEW',
        body: [
          'INPUT STACK INGESTS BUTTONS, TOUCH, AMBIENT MIC, AND BODY DATA.',
          'INFERENCE LAYER SCORES SIGNALS INTO MODE, THOUGHT, AND VISUAL PRESSURE.',
          'STAGE LAYER PROJECTS COMPOSITE OUTPUT TO PUBLIC SURFACES.',
        ],
      },
    ],
    actions: globalActions,
  },
  participation: {
    id: 'participation',
    route: '/participation',
    title: 'PARTICIPATION PROTOCOL',
    subtitle: 'HUMAN SIGNAL POLICY // COLLECTIVE INPUT GOVERNANCE',
    command: 'scli participation inspect --scope live',
    sections: [
      {
        id: 'stack',
        title: 'SIGNAL SOURCES',
        body: [
          'BUTTON CHANNELS: DISCRETE OVERRIDES AND MODE REQUESTS.',
          'OFF-SITE MIC: ALWAYS-ON AMBIENT CONTEXT.',
          'KINECT BODY FIELD: MOTION, ORIENTATION, CLUSTER PRESSURE.',
          'ML MEDIATION: CROSS-MODAL DECISION STACK.',
        ],
      },
    ],
    actions: globalActions,
  },
  surfaces: {
    id: 'surfaces',
    route: '/surfaces',
    title: 'APP SURFACES',
    subtitle: 'STEER // PLAY // LEARN // SETTINGS',
    command: 'scli app surfaces --list',
    sections: [
      {
        id: 'surface-brief',
        title: 'SURFACE MATRIX',
        body: [
          'STEER SENDS PREFERENCE VECTORS INTO THE LIVE MODEL.',
          'PLAY INJECTS USER AUDIO MATERIAL INTO THE ACTIVE ROUTE.',
          'LEARN PRESENTS OPERATOR BRIEFING AND MANUAL CONTEXT.',
          'SETTINGS EXPOSES LINK HEALTH, RECOVERY, AND PRIVILEGED CONTROLS.',
        ],
      },
    ],
    actions: globalActions,
  },
  telemetry: {
    id: 'telemetry',
    route: '/telemetry',
    title: 'LIVE SIGNAL BOARD',
    subtitle: 'LINK + FEED + SNAPSHOT FRESHNESS',
    command: 'scli telemetry watch --stream all',
    sections: [
      {
        id: 'telemetry-brief',
        title: 'OBSERVATION POLICY',
        body: [
          'STATUS CHIPS MUST ALWAYS REPORT TRUE LINK CONDITIONS.',
          'DEGRADED AND STANDBY STATES MAY NOT BE MASKED.',
          'LOG TAPE CAPTURES SYSTEM TRANSITIONS FOR OPERATOR REVIEW.',
        ],
      },
    ],
    actions: globalActions,
  },
  doctrine: {
    id: 'doctrine',
    route: '/doctrine',
    title: 'OPERATOR DOCTRINE',
    subtitle: 'COMPLIANCE RULES // CONSEQUENCE FRAME',
    command: 'scli doctrine print --operator',
    sections: [
      {
        id: 'rules',
        title: 'MANDATORY RULES',
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
    title: 'ENTRY RITUAL',
    subtitle: 'ROLE SELECTION // CLIENT DELIVERY',
    command: 'scli access portal --open',
    sections: [
      {
        id: 'roles',
        title: 'ROLE CHANNELS',
        body: [
          'AUDIENCE OPERATOR: REAL-TIME VECTOR + AUDIO PARTICIPATION.',
          'FLOOR TECH: LINK MONITORING + ROUTE RECOVERY.',
          'ARCHIVE REVIEW: POST-SHOW LOG + SNAPSHOT INSPECTION.',
        ],
      },
    ],
    actions: [
      { id: 'ios', label: 'DOWNLOAD IOS CLIENT', kind: 'external', target: 'env:ios' },
      { id: 'testflight', label: 'OPEN TESTFLIGHT', kind: 'external', target: 'env:testflight' },
      { id: 'back-entry', label: 'RETURN TO ENTRY', kind: 'route', target: '/' },
    ],
  },
}
