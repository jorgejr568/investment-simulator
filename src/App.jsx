import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/use-theme'
import { EstimateProvider } from '@/hooks/use-estimate'
import { ThemeSwitch } from '@/components/theme-switch'
import { Home } from '@/pages/home'
import { Result } from '@/pages/result'

export default function App() {
  return (
    <ThemeProvider>
      <EstimateProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <header className="border-b">
              <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
                <a href="/" className="font-semibold text-lg">
                  Simulador de investimentos
                </a>
                <div className="flex items-center gap-4">
                  <ThemeSwitch />
                  <a
                    href="https://github.com/jorgejr568/investment-simulator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resultado" element={<Result />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </EstimateProvider>
    </ThemeProvider>
  )
}
