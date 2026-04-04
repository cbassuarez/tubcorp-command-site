import { Heerich } from 'heerich-runtime'

export type HeerichTheme = 'light' | 'dark'

export interface HeerichProgram {
  id: string
  fps: number
  render: (elapsed: number, theme: HeerichTheme) => string
}

const PALETTES = {
  light: {
    baseFill: '#f0f0f0',
    baseStroke: 'rgba(0,0,0,0.12)',
    baseTop: '#fafafa',
    voxelFill: '#e4e4e4',
    voxelStroke: 'rgba(0,0,0,0.10)',
    voxelTop: '#eeeeee',
    activeTop: '#0a9f45',
    activeFill: '#c8e6d4',
    cageLine: 'rgba(10,159,69,0.18)',
    subtle: '#d8d8d8',
  },
  dark: {
    baseFill: '#1a1a1a',
    baseStroke: 'rgba(255,255,255,0.08)',
    baseTop: '#222222',
    voxelFill: '#252525',
    voxelStroke: 'rgba(255,255,255,0.06)',
    voxelTop: '#2a2a2a',
    activeTop: '#2ea35f',
    activeFill: '#1a3326',
    cageLine: 'rgba(46,163,95,0.22)',
    subtle: '#333333',
  },
} as const

function p(theme: HeerichTheme) {
  return PALETTES[theme]
}

function safeRender(fn: () => string): string {
  try {
    return fn()
  } catch {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width:100%;height:100%"><rect x="24" y="24" width="152" height="152" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-opacity="0.15" stroke-width="2"/></svg>'
  }
}

/**
 * Slow-breathing volume with radial concentric rings. Homepage hero.
 */
export const heroPulse: HeerichProgram = {
  id: 'hero-pulse',
  fps: 14,
  render(elapsed: number, theme: HeerichTheme) {
    return safeRender(() => {
      const c = p(theme)
      const t = elapsed / 1000
      const breath = 0.35 + 0.3 * Math.sin(t * 0.4) + 0.1 * Math.sin(t * 0.17)
      const clamped = Math.max(0, Math.min(1, breath))
      const maxH = 9
      const totalH = 1 + clamped * maxH
      const whole = Math.max(1, Math.floor(totalH))
      const frac = totalH - whole

      const engine = new Heerich({
        tile: [16, 16, 12],
        camera: { type: 'oblique', angle: 315, distance: 20 },
      })

      // Base plate
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [14, 14, 1],
        style: { default: { fill: c.baseFill, stroke: c.baseStroke, 'stroke-width': 0.75 }, top: { fill: c.baseTop } },
      })

      engine.applyGeometry({ type: 'sphere', center: [7, 7, 1.5], radius: 3.2, mode: 'subtract' })

      // Outer ring — low, ambient
      const ringH = Math.max(1, Math.round(1 + clamped * 2))
      engine.applyGeometry({
        type: 'box', position: [1, 1, 1], size: [12, 12, ringH],
        style: { default: { fill: c.subtle, stroke: c.voxelStroke, strokeWidth: 0.5 }, top: { fill: clamped > 0.6 ? c.activeFill : c.voxelTop } },
      })
      // Cut inner void for ring effect
      engine.applyGeometry({
        type: 'box', position: [3, 3, 1], size: [8, 8, ringH + 1], mode: 'subtract',
      })

      // Mid ring
      const midH = Math.max(1, Math.round(1 + clamped * 5))
      engine.applyGeometry({
        type: 'box', position: [3, 3, 1], size: [8, 8, midH],
        style: { default: { fill: c.voxelFill, stroke: c.voxelStroke, strokeWidth: 0.6 }, top: { fill: clamped > 0.45 ? c.activeFill : c.voxelTop } },
      })
      engine.applyGeometry({
        type: 'box', position: [5, 5, 1], size: [4, 4, midH + 1], mode: 'subtract',
      })

      // Core volume
      const hueShift = Math.sin(t * 0.12) * 8
      engine.applyGeometry({
        type: 'box', position: [5, 5, 1], size: [4, 4, whole],
        style: {
          default: (_x: number, _y: number, z: number) => {
            const zN = Math.max(0, Math.min(1, (z - 1) / Math.max(1, maxH)))
            const light = theme === 'dark' ? 0.22 + zN * 0.12 : 0.88 - zN * 0.18
            const chroma = 0.03 + zN * 0.02
            return { fill: `oklch(${light.toFixed(3)} ${chroma.toFixed(3)} ${(160 + hueShift).toFixed(0)})`, stroke: c.voxelStroke, strokeWidth: 0.6 }
          },
          top: { fill: clamped > 0.5 ? c.activeTop : c.voxelTop, stroke: c.voxelStroke, strokeWidth: 0.6 },
        },
      })

      if (frac > 0.03) {
        engine.applyGeometry({
          type: 'box', position: [5, 5, 1 + whole], size: [4, 4, 1],
          scale: [1, 1, Math.max(0.08, frac)], scaleOrigin: [0.5, 0.5, 0],
          style: { default: { fill: c.voxelFill, stroke: c.voxelStroke, strokeWidth: 0.6 }, top: { fill: c.activeTop, stroke: c.voxelStroke, strokeWidth: 0.6 } },
        })
      }

      // Guidance cage
      engine.applyGeometry({
        type: 'box', position: [1, 1, 1], size: [12, 12, maxH + 2], opaque: false,
        style: { default: { fill: 'none', stroke: c.cageLine, strokeWidth: 0.5, strokeDasharray: '3 1.5' } },
      })

      return engine.toSVG({ padding: 10 })
    })
  },
}

