<template>
  <div :class="{'hidden': !showModal}">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" />&#8203;
        <ValidationObserver
          ref="form"
          v-slot="{ handleSubmit }"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-screen sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    id="modal-headline"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    {{ title }}
                  </h3>
                </div>
              </div>
            </div>
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex flex-wrap -mb-4">
                <div class="w-screen px-2">
                  <div
                    class="px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    聯絡人資訊
                  </div>
                  <div class="flex flex-wrap mb-3">
                    <div class="w-1/2 px-2">
                      <!-- 名稱 -->
                      <label
                        for="name"
                      >名稱</label>
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        rules="required"
                      >
                        <input
                          id="name"
                          v-model="tempOrder.user.name"
                          type="text"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="請輸入名稱"
                        >
                        <span class="text-red-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="w-1/2 px-2">
                      <!-- 電話 -->
                      <label
                        for="tel"
                      >電話</label>
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        rules="required"
                      >
                        <input
                          id="tel"
                          v-model="tempOrder.user.tel"
                          type="text"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="請輸入電話"
                        >
                        <span class="text-red-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="flex flex-wrap mb-3">
                    <div class="w-1/2 px-2">
                      <!-- 電子郵件 -->
                      <label
                        for="email"
                      >電子郵件</label>
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        rules="required|email"
                      >
                        <input
                          id="email"
                          v-model="tempOrder.user.email"
                          type="text"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="請輸入電子郵件"
                        >
                        <span class="text-red-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="w-1/2 px-2">
                      <!-- 地址 -->
                      <label
                        for="address"
                      >地址</label>
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        rules="required"
                      >
                        <input
                          id="address"
                          v-model="tempOrder.user.address"
                          type="text"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="請輸入地址"
                        >
                        <span class="text-red-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div
                    class="px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    購買項目
                  </div>
                  <div class="mb-3">
                    <div
                      v-for="productItem in GetProdcutContent(tempOrder.products)"
                      :key="productItem"
                    >
                      <span class="mx-2">
                        {{ tempOrder.products[productItem].product.title }}
                      </span>
                      <span class="mx-2">
                        {{ tempOrder.products[productItem].product.num }} /
                        <span class="">
                          {{ tempOrder.products[productItem].product.unit }}
                        </span>
                      </span>
                      <span class="mx-2 text-red-500">
                        ${{ tempOrder.products[productItem].product.price }}
                      </span>
                    </div>
                  </div>
                  <div class="flex justify-between mb-3">
                    <div>
                      應付金額
                      <span :class="{'text-red-500': !tempOrder.is_paid, 'text-green-500': tempOrder.is_paid}">
                        ${{ tempOrder.total }}
                      </span>
                    </div>
                    <div>
                      <label
                        class="inline-flex items-center"
                        for="isPaid"
                      >
                        <input
                          id="isPaid"
                          v-model="tempOrder.is_paid"
                          type="checkbox"
                          class="form-checkbox"
                          checked
                        >
                        <span class="ml-2">是否付款</span>
                      </label>
                      <!-- <span class="ml-3"> -->
                      <span
                        v-if="tempOrder.is_paid"
                        class="text-green-500 ml-2"
                      >
                        已付款
                      </span>
                      <span
                        v-else
                        class="text-red-500 ml-2"
                      >
                        未付款
                      </span>
                      <!-- </span> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span
                class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto"
              >
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click.prevent="handleSubmit(EditOrder)"
                >
                  <div>
                    <font-awesome-icon
                      v-if="isEditLoding"
                      class="mr-2 fa-pulse"
                      :icon="['fas', 'spinner']"
                    />
                    編輯
                  </div>
                </button>
              </span>
              <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click="CancelBtn"
                >
                  取消
                </button>
              </span>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, numeric, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '不可為空'
})
extend('numeric', {
  ...numeric,
  message: '僅限輸入數字'
})
extend('email', {
  ...email,
  message: '僅限輸入email格式'
})
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    showModal: {
      type: Boolean,
      default: false
    },
    dataObj: {
      type: Object,
      default: () => {
        return {
          id: '',
          products: {},
          user: {
            address: '',
            email: '',
            name: '',
            tel: ''
          },
          total: 0
        }
      }
    }
  },
  data () {
    return {
      tempOrder: {
        id: '',
        products: {},
        user: {
          address: '',
          email: '',
          name: '',
          tel: ''
        },
        total: 0
      },
      isEditLoding: false
    }
  },
  watch: {
    dataObj () {
      this.tempOrder = JSON.parse(JSON.stringify(this.dataObj))
    }
  },
  methods: {
    GetProdcutContent (productData) {
      return Object.keys(productData)
    },
    CancelBtn () {
      this.$refs.form.reset()
      // this.DefaultOrderData()
      this.$emit('Cancle', false)
    },
    DefaultOrderData () {
      this.tempOrder = {
        id: '',
        products: {},
        user: {
          address: '',
          email: '',
          name: '',
          tel: ''
        },
        total: 0
      }
    },
    // API
    EditOrder () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/admin/order/${this.tempOrder.id}`
      this.isEditLoding = true
      this.$http.put(api, { data: this.tempOrder }).then((response) => {
        if (response.data.success) {
          this.$emit('EditSuccess')
          // this.DefaultOrderData()
          this.$swal(response.data.message, '', 'success')
        } else {
          this.$swal(response.data.message, '', 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        this.isEditLoding = false
      })
    }
  }
}
</script>
