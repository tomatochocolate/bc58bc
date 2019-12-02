/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/feedback',
        meta: {
            icon: 'md-notifications',
            title: '反馈管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'comments',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "feedback" */'@/views/feedback')
            }
        ]
    }
]
