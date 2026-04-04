interface TubCorpWordmarkProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { mark: 'h-[10px] w-[10px]', text: 'text-[10px]', gap: 'gap-1.5' },
  md: { mark: 'h-[12px] w-[12px]', text: 'text-[13px]', gap: 'gap-2' },
  lg: { mark: 'h-[14px] w-[14px]', text: 'text-[16px]', gap: 'gap-2' },
}

export function TubCorpWordmark({ size = 'md' }: TubCorpWordmarkProps) {
  const s = sizes[size]

  return (
    <div className={`inline-flex items-center ${s.gap}`} aria-label="TubCorp">
      <span className={`block ${s.mark} bg-accent-signal`} />
      <span className={`font-mono ${s.text} font-bold uppercase tracking-[0.12em] text-txt`}>
        TubCorp
      </span>
    </div>
  )
}
