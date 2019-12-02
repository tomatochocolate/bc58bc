/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2018/09/04 09:48
 */
import { _ } from './storage'

const _get = _.get
// replace with enhanced version
_.get = (area, key, kid) => {
    let s = _get(area, key)

    if (s == null) {
        let parts = _.split(key)

        if (parts) {
            key = parts[0]
            kid = kid ? parts[1] + '.' + kid : parts[1]
            return _.get(area, parts[0], kid)
        }
    } else if (kid) {
        let val = _.parse(s)

        // eslint-disable-next-line
        val = eval(`val.${kid}`)
        s = _.stringify(val)
    }
    return s
}

// expose internals on the underscore to allow extensibility
_.split = (key) => {
    let dot = key.lastIndexOf('.')

    if (dot > 0) {
        var kid = key.substring(dot + 1, key.length)
        key = key.substring(0, dot)
        return [ key, kid ]
    }
}
