import { createApp } from 'vue';
import "./css/normalize.css";
import './css/style.css';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
//import 'sweetalert2/dist/sweetalert2.min.css';
 

import '@sweetalert2/theme-dark/dark.css';
 
const app = createApp(App);
app.use(VueSweetalert2)
app.mount('#app');
