// 职责: 初始化路由对象, 提供main.ja使用
// 导入vue-router
import VueRouter from 'vue-router'

// 使用时需要导入vue的包
import Vue from 'vue'

// 导入Login
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'

import store from '@/store'
// import store from '../store'

// 使用
Vue.use(VueRouter)

// 初始化
const router = new VueRouter({
  routes: [{
    // 制定路由规则--配置对象
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'home',
    component: Home,
    children: [
      { path: '/', name: 'welcome', component: Welcome },
      { path: '/article', name: 'article', component: Article }
    ]
  },
  { path: '*', name: '404', component: NotFound }
  ]

})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // // 1. 判断是不是登录路由
  // if (to.path === '/login') return next()
  // // 2. 判断是否登录
  // if (!store.getUser().token) return next('/login')
  // // 3. 放行
  // next()
  // 精简版
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

// 导出
export default router
