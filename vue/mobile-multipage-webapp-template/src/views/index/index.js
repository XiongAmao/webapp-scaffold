import '@/assets/css/global.css'
import '@/assets/css/reset.css'

import Vue from 'vue'
import Index from './index.vue'

new Vue({
  el: '#app',
  render: h => h(Index)
})
