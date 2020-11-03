import Layout from '../../components/FrontDesk/Layout/Layout.vue'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: '/productShop',
    name: 'productShop',
    component: () => import('@/pages/FrontDesk/ProductShop')
  }]
}]
