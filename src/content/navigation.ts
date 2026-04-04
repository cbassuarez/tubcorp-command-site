export interface NavItem {
  label: string
  path?: string
  children?: NavItem[]
  highlighted?: boolean
}

export const topNavigation: NavItem[] = [
  {
    label: 'Platform',
    path: '/platform',
    children: [
      { label: 'Overview', path: '/platform' },
      { label: 'Signal Processing', path: '/platform/harness' },
      { label: 'Inference Governance', path: '/platform/policy-engine' },
      { label: 'Companion Surfaces', path: '/platform/surfaces' },
      { label: 'Observability', path: '/platform/observability' },
    ],
  },
  {
    label: 'Solutions',
    path: '/solutions',
  },
  {
    label: 'Case Studies',
    path: '/case-studies',
  },
  {
    label: 'Company',
    path: '/company',
    children: [
      { label: 'About', path: '/company' },
      { label: 'Careers', path: '/company/careers' },
      { label: 'Press', path: '/company/press' },
    ],
  },
  {
    label: 'Procurement',
    path: '/procurement',
  },
  {
    label: 'Operators',
    path: '/operators',
    highlighted: true,
  },
]

export const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Overview', path: '/platform' },
      { label: 'Signal Processing', path: '/platform/harness' },
      { label: 'Inference Governance', path: '/platform/policy-engine' },
      { label: 'Companion Surfaces', path: '/platform/surfaces' },
      { label: 'Observability', path: '/platform/observability' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/company' },
      { label: 'Careers', path: '/company/careers' },
      { label: 'Press', path: '/company/press' },
      { label: 'Procurement', path: '/procurement' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Solutions', path: '/solutions' },
      { label: 'Operator Portal', path: '/operators' },
      { label: 'Privacy & Compliance', path: '/privacy' },
    ],
  },
]
