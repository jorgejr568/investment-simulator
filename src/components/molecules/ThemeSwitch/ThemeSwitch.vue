<template>
  <v-switch v-model="darkMode" :label="label" />
</template>

<script>
  import { VUETIFY_THEME_LOCAL_STORAGE_KEY } from '@/plugins/vuetify'

  export default {
    name: 'MoleculeThemeSwitch',
    data() {
      return {
        darkMode: this.$vuetify.theme.dark,
      }
    },
    computed: {
      label() {
        const mode = this.darkMode ? 'escuro' : 'claro'
        return `Modo ${mode}`
      },
    },
    watch: {
      darkMode(dark) {
        this.$vuetify.theme.dark = dark
        localStorage.setItem(
          VUETIFY_THEME_LOCAL_STORAGE_KEY,
          dark ? 'dark' : 'light'
        )
      },
    },
  }
</script>

<style scoped></style>
