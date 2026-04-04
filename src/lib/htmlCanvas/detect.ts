let _supported: boolean | null = null

/**
 * Detects whether the HTML-in-Canvas API (WICG proposal) is available.
 * Checks for: layoutsubtree canvas support, requestPaint, texElementImage2D.
 * Chromium 138+ behind chrome://flags/#canvas-draw-element
 */
export function isHtmlInCanvasSupported(): boolean {
  if (_supported !== null) return _supported

  try {
    const canvas = document.createElement('canvas') as HTMLCanvasElement & { requestPaint?: unknown }
    if (typeof canvas.requestPaint !== 'function') {
      _supported = false
      return false
    }

    const gl = canvas.getContext('webgl2') as (WebGL2RenderingContext & { texElementImage2D?: unknown }) | null
    if (!gl || typeof gl.texElementImage2D !== 'function') {
      _supported = false
      return false
    }

    const ext = gl.getExtension('WEBGL_lose_context')
    ext?.loseContext()

    _supported = true
    return true
  } catch {
    _supported = false
    return false
  }
}
