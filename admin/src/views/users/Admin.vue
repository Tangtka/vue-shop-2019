<template>
    <div id="Admin">
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
                    <el-tag type="warning">
                        {{ scope.row.authorityName }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editUser">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <Pagination :page="page" :total="total" :getData="getData" :setPageSize="setPageSize"></Pagination>
    </div>
</template>

<script>
    export default {
        name: "Admin",
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

        },
        methods: {
            setPageSize(val) {
                this.page.size = val;
                console.log(val)
            },
            getData(val) {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
                console.log(val)
            },
            addUser() {
                this.$router.push({
                    path: '/addUser', query: {
                        type: 'admin'
                    }
                })
            },
            editUser() {
                this.$router.push({
                    path: '/editUser', query: {
                        type: 'admin'
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>