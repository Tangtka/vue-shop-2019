import Vue from 'vue'
import Router from 'vue-router'
import {getLocalStorage} from "../util/storage.js";

Vue.use(Router);
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition //记录路由滚动位置
        } else {
            //使用keep
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop

            }
            return {x: 0, y: to.meta.savedPosition || 0}
            //不是用keep
            //return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        //首页
        {
            path: '/index',
            name: 'Index',
            component: () => import('./../views/index/Index.vue')
        },
        //登录页
        {
            path: '/login',
            name: 'Login',
            component: () => import('./../views/login/Login.vue')
        }

    ]
});

// 判断是否需要登录权限以及是否登录
/*router.beforeEach((to, from, next) => {
    let userInfo = getLocalStorage('userInfo');
    if(to.name === 'Login'){
        next()
    }else if(!userInfo){
        next({path: '/login'})
    }else{
        Vue.prototype.$$http.GET('/api/adminUsers/loginCheck',{
            userId: userInfo.userId
        },(respData)=>{
            if(respData.status === '1'){
                next();
            }else if(respData.status === '0'){
                next({path: '/login'})
            }else{
                if(to.fullPath === '/login'){
                    next()
                } else {
                    next({path: '/login'})
                }
            }
        })
    };

});*/


export default router;
