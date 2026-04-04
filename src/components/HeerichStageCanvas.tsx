import { useMemo } from 'react'
import { renderHeerichStage } from '@/lib/heerichAdapter'

interface HeerichStageCanvasProps {
  intensity: number
  className?: string
}

export function HeerichStageCanvas({ intensity, className }: HeerichStageCanvasProps) {
  const markup = useMemo(() => renderHeerichStage(intensity), [intensity])

  return (
    <div
      className={['pointer-events-none overflow-hidden border border-stage-signal/20 bg-black/70', className ?? '']
        .join(' ')
        .trim()}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
