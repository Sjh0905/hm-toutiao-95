// 职责: 初始化路由对象, 提供main.ja使用
// 导入vue-router
import VueRouter from 'vue-router'

// 使用时需要导入vue的包
import Vue from 'vue'

// 使用
Vue.use(VueRouter)

// 初始化
const router = new VueRouter({
  routes: []
})

// 导出
export default router
