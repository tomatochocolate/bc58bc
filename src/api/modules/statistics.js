/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 21:53
 */
import instance from '@/api/http'

export const list = (params) => {
    return instance.get('/statistics', { params })
}
export const channel = () => {
    return instance.get('/channel')
}
export const adcost = (params) => {
    return instance.post('/statistics/adcost', params)
}
