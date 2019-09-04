<template>
    <div id="EditAdvertising">
        <el-page-header @back="goBack" :content="content"></el-page-header>

        <div class="el-main">
            <el-form label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="formData.typeName" clearable  placeholder="请选择">
                        <el-option
                                v-for="item in adType"
                                :key="item.typeId"
                                :label="item.typeName"
                                :value="item.typeName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否上架">
                    <el-switch
                            v-model="formData.isPutaway"
                            active-text=""
                            inactive-text="">
                    </el-switch>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                            :action="fileUploadUrl"
                            list-type="picture-card"
                            :on-success="handleSuccess"
                            :on-remove="handleRemove"
                            :file-list="uploadImgList"
                            :on-exceed="handleExceed"
                            :on-error="handleError"
                            :limit="limit"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">添加</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import {fileUploadUrl, baseImgUrl} from './../../config/index.js'

    export default {
        name: "EditAdvertising",
        components: {},
        data() {
            return {
                type:'',
                content:'',
                fileUploadUrl: fileUploadUrl,
                baseImgUrl: baseImgUrl,
                limit: 1,
                uploadImgList: [],
                adType:[
                    {
                        typeId:1,
                        typeName:'首页'
                    }
                ],
                formData:{
                    imgUrl:'',
                    title:'',
                    typeId:'',
                    typeName:'',
                    isPutaway:false,
                    linkUrl:''
                }

            }
        },
        mounted() {
            this.type = this.$route.query.type;
            switch (this.type) {
                case 'add':
                    this.content = '添加广告';
                    break;
                case 'edit' :
                    this.content = '编辑广告';
                    break;
            }
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
                    name: 'icon',
                    url: this.baseImgUrl + response.data
                });
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            handleExceed(files, fileList) {
                this.$message({
                    message: '已存在一张图片',
                    type: 'error'
                });
            },
            handleError(err, file, fileList) {
                this.$message({
                    message: '上传失败',
                    type: 'error'
                });
            },
            goBack() {
                this.$router.replace({path: '/productList'})
            }
        }

    }
</script>

<style scoped>

</style>