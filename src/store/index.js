/**
 * store
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017-04-07 10:29
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: { app },
    strict: process.env.NODE_ENV !== 'production'
})
