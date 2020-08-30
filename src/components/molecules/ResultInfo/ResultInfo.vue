<template>
  <v-card class="result-info">
    <v-card-title>{{ number }}</v-card-title>
    <v-card-subtitle>{{ title }}</v-card-subtitle>
  </v-card>
</template>

<script>
  export default {
    name: 'MoleculesResultInfo',
    props: {
      number: {
        required: true,
        type: String,
      },
      title: {
        required: true,
        type: String,
      },
    },
  }
</script>

<style scoped>
  .result-info {
    width: 100%;
  }
</style>
