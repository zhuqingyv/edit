/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 10:47:33
 * @LastEditTime: 2020-10-14 15:10:33
 * @LastEditors: zhuqingyu
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import getters from './getter/index.js'
import actions from './action/index.js'
import mutations from './mutation/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
export default store