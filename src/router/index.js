import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import login from '../pages/Backstage/Login.vue'
// import NotFound from '../pages/NotFound.vue'

import dashboardsRoutes from './Backstage/dashboard'
import managementRoutes from './Backstage/management'

Vue.use(Router)
Vue.use(Meta)

const ROUTES = [
  // Default route
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
  .concat(dashboardsRoutes)
  .concat(managementRoutes)

ROUTES.push({
  path: '/',
  meta: {
    title: '用户管理'
  },
  redirect: '/login'
})

// 404 Not Found page
// ROUTES.push({
//   path: '*',
//   component: NotFound
// })

ROUTES.push({
  path: '*',
  redirect: '/login'
})

const router = new Router({
  base: '/',
  mode: 'history',
  routes: ROUTES
})

export default router
