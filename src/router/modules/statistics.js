/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/statistics',
        meta: {
            icon: 'ios-analytics',
            title: '运营统计',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'statistics',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "statistics" */'@/views/statistics')
            }
        ]
    }
]
