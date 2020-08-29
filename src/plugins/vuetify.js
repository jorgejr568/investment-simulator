import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export const VUETIFY_THEME_LOCAL_STORAGE_KEY = 'VUETIFY_THEME'
export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark:
      (localStorage.getItem(VUETIFY_THEME_LOCAL_STORAGE_KEY) || 'dark') ===
      'dark',
    themes: {
      light: {
        primary: colors.blue.darken3,
        secondary: colors.grey.darken1,
      },
      dark: {
        primary: colors.deepPurple.lighten2,
      },
    },
  },
})
