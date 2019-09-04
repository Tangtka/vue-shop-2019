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
            redirect: '/editProduct/type=add'
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
        },
        //系统设置 》 网站设置
        {
            path: '/system',
            name: 'System',
            component: () => import('./../views/systemSettings/System.vue')
        },
        //系统设置 》 字典
        {
            path: '/dictionaries',
            name: 'Dictionaries',
            component: () => import('./../views/systemSettings/Dictionaries.vue')
        },
        //广告
        {
            path: '/advertisingList',
            name: 'AdvertisingList',
            component: () => import('./../views/advertising/AdvertisingList.vue')
        },
        //广告add
        {
            path: '/editAdvertising',
            name: 'EditAdvertising',
            component: () => import('../views/advertising/EditAdvertising.vue')
        },
        //用户
        {
            path: '/users',
            name: 'Users',
            component: () => import('./../views/users/Users.vue')
        },
        //管理员
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('./../views/users/Admin.vue')
        },
        //管理员add
        {
            path: '/addUser',
            name: 'AddUser',
            component: () => import('./../views/users/AddUser.vue')
        },
        //管理员edit
        {
            path: '/editUser',
            name: 'EditUser',
            component: () => import('./../views/users/EditUser.vue')
        },
        //操作记录
        {
            path: '/logs',
            name: 'Logs',
            component: () => import('./../views/logs/Logs.vue')
        },
        //产品管理
        {
            path: '/productList',
            name: 'ProductList',
            component: () => import('./../views/product/ProductList.vue')
        },
        //产品管理add
        {
            path: '/editProduct',
            name: 'EditProduct',
            component: () => import('../views/product/EditProduct.vue')
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
