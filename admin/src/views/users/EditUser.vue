<template>
    <div id="EditUser">
        <el-page-header @back="goBack" :content="content"></el-page-header>
        <div class="el-main">
            <el-form label-width="80px" >
                <el-form-item label="类型">
                    <el-select
                            v-model="formData.accountType"
                            clearable
                            placeholder="请选择"
                            @change="selectHandleChange"
                            @clear="selectHandleClear"
                    >
                        <el-option
                                v-for="item in dictionaryList"
                                :key="item.dictionaryId"
                                :label="item.dictionaryName"
                                :value="item.dictionaryValue">
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
                    <el-button type="primary" @click="edit">保存</el-button>
                    <el-button @click="goBack()">取消</el-button>
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
                dictionaryList: [],
                formData: {
                    userName: '', //用户名
                    userPwd: '', //密码
                    accountType: '', // 账号类型
                    accountTypeName: '', // 账号类型
                    mobile: '', //手机号
                }
            }
        },
        mounted() {
            this.type = this.$route.query.type;
            switch (this.type) {
                case 'admin':
                    this.content = '编辑管理员信息';
                    this.getData(this.$route.query.userId,'1');
                    break;
                case 'users' :
                    this.content = '编辑用户信息';
                    this.getData(this.$route.query.userId,'3');
                    break;
            }
            this.getDictionaries();

        },
        methods: {
            goBack() {
                this.$router.replace({path: '/index/' + this.type})
            },
            selectHandleChange(val) {
                this.dictionaryList.forEach((item) => {
                    if (item.dictionaryValue === val) {
                        this.formData.accountTypeName = item.dictionaryName;
                    }
                })
            },
            selectHandleClear() {
                this.formData.accountTypeName = ''
            },
            getDictionaries() {
                this._api.post('/api/system/dictionaries/code', {
                    dictionaryCode: 'users'
                }, (res) => {
                    if (res.status === 1) {
                        this.dictionaryList = res.result
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
            getData(val,type){
                this._api.post('/api/users/findOne', {
                    userId:val,
                    accountType:type
                }, (res) => {
                    if (res.status === 1) {
                        this.formData = res.result
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
            edit(){
                this._api.post('/api/users/edit',this.formData,(res)=>{
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
                    this.goBack();
                })
            }
        }

    }
</script>

<style scoped>

</style>