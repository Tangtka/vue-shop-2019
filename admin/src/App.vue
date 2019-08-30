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

<style scoped>

</style>