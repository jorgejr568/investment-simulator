<template>
  <v-container>
    <v-row align-md="stretch">
      <v-col md="8" sm="12" order="2" order-md="1" order-sm="1">
        <v-card>
          <v-card-title class="result-title">
            <router-link to="/">
              <v-icon dense>mdi-arrow-left</v-icon>
            </router-link>
            Resultado
          </v-card-title>

          <v-row>
            <v-col>
              <v-simple-table
                fixed-header
                height="500px"
                class="custom-overflow-bar"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Valor aplicado</th>
                      <th>Rendimento mensal</th>
                      <th>Valor acumulado</th>
                    </tr>
                  </thead>
                  <tbody class="custom-overflow-bar">
                    <tr
                      v-for="{
                        month,
                        accumulated,
                        contributionAmount,
                        profitabilityPerMonth,
                      } in rows"
                      :key="month"
                    >
                      <td>{{ month }}</td>
                      <td>{{ contributionAmount | moneyFormat }}</td>
                      <td>{{ profitabilityPerMonth | percentageFormat }}</td>
                      <td>{{ accumulated | moneyFormat }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        class="d-flex flex-wrap align-content-space-between order-1 order-sm-2 order-md-2"
      >
        <h3 class="mb-auto">Dados finais</h3>
        <v-card
          v-for="(info, key) in finalInfos"
          :key="key"
          :style="{ width: '100%' }"
        >
          <v-card-title>{{ info.number }}</v-card-title>
          <v-card-subtitle>{{ info.title }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-card> </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { GETTER_ESTIMATE } from '@/store/estimate'
  import { moneyFormatFilter } from '@/filters/money-format'
  import { percentageFormatFilter } from '@/filters/percentage-format'
  export default {
    name: 'EnvironmentsResult',
    computed: {
      ...mapGetters({
        estimate: GETTER_ESTIMATE,
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
        for (
          let month = 1;
          month <= estimate.investmentDurationInMonths;
          month++
        ) {
          let row = makeRow(
            month,
            month === 1
              ? estimate.initialAmount
              : estimate.contributionPerMonth,
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
  }
</script>

<style scoped lang="scss">
  .result-title {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    a {
      margin-right: 10px;
      text-decoration: none;
    }
  }
  tr {
    th {
      text-align: center !important;
    }
    td {
      text-align: center;
    }
  }
  .rows {
    max-height: 100px !important;
    overflow: auto;
  }
</style>
