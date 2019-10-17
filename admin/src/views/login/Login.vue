<template>
    <div id="Login" class="login-box">
        <div class="header">后台管理系统</div>
        <div class="main">
            <el-form class="demo-form-inline">
                <el-form-item label=""></el-form-item>
                <el-form-item label="">
                    <el-input
                            placeholder="用户名"
                            v-model="userName"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input
                            placeholder="密码"
                            v-model="userPwd"
                            show-password>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import tool from './../../util/verify.js';
    import storage from './../../util/storage.js';
    export default {
        name: "Login",
        components: {

        },
        data() {
            return {
                userName:'',
                userPwd:''
            }
        },
        mounted() {

        },
        methods: {
            login(){
                if(tool.isNull(this.userName)){
                    this.$message({
                        message: '用户名为空',
                        type: 'error'
                    });
                    return
                }
                if(tool.isNull(this.userPwd)){
                    this.$message({
                        message: '密码为空',
                        type: 'error'
                    });
                    return
                }
                this._api.post('/api/users/login',{
                    userName:this.userName,
                    userPwd:this.userPwd,
                },(res)=>{
                    if(res.status === 0){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                        return
                    }
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                    storage.setLocalStorage('userInfo',res.result);
                    this.$router.push({path:'/index'})
                })
            }
        }

    }
</script>

<style scoped>
    .login-box{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 400px;
        background-color: #fff;
        border-radius: 10px;
        height: 300px;
        padding: 30px 60px;
        animation: login 0.2s linear;
        box-shadow: 0 0 10px 0 #dddddd;
    }
    @keyframes login {
        0%{
            top:40%;
            opacity: 0;
        }
        100%{
            top:50%;
            opacity: 1;
        }
    }

    .login-box .header{
        line-height: 2;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        background-color: #fff;
    }
    .login-box button{
        width: 100%;
    }
</style>