<template>
  <div
    v-if="showMiniCart"
    class="minicartList absolute bg-white left-auto rounded-sm border-2 overflow-y-auto z-10"
  >
    <table class="table-auto m-3">
      <thead>
        <tr>
          <th class="px-4 py-2 text-xs border-b-2">
            商品名稱
          </th>
          <th class="px-4 py-2 text-xs border-b-2">
            數量
          </th>
          <th class="px-4 py-2 text-xs border-b-2">
            價格
          </th>
          <th class="px-4 py-2 text-xs border-b-2" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="cartItem in CartList"
          :key="cartItem.id"
        >
          <td
            class="px-4 pr-2 pl-5 text-xs text-left"
          >
            {{ cartItem.product.title }}
          </td>
          <td class="px-4 py-2 text-xs">
            {{ cartItem.product.num }}
          </td>
          <td class="px-4 py-2 text-xs">
            ${{ cartItem.final_total }}
          </td>
          <td class="px-4 py-2 text-xs">
            <font-awesome-icon
              class="fa-1x text-red-500 cursor-pointer"
              :icon="['fas', 'trash-alt']"
              @click="DelCartItem(cartItem)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-right my-4 mx-4">
      <a
        class="checkout border-2 rounded-sm bg-black hover:bg-gray-700 text-white"
      >前往結帳</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showMiniCart: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    CartList () {
      return this.$store.getters.cartList
    }
  },
  created () {
    this.$store.dispatch('UpdateCartList')
  },
  methods: {
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
.minicartList{
  font-family: "Verdana","新細明體",Geneva,Tahoma,sans-serif;
  min-width: 400px;
  height: 300px;
  width: 280px;
  top: 64px;
  right: 24px;

  & .checkout{
    padding: 8px 12px;
    width: 90px;
    height: 30px;
  }
}

@media (max-width:576px){
  .minicartList{
    min-width: 280px;
  }
}
</style>
