<template>
    <div id="Logs">
        <el-table
                style="width: 100%"
                :data="tableData.filter(data => !search || data.operationContent.toLowerCase().includes(search.toLowerCase()))"
                v-loading="loading">
            <el-table-column
                    label="ip"
                    prop="logId">
            </el-table-column>
            <el-table-column
                    label="时间"
                    prop="createTime">
            </el-table-column>
            <el-table-column
                    label="操作"
                    prop="operationContent">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
            </el-table-column>
        </el-table>

        <Pagination :page="page" :total="total" :getData="getData" :setPageSize="setPageSize"></Pagination>
    </div>
</template>

<script>
    export default {
        name: 'Logs',
        components: {
            'Pagination': () => import('./../../components/Pagination.vue')
        },
        data() {
            return {
                tableData: [],
                search: '',
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
            setPageSize(val) {
                this.page.size = val;
            },
            getData(val) {
                this.loading = true;
                this._api.post('/api/logs/list',{
                    pageNum:val,
                    pageSize:this.page.size,
                },(res)=>{
                    this.total = res.pageCount;
                    this.tableData = res.result;
                    this.loading = false;
                })
            },
        },
    }
</script>

<style scoped>

</style>