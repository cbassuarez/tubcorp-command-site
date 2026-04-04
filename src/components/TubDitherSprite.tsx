const TUB_SPRITE = [
  '00111100',
  '01111110',
  '11100111',
  '11000011',
  '11011011',
  '11111111',
  '01111110',
  '00111100',
]

export function TubDitherSprite() {
  return (
    <div
      className="relative inline-flex h-[44px] min-w-[120px] items-center justify-center overflow-hidden border border-[#c7bda8] bg-[#f1ead8] px-2"
      aria-label="Tub sprite"
    >
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(39,34,27,0.08) 0 2px, rgba(39,34,27,0) 2px 4px), repeating-linear-gradient(-45deg, rgba(39,34,27,0.06) 0 2px, rgba(39,34,27,0) 2px 4px)',
        }}
      />
      <div className="relative grid grid-cols-8 gap-px rounded-sm bg-[#dfd4bc] p-[3px]">
        {TUB_SPRITE.flatMap((row, rowIndex) =>
          row.split('').map((value, colIndex) => (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={value === '1' ? 'h-[3px] w-[3px] bg-[#0a9f45]' : 'h-[3px] w-[3px] bg-transparent'}
            />
          )),
        )}
      </div>
      <span className="relative ml-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#2e2a22]">Tub</span>
    </div>
  )
}
