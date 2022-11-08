import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  // 默认加载路由为Index，无登录，就不需要登录界面
  {
    path: '/',
    // 后期有了Login可以改成Login
    component: Index
  },{
    path: '/Index',
    component: Index
  }
]

const router = new VueRouter({
  routes
})

export default router
