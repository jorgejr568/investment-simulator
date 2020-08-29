import Vue from 'vue'

const options = { style: 'percent', minimumFractionDigits: 2 }
export const percentageFormatFilter = v =>
  new Intl.NumberFormat('pt-BR', options).format(v)

Vue.filter('percentageFormat', percentageFormatFilter)
