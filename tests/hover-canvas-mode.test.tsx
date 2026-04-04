import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const uniform1iSpy = vi.fn()
const uniform1fSpy = vi.fn()
const uniform2fSpy = vi.fn()
const bindProgramSpy = vi.fn()

vi.mock('@/lib/htmlCanvas/detect', () => ({
  isHtmlInCanvasSupported: () => true,
}))

vi.mock('@/lib/htmlCanvas/webgl', () => ({
  createProgram: vi.fn(() => ({}) as WebGLProgram),
  createQuadBuffer: vi.fn(() => ({}) as WebGLBuffer),
  bindProgram: (...args: unknown[]) => bindProgramSpy(...args),
}))

import { HoverCanvas } from '@/components/effects/HoverCanvas'

function buildFakeGl() {
  return {
    TEXTURE0: 0,
    TEXTURE_2D: 3553,
    RGBA: 6408,
    UNSIGNED_BYTE: 5121,
    TEXTURE_MIN_FILTER: 10241,
    TEXTURE_MAG_FILTER: 10240,
    LINEAR: 9729,
    TEXTURE_WRAP_S: 10242,
    TEXTURE_WRAP_T: 10243,
    CLAMP_TO_EDGE: 33071,
    TRIANGLE_STRIP: 5,
    createTexture: vi.fn(() => ({})),
    deleteTexture: vi.fn(),
    deleteBuffer: vi.fn(),
    deleteProgram: vi.fn(),
    getUniformLocation: vi.fn((_prog: unknown, name: string) => name as unknown as WebGLUniformLocation),
    activeTexture: vi.fn(),
    bindTexture: vi.fn(),
    texElementImage2D: vi.fn(),
    texParameteri: vi.fn(),
    viewport: vi.fn(),
    uniform1i: (...args: unknown[]) => uniform1iSpy(...args),
    uniform1f: (...args: unknown[]) => uniform1fSpy(...args),
    uniform2f: (...args: unknown[]) => uniform2fSpy(...args),
    drawArrays: vi.fn(),
  } as unknown as WebGL2RenderingContext & { texElementImage2D(...args: unknown[]): void }
}

describe('HoverCanvas mode routing', () => {
  beforeEach(() => {
    uniform1iSpy.mockClear()
    uniform1fSpy.mockClear()
    uniform2fSpy.mockClear()
    bindProgramSpy.mockClear()

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)

    const fakeGl = buildFakeGl()
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value: vi.fn((kind: string) => (kind === 'webgl2' ? fakeGl : null)),
    })
    Object.defineProperty(HTMLCanvasElement.prototype, 'requestPaint', {
      configurable: true,
      value: function requestPaint(this: HTMLCanvasElement & { onpaint?: (() => void) | null }) {
        this.onpaint?.()
      },
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('sends default mode uniform value to shader', async () => {
    const { container } = render(
      <HoverCanvas>
        <button type="button">Alpha</button>
      </HoverCanvas>,
    )

    const canvas = container.querySelector('canvas') as (HTMLCanvasElement & { requestPaint(): void }) | null
    expect(canvas).toBeTruthy()

    await waitFor(() => {
      expect(typeof (canvas as HTMLCanvasElement & { onpaint?: unknown }).onpaint).toBe('function')
    })

    canvas!.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    canvas!.requestPaint()

    expect(uniform1iSpy.mock.calls.some(([loc, value]) => loc === 'uMode' && value === 0)).toBe(true)
  })

  it('sends button mode uniform value to shader', async () => {
    const { container } = render(
      <HoverCanvas mode="button">
        <button type="button">Bravo</button>
      </HoverCanvas>,
    )

    const canvas = container.querySelector('canvas') as (HTMLCanvasElement & { requestPaint(): void }) | null
    expect(canvas).toBeTruthy()

    await waitFor(() => {
      expect(typeof (canvas as HTMLCanvasElement & { onpaint?: unknown }).onpaint).toBe('function')
    })

    canvas!.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    canvas!.requestPaint()

    expect(uniform1iSpy.mock.calls.some(([loc, value]) => loc === 'uMode' && value === 1)).toBe(true)
  })
})
