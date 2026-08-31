import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/use-theme'
import { EstimateProvider } from '@/hooks/use-estimate'
import { ThemeSwitch } from '@/components/theme-switch'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Home } from '@/pages/home'
import { Result } from '@/pages/result'
import { ChartNoAxesCombined, Github } from 'lucide-react'

export default function App() {
  return (
    <ThemeProvider>
      <EstimateProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-[100dvh] bg-background text-foreground">
            <a
              href="#main-content"
              className="fixed left-4 top-3 z-50 -translate-y-20 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
            >
              Ir para o conteúdo
            </a>
            <header className="border-b bg-background">
              <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
                <Link to="/" className="inline-flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <ChartNoAxesCombined aria-hidden="true" className="size-[1.15rem]" strokeWidth={1.8} />
                  </span>
                  <span className="truncate text-sm font-semibold tracking-[-0.02em] sm:text-base">
                    Simulador de investimentos
                  </span>
                </Link>
                <nav aria-label="Atalhos" className="flex shrink-0 items-center gap-2">
                  <a
                    href="https://github.com/jorgejr568/investment-simulator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-transparent px-2.5 text-sm font-semibold text-muted-foreground transition-[background-color,color,transform] hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] sm:px-3"
                  >
                    <Github aria-hidden="true" className="size-4" strokeWidth={1.8} />
                    <span className="hidden sm:inline">GitHub</span>
                    <span className="sr-only sm:hidden">GitHub</span>
                  </a>
                  <ThemeSwitch />
                </nav>
              </div>
            </header>

            <main id="main-content">
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
