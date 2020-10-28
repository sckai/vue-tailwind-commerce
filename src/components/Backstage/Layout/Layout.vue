<template>
  <div>
    <NavBar @isDisplaySidebar="IsDisplaySidebar" />
    <div class="flex">
      <SideBar :show-sidebar="showSidebar" />
      <div
        class="w-full p-5 overflow-y-auto lg:-48"
        :class="{'ml-0': !showSidebar, 'ml-24 sm:ml-48': showSidebar}"
      >
        <router-view />
      </div>
    </div>
    <!-- <div class="">
      <FooterBar />
    </div> -->
  </div>
</template>

<script>
import NavBar from './NavBar'
import SideBar from './SideBar'
// import FooterBar from './FooterBar'
export default {
  components: {
    NavBar,
    SideBar
    // FooterBar
  },
  data () {
    return {
      showSidebar: true
    }
  },
  methods: {
    IsDisplaySidebar (value) {
      this.showSidebar = value
    }
  }
}
</script>
