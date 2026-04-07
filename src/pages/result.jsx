import { useMemo, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useEstimate } from '@/hooks/use-estimate'
import { calculateInvestment } from '@/lib/calculate'
import { formatMoney, formatPercent } from '@/lib/format'
import { ResultTable } from '@/components/result-table'
import { ResultInfo } from '@/components/result-info'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function Result() {
  const { estimate, canSubmit } = useEstimate()
  const navigate = useNavigate()

  useEffect(() => {
    if (!canSubmit) navigate('/')
  }, [canSubmit, navigate])

  const result = useMemo(() => {
    if (!canSubmit) return null
    return calculateInvestment({
      initialAmount: estimate.initialAmount,
      investmentDurationInMonths: estimate.investmentDurationInMonths,
      contributionPerMonth: estimate.contributionPerMonth,
      profitabilityPerMonth: estimate.profitabilityPerMonth,
      incomeGrowth: estimate.incomeGrowth || 0,
    })
  }, [estimate, canSubmit])

  if (!result) return null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Resultado</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ResultInfo label="Valor investido" value={formatMoney(result.totalInvested)} />
        <ResultInfo label="Juros recebidos" value={formatMoney(result.totalProfit)} />
        <ResultInfo label="Valor final" value={formatMoney(result.finalAmount)} />
        <ResultInfo label="Rentabilidade no período" value={formatPercent(result.totalProfitPercentage)} />
        <ResultInfo label="Estimativa de recebimento mensal" value={formatMoney(result.estimatedMonthlyIncome)} />
      </div>

      <ResultTable rows={result.rows} />
    </div>
  )
}
