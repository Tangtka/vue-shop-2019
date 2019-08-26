<template>
    <div id="ProductAdd">
        <el-form ref="form" :model="formData" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="formData.productName" placeholder="名称" clearable></el-input>
            </el-form-item>

            <el-form-item label="简介">
                <el-input type="textarea" rows="4" v-model="formData.productBrief" placeholder="简介"
                          clearable></el-input>
            </el-form-item>

            <el-form-item label="描述">
                <el-input type="textarea" rows="4" v-model="formData.productDescribe" placeholder="描述"
                          clearable></el-input>
            </el-form-item>

            <el-form-item label="类型">
                <el-select v-model="formData.productType" placeholder="请选择">
                    <el-option
                            v-for="item in productType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="价格">
                <el-input v-model="formData.productPrice" placeholder="价格" clearable></el-input>
            </el-form-item>

            <el-form-item label="创建时间">
                <el-date-picker
                        v-model="formData.creationTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="热门">
                <el-switch v-model="formData.isNews"></el-switch>
            </el-form-item>

            <el-form-item label="新品">
                <el-switch v-model="formData.isHot"></el-switch>
            </el-form-item>

            <el-form-item label="封面图">
                <el-upload
                        :action="productImg.uploadUrl"
                        :on-success="handleUploadSuccessImg"
                        :on-remove="handleUploadRemoveImg"
                        :on-error="handleUploadError"
                        :on-exceed="handleUploadExceed"
                        :file-list="productImg.fileList"
                        :list-type="productImg.type"
                        :limit="productImg.limit">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="广告图">
                <el-upload
                        :action="productImgList.uploadUrl"
                        :on-success="handleUploadSuccessImgList"
                        :on-remove="handleUploadRemoveImgList"
                        :on-error="handleUploadError"
                        :on-exceed="handleUploadExceed"
                        :file-list="productImgList.fileList"
                        :list-type="productImgList.type"
                        :limit="productImgList.limit">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {fileUploadUrl} from './../../assets/js/config.js'
    export default {
        name: "ProductAdd",
        components: {},
        data() {
            return {
                formData: {
                    productName: '',
                    productBrief: '',
                    productDescribe: '',
                    productType: '',
                    productPrice: '',
                    productImg: '',
                    productImgList: [],
                    merchantId: '',
                    merchantName: '',
                    creationTime: '',
                    isNews: false,
                    isHot: false
                },
                productType: [
                    {value: 1, label: '电器'},
                    {value: 2, label: '书籍'},
                    {value: 3, label: '服装'}
                ],
                productImg: {
                    uploadUrl: fileUploadUrl,
                    limit: 1,
                    fileList: [],
                    type: 'picture-card',
                },
                productImgList: {
                    uploadUrl: fileUploadUrl,
                    limit: 6,
                    fileList: [],
                    type: 'picture-card',
                }
            }
        },
        mounted() {

        },
        methods: {
            submitForm() {
                this.formData.productImgList.toString();
                this.$$http.POST('/api/product/add', {
                    productName: this.formData.productName,
                    productBrief: this.formData.productBrief,
                    productDescribe: this.formData.productDescribe,
                    productType: this.formData.productType,
                    productPrice: this.formData.productPrice,
                    productImg: this.formData.productImg,
                    productImgList: JSON.stringify(this.formData.productImgList),
                    merchantId: this.formData.merchantId,
                    merchantName: this.formData.merchantName,
                    creationTime: this.formData.creationTime,
                    isNews: this.formData.isNews,
                    isHot: this.formData.isHot
                }, (respData) => {
                    if (respData.status === '1') {
                        this.$message({
                            message: respData.msg,
                            type: 'success',
                            duration: 2000
                        });
                        this.formData = {
                            productName: '',
                            productBrief: '',
                            productDescribe: '',
                            productType: '',
                            productPrice: '',
                            productImg: '',
                            productImgList: [],
                            merchantId: '',
                            merchantName: '',
                            creationTime: '',
                            isNews: false,
                            isHot: false
                        };
                        this.productImg.fileList= [];
                        this.productImgList.fileList= [];
                    } else {
                        this.$message({
                            message: respData.msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                })
            },

            handleUploadSuccessImg(response, file, fileList) {
                this.formData.productImg = response.data;
                this.$message({
                    message: '上传成功',
                    type: 'success',
                    center: true,
                    duration: 2000
                });
            },
            handleUploadSuccessImgList(response, file, fileList) {
                this.formData.productImgList.push(response.data);
                this.$message({
                    message: '上传成功',
                    type: 'success',
                    center: true,
                    duration: 2000
                });
            },
            handleUploadRemoveImg(file, fileList) {
                this.formData.productImg ='';
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    center: true,
                    duration: 2000
                });
            },
            handleUploadRemoveImgList(file, fileList) {
                var list = [];
                fileList.forEach((item)=>{
                    list.push(item.response.data)
                });
                this.formData.productImgList = list;
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
                    message: '列表已满',
                    type: 'error',
                    center: true,
                    duration: 2000
                });
            },
        }

    }
</script>

<style scoped>

</style>