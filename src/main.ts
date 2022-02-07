import Vue from 'vue';
import App from './app/App.vue';
import router from './router';
import { store } from './store/store';


import '@material-design-icons/font';
import '@/assets/index.scss';


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
