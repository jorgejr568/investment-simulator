import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Result from '@/views/Result'

Vue.use(VueRouter)

const title = title => `${title} - Simulador de investimentos`
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: title('Home'),
    },
  },
  {
    path: '/resultado',
    name: 'Result',
    component: Result,
    meta: {
      title: title('Resultado'),
    },
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
