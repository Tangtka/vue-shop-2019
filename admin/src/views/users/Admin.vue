<template>
    <div id="Admin">
        <el-tabs v-model="activeName">
            <el-tab-pane label="角色列表" name="adminList">
                <el-form :model="searchForm" label-width="80px">
                    <el-form-item label="搜索">
                        <el-input clearable v-model="searchForm.text" placeholder="用户名"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="seacrhAdmin">搜 索</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                        :data="adminData"
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
                            <el-tag size="small" :type="scope.row.authorityAll === '1' ? 'warning':''">{{
                                scope.row.authorityAll === '1' ? '超级管理员':'管理员' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" circle icon="el-icon-date" @click="lookUser(scope.row.userId,'look')">
                            </el-button>
                            <el-button size="mini" type="primary" circle icon="el-icon-edit" @click="lookUser(scope.row.userId,'edit')">
                            </el-button>
                            <el-button size="mini" type="danger" circle icon="el-icon-delete" @click="delAdmin(scope.row.userId)"></el-button>
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
            <el-tab-pane label="添加角色" name="addAdmin">
                <el-form :model="addForm" label-width="80px">
                    <el-form-item label="用户类型">
                        <el-select v-model="addForm.value" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in adminType"
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
                        <el-button @click="resetAdmin">取 消</el-button>
                        <el-button type="primary" @click="addAdmin" :loading="addForm.btnLoading">添 加</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        <Dialog :isShow="isDialogShow" title="管理员信息" @close="closeDialogLook">
            <el-form :model="adminDetail" label-width="100px">
                <el-form-item label="用户编号">
                    <el-input v-model="adminDetail.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-input v-model="adminDetail.authorityAll === '1' ? '超级管理员':'管理员'" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="adminDetail.userName" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input show-password v-model="adminDetail.userPwd" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="btn" class="dialog-footer">
                <el-button type="primary" @click="closeDialogLook">确 定</el-button>
            </div>
        </Dialog>

        <Dialog :isShow="isDialogShowEdit" title="管理员修改" @close="closeDialogEdit">
            <el-form :model="adminDetail" label-width="100px">
                <el-form-item label="用户编号">
                    <el-input v-model="adminDetail.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-select v-model="adminDetail.authorityAll" clearable placeholder="请选择">
                        <el-option
                                v-for="item in adminType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input clearable v-model="adminDetail.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input show-password v-model="adminDetail.userPwd"></el-input>
                </el-form-item>
            </el-form>
            <div slot="btn" class="dialog-footer">
                <el-button @click="closeDialogEdit">取 消</el-button>
                <el-button type="primary" @click="editAdmin(adminDetail.userId)">确 定</el-button>
            </div>
        </Dialog>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        components: {
            'Dialog': () => import('./../../components/Dialog.vue')
        },
        data() {
            return {
                activeName: 'adminList',
                adminData: [],
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
                adminType: [
                    {
                        value: '1',
                        label: '超级管理员'
                    },
                    {
                        value: '2',
                        label: '管理员'
                    }],
                isDialogShow: false,
                adminDetail: {},
                isDialogShowEdit: false
            }
        },
        mounted() {
            this.getAdminUsers();
        },
        methods: {
            getAdminUsers() {
                this.tableLoading = true;
                this.$$http.GET('/api/adminUsers/queryAdmin', {
                    searchText: this.searchForm.text,
                    pageNum: this.page.num,
                    pageSize: this.page.size,
                }, (respData) => {
                    if (respData.status === '1') {
                        this.adminData = respData.data;
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
                this.getAdminUsers();
            },
            seacrhAdmin() {
                this.page.num = 1;
                this.getAdminUsers();
            },
            addAdmin() {
                this.addForm.btnLoading = true;
                if (!this.addForm.value) {
                    this.$message({
                        message: '用户类型不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                if (!this.addForm.name) {
                    this.$message({
                        message: '用户名称不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                if (!this.addForm.pwd) {
                    this.$message({
                        message: '用户密码不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                this.$$http.POST('/api/adminUsers/addAdmin', {
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
                        this.resetAdmin();
                        this.activeName = 'adminList';
                        this.seacrhAdmin();
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
            resetAdmin() {
                this.addForm.name = '';
                this.addForm.value = '';
                this.addForm.pwd = '';
                this.addForm.btnLoading = false;
            },
            lookUser(userId, type) {
                switch (type) {
                    case 'look':
                        this.openDialogLook();
                        break;
                    case 'edit':
                        this.openDialogEdit();
                        break
                }
                this.$$http.GET('/api/adminUsers/adminDetails', {
                    userId: userId,
                }, (respData) => {
                    if (respData.status === '1') {
                        this.adminDetail = respData.data;
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                })
            },
            editAdmin(userId) {
                if (!this.adminDetail.authorityAll) {
                    this.$message({
                        message: '用户类型不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                if (!this.adminDetail.userName) {
                    this.$message({
                        message: '用户名称不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                if (!this.adminDetail.userPwd) {
                    this.$message({
                        message: '用户密码不能为空',
                        type: 'error',
                        duration: 2000
                    });
                    this.addForm.btnLoading = false;
                    return
                }
                this.$$http.POST('/api/adminUsers/editAdmin', {
                    userId: userId,
                    userType: this.adminDetail.authorityAll,
                    userName: this.adminDetail.userName,
                    userPwd: this.adminDetail.userPwd,
                }, (respData) => {
                    if (respData.status === '1') {
                        this.$message({
                            message: respData.msg,
                            type: 'success',
                            duration: 2000
                        });
                        this.getAdminUsers();
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
            delAdmin(userId) {
                this.$confirm('是否删除该用户', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$$http.POST('/api/adminUsers/delAdmin', {
                        userId: userId,
                    }, (respData) => {
                        if (respData.status === '1') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getAdminUsers();
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

</style>

