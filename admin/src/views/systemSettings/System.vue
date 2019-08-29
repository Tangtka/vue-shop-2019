<template>
    <div id="System">
        <el-form label-width="100px" >
            <el-form-item label="网站名称">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="网站简介">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="网站关键词">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="网站ICON">
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="版权信息">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="备案号">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="文件浏览地址">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="文件上传地址">
                <el-input></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "System",
    components:{
    
    },
    data(){
        return {
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    mounted() {
    
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
    
}
</script>

<style scoped>

</style>