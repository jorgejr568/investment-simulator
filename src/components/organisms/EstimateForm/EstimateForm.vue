<template>
  <v-form @submit.prevent="submit">
    <v-col cols="12">
      <v-text-field
        label="Aporte inicial"
        @input="updateInitialAmount"
        :value="estimate.initialAmount"
        outlined
        v-money="masks.money"
      />
    </v-col>

    <v-col cols="12">
      <v-text-field
        label="Duração em mêses"
        @input="updateInvestmentDurationInMonths"
        :value="estimate.investmentDurationInMonths"
        outlined
        hint="Por quantos mêses deixará o dinheiro investido"
        v-mask="'####'"
        class="ma-0 pa-0"
      />
      <v-row justify="space-between">
        <v-col class="py-0">
          <v-chip
            @click.prevent="selectYearOption(option)"
            v-for="option in yearsOptions"
            :key="option"
            class="mr-1"
            :outlined="option * 12 !== estimate.investmentDurationInMonths"
            color="secondary"
          >
            {{ option }} anos
          </v-chip>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-text-field
        label="Aporte mensal"
        @input="updateContributionPerMonth"
        :value="estimate.contributionPerMonth"
        outlined
        v-money="masks.money"
      />
    </v-col>

    <v-col cols="12">
      <v-text-field
        label="Rentabilidade mensal estimada"
        @input="updateProfitabilityPerMonth"
        :value="estimate.profitabilityPerMonth"
        outlined
        v-money="masks.percentage"
        suffix="%"
        :hint="profitabilityHint"
        persistent-hint
      />
    </v-col>

    <v-col class="d-flex justify-center">
      <v-switch
        label="OPÇÕES AVANÇADAS"
        @change="updateAdvancedOptionsEnabled"
        :input-value="estimate.advancedOptionsEnabled"
        inset
        color="success"
      />
    </v-col>

    <template v-if="estimate.advancedOptionsEnabled">
      <v-col cols="12">
        <v-text-field
          label="Crescimento anual dos aporte"
          @input="updateIncomeGrowth"
          :value="estimate.incomeGrowth"
          outlined
          v-money="masks.money"
        />
      </v-col>
    </template>

    <v-col cols="12">
      <v-btn color="primary" block :disabled="!formCanSend" type="submit">
        ENVIAR
      </v-btn>
    </v-col>
  </v-form>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import {
    ACTION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED,
    ACTION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH,
    ACTION_UPDATE_ESTIMATE_INCOME_GROWTH,
    ACTION_UPDATE_ESTIMATE_INITIAL_AMOUNT,
    ACTION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS,
    ACTION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH,
    GETTER_ESTIMATE,
    GETTER_ESTIMATE_FORM_CAN_SEND,
  } from '@/store/estimate'
  import { STORE_ESTIMATE_STATE, STORE_MASKS_STATE } from '@/store'

  export default {
    name: 'EstimateForm',
    data() {
      return {
        yearsOptions: [5, 10, 15, 20, 30],
        yearProfitability: [6, 7.5, 9, 12],
      }
    },
    computed: {
      ...mapState({
        estimate: STORE_ESTIMATE_STATE,
        masks: STORE_MASKS_STATE,
      }),
      ...mapGetters({
        formCanSend: GETTER_ESTIMATE_FORM_CAN_SEND,
        parsedEstimate: GETTER_ESTIMATE,
      }),
      profitabilityHint() {
        const yearProfitability = (
          this.parsedEstimate.profitabilityPerMonth * 12
        )
          .toFixed(2)
          .replace(/\./g, ',')
        return `${yearProfitability}% por ano`
      },
    },
    methods: {
      ...mapActions({
        updateInitialAmount: ACTION_UPDATE_ESTIMATE_INITIAL_AMOUNT,
        updateInvestmentDurationInMonths: ACTION_UPDATE_ESTIMATE_INVESTMENT_DURATION_IN_MONTHS,
        updateContributionPerMonth: ACTION_UPDATE_ESTIMATE_CONTRIBUTION_PER_MONTH,
        updateProfitabilityPerMonth: ACTION_UPDATE_ESTIMATE_PROFITABILITY_PER_MONTH,
        updateIncomeGrowth: ACTION_UPDATE_ESTIMATE_INCOME_GROWTH,
        updateAdvancedOptionsEnabled: ACTION_UPDATE_ESTIMATE_ADVANCED_OPTIONS_ENABLED,
      }),
      selectYearOption(option) {
        this.updateInvestmentDurationInMonths(option * 12)
      },
      submit() {
        this.$router.push({
          path: '/resultado',
        })
      },
    },
  }
</script>
