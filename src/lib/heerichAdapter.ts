import { Heerich } from 'heerich-runtime'

export function renderHeerichStage(intensity: number, theme: 'light' | 'dark' = 'light'): string {
  try {
    const numericIntensity = Number(intensity)
    const safeIntensity = Number.isFinite(numericIntensity) ? numericIntensity : 0.35
    const clamped = Math.max(0, Math.min(1, safeIntensity))

    const isDark = theme === 'dark'
    const baseFill = isDark ? '#1a1a1a' : '#f0f0f0'
    const baseStroke = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'
    const baseTop = isDark ? '#222222' : '#fafafa'
    const voxelFill = isDark ? '#252525' : '#e4e4e4'
    const voxelStroke = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.10)'
    const voxelTop = isDark ? '#2a2a2a' : '#eeeeee'
    const activeTop = isDark ? '#2ea35f' : '#0a9f45'
    const cageLine = isDark ? 'rgba(46,163,95,0.22)' : 'rgba(10,159,69,0.18)'

    const engine = new Heerich({
      tile: [18, 18, 14],
      camera: { type: 'oblique', angle: 315, distance: 22 },
    })

    engine.applyGeometry({
      type: 'box',
      position: [0, 0, 0],
      size: [12, 12, 1],
      style: {
        default: { fill: baseFill, stroke: baseStroke, 'stroke-width': 0.75 },
        top: { fill: baseTop },
      },
    })

    engine.applyGeometry({
      type: 'sphere',
      center: [6, 6, 1.5],
      radius: 2.8,
      mode: 'subtract',
    })

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
          const light = isDark ? 0.22 + zNorm * 0.12 : 0.88 - zNorm * 0.18
          const chroma = 0.03 + zNorm * 0.02
          return {
            fill: `oklch(${light.toFixed(3)} ${chroma.toFixed(3)} 160)`,
            stroke: voxelStroke,
            strokeWidth: 0.75,
          }
        },
        top: {
          fill: clamped > 0.6 ? activeTop : voxelTop,
          stroke: voxelStroke,
          strokeWidth: 0.75,
        },
      },
    })

    if (topFraction > 0.03) {
      engine.applyGeometry({
        type: 'box',
        position: [3, 3, 1 + wholeHeight],
        size: [6, 6, 1],
        scale: [1, 1, Math.max(0.08, topFraction)],
        scaleOrigin: [0.5, 0.5, 0],
        style: {
          default: { fill: voxelFill, stroke: voxelStroke, strokeWidth: 0.7 },
          top: { fill: activeTop, stroke: voxelStroke, strokeWidth: 0.7 },
        },
      })
    }

    engine.applyGeometry({
      type: 'box',
      position: [2, 2, 1],
      size: [8, 8, maxCoreHeight + 2],
      opaque: false,
      style: {
        default: {
          fill: 'none',
          stroke: cageLine,
          strokeWidth: 0.6,
          strokeDasharray: '3 1.5',
        },
      },
    })

    return engine.toSVG({ padding: 10 })
  } catch {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width:100%;height:100%"><rect x="24" y="24" width="152" height="152" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-opacity="0.15" stroke-width="2"/></svg>'
  }
}
