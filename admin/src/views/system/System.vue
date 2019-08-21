<template>
    <div id="System">
        <el-form :model="formData" label-width="120px">
            <el-form-item label="网站名称">
                <el-input clearable v-model="formData.websiteName" placeholder="网站名称"></el-input>
            </el-form-item>
            <el-form-item label="网站简介">
                <el-input clearable v-model="formData.websiteProfile" placeholder="网站简介"></el-input>
            </el-form-item>
            <el-form-item label="网站关键字">
                <el-input clearable v-model="formData.websiteKeywords" placeholder="网站关键字"></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input clearable v-model="formData.websiteDescription" placeholder="网站描述"></el-input>
            </el-form-item>
            <el-form-item label="网站ICON">
                <el-upload
                        class="upload-demo"
                        :action="icon.uploadUrl"
                        :on-success="handleUploadSuccess"
                        :on-remove="handleUploadRemove"
                        :on-error="handleUploadError"
                        :on-exceed="handleUploadExceed"
                        :file-list="icon.fileList"
                        :list-type="icon.type"
                        :limit="icon.limit">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <div class="icon-img">

                </div>
                <el-image v-if="formData.websiteIcon"
                        style="width: 100px; height: 100px"
                        :src="baseImgUrl+formData.websiteIcon"
                        fit="fill"
                        lazy
                        :preview-src-list="[baseImgUrl+formData.websiteIcon]"></el-image>
            </el-form-item>
            <el-form-item label="版权信息">
                <el-input clearable v-model="formData.copyrightInformation" placeholder="版权信息"></el-input>
            </el-form-item>
            <el-form-item label="备案号">
                <el-input clearable v-model="formData.InternetContentProvider" placeholder="备案号"></el-input>
            </el-form-item>

            <el-form-item label="文件服务器地址">
                <el-input clearable v-model="formData.fileServerAddress" placeholder="文件地址"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="systemEdit">保 存</el-button>
                <el-button @click="getSystem">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {fileUploadUrl, baseImgUrl} from './../../assets/js/config.js'

    export default {
        name: "System",
        components: {},
        data() {
            return {
                baseImgUrl: baseImgUrl,
                formData: {
                    websiteName: '',
                    websiteProfile: '',
                    websiteKeywords: '',
                    websiteDescription: '',
                    websiteIcon: '',
                    copyrightInformation: '',
                    InternetContentProvider: '',
                    fileServerAddress: ''
                },
                icon: {
                    uploadUrl: fileUploadUrl,
                    limit: 1,
                    fileList: [],
                    type: 'picture',
                },
            }
        },
        mounted() {
            this.getSystem()
        },
        methods: {
            getSystem() {
                this.$$http.GET('/api/systemSettings', {}, (respData) => {
                    if (respData.status === '1') {
                        this.formData = respData.data;
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                })
            },
            systemEdit(){
                this.$$http.POST('/api/systemSettings/edit', this.formData, (respData) => {
                    if (respData.status === '1') {
                        this.formData = respData.data;
                        this.$message({
                            message: respData.msg,
                            type: 'success',
                            duration: 2000
                        });
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                })
            },
            handleUploadSuccess(response, file, fileList) {
                this.formData.websiteIcon = response.data;
                this.$message({
                    message: '上传成功',
                    type: 'success',
                    center: true,
                    duration: 2000
                });
            },
            handleUploadRemove(file, fileList) {
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    center: true,
                    duration: 2000
                });
            },
            handleUploadError(err, file, fileList) {
                this.$message.error({
                    message: '上传失败',
                    type: 'success',
                    center: true,
                    duration: 2000
                });
            },
            handleUploadExceed(files, fileList) {
                this.$message({
                    message: '列表已存在一张图片，请删除后再上传',
                    type: 'error',
                    center: true,
                    duration: 2000
                });
            },
        }

    }
</script>

<style scoped>
    .icon-img {
        margin: 10px 0;
    }
</style>