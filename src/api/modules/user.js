/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 21:53
 */
import instance from '@/api/http'


/**
 * 查询所有用户
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.get('/users', { params })
}
/**
 * 查询所有用户远程信息
 * @returns { Promise }
 */
export const query = (params) => {
    return instance.get('/users/query', { params })
}

/**
 * 新建用户
 * @returns { Promise }
 */
export const store = (params) => {
    return instance.post('/users', params)
}
