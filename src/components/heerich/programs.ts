import type { IsoScene, Voxel } from '@/lib/isoRenderer'

export type HeerichTheme = 'light' | 'dark'

export interface HeerichProgram {
  id: string
  fps: number
  gridW: number
  gridD: number
  maxZ: number
  tick: (elapsed: number, theme: HeerichTheme) => IsoScene
}

// ── Palettes ──

// ── Palettes (derived from funky-shadow "plasma" preset) ──
// plasma stops: [0,0,135] [135,0,175] [255,0,85] [255,175,0] [255,255,85] [85,255,85] [0,175,175]

const PALETTES = {
  light: {
    baseFill: '#d9d0e8', baseStroke: '#8b7da3', baseTop: '#efe8f8',
    voxFill: '#c4b0d8', voxStroke: '#8060a0', voxTop: '#d8c8e8',
    actFill: '#c830a0', actStroke: '#8700af', actTop: '#ff0055',
    hiTop: '#ffaf00', hiFill: '#e04088',
    dimFill: '#b0a0c0', dimTop: '#c8b8d8',
  },
  dark: {
    baseFill: '#140020', baseStroke: '#2a0040', baseTop: '#1a0030',
    voxFill: '#200038', voxStroke: '#3a0058', voxTop: '#2a0048',
    actFill: '#8700af', actStroke: '#a020c0', actTop: '#ff0055',
    hiTop: '#ffaf00', hiFill: '#c830a0',
    dimFill: '#180028', dimTop: '#200038',
  },
} as const

function pal(theme: HeerichTheme) { return PALETTES[theme] }

// ── Utility ──

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}


// -- homeHero -- massive dramatic landscape for homepage --

export const homeHero: HeerichProgram = {
  id: 'home-hero',
  fps: 24,
  gridW: 32,
  gridD: 32,
  maxZ: 18,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const voxels: Voxel[] = []
    const G = 32
    const cx = (G - 1) / 2

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        const dx = x - cx
        const dy = y - cx
        const dist = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        const ripple1 = Math.sin(dist * 0.5 - t * 1.4) * 0.5 + 0.5
        const ripple2 = Math.sin(dist * 0.35 + t * 0.6) * 0.3 + 0.3
        const spiral = Math.sin(angle * 3 + dist * 0.25 - t * 0.5) * 0.5 + 0.5
        const center = Math.max(0, 1 - dist / 6)
        const tower = center * (6 + 4 * Math.sin(t * 0.7))
        const noise = Math.sin(x * 0.8 + t * 0.3) * Math.cos(y * 0.6 - t * 0.2) * 0.5 + 0.5
        const raw = ripple1 * 4 + ripple2 * 2.5 + spiral * 3 + tower * 2.5 + noise * 1.5
        const h = Math.max(0.4, raw)

        const intensity = Math.min(1, h / 10)
        const isHot = intensity > 0.65
        const isActive = intensity > 0.35

        voxels.push({
          x, y, z: 0, h,
          fill: isHot ? c.hiFill : isActive ? c.actFill : c.voxFill,
          top: isHot ? c.hiTop : isActive ? c.actTop : c.voxTop,
          stroke: isActive ? c.actStroke : c.voxStroke,
        })
      }
    }

    return { voxels }
  },
}

// -- heroPulse -- breathing concentric rings + core --

