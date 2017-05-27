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
import Economics from '@/views/Economics'
import Politics from '@/views/Politics'

Vue.use(Router)

function isLogin(to, from, next){

    if(true){
        next({
            path: 'login'
        });
    } else {
        next();
    }
}
export default new Router({
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
      path: '/books/:id', 
      component: Book,
    }, { 
      path: '/books', 
      component: Books,
    }
  ]
})
