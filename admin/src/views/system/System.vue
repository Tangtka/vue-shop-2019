<template>
    <div id="System">
        <el-form  :model="form" label-width="120px">
            <el-form-item label="网站名称">
                <el-input clearable v-model="form.name" placeholder="网站名称"></el-input>
            </el-form-item>
            <el-form-item label="网站简介">
                <el-input clearable v-model="form.brief" placeholder="网站简介"></el-input>
            </el-form-item>
            <el-form-item label="网站关键字">
                <el-input clearable v-model="form.keyword" placeholder="网站关键字"></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input clearable v-model="form.describe" placeholder="网站描述"></el-input>
            </el-form-item>
            <el-form-item label="网站ICON">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-success="handleUploadSuccess"
                        :on-remove="handleUploadRemove"
                        :on-error="handleUploadError"
                        :on-exceed="handleUploadExceed"
                        :file-list="form.icon.fileList"
                        :list-type="form.icon.type"
                        :limit="form.icon.limit">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <div class="icon-img">

                </div>
                <el-image
                        style="width: 100px; height: 100px"
                        :src="form.icon.url"
                        fit="fill"></el-image>
            </el-form-item>
            <el-form-item label="版权信息">
                <el-input clearable v-model="form.copyrightInformation" placeholder="版权信息"></el-input>
            </el-form-item>
            <el-form-item label="备案号">
                <el-input clearable v-model="form.InternetContentProvider" placeholder="备案号"></el-input>
            </el-form-item>

            <el-form-item label="文件服务器地址">
                <el-input clearable v-model="form.fileAddress" placeholder="文件地址"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" >保 存</el-button>
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
            form: {
                name: '',
                brief: '',
                keyword: '',
                describe: '',
                icon: {
                    limit:1,
                    fileList:[],
                    type:'picture',
                    url:'http://n.sinaimg.cn/ent/transform/20170718/Ovfs-fyiakwa4435412.jpg'
                },
                copyrightInformation: '',
                InternetContentProvider: '',
                fileAddress:''
            },
        }
    },
    mounted() {
    
    },
    methods:{
        handleUploadSuccess(response, file, fileList) {
            this.$message({
                message: '上传成功',
                type: 'success',
                center: true,
                duration:2000
            });
        },
        handleUploadRemove(file, fileList) {
            this.$message({
                message: '删除成功',
                type: 'error',
                center: true,
                duration:2000
            });
        },
        handleUploadError(err, file, fileList) {
            this.$message.error({
                message: '上传失败',
                type: 'success',
                center: true,
                duration:2000
            });
        },
        handleUploadExceed(files, fileList) {
            this.$message({
                message: '列表已存在一张图片，请删除后再上传',
                type: 'error',
                center: true,
                duration:2000
            });
        },
    }
    
}
</script>

<style scoped>
    .icon-img{
        margin: 10px 0;
    }
</style>