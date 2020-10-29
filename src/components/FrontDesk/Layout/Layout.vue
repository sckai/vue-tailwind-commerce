<template>
  <div>
    <NavBar />
    <!-- <div> -->
    <router-view />
    <!-- </div> -->
    <div class="">
      <FooterBar />
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import FooterBar from './FooterBar'
export default {
  components: {
    NavBar,
    FooterBar
  }
}
</script>
