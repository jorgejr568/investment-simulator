const money = Object.freeze({
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  suffix: '',
  precision: 2,
  masked: true,
})

const percentage = Object.freeze({
  decimal: ',',
  thousands: '',
  prefix: '',
  suffix: ' %',
  precision: 2,
  masked: true,
})

const state = () => ({
  money,
  percentage,
})

export default { state }
