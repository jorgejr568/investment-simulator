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

  test('removes a hidden annual increase from the live projection', async () => {
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
    const baseline = within(projection).getByRole('img', { name: /Evolução projetada/ }).getAttribute('aria-label')

    await user.click(screen.getByRole('switch', { name: 'Opções avançadas' }))
    const growth = screen.getByLabelText('Aumento anual do aporte mensal')
    await user.clear(growth)
    await user.type(growth, '500')
    expect(within(projection).getByRole('img', { name: /Evolução projetada/ }).getAttribute('aria-label')).not.toBe(baseline)

    await user.click(screen.getByRole('switch', { name: 'Opções avançadas' }))
    expect(within(projection).getByRole('img', { name: /Evolução projetada/ }).getAttribute('aria-label')).toBe(baseline)
  })
})
