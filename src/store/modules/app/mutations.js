/**
 * mutations
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017-04-09 21:40
 */
import * as type from './mutation-type'
import router from '@/router'
import storage from '@/libs/storage'
import { cache } from '@/config'
import { last, isArray, extend } from '@/libs/utils'
import {
    getMenus, getRoutes, getCaches, getBreadcrumbs,
    routeEqual, nextRoute, routeHasExist, findRouteName
} from '@/libs/routes'

const saveTagsList = (state) => storage.local(`tagsList:${state.user.username}`, state.tagsList.map(item => {
    item.meta.loading = ''
    return item
}))
export default {
    // 登录
    [type.LOGIN] (state, payload) {
        state.user = payload.user
        state.token = payload.token
        storage.local.setAll({
            user: payload.user,
            token: payload.token
        }, cache.expires)
    },
    // 退出登录
    [type.LOGOUT] (state) {
        state.user = {}
        state.token = ''
        storage.local.remove('user')
        storage.local.remove('token')
    },

    [type.MENUS] (state) {
        state.menus = getMenus(state.routes)
    },
    [type.ROUTES] (state, payload) {
        state.routes = getRoutes(payload)
    },
    [type.CACHES] (state) {
        state.caches = getCaches(state.tagsList)
    },
    [type.HOMEROUTE] (state) {
        state.homeRoute = findRouteName(state.routes, 'home')
    },
    [type.OPENNAMES] (state) {
        if (isArray(state.currentRoute.parentRoutes)) {
            state.openNames = state.currentRoute.parentRoutes.map(item => item.id)
            return
        }
        state.openNames = []
    },
    [type.ACTIVENAME] (state) {
        const { id, path, meta, parentRoutes } = state.currentRoute

        if (meta && meta.menu === false && isArray(parentRoutes) && (path !== '' && path !== '/')) {
            state.activeName = last(parentRoutes).id
            return
        }
        state.activeName = id
    },
    [type.BREADCRUMBS] (state) {
        state.breadcrumbs = getBreadcrumbs(state.currentRoute, state.homeRoute)
    },
    [type.CURRENTROUTE] (state, rootState) {
        const { id, name, path, meta, parentRoutes } = findRouteName(state.routes, rootState.route.name)
        const { query, params } = rootState.route

        state.currentRoute = {
            id, name, path, query, params, parentRoutes,
            meta: extend({}, meta, rootState.route.meta)
        }
    },

    [type.INITTAGS] (state) {
        const { name, query, params, meta } = state.homeRoute

        state.tagsList = storage.local.get(`tagsList:${state.user.username}`, [ { name, query, params, meta } ])
    },
    [type.ADDTAGS] (state) {
        const { name, query, params, meta } = state.currentRoute

        if (meta && meta.tag === false) return
        if (!routeHasExist(state.tagsList, { name, query, params, meta })) {
            state.tagsList.push({ name, query, params, meta })
        }
        saveTagsList(state)
    },
    [type.REMOVETAGS] (state, { type, route }) {
        let tagsList = []

        if (type === 'close-all') {
            tagsList = state.tagsList.filter(tag => tag.name === state.homeRoute.name)
            router.push(state.homeRoute)
        } else if (type === 'close-others') {
            tagsList = state.tagsList.filter(tag => routeEqual(state.currentRoute, tag) || tag.name === state.homeRoute.name)
        } else {
            tagsList = state.tagsList.filter(tag => !routeEqual(route, tag))
            if (routeEqual(route, state.currentRoute)) {
                router.push(nextRoute(state.tagsList, state.currentRoute))
            }
        }
        state.tagsList = tagsList
        saveTagsList(state)
    },
    [type.UPDATETAGS] (state, { title = '', loading = true, route }) {
        let tagsList = []

        if (!route) route = state.currentRoute
        tagsList = state.tagsList.map(tag => {
            if (routeEqual(tag, route)) {
                tag.meta.title = title || tag.meta.title
                tag.meta.loading = loading
            }
            return tag
        })
        state.tagsList = tagsList
    },
    [type.CLOSEPAGE] (state, route) {
        // 没有指定关闭页面，则关闭当前页面
        if (!route) route = state.currentRoute
        state.tagsList = state.tagsList.filter(tag => !routeEqual(route, tag))
        saveTagsList(state)
    },
    [type.BREAKPOINTS] (state, payload) {
        state.breakpoints = extend(state.breakpoints, payload)
    }
}
