<template>
    <div id="Dictionaries" class="el-row--flex">
        <div style="min-width: 200px;">
            <el-tree
                :props="treeProps"
                :load="treeLoadNode"
                @node-click="treeHandleNodeClick"
                lazy
            >
            </el-tree>

        </div>
        <div style="flex: 1;margin-left: 10px;">
            <div>
                <!--<el-button type="primary" @click="dialogVisible = true">添加</el-button>-->
            </div>
            <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column
                        label="属性值"
                        prop="dictionaryCode">
                </el-table-column>
                <el-table-column
                        label="名称"
                        prop="dictionaryName">
                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <!--<el-input
                                v-model="search"
                                placeholder="输入关键字搜索"/>-->
                        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
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
            treeProps: {
                label: 'dictionaryName',
                children: 'zones',
                isLeaf: 'leaf'
            },
            tableData: [{
                dictionaryId: '2016-05-02',
                dictionaryCode: '王小虎',
                dictionaryName: '123',
                parentId:''
            }],
            search: '',
            dialogVisible:false
        }
    },
    mounted() {
    
    },
    methods:{
        treeLoadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ dictionaryName: '全部',dictionaryCode:'',dictionaryId:'',parentId:'' }]);
            }
            this.getTreeData(node,resolve)
        },
        treeHandleNodeClick(data){
            console.log(data);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        getTreeData(node, resolve){
            this._api.post('/api/system/dictionaries/list',{
                parentId:node.data ? node.data.dictionaryId : ''
            },(res)=>{
                resolve(res.result)
            })
        }
    }
    
}
</script>

<style scoped>

</style>