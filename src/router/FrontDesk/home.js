import Layout from '../../components/FrontDesk/Layout/Layout.vue'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/',
    name: 'home',
    component: () => import('@/pages/FrontDesk/home')
  }]
}]
