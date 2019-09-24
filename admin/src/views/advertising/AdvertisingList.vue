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
                            style="width: 80px; height: 80px"
                            :src="scope.row.advertisingImg"
                            :preview-src-list="[scope.row.advertisingImg]"
                            fit="fit"
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
                            inactive-text="">
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
                            @click="editAdvertising"
                            icon="el-icon-edit"
                    ></el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "AdvertisingList",
        components: {
            'Pagination': () => import('./../../components/Pagination.vue')
        },
        data() {
            return {
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
            this.getData();
        },
        methods: {
            addAdvertising() {
                this.$router.push({path: '/editAdvertising', query: {type: 'add'}})
            },
            editAdvertising() {
                this.$router.push({path: '/editAdvertising', query: {type: 'edit'}})
            },
            /*getDictionaries(){
                this._api.post('/api/system/dictionaries/code',{
                    dictionaryCode:'advertising'
                },(res)=>{
                    console.log(res);
                })
            },*/
            setPageSize(val) {
                this.page.size = val;
            },
            getData(val) {
                this.loading = true;
                this._api.post('/api/advertising/list',{
                    dictionaryCode:'advertising'
                },(res)=>{
                    console.log(res);
                    this.tableData = res.result;
                    this.loading = false;
                })
            },
        }

    }
</script>

<style scoped>

</style>