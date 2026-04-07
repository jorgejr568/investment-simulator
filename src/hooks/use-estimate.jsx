import { createContext, useContext, useState, useMemo } from 'react'

const EstimateContext = createContext(null)

const initialState = {
  initialAmount: null,
  investmentDurationInMonths: 120,
  contributionPerMonth: null,
  profitabilityPerMonth: 0.6,
  incomeGrowth: 0,
  advancedOptionsEnabled: false,
}

export function EstimateProvider({ children }) {
  const [estimate, setEstimate] = useState(initialState)

  const update = (field, value) => {
    setEstimate((prev) => ({ ...prev, [field]: value }))
  }

  const canSubmit = useMemo(() => {
    return (
      estimate.initialAmount > 0 &&
      estimate.investmentDurationInMonths > 0 &&
      estimate.contributionPerMonth > 0 &&
      estimate.profitabilityPerMonth > 0
    )
  }, [estimate])

  return (
    <EstimateContext.Provider value={{ estimate, update, canSubmit }}>
      {children}
    </EstimateContext.Provider>
  )
}

export function useEstimate() {
  const ctx = useContext(EstimateContext)
  if (!ctx) throw new Error('useEstimate must be used within EstimateProvider')
  return ctx
}
