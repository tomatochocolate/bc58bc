// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import base from './public/base.css'
import axios from 'axios'
import login from './components/login/login.vue'
import store from './store/store'
import $ from 'jquery'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css' 
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

// Vue.use(iView)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    created: function () {
        // `this` 指向 vm 实例
        var targetDPI, version;
        var ua = navigator.userAgent.toLowerCase();
        window.deprecatedDeviceIsAndroid = (ua.search('android') > -1);
        var viewport = 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no';
        if (window.deprecatedDeviceIsAndroid) {
            targetDPI = 160;
            if (ua.match(/gt-p10\d0|sgh-i987|sph-p100|sgh-t849|sch-i800|shw-m180s|sc-01c/)) targetDPI = 'device-dpi';
            viewport += ', target-densityDpi=' + targetDPI + ', width=device-width';
        } else if (ua.match(/iphone|ipod/)) {
            version = ua.match(/cpu (?:\w+ )?os (\d+)_?(\d+)?/);
            if (version && (version[1] > 7 || (version[1] == 7 && version[2] && version[2] > 0))) {
                viewport += ', minimal-ui';
            }
        }
        document.write('<meta name="viewport" content="' + viewport + '" />');
    }
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (JSON.parse(localStorage.getItem("islogin"))) {  
//           next();
//       }
//       else {
//           next({
//               path: '/login',
//           })
//       }
//   }
//   else {
//       next();

//   }

// })

router.beforeEach((to, from, next) => {

    //获取用户登录成功后储存的登录标志
    let getFlag = localStorage.getItem("Flag");

    //如果登录标志存在且为isLogin，即用户已登录
    if (getFlag === "isLogin") {

        //设置vuex登录状态为已登录
        store.state.isLogin = true
        next()

        //如果已登录，还想想进入登录注册界面，则定向回首页
        if (!to.meta.isLogin) {
            //iViewUi友好提示
            alert('请先退出登录')
            next({
                path: '/home'
            })
        }

        //如果登录标志不存在，即未登录
    } else {

        //用户想进入需要登录的页面，则定向回登录界面
        if (to.meta.isLogin) {
            next({
                path: '/login',
            })
            //iViewUi友好提示
            // iView.Message.info('请先登录')
            //用户进入无需登录的界面，则跳转继续
        } else {
            next()
        }

    }

});

