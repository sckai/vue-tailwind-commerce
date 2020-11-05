import Layout from '../../components/FrontDesk/Layout/Layout.vue'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/shopping',
    name: 'shopping',
    component: () => import('@/pages/FrontDesk/Shopping')
  }]
}]
