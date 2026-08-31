import { useMemo } from 'react'
import { useEstimate } from '@/hooks/use-estimate'
import { calculateInvestment } from '@/lib/calculate'
import { formatMoney } from '@/lib/format'

export function EstimatePreview() {
  const { estimate, canSubmit } = useEstimate()
  const result = useMemo(
    () => (canSubmit ? calculateInvestment(estimate) : null),
    [canSubmit, estimate]
  )

  return (
    <section aria-labelledby="projection-title" className="rounded-xl border bg-card p-6">
      <h2 id="projection-title" className="font-semibold">Projeção do investimento</h2>
      {result ? (
        <p className="mt-3 text-2xl font-bold">{formatMoney(result.finalAmount)}</p>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          Preencha os valores para visualizar a projeção.
        </p>
      )}
    </section>
  )
}
