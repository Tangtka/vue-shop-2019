<template>
    <div id="Dialog">
        <el-dialog
            :title="title"
            :visible.sync="isShow"
            width="50%"
            :before-close="closeDialog"
        >
            <slot></slot>
            <slot name="btn" slot="footer"></slot>

        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Dialog",
        props:['isShow','title','confirm'],
        components: {},
        data() {
            return {}
        },
        mounted() {

        },
        methods: {
            closeDialog(){
                this.$emit('close')
            },
        }

    }
</script>

<style scoped>

</style>