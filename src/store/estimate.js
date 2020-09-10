import { moneyOrPercentageToFloat } from '@/utils/money-or-percentage-to-float'
import { greaterThanZero } from '@/utils/greater-than-zero'

/**
 * STATES
 */

const state = () => ({
  initialAmount: null,
  investmentDurationInMonths: 120,
  contributionPerMonth: null,
  profitabilityPerMonth: (0.6).toFixed(2).replace('.', ','),
  incomeGrowth: 0,
  advancedOptionsEnabled: false,
})

/**
 * MUTATORS
 */

export const MUTATION_UPDATE_ESTIMATE_INITIAL_AMOUNT =
  'MUTATION_UPDATE_ESTIMATE_INITIAL_AMOUNT'
export const MUTATION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS =
  'MUTATION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS'
export const MUTATION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH =
  'MUTATION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH'
export const MUTATION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH =
  'MUTATION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH'
export const MUTATION_UPDATE_ESTIMATE_INCOME_GROWTH =
  'MUTATION_UPDATE_ESTIMATE_INCOME_GROWTH'
export const MUTATION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED =
  'MUTATION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED'

const mutations = {
  [MUTATION_UPDATE_ESTIMATE_INITIAL_AMOUNT](state, { amount }) {
    state.initialAmount = amount
  },
  [MUTATION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS](state, { months }) {
    state.investmentDurationInMonths = parseInt(months)
  },
  [MUTATION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH](state, { amount }) {
    state.contributionPerMonth = amount
  },
  [MUTATION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH](state, { percentage }) {
    state.profitabilityPerMonth = percentage
  },
  [MUTATION_UPDATE_ESTIMATE_INCOME_GROWTH](state, { amount }) {
    state.incomeGrowth = amount
  },
  [MUTATION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED](state, { enabled }) {
    state.advancedOptionsEnabled = enabled
  },
}

/**
 * ACTIONS
 */

export const ACTION_UPDATE_ESTIMATE_INITIAL_AMOUNT =
  'ACTION_UPDATE_ESTIMATE_INITIAL_AMOUNT'
export const ACTION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS =
  'ACTION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS'
export const ACTION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH =
  'ACTION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH'
export const ACTION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH =
  'ACTION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH'
export const ACTION_UPDATE_ESTIMATE_INCOME_GROWTH =
  'ACTION_UPDATE_ESTIMATE_INCOME_GROWTH'
export const ACTION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED =
  'ACTION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED'

const actions = {
  [ACTION_UPDATE_ESTIMATE_INITIAL_AMOUNT]({ commit, state }, amount) {
    if (state.initialAmount !== amount)
      commit(MUTATION_UPDATE_ESTIMATE_INITIAL_AMOUNT, { amount })
  },
  [ACTION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS](
    { commit, state },
    months
  ) {
    if (state.investmentDurationInMonths !== months)
      commit(MUTATION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS, {
        months,
      })
  },
  [ACTION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH]({ commit, state }, amount) {
    if (state.contributionPerMonth !== amount)
      commit(MUTATION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH, { amount })
  },
  [ACTION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH](
    { commit, state },
    percentage
  ) {
    if (state.profitabilityPerMonth !== percentage)
      commit(MUTATION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH, {
        percentage,
      })
  },
  [ACTION_UPDATE_ESTIMATE_INCOME_GROWTH]({ commit, state }, amount) {
    if (state.incomeGrowth !== amount) {
      commit(MUTATION_UPDATE_ESTIMATE_INCOME_GROWTH, { amount })
    }
  },
  [ACTION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED](
    { commit, state },
    enabled
  ) {
    if (state.advancedOptionsEnabled !== enabled) {
      commit(MUTATION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED, { enabled })
    }
  },
}

/**
 * GETTERS
 */
export const GETTER_ESTIMATE_INITIAL_AMOUNT = 'GETTER_ESTIMATE_INITIAL_AMOUNT'
export const GETTER_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS =
  'GETTER_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS'
export const GETTER_ESTIMATE_CONTRIBUTION_PER_MONTH =
  'GETTER_ESTIMATE_CONTRIBUTION_PER_MONTH'
export const GETTER_ESTIMATE_PROFITABILITY_PER_MONTH =
  'GETTER_ESTIMATE_PROFITABILITY_PER_MONTH'
export const GETTER_ESTIMATE_INCOME_GROWTH = 'GETTER_ESTIMATE_INCOME_GROWTH'
export const GETTER_ESTIMATE_ADVANCED_OPTIONS_ENABLED =
  'GETTER_ESTIMATE_ADVANCED_OPTIONS_ENABLED'
export const GETTER_ESTIMATE_FORM_CAN_SEND = 'GETTER_ESTIMATE_FORM_CAN_SEND'
export const GETTER_ESTIMATE = 'GETTER_ESTIMATE'

const getters = {
  [GETTER_ESTIMATE_INITIAL_AMOUNT]: ({ initialAmount }) =>
    moneyOrPercentageToFloat(initialAmount),
  [GETTER_ESTIMATE_CONTRIBUTION_PER_MONTH]: ({ contributionPerMonth }) =>
    moneyOrPercentageToFloat(contributionPerMonth),
  [GETTER_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS]: ({
    investmentDurationInMonths,
  }) => parseInt(investmentDurationInMonths) || 0,
  [GETTER_ESTIMATE_PROFITABILITY_PER_MONTH]: ({ profitabilityPerMonth }) =>
    moneyOrPercentageToFloat(profitabilityPerMonth),
  [GETTER_ESTIMATE_INCOME_GROWTH]: ({ incomeGrowth }) =>
    moneyOrPercentageToFloat(incomeGrowth),
  [GETTER_ESTIMATE_ADVANCED_OPTIONS_ENABLED]: ({ advancedOptionsEnabled }) =>
    advancedOptionsEnabled,
  [GETTER_ESTIMATE]: (_, getters) => ({
    initialAmount: getters[GETTER_ESTIMATE_INITIAL_AMOUNT],
    investmentDurationInMonths:
      getters[GETTER_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS],
    contributionPerMonth: getters[GETTER_ESTIMATE_CONTRIBUTION_PER_MONTH],
    profitabilityPerMonth: getters[GETTER_ESTIMATE_PROFITABILITY_PER_MONTH],
    incomeGrowth: getters[GETTER_ESTIMATE_INCOME_GROWTH],
    advancedOptionsEnabled: getters[GETTER_ESTIMATE_ADVANCED_OPTIONS_ENABLED],
  }),
  [GETTER_ESTIMATE_FORM_CAN_SEND]: (_, getters) =>
    greaterThanZero(getters[GETTER_ESTIMATE_INITIAL_AMOUNT]) &&
    greaterThanZero(getters[GETTER_ESTIMATE_CONTRIBUTION_PER_MONTH]) &&
    greaterThanZero(getters[GETTER_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS]) &&
    greaterThanZero(getters[GETTER_ESTIMATE_PROFITABILITY_PER_MONTH]),
}

export default { state, mutations, actions, getters }
