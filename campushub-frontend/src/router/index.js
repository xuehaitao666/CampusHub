import { createRouter, createWebHistory } from 'vue-router'

// 路由组件懒加载
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const PublishRequest = () => import('../views/PublishRequest.vue')
const UserProfile = () => import('../views/UserProfile.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页 - CampusHub校园互助' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/publish',
    name: 'PublishRequest',
    component: PublishRequest,
    meta: { 
      title: '发布需求',
      requiresAuth: true // 添加自定义元数据，用于路由守卫鉴定是否需要登录
    }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { 
      title: '个人中心',
      requiresAuth: true
    }
  },
  // 捕获所有未定义路由并跳转至首页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局前置守卫：进行动态网页标题设置与基础的路由鉴权
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 简单的登录状态检查逻辑 (实际应结合 Pinia 状态管理或者 localStorage)
  const isAuthenticated = localStorage.getItem('token') !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 需要登录但未登录，重定向到登录页，并带上原本要访问的路径参数
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next() // 允许跳转
  }
})

export default router
