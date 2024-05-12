import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path:'/userRegister',
    name:'userRegister',
    component: () => import('../views/userRegister.vue')
  },
  {
    path:'/toone',
    name:'toone',
    component: () => import('../views/toone.vue'),
  },
  {
    path:'/',
    name:'admin',
    component: () => import('../views/adminlogin.vue'),
  },
  {
    path:'/adminmain',
    name:'adminmain',
    component: () => import('../views/admin'),
  },
]


const router = new VueRouter({
  routes
})

export default router
