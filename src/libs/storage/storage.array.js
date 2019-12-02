/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017/07/20 00:07
 */
import { _ } from './storage'

_.array = (fnName, key, args) => {
    let value = this.get(key, [])
    let array = Array.isArray(value) ? value : [ value ]
    let ret = array[fnName].apply(array, args)

    if (array.length > 0) {
        this.set(key, array.length > 1 ? array : array[0])
    } else {
        this.remove(key)
    }
    return ret
}
_.arrayFn = (fnName) => {
    return key => {
        // eslint-disable-next-line
        return this.array(fnName, key, arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null)
    }
}
// add function(s) to the store interface
_.fn('array', _.array)
Object.getOwnPropertyNames(Array.prototype).forEach(name => {
    // add Array interface functions w/o existing conflicts
    if (typeof Array.prototype[name] === 'function') {
        if (!(name in _.storeAPI)) {
            _.fn(name, _.array[name] = _.arrayFn(name))
        }
    }
})
