// import router from '@/router'
import { uuid, head, omit, isArray, isEqual, isString, startCase, extend, extendWith, isUndefined } from '@/libs/utils'

/**
 * 获取导航菜单
 * @param routes - 路由数组
 * @returns { Array }
 */
export function getMenus (routes = []) {
    return routes
        .filter(item => item.meta && item.meta.menu !== false)
        .map(item => {
            const route = {
                id: item.id,
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta,
                loading: item.loading
            }

            if (isArray(item.children)) {
                const children = getMenus(item.children)

                if (children.length) {
                    route.children = children
                }
            }
            if (isArray(item.parentRoutes)) {
                route.parentRoutes = item.parentRoutes
            }
            if (item.meta && item.meta.href) {
                route.href = item.meta.href
            }
            return route
        })
}
/**
 * 获取格式化后的路由
 * @param routes - 路由数组
 * @param parentRoutes - 父级路由
 * @returns { Array }
 */
export function getRoutes (routes = [], parentRoutes = []) {
    const results = []

    for (let route of routes) {
        const item = {
            id: uuid(),
            path: route.path,
            name: route.name,
            meta: route.meta,
            query: {},
            params: {},
            loading: false
        }

        if (parentRoutes.length) {
            item.parentRoutes = parentRoutes
        }
        if (isArray(route.children)) {
            const children = route.children.filter(item => item.meta && item.meta.menu !== false)

            if (!route.name && children.length === 0) {
                const rootRoute = route.children.find(item => item.path === '' || item.path === '/') || {}

                if (rootRoute.name) {
                    item.name = rootRoute.name
                    item.path = rootRoute.path
                    item.meta = extendWith({}, item.meta, omit(rootRoute.meta, 'menu'), (object, sources) => isUndefined(sources) ? sources : object)
                }
            }
            item.children = getRoutes(route.children, [ ...parentRoutes, { id: item.id, name: item.name, meta: item.meta } ])
        }
        results.push(item)
    }
    return results
}

/**
 * 获取开启缓存的路由
 * @param routes - 路由数组
 * @returns { Array }
 */
export function getCaches (routes = []) {
    const caches = []

    for (let route of routes) {
        if (route.name && route.meta && route.meta.cache !== false) {
            const cacheName = isString(route.meta.cache) ? route.meta.cache : startCase(route.name).replace(/\s+/g, '')
            caches.push(cacheName)
        }
        if (isArray(route.children)) {
            caches.push(...getCaches(route.children))
        }
    }
    return caches
}

/**
 * 查找指定Id路由
 * @param routes - 路由数组
 * @param id - 路由ID
 * @returns { Object }
 */
export function findRouteId (routes = [], id = '') {
    let result = {}

    if (!id) return result
    for (let route of routes) {
        if (route.id === id) {
            result = route
            break
        }
        if (route.children && route.children.length) {
            const children = findRouteId(route.children, id)
            if (children.id) {
                result = children
                break
            }
        }
    }
    return result
}

/**
 * 查找指定Name路由
 * @param routes - 路由数组
 * @param name - 路由Name
 * @returns { Object }
 */
export function findRouteName (routes = [], name = '') {
    let result = {}

    if (!name) return result
    for (let route of routes) {
        if (route.name === name) {
            result = route
            break
        } else if (isArray(route.children) && route.children.length) {
            const children = findRouteName(route.children, name)
            if (children.name) {
                result = children
                break
            }
        }
    }
    return result
}

/**
 * 获取面包屑
 * @returns { Array }
 */
export function getBreadcrumbs (route, homeRoute) {
    if (route.name === homeRoute.name) {
        return [ homeRoute ]
    }
    const parentRoutes = route.parentRoutes || []
    const breadcrumbs = [ ...parentRoutes, { id: route.id, name: route.name, meta: route.meta } ]
        .filter(item => item.meta && item.meta.breadcrumb !== false)
        .map(item => {
            return {
                id: item.id,
                name: item.name,
                meta: extend({}, item.meta)
            }
        })
    return [ homeRoute, ...breadcrumbs ]
}

/**
 * 获取第一个路由作为默认页
 * @param routes
 * @returns { Boolean }
 */
export function getFirstDefaultRoute (routes = []) {
    let result = head(routes)

    if (result.children && result.children.length) {
        const children = getFirstDefaultRoute(result.children)

        if (children.id) {
            result = children
        }
    }
    return result
}

/**
 * 比较两个路由是否相等
 * @param value - A路由
 * @param other - B路由
 * @returns { Boolean }
 */
export function routeEqual (value, other) {
    return (value.name === other.name) && isEqual(value.params, other.params) && isEqual(value.query, other.query)
}

/**
 * 路由是否存在
 * @param tagsList - 已打开的tabs列表
 * @param route - 当前路由
 * @returns { Boolean }
 */
export function routeHasExist (tagsList = [], route) {
    let res = false

    for (let tag of tagsList) {
        if (routeEqual(tag, route)) {
            res = true
        }
    }
    return res
}

/**
 * 返回当前路由相邻路由
 * @param tagsList - 已打开的tabs列表
 * @param route - 当前路由
 * @returns { Object }
 */
export function nextRoute (tagsList, route) {
    const index = tagsList.findIndex(tag => routeEqual(tag, route))

    if (index === tagsList.length - 1) {
        return tagsList[tagsList.length - 2]
    }
    return tagsList[index + 1]
}
