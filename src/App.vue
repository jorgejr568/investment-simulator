<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-container class="d-flex">
        <div class="d-flex align-center">
          <router-link to="/"
            ><h1 class="white--text text-subtitle-1">
              BEM VINDX, INVESTIDORX!
            </h1></router-link
          >
        </div>

        <v-spacer></v-spacer>

        <v-btn href="https://github.com/jorgejr568" target="_blank" text>
          <span class="mr-2">GitHub</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <Transition name="fade" mode="out-in">
        <router-view />
      </Transition>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
  }
</script>
<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  html::-webkit-scrollbar {
    width: 8px;
    &-track {
      background-color: var(--v-secondary-base);
    }
    &-thumb {
      background-color: var(--v-primary-base);
    }
  }

  * {
    &::-webkit-scrollbar {
      width: 6px;
      &-track {
        background-color: var(--v-secondary-base);
      }
      &-thumb {
        background-color: var(--v-primary-base);
      }
    }
  }
</style>
