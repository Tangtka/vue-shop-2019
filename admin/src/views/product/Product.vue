<template>
    <div id="Product">
        <el-form :model="searchForm" label-width="80px">
            <el-form-item label="搜索">
                <el-input clearable v-model="searchForm.text" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitSeacrh">搜 索</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="dataList"
                v-loading="tableLoading"
                style="width: 100%"
                row-key="productId"
                :expand-row-keys="[expands]">
            <el-table-column type="expand" >
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品 ID">
                            <span>{{ props.row.productId}}</span>
                        </el-form-item>
                        <el-form-item label="商品名称">
                            <span>{{ props.row.productName}}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span v-show="props.row.productType === '1'">电器</span>
                            <span v-show="props.row.productType === '2'">书籍</span>
                            <span v-show="props.row.productType === '3'">服装</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.productDescribe }}</span>
                        </el-form-item>
                        <el-form-item label="价格">
                            <span>{{ props.row.productPrice }}</span>
                        </el-form-item>
                        <el-form-item label="封面图">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="baseImgUrl+props.row.productImg"
                                    fit="fit"
                                    :preview-src-list="[baseImgUrl+props.row.productImg]"
                            ></el-image>
                        </el-form-item>
                        <el-form-item label="详细图">
                            <el-image v-for="item in props.row.productImgList"
                                    style="width: 100px; height: 100px;margin-right: 20px"
                                    :src="baseImgUrl+item"
                                    fit="fit"
                                    :preview-src-list="[baseImgUrl+item]"
                            ></el-image>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    width="160"
                    label="商品 ID"
                    prop="productId">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="productName">
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="productDescribe">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="props">
                    <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-date"
                            circle
                            @click="lookProduct(props.row)"></el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click=""></el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click=""></el-button>
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
    </div>
</template>

<script>
    import {baseImgUrl} from './../../assets/js/config.js'
export default {
    name: "Product",
    components:{
    
    },
    data(){
        return {
            baseImgUrl:baseImgUrl,
            searchForm:{
                text:''
            },
            dataList:[],
            page:{
                num:1,
                size:10,
                totalCount:20
            },
            expands:'',
            tableLoading:false
        }
    },
    mounted() {
        this.getProductList();
    },
    methods:{
        submitSeacrh(){
            this.page.num = 1;
            this.getProductList();
        },
        getProductList(){
            this.tableLoading = true;
            this.$$http.GET('/api/product', {
                searchText: this.searchForm.text,
                pageNum: this.page.num,
                pageSize: this.page.size,
            }, (respData) => {
                if (respData.status === '1') {
                    this.dataList = respData.data;
                    this.dataList.forEach((item)=>{
                        item.productImgList = JSON.parse(item.productImgList)
                    });

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
        lookProduct(value){
            console.log(value);
            if(this.expands && this.expands == value.productId){
                this.expands = ''
            }else{
                this.expands =value.productId
            }
        },
        handleCurrentChange(e) {
            this.page.num = e;
            this.getProductList();
        },
    }
    
}
</script>

<style scoped>

</style>