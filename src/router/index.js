import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from '@/components/register/register'
import change from '@/components/change/change'
import home from '@/components/home/home'
import distake from '@/components/distake/distake'
import { basePort } from 'portfinder'
import buy from '@/components/buy/buy.vue'
import order from '@/components/order/order'
import help from '@/components/help/help.vue'
import feedback from '@/components/feedback/feedback.vue'
import card from '@/components/card/card.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',
      // redirect: { name: 'home' } ,
      redirect:"/login",
      name:'index',
      component:login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        isLogin: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isLogin: false
      },
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        isLogin: false
      },
    },
    {
      path: '/change',
      name: 'change',
      component: change,
      meta: {
        isLogin: false
      },
    },
    {
      path: '/buy',
      name: 'buy',
      component: buy,
      meta: {
        isLogin: true
      },
    },
    {
      path: '/help',
      name: 'help',
      component: help,
      meta: {
        isLogin: true
      },
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta: {
        isLogin: true
      },
    },
    {
      path: '/card',
      name: 'card',
      component: card,
      meta: {
        isLogin: true
      },
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback,
      meta: {
        isLogin: true
      },
    },
    {
      path: '*',
      name: 'distake',
      component: distake,
      // redirect: { name: 'login' },
      // meta: {
      //   isLogin: true,  
      // },
    }
  ]
})
