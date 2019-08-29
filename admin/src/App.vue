<template>
  <div id="app" class="app">
    <Index></Index>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    'Index':()=>import('./views/index/Index.vue')
  }
}
</script>

<style src="./assets/css/reset.css"></style>
<style src="./assets/css/style.css"></style>
<style scoped>

</style>