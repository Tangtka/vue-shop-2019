<template>
    <div id="Index" class="index">
        <div class="header">
            <div class="logo">
                <span @click="isCollapse = !isCollapse">tka</span>
                <span>后台管理系统</span>
            </div>
            <div>2</div>
        </div>
        <div class="main">
            <div class="nav" :class="{'maxwidth':isCollapse}">
                <Nav :isCollapse="isCollapse"></Nav>
            </div>
            <div class="el-main">2</div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Index",
        components: {
            'Nav':()=>import('./../../components/Nav.vue')
        },
        data() {
            return {
                isCollapse:false
            }
        },
        mounted() {

        },
        methods: {}

    }
</script>

<style scoped>
    .index{
        height: 100%;
    }
    .header{
        width: 100%;
        height: 60px;
        background-color: #34352C;
        color: #FFFFFF;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header .logo{
        font-size: 24px;
    }
    .header .logo>span{
        margin: 0 10px;
    }
    .main{
        display: flex;
        height: calc(100% - 60px);
        overflow: hidden;
        overflow-y: auto;
    }
    .main .nav{
        width: 230px;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        background-color: #ffffff;
    }
    .main .nav.maxwidth{
        width: 60px;
    }
    .main .nav::-webkit-scrollbar{
        display: none;
    }

</style>