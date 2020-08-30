<template>
  <v-simple-table fixed-header :height="height" class="custom-overflow-bar">
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
</template>

<script>
  export default {
    name: 'OrganismsResultTable',
    props: {
      rows: {
        required: true,
        type: Array,
      },
      height: {
        required: false,
        type: String,
      },
    },
  }
</script>
<style scoped>
  tr {
    th {
      text-align: center !important;
    }
    td {
      text-align: center;
    }
  }
</style>
