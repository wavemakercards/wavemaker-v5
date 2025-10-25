import { createApp } from 'vue';
import "./css/normalize.css";
import './css/style.css';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import "./css/sweetalert2.css";


 
const app = createApp(App);
app.use(VueSweetalert2)
app.mount('#app');