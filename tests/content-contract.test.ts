import { describe, expect, it } from 'vitest'
import { pageSpecs } from '@/content/siteContent'

describe('page content contract', () => {
  it('contains required page specs and non-empty titles', () => {
    const required = ['entry', 'systems', 'participation', 'surfaces', 'telemetry', 'doctrine', 'access']
    required.forEach((id) => {
      const spec = pageSpecs[id]
      expect(spec).toBeTruthy()
      expect(spec.title.length).toBeGreaterThan(0)
      expect(spec.sections.length).toBeGreaterThan(0)
    })
  })

  it('uses all-caps command titles', () => {
    Object.values(pageSpecs).forEach((spec) => {
      expect(spec.title).toBe(spec.title.toUpperCase())
    })
  })
})
