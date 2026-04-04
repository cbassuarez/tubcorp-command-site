/**
 * DitheredShadow — responsive wrapper around funky-shadow.
 *
 * Auto-measures its children via ResizeObserver and passes pixel
 * dimensions to FunkyShadow. Provides TubCorp-themed shadow presets.
 */
import { useRef, useState, useEffect, type ReactNode } from 'react'
import { FunkyShadow } from 'funky-shadow'
import type { ColorStops } from 'funky-shadow'

type TubPreset = 'signal' | 'scan' | 'terminal' | 'subtle' | 'amber'

const TUB_COLORS: Record<TubPreset, ColorStops> = {
  // Green signal glow — primary brand
  signal: [[0, 20, 10], [10, 80, 40], [30, 140, 70], [46, 163, 95], [80, 200, 120]],
  // Deep blue scan lines — surveillance
  scan: [[0, 0, 0], [0, 0, 80], [0, 60, 140], [0, 130, 180], [60, 180, 200]],
  // CRT terminal phosphor
  terminal: [[0, 10, 0], [0, 40, 15], [10, 95, 40], [30, 160, 80], [80, 220, 120], [160, 255, 180]],
  // Low-key neutral
  subtle: [[0, 0, 0], [20, 20, 25], [50, 50, 60], [90, 90, 100]],
  // Warning amber
  amber: [[40, 10, 0], [120, 60, 0], [200, 140, 0], [255, 190, 50]],
}

interface DitheredShadowProps {
  children: ReactNode
  /** TubCorp shadow preset */
  preset?: TubPreset
  /** Custom color stops (overrides preset) */
  colors?: ColorStops
  /** Shadow offset Y (default 12) */
  offsetY?: number
  /** Shadow offset X (default 0) */
  offsetX?: number
  /** Blur radius (default 24) */
  blur?: number
  /** Opacity 0-1 (default 0.55) */
  opacity?: number
  /** Pixel scale / dot size (default 3) */
  pixelScale?: number
  /** Border radius (default 0) */
  radius?: number
  /** Gradient shape (default 'radial') */
  shape?: 'line' | 'radial'
  /** Outer wrapper className */
  className?: string
}

export function DitheredShadow({
  children,
  preset = 'signal',
  colors,
  offsetY = 12,
  offsetX = 0,
  blur = 24,
  opacity = 0.55,
  pixelScale = 3,
  radius = 0,
  shape = 'radial',
  className,
}: DitheredShadowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new ResizeObserver(([entry]) => {
      const rect = entry.contentRect
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height) })
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {size.w > 0 && size.h > 0 ? (
        <FunkyShadow
          width={size.w}
          height={size.h}
          radius={radius}
          colors={colors ?? TUB_COLORS[preset]}
          pixelScale={pixelScale}
          offsetX={offsetX}
          offsetY={offsetY}
          blur={blur}
          opacity={opacity}
          shape={shape}
          dither="4x4"
          oklab
        >
          {children}
        </FunkyShadow>
      ) : (
        children
      )}
    </div>
  )
}
