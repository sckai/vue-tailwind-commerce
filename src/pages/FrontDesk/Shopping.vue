<template>
  <div>
    <div class="mx-auto p-10">
      <div
        v-if="ShoppingListCount === 0"
        class="mx-auto w-64"
      >
        <div class="mx-auto w-32 mb-5">
          <img
            src="../../assets/img/icon_blank_cart.png"
            alt="找不到此圖片"
          >
        </div>

        <span class="ml-2">您的購物車中沒有商品</span>
        <div class="w-full mx-auto mt-5 ml-2">
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
      <div v-else>
        <ShoppingSteps :step="step" />
        <div
          :is="shoppingComponent"
          @StepComplete="StepComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingSteps from '../../components/FrontDesk/Shopping/ShoppingSteps'
import ShoppingList from '../../components/FrontDesk/Shopping/ShoppingList'
import PersonalInformation from '../../components/FrontDesk/Shopping/PersonalInformation'
import PayCheck from '../../components/FrontDesk/Shopping/PayCheck'
export default {
  components: {
    ShoppingSteps,
    ShoppingList,
    PersonalInformation,
    PayCheck
  },
  data () {
    return {
      shoppingComponent: 'ShoppingList',
      step: 1
    }
  },
  computed: {
    ShoppingListCount () {
      return this.$store.getters.cartList.length
    }
  },
  methods: {
    StepComplete (stepValue, personalInformation) {
      if (stepValue === 2) {
        this.shoppingComponent = 'PersonalInformation'
      } else if (stepValue === 3) {
        this.shoppingComponent = 'PayCheck'
        this.personalInformation = personalInformation
      } else if (stepValue === 4) {
        this.shoppingComponent = 'PayCheck'
      }
      this.step = stepValue
    }
  }
}
</script>
