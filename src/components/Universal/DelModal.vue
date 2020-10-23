<template>
  <div :class="{'hidden': !showModal}">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" />&#8203;
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-red-600 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  id="modal-headline"
                  class="text-lg leading-6 font-medium text-white"
                >
                  刪除產品 {{ dataObj.title }}
                </h3>
              </div>
            </div>
          </div>
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 mb-3 text-center sm:mt-0 sm:text-left">
                <div>
                  是否刪除產品
                  <span class="text-red-600">{{ dataObj.title }}</span>
                </div>
              </div>
            </div>
            <input
              v-model="checkString"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="請輸入相同名稱"
            >
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                :disabled="checkString !== dataObj.title"
                :class="{'opacity-75 cursor-not-allowed': checkString !== dataObj.title}"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                @click="Delete"
              >
                <div>
                  <font-awesome-icon
                    v-if="isDelLoding"
                    class="mr-2 fa-pulse"
                    :icon="['fas', 'spinner']"
                  />
                  刪除
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
    },
    showModal: {
      type: Boolean,
      default: false
    },
    apiPath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      checkString: '',
      isDelLoding: false
    }
  },
  methods: {
    CancelBtn () {
      this.checkString = ''
      this.$emit('Cancle', false)
    },
    // API
    Delete () {
      this.isDelLoding = true
      this.$http.delete(this.apiPath).then((response) => {
        if (response.data.success) {
          this.checkString = ''
          this.$emit('DelSuccess')
          this.$swal(response.data.message, '', 'success')
        } else {
          this.$swal(response.data.message, '', 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        this.isDelLoding = false
      })
    }
  }
}
</script>
