<template>
    <div id="Index" class="index">
        <div class="header">
            <div class="logo">
                <span @click="isCollapse = !isCollapse">tka</span>
                <span>后台管理系统</span>
            </div>
            <div>
                <UserInfo></UserInfo>
            </div>
        </div>
        <div>
            <div class="nav" :class="{'max-width':isCollapse}">
                <Nav :isCollapse="isCollapse"></Nav>
            </div>
            <div>
                <transition
                    :duration="{ enter: 200, leave: 0 }"
                    enter-active-class="animated fadeIn"
                    leave-active-class=""
                >
                    <router-view class="router-box" :class="{'min-left':isCollapse}"></router-view>
                </transition>

            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Index",
        components: {
            'Nav': () => import('./../../components/Nav.vue'),
            'UserInfo': () => import('./../../components/UserInfo.vue')
        },
        data() {
            return {
                isCollapse: false
            }
        },
        mounted() {

        },
        methods: {}

    }
</script>

<style scoped>
    .index {
        height: 100%;
    }

    .header {
        width: 100%;
        height: 60px;
        color: #FFFFFF;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .header .logo {
        font-size: 24px;
        flex: 1;
        display: flex;
        align-items: center;
    }

    .header .logo > span {
        cursor:pointer;
        margin: 0 10px;
    }

    .nav{
        position: fixed;
        left: 0;
        top: 60px;
        height: calc(100% - 60px);
        overflow: hidden;
        overflow-y: auto;
        background-color: #fff;
        transition: 0.3s;
        width: 200px;
    }
    .nav.max-width {
        width: 60px;
    }
    .nav::-webkit-scrollbar {
        display: none;
    }

    .router-box {
        background-color: #ffffff;
        padding: 15px;
        box-shadow: 0 0 10px 0 #dddddd;
        border-radius: 3px;
        margin: 80px 20px 20px 220px;
        transition: 0.3s;
    }
    .router-box.min-left{
        margin-left: 80px;
    }
</style>