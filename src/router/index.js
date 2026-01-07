import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Collect from '../views/Collect.vue'
import Mine from '../views/Mine.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue' // 新增：导入注册页
// 新增：懒加载详情页组件（也可以直接 import）
const MenuDetail = () => import('../views/MenuDetail.vue')

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login }, // 登录页
  { path: '/register', component: Register }, // 注册页（新增）
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  { path: '/menu-detail/:id', component: MenuDetail }, // 新增：菜品详情路由
  { path: '/collect', component: Collect },
  { path: '/mine', component: Mine },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局路由守卫：校验登录态（允许登录页和注册页公开访问）
router.beforeEach((to, from, next) => {
  // 无需登录的页面（如登录页和注册页）直接放行
  if (to.path === '/login' || to.path === '/register') {
    next()
    return
  }

  // 读取登录态
  const isLogin = localStorage.getItem('isLogin') === 'true'
  
  // 未登录 → 跳转登录页
  if (!isLogin) {
    next('/login')
  } else {
    // 已登录 → 放行
    next()
  }
})

export default router