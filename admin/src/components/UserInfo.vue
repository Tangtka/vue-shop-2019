<template>
    <div id="UserInfo" class="el-row--flex is-align-middle">
        <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
        <el-dropdown>
            <span class="el-dropdown-link">
                admin <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        components: {},
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}

    }
</script>

<style scoped>
    .el-dropdown-link{
        color: #FFFFFF;
        margin: 0 20px;
    }
</style>