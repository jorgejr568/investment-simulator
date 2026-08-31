import { useId } from 'react'
import { NumericFormat } from 'react-number-format'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CurrencyInput({ label, value, onValueChange, hint, ...props }) {
  const id = useId()
  const hintId = `${id}-hint`

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <NumericFormat
        id={id}
        aria-describedby={hint ? hintId : undefined}
        customInput={Input}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        value={value}
        onValueChange={(values) => onValueChange(values.floatValue ?? null)}
        {...props}
      />
      {hint && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function PercentageInput({ label, value, onValueChange, hint, ...props }) {
  const id = useId()
  const hintId = `${id}-hint`

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <NumericFormat
        id={id}
        aria-describedby={hint ? hintId : undefined}
        customInput={Input}
        decimalSeparator=","
        suffix=" %"
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        value={value}
        onValueChange={(values) => onValueChange(values.floatValue ?? null)}
        {...props}
      />
      {hint && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function MaskedNumberInput({ label, value, onValueChange, hint, ...props }) {
  const id = useId()
  const hintId = `${id}-hint`

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <NumericFormat
        id={id}
        aria-describedby={hint ? hintId : undefined}
        customInput={Input}
        allowNegative={false}
        decimalScale={0}
        value={value}
        onValueChange={(values) => onValueChange(values.floatValue ?? null)}
        {...props}
      />
      {hint && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