export const heroPulse: HeerichProgram = {
  id: 'hero-pulse',
  fps: 22,
  gridW: 26,
  gridD: 26,
  maxZ: 16,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const breath = 0.35 + 0.4 * Math.sin(t * 0.4) + 0.15 * Math.sin(t * 0.19)
    const voxels: Voxel[] = []
    const G = 26
    const cx = (G - 1) / 2

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        const dx = x - cx
        const dy = y - cx
        const dist = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        const ring1 = smoothstep(10, 12, dist) * smoothstep(13, 11.5, dist)
        const ring2 = smoothstep(7, 8.5, dist) * smoothstep(10, 8.5, dist)
        const ring3 = smoothstep(4, 5.5, dist) * smoothstep(7, 5.5, dist)
        const core = smoothstep(4, 0, dist)

        const spoke = 0.6 + 0.4 * Math.cos(angle * 6 - t * 0.8)

        const ringH = ring1 * (2 + breath * 3) * spoke
        const mid2H = ring2 * (3.5 + breath * 5) * spoke
        const mid3H = ring3 * (5 + breath * 6)
        const coreH = core * (6 + breath * 10)
        const h = Math.max(ringH, mid2H, mid3H, coreH)

        if (h < 0.2) continue

        const isCore = coreH >= mid3H && coreH >= mid2H && coreH >= ringH
        const isInner = mid3H >= mid2H && mid3H >= ringH && !isCore
        const isMid = mid2H >= ringH && !isCore && !isInner

        voxels.push({
          x, y, z: 0, h,
          fill: isCore ? c.hiFill : (isInner || isMid) ? c.actFill : c.voxFill,
          top: isCore ? c.hiTop : (isInner || isMid) ? c.actTop : c.voxTop,
          stroke: isCore || isInner ? c.actStroke : c.voxStroke,
        })
      }
    }

    return { voxels }
  },
}

// -- pipelineFlow -- 7 stage columns with traveling pulse --

export const pipelineFlow: HeerichProgram = {
  id: 'pipeline-flow',
  fps: 20,
  gridW: 36,
  gridD: 14,
  maxZ: 14,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const phase = (t * 0.5) % 9 - 1
    const voxels: Voxel[] = []

    const columns = [
      { x: 1 }, { x: 6 }, { x: 11 }, { x: 16 },
      { x: 21 }, { x: 26 }, { x: 31 },
    ]

    columns.forEach((col, i) => {
      const dist = Math.abs(phase - i)
      const intensity = smoothstep(2.2, 0, dist)
      const baseH = 2
      const h = baseH + intensity * 11

      for (let dx = 0; dx < 4; dx++) {
        for (let dy = 0; dy < 8; dy++) {
          const edge = (dx === 0 || dx === 3 || dy === 0 || dy === 7) ? 0.6 : 1
          const inner = (dx === 1 || dx === 2) && (dy >= 2 && dy <= 5) ? 1.15 : 1
          const wave = Math.sin(t * 1.2 + dy * 0.5 + i) * 0.12
          const vh = h * edge * inner * (1 + wave)

          voxels.push({
            x: col.x + dx, y: 3 + dy, z: 0, h: vh,
            fill: intensity > 0.25 ? c.actFill : c.voxFill,
            top: intensity > 0.55 ? c.hiTop : intensity > 0.25 ? c.actTop : c.voxTop,
            stroke: intensity > 0.25 ? c.actStroke : c.voxStroke,
          })
        }
      }

      if (i < columns.length - 1) {
        const connIntensity = smoothstep(2.5, 0, Math.abs(phase - (i + 0.5)))
        for (let dx = 0; dx < 1; dx++) {
          for (let dy = 0; dy < 4; dy++) {
            voxels.push({
              x: col.x + 4 + dx, y: 5 + dy, z: 0,
              h: 1.2 + connIntensity * 3,
              fill: connIntensity > 0.3 ? c.actFill : c.dimFill,
              top: connIntensity > 0.3 ? c.actTop : c.dimTop,
              stroke: c.voxStroke,
            })
          }
        }
      }
    })

    return { voxels }
  },
}

// -- signalCascade -- EQ-style oscillating bars --

export const signalCascade: HeerichProgram = {
  id: 'signal-cascade',
  fps: 24,
  gridW: 30,
  gridD: 14,
  maxZ: 14,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const voxels: Voxel[] = []

    for (let i = 0; i < 28; i++) {
      const f1 = Math.sin(t * 1.4 + i * 0.35)
      const f2 = Math.sin(t * 0.8 + i * 0.55) * 0.6
      const f3 = Math.sin(t * 2.3 + i * 0.2) * 0.35
      const f4 = Math.sin(t * 0.3 + i * 0.9) * 0.25
      const raw = (f1 + f2 + f3 + f4) * 0.5 + 0.5
      const h = 0.8 + raw * 12
      const active = h > 5
      const hot = h > 9

      for (let dy = 0; dy < 4; dy++) {
        const depthMod = 1 - dy * 0.06
        voxels.push({
          x: 1 + i, y: 1 + dy, z: 0, h: h * depthMod,
          fill: hot ? c.hiFill : active ? c.actFill : c.voxFill,
          top: hot ? c.hiTop : active ? c.actTop : c.voxTop,
          stroke: active ? c.actStroke : c.voxStroke,
        })
      }

      const bf1 = Math.sin(t * 1.4 + i * 0.35 - 0.8)
      const braw = (bf1 + f2 * 0.5 + f4) * 0.4 + 0.35
      const bh = Math.max(0.5, braw * 7)
      for (let dy = 0; dy < 4; dy++) {
        voxels.push({
          x: 1 + i, y: 8 + dy, z: 0, h: bh * (1 - dy * 0.08),
          fill: c.dimFill,
          top: bh > 4 ? c.actFill : c.dimTop,
          stroke: c.voxStroke,
          opacity: 0.75,
        })
      }
    }

    return { voxels }
  },
}

