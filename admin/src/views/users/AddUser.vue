<template>
    <div id="AddUser">
        <el-page-header @back="goBack" :content="content"></el-page-header>
        <div class="el-main">
            <el-form label-width="80px">
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
                    <el-button type="primary" @click="add">创建</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "AddUser",
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
                    this.content = '添加管理员';
                    break;
                case 'user' :
                    this.content = '添加用户';
                    break;
            }
            this.getDictionaries();
        },
        methods: {
            goBack() {
                this.$router.replace({path: '/' + this.type})
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
            add() {
                this._api.post('/api/users/add', this.formData, (res) => {
                    if (res.status === 1) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.goBack();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
            reset() {
                this.formData = {
                    userName: '', //用户名
                    userPwd: '', //密码
                    accountType: '', // 账号类型
                    accountTypeName: '', // 账号类型
                    mobile: '', //手机号
                }
            }
        }

    }
</script>

<style scoped>

</style>