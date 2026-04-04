import { Heerich } from 'heerich-runtime'

export interface HeerichProgram {
  id: string
  fps: number
  render: (elapsed: number) => string
}

function safeRender(fn: () => string): string {
  try {
    return fn()
  } catch {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width:100%;height:100%"><rect x="24" y="24" width="152" height="152" fill="#f4ebd9" stroke="rgba(27,23,17,0.28)" stroke-width="2"/></svg>'
  }
}

/**
 * Slow-breathing volume that grows and contracts. Homepage hero.
 */
export const heroPulse: HeerichProgram = {
  id: 'hero-pulse',
  fps: 8,
  render(elapsed: number) {
    return safeRender(() => {
      const t = elapsed / 1000
      const breath = 0.35 + 0.3 * Math.sin(t * 0.4) + 0.1 * Math.sin(t * 0.17)
      const clamped = Math.max(0, Math.min(1, breath))
      const maxH = 9
      const totalH = 1 + clamped * maxH
      const whole = Math.max(1, Math.floor(totalH))
      const frac = totalH - whole

      const engine = new Heerich({
        tile: [18, 18, 14],
        camera: { type: 'oblique', angle: 315, distance: 22 },
      })

      // Base plate
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [12, 12, 1],
        style: { default: { fill: '#e6ddc9', stroke: 'rgba(27,23,17,0.24)', 'stroke-width': 0.75 }, top: { fill: '#f4ecda' } },
      })

      engine.applyGeometry({ type: 'sphere', center: [6, 6, 1.5], radius: 2.8, mode: 'subtract' })

      // Main volume
      const hueShift = Math.sin(t * 0.12) * 8
      engine.applyGeometry({
        type: 'box', position: [3, 3, 1], size: [6, 6, whole],
        style: {
          default: (_x: number, _y: number, z: number) => {
            const zN = Math.max(0, Math.min(1, (z - 1) / Math.max(1, maxH)))
            const light = 0.86 - zN * 0.22
            const chroma = 0.04 + zN * 0.02
            return { fill: `oklch(${light.toFixed(3)} ${chroma.toFixed(3)} ${(88 + hueShift).toFixed(0)})`, stroke: 'rgba(32,27,20,0.24)', strokeWidth: 0.75 }
          },
          top: { fill: clamped > 0.5 ? '#2ea35f' : '#efe6d3', stroke: 'rgba(32,27,20,0.24)', strokeWidth: 0.75 },
        },
      })

      if (frac > 0.03) {
        engine.applyGeometry({
          type: 'box', position: [3, 3, 1 + whole], size: [6, 6, 1],
          scale: [1, 1, Math.max(0.08, frac)], scaleOrigin: [0.5, 0.5, 0],
          style: { default: { fill: '#eee4d0', stroke: 'rgba(32,27,20,0.22)', strokeWidth: 0.7 }, top: { fill: '#2ea35f', stroke: 'rgba(21,58,35,0.3)', strokeWidth: 0.7 } },
        })
      }

      // Guidance cage
      engine.applyGeometry({
        type: 'box', position: [2, 2, 1], size: [8, 8, maxH + 2], opaque: false,
        style: { default: { fill: 'none', stroke: 'rgba(31,124,75,0.28)', strokeWidth: 0.6, strokeDasharray: '3 1.5' } },
      })

      return engine.toSVG({ padding: 10 })
    })
  },
}

/**
 * Three sequential volumes lighting up. Platform pipeline.
 */
export const pipelineFlow: HeerichProgram = {
  id: 'pipeline-flow',
  fps: 6,
  render(elapsed: number) {
    return safeRender(() => {
      const t = elapsed / 1000
      const phase = (t * 0.3) % 3

      const engine = new Heerich({
        tile: [14, 14, 12],
        camera: { type: 'oblique', angle: 315, distance: 26 },
      })

      // Base
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [18, 6, 1],
        style: { default: { fill: '#e6ddc9', stroke: 'rgba(27,23,17,0.20)', 'stroke-width': 0.6 }, top: { fill: '#f4ecda' } },
      })

      const columns = [
        { x: 1, label: 'INGEST' },
        { x: 7, label: 'INFER' },
        { x: 13, label: 'STAGE' },
      ]

      columns.forEach((col, i) => {
        const dist = Math.abs(phase - i)
        const intensity = Math.max(0, 1 - dist * 0.7)
        const h = Math.max(1, Math.round(1 + intensity * 6))
        const active = intensity > 0.4

        engine.applyGeometry({
          type: 'box', position: [col.x, 1, 1], size: [4, 4, h],
          style: {
            default: { fill: active ? '#d4e8da' : '#e6ddc9', stroke: 'rgba(27,23,17,0.20)', strokeWidth: 0.6 },
            top: { fill: active ? '#2ea35f' : '#efe6d3' },
          },
        })
      })

      return engine.toSVG({ padding: 10 })
    })
  },
}

