/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/goods',
        meta: {
            icon: 'md-list',
            title: '产品管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'goods.list',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "goods" */'@/views/goods')
            }
        ]
    }
]
