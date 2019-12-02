/**
 * 下载导出文件
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017/11/27 10:46
 */
import { extend, isFunction } from '@/libs/utils'

export default {
    methods: {
        /**
         * download
         * @param { Object } options
         * @param { Function } options.handle - 请求接口
         * @param { Function= } options.callback - 回调
         * @param { Object= } options.params - 请求参数
         * @param { Object= } options.loading - loading配置参数
         */
        async download (options = {}) {
            let {
                handle,
                params,
                callback,
                loading,
                message
            } = options

            if (isFunction(handle)) {
                this.$Spin.show(extend({
                    render: () => '在正努力下载中。。。'
                }, loading))

                try {
                    const response = await handle(params)

                    if (response.data.size === 0) {
                        this.$Spin.hide()
                        this.$Message(Object.assign({}, {
                            message: '导出数据有误，请重试',
                            type: 'error'
                        }, message))
                        return
                    }
                    let blob = new Blob([ response.data ], { type: response.headers['content-type'] })
                    let filename = (response.headers['content-disposition'] || '').split('filename=')[1]
                    let url = window.URL.createObjectURL(blob)
                    let a = document.createElement('a')

                    a.href = url
                    a.download = decodeURIComponent(filename)
                    a.click()
                    window.URL.revokeObjectURL(url)

                    this.$Spin.hide()
                    if (isFunction(callback)) {
                        callback.call(this, response)
                        return
                    }
                    return Promise.resolve(response)
                } catch (e) {
                    this.$Spin.hide()
                    this.$Message.error('网络异常,请稍候')
                    if (isFunction(callback)) {
                        callback.call(this, e)
                        return
                    }
                    return Promise.reject(e)
                }
            }
        }
    }
}
