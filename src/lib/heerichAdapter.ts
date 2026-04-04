import { Heerich } from 'heerich-runtime'

export function renderHeerichStage(intensity: number): string {
  const engine = new Heerich({
    tile: 24,
    camera: { type: 'oblique', angle: 45, distance: 13 },
  })

  const peak = Math.max(2, Math.round(2 + intensity * 7))
  for (let z = 0; z < 10; z += 1) {
    for (let x = 0; x < 10; x += 1) {
      const wave = Math.sin((x + z) * 0.75 + intensity * 4)
      const height = Math.max(1, Math.round(peak * (0.5 + wave * 0.35)))
      engine.applyGeometry({
        type: 'box',
        position: [x, 0, z],
        size: [1, height, 1],
        style: {
          default: {
            fill: '#041408',
            stroke: 'rgba(0,255,65,0.16)',
            'stroke-width': 0.5,
          },
          top: {
            fill: '#0b3116',
          },
        },
      })
    }
  }

  return engine.toSVG()
}
