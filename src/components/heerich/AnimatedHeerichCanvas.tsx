import { useRef, useEffect } from 'react'
import { programs } from '@/components/heerich/programs'

interface AnimatedHeerichCanvasProps {
  program: string
  theme?: 'light' | 'dark'
  className?: string
}

export function AnimatedHeerichCanvas({ program, theme = 'light', className }: AnimatedHeerichCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const lastFrameRef = useRef<number>(0)
  const visibleRef = useRef(true)

  const prog = programs[program] ?? programs['idle-drift']

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = prog.render(0, theme)
    }

    function tick(now: number) {
      if (!startRef.current) startRef.current = now

      const elapsed = now - startRef.current
      const interval = 1000 / prog.fps

      if (now - lastFrameRef.current >= interval && visibleRef.current && containerRef.current) {
        lastFrameRef.current = now
        containerRef.current.innerHTML = prog.render(elapsed, theme)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const el = containerRef.current
    if (!el) return () => cancelAnimationFrame(rafRef.current)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 },
    )

    observer.observe(el)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [prog, theme])

  return (
    <div
      ref={containerRef}
      className={[
        'pointer-events-none overflow-hidden border border-line bg-surface-elevated',
        className ?? '',
      ]
        .join(' ')
        .trim()}
      aria-hidden
    />
  )
}
