import { Heerich } from 'heerich-runtime'

export function renderHeerichStage(intensity: number): string {
  try {
    const numericIntensity = Number(intensity)
    const safeIntensity = Number.isFinite(numericIntensity) ? numericIntensity : 0.35
    const clamped = Math.max(0, Math.min(1, safeIntensity))
    const engine = new Heerich({
      tile: [20, 20, 16],
      camera: { type: 'perspective', position: [5, 5], distance: 26 },
    })

    // Single top-down scene volume; only height changes as signal intensity changes.
    const sceneHeight = 1.5 + clamped * 9.5
    engine.applyGeometry({
      type: 'box',
      position: [1, 0, 1],
      size: [8, sceneHeight, 8],
      style: {
        default: {
          fill: '#d8ccb3',
          stroke: 'rgba(27, 23, 17, 0.24)',
          'stroke-width': 0.75,
        },
        top: {
          fill: '#f4ebd9',
        },
        left: {
          fill: '#c4b79b',
        },
        right: {
          fill: '#b6a98d',
        },
      },
    })

    return engine.toSVG()
  } catch {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width:100%;height:100%"><rect x="24" y="24" width="152" height="152" fill="#f4ebd9" stroke="rgba(27,23,17,0.28)" stroke-width="2"/><rect x="42" y="42" width="116" height="116" fill="#d8ccb3" stroke="rgba(27,23,17,0.2)" stroke-width="1.5"/></svg>`
  }
}
