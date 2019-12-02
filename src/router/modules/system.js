/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/system',
        meta: {
            icon: 'md-settings',
            title: '系统设置',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'system',
                path: '',
                meta: {
                    menu: false
                },
                // component: () => import(/* webpackChunkName: "system" */'@/views/system')
                component: () => import(/* webpackChunkName: "other" */'@/views/other/develop')
            }
        ]
    }
]
