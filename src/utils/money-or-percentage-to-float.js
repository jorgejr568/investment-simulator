import { compose, replace, when } from 'ramda'

export const moneyOrPercentageToFloat = amount =>
  compose(
    when(isNaN, () => 0),
    parseFloat,
    v => v.trim(''),
    replace('%', ''),
    replace('R$', ''),
    replace(',', '.'),
    replace(/\./g, '')
  )(amount?.toString() || '')
