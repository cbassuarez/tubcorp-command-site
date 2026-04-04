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

const PALETTES = {
  light: {
    baseFill: '#e8e8e8', baseStroke: '#d0d0d0', baseTop: '#f2f2f2',
    voxFill: '#d4d4d4', voxStroke: '#c0c0c0', voxTop: '#e0e0e0',
    actFill: '#a8dbb8', actStroke: '#6bc88d', actTop: '#0a9f45',
    hiTop: '#06803a', hiFill: '#7fd4a0',
    dimFill: '#dcdcdc', dimTop: '#cccccc',
  },
  dark: {
    baseFill: '#1a1a1a', baseStroke: '#2a2a2a', baseTop: '#222222',
    voxFill: '#282828', voxStroke: '#333333', voxTop: '#303030',
    actFill: '#1a3326', actStroke: '#2a5940', actTop: '#2ea35f',
    hiTop: '#3ddb7a', hiFill: '#1f4a33',
    dimFill: '#222222', dimTop: '#282828',
  },
} as const

function pal(theme: HeerichTheme) { return PALETTES[theme] }

// ── Utility ──

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// ═══════════════════════════════════════════════════════════
// PROGRAM: homeHero — large dramatic landscape for homepage
// ═════════════��═════════════════════════════════════════════

export const homeHero: HeerichProgram = {
  id: 'home-hero',
  fps: 24,
  gridW: 20,
  gridD: 20,
  maxZ: 12,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const voxels: Voxel[] = []

    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 20; y++) {
        const dx = x - 9.5
        const dy = y - 9.5
        const dist = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        // Concentric ripple
        const ripple = Math.sin(dist * 0.8 - t * 1.8) * 0.5 + 0.5
        // Spiral twist
        const spiral = Math.sin(angle * 3 + dist * 0.3 - t * 0.7) * 0.3 + 0.5
        // Central tower
        const center = Math.max(0, 1 - dist / 4)
        const tower = center * (3 + 2 * Math.sin(t * 0.9))
        // Combine
        const raw = ripple * 2.5 + spiral * 1.5 + tower * 2
        const h = Math.max(0.3, raw)

        const intensity = Math.min(1, h / 6)
        const isActive = intensity > 0.45

        voxels.push({
          x, y, z: 0, h,
          fill: isActive ? c.actFill : c.voxFill,
          top: intensity > 0.7 ? c.hiTop : isActive ? c.actTop : c.voxTop,
          stroke: isActive ? c.actStroke : c.voxStroke,
        })
      }
    }

    return {
      voxels,
      base: { w: 20, d: 20, fill: c.baseFill, stroke: c.baseStroke, top: c.baseTop },
    }
  },
}

// ═══════════════════════════════════════════════════════════
// PROGRAM: heroPulse — breathing concentric rings + core
// ═══════════════════���═══════════════════════════════════════

export const heroPulse: HeerichProgram = {
  id: 'hero-pulse',
  fps: 20,
  gridW: 14,
  gridD: 14,
  maxZ: 10,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const breath = 0.3 + 0.35 * Math.sin(t * 0.5) + 0.15 * Math.sin(t * 0.23)
    const voxels: Voxel[] = []

    for (let x = 0; x < 14; x++) {
      for (let y = 0; y < 14; y++) {
        const dx = x - 6.5
        const dy = y - 6.5
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Three concentric rings
        const ring1 = smoothstep(5.5, 6.5, dist) * smoothstep(7.0, 6.0, dist) // outer ring
        const ring2 = smoothstep(3.0, 4.0, dist) * smoothstep(5.0, 4.0, dist) // mid ring
        const core = smoothstep(3.0, 0, dist)                                   // core

        const ringH = ring1 * (1 + breath * 2)
        const midH = ring2 * (2 + breath * 4)
        const coreH = core * (3 + breath * 6)
        const h = Math.max(ringH, midH, coreH)

        if (h < 0.15) continue

        const isCore = coreH > midH && coreH > ringH
        const isMid = midH > ringH && !isCore

        voxels.push({
          x, y, z: 0, h,
          fill: isCore ? c.hiFill : isMid ? c.actFill : c.voxFill,
          top: isCore ? c.hiTop : isMid ? c.actTop : c.voxTop,
          stroke: isCore ? c.actStroke : c.voxStroke,
        })
      }
    }

    return {
      voxels,
      base: { w: 14, d: 14, fill: c.baseFill, stroke: c.baseStroke, top: c.baseTop },
    }
  },
}

