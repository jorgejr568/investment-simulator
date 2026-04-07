const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const percentFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
})

export function formatMoney(value) {
  return moneyFormatter.format(value)
}

export function formatPercent(value) {
  return percentFormatter.format(value)
}
