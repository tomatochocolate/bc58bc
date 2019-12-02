/**
 * 助手
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 22:33
 */
import axios from 'axios/dist/axios'

import store from '@/store'
import router from '@/router'
import iView from '@/libs/iview'
import { isString, isFunction } from '@/libs/utils'

// 请求合并确保只出现一次Loading
let needLoadingRequestCount = 0
export const showFullScreenLoading = () => {
    needLoadingRequestCount === 0 && iView.Spin.show()
    needLoadingRequestCount++
}
export const tryHideFullScreenLoading = () => {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    // 90ms间隔内的Loading合并为一次
    needLoadingRequestCount === 0 && setTimeout(tryCloseLoading, 90)
}
export const tryCloseLoading = () => {
    needLoadingRequestCount === 0 && iView.Spin.hide()
}

let pending = []
export const CancelToken = axios.CancelToken
export const pushPending = (options, func) => {
    pending.push({
        url: `${options.baseURL}${options.url}&${options.method}`,
        func,
        fullPath: options.route.fullPath
    })
}
export const cancelPending = (options, type = 'cancel') => {
    for (let item of pending) {
        if ((isString(options) && item.fullPath === options) || item.url === `${options.url}&${options.method}`) {
            if (type === 'cancel') {
                item.func()
                // 取消请求确保Loading
                needLoadingRequestCount--
            }
            pending.splice(item, 1)
            break
        }
    }
}

/**
 * 执行Message关闭回调自定义方法
 * @param { Object } response 响应对象
 * @returns { Boolean }
 */
const runMessageFunc = (response) => {
    const { message } = response.config

    if (isFunction(message)) {
        message(response)
        return true
    }
    return false
}
/**
 * 状态码处理
 * @param { Object } response 响应对象
 * @returns { * }
 */
export const statusCode = (response) => {
    switch (response.status) {
        // case 401:
        //     iView.Message.error({
        //         content: '未授权，请登录',
        //         duration: 6,
        //         closable: true,
        //         onClose () {
        //             if (runMessageFunc(response)) return
        //             router.push({ name: 'login', replace: true })
        //         }
        //     })
        //     break
        // case 403:
        //     iView.Message.error({
        //         content: '拒绝访问',
        //         duration: 6,
        //         closable: true,
        //         onClose () {
        //             if (runMessageFunc(response)) return
        //             router.push({ name: 'errors.403', replace: true })
        //         }
        //     })
        //     break
        case 404:
            iView.Message.error({
                content: `请求地址出错“${response.config.url}”`,
                duration: 6,
                closable: true,
                onClose () {
                    // if (runMessageFunc(response)) return
                    // router.push({ name: 'errors.404', replace: true })
                }
            })
            break
        // case 408:
        //     iView.Message.error({
        //         content: '请求超时',
        //         duration: 6,
        //         closable: true,
        //         onClose () { runMessageFunc(response) }
        //     })
        //     break
        case 500:
            iView.Message.error({
                content: '服务器内部错误',
                duration: 6,
                closable: true,
                onClose () {
                    // if (runMessageFunc(response)) return
                    // router.push({ name: 'errors.500', replace: true })
                }
            })
            break
        default:
            return response
    }
}
/**
 * 请求发出后检查返回的状态码,统一捕获正确和错误的状态码，正确就直接返回response,错误就自定义一个返回对象
 * @param { Object } response 响应对象
 * @return { Object } 响应正常就返回响应数据否则返回错误信息
 **/
export const checkStatus = (response) => {
    const { message } = response.config

    if (response && response.status === 200 && response.data.code === 999) {
        store.dispatch('app/logout')
        router.push({ name: 'login', replace: true })
        return response
    }
    if (message !== false) {
        // 如果http状态码正常，则直接返回数据
        if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
            if (response.data.code === '-1') {
                iView.Message.error({
                    content: '请求出错',
                    duration: 6,
                    closable: true,
                    onClose () { runMessageFunc(response) }
                })
            } else {
                return response.config.entire !== true ? response.data : response
            }
        } else {
            // 异常状态下，把错误信息返回去
            return statusCode(response)
        }
    }
    return response
}
/**
 * 检查完状态码后需要检查后如果成功了就需要检查后端的状态码处理网络正常时后台语言返回的响应
 * @param { Object } response 是后台返回的对象或者自定义的网络异常对象，不是http 响应对象
 * @return { Object } 返回后台传过来的数据对象，包含code,message,data等属性，
 */
export const checkCode = (response) => {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (response.data && response.status !== 200 && response.config.message !== false) {
        return statusCode(response)
    }
    return response
}
