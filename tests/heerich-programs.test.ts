import { describe, expect, it } from 'vitest'
import { programs } from '@/components/heerich/programs'

describe('heerich programs', () => {
  it('produce non-empty voxel scenes for light and dark themes', () => {
    const sampleTimes = [0, 600, 1400]

    Object.values(programs).forEach((program) => {
      ;(['light', 'dark'] as const).forEach((theme) => {
        sampleTimes.forEach((elapsed) => {
          const scene = program.tick(elapsed, theme)
          expect(scene.voxels.length).toBeGreaterThan(0)
          expect(scene.voxels.some((voxel) => voxel.h > 0.25)).toBe(true)
          expect(Number.isFinite(scene.voxels[0].h)).toBe(true)
        })
      })
    })
  })
})
