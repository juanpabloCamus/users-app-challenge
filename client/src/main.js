import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router';
import { SnackbarService } from 'vue3-snackbar';
import 'vue3-snackbar/styles';

createApp(App).use(router).use(SnackbarService).mount('#app');
