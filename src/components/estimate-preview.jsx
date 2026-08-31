import { useMemo } from 'react'
import { useEstimate } from '@/hooks/use-estimate'
import { calculateInvestment } from '@/lib/calculate'
import { formatDuration, formatMoney } from '@/lib/format'
import { TrajectoryChart } from '@/components/trajectory-chart'
import { ChartNoAxesCombined } from 'lucide-react'

export function EstimatePreview() {
  const { estimate, canSubmit } = useEstimate()
  const result = useMemo(
    () => (canSubmit ? calculateInvestment(estimate) : null),
    [canSubmit, estimate]
  )

  return (
    <section
      aria-labelledby="projection-title"
      className="rounded-[1.4rem] border bg-card p-5 shadow-[0_24px_70px_rgba(18,48,33,0.08)] sm:p-7 dark:shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
    >
      {result ? (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 id="projection-title" className="text-sm font-semibold text-muted-foreground">
                Projeção do investimento
              </h2>
              <p className="mt-2 font-mono text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                {formatMoney(result.finalAmount)}
              </p>
            </div>
            <span className="rounded-xl bg-accent px-3 py-2 font-mono text-xs font-medium text-accent-foreground">
              {formatDuration(estimate.investmentDurationInMonths)}
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t pt-5 text-sm">
            <div>
              <dt className="text-muted-foreground">Capital investido</dt>
              <dd className="mt-1 font-mono font-medium">{formatMoney(result.totalInvested)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Rendimentos</dt>
              <dd className="mt-1 font-mono font-medium text-primary">{formatMoney(result.totalProfit)}</dd>
            </div>
          </dl>

          <TrajectoryChart rows={result.rows} className="mt-6" />
        </>
      ) : (
        <div className="flex min-h-72 flex-col justify-between sm:min-h-80">
          <div className="flex items-center justify-between gap-4">
            <h2 id="projection-title" className="text-sm font-semibold text-muted-foreground">
              Projeção do investimento
            </h2>
            <ChartNoAxesCombined aria-hidden="true" className="size-5 text-primary" strokeWidth={1.75} />
          </div>
          <div className="max-w-md pb-3">
            <p className="text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Sua trajetória começa com um cenário.
            </p>
            <p className="mt-3 max-w-[42ch] text-sm leading-6 text-muted-foreground">
              Preencha o aporte inicial e o aporte mensal para comparar capital e rendimentos ao longo do tempo.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
