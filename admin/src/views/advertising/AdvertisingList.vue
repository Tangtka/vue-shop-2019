<template>
    <div id="AdvertisingList">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="搜索" prop="pass">
                <el-input
                        placeholder="请输入内容"
                        clearable>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" icon="el-icon-search" type="primary">查找</el-button>
                <el-button icon="el-icon-edit" type="primary" @click="addAdvertising">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="dataList"
                style="width: 100%">
            <el-table-column
                    label="图片"
                    width="150">
                <template slot-scope="scope">
                    <el-image
                            style="width: 80px; height: 80px"
                            :src="scope.row.imgUrl"
                            :preview-src-list="[scope.row.imgUrl]"
                            fit="fit"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    label="标题"
                    width="200">
                <template slot-scope="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column
                    label="类型"
                    width="100">
                <template slot-scope="scope">
                    {{ scope.row.typeName }}
                </template>
            </el-table-column>
            <el-table-column
                    label="是否上架"
                    width="150">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isPutaway"
                            active-text=""
                            inactive-text="">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="广告链接"
                    width="200">
                <template slot-scope="scope">
                    {{ scope.row.linkUrl }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editAdvertising">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "AdvertisingList",
        components: {},
        data() {
            return {
                dataList: [
                    {
                        imgUrl: 'https://tse1-mm.cn.bing.net/th?id=OET.bcb12cf6916f44589bf7433cc0927eaa&w=272&h=272&c=7&rs=1&o=5&pid=1.9',
                        title: '广告标题',
                        typeId: '1',
                        typeName: '首页',
                        isPutaway: false,
                        linkUrl: 'https://star.xiziwang.net/uploads/allimg/140811/34_140811215510_1.jpg'
                    }
                ],
                loading: false,
            }
        },
        mounted() {

        },
        methods: {
            addAdvertising() {
                this.$router.push({path: '/editAdvertising', query: {type: 'add'}})
            },
            editAdvertising() {
                this.$router.push({path: '/editAdvertising', query: {type: 'edit'}})
            }
        }

    }
</script>

<style scoped>

</style>