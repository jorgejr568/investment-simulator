import Vue from 'vue'

const options = { style: 'currency', currency: 'BRL' }
export const moneyFormatFilter = v =>
  new Intl.NumberFormat('pt-BR', options).format(v)

Vue.filter('moneyFormat', moneyFormatFilter)
