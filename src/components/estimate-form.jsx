import { useNavigate } from 'react-router-dom'
import { useEstimate } from '@/hooks/use-estimate'
import { CurrencyInput, PercentageInput, MaskedNumberInput } from '@/components/currency-input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ArrowRight } from 'lucide-react'

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
      ...(estimate.advancedOptionsEnabled && estimate.incomeGrowth > 0 && {
        growth: estimate.incomeGrowth,
      }),
    })
    navigate(`/resultado?${params}`)
  }

  const monthlyRate = (estimate.profitabilityPerMonth || 0) / 100
  const annualProfitability = (((1 + monthlyRate) ** 12 - 1) * 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <CurrencyInput
          label="Aporte inicial"
          name="initialAmount"
          inputMode="decimal"
          autoComplete="off"
          value={estimate.initialAmount}
          onValueChange={(v) => update('initialAmount', v)}
        />

        <CurrencyInput
          label="Aporte mensal"
          name="contributionPerMonth"
          inputMode="decimal"
          autoComplete="off"
          value={estimate.contributionPerMonth}
          onValueChange={(v) => update('contributionPerMonth', v)}
        />
      </div>

      <div className="space-y-2">
        <MaskedNumberInput
          label="Duração em meses"
          name="investmentDurationInMonths"
          inputMode="numeric"
          autoComplete="off"
          value={estimate.investmentDurationInMonths}
          onValueChange={(v) => update('investmentDurationInMonths', v)}
          hint="Por quantos meses deixará o dinheiro investido"
          isAllowed={(values) => !values.floatValue || values.floatValue <= 9999}
        />
        <div role="group" className="grid grid-cols-5 gap-1.5" aria-label="Atalhos de duração">
          {YEAR_OPTIONS.map((year) => (
            <Button
              key={year}
              type="button"
              size="sm"
              variant={year * 12 === estimate.investmentDurationInMonths ? 'default' : 'outline'}
              className="min-w-0 px-1 text-[0.68rem] sm:text-xs"
              aria-pressed={year * 12 === estimate.investmentDurationInMonths}
              onClick={() => update('investmentDurationInMonths', year * 12)}
            >
              {year} anos
            </Button>
          ))}
        </div>
      </div>

      <PercentageInput
        label="Rentabilidade mensal estimada"
        name="profitabilityPerMonth"
        inputMode="decimal"
        autoComplete="off"
        value={estimate.profitabilityPerMonth}
        onValueChange={(v) => update('profitabilityPerMonth', v)}
        hint={`${annualProfitability}% ao ano`}
      />

      <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/65 px-4 py-3">
        <div>
          <Label htmlFor="advanced-options" className="text-sm font-semibold">Opções avançadas</Label>
          <p id="advanced-options-hint" className="mt-1 text-xs text-muted-foreground">Ajuste o aporte ao longo dos anos.</p>
        </div>
        <Switch
          id="advanced-options"
          name="advancedOptionsEnabled"
          aria-describedby="advanced-options-hint"
          checked={estimate.advancedOptionsEnabled}
          onCheckedChange={(v) => update('advancedOptionsEnabled', v)}
        />
      </div>

      {estimate.advancedOptionsEnabled && (
        <CurrencyInput
          label="Aumento anual do aporte mensal"
          name="incomeGrowth"
          inputMode="decimal"
          autoComplete="off"
          value={estimate.incomeGrowth}
          onValueChange={(v) => update('incomeGrowth', v ?? 0)}
          hint="Valor fixo somado ao aporte mensal a cada 12 meses"
        />
      )}

      <div className="space-y-2">
        <Button type="submit" size="lg" disabled={!canSubmit} className="w-full">
          Ver projeção
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </Button>
        <p id="form-status" aria-live="polite" className="text-center text-xs text-muted-foreground">
          {canSubmit ? 'Cenário pronto para calcular.' : 'Preencha os valores de aporte para continuar.'}
        </p>
      </div>
    </form>
  )
}
