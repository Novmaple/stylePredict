import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
// 引入组件
import './plugins/element.js'
import './plugins/echarts.js'
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://result.eolinker.com/iwvT4g78dfde82d24f1a538e8e5ff9d7b8c9fef930893b2?uri='
// 挂载axios
// 在别的组件中用 this.$http
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 挂载全局 echarts 
Vue.prototype.$echarts = window.echarts
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



