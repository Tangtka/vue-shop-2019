<template>
    <div id="Login">
        <div class="login">
            <!--<div class="title">登 录</div>-->
            <div class="input-box">

                <el-form label-position="top">
                    <el-form-item label="用户名">
                        <el-input
                                placeholder="用户名"
                                v-model="userName"
                                clearable
                                prefix-icon="el-icon-user"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="密码">
                        <el-input
                                placeholder="密码"
                                v-model="userPwd"
                                show-password
                                prefix-icon="el-icon-setting"
                        ></el-input>
                    </el-form-item>

                    <div class="btn-box">
                        <el-button type="primary" @click="submitLogin">登 录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {setLocalStorage} from './../../util/storage.js'
    export default {
        name: "Login",
        components: {},
        data() {
            return {
                userName:'',
                userPwd:''
            }
        },
        mounted() {

        },
        methods: {
            submitLogin(){
                this.$$http.POST('/api/adminUsers/login', {
                    userName: this.userName,
                    userPwd:this.userPwd
                }, (respData) => {
                    if (respData.status === '1') {
                        setLocalStorage('userInfo',respData.data);
                        this.$router.replace('/');
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                })
            },

        }

    }
</script>

<style scoped>
    .login {
        width: 400px;
        background-color: #ffffff;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        box-shadow: 0 0 10px 0 #efefef;
        animation: login 0.2s linear;
        padding: 20px;
    }

    .title {
        padding-bottom: 20px;
        border-bottom: solid 1px #efefef;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }

    .btn-box{
        text-align: center;
    }

    @keyframes login {
        from {
            top: 40%;
            opacity: 0
        }
        to {
            top: 50%;
            opacity: 1
        }
    }
</style>