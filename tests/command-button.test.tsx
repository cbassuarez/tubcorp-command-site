import { cleanup, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/components/effects/HoverCanvas', () => ({
  HoverCanvas: ({
    children,
    mode,
  }: {
    children: ReactNode
    mode?: 'default' | 'button'
  }) => (
    <div data-testid="hover-canvas" data-mode={mode ?? 'default'}>
      {children}
    </div>
  ),
}))

import { CommandButton } from '@/components/CommandButton'

afterEach(cleanup)

describe('CommandButton', () => {
  it('wraps solid buttons in button-mode HoverCanvas', () => {
    render(<CommandButton label="Download Companion" solid />)
    expect(screen.getByTestId('hover-canvas')).toHaveAttribute('data-mode', 'button')
    expect(screen.getByRole('button', { name: /download companion/i })).toBeInTheDocument()
  })

  it('wraps non-solid buttons in button-mode HoverCanvas', () => {
    render(<CommandButton label="Learn More" />)
    expect(screen.getByTestId('hover-canvas')).toHaveAttribute('data-mode', 'button')
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })

  it('wraps warning buttons in button-mode HoverCanvas', () => {
    render(<CommandButton label="Revoke Access" warning />)
    expect(screen.getByTestId('hover-canvas')).toHaveAttribute('data-mode', 'button')
    expect(screen.getByRole('button', { name: /revoke access/i })).toBeInTheDocument()
  })
})
