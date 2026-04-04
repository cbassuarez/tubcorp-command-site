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
      className={['pointer-events-none overflow-hidden border border-line bg-surface-elevated', className ?? '']
        .join(' ')
        .trim()}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
