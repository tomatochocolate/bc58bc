/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 21:53
 */
import instance from '@/api/http'
import { dayjs } from '@/libs/utils'


/**
 * 登录
 * @param { Object } params
 * @param { String } params.username - 用户名
 * @param { String } params.password
 * @param { String } params.scene - 验证单元场景，需与前端配置参数中的scene一致: '01'
 * @param { String } params.token - 客户端验证成功得到的token
 * @returns { Promise }
 */
export const login = (params) => {
    return instance.post('/login', params)
}
/**
 * 注销登录
 */
export const logout = () => {
    return instance.get('/logout')
}

/**
 * 获取图像验证码
 * @returns { Object }
 */
export const captcha = () => {
    return instance.get(`/captcha?t=${dayjs().valueOf()}`)
}
