import { useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useEstimate } from '@/hooks/use-estimate'
import { calculateInvestment } from '@/lib/calculate'
import { formatDuration, formatMoney, formatPercent } from '@/lib/format'
import { ResultTable } from '@/components/result-table'
import { ResultInfo } from '@/components/result-info'
import { TrajectoryChart } from '@/components/trajectory-chart'
import { buttonVariants } from '@/components/ui/button-styles'
import { cn } from '@/lib/utils'
import { ArrowLeft, CircleAlert } from 'lucide-react'

function parseParams(searchParams) {
  const initialAmount = Number(searchParams.get('initialAmount'))
  const duration = Number(searchParams.get('duration'))
  const contribution = Number(searchParams.get('contribution'))
  const profitability = Number(searchParams.get('profitability'))
  const growthParam = searchParams.get('growth')
  const growth = growthParam === null ? 0 : Number(growthParam)
  const positiveValues = [initialAmount, duration, contribution, profitability]

  if (
    positiveValues.some((value) => !Number.isFinite(value) || value <= 0) ||
    !Number.isInteger(duration) ||
    duration > 9999 ||
    !Number.isFinite(growth) ||
    growth < 0
  ) return null

  return {
    initialAmount,
    investmentDurationInMonths: duration,
    contributionPerMonth: contribution,
    profitabilityPerMonth: profitability,
    incomeGrowth: growth,
  }
}

export function Result() {
  const [searchParams] = useSearchParams()
  const { hydrate } = useEstimate()

  const params = useMemo(() => parseParams(searchParams), [searchParams])
  const result = useMemo(() => params && calculateInvestment(params), [params])

  useEffect(() => {
    if (params) {
      hydrate({
        initialAmount: params.initialAmount,
        investmentDurationInMonths: params.investmentDurationInMonths,
        contributionPerMonth: params.contributionPerMonth,
        profitabilityPerMonth: params.profitabilityPerMonth,
        incomeGrowth: params.incomeGrowth,
        advancedOptionsEnabled: params.incomeGrowth > 0,
      })
    }
  }, [params, hydrate])

  if (!result) {
    return (
      <section className="mx-auto flex min-h-[calc(100dvh-4.5rem)] max-w-xl flex-col items-center justify-center px-4 py-12 text-center">
        <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <CircleAlert aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </span>
        <h1
          tabIndex={-1}
          className="mt-6 rounded-sm text-balance text-3xl font-semibold tracking-[-0.04em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          Não foi possível montar esta projeção
        </h1>
        <p className="mt-3 max-w-[42ch] text-sm leading-6 text-muted-foreground">
          O link está incompleto ou contém valores inválidos. Volte ao simulador para criar um novo cenário.
        </p>
        <Link to="/" className={cn(buttonVariants({ size: 'lg' }), 'mt-7')}>
          Voltar ao simulador
        </Link>
      </section>
    )
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:py-12">
      <Link to="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-3')}>
        <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.8} />
        Ajustar cenário
      </Link>

      <header className="mt-7 grid gap-8 rounded-[1.4rem] border bg-card p-5 shadow-[0_24px_70px_rgba(18,48,33,0.08)] sm:p-8 lg:grid-cols-12 lg:gap-12 dark:shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold text-muted-foreground">
            Valor final projetado em <span className="font-mono text-foreground">{formatDuration(params.investmentDurationInMonths)}</span>
          </p>
          <h1
            tabIndex={-1}
            className="mt-4 break-words rounded-sm font-mono text-4xl font-medium tracking-[-0.055em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card sm:text-5xl lg:text-6xl"
          >
            {formatMoney(result.finalAmount)}
          </h1>
          <p className="mt-5 max-w-[60ch] text-sm leading-6 text-muted-foreground">
            Estimativa matemática sem impostos ou taxas, baseada em rentabilidade mensal constante.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-5">
          <ResultInfo label="Valor investido" value={formatMoney(result.totalInvested)} />
          <ResultInfo label="Juros recebidos" value={formatMoney(result.totalProfit)} highlight />
          <ResultInfo label="Rentabilidade no período" value={formatPercent(result.totalProfitPercentage)} />
          <ResultInfo label="Renda mensal estimada" value={formatMoney(result.estimatedMonthlyIncome)} />
        </dl>
      </header>

      <section aria-labelledby="growth-title" className="mt-8 rounded-[1.4rem] border bg-card p-5 sm:p-8">
        <h2 id="growth-title" className="text-balance text-2xl font-semibold tracking-[-0.035em]">Como o saldo cresce</h2>
        <p className="mt-2 max-w-[55ch] text-sm leading-6 text-muted-foreground">
          Compare o capital aplicado com os rendimentos acumulados ao longo do período.
        </p>
        <TrajectoryChart rows={result.rows} className="mt-7" />
      </section>

      <section aria-labelledby="monthly-title" className="mt-12">
        <h2 id="monthly-title" className="text-balance text-2xl font-semibold tracking-[-0.035em]">Evolução mês a mês</h2>
        <p className="mb-6 mt-2 max-w-[55ch] text-sm leading-6 text-muted-foreground">
          Consulte cada aporte e o saldo acumulado usado no cálculo da projeção.
        </p>
        <ResultTable rows={result.rows} />
      </section>
    </div>
  )
}
