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
                row-key="id"
                :expand-row-keys="[expands]">
            <el-table-column type="expand" >
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    width="150"
                    label="商品 ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="desc">
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
export default {
    name: "Product",
    components:{
    
    },
    data(){
        return {
            searchForm:{
                text:''
            },
            dataList:[{
                id: '12987122',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            },
                {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }],
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
    
    },
    methods:{
        submitSeacrh(){

        },
        getProductList(){
            this.tableLoading = true
        },
        lookProduct(value){
            if(this.expands && this.expands == value.id){
                this.expands = ''
            }else{
                this.expands =value.id
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