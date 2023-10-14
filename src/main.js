import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Router
import router from "./router/index.js";

// Prime Vue
import PrimeVue from "primevue/config";
import 'primevue/resources/primevue.min.css';

import {createPinia} from "pinia";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

// Pinia
const pinia = createPinia();

createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(pinia)
    .use(router)
    .use(ToastService)
    .mount('#app')
