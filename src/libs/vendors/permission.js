/**
 * 权限验证
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/02/22 09:26
 */
import { isString } from '@/libs/utils'

// eslint-disable-next-line
function VuePermission () {
    this.reset()
}
VuePermission.prototype.hasPermission = function (permission) {
    if (this.god) {
        return true
    }
    return this.permissions.hasOwnProperty(permission)
}
VuePermission.prototype.reset = function () {
    this.permissions = {}
    this.god = false
}
VuePermission.prototype.authorize = function (permissions) {
    // eslint-disable-next-line
    if (!!permissions) {
        for (let key in permissions) {
            if (permissions.hasOwnProperty(key) && !!permissions[key]) {
                this.permissions[key] = permissions[key]
            }
        }
    }
}

const permissionIns = new VuePermission()
export default {
    install (Vue) {
        Vue.permission = permissionIns
        Vue.prototype.$permission = permissionIns
        Vue.directive('permission', (el, binding) => {
            if (isString(binding.expression)) {
                let expression = binding.expression
                // eslint-disable-next-line
                if (expression.length > 1 && expression.charAt(0) === "'" && expression.charAt(expression.length - 1) === "'") {
                    expression = expression.substr(1, expression.length - 2)
                }
                if (!permissionIns.hasPermission(expression)) {
                    el.style.display = 'none'
                }
            }
        })
    }
}
