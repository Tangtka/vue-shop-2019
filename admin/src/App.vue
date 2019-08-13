<template>
  <div id="app">

    <el-container>
      <el-header class="header">
        Lka
      </el-header>
      <el-container>
        <el-aside class="navlist">
          <Nav></Nav>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
      'Nav':()=>import('./components/Nav.vue')
  }
}
</script>

<style src="./assets/css/reset.css"></style>
<style scoped>
  #app{
    height: 100%;
  }
  .header{
    background-color: #409EFF;
    color: #FFFFFF;
    line-height: 60px;
    font-size: 20px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .navlist{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    padding-top: 60px;
    overflow: hidden;
    border-right: solid 1px #e6e6e6;
  }
  .navlist > div{
    height: 100%;
  }
  .main{
    margin-top: 60px;
    margin-left: 300px;
  }
</style>