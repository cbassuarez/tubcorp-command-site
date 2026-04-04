import { Heerich } from 'heerich-runtime'

export function renderHeerichStage(intensity: number): string {
  try {
    const numericIntensity = Number(intensity)
    const safeIntensity = Number.isFinite(numericIntensity) ? numericIntensity : 0.35
    const clamped = Math.max(0, Math.min(1, safeIntensity))
    const engine = new Heerich({
      tile: [18, 18, 14],
      camera: { type: 'oblique', angle: 315, distance: 22 },
    })

    // Base stage plate (x/y footprint, z-up volume).
    engine.applyGeometry({
      type: 'box',
      position: [0, 0, 0],
      size: [12, 12, 1],
      style: {
        default: {
          fill: '#e6ddc9',
          stroke: 'rgba(27, 23, 17, 0.24)',
          'stroke-width': 0.75,
        },
        top: {
          fill: '#f4ecda',
        },
      },
    })

    // Boolean carve for a recessed chamber in the plate.
    engine.applyGeometry({
      type: 'sphere',
      center: [6, 6, 1.5],
      radius: 2.8,
      mode: 'subtract',
    })

    // Main volumetric scene mass: one scene, volume driven by intensity.
    const maxCoreHeight = 9
    const totalHeight = 1 + clamped * maxCoreHeight
    const wholeHeight = Math.max(1, Math.floor(totalHeight))
    const topFraction = totalHeight - wholeHeight

    engine.applyGeometry({
      type: 'box',
      position: [3, 3, 1],
      size: [6, 6, wholeHeight],
      style: {
        default: (_x: number, _y: number, z: number) => {
          const zNorm = Math.max(0, Math.min(1, (z - 1) / Math.max(1, maxCoreHeight)))
          const light = 0.86 - zNorm * 0.22
          const chroma = 0.04 + zNorm * 0.02
          return {
            fill: `oklch(${light.toFixed(3)} ${chroma.toFixed(3)} 88)`,
            stroke: 'rgba(32, 27, 20, 0.24)',
            strokeWidth: 0.75,
          }
        },
        top: {
          fill: clamped > 0.6 ? '#2ea35f' : '#efe6d3',
          stroke: 'rgba(32, 27, 20, 0.24)',
          strokeWidth: 0.75,
        },
      },
    })

    // Fractional top voxel scaling for smoother volume transitions between integer z steps.
    if (topFraction > 0.03) {
      engine.applyGeometry({
        type: 'box',
        position: [3, 3, 1 + wholeHeight],
        size: [6, 6, 1],
        scale: [1, 1, Math.max(0.08, topFraction)],
        scaleOrigin: [0.5, 0.5, 0],
        style: {
          default: {
            fill: '#eee4d0',
            stroke: 'rgba(32, 27, 20, 0.22)',
            strokeWidth: 0.7,
          },
          top: {
            fill: '#2ea35f',
            stroke: 'rgba(21, 58, 35, 0.3)',
            strokeWidth: 0.7,
          },
        },
      })
    }

    // Transparent guidance cage to expose depth relationships without adding a second scene.
    engine.applyGeometry({
      type: 'box',
      position: [2, 2, 1],
      size: [8, 8, maxCoreHeight + 2],
      opaque: false,
      style: {
        default: {
          fill: 'none',
          stroke: 'rgba(31, 124, 75, 0.28)',
          strokeWidth: 0.6,
          strokeDasharray: '3 1.5',
        },
      },
    })

    return engine.toSVG({ padding: 10 })
  } catch {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width:100%;height:100%"><rect x="24" y="24" width="152" height="152" fill="#f4ebd9" stroke="rgba(27,23,17,0.28)" stroke-width="2"/><rect x="42" y="42" width="116" height="116" fill="#d8ccb3" stroke="rgba(27,23,17,0.2)" stroke-width="1.5"/></svg>`
  }
}
