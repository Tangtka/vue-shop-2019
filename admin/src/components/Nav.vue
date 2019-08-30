<template>
    <div id="Nav">
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            unique-opened
            :collapse="isCollapse"
            :default-active="routerActive"
            router
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统设置</span>
                </template>
                <el-menu-item index="/dictionaries">字典管理</el-menu-item>
                <el-menu-item index="/system">网站设置</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-shopping-bag-1"></i>
                <span slot="title">产品管理</span>
            </el-menu-item>
            <el-menu-item index="/advertising">
                <i class="el-icon-picture-outline"></i>
                <span slot="title">广告管理</span>
            </el-menu-item>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title">账号管理</span>
                </template>
                <el-menu-item index="/admin">管理员</el-menu-item>
                <el-menu-item index="/users">用户</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">
                <i class="el-icon-edit"></i>
                <span slot="title">操作日志</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        props:['isCollapse'],
        components: {

        },
        data() {
            return {
                routerActive:''
            }
        },
        mounted() {
            this.routerActive = this.$route.path;
        },
        methods: {

        },
    }
</script>

<style scoped>

</style>