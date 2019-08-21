<template>
    <div id="Nav" class="">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router :default-active='$route.path'>
            <el-menu-item index="/system">
                <i class="el-icon-setting"></i>
                <span slot="title">系统设置</span>
            </el-menu-item>
            <el-submenu index="/product">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span slot="title">产品设置</span>
                </template>
                <el-menu-item index="/product">产品列表</el-menu-item>
                <el-menu-item index="/productAdd">添加产品</el-menu-item>
            </el-submenu>
            <el-submenu index="/admin">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title">用户管理</span>
                </template>
                <el-menu-item index="/admin">管理员管理</el-menu-item>
                <el-menu-item index="/users">用户管理</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Nav",
    components:{
    
    },
    data(){
        return {
            isCollapse:false
        }
    },
    mounted() {
    
    },
    methods:{
        handleOpen(key, keyPath) {

        },
        handleClose(key, keyPath) {

        }
    }
    
}
</script>

<style>
    .el-menu{
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        width: 320px;
    }

    .el-menu-item{
        padding-right: 40px;
    }
    .el-submenu{
        padding-right: 20px;
    }
    .el-menu-item.is-active {
        color: #409EFF;
        background-color: #ecf5ff;
    }
</style>