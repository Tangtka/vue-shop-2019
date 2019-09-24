<template>
    <div id="Dictionaries" class="el-row--flex">
        <div style="min-width: 200px;">
            <el-tree
                node-key="dictionaryId"
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
                        label="code"
                        prop="dictionaryCode">
                </el-table-column>
                <el-table-column
                        label="名称"
                        prop="dictionaryName">
                </el-table-column>
                <el-table-column
                        label="属性值"
                        prop="dictionaryValue">
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
                            @click="TreeHandleEdit(scope.$index, scope.row)"
                            icon="el-icon-edit"
                        ></el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="TreeHandleDelete(scope.$index, scope.row)"
                            icon="el-icon-delete"
                        ></el-button>
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
                <el-form-item label="parentId">
                    <el-input disabled v-model="isOnDictionaryId"></el-input>
                </el-form-item>
                <el-form-item label="code">
                    <el-input disabled v-model="isOnDictionaryCode"></el-input>
                </el-form-item>
                <el-form-item label="属性值">
                    <el-input v-model="addForm.dictionaryValue"></el-input>
                </el-form-item>
                <el-form-item label="属性名称">
                    <el-input v-model="addForm.dictionaryName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="编辑分类"
                :visible.sync="dialogVisibleEdit"
                width="500px"
        >
            <el-form label-position="top"  label-width="80px" >
                <el-form-item label="parentId">
                    <el-input disabled v-model="editForm.parentId"></el-input>
                </el-form-item>
                <el-form-item label="code">
                    <el-input disabled v-model="isOnDictionaryCode"></el-input>
                </el-form-item>
                <el-form-item label="属性值">
                    <el-input v-model="editForm.dictionaryValue"></el-input>
                </el-form-item>
                <el-form-item label="属性名称">
                    <el-input v-model="editForm.dictionaryName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editClose">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
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
            tableData: [],
            search: '',
            dialogVisible:false,
            dialogVisibleEdit:false,
            isOnDictionaryId:'',
            isOnDictionaryCode:'',
            addForm:{
                dictionaryCode:'',
                dictionaryName:''
            },
            editForm:{
                dictionaryCode:'',
                dictionaryName:'',
                parentId:''
            }
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
            this.isOnDictionaryId = data.dictionaryId ? data.dictionaryId : '';
            this.isOnDictionaryCode = data.dictionaryValue ? data.dictionaryValue : '';
            this.getTableList();
        },
        TreeHandleEdit(index, row) {
            this.editForm = row;
            this.dialogVisibleEdit = true;
        },
        TreeHandleDelete(index, row) {
            this.$confirm('是否删除该字典字段', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this._api.post('/api/system/dictionaries/del',{
                    dictionaryId:row.dictionaryId
                },(res)=>{
                    if(res.status === 0){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                        return
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getTableList();
                    this.dialogVisibleEdit = false;
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getTreeData(node, resolve){
            this._api.post('/api/system/dictionaries/list',{
                parentId:node.data ? node.data.dictionaryId : ''
            },(res)=>{
                if(res.status === 0){
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                    return
                }
                this.tableData = res.result;
                resolve(res.result)
            })
        },
        getTableList(){
            this._api.post('/api/system/dictionaries/list',{
                parentId:this.isOnDictionaryId
            },(res)=>{
                if(res.status === 0){
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                    return
                }
                this.tableData = res.result;
            })
        },
        add(){
            this._api.post('/api/system/dictionaries/add',{
                parentId:this.isOnDictionaryId,
                dictionaryCode:this.isOnDictionaryCode,
                dictionaryName:this.addForm.dictionaryName,
                dictionaryValue:this.addForm.dictionaryValue,
            },(res)=>{
                if(res.status === 0){
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                    return
                }
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.getTableList();
                this.dialogVisible = false;
            })
        },
        addClose(){
            this.dialogVisible = false;
            this.addForm = {
                dictionaryCode:'',
                dictionaryName:''
            };
            this.$message({
                message: '取消添加',
                type: 'error'
            });
        },
        edit(){
            this._api.post('/api/system/dictionaries/edit',{
                dictionaryId:this.editForm.dictionaryId,
                dictionaryName:this.editForm.dictionaryName,
                dictionaryValue:this.editForm.dictionaryValue,
            },(res)=>{
                if(res.status === 0){
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                    return
                }
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.getTableList();
                this.dialogVisibleEdit = false;
            })
        },
        editClose(){
            this.dialogVisibleEdit = false;
            this.editForm = {
                dictionaryCode:'',
                dictionaryName:'',
                parentId:''
            };
            this.$message({
                message: '取消修改',
                type: 'error'
            });
        }
    }
    
}
</script>

<style scoped>

</style>