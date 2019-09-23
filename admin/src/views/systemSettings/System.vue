<template>
    <div id="System">
        <el-form label-width="100px">
            <el-form-item label="网站名称">
                <el-input v-model="formData.websiteName"></el-input>
            </el-form-item>
            <el-form-item label="网站简介">
                <el-input v-model="formData.websiteBrief"></el-input>
            </el-form-item>
            <el-form-item label="网站关键词">
                <el-input v-model="formData.websiteKeyword"></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input v-model="formData.websiteDescribe"></el-input>
            </el-form-item>
            <el-form-item label="网站ICON">
                <el-upload
                        :action="fileUploadUrl"
                        list-type="picture-card"
                        :on-success="iconHandleSuccess"
                        :on-remove="iconHandleRemove"
                        :file-list="icon.uploadImgList"
                        :on-exceed="iconHandleExceed"
                        :limit="icon.limit"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="网站Logo">
                <el-upload
                        :action="fileUploadUrl"
                        list-type="picture-card"
                        :on-success="logoHandleSuccess"
                        :on-remove="logoHandleRemove"
                        :file-list="logo.uploadImgList"
                        :on-exceed="logoHandleExceed"
                        :limit="logo.limit"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="版权信息">
                <el-input v-model="formData.websiteCopyright"></el-input>
            </el-form-item>
            <el-form-item label="备案号">
                <el-input v-model="formData.InternetContentProvider"></el-input>
            </el-form-item>
            <el-form-item label="文件浏览地址">
                <el-input v-model="formData.fileBrowsingAddress"></el-input>
            </el-form-item>
            <el-form-item label="文件上传地址">
                <el-input v-model="formData.fileUploadAddress"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="editData" :loading="this.isEdit">保存</el-button>
                <el-button @click="$router.go()">取消</el-button>
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
                icon:{
                    limit:1,
                    uploadImgList:[]
                },
                logo:{
                    limit:1,
                    uploadImgList:[]
                },
                formData:{
                    websiteName:'',
                    websiteBrief:'',
                    websiteKeyword:'',
                    websiteDescribe:'',
                    websiteIcon:'',
                    websiteLogo:'',
                    websiteCopyright:'',
                    InternetContentProvider:'',
                    fileBrowsingAddress:'',
                    fileUploadAddress:''
                },
                isEdit:false
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            iconHandleSuccess(response, file, fileList) {
                this.icon.uploadImgList.push({
                    name:'icon',
                    url:this.baseImgUrl + response.data
                });
                this.formData.websiteIcon = response.data;
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            iconHandleRemove(file, fileList) {
                this.icon.uploadImgList = [];
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            iconHandleExceed(files, fileList){
                this.$message({
                    message: '已存在一张图片',
                    type: 'error'
                });
            },
            logoHandleSuccess(response, file, fileList) {
                this.logo.uploadImgList.push({
                    name:'logo',
                    url:this.baseImgUrl + response.data
                });
                this.formData.websiteLogo = response.data;
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            logoHandleRemove(file, fileList) {
                this.logo.uploadImgList = [];
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            logoHandleExceed(files, fileList){
                this.$message({
                    message: '已存在一张图片',
                    type: 'error'
                });
            },
            getData(){
                this._api.get('/api/system/basicConfig',{},(res)=>{
                    if(!res.result)return;
                    this.formData = res.result;
                    this.icon.uploadImgList.push({
                        name:'icon',
                        url:this.baseImgUrl + this.formData.websiteIcon
                    });
                    this.logo.uploadImgList.push({
                        name:'logo',
                        url:this.baseImgUrl + this.formData.websiteLogo
                    });
                })
            },
            editData(){
                this.isEdit = true;
                this._api.post('/api/system/basicConfig/edit',this.formData,(res)=>{
                    console.log(res);
                    this.isEdit = false;
                    this.$message({
                        message: '保存/修改成功',
                        type: 'success'
                    });
                })
            }
        }

    }
</script>

<style scoped>

</style>