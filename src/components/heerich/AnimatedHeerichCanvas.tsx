import { useRef, useEffect, useCallback } from 'react'
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

export function AnimatedHeerichCanvas({ program, theme = 'light', className, noShadow }: AnimatedHeerichCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const startRef = useRef(0)
  const lastFrameRef = useRef(0)
  const visibleRef = useRef(true)
  const sizeRef = useRef({ w: 0, h: 0 })

  const prog = programs[program] ?? programs['idle-drift']

  const paint = useCallback((elapsed: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = sizeRef.current
    if (!w || !h) return

    const scene = prog.tick(elapsed, theme)
    const cam = fitCamera(prog.gridW, prog.gridD, prog.maxZ, w, h)
    renderScene(ctx, scene, cam, w, h)
  }, [prog, theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Reset timing on program/theme change
    startRef.current = 0
    lastFrameRef.current = 0

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
      }
    }

    const resizeObs = new ResizeObserver(() => resize())
    resizeObs.observe(canvas)
    resize()

    // Paint first frame immediately
    paint(0)

    const interval = 1000 / prog.fps

    function tick(now: number) {
      if (!startRef.current) startRef.current = now

      const elapsed = now - startRef.current

      if (now - lastFrameRef.current >= interval && visibleRef.current) {
        lastFrameRef.current = now
        paint(elapsed)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting },
      { threshold: 0.05 },
    )
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObs.disconnect()
      observer.disconnect()
    }
  }, [prog, theme, paint])

  const canvas = (
    <canvas
      ref={canvasRef}
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
