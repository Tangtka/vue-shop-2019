<template>
    <div id="Logs">
        <el-table
                style="width: 100%"
                :data="dataList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                v-loading="loading">
            <el-table-column
                    label="ip"
                    prop="ip">
            </el-table-column>
            <el-table-column
                    label="时间"
                    prop="time">
            </el-table-column>
            <el-table-column
                    label="操作"
                    prop="operation">
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
                dataList: [{
                    time: '2016-05-02',
                    ip: '王小虎',
                    operation: '上海市普陀区金沙江路 1518 弄'
                }, {
                    time: '2016-05-02',
                    ip: '王小虎',
                    operation: '上海市普陀区金沙江路 1518 弄'
                }, {
                    time: '2016-05-02',
                    ip: '王小虎',
                    operation: '上海市普陀区金沙江路 1518 弄'
                }, {
                    time: '2016-05-02',
                    ip: '王小虎',
                    operation: '上海市普陀区金沙江路 1518 弄'
                }],
                search: '',
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
            },
            getData(val) {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
                console.log(val)
            },
        },
    }
</script>

<style scoped>

</style>