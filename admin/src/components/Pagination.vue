<template>
    <div id="Pagination">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10,20,30,40]"
                :page-size="page.size"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
                background
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            page:{
                type: Object,
                default:'page'
            },
            total:{
                type: Number,
                default:'total'
            },
            getData: {
                type: Function,
                default: 'getData'
            },
            setPageSize: {
                type: Function,
                default: 'setPageSize'
            }
        },
        components: {},
        data() {
            return {
                currentPage: 1
            }
        },
        mounted() {
        },
        methods: {
            handleSizeChange(val) {
                this.setPageSize(val)
            },
            handleCurrentChange(val) {
                this.getData(val)
            }
        }

    }
</script>

<style scoped>

</style>