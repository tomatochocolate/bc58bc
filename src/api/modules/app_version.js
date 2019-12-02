/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 21:53
 */
import instance from '@/api/http'

export const store = (params) => {
    return instance.post('/app_version', params)
}
export const list = (params) => {
    return instance.get('/app_version', params)
}
export const upload = instance.defaults.baseURL + '/app_version/upload'
