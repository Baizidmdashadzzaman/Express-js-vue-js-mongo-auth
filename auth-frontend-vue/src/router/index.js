import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  { path: '/',        name: 'Login',    component: Login },
  { path: '/signup',  name: 'Signup',   component: Signup },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Optional: simple front-guard (relies on cookie presence)
router.beforeEach((to, from, next) => {
  const isAuthenticated = document.cookie.includes('token=')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
