/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/message',
        meta: {
            icon: 'md-notifications',
            title: '消息推送',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'message',
                path: '',
                meta: {
                    menu: false
                },
                // component: () => import(/* webpackChunkName: "message" */'@/views/message')
                component: () => import(/* webpackChunkName: "other" */'@/views/other/develop')
            }
        ]
    }
]
