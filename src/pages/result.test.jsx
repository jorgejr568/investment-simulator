import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { EstimateProvider } from '@/hooks/use-estimate'
import { Result } from '@/pages/result'

describe('Result', () => {
  test('shows an accessible trajectory for a valid shared scenario', () => {
    render(
      <MemoryRouter initialEntries={['/resultado?initialAmount=10000&duration=120&contribution=1000&profitability=0.6']}>
        <EstimateProvider>
          <Result />
        </EstimateProvider>
      </MemoryRouter>
    )

    expect(screen.getByRole('img', { name: /Evolução projetada/ })).toBeTruthy()
    expect(screen.getAllByText('10 anos').length).toBeGreaterThan(0)
  })

  test.each([
    '/resultado?initialAmount=-100&duration=120&contribution=1000&profitability=0.6',
    '/resultado?initialAmount=10000&duration=10000&contribution=1000&profitability=0.6',
    '/resultado?initialAmount=10000&duration=120&contribution=1000&profitability=Infinity',
  ])('rejects an unsafe shared scenario: %s', (entry) => {
    render(
      <MemoryRouter initialEntries={[entry]}>
        <EstimateProvider>
          <Result />
        </EstimateProvider>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Não foi possível montar esta projeção' })).toBeTruthy()
  })
})
