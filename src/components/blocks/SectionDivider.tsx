import type { DividerBlock } from '@/types/contracts'

interface SectionDividerProps {
  block: DividerBlock
}

export function SectionDivider({ block }: SectionDividerProps) {
  if (block.variant === 'spacer') {
    return <div className="h-8 lg:h-12" />
  }

  if (block.variant === 'signal') {
    return (
      <div className="mx-auto max-w-[1420px] px-4 lg:px-8">
        <div className="h-px bg-accent-signal/20" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1420px] px-4 lg:px-8">
      <div className="h-px bg-line" />
    </div>
  )
}
