export type TelemetrySource = 'simulated' | 'remote'

export type LinkState = 'CONNECTED' | 'MISSING' | 'SIMULATED'
export type FeedState = 'LIVE' | 'DEGRADED' | 'STANDBY' | 'SIMULATED'
export type AccessState = 'OPEN' | 'RESTRICTED' | 'LOCKED'
export type TelemetryFreshness = 'LIVE' | 'DEGRADED' | 'STANDBY'

export interface TelemetryState {
  link: LinkState
  feed: FeedState
  access: AccessState
  mode: string
  freshness: TelemetryFreshness
  timestamp: number
  source: TelemetrySource
}

export interface StageSnapshot {
  scene: string
  thought: string
  logLines: string[]
  intensity: number
  ts: number
}

export type PageActionKind = 'route' | 'external' | 'command'

export interface PageCommandAction {
  id: string
  label: string
  kind: PageActionKind
  target: string
  requiresAccess?: boolean
}

export interface Directive {
  id: string
  code: string
  title: string
  body: string
}

export interface SectionBlock {
  id: string
  title: string
  body: string[]
  directives?: Directive[]
}

export interface CommandPageSpec {
  id: string
  route: string
  title: string
  subtitle: string
  command: string
  sections: SectionBlock[]
  actions: PageCommandAction[]
}

export interface TelemetryPacket {
  state?: Partial<TelemetryState>
  snapshot?: Partial<StageSnapshot>
  logLine?: string
  receivedAt?: number
}

/* ── Marketing block system ────────────────────────────────── */

interface BlockBase {
  id: string
}

export interface HeroBlock extends BlockBase {
  type: 'hero'
  headline: string
  subheadline?: string
  eyebrow?: string
  body?: string
  actions: PageCommandAction[]
  heerichProgram?: string
  variant: 'full' | 'compact' | 'dark'
}

export interface ProseBlock extends BlockBase {
  type: 'prose'
  title?: string
  eyebrow?: string
  body: string
  align?: 'left' | 'center'
}

export interface FeatureGridBlock extends BlockBase {
  type: 'featureGrid'
  title?: string
  eyebrow?: string
  columns: 2 | 3 | 4
  items: {
    title: string
    body: string
    icon?: string
    link?: string
  }[]
}

export interface StatBarBlock extends BlockBase {
  type: 'statBar'
  items: {
    value: string
    label: string
    accent?: 'signal' | 'cyan' | 'amber'
  }[]
}

export interface QuoteBlock extends BlockBase {
  type: 'quote'
  text: string
  attribution: string
  role?: string
  organization?: string
}

export interface HeerichBlock extends BlockBase {
  type: 'heerich'
  program: string
  height?: string
  caption?: string
}

export interface CTABlock extends BlockBase {
  type: 'cta'
  headline: string
  body?: string
  actions: PageCommandAction[]
  variant: 'light' | 'dark' | 'signal'
}

export interface CardGridBlock extends BlockBase {
  type: 'cardGrid'
  title?: string
  eyebrow?: string
  columns?: 2 | 3 | 4
  items: CardItem[]
}

export type CardItem =
  | CaseStudyCard
  | TeamCard
  | JobCard
  | PressCard
  | BlogCard

export interface CaseStudyCard {
  cardType: 'caseStudy'
  slug: string
  title: string
  summary: string
  metric?: string
  metricLabel?: string
  heerichProgram?: string
}

export interface TeamCard {
  cardType: 'team'
  name: string
  title: string
  bio: string
  heerichSeed?: number
}

export interface JobCard {
  cardType: 'job'
  title: string
  department: string
  location: string
  description: string
}

export interface PressCard {
  cardType: 'press'
  date: string
  title: string
  source?: string
  summary: string
  href?: string
}

export interface BlogCard {
  cardType: 'blog'
  slug: string
  date: string
  title: string
  summary: string
  author?: string
}

export interface PipelineBlock extends BlockBase {
  type: 'pipeline'
  title?: string
  eyebrow?: string
  steps: {
    label: string
    body: string
    heerichProgram?: string
  }[]
}

export interface TierBlock extends BlockBase {
  type: 'tiers'
  title?: string
  eyebrow?: string
  items: {
    name: string
    description: string
    features: string[]
    cta: PageCommandAction
    highlighted?: boolean
  }[]
}

export interface SplitBlock extends BlockBase {
  type: 'split'
  title?: string
  eyebrow?: string
  body: string
  heerichProgram?: string
  imagePosition: 'left' | 'right'
  actions?: PageCommandAction[]
}

export interface DividerBlock extends BlockBase {
  type: 'divider'
  variant: 'line' | 'signal' | 'spacer'
}

export interface TelemetryWidgetBlock extends BlockBase {
  type: 'telemetryWidget'
  title?: string
  compact?: boolean
}

export interface CommandSectionBlock extends BlockBase {
  type: 'commandSection'
  title: string
  body: string[]
  directives?: Directive[]
}

export type ContentBlock =
  | HeroBlock
  | ProseBlock
  | FeatureGridBlock
  | StatBarBlock
  | QuoteBlock
  | HeerichBlock
  | CTABlock
  | CardGridBlock
  | PipelineBlock
  | TierBlock
  | SplitBlock
  | DividerBlock
  | TelemetryWidgetBlock
  | CommandSectionBlock

export interface MarketingPageSpec {
  id: string
  route: string
  title: string
  description: string
  blocks: ContentBlock[]
}
