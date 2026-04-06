import { useRef, useEffect, useCallback, useState } from 'react'
import { programs } from '@/components/heerich/programs'
import { renderScene, fitCamera } from '@/lib/isoRenderer'
import { DitheredShadow } from '@/components/DitheredShadow'
import type { HeerichTheme } from '@/components/heerich/programs'

interface AnimatedHeerichCanvasProps {
  program: string
  theme?: HeerichTheme
  className?: string
  /** Disable the dithered shadow (default: enabled) */
  noShadow?: boolean
}

function frameLooksBlank(ctx: CanvasRenderingContext2D, w: number, h: number): boolean {
  if (w < 4 || h < 4) return true

  const cols = 8
  const rows = 6
  let minLuma = 255
  let maxLuma = 0
  let minR = 255
  let minG = 255
  let minB = 255
  let maxR = 0
  let maxG = 0
  let maxB = 0
  let opaqueSamples = 0

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const sx = Math.min(w - 1, Math.max(0, Math.floor((x + 0.5) * (w / cols))))
      const sy = Math.min(h - 1, Math.max(0, Math.floor((y + 0.5) * (h / rows))))
      const px = ctx.getImageData(sx, sy, 1, 1).data
      if (px[3] < 12) continue

      opaqueSamples += 1
      const luma = px[0] * 0.2126 + px[1] * 0.7152 + px[2] * 0.0722
      minLuma = Math.min(minLuma, luma)
      maxLuma = Math.max(maxLuma, luma)
      minR = Math.min(minR, px[0])
      minG = Math.min(minG, px[1])
      minB = Math.min(minB, px[2])
      maxR = Math.max(maxR, px[0])
      maxG = Math.max(maxG, px[1])
      maxB = Math.max(maxB, px[2])
    }
  }

  if (opaqueSamples < 6) return true

  const lumaRange = maxLuma - minLuma
  const channelRange = Math.max(maxR - minR, maxG - minG, maxB - minB)
  return lumaRange < 16 && channelRange < 22
}

export function AnimatedHeerichCanvas({ program, theme = 'light', className, noShadow }: AnimatedHeerichCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvasVersion, setCanvasVersion] = useState(0)
  const rafRef = useRef(0)
  const startRef = useRef(0)
  const lastFrameRef = useRef(0)
  const visibleRef = useRef(true)
  const hasPaintedRef = useRef(false)
  const guardNextPaintRef = useRef(true)
  const sizeRef = useRef({ w: 0, h: 0 })

  const prog = programs[program] ?? programs['idle-drift']

  const bindCanvasRef = useCallback((node: HTMLCanvasElement | null) => {
    if (canvasRef.current === node) return
    canvasRef.current = node
    setCanvasVersion((v) => v + 1)
  }, [])

  const paint = useCallback((elapsed: number, guardBlank = false) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = sizeRef.current
    if (!w || !h) return

    const scene = prog.tick(elapsed, theme)
    const cam = fitCamera(prog.gridW, prog.gridD, prog.maxZ, w, h)
    renderScene(ctx, scene, cam, w, h)

    if (!guardBlank || !frameLooksBlank(ctx, w, h)) return

    // Fallback: repaint with the opposite theme profile to guarantee contrast.
    const fallbackTheme: HeerichTheme = theme === 'light' ? 'dark' : 'light'
    const fallbackScene = prog.tick(elapsed, fallbackTheme)
    renderScene(ctx, fallbackScene, cam, w, h)
  }, [prog, theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Reset timing on program/theme change
    startRef.current = 0
    lastFrameRef.current = 0
    visibleRef.current = true
    hasPaintedRef.current = false
    guardNextPaintRef.current = true
    // Force re-measure when the canvas element changes (e.g. DitheredShadow
    // re-mounts it inside FunkyShadow). Without this, resize() sees the same
    // CSS dimensions and skips setting the new element's backing store.
    sizeRef.current = { w: 0, h: 0 }

    // Size the canvas
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const w = Math.round(rect.width * dpr)
      const h = Math.round(rect.height * dpr)
      if (w !== sizeRef.current.w || h !== sizeRef.current.h) {
        canvas.width = w
        canvas.height = h
        sizeRef.current = { w, h }
        guardNextPaintRef.current = true
        if (!hasPaintedRef.current && w > 0 && h > 0) {
          paint(0, true)
          hasPaintedRef.current = true
          guardNextPaintRef.current = false
        }
      }
    }

    const resizeObs = new ResizeObserver(() => resize())
    resizeObs.observe(canvas)
    resize()

    // Paint first frame immediately
    paint(0, guardNextPaintRef.current)
    hasPaintedRef.current = true
    guardNextPaintRef.current = false

    const interval = 1000 / prog.fps

    function tick(now: number) {
      if (!startRef.current) startRef.current = now

      const elapsed = now - startRef.current

      if (now - lastFrameRef.current >= interval && (visibleRef.current || !hasPaintedRef.current)) {
        lastFrameRef.current = now
        paint(elapsed, guardNextPaintRef.current)
        hasPaintedRef.current = true
        guardNextPaintRef.current = false
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (!entry.isIntersecting) return
        guardNextPaintRef.current = true
        const now = performance.now()
        const elapsed = startRef.current ? now - startRef.current : 0
        paint(elapsed, true)
        hasPaintedRef.current = true
        guardNextPaintRef.current = false
      },
      { threshold: 0.05 },
    )
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObs.disconnect()
      observer.disconnect()
    }
  }, [canvasVersion, prog, theme, paint])

  const canvas = (
    <canvas
      ref={bindCanvasRef}
      className={[
        'pointer-events-none overflow-hidden border border-line bg-surface-elevated',
        noShadow ? className ?? '' : 'w-full h-full',
      ].join(' ').trim()}
      aria-hidden
    />
  )

  if (noShadow) return canvas

  return (
    <DitheredShadow
      preset={theme === 'dark' ? 'terminal' : 'signal'}
      offsetY={14}
      blur={28}
      opacity={theme === 'dark' ? 0.6 : 0.4}
      pixelScale={3}
      className={className}
    >
      {canvas}
    </DitheredShadow>
  )
}
