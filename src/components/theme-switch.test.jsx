import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import { ThemeSwitch } from '@/components/theme-switch'
import { ThemeProvider } from '@/hooks/use-theme'

describe('ThemeSwitch', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    document.head.querySelector('meta[name="theme-color"]')?.remove()
  })

  test('names the theme change that the control performs', () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>
    )

    const control = screen.getByRole('button', { name: 'Ativar tema claro' })
    expect(control).toBeTruthy()
    expect(control.hasAttribute('aria-pressed')).toBe(false)
  })

  test('keeps browser chrome color in sync with the selected theme', async () => {
    const user = userEvent.setup()
    const themeColor = document.createElement('meta')
    themeColor.name = 'theme-color'
    document.head.append(themeColor)

    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>
    )

    await waitFor(() => expect(themeColor.content).toBe('#101713'))
    await user.click(screen.getByRole('button', { name: 'Ativar tema claro' }))
    expect(themeColor.content).toBe('#f2f6f3')
  })
})
