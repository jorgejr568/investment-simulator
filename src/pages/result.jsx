import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { calculateInvestment } from '@/lib/calculate'
import { formatMoney, formatPercent } from '@/lib/format'
import { ResultTable } from '@/components/result-table'
import { ResultInfo } from '@/components/result-info'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

function parseParams(searchParams) {
  const initialAmount = parseFloat(searchParams.get('initialAmount'))
  const duration = parseInt(searchParams.get('duration'), 10)
  const contribution = parseFloat(searchParams.get('contribution'))
  const profitability = parseFloat(searchParams.get('profitability'))
  const growth = parseFloat(searchParams.get('growth')) || 0

  if (!initialAmount || !duration || !contribution || !profitability) return null

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

  const params = useMemo(() => parseParams(searchParams), [searchParams])
  const result = useMemo(() => params && calculateInvestment(params), [params])

  if (!result) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-4 py-12">
        <p className="text-muted-foreground">Parâmetros inválidos ou ausentes.</p>
        <Button asChild>
          <Link to="/">Voltar ao simulador</Link>
        </Button>
      </div>
    )
  }

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
