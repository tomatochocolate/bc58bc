/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017/07/20 00:03
 */
import { _ } from './storage'

// expose internals on the underscore to allow extensibility
_.dot = (key) => {
    // eslint-disable-next-line
    let keys = !key ? this.keys() : Array.isArray(key) ? key : Array.prototype.slice.call(arguments)
    let target = this

    keys.forEach(key => {
        _.dot.define(target, key)
    })
    return this
}
_.dot.define = (target, key) => {
    if (!(key in target)) {
        Object.defineProperty(target, key, {
            enumerable: true,
            get () {
                return this.get(key)
            },
            set (value) {
                this.set(key, value)
            }
        })
    }
}
// add function(s) to the store interface
_.fn('dot', _.dot)
