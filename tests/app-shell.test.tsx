import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/app/App'

describe('app shell', () => {
  it('renders fixed status chips', async () => {
    render(<App />)
    expect(await screen.findByText('LINK')).toBeInTheDocument()
    expect(await screen.findByText('MODE')).toBeInTheDocument()
  })

  it('shows download hero on entry route', async () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    const headings = await screen.findAllByRole('heading', {
      name: /tub companion/i,
    })
    expect(headings.length).toBeGreaterThan(0)
    const ctas = await screen.findAllByText('Download Companion iOS App')
    expect(ctas.length).toBeGreaterThan(0)
  })
})
