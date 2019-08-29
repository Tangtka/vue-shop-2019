<template>
    <div id="Dictionaries" class="el-row--flex">
        <div style="min-width: 200px;">
            <el-tree
                    :data="data"
                    :props="defaultProps"
                    node-key="id"
                    default-expanded-keys="0"
                    accordion
                    @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div style="flex: 1;margin-left: 10px;">
            <el-button type="primary" @click="dialogVisible = true">添加</el-button>
            <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column
                        label="Date"
                        prop="date">
                </el-table-column>
                <el-table-column
                        label="Name"
                        prop="name">
                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                title="添加分类"
                :visible.sync="dialogVisible"
                width="500px"
                >
            <el-form label-position="top"  label-width="80px" >
                <el-form-item label="ID">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="属性值">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="属性名称">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Dictionaries",
    components:{
    
    },
    data(){
        return {
            data: [{
                id: 0,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            search: '',
            dialogVisible:false
        }
    },
    mounted() {
    
    },
    methods:{
        handleNodeClick(data) {
            console.log(data);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
    
}
</script>

<style scoped>

</style>