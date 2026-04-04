import { useRef, useEffect, useCallback } from 'react'
import { programs } from '@/components/heerich/programs'

interface AnimatedHeerichCanvasProps {
  program: string
  className?: string
}

export function AnimatedHeerichCanvas({ program, className }: AnimatedHeerichCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const lastFrameRef = useRef<number>(0)
  const visibleRef = useRef(true)

  const prog = programs[program] ?? programs['idle-drift']

  const animate = useCallback(
    (now: number) => {
      if (!startRef.current) startRef.current = now

      const elapsed = now - startRef.current
      const interval = 1000 / prog.fps

      if (now - lastFrameRef.current >= interval && visibleRef.current && containerRef.current) {
        lastFrameRef.current = now
        containerRef.current.innerHTML = prog.render(elapsed)
      }

      rafRef.current = requestAnimationFrame(animate)
    },
    [prog],
  )

  useEffect(() => {
    // Render initial frame immediately
    if (containerRef.current) {
      containerRef.current.innerHTML = prog.render(0)
    }

    rafRef.current = requestAnimationFrame(animate)

    // IntersectionObserver to pause when off-screen
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
  }, [animate, prog])

  return (
    <div
      ref={containerRef}
      className={[
        'pointer-events-none overflow-hidden border border-[#d2c8b3] bg-[#f5efdf]',
        className ?? '',
      ]
        .join(' ')
        .trim()}
      aria-hidden
    />
  )
}
