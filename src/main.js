import { createApp } from 'vue';
import "./css/normalize.css";
import './css/style.css';
import App from './App.vue';
import router from './router';
import InstallPopup from './components/InstallPopup.vue';

const app = createApp(App);
app.use(router);
app.component('InstallPopup', InstallPopup);
app.mount('#app');
