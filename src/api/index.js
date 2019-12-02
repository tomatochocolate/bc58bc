/**
 * 全局接口管理
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017-05-25 19:18
 */
import axios from 'axios/dist/axios'

import instance from './http'
import * as user from './modules/user'
import * as node from './modules/node'
import * as order from './modules/order'
import * as goods from './modules/goods'
import * as system from './modules/system'
import * as feedback from './modules/feedback'
import * as statistics from './modules/statistics'
import * as appVersion from './modules/app_version'

export {
    axios, instance,

    // modules
    user,
    node,
    order,
    goods,
    system,
    feedback,
    statistics,
    appVersion
}
