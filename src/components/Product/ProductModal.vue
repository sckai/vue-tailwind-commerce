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
                <div class="w-1/3 px-2">
                  <!-- 圖片網址 -->
                  <div class="mb-3">
                    <label
                      for="image"
                    >輸入圖片網址</label>
                    <input
                      id="image"
                      v-model="tempProducts.imageUrl"
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="請輸入圖片連結"
                    >
                  </div>
                  <div class="overflow-hidden">
                    <!-- 上傳圖片 -->
                    <label for="customFile">或 上傳圖片
                      <!-- <font-awesome-icon
                    v-if="loadStatus.uploadLoading"
                    :icon="['fa', 'spinner']"
                    spin
                  /> -->
                    </label>
                    <!-- @change="uploadFile" -->
                    <input
                      id="customFile"
                      ref="files"
                      type="file"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      @change="uploadImageFile"
                    >
                    <img
                      class="img-fluid"
                      :src="tempProducts.imageUrl"
                      alt=""
                    >
                  </div>
                </div>
                <div class="w-2/3 px-2">
                  <div class="mb-3">
                    <!-- 產品名稱 -->
                    <label
                      for="name"
                    >產品名稱</label>
                    <ValidationProvider
                      v-slot="{ failed, errors }"
                      rules="required"
                    >
                      <input
                        id="name"
                        v-model="tempProducts.title"
                        type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="請輸入標題"
                      >
                      <span class="text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="flex flex-wrap mb-3">
                    <div class="w-1/2 px-2">
                      <!-- 分類 -->
                      <label
                        for="class"
                      >分類</label>
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        rules="required"
                      >
                        <input
                          id="class"
                          v-model="tempProducts.category"
                          type="text"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="請輸入分類"
                        >
                        <span class="text-red-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="w-1/2 px-2">
                      <!-- 單位 -->
                      <label
                        for="unit"
                      >單位</label>
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        rules="required"
                      >
                        <input
                          id="unit"
                          v-model="tempProducts.unit"
                          type="text"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="請輸入單位"
                        >
                        <span class="text-red-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="flex flex-wrap mb-3">
                    <div class="w-1/2 px-2">
                      <!-- 原價 -->
                      <label
                        for="originalPrice"
                      >原價</label>
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        rules="required|numeric"
                      >
                        <input
                          id="originalPrice"
                          v-model="tempProducts.origin_price"
                          type="text"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="請輸入原價"
                        >
                        <span class="text-red-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="w-1/2 px-2">
                      <!-- 售價 -->
                      <label
                        for="price"
                      >售價</label>
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        rules="required|numeric"
                      >
                        <input
                          id="price"
                          v-model="tempProducts.price"
                          type="text"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="請輸入售價"
                        >
                        <span class="text-red-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>

                  <hr class="mb-3">

                  <div class="mb-3">
                    <!-- 產品描述 -->
                    <label
                      for="description"
                    >產品描述</label>
                    <textarea
                      id="description"
                      v-model="tempProducts.description"
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="請輸入產品描述"
                    />
                  </div>
                  <div class="mb-3">
                    <!-- 說明內容 -->
                    <label
                      for="content"
                    >說明內容</label>
                    <textarea
                      id="content"
                      v-model="tempProducts.content"
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="請輸入說明內容"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="inline-flex items-center">
                      <input
                        v-model="tempProducts.is_enabled"
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
                  @click="handleSubmit(CreatProduct)"
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
                  @click.prevent="handleSubmit(EditProduct)"
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
      tempProducts: {
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
      this.tempProducts = Object.assign({}, this.dataObj)
    }
  },
  methods: {
    CancelBtn () {
      this.$refs.form.reset()
      this.$emit('Cancle', false)
    },
    // API
    CreatProduct () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      this.isCreateLoding = true
      this.$http.post(api, { data: this.tempProducts }).then((response) => {
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
    EditProduct () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProducts.id}`
      this.isEditLoding = true
      this.$http.put(api, { data: this.tempProducts }).then((response) => {
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
    },
    uploadImageFile () {
      const uploadedFile = this.$refs.files.files[0]
      if (uploadedFile === undefined) {
        return
      }
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const apiUrl = `${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.$http.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response)
        if (response.data.success) {
          this.tempProducts.imageUrl = response.data.imageUrl
        } else {
          this.$swal(response.data.message, '', 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        // this.isLoading = false
      })
    }
  }
}
</script>
