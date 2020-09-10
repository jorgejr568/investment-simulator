<template>
  <v-container>
    <v-row align-md="stretch">
      <v-col md="8" sm="12" order="2" order-md="1" order-sm="1">
        <v-card>
          <v-card-title>
            <molecules-back-title to="/" title="Resultado" />
          </v-card-title>
          <v-row>
            <v-col>
              <organisms-result-table :rows="rows" height="500px" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        class="d-flex flex-wrap align-content-space-between order-1 order-sm-2 order-md-2"
      >
        <h3 class="mb-auto">Dados finais</h3>
        <molecules-result-info
          v-for="({ number, title }, key) in finalInfos"
          :key="key"
          :number="number"
          :title="title"
        />
      </v-col>
    </v-row>
    <v-card> </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {
    GETTER_ESTIMATE,
    GETTER_ESTIMATE_FORM_CAN_SEND,
  } from '@/store/estimate'
  import { moneyFormatFilter } from '@/filters/money-format'
  import { percentageFormatFilter } from '@/filters/percentage-format'
  import OrganismsResultTable from '@/components/organisms/ResultTable/ResultTable'
  import MoleculesBackTitle from '@/components/molecules/BackTitle/BackTitle'
  import MoleculesResultInfo from '@/components/molecules/ResultInfo/ResultInfo'
  export default {
    name: 'EnvironmentsResult',
    components: {
      MoleculesResultInfo,
      MoleculesBackTitle,
      OrganismsResultTable,
    },
    computed: {
      ...mapGetters({
        estimate: GETTER_ESTIMATE,
        canViewResult: GETTER_ESTIMATE_FORM_CAN_SEND,
      }),
      rows() {
        const { estimate } = this
        const rows = []
        const makeRow = (
          month,
          contributionAmount,
          profitabilityPerMonth,
          accumulated = 0
        ) => ({
          month,
          contributionAmount,
          profitabilityPerMonth,
          accumulated:
            accumulated * (1 + profitabilityPerMonth) + contributionAmount,
        })

        let accumulated = 0
        let { contributionPerMonth } = estimate
        for (
          let month = 1;
          month <= estimate.investmentDurationInMonths;
          month++
        ) {
          if (month > 1 && month % 12 === 1)
            contributionPerMonth += estimate.incomeGrowth
          let row = makeRow(
            month,
            month === 1 ? estimate.initialAmount : contributionPerMonth,
            estimate.profitabilityPerMonth / 100,
            accumulated
          )
          accumulated = row.accumulated
          rows.push(row)
        }

        return rows
      },
      totalInvestedAmount() {
        return this.rows.reduce((acc, row) => acc + row.contributionAmount, 0)
      },
      totalProfitabilityAmount() {
        return this.finalAmount - this.totalInvestedAmount
      },
      totalProfitabilityPercentage() {
        return this.totalProfitabilityAmount / this.totalInvestedAmount
      },
      estimateMonthlyRecievements() {
        return (this.finalAmount * this.estimate.profitabilityPerMonth) / 100
      },
      finalAmount() {
        return this.rows[this.rows.length - 1].accumulated
      },
      finalInfos() {
        const makeInfo = (title, number) => ({ title, number })
        return [
          makeInfo(
            'Valor investido',
            moneyFormatFilter(this.totalInvestedAmount)
          ),
          makeInfo(
            'Juros recebidos',
            moneyFormatFilter(this.totalProfitabilityAmount)
          ),
          makeInfo('Valor final', moneyFormatFilter(this.finalAmount)),
          makeInfo(
            'Rentabilidade no período',
            percentageFormatFilter(this.totalProfitabilityPercentage)
          ),
          makeInfo(
            'Estimativa de recebimento mensal',
            moneyFormatFilter(this.estimateMonthlyRecievements)
          ),
        ]
      },
    },
    mounted() {
      if (!this.canViewResult) this.$router.push('/')
    },
  }
</script>
