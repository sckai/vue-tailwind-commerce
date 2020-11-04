import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

// FrontDesk
import homeRouter from './FrontDesk/home'
import productShopRouter from './FrontDesk/productShop'
import aboutRouter from './FrontDesk/about'

// Backstage
import login from '../pages/Backstage/Login.vue'
import dashboardsRoutes from './Backstage/dashboard'
import managementRoutes from './Backstage/management'

// import NotFound from '../pages/NotFound.vue'

Vue.use(Router)
Vue.use(Meta)

const ROUTES = [
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
  .concat(dashboardsRoutes)
  .concat(managementRoutes)
  .concat(homeRouter)
  .concat(productShopRouter)
  .concat(aboutRouter)

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
