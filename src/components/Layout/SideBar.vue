<template>
  <div
    class="fixed p-2 w-24 sm:w-48 lg:w-48 bg-gray-800 sidebar"
    :class="{'hidden w-0': !showSidebar}"
  >
    <div class="flex flex-col text-white">
      <div
        class="flex justify-srtart text-sm pl-6 mb-3 hover:text-gray-500"
        title="儀錶板"
        @click="orderlistActive('dashboard')"
      >
        <router-link
          to="/layout/dashboard"
          :class="{'text-gray-500': sidelistActive === 'dashboard'}"
        >
          <font-awesome-icon
            class="fa-fw mr-2"
            :icon="['fas', 'tachometer-alt']"
          />
          <span class="hidden sm:inline-block">儀錶板</span>
        </router-link>
      </div>
      <div class="flex justify-start pl-2 mb-2 text-xs text-gray-600 hidden sm:flex">
        管理員
      </div>
      <div
        class="flex justify-srtart text-sm pl-6 mb-3 hover:text-gray-500"
        title="產品列表"
        @click="orderlistActive('product')"
      >
        <router-link
          to="/layout/product"
          :class="{'text-gray-500': sidelistActive === 'product'}"
        >
          <font-awesome-icon
            class="fa-fw mr-2"
            :icon="['fas', 'store']"
          />
          <span class="hidden sm:inline-block">產品列表</span>
        </router-link>
      </div>
      <div
        class="flex justify-srtart text-sm pl-6 mb-3 hover:text-gray-500"
        title="訂單列表"
        @click="orderlistActive('order')"
      >
        <router-link
          to="/layout/order"
          :class="{'text-gray-500': sidelistActive === 'order'}"
        >
          <font-awesome-icon
            class="fa-fw mr-2"
            :icon="['fas', 'list-alt']"
          />
          <span class="hidden sm:inline-block">訂單列表</span>
        </router-link>
      </div>
      <div
        class="flex justify-srtart text-sm pl-6 mb-3 hover:text-gray-500"
        title="優惠卷"
        @click="orderlistActive('coupon')"
      >
        <router-link
          to="/layout/coupon"
          :class="{'text-gray-500': sidelistActive === 'coupon'}"
        >
          <font-awesome-icon
            class="fa-fw mr-2"
            :icon="['fas', 'ticket-alt']"
          />
          <span class="hidden sm:inline-block">優惠卷</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showSidebar: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      sidelistActive: ''
    }
  },
  mounted () {
    this.sidelistActive = this.$route.name
  },
  methods: {
    orderlistActive (listItem) {
      this.sidelistActive = listItem
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar{
    height: calc(100vh - 64px);
  }
</style>
