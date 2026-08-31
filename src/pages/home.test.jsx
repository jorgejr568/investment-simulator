import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('draws the contribution and growth trajectory from valid inputs', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <EstimateProvider>
          <Home />
        </EstimateProvider>
      </MemoryRouter>
    )

    await user.type(screen.getByLabelText('Aporte inicial'), '10000')
    await user.type(screen.getByLabelText('Aporte mensal'), '1000')

    const projection = screen.getByRole('region', { name: 'Projeção do investimento' })
    expect(within(projection).getByRole('img', { name: /Evolução projetada/ })).toBeTruthy()
    expect(within(projection).getAllByText('10 anos').length).toBeGreaterThan(0)
  })
})
