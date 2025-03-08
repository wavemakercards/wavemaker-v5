import { createApp } from 'vue';
import "./css/normalize.css";
import './css/style.css';
import App from './App.vue';
import router from './router';


const app = createApp(App);
app.use(router);
app.mount('#app');
