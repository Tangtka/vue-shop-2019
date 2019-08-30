<template>
    <div id="System">
        <el-form label-width="100px">
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
                        :action="fileUploadUrl"
                        list-type="picture-card"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :file-list="uploadImgList"
                        :on-exceed="handleExceed"
                        :limit="limit"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
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
    import {fileUploadUrl,baseImgUrl} from './../../config/index.js'

    export default {
        name: "System",
        components: {},
        data() {
            return {
                fileUploadUrl: fileUploadUrl,
                baseImgUrl:baseImgUrl,
                limit:1,
                uploadImgList:[],
            }
        },
        mounted() {

        },
        methods: {
            handleRemove(file, fileList) {
                this.uploadImgList = [];
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            handleSuccess(response, file, fileList) {
                this.uploadImgList.push({
                  name:'icon',
                  url:this.baseImgUrl + response.data
                });
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            handleExceed(files, fileList){
                this.$message({
                    message: '已存在一张图片',
                    type: 'error'
                });
            },
        }

    }
</script>

<style scoped>

</style>