/**
 * Vertical bars shifting like an audio visualizer. Harness page.
 */
export const signalCascade: HeerichProgram = {
  id: 'signal-cascade',
  fps: 8,
  render(elapsed: number) {
    return safeRender(() => {
      const t = elapsed / 1000

      const engine = new Heerich({
        tile: [14, 14, 12],
        camera: { type: 'oblique', angle: 315, distance: 24 },
      })

      // Base
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [14, 6, 1],
        style: { default: { fill: '#e6ddc9', stroke: 'rgba(27,23,17,0.18)', 'stroke-width': 0.5 }, top: { fill: '#f4ecda' } },
      })

      for (let i = 0; i < 11; i++) {
        const freq = 0.3 + i * 0.07
        const phase = i * 0.8
        const h = Math.max(1, Math.round(1 + 5 * (0.5 + 0.5 * Math.sin(t * freq + phase))))
        const active = h > 3

        engine.applyGeometry({
          type: 'box', position: [1 + i, 2, 1], size: [1, 2, h],
          style: {
            default: { fill: active ? '#d4e8da' : '#e8e0cd', stroke: 'rgba(27,23,17,0.15)', strokeWidth: 0.5 },
            top: { fill: active ? '#2ea35f' : '#ddd5c2' },
          },
        })
      }

      return engine.toSVG({ padding: 8 })
    })
  },
}

/**
 * Gentle random mutation. Ambient fallback.
 */
export const idleDrift: HeerichProgram = {
  id: 'idle-drift',
  fps: 4,
  render(elapsed: number) {
    return safeRender(() => {
      const t = elapsed / 1000
      const intensity = 0.25 + 0.15 * Math.sin(t * 0.2) + 0.08 * Math.sin(t * 0.37)

      const engine = new Heerich({
        tile: [18, 18, 14],
        camera: { type: 'oblique', angle: 315, distance: 22 },
      })

      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [12, 12, 1],
        style: { default: { fill: '#e6ddc9', stroke: 'rgba(27,23,17,0.24)', 'stroke-width': 0.75 }, top: { fill: '#f4ecda' } },
      })

      const h = Math.max(1, Math.round(1 + intensity * 6))
      engine.applyGeometry({
        type: 'box', position: [3, 3, 1], size: [6, 6, h],
        style: {
          default: { fill: '#e8e0cd', stroke: 'rgba(27,23,17,0.20)', strokeWidth: 0.6 },
          top: { fill: intensity > 0.35 ? '#2ea35f' : '#efe6d3' },
        },
      })

      return engine.toSVG({ padding: 10 })
    })
  },
}

/**
 * Dramatic pulsing sphere. Physical entry page.
 */
export const entryInduction: HeerichProgram = {
  id: 'entry-induction',
  fps: 10,
  render(elapsed: number) {
    return safeRender(() => {
      const t = elapsed / 1000
      const pulse = 0.4 + 0.6 * Math.pow(Math.sin(t * 0.8) * 0.5 + 0.5, 1.5)
      const radius = 2 + pulse * 3.5

      const engine = new Heerich({
        tile: [16, 16, 14],
        camera: { type: 'oblique', angle: 315, distance: 20 },
      })

      engine.applyGeometry({
        type: 'sphere', center: [6, 6, 5], radius: Math.round(radius),
        style: {
          default: {
            fill: pulse > 0.7 ? '#2ea35f' : `oklch(${(0.6 + pulse * 0.2).toFixed(2)} 0.08 145)`,
            stroke: 'rgba(31,124,75,0.4)',
            strokeWidth: 0.8,
          },
        },
      })

      // Cage
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [12, 12, 12], opaque: false,
        style: { default: { fill: 'none', stroke: 'rgba(31,124,75,0.18)', strokeWidth: 0.5, strokeDasharray: '2 2' } },
      })

      return engine.toSVG({ padding: 10 })
    })
  },
}

export const programs: Record<string, HeerichProgram> = {
  'hero-pulse': heroPulse,
  'pipeline-flow': pipelineFlow,
  'signal-cascade': signalCascade,
  'idle-drift': idleDrift,
  'entry-induction': entryInduction,
}
