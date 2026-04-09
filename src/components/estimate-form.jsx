import { useNavigate } from 'react-router-dom'
import { useEstimate } from '@/hooks/use-estimate'
import { CurrencyInput, PercentageInput, MaskedNumberInput } from '@/components/currency-input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const YEAR_OPTIONS = [5, 10, 15, 20, 30]

export function EstimateForm() {
  const { estimate, update, canSubmit } = useEstimate()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    const params = new URLSearchParams({
      initialAmount: estimate.initialAmount,
      duration: estimate.investmentDurationInMonths,
      contribution: estimate.contributionPerMonth,
      profitability: estimate.profitabilityPerMonth,
      ...(estimate.incomeGrowth > 0 && { growth: estimate.incomeGrowth }),
    })
    navigate(`/resultado?${params}`)
  }

  const annualProfitability = ((estimate.profitabilityPerMonth || 0) * 12).toFixed(2).replace('.', ',')

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <CurrencyInput
        label="Aporte inicial"
        value={estimate.initialAmount}
        onValueChange={(v) => update('initialAmount', v)}
      />

      <div className="space-y-2">
        <MaskedNumberInput
          label="Duração em meses"
          value={estimate.investmentDurationInMonths}
          onValueChange={(v) => update('investmentDurationInMonths', v)}
          hint="Por quantos meses deixará o dinheiro investido"
          isAllowed={(values) => !values.floatValue || values.floatValue <= 9999}
        />
        <div className="flex flex-wrap gap-1.5">
          {YEAR_OPTIONS.map((year) => (
            <Badge
              key={year}
              variant={year * 12 === estimate.investmentDurationInMonths ? 'default' : 'outline'}
              onClick={() => update('investmentDurationInMonths', year * 12)}
            >
              {year} anos
            </Badge>
          ))}
        </div>
      </div>

      <CurrencyInput
        label="Aporte mensal"
        value={estimate.contributionPerMonth}
        onValueChange={(v) => update('contributionPerMonth', v)}
      />

      <PercentageInput
        label="Rentabilidade mensal estimada"
        value={estimate.profitabilityPerMonth}
        onValueChange={(v) => update('profitabilityPerMonth', v)}
        hint={`${annualProfitability}% por ano`}
      />

      <div className="flex items-center gap-3 py-2">
        <Switch
          checked={estimate.advancedOptionsEnabled}
          onCheckedChange={(v) => update('advancedOptionsEnabled', v)}
        />
        <Label className="text-sm font-medium">Opções avançadas</Label>
      </div>

      {estimate.advancedOptionsEnabled && (
        <CurrencyInput
          label="Crescimento anual dos aportes"
          value={estimate.incomeGrowth}
          onValueChange={(v) => update('incomeGrowth', v ?? 0)}
        />
      )}

      <Button type="submit" disabled={!canSubmit} className="w-full">
        Calcular
      </Button>
    </form>
  )
}
