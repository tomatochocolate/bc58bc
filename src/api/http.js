/**
 * axios配置
 * @author 请叫我蛋蛋哥 <76573917@qq.com>`
 * @created 2017-04-07 10:55
 */
import qs from 'qs/dist/qs'
import axios from 'axios/dist/axios'

import store from '@/store'
import iView from '@/libs/iview'
import { api } from '@/config'
import { checkCode, checkStatus, CancelToken, pushPending, showFullScreenLoading, tryHideFullScreenLoading, cancelPending } from './helper'

const instance = axios.create()
instance.defaults.baseURL = api.baseURL
instance.defaults.timeout = api.timeout
instance.interceptors.request.use((options) => {
    options.route = store.state.route

    if (store.state.app.token) {
        options.headers.Authorization = `Bearer ${store.state.app.token}`
    }
    options.loading !== false && showFullScreenLoading()
    options.cancelToken = new CancelToken(func => pushPending(options, func))
    if (options.file !== true && [ 'post', 'put' ].indexOf(options.method.toLocaleLowerCase()) !== -1) {
        options.data = qs.stringify(options.data, { arrayFormat: 'brackets' })
    }
    return options
}, (error) => Promise.reject(error))
instance.interceptors.response.use((response) => {
    // 完成删除队列
    cancelPending(response.config, 'remove')
    response.config.loading !== false && tryHideFullScreenLoading()
    return Promise.resolve(checkStatus(response))
}, (error) => {
    // error.response，error.request，error.config，error.message
    cancelPending(error.config, 'remove')
    error.config.loading !== false && tryHideFullScreenLoading()
    if (error.response) {
        return Promise.reject(checkCode(error.response))
    }
    if (error.config.message !== false) {
        iView.Message.error({
            content: error.message,
            duration: 6,
            closable: true
        })
    }
    return Promise.reject(error.message)
})
export default instance
