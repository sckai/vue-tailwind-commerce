import Layout from '../components/Layout/Layout.vue'

export default [{
  path: '/layout',
  component: Layout,
  meta: { requiresAuth: true },
  children: [{
    meta: { requiresAuth: true },
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/pages/Dashboard')
  }]
}]
