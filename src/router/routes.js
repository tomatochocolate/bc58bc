/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/17 22:17
 */
import home from './modules/home'
import user from './modules/user'
import node from './modules/node'
import agent from './modules/agent'
import goods from './modules/goods'
import order from './modules/order'
import system from './modules/system'
import comments from './modules/comments'
import appVersion from './modules/app_version'
import statistics from './modules/statistics'

export default [
    ...home,
    ...user,
    ...node,
    ...agent,
    ...goods,
    ...order,
    ...comments,
    ...appVersion,
    ...statistics,
    ...system
]
