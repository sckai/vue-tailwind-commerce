import Layout from '../../components/FrontDesk/Layout/Layout.vue'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/about',
    name: 'about',
    component: () => import('@/pages/FrontDesk/About')
  }]
}]
