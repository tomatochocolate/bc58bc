/**
 * actions
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017-04-09 21:39
 */
import * as type from './mutation-type'

export const login = ({ commit }, payload) => commit(type.LOGIN, payload)
export const logout = ({ commit }, payload) => commit(type.LOGOUT, payload)

export const menus = ({ commit, dispatch }, payload) => {
    dispatch('routes', payload)
    dispatch('homeRoute')
    dispatch('initTags')
    commit(type.MENUS)
}
export const caches = ({ commit }) => commit(type.CACHES)
export const routes = ({ commit }, payload) => commit(type.ROUTES, payload)
export const homeRoute = ({ commit }) => commit(type.HOMEROUTE)
export const openNames = ({ commit }) => commit(type.OPENNAMES)
export const activeName = ({ commit }) => commit(type.ACTIVENAME)
export const breadcrumbs = ({ commit }) => commit(type.BREADCRUMBS)
export const currentRoute = ({ commit, dispatch, rootState }) => {
    commit(type.CURRENTROUTE, rootState)
    dispatch('addTags')
    dispatch('openNames')
    dispatch('activeName')
    dispatch('breadcrumbs')
}
export const addTags = ({ commit, dispatch }) => {
    commit(type.ADDTAGS)
    dispatch('caches')
}
export const initTags = ({ commit, dispatch }) => {
    commit(type.INITTAGS)
    dispatch('caches')
}
export const removeTags = ({ commit, dispatch }, payload) => {
    commit(type.REMOVETAGS, payload)
    dispatch('caches')
}
export const updateTags = ({ commit }, payload) => commit(type.UPDATETAGS, payload)
export const closePage = ({ commit, dispatch }, payload) => {
    commit(type.CLOSEPAGE, payload)
    dispatch('caches')
}
export const updatePage = ({ commit, dispatch }, payload) => {
    dispatch('updateTags', payload)
}
export const breakpoints = ({ commit }, payload) => commit(type.BREAKPOINTS, payload)
