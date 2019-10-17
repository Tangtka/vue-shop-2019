<template>
    <div id="AdvertisingList">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="搜索" prop="pass">
                <el-input
                        placeholder="请输入内容"
                        clearable>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" icon="el-icon-search" type="primary">查找</el-button>
                <el-button icon="el-icon-edit" type="primary" @click="addAdvertising">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="图片"
                    width="150">
                <template slot-scope="scope">
                    <el-image
                            style="width: 80px; height: 80px;background-color: #000;"
                            :src="scope.row.advertisingImg"
                            :preview-src-list="[scope.row.advertisingImg]"
                            fit="contain"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    label="标题"
                    width="200">
                <template slot-scope="scope">
                    {{ scope.row.advertisingTitle }}
                </template>
            </el-table-column>
            <el-table-column
                    label="类型"
                    width="100">
                <template slot-scope="scope">
                    {{ scope.row.advertisingTypeName }}
                </template>
            </el-table-column>
            <el-table-column
                    label="是否上架"
                    width="150">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isPutaway"
                            active-text=""
                            inactive-text=""
                            disabled
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="广告链接"
                    width="200">
                <template slot-scope="scope">
                    {{ scope.row.advertisingUrl }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            icon="el-icon-edit"
                            @click="editAdvertising(scope.row.advertisingId)"
                    ></el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="del(scope.row.advertisingId)"
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
        name: "AdvertisingList",
        components: {
            'Pagination': () => import('./../../components/Pagination.vue')
        },
        data() {
            return {
                baseImgUrl:baseImgUrl,
                tableData: [],
                loading: false,
                page: {
                    num: 1,
                    size: 10,
                },
                total: 0
            }
        },
        mounted() {
            this.getData(this.page.num);
        },
        methods: {
            addAdvertising() {
                this.$router.push({path: '/index/editAdvertising', query: {type: 'add'}})
            },
            editAdvertising(val) {
                this.$router.push({path: '/index/editAdvertising', query: {type: 'edit',advertisingId:val}})
            },
            setPageSize(val) {
                this.page.size = val;
            },
            getData(val) {
                this.loading = true;
                this._api.post('/api/advertising/list',{
                    pageNum:val,
                    pageSize:this.page.size,
                },(res)=>{
                    this.total = res.pageCount;
                    this.tableData = res.result;
                    this.loading = false;
                    this.tableData.forEach((item)=>{
                        item.advertisingImg = this.baseImgUrl + item.advertisingImg;
                    })
                })
            },
            del(val){
                this.$confirm('是否删除该条广告', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._api.post('/api/advertising/del',{
                        advertisingId:val
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
        }

    }
</script>

<style scoped>

</style>