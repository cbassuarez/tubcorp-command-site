import { AnimatedHeerichCanvas } from '@/components/heerich/AnimatedHeerichCanvas'

interface HeerichStageCanvasProps {
  intensity: number
  className?: string
}

/**
 * Static-looking heerich visualization. Uses idle-drift at low fps
 * so it has subtle life without being distracting.
 */
export function HeerichStageCanvas({ className }: HeerichStageCanvasProps) {
  return (
    <AnimatedHeerichCanvas
      program="idle-drift"
      theme="light"
      className={className}
    />
  )
}
