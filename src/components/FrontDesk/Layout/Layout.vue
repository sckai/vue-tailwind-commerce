<template>
  <div>
    <NavBar />
    <router-view />
    <div>
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
