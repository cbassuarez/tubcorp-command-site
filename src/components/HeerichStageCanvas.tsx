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
      className={['pointer-events-none overflow-hidden border border-[#d2c8b3] bg-[#f5efdf]', className ?? '']
        .join(' ')
        .trim()}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
