import Vue from 'vue'
import App from './App.vue'

//  引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// vue-router在main.js挂载vue实例
import router from '@/router'

// 导入样式, 不用写from
import '@/styles/index.less'

// 导入axios
// import axios from 'axios'
import axios from '@/api'

Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
