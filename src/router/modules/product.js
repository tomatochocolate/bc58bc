/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/product',
        meta: {
            icon: 'md-list',
            title: '产品管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'product.list',
                path: '',
                meta: {
                    menu: false
                },
                // component: () => import(/* webpackChunkName: "product" */'@/views/product')
                component: () => import(/* webpackChunkName: "other" */'@/views/other/develop')
            }
        ]
    }
]
