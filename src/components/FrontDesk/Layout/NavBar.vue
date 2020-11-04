<template>
  <div class="overflow-x-hidden">
    <div class="flex justify-between bg-black w-screen h-16 p-4">
      <div class="w-1/3 my-auto">
        <router-link :to="{ name: 'home' }">
          <img
            src="https://ld-wp.template-help.com/woostroid2/skins/cosmetics/wp-content/uploads/2018/12/logo.png"
            alt=""
          >
        </router-link>
      </div>
      <div class="w-1/3 my-auto font-bold tracking-wide text-white text-sm hidden md:block">
        <ul class="list-none">
          <li class="inline cursor-pointer mx-4 hover:text-gray-400">
            <router-link :to="{ name: 'productShop' }">
              <a>
                主題旅行
              </a>
            </router-link>
          </li>
          <li class="inline cursor-pointer mx-4 hover:text-gray-400">
            <router-link :to="{ name: 'about' }">
              <a>
                關於
              </a>
            </router-link>
          </li>
          <li class="inline cursor-pointer mx-4 hover:text-gray-400">
            <a>
              銷售和報價
            </a>
          </li>
          <li class="inline cursor-pointer mx-4 hover:text-gray-400">
            <a>
              聯絡我們
            </a>
          </li>
        </ul>
      </div>
      <div class="flex justify-end w-1/3 my-auto">
        <div class="mr-4">
          <div class="relative">
            <font-awesome-icon
              class="flex fa-2x text-white cursor-pointer"
              :icon="['fas', 'shopping-cart']"
              @click="ToggleMiniCart"
            />
            <span class="productCount absolute rounded-full leading-tight font-bold h-4 w-4 bg-red-600 text-white text-sm">{{ CartsNum }}</span>
          </div>
        </div>
        <font-awesome-icon
          class="fa-2x text-white cursor-pointer mb-1 hover:text-gray-400 mr-2 md:hidden"
          :icon="['fas', 'bars']"
          @click="ToggleDropDown"
        />
      </div>
      <MiniShoppingCartList :show-mini-cart="showMiniCart" />
    </div>
    <!-- drop down -->
    <nav
      v-if="showDropDown"
      class="flex items-center justify-between flex-wrap text-white bg-black p-6 md:hidden"
    >
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link :to="{ name: 'productShop' }">
            <a
              class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400"
            >
              主題旅行
            </a>
          </router-link>
          <router-link :to="{ name: 'about' }">
            <a
              class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400"
            >
              關於
            </a>
          </router-link>
          <a
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400"
          >
            銷售和報價
          </a>
          <a
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400"
          >
            聯絡我們
          </a>
        </div>
      </div>
    </nav>
    <!-- NavBar -->
  </div>
</template>

<script>
import MiniShoppingCartList from '../Shopping/MiniShoppingCartList'
export default {
  components: {
    MiniShoppingCartList
  },
  data () {
    return {
      showDropDown: false,
      showMiniCart: false,
      cartList: []
    }
  },
  computed: {
    CartsNum () {
      return this.$store.getters.cartsNum
    }
  },
  methods: {
    ToggleDropDown () {
      this.showDropDown = !this.showDropDown
    },
    ToggleMiniCart () {
      this.showMiniCart = !this.showMiniCart
    }
  }
}
</script>

<style lang="scss" scoped>
.productCount{
  top: -6px;
  right: -10px;
}
</style>
