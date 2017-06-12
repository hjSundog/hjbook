import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Book from '@/views/Book'
import Books from '@/views/Books'
import Index from '@/views/Index'
import Header from '@/components/Header'
import Statistics from '@/components/Statistics'
import Books_Category from '@/views/Books_Category'

// Personal
import Personal from '@/views/Personal'
import Profile from '@/views/personal/Profile'
import Settings from '@/views/personal/Settings'
// My record
import Myrecord from '@/views/Myrecord'
import Current from '@/views/myrecord/Current'
import History from '@/views/myrecord/History'

import store from '../vuex/store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      components: {
        default: Index,
        header: Header,
        statistics: Statistics,
      }
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      //beforeEnter: isLogin,
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup,
      //beforeEnter: isLogin,
    }, { 
      path: '/book/:id', 
      component: Book,
    }, { 
      path: '/books', 
      components: {
        default: Books,
        header: Header,
      },
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: ':category',
          component: Books_Category
        },
      ]
    },{ 
      path: '/personal',
      redirect: '/personal/profile',
      components: {
        default: Personal,
        header: Header,
      },
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: Profile,
          meta: {
            requireAuth: true,
          },
        },{
          path: 'settings',
          name: 'settings',
          component: Settings,
          meta: {
            requireAuth: true,
          },
        },
      ]
    },{ 
      path: '/myrecord',
      redirect: '/myrecord/current',
      components: {
        default: Myrecord,
        header: Header,
      },
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: 'current',
          name: 'current',
          component: Current,
          meta: {
            requireAuth: true,
          },
        },{
          path: 'history',
          name: 'history',
          component: History,
          meta: {
            requireAuth: true,
          },
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
    console.log(to.meta.requireAuth)
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.user.userInfo.user_id) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
export default router;