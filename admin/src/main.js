import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import axios from './axios/index.js'
import ElementUI from 'element-ui';


import './assets/css/reset.css'
import './assets/css/theme/index.css'
import './assets/css/style.css'
import './assets/css/animate.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype._api = axios;

new Vue({
    router: router,
    store: store,
    render: h => h(App),
}).$mount('#app');
