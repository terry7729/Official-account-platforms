// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/styles/reset.scss'
import './assets/styles/common.scss'
import './assets/styles/element-variables.scss'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import Common from './js/common'
Vue.use(Common)

import Card from './components/Card'
Vue.component('card', Card)
import mineadd from './components/mine-add'
Vue.component('mine-add', mineadd)

Vue.filter('sourceMaterialType', val => {
  switch(val) {
    case '1':
      return '【图文】'
    case '3':
      return '【视频】'
    default:
      return '【其他】'
  }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

export default app