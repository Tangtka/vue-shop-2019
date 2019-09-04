<template>
    <div id="EditProduct">
        <el-page-header @back="goBack" :content="content"></el-page-header>

        <div class="el-main">
            <el-form  label-width="80px">
                <el-form-item label="名称">
                    <el-input ></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input ></el-input>
                </el-form-item>
                <el-form-item label="热销">
                    <el-switch></el-switch>
                </el-form-item>
                <el-form-item label="新品">
                    <el-switch></el-switch>
                </el-form-item>
                <el-form-item label="封面图">
                    <el-upload
                            :action="fileUploadUrl"
                            list-type="picture-card"
                            :on-success="coverHandleSuccess"
                            :on-remove="coverHandleRemove"
                            :file-list="coverImg.uploadImgList"
                            :on-exceed="coverHandleExceed"
                            :limit="coverImg.limit"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="产品图">
                    <el-upload
                            :action="fileUploadUrl"
                            list-type="picture-card"
                            :on-success="productHandleSuccess"
                            :on-remove="productHandleRemove"
                            :file-list="productImg.uploadImgList"
                            :on-exceed="productHandleExceed"
                            :limit="productImg.limit"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import {fileUploadUrl,baseImgUrl} from './../../config/index.js'
    export default {
        name: 'EditProduct',
        components: {

        },
        data() {
            return {
                type:'',
                content:'',
                fileUploadUrl: fileUploadUrl,
                baseImgUrl:baseImgUrl,
                coverImg:{
                    limit:1,
                    uploadImgList:[],
                },
                productImg:{
                    limit:5,
                    uploadImgList:[],
                }
            }
        },
        mounted() {
            this.type = this.$route.query.type;
            switch (this.type) {
                case 'add':
                    this.content = '添加产品';
                    break;
                case 'edit' :
                    this.content = '编辑产品';
                    break;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({path: '/productList'})
            },
            coverHandleRemove(file, fileList) {
                this.coverImg = [];
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            coverHandleSuccess(response, file, fileList) {
                this.coverImg.uploadImgList.push({
                    name:'coverImg',
                    url:this.baseImgUrl + response.data
                });
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            coverHandleExceed(files, fileList){
                this.$message({
                    message: '已存在一张图片',
                    type: 'error'
                });
            },
            productHandleRemove(file, fileList) {
                this.productImg.uploadImgList = fileList;
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            productHandleSuccess(response, file, fileList) {
                this.productImg.uploadImgList.push({
                    name:'productImg',
                    url:this.baseImgUrl + response.data
                });
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            productHandleExceed(files, fileList){
                this.$message({
                    message: '已超过限制图片数量',
                    type: 'error'
                });
            },
        },
    }
</script>

<style scoped>

</style>