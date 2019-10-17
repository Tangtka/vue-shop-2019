<template>
  <div id="app" class="app">
    <router-view></router-view>
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