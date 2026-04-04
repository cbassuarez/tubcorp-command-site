/**
 * HoverCanvas — Tier 6: Per-Element Hover Shader
 *
 * Wraps any interactive element in a <canvas layoutsubtree> and applies
 * a multi-layered hover shader on mouseenter:
 *   1. Chromatic dispersion radiating from cursor
 *   2. Lens magnification near cursor
 *   3. CRT scan-line reveal near cursor
 *   4. Phosphor edge glow on element border
 *   5. Cursor spotlight (brightness lift)
 *   6. Refocus vignette (edge dimming)
 *
 * Zero cost when idle — the animation loop only runs while hovered
 * or while the exit transition is fading out.
 *
 * Progressive enhancement: renders plain children when the
 * HTML-in-Canvas API is unavailable.
 */
import { useRef, useEffect, useLayoutEffect, useCallback, type ReactNode } from 'react'
import { isHtmlInCanvasSupported } from '@/lib/htmlCanvas/detect'
import { createProgram, createQuadBuffer, bindProgram } from '@/lib/htmlCanvas/webgl'
import { FULLSCREEN_VS, HOVER_FS, PASSTHROUGH_FS } from '@/lib/htmlCanvas/shaders'

interface Props {
  children: ReactNode
  className?: string
  /** Lerp speed 0-1 (default 0.10) */
  speed?: number
  /** Visual mode (default: restrained hover) */
  mode?: 'default' | 'button'
}

export function HoverCanvas({ children, className, speed, mode }: Props) {
  if (!isHtmlInCanvasSupported()) {
    return <div className={className}>{children}</div>
  }
  return <HoverShell className={className} speed={speed} mode={mode}>{children}</HoverShell>
}

// ── Inner (only mounts when API is available) ──

function HoverShell({ children, className, speed = 0.10, mode = 'default' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const state = useRef({
    mouse: { x: 0.5, y: 0.5 },
    hover: 0,
    hoverTarget: 0,
    raf: 0,
    running: false,
  })

  useLayoutEffect(() => {
    canvasRef.current?.setAttribute('layoutsubtree', '')
  }, [])

  // Stable refs for GL objects (created once, cleaned up on unmount)
  const glRef = useRef<{
    gl: WebGL2RenderingContext & { texElementImage2D(...args: unknown[]): void }
    hoverProg: WebGLProgram
    passProg: WebGLProgram
    quad: WebGLBuffer
    tex: WebGLTexture
    hoverU: {
      uContent: WebGLUniformLocation | null
      uTime: WebGLUniformLocation | null
      uResolution: WebGLUniformLocation | null
      uMouse: WebGLUniformLocation | null
      uHover: WebGLUniformLocation | null
      uMode: WebGLUniformLocation | null
    }
    passU: { uContent: WebGLUniformLocation | null }
  } | null>(null)

  // Start/stop the animation loop on demand
  const startLoop = useCallback(() => {
    const s = state.current
    if (s.running) return
    s.running = true

    const canvas = canvasRef.current as HTMLCanvasElement & { requestPaint(): void; onpaint: (() => void) | null }
    if (!canvas) return

    function loop() {
      canvas.requestPaint()
      s.raf = requestAnimationFrame(loop)
    }
    s.raf = requestAnimationFrame(loop)
  }, [])

  const stopLoop = useCallback(() => {
    const s = state.current
    if (!s.running) return
    s.running = false
    cancelAnimationFrame(s.raf)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement & { requestPaint(): void; onpaint: (() => void) | null }
    const content = contentRef.current
    if (!canvas || !content) return

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true }) as
      (WebGL2RenderingContext & { texElementImage2D(...args: unknown[]): void }) | null
    if (!gl) return

    const hoverProg = createProgram(gl, FULLSCREEN_VS, HOVER_FS)
    const passProg = createProgram(gl, FULLSCREEN_VS, PASSTHROUGH_FS)
    const quad = createQuadBuffer(gl)

    const hoverU = {
      uContent: gl.getUniformLocation(hoverProg, 'uContent'),
      uTime: gl.getUniformLocation(hoverProg, 'uTime'),
      uResolution: gl.getUniformLocation(hoverProg, 'uResolution'),
      uMouse: gl.getUniformLocation(hoverProg, 'uMouse'),
      uHover: gl.getUniformLocation(hoverProg, 'uHover'),
      uMode: gl.getUniformLocation(hoverProg, 'uMode'),
    }
    const passU = {
      uContent: gl.getUniformLocation(passProg, 'uContent'),
    }

    const tex = gl.createTexture()!
    glRef.current = { gl, hoverProg, passProg, quad, tex, hoverU, passU }

    function bindContent() {
      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, tex)
      gl!.texElementImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, content!)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
    }

    // Resize
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

    const contentObs = new ResizeObserver(([entry]) => {
      canvas.style.height = `${entry.borderBoxSize[0].blockSize}px`
    })
    contentObs.observe(content)

    const s = state.current

    // Paint callback
    canvas.onpaint = () => {
      const w = canvas.width
      const h = canvas.height
      if (!w || !h) return

      // Lerp hover
      s.hover += (s.hoverTarget - s.hover) * speed

      // Stop loop when fully faded out
      if (s.hoverTarget === 0 && s.hover < 0.003) {
        s.hover = 0
        // One final passthrough paint, then stop
        gl.viewport(0, 0, w, h)
        bindContent()
        bindProgram(gl, passProg, quad)
        gl.uniform1i(passU.uContent, 0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        stopLoop()
        return
      }

      gl.viewport(0, 0, w, h)
      bindContent()

      if (s.hover > 0.005) {
        bindProgram(gl, hoverProg, quad)
        gl.uniform1i(hoverU.uContent, 0)
        gl.uniform1f(hoverU.uTime, performance.now() / 1000)
        gl.uniform2f(hoverU.uResolution, w, h)
        gl.uniform2f(hoverU.uMouse, s.mouse.x, s.mouse.y)
        gl.uniform1f(hoverU.uHover, s.hover)
        gl.uniform1i(hoverU.uMode, mode === 'button' ? 1 : 0)
      } else {
        bindProgram(gl, passProg, quad)
        gl.uniform1i(passU.uContent, 0)
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    // Render one passthrough frame so canvas isn't blank
    canvas.requestPaint()

    // ── Mouse events ──
    function onEnter() {
      s.hoverTarget = 1
      startLoop()
    }
    function onLeave() {
      s.hoverTarget = 0
      // Loop continues running to animate fade-out; stops when hover ≈ 0
    }
    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      s.mouse.x = (e.clientX - rect.left) / rect.width
      s.mouse.y = (e.clientY - rect.top) / rect.height
    }

    canvas.addEventListener('mouseenter', onEnter)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(s.raf)
      s.running = false
      resizeObs.disconnect()
      contentObs.disconnect()
      canvas.onpaint = null
      canvas.removeEventListener('mouseenter', onEnter)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('mousemove', onMove)
      gl.deleteTexture(tex)
      gl.deleteBuffer(quad)
      gl.deleteProgram(hoverProg)
      gl.deleteProgram(passProg)
      glRef.current = null
    }
  }, [mode, speed, startLoop, stopLoop])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', cursor: 'pointer' }}
    >
      <div ref={contentRef}>{children}</div>
    </canvas>
  )
}
