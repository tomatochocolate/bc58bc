/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 23:50
 */
import numeral from './numeral'
import formatDate from './format-date'
import bytesToSize from './bytesToSize'

const filters = {
    numeral,
    formatDate,
    bytesToSize
}
const install = (Vue, opts = {}) => {
    if (install.installed) return

    Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
}

export { numeral, formatDate, bytesToSize }
export default install
