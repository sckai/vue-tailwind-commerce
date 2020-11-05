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
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-screen sm:max-w-lg"
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
                  <div class="mb-3">
                    <!-- 優惠卷名稱 -->
                    <label
                      for="name"
                    >優惠卷名稱</label>
                    <ValidationProvider
                      v-slot="{ failed, errors }"
                      rules="required"
                    >
                      <input
                        id="name"
                        v-model="tempCoupon.title"
                        type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="請輸入優惠卷名稱"
                      >
                      <span class="text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="mb-3">
                    <!-- 優惠碼 -->
                    <label
                      for="coupon"
                    >優惠碼</label>
                    <ValidationProvider
                      v-slot="{ failed, errors }"
                      rules="required"
                    >
                      <input
                        id="coupon"
                        v-model="tempCoupon.coupon"
                        type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight uppercase focus:outline-none focus:shadow-outline"
                        placeholder="請輸入優惠碼"
                      >
                      <span class="text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="mb-3">
                    <!-- 折扣百分比 -->
                    <label
                      for="percent"
                    >折扣百分比</label>
                    <ValidationProvider
                      v-slot="{ failed, errors }"
                      rules="required|numeric|between:0,100"
                    >
                      <input
                        id="percent"
                        v-model="tempCoupon.percent"
                        type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="請輸入百分比0~100"
                      >
                      <span class="text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="mb-3">
                    <!-- 到期日 -->
                    <label
                      for="time"
                    >到期日</label>
                    <ValidationProvider
                      v-slot="{ failed, errors }"
                      rules="required|date"
                    >
                      <input
                        id="time"
                        v-model="tempCoupon.time"
                        type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="請輸入到期日"
                      >
                      <span class="text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <hr class="mb-3">

                  <div class="mb-3">
                    <label class="inline-flex items-center">
                      <input
                        v-model="tempCoupon.is_enabled"
                        type="checkbox"
                        class="form-checkbox"
                        :true-value="1"
                        :false-value="0"
                        checked
                      >
                      <span class="ml-2">是否啟用</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <hr>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span
                v-if="isCreate"
                class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto"
              >
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click="handleSubmit(CreatCoupon)"
                >
                  <div>
                    <font-awesome-icon
                      v-if="isCreateLoding"
                      class="mr-2 fa-pulse"
                      :icon="['fas', 'spinner']"
                    />
                    建立
                  </div>
                </button>
              </span>
              <span
                v-else
                class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto"
              >
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click.prevent="handleSubmit(EditCoupon)"
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
import { required, numeric, between } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '不可為空'
})
extend('numeric', {
  ...numeric,
  message: '僅限輸入數字'
})
extend('between', {
  ...between,
  message: '輸入0~100'
})
extend('date', {
  validate: value => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/
    return value.match(regEx)
  },
  message: '輸入正確日期格式ex:2020-05-20'
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
    isCreate: {
      type: Boolean,
      default: false
    },
    dataObj: {
      type: Object,
      default: () => {
        return {
          imageUrl: '',
          title: '',
          category: '',
          unit: '',
          origin_price: 0,
          price: 0,
          description: '',
          content: '',
          is_enabled: 0,
          id: 0
        }
      }
    }
  },
  data () {
    return {
      tempCoupon: {
        imageUrl: '',
        title: '',
        category: '',
        unit: '',
        origin_price: 0,
        price: 0,
        description: '',
        content: '',
        is_enabled: 0,
        id: 0
      },
      isCreateLoding: false,
      isEditLoding: false
    }
  },
  watch: {
    dataObj () {
      this.tempCoupon = Object.assign({}, this.dataObj)
    }
  },
  methods: {
    CancelBtn () {
      this.$refs.form.reset()
      this.$emit('Cancle', false)
    },
    // API
    CreatCoupon () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      const sendData = {
        title: this.tempCoupon.title,
        is_enabled: this.tempCoupon.is_enabled,
        percent: this.tempCoupon.percent,
        due_date: Date.parse(this.tempCoupon.time),
        code: this.tempCoupon.coupon
      }
      this.isCreateLoding = true
      this.$http.post(api, { data: sendData }).then((response) => {
        if (response.data.success) {
          this.$refs.form.reset()
          this.$emit('creatSuccess')
          this.$swal(response.data.message, '', 'success')
        } else {
          this.$swal(response.data.message, '', 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        this.isCreateLoding = false
      })
    },
    EditCoupon () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.tempCoupon.id}`
      const sendData = {
        title: this.tempCoupon.title,
        is_enabled: this.tempCoupon.is_enabled,
        percent: this.tempCoupon.percent,
        due_date: Date.parse(this.tempCoupon.time),
        code: this.tempCoupon.coupon
      }
      this.isEditLoding = true
      this.$http.put(api, { data: sendData }).then((response) => {
        if (response.data.success) {
          this.$emit('EditSuccess')
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
