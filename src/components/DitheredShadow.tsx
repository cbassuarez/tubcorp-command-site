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
  // Signal: green/cyan with controlled magenta and amber accents.
  signal: [[8, 20, 16], [18, 122, 92], [36, 184, 208], [84, 110, 252], [230, 86, 178], [255, 186, 84]],
  // Scan: deep RGB sweep inspired by legacy cloud infra dashboards.
  scan: [[6, 10, 36], [12, 46, 136], [16, 122, 214], [52, 198, 172], [186, 214, 84], [248, 128, 86]],
  // Terminal phosphor with richer RGB spread.
  terminal: [[0, 22, 10], [6, 78, 48], [16, 150, 122], [32, 162, 248], [118, 112, 255], [190, 232, 166]],
  // Subtle: still restrained, but no longer monochrome.
  subtle: [[16, 20, 30], [34, 52, 78], [64, 86, 124], [98, 104, 146], [132, 122, 160]],
  // Warning amber with hot RGB edge tones.
  amber: [[38, 16, 6], [114, 52, 12], [194, 112, 24], [252, 182, 52], [255, 132, 86], [214, 92, 154]],
}

function isTubPreset(name: string): name is TubPreset {
  return name in TUB_COLORS
}

/** TubCorp custom preset name or a funky-shadow built-in preset name */
type ShadowPreset = TubPreset | (string & {})

interface DitheredShadowProps {
  children: ReactNode
  /** TubCorp or funky-shadow built-in preset name */
  preset?: ShadowPreset
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
  /** Contrast 100 = neutral (default 156) */
  contrast?: number
  /** Brightness in -100..100 (default 12) */
  brightness?: number
  /** Quantization levels (default 6) */
  quantLevels?: number
  /** Border radius (default 0) */
  radius?: number
  /** Gradient shape (default 'radial') */
  shape?: 'line' | 'radial'
  /** Outer wrapper className */
  className?: string
}

/** Resolve preset to either custom `colors` or a funky-shadow built-in `preset` string. */
function resolvePreset(
  preset: ShadowPreset,
  colors?: ColorStops,
): { colors: ColorStops } | { preset: string } {
  if (colors) return { colors }
  if (isTubPreset(preset)) return { colors: TUB_COLORS[preset] }
  // Built-in funky-shadow preset — pass the name through
  return { preset }
}

export function DitheredShadow({
  children,
  preset = 'signal',
  colors,
  offsetY = 12,
  offsetX = 0,
  blur = 30,
  opacity = 0.72,
  pixelScale = 2,
  contrast = 156,
  brightness = 12,
  quantLevels = 6,
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
          {...resolvePreset(preset, colors)}
          pixelScale={pixelScale}
          offsetX={offsetX}
          offsetY={offsetY}
          blur={blur}
          opacity={opacity}
          shape={shape}
          dither="4x4"
          quantLevels={quantLevels}
          contrast={contrast}
          brightness={brightness}
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