/**
 * Five sequential volumes lighting up in a flowing wave. Platform pipeline.
 */
export const pipelineFlow: HeerichProgram = {
  id: 'pipeline-flow',
  fps: 12,
  render(elapsed: number, theme: HeerichTheme) {
    return safeRender(() => {
      const c = p(theme)
      const t = elapsed / 1000
      const phase = (t * 0.35) % 5

      const engine = new Heerich({
        tile: [12, 12, 10],
        camera: { type: 'oblique', angle: 315, distance: 28 },
      })

      // Base
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [22, 8, 1],
        style: { default: { fill: c.baseFill, stroke: c.baseStroke, 'stroke-width': 0.5 }, top: { fill: c.baseTop } },
      })

      const columns = [
        { x: 1, label: 'CAPTURE' },
        { x: 5, label: 'INGEST' },
        { x: 9, label: 'INFER' },
        { x: 13, label: 'STAGE' },
        { x: 17, label: 'EMIT' },
      ]

      columns.forEach((col, i) => {
        const dist = Math.abs(phase - i)
        const intensity = Math.max(0, 1 - dist * 0.45)
        const h = Math.max(1, Math.round(1 + intensity * 7))
        const active = intensity > 0.35

        engine.applyGeometry({
          type: 'box', position: [col.x, 2, 1], size: [3, 4, h],
          style: {
            default: { fill: active ? c.activeFill : c.voxelFill, stroke: c.voxelStroke, strokeWidth: 0.5 },
            top: { fill: active ? c.activeTop : c.voxelTop },
          },
        })

        // Connector bar between columns
        if (i < columns.length - 1) {
          const connH = Math.max(1, Math.round(intensity * 2))
          engine.applyGeometry({
            type: 'box', position: [col.x + 3, 3, 1], size: [1, 2, connH],
            style: { default: { fill: c.subtle, stroke: c.voxelStroke, strokeWidth: 0.4 }, top: { fill: active ? c.activeFill : c.subtle } },
          })
        }
      })

      return engine.toSVG({ padding: 10 })
    })
  },
}

/**
 * Vertical bars shifting like an audio visualizer with depth rows. Harness page.
 */
export const signalCascade: HeerichProgram = {
  id: 'signal-cascade',
  fps: 14,
  render(elapsed: number, theme: HeerichTheme) {
    return safeRender(() => {
      const c = p(theme)
      const t = elapsed / 1000

      const engine = new Heerich({
        tile: [12, 12, 10],
        camera: { type: 'oblique', angle: 315, distance: 24 },
      })

      // Base
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [18, 8, 1],
        style: { default: { fill: c.baseFill, stroke: c.baseStroke, 'stroke-width': 0.5 }, top: { fill: c.baseTop } },
      })

      for (let i = 0; i < 16; i++) {
        const freq = 0.35 + i * 0.06
        const ph = i * 0.7
        const raw = 0.5 + 0.5 * Math.sin(t * freq + ph)
        const h = Math.max(1, Math.round(1 + 6 * raw))
        const active = h > 3

        // Front row
        engine.applyGeometry({
          type: 'box', position: [1 + i, 2, 1], size: [1, 3, h],
          style: {
            default: { fill: active ? c.activeFill : c.voxelFill, stroke: c.voxelStroke, strokeWidth: 0.4 },
            top: { fill: active ? c.activeTop : c.voxelTop },
          },
        })

        // Back row (lower echo)
        const bh = Math.max(1, Math.round(h * 0.5))
        engine.applyGeometry({
          type: 'box', position: [1 + i, 5, 1], size: [1, 2, bh],
          style: {
            default: { fill: c.subtle, stroke: c.voxelStroke, strokeWidth: 0.3 },
            top: { fill: active ? c.activeFill : c.subtle },
          },
        })
      }

      return engine.toSVG({ padding: 8 })
    })
  },
}

