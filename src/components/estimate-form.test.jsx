import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { EstimateForm } from '@/components/estimate-form'
import { EstimateProvider } from '@/hooks/use-estimate'

function renderForm() {
  return render(
    <MemoryRouter>
      <EstimateProvider>
        <EstimateForm />
      </EstimateProvider>
    </MemoryRouter>
  )
}

describe('EstimateForm', () => {
  test('associates each visible field label with its input', () => {
    renderForm()

    expect(screen.getByLabelText('Aporte inicial')).toBeTruthy()
    expect(screen.getByLabelText('Duração em meses')).toBeTruthy()
    expect(screen.getByLabelText('Aporte mensal')).toBeTruthy()
    expect(screen.getByLabelText('Rentabilidade mensal estimada')).toBeTruthy()
  })

  test('gives financial fields stable form metadata for mobile keyboards and autofill', () => {
    renderForm()

    const expectedFields = [
      ['Aporte inicial', 'initialAmount', 'decimal'],
      ['Aporte mensal', 'contributionPerMonth', 'decimal'],
      ['Duração em meses', 'investmentDurationInMonths', 'numeric'],
      ['Rentabilidade mensal estimada', 'profitabilityPerMonth', 'decimal'],
    ]

    expectedFields.forEach(([label, name, inputMode]) => {
      const input = screen.getByLabelText(label)
      expect(input.name).toBe(name)
      expect(input.inputMode).toBe(inputMode)
      expect(input.getAttribute('autocomplete')).toBe('off')
    })
  })

  test('uses real buttons for year presets and marks the selected duration', async () => {
    const user = userEvent.setup()
    renderForm()

    expect(screen.getByRole('group', { name: 'Atalhos de duração' })).toBeTruthy()
    const fiveYears = screen.getByRole('button', { name: '5 anos' })
    await user.click(fiveYears)

    expect(fiveYears.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByLabelText('Duração em meses').value).toBe('60')
  })

  test('gives the advanced-options switch an accessible name', () => {
    renderForm()

    expect(screen.getByRole('switch', { name: 'Opções avançadas' })).toBeTruthy()
  })

  test('shows the effective annual rate for the monthly estimate', () => {
    renderForm()

    expect(screen.getByText('7,44% ao ano')).toBeTruthy()
  })
})
