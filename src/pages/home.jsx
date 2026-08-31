import { EstimateForm } from '@/components/estimate-form'
import { EstimatePreview } from '@/components/estimate-preview'

export function Home() {
  return (
    <section className="mx-auto grid min-h-[calc(100dvh-4.5rem)] w-full max-w-7xl grid-cols-1 gap-7 px-4 py-8 md:px-6 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8 lg:py-12">
      <header className="order-1 self-end lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Planejamento de longo prazo
        </p>
        <h1
          tabIndex={-1}
          className="mt-4 max-w-[13ch] rounded-sm text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.055em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-5xl lg:text-6xl"
        >
          Veja onde seus aportes podem chegar.
        </h1>
        <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
          Simule aportes mensais, rentabilidade e reajustes anuais com valores em reais.
        </p>
      </header>

      <aside
        aria-labelledby="scenario-title"
        className="order-2 rounded-[1.4rem] border bg-card p-5 shadow-[0_24px_70px_rgba(18,48,33,0.08)] sm:p-7 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 dark:shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
      >
        <div className="mb-6">
          <h2 id="scenario-title" className="text-xl font-semibold tracking-[-0.025em]">Monte seu cenário</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Ajuste os valores para comparar o que você investe com o que o tempo acrescenta.
          </p>
        </div>
        <EstimateForm />
      </aside>

      <div className="order-3 self-start lg:col-span-7">
        <EstimatePreview />
      </div>
    </section>
  )
}
