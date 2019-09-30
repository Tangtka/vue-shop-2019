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
                            style="width: 100px; height: 100px;background-color: #000;"
                            :src="scope.row.productImg"
                            :preview-src-list="[scope.row.productImg]"
                            fit="contain"></el-image>
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
                    <el-button
                            size="mini"
                            icon="el-icon-edit"
                            @click="editProduct(scope.row.productId)"
                    ></el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="delProduct(scope.row.productId)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>

        <Pagination :page="page" :total="total" :getData="getData" :setPageSize="setPageSize"></Pagination>
    </div>
</template>

<script>
    import {baseImgUrl} from './../../config/index.js'
    export default {
        name: 'ProductList',
        components: {
            'Pagination': () => import('./../../components/Pagination.vue')
        },
        data() {
            return {
                baseImgUrl:baseImgUrl,
                dataList: [],
                loading: false,
                page: {
                    num: 1,
                    size: 10,
                },
                total: 100
            }
        },
        mounted() {
            this.getData(this.page.num)
        },
        methods: {
            setPageSize(val) {
                this.page.size = val;
                console.log(val)
            },
            getData(val) {
                this.loading = true;
                this._api.post('/api/product/list',{
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
                    this.dataList.forEach((item)=>{
                        item.productImg = this.baseImgUrl + item.productImg;
                    })
                })
            },
            addProduct() {
                this.$router.push({
                    path: '/editProduct', query: {
                        type: 'add'
                    }
                })
            },
            editProduct(val) {
                this.$router.push({
                    path: '/editProduct', query: {
                        type: 'edit',
                        productId:val
                    }
                })
            },
            delProduct(val){
                this.$confirm('是否删除该产品', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._api.post('/api/product/del',{
                        productId:val
                    },(res)=>{
                        if(res.status === 1){
                            this.getData(this.page.num);
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: res.message,
                                type: 'error'
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
        },
    }
</script>

<style scoped>

</style>