/**
 * Perlin-like surface drift. Ambient fallback.
 */
export const idleDrift: HeerichProgram = {
  id: 'idle-drift',
  fps: 10,
  render(elapsed: number, theme: HeerichTheme) {
    return safeRender(() => {
      const c = p(theme)
      const t = elapsed / 1000

      const engine = new Heerich({
        tile: [16, 16, 12],
        camera: { type: 'oblique', angle: 315, distance: 22 },
      })

      // Base plate
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [10, 10, 1],
        style: { default: { fill: c.baseFill, stroke: c.baseStroke, 'stroke-width': 0.6 }, top: { fill: c.baseTop } },
      })

      // 8x8 grid of individual pillars with wave heights
      for (let x = 1; x < 9; x++) {
        for (let y = 1; y < 9; y++) {
          const dx = x - 4.5
          const dy = y - 4.5
          const dist = Math.sqrt(dx * dx + dy * dy)
          const wave = Math.sin(t * 0.3 + dist * 0.6) * 0.5 + 0.5
          const secondary = Math.sin(t * 0.18 + x * 0.4 + y * 0.5) * 0.3
          const h = Math.max(1, Math.round(1 + (wave + secondary) * 3))
          const active = wave > 0.6

          engine.applyGeometry({
            type: 'box', position: [x, y, 1], size: [1, 1, h],
            style: {
              default: { fill: active ? c.activeFill : c.voxelFill, stroke: c.voxelStroke, strokeWidth: 0.4 },
              top: { fill: active ? c.activeTop : c.voxelTop },
            },
          })
        }
      }

      return engine.toSVG({ padding: 10 })
    })
  },
}

/**
 * Dramatic pulsing sphere with expanding ring. Physical entry page.
 */
export const entryInduction: HeerichProgram = {
  id: 'entry-induction',
  fps: 14,
  render(elapsed: number, theme: HeerichTheme) {
    return safeRender(() => {
      const c = p(theme)
      const t = elapsed / 1000
      const pulse = 0.4 + 0.6 * Math.pow(Math.sin(t * 0.8) * 0.5 + 0.5, 1.5)
      const radius = 2 + pulse * 4

      const engine = new Heerich({
        tile: [14, 14, 12],
        camera: { type: 'oblique', angle: 315, distance: 20 },
      })

      // Base ring that expands with pulse
      const ringR = Math.round(3 + pulse * 2)
      engine.applyGeometry({
        type: 'box', position: [6 - ringR, 6 - ringR, 0], size: [ringR * 2, ringR * 2, 1],
        style: { default: { fill: c.baseFill, stroke: c.baseStroke, strokeWidth: 0.5 }, top: { fill: c.baseTop } },
      })

      // Core sphere
      engine.applyGeometry({
        type: 'sphere', center: [6, 6, 5], radius: Math.round(radius),
        style: {
          default: {
            fill: pulse > 0.7 ? c.activeTop : c.activeFill,
            stroke: c.cageLine,
            strokeWidth: 0.7,
          },
        },
      })

      // Orbiting small volumes
      for (let i = 0; i < 4; i++) {
        const angle = (t * 0.5 + i * Math.PI / 2)
        const ox = Math.round(6 + Math.cos(angle) * 4)
        const oy = Math.round(6 + Math.sin(angle) * 4)
        if (ox >= 0 && ox <= 11 && oy >= 0 && oy <= 11) {
          engine.applyGeometry({
            type: 'box', position: [ox, oy, 2], size: [1, 1, Math.round(1 + pulse * 2)],
            style: { default: { fill: c.activeFill, stroke: c.cageLine, strokeWidth: 0.5 }, top: { fill: c.activeTop } },
          })
        }
      }

      // Cage
      engine.applyGeometry({
        type: 'box', position: [0, 0, 0], size: [12, 12, 12], opaque: false,
        style: { default: { fill: 'none', stroke: c.cageLine, strokeWidth: 0.4, strokeDasharray: '2 2' } },
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
