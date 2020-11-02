<template>
  <div class="overflow-x-hidden">
    <div class="flex justify-between bg-black w-screen h-16 p-4">
      <div class="w-1/3 my-auto">
        <img
          src="https://ld-wp.template-help.com/woostroid2/skins/cosmetics/wp-content/uploads/2018/12/logo.png"
          alt=""
        >
      </div>
      <div class="w-1/3 my-auto font-bold tracking-wide text-white text-sm hidden md:block">
        <ul class="list-none">
          <li class="inline cursor-pointer mx-4 hover:text-gray-400">
            <a href="#">
              館藏
            </a>
          </li>
          <li class="inline cursor-pointer mx-4 hover:text-gray-400">
            <a href="#">
              關於
            </a>
          </li>
          <li class="inline cursor-pointer mx-4 hover:text-gray-400">
            <a href="#">
              銷售和報價
            </a>
          </li>
          <li class="inline cursor-pointer mx-4 hover:text-gray-400">
            <a href="#">
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
            <span class="productCount absolute rounded-full leading-tight font-bold h-4 w-4 bg-red-600 text-white text-sm">{{ cartsNum }}</span>
          </div>
        </div>
        <font-awesome-icon
          class="fa-2x text-white cursor-pointer mb-1 hover:text-gray-400 md:hidden"
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
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400"
          >
            館藏
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400"
          >
            關於
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400"
          >
            銷售和報價
          </a>
          <a
            href="#responsive-header"
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
      cartsNum: 0,
      showMiniCart: false
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
