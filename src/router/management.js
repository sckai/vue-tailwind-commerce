import Layout from '../components/Layout/Layout.vue'

export default [{
  path: '/layout',
  component: Layout,
  children: [{
    meta: { requiresAuth: true },
    path: 'product',
    name: 'product',
    component: () => import('@/pages/management/Product')
  }]
}, {
  path: '/layout',
  component: Layout,
  children: [{
    meta: { requiresAuth: true },
    path: 'order',
    name: 'order',
    component: () => import('@/pages/management/Order')
  }]
}, {
  path: '/layout',
  component: Layout,
  children: [{
    meta: { requiresAuth: true },
    path: 'coupon',
    name: 'coupon',
    component: () => import('@/pages/management/Coupon')
  }]
}]
