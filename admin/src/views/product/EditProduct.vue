<template>
    <div id="EditProduct">
        <el-page-header @back="goBack" :content="content"></el-page-header>

        <div class="el-main">
            <el-form label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="formData.productName"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="formData.productPrice"></el-input>
                </el-form-item>
                <el-form-item label="热销">
                    <el-switch v-model="formData.isHot"></el-switch>
                </el-form-item>
                <el-form-item label="新品">
                    <el-switch v-model="formData.isNewProduct"></el-switch>
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

                <el-form-item v-if="$route.query.type === 'add'">
                    <el-button type="primary" @click="add">创建</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
                <el-form-item v-if="$route.query.type === 'edit'">
                    <el-button type="primary" @click="add">保存</el-button>
                    <el-button @click="goBack">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import {fileUploadUrl, baseImgUrl} from './../../config/index.js'

    export default {
        name: 'EditProduct',
        components: {},
        data() {
            return {
                type: '',
                content: '',
                fileUploadUrl: fileUploadUrl,
                baseImgUrl: baseImgUrl,
                coverImg: {
                    limit: 1,
                    uploadImgList: [],
                },
                productImg: {
                    limit: 5,
                    uploadImgList: [],
                },
                formData: {
                    productName: '', //名称
                    productPrice: '', //价格
                    productImg: '', //封面图
                    productImgList: [], //图片列表
                    isHot: false, //热销
                    isNewProduct: false, //新品
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
                    this.getData(this.$route.query.productId);
                    break;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({path: '/productList'})
            },
            coverHandleRemove(file, fileList) {
                this.coverImg.uploadImgList = [];
                this.formData.productImg = '';
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            coverHandleSuccess(response, file, fileList) {
                this.coverImg.uploadImgList.push({
                    name: 'coverImg',
                    url: this.baseImgUrl + response.data
                });
                this.formData.productImg = response.data;
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            coverHandleExceed(files, fileList) {
                this.$message({
                    message: '已存在一张图片',
                    type: 'error'
                });
            },
            productHandleRemove(file, fileList) {
                this.productImg.uploadImgList = fileList;
                this.formData.productImgList = fileList;
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            productHandleSuccess(response, file, fileList) {
                this.productImg.uploadImgList.push({
                    name: 'productImg',
                    url: this.baseImgUrl + response.data
                });
                this.formData.productImgList.push(response.data);
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            productHandleExceed(files, fileList) {
                this.$message({
                    message: '已超过限制图片数量',
                    type: 'error'
                });
            },
            reset() {
                this.formData = {
                    productName: '', //名称
                    productPrice: '', //价格
                    productImg: '', //封面图
                    productImgList: [], //图片列表
                    isHot: false, //热销
                    isNewProduct: false, //新品
                }
            },
            add(){
                this.formData.productImgList = JSON.stringify(this.formData.productImgList);
                this._api.post('/api/product/add',this.formData, (res) => {
                    if (res.status === 1) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.goBack();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
            getData(val){
                this._api.post('/api/product/findOne',{
                    productId:val
                }, (res) => {
                    if (res.status === 1) {
                        this.formData = res.result;
                        this.coverImg.uploadImgList.push({
                            name: 'coverImg',
                            url: this.baseImgUrl + res.result.productImg
                        });
                        console.log(JSON.parse(this.formData.productImgList));

                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>