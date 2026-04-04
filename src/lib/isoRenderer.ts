/**
 * Canvas-based isometric voxel renderer.
 *
 * Replaces the heerich-runtime SVG approach with direct canvas 2D drawing.
 * Uses a painter's algorithm (back-to-front) to render isometric voxels
 * as filled polygons. Supports per-voxel colors and opacity.
 *
 * Designed for animation — no SVG serialization, no DOM thrashing.
 */

// ── Types ──

export interface Voxel {
  x: number
  y: number
  z: number
  h: number // height in voxel units (can be fractional)
  fill: string
  top: string
  stroke: string
  opacity?: number
}

export interface IsoScene {
  /** Grid of voxels to render */
  voxels: Voxel[]
  /** Optional base plate */
  base?: { w: number; d: number; fill: string; stroke: string; top: string }
}

export interface IsoCamera {
  tileW: number
  tileH: number // depth tile size (usually tileW / 2 for isometric)
  tileZ: number // height of one voxel unit in pixels
  originX: number
  originY: number
}

// ── Face types for depth sorting ──

interface Face {
  /** Depth key for sorting (higher = further from camera = draw first) */
  depth: number
  points: [number, number][]
  fill: string
  stroke: string
  opacity: number
}

// ── Projection ──

/** Project a 3D grid coordinate to 2D screen coordinates (isometric) */
function project(x: number, y: number, z: number, cam: IsoCamera): [number, number] {
  const sx = cam.originX + (x - y) * (cam.tileW / 2)
  const sy = cam.originY + (x + y) * (cam.tileH / 2) - z * cam.tileZ
  return [sx, sy]
}

// ── Face generation ──

function voxelFaces(v: Voxel, cam: IsoCamera): Face[] {
  const faces: Face[] = []
  const { x, y, z, h, fill, top, stroke, opacity = 1 } = v
  if (h <= 0) return faces

  const z1 = z + h

  // Top face
  const [t0x, t0y] = project(x, y, z1, cam)
  const [t1x, t1y] = project(x + 1, y, z1, cam)
  const [t2x, t2y] = project(x + 1, y + 1, z1, cam)
  const [t3x, t3y] = project(x, y + 1, z1, cam)
  faces.push({
    depth: x + y + z1 * 0.01,
    points: [[t0x, t0y], [t1x, t1y], [t2x, t2y], [t3x, t3y]],
    fill: top,
    stroke,
    opacity,
  })

  // Right face (visible face toward +x)
  const [r0x, r0y] = project(x + 1, y, z, cam)
  const [r1x, r1y] = project(x + 1, y + 1, z, cam)
  faces.push({
    depth: x + y + z * 0.01 - 0.001,
    points: [[t1x, t1y], [t2x, t2y], [r1x, r1y], [r0x, r0y]],
    fill,
    stroke,
    opacity,
  })

  // Left face (visible face toward +y)
  const [l0x, l0y] = project(x, y + 1, z, cam)
  faces.push({
    depth: x + y + z * 0.01 - 0.002,
    points: [[t3x, t3y], [t2x, t2y], [r1x, r1y], [l0x, l0y]],
    fill: darken(fill, 0.15),
    stroke,
    opacity,
  })

  return faces
}

function baseFaces(base: NonNullable<IsoScene['base']>, cam: IsoCamera): Face[] {
  const { w, d, stroke, top } = base
  const [p0x, p0y] = project(0, 0, 0, cam)
  const [p1x, p1y] = project(w, 0, 0, cam)
  const [p2x, p2y] = project(w, d, 0, cam)
  const [p3x, p3y] = project(0, d, 0, cam)

  // Top face of base plate
  return [{
    depth: -1,
    points: [[p0x, p0y], [p1x, p1y], [p2x, p2y], [p3x, p3y]],
    fill: top,
    stroke,
    opacity: 1,
  }]
}

// ── Color utilities ──

function darken(hex: string, amount: number): string {
  // Quick darken for left faces — works with hex and rgb
  if (hex.startsWith('#')) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const f = 1 - amount
    return `rgb(${Math.round(r * f)},${Math.round(g * f)},${Math.round(b * f)})`
  }
  return hex
}

// ── Main render function ──

export function renderScene(
  ctx: CanvasRenderingContext2D,
  scene: IsoScene,
  cam: IsoCamera,
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height)

  const allFaces: Face[] = []

  if (scene.base) {
    allFaces.push(...baseFaces(scene.base, cam))
  }

  for (const v of scene.voxels) {
    allFaces.push(...voxelFaces(v, cam))
  }

  // Sort back-to-front (painter's algorithm)
  allFaces.sort((a, b) => a.depth - b.depth)

  for (const face of allFaces) {
    ctx.globalAlpha = face.opacity
    ctx.beginPath()
    ctx.moveTo(face.points[0][0], face.points[0][1])
    for (let i = 1; i < face.points.length; i++) {
      ctx.lineTo(face.points[i][0], face.points[i][1])
    }
    ctx.closePath()
    ctx.fillStyle = face.fill
    ctx.fill()
    if (face.stroke && face.stroke !== 'none') {
      ctx.strokeStyle = face.stroke
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }

  ctx.globalAlpha = 1
}

/**
 * Compute a camera config that fits a grid of given dimensions into a canvas.
 */
export function fitCamera(
  gridW: number,
  gridD: number,
  maxZ: number,
  canvasW: number,
  canvasH: number,
): IsoCamera {
  // Isometric projection: width spans (gridW + gridD) * tileW/2
  // height spans (gridW + gridD) * tileH/2 + maxZ * tileZ
  // We want to fit within canvas with some padding
  const pad = 0.15
  const usableW = canvasW * (1 - pad)
  const usableH = canvasH * (1 - pad)

  // tileW is the limiting factor; tileH = tileW/2, tileZ = tileW * 0.6
  const tileFromW = usableW / (gridW + gridD)
  const tileFromH = usableH / ((gridW + gridD) * 0.5 + maxZ * 0.6)
  const tileW = Math.min(tileFromW, tileFromH)
  const tileH = tileW / 2
  const tileZ = tileW * 0.6

  // Origin: top-center of the scene
  const sceneBottomY = (gridW + gridD) * tileH / 2 + maxZ * tileZ

  const originX = canvasW / 2
  const originY = (canvasH - sceneBottomY) / 2 + maxZ * tileZ

  return { tileW, tileH, tileZ, originX, originY }
}
