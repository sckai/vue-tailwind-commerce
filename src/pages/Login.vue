<template>
  <div>
    <loading
      :active.sync="isLoading"
      loader="dots"
    />
    <div class="bg-cover bg-center-center h-screen w-screen z-10 loginBg">
      <div class="bg-current opacity-50 h-screen w-screen z-1" />
      <!-- login form -->
      <div class="absolute w-full max-w-xs loginForm">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="font-bold text-blue-500">
            漫步旅遊管理後台
          </div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="mail"
              >
                Mail Address
              </label>
              <ValidationProvider
                v-slot="{ failed, errors }"
                rules="required|email"
              >
                <input
                  id="mail"
                  v-model="account"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Mail Address"
                >
                <span class="text-red-500">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <ValidationProvider
                v-slot="{ failed, errors }"
                rules="required"
              >
                <input
                  id="password"
                  v-model="password"
                  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="******************"
                >
                <span class="text-red-500">{{ errors[0] }}</span>
              </ValidationProvider>
            <!-- <p class="text-red-500 text-xs italic">
              Please choose a password.
            </p> -->
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                @click.prevent="handleSubmit(Signin)"
              >
                Sign In
              </button>
            </div>
          </ValidationObserver>
        </form>
        <p class="text-center text-gray-100 text-xs">
          &copy;2020 漫步旅遊管理後台.
        </p>
      </div>
    </div>
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
  message: '請檢查mail格式'
})
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  metaInfo: {
    title: 'Login',
    htmlAttrs: {
      lang: 'zh'
    }
  },
  data () {
    return {
      account: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    Signin () {
      const user = {
        username: this.account,
        password: this.password
      }
      this.isLoading = true
      this.$http.post('/admin/signin', user).then((response) => {
        if (response.data.success) {
          window.sessionStorage.setItem('token', response.data.token)
          this.$router.push('/layout/dashboard')
        } else {
          this.$swal('', response.data.message, 'info')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .loginBg{
    background-image: url('../assets/img/loingBg.jpg');
  }
  .loginForm{
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
