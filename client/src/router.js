import { createWebHistory, createRouter } from 'vue-router';

import Auth from './components/Auth.vue';
import Home from './components/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/auth', component: Auth },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
