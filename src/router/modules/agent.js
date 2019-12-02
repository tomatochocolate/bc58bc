/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/agent',
        meta: {
            icon: 'ios-people',
            title: '代理商',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'agent',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "agent" */'@/views/agent')
            }
        ]
    }
]
