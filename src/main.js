import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import api from '@/base/api';

const app = createApp(App);
app.config.globalProperties.api = api;
app.use(ElementPlus)
    .use(VueAxios, axios)
    .use(store)
    .use(router)
    .provide('axios', app.config.globalProperties.axios)
    .provide('api', app.config.globalProperties.api)
    .provide('Message', app.config.globalProperties.$message)
    .mount('#app');
