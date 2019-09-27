<template>
    <div id="EditAdvertising">
        <el-page-header @back="goBack" :content="content"></el-page-header>

        <div class="el-main">
            <el-form label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="formData.advertisingTitle"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select
                            v-model="formData.advertisingType"
                            clearable
                            placeholder="请选择"
                            @change="selectHandleChange"
                            @clear="selectHandleClear"
                    >
                        <el-option
                            v-for="item in dictionaryList"
                            :key="item.dictionaryId"
                            :label="item.dictionaryName"
                            :value="item.dictionaryValue">
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
                    <el-input v-model="formData.advertisingUrl"></el-input>
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
                <el-form-item v-if="type==='edit'">
                    <el-button type="primary" @click="edit">修改</el-button>
                </el-form-item>
                <el-form-item v-if="type==='add'">
                    <el-button type="primary" @click="add">添加</el-button>
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
                    advertisingTitle:'',
                    advertisingUrl:'',
                    advertisingImg:'',
                    advertisingType:'',
                    advertisingTypeName:'',
                    isPutaway:false,
                },
                dictionaryList:[],
                advertisingId:'',

            }
        },
        mounted() {
            this.advertisingId = this.$route.query.advertisingId;
            this.type = this.$route.query.type;
            switch (this.type) {
                case 'add':
                    this.content = '添加广告';
                    break;
                case 'edit' :
                    this.content = '编辑广告';
                    this.getData();
                    break;
            }
            this.getDictionaries();
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
                this.formData.advertisingImg = response.data;
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
            selectHandleChange(val){
                this.dictionaryList.forEach((item)=>{
                    if(item.dictionaryValue === val){
                        this.formData.advertisingTypeName = item.dictionaryName;
                    }
                })
            },
            selectHandleClear(){
                this.formData.advertisingTypeName = ''
            },
            goBack() {
                this.$router.replace({path: '/advertisingList'});
            },
            getDictionaries(){
                this._api.post('/api/system/dictionaries/code',{
                    dictionaryCode:'advertising'
                },(res)=>{
                    if(res.status === 1){
                        this.dictionaryList = res.result
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
            getData(){
                this._api.post('/api/advertising/findOne',{
                    advertisingId:this.advertisingId
                },(res)=>{
                    if(res.status === 1){
                        this.formData = res.result;
                        this.uploadImgList.push({
                            name: 'icon',
                            url: this.baseImgUrl+res.result.advertisingImg
                        })
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
            edit(){
                this._api.post('/api/advertising/edit',this.formData,(res)=>{
                    if(res.status === 1){
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.goBack();
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
            add(){
                this._api.post('/api/advertising/add',this.formData,(res)=>{
                    if(res.status === 1){
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.goBack();
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
        }

    }
</script>

<style scoped>

</style>