export function calculateInvestment({
  initialAmount,
  investmentDurationInMonths,
  contributionPerMonth,
  profitabilityPerMonth,
  incomeGrowth,
}) {
  const monthlyRate = profitabilityPerMonth / 100
  let accumulated = 0
  let currentContribution = contributionPerMonth
  const rows = []

  for (let month = 1; month <= investmentDurationInMonths; month++) {
    if (month > 1 && month % 12 === 1) {
      currentContribution += incomeGrowth
    }

    const contributionAmount = month === 1 ? initialAmount : currentContribution
    accumulated = accumulated * (1 + monthlyRate) + contributionAmount

    rows.push({
      month,
      contributionAmount,
      profitabilityPerMonth: monthlyRate,
      accumulated,
    })
  }

  const totalInvested = rows.reduce((sum, r) => sum + r.contributionAmount, 0)
  const finalAmount = accumulated
  const totalProfit = finalAmount - totalInvested
  const totalProfitPercentage = totalInvested > 0 ? totalProfit / totalInvested : 0
  const estimatedMonthlyIncome = (finalAmount * monthlyRate)

  return {
    rows,
    totalInvested,
    finalAmount,
    totalProfit,
    totalProfitPercentage,
    estimatedMonthlyIncome,
  }
}
