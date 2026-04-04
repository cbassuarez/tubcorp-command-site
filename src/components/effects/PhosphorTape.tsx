/**
 * PhosphorTape — Tier 4
 *
 * Wraps a child element (SignalTape) in a <canvas layoutsubtree> and applies
 * a multi-pass phosphor bloom shader:
 *   Pass 1: threshold — extract bright green/cyan pixels
 *   Pass 2: horizontal Gaussian blur
 *   Pass 3: vertical Gaussian blur
 *   Pass 4: additive composite original + bloom
 *
 * Progressive enhancement: renders plain children when the HTML-in-Canvas API
 * is unavailable.
 */
import { useRef, useEffect, useLayoutEffect, type ReactNode } from 'react'
import { isHtmlInCanvasSupported } from '@/lib/htmlCanvas/detect'
import {
  createProgram,
  createQuadBuffer,
  createFBO,
  bindProgram,
} from '@/lib/htmlCanvas/webgl'
import {
  FULLSCREEN_VS,
  BLOOM_THRESHOLD_FS,
  BLOOM_BLUR_FS,
  BLOOM_COMPOSITE_FS,
} from '@/lib/htmlCanvas/shaders'

interface Props {
  children: ReactNode
  className?: string
}

export function PhosphorTape({ children, className }: Props) {
  if (!isHtmlInCanvasSupported()) {
    return <div className={className}>{children}</div>
  }
  return <BloomShell className={className}>{children}</BloomShell>
}

function BloomShell({ children, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    canvasRef.current?.setAttribute('layoutsubtree', '')
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement & { requestPaint(): void; onpaint: (() => void) | null }
    const content = contentRef.current
    if (!canvas || !content) return

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true }) as
      (WebGL2RenderingContext & { texElementImage2D(...args: unknown[]): void }) | null
    if (!gl) return

    // Compile programs
    const threshProg = createProgram(gl, FULLSCREEN_VS, BLOOM_THRESHOLD_FS)
    const blurProg = createProgram(gl, FULLSCREEN_VS, BLOOM_BLUR_FS)
    const compProg = createProgram(gl, FULLSCREEN_VS, BLOOM_COMPOSITE_FS)
    const quad = createQuadBuffer(gl)

    // Uniform locations
    const thresh = {
      uContent: gl.getUniformLocation(threshProg, 'uContent'),
      uThreshold: gl.getUniformLocation(threshProg, 'uThreshold'),
    }
    const blur = {
      uSource: gl.getUniformLocation(blurProg, 'uSource'),
      uDirection: gl.getUniformLocation(blurProg, 'uDirection'),
    }
    const comp = {
      uContent: gl.getUniformLocation(compProg, 'uContent'),
      uBloom: gl.getUniformLocation(compProg, 'uBloom'),
      uStrength: gl.getUniformLocation(compProg, 'uStrength'),
    }

    // Content texture
    const contentTex = gl.createTexture()!

    function bindContent() {
      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, contentTex)
      gl!.texElementImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, content!)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
    }

    // FBOs for bloom passes (created at current size, recreated on resize)
    let fboA = createFBO(gl, 1, 1)
    let fboB = createFBO(gl, 1, 1)
    let prevW = 0
    let prevH = 0

    function ensureFBOs(w: number, h: number) {
      // Use half-res for bloom (cheaper, softer)
      const bw = Math.max(1, w >> 1)
      const bh = Math.max(1, h >> 1)
      if (bw === prevW && bh === prevH) return
      prevW = bw
      prevH = bh

      gl!.deleteTexture(fboA.texture)
      gl!.deleteFramebuffer(fboA.fbo)
      gl!.deleteTexture(fboB.texture)
      gl!.deleteFramebuffer(fboB.fbo)
      fboA = createFBO(gl!, bw, bh)
      fboB = createFBO(gl!, bw, bh)
    }

    // Resize handling
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

    // Paint callback
    canvas.onpaint = () => {
      const w = canvas.width
      const h = canvas.height
      if (!w || !h) return

      ensureFBOs(w, h)
      bindContent()

      const bw = prevW
      const bh = prevH

      // Pass 1: Threshold → fboA
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboA.fbo)
      gl.viewport(0, 0, bw, bh)
      bindProgram(gl, threshProg, quad)
      gl.uniform1i(thresh.uContent, 0)
      gl.uniform1f(thresh.uThreshold, 0.15)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Pass 2: Horizontal blur fboA → fboB
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB.fbo)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, fboA.texture)
      bindProgram(gl, blurProg, quad)
      gl.uniform1i(blur.uSource, 0)
      gl.uniform2f(blur.uDirection, 1.0 / bw, 0.0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Pass 3: Vertical blur fboB → fboA
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboA.fbo)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, fboB.texture)
      gl.uniform2f(blur.uDirection, 0.0, 1.0 / bh)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Pass 4: Composite → screen
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, w, h)
      bindContent()

      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, fboA.texture)

      bindProgram(gl, compProg, quad)
      gl.uniform1i(comp.uContent, 0)
      gl.uniform1i(comp.uBloom, 1)
      gl.uniform1f(comp.uStrength, 1.2)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    // Animation loop
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
      gl.deleteTexture(contentTex)
      gl.deleteTexture(fboA.texture)
      gl.deleteFramebuffer(fboA.fbo)
      gl.deleteTexture(fboB.texture)
      gl.deleteFramebuffer(fboB.fbo)
      gl.deleteBuffer(quad)
      gl.deleteProgram(threshProg)
      gl.deleteProgram(blurProg)
      gl.deleteProgram(compProg)
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
