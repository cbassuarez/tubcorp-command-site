import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/app/App'

describe('app shell', () => {
  it('renders homepage hero on root route', async () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    const headings = await screen.findAllByRole('heading', {
      name: /participation meets governance/i,
    })
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders operator portal on /operators route', async () => {
    window.history.pushState({}, '', '/operators')
    render(<App />)
    expect(await screen.findByText('LINK')).toBeInTheDocument()
  })
})
