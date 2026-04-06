/**
 * Canvas-based top-down voxel renderer.
 *
 * Renders voxels as colored rectangles from directly above, scaled to
 * fill/overflow the canvas. Height is encoded as color (via the palette)
 * rather than perspective projection — the result is a dense, immersive
 * color field that fills edge-to-edge.
 */

// ── Types ──

export interface Voxel {
  x: number
  y: number
  z: number
  h: number
  fill: string
  top: string
  stroke: string
  opacity?: number
}

export interface IsoScene {
  voxels: Voxel[]
  base?: { w: number; d: number; fill: string; stroke: string; top: string }
}

export interface IsoCamera {
  tileW: number
  tileH: number
  tileZ: number
  originX: number
  originY: number
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

  const tw = cam.tileW
  const th = cam.tileH

  for (const v of scene.voxels) {
    const px = cam.originX + v.x * tw
    const py = cam.originY + v.y * th

    ctx.globalAlpha = v.opacity ?? 1
    ctx.fillStyle = v.top
    ctx.fillRect(px, py, tw + 0.5, th + 0.5)

    if (v.stroke && v.stroke !== 'none') {
      ctx.strokeStyle = v.stroke
      ctx.lineWidth = 0.3
      ctx.strokeRect(px, py, tw, th)
    }
  }

  ctx.globalAlpha = 1
}

/**
 * Compute a camera that fills the canvas with the grid, zoomed ~3x.
 */
export function fitCamera(
  gridW: number,
  gridD: number,
  _maxZ: number,
  canvasW: number,
  canvasH: number,
): IsoCamera {
  // Scale so the grid overflows the canvas — we want ~3x zoom
  // so only ~1/3 of the grid is visible at any time.
  const tileFromW = (canvasW * 3) / gridW
  const tileFromH = (canvasH * 3) / gridD
  const tileW = Math.max(tileFromW, tileFromH)
  const tileH = tileW

  // Center the grid on the canvas (most of it will overflow)
  const originX = (canvasW - gridW * tileW) / 2
  const originY = (canvasH - gridD * tileH) / 2

  return { tileW, tileH, tileZ: 0, originX, originY }
}
