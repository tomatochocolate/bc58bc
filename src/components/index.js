/**
 * install
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/17 10:12
 */
import Page from './page'

const components = {
    Page
}
const install = (Vue, opts = {}) => {
    if (install.installed) return

    Object.keys(components).forEach(key => Vue.component(key, components[key]))
}

export {
    Page
}
export default install
