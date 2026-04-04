import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from '@/app/App'

afterEach(cleanup)

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
    const links = await screen.findAllByText('LINK')
    expect(links.length).toBeGreaterThan(0)
  })
})
