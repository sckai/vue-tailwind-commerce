<template>
  <nav class="sticky inset-0 bg-gray-800 z-10">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center sm:items-stretch">
          <div class="flex justify-center items-center">
            <img
              class="hidden lg:inline-block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
              alt="Workflow logo"
            >
            <span class="text-white font-bold ml-2">
              漫步旅遊
            </span>
          </div>
          <div class="inset-y-0 left-0 ml-3 flex items-center">
            <!-- Mobile menu button-->
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
              @click="DisplaySidebar"
            >
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button
                id="user-menu"
                class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                aria-label="User menu"
                aria-haspopup="true"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  data-type="userMenu"
                  src="https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-user-free-button-png-image-image_1338291.jpg"
                  alt=""
                  @click="DisplayUserMenu = !DisplayUserMenu"
                >
              </button>
            </div>

            <div
              v-if="DisplayUserMenu"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
            >
              <div
                class="py-1 rounded-md bg-white shadow-xs"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                  role="menuitem"
                  @click.prevent="Signout"
                >Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
    <div class="hidden sm:hidden">
      <div class="px-2 pt-2 pb-3">
        <a
          class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >Dashboard</a>
        <a
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >Team</a>
        <a
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >Projects</a>
        <a
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >Calendar</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      DisplayUserMenu: false,
      sideBarShow: true
    }
  },
  mounted () {
    const vm = this
    document.addEventListener('click', function (e) {
      if (e.target.dataset.type === 'userMenu') {
        return false
      } else {
        vm.DisplayUserMenu = false
      }
    })
  },
  destroyed () {
    document.removeEventListener('click', function (e) {})
  },
  methods: {
    DisplaySidebar () {
      this.sideBarShow = !this.sideBarShow
      this.$emit('isDisplaySidebar', this.sideBarShow)
    },
    Signout () {
      const apiPath = `${process.env.VUE_APP_URL}/logout`
      this.$http.post(apiPath).then((response) => {
        if (response.data.success) {
          this.$router.push('/login')
        } else {
          this.$swal('', response.data.message, 'info')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
      })
    }
  }
}
</script>