// -- idleDrift -- surface wave over a dense grid --

export const idleDrift: HeerichProgram = {
  id: 'idle-drift',
  fps: 18,
  gridW: 22,
  gridD: 22,
  maxZ: 12,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const voxels: Voxel[] = []
    const G = 22
    const cx = (G - 1) / 2

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        const dx = x - cx
        const dy = y - cx
        const dist = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        const wave = Math.sin(t * 0.35 + dist * 0.5) * 0.5 + 0.5
        const diag = Math.sin(t * 0.2 + (x + y) * 0.4) * 0.35
        const spiral = Math.sin(angle * 2 + dist * 0.3 - t * 0.25) * 0.3
        const perlin = Math.sin(x * 0.7) * Math.cos(y * 0.5 + t * 0.15) * 0.25
        const h = 0.5 + (wave + diag + spiral + perlin) * 6
        const active = wave > 0.5
        const hot = h > 7

        voxels.push({
          x, y, z: 0, h,
          fill: hot ? c.hiFill : active ? c.actFill : c.voxFill,
          top: hot ? c.hiTop : active ? c.actTop : c.voxTop,
          stroke: active ? c.actStroke : c.voxStroke,
        })
      }
    }

    return { voxels }
  },
}

// -- entryInduction -- expanding/contracting radial burst --

export const entryInduction: HeerichProgram = {
  id: 'entry-induction',
  fps: 22,
  gridW: 26,
  gridD: 26,
  maxZ: 18,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const pulse = Math.pow(Math.sin(t * 0.6) * 0.5 + 0.5, 1.2)
    const voxels: Voxel[] = []
    const G = 26
    const cx = (G - 1) / 2

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        const dx = x - cx
        const dy = y - cx
        const dist = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        const ringRadius = 3 + pulse * 8
        const ring = Math.max(0, 1 - Math.abs(dist - ringRadius) / 2)

        const ring2Radius = 2 + (1 - pulse) * 5
        const ring2 = Math.max(0, 1 - Math.abs(dist - ring2Radius) / 1.5)

        const center = Math.max(0, 1 - dist / 4.5) * (1.5 + pulse * 3)

        const spoke = Math.pow(Math.cos(angle * 6 + t * 0.4), 6) * Math.max(0, 1 - dist / 13)

        const shimmer = Math.sin(dist * 0.6 + angle * 2 - t * 1.2) * 0.3 * Math.max(0, 1 - dist / 13)

        const h = Math.max(ring * 8, ring2 * 5, center * 12, spoke * 5, shimmer * 3)
        if (h < 0.25) continue

        const isCenter = center * 12 >= ring * 8 && center * 12 >= spoke * 5
        const isRing = (ring * 8 >= spoke * 5 || ring2 * 5 >= spoke * 5) && !isCenter

        voxels.push({
          x, y, z: 0, h,
          fill: isCenter ? c.hiFill : isRing ? c.actFill : c.voxFill,
          top: isCenter ? c.hiTop : isRing ? c.actTop : c.voxTop,
          stroke: isCenter || isRing ? c.actStroke : c.voxStroke,
        })
      }
    }

    return { voxels }
  },
}

// -- Export map --

export const programs: Record<string, HeerichProgram> = {
  'home-hero': homeHero,
  'hero-pulse': heroPulse,
  'pipeline-flow': pipelineFlow,
  'signal-cascade': signalCascade,
  'idle-drift': idleDrift,
  'entry-induction': entryInduction,
}
