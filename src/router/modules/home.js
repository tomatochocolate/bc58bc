/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'
import Home from '@/views/home'

export default [
    {
        path: '',
        meta: {
            icon: 'md-home',
            title: '控制台',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'home',
                path: '',
                meta: {
                    menu: false
                },
                component: Home
            }
        ]
    }
]
