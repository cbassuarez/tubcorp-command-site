/**
 * OperatorCanvas — Tiers 1 + 2 + 3
 *
 * Wraps the operator portal main content in a <canvas layoutsubtree>.
 * Applies a CRT terminal shader (scanlines, barrel distortion, chromatic
 * aberration, phosphor glow, vignette) continuously, a glitch transition
 * shader on route changes, and a heat-haze ripple on interactive element hover.
 *
 * Progressive enhancement: renders plain children when the HTML-in-Canvas API
 * is unavailable (all browsers except Chromium 138+ with flag enabled).
 */
import { useRef, useEffect, useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { isHtmlInCanvasSupported } from '@/lib/htmlCanvas/detect'
import { createProgram, createQuadBuffer, bindProgram } from '@/lib/htmlCanvas/webgl'
import { FULLSCREEN_VS, CRT_FS, GLITCH_FS } from '@/lib/htmlCanvas/shaders'

interface Props {
  children: ReactNode
  className?: string
}

export function OperatorCanvas({ children, className }: Props) {
  if (!isHtmlInCanvasSupported()) {
    return <div className={className}>{children}</div>
  }
  return <CanvasShell className={className}>{children}</CanvasShell>
}

// ── Inner component (only mounts when API is available) ──

function CanvasShell({ children, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Shared mutable state accessible from the paint loop
  const state = useRef({
    mouse: { x: 0.5, y: 0.5 },
    hover: 0,
    hoverTarget: 0,
    glitchStart: -1,
    glitchSeed: 0,
    prevPath: location.pathname,
  })

  // Set layoutsubtree synchronously before first browser paint
  useLayoutEffect(() => {
    canvasRef.current?.setAttribute('layoutsubtree', '')
  }, [])

  // Main WebGL setup + animation loop
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement & { requestPaint(): void; onpaint: (() => void) | null }
    const content = contentRef.current
    if (!canvas || !content) return

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true }) as
      (WebGL2RenderingContext & { texElementImage2D(...args: unknown[]): void }) | null
    if (!gl) return

    // Compile programs
    const crtProg = createProgram(gl, FULLSCREEN_VS, CRT_FS)
    const glitchProg = createProgram(gl, FULLSCREEN_VS, GLITCH_FS)
    const quad = createQuadBuffer(gl)

    // Uniform locations
    const crt = {
      uContent: gl.getUniformLocation(crtProg, 'uContent'),
      uTime: gl.getUniformLocation(crtProg, 'uTime'),
      uResolution: gl.getUniformLocation(crtProg, 'uResolution'),
      uMouse: gl.getUniformLocation(crtProg, 'uMouse'),
      uHover: gl.getUniformLocation(crtProg, 'uHover'),
    }
    const glitch = {
      uContent: gl.getUniformLocation(glitchProg, 'uContent'),
      uProgress: gl.getUniformLocation(glitchProg, 'uProgress'),
      uResolution: gl.getUniformLocation(glitchProg, 'uResolution'),
      uSeed: gl.getUniformLocation(glitchProg, 'uSeed'),
    }

    // Content texture
    const tex = gl.createTexture()!

    function bindContent() {
      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, tex)
      gl!.texElementImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, content!)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
    }

    // ── Resize handling ──
    const resizeObs = new ResizeObserver(([entry]) => {
      const dpr = devicePixelRatio || 1
      const dpBox = entry.devicePixelContentBoxSize?.[0]
      if (dpBox) {
        canvas.width = dpBox.inlineSize
        canvas.height = dpBox.blockSize
      } else {
        canvas.width = entry.contentRect.width * dpr
        canvas.height = entry.contentRect.height * dpr
      }
    })
    resizeObs.observe(canvas, { box: 'device-pixel-content-box' } as ResizeObserverOptions)

    // Sync canvas CSS height to content height so it flows in the document
    const contentObs = new ResizeObserver(([entry]) => {
      canvas.style.height = `${entry.borderBoxSize[0].blockSize}px`
    })
    contentObs.observe(content)

    // ── Paint callback ──
    const GLITCH_MS = 400
    const s = state.current

    canvas.onpaint = () => {
      const w = canvas.width
      const h = canvas.height
      if (!w || !h) return

      gl.viewport(0, 0, w, h)
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      bindContent()

      const now = performance.now()
      const t = now / 1000

      // Smooth hover interpolation
      s.hover += (s.hoverTarget - s.hover) * 0.12

      // Glitch active?
      if (s.glitchStart > 0) {
        const elapsed = now - s.glitchStart
        const progress = Math.min(1, elapsed / GLITCH_MS)
        if (progress >= 1) {
          s.glitchStart = -1
        } else {
          bindProgram(gl, glitchProg, quad)
          gl.uniform1i(glitch.uContent, 0)
          gl.uniform1f(glitch.uProgress, progress)
          gl.uniform2f(glitch.uResolution, w, h)
          gl.uniform1f(glitch.uSeed, s.glitchSeed)
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
          return
        }
      }

      // CRT + hover haze
      bindProgram(gl, crtProg, quad)
      gl.uniform1i(crt.uContent, 0)
      gl.uniform1f(crt.uTime, t)
      gl.uniform2f(crt.uResolution, w, h)
      gl.uniform2f(crt.uMouse, s.mouse.x, s.mouse.y)
      gl.uniform1f(crt.uHover, s.hover)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    // ── Animation loop ──
    let raf: number
    function loop() {
      canvas.requestPaint()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // ── Mouse tracking ──
    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      s.mouse.x = (e.clientX - rect.left) / rect.width
      s.mouse.y = (e.clientY - rect.top) / rect.height

      const el = document.elementFromPoint(e.clientX, e.clientY)
      s.hoverTarget = el?.closest('a, button, [role="button"], [data-interactive]') ? 1 : 0
    }
    function onLeave() {
      s.hoverTarget = 0
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      resizeObs.disconnect()
      contentObs.disconnect()
      canvas.onpaint = null
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      gl.deleteTexture(tex)
      gl.deleteBuffer(quad)
      gl.deleteProgram(crtProg)
      gl.deleteProgram(glitchProg)
    }
  }, [])

  // ── Route-change glitch trigger ──
  useEffect(() => {
    const s = state.current
    if (location.pathname !== s.prevPath) {
      s.prevPath = location.pathname
      s.glitchStart = performance.now()
      s.glitchSeed = Math.random() * 999
    }
  }, [location.pathname])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%' }}
    >
      <div ref={contentRef}>{children}</div>
    </canvas>
  )
}
