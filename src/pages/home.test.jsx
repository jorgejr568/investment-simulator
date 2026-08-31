import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { EstimateProvider } from '@/hooks/use-estimate'
import { Home } from '@/pages/home'

describe('Home', () => {
  test('includes a named region for the live investment projection', () => {
    render(
      <MemoryRouter>
        <EstimateProvider>
          <Home />
        </EstimateProvider>
      </MemoryRouter>
    )

    expect(screen.getByRole('region', { name: 'Projeção do investimento' })).toBeTruthy()
  })
})
