<template>
  <div>
    <NavBar />
    <div class="mainContent">
      <router-view />
    </div>
    <FooterBar />
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

<style lang="scss" scoped>
.mainContent{
  min-height: calc(100vh - 64px - 88px);
}
</style>
