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

export function formatDuration(months) {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years && !remainingMonths) {
    return `${years} ${years === 1 ? 'ano' : 'anos'}`
  }

  if (!years) {
    return `${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`
  }

  return `${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`
}
