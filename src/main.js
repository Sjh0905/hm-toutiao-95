import Vue from 'vue'
import App from './App.vue'

//  引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// vue-router在main.js挂载vue实例
import router from '@/router'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
