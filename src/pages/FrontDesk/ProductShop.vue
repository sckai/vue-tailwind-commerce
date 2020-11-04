<template>
  <div class="prodcut-content w-full xl:w-23/24 mx-auto p-5">
    <div class="flex justify-between px-5">
      <div class="relative inline-block text-left">
        <div class="flex">
          <span class="rounded-md shadow-sm">
            <button
              id="options-menu"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
              @click="ToggleCategoryMenu"
            >
              <!-- @blur="CategoryMenuBlur" -->
              Filter
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </span>
          <span class="flex items-center ml-3 text-gray-500">{{ selectCateory }}</span>
        </div>

        <div
          v-show="showCategoryDropdown"
          class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg z-20"
        >
          <div class="rounded-md bg-white shadow-xs">
            <div
              class="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                class="block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                @click.prevent="ToggleCateory('')"
              >清空</a>
              <a
                v-for="categoryItem in categoryArry"
                :key="categoryItem"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                @click.prevent="ToggleCateory(categoryItem)"
              >{{ categoryItem }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-auto">
        Showing {{ currentCountRange }} of {{ productTotal }} results
      </div>
    </div>
    <div class="flex flex-wrap p-3 z-10">
      <div
        v-for="productItem in productFilter"
        :key="productItem.id"
        class="w-full sm:w-6/12 md:w-3/12 p-2"
      >
        <div class="card-style justify-between pb-5 border-b-2 border-gray-300">
          <div class="overflow-hidden">
            <img
              class="w-full h-32 transition duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-110"
              :src="productItem.imageUrl"
              alt=""
            >
          </div>
          <div class="text-center text-gray-500">
            {{ productItem.category }}
          </div>
          <div class="text-center">
            {{ productItem.title }}
          </div>
          <div
            class="text-center truncate text-gray-500"
            :title="productItem.description"
          >
            {{ productItem.description }}
          </div>
          <div class="flex flex-col xl:flex-row justify-between text-center">
            <s>原價: ${{ productItem.origin_price }}</s>
            <div class="text-red-500">
              售價: ${{ productItem.price }}
            </div>
          </div>
          <div class="flex flex-col mt-3">
            <ValidationObserver
              ref="form"
              v-slot="{ handleSubmit }"
            >
              <div class="mb-1">
                <label
                  :for="productItem.id"
                  class="block text-left text-sm leading-5 font-medium text-gray-700"
                >數量:</label>
                <ValidationProvider
                  v-slot="{ failed, errors }"
                  rules="required|numeric"
                >
                  <div class="mt-1 relative rounded-md border-2 shadow-sm">
                    <input
                      :id="productItem.id"
                      v-model="productItem.quantity"
                      class="form-input w-full px-4 sm:text-sm sm:leading-5"
                      placeholder="輸入數量"
                    >
                  </div>
                  <span class="text-red-300 text-xs">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <button
                class="bg-black hover:bg-gray-700 text-white font-bold mt-2 py-2 px-4 rounded"
                @click="handleSubmit(AddToCart(productItem))"
              >
                <font-awesome-icon
                  v-show="productItem.isAddToCartLoding"
                  class="mr-2 fa-pulse"
                  :icon="['fas', 'spinner']"
                />
                加入購物車
              </button>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <Pagination
        :total-page="currentPageTotal"
        :current-page="currentPage"
        @clickPage="ClickPage"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '../../components/Universal/Pagination'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, numeric } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '不可為空'
})
extend('numeric', {
  ...numeric,
  message: '僅限輸入數字'
})
export default {
  components: {
    Pagination,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      productListAll: [],
      productFilter: [],
      categoryArry: [],
      showCategoryDropdown: false,
      productTotal: 0,
      selectCateory: '',
      currentCountRange: '1-8',
      showCount: 8,
      currentPage: 1,
      currentPageTotal: 1
    }
  },
  created () {
    if (Object.keys(this.$route.params).length !== 0) {
      this.selectCateory = this.$route.params.category
    }
    this.GetProductAll()
  },
  methods: {
    ProductCategoryFilter () {
      this.productFilter = this.productListAll.filter(productItem => {
        if (this.selectCateory === '') {
          return productItem
        } else {
          if (this.selectCateory === productItem.category) {
            return productItem
          }
        }
      })
    },
    PaginationComputed () {
      this.productTotal = this.productFilter.length
      this.currentPageTotal = Math.ceil(this.productFilter.length / this.showCount)
      if (this.currentPageTotal === this.currentPage) {
        let startCount = this.productTotal - ((this.currentPageTotal * this.showCount) - this.productTotal) + 1
        if (startCount < 1) {
          startCount = 1
        }
        this.currentCountRange = `${startCount}-${this.productTotal}`
      } else {
        let startCount = (this.currentPage * this.showCount) - (this.showCount - 1)
        if (startCount < 1) {
          startCount = 1
        }
        this.currentCountRange = `${startCount}-${this.currentPage * this.showCount}`
      }
    },
    GetNoRepeatCategory () {
      const categoryAll = []
      this.productListAll.forEach(productItem => {
        categoryAll.push(productItem.category)
      })
      this.categoryArry = Array.from(new Set(categoryAll))
    },
    GetRangeProduct () {
      this.productFilter = this.productFilter.filter((productItem, productIndex) => {
        if ((this.currentPage * this.showCount) >= (productIndex + 1) && ((this.currentPage * this.showCount) - (this.showCount - 1)) <= (productIndex + 1)) {
          return productItem
        }
      })
    },
    // Event
    ClickPage (page) {
      this.currentPage = page
      this.ProductCategoryFilter()
      this.PaginationComputed()
      this.GetNoRepeatCategory()
      this.GetRangeProduct()
    },
    CategoryMenuBlur () {
      this.showCategoryDropdown = false
    },
    ToggleCategoryMenu () {
      this.currentPage = 1
      this.showCategoryDropdown = !this.showCategoryDropdown
    },
    ToggleCateory (cateory) {
      this.selectCateory = cateory
      this.showCategoryDropdown = false
      this.ProductCategoryFilter()
      this.PaginationComputed()
      this.GetNoRepeatCategory()
      this.GetRangeProduct()
    },
    // API
    GetProductAll () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/products/all`
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.productListAll = response.data.products.map(productsItem => {
            productsItem.quantity = 1
            productsItem.isAddToCartLoding = false
            return productsItem
          })
          this.ProductCategoryFilter()
          this.PaginationComputed()
          this.GetNoRepeatCategory()
          this.GetRangeProduct()
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        // this.isPageLoading = false
      })
    },
    AddToCart (obj) {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/cart`
      const sendData = {
        product_id: obj.id,
        qty: obj.quantity
      }
      obj.isAddToCartLoding = true
      this.$http.post(api, { data: sendData }).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('UpdateCartList')
          this.$swal('', response.data.message, 'success')
          obj.quantity = 1
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        obj.isAddToCartLoding = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.prodcut-content{
  max-width: 1280px;
  min-width: 300;
}
.card-style{
  min-height: 380px;
}
</style>
