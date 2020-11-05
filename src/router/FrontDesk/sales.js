import Layout from '../../components/FrontDesk/Layout/Layout.vue'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/sales',
    name: 'sales',
    component: () => import('@/pages/FrontDesk/Sales')
  }]
}]
