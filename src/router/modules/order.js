/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'
export default [
    {
        path: '/order',
        meta: {
            icon: 'md-reorder',
            title: '订单管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'order',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "order" */'@/views/order')
            }
        ]
    }
]
