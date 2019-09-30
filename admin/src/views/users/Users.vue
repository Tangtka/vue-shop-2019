<template>
    <div id="Users">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="搜索" prop="pass">
                <el-input
                        placeholder="请输入内容"
                        clearable>
                </el-input>

            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" icon="el-icon-search" type="primary">查找</el-button>
                <el-button icon="el-icon-edit" type="primary" @click="addUser">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="dataList"
                v-loading="loading"
                style="width: 100%">
            <el-table-column
                    label="用户名称"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-user-solid"></i>
                    <span style="margin-left: 10px">{{ scope.row.userName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户权限"
                    width="180">
                <template slot-scope="scope">
                    <el-tag type="success">
                        {{ scope.row.accountTypeName }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            icon="el-icon-edit"
                            @click="editUser(scope.row.userId)"
                    ></el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="delUser(scope.row.userId)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>

        <Pagination :page="page" :total="total" :getData="getData" :setPageSize="setPageSize"></Pagination>
    </div>
</template>

<script>
    export default {
        name: "Users",
        components: {
            'Pagination': () => import('./../../components/Pagination.vue')
        },
        data() {
            return {
                dataList: [
                    {
                        userId: 'userId',
                        userName: 'userName',
                        authorityId: 'authorityId',
                        authorityName: 'authorityName'
                    }
                ],
                loading: false,
                page: {
                    num: 1,
                    size: 10,
                },
                total: 100
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            setPageSize(val) {
                this.page.size = val;
            },
            getData(val) {
                this.loading = true;
                this._api.post('/api/users/list',{
                    accountType:'3',
                    pageNum:val,
                    pageSize:this.page.size,
                },(res)=>{
                    if(res.status === 0){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                        return
                    }
                    console.log(res);
                    this.total = res.pageCount;
                    this.dataList = res.result;
                    this.loading = false;
                })
            },
            addUser() {
                this.$router.push({
                    path: '/addUser', query: {
                        type: 'users'
                    }
                })
            },
            editUser(val) {
                this.$router.push({
                    path: '/editUser', query: {
                        type: 'users',
                        userId:val
                    }
                })
            },
            delUser(val) {
                this.$confirm('是否删除该用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._api.post('/api/users/del',{
                        accountType:'3',
                        userId:val,
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
                        this.getData(this.page.num)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }

    }
</script>

<style scoped>

</style>