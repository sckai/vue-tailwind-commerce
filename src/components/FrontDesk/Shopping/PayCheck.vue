<template>
  <div class="content mx-auto">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    商品名稱
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    數量
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    單價
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="shoppingItem in ShoppingList"
                  :key="shoppingItem.id"
                >
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="text-sm leading-5 text-gray-900">
                      {{ shoppingItem.product.title }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {{ shoppingItem.qty }} / 人
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    ${{ shoppingItem.product.price }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="py-3 border-t-2 text-right pr-5 text-green-400">
              總計 ${{ discountPrice }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 text-right">
      付款狀態:
      <span
        v-if="payStatus"
        class="text-green-500"
      >已付款</span>
      <span
        v-else
        class="text-red-500"
      >未付款</span>
    </div>
    <button
      v-if="!payStatus"
      class="h-full mt-5 px-3 py-2 bg-red-500 rounded-sm text-white hover:text-gray-200 sm:text-sm sm:leading-5"
      @click="CreatOrder"
    >
      <font-awesome-icon
        v-if="isPayLoding"
        class="mr-2 fa-pulse"
        :icon="['fas', 'spinner']"
      />
      確認付款
    </button>
    <div
      v-else
      class="w-full mx-auto mt-5 ml-2"
    >
      <router-link
        :to="{ name: 'productShop'}"
      >
        <button
          class="my-auto bg-black py-3 rounded-sm hover:bg-gray-600 p-2"
        >
          <span class="text-white">
            去購物
          </span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      discountPrice: 0,
      isPayLoding: false,
      payStatus: false,
      orderId: ''
    }
  },
  computed: {
    ShoppingList () {
      this.CountPrice()
      return this.$store.getters.cartList
    }
  },
  methods: {
    StepComplete () {
      this.$emit('StepComplete', 4)
    },
    CountPrice () {
      this.$store.getters.cartList.forEach(shoppingItem => {
        this.discountPrice += Math.ceil(shoppingItem.final_total)
      })
    },
    // API
    CreatOrder () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/order`
      const data = {
        user: {
          name: this.$store.getters.personalInformation.name,
          email: this.$store.getters.personalInformation.email,
          tel: this.$store.getters.personalInformation.phone,
          address: this.$store.getters.personalInformation.address
        },
        message: this.$store.getters.personalInformation.message
      }
      this.isPayLoding = true
      this.$http.post(api, { data }).then((response) => {
        if (response.data.success) {
          this.orderId = response.data.orderId
          this.PayCheck()
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.isPayLoding = false
        this.$swal('網路異常', error, 'error')
        console.log(error)
      })
    },
    PayCheck () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/pay/${this.orderId}`
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.payStatus = true
          this.StepComplete()
          this.$store.dispatch('UpdateCartList')
          this.$store.dispatch('UpdatePersonalInformation', {})
          this.$swal('', response.data.message, 'success')
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        this.isPayLoding = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  max-width: 1024px;
}
</style>
