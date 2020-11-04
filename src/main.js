import Vue from 'vue'
import store from '../store'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueMeta from 'vue-meta'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueSweetalert2 from 'vue-sweetalert2'
import '@/assets/css/tailwind.css'
import '@/assets/js/fontasome.js'

axios.defaults.baseURL = process.env.VUE_APP_URL

Vue.config.productionTip = false

// Vue.use(VueMeta);
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
Vue.use(VueSweetalert2)

// http request 攔截
axios.interceptors.request.use(
  function (config) {
    const token = window.sessionStorage.getItem('token')
    if (token !== null) {
      config.headers.Authorization = token
    }

    return config
  }, function (err) {
    return Promise.reject(err)
  }
)

// 驗證方法 在路由meta:{ requiresAuth: true}開啟驗證
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_URL}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
        // vm.$router.push('/');   //use router change page
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
