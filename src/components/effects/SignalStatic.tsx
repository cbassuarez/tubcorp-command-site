/**
 * SignalStatic — Tier 5
 *
 * Wraps a child element (StatusChip) in a <canvas layoutsubtree> and applies
 * a static/interference shader that activates when the `value` prop changes,
 * then decays back to passthrough over ~600ms.
 *
 * Progressive enhancement: renders plain children when the HTML-in-Canvas API
 * is unavailable.
 */
import { useRef, useEffect, useLayoutEffect, type ReactNode } from 'react'
import { isHtmlInCanvasSupported } from '@/lib/htmlCanvas/detect'
import { createProgram, createQuadBuffer, bindProgram } from '@/lib/htmlCanvas/webgl'
import { FULLSCREEN_VS, STATIC_FS, PASSTHROUGH_FS } from '@/lib/htmlCanvas/shaders'

interface Props {
  children: ReactNode
  value: string
  className?: string
}

export function SignalStatic({ children, value, className }: Props) {
  if (!isHtmlInCanvasSupported()) {
    return <div className={className}>{children}</div>
  }
  return <StaticShell className={className} value={value}>{children}</StaticShell>
}

function StaticShell({ children, value, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const state = useRef({
    intensity: 0,
    triggerTime: -1,
    prevValue: value,
  })

  useLayoutEffect(() => {
    canvasRef.current?.setAttribute('layoutsubtree', '')
  }, [])

  // Trigger static burst on value change
  useEffect(() => {
    const s = state.current
    if (value !== s.prevValue) {
      s.prevValue = value
      s.intensity = 1.0
      s.triggerTime = performance.now()
    }
  }, [value])

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement & { requestPaint(): void; onpaint: (() => void) | null }
    const content = contentRef.current
    if (!canvas || !content) return

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true }) as
      (WebGL2RenderingContext & { texElementImage2D(...args: unknown[]): void }) | null
    if (!gl) return

    const staticProg = createProgram(gl, FULLSCREEN_VS, STATIC_FS)
    const passProg = createProgram(gl, FULLSCREEN_VS, PASSTHROUGH_FS)
    const quad = createQuadBuffer(gl)

    const staticU = {
      uContent: gl.getUniformLocation(staticProg, 'uContent'),
      uIntensity: gl.getUniformLocation(staticProg, 'uIntensity'),
      uTime: gl.getUniformLocation(staticProg, 'uTime'),
      uResolution: gl.getUniformLocation(staticProg, 'uResolution'),
    }
    const passU = {
      uContent: gl.getUniformLocation(passProg, 'uContent'),
    }

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

    const DECAY_MS = 600
    const s = state.current

    canvas.onpaint = () => {
      const w = canvas.width
      const h = canvas.height
      if (!w || !h) return

      gl.viewport(0, 0, w, h)
      bindContent()

      const now = performance.now()

      // Decay intensity
      if (s.triggerTime > 0) {
        const elapsed = now - s.triggerTime
        s.intensity = Math.max(0, 1.0 - elapsed / DECAY_MS)
        if (s.intensity <= 0) {
          s.triggerTime = -1
        }
      }

      if (s.intensity > 0.005) {
        // Static shader active
        bindProgram(gl, staticProg, quad)
        gl.uniform1i(staticU.uContent, 0)
        gl.uniform1f(staticU.uIntensity, s.intensity)
        gl.uniform1f(staticU.uTime, now / 1000)
        gl.uniform2f(staticU.uResolution, w, h)
      } else {
        // Passthrough
        bindProgram(gl, passProg, quad)
        gl.uniform1i(passU.uContent, 0)
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    let raf: number
    function loop() {
      canvas.requestPaint()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      resizeObs.disconnect()
      contentObs.disconnect()
      canvas.onpaint = null
      gl.deleteTexture(tex)
      gl.deleteBuffer(quad)
      gl.deleteProgram(staticProg)
      gl.deleteProgram(passProg)
    }
  }, [])

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
