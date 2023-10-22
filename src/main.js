import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Router
import router from "./router/index.js";

// Prime Vue
import PrimeVue from "primevue/config"
import 'primevue/resources/themes/soho-light/theme.css'
import 'primeicons/primeicons.css';

import ToastService from "primevue/toastservice"
import Toast from 'primevue/toast';

// Pinia
import {createPinia} from "pinia"
const pinia = createPinia();

// Components
import InlineMessage from 'primevue/inlinemessage';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import Password from 'primevue/password';
import DataView from 'primevue/dataview';
import Paginator from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from 'primevue/tag';

createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(pinia)
    .use(router)
    .use(ToastService)
    .component('Button', Button)
    .component('InlineMessage', InlineMessage)
    .component('InputText', InputText)
    .component('Password', Password)
    .component('DataView', DataView)
    .component('Paginator', Paginator)
    .component('Dropdown', Dropdown)
    .component('ProgressSpinner', ProgressSpinner)
    .component('Tag', Tag)
    .mount('#app')