// ═══════════════════════════════════════════════════════════
// PROGRAM: pipelineFlow — 5 stage columns with traveling pulse
// ══════════════════════════════════════════════════════��════

export const pipelineFlow: HeerichProgram = {
  id: 'pipeline-flow',
  fps: 18,
  gridW: 22,
  gridD: 8,
  maxZ: 9,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const phase = (t * 0.6) % 7 - 1 // -1 to 6, so the pulse sweeps past all columns
    const voxels: Voxel[] = []

    const columns = [
      { x: 1, label: 'CAP' },
      { x: 5, label: 'ING' },
      { x: 9, label: 'INF' },
      { x: 13, label: 'STG' },
      { x: 17, label: 'EMT' },
    ]

    columns.forEach((col, i) => {
      const dist = Math.abs(phase - i)
      const intensity = smoothstep(1.8, 0, dist)
      const baseH = 1.5
      const h = baseH + intensity * 7

      // Main column: 3×4 block
      for (let dx = 0; dx < 3; dx++) {
        for (let dy = 0; dy < 4; dy++) {
          // Slight height variation within column
          const edge = (dx === 0 || dx === 2 || dy === 0 || dy === 3) ? 0.7 : 1
          const vh = h * edge

          voxels.push({
            x: col.x + dx, y: 2 + dy, z: 0, h: vh,
            fill: intensity > 0.3 ? c.actFill : c.voxFill,
            top: intensity > 0.6 ? c.hiTop : intensity > 0.3 ? c.actTop : c.voxTop,
            stroke: intensity > 0.3 ? c.actStroke : c.voxStroke,
          })
        }
      }

      // Connector bars between columns
      if (i < columns.length - 1) {
        const connIntensity = smoothstep(2.0, 0, Math.abs(phase - (i + 0.5)))
        for (let dx = 0; dx < 2; dx++) {
          voxels.push({
            x: col.x + 3 + dx, y: 3, z: 0,
            h: 0.8 + connIntensity * 1.5,
            fill: connIntensity > 0.3 ? c.actFill : c.dimFill,
            top: connIntensity > 0.3 ? c.actTop : c.dimTop,
            stroke: c.voxStroke,
          })
          voxels.push({
            x: col.x + 3 + dx, y: 4, z: 0,
            h: 0.8 + connIntensity * 1.5,
            fill: connIntensity > 0.3 ? c.actFill : c.dimFill,
            top: connIntensity > 0.3 ? c.actTop : c.dimTop,
            stroke: c.voxStroke,
          })
        }
      }
    })

    return {
      voxels,
      base: { w: 22, d: 8, fill: c.baseFill, stroke: c.baseStroke, top: c.baseTop },
    }
  },
}

// ═══════════════════════════��═══════════════════════════════
// PROGRAM: signalCascade — EQ-style oscillating bars
// ═��══════════════════════════════════════════════════���══════

export const signalCascade: HeerichProgram = {
  id: 'signal-cascade',
  fps: 24,
  gridW: 18,
  gridD: 7,
  maxZ: 9,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const voxels: Voxel[] = []

    for (let i = 0; i < 16; i++) {
      // Multiple sine waves for complex motion
      const f1 = Math.sin(t * 1.2 + i * 0.4)
      const f2 = Math.sin(t * 0.7 + i * 0.65) * 0.6
      const f3 = Math.sin(t * 2.1 + i * 0.25) * 0.3
      const raw = (f1 + f2 + f3) * 0.5 + 0.5
      const h = 0.5 + raw * 7
      const active = h > 4

      // Front bar (2 deep)
      for (let dy = 0; dy < 2; dy++) {
        voxels.push({
          x: 1 + i, y: 1 + dy, z: 0, h,
          fill: active ? c.actFill : c.voxFill,
          top: h > 6 ? c.hiTop : active ? c.actTop : c.voxTop,
          stroke: active ? c.actStroke : c.voxStroke,
        })
      }

      // Back echo bar (quieter)
      const bh = Math.max(0.3, h * 0.35)
      for (let dy = 0; dy < 2; dy++) {
        voxels.push({
          x: 1 + i, y: 4 + dy, z: 0, h: bh,
          fill: c.dimFill,
          top: active ? c.actFill : c.dimTop,
          stroke: c.voxStroke,
          opacity: 0.7,
        })
      }
    }

    return {
      voxels,
      base: { w: 18, d: 7, fill: c.baseFill, stroke: c.baseStroke, top: c.baseTop },
    }
  },
}

