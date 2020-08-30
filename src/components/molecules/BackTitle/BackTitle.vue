<template>
  <div class="back-title">
    <router-link :to="to">
      <v-icon dense>mdi-arrow-left</v-icon>
    </router-link>
    {{ title }}
  </div>
</template>

<script>
  export default {
    name: 'MoleculesBackTitle',
    props: {
      to: {
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

<style scoped lang="scss">
  .back-title {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    a {
      margin-right: 10px;
      text-decoration: none;
    }
  }
</style>
