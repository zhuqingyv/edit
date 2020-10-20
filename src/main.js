/*
 * @Author: zhuqingyu
 * @Date: 2020-10-13 18:14:50
 * @LastEditTime: 2020-10-14 15:13:02
 * @LastEditors: zhuqingyu
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'

import './style/index.scss'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