// ════════════��══════════════════════════════════════════════
// PROGRAM: idleDrift — surface wave over a grid of pillars
// ══════════════════���════════════════════════════════════════

export const idleDrift: HeerichProgram = {
  id: 'idle-drift',
  fps: 16,
  gridW: 10,
  gridD: 10,
  maxZ: 6,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const voxels: Voxel[] = []

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const dx = x - 4.5
        const dy = y - 4.5
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Slow radial wave + diagonal ripple
        const wave = Math.sin(t * 0.45 + dist * 0.7) * 0.5 + 0.5
        const diag = Math.sin(t * 0.25 + (x + y) * 0.5) * 0.3
        const h = 0.4 + (wave + diag) * 3.5
        const active = wave > 0.55

        voxels.push({
          x, y, z: 0, h,
          fill: active ? c.actFill : c.voxFill,
          top: active ? c.actTop : c.voxTop,
          stroke: active ? c.actStroke : c.voxStroke,
        })
      }
    }

    return {
      voxels,
      base: { w: 10, d: 10, fill: c.baseFill, stroke: c.baseStroke, top: c.baseTop },
    }
  },
}

// ════���══════════════════════════════════════════════════════
// PROGRAM: entryInduction — expanding/contracting radial burst
// ═══════════════════���═══════════════════════════════════��═══

export const entryInduction: HeerichProgram = {
  id: 'entry-induction',
  fps: 20,
  gridW: 14,
  gridD: 14,
  maxZ: 12,
  tick(elapsed, theme) {
    const c = pal(theme)
    const t = elapsed / 1000
    const pulse = Math.pow(Math.sin(t * 0.8) * 0.5 + 0.5, 1.3)
    const voxels: Voxel[] = []

    for (let x = 0; x < 14; x++) {
      for (let y = 0; y < 14; y++) {
        const dx = x - 6.5
        const dy = y - 6.5
        const dist = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        // Radial burst — expanding ring
        const ringRadius = 2 + pulse * 4
        const ringDist = Math.abs(dist - ringRadius)
        const ring = Math.max(0, 1 - ringDist / 1.5)

        // Central mass
        const center = Math.max(0, 1 - dist / 3) * (1 + pulse * 2)

        // Angular spokes (4-fold symmetry)
        const spoke = Math.pow(Math.cos(angle * 4 + t * 0.3), 8) * Math.max(0, 1 - dist / 7)

        const h = Math.max(ring * 5, center * 8, spoke * 3)
        if (h < 0.2) continue

        const isCenter = center * 8 > ring * 5 && center * 8 > spoke * 3
        const isRing = ring * 5 > spoke * 3 && !isCenter

        voxels.push({
          x, y, z: 0, h,
          fill: isCenter ? c.hiFill : isRing ? c.actFill : c.voxFill,
          top: isCenter ? c.hiTop : isRing ? c.actTop : c.voxTop,
          stroke: isCenter || isRing ? c.actStroke : c.voxStroke,
        })
      }
    }

    return {
      voxels,
      base: { w: 14, d: 14, fill: c.baseFill, stroke: c.baseStroke, top: c.baseTop },
    }
  },
}

// ── Export map ──

export const programs: Record<string, HeerichProgram> = {
  'home-hero': homeHero,
  'hero-pulse': heroPulse,
  'pipeline-flow': pipelineFlow,
  'signal-cascade': signalCascade,
  'idle-drift': idleDrift,
  'entry-induction': entryInduction,
}
