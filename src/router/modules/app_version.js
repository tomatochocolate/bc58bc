/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/app_version',
        meta: {
            icon: 'ios-appstore',
            title: 'App版本管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'app_version',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "app_version" */'@/views/app_version')
            }
        ]
    }
]
