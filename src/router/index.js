import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Book from '@/views/Book'
import Books from '@/views/Books'
import Index from '@/views/Index'
import Header from '@/components/Header'
import Statistics from '@/components/Statistics'
import Village from '@/views/Village'
import Agriculture from '@/views/Agriculture'
import ComputerScience from '@/views/ComputerScience'
import Economics from '@/views/Economics'
import Politics from '@/views/Politics'

// Personal
import Personal from '@/views/Personal'
import Profile from '@/views/personal/Profile'
import Settings from '@/views/personal/Settings'
// My record
import Myrecord from '@/views/Myrecord'
import Current from '@/views/myrecord/Current'
import History from '@/views/myrecord/History'

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
      path: '/village',
      components: {
        default: Village,
        header: Header,
      },
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'agriculture',
          component: Agriculture
        },
        {
          path: 'economics',
          component: Economics
        },
        {
          path: 'politics',
          component: Politics
        }
      ]      
    }, {
      path: '/login',
      name: 'login',
      component: Login,
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
          path: 'computer-science',
          component: ComputerScience
        },
        {
          path: 'economics',
          component: Economics
        },
        {
          path: 'politics',
          component: Politics
        }
      ]
    },{ 
      path: '/personal',
      redirect: '/personal/profile',
      components: {
        default: Personal,
        header: Header,
      },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        },{
          path: 'settings',
          name: 'settings',
          component: Settings
        },
      ]
    },{ 
      path: '/myrecord',
      redirect: '/myrecord/current',
      components: {
        default: Myrecord,
        header: Header,
      },
      children: [
        {
          path: 'current',
          name: 'current',
          component: Current
        },{
          path: 'history',
          name: 'history',
          component: History
        },
      ]
    }
  ]
})

export default router;