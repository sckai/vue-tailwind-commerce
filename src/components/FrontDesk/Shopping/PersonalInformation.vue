<template>
  <div class="information mx-auto">
    <ValidationObserver
      ref="form"
      v-slot="{ handleSubmit }"
    >
      <div class="px-2">
        <div class="flex flex-wrap mb-3">
          <div class="w-1/2 px-2 mb-5">
            <!-- name -->
            <label
              class="flex self-start"
              for="name"
            >姓名</label>
            <ValidationProvider
              v-slot="{ failed, errors }"
              rules="required"
            >
              <input
                id="name"
                v-model="personalInformation.name"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="請輸入姓名"
              >
              <div class="text-left">
                <span class="text-red-500">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="w-1/2 px-2 mb-5">
            <!-- Email -->
            <label
              class="flex self-start"
              for="email"
            >Email</label>
            <ValidationProvider
              v-slot="{ failed, errors }"
              rules="required|email"
            >
              <input
                id="email"
                v-model="personalInformation.email"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="請輸入單位"
              >
              <div class="text-left">
                <span class="text-red-500">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="w-full px-2 mb-5">
            <!-- 電話 -->
            <label
              class="flex self-start"
              for="phone"
            >電話</label>
            <ValidationProvider
              v-slot="{ failed, errors }"
              rules="required"
            >
              <input
                id="phone"
                v-model="personalInformation.phone"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="請輸入電話"
              >
              <div class="text-left">
                <span class="text-red-500">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="w-full px-2 mb-5">
            <!-- 地址 -->
            <label
              class="flex self-start"
              for="address"
            >地址</label>
            <ValidationProvider
              v-slot="{ failed, errors }"
              rules="required"
            >
              <input
                id="address"
                v-model="personalInformation.address"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="請輸入地址"
              >
              <div class="text-left">
                <span class="text-red-500">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="w-full px-2 mb-5">
            <!-- message -->
            <label
              class="flex self-start"
              for="message"
            >留言</label>
            <textarea
              v-model="personalInformation.message"
              class="w-full h-32 resize-y border rounded focus:outline-none focus:shadow-outline"
              placeholder="請輸入留言"
            />
          </div>
        </div>

        <hr class="mb-3">
        <button
          class="h-full mt-5 px-3 py-2 bg-black rounded-sm text-white hover:text-gray-300 sm:text-sm sm:leading-5"
          @click="handleSubmit(StepComplete)"
        >
          下一步
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '不可為空'
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
  data () {
    return {
      personalInformation: {
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
      }
    }
  },
  methods: {
    StepComplete () {
      this.$emit('StepComplete', 3, this.personalInformation)
    }
  }
}
</script>

<style lang="scss" scoped>
.information{
  max-width: 1280px;
}
</style>
