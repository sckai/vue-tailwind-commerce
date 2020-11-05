import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
    cartsNum: 0,
    personalInformation: {}
  },
  actions: {
    UpdateCartList (context, data) {
      axios.get(`${process.env.VUE_APP_CUSTOMPATH}/cart`).then((response) => {
        if (response.data.success) {
          context.commit('UPDATECARTLIST', response.data.data.carts)
          context.commit('UPDATECARTSNUM', response.data.data.carts.length)
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      })
    },
    UpdatePersonalInformation (context, data) {
      context.commit('UPDATEPERSONALINFORMATION', data)
    }
  },
  mutations: {
    UPDATECARTLIST (state, data) {
      state.cartList = data
    },
    UPDATECARTSNUM (state, num) {
      state.cartsNum = num
    },
    UPDATEPERSONALINFORMATION (state, data) {
      state.personalInformation = data
    }
  },
  getters: {
    cartList: state => state.cartList,
    cartsNum: state => state.cartsNum,
    personalInformation: state => state.personalInformation
  }
})
