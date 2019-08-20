<template>
    <div id="Users">
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户列表" name="userList">
                <el-form :model="searchForm" label-width="80px">
                    <el-form-item label="搜索">
                        <el-input clearable v-model="searchForm.text" placeholder="用户名称"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="seacrhUser">搜 索</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                        :data="userData"
                        v-loading="tableLoading"
                        style="width: 100%">
                    <el-table-column
                            label="用户名称"
                            width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-user-solid"></i>
                            <span>{{ scope.row.userName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="权限"
                            width="180">
                        <template slot-scope="scope">
                            <el-tag size="small" :type="scope.row.authorityAll === '3' ? 'info':''">{{ scope.row.authorityAll === '3' ? '普通用户':'' }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" plain @click="lookUser(scope.row.userId,'look')">查看</el-button>
                            <el-button size="mini" type="primary" plain @click="lookUser(scope.row.userId,'edit')">编辑</el-button>
                            <el-button size="mini" type="danger" plain @click="delUser(scope.row.userId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        :page-size="page.size"
                        layout="total, prev, pager, next"
                        :total="page.totalCount">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="添加用户" name="addUser">
                <el-form :model="addForm" label-width="80px">
                    <el-form-item label="用户类型">
                        <el-select v-model="addForm.value" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in userType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="用户名称">
                        <el-input v-model="addForm.name" clearable placeholder="用户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="addForm.pwd" show-password placeholder="用户密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetUser">取 消</el-button>
                        <el-button type="primary" @click="addUser" :loading="addForm.btnLoading">添 加</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        <Dialog :isShow="isDialogShow" title="用户信息" @close="closeDialogLook">
            <el-form :model="userDetail" label-width="100px">
                <el-form-item label="用户编号">
                    <el-input  v-model="userDetail.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-input  v-model="userDetail.authorityAll === '3' ? '普通用户':''" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="userDetail.userName" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input show-password v-model="userDetail.userPwd" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="btn" class="dialog-footer">
                <el-button type="primary" @click="closeDialogLook">确 定</el-button>
            </div>
        </Dialog>

        <Dialog :isShow="isDialogShowEdit" title="用户修改" @close="closeDialogEdit">
            <el-form :model="userDetail" label-width="100px">
                <el-form-item label="用户编号">
                    <el-input  v-model="userDetail.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-select v-model="userDetail.authorityAll" clearable placeholder="请选择">
                        <el-option
                                v-for="item in userType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input clearable v-model="userDetail.userName" ></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input show-password v-model="userDetail.userPwd" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="btn" class="dialog-footer">
                <el-button @click="closeDialogEdit">取 消</el-button>
                <el-button type="primary" @click="editUser(userDetail.userId)">确 定</el-button>
            </div>
        </Dialog>
    </div>
</template>

<script>
    export default {
        name: "Users",
        components: {
            'Dialog': () => import('./../../components/Dialog.vue')
        },
        data() {
            return {
                activeName: 'userList',
                userData: [],
                page: {
                    num: 1,
                    size: 10,
                    totalCount: 0
                },
                tableLoading: false,
                searchForm: {
                    text: ''
                },
                addForm: {
                    name: '',
                    pwd: '',
                    value: '',
                    btnLoading: false
                },
                userType:[
                    {
                        value: '3',
                        label: '普通用户'
                    }],
                isDialogShow: false,
                userDetail:{},
                isDialogShowEdit:false
            }
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                this.tableLoading = true;
                this.$$http.GET('/api/users/queryUsers', {
                    searchText: this.searchForm.text,
                    pageNum: this.page.num,
                    pageSize: this.page.size,
                }, (respData) => {
                    if (respData.status === '1') {
                        this.userData = respData.data;
                        this.page.totalCount = respData.totalCount;
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                    this.tableLoading = false;
                })
            },
            handleCurrentChange(e) {
                this.page.num = e;
                this.getUsers();
            },
            seacrhUser() {
                this.page.num = 1;
                this.getUsers();
            },
            addUser() {
                this.addForm.btnLoading = true;
                if(!this.addForm.value){
                    this.$message({
                        message: '用户类型不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                if(!this.addForm.name){
                    this.$message({
                        message: '用户名称不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                if(!this.addForm.pwd){
                    this.$message({
                        message: '用户密码不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                this.$$http.POST('/api/users/addUsers', {
                    userType: this.addForm.value,
                    userName: this.addForm.name,
                    userPwd: this.addForm.pwd,
                }, (respData) => {
                    if (respData.status === '1') {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                        this.resetUser();
                        this.activeName =  'userList';
                        this.seacrhUser();
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                    this.addForm.btnLoading = false;
                })
            },
            resetUser(){
                this.addForm.name = '';
                this.addForm.value = '';
                this.addForm.pwd = '';
                this.addForm.btnLoading = false;
            },
            lookUser(userId,type) {
                switch (type) {
                    case 'look':
                        this.openDialogLook();
                        break;
                    case 'edit':
                        this.openDialogEdit();
                        break
                }
                this.$$http.GET('/api/users/UsersDetails', {
                    userId: userId,
                }, (respData) => {
                    if (respData.status === '1') {
                        this.userDetail = respData.data;
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                })
            },
            editUser(userId){
                if(!this.userDetail.authorityAll){
                    this.$message({
                        message: '用户类型不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                if(!this.userDetail.userName){
                    this.$message({
                        message: '用户名称不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                if(!this.userDetail.userPwd){
                    this.$message({
                        message: '用户密码不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                this.$$http.POST('/api/users/editUsers', {
                    userId:userId,
                    userType: this.userDetail.authorityAll,
                    userName: this.userDetail.userName,
                    userPwd: this.userDetail.userPwd,
                }, (respData) => {
                    if (respData.status === '1') {
                        this.$message({
                            message: respData.msg,
                            type: 'success',
                            duration: 2000
                        });
                        this.getUsers();
                        this.closeDialogEdit();
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                    this.addForm.btnLoading = false;
                })
            },
            delUser(userId){
                this.$confirm('是否删除该用户', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$$http.POST('/api/users/delUsers', {
                        userId:userId,
                    }, (respData) => {
                        if (respData.status === '1') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getUsers();
                        } else {
                            this.$message({
                                message: respData.msg,
                                type: 'error',
                                duration: 2000
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            openDialogLook() {
                this.isDialogShow = true;
            },
            closeDialogLook() {
                this.isDialogShow = false;
            },
            openDialogEdit() {
                this.isDialogShowEdit = true;
            },
            closeDialogEdit() {
                this.isDialogShowEdit = false;
            }
        }

    }
</script>

<style scoped>
    .el-pagination {
        text-align: center;
        margin: 20px auto;
    }

    .el-pager li {
        font-weight: normal !important;
    }
</style>

