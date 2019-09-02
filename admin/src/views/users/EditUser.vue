<template>
    <div id="EditUser">
        <el-page-header @back="goBack" :content="content"></el-page-header>
        <div class="el-main">
            <el-form label-width="80px" >
                <el-form-item label="类型">
                    <el-select v-model="formData.type" clearable placeholder="请选择">
                        <el-option
                                v-for="item in userType"
                                :key="item.typeId"
                                :value="item.typeName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input show-password v-model="formData.userPwd"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">创建</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "EditUser",
        components: {},
        data() {
            return {
                type: '',
                content: '',
                userType:[
                    {
                        typeId:1,
                        typeName:'用户'
                    }
                ],
                formData:{
                    userName:'',
                    userPwd:'',
                    type:'',
                }
            }
        },
        mounted() {
            this.type = this.$route.query.type;
            switch (this.type) {
                case 'admin':
                    this.content = '编辑管理员信息';
                    break;
                case 'user' :
                    this.content = '编辑用户信息';
                    break;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({path: '/' + this.type})
            }
        }

    }
</script>

<style scoped>

</style>