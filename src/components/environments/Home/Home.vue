<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>Simulador de investimento</v-card-title>

          <v-row class="mt-0">
            <v-col>
              <estimate-form />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import EstimateForm from '@/components/organisms/EstimateForm/EstimateForm'
  export default {
    name: 'EnvironmentsHome',
    components: { EstimateForm },
  }
</script>

<style scoped></style>
