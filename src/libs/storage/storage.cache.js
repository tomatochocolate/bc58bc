/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017/07/20 00:00
 */
import { _ } from './storage'

let prefix = 'exp@'
let suffix = ';'
let parse = _.parse
let _get = _.get
let _set = _.set

_.parse = (string) => {
    if (string && string.indexOf(prefix) === 0) {
        string = string.substring(string.indexOf(suffix) + 1)
    }
    return parse(string)
}
_.expires = (string) => {
    if (string && string.indexOf(prefix) === 0) {
        return parseInt(string.substring(prefix.length, string.indexOf(suffix)), 10)
    }
    return false
}
// if min, return min->date, else date->min
_.when = (min) => {
    let now = Math.floor((new Date().getTime()) / 1000)

    return min ? new Date((now + min) * 1000) : now
}
_.cache = (area, key) => {
    let item = _get(area, key)
    let min = _.expires(item)

    if (min && _.when() >= min) {
        return area.removeItem(key)
    }
    return item
}
_.get = (area, key) => {
    let item = _.cache(area, key)

    return item === undefined ? null : item
}
_.set = (area, key, string, min) => {
    try {
        if (min) {
            string = prefix + (_.when() + min) + suffix + string
        }
        _set(area, key, string)
    } catch (error) {
        if (error.name === 'QUOTA_EXCEEDED_ERR' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            let changed = false

            for (let i = 0, m = area.length; i < m; i++) {
                if (_.cache(area, key) === undefined) {
                    changed = true
                }
            }
            if (changed) {
                // eslint-disable-next-line
                return _.set.apply(this, arguments)
            }
        }
        throw error
    }
}
