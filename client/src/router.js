import { createWebHistory, createRouter } from 'vue-router';

import Auth from './components/Auth.vue';
import Home from './components/Home.vue';
import { API_PORT } from './config';

const routes = [
  { path: '/auth', component: Auth },
  { path: '/', component: Home, meta: { requiresAuth: true } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = await checkSession();

    if (isAuthenticated) {
      next();
    } else {
      next('/auth');
    }
  } else {
    next();
  }
});

async function checkSession() {
  try {
    const response = await fetch(`http://localhost:${API_PORT}/session`, {
      method: 'GET',
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    console.error('Error checking session:', error);
    return false;
  }
}
