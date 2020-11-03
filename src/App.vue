<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  metaInfo: {
    title: '',
    titleTemplate: '漫步旅遊  %s',
    htmlAttrs: {
      lang: 'zh'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.swal2-container{
  z-index: 10000!important;
}
</style>
