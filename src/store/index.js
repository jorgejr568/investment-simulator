import Vue from 'vue'
import Vuex from 'vuex'
import estimate from '@/store/estimate'
import masks from '@/store/masks'
Vue.use(Vuex)

export const STORE_ESTIMATE_STATE = 'estimate'
export const STORE_MASKS_STATE = 'masks'
export default new Vuex.Store({
  modules: {
    [STORE_ESTIMATE_STATE]: estimate,
    [STORE_MASKS_STATE]: masks,
  },
})
