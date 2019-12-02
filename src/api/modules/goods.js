/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 21:53
 */
import instance from '@/api/http'

export const store = (params) => {
    return instance.post('/goods', params)
}
export const update = (params) => {
    return instance.post('/goods/update', params)
}
export const list = (params) => {
    return instance.get('/goods', params)
}
