import '@/assets/css/global.css'
import '@/assets/css/reset.css'

import Vue from 'vue'
import Router from 'vue-router'
import Index from './index.vue'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/test',
      component: () => import('./test.vue')
    }
  ]
})
Vue.config.productionTip = false

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  router,
  render: h => h(Index)
})
