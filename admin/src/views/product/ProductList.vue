<template>
    <div id="ProductList">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="搜索" prop="pass">
                <el-input
                        placeholder="请输入内容"
                        clearable>
                </el-input>

            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" icon="el-icon-search" type="primary">查找</el-button>
                <el-button icon="el-icon-edit" type="primary" @click="addProduct">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="dataList"
                v-loading="loading"
                style="width: 100%">
            <el-table-column
                    label="图片"
                    width="120">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.imgUrl"
                            fit="fit"></el-image>
                </template>
            </el-table-column>

            <el-table-column
                    label="名称"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.productName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="价格"
                    width="180">
                <template slot-scope="scope">
                    <span> {{ scope.row.productPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否热销"
                    width="180">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isHot"
                            disabled>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否新品"
                    width="180">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isfresh"
                            disabled>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editProduct">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <Pagination :page="page" :total="total" :getData="getData" :setPageSize="setPageSize"></Pagination>
    </div>
</template>

<script>
    export default {
        name: 'ProductList',
        components: {
            'Pagination': () => import('./../../components/Pagination.vue')
        },
        data() {
            return {
                dataList: [
                    {
                        productName: 'productName',
                        productPrice: 'productPrice',
                        imgUrl:'https://cn.bing.com/th?id=OIP.FoBT-qA_iA9psFLRC6ivHAAAAA&pid=Api&rs=1',
                        isHot: false,
                        isfresh: true,
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
            addProduct() {
                this.$router.push({
                    path: '/editProduct', query: {
                        type: 'add'
                    }
                })
            },
            editProduct() {
                this.$router.push({
                    path: '/editProduct', query: {
                        type: 'edit'
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>