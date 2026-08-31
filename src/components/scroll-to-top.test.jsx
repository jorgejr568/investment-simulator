import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Link, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { ScrollToTop } from '@/components/scroll-to-top'

describe('ScrollToTop', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('moves focus context to the top after client-side navigation', async () => {
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Link to="/resultado?scenario=1">Abrir resultado</Link>} />
            <Route path="/resultado" element={<h1 tabIndex={-1}>Resultado</h1>} />
          </Routes>
        </main>
      </MemoryRouter>
    )

    expect(scrollTo).not.toHaveBeenCalled()
    await user.click(screen.getByRole('link', { name: 'Abrir resultado' }))

    const heading = screen.getByRole('heading', { name: 'Resultado' })
    await waitFor(() => expect(document.activeElement).toBe(heading))
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' })
  })
})
