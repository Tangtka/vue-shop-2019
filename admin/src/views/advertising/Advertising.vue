<template>
    <div id="Advertising">
        <el-tabs v-model="tabIndex">
            <el-tab-pane label="广告列表" name="1">
                <AdvertisingList></AdvertisingList>
            </el-tab-pane>

            <el-tab-pane label="添加广告" name="2">
                <AddAdvertising></AddAdvertising>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
    export default {
        name: "Advertising",
        components: {
            'AddAdvertising':()=>import('./AddAdvertising.vue'),
            'AdvertisingList':()=>import('./AdvertisingList.vue'),
        },
        data() {
            return {
                tabIndex:'1'
            }
        },
        mounted() {

        },
        methods: {

        }

    }
</script>

<style scoped>

</style>