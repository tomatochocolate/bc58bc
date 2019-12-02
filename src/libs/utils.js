/**
 * 实用工具库
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017/12/18 11:56
 */
import head from 'lodash/head'
import last from 'lodash/last'
import omit from 'lodash/omit'
import isNull from 'lodash/isNull'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'
import chunk from 'lodash/chunk'
import extend from 'lodash/extend'
import debounce from 'lodash/debounce'
import startCase from 'lodash/startCase'
import extendWith from 'lodash/extendWith'
import dayjs from 'dayjs'
import numeral from 'numeral'
import 'numeral/locales/chs'


numeral.locale('chs')
/**
 * uuid
 * @returns { String }
 */
export const uuid = () => {
    let d = Date.now()
    if (isUndefined(performance) && isFunction(performance.now)) {
        // use high-precision timer if available
        d += performance.now()
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (x, y) => {
        const r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (x === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}
/**
 * sleep
 * @param { Number } ms - 等待时间。单位（毫秒）
 * @returns { Promise }
 */
export const sleep = ms => {
    return new Promise(resolve => setTimeout(() => {
        resolve()
    }, ms))
}


/**
 * 检查 value 是否是nodeList
 * @param { * } value
 * @returns { Boolean } value是nodeList，那么返回 true，否则返回 false
 */
export const isNodeList = (value) => {
    return Object.prototype.toString.call(value) === '[object NodeList]'
}

/**
 * url参数转对象
 * @param { String } url  默认: window.location.href
 * @returns { Object }
 */
export const parseQueryString = (url = window.location.href) => {
    let query = {}
    let search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1)

    if (search === '') {
        return {}
    }
    search = search.split('&')
    for (let i = 0; i < search.length; i++) {
        let pair = search[i].split('=')
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
    }
    return query
}

/**
 * 处理对象参数值，排除对象参数值为""、null、undefined，并返回一个新对象
 * @param { Object } params - 参数
 * @returns { Object }
 */
export const dealObjectValue = (params) => {
    let results = {}

    if (params === null || params === undefined || params === '') return results
    for (let key in params) {
        const param = params[key]

        if (isObject(param)) {
            results[key] = dealObjectValue(param)
        } else if (!isNull(param) && !isUndefined(param) && param !== '') {
            results[key] = param
        }
    }
    return results
}

/**
 * 根据label查找Cascader
 * @param { Array } data - Cascader数据
 * @param { Array } label - 名称
 * @returns { Object }
 */
export const findCascaderLabel = (data = [], label = []) => {
    let results = []

    for (let item of data) {
        if (label.indexOf(item.label) !== -1) {
            results.push(item.value)
        }
        if (isArray(item.children) && item.children.length) {
            results = [ ...results, ...findCascaderLabel(item.children, label) ]
        }
    }
    return results
}

/**
 * 绑定事件
 */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, type, listener, useCapture = false) {
            if (element && type && listener) {
                element.addEventListener(type, listener, useCapture)
            }
        }
    } else {
        return function (element, type, listener) {
            if (element && type && listener) {
                element.attachEvent('on' + type, listener)
            }
        }
    }
})()
/**
 * 解绑事件
 */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, type, listener, useCapture = false) {
            if (element && type) {
                element.removeEventListener(type, listener, useCapture)
            }
        }
    } else {
        return function (element, type, listener) {
            if (element && type) {
                element.detachEvent('on' + type, listener)
            }
        }
    }
})()

const loadScriptList = {}
export const loadScript = (url, script, maxTime = 10000, time = 100) => {
    return new Promise((resolve) => {
        if (!loadScriptList[url]) {
            loadScriptList[url] = 'loading'
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = url
            document.body.appendChild(script)

            script.addEventListener('load', () => {
                loadScriptList[url] = true
                resolve(true)
            })
            script.addEventListener('error', () => {
                resolve(false)
            })
            script.addEventListener('abort', () => {
                resolve(false)
            })
        } else if (loadScriptList[url] === 'loading' && script) {
            const intervalId = setInterval(() => {
                if (window[script]) {
                    clearInterval(intervalId)
                    resolve(true)
                }
                maxTime -= time
                if (maxTime < 0) {
                    clearInterval(intervalId)
                    resolve(false)
                }
            }, time)
        } else if (loadScriptList[url]) {
            resolve(true)
        }
    })
}

/**
 * 获取文件扩展名
 * @param filename
 * @returns { String }
 */
export const getFileExtension = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined
}

export {
    head,
    last,
    omit,
    dayjs,
    chunk,
    isNull,
    extend,
    isArray,
    isEqual,
    numeral,
    debounce,
    isNumber,
    isObject,
    isString,
    isBoolean,
    startCase,
    extendWith,
    isFunction,
    isUndefined
}
