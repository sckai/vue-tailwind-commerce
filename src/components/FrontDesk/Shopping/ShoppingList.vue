<template>
  <div class="content mx-auto">
    <div
      class="content block lg:flex"
    >
      <div class="w-full lg:w-9/12">
        <tables
          :options="tableOptions"
          :columns="tableColumns"
          :data="ShoppingList"
        >
          <template
            slot="del"
            slot-scope="props"
          >
            <font-awesome-icon
              class="fa-1x text-red-500 cursor-pointer"
              :icon="['fas', 'trash-alt']"
              @click="DelCartItem(props.obj)"
            />
          </template> -->
          <template
            slot="img"
            slot-scope="props"
          >
            <img
              class="w-32 max-w-xs h-16"
              :src="props.obj.product.imageUrl"
              alt=""
            >
          </template>
          <template
            slot="title"
            slot-scope="props"
          >
            <div class="text-left text-gray-600">
              {{ props.obj.product.title }}
            </div>
          </template>
          <template
            slot="qty"
            slot-scope="props"
          >
            <div class="text-left text-gray-600">
              {{ props.obj.qty }}
            </div>
          </template>
          <template
            slot="price"
            slot-scope="props"
          >
            <div class="text-left text-gray-600">
              $ {{ props.obj.product.price }}
            </div>
          </template>
        </tables>
      </div>
      <div class="w-full lg:w-3/12 mt-5 lg:mt-0">
        <div class="w-full">
          <div class="flex justify-center items-center w-ful h-12 bg-black text-white rounded-sm">
            訂單摘要
          </div>
          <div class="p-5 border-2">
            <div class="my-2">
              商品總計
              <span class="text-red-500">$ {{ totalPrice }}</span>
              元
            </div>

            <div class="my-5">
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="price"
                  v-model="couponCode"
                  class="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
                  placeholder="輸入優惠碼"
                >
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <button
                    class="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-green-400 hover:text-green-500 sm:text-sm sm:leading-5"
                    @click="UseCoupon"
                  >
                    套用優惠卷
                  </button>
                </div>
              </div>
            </div>
            <div class="flex justify-between my-2 text-right">
              <span>結帳總金額</span>
              <span class="text-red-500">$ {{ discountPrice === 0 ? totalPrice : discountPrice }}元</span>
            </div>

            <button
              class="h-full mt-5 px-3 py-2 bg-black rounded-sm text-white hover:text-gray-300 sm:text-sm sm:leading-5"
              @click="StepComplete"
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tables from '../../Universal/table/Tables'
export default {
  components: {
    Tables
  },
  data () {
    return {
      tableColumns: ['del', 'img', 'title', 'qty', 'price'],
      tableOptions: {
        headings: { del: '刪除', img: '圖片', title: '商品名稱', qty: '數量', price: '單價' }
      },
      couponCode: '',
      totalPrice: 0,
      discountPrice: 0
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
      this.$emit('StepComplete', 2)
    },
    CountPrice () {
      this.totalPrice = 0
      this.$store.getters.cartList.forEach(shoppingItem => {
        this.totalPrice = Math.ceil(shoppingItem.final_total) + this.totalPrice
      })
    },
    // API
    UseCoupon () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const sendData = {
        code: this.couponCode
      }
      this.$http.post(api, { data: sendData }).then((response) => {
        if (response.data.success) {
          this.discountPrice = response.data.data.final_total
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      })
    },
    DelCartItem (cartItem) {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/cart/${cartItem.id}`
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('UpdateCartList')
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  max-width: 1280px;
}
</style